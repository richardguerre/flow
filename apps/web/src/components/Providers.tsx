import { IconContext } from "@flowdev/icons";
import { TooltipProvider } from "@flowdev/ui/Tooltip";
import { Toaster } from "@flowdev/ui/Toast";
import { RelayEnvironmentProvider } from "../relay/environment";
import { DragContextProvider } from "../useDragContext";
import { ShorcutsProvider } from "./Shortcuts";

type Props = {
  children: React.ReactNode;
};
export const Providers = (props: Props) => {
  return (
    <RelayEnvironmentProvider>
      <TooltipProvider>
        <IconContext.Provider value={{ size: "20px" }}>
          <DragContextProvider>
            <ShorcutsProvider>
              {props.children}
              <Toaster position="bottom-center" />
            </ShorcutsProvider>
          </DragContextProvider>
        </IconContext.Provider>
      </TooltipProvider>
    </RelayEnvironmentProvider>
  );
};
