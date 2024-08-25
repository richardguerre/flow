import {
  BsList,
  BsCheck,
  BsListCheck,
  BsCalendar4,
  BsClock,
  BsBell,
  BsStopwatch,
  BsWatch,
  BsHourglass,
  BsKanban,
  BsBag,
  BsBagCheck,
  BsBasket,
  BsCart,
  BsBriefcase,
  BsDuffle,
  BsSuitcase,
  BsHandbag,
  BsTrash,
  BsCalendarCheck,
} from "@flowdev/icons";
import { Color } from "../relay/__generated__/CalendarList_item.graphql";
import { Suspense, useState } from "react";
import { usePlugins } from "../getPlugin";
import { useAsyncEffect } from "../useAsyncEffect";
import { ListButton, SelectedList, SetSelectedList } from "./Lists";

export const RenderLists = (props: {
  selectedList: SelectedList;
  setSelectedList: SetSelectedList;
}) => {
  return (
    <Suspense>
      <RenderListsFromPlugins
        selectedList={props.selectedList}
        setSelectedList={props.setSelectedList}
      />
    </Suspense>
  );
};

const RenderListsFromPlugins = (props: {
  selectedList: SelectedList;
  setSelectedList: SetSelectedList;
}) => {
  const { plugins } = usePlugins();
  const [lists, setLists] = useState<ListWithPluginSlug[]>([]);

  useAsyncEffect(async () => {
    const updatedLists: ListWithPluginSlug[] = [];
    for (const [pluginSlug, plugin] of Object.entries(plugins)) {
      if (!plugin.renderLists) continue;
      const result = await plugin.renderLists({});
      if (!result) continue;
      updatedLists.push(...result.map((list) => ({ ...list, pluginSlug })));
    }
    setLists(updatedLists);
  }, [plugins]);

  return (
    <>
      {lists.map((list) => {
        return (
          <ListButton
            key={list.id}
            listId={list.id}
            tooltip={list.name}
            isSelected={props.selectedList.list === list.id}
            color={"color" in list ? list.color : undefined}
            onClick={() =>
              props.setSelectedList({
                list: list.id,
                plugin: { slug: list.pluginSlug, data: list.pluginData },
              })
            }
          >
            {"iconUrl" in list ? (
              <img src={list.iconUrl} className="h-6 w-6" />
            ) : "icon" in list ? (
              list.icon
            ) : (
              (bootstrapIcons[list.bootstrapIcon] ?? <BsList size={18} />)
            )}
          </ListButton>
        );
      })}
    </>
  );
};

type Input = {};
export type PluginRenderLists = (input: Input) => Promise<null | List[]>;
type List = { id: string; name: string; pluginData?: any } & (
  | { iconUrl: string }
  | { icon: React.ReactNode }
  | { bootstrapIcon: BootstrapIcon; color: Color }
);
type ListWithPluginSlug = List & { pluginSlug: string };

const bootstrapIcons = {
  list: <BsList size={18} />,
  check: <BsCheck size={18} />,
  "list-check": <BsListCheck size={18} />,
  calendar: <BsCalendar4 size={18} />,
  "calendar-check": <BsCalendarCheck size={18} />,
  clock: <BsClock size={18} />,
  bell: <BsBell size={18} />,
  stopwatch: <BsStopwatch size={18} />,
  watch: <BsWatch size={18} />,
  hourglass: <BsHourglass size={18} />,
  kanban: <BsKanban size={18} />,
  bag: <BsBag size={18} />,
  "bag-check": <BsBagCheck size={18} />,
  basket: <BsBasket size={18} />,
  cart: <BsCart size={18} />,
  briefcase: <BsBriefcase size={18} />,
  duffle: <BsDuffle size={18} />,
  suitcase: <BsSuitcase size={18} />,
  handbag: <BsHandbag size={18} />,
  trash: <BsTrash size={18} />,
};
type BootstrapIcon = keyof typeof bootstrapIcons;
