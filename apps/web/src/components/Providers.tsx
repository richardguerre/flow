import { IconContext } from "@flowdev/icons";
import { TooltipProvider } from "@flowdev/ui/Tooltip";

type Props = {
  children: React.ReactNode;
};
export const Providers = (props: Props) => {
  return (
    <TooltipProvider>
      <IconContext.Provider value={{ size: "20px" }}>{props.children}</IconContext.Provider>
    </TooltipProvider>
  );
};
