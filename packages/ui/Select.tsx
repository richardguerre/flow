import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { HiChevronUpDown, BsCheck } from "@flowdev/icons";
import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import { tw } from "./tw";

export const Select = Root;
export const SelectGroup = Group;
export const SelectValue = Value;
export const SelectTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={tw(
      "bg-background-50 ring-primary-200 placeholder:text-foreground-700 text-foreground-900 hover:ring-primary-300 disabled:bg-background-300/50 focus:ring-primary-500 disabled:ring-none flex h-9 w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm ring focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    <Icon asChild>
      <HiChevronUpDown className="text-foreground-700 h-4 w-4" />
    </Icon>
  </Trigger>
));

export const SelectContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      className={tw(
        "bg-background-50 text-foreground-900 data-[state=open]:animate-fade-in data-[state=open]:animate-duration-100 data-[state=closed]:animate-fade-out data-[state=closed]:animate-duration-100 min-w-32 relative z-50 overflow-hidden rounded-md border shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <Viewport
        className={tw(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </Viewport>
    </Content>
  </Portal>
));

export const SelectLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label ref={ref} className={tw("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
));

export const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    {...props}
    ref={ref}
    className={tw(
      "focus:bg-primary-100/70 focus:text-primary-500 relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <BsCheck className="h-4 w-4" />
      </ItemIndicator>
    </span>
    <ItemText>{children}</ItemText>
  </Item>
));

export const SelectSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={tw("bg-primary-100 -mx-1 my-1 h-px", className)} {...props} />
));
