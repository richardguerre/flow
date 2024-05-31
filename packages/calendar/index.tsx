import React, { DragEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Hour } from "./types";
import { tailwindColors } from "@flowdev/unocss";

type CalendarEventBase = {
  id: string;
  title: string;
  textColor?: string;
  backgroundColor?: string;
};

type AtTime = {
  scheduledAt: Date;
  durationInMinutes: number;
};

type AllDay = {
  isAllDay: true;
};

export type CalendarEvent = CalendarEventBase & (AtTime | AllDay);

type CalendarEventTransformed = CalendarEventBase &
  AtTime & {
    end: Date;
    height: number;
    widthPercentage: number;
  };

export type CalendarArtifact = {
  id: string;
  /** The time at which the artifact needs to be shown. */
  at: Date;
  /** The element to show. */
  element: React.ReactNode;
  /** The offset from the left in percentage. Default is 0 (i.e. all the way left) */
  leftPercentageOffset?: number;
};

export type DayTimeGridProps = {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  artifacts?: CalendarArtifact[];
  startHour?: Hour;
  heightOf1Hour?: number;
  onDragLeave?: DragEventHandler<HTMLDivElement>;
  onDragOver?: DragEventHandler<HTMLDivElement>;
  onEventDragStart?: (event: CalendarEvent) => void;
  onEventDragEnd?: (event: CalendarEvent) => void;
};

export const DayTimeGrid = (props: DayTimeGridProps) => {
  const startHour = props.startHour ?? 0; // start at midnight by default
  const heightOf1Hour = props.heightOf1Hour ?? 96; // 96px by default
  const hours = Array.from({ length: 25 }).map((_, i) => (i + startHour) % 24); // 25 to include the last hour
  const nowRef = useRef<HTMLDivElement>(null);

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const { events, allDayEvents, yOffset } = useMemo(() => {
    /**
     * This reduce function will:
     * - add a widthPercentage property to each event that is not allDay
     * - add allDay events to a separate array
     */
    const result = props.events.reduce(
      (result, event) => {
        if ("isAllDay" in event) {
          return {
            eventsMap: result.eventsMap,
            allDayEvents: [...result.allDayEvents, event],
          };
        }
        const overlappingEvents: CalendarEventTransformed[] = Array.from(
          result.eventsMap.values(),
        ).filter((otherEvent) => {
          if (otherEvent === event) return false;
          if (otherEvent.scheduledAt <= event.scheduledAt && otherEvent.end > event.scheduledAt) {
            return true;
          }
          return false;
        });
        const lastOverlappingEvent = overlappingEvents[overlappingEvents.length - 1];
        const end = new Date(event.scheduledAt);
        end.setMinutes(end.getMinutes() + event.durationInMinutes);
        return {
          eventsMap: result.eventsMap.set(event.id, {
            ...event,
            end,
            height: (event.durationInMinutes / 60) * heightOf1Hour,
            widthPercentage: lastOverlappingEvent
              ? lastOverlappingEvent.widthPercentage * 0.75
              : 100,
          }),
          allDayEvents: result.allDayEvents,
        };
      },
      {
        eventsMap: new Map<string, CalendarEventTransformed>(),
        allDayEvents: new Array<CalendarEventBase & AllDay>(),
      },
    );
    const yOffset: number = 30 * result.allDayEvents.length + 4; // 28px = 20px line height of allDay event text-sm + 8px padding + 2px border | 4px = margin
    return {
      events: Array.from(result.eventsMap.values()),
      allDayEvents: result.allDayEvents,
      yOffset,
    };
  }, [JSON.stringify(props.events)]);

  const getTop = useCallback((date: Date) => {
    return (
      (((date.getHours() + 24 - startHour) % 24) + date.getMinutes() / 60) * heightOf1Hour + yOffset
    );
  }, []);

  useEffect(() => {
    if (!nowRef.current) return;
    nowRef.current.scrollIntoView({ block: "center" });
  }, [nowRef.current]);

  return (
    <div className="flex gap-1">
      <div
        className="flex flex-col"
        style={{
          marginTop: yOffset,
        }}
      >
        {hours.map((hour, i) => (
          <div key={i} className="relative w-[4ch]" style={{ height: heightOf1Hour }}>
            <span className="text-foreground-600 absolute left-0 top-0 -translate-y-1/2 transform text-xs">
              {digits(hour)}:00
            </span>
          </div>
        ))}
      </div>
      <div
        className="relative w-full"
        onDragLeave={props.onDragLeave}
        onDragOver={props.onDragOver}
      >
        <div className="mb-1">
          {allDayEvents.map((event) => (
            <div
              key={event.id}
              className="border-background-50 overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md border px-2 py-1 text-sm"
              style={{
                color: event.textColor ?? tailwindColors.blue["900"],
                backgroundColor: event.backgroundColor ?? tailwindColors.blue["100"],
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
        <div className="w-full flex-col">
          {hours.map((_, i) => (
            <div
              key={i}
              className="border-background-300 border-0 border-l border-t"
              style={{ height: heightOf1Hour }}
            />
          ))}
        </div>
        <div
          ref={nowRef}
          className="absolute z-20 h-[2px] w-full bg-red-500"
          style={{
            top: getTop(now),
          }}
        />
        {props.artifacts?.map((artifact) => (
          <div
            key={artifact.id}
            className="absolute z-10"
            style={{
              top: getTop(artifact.at),
              left: `${artifact.leftPercentageOffset ?? 0}%`,
            }}
          >
            {artifact.element}
          </div>
        ))}
        {events.map((event) => (
          <div
            key={event.id}
            draggable
            onDragStart={() => props.onEventDragStart?.(event)}
            onDragEnd={() => props.onEventDragEnd?.(event)}
            className={`absolute overflow-hidden rounded-md border border-background-50 p-2 ${
              event.height < minHeight ? "py-0" : ""
            }`}
            style={{
              top: getTop(event.scheduledAt),
              height: event.height,
              color: event.textColor ?? tailwindColors.blue["900"],
              backgroundColor: event.backgroundColor ?? tailwindColors.blue["100"],
              width: `calc(${event.widthPercentage}% - 2%)`,
              left: `calc(${100 - event.widthPercentage}% + 2%)`,
            }}
            onClick={() => props.onEventClick?.(event)}
          >
            <div
              className={`w-full overflow-hidden overflow-ellipsis whitespace-nowrap ${
                event.height < minHeight ? "text-sm" : "text-base"
              }`}
            >
              {event.title}
            </div>
            <div className="text-sm">
              {event.scheduledAt.getHours()}:{digits(event.scheduledAt.getMinutes())} -{" "}
              {event.end.getHours()}:{digits(event.end.getMinutes())}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const minHeight = 32;

const digits = (n: number, digits: number = 2) =>
  n.toLocaleString("en-US", { minimumIntegerDigits: digits });
