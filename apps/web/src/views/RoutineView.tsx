import { PreloadedQuery, graphql, usePreloadedQuery, useQueryLoader } from "@flowdev/relay";
import { useParams } from "react-router-dom";
import { RoutineViewQuery } from "../relay/__generated__/RoutineViewQuery.graphql";
import { useMemo } from "react";
import dayjs from "dayjs";
import { RoutineStep } from "../components/RoutineStep";

const routineViewQuery = graphql`
  query RoutineViewQuery($previousDayId: ID!, $currentDayId: ID!, $routineId: ID!) {
    previousDay: node(id: $previousDayId) {
      ... on Day {
        routines {
          id
          done
        }
      }
    }
    currentDay: node(id: $currentDayId) {
      ... on Day {
        routines {
          id
          done
        }
      }
    }
    routine: node(id: $routineId) {
      ... on Routine {
        id
        steps {
          pluginSlug
          stepSlug
          shouldSkip
          ...RoutineStep_step
        }
      }
    }
  }
`;

export default () => {
  const params = useParams<"routineId">();
  const { queryRef } = useQueryLoader<RoutineViewQuery>(routineViewQuery, {
    previousDayId: `Day_${dayjs().subtract(1, "day").format("YYYY-MM-DD")}`,
    currentDayId: `Day_${dayjs().format("YYYY-MM-DD")}`,
    routineId: `Routine_${params.routineId}`,
  });
  if (!queryRef) return null;
  return <RoutineViewContent queryRef={queryRef} />;
};

type RoutineViewProps = {
  queryRef: PreloadedQuery<RoutineViewQuery>;
};

const RoutineViewContent = (props: RoutineViewProps) => {
  const data = usePreloadedQuery(routineViewQuery, props.queryRef);
  const params = useParams<"routineStep">();
  const { noSteps, stepsLeft } = useMemo(() => {
    if (!data.routine?.steps?.length) {
      return {
        /** When there are no steps linked to this routine. Not to be confused with `noStepsLeft`. */
        noSteps: true,
        stepsLeft: [],
      };
    }
    const routineStepIndex = data.routine.steps.findIndex(
      (step) =>
        params.routineStep && `${step.pluginSlug}_${step.stepSlug}`.includes(params.routineStep)
    );

    // check if current day's previous routine has been done
    const routineIndexInCurrentDay = data.currentDay?.routines?.findIndex(
      (routine) => routine.id === data.routine!.id
    );
    const wasPreviousRoutineInCurrentDayDone =
      data.currentDay?.routines?.[routineIndexInCurrentDay! - 1]?.done;

    // check if previous day's last routine has been done
    const wasLastRoutineInPreviousDayDone =
      data.previousDay?.routines?.[data.previousDay.routines.length - 1]?.done;
    const skipStepsWithShouldSkipTrue =
      !!wasPreviousRoutineInCurrentDayDone || !!wasLastRoutineInPreviousDayDone;

    const stepsLeft = data.routine.steps
      .slice(routineStepIndex)
      // filter out steps with `shouldSkip` set to true and `skipStepsWithShouldSkipTrue` is true
      .filter((step) => !(skipStepsWithShouldSkipTrue && step.shouldSkip));

    return {
      /** The steps left to do in this routine from the `routineStep` to the end of the routine. */
      stepsLeft,
    };
  }, [params.routineStep, data]);

  if (noSteps) {
    return <div>This routine has no steps. Please add some in your settings.</div>;
  } else if (stepsLeft.length === 0) {
    return (
      <div>
        You have completed all the steps in this routine (some may have been skipped because you
        already completed them in a previous routine).
      </div>
    );
  }

  const step = stepsLeft[0];

  return (
    <>
      <RoutineStep key={`${step.pluginSlug}${step.stepSlug}`} step={step} />
    </>
  );
};
