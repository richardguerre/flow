import clsx from "clsx";

export type SpinnerProps = {
  xs?: boolean;
  sm?: boolean;
  lg?: boolean;
};

export const Spinner = (props: SpinnerProps) => {
  const size = {
    xs: "h-4 w-4 border-2",
    sm: "h-6 w-6 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-10 w-10 border-4",
  }[props.xs ? "xs" : props.sm ? "sm" : props.lg ? "lg" : "md"];
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          "border-t-primary-700 border-background-50 z-10 animate-spin rounded-full",
          size
        )}
      />
    </div>
  );
};
