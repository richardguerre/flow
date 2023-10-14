import type { ITimezoneOption, ITimezone, Props as SelectProps } from "react-timezone-select";
import BaseSelect from "react-timezone-select";
import type { FieldError } from "react-hook-form";
import { tw } from "./tw";

type Props = SelectProps & {
  label?: string;
  description?: string;
  error?: string | FieldError;
  fullWidth?: boolean;
};

export function TimezoneSelect(props: Props) {
  const errorMessage = typeof props.error === "object" ? props.error.message : props.error;
  return (
    <label className={tw("flex flex-col gap-1", props.fullWidth && "w-full")}>
      {props.label && (
        <div className="text-foreground-900 text-base font-medium">{props.label}</div>
      )}
      {props.description && (
        <div className="text-foreground-700 text-base">{props.description}</div>
      )}
      <BaseSelect
        {...props}
        classNames={{
          ...props.classNames,
          input: (state) => tw("h-6", props.classNames?.input && props.classNames.input(state)),
          option: (state) =>
            tw(
              "bg-primary-100 flex !cursor-pointer justify-between py-2.5 px-3 rounded-none text-foreground-900",
              state.isFocused && "!bg-primary-100",
              state.isSelected && "!bg-primary-500",
              props.classNames?.option && props.classNames.option(state),
            ),
          placeholder: (state) => tw("text-foreground-700", state.isFocused && "hidden"),
          dropdownIndicator: () => "text-foreground-900",
          control: (state) =>
            tw("!cursor-pointer", props.classNames?.control && props.classNames.control(state)),
          singleValue: (state) =>
            tw(
              "text-foreground-900 placeholder:text-foreground-700",
              props.classNames?.singleValue && props.classNames.singleValue(state),
            ),
          valueContainer: (state) =>
            tw(
              "text-foreground-700 placeholder:text-foreground-700 flex gap-1",
              props.classNames?.valueContainer && props.classNames.valueContainer(state),
            ),
          multiValue: (state) =>
            tw(
              "bg-foreground-700 text-foreground-900 rounded-md py-1.5 px-2 flex items-center text-sm leading-none",
              props.classNames?.multiValue && props.classNames.multiValue(state),
            ),
          menu: (state) =>
            tw(
              "rounded-md bg-default text-sm leading-4 text-foreground-900 mt-1 border border-subtle",
              state.selectProps.menuIsOpen && "shadow-md", // Add box-shadow when menu is open
              props.classNames?.menu && props.classNames.menu(state),
            ),
          groupHeading: () => "leading-none text-xs uppercase text-foreground-900 pl-2.5 pt-4 pb-2",
          menuList: (state) =>
            tw("rounded-md", props.classNames?.menuList && props.classNames.menuList(state)),
          indicatorsContainer: (state) =>
            tw(
              state.selectProps.menuIsOpen
                ? state.isMulti
                  ? "[&>*:last-child]:rotate-180 [&>*:last-child]:transition-transform"
                  : "rotate-180 transition-transform"
                : "text-foreground-900", // Woo it adds another SVG here on multi for some reason
              props.classNames?.indicatorsContainer && props.classNames.indicatorsContainer(state),
            ),
          multiValueRemove: () => "text-foreground-900 py-auto ml-2",
          noOptionsMessage: () => "h-12 py-2 flex items-center justify-center",
        }}
      />
      {errorMessage && <div className="text-negative-600 text-sm">{errorMessage}</div>}
    </label>
  );
}

export type { ITimezone, ITimezoneOption };
