import { WebPlugin } from "@flowdev/plugin/web";
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
    return plugin({
      components: { Button: ({ onClick }) => <button onClick={onClick}>Plugin Button</button> },
    });
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
