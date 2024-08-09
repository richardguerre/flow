import { PreloadedQuery, graphql, usePreloadedQuery, useQueryLoader } from "@flowdev/relay";
import { dayjs } from "../dayjs";
import { useEffect, useRef } from "react";
import { Day } from "../components/Day";
import { IndexViewQuery } from "../relay/__generated__/IndexViewQuery.graphql";

export const START_HOUR = 4;
export const getStartOfToday = () => {
  const startHour = dayjs().startOf("day").add(START_HOUR, "hours");
  return dayjs().isBefore(startHour) ? startHour.subtract(1, "day") : startHour;
};

const indexViewQuery = graphql`
  query IndexViewQuery($afterDay: ID!) {
    days(after: $afterDay, first: 1) {
      edges {
        node {
          ...Day_day
        }
      }
    }
  }
`;

const IndexView = () => {
  const today = useRef(getStartOfToday());
  const { queryRef, loadQuery } = useQueryLoader<IndexViewQuery>(indexViewQuery, {
    afterDay: today.current.subtract(1, "day").format("YYYY-MM-DD"),
  });

  useEffect(() => {
    const interval = setInterval(
      () => {
        today.current = getStartOfToday();
        loadQuery(
          { afterDay: today.current.subtract(1, "day").format("YYYY-MM-DD") },
          { fetchPolicy: "store-and-network" },
        );
      },
      1000 * 60 * 60,
    ); // every hour
    return () => clearInterval(interval);
  }, []);

  if (!queryRef) return null;

  return <IndexViewContent queryRef={queryRef} />;
};

const IndexViewContent = (props: { queryRef: PreloadedQuery<IndexViewQuery> }) => {
  const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  const day = data.days.edges[0].node;

  if (!day) {
    return <div>Something went wrong loading today's plan.</div>;
  }

  return (
    <div>
      <Day day={day} />
    </div>
  );
};

export default IndexView;
