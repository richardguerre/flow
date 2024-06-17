import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import {
  useEditor,
  EditorContent,
  Editor,
  Mention,
  CatchNewLines,
  MinimumKit,
  OnEscape,
} from "@flowdev/tiptap";
import { TaskTitle_task$key } from "@flowdev/web/relay/__generated__/TaskTitle_task.graphql";
import { TaskTitleUpdateTaskTitleMutation } from "../relay/__generated__/TaskTitleUpdateTaskTitleMutation.graphql";
import "./TaskTitle.scss";
import { TaskTitleCreateTaskMutation } from "../relay/__generated__/TaskTitleCreateTaskMutation.graphql";
import { createVirtualTask, deleteVirtualTask } from "./Day";

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
      Mention.configure({
        suggestion: {
          char: "#",
        },
      }),
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
