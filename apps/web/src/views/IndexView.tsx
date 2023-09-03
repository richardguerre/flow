import { useQueryLoader, graphql, PreloadedQuery, usePreloadedQuery } from "@flowdev/relay";
import { IndexViewQuery } from "@flowdev/web/relay/__generated__/IndexViewQuery.graphql";
import { Days } from "../components/Days";
import { Lists } from "../components/Lists";
import { dayjs } from "@flowdev/web/dayjs";
import { useEffect, useRef } from "react";

const indexViewQuery = graphql`
  query IndexViewQuery($daysAfter: ID, $firstDays: Int, $dateInFocus: Date!, $dayIdInFocus: ID!) {
    ...Days_data @arguments(after: $daysAfter, first: $firstDays)
    ...Lists_data @arguments(dateInFocus: $dateInFocus, dayIdInFocus: $dayIdInFocus)
  }
`;

export default () => {
  const today = useRef(dayjs());
  const { queryRef, loadQuery } = useQueryLoader<IndexViewQuery>(indexViewQuery, {
    daysAfter: today.current.subtract(7, "day").format("YYYY-MM-DD"),
    firstDays: 17, // 7 days before and 10 days after today
    dateInFocus: today.current.format("YYYY-MM-DD"),
    dayIdInFocus: `Day_${today.current.format("YYYY-MM-DD")}`,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const threshold = today.current.startOf("day").add(1, "day").add(4, "hours");
      if (threshold.isAfter(dayjs())) return;
      today.current = dayjs();
      loadQuery(
        {
          daysAfter: today.current.subtract(7, "day").format("YYYY-MM-DD"),
          firstDays: 17, // 7 days before and 10 days after today
          dateInFocus: today.current.format("YYYY-MM-DD"),
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
  return (
    <div className="flex h-screen w-[calc(100%-60px)]">
      <Days data={data} />
      <Lists data={data} />
    </div>
  );
};
