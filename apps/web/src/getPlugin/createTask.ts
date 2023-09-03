import { commitMutationPromise, graphql } from "@flowdev/relay";
import { environment } from "../relay/environment";
import { createTaskMutation } from "../relay/__generated__/createTaskMutation.graphql";

export const createTask = async (input: createTaskMutation["variables"]["input"]) => {
  const { createTask } = await commitMutationPromise<createTaskMutation>(environment, {
    mutation: graphql`
      mutation createTaskMutation($input: MutationCreateTaskInput!) {
        createTask(input: $input) {
          ...TaskCard_task
          id
          createdAt
          title
          status
          completedAt
          durationInMinutes
          pluginDatas {
            id
            pluginSlug
            createdAt
            updatedAt
            min
          }
        }
      }
    `,
    variables: { input },
  });

  return createTask;
};
