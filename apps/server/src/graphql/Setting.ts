import { prisma } from "../utils/prisma";
import { builder } from "./builder";

const SettingKeys = {
  INSTALLED_PLUGINS: "flow-installed-plugins",
};

type PluginInstallation = {
  /** The plugin's slug */
  slug: string;
  /** The plugin's URL. It can be jsdelivr URL or anything that servers application/javascript static files. */
  url: string;
};

export const SettingType = builder.prismaNode("Setting", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    key: t.exposeString("key"),
    value: t.expose("value", { type: "JSON" }),
    pluginSlug: t.exposeString("pluginSlug", { nullable: true }),
  }),
});

// --------------- Setting query types ---------------

builder.queryField("settings", (t) =>
  t.prismaConnection({
    type: "Setting",
    cursor: "id",
    description: "Get all settings. The args (first, last, after, before) don't work yet.",
    // TODO: add pagination. See https://github.com/devoxa/prisma-relay-cursor-connection/blob/936a800b8ec4cf62b644bce4c0c0fdf7a90f5e7c/src/index.ts#L12 or https://gist.github.com/ctrlplusb/17b5a1bd1736b5ba547bb15b3dd5be29#file-findmanycursor-ts
    resolve: (query) => {
      return prisma.setting.findMany({
        ...query,
        where: { isSecret: false, isServerOnly: false },
      });
    },
  })
);

builder.queryField("getInstalledPlugins", (t) =>
  t.field({
    type: [PluginInstallationType],
    description: "Get all installed plugins.",
    resolve: async () => {
      const setting = await prisma.setting.findFirst({
        where: { key: SettingKeys.INSTALLED_PLUGINS },
      });
      if (!setting) {
        return [];
      } else {
        return setting.value as PluginInstallation[];
      }
    },
  })
);

const PluginInstallationType = builder.objectType(
  builder.objectRef<PluginInstallation>("PluginInstallation"),
  {
    fields: (t) => ({
      slug: t.exposeString("slug"),
      url: t.exposeString("url"),
    }),
  }
);

// --------------- Setting mutation types ---------------

builder.mutationField("createASetting", (t) =>
  t.prismaFieldWithInput({
    type: "Setting",
    description: "Create a setting.",
    input: {
      key: t.input.string({ required: true }),
      value: t.input.field({ type: "JSON", required: true }),
      pluginSlug: t.input.string({ required: true }),
    },
    resolve: (query, _, args) => {
      return prisma.setting.create({
        ...query,
        data: {
          key: args.input.key,
          value: args.input.value,
          pluginSlug: args.input.pluginSlug,
          isSecret: false,
          isServerOnly: false,
        },
      });
    },
  })
);
