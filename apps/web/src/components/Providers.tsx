import { IconContext } from "@flowdev/icons";
import { TooltipProvider } from "@flowdev/ui/Tooltip";
import { Toaster } from "@flowdev/ui/Toast";

type Props = {
  children: React.ReactNode;
};
export const Providers = (props: Props) => {
  return (
    <TooltipProvider>
      <IconContext.Provider value={{ size: "20px" }}>
        {props.children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            iconTheme: { primary: "#22c55e", secondary: "#f9fafb" },
          }}
        />
      </IconContext.Provider>
    </TooltipProvider>
  );
};