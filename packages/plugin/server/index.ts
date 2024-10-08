// ‼️ only import types from the @flowdev/server package, not runtime code otherwise it will be a cyclic dependency
import { type ServerPluginOptions as _ServerPluginOptions } from "@flowdev/server/src/utils/getPluginOptions";
import { type PgBossType } from "@flowdev/server/src/utils/pgBoss";
import type {
  PluginOnCreateTask,
  PluginOnUpdateTask,
  PluginOnUpdateTaskStatus,
} from "@flowdev/server/src/graphql/Task";
import { PluginOnUpdateItemStatus } from "@flowdev/server/src/graphql/Item";
import type { Elysia } from "elysia";
import { PluginOnCreateCalendarItem } from "@flowdev/server/src/utils";
import { type HelperDeclareSpec } from "@flowdev/server/src/utils/renderTemplate";
import type { PluginOnAddRoutineStepEnd } from "@flowdev/server/src/graphql/Routine";

export type * as ServerTypes from "@flowdev/server/src/exportedTypes";

export type ServerPluginOptions = _ServerPluginOptions;

export type ServerPlugin = (opts: ServerPluginOptions) => {
  /** Hook called just after installating the plugin. This is also called when updating a plugin. */
  onInstall?: () => Promise<void>;
  /** Hook called just after uninstalling the plugin. */
  onUninstall?: () => Promise<void>;
  /** Hook called after a store item belonging to the plugin was upserted. Use `opts.store` to get the value of setting in the store. */
  onStoreItemUpsert?: (key: string) => Promise<void>;
  /** Hook called before a task is created. Useful to add plugin data to the task. */
  onCreateTask?: PluginOnCreateTask;
  /** Hook called after a task is updated. */
  onUpdateTaskEnd?: PluginOnUpdateTask;
  /** Hook called before a task's status is updated. */
  onUpdateTaskStatus?: PluginOnUpdateTaskStatus;
  /** Hook called after a task's status is updated. */
  onUpdateTaskStatusEnd?: PluginOnUpdateTaskStatus;
  /** Hook called before an item's status is updated. */
  onUpdateItemStatus?: PluginOnUpdateItemStatus;
  /** Hook called when the user creates a calendar item. */
  onCreateCalendarItem?: PluginOnCreateCalendarItem;
  /** Hook called when the user refreshes the calendar items. */
  onRefreshCalendarItems?: () => Promise<void>;
  /** Hook called after the user adds a routine step to a routine. */
  onAddRoutineStepEnd?: PluginOnAddRoutineStepEnd;
  /**
   * Hook called when a request is made at `/api/plugin/:pluginSlug`.
   *
   * The `req.path` is the path after that. For example if the request is made at `/api/$pluginSlug/foo/bar`, then `req.path` will be `/foo/bar`.
   */
  onRequest?: (
    req: Parameters<Parameters<Elysia["all"]>[1]>[0],
  ) => void | null | Response | Promise<void | null | Response>;
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
  /**
   * Handlebars helpers and partials that users can use in their templates.
   */
  handlebars?: {
    /**
     * Handlebars helpers that users can use in their templates prefixed with the plugin's slug. Example: if the plugin slug is `myPlugin`, then the helper name should be `myPlugin-helperName`.
     *
     * Note:
     * - Unlike standard Handlebars, `options` is the first argument (not the last).
     * - You can only use the `this` context if the helper is defined as a `function` and not as an arrow function (i.e. not`() => {}`).
     * - You can use async/await in the helper function as this instance of Handlebars is wrapped with the `handlebars-async-helpers` package.
     * - Remember to await the `options.fn()` call if you are using the helper as a block helper, as children of your helper can also be async.
     */
    helpers?: HelperDeclareSpec;
  };
};

export type ServerPluginReturn = ReturnType<ServerPlugin>;

export const definePlugin = (plugin: ServerPlugin) => ({ plugin });

export type DefineServerPluginReturn = ReturnType<typeof definePlugin>;
