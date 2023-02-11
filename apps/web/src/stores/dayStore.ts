import { store } from "@flowdev/jotai";
import dayjs from "dayjs";

type DayStore = {
  dateInFocus: string;
  dayIdInFocus: string;
};

const today = dayjs().format("YYYY-MM-DD");
export const dayStoreAtom = store<DayStore>({
  dateInFocus: today,
  dayIdInFocus: `Day_${today}`,
});
