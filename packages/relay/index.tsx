import { useEffect, useMemo, useState } from "react";
import {
  OperationType,
  type MutationParameters,
  type MutationConfig,
  type GraphQLSubscriptionConfig,
  type SelectorStoreUpdater,
  type StoreUpdater,
  type PreloadableConcreteRequest,
  type VariablesOf,
  type FetchPolicy,
  type CacheConfig,
  type RenderPolicy,
} from "relay-runtime";
import {
  GraphQLTaggedNode,
  PreloadedQuery,
  useLazyLoadQuery,
  useQueryLoader as useRelayQueryLoader,
  UseQueryLoaderLoadQueryOptions,
  useMutation as useRelayMutation,
  fetchQuery as relayFetchQuery,
  type UseMutationConfig,
  commitMutation as relayCommitMutation,
  Environment,
  useSubscription as useRelaySubscription,
  useRelayEnvironment,
} from "react-relay";

// peer dependency imports
import { toast } from "@flowdev/ui/Toast";

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
  ConnectionHandler,
  useClientQuery,
} from "react-relay";
export { type RecordSourceSelectorProxy, type SelectorStoreUpdater } from "relay-runtime";

export { useLazyLoadQuery };

// ----------------- wrapped exports of react-relay -----------------

export function useConditionalLazyLoadQuery<TQuery extends OperationType>(
  gqlQuery: GraphQLTaggedNode,
  variables: VariablesOf<TQuery>,
  condition: boolean,
  options?: {
    fetchKey?: string | number | undefined;
    fetchPolicy?: FetchPolicy | undefined;
    networkCacheConfig?: CacheConfig | undefined;
    UNSTABLE_renderPolicy?: RenderPolicy | undefined;
  },
): TQuery["response"] | null {
  let data: TQuery["response"] = null;
  if (condition) {
    data = useLazyLoadQuery(gqlQuery, variables, options);
  }
  return data;
}

export function useQueryLoader<TQuery extends OperationType>(
  preloadableRequest: GraphQLTaggedNode | PreloadableConcreteRequest<TQuery>,
  variables?: TQuery["variables"],
  loadQueryOptions?: UseQueryLoaderLoadQueryOptions,
  initialQueryReference?: PreloadedQuery<TQuery> | null,
) {
  const [queryRef, loadQuery, disposeQuery] = useRelayQueryLoader(
    preloadableRequest,
    initialQueryReference,
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

const handleMutationError =
  <TMutation extends MutationParameters>(
    mutationConfig: UseMutationConfigParams<TMutation> | MutationConfigParams<TMutation>,
    extra: {
      environment: Environment;
    },
  ) =>
  (error: Error) => {
    console.log("mutation.onError error:", error);
    if (mutationConfig.onError) {
      mutationConfig.onError(error);
    } else {
      toast.error(error.message);
    }
    if (mutationConfig.optimistic?.onError) {
      extra.environment.commitUpdate(mutationConfig.optimistic.onError);
    }
  };

const getMessageFromErrors = (errors: readonly any[]) => {
  const errorsSet = new Set(errors.map((e) => e.extensions?.userFriendlyMessage ?? e.message));
  return Array.from(errorsSet).join("\n");
};

type ExtraMutationConfig<TMutation extends MutationParameters> = {
  /** Internal optimistic updater logic that doesn't automatically roll back before applying `updater`.
   *
   * @summary when using `optimisticUpdater`, the store updates are automatically rolled back before applying the `updater` function. This is not always the desired behavior. For example, it made the NewTaskCard optimisticUpdater not work as expected as the task was deleted and re-added to the store which would cause the task to lose its id and cause render issues.
   */
  optimistic?: {
    updater: StoreUpdater;
    onSuccess?: SelectorStoreUpdater<TMutation["response"]>;
    onError?: StoreUpdater;
  };
};
type UseMutationConfigParams<TMutation extends MutationParameters> = UseMutationConfig<TMutation> &
  ExtraMutationConfig<TMutation>;

export function useMutation<TMutation extends MutationParameters>(mutation: GraphQLTaggedNode) {
  const [mutate, $loading] = useRelayMutation(mutation);
  const [loading, setLoading] = useState(false);
  const environment = useRelayEnvironment();

  const newMutate = (mutationConfig: UseMutationConfigParams<TMutation> & MutationOpts) => {
    if (mutationConfig.optimistic?.updater) {
      environment.commitUpdate(mutationConfig.optimistic.updater);
    }
    if (mutationConfig.minimumWait) {
      setLoading(true);
      setTimeout(() => setLoading(false), mutationConfig.minimumWait);
    }
    return mutate({
      ...mutationConfig,
      onError: handleMutationError(mutationConfig, { environment }),
      onCompleted: (data, errors) => {
        // theoretically, there should never be `errors` in onCompleted since payload errors are re-thrown and handled in onError, so this is just a safety check
        if (errors) {
          console.log("useMutation.onCompleted errors:", errors);
          handleMutationError(mutationConfig, { environment })(
            new Error(getMessageFromErrors(errors), { cause: errors }),
          );
          return;
        }
        mutationConfig.onCompleted?.(data, null);
      },
      updater: (store, data) => {
        if (mutationConfig.optimistic?.onSuccess) {
          mutationConfig.optimistic.onSuccess(store, data);
        }
        return mutationConfig.updater?.(store, data);
      },
    });
  };

  return [newMutate, $loading || loading] as const;
}

export function useMutationPromise<TMutation extends MutationParameters>(
  mutation: GraphQLTaggedNode,
) {
  const [mutate, ...rest] = useMutation(mutation);

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

  return [newMutate, ...rest] as const;
}

export const fetchQuery = relayFetchQuery;

type MutationConfigParams<TMutation extends MutationParameters> = MutationConfig<TMutation> &
  ExtraMutationConfig<TMutation>;

// TODO: add this MutationOpts to other functions and hooks
export type MutationOpts = {
  /** The minimum amount of time to wait for the mutation to resolve. This is a UX trick to prevent the user from seeing a flash or not seeing any action when clicking a button. */
  minimumWait?: number;
};

export const commitMutation = relayCommitMutation;
export const commitMutationPromise = async <
  TOperation extends MutationParameters = MutationParameters,
>(
  environemnt: Environment,
  config: MutationConfigParams<TOperation> & MutationOpts,
) => {
  const promise = new Promise<TOperation["response"]>((resolve, reject) => {
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
  const [res] = await Promise.all([promise, config.minimumWait ? wait(config.minimumWait) : null]);
  return res;
};

/**
 * Wrapper around Relay's useSubscription hook so that it can be used like useQueryLoader (where the GraphQLTaggedNode is the first argument and the variables are the second argument)
 */
export const useSubscription = <TSubscription extends OperationType>(
  subscription: GraphQLTaggedNode,
  variables: TSubscription["variables"] = {},
  $config?: Omit<GraphQLSubscriptionConfig<TSubscription>, "subscription" | "variables">,
) => {
  const config = useMemo(() => {
    return {
      ...$config,
      subscription,
      variables,
    };
  }, [JSON.stringify({ variables, $config })]);
  useRelaySubscription(config);
};

/**
 * Wrapper around `useSubscription` to be used with "smart" subscriptions from the server.
 *
 * Smart subscriptions are ones that first return initial data from the resolver and then update the data as the subscription updates. It's like doing a query and then subscribing to the query.
 *
 * Named after the @pothos/plugin-smart-subscription package in the server. (thanks @ishmam-mahmud for not overthinking the name 😄)
 */
export const useSmartSubscription = <TSubscription extends OperationType>(
  subscription: GraphQLTaggedNode,
  variables: TSubscription["variables"] = {},
  $config?: Omit<GraphQLSubscriptionConfig<TSubscription>, "subscription" | "variables">,
) => {
  const [data, setData] = useState<TSubscription["response"] | null>(null);
  const config = useMemo(() => {
    return {
      ...$config,
      subscription,
      variables,
      onNext: (response: TSubscription["response"]) => {
        setData(response);
        $config?.onNext?.(response);
      },
    };
  }, [JSON.stringify({ variables, $config })]);
  useRelaySubscription(config);
  return [data] as const;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
