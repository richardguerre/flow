import { DayCalendar_items$key } from "@flowdev/web/relay/__generated__/DayCalendar_items.graphql";
import { FC } from "react";
import { graphql, useFragment } from "@flowdev/relay";

type DayCalendarProps = {
  items: DayCalendar_items$key;
};

export const DayCalendar: FC<DayCalendarProps> = (props) => {
  const items = useFragment(
    graphql`
      fragment DayCalendar_items on Item @relay(plural: true) {
        title
        scheduledAt
      }
    `,
    props.items
  );

  return (
    <div className="space-y-2">
      {items.map((edge) => (
        <></>
      ))}
    </div>
  );
};
