// ‼️ only import types from the @flowdev/server package, not runtime code otherwise it will be a cyclic dependency
import { type ServerPluginOptions } from "@flowdev/server/src/utils/getPluginOptions";
import type { Request, Response } from "express";

export type ServerPlugin = (options: ServerPluginOptions) => {
  /** Hook called just after installating the plugin. This is also called when updating a plugin. */
  onInstall?: () => Promise<void>;
  /**
   * Hook called when a request is made at `/api/$pluginSlug`.
   *
   * The `req.path` is the path after that. For example if the request is made at `/api/$pluginSlug/foo/bar`, then `req.path` will be `/foo/bar`.
   */
  onRequest?: (req: Request, res: Response) => Promise<any>;
};

export type ServerPluginReturn = ReturnType<ServerPlugin>;

export const definePlugin = (slug: string, plugin: ServerPlugin) => ({ slug, plugin });

export type DefineServerPluginReturn = ReturnType<typeof definePlugin>;
