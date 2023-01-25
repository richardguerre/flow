import { FC } from "react";
import { Hour } from "./types";
import colors from "windicss/colors";

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  textColor?: string;
  backgroundColor?: string;
};

export type DayCalendarProps = {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  startHour?: Hour;
  heightOf1Hour?: number;
};

export const DayCalendar: FC<DayCalendarProps> = (props) => {
  const startHour = props.startHour ?? 0; // start at midnight by default
  const heightOf1Hour = props.heightOf1Hour ?? 100; // 100px by default
  const hours = Array.from({ length: 25 }).map((_, i) => (i + startHour) % 24); // 25 to include the last hour
  return (
    <div className="flex space-x-1">
      <div className="flex flex-col">
        {hours.map((hour) => (
          <div key={hour} className="w-4ch relative" style={{ height: heightOf1Hour }}>
            <span className="text-xs transform top-0 left-0 text-gray-400 -translate-y-1/2 absolute">
              {hour < 10 ? "0" : ""}
              {hour}:00
            </span>
          </div>
        ))}
      </div>
      <div className="w-full relative">
        <div className="flex-col w-full">
          {hours.map((hour, i) => (
            <div
              key={hour}
              className={`border-t border-gray-300`} // TODO: change border-gray-300 to design token
              style={{ height: heightOf1Hour }}
            />
          ))}
        </div>
        {props.events.map((event) => (
          <div
            key={event.id}
            className="rounded-md text-base p-2 left-0 w-11/12 absolute"
            style={{
              top:
                (event.start.getHours() - startHour + event.start.getMinutes() / 60) *
                heightOf1Hour,
              height:
                (event.end.getHours() +
                  event.end.getMinutes() / 60 -
                  (event.start.getHours() + event.start.getMinutes() / 60)) *
                heightOf1Hour,
              color: event.textColor ?? colors.blue["900"],
              backgroundColor: event.backgroundColor ?? colors.blue["100"],
            }}
            onClick={() => props.onEventClick?.(event)}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};
