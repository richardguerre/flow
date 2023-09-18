import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Select } from "./Select";
import { FieldError, Controller, ControllerProps, FieldValues, FieldPath } from "react-hook-form";

export type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  children: ReactNode;
  disabled?: boolean;
  required?: boolean;
  selectProps?: ComponentPropsWithoutRef<typeof Select>;
  label?: string;
  description?: string;
  error?: string | FieldError;
};

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FormSelectProps<TFieldValues, TName>
) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <Select
          {...props.selectProps}
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value);
            props.selectProps?.onValueChange?.(value);
          }}
          onOpenChange={(open) => {
            open && field.onBlur();
            props.selectProps?.onOpenChange?.(open);
          }}
          name={field.name}
          disabled={props.disabled || props.selectProps?.disabled}
          required={props.required || props.selectProps?.required}
        >
          {props.children}
        </Select>
      )}
    />
  );
};
