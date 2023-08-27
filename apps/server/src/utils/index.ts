import { FlowPluginSlug, StoreKeys } from "../graphql/Store";
import { prisma } from "./prisma";
import { pgBoss } from "./pgBoss";
import { dayjs } from "./dayjs";

export const SYNC_TASKS_JOB_NAME = "sync-tasks";
const SYNC_TASKS_CRON = "0 4 * * *";

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
    where: { status: { notIn: ["DONE", "CANCELED"] }, date: { lt: usersToday } },
    data: { date: usersToday },
  });
  console.log(`✅ Synced ${res.count} tasks.`);
};

export const scheduleSyncTasks = async (timezone: string = "Etc/GMT-11") => {
  // sync tasks every day at 04:00 (least busy time of the day)
  await pgBoss.schedule(SYNC_TASKS_JOB_NAME, SYNC_TASKS_CRON, undefined, {
    tz: timezone,
    singletonKey: SYNC_TASKS_JOB_NAME,
  });
  console.log(`✅ Scheduled "${SYNC_TASKS_JOB_NAME}" job.`);
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