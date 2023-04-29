import { graphql, useMutation } from "@flowdev/relay";
import { NewTaskCardCreateTaskMutation } from "../relay/__generated__/NewTaskCardCreateTaskMutation.graphql";
import { TaskTitleInput } from "./TaskTitle";

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
    <div className="rounded-md cursor-pointer flex flex-col space-y-1 bg-background-50 p-3 group">
      <TaskTitleInput toCreate onSave={handleSave} onCancel={props.onCancel} />
    </div>
  );
};
