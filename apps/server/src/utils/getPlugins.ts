import { GraphQLError } from "graphql";
import fs from "node:fs/promises";
import path from "node:path";
import { DefineServerPluginReturn, ServerPluginReturn } from "@flowdev/plugin/server";
import { getPluginOptions } from "./getPluginOptions";

const cache = new Map<string, ServerPluginReturn>();
const pathToPlugins = path.join(__dirname, process.env.PATH_TO_PLUGINS ?? "../../plugins");
const pathToTemp = path.join(pathToPlugins, "__temp.js"); // this __temp.js is used to get the plugin's slug. see installServerPlugin below.

export const getPlugins = async (): Promise<Record<string, ServerPluginReturn>> => {
  const plugins = (await fs.readdir(pathToPlugins))
    .filter((p) => p.endsWith(".js") && p !== "__temp.js")
    .map((p) => p.replace(".js", ""));
  const unCachedPlugins = plugins.filter((plugin) => !cache.has(plugin));
  if (unCachedPlugins.length === 0) {
    return Object.fromEntries(cache);
  }
  for (const pluginSlug of unCachedPlugins) {
    const { plugin } = require(path.join(pathToPlugins, pluginSlug)) as DefineServerPluginReturn;
    cache.set(pluginSlug, plugin(getPluginOptions(pluginSlug)));
  }
  return Object.fromEntries(cache);
};

type Options = {
  /**
   * url to the plugin folder containing the server.js file (not the server file itself).
   *
   * `/server.js` will be appended to the given `url`.
   */
  url: string;
  /** Installed plugins' slugs in the db. */
  installedPluginSlugs: string[];
  /** Whether to override the existing installation of a plugin with the same slug. */
  override?: boolean;
};

/**
 * Install a plugin on the server's file system and return the plugin's slug. This does not update the db.
 *
 * Used when installating and updating a plugin.
 */
export async function installServerPlugin(opts: Options) {
  const res = await fetch(`${opts.url}/server.js`);
  const text = await res.text();
  if (text.startsWith("Couldn't find the requested file")) {
    throw new GraphQLError(`Couldn't find the plugin at "${opts.url}/server.js"`);
  }
  await fs.writeFile(pathToTemp, text); // we can keep overwriting this file because we only need it to get the plugin's slug.
  const exported = require(pathToTemp) as DefineServerPluginReturn | undefined;
  if (typeof exported !== "object" || Object.keys(exported).length === 0) {
    throw new GraphQLError(`Couldn't find any exports at "${opts.url}/server.js"`);
  } else if (typeof exported.plugin !== "function") {
    throw new GraphQLError(
      `The exports of "${opts.url}/server.js" must have a \`plugin\` property which is a function. Please use \`definePlugin\` from \`@flowdev/plugin/server\`.`
    );
  } else if (typeof exported.slug !== "string") {
    throw new GraphQLError(
      `The exports of "${opts.url}/server.js" must have a \`slug\` property which is a string. Please use \`definePlugin\` from \`@flowdev/plugin/server\`.`
    );
  }
  if (
    !opts.override &&
    (cache.has(exported.slug) || opts.installedPluginSlugs.includes(exported.slug))
  ) {
    throw new GraphQLError(
      `PLUGIN_WITH_SAME_SLUG: A plugin with the slug "${exported.slug}" is already installed. Use the \`override\` option to override the existing plugin.`
    );
  }
  await fs.rename(pathToTemp, path.join(pathToPlugins, `${exported.slug}.js`));
  const plugin = exported.plugin(getPluginOptions(exported.slug));
  cache.set(exported.slug, plugin);

  await plugin.onInstall?.();

  return exported.slug;
}

/** Uninstall a plugin on the server's file system. */
export async function uninstallServerPlugin(slug: string) {
  await fs.unlink(path.join(pathToPlugins, `${slug}.js`));
  cache.delete(slug);
}
