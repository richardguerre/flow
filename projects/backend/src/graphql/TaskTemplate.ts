import { builder } from "./builder";
import { TaskRepeatance } from "@prisma/client";
import { prisma } from "../utils/prisma";

// --------------- TaskTemplate types ---------------

export const TaskTemplateType = builder.prismaNode("TaskTemplate", {
  id: { field: "id" },
  fields: (t) => ({
    title: t.exposeString("title"),
    durationInMinutes: t.exposeInt("durationInMinutes", { nullable: true }),
    repeatsEvery: t.expose("repeats", { type: [TaskRepeatanceEnum] }),
    firstDay: t.expose("firstDay", { type: "Date" }),
  }),
});

export const TaskRepeatanceEnum = builder.enumType("TaskRepeatance", {
  values: [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ] as TaskRepeatance[],
});

// ------------ TaskTemplate query types ------------

builder.queryField("repeatingTasks", (t) => {
  return t.prismaField({
    type: ["TaskTemplate"],
    description: `Get repeating tasks (aka task templates).
    `,
    args: { where: t.arg({ type: TaskTemplateWhereInput, required: false }) },
    resolve: async (query, _root, args) => {
      return prisma.taskTemplate.findMany({
        ...query,
        where: {
          ...(args.where?.from ? { firstDay: { gte: args.where.from } } : {}),
          ...(args.where?.repeatsEvery ? { repeats: { hasSome: args.where.repeatsEvery } } : {}),
        },
      });
    },
  });
});

export const TaskTemplateWhereInput = builder.inputType("TaskTemplateWhereInput", {
  fields: (t) => ({
    from: t.field({
      type: "Date",
      required: false,
      description: "Will return task templates that were started from the given date or later.",
    }),
    repeatsEvery: t.field({
      type: [TaskRepeatanceEnum],
      required: false,
      description: "Will return repeating tasks that repeat on the given days of the week.",
    }),
  }),
});
