import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { UpdatePluginButtonUpdatePluginMutation } from "../relay/__gen__/UpdatePluginButtonUpdatePluginMutation.graphql";
import { Button } from "@flowdev/ui/Button";
import { useAsyncLoader } from "../useAsyncLoader";
import { UpdatePluginButton_pluginInstallation$key } from "../relay/__gen__/UpdatePluginButton_pluginInstallation.graphql";

type UpdatePluginButtonProps = {
  pluginInstallation: UpdatePluginButton_pluginInstallation$key;
};

type Metadata = {
  type: string;
  name: string;
  version: string | null;
  links: {
    self: string;
    entrypoints: string;
    stats: string;
  };
};

export const UpdatePluginButton = (props: UpdatePluginButtonProps) => {
  const pluginInstallation = useFragment(
    graphql`
      fragment UpdatePluginButton_pluginInstallation on PluginInstallation {
        url
      }
    `,
    props.pluginInstallation,
  );
  const [versions, loading] = useAsyncLoader(async () => {
    if (pluginInstallation.url.startsWith("https://cdn.jsdelivr.net/gh/")) {
      // Get plugin metadata from GitHub
      const [, owner, repo, version] = pluginInstallation.url.match(
        /https:\/\/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^/@]+)@([^/]+)/,
      )!;
      const res = await fetch(`https://data.jsdelivr.com/v1/packages/gh/${owner}/${repo}/resolved`);
      const metadata = (await res.json()) as Metadata;
      return {
        currentVersion: version,
        latestVersion: metadata.version,
      };
    } else if (pluginInstallation.url.startsWith("https://cdn.jsdelivr.net/npm/")) {
      // Get plugin metadata from npm
      const [, name, version] = pluginInstallation.url.match(
        /https:\/\/cdn\.jsdelivr\.net\/npm\/([^/@]+)@([^/]+)/,
      )!;
      const res = await fetch(`https://data.jsdelivr.com/v1/packages/npm/${name}/resolved`);
      const metadata = (await res.json()) as Metadata;
      return {
        currentVersion: version,
        latestVersion: metadata.version,
      };
    }
    return { currentVersion: null, latestVersion: null };
  });

  const [updatePlugin, isUpdatingPlugin] = useMutation<UpdatePluginButtonUpdatePluginMutation>(
    graphql`
      mutation UpdatePluginButtonUpdatePluginMutation($input: MutationInstallPluginInput!) {
        installPlugin(input: $input) {
          url
        }
      }
    `,
  );

  const handleUpdate = (newUrl = pluginInstallation.url) => {
    if (!versions?.latestVersion || !versions.currentVersion) return; // not possible since we don't show the button if versions.latestVersion is falsey, just making the types happy
    newUrl = pluginInstallation.url.replace(versions.currentVersion, versions.latestVersion);
    updatePlugin({ variables: { input: { url: newUrl, override: true } } });
  };

  if (loading) return <div>Loading...</div>;
  if (!versions?.latestVersion || !versions.currentVersion) return null;

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => handleUpdate()} loading={isUpdatingPlugin}>
        Update to {versions.latestVersion}
      </Button>
      <span>Current version: {versions.currentVersion}</span>
    </div>
  );
};
