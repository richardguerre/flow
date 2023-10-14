import { commitMutationPromise, fetchQuery, graphql, useLazyLoadQuery } from "@flowdev/relay";
import { environment } from "@flowdev/web/relay/environment";
import { pluginOperationQuery } from "@flowdev/web/relay/__generated__/pluginOperationQuery.graphql";
import { pluginOperationMutation } from "@flowdev/web/relay/__generated__/pluginOperationMutation.graphql";

const queryDoc = graphql`
  query pluginOperationQuery($id: ID!, $input: JSON!) {
    pluginOperation(id: $id, input: $input) {
      id
      data
    }
  }
`;

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
        id: `PluginOperation_${params.pluginSlug}_${params.operationName}`,
        input: params.input ?? {},
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
      id: `PluginOperation_${params.pluginSlug}_${params.operationName}`,
      input: params.input ?? {},
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
  mutation: async <T extends JsonValue>(
    params: PluginOperationParams,
  ): Promise<PluginOperationsReturn<T>> => {
    try {
      const mutation = await commitMutationPromise<pluginOperationMutation>(environment, {
        mutation: graphql`
          mutation pluginOperationMutation($id: ID!, $input: JSON!) {
            pluginOperation(id: $id, input: $input) {
              id
              data
            }
          }
        `,
        variables: {
          id: `PluginOperation_${params.pluginSlug}_${params.operationName}`,
          input: params.input ?? {},
        },
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
      return null;
    }
  },
});

type PluginOperationParams = {
  pluginSlug: string;
  operationName: string;
  input?: JsonValue;
};

type PluginOperationsReturn<T extends JsonValue = JsonValue> = {
  readonly data: T | null;
  readonly id: string;
} | null;
