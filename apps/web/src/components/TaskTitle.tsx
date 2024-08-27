import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { fetchQuery, graphql, useFragment, useMutation } from "@flowdev/relay";
import {
  useEditor,
  EditorContent,
  Editor,
  Mention,
  CatchNewLines,
  MinimumKit,
  OnEscape,
  type Range,
} from "@flowdev/tiptap";
import { TaskTitle_task$key } from "@flowdev/web/relay/__generated__/TaskTitle_task.graphql";
import { TaskTitleUpdateTaskTitleMutation } from "../relay/__generated__/TaskTitleUpdateTaskTitleMutation.graphql";
import "./TaskTitle.scss";
import { TaskTitleCreateTaskMutation } from "../relay/__generated__/TaskTitleCreateTaskMutation.graphql";
import { createVirtualTask, deleteVirtualTask } from "./Day";
import { ReactRenderer, mergeAttributes } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { environment } from "@flowdev/web/relay/environment";
import { dayjs } from "@flowdev/web/dayjs";
import { TaskTitleInputTaskTagsQuery } from "../relay/__generated__/TaskTitleInputTaskTagsQuery.graphql";
import { TaskTitleInput_taskTags$data } from "../relay/__generated__/TaskTitleInput_taskTags.graphql";

type TaskTitleProps = {
  task: TaskTitle_task$key;
  editorRef?: TaskTitleInputProps["editorRef"];
};

export const TaskTitle = (props: TaskTitleProps) => {
  const task = useFragment(
    graphql`
      fragment TaskTitle_task on Task {
        id
        title
        date # added to be spread in TaskTitleCreateTaskMutation
        status # added to be spread in TaskTitleCreateTaskMutation
        durationInMinutes # added to be spread in TaskTitleCreateTaskMutation
      }
    `,
    props.task,
  );
  const isTemp = task.id.startsWith("Task_0.");

  const [createTask] = useMutation<TaskTitleCreateTaskMutation>(graphql`
    mutation TaskTitleCreateTaskMutation($input: MutationCreateTaskInput!) {
      createTask(input: $input) {
        ...TaskTitle_task @relay(mask: false)
        ...TaskCard_task
      }
    }
  `);
  const [updateTask] = useMutation<TaskTitleUpdateTaskTitleMutation>(graphql`
    mutation TaskTitleUpdateTaskTitleMutation($input: MutationUpdateTaskInput!) {
      updateTask(input: $input) {
        id
        title
      }
    }
  `);

  const handleSave = (title: string) => {
    if (isTemp) {
      createTask({
        variables: {
          input: {
            title,
            date: task.date,
            status: task.status,
            durationInMinutes: task.durationInMinutes,
          },
        },
        updater: (store, data) => {
          if (!data) return;
          const createdTask = data.createTask;
          store
            .get(task.id)
            ?.setValue(createdTask.id, "id")
            .setValue(createdTask.id, "__id")
            .setValue(createdTask.title, "title")
            .setValue(createdTask.status, "status")
            .setValue(createdTask.durationInMinutes, "durationInMinutes");
        },
      });
      createVirtualTask({ date: task.date });
    } else {
      updateTask({
        variables: { input: { id: task.id, title: title } },
        optimisticResponse: { updateTask: { id: task.id, title } },
      });
    }
  };

  const handleCancel = () => {
    if (!isTemp) return;
    deleteVirtualTask(task.id);
  };

  return (
    <TaskTitleInput
      autoFocus={isTemp}
      initialValue={task.title}
      onSave={handleSave}
      onCancel={handleCancel}
      editorRef={props.editorRef}
    />
  );
};

type TaskTitleInputProps = {
  initialValue?: string;
  /** Whether the input should be automatically focused when rendered. */
  autoFocus?: boolean;
  /**
   * Triggered when the user:
   * - clicks outside the input
   * - OR, presses enter
   */
  onSave?: (value: string) => void;
  onCancel?: () => void;
  /** The className to apply to the input. This will **override** the default className. */
  className?: string;
  editorRef?: MutableRefObject<Editor | null>;
  readOnly?: boolean;
};

export const TaskTitleInput = (props: TaskTitleInputProps) => {
  const editorRef = useRef<Editor | null>(null);
  const [editable, setEditable] = useState(props.autoFocus ?? false);

  const handleSave = useCallback(() => {
    setEditable(false);
    if (!editorRef.current) return;
    if (editorRef.current.isEmpty) {
      props.onCancel?.();
      return;
    }

    // The following if statement prevents double saves.
    // Using `editorRef.current.isEditable` instead of `editable` state,
    // because the state (which btw needs to be added to the dependency array of useCallback)
    // is updated within the same event loop, while the editorRef.current.isEditable
    // is updated in the next event loop.
    if (!editorRef.current.isEditable) return;

    const newValue = editorRef.current.getHTML();
    console.log(newValue, props.initialValue);
    if (newValue === props.initialValue) {
      props.onCancel?.();
      return;
    }
    props.onSave?.(newValue);
  }, [editorRef.current]);

  editorRef.current = useEditor({
    extensions: [
      MinimumKit,
      CatchNewLines(() => editorRef.current!.commands.blur()),
      OnEscape(() => editorRef.current!.commands.blur()),
      TaskTags,
    ],
    content: props.initialValue ?? "",
    editable: props.readOnly ? false : undefined,
    onBlur: handleSave,
  });

  const handleClick = () => {
    // the following setTimeout allows the user to click on links within the editor
    // without first having to make the editor editable (i.e. no need to double click)
    setTimeout(() => {
      setEditable(true);
    }, 1);
  };

  useEffect(() => {
    editorRef.current?.setEditable(editable);
    if (editable && !props.readOnly) {
      editorRef.current?.commands.focus("end");
    }
    if (props.editorRef) props.editorRef.current = editorRef.current;
  }, [editable, editorRef.current]);

  useEffect(() => {
    if (!editorRef.current) return;
    if (props.initialValue === undefined) return;
    if (props.initialValue === editorRef.current.getHTML()) return;
    editorRef.current.commands.setContent(props.initialValue);
  }, [editorRef.current, props.initialValue]);

  return (
    <EditorContent
      className={props.className ?? "TaskTitleInput w-full cursor-text p-0"}
      editor={editorRef.current}
      onClick={handleClick}
    />
  );
};

const TaskTags = Mention.configure({
  renderHTML({ options, node }) {
    const tag = node.attrs as { id: string; label?: string };
    return [
      "span",
      mergeAttributes({ class: "bg-red-100" }, options.HTMLAttributes),
      `${options.suggestion.char}${tag.label ?? tag.id}`,
    ];
  },
  suggestion: {
    char: "#",
    items: async ({ query }) => {
      const lastTimeQueriedTags = localStorage.getItem("lastTimeQueriedTags");
      const FIVE_MINUTES = 1000 * 60 * 5;
      const hasBeenQueriedRecently = lastTimeQueriedTags
        ? dayjs().diff(dayjs(lastTimeQueriedTags), "millisecond") < FIVE_MINUTES
        : false;

      const tagsData = await fetchQuery<TaskTitleInputTaskTagsQuery>(
        environment,
        graphql`
          query TaskTitleInputTaskTagsQuery {
            taskTags {
              edges {
                node {
                  ...TaskTitleInput_taskTags @relay(mask: false)
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
    command: (...args) => console.log(args),
    render: () => {
      let reactRenderer: ReactRenderer<any, any>; // TODO: fix types
      let popup: Instance<any>; // TODO: fix types

      return {
        onStart: (props) => {
          if (!props.clientRect) return;

          reactRenderer = new ReactRenderer(TagsList, {
            props,
            editor: props.editor,
          });

          // @ts-ignore next line as tippy.js types are incorrect/overload is too complex it trips on itself
          [popup] = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: reactRenderer.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },

        onUpdate(props) {
          reactRenderer.updateProps(props);
          if (!props.clientRect) return;
          popup.setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup.hide();
            return true;
          }
          if (props.event.key === "Enter") {
            return true; // prevents the editor from losing focus
          }

          return reactRenderer.ref?.onKeyDown(props);
        },

        onExit() {
          popup.destroy();
          reactRenderer.destroy();
        },
      };
    },
  },
});

const TagsList = forwardRef<
  any,
  { items: TaskTitleInput_taskTags$data[]; command: any; editor: Editor; range: Range }
>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    // console.log(props);
    if (item) {
      // props.command(item);

      props.editor
        .chain()
        .deleteRange({ from: props.range.from, to: props.range.to })
        .insertContent({
          type: "mention",
          attrs: {
            id: item.id,
            label: item.name,
          },
        })
        .insertContent(" ") // add an extra space after the mention
        .run();
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === "ArrowUp") {
        console.log("up", selectedIndex);
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
        return true;
      }

      if (event.key === "ArrowDown") {
        console.log("down", selectedIndex);
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }

      if (event.key === "Enter") {
        console.log("enter", selectedIndex);
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  useEffect(() => setSelectedIndex(0), [props.items]);

  return (
    <div className="dropdown-menu">
      {props.items.map((item, i) => (
        <button
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            selectItem(i);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
});

graphql`
  fragment TaskTitleInput_taskTags on TaskTag {
    id
    name
  }
`;
