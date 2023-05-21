import { GraphQLError } from "graphql";
import fs from "node:fs/promises";
import path from "node:path";
import { DefineServerPluginOutput } from "@flowdev/plugin/server";
import { getPluginOptions } from "./getPluginOptions";

const cache = new Map<string, any>();
const pathToPlugins = path.join(__dirname, "../../plugins");
const pathToTemp = path.join(pathToPlugins, "__temp.js"); // this __temp.js is used to get the plugin's slug. see installServerPlugin below.

export const getPlugins = async () => {
  const plugins = (await fs.readdir(pathToPlugins))
    .filter((p) => p.endsWith(".js") && p !== "__temp.js")
    .map((p) => p.replace(".js", ""));
  if (plugins.length === cache.size && plugins.every((plugin) => cache.has(plugin))) {
    return Object.fromEntries(cache);
  }
  for (const pluginSlug of plugins) {
    const { plugin } = require(path.join(pathToPlugins, pluginSlug))
      .default as DefineServerPluginOutput;
    cache.set(pluginSlug, plugin(getPluginOptions(pluginSlug)));
  }
  return Object.fromEntries(cache);
};

export const getPluginSlug = async () => {};

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

// this is a generator function so that we can cancel installing the plugin if it
// has the same slug as an already installed plugin. We can ask the user if they
// want to overwrite the existing plugin.
export async function installServerPlugin(opts: Options) {
  const res = await fetch(`${opts.url}/server.js`);
  const text = await res.text();
  if (text.startsWith("Couldn't find the requested file")) {
    throw new GraphQLError(`Couldn't find the plugin at "${opts.url}/server.js"`);
  }
  await fs.writeFile(pathToTemp, text); // we can keep overwriting this file because we only need it to get the plugin's slug.
  const defaultExport = require(pathToTemp).default as DefineServerPluginOutput | undefined;
  if (!defaultExport) {
    throw new GraphQLError(
      `Couldn't find the \`default\` export in the plugin at "${opts.url}/server.js"`
    );
  } else if (typeof defaultExport.plugin !== "function") {
    console.log(typeof defaultExport.plugin);
    throw new GraphQLError(
      `The \`default\` export in the plugin at "${opts.url}/server.js" must have a \`plugin\` property which is a function. Please use \`definePlugin\` from \`@flowdev/plugin/server\`.`
    );
  } else if (typeof defaultExport.slug !== "string") {
    throw new GraphQLError(
      `The \`default\` export in the plugin at "${opts.url}/server.js" must have a \`slug\` property. Please use \`definePlugin\` from \`@flowdev/plugin/server\`.`
    );
  }
  if (
    !opts.override &&
    (cache.has(defaultExport.slug) || opts.installedPluginSlugs.includes(defaultExport.slug))
  ) {
    throw new GraphQLError(
      `PLUGIN_WITH_SAME_SLUG: A plugin with the slug "${defaultExport.slug}" is already installed. Use the \`override\` option to override the existing plugin.`
    );
  }
  await fs.rename(pathToTemp, path.join(pathToPlugins, `${defaultExport.slug}.js`));
  cache.set(defaultExport.slug, defaultExport.plugin(getPluginOptions(defaultExport.slug)));

  return defaultExport.slug;
}
