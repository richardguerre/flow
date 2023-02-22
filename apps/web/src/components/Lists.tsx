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
    <div className="flex h-full bg-background-50 shadow-xl shadow-2xl z-10">
      <div className="h-full flex-1 w-72">
        {selectedList ? <List listId={selectedList} /> : <CalendarList data={data} />}
      </div>
      <div className="border-l h-full space-y-3 border-l-background-300 p-4 overflow-y-scroll">
        <button
          title="calendar"
          className="rounded-full bg-background-300 h-12 p-3 w-12"
          onClick={() => setSelectedList(null)}
        >
          🗓️ {/* TODO: replace with calendar icon */}
        </button>
        {data.lists.map((list) => (
          <button
            title={list.name}
            className="rounded-full bg-background-300 h-9 w-9"
            onClick={() => setSelectedList(list.id)}
          />
        ))}
      </div>
    </div>
  );
};
