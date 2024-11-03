import { prisma } from "../utils/prisma";
import { builder, u } from "./builder";
import { JsonFilter, StringFilter } from "./PrismaFilters";

export const ShortcutType = builder.prismaNode("Shortcut", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    slug: t.exposeString("slug"),
    pluginSlug: t.exposeString("pluginSlug"),
    enabled: t.exposeBoolean("enabled"),
    elementId: t.exposeString("elementId"),
    trigger: t.exposeStringList("trigger"),
  }),
});

export const ShortcutWhereInputType = builder.prismaWhere("Shortcut", {
  fields: {
    pluginSlug: StringFilter,
    slug: StringFilter,
    trigger: JsonFilter,
    AND: true,
    OR: true,
    NOT: true,
  },
});

export const ShortcutOrderByType = builder.prismaOrderBy("Shortcut", {
  fields: {
    slug: true,
    createdAt: true,
    updatedAt: true,
  },
});

builder.queryField("shortcuts", (t) =>
  t.prismaConnection({
    type: "Shortcut",
    cursor: "id",
    description: "Get keyboard shortcuts.",
    args: {
      where: t.arg({ type: ShortcutWhereInputType, required: false }),
      orderBy: t.arg({ type: ShortcutOrderByType, required: false }),
    },
    resolve: async (query, _, args) => {
      return prisma.shortcut.findMany({
        ...query,
        where: args.where ?? undefined,
        orderBy: args.orderBy ?? undefined,
      });
    },
  }),
);

builder.mutationField("upsertShortcut", (t) =>
  t.prismaFieldWithInput({
    type: "Shortcut",
    description: "Create a new shortcut.",
    input: {
      slug: t.input.string({ required: true }),
      pluginSlug: t.input.string({ required: true }),
      elementId: t.input.string({ required: true }),
      trigger: t.input.stringList({ required: true }),
      enabled: t.input.boolean({ required: false }),
    },
    resolve: async (_, __, args) => {
      return prisma.shortcut.upsert({
        where: {
          slug_pluginSlug_unique: { slug: args.input.slug, pluginSlug: args.input.pluginSlug },
        },
        create: {
          slug: args.input.slug,
          pluginSlug: args.input.pluginSlug,
          elementId: args.input.elementId,
          trigger: args.input.trigger,
        },
        update: {
          trigger: args.input.trigger,
          enabled: u(args.input.enabled),
        },
      });
    },
  }),
);

builder.mutationField("disableShortcut", (t) =>
  t.prismaField({
    type: "Shortcut",
    description: "Disable a shortcut.",
    args: { id: t.arg.globalID({ required: true }) },
    resolve: async (_, __, args) => {
      return prisma.shortcut.update({
        where: { id: parseInt(args.id.id) },
        data: { enabled: false },
      });
    },
  }),
);

builder.mutationField("enableShortcut", (t) =>
  t.prismaField({
    type: "Shortcut",
    description: "Enable a shortcut.",
    args: { id: t.arg.globalID({ required: true }) },
    resolve: async (_, __, args) => {
      return prisma.shortcut.update({
        where: { id: parseInt(args.id.id) },
        data: { enabled: true },
      });
    },
  }),
);
