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
const withPubsub = (delegate: any, pub: Pub) => ({
  ...delegate,
  // @ts-ignore as the types are too complex but runtime works
  async create(args) {
    const res = await delegate.create(args);
    pub("Created", [res], { args: args.data, operation: "create" });
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async createMany(args) {
    const now = dayjs().subtract(1, "second").toDate();
    const res = await delegate.createMany(args);
    // ❗️ this might not be reliable, but should do the trick for pubsub
    const created = await delegate.findMany({ where: { createdAt: { gte: now } } });
    pub("Created", created, { args: {}, operation: "createMany" });
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async update(args) {
    const res = await delegate.update(args);
    pub("Updated", [res], { args: args.data, operation: "update" });
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async updateMany(args) {
    const now = dayjs().subtract(1, "second").toDate();
    const res = await delegate.updateMany(args);
    // ❗️ this might not be reliable, but should do the trick for pubsub
    const updated = await delegate.findMany({ where: { updatedAt: { gte: now } } });
    pub("Updated", updated, { args, operation: "updateMany" });
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async upsert(args) {
    const res = await delegate.upsert(args);
    if (dayjs(res.updatedAt).isSame(dayjs(res.createdAt))) {
      pub("Created", [res], { args: { c: args.create, u: args.update }, operation: "upsert" });
    } else {
      pub("Updated", [res], { args: { c: args.create, u: args.update }, operation: "upsert" });
    }
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async delete(args) {
    const res = await delegate.delete(args);
    pub("Deleted", [res], { args, operation: "delete" });
    return res;
  },
  // @ts-ignore as the types are too complex but runtime works
  async deleteMany(args) {
    // first get the rows to be deleted so we can publish them after they are deleted
    const toBeDeleted = await delegate.findMany(args);
    const res = await delegate.deleteMany(args);
    pub("Deleted", toBeDeleted, { args, operation: "deleteMany" });
    return res;
  },
});

// @ts-ignore as this works in runtime
export const prisma: typeof $prisma = {
  ...$prisma,
  task: withPubsub($prisma.task, (action, rows) =>
    pubsub.publish(`Tasks${action}`, rows as Task[]),
  ),
  item: withPubsub($prisma.item, (action, rows, op) => {
    if (op.operation === "create" || op.operation === "update" || op.operation === "upsert") {
      taskPubsub(op.args, (action, rowsRaw) => pubsub.publish(`Tasks${action}`, rowsRaw as Task[]));
    }
    pubsub.publish(`Items${action}`, rows as Item[]);
  }),
  // @ts-ignore as this works in runtime
  async $transaction<R>(
    fn: (prisma: Prisma.TransactionClient) => Promise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): Promise<R> {
    const tasksCreated: Task[] = [];
    const tasksUpdated: Task[] = [];
    const tasksDeleted: Task[] = [];
    const itemsCreated: Item[] = [];
    const itemsUpdated: Item[] = [];
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
            case "Deleted":
              itemsDeleted.push(...rows);
              break;
          }
        }),
      });
    }, options);
    if (tasksCreated.length) pubsub.publish("TasksCreated", tasksCreated);
    if (tasksUpdated.length) pubsub.publish("TasksUpdated", tasksUpdated);
    if (tasksDeleted.length) pubsub.publish("TasksDeleted", tasksDeleted);
    if (itemsCreated.length) pubsub.publish("ItemsCreated", itemsCreated);
    if (itemsUpdated.length) pubsub.publish("ItemsUpdated", itemsUpdated);
    if (itemsDeleted.length) pubsub.publish("ItemsDeleted", itemsDeleted);

    return res;
  },
  $executeRaw: $prisma.$executeRaw,
  $executeRawUnsafe: (...args) => $prisma.$executeRawUnsafe(...args),
  $on: $prisma.$on,
  $use: $prisma.$use,
  $connect: $prisma.$connect,
  $disconnect: $prisma.$disconnect,
  $queryRaw: $prisma.$queryRaw,
  $queryRawUnsafe: $prisma.$queryRawUnsafe,
};

const taskPubsub = (
  /** args should only contain the potential args that operate on tasks */
  args: any,
  pub: Pub,
) => {
  setImmediate(async () => {
    const secondsAgo = dayjs().subtract(3, "second").toDate();
    if (!/task/i.test(JSON.stringify(args))) return;
    const created = await $prisma.task.findMany({
      where: { createdAt: { gte: secondsAgo } },
    });
    const updated = await $prisma.task.findMany({
      where: { updatedAt: { gte: secondsAgo } },
    });
    pub("Created", created, { args: {}, operation: "create" });
    pub("Updated", updated, { args: {}, operation: "update" });
  });
};

type Pub = <T>(
  action: "Created" | "Updated" | "Deleted",
  rows: T,
  op: {
    operation:
      | "create"
      | "createMany"
      | "update"
      | "updateMany"
      | "upsert"
      | "delete"
      | "deleteMany";
    args: any;
  },
) => void;
