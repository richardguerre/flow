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
        "bg-primary-100 text-primary-600 py-0.25 inline-flex h-min rounded px-1 text-sm",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
