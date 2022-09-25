import SchemaBuilder from "@pothos/core";
import { prisma } from "../utils/prisma";
import RelayPlugin from "@pothos/plugin-relay";
import PrismaPlugin from "@pothos/plugin-prisma";
import WithInputPlugin from "@pothos/plugin-with-input";
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
  plugins: [RelayPlugin, PrismaPlugin, WithInputPlugin],
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

builder.queryType();
builder.mutationType();

builder.scalarType("Date", {
  serialize: (val) => val.toJSON(),
  parseValue: (val) => new Date(val as string),
});

// utils
/**
 * Returns either T or undefined which matches with Prisma's inputs.
 * @returns T | undefined
 */
export function u<T>(input: T | null | undefined): T | undefined {
  return input ?? undefined;
}

/**
 * Returns either number or undefined which matches with Prisma's number inputs.
 */
export function uParseInt<T>(input: T | null | undefined): number | undefined {
  return input ? parseInt(input as any) : undefined;
}
