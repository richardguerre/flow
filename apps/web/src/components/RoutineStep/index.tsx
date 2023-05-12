import { graphql, useFragment } from "@flowdev/relay";
import { PluginRoutineStepProps, WebPlugin } from "@flowdev/plugin-utils/web";
import { RoutineStep_step$key } from "@flowdev/web/relay/__generated__/RoutineStep_step.graphql";
import { useEffect, useState } from "react";

type RoutineStepProps = {
  step: RoutineStep_step$key;
};

const LoadingStep = () => <></>;

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
      if (step.pluginSlug === "flow") {
        const plugin = (await import(`@flowdev/web/plugin`)).default as WebPlugin;
        setStepComponent(
          () =>
            plugin({ components: { Button: () => <button>Plugin Button</button> } }).routineSteps?.[
              step.stepSlug
            ].component!
        );
      }
    })();
  }, []);

  return <StepComponent onNext={() => {}} onBack={() => {}} />;
};

/**
 * importPlugin()
 */
