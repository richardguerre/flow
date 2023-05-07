import day from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

day.extend(customParseFormat);
day.extend(utc);
export const dayjs = day;
