import { createContext, useContext, useState } from "react";
import { CalendarListTaskCardDraggedIn_task$key } from "./relay/__generated__/CalendarListTaskCardDraggedIn_task.graphql";

export type DragContext = {
  dragged: CalendarListTaskCardDraggedIn_task$key | null;
  setDragged: React.Dispatch<React.SetStateAction<DragContext["dragged"]>>;
  over: "lists" | null;
  setOver: React.Dispatch<React.SetStateAction<DragContext["over"]>>;
};

const dragContext = createContext<DragContext>({
  dragged: null,
  setDragged: () => {},
  over: null,
  setOver: () => {},
});

export const DragContextProvider = (props: { children: React.ReactNode }) => {
  const [dragged, $setDragged] = useState<DragContext["dragged"]>(null);
  const [over, setOver] = useState<DragContext["over"]>(null);

  const setDragged: React.Dispatch<React.SetStateAction<DragContext["dragged"]>> = (dragged) => {
    $setDragged(dragged);
    if (!dragged) setOver(null);
  };

  const context: DragContext = { dragged, setDragged, over, setOver };
  // console.log({ dragContext: context });

  return <dragContext.Provider value={context}>{props.children}</dragContext.Provider>;
};
export const useDragContext = () => useContext(dragContext);
