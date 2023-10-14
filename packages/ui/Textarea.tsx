import React from "react";
import { tw } from "./tw";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={tw(
        "ring-primary-200 placeholder:text-foreground-700 text-foreground-900 disabled:bg-background-300/50 disabled:ring-none hover:ring-primary-300 focus:ring-primary-500 w-full rounded-md px-3 py-2 text-sm outline-none ring transition-colors duration-300 ease-in-out",
        props.hasError &&
          "ring-negative-600 hover:ring-negative-600 focus:ring-negative-600 placeholder:text-negative-600",
        props.className,
      )}
    />
  );
});
