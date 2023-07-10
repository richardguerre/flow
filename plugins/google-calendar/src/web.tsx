import { definePlugin } from "@flowdev/plugin/web";

export default definePlugin("google-calendar", (options) => {
  // @ts-ignore as React is used during compilation and is required to make sure the plugin works with the host's React version
  const React = options.React;
  const Flow = options.components;

  return {
    name: "Google Calendar",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => {
          return (
            <a href="/api/plugin/google-calendar/auth">
              <Flow.Button>Connect an account</Flow.Button>
            </a>
          );
        },
      },
    },
  };
});
