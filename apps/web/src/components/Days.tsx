import { graphql, usePaginationFragment } from "@flowdev/relay";
import { Days_data$key } from "@flowdev/web/relay/__generated__/Days_data.graphql";
import { useEffect, useRef, useState } from "react";
import { Day } from "./Day";

const widthOfDay = 256; // 256 (or w-64) is the width of the day in Day.tsx

type DaysProps = {
  data: Days_data$key;
};

export const Days = (props: DaysProps) => {
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
    props.data,
  );

  const [loadPreviousAndStayAt, setLoadPreviousAndStayAt] = useState<number | null>(null);
  const [shouldLoadNext, setShouldLoadNext] = useState(false);
  const days = useRef<HTMLDivElement>(null);

  useEffect(() => {
    days.current?.addEventListener("scroll", () => {
      const scrollLeft = days.current?.scrollLeft;
      const scrollWidth = days.current?.scrollWidth;
      if (!scrollLeft || !scrollWidth) return;
      if (scrollLeft <= widthOfDay) {
        setLoadPreviousAndStayAt(scrollLeft);
      } else if (scrollLeft >= scrollWidth - window.screen.width - 370 - widthOfDay * 3) {
        // 370 is the width of the sidebar
        setShouldLoadNext(true);
      }
    });
  }, [days.current]);

  useEffect(() => {
    if (loadPreviousAndStayAt) {
      const loadDays = 7;
      loadPrevious(loadDays, {
        onComplete: () => {
          // TODO: refactor this to remove the jerky scroll/flashing behavior on load
          days.current?.scrollTo({
            left: loadPreviousAndStayAt + loadDays * widthOfDay,
            behavior: "auto",
          });
          setLoadPreviousAndStayAt(null);
        },
      });
    } else if (shouldLoadNext) {
      loadNext(7, {
        onComplete: () => setShouldLoadNext(false),
      });
    }
  }, [loadPreviousAndStayAt, shouldLoadNext]);

  return (
    <div ref={days} className="no-scrollbar flex h-full overflow-x-scroll pr-3 pt-3">
      {data.days.edges.map((edge) => (
        <Day key={edge.cursor} day={edge.node} />
      ))}
    </div>
  );
};
