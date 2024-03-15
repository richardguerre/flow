const v = (m) => ({ plugin: m });
var l = "/Users/richardguerre/Projects/flow/plugins/linear/src/web.tsx";
const E = v((m) => {
  const e = m.React, r = m.components, _ = () => {
    var t;
    const n = m.operations.useLazyQuery({
      operationName: "accounts"
    });
    return /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
      fileName: l,
      lineNumber: 13,
      columnNumber: 7
    } }, (t = n == null ? void 0 : n.data) == null ? void 0 : t.map((i) => {
      const o = m.dayjs(i.expiresAt);
      return /* @__PURE__ */ e.createElement("div", { key: i.email, className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
        fileName: l,
        lineNumber: 17,
        columnNumber: 13
      } }, /* @__PURE__ */ e.createElement("div", { className: "font-semibold", __self: void 0, __source: {
        fileName: l,
        lineNumber: 21,
        columnNumber: 15
      } }, i.email), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
        fileName: l,
        lineNumber: 22,
        columnNumber: 15
      } }, "Expires: ", o.fromNow()));
    }));
  }, N = (n) => {
    const [t, i] = e.useState(!1), {
      register: o,
      handleSubmit: s,
      control: u
    } = m.reactHookForm.useForm(), d = async (a) => {
      console.log(a);
      const c = n.views.find((b) => b.id === a.viewId);
      c && await m.operations.mutation({
        operationName: "createList",
        input: {
          listName: a.name,
          viewId: c.id,
          account: c.account
        }
      });
    };
    return /* @__PURE__ */ e.createElement(r.Dialog, { open: t, onOpenChange: i, __self: void 0, __source: {
      fileName: l,
      lineNumber: 54,
      columnNumber: 7
    } }, /* @__PURE__ */ e.createElement("form", { onSubmit: s(d), __self: void 0, __source: {
      fileName: l,
      lineNumber: 55,
      columnNumber: 9
    } }, /* @__PURE__ */ e.createElement(r.DialogTitle, { __self: void 0, __source: {
      fileName: l,
      lineNumber: 56,
      columnNumber: 11
    } }, "Create List"), /* @__PURE__ */ e.createElement(r.DialogContent, { __self: void 0, __source: {
      fileName: l,
      lineNumber: 57,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.FormInput, { ...o("name", {
      required: "The list must be named something 😄"
    }), label: "Name", __self: void 0, __source: {
      fileName: l,
      lineNumber: 58,
      columnNumber: 13
    } }), /* @__PURE__ */ e.createElement(r.FormSelect, { name: "viewId", control: u, __self: void 0, __source: {
      fileName: l,
      lineNumber: 62,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement(r.SelectTrigger, { className: "max-w-xs", __self: void 0, __source: {
      fileName: l,
      lineNumber: 63,
      columnNumber: 15
    } }, "Linear view"), /* @__PURE__ */ e.createElement(r.SelectContent, { __self: void 0, __source: {
      fileName: l,
      lineNumber: 64,
      columnNumber: 15
    } }, n.views.map((a) => /* @__PURE__ */ e.createElement(r.SelectItem, { key: a.id, value: a.id, __self: void 0, __source: {
      fileName: l,
      lineNumber: 66,
      columnNumber: 19
    } }, a.name))))), /* @__PURE__ */ e.createElement(r.DialogFooter, { __self: void 0, __source: {
      fileName: l,
      lineNumber: 73,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.Button, { __self: void 0, __source: {
      fileName: l,
      lineNumber: 74,
      columnNumber: 13
    } }, "Create"))));
  }, f = () => {
    var s;
    const [n, t] = e.useState(!1), i = m.operations.useLazyQuery({
      operationName: "lists"
    }), o = m.operations.useLazyQuery({
      operationName: "views"
    });
    return /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
      fileName: l,
      lineNumber: 91,
      columnNumber: 7
    } }, (s = i == null ? void 0 : i.data) == null ? void 0 : s.map((u) => /* @__PURE__ */ e.createElement("div", { key: u.name, className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
      fileName: l,
      lineNumber: 94,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement("div", { className: "font-semibold", __self: void 0, __source: {
      fileName: l,
      lineNumber: 98,
      columnNumber: 15
    } }, u.name), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
      fileName: l,
      lineNumber: 99,
      columnNumber: 15
    } }, u.description), /* @__PURE__ */ e.createElement(r.Button, { danger: !0, onClick: async () => {
      await m.operations.mutation({
        operationName: "deleteList",
        input: {
          listId: u.id
        }
      });
    }, __self: void 0, __source: {
      fileName: l,
      lineNumber: 100,
      columnNumber: 15
    } }, "Remove"))), /* @__PURE__ */ e.createElement(r.Button, { onClick: () => t(!0), __self: void 0, __source: {
      fileName: l,
      lineNumber: 116,
      columnNumber: 9
    } }, "Create List"), n && /* @__PURE__ */ e.createElement(N, { views: (o == null ? void 0 : o.data) ?? [], __self: void 0, __source: {
      fileName: l,
      lineNumber: 117,
      columnNumber: 18
    } }));
  };
  return {
    name: "Linear",
    settings: {
      syncAllViews: {
        type: "custom",
        render: () => {
          const [n, t] = e.useState(!1);
          return /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: l,
            lineNumber: 130,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement(r.Button, { onClick: async () => {
            t(!0), await m.operations.mutation({
              operationName: "syncAllViews"
            }), t(!1);
          }, loading: n, __self: void 0, __source: {
            fileName: l,
            lineNumber: 131,
            columnNumber: 15
          } }, "Refresh All Lists"), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: l,
            lineNumber: 143,
            columnNumber: 15
          } }, "This will refresh all lists and their issues. This may take a while."));
        }
      },
      lists: {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement(r.ErrorBoundary, { fallbackRender: ({
          error: n
        }) => /* @__PURE__ */ e.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
          fileName: l,
          lineNumber: 154,
          columnNumber: 24
        } }, n.message), __self: void 0, __source: {
          fileName: l,
          lineNumber: 152,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement(e.Suspense, { fallback: "Loading lists...", __self: void 0, __source: {
          fileName: l,
          lineNumber: 157,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(f, { __self: void 0, __source: {
          fileName: l,
          lineNumber: 158,
          columnNumber: 17
        } })))
      },
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: l,
          lineNumber: 168,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("a", { href: `${m.serverOrigin}/api/plugin/linear/auth`, __self: void 0, __source: {
          fileName: l,
          lineNumber: 169,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(r.Button, { __self: void 0, __source: {
          fileName: l,
          lineNumber: 170,
          columnNumber: 17
        } }, "Connect Linear")), /* @__PURE__ */ e.createElement(r.ErrorBoundary, { fallbackRender: ({
          error: n
        }) => {
          var t, i, o;
          return ((o = (i = (t = n.cause) == null ? void 0 : t[0]) == null ? void 0 : i.extensions) == null ? void 0 : o.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ e.createElement(e.Fragment, null) : /* @__PURE__ */ e.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: l,
            lineNumber: 177,
            columnNumber: 26
          } }, n.message);
        }, __self: void 0, __source: {
          fileName: l,
          lineNumber: 172,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(e.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: l,
          lineNumber: 180,
          columnNumber: 17
        } }, /* @__PURE__ */ e.createElement(_, { __self: void 0, __source: {
          fileName: l,
          lineNumber: 181,
          columnNumber: 19
        } }))))
      }
    }
  };
});
export {
  E as default
};
