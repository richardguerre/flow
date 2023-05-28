import { Button } from "@flowdev/ui/Button";
import { getPlugin } from "../getPlugin";
import { useAsyncLoader } from "../useAsyncLoader";
import { graphql, useMutation } from "@flowdev/relay";

type PluginSettingsProps = {
  slug: string;
};

export const PluginSettings = (props: PluginSettingsProps) => {
  const [uninstallPlugin, isUninstallingPlugin] = useMutation(graphql`
    mutation PluginSettingsUninstallPluginMutation($input: MutationUninstallPluginInput!) {
      uninstallPlugin(input: $input) {
        slug
      }
    }
  `);
  const [plugin, loading] = useAsyncLoader(async () => getPlugin({ pluginSlug: props.slug }));

  // TODO: show proper loading indicator
  if (loading) return <div>Loading...</div>;
  if (!plugin) return null;
  // TODO: show proper error message
  if ("_error" in plugin) return <div>Error: {plugin._error}</div>;

  const settings = Object.entries(plugin.settings ?? {});

  const handleUninstallPlugin = () => {
    uninstallPlugin({ variables: { input: { pluginSlug: props.slug } } });
  };

  return (
    <div>
      <Button onClick={handleUninstallPlugin} loading={isUninstallingPlugin}>
        Uninstall
      </Button>
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
