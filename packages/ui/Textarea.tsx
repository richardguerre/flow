import React from "react";
import clsx from "clsx";
import { Label } from "./label";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  description?: string;
  error?: string | { message: string };
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
      {props.description && <div className="text-foreground-800 text-sm">{props.description}</div>}
      <textarea
        {...props}
        ref={ref}
        className={clsx(
          "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          props.className
        )}
      />
      {props.error && (
        <div className="text-negative-500 text-sm">
          {typeof props.error === "object" ? props.error.message : props.error}
        </div>
      )}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
