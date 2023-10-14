import { Repeater, pipe, map } from "graphql-yoga";
import { pubsub } from "../pubsub";
import { TaskType } from "./Task";
import { builder } from "./builder";
import { ItemType } from "./Item";

const NotificationsType = builder.simpleObject("Notifications", {
  fields: (t) => ({
    // the field names here match the pubsub keys in apps/server/src/pubsub.ts
    itemsCreated: t.field({ type: [ItemType] }),
    itemsUpdated: t.field({ type: [ItemType] }),
    itemsDeleted: t.field({ type: [ItemType] }),

    tasksCreated: t.field({ type: [TaskType] }),
    tasksUpdated: t.field({ type: [TaskType] }),
    tasksDeleted: t.field({ type: [TaskType] }),
  }),
});

const getArrayInObj = <T extends object>(payload: T | undefined, type: string) => {
  if (!payload) return [];
  if (type in payload) {
    return payload[type as keyof typeof payload];
  }
  return [];
};
builder.subscriptionField("notifications", (t) =>
  t.field({
    type: NotificationsType,
    subscribe(_parent, _args, _context, _info) {
      return Repeater.merge([
        undefined, // to make sure the subscription is initialized it will return empty arrays
        pipe(
          pubsub.subscribe("itemsCreated"),
          map((items) => ({ itemsCreated: items })),
        ),
        pipe(
          pubsub.subscribe("itemsUpdated"),
          map((items) => ({ itemsUpdated: items })),
        ),
        pipe(
          pubsub.subscribe("itemsDeleted"),
          map((items) => ({ itemsDeleted: items })),
        ),

        pipe(
          pubsub.subscribe("tasksCreated"),
          map((tasks) => ({ tasksCreated: tasks })),
        ),
        pipe(
          pubsub.subscribe("tasksUpdated"),
          map((tasks) => ({ tasksUpdated: tasks })),
        ),
        pipe(
          pubsub.subscribe("tasksDeleted"),
          map((tasks) => ({ tasksDeleted: tasks })),
        ),
      ]);
    },
    resolve: (payload) => {
      return {
        itemsCreated: getArrayInObj(payload, "itemsCreated"),
        itemsUpdated: getArrayInObj(payload, "itemsUpdated"),
        itemsDeleted: getArrayInObj(payload, "itemsDeleted"),

        tasksCreated: getArrayInObj(payload, "tasksCreated"),
        tasksUpdated: getArrayInObj(payload, "tasksUpdated"),
        tasksDeleted: getArrayInObj(payload, "tasksDeleted"),
      };
    },
  }),
);
