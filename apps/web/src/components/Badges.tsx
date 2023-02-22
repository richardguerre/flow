import dayjs from "dayjs";

type DurationBadgeProps = {
  durationInMinutes: number;
};

export const DurationBadge = (props: DurationBadgeProps) => {
  return (
    <div className="rounded-md h-min bg-primary-100 text-sm py-[1px] px-1 text-primary-600 inline-flex">
      {Math.floor(props.durationInMinutes / 60)}:{props.durationInMinutes % 60}
    </div>
  );
};

type TimeBadgeProps = {
  time: string;
};

export const TimeBadge = (props: TimeBadgeProps) => {
  return (
    <div className="rounded-md h-min bg-primary-100 text-sm py-[1px] px-1 text-primary-600 inline-flex">
      {dayjs(props.time).format("HH:mm")}
    </div>
  );
};
