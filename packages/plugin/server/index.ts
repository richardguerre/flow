// ‼️ only import types from the @flowdev/server package, not runtime code otherwise it will be a cyclic dependency
import { type ServerPluginOptions as _ServerPluginOptions } from "@flowdev/server/src/utils/getPluginOptions";
import { type PgBossType } from "@flowdev/server/src/utils/pgBoss";
import type { Request, Response } from "express";
// import type { Prisma } from "@prisma/client";

export type ServerPluginOptions = _ServerPluginOptions;

export type ServerPlugin = (opts: ServerPluginOptions) => {
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
   * Hook called before a task is created in the database:
   * - When the `createTask` mutation is called.
   * - When a task is created using the `opts.prisma.task.create` function.
   *
   * This allows the plugin to modify the task and any related data before it is created. For example, the plugin could add to the task's `pluginDatas` array.
   */
  // onCreateTask?: (input: any) => Promise<Prisma.TaskCreateInput>;
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
   * Function to handle pg-boss jobs queued by the plugin. This allows the plugin to run background jobs that have been queued
   * with the `opts.pgBoss.send` function (or any other pg-boss ["send" function](https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#send)
   * or the [schedule function](https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#scheduling)).
   *
   * For more details read the [pg-boss documentation on the "work" function](https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#work).
   *
   * @example
   * ```ts
   * {
   *   handlePgBossWork: (work) => [
   *     work('myJobName', async (job) => {...}),
   *     work('myOtherJobWithOptions', { batchSize: 5 }, async (jobs) => {...}), // adding options to the job. batchSize will turn the first param which is normally one job that needs to be processed into an array of jobs
   *     ...
   *   ]
   * }
   * ```
   *
   * Note: the `work` function is not given in the options because Flow needs to control the order in which things run, including the pg-boss work handlers.
   */
  handlePgBossWork?: (work: PgBossType["work"]) => Promise<string>[];
};

export type ServerPluginReturn = ReturnType<ServerPlugin>;

export const definePlugin = (plugin: ServerPlugin) => ({ plugin });

export type DefineServerPluginReturn = ReturnType<typeof definePlugin>;
