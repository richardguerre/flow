import { builder } from "./builder";

export const NoteLinkType = builder.prismaNode("NoteLink", {
  id: { field: "sourceNoteId_noteId" },
  fields: (t) => ({
    sourceNote: t.relation("sourceNote"),
    note: t.relation("note"),
  }),
});
