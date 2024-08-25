import { fetchQuery, graphql } from "@flowdev/relay";
import { useAsyncLoader } from "../useAsyncLoader";
import { environment } from "../relay/environment";
import { getStoreUtilsGetQuery } from "../relay/__generated__/getStoreUtilsGetQuery.graphql";

export const getStoreUtils = (defaultSlug: string) => {
  const get = async (keys?: string[], pluginSlug?: string | null) => {
    const data = await fetchQuery<getStoreUtilsGetQuery>(
      environment,
      graphql`
        query getStoreUtilsGetQuery($where: QueryStoreItemsInput!) {
          storeItems(where: $where) {
            key
            value
          }
        }
      `,
      {
        where: {
          keys,
          pluginSlug: pluginSlug === undefined ? defaultSlug : pluginSlug,
        },
      },
    ).toPromise();
    return Object.fromEntries(data?.storeItems.map((item) => [item.key, item.value]) ?? []);
  };

  return {
    /** The pluginSlug is optional. You can pass `null` if you want to get an item from flow (e.g. theme). */
    get,
    useStore: (keys?: string[], pluginSlug?: string) => {
      return useAsyncLoader(async () => {
        return get(keys, pluginSlug);
      });
    },
  };
};
