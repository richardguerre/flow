import { graphql, useFragment } from "@flowdev/relay";
import {
  RoutineStep_step$data,
  RoutineStep_step$key,
} from "@flowdev/web/relay/__gen__/RoutineStep_step.graphql";
import { useEffect, useState } from "react";
import { getPlugin } from "@flowdev/web/getPlugin";
import { Button, ButtonProps } from "@flowdev/ui/Button";
import { BsArrowLeft, BsArrowRight } from "@flowdev/icons";
import { LoadingView } from "@flowdev/ui/Loading";

type RoutineStepProps = {
  step: RoutineStep_step$key;
  hasNext: boolean;
  onNext: () => void;
  hasPrevious: boolean;
  onBack: () => void;
};

export const RoutineStep = (props: RoutineStepProps) => {
  const step = useFragment(
    graphql`
      fragment RoutineStep_step on RoutineStep {
        pluginSlug
        stepSlug
        config
        templates {
          id
          createdAt
          updatedAt
          slug
          raw
          rendered
          metadata
        }
      }
    `,
    props.step,
  );
  const [StepComponent, setStepComponent] = useState<React.ComponentType<PluginRoutineStepProps>>(
    () => LoadingStep,
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
  }, [props.step]);

  const handleNext = async (pluginOnClick: NavigationButtonProps["onClick"]) => {
    await pluginOnClick?.();
    props.onNext();
  };

  const handleBack = async (pluginOnClick: NavigationButtonProps["onClick"]) => {
    await pluginOnClick?.();
    props.onBack();
  };

  return (
    <div className="max-h-screen overflow-auto w-[calc(100%-60px)]">
      <StepComponent
        firstStep={!props.hasPrevious}
        lastStep={!props.hasNext}
        stepConfig={step.config}
        templates={step.templates}
        onNext={props.onNext}
        onBack={props.onBack}
        NextButton={(p) => (
          <Button
            secondary
            onClick={() => handleNext(p.onClick)}
            children={props.hasNext ? "Next" : "Done"}
            {...p}
          />
        )}
        BackButton={(p) => (
          <Button
            secondary
            onClick={() => handleBack(p.onClick)}
            children={props.hasPrevious ? "Back" : "Cancel"}
            {...p}
          />
        )}
        ArrowNextButton={(p) => (
          <Button
            secondary
            onClick={() => handleNext(p.onClick)}
            children={<BsArrowRight />}
            {...p}
          />
        )}
        ArrowBackButton={(p) => (
          <Button
            secondary
            onClick={() => handleBack(p.onClick)}
            children={<BsArrowLeft />}
            {...p}
          />
        )}
      />
    </div>
  );
};

const LoadingStep = () => <LoadingView />;

type NavigationButtonProps = Omit<
  ButtonProps,
  "primary" | "secondary" | "tertiary" | "children" | "onClick"
> & {
  onClick?: (() => Promise<void>) | (() => void);
};

export type PluginRoutineStepProps = {
  /** Triggered when going to the next step. */
  onNext: () => void;
  /** Triggered when going to the previous step. */
  onBack: () => void;
  /**
   * Triggers the `onNext` hook and changes label from `Next` to `Done` if on the last step.
   * If you want to create a custom NextButton, use the `lastStep` prop and the `Button` component from `options.components`.
   */
  NextButton: React.ComponentType<NavigationButtonProps>;
  /**
   * Triggers the `onBack` hook and changes label from `Back` to `Cancel` if on the first step.
   * If you want to create a custom BackButton, use the `firstStep` prop and the `Button` component from `options.components`.
   */
  BackButton: React.ComponentType<NavigationButtonProps>;
  /**
   * Triggers the `onNext` hook and changes label from `Next` to `Done` if on the last step.
   * If you want to create a custom NextButton, use the `lastStep` prop and the `Button` component from `options.components`.
   */
  ArrowNextButton: React.ComponentType<NavigationButtonProps>;
  /**
   * Triggers the `onBack` hook and changes label from `Back` to `Cancel` if on the first step.
   * If you want to create a custom BackButton, use the `firstStep` prop and the `Button` component from `options.components`.
   */
  ArrowBackButton: React.ComponentType<NavigationButtonProps>;
  /** Whether this is the first step. Useful to render a custom `BackButton` (e.g. label "Close" or "Never mind") */
  firstStep: boolean;
  /** Whether this is the last step. Useful to render a custom `NextButton` (e.g. label "Done" or "Let's go!") a */
  lastStep: boolean;
  /** Config that was set in the settings for the step. */
  stepConfig: RoutineStep_step$data["config"];
  /**
   * The templates linked to the step.
   *
   * Template.rendered is rendered with the default data at the time of rendering.
   */
  // manually copied the type as TypeScript doesn't seem to be able to infer the type of the templates array
  templates: ReadonlyArray<{
    readonly createdAt: string;
    readonly id: string;
    readonly metadata: JsonValue | null | undefined;
    readonly raw: string;
    readonly rendered: string;
    readonly slug: string;
    readonly updatedAt: string;
  }>;
};
