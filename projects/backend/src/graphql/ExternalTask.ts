import { extendType, objectType } from "nexus";

export const ExternalTask = objectType({
  name: "ExternalTask",
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
    t.nonNull.list.nonNull.field("externalTask", {
      type: "ExternalTask",
      resolve() {
        return [{ id: 1 }];
      },
    });
  },
});
