export * as web from "./web";
export * as server from "./server";

export type PluginJson = {
  slug: string;
  version: string;
  server?: true;
  web?: true;
};
