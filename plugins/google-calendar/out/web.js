const g = (r) => ({ plugin: r });
var a = "/Users/richardguerre/Projects/flow/plugins/google-calendar/src/web.tsx";
const x = g((r) => {
  const e = r.React, u = r.components, v = () => {
    var N, b;
    const l = r.operations.useLazyQuery({
      operationName: "calendars"
    }), c = new Set(((N = l == null ? void 0 : l.data) == null ? void 0 : N.flatMap((n) => "authError" in n ? [] : n.calendars).filter((n) => n.connected && !!n.id).map((n) => n.id)) ?? []), [t, o] = e.useState(c), [m, d] = r.hooks.useDebounce(t, 1e3), [_, f] = e.useState(!1), E = (n) => {
      t.has(n) ? t.delete(n) : t.add(n), o(new Set(t));
    };
    r.hooks.useAsyncEffect(async () => {
      m.size === c.size && Array.from(m).every((n) => c.has(n)) || (f(!0), await r.operations.mutation({
        operationName: "connectCalendars",
        input: {
          calendarIds: Array.from(m)
        }
      }), f(!1));
    }, [m]);
    let s = "Saved";
    return d && !_ ? s = "Not saved yet..." : !d && _ ? s = "Saving..." : s = "Saved", /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: a,
      lineNumber: 57,
      columnNumber: 7
    } }, (b = l == null ? void 0 : l.data) == null ? void 0 : b.map((n) => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
      fileName: a,
      lineNumber: 59,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement("div", { className: "font-semibold", __self: void 0, __source: {
      fileName: a,
      lineNumber: 60,
      columnNumber: 13
    } }, n.account), /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: a,
      lineNumber: 61,
      columnNumber: 13
    } }, "authError" in n ? /* @__PURE__ */ e.createElement("div", { className: "text-foreground-900 text-negative-500", __self: void 0, __source: {
      fileName: a,
      lineNumber: 63,
      columnNumber: 17
    } }, "Account incorrectly connected. (", n.authError, ")") : n.calendars.map((i) => /* @__PURE__ */ e.createElement(u.CheckboxWithLabel, { label: i.summary ?? "Unknown calendar", checked: t.has(i.id), onCheckedChange: () => E(i.id), __self: void 0, __source: {
      fileName: a,
      lineNumber: 68,
      columnNumber: 19
    } }))))), /* @__PURE__ */ e.createElement("div", { className: "italic text-sm text-foreground-700", __self: void 0, __source: {
      fileName: a,
      lineNumber: 78,
      columnNumber: 9
    } }, s));
  };
  return {
    name: "Google Calendar",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: a,
          lineNumber: 90,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("a", { href: `${r.serverOrigin}/api/plugin/google-calendar/auth`, __self: void 0, __source: {
          fileName: a,
          lineNumber: 91,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(u.Button, { __self: void 0, __source: {
          fileName: a,
          lineNumber: 92,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ e.createElement(u.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var c, t, o;
          return ((o = (t = (c = l.cause) == null ? void 0 : c[0]) == null ? void 0 : t.extensions) == null ? void 0 : o.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ e.createElement(e.Fragment, null) : /* @__PURE__ */ e.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: a,
            lineNumber: 99,
            columnNumber: 26
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: a,
          lineNumber: 94,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(e.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: a,
          lineNumber: 102,
          columnNumber: 17
        } }, /* @__PURE__ */ e.createElement(v, { __self: void 0, __source: {
          fileName: a,
          lineNumber: 103,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      "create-tasks-from-events": {
        name: "Create tasks from events",
        description: "Create tasks from events in your connected Google Calendars.",
        component: (l) => /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: a,
          lineNumber: 117,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: a,
          lineNumber: 118,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(l.BackButton, { __self: void 0, __source: {
          fileName: a,
          lineNumber: 119,
          columnNumber: 17
        } }), /* @__PURE__ */ e.createElement(l.NextButton, { __self: void 0, __source: {
          fileName: a,
          lineNumber: 120,
          columnNumber: 17
        } })))
      }
    }
  };
});
export {
  x as default
};
