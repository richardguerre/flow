import day from "dayjs";
import weekday from "dayjs/plugin/weekday";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

day.extend(weekday);
day.extend(timezone);
day.extend(relativeTime);

export const dayjs = day;
