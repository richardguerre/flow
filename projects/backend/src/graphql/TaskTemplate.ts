import { arg, enumType, extendType, inputObjectType, objectType } from "nexus";
import { TaskRepeatance, TaskTemplate } from "nexus-prisma";

// --------------- TaskTemplate types ---------------

export const TaskTemplateTypes = objectType({
  name: TaskTemplate.$name,
  description: TaskTemplate.$description,
  definition(t) {
    t.field(TaskTemplate.id);
    t.field(TaskTemplate.title);
    t.field(TaskTemplate.durationInMinutes);
    t.field(TaskTemplate.repeats);
  },
});

export const TaskRepeatanceEnum = enumType(TaskRepeatance);

// ------------ TaskTemplate query types ------------

export const TaskTemplateQueryTypes = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("repeatingTasks", {
      type: "TaskTemplate",
      args: {
        where: arg({ type: "TaskTemplateWhereInput" }),
      },
      resolve: (_, args, ctx) =>
        ctx.prisma.taskTemplate.findMany({
          where: { ...(args.where?.repeats ? { repeats: { hasSome: args.where.repeats } } : {}) },
        }),
    });
  },
});

export const TaskTemplateWhereInput = inputObjectType({
  name: "TaskTemplateWhereInput",
  definition(t) {
    t.list.nonNull.field({ name: "repeats", type: TaskRepeatanceEnum });
  },
});
