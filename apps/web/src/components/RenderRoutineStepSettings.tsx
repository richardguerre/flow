import { ComponentType, Suspense, useState } from "react";
import { usePlugins } from "../getPlugin";
import { useAsyncEffect } from "../useAsyncEffect";

type Props = { plugin: { slug: string }; stepSlug: string };
export const RenderRoutineStepSettings = (props: Props) => {
  return (
    <Suspense>
      <RenderRoutineStepSettingsFromPlugin {...props} />
    </Suspense>
  );
};

const RenderRoutineStepSettingsFromPlugin = (props: Props) => {
  const { plugins } = usePlugins();
  const [toRender, setToRender] = useState<ToRender | null>(null);

  useAsyncEffect(async () => {
    const plugin = plugins[props.plugin.slug];
    if (!plugin) return;
    const result = await plugin.renderRoutineStepsSettings?.[props.stepSlug]?.({});
    if (!result) return;
    setToRender(result);
  }, [plugins, props.stepSlug]);

  if (!toRender) return null;

  const ComponentToRender = toRender.component;
  return <ComponentToRender />;
};

type PluginProps = {};
export type PluginRenderRoutineStepSettings = (input: PluginProps) => Promise<null | ToRender>;
type ToRender = { component: ComponentType };
