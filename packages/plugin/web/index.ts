// ‼️ only import **types** from the @flowdev/web package, not runtime code otherwise it will be a cyclic dependency
import type { WebPluginOptions } from "@flowdev/web/src/getPlugin/getPluginOptions";
import type { PluginRoutineStepProps } from "@flowdev/web/src/components/RoutineStep";
import type { PluginOnCreateTask as OnCreateTask } from "@flowdev/web/src/components/OnCreateTask";
import type { PluginRenderTaskCardDetails as RenderTaskCardDetails } from "@flowdev/web/src/components/RenderTaskCardDetails";
import type { PluginRenderTaskCardActions as RenderTaskCardActions } from "@flowdev/web/src/components/RenderTaskCardActions";
import type { PluginRenderItemCardDetails as RenderItemCardDetails } from "@flowdev/web/src/components/RenderItemCardDetails";
import type { PluginRenderItemCardActions as RenderItemCardActions } from "@flowdev/web/src/components/RenderItemCardActions";
import type { PluginSettingFieldProps as SettingField } from "@flowdev/web/src/views/PluginSettingsView";

export type { WebPluginOptions, PluginRoutineStepProps, OnCreateTask };

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
  /** Hook called when the user creates a task. */
  onCreateTask?: OnCreateTask;
  /**
   * Function called when rendering the task card details.
   * The plugin can either return null or an array of React components.
   *
   * You can use the `opts.Flow.Badge` component to render badges similar to the default ones on the Task card.
   */
  renderTaskCardDetails?: RenderTaskCardDetails;
  /**
   * Function called when rendering the task card actions.
   * The plugin can either return null or an array of React components.
   */
  renderTaskCardActions?: RenderTaskCardActions;
  /**
   * Function called when rendering the item card details.
   * The plugin can either return null or an array of React components.
   *
   * You can use the `opts.Flow.Badge` component to render badges similar to the default ones on the Item card.
   */
  renderItemCardDetails?: RenderItemCardDetails;
  /**
   * Function called when rendering the item card actions.
   * The plugin can either return null or an array of React components.
   */
  renderItemCardActions?: RenderItemCardActions;
};

export const definePlugin = (plugin: WebPlugin) => ({ plugin });

export type DefineWebPluginReturn = ReturnType<typeof definePlugin>;
