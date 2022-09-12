import { makeSchema } from "nexus";

export const schema = makeSchema({
  types: [],
  outputs: {
    schema: __dirname + "/../generated/schema.graphql",
    typegen: __dirname + "/../generated/nexus-types.d.ts",
  },
});
