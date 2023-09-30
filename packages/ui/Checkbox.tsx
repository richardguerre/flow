import { forwardRef } from "react";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { BsCheck } from "@flowdev/icons";
import { tw } from "./tw";

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof Root> & {
  hasError?: boolean;
};

export const Checkbox = forwardRef<React.ElementRef<typeof Root>, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <Root
      {...props}
      ref={ref}
      className={tw(
        "border-foreground-700 focus-visible:border-primary-600 data-[state=checked]:bg-primary-600 data-[state=checked]:text-primary-50 peer h-4 w-4 shrink-0 rounded-sm border shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        props.hasError &&
          "border-negative-600 hover:border-negative-600 focus-visible:border-negative-600",
        className
      )}
    >
      <Indicator className="flex items-center justify-center text-current">
        <BsCheck size={16} />
      </Indicator>
    </Root>
  )
);

export type CheckboxWithLabelProps = CheckboxProps & {
  label?: string;
};

export const CheckboxWithLabel = forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxWithLabelProps
>(({ label, ...props }, ref) => (
  <label className="flex items-start gap-2">
    <div className="pt-px">
      <Checkbox {...props} ref={ref} />
    </div>
    {label && (
      <div className={tw("text-foreground-900 text-base", props.hasError && "text-negative-600")}>
        {label}
      </div>
    )}
  </label>
));
