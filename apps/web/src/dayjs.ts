import day from "dayjs";
import weekday from "dayjs/plugin/weekday";

day.extend(weekday);

export const dayjs = day;
