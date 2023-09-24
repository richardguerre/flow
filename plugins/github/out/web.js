const m = (n) => ({ plugin: n }), g = m((n) => {
  const c = n.components, t = n.React, s = /* @__PURE__ */ t.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      stroke: "currentColor",
      strokeWidth: "2",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
    /* @__PURE__ */ t.createElement("path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" })
  );
  return {
    name: "GitHub",
    renderItemCardDetails: async ({ item: i }) => {
      const l = i.pluginDatas.find((u) => u.pluginSlug === n.pluginSlug);
      if (!l)
        return null;
      const o = l.min, [, r, a, e] = o.url.match(
        /https:\/\/(?:api\.)?github\.com\/(?:repos\/)?([^/]+)\/([^/]+)\/pull(?:s)?\/([^/]+)/
      );
      return !r || !a ? null : [
        {
          fullWidth: !0,
          component: () => /* @__PURE__ */ t.createElement(
            "a",
            {
              href: `https://github.com/${r}/${a}${e ? `/pull/${e}` : ""}`,
              target: "_blank",
              rel: "noopener noreferrer"
            },
            /* @__PURE__ */ t.createElement(c.Badge, { className: "flex w-fit items-center gap-1 bg-gray-200 text-gray-600" }, s, /* @__PURE__ */ t.createElement("span", { className: "hover:underline" }, r, "/", a, e ? `#${e}` : ""))
          )
        }
      ];
    },
    renderTaskCardDetails: async ({ task: i }) => {
      const l = i.pluginDatas.find((u) => u.pluginSlug === n.pluginSlug);
      if (!l)
        return null;
      const o = l.min, [, r, a, e] = o.url.match(
        /https:\/\/(?:api\.)?github\.com\/(?:repos\/)?([^/]+)\/([^/]+)\/pull(?:s)?\/([^/]+)/
      );
      return [
        {
          fullWidth: !0,
          component: () => /* @__PURE__ */ t.createElement(
            "a",
            {
              href: `https://github.com/${r}/${a}${e ? `/pull/${e}` : ""}`,
              target: "_blank",
              rel: "noopener noreferrer"
            },
            /* @__PURE__ */ t.createElement(c.Badge, { className: "flex w-fit items-center gap-1 bg-gray-200 text-gray-600" }, s, /* @__PURE__ */ t.createElement("span", { className: "hover:underline" }, r, "/", a, e ? `#${e}` : ""))
          )
        }
      ];
    }
  };
});
export {
  g as default
};
