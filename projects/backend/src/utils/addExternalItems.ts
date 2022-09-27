import { prisma } from "./prisma";

export const addExternalItems = async (source: string, items: ExternalItemInput[]) => {
  return await prisma.externalItem.createMany({
    skipDuplicates: true,
    data: items.map((item) => ({ ...item, id: convertExternalId(source, item.id), source })),
  });
};

export const convertExternalId = (source: string, id: string) => {
  return `${source}:${id}`;
};
