import { forwardRef } from "react";
import { Input, InputProps } from "./Input";
import type { FieldError } from "react-hook-form";
import { tw } from "./tw";

export type FormInputProps = InputProps & {
  label?: string;
  description?: string;
  error?: string | FieldError;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const errorMessage = typeof props.error === "object" ? props.error.message : props.error;
  return (
    <label className={tw("flex flex-col gap-1", props.fullWidth && "w-full")}>
      {props.label && (
        <div className="text-foreground-900 text-base font-medium">{props.label}</div>
      )}
      {props.description && (
        <div className="text-foreground-700 text-base">{props.description}</div>
      )}
      <Input {...props} ref={ref} className={tw(errorMessage && "ring-negative-600")} />
      {errorMessage && <div className="text-negative-600 text-sm">{errorMessage}</div>}
    </label>
  );
});
