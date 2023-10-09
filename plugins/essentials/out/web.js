const f = (r) => ({ plugin: r });
var t = "/Users/richardguerre/Projects/flow/plugins/essentials/src/web.tsx";
const N = f((r) => {
  const i = r.components, {
    motion: _
  } = r.framerMotion, e = r.React, d = 5, c = (o) => (e.useEffect(() => {
    const a = setTimeout(o.onNext, d * 1e3);
    return () => clearTimeout(a);
  }, []), /* @__PURE__ */ e.createElement("div", { className: "flex h-screen w-screen items-center justify-center bg-gray-100", onClick: o.onNext, __self: void 0, __source: {
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
          const [a, l] = e.useState(null), m = r.dayjs().subtract(1, "day");
          return e.useEffect(() => {
            (async () => {
              const n = await r.getDays({
                from: m.toDate(),
                to: m.toDate(),
                include: {
                  tasks: !0
                }
              });
              if (!n.length) {
                l("");
                return;
              }
              const s = n[0];
              l(`<ul>${s.tasks.map((u) => `<li>${u.status === "DONE" ? "✅" : u.status === "CANCELED" ? "❌" : "⏳"} ${u.title}</li>`).join("")}</ul>`);
            })();
          }, []), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 84,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement(i.NoteEditor, { slug: `flow-essentials_retro-${m.format("YYYY-MM-DD")}`, title: `Retro of ${m.format("MMMM D")}`, loading: a === null, initialValue: a ?? "", __self: void 0, __source: {
            fileName: t,
            lineNumber: 85,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 91,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 92,
            columnNumber: 15
          } }));
        }
      },
      "intro-to-today": {
        name: "Intro to today",
        description: "Animated screen to get you in the mood to plan for today.",
        component: (o) => /* @__PURE__ */ e.createElement(c, { ...o, __self: void 0, __source: {
          fileName: t,
          lineNumber: 100,
          columnNumber: 31
        } }, "Today")
      },
      "plan-for-today": {
        name: "Plan for today",
        description: "Plan for today by dragging items from your different lists into today's list.",
        component: (o) => {
          const a = r.dayjs(), [l, m] = r.hooks.useAsyncLoader(async () => await r.getDays({
            from: a.toDate(),
            to: a.toDate(),
            toRender: {
              Day: !0
            }
          })), n = l == null ? void 0 : l[0];
          return m ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Loading...") : /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 123,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 124,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 125,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 126,
            columnNumber: 17
          } })), /* @__PURE__ */ e.createElement(i.Day, { day: n, label: "Today", __self: void 0, __source: {
            fileName: t,
            lineNumber: 128,
            columnNumber: 15
          } }));
        }
      },
      "today-tomorrow-next-week": {
        name: "Today, tomorrow, next week",
        description: "Choose to move tasks from today to tomorrow or next week if you have too many.",
        component: (o) => {
          const a = r.dayjs(), l = a.add(1, "day"), m = a.weekday(7), [n, s] = r.hooks.useAsyncLoader(async () => await r.getDaysMax10({
            dates: [a.toDate(), l.toDate(), m.toDate()],
            toRender: {
              Day: !0
            }
          }));
          return s ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Loading...") : /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 153,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 154,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 155,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 156,
            columnNumber: 17
          } })), /* @__PURE__ */ e.createElement("div", { className: "flex", __self: void 0, __source: {
            fileName: t,
            lineNumber: 158,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(i.Day, { day: n == null ? void 0 : n[0], label: "Today", __self: void 0, __source: {
            fileName: t,
            lineNumber: 159,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(i.Day, { day: n == null ? void 0 : n[1], label: "Tomorrow", __self: void 0, __source: {
            fileName: t,
            lineNumber: 160,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(i.Day, { day: n == null ? void 0 : n[2], label: "Next week", __self: void 0, __source: {
            fileName: t,
            lineNumber: 161,
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
          const [a, l] = e.useState(null), m = r.dayjs();
          return e.useEffect(() => {
            (async () => {
              const n = await r.getDays({
                from: m.toDate(),
                to: m.toDate(),
                include: {
                  tasks: !0
                }
              });
              if (!n.length) {
                l("");
                return;
              }
              const s = n[0];
              l(`<ul>${s.tasks.map((u) => `<li>${u.status === "DONE" ? "✅ " : u.status === "CANCELED" ? "❌ " : ""}${u.title}</li>`).join("")}</ul>`);
            })();
          }, []), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 215,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement(i.NoteEditor, { slug: `flow-essentials_retro-${m.format("YYYY-MM-DD")}`, title: `Plan for ${m.format("MMMM D")}`, loading: a === null, initialValue: a ?? "", __self: void 0, __source: {
            fileName: t,
            lineNumber: 216,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 222,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 223,
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
          lineNumber: 233,
          columnNumber: 11
        } }, "Let's reflect on what you did today")
      },
      "clean-up-today": {
        name: "Clean up today",
        description: "Clean up today by marking tasks as done or canceling tasks.",
        component: (o) => {
          const a = r.dayjs(), [l, m] = r.hooks.useAsyncLoader(async () => await r.getDays({
            from: a.toDate(),
            to: a.toDate(),
            toRender: {
              Day: !0
            }
          })), n = l == null ? void 0 : l[0];
          return m ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Loading...") : /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 256,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 257,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 258,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 259,
            columnNumber: 17
          } })), /* @__PURE__ */ e.createElement(i.Day, { day: n, label: "Today", __self: void 0, __source: {
            fileName: t,
            lineNumber: 261,
            columnNumber: 15
          } }));
        }
      },
      "retro-on-today": {
        name: "Retro on today",
        description: "Retro on today by writing down a note. The default template is a list of tasks you did today, and headers for what went well and what didn't go well.",
        component: (o) => {
          const [a, l] = e.useState(null), m = r.dayjs();
          return e.useEffect(() => {
            (async () => {
              const n = await r.getDays({
                from: m.toDate(),
                to: m.toDate(),
                include: {
                  tasks: !0
                }
              });
              if (!n.length) {
                l("");
                return;
              }
              const s = n[0];
              l(`<ul>${s.tasks.map((u) => `<li>${u.status === "DONE" ? "✅ " : u.status === "CANCELED" ? "❌ " : ""}${u.title}</li>`).join("")}</ul>`);
            })();
          }, []), /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 308,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement(i.NoteEditor, { slug: `flow-essentials_retro-${m.format("YYYY-MM-DD")}`, title: `Retro of ${m.format("MMMM D")}`, loading: a === null, initialValue: a ?? "", __self: void 0, __source: {
            fileName: t,
            lineNumber: 309,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 315,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 316,
            columnNumber: 15
          } }));
        }
      },
      "intro-to-tomorrow": {
        name: "Intro to tomorrow",
        description: "Animated screen to get you in the mood to plan for tomorrow.",
        component: (o) => /* @__PURE__ */ e.createElement(c, { ...o, __self: void 0, __source: {
          fileName: t,
          lineNumber: 324,
          columnNumber: 31
        } }, "Tomorrow")
      },
      "plan-for-tomorrow": {
        name: "Plan for tomorrow",
        description: "Plan for tomorrow by dragging items from your different lists into tomorrow's list.",
        component: (o) => {
          const a = r.dayjs().add(1, "day"), [l, m] = r.hooks.useAsyncLoader(async () => await r.getDays({
            from: a.toDate(),
            to: a.toDate(),
            toRender: {
              Day: !0
            }
          })), n = l == null ? void 0 : l[0];
          return m ? /* @__PURE__ */ e.createElement(e.Fragment, null, "Loading...") : /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 347,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: t,
            lineNumber: 348,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(o.BackButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 349,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(o.NextButton, { __self: void 0, __source: {
            fileName: t,
            lineNumber: 350,
            columnNumber: 17
          } })), /* @__PURE__ */ e.createElement(i.Day, { day: n, label: "Tomorrow", __self: void 0, __source: {
            fileName: t,
            lineNumber: 352,
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
