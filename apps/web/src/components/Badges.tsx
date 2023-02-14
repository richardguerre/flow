import dayjs from "dayjs";
import { FC } from "react";

type DurationBadge = {
  durationInMinutes: number;
};

export const DurationBadge: FC<DurationBadge> = (props) => {
  return (
    <div className="rounded-md h-min bg-primary-100 text-sm py-[2px] px-1 text-primary-700 inline-flex">
      {(props.durationInMinutes / 60).toFixed(0)}:{props.durationInMinutes % 60}
    </div>
  );
};

type TimeBadgeProps = {
  time: string;
};

export const TimeBadge = (props: TimeBadgeProps) => {
  return (
    <div className="rounded-md h-min bg-primary-100 text-sm py-[2px] px-1 text-primary-700 inline-flex">
      {dayjs(props.time).format("HH:mm")}
    </div>
  );
};
