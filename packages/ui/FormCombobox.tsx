import { ComponentPropsWithoutRef, ReactNode } from "react";
import { FieldError, Controller, ControllerProps, FieldValues, FieldPath } from "react-hook-form";
import { Combobox } from "./Combobox";
import { tw } from "./tw";

type FormComboboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  children: ReactNode;
  multiselect?: boolean;
  comboboxProps?: ComponentPropsWithoutRef<typeof Combobox>;
  fullWidth?: boolean;
  label?: string;
  error?: string | FieldError;
};
/**
 * Wrapper around Combobox to use it with react-hook-form by simply passing the props of Controller component (i.e. name, control, rules, etc.).
 *
 * Then add any Combobox child component like ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxItem, etc. as children.
 */
export const FormCombobox = (props: FormComboboxProps) => {
  const errorMessage = typeof props.error === "object" ? props.error.message : props.error;
  return (
    <label className={tw("flex flex-col gap-1", props.fullWidth && "w-full")}>
      {props.label && (
        <div className="text-foreground-900 text-base font-medium">{props.label}</div>
      )}
      <Controller
        {...props}
        render={({ field }) => (
          <Combobox
            {...props.comboboxProps}
            {...(props.multiselect || props.comboboxProps?.multiselect
              ? {
                  multiselect: true,
                  value: field.value,
                  onValuesChange: (values) => {
                    field.onChange(values);
                    // @ts-ignore as the types are complicated but the logic is correct
                    props.comboboxProps?.onValuesChange?.(values);
                  },
                }
              : {
                  value: field.value,
                  onValueChange: (value) => {
                    field.onChange(value);
                    // @ts-ignore as the types are complicated but the logic is correct
                    props.comboboxProps?.onValueChange?.(value);
                  },
                })}
            onOpenChange={(open) => {
              !open && field.onBlur();
              props.comboboxProps?.onOpenChange?.(open);
            }}
          >
            {props.children}
          </Combobox>
        )}
      />
      {errorMessage && <div className="text-negative-600 text-sm">{errorMessage}</div>}
    </label>
  );
};
