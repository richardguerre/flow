import { builder, u } from "./builder";
import { prisma } from "../utils/prisma";
import { ColorEnum } from "./Color";
import { ItemPluginDataInput } from "./ItemPluginData";
import { DateTimeFilter, IntFilter, JsonFilter } from "./PrismaFilters";
import { Item, ItemPluginData } from "@prisma/client";
import { getPlugins } from "../utils/getPlugins";
import { TaskListWhereInputType } from "./Task";
import { GraphQLError } from "graphql";
import { pgBoss } from "../utils/pgBoss";
import { CALENDAR_ITEM_CREATED_JOB_NAME, ItemWithTasks } from "../utils";

// -------------- Item types --------------

export const ItemType = builder.prismaNode("Item", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    title: t.exposeString("title"),
    isRelevant: t.exposeBoolean("isRelevant"),
    inboxPoints: t.exposeInt("inboxPoints", { nullable: true }),
    scheduledAt: t.expose("scheduledAt", { type: "DateTime", nullable: true }),
    durationInMinutes: t.exposeInt("durationInMinutes", { nullable: true }),
    isAllDay: t.exposeBoolean("isAllDay", { nullable: true }),
    color: t.expose("color", { type: ColorEnum, nullable: true }),
    pluginDatas: t.relation("pluginDatas"),
    tasks: t.relation("tasks"),
    listId: t.id({
      nullable: true,
      resolve: (item) => (item.listId ? `List_${item.listId}` : null),
    }),
    list: t.relation("list", { nullable: true }),
  }),
});

const ItemPluginDataWhereInputTypeFields = {
  originalId: "String",
  pluginSlug: "String",
  min: JsonFilter,
  full: JsonFilter,
} as const;

export const ItemPluginDataWhereInputType = builder.prismaWhere("ItemPluginData", {
  fields: {
    ...ItemPluginDataWhereInputTypeFields,
    AND: true,
    OR: true,
  },
});

export const ItemWhereInputType = builder.prismaWhere("Item", {
  fields: {
    isRelevant: "Boolean",
    scheduledAt: DateTimeFilter,
    inboxPoints: IntFilter,
    tasks: TaskListWhereInputType,
    pluginDatas: builder.prismaListFilter(ItemPluginDataWhereInputType, {
      ops: ["every", "some", "none"],
    }),
  },
});

const ItemOrderByType = builder.prismaOrderBy("Item", {
  fields: {
    inboxPoints: true,
    scheduledAt: true,
    createdAt: true,
    updatedAt: true,
  },
});

// --------------- Item query types ---------------

builder.queryField("items", (t) =>
  t.prismaConnection({
    type: "Item",
    cursor: "id",
    description: `Get all external items. Useuful to get list of items for a specific day to show in a calendar, or get items with inboxPoints to show in the inbox.
By default, only items where \`isRelevant\` is true.
Pass the \`where\` argument to override these defaults.`,
    args: {
      where: t.arg({ type: ItemWhereInputType, required: false }),
      orderBy: t.arg({ type: ItemOrderByType, required: false }),
    },
    smartSubscription: true,
    subscribe: (subs) => {
      subs.register("itemsCreated");
      subs.register("itemsUpdated");
      subs.register("itemsDeleted");
    },
    resolve: (query, _, args) => {
      return prisma.item.findMany({
        ...query,
        take: undefined, // prevents `query` from overriding `take` and return all items
        where: args.where ?? undefined,
        orderBy: args.orderBy ?? undefined,
      });
    },
  }),
);

builder.queryField("canRefreshCalendarItems", (t) =>
  t.field({
    type: "Boolean",
    resolve: async () => {
      const plugins = await getPlugins();
      for (const plugin of Object.values(plugins)) {
        if (plugin.onRefreshCalendarItems) return true;
      }
      return false;
    },
  }),
);

// --------------- Item mutation types ---------------

builder.mutationField("createItem", (t) =>
  t.prismaFieldWithInput({
    type: "Item",
    description: `Create an item.`,
    input: {
      title: t.input.string({ required: true, description: `The title of the item.` }),
      isRelevant: t.input.boolean({
        required: false,
        description: `If set to true, it will return items where \`isRelevant\` is true. 

\`isRelevant\` is used in the List component to only show relevant items. If the item becomes irrelevant (e.g. because the trello task was already completed), you can update the item to make this \`isRelevant = false\``,
      }),
      scheduledAt: t.input.field({ type: "DateTime", required: false }),
      durationInMinutes: t.input.int({ required: false }),
      isAllDay: t.input.boolean({ required: false }),
      color: t.input.field({ type: ColorEnum, required: false }),
      inboxPoints: t.input.int({ required: false }),
      listId: t.input.globalID({ required: false }),
      pluginDatas: t.input.field({ type: [ItemPluginDataInput], required: false }),
    },
    resolve: (query, _, { input }) => {
      return prisma.item.create({
        ...query,
        data: {
          title: input.title,
          isRelevant: u(input.isRelevant),
          scheduledAt: u(input.scheduledAt),
          durationInMinutes: u(input.durationInMinutes),
          isAllDay: u(input.isAllDay),
          color: u(input.color),
          inboxPoints: u(input.inboxPoints),
          list:
            input.listId && input.listId.typename === "List"
              ? { connect: { id: parseInt(input.listId.id) } }
              : undefined,
          ...(input.pluginDatas
            ? {
                pluginDatas: {
                  createMany: {
                    data: input.pluginDatas,
                  },
                },
              }
            : {}),
        },
      });
    },
  }),
);

builder.mutationField("createCalendarItem", (t) =>
  t.prismaFieldWithInput({
    type: "Item",
    description: `Create an item in the calendar.`,
    input: {
      title: t.input.string({ required: true, description: "The title of the item." }),
      scheduledAt: t.input.field({ type: "DateTime", required: true }),
      durationInMinutes: t.input.int({ required: false }),
      isAllDay: t.input.boolean({ required: false }),
      color: t.input.field({ type: ColorEnum, required: false }),
      pluginDatas: t.input.field({ type: [ItemPluginDataInput], required: false }),
      fromTaskId: t.input.globalID({ required: false }),
    },
    resolve: async (query, _, { input }) => {
      const fromTask = input.fromTaskId
        ? await prisma.task
            .findUniqueOrThrow({ where: { id: parseInt(input.fromTaskId.id) } })
            .catch(() => {
              throw new GraphQLError("Task not found.", { extensions: { code: "TASK_NOT_FOUND" } });
            })
        : null;

      if (fromTask?.itemId) {
        throw new GraphQLError(
          `Task (${fromTask.id}) already linked to an item (${fromTask.itemId}).`,
          {
            extensions: {
              code: "TASK_ALREADY_LINKED_TO_ITEM",
              userFriendlyMessage: `This task is already linked to an item in your calendar.`,
            },
          },
        );
      }

      const item = await prisma.item.create({
        ...query,
        data: {
          title: input.title,
          scheduledAt: u(input.scheduledAt),
          durationInMinutes: u(input.durationInMinutes),
          isAllDay: u(input.isAllDay),
          color: u(input.color),
          ...(input.pluginDatas
            ? {
                pluginDatas: {
                  createMany: {
                    data: input.pluginDatas,
                  },
                },
              }
            : {}),
          ...(fromTask ? { tasks: { connect: { id: fromTask.id } } } : {}),
        },
        include: { tasks: { select: { id: true } } },
      });

      await pgBoss.send(CALENDAR_ITEM_CREATED_JOB_NAME, item satisfies ItemWithTasks);
      console.log("Sent job to create calendar event", item.id);

      return item;
    },
  }),
);

builder.mutationField("updateItem", (t) =>
  t.prismaFieldWithInput({
    type: "Item",
    description: `Update an item.`,
    input: {
      id: t.input.globalID({ required: true }),
      title: t.input.string({ required: false }),
      isRelevant: t.input.boolean({
        required: false,
        description: `If set to true, it will return items where \`isRelevant\` is true.

\`isRelevant\` is used in the List component to only show relevant items. If the item becomes irrelevant (e.g. because the trello task was already completed), you can update the item to make this \`isRelevant = false\``,
      }),
      scheduledAt: t.input.field({ type: "DateTime", required: false }),
      durationInMinutes: t.input.int({ required: false }),
      isAllDay: t.input.boolean({ required: false }),
      color: t.input.field({ type: ColorEnum, required: false }),
      inboxPoints: t.input.int({ required: false }),
      listId: t.input.globalID({ required: false }),
      pluginDatas: t.input.field({ type: [ItemPluginDataInput], required: false }),
    },
    resolve: (query, _, { input }) => {
      return prisma.item.update({
        ...query,
        where: { id: parseInt(input.id.id) },
        data: {
          title: u(input.title),
          isRelevant: u(input.isRelevant),
          scheduledAt: u(input.scheduledAt),
          durationInMinutes: u(input.durationInMinutes),
          isAllDay: u(input.isAllDay),
          color: u(input.color),
          inboxPoints: u(input.inboxPoints),
          list:
            input.listId && input.listId.typename === "List"
              ? { connect: { id: parseInt(input.listId.id) } }
              : undefined,
          ...(input.pluginDatas
            ? {
                pluginDatas: {
                  createMany: {
                    data: input.pluginDatas,
                  },
                },
              }
            : {}),
        },
      });
    },
  }),
);

export type PluginOnUpdateItemStatus = (input: {
  /** Whether the item is being marked as done or not done. */
  settingToDone: boolean;
  /** The item. */
  item: Item & { pluginDatas: ItemPluginData[] };
}) => Promise<void>;

builder.mutationField("updateItemStatus", (t) =>
  t.prismaFieldWithInput({
    type: "Item",
    description: `Mark an item as done or not done. Plugins can use this to mark the item as done or not done in the external system. For example, if the item is a trello task and is marked as done in Flow, it will be marked as done in trello (by the Trello plugin).`,
    input: {
      id: t.input.globalID({ required: true, description: "The ID of the item." }),
      done: t.input.boolean({ required: true, description: "Whether the item is done or not." }),
    },
    resolve: async (query, _, args) => {
      const plugins = await getPlugins();
      const item = await prisma.item.findUnique({
        where: { id: parseInt(args.input.id.id) },
        include: { pluginDatas: true },
      });
      if (!item) throw new Error(`Item with id ${args.input.id} not found.`);
      for (const pluginSlug in plugins) {
        const plugin = plugins[pluginSlug]!;
        if (plugin.onUpdateItemStatus) {
          // errors from plugins should interrupt the update
          await plugin.onUpdateItemStatus({
            settingToDone: args.input.done,
            item,
          });
        }
      }
      return await prisma.item.update({
        ...query,
        where: { id: parseInt(args.input.id.id) },
        data: { isRelevant: !args.input.done },
      });
    },
  }),
);

builder.mutationField("deleteItem", (t) =>
  t.prismaField({
    type: "Item",
    description: `Delete an item.`,
    args: {
      id: t.arg.globalID({ required: true }),
    },
    resolve: (query, _, args) => {
      return prisma.item.delete({ ...query, where: { id: parseInt(args.id.id) } });
    },
  }),
);

builder.mutationField("dismissItemFromInbox", (t) =>
  t.prismaFieldWithInput({
    type: "Item",
    description: `Dismiss an item from the inbox. This effectively sets \`inboxPoints = null\` for the item.`,
    input: {
      id: t.input.globalID({ required: true }),
    },
    resolve: (query, _, args) => {
      return prisma.item.update({
        ...query,
        where: { id: parseInt(args.input.id.id) },
        data: { inboxPoints: null },
      });
    },
  }),
);

builder.mutationField("refreshCalendarItems", (t) =>
  t.field({
    type: "Boolean",
    resolve: async () => {
      const plugins = await getPlugins();
      await Promise.all(Object.values(plugins).map((plugin) => plugin.onRefreshCalendarItems?.()));
      return true;
    },
  }),
);
