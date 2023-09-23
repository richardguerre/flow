import { useMemo } from "react";
import { graphql, useRefetchableFragment } from "@flowdev/relay";
import { CalendarList_data$key } from "@flowdev/web/relay/__generated__/CalendarList_data.graphql";
import { DayTimeGrid, CalendarEvent, CalendarArtifact } from "@flowdev/calendar";
import { tailwindColors } from "@flowdev/unocss";
import { CalendarListRefetchableQuery } from "../relay/__generated__/CalendarListRefetchableQuery.graphql";

type CalendarListProps = {
  data: CalendarList_data$key;
};

export const CalendarList = (props: CalendarListProps) => {
  const [data] = useRefetchableFragment<CalendarListRefetchableQuery, CalendarList_data$key>(
    graphql`
      fragment CalendarList_data on Query
      @refetchable(queryName: "CalendarListRefetchableQuery")
      @argumentDefinitions(
        scheduledAt: { type: "PrismaDateTimeFilter!" }
        dayIdInFocus: { type: "ID!" }
      ) {
        events: items(where: { scheduledAt: $scheduledAt }) {
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

  const events = useMemo(() => {
    return data.events.edges.reduce((events, edge) => {
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
    }, [] as CalendarEvent[]);
  }, [data.events.edges]);

  const artifacts = useMemo(() => {
    return data.day?.tasks?.reduce((artifacts, task) => {
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
  }, [data.day?.tasks]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-3 text-xl font-semibold">Calendar</div>
      <div className="no-scrollbar h-full overflow-y-scroll pl-3 pt-0.5 pt-3">
        <DayTimeGrid events={events} artifacts={artifacts} startHour={4} />
      </div>
    </div>
  );
};
