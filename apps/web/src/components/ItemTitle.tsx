import { useCallback, useEffect, useRef, useState } from "react";
import { Editor, EditorContent, useEditor, Mention, MinimumKit } from "@flowdev/tiptap";
import { CatchNewLines } from "@flowdev/tiptap";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { ItemTitle_item$key } from "../relay/__generated__/ItemTitle_item.graphql";
import { ItemTitleUpdateItemTitleMutation } from "../relay/__generated__/ItemTitleUpdateItemTitleMutation.graphql";

type ItemTitleProps = {
  item: ItemTitle_item$key;
};

export const ItemTitle = (props: ItemTitleProps) => {
  const item = useFragment(
    graphql`
      fragment ItemTitle_item on Item {
        id
        title
      }
    `,
    props.item,
  );

  const [updateItem] = useMutation<ItemTitleUpdateItemTitleMutation>(graphql`
    mutation ItemTitleUpdateItemTitleMutation($input: MutationUpdateItemInput!) {
      updateItem(input: $input) {
        id
        title
      }
    }
  `);

  const handleSave = (value: string) => {
    console.log("saving", item.id);
    updateItem({
      variables: { input: { id: item.id, title: value } },
      optimisticResponse: {
        updateItem: {
          id: item.id,
          title: value,
        },
      },
    });
  };

  return <ItemTitleInput initialValue={item.title} onSave={handleSave} />;
};

type ItemTitleInputProps = {
  toCreate?: boolean;
  initialValue?: string;
  onSave?: (newValue: string) => void;
  onCancel?: () => void;
};

export const ItemTitleInput = (props: ItemTitleInputProps) => {
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
        editorRef.current?.commands.blur();
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
      // setTimeout(() => {
      editorRef.current?.commands.focus("end");
      // }, 1000);
    }
  }, [editable, editorRef.current]);

  return (
    <EditorContent
      className="CardEditorInput w-full cursor-text p-0"
      editor={editorRef.current}
      onClick={handleClick}
    />
  );
};
