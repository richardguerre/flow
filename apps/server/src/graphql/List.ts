import { builder } from "./builder";
import { prisma } from "../utils/prisma";

// -------------- List types --------------

export const ListType = builder.prismaNode("List", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    name: t.exposeString("name"),
    slug: t.exposeString("slug"),
    description: t.exposeString("description", { nullable: true }),
    items: t.relatedConnection("items", { cursor: "id" }),
  }),
});

// --------------- List query types ---------------

builder.queryField("lists", (t) =>
  t.prismaField({
    type: ["List"],
    description: "Get all lists.",
    resolve: prisma.list.findMany,
  })
);
