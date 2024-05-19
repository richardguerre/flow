import { ConnectionHandler, graphql, useFragment, useSmartSubscription } from "@flowdev/relay";
import { ItemCard } from "./ItemCard";
import { ReactSortable } from "react-sortablejs";
import { useEffect, useState } from "react";
import { Button } from "@flowdev/ui/Button";
import { InboxListSubscription } from "../relay/__generated__/InboxListSubscription.graphql";
import { environment } from "../relay/environment";
import { InboxListItems_itemsConnection$key } from "../relay/__generated__/InboxListItems_itemsConnection.graphql";

type InboxListProps = {};

export const InboxList = (props: InboxListProps) => {
  const [itemsConnectionId, setItemsConnectionId] = useState<string | null>(null);
  const [count, setCount] = useState(0);

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
            disabled={!itemsConnectionId}
            onClick={() => {
              createVirtualItem({ itemsConnectionId: itemsConnectionId ?? "" });
              setCount(count + 1);
            }}
          >
            Add item
          </Button>
        </div>
      </div>
      <InboxListItems onItemsConnectionIdChange={setItemsConnectionId} count={count} />
    </div>
  );
};

const InboxListItems = (props: {
  onItemsConnectionIdChange: (id: string) => void;
  count: number;
}) => {
  const [data] = useSmartSubscription<InboxListSubscription>(graphql`
    subscription InboxListSubscription {
      items(
        where: {
          isRelevant: true
          inboxPoints: { gte: 1 }
          tasks: { none: { status: { equals: TODO } } }
        }
        orderBy: { inboxPoints: Desc }
      ) {
        ...InboxListItems_itemsConnection
      }
    }
  `);

  /**
   * This fragment subscribes to the Relay store for 2 reasons:
   * 1. It automatically updates after creating a virtual item.
   * 2. It automatically updates when a task is marked as done which changes the relevance of the item.
   */
  const itemsConnection = useFragment<InboxListItems_itemsConnection$key>(
    graphql`
      fragment InboxListItems_itemsConnection on QueryItemsConnection {
        __id
        edges {
          node {
            id
            isRelevant
            inboxPoints
            tasks {
              status
            }
            ...ItemCard_item
          }
        }
      }
    `,
    data?.items ?? null,
  );

  const items = structuredClone(
    // this filter matches the where clause in the subscription
    // it ensures that the correct items are shown after Relay store udpates
    itemsConnection?.edges
      .filter((edge) => {
        const passesBaseFilter = !!edge.node.isRelevant && (edge.node.inboxPoints ?? 0) > 0;
        const hasTodoTasks = edge.node.tasks.some((task) => task.status === "TODO");
        return passesBaseFilter && !hasTodoTasks;
      })
      .map((edge) => edge.node) ?? [],
  );

  useEffect(() => {
    if (itemsConnection?.__id) {
      props.onItemsConnectionIdChange(itemsConnection.__id);
    }
  }, [itemsConnection?.__id]);

  return (
    <ReactSortable
      list={items}
      setList={() => {}}
      group="shared"
      className="no-scrollbar flex h-full flex-col overflow-y-scroll px-4"
    >
      {items.map((item) => (
        <div id={item.id} key={item.id} className="pb-4">
          <ItemCard key={item.id} item={item} inInbox itemsConnectionId={itemsConnection?.__id} />
        </div>
      ))}
    </ReactSortable>
  );
};

export const createVirtualItem = (props: { itemsConnectionId: string }) => {
  const tempId = `Item_${Math.random()}`;
  environment.commitUpdate((store) => {
    const createdItem = store
      .create(tempId, "Item")
      .setValue(tempId, "id")
      .setValue(new Date().toISOString(), "createdAt")
      .setValue("", "title")
      .setValue(null, "durationInMinutes")
      .setValue(null, "scheduledAt")
      .setValue(null, "isAllDay")
      .setValue(1, "inboxPoints")
      .setValue(true, "isRelevant")
      .setValue(null, "list")
      .setValue(null, "color")
      .setLinkedRecords([], "tasks")
      .setLinkedRecords([], "pluginDatas");

    const itemsConnection = store.get(props.itemsConnectionId);
    if (!itemsConnection) return;
    const edge = ConnectionHandler.createEdge(
      store,
      itemsConnection,
      createdItem,
      "QueryItemsConnectionEdge",
    );
    ConnectionHandler.insertEdgeAfter(itemsConnection, edge);
  });
};

export const deleteVirtualItem = (props: { itemId: string; itemsConnectionId: string }) => {
  environment.commitUpdate((store) => {
    const connection = store.get(props.itemsConnectionId);
    if (!connection) return;
    ConnectionHandler.deleteNode(connection, props.itemId);
  });
};
