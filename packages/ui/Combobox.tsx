import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./Command";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  Dispatch,
  ElementRef,
  ReactNode,
  SetStateAction,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { tw } from "./tw";

type ComboboxContextType = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  values: string[];
  setValues: Dispatch<SetStateAction<string[]>>;
  multiselect?: boolean;
};
const ComboboxContext = createContext<ComboboxContextType>({
  open: false,
  values: [],
  setValues: () => {},
});

/**
 * The Combobox component is a wrapper around the Popover and Command components. It is used to create a searchable dropdown menu.
 *
 * ❗️Note: The value of the `ComboboxItem` component is case-sensitive as the cmdk package was patched not to lowercase the values.
 * It is recommended to create a mapping function from the label to the value.
 *
 * Some components, like this one, are just renamed versions of other components. This is done to make the API more intuitive.
 */
export const Combobox = (
  props: ComponentProps<typeof Popover> & {} & (
      | {
          /** Whether the combobox should allow multiple values to be selected. */
          multiselect: true;
          /** The default values when the combobox is first rendered. */
          defaultValues?: string[];
          /** The values that are selected. */
          values?: string[];
          /** A function that is called when the values change. */
          onValuesChange?: (values: string[]) => void;
        }
      | {
          /** Whether the combobox should allow multiple values to be selected. */
          multiselect?: false;
          /** The default value when the combobox is first rendered. */
          defaultValue?: string;
          /** The value that is selected. */
          value?: string;
          /** A function that is called when the value changes. */
          onValueChange?: (value: string) => void;
        }
    ),
) => {
  const [open, setOpen] = useState(props.open ?? false);
  const [values, setValues] = useState<string[]>(
    props.multiselect
      ? props.defaultValues ?? []
      : !props.multiselect && props.defaultValue
      ? [props.defaultValue]
      : [],
  );
  const handleOnOpenChange: ComboboxContextType["onOpenChange"] = (newOpen) => {
    setOpen(newOpen);
    props.onOpenChange?.(newOpen);
  };
  const handleSetValues: ComboboxContextType["setValues"] = (newValuesOrReducer) => {
    if (typeof newValuesOrReducer === "function") {
      setValues((oldValues) => {
        const newValues = newValuesOrReducer(oldValues);
        if (props.multiselect) {
          props.onValuesChange?.(newValues);
        } else {
          props.onValueChange?.(newValues[0]);
        }
        return newValues;
      });
    } else {
      setValues(newValuesOrReducer);
      if (props.multiselect) {
        props.onValuesChange?.(newValuesOrReducer);
      } else {
        props.onValueChange?.(newValuesOrReducer[0]);
      }
    }
  };

  // this useEffect allows the parent to control the open state
  useEffect(() => {
    setOpen(props.open ?? false);
  }, [props.open]);
  // this useEffect allows the parent to control the value/values state
  useEffect(() => {
    if (props.multiselect) {
      if (props.values) {
        setValues(props.values);
      }
    } else {
      if (props.value) {
        setValues([props.value]);
      }
    }
    // @ts-ignore as this is a valid dependency and by default each prop is undefined and will not change
  }, [props.multiselect, props.value, props.values, props.onValueChange, props.onValuesChange]);

  return (
    <ComboboxContext.Provider
      value={{
        open,
        onOpenChange: handleOnOpenChange,
        values,
        setValues: handleSetValues,
        multiselect: props.multiselect,
      }}
    >
      <Popover {...props} open={open} onOpenChange={handleOnOpenChange} />
    </ComboboxContext.Provider>
  );
};
export const ComboboxTrigger = PopoverTrigger;
export const ComboboxValue = (props: {
  /** Text/ReactNode shown when the value(s) is/are undefined. */
  placeholder?: ReactNode;
  /** A function to render the value. If this function is provided in a multiselect combobox, the value provided is the first value that was selected by the user. */
  renderValue?: (value: string) => ReactNode;
  /** A function to render the values. */
  renderValues?: (values: string[]) => ReactNode;
}) => {
  const { values, multiselect } = useContext(ComboboxContext);
  if (values.length === 0) {
    return <>{props.placeholder ?? "Select..."}</>;
  }
  if (props.renderValue) {
    return <>{props.renderValue(values[0])}</>;
  } else if (props.renderValues) {
    return <>{props.renderValues(values)}</>;
  }
  return <>{multiselect ? values.join(", ") : values[0]}</>;
};
export const ComboboxContent = forwardRef<
  ElementRef<typeof PopoverContent>,
  ComponentPropsWithoutRef<typeof PopoverContent> & {
    commandProps?: ComponentPropsWithoutRef<typeof Command>;
  }
>((props, ref) => {
  return (
    <PopoverContent {...props} ref={ref} sideOffset={props.sideOffset ?? 4}>
      <Command {...props.commandProps}>{props.children}</Command>
    </PopoverContent>
  );
});
export const ComboboxInput = CommandInput;
export const ComboboxList = CommandList;
export const ComboboxEmpty = CommandEmpty;
export const ComboboxGroup = CommandGroup;
export const ComboboxSeparator = CommandSeparator;
type ComboboxItemContextType = {
  selected: boolean;
};
const ComboboxItemContext = createContext<ComboboxItemContextType>({ selected: false });
/**
 * ❗️Note: The `value` of the `ComboboxItem` component is case-sensitive as the cmdk package was patched not to lowercase the values.
 * It is recommended to create a mapping function from the label to the value.
 */
export const ComboboxItem = forwardRef<
  ElementRef<typeof CommandItem>,
  ComponentPropsWithoutRef<typeof CommandItem> & {
    /** The value is required to know if the item is selected on first render. */
    value: string;
  }
>((props, ref) => {
  const { onOpenChange, values, setValues, multiselect } = useContext(ComboboxContext);

  return (
    <ComboboxItemContext.Provider value={{ selected: values.includes(props.value) }}>
      <CommandItem
        {...props}
        ref={ref}
        onSelect={(selectedValue) => {
          props.onSelect?.(selectedValue);
          setValues((oldValues) => {
            if (oldValues.includes(selectedValue)) {
              return oldValues.filter((value) => value !== selectedValue);
            }
            const newValuesSet = new Set(
              multiselect ? [...oldValues, selectedValue] : [selectedValue],
            );
            return Array.from(newValuesSet);
          });
          if (!multiselect) onOpenChange?.(false);
        }}
      />
    </ComboboxItemContext.Provider>
  );
});
export const ComboboxSelected = (
  props: React.InputHTMLAttributes<HTMLDivElement> & {
    /**
     * The className applied when the option is selected.
     *
     * @example
     * ```
     * <ComboboxSelected
     *   className="mr-2 h-4 w-4 opacity-0"
     *   selectedClassName="opacity-100"
     * >
     *   <Check />
     * </ComboboxSelected>
     * ```
     */
    selectedClassName?: string;
  },
) => {
  const { selected } = useContext(ComboboxItemContext);
  return <div {...props} className={tw(props.className, selected && props.selectedClassName)} />;
};
export const ComboboxShortcut = CommandShortcut;
