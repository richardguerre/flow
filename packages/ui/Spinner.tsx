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
          "border-t-primary-700 animate-spin rounded-full border-4 border-white",
          props.sm ? "h-6 w-6" : props.lg ? "h-10 w-10" : "h-8 w-8"
        )}
      />
    </div>
  );
};
