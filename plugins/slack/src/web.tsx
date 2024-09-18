import { definePlugin } from "@flowdev/plugin/web";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import { DEFAULT_PLAN_YOUR_DAY, POST_YOUR_PLAN } from "./common";
import type { webUpdateRoutineStepMutation } from "./relay/__gen__/webUpdateRoutineStepMutation.graphql";
import { BsCheck } from "react-icons/bs";

export default definePlugin((opts) => {
  const React = opts.React; // required so that the Slack plugin uses the same React version as the web app
  const Flow = opts.components;
  const graphql = opts.relay.graphql;

  const Workspaces = () => {
    const workspacesQuery = opts.operations.useLazyQuery<WorkspacesData>({
      operationName: "workspaces",
    });

    if (!workspacesQuery?.data?.workspaces.length) {
      return (
        <div className="flex">
          No workspaces connected. Please connect an account to use the Slack plugin.
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {workspacesQuery?.data?.workspaces.map((workspace) => (
          <div className="flex items-center gap-2 rounded max-w-2xl bg-background-50 shadow px-4 py-2">
            <img src={workspace.teamAvatar} />
            <img src={workspace.teamIcon} />
            <span>{workspace.teamName}</span>
          </div>
        ))}
      </div>
    );
  };

  const SlackStatusNode = Node.create({
    name: "slack-status",
    inline: true,
    group: "inline",
    atom: true,
    parseHTML: () => [{ tag: "slack-status" }],
    renderHTML: (props) => ["slack-status", mergeAttributes(props.HTMLAttributes)],
    addNodeView: () => ReactNodeViewRenderer(SlackStatusNodeView),
  });

  const SlackStatusNodeView = (props: { selected: boolean }) => {
    return (
      <NodeViewWrapper as="span">
        <Flow.Tooltip>
          <Flow.TooltipTrigger
            className={opts.cn(
              "p-0.5 mr-1 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-1 h-5 w-5 inline-flex items-center justify-center",
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
      </NodeViewWrapper>
    );
  };

  // invisible node to store the posted message metadata in the note itself
  const SlackMessageNode = Node.create({
    name: "slack-message",
    group: "block",
    atom: true,
    selectable: false,
    draggable: false,
    parseHTML: () => [{ tag: "slack-message" }],
    renderHTML: (props) => ["slack-message", mergeAttributes(props.HTMLAttributes)],
  });

  return {
    name: "Slack",
    noteEditorTipTapExtensions: [SlackStatusNode, SlackMessageNode],
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
      [POST_YOUR_PLAN]: {
        name: "Post your plan",
        description: "Post your plan for the day in Slack channels.",
        component: (props) => {
          const template = props.templates[0] as (typeof props.templates)[0] | undefined;
          const editorRef = React.useRef<Editor>(null);
          const today = opts.dayjs();
          const [saveNow, setSaveNow] = React.useState(false);
          const [channels, setChannels] = React.useState<GetChannelsData["channels"]>(
            props.stepConfig?.defaultChannels ?? [],
          );
          const { control, handleSubmit, formState, setError } =
            opts.reactHookForm.useForm<PostPlan>({
              defaultValues: {
                message: template,
                channels: channels.map((channel) => channel.id),
              },
            });
          const [postMessages, postingMessages] = opts.operations.useMutation<
            PostMessageInput,
            PostMessageData
          >("postMessage");

          const onSubmit = async (values: PostPlan) => {
            const channelsToPost = channels.filter((channel) =>
              values.channels.includes(channel.id),
            );
            if (!channelsToPost.length) {
              setError("root", { message: "Please select at least one channel." });
              return;
            }
            const res = await postMessages({
              message: values.message,
              channels: channelsToPost.map((channel) => ({
                teamId: channel.team.id,
                channelId: channel.id,
              })),
            });
            if (!res?.data?.ok) {
              setError("root", { message: "Couldn't post message to Slack channels." });
              return;
            }
            const chain = editorRef.current?.chain();
            for (const message of res.data.messages) {
              // add the messages to the end of the
              chain?.insertContentAt(-1, {
                type: "slack-message",
                attrs: {
                  teamId: message.teamId,
                  channelId: message.channelId,
                  ts: message.ts,
                },
              });
            }
            chain?.run();
            setSaveNow(true);
          };

          const handleNoteSaved = () => {
            if (!saveNow) return; // ignore if saveNow is still false
            setSaveNow(false);
            props.onNext();
          };

          opts.hooks.useAsyncEffect(async () => {
            const res = await opts.operations.query<GetChannelsData>({
              operationName: "channels",
            });
            setChannels((prev) => res?.data?.channels ?? prev);
          }, []);

          return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <opts.reactHookForm.Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <Flow.NoteEditor
                    editorRef={editorRef}
                    slug={`slack_post-plan-${today.format("YYYY-MM-DD")}`}
                    title={`Plan for ${today.format("MMMM D")}`}
                    initialValue={field.value}
                    onChange={({ html }) => field.onChange(html)}
                    onBlur={field.onBlur}
                    saveNow={saveNow}
                    onSaveEnd={handleNoteSaved}
                  />
                )}
              />
              {formState.errors.root && (
                <div className="text-negative-600 text-sm">{formState.errors.root.message}</div>
              )}
              <div className="flex justify-between items-center">
                <Flow.FormCombobox name="channels" control={control} multiselect>
                  <Flow.ComboboxTrigger>
                    <Flow.ComboboxValue />
                  </Flow.ComboboxTrigger>
                  <Flow.ComboboxContent>
                    <Flow.ComboboxInput placeholder="Search channels..." />
                    <Flow.ComboboxEmpty>No channel found.</Flow.ComboboxEmpty>
                    <Flow.ComboboxGroup>
                      {channels.map((channel) => (
                        <Flow.ComboboxItem key={channel.id} value={channel.id}>
                          <Flow.ComboboxSelected
                            className="mr-2 h-4 w-4 opacity-0"
                            selectedClassName="opacity-100"
                          >
                            <BsCheck size={20} />
                          </Flow.ComboboxSelected>
                          <img src={channel.team.icon} className="h-5 w-5 shrink-0 mr-2" />
                          {channel.name}
                        </Flow.ComboboxItem>
                      ))}
                    </Flow.ComboboxGroup>
                  </Flow.ComboboxContent>
                </Flow.FormCombobox>
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
          );
        },
        renderSettings: async (props) => {
          return {
            component: () => {
              const template = props.routineStep.templates[0] as
                | (typeof props.routineStep.templates)[0]
                | undefined;
              const { control, handleSubmit } = opts.reactHookForm.useForm<PostPlanSettings>({
                defaultValues: {
                  template: {
                    content: template?.raw ?? DEFAULT_PLAN_YOUR_DAY,
                    data: template?.metadata ?? {},
                  },
                },
              });
              const [channels, setChannels] = React.useState<GetChannelsData["channels"]>(
                props.routineStep?.config?.defaultChannels ?? [],
              );

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

              const onSubmit = async (values: PostPlanSettings) => {
                const defaultChannels = channels.filter((channel) =>
                  values.defaultChannels.includes(channel.id),
                );
                updateRoutineStep({
                  variables: {
                    routineStep: {
                      id: props.routineStep.id,
                      config: { defaultChannels },
                    },
                    template: {
                      slug: template?.slug ?? `slack-${POST_YOUR_PLAN}-${props.routineStep.id}`,
                      raw: values.template.content,
                      metadata: values.template.data ?? {},
                    },
                  },
                });
              };

              opts.hooks.useAsyncEffect(async () => {
                const res = await opts.operations.query<GetChannelsData>({
                  operationName: "channels",
                });
                setChannels((prev) => res?.data?.channels ?? prev);
              }, []);

              return (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                  <Flow.FormCombobox name="defaultChannels" control={control} multiselect>
                    <Flow.ComboboxTrigger>
                      <Flow.ComboboxValue />
                    </Flow.ComboboxTrigger>
                    <Flow.ComboboxContent>
                      <Flow.ComboboxInput placeholder="Search channels..." />
                      <Flow.ComboboxEmpty>No channel found.</Flow.ComboboxEmpty>
                      <Flow.ComboboxGroup>
                        {channels.map((channel) => (
                          <Flow.ComboboxItem key={channel.id} value={channel.id}>
                            <Flow.ComboboxSelected
                              className="mr-2 h-4 w-4 opacity-0"
                              selectedClassName="opacity-100"
                            >
                              <BsCheck size={20} />
                            </Flow.ComboboxSelected>
                            <img src={channel.team.icon} className="h-5 w-5 shrink-0 mr-2" />
                            {channel.name}
                          </Flow.ComboboxItem>
                        ))}
                      </Flow.ComboboxGroup>
                    </Flow.ComboboxContent>
                  </Flow.FormCombobox>
                  <div className="flex items-center gap-2 self-end">
                    <Flow.Button type="button" onClick={props.onCancel}>
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
    },
  };
});

type PostPlan = {
  message: string;
  channels: string[];
};

type PostPlanSettings = {
  template: {
    content: string;
    data: Record<string, any>;
  };
  defaultChannels: string[];
};

const SlackMark = () => (
  <svg width="16" height="16" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg">
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
