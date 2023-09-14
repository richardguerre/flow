import { DefineWebPluginReturn } from "@flowdev/plugin/web";
import { graphql } from "@flowdev/relay";
import { fetchQuery } from "@flowdev/relay";
import { getPluginsQuery } from "@flowdev/web/relay/__generated__/getPluginsQuery.graphql";
import { environment } from "@flowdev/web/relay/environment";
import { getPluginOptions } from "./getPluginOptions";

type Input = {
  pluginSlug: string;
};

export const getPlugin = async (input: Input) => {
  try {
    const plugins = await getInstalledPlugins();

    const pluginInstallation = plugins[input.pluginSlug];

    if (!pluginInstallation) {
      return { _error: "PLUGIN_NOT_INSTALLED" } as const;
    }

    // This is to make it easier to develop the flow-essentials plugin
    // TODO: Remove this when the plugin is published
    const importPromise =
      //  import.meta.env.DEV
      //   ? import("@flowdev/essentials/src/web")
      //   :
      import(/* @vite-ignore */ `${pluginInstallation.url}/web.js`);

    // TODO: use plugin's slug if needed
    const { plugin } = (await importPromise).default as DefineWebPluginReturn;
    return plugin(getPluginOptions(input.pluginSlug));
  } catch (e) {
    console.log(e);
    return { _error: "PLUGIN_LOAD_ERROR" } as const;
  }
};

const getInstalledPlugins = async () => {
  const pluginsQuery = await fetchQuery<getPluginsQuery>(
    environment,
    graphql`
      query getPluginsQuery {
        installedPlugins {
          slug
          url
        }
      }
    `,
    {},
    { fetchPolicy: "store-or-network" }
  ).toPromise();

  const plugins = pluginsQuery?.installedPlugins ?? [];

  return Object.fromEntries(plugins.map((plugin) => [plugin.slug, plugin]));
};
