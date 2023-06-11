const R = (n, l) => ({ slug: n, plugin: l }),
  { useEffect: d, useState: u } = React,
  f = R("essentials", (n) => {
    const l = n.components,
      { motion: y } = n.framerMotion,
      m = 5,
      i = (t) => (
        d(() => {
          const a = setTimeout(t.onNext, m * 1e3);
          return () => clearTimeout(a);
        }, []),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "flex h-screen w-screen items-center justify-center bg-gray-100",
            onClick: t.onNext,
          },
          /* @__PURE__ */ React.createElement(
            y.div,
            {
              className: "text-6xl font-semibold",
              animate: { opacity: [0, 1, 0] },
              transition: { duration: m, times: [0, 0.7, 1] },
            },
            t.children
          )
        )
      );
    return {
      name: "Essentials",
      routineSteps: {
        // Morning routine steps
        "intro-to-yesterday": {
          name: "Intro to yesterday",
          description: "Animated screen to get you in the mood to retrospect on yesterday.",
          component: (t) => /* @__PURE__ */ React.createElement(i, { ...t }, "Yesterday"),
        },
        "retro-on-yesterday": {
          name: "Retro on yesterday",
          description:
            "Retro on yesterday by writing down a note. The default template is a list of tasks you did yesterday, and headers for what went well and what didn't go well.",
          component: (t) => {
            const [a, o] = u(null),
              r = n.dayjs().subtract(1, "day");
            return (
              d(() => {
                (async () => {
                  const e = await n.getDays({
                    from: r.toDate(),
                    to: r.toDate(),
                    include: { tasks: !0 },
                  });
                  if (!e.length) {
                    o("");
                    return;
                  }
                  const s = e[0];
                  o(
                    `<ul>${s.tasks
                      .map(
                        (c) =>
                          `<li>${
                            c.status === "DONE" ? "✅" : c.status === "CANCELED" ? "❌" : "⏳"
                          } ${c.title}</li>`
                      )
                      .join("")}</ul>`
                  );
                })();
              }, []),
              /* @__PURE__ */ React.createElement(
                "div",
                null,
                /* @__PURE__ */ React.createElement(l.NoteEditor, {
                  slug: `flow-essentials_retro-${r.format("YYYY-MM-DD")}`,
                  title: `Retro of ${r.format("MMMM D")}`,
                  loading: a === null,
                  initialValue: a ?? "",
                }),
                /* @__PURE__ */ React.createElement(t.BackButton, null),
                /* @__PURE__ */ React.createElement(t.NextButton, null)
              )
            );
          },
        },
        "intro-to-today": {
          name: "Intro to today",
          description: "Animated screen to get you in the mood to plan for today.",
          component: (t) => /* @__PURE__ */ React.createElement(i, { ...t }, "Today"),
        },
        "plan-for-today": {
          name: "Plan for today",
          description:
            "Plan for today by dragging items from your different lists into today's list.",
          component: (t) => {
            const a = n.dayjs(),
              [o, r] = n.hooks.useAsyncLoader(
                async () =>
                  await n.getDays({
                    from: a.toDate(),
                    to: a.toDate(),
                    toRender: { Day: !0 },
                  })
              ),
              e = o == null ? void 0 : o[0];
            return r
              ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...")
              : /* @__PURE__ */ React.createElement(
                  "div",
                  null,
                  /* @__PURE__ */ React.createElement(
                    "div",
                    null,
                    /* @__PURE__ */ React.createElement(t.BackButton, null),
                    /* @__PURE__ */ React.createElement(t.NextButton, null)
                  ),
                  /* @__PURE__ */ React.createElement(l.Day, { day: e, label: "Today" })
                );
          },
        },
        "today-tomorrow-next-week": {
          name: "Today, tomorrow, next week",
          description:
            "Choose to move tasks from today to tomorrow or next week if you have too many.",
          component: (t) => {
            const a = n.dayjs(),
              o = a.add(1, "day"),
              r = a.weekday(7),
              [e, s] = n.hooks.useAsyncLoader(
                async () =>
                  await n.getDaysMax10({
                    dates: [a.toDate(), o.toDate(), r.toDate()],
                    toRender: { Day: !0 },
                  })
              );
            return s
              ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...")
              : /* @__PURE__ */ React.createElement(
                  "div",
                  null,
                  /* @__PURE__ */ React.createElement(
                    "div",
                    null,
                    /* @__PURE__ */ React.createElement(t.BackButton, null),
                    /* @__PURE__ */ React.createElement(t.NextButton, null)
                  ),
                  /* @__PURE__ */ React.createElement(
                    "div",
                    { className: "flex" },
                    /* @__PURE__ */ React.createElement(l.Day, {
                      day: e == null ? void 0 : e[0],
                      label: "Today",
                    }),
                    /* @__PURE__ */ React.createElement(l.Day, {
                      day: e == null ? void 0 : e[1],
                      label: "Tomorrow",
                    }),
                    /* @__PURE__ */ React.createElement(l.Day, {
                      day: e == null ? void 0 : e[2],
                      label: "Next week",
                    })
                  )
                );
          },
        },
        // TODO: Implement `decide-shutdown-time` step
        // "decide-shutdown-time": {
        //   component: (props) => {
        //     const handleSetShutdownTime =
        //     return (<></>)},
        // },
        "todays-plan": {
          name: "Today's plan",
          description:
            "Write down your plan for today so you can share it with others. By default, it's a list of tasks you plan to do today.",
          component: (t) => {
            const [a, o] = u(null),
              r = n.dayjs();
            return (
              d(() => {
                (async () => {
                  const e = await n.getDays({
                    from: r.toDate(),
                    to: r.toDate(),
                    include: { tasks: !0 },
                  });
                  if (!e.length) {
                    o("");
                    return;
                  }
                  const s = e[0];
                  o(
                    `<ul>${s.tasks
                      .map(
                        (c) =>
                          `<li>${
                            c.status === "DONE" ? "✅ " : c.status === "CANCELED" ? "❌ " : ""
                          }${c.title}</li>`
                      )
                      .join("")}</ul>`
                  );
                })();
              }, []),
              /* @__PURE__ */ React.createElement(
                "div",
                null,
                /* @__PURE__ */ React.createElement(l.NoteEditor, {
                  slug: `flow-essentials_retro-${r.format("YYYY-MM-DD")}`,
                  title: `Retro of ${r.format("MMMM D")}`,
                  loading: a === null,
                  initialValue: a ?? "",
                }),
                /* @__PURE__ */ React.createElement(t.BackButton, null),
                /* @__PURE__ */ React.createElement(t.NextButton, null)
              )
            );
          },
        },
        // Shutdown routine steps
        "intro-to-todays-shutdown": {
          name: "Intro to today's shutdown",
          description:
            "Animated screen to get you in the mood to shutdown and retrospect on today.",
          component: (t) =>
            /* @__PURE__ */ React.createElement(i, { ...t }, "Let's reflect on what you did today"),
        },
        "clean-up-today": {
          name: "Clean up today",
          description: "Clean up today by marking tasks as done or canceling tasks.",
          component: (t) => {
            const a = n.dayjs(),
              [o, r] = n.hooks.useAsyncLoader(
                async () =>
                  await n.getDays({
                    from: a.toDate(),
                    to: a.toDate(),
                    toRender: { Day: !0 },
                  })
              ),
              e = o == null ? void 0 : o[0];
            return r
              ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...")
              : /* @__PURE__ */ React.createElement(
                  "div",
                  null,
                  /* @__PURE__ */ React.createElement(
                    "div",
                    null,
                    /* @__PURE__ */ React.createElement(t.BackButton, null),
                    /* @__PURE__ */ React.createElement(t.NextButton, null)
                  ),
                  /* @__PURE__ */ React.createElement(l.Day, { day: e, label: "Today" })
                );
          },
        },
        "retro-on-today": {
          name: "Retro on today",
          description:
            "Retro on today by writing down a note. The default template is a list of tasks you did today, and headers for what went well and what didn't go well.",
          component: (t) => {
            const [a, o] = u(null),
              r = n.dayjs();
            return (
              d(() => {
                (async () => {
                  const e = await n.getDays({
                    from: r.toDate(),
                    to: r.toDate(),
                    include: { tasks: !0 },
                  });
                  if (!e.length) {
                    o("");
                    return;
                  }
                  const s = e[0];
                  o(
                    `<ul>${s.tasks
                      .map(
                        (c) =>
                          `<li>${
                            c.status === "DONE" ? "✅ " : c.status === "CANCELED" ? "❌ " : ""
                          }${c.title}</li>`
                      )
                      .join("")}</ul>`
                  );
                })();
              }, []),
              /* @__PURE__ */ React.createElement(
                "div",
                null,
                /* @__PURE__ */ React.createElement(l.NoteEditor, {
                  slug: `flow-essentials_retro-${r.format("YYYY-MM-DD")}`,
                  title: `Retro of ${r.format("MMMM D")}`,
                  loading: a === null,
                  initialValue: a ?? "",
                }),
                /* @__PURE__ */ React.createElement(t.BackButton, null),
                /* @__PURE__ */ React.createElement(t.NextButton, null)
              )
            );
          },
        },
        "intro-to-tomorrow": {
          name: "Intro to tomorrow",
          description: "Animated screen to get you in the mood to plan for tomorrow.",
          component: (t) => /* @__PURE__ */ React.createElement(i, { ...t }, "Tomorrow"),
        },
        "plan-for-tomorrow": {
          name: "Plan for tomorrow",
          description:
            "Plan for tomorrow by dragging items from your different lists into tomorrow's list.",
          component: (t) => {
            const a = n.dayjs().add(1, "day"),
              [o, r] = n.hooks.useAsyncLoader(
                async () =>
                  await n.getDays({
                    from: a.toDate(),
                    to: a.toDate(),
                    toRender: { Day: !0 },
                  })
              ),
              e = o == null ? void 0 : o[0];
            return r
              ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...")
              : /* @__PURE__ */ React.createElement(
                  "div",
                  null,
                  /* @__PURE__ */ React.createElement(
                    "div",
                    null,
                    /* @__PURE__ */ React.createElement(t.BackButton, null),
                    /* @__PURE__ */ React.createElement(t.NextButton, null)
                  ),
                  /* @__PURE__ */ React.createElement(l.Day, { day: e, label: "Tomorrow" })
                );
          },
        },
      },
    };
  });
export { f as default };
