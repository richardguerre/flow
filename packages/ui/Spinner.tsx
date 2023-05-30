import clsx from "clsx";

export type SpinnerProps = {
  sm?: boolean;
  lg?: boolean;
};

export const Spinner = (props: SpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          "border-t-primary-700 border-background-50 animate-spin rounded-full",
          props.sm ? "h-6 w-6 border-2" : props.lg ? "h-10 w-10 border-4" : "h-8 w-8 border-4"
        )}
      />
    </div>
  );
};
