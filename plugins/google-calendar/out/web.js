const a = (e, n) => ({ slug: e, plugin: n }), c = a("google-calendar", (e) => {
  const n = e.React, t = e.components;
  return {
    name: "Google Calendar",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ n.createElement("a", { href: "/api/plugin/google-calendar/auth" }, /* @__PURE__ */ n.createElement(t.Button, null, "Connect an account"))
      }
    }
  };
});
export {
  c as default
};
