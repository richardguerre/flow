import { useEffect, useState } from "react";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { Day_day$key } from "@flowdev/mobile-pwa/relay/__gen__/Day_day.graphql";
import { TaskCard } from "./TaskCard";
import { dayjs } from "@flowdev/mobile-pwa/dayjs";
import { ReactSortable, Sortable } from "react-sortablejs";
import { DayContent_day$key } from "@flowdev/mobile-pwa/relay/__gen__/DayContent_day.graphql";
import { DayUpdateTaskDateMutation } from "@flowdev/mobile-pwa/relay/__gen__/DayUpdateTaskDateMutation.graphql";

type DayProps = {
  day: Day_day$key;
};

export const Day = (props: DayProps) => {
  const day = useFragment(
    graphql`
      fragment Day_day on Day {
        date
        ...DayContent_day
      }
    `,
    props.day,
  );

  return (
    <div className="flex h-full flex-col shrink-0">
      <div className="px-4 pt-4">
        <div className="active:text-primary-600 text-3xl font-semibold">
          {dayOfWeekArr[dayjs(day.date).day()]}
        </div>
        <div className="text-foreground-700 text-base">{dayjs(day.date).format("MMMM D")}</div>
      </div>
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

export const DayContent = (props: DayContentProps) => {
  const day = useFragment(
    graphql`
      fragment DayContent_day on Day {
        date
        tasks {
          __typename
          id
          ...TaskCard_task
        }
      }
    `,
    props.day,
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

  const setList = async (newList: typeof tasks) => {
    setTasks(newList.filter((task) => task.__typename === "Task")); // ignore item(s) that were dropped
    return;
  };

  useEffect(() => {
    setTasks(structuredClone(Array.from(day.tasks)));
  }, [day.tasks]);

  useEffect(() => {
    if (!updateTaskDateInfo) return; // as the Lists component may be super-imposed on top of the Day component (in the IndexView), the Day component is still a drop target but needs to be ignored as the user is trying to move the task to the Lists component
    const newTasksOrder = Array.from(updateTaskDateInfo.htmlParent.children).map((task) => task.id);

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
  }, [updateTaskDateInfo]);

  return (
    <ReactSortable
      id={day.date}
      className="no-scrollbar mt-4 flex flex-auto flex-col gap-4 overflow-y-scroll px-4 pb-4"
      list={tasks}
      setList={setList}
      animation={150}
      delayOnTouchOnly
      delay={100}
      group="shared"
      onEnd={handleTaskMove}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
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
