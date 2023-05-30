import { Button } from "@flowdev/ui/Button";
import { getPlugin } from "../getPlugin";
import { useAsyncLoader } from "../useAsyncLoader";
import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { PluginSettings_pluginInstallation$key } from "../relay/__generated__/PluginSettings_pluginInstallation.graphql";
import { UpdatePluginButton } from "./UpdatePluginButton";
import { PluginSettingsUninstallPluginMutation } from "../relay/__generated__/PluginSettingsUninstallPluginMutation.graphql";

type PluginSettingsProps = {
  pluginInstallation: PluginSettings_pluginInstallation$key;
};

export const PluginSettings = (props: PluginSettingsProps) => {
  const pluginInstallation = useFragment(
    graphql`
      fragment PluginSettings_pluginInstallation on PluginInstallation {
        slug
        url
        ...UpdatePluginButton_pluginInstallation
      }
    `,
    props.pluginInstallation
  );
  const [uninstallPlugin, isUninstallingPlugin] =
    useMutation<PluginSettingsUninstallPluginMutation>(graphql`
      mutation PluginSettingsUninstallPluginMutation($input: MutationUninstallPluginInput!) {
        uninstallPlugin(input: $input) {
          slug
        }
      }
    `);
  const [plugin, loading] = useAsyncLoader(async () =>
    getPlugin({ pluginSlug: pluginInstallation.slug })
  );

  // TODO: show proper loading indicator
  if (loading) return <div>Loading...</div>;
  if (!plugin) return null;
  // TODO: show proper error message
  if ("_error" in plugin) return <div>Error: {plugin._error}</div>;

  const settings = Object.entries(plugin.settings ?? {});

  const handleUninstallPlugin = () => {
    uninstallPlugin({ variables: { input: { slug: pluginInstallation.slug } } });
  };

  return (
    <div>
      <Button onClick={handleUninstallPlugin} loading={isUninstallingPlugin}>
        Uninstall
      </Button>
      <UpdatePluginButton pluginInstallation={pluginInstallation} />
      <div>
        {settings.length
          ? settings.map(([key, setting]) => (
              <div key={key}>
                <label htmlFor={key}>{setting.type === "number"}</label>
              </div>
            ))
          : "No settings available."}
      </div>
    </div>
  );
};
