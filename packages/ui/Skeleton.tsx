import { tw } from "./tw";

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={tw("bg-foreground-600/40 animate-pulse rounded-sm", className)} {...props} />
  );
};
