import { useEffect } from "react";
import { OperationType } from "relay-runtime";
import {
  GraphQLTaggedNode,
  PreloadableConcreteRequest,
  PreloadedQuery,
  useQueryLoader as useRelayQueryLoader,
  UseQueryLoaderLoadQueryOptions,
} from "react-relay";

// unwrapped exports of react-relay
export {
  RelayEnvironmentProvider,
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
  useFragment,
  usePaginationFragment,
} from "react-relay";

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