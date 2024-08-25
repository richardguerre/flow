import { DefineMobilePluginReturn, MobilePlugin } from "@flowdev/plugin/mobile";
import { graphql, useLazyLoadQuery } from "@flowdev/relay";
import { fetchQuery } from "@flowdev/relay";
import { getPluginsQuery } from "@flowdev/mobile-pwa/relay/__generated__/getPluginsQuery.graphql";
import { environment } from "@flowdev/mobile-pwa/relay/environment";
import { getPluginOptions } from "./getPluginOptions";
import { devImportMap } from "./plugin.dev";
import { useState } from "react";
import { useAsyncEffect } from "../useAsyncEffect";
import { getPluginsUsePluginsQuery } from "../relay/__generated__/getPluginsUsePluginsQuery.graphql";

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

    if (!pluginInstallation.hasMobileRuntime) {
      return { _error: "PLUGIN_HAS_NO_MOBILE_RUNTIME" } as const;
    }

    if (process.env.NODE_ENV === "development" && input.pluginSlug in devImportMap) {
      const imported = await (devImportMap[
        input.pluginSlug as keyof typeof devImportMap
      ] as Promise<{ default: DefineMobilePluginReturn }>);
      const { plugin } = imported?.default ?? {};
      if (plugin) {
        return plugin(getPluginOptions(input.pluginSlug));
      }
    }
    const importPromise = await import(/* @vite-ignore */ `${pluginInstallation.url}/mobile.js`);
    const { plugin } = importPromise.default as DefineMobilePluginReturn;
    return plugin(getPluginOptions(input.pluginSlug));
  } catch (e) {
    console.log(e);
    return { _error: "PLUGIN_LOAD_ERROR" } as const;
  }
};

export const getPlugins = async () => {
  const installedPlugins = await getInstalledPlugins();
  if (Object.keys(installedPlugins).length === 0) return {};
  const plugins: Record<string, ReturnType<MobilePlugin>> = {};
  for (const pluginSlug in installedPlugins) {
    const pluginInstallation = installedPlugins[pluginSlug];
    if (!pluginInstallation.hasMobileRuntime) continue;
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
          ...getPluginsUsePlugins_pluginInstallation @relay(mask: false)
        }
      }
    `,
    {},
    { fetchPolicy: "store-or-network" },
  ).toPromise();

  const plugins = pluginsQuery?.installedPlugins ?? [];

  return Object.fromEntries(plugins.map((plugin) => [plugin.slug, plugin]));
};

export type PluginsRecord = Record<string, ReturnType<MobilePlugin>>;
/**
 * @suspends This hook will suspend. Make sure to wrap the component using this hook in a `Suspense` boundary.
 */
export const usePlugins = () => {
  const [plugins, setPlugins] = useState<PluginsRecord>({});
  const [loading, setLoading] = useState(true);
  const data = useLazyLoadQuery<getPluginsUsePluginsQuery>(
    graphql`
      query getPluginsUsePluginsQuery {
        installedPlugins {
          ...getPluginsUsePlugins_pluginInstallation @relay(mask: false)
        }
      }
    `,
    {},
    { fetchPolicy: "store-or-network" },
  );

  useAsyncEffect(async () => {
    setLoading(true);
    const updatedPlugins: Record<string, ReturnType<MobilePlugin>> = { ...plugins };
    for (const pluginInstallation of data.installedPlugins) {
      if (!pluginInstallation.hasMobileRuntime) continue;
      if (pluginInstallation.slug in plugins) continue;
      const plugin = await getPlugin({ pluginSlug: pluginInstallation.slug });
      if ("_error" in plugin) {
        console.log(`Error loading plugin ${pluginInstallation.slug}: ${plugin._error}`);
        continue;
      }
      updatedPlugins[pluginInstallation.slug] = plugin;
    }
    setPlugins(updatedPlugins);
    setLoading(false);
  }, [data.installedPlugins.map((plugin) => plugin.slug).join(",")]);

  return { plugins, loading };
};

graphql`
  fragment getPluginsUsePlugins_pluginInstallation on PluginInstallation {
    slug
    url
    hasMobileRuntime
  }
`;
