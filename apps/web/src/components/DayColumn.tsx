import { FC } from "react";
import { graphql, useFragment } from "@flowdev/relay";
import { DayColumn_day$key } from "@flowdev/web/relay/__generated__/DayColumn_day.graphql";
import { TaskCard } from "./TaskCard";

type DayColumnProps = {
  day: DayColumn_day$key;
};

export const DayColumn: FC<DayColumnProps> = (props) => {
  const day = useFragment(
    graphql`
      fragment DayColumn_day on Day {
        date
        tasks {
          id
          ...TaskCard_task
        }
      }
    `,
    props.day
  );
  return (
    <div className="w-60">
      <h2>{day.date}</h2>
      {day.tasks.map((task) => (
        <div key={task.id}>
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
};
