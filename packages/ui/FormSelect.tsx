import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Select } from "./Select";
import { FieldError, Controller, ControllerProps, FieldValues, FieldPath } from "react-hook-form";
import { tw } from "./tw";

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
  fullWidth?: boolean;
};
export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FormSelectProps<TFieldValues, TName>
) => {
  const errorMessage = typeof props.error === "object" ? props.error.message : props.error;
  return (
    <label className={tw("flex flex-col gap-1", props.fullWidth && "w-full")}>
      {props.label && (
        <div className="text-foreground-900 text-base font-medium">{props.label}</div>
      )}
      {props.description && <div className="text-foreground-700 text-sm">{props.description}</div>}
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
              !open && field.onBlur();
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
      {errorMessage && <div className="text-negative-600 text-sm">{errorMessage}</div>}
    </label>
  );
};
