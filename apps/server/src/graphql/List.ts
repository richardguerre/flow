import { builder, u, uParseInt } from "./builder";
import { prisma } from "../utils/prisma";
import { ItemWhereInputType } from "./Item";

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
      args: { where: t.arg({ type: ItemWhereInputType, required: false }) },
      query: (args) => ({
        where: args.where ?? undefined,
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

builder.queryField("list", (t) =>
  t.prismaField({
    type: "List",
    description: "Get a list by its id or slug.",
    nullable: true,
    smartSubscription: true,
    subscribe: (subs) => {
      subs.register("itemsCreated");
      subs.register("itemsUpdated");
      subs.register("itemsDeleted");
    },
    args: {
      id: t.arg.globalID({ required: false }),
      slug: t.arg.string({ required: false }),
    },
    resolve: (query, _, args) => {
      return prisma.list.findFirst({
        ...query,
        where: { id: uParseInt(args.id?.id), slug: args.slug ?? undefined },
      });
    },
  })
);
