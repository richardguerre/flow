import { ComponentType, Suspense, useEffect } from "react";
import { Button } from "@flowdev/ui/Button";
import { getPlugin } from "../getPlugin";
import { useAsyncLoader } from "../useAsyncLoader";
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  useMutation,
  useMutationPromise,
} from "@flowdev/relay";
import { PluginSettingsView_pluginInstallation$key } from "../relay/__generated__/PluginSettingsView_pluginInstallation.graphql";
import { UpdatePluginButton } from "../components/UpdatePluginButton";
import { PluginSettingsViewUninstallPluginMutation } from "../relay/__generated__/PluginSettingsViewUninstallPluginMutation.graphql";
import { useOutletContext, useParams } from "react-router-dom";
import { SettingsViewQuery$data } from "../relay/__generated__/SettingsViewQuery.graphql";
import { FormInput, FormInputProps } from "@flowdev/ui/FormInput";
import { FormTextarea, FormTextareaProps } from "@flowdev/ui/FormTextarea";
import { FormCheckbox, FormCheckboxProps } from "@flowdev/ui/FormCheckbox";
import { FieldError, FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { Markdown } from "@flowdev/tiptap";
import { useDebounce } from "../useDebounce";
import { PluginSettingsViewUpdatePluginSettingsMutation } from "../relay/__generated__/PluginSettingsViewUpdatePluginSettingsMutation.graphql";
import { PluginSettingsViewQuery } from "../relay/__generated__/PluginSettingsViewQuery.graphql";
import { dayjs } from "../dayjs";
import { FormSelect, FormSelectProps } from "@flowdev/ui/FormSelect";
import { SelectContent, SelectItem, SelectTrigger } from "@flowdev/ui/Select";
import { tw } from "@flowdev/ui/tw";
import { toast } from "@flowdev/ui/Toast";

export default () => {
  const params = useParams<"pluginSlug">();
  const context = useOutletContext<SettingsViewQuery$data>();
  const pluginInstallation = context.installedPlugins.find(
    (plugin) => plugin.slug === params.pluginSlug,
  );

  if (!pluginInstallation) throw new Error(`No plugin found with slug: ${params.pluginSlug}`);

  return <PluginSettingsViewContent pluginInstallation={pluginInstallation} />;
};

type Props = {
  pluginInstallation: PluginSettingsView_pluginInstallation$key;
};

const PluginSettingsViewContent = (props: Props) => {
  const pluginInstallation = useFragment<PluginSettingsView_pluginInstallation$key>(
    graphql`
      fragment PluginSettingsView_pluginInstallation on PluginInstallation {
        slug
        url
        ...UpdatePluginButton_pluginInstallation
      }
    `,
    props.pluginInstallation,
  );
  const [uninstallPlugin, isUninstallingPlugin] =
    useMutation<PluginSettingsViewUninstallPluginMutation>(graphql`
      mutation PluginSettingsViewUninstallPluginMutation($input: MutationUninstallPluginInput!) {
        uninstallPlugin(input: $input) {
          slug
        }
      }
    `);
  const [plugin, loading] = useAsyncLoader(
    async () => getPlugin({ pluginSlug: pluginInstallation.slug }),
    [pluginInstallation.slug],
  );

  // TODO: show proper loading indicator
  if (loading) return <div>Loading...</div>;
  if (!plugin) return null;
  // TODO: show proper error message
  if ("_error" in plugin) return <div>Error: {plugin._error}</div>;

  const handleUninstallPlugin = () => {
    uninstallPlugin({ variables: { input: { slug: pluginInstallation.slug } } });
  };

  return (
    <div className="bg-background-50 flex w-full flex-col gap-4 p-8">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">{plugin.name}</h1>
        <div className="flex gap-2">
          <UpdatePluginButton pluginInstallation={pluginInstallation} />
          <Button onClick={handleUninstallPlugin} loading={isUninstallingPlugin}>
            Uninstall
          </Button>
        </div>
      </div>
      <Suspense fallback="Loading settings... (better loading animation coming soon)">
        <PluginSettingFields
          pluginSlug={pluginInstallation.slug}
          settings={plugin.settings ?? {}}
        />
      </Suspense>
    </div>
  );
};

const PluginSettingFields = (props: {
  pluginSlug: string;
  settings: Record<string, PluginSettingFieldProps>;
}) => {
  const data = useLazyLoadQuery<PluginSettingsViewQuery>(
    graphql`
      query PluginSettingsViewQuery($where: QueryStoreItemsInput!) {
        storeItems(where: $where) {
          ...PluginSettingsViewStoreItem_item @relay(mask: false)
        }
      }
    `,
    { where: { pluginSlug: props.pluginSlug, keys: Object.keys(props.settings) } },
  );

  const [updateSetting] = useMutationPromise<PluginSettingsViewUpdatePluginSettingsMutation>(
    graphql`
      mutation PluginSettingsViewUpdatePluginSettingsMutation(
        $input: MutationUpsertStoreItemInput!
      ) {
        upsertStoreItem(input: $input) {
          ...PluginSettingsViewStoreItem_item
        }
      }
    `,
  );

  const settingsInStore = Object.fromEntries(data.storeItems.map((value) => [value.key, value]));

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(props.settings).map(([key, setting]) => (
        <PluginSettingField
          {...setting}
          key={key}
          settingProps={{
            name: key,
            updatedAt: settingsInStore[key]?.updatedAt
              ? new Date(settingsInStore[key].updatedAt)
              : null,
            value: settingsInStore[key]?.value ?? undefined,
            onUpdate: (value) => {
              toast.promise(
                updateSetting({
                  variables: {
                    input: {
                      key,
                      value,
                      pluginSlug: props.pluginSlug,
                      isSecret: setting.isSecret,
                      isServerOnly: setting.isServerOnly,
                    },
                  },
                }),
                {
                  loading: "Saving...",
                  success: "Saved!",
                  error: "Failed to save.",
                },
              );
            },
          }}
        />
      ))}
    </div>
  );
};

graphql`
  fragment PluginSettingsViewStoreItem_item on Store {
    id
    updatedAt
    key
    value
    pluginSlug
    isSecret
    isServerOnly
  }
`;

type SettingProps = {
  settingProps: {
    name: string;
    updatedAt: Date | null;
    value: JsonValue | undefined;
    onUpdate: (value: JsonValue) => void;
  };
};

export type PluginSettingFieldProps =
  | PluginTextfieldSettingProps
  | PluginTextareaSettingProps
  | PluginCheckboxSettingProps
  | PluginSelectSettingProps
  | PluginCustomSettingProps;
const PluginSettingField = (props: PluginSettingFieldProps & SettingProps) => {
  switch (props.type) {
    case "textfield":
      return <TextFieldSetting {...props} />;
    case "textarea":
      return <TextareaSetting {...props} />;
    case "checkbox":
      return <CheckboxSetting {...props} />;
    case "select":
      return <SelectSetting {...props} />;
    case "custom":
      return <PluginCustomSetting {...props} />;
  }
};

const DEBOUNCE_TIME = 2000;

type PluginCommonSettingProps = {
  /**
   * Whether the value is secret and should only be accessed in the server by the plugin that set it.
   * Once set, the value cannot be read by the client.
   */
  isSecret?: boolean;
  /**
   * Whether the value is only accessible in the server by the plugin that set it.
   * Once set, the value cannot be read by the client.
   */
  isServerOnly?: boolean;
};

type PluginTextfieldSettingProps = PluginCommonSettingProps &
  Omit<FormInputProps, "type" | "description" | "name" | "value" | "ref"> & {
    /** The type of the setting. This is used to render the setting in the UI. */
    type: "textfield";
    /** The type passed into the input HTML element. It's recommended to pass in text-only input types like text, password, email, etc. */
    inputType?: FormInputProps["type"];
    /** Text shown below the label of the textfield. Accepts markdown. */
    description?: string;
    /** react-hook-form register options */
    registerOptions?: RegisterOptions<FieldValues, string>;
  };
const TextFieldSetting = (props: PluginTextfieldSettingProps & SettingProps) => {
  const { register, handleSubmit, watch, formState, resetField } = useForm({
    mode: "onChange",
    defaultValues: {
      [props.settingProps.name]: props.settingProps.value as string,
    },
  });
  const value = watch(props.settingProps.name);
  const [, , cancelDebounce] = useDebounce(
    { value, isDirty: formState.isDirty, isValid: formState.isValid },
    DEBOUNCE_TIME,
    ({ value, isDirty, isValid }) => {
      if (!isValid || !isDirty) return;
      props.settingProps.onUpdate(value);
    },
  );

  const onSubmit = (values: Record<string, JsonValue>) => {
    cancelDebounce();
    props.settingProps.onUpdate(values[props.settingProps.name]);
  };

  useEffect(() => {
    // this ensures that the field is reset when the value is saved
    if (!formState.isDirty) return;
    resetField(props.settingProps.name, {
      defaultValue: props.settingProps.value as string,
    });
  }, [props.settingProps.value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        {...props}
        type={props.inputType ?? (props.isSecret ? "password" : "text")}
        description={props.description && <Markdown>{props.description}</Markdown>}
        {...register(props.settingProps.name, props.registerOptions)}
        error={formState.errors[props.settingProps.name] as FieldError}
        className={tw(!props.fullWidth && "max-w-sm", props.className)}
      />
      {props.settingProps.updatedAt && (
        <div className="text-foreground-700 text-sm">
          Last updated: {dayjs(props.settingProps.updatedAt).fromNow()}
        </div>
      )}
    </form>
  );
};

type PluginTextareaSettingProps = PluginCommonSettingProps &
  Omit<FormTextareaProps, "description" | "name" | "value" | "ref"> & {
    /** The type of the setting. This is used to render the setting in the UI. */
    type: "textarea";
    /** Text shown below the label of the textarea. Accepts markdown. */
    description?: string;
    /** react-hook-form register options */
    registerOptions?: RegisterOptions<FieldValues, string>;
  };
const TextareaSetting = (props: PluginTextareaSettingProps & SettingProps) => {
  const { register, handleSubmit, watch, formState, resetField } = useForm({
    mode: "onChange",
    defaultValues: {
      [props.settingProps.name]: props.settingProps.value as string,
    },
  });
  const value = watch(props.settingProps.name);
  const [, , cancelDebounce] = useDebounce(
    { value, isDirty: formState.isDirty, isValid: formState.isValid },
    DEBOUNCE_TIME,
    ({ value, isDirty, isValid }) => {
      if (!isValid || !isDirty) return;
      props.settingProps.onUpdate(value);
    },
  );

  const onSubmit = (values: Record<string, string>) => {
    cancelDebounce();
    props.settingProps.onUpdate(values[props.settingProps.name]);
  };

  useEffect(() => {
    // this ensures that the field is reset when the value is saved
    if (!formState.isDirty) return;
    resetField(props.settingProps.name, {
      defaultValue: props.settingProps.value as string,
    });
  }, [props.settingProps.value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTextarea
        {...props}
        description={props.description && <Markdown>{props.description}</Markdown>}
        {...register(props.settingProps.name, props.registerOptions)}
        error={formState.errors[props.settingProps.name] as FieldError}
      />
      {props.settingProps.updatedAt && (
        <div className="text-foreground-700 text-sm">
          Last updated: {dayjs(props.settingProps.updatedAt).fromNow()}
        </div>
      )}
    </form>
  );
};

type PluginCheckboxSettingProps = PluginCommonSettingProps &
  Omit<FormCheckboxProps, "value" | "name"> & {
    /** The type of the setting. This is used to render the setting in the UI. */
    type: "checkbox";
    /** The title of the checkbox. This can simply be a human-readable version of the key of the setting. */
    title: string;
    /**
     * The text to show next to the checkbox. Accepts markdown. For example, this could be what the checkbox setting could look like in the UI:
     *
     * **Title**
     *
     * Optional description of the checkbox. It can be very long and wrap to the next line. It can include [links](https://example.com) using markdown notation.
     *
     * [ ] This is the \*\*label\*\* of the checkbox. It can be very long and wrap to the next line. It can include \[links\](https://example.com) using markdown notation.
     */
    label: string;
    /** Description shown below the title of the checkbox. Accepts markdown. */
    description?: string;
  };
const CheckboxSetting = (props: PluginCheckboxSettingProps & SettingProps) => {
  const { control, handleSubmit, watch, formState, resetField } = useForm({
    mode: "onChange",
    defaultValues: {
      [props.settingProps.name]: props.settingProps.value as boolean,
    },
  });
  const value = watch(props.settingProps.name);
  const [, , cancelDebounce] = useDebounce(
    { value, isDirty: formState.isDirty, isValid: formState.isValid },
    DEBOUNCE_TIME,
    ({ value, isValid, isDirty }) => {
      if (!isValid || !isDirty) return;
      props.settingProps.onUpdate(value);
    },
  );

  const onSubmit = (values: Record<string, JsonValue>) => {
    cancelDebounce();
    props.settingProps.onUpdate(values[props.settingProps.name]);
  };

  useEffect(() => {
    // this ensures that the field is reset when the value is saved
    if (!formState.isDirty) return;
    resetField(props.settingProps.name, {
      defaultValue: props.settingProps.value as boolean,
    });
  }, [props.settingProps.value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-1">
      <div className="text-foreground-900 text-base font-medium">{props.title}</div>
      {props.description && <Markdown>{props.description}</Markdown>}
      <FormCheckbox
        {...props}
        name={props.settingProps.name}
        control={control}
        checkboxProps={{ ...props.checkboxProps, label: props.label }}
        error={formState.errors[props.settingProps.name] as FieldError}
      />
      {props.settingProps.updatedAt && (
        <div className="text-foreground-700 text-sm">
          Last updated: {dayjs(props.settingProps.updatedAt).fromNow()}
        </div>
      )}
    </form>
  );
};

type PluginSelectSettingProps = PluginCommonSettingProps &
  Omit<FormSelectProps, "value" | "name" | "children"> & {
    /** The type of the setting. This is used to render the setting in the UI. */
    type: "select";
    /** The label of the select field. This is a human-readable version of the key of the setting. */
    label: string;
    /** A helper text to show below the label of the select field. */
    description?: string;
    /** The options to show in the select field. */
    options: Array<{ label: string; value: string }>;
    /** The placeholder text to show when no option is selected. */
    placeholder: string;
  };
const SelectSetting = (props: PluginSelectSettingProps & SettingProps) => {
  const { control, handleSubmit, formState, watch, resetField } = useForm({
    mode: "onChange",
    defaultValues: {
      [props.settingProps.name]: props.settingProps.value as string,
    },
  });
  const value = watch(props.settingProps.name);
  const [, , cancelDebounce] = useDebounce(
    { value, isDirty: formState.isDirty, isValid: formState.isValid },
    DEBOUNCE_TIME,
    ({ value, isDirty, isValid }) => {
      if (!isValid || !isDirty) return;
      props.settingProps.onUpdate(value);
    },
  );

  const onSubmit = (values: Record<string, JsonValue>) => {
    cancelDebounce();
    props.settingProps.onUpdate(values[props.settingProps.name]);
  };

  useEffect(() => {
    // this ensures that the field is reset when the value is saved
    if (!formState.isDirty) return;
    resetField(props.settingProps.name, {
      defaultValue: props.settingProps.value as string,
    });
  }, [props.settingProps.value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSelect
        {...props}
        name={props.settingProps.name}
        control={control}
        error={formState.errors[props.settingProps.name] as FieldError}
      >
        <SelectTrigger className="max-w-xs">{props.placeholder}</SelectTrigger>
        <SelectContent>
          {props.options.map((option) => (
            <SelectItem key={JSON.stringify(option.value)} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </FormSelect>
      {props.settingProps.updatedAt && (
        <div className="text-foreground-700 text-sm">
          Last updated: {dayjs(props.settingProps.updatedAt).fromNow()}
        </div>
      )}
    </form>
  );
};

type PluginCustomSettingProps = PluginCommonSettingProps & {
  /** The type of the setting. This is used to render the setting in the UI. */
  type: "custom";
  /**
   * The function to render the custom setting. You are responsible for rendering and updating the value.
   *
   * This type can be used to render other things that does not update any value in the store. For example, a button that authenticates the user with a third-party service (like Google).
   */
  render: ComponentType<{ onUpdate: (value: JsonValue) => void; value: JsonValue | undefined }>;
};
const PluginCustomSetting = (props: PluginCustomSettingProps & SettingProps) => {
  const Render = props.render;
  return <Render onUpdate={props.settingProps.onUpdate} value={props.settingProps.value} />;
};
