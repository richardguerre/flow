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
