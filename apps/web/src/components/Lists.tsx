import { Lists_data$key } from "@flowdev/web/relay/__gen__/Lists_data.graphql";
import { useState } from "react";
import { graphql, useFragment } from "@flowdev/relay";
import { List } from "./List";
import { CalendarList } from "./CalendarList";
import { BsCalendar4, BsInbox, BsList } from "@flowdev/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { tw } from "@flowdev/ui/tw";
import { InboxList } from "./InboxList";
import { useDragContext } from "../useDragContext";
import { RenderLists } from "./RenderLists";
import { RenderList } from "./RenderList";
import { Color } from "../relay/__gen__/CalendarList_item.graphql";

type ListsProps = {
  data: Lists_data$key;
};

type ListType = "calendar" | "inbox" | (string & {});
export type SelectedList = { list: ListType; plugin?: { slug: string; data?: any } };
export type SetSelectedList = React.Dispatch<React.SetStateAction<SelectedList>>;

export const Lists = (props: ListsProps) => {
  const data = useFragment(
    graphql`
      fragment Lists_data on Query @argumentDefinitions(dayIdInFocus: { type: "ID!" }) {
        ...CalendarList_data @arguments(dayIdInFocus: $dayIdInFocus)
        lists {
          id
          name
        }
      }
    `,
    props.data,
  );

  const [selectedList, setSelectedList] = useState<SelectedList>({
    list: "inbox",
  });
  const { setOver } = useDragContext();

  return (
    <div
      className="bg-background-50 flex h-full shadow-xl shrink-0"
      onDragEnter={() => setOver("lists")}
      onDragExit={() => setOver(null)}
    >
      <div className="h-full w-72 flex-1">
        {selectedList.plugin ? (
          <RenderList listId={selectedList.list} plugin={selectedList.plugin} />
        ) : selectedList.list === "inbox" ? (
          <InboxList />
        ) : selectedList.list === "calendar" ? (
          <CalendarList data={data} />
        ) : (
          <List listId={selectedList.list} />
        )}
      </div>
      <div className="border-l-background-300 flex h-full flex-col gap-3 overflow-y-scroll border-l p-2">
        <ListButton
          listId="inbox"
          tooltip="Inbox"
          isSelected={selectedList.list === "inbox"}
          onClick={() => setSelectedList({ list: "inbox" })}
        >
          <BsInbox />
        </ListButton>
        <ListButton
          listId="calendar"
          tooltip="Calendar"
          isSelected={selectedList.list === "calendar"}
          onClick={() => setSelectedList({ list: "calendar" })}
        >
          <BsCalendar4 size={18} />
        </ListButton>
        {data.lists.map((list) => (
          <ListButton
            key={list.id}
            listId={list.id}
            tooltip={list.name}
            isSelected={selectedList.list === list.id}
            onClick={() => setSelectedList({ list: list.id })}
          >
            <BsList />
          </ListButton>
        ))}
        <RenderLists selectedList={selectedList} setSelectedList={setSelectedList} />
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
  color?: Color;
};

export const ListButton = (props: ListButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          className={tw(
            "flex h-11 w-11 items-center justify-center rounded-full",
            props.color
              ? props.isSelected
                ? `bg-${props.color}-100 text-${props.color}-600`
                : "hover:bg-background-200 text-foreground-700 bg-transparent"
              : props.isSelected
                ? "bg-primary-100 text-primary-600"
                : "hover:bg-background-200 text-foreground-700 bg-transparent",
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
