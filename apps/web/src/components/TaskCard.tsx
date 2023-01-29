import { TaskCard_task$key } from "@flowdev/web/relay/__generated__/TaskCard_task.graphql";
import { FC } from "react";
import { graphql, useFragment } from "@flowdev/relay";
import { TaskCardDetails_task$key } from "@flowdev/web/relay/__generated__/TaskCardDetails_task.graphql";
import { TaskCardActions_task$key } from "@flowdev/web/relay/__generated__/TaskCardActions_task.graphql";
import { DurationBadge } from "./DurationBadge";

type TaskCardProps = {
  task: TaskCard_task$key;
};

export const TaskCard: FC<TaskCardProps> = (props) => {
  const task = useFragment(
    graphql`
      fragment TaskCard_task on Task {
        title
        durationInMinutes
        ...TaskCardDetails_task
        ...TaskCardActions_task
      }
    `,
    props.task
  );

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div>{task.title}</div>
        {task.durationInMinutes && <DurationBadge durationInMinutes={task.durationInMinutes} />}
      </div>
      <TaskCardDetails task={task} />
      <TaskCardActions task={task} />
    </div>
  );
};

type TaskCardDetailsProps = {
  task: TaskCardDetails_task$key;
};

const TaskCardDetails: FC<TaskCardDetailsProps> = (props) => {
  const task = useFragment(
    graphql`
      fragment TaskCardDetails_task on Task {
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
    <div>
      <div>{task.item?.scheduledAt}</div>
    </div>
  );
};

type TaskCardActionsProps = {
  task: TaskCardActions_task$key;
};

const TaskCardActions: FC<TaskCardActionsProps> = (props) => {
  const task = useFragment(
    graphql`
      fragment TaskCardActions_task on Task {
        status
      }
    `,
    props.task
  );

  return (
    <div>
      <div>{task.status}</div>
    </div>
  );
};
