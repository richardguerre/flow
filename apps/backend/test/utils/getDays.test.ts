import { describe, it, expect } from "vitest";
import {
  loadOneDay,
  loadDayEdges,
  getStartFromConnectionArgs,
  startOfDay,
  getDayOfWeek,
  toDateOnly,
  addDays,
} from "../../src/utils/getDays";
import { withDb } from "../../.vitest/prisma";
import { Factory } from "../../.vitest/factory";

describe("getStartFromConnectionArgs", () => {
  it("returns today if no arguments are passed", () => {
    const start = getStartFromConnectionArgs({});
    expect(start).toEqual(startOfDay());
  });

  it("returns the day after the after argument if it is passed", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ after: today.toJSON() });
    expect(start).toEqual(addDays(today, 1));
  });

  it("returns 9 days before today if the last is set to 10", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ last: 10 });
    // 9 days as it includes today as the 10th day
    expect(start).toEqual(addDays(today, -9));
  });

  it("returns 10 days before the before argument if it is passed", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ before: today.toJSON(), last: 10 });
    // 10 days as it does not include today as the 10th day
    expect(start).toEqual(addDays(today, -10));
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
    const { task } = await new Factory().newTask({ day: { create: { date } } }).run();
    const day = await loadOneDay(date.toJSON());
    expect(day).toEqual({ date: date, tasks: [task], repeatingTasks: [] });
  });

  it("returns repeatingTasks if a template repeats on that day", async () => {
    const date = startOfDay();
    const dayOfWeek = getDayOfWeek(date);
    const { taskTemplate: repeatingTask } = await new Factory()
      .newTaskTemplate({ repeats: [dayOfWeek], firstDay: date })
      .run();
    const day = await loadOneDay(date.toJSON());
    expect(day).toEqual({ date: date, tasks: [], repeatingTasks: [repeatingTask] });
  });

  it("doesn't return repeatingTasks if a template doesn't repeat on that day", async () => {
    const today = startOfDay(startOfDay());
    const tomorrow = addDays(today, 1); // addDays creates a new Date object
    today.setDate(today.getDate() - 1); // reset today to actually be today
    const dayOfWeek = getDayOfWeek(tomorrow);
    await new Factory().newTaskTemplate({ repeats: [dayOfWeek], firstDay: today }).run();
    const day = await loadOneDay(today.toJSON());
    expect(day).toEqual({ date: today, tasks: [], repeatingTasks: [] });
  });

  it("doesn't return repeatingTasks if a template's lastDay is before the date", async () => {
    const today = startOfDay();
    const yesterday = addDays(today, -1);
    today.setDate(today.getDate() + 1); // reset today to actually be today
    const dayOfWeek = getDayOfWeek(today);
    await new Factory()
      .newTaskTemplate({ repeats: [dayOfWeek], firstDay: yesterday, lastDay: yesterday })
      .run();
    const day = await loadOneDay(today.toJSON());
    expect(day).toEqual({ date: today, tasks: [], repeatingTasks: [] });
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

  it("returns tomorrow and the day after with one task in each", async () => {
    const today = startOfDay();
    const tomorrow = addDays(today, 1);
    const dayAfter = addDays(today, 1); // here, today is tomorrow as we set it above
    today.setDate(today.getDate() - 2); // reset today to actually be today
    const { tasks } = await new Factory()
      .newTask({ date: tomorrow })
      .newTask({ date: dayAfter })
      .run();
    const edges = await loadDayEdges({ first: 2, after: today.toJSON() });
    expect(edges).toEqual({
      startCursor: toDateOnly(tomorrow),
      endCursor: toDateOnly(dayAfter),
      edges: [
        {
          cursor: toDateOnly(tomorrow),
          node: { date: tomorrow, tasks: [tasks[0]], repeatingTasks: [] },
        },
        {
          cursor: toDateOnly(dayAfter),
          node: { date: dayAfter, tasks: [tasks[1]], repeatingTasks: [] },
        },
      ],
    });
  });

  it("returns today with tasks in order of creation", async () => {
    const today = startOfDay();
    const { tasks } = await new Factory()
      .newTask({ date: today })
      .newTask({ date: today })
      .newTask({ date: today })
      .run();
    const edges = await loadDayEdges({});
    expect(edges).toEqual({
      startCursor: toDateOnly(today),
      endCursor: toDateOnly(today),
      edges: [
        {
          cursor: toDateOnly(today),
          node: { date: today, tasks: [tasks[0], tasks[1], tasks[2]], repeatingTasks: [] },
        },
      ],
    });
  });
});
