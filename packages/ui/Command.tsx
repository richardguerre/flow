import {
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { BsSearch } from "@flowdev/icons";
import { Command as CommandPrimitive } from "cmdk";
import { tw } from "./tw";
import { Dialog, DialogContent } from "./Dialog";
import { Shortcut } from "./Shortcut";

type CommandContextType = {
  value: string | undefined;
  select: (value: string) => void;
};
const CommandContext = createContext<CommandContextType>({
  value: undefined,
  select: () => {},
});
const useCommandContext = () => useContext(CommandContext);

export const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  Omit<ComponentPropsWithoutRef<typeof CommandPrimitive>, "onValueChange"> & {
    onValueChange?: (
      value: string,
      info: {
        fromShortcut?: boolean;
      },
    ) => void;
  }
>(({ className, ...props }, ref) => {
  const [value, setValue] = useState<string | undefined>(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const select = (value: string, info?: { fromShortcut?: boolean }) => {
    setValue(value);
    props.onValueChange?.(value, info ?? {});
  };

  return (
    <CommandContext.Provider
      value={{ value, select: (value) => select(value, { fromShortcut: true }) }}
    >
      <CommandPrimitive
        ref={ref}
        className={tw(
          "bg-background-50 text-foreground-900 flex h-full w-full flex-col overflow-hidden rounded-md",
          className,
        )}
        {...props}
        value={value}
        onValueChange={select}
      />
    </CommandContext.Provider>
  );
});

interface CommandDialogProps extends DialogProps {}

export const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-foreground-700 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="border-primary-100 flex items-center border-b px-3" cmdk-input-wrapper="">
    <BsSearch size="14" className="text-foreground-700 mr-2 shrink-0" />
    <CommandPrimitive.Input
      ref={ref}
      className={tw(
        "placeholder:text-foreground-700 flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

export const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={tw("max-h-xs overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

export const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => {
  return <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />;
});

export const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={tw(
      "text-foreground-900 [&_[cmdk-group-heading]]:text-foreground-700 overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      className,
    )}
    {...props}
  />
));

export const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={tw("bg-primary-100 -mx-1 h-px", className)}
    {...props}
  />
));

/**
 * ❗️Note: The value of the `CommandItem` component is case-sensitive as the cmdk package was patched not to lowercase the values.
 * ~~It is recommended to create a mapping function from the label to the value.~~
 * Use the `filter` prop of the `Command` component to filter the items.
 */
export const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
    shortcut?: string;
  }
>(({ className, ...props }, ref) => {
  const command = useCommandContext();
  const handleShortcutTrigger = (_e: Mousetrap.ExtendedKeyboardEvent, _combo: string) => {
    const value = props.value ?? (typeof props.children === "string" ? props.children : undefined);
    value && command.select(value);
  };

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={tw(
        "aria-selected:bg-primary-100 aria-selected:text-primary-600 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      {props.children}
      {props.shortcut && (
        <Shortcut className="ml-auto" onTrigger={handleShortcutTrigger}>
          {props.shortcut}
        </Shortcut>
      )}
    </CommandPrimitive.Item>
  );
});
