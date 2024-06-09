import { FlowPluginSlug, StoreKeys } from "../graphql/Store";
import { prisma } from "./prisma";
import { pgBoss } from "./pgBoss";
import { dayjs } from "./dayjs";
import PgBoss from "pg-boss";
import { Item } from "@prisma/client";
import { getPlugins } from "./getPlugins";
import { env } from "../env";

export const ROLLOVER_TASKS_JOB_NAME = "rollover-tasks-to-today";
export const CALENDAR_ITEM_CREATED_JOB_NAME = "calendar-item-created";
const ROLLOVER_TASKS_CRON = "0 4 * * *";

export const syncTasks = async () => {
  console.log("-- Syncing tasks...");
  const usersTimezone = await getTimezone();
  const usersToday = dayjs().tz(usersTimezone).utc(true).startOf("day").toDate(); // this works such that if the server is in "America/New_York" and the user is in "Asia/Hong_Kong" then the user's today is the server's tomorrow
  // create the day if it's not already created
  await prisma.day.upsert({
    where: { date: usersToday },
    create: { date: usersToday },
    update: {},
  });
  const res = await prisma.task.updateMany({
    where: {
      status: { notIn: ["DONE", "CANCELED"] },
      date: { lt: usersToday },
      OR: [{ item: null }, { item: { scheduledAt: null } }], // for now ignore tasks with items that have a scheduledAt date
    },
    data: { date: usersToday },
  });
  console.log(`✅ Synced ${res.count} tasks.`);
};

export const scheduleRolloverTasks = async (timezone: string = "Etc/GMT-11") => {
  // sync tasks every day at 04:00 (least busy time of the day)
  await pgBoss.schedule(ROLLOVER_TASKS_JOB_NAME, ROLLOVER_TASKS_CRON, undefined, {
    tz: timezone,
    singletonKey: ROLLOVER_TASKS_JOB_NAME,
  });
  console.log(`✅ Scheduled "${ROLLOVER_TASKS_JOB_NAME}" job.`);
};

export const isSessionTokenValid = async (sessionToken: string | undefined) => {
  if (!sessionToken) {
    return false;
  } else {
    const sessionItem = await prisma.store.findFirst({
      where: {
        pluginSlug: FlowPluginSlug,
        key: { startsWith: StoreKeys.AUTH_SESSION_PREFIX },
        AND: [
          { value: { path: ["token"], equals: sessionToken } },
          { value: { path: ["expiresAt"], gt: new Date().toISOString() } },
        ],
      },
    });
    if (!sessionItem) {
      return false;
    }
  }
  return true;
};

export const getTimezone = async () => {
  const timezoneItem = await prisma.store.findFirst({
    where: {
      pluginSlug: FlowPluginSlug,
      key: StoreKeys.TIMEZONE,
    },
  });
  const timezone = timezoneItem?.value as string | undefined;
  try {
    dayjs().tz(timezone as string); // check if timezone is valid
    return timezone;
  } catch {
    return undefined;
  }
};

export type ItemWithTasks = Item & { tasks: { id: number }[] };
export type PluginOnCreateCalendarItem = (input: { item: ItemWithTasks }) => Promise<void>;

const createExternalCalendarItem: PgBoss.WorkHandler<ItemWithTasks> = async ({ data: item }) => {
  console.log("📅 Creating calendar event for item", item.id);
  const plugins = await getPlugins();
  for (const plugin of Object.values(plugins)) {
    if (!plugin.onCreateCalendarItem) continue;
    await plugin.onCreateCalendarItem({ item });
  }
};

export const pgBossWorkers = async () => {
  if (env.NODE_ENV !== "development") {
    await pgBoss.work(ROLLOVER_TASKS_JOB_NAME, syncTasks);
    console.log("Started job to sync tasks");
  }
  await pgBoss.work(CALENDAR_ITEM_CREATED_JOB_NAME, createExternalCalendarItem);
  console.log("Started job to create calendar events");
};
