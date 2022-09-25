import { builder, u } from "./builder";
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
  return t.prismaFieldWithInput({
    type: ["TaskTemplate"],
    description: `Get repeating tasks (aka task templates).`,
    argOptions: { name: "where" }, // this changes the name of the default `input` field to `where`
    input: {
      from: t.input.field({
        type: "Date",
        required: false,
        description: "Will return task templates that were started from the given date or later.",
      }),
      repeatsEvery: t.input.field({
        type: [TaskRepeatanceEnum],
        required: false,
        description: "Will return repeating tasks that repeat on the given days of the week.",
      }),
    },
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

// ------------ TaskTemplate mutation types ------------

builder.mutationField("createRepeatingTask", (t) =>
  t.prismaFieldWithInput({
    type: "TaskTemplate",
    description: `Create a new repeating task (aka a task template).`,
    input: {
      title: t.input.string({ required: true, description: "The title of the task." }),
      firstDay: t.input.field({
        type: "Date",
        required: true,
        description: "The date the task template starts repeating from.",
      }),
      repeatsEvery: t.input.field({
        type: [TaskRepeatanceEnum],
        required: true,
        description: "The days of the week the task repeats on.",
      }),
      durationInMinutes: t.input.int({
        description: "The length of time a task from this template is expected to take.",
      }),
    },
    resolve: (query, _, args) => {
      return prisma.taskTemplate.create({
        ...query,
        data: {
          title: args.input.title,
          durationInMinutes: args.input.durationInMinutes,
          firstDay: args.input.firstDay,
          repeats: args.input.repeatsEvery,
        },
      });
    },
  })
);

builder.mutationField("updateRepeatingTask", (t) =>
  t.prismaFieldWithInput({
    type: "TaskTemplate",
    description: `Update a repeating task (aka a task template).`,
    input: {
      id: t.input.globalID({
        required: true,
        description: "The Relay ID of the task template to update.",
      }),
      title: t.input.string({ description: "The title of the task." }),
      durationInMinutes: t.input.int({
        description: "The length of time a task from this template is expected to take.",
      }),
      repeatsEvery: t.input.field({
        type: [TaskRepeatanceEnum],
        description: "The days of the week the task repeats on.",
      }),
    },
    resolve: (query, _, args) => {
      return prisma.taskTemplate.update({
        ...(query.select ? { select: query.select } : {}),
        where: { id: parseInt(args.input.id.id) },
        data: {
          title: u(args.input.title),
          durationInMinutes: args.input.durationInMinutes,
          repeats: u(args.input.repeatsEvery),
        },
      });
    },
  })
);
