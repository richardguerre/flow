import { builder } from "./builder";
import { prisma } from "../utils/prisma";
import { startOfDayScheduledAt, endOfDayScheduledAt } from "../utils/getDays";

// -------------- Item types --------------

export const ItemType = builder.prismaNode("Item", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    title: t.exposeString("title"),
    isRelevant: t.exposeBoolean("isRelevant"),
    scheduledAt: t.expose("scheduledAt", { type: "DateTime", nullable: true }),
    durationInMinutes: t.exposeInt("durationInMinutes", { nullable: true }),
    pluginDatas: t.relation("pluginDatas"),
  }),
});

// --------------- Item query types ---------------

builder.queryField("items", (t) =>
  t.prismaConnection({
    type: "Item",
    cursor: "id",
    description: `Get all external items. Useuful to get list of items for a specific day to show in a calendar.
By default, only items where isRelevant is true and scheduledAt is today.
Pass the \`where\` argument to override these defaults.`,
    args: { where: t.arg({ type: ItemWhereInput, required: false }) },
    resolve: (query, _, args) => {
      const scheduledFor = args.where?.scheduledFor;
      return prisma.item.findMany({
        ...query,
        where: {
          isRelevant: args.where?.isRelevant ?? true,
          ...(scheduledFor
            ? {
                scheduledAt: {
                  gte: startOfDayScheduledAt(scheduledFor),
                  lte: endOfDayScheduledAt(scheduledFor),
                },
              }
            : { scheduledAt: null }),
        },
      });
    },
  })
);

export const ItemWhereInput = builder.inputType("ItemWhereInput", {
  fields: (t) => ({
    isRelevant: t.boolean({
      required: false,
      description: `If set to true, it will return items where isRelevant is true.`,
      defaultValue: true,
    }),
    scheduledFor: t.field({
      type: "Date",
      required: false,
      description: `If set to true, it will return items where scheduledAt is today or null.`,
      defaultValue: new Date(),
    }),
  }),
});
