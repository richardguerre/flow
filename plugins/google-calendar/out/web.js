const g = (r) => ({ plugin: r });
var n = "/Users/richardguerre/Projects/flow/plugins/google-calendar/src/web.tsx";
const x = g((r) => {
  const e = r.React, u = r.components, v = () => {
    var N, b;
    const l = r.operations.useLazyQuery({
      operationName: "calendars"
    }), c = new Set(((N = l == null ? void 0 : l.data) == null ? void 0 : N.flatMap((a) => "authError" in a ? [] : a.calendars).filter((a) => a.connected && !!a.id).map((a) => a.id)) ?? []), [t, m] = e.useState(c), [o, _] = r.hooks.useDebounce(t, 1e3), [d, f] = e.useState(!1), E = (a) => {
      t.has(a) ? t.delete(a) : t.add(a), m(new Set(t));
    };
    r.hooks.useAsyncEffect(async () => {
      o.size === c.size && Array.from(o).every((a) => c.has(a)) || (f(!0), await r.operations.mutation({
        operationName: "connectCalendars",
        input: {
          calendarIds: Array.from(o)
        }
      }), f(!1));
    }, [o]);
    let s = "Saved";
    return _ && !d ? s = "Not saved yet..." : !_ && d ? s = "Saving..." : s = "Saved", /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 57,
      columnNumber: 7
    } }, (b = l == null ? void 0 : l.data) == null ? void 0 : b.map((a) => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 59,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement("div", { className: "flex justify-between gap-2 items-center", __self: void 0, __source: {
      fileName: n,
      lineNumber: 60,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement("div", { className: "font-semibold", __self: void 0, __source: {
      fileName: n,
      lineNumber: 61,
      columnNumber: 15
    } }, a.account)), /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 63,
      columnNumber: 13
    } }, "authError" in a ? /* @__PURE__ */ e.createElement("div", { className: "text-foreground-900 text-negative-500", __self: void 0, __source: {
      fileName: n,
      lineNumber: 65,
      columnNumber: 17
    } }, "Account incorrectly connected. (", a.authError, ")") : a.calendars.map((i) => /* @__PURE__ */ e.createElement(u.CheckboxWithLabel, { label: i.summary ?? "Unknown calendar", checked: t.has(i.id), onCheckedChange: () => E(i.id), __self: void 0, __source: {
      fileName: n,
      lineNumber: 70,
      columnNumber: 19
    } }))))), /* @__PURE__ */ e.createElement("div", { className: "italic text-sm text-foreground-700", __self: void 0, __source: {
      fileName: n,
      lineNumber: 80,
      columnNumber: 9
    } }, s));
  };
  return {
    name: "Google Calendar",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: n,
          lineNumber: 92,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("a", { href: `${r.serverOrigin}/api/plugin/google-calendar/auth`, __self: void 0, __source: {
          fileName: n,
          lineNumber: 93,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(u.Button, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 94,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ e.createElement(u.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var c, t, m;
          return ((m = (t = (c = l.cause) == null ? void 0 : c[0]) == null ? void 0 : t.extensions) == null ? void 0 : m.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ e.createElement(e.Fragment, null) : /* @__PURE__ */ e.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: n,
            lineNumber: 101,
            columnNumber: 26
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: n,
          lineNumber: 96,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(e.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: n,
          lineNumber: 104,
          columnNumber: 17
        } }, /* @__PURE__ */ e.createElement(v, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 105,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      "create-tasks-from-events": {
        name: "Create tasks from events",
        description: "Create tasks from events in your connected Google Calendars.",
        component: (l) => /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: n,
          lineNumber: 119,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: n,
          lineNumber: 120,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(l.BackButton, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 121,
          columnNumber: 17
        } }), /* @__PURE__ */ e.createElement(l.NextButton, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 122,
          columnNumber: 17
        } })))
      }
    }
  };
});
export {
  x as default
};
