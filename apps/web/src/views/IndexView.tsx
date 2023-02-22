import { useQueryLoader, graphql, PreloadedQuery, usePreloadedQuery } from "@flowdev/relay";
import { IndexViewQuery } from "@flowdev/web/relay/__generated__/IndexViewQuery.graphql";
import { Days } from "../components/Days";
import { Lists } from "../components/Lists";
import dayjs from "dayjs";

const indexViewQuery = graphql`
  query IndexViewQuery($daysAfter: ID, $firstDays: Int, $dateInFocus: Date!, $dayIdInFocus: ID!) {
    ...Days_data @arguments(after: $daysAfter, first: $firstDays)
    ...Lists_data @arguments(dateInFocus: $dateInFocus, dayIdInFocus: $dayIdInFocus)
  }
`;

export default () => {
  const daysAfterDate = new Date();
  daysAfterDate.setDate(daysAfterDate.getDate() - 7);
  const daysAfter = daysAfterDate.toISOString().split("T")[0]; // converts to YYYY-MM-DD
  const today = dayjs().format("YYYY-MM-DD");
  const { queryRef } = useQueryLoader<IndexViewQuery>(indexViewQuery, {
    daysAfter,
    firstDays: 17, // 7 days before and 10 days after today
    dateInFocus: today,
    dayIdInFocus: `Day_${today}`,
  });
  if (!queryRef) return null;
  return <IndexViewContent queryRef={queryRef} />;
};

type IndexViewProps = {
  queryRef: PreloadedQuery<IndexViewQuery>;
};

const IndexViewContent = (props: IndexViewProps) => {
  const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  return (
    <div className="flex h-screen">
      <Days data={data} />
      <Lists data={data} />
    </div>
  );
};
