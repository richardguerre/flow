import { describe, it, expect } from "vitest";
import { getStartFromConnectionArgs, startOfDay, addDays } from "../../src/utils/getDays";

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
