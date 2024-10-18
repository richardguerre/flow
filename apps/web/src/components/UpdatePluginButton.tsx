import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { UpdatePluginButtonUpdatePluginMutation } from "../relay/__gen__/UpdatePluginButtonUpdatePluginMutation.graphql";
import { Button } from "@flowdev/ui/Button";
import { UpdatePluginButton_pluginInstallation$key } from "../relay/__gen__/UpdatePluginButton_pluginInstallation.graphql";

type UpdatePluginButtonProps = {
  pluginInstallation: UpdatePluginButton_pluginInstallation$key;
};

export const UpdatePluginButton = (props: UpdatePluginButtonProps) => {
  const pluginInstallation = useFragment(
    graphql`
      fragment UpdatePluginButton_pluginInstallation on PluginInstallation {
        url
        version
        latestVersion {
          version
          installUrl
        }
      }
    `,
    props.pluginInstallation,
  );

  const [updatePlugin, isUpdatingPlugin] = useMutation<UpdatePluginButtonUpdatePluginMutation>(
    graphql`
      mutation UpdatePluginButtonUpdatePluginMutation($input: MutationInstallPluginInput!) {
        installPlugin(input: $input) {
          url
        }
      }
    `,
  );

  const currentVersion = pluginInstallation.version;
  const latestVersion = pluginInstallation.latestVersion;

  const handleUpdate = () => {
    if (!latestVersion || !currentVersion) return; // not possible since we don't show the button if versions.latestVersion is falsey, just making the types happy
    updatePlugin({ variables: { input: { url: latestVersion.installUrl, override: true } } });
  };

  if (!latestVersion || !currentVersion) return null;
  if (latestVersion.version === currentVersion) return null;

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => handleUpdate()} loading={isUpdatingPlugin}>
        Update to {latestVersion.version}
      </Button>
      <span>Current version: {currentVersion}</span>
    </div>
  );
};
