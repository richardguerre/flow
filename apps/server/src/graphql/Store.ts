import { installServerPlugin, uninstallServerPlugin } from "../utils/getPlugins";
import { prisma } from "../utils/prisma";
import { builder } from "./builder";

const SettingKeys = {
  INSTALLED_PLUGINS: "installed-plugins",
};

type PluginInstallation = {
  /** The plugin's slug */
  slug: string;
  /** The plugin's URL. It can be jsdelivr URL or anything that servers application/javascript static files. */
  url: string;
};

export const SettingType = builder.prismaNode("Store", {
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

builder.queryField("storeItems", (t) =>
  // TODO: maybe change to prismaConnection and add pagination. See https://github.com/devoxa/prisma-relay-cursor-connection/blob/936a800b8ec4cf62b644bce4c0c0fdf7a90f5e7c/src/index.ts#L12 or https://gist.github.com/ctrlplusb/17b5a1bd1736b5ba547bb15b3dd5be29#file-findmanycursor-ts
  t.prismaFieldWithInput({
    type: ["Store"],
    description: `Get store items.

Pass the \`pluginSlug\` if you want to get items created by a specific plugin. Not passing the \`pluginSlug\` will return items created by flow.`,
    input: {
      pluginSlug: t.input.string({ required: false }),
      keys: t.input.stringList({ required: false }),
    },
    argOptions: {
      required: false,
    },
    resolve: (query, _, args) => {
      return prisma.store.findMany({
        ...query,
        where: {
          isSecret: false,
          isServerOnly: false,
          pluginSlug: args.input?.pluginSlug ?? null,
          ...(args.input?.keys?.length ? { key: { in: args.input.keys } } : {}),
        },
      });
    },
  })
);

builder.queryField("installedPlugins", (t) =>
  t.field({
    type: [PluginInstallationType],
    description: "Get all installed plugins.",
    resolve: async () => {
      const setting = await prisma.store.findFirst({
        where: {
          key: SettingKeys.INSTALLED_PLUGINS,
          isSecret: false,
          isServerOnly: false,
          pluginSlug: null,
        },
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

builder.mutationField("upsertStoreItem", (t) =>
  t.prismaFieldWithInput({
    type: "Store",
    description:
      "Creates a store item. If a store item with the same key exists, it will be updated.",
    input: {
      key: t.input.string({ required: true }),
      value: t.input.field({ type: "JSON", required: true }),
      pluginSlug: t.input.string({ required: false }),
      isSecret: t.input.boolean({ required: false }),
      isServerOnly: t.input.boolean({ required: false }),
    },
    resolve: (query, _, args) => {
      const pluginSlug = args.input.pluginSlug;
      return prisma.store.upsert({
        ...query,
        where: {
          ...(pluginSlug
            ? { pluginSlug_key_unique: { key: args.input.key, pluginSlug } }
            : { key: args.input.key }),
        },
        update: { value: args.input.value },
        create: {
          key: args.input.key,
          value: args.input.value,
          pluginSlug: args.input.pluginSlug,
          isSecret: args.input.isSecret ?? false,
          isServerOnly: args.input.isServerOnly ?? false,
        },
      });
    },
  })
);

builder.mutationField("installPlugin", (t) =>
  t.fieldWithInput({
    type: [PluginInstallationType],
    description:
      "Install a plugin. If a plugin with the same slug exists, it will throw an error, unless `override` is set to true.",
    input: {
      url: t.input.string({ required: true }),
      override: t.input.boolean({ required: false }),
    },
    resolve: async (_, args) => {
      const currSetting = await prisma.store.findFirst({
        where: {
          key: SettingKeys.INSTALLED_PLUGINS,
          isSecret: false,
          isServerOnly: false,
          pluginSlug: null,
        },
      });
      let installedPlugins = (currSetting?.value ?? []) as PluginInstallation[];

      // this will throw GraphQLErrors if there are any problems with the plugin
      // installation. If there exists a plugin with the same slug, it will throw.
      // the user can choose to override the existing plugin by setting the `override`
      // arg to true.
      const newPluginSlug = await installServerPlugin({
        url: args.input.url,
        installedPluginSlugs: installedPlugins.map((p) => p.slug),
        override: args.input.override ?? false,
      });

      // remove old plugin installation if it exists
      installedPlugins = installedPlugins.filter((p) => p.slug !== newPluginSlug);
      // add new plugin installation
      installedPlugins.push({
        url: args.input.url,
        slug: newPluginSlug,
      });

      const newSetting = await prisma.store.upsert({
        where: { key: SettingKeys.INSTALLED_PLUGINS },
        update: { value: installedPlugins },
        create: {
          key: SettingKeys.INSTALLED_PLUGINS,
          value: installedPlugins,
          isSecret: false,
          isServerOnly: false,
        },
      });
      return newSetting.value as PluginInstallation[];
    },
  })
);

builder.mutationField("uninstallPlugin", (t) =>
  t.fieldWithInput({
    type: [PluginInstallationType],
    description: "Uninstall a plugin.",
    input: {
      slug: t.input.string({ required: true }),
    },
    resolve: async (_, args) => {
      const currSetting = await prisma.store.findFirst({
        where: {
          key: SettingKeys.INSTALLED_PLUGINS,
          isSecret: false,
          isServerOnly: false,
          pluginSlug: null,
        },
      });
      let installedPlugins = (currSetting?.value ?? []) as PluginInstallation[];

      // uninstall the plugin on the server's file system
      await uninstallServerPlugin(args.input.slug);

      // remove old plugin installation if it exists
      installedPlugins = installedPlugins.filter((p) => p.slug !== args.input.slug);

      const newSetting = await prisma.store.upsert({
        where: { key: SettingKeys.INSTALLED_PLUGINS },
        update: { value: installedPlugins },
        create: {
          key: SettingKeys.INSTALLED_PLUGINS,
          value: installedPlugins,
          isSecret: false,
          isServerOnly: false,
        },
      });
      return newSetting.value as PluginInstallation[];
    },
  })
);
