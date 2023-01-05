import { prisma } from "./prisma";

export const addItems = async (pluginSlug: string, items: ExternalItemInput[]) => {
  return await prisma.item.createMany({
    skipDuplicates: true,
    data: items.map((item) => ({ ...item, id: undefined, pluginSlug })),
  });
};

export const convertExternalId = (source: string, id: string) => {
  return `${source}_${id}`;
};
