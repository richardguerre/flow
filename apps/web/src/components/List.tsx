import { List_list$key } from "@flowdev/web/relay/__generated__/List_list.graphql";
import { FC } from "react";
import { graphql, useFragment } from "@flowdev/relay";

type ListProps = {
  list: List_list$key;
};

export const List: FC<ListProps> = (props) => {
  const list = useFragment(
    graphql`
      fragment List_list on List {
        name
        items {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
    props.list
  );

  return (
    <div className="flex space-x-2 items-center">
      <div className="text-sm">{list.name}</div>
    </div>
  );
};
