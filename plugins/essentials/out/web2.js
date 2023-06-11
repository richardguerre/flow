import h, { useState as x, useEffect as m } from "react";
var j = { exports: {} }, f = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D = h, g = Symbol.for("react.element"), k = Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, v = D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, N = { key: !0, ref: !0, __self: !0, __source: !0 };
function w(o, r, u) {
  var d, y = {}, e = null, n = null;
  u !== void 0 && (e = "" + u), r.key !== void 0 && (e = "" + r.key), r.ref !== void 0 && (n = r.ref);
  for (d in r)
    p.call(r, d) && !N.hasOwnProperty(d) && (y[d] = r[d]);
  if (o && o.defaultProps)
    for (d in r = o.defaultProps, r)
      y[d] === void 0 && (y[d] = r[d]);
  return { $$typeof: g, type: o, key: e, ref: n, props: y, _owner: v.current };
}
f.Fragment = k;
f.jsx = w;
f.jsxs = w;
j.exports = f;
var t = j.exports;
const B = (o, r) => ({ slug: o, plugin: r }), _ = B("essentials", (o) => {
  const r = o.components, { motion: u } = o.framerMotion, d = 5, y = (e) => (m(() => {
    const n = setTimeout(e.onNext, d * 1e3);
    return () => clearTimeout(n);
  }, []), /* @__PURE__ */ t.jsx(
    "div",
    {
      className: "flex h-screen w-screen items-center justify-center bg-gray-100",
      onClick: e.onNext,
      children: /* @__PURE__ */ t.jsx(
        u.div,
        {
          className: "text-6xl font-semibold",
          animate: { opacity: [0, 1, 0] },
          transition: { duration: d, times: [0, 0.7, 1] },
          children: e.children
        }
      )
    }
  ));
  return {
    name: "Essentials",
    routineSteps: {
      // Morning routine steps
      "intro-to-yesterday": {
        name: "Intro to yesterday",
        description: "Animated screen to get you in the mood to retrospect on yesterday.",
        component: (e) => /* @__PURE__ */ t.jsx(y, { ...e, children: "Yesterday" })
      },
      "retro-on-yesterday": {
        name: "Retro on yesterday",
        description: "Retro on yesterday by writing down a note. The default template is a list of tasks you did yesterday, and headers for what went well and what didn't go well.",
        component: (e) => {
          const [n, s] = x(null), i = o.dayjs().subtract(1, "day");
          return m(() => {
            (async () => {
              const a = await o.getDays({
                from: i.toDate(),
                to: i.toDate(),
                include: { tasks: !0 }
              });
              if (!a.length) {
                s("");
                return;
              }
              const c = a[0];
              s(
                `<ul>${c.tasks.map(
                  (l) => `<li>${l.status === "DONE" ? "✅" : l.status === "CANCELED" ? "❌" : "⏳"} ${l.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx(
              r.NoteEditor,
              {
                slug: `flow-essentials_retro-${i.format("YYYY-MM-DD")}`,
                title: `Retro of ${i.format("MMMM D")}`,
                loading: n === null,
                initialValue: n ?? ""
              }
            ),
            /* @__PURE__ */ t.jsx(e.BackButton, {}),
            /* @__PURE__ */ t.jsx(e.NextButton, {})
          ] });
        }
      },
      "intro-to-today": {
        name: "Intro to today",
        description: "Animated screen to get you in the mood to plan for today.",
        component: (e) => /* @__PURE__ */ t.jsx(y, { ...e, children: "Today" })
      },
      "plan-for-today": {
        name: "Plan for today",
        description: "Plan for today by dragging items from your different lists into today's list.",
        component: (e) => {
          const n = o.dayjs(), [s, i] = o.hooks.useAsyncLoader(async () => await o.getDays({
            from: n.toDate(),
            to: n.toDate(),
            toRender: { Day: !0 }
          })), a = s == null ? void 0 : s[0];
          return i ? /* @__PURE__ */ t.jsx(t.Fragment, { children: "Loading..." }) : /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx(e.BackButton, {}),
              /* @__PURE__ */ t.jsx(e.NextButton, {})
            ] }),
            /* @__PURE__ */ t.jsx(r.Day, { day: a, label: "Today" })
          ] });
        }
      },
      "today-tomorrow-next-week": {
        name: "Today, tomorrow, next week",
        description: "Choose to move tasks from today to tomorrow or next week if you have too many.",
        component: (e) => {
          const n = o.dayjs(), s = n.add(1, "day"), i = n.weekday(7), [a, c] = o.hooks.useAsyncLoader(async () => await o.getDaysMax10({
            dates: [n.toDate(), s.toDate(), i.toDate()],
            toRender: { Day: !0 }
          }));
          return c ? /* @__PURE__ */ t.jsx(t.Fragment, { children: "Loading..." }) : /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx(e.BackButton, {}),
              /* @__PURE__ */ t.jsx(e.NextButton, {})
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ t.jsx(r.Day, { day: a == null ? void 0 : a[0], label: "Today" }),
              /* @__PURE__ */ t.jsx(r.Day, { day: a == null ? void 0 : a[1], label: "Tomorrow" }),
              /* @__PURE__ */ t.jsx(r.Day, { day: a == null ? void 0 : a[2], label: "Next week" })
            ] })
          ] });
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
          const [n, s] = x(null), i = o.dayjs();
          return m(() => {
            (async () => {
              const a = await o.getDays({
                from: i.toDate(),
                to: i.toDate(),
                include: { tasks: !0 }
              });
              if (!a.length) {
                s("");
                return;
              }
              const c = a[0];
              s(
                `<ul>${c.tasks.map(
                  (l) => `<li>${l.status === "DONE" ? "✅ " : l.status === "CANCELED" ? "❌ " : ""}${l.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx(
              r.NoteEditor,
              {
                slug: `flow-essentials_retro-${i.format("YYYY-MM-DD")}`,
                title: `Retro of ${i.format("MMMM D")}`,
                loading: n === null,
                initialValue: n ?? ""
              }
            ),
            /* @__PURE__ */ t.jsx(e.BackButton, {}),
            /* @__PURE__ */ t.jsx(e.NextButton, {})
          ] });
        }
      },
      // Shutdown routine steps
      "intro-to-todays-shutdown": {
        name: "Intro to today's shutdown",
        description: "Animated screen to get you in the mood to shutdown and retrospect on today.",
        component: (e) => /* @__PURE__ */ t.jsx(y, { ...e, children: "Let's reflect on what you did today" })
      },
      "clean-up-today": {
        name: "Clean up today",
        description: "Clean up today by marking tasks as done or canceling tasks.",
        component: (e) => {
          const n = o.dayjs(), [s, i] = o.hooks.useAsyncLoader(async () => await o.getDays({
            from: n.toDate(),
            to: n.toDate(),
            toRender: { Day: !0 }
          })), a = s == null ? void 0 : s[0];
          return i ? /* @__PURE__ */ t.jsx(t.Fragment, { children: "Loading..." }) : /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx(e.BackButton, {}),
              /* @__PURE__ */ t.jsx(e.NextButton, {})
            ] }),
            /* @__PURE__ */ t.jsx(r.Day, { day: a, label: "Today" })
          ] });
        }
      },
      "retro-on-today": {
        name: "Retro on today",
        description: "Retro on today by writing down a note. The default template is a list of tasks you did today, and headers for what went well and what didn't go well.",
        component: (e) => {
          const [n, s] = x(null), i = o.dayjs();
          return m(() => {
            (async () => {
              const a = await o.getDays({
                from: i.toDate(),
                to: i.toDate(),
                include: { tasks: !0 }
              });
              if (!a.length) {
                s("");
                return;
              }
              const c = a[0];
              s(
                `<ul>${c.tasks.map(
                  (l) => `<li>${l.status === "DONE" ? "✅ " : l.status === "CANCELED" ? "❌ " : ""}${l.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx(
              r.NoteEditor,
              {
                slug: `flow-essentials_retro-${i.format("YYYY-MM-DD")}`,
                title: `Retro of ${i.format("MMMM D")}`,
                loading: n === null,
                initialValue: n ?? ""
              }
            ),
            /* @__PURE__ */ t.jsx(e.BackButton, {}),
            /* @__PURE__ */ t.jsx(e.NextButton, {})
          ] });
        }
      },
      "intro-to-tomorrow": {
        name: "Intro to tomorrow",
        description: "Animated screen to get you in the mood to plan for tomorrow.",
        component: (e) => /* @__PURE__ */ t.jsx(y, { ...e, children: "Tomorrow" })
      },
      "plan-for-tomorrow": {
        name: "Plan for tomorrow",
        description: "Plan for tomorrow by dragging items from your different lists into tomorrow's list.",
        component: (e) => {
          const n = o.dayjs().add(1, "day"), [s, i] = o.hooks.useAsyncLoader(async () => await o.getDays({
            from: n.toDate(),
            to: n.toDate(),
            toRender: { Day: !0 }
          })), a = s == null ? void 0 : s[0];
          return i ? /* @__PURE__ */ t.jsx(t.Fragment, { children: "Loading..." }) : /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx(e.BackButton, {}),
              /* @__PURE__ */ t.jsx(e.NextButton, {})
            ] }),
            /* @__PURE__ */ t.jsx(r.Day, { day: a, label: "Tomorrow" })
          ] });
        }
      }
    }
  };
});
export {
  _ as default
};
