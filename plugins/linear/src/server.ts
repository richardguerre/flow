import { Prisma, definePlugin } from "@flowdev/plugin/server";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";
const SYNCED_VIEWS_STORE_KEY = "synced-views";

export default definePlugin((opts) => {
  const PROCESS_WEBHOOK_EVENT_JOB_NAME = `${opts.pluginSlug}-process-webhook`;
  const CONNECT_ACCOUNT_JOB_NAME = `${opts.pluginSlug}-connect-account`;
  const SYNC_ALL_VIEWS_JOB_NAME = `${opts.pluginSlug}-sync-all-views`;
  const SYNC_VIEW_JOB_NAME = `${opts.pluginSlug}-sync-view`;
  const SYNC_USER_ISSUES_JOB_NAME = `${opts.pluginSlug}-sync-user-issues`;
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
      console.log(json.errors);
      throw new opts.GraphQLError(`Linear API error: ${json.errors[0].message}`);
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

  const operationViews = async () => {
    const tokenItem = await getTokensFromStore().catch(() => null);
    if (!tokenItem) {
      console.log("not connected");
      return {
        data: { connected: false, views: [] } satisfies ViewsOperationData,
      };
    }
    const syncedViewsItem = await opts.store
      .getPluginItem<SyncedViews>(SYNCED_VIEWS_STORE_KEY)
      .then((item) => item?.value.views ?? []);
    const views: ViewsOperationData["views"] = [];
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
              synced: syncedViewsItem.some((view) => view.id === viewEdge.node.id),
            }) satisfies ViewsOperationData["views"][number],
        ) ?? []),
      );
    }
    return { data: { connected: true, views } satisfies ViewsOperationData };
  };

  const isRelevantWebhookEvent = (event: WebhookEvent) => {
    if (event.type === "Issue" && event.action === "update") {
      return true;
    } else if (event.type === "Comment") {
      return true;
    } else {
      return false;
    }
  };

  return {
    onRequest: async (req) => {
      if (req.path === "/auth") {
        return Response.redirect(
          `https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`,
        );
      } else if (req.path === "/auth/callback") {
        const accountsTokensItem =
          await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
        const body = req.body as AuthCallbackData;
        const viewerQuery = await gqlRequest<{
          viewer: { id: string; email: string; organization: { id: string; name: string } };
        }>(
          /* GraphQL */ `
            query {
              viewer {
                id
                email
                organization {
                  id
                  name
                }
              }
            }
          `,
          { token: body.access_token },
        );

        const tokensData = {
          ...body,
          created_at: new Date().toISOString(),
          expires_at: opts
            .dayjs()
            .add((body.expires_in ?? 10) - 10, "seconds") // -10 is a 10 second buffer to account for latency in network requests
            .toISOString(),
          email: viewerQuery.viewer.email,
          userId: viewerQuery.viewer.id,
          organizationId: viewerQuery.viewer.organization.id,
          organizationName: viewerQuery.viewer.organization.name,
        } as Tokens;
        if ("expires_in" in tokensData) delete tokensData.expires_in; // delete expires_in because it's not needed

        await opts.store.setSecretItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY, {
          ...(accountsTokensItem?.value ?? {}),
          [tokensData.email]: tokensData,
        });

        await opts.pgBoss.send(CONNECT_ACCOUNT_JOB_NAME, {
          token: body.access_token,
        } satisfies JobConnectAccount);

        return new Response(); // return 200
      } else if (req.path === "/events/webhook" && req.request.method === "POST") {
        const event = req.body as WebhookEvent;
        if (!isRelevantWebhookEvent(event)) {
          console.log("👌 The webhook event is not relevant to this plugin");
          return new Response(); // return 200 as the webhook event doesn't concern the plugin and we don't want Linear to retry sending it.
        }
        await opts.pgBoss.send(PROCESS_WEBHOOK_EVENT_JOB_NAME, {
          event,
        } satisfies JobProcessWebhookEvent);
        return new Response();
      }

      return new Response();
    },
    operations: {
      /** Get the connected Linear account, if any. */
      accounts: async () => {
        const tokenItem = await getTokensFromStore().catch(() => null);
        if (!tokenItem) {
          return {
            data: [],
          };
        }
        return {
          data: Object.entries(tokenItem).map(([email, tokens]) => ({
            connectedAt: tokens.created_at,
            email,
            expiresAt: tokens.expires_at,
          })) satisfies AccountsOperationData,
        };
      },
      views: operationViews,
      addViewToSync: async (input: AddViewToSyncOperationInput) => {
        if (!input.viewId || !input.account) {
          throw new opts.GraphQLError("Missing an input", {
            extensions: {
              code: "ADD_VIEW_TO_SYNC_MISSING_INPUT",
              userFriendlyMessage: "Missing an input. `viewId` and `account` are required.",
            },
          });
        }
        const tokenItem = await getTokensFromStore();

        // get issues in the view and upsert them
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
          {
            token: tokenItem[input.account].access_token,
            variables: { viewId: input.viewId },
          },
        );
        for (const { node: issue } of query.customView.issues.edges) {
          await opts.pgBoss.send(UPSERT_ISSUE_JOB, {
            issue,
            viewId: input.viewId,
          } satisfies JobUpsertIssue);
        }

        const syncedViewsItem = await opts.store
          .getPluginItem<SyncedViews>(SYNCED_VIEWS_STORE_KEY)
          .then((item) => item?.value ?? { views: [] });
        await opts.store.setItem<SyncedViews>(SYNCED_VIEWS_STORE_KEY, {
          ...syncedViewsItem,
          views: [...syncedViewsItem.views, { id: input.viewId, account: input.account }],
        });

        const views = await operationViews();
        return { operationName: "views", data: views.data };
      },
      removeViewToSync: async (input: RemoveViewToSyncOperationInput) => {
        if (!input.viewId) {
          throw new opts.GraphQLError("Missing an input", {
            extensions: {
              code: "REMOVE_VIEW_TO_SYNC_MISSING_INPUT",
              userFriendlyMessage: "Missing an input. `viewId` is required.",
            },
          });
        }
        const syncedViewsItem = await opts.store
          .getPluginItem<SyncedViews>(SYNCED_VIEWS_STORE_KEY)
          .then((item) => item?.value ?? { views: [] });
        await opts.store.setItem<SyncedViews>(SYNCED_VIEWS_STORE_KEY, {
          ...syncedViewsItem,
          views: syncedViewsItem.views.filter((view) => view.id !== input.viewId),
        });
        const views = await operationViews();
        return { operationName: "views", data: views.data };
      },
      syncUserIssues: async () => {
        const tokenItem = await getTokensFromStore().catch(() => null);
        if (!tokenItem) {
          console.log("❌ Could not sync user issues as no tokens are found");
          return { data: "Could not sync user issues as no tokens are found" };
        }
        for (const account of Object.keys(tokenItem)) {
          await opts.pgBoss.send(SYNC_USER_ISSUES_JOB_NAME, {
            token: tokenItem[account].access_token,
          } satisfies JobSyncUserIssues);
        }
        return { data: true };
      },
      syncView: async (input: SyncViewOperationInput) => {
        if (!input.viewId || !input.account) {
          throw new opts.GraphQLError("Missing an input", {
            extensions: {
              code: "SYNC_VIEW_MISSING_INPUT",
              userFriendlyMessage: "Missing an input. `viewId` and `account` are required.",
            },
          });
        }
        const tokenItem = await getTokensFromStore();
        await opts.pgBoss.send(SYNC_VIEW_JOB_NAME, {
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
      work(CONNECT_ACCOUNT_JOB_NAME, async (job) => {
        const { token } = job.data as JobConnectAccount;

        // 1. create a webhook for that account
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
            token,
            variables: {
              url: `${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/events/webhook`,
            },
          },
        );
        if (!webhook.webhookCreate.success) {
          throw new opts.GraphQLError("Failed to create a webhook.", {
            extensions: {
              code: "ADD_VIEW_TO_SYNC_FAILED_CREATE_WEBHOOK",
              userFriendlyMessage:
                "Failed to connect to Linear. Please try again or contact the Flow team for help.",
            },
          });
        }

        // 2. get the user's issues
        await opts.pgBoss.send(SYNC_USER_ISSUES_JOB_NAME, { token } satisfies JobSyncUserIssues);
      }),
      work(SYNC_USER_ISSUES_JOB_NAME, async (job) => {
        const { token } = job.data as JobSyncUserIssues;

        const queryAssignedIssues = await gqlRequest<{
          viewer: {
            assignedIssues: {
              edges: {
                node: LinearIssue;
              }[];
            };
          };
        }>(
          /* GraphQL */ `
            query GetUserAssignedIssues {
              viewer {
                assignedIssues {
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
          { token },
        );
        for (const { node: issue } of queryAssignedIssues.viewer.assignedIssues.edges) {
          await opts.pgBoss.send(UPSERT_ISSUE_JOB, {
            issue,
            viewId: "my-issues",
          } satisfies JobUpsertIssue);
        }

        const queryCreatedIssues = await gqlRequest<{
          viewer: {
            createdIssues: {
              edges: {
                node: LinearIssue;
              }[];
            };
          };
        }>(
          /* GraphQL */ `
            query GetUserCreatedIssues {
              viewer {
                createdIssues {
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
          { token },
        );
        for (const { node: issue } of queryCreatedIssues.viewer.createdIssues.edges) {
          await opts.pgBoss.send(UPSERT_ISSUE_JOB, {
            issue,
            viewId: "my-issues",
          } satisfies JobUpsertIssue);
        }

        const queryIssues = await gqlRequest<{
          issues: {
            edges: {
              node: LinearIssue;
            }[];
          };
        }>(
          /* GraphQL */ `
            query GetUserSubscribedIssues {
              issues(
                filter: {
                  subscribers: { isMe: { eq: true } }
                  state: { type: { nin: ["triage", "backlog", "completed", "canceled"] } }
                }
              ) {
                edges {
                  node {
                    ...LinearIssue
                  }
                }
              }
            }
            ${linearIssueFragment}
          `,
          { token },
        );
        for (const { node: issue } of queryIssues.issues.edges) {
          await opts.pgBoss.send(UPSERT_ISSUE_JOB, {
            issue,
            viewId: "my-issues",
          } satisfies JobUpsertIssue);
        }
      }),
      work(SYNC_ALL_VIEWS_JOB_NAME, async () => {
        const tokenItem = await getTokensFromStore().catch(() => null);
        if (!tokenItem) return;
        const syncedViewsItem = await opts.store
          .getPluginItem<SyncedViews>(SYNCED_VIEWS_STORE_KEY)
          .then((item) => item?.value.views ?? []);

        for (const view of syncedViewsItem) {
          await opts.pgBoss.send(SYNC_VIEW_JOB_NAME, {
            viewId: view.id,
            token: tokenItem[view.account].access_token,
          } as JobSyncView);
        }
      }),
      work(SYNC_VIEW_JOB_NAME, async (job) => {
        const { viewId, token } = job.data as JobSyncView;
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
          await opts.pgBoss.send(UPSERT_ISSUE_JOB, { issue, viewId } satisfies JobUpsertIssue);
        }
      }),
      work(UPSERT_ISSUE_JOB, { batchSize: 5 }, async (jobs) => {
        // process 5 events at a time to go a little faster (processing 100 at a time might consume too much memory as webhook events and fetched issues can be large, especially if it includes conference data).
        for (const job of jobs) {
          const { issue, viewId } = job.data as JobUpsertIssue;
          const item = await opts.prisma.item.findFirst({
            where: {
              pluginDatas: { some: { originalId: issue.id, pluginSlug: opts.pluginSlug } },
            },
            include: {
              pluginDatas: {
                where: { originalId: issue.id, pluginSlug: opts.pluginSlug },
                select: { id: true, min: true, full: true },
              },
            },
          });

          // TODO: have and use user setting to configure terminal status(es).
          const isRelevant = issue.state.type !== "canceled" && issue.state.type !== "completed";

          if (!item && !isRelevant) {
            console.log("❌ Issue not upserted as it's not relevant and it's not in the database.");
            return;
          }

          const existinPluginData = item?.pluginDatas[0] as
            | { min: LinearIssueItemMin; full: LinearIssueItemFull }
            | undefined;
          const itemCommonBetweenUpdateAndCreate = {
            title: issue.title,
            isRelevant,
            inboxPoints: 10, // TODO: make it configurable by the user.
          } satisfies Prisma.ItemUpdateInput;

          const min = {
            ...((existinPluginData?.min as LinearIssueItemMin) ?? {}),
            id: issue.id,
            state: issue.state,
            url: issue.url,
            priority: issue.priority,
            views: Array.from(new Set(existinPluginData?.min.views ?? []).add(viewId)),
          } satisfies LinearIssueItemMin;
          const full = {
            ...((existinPluginData?.full as LinearIssueItemFull) ?? {}),
            ...issue,
            ...min,
          } satisfies LinearIssueItemFull;

          if (item) {
            await opts.prisma.item
              .update({
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
              })
              .catch((e) => console.error(e));
          } else {
            await opts.prisma.item
              .create({
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
              })
              .catch((e) => console.error(e));
          }

          console.log("✔ Upserted item from Linear issue", issue.id);
        }
      }),
      work(PROCESS_WEBHOOK_EVENT_JOB_NAME, async (job) => {
        const { event } = job.data as JobProcessWebhookEvent;
        console.log("Processing webhook event", event.type, event.action, event.data.id);
        let issueId: string | null = null;
        if (event.type === "Issue") {
          issueId = event.data.id;
        } else if (event.type === "Comment") {
          issueId = event.data.issue.id;
        }
        if (!issueId) {
          console.log("❌ Could not find Linear issue ID in req.body");
          return;
        }
        const tokens = await getTokensFromStore();
        if (!tokens) {
          console.log("❌ Could not process webhook event as no tokens are found");
          return;
        }
        const token = Object.values(tokens).find(
          (token) => token.organizationId === event.organizationId,
        );
        if (!token) {
          console.log(
            "❌ Could not process webhook event as no token is found for the organization of the event",
          );
          return;
        }
        const issueQuery = await gqlRequest<{
          issue: LinearIssue;
        }>(
          /* GraphQL */ `
            query GetIssue($issueId: String!) {
              issue(id: $issueId) {
                ...LinearIssue
              }
            }
            ${linearIssueFragment}
          `,
          { token: token.access_token, variables: { issueId } },
        );
        await opts.pgBoss.send(UPSERT_ISSUE_JOB, {
          issue: issueQuery.issue,
          viewId: "my-issues",
        } satisfies JobUpsertIssue);
      }),
    ],
  };
});

type AccountsTokens = {
  [account: string]: Tokens;
};

type AuthCallbackData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

type Tokens = {
  created_at: string;
  access_token: string;
  token_type: string;
  expires_at: string;
  scope: string;
  email: string;
  userId: string;
  organizationId: string;
  organizationName: string;
};

type JobConnectAccount = { token: string };
type JobSyncUserIssues = { token: string };
type JobSyncView = { viewId: string; token: string };
type JobUpsertIssue = {
  issue: LinearIssue;
  viewId: ViewId;
};
type JobProcessWebhookEvent = { event: WebhookEvent };

type WebhookEvent = WebhookEventIssueUpdate | WebhookEventCommentCreate;
type WebhookEventCommentCreate = {
  type: "Comment";
  action: "create";
  createdAt: string;
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    body: string;
    issueId: string;
    parentId?: string;
    userId: string;
    reactionData: any[];
    issue: {
      id: string;
      title: string;
    };
    user: {
      id: string;
      name: string;
    };
  };
  url: string;
  organizationId: string;
  webhookTimestamp: number;
  webhookId: string;
};

type WebhookEventIssueAttributes = {
  updatedAt: string;
  number: number;
  title: string;
  priority: number;
  boardOrder: number;
  sortOrder: number;
  teamId: string;
  previousIdentifiers: string[];
  creatorId: string;
  stateId: string;
  priorityLabel: string;
  url: string;
  subscriberIds: string[];
  labelIds: string[];
  state: {
    id: string;
    color: string;
    name: string;
    type: string;
  };
  team: {
    id: string;
    key: string;
    name: string;
  };
  labels: {
    id: string;
    color: string;
    name: string;
  }[];
  description: string;
  descriptionData: string;
};
type WebhookEventIssueUpdate = {
  type: "Issue";
  action: "update";
  createdAt: string;
  data: WebhookEventIssueAttributes & {
    id: string;
    createdAt: string;
  };
  updatedFrom: Partial<WebhookEventIssueAttributes>;
  url: string;
  organizationId: string;
  webhookTimestamp: number;
  webhookId: string;
};

type SyncedViews = {
  views: {
    id: string;
    account: string;
  }[];
};

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
    url
    state {
      id
      name
      type
      color
    }
    priority
    description
    comments(last: 10) {
      edges {
        node {
          ...LinearComment
        }
      }
    }
  }
  ${linearCommentFragment}
`;
