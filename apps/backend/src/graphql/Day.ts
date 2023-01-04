import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { Task, Note, Routine } from "@prisma/client";
import {
  endOfDay,
  getDayOfWeek,
  getStartFromConnectionArgs,
  startOfDay,
  toDateOnly,
} from "../utils/getDays";

// -------------- Day types --------------

export type DayObjectType = {
  date: Date;
  tasks: Task[];
  notes: Note[];
  routines: Routine[];
};
/**
 * Maybe refactor to use builder.prismaNode instead
 */
// const DayObjectRef = builder.objectRef<DayObjectType>("Day");
export const DayType = builder.prismaNode("Day", {
  id: { resolve: (day) => toDateOnly(day.date) },
  findUnique: (date) => ({ date: new Date(date) }),
  // description: "A day in the calendar. Contains tasks and repeating tasks for that day",
  fields: (t) => ({
    date: t.expose("date", { type: "Date", description: "The date of the day." }),
    notes: t.relation("notes"),
    tasks: t.relation("tasks", {
      resolve: async (query, day) => {
        const tasks = await prisma.task.findMany({
          ...query,
          where: { date: day.date },
        });
        const tasksOrdered = tasks.sort((a, b) => {
          return day.tasksOrder.indexOf(a.id) - day.tasksOrder.indexOf(b.id);
        });
        return tasksOrdered;
      },
    }),
    routines: t.prismaField({
      type: ["Routine"],
      resolve: async (query, day) => {
        return prisma.routine.findMany({
          ...query,
          where: {
            isActive: true,
            repeats: { has: getDayOfWeek(day.date) },
            firstDay: { lte: day.date },
            OR: [{ lastDay: null }, { lastDay: { gte: day.date } }],
          },
        });
      },
    }),
  }),
});

// -------------- Day query types --------------

builder.queryField("days", (t) =>
  t.prismaConnection({
    type: "Day",
    cursor: "date",
    description: `Get days using a Relay connection.
If no arguments are provided, it will return the current day.
If \`first\` is provided, it will return the current day and the following days.
If \`after\` is provided, it will return the days after the given date.
If \`last\` is provided, it will return the current day and the previous days.
If \`before\` is provided, it will return the days before the given date.`,
    resolve: async (query, _parent, args) => {
      const start = startOfDay(getStartFromConnectionArgs(args));
      const numberOfDays = args.first ?? args.last ?? 1;
      const end = endOfDay(start);
      end.setDate(end.getDate() + numberOfDays - 1);
      return prisma.day.findMany({ ...query, where: { date: { gte: start, lte: end } } });
    },
  })
);
