import { builder } from "./builder";
import { Plugin, PluginAuthor, PluginVersion, QueryPluginsConnection } from "./ct-graphql";

const ctGraphql = async <TVariables extends object, TRes extends object>(
  query: string,
  variables?: TVariables,
) => {
  const res = await fetch("https://flow-ct.onrender.com/graphql", {
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
