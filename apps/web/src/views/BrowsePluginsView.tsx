import { BsArrowDownCircle, BsLink45Deg, BsSearch } from "@flowdev/icons";
import { Input } from "@flowdev/ui/Input";
import { FormInput } from "@flowdev/ui/FormInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@flowdev/ui/Popover";
import { useForm } from "react-hook-form";
import { graphql, useMutation } from "@flowdev/relay";
import { Button } from "@flowdev/ui/Button";
import { BrowsePluginsViewInstallFromUrlMutation } from "@flowdev/web/relay/__generated__/BrowsePluginsViewInstallFromUrlMutation.graphql";

export default () => {
  return (
    <div className="flex w-full flex-col gap-8 p-16">
      <div className="flex w-full flex-col gap-2">
        <div className="w-full text-center text-3xl font-extrabold">Browse plugins</div>
        <div className="w-full text-center text-base">Sprinkle a little magic in your day</div>
      </div>
      <div className="gap-4">
        <div className="bg-background-50 flex items-center justify-between gap-3 rounded-md p-3">
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <Input disabled placeholder="Search..." leftIcon={<BsSearch />} />
            </TooltipTrigger>
            <TooltipContent side="bottom">Search is not yet implemented</TooltipContent>
          </Tooltip>
          <Popover>
            <PopoverTrigger>
              <Tooltip open={false}>
                <TooltipTrigger asChild>
                  <button className="hover:bg-background-200 text-foreground-700 rounded p-2">
                    <BsLink45Deg />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Install a plugin from a URL</TooltipContent>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96">
              <InstallPluginFromUrlForm />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

type FormValues = {
  url: string;
};

const InstallPluginFromUrlForm = () => {
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
      onCompleted: (_data, errs) => {
        if (errs) {
          console.log("from onCompleted");
          setError("url", { message: errs[0].message });
          return;
        }
      },
      // updater: (store) => {
      //   const updatedInstalledPlugins = store.getRootField("installPlugin");
      //   const root = store.getRoot();
      //   root.setLinkedRecords(updatedInstalledPlugins, "installedPlugins");
      // },
      onError: (error) => {
        console.log("from onError");
        setError("url", { message: error.message });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
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
