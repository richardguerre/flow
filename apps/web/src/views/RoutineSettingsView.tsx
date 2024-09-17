import { useLazyLoadQuery, graphql, useFragment, useMutationPromise } from "@flowdev/relay";
import { RoutineSettingsViewQuery } from "../relay/__gen__/RoutineSettingsViewQuery.graphql";
import { Checkbox } from "@flowdev/ui/Checkbox";
import { Badge } from "@flowdev/ui/Badge";
import { tw } from "@flowdev/ui/tw";
import {
  RepetitionPattern,
  RoutineSettingsViewRepeats_routine$key,
} from "../relay/__gen__/RoutineSettingsViewRepeats_routine.graphql";
import { toast } from "@flowdev/ui/Toast";
import { RoutineSettingsViewUpdateRepeatsMutation } from "../relay/__gen__/RoutineSettingsViewUpdateRepeatsMutation.graphql";
import { RoutineSettingsViewUpdateActiveMutation } from "../relay/__gen__/RoutineSettingsViewUpdateActiveMutation.graphql";
import { useEffect, useMemo, useState } from "react";
import { BsArrowRightShort, BsSkipForward, BsTrash } from "@flowdev/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { Button } from "@flowdev/ui/Button";
import { RoutineSettingsViewCreateRoutineMutation } from "../relay/__gen__/RoutineSettingsViewCreateRoutineMutation.graphql";
import { RoutineSettingsViewDetailed_routine$key } from "../relay/__gen__/RoutineSettingsViewDetailed_routine.graphql";
import { RoutineSettingsView_routineStep$key } from "../relay/__gen__/RoutineSettingsView_routineStep.graphql";
import { FormInput } from "@flowdev/ui/FormInput";
import { Controller, useForm } from "react-hook-form";
import { useDebounce } from "../useDebounce";
import { RoutineSettingsViewActiveCheckbox_routine$key } from "../relay/__gen__/RoutineSettingsViewActiveCheckbox_routine.graphql";
import {
  RoutineSettingsViewUpdateRoutineMutation,
  RoutineStepInput,
} from "../relay/__gen__/RoutineSettingsViewUpdateRoutineMutation.graphql";
import { PluginsRecord, usePlugins } from "../getPlugin";
import { ReactSortable } from "react-sortablejs";
import { RoutineStepSettings } from "../components/RenderRoutineStepSettings";

graphql`
  fragment RoutineSettingsView_routine on Routine {
    id
    name
    time
    ...RoutineSettingsViewActiveCheckbox_routine
    ...RoutineSettingsViewRepeats_routine
    ...RoutineSettingsViewDetailed_routine
  }
`;

export default () => {
  const { plugins } = usePlugins();
  const data = useLazyLoadQuery<RoutineSettingsViewQuery>(
    graphql`
      query RoutineSettingsViewQuery {
        routines {
          ...RoutineSettingsView_routine @relay(mask: false)
        }
      }
    `,
    {},
  );
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(
    data.routines[0]?.id ?? null,
  );

  const [createRoutine] = useMutationPromise<RoutineSettingsViewCreateRoutineMutation>(graphql`
    mutation RoutineSettingsViewCreateRoutineMutation($input: MutationCreateRoutineInput!) {
      createRoutine(input: $input) {
        id
        ...RoutineSettingsView_routine
      }
    }
  `);

  const handleNewRoutine = async () => {
    const result = await toast.promise(
      createRoutine({
        variables: {
          input: {
            name: "New routine",
            actionName: "Plan",
            repeats: [],
            steps: [],
            time: "08:00",
          },
        },
        optimisticUpdater: (store) => {
          const newRoutine = store.create(`client:newRoutine${new Date()}`, "Routine");
          newRoutine.setValue("New routine", "name");
          newRoutine.setValue("Plan", "actionName");
          newRoutine.setValue("08:00", "time");
          newRoutine.setValue(false, "isActive");
          newRoutine.setValue([], "repeats");
          newRoutine.setValue([], "steps");
          const root = store.getRoot();
          const existingRoutines = root.getLinkedRecords("routines");
          root.setLinkedRecords([...(existingRoutines ?? []), newRoutine], "routines");
        },
      }),
      {
        loading: "Creating new routine...",
        success: "Routine created!",
        error: "Failed to create routine. Please try again.",
      },
    );

    setSelectedRoutine(result.createRoutine.id);
  };

  return (
    <div className="bg-background-50 flex max-h-screen w-full flex-col gap-4 overflow-auto p-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <div className="text-foreground-700">Manage your routines</div>
      </div>
      <div className="grid grid-cols-[minmax(0,_576px)_minmax(0,_1fr)] gap-4">
        <div className="flex flex-col items-start gap-2">
          {data.routines.map((routine) => (
            <button
              className="hover:bg-background-100 flex w-full justify-between gap-4 rounded-md px-4 py-2 transition-colors"
              onClick={() => setSelectedRoutine(routine.id)}
            >
              <div className="flex items-center gap-2">
                <ActiveCheckbox routine={routine} />
                {routine.name}
              </div>
              <div className="flex items-center gap-2">
                <Repeats routine={routine} />
                <Badge className="bg-gray-200 text-gray-600">{routine.time}</Badge>
                <BsArrowRightShort
                  className={tw(
                    selectedRoutine === routine.id ? "text-foreground-900" : "text-foreground-700",
                  )}
                />
              </div>
            </button>
          ))}
          <Button tertiary sm onClick={handleNewRoutine}>
            New routine
          </Button>
        </div>
        {selectedRoutine && (
          <RoutineDetailedSettings
            routine={data.routines.find((r) => r.id === selectedRoutine)!}
            plugins={plugins}
          />
        )}
      </div>
    </div>
  );
};

const ActiveCheckbox = (props: { routine: RoutineSettingsViewActiveCheckbox_routine$key }) => {
  const routine = useFragment(
    graphql`
      fragment RoutineSettingsViewActiveCheckbox_routine on Routine {
        id
        isActive
      }
    `,
    props.routine,
  );

  const [updateRoutine] = useMutationPromise<RoutineSettingsViewUpdateActiveMutation>(graphql`
    mutation RoutineSettingsViewUpdateActiveMutation($input: MutationUpdateRoutineInput!) {
      updateRoutine(input: $input) {
        id
        isActive
      }
    }
  `);

  const handleActiveChange = (id: string, isActive: boolean) => {
    toast.promise(
      updateRoutine({
        variables: { input: { routineId: id, isActive } },
        optimisticResponse: { updateRoutine: { id, isActive } },
      }),
      {
        loading: "Updating routine...",
        success: "Routine updated!",
        error: "Failed to update routine. Please try again.",
      },
    );
  };

  return (
    <Checkbox
      checked={routine.isActive}
      onCheckedChange={(isActive) => handleActiveChange(routine.id, !!isActive)}
    />
  );
};

const weekdays: RepetitionPattern[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
const Repeats = (props: { routine: RoutineSettingsViewRepeats_routine$key }) => {
  const routine = useFragment(
    graphql`
      fragment RoutineSettingsViewRepeats_routine on Routine {
        id
        repeats
      }
    `,
    props.routine,
  );

  const [updateRoutine] = useMutationPromise<RoutineSettingsViewUpdateRepeatsMutation>(graphql`
    mutation RoutineSettingsViewUpdateRepeatsMutation($input: MutationUpdateRoutineInput!) {
      updateRoutine(input: $input) {
        id
        repeats
      }
    }
  `);

  const handleClick = (day: RepetitionPattern) => {
    const updatedRepeats = routine.repeats.includes(day)
      ? routine.repeats.filter((d) => d !== day)
      : [...routine.repeats, day];
    toast.promise(
      updateRoutine({
        variables: { input: { routineId: routine.id, repeats: updatedRepeats } },
        optimisticResponse: { updateRoutine: { id: routine.id, repeats: updatedRepeats } },
      }),
      {
        loading: "Updating routine...",
        success: "Routine updated!",
        error: "Failed to update routine. Please try again.",
      },
    );
  };

  return (
    <div className="flex gap-1">
      {weekdays.map((day) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleClick(day)}
              type="button"
              className={tw(
                "flex h-7 w-7 appearance-none items-center justify-center rounded-full text-xs",
                routine.repeats.includes(day)
                  ? "bg-primary-100 text-primary-600"
                  : "bg-gray-200 text-gray-600",
              )}
            >
              {day[0]}
            </button>
          </TooltipTrigger>
          <TooltipContent>{day[0] + day.slice(1).toLowerCase()}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

type RoutineStepType = RoutineStepInput & { id: string };
type FormValues = {
  name: string;
  time: string;
  actionName: string;
  steps: Array<RoutineStepType>;
};
type RoutineDetailedSettingsProps = {
  routine: RoutineSettingsViewDetailed_routine$key;
  plugins: PluginsRecord;
};
const RoutineDetailedSettings = (props: RoutineDetailedSettingsProps) => {
  const routine = useFragment(
    graphql`
      fragment RoutineSettingsViewDetailed_routine on Routine {
        id
        name
        time
        actionName
        steps {
          id
          pluginSlug
          stepSlug
          shouldSkip
          ...RoutineSettingsView_routineStep
        }
        ...RoutineSettingsViewActiveCheckbox_routine
        ...RoutineSettingsViewRepeats_routine
      }
    `,
    props.routine,
  );

  const [updateRoutine] = useMutationPromise<RoutineSettingsViewUpdateRoutineMutation>(graphql`
    mutation RoutineSettingsViewUpdateRoutineMutation($input: MutationUpdateRoutineInput!) {
      updateRoutine(input: $input) {
        ...RoutineSettingsViewDetailed_routine
      }
    }
  `);

  const { register, control, handleSubmit, formState, watch, reset } = useForm<FormValues>({
    mode: "onChange",
  });
  const values = watch();
  const [, , cancelDebounce] = useDebounce(
    { values, isDirty: formState.isDirty, isValid: formState.isValid },
    1000,
    ({ values, isDirty, isValid }) => {
      if (!isDirty || !isValid) return;
      onSubmit(values);
    },
  );

  const onSubmit = (values: FormValues) => {
    cancelDebounce();
    toast.promise(
      updateRoutine({
        variables: {
          input: {
            routineId: routine.id,
            name: values.name,
            time: values.time,
            actionName: values.actionName,
            steps: values.steps.map((step) => ({
              id: step.id,
              pluginSlug: step.pluginSlug,
              stepSlug: step.stepSlug,
              shouldSkip: step.shouldSkip,
            })),
          },
        },
      }),
      {
        loading: "Updating routine...",
        success: "Routine updated!",
        error: "Failed to update routine. Please try again.",
      },
    );
  };

  const pluginSteps: RoutineStepType[] = useMemo(() => {
    return Object.entries(props.plugins).flatMap(([pluginSlug, plugin]) =>
      Object.keys(plugin.routineSteps ?? {}).map((stepSlug) => ({
        id: `${pluginSlug}_${stepSlug}_${Math.random()}`,
        pluginSlug,
        stepSlug,
        shouldSkip: false,
      })),
    );
  }, [props.plugins]);

  useEffect(() => {
    reset({
      name: routine.name,
      time: routine.time,
      actionName: routine.actionName,
      steps: Array.from(routine.steps),
    });
  }, [routine.name, routine.actionName, routine.time, routine.steps]);

  const routineSteps = Object.fromEntries(routine.steps.map((step) => [step.id, step]));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background-50 flex w-full flex-col gap-4 rounded-md p-6 shadow"
    >
      <div className="flex items-center gap-2">
        <ActiveCheckbox routine={routine} />
        <input
          className="hover:text-primary-500 w-fit appearance-none rounded bg-transparent text-2xl font-semibold focus:outline-none active:outline-none"
          defaultValue={routine.name}
          {...register("name", { required: true })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Repeats routine={routine} />
        <FormInput
          type="time"
          defaultValue={routine.time}
          {...register("time", { required: true })}
        />
      </div>
      <FormInput
        label="Action label"
        description="Label of the button shown in the Kanban view to start the routine."
        className="max-w-xs"
        defaultValue={routine.actionName}
        {...register("actionName", { required: true })}
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground-900 text-base font-medium">Steps</h2>
        <div className="text-foreground-700">
          Steps are executed in the order they are listed. Drag and drop to reorder them.
        </div>
        <Controller
          name="steps"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <ReactSortable
              className="max-h-70 min-h-8 overflow-auto"
              list={field.value}
              setList={field.onChange}
              group="shared"
            >
              {field.value.map((step) => (
                <RoutineStep
                  key={step.id}
                  step={step}
                  plugins={props.plugins}
                  routineStep={routineSteps[step.id]}
                  withActions
                  onSkipChange={(stepId, shouldSkip) => {
                    const stepIndex = field.value.findIndex((s) => s.id === stepId);
                    if (stepIndex === -1) return;
                    const updatedStep = { ...field.value[stepIndex], shouldSkip };
                    field.onChange([
                      ...field.value.slice(0, stepIndex),
                      updatedStep,
                      ...field.value.slice(stepIndex + 1),
                    ]);
                  }}
                  onRemove={(stepId) => {
                    const stepIndex = field.value.findIndex((s) => s.id === stepId);
                    if (stepIndex === -1) return;
                    field.onChange([
                      ...field.value.slice(0, stepIndex),
                      ...field.value.slice(stepIndex + 1),
                    ]);
                  }}
                />
              ))}
            </ReactSortable>
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground-900 text-base font-medium">Add steps</h2>
        <div className="text-foreground-700">
          Add steps to your routine by dragging them from the list below to the list above.
        </div>
        <ReactSortable
          className="max-h-66 overflow-auto"
          list={pluginSteps}
          setList={() => {}}
          group="shared"
        >
          {pluginSteps.map((step) => (
            <RoutineStep key={step.id} step={step} plugins={props.plugins} />
          ))}
        </ReactSortable>
      </div>
    </form>
  );
};

const RoutineStep = (props: {
  routineStep?: RoutineSettingsView_routineStep$key;
  step: RoutineStepType;
  plugins: PluginsRecord;
  withActions?: boolean;
  onSkipChange?: (stepId: string, shouldSkip: boolean) => void;
  onRemove?: (stepId: string) => void;
}) => {
  const routineStepRelay = useFragment(
    graphql`
      fragment RoutineSettingsView_routineStep on RoutineStep {
        ...RenderRoutineStepSettings_routineStep
      }
    `,
    props.routineStep,
  );
  const actions = (
    <div className="bg-background-50 absolute right-0 flex items-center justify-end gap-4 px-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={tw(
              "flex h-6 w-6 items-center justify-center rounded-full",
              props.step.shouldSkip
                ? "bg-primary-100 text-primary-600"
                : "bg-gray-200 text-gray-600",
            )}
            onClick={() => props.onSkipChange?.(props.step.id, !props.step.shouldSkip)}
          >
            <BsSkipForward size="16" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-3">
          Whether to skip the step if the routine preceding this routine was done (i.e. the user
          completed the step in the previous routine.)
          <br />
          <br />
          For example, skip retroing on yesterday if you already did a retro yesterday.
        </TooltipContent>
      </Tooltip>
      {routineStepRelay && <RoutineStepSettings routineStep={routineStepRelay} />}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="bg-negative-100 text-negative-600 flex h-6 w-6 items-center justify-center rounded-full"
            onClick={() => props.onRemove?.(props.step.id)}
          >
            <BsTrash size="16" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Remove step</TooltipContent>
      </Tooltip>
    </div>
  );

  const plugin = props.plugins[props.step.pluginSlug];
  if (!plugin?.routineSteps?.[props.step.stepSlug]) {
    return (
      <div id={props.step.id} className="relative">
        {props.step.stepSlug} {props.step.pluginSlug} (plugin not installed anymore)
        {props.withActions && actions}
      </div>
    );
  }

  const routineStep = plugin.routineSteps?.[props.step.stepSlug];
  return (
    <div
      id={props.step.id}
      className="bg-background-50 relative flex cursor-grab items-center gap-2 rounded px-4 py-2"
    >
      <div className="shrink-0 font-medium">{routineStep.name}</div>
      <div className="text-foreground-700 shrink-0 text-sm">({plugin.name})</div>
      <div className="text-foreground-700 truncate text-sm">{routineStep.description}</div>
      {props.withActions && actions}
    </div>
  );
};
