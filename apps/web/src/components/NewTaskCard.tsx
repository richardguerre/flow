import { graphql, useMutation } from "@flowdev/relay";
import { NewTaskCardCreateTaskMutation } from "../relay/__generated__/NewTaskCardCreateTaskMutation.graphql";
import { TaskTitleInput } from "./TaskTitle";
import { BsCheck, BsX } from "@flowdev/icons";

type Props = {
  /** Date in format YYYY-MM-DD */
  date: string;
  onSave?: () => void;
  onCancel?: () => void;
};

/**
 * The only required input to create a task is the title, so once the user has
 * entered a title, we can create the task, and all other fields will be done
 * with updateTask.
 *
 * TODO: Exeception: If the user clicks on a status button, we can create the task
 * when they click on the button with the selected status.
 */
export const NewTaskCard = (props: Props) => {
  const [createTask] = useMutation<NewTaskCardCreateTaskMutation>(graphql`
    mutation NewTaskCardCreateTaskMutation($input: MutationCreateTaskInput!) {
      createTask(input: $input) {
        ...TaskCard_task
      }
    }
  `);

  const handleSave = (title: string) => {
    props.onSave?.();
    createTask({
      variables: {
        input: {
          title,
          date: props.date,
          status: "TODO",
        },
      },
      // optimisticResponse: {
      //   createTask: {
      //     __typename: "Task",
      //     id: `Task_${Math.random()}`,
      //     title,
      //     createdAt: new Date().toISOString(),
      //     status: "TODO",
      //     canBeSuperdone: false,
      //     completedAt: null,
      //     date: props.date,
      //     item: null,
      //     durationInMinutes: null,
      //     labels: [],
      //     pluginDatas: [],
      //   },
      // },
      // TODO: figure out how to do optimistic updates such that setLinkedRecords is reverted (when the acutal data comes) without causing an error
      // optimisticUpdater: (store) => {
      //   const day = store.get(`Day_${props.date}`);
      //   const dayTasks = day?.getLinkedRecords("tasks");
      //   const createdTask = store.getRootField("createTask");
      //   // This adds the new task to the top of the list
      //   day?.setLinkedRecords([createdTask, ...(dayTasks ?? [])], "tasks");
      // },
      updater: (store) => {
        const day = store.get(`Day_${props.date}`);
        const dayTasks = day?.getLinkedRecords("tasks");
        const createdTask = store.getRootField("createTask");
        // This adds the new task to the top of the list
        day?.setLinkedRecords([createdTask, ...(dayTasks ?? [])], "tasks");
      },
    });
  };

  return (
    <div className="bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-md p-3 shadow-sm hover:shadow-md">
      <TaskTitleInput toCreate onSave={handleSave} onCancel={props.onCancel} />
      {/* These buttons are just for aesthetics */}
      <div className="flex gap-2">
        <button className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100 ">
          <BsCheck />
        </button>
        <button className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 hidden h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100 group-hover:flex ">
          <BsX size={20} />
        </button>
      </div>
    </div>
  );
};
