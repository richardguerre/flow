import { graphql, useSmartSubscription } from "@flowdev/relay";
import { ItemCard } from "./ItemCard";
import { ReactSortable } from "react-sortablejs";
import { useMemo, useState } from "react";
import { Button } from "@flowdev/ui/Button";
import { NewItemCard } from "./NewItemCard";
import { InboxListSubscription } from "../relay/__generated__/InboxListSubscription.graphql";

type InboxListProps = {};

export const InboxList = (props: InboxListProps) => {
  const [showNewTaskCard, setShowNewTaskCard] = useState(false);
  const [data] = useSmartSubscription<InboxListSubscription>(graphql`
    subscription InboxListSubscription {
      items(where: { isRelevant: true, inboxPoints: { gte: 1 } }, orderBy: { inboxPoints: Desc }) {
        __id
        edges {
          node {
            ...InboxListItemToBeInList_item @relay(mask: false)
            ...ItemCard_item
          }
        }
      }
    }
  `);

  const items = useMemo(
    () =>
      structuredClone(
        data?.items.edges
          .map((edge) => edge.node)
          .filter((node) => {
            const passesBaseFilter = !!node.isRelevant && (node.inboxPoints ?? 0) > 0;
            const hasTodoTasks = node.tasks.some((task) => task.status === "TODO");
            return passesBaseFilter && !hasTodoTasks;
          }) ?? []
      ),
    [data?.items.edges]
  );

  if (!data) return null; // TODO: loading state

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
      status
    }
  }
`;
