import { useEffect, useRef, useState } from "react";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { Day_day$key } from "@flowdev/web/relay/__generated__/Day_day.graphql";
import { TaskCard } from "./TaskCard";
import { dayjs } from "@flowdev/web/dayjs";
import { ReactSortable, Sortable } from "react-sortablejs";
import { DayContent_day$key } from "../relay/__generated__/DayContent_day.graphql";
import { DayUpdateTaskDateMutation } from "../relay/__generated__/DayUpdateTaskDateMutation.graphql";
import { DayAddTaskActionsBar_day$key } from "../relay/__generated__/DayAddTaskActionsBar_day.graphql";
import { NewTaskCard } from "./NewTaskCard";

type DayProps = {
  day: Day_day$key;
  label?: string;
};

export const Day = (props: DayProps) => {
  const day = useFragment(
    graphql`
      fragment Day_day on Day {
        date
        ...DayContent_day
        ...DayAddTaskActionsBar_day
      }
    `,
    props.day
  );

  const dayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dayRef.current) {
      const today = dayjs().format("YYYY-MM-DD");
      if (day.date === today) {
        dayRef.current.scrollIntoView({ inline: "start", behavior: "auto" });
      }
    }
  }, [dayRef]);

  return (
    <div ref={dayRef} className="flex h-full w-64 flex-col pl-4">
      {/* pl-4 is needed for scrollIntoView to not scroll with the day flush to the left */}
      <div className="mb-3">
        <button
          className="hover:text-primary-400 active:text-primary-600 text-xl font-semibold"
          onClick={() => dayRef.current?.scrollIntoView({ inline: "start", behavior: "smooth" })}
          disabled={!!props.label}
        >
          {props.label ?? dayOfWeekArr[dayjs(day.date).day()]}
        </button>
        <div className="text-foreground-800 text-sm">{dayjs(day.date).format("MMMM D")}</div>
      </div>
      <DayAddTaskActionsBar day={day} />
      <DayContent day={day} />
    </div>
  );
};

type UpdateTaskDateInfo = {
  movedTaskId: string;
  htmlParent: HTMLElement;
  from: HTMLElement;
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
      from: e.from,
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
        optimisticUpdater: (store) => {
          // get the previous date of the task
          const {from, movedTaskId, htmlParent  } = updateTaskDateInfo;
          const fromLocation = store.get(`Day_${from.id}`);
          //get all tasks for the previous data
          const fromTasks = fromLocation?.getLinkedRecords("tasks");
          // remove the task from the current date
          const newFromTasks = fromTasks?.filter(
            (t) => t.getDataID() !== updateTaskDateInfo.movedTaskId
          );
          fromLocation?.setLinkedRecords(newFromTasks, "tasks");
          //get the task you are moving
          const taskToMove = fromTasks?.find(
            (t) => t.getDataID() === movedTaskId
          );
          //get the date you ingtend to move it to
          const to = store.get(`Day_${htmlParent.id}`);
          //get the tasks that are already under the intended date
          const toTasks = to?.getLinkedRecords("tasks");
          // move the task to the new date
          const newToTasks = !!taskToMove ? [taskToMove, ...(toTasks ?? [])] : toTasks;
          to?.setLinkedRecords(newToTasks, "tasks");
        },
      });

      setUpdateTaskDateInfo(null);
    }
  }, [updateTaskDateInfo]);

  return (
    <ReactSortable
      id={day.date}
      className="mt-4 flex flex-auto flex-col overflow-y-auto overflow-x-hidden"
      list={tasks}
      setList={() => {}}
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

type DayAddTaskActionsBarProps = {
  day: DayAddTaskActionsBar_day$key;
};

const DayAddTaskActionsBar = (props: DayAddTaskActionsBarProps) => {
  const day = useFragment(
    graphql`
      fragment DayAddTaskActionsBar_day on Day {
        date
      }
    `,
    props.day
  );
  const [showNewTaskCard, setShowNewTaskCard] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        className="bg-background-300 text-foreground-900 w-full rounded-md bg-opacity-50 px-2 py-1 text-sm hover:bg-opacity-70 active:bg-opacity-100"
        onClick={() => setShowNewTaskCard(true)}
      >
        Add task
      </button>
      {showNewTaskCard && (
        <NewTaskCard
          date={day.date}
          onSave={() => setShowNewTaskCard(false)}
          onCancel={() => setShowNewTaskCard(false)}
        />
      )}
    </div>
  );
};