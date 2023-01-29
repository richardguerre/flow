import { FC } from "react";
import { graphql, PreloadedQuery } from "@flowdev/relay";
import { IndexViewQuery } from "@flowdev/web/relay/__generated__/IndexViewQuery.graphql";
import { DayCalendar } from "@flowdev/calendar";
// import { DayColumnGroup } from "@flowdev/web/components/DayColumnGroup";
// import { ListGroup } from "@flowdev/web/components/ListGroup";

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
  // const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  return (
    <div className="flex">
      <div className="p-8 w-96">
        <DayCalendar
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
              start: new Date(),
              durationInMinutes: 15,
            },
            {
              id: "2",
              title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              allDay: true,
            },
            {
              id: "3",
              title: "Lorem.",
              allDay: true,
            },
          ]}
        />
      </div>
    </div>
    // <div className="h-screen w-screen relative">
    //   <DayColumnGroup data={data} />
    //   <div className="top-0 right-0 absolute">
    //     <ListGroup data={data} />
    //   </div>
    // </div>
  );
};
