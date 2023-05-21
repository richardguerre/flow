// ‼️ only import types from the @flowdev/server package, not runtime code otherwise it will be a cyclic dependency
import { type ServerPluginOptions } from "@flowdev/server/src/utils/getPluginOptions";

export type ServerPlugin = (options: ServerPluginOptions) => {};

export const definePlugin = (slug: string, plugin: ServerPlugin) => ({ slug, plugin });

export type DefineServerPluginOutput = ReturnType<typeof definePlugin>;
