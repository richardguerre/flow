import { graphql, useFragment } from "@flowdev/relay";
import {
  RenderCalendarActions_item$data,
  RenderCalendarActions_item$key,
} from "../relay/__generated__/RenderCalendarActions_item.graphql";
import { ComponentType, Suspense, useState } from "react";
import { useAsyncEffect } from "../useAsyncEffect";
import { usePlugins } from "../getPlugin";

const renderCalendarActions = graphql`
  fragment RenderCalendarActions_item on Item @relay(plural: true) {
    scheduledAt
    pluginDatas {
      min
    }
  }
`;
export const RenderCalendarActions = (props: { items: RenderCalendarActions_item$key }) => {
  const items = useFragment(renderCalendarActions, props.items);

  return (
    <Suspense>
      <RenderCalendarActionsPlugins items={items} />
    </Suspense>
  );
};

const RenderCalendarActionsPlugins = (props: { items: RenderCalendarActions_item$data }) => {
  const { plugins } = usePlugins();
  const [actions, setActions] = useState<Actions[]>([]);

  useAsyncEffect(async () => {
    const updatedActions: Actions[] = [];
    for (const plugin of Object.values(plugins)) {
      if (!plugin.renderCalendarActions) continue;
      const result = await plugin.renderCalendarActions({ items: props.items });
      if (!result) continue;
      updatedActions.push(...result);
    }
    setActions(updatedActions);
  }, [plugins]);

  if (!actions.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {actions.map(({ component: Action }, i) => (
        <Action key={i} />
      ))}
    </div>
  );
};

export type PluginRenderCalendarActions = (input: {
  items: RenderCalendarActions_item$data;
}) => Promise<null | Actions[]>;

export const RenderCalendarInlineActions = (props: { items: RenderCalendarActions_item$key }) => {
  const items = useFragment(renderCalendarActions, props.items);

  return (
    <Suspense>
      <RenderCalendarInlineActionsPlugins items={items} />
    </Suspense>
  );
};

const RenderCalendarInlineActionsPlugins = (props: { items: RenderCalendarActions_item$data }) => {
  const { plugins } = usePlugins();
  const [actions, setActions] = useState<Actions[]>([]);

  useAsyncEffect(async () => {
    const updatedActions: Actions[] = [];
    for (const plugin of Object.values(plugins)) {
      if (!plugin.renderCalendarInlineActions) continue;
      const result = await plugin.renderCalendarInlineActions({ items: props.items });
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

export type PluginRenderCalendarInlineActions = (input: {
  items: RenderCalendarActions_item$data;
}) => Promise<null | Actions[]>;

type Actions = { component: ComponentType };
