import React from "@types/react";
import type { calendar_v3 } from "@googleapis/calendar";

declare global {
  type React = typeof React;

  type CalendarsData = ({
    account: string;
  } & ({ authError: string } | { calendars: Calendar[] }))[];

  type Calendar = calendar_v3.Schema$CalendarListEntry & {
    connected: boolean;
  };
}
