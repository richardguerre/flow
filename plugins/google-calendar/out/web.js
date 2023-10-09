const E = (t) => ({ plugin: t });
var n = "/Users/richardguerre/Projects/flow/plugins/google-calendar/src/web.tsx";
const p = E((t) => {
  const e = t.React, N = t.components, f = () => {
    var _, d;
    const r = t.operations.useLazyQuery({
      pluginSlug: t.pluginSlug,
      operationName: "calendars"
    }), b = new Set(((_ = r == null ? void 0 : r.data) == null ? void 0 : _.flatMap((l) => l.calendars).filter((l) => l.connected && !!l.id).map((l) => l.id)) ?? []), [a, v] = e.useState(b), [c, m] = t.hooks.useDebounce(a, 1e3), [i, s] = e.useState(!1), g = (l) => {
      a.has(l) ? a.delete(l) : a.add(l), v(new Set(a));
    };
    t.hooks.useAsyncEffect(async () => {
      s(!0), await t.operations.mutation({
        pluginSlug: t.pluginSlug,
        operationName: "connectCalendars",
        input: {
          calendars: Array.from(c)
        }
      }), s(!1);
    }, [c]);
    let u = "Saved";
    return m && !i ? u = "Not saved yet..." : !m && i ? u = "Saving..." : u = "Saved", /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 53,
      columnNumber: 7
    } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 54,
      columnNumber: 9
    } }, u), (d = r == null ? void 0 : r.data) == null ? void 0 : d.map((l) => /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 56,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 57,
      columnNumber: 13
    } }, l.account), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 58,
      columnNumber: 13
    } }, l.calendars.map((o) => /* @__PURE__ */ e.createElement("label", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 60,
      columnNumber: 17
    } }, /* @__PURE__ */ e.createElement("input", { type: "checkbox", checked: a.has(o.id), onChange: () => g(o.id), __self: void 0, __source: {
      fileName: n,
      lineNumber: 61,
      columnNumber: 19
    } }), o.summary))))));
  };
  return {
    name: "Google Calendar",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: n,
          lineNumber: 83,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("a", { href: "/api/plugin/google-calendar/auth", __self: void 0, __source: {
          fileName: n,
          lineNumber: 84,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(N.Button, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 85,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ e.createElement(e.Suspense, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 87,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(f, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 88,
          columnNumber: 17
        } })))
      }
    },
    routineSteps: {
      "create-tasks-from-events": {
        name: "Create tasks from events",
        description: "Create tasks from events in your connected Google Calendars.",
        component: (r) => /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: n,
          lineNumber: 101,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: n,
          lineNumber: 102,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(r.BackButton, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 103,
          columnNumber: 17
        } }), /* @__PURE__ */ e.createElement(r.NextButton, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 104,
          columnNumber: 17
        } })))
      }
    }
  };
});
export {
  p as default
};
