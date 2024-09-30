import { BsArrowDownCircle, BsLink45Deg, BsSearch } from "@flowdev/icons";
import { Input } from "@flowdev/ui/Input";
import { FormInput } from "@flowdev/ui/FormInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@flowdev/ui/Popover";
import { useForm } from "react-hook-form";
import { graphql, useMutation } from "@flowdev/relay";
import { Button } from "@flowdev/ui/Button";
import { BrowsePluginsViewInstallMutation } from "../relay/__gen__/BrowsePluginsViewInstallMutation.graphql";
import { BrowsePluginsViewInstallFromUrlMutation } from "@flowdev/web/relay/__gen__/BrowsePluginsViewInstallFromUrlMutation.graphql";
import { useState } from "react";
import { toast } from "@flowdev/ui/Toast";
import { usePlugins } from "../getPlugin";

type PluginAuthor = {
  name: string;
  avatarUrl?: string;
};

type Plugin = {
  iconUrl: string;
  name: string;
  slug: string;
  description: string;
  installUrl: string;
  version: string;
  authors: PluginAuthor[]; // first author is the primary author
};

const PLUGINS: Plugin[] = [
  {
    iconUrl: "FlowIcon.svg",
    name: "Essentials",
    slug: "essentials",
    description:
      "The official and default plugin for Flow containing essential features such as a morning routine and a shutdown routine.",
    installUrl: "https://cdn.jsdelivr.net/gh/richardguerre/flow@c1dc94b/plugins/essentials/out",
    version: "0.1.0",
    authors: [{ name: "Flow", avatarUrl: "FlowIcon.svg" }],
  },
  {
    iconUrl: "FlowIcon.svg",
    name: "Repeating Tasks",
    slug: "repeating-tasks",
    description:
      "Official Flow plugin that allows creating repeating tasks. It's like a cron job for your tasks.",
    installUrl:
      "https://cdn.jsdelivr.net/gh/richardguerre/flow@c1dc94b/plugins/repeating-tasks/out",
    version: "0.1.0",
    authors: [{ name: "Flow", avatarUrl: "FlowIcon.svg" }],
  },
  {
    iconUrl: "https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_19_2x.png",
    name: "Google Calendar",
    slug: "google-calendar",
    description: "Official Google Calendar plugin for Flow.",
    installUrl:
      "https://cdn.jsdelivr.net/gh/richardguerre/flow@989a9e8/plugins/google-calendar/out",
    version: "0.1.0",
    authors: [{ name: "Flow", avatarUrl: "FlowIcon.svg" }],
  },
  {
    iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    name: "GitHub Requested Reviews",
    slug: "github",
    description:
      "Official GitHub plugin for Flow. It currently only gets your requested reviews and adds them as items in your inbox. More features coming soon.",
    installUrl: "https://cdn.jsdelivr.net/gh/richardguerre/flow@c1dc94b/plugins/github/out",
    version: "0.1.0",
    authors: [{ name: "Flow", avatarUrl: "FlowIcon.svg" }],
  },
  {
    iconUrl: "https://gitstart.com/_astro/logo_black_small.e7d67670.svg",
    name: "GitStart",
    slug: "gitstart",
    description: "Official GitStart plugin for Flow.",
    installUrl: "https://cdn.jsdelivr.net/gh/richardguerre/flow@c1dc94b/plugins/gitstart/out",
    version: "0.1.0",
    authors: [{ name: "Flow", avatarUrl: "FlowIcon.svg" }],
  },
  {
    iconUrl: "https://linear.app/favicon.ico",
    name: "Linear",
    slug: "linear",
    description:
      "Official Linear plugin for Flow, allowing you to manage your Linear issues directly from Flow.",
    installUrl: "https://cdn.jsdelivr.net/gh/richardguerre/flow@c1dc94b/plugins/linear/out",
    version: "0.1.0",
    authors: [{ name: "Flow", avatarUrl: "FlowIcon.svg" }],
  },
  {
    iconUrl: "https://slack.com/favicon.ico",
    name: "Slack",
    slug: "slack",
    description:
      "Official Slack plugin for Flow, allowing you to post your plan to Slack channels when doing your routines.",
    installUrl: "https://cdn.jsdelivr.net/gh/richardguerre/flow@1702518/plugins/slack/out",
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
            <PluginCard {...plugin} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PluginCard = (props: Plugin) => {
  const { plugins } = usePlugins();
  const installed = !!plugins[props.slug];
  const [installPlugin, installingPlugin] = useMutation<BrowsePluginsViewInstallMutation>(graphql`
    mutation BrowsePluginsViewInstallMutation($url: String!) {
      installPlugin(input: { url: $url }) {
        ...SettingsView_pluginInstallation
      }
    }
  `);

  const handleInstallPlugin = () => {
    installPlugin({
      variables: { url: props.installUrl },
      onCompleted: () => {
        toast.success("Plugin installed");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div
      key={props.name}
      className="bg-background-50 min-w-xs flex flex-col gap-2 rounded p-4 shadow-md"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={props.iconUrl} className="h-5 w-5 rounded-1" />
            <div className="text-base font-medium">{props.name}</div>
          </div>
          <Button
            secondary
            loading={installingPlugin}
            disabled={installed}
            onClick={handleInstallPlugin}
          >
            {installed ? "Installed" : "Install"}
          </Button>
        </div>
        <div className="text-foreground-700 text-sm">{props.description}</div>
      </div>
      <div className="text-foreground-700 flex items-center gap-4 text-sm">
        <div className="flex gap-2">v{props.version}</div>
      </div>
      <div className="text-foreground-900 flex items-center gap-2 text-sm">
        {props.authors[0].avatarUrl && (
          <img
            src={props.authors[0].avatarUrl}
            className="ring-primary-200 inline-block h-5 w-5 rounded-full ring-1"
          />
        )}
        {props.authors[0].name}
        {props.authors.length > 1 && ` & ${props.authors.length - 1} more`}
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
