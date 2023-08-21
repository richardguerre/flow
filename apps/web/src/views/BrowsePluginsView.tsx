import { BsArrowDownCircle, BsLink45Deg, BsSearch } from "@flowdev/icons";
import { Input } from "@flowdev/ui/Input";
import { FormInput } from "@flowdev/ui/FormInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@flowdev/ui/Popover";
import { useForm } from "react-hook-form";
import { graphql, useMutation } from "@flowdev/relay";
import { Button } from "@flowdev/ui/Button";
import { BrowsePluginsViewInstallFromUrlMutation } from "@flowdev/web/relay/__generated__/BrowsePluginsViewInstallFromUrlMutation.graphql";
import { useState } from "react";
import { toast } from "@flowdev/ui/Toast";

type PluginAuthor = {
  name: string;
  avatarUrl?: string;
};

type Plugin = {
  iconUrl: string;
  name: string;
  description: string;
  installUrl: string;
  version: string;
  authors: PluginAuthor[]; // first author is the primary author
};

const PLUGINS: Plugin[] = [
  {
    iconUrl: "FlowIcon.svg",
    name: "Essentials",
    description:
      "The official and default plugin for Flow containing essential features such as a morning routine and a shutdown routine.",
    installUrl: "https://cdn.jsdelivr.net/npm/@flowdev/essentials@0.1.0/out",
    version: "0.1.0",
    authors: [{ name: "Flow", avatarUrl: "FlowIcon.svg" }],
  },
  {
    iconUrl: "https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_19_2x.png",
    name: "Google Calendar",
    description: "Official Google Calendar plugin for Flow.",
    installUrl: "https://cdn.jsdelivr.net/npm/@flowdev/google-calendar@0.1.0/out",
    version: "0.1.0",
    authors: [{ name: "Flow", avatarUrl: "FlowIcon.svg" }],
  },
];

export default () => {
  const [openInstallPluginFromUrl, setOpenInstallPluginFromUrl] = useState(false);

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
          {PLUGINS.map((plugin) => (
            <div
              key={plugin.name}
              className="bg-background-50 min-w-xs flex flex-col gap-2 rounded p-4 shadow-md"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={plugin.iconUrl} className="h-5 w-5" />
                    <div className="text-base font-medium">{plugin.name}</div>
                  </div>
                  <Button secondary>Install</Button>
                </div>
                <div className="text-foreground-700 text-sm">{plugin.description}</div>
              </div>
              <div className="text-foreground-700 flex items-center gap-4 text-sm">
                <div className="flex gap-2">v{plugin.version}</div>
              </div>
              <div className="text-foreground-900 flex items-center gap-2 text-sm">
                {plugin.authors[0].avatarUrl && (
                  <img
                    src={plugin.authors[0].avatarUrl}
                    className="ring-primary-100 inline-block h-5 w-5 rounded-full ring"
                  />
                )}
                {plugin.authors[0].name}
                {plugin.authors.length > 1 && ` & ${plugin.authors.length - 1} more`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type FormValues = {
  url: string;
};

const InstallPluginFromUrlForm = (props: { onClose: () => void }) => {
  const { register, formState, handleSubmit, setError } = useForm<FormValues>();
  const [installPlugin, installingPlugin] =
    useMutation<BrowsePluginsViewInstallFromUrlMutation>(graphql`
      mutation BrowsePluginsViewInstallFromUrlMutation($url: String!) {
        installPlugin(input: { url: $url, override: true }) {
          ...SettingsView_pluginInstallation
        }
      }
    `);

  const onSubmit = (values: FormValues) => {
    installPlugin({
      variables: values,
      updater: (store) => {
        const updatedInstalledPlugins = store.getPluralRootField("installPlugin");
        const root = store.getRoot();
        root.setLinkedRecords(updatedInstalledPlugins, "installedPlugins");
      },
      onCompleted: (_data, errs) => {
        if (errs) {
          setError("url", { message: errs[0].message });
          return;
        }
        toast.success("Plugin installed");
        props.onClose();
      },
      onError: (error) => {
        setError("url", { message: error.message });
      },
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