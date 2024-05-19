import { createContext, useContext, useState } from "react";
import { CalendarListTaskCardDraggedIn_task$key } from "./relay/__generated__/CalendarListTaskCardDraggedIn_task.graphql";

type DragContext = {
  dragged: CalendarListTaskCardDraggedIn_task$key | null;
  setDragged: React.Dispatch<React.SetStateAction<DragContext["dragged"]>>;
};

const dragContext = createContext<DragContext>({
  dragged: null,
  setDragged: () => {},
});

export const DragContextProvider = (props: { children: React.ReactNode }) => {
  const [dragged, setDragged] = useState<DragContext["dragged"]>(null);

  const context: DragContext = { dragged, setDragged };
  console.log({ dragContext: context });

  return <dragContext.Provider value={context}>{props.children}</dragContext.Provider>;
};
export const useDragContext = () => useContext(dragContext);
