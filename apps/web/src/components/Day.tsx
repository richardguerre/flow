import { FC } from "react";
import { graphql, useFragment } from "@flowdev/relay";
import { Day_day$key } from "@flowdev/web/relay/__generated__/Day_day.graphql";
import { TaskCard } from "./TaskCard";
import dayjs from "dayjs";

type DayProps = {
  day: Day_day$key;
};

export const Day: FC<DayProps> = (props) => {
  const day = useFragment(
    graphql`
      fragment Day_day on Day {
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
      <div>
        <div>{dayOfWeekArr[dayjs(day.date).day()]}</div>
        <div>{dayjs(day.date).format("MMM D")}</div>
      </div>
      <DayAddTaskActionsBar />
      <div>
        {day.tasks.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

const dayOfWeekArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const DayAddTaskActionsBar: FC = (props) => {
  return <div>Add task</div>;
};
