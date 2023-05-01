import { useEffect } from "react";
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
  return <ListContent queryRef={queryRef} />;
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
    <div className="flex items-center space-x-2">
      <div className="text-sm">{data.list.name}</div>
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
              title
              ...ItemCard_item
            }
          }
        }
      }
    `,
    props.list
  );

  return (
    <div className="flex-1">
      {data.items.edges.map((edge) => (
        <ItemCard key={edge.cursor} item={edge.node} />
      ))}
    </div>
  );
};
