import SchemaBuilder from "@pothos/core";
import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";
import RelayPlugin from "@pothos/plugin-relay";
import PrismaPlugin from "@pothos/plugin-prisma";
import WithInputPlugin from "@pothos/plugin-with-input";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import {
  DateResolver,
  DateTimeResolver,
  PositiveIntResolver,
  JSONResolver,
  LocalEndTimeResolver,
} from "graphql-scalars";
import { RoutineStep } from "./Routine";

export const encodeGlobalID = (typename: string, id: string | number | bigint) => {
  return `${typename}_${id}`;
};
export const decodeGlobalID = (globalId: string) => {
  const [typename, ...idElements] = globalId.split("_");
  const id = idElements.join(""); // For dates, the ID is a string with colons
  if (!typename || !id) throw new Error("Invalid Relay ID");
  return { typename, id };
};
export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: { Input: Date; Output: Date };
    DateTime: { Input: Date; Output: Date };
    PositiveInt: { Input: number; Output: number };
    JSON: { Input: Prisma.InputJsonValue; Output: Prisma.JsonValue };
    LocalEndTime: { Input: Date; Output: Date };
    RoutineStep: { Input: RoutineStep; Output: RoutineStep | string };
  };
}>({
  plugins: [RelayPlugin, PrismaPlugin, WithInputPlugin],
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "ID",
    edgesFieldOptions: {
      // @ts-ignore as the types don't match the docs, and this works
      nullable: false,
    },
    nodeFieldOptions: {
      nullable: false,
    },
    encodeGlobalID,
    decodeGlobalID,
  },
  prisma: {
    client: prisma,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
  },
});

builder.queryType(); // this initializes the query type, so that builder.queryField() works
builder.mutationType(); // this initializes the mutation type, so that builder.mutationField() works

builder.addScalarType("Date", DateResolver, {});
builder.addScalarType("DateTime", DateTimeResolver, {});
builder.addScalarType("PositiveInt", PositiveIntResolver, {}); // only used in input types
builder.addScalarType("JSON", JSONResolver, {}); // only used in input types
builder.addScalarType("LocalEndTime", LocalEndTimeResolver, {}); // only used in input types
builder.scalarType("RoutineStep", {
  serialize: (value) => value,
  parseValue: (value) => value as RoutineStep,
});

// ----------------- utils -----------------
// The following utils help when working at the intersection of Pothos and Prisma.

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
