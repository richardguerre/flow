import { graphql, useLazyLoadQuery, useMutationPromise } from "@flowdev/relay";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Suspense, useEffect, useRef } from "react";
import { NoteEditorQuery } from "@flowdev/web/relay/__generated__/NoteEditorQuery.graphql";
import { NoteEditorUpsertNoteMutation } from "@flowdev/web/relay/__generated__/NoteEditorUpsertNoteMutation.graphql";
import { dayjs } from "@flowdev/web/dayjs";
// import { CreateNoteLabelInput } from "@flowdev/web/relay/__generated__/RoutineStepSaveNoteMutation.graphql";

type NoteEditorProps = {
  /** The slug of the note. The note will either be created or updated using that slug. */
  slug: string;
  /** The title of the note. Unlike the slug, this doesn't have to be unique. */
  title: string;
  /** If there was nothing stored in the note before, this is the initial value of the editor in HTML (or plain text -- it will get converted to HTML anyway). */
  initialValue?: string;
  autofocus?: boolean;
  /** If true, the editor will be disabled and a loading indicator will be shown. Useful when fetching the `initialValue`. */
  loading?: boolean;
  /**
   * Triggers for each key pressed within the editor. If you want to retrive the values less often, use `onSaveBegin` and `onSaveEnd`.
   *
   * Note: the labels and newLabels will always be empty arrays for now as the NoteEditor is not fully implemented yet.
   * */
  onChange?: (values: NoteEditorOnChangeValue) => void;
  /** If true, the note will be saved immediately without waiting for the user to stop typing. */
  saveNow?: boolean;
  /** Triggers at the beginging of each time the values are being saved to the server. */
  onSaveBegin?: (values: NoteEditorOnChangeValue) => void;
  /** Triggers at the end of each time the values have been saved to the server. */
  onSaveEnd?: (values: NoteEditorOnChangeValue) => void;
};

export type NoteEditorOnChangeValue = {
  /** The HTML content of the NoteEditor. */
  html: string;
  /**
   * The GlobalIDs of the labels used in the content.
   * This can just be passed to the saveNote() function provided in the routineSteps component props.
   *
   * Note: this not working yet and will always be an empty array. The `NoteEditor` is not fully implemented yet.
   */
  labels: string[];
  // THINK: maybe just passing the `labels` array containing all labels (including the new ones) is enough?
  // /**
  //  * The GlobalIDs of the labels that were created in the content.
  //  * This can just be passed to the saveNote() function provided in the routineSteps component props.
  //  *
  //  * Note: this not working yet and will always be an empty array. The `NoteEditor` is not fully implemented yet.
  //  */
  // newLabels: CreateNoteLabelInput[];
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
  const timout = useRef<NodeJS.Timeout>();
  const data = useLazyLoadQuery<NoteEditorQuery>(
    graphql`
      query NoteEditorQuery($slug: String!) {
        note(slug: $slug) {
          content
        }
        labels: noteLabels {
          edges {
            node {
              slug
            }
          }
        }
      }
    `,
    { slug: props.slug }
  );

  const [upsertNote] = useMutationPromise<NoteEditorUpsertNoteMutation>(graphql`
    mutation NoteEditorUpsertNoteMutation($input: MutationCreateOrUpdateNoteInput!) {
      createOrUpdateNote(input: $input) {
        id
      }
    }
  `);

  const handleSave = async (html: string) => {
    props.onSaveBegin?.({
      html,
      labels: [],
    });
    await upsertNote({
      variables: {
        input: {
          date: dayjs().format("YYYY-MM-DD"),
          slug: props.slug,
          title: props.title,
          content: html,
          // TODO: labels
          labels: [],
          newLabels: [],
          removedLabels: [],
        },
      },
    });
    props.onSaveEnd?.({
      html,
      labels: [],
    });
  };

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
    content: data.note?.content ?? props.initialValue,
    autofocus: props.autofocus,
    onUpdate: ({ editor }) => {
      if (timout.current) clearTimeout(timout.current);
      const content = editor.getHTML();
      timout.current = setTimeout(() => {
        handleSave(content);
      }, 1000); // save after 1 second of inactivity
      if (props.onChange) {
        props.onChange({
          html: content,
          labels: [],
        });
      }
    },
  });

  useEffect(() => {
    if (editor && props.saveNow) {
      handleSave(editor.getHTML());
    }
  }, [props.saveNow, editor]);

  return <EditorContent editor={editor} />;
};
