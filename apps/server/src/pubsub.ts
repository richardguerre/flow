import { Item, Task } from "@prisma/client";
import { createPubSub } from "graphql-yoga";
type PubSubSubs = {
  itemsCreated: [item: Item[]];
  itemsUpdated: [item: Item[]];
  itemsDeleted: [item: Item[]];

  tasksCreated: [task: Task[]];
  tasksUpdated: [task: Task[]];
  tasksDeleted: [task: Task[]];
};
export const pubsub = createPubSub<PubSubSubs>();
declare global {
  type PubSubKeys = keyof PubSubSubs;
}
