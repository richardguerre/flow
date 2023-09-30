const k = (c) => ({ plugin: c }), I = "gitstart-session-token", D = k((c) => {
  const t = c.components, e = c.React, p = /* @__PURE__ */ e.createElement("svg", { width: "24", height: "24", viewBox: "0 0 82 81", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("ellipse", { cx: "41", cy: "40.5", rx: "41", ry: "40.5", fill: "#FCEED4" }), /* @__PURE__ */ e.createElement(
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
  )), E = /* @__PURE__ */ e.createElement(
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
  ), N = (l) => /* @__PURE__ */ e.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: l.size ?? "16",
      height: l.size ?? "16",
      fill: "currentColor",
      className: l.className,
      viewBox: "0 0 16 16"
    },
    /* @__PURE__ */ e.createElement("path", { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" })
  );
  return {
    name: "GitStart",
    settings: {
      [I]: {
        type: "textfield",
        label: "Token",
        description: "You can find this in your localStorage when logged in to GitStart under the key `user_token`.",
        placeholder: "Paste your GitStart token here",
        isSecret: !0
        // once set, it cannot be seen again, but each time the setting is saved again it will be overwritten
      }
    },
    onCreateTask: async ({ task: l }) => {
      var n;
      return (n = l == null ? void 0 : l.item) != null && n.pluginDatas.some((a) => a.pluginSlug === "gitstart") ? {
        dialogContent: ({ NextButton: a, BackButton: r, ...i }) => {
          const { register: u, handleSubmit: C, formState: m, watch: y, control: x } = c.reactHookForm.useForm(), g = y(), f = (s) => {
            i.onNext({
              taskOverrides: { title: s.title },
              actionData: { type: s.type, status: s.status }
            });
          }, h = c.dayjs().isSame(l.date.value, "day"), S = c.dayjs().isAfter(l.date.value, "day");
          return /* @__PURE__ */ e.createElement("form", { onSubmit: C(f), className: "mt-4 flex flex-col gap-4" }, /* @__PURE__ */ e.createElement(
            "input",
            {
              defaultValue: l.title.value,
              className: "ring-none placeholder:text-foreground-700 text-foreground-900 bg-transparent text-lg focus:outline-none",
              ...u("title", { required: "The task's title is required." })
            }
          ), /* @__PURE__ */ e.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ e.createElement(
            t.FormCombobox,
            {
              name: "type",
              defaultValue: "CODE",
              control: x,
              rules: {
                required: "The task's type is required."
              }
            },
            /* @__PURE__ */ e.createElement(t.ComboboxTrigger, { role: "combobox" }, /* @__PURE__ */ e.createElement(
              t.ComboboxValue,
              {
                renderValue: (s) => {
                  const o = b[s];
                  return /* @__PURE__ */ e.createElement(t.Badge, { className: o.className }, o.label);
                }
              }
            )),
            /* @__PURE__ */ e.createElement(t.ComboboxContent, { className: "w-50 p-0", align: "start" }, /* @__PURE__ */ e.createElement(t.ComboboxInput, { placeholder: "Search type..." }), /* @__PURE__ */ e.createElement(t.ComboboxEmpty, null, "No type found."), /* @__PURE__ */ e.createElement(t.ComboboxGroup, null, Object.entries(b).map(([s, o]) => /* @__PURE__ */ e.createElement(
              t.ComboboxItem,
              {
                key: s,
                value: s,
                className: "flex items-center gap-2"
              },
              /* @__PURE__ */ e.createElement(
                t.ComboboxSelected,
                {
                  className: "opacity-0",
                  selectedClassName: "opacity-100"
                },
                /* @__PURE__ */ e.createElement(N, { className: "text-foreground-900 h-6" })
              ),
              /* @__PURE__ */ e.createElement(t.Badge, { className: o.className }, o.label)
            ))))
          ), /* @__PURE__ */ e.createElement(
            t.FormCombobox,
            {
              name: "status",
              defaultValue: h || S ? "IN_PROGRESS" : "TO_DO",
              control: x,
              rules: {
                required: "The task's status is required."
              }
            },
            /* @__PURE__ */ e.createElement(t.ComboboxTrigger, null, /* @__PURE__ */ e.createElement(
              t.ComboboxValue,
              {
                renderValue: (s) => {
                  const o = d[s];
                  return /* @__PURE__ */ e.createElement(t.Badge, { className: o.className }, o.label);
                }
              }
            )),
            /* @__PURE__ */ e.createElement(t.ComboboxContent, { className: "w-50 p-0", align: "start" }, /* @__PURE__ */ e.createElement(t.ComboboxInput, { placeholder: "Search status..." }), /* @__PURE__ */ e.createElement(t.ComboboxEmpty, null, "No status found."), /* @__PURE__ */ e.createElement(t.ComboboxGroup, null, Object.entries(d).map(([s, o]) => /* @__PURE__ */ e.createElement(
              t.ComboboxItem,
              {
                key: s,
                value: s,
                className: "flex items-center gap-2"
              },
              /* @__PURE__ */ e.createElement(
                t.ComboboxSelected,
                {
                  className: "opacity-0",
                  selectedClassName: "opacity-100"
                },
                /* @__PURE__ */ e.createElement(N, { className: "text-foreground-900 h-6" })
              ),
              /* @__PURE__ */ e.createElement(t.Badge, { className: o.className }, o.label)
            ))))
          )), m.errors.title && /* @__PURE__ */ e.createElement("div", { className: "text-negative-600 text-sm" }, m.errors.title.message), m.errors.type && /* @__PURE__ */ e.createElement("div", { className: "text-negative-600 text-sm" }, m.errors.type.message), m.errors.status && /* @__PURE__ */ e.createElement("div", { className: "text-negative-600 text-sm" }, m.errors.status.message), /* @__PURE__ */ e.createElement("div", { className: "flex gap-2 self-end" }, /* @__PURE__ */ e.createElement(
            r,
            {
              type: "button",
              onClick: () => i.onBack({
                taskOverrides: { title: g.title },
                actionData: { type: g.type, status: g.status }
              })
            }
          ), /* @__PURE__ */ e.createElement(a, { type: "submit" })));
        }
      } : null;
    },
    renderTaskCardDetails: async ({ task: l }) => {
      const n = l.pluginDatas.find((u) => u.pluginSlug === "gitstart");
      if (!n)
        return null;
      const a = n.min, r = b[a.type], i = d[a.status];
      return [
        {
          component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: r.className }, r.label)
        },
        {
          component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: i.className }, i.label)
        }
      ];
    },
    renderTaskCardActions: async ({ task: l }) => {
      const n = l.pluginDatas.find((r) => r.pluginSlug === "gitstart");
      if (!n)
        return null;
      const a = n.min;
      return [
        {
          component: () => a.githubPrUrl ? /* @__PURE__ */ e.createElement("a", { href: a.githubPrUrl, target: "_blank", rel: "noreferrer" }, /* @__PURE__ */ e.createElement(t.CardActionButton, null, E)) : null
        },
        {
          component: () => /* @__PURE__ */ e.createElement("a", { href: a.ticketUrl, target: "_blank", rel: "noreferrer" }, p)
        }
      ];
    },
    renderItemCardDetails: async ({ item: l }) => {
      const n = l.pluginDatas.find((r) => r.pluginSlug === "gitstart");
      if (!n)
        return null;
      const a = n.min;
      if (a.type === "pull_request") {
        const r = w[a.status];
        return [
          {
            component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: "bg-green-100 text-green-700" }, "PR")
          },
          {
            component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: r.className }, r.label)
          }
        ];
      } else if (a.type === "ticket") {
        const r = v[a.status];
        return [
          {
            component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: "bg-gray-200 text-gray-600" }, "Ticket")
          },
          {
            component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: r.className }, r.label)
          }
        ];
      }
      return null;
    },
    renderItemCardActions: async ({ item: l }) => {
      const n = l.pluginDatas.find((r) => r.pluginSlug === "gitstart");
      if (!n)
        return null;
      const a = n.min;
      return [
        {
          component: () => a.type === "pull_request" && a.url ? /* @__PURE__ */ e.createElement("a", { href: a.url, target: "_blank", rel: "noreferrer" }, /* @__PURE__ */ e.createElement(t.CardActionButton, null, E)) : null
        },
        {
          component: () => /* @__PURE__ */ e.createElement("a", { href: a.ticketUrl, target: "_blank", rel: "noreferrer" }, p)
        }
      ];
    }
  };
}), b = {
  SPEC: { label: "Spec", className: "bg-gray-200 text-gray-600" },
  CODE: { label: "Code", className: "bg-blue-100 text-blue-600" },
  REVIEW: { label: "Review", className: "bg-yellow-100 text-yellow-600" },
  QA: { label: "QA", className: "bg-purple-100 text-purple-600" },
  LEARNING: { label: "Learning", className: "bg-green-100 text-green-700" }
}, d = {
  TO_DO: { label: "To do", className: "bg-gray-200 text-gray-600" },
  IN_PROGRESS: { label: "In progress", className: "bg-blue-100 text-blue-600" },
  FINISHED: { label: "Finished", className: "bg-green-100 text-green-700" },
  CANCELED: { label: "Canceled", className: "bg-red-100 text-red-600" }
}, w = {
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
}, v = {
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
  D as default
};
