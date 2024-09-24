export const urlSafe = (str: string) => {
  return str
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .toLowerCase()
    .replace(/-+/g, "-");
};

export const verifyUrlSafe = (str: string) => {
  return str.match(/^[a-zA-Z0-9-_]+$/);
};
