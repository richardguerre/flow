import { graphql, useFragment } from "@flowdev/relay";
import { ComponentType, Suspense, useState } from "react";
import { useAsyncEffect } from "../useAsyncEffect";
import { usePlugins } from "../getPlugin";
import {
  RenderTaskCardActions_task$data,
  RenderTaskCardActions_task$key,
} from "../relay/__generated__/RenderTaskCardActions_task.graphql";

type Props = {
  /** The details provided by Flow. */
  task: RenderTaskCardActions_task$key;
};
export const RenderTaskCardActions = (props: Props) => {
  const task = useFragment(
    graphql`
      fragment RenderTaskCardActions_task on Task {
        id
        status
        durationInMinutes
        item {
          id
          isRelevant
        }
        pluginDatas {
          id
          pluginSlug
          min
        }
      }
    `,
    props.task,
  );

  return (
    <Suspense>
      <RenderTaskCardActionsPlugins task={task} />
    </Suspense>
  );
};
type RenderTaskCardActionsPluginsProps = {
  task: RenderTaskCardActions_task$data;
};
const RenderTaskCardActionsPlugins = (props: RenderTaskCardActionsPluginsProps) => {
  const { plugins } = usePlugins();
  const [actions, setActions] = useState<Actions[]>([]);

  useAsyncEffect(async () => {
    const updatedActions: Actions[] = [];
    for (const plugin of Object.values(plugins)) {
      if (!plugin.renderTaskCardActions) continue;
      const result = await plugin.renderTaskCardActions({ task: props.task });
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

export type PluginRenderTaskCardActions = (input: {
  task: RenderTaskCardActions_task$data; // TODO type
}) => Promise<null | Actions[]>;

type Actions = { component: ComponentType };
