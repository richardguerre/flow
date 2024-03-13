import { Prisma, definePlugin } from "@flowdev/plugin/server";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";
const LISTS_STORE_KEY = "lists";

export default definePlugin((opts) => {
  const PROCESS_WEBHOOK_EVENT_JOB_NAME = `${opts.pluginSlug}-process-webhook`;
  const SYNC_ALL_VIEWS_JOB_NAME = `${opts.pluginSlug}-sync-all-views`;
  const SYNC_VIEW_JOB_NAME = `${opts.pluginSlug}-sync-view`;
  const UPSERT_ISSUE_JOB = `${opts.pluginSlug}-upsert-item-from-issue`;

  const gqlRequest = async <T>(query: string, params: { token: string; variables?: object }) => {
    const res = await fetch("https://api.linear.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
      },
      body: JSON.stringify({ query, variables: params.variables }),
    });
    const json = await res.json();
    if (json.errors) {
      throw new opts.GraphQLError(`GitStart API error: ${json.errors[0].message}`);
    }
    return json.data as T;
  };

  const getTokensFromStore = async () => {
    const accountsTokensItem =
      await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
    if (!accountsTokensItem) {
      throw new opts.GraphQLError("User not authenticated.", {
        extensions: {
          code: "NOT_AUTHENTICATED",
          userFriendlyMessage:
            "You are not authenticated and will need to connect your Linear account(s) first.",
        },
      });
    }
    return accountsTokensItem.value;
  };

  const operatonLists = async (listIsInStore?: ListsInStore) => {
    const listsItem = await opts.store.getPluginItem<ListsInStore>(LISTS_STORE_KEY);
    if (!listsItem) {
      return { data: [] };
    }
    const tokenItem = await getTokensFromStore();
    if (!tokenItem) {
      return {
        data: [],
      };
    }
    const lists = await opts.prisma.list.findMany({
      where: { id: { in: Object.keys(listsItem.value).map(parseInt) } },
    });

    return {
      data: Object.entries(listsItem.value).map(([listId, listInfo]) => {
        const list = lists.find((list) => list.id === parseInt(listId));
        return {
          id: list?.id ?? parseInt(listId),
          name: list?.name ?? "Unknown or deleted list",
          description: list?.description ?? "This list may have been deleted or was left unamed",
          slug: list?.slug ?? null,
          linkedView: {
            id: listInfo.view.id,
            name: listInfo.view.name,
            color: listInfo.view.color,
            icon: listInfo.view.icon,
            account: listInfo.account,
          },
        };
      }) satisfies ListsOperationData,
    };
  };

  return {
    onRequest: async (req) => {
      if (req.path === "/auth") {
        return Response.redirect(
          // `https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`,
          `http://localhost:4321/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`,
        );
      } else if (req.path === "/auth/callback") {
        const accountsTokensItem =
          await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
        const body = req.body as Tokens;
        const tokensData = {
          ...body,
          expires_at: opts
            .dayjs()
            .add((body.expires_in ?? 10) - 10, "seconds") // -10 is a 10 second buffer to account for latency in network requests
            .toISOString(),
        } as Tokens;
        if ("expires_in" in tokensData) delete tokensData.expires_in; // delete expires_in because it's not needed

        await opts.store.setSecretItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY, {
          ...(accountsTokensItem?.value ?? {}),
          [tokensData.email]: tokensData,
        });
        return new Response(); // return 200
      } else if (req.path === "/events/webhook" && req.request.method === "POST") {
        const linearIssue = req.body as WebhookLinearIssue;
        if (!linearIssue.id) {
          console.log("❌ Could not find Linear issue ID in req.body");
          return new Response(); // return 200 as the webhook event doesn't concern the plugin and we don't want Linear to retry sending it.
        }
        await opts.pgBoss.send(PROCESS_WEBHOOK_EVENT_JOB_NAME, { linearIssue });
        return new Response();
      }

      return new Response();
    },
    operations: {
      /** Get the connected Linear account, if any. */
      accounts: async () => {
        const tokenItem = await getTokensFromStore();
        if (!tokenItem) {
          return {
            data: [],
          };
        }
        return {
          data: Object.entries(tokenItem).map(([email, tokens]) => ({
            email,
            expiresAt: tokens.expires_at,
          })) satisfies AccountsOperationData,
        };
      },
      lists: operatonLists,
      views: async () => {
        const tokenItem = await getTokensFromStore();
        if (!tokenItem) {
          return {
            data: [],
          };
        }
        const views: ViewsOperationData = [];
        for (const [account, tokens] of Object.entries(tokenItem)) {
          const query = await gqlRequest<{
            customViews: {
              edges: {
                node: {
                  id: string;
                  name: string;
                  icon: string | null;
                  color: string | null;
                };
              }[];
            };
          }>(
            /* GraphQL */ `
              query ViewsQuery {
                customViews {
                  edges {
                    node {
                      id
                      name
                      icon
                      color
                    }
                  }
                }
              }
            `,
            { token: tokens.access_token },
          ).catch(() => null);
          views.push(
            ...(query?.customViews.edges.map(
              (viewEdge) =>
                ({
                  id: viewEdge.node.id,
                  name: viewEdge.node.name,
                  icon: viewEdge.node.icon,
                  color: viewEdge.node.color,
                  account,
                }) satisfies ViewsOperationData[number],
            ) ?? []),
          );
        }
        return { data: views };
      },
      createList: async (input: CreateListOperationInput) => {
        /**
         * Input:
         * - account
         * - viewId
         * - list name
         */
        if (!input.account || !input.viewId || !input.listName) {
          throw new opts.GraphQLError("Missing an input", {
            extensions: {
              code: "CREATE_LIST_MISSING_INPUT",
              userFriendlyMessage: "Missing an input. Either `account`, `viewId` or `listName`",
            },
          });
        }
        const tokenItem = await getTokensFromStore();
        const listsItem = await opts.store.getPluginItem<ListsInStore>(LISTS_STORE_KEY);
        if (
          !Object.values(listsItem?.value ?? {}).find(
            (listInfo) => listInfo.view.id === input.viewId,
          )
        ) {
          throw new opts.GraphQLError("List with this view already exists.", {
            extensions: {
              code: "CREATE_LIST_ALREADY_EXISTS",
              userFriendlyMessage: "A list with this view already exists.",
            },
          });
        }
        const viewQuery = await gqlRequest<{
          customView: {
            id: string;
            name: string;
            color: string;
            icon: string;
          } | null;
        }>(
          /* GraphQL */ `
            query ViewQuery($viewId: String!) {
              customView(id: $viewId) {
                id
                name
                color
                icon
              }
            }
          `,
          {
            token: tokenItem[input.account].access_token,
            variables: { viewId: input.viewId },
          },
        );
        if (!viewQuery.customView) {
          throw new opts.GraphQLError("No view exists with that id.", {
            extensions: {
              code: "CREATE_LIST_NO_VIEW_EXISTS",
              userFriendlyMessage:
                "The selected view doesn't seem to exist in Linear. Make sure the view exists in your Linear and refresh the page.",
            },
          });
        }
        const createdList = await opts.prisma.list.create({
          data: {
            name: input.listName,
            slug: input.listName
              .toLowerCase()
              .replace(/\s/g, "-")
              .replace(/['#?]/g, " ")
              .slice(0, 50),
            description: "List created from Linear plugin.",
          },
        });
        const updatedListsInStore = await opts.store.setItem<ListsInStore>(LISTS_STORE_KEY, {
          ...(listsItem?.value ?? {}),
          [createdList.id]: {
            account: input.account,
            view: {
              id: input.viewId,
              color: viewQuery.customView.color,
              icon: viewQuery.customView.icon,
              name: viewQuery.customView.name,
            },
          },
        });
        if (Object.keys(updatedListsInStore.value).length === 1) {
          // setup webhook
          const webhook = await gqlRequest<{
            webhookCreate: {
              success: boolean;
              webhook: {
                id: string;
                enabled: boolean;
              };
            };
          }>(
            /* GraphQL */ `
              mutation CreateWebhook($url: String!) {
                webhookCreate(
                  input: { url: $url, allPublicTeams: true, resourceTypes: ["Comment", "Issue"] }
                ) {
                  success
                  webhook {
                    id
                    enabled
                  }
                }
              }
            `,
            {
              token: tokenItem[input.account].access_token,
              variables: {
                url: `${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/events/webhook`,
              },
            },
          );
          if (!webhook.webhookCreate.success) {
            throw new opts.GraphQLError("Failed to create a webhook.", {
              extensions: {
                code: "CREATE_LIST_FAILED_WEBHOOK",
                userFriendlyMessage:
                  "Failed to connect to Linear. Please try again or contact the Flow team for help.",
              },
            });
          }
        }
        return { operationName: "lists", data: await operatonLists(updatedListsInStore) };
      },
      deleteList: async (input: DeleteListOperationInput) => {
        if (!input.listId) {
          throw new opts.GraphQLError("Missing an input", {
            extensions: {
              code: "DELETE_LIST_MISSING_INPUT",
              userFriendlyMessage: "Missing an input. `listId` is required.",
            },
          });
        }
        const listsItem = await opts.store.getPluginItem<ListsInStore>(LISTS_STORE_KEY);
        if (!listsItem?.value[input.listId]) {
          throw new opts.GraphQLError("List with this id doesn't exist.", {
            extensions: {
              code: "DELETE_LIST_DOESNT_EXIST",
              userFriendlyMessage: "A list with this id doesn't exist.",
            },
          });
        }
        await opts.prisma.list.delete({ where: { id: input.listId } });
        const { [input.listId]: _, ...newListsInStore } = listsItem.value;
        const updatedListsInStore = await opts.store.setItem<ListsInStore>(
          LISTS_STORE_KEY,
          newListsInStore,
        );
        return { operationName: "lists", data: await operatonLists(updatedListsInStore) };
      },
      syncView: async (input) => {
        if (!input.listId || !input.viewId || !input.account) {
          throw new opts.GraphQLError("Missing an input", {
            extensions: {
              code: "SYNC_VIEW_MISSING_INPUT",
              userFriendlyMessage:
                "Missing an input. `listId`, `viewId` and `account` are required.",
            },
          });
        }
        const tokenItem = await getTokensFromStore();
        if (!tokenItem) {
          throw new opts.GraphQLError("User not authenticated.", {
            extensions: {
              code: "NOT_AUTHENTICATED",
              userFriendlyMessage:
                "You are not authenticated and will need to connect your Linear account(s) first.",
            },
          });
        }
        await opts.pgBoss.send(SYNC_VIEW_JOB_NAME, {
          listId: input.listId,
          viewId: input.viewId,
          token: tokenItem[input.account].access_token,
        } as JobSyncView);
        return { data: true };
      },
      syncAllViews: async () => {
        await opts.pgBoss.send(SYNC_ALL_VIEWS_JOB_NAME, {});
        return { data: true };
      },
    },
    handlePgBossWork: (work) => [
      work(SYNC_ALL_VIEWS_JOB_NAME, async () => {
        const listsItem = await opts.store.getPluginItem<ListsInStore>(LISTS_STORE_KEY);
        if (!listsItem) return;
        const tokenItem = await getTokensFromStore();
        if (!tokenItem) return;
        for (const [listId, { view, account }] of Object.entries(listsItem.value)) {
          await opts.pgBoss.send(SYNC_VIEW_JOB_NAME, {
            listId: parseInt(listId),
            viewId: view.id,
            token: tokenItem[account].access_token,
          } as JobSyncView);
        }
      }),
      work(SYNC_VIEW_JOB_NAME, async (job) => {
        const { viewId, listId, token } = job.data as JobSyncView;
        const query = await gqlRequest<{
          customView: {
            issues: {
              edges: {
                node: LinearIssue;
              }[];
            };
          };
        }>(
          /* GraphQL */ `
            query GetView($viewId: String!) {
              customView(id: $viewId) {
                issues {
                  edges {
                    node {
                      ...LinearIssue
                    }
                  }
                }
              }
            }
            ${linearIssueFragment}
          `,
          { token, variables: { viewId } },
        );

        for (const { node: issue } of query.customView.issues.edges) {
          await opts.pgBoss.send(UPSERT_ISSUE_JOB, { issue, listId } as JobUpsertIssue);
        }
      }),
      work(UPSERT_ISSUE_JOB, { batchSize: 5 }, async (jobs) => {
        // process 5 events at a time to go a little faster (processing 100 at a time might consume too much memory as webhook events and fetched issues can be large, especially if it includes conference data).
        for (const job of jobs) {
          const { issue, listId } = job.data as JobUpsertIssue;
          const item = await opts.prisma.item.findFirst({
            where: {
              pluginDatas: { some: { originalId: issue.id, pluginSlug: opts.pluginSlug } },
            },
            include: {
              pluginDatas: {
                where: { originalId: issue.id, pluginSlug: opts.pluginSlug },
                select: { id: true },
              },
            },
          });

          // TODO: have and use setting to configure terminal status(es).
          const isRelevant = true;

          const itemCommonBetweenUpdateAndCreate = {
            title: issue.title,
            isRelevant,
            inboxPoints: 10, // TODO: make it configurable by the user.
            list: { connect: { id: listId } },
          } satisfies Prisma.ItemUpdateInput;

          const min = {
            id: issue.id,
            title: issue.title,
            state: issue.state,
          } satisfies LinearIssueItemMin;
          const full = {
            ...issue,
            ...min,
          } satisfies LinearIssueItemFull;

          if (item) {
            await opts.prisma.item.update({
              where: { id: item.id },
              data: {
                ...itemCommonBetweenUpdateAndCreate,
                pluginDatas: {
                  update: {
                    where: { id: item.pluginDatas[0]?.id },
                    data: { min, full },
                  },
                },
              },
            });
          } else {
            await opts.prisma.item.create({
              data: {
                ...itemCommonBetweenUpdateAndCreate,
                pluginDatas: {
                  create: {
                    pluginSlug: opts.pluginSlug,
                    originalId: issue.id,
                    min,
                    full,
                  },
                },
              },
            });
          }

          console.log("✔ Upserted item from Linear issue", issue.id);
        }
      }),
      work(PROCESS_WEBHOOK_EVENT_JOB_NAME, async (job) => {
        const linearIssue = job.data as WebhookLinearIssue;
        console.log(linearIssue);
        // TODO: handle the webhook event
      }),
    ],
  };
});

type AccountsTokens = {
  [account: string]: Tokens;
};

type Tokens = {
  access_token: string;
  token_type: string;
  expires_at: string;
  expires_in?: never; // this is deleted before storing in the database, hence it's optional and will never be present
  scope: string;
  email: string;
};

type JobSyncView = { viewId: string; listId: number; token: string };
type JobUpsertIssue = { issue: LinearIssue; listId: number };

type WebhookLinearIssue = LinearIssue; // TODO: change type to actual webhook payload type.

type ListsInStore = Record<
  number,
  {
    view: { id: string; name: string; icon: string | null; color: string | null };
    account: string;
  }
>;

const linearCommentFragment = /* GraphQL */ `
  fragment LinearComment on Comment {
    id
    body
    url
    updatedAt
    user {
      id
      isMe
      name
      displayName
      avatarUrl
    }
    botActor {
      id
      name
      avatarUrl
    }
  }
`;

const linearIssueFragment = /* GraphQL */ `
  fragment LinearIssue on Issue {
    id
    title
    state {
      id
      name
      type
      color
    }
    description
    comments {
      edges {
        node {
          ...LinearComment
          children {
            edges {
              node {
                ...LinearComment
              }
            }
          }
        }
      }
    }
  }
  ${linearCommentFragment}
`;
