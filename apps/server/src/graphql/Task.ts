import { TaskStatus, Item, ItemPluginData, Prisma, Task, TaskPluginData } from "@prisma/client";
import { endOfDay, startOfDay } from "../utils/getDays";
import { prisma } from "../utils/prisma";
import { builder, u } from "./builder";
import { DayType } from "./Day";
import { dayjs } from "@flowdev/server/src/utils/dayjs";
import { getPlugins } from "@flowdev/server/src/utils/getPlugins";
import { DateFilter, DateTimeFilter } from "./PrismaFilters";
import { GraphQLError } from "graphql";

// -------------- Task types --------------

export const TaskType = builder.prismaNode("Task", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    title: t.exposeString("title"),
    status: t.expose("status", { type: TaskStatusEnum }),
    completedAt: t.expose("completedAt", { type: "DateTime", nullable: true }),
    date: t.expose("date", { type: "Date" }),
    itemId: t.id({
      nullable: true,
      resolve: (task) => (task.itemId ? `Item_${task.itemId}` : null),
    }),
    item: t.relation("item", { nullable: true }),
    durationInMinutes: t.int({
      nullable: true,
      description: "The length of time the task is expected to take.",
      select: { item: { select: { durationInMinutes: true } } },
      resolve: (task) => {
        return task.durationInMinutes ?? task.item?.durationInMinutes;
      },
    }),
    tags: t.relation("tags"),
    pluginDatas: t.relation("pluginDatas"),
    subtasks: t.relation("subtasks", {
      resolve: async (query, task) => {
        const order = task.subtasksOrder ?? [];
        const subtasks = await prisma.task.findMany({ ...query, where: { parentTaskId: task.id } });
        return subtasks.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
      },
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

export const TaskStatusFilter = builder.prismaFilter(TaskStatusEnum, {
  ops: ["equals", "not", "in", "notIn"],
});

export const TaskWhereInputType = builder.prismaWhere("Task", {
  fields: {
    status: TaskStatusFilter,
    date: DateFilter,
    completedAt: DateTimeFilter,
  },
});

export const TaskListWhereInputType = builder.prismaListFilter(TaskWhereInputType, {
  ops: ["every", "some", "none"],
});

// ------------------ Task mutations ------------------

export type PluginOnCreateTask = (input: {
  /** The actionData that the web runtime of the plugin passed in. */
  actionData?: Prisma.InputJsonValue | null;
  task: {
    /** The title of the task. */
    title: string;
    /** The specified status of the task. Defaults to `TODO` if null. */
    status?: TaskStatus | null;
    /** The length of time (in minutes) the task is expected to take. */
    durationInMinutes?: number | null;
    /** The date the task is planned for. Defaults to today. */
    date?: Date;
    /** The item that the task will be linked to, if any. */
    item?: (Item & { pluginDatas: ItemPluginData[] }) | null;
    /** The pluginData that the web runtime of the plugin passed in. */
    pluginData?: {
      /** The original id of the item given by the plugin, if any */
      originalId?: string | null;
      /** The minimum data required to render the information on task cards. */
      min?: Prisma.JsonNullValueInput | Prisma.InputJsonValue | null;
      /** The full data required by the plugin to be linked to the task. */
      full?: Prisma.JsonNullValueInput | Prisma.InputJsonValue | null;
    } | null;
  };
}) => Promise<{
  pluginData?: {
    /** The original id of the item given by the plugin, if any */
    originalId?: string | null;
    /** The minimum data required to render the information on task cards. */
    min: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
    /** The full data required by the plugin to be linked to the task. */
    full: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
  };
} | void>;

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
      atIndex: t.input.int({
        description:
          "The position in the day the task should be placed at. If not specified, it will be placed at the beginning.",
      }),
      pluginDatas: t.input.field({
        description: "The plugin data to be linked to the task.",
        type: [TaskPluginDataInput],
      }),
      actionDatas: t.input.field({
        description: "The actions to be executed after the task is created.",
        type: [TaskActionDataInput],
      }),
    },
    resolve: async (query, _, args) => {
      const date = args.input.date ?? startOfDay(new Date());
      const index = args.input.atIndex ?? 0;
      const plugins = await getPlugins();
      const pluginDatas: Prisma.TaskPluginDataCreateManyTaskInput[] = [];
      let item;
      if (args.input.itemId) {
        item = await prisma.item.findUnique({
          where: { id: parseInt(args.input.itemId?.id) },
          include: { pluginDatas: true },
        });
      }
      for (const pluginSlug in plugins) {
        const plugin = plugins[pluginSlug]!;
        const actionData = args.input.actionDatas?.find(
          (actionData) => actionData.pluginSlug === pluginSlug,
        )?.data;
        const webPluginData = args.input.pluginDatas?.find(
          (pluginData) => pluginData.pluginSlug === pluginSlug,
        );
        const result = await plugin
          .onCreateTask?.({
            actionData,
            task: {
              title: args.input.title,
              status: args.input.status,
              durationInMinutes: args.input.durationInMinutes,
              date,
              item,
              pluginData: {
                originalId: webPluginData?.originalId,
                min: webPluginData?.min,
                full: webPluginData?.full,
              },
            },
          })
          .catch((e) => {
            console.log(`Error plugin.onCreateTask for ${pluginSlug}`, e);
            return null;
          }); // ignore errors

        if (result?.pluginData) {
          pluginDatas.push({
            pluginSlug,
            originalId: result.pluginData.originalId,
            min: result.pluginData.min,
            full: result.pluginData.full,
          });
        }
      }
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
            pluginDatas: { createMany: { data: pluginDatas } },
          },
        });
        const day = await tx.day.findUnique({ where: { date }, select: { tasksOrder: true } });
        const newTasksOrder = [
          ...day!.tasksOrder.slice(0, index),
          task.id,
          ...day!.tasksOrder.slice(index),
        ];
        await tx.day.update({ where: { date }, data: { tasksOrder: { set: newTasksOrder } } });
        return task;
      });
    },
  }),
);

const TaskPluginDataInput = builder.inputType("TaskPluginDataInput", {
  fields: (t) => ({
    pluginSlug: t.string({ required: true }),
    originalId: t.string({ required: false }),
    min: t.field({ type: "JSON" }),
    full: t.field({ type: "JSON" }),
  }),
});

const TaskActionDataInput = builder.inputType("TaskActionDataInput", {
  fields: (t) => ({
    pluginSlug: t.string({ required: true }),
    data: t.field({ type: "JSON" }),
  }),
});

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
  }),
);

builder.mutationField("deleteTask", (t) =>
  t.prismaField({
    type: "Task",
    description: `Delete a task.`,
    args: {
      id: t.arg.globalID({ required: true, description: "The Relay ID of the task to delete." }),
    },
    resolve: async (query, _, args) => {
      const task = await prisma.task.delete({ ...query, where: { id: parseInt(args.id.id) } });
      return task;
    },
  }),
);

export type PluginOnUpdateTaskStatus = (input: {
  /** The actionData that the web runtime of the plugin passed in. */
  actionData?: Prisma.InputJsonValue | null;
  newStatus: TaskStatus;
  task: Task & { pluginDatas: TaskPluginData[] };
}) => Promise<void>;

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
      actionData: t.input.field({
        type: [TaskActionDataInput],
        description: "The action data to be passed to the plugin.",
      }),
    },
    resolve: async (query, _, args) => {
      const days: Date[] = [];
      const plugins = await getPlugins();
      await prisma.$transaction(async (tx) => {
        const newStatus = args.input.status;
        const task = await tx.task.findUniqueOrThrow({
          where: { id: parseInt(args.input.id.id) },
          include: { day: { select: { date: true, tasksOrder: true } }, pluginDatas: true },
        });
        for (const pluginSlug in plugins) {
          const plugin = plugins[pluginSlug]!;
          // errors from plugins should interrupt the transaction and be thrown as GraphQL errors
          await plugin.onUpdateTaskStatus?.({
            actionData: args.input.actionData,
            newStatus,
            task,
          });
        }
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
            data: {
              status: newStatus,
              completedAt: newStatus === "DONE" ? new Date() : null,
              subtasks: {
                updateMany: {
                  where: { parentTaskId: task.id },
                  data: {
                    status: newStatus,
                    completedAt: newStatus === "DONE" ? new Date() : null,
                  },
                },
              },
            },
          });
          const newTasksOrder = originalDay.tasksOrder.filter((id) => id !== task.id);
          if (newStatus === "TODO") {
            newTasksOrder.splice(0, 0, task.id);
          } else {
            newTasksOrder.push(task.id);
          }
          await tx.day.update({
            where: { date: startOfToday },
            data: { tasksOrder: { set: newTasksOrder } },
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
              subtasks: {
                updateMany: {
                  where: { parentTaskId: task.id },
                  data: {
                    status: newStatus,
                    completedAt: newStatus === "DONE" ? new Date() : null,
                    date: startOfToday,
                  },
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
                completedAt: null,
                day: {
                  connectOrCreate: {
                    where: { date: startOfToday },
                    create: { date: startOfToday },
                  },
                },
                subtasks: {
                  updateMany: {
                    where: { parentTaskId: task.id },
                    data: {
                      status: newStatus,
                      completedAt: null,
                      date: startOfToday,
                    },
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
                updatedTask.day.tasksOrder.indexOf(a.id) - updatedTask.day.tasksOrder.indexOf(b.id),
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
                subtasks: {
                  updateMany: {
                    where: { parentTaskId: task.id },
                    data: {
                      status: newStatus,
                      completedAt:
                        newStatus === "DONE" ? dayjs(task.date).endOf("day").toDate() : null,
                    },
                  },
                },
              },
            });
            days.push(task.date);
          }
        }
      });
      return prisma.day.findMany({
        ...query,
        where: { date: { in: days } },
        orderBy: { date: "asc" },
      });
    },
  }),
);

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
    resolve: async (_, args) => {
      const plugins = await getPlugins();
      return prisma.$transaction(async (tx) => {
        const days: Date[] = [];
        const newDate = args.input.date;
        const task = await tx.task.findUniqueOrThrow({
          where: { id: parseInt(args.input.id.id) },
          include: { day: { select: { date: true, tasksOrder: true } }, pluginDatas: true },
        });
        const originalDay = task.day;
        const isSameDay = dayjs(task.date).isSame(newDate, "day");
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
          // update the date and update the status to DONE (if not already or it's CANCELED) and completedAt to the end of the day
          if (task.status !== "CANCELED") {
            newStatus = "DONE";
          }
          days.push(task.date, newDate);
        } else if (newDate > endOfToday) {
          // When the task is moving into the future,
          // update the date and update the status to TODO (if not already) and completedAt to null
          newStatus = "TODO";
          days.push(task.date, newDate);
        }
        if (newStatus === task.status) {
          newStatus = null;
        }

        if (newStatus) {
          for (const pluginSlug in plugins) {
            const plugin = plugins[pluginSlug]!;
            // errors from plugins should interrupt the transaction and be thrown as GraphQL errors
            await plugin.onUpdateTaskStatus?.({ newStatus, task });
          }
        }

        // Update the task
        await tx.task.update({
          where: { id: task.id },
          data: {
            day: { connectOrCreate: { where: { date: newDate }, create: { date: newDate } } },
            ...(newStatus
              ? {
                  status: newStatus,
                  completedAt: newStatus === "DONE" ? dayjs(newDate).endOf("day").toDate() : null,
                  subtasks: {
                    updateMany: {
                      where: { parentTaskId: task.id },
                      data: {
                        status: newStatus,
                        completedAt:
                          newStatus === "DONE" ? dayjs(newDate).endOf("day").toDate() : null,
                      },
                    },
                  },
                }
              : {}),
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
  }),
);

// -------------------- Task subtasks mutations --------------------

builder.mutationField("createSubtask", (t) =>
  t.prismaFieldWithInput({
    type: "Task",
    description: `Create a new subtask.`,
    input: {
      title: t.input.string({ required: true, description: "The title of the subtask." }),
      parentTaskId: t.input.globalID({
        required: true,
        description: "The Relay ID of the parent task.",
      }),
    },
    resolve: async (query, _, args) => {
      const parentTask = await prisma.task.findUnique({
        where: { id: parseInt(args.input.parentTaskId.id) },
      });
      if (!parentTask) {
        throw new GraphQLError(`Parent task with ID ${args.input.parentTaskId.id} not found.`, {
          extensions: {
            code: "PARENT_TASK_NOT_FOUND",
            userFriendlyMessage:
              "The parent task was not found. Please try refreshing the page and try again.",
          },
        });
      }
      return prisma.task.create({
        ...query,
        data: {
          title: args.input.title,
          status: "TODO",
          parentTask: { connect: { id: parseInt(args.input.parentTaskId.id) } },
          day: { connect: { date: parentTask.date } },
        },
      });
    },
  }),
);

builder.mutationField("makeTaskSubtaskOf", (t) =>
  t.prismaFieldWithInput({
    type: "Task",
    description: `Make a task a subtask of another task.`,
    input: {
      taskId: t.input.globalID({
        required: true,
        description: "The Relay ID of the task to update.",
      }),
      parentTaskId: t.input.globalID({
        required: true,
        description: "The Relay ID of the parent task.",
      }),
    },
    resolve: async (query, _, args) => {
      const parentTask = await prisma.task.findUnique({
        where: { id: parseInt(args.input.parentTaskId.id) },
      });
      if (!parentTask) {
        throw new GraphQLError(`Parent task with ID ${args.input.parentTaskId.id} not found.`, {
          extensions: {
            code: "PARENT_TASK_NOT_FOUND",
            userFriendlyMessage:
              "The parent task was not found. Please try refreshing the page and try again.",
          },
        });
      }
      return prisma.task.update({
        ...query,
        where: { id: parseInt(args.input.taskId.id) },
        data: {
          day: { connect: { date: parentTask.date } },
          parentTask: { connect: { id: parseInt(args.input.parentTaskId.id) } },
        },
      });
    },
  }),
);
