import { IconContext } from "@flowdev/icons";
import { TooltipProvider } from "@flowdev/ui/Tooltip";
import { Toaster } from "@flowdev/ui/Toast";
import { RelayEnvironmentProvider } from "../relay/environment";

type Props = {
  children: React.ReactNode;
};
export const Providers = (props: Props) => {
  return (
    <RelayEnvironmentProvider>
      <TooltipProvider>
        <IconContext.Provider value={{ size: "20px" }}>
          {props.children}
          <Toaster position="bottom-center" />
        </IconContext.Provider>
      </TooltipProvider>
    </RelayEnvironmentProvider>
  );
};
