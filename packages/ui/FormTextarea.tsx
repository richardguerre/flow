import { ReactNode, forwardRef } from "react";
import { Textarea, TextareaProps } from "./Textarea";
import type { FieldError } from "react-hook-form";

export type FormTextareaProps = TextareaProps & {
  label?: string;
  description?: string | ReactNode;
  error?: string | FieldError;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>((props, ref) => {
  const errorMessage = typeof props.error === "object" ? props.error.message : props.error;
  return (
    <label className="flex flex-col gap-1">
      {props.label && (
        <div className="text-foreground-900 text-base font-medium">{props.label}</div>
      )}
      {typeof props.description === "string" ? (
        <div className="text-foreground-700 text-sm">{props.description}</div>
      ) : (
        props.description
      )}
      <Textarea {...props} ref={ref} hasError={!!errorMessage || props.hasError} />
      {errorMessage && <div className="text-negative-600 text-sm">{errorMessage}</div>}
    </label>
  );
});
