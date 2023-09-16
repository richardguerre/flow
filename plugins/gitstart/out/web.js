const f = (t) => ({ plugin: t }), b = "gitstart-session-token", h = f((t) => {
  const l = t.components, e = t.React;
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
      var i;
      return (i = n == null ? void 0 : n.item) != null && i.pluginDatas.some((r) => r.pluginSlug === "gitstart") ? {
        dialogContent: ({ NextButton: r, BackButton: a, ...o }) => {
          const { register: s, handleSubmit: u, formState: c, watch: m } = t.reactHookForm.useForm({ defaultValues: { title: n.title.value } }), d = m(), g = (S) => {
            o.onNext({ taskOverrides: { title: S.title } });
          };
          return /* @__PURE__ */ e.createElement("form", { onSubmit: u(g) }, /* @__PURE__ */ e.createElement(
            l.FormInput,
            {
              label: "Title",
              description: "The title of the task in GitStart.",
              ...s("title"),
              error: c.errors.title
            }
          ), /* @__PURE__ */ e.createElement(r, { type: "submit" }), /* @__PURE__ */ e.createElement(
            a,
            {
              type: "button",
              onClick: () => o.onBack({ taskOverrides: { title: d.title } })
            }
          ));
        }
      } : null;
    }
  };
});
export {
  h as default
};
