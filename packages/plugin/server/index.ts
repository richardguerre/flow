// ‼️ only import types from the @flowdev/server package, not runtime code otherwise it will be a cyclic dependency
import { type ServerPluginOptions as _ServerPluginOptions } from "@flowdev/server/src/utils/getPluginOptions";
import type { Request, Response } from "express";
import type { WorkOptions, Job } from "pg-boss";

export type ServerPluginOptions = _ServerPluginOptions;

export type ServerPlugin = (options: ServerPluginOptions) => {
  /** Hook called just after installating the plugin. This is also called when updating a plugin. */
  onInstall?: () => Promise<void>;
  /** Hook called just after uninstalling the plugin. */
  onUninstall?: () => Promise<void>;
  /**
   * Hook called when a request is made at `/api/$pluginSlug`.
   *
   * The `req.path` is the path after that. For example if the request is made at `/api/$pluginSlug/foo/bar`, then `req.path` will be `/foo/bar`.
   */
  onRequest?: (req: Request, res: Response) => Promise<any>;
  /**
   * Operations that can be called from the web app through the GraphQL API. This allows the web app to call the plugin's
   * backend code and GraphQL clients like Relay to cache the results for a better user experience.
   *
   * Alternatively, you can use the `onRequest` hook to make requests to the plugin's backend code directly and manage caching yourself.
   */
  operations?: {
    [operationName: string]: (input: any) => Promise<{
      /**
       * The operationName part of the GraphQL ID to return. The returned GraphQL ID will be `PluginOperation_${pluginSlug}_${operationName}`.
       *
       * If not provided, the operationName will be the same as the key in the `operations` object.
       */
      operationName?: string;
      data: any;
    }>;
  };
  /**
   * pg-boss job handlers passed to Flow's pgBoss instance. This allows the plugin to run background jobs that have been queued by
   * with the `opts.pgBoss.send` function (or any other pg-boss ["send" function](https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#send)
   * or the [schedule function](https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#scheduling)).
   *
   * For more details read the [pg-boss documentation on the "work" function](https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#work).
   */
  pgBossWorkHandlers?: {
    /** The name of the job/queue to listen to. */
    [queueName: string]: {
      /** The function to run when a job is received. */
      fn: <T>(job: Job<T>) => Promise<void>;
      /** The pg-boss work options. */
      options?: WorkOptions;
    };
  };
};

export type ServerPluginReturn = ReturnType<ServerPlugin>;

export const definePlugin = (slug: string, plugin: ServerPlugin) => ({ slug, plugin });

export type DefineServerPluginReturn = ReturnType<typeof definePlugin>;
