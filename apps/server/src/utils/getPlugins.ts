import fs from "node:fs/promises";
import path from "node:path";

const cache = new Map<string, any>();
const pathToPlugins = path.join(__dirname, "../../plugins");

export const getPlugins = async () => {
  const plugins = (await fs.readdir(pathToPlugins))
    .filter((p) => p.endsWith(".js"))
    .map((p) => p.replace(".js", ""));
  if (plugins.length === cache.size && plugins.every((plugin) => cache.has(plugin))) {
    return Object.fromEntries(cache);
  }
  for (const pluginSlug of plugins) {
    const plugin = require(path.join(pathToPlugins, pluginSlug));
    cache.set(pluginSlug, plugin.default);
  }
  return Object.fromEntries(cache);
};

type Options = {
  pluginSlug: string;
  /**
   * url to the plugin folder containing the server.js file (not the server file itself).
   *
   * `/server.js` will be appended to the given `url`.
   */
  url: string;
};

export const installServerPlugin = async (opts: Options) => {
  const res = await fetch(`${opts.url}/server.js`);
  const text = await res.text();
  await fs.writeFile(path.join(pathToPlugins, `${opts.pluginSlug}.js`), text);
  const plugin = require(path.join(pathToPlugins, opts.pluginSlug));
  cache.set(opts.pluginSlug, plugin);
};
