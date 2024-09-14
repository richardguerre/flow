import { GraphQLError } from "graphql";
import { prisma } from "../utils/prisma";
import { builder, u } from "./builder";
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
  }),
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

// -------------- TaskTag mutation types --------------

export const CreateTaskTagInput = builder.inputType("CreateTaskTagInput", {
  fields: (t) => ({
    name: t.string({ required: true, description: "The name of the task tag." }),
    color: t.field({
      type: ColorEnum,
      required: true,
      description: "The color of the task tag.",
    }),
    isPrivate: t.boolean({
      required: true,
      description: "Whether tasks with this tag will be considered private.",
    }),
  }),
});

builder.mutationField("createTaskTag", (t) =>
  t.prismaFieldWithInput({
    type: "TaskTag",
    description: "Create a new task tag.",
    input: {
      name: t.input.string({ required: true, description: "The name of the task tag." }),
      color: t.input.field({
        type: ColorEnum,
        required: true,
        description: "The color of the task tag.",
      }),
      isPrivate: t.input.boolean({
        required: true,
        description: "Whether tasks with this tag will be considered private.",
      }),
    },
    resolve: async (query, _, args) => {
      const slug = createTaskTagSlug(args.input.name);
      return prisma.taskTag.create({
        ...query,
        data: {
          name: args.input.name,
          color: args.input.color,
          isPrivate: args.input.isPrivate,
          slug,
        },
      });
    },
  }),
);

export const createTaskTagSlug = (name: string) => name.toLowerCase().replaceAll(" ", "-");

builder.mutationField("updateTaskTag", (t) =>
  t.prismaFieldWithInput({
    type: "TaskTag",
    description: "Update a task tag.",
    input: {
      id: t.input.globalID({
        required: true,
        description: "The Relay ID of the task tag to update.",
      }),
      name: t.input.string({ required: false, description: "The new name of the task tag." }),
      color: t.input.field({
        type: ColorEnum,
        required: false,
        description: "The new color of the task tag.",
      }),
      isPrivate: t.input.boolean({
        required: false,
        description: "Whether tasks with this tag will be considered private.",
      }),
    },
    resolve: async (query, _, args) => {
      const tag = await prisma.taskTag.findUnique({
        where: { id: parseInt(args.input.id.id) },
      });
      if (!tag) {
        throw new GraphQLError(`Tag with ID ${args.input.id.id} not found.`, {
          extensions: {
            code: "TAG_NOT_FOUND",
            userFriendlyMessage:
              "The tag was not found. Please try refreshing the page and try again.",
          },
        });
      }
      const slug = args.input.name?.toLowerCase().replaceAll(" ", "-");
      return prisma.taskTag.update({
        ...query,
        where: { id: parseInt(args.input.id.id) },
        data: {
          name: u(args.input.name),
          color: u(args.input.color),
          isPrivate: u(args.input.isPrivate),
          slug: u(slug),
        },
      });
    },
  }),
);

builder.mutationField("deleteTaskTag", (t) =>
  t.prismaFieldWithInput({
    type: "TaskTag",
    description: "Delete a task tag.",
    input: {
      id: t.input.globalID({
        required: true,
        description: "The Relay ID of the task tag to delete.",
      }),
    },
    resolve: async (query, _, args) => {
      const tag = await prisma.taskTag.findUnique({
        where: { id: parseInt(args.input.id.id) },
      });
      if (!tag) {
        throw new GraphQLError(`Tag with ID ${args.input.id.id} not found.`, {
          extensions: {
            code: "TAG_NOT_FOUND",
            userFriendlyMessage:
              "The tag was not found. Please try refreshing the page and try again.",
          },
        });
      }
      return prisma.taskTag.delete({
        ...query,
        where: { id: parseInt(args.input.id.id) },
      });
    },
  }),
);
