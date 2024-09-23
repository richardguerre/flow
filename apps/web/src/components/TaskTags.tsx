import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Editor, Mention, MentionOptions } from "@flowdev/tiptap";
import { ReactRenderer, mergeAttributes } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import { environment } from "@flowdev/web/relay/environment";
import { dayjs } from "@flowdev/web/dayjs";
import { TaskTagsQuery } from "@flowdev/web/relay/__gen__/TaskTagsQuery.graphql";
import { TaskTagsNode_tag$data } from "@flowdev/web/relay/__gen__/TaskTagsNode_tag.graphql";
import { TaskTagsAttrs_tag$data } from "@flowdev/web/relay/__gen__/TaskTagsAttrs_tag.graphql";
import { fetchQuery, graphql } from "@flowdev/relay";
import { useAsyncEffect } from "../useAsyncEffect";

const taskTagsQuery = graphql`
  query TaskTagsQuery {
    taskTags {
      edges {
        node {
          ...TaskTagsNode_tag @relay(mask: false)
        }
      }
    }
  }
`;

const getTaskTags = async () => {
  const lastTimeQueriedTags = localStorage.getItem("lastTimeQueriedTags");
  const FIVE_MINUTES = 1000 * 60 * 5;
  const hasBeenQueriedRecently = lastTimeQueriedTags
    ? dayjs().diff(dayjs(lastTimeQueriedTags), "millisecond") < FIVE_MINUTES
    : false;

  if (!hasBeenQueriedRecently) {
    localStorage.setItem("lastTimeQueriedTags", dayjs().toISOString());
  }

  const taskTagsData = await fetchQuery<TaskTagsQuery>(
    environment,
    taskTagsQuery,
    {},
    { fetchPolicy: hasBeenQueriedRecently ? "store-or-network" : "network-only" },
  ).toPromise();

  return taskTagsData?.taskTags.edges.map((edge) => edge.node as TaskTagsNode) ?? [];
};

export const useTaskTags = (props?: { onLoaded?: (tags: TaskTagsNode[]) => void }) => {
  const [taskTags, setTaskTags] = useState<TaskTagsNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useAsyncEffect(async () => {
    setLoading(true);
    const tags = await getTaskTags().finally(() => setLoading(false));
    props?.onLoaded?.(tags);
    setTaskTags(tags);
    setLoaded(true);
    setLoading(false);
  }, []);

  return { taskTags, loading, loaded };
};

export const TaskTagsExtension = Mention.extend<
  MentionOptions & { tags: TaskTagsNode[] },
  { tags: TaskTagsNode[] }
>({
  name: "taskTag",
  addOptions() {
    return { ...this.parent?.(), tags: [] };
  },
  addAttributes: () => ({
    id: {
      default: null,
      parseHTML: (element) => element.getAttribute("data-tasktag-id") ?? null,
      renderHTML: (attrs) => {
        if (!attrs.id) return {};
        return { "data-tasktag-id": attrs.id };
      },
    },
    name: {
      default: null,
      parseHTML: (element) => element.getAttribute("data-name") ?? null,
      renderHTML: (attrs) => {
        if (!attrs.name) return {};
        return { "data-name": attrs.name };
      },
    },
  }),
  parseHTML: () => [{ tag: "span[data-tasktag-id]" }],
  renderHTML({ node, HTMLAttributes }) {
    const taskTagAttrs = node.attrs as TaskTagsAttrs;
    const taskTag = this.options.tags.find((tag) => tag.id === taskTagAttrs.id);
    console.log(taskTag);
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `text-${taskTag?.color ?? "gray"}-700`,
      }),
      `${this.options.suggestion.char}${taskTag?.name ?? taskTagAttrs.name}`,
    ];
  },
}).configure({
  suggestion: {
    char: "#",
    items: async ({ query }) => {
      const taskTagsData = await getTaskTags();

      return taskTagsData
        .filter((tag) => tag.name.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5);
    },

    render: () => {
      let component: ReactRenderer<any, any>;
      let popup: TippyInstance<any>;

      return {
        onStart: (props) => {
          component = new ReactRenderer(TaskTagsList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          // @ts-ignore as tippy's types are incorrect (the first function overload is used instead of the second)
          [popup] = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },

        onUpdate(props) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup.setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup.hide();

            return true;
          }

          return component.ref?.onKeyDown(props);
        },

        onExit() {
          popup.destroy();
          component.destroy();
        },
      };
    },
  },
});

const TaskTagsList = forwardRef(
  (
    props: {
      items: TaskTagsNode_tag$data[];
      range: { from: number; to: number };
      editor: Editor;
    },
    ref,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];

      if (item) {
        props.editor
          .chain()
          .deleteRange({ from: props.range.from, to: props.range.to })
          .insertContent({ type: "taskTag", attrs: item })
          .run();
      }
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
          return true;
        } else if (event.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % props.items.length);
          return true;
        } else if (event.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      },
    }));

    return (
      <div className="flex flex-col gap-1 rounded-md border border-gray-200 bg-background-50 p-1">
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              className={index === selectedIndex ? "bg-primary-200" : ""}
              key={index}
              onClick={() => selectItem(index)}
            >
              {item.name}
            </button>
          ))
        ) : (
          <div className="item">No result</div>
        )}
      </div>
    );
  },
);

type TaskTagsNode = TaskTagsNode_tag$data;
graphql`
  fragment TaskTagsNode_tag on TaskTag {
    id
    name
    color
    ...TaskTagsAttrs_tag @relay(mask: false)
  }
`;

type TaskTagsAttrs = TaskTagsAttrs_tag$data;
graphql`
  fragment TaskTagsAttrs_tag on TaskTag {
    id
    name
  }
`;
