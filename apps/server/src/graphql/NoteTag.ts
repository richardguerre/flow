import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { ColorEnum } from "./Color";

export const NoteTagType = builder.prismaNode("NoteTag", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    name: t.exposeString("name"),
    slug: t.exposeString("slug"),
    color: t.expose("color", { type: ColorEnum }),
    notes: t.relatedConnection("notes", { cursor: "id" }),
    isPrivate: t.exposeBoolean("isPrivate"),
  }),
});

// -------------- NoteTag query types --------------

builder.queryField("noteTags", (t) =>
  t.prismaConnection({
    type: "NoteTag",
    cursor: "id",
    description:
      "Get all note tags ordered by usage in descending order. `before` and `after` cursors are ignored, and `first` and `last` act the same and are limited to 100.",
    args: {
      where: t.arg({
        type: NoteTagWhereInput,
        required: false,
        description: "Filters to use when querying note tags.",
      }),
    },
    resolve: (query, _, args) => {
      const where = args.where;
      return prisma.noteTag.findMany({
        ...query,
        where: {
          ...(where?.nameIsLike
            ? { name: { contains: where.nameIsLike, mode: "insensitive" } }
            : {}),
          ...(where?.isPrivate ? { isPrivate: { equals: where.isPrivate } } : {}),
        },
        orderBy: { notes: { _count: "desc" } },
        take: Math.min(args.first ?? args.last ?? 100, 100),
      });
    },
  }),
);

export const NoteTagWhereInput = builder.inputType("NoteTagWhereInput", {
  fields: (t) => ({
    nameIsLike: t.string({
      required: false,
      description: "Filter by name. Case insensitive.",
    }),
    isPrivate: t.boolean({
      required: false,
      description: "Filter by whether the tag is for private use.",
    }),
  }),
});

// -------------- NoteTag mutation types --------------

export const CreateNoteTagInputType = builder.inputType("CreateNoteTagInput", {
  fields: (t) => ({
    name: t.string({ required: true, description: "The name of the tag." }),
    slug: t.string({
      required: false,
      description: "The slug of the tag. Defaults to dashcase version of the name.",
    }),
    color: t.string({ required: true, description: "The color of the tag." }),
  }),
});
