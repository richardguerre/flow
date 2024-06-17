import React from "@types/react";

declare global {
  type React = typeof React;

  type RepeatingTask = {
    id: string;
    title: string;
    durationInMinutes?: number;
    cron: string;
    simplified?: {
      everyNum?: number;
      everyUnit: EveryUnitOption;
      onDay?: Day[]; // day of week, where 0 is Sunday
      onDaysOfMonth?: number[];
    };
    enabled: boolean;
  };

  type AddRepeatingTaskInput = Omit<RepeatingTask, "id" | "cronTranslated">;
  type AddRepeatingTaskOutput = RepeatingTask[];

  type EditRepeatingTaskInput = Partial<Omit<RepeatingTask, "id" | "cronTranslated">> & {
    id: string;
  };
  type EditRepeatingTaskOutput = RepeatingTask[];

  type RemoveRepeatingTaskInput = { id: string };
  type RemoveRepeatingTaskOutput = RepeatingTask[];
}
