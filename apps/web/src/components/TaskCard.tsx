import { TaskCard_task$key } from "@flowdev/web/relay/__generated__/TaskCard_task.graphql";
import { FC } from "react";
import { graphql, useFragment } from "@flowdev/relay";

type TaskCardProps = {
  task: TaskCard_task$key;
};

export const TaskCard: FC<TaskCardProps> = (props) => {
  const task = useFragment(
    graphql`
      fragment TaskCard_task on Task {
        title
      }
    `,
    props.task
  );

  return <div>{task.title}</div>;
};
