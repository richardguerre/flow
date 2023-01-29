import { FC } from "react";
import { useQueryLoader, graphql, PreloadedQuery } from "@flowdev/relay";
import { IndexViewQuery } from "@flowdev/web/relay/__generated__/IndexViewQuery.graphql";
import { DayTimeGrid } from "@flowdev/calendar";

const indexViewQuery = graphql`
  query IndexViewQuery($daysAfter: ID, $firstDays: Int) {
    ...Days_data @arguments(after: $daysAfter, first: $firstDays)
    ...Lists_data
  }
`;

export default () => {
  const daysAfterDate = new Date();
  daysAfterDate.setDate(daysAfterDate.getDate() - 7);
  const daysAfter = daysAfterDate.toISOString().split("T")[0]; // converts to YYYY-MM-DD
  const { queryRef } = useQueryLoader<IndexViewQuery>(indexViewQuery, {
    daysAfter,
    firstDays: 17, // 7 days before and 10 days after today
  });
  if (!queryRef) return null;
  return <IndexViewContent queryRef={queryRef} />;
};

type IndexViewProps = {
  queryRef: PreloadedQuery<IndexViewQuery>;
};

const IndexViewContent: FC<IndexViewProps> = (props) => {
  // const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  return (
    <div className="flex">
      <div className="p-8 w-96">
        <DayTimeGrid
          artifacts={[
            {
              id: "10",
              at: new Date(),
              element: (
                <div className="rounded-full bg-green-500 h-6 transform w-6 -translate-x-1/2 -translate-y-1/2" />
              ),
            },
          ]}
          events={[
            {
              id: "1",
              title:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget. Sentimentum, nunc enim ultrices nunc, nec.",
              scheduledAt: new Date(),
              durationInMinutes: 15,
            },
            {
              id: "2",
              title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              isAllDay: true,
            },
            {
              id: "3",
              title: "Lorem.",
              isAllDay: true,
            },
          ]}
        />
      </div>
    </div>
    // <div className="h-screen w-screen relative">
    //   <DayColumnGroup data={data} />
    //   <div className="top-0 right-0 absolute">
    //     <Lists data={data} />
    //   </div>
    // </div>
  );
};
