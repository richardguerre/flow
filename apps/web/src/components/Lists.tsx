import { Lists_data$key } from "@flowdev/web/relay/__generated__/Lists_data.graphql";
import { useState } from "react";
import { graphql, useFragment } from "@flowdev/relay";
import { List } from "./List";
import { CalendarList } from "./CalendarList";

type ListsProps = {
  data: Lists_data$key;
};

export const Lists = (props: ListsProps) => {
  const data = useFragment(
    graphql`
      fragment Lists_data on Query
      @argumentDefinitions(dateInFocus: { type: "Date!" }, dayIdInFocus: { type: "ID!" }) {
        ...CalendarList_data @arguments(dateInFocus: $dateInFocus, dayIdInFocus: $dayIdInFocus)
        lists {
          id
          name
        }
      }
    `,
    props.data
  );

  // if selectedList null, show the calendar
  const [selectedList, setSelectedList] = useState<string | null>(null);

  return (
    <div className="bg-background-50 z-10 flex h-full shadow-xl">
      <div className="h-full w-72 flex-1">
        {selectedList ? <List listId={selectedList} /> : <CalendarList data={data} />}
      </div>
      <div className="border-l-background-300 flex h-full flex-col gap-3 overflow-y-scroll border-l p-4">
        <button
          title="calendar"
          className="bg-background-300 h-12 w-12 rounded-full p-3"
          onClick={() => setSelectedList(null)}
        >
          🗓️ {/* TODO: replace with calendar icon */}
        </button>
        {data.lists.map((list) => (
          <button
            key={list.id}
            title={list.name}
            className="bg-background-300 h-9 w-9 rounded-full"
            onClick={() => setSelectedList(list.id)}
          />
        ))}
      </div>
    </div>
  );
};
