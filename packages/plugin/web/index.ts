// ‼️ only import **types** from the @flowdev/web package, not runtime code otherwise it will be a cyclic dependency
import type { WebPluginOptions } from "@flowdev/web/src/getPlugin/getPluginOptions";
import type { PluginRoutineStepProps } from "@flowdev/web/src/components/RoutineStep";

export type { WebPluginOptions, PluginRoutineStepProps };

export type WebPluginRoutineStep = {
  /** The name of the step. */
  name: string;
  /** The description of the step. Showed in the settings view for the user to understand what the step is for. */
  description: string;
  /** The component to render for the step. */
  component: React.ComponentType<PluginRoutineStepProps>;
};

export type WebPlugin = (options: WebPluginOptions) => {
  /** The name of the plugin. */
  name: string;
  /** Routine steps the user can choose to add to their routines. */
  routineSteps?: {
    [stepSlug: string]: WebPluginRoutineStep;
  };
  /**
   * Setting the user can change about your plugin.
   *
   * Each key will match a store item in the database. In the example below, the key `my-plugin-setting` will be a row in the `Store` table.
   *
   * You can fetch this setting by using the `options.store` object. Either using the `get` method, or by using the `useStore` hook.
   * @example
   * ```
   * {
   *  "my-plugin-setting": {
   *    label: "My Plugin Setting",
   *    render: "textfield",
   *    ...
   *  }
   * }
   * ```
   */
  settings?: {
    [settingKey: string]: SettingField;
  };
};

export const definePlugin = (slug: string, plugin: WebPlugin) => ({ slug, plugin });

export type DefineWebPluginReturn = ReturnType<typeof definePlugin>;

// copied from prisma types
type JsonValue = string | number | boolean | { [Key in string]?: JsonValue } | Array<JsonValue>;

type SettingField =
  | TextfieldSetting
  | TextareaSetting
  | NumberSetting
  | CheckboxSetting
  | SelectSetting
  | CustomSetting;

type CommonSetting = {
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
  /** The default value of the setting. */
  defaultValue?: JsonValue;
  /** A function that validates the value. */
  validate?: ((value: JsonValue) => string | undefined)[];
};

type TextfieldSetting = CommonSetting & {
  /** The type of the setting. This is used to render the setting in the UI. */
  type: "textfield";
  /** The label of the text field. This is a human-readable version of the key of the setting. */
  label: string;
  /** A helper text to show below the label of the textfield. Accepts markdown. */
  helper?: string;
};

type TextareaSetting = CommonSetting & {
  /** The type of the setting. This is used to render the setting in the UI. */
  type: "textarea";
  /** The label of the text area. This is a human-readable version of the key of the setting. */
  label: string;
  /** A helper text to show below the label of the textarea. Accepts markdown. */
  helper?: string;
};

type NumberSetting = CommonSetting & {
  /** The type of the setting. This is used to render the setting in the UI. */
  type: "number";
  /** The label of the number field. This is a human-readable version of the key of the setting. */
  label: string;
  /** A helper text to show below the label of the number field. Accepts markdown. */
  helper?: string;
};

type CheckboxSetting = CommonSetting & {
  /** The type of the setting. This is used to render the setting in the UI. */
  type: "checkbox";
  /** The label of the checkbox. This is a human-readable version of the key of the setting. */
  label: string;
  /**
   * The text to show next to the checkbox. Accepts markdown. For example, this could be what the checkbox setting could look like:
   *
   * **Short label**
   *
   * [ ] This is the \*\*helper\*\* text. It can be very long and wrap to the next line. It can include \[links\](https://example.com) using markdown notation.
   */
  helper: string;
};

type SelectSetting = CommonSetting & {
  /** The type of the setting. This is used to render the setting in the UI. */
  type: "select";
  /** The label of the select field. This is a human-readable version of the key of the setting. */
  label: string;
  /** A helper text to show below the label of the select field. */
  helper?: string;
  options: Array<{ label: string; value: JsonValue }>;
};

type CustomSetting = CommonSetting & {
  /** The type of the setting. This is used to render the setting in the UI. */
  type: "custom";
  /** The function to render the custom setting. It does **not** need to call `onUpdate` when the value changes. */
  render: (props: { onUpdate: (value: JsonValue) => void; value: JsonValue }) => JSX.Element;
};
