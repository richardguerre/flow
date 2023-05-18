import { Prisma } from "@prisma/client";
import { builder } from "./builder";

export const ItemPluginDataType = builder.prismaNode("ItemPluginData", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    min: t.expose("min", { type: "JSON" }),
    full: t.expose("full", { type: "JSON" }),
    pluginSlug: t.exposeString("pluginSlug"),
  }),
});

export const ItemPluginDataInput = builder.inputType(
  builder.inputRef<Omit<Prisma.ItemPluginDataCreateInput, "item">>("ItemPluginDataInput"),
  {
    fields: (t) => ({
      pluginSlug: t.string({ required: true }),
      originalId: t.string({ required: false }),
      min: t.field({ type: "JSON", required: true }),
      full: t.field({ type: "JSON", required: true }),
    }),
  }
);
