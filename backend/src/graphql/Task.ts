import { TaskStatus } from "@prisma/client";
import { startOfDay } from "../utils/getDays";
import { prisma } from "../utils/prisma";
import { builder, u } from "./builder";

// -------------- Task types --------------

export const TaskType = builder.prismaNode("Task", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    title: t.exposeString("title"),
    status: t.expose("status", { type: TaskStatusEnum }),
    date: t.expose("date", { type: "Date" }),
    isPrivate: t.exposeBoolean("isPrivate"),
    previousDates: t.expose("previousDates", { type: ["Date"] }),
    externalItem: t.relation("externalItem", { nullable: true }),
    fromTemplate: t.relation("fromTemplate", { nullable: true }),
    durationInMinutes: t.int({
      nullable: true,
      description: "The length of time the task is expected to take.",
      select: { externalItem: { select: { durationInMinutes: true } } },
      resolve: (task) => task.externalItem.durationInMinutes ?? task.durationInMinutes,
    }),
    scheduledAt: t.field({
      type: "DateTime",
      nullable: true,
      description: "The date and time the task is scheduled to start.",
      select: { externalItem: { select: { scheduledAt: true } } },
      resolve: (task) => task.externalItem?.scheduledAt ?? null,
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
  } as Record<TaskStatus, { value: TaskStatus; description?: string }>,
});

// ------------------ Task mutations ------------------

builder.mutationField("createTask", (t) =>
  t.prismaFieldWithInput({
    type: "Task", // the output type
    description: `Create a new task.`,
    input: {
      title: t.input.string({ required: true, description: "The title of the task." }),
      status: t.input.field({
        type: TaskStatusEnum,
        description: "The initial status of the task. Defaults to `TODO`.", // default value set by prisma/SQL
      }),
      durationInMinutes: t.input.field({
        type: "PositiveInt",
        description: "The length of time (in minutes) the task is expected to take.",
      }),
      date: t.input.field({
        type: "Date",
        description: "The day (no time required) the task is planned for.",
      }),
      isPrivate: t.input.boolean({
        description: "Whether the task should be private and not shown in the team message.",
      }),
      externalItemId: t.input.globalID({
        description: "The Relay ID of the ExternalItem that should be linked to the task.",
      }),
      templateId: t.input.globalID({
        description: "The Relay ID of the TaskTemplate used to create the task.",
      }),
    },
    resolve: (query, _, args) => {
      const date = args.input.date ?? startOfDay(new Date());
      return prisma.$transaction(async (tx) => {
        const task = await tx.task.create({
          ...query,
          data: {
            title: args.input.title,
            status: u(args.input.status),
            durationInMinutes: args.input.durationInMinutes,
            day: { connectOrCreate: { where: { date }, create: { date } } },
            isPrivate: u(args.input.isPrivate),
            ...(args.input.externalItemId
              ? { externalItem: { connect: { id: args.input.externalItemId.id } } }
              : {}),
            ...(args.input.templateId
              ? { fromTemplate: { connect: { id: parseInt(args.input.templateId.id) } } }
              : {}),
          },
        });
        await tx.day.update({ where: { date }, data: { tasksOrder: { push: task.id } } });
        return task;
      });
    },
  })
);

builder.mutationField("updateTask", (t) =>
  t.prismaFieldWithInput({
    type: "Task",
    description: `Update a task.`,
    input: {
      id: t.input.globalID({ required: true, description: "The Relay ID of the task to update." }),
      title: t.input.string({ description: "The title of the task." }),
      status: t.input.field({
        type: TaskStatusEnum,
        description: "The status of the task.",
      }),
      durationInMinutes: t.input.field({
        type: "PositiveInt",
        description: "The length of time (in minutes) the task is expected to take.",
      }),
      date: t.input.field({
        type: "Date",
        description: "The day (no time required) the task is planned for.",
      }),
      isPrivate: t.input.boolean({
        description: "Whether the task should be private and not shown in the team message.",
      }),
    },
    resolve: (query, _, args) => {
      return prisma.task.update({
        ...query,
        where: { id: parseInt(args.input.id.id) },
        data: {
          title: u(args.input.title),
          status: u(args.input.status),
          durationInMinutes: args.input.durationInMinutes,
          date: u(args.input.date),
          isPrivate: u(args.input.isPrivate),
        },
      });
    },
  })
);
