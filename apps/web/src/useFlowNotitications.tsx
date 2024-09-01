import { graphql, useSubscription } from "@flowdev/relay";
import { useFlowNotiticationsSubscription } from "./relay/__gen__/useFlowNotiticationsSubscription.graphql";

/** This hook will establish the `notifications` subscription and will update the Relay store with any updates that it receives. */
export const useFlowNotitications = () => {
  useSubscription<useFlowNotiticationsSubscription>(
    graphql`
      subscription useFlowNotiticationsSubscription {
        notifications {
          tasksUpdated {
            ...TaskCard_task
          }
          tasksDeleted {
            id @deleteRecord
          }

          itemsUpdated {
            ...ItemCard_item
          }
          itemsDeleted {
            id @deleteRecord
          }
        }
      }
    `,
    {},
    // { onNext: (data) => console.log(data?.notifications) },
  );
};
