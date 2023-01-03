import { prisma } from "../utils/prisma";
import { builder } from "./builder";

export const TaskLabelType = builder.prismaNode("TaskLabel", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    name: t.exposeString("name"),
    slug: t.exposeString("slug"),
    color: t.exposeString("color"),
    tasks: t.relatedConnection("tasks", { cursor: "id" }),
    isPrivate: t.exposeBoolean("isPrivate"),
  }),
});

// -------------- TaskLabel query types --------------

builder.queryField("taskLabels", (t) =>
  t.prismaConnection({
    type: "TaskLabel",
    cursor: "id",
    description:
      "Get all task labels ordered by usage in descending order. `before` and `after` cursors are ignored, and `first` and `last` act the same and are limited to 100.",
    args: {
      where: t.arg({
        type: TaskLabelWhereInput,
        required: false,
        description: "Filters to use when querying task labels.",
      }),
    },
    resolve: (query, _, args) => {
      const where = args.where;
      return prisma.taskLabel.findMany({
        ...query,
        where: {
          ...(where?.nameIsLike
            ? { name: { contains: where.nameIsLike, mode: "insensitive" } }
            : {}),
          ...(where?.isPrivate ? { isPrivate: { equals: where.isPrivate } } : {}),
        },
        orderBy: { tasks: { _count: "desc" } },
        take: Math.min(args.first ?? args.last ?? 100, 100),
      });
    },
  })
);

export const TaskLabelWhereInput = builder.inputType("TaskLabelWhereInput", {
  fields: (t) => ({
    nameIsLike: t.string({
      required: false,
      description: "Filter by name. Case insensitive.",
    }),
    isPrivate: t.boolean({
      required: false,
      description: "Filter by whether the label is for private use.",
    }),
  }),
});
