import { commitMutationPromise, graphql } from "@flowdev/relay";
import { environment } from "../relay/environment";
import { createItemMutation } from "../relay/__gen__/createItemMutation.graphql";

export const createItem = async (input: createItemMutation["variables"]["input"]) => {
  const { createItem } = await commitMutationPromise<createItemMutation>(environment, {
    mutation: graphql`
      mutation createItemMutation($input: MutationCreateItemInput!) {
        createItem(input: $input) {
          ...ItemCard_item
          id
          createdAt
          title
          isRelevant
          scheduledAt
          durationInMinutes
          isAllDay
          color
          pluginDatas {
            id
            createdAt
            updatedAt
            pluginSlug
            min
          }
        }
      }
    `,
    variables: { input },
  });

  return createItem;
};
