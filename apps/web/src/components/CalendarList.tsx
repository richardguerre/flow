import { useEffect, useMemo } from "react";
import { graphql, useRefetchableFragment } from "@flowdev/relay";
import { CalendarList_data$key } from "@flowdev/web/relay/__generated__/CalendarList_data.graphql";
import { DayTimeGrid, CalendarEvent, CalendarArtifact } from "@flowdev/calendar";
import { tailwindColors } from "@flowdev/unocss";
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

  useEffect(() => {
    refetch({
      dateInFocus: dayStore.dateInFocus,
      dayIdInFocus: dayStore.dayIdInFocus,
    });
  }, [dayStore.dateInFocus, dayStore.dayIdInFocus]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-3 text-xl font-semibold">Calendar</div>
      <div className="no-scrollbar h-full overflow-y-scroll pl-3 pt-0.5 pt-3">
        <DayTimeGrid events={events} artifacts={artifacts} startHour={4} />
      </div>
    </div>
  );
};
