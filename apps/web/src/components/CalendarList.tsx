import { DragEventHandler, useEffect, useMemo, useRef, useState } from "react";
import {
  ConnectionHandler,
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
import { CalendarListCreateItemMutation } from "../relay/__generated__/CalendarListCreateItemMutation.graphql";
import { CalendarList_eventsConnection$key } from "../relay/__generated__/CalendarList_eventsConnection.graphql";

export const START_HOUR = 4;

type CalendarListProps = {
  data: CalendarList_data$key;
};

export const CalendarList = (props: CalendarListProps) => {
  const today = useRef(getStartOfToday());
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
          ...CalendarList_eventsConnection
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
  const eventsConnection = useFragment<CalendarList_eventsConnection$key>(
    graphql`
      fragment CalendarList_eventsConnection on QueryItemsConnection {
        __id
        edges {
          node {
            ...CalendarList_item @relay(mask: false)
          }
        }
      }
    `,
    eventsData?.events ?? null,
  );
  graphql`
    fragment CalendarList_item on Item {
      id
      title
      scheduledAt
      durationInMinutes
      isAllDay
      color
      ...RenderCalendarActions_item
    }
  `;

  const [dragY, setDragY] = useState<number | null>(null);
  const { dragged, dragEndedWith, setDragEndedWith } = useDragContext();
  const draggedInTask = useFragment(
    graphql`
      fragment CalendarListTaskCardDraggedIn_task on Task {
        id
        durationInMinutes
      }
    `,
    dragged ?? dragEndedWith,
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
    eventsConnection?.edges.reduce((events, edge) => {
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
  if (dragged && draggedInTask && dragY) {
    // dragY is the height of the dragged task - START_HOUR * heightOf1Hour
    const scheduledAt = today.current.add(dragY, "hours").toDate();
    events.push({
      id: draggedInTask.id,
      title: dragged.titleAsText,
      durationInMinutes: draggedInTask.durationInMinutes ?? 30,
      scheduledAt,
    });
  }

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

  const [createEvent] = useMutation<CalendarListCreateItemMutation>(graphql`
    mutation CalendarListCreateItemMutation($input: MutationCreateCalendarItemInput!) {
      createCalendarItem(input: $input) {
        ...CalendarList_item @relay(mask: false)
      }
    }
  `);

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

  useEffect(() => {
    if (!dragEndedWith || !draggedInTask || !dragY) return;
    // create the item (i.e. an event in the calendar) from the dragged task
    const scheduledAt = today.current.add(dragY, "hours").toISOString();
    createEvent({
      variables: {
        input: {
          title: dragEndedWith.titleAsText,
          durationInMinutes: draggedInTask.durationInMinutes ?? 30,
          scheduledAt,
          fromTaskId: draggedInTask.id,
        },
      },
      onCompleted: () => setDragEndedWith(null),
      updater: (store) => {
        // add item to the events list
        if (!eventsConnection?.__id) return;
        const eventsConnectionRec = store.get(eventsConnection.__id);

        const createdEvent = store.getRootField("createCalendarItem");
        if (!eventsConnectionRec) return;

        const edge = ConnectionHandler.createEdge(
          store,
          eventsConnectionRec,
          createdEvent,
          "QueryItemsConnectionEdge",
        );
        ConnectionHandler.insertEdgeAfter(eventsConnectionRec, edge);
      },
    });
  }, [dragEndedWith, draggedInTask, dragY]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-3 flex flex-col gap-2 shadow-sm">
        <div className="flex gap-2 items-center justify-between">
          <div className="text-xl font-semibold">Calendar</div>
          <div className="flex items-center gap-2">
            <RenderCalendarInlineActions
              items={eventsConnection?.edges.map((edge) => edge.node) ?? []}
            />
            {tasksData.canRefreshCalendarItems && (
              <Button tertiary sm onClick={handleRefresh} loading={isRefreshing}>
                <BsArrowClockwise size={20} />
              </Button>
            )}
          </div>
        </div>
        <RenderCalendarActions items={eventsConnection?.edges.map((edge) => edge.node) ?? []} />
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

export const getStartOfToday = () => {
  const startHour = dayjs().startOf("day").add(START_HOUR, "hours");
  return dayjs().isBefore(startHour) ? startHour.subtract(1, "day") : startHour;
};
