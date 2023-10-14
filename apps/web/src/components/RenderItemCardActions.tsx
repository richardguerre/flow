import { graphql, useFragment } from "@flowdev/relay";
import { ComponentType, Suspense, useState } from "react";
import { useAsyncEffect } from "../useAsyncEffect";
import { usePlugins } from "../getPlugin";
import {
  RenderItemCardActions_item$data,
  RenderItemCardActions_item$key,
} from "../relay/__generated__/RenderItemCardActions_item.graphql";

type Props = {
  /** The details provided by Flow. */
  item: RenderItemCardActions_item$key;
};
export const RenderItemCardActions = (props: Props) => {
  const item = useFragment(
    graphql`
      fragment RenderItemCardActions_item on Item {
        id
        isRelevant
        pluginDatas {
          id
          pluginSlug
          min
        }
      }
    `,
    props.item,
  );

  return (
    <Suspense>
      <RenderItemCardActionsPlugins item={item} />
    </Suspense>
  );
};
type RenderItemCardActionsPluginsProps = {
  item: RenderItemCardActions_item$data;
};
const RenderItemCardActionsPlugins = (props: RenderItemCardActionsPluginsProps) => {
  const { plugins } = usePlugins();
  const [actions, setActions] = useState<Actions[]>([]);

  useAsyncEffect(async () => {
    const updatedActions: Actions[] = [];
    for (const plugin of Object.values(plugins)) {
      if (!plugin.renderItemCardActions) continue;
      const result = await plugin.renderItemCardActions({ item: props.item });
      if (!result) continue;
      updatedActions.push(...result);
    }
    setActions(updatedActions);
  }, [plugins]);

  return (
    <>
      {actions.map(({ component: Action }, i) => (
        <Action key={i} />
      ))}
    </>
  );
};

export type PluginRenderItemCardActions = (input: {
  item: RenderItemCardActions_item$data; // TODO type
}) => Promise<null | Actions[]>;

type Actions = { component: ComponentType };
