import { PreloadedQuery, graphql, usePreloadedQuery, useQueryLoader } from "@flowdev/relay";
import { getPlugin } from "@flowdev/web/getPlugin";
import { SettingsViewQuery } from "../relay/__generated__/SettingsViewQuery.graphql";
import { useAsyncLoader } from "../useAsyncLoader";
import { Link, Outlet } from "react-router-dom";
import { tw } from "@flowdev/ui/tw";
import { useActiveLink } from "../useActiveLink";
import { SuspenseLoadingView } from "@flowdev/ui/Loading";
import { ViewErrorBoundary } from "../components/ViewErrorBoundary";

const settingsViewQuery = graphql`
  query SettingsViewQuery {
    installedPlugins {
      ...SettingsView_pluginInstallation @relay(mask: false)
    }
  }
`;

graphql`
  fragment SettingsView_pluginInstallation on PluginInstallation {
    slug
    ...PluginSettingsView_pluginInstallation
  }
`;

export default () => {
  const { queryRef } = useQueryLoader<SettingsViewQuery>(
    settingsViewQuery,
    {},
    { fetchPolicy: "store-and-network" },
  );
  if (!queryRef) return null;
  return <SettingsViewContent queryRef={queryRef} />;
};

type SettingsViewProps = {
  queryRef: PreloadedQuery<SettingsViewQuery>;
};

const SettingsViewContent = (props: SettingsViewProps) => {
  const data = usePreloadedQuery(settingsViewQuery, props.queryRef);

  return (
    <div className="flex w-full">
      <div className="bg-background-50 w-63 z-10 flex flex-shrink-0 flex-col gap-4 p-4 shadow-xl">
        <div className="text-base font-semibold">Settings</div>
        <div className="flex flex-col gap-2">
          <SettingTab to="/settings/general">General</SettingTab>
          {/* <SettingTab to="/settings/tasks">Tasks</SettingTab> */}
          <SettingTab to="/settings/routines">Routines</SettingTab>
          <SettingTab to="/settings/browse-plugins">Browse plugins</SettingTab>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-base font-semibold">Plugin settings</div>
          {data.installedPlugins.map((plugin) => (
            <SettingsViewPluginTab key={plugin.slug} slug={plugin.slug} />
          ))}
        </div>
      </div>
      <ViewErrorBoundary>
        <SuspenseLoadingView>
          <Outlet context={data} />
        </SuspenseLoadingView>
      </ViewErrorBoundary>
    </div>
  );
};

type SettingTabProps = {
  children: string;
  to: string;
  level?: number;
};

const SettingTab = (props: SettingTabProps) => {
  const active = useActiveLink({
    to: props.to,
    level: props.level ?? 2,
  });

  return (
    <Link
      to={props.to}
      className={tw(
        "text-foreground-700 hover:bg-background-200 rounded-md bg-transparent p-2",
        active && "bg-primary-100 text-primary-600 hover:bg-primary-100",
      )}
    >
      {props.children}
    </Link>
  );
};

type SettingsViewPluginTabProps = {
  slug: string;
};

const SettingsViewPluginTab = (props: SettingsViewPluginTabProps) => {
  const [plugin, loading] = useAsyncLoader(async () => getPlugin({ pluginSlug: props.slug }));
  const to = `/settings/plugin/${props.slug}`;

  if (loading)
    return (
      <SettingTab to={to} level={3}>
        {props.slug}
      </SettingTab>
    );
  if (!plugin) return null;
  if ("_error" in plugin) {
    console.log("SettingViewPluginTab error", plugin); // to see the error
    return null;
  }

  return (
    <SettingTab to={to} level={3}>
      {plugin.name}
    </SettingTab>
  );
};
