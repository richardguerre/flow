import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { ColorEnum } from "./Color";

export const TaskTagType = builder.prismaNode("TaskTag", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    name: t.exposeString("name"),
    slug: t.exposeString("slug"),
    color: t.expose("color", { type: ColorEnum }),
    tasks: t.relatedConnection("tasks", { cursor: "id" }),
    isPrivate: t.exposeBoolean("isPrivate"),
  }),
});

// -------------- TaskTag query types --------------

builder.queryField("taskTags", (t) =>
  t.prismaConnection({
    type: "TaskTag",
    cursor: "id",
    description:
      "Get all task tags ordered by usage in descending order. `before` and `after` cursors are ignored, and `first` and `last` act the same and are limited to 100.",
    args: {
      where: t.arg({
        type: TaskTagWhereInput,
        required: false,
        description: "Filters to use when querying task tags.",
      }),
    },
    resolve: (query, _, args) => {
      const where = args.where;
      return prisma.taskTag.findMany({
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

export const TaskTagWhereInput = builder.inputType("TaskTagWhereInput", {
  fields: (t) => ({
    nameIsLike: t.string({
      required: false,
      description: "Filter by name. Case insensitive.",
    }),
    isPrivate: t.boolean({
      required: false,
      description: "Filter by whether the tag is for private use.",
    }),
  }),
});
