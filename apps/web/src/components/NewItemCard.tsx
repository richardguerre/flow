import { ConnectionHandler, graphql, useMutation } from "@flowdev/relay";
import { NewItemCardCreateItemMutation } from "../relay/__generated__/NewItemCardCreateItemMutation.graphql";
import { ItemTitleInput } from "./ItemTitle";

type NewItemCardProps = {
  itemsConnectionId: string;
  onSave: () => void;
  onCancel: () => void;
};

export const NewItemCard = (props: NewItemCardProps) => {
  const [createItem] = useMutation<NewItemCardCreateItemMutation>(graphql`
    mutation NewItemCardCreateItemMutation($input: MutationCreateItemInput!) {
      createItem(input: $input) {
        ...ItemCard_item
        ...InboxListItemToBeInList_item # used by the InboxList to determine if the item should be in the list
      }
    }
  `);

  const handleSave = (title: string) => {
    props.onSave();
    createItem({
      variables: {
        input: {
          title,
          inboxPoints: 1, // make it appear in the inbox list
        },
      },
      // optimisticResponse: {
      //   createItem: {
      //     __typename: "Item",
      //     id: `Item_${Math.random()}`,
      //     title: "New item",
      //     durationInMinutes: null,
      //     scheduledAt: null,
      //     inboxPoints: 1,
      //     tasks: [],
      //   },
      // },
      // TODO: same as in NewTaskCard, figure out how optimistically add the item to the inbox list.
      updater: (store) => {
        const itemsConnection = store.get(props.itemsConnectionId);
        if (!itemsConnection) return;
        const createdItem = store.getRootField("createItem");
        const edge = ConnectionHandler.createEdge(
          store,
          itemsConnection,
          createdItem,
          "QueryItemsConnectionEdge",
        );
        ConnectionHandler.insertEdgeBefore(itemsConnection, edge);
      },
    });
  };
  return (
    <div className="bg-background-50 flex cursor-pointer flex-col gap-1 rounded-lg p-3 shadow-sm hover:shadow-md">
      <ItemTitleInput toCreate onSave={handleSave} onCancel={props.onCancel} />
    </div>
  );
};
