import { extendType, objectType } from "nexus";

export const ExternalItem = objectType({
  name: "ExternalItem",
  description: "A task coming from an external source (e.g. Linear, GitHub, Google Calendar, etc.)",
  definition(t) {
    t.int("id", {
      resolve(...args) {
        console.log(args);
        return 2;
      },
    });
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("externalItem", {
      type: "ExternalItem",
      resolve() {
        return [{ id: 1 }];
      },
    });
  },
});
