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
    <div className="rounded-md cursor-pointer flex flex-col gap-1 bg-background-50 p-3 group">
      <TaskTitleInput toCreate onSave={handleSave} onCancel={props.onCancel} />
      {/* These buttons are just for aesthetics */}
      <div className="flex gap-2">
        <button
          key="done"
          className="rounded-full flex bg-background-200 bg-opacity-50 h-6 text-sm text-foreground-700 w-6 items-center justify-center hover:(bg-opacity-70 bg-background-300) active:(bg-opacity-100 bg-background-300) "
        >
          <BsCheck />
        </button>
        <button
          key="cancel"
          className="rounded-full bg-background-200 bg-opacity-50 h-6 text-sm text-foreground-700 w-6 items-center justify-center hidden hover:(bg-opacity-70 bg-background-300) active:(bg-opacity-100 bg-background-300) group-hover:flex "
        >
          <BsX size={20} />
        </button>
      </div>
    </div>
  );
};
