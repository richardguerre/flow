import { definePlugin } from "@flowdev/plugin/web";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import type { Editor } from "@tiptap/core";

export default definePlugin((opts) => {
  const React = opts.React; // required so that the Slack plugin uses the same React version as the web app
  const Flow = opts.components;

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

  return {
    name: "Slack",
    noteEditorTipTapExtensions: [SlackStatusNode],
    routineSteps: {
      "post-your-plan": {
        name: "Post your plan",
        description: "Post your plan for the day in Slack channels.",
        component: (props) => {
          const [template] = props.templates;
          const editorRef = React.useRef<Editor>(null);
          const [todaysPlan, setTodaysPlan] = React.useState<string>(template.rendered ?? "");
          const [saveNow, setSaveNow] = React.useState(false);
          const today = opts.dayjs();

          return (
            <div>
              <Flow.NoteEditor
                editorRef={editorRef}
                slug={`slack_post-plan-${today.format("YYYY-MM-DD")}`}
                title={`Plan for ${today.format("MMMM D")}`}
                initialValue={todaysPlan}
                onChange={({ html }) => setTodaysPlan(html)}
                saveNow={saveNow}
              />
              <props.BackButton />
              <props.NextButton />
            </div>
          );
        },
      },
    },
  };
});

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
