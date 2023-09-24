import { definePlugin } from "@flowdev/plugin/server";

export const TOKEN_STORE_KEY = "gitstart-session-token";
const USER_INFO_STORE_KEY = "gitstart-user-info";
const RELEVANT_STATUSES = [
  "PLANNED",
  "IN_PROGRESS",
  "INTERNAL_REVIEW",
  "CLIENT_REVIEW",
] as GitStartPullRequestStatus[];
export const GITSTART_LIST_SLUG = "gitstart-items";

export default definePlugin((opts) => {
  const UPSERT_PR_JOB_NAME = `${opts.pluginSlug}-upsert-pr-as-item`;
  const SYNC_ITEMS = `${opts.pluginSlug}-sync-items`;

  const gqlRequest = async <T>(token: string, query: string, variables?: object) => {
    const res = await fetch("https://gateway.gitstart.dev/graphql", {
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
  type GitStartUpdateTaskStatusInput = {
    token: string;
    input: {
      taskInternalId: number;
      status: GitStartTaskStatus;
    };
  };
  const updateTaskStatus = async (params: GitStartUpdateTaskStatusInput) => {
    return gqlRequest<{
      updateTaskStatus: {
        pullRequest: GitStartPullRequest;
        task: GitStartTask;
      };
    }>(
      params.token,
      /* GraphQL */ `
        mutation FlowOperationUpdateTaskStatus($input: UpdateTaskStatusInput!) {
          updateTaskStatus(input: $input) {
            pullRequest {
              ...GitStartPullRequest
            }
            task {
              ...GitStartTask
            }
          }
        }
        ${GitStartPullRequestFragment}
        ${GitStartTaskFragment}
      `,
      { input: params.input }
    );
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
      await opts.prisma.list.upsert({
        where: { slug: GITSTART_LIST_SLUG },
        create: {
          slug: GITSTART_LIST_SLUG,
          name: "GitStart Tickets & PRs",
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
        await opts.pgBoss.schedule(SYNC_ITEMS, "*/5 * * * *"); // every 5 minutes
      }
    },
    onCreateTask: async ({ task, actionData: _actionData }) => {
      const actionData = _actionData as { type: GitStartTaskType; status: GitStartTaskStatus };
      const itemPluginData = task.item?.pluginDatas.find((pd) => pd.pluginSlug === opts.pluginSlug);
      if (!itemPluginData?.originalId) return;
      const userInfoItem = await opts.store.getPluginItem<UserInfo>(USER_INFO_STORE_KEY);
      if (!userInfoItem) return;
      const { id: userId } = decodeNodeId(userInfoItem.value.id);

      const token = await getTokenFromStore();

      const itemPluginDataFull = itemPluginData.full as ItemPluginDataFull;
      if (itemPluginDataFull.type === "pull_request") {
        const { id: prId } = decodeNodeId(itemPluginData.originalId);
        const data = await gqlRequest<{
          createTask: {
            pullRequest: GitStartPullRequest;
            task: GitStartTask;
          };
        }>(
          token,
          /* GraphQL */ `
            mutation FlowOperationCreateTask($input: CreateTaskInput!) {
              createTask(input: $input) {
                pullRequest {
                  ...GitStartPullRequest
                }
                task {
                  ...GitStartTask
                }
              }
            }
            ${GitStartPullRequestFragment}
            ${GitStartTaskFragment}
          `,
          {
            input: {
              pullRequestInternalId: prId,
              title: task.title,
              type: actionData.type,
              status: "TODO", // the task is always created as TODO, then we update it to the desired status
              assigneeInternalId: userId,
            },
          }
        );
        const taskId = decodeNodeId(data.createTask.task.id).id;
        if (actionData.status === "IN_PROGRESS" || actionData.status === "FINISHED") {
          await updateTaskStatus({
            token,
            input: { taskInternalId: taskId, status: "IN_PROGRESS" },
          });
        }
        if (actionData.status === "FINISHED") {
          await updateTaskStatus({
            token,
            input: { taskInternalId: taskId, status: "FINISHED" },
          });
        }
        if (actionData.status === "CANCELED") {
          await updateTaskStatus({
            token,
            input: { taskInternalId: taskId, status: "CANCELED" },
          });
        }

        // update the item plugin data from the data returned from the createTask mutation
        const itemMin: PrItemPluginDataMin = {
          ...(itemPluginData.min as PrItemPluginDataMin),
          status: data.createTask.pullRequest.status,
        };
        const itemFull: PrItemPluginDataFull = {
          ...(itemPluginData.full as PrItemPluginDataFull),
          ...itemMin,
        };
        await opts.prisma.itemPluginData.update({
          where: { id: itemPluginData.id },
          data: {
            min: itemMin,
            full: itemFull,
            item: { update: { title: data.createTask.pullRequest.title } },
          },
        });

        const taskMin: TaskPluginDataMin = {
          type: data.createTask.task.type,
          ticketUrl: itemPluginDataFull.ticketUrl,
          status: data.createTask.task.status,
          githubPrUrl: itemPluginDataFull.url,
        };
        const taskFull: TaskPluginDataFull = {
          ...taskMin,
          id: data.createTask.task.id,
          pullRequest: itemPluginDataFull,
        };
        return {
          pluginData: {
            originalId: data.createTask.task.id,
            min: taskMin,
            full: taskFull,
          },
        };
      } else {
        // TODO: it's a ticket, so we need to create the pull request first then create the task
      }
    },
    onUpdateTaskStatus: async ({ task, newStatus }) => {
      const taskPluginData = task.pluginDatas.find((pd) => pd.pluginSlug === opts.pluginSlug);
      if (!taskPluginData?.originalId) return;
      const taskPluginDataFull = taskPluginData.full as TaskPluginDataFull;
      const { id: taskId } = decodeNodeId(taskPluginData.originalId);
      const token = await getTokenFromStore();
      let udpatedTaskPR;
      if (task.status === newStatus) return; // ignore if the status is the same as we most likely already updated the status.
      if (newStatus === "DONE") {
        if (taskPluginDataFull.status === "TO_DO") {
          const res = await updateTaskStatus({
            token,
            input: { taskInternalId: taskId, status: "IN_PROGRESS" },
          });
          if (res.updateTaskStatus.task.status !== "IN_PROGRESS") {
            throw new opts.GraphQLError(
              `GitStart task (id: ${taskPluginDataFull.id}) did not change status to In progress. Contact GitStart support for help.`
            );
          }
        }
        udpatedTaskPR = await updateTaskStatus({
          token,
          input: { taskInternalId: taskId, status: "FINISHED" },
        });
      } else if (newStatus === "CANCELED") {
        udpatedTaskPR = await updateTaskStatus({
          token,
          input: { taskInternalId: taskId, status: "CANCELED" },
        });
      } else if (newStatus === "TODO") {
        throw new opts.GraphQLError(
          'GitStart tasks cannot be set back to "To do" from "In progress". If needed, you can cancel the task and create a new one.'
        );
      }

      if (!udpatedTaskPR) return; // this should never happen since we throw an error if the new status doesn't qualify for an update
      const taskMin: TaskPluginDataMin = {
        ...(taskPluginData.min as TaskPluginDataMin),
        status: udpatedTaskPR.updateTaskStatus.task.status,
      };
      const taskFull: TaskPluginDataFull = {
        ...taskPluginDataFull,
        ...taskMin,
      };
      await opts.prisma.taskPluginData.update({
        where: { id: taskPluginData.id },
        data: { min: taskMin, full: taskFull },
      });
      if (!task.itemId) return;
      const item = await opts.prisma.item.findUnique({
        where: { id: task.itemId },
        include: { pluginDatas: true },
      });
      if (!item) return;
      const itemPluginData = item.pluginDatas.find((pd) => pd.pluginSlug === opts.pluginSlug);
      if (!itemPluginData) return;
      const itemMin: PrItemPluginDataMin = {
        ...(itemPluginData.min as PrItemPluginDataMin),
        status: udpatedTaskPR.updateTaskStatus.pullRequest.status,
      };
      const itemFull: PrItemPluginDataFull = {
        ...(itemPluginData.full as PrItemPluginDataFull),
        ...itemMin,
      };
      await opts.prisma.itemPluginData.update({
        where: { id: itemPluginData.id },
        data: { min: itemMin, full: itemFull },
      });
    },
    operations: {
      sync: async () => {
        await opts.pgBoss.send(SYNC_ITEMS, {});
        return { data: "Job sent to sync the GitStart items." };
      },
      scheduleSync: async () => {
        await opts.pgBoss
          .schedule(SYNC_ITEMS, "*/5 * * * *") // every 5 minutes
          .catch((err) => new opts.GraphQLError(err));
        return { data: "Schedule successfully set." };
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
          console.log(`Upserting PR ${pr.id}`);
          const isRelevant = RELEVANT_STATUSES.includes(pr.status);
          // need to first get the item from the DB so we can update the plugin data linked to the item
          const item = await opts.prisma.item.findFirst({
            where: { pluginDatas: { some: { originalId: pr.id, pluginSlug: opts.pluginSlug } } },
            include: { pluginDatas: { select: { id: true } } },
          });

          const clientId = decodeNodeId(pr.ticket.client.id).id;
          const min: ItemPluginDataMin = {
            type: "pull_request",
            ticketUrl: `https://developers.gitstart.com/client/${clientId}/ticket/${pr.ticket.code}`,
            url: pr.url,
            status: pr.status,
          };
          const full: ItemPluginDataFull = {
            ...min,
            id: pr.id,
            title: pr.title,
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

export type TaskPluginDataMin = {
  type: GitStartTaskType;
  ticketUrl: string;
  githubPrUrl: GitStartPullRequest["url"];
  status: GitStartTaskStatus;
};

type TaskPluginDataFull = TaskPluginDataMin & {
  id: GitStartTask["id"];
  pullRequest: PrItemPluginDataFull;
};

export type ItemPluginDataMin = TicketItemPluginDataMin | PrItemPluginDataMin;
type ItemPluginDataFull = TicketItemPluginDataFull | PrItemPluginDataFull;

type UserInfo = {
  id: string;
};

type PullRequestWithTicketTasks = GitStartPullRequest & {
  ticket: GitStartTicket;
  tasks: Array<GitStartTask>;
};

// -------------------- ticket types --------------------
export type GitStartTicketStatus =
  | "BACKLOG"
  | "AVAILABLE"
  | "IN_PROGRESS"
  | "PAUSED"
  | "FINISHED"
  | "CANCELED";
type GitStartTicket = {
  id: string;
  title: string;
  code: string;
  status: GitStartTicketStatus;
  description: string | null;
  descriptionType: "HTML" | "JIRA" | "MARKDOWN" | null;
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
    status
    description
    descriptionType
    client {
      id
    }
  }
`;
type TicketItemPluginDataMin = {
  type: "ticket"; // matches with node ID type
  ticketUrl: string;
  status: GitStartTicket["status"];
};
type TicketItemPluginDataFull = TicketItemPluginDataMin & {
  id: GitStartTicket["id"];
  code: GitStartTicket["code"];
  title: GitStartTicket["title"];
  client: GitStartTicket["client"];
};

// -------------------- PR types --------------------
export type GitStartPullRequestStatus =
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
  title: GitStartPullRequest["title"];
  ticket: GitStartTicket;
};

// -------------------- task types --------------------
export type GitStartTaskStatus = "CANCELED" | "FINISHED" | "IN_PROGRESS" | "TO_DO";
export type GitStartTaskType = "SPEC" | "CODE" | "REVIEW" | "QA" | "LEARNING";
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
