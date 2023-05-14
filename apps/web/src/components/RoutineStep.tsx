import { fetchQuery, graphql, useFragment } from "@flowdev/relay";
import { RoutineStep_step$key } from "@flowdev/web/relay/__generated__/RoutineStep_step.graphql";
import { useEffect, useState } from "react";
import { getPlugin } from "@flowdev/web/getPlugin";
import { Button, ButtonProps } from "@flowdev/ui/Button";
import { BsArrowLeft, BsArrowRight } from "@flowdev/icons";
import { environment } from "../relay/environment";
import { RoutineStepDaysQuery } from "../relay/__generated__/RoutineStepDaysQuery.graphql";
import dayjs from "dayjs";
import { RoutineStepDaysMax10Query } from "../relay/__generated__/RoutineStepDaysMax10Query.graphql";

type RoutineStepProps = {
  step: RoutineStep_step$key;
  hasNext: boolean;
  onNext: () => void;
  hasPrevious: boolean;
  onBack: () => void;
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
  firstStep?: boolean;
  /** Whether this is the last step. Useful to render a custom `NextButton` (e.g. label "Done" or "Let's go!") a */
  lastStep?: boolean;
  /**
   * Get days between 2 dates (inclusive) by passing `from` and `to` as part of the options.
   * If you want to get specific/discreate days, use `getDaysMax10` instead.
   */
  getDays: typeof getDays;
  /**
   * Get specific/discrete days by passing an array of Date objects (maximum 10).
   * If you want to get more than 10 days, use `getDays` instead or make multiple calls to `getDaysMax10`.
   * If you want to get a range of days (i.e. get all days between 2 dates), use `getDays` instead.
   */
  getDaysMax10: typeof getDaysMax10;
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
    <StepComponent
      onNext={props.onNext}
      onBack={props.onBack}
      NextButton={(p) => (
        <Button
          {...p}
          secondary
          onClick={() => handleNext(p.onClick)}
          children={props.hasNext ? "Next" : "Done"}
        />
      )}
      BackButton={(p) => (
        <Button
          {...p}
          secondary
          onClick={() => handleBack(p.onClick)}
          children={props.hasPrevious ? "Back" : "Cancel"}
        />
      )}
      ArrowNextButton={(p) => (
        <Button
          {...p}
          secondary
          onClick={() => handleNext(p.onClick)}
          children={<BsArrowRight />}
        />
      )}
      ArrowBackButton={(p) => (
        <Button {...p} secondary onClick={() => handleBack(p.onClick)} children={<BsArrowLeft />} />
      )}
      getDays={getDays}
      getDaysMax10={getDaysMax10}
    />
  );
};

type NavigationButtonProps = Omit<
  ButtonProps,
  "primary" | "secondary" | "tertiary" | "children" | "onClick"
> & {
  onClick?: (() => Promise<void>) | (() => void);
};

type GetDaysOptions = {
  from: Date;
  to: Date;
  /**
   * Dictionary/object of some of the components you can get from `options.components`
   * and pass in the `day` to render the component.
   */
  toRender?: Partial<{
    Days: true;
    Day: true;
    DayContent: true;
    TaskCard: true;
  }>;
  /**
   * Whether to include the `tasks` or `notes` in the days.
   *
   * By default they are not included as to minimize the amount of data fetched.
   */
  include?: DeepPartial<{
    tasks:
      | true
      | {
          item: true | { pluginDatas: true | { full: true } };
          pluginDatas: true | { full: true };
        };
    notes: true;
  }>;
};

// frament used in getDays and getDaysMax10
graphql`
  fragment RoutineStepDay_day on Day {
    ...Day_day @include(if: $renderDay)
    ...DayContent_day @include(if: $renderDayContent)
    id
    date
    tasks @include(if: $includeTasks) {
      ...TaskCard_task @include(if: $renderTask)
      id
      date
      title
      canBeSuperdone
      completedAt
      createdAt
      durationInMinutes
      status
      item @include(if: $includeItem) {
        id
        createdAt
        scheduledAt
        durationInMinutes
        isAllDay
        title
        color
        isRelevant
        pluginDatas @include(if: $includeItemPluginDatas) {
          id
          createdAt
          updatedAt
          pluginSlug
          min
          full @include(if: $includeItemPluginDatasFull)
        }
      }
      pluginDatas @include(if: $includeTaskPluginDatas) {
        id
        createdAt
        updatedAt
        pluginSlug
        min
        full @include(if: $includeTaskPluginDatasFull)
      }
    }
    notes @include(if: $includeNotes) {
      id
      slug
      date
      createdAt
      updatedAt
      title
      content
    }
  }
`;

const getDays = async (opts: GetDaysOptions) => {
  const after = dayjs(opts.from).subtract(1, "day").format("YYYY-MM-DD");
  const first = dayjs(opts.to).diff(dayjs(opts.from), "day") + 1;

  const renderTask: boolean = Boolean(opts.toRender?.TaskCard);
  const includeTasks: boolean = Boolean(renderTask || opts.include?.tasks);

  const daysQuery = await fetchQuery<RoutineStepDaysQuery>(
    environment,
    graphql`
      query RoutineStepDaysQuery(
        $first: Int!
        $after: ID
        $renderDays: Boolean!
        $renderDay: Boolean!
        $renderDayContent: Boolean!
        $includeTasks: Boolean!
        $renderTask: Boolean!
        $includeNotes: Boolean!
        $includeItem: Boolean!
        $includeTaskPluginDatas: Boolean!
        $includeTaskPluginDatasFull: Boolean!
        $includeItemPluginDatas: Boolean!
        $includeItemPluginDatasFull: Boolean!
      ) {
        ...Days_data @arguments(first: $first, after: $after) @include(if: $renderDays)
        days(first: $first, after: $after) {
          edges {
            node {
              ...RoutineStepDay_day @relay(mask: false)
            }
          }
        }
      }
    `,
    {
      first,
      after,
      renderDays: Boolean(opts.toRender?.Days),
      renderDay: Boolean(opts.toRender?.Day),
      renderDayContent: Boolean(opts.toRender?.DayContent),
      renderTask,
      includeTasks,
      includeNotes: Boolean(opts.include?.notes),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeItem: Boolean(opts.include?.tasks?.item),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeTaskPluginDatas: Boolean(opts.include?.tasks?.pluginDatas),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeTaskPluginDatasFull: Boolean(opts.include?.tasks?.pluginDatas?.full),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeItemPluginDatas: Boolean(opts.include?.tasks?.item?.pluginDatas),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeItemPluginDatasFull: Boolean(opts.include?.tasks?.item?.pluginDatas?.full),
    }
  ).toPromise();

  return (
    daysQuery?.days?.edges.map((edge) => ({
      ...edge.node,
      tasks:
        edge.node.tasks?.map((task) => ({
          ...task,
          pluginDatas: Object.fromEntries(task.pluginDatas?.map((pd) => [pd.pluginSlug, pd]) ?? []),
          item: task.item
            ? {
                ...task.item,
                pluginDatas: Object.fromEntries(
                  task.item.pluginDatas?.map((pd) => [pd.pluginSlug, pd]) ?? []
                ),
              }
            : undefined,
        })) ?? [],
    })) ?? []
  );
};

const getDaysMax10 = async (opts: GetDaysMax10Options) => {
  const renderTask: boolean = Boolean(opts.toRender?.TaskCard);
  const includeTasks: boolean = Boolean(renderTask || opts.include?.tasks);

  const daysQuery = await fetchQuery<RoutineStepDaysMax10Query>(
    environment,
    graphql`
      query RoutineStepDaysMax10Query(
        $includeDay0: Boolean!
        $day0: ID!
        $includeDay1: Boolean!
        $day1: ID!
        $includeDay2: Boolean!
        $day2: ID!
        $includeDay3: Boolean!
        $day3: ID!
        $includeDay4: Boolean!
        $day4: ID!
        $includeDay5: Boolean!
        $day5: ID!
        $includeDay6: Boolean!
        $day6: ID!
        $includeDay7: Boolean!
        $day7: ID!
        $includeDay8: Boolean!
        $day8: ID!
        $includeDay9: Boolean!
        $day9: ID!
        $renderDay: Boolean!
        $renderDayContent: Boolean!
        $includeTasks: Boolean!
        $renderTask: Boolean!
        $includeNotes: Boolean!
        $includeItem: Boolean!
        $includeTaskPluginDatas: Boolean!
        $includeTaskPluginDatasFull: Boolean!
        $includeItemPluginDatas: Boolean!
        $includeItemPluginDatasFull: Boolean!
      ) {
        day0: node(id: $day0) @include(if: $includeDay0) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day1: node(id: $day1) @include(if: $includeDay1) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day2: node(id: $day2) @include(if: $includeDay2) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day3: node(id: $day3) @include(if: $includeDay3) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day4: node(id: $day4) @include(if: $includeDay4) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day5: node(id: $day5) @include(if: $includeDay5) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day6: node(id: $day6) @include(if: $includeDay6) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day7: node(id: $day7) @include(if: $includeDay7) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day8: node(id: $day8) @include(if: $includeDay8) {
          ...RoutineStepDay_day @relay(mask: false)
        }
        day9: node(id: $day9) @include(if: $includeDay9) {
          ...RoutineStepDay_day @relay(mask: false)
        }
      }
    `,
    {
      includeDay0: Boolean(opts.dates[9]),
      day0: toDayId(opts.dates[9]),
      includeDay1: Boolean(opts.dates[0]),
      day1: toDayId(opts.dates[0]),
      includeDay2: Boolean(opts.dates[1]),
      day2: toDayId(opts.dates[1]),
      includeDay3: Boolean(opts.dates[2]),
      day3: toDayId(opts.dates[2]),
      includeDay4: Boolean(opts.dates[3]),
      day4: toDayId(opts.dates[3]),
      includeDay5: Boolean(opts.dates[4]),
      day5: toDayId(opts.dates[4]),
      includeDay6: Boolean(opts.dates[5]),
      day6: toDayId(opts.dates[5]),
      includeDay7: Boolean(opts.dates[6]),
      day7: toDayId(opts.dates[6]),
      includeDay8: Boolean(opts.dates[7]),
      day8: toDayId(opts.dates[7]),
      includeDay9: Boolean(opts.dates[8]),
      day9: toDayId(opts.dates[8]),
      renderDay: Boolean(opts.toRender?.Day),
      renderDayContent: Boolean(opts.toRender?.DayContent),
      renderTask,
      includeTasks,
      includeNotes: Boolean(opts.include?.notes),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeItem: Boolean(opts.include?.tasks?.item),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeTaskPluginDatas: Boolean(opts.include?.tasks?.pluginDatas),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeTaskPluginDatasFull: Boolean(opts.include?.tasks?.pluginDatas?.full),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeItemPluginDatas: Boolean(opts.include?.tasks?.item?.pluginDatas),
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      includeItemPluginDatasFull: Boolean(opts.include?.tasks?.item?.pluginDatas?.full),
    }
  ).toPromise();

  return [
    daysQuery?.day0,
    daysQuery?.day1,
    daysQuery?.day2,
    daysQuery?.day3,
    daysQuery?.day4,
    daysQuery?.day5,
    daysQuery?.day6,
    daysQuery?.day7,
    daysQuery?.day8,
    daysQuery?.day9,
  ];
};

type GetDaysMax10Options = {
  dates: Date[];
  /**
   * Dictionary/object of some of the components you can get from `options.components`
   * and pass in the `day` to render the component.
   */
  toRender?: Partial<{
    Days: true;
    Day: true;
    DayContent: true;
    TaskCard: true;
  }>;
  /**
   * Whether to include the `tasks` or `notes` in the days.
   *
   * By default they are not included as to minimize the amount of data fetched.
   */
  include?: DeepPartial<{
    tasks:
      | true
      | {
          item: true | { pluginDatas: true | { full: true } };
          pluginDatas: true | { full: true };
        };
    notes: true;
  }>;
};

const toDayId = (date: Date) => `Day_${dayjs(date).format("YYYY-MM-DD")}`;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};
