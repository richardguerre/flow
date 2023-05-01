import dayjs from "dayjs";

type DurationBadgeProps = {
  durationInMinutes: number;
};

export const DurationBadge = (props: DurationBadgeProps) => {
  return (
    <div className="inline-flex h-min rounded-md bg-primary-100 px-1 py-[1px] text-sm text-primary-600">
      {twoDigits(Math.floor(props.durationInMinutes / 60))}:
      {twoDigits(props.durationInMinutes % 60)}
    </div>
  );
};

const twoDigits = (n: number, digits: number = 2) =>
  n.toLocaleString("en-US", { minimumIntegerDigits: digits });

type TimeBadgeProps = {
  time: string;
};

export const TimeBadge = (props: TimeBadgeProps) => {
  return (
    <div className="inline-flex h-min rounded-md bg-primary-100 px-1 py-[1px] text-sm text-primary-600">
      {dayjs(props.time).format("HH:mm")}
    </div>
  );
};
