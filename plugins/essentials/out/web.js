var N = { exports: {} }, D = {}, C = { exports: {} }, c = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h = Symbol.for("react.element"), A = Symbol.for("react.portal"), Y = Symbol.for("react.fragment"), F = Symbol.for("react.strict_mode"), U = Symbol.for("react.profiler"), q = Symbol.for("react.provider"), W = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), J = Symbol.for("react.memo"), G = Symbol.for("react.lazy"), $ = Symbol.iterator;
function K(t) {
  return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null);
}
var B = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, M = Object.assign, O = {};
function x(t, e, f) {
  this.props = t, this.context = e, this.refs = O, this.updater = f || B;
}
x.prototype.isReactComponent = {};
x.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
x.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function T() {
}
T.prototype = x.prototype;
function E(t, e, f) {
  this.props = t, this.context = e, this.refs = O, this.updater = f || B;
}
var g = E.prototype = new T();
g.constructor = E;
M(g, x.prototype);
g.isPureReactComponent = !0;
var R = Array.isArray, L = Object.prototype.hasOwnProperty, k = { current: null }, P = { key: !0, ref: !0, __self: !0, __source: !0 };
function I(t, e, f) {
  var a, i = {}, r = null, o = null;
  if (e != null)
    for (a in e.ref !== void 0 && (o = e.ref), e.key !== void 0 && (r = "" + e.key), e)
      L.call(e, a) && !P.hasOwnProperty(a) && (i[a] = e[a]);
  var s = arguments.length - 2;
  if (s === 1)
    i.children = f;
  else if (1 < s) {
    for (var u = Array(s), l = 0; l < s; l++)
      u[l] = arguments[l + 2];
    i.children = u;
  }
  if (t && t.defaultProps)
    for (a in s = t.defaultProps, s)
      i[a] === void 0 && (i[a] = s[a]);
  return { $$typeof: h, type: t, key: r, ref: o, props: i, _owner: k.current };
}
function Q(t, e) {
  return { $$typeof: h, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function S(t) {
  return typeof t == "object" && t !== null && t.$$typeof === h;
}
function X(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(f) {
    return e[f];
  });
}
var b = /\/+/g;
function w(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? X("" + t.key) : e.toString(36);
}
function _(t, e, f, a, i) {
  var r = typeof t;
  (r === "undefined" || r === "boolean") && (t = null);
  var o = !1;
  if (t === null)
    o = !0;
  else
    switch (r) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case h:
          case A:
            o = !0;
        }
    }
  if (o)
    return o = t, i = i(o), t = a === "" ? "." + w(o, 0) : a, R(i) ? (f = "", t != null && (f = t.replace(b, "$&/") + "/"), _(i, e, f, "", function(l) {
      return l;
    })) : i != null && (S(i) && (i = Q(i, f + (!i.key || o && o.key === i.key ? "" : ("" + i.key).replace(b, "$&/") + "/") + t)), e.push(i)), 1;
  if (o = 0, a = a === "" ? "." : a + ":", R(t))
    for (var s = 0; s < t.length; s++) {
      r = t[s];
      var u = a + w(r, s);
      o += _(r, e, f, u, i);
    }
  else if (u = K(t), typeof u == "function")
    for (t = u.call(t), s = 0; !(r = t.next()).done; )
      r = r.value, u = a + w(r, s++), o += _(r, e, f, u, i);
  else if (r === "object")
    throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function j(t, e, f) {
  if (t == null)
    return t;
  var a = [], i = 0;
  return _(t, a, "", "", function(r) {
    return e.call(f, r, i++);
  }), a;
}
function Z(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(f) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = f);
    }, function(f) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = f);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1)
    return t._result.default;
  throw t._result;
}
var d = { current: null }, v = { transition: null }, tt = { ReactCurrentDispatcher: d, ReactCurrentBatchConfig: v, ReactCurrentOwner: k };
c.Children = { map: j, forEach: function(t, e, f) {
  j(t, function() {
    e.apply(this, arguments);
  }, f);
}, count: function(t) {
  var e = 0;
  return j(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return j(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!S(t))
    throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
c.Component = x;
c.Fragment = Y;
c.Profiler = U;
c.PureComponent = E;
c.StrictMode = F;
c.Suspense = H;
c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tt;
c.cloneElement = function(t, e, f) {
  if (t == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var a = M({}, t.props), i = t.key, r = t.ref, o = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (r = e.ref, o = k.current), e.key !== void 0 && (i = "" + e.key), t.type && t.type.defaultProps)
      var s = t.type.defaultProps;
    for (u in e)
      L.call(e, u) && !P.hasOwnProperty(u) && (a[u] = e[u] === void 0 && s !== void 0 ? s[u] : e[u]);
  }
  var u = arguments.length - 2;
  if (u === 1)
    a.children = f;
  else if (1 < u) {
    s = Array(u);
    for (var l = 0; l < u; l++)
      s[l] = arguments[l + 2];
    a.children = s;
  }
  return { $$typeof: h, type: t.type, key: i, ref: r, props: a, _owner: o };
};
c.createContext = function(t) {
  return t = { $$typeof: W, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: q, _context: t }, t.Consumer = t;
};
c.createElement = I;
c.createFactory = function(t) {
  var e = I.bind(null, t);
  return e.type = t, e;
};
c.createRef = function() {
  return { current: null };
};
c.forwardRef = function(t) {
  return { $$typeof: z, render: t };
};
c.isValidElement = S;
c.lazy = function(t) {
  return { $$typeof: G, _payload: { _status: -1, _result: t }, _init: Z };
};
c.memo = function(t, e) {
  return { $$typeof: J, type: t, compare: e === void 0 ? null : e };
};
c.startTransition = function(t) {
  var e = v.transition;
  v.transition = {};
  try {
    t();
  } finally {
    v.transition = e;
  }
};
c.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
c.useCallback = function(t, e) {
  return d.current.useCallback(t, e);
};
c.useContext = function(t) {
  return d.current.useContext(t);
};
c.useDebugValue = function() {
};
c.useDeferredValue = function(t) {
  return d.current.useDeferredValue(t);
};
c.useEffect = function(t, e) {
  return d.current.useEffect(t, e);
};
c.useId = function() {
  return d.current.useId();
};
c.useImperativeHandle = function(t, e, f) {
  return d.current.useImperativeHandle(t, e, f);
};
c.useInsertionEffect = function(t, e) {
  return d.current.useInsertionEffect(t, e);
};
c.useLayoutEffect = function(t, e) {
  return d.current.useLayoutEffect(t, e);
};
c.useMemo = function(t, e) {
  return d.current.useMemo(t, e);
};
c.useReducer = function(t, e, f) {
  return d.current.useReducer(t, e, f);
};
c.useRef = function(t) {
  return d.current.useRef(t);
};
c.useState = function(t) {
  return d.current.useState(t);
};
c.useSyncExternalStore = function(t, e, f) {
  return d.current.useSyncExternalStore(t, e, f);
};
c.useTransition = function() {
  return d.current.useTransition();
};
c.version = "18.2.0";
C.exports = c;
var p = C.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var et = p, rt = Symbol.for("react.element"), nt = Symbol.for("react.fragment"), ot = Object.prototype.hasOwnProperty, ut = et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, st = { key: !0, ref: !0, __self: !0, __source: !0 };
function V(t, e, f) {
  var a, i = {}, r = null, o = null;
  f !== void 0 && (r = "" + f), e.key !== void 0 && (r = "" + e.key), e.ref !== void 0 && (o = e.ref);
  for (a in e)
    ot.call(e, a) && !st.hasOwnProperty(a) && (i[a] = e[a]);
  if (t && t.defaultProps)
    for (a in e = t.defaultProps, e)
      i[a] === void 0 && (i[a] = e[a]);
  return { $$typeof: rt, type: t, key: r, ref: o, props: i, _owner: ut.current };
}
D.Fragment = nt;
D.jsx = V;
D.jsxs = V;
N.exports = D;
var n = N.exports;
const at = (t, e) => ({ slug: t, plugin: e }), it = at("essentials", (t) => {
  const e = t.components, { motion: f } = t.framerMotion, a = 5, i = (r) => (p.useEffect(() => {
    const o = setTimeout(r.onNext, a * 1e3);
    return () => clearTimeout(o);
  }, []), /* @__PURE__ */ n.jsx(
    "div",
    {
      className: "flex h-screen w-screen items-center justify-center bg-gray-100",
      onClick: r.onNext,
      children: /* @__PURE__ */ n.jsx(
        f.div,
        {
          className: "text-6xl font-semibold",
          animate: { opacity: [0, 1, 0] },
          transition: { duration: a, times: [0, 0.7, 1] },
          children: r.children
        }
      )
    }
  ));
  return {
    routineSteps: {
      // Morning routine steps
      "intro-to-yesterday": {
        component: (r) => /* @__PURE__ */ n.jsx(i, { ...r, children: "Yesterday" })
      },
      "retro-on-yesterday": {
        component: (r) => {
          const [o, s] = p.useState(null), u = t.dayjs().subtract(1, "day");
          return p.useEffect(() => {
            (async () => {
              const l = await t.getDays({
                from: u.toDate(),
                to: u.toDate(),
                include: { tasks: !0 }
              });
              if (!l.length) {
                s("");
                return;
              }
              const m = l[0];
              s(
                `<ul>${m.tasks.map(
                  (y) => `<li>${y.status === "DONE" ? "✅" : y.status === "CANCELED" ? "❌" : "⏳"} ${y.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ n.jsxs("div", { children: [
            /* @__PURE__ */ n.jsx(
              e.NoteEditor,
              {
                slug: `flow-essentials_retro-${u.format("YYYY-MM-DD")}`,
                title: `Retro of ${u.format("MMMM D")}`,
                loading: o === null,
                initialValue: o ?? ""
              }
            ),
            /* @__PURE__ */ n.jsx(r.BackButton, {}),
            /* @__PURE__ */ n.jsx(r.NextButton, {})
          ] });
        }
      },
      "intro-to-today": {
        component: (r) => /* @__PURE__ */ n.jsx(i, { ...r, children: "Today" })
      },
      "plan-for-today": {
        component: (r) => {
          const o = t.dayjs(), [s, u] = t.hooks.useAsyncLoader(async () => await t.getDays({
            from: o.toDate(),
            to: o.toDate(),
            toRender: { Day: !0 }
          })), l = s == null ? void 0 : s[0];
          return u ? /* @__PURE__ */ n.jsx(n.Fragment, { children: "Loading..." }) : /* @__PURE__ */ n.jsxs("div", { children: [
            /* @__PURE__ */ n.jsxs("div", { children: [
              /* @__PURE__ */ n.jsx(r.BackButton, {}),
              /* @__PURE__ */ n.jsx(r.NextButton, {})
            ] }),
            /* @__PURE__ */ n.jsx(e.Day, { day: l, label: "Today" })
          ] });
        }
      },
      "today-tomorrow-next-week": {
        component: (r) => {
          const o = t.dayjs(), s = o.add(1, "day"), u = o.weekday(7), [l, m] = t.hooks.useAsyncLoader(async () => await t.getDaysMax10({
            dates: [o.toDate(), s.toDate(), u.toDate()],
            toRender: { Day: !0 }
          }));
          return m ? /* @__PURE__ */ n.jsx(n.Fragment, { children: "Loading..." }) : /* @__PURE__ */ n.jsxs("div", { children: [
            /* @__PURE__ */ n.jsxs("div", { children: [
              /* @__PURE__ */ n.jsx(r.BackButton, {}),
              /* @__PURE__ */ n.jsx(r.NextButton, {})
            ] }),
            /* @__PURE__ */ n.jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ n.jsx(e.Day, { day: l == null ? void 0 : l[0], label: "Today" }),
              /* @__PURE__ */ n.jsx(e.Day, { day: l == null ? void 0 : l[1], label: "Tomorrow" }),
              /* @__PURE__ */ n.jsx(e.Day, { day: l == null ? void 0 : l[2], label: "Next week" })
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
        component: (r) => {
          const [o, s] = p.useState(null), u = t.dayjs();
          return p.useEffect(() => {
            (async () => {
              const l = await t.getDays({
                from: u.toDate(),
                to: u.toDate(),
                include: { tasks: !0 }
              });
              if (!l.length) {
                s("");
                return;
              }
              const m = l[0];
              s(
                `<ul>${m.tasks.map(
                  (y) => `<li>${y.status === "DONE" ? "✅ " : y.status === "CANCELED" ? "❌ " : ""}${y.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ n.jsxs("div", { children: [
            /* @__PURE__ */ n.jsx(
              e.NoteEditor,
              {
                slug: `flow-essentials_retro-${u.format("YYYY-MM-DD")}`,
                title: `Retro of ${u.format("MMMM D")}`,
                loading: o === null,
                initialValue: o ?? ""
              }
            ),
            /* @__PURE__ */ n.jsx(r.BackButton, {}),
            /* @__PURE__ */ n.jsx(r.NextButton, {})
          ] });
        }
      },
      // Shutdown routine steps
      "intro-to-todays-shutdown": {
        component: (r) => /* @__PURE__ */ n.jsx(i, { ...r, children: "Let's reflect on what you did today" })
      },
      "clean-up-today": {
        component: (r) => {
          const o = t.dayjs(), [s, u] = t.hooks.useAsyncLoader(async () => await t.getDays({
            from: o.toDate(),
            to: o.toDate(),
            toRender: { Day: !0 }
          })), l = s == null ? void 0 : s[0];
          return u ? /* @__PURE__ */ n.jsx(n.Fragment, { children: "Loading..." }) : /* @__PURE__ */ n.jsxs("div", { children: [
            /* @__PURE__ */ n.jsxs("div", { children: [
              /* @__PURE__ */ n.jsx(r.BackButton, {}),
              /* @__PURE__ */ n.jsx(r.NextButton, {})
            ] }),
            /* @__PURE__ */ n.jsx(e.Day, { day: l, label: "Today" })
          ] });
        }
      },
      "retro-on-today": {
        component: (r) => {
          const [o, s] = p.useState(null), u = t.dayjs();
          return p.useEffect(() => {
            (async () => {
              const l = await t.getDays({
                from: u.toDate(),
                to: u.toDate(),
                include: { tasks: !0 }
              });
              if (!l.length) {
                s("");
                return;
              }
              const m = l[0];
              s(
                `<ul>${m.tasks.map(
                  (y) => `<li>${y.status === "DONE" ? "✅ " : y.status === "CANCELED" ? "❌ " : ""}${y.title}</li>`
                ).join("")}</ul>`
              );
            })();
          }, []), /* @__PURE__ */ n.jsxs("div", { children: [
            /* @__PURE__ */ n.jsx(
              e.NoteEditor,
              {
                slug: `flow-essentials_retro-${u.format("YYYY-MM-DD")}`,
                title: `Retro of ${u.format("MMMM D")}`,
                loading: o === null,
                initialValue: o ?? ""
              }
            ),
            /* @__PURE__ */ n.jsx(r.BackButton, {}),
            /* @__PURE__ */ n.jsx(r.NextButton, {})
          ] });
        }
      },
      "intro-to-tomorrow": {
        component: (r) => /* @__PURE__ */ n.jsx(i, { ...r, children: "Tomorrow" })
      },
      "plan-for-tomorrow": {
        component: (r) => {
          const o = t.dayjs().add(1, "day"), [s, u] = t.hooks.useAsyncLoader(async () => await t.getDays({
            from: o.toDate(),
            to: o.toDate(),
            toRender: { Day: !0 }
          })), l = s == null ? void 0 : s[0];
          return u ? /* @__PURE__ */ n.jsx(n.Fragment, { children: "Loading..." }) : /* @__PURE__ */ n.jsxs("div", { children: [
            /* @__PURE__ */ n.jsxs("div", { children: [
              /* @__PURE__ */ n.jsx(r.BackButton, {}),
              /* @__PURE__ */ n.jsx(r.NextButton, {})
            ] }),
            /* @__PURE__ */ n.jsx(e.Day, { day: l, label: "Tomorrow" })
          ] });
        }
      }
    }
  };
});
export {
  it as default
};
