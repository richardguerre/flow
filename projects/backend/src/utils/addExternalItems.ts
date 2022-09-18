import { prisma } from "./prisma";

export const addExternalItems = async (items: ExternalItemInput[]) => {
  return await prisma.externalItem.createMany({
    skipDuplicates: true,
    data: items,
  });
};
