import { ComponentPropsWithoutRef } from "react";
import { FieldError, Controller, ControllerProps, FieldValues, FieldPath } from "react-hook-form";
import { CheckboxWithLabel } from "./Checkbox";

export type FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  checkboxProps?: ComponentPropsWithoutRef<typeof CheckboxWithLabel>;
  disabled?: boolean;
  required?: boolean;
  error?: string | FieldError;
  label?: string;
};
export const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormCheckboxProps<TFieldValues, TName>,
) => {
  const errorMessage = typeof props.error === "object" ? props.error.message : props.error;
  return (
    <div className="flex flex-col items-start gap-1">
      <Controller
        {...props}
        render={({ field }) => (
          <CheckboxWithLabel
            {...field}
            {...props.checkboxProps}
            name={field.name}
            label={props.label || props.checkboxProps?.label}
            value={field.value}
            required={props.required || props.checkboxProps?.required}
            disabled={props.disabled || props.checkboxProps?.disabled}
            onCheckedChange={(value) => {
              field.onChange(value);
              props.checkboxProps?.onCheckedChange?.(value);
            }}
          />
        )}
      />
      {errorMessage && <div className="text-negative-600 text-sm">{errorMessage}</div>}
    </div>
  );
};
