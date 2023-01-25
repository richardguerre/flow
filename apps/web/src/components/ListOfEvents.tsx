import { graphql, useFragment } from "@flowdev/relay";

type ListOfEventsProps = {
  items: ListOfEvents_items$key;
};

export const ListOfEvents: FC<ListOfEventsProps> = (props) => {
  const items = useFragment(
    graphql`
      fragment ListOfEvents_items on List {
        createdAt
      }
    `,
    props.items
  );

  return (
    <div className="space-y-2">
      {items.events.edges.map((edge) => (
        <Event key={edge.node.id} item={edge.node} />
      ))}
    </div>
  );
};
