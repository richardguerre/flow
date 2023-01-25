import { FC } from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "@flowdev/relay";
import { IndexViewQuery } from "@flowdev/web/relay/__generated__/IndexViewQuery.graphql";
import { DayColumnGroup } from "@flowdev/web/components/DayColumnGroup";
import { ListGroup } from "@flowdev/web/components/ListGroup";

export const indexViewQuery = graphql`
  query IndexViewQuery($daysAfter: ID, $firstDays: Int) {
    ...DayColumnGroup_data @arguments(after: $daysAfter, first: $firstDays)
    ...ListGroup_data
  }
`;

type IndexViewProps = {
  queryRef: PreloadedQuery<IndexViewQuery>;
};

export const IndexView: FC<IndexViewProps> = (props) => {
  const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  return (
    <div className="h-screen w-screen relative">
      <DayColumnGroup data={data} />
      <div className="top-0 right-0 absolute">
        <ListGroup data={data} />
      </div>
    </div>
  );
};
