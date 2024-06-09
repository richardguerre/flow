import { useEffect, useRef, useState } from "react";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { Day_day$key } from "@flowdev/web/relay/__generated__/Day_day.graphql";
import { TaskCard } from "./TaskCard";
import { dayjs } from "@flowdev/web/dayjs";
import { ReactSortable, Sortable } from "react-sortablejs";
import { DayContent_day$key } from "@flowdev/web/relay/__generated__/DayContent_day.graphql";
import { DayUpdateTaskDateMutation } from "@flowdev/web/relay/__generated__/DayUpdateTaskDateMutation.graphql";
import { DayAddTaskActionsBar_day$key } from "@flowdev/web/relay/__generated__/DayAddTaskActionsBar_day.graphql";
import { Button } from "@flowdev/ui/Button";
import { environment } from "@flowdev/web/relay/environment";
import { OnCreateTaskItemRecordToCreateTaskFrom_item$data } from "@flowdev/web/relay/__generated__/OnCreateTaskItemRecordToCreateTaskFrom_item.graphql";
import { getPlugins } from "@flowdev/web/getPlugin";
import { OnCreateTask, OnCreateTaskProps, PluginStepInfo } from "./OnCreateTask";
import { DragContext, useDragContext } from "../useDragContext";
import { getStartOfToday } from "./CalendarList";

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
    const today = getStartOfToday().format("YYYY-MM-DD");
    if (day.date === today && dayRef.current) {
      dayRef.current.scrollIntoView({ inline: "start", behavior: "auto" });
    }
  }, [dayRef]);

  return (
    <div className="relative flex h-full w-64 flex-col shrink-0">
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
  over: DragContext["over"];
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
          ...TaskCard_task
        }
      }
    `,
    props.day,
  );
  const { setDragged, over } = useDragContext();

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
      over,
    });
  };

  const setList = async (newList: typeof tasks) => {
    setDragged(null); // reset DragContext as TaskCard.onDragEnd may not be called
    setTasks(newList.filter((task) => task.__typename === "Task")); // ignore item(s) that were dropped

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
    const willBeDimissedFromInbox = !!((itemRecord.inboxPoints ?? 0) > 0 && itemRecord.listId);

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
    if (!updateTaskDateInfo || updateTaskDateInfo.over === "lists") return; // as the Lists component may be super-imposed on top of the Day component (in the IndexView), the Day component is still a drop target but needs to be ignored as the user is trying to move the task to the Lists component
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
    <>
      {createTaskFromItemState && (
        <OnCreateTask
          {...createTaskFromItemState}
          onClose={() => setCreateTaskFromItemState(null)}
        />
      )}
      <ReactSortable
        id={day.date}
        className="no-scrollbar mt-4 flex flex-auto flex-col gap-4 overflow-y-scroll px-2 pb-4"
        list={tasks}
        setList={setList}
        animation={150}
        delayOnTouchOnly
        delay={100}
        group="shared"
        onEnd={handleTaskMove}
        disabled={over === "lists"}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
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

  return (
    <div className="flex flex-col gap-4 px-2">
      <Button
        secondary
        sm
        className="bg-background-300/50 text-foreground-900 hover:bg-background-300/70 active:bg-background-300/100 w-full"
        onClick={() => createVirtualTask({ date: day.date })}
      >
        Add task
      </Button>
    </div>
  );
};

export const createVirtualTask = (props: { date: string }) => {
  const tempId = `Task_${Math.random()}`;
  environment.commitUpdate((store) => {
    const createdTask = store
      .create(tempId, "Task")
      .setValue(tempId, "id")
      .setValue("", "title")
      .setValue(new Date().toISOString(), "createdAt")
      .setValue("TODO", "status")
      .setValue(null, "completedAt")
      .setValue(props.date, "date")
      .setValue(null, "item")
      .setValue(null, "durationInMinutes")
      .setLinkedRecords([], "pluginDatas")
      .setLinkedRecords([], "subtasks");

    const dayRecord = store.get(`Day_${props.date}`);
    const dayTasks = dayRecord?.getLinkedRecords("tasks");
    // This adds the new task to the top of the list
    dayRecord?.setLinkedRecords([createdTask, ...(dayTasks ?? [])], "tasks");
  });
};

export const deleteVirtualTask = (tempId: string) => {
  environment.commitUpdate((store) => {
    const task = store.get(tempId);
    if (!task) return;
    const day = store.get(`Day_${task.getValue("date")}`);
    const dayTasks = day?.getLinkedRecords("tasks");
    day?.setLinkedRecords(dayTasks?.filter((task) => task.getDataID() !== tempId) ?? [], "tasks");
    // store.delete(tempId); this causes a render issue so for now I'm not including it.
  });
};
