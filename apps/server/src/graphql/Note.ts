import { Color } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { CreateNoteLabelInputType } from "./NoteLabel";

export const NoteType = builder.prismaNode("Note", {
  id: { field: "slug" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    date: t.expose("date", { type: "Date" }),
    slug: t.exposeString("slug"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    labels: t.relation("labels"),
  }),
});

// -------------- Note query types --------------

builder.queryField("note", (t) =>
  t.prismaField({
    type: "Note",
    description: "Get a note by its `slug`.",
    nullable: true,
    args: {
      slug: t.arg.string({ required: true, description: "The slug of the note." }),
    },
    resolve: (query, _, { slug }) => {
      return prisma.note.findUnique({ ...query, where: { slug } });
    },
  })
);

// -------------- Note mutation types --------------

builder.mutationField("createOrUpdateNote", (t) =>
  t.prismaFieldWithInput({
    type: "Note",
    description:
      "Updates a note if one exists with the passed in `slug`, otherwise creates a new note.",
    input: {
      date: t.input.field({ type: "Date", required: true, description: "The date of the note." }),
      slug: t.input.string({
        required: true,
        description: "The slug of the note. Used for retrieving the note back.",
      }),
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
      removedLabels: t.input.globalIDList({
        required: false,
        description: "The IDs of labels to be unlinked from the note.",
      }),
    },
    resolve: (query, _, args) => {
      const date = args.input.date;
      const labels = {
        connect: args.input.labels?.map((globalId) => ({ id: parseInt(globalId.id) })) ?? [],
        create:
          args.input.newLabels?.map((label) => ({
            name: label.name,
            slug: label.slug ?? label.name.toLowerCase().replace(/ /g, "-"),
            color: label.color as Color,
          })) ?? [],
      };
      return prisma.note.upsert({
        ...query,
        where: { slug: args.input.slug },
        update: {
          day: { connectOrCreate: { where: { date }, create: { date } } },
          title: args.input.title,
          content: args.input.content,
          labels: {
            ...labels,
            disconnect:
              args.input.removedLabels?.map((globalId) => ({
                id: parseInt(globalId.id),
              })) ?? [],
          },
        },
        create: {
          day: { connectOrCreate: { where: { date }, create: { date } } },
          slug: args.input.slug,
          title: args.input.title,
          content: args.input.content,
          labels,
        },
      });
    },
  })
);
