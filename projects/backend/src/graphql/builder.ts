import SchemaBuilder from "@pothos/core";
import { prisma } from "../utils/prisma";
import RelayPlugin from "@pothos/plugin-relay";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  plugins: [RelayPlugin, PrismaPlugin],
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "ID",
  },
  prisma: {
    client: prisma,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
  },
});

builder.scalarType("Date", {
  serialize: (val) => val.toJSON(),
  parseValue: (val) => new Date(val as string),
});
