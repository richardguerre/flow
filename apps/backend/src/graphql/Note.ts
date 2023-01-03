import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { CreateNoteLabelInputType } from "./NoteLabel";

export const NoteType = builder.prismaNode("Note", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    date: t.expose("date", { type: "Date" }),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    labels: t.relation("labels"),
  }),
});

// -------------- Note query types --------------

// -------------- Note mutation types --------------

builder.mutationField("createNote", (t) =>
  t.prismaFieldWithInput({
    type: "Note",
    description: "Create a new note.",
    input: {
      date: t.input.field({ type: "Date", required: true, description: "The date of the note." }),
      title: t.input.string({ required: true, description: "The title of the note." }),
      content: t.input.string({ required: true, description: "The content of the note." }),
      labels: t.input.globalIDList({
        required: false,
        description:
          "The IDs of exsiting labels to be linked to the note. If you want to create a new label, use the `newLabels` input.",
      }),
      newLabels: t.input.field({
        type: [CreateNoteLabelInputType],
        required: false,
        description: "Create new labels and link them to the note.",
      }),
    },
    resolve: (query, _, args) => {
      const date = args.input.date;
      return prisma.note.create({
        ...query,
        data: {
          day: { connectOrCreate: { where: { date }, create: { date } } },
          title: args.input.title,
          content: args.input.content,
          labels: {
            connect: args.input.labels?.map((globalId) => ({ id: parseInt(globalId.id) })) ?? [],
            create:
              args.input.newLabels?.map((label) => ({
                name: label.name,
                slug: label.slug ?? label.name.toLowerCase().replace(/ /g, "-"),
                color: label.color,
              })) ?? [],
          },
        },
      });
    },
  })
);
