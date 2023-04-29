import { useEffect, useMemo } from "react";
import { graphql, useRefetchableFragment } from "@flowdev/relay";
import { CalendarList_data$key } from "@flowdev/web/relay/__generated__/CalendarList_data.graphql";
import { DayTimeGrid, CalendarEvent, CalendarArtifact } from "@flowdev/calendar";
import colors from "tailwindcss/colors";
import { dayStoreAtom } from "@flowdev/web/stores/dayStore";
import { useStore } from "@flowdev/jotai";

type CalendarListProps = {
  data: CalendarList_data$key;
};

export const CalendarList = (props: CalendarListProps) => {
  // TODO: use React context to get the day the user is looking at and refetch the events with that day
  const [dayStore] = useStore(dayStoreAtom);
  const [data, refetch] = useRefetchableFragment(
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

  useEffect(() => {
    refetch({
      dateInFocus: dayStore.dateInFocus,
      dayIdInFocus: dayStore.dayIdInFocus,
    });
  }, [dayStore.dateInFocus, dayStore.dayIdInFocus]);

  return (
    <div className="flex flex-col h-full">
      <div className="font-semibold text-xl p-3">Calendar</div>
      <div className="h-full pt-3 pl-3 overflow-y-scroll">
        <DayTimeGrid events={events} artifacts={artifacts} startHour={4} />
      </div>
    </div>
  );
};
