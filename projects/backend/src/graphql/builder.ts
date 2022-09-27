import SchemaBuilder from "@pothos/core";
import { prisma } from "../utils/prisma";
import RelayPlugin from "@pothos/plugin-relay";
import PrismaPlugin from "@pothos/plugin-prisma";
import WithInputPlugin from "@pothos/plugin-with-input";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { DateResolver, DateTimeResolver, PositiveIntResolver } from "graphql-scalars";

export const encodeGlobalID = (typename: string, id: string | number | bigint) => {
  return `${typename}:${id}`;
};
export const decodeGlobalID = (globalId: string) => {
  const [typename, id] = globalId.split(":");
  if (!typename || !id) throw new Error("Invalid Relay ID");
  return { typename, id };
};
export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    DateTime: {
      Input: Date;
      Output: Date;
    };
    PositiveInt: {
      Input: number;
      Output: number;
    };
  };
}>({
  plugins: [RelayPlugin, PrismaPlugin, WithInputPlugin],
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
    encodeGlobalID,
    decodeGlobalID,
  },
  prisma: {
    client: prisma,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
  },
});

builder.queryType();
builder.mutationType();

builder.addScalarType("Date", DateResolver, {});
builder.addScalarType("DateTime", DateTimeResolver, {});
builder.addScalarType("PositiveInt", PositiveIntResolver, {}); // only used in input types

// ----------------- utils -----------------
// The following utils help to work interact with Pothos and Prisma.

/**
 * Returns either T or undefined which matches with Prisma's inputs.
 * @returns T | undefined
 */
export function u<T>(input: T | null | undefined): T | undefined {
  return input ?? undefined;
}

/**
 * Returns either number or undefined which matches with Prisma's number inputs.
 * @returns number | undefined
 */
export function uParseInt<T>(input: T | null | undefined): number | undefined {
  return input ? parseInt(input as any) : undefined;
}
