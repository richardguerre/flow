const f = (a) => ({ plugin: a });
var t = "/Users/richardguerre/Projects/flow/plugins/essentials/src/web.tsx";
const N = f((a) => {
  const i = a.components, {
    motion: _
  } = a.framerMotion, e = a.React, d = 5, c = (o) => (e.useEffect(() => {
    const l = setTimeout(o.onNext, d * 1e3);
    return () => clearTimeout(l);
  }, []), /* @__PURE__ */ e.createElement("div", { className: "flex h-screen w-full items-center justify-center bg-background-100", onClick: o.onNext, __self: void 0, __source: {
    fileName: t,
    lineNumber: 18,
    columnNumber: 7
  } }, /* @__PURE__ */ e.createElement(_.div, { className: "text-6xl font-semibold", animate: {
    opacity: [0, 1, 0]
  }, transition: {
    duration: d,
    times: [0, 0.7, 1]
  }, __self: void 0, __source: {
    fileName: t,
    lineNumber: 22,
    columnNumber: 9
  } }, o.children)));
  return {
    name: "Essentials",
    routineSteps: {
      // Morning routine steps
      "intro-to-yesterday": {
        name: "Intro to yesterday",
        description: "Animated screen to get you in the mood to retrospect on yesterday.",
        component: (o) => /* @__PURE__ */ e.createElement(c, { ...o, __self: void 0, __source: {
          fileName: t,
          lineNumber: 40,
          columnNumber: 31
        } }, "Yesterday")
      },
      "retro-on-yesterday": {
        name: "Retro on yesterday",
        description: "Retro on yesterday by writing down a note. The default template is a list of tasks you did yesterday, and headers for what went well and what didn't go well.",
        component: (o) => {
          const [l, r] = e.useState(null), m = a.dayjs().subtract(1, "day");
          return e.useEffect(() => {
            (async () => {
              const n = await a.getDays({
                from: m.toDate(),
                to: m.toDate(),
                include: {
                  tasks: !0
                }
              });
              if (!n.length) {
                r("");
                return;
              }
              const s = n[0];
              r(`<ul>${s.tasks.map((u) => `<li><p>${u.status === "DONE" ? "✅" : u.status === "CANCELED" ? "❌" : "⏳"} ${u.title}</p></li>`).join("")}</ul>`);
            })();
          }, []), /* @__PURE__ */ e.createElement("div", { className: "w-full flex flex-col items-center", __self: void 0, __source: {
            fileName: t,
            lineNumber: 84,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { className: "flex flex-col items-start mt-36 w-2xl", __self: void 0, __source: {
            fileName: t,
            lineNumber: 85,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement("h1", { className: "font-semibold text-3xl", __self: void 0, __source: {
            fileName: t,
            lineNumber: 86,
            columnNumber: 17
          } }, "Reflect on what you did yesterday"), /* @__PURE__ */ e.createElement(i.NoteEditor, { slug: `flow-essentials_retro-${m.format("YYYY-MM-DD")}`, title: `Retro of ${m.format("MMMM D")}`, loading: l === null, initialValue: l ?? "", __self: void 0, __source: {
            fileName: t,
            lineNumber: 87,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement("div", { className: "flex gap-2", __self: void 0, __source: {
            fileName: t,
            lineNumber: 93,
            columnNumber: 17
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 94,
            columnNumber: 19
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 95,
            columnNumber: 19
          } }))));
        }
      },
      "intro-to-today": {
        name: "Intro to today",
        description: "Animated screen to get you in the mood to plan for today.",
        component: (o) => /* @__PURE__ */ e.createElement(c, { ...o, __self: void 0, __source: {
          fileName: t,
          lineNumber: 105,
          columnNumber: 31
        } }, "Today")
      },
      "plan-for-today": {
        name: "Plan for today",
        description: "Plan for today by dragging items from your different lists into today's list.",
        component: (o) => {
          const l = a.dayjs(), [r, m] = a.hooks.useAsyncLoader(async () => await a.getDays({
            from: l.toDate(),
            to: l.toDate(),
            toRender: {
              Day: !0
            }
          })), n = r == null ? void 0 : r[0];
          return m ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Loading...") : /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 128,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 129,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 130,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 131,
            columnNumber: 17
          } })), /* @__PURE__ */ e.createElement(i.Day, { day: n, label: "Today", __self: void 0, __source: {
            fileName: t,
            lineNumber: 133,
            columnNumber: 15
          } }));
        }
      },
      "today-tomorrow-next-week": {
        name: "Today, tomorrow, next week",
        description: "Choose to move tasks from today to tomorrow or next week if you have too many.",
        component: (o) => {
          const l = a.dayjs(), r = l.add(1, "day"), m = l.weekday(7), [n, s] = a.hooks.useAsyncLoader(async () => await a.getDaysMax10({
            dates: [l.toDate(), r.toDate(), m.toDate()],
            toRender: {
              Day: !0
            }
          }));
          return s ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Loading...") : /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 158,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 159,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 160,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 161,
            columnNumber: 17
          } })), /* @__PURE__ */ e.createElement("div", { className: "flex", __self: void 0, __source: {
            fileName: t,
            lineNumber: 163,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(i.Day, { day: n == null ? void 0 : n[0], label: "Today", __self: void 0, __source: {
            fileName: t,
            lineNumber: 164,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(i.Day, { day: n == null ? void 0 : n[1], label: "Tomorrow", __self: void 0, __source: {
            fileName: t,
            lineNumber: 165,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(i.Day, { day: n == null ? void 0 : n[2], label: "Next week", __self: void 0, __source: {
            fileName: t,
            lineNumber: 166,
            columnNumber: 17
          } })));
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
        component: (o) => {
          const [l, r] = e.useState(null), m = a.dayjs();
          return e.useEffect(() => {
            (async () => {
              const n = await a.getDays({
                from: m.toDate(),
                to: m.toDate(),
                include: {
                  tasks: !0
                }
              });
              if (!n.length) {
                r("");
                return;
              }
              const s = n[0];
              r(`<ul>${s.tasks.map((u) => `<li>${u.status === "DONE" ? "✅ " : u.status === "CANCELED" ? "❌ " : ""}${u.title}</li>`).join("")}</ul>`);
            })();
          }, []), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 220,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement(i.NoteEditor, { slug: `flow-essentials_todays-plan-${m.format("YYYY-MM-DD")}`, title: `Plan for ${m.format("MMMM D")}`, loading: l === null, initialValue: l ?? "", __self: void 0, __source: {
            fileName: t,
            lineNumber: 221,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 227,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 228,
            columnNumber: 15
          } }));
        }
      },
      // Shutdown routine steps
      "intro-to-todays-shutdown": {
        name: "Intro to today's shutdown",
        description: "Animated screen to get you in the mood to shutdown and retrospect on today.",
        component: (o) => /* @__PURE__ */ e.createElement(c, { ...o, __self: void 0, __source: {
          fileName: t,
          lineNumber: 238,
          columnNumber: 11
        } }, "Let's reflect on what you did today")
      },
      "clean-up-today": {
        name: "Clean up today",
        description: "Clean up today by marking tasks as done or canceling tasks.",
        component: (o) => {
          const l = a.dayjs(), [r, m] = a.hooks.useAsyncLoader(async () => await a.getDays({
            from: l.toDate(),
            to: l.toDate(),
            toRender: {
              Day: !0
            }
          })), n = r == null ? void 0 : r[0];
          return m ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Loading...") : /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 261,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 262,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 263,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 264,
            columnNumber: 17
          } })), /* @__PURE__ */ e.createElement(i.Day, { day: n, label: "Today", __self: void 0, __source: {
            fileName: t,
            lineNumber: 266,
            columnNumber: 15
          } }));
        }
      },
      "retro-on-today": {
        name: "Retro on today",
        description: "Retro on today by writing down a note. The default template is a list of tasks you did today, and headers for what went well and what didn't go well.",
        component: (o) => {
          const [l, r] = e.useState(null), m = a.dayjs();
          return e.useEffect(() => {
            (async () => {
              const n = await a.getDays({
                from: m.toDate(),
                to: m.toDate(),
                include: {
                  tasks: !0
                }
              });
              if (!n.length) {
                r("");
                return;
              }
              const s = n[0];
              r(`<ul>${s.tasks.map((u) => `<li>${u.status === "DONE" ? "✅ " : u.status === "CANCELED" ? "❌ " : ""}${u.title}</li>`).join("")}</ul>`);
            })();
          }, []), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 313,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement(i.NoteEditor, { slug: `flow-essentials_retro-${m.format("YYYY-MM-DD")}`, title: `Retro of ${m.format("MMMM D")}`, loading: l === null, initialValue: l ?? "", __self: void 0, __source: {
            fileName: t,
            lineNumber: 314,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 320,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 321,
            columnNumber: 15
          } }));
        }
      },
      "intro-to-tomorrow": {
        name: "Intro to tomorrow",
        description: "Animated screen to get you in the mood to plan for tomorrow.",
        component: (o) => /* @__PURE__ */ e.createElement(c, { ...o, __self: void 0, __source: {
          fileName: t,
          lineNumber: 329,
          columnNumber: 31
        } }, "Tomorrow")
      },
      "plan-for-tomorrow": {
        name: "Plan for tomorrow",
        description: "Plan for tomorrow by dragging items from your different lists into tomorrow's list.",
        component: (o) => {
          const l = a.dayjs().add(1, "day"), [r, m] = a.hooks.useAsyncLoader(async () => await a.getDays({
            from: l.toDate(),
            to: l.toDate(),
            toRender: {
              Day: !0
            }
          })), n = r == null ? void 0 : r[0];
          return m ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Loading...") : /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 352,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 353,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 354,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 355,
            columnNumber: 17
          } })), /* @__PURE__ */ e.createElement(i.Day, { day: n, label: "Tomorrow", __self: void 0, __source: {
            fileName: t,
            lineNumber: 357,
            columnNumber: 15
          } }));
        }
      }
    }
  };
});
export {
  N as default
};
