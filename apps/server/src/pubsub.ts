import { Item, Task, Day } from "@prisma/client";
import { createPubSub } from "graphql-yoga";
type PubSubSubs = {
  ItemsCreated: [item: Item[]];
  ItemsUpdated: [item: Item[]];
  ItemsDeleted: [item: Item[]];

  TasksCreated: [task: Task[]];
  TasksUpdated: [task: Task[]];
  TasksDeleted: [task: Task[]];

  DayUpdated: [day: Day[]];
};
export const pubsub = createPubSub<PubSubSubs>();
declare global {
  type PubSubKeys = keyof PubSubSubs;
}
