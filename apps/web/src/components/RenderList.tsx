import { ComponentType, Suspense, useState } from "react";
import { usePlugins } from "../getPlugin";
import { useAsyncEffect } from "../useAsyncEffect";
import { SelectedList } from "./Lists";
import { graphql, useSmartSubscription } from "@flowdev/relay";
import { ItemsConnection } from "./InboxList";
import {
  ItemFilter,
  RenderListPluginItemsSubscription,
} from "../relay/__gen__/RenderListPluginItemsSubscription.graphql";

type Props = { listId: string; plugin: NonNullable<SelectedList["plugin"]> };
export const RenderList = (props: Props) => {
  return (
    <Suspense>
      <RenderListFromPlugin {...props} />
    </Suspense>
  );
};

const RenderListFromPlugin = (props: Props) => {
  const { plugins } = usePlugins();
  const [toRender, setToRender] = useState<ToRender | null>(null);

  useAsyncEffect(async () => {
    const plugin = plugins[props.plugin.slug];
    if (!plugin) return;
    const result = await plugin.renderList?.({ listId: props.listId });
    if (!result) return;
    setToRender(result);
  }, [plugins, props.listId]);

  if (!toRender) return null;

  const ComponentToRender = toRender.component;
  return <ComponentToRender />;
};

type PluginProps = { listId: string };
export type PluginRenderList = (input: PluginProps) => Promise<null | ToRender>;
type ToRender = { component: ComponentType };

/**
 * Component to be used in the
 */
export const ItemsList = (props: { where?: ItemFilter; emptyState?: React.ReactNode }) => {
  const [data] = useSmartSubscription<RenderListPluginItemsSubscription>(
    graphql`
      subscription RenderListPluginItemsSubscription($where: ItemFilter) {
        items(where: $where) {
          edges {
            node {
              id
            }
          }
          ...InboxListItems_itemsConnection
        }
      }
    `,
    { where: props.where },
  );

  return <ItemsConnection items={data?.items ?? null} emptyState={props.emptyState} />;
};
