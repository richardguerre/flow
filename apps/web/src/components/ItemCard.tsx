import { graphql, useFragment } from "@flowdev/relay";
import { FC } from "react";
import { ItemCard_item$key } from "@flowdev/web/relay/__generated__/ItemCard_item.graphql";
import { ItemCardDetails_item$key } from "@flowdev/web/relay/__generated__/ItemCardDetails_item.graphql";
import { ItemCardActions_item$key } from "@flowdev/web/relay/__generated__/ItemCardActions_item.graphql";
import { DurationBadge } from "./DurationBadge";

type ItemCardProps = {
  item: ItemCard_item$key;
};

export const ItemCard: FC<ItemCardProps> = (props) => {
  const item = useFragment(
    graphql`
      fragment ItemCard_item on Item {
        title
        durationInMinutes
        ...ItemCardDetails_item
        ...ItemCardActions_item
      }
    `,
    props.item
  );

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div>{item.title}</div>
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

const ItemCardDetails: FC<ItemCardDetailsProps> = (props) => {
  const item = useFragment(
    graphql`
      fragment ItemCardDetails_item on Item {
        scheduledAt
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

const ItemCardActions: FC<ItemCardActionsProps> = (props) => {
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
