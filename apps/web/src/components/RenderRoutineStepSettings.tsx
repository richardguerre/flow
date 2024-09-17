import { ComponentType, useState } from "react";
import { usePlugins } from "../getPlugin";
import { useAsyncEffect } from "../useAsyncEffect";
import { suspend } from "@flowdev/ui/suspend";
import { graphql, useFragment } from "@flowdev/relay";
import {
  RenderRoutineStepSettings_routineStep$data,
  RenderRoutineStepSettings_routineStep$key,
} from "@flowdev/web/relay/__gen__/RenderRoutineStepSettings_routineStep.graphql";
import { Suspense } from "react";
import { BsGear } from "@flowdev/icons";
import { Dialog, DialogContent, DialogTrigger } from "@flowdev/ui/Dialog";
import { LoadingDialog } from "@flowdev/ui/Loading";

export const RoutineStepSettings = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger type="button">
        <BsGear />
      </DialogTrigger>
      <DialogContent>
        <Suspense fallback={<LoadingDialog />}>
          <RenderRoutineStepSettings {...props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export type Props = {
  routineStep: RenderRoutineStepSettings_routineStep$key;
};
export const RenderRoutineStepSettings = (props: Props) => {
  const step = useFragment(
    graphql`
      fragment RenderRoutineStepSettings_routineStep on RoutineStep {
        pluginSlug
        stepSlug
        config
        templates {
          id
          raw
        }
      }
    `,
    props.routineStep,
  );
  const { plugins } = usePlugins();
  const [toRender, setToRender] = useState<ToRender | null>(null);

  useAsyncEffect(async () => {
    const plugin = plugins[step.pluginSlug];
    if (!plugin) return;
    suspend(
      plugin.routineSteps?.[step.stepSlug].renderSettings?.(step).then((result) => {
        if (!result) return;
        setToRender(result);
      }),
    );
  }, [step.pluginSlug, step.stepSlug]);

  if (!toRender) return null;

  const ComponentToRender = toRender.component;
  return <ComponentToRender />;
};

export type PluginRenderRoutineStepSettings = (
  props: RenderRoutineStepSettings_routineStep$data,
) => Promise<null | ToRender>;
type ToRender = { component: ComponentType };
