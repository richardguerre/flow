import React from "@types/react";
import type { calendar_v3 } from "@googleapis/calendar";

declare global {
  type React = typeof React;

  type CalendarsData = ({
    account: string;
  } & ({ authError: string } | { calendars: Calendar[] }))[];

  type Calendar = calendar_v3.Schema$CalendarListEntry & {
    connected: boolean;
    /** The criteria to determine if an event is relevant to create an item out of it. */
    connectCriteria: CalendarWorkflowWhere;
    workflows: CalendarWorkflows[];
  };

  type CalendarWorkflowAction =
    | { type: "add-tag"; tagId: number }
    | { type: "prefix"; chars: string }
    | { type: "suffix"; chars: string };

  type WhereString = {
    contains?: string;
    endsWith?: string;
    startsWith?: string;
    not?: WhereString;
  };

  type CalendarEventStatus = "confirmed" | "tentative" | "cancelled";
  type WhereStatus = {
    in?: CalendarEventStatus[];
    not?: WhereStatus;
  };

  type CalendarEventType = "default" | "outOfOffice" | "focusTime" | "workingLocation";
  type WhereEventType = {
    in?: CalendarEventType[];
    not?: WhereEventType;
  };

  type CalendarWorkflowWhere = {
    title?: WhereString;
    description?: WhereString;
    status?: WhereStatus;
    type?: WhereEventType;
  };

  type CalendarWorkflows = {
    where: {};
    actions: CalendarWorkflowAction[];
  };
}
