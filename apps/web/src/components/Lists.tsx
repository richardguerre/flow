import { Lists_data$key } from "@flowdev/web/relay/__generated__/Lists_data.graphql";
import { FC, useState } from "react";
import { graphql, useFragment } from "@flowdev/relay";
import { List } from "./List";
import { CalendarList } from "./CalendarList";

type ListsProps = {
  data: Lists_data$key;
};

export const Lists: FC<ListsProps> = (props) => {
  const [selectedList, setSelectedList] = useState<string | null>(null);
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

  return (
    <div className="flex h-screen bg-background-100 w-60">
      <div className="flex-1">
        {selectedList ? <List listId={selectedList} /> : <CalendarList data={data} />}
      </div>
      <div className="space-y-1">
        {data.lists.map((list) => (
          <div
            title={list.name}
            className="rounded-full bg-background-300 h-9 w-9"
            onClick={() => setSelectedList(list.id)}
          />
        ))}
      </div>
    </div>
  );
};
