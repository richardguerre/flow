import { forwardRef } from "react";
import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from "@radix-ui/react-context-menu";
import { tw } from "./tw";
import { BsCheck, BsCircleFill, BsChevronRight } from "@flowdev/icons";

export const ContextMenu = Root;
export const ContextMenuTrigger = Trigger;
export const ContextMenuGroup = Group;
export const ContextMenuPortal = Portal;
export const ContextMenuSub = Sub;
export const ContextMenuRadioGroup = RadioGroup;
export const ContextMenuSubTrigger = forwardRef<
  React.ElementRef<typeof SubTrigger>,
  React.ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={tw(
      "focus:bg-primary-100/70 focus:text-primary-500 data-[state=open]:bg-primary-100/70 data-[state=open]:text-primary-500 flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <BsChevronRight size={16} className="ml-auto" />
  </SubTrigger>
));

export const ContextMenuSubContent = forwardRef<
  React.ElementRef<typeof SubContent>,
  React.ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={tw(
      "bg-background-50 ring-0.5 ring-primary-100 text-foreground-900 data-[state=open]:animate-fade-in animate-duration-100 data-[state=closed]:animate-fade-out z-50 overflow-hidden rounded-md border p-1 shadow-md",
      className,
    )}
    {...props}
  />
));

export const ContextMenuContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      className={tw(
        "bg-background-50 ring-0.5 ring-primary-100 text-foreground-900 animate-fade-in data-[state=open]:animate-duration-100 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out data-[state=closed]:animate-duration-100 z-50 overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      {...props}
    />
  </Portal>
));

export const ContextMenuItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={tw(
      "focus:bg-primary-100/70 focus:text-primary-500 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));

export const ContextMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    className={tw(
      "focus:bg-primary-100/70 focus:text-primary-500 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
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
CheckboxItem.displayName;

export const ContextMenuRadioItem = forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={tw(
      "focus:bg-primary-100/70 focus:text-primary-500 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
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

export const ContextMenuLabel = forwardRef<
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

export const ContextMenuSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={tw("bg-primary-100 -mx-1 my-1 h-px", className)} {...props} />
));

export const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={tw("text-foreground-700 ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
};
