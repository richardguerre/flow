import { graphql, useFragment } from "@flowdev/relay";
import { PluginRoutineStepProps } from "@flowdev/plugin-utils/web";
import { RoutineStep_step$key } from "@flowdev/web/relay/__generated__/RoutineStep_step.graphql";
import { useEffect, useState } from "react";
import { getPlugin } from "@flowdev/web/getPlugin";

type RoutineStepProps = {
  step: RoutineStep_step$key;
};

const LoadingStep = () => <>Loading...</>;

export const RoutineStep = (props: RoutineStepProps) => {
  const step = useFragment(
    graphql`
      fragment RoutineStep_step on RoutineStep {
        pluginSlug
        stepSlug
      }
    `,
    props.step
  );
  const [StepComponent, setStepComponent] = useState<React.ComponentType<PluginRoutineStepProps>>(
    () => LoadingStep
  );

  useEffect(() => {
    (async () => {
      const plugin = await getPlugin({ pluginSlug: step.pluginSlug });
      if ("_error" in plugin) {
        console.log(plugin._error);
        // TODO: surface error to the user
        return;
      } else if (!plugin.routineSteps?.[step.stepSlug].component) {
        console.log(`Plugin ${step.pluginSlug} does not have the requested routine step.`);
        // TODO: surface error to the user
        return;
      } else {
        setStepComponent(() => plugin.routineSteps?.[step.stepSlug].component!);
      }
    })();
  }, []);

  return <StepComponent onNext={() => {}} onBack={() => {}} />;
};
