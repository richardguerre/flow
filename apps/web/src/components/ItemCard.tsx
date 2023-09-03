import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { ItemCard_item$key } from "@flowdev/web/relay/__generated__/ItemCard_item.graphql";
import { ItemCardDetails_item$key } from "@flowdev/web/relay/__generated__/ItemCardDetails_item.graphql";
import { ItemCardActions_item$key } from "@flowdev/web/relay/__generated__/ItemCardActions_item.graphql";
import { DurationBadge } from "./Badges";
import { ItemTitle } from "./ItemTitle";
import { BsArchive, BsCheckAll } from "@flowdev/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { pluralize } from "../utils";
import { ItemCardUpdateItemMutation } from "../relay/__generated__/ItemCardUpdateItemMutation.graphql";
import { ItemCardDismissFromInboxMutation } from "../relay/__generated__/ItemCardDismissFromInboxMutation.graphql";

type ItemCardProps = {
  item: ItemCard_item$key;
};

export const ItemCard = (props: ItemCardProps) => {
  const item = useFragment(
    graphql`
      fragment ItemCard_item on Item {
        title
        durationInMinutes
        ...ItemTitle_item
        ...ItemCardDetails_item
        ...ItemCardActions_item
      }
    `,
    props.item
  );

  return (
    <div className="bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-lg p-3 shadow-sm hover:shadow-md">
      <ItemTitle item={item} />
      <ItemCardDetails item={item} />
      <ItemCardActions item={item} />
    </div>
  );
};

type ItemCardDetailsProps = {
  item: ItemCardDetails_item$key;
};

const ItemCardDetails = (props: ItemCardDetailsProps) => {
  const item = useFragment(
    graphql`
      fragment ItemCardDetails_item on Item {
        scheduledAt
        inboxPoints
        durationInMinutes
        pluginDatas {
          pluginSlug
          min
        }
        tasks {
          id
        }
      }
    `,
    props.item
  );

  return (
    <div className="flex items-center gap-2">
      {item.durationInMinutes && <DurationBadge durationInMinutes={item.durationInMinutes} />}
      {item.inboxPoints && (
        <Tooltip>
          <TooltipTrigger>
            <div className="bg-primary-100 text-primary-600 rounded px-1 py-0.5 text-sm">
              +{item.inboxPoints}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {item.inboxPoints} inbox {pluralize("point", item.inboxPoints)}
          </TooltipContent>
        </Tooltip>
      )}
      {!!item.tasks.length && (
        <Tooltip>
          <TooltipTrigger>
            <div className="bg-primary-100 text-primary-600 rounded px-1 py-0.5 text-sm">
              {item.tasks.length} tasks
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {item.tasks.length} {pluralize("task", item.tasks.length)} linked to this item
          </TooltipContent>
        </Tooltip>
      )}
      {item.scheduledAt && <div>{item.scheduledAt}</div>}
    </div>
  );
};

type ItemCardActionsProps = {
  item: ItemCardActions_item$key;
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
        <TooltipContent>Mark this item as done</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <button
            className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100"
            onClick={dismissFromInbox}
          >
            <BsArchive size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Archive this item.</TooltipContent>
      </Tooltip>
    </div>
  );
};
