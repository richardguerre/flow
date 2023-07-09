import { definePlugin } from "@flowdev/plugin/web";

export default definePlugin("google-calendar", (opts) => {
  const Flow = opts.components;
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
