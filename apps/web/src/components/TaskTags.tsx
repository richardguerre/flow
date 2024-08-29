import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Editor, Mention } from "@flowdev/tiptap";
import { ReactRenderer, mergeAttributes } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import { environment } from "@flowdev/web/relay/environment";
import { dayjs } from "@flowdev/web/dayjs";
import { TaskTagsQuery } from "@flowdev/web/relay/__generated__/TaskTagsQuery.graphql";
import { TaskTags_tag$data } from "@flowdev/web/relay/__generated__/TaskTags_tag.graphql";
import { fetchQuery, graphql } from "@flowdev/relay";

export const TaskTagsExtension = Mention.extend({
  addAttributes: () => ({
    id: {
      default: "something",
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
    color: {
      default: null,
      parseHTML: (element) => element.getAttribute("data-color") ?? null,
      renderHTML: (attrs) => {
        if (!attrs.color) return {};
        return { "data-color": attrs.color };
      },
    },
  }),
  parseHTML: () => [{ tag: "span[data-tasktag-id]" }],
  renderHTML({ node, HTMLAttributes }) {
    const taskTag = node.attrs as TaskTagAttrs;
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      `${this.options.suggestion.char}${taskTag.name}`,
    ];
  },
}).configure({
  suggestion: {
    char: "#",
    items: async ({ query }) => {
      const lastTimeQueriedTags = localStorage.getItem("lastTimeQueriedTags");
      const FIVE_MINUTES = 1000 * 60 * 5;
      const hasBeenQueriedRecently = lastTimeQueriedTags
        ? dayjs().diff(dayjs(lastTimeQueriedTags), "millisecond") < FIVE_MINUTES
        : false;

      const tagsData = await fetchQuery<TaskTagsQuery>(
        environment,
        graphql`
          query TaskTagsQuery {
            taskTags {
              edges {
                node {
                  ...TaskTags_tag @relay(mask: false)
                }
              }
            }
          }
        `,
        {},
        { fetchPolicy: "network-only" },
      ).toPromise();

      if (!hasBeenQueriedRecently) {
        localStorage.setItem("lastTimeQueriedTags", dayjs().toISOString());
      }

      return (tagsData?.taskTags.edges.map((edge) => edge.node) ?? [])
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
      items: TaskTags_tag$data[];
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
          .insertContent({
            type: "mention",
            attrs: {
              id: item.id,
              name: item.name,
              color: item.color,
            } as TaskTagAttrs,
          })
          .insertContent(" ") // add an extra space after the mention
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
      <div className="flex flex-col gap-1 rounded-md border border-gray-200 bg-white p-1">
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

type TaskTagAttrs = TaskTags_tag$data;

graphql`
  fragment TaskTags_tag on TaskTag {
    id
    name
    color
  }
`;
