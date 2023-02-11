import React, { forwardRef } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  sm?: boolean;
  lg?: boolean;
  fullWidth?: boolean;
};

/**
 * This is a button component.
 *
 * Props:
 * - `children` - The content of the button
 * - `onClick?` - The function to call when the button is clicked
 * - `secondary?` - Secondary variant of the button
 * - `tertiary?` - Tertiary variant of the button
 * - `sm?` - Small variant of the button
 * - `lg?` - Large variant of the button
 * - `fullWidth?` - Whether the button should take up the full width of its container
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  let className = "rounded-md text-sm ";

  if (props.tertiary) {
    className += " bg-transparent text-primary-500 hover:text-primary-400 active:text-primary-600";
  } else if (props.secondary) {
    className +=
      " bg-primary-100 bg-opacity-70 text-primary-500 hover:bg-opacity-100 active:(bg-primary-200 bg-opacity-70)";
  } else {
    // Default to primary
    className +=
      " bg-primary-500 bg-opacity-100 text-background-50 hover:bg-primary-600 active:bg-primary-700";
  }

  if (props.sm) {
    className += " px-2 py-1";
  } else if (props.lg) {
    className += " px-4 py-2";
  } else {
    // Default to medium
    className += " px-3 py-2";
  }

  if (props.fullWidth) {
    className += " w-full";
  }

  return (
    <button ref={ref} onClick={props.onClick} className={className}>
      {props.children}
    </button>
  );
});
