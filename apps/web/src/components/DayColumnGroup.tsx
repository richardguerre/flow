import { FC } from "react";
import { graphql, usePaginationFragment } from "@flowdev/relay";
import { DayColumnGroup_data$key } from "@flowdev/web/relay/__generated__/DayColumnGroup_data.graphql";
import { DayColumn } from "./DayColumn";

type DayColumnGroupProps = {
  data: DayColumnGroup_data$key;
};

export const DayColumnGroup: FC<DayColumnGroupProps> = (props) => {
  const { data, loadPrevious, loadNext } = usePaginationFragment(
    graphql`
      fragment DayColumnGroup_data on Query
      @refetchable(queryName: "DayColumnGroupPaginationQuery")
      @argumentDefinitions(
        before: { type: "ID" }
        first: { type: "Int" }
        after: { type: "ID" }
        last: { type: "Int" }
      ) {
        days(before: $before, first: $first, after: $after, last: $last)
          @connection(key: "DayColumnGroup_days") {
          edges {
            cursor
            node {
              ...DayColumn_day
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
          <DayColumn day={edge.node} />
        </div>
      ))}
    </div>
  );
};
