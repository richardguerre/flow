import { builder, u } from "./builder";
import { prisma } from "../utils/prisma";
import { createItemWhere, ItemWhereInput } from "./Item";

// -------------- List types --------------

export const ListType = builder.prismaNode("List", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    name: t.exposeString("name"),
    slug: t.exposeString("slug"),
    description: t.exposeString("description", { nullable: true }),
    items: t.relatedConnection("items", {
      cursor: "id",
      args: { where: t.arg({ type: ItemWhereInput, required: false }) },
      query: (args) => ({
        where: createItemWhere(args.where ?? {}),
        orderBy: { updatedAt: "desc" },
      }),
    }),
  }),
});

// --------------- List query types ---------------

builder.queryField("lists", (t) =>
  t.prismaField({
    type: ["List"],
    description: "Get all lists.",
    args: {
      first: t.arg({
        type: "PositiveInt",
        required: false,
        description: "The number of lists to return. If not provided, all lists will be returned.",
      }),
    },
    resolve: (query, _, args) => {
      return prisma.list.findMany({
        ...query,
        take: u(args.first),
        orderBy: { createdAt: "asc" }, // this ensures that the lists are always returned in the same order
      });
    },
  })
);
