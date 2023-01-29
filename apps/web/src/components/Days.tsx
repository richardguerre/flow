import { FC } from "react";
import { graphql, usePaginationFragment } from "@flowdev/relay";
import { Days_data$key } from "@flowdev/web/relay/__generated__/Days_data.graphql";
import { Day } from "./Day";

type DaysProps = {
  data: Days_data$key;
};

export const Days: FC<DaysProps> = (props) => {
  const { data, loadPrevious, loadNext } = usePaginationFragment(
    graphql`
      fragment Days_data on Query
      @refetchable(queryName: "DaysPaginationQuery")
      @argumentDefinitions(
        before: { type: "ID" }
        first: { type: "Int" }
        after: { type: "ID" }
        last: { type: "Int" }
      ) {
        days(before: $before, first: $first, after: $after, last: $last)
          @connection(key: "Days_days") {
          edges {
            cursor
            node {
              ...Day_day
            }
          }
        }
      }
    `,
    props.data
  );

  return (
    <div className="flex h-full overflow-scroll">
      {data.days.edges.map((edge) => (
        <div key={edge.cursor} className="flex-1">
          <Day day={edge.node} />
        </div>
      ))}
    </div>
  );
};
