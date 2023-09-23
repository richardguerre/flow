import { useQueryLoader, graphql, PreloadedQuery, usePreloadedQuery } from "@flowdev/relay";
import { IndexViewQuery } from "@flowdev/web/relay/__generated__/IndexViewQuery.graphql";
import { Days } from "../components/Days";
import { Lists } from "../components/Lists";
import { dayjs } from "@flowdev/web/dayjs";
import { useEffect, useRef } from "react";
import { useFlowNotitications } from "../useFlowNotitications";

const indexViewQuery = graphql`
  query IndexViewQuery($daysAfter: ID, $firstDays: Int, $dayIdInFocus: ID!) {
    ...Days_data @arguments(after: $daysAfter, first: $firstDays)
    ...Lists_data @arguments(dayIdInFocus: $dayIdInFocus)
  }
`;

export default () => {
  // today 4am
  const today = useRef(dayjs().startOf("day").add(4, "hours"));
  const { queryRef, loadQuery } = useQueryLoader<IndexViewQuery>(indexViewQuery, {
    daysAfter: today.current.subtract(7, "day").format("YYYY-MM-DD"),
    firstDays: 17, // 7 days before and 10 days after today
    dayIdInFocus: `Day_${today.current.format("YYYY-MM-DD")}`,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const threshold = today.current.startOf("day").add(1, "day");
      if (threshold.isAfter(dayjs())) return;
      today.current = dayjs().startOf("day");
      loadQuery(
        {
          daysAfter: today.current.subtract(7, "day").format("YYYY-MM-DD"),
          firstDays: 17, // 7 days before and 10 days after today
          dayIdInFocus: `Day_${today.current.format("YYYY-MM-DD")}`,
        },
        { fetchPolicy: "store-and-network" }
      );
    }, 1000 * 60 * 60); // every hour
    return () => clearInterval(interval);
  }, []);

  if (!queryRef) return null;
  return <IndexViewContent queryRef={queryRef} />;
};

type IndexViewProps = {
  queryRef: PreloadedQuery<IndexViewQuery>;
};

const IndexViewContent = (props: IndexViewProps) => {
  const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  useFlowNotitications(); // establish the `notifications` subscription and will update the Relay store with any updates that it receives. Done once the query is loaded so we don't ask too many things at once.

  return (
    <div className="flex h-screen w-[calc(100%-60px)]">
      <Days data={data} />
      <Lists data={data} />
    </div>
  );
};
