import { tw } from "@flowdev/ui/tw";
import { FlowIcon } from "@flowdev/web/components/FlowIcon";
import { BsGear, BsGlobe2, BsJournalCheck, BsKanban, BsListCheck } from "@flowdev/icons";
import { Link, useMatch } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent } from "@flowdev/ui/Tooltip";
import { useAsyncLoader } from "@flowdev/web/useAsyncLoader";
import { getClosestRoutineRoutePath } from "@flowdev/web/views/RoutineView";

export const Navbar = () => {
  // routinePath is loaded non-blocking so that the navbar can render immediately
  const [routinePath] = useAsyncLoader(async () => await getClosestRoutineRoutePath());

  return (
    <div className="bg-background-50 flex h-screen flex-shrink-0 flex-col justify-between gap-4 px-2 py-2 shadow-xl">
      <div className="flex flex-col gap-2">
        <Link to="/" className="flex h-11 w-11 cursor-pointer items-center justify-center">
          <FlowIcon />
        </Link>
        <NavItem to="/" tooltip="Kanban view">
          <BsKanban size="16px" />
        </NavItem>
        <NavItem to="/list" tooltip="List view">
          <BsListCheck />
        </NavItem>
        <NavItem to={routinePath ?? "/routine"} tooltip="Do your latest routine">
          <BsJournalCheck />
        </NavItem>
      </div>

      <div className="flex flex-col gap-2">
        <NavItem to="/plugins" tooltip="Browse plugins">
          <BsGlobe2 />
        </NavItem>
        <NavItem to="/settings" tooltip="Settings">
          <BsGear />
        </NavItem>
      </div>
    </div>
  );
};

type NavItemProps = {
  children: React.ReactNode;
  to: string;
  tooltip: string;
};

export const NavItem = (props: NavItemProps) => {
  const selected = useMatch(props.to);
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger>
        <Link
          to={props.to}
          className={tw(
            "flex h-11 w-11 items-center justify-center rounded-full",
            selected
              ? "bg-primary-100 text-primary-600"
              : "text-foreground-700 hover:bg-background-200 bg-transparent"
          )}
        >
          {props.children}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{props.tooltip}</TooltipContent>
    </Tooltip>
  );
};
