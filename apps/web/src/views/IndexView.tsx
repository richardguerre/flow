import { FC } from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "relay";
import { IndexViewQuery } from "@/relay/__generated__/IndexViewQuery.graphql";

export const indexViewQuery = graphql`
  query IndexViewQuery {
    days {
      edges {
        node {
          date
        }
      }
    }
  }
`;

type IndexViewProps = {
  queryRef: PreloadedQuery<IndexViewQuery>;
};

export const IndexView: FC<IndexViewProps> = (props) => {
  const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  console.log(data);
  return null;
};
