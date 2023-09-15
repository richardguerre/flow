import { useEffect, useRef, useState } from "react";
import { graphql, useFragment, useMutation, useMutationPromise } from "@flowdev/relay";
import { Day_day$key } from "@flowdev/web/relay/__generated__/Day_day.graphql";
import { TaskCard } from "./TaskCard";
import { dayjs } from "@flowdev/web/dayjs";
import { ReactSortable, Sortable } from "react-sortablejs";
import { DayContent_day$key } from "../relay/__generated__/DayContent_day.graphql";
import { DayUpdateTaskDateMutation } from "../relay/__generated__/DayUpdateTaskDateMutation.graphql";
import { DayAddTaskActionsBar_day$key } from "../relay/__generated__/DayAddTaskActionsBar_day.graphql";
import { NewTaskCard } from "./NewTaskCard";
import { Button, ButtonProps } from "@flowdev/ui/Button";
import { environment } from "../relay/environment";
import { toast } from "@flowdev/ui/Toast";
import {
  DayCreateTaskFromItemMutation,
  TaskStatus,
} from "../relay/__generated__/DayCreateTaskFromItemMutation.graphql";
import { DayItemRecordToCreateTaskFrom_item$data } from "../relay/__generated__/DayItemRecordToCreateTaskFrom_item.graphql";
import { DayDismissItemFromInboxMutation } from "../relay/__generated__/DayDismissItemFromInboxMutation.graphql";

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
    props.day
  );

  const [udpateTaskDate] = useMutation<DayUpdateTaskDateMutation>(graphql`
    mutation DayUpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
      updateTaskDate(input: $input) {
        ...Day_day
      }
    }
  `);

  const [createTaskFromItem] = useMutationPromise<DayCreateTaskFromItemMutation>(graphql`
    mutation DayCreateTaskFromItemMutation($input: MutationCreateTaskInput!) {
      createTask(input: $input) {
        __typename
        id
        status
        ...TaskCard_task
      }
    }
  `);

  const [_dismissItemFromInbox] = useMutation<DayDismissItemFromInboxMutation>(graphql`
    mutation DayDismissItemFromInboxMutation($input: MutationDismissItemFromInboxInput!) {
      dismissItemFromInbox(input: $input) {
        id
        inboxPoints
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

    const items = newList.filter((task) => task.__typename !== "Task") as { id: string }[];
    const store = environment.getStore().getSource();
    for (const item of items) {
      if (!store.has(item.id)) continue;
      const index = newList.findIndex((task) => task.id === item.id);
      const itemRecord = store.get(item.id) as unknown as DayItemRecordToCreateTaskFrom_item$data;
      const createTask = createTaskFromItem({
        variables: {
          input: {
            date: day.date,
            title: itemRecord.title,
            status: "TODO",
            itemId: itemRecord.id,
            atIndex: index,
          },
        },
        updater: (updaterStore) => {
          const updaterDay = updaterStore.get(`Day_${day.date}`);
          const updaterDayTasks = updaterDay?.getLinkedRecords("tasks") ?? [];
          const createdTask = updaterStore.getRootField("createTask");
          // This adds the new task to where the item was dropped
          updaterDay?.setLinkedRecords(
            [
              ...(updaterDayTasks ?? []).slice(0, index),
              createdTask,
              ...(updaterDayTasks ?? []).slice(index),
            ],
            "tasks"
          );
          // This adds the new task the item's tasks
          const updaterItem = updaterStore.get(itemRecord.id);
          const updaterItemTasks = updaterItem?.getLinkedRecords("tasks");
          updaterItem?.setLinkedRecords([createdTask, ...(updaterItemTasks ?? [])], "tasks");
        },
      });
      await toast.promise(createTask, {
        loading: "Creating task...",
        error: "Failed to create task",
        success: "Task created",
      });

      // if the item was in the inbox (i.e. had inboxPoints) and the item is in a list, we can dismiss it from the inbox
      if ((itemRecord.inboxPoints ?? 0) > 0 && itemRecord.list) {
        _dismissItemFromInbox({
          variables: { input: { id: itemRecord.id } },
          optimisticUpdater: (updaterStore) => {
            const updaterItem = updaterStore.get(itemRecord.id);
            updaterItem?.setValue(0, "inboxPoints");
          },
        });
      }
    }
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

graphql`
  fragment DayItemRecordToCreateTaskFrom_item on Item {
    id
    title
    inboxPoints
    list {
      id
    }
    pluginDatas {
      pluginSlug
      min
    }
  }
`;

type PluginCreateTaskData = {
  /** Overrides to the task details. */
  taskOverrides?: {
    /** The title of the task if different than what the user inputted. */
    title?: string;
    /** The status of the task if different than the default (i.e. TODO). */
    status?: TaskStatus;
    /** The durationInMinutes of the task if different than the default. */
    durationInMinutes?: number;
    /** The date of the task if different than what the user specified. ⚠️ Recommended not to change it. */
    date?: string;
  };
  /**
   * Data that will be saved and linked to the task when it's created.
   *
   * If you don't want data to be saved but need it for the server plugin's onCreateTask hook, pass in `actionData` instead/as well.
   */
  pluginData?: {
    /** The original id of the item given by the plugin, if any. */
    originalId?: string | null;
    /** The minimum data required to render the information on task cards. */
    min: JsonValue;
    /** The full data required by the plugin to be linked to the task. */
    full: JsonValue;
  };
  /**
   * Data that will be passed into the server plugin's onCreateTask hook, but will not be saved nor linked to the task.
   *
   * If you want data to be saved and linked to the task, pass in `pluginData` instead/as well.
   */
  actionData?: JsonValue;
};
export type OnCreateTask = (input: {
  task?: {
    /** The title of the task and whether it was already overriden by another plugin. */
    title: MaybeOverriden<string>;
    /** The status of the task and whether it was already overriden by another plugin. */
    status: MaybeOverriden<TaskStatus>;
    /** The durationInMinutes of the task and whether it was already overriden by another plugin. */
    durationInMinutes: MaybeOverriden<number>;
    /** The date of the task and whether it was already overriden by another plugin. */
    date: MaybeOverriden<string>;
    /** The item the task is created from. Will be undefined if the task is not created from an item. */
    item?: DayItemRecordToCreateTaskFrom_item$data & {
      /**
       * Whether the item will be dismissed from the inbox after the task is created.
       *
       * Note: If the item didn't belong to a list, it will not be dismissed from the inbox,
       * but it will be hidden for the rest of day as the user has technically triaged the
       * item out of the inbox. The item will be present the following day.
       */
      willBeDimissedFromInbox: boolean;
    };
  };
}) =>
  | null
  | PluginCreateTaskData
  | {
      /** The component to be rendered in the modal to ask for addditional information needed to create the task. */
      modalContent: React.ComponentType<{
        /** The previously saved metadata when the user clicked on next or back and comes back to this plugin's step. Helpful to not render an empty form when they back to the same step. */
        initialMetdata: PluginCreateTaskData;
        /** To be triggered when going to the next step. The given data will be passed into the createTask mutation for the server side of the plugin to handle. */
        onNext: (metadata?: PluginCreateTaskData) => void;
        /** To be triggered when going to the previous step. The given data will be passed into the createTask mutation for the server side of the plugin to handle. */
        onBack: (metadata?: PluginCreateTaskData) => void;
        /** To be triggered when closing the modal. */
        onClose: () => void;
        /** Renders a button with the correct label (either `Create task` when it's the last step in the onCreateTask sequence, `Next` if it's not the last step). */
        NextButton: React.ComponentType<NavigationButtonProps>;
        /** Renders a button with the correct label (either `Back` when it's not the first step in the onCreateTask sequence, `Cancel` if it's the first step). */
        BackButton: React.ComponentType<NavigationButtonProps>;
      }>;
    };

type NavigationButtonProps = Omit<ButtonProps, "primary" | "secondary" | "tertiary" | "children">;

type MaybeOverriden<T> = {
  value: T;
  overriden: boolean;
};
