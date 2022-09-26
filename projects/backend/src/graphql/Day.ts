import { builder } from "./builder";
import { Task, TaskTemplate } from "@prisma/client";
import { TaskType } from "./Task";
import { TaskTemplateType } from "./TaskTemplate";
import { loadDayEdges, loadOneDay, startOfDay } from "../utils/getDays";

// -------------- Day types --------------

export type DayObjectType = {
  date: Date;
  tasks: Task[];
  repeatingTasks: TaskTemplate[];
};

const DayObjectRef = builder.objectRef<DayObjectType>("Day");
export const DayType = builder.node(DayObjectRef, {
  name: "Day",
  id: { resolve: (day) => startOfDay(day.date).toJSON() },
  loadOne: loadOneDay,
  fields: (t) => ({
    date: t.expose("date", { type: "Date" }),
    tasks: t.expose("tasks", { description: "Tasks planned on that day", type: [TaskType] }),
    repeatingTasks: t.expose("repeatingTasks", {
      description: `Task templates of repeating tasks on that day.
        It does not contain templates of tasks that were already created for that day.`,
      type: [TaskTemplateType],
    }),
  }),
});

// -------------- Day query types --------------

builder.queryField("days", (t) =>
  t.connection({
    type: DayType,
    description: `Get days using a Relay connection.
      If no arguments are provided, it will return the current day.
      If \`first\` is provided, it will return the current day and the following days.
      If \`after\` is provided, it will return the days after the given date.
      If \`last\` is provided, it will return the current day and the previous days.
      If \`before\` is provided, it will return the days before the given date.`,
    resolve: async (_parent, { first, after, last, before }) => {
      const { edges, startCursor, endCursor } = await loadDayEdges({ first, after, last, before });
      return {
        edges,
        pageInfo: {
          hasNextPage: true, // always true because there are infinite days
          hasPreviousPage: true, // always true because there are infinite days
          startCursor,
          endCursor,
        },
      };
    },
  })
);