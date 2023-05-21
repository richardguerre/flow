// ‼️ only import types from the @flowdev/server package, not runtime code otherwise it will be a cyclic dependency
import { type ServerPluginOptions } from "@flowdev/server/src/utils/getPluginOptions";
import { Request, Response } from "express";

export type ServerPlugin = (options: ServerPluginOptions) => {
  onRequest?: (req: Request, res: Response) => void;
};

export type ServerPluginReturn = ReturnType<ServerPlugin>;

export const definePlugin = (slug: string, plugin: ServerPlugin) => ({ slug, plugin });

export type DefineServerPluginReturn = ReturnType<typeof definePlugin>;
