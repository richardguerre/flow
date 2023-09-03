import { dayjs } from "@flowdev/web/dayjs";

type DurationBadgeProps = {
  durationInMinutes: number;
};

export const DurationBadge = (props: DurationBadgeProps) => {
  return (
    <div className="bg-primary-100 text-primary-600 inline-flex h-min rounded px-1 py-[1px] text-sm">
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
    <div className="inline-flex h-min rounded bg-green-100 px-1 py-[1px] text-sm text-green-700">
      {dayjs(props.time).format("HH:mm")}
    </div>
  );
};
