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

  // Slack Summary Types
  type GetSlackSummaryInput = {
    fromDate: string;
    toDate: string;
    channelsToIgnore?: string[];
    teamId?: string;
    userPrompt?: string;
    maxMessages?: number;
  };

  type GetSlackSummaryData = {
    summary: string;
    messageCount: number;
    threadCount: number;
    dateRange: {
      from: string;
      to: string;
    };
  };

  type GetThreadSummaryInput = {
    channelId: string;
    threadTs: string;
    teamId: string;
  };

  type GetThreadSummaryData = {
    summary: string;
    messageCount: number;
    participants: {
      id: string;
      name: string;
      real_name: string;
      avatar: string;
    }[];
  };

  type CreateTaskFromMessageInput = {
    messageTs: string;
    channelId: string;
    teamId: string;
    actionItem: string;
    date: string;
  };

  type CreateTaskFromMessageData = {
    taskId: string;
    itemId: string;
  };

  type QuickReplyInput = {
    channelId: string;
    threadTs: string;
    teamId: string;
    messageInHTML: string;
  };

  type QuickReplyData = {
    ok: boolean;
    ts: string;
  };

  // Filter types for LLM
  type MessageFilter = {
    ignoreBots?: boolean;
    authors?: string[];
    keywords?: string[];
    messageTypes?: ("text" | "file" | "link")[];
  };

  // Shared plugin data types for both web and server
  type SlackMessageItemMin = {
    slackMessageTs: string;
    slackChannelId: string;
    slackTeamId: string;
    channelName: string;
    teamName: string;
    url: string;
  };

  type SlackMessageItemFull = {
    slackMessageTs: string;
    slackChannelId: string;
    slackTeamId: string;
    originalMessage: string;
    originalUser: string;
    originalTimestamp: string;
    channelName: string;
    teamName: string;
    url: string;
  };
}
