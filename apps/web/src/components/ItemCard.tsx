import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { ItemCard_item$key } from "@flowdev/web/relay/__generated__/ItemCard_item.graphql";
import { ItemCardActions_item$key } from "@flowdev/web/relay/__generated__/ItemCardActions_item.graphql";
import { ItemTitle } from "./ItemTitle";
import { BsArchive, BsCheckAll } from "@flowdev/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { ItemCardUpdateItemMutation } from "../relay/__generated__/ItemCardUpdateItemMutation.graphql";
import { ItemCardDismissFromInboxMutation } from "../relay/__generated__/ItemCardDismissFromInboxMutation.graphql";
import { RenderItemCardDetails } from "./RenderItemCardDetails";
import { RenderItemCardActions } from "./RenderItemCardActions";

type ItemCardProps = {
  item: ItemCard_item$key;
  inInbox?: boolean;
};

export const ItemCard = (props: ItemCardProps) => {
  const item = useFragment(
    graphql`
      fragment ItemCard_item on Item {
        title
        durationInMinutes
        ...ItemTitle_item
        ...RenderItemCardDetails_item
        ...ItemCardActions_item
        ...OnCreateTaskItemRecordToCreateTaskFrom_item # used to create tasks from items
      }
    `,
    props.item
  );

  return (
    <div className="bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-lg p-3 shadow-sm hover:shadow-md">
      <ItemTitle item={item} />
      <RenderItemCardDetails item={item} inInbox={props.inInbox} />
      <ItemCardActions item={item} inInbox={props.inInbox} />
    </div>
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
    props.item
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

  const [_dismissFromInbox] = useMutation<ItemCardDismissFromInboxMutation>(graphql`
    mutation ItemCardDismissFromInboxMutation($input: MutationDismissItemFromInboxInput!) {
      dismissItemFromInbox(input: $input) {
        id
        inboxPoints
        ...ItemCard_item
      }
    }
  `);

  const dismissFromInbox = () => {
    _dismissFromInbox({
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
