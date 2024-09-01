import { createContext, useContext, useState } from "react";
import { CalendarListTaskCardDraggedIn_task$key } from "./relay/__gen__/CalendarListTaskCardDraggedIn_task.graphql";

type DraggedInTask = CalendarListTaskCardDraggedIn_task$key & { titleAsText: string };

export type DragContext = {
  dragged: DraggedInTask | null;
  setDragged: React.Dispatch<React.SetStateAction<DragContext["dragged"]>>;
  over: "lists" | null;
  setOver: React.Dispatch<React.SetStateAction<DragContext["over"]>>;
  dragEndedWith: DragContext["dragged"];
  setDragEndedWith: React.Dispatch<React.SetStateAction<DragContext["dragEndedWith"]>>;
};

const dragContext = createContext<DragContext>({
  dragged: null,
  setDragged: () => {},
  over: null,
  setOver: () => {},
  dragEndedWith: null,
  setDragEndedWith: () => {},
});

export const DragContextProvider = (props: { children: React.ReactNode }) => {
  const [dragged, $setDragged] = useState<DragContext["dragged"]>(null);
  const [over, setOver] = useState<DragContext["over"]>(null);
  const [dragEndedWith, setDragEndedWith] = useState<DragContext["dragEndedWith"]>(null);

  const setDragged: React.Dispatch<React.SetStateAction<DragContext["dragged"]>> = (newDragged) => {
    if (!newDragged) {
      setDragEndedWith(dragged);
      setOver(null);
    }
    $setDragged(newDragged);
  };

  const context: DragContext = {
    dragged,
    setDragged,
    over,
    setOver,
    dragEndedWith,
    setDragEndedWith,
  };
  // console.log({ dragContext: context });

  return <dragContext.Provider value={context}>{props.children}</dragContext.Provider>;
};
export const useDragContext = () => useContext(dragContext);
