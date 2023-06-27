import { Prisma } from ".prisma/client";
import { dayjs } from "./dayjs";
import { prisma } from "./prisma";

type PrismaJsonInput = string | number | boolean | Prisma.JsonObject | Prisma.JsonArray;

export const getPluginOptions = (pluginSlug: string) => ({
  /**
   * The dayjs package. This prevents the dayjs package from being bundled with the plugin, so that installs are faster.
   * It has some dayjs extensions already loaded:
   * - customParseFormat
   * - utc
   */
  dayjs,
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
    noteLabel: prisma.noteLabel,
    task: prisma.task,
    taskLabel: prisma.taskLabel,
    item: prisma.item,
    list: prisma.list,
    routine: prisma.routine,
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
    setItem: async (key: string, value: PrismaJsonInput) => {
      if (typeof value === "symbol" || typeof value === "function") {
        throw new Error("Cannot store symbols or functions in the store.");
      }
      return prisma.store.upsert({
        where: { pluginSlug_key_unique: { pluginSlug, key } },
        update: { value },
        create: { pluginSlug, key, value },
      });
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
    setSecretItem: async (key: string, value: PrismaJsonInput) => {
      if (typeof value === "symbol" || typeof value === "function") {
        throw new Error("Cannot store symbols or functions in the store.");
      }
      return prisma.store.upsert({
        where: { pluginSlug_key_unique: { pluginSlug, key } },
        update: { value },
        create: { pluginSlug, key, value, isSecret: true, isServerOnly: true },
      });
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
    setServerOnlyItem: async (key: string, value: PrismaJsonInput) => {
      if (typeof value === "symbol" || typeof value === "function") {
        throw new Error("Cannot store symbols or functions in the store.");
      }
      return prisma.store.upsert({
        where: { pluginSlug_key_unique: { pluginSlug, key } },
        update: { value },
        create: { pluginSlug, key, value, isServerOnly: true },
      });
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
    deleteItem: async (key: string) => {
      return prisma.store.delete({
        where: { pluginSlug_key_unique: { pluginSlug, key } },
      });
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
    getPluginItem: async (key: string) => {
      return prisma.store.findFirst({
        where: { key, pluginSlug },
      });
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
    getItem: async (key: string, opts?: { pluginSlug?: string }) => {
      return prisma.store.findFirst({
        where: { key, pluginSlug: opts?.pluginSlug, isSecret: false },
      });
    },
  },
});

export type ServerPluginOptions = ReturnType<typeof getPluginOptions>;
