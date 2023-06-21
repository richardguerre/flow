import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { RoutineSettings_data$key } from "@flowdev/web/relay/__generated__/RoutineSettings_data.graphql";
import { getRepeatsText } from "./RoutinesSettings";
import { Button } from "@flowdev/ui/Button";
import { useEffect, useRef, useState } from "react";
import { getPlugin } from "@flowdev/web/getPlugin";
import { WebPluginRoutineStep } from "@flowdev/plugin/web";
import { ReactSortable } from "react-sortablejs";
import { RoutineSettingsUpdateRoutineStepsMutation } from "@flowdev/web/relay/__generated__/RoutineSettingsUpdateRoutineStepsMutation.graphql";

type RoutineSettingsProps = {
  routine: RoutineSettings_data$key;
  installedPluginSlugs: string[];
  onBack: () => void;
};

type PluginRoutineStep = WebPluginRoutineStep & {
  id: string; // needed for ReactSortable
  key: string;
  pluginName: string;
};

export const RoutineSettings = (props: RoutineSettingsProps) => {
  const routine = useFragment(
    graphql`
      fragment RoutineSettings_data on Routine {
        id
        name
        isActive
        repeats
        time
        steps {
          pluginSlug
          stepSlug
          shouldSkip
        }
      }
    `,
    props.routine
  );
  const [updateRoutineSteps, isSavingChanges] =
    useMutation<RoutineSettingsUpdateRoutineStepsMutation>(graphql`
      mutation RoutineSettingsUpdateRoutineStepsMutation($input: MutationUpdateRoutineStepsInput!) {
        updateRoutineSteps(input: $input) {
          ...RoutineSettings_data
        }
      }
    `);
  const [pluginsRoutineSteps, setPluginsRoutineSteps] = useState<PluginRoutineStep[]>([]);
  const [numOfPluginsLoaded, setNumOfPluginsLoaded] = useState(0);
  const [routineSteps, setRoutineSteps] = useState(
    structuredClone(
      routine.steps.map((step) => ({ ...step, id: `${step.pluginSlug}-${step.stepSlug}` }))
    )
  );
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    for (const slug of props.installedPluginSlugs) {
      getPlugin({ pluginSlug: slug }).then((plugin) => {
        setNumOfPluginsLoaded((num) => num + 1);
        if ("_error" in plugin) return;
        const routineSteps = Object.entries(plugin.routineSteps ?? {}).map(([key, step]) => ({
          ...step,
          id: `${slug}-${key}`,
          key,
          pluginName: plugin.name,
        }));
        setPluginsRoutineSteps((steps) => [...steps, ...routineSteps]);
      });
    }
  }, [props.installedPluginSlugs]);

  const handleStepsChange = (event: any) => {
    // save changes with some debounce
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      updateRoutineSteps({
        variables: {
          input: {
            routineId: routine.id,
            steps: routineSteps,
          },
        },
      });
    }, 1000);
  };

  return (
    <div>
      <Button onClick={props.onBack}>Back</Button>
      <div>
        <div>{routine.name}</div>
        <div>{routine.isActive}</div>
        <div>{getRepeatsText(routine.repeats)}</div>
        <div>{routine.time}</div>
        {isSavingChanges && <div>Saving changes...</div>}
        <ReactSortable
          list={routineSteps}
          setList={setRoutineSteps}
          onEnd={handleStepsChange}
          className="bg-primary-50 flex flex-col"
          group={{
            name: "routine-steps",
            pull: "clone",
          }}
        >
          {routineSteps.map((step) => (
            <div key={step.id}>
              <div>{step.pluginSlug}</div>
              <div>{step.stepSlug}</div>
              <div>{step.shouldSkip}</div>
            </div>
          ))}
        </ReactSortable>
      </div>
      <div className="flex flex-col">
        <ReactSortable
          list={pluginsRoutineSteps}
          setList={setPluginsRoutineSteps}
          sort={false}
          group={{
            name: "routine-steps",
            // we don't want to clone the steps into this list
            put: false,
          }}
        >
          {pluginsRoutineSteps.map((step) => (
            <div key={step.id}>
              <div>{step.name}</div>
              <div>{step.description}</div>
              <div>{step.pluginName}</div>
            </div>
          ))}
        </ReactSortable>
        {numOfPluginsLoaded < props.installedPluginSlugs.length && <div>Loading...</div>}
      </div>
    </div>
  );
};
