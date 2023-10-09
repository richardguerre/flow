const f = (l) => ({ plugin: l });
var n = "/Users/richardguerre/Projects/flow/plugins/github/src/web.tsx";
const g = f((l) => {
  const s = l.components, r = l.React, c = /* @__PURE__ */ r.createElement("svg", { viewBox: "0 0 24 24", width: "16", height: "16", stroke: "currentColor", strokeWidth: "2", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", __self: void 0, __source: {
    fileName: n,
    lineNumber: 9,
    columnNumber: 5
  } }, /* @__PURE__ */ r.createElement("path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22", __self: void 0, __source: {
    fileName: n,
    lineNumber: 19,
    columnNumber: 7
  } }));
  return {
    name: "GitHub",
    renderItemCardDetails: async ({
      item: a
    }) => {
      const i = a.pluginDatas.find((m) => m.pluginSlug === l.pluginSlug);
      if (!i)
        return null;
      const o = i.min, [, t, u, e] = o.url.match(/https:\/\/(?:api\.)?github\.com\/(?:repos\/)?([^/]+)\/([^/]+)\/pull(?:s)?\/([^/]+)/);
      return !t || !u ? null : [{
        fullWidth: !0,
        component: () => /* @__PURE__ */ r.createElement("a", { href: `https://github.com/${t}/${u}${e ? `/pull/${e}` : ""}`, target: "_blank", rel: "noopener noreferrer", __self: void 0, __source: {
          fileName: n,
          lineNumber: 37,
          columnNumber: 13
        } }, /* @__PURE__ */ r.createElement(s.Badge, { className: "flex w-fit items-center gap-1 bg-gray-200 text-gray-600", __self: void 0, __source: {
          fileName: n,
          lineNumber: 42,
          columnNumber: 15
        } }, c, /* @__PURE__ */ r.createElement("span", { className: "hover:underline", __self: void 0, __source: {
          fileName: n,
          lineNumber: 44,
          columnNumber: 17
        } }, t, "/", u, e ? `#${e}` : "")))
      }];
    },
    renderTaskCardDetails: async ({
      task: a
    }) => {
      const i = a.pluginDatas.find((m) => m.pluginSlug === l.pluginSlug);
      if (!i)
        return null;
      const o = i.min, [, t, u, e] = o.url.match(/https:\/\/(?:api\.)?github\.com\/(?:repos\/)?([^/]+)\/([^/]+)\/pull(?:s)?\/([^/]+)/);
      return [{
        fullWidth: !0,
        component: () => /* @__PURE__ */ r.createElement("a", { href: `https://github.com/${t}/${u}${e ? `/pull/${e}` : ""}`, target: "_blank", rel: "noopener noreferrer", __self: void 0, __source: {
          fileName: n,
          lineNumber: 65,
          columnNumber: 13
        } }, /* @__PURE__ */ r.createElement(s.Badge, { className: "flex w-fit items-center gap-1 bg-gray-200 text-gray-600", __self: void 0, __source: {
          fileName: n,
          lineNumber: 70,
          columnNumber: 15
        } }, c, /* @__PURE__ */ r.createElement("span", { className: "hover:underline", __self: void 0, __source: {
          fileName: n,
          lineNumber: 72,
          columnNumber: 17
        } }, t, "/", u, e ? `#${e}` : "")))
      }];
    }
  };
});
export {
  g as default
};
