import React from "react";
import { tw } from "./tw";
import { IconContext } from "@flowdev/icons";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  hasError?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <IconContext.Provider value={{ size: "16px" }}>
      <div
        className={tw(
          "text-foreground-700 relative flex items-center",
          props.fullWidth && "w-full",
          props.hasError && "text-negative-600"
        )}
      >
        {props.leftIcon && <div className="absolute pl-3">{props.leftIcon}</div>}
        <input
          {...props}
          ref={ref}
          className={tw(
            "ring-primary-200 placeholder:text-foreground-700 text-foreground-900 disabled:bg-background-300/50 disabled:ring-none hover:ring-primary-300 focus:ring-primary-500 w-full rounded-md px-3 py-2 text-sm outline-none ring transition-colors duration-300 ease-in-out",
            props.leftIcon && "pl-10",
            props.rightIcon && "pr-10",
            props.hasError &&
              "ring-negative-600 hover:ring-negative-600 placeholder:text-negative-600",
            props.className
          )}
        />
        {props.rightIcon && <div className="absolute right-0 pr-3">{props.rightIcon}</div>}
      </div>
    </IconContext.Provider>
  );
});
