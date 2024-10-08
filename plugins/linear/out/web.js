function le(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var P = { exports: {} }, i = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var x = Symbol.for("react.element"), ue = Symbol.for("react.portal"), oe = Symbol.for("react.fragment"), ie = Symbol.for("react.strict_mode"), ae = Symbol.for("react.profiler"), ce = Symbol.for("react.provider"), se = Symbol.for("react.context"), me = Symbol.for("react.forward_ref"), fe = Symbol.for("react.suspense"), _e = Symbol.for("react.memo"), de = Symbol.for("react.lazy"), $ = Symbol.iterator;
function Ne(e) {
  return e === null || typeof e != "object" ? null : (e = $ && e[$] || e["@@iterator"], typeof e == "function" ? e : null);
}
var D = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, U = Object.assign, F = {};
function h(e, t, n) {
  this.props = e, this.context = t, this.refs = F, this.updater = n || D;
}
h.prototype.isReactComponent = {};
h.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
h.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function H() {
}
H.prototype = h.prototype;
function I(e, t, n) {
  this.props = e, this.context = t, this.refs = F, this.updater = n || D;
}
var j = I.prototype = new H();
j.constructor = I;
U(j, h.prototype);
j.isPureReactComponent = !0;
var M = Array.isArray, q = Object.prototype.hasOwnProperty, V = { current: null }, W = { key: !0, ref: !0, __self: !0, __source: !0 };
function Z(e, t, n) {
  var u, o = {}, c = null, m = null;
  if (t != null)
    for (u in t.ref !== void 0 && (m = t.ref), t.key !== void 0 && (c = "" + t.key), t)
      q.call(t, u) && !W.hasOwnProperty(u) && (o[u] = t[u]);
  var s = arguments.length - 2;
  if (s === 1)
    o.children = n;
  else if (1 < s) {
    for (var a = Array(s), l = 0; l < s; l++)
      a[l] = arguments[l + 2];
    o.children = a;
  }
  if (e && e.defaultProps)
    for (u in s = e.defaultProps, s)
      o[u] === void 0 && (o[u] = s[u]);
  return { $$typeof: x, type: e, key: c, ref: m, props: o, _owner: V.current };
}
function ve(e, t) {
  return { $$typeof: x, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function O(e) {
  return typeof e == "object" && e !== null && e.$$typeof === x;
}
function be(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var A = /\/+/g;
function L(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? be("" + e.key) : t.toString(36);
}
function k(e, t, n, u, o) {
  var c = typeof e;
  (c === "undefined" || c === "boolean") && (e = null);
  var m = !1;
  if (e === null)
    m = !0;
  else
    switch (c) {
      case "string":
      case "number":
        m = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case x:
          case ue:
            m = !0;
        }
    }
  if (m)
    return m = e, o = o(m), e = u === "" ? "." + L(m, 0) : u, M(o) ? (n = "", e != null && (n = e.replace(A, "$&/") + "/"), k(o, t, n, "", function(l) {
      return l;
    })) : o != null && (O(o) && (o = ve(o, n + (!o.key || m && m.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + e)), t.push(o)), 1;
  if (m = 0, u = u === "" ? "." : u + ":", M(e))
    for (var s = 0; s < e.length; s++) {
      c = e[s];
      var a = u + L(c, s);
      m += k(c, t, n, a, o);
    }
  else if (a = Ne(e), typeof a == "function")
    for (e = a.call(e), s = 0; !(c = e.next()).done; )
      c = c.value, a = u + L(c, s++), m += k(c, t, n, a, o);
  else if (c === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return m;
}
function C(e, t, n) {
  if (e == null)
    return e;
  var u = [], o = 0;
  return k(e, u, "", "", function(c) {
    return t.call(n, c, o++);
  }), u;
}
function pe(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1)
    return e._result.default;
  throw e._result;
}
var N = { current: null }, z = { transition: null }, ye = { ReactCurrentDispatcher: N, ReactCurrentBatchConfig: z, ReactCurrentOwner: V };
function G() {
  throw Error("act(...) is not supported in production builds of React.");
}
i.Children = { map: C, forEach: function(e, t, n) {
  C(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return C(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return C(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!O(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
i.Component = h;
i.Fragment = oe;
i.Profiler = ae;
i.PureComponent = I;
i.StrictMode = ie;
i.Suspense = fe;
i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ye;
i.act = G;
i.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var u = U({}, e.props), o = e.key, c = e.ref, m = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (c = t.ref, m = V.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps)
      var s = e.type.defaultProps;
    for (a in t)
      q.call(t, a) && !W.hasOwnProperty(a) && (u[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1)
    u.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var l = 0; l < a; l++)
      s[l] = arguments[l + 2];
    u.children = s;
  }
  return { $$typeof: x, type: e.type, key: o, ref: c, props: u, _owner: m };
};
i.createContext = function(e) {
  return e = { $$typeof: se, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: ce, _context: e }, e.Consumer = e;
};
i.createElement = Z;
i.createFactory = function(e) {
  var t = Z.bind(null, e);
  return t.type = e, t;
};
i.createRef = function() {
  return { current: null };
};
i.forwardRef = function(e) {
  return { $$typeof: me, render: e };
};
i.isValidElement = O;
i.lazy = function(e) {
  return { $$typeof: de, _payload: { _status: -1, _result: e }, _init: pe };
};
i.memo = function(e, t) {
  return { $$typeof: _e, type: e, compare: t === void 0 ? null : t };
};
i.startTransition = function(e) {
  var t = z.transition;
  z.transition = {};
  try {
    e();
  } finally {
    z.transition = t;
  }
};
i.unstable_act = G;
i.useCallback = function(e, t) {
  return N.current.useCallback(e, t);
};
i.useContext = function(e) {
  return N.current.useContext(e);
};
i.useDebugValue = function() {
};
i.useDeferredValue = function(e) {
  return N.current.useDeferredValue(e);
};
i.useEffect = function(e, t) {
  return N.current.useEffect(e, t);
};
i.useId = function() {
  return N.current.useId();
};
i.useImperativeHandle = function(e, t, n) {
  return N.current.useImperativeHandle(e, t, n);
};
i.useInsertionEffect = function(e, t) {
  return N.current.useInsertionEffect(e, t);
};
i.useLayoutEffect = function(e, t) {
  return N.current.useLayoutEffect(e, t);
};
i.useMemo = function(e, t) {
  return N.current.useMemo(e, t);
};
i.useReducer = function(e, t, n) {
  return N.current.useReducer(e, t, n);
};
i.useRef = function(e) {
  return N.current.useRef(e);
};
i.useState = function(e) {
  return N.current.useState(e);
};
i.useSyncExternalStore = function(e, t, n) {
  return N.current.useSyncExternalStore(e, t, n);
};
i.useTransition = function() {
  return N.current.useTransition();
};
i.version = "18.3.1";
P.exports = i;
var ge = P.exports;
const y = /* @__PURE__ */ le(ge);
var J = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, T = y.createContext && y.createContext(J), p = function() {
  return p = Object.assign || function(e) {
    for (var t, n = 1, u = arguments.length; n < u; n++) {
      t = arguments[n];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, p.apply(this, arguments);
}, he = function(e, t) {
  var n = {};
  for (var u in e)
    Object.prototype.hasOwnProperty.call(e, u) && t.indexOf(u) < 0 && (n[u] = e[u]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, u = Object.getOwnPropertySymbols(e); o < u.length; o++)
      t.indexOf(u[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, u[o]) && (n[u[o]] = e[u[o]]);
  return n;
};
function K(e) {
  return e && e.map(function(t, n) {
    return y.createElement(t.tag, p({
      key: n
    }, t.attr), K(t.child));
  });
}
function g(e) {
  return function(t) {
    return y.createElement(we, p({
      attr: p({}, e.attr)
    }, t), K(e.child));
  };
}
function we(e) {
  var t = function(n) {
    var u = e.attr, o = e.size, c = e.title, m = he(e, ["attr", "size", "title"]), s = o || n.size || "1em", a;
    return n.className && (a = n.className), e.className && (a = (a ? a + " " : "") + e.className), y.createElement("svg", p({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, u, m, {
      className: a,
      style: p(p({
        color: e.color || n.color
      }, n.style), e.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), c && y.createElement("title", null, c), e.children);
  };
  return T !== void 0 ? y.createElement(T.Consumer, null, function(n) {
    return t(n);
  }) : t(J);
}
function Ee(e) {
  return g({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" } }, { tag: "path", attr: { d: "M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" } }] })(e);
}
function xe(e) {
  return g({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
}
function Se(e) {
  return g({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M8.5 2a5.001 5.001 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5.001 5.001 0 0 1 8.5 2zm-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" } }] })(e);
}
function Ce(e) {
  return g({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" } }] })(e);
}
function ke(e) {
  return g({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" } }] })(e);
}
function ze(e) {
  return g({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4 5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" } }] })(e);
}
function Re(e) {
  return g({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z" } }] })(e);
}
const Le = (e) => ({ plugin: e });
var r = "/Users/richardguerre/Projects/flow/plugins/linear/src/web.tsx";
const Ie = Le((e) => {
  const t = e.React, n = e.components, u = () => {
    var f, _;
    const l = e.operations.useLazyQuery({
      operationName: "accounts"
    });
    return /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow p-4 max-w-3xl", __self: void 0, __source: {
      fileName: r,
      lineNumber: 22,
      columnNumber: 7
    } }, (f = l == null ? void 0 : l.data) == null ? void 0 : f.map((d) => {
      const b = e.dayjs(d.connectedAt), w = e.dayjs(d.expiresAt);
      return /* @__PURE__ */ t.createElement("div", { key: d.email, className: "flex gap-2 items-center", __self: void 0, __source: {
        fileName: r,
        lineNumber: 27,
        columnNumber: 13
      } }, /* @__PURE__ */ t.createElement("div", { className: "font-semibold", __self: void 0, __source: {
        fileName: r,
        lineNumber: 28,
        columnNumber: 15
      } }, d.email), /* @__PURE__ */ t.createElement("span", { className: "text-sm text-foreground-700", __self: void 0, __source: {
        fileName: r,
        lineNumber: 29,
        columnNumber: 15
      } }, "connected ", b.fromNow(), " • expires ", w.fromNow()));
    }), /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/linear/auth`, __self: void 0, __source: {
      fileName: r,
      lineNumber: 35,
      columnNumber: 9
    } }, (_ = l == null ? void 0 : l.data) != null && _.length ? /* @__PURE__ */ t.createElement(n.Button, { secondary: !0, __self: void 0, __source: {
      fileName: r,
      lineNumber: 37,
      columnNumber: 13
    } }, "Connect another account") : /* @__PURE__ */ t.createElement(n.Button, { __self: void 0, __source: {
      fileName: r,
      lineNumber: 39,
      columnNumber: 13
    } }, "Connect Linear")));
  }, o = (l) => /* @__PURE__ */ t.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", width: l.size ?? 20, height: l.size ?? 20, viewBox: "0 0 100 100", __self: void 0, __source: {
    fileName: r,
    lineNumber: 47,
    columnNumber: 5
  } }, /* @__PURE__ */ t.createElement("path", { fill: "currentColor", d: "M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887215.5599.28957165.7606L52.3503 99.7085c.2007.2007.4773.3075.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.77832 4.5932-.92588465 6.9624ZM4.21093 29.7054c-.16649.3738-.08169.8106.20765 1.1l64.77602 64.776c.2894.2894.7262.3742 1.1.2077 1.7861-.7956 3.5171-1.6927 5.1855-2.684.5521-.328.6373-1.0867.1832-1.5407L8.43566 24.3367c-.45409-.4541-1.21271-.3689-1.54074.1832-.99132 1.6684-1.88843 3.3994-2.68399 5.1855ZM12.6587 18.074c-.3701-.3701-.393-.9637-.0443-1.3541C21.7795 6.45931 35.1114 0 49.9519 0 77.5927 0 100 22.4073 100 50.0481c0 14.8405-6.4593 28.1724-16.7199 37.3375-.3903.3487-.984.3258-1.3542-.0443L12.6587 18.074Z", __self: void 0, __source: {
    fileName: r,
    lineNumber: 54,
    columnNumber: 7
  } })), c = () => {
    var f;
    const l = e.operations.useLazyQuery({
      operationName: "views"
    });
    return /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-4 bg-background-50 shadow px-4 py-2 rounded max-w-3xl", __self: void 0, __source: {
      fileName: r,
      lineNumber: 67,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
      fileName: r,
      lineNumber: 68,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement("div", { className: "text-lg font-semibold", __self: void 0, __source: {
      fileName: r,
      lineNumber: 69,
      columnNumber: 11
    } }, "Linear Views"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700", __self: void 0, __source: {
      fileName: r,
      lineNumber: 70,
      columnNumber: 11
    } }, "Create and connect views to sync issues from Linear with specific filters.")), /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: r,
      lineNumber: 74,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(m, { isUserIssues: !0, view: {
      id: "my-issues",
      name: "My Issues",
      account: "me",
      synced: !0,
      color: null,
      icon: null
    }, __self: void 0, __source: {
      fileName: r,
      lineNumber: 75,
      columnNumber: 11
    } }), (f = l == null ? void 0 : l.data) == null ? void 0 : f.views.map((_) => /* @__PURE__ */ t.createElement(m, { key: _.id, view: _, __self: void 0, __source: {
      fileName: r,
      lineNumber: 86,
      columnNumber: 50
    } }))));
  }, m = (l) => {
    const [f, _] = e.operations.useMutation("addViewToSync"), [d, b] = e.operations.useMutation("removeViewToSync"), w = l.view.color ? e.nearestTailwindColor(l.view.color) : "blue";
    return /* @__PURE__ */ t.createElement("div", { className: "flex gap-2 w-full items-center", __self: void 0, __source: {
      fileName: r,
      lineNumber: 100,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement("div", { className: `h-2 w-2 rounded-full bg-${w}-500`, __self: void 0, __source: {
      fileName: r,
      lineNumber: 101,
      columnNumber: 9
    } }), /* @__PURE__ */ t.createElement("div", { className: "font-semibold", __self: void 0, __source: {
      fileName: r,
      lineNumber: 102,
      columnNumber: 9
    } }, l.view.name), l.isUserIssues ? /* @__PURE__ */ t.createElement("div", { className: "bg-primary-50 text-primary-500 rounded-md text-sm shadow-none px-2 py-1", __self: void 0, __source: {
      fileName: r,
      lineNumber: 104,
      columnNumber: 11
    } }, "Connected") : l.view.synced ? /* @__PURE__ */ t.createElement(n.Button, { secondary: !0, sm: !0, onClick: () => d({
      viewId: l.view.id,
      account: l.view.account
    }), loading: b, __self: void 0, __source: {
      fileName: r,
      lineNumber: 108,
      columnNumber: 11
    } }, "Disconnect") : /* @__PURE__ */ t.createElement(n.Button, { secondary: !0, sm: !0, onClick: () => f({
      viewId: l.view.id,
      account: l.view.account
    }), loading: _, __self: void 0, __source: {
      fileName: r,
      lineNumber: 117,
      columnNumber: 11
    } }, "Connect"));
  }, s = () => {
    const [l, f] = t.useState(!0), [_, d] = t.useState(!1), [b, w] = t.useState([]), [R, X] = t.useState({
      viewId: "my-issues",
      account: "me"
    });
    e.hooks.useAsyncEffect(async () => {
      var S, E;
      f(!0);
      const v = await e.operations.query({
        operationName: "views"
      }).finally(() => f(!1));
      d(((S = v == null ? void 0 : v.data) == null ? void 0 : S.connected) ?? !1), w(((E = v == null ? void 0 : v.data) == null ? void 0 : E.views) ?? []);
    }, []);
    const [Y, Q] = e.operations.useMutation("syncUserIssues", {
      minimumWait: 1e3
    }), [ee, te] = e.operations.useMutation("syncView", {
      minimumWait: 1e3
    }), B = Q || te, re = () => {
      R.viewId === "my-issues" ? Y() : ee(R);
    };
    return /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2 bg-background-100 h-full", __self: void 0, __source: {
      fileName: r,
      lineNumber: 167,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement("div", { className: "px-4 pt-3 flex", __self: void 0, __source: {
      fileName: r,
      lineNumber: 168,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement("span", { className: "text-xl font-semibold", __self: void 0, __source: {
      fileName: r,
      lineNumber: 169,
      columnNumber: 11
    } }, "Linear")), /* @__PURE__ */ t.createElement("div", { className: "px-3 flex justify-between gap-2 items-center", __self: void 0, __source: {
      fileName: r,
      lineNumber: 171,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(n.Select, { defaultValue: "my-issues", onValueChange: (v) => X((S) => {
      const E = b.find((ne) => ne.id === v);
      return E ? {
        viewId: v,
        account: E.account
      } : S;
    }), __self: void 0, __source: {
      fileName: r,
      lineNumber: 172,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(n.SelectUnstyledTrigger, { className: "flex items-center gap-2 text-foreground-700 text-base font-semibold hover:text-primary-500", __self: void 0, __source: {
      fileName: r,
      lineNumber: 182,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement(n.SelectValue, { __self: void 0, __source: {
      fileName: r,
      lineNumber: 183,
      columnNumber: 15
    } }), /* @__PURE__ */ t.createElement(xe, { size: 14, color: "currentColor", __self: void 0, __source: {
      fileName: r,
      lineNumber: 184,
      columnNumber: 15
    } })), /* @__PURE__ */ t.createElement(n.SelectContent, { align: "start", __self: void 0, __source: {
      fileName: r,
      lineNumber: 186,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement(n.SelectItem, { value: "my-issues", __self: void 0, __source: {
      fileName: r,
      lineNumber: 187,
      columnNumber: 15
    } }, "My Issues"), b.map((v) => /* @__PURE__ */ t.createElement(n.SelectItem, { value: v.id, __self: void 0, __source: {
      fileName: r,
      lineNumber: 189,
      columnNumber: 17
    } }, v.name)), /* @__PURE__ */ t.createElement(n.SelectSeparator, { __self: void 0, __source: {
      fileName: r,
      lineNumber: 191,
      columnNumber: 15
    } }), /* @__PURE__ */ t.createElement("div", { className: "max-w-48 text-foreground-700 text-center", __self: void 0, __source: {
      fileName: r,
      lineNumber: 192,
      columnNumber: 15
    } }, "Go to", " ", /* @__PURE__ */ t.createElement("a", { href: "/settings/plugin/linear", className: "underline hover:no-underline", __self: void 0, __source: {
      fileName: r,
      lineNumber: 194,
      columnNumber: 17
    } }, "settings"), " ", "to connect views from Linear."))), /* @__PURE__ */ t.createElement(n.Button, { tertiary: !0, sm: !0, onClick: re, disabled: B, __self: void 0, __source: {
      fileName: r,
      lineNumber: 201,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(Ee, { size: 20, className: e.tw(B && "animate-spin"), __self: void 0, __source: {
      fileName: r,
      lineNumber: 202,
      columnNumber: 13
    } }))), l ? /* @__PURE__ */ t.createElement("div", { className: "h-full flex items-center justify-center transform scale-70", __self: void 0, __source: {
      fileName: r,
      lineNumber: 240,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(n.Loading, { __self: void 0, __source: {
      fileName: r,
      lineNumber: 241,
      columnNumber: 13
    } })) : /* @__PURE__ */ t.createElement(t.Fragment, null, !_ && /* @__PURE__ */ t.createElement("div", { className: "h-full flex items-center justify-center p-3", __self: void 0, __source: {
      fileName: r,
      lineNumber: 208,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2 items-center", __self: void 0, __source: {
      fileName: r,
      lineNumber: 209,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement("div", { className: "text-center", __self: void 0, __source: {
      fileName: r,
      lineNumber: 210,
      columnNumber: 19
    } }, "Connect your Linear account to get started."), /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/linear/auth`, __self: void 0, __source: {
      fileName: r,
      lineNumber: 211,
      columnNumber: 19
    } }, /* @__PURE__ */ t.createElement(n.Button, { __self: void 0, __source: {
      fileName: r,
      lineNumber: 212,
      columnNumber: 21
    } }, "Connect Linear")))), /* @__PURE__ */ t.createElement(n.ItemsList, { where: {
      isRelevant: !0,
      pluginDatas: {
        some: {
          pluginSlug: e.pluginSlug,
          min: {
            path: ["views"],
            array_contains: [R.viewId]
          }
        }
      }
    }, emptyState: _ ? /* @__PURE__ */ t.createElement("div", { className: "h-full flex items-center justify-center", __self: void 0, __source: {
      fileName: r,
      lineNumber: 229,
      columnNumber: 19
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col items-center gap-2", __self: void 0, __source: {
      fileName: r,
      lineNumber: 230,
      columnNumber: 21
    } }, /* @__PURE__ */ t.createElement(Se, { size: 32, className: "text-foreground-700", __self: void 0, __source: {
      fileName: r,
      lineNumber: 231,
      columnNumber: 23
    } }), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700", __self: void 0, __source: {
      fileName: r,
      lineNumber: 232,
      columnNumber: 23
    } }, "No issues found"))) : null, __self: void 0, __source: {
      fileName: r,
      lineNumber: 217,
      columnNumber: 13
    } })));
  }, a = {
    0: null,
    1: /* @__PURE__ */ t.createElement("div", { className: "bg-orange-200 text-orange-700 flex items-center gap-1 px-1 py-px rounded text-sm", __self: void 0, __source: {
      fileName: r,
      lineNumber: 251,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(Ce, { size: 14, __self: void 0, __source: {
      fileName: r,
      lineNumber: 252,
      columnNumber: 9
    } }), "Urgent"),
    2: /* @__PURE__ */ t.createElement("div", { className: "bg-gray-200 text-gray-700 flex items-center gap-1 px-1 py-px rounded text-sm", __self: void 0, __source: {
      fileName: r,
      lineNumber: 257,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(Re, { size: 14, __self: void 0, __source: {
      fileName: r,
      lineNumber: 258,
      columnNumber: 9
    } }), "High"),
    3: /* @__PURE__ */ t.createElement("div", { className: "bg-gray-200 text-gray-700 flex items-center gap-1 px-1 py-px rounded text-sm", __self: void 0, __source: {
      fileName: r,
      lineNumber: 263,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(ze, { size: 14, __self: void 0, __source: {
      fileName: r,
      lineNumber: 264,
      columnNumber: 9
    } }), "Medium"),
    4: /* @__PURE__ */ t.createElement("div", { className: "bg-gray-200 text-gray-700 flex items-center gap-1 px-1 py-px rounded text-sm", __self: void 0, __source: {
      fileName: r,
      lineNumber: 269,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(ke, { size: 14, __self: void 0, __source: {
      fileName: r,
      lineNumber: 270,
      columnNumber: 9
    } }), "Low")
  };
  return {
    name: "Linear",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement(n.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var f, _, d;
          return ((d = (_ = (f = l.cause) == null ? void 0 : f[0]) == null ? void 0 : _.extensions) == null ? void 0 : d.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ t.createElement(t.Fragment, null) : /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: r,
            lineNumber: 288,
            columnNumber: 24
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: r,
          lineNumber: 283,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow p-4 max-w-3xl", __self: void 0, __source: {
          fileName: r,
          lineNumber: 293,
          columnNumber: 19
        } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700", __self: void 0, __source: {
          fileName: r,
          lineNumber: 294,
          columnNumber: 21
        } }, "Loading connected accounts..."), /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/linear/auth`, __self: void 0, __source: {
          fileName: r,
          lineNumber: 295,
          columnNumber: 21
        } }, /* @__PURE__ */ t.createElement(n.Button, { __self: void 0, __source: {
          fileName: r,
          lineNumber: 296,
          columnNumber: 23
        } }, "Connect Linear"))), __self: void 0, __source: {
          fileName: r,
          lineNumber: 291,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(u, { __self: void 0, __source: {
          fileName: r,
          lineNumber: 301,
          columnNumber: 17
        } })))
      },
      views: {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement(n.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
          fileName: r,
          lineNumber: 313,
          columnNumber: 24
        } }, l.message), __self: void 0, __source: {
          fileName: r,
          lineNumber: 311,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: "Loading views...", __self: void 0, __source: {
          fileName: r,
          lineNumber: 316,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(c, { __self: void 0, __source: {
          fileName: r,
          lineNumber: 317,
          columnNumber: 17
        } })))
      },
      syncAllViews: {
        type: "custom",
        render: () => {
          const [l, f] = t.useState(!1);
          return /* @__PURE__ */ t.createElement("div", { className: "flex gap-2 items-center", __self: void 0, __source: {
            fileName: r,
            lineNumber: 328,
            columnNumber: 13
          } }, /* @__PURE__ */ t.createElement(n.Button, { secondary: !0, onClick: async () => {
            f(!0), await e.operations.mutation({
              operationName: "syncAllViews"
            }), f(!1);
          }, loading: l, __self: void 0, __source: {
            fileName: r,
            lineNumber: 329,
            columnNumber: 15
          } }, "Refresh All Views"), /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
            fileName: r,
            lineNumber: 342,
            columnNumber: 15
          } }, "This will refresh all views and their issues. This may take a while."));
        }
      }
    },
    renderLists: async () => [{
      id: "linear",
      name: "Linear",
      icon: /* @__PURE__ */ t.createElement(o, { __self: void 0, __source: {
        fileName: r,
        lineNumber: 348,
        columnNumber: 69
      } })
    }],
    renderList: async () => ({
      component: s
    }),
    renderItemCardDetails: async ({
      item: l
    }) => {
      const f = l.pluginDatas.find((b) => b.pluginSlug === e.pluginSlug);
      if (!f)
        return null;
      const _ = f.min, d = e.nearestTailwindColor(_.state.color);
      return [{
        component: () => /* @__PURE__ */ t.createElement(n.Badge, { className: `bg-${d}-200 text-${d}-700`, __self: void 0, __source: {
          fileName: r,
          lineNumber: 358,
          columnNumber: 13
        } }, _.state.name)
      }, {
        component: () => a[_.priority]
      }];
    },
    renderItemCardActions: async ({
      item: l
    }) => {
      const f = l.pluginDatas.find((d) => d.pluginSlug === e.pluginSlug);
      if (!f)
        return null;
      const _ = f.min;
      return [{
        component: () => /* @__PURE__ */ t.createElement("a", { href: _.url, target: "_blank", rel: "noreferrer", className: "bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100", __self: void 0, __source: {
          fileName: r,
          lineNumber: 373,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement(o, { size: 16, __self: void 0, __source: {
          fileName: r,
          lineNumber: 379,
          columnNumber: 15
        } }))
      }];
    }
  };
});
export {
  Ie as default
};
