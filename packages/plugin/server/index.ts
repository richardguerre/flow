// ‼️ only import types from the @flowdev/server package, not runtime code otherwise it will be a cyclic dependency
import { type ServerPluginOptions } from "@flowdev/server/src/utils/pluginOptions";

export type ServerPlugin = (options: ServerPluginOptions) => {
  slug: string;
};

export const definePlugin = (plugin: ServerPlugin) => plugin;
