import React from "@types/react";

declare global {
  type React = typeof React;

  type RepeatingTask = {
    id: string;
    title: string;
    durationInMinutes?: number;
    cron: string;
    enabled: boolean;
  };
}
