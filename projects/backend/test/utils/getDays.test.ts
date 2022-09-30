import { describe, it, expect } from "vitest";
import {
  loadOneDay,
  loadDayEdges,
  getStartFromConnectionArgs,
  startOfDay,
  getDayOfWeek,
  toDateOnly,
} from "../../src/utils/getDays";
import { withDb } from "../../.vitest/prisma";
import { prisma } from "../../src/utils/prisma";

describe("getStartFromConnectionArgs", () => {
  it("returns today if no arguments are passed", () => {
    const start = getStartFromConnectionArgs({});
    expect(start).toEqual(startOfDay());
  });

  it("returns the day after the after argument if it is passed", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ after: today.toJSON() });
    expect(start).toEqual(new Date(today.setDate(today.getDate() + 1)));
  });

  it("returns 9 days before today if the last is set to 10", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ last: 10 });
    // 9 days as it includes today as the 10th day
    expect(start).toEqual(new Date(today.setDate(today.getDate() - 9)));
  });

  it("returns 10 days before the before argument if it is passed", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ before: today.toJSON(), last: 10 });
    // 10 days as it does not include today as the 10th day
    expect(start).toEqual(new Date(today.setDate(today.getDate() - 10)));
  });
});

describe("startOfDay", () => {
  it("returns the start of the day", () => {
    const today = new Date();
    const start = startOfDay(today);
    expect(start).toEqual(new Date(today.setUTCHours(0, 0, 0, 0)));
  });
});

describe("loadOneDay", () => {
  withDb();

  it("returns no tasks nor repeatingTasks when there are none", async () => {
    const date = startOfDay();
    const day = await loadOneDay(toDateOnly(date)); // toDateOnly is used as that is what is passed in the resolver
    expect(day).toEqual({ date: date, tasks: [], repeatingTasks: [] });
  });

  it("returns tasks if there are some for that date", async () => {
    const date = startOfDay();
    const task = await prisma.task.create({ data: { title: "test", date } });
    const day = await loadOneDay(date.toJSON());
    expect(day).toEqual({ date: date, tasks: [task], repeatingTasks: [] });
  });

  it("returns repeatingTasks if a template repeats on that day", async () => {
    const date = startOfDay();
    const dayOfWeek = getDayOfWeek(date);
    const repeatingTask = await prisma.taskTemplate.create({
      data: { title: "test", repeats: [dayOfWeek], firstDay: date },
    });
    const day = await loadOneDay(date.toJSON());
    expect(day).toEqual({ date: date, tasks: [], repeatingTasks: [repeatingTask] });
  });
});

describe("loadDayEdges", () => {
  withDb();

  it("returns today with no tasks nor repeatingTasks", async () => {
    const today = startOfDay();
    const edges = await loadDayEdges({});
    expect(edges).toEqual({
      startCursor: toDateOnly(today),
      endCursor: toDateOnly(today),
      edges: [
        {
          cursor: toDateOnly(today),
          node: {
            date: today,
            tasks: [],
            repeatingTasks: [],
          },
        },
      ],
    });
  });

  it.only("returns tomorrow and the day after with one task in each", async () => {
    const today = startOfDay();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    const dayAfter = new Date(today.setDate(today.getDate() + 1)); // here, today is tomorrow as we set it above
    today.setDate(today.getDate() - 2); // reset today to actually be today
    const taskTomorrow = await prisma.task.create({ data: { title: "test", date: tomorrow } });
    const taskDayAfter = await prisma.task.create({ data: { title: "test", date: dayAfter } });
    const edges = await loadDayEdges({ first: 2, after: today.toJSON() });
    expect(edges).toEqual({
      startCursor: toDateOnly(tomorrow),
      endCursor: toDateOnly(dayAfter),
      edges: [
        {
          cursor: toDateOnly(tomorrow),
          node: { date: tomorrow, tasks: [taskTomorrow], repeatingTasks: [] },
        },
        {
          cursor: toDateOnly(dayAfter),
          node: { date: dayAfter, tasks: [taskDayAfter], repeatingTasks: [] },
        },
      ],
    });
  });
});
