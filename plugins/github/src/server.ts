// for now this plugin just gets the user's GitHub notifications, specifically review requests (i.e. reason=review_requested)
import { definePlugin } from "@flowdev/plugin/server";
import { Octokit } from "@octokit/core";
import { components } from "@octokit/openapi-types";

export const TOKEN_STORE_KEY = "github-token";
export const GITHUB_NOTIFICATIONS_LIST_SLUG = "github-notifications";

export default definePlugin((opts) => {
  const SYNC_NOTIFICATIONS = `${opts.pluginSlug}-sync-notifications`;
  const LAST_SYNCED_NOTIFICATIONS_AT = `last-synced-notifications-at`;
  const getToken = async () => {
    const tokenItem = await opts.store.getPluginItem<string>(TOKEN_STORE_KEY);
    if (!tokenItem) {
      throw new opts.GraphQLError("Missing token to access GitHub API", {
        extensions: {
          code: "NOT_AUTHENTICATED",
          userFriendlyMessage: "You need to add your GitHub token in the plugin settings.",
        },
      });
    }
    return tokenItem.value;
  };
  const getOctokitClient = async () => {
    const token = await getToken();
    return new Octokit({ auth: token });
  };

  return {
    operations: {
      syncNotifications: async () => {
        await opts.pgBoss.send(SYNC_NOTIFICATIONS, {});
        return { data: "Job sent to sync the GitHub notifications." };
      },
      scheduleSyncNotifications: async () => {
        await opts.pgBoss
          .schedule(SYNC_NOTIFICATIONS, "*/5 * * * *") // every 5 minutes
          .catch((err) => new opts.GraphQLError(err));
        return { data: "Schedule successfully set." };
      },
    },
    onInstall: async () => {
      await opts.prisma.list.upsert({
        where: { slug: GITHUB_NOTIFICATIONS_LIST_SLUG },
        create: {
          slug: GITHUB_NOTIFICATIONS_LIST_SLUG,
          name: "GitHub Notifications",
          description: "All your notifications from GitHub.",
        },
        update: {
          name: "GitHub Notifications",
          description: "All your notifications from GitHub.",
        },
      });
    },
    onStoreItemUpsert: async (itemKey) => {
      if (itemKey === TOKEN_STORE_KEY) {
        await opts.pgBoss.send(SYNC_NOTIFICATIONS, {});
        await opts.pgBoss.schedule(SYNC_NOTIFICATIONS, "*/5 * * * *"); // every 5 minutes
      }
    },
    handlePgBossWork: (work) => [
      work(SYNC_NOTIFICATIONS, async () => {
        const lastSyncedAt = await opts.store.getPluginItem<string>(LAST_SYNCED_NOTIFICATIONS_AT);
        const octokit = await getOctokitClient();
        const notificationsRes = await octokit
          .request("GET /notifications", {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
            all: false,
            participating: true, // TODO: make this configurable
            since: lastSyncedAt?.value ?? opts.dayjs().subtract(1, "month").toISOString(),
            per_page: 50, // 50 is the maximum that GitHub allows at once
          })
          .catch((err) => {
            if (err.status === 304) return null; // no new notifications
            throw new opts.GraphQLError(err.message, {
              extensions: {
                code: "GITHUB_API_ERROR",
                userFriendlyMessage: "There was an error while fetching your GitHub notifications.",
              },
            });
          });

        const relevantNotifications =
          notificationsRes?.data.filter((notif) => notif.reason === "review_requested") ?? [];

        for (const notif of relevantNotifications) {
          // need to first get the item from the DB so we can update the plugin data linked to the item
          const item = await opts.prisma.item.findFirst({
            where: { pluginDatas: { some: { originalId: notif.id, pluginSlug: opts.pluginSlug } } },
            include: { pluginDatas: { select: { id: true } } },
          });

          const min: NotificationItemPluginDataMin = {
            type: notif.subject.type,
            reason: notif.reason,
            url: notif.subject.url,
            title: notif.subject.title,
            updatedAt: notif.updated_at,
          };
          const full: NotificationItemPluginDataFull = notif;

          if (item) {
            await opts.prisma.item.update({
              where: { id: item.id },
              data: {
                title: notif.subject.title,
                isRelevant: notif.unread,
                pluginDatas: {
                  update: {
                    where: { id: item.pluginDatas[0]!.id },
                    data: { min, full },
                  },
                },
              },
            });
          } else if (!notif.unread) {
            // do nothing since it's not relevant and not in the DB
          } else {
            await opts.prisma.item.create({
              data: {
                title: notif.subject.title,
                isRelevant: true,
                inboxPoints: 11, // TODO: make this configurable and also dependent on the type of notification
                list: { connect: { slug: GITHUB_NOTIFICATIONS_LIST_SLUG } },
                pluginDatas: {
                  create: {
                    pluginSlug: opts.pluginSlug,
                    originalId: notif.id,
                    min,
                    full,
                  },
                },
              },
            });
          }
        }

        await opts.store.setItem(LAST_SYNCED_NOTIFICATIONS_AT, new Date().toISOString());
      }),
    ],
    onCreateTask: async ({ task }) => {
      const itemPluginData = task.item?.pluginDatas?.find(
        (pd) => pd.pluginSlug === opts.pluginSlug,
      );
      if (!itemPluginData?.originalId) return;
      return {
        pluginData: {
          originalId: itemPluginData.originalId,
          min: itemPluginData.min as NotificationItemPluginDataMin,
          full: itemPluginData.full as NotificationItemPluginDataFull,
        },
      };
    },
  };
});

export type NotificationItemPluginDataMin = {
  /** The type of the notification. */
  type: string;
  /** The reason for the notification. */
  reason: string;
  /** The of the actionable to go to for the notification. */
  url: string;
  /** The title of the actionable to go to for the notification. */
  title: string;
  /** The date the notification was updated. */
  updatedAt: string;
};
export type NotificationItemPluginDataFull = components["schemas"]["thread"];
