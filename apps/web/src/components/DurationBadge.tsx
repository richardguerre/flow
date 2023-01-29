import { FC } from "react";

type DurationBadge = {
  durationInMinutes: number;
};

export const DurationBadge: FC<DurationBadge> = (props) => {
  return (
    <div>
      {(props.durationInMinutes / 60).toFixed(0)}:{props.durationInMinutes % 60}
    </div>
  );
};
