import { ConnectionHandler, graphql, useMutation, useMutationPromise } from "@flowdev/relay";
import { environment } from "../relay/environment";
import { OnCreateItemTaskRecordToCreateItemFrom_task$data } from "../relay/__generated__/OnCreateItemTaskRecordToCreateItemFrom_task.graphql";
import { OnCreateItemItemRelatedToTask_task$data } from "../relay/__generated__/OnCreateItemItemRelatedToTask_task.graphql";
import { OnCreateItemCreateItemFromTaskMutation } from "../relay/__generated__/OnCreateItemCreateItemFromTaskMutation.graphql";
import { deleteTaskMutation, deleteTaskUpdater } from "./TaskCard";
import { TaskCardDeleteTaskMutation } from "../relay/__generated__/TaskCardDeleteTaskMutation.graphql";

graphql`
  fragment OnCreateItemTaskRecordToCreateItemFrom_task on Task {
    id
    date
    title
    itemId
    ...OnCreateItemItemRelatedToTask_task
    # pluginDatas {
    #   pluginSlug
    #   min
    # }
  }
`;

graphql`
  fragment OnCreateItemItemRelatedToTask_task on Task {
    item {
      id
      inboxPoints
    }
  }
`;

export const useConvertTaskToItem = () => {
  const [createItem] = useMutation<OnCreateItemCreateItemFromTaskMutation>(graphql`
    mutation OnCreateItemCreateItemFromTaskMutation($input: MutationCreateItemInput!) {
      createItem(input: $input) {
        id
        ...ItemCard_item
      }
    }
  `);

  const [deleteTask] = useMutationPromise<TaskCardDeleteTaskMutation>(deleteTaskMutation);

  const convertTaskToItem = async (input: { task: { id: string }; itemsConnectionId: string }) => {
    const store = environment.getStore().getSource();
    const taskRecord = store.get(input.task.id) as unknown as
      | OnCreateItemTaskRecordToCreateItemFrom_task$data
      | undefined
      | null;
    if (!taskRecord) return;
    const itemRecord = taskRecord.itemId
      ? ((store.get(taskRecord.itemId) ?? null) as
          | OnCreateItemItemRelatedToTask_task$data["item"]
          | null)
      : null;
    // delete the task
    await deleteTask({
      variables: { id: taskRecord.id },
      optimisticResponse: { deleteTask: { id: taskRecord.id, date: taskRecord.date } },
      updater: deleteTaskUpdater,
      optimisticUpdater: deleteTaskUpdater,
    });

    // if item doesn't exist, create item
    if (itemRecord) return;
    createItem({
      variables: { input: { title: taskRecord.title, inboxPoints: 1 } },
      updater: (store, data) => {
        if (!data) return;
        const createdItem = store.get(data.createItem.id);
        if (!createdItem) return; // just a type check

        const itemsConnection = store.get(input.itemsConnectionId);
        if (!itemsConnection) return;
        const edge = ConnectionHandler.createEdge(
          store,
          itemsConnection,
          createdItem,
          "QueryItemsConnectionEdge",
        );
        ConnectionHandler.insertEdgeAfter(itemsConnection, edge);
      },
    });
  };

  return { convertTaskToItem };
};
