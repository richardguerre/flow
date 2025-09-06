import { builder } from "./builder";

export const TaskPluginDataType = builder.prismaNode("TaskPluginData", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    originalId: t.exposeString("originalId", { nullable: true }),
    min: t.expose("min", { type: "JSON" }),
    full: t.expose("full", { type: "JSON" }),
    pluginSlug: t.exposeString("pluginSlug"),
  }),
});
