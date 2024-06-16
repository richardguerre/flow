import React from "@types/react";

declare global {
  type React = typeof React;

  type AccountsOperationData = {
    email: string;
    expiresAt: string;
  }[];

  type ListsOperationData = {
    id: number;
    name: string;
    slug: string | null;
    description: string;
    linkedView: {
      id: string;
      name: string;
      icon: string | null;
      color: string | null;
      account: string;
    };
  }[];

  type ViewsOperationData = {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
    account: string;
    synced: boolean;
  }[];

  type AddViewToSyncOperationInput = {
    viewId?: string;
    account?: string;
  };
  type removeViewToSyncOperationInput = AddViewToSyncOperationInput;

  type SyncViewOperationInput = {
    viewId?: string;
    account?: string;
  };

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
