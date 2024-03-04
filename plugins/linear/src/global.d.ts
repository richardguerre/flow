import React from "@types/react";

declare global {
  type React = typeof React;

  type LinearIssueItemMin = {
    id: string;
    title: string;
    status: string; // TODO: figure out if there is a better type for this. Maybe a number that maps to the different statuses in the user's Linear account.
  };

  type LinearIssueItemFull = LinearIssueItemMi & {
    description: string;
  };
}
