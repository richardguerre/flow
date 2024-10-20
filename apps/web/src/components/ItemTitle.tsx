import { useCallback, useEffect, useRef, useState } from "react";
import {
  Editor,
  EditorContent,
  useEditor,
  Mention,
  MinimumKit,
  OnEscape,
  minimumStyles,
} from "@flowdev/tiptap";
import { CatchNewLines } from "@flowdev/tiptap";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { ItemTitle_item$key } from "../relay/__gen__/ItemTitle_item.graphql";
import { ItemTitleUpdateItemTitleMutation } from "../relay/__gen__/ItemTitleUpdateItemTitleMutation.graphql";
import { ItemTitleCreateItemMutation } from "../relay/__gen__/ItemTitleCreateItemMutation.graphql";
import { deleteVirtualItem, isTempItemId } from "./InboxList";

type ItemTitleProps = {
  item: ItemTitle_item$key;
  itemsConnectionId: string | undefined;
};

export const ItemTitle = (props: ItemTitleProps) => {
  const item = useFragment(
    graphql`
      fragment ItemTitle_item on Item {
        id
        title
        inboxPoints # added to be spread in ItemTitleCreateItemMutation
      }
    `,
    props.item,
  );
  const isTemp = isTempItemId(item.id);

  const [createItem] = useMutation<ItemTitleCreateItemMutation>(graphql`
    mutation ItemTitleCreateItemMutation($input: MutationCreateItemInput!) {
      createItem(input: $input) {
        ...ItemTitle_item @relay(mask: false)
        ...ItemCard_item
      }
    }
  `);

  const [updateItem] = useMutation<ItemTitleUpdateItemTitleMutation>(graphql`
    mutation ItemTitleUpdateItemTitleMutation($input: MutationUpdateItemInput!) {
      updateItem(input: $input) {
        id
        title
      }
    }
  `);

  const handleSave = (title: string) => {
    console.log("saving", item.id);
    if (isTemp) {
      createItem({
        variables: { input: { title, inboxPoints: 1 } },
        updater: (store, data) => {
          if (!data) return;
          const createdItem = data.createItem;
          store
            .get(item.id)
            ?.setValue(createdItem.id, "id")
            .setValue(createdItem.id, "__id")
            .setValue(createdItem.title, "title")
            .setValue(createdItem.inboxPoints, "inboxPoints");
        },
      });
    } else {
      updateItem({
        variables: { input: { id: item.id, title: title } },
        optimisticResponse: { updateItem: { id: item.id, title } },
      });
    }
  };

  const handleCancel = () => {
    if (!isTemp || !props.itemsConnectionId) return;
    deleteVirtualItem({ itemId: item.id, itemsConnectionId: props.itemsConnectionId });
  };

  return (
    <ItemTitleInput
      toCreate={isTemp}
      initialValue={item.title}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

type ItemTitleInputProps = {
  /** Whether this ItemTitleInput is used to create an item. This currently just auto-focuses the text editor. */
  toCreate?: boolean;
  initialValue?: string;
  /**
   * Triggered when the user:
   * - clicks outside the input
   * - OR, presses enter
   */
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
      CatchNewLines(() => editorRef.current!.commands.blur()),
      OnEscape(() => {
        if (props.onCancel) props.onCancel();
        else editorRef.current!.commands.blur();
      }),
      Mention.configure({
        suggestion: {
          char: "#",
        },
      }),
    ],
    content: props.initialValue ?? "",
    onBlur: handleSave,
    editorProps: { attributes: { class: `focus:outline-transparent ${minimumStyles}` } },
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
      className="w-full cursor-text p-0"
      editor={editorRef.current}
      onClick={handleClick}
    />
  );
};
