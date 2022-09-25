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
