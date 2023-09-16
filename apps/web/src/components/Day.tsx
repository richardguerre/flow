import { useEffect, useRef, useState } from "react";
import { graphql, useFragment, useMutation, useMutationPromise } from "@flowdev/relay";
import { Day_day$key } from "@flowdev/web/relay/__generated__/Day_day.graphql";
import { TaskCard } from "./TaskCard";
import { dayjs } from "@flowdev/web/dayjs";
import { ReactSortable, Sortable } from "react-sortablejs";
import { DayContent_day$key } from "@flowdev/web/relay/__generated__/DayContent_day.graphql";
import { DayUpdateTaskDateMutation } from "@flowdev/web/relay/__generated__/DayUpdateTaskDateMutation.graphql";
import { DayAddTaskActionsBar_day$key } from "@flowdev/web/relay/__generated__/DayAddTaskActionsBar_day.graphql";
import { NewTaskCard } from "./NewTaskCard";
import { Button, ButtonProps } from "@flowdev/ui/Button";
import { environment } from "@flowdev/web/relay/environment";
import { toast } from "@flowdev/ui/Toast";
import {
  DayCreateTaskFromItemMutation,
  TaskStatus,
} from "@flowdev/web/relay/__generated__/DayCreateTaskFromItemMutation.graphql";
import { DayItemRecordToCreateTaskFrom_item$data } from "@flowdev/web/relay/__generated__/DayItemRecordToCreateTaskFrom_item.graphql";
import { DayDismissItemFromInboxMutation } from "@flowdev/web/relay/__generated__/DayDismissItemFromInboxMutation.graphql";
import { Dialog, DialogContent, DialogLoading } from "@flowdev/ui/Dialog";
import { getPlugins } from "@flowdev/web/getPlugin";
import { useAsyncEffect } from "../useAsyncEffect";

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
  const [createTaskFromItemState, setCreateTaskFromItemState] = useState<Omit<
    CreateTaskFromItemProps,
    "onClose"
  > | null>(null);
  const [] = useState<[]>([]);
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

    const item = newList.find((task) => task.__typename !== "Task") as { id: string } | undefined; // there shouldn't be more than one item, so we just find the first one
    if (!item) return;
    const store = environment.getStore().getSource();
    const itemRecord = store.get(item.id) as unknown as
      | DayItemRecordToCreateTaskFrom_item$data
      | undefined
      | null;
    if (!itemRecord) return;
    const willBeDimissedFromInbox = !!((itemRecord.inboxPoints ?? 0) > 0 && itemRecord.list);

    const plugins = await getPlugins();
    const steps: StepInfo[] = [];
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
        item: { ...itemRecord, willBeDimissedFromInbox },
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
    <>
      {createTaskFromItemState && (
        <CreateTaskFromItem
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

type CreateTaskFromItemProps = {
  atIndex: number;
  steps: StepInfo[];
  task: NonNullable<Parameters<OnCreateTask>[0]["task"]>;
  onClose: () => void;
};

type StepInfo = { onCreateTask: OnCreateTask; pluginSlug: string };
type OnCreateTaskStepInfo = {
  pluginSlug: string;
  dialogContent: OnCreateTaskStepDialogContent;
  index: number;
};

const CreateTaskFromItem = (props: CreateTaskFromItemProps) => {
  const [currentStep, setCurrentStep] = useState<OnCreateTaskStepInfo | null>(null);
  const [previousStep, setPreviousStep] = useState<OnCreateTaskStepInfo | null>(null);
  const [task, setTask] = useState(props.task);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [pluginCreateTaskDatas, setPluginCreateTaskDatas] = useState<
    Record<string, PluginCreateTaskData>
  >({});

  const [createTaskFromItem] = useMutationPromise<DayCreateTaskFromItemMutation>(graphql`
    mutation DayCreateTaskFromItemMutation($input: MutationCreateTaskInput!) {
      createTask(input: $input) {
        __typename
        id
        status
        ...TaskCard_task
        item {
          ...ItemCard_item # this is to update the item card if the task was created from an item
        }
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

  const processNextStep = async (props: { steps: StepInfo[] }) => {
    setLoading(true);
    for (let i = 0; i < props.steps.length; i++) {
      const stepInfo = props.steps[i];
      const onCreateTaskResult = await stepInfo.onCreateTask({ task: task }).catch(() => null);
      if (!onCreateTaskResult) {
        continue;
      } else if (onCreateTaskResult && "dialogContent" in onCreateTaskResult) {
        setPreviousStep(currentStep);
        setCurrentStep({
          pluginSlug: stepInfo.pluginSlug,
          dialogContent: onCreateTaskResult.dialogContent,
          index: i,
        });
        break;
      } else {
        setTask((prev) => {
          if (!onCreateTaskResult.taskOverrides) return prev;
          return {
            title: {
              value: onCreateTaskResult.taskOverrides.title ?? prev.title.value,
              overriden:
                onCreateTaskResult.taskOverrides.title !== undefined || prev.title.overriden,
            },
            status: {
              value: onCreateTaskResult.taskOverrides.status ?? prev.status.value,
              overriden:
                onCreateTaskResult.taskOverrides.status !== undefined || prev.status.overriden,
            },
            durationInMinutes: {
              value:
                onCreateTaskResult.taskOverrides.durationInMinutes ?? prev.durationInMinutes.value,
              overriden:
                onCreateTaskResult.taskOverrides.durationInMinutes !== undefined ||
                prev.durationInMinutes.overriden,
            },
            date: {
              value: onCreateTaskResult.taskOverrides.date ?? prev.date.value,
              overriden: onCreateTaskResult.taskOverrides.date !== undefined || prev.date.overriden,
            },
            item: prev.item,
          };
        });
        setPluginCreateTaskDatas((prev) => ({
          ...prev,
          [stepInfo.pluginSlug]: onCreateTaskResult,
        }));
      }
    }
    setLoading(false);
  };

  useAsyncEffect(async () => {
    await processNextStep({ steps: props.steps });
  }, [props.steps]);

  const handleNext = async (metadata?: PluginCreateTaskData) => {
    if (!currentStep) return; // this should never happen since we initialize the currentStep to the first step in the useAsyncEffect above.
    const nextStepIndex = currentStep.index + 1;
    if (nextStepIndex >= props.steps.length) {
      // the user done going through all the steps, so let's create the task
      setDone(true);
      const createTask = createTaskFromItem({
        variables: {
          input: {
            date: task.date.value,
            title: task.title.value,
            status: task.status.value ?? "TODO",
            durationInMinutes: task.durationInMinutes.value ?? null,
            itemId: task.item?.id ?? null,
            atIndex: props.atIndex ?? null,
            pluginDatas: Object.entries(pluginCreateTaskDatas).map(([pluginSlug, value]) => ({
              pluginSlug,
              originalId: value.pluginData?.originalId ?? null,
              min: value.pluginData?.min ?? null,
              full: value.pluginData?.full ?? null,
            })),
            actionDatas: Object.entries(pluginCreateTaskDatas).map(([pluginSlug, pluginData]) => ({
              pluginSlug,
              data: pluginData.actionData ?? null,
            })),
          },
        },
        updater: (updaterStore) => {
          if (!task.item) return;
          const updaterDay = updaterStore.get(`Day_${task.date.value}`);
          const updaterDayTasks = updaterDay?.getLinkedRecords("tasks") ?? [];
          const createdTask = updaterStore.getRootField("createTask");
          // This adds the new task to where the item was dropped
          updaterDay?.setLinkedRecords(
            [
              ...(updaterDayTasks ?? []).slice(0, props.atIndex),
              createdTask,
              ...(updaterDayTasks ?? []).slice(props.atIndex),
            ],
            "tasks"
          );
          // This adds the new task the item's tasks
          const updaterItem = updaterStore.get(task.item.id);
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
      if (task.item?.willBeDimissedFromInbox) {
        _dismissItemFromInbox({
          variables: { input: { id: task.item.id } },
          optimisticUpdater: (updaterStore) => {
            if (!task.item) return;
            const updaterItem = updaterStore.get(task.item.id);
            updaterItem?.setValue(0, "inboxPoints");
          },
        });
      }
      props.onClose();
      return;
    }
  };

  const handleBack = async (metadata?: PluginCreateTaskData) => {
    if (!currentStep) return; // this should never happen since we initialize the currentStep to the first step in the useAsyncEffect above.
    const prevStepIndex = currentStep.index - 1;
    if (prevStepIndex < 0) {
      props.onClose();
      return;
    }
    setTask((prev) => {
      if (!metadata?.taskOverrides) return prev;
      return {
        title: {
          value: metadata.taskOverrides.title ?? prev.title.value,
          overriden: metadata.taskOverrides.title !== undefined || prev.title.overriden,
        },
        status: {
          value: metadata.taskOverrides.status ?? prev.status.value,
          overriden: metadata.taskOverrides.status !== undefined || prev.status.overriden,
        },
        durationInMinutes: {
          value: metadata.taskOverrides.durationInMinutes ?? prev.durationInMinutes.value,
          overriden:
            metadata.taskOverrides.durationInMinutes !== undefined ||
            prev.durationInMinutes.overriden,
        },
        date: {
          value: metadata.taskOverrides.date ?? prev.date.value,
          overriden: metadata.taskOverrides.date !== undefined || prev.date.overriden,
        },
        item: prev.item,
      };
    });
    setPluginCreateTaskDatas((prev) => ({
      ...prev,
      [currentStep.pluginSlug]: metadata ?? {},
    }));
    setCurrentStep(previousStep);
  };

  const StepDialogContent = currentStep?.dialogContent;

  if (done) return null;

  return (
    <Dialog>
      <DialogContent>
        {StepDialogContent && !loading ? (
          <StepDialogContent
            initialMetdata={pluginCreateTaskDatas[currentStep.pluginSlug]}
            onNext={handleNext}
            onBack={handleBack}
            onClose={props.onClose}
            NextButton={(p) => (
              <Button {...p}>
                {currentStep.pluginSlug === props.steps[props.steps.length - 1].pluginSlug
                  ? "Create task"
                  : "Next"}
              </Button>
            )}
            BackButton={(p) => (
              <Button {...p} secondary>
                {currentStep.pluginSlug === props.steps[0].pluginSlug ? "Cancel" : "Back"}
              </Button>
            )}
          />
        ) : (
          <DialogLoading />
        )}
      </DialogContent>
    </Dialog>
  );
};

export type OnCreateTask = (input: {
  task?: {
    /** The title of the task and whether it was already overriden by another plugin. */
    title: MaybeOverriden<string>;
    /** The status of the task and whether it was already overriden by another plugin. */
    status: MaybeOverriden<TaskStatus | null>;
    /** The durationInMinutes of the task and whether it was already overriden by another plugin. */
    durationInMinutes: MaybeOverriden<number | null>;
    /** The date of the task and whether it was already overriden by another plugin. */
    date: MaybeOverriden<string | null>;
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
}) => Promise<
  | null
  | PluginCreateTaskData
  | {
      /** The component to be rendered in the dialog/modal to ask for addditional information needed to create the task. */
      dialogContent: OnCreateTaskStepDialogContent;
    }
>;
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
type OnCreateTaskStepDialogContent = React.ComponentType<{
  /** The previously saved metadata when the user clicked on next or back and comes back to this plugin's step. Helpful to not render an empty form when they back to the same step. */
  initialMetdata: PluginCreateTaskData;
  /** To be triggered when going to the next step. The given data will be passed into the createTask mutation for the server side of the plugin to handle. */
  onNext: (metadata?: PluginCreateTaskData) => void;
  /** To be triggered when going to the previous step. The given data will be passed into the createTask mutation for the server side of the plugin to handle. */
  onBack: (metadata?: PluginCreateTaskData) => void;
  /** To be triggered when closing the dialog. */
  onClose: () => void;
  /** Renders a button with the correct label (either `Create task` when it's the last step in the onCreateTask sequence, `Next` if it's not the last step). */
  NextButton: React.ComponentType<NavigationButtonProps>;
  /** Renders a button with the correct label (either `Back` when it's not the first step in the onCreateTask sequence, `Cancel` if it's the first step). */
  BackButton: React.ComponentType<NavigationButtonProps>;
}>;

type NavigationButtonProps = Omit<ButtonProps, "primary" | "secondary" | "tertiary" | "children">;

type MaybeOverriden<T> = {
  value: T;
  overriden: boolean;
};
