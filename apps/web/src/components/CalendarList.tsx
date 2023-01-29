import { FC, useMemo } from "react";
import { graphql, useRefetchableFragment } from "@flowdev/relay";
import { CalendarList_data$key } from "@flowdev/web/relay/__generated__/CalendarList_data.graphql";
import { DayTimeGrid, CalendarEvent, CalendarArtifact } from "@flowdev/calendar";
import colors from "windicss/colors";

type CalendarListProps = {
  data: CalendarList_data$key;
};

export const CalendarList: FC<CalendarListProps> = (props) => {
  // TODO: use React context to get the day the user is looking at and refetch the events with that day
  const [data] = useRefetchableFragment(
    graphql`
      fragment CalendarList_data on Query
      @refetchable(queryName: "CalendarListQuery")
      @argumentDefinitions(dateInFocus: { type: "Date!" }, dayIdInFocus: { type: "ID!" }) {
        events: items(where: { isRelevant: true, scheduledFor: $dateInFocus }) {
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
        textColor: color ? colors[edge.node.color]["900"] : undefined,
        backgroundColor: color ? colors[edge.node.color]["100"] : undefined,
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
            <div className="rounded-full bg-green-500 h-6 transform w-6 -translate-x-1/2 -translate-y-1/2" />
          ),
        });
      }
      return artifacts;
    }, [] as CalendarArtifact[]);
  }, [data.day?.tasks]);

  return <DayTimeGrid events={events} artifacts={artifacts} />;
};
