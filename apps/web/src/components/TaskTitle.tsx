import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { TaskTitle_task$key } from "@flowdev/web/relay/__generated__/TaskTitle_task.graphql";
import { TaskTitleUpdateTaskTitleMutation } from "../relay/__generated__/TaskTitleUpdateTaskTitleMutation.graphql";
import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Mention } from "@tiptap/extension-mention";
import { History } from "@tiptap/extension-history";
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import "./TaskTitle.scss";
import { useCallback, useEffect, useRef, useState } from "react";

type TaskTitleProps = {
  task: TaskTitle_task$key;
};

export const TaskTitle = (props: TaskTitleProps) => {
  const task = useFragment(
    graphql`
      fragment TaskTitle_task on Task {
        id
        title
      }
    `,
    props.task
  );

  const [updateTask] = useMutation<TaskTitleUpdateTaskTitleMutation>(graphql`
    mutation TaskTitleUpdateTaskTitleMutation($input: MutationUpdateTaskInput!) {
      updateTask(input: $input) {
        id
        title
      }
    }
  `);

  const handleSave = (value: string) => {
    console.log("saving", task.id);
    updateTask({
      variables: { input: { id: task.id, title: value } },
      optimisticResponse: {
        updateTask: {
          id: task.id,
          title: value,
        },
      },
    });
  };

  return <TaskTitleInput initialValue={task.title} onSave={handleSave} />;
};

type TaskTitleInputProps = {
  initialValue?: string;
  /** Whether the input is used to create a task or not */
  toCreate?: boolean;
  /**
   * Triggered when the user:
   * - clicks outside the input
   * - OR, presses enter
   */
  onSave?: (value: string) => void;
  onCancel?: () => void;
};

export const TaskTitleInput = (props: TaskTitleInputProps) => {
  const editorRef = useRef<Editor | null>(null);
  const [editable, setEditable] = useState(props.toCreate ?? false);

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
    if (newValue === props.initialValue) {
      props.onCancel?.();
      return;
    }
    props.onSave?.(newValue);
  }, [editorRef.current]);

  editorRef.current = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CatchNewLines(() => {
        if (props.toCreate) return;
        handleSave();
      }),
      History,
      Mention.configure({
        suggestion: {
          char: "#",
        },
      }),
    ],
    content: props.initialValue ?? "",
    onBlur: handleSave,
    autofocus: props.toCreate ?? false,
  });

  const handleClick = () => {
    setEditable(true);
  };

  useEffect(() => {
    editorRef.current?.setEditable(editable);
  }, [editable, editorRef.current]);

  return (
    <EditorContent
      className="TaskTitleInput w-full p-0"
      editor={editorRef.current}
      onClick={handleClick}
    />
  );
};

export const CatchNewLines = (onNewLine?: () => void) =>
  Extension.create({
    name: "no_new_line",

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("eventHandler"),
          props: {
            handleKeyDown: (_view, event) => {
              if (event.key === "Enter") {
                onNewLine?.();
                return true;
              }
            },
          },
        }),
      ];
    },
  });
