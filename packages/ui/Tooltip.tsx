import React, { forwardRef } from "react";
import { Provider, Root, Trigger, Content } from "@radix-ui/react-tooltip";
import { tw } from "./tw";

export const TooltipProvider = Provider;
export const Tooltip = Root;
export const TooltipTrigger = Trigger;
export const TooltipContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>((props, ref) => (
  <Content
    ref={ref}
    {...props}
    sideOffset={props.sideOffset ?? 4}
    className={tw(
      "bg-background-50 animate-fade-in animate-duration-100 text-foreground-900 z-50 rounded p-1 text-sm shadow-md",
      props.className
    )}
    un-cloak
  />
));
