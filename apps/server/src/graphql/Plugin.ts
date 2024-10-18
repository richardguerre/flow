import { builder } from "./builder";
import { Plugin, PluginAuthor, PluginVersion, QueryPluginsConnection } from "./ct-graphql";
import {
  getPluginJson,
  getPluginsInStore,
  installServerPlugin,
  uninstallServerPlugin,
} from "../utils/getPlugins";
import { GraphQLError } from "graphql";
import { prisma } from "../utils/prisma";
import { FlowPluginSlug, StoreKeys } from "./Store";
import { env } from "../env";

export const ctGraphql = async <TVariables extends object, TRes extends object>(
  query: string,
  variables?: TVariables,
) => {
  const res = await fetch(`${env.FLOW_CT_API_URL ?? "https://flow-ct.onrender.com"}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

  if (res.errors) throw { message: `Flow CT API error: ${JSON.stringify(res.errors, null, 2)}` };

  const data = res.data as TRes;
  return data;
};

builder.queryField("plugins", (t) =>
  t.connection({
    type: PluginType,
    authScopes: { public: true },
    skipTypeScopes: true, // this is required as the authScope of the Query type is set to authenticated by default
    resolve: async (_, args, _ctx, info) => {
      // optimization to avoid over-fetching the plugins data (Plugin.versions especially)
      const opLoc = info.operation.loc;
      const queryStr = opLoc ? opLoc.source.body.slice(opLoc.start, opLoc.end) : "";
      const fragsStr = Object.values(info.fragments)
        .map((frag) => {
          return frag.loc ? frag.loc.source.body.slice(frag.loc.start, frag.loc.end) : "";
        })
        .join("");
      const docStr = queryStr + fragsStr;

      const pluginsConnection = await ctGraphql<typeof args, { plugins: QueryPluginsConnection }>(
        /* GraphQL */ `
          query PluginsConnectionQuery(
            $after: ID
            $before: ID
            $first: Int
            $last: Int
            $includeVersions: Boolean!
            $includeLatestVersion: Boolean!
            $includeAuthors: Boolean!
          ) {
            plugins(after: $after, before: $before, first: $first, last: $last) {
              edges {
                cursor
                node {
                  ...Plugin
                }
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
          ${PluginTypeFragment}
        `,
        {
          ...args,
          includeVersions: docStr?.includes("versions"),
          includeLatestVersion: docStr?.includes("latestVersion"),
          includeAuthors: docStr?.includes("authors"),
        },
      );

      return pluginsConnection.plugins;
    },
  }),
);

const PluginVersionType = builder.node(builder.objectRef<PluginVersion>("PluginVersion"), {
  id: { resolve: (version) => version.id },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    version: t.exposeString("version"),
    installUrl: t.exposeString("installUrl"),
    isPrerelease: t.exposeBoolean("isPrerelease"),
  }),
});

const PluginVersionTypeFragment = /* GraphQL */ `
  fragment PluginVersion on PluginVersion {
    id
    createdAt
    updatedAt
    version
    installUrl
    isPrerelease
  }
`;

const PluginAuthorType = builder.node(builder.objectRef<PluginAuthor>("PluginAuthor"), {
  id: { resolve: (author) => author.id },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    name: t.exposeString("name"),
    avatarUrl: t.exposeString("avatarUrl", { nullable: true }),
  }),
});

const PluginAuthorTypeFragment = /* GraphQL */ `
  fragment PluginAuthor on PluginAuthor {
    id
    createdAt
    updatedAt
    name
    avatarUrl
  }
`;

const PluginType = builder.node(builder.objectRef<Plugin>("Plugin"), {
  id: { resolve: (plugin) => plugin.id },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    slug: t.exposeString("slug"),
    name: t.exposeString("name"),
    shortDescription: t.exposeString("shortDescription"),
    iconUrl: t.exposeString("iconUrl"),
    authors: t.expose("authors", { type: [PluginAuthorType] }),
    versions: t.expose("versions", { type: [PluginVersionType] }),
    latestVersion: t.expose("latestVersion", { type: PluginVersionType, nullable: true }),
  }),
});

const PluginTypeFragment = /* GraphQL */ `
  fragment Plugin on Plugin {
    id
    createdAt
    updatedAt
    slug
    name
    shortDescription
    iconUrl
    authors @include(if: $includeAuthors) {
      ...PluginAuthor
    }
    versions @include(if: $includeVersions) {
      ...PluginVersion
    }
    latestVersion @include(if: $includeLatestVersion) {
      ...PluginVersion
    }
  }
  ${PluginAuthorTypeFragment}
  ${PluginVersionTypeFragment}
`;

export type PluginInstallationInStore = {
  /** The plugin's slug */
  slug: string;
  /** The plugin's version */
  version: string;
  /** The plugin's URL. It can be jsdelivr URL or anything that servers application/javascript static files. */
  url: string;

  /** Whether the plugin has a web runtime. */
  web: boolean;
  /** Whether the plugin has a mobile runtime. */
  mobile: boolean;
  /** Whether the plugin has a server runtime. */
  server: boolean;
};

type PluginInstallation = PluginInstallationInStore & {
  latestVersion: PluginVersion | null;
};

const PluginInstallationType = builder.objectType(
  builder.objectRef<PluginInstallation>("PluginInstallation"),
  {
    fields: (t) => ({
      slug: t.exposeString("slug"),
      url: t.exposeString("url"),
      version: t.exposeString("version"),
      latestVersion: t.expose("latestVersion", { type: PluginVersionType, nullable: true }),
      hasWebRuntime: t.exposeBoolean("web"),
      hasMobileRuntime: t.exposeBoolean("mobile"),
      hasServerRuntime: t.exposeBoolean("server"),
    }),
  },
);

const addCtInfo = async (pluginsInStore: PluginInstallationInStore[]) => {
  const data = await ctGraphql<{ slugs: string[] }, { plugins: QueryPluginsConnection }>(
    /* GraphQL */ `
      query GetInfoOnInstalledPlugins($slugs: [String!]!) {
        plugins(where: { slug: { in: $slugs } }) {
          edges {
            node {
              slug
              latestVersion {
                ...PluginVersion
              }
            }
          }
        }
      }
      ${PluginVersionTypeFragment}
    `,
    { slugs: pluginsInStore.map((p) => p.slug) },
  );
  const pluginsMap = new Map(data.plugins?.edges?.map((edge) => [edge?.node?.slug, edge.node]));

  return pluginsInStore.map((plugin) => ({
    latestVersion: pluginsMap.get(plugin.slug)?.latestVersion ?? null,
    ...plugin,
  }));
};

builder.queryField("installedPlugins", (t) =>
  t.field({
    type: [PluginInstallationType],
    description: "Get all installed plugins.",
    resolve: async () => {
      const pluginsInStore = await getPluginsInStore();
      return await addCtInfo(pluginsInStore);
    },
  }),
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
      let installedPlugins = await getPluginsInStore();

      // this will throw GraphQLErrors if there are problems with the plugin.json file
      const newPluginJson = await getPluginJson({ url: args.input.url });

      if (!args.input.override && !!installedPlugins.find((p) => p.slug === newPluginJson.slug)) {
        throw new GraphQLError(
          `A plugin with the slug "${newPluginJson.slug}" is already installed. Use the \`override\` option to override the existing plugin.`,
          {
            extensions: {
              code: "PLUGIN_WITH_SAME_SLUG",
              userFriendlyMessage:
                "There is a problem with the plugin you are trying to install (Error: PLUGIN_WITH_SAME_SLUG). Please contact the plugin author for more information.",
            },
          },
        );
      }

      if (newPluginJson.slug.includes("_")) {
        throw new GraphQLError(
          `The plugin slug "${newPluginJson.slug}" is invalid. Plugin slugs cannot contain underscores.`,
          {
            extensions: {
              code: "PLUGIN_SLUG_INVALID",
              userFriendlyMessage:
                "There is a problem with the plugin you are trying to install (Err: PLUGIN_SLUG_INVALID). Please contact the plugin author for more information.",
            },
          },
        );
      }

      if (newPluginJson.server) {
        // this will throw GraphQLErrors if there are problems with the plugin installation process
        await installServerPlugin({
          url: args.input.url,
          slug: newPluginJson.slug,
          override: args.input.override ?? false,
        });
      }

      // remove old plugin installation if it exists
      installedPlugins = installedPlugins.filter((p) => p.slug !== newPluginJson.slug);
      // add new plugin installation
      installedPlugins.push({
        slug: newPluginJson.slug,
        version: newPluginJson.version,
        url: args.input.url,
        web: newPluginJson.web ?? false,
        mobile: newPluginJson.mobile ?? false,
        server: newPluginJson.server ?? false,
      });

      const newSetting = await prisma.store.upsert({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.INSTALLED_PLUGINS, pluginSlug: FlowPluginSlug },
        },
        update: { value: installedPlugins },
        create: {
          key: StoreKeys.INSTALLED_PLUGINS,
          pluginSlug: FlowPluginSlug,
          value: installedPlugins,
          isSecret: false,
          isServerOnly: false,
        },
      });
      return await addCtInfo(newSetting.value as PluginInstallationInStore[]);
    },
  }),
);

builder.mutationField("uninstallPlugin", (t) =>
  t.fieldWithInput({
    type: [PluginInstallationType],
    description: "Uninstall a plugin.",
    input: {
      slug: t.input.string({ required: true }),
    },
    resolve: async (_, args) => {
      let installedPlugins = await getPluginsInStore();

      // uninstall the plugin on the server's file system
      await uninstallServerPlugin(args.input.slug);

      // remove old plugin installation if it exists
      installedPlugins = installedPlugins.filter((p) => p.slug !== args.input.slug);

      const newSetting = await prisma.store.upsert({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.INSTALLED_PLUGINS, pluginSlug: FlowPluginSlug },
        },
        update: { value: installedPlugins },
        create: {
          key: StoreKeys.INSTALLED_PLUGINS,
          pluginSlug: FlowPluginSlug,
          value: installedPlugins,
          isSecret: false,
          isServerOnly: false,
        },
      });
      return await addCtInfo(newSetting.value as PluginInstallationInStore[]);
    },
  }),
);
