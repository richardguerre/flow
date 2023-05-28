import { getPlugin } from "../getPlugin";
import { useAsyncLoader } from "../useAsyncLoader";

type PluginSettingsProps = {
  slug: string;
};

export const PluginSettings = (props: PluginSettingsProps) => {
  const [plugin, loading] = useAsyncLoader(async () => getPlugin({ pluginSlug: props.slug }));

  // TODO: show proper loading indicator
  if (loading) return <div>Loading...</div>;
  if (!plugin) return null;
  // TODO: show proper error message
  if ("_error" in plugin) return <div>Error: {plugin._error}</div>;

  const settings = Object.entries(plugin.settings ?? {});

  return (
    <div>
      {settings.length
        ? settings.map(([key, setting]) => (
            <div key={key}>
              <label htmlFor={key}>{setting.type === "number"}</label>
            </div>
          ))
        : "No settings available."}
    </div>
  );
};
