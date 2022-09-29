import { describe, it, expect } from "vitest";
import {
  loadOneDay,
  getStartFromConnectionArgs,
  startOfDay,
  getDayOfWeek,
} from "../../src/utils/getDays";
import { withDb } from "../../.vitest/prisma";
import { prisma } from "../../src/utils/prisma";

describe("getStartFromConnectionArgs", () => {
  it("should return today if no arguments are passed", () => {
    const start = getStartFromConnectionArgs({});
    expect(start).toEqual(startOfDay());
  });

  it("should return the day after the after argument if it is passed", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ after: today.toJSON() });
    expect(start).toEqual(new Date(today.setDate(today.getDate() + 1)));
  });

  it("should return 9 days before today if the last is set to 10", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ last: 10 });
    // 9 days as it includes today as the 10th day
    expect(start).toEqual(new Date(today.setDate(today.getDate() - 9)));
  });

  it("should return 10 days before the before argument if it is passed", () => {
    const today = startOfDay();
    const start = getStartFromConnectionArgs({ before: today.toJSON(), last: 10 });
    // 10 days as it does not includes today as the 10th day
    expect(start).toEqual(new Date(today.setDate(today.getDate() - 10)));
  });
});

describe("startOfDay", () => {
  it("should return the start of the day", () => {
    const today = new Date();
    const start = startOfDay(today);
    expect(start).toEqual(new Date(today.setHours(0, 0, 0, 0)));
  });
});

describe("loadOneDay", () => {
  withDb();

  it("should return no tasks nor repeatingTasks when there are none", async () => {
    const date = startOfDay();
    const day = await loadOneDay(date.toJSON());
    expect(day).toEqual({
      date: date,
      tasks: [],
      repeatingTasks: [],
    });
  });

  it("should return tasks if there are some for that date", async () => {
    const date = startOfDay();
    const task = await prisma.task.create({
      data: {
        title: "test",
        date,
      },
    });
    const day = await loadOneDay(date.toJSON());
    expect(day).toEqual({
      date: date,
      tasks: [task],
      repeatingTasks: [],
    });
  });

  it("should return repeatingTasks if a template repeats on that day", async () => {
    const date = startOfDay();
    const dayOfWeek = getDayOfWeek(date);
    const repeatingTask = await prisma.taskTemplate.create({
      data: {
        title: "test",
        repeats: [dayOfWeek],
        firstDay: date,
      },
    });
    const day = await loadOneDay(date.toJSON());
    expect(day).toEqual({
      date: date,
      tasks: [],
      repeatingTasks: [repeatingTask],
    });
  });
});
