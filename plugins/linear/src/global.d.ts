import React from "@types/react";

declare global {
  type React = typeof React;

  type AccountsOperationData = {
    connectedAt: string;
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
    connected: boolean;
    views: {
      id: string;
      name: string;
      icon: string | null;
      color: string | null;
      account: string;
      synced: boolean;
    }[];
  };

  type AddViewToSyncOperationInput = {
    viewId: string;
    account: string;
  };
  type RemoveViewToSyncOperationInput = AddViewToSyncOperationInput;

  type SyncViewOperationInput = {
    viewId: string;
    account: string;
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
    url: string;
    title: string;
    priority: number;
    description: string | null;
    state: LinearIssueState;
    comments: {
      edges: {
        node: LinearComment;
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

  type ViewId = "my-issues" | (string & {});

  type LinearIssueItemMin = {
    id: string;
    state: LinearIssueState;
    views: ViewId[];
    url: string;
    priority: number;
  };

  type LinearIssueItemFull = LinearIssueItemMi & {
    description: string;
  };
}
