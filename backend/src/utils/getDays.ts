import { prisma } from "./prisma";
import { DayObjectType } from "../graphql/Day";
import { Prisma, PrismaClient } from "@prisma/client";

export const loadOneDay = async (
  dayString: string,
  prismaClient: PrismaClient | Prisma.TransactionClient = prisma
) => {
  const date = new Date(dayString);
  const day = await prismaClient.day.findUnique({ where: { date }, include: { tasks: true } });

  // sort tasks using the `day.tasksOrder` array
  const tasks =
    day?.tasks.sort((a, b) => {
      return day.tasksOrder.indexOf(a.id) - day.tasksOrder.indexOf(b.id);
    }) ?? [];

  // Get IDs of task templates from tasks that were created from a template
  // so that we don't repeat them in the `repeatingTasks` field
  const templateIdsOfTasksFromTemplate = tasks.reduce<number[]>(
    (taskIds, task) => (task.fromTemplateId ? taskIds.concat(task.fromTemplateId) : taskIds),
    []
  );

  const repeatingTasks = await prismaClient.taskTemplate.findMany({
    where: {
      repeats: { has: getDayOfWeek(date) },
      firstDay: { lte: date },
      OR: [{ lastDay: null }, { lastDay: { gte: date } }],
      id: { notIn: templateIdsOfTasksFromTemplate },
    },
  });

  return { date, tasks, repeatingTasks };
};

type LoadEdgesInput = {
  first?: number | null | undefined;
  after?: string | null | undefined;
  last?: number | null | undefined;
  before?: string | null | undefined;
};
type DayEdge = { cursor: string; node: DayObjectType };
type LoadEdgesOuput = {
  startCursor: string;
  endCursor: string;
  edges: DayEdge[];
};

export const loadDayEdges = async ({
  first,
  after,
  last,
  before,
}: LoadEdgesInput): Promise<LoadEdgesOuput> => {
  const start = getStartFromConnectionArgs({ first, after, last, before });

  const dayEdges: DayEdge[] = [];
  for (const _ of Array.from({ length: first ?? last ?? 1 })) {
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

export const getStartFromConnectionArgs = ({ after, before, last }: LoadEdgesInput) => {
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

export const addDays = (day: Date = new Date(), days: number) => {
  return new Date(day.setDate(day.getDate() + days));
};

/** @returns values from the TaskRepeatance enum */
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
