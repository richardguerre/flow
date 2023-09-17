import { graphql, useMutation, useMutationPromise } from "@flowdev/relay";
import { Button, ButtonProps } from "@flowdev/ui/Button";
import { Dialog, DialogContent, DialogLoading } from "@flowdev/ui/Dialog";
import { toast } from "@flowdev/ui/Toast";
import { useRef, useState } from "react";
import { OnCreateTaskCreateTaskFromItemMutation } from "@flowdev/web/relay/__generated__/OnCreateTaskCreateTaskFromItemMutation.graphql";
import { OnCreateTaskDismissItemFromInboxMutation } from "@flowdev/web/relay/__generated__/OnCreateTaskDismissItemFromInboxMutation.graphql";
import { TaskStatus } from "@flowdev/web/relay/__generated__/getDaysDaysQuery.graphql";
import { useAsyncEffect } from "@flowdev/web/useAsyncEffect";

graphql`
  fragment OnCreateTaskItemRecordToCreateTaskFrom_item on Item {
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

export type PluginStepInfo = { onCreateTask: PluginOnCreateTask; pluginSlug: string };
type OnCreateTaskStepInfo = {
  pluginSlug: string;
  dialogContent: OnCreateTaskStepDialogContent;
  index: number;
};

export type OnCreateTaskProps = {
  atIndex: number;
  steps: PluginStepInfo[];
  task: NonNullable<Parameters<PluginOnCreateTask>[0]["task"]>;
  onClose: () => void;
};

export const OnCreateTask = (props: OnCreateTaskProps) => {
  const rendered = useRef(false);
  const [openDialog, setOpenDialog] = useState(false); // the dialog is closed by default until one of the plugins resolves having a dialogContent
  const [currentStep, setCurrentStep] = useState<OnCreateTaskStepInfo | null>(null);
  const [previousStep, setPreviousStep] = useState<OnCreateTaskStepInfo | null>(null);
  const task = useRef(props.task);
  const [loading, setLoading] = useState(true);
  const [pluginCreateTaskDatas, setPluginCreateTaskDatas] = useState<
    Record<string, PluginCreateTaskData>
  >({});

  const [createTaskFromItem] = useMutationPromise<OnCreateTaskCreateTaskFromItemMutation>(graphql`
    mutation OnCreateTaskCreateTaskFromItemMutation($input: MutationCreateTaskInput!) {
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

  const [_dismissItemFromInbox] = useMutation<OnCreateTaskDismissItemFromInboxMutation>(graphql`
    mutation OnCreateTaskDismissItemFromInboxMutation($input: MutationDismissItemFromInboxInput!) {
      dismissItemFromInbox(input: $input) {
        id
        inboxPoints
      }
    }
  `);

  useAsyncEffect(async () => {
    if (rendered.current) return;
    rendered.current = true; // prevents double rendering due to React.StrictMode (strict mode is useful, but not in this case)
    await processNextStep({ steps: props.steps }); // [1] logic starts here
    setOpenDialog(true);
  }, [props.steps]);

  const processNextStep = async (props: { steps: PluginStepInfo[] }) => {
    setLoading(true);
    for (let i = 0; i < props.steps.length; i++) {
      const stepInfo = props.steps[i];
      const onCreateTaskResult = await stepInfo.onCreateTask({ task: task.current }).catch((e) => {
        console.log(`Error plugin.onCreateTask from plugin ${stepInfo.pluginSlug}`, e);
        return null;
      });
      if (onCreateTaskResult && "dialogContent" in onCreateTaskResult) {
        setPreviousStep(currentStep);
        setCurrentStep({
          pluginSlug: stepInfo.pluginSlug,
          dialogContent: onCreateTaskResult.dialogContent,
          index: i,
        });
        setLoading(false);
        return;
      } else if (onCreateTaskResult === null) {
        continue;
      } else {
        setPluginCreateTaskDatas((prev) => ({
          ...prev,
          [stepInfo.pluginSlug]: onCreateTaskResult,
        }));
        if (!onCreateTaskResult.taskOverrides) continue;
        task.current = {
          title: {
            value: onCreateTaskResult.taskOverrides.title ?? task.current.title.value,
            overriden:
              onCreateTaskResult.taskOverrides.title !== undefined || task.current.title.overriden,
          },
          status: {
            value: onCreateTaskResult.taskOverrides.status ?? task.current.status.value,
            overriden:
              onCreateTaskResult.taskOverrides.status !== undefined ||
              task.current.status.overriden,
          },
          durationInMinutes: {
            value:
              onCreateTaskResult.taskOverrides.durationInMinutes ??
              task.current.durationInMinutes.value,
            overriden:
              onCreateTaskResult.taskOverrides.durationInMinutes !== undefined ||
              task.current.durationInMinutes.overriden,
          },
          date: {
            value: onCreateTaskResult.taskOverrides.date ?? task.current.date.value,
            overriden:
              onCreateTaskResult.taskOverrides.date !== undefined || task.current.date.overriden,
          },
          item: task.current.item,
        };
      }
    }
    // if we went through all the steps and none of them returned a dialogContent, then we're done
    await handleDone();
  };

  const handleDone = async () => {
    // the user done going through all the steps, so let's create the task
    // hide the dialog so that the toast gets all the attention and we don't display stale dialog content
    props.onClose();
    const createTask = createTaskFromItem({
      variables: {
        input: {
          date: task.current.date.value,
          title: task.current.title.value,
          status: task.current.status.value ?? "TODO",
          durationInMinutes: task.current.durationInMinutes.value ?? null,
          itemId: task.current.item?.id ?? null,
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
        if (!task.current.item) return;
        const updaterDay = updaterStore.get(`Day_${task.current.date.value}`);
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
      },
    });
    await toast.promise(createTask, {
      loading: "Creating task...",
      error: "Failed to create task",
      success: "Task created",
    });

    // if the item was in the inbox (i.e. had inboxPoints) and the item is in a list, we can dismiss it from the inbox
    if (task.current.item?.willBeDimissedFromInbox) {
      _dismissItemFromInbox({
        variables: { input: { id: task.current.item.id } },
        optimisticUpdater: (updaterStore) => {
          if (!task.current.item) return;
          const updaterItem = updaterStore.get(task.current.item.id);
          updaterItem?.setValue(0, "inboxPoints");
        },
      });
    }
    props.onClose();
    return;
  };

  const handleNext = async (metadata?: PluginCreateTaskData) => {
    if (!currentStep) return; // this should never happen since we initialize the currentStep to the first step in the useAsyncEffect above.

    setPluginCreateTaskDatas((prev) => ({
      ...prev,
      [currentStep.pluginSlug]: metadata ?? {},
    }));
    task.current = {
      title: {
        value: metadata?.taskOverrides?.title ?? task.current.title.value,
        overriden: metadata?.taskOverrides?.title !== undefined || task.current.title.overriden,
      },
      status: {
        value: metadata?.taskOverrides?.status ?? task.current.status.value,
        overriden: metadata?.taskOverrides?.status !== undefined || task.current.status.overriden,
      },
      durationInMinutes: {
        value: metadata?.taskOverrides?.durationInMinutes ?? task.current.durationInMinutes.value,
        overriden:
          metadata?.taskOverrides?.durationInMinutes !== undefined ||
          task.current.durationInMinutes.overriden,
      },
      date: {
        value: metadata?.taskOverrides?.date ?? task.current.date.value,
        overriden: metadata?.taskOverrides?.date !== undefined || task.current.date.overriden,
      },
      item: task.current.item,
    };
    setPreviousStep(currentStep);

    const nextStepIndex = currentStep.index + 1;
    if (nextStepIndex >= props.steps.length) {
      // we're done going through all the steps, so let's create the task
      await handleDone();
      return;
    }
    const stepsLeft = props.steps.slice(nextStepIndex);
    processNextStep({ steps: stepsLeft });
  };

  const handleBack = async (metadata?: PluginCreateTaskData) => {
    if (!currentStep) return; // this should never happen since we initialize the currentStep to the first step in the useAsyncEffect above.
    const prevStepIndex = currentStep.index - 1;
    if (prevStepIndex < 0) {
      props.onClose();
      return;
    }

    setPluginCreateTaskDatas((prev) => ({
      ...prev,
      [currentStep.pluginSlug]: metadata ?? {},
    }));
    task.current = {
      title: {
        value: metadata?.taskOverrides?.title ?? task.current.title.value,
        overriden: metadata?.taskOverrides?.title !== undefined || task.current.title.overriden,
      },
      status: {
        value: metadata?.taskOverrides?.status ?? task.current.status.value,
        overriden: metadata?.taskOverrides?.status !== undefined || task.current.status.overriden,
      },
      durationInMinutes: {
        value: metadata?.taskOverrides?.durationInMinutes ?? task.current.durationInMinutes.value,
        overriden:
          metadata?.taskOverrides?.durationInMinutes !== undefined ||
          task.current.durationInMinutes.overriden,
      },
      date: {
        value: metadata?.taskOverrides?.date ?? task.current.date.value,
        overriden: metadata?.taskOverrides?.date !== undefined || task.current.date.overriden,
      },
      item: task.current.item,
    };
    setCurrentStep(previousStep);
  };

  const StepDialogContent = currentStep?.dialogContent;

  return (
    <Dialog open={openDialog} onClose={props.onClose}>
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

export type PluginOnCreateTask = (input: {
  readonly task?: {
    /** The title of the task and whether it was already overriden by another plugin. */
    title: MaybeOverriden<string>;
    /** The status of the task and whether it was already overriden by another plugin. */
    status: MaybeOverriden<TaskStatus | null>;
    /** The durationInMinutes of the task and whether it was already overriden by another plugin. */
    durationInMinutes: MaybeOverriden<number | null>;
    /** The date of the task and whether it was already overriden by another plugin. */
    date: MaybeOverriden<string | null>;
    /** The item the task is created from. Will be undefined if the task is not created from an item. */
    // FIXME: use OnCreateTaskItemRecordToCreateTaskFrom_item$data instead. currently typescript reaches it's max depth limit when using it so it had to be copy pasted here.
    readonly item?: {
      id: string;
      inboxPoints: number | null;
      list: {
        id: string;
      } | null;
      pluginDatas: ReadonlyArray<{
        min: JsonValue;
        pluginSlug: string;
      }>;
      title: string;
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
