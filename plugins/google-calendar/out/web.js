const p = (t) => ({ plugin: t });
var n = "/Users/richardguerre/Projects/flow/plugins/google-calendar/src/web.tsx";
const E = p((t) => {
  const e = t.React, u = t.components, v = () => {
    var N, b;
    const a = t.operations.useLazyQuery({
      pluginSlug: t.pluginSlug,
      operationName: "calendars"
    }), c = new Set(((N = a == null ? void 0 : a.data) == null ? void 0 : N.flatMap((l) => l.calendars).filter((l) => l.connected && !!l.id).map((l) => l.id)) ?? []), [r, o] = e.useState(c), [s, d] = t.hooks.useDebounce(r, 1e3), [_, f] = e.useState(!1), g = (l) => {
      r.has(l) ? r.delete(l) : r.add(l), o(new Set(r));
    };
    t.hooks.useAsyncEffect(async () => {
      s.size === c.size && Array.from(s).every((l) => c.has(l)) || (f(!0), await t.operations.mutation({
        pluginSlug: t.pluginSlug,
        operationName: "connectCalendars",
        input: {
          calendarIds: Array.from(s)
        }
      }), f(!1));
    }, [s]);
    let m = "Saved";
    return d && !_ ? m = "Not saved yet..." : !d && _ ? m = "Saving..." : m = "Saved", /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 59,
      columnNumber: 7
    } }, (b = a == null ? void 0 : a.data) == null ? void 0 : b.map((l) => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 61,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement("div", { className: "font-semibold", __self: void 0, __source: {
      fileName: n,
      lineNumber: 62,
      columnNumber: 13
    } }, l.account), /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 63,
      columnNumber: 13
    } }, l.calendars.map((i) => /* @__PURE__ */ e.createElement(u.CheckboxWithLabel, { label: i.summary ?? "Unknown calendar", checked: r.has(i.id), onCheckedChange: () => g(i.id), __self: void 0, __source: {
      fileName: n,
      lineNumber: 65,
      columnNumber: 17
    } }))))), /* @__PURE__ */ e.createElement("div", { className: "italic text-sm text-foreground-700", __self: void 0, __source: {
      fileName: n,
      lineNumber: 74,
      columnNumber: 9
    } }, m));
  };
  return {
    name: "Google Calendar",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: n,
          lineNumber: 86,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("a", { href: "http://localhost:4000/api/plugin/google-calendar/auth", __self: void 0, __source: {
          fileName: n,
          lineNumber: 87,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(u.Button, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 88,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ e.createElement(u.ErrorBoundary, { fallbackRender: ({
          error: a
        }) => {
          var c, r, o;
          return ((o = (r = (c = a.cause) == null ? void 0 : c[0]) == null ? void 0 : r.extensions) == null ? void 0 : o.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ e.createElement(e.Fragment, null) : /* @__PURE__ */ e.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: n,
            lineNumber: 95,
            columnNumber: 26
          } }, a.message);
        }, __self: void 0, __source: {
          fileName: n,
          lineNumber: 90,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(e.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: n,
          lineNumber: 98,
          columnNumber: 17
        } }, /* @__PURE__ */ e.createElement(v, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 99,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      "create-tasks-from-events": {
        name: "Create tasks from events",
        description: "Create tasks from events in your connected Google Calendars.",
        component: (a) => /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: n,
          lineNumber: 113,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: n,
          lineNumber: 114,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(a.BackButton, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 115,
          columnNumber: 17
        } }), /* @__PURE__ */ e.createElement(a.NextButton, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 116,
          columnNumber: 17
        } })))
      }
    }
  };
});
export {
  E as default
};
