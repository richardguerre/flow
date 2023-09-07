import { useMemo } from "react";
import {
  SelectorStoreUpdater,
  graphql,
  useFragment,
  useMutation,
  useMutationPromise,
} from "@flowdev/relay";
import { TaskTitle } from "./TaskTitle";
import { tw } from "@flowdev/ui/tw";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@flowdev/ui/DropdownMenu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@flowdev/ui/ContextMenu";
import { DurationBadge, TimeBadge } from "./Badges";
import { BsCheck, BsCheckAll, BsClock, BsX } from "@flowdev/icons";
import { TaskCard_task$key } from "@flowdev/web/relay/__generated__/TaskCard_task.graphql";
import { TaskCardDetails_task$key } from "@flowdev/web/relay/__generated__/TaskCardDetails_task.graphql";
import { TaskCardActions_task$key } from "@flowdev/web/relay/__generated__/TaskCardActions_task.graphql";
import {
  TaskCardUpdateTaskStatusMutation,
  TaskStatus,
} from "@flowdev/web/relay/__generated__/TaskCardUpdateTaskStatusMutation.graphql";
import { TaskCardUpdateTaskDurationMutation } from "../relay/__generated__/TaskCardUpdateTaskDurationMutation.graphql";
import { TaskCardUpdateItemStatusMutation } from "../relay/__generated__/TaskCardUpdateItemStatusMutation.graphql";
import { TaskCardDurationButton_task$key } from "../relay/__generated__/TaskCardDurationButton_task.graphql";
import { TaskCardDeleteTaskMutation } from "../relay/__generated__/TaskCardDeleteTaskMutation.graphql";

type TaskCardProps = {
  task: TaskCard_task$key;
};

export const TaskCard = (props: TaskCardProps) => {
  const task = useFragment(
    graphql`
      fragment TaskCard_task on Task {
        id
        date
        title
        status
        completedAt # updates the CalendarList component to add checkmark at the time of completion
        ...TaskCardDetails_task
        ...TaskCardActions_task
        ...TaskTitle_task
      }
    `,
    props.task
  );

  const [_deleteTask] = useMutation<TaskCardDeleteTaskMutation>(graphql`
    mutation TaskCardDeleteTaskMutation($id: ID!) {
      deleteTask(id: $id) {
        id
        date
      }
    }
  `);

  const deleteTask = () => {
    _deleteTask({
      variables: { id: task.id },
      optimisticResponse: { id: task.id, date: task.date },
      optimisticUpdater: deleteTaskUpdater,
      updater: deleteTaskUpdater,
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={tw(
            "bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-lg p-3 shadow-sm hover:shadow-md",
            task.status !== "TODO" && "opacity-50 hover:opacity-100"
          )}
        >
          <TaskTitle task={task} />
          <TaskCardDetails task={task} />
          <TaskCardActions task={task} />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={deleteTask}>Delete task</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

type TaskCardDetailsProps = {
  task: TaskCardDetails_task$key;
};

const TaskCardDetails = (props: TaskCardDetailsProps) => {
  const task = useFragment(
    graphql`
      fragment TaskCardDetails_task on Task {
        durationInMinutes
        item {
          scheduledAt
        }
        pluginDatas {
          pluginSlug
          min
        }
      }
    `,
    props.task
  );

  return (
    <div className="flex gap-2">
      {task.durationInMinutes && <DurationBadge durationInMinutes={task.durationInMinutes} />}
      {task.item?.scheduledAt && <TimeBadge time={task.item.scheduledAt} />}
    </div>
  );
};

type TaskCardActionsProps = {
  task: TaskCardActions_task$key;
};

const TaskCardActions = (props: TaskCardActionsProps) => {
  const task = useFragment(
    graphql`
      fragment TaskCardActions_task on Task {
        status
        id
        item {
          id
        }
        ...TaskCardDurationButton_task
      }
    `,
    props.task
  );

  const [_updateTaskStatus] = useMutationPromise<TaskCardUpdateTaskStatusMutation>(graphql`
    mutation TaskCardUpdateTaskStatusMutation($input: MutationUpdateTaskStatusInput!) {
      updateTaskStatus(input: $input) {
        ...Day_day
      }
    }
  `);

  const [updateItemStatus] = useMutationPromise<TaskCardUpdateItemStatusMutation>(graphql`
    mutation TaskCardUpdateItemStatusMutation($input: MutationUpdateItemStatusInput!) {
      updateItemStatus(input: $input) {
        id
        isRelevant
      }
    }
  `);

  const updateStatus = async (status: TaskStatus) => {
    await _updateTaskStatus({
      variables: {
        input: { id: task.id, status },
      },
    });
  };

  const markAsSuperdone = async (done: boolean) => {
    await updateStatus(done ? "DONE" : "TODO");
    if (!task.item) return;
    await updateItemStatus({ variables: { input: { id: task.item.id, done } } });
  };

  const doneButton = (
    <button
      key="done"
      className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100"
      onClick={() => updateStatus("DONE")}
    >
      <BsCheck />
    </button>
  );

  const undoDoneButton = (
    <button
      key="undoDone"
      className="bg-positive-100 text-positive-600 hover:bg-positive-200 active:bg-positive-300 flex h-6 w-6 items-center justify-center rounded-full"
      onClick={() => updateStatus("TODO")}
    >
      <BsCheck />
    </button>
  );

  const superdoneButton = (
    <button
      key="superdone"
      className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 hidden h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100 group-hover:flex"
      onClick={() => markAsSuperdone(true)}
    >
      <BsCheckAll />
    </button>
  );

  const undoSuperdoneButton = (
    <button
      key="undoSuperdone"
      className="bg-positive-100 text-positive-600 hover:bg-positive-200 active:bg-positive-300 flex h-6 w-6 items-center justify-center rounded-full"
      onClick={() => markAsSuperdone(false)}
    >
      <BsCheckAll />
    </button>
  );

  const cancelButton = (
    <button
      key="cancel"
      className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 hidden h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100 group-hover:flex"
      onClick={() => updateStatus("CANCELED")}
    >
      <BsX size={20} />
    </button>
  );

  const undoCancelButton = (
    <button
      key="undoCancel"
      className="bg-negative-100 text-negative-600 hover:bg-negative-200 active:bg-negative-300 flex h-6 w-6 items-center justify-center rounded-full"
      onClick={() => updateStatus("TODO")}
    >
      <BsX size={20} />
    </button>
  );

  const taskStatusActions: Array<React.ReactNode> = useMemo(() => {
    if (task.status === "TODO") {
      return [doneButton, ...(task.item ? [superdoneButton] : []), cancelButton];
    } else if (task.status === "DONE") {
      return task.item ? [undoSuperdoneButton] : [undoDoneButton];
    } else if (task.status === "CANCELED") {
      return [undoCancelButton];
    }
    return [];
  }, [task.status]);

  return (
    <div className="flex gap-2">
      {taskStatusActions.map((action) => action)}
      <TaskDurationButton task={task} />
    </div>
  );
};

type TaskDurationButtonProps = {
  task: TaskCardDurationButton_task$key;
};

const durationOptions = [
  { label: "None", value: null },
  { label: "2 minutes", value: 2 },
  { label: "5 minutes", value: 5 },
  { label: "10 minutes", value: 10 },
  { label: "15 minutes", value: 15 },
  { label: "20 minutes", value: 20 },
  { label: "30 minutes", value: 30 },
  { label: "40 minutes", value: 40 },
  { label: "45 minutes", value: 45 },
  { label: "1 hour", value: 60 },
  { label: "1.5 hours", value: 90 },
  { label: "2 hours", value: 120 },
  { label: "2.5 hours", value: 150 },
  { label: "3 hours", value: 180 },
];

const TaskDurationButton = (props: TaskDurationButtonProps) => {
  const task = useFragment(
    graphql`
      fragment TaskCardDurationButton_task on Task {
        id
        durationInMinutes
      }
    `,
    props.task
  );

  const [updateTaskDuration] = useMutation<TaskCardUpdateTaskDurationMutation>(graphql`
    mutation TaskCardUpdateTaskDurationMutation($input: MutationUpdateTaskInput!) {
      updateTask(input: $input) {
        durationInMinutes
      }
    }
  `);

  const handleDurationChange = (durationInMinutes: number | null) => {
    updateTaskDuration({
      variables: { input: { id: task.id, durationInMinutes } },
      optimisticResponse: {
        updateTask: {
          id: task.id,
          durationInMinutes,
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 hidden h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100 group-hover:flex">
          <BsClock size={16} stroke="2px" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Duration</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="no-scrollbar w-30 max-h-40 overflow-y-scroll">
          {durationOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              onClick={() => handleDurationChange(option.value)}
              checked={task.durationInMinutes === option.value}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const deleteTaskUpdater: SelectorStoreUpdater<TaskCardDeleteTaskMutation["response"]> = (
  store,
  data
) => {
  const day = store.get(`Day_${data.deleteTask.date}`);
  const dayTasks = day?.getLinkedRecords("tasks");
  day?.setLinkedRecords(
    (dayTasks ?? []).filter((dayTask) => dayTask.getValue("id") !== data.deleteTask.id),
    "tasks"
  );
};
