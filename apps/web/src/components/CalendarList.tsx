import { DragEventHandler, useEffect, useMemo, useRef, useState } from "react";
import {
  graphql,
  useFragment,
  useMutation,
  useRefetchableFragment,
  useSmartSubscription,
} from "@flowdev/relay";
import { CalendarList_data$key } from "@flowdev/web/relay/__generated__/CalendarList_data.graphql";
import { DayTimeGrid, CalendarEvent, CalendarArtifact } from "@flowdev/calendar";
import { tailwindColors } from "@flowdev/unocss";
import { CalendarListRefetchableQuery } from "../relay/__generated__/CalendarListRefetchableQuery.graphql";
import { CalendarListSubscription } from "../relay/__generated__/CalendarListSubscription.graphql";
import { dayjs } from "../dayjs";
import { useDragContext } from "../useDragContext";
import { RenderCalendarActions, RenderCalendarInlineActions } from "./RenderCalendarActions";
import { Button } from "@flowdev/ui/Button";
import { BsArrowClockwise } from "@flowdev/icons";
import { CalendarListRefreshMutation } from "../relay/__generated__/CalendarListRefreshMutation.graphql";

const START_HOUR = 4;

type CalendarListProps = {
  data: CalendarList_data$key;
};

export const CalendarList = (props: CalendarListProps) => {
  const today = useRef(dayjs().startOf("day").add(START_HOUR, "hours"));
  const [tasksData] = useRefetchableFragment<CalendarListRefetchableQuery, CalendarList_data$key>(
    graphql`
      fragment CalendarList_data on Query
      @refetchable(queryName: "CalendarListRefetchableQuery")
      @argumentDefinitions(dayIdInFocus: { type: "ID!" }) {
        canRefreshCalendarItems
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
    props.data,
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
              ...RenderCalendarActions_item
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
    },
  );
  const [dragY, setDragY] = useState<number | null>(null);
  const { dragged } = useDragContext();
  const draggedInTask = useFragment(
    graphql`
      fragment CalendarListTaskCardDraggedIn_task on Task {
        id
        title
        durationInMinutes
      }
    `,
    dragged,
  );

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top; // y position within the element.
    const h = Math.round((y / rect.height) * 24 * 4) / 4;
    setDragY(h);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    setDragY(null);
  };

  const handleParentDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    // auto scroll when dragging near the edge
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const speed = 2;
    if (y < 50) {
      e.currentTarget.scrollTop -= speed;
    } else if (y > rect.height - 50) {
      e.currentTarget.scrollTop += speed;
    }
  };

  const events =
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
    }, [] as CalendarEvent[]) ?? [];

  // const events = useMemo(() => {
  //   if (!dragged || dragY === null) return itemEvents;
  //   // itemEvents?.push({
  //   //   id: dragged.id,
  //   // });
  //   return itemEvents;
  // }, [itemEvents?.length, dragged, dragY]);

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

  const [refresh, isRefreshing] = useMutation<CalendarListRefreshMutation>(graphql`
    mutation CalendarListRefreshMutation {
      refreshCalendarItems
    }
  `);

  const handleRefresh = () => {
    refresh({ variables: {} });
  };

  useEffect(() => {
    if (dragged) return;
    const timeout = setTimeout(() => setDragY(null), 100);
    return () => clearTimeout(timeout);
  }, [dragged]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-3 flex flex-col gap-2 shadow-sm">
        <div className="flex gap-2 items-center justify-between">
          <div className="text-xl font-semibold">Calendar</div>
          <div className="flex items-center gap-2">
            <RenderCalendarInlineActions
              items={eventsData?.events.edges.map((edge) => edge.node) ?? []}
            />
            {tasksData.canRefreshCalendarItems && (
              <Button tertiary sm onClick={handleRefresh} loading={isRefreshing}>
                <BsArrowClockwise size={20} />
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <RenderCalendarActions items={eventsData?.events.edges.map((edge) => edge.node) ?? []} />
        </div>
      </div>
      <div
        className="no-scrollbar h-full overflow-y-scroll pl-3 pt-0.5 pt-3"
        onDragOver={handleParentDragOver}
      >
        <DayTimeGrid
          events={events}
          artifacts={artifacts}
          startHour={START_HOUR}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        />
      </div>
    </div>
  );
};
