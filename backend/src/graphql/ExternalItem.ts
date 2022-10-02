import { builder } from "./builder";
import { externalSources } from "../../../config";
import { prisma } from "../utils/prisma";
import { endOfDay, startOfDay } from "../utils/getDays";

// -------------- ExternalItem types --------------

export const ExternalItemType = builder.prismaNode("ExternalItem", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    title: t.exposeString("title"),
    isRelevant: t.exposeBoolean("isRelevant"),
    url: t.exposeString("url", { nullable: true }),
    scheduledAt: t.expose("scheduledAt", { type: "DateTime", nullable: true }),
    durationInMinutes: t.exposeInt("durationInMinutes", { nullable: true }),
    source: t.exposeString("source"),
    iconUrl: t.string({
      description: "Icon url for the external source",
      resolve: (item) => externalSources[item.source]?.iconUrl ?? null,
      nullable: true,
    }),
  }),
});

// --------------- ExternalItem query types ---------------

builder.queryField("externalItems", (t) =>
  t.prismaConnection({
    type: "ExternalItem",
    cursor: "id",
    description: `Get all external items.
      By default, only items where isRelevant is true and scheduledAt is null are returned.
      Pass the \`where\` argument to override these defaults.`,
    args: { where: t.arg({ type: ExternalItemWhereInput, required: false }) },
    resolve: (query, _, args) => {
      return prisma.externalItem.findMany({
        ...query,
        where: {
          isRelevant: args.where?.isRelevant ?? true,
          ...(args.where?.isScheduled
            ? { scheduledAt: { gte: startOfDay(), lte: endOfDay() } }
            : { scheduledAt: null }),
        },
      });
    },
  })
);

export const ExternalItemWhereInput = builder.inputType("ExternalItemWhereInput", {
  fields: (t) => ({
    isRelevant: t.boolean({
      required: false,
      description: `If set to true, it will return items where isRelevant is true.`,
    }),
    isScheduled: t.boolean({
      required: false,
      description: `If set to true, it will return items where scheduledAt is today or null.`,
    }),
  }),
});
