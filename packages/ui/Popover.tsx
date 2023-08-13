import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Content, Portal, Root, Trigger } from "@radix-ui/react-popover";
import { tw } from "./tw";

export const Popover = Root;
export const PopoverTrigger = Trigger;
export const PopoverContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>((props, ref) => {
  return (
    <Portal>
      <Content
        {...props}
        ref={ref}
        className={tw(
          "bg-background-50 ring-0.5 ring-primary-100 animate-fade-in animate-duration-100 z-50 rounded-md p-2 shadow-md outline-none",
          props.className
        )}
      />
    </Portal>
  );
});
