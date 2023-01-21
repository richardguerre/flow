import { FC } from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "relay";
import { IndexViewQuery } from "@/relay/__generated__/IndexViewQuery.graphql";
import { DayColumnGroup } from "@/components/DayColumnGroup";

export const indexViewQuery = graphql`
  query IndexViewQuery($daysAfter: ID, $firstDays: Int) {
    ...DayColumnGroup_data @arguments(after: $daysAfter, first: $firstDays)
  }
`;

type IndexViewProps = {
  queryRef: PreloadedQuery<IndexViewQuery>;
};

export const IndexView: FC<IndexViewProps> = (props) => {
  const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  return <DayColumnGroup data={data} />;
};
