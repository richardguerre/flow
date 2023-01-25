import { useQueryLoader } from "@flowdev/relay";
import { IndexViewQuery } from "../relay/__generated__/IndexViewQuery.graphql";
import { IndexView, indexViewQuery } from "../views/IndexView";

export default () => {
  const daysAfterDate = new Date();
  daysAfterDate.setDate(daysAfterDate.getDate() - 7);
  const daysAfter = daysAfterDate.toISOString().split("T")[0]; // converts to YYYY-MM-DD
  const { queryRef } = useQueryLoader<IndexViewQuery>(indexViewQuery, {
    daysAfter,
    firstDays: 17, // 7 days before and 10 days after today
  });
  if (!queryRef) return null;
  return <IndexView queryRef={queryRef} />;
};
