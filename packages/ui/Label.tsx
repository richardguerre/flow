import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import LabelPrimitive from "@radix-ui/react-label";
import clsx from "clsx";

type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>((props, ref) => (
  <LabelPrimitive.Root
    {...props}
    ref={ref}
    className={clsx(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      props.className
    )}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
