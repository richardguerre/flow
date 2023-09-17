import { dayjs } from "@flowdev/web/dayjs";
import { Badge } from "@flowdev/ui/Badge";

type DurationBadgeProps = {
  durationInMinutes: number;
};

export const DurationBadge = (props: DurationBadgeProps) => {
  return (
    <Badge>
      {twoDigits(Math.floor(props.durationInMinutes / 60))}:
      {twoDigits(props.durationInMinutes % 60)}
    </Badge>
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
