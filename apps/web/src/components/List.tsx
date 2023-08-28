import { Suspense, useEffect, useMemo } from "react";
import {
  graphql,
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
} from "@flowdev/relay";
import { ListQuery } from "@flowdev/web/relay/__generated__/ListQuery.graphql";
import { ListItems_list$key } from "@flowdev/web/relay/__generated__/ListItems_list.graphql";
import { ItemCard } from "./ItemCard";
import { ReactSortable } from "react-sortablejs";

const listQuery = graphql`
  query ListQuery($listId: ID!) {
    list: node(id: $listId) {
      ... on List {
        name
        ...ListItems_list
      }
    }
  }
`;

type ListProps = {
  listId: string;
};

export const List = (props: ListProps) => {
  const { queryRef, loadQuery } = useQueryLoader<ListQuery>(
    listQuery,
    { listId: props.listId },
    { fetchPolicy: "store-and-network" }
  );

  useEffect(() => {
    loadQuery({ listId: props.listId });
  }, [props.listId]);

  if (!queryRef) return null;
  return (
    <Suspense fallback={<ListLoading />}>
      <ListContent queryRef={queryRef} />
    </Suspense>
  );
};

const ListLoading = () => {
  return (
    <div className="bg-background-100 flex h-full flex-col">
      <div className="p-3 text-xl font-semibold">Loading list...</div>
      <div className="no-scrollbar h-full flex-1 overflow-y-scroll px-4">
        {/* Skeleton divs */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-background-200 mb-4 h-24 w-full animate-pulse rounded-lg shadow-sm"
          />
        ))}
      </div>
    </div>
  );
};

type ListContentProps = {
  queryRef: PreloadedQuery<ListQuery>;
};

const ListContent = (props: ListContentProps) => {
  const data = usePreloadedQuery(listQuery, props.queryRef);

  if (!data.list) {
    return <div>No list found. Try refreshing the page or toggling to another list and back.</div>;
  }

  return (
    <div className="bg-background-100 flex h-full flex-col">
      <div className="p-3 text-xl font-semibold">{data.list.name}</div>
      <ListItems list={data.list} />
    </div>
  );
};

type ListItemsProps = {
  list: ListItems_list$key;
};

const ListItems = (props: ListItemsProps) => {
  const { data } = usePaginationFragment(
    graphql`
      fragment ListItems_list on List
      @refetchable(queryName: "ListItemsPaginationQuery")
      @argumentDefinitions(first: { type: "Int" }, after: { type: "ID" }) {
        name
        items(first: $first, after: $after, where: { isRelevant: true })
          @connection(key: "ListItems_items") {
          edges {
            cursor
            node {
              id
              title
              ...ItemCard_item
            }
          }
        }
      }
    `,
    props.list
  );
  const itemNodes = useMemo(
    () => structuredClone(data.items.edges.map((edge) => edge.node)),
    [data.items.edges]
  );

  return (
    <ReactSortable
      list={itemNodes}
      setList={() => {}}
      group="shared"
      className="no-scrollbar h-full flex-1 overflow-y-scroll px-4"
    >
      {data.items.edges.map((edge) => (
        <div id={edge.node.id} key={edge.node.id} className="pb-4">
          <ItemCard item={edge.node} />
        </div>
      ))}
    </ReactSortable>
  );
};
