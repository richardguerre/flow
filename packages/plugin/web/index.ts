// ‼️ only import types from the @flowdev/web package, not runtime code otherwise it will be a cyclic dependency
import type { WebPluginOptions } from "@flowdev/web/src/getPlugin/pluginOptions";
import type { PluginRoutineStepProps } from "@flowdev/web/src/components/RoutineStep";

export type { WebPluginOptions, PluginRoutineStepProps };

export type WebPlugin = (options: WebPluginOptions) => {
  routineSteps?: {
    [stepSlug: string]: {
      component: React.ComponentType<PluginRoutineStepProps>;
    };
  };
};

export const definePlugin = (slug: string, plugin: WebPlugin) => ({ slug, plugin });

export type DefineWebPluginReturn = ReturnType<typeof definePlugin>;
