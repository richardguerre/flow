export const decodeGlobalId = (globalId: string) => {
  const [typename, ...idElements] = globalId.split("_");
  const id = idElements.join("_"); // For dates, the ID is a string with colons
  if (!typename || !id) return null;
  return { typename, id };
};

export const encodeGlobalId = (typename: string, id: string | number | bigint) => {
  return `${typename}_${id}`;
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// escape characters in stringified JSON
const map = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
export const htmlEscape = (str: string) => {
  return str.replace(/[&<>"']/g, (m) => map[m as keyof typeof map] ?? m);
};
export const htmlUnescape = (str: string) => {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};
