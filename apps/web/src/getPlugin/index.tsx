import { DefineWebPluginReturn, WebPlugin } from "@flowdev/plugin/web";
import { graphql } from "@flowdev/relay";
import { fetchQuery } from "@flowdev/relay";
import { getPluginsQuery } from "@flowdev/web/relay/__generated__/getPluginsQuery.graphql";
import { environment } from "@flowdev/web/relay/environment";
import { getPluginOptions } from "./getPluginOptions";
import { devImportMap } from "./plugin.dev";

type Input = {
  pluginSlug: string;
  installedPlugins?: Awaited<ReturnType<typeof getInstalledPlugins>>;
};

export const getPlugin = async (input: Input) => {
  try {
    const plugins = input.installedPlugins ?? (await getInstalledPlugins());

    const pluginInstallation = plugins[input.pluginSlug];

    if (!pluginInstallation) {
      return { _error: "PLUGIN_NOT_INSTALLED" } as const;
    }

    if (!pluginInstallation.hasWebRuntime) {
      return { _error: "PLUGIN_HAS_NO_WEB_RUNTIME" } as const;
    }

    if (process.env.NODE_ENV === "development" && input.pluginSlug in devImportMap) {
      const imported = await (devImportMap[
        input.pluginSlug as keyof typeof devImportMap
      ] as Promise<{ default: DefineWebPluginReturn }>);
      const { plugin } = imported?.default ?? {};
      if (plugin) {
        return plugin(getPluginOptions(input.pluginSlug));
      }
    }
    const importPromise = await import(/* @vite-ignore */ `${pluginInstallation.url}/web.js`);
    const { plugin } = importPromise.default as DefineWebPluginReturn;
    return plugin(getPluginOptions(input.pluginSlug));
  } catch (e) {
    console.log(e);
    return { _error: "PLUGIN_LOAD_ERROR" } as const;
  }
};

export const getPlugins = async () => {
  const installedPlugins = await getInstalledPlugins();
  const plugins: Record<string, ReturnType<WebPlugin>> = {};
  for (const pluginSlug in installedPlugins) {
    const pluginInstallation = installedPlugins[pluginSlug];
    if (!pluginInstallation.hasWebRuntime) continue;
    const plugin = await getPlugin({ pluginSlug, installedPlugins });
    if ("_error" in plugin) {
      console.log(`Plugin ${pluginSlug} failed to load: ${plugin._error}`);
      continue;
    }
    plugins[pluginSlug] = plugin;
  }
  return plugins;
};

const getInstalledPlugins = async () => {
  const pluginsQuery = await fetchQuery<getPluginsQuery>(
    environment,
    graphql`
      query getPluginsQuery {
        installedPlugins {
          slug
          url
          hasWebRuntime
        }
      }
    `,
    {},
    { fetchPolicy: "store-or-network" }
  ).toPromise();

  const plugins = pluginsQuery?.installedPlugins ?? [];

  return Object.fromEntries(plugins.map((plugin) => [plugin.slug, plugin]));
};
