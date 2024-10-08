import React from "@types/react";

declare global {
  type React = typeof React;

  type GetRoutineStepInfoInput = {
    routineStepId: string;
  };
  type GetRoutineStepInfoOutput = {
    data: {
      renderedTemplate: string;
    };
  };
  type Workspace = {
    connectedAt: string;
    teamId: string;
    teamName: string;
    teamIcon: string;
  };
  type WorkspacesData = {
    workspaces: Workspace[];
  };
  type GetChannelsInput = {
    forceRefresh?: boolean;
  };
  type GetChannelsData = {
    lastCachedAt: string;
    channels: {
      id: string;
      name: string;
      team: {
        id: string;
        connectedAt: string;
        name: string;
        icon: string;
      };
    }[];
  };
  type PostMessageInput = {
    message: string;
    channels: {
      teamId: string;
      channelId: string;
    }[];
  };
  type PostMessageData = {
    ok: boolean;
    messages: {
      ts: string;
      teamId: string;
      channelId: string;
    }[];
  };
}
