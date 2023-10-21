const h = (t) => ({ plugin: t });
var n = "/Users/richardguerre/Projects/flow/plugins/google-calendar/src/web.tsx";
const p = h((t) => {
  const e = t.React, u = t.components, v = () => {
    var N, b;
    const a = t.operations.useLazyQuery({
      pluginSlug: t.pluginSlug,
      operationName: "calendars"
    }), c = new Set(((N = a == null ? void 0 : a.data) == null ? void 0 : N.flatMap((l) => l.calendars).filter((l) => l.connected && !!l.id).map((l) => l.id)) ?? []), [o, r] = e.useState(c), [s, _] = t.hooks.useDebounce(o, 1e3), [d, f] = e.useState(!1), g = (l) => {
      console.log("handleCheckboxChange", l), o.has(l) ? o.delete(l) : o.add(l), r(new Set(o));
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
    return _ && !d ? m = "Not saved yet..." : !_ && d ? m = "Saving..." : m = "Saved", /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 60,
      columnNumber: 7
    } }, (b = a == null ? void 0 : a.data) == null ? void 0 : b.map((l) => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 62,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement("div", { className: "font-semibold", __self: void 0, __source: {
      fileName: n,
      lineNumber: 63,
      columnNumber: 13
    } }, l.account), /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 64,
      columnNumber: 13
    } }, l.calendars.map((i) => /* @__PURE__ */ e.createElement(u.CheckboxWithLabel, { label: i.summary ?? "Unknown calendar", checked: o.has(i.id), onCheckedChange: () => g(i.id), __self: void 0, __source: {
      fileName: n,
      lineNumber: 66,
      columnNumber: 17
    } }))))), /* @__PURE__ */ e.createElement("div", { className: "italic text-sm text-foreground-700", __self: void 0, __source: {
      fileName: n,
      lineNumber: 75,
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
          lineNumber: 87,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("a", { href: "http://localhost:4000/api/plugin/google-calendar/auth", __self: void 0, __source: {
          fileName: n,
          lineNumber: 88,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(u.Button, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 89,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ e.createElement(u.ErrorBoundary, { fallbackRender: ({
          error: a
        }) => {
          var c, o, r;
          return ((r = (o = (c = a.cause) == null ? void 0 : c[0]) == null ? void 0 : o.extensions) == null ? void 0 : r.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ e.createElement(e.Fragment, null) : /* @__PURE__ */ e.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: n,
            lineNumber: 96,
            columnNumber: 26
          } }, a.message);
        }, __self: void 0, __source: {
          fileName: n,
          lineNumber: 91,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(e.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: n,
          lineNumber: 99,
          columnNumber: 17
        } }, /* @__PURE__ */ e.createElement(v, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 100,
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
          lineNumber: 114,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
          fileName: n,
          lineNumber: 115,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(a.BackButton, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 116,
          columnNumber: 17
        } }), /* @__PURE__ */ e.createElement(a.NextButton, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 117,
          columnNumber: 17
        } })))
      }
    }
  };
});
export {
  p as default
};
