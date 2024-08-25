import React, { forwardRef } from "react";
import { Spinner } from "./Spinner";
import { tw } from "./tw";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean;
  tertiary?: boolean;
  danger?: boolean;
  sm?: boolean;
  lg?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
};

/**
 * This is a button component.
 *
 * Props:
 * - `children` - The content of the button
 * - `secondary?` - Secondary variant of the button
 * - `tertiary?` - Tertiary variant of the button
 * - `sm?` - Small variant of the button
 * - `lg?` - Large variant of the button
 * - `fullWidth?` - Whether the button should take up the full width of its container
 * - `loading?` - Whether the button is in a loading state
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      disabled={props.disabled ?? props.loading}
      className={tw(
        "rounded-md text-sm shadow-none",
        props.danger
          ? "bg-negative-500 text-negative-50 hover:bg-negative-600 active:bg-negative-700 bg-opacity-100"
          : props.secondary
            ? "bg-primary-100 text-primary-500 active:bg-primary-200 bg-opacity-70 hover:bg-opacity-100 active:bg-opacity-70"
            : props.tertiary
              ? "text-primary-500 hover:text-primary-400 active:text-primary-600 bg-transparent"
              : "bg-primary-500 text-primary-50 hover:bg-primary-600 active:bg-primary-700 bg-opacity-100",
        props.sm ? "px-2 py-1" : props.lg ? "px-4 py-3" : "px-3 py-2",
        props.loading ? "relative" : "",
        props.className,
      )}
    >
      {props.children}
      {props.loading && (
        <div className="bg-background-50 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md opacity-50">
          <Spinner sm xs={props.sm} />
        </div>
      )}
    </button>
  );
});
