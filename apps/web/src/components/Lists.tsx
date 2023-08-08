import { Lists_data$key } from "@flowdev/web/relay/__generated__/Lists_data.graphql";
import { useState } from "react";
import { graphql, useFragment } from "@flowdev/relay";
import { List } from "./List";
import { CalendarList } from "./CalendarList";
import { BsCalendar4, BsInbox, BsList } from "@flowdev/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { tw } from "@flowdev/ui/tw";

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
      <div className="border-l-background-300 flex h-full flex-col gap-3 overflow-y-scroll border-l p-2">
        <Tooltip>
          <TooltipTrigger>
            <button
              className={tw(
                "text-foreground-700 hover:bg-background-200 flex h-11 w-11 items-center justify-center rounded-full bg-transparent"
              )}
            >
              <BsInbox />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Inbox</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <button
              className={tw(
                "flex h-11 w-11 items-center justify-center rounded-full",
                selectedList === null
                  ? "bg-primary-100 text-primary-600"
                  : "hover:bg-background-200 text-foreground-700 bg-transparent"
              )}
              onClick={() => setSelectedList(null)}
            >
              <BsCalendar4 />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Calendar</TooltipContent>
        </Tooltip>
        {data.lists.map((list) => (
          <button
            key={list.id}
            title={list.name}
            className={tw(
              "flex h-11 w-11 items-center justify-center rounded-full",
              selectedList === list.id
                ? "bg-primary-100 text-primary-600"
                : "hover:bg-background-200 text-foreground-700 bg-transparent"
            )}
            onClick={() => setSelectedList(list.id)}
          >
            <BsList />
          </button>
        ))}
      </div>
    </div>
  );
};
