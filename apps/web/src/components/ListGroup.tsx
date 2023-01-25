import { ListGroup_data$key } from "@flowdev/web/relay/__generated__/ListGroup_data.graphql";
import { FC } from "react";
import { graphql, useFragment } from "@flowdev/relay";

type ListGroupProps = {
  data: ListGroup_data$key;
};

export const ListGroup: FC<ListGroupProps> = (props) => {
  const data = useFragment(
    graphql`
      fragment ListGroup_data on Query {
        preloadedLists: lists(first: 1) {
          name
        }
        lists {
          id
          name
        }
      }
    `,
    props.data
  );

  return (
    <div className="flex h-screen bg-gray-100 w-60">
      <div className="flex-1"></div>
      <div className="space-y-1">
        {data.lists.map((list) => (
          <div key={list.name} className="flex space-x-2 items-center">
            <div className="rounded-full bg-gray-300 h-4 w-4"></div>
            <div className="text-sm">{list.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
