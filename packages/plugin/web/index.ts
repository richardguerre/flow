type WebPluginOptions = {
  components: {
    Button: React.ComponentType<{ onClick?: () => void }>;
  };
};

export type PluginRoutineStepProps = {
  onBack: () => void;
  onNext: () => void;
};

export type WebPlugin = (options: WebPluginOptions) => {
  slug: string;
  routineSteps?: {
    [stepSlug: string]: {
      component: React.ComponentType<PluginRoutineStepProps>;
    };
  };
};

export const definePlugin = (plugin: WebPlugin) => plugin;
