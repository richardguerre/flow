import {
  MutationOpts,
  commitMutationPromise,
  fetchQuery,
  graphql,
  useLazyLoadQuery,
} from "@flowdev/relay";
import { environment } from "@flowdev/web/relay/environment";
import { pluginOperationQuery } from "@flowdev/web/relay/__gen__/pluginOperationQuery.graphql";
import { pluginOperationMutation } from "@flowdev/web/relay/__gen__/pluginOperationMutation.graphql";
import { pluginOperationRenderTemplateQuery } from "@flowdev/web/relay/__gen__/pluginOperationRenderTemplateQuery.graphql";
import { useState } from "react";
import { type GraphQLError } from "graphql";

const queryDoc = graphql`
  query pluginOperationQuery($input: QueryPluginOperationInput!) {
    pluginOperation(input: $input) {
      id
      data
    }
  }
`;

const mutation =
  (pluginSlug: string) =>
  async <T extends JsonValue>(
    params: PluginOperationParams,
    opts?: MutationOpts & { throwOnError?: boolean },
  ): Promise<PluginOperationsReturn<T>> => {
    try {
      const mutation = await commitMutationPromise<pluginOperationMutation>(environment, {
        mutation: graphql`
          mutation pluginOperationMutation($input: MutationPluginOperationInput!) {
            pluginOperation(input: $input) {
              id
              data
            }
          }
        `,
        variables: {
          input: {
            pluginSlug,
            operationName: params.operationName,
            data: params.input ?? {},
          },
        },
        minimumWait: opts?.minimumWait,
        onError: (err) => {
          throw err;
        },
      });

      if (!mutation?.pluginOperation) return null;
      return {
        id: mutation.pluginOperation.id,
        data: mutation.pluginOperation.data as T,
      };
    } catch (e) {
      console.error(e);
      if (opts?.throwOnError) {
        throw e;
      }
      return null;
    }
  };

export const getPluginOperationUtils = (pluginSlug: string) => ({
  /**
   * Query the plugin's server API.
   * This is useful for fetching data from the plugin's server API, but don't need to update when the data changes.
   *
   * If you need it to update when the data changes, use `useLazyPluginQuery` instead.
   *
   * If you need to mutate data, use `mutation` instead.
   */
  query: async <T extends JsonValue>(
    params: PluginOperationParams,
  ): Promise<PluginOperationsReturn<T>> => {
    try {
      const query = await fetchQuery<pluginOperationQuery>(environment, queryDoc, {
        input: {
          pluginSlug,
          operationName: params.operationName,
          data: params.input ?? {},
        },
      }).toPromise();

      if (!query?.pluginOperation) return null;
      return {
        id: query.pluginOperation.id,
        data: query.pluginOperation.data as T,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  /**
   * Query the plugin's server API and allow it to update when the data changes.
   * Requires the component to be wrapped in a <React.Suspense> component.
   * This is a wrapper around operations.query using Relay's [useLazyLoadQuery](https://relay.dev/docs/api-reference/use-lazy-load-query/)
   * which is useful for fetching data from the plugin's server API and it automatically updates when a mutation changes the data.
   *
   * If you don't need it to update when the data changes, use `query` instead.
   *
   * If you need to mutate data, use `mutation` instead.
   */
  useLazyQuery: <T extends JsonValue>(params: PluginOperationParams): PluginOperationsReturn<T> => {
    const res = useLazyLoadQuery<pluginOperationQuery>(queryDoc, {
      input: {
        pluginSlug,
        operationName: params.operationName,
        data: params.input ?? {},
      },
    });
    if (!res.pluginOperation) return null;
    return {
      id: res.pluginOperation.id,
      data: res.pluginOperation.data as T,
    };
  },
  /**
   * Mutate the plugin's server API.
   * This is useful for creating, updating, or deleting data from the plugin's server API.
   * If a mutation returns data with the same ID as a query, the query will be updated.
   *
   * If you need to fetch data, use `query` instead.
   */
  mutation: mutation(pluginSlug),
  useMutation: <TInput extends JsonValue, TData extends JsonValue = {}>(
    operationName: string,
    opts?: MutationOpts & { throwOnError?: boolean },
  ) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<GraphQLError | null>(null);

    return [
      async (input?: TInput) => {
        setLoading(true);
        const res = await mutation(pluginSlug)(
          { operationName, input },
          { ...opts, throwOnError: true },
        ).catch((e) => {
          if (opts?.throwOnError) throw e;
          setError(e);
        });
        setLoading(false);
        return res as PluginOperationsReturn<TData>;
      },
      loading,
      error,
    ] as const;
  },
});

type PluginOperationParams = {
  operationName: string;
  input?: JsonValue;
};

type PluginOperationsReturn<T extends JsonValue = JsonValue> = {
  readonly data: T | null;
  readonly id: string;
} | null;

const renderTemplateQuery = graphql`
  query pluginOperationRenderTemplateQuery($input: QueryRenderTemplateInput!) {
    renderTemplate(input: $input)
  }
`;

export const renderTemplate = async (template: string, data: Record<string, any>) => {
  const query = await fetchQuery<pluginOperationRenderTemplateQuery>(
    environment,
    renderTemplateQuery,
    { input: { template, data } },
  ).toPromise();
  return query?.renderTemplate ?? "";
};

export const useRenderTemplate = async (template: string, data: Record<string, any>) => {
  const res = useLazyLoadQuery<pluginOperationRenderTemplateQuery>(renderTemplateQuery, {
    input: { template, data },
  });
  return res.renderTemplate ?? "";
};
