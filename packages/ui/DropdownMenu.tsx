import React from "react";
import {
  Root,
  Trigger,
  Group,
  Portal,
  Sub,
  RadioGroup,
  SubTrigger,
  SubContent,
  Content,
  Item,
  CheckboxItem,
  ItemIndicator,
  RadioItem,
  Label,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { tw } from "./tw";
import { BsCheck, BsCircleFill, BsChevronRight } from "@flowdev/icons";

export const DropdownMenu = Root;
export const DropdownMenuGroup = Group;
export const DropdownMenuPortal = Portal;
export const DropdownMenuSub = Sub;
export const DropdownMenuRadioGroup = RadioGroup;
export const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger ref={ref} className={tw("outline-none", className)} {...props} />
));

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof SubTrigger>,
  React.ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={tw(
      "focus:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-black",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <BsChevronRight size={16} className="ml-auto" />
  </SubTrigger>
));

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof SubContent>,
  React.ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={tw(
      "bg-background-50 ring-0.5 ring-primary-100 text-foreground-900 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
      className
    )}
    {...props}
  />
));

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={tw(
        "bg-background-50 ring-0.5 ring-primary-100 animate-fade-in animate-duration-100 z-50 rounded-md p-1 shadow-md outline-none",
        className
      )}
      {...props}
    />
  </Portal>
));

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={tw(
      "focus:bg-primary-100/70 focus:text-primary-500 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    className={tw(
      "focus:bg-primary-100/70 focus:text-primary-500 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <BsCheck size={16} />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
));

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={tw(
      "focus:bg-primary-100/70 focus:text-primary-500 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <BsCircleFill size={8} />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Label
    ref={ref}
    className={tw("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={tw("bg-primary-100 -mx-1 my-1 h-px", className)} {...props} />
));

export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={tw("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
  );
};
