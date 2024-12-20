import { GraphQLError } from "graphql";
import fs from "node:fs/promises";
import path from "node:path";
import { DefineServerPluginReturn, ServerPluginReturn } from "@flowdev/plugin/server";
import type { PluginJson } from "@flowdev/plugin/json";
import { getPluginOptions } from "./getPluginOptions";
import { FlowPluginSlug, StoreKeys } from "../graphql/Store";
import { PluginInstallationInStore } from "../graphql/Plugin";
import { prisma } from "./prisma";
import { env } from "../env";
import { reloadPluginPgBossWorkers } from ".";

const cache = new Map<string, ServerPluginReturn>();
const pathToPlugins = path.join(import.meta.dir, env.PATH_TO_PLUGINS ?? "../../plugins");
const pathToTemp = path.join(pathToPlugins, "__temp.js"); // this __temp.js is used to get the plugin's slug. see installServerPlugin below.

export const getPlugins = async (): Promise<Record<string, ServerPluginReturn>> => {
  const plugins = (await fs.readdir(pathToPlugins).catch(() => [])) // in case the plugins folder doesn't exist yet we just return an empty array
    .filter((p) => p.endsWith(".js") && p !== "__temp.js")
    .map((p) => p.replace(".js", ""));
  const unCachedPlugins = plugins.filter((plugin) => !cache.has(plugin));
  if (unCachedPlugins.length === 0) {
    return Object.fromEntries(cache);
  }
  for (const pluginSlug of unCachedPlugins) {
    let exported = require(path.join(pathToPlugins, pluginSlug)) as DefineServerPluginReturn;
    if ("default" in exported) {
      // in case the plugin exported other things as well as the default export, then default becomes a named export.
      exported = exported.default as DefineServerPluginReturn;
    }
    cache.set(pluginSlug, exported.plugin(getPluginOptions(pluginSlug)));
  }
  return Object.fromEntries(cache);
};

export const getPluginsInStore = async () => {
  const storeItem = await prisma.store.findFirst({
    where: {
      key: StoreKeys.INSTALLED_PLUGINS,
      isSecret: false,
      isServerOnly: false,
      pluginSlug: FlowPluginSlug,
    },
  });
  const pluginsFromStore = (storeItem?.value ?? []) as PluginInstallationInStore[];
  return pluginsFromStore;
};

type Options = {
  /**
   * url to the plugin folder containing the server.js file (not the server file itself).
   *
   * `/server.js` will be appended to the given `url`.
   */
  url: string;
  /** The plugin's slug to be fetched from the plugin.json file of the plugin. */
  slug: string;
  /** Whether to override the existing installation of a plugin with the same slug. */
  override?: boolean;
};

export const getPluginJson = async (opts: { url: string }) => {
  const res = await fetch(`${opts.url}/plugin.json`).catch((err) => {
    if (err.message === "fetch failed") {
      throw new GraphQLError(
        `Got no response. Make sure the URL is correct: "${opts.url}/plugin.json"`,
      );
    }
    throw new GraphQLError(err.message);
  });
  if (!res.ok) {
    throw new GraphQLError(`Got status code ${res.status} from "${opts.url}/plugin.json"`);
  }
  const text = await res.text();
  if (text.startsWith("Couldn't find the requested file")) {
    // error thrown by jsdelivr
    throw new GraphQLError(`Couldn't find the plugin at "${opts.url}/plugin.json"`);
  }

  try {
    return JSON.parse(text) as PluginJson;
  } catch (err) {
    throw new GraphQLError(`Couldn't parse JSON of "${opts.url}/plugin.json"`);
  }
};

/**
 * Install a plugin on the server's file system and return the plugin's slug. This does not update the db.
 *
 * Used when installating and updating a plugin.
 */
export async function installServerPlugin(opts: Options) {
  const res = await fetch(`${opts.url}/server.js`).catch((err) => {
    if (err.message === "fetch failed") {
      throw new GraphQLError(
        `Got no response. Make sure the URL is correct: "${opts.url}/server.js"`,
      );
    }
    throw new GraphQLError(err.message);
  });
  if (!res.ok) {
    throw new GraphQLError(`Got status code ${res.status} from "${opts.url}/server.js"`);
  }
  const text = await res.text();
  if (text.startsWith("Couldn't find the requested file")) {
    // error thrown by jsdelivr
    throw new GraphQLError(`Couldn't find the plugin at "${opts.url}/server.js"`);
  }

  // the following creates the plugins folder if it doesn't exist.
  try {
    await fs.readdir(pathToPlugins);
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      throw err;
    }
    await fs.mkdir(pathToPlugins, { recursive: true });
  }
  // the above creates the plugins folder if it doesn't exist.

  // check if server.js contains unsafe code (require(), eval(), etc.)
  if (
    /Bun|require(?=\(|\/\*)|eval|setTimeout|setInterval|setImmidiate|process\.|__dirname|__filename|spawnSync|spawn|write|import\.meta| ffi|transpile|transform| \$`/.test(
      text,
    )
  ) {
    throw new GraphQLError(
      `The plugin is unsafe to install as it can gain access to sensitive data. Contact the plugin author or install a different plugin.`,
    );
  }

  await Bun.write(pathToTemp, text); // we can keep overwriting this file because we only need it to get the plugin's slug.
  delete import.meta.require.cache[pathToTemp]; // make sure we get what was just written to the file and not what was cached before.
  let exported: DefineServerPluginReturn | undefined;
  try {
    exported = import.meta.require(pathToTemp) as DefineServerPluginReturn | undefined;
  } catch (e) {
    console.log(e);
    throw new GraphQLError(
      `Couldn't install the server part of the plugin. Contact the plugin author to fix this.`,
    );
  }
  if (typeof exported !== "object") {
    throw new GraphQLError(`Couldn't find any exports at "${opts.url}/server.js"`);
  }
  if ("default" in exported) {
    // in case the plugin exported other things as well as the default export, then default becomes a named export.
    exported = exported.default as DefineServerPluginReturn;
  }
  if (typeof exported.plugin !== "function") {
    throw new GraphQLError(
      `The exports of "${opts.url}/server.js" must have a \`plugin\` property which is a function. Please use \`definePlugin\` from \`@flowdev/plugin/server\`.`,
    );
  }

  if (!opts.override && cache.has(opts.slug)) {
    throw new GraphQLError(
      `A plugin with the slug "${opts.slug}" is already installed. Use the \`override\` option to override the existing plugin.`,
      {
        extensions: {
          code: "PLUGIN_WITH_SAME_SLUG",
          userFriendlyMessage:
            "There is a problem with the plugin you are trying to install (Error: PLUGIN_WITH_SAME_SLUG). Please contact the plugin author for more information.",
        },
      },
    );
  }
  await fs.rename(pathToTemp, path.join(pathToPlugins, `${opts.slug}.js`));
  const plugin = exported.plugin(getPluginOptions(opts.slug));
  cache.set(opts.slug, plugin);

  await reloadPluginPgBossWorkers({
    pluginSlug: opts.slug,
    plugins: Object.fromEntries(cache.entries()),
  });

  await plugin.onInstall?.();
}

/** Uninstall a plugin on the server's file system. */
export async function uninstallServerPlugin(slug: string) {
  await cache.get(slug)?.onUninstall?.();
  await fs.unlink(path.join(pathToPlugins, `${slug}.js`));
  cache.delete(slug);
}
