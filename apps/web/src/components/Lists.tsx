import { Lists_data$key } from "@flowdev/web/relay/__generated__/Lists_data.graphql";
import { useState } from "react";
import { graphql, useFragment } from "@flowdev/relay";
import { List } from "./List";
import { CalendarList } from "./CalendarList";
import { BsCalendar4, BsInbox, BsList } from "@flowdev/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { tw } from "@flowdev/ui/tw";
import { InboxList } from "./InboxList";

type ListsProps = {
  data: Lists_data$key;
};

type ListType = "calendar" | "inbox" | (string & {});

export const Lists = (props: ListsProps) => {
  const data = useFragment(
    graphql`
      fragment Lists_data on Query
      @argumentDefinitions(
        scheduledAt: { type: "PrismaDateTimeFilter!" }
        dayIdInFocus: { type: "ID!" }
      ) {
        ...CalendarList_data @arguments(scheduledAt: $scheduledAt, dayIdInFocus: $dayIdInFocus)
        ...InboxList_data
        lists {
          id
          name
        }
      }
    `,
    props.data
  );

  // if selectedList null, show the calendar
  const [selectedList, setSelectedList] = useState<ListType>("inbox");

  return (
    <div className="bg-background-50 z-10 flex h-full shadow-xl">
      <div className="h-full w-72 flex-1">
        {selectedList === "inbox" ? (
          <InboxList data={data} />
        ) : selectedList === "calendar" ? (
          <CalendarList data={data} />
        ) : (
          <List listId={selectedList} />
        )}
      </div>
      <div className="border-l-background-300 flex h-full flex-col gap-3 overflow-y-scroll border-l p-2">
        <ListButton
          listId="inbox"
          tooltip="Inbox"
          isSelected={selectedList === "inbox"}
          onClick={() => setSelectedList("inbox")}
        >
          <BsInbox />
        </ListButton>
        <ListButton
          listId="calendar"
          tooltip="Calendar"
          isSelected={selectedList === "calendar"}
          onClick={() => setSelectedList("calendar")}
        >
          <BsCalendar4 size={18} />
        </ListButton>
        {data.lists.map((list) => (
          <ListButton
            key={list.id}
            listId={list.id}
            tooltip={list.name}
            isSelected={selectedList === list.id}
            onClick={() => setSelectedList(list.id)}
          >
            <BsList />
          </ListButton>
        ))}
      </div>
    </div>
  );
};

type ListButtonProps = {
  children: React.ReactNode;
  tooltip: string;
  listId: string;
  isSelected: boolean;
  onClick: () => void;
};

const ListButton = (props: ListButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          className={tw(
            "flex h-11 w-11 items-center justify-center rounded-full",
            props.isSelected
              ? "bg-primary-100 text-primary-600"
              : "hover:bg-background-200 text-foreground-700 bg-transparent"
          )}
          onClick={props.onClick}
        >
          {props.children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">{props.tooltip}</TooltipContent>
    </Tooltip>
  );
};
