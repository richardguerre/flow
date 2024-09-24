import { ComponentType, useState } from "react";
import { usePlugins } from "../getPlugin";
import { useAsyncEffect } from "../useAsyncEffect";
import { graphql, useFragment } from "@flowdev/relay";
import {
  RenderRoutineStepSettings_routineStep$data,
  RenderRoutineStepSettings_routineStep$key,
} from "@flowdev/web/relay/__gen__/RenderRoutineStepSettings_routineStep.graphql";
import { Suspense } from "react";
import { BsGear } from "@flowdev/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@flowdev/ui/Dialog";
import { LoadingDialog } from "@flowdev/ui/Loading";

export const RoutineStepSettings = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger type="button" onClick={(e) => e.stopPropagation()}>
        <BsGear />
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Settings for {props.stepName}</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<LoadingDialog />}>
          <RenderRoutineStepSettings {...props} onClose={() => setOpen(false)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export type Props = {
  stepName: string;
  routineStep: RenderRoutineStepSettings_routineStep$key;
};
const RenderRoutineStepSettings = (props: Props & { onClose: () => void }) => {
  const step = useFragment(
    graphql`
      fragment RenderRoutineStepSettings_routineStep on RoutineStep {
        id
        pluginSlug
        stepSlug
        config
        templates {
          id
          slug
          raw
          metadata
          routineStepId
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
    const result = await plugin.routineSteps?.[step.stepSlug].renderSettings?.({
      routineStep: step,
      onCancel: props.onClose,
      onClose: props.onClose,
    });
    if (!result) return;
    setToRender(result);
  }, [Object.keys(plugins).length, step.pluginSlug, step.stepSlug]);

  if (!toRender) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-xs">
        <div className="text-foreground-700">No settings available for this step.</div>
      </div>
    );
  }

  const ComponentToRender = toRender.component;
  return <ComponentToRender />;
};

export type PluginRenderRoutineStepSettings = (
  props: RenderRoutineStepSettings_routineStep$data,
) => Promise<null | ToRender>;
type ToRender = { component: ComponentType };
