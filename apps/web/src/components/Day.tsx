import { FC, useMemo, useRef } from "react";
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
          status
          ...TaskCard_task
        }
      }
    `,
    props.day
  );

  const dayRef = useRef<HTMLDivElement>(null);

  const { tasksTodo, tasksDone, tasksCanceled } = useMemo(() => {
    return {
      tasksTodo: day.tasks.filter((task) => task.status === "TODO"),
      tasksDone: day.tasks.filter((task) => task.status === "DONE"),
      tasksCanceled: day.tasks.filter((task) => task.status === "CANCELED"),
    };
  }, [day.tasks]);

  return (
    <div ref={dayRef} className="flex flex-col h-full pl-4 w-64">
      {/* pl-4 is needed for scrollIntoView to not scroll the day flush to the left */}
      <div className="mb-3">
        <button
          className="font-semibold text-xl hover:text-primary-400 active:text-primary-600"
          onClick={() => dayRef.current?.scrollIntoView({ inline: "start", behavior: "smooth" })}
        >
          {dayOfWeekArr[dayjs(day.date).day()]}
        </button>
        <div className="text-sm text-foreground-800">{dayjs(day.date).format("MMMM D")}</div>
      </div>
      <DayAddTaskActionsBar />
      <div className="flex flex-col mt-4 overflow-y-scroll">
        {tasksTodo.map((task) => (
          <div key={task.id} className="pb-4">
            <TaskCard task={task} />
          </div>
        ))}
        {tasksDone.map((task) => (
          <div key={task.id} className="pb-4">
            <TaskCard task={task} />
          </div>
        ))}
        {tasksCanceled.map((task) => (
          <div key={task.id} className="pb-4">
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
  return (
    <button className="rounded-md bg-background-300 bg-opacity-50 text-sm w-full py-1 px-2 text-foreground-900 hover:bg-opacity-70 active:bg-opacity-100">
      Add task
    </button>
  );
};
