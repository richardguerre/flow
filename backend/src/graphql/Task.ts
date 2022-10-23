import { TaskStatus } from "@prisma/client";
import { endOfDay, loadOneDay, startOfDay } from "../utils/getDays";
import { prisma } from "../utils/prisma";
import { builder, u } from "./builder";
import { DayType } from "./Day";

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
    type: "Task",
    description: `Create a new task.`,
    input: {
      title: t.input.string({ required: true, description: "The title of the task." }),
      status: t.input.field({
        type: TaskStatusEnum,
        defaultValue: "TODO",
        description: "The initial status of the task. Defaults to `TODO`.",
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
          durationInMinutes: args.input.durationInMinutes,
          date: u(args.input.date),
          isPrivate: u(args.input.isPrivate),
        },
      });
    },
  })
);

builder.mutationField("updateTaskStatus", (t) =>
  t.fieldWithInput({
    type: [DayType],
    description: `Update the status of a task and get the updated days (as a list in chronological order).

      When the task is:
      - already in the desired status, it does nothing and returns an empty list.
      - for today, it updates the status and returns the day.
      - for a previous day and changing to \`TODO\`, it updates the status and
        returns the original day and today.
      - for a future day and changing to \`DONE\` or \`CANCELED\`, it updates the status and
        returns the original day and today.

      Any other scenario is not possible by nature of the app, where tasks:
      - in the past can only be \`DONE\` or \`CANCELED\` 
      - in the future can only be in \`TODO\`
    `,
    input: {
      id: t.input.globalID({ required: true, description: "The Relay ID of the task to update." }),
      status: t.input.field({
        type: TaskStatusEnum,
        required: true,
        description: "The new status of the task.",
      }),
    },
    resolve: (_, args) => {
      return prisma.$transaction(async (tx) => {
        const days: Date[] = [];
        const newStatus = args.input.status;
        const task = await tx.task.findUniqueOrThrow({
          where: { id: parseInt(args.input.id.id) },
          include: { day: true },
        });
        const originalDay = task.day;
        const startOfToday = startOfDay();
        const endOfToday = endOfDay();
        if (task.status === newStatus) {
          // When the task is already in the desired status, do nothing.
          // Hence we keep the `days` arrays empty.
        } else if (task.date >= startOfToday && task.date <= endOfToday) {
          // When the task is for today, we only need to update the status
          await tx.task.update({
            where: { id: task.id },
            data: { status: newStatus },
          });
          days.push(task.date);
        } else if (task.date > endOfToday && (newStatus === "DONE" || newStatus === "CANCELED")) {
          // When the task is in the future and the new status is DONE or CANCELED,
          // we need to move it to today and update the status
          await tx.task.update({
            where: { id: task.id },
            data: {
              status: newStatus,
              day: {
                connectOrCreate: {
                  where: { date: startOfToday },
                  create: { date: startOfToday },
                },
              },
            },
          });
          await tx.day.update({
            where: { date: startOfToday },
            data: { tasksOrder: { push: task.id } },
          });
          days.push(startOfToday);
          await tx.day.update({
            where: { date: originalDay.date },
            data: { tasksOrder: { set: originalDay.tasksOrder.filter((id) => id !== task.id) } },
          });
          days.push(originalDay.date);
        } else if (task.date < startOfToday && newStatus === "TODO") {
          // Task is in the past, so we need to move it to today and update the status
          await tx.task.update({
            where: { id: task.id },
            data: {
              status: newStatus,
              day: {
                connectOrCreate: {
                  where: { date: startOfToday },
                  create: { date: startOfToday },
                },
              },
            },
          });
          await tx.day.update({
            where: { date: originalDay.date },
            data: { tasksOrder: { set: originalDay.tasksOrder.filter((id) => id !== task.id) } },
          });
          days.push(task.date);
          await tx.day.update({
            where: { date: startOfToday },
            data: { tasksOrder: { push: task.id } },
          });
          days.push(startOfToday);
        }
        const dayPromises = days.map((date) => loadOneDay(date.toString(), tx));
        return Promise.all(dayPromises);
      });
    },
  })
);

builder.mutationField("updateTaskDate", (t) =>
  t.fieldWithInput({
    type: [DayType],
    description: `Update the date of a task and get the updated days (as a list in chronological order).

      When the task is:
      - already in the desired date, it does nothing and returns an empty list.
      - moved into the past, it updates the date, updates the status to DONE (if not already),
        and returns the original day and the new day.
      - moved into the future, it updates the date, updates the status to TODO (if not already),
        and returns the original day and the new day.
    `,
    input: {
      id: t.input.globalID({ required: true, description: "The Relay ID of the task to update." }),
      date: t.input.field({
        type: "Date",
        required: true,
        description: "The new date of the task.",
      }),
    },
    resolve: (_, args) => {},
  })
);
