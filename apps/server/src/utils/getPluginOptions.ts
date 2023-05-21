import { dayjs } from "./dayjs";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export const getPluginOptions = (slug: string) => ({
  /**
   * The dayjs package. This prevents the dayjs package from being bundled with the plugin, so that installs are faster.
   * It has some dayjs extensions already loaded:
   * - customParseFormat
   * - utc
   */
  dayjs,
  prisma: {
    day: {
      findUnique: prisma.day.findUnique,
      findUniqueOrThrow: prisma.day.findUniqueOrThrow,
      findFirst: prisma.day.findFirst,
      findFirstOrThrow: prisma.day.findFirstOrThrow,
      findMany: prisma.day.findMany,
      count: prisma.day.count,
      aggregate: prisma.day.aggregate,
      groupBy: prisma.day.groupBy,
    },
    note: prisma.note,
    noteLabel: prisma.noteLabel,
    task: prisma.task,
    taskLabel: prisma.taskLabel,
    item: prisma.item,
    list: prisma.list,
    routine: prisma.routine,
    store: {
      findUnique: <T extends Prisma.StoreFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.StoreFindUniqueArgs>
      ) =>
        prisma.store.findUnique({
          ...args,
          where: { key: args.where?.key },
        }),
      findFirst: <T extends Prisma.StoreFindFirstArgs>(
        args: Prisma.SelectSubset<T, Prisma.StoreFindFirstArgs>
      ) => {
        return prisma.store.findFirst({
          ...args,
          where: {
            ...args.where,
          },
        });
      },
    },
  },
});

export type ServerPluginOptions = ReturnType<typeof getPluginOptions>;
