import { BsArrowDownCircle, BsLink45Deg, BsSearch } from "@flowdev/icons";
import { Input } from "@flowdev/ui/Input";
import { FormInput } from "@flowdev/ui/FormInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@flowdev/ui/Popover";
import { useForm } from "react-hook-form";
import {
  graphql,
  PreloadedQuery,
  useFragment,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
} from "@flowdev/relay";
import { Button } from "@flowdev/ui/Button";
import { BrowsePluginsViewInstallMutation } from "../relay/__gen__/BrowsePluginsViewInstallMutation.graphql";
import { BrowsePluginsViewInstallFromUrlMutation } from "@flowdev/web/relay/__gen__/BrowsePluginsViewInstallFromUrlMutation.graphql";
import { useState } from "react";
import { toast } from "@flowdev/ui/Toast";
import { usePlugins } from "../getPlugin";
import { BrowsePluginsViewPluginCard_plugin$key } from "@flowdev/web/relay/__gen__/BrowsePluginsViewPluginCard_plugin.graphql";
import { BrowsePluginsViewQuery } from "@flowdev/web/relay/__gen__/BrowsePluginsViewQuery.graphql";

const browsePluginsViewQuery = graphql`
  query BrowsePluginsViewQuery {
    plugins {
      edges {
        node {
          slug
          ...BrowsePluginsViewPluginCard_plugin
        }
      }
    }
  }
`;

export default () => {
  const { queryRef } = useQueryLoader<BrowsePluginsViewQuery>(
    browsePluginsViewQuery,
    {},
    { fetchPolicy: "store-and-network" },
  );
  if (!queryRef) return null;
  return <BrowsePluginsViewContent queryRef={queryRef} />;
};

const BrowsePluginsViewContent = (props: { queryRef: PreloadedQuery<BrowsePluginsViewQuery> }) => {
  const [openInstallPluginFromUrl, setOpenInstallPluginFromUrl] = useState(false);
  const data = usePreloadedQuery(browsePluginsViewQuery, props.queryRef);

  return (
    <div className="max-w-1488px mx-auto flex w-full flex-col gap-8 p-16">
      <div className="flex w-full flex-col gap-2">
        <div className="w-full text-center text-3xl font-extrabold">Browse plugins</div>
        <div className="w-full text-center text-base">Sprinkle a little magic in your day</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-background-50 flex items-center justify-between gap-3 rounded-md p-3">
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <Input disabled placeholder="Search..." leftIcon={<BsSearch />} />
            </TooltipTrigger>
            <TooltipContent side="bottom">Search is not yet implemented</TooltipContent>
          </Tooltip>
          <Popover open={openInstallPluginFromUrl} onOpenChange={setOpenInstallPluginFromUrl}>
            <PopoverTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="hover:bg-background-200 text-foreground-700 rounded p-2">
                    <BsLink45Deg />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Install a plugin from a URL</TooltipContent>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96">
              <InstallPluginFromUrlForm onClose={() => setOpenInstallPluginFromUrl(false)} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data.plugins.edges.map((edge) => (
            <PluginCard plugin={edge.node} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PluginCard = (props: { plugin: BrowsePluginsViewPluginCard_plugin$key }) => {
  const plugin = useFragment(
    graphql`
      fragment BrowsePluginsViewPluginCard_plugin on Plugin {
        iconUrl
        name
        slug
        shortDescription
        latestVersion {
          version
          installUrl
        }
        authors {
          name
          avatarUrl
        }
      }
    `,
    props.plugin,
  );

  const { plugins } = usePlugins();
  const installed = !!plugins[plugin.slug];

  const [installPlugin, installingPlugin] = useMutation<BrowsePluginsViewInstallMutation>(graphql`
    mutation BrowsePluginsViewInstallMutation($url: String!) {
      installPlugin(input: { url: $url }) {
        ...SettingsView_pluginInstallation
      }
    }
  `);

  const handleInstallPlugin = () => {
    if (!plugin.latestVersion) return;
    installPlugin({
      variables: { url: plugin.latestVersion.installUrl },
      onError: (error) => {
        toast.error(error.message);
      },
      updater: (store) => {
        const updatedInstalledPlugins = store.getPluralRootField("installPlugin");
        const root = store.getRoot();
        root.setLinkedRecords(updatedInstalledPlugins, "installedPlugins");
      },
    });
  };
  return (
    <div
      key={plugin.name}
      className="bg-background-50 min-w-xs flex flex-col gap-2 rounded p-4 shadow-md"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={plugin.iconUrl} className="h-5 w-5 rounded-1" />
            <div className="text-base font-medium">{plugin.name}</div>
          </div>
          <Button
            secondary
            loading={installingPlugin}
            disabled={installed || !plugin.latestVersion}
            onClick={handleInstallPlugin}
          >
            {installed ? "Installed" : "Install"}
          </Button>
        </div>
        <div className="text-foreground-700 text-sm">{plugin.shortDescription}</div>
      </div>
      <div className="text-foreground-700 flex items-center gap-4 text-sm">
        <div className="flex gap-2">v{plugin.latestVersion?.version ?? "0.0.0"}</div>
      </div>
      <div className="text-foreground-900 flex items-center gap-2 text-sm">
        {plugin.authors[0].avatarUrl && (
          <img
            src={plugin.authors[0].avatarUrl}
            className="ring-primary-200 inline-block h-5 w-5 rounded-full ring-1"
          />
        )}
        {plugin.authors[0].name}
        {plugin.authors.length > 1 && ` & ${plugin.authors.length - 1} more`}
      </div>
    </div>
  );
};

type FormValues = {
  url: string;
};

const InstallPluginFromUrlForm = (props: { onClose: () => void }) => {
  const { register, formState, handleSubmit, setError } = useForm<FormValues>();
  const [installPlugin, installingPlugin] = useMutation<BrowsePluginsViewInstallFromUrlMutation>(
    graphql`
      mutation BrowsePluginsViewInstallFromUrlMutation($url: String!) {
        installPlugin(input: { url: $url, override: true }) {
          ...SettingsView_pluginInstallation
        }
      }
    `,
  );

  const onSubmit = (values: FormValues) => {
    installPlugin({
      variables: values,
      updater: (store) => {
        const updatedInstalledPlugins = store.getPluralRootField("installPlugin");
        const root = store.getRoot();
        root.setLinkedRecords(updatedInstalledPlugins, "installedPlugins");
      },
      onCompleted: (_data) => {
        toast.success("Plugin installed");
        props.onClose();
      },
      onError: (error) => setError("url", { message: error.message }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 break-all">
      <FormInput
        {...register("url", { required: "A URL is required" })}
        placeholder="https://cdn.jsdelivr.net/npm/package@version/dist"
        error={formState.errors.url}
        fullWidth
      />
      <div className="flex-grow-0">
        <Button loading={installingPlugin} className="py-2.5">
          <BsArrowDownCircle size="16px" />
        </Button>
      </div>
    </form>
  );
};
