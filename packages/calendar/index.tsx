import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Hour } from "./types";
import colors from "windicss/colors";

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
    }, 1000 * 60);
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
          result.eventsMap.values()
        ).filter((otherEvent) => {
          if (otherEvent === event) return false;
          if (otherEvent.scheduledAt <= event.scheduledAt && otherEvent.end > event.scheduledAt)
            return true;
          if (otherEvent.scheduledAt < otherEvent.end && otherEvent.end >= otherEvent.end)
            return true;
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
      }
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

  useEffect(() => {}, []);

  return (
    <div className="flex space-x-1">
      <div
        className="flex flex-col"
        style={{
          marginTop: yOffset,
        }}
      >
        {hours.map((hour, i) => (
          <div key={i} className="w-4ch relative" style={{ height: heightOf1Hour }}>
            <span className="text-xs transform top-0 left-0 text-foreground-700 -translate-y-1/2 absolute">
              {digits(hour)}:00
            </span>
          </div>
        ))}
      </div>
      <div className="w-full relative">
        <div className="mb-1">
          {allDayEvents.map((event) => (
            <div
              key={event.id}
              className="border rounded-md border-background-50 text-sm py-1 px-2 overflow-hidden overflow-ellipsis whitespace-nowrap"
              style={{
                color: event.textColor ?? colors.blue["900"],
                backgroundColor: event.backgroundColor ?? colors.blue["100"],
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
        <div className="flex-col w-full">
          {hours.map((_, i) => (
            <div
              key={i}
              className="border-t border-l border-0 border-background-300"
              style={{ height: heightOf1Hour }}
            />
          ))}
        </div>
        <div
          ref={nowRef}
          // #ef4444 is red-500
          className="bg-[#ef4444] h-[2px] w-full z-20 absolute"
          style={{
            top: getTop(now),
          }}
        />
        {props.artifacts?.map((artifact) => (
          <div
            key={artifact.id}
            className="z-10 absolute"
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
            className={`border border-white p-2 rounded-md absolute overflow-hidden ${
              event.height < minHeight ? "py-0" : ""
            }`}
            style={{
              top: getTop(event.scheduledAt),
              height: event.height,
              color: event.textColor ?? colors.blue["900"],
              backgroundColor: event.backgroundColor ?? colors.blue["100"],
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
