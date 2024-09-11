import { definePlugin } from "@flowdev/plugin/web";

export default definePlugin((opts) => {
  const React = opts.React; // required so that the Slack plugin uses the same React version as the web app

  return {
    name: "Slack",
    routineSteps: {
      "post-your-plan": {
        name: "Post your plan",
        description: "Post your plan for the day in a Slack channel.",
        component: (props) => {
          const [todaysPlan, setTodaysPlan] = React.useState<string>("");

          return <></>;
        },
      },
    },
  };
});
