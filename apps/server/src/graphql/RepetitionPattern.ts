import { RepetitionPattern } from "@prisma/client";
import { builder } from "./builder";

const values: Record<RepetitionPattern, { value: RepetitionPattern }> = {
  // using Record instead of array to get errors when there are missing values
  MONDAY: { value: "MONDAY" },
  TUESDAY: { value: "TUESDAY" },
  WEDNESDAY: { value: "WEDNESDAY" },
  THURSDAY: { value: "THURSDAY" },
  FRIDAY: { value: "FRIDAY" },
  SATURDAY: { value: "SATURDAY" },
  SUNDAY: { value: "SUNDAY" },
};

export const RepetitionPatternEnum = builder.enumType("RepetitionPattern", { values });
