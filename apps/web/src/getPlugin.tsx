import { WebPlugin } from "@flowdev/plugin-utils/web";
import { graphql } from "@flowdev/relay";
import { fetchQuery } from "@flowdev/relay";
import { getPluginsQuery } from "@flowdev/web/relay/__generated__/getPluginsQuery.graphql";
import { environment } from "@flowdev/web/relay/environment";

type Input = {
  pluginSlug: string;
};

export const getPlugin = async (input: Input) => {
  try {
    const plugins = await getInstalledPlugins();

    const pluginInstallation = plugins[input.pluginSlug];

    if (!pluginInstallation) {
      return {
        _error: "PLUGIN_NOT_INSTALLED",
      };
    }

    const plugin = (await import(`${pluginInstallation.url}/web.js`)).default as WebPlugin;
    return plugin({ components: { Button: () => <button>Plugin Button</button> } });
  } catch (e) {
    console.log(e);
    return {
      _error: "PLUGIN_LOAD_ERROR",
    };
  }
};

const getInstalledPlugins = async () => {
  const pluginsQuery = await fetchQuery<getPluginsQuery>(
    environment,
    graphql`
      query getPluginsQuery {
        getInstalledPlugins {
          slug
          url
        }
      }
    `,
    {},
    { fetchPolicy: "store-or-network" }
  ).toPromise();

  const plugins = pluginsQuery?.getInstalledPlugins ?? [];

  return Object.fromEntries(plugins.map((plugin) => [plugin.slug, plugin]));
};
