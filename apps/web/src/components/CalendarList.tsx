import { useMemo, useRef } from "react";
import { graphql, useRefetchableFragment, useSmartSubscription } from "@flowdev/relay";
import { CalendarList_data$key } from "@flowdev/web/relay/__generated__/CalendarList_data.graphql";
import { DayTimeGrid, CalendarEvent, CalendarArtifact } from "@flowdev/calendar";
import { tailwindColors } from "@flowdev/unocss";
import { CalendarListRefetchableQuery } from "../relay/__generated__/CalendarListRefetchableQuery.graphql";
import { CalendarListSubscription } from "../relay/__generated__/CalendarListSubscription.graphql";
import { dayjs } from "../dayjs";

type CalendarListProps = {
  data: CalendarList_data$key;
};

export const CalendarList = (props: CalendarListProps) => {
  // today 4am
  const today = useRef(dayjs().startOf("day").add(4, "hours"));
  const [tasksData] = useRefetchableFragment<CalendarListRefetchableQuery, CalendarList_data$key>(
    graphql`
      fragment CalendarList_data on Query
      @refetchable(queryName: "CalendarListRefetchableQuery")
      @argumentDefinitions(dayIdInFocus: { type: "ID!" }) {
        day: node(id: $dayIdInFocus) {
          ... on Day {
            tasks {
              id
              completedAt
            }
          }
        }
      }
    `,
    props.data
  );

  const [eventsData] = useSmartSubscription<CalendarListSubscription>(
    graphql`
      subscription CalendarListSubscription($scheduledAt: PrismaDateTimeFilter!) {
        events: items(where: { isRelevant: true, scheduledAt: $scheduledAt }) {
          edges {
            node {
              id
              title
              scheduledAt
              durationInMinutes
              isAllDay
              color
            }
          }
        }
      }
    `,
    {
      scheduledAt: {
        gte: today.current.toISOString(),
        lt: today.current.add(1, "day").toISOString(),
      },
    }
  );

  const events = useMemo(() => {
    return (
      eventsData?.events.edges.reduce((events, edge) => {
        if (!edge.node.scheduledAt) return events;
        const color = edge.node.color;
        events.push({
          id: edge.node.id,
          title: edge.node.title,
          scheduledAt: new Date(edge.node.scheduledAt!),
          textColor: color ? tailwindColors[edge.node.color]["900"] : undefined,
          backgroundColor: color ? tailwindColors[edge.node.color]["100"] : undefined,
          durationInMinutes: edge.node.durationInMinutes ?? 0,
          ...(edge.node.isAllDay ? { isAllDay: true } : {}),
        });
        return events;
      }, [] as CalendarEvent[]) ?? []
    );
  }, [eventsData?.events.edges]);

  const artifacts = useMemo(() => {
    return tasksData.day?.tasks?.reduce((artifacts, task) => {
      if (task.completedAt) {
        artifacts.push({
          id: task.id,
          at: new Date(task.completedAt),
          element: (
            <div className="h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-green-500" />
          ),
        });
      }
      return artifacts;
    }, [] as CalendarArtifact[]);
  }, [tasksData.day?.tasks]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-3 text-xl font-semibold">Calendar</div>
      <div className="no-scrollbar h-full overflow-y-scroll pl-3 pt-0.5 pt-3">
        <DayTimeGrid events={events} artifacts={artifacts} startHour={4} />
      </div>
    </div>
  );
};
