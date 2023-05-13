// ‼️ only import types from the web package, not runtime code
import type { WebPluginOptions } from "@flowdev/web/src/getPlugin/pluginOptions";
import type { PluginRoutineStepProps } from "@flowdev/web/src/components/RoutineStep";

export type WebPlugin = (options: WebPluginOptions) => {
  slug: string;
  routineSteps?: {
    [stepSlug: string]: {
      component: React.ComponentType<PluginRoutineStepProps>;
    };
  };
};

export const definePlugin = (plugin: WebPlugin) => plugin;
