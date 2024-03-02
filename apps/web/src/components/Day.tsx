import { useEffect, useRef, useState } from "react";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { Day_day$key } from "@flowdev/web/relay/__generated__/Day_day.graphql";
import { TaskCard } from "./TaskCard";
import { dayjs } from "@flowdev/web/dayjs";
import { ReactSortable, Sortable } from "react-sortablejs";
import { DayContent_day$key } from "@flowdev/web/relay/__generated__/DayContent_day.graphql";
import { DayUpdateTaskDateMutation } from "@flowdev/web/relay/__generated__/DayUpdateTaskDateMutation.graphql";
import { DayAddTaskActionsBar_day$key } from "@flowdev/web/relay/__generated__/DayAddTaskActionsBar_day.graphql";
import { NewTaskCard } from "./NewTaskCard";
import { Button } from "@flowdev/ui/Button";
import { environment } from "@flowdev/web/relay/environment";
import { OnCreateTaskItemRecordToCreateTaskFrom_item$data } from "@flowdev/web/relay/__generated__/OnCreateTaskItemRecordToCreateTaskFrom_item.graphql";
import { getPlugins } from "@flowdev/web/getPlugin";
import { OnCreateTask, OnCreateTaskProps, PluginStepInfo } from "./OnCreateTask";

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
    props.day,
  );

  const dayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    if (day.date === today && dayRef.current) {
      dayRef.current.scrollIntoView({ inline: "start", behavior: "auto" });
    }
  }, [dayRef]);

  return (
    <div className="relative flex h-full w-64 flex-col">
      <div ref={dayRef} className="absolute -left-2" />
      <div className="mb-3 px-2">
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
} | null;

type DayContentProps = {
  day: DayContent_day$key;
};

export const DayContent = (props: DayContentProps) => {
  const [createTaskFromItemState, setCreateTaskFromItemState] = useState<Omit<
    OnCreateTaskProps,
    "onClose"
  > | null>(null);
  const day = useFragment(
    graphql`
      fragment DayContent_day on Day {
        date
        tasks {
          __typename
          id
          status
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
    const newTasksList = newList.filter((task) => task.__typename === "Task"); // ignore item(s) that were dropped
    setTasks(newTasksList);

    const item = newList.find((task) => task.__typename !== "Task") as { id: string } | undefined; // there shouldn't be more than one item dropped at a time, so we just find the first one
    if (!item) return;
    const store = environment.getStore().getSource();
    const itemRecord = store.get(item.id) as unknown as
      | (Omit<OnCreateTaskItemRecordToCreateTaskFrom_item$data, "pluginDatas"> & {
          pluginDatas: { __refs: string[] };
        })
      | undefined
      | null;
    if (!itemRecord) return;
    const itemRecordPluginDatas = itemRecord.pluginDatas.__refs.map((ref) => store.get(ref));
    const willBeDimissedFromInbox = !!((itemRecord.inboxPoints ?? 0) > 0 && itemRecord.list);

    const plugins = await getPlugins();
    const steps: PluginStepInfo[] = [];
    for (const [pluginSlug, plugin] of Object.entries(plugins)) {
      if (!plugin.onCreateTask) continue;
      steps.push({
        pluginSlug,
        onCreateTask: plugin.onCreateTask,
      });
    }
    const atIndex = newList.findIndex((task) => task.id === item.id);
    setCreateTaskFromItemState({
      atIndex,
      steps,
      task: {
        title: { value: itemRecord.title, overriden: false },
        status: { value: "TODO", overriden: false },
        durationInMinutes: { value: null, overriden: false },
        date: { value: day.date, overriden: false },
        item: {
          ...itemRecord,
          willBeDimissedFromInbox,
          pluginDatas:
            itemRecordPluginDatas as unknown as OnCreateTaskItemRecordToCreateTaskFrom_item$data["pluginDatas"],
        },
      },
    });
    return;
  };

  useEffect(() => {
    setTasks(structuredClone(Array.from(day.tasks)));
  }, [day.tasks]);

  useEffect(() => {
    if (updateTaskDateInfo) {
      const newTasksOrder = Array.from(updateTaskDateInfo.htmlParent.children).map(
        (task) => task.id,
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
    <>
      {createTaskFromItemState && (
        <OnCreateTask
          {...createTaskFromItemState}
          onClose={() => setCreateTaskFromItemState(null)}
        />
      )}
      <ReactSortable
        id={day.date}
        className="no-scrollbar mt-4 flex flex-auto flex-col overflow-y-scroll px-2"
        list={tasks}
        setList={setList}
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
    </>
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
    props.day,
  );
  const [showNewTaskCard, setShowNewTaskCard] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-2">
      <Button
        secondary
        sm
        className="bg-background-300/50 text-foreground-900 hover:bg-background-300/70 active:bg-background-300/100 w-full"
        onClick={() => setShowNewTaskCard(true)}
      >
        Add task
      </Button>
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
