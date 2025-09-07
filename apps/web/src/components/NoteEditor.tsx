import { graphql, useLazyLoadQuery, useMutationPromise } from "@flowdev/relay";
import {
  StarterKit,
  useEditor,
  EditorContent,
  allStyles,
  getMarkdown,
  Editor,
  EditorCore,
} from "@flowdev/tiptap";
import { Suspense, useEffect, useRef } from "react";
import { NoteEditorQuery } from "@flowdev/web/relay/__gen__/NoteEditorQuery.graphql";
import { NoteEditorUpsertNoteMutation } from "@flowdev/web/relay/__gen__/NoteEditorUpsertNoteMutation.graphql";
import { dayjs } from "@flowdev/web/dayjs";
import { usePlugins } from "../getPlugin";
import { tw } from "@flowdev/ui/tw";
// import { CreateNoteTagInput } from "@flowdev/web/relay/__gen__/RoutineStepSaveNoteMutation.graphql";

type NoteEditorProps = {
  /** A ref of the TipTap editor instance. */
  editorRef?: React.MutableRefObject<Editor | null>;
  /** The slug of the note. The note will either be created or updated using that slug. */
  slug: string;
  /** The title of the note. Unlike the slug, this doesn't have to be unique. */
  title: string;
  /** If there was nothing stored in the note before, this is the initial value of the editor in HTML (or plain text -- it will get converted to HTML anyway). */
  initialValue?: string;
  autofocus?: boolean;
  /** If true, the editor will be disabled and a loading indicator will be shown. Useful when fetching the `initialValue`. */
  loading?: boolean;
  /** className to apply to the editor. */
  className?: string;
  /** className to apply to the editor container. */
  containerClassName?: string;
  /**
   * Triggers for each key pressed within the editor. If you want to retrive the values less often, use `onSaveBegin` and `onSaveEnd`.
   *
   * Note: the tags and newTags will always be empty arrays for now as the NoteEditor is not fully implemented yet.
   * */
  onChange?: (values: NoteEditorOnChangeValue) => void;
  /** Triggers when the user clicks outside of the editor. */
  onBlur?: () => void;
  /** If true, the note will be saved immediately without waiting for the user to stop typing. */
  saveNow?: boolean;
  /** Triggers at the beginging of each time the values are being saved to the server. */
  onSaveBegin?: (values: NoteEditorOnChangeValue) => void;
  /** Triggers at the end of each time the values have been saved to the server. */
  onSaveEnd?: (values: NoteEditorOnChangeValue) => void;
};

export type NoteEditorOnChangeValue = {
  /** The TipTap editor instance. */
  editor: EditorCore;
  /** The HTML content of the NoteEditor. */
  html: string;
  /**
   * The GlobalIDs of the tags used in the content.
   * This can just be passed to the saveNote() function provided in the routineSteps component props.
   *
   * Note: this not working yet and will always be an empty array. The `NoteEditor` is not fully implemented yet.
   */
  tags: string[];
  // THINK: maybe just passing the `tags` array containing all tags (including the new ones) is enough?
  // /**
  //  * The GlobalIDs of the tags that were created in the content.
  //  * This can just be passed to the saveNote() function provided in the routineSteps component props.
  //  *
  //  * Note: this not working yet and will always be an empty array. The `NoteEditor` is not fully implemented yet.
  //  */
  // newTags: CreateNoteTagInput[];
};

export const NoteEditor = (props: NoteEditorProps) => {
  if (props.loading) {
    // TODO: use a better loading indicator
    return <>Loading...</>;
  }
  return (
    // TODO: use a better loading indicator
    <Suspense fallback="Loading...">
      <NoteEditorContent {...props} />
    </Suspense>
  );
};

const NoteEditorContent = (props: NoteEditorProps) => {
  const { plugins } = usePlugins();
  const timout = useRef<NodeJS.Timeout>();
  const data = useLazyLoadQuery<NoteEditorQuery>(
    graphql`
      query NoteEditorQuery($slug: String!) {
        note(slug: $slug) {
          content
        }
        tags: noteTags {
          edges {
            node {
              slug
            }
          }
        }
      }
    `,
    { slug: props.slug },
  );

  const [upsertNote] = useMutationPromise<NoteEditorUpsertNoteMutation>(graphql`
    mutation NoteEditorUpsertNoteMutation($input: MutationCreateOrUpdateNoteInput!) {
      createOrUpdateNote(input: $input) {
        id
      }
    }
  `);

  const handleSave = async (input: { editor: EditorCore; html: string }) => {
    props.onSaveBegin?.({
      editor: input.editor,
      html: input.html,
      tags: [],
    });
    await upsertNote({
      variables: {
        input: {
          date: dayjs().format("YYYY-MM-DD"),
          slug: props.slug,
          title: props.title,
          content: input.html,
          // TODO: tags
          tags: [],
          newTags: [],
          removedTags: [],
        },
      },
    });
    props.onSaveEnd?.({
      editor: input.editor,
      html: input.html,
      tags: [],
    });
  };

  const pluginExtensions = Object.values(plugins).flatMap(
    (plugin) => plugin.noteEditorTipTapExtensions ?? [],
  );

  const editor = useEditor(
    {
      extensions: [StarterKit, ...pluginExtensions],
      editorProps: { attributes: { class: tw("focus:outline-none", allStyles, props.className) } },
      content: data.note?.content ?? props.initialValue,
      autofocus: props.autofocus,
      onUpdate: ({ editor }) => {
        if (timout.current) clearTimeout(timout.current);
        const html = getMarkdown(editor);
        timout.current = setTimeout(() => {
          handleSave({ editor, html });
        }, 1000); // save after 1 second of inactivity
        if (props.onChange) {
          props.onChange({
            editor,
            html,
            tags: [],
          });
        }
      },
      onBlur: props.onBlur,
    },
    [pluginExtensions.length],
  );

  useEffect(() => {
    if (props.editorRef && editor) props.editorRef.current = editor;
    if (editor && props.saveNow) {
      handleSave({ editor, html: getMarkdown(editor) });
    }
  }, [props.editorRef, props.saveNow, editor]);

  return <EditorContent editor={editor} className={props.containerClassName} />;
};
