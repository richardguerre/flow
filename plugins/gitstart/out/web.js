const S = (e) => ({ plugin: e }), b = "gitstart-session-token", h = S((e) => {
  const o = e.components, t = e.React;
  return {
    name: "GitStart",
    settings: {
      [b]: {
        type: "textfield",
        label: "Token",
        helper: "You can find this in your localStorage when logged in to GitStart under the key `user_token`.",
        isSecret: !0
        // once set, it cannot be seen again, but each time the setting is saved again it will be overwritten
      }
    },
    onCreateTask: async ({ task: n }) => {
      var r;
      return (r = n == null ? void 0 : n.item) != null && r.pluginDatas.some((l) => l.pluginSlug === "gitstart") ? {
        dialogContent: ({ NextButton: l, BackButton: a, ...i }) => {
          const { register: s, handleSubmit: c, formState: u, watch: m } = e.reactHookForm.useForm({ defaultValues: { title: n.title.value } }), d = m(), g = (f) => {
            i.onNext({ taskOverrides: { title: f.title } });
          };
          return /* @__PURE__ */ t.createElement("form", { onSubmit: c(g), className: "flex flex-col gap-4" }, /* @__PURE__ */ t.createElement(
            o.FormInput,
            {
              label: "Title",
              description: "The title of the task in GitStart.",
              ...s("title"),
              error: u.errors.title
            }
          ), /* @__PURE__ */ t.createElement("div", { className: "flex gap-2 self-end" }, /* @__PURE__ */ t.createElement(
            a,
            {
              type: "button",
              onClick: () => i.onBack({ taskOverrides: { title: d.title } })
            }
          ), /* @__PURE__ */ t.createElement(l, { type: "submit" })));
        }
      } : null;
    }
  };
});
export {
  h as default
};
