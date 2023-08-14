const y = (a, s) => ({ slug: a, plugin: s }), f = y("essentials", (a) => {
  const s = a.components, { motion: m } = a.framerMotion, t = a.React, u = 5, c = (e) => (t.useEffect(() => {
    const o = setTimeout(e.onNext, u * 1e3);
    return () => clearTimeout(o);
  }, []), /* @__PURE__ */ t.createElement(
    "div",
    {
      className: "flex h-screen w-screen items-center justify-center bg-gray-100",
      onClick: e.onNext
    },
    /* @__PURE__ */ t.createElement(
      m.div,
      {
        className: "text-6xl font-semibold",
        animate: { opacity: [0, 1, 0] },
        transition: { duration: u, times: [0, 0.7, 1] }
      },
      e.children
    )
  ));
  return {
    name: "Essentials",
    routineSteps: {
      // Morning routine steps
      "intro-to-yesterday": {
        name: "Intro to yesterday",
        description: "Animated screen to get you in the mood to retrospect on yesterday.",
        component: (e) => /* @__PURE__ */ t.createElement(c, { ...e }, "Yesterday")
      },
      "retro-on-yesterday": {
        name: "Retro on yesterday",
        description: "Retro on yesterday by writing down a note. The default template is a list of tasks you did yesterday, and headers for what went well and what didn't go well.",
        component: (e) => {
          const [o, r] = t.useState(null), l = a.dayjs().subtract(1, "day");
          return t.useEffect(() => {
            (async () => {
              const n = await a.getDays({
                from: l.toDate(),
                to: l.toDate(),
                include: { tasks: !0 }
              });
              if (!n.length) {
                r("");
                return;
              }
              const d = n[0];
              r(
                `<ul>${d.tasks.map(
                  (i) => `<li>${i.status === "DONE" ? "✅" : i.status === "CANCELED" ? "❌" : "⏳"} ${i.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement(
            s.NoteEditor,
            {
              slug: `flow-essentials_retro-${l.format("YYYY-MM-DD")}`,
              title: `Retro of ${l.format("MMMM D")}`,
              loading: o === null,
              initialValue: o ?? ""
            }
          ), /* @__PURE__ */ t.createElement(e.BackButton, null), /* @__PURE__ */ t.createElement(e.NextButton, null));
        }
      },
      "intro-to-today": {
        name: "Intro to today",
        description: "Animated screen to get you in the mood to plan for today.",
        component: (e) => /* @__PURE__ */ t.createElement(c, { ...e }, "Today")
      },
      "plan-for-today": {
        name: "Plan for today",
        description: "Plan for today by dragging items from your different lists into today's list.",
        component: (e) => {
          const o = a.dayjs(), [r, l] = a.hooks.useAsyncLoader(async () => await a.getDays({
            from: o.toDate(),
            to: o.toDate(),
            toRender: { Day: !0 }
          })), n = r == null ? void 0 : r[0];
          return l ? /* @__PURE__ */ t.createElement(t.Fragment, null, "Loading...") : /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement(e.BackButton, null), /* @__PURE__ */ t.createElement(e.NextButton, null)), /* @__PURE__ */ t.createElement(s.Day, { day: n, label: "Today" }));
        }
      },
      "today-tomorrow-next-week": {
        name: "Today, tomorrow, next week",
        description: "Choose to move tasks from today to tomorrow or next week if you have too many.",
        component: (e) => {
          const o = a.dayjs(), r = o.add(1, "day"), l = o.weekday(7), [n, d] = a.hooks.useAsyncLoader(async () => await a.getDaysMax10({
            dates: [o.toDate(), r.toDate(), l.toDate()],
            toRender: { Day: !0 }
          }));
          return d ? /* @__PURE__ */ t.createElement(t.Fragment, null, "Loading...") : /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement(e.BackButton, null), /* @__PURE__ */ t.createElement(e.NextButton, null)), /* @__PURE__ */ t.createElement("div", { className: "flex" }, /* @__PURE__ */ t.createElement(s.Day, { day: n == null ? void 0 : n[0], label: "Today" }), /* @__PURE__ */ t.createElement(s.Day, { day: n == null ? void 0 : n[1], label: "Tomorrow" }), /* @__PURE__ */ t.createElement(s.Day, { day: n == null ? void 0 : n[2], label: "Next week" })));
        }
      },
      // TODO: Implement `decide-shutdown-time` step
      // "decide-shutdown-time": {
      //   component: (props) => {
      //     const handleSetShutdownTime =
      //     return (<></>)},
      // },
      "todays-plan": {
        name: "Today's plan",
        description: "Write down your plan for today so you can share it with others. By default, it's a list of tasks you plan to do today.",
        component: (e) => {
          const [o, r] = t.useState(null), l = a.dayjs();
          return t.useEffect(() => {
            (async () => {
              const n = await a.getDays({
                from: l.toDate(),
                to: l.toDate(),
                include: { tasks: !0 }
              });
              if (!n.length) {
                r("");
                return;
              }
              const d = n[0];
              r(
                `<ul>${d.tasks.map(
                  (i) => `<li>${i.status === "DONE" ? "✅ " : i.status === "CANCELED" ? "❌ " : ""}${i.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement(
            s.NoteEditor,
            {
              slug: `flow-essentials_retro-${l.format("YYYY-MM-DD")}`,
              title: `Plan for ${l.format("MMMM D")}`,
              loading: o === null,
              initialValue: o ?? ""
            }
          ), /* @__PURE__ */ t.createElement(e.BackButton, null), /* @__PURE__ */ t.createElement(e.NextButton, null));
        }
      },
      // Shutdown routine steps
      "intro-to-todays-shutdown": {
        name: "Intro to today's shutdown",
        description: "Animated screen to get you in the mood to shutdown and retrospect on today.",
        component: (e) => /* @__PURE__ */ t.createElement(c, { ...e }, "Let's reflect on what you did today")
      },
      "clean-up-today": {
        name: "Clean up today",
        description: "Clean up today by marking tasks as done or canceling tasks.",
        component: (e) => {
          const o = a.dayjs(), [r, l] = a.hooks.useAsyncLoader(async () => await a.getDays({
            from: o.toDate(),
            to: o.toDate(),
            toRender: { Day: !0 }
          })), n = r == null ? void 0 : r[0];
          return l ? /* @__PURE__ */ t.createElement(t.Fragment, null, "Loading...") : /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement(e.BackButton, null), /* @__PURE__ */ t.createElement(e.NextButton, null)), /* @__PURE__ */ t.createElement(s.Day, { day: n, label: "Today" }));
        }
      },
      "retro-on-today": {
        name: "Retro on today",
        description: "Retro on today by writing down a note. The default template is a list of tasks you did today, and headers for what went well and what didn't go well.",
        component: (e) => {
          const [o, r] = t.useState(null), l = a.dayjs();
          return t.useEffect(() => {
            (async () => {
              const n = await a.getDays({
                from: l.toDate(),
                to: l.toDate(),
                include: { tasks: !0 }
              });
              if (!n.length) {
                r("");
                return;
              }
              const d = n[0];
              r(
                `<ul>${d.tasks.map(
                  (i) => `<li>${i.status === "DONE" ? "✅ " : i.status === "CANCELED" ? "❌ " : ""}${i.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement(
            s.NoteEditor,
            {
              slug: `flow-essentials_retro-${l.format("YYYY-MM-DD")}`,
              title: `Retro of ${l.format("MMMM D")}`,
              loading: o === null,
              initialValue: o ?? ""
            }
          ), /* @__PURE__ */ t.createElement(e.BackButton, null), /* @__PURE__ */ t.createElement(e.NextButton, null));
        }
      },
      "intro-to-tomorrow": {
        name: "Intro to tomorrow",
        description: "Animated screen to get you in the mood to plan for tomorrow.",
        component: (e) => /* @__PURE__ */ t.createElement(c, { ...e }, "Tomorrow")
      },
      "plan-for-tomorrow": {
        name: "Plan for tomorrow",
        description: "Plan for tomorrow by dragging items from your different lists into tomorrow's list.",
        component: (e) => {
          const o = a.dayjs().add(1, "day"), [r, l] = a.hooks.useAsyncLoader(async () => await a.getDays({
            from: o.toDate(),
            to: o.toDate(),
            toRender: { Day: !0 }
          })), n = r == null ? void 0 : r[0];
          return l ? /* @__PURE__ */ t.createElement(t.Fragment, null, "Loading...") : /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement("div", null, /* @__PURE__ */ t.createElement(e.BackButton, null), /* @__PURE__ */ t.createElement(e.NextButton, null)), /* @__PURE__ */ t.createElement(s.Day, { day: n, label: "Tomorrow" }));
        }
      }
    }
  };
});
export {
  f as default
};
