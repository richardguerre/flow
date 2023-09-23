import { useEffect, useMemo, useState } from "react";
import {
  OperationType,
  type MutationParameters,
  type MutationConfig,
  type GraphQLSubscriptionConfig,
} from "relay-runtime";
import {
  GraphQLTaggedNode,
  PreloadableConcreteRequest,
  PreloadedQuery,
  useQueryLoader as useRelayQueryLoader,
  UseQueryLoaderLoadQueryOptions,
  useMutation as useRelayMutation,
  fetchQuery as relayFetchQuery,
  type UseMutationConfig,
  commitMutation as relayCommitMutation,
  Environment,
  useSubscription as useRelaySubscription,
} from "react-relay";

export type FlowPayloadError = {
  message: string;
  locations: {
    line: number;
    column: number;
  }[];
  path: string[];
  extensions?: {
    code: string;
  };
};

// unwrapped exports of react-relay
export {
  RelayEnvironmentProvider,
  graphql,
  type PreloadedQuery,
  usePreloadedQuery,
  useFragment,
  usePaginationFragment,
  useRefetchableFragment,
  useLazyLoadQuery,
  ConnectionHandler,
} from "react-relay";
export { type RecordSourceSelectorProxy, type SelectorStoreUpdater } from "relay-runtime";

// ----------------- wrapped exports of react-relay -----------------

export function useQueryLoader<TQuery extends OperationType>(
  preloadableRequest: GraphQLTaggedNode | PreloadableConcreteRequest<TQuery>,
  variables?: TQuery["variables"],
  loadQueryOptions?: UseQueryLoaderLoadQueryOptions,
  initialQueryReference?: PreloadedQuery<TQuery> | null
) {
  const [queryRef, loadQuery, disposeQuery] = useRelayQueryLoader(
    preloadableRequest,
    initialQueryReference
  );

  useEffect(() => {
    loadQuery(variables ?? {}, {
      fetchPolicy: "store-and-network",
      ...loadQueryOptions,
    });

    return () => {
      disposeQuery();
    };
  }, []);

  return { queryRef, loadQuery };
}

export const useMutation = useRelayMutation;
export function useMutationPromise<TMutation extends MutationParameters>(
  mutation: GraphQLTaggedNode
): [(config: UseMutationConfig<TMutation>) => Promise<TMutation["response"]>, boolean] {
  const [mutate, ...rest] = useRelayMutation(mutation);

  const newMutate = (mutationConfig: UseMutationConfig<TMutation>) =>
    new Promise<TMutation["response"]>((resolve, reject) => {
      mutate({
        ...mutationConfig,
        onCompleted: (response, errors) => {
          mutationConfig.onCompleted?.(response, errors);
          if (errors) {
            console.log("useMutation.onCompleted error:", errors);
            reject(errors);
            return;
          }
          resolve(response);
        },
        onError: (error) => {
          console.log("useMutation.onError error:", error);
          mutationConfig.onError?.(error);
          reject(error);
        },
      });
    });

  return [newMutate, ...rest];
}

export const fetchQuery = relayFetchQuery;

export const commitMutation = relayCommitMutation;
export const commitMutationPromise = async <
  TOperation extends MutationParameters = MutationParameters
>(
  environemnt: Environment,
  config: MutationConfig<TOperation>
) => {
  return new Promise<TOperation["response"]>((resolve, reject) => {
    commitMutation(environemnt, {
      ...config,
      onCompleted: (response, errors) => {
        config.onCompleted?.(response, errors);
        if (errors) {
          console.log("commitMutation.onCompleted errors:", errors);
          reject(errors);
          return;
        }
        resolve(response);
      },
      onError: (error) => {
        console.log("commitMutation.onError error:", error);
        config.onError?.(error);
        reject(error);
      },
    });
  });
};

/**
 * Wrapper around Relay's useSubscription hook so that it can be used like useQueryLoader (where the GraphQLTaggedNode is the first argument and the variables are the second argument)
 */
export const useSubscription = <TSubscription extends OperationType>(
  subscription: GraphQLTaggedNode,
  variables: TSubscription["variables"] = {},
  $config?: Omit<GraphQLSubscriptionConfig<TSubscription>, "subscription" | "variables">
) => {
  const config = useMemo(() => {
    return {
      ...$config,
      subscription,
      variables,
    };
  }, [subscription, variables, $config]);
  useRelaySubscription(config);
};

/**
 * Wrapper around useSubscription to be used with "smart" subscriptions from the server. Smart subscriptions are ones that first return initial data from the resolver and then update the data as the subscription updates.
 *
 * Named after the @pothos/plugin-smart-subscription package in the server. (thanks @ishmam-mahmud for thinking of the name)
 */
export const useSmartSubscription = <TSubscription extends OperationType>(
  subscription: GraphQLTaggedNode,
  variables: TSubscription["variables"] = {},
  config?: Omit<GraphQLSubscriptionConfig<TSubscription>, "subscription" | "variables">
) => {
  const [data, setData] = useState<TSubscription["response"] | null>(null);
  useRelaySubscription({
    ...config,
    subscription,
    variables,
    onNext: (response) => {
      setData(response);
      config?.onNext?.(response);
    },
  });
  return [data] as const;
};
