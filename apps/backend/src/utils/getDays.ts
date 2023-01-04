import { prisma } from "./prisma";
import { DayObjectType } from "../graphql/Day";
import { Prisma, PrismaClient } from "@prisma/client";

export const loadOneDay = async (
  dayString: string,
  prismaClient: PrismaClient | Prisma.TransactionClient = prisma
): Promise<DayObjectType> => {
  const date = new Date(dayString);
  const [day, routines] = await Promise.all([
    prismaClient.day.findUnique({ where: { date }, include: { tasks: true } }),
    prismaClient.routine.findMany({
      where: {
        isActive: true,
        repeats: { has: getDayOfWeek(date) },
        firstDay: { lte: date },
        OR: [{ lastDay: null }, { lastDay: { gte: date } }],
      },
    }),
  ]);

  // sort tasks using the `day.tasksOrder` array
  const tasks =
    day?.tasks.sort((a, b) => {
      return day.tasksOrder.indexOf(a.id) - day.tasksOrder.indexOf(b.id);
    }) ?? [];

  return { date, tasks, routines };
};

type LoadDayEdgesInput = {
  first?: number | null | undefined;
  after?: string | null | undefined;
  last?: number | null | undefined;
  before?: string | null | undefined;
};
type DayEdge = { cursor: string; node: DayObjectType };
type LoadDayEdgesOuput = {
  startCursor: string;
  endCursor: string;
  edges: DayEdge[];
};

export const loadDayEdges = async (input: LoadDayEdgesInput): Promise<LoadDayEdgesOuput> => {
  const start = getStartFromConnectionArgs(input);

  const dayEdges: DayEdge[] = [];
  for (const _ of Array.from({ length: input.first ?? input.last ?? 1 })) {
    const day = toDateOnly(start);
    const node = await loadOneDay(day);
    dayEdges.push({ cursor: day, node });
    start.setDate(start.getDate() + 1); // sets start for the next iteration
  }

  return {
    startCursor: dayEdges[0]!.cursor,
    endCursor: dayEdges[dayEdges.length - 1]!.cursor,
    edges: dayEdges,
  };
};

export const getStartFromConnectionArgs = ({ after, before, last }: LoadDayEdgesInput) => {
  let start = new Date();
  if (after) {
    const afterDate = new Date(after);
    start = addDays(afterDate, 1);
  } else if (last) {
    const beforeDate = new Date(before ?? start);
    start = addDays(beforeDate, (before ? 0 : 1) - last);
  }
  return startOfDay(start);
};

export const startOfDay = (day: Date = new Date()) => {
  return new Date(day.setUTCHours(0, 0, 0, 0));
};

export const endOfDay = (day: Date = new Date()) => {
  return new Date(day.setUTCHours(23, 59, 59, 999));
};

/**
 * @returns the date at 4:00:00.000 UTC
 * 4am is considered the start of a new day as items can happen over midnight and we want to show them on the same day.
 */
export const startOfDayScheduledAt = (day: Date = new Date()) => {
  return new Date(day.setUTCHours(4, 0, 0, 0));
};

/**
 * @returns the date + 1 day, at 3:59:59.999 UTC
 * 4am is considered the start of a new day as items can happen over midnight and we want to show them on the same day.
 */
export const endOfDayScheduledAt = (day: Date = new Date()) => {
  return new Date(addDays(day, 1).setUTCHours(3, 59, 59, 999));
};

export const addDays = (day: Date = new Date(), days: number) => {
  return new Date(day.setDate(day.getDate() + days));
};

/** @returns the day in all caps (e.g., `"MONDAY"`)*/
export const getDayOfWeek = (date: Date) => {
  return dayOfWeekArr[date.getDay()];
};

const dayOfWeekArr = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

export const toDateOnly = (date: Date) => {
  const dateString = date.toJSON();
  return dateString.split("T")[0] ?? dateString;
};
