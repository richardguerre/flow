import { Prisma } from ".prisma/client";
import { dayjs } from "./dayjs";
import { prisma } from "./prisma";
import { pgBoss } from "./pgBoss";
import { nearestTailwindColor } from "@flowdev/nearest-color";
import type { Color, Store } from "@prisma/client";
import { env } from "../env";
import { GraphQLError } from "graphql";
import { renderTemplate, Handlebars } from "./renderTemplate";
import { getUsersTimezone } from "./index";
import htmlParser from "node-html-parser";
import { decodeGlobalId, encodeGlobalId, htmlEscape, htmlUnescape } from "@flowdev/common";
import htmlToSlack from "html-to-slack";
import { getPlugins } from "./getPlugins";
import PgBoss from "pg-boss";

type PrismaJsonInput = string | number | boolean | Prisma.JsonObject | Prisma.JsonArray;

export const getPluginOptions = (pluginSlug: string) => {
  const pgBossSend: typeof pgBoss.send = (...args: unknown[]) => {
    if (typeof args[2] === "object" && args[2] !== null) {
      const name = `${pluginSlug}-${args[0]}`;
      return pgBoss.send(name, args[1] as object, args[2]);
    } else if (typeof args[0] === "string") {
      const name = `${pluginSlug}-${args[0]}`;
      return pgBoss.send(name, args[1] as object);
    }
    const request = args[0] as PgBoss.Request;
    return pgBoss.send({ ...request, name: `${pluginSlug}-${request.name}` });
  };
  const pgBossSchedule: typeof pgBoss.schedule = ($name, ...args) => {
    const name = `${pluginSlug}-${$name}`;
    return pgBoss.schedule(name, ...args);
  };
  const pgBossUnschedule: typeof pgBoss.unschedule = ($name) => {
    const name = `${pluginSlug}-${$name}`;
    return pgBoss.unschedule(name);
  };

  return {
    /** The plugin's slug. There is no difference with the one passed into `definePlugin`. It can be used to not repeat it throughout the plugin's code. */
    pluginSlug,
    /** The server's origin without the slash at the end. For example, `https://user.isflow.in` or `http://localhost:4000` if testing locally. */
    serverOrigin: env.ORIGIN,
    /**
     * The dayjs package. This prevents the dayjs package from being bundled with the plugin, so that installs are faster.
     * It has some dayjs extensions already loaded:
     * - customParseFormat
     * - utc
     */
    dayjs,
    pgBoss: {
      /** Documentation: https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#send */
      send: pgBossSend,
      /** Documentation: https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#schedulename-cron-data-options */
      schedule: pgBossSchedule,
      /** Documentation: https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#unschedulename */
      unschedule: pgBossUnschedule,
      /** Documentation: https://github.com/timgit/pg-boss/blob/HEAD/docs/readme.md#cancel */
      cancel: pgBoss.cancel,
    },
    /**
     * Prisma client for non-sensitive tables.
     *
     * Sensitve tables, like the Store table, are not exposed directly to plugins. For the Store table, use the `opts.store` object instead.
     */
    prisma: {
      day: {
        findUnique: prisma.day.findUnique,
        findUniqueOrThrow: prisma.day.findUniqueOrThrow,
        findFirst: prisma.day.findFirst,
        findFirstOrThrow: prisma.day.findFirstOrThrow,
        findMany: prisma.day.findMany,
        count: prisma.day.count,
        aggregate: prisma.day.aggregate,
        groupBy: prisma.day.groupBy,
      },
      note: prisma.note,
      noteTag: prisma.noteTag,
      task: prisma.task,
      taskPluginData: prisma.taskPluginData,
      taskTag: prisma.taskTag,
      item: prisma.item,
      itemPluginData: prisma.itemPluginData,
      list: prisma.list,
      routine: prisma.routine,
      routineStep: prisma.routineStep,
      template: prisma.template,
      shortcut: prisma.shortcut,
    },
    /**
     * A key-value store plugins can use to store data, user preferences, settings, configurations, etc.
     *
     * If store item needs to be secret (e.g. API keys) use `setSecret`, if not use `setItem`.
     */
    store: {
      /**
       * Set an item in the store that can be seen by other plugins. If the item already exists, it will be overwritten.
       *
       * If the item is secret and should not be seen by other plugins, use `setSecretItem` instead. If the item is server-only but cna still be seen by other plugins in the server, use `setServerOnlyItem` instead.
       * @example
       * ```ts
       * await store.setItem("myKey", "myValue");
       * ```
       */
      setItem: async <T extends PrismaJsonInput>(key: string, value: T) => {
        if (typeof value === "symbol" || typeof value === "function") {
          throw new Error("Cannot store symbols or functions in the store.");
        }
        const result = await prisma.store.upsert({
          where: { pluginSlug_key_unique: { pluginSlug, key } },
          update: { value },
          create: { pluginSlug, key, value },
        });
        return result as Omit<Store, "value"> & { value: T };
      },
      /**
       * Set a secret item in the store. If the item already exists, it will be overwritten.
       *
       * If the item is not secret, use `setItem` instead. If the item is server-only, use `setServerOnlyItem` instead.
       * @example
       * ```ts
       * await store.setSecretItem("mySecretKey", "mySecretValue");
       * ```
       */
      setSecretItem: async <T extends PrismaJsonInput>(key: string, value: T) => {
        if (typeof value === "symbol" || typeof value === "function") {
          throw new Error("Cannot store symbols or functions in the store.");
        }
        const result = await prisma.store.upsert({
          where: { pluginSlug_key_unique: { pluginSlug, key } },
          update: { value },
          create: { pluginSlug, key, value, isSecret: true, isServerOnly: true },
        });
        return result as Omit<Store, "value"> & { value: T };
      },
      /**
       * Set a server-only item in the store. If the item already exists, it will be overwritten.
       *
       * If the item is not server-only, use `setItem` instead. If the item is secret, use `setSecretItem` instead.
       * @example
       * ```ts
       * await store.setServerOnlyItem("myKey", "myServerOnlyValue");
       * ```
       */
      setServerOnlyItem: async <T extends PrismaJsonInput>(key: string, value: PrismaJsonInput) => {
        if (typeof value === "symbol" || typeof value === "function") {
          throw new Error("Cannot store symbols or functions in the store.");
        }
        const result = await prisma.store.upsert({
          where: { pluginSlug_key_unique: { pluginSlug, key } },
          update: { value },
          create: { pluginSlug, key, value, isServerOnly: true },
        });
        return result as Omit<Store, "value"> & { value: T };
      },
      /**
       * Delete any item from the store that was created by the plugin (secret or not, server-only or not).
       *
       * It will not delete items created by other plugins.
       * @example
       * ```ts
       * await store.deleteItem("myKey");
       * ```
       */
      deleteItem: async <T = any>(key: string) => {
        const result = await prisma.store.delete({
          where: { pluginSlug_key_unique: { pluginSlug, key } },
        });
        return result as Omit<Store, "value"> & { value: T };
      },
      /**
       * Get any item from the store that was created by the plugin (including secret ones).
       *
       * It will not get items created by other plugins. If you want to get items created by other plugins that are not secret, use `getItem` instead.
       *
       * If the item does not exist, `undefined` will be returned.
       * @example
       * ```ts
       * await store.getPluginItem("myKey");
       * ```
       */
      getPluginItem: async <T = any>(key: string) => {
        const result = await prisma.store.findFirst({
          where: { key, pluginSlug },
        });
        return result as (Omit<Store, "value"> & { value: T }) | null;
      },
      /**
       * Get any item from the store that is not secret. It will get items created by other plugins. If you want to get secret items created by the plugin, use `getPluginItem` instead.
       *
       * You can specify the plugin slug if the key is not unique across plugins and you're targetting a specific one (i.e. it's a generic key like `theme`).
       *
       * Flow store items do not have a plugin slug, so you can omit it when getting Flow store items, like settings and user preferences.
       *
       * If the item does not exist, `undefined` will be returned.
       * @example
       * ```ts
       * await store.getItem("myKey");
       * ```
       * @example
       * ```ts
       * await store.getItem("myKey", { pluginSlug: "somePluginSlug" }); // pluginSlug is optional, and can be of another plugin.
       * ```
       */
      getItem: async <T = any>(key: string, opts?: { pluginSlug?: string }) => {
        const result = await prisma.store.findFirst({
          where: { key, pluginSlug: opts?.pluginSlug, isSecret: false },
        });
        return result as (Omit<Store, "value"> & { value: T }) | null;
      },
    },
    /**
     * Get the user's timezone.
     * @returns [dayjs timezone string](https://day.js.org/docs/en/plugin/timezone)
     * @example "America/New_York"
     */
    getUsersTimezone,
    /** Get the installed plugins (slug only). */
    getInstalledPlugins: async () => {
      const plugins = await getPlugins();
      return Object.keys(plugins).map((slug) => ({ slug }));
    },
    /** Get the nearest valid Item.color to the specified Hex. */
    getNearestItemColor: (hex: string) => nearestTailwindColor(hex) as Color,
    /**
     * The GraphQLError constructor so you don't have to install the `graphql` package.
     *
     * Recommended to use this instead of throwing errors directly, so that the error is formatted correctly.
     * @example
     * ```ts
     * throw new opts.GraphQLError("Not authenticated", {
     *  extensions: {
     *    code: "NOT_AUTHENTICATED" // if present, the frontend will display this code for users to report errors
     *    userFriendlyMessage: "You need to authenticate first." // if present, the frontend will display this instead of the error message
     *  }
     * })
     * ```
     */
    GraphQLError,
    /**
     * Render handlebars templates with Flow's default context. All plugin helpers and partials have already been registered.
     *
     * To register helpers and partials, your server plugin should return the `handlebars` object from `definePlugin`.
     *
     * You can override the default data by passing it in the second argument. For example, if you want to override the `todaysTasks` key, you can pass in `{ todaysTasks: [...yourTasks] }`.
     */
    renderTemplate,
    /** Instance of Handlebars wrapped with the `handlebars-async-helpers` package. */
    Handlebars: { SafeString: Handlebars.SafeString },
    html: {
      // TODO replace with htmlparser2 so there is only 1 html parser (html-to-slack also uses it)
      /** Parse HTML to a DOM tree. */
      parse: htmlParser.parse,
      toSlack: htmlToSlack,
      escape: htmlEscape,
      unescape: htmlUnescape,
    },
    /** Decode a (GraphQL Relay) global ID. */
    decodeGlobalId,
    /** Encode a (GraphQL Relay) global ID. */
    encodeGlobalId,
  };
};

export type ServerPluginOptions = ReturnType<typeof getPluginOptions>;
