const C = (t) => ({ plugin: t }), S = C((t) => {
  const e = t.React, g = t.components, f = () => {
    var i, m;
    const a = t.operations.useLazyQuery({
      pluginSlug: t.pluginSlug,
      operationName: "calendars"
    }), v = new Set(
      ((i = a == null ? void 0 : a.data) == null ? void 0 : i.flatMap((n) => n.calendars).filter((n) => n.connected && !!n.id).map((n) => n.id)) ?? []
    ), [l, E] = e.useState(v), [s, o] = t.hooks.useDebounce(l, 1e3), [r, d] = e.useState(!1), p = (n) => {
      l.has(n) ? l.delete(n) : l.add(n), E(new Set(l));
    };
    t.hooks.useAsyncEffect(async () => {
      d(!0), await t.operations.mutation({
        pluginSlug: t.pluginSlug,
        operationName: "connectCalendars",
        input: { calendars: Array.from(s) }
      }), d(!1);
    }, [s]);
    let c = "Saved";
    return o && !r ? c = "Not saved yet..." : !o && r ? c = "Saving..." : c = "Saved", /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement("div", null, c), (m = a == null ? void 0 : a.data) == null ? void 0 : m.map((n) => /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement("div", null, n.account), /* @__PURE__ */ e.createElement("div", null, n.calendars.map((u) => /* @__PURE__ */ e.createElement("label", null, /* @__PURE__ */ e.createElement(
      "input",
      {
        type: "checkbox",
        checked: l.has(u.id),
        onChange: () => p(u.id)
      }
    ), u.summary))))));
  };
  return {
    name: "Google Calendar",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement("a", { href: "/api/plugin/google-calendar/auth" }, /* @__PURE__ */ e.createElement(g.Button, null, "Connect an account")), /* @__PURE__ */ e.createElement(e.Suspense, null, /* @__PURE__ */ e.createElement(f, null)))
      }
    },
    routineSteps: {
      "create-tasks-from-events": {
        name: "Create tasks from events",
        description: "Create tasks from events in your connected Google Calendars.",
        component: (a) => /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement(a.BackButton, null), /* @__PURE__ */ e.createElement(a.NextButton, null)))
      }
    }
  };
});
export {
  S as default
};
