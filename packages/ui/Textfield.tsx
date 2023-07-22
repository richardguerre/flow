import React from "react";
import { tw } from "./tw";
import { Label } from "./label";

export type TextfieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  error?: string | { message: string };
};

const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>((props, ref) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
      {props.description && <div className="text-foreground-800 text-sm">{props.description}</div>}
      <input
        {...props}
        ref={ref}
        className={tw(
          "placeholder:text-foreground-700 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
Textfield.displayName = "Textfield";

export { Textfield };
