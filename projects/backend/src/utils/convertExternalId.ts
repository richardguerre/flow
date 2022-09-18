export const convertExternalId = (source: string, id: string) => {
  return Buffer.from(`${source}${id}`).toString("base64");
};
