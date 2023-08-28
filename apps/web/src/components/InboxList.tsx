import { graphql, useRefetchableFragment } from "@flowdev/relay";
import { InboxList_data$key } from "@flowdev/web/relay/__generated__/InboxList_data.graphql";
import { ItemCard } from "./ItemCard";
import { ReactSortable } from "react-sortablejs";
import { useMemo } from "react";

type InboxListProps = {
  data: InboxList_data$key;
};

export const InboxList = (props: InboxListProps) => {
  const [data] = useRefetchableFragment(
    graphql`
      fragment InboxList_data on Query @refetchable(queryName: "InboxListRefetchQuery") {
        items(where: { isRelevant: true, minInboxPoints: 1 }, orderBy: inboxPoints_DESC) {
          edges {
            node {
              id
              ...ItemCard_item
            }
          }
        }
      }
    `,
    props.data
  );
  const itemNodes = useMemo(
    () => structuredClone(data.items.edges.map((edge) => edge.node)),
    [data.items.edges]
  );

  return (
    <div className="bg-background-100 flex h-full flex-col">
      <div className="p-3 text-xl font-semibold">Inbox</div>
      <ReactSortable
        list={itemNodes}
        setList={() => {}}
        group="shared"
        className="no-scrollbar flex h-full flex-col overflow-y-scroll px-4"
      >
        {data.items.edges.map((edge) => (
          <div id={edge.node.id} key={edge.node.id} className="pb-4">
            <ItemCard key={edge.node.id} item={edge.node} />
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};
