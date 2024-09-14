import { Color, Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { CreateNoteTagInputType } from "./NoteTag";

export const NoteType = builder.prismaNode("Note", {
  id: { field: "slug" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    date: t.expose("date", { type: "Date" }),
    slug: t.exposeString("slug"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    tags: t.relation("tags"),
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
  }),
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
      tags: t.input.globalIDList({
        required: false,
        description:
          "The IDs of exsiting tags to be linked to the note. If you want to create a new tag, use the `newTags` input.",
      }),
      newTags: t.input.field({
        type: [CreateNoteTagInputType],
        required: false,
        description: "Create new tags and link them to the note.",
      }),
      removedTags: t.input.globalIDList({
        required: false,
        description: "The IDs of tags to be unlinked from the note.",
      }),
    },
    resolve: (query, _, args) => {
      const date = args.input.date;
      const tags = {
        connect: args.input.tags?.map((globalId) => ({ id: parseInt(globalId.id) })) ?? [],
        create:
          args.input.newTags?.map((tag) => ({
            name: tag.name,
            slug: tag.slug ?? tag.name.toLowerCase().replace(/ /g, "-"),
            color: tag.color as Color,
          })) ?? [],
      } as Prisma.NoteTagUncheckedCreateNestedManyWithoutNotesInput;
      return prisma.note.upsert({
        ...query,
        where: { slug: args.input.slug },
        update: {
          // don't update the day when updating the note
          title: args.input.title,
          content: args.input.content,
          tags: {
            ...tags,
            disconnect:
              args.input.removedTags?.map((globalId) => ({
                id: parseInt(globalId.id),
              })) ?? [],
          },
        },
        create: {
          day: { connectOrCreate: { where: { date }, create: { date } } },
          slug: args.input.slug,
          title: args.input.title,
          content: args.input.content,
          tags,
        },
      });
    },
  }),
);
