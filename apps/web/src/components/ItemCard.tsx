import {
  ConnectionHandler,
  SelectorStoreUpdater,
  graphql,
  useFragment,
  useMutation,
} from "@flowdev/relay";
import { ItemCard_item$key } from "@flowdev/web/relay/__gen__/ItemCard_item.graphql";
import { ItemCardActions_item$key } from "@flowdev/web/relay/__gen__/ItemCardActions_item.graphql";
import { ItemTitle } from "./ItemTitle";
import { BsArchive, BsCheckAll } from "@flowdev/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { ItemCardUpdateItemMutation } from "../relay/__gen__/ItemCardUpdateItemMutation.graphql";
import { ItemCardDismissFromInboxMutation } from "../relay/__gen__/ItemCardDismissFromInboxMutation.graphql";
import { RenderItemCardDetails } from "./RenderItemCardDetails";
import { RenderItemCardActions } from "./RenderItemCardActions";
import { useEffect, useRef } from "react";
import { isTempItemId } from "./InboxList";
import { ItemCardContextMenu_item$key } from "../relay/__gen__/ItemCardContextMenu_item.graphql";
import { ItemCardDeleteItemMutation } from "../relay/__gen__/ItemCardDeleteItemMutation.graphql";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@flowdev/ui/ContextMenu";

type ItemCardProps = {
  item: ItemCard_item$key;
  inInbox?: boolean;
  itemsConnectionId?: string;
};

export const ItemCard = (props: ItemCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const item = useFragment(
    graphql`
      fragment ItemCard_item on Item {
        id
        title
        durationInMinutes
        ...ItemTitle_item
        ...RenderItemCardDetails_item
        ...ItemCardActions_item
        ...OnCreateTaskItemRecordToCreateTaskFrom_item # used to create tasks from items
        ...ItemCardContextMenu_item
      }
    `,
    props.item,
  );

  useEffect(() => {
    isTempItemId(item.id) && ref.current?.scrollIntoView({ block: "end" });
  }, [item.id]);

  return (
    <ItemCardContextMenu item={item} itemsConnectionId={props.itemsConnectionId}>
      <div
        id={item.id}
        className="bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-lg p-3 shadow-sm hover:shadow-md"
        ref={ref}
      >
        <ItemTitle item={item} itemsConnectionId={props.itemsConnectionId} />
        <RenderItemCardDetails item={item} inInbox={props.inInbox} />
        <ItemCardActions item={item} inInbox={props.inInbox} />
      </div>
    </ItemCardContextMenu>
  );
};

const ItemCardContextMenu = (props: {
  item: ItemCardContextMenu_item$key;
  itemsConnectionId?: string;
  children: React.ReactNode;
}) => {
  const item = useFragment(
    graphql`
      fragment ItemCardContextMenu_item on Item {
        id
      }
    `,
    props.item,
  );

  const [$deleteItem] = useMutation<ItemCardDeleteItemMutation>(graphql`
    mutation ItemCardDeleteItemMutation($id: ID!) {
      deleteItem(id: $id) {
        id
      }
    }
  `);

  const deleteItem = () => {
    $deleteItem({
      variables: { id: item.id },
      optimisticResponse: { deleteItem: { id: item.id } },
      optimisticUpdater: deleteItemUpdater({ itemsConnectionId: props.itemsConnectionId }),
      updater: deleteItemUpdater({ itemsConnectionId: props.itemsConnectionId }),
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={deleteItem}>Delete item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

type ItemCardActionsProps = {
  item: ItemCardActions_item$key;
  inInbox?: boolean;
};

const ItemCardActions = (props: ItemCardActionsProps) => {
  const item = useFragment(
    graphql`
      fragment ItemCardActions_item on Item {
        id
        pluginDatas {
          pluginSlug
          min
        }
        ...RenderItemCardActions_item
      }
    `,
    props.item,
  );

  const [updateItem] = useMutation<ItemCardUpdateItemMutation>(graphql`
    mutation ItemCardUpdateItemMutation($input: MutationUpdateItemInput!) {
      updateItem(input: $input) {
        id
        isRelevant
        ...ItemCard_item
      }
    }
  `);

  const markAsDone = () => {
    updateItem({
      variables: { input: { id: item.id, isRelevant: false } },
      optimisticUpdater: (store) => {
        const itemRecord = store.get(item.id);
        if (itemRecord) {
          itemRecord.setValue(false, "isRelevant");
        }
      },
    });
  };

  const [$dismissFromInbox] = useMutation<ItemCardDismissFromInboxMutation>(graphql`
    mutation ItemCardDismissFromInboxMutation($input: MutationDismissItemFromInboxInput!) {
      dismissItemFromInbox(input: $input) {
        id
        inboxPoints
        ...ItemCard_item
      }
    }
  `);

  const dismissFromInbox = () => {
    $dismissFromInbox({
      variables: { input: { id: item.id } },
      optimisticUpdater: (store) => {
        const itemRecord = store.get(item.id);
        if (itemRecord) {
          itemRecord.setValue(null, "inboxPoints");
        }
      },
    });
  };

  return (
    <div className="flex gap-1">
      <Tooltip>
        <TooltipTrigger>
          <button
            className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100"
            onClick={markAsDone}
          >
            <BsCheckAll />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Mark this item as done</TooltipContent>
      </Tooltip>
      {props.inInbox && (
        <Tooltip>
          <TooltipTrigger>
            <button
              className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100"
              onClick={dismissFromInbox}
            >
              <BsArchive size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Archive this item.</TooltipContent>
        </Tooltip>
      )}
      <RenderItemCardActions item={item} />
    </div>
  );
};

const deleteItemUpdater: (props: {
  itemsConnectionId?: string;
}) => SelectorStoreUpdater<ItemCardDeleteItemMutation["response"]> = (props) => (store, data) => {
  if (!data?.deleteItem || !props.itemsConnectionId) return;
  const connection = store.get(props.itemsConnectionId);
  if (!connection) return;
  ConnectionHandler.deleteNode(connection, data.deleteItem.id);
};
