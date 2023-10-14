import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { Task, Note, Routine } from "@prisma/client";
import { endOfDay, getDayOfWeek, getStartFromConnectionArgs, toDateOnly } from "../utils/getDays";
import { queryFromInfo } from "@pothos/plugin-prisma";

// -------------- Day types --------------

export const DayType = builder.prismaNode("Day", {
  id: { resolve: (day) => toDateOnly(day.date) },
  findUnique: (date) => ({ date: new Date(date) }),
  nullable: true,
  extensions: {
    // this resolves the day to an empty node if it doesn't exist in the database so that the `node` query for a day doesn't return null.
    // the @pothos/plugin-prisma package had to be patched to support this. see the /patches folder at the root.
    resolveWhenNull: (findUniqueRes: any) => createEmptyNode(findUniqueRes),
  },
  fields: (t) => ({
    date: t.expose("date", { type: "Date", description: "The date of the day." }),
    notes: t.relation("notes"),
    tasks: t.prismaField({
      type: ["Task"],
      resolve: async (query, day) => {
        const dayInfo = await prisma.day.findUnique({
          where: { date: day.date },
          select: { tasksOrder: true },
        });
        const order = dayInfo?.tasksOrder ?? day.tasksOrder; // day.tasksOrder might be outdated if the tasksOrder was updated in another request
        const tasks = await prisma.task.findMany({
          ...query,
          where: { date: day.date },
        });
        const tasksOrdered = tasks.sort((a, b) => {
          return order.indexOf(a.id) - order.indexOf(b.id);
        });
        return tasksOrdered;
      },
    }),
    routines: t.prismaField({
      type: ["Routine"],
      description: "The routines for the day in chronological order.",
      select: { date: true, routinesCompleted: { select: { id: true } } },
      resolve: async (query, day) => {
        const completedRoutineIds = new Set(day.routinesCompleted.map((routine) => routine.id));
        const routines = await prisma.routine.findMany({
          ...query,
          orderBy: { time: "asc" },
          where: {
            isActive: true,
            repeats: { has: getDayOfWeek(day.date) },
            firstDay: { lte: day.date },
            OR: [{ lastDay: null }, { lastDay: { gte: day.date } }],
          },
        });
        return routines.map((routine) => ({
          ...routine,
          // see the resolver in Routine.ts to see how this _done field is used
          _done: completedRoutineIds.has(routine.id),
        }));
      },
    }),
  }),
});

// -------------- Day query types --------------

type DayResolutionType = {
  __typename: "Day";
  id: `Day_${string}`;
  date: Date;
  tasksOrder: number[];
  tasks: Task[];
  notes: Note[];
  routines: Routine[];
  routinesCompleted: { id: string }[];
};
type DayEdge = { cursor: string; node: DayResolutionType };

builder.queryField("days", (t) =>
  t.connection({
    type: DayType,
    extensions: {
      pothosPrismaFallback: () => console.log("fallback"),
    },
    description: `Get days using a Relay connection.

If no arguments are provided, it will return the current day.

If \`first\` (Int) is provided, it will return the current day and the following days.

If \`after\` (Date*) is provided, it will return the days after the given date.

If \`last\` (Int) is provided, it will return the current day and the previous days.

If \`before\` (Date*) is provided, it will return the days before the given date.

*Ignore that the GraphQL type is ID as Pothos doesn't support overriding the type of the connection fields.
Please input a Date in the format: YYYY-MM-DD`,
    resolve: async (_, args, context, info) => {
      const start = getStartFromConnectionArgs(args);
      const totalDays = args.first ?? args.last ?? 1;
      const end = endOfDay(new Date(start));
      end.setDate(end.getDate() + totalDays - 1);

      // In order to dataload the relations of the Day type, we need to create a query object that contains the select and include arguments.
      // Using queryFromInfo creates the query object found when using t.prismaConnection. See https://github.com/hayes/pothos/blob/main/packages/plugin-prisma/src/field-builder.ts#L122-L128
      const days = await prisma.day.findMany({
        ...queryFromInfo({ context, info, typeName: "Day", path: ["edges", "node"] }),
        where: { date: { gte: start, lte: end } },
      });

      const dayMap = new Map(days.map((day) => [toDateOnly(day.date), day as DayResolutionType]));
      const dayEdges: DayEdge[] = [];
      const dateCursor = new Date(start);
      for (const _ of Array.from({ length: totalDays })) {
        const day = toDateOnly(dateCursor);
        dayEdges.push({
          cursor: day,
          node: dayMap.get(day) ?? createEmptyNode({ date: new Date(dateCursor) }), // new Date is required because the below code mutates the dateCursor
        });
        dateCursor.setDate(dateCursor.getDate() + 1); // sets start for the next iteration
      }

      return {
        edges: dayEdges,
        pageInfo: {
          hasNextPage: true, // always true because there are infinite days
          hasPreviousPage: true, // always true because there are infinite days
          startCursor: toDateOnly(start),
          endCursor: toDateOnly(end),
        },
      };
    },
  }),
);

/**
 * Creates a DayResolutionType object with empty arrays for the relations.
 */
const createEmptyNode = ({ date }: { date: Date }): DayResolutionType => ({
  __typename: "Day",
  id: `Day_${toDateOnly(date)}`,
  date,
  tasksOrder: [],
  notes: [],
  routines: [],
  routinesCompleted: [],
  tasks: [],
});
