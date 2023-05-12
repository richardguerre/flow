/**
 * This is the default plugin installed with the web app.
 *
 * It cannot be uninstalled by the user, but many of it's features can be disabled if needed.
 */
import { definePlugin } from "@flowdev/plugin-utils/web";

export default definePlugin((options) => {
  const Flow = options.components;
  return {
    routineSteps: {
      yesterday: {
        component: ({ onNext }) => (
          <div>
            Yesterday<Flow.Button onClick={onNext}></Flow.Button>
          </div>
        ),
      },
      "retro-on-yesterday": {
        component: () => <div>Retro on yesterday</div>,
      },
      today: {
        component: () => <div>Today</div>,
      },
    },
  };
});
