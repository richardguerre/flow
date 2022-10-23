import { builder } from "./builder";
import { Task, TaskTemplate } from "@prisma/client";
import { TaskType } from "./Task";
import { TaskTemplateType } from "./TaskTemplate";
import { loadDayEdges, loadOneDay, toDateOnly } from "../utils/getDays";

// -------------- Day types --------------

export type DayObjectType = {
  date: Date;
  tasks: Task[];
  repeatingTasks: TaskTemplate[];
};
/**
 * Maybe refactor to use builder.prismaNode instead
 * repeatingTasks has it's own resolver which uses the day.tasks to filter down
 */
const DayObjectRef = builder.objectRef<DayObjectType>("Day");
export const DayType = builder.node(DayObjectRef, {
  name: "Day",
  description: "A day in the calendar. Contains tasks and repeating tasks for that day",
  id: { resolve: (day) => toDateOnly(day.date) },
  loadOne: (id) => loadOneDay(id),
  fields: (t) => ({
    date: t.expose("date", { type: "Date", description: "The date of the day." }),
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
