import { graphql, useRefetchableFragment } from "@flowdev/relay";
import { InboxList_data$key } from "@flowdev/web/relay/__generated__/InboxList_data.graphql";
import { ItemCard } from "./ItemCard";
import { ReactSortable } from "react-sortablejs";
import { useMemo, useState } from "react";
import { Button } from "@flowdev/ui/Button";
import { NewItemCard } from "./NewItemCard";
import { dayjs } from "../dayjs";

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
              ...InboxListItemToBeInList_item @relay(mask: false)
              ...ItemCard_item
            }
          }
        }
      }
    `,
    props.data
  );
  const items = useMemo(
    () =>
      structuredClone(
        data.items.edges
          .map((edge) => edge.node)
          .filter((node) => {
            const passesBaseFilter = !!node.isRelevant && (node.inboxPoints ?? 0) > 0;
            const today = dayjs();
            const hasTaskCreatedToday = node.tasks.find((task) =>
              dayjs(task.createdAt).isSame(today, "day")
            );
            return passesBaseFilter && !hasTaskCreatedToday;
          })
      ),
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
        list={items}
        setList={() => {}}
        group="shared"
        className="no-scrollbar flex h-full flex-col overflow-y-scroll px-4"
      >
        {items.map((item) => (
          <div id={item.id} key={item.id} className="pb-4">
            <ItemCard key={item.id} item={item} inInbox />
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

graphql`
  fragment InboxListItemToBeInList_item on Item {
    id
    isRelevant
    inboxPoints
    tasks {
      createdAt
    }
  }
`;
