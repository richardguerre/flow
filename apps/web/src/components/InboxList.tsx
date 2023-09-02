import { graphql, useRefetchableFragment } from "@flowdev/relay";
import { InboxList_data$key } from "@flowdev/web/relay/__generated__/InboxList_data.graphql";
import { ItemCard } from "./ItemCard";
import { ReactSortable } from "react-sortablejs";
import { useMemo, useState } from "react";
import { Button } from "@flowdev/ui/Button";
import { NewItemCard } from "./NewItemCard";

type InboxListProps = {
  data: InboxList_data$key;
};

export const InboxList = (props: InboxListProps) => {
  const [showNewTaskCard, setShowNewTaskCard] = useState(false);
  const [data] = useRefetchableFragment(
    graphql`
      fragment InboxList_data on Query @refetchable(queryName: "InboxListRefetchQuery") {
        items(where: { isRelevant: true, minInboxPoints: 1 }, orderBy: inboxPoints_DESC) {
          __id
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
    <div className="bg-background-100 flex h-full flex-col gap-4 pt-3">
      <div className="flex flex-col gap-2 px-4">
        <div className="text-xl font-semibold">Inbox</div>
        <div className="text-foreground-700">
          Quickly add items to your inbox so you can triage them later.
        </div>
        <div className="flex flex-col gap-4">
          <Button
            secondary
            sm
            className="bg-background-300/50 text-foreground-900 hover:bg-background-300/70 active:bg-background-300/100 w-full"
            onClick={() => setShowNewTaskCard(true)}
          >
            Add item
          </Button>
          {showNewTaskCard && (
            <NewItemCard
              itemsConnectionId={data.items.__id}
              onSave={() => setShowNewTaskCard(false)}
              onCancel={() => setShowNewTaskCard(false)}
            />
          )}
        </div>
      </div>
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
