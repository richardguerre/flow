export const decodeGlobalId = (globalId: string) => {
  const [typename, ...idElements] = globalId.split("_");
  const id = idElements.join("_"); // For dates, the ID is a string with colons
  if (!typename || !id) return null;
  return { typename, id };
};

export const encodeGlobalId = (typename: string, id: string | number | bigint) => {
  return `${typename}_${id}`;
};
