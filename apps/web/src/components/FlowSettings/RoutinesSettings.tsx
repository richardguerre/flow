import { graphql, useFragment } from "@flowdev/relay";
import {
  RepetitionPattern,
  RoutinesSettings_data$key,
} from "@flowdev/web/relay/__generated__/RoutinesSettings_data.graphql";
import { useMemo, useState } from "react";
import { RoutineSettings } from "./RoutineSettings";

type RoutinesSettingsProps = {
  data: RoutinesSettings_data$key;
};

export const RoutinesSettings = (props: RoutinesSettingsProps) => {
  const [routineInFocus, setRoutineInFocus] = useState<string | null>(null);
  const data = useFragment(
    graphql`
      fragment RoutinesSettings_data on Query {
        routines {
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
          ...RoutineSettings_data
        }
        installedPlugins {
          slug
        }
      }
    `,
    props.data
  );

  const installedPluginSlugs = useMemo(
    () => data.installedPlugins.map((plugin) => plugin.slug),
    [data.installedPlugins]
  );

  if (routineInFocus) {
    const routine = data.routines.find((routine) => routine.id === routineInFocus)!;
    return (
      <RoutineSettings
        routine={routine}
        onBack={() => setRoutineInFocus(null)}
        installedPluginSlugs={installedPluginSlugs}
      />
    );
  }

  return (
    <div>
      {data.routines.map((routine) => (
        <div key={routine.id} onClick={() => setRoutineInFocus(routine.id)}>
          <div>{routine.name}</div>
          <div>{routine.isActive}</div>
          <div>{getRepeatsText(routine.repeats)}</div>
          <div>{routine.time}</div>
        </div>
      ))}
    </div>
  );
};

export const getRepeatsText = (repeats: readonly RepetitionPattern[]) => {
  if (repeatsEveryDay(repeats)) return "Every day";
  if (repeatsEveryWeekDay(repeats)) return "Every weekday";
  return repeats.slice(0, 3).join(", "); // show first 3
};

const repeatsEveryDay = (repeats: readonly RepetitionPattern[]) => {
  return (
    repeats.length === 7 &&
    repeatsEveryWeekDay(repeats) &&
    repeats.includes("SATURDAY") &&
    repeats.includes("SUNDAY")
  );
};

const repeatsEveryWeekDay = (repeats: readonly RepetitionPattern[]) => {
  return (
    repeats.length === 5 &&
    repeats.includes("MONDAY") &&
    repeats.includes("TUESDAY") &&
    repeats.includes("WEDNESDAY") &&
    repeats.includes("THURSDAY") &&
    repeats.includes("FRIDAY")
  );
};
