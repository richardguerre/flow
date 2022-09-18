import { prisma } from "./prisma";

export const addExternalItems = async (source: string, items: ExternalItemInput[]) => {
  return await prisma.externalItem.createMany({
    skipDuplicates: true,
    data: items.map((item) => ({ ...item, source })),
  });
};
