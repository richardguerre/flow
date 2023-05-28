import { PreloadedQuery, graphql, usePreloadedQuery, useQueryLoader } from "@flowdev/relay";
import { getPlugin } from "@flowdev/web/getPlugin";
import { SettingsViewQuery } from "../relay/__generated__/SettingsViewQuery.graphql";
import { useState } from "react";
import { useAsyncLoader } from "../useAsyncLoader";
import { Button } from "@flowdev/ui/Button";
import { PluginSettings } from "../components/PluginSettings";
import { FlowSettings } from "../components/FlowSettings";

const settingsViewQuery = graphql`
  query SettingsViewQuery {
    ...FlowSettings_data
    installedPlugins {
      slug
      ...PluginSettings_pluginInstallation
    }
  }
`;

export default () => {
  const { queryRef } = useQueryLoader<SettingsViewQuery>(
    settingsViewQuery,
    {},
    { fetchPolicy: "store-and-network" }
  );
  if (!queryRef) return null;
  return <SettingsViewContent queryRef={queryRef} />;
};

type SettingsViewProps = {
  queryRef: PreloadedQuery<SettingsViewQuery>;
};

const SettingsViewContent = (props: SettingsViewProps) => {
  const data = usePreloadedQuery(settingsViewQuery, props.queryRef);
  const [
    /** If selectedTab is null, then it defaults to the flow settings tab. */
    selectedPlugin,
    setSelectedPlugin,
  ] = useState<SettingsViewQuery["response"]["installedPlugins"][number] | null>(null);

  return (
    <div className="flex">
      <div className="flex flex-col gap-8">
        <div>
          <Button>Settings</Button>
        </div>
        <div className="flex flex-col gap-2">
          <div>Installed plugins</div>
          {data.installedPlugins.map((plugin) => (
            <SettingsViewPluginTab
              key={plugin.slug}
              slug={plugin.slug}
              onClick={() => setSelectedPlugin(plugin)}
            />
          ))}
        </div>
      </div>
      <div>
        {selectedPlugin ? (
          <PluginSettings pluginInstallation={selectedPlugin} />
        ) : (
          <FlowSettings data={data} />
        )}
      </div>
    </div>
  );
};

type SettingsViewPluginTabProps = {
  slug: string;
  onClick: () => void;
};

const SettingsViewPluginTab = (props: SettingsViewPluginTabProps) => {
  const [plugin, loading] = useAsyncLoader(async () => getPlugin({ pluginSlug: props.slug }));

  if (loading) return <div>Loading...</div>;
  if (!plugin) return null;
  if ("_error" in plugin) return <div>Error: {plugin._error}</div>;

  return <div onClick={props.onClick}>{plugin.name}</div>;
};