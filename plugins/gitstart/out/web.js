const N = (s) => ({ plugin: s }), C = "gitstart-session-token", h = N((s) => {
  const r = s.components, e = s.React, i = /* @__PURE__ */ e.createElement("svg", { width: "24", height: "24", viewBox: "0 0 82 81", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("ellipse", { cx: "41", cy: "40.5", rx: "41", ry: "40.5", fill: "#FCEED4" }), /* @__PURE__ */ e.createElement(
    "path",
    {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M37.9809 58.0204C47.0248 58.0204 54.3563 50.6889 54.3563 41.645C54.3563 32.6011 47.0248 25.2696 37.9809 25.2696C28.9371 25.2696 21.6056 32.6011 21.6056 41.645C21.6056 50.6889 28.9371 58.0204 37.9809 58.0204ZM37.9809 61.6884C49.0506 61.6884 58.0244 52.7147 58.0244 41.645C58.0244 30.5753 49.0506 21.6016 37.9809 21.6016C26.9113 21.6016 17.9375 30.5753 17.9375 41.645C17.9375 52.7147 26.9113 61.6884 37.9809 61.6884Z",
      fill: "black"
    }
  ), /* @__PURE__ */ e.createElement(
    "path",
    {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M61.7881 28.5227C62.9758 28.5227 63.9386 27.5599 63.9386 26.3722C63.9386 25.1845 62.9758 24.2216 61.7881 24.2216C60.6003 24.2216 59.6375 25.1845 59.6375 26.3722C59.6375 27.5599 60.6003 28.5227 61.7881 28.5227ZM61.7881 31.1428C64.4228 31.1428 66.5587 29.0069 66.5587 26.3722C66.5587 23.7374 64.4228 21.6016 61.7881 21.6016C59.1533 21.6016 57.0175 23.7374 57.0175 26.3722C57.0175 29.0069 59.1533 31.1428 61.7881 31.1428Z",
      fill: "black"
    }
  )), g = /* @__PURE__ */ e.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      stroke: "currentColor",
      "stroke-width": "2",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    },
    /* @__PURE__ */ e.createElement("path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" })
  );
  return {
    name: "GitStart",
    settings: {
      [C]: {
        type: "textfield",
        label: "Token",
        helper: "You can find this in your localStorage when logged in to GitStart under the key `user_token`.",
        isSecret: !0
        // once set, it cannot be seen again, but each time the setting is saved again it will be overwritten
      }
    },
    onCreateTask: async ({ task: n }) => {
      var a;
      return (a = n == null ? void 0 : n.item) != null && a.pluginDatas.some((t) => t.pluginSlug === "gitstart") ? {
        dialogContent: ({ NextButton: t, BackButton: l, ...c }) => {
          const { register: o, handleSubmit: u, formState: m, watch: b } = s.reactHookForm.useForm({ defaultValues: { title: n.title.value } }), d = b(), p = (E) => {
            c.onNext({ taskOverrides: { title: E.title } });
          };
          return /* @__PURE__ */ e.createElement("form", { onSubmit: u(p), className: "flex flex-col gap-4" }, /* @__PURE__ */ e.createElement(
            r.FormInput,
            {
              label: "Title",
              description: "The title of the task in GitStart.",
              ...o("title"),
              error: m.errors.title
            }
          ), /* @__PURE__ */ e.createElement("div", { className: "flex gap-2 self-end" }, /* @__PURE__ */ e.createElement(
            l,
            {
              type: "button",
              onClick: () => c.onBack({ taskOverrides: { title: d.title } })
            }
          ), /* @__PURE__ */ e.createElement(t, { type: "submit" })));
        }
      } : null;
    },
    renderTaskCardDetails: async ({ task: n }) => {
      const a = n.pluginDatas.find((o) => o.pluginSlug === "gitstart");
      if (!a)
        return null;
      const t = a.min, l = f[t.type], c = x[t.status];
      return [
        {
          component: () => /* @__PURE__ */ e.createElement(r.Badge, { className: l.className }, l.label)
        },
        {
          component: () => /* @__PURE__ */ e.createElement(r.Badge, { className: c.className }, c.label)
        }
      ];
    },
    renderTaskCardActions: async ({ task: n }) => {
      const a = n.pluginDatas.find((l) => l.pluginSlug === "gitstart");
      if (!a)
        return null;
      const t = a.min;
      return [
        {
          component: () => t.githubPrUrl ? /* @__PURE__ */ e.createElement("a", { href: t.githubPrUrl, target: "_blank", rel: "noreferrer" }, /* @__PURE__ */ e.createElement(r.CardActionButton, null, g)) : null
        },
        {
          component: () => /* @__PURE__ */ e.createElement("a", { href: t.ticketUrl, target: "_blank", rel: "noreferrer" }, i)
        }
      ];
    },
    renderItemCardDetails: async ({ item: n }) => {
      const a = n.pluginDatas.find((l) => l.pluginSlug === "gitstart");
      if (!a)
        return null;
      const t = a.min;
      if (t.type === "pull_request") {
        const l = y[t.status];
        return [
          {
            component: () => /* @__PURE__ */ e.createElement(r.Badge, { className: "bg-green-100 text-green-700" }, "PR")
          },
          {
            component: () => /* @__PURE__ */ e.createElement(r.Badge, { className: l.className }, l.label)
          }
        ];
      } else if (t.type === "ticket") {
        const l = S[t.status];
        return [
          {
            component: () => /* @__PURE__ */ e.createElement(r.Badge, { className: "bg-gray-200 text-gray-600" }, "Ticket")
          },
          {
            component: () => /* @__PURE__ */ e.createElement(r.Badge, { className: l.className }, l.label)
          }
        ];
      }
      return null;
    },
    renderItemCardActions: async ({ item: n }) => {
      const a = n.pluginDatas.find((l) => l.pluginSlug === "gitstart");
      if (!a)
        return null;
      const t = a.min;
      return [
        {
          component: () => t.type === "pull_request" && t.url ? /* @__PURE__ */ e.createElement("a", { href: t.url, target: "_blank", rel: "noreferrer" }, /* @__PURE__ */ e.createElement(r.CardActionButton, null, g)) : null
        },
        {
          component: () => /* @__PURE__ */ e.createElement("a", { href: t.ticketUrl, target: "_blank", rel: "noreferrer" }, i)
        }
      ];
    }
  };
}), f = {
  SPEC: { label: "Spec", className: "bg-gray-200 text-gray-600" },
  CODE: { label: "Code", className: "bg-blue-100 text-blue-600" },
  REVIEW: { label: "Review", className: "bg-yellow-100 text-yellow-600" },
  QA: { label: "QA", className: "bg-purple-100 text-purple-600" },
  LEARNING: { label: "Learning", className: "bg-green-100 text-green-700" }
}, x = {
  TO_DO: { label: "To do", className: "bg-gray-200 text-gray-600" },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-blue-100 text-blue-600"
  },
  FINISHED: { label: "Finished", className: "bg-green-100 text-green-700" },
  CANCELED: { label: "Canceled", className: "bg-red-100 text-red-600" }
}, y = {
  PLANNED: { label: "Planned", className: "bg-gray-200 text-gray-600" },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-blue-100 text-blue-600"
  },
  INTERNAL_REVIEW: {
    label: "Internal review",
    className: "bg-yellow-100 text-yellow-600"
  },
  CLIENT_REVIEW: {
    label: "Client review",
    className: "bg-purple-100 text-purple-600"
  },
  CANCELED: { label: "Canceled", className: "bg-red-100 text-red-600" },
  APPROVED: { label: "Approved", className: "bg-green-100 text-green-700" },
  MERGED: { label: "Merged", className: "bg-green-100 text-green-700" }
}, S = {
  BACKLOG: { label: "Backlog", className: "bg-gray-200 text-gray-600" },
  AVAILABLE: {
    label: "Available",
    className: "bg-blue-100 text-blue-600"
  },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-yellow-100 text-yellow-600"
  },
  PAUSED: {
    label: "Paused",
    className: "bg-purple-100 text-purple-600"
  },
  FINISHED: { label: "Finished", className: "bg-green-100 text-green-700" },
  CANCELED: { label: "Canceled", className: "bg-red-100 text-red-600" }
};
export {
  h as default
};
