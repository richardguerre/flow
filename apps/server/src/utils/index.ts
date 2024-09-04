import { FlowPluginSlug, StoreKeys } from "../graphql/Store";
import { prisma } from "./prisma";
import { pgBoss } from "./pgBoss";
import { dayjs } from "./dayjs";
import PgBoss from "pg-boss";
import { Item } from "@prisma/client";
import { getPlugins } from "./getPlugins";
import { env } from "../env";

export const ROLLOVER_TASKS_JOB_NAME = "rollover-tasks-to-today";
export const DELETE_PGBOSS_ARCHIVE_JOB_NAME = "delete-pgboss-archive";
export const CALENDAR_ITEM_CREATED_JOB_NAME = "calendar-item-created";
const DEFAULT_4AM_CRON = "0 4 * * *";
const ROLLOVER_TASKS_CRON = DEFAULT_4AM_CRON;
const EVERY_3_DAYS_CRON = "10 4 */3 * *"; // every 3 days at 04:10

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

const deletePgBossArchive: PgBoss.WorkHandler<void> = async () => {
  console.log("🗑️ Deleting pgboss archive...");
  await prisma.$executeRawUnsafe(`TRUNCATE pgboss.archive;`);
  console.log("✅ Deleted pgboss archive.");
};

export const scheduleDeletePgBossArchive = async (timezone: string = "Etc/GMT-11") => {
  // delete pgboss archive every day at 04:00 (least busy time of the day)
  await pgBoss.schedule(DELETE_PGBOSS_ARCHIVE_JOB_NAME, EVERY_3_DAYS_CRON, undefined, {
    tz: timezone,
    singletonKey: DELETE_PGBOSS_ARCHIVE_JOB_NAME,
  });
  console.log(`✅ Scheduled ${DELETE_PGBOSS_ARCHIVE_JOB_NAME} job.`);
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
    console.log("Started worker to sync tasks");
  }
  if (env.NODE_ENV !== "development") {
    await pgBoss.work(DELETE_PGBOSS_ARCHIVE_JOB_NAME, deletePgBossArchive);
    console.log("Started worker to delete pgboss archive");
  }
  await pgBoss.work(CALENDAR_ITEM_CREATED_JOB_NAME, createExternalCalendarItem);
  console.log("Started worker to create calendar events");
};
