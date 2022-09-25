import { TaskStatus } from "@prisma/client";
import { builder } from "./builder";

// -------------- Task types --------------

export const TaskType = builder.prismaNode("Task", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "Date" }),
    title: t.exposeString("title"),
    status: t.expose("status", { type: TaskStatusEnum }),
    date: t.expose("date", { type: "Date" }),
    previousDates: t.expose("previousDates", { type: ["Date"] }),
    externalItem: t.relation("externalItem"),
    fromTemplate: t.relation("fromTemplate"),
    durationInMinutes: t.int({
      nullable: true,
      description: "The length of time the task is expected to take.",
      select: { externalItem: { select: { durationInMinutes: true } } },
      resolve: (task) => task.externalItem.durationInMinutes ?? task.durationInMinutes,
    }),
    scheduledAt: t.field({
      type: "Date",
      nullable: true,
      description: "The date and time the task is scheduled to start.",
      select: { externalItem: { select: { scheduledAt: true } } },
      resolve: (task) => task.externalItem.scheduledAt,
    }),
    repeats: t.boolean({
      description: "Whether this task repeats",
      resolve: (task) => task.fromTemplateId !== null,
    }),
  }),
});

// The description of each enum value is the same as in src/prisma/schema.prisma
export const TaskStatusEnum = builder.enumType("TaskStatus", {
  values: {
    TODO: {
      description: "When the task is planned or in progress.",
      value: "TODO",
    },
    CANCELED: {
      description: "When the task was decided not to be done anymore.",
      value: "CANCELED",
    },
    DONE: {
      description: "When the task is done.",
      value: "DONE",
    },
    POSTPONED: {
      description:
        "When the task was not completed on the scheduled date, but was decided to work on it a different day. A new task is created at the new date, instead of changing the date of this task.",
      value: "POSTPONED",
    },
  } as Record<TaskStatus, { value: TaskStatus; description?: string }>,
});
