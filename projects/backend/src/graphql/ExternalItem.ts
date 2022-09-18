import { extendType, objectType, inputObjectType, arg } from "nexus";
import { ExternalItem } from "nexus-prisma";

// -------------- ExternalItem --------------

export const ExternalItemType = objectType({
  name: ExternalItem.$name,
  description: ExternalItem.$description,
  definition(t) {
    t.field(ExternalItem.id);
    t.field(ExternalItem.title);
    t.field(ExternalItem.isRelevant);
    t.field(ExternalItem.url);
    t.field(ExternalItem.scheduledAt);
    t.field(ExternalItem.durationInMinutes);
  },
});

// --------------- Query types ---------------

export const ExternalItemQueryTypes = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("externalItems", {
      type: "ExternalItem",
      args: {
        where: arg({ type: "ExternalItemWhereInput" }),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.externalItem.findMany({
          where: {
            isRelevant: args.where?.isRelevant ?? true,
            ...(args.where?.isScheduled
              ? {
                  scheduledAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lte: new Date(new Date().setHours(23, 59, 59, 999)),
                  },
                }
              : { scheduledAt: null }),
          },
        });
      },
    });
  },
});

export const ExternalItemWhereInput = inputObjectType({
  name: "ExternalItemWhereInput",
  definition(t) {
    t.boolean("isRelevant");
    t.boolean("isScheduled");
  },
});
