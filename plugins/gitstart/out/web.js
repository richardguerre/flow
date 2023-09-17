const N = (n) => ({ plugin: n }), E = "gitstart-session-token", S = N((n) => {
  const c = n.components, t = n.React;
  return {
    name: "GitStart",
    settings: {
      [E]: {
        type: "textfield",
        label: "Token",
        helper: "You can find this in your localStorage when logged in to GitStart under the key `user_token`.",
        isSecret: !0
        // once set, it cannot be seen again, but each time the setting is saved again it will be overwritten
      }
    },
    onCreateTask: async ({ task: a }) => {
      var s;
      return (s = a == null ? void 0 : a.item) != null && s.pluginDatas.some((l) => l.pluginSlug === "gitstart") ? {
        dialogContent: ({ NextButton: l, BackButton: o, ...r }) => {
          const { register: i, handleSubmit: u, formState: m, watch: g } = n.reactHookForm.useForm({ defaultValues: { title: a.title.value } }), b = g(), d = (p) => {
            r.onNext({ taskOverrides: { title: p.title } });
          };
          return /* @__PURE__ */ t.createElement("form", { onSubmit: u(d), className: "flex flex-col gap-4" }, /* @__PURE__ */ t.createElement(
            c.FormInput,
            {
              label: "Title",
              description: "The title of the task in GitStart.",
              ...i("title"),
              error: m.errors.title
            }
          ), /* @__PURE__ */ t.createElement("div", { className: "flex gap-2 self-end" }, /* @__PURE__ */ t.createElement(
            o,
            {
              type: "button",
              onClick: () => r.onBack({ taskOverrides: { title: b.title } })
            }
          ), /* @__PURE__ */ t.createElement(l, { type: "submit" })));
        }
      } : null;
    },
    renderTaskCardDetails: async ({ task: a }) => {
      const s = a.pluginDatas.find((i) => i.pluginSlug === "gitstart");
      if (!s)
        return null;
      const l = s.min, o = f[l.type], r = x[l.status];
      return [
        { component: () => /* @__PURE__ */ t.createElement("div", { className: o.className }, o.label) },
        { component: () => /* @__PURE__ */ t.createElement("div", { className: r.className }, r.label) }
      ];
    }
  };
}), e = "inline-flex h-min rounded px-1 py-0.25 text-sm", f = {
  SPEC: { label: "Spec", className: `bg-gray-200 text-gray-600 ${e}` },
  CODE: { label: "Code", className: `bg-blue-100 text-blue-600 ${e}` },
  REVIEW: { label: "Review", className: `bg-yellow-100 text-yellow-600 ${e}` },
  QA: { label: "QA", className: `bg-purple-100 text-purple-600 ${e}` },
  LEARNING: { label: "Learning", className: `bg-green-100 text-green-700 ${e}` }
}, x = {
  TO_DO: { label: "To do", className: `bg-gray-200 text-gray-600 ${e}` },
  IN_PROGRESS: {
    label: "In progress",
    className: `bg-blue-100 text-blue-600 ${e}`
  },
  FINISHED: { label: "Finished", className: `bg-green-100 text-green-700 ${e}` },
  CANCELED: { label: "Canceled", className: `bg-red-100 text-red-600 ${e}` }
};
export {
  S as default
};
