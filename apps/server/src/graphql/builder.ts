import SchemaBuilder from "@pothos/core";
import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";
import RelayPlugin from "@pothos/plugin-relay";
import PrismaPlugin from "@pothos/plugin-prisma";
import WithInputPlugin from "@pothos/plugin-with-input";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { DateResolver, DateTimeResolver, PositiveIntResolver, JSONResolver } from "graphql-scalars";
import { dayjs } from "../utils/dayjs";
import { GraphQLError } from "graphql";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import SmartSubscriptionsPlugin from "@pothos/plugin-smart-subscriptions";
import { pubsub } from "../pubsub";

export const encodeGlobalID = (typename: string, id: string | number | bigint) => {
  return `${typename}_${id}`;
};
export const decodeGlobalID = (globalId: string) => {
  const [typename, ...idElements] = globalId.split("_");
  const id = idElements.join("_"); // For dates, the ID is a string with colons
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
    Time: { Input: Date; Output: Date };
  };
  Context: {
    userAgent?: string;
    sessionToken?: string;
    isSessionValid: () => Promise<boolean>;
  };
  AuthScopes: {
    public: true;
    authenticated: true;
  };
}>({
  // the order of plugins matters. see https://pothos-graphql.dev/docs/plugins/scope-auth#important
  plugins: [RelayPlugin, ScopeAuthPlugin, PrismaPlugin, WithInputPlugin, SmartSubscriptionsPlugin],
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
  authScopes: async (context) => {
    return {
      public: true,
      authenticated: () => context.isSessionValid(),
    };
  },
  scopeAuthOptions: {
    unauthorizedError: (_, __, info) => {
      const errors = {
        query: "You need to be logged in to see this.",
        mutation: "You need to be logged in to do this.",
        subscription: "You need to be logged in to see this.",
        _default: "You need to be logged in to do this.",
      };
      return new GraphQLError(errors[info.operation.operation] ?? errors._default, {
        extensions: {
          code: "UNAUTHENTICATED",
          userFriendlyMessage: errors[info.operation.operation] ?? errors._default,
        },
      });
    },
  },
  smartSubscriptions: {
    subscribe: async ($name, _context, callback) => {
      const name = $name as PubSubKeys;
      for await (const data of pubsub.subscribe(name)) {
        callback(undefined, data);
      }
    },
    unsubscribe: (_name, _context) => {}, // not sure if this is needed
  },
});

builder.queryType({ authScopes: { authenticated: true } }); // this initializes the query type, so that builder.queryField() works
builder.mutationType({ authScopes: { authenticated: true } }); // this initializes the mutation type, so that builder.mutationField() works
builder.subscriptionType({ authScopes: { authenticated: true } }); // this initializes the subscription type, so that builder.subscriptionField() works

builder.addScalarType("Date", DateResolver, {});
builder.addScalarType("DateTime", DateTimeResolver, {});
builder.addScalarType("PositiveInt", PositiveIntResolver, {}); // only used in input types
builder.addScalarType("JSON", JSONResolver, {});
builder.scalarType("Time", {
  description:
    "A time of day, represented as a string in the format `HH:mm`. For example, `16:20`.",
  serialize: (value) => dayjs(value).utc(false).format("HH:mm"),
  parseValue: (value) => {
    // All Time scalars are parsed into Date objects with the date set to 1970-01-01 (i.e. UNIX epoch) at UTC.
    // This corresponds to Prisma's default @db.time(0) type.
    const dayjsObj = dayjs(`1970-01-01 ${value as string}`, "YYYY-MM-DD HH:mm", true).utc(true);
    if (!dayjsObj.isValid()) {
      throw new GraphQLError(
        `Invalid time "${value}". Should be in the format \`HH:mm\`. For example, \`16:20\`.`
      );
    }
    return dayjsObj.toDate();
  },
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
