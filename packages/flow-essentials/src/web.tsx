/**
 * This is the default plugin installed with the web app.
 */
import { definePlugin } from "@flowdev/plugin-utils/web";

export default definePlugin((options) => {
  const Flow = options.components;
  return {
    slug: "flow-essentials",
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
