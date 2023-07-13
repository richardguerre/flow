import { fetchQuery, graphql } from "@flowdev/relay";
import { dayjs } from "@flowdev/web/dayjs";
import { environment } from "@flowdev/web/relay/environment";
import { getDaysDaysQuery } from "@flowdev/web/relay/__generated__/getDaysDaysQuery.graphql";
import { getDaysDaysMax10Query } from "@flowdev/web/relay/__generated__/getDaysDaysMax10Query.graphql";

// frament used in getDays and getDaysMax10
graphql`
  fragment getDaysDay_day on Day {
    ...Day_day @include(if: $renderDay)
    ...DayContent_day @include(if: $renderDayContent)
    id
    date
    tasks @include(if: $includeTasks) {
      ...TaskCard_task @include(if: $renderTaskCard)
      id
      date
      title
      canBeSuperdone
      completedAt
      createdAt
      durationInMinutes
      status
      item @include(if: $includeItem) {
        ...ItemCard_item @include(if: $renderItemCard)
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

type GetDaysOptions = {
  /** The date to start from (inclusive) */
  from: Date;
  /** The date to end at (inclusive) */
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
    ItemCard: true;
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

// This type was created because Typescript was unable to infer the type on its own.
type GetDaysResult = Promise<
  {
    id: string;
    date: string;
    tasks: {
      id: string;
      date: string;
      title: string;
      canBeSuperdone: boolean;
      completedAt: string | null;
      createdAt: string;
      durationInMinutes: number | null;
      status: string;
      item?: {
        id: string;
        createdAt: string;
        scheduledAt: string | null;
        durationInMinutes: number | null;
        isAllDay: boolean | null;
        title: string;
        color: string | null;
        isRelevant: boolean;
        pluginDatas?: {
          [pluginSlug: string]: {
            id: string;
            createdAt: string;
            updatedAt: string | null;
            pluginSlug: string;
            min: JsonValue;
            full?: JsonValue;
          };
        };
      };
      pluginDatas?: {
        [pluginSlug: string]: {
          id: string;
          createdAt: string;
          updatedAt: string | null;
          pluginSlug: string;
          min: JsonValue;
          full?: JsonValue;
        };
      };
    }[];
  }[]
>;

export const getDays = async (opts: GetDaysOptions): GetDaysResult => {
  const after = dayjs(opts.from).subtract(1, "day").format("YYYY-MM-DD");
  const first = dayjs(opts.to).diff(dayjs(opts.from), "day") + 1;

  const renderItemCard: boolean = Boolean(opts.toRender?.ItemCard);
  const includeItem: boolean = Boolean(
    renderItemCard ||
      // @ts-ignore check types in GetDaysOptions instead as that's what is expected from the plugin
      opts.include?.tasks?.item
  );
  const renderTaskCard: boolean = Boolean(opts.toRender?.TaskCard);
  const includeTasks: boolean = Boolean(renderItemCard || renderTaskCard || opts.include?.tasks);

  const daysQuery = await fetchQuery<getDaysDaysQuery>(
    environment,
    graphql`
      query getDaysDaysQuery(
        $first: Int!
        $after: ID
        $renderDays: Boolean!
        $renderDay: Boolean!
        $renderDayContent: Boolean!
        $includeTasks: Boolean!
        $renderTaskCard: Boolean!
        $includeNotes: Boolean!
        $includeItem: Boolean!
        $renderItemCard: Boolean!
        $includeTaskPluginDatas: Boolean!
        $includeTaskPluginDatasFull: Boolean!
        $includeItemPluginDatas: Boolean!
        $includeItemPluginDatasFull: Boolean!
      ) {
        ...Days_data @arguments(first: $first, after: $after) @include(if: $renderDays)
        days(first: $first, after: $after) {
          edges {
            node {
              ...getDaysDay_day @relay(mask: false)
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
      renderTaskCard,
      includeTasks,
      includeNotes: Boolean(opts.include?.notes),
      renderItemCard,
      includeItem,
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
    ItemCard: true;
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

export const getDaysMax10 = async (opts: GetDaysMax10Options) => {
  const renderItemCard: boolean = Boolean(opts.toRender?.ItemCard);
  const includeItem: boolean = Boolean(
    renderItemCard ||
      // @ts-ignore check types in GetDaysMax10Options instead as that's what is expected from the plugin
      opts.include?.tasks?.item
  );
  const renderTaskCard: boolean = Boolean(opts.toRender?.TaskCard);
  const includeTasks: boolean = Boolean(renderItemCard || renderTaskCard || opts.include?.tasks);

  const daysQuery = await fetchQuery<getDaysDaysMax10Query>(
    environment,
    graphql`
      query getDaysDaysMax10Query(
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
        $renderTaskCard: Boolean!
        $includeNotes: Boolean!
        $includeItem: Boolean!
        $renderItemCard: Boolean!
        $includeTaskPluginDatas: Boolean!
        $includeTaskPluginDatasFull: Boolean!
        $includeItemPluginDatas: Boolean!
        $includeItemPluginDatasFull: Boolean!
      ) {
        day0: node(id: $day0) @include(if: $includeDay0) {
          ...getDaysDay_day @relay(mask: false)
        }
        day1: node(id: $day1) @include(if: $includeDay1) {
          ...getDaysDay_day @relay(mask: false)
        }
        day2: node(id: $day2) @include(if: $includeDay2) {
          ...getDaysDay_day @relay(mask: false)
        }
        day3: node(id: $day3) @include(if: $includeDay3) {
          ...getDaysDay_day @relay(mask: false)
        }
        day4: node(id: $day4) @include(if: $includeDay4) {
          ...getDaysDay_day @relay(mask: false)
        }
        day5: node(id: $day5) @include(if: $includeDay5) {
          ...getDaysDay_day @relay(mask: false)
        }
        day6: node(id: $day6) @include(if: $includeDay6) {
          ...getDaysDay_day @relay(mask: false)
        }
        day7: node(id: $day7) @include(if: $includeDay7) {
          ...getDaysDay_day @relay(mask: false)
        }
        day8: node(id: $day8) @include(if: $includeDay8) {
          ...getDaysDay_day @relay(mask: false)
        }
        day9: node(id: $day9) @include(if: $includeDay9) {
          ...getDaysDay_day @relay(mask: false)
        }
      }
    `,
    {
      includeDay0: Boolean(opts.dates[0]),
      day0: toDayId(opts.dates[0]),
      includeDay1: Boolean(opts.dates[1]),
      day1: toDayId(opts.dates[1]),
      includeDay2: Boolean(opts.dates[2]),
      day2: toDayId(opts.dates[2]),
      includeDay3: Boolean(opts.dates[3]),
      day3: toDayId(opts.dates[3]),
      includeDay4: Boolean(opts.dates[4]),
      day4: toDayId(opts.dates[4]),
      includeDay5: Boolean(opts.dates[5]),
      day5: toDayId(opts.dates[5]),
      includeDay6: Boolean(opts.dates[6]),
      day6: toDayId(opts.dates[6]),
      includeDay7: Boolean(opts.dates[7]),
      day7: toDayId(opts.dates[7]),
      includeDay8: Boolean(opts.dates[8]),
      day8: toDayId(opts.dates[8]),
      includeDay9: Boolean(opts.dates[9]),
      day9: toDayId(opts.dates[9]),
      renderDay: Boolean(opts.toRender?.Day),
      renderDayContent: Boolean(opts.toRender?.DayContent),
      renderTaskCard,
      includeTasks,
      includeNotes: Boolean(opts.include?.notes),
      renderItemCard,
      includeItem,
      // @ts-ignore check types in GetDaysMax10Options instead as that's what is expected from the plugin
      includeTaskPluginDatas: Boolean(opts.include?.tasks?.pluginDatas),
      // @ts-ignore check types in GetDaysMax10Options instead as that's what is expected from the plugin
      includeTaskPluginDatasFull: Boolean(opts.include?.tasks?.pluginDatas?.full),
      // @ts-ignore check types in GetDaysMax10Options instead as that's what is expected from the plugin
      includeItemPluginDatas: Boolean(opts.include?.tasks?.item?.pluginDatas),
      // @ts-ignore check types in GetDaysMax10Options instead as that's what is expected from the plugin
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

const toDayId = (date: Date) => `Day_${dayjs(date).format("YYYY-MM-DD")}`;

// const convertToDay = (day: any) => ({

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};
