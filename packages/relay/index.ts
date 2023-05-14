import { useEffect } from "react";
import { OperationType, type MutationParameters } from "relay-runtime";
import {
  GraphQLTaggedNode,
  PreloadableConcreteRequest,
  PreloadedQuery,
  useQueryLoader as useRelayQueryLoader,
  UseQueryLoaderLoadQueryOptions,
  useMutation as useRelayMutation,
  fetchQuery as relayFetchQuery,
  type UseMutationConfig,
} from "react-relay";

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
} from "react-relay";
export { type RecordSourceSelectorProxy } from "relay-runtime";

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
          if (errors) {
            console.log("useMutation.onCompleted error:", errors);
            reject(errors);
            return;
          }
          resolve(response);
          mutationConfig.onCompleted?.(response, errors);
        },
        onError: (error) => {
          console.log("useMutation.onError error:", error);
          reject(error);
          mutationConfig.onError?.(error);
        },
      });
    });

  return [newMutate, ...rest];
}

export const fetchQuery = relayFetchQuery;
