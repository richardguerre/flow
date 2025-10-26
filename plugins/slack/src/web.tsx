import { definePlugin } from "@flowdev/plugin/web";
import { type Editor } from "@flowdev/tiptap";
import { getDefaultPlanYourDayTemplate, POST_TO_SLACK, SLACK_SUMMARY } from "./common";
import type { webUpdateRoutineStepMutation } from "./relay/__gen__/webUpdateRoutineStepMutation.graphql";
import { BsCheck, BsChevronDown } from "@flowdev/icons";
import { Control } from "react-hook-form";

export default definePlugin((opts) => {
  const React = opts.React; // required so that the Slack plugin uses the same React version as the web app
  const Flow = opts.components;
  const graphql = opts.relay.graphql;

  const Workspaces = () => {
    const workspacesQuery = opts.operations.useLazyQuery<WorkspacesData>({
      operationName: "workspaces",
    });
    const [refreshing, setRefreshing] = React.useState(false);

    if (!workspacesQuery?.data?.workspaces.length) {
      return (
        <div className="flex">
          No workspaces connected. Please connect an account to use the Slack plugin.
        </div>
      );
    }

    const handleRefreshChannels = async () => {
      setRefreshing(true);
      await opts.operations.query<GetChannelsInput, GetChannelsData>({
        operationName: "getChannels",
        input: { forceRefresh: true },
      });
      setRefreshing(false);
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {workspacesQuery?.data?.workspaces.map((workspace) => (
            <div className="flex items-center gap-2 rounded max-w-2xl bg-background-50 shadow px-4 py-4">
              <img src={workspace.teamIcon} className="h-5 w-5 shrink-0" />
              <span className="font-semibold">{workspace.teamName}</span>
              <span className="text-sm text-foreground-700">
                Connected {opts.dayjs(workspace.connectedAt).fromNow()}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div className="text-foreground-700">Not finding the channels you're looking for?</div>
          <Flow.Button onClick={handleRefreshChannels} loading={refreshing}>
            Refresh channels
          </Flow.Button>
        </div>
      </div>
    );
  };

  const SlackStatusNode = opts.tiptap.Node.create({
    name: "slack-status",
    inline: true,
    group: "inline",
    atom: true,
    addAttributes: () => ({
      taskId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-task-id") ?? null,
        renderHTML: (attrs) => (!attrs.taskId ? {} : { "data-task-id": attrs.taskId }),
      },
    }),
    parseHTML: () => [{ tag: "slack-status" }],
    renderHTML: (props) => ["slack-status", opts.tiptap.mergeAttributes(props.HTMLAttributes)],
    addNodeView: () => opts.tiptap.ReactNodeViewRenderer(SlackStatusNodeView),
  });

  const SlackStatusNodeView = (props: { selected: boolean }) => {
    return (
      <opts.tiptap.NodeViewWrapper as="span">
        <Flow.Tooltip>
          <Flow.TooltipTrigger
            className={opts.cn(
              "p-0.5 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-0.5 h-5 w-5 inline-flex items-center justify-center",
              props.selected && "bg-background-300",
            )}
          >
            <SlackMark />
          </Flow.TooltipTrigger>
          <Flow.TooltipContent className="max-w-xs">
            This is a placeholder for where the Slack plugin will add and automatically update the
            status of the task (✅ when done, ❌ when canceled.)
          </Flow.TooltipContent>
        </Flow.Tooltip>
      </opts.tiptap.NodeViewWrapper>
    );
  };

  const SlackFutureTasks = opts.tiptap.Node.create({
    name: "slack-future-tasks",
    inline: true,
    group: "inline",
    atom: true,
    draggable: true,
    selectable: true,
    addAttributes: () => ({
      innerHTML: {
        default: null,
        parseHTML: (element) => element.innerHTML,
        rendered: false,
      },
      filter: {
        default: null,
        parseHTML: (element) => {
          const rawFilter = element.getAttribute("filter");
          if (!rawFilter) return null;
          return JSON.parse(rawFilter);
        },
        renderHTML: (attrs) => {
          if (!attrs.filter) return {};
          return { filter: JSON.stringify(attrs.filter) };
        },
      },
    }),
    parseHTML: () => [{ tag: "slack-future-tasks" }],
    renderHTML({ HTMLAttributes, node }) {
      const dom = document.createElement("slack-future-tasks");
      dom.innerHTML = node.attrs.innerHTML;
      for (const attr in HTMLAttributes) {
        dom.setAttribute(attr, HTMLAttributes[attr]);
      }
      return { dom };
    },
    addNodeView: () => opts.tiptap.ReactNodeViewRenderer(SlackFutureTasksNodeView),
  });

  const SlackFutureTasksNodeView = (props: {
    selected: boolean;
    node: { attrs: { innerHTML: string } };
  }) => {
    return (
      <opts.tiptap.NodeViewWrapper as="span">
        <Flow.Tooltip>
          <Flow.TooltipTrigger
            className={opts.cn(
              "p-0.5 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-0.5 h-5 inline-flex items-center gap-1",
              props.selected && "bg-background-300",
            )}
          >
            <SlackMark />
            <span className="text-foreground-700">New tasks will be added here.</span>
          </Flow.TooltipTrigger>
          <Flow.TooltipContent className="max-w-xs">
            New tasks that match the filters you set in the <b>Post in Slack</b> routine step will
            be added here (defaults to today's tasks).
            <br />
            <br />
            New tasks will be rendered using this template:
            <pre>
              <code className="text-xs">{props.node.attrs.innerHTML}</code>
            </pre>
          </Flow.TooltipContent>
        </Flow.Tooltip>
      </opts.tiptap.NodeViewWrapper>
    );
  };

  const SlackMark = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 123 123"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.8 77.6C25.8 84.7 20 90.5 12.9 90.5C5.8 90.5 0 84.7 0 77.6C0 70.5 5.8 64.7 12.9 64.7H25.8V77.6Z"
        fill="#E01E5A"
      />
      <path
        d="M32.3 77.6C32.3 70.5 38.1001 64.7 45.2001 64.7C52.3001 64.7 58.1 70.5 58.1 77.6V109.9C58.1 117 52.3001 122.8 45.2001 122.8C38.1001 122.8 32.3 117 32.3 109.9V77.6Z"
        fill="#E01E5A"
      />
      <path
        d="M45.2001 25.8C38.1001 25.8 32.3 20 32.3 12.9C32.3 5.8 38.1001 0 45.2001 0C52.3001 0 58.1 5.8 58.1 12.9V25.8H45.2001Z"
        fill="#36C5F0"
      />
      <path
        d="M45.2 32.3C52.3 32.3 58.1 38.1 58.1 45.2C58.1 52.3 52.3 58.1 45.2 58.1H12.9C5.8 58.1 0 52.3 0 45.2C0 38.1 5.8 32.3 12.9 32.3H45.2Z"
        fill="#36C5F0"
      />
      <path
        d="M97 45.2C97 38.1 102.8 32.3 109.9 32.3C117 32.3 122.8 38.1 122.8 45.2C122.8 52.3 117 58.1 109.9 58.1H97V45.2Z"
        fill="#2EB67D"
      />
      <path
        d="M90.5 45.2C90.5 52.3 84.6999 58.1 77.5999 58.1C70.4999 58.1 64.7 52.3 64.7 45.2V12.9C64.7 5.8 70.4999 0 77.5999 0C84.6999 0 90.5 5.8 90.5 12.9V45.2Z"
        fill="#2EB67D"
      />
      <path
        d="M77.5999 97C84.6999 97 90.5 102.8 90.5 109.9C90.5 117 84.6999 122.8 77.5999 122.8C70.4999 122.8 64.7 117 64.7 109.9V97H77.5999Z"
        fill="#ECB22E"
      />
      <path
        d="M77.5999 90.5C70.4999 90.5 64.7 84.7 64.7 77.6C64.7 70.5 70.4999 64.7 77.5999 64.7H109.9C117 64.7 122.8 70.5 122.8 77.6C122.8 84.7 117 90.5 109.9 90.5H77.5999Z"
        fill="#ECB22E"
      />
    </svg>
  );

  // invisible node to store the posted message metadata in the note itself
  const SlackMessageNode = opts.tiptap.Node.create({
    name: "slack-message",
    group: "block",
    atom: true,
    selectable: false,
    draggable: false,
    addAttributes: () => ({
      teamId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-team-id") ?? null,
        renderHTML: (attrs) => (!attrs.teamId ? {} : { "data-team-id": attrs.teamId }),
      },
      channelId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-channel-id") ?? null,
        renderHTML: (attrs) => (!attrs.channelId ? {} : { "data-channel-id": attrs.channelId }),
      },
      ts: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-ts") ?? null,
        renderHTML: (attrs) => (!attrs.ts ? {} : { "data-ts": attrs.ts }),
      },
    }),
    parseHTML: () => [{ tag: "slack-message" }],
    renderHTML: (props) => ["slack-message", opts.tiptap.mergeAttributes(props.HTMLAttributes)],
  });

  // Node for displaying Slack messages in summaries
  const SlackMessageSummaryNode = opts.tiptap.Node.create({
    name: "slack-message-summary",
    group: "block",
    atom: true,
    selectable: true,
    draggable: false,
    addAttributes: () => ({
      ts: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-ts") ?? null,
        renderHTML: (attrs) => (!attrs.ts ? {} : { "data-ts": attrs.ts }),
      },
      user: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-user") ?? null,
        renderHTML: (attrs) => (!attrs.user ? {} : { "data-user": attrs.user }),
      },
      userDisplayName: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-user-display-name") ?? null,
        renderHTML: (attrs) =>
          !attrs.userDisplayName ? {} : { "data-user-display-name": attrs.userDisplayName },
      },
      avatar: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-avatar") ?? null,
        renderHTML: (attrs) => (!attrs.avatar ? {} : { "data-avatar": attrs.avatar }),
      },
      channel: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-channel") ?? null,
        renderHTML: (attrs) => (!attrs.channel ? {} : { "data-channel": attrs.channel }),
      },
      channelName: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-channel-name") ?? null,
        renderHTML: (attrs) =>
          !attrs.channelName ? {} : { "data-channel-name": attrs.channelName },
      },
      threadTs: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-thread-ts") ?? null,
        renderHTML: (attrs) => (!attrs.threadTs ? {} : { "data-thread-ts": attrs.threadTs }),
      },
      permalink: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-permalink") ?? null,
        renderHTML: (attrs) => (!attrs.permalink ? {} : { "data-permalink": attrs.permalink }),
      },
    }),
    parseHTML: () => [{ tag: "slack-message-summary" }],
    renderHTML: (props) => [
      "slack-message-summary",
      opts.tiptap.mergeAttributes(props.HTMLAttributes),
    ],
    addNodeView: () => opts.tiptap.ReactNodeViewRenderer(SlackMessageSummaryNodeView),
  });

  const SlackMessageSummaryNodeView = (props: {
    selected: boolean;
    node: {
      attrs: {
        ts: string;
        user: string;
        userDisplayName: string;
        avatar: string;
        channel: string;
        channelName: string;
        threadTs?: string;
        permalink?: string;
      };
    };
  }) => {
    const [showReply, setShowReply] = React.useState(false);
    const [replyText, setReplyText] = React.useState("");
    const editorRef = React.useRef<Editor>(null);

    const [quickReply, sendingReply] = opts.operations.useMutation<QuickReplyInput>("quickReply", {
      throwOnError: true,
    });

    const handleReply = async () => {
      if (!replyText.trim()) return;

      try {
        await quickReply({
          channelId: props.node.attrs.channel,
          threadTs: props.node.attrs.threadTs || props.node.attrs.ts,
          teamId: "T1234567890", // TODO: Get from context
          messageInHTML: replyText,
        });
        setShowReply(false);
        setReplyText("");
      } catch (error) {
        console.error("Failed to send reply:", error);
      }
    };

    return (
      <opts.tiptap.NodeViewWrapper as="div" className="my-2">
        <div
          className={opts.cn(
            "border border-background-200 rounded-lg p-3 bg-background-50",
            props.selected && "ring-2 ring-primary-200",
          )}
        >
          <div className="flex items-start gap-3">
            <img
              src={props.node.attrs.avatar}
              alt={props.node.attrs.userDisplayName}
              className="w-8 h-8 rounded-full shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{props.node.attrs.userDisplayName}</span>
                <span className="text-xs text-foreground-600">#{props.node.attrs.channelName}</span>
                <span className="text-xs text-foreground-500">
                  {opts.dayjs(parseFloat(props.node.attrs.ts) * 1000).format("MMM D, h:mm A")}
                </span>
              </div>
              <div className="text-sm text-foreground-900 mb-2">
                {props.node.attrs.permalink ? (
                  <a
                    href={props.node.attrs.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View in Slack →
                  </a>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Flow.Button secondary onClick={() => setShowReply(!showReply)}>
                  Reply
                </Flow.Button>
                {props.node.attrs.permalink && (
                  <Flow.Button
                    secondary
                    onClick={() => window.open(props.node.attrs.permalink, "_blank")}
                  >
                    Open in Slack
                  </Flow.Button>
                )}
              </div>
              {showReply && (
                <div className="mt-3 border-t pt-3">
                  <Flow.NoteEditor
                    editorRef={editorRef}
                    slug={`slack-reply-${props.node.attrs.ts}`}
                    title="Reply to Slack message"
                    initialValue=""
                    onChange={({ html }) => setReplyText(html)}
                    className="min-h-[100px]"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Flow.Button onClick={handleReply} loading={sendingReply}>
                      Send Reply
                    </Flow.Button>
                    <Flow.Button secondary onClick={() => setShowReply(false)}>
                      Cancel
                    </Flow.Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </opts.tiptap.NodeViewWrapper>
    );
  };

  // Node for action items that can be converted to tasks
  const SlackTaskNode = opts.tiptap.Node.create({
    name: "slack-task",
    group: "block",
    atom: true,
    selectable: true,
    draggable: false,
    addAttributes: () => ({
      messageTs: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-message-ts") ?? null,
        renderHTML: (attrs) => (!attrs.messageTs ? {} : { "data-message-ts": attrs.messageTs }),
      },
      channelId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-channel-id") ?? null,
        renderHTML: (attrs) => (!attrs.channelId ? {} : { "data-channel-id": attrs.channelId }),
      },
      teamId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-team-id") ?? null,
        renderHTML: (attrs) => (!attrs.teamId ? {} : { "data-team-id": attrs.teamId }),
      },
    }),
    parseHTML: () => [{ tag: "slack-task" }],
    renderHTML: (props) => ["slack-task", opts.tiptap.mergeAttributes(props.HTMLAttributes)],
    addNodeView: () => opts.tiptap.ReactNodeViewRenderer(SlackTaskNodeView),
  });

  const SlackTaskNodeView = (props: {
    selected: boolean;
    node: { attrs: { messageTs: string; channelId: string; teamId: string }; textContent: string };
  }) => {
    const [taskCreated, setTaskCreated] = React.useState(false);

    const [createTask, creatingTask] = opts.operations.useMutation<CreateTaskFromMessageInput>(
      "createTaskFromMessage",
      { throwOnError: true },
    );

    const handleCreateTask = async () => {
      try {
        const actionItem = props.node.textContent || props.node.attrs.messageTs;
        await createTask({
          messageTs: props.node.attrs.messageTs,
          channelId: props.node.attrs.channelId,
          teamId: props.node.attrs.teamId,
          actionItem,
          date: opts.dayjs().format("YYYY-MM-DD"), // Default to today
        });
        setTaskCreated(true);
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    };

    return (
      <opts.tiptap.NodeViewWrapper as="div" className="my-2">
        <div
          className={opts.cn(
            "border border-primary-200 rounded-lg p-3 bg-primary-50",
            props.selected && "ring-2 ring-primary-300",
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <BsCheck className="text-primary-600" size={16} />
            <span className="text-sm font-medium text-primary-900">Action Item</span>
          </div>
          <div className="text-sm text-primary-800 mb-3">
            {props.node.textContent || props.node.attrs.messageTs}
          </div>
          <div className="flex items-center gap-2">
            {!taskCreated ? (
              <Flow.Button onClick={handleCreateTask} loading={creatingTask}>
                Create Task
              </Flow.Button>
            ) : (
              <div className="flex items-center gap-2 text-sm text-positive-600">
                <BsCheck size={16} />
                Task Created
              </div>
            )}
          </div>
        </div>
      </opts.tiptap.NodeViewWrapper>
    );
  };

  // Node for thread summaries
  const SlackThreadNode = opts.tiptap.Node.create({
    name: "slack-thread",
    group: "block",
    atom: true,
    selectable: true,
    draggable: false,
    addAttributes: () => ({
      channel: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-channel") ?? null,
        renderHTML: (attrs) => (!attrs.channel ? {} : { "data-channel": attrs.channel }),
      },
      threadTs: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-thread-ts") ?? null,
        renderHTML: (attrs) => (!attrs.threadTs ? {} : { "data-thread-ts": attrs.threadTs }),
      },
      messageCount: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-message-count") ?? null,
        renderHTML: (attrs) =>
          !attrs.messageCount ? {} : { "data-message-count": attrs.messageCount },
      },
      participants: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-participants") ?? null,
        renderHTML: (attrs) =>
          !attrs.participants ? {} : { "data-participants": attrs.participants },
      },
    }),
    parseHTML: () => [{ tag: "slack-thread" }],
    renderHTML: (props) => ["slack-thread", opts.tiptap.mergeAttributes(props.HTMLAttributes)],
    addNodeView: () => opts.tiptap.ReactNodeViewRenderer(SlackThreadNodeView),
  });

  const SlackThreadNodeView = (props: {
    selected: boolean;
    node: {
      attrs: { channel: string; threadTs: string; messageCount: string; participants: string };
    };
  }) => {
    const [showThread, setShowThread] = React.useState(false);
    const [threadData, setThreadData] = React.useState<GetThreadSummaryData | null>(null);
    const [loadingThread, setLoadingThread] = React.useState(false);

    const handleShowThread = async () => {
      if (threadData) {
        setShowThread(!showThread);
        return;
      }

      setLoadingThread(true);
      try {
        const result = await opts.operations.query<GetThreadSummaryInput, GetThreadSummaryData>({
          operationName: "getThreadSummary",
          input: {
            channelId: props.node.attrs.channel,
            threadTs: props.node.attrs.threadTs,
            teamId: "T1234567890", // TODO: Get from context
          },
        });
        setThreadData(result?.data || null);
        setShowThread(true);
      } catch (error) {
        console.error("Failed to load thread:", error);
      } finally {
        setLoadingThread(false);
      }
    };

    return (
      <opts.tiptap.NodeViewWrapper as="div" className="my-2">
        <div
          className={opts.cn(
            "border border-background-200 rounded-lg p-3 bg-background-50",
            props.selected && "ring-2 ring-primary-200",
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <SlackMark />
            <span className="text-sm font-medium">Thread Summary</span>
            <span className="text-xs text-foreground-600">
              {props.node.attrs.messageCount} messages
            </span>
          </div>
          <div className="text-sm text-foreground-700 mb-3">
            {props.node.attrs.participants && (
              <span>Participants: {props.node.attrs.participants}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Flow.Button secondary onClick={handleShowThread} loading={loadingThread}>
              {showThread ? "Hide Thread" : "View Thread"}
            </Flow.Button>
          </div>
          {showThread && threadData && (
            <div className="mt-3 border-t pt-3">
              <div className="text-sm text-foreground-700 mb-2">
                Participants: {threadData.participants.map((p) => p.real_name).join(", ")}
              </div>
              <div className="text-sm text-foreground-900 whitespace-pre-wrap">
                {threadData.summary}
              </div>
            </div>
          )}
        </div>
      </opts.tiptap.NodeViewWrapper>
    );
  };

  // Custom read-only editor for rendering Slack summaries
  const SlackSummaryEditor = (props: { content: string }) => {
    const editor = opts.tiptap.useEditor({
      extensions: [opts.tiptap.StarterKit, SlackMessageSummaryNode, SlackTaskNode, SlackThreadNode],
      content: props.content,
      editable: false,
      editorProps: {
        attributes: {
          class: "prose prose-sm max-w-none focus:outline-none",
        },
      },
    });

    return <opts.tiptap.EditorContent editor={editor} />;
  };

  const ChannelsPicker = (props: {
    control: Control<{ channels: string[] } & any>;
    channelsData: GetChannelsData;
    onRefresh: () => void;
    refreshing: boolean;
  }) => {
    const channelsMap = React.useMemo(() => {
      return new Map(props.channelsData.channels.map((channel) => [channel.id, channel]));
    }, [props.channelsData.channels.length]);

    return (
      <Flow.FormCombobox name="channels" control={props.control} multiselect>
        <Flow.ComboboxTrigger className="flex items-center gap-2 self-start px-3 py-1.5 rounded-md bg-background-50 ring-primary-200 text-foreground-900 hover:ring-primary-300 disabled:bg-background-300/50 focus:ring-primary-500 focus:outline-none ring-2">
          <Flow.ComboboxValue
            placeholder="Select channels..."
            renderValues={(ids) =>
              ids.map((id) => `#${channelsMap.get(id)?.name ?? "unknown"}`).join(", ")
            }
          />
          <BsChevronDown size={14} className="text-foreground-700" />
        </Flow.ComboboxTrigger>
        <Flow.ComboboxContent
          align="start"
          side="bottom"
          className="w-68"
          commandProps={{
            filter: (channelId, search) => {
              // return 1 if the channel matches the search, 0 otherwise
              return channelsMap.get(channelId)?.name.includes(search) ? 1 : 0;
            },
          }}
        >
          <Flow.ComboboxInput placeholder="Search channels..." />
          <Flow.ComboboxEmpty>
            <div className="flex flex-col items-center gap-1">
              <div>Can't find a channel?</div>
              <div className="text-foreground-700 text-sm">
                Last refreshed {opts.dayjs(props.channelsData.lastCachedAt).fromNow()}
              </div>
              <Flow.Button sm secondary onClick={props.onRefresh} loading={props.refreshing}>
                Refresh
              </Flow.Button>
            </div>
          </Flow.ComboboxEmpty>
          <Flow.ComboboxGroup className="max-h-64 overflow-auto">
            {props.channelsData.channels.map((channel) => (
              <Flow.ComboboxItem
                key={channel.id}
                value={channel.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <img src={channel.team.icon} className="h-5 w-5 shrink-0 rounded" />
                  <span className="max-w-48 truncate">#{channel.name}</span>
                </div>
                <Flow.ComboboxSelected
                  className="ml-2 h-4 w-4 opacity-0"
                  selectedClassName="opacity-100"
                >
                  <BsCheck size={20} />
                </Flow.ComboboxSelected>
              </Flow.ComboboxItem>
            ))}
          </Flow.ComboboxGroup>
        </Flow.ComboboxContent>
      </Flow.FormCombobox>
    );
  };

  return {
    name: "Slack",
    noteEditorTipTapExtensions: [SlackStatusNode, SlackMessageNode, SlackFutureTasks],
    renderItemCardActions: async ({ item }) => {
      const pluginData = item.pluginDatas.find((data) => data.pluginSlug === opts.pluginSlug);
      if (!pluginData) return null;
      const min = pluginData.min as SlackMessageItemMin;
      return [
        {
          component: () => (
            <Flow.Tooltip>
              <Flow.TooltipTrigger asChild>
                <a
                  href={min.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100"
                >
                  <SlackMark />
                </a>
              </Flow.TooltipTrigger>
              <Flow.TooltipContent>View in #{min.channelName}</Flow.TooltipContent>
            </Flow.Tooltip>
          ),
        },
      ];
    },
    renderTaskCardActions: async ({ task }) => {
      const pluginData = task.pluginDatas.find((data) => data.pluginSlug === opts.pluginSlug);
      if (!pluginData) return null;
      const min = pluginData.min as SlackMessageItemMin;
      return [
        {
          component: () => (
            <Flow.Tooltip>
              <Flow.TooltipTrigger asChild>
                <a
                  href={min.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100"
                >
                  <SlackMark />
                </a>
              </Flow.TooltipTrigger>
              <Flow.TooltipContent>View in #{min.channelName}</Flow.TooltipContent>
            </Flow.Tooltip>
          ),
        },
      ];
    },
    settings: {
      "connect-accounts": {
        type: "custom",
        render: () => {
          return (
            <div className="flex flex-col gap-2">
              <a href={`${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth`}>
                <Flow.Button>Connect an account</Flow.Button>
              </a>
              <Flow.ErrorBoundary
                fallbackRender={({ error }) => {
                  if (error.cause?.[0]?.extensions?.code === "NOT_AUTHENTICATED") {
                    return <></>;
                  }
                  return <p className="text-sm text-negative-600">{error.message}</p>;
                }}
              >
                <React.Suspense fallback="Loading connected accounts...">
                  <Workspaces />
                </React.Suspense>
              </Flow.ErrorBoundary>
            </div>
          );
        },
      },
    },
    routineSteps: {
      [POST_TO_SLACK]: {
        name: "Post in Slack",
        description: "Post a message in Slack channels.",
        component: (props) => {
          const template = props.templates[0] as (typeof props.templates)[0] | undefined;
          const editorRef = React.useRef<Editor>(null);
          const today = opts.dayjs();
          const [refreshing, setRefreshing] = React.useState(false);
          const [saveNow, setSaveNow] = React.useState(false);
          const [channelsData, setChannelsData] = React.useState<GetChannelsData>({
            channels: props.stepConfig?.defaultChannels ?? [],
            lastCachedAt: opts.dayjs().toISOString(),
          });
          const { control, handleSubmit, formState, setError, setValue } =
            opts.reactHookForm.useForm<PostToSlack>({
              defaultValues: {
                message: template?.rendered ?? "",
                channels: channelsData.channels.map((channel) => channel.id),
              },
            });
          const [postMessage, postingMessages] = opts.operations.useMutation<
            PostMessageInput,
            PostMessageData
          >("postMessage", { throwOnError: true });

          const onSubmit = async (values: PostToSlack) => {
            const channelsToPost = channelsData.channels.filter((channel) =>
              values.channels.includes(channel.id),
            );
            if (!channelsToPost.length) {
              setError("root", { message: "Please select at least one channel." });
              return;
            }
            const res = await postMessage({
              message: values.message,
              channels: channelsToPost.map((channel) => ({
                teamId: channel.team.id,
                channelId: channel.id,
              })),
            }).catch((e) => {
              if ("extensions" in e && e?.extensions?.userFriendlyMessage) {
                setError("root", { message: e.extensions.userFriendlyMessage });
              } else if ("message" in e) {
                setError("root", { message: e.message });
              } else {
                setError("root", {
                  message: "Couldn't post message to Slack channels. Please try again.",
                });
              }
            });
            if (!res?.data?.ok) {
              setError("root", { message: "Couldn't post message to Slack channels." });
              return;
            }
            let endIdx = editorRef.current?.state.doc.content.size ?? 0;
            const chain = editorRef.current?.chain();
            for (const message of res.data.messages) {
              // add the messages to the end of the
              chain?.insertContentAt(endIdx, {
                type: "slack-message",
                attrs: {
                  teamId: message.teamId,
                  channelId: message.channelId,
                  ts: message.ts,
                },
              });
              endIdx++;
            }
            chain?.run();
            setSaveNow(true);
          };

          const handleNoteSaved = () => {
            if (!saveNow) return; // ignore if saveNow is still false
            setSaveNow(false);
            props.onNext();
          };

          const getAndSetChannels = async (input?: GetChannelsInput) => {
            setRefreshing(!!input?.forceRefresh);
            const res = await opts.operations.query<GetChannelsInput, GetChannelsData>({
              operationName: "getChannels",
              input,
            });
            setChannelsData((prev) => res?.data ?? prev);
            setRefreshing(false);
          };

          opts.hooks.useAsyncEffect(async () => {
            await getAndSetChannels();
          }, []);

          React.useEffect(() => {
            if (editorRef.current) {
              const markdown = opts.tiptap.getMarkdown(editorRef.current);
              setValue("message", markdown);
            }
          }, [editorRef.current]);

          return (
            <div className="bg-background-100 w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 mx-auto max-w-2xl pt-48 min-h-screen"
              >
                <div className="font-semibold text-4xl">Post to Slack</div>
                <opts.reactHookForm.Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <Flow.NoteEditor
                      editorRef={editorRef}
                      slug={`slack_post-to-slack-${today.format("YYYY-MM-DD")}`}
                      title={`Post to Slack for ${today.format("MMMM D, YYYY")}`}
                      initialValue={field.value}
                      onChange={({ html }) => {
                        console.log(html);
                        field.onChange(html);
                      }}
                      onBlur={field.onBlur}
                      saveNow={saveNow}
                      onSaveEnd={handleNoteSaved}
                      className="min-h-[40vh]"
                    />
                  )}
                />
                {formState.errors.root && (
                  <div className="text-negative-600 text-sm">{formState.errors.root.message}</div>
                )}
                <div className="flex justify-between items-center">
                  <ChannelsPicker
                    control={control}
                    channelsData={channelsData}
                    onRefresh={() => getAndSetChannels({ forceRefresh: true })}
                    refreshing={refreshing}
                  />
                  <div className="flex items-center gap-2">
                    <props.BackButton type="button" />
                    <props.NextButton
                      type="submit"
                      loading={postingMessages}
                      onClick={() => {
                        // override the default onClick to prevent from going to the next step until the form is submitted
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          );
        },
        renderSettings: async (props) => {
          return {
            component: () => {
              const template = props.routineStep.templates[0] as
                | (typeof props.routineStep.templates)[0]
                | undefined;
              const { control, handleSubmit } = opts.reactHookForm.useForm<PostToSlackSettings>({
                defaultValues: {
                  template: {
                    content: template?.raw ?? getDefaultPlanYourDayTemplate(),
                    data: template?.metadata ?? {},
                  },
                  channels:
                    props.routineStep?.config?.defaultChannels?.map(
                      (c: GetChannelsData["channels"][0]) => c.id,
                    ) ?? [],
                },
              });
              const [refreshing, setRefreshing] = React.useState(false);
              const [channelsData, setChannelsData] = React.useState<GetChannelsData>({
                channels: props.routineStep?.config?.defaultChannels ?? [],
                lastCachedAt: opts.dayjs().toISOString(),
              });

              const [updateRoutineStep, savingTemplate] =
                opts.relay.useMutation<webUpdateRoutineStepMutation>(graphql`
                  mutation webUpdateRoutineStepMutation(
                    $routineStep: MutationUpdateRoutineStepInput!
                    $template: MutationCreateOrUpdateTemplateInput!
                  ) {
                    updateRoutineStep(input: $routineStep) {
                      id
                      config
                    }
                    createOrUpdateTemplate(input: $template) {
                      id
                      slug
                      raw
                      metadata
                    }
                  }
                `);

              const onSubmit = async (values: PostToSlackSettings) => {
                const defaultChannels = channelsData.channels.filter((channel) =>
                  values.channels.includes(channel.id),
                );
                updateRoutineStep({
                  variables: {
                    routineStep: {
                      id: props.routineStep.id,
                      config: { defaultChannels },
                    },
                    template: {
                      slug: template?.slug ?? `slack-${POST_TO_SLACK}-${props.routineStep.id}`,
                      raw: values.template.content,
                      metadata: values.template.data ?? {},
                    },
                  },
                  onCompleted: () => props.onClose?.(),
                });
              };

              const getAndSetChannels = async (input?: GetChannelsInput) => {
                setRefreshing(!!input?.forceRefresh);
                const res = await opts.operations.query<GetChannelsInput, GetChannelsData>({
                  operationName: "getChannels",
                  input,
                });
                setChannelsData((prev) => res?.data ?? prev);
                setRefreshing(false);
              };

              opts.hooks.useAsyncEffect(async () => {
                await getAndSetChannels();
              }, []);

              return (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-foreground-900 text-base font-medium">Template</div>
                    <div className="text-foreground-700 text-sm">
                      Write the template message for the routine in HTML. You can preview it before
                      saving.
                      <br />
                      Don't worry, you can edit the message each time you do the routine.
                    </div>
                    <opts.reactHookForm.Controller
                      name="template"
                      control={control}
                      render={({ field }) => (
                        <Flow.TemplateEditor
                          initialTemplate={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-foreground-900 text-base font-medium">
                      Default channels
                    </div>
                    <div className="text-foreground-700 text-sm">
                      Which channels should be selected by default when posting to Slack?
                    </div>
                    <ChannelsPicker
                      control={control}
                      channelsData={channelsData}
                      onRefresh={() => getAndSetChannels({ forceRefresh: true })}
                      refreshing={refreshing}
                    />
                  </div>
                  <div className="flex items-center gap-2 self-end">
                    <Flow.Button type="button" secondary onClick={props.onCancel}>
                      Cancel
                    </Flow.Button>
                    <Flow.Button type="submit" loading={savingTemplate}>
                      Save
                    </Flow.Button>
                  </div>
                </form>
              );
            },
          };
        },
      },
      [SLACK_SUMMARY]: {
        name: "Slack Summary",
        description: "Get a summary of Slack messages and create tasks from them.",
        component: (props) => {
          const [summaryData, setSummaryData] = React.useState<GetSlackSummaryData | null>(null);
          const [loading, setLoading] = React.useState(false);
          const [error, setError] = React.useState<string | null>(null);
          const [channelsData, setChannelsData] = React.useState<GetChannelsData>({
            channels: [],
            lastCachedAt: opts.dayjs().toISOString(),
          });
          const [refreshing, setRefreshing] = React.useState(false);

          const { control, handleSubmit } = opts.reactHookForm.useForm<{
            fromDate: string;
            toDate: string;
            channelsToIgnore: string[];
            teamId?: string;
            userPrompt?: string;
          }>({
            defaultValues: {
              fromDate: opts.dayjs().subtract(7, "days").format("YYYY-MM-DD"),
              toDate: opts.dayjs().format("YYYY-MM-DD"),
              channelsToIgnore: [],
              userPrompt: "",
            },
          });

          const getAndSetChannels = async (input?: GetChannelsInput) => {
            setRefreshing(!!input?.forceRefresh);
            const res = await opts.operations.query<GetChannelsInput, GetChannelsData>({
              operationName: "getChannels",
              input,
            });
            setChannelsData((prev) => res?.data ?? prev);
            setRefreshing(false);
          };

          const onSubmit = async (values: any) => {
            setLoading(true);
            setError(null);
            try {
              const result = await opts.operations.query<GetSlackSummaryInput, GetSlackSummaryData>(
                {
                  operationName: "getSlackSummary",
                  input: {
                    fromDate: values.fromDate,
                    toDate: values.toDate,
                    channelsToIgnore: values.channelsToIgnore,
                    teamId: values.teamId,
                    userPrompt: values.userPrompt,
                    maxMessages: 100,
                  },
                },
              );
              setSummaryData(result?.data || null);
            } catch (err: any) {
              setError(err.message || "Failed to get Slack summary");
            } finally {
              setLoading(false);
            }
          };

          opts.hooks.useAsyncEffect(async () => {
            await getAndSetChannels();
          }, []);

          return (
            <div className="bg-background-100 w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 mx-auto max-w-4xl pt-48 min-h-screen"
              >
                <div className="font-semibold text-4xl">Slack Summary</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <opts.reactHookForm.Controller
                    name="fromDate"
                    control={control}
                    render={({ field }) => (
                      <Flow.FormInput label="From Date" type="date" {...field} />
                    )}
                  />
                  <opts.reactHookForm.Controller
                    name="toDate"
                    control={control}
                    render={({ field }) => (
                      <Flow.FormInput label="To Date" type="date" {...field} />
                    )}
                  />
                </div>

                <opts.reactHookForm.Controller
                  name="userPrompt"
                  control={control}
                  render={({ field }) => (
                    <Flow.FormTextarea
                      label="Filter Prompt (optional)"
                      placeholder="e.g., 'Show me messages about project deadlines' or 'Ignore bot messages'"
                      {...field}
                    />
                  )}
                />

                <div className="flex flex-col gap-2">
                  <div className="text-foreground-900 text-base font-medium">
                    Channels to Ignore
                  </div>
                  <ChannelsPicker
                    control={control}
                    channelsData={channelsData}
                    onRefresh={() => getAndSetChannels({ forceRefresh: true })}
                    refreshing={refreshing}
                  />
                </div>

                {error && <div className="text-negative-600 text-sm">{error}</div>}

                <div className="flex justify-between items-center">
                  <props.BackButton type="button" />
                  <Flow.Button
                    type="submit"
                    loading={loading}
                    onClick={() => {
                      // override the default onClick to prevent from going to the next step until the form is submitted
                    }}
                  >
                    Get Summary
                  </Flow.Button>
                </div>

                {summaryData && (
                  <div className="mt-8">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Summary</h3>
                      <div className="text-sm text-foreground-600 mb-4">
                        {summaryData.messageCount} messages, {summaryData.threadCount} threads from{" "}
                        {opts.dayjs(summaryData.dateRange.from).format("MMM D")} to{" "}
                        {opts.dayjs(summaryData.dateRange.to).format("MMM D")}
                      </div>
                    </div>
                    <div className="border border-background-200 rounded-lg p-4 bg-background-50">
                      <SlackSummaryEditor content={summaryData.summary} />
                    </div>
                  </div>
                )}
              </form>
            </div>
          );
        },
      },
    },
  };
});

type PostToSlack = {
  message: string;
  channels: string[];
};

type PostToSlackSettings = {
  template: {
    content: string;
    data: Record<string, any>;
  };
  channels: string[];
};
