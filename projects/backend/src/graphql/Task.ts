import { Task, TaskStatus } from "@prisma/client";
import { endOfDay, startOfDay } from "../utils/getDays";
import { prisma } from "../utils/prisma";
import { builder, u, uParseInt } from "./builder";

// -------------- Task types --------------

export const TaskType = builder.prismaNode("Task", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "Date" }),
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
      type: "Date",
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
    POSTPONED: {
      description: `When the task was not completed on the scheduled date, but was decided to work on it a different day. 
        A new task is created at the new date, instead of changing the date of this task.`,
      value: "POSTPONED",
    },
  } as Record<TaskStatus, { value: TaskStatus; description?: string }>,
});

// ------------------ Task mutations ------------------

builder.mutationField("createTask", (t) =>
  t.prismaFieldWithInput({
    type: "Task", // the output type
    description: `Create a new task.
      To postpone and create a new task based on the postponed one, use \`postponeAndCreateTask\` instead.`,
    input: {
      title: t.input.string({ required: true, description: "The title of the task." }),
      status: t.input.field({
        type: TaskStatusEnum,
        description: "The initial status of the task. Defaults to `TODO`.", // default value set by prisma/SQL
      }),
      durationInMinutes: t.input.int({
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
      return prisma.task.create({
        ...(query.select ? { select: query.select } : {}),
        data: {
          title: args.input.title,
          status: u(args.input.status),
          durationInMinutes: args.input.durationInMinutes,
          date: u(args.input.date),
          isPrivate: u(args.input.isPrivate),
          externalItemId: args.input.externalItemId?.id,
          fromTemplateId: uParseInt(args.input.templateId?.id),
        },
      });
    },
  })
);

builder.mutationField("postponeAndCreateTask", (t) =>
  t.fieldWithInput({
    type: PostponeTaskPayloadType,
    description: `Postpone a task and create a new task based on the postponed one.
      The postponed task must have been planned (i.e. \`Task.date\`) in the past or today, 
      and the new task must be planned for a later date.
      The new task will have the same title, status, duration, and external item as the postponed one.
      To simply create a new task, use \`createTask\` instead.`,
    input: {
      id: t.input.globalID({
        required: true,
        description: "The Relay ID of the task to postpone.",
      }),
      newDate: t.input.field({
        type: "Date",
        required: true,
        description: "The new day (no time required) the task is planned for.",
      }),
    },
    resolve: async (_, args) => {
      // interactive transaction, see https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions-in-preview
      return prisma.$transaction(async (tx) => {
        const postponedTask = await tx.task.update({
          where: { id: parseInt(args.input.id.id) },
          data: { status: "POSTPONED" },
        });
        if (postponedTask.date > endOfDay()) {
          throw new Error(
            "The new date must be before the current date. Use `updateTask` instead."
          );
        } else if (postponedTask.date > startOfDay(args.input.newDate)) {
          throw new Error("The new date must be after the current date.");
        }
        return {
          postponedTask,
          newTask: await tx.task.create({
            data: {
              ...postponedTask,
              id: undefined, // ensures that the new task has a new id
              createdAt: undefined, // ensures that the new task has a new createdAt date
              updatedAt: undefined, // ensures that the new task has a new updatedAt date
              status: undefined, // ensures that the new task has a new status
              date: args.input.newDate,
              previousDates: [postponedTask.date, ...postponedTask.previousDates],
            },
          }),
        };
      });
    },
  })
);

type PostponeTaskObjectType = {
  postponedTask: Task;
  newTask: Task;
};

const PostponeTaskPayloadRef = builder.objectRef<PostponeTaskObjectType>("PostponeTaskPayload");
export const PostponeTaskPayloadType = builder.objectType(PostponeTaskPayloadRef, {
  description: "The payload returned by `postponeAndCreateTask`.",
  fields: (t) => ({
    postponedTask: t.prismaField({
      type: "Task",
      description: "The task that was postponed.",
      resolve: (_, payload) => payload.postponedTask,
    }),
    newTask: t.prismaField({
      type: "Task",
      description: "The new task that was created.",
      resolve: (_, payload) => payload.newTask,
    }),
  }),
});

builder.mutationField("updateTask", (t) =>
  t.prismaFieldWithInput({
    type: "Task",
    description: `Update a task.
      To postpone and create a new task, use \`postponeAndCreateTask\` instead.`,
    input: {
      id: t.input.globalID({ required: true, description: "The Relay ID of the task to update." }),
      title: t.input.string({ description: "The title of the task." }),
      status: t.input.field({
        type: TaskStatusEnum,
        description: "The status of the task.",
      }),
      durationInMinutes: t.input.int({
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
        ...(query.select ? { select: query.select } : {}),
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
