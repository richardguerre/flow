import { Item, Prisma, PrismaClient, Task } from "@prisma/client";
import { env } from "../env";
import { pubsub } from "../pubsub";
import { dayjs } from "./dayjs";

const $prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});

/**
 * ❗️ DO NOT USE THIS IF THE MODEL DOESN'T HAVE `createdAt` NOR `updatedAt` COLUMNS
 *
 * This is a wrapper around the prisma client model delegates that will publish
 * events to the pubsub for each of the defined operartions below.
 */
// TODO: better types for the deletegate
const withPubsub = (
  delegate: any,
  pub: <T>(action: "Created" | "Updated" | "Upserted" | "Deleted", rows: T) => void
) => ({
  ...delegate,
  // @ts-ignore as the types are too complex but runtime works
  async create(args) {
    const res = await delegate.create(args);
    pub("Created", [res]);
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async createMany(args) {
    const now = dayjs().subtract(1, "second").toDate();
    await delegate.createMany(args);
    // ❗️ this might not be reliable, but should do the trick for pubsub
    const res = await delegate.findMany({ where: { createdAt: { gte: now } } });
    pub("Created", res);
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async update(args) {
    const res = await delegate.update(args);
    pub("Updated", [res]);
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async updateMany(args) {
    const now = dayjs().subtract(1, "second").toDate();
    await delegate.updateMany(args);
    // ❗️ this might not be reliable, but should do the trick for pubsub
    const res = await delegate.findMany({ where: { updatedAt: { gte: now } } });
    pub("Updated", res);
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async upsert(args) {
    const res = await delegate.upsert(args);
    pub("Upserted", [res]);
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async delete(args) {
    const res = await delegate.delete(args);
    pub("Deleted", [res]);
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async deleteMany(args) {
    // first get the rows to be deleted so we can publish them after they are deleted
    const res = await delegate.findMany(args);
    await delegate.deleteMany(args);
    pub("Deleted", res);
    return res;
  },
});

// @ts-ignore as this works in runtime
export const prisma: typeof $prisma = {
  ...$prisma,
  task: withPubsub($prisma.task, (action, rows) =>
    pubsub.publish(`tasks${action}`, rows as Task[])
  ),
  item: withPubsub($prisma.item, (action, rows) =>
    pubsub.publish(`items${action}`, rows as Item[])
  ),
  // @ts-ignore as this works in runtime
  async $transaction<R>(
    fn: (prisma: Prisma.TransactionClient) => Promise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): Promise<R> {
    const tasksCreated: Task[] = [];
    const tasksUpdated: Task[] = [];
    const tasksUpserted: Task[] = [];
    const tasksDeleted: Task[] = [];
    const itemsCreated: Item[] = [];
    const itemsUpdated: Item[] = [];
    const itemsUpserted: Item[] = [];
    const itemsDeleted: Item[] = [];

    if (typeof fn !== "function") {
      // @ts-ignore as this works in runtime
      return $prisma.$transaction(fn, options);
    }
    const res = await $prisma.$transaction((tx) => {
      return fn({
        ...tx,
        task: withPubsub(tx.task, (action, rowsRaw) => {
          const rows = rowsRaw as Task[];
          switch (action) {
            case "Created":
              tasksCreated.push(...rows);
              break;
            case "Updated":
              tasksUpdated.push(...rows);
              break;
            case "Upserted":
              tasksUpserted.push(...rows);
              break;
            case "Deleted":
              tasksDeleted.push(...rows);
              break;
          }
        }),
        item: withPubsub(tx.item, (action, rowsRaw) => {
          const rows = rowsRaw as Item[];
          switch (action) {
            case "Created":
              itemsCreated.push(...rows);
              break;
            case "Updated":
              itemsUpdated.push(...rows);
              break;
            case "Upserted":
              itemsUpserted.push(...rows);
              break;
            case "Deleted":
              itemsDeleted.push(...rows);
              break;
          }
        }),
      });
    }, options);
    if (tasksCreated.length) pubsub.publish("tasksCreated", tasksCreated);
    if (tasksUpdated.length) pubsub.publish("tasksUpdated", tasksUpdated);
    if (tasksUpserted.length) pubsub.publish("tasksUpserted", tasksUpserted);
    if (tasksDeleted.length) pubsub.publish("tasksDeleted", tasksDeleted);
    if (itemsCreated.length) pubsub.publish("itemsCreated", itemsCreated);
    if (itemsUpdated.length) pubsub.publish("itemsUpdated", itemsUpdated);
    if (itemsUpserted.length) pubsub.publish("itemsUpserted", itemsUpserted);
    if (itemsDeleted.length) pubsub.publish("itemsDeleted", itemsDeleted);

    return res;
  },
  $executeRaw: $prisma.$executeRaw,
  $executeRawUnsafe: $prisma.$executeRawUnsafe,
  $on: $prisma.$on,
  $use: $prisma.$use,
  $connect: $prisma.$connect,
  $disconnect: $prisma.$disconnect,
  $queryRaw: $prisma.$queryRaw,
  $queryRawUnsafe: $prisma.$queryRawUnsafe,
};
