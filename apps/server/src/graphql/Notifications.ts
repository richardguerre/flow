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

builder.subscriptionField("notifications", (t) =>
  t.field({
    type: NotificationsType,
    subscribe(_parent, _args, _context, _info) {
      return Repeater.merge([
        undefined, // to make sure the subscription is initialized it will return empty arrays
        pipe(
          pubsub.subscribe("ItemsCreated"),
          map((items) => ({ ItemsCreated: items })),
        ),
        pipe(
          pubsub.subscribe("ItemsUpdated"),
          map((items) => ({ ItemsUpdated: items })),
        ),
        pipe(
          pubsub.subscribe("ItemsDeleted"),
          map((items) => ({ ItemsDeleted: items })),
        ),

        pipe(
          pubsub.subscribe("TasksCreated"),
          map((tasks) => ({ TasksCreated: tasks })),
        ),
        pipe(
          pubsub.subscribe("TasksUpdated"),
          map((tasks) => ({ TasksUpdated: tasks })),
        ),
        pipe(
          pubsub.subscribe("TasksDeleted"),
          map((tasks) => ({ TasksDeleted: tasks })),
        ),
      ]);
    },
    resolve: (payload) => {
      return {
        itemsCreated: getArrayInObj(payload, "ItemsCreated"),
        itemsUpdated: getArrayInObj(payload, "ItemsUpdated"),
        itemsDeleted: getArrayInObj(payload, "ItemsDeleted"),

        tasksCreated: getArrayInObj(payload, "TasksCreated"),
        tasksUpdated: getArrayInObj(payload, "TasksUpdated"),
        tasksDeleted: getArrayInObj(payload, "TasksDeleted"),
      };
    },
  }),
);

const getArrayInObj = <T extends object>(payload: T | undefined, type: string) => {
  if (!payload) return [];
  if (type in payload) {
    return payload[type as keyof typeof payload];
  }
  return [];
};
