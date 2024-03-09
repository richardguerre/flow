import React from "@types/react";

declare global {
  type React = typeof React;

  type LinearIssueState = {
    id: string;
    name: string;
    type: "triage" | "backlog" | "unstarted" | "started" | "completed" | "canceled";
    /** Hex color */
    color: string;
  };

  type LinearIssue = {
    id: string;
    title: string;
    description: string | null;
    state: LinearIssueState;
    comments: {
      edges: {
        node: LinearComment & {
          children: {
            edges: {
              node: LinearComment;
            }[];
          };
        };
      }[];
    };
  };

  type LinearComment = {
    id: string;
    body: string;
    url: string;
    updatedAt: string;
    user: {
      id: string;
      isMe: boolean;
      name: string;
      displayName: string;
      avatarUrl: string;
    } | null;
    botActor: {
      id: string;
      name: string;
      avatarUrl: string;
    } | null;
  };

  type LinearIssueItemMin = {
    id: string;
    title: string;
    state: LinearIssueState;
  };

  type LinearIssueItemFull = LinearIssueItemMi & {
    description: string;
  };
}
