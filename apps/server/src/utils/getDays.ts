// TODO: move and rename this file
type EdgesArgs = {
  first?: number | null | undefined;
  after?: string | null | undefined;
  last?: number | null | undefined;
  before?: string | null | undefined;
};

export const getStartFromConnectionArgs = ({ after, before, last }: EdgesArgs) => {
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
