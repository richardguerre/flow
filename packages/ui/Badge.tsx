import { ReactNode } from "react";
import { tw } from "./tw";

type Props = {
  children: ReactNode;
  className?: string;
};
export const Badge = (props: Props) => {
  return (
    <div
      className={tw(
        "bg-primary-100 text-primary-600 inline-flex h-min rounded px-1 py-px text-sm",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
