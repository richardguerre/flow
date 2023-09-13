import day from "dayjs";
import weekday from "dayjs/plugin/weekday";
import timezone from "dayjs/plugin/timezone";

day.extend(weekday);
day.extend(timezone);

export const dayjs = day;
