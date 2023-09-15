import { definePlugin } from "@flowdev/plugin/server";

export const TOKEN_STORE_KEY = "gitstart-session-token";
const USER_INFO_STORE_KEY = "gitstart-user-info";
const RELEVANT_STATUSES = [
  "PLANNED",
  "IN_PROGRESS",
  "INTERNAL_REVIEW",
  "CLIENT_REVIEW",
] as GitStartPullRequestStatus[];

export default definePlugin((opts) => {
  const GITSTART_LIST_SLUG = "gitstart-items";
  const UPSERT_PR_JOB_NAME = `${opts.pluginSlug}-upsert-pr-as-item`;
  const SYNC_ITEMS = `${opts.pluginSlug}-sync-items`;

  const gqlRequest = async <T>(token: string, query: string, variables?: object) => {
    const res = await fetch("https://api.gitstart.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    if (json.errors) {
      throw new opts.GraphQLError(`GitStart API error: ${json.errors[0].message}`);
    }
    return json.data as T;
  };

  const getTokenFromStore = async () => {
    const tokenItem = await opts.store.getPluginItem<string>(TOKEN_STORE_KEY);
    if (!tokenItem) {
      throw new opts.GraphQLError("Missing session token to access GitStart API", {
        extensions: {
          code: "NOT_AUTHENTICATED",
          userFriendlyMessage:
            "You need to add your GitStart session token in the plugin settings.",
        },
      });
    }
    return tokenItem.value;
  };

  return {
    onInstall: async () => {
      opts.prisma.list.upsert({
        where: { slug: GITSTART_LIST_SLUG },
        create: {
          slug: GITSTART_LIST_SLUG,
          name: "GitStart PRs",
          description:
            "All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin.",
        },
        update: {
          name: "GitStart PRs",
          description:
            "All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin.",
        },
      });
    },
    onStoreItemUpsert: async (itemKey) => {
      if (itemKey === TOKEN_STORE_KEY) {
        await opts.pgBoss.send(SYNC_ITEMS, {});
      }
    },
    onCreateTask: async (task) => {
      const pluginData = task.item?.pluginDatas.find((pd) => pd.pluginSlug === opts.pluginSlug);
      if (!pluginData?.originalId) return;
      const userInfoItem = await opts.store.getPluginItem<UserInfo>(USER_INFO_STORE_KEY);
      if (!userInfoItem) return;
      const { id: userId } = decodeNodeId(userInfoItem.value.id);

      const token = await getTokenFromStore();

      const itemPluginData = pluginData.full as ItemPluginDataFull;
      if (itemPluginData.type === "pull_request") {
        const { id: prId } = decodeNodeId(pluginData.originalId);
        const data = await gqlRequest<{ createTask: GitStartTask }>(
          token,
          /* GraphQL */ `
            mutation FlowOperationCreateTask($input: CreateTaskInput!) {
              createTask(input: $input) {
                ...GitStartTask
              }
            }
            ${GitStartTaskFragment}
          `,
          {
            input: {
              pullRequestInternalId: prId,
              title: task.title,
              type: "CODE", // TODO: make this configurable
              assigneeInternalId: userId,
            },
          }
        );
        const min: TaskPluginDataMin = {
          type: data.createTask.type,
          ticketUrl: itemPluginData.ticketUrl,
          status: data.createTask.status,
          githubPrUrl: itemPluginData.url,
        };
        const full: TaskPluginDataFull = {
          ...min,
          id: data.createTask.id,
          pullRequest: itemPluginData,
        };
        return {
          pluginData: {
            originalId: data.createTask.id,
            min,
            full,
          },
        };
      } else {
        // TODO: it's a ticket, so we need to create the pull request first then create the task
      }
    },
    operations: {
      sync: async () => {
        await opts.pgBoss.send(SYNC_ITEMS, {});
        return { data: "Job sent to sync the GitStart items." };
      },
    },
    handlePgBossWork: (work) => [
      work(SYNC_ITEMS, async () => {
        const token = await getTokenFromStore();
        const data1 = await gqlRequest<{
          viewer: { id: string; actionablePullRequests: PullRequestWithTicketTasks[] };
        }>(
          token,
          /* GraphQL */ `
            query FlowOperationSyncPRsAndTasks {
              viewer {
                id
                actionablePullRequests {
                  ...GitStartPullRequest
                  ticket {
                    ...GitStartTicket
                  }
                  tasks(filter: { assignedTask: true }) {
                    ...GitStartTask
                  }
                }
              }
            }
            ${GitStartPullRequestFragment}
            ${GitStartTicketFragment}
            ${GitStartTaskFragment}
          `
        );

        await opts.store.setSecretItem<UserInfo>(USER_INFO_STORE_KEY, { id: data1.viewer.id });

        for (const pr of data1.viewer.actionablePullRequests) {
          await opts.pgBoss.send(UPSERT_PR_JOB_NAME, pr);
        }
      }),
      work(UPSERT_PR_JOB_NAME, { batchSize: 10 }, async (jobs) => {
        for (const job of jobs) {
          const pr = job.data as PullRequestWithTicketTasks;
          const isRelevant = RELEVANT_STATUSES.includes(pr.status);
          // need to first get the item from the DB so we can update the plugin data linked to the item
          const item = await opts.prisma.item.findFirst({
            where: { pluginDatas: { some: { originalId: pr.id, pluginSlug: opts.pluginSlug } } },
            include: { pluginDatas: { select: { id: true } } },
          });

          const min: ItemPluginDataMin = {
            type: "pull_request",
            ticketUrl: `https://developers.gitstart.com/client/${pr.ticket.client.id}/ticket/${pr.ticket.code}`,
            url: pr.url,
            status: pr.status,
          };
          const full: ItemPluginDataFull = {
            ...min,
            id: pr.id,
            ticket: pr.ticket,
          };

          if (item) {
            await opts.prisma.item.update({
              where: { id: item.id },
              data: {
                title: pr.title,
                isRelevant,
                pluginDatas: {
                  update: {
                    where: { id: item.pluginDatas[0].id },
                    data: { min, full },
                  },
                },
              },
            });
          } else if (!isRelevant) {
            // do nothing
            console.log(`PR ${pr.id} is not relevant, skipping`);
          } else {
            await opts.prisma.item.create({
              data: {
                title: pr.title,
                isRelevant,
                inboxPoints: 10, // TODO: maybe make this configurable?
                list: { connect: { slug: GITSTART_LIST_SLUG } },
                pluginDatas: {
                  create: {
                    pluginSlug: opts.pluginSlug,
                    originalId: pr.id,
                    min,
                    full,
                  },
                },
              },
            });
          }
          console.log(`Upserted PR ${pr.id}`);
        }
      }),
    ],
  };
});

const decodeNodeId = <T = number>(nodeId: string): { type: string; id: T } => {
  // GitStart splits their IDs with a dash, so we can use that to determine the type and ID
  const [type, id] = nodeId.split("-");
  const asNum = parseInt(id);
  if (!Number.isNaN(asNum)) {
    return { type, id: asNum as T };
  }
  return { type, id: id as T };
};

type TaskPluginDataMin = {
  type: GitStartTaskType;
  ticketUrl: string;
  githubPrUrl: GitStartPullRequest["url"];
  status: GitStartTaskStatus;
};

type TaskPluginDataFull = TaskPluginDataMin & {
  id: GitStartTask["id"];
  pullRequest: PrItemPluginDataFull;
};

type ItemPluginDataMin = TicketItemPluginDataMin | PrItemPluginDataMin;
type ItemPluginDataFull = TicketItemPluginDataFull | PrItemPluginDataFull;

type UserInfo = {
  id: string;
};

type PullRequestWithTicketTasks = GitStartPullRequest & {
  ticket: GitStartTicket;
  tasks: Array<GitStartTask>;
};

// -------------------- ticket types --------------------
type GitStartTicket = {
  id: string;
  title: string;
  code: string;
  client: {
    id: string;
  };
};
const GitStartTicketFragment = /* GraphQL */ `
  fragment GitStartTicket on Ticket {
    id
    title
    # to construct the URL to the GitStart dashboard
    code
    client {
      id
    }
  }
`;
type TicketItemPluginDataMin = {
  type: "ticket"; // matches with node ID type
  url: string;
};
type TicketItemPluginDataFull = TicketItemPluginDataMin & {
  id: GitStartTicket["id"];
  code: GitStartTicket["code"];
  client: GitStartTicket["client"];
};

// -------------------- PR types --------------------
type GitStartPullRequestStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "INTERNAL_REVIEW"
  | "CLIENT_REVIEW"
  | "CANCELED"
  | "APPROVED"
  | "MERGED";
type GitStartPullRequest = {
  id: string;
  status: GitStartPullRequestStatus;
  title: string;
  completedAt: string | null;
  url: string | null;
};
const GitStartPullRequestFragment = /* GraphQL */ `
  fragment GitStartPullRequest on PullRequest {
    id
    status
    title
    completedAt
    url
    number
  }
`;
type PrItemPluginDataMin = {
  type: "pull_request"; // matches with node ID type
  ticketUrl: string;
  url: GitStartPullRequest["url"];
  status: GitStartPullRequestStatus;
};

type PrItemPluginDataFull = PrItemPluginDataMin & {
  id: GitStartPullRequest["id"];
  ticket: GitStartTicket;
};

// -------------------- task types --------------------
type GitStartTaskStatus = "CANCELED" | "FINISHED" | "IN_PROGRESS" | "TO_DO";
type GitStartTaskType = "SPEC" | "CODE" | "REVIEW" | "QA" | "LEARNING";
type GitStartTask = {
  id: string;
  type: GitStartTaskType;
  status: GitStartTaskStatus;
  title: string;
};
const GitStartTaskFragment = /* GraphQL */ `
  fragment GitStartTask on Task {
    id
    type
    status
    title
  }
`;
