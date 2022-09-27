import { describe, it, expect } from "vitest";
import { getStartFromConnectionArgs, startOfDay } from "../../src/utils/getDays";

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
