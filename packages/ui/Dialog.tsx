import {
  Close,
  Content,
  Description,
  DialogPortalProps,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { tw } from "./tw";
import { forwardRef } from "react";
import { BsX } from "@flowdev/icons";

export const Dialog = (props: React.ComponentProps<typeof Root> & { onClose?: () => void }) => (
  <Root
    {...props}
    onOpenChange={(open) => {
      !open && props.onClose?.();
      props.onOpenChange?.(open);
    }}
  />
);
export const DialogTrigger = Trigger;
export const DialogPortal = ({ className, ...props }: DialogPortalProps) => (
  <Portal className={tw(className)} {...props} />
);

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={tw(
      "data-[state=open]:animate-fade-in data-[state=open]:animate-duration-200 data-[state=closed]:animate-fade-out data-[state=closed]:animate-duration-200 fixed inset-0 z-50 bg-gray-400/30 backdrop-blur-sm duration-200",
      className
    )}
    {...props}
  />
));

export const DialogContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <Content
      ref={ref}
      className={tw(
        "bg-background-50 ring-0.5 ring-primary-100 data-[state=open]:animate-duration-200 data-[state=open]:animate-fade-in data-[state=open]:animate-duration-200 data-[state=closed]:animate-fade-out data-[state=closed]:animate-duration-200 fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
        className
      )}
      {...props}
    >
      {children}
      <Close className="ring-offset-background-50 focus:ring-primary-300 data-[state=open]:bg-background-100 data-[state=open]:text-foreground-700 absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
        <BsX size="16" />
        <span className="sr-only">Close</span>
      </Close>
    </Content>
  </DialogPortal>
));

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={tw("flex flex-col gap-1.5 text-center sm:text-left", className)} {...props} />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={tw("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2", className)}
    {...props}
  />
);

export const DialogTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={tw("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));

export const DialogDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description ref={ref} className={tw("text-foreground-700 text-sm", className)} {...props} />
));
