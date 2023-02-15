import { FC, useEffect, useRef, useState } from "react";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { Day_day$key } from "@flowdev/web/relay/__generated__/Day_day.graphql";
import { TaskCard } from "./TaskCard";
import dayjs from "dayjs";
import { ReactSortable, Sortable } from "react-sortablejs";
import { DayContent_day$key } from "../relay/__generated__/DayContent_day.graphql";
import { DayUpdateTaskDateMutation } from "../relay/__generated__/DayUpdateTaskDateMutation.graphql";

type DayProps = {
  day: Day_day$key;
};

export const Day: FC<DayProps> = (props) => {
  const day = useFragment(
    graphql`
      fragment Day_day on Day {
        date
        ...DayContent_day
      }
    `,
    props.day
  );

  const dayRef = useRef<HTMLDivElement>(null);

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
      <DayContent day={day} />
    </div>
  );
};

type UpdateTaskDateInfo = {
  movedTaskId: string;
  htmlParent: HTMLElement;
} | null;

type DayContentProps = {
  day: DayContent_day$key;
};

const DayContent = (props: DayContentProps) => {
  const day = useFragment(
    graphql`
      fragment DayContent_day on Day {
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

  const [udpateTaskDate] = useMutation<DayUpdateTaskDateMutation>(graphql`
    mutation DayUpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
      updateTaskDate(input: $input) {
        ...Day_day
      }
    }
  `);

  const [tasks, setTasks] = useState(structuredClone(Array.from(day.tasks)));
  const [updateTaskDateInfo, setUpdateTaskDateInfo] = useState<UpdateTaskDateInfo>(null);

  const handleTaskMove = (e: Sortable.SortableEvent) => {
    setUpdateTaskDateInfo({
      htmlParent: e.to,
      movedTaskId: e.item.id,
    });
  };

  useEffect(() => {
    setTasks(structuredClone(Array.from(day.tasks)));
  }, [day.tasks]);

  useEffect(() => {
    if (updateTaskDateInfo) {
      const newTasksOrder = Array.from(updateTaskDateInfo.htmlParent.children).map(
        (task) => task.id
      );

      udpateTaskDate({
        variables: {
          input: {
            id: updateTaskDateInfo.movedTaskId,
            date: updateTaskDateInfo.htmlParent.id,
            newTasksOrder,
          },
        },
      });

      setUpdateTaskDateInfo(null);
    }
  }, [updateTaskDateInfo]);

  return (
    <ReactSortable
      id={day.date}
      className="flex flex-col flex-auto mt-4 overflow-y-auto overflow-x-hidden"
      list={tasks}
      setList={setTasks} // TOOD: use mutation optimistic updater instead
      animation={150}
      delayOnTouchOnly
      delay={100}
      group="shared"
      onEnd={handleTaskMove}
    >
      {tasks.map((task) => (
        <div id={task.id} key={task.id} className="pb-4">
          <TaskCard task={task} />
        </div>
      ))}
    </ReactSortable>
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
