/**
 * GraphQL API for plugins to interact with their backend.
 *
 * Using this GraphQL API over the REST API is recommended, as Relay will
 * cache the results of the GraphQL operations which provides better UX.
 */
import { GraphQLError } from "graphql";
import { getPlugins } from "../utils/getPlugins";
import { builder } from "./builder";
import { Prisma } from "@prisma/client";

type JsonValue = string | number | boolean | { [Key in string]?: JsonValue } | Array<JsonValue>;

type PluginOperation = {
  id: string;
  data: JsonValue | null;
};

export const PluginOperationType = builder.node(
  builder.objectRef<PluginOperation>("PluginOperation"),
  {
    id: { resolve: (op) => op.id },
    loadOne: async (id) => {
      const [pluginSlug, operationName] = id.split("_");
      if (!pluginSlug || !operationName) {
        throw new GraphQLError(
          `Invalid plugin operation id: PluginOperation_${id}. It should be in the format of PluginOperation_pluginSlug_operationName.`,
        );
      }
      return await loadOneWithInput(pluginSlug, operationName, {}); // fetching through the node field will not pass any input, see the description below
    },
    fields: (t) => ({
      data: t.field({ type: "JSON", resolve: (op) => op.data, nullable: true }),
    }),
    description: `A plugin operation similar to making a request to /api/plugin/:pluginSlug/:operation, but it can be cached by Relay.

This is the recommended way to interact with the plugin's from the web app.

If you want to do a GET-like request, you can do it through \`node\` field if there are no parameters to pass. For example:
\`\`\`graphql
query {
  node(id: "PluginOperation_pluginSlug_operationName") {
    ... on PluginOperation {
      id
      data
    }
  }
}
\`\`\`
Or you can do it through \`pluginOperation\` field if there are parameters to pass. For example:
\`\`\`graphql
query {
  pluginOperation(
    input: {
      pluginSlug: "pluginSlug",
      operationName: "operationName",
      data: { param1: "value1"}
    }
  ) {
    id
    data
  }
}
\`\`\`

If you want to do a POST-like request, you can do it through \`pluginOperation\` field in the Mutation type. For example:
\`\`\`graphql
mutation {
  pluginOperation(
    input: {
      pluginSlug: "pluginSlug",
      operationName: "operationName",
      data: { param1: "value1"}
    }
  ) {
    id
    data
  }
}

What's the difference between \`pluginOperation\` field in the Query type and the Mutation type?
- \`pluginOperation\` field in the Query type is used for GET-like requests and will get cached by Relay in the web app.
- \`pluginOperation\` field in the Mutation type is used for POST-like requests and will invalidate any cached data from the \`pluginOperation\` field in the Query type and Relay will automatically update it's store.
`,
  },
);

const loadOneWithInput = async (
  pluginSlug: string,
  operationName: string,
  input: Prisma.InputJsonValue,
) => {
  const plugins = await getPlugins();
  const plugin = plugins[pluginSlug];
  if (!plugin) {
    throw new GraphQLError(`Plugin ${pluginSlug} not found.`);
  }
  const operation = plugin.operations?.[operationName];
  if (!operation) {
    throw new GraphQLError(`Operation ${operationName} not found in plugin ${pluginSlug}.`);
  }
  try {
    const result = await operation(input);
    if (!result) return null;
    return {
      id: `${pluginSlug}_${result.operationName ?? operationName}`,
      data: result.data ?? null,
    };
  } catch (e: any) {
    if (e instanceof GraphQLError) throw e;
    if (e instanceof Error) {
      throw new GraphQLError(e.message);
    }
    throw new GraphQLError(JSON.stringify(e));
  }
};

builder.queryField("pluginOperation", (t) =>
  t.fieldWithInput({
    type: PluginOperationType,
    nullable: true,
    input: {
      pluginSlug: t.input.string({ required: true }),
      operationName: t.input.string({ required: true }),
      data: t.input.field({ type: "JSON", required: false }),
    },
    resolve: async (_, args) => {
      return await loadOneWithInput(
        args.input.pluginSlug,
        args.input.operationName,
        args.input.data ?? {},
      );
    },
  }),
);

builder.mutationField("pluginOperation", (t) =>
  t.fieldWithInput({
    type: PluginOperationType,
    nullable: true,
    input: {
      pluginSlug: t.input.string({ required: true }),
      operationName: t.input.string({ required: true }),
      data: t.input.field({ type: "JSON", required: false }),
    },
    resolve: async (_, args) => {
      return await loadOneWithInput(
        args.input.pluginSlug,
        args.input.operationName,
        args.input.data ?? {},
      );
    },
  }),
);
