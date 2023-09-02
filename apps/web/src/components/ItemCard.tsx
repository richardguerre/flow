import { graphql, useFragment } from "@flowdev/relay";
import { ItemCard_item$key } from "@flowdev/web/relay/__generated__/ItemCard_item.graphql";
import { ItemCardDetails_item$key } from "@flowdev/web/relay/__generated__/ItemCardDetails_item.graphql";
import { ItemCardActions_item$key } from "@flowdev/web/relay/__generated__/ItemCardActions_item.graphql";
import { DurationBadge } from "./Badges";
import { ItemTitle } from "./ItemTitle";

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
      <div className="flex gap-1">
        <ItemTitle item={item} />
        {item.durationInMinutes && <DurationBadge durationInMinutes={item.durationInMinutes} />}
      </div>
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
        tasks {
          id
        }
      }
    `,
    props.item
  );

  return (
    <div>
      <div>{item.scheduledAt}</div>
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

  return <div>{item.id}</div>;
};
