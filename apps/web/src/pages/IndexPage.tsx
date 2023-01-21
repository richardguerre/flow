import { useQueryLoader } from "relay";
import { IndexViewQuery } from "../relay/__generated__/IndexViewQuery.graphql";
import { IndexView, indexViewQuery } from "../views/IndexView";

export default () => {
  const { queryRef } = useQueryLoader<IndexViewQuery>(indexViewQuery);
  if (!queryRef) return null;
  return <IndexView queryRef={queryRef} />;
};
