// ‼️ only import **types** from the @flowdev/web package, not runtime code otherwise it will be a cyclic dependency
import type { WebPluginOptions } from "@flowdev/web/src/getPlugin/getPluginOptions";
import type { PluginRoutineStepProps } from "@flowdev/web/src/components/RoutineStep";
import type { PluginOnCreateTask as OnCreateTask } from "@flowdev/web/src/components/OnCreateTask";
import type { PluginRenderTaskCardDetails as RenderTaskCardDetails } from "@flowdev/web/src/components/RenderTaskCardDetails";
import type { PluginRenderTaskCardActions as RenderTaskCardActions } from "@flowdev/web/src/components/RenderTaskCardActions";
import type { PluginRenderItemCardDetails as RenderItemCardDetails } from "@flowdev/web/src/components/RenderItemCardDetails";
import type { PluginRenderItemCardActions as RenderItemCardActions } from "@flowdev/web/src/components/RenderItemCardActions";
import type { PluginSettingFieldProps as SettingField } from "@flowdev/web/src/views/PluginSettingsView";
import type {
  PluginRenderCalendarActions as RenderCalendarActions,
  PluginRenderCalendarInlineActions as RenderCalendarInlineActions,
} from "@flowdev/web/src/components/RenderCalendarActions";
import type { PluginRenderLists as RenderLists } from "@flowdev/web/src/components/RenderLists";
import type { PluginRenderList as RenderList } from "@flowdev/web/src/components/RenderList";
import type { RenderRoutineStepSettings_routineStep$data } from "@flowdev/web/src/relay/__gen__/RenderRoutineStepSettings_routineStep.graphql";
import type { PluginShortcuts } from "@flowdev/web/src/components/Shortcuts";
import type { Extensions } from "@tiptap/core";
import { ComponentType } from "react";

export type { WebPluginOptions, PluginRoutineStepProps, OnCreateTask };

type ToRender = { component: ComponentType };
export type WebPluginRoutineStep = {
  /** The name of the step. */
  name: string;
  /** The description of the step. Showed in the settings view for the user to understand what the step is for. */
  description: string;
  /** The component to render for the step. */
  component: React.ComponentType<PluginRoutineStepProps>;
  /**
   * The component to render for the settings of the step.
   * This is called when the user clicks on the settings icon on a routine step in the Routine Settings view.
   *
   * The component can be rendered asynchronously or return null if no settings are needed.
   */
  renderSettings?: (props: {
    routineStep: RenderRoutineStepSettings_routineStep$data;
    onCancel?: () => void;
    onClose?: () => void;
  }) => Promise<null | ToRender>; // had to compose this type here directly instead of @flowdev/web/src/components/RenderRoutineStepSettings as it's too complex for TypeScript to handle.
};

type WaysToContact = { email: string };

export type WebPlugin = (options: WebPluginOptions) => {
  /** The name of the plugin. */
  name: string;
  /** Who and how to contact for support. You can add as many ways as you want, but the first one will be the default way to contact. */
  contact?: WaysToContact[];
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
   * Function called when rendering the item card details (i.e. right above the item card actions).
   * The plugin can either return null or an array of React components.
   *
   * You can use the `opts.Flow.Badge` component to render badges similar to the default ones on the Item card.
   */
  renderItemCardDetails?: RenderItemCardDetails;
  /**
   * Function called when rendering the item card actions (i.e. right next to the existing actions).
   * The plugin can either return null or an array of React components.
   */
  renderItemCardActions?: RenderItemCardActions;
  /**
   * Render actions below the Calendar header.
   */
  renderCalendarActions?: RenderCalendarActions;
  /**
   * Render actions inline next to the Calendar header.
   */
  renderCalendarInlineActions?: RenderCalendarInlineActions;
  /**
   * Render lists in the Lists component (i.e. the right sidebar).
   */
  renderLists?: RenderLists;
  /**
   * Render a list in the Lists component (i.e. the right sidebar).
   */
  renderList?: RenderList;
  /**
   * TipTap extensions to use in the NoteEditor component.
   */
  noteEditorTipTapExtensions?: Extensions;
  /**
   * Shortcuts to add to the web app.
   */
  shortcuts?: PluginShortcuts;
};

export const definePlugin = (plugin: WebPlugin) => ({ plugin });

export type DefineWebPluginReturn = ReturnType<typeof definePlugin>;
