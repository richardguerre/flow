import day from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

day.extend(customParseFormat);
day.extend(utc);
day.extend(timezone);
export const dayjs = day;
