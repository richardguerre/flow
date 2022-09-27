import { prisma } from "./prisma";
import { DayObjectType } from "../graphql/Day";

export const loadOneDay = async (day: string) => {
  const date = new Date(day);
  const tasks = await prisma.task.findMany({ where: { date } });

  // Get IDs of task templates from tasks that were created from a template
  // so that we don't repeat them in the `repeatingTasks` field
  const templateIdsOfTasksFromTemplate = tasks.reduce<number[]>(
    (taskIds, task) => (task.fromTemplateId ? taskIds.concat(task.fromTemplateId) : taskIds),
    []
  );

  const repeatingTasks = await prisma.taskTemplate.findMany({
    where: {
      repeats: { has: getDayOfWeek(date) },
      firstDay: { lte: date },
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
    const day = new Date(start.setDate(start.getDate() + 1)).toJSON();
    const node = await loadOneDay(day);
    dayEdges.push({ cursor: day, node });
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
    start = new Date(afterDate.setDate(afterDate.getDate() + 1));
  } else if (last) {
    const beforeDate = new Date(before ?? start);
    start = new Date(beforeDate.setDate(beforeDate.getDate() - last + (before ? 0 : 1)));
  }
  return startOfDay(start);
};

export const startOfDay = (day: Date = new Date()) => {
  return new Date(day.setHours(0, 0, 0, 0));
};

export const endOfDay = (day: Date = new Date()) => {
  return new Date(day.setHours(23, 59, 59, 999));
};

/** @returns values from the TaskRepeatance enum */
const getDayOfWeek = (date: Date) => {
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
