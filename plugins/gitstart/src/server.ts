import { definePlugin } from "@flowdev/plugin/server";

export const TOKEN_STORE_KEY = "gitstart-session-token";
const RELEVANT_STATUSES = [
  "PLANNED",
  "IN_PROGRESS",
  "INTERNAL_REVIEW",
  "CLIENT_REVIEW",
] as PullRequestStatus[];

export default definePlugin((opts) => {
  const GITSTART_LIST_SLUG = "gitstart-items";
  const UPSERT_PR_JOB_NAME = `${opts.pluginSlug}-upsert-pr-as-item`;

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
    operations: {
      sync: async () => {
        const token = await getTokenFromStore();
        const data1 = await gqlRequest<{
          viewer: { actionablePullRequests: PullRequestWithTicketTasks[] };
        }>(
          token,
          /* GraphQL */ `
            query FlowOperationSyncPRsAndTasks {
              viewer {
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

        for (const pr of data1.viewer.actionablePullRequests) {
          await opts.pgBoss.send(UPSERT_PR_JOB_NAME, pr);
        }

        return {
          data: "Job sent to sync the GitStart items.",
        };
      },
    },
    handlePgBossWork: (work) => [
      work(UPSERT_PR_JOB_NAME, { batchSize: 10 }, async (jobs) => {
        for (const job of jobs) {
          const pr = job.data as PullRequestWithTicketTasks;
          const isRelevant = RELEVANT_STATUSES.includes(pr.status);
          // need to first get the item from the DB so we can update the plugin data linked to the item
          const item = await opts.prisma.item.findFirst({
            where: { pluginDatas: { some: { originalId: pr.id, pluginSlug: opts.pluginSlug } } },
            include: { pluginDatas: { select: { id: true } } },
          });

          const min = {
            ticketUrl: `https://developers.gitstart.com/client/${pr.ticket.client.id}/ticket/${pr.ticket.code}`,
            githubUrl: pr.url,
            status: pr.status,
          };
          const full = {
            ...min,
            completedAt: pr.completedAt,
            githubNumber: pr.number,
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

type PullRequestWithTicketTasks = GitStartPullRequest & {
  ticket: GitStartTicket;
  tasks: Array<GitStartTask>;
};

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

type PullRequestStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "INTERNAL_REVIEW"
  | "CLIENT_REVIEW"
  | "CANCELED"
  | "APPROVED"
  | "MERGED";
type GitStartPullRequest = {
  id: string;
  status: PullRequestStatus;
  title: string;
  completedAt: string | null;
  url: string | null;
  number: number | null;
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

type GitStartTask = {
  id: string;
  status: string;
  title: string;
};
const GitStartTaskFragment = /* GraphQL */ `
  fragment GitStartTask on Task {
    id
    status
    title
  }
`;
