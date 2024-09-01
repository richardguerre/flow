import { SelectorStoreUpdater, graphql, useFragment, useMutation } from "@flowdev/relay";
import { tw } from "@flowdev/ui/tw";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@flowdev/ui/DropdownMenu";
import { BsCheck, BsClock, BsX } from "@flowdev/icons";
import { TaskCard_task$key } from "@flowdev/mobile-pwa/relay/__generated__/TaskCard_task.graphql";
import {
  TaskCardUpdateTaskStatusMutation,
  TaskStatus,
} from "@flowdev/mobile-pwa/relay/__generated__/TaskCardUpdateTaskStatusMutation.graphql";
import { TaskCardDeleteTaskMutation } from "../relay/__generated__/TaskCardDeleteTaskMutation.graphql";
import { TaskCardSubtask_task$key } from "../relay/__generated__/TaskCardSubtask_task.graphql";
import { EditorContent, MinimumKit, useEditor } from "@flowdev/tiptap";
import { TaskCardTitle_task$key } from "../relay/__generated__/TaskCardTitle_task.graphql";
import "./TaskCardTitle.scss";
import { TaskCardStatusButton_task$key } from "../relay/__generated__/TaskCardStatusButton_task.graphql";
import { TaskTagsExtension, useTaskTags } from "./TaskTags";

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
        subtasks {
          id
          ...TaskCardSubtask_task
        }
        ...TaskCardStatusButton_task
        ...TaskCardTitle_task
      }
    `,
    props.task,
  );

  return (
    <div
      id={task.id} // used for drag and drop
      className={tw(
        "bg-background-50 group flex cursor-pointer gap-1 flex-col rounded-lg p-3 shadow-sm hover:shadow-md",
        task?.status !== "TODO" && "opacity-50 hover:opacity-100",
      )}
    >
      <div className="flex gap-1">
        <TaskCardStatusButton task={task} />
        <TaskCardTitle task={task} />
      </div>
      <div className="flex flex-col gap-1">
        {task?.subtasks?.map((subtask) => <TaskCardSubtask key={subtask.id} task={subtask} />)}
      </div>
    </div>
  );
};

const TaskCardStatusButton = (props: { task: TaskCardStatusButton_task$key; small?: boolean }) => {
  const task = useFragment(
    graphql`
      fragment TaskCardStatusButton_task on Task {
        status
        id
      }
    `,
    props.task,
  );

  const [$updateTaskStatus] = useMutation<TaskCardUpdateTaskStatusMutation>(
    taskCardUpdateTaskStatusMutation,
  );

  const updateStatus = async (status: TaskStatus) => {
    $updateTaskStatus({
      variables: { input: { id: task?.id, status } },
      optimisticResponse: { updateTask: { id: task?.id, status } },
    });
  };

  if (task.status === "TODO") {
    return (
      <CardActionButton onClick={() => updateStatus("DONE")} small={props.small}>
        <BsCheck size={props.small ? 20 : 24} />
      </CardActionButton>
    );
  } else if (task.status === "DONE") {
    return (
      <CardActionButton
        className="bg-positive-100 text-positive-600 active:bg-positive-300"
        onClick={() => updateStatus("TODO")}
        small={props.small}
      >
        <BsCheck size={props.small ? 20 : 24} />
      </CardActionButton>
    );
  } else if (task.status === "CANCELED") {
    return (
      <CardActionButton
        className="bg-negative-100 text-negative-600 active:bg-negative-300"
        onClick={() => updateStatus("TODO")}
        small={props.small}
      >
        <BsX size={props.small ? 20 : 24} />
      </CardActionButton>
    );
  }

  return null;
};

const TaskCardTitle = (props: { task: TaskCardTitle_task$key }) => {
  const { taskTags } = useTaskTags();
  const task = useFragment(
    graphql`
      fragment TaskCardTitle_task on Task {
        id
        title
      }
    `,
    props.task,
  );
  const editor = useEditor(
    {
      extensions: [MinimumKit, TaskTagsExtension.configure({ tags: taskTags })],
      content: task.title,
      editable: false, // readonly
    },
    [taskTags],
  );

  return <EditorContent editor={editor} className="TaskCardTitleInput w-full cursor-text p-0" />;
};

const taskCardUpdateTaskStatusMutation = graphql`
  mutation TaskCardUpdateTaskStatusMutation($input: MutationUpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      ...Day_day
    }
  }
`;

export const deleteTaskMutation = graphql`
  mutation TaskCardDeleteTaskMutation($id: ID!) {
    deleteTask(id: $id) {
      id
      date
    }
  }
`;

const TaskCardSubtask = (props: { task: TaskCardSubtask_task$key }) => {
  const task = useFragment(
    graphql`
      fragment TaskCardSubtask_task on Task {
        id
        status
        ...TaskCardStatusButton_task
        ...TaskCardTitle_task
      }
    `,
    props.task,
  );

  return (
    <div className="flex gap-2 pl-1">
      <TaskCardStatusButton task={task} small />
      <TaskCardTitle task={task} />
    </div>
  );
};

export const durationOptions = [
  { label: "None", value: null },
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

export const TaskDurationButtonDropdown = (props: {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  value: number | null | undefined;
  onChange: (durationInMinutes: number | null) => void;
  showByDefault?: boolean;
}) => {
  return (
    <DropdownMenu open={props.open} onOpenChange={props.setOpen}>
      <DropdownMenuTrigger>
        <CardActionButton
          className={tw(!props.showByDefault && "hidden group-hover:flex", props.open && "flex")}
        >
          <BsClock size={16} stroke="2px" />
        </CardActionButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>How long will you take?</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="no-scrollbar max-h-40 overflow-y-scroll">
          {durationOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              onClick={() => props.onChange(option.value)}
              checked={props.value === option.value}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type CardActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  small?: boolean;
};
export const CardActionButton = (props: CardActionButtonProps) => {
  return (
    <button
      {...props}
      className={tw(
        "bg-background-200/50 text-foreground-700 hover:bg-background-300/70 active:bg-background-300/100 flex items-center justify-center rounded-full text-sm shrink-0",
        props.small ? "h-6 w-6" : "h-8 w-8",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
};

export const deleteTaskUpdater: SelectorStoreUpdater<TaskCardDeleteTaskMutation["response"]> = (
  store,
  data,
) => {
  const day = store.get(`Day_${data?.deleteTask.date}`);
  const dayTasks = day?.getLinkedRecords("tasks");
  day?.setLinkedRecords(
    (dayTasks ?? []).filter((dayTask) => dayTask.getValue("id") !== data?.deleteTask.id),
    "tasks",
  );
  if (!data?.deleteTask.id) return;
  const task = store.get(data?.deleteTask.id);
  const itemTasks = task?.getLinkedRecords("subtasks");
  task?.setLinkedRecords(
    (itemTasks ?? []).filter((itemTask) => itemTask.getValue("id") !== data?.deleteTask.id),
    "subtasks",
  );
};
