import { TaskStatus } from "@prisma/client";
import { endOfDay, startOfDay } from "../utils/getDays";
import { prisma } from "../utils/prisma";
import { builder, u } from "./builder";
import { DayType } from "./Day";
import { dayjs } from "@flowdev/server/src/utils/dayjs";

// -------------- Task types --------------

export const TaskType = builder.prismaNode("Task", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    title: t.exposeString("title"),
    status: t.expose("status", { type: TaskStatusEnum }),
    canBeSuperdone: t.expose("canBeSuperdone", { type: "Boolean" }),
    completedAt: t.expose("completedAt", { type: "DateTime", nullable: true }),
    date: t.expose("date", { type: "Date" }),
    item: t.relation("item", { nullable: true }),
    durationInMinutes: t.int({
      nullable: true,
      description: "The length of time the task is expected to take.",
      select: { item: { select: { durationInMinutes: true } } },
      resolve: (task) => {
        return task.item?.durationInMinutes ?? task.durationInMinutes;
      },
    }),
    labels: t.relation("labels"),
    pluginDatas: t.relation("pluginDatas"),
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
      itemId: t.input.globalID({
        description: "The Relay ID of the Item that should be linked to the task.",
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
            ...(args.input.itemId
              ? { item: { connect: { id: parseInt(args.input.itemId.id) } } }
              : {}),
          },
        });
        const day = await tx.day.findUnique({ where: { date }, select: { tasksOrder: true } });
        const newTasksOrder = [task.id, ...day!.tasksOrder];
        await tx.day.update({ where: { date }, data: { tasksOrder: { set: newTasksOrder } } });
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
    },
    resolve: (query, _, args) => {
      return prisma.task.update({
        ...query,
        where: { id: parseInt(args.input.id.id) },
        data: {
          title: u(args.input.title),
          durationInMinutes: args.input.durationInMinutes,
        },
      });
    },
  })
);

// TODO: add completedAt in the logic
builder.mutationField("updateTaskStatus", (t) =>
  t.prismaFieldWithInput({
    type: ["Day"],
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
      superDone: t.input.boolean({
        required: false,
        description:
          "If true, the task will be done within Flow and other systems that plugins have connected to.",
      }),
    },
    resolve: (query, _, args) => {
      return prisma.$transaction(async (tx) => {
        const days: Date[] = [];
        const newStatus = args.input.status;
        const task = await tx.task.findUniqueOrThrow({
          where: { id: parseInt(args.input.id.id) },
          include: { day: { select: { date: true, tasksOrder: true } } },
        });
        const originalDay = task.day;
        const startOfToday = startOfDay();
        const endOfToday = endOfDay();
        if (task.status === newStatus) {
          // When the task is already in the desired status, do nothing.
          // Hence we keep the `days` arrays empty.
        } else if (task.date >= startOfToday && task.date <= endOfToday) {
          // When the task is for today, we only need to update the status
          // and the position of the task in the day
          await tx.task.update({
            where: { id: task.id },
            data: { status: newStatus, completedAt: newStatus === "DONE" ? new Date() : null },
          });
          const newTasksOrder = originalDay.tasksOrder.filter((id) => id !== task.id);
          if (newStatus === "TODO") {
            newTasksOrder.splice(0, 0, task.id);
          } else {
            newTasksOrder.push(task.id);
          }
          await tx.day.update({
            where: { date: startOfToday },
            data: {
              tasksOrder: { set: newTasksOrder },
            },
          });
          days.push(task.date);
        } else if (task.date > endOfToday && (newStatus === "DONE" || newStatus === "CANCELED")) {
          // When the task is in the future and the new status is DONE or CANCELED,
          // we need to move it to today and update the status
          await tx.task.update({
            where: { id: task.id },
            data: {
              status: newStatus,
              completedAt: newStatus === "DONE" ? new Date() : null,
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
        } else if (task.date < startOfToday) {
          if (newStatus === "TODO") {
            // Task is in the past and TODO, so we need to move it to today and update the status
            const updatedTask = await tx.task.update({
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
              select: {
                day: {
                  select: { tasks: { select: { id: true, status: true } }, tasksOrder: true },
                },
              },
            });
            await tx.day.update({
              where: { date: originalDay.date },
              data: { tasksOrder: { set: originalDay.tasksOrder.filter((id) => id !== task.id) } },
            });
            days.push(task.date);
            const tasksOrdered = updatedTask.day.tasks.sort(
              (a, b) =>
                updatedTask.day.tasksOrder.indexOf(a.id) - updatedTask.day.tasksOrder.indexOf(b.id)
            );
            const lastTodoIndex = tasksOrdered.findIndex((t) => t.status === "TODO");
            const newTasksOrder = updatedTask.day.tasksOrder.splice(lastTodoIndex + 1, 0, task.id);
            await tx.day.update({
              where: { date: startOfToday },
              data: { tasksOrder: { set: newTasksOrder } },
            });
            days.push(startOfToday);
          } else {
            // Task is in the past, so we only need to update the status
            await tx.task.update({
              where: { id: task.id },
              data: {
                status: newStatus,
                completedAt: newStatus === "DONE" ? dayjs(task.date).endOf("day").toDate() : null,
              },
            });
            days.push(task.date);
          }
        }
        return prisma.day.findMany({
          ...query,
          where: { date: { in: days } },
          orderBy: { date: "asc" },
        });
      });
    },
  })
);

// TODO: add completedAt in the logic
builder.mutationField("updateTaskDate", (t) =>
  t.fieldWithInput({
    type: [DayType],
    description: `Update the date of a task and/or position of the task in the day, and get the updated days (as a list in chronological order).

Input:
- \`id\`: The ID of the task to update.
- \`date\`: The new date of the task.
- \`after\`: The ID of the task to place the task after. If \`null\`, the task will be placed at the beginning of the day.

When the task is:
- already in the desired date, it updates the order and returns the day.
- moved to today, it updates the date and order but not the status, and returns the original day and today.
- moved into the past, it updates the date and order, updates the status to \`DONE\` (if not already),
  and returns the original day and the new day.
- moved into the future, it updates the date and order, updates the status to \`TODO\` (if not already),
  and returns the original day and the new day.`,
    input: {
      id: t.input.globalID({ required: true, description: "The Relay ID of the task to update." }),
      date: t.input.field({
        type: "Date",
        required: true,
        description: "The new date of the task.",
      }),
      newTasksOrder: t.input.globalIDList({
        required: true,
        description: "The new order of the tasks in the day the task is moved into.",
      }),
    },
    resolve: (_, args) => {
      return prisma.$transaction(async (tx) => {
        const days: Date[] = [];
        const newDate = args.input.date;
        const task = await tx.task.findUniqueOrThrow({
          where: { id: parseInt(args.input.id.id) },
          include: { day: { select: { date: true, tasksOrder: true } } },
        });
        const originalDay = task.day;
        const isSameDay = equalDay(task.date, newDate);
        const newDayTasksOrder = args.input.newTasksOrder
          .filter((id) => id.typename === "Task")
          .map((id) => parseInt(id.id));
        const startOfToday = startOfDay();
        const endOfToday = endOfDay();
        // the only thing that can change is the status
        // if the status doesn't change in a scenario, it's set to null
        /** The new status of the task. It is `null` when it doesn't change. */
        let newStatus: TaskStatus | null = null;
        if (isSameDay) {
          // When the task is already in the desired date, don't update the status
          newStatus = null;
          days.push(task.date);
        } else if (newDate >= startOfToday && newDate <= endOfToday) {
          // When the task is for today, don't update the status
          newStatus = null;
          days.push(task.date, newDate);
        } else if (newDate < startOfToday) {
          // When the task is moving into the past,
          // update the date and update the status to DONE (if not already)
          newStatus = "DONE";
          days.push(task.date, newDate);
        } else if (newDate > endOfToday) {
          // When the task is moving into the future,
          // update the date and update the status to TODO (if not already)
          newStatus = "TODO";
          days.push(task.date, newDate);
        }

        // Update the task
        await tx.task.update({
          where: { id: task.id },
          data: {
            day: { connectOrCreate: { where: { date: newDate }, create: { date: newDate } } },
            ...(newStatus ? { status: newStatus } : {}),
          },
        });

        if (isSameDay) {
          // update just one day as they are the same
          await tx.day.update({
            where: { date: originalDay.date },
            data: { tasksOrder: { set: newDayTasksOrder } },
          });
        } else {
          // update the original and new day

          // Update the original day
          await tx.day.update({
            where: { date: originalDay.date },
            data: { tasksOrder: { set: originalDay.tasksOrder.filter((id) => id !== task.id) } },
          });

          // Update the new day (it may be the same as the original day)
          await tx.day.update({
            where: { date: newDate },
            data: { tasksOrder: { set: newDayTasksOrder } },
          });
        }

        return prisma.day.findMany({
          where: { date: { in: days } },
          orderBy: { date: "asc" },
        });
      });
    },
  })
);

const equalDay = (date1: Date, date2: Date) => {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
};
