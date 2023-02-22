import { graphql, useFragment } from "@flowdev/relay";
import { useEditor, EditorContent } from "@tiptap/react";
import { TaskTitleInput_task$key } from "@flowdev/web/relay/__generated__/TaskTitleInput_task.graphql";
import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Mention } from "@tiptap/extension-mention";
import { History } from "@tiptap/extension-history";
import "./TaskTitleInput.css";

type TaskTitleInputProps = {
  initialValue?: string;
  task: TaskTitleInput_task$key;
};

export const TaskTitleInput = (props: TaskTitleInputProps) => {
  const task = useFragment(
    graphql`
      fragment TaskTitleInput_task on Task {
        id
        title
      }
    `,
    props.task
  );

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      History,
      Mention.configure({
        suggestion: {
          char: "#",
        },
      }),
    ],
    content: task.title,
  });

  return <EditorContent className="w-full p-0 TaskTitleInput" editor={editor} />;
};
