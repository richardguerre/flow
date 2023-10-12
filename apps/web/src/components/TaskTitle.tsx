import { useCallback, useEffect, useRef, useState } from "react";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import {
  useEditor,
  EditorContent,
  Editor,
  Mention,
  CatchNewLines,
  MinimumKit,
} from "@flowdev/tiptap";
import { TaskTitle_task$key } from "@flowdev/web/relay/__generated__/TaskTitle_task.graphql";
import { TaskTitleUpdateTaskTitleMutation } from "../relay/__generated__/TaskTitleUpdateTaskTitleMutation.graphql";
import "./TaskTitle.scss";

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
      MinimumKit,
      CatchNewLines(() => {
        handleSave();
      }),
      Mention.configure({
        suggestion: {
          char: "#",
        },
      }),
    ],
    content: props.initialValue ?? "",
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
    if (editable) {
      editorRef.current?.commands.focus("end");
    }
  }, [editable, editorRef.current]);

  useEffect(() => {
    if (!editorRef.current) return;
    if (props.initialValue === undefined) return;
    if (props.initialValue === editorRef.current.getHTML()) return;
    editorRef.current.commands.setContent(props.initialValue);
  }, [editorRef.current, props.initialValue]);
  return (
    <EditorContent
      className="CardEditorInput w-full cursor-text p-0"
      editor={editorRef.current}
      onClick={handleClick}
    />
  );
};
