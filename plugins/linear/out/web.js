function ne(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var T = { exports: {} }, a = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var E = Symbol.for("react.element"), le = Symbol.for("react.portal"), ue = Symbol.for("react.fragment"), oe = Symbol.for("react.strict_mode"), ae = Symbol.for("react.profiler"), ie = Symbol.for("react.provider"), ce = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), me = Symbol.for("react.suspense"), fe = Symbol.for("react.memo"), _e = Symbol.for("react.lazy"), B = Symbol.iterator;
function de(e) {
  return e === null || typeof e != "object" ? null : (e = B && e[B] || e["@@iterator"], typeof e == "function" ? e : null);
}
var P = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, D = Object.assign, U = {};
function g(e, t, n) {
  this.props = e, this.context = t, this.refs = U, this.updater = n || P;
}
g.prototype.isReactComponent = {};
g.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
g.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function F() {
}
F.prototype = g.prototype;
function L(e, t, n) {
  this.props = e, this.context = t, this.refs = U, this.updater = n || P;
}
var I = L.prototype = new F();
I.constructor = L;
D(I, g.prototype);
I.isPureReactComponent = !0;
var $ = Array.isArray, H = Object.prototype.hasOwnProperty, j = { current: null }, q = { key: !0, ref: !0, __self: !0, __source: !0 };
function W(e, t, n) {
  var u, o = {}, c = null, m = null;
  if (t != null)
    for (u in t.ref !== void 0 && (m = t.ref), t.key !== void 0 && (c = "" + t.key), t)
      H.call(t, u) && !q.hasOwnProperty(u) && (o[u] = t[u]);
  var s = arguments.length - 2;
  if (s === 1)
    o.children = n;
  else if (1 < s) {
    for (var l = Array(s), i = 0; i < s; i++)
      l[i] = arguments[i + 2];
    o.children = l;
  }
  if (e && e.defaultProps)
    for (u in s = e.defaultProps, s)
      o[u] === void 0 && (o[u] = s[u]);
  return { $$typeof: E, type: e, key: c, ref: m, props: o, _owner: j.current };
}
function Ne(e, t) {
  return { $$typeof: E, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function V(e) {
  return typeof e == "object" && e !== null && e.$$typeof === E;
}
function ve(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var M = /\/+/g;
function z(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ve("" + e.key) : t.toString(36);
}
function C(e, t, n, u, o) {
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
          case E:
          case le:
            m = !0;
        }
    }
  if (m)
    return m = e, o = o(m), e = u === "" ? "." + z(m, 0) : u, $(o) ? (n = "", e != null && (n = e.replace(M, "$&/") + "/"), C(o, t, n, "", function(i) {
      return i;
    })) : o != null && (V(o) && (o = Ne(o, n + (!o.key || m && m.key === o.key ? "" : ("" + o.key).replace(M, "$&/") + "/") + e)), t.push(o)), 1;
  if (m = 0, u = u === "" ? "." : u + ":", $(e))
    for (var s = 0; s < e.length; s++) {
      c = e[s];
      var l = u + z(c, s);
      m += C(c, t, n, l, o);
    }
  else if (l = de(e), typeof l == "function")
    for (e = l.call(e), s = 0; !(c = e.next()).done; )
      c = c.value, l = u + z(c, s++), m += C(c, t, n, l, o);
  else if (c === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return m;
}
function S(e, t, n) {
  if (e == null)
    return e;
  var u = [], o = 0;
  return C(e, u, "", "", function(c) {
    return t.call(n, c, o++);
  }), u;
}
function be(e) {
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
var d = { current: null }, k = { transition: null }, pe = { ReactCurrentDispatcher: d, ReactCurrentBatchConfig: k, ReactCurrentOwner: j };
function Z() {
  throw Error("act(...) is not supported in production builds of React.");
}
a.Children = { map: S, forEach: function(e, t, n) {
  S(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return S(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return S(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!V(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
a.Component = g;
a.Fragment = ue;
a.Profiler = ae;
a.PureComponent = L;
a.StrictMode = oe;
a.Suspense = me;
a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pe;
a.act = Z;
a.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var u = D({}, e.props), o = e.key, c = e.ref, m = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (c = t.ref, m = j.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps)
      var s = e.type.defaultProps;
    for (l in t)
      H.call(t, l) && !q.hasOwnProperty(l) && (u[l] = t[l] === void 0 && s !== void 0 ? s[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1)
    u.children = n;
  else if (1 < l) {
    s = Array(l);
    for (var i = 0; i < l; i++)
      s[i] = arguments[i + 2];
    u.children = s;
  }
  return { $$typeof: E, type: e.type, key: o, ref: c, props: u, _owner: m };
};
a.createContext = function(e) {
  return e = { $$typeof: ce, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: ie, _context: e }, e.Consumer = e;
};
a.createElement = W;
a.createFactory = function(e) {
  var t = W.bind(null, e);
  return t.type = e, t;
};
a.createRef = function() {
  return { current: null };
};
a.forwardRef = function(e) {
  return { $$typeof: se, render: e };
};
a.isValidElement = V;
a.lazy = function(e) {
  return { $$typeof: _e, _payload: { _status: -1, _result: e }, _init: be };
};
a.memo = function(e, t) {
  return { $$typeof: fe, type: e, compare: t === void 0 ? null : t };
};
a.startTransition = function(e) {
  var t = k.transition;
  k.transition = {};
  try {
    e();
  } finally {
    k.transition = t;
  }
};
a.unstable_act = Z;
a.useCallback = function(e, t) {
  return d.current.useCallback(e, t);
};
a.useContext = function(e) {
  return d.current.useContext(e);
};
a.useDebugValue = function() {
};
a.useDeferredValue = function(e) {
  return d.current.useDeferredValue(e);
};
a.useEffect = function(e, t) {
  return d.current.useEffect(e, t);
};
a.useId = function() {
  return d.current.useId();
};
a.useImperativeHandle = function(e, t, n) {
  return d.current.useImperativeHandle(e, t, n);
};
a.useInsertionEffect = function(e, t) {
  return d.current.useInsertionEffect(e, t);
};
a.useLayoutEffect = function(e, t) {
  return d.current.useLayoutEffect(e, t);
};
a.useMemo = function(e, t) {
  return d.current.useMemo(e, t);
};
a.useReducer = function(e, t, n) {
  return d.current.useReducer(e, t, n);
};
a.useRef = function(e) {
  return d.current.useRef(e);
};
a.useState = function(e) {
  return d.current.useState(e);
};
a.useSyncExternalStore = function(e, t, n) {
  return d.current.useSyncExternalStore(e, t, n);
};
a.useTransition = function() {
  return d.current.useTransition();
};
a.version = "18.3.1";
T.exports = a;
var ye = T.exports;
const p = /* @__PURE__ */ ne(ye);
var G = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, A = p.createContext && p.createContext(G), b = function() {
  return b = Object.assign || function(e) {
    for (var t, n = 1, u = arguments.length; n < u; n++) {
      t = arguments[n];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, b.apply(this, arguments);
}, ge = function(e, t) {
  var n = {};
  for (var u in e)
    Object.prototype.hasOwnProperty.call(e, u) && t.indexOf(u) < 0 && (n[u] = e[u]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, u = Object.getOwnPropertySymbols(e); o < u.length; o++)
      t.indexOf(u[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, u[o]) && (n[u[o]] = e[u[o]]);
  return n;
};
function J(e) {
  return e && e.map(function(t, n) {
    return p.createElement(t.tag, b({
      key: n
    }, t.attr), J(t.child));
  });
}
function y(e) {
  return function(t) {
    return p.createElement(he, b({
      attr: b({}, e.attr)
    }, t), J(e.child));
  };
}
function he(e) {
  var t = function(n) {
    var u = e.attr, o = e.size, c = e.title, m = ge(e, ["attr", "size", "title"]), s = o || n.size || "1em", l;
    return n.className && (l = n.className), e.className && (l = (l ? l + " " : "") + e.className), p.createElement("svg", b({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, u, m, {
      className: l,
      style: b(b({
        color: e.color || n.color
      }, n.style), e.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), c && p.createElement("title", null, c), e.children);
  };
  return A !== void 0 ? p.createElement(A.Consumer, null, function(n) {
    return t(n);
  }) : t(G);
}
function we(e) {
  return y({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" } }, { tag: "path", attr: { d: "M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" } }] })(e);
}
function Ee(e) {
  return y({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
}
function xe(e) {
  return y({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M8.5 2a5.001 5.001 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5.001 5.001 0 0 1 8.5 2zm-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" } }] })(e);
}
function Se(e) {
  return y({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" } }] })(e);
}
function Ce(e) {
  return y({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" } }] })(e);
}
function ke(e) {
  return y({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4 5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" } }] })(e);
}
function Re(e) {
  return y({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z" } }] })(e);
}
const ze = (e) => ({ plugin: e });
var r = "/Users/richardguerre/Projects/flow/plugins/linear/src/web.tsx";
const Ie = ze((e) => {
  const t = e.React, n = e.components, u = () => {
    var i, f;
    const l = e.operations.useLazyQuery({
      operationName: "accounts"
    });
    return /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow p-4 max-w-3xl", __self: void 0, __source: {
      fileName: r,
      lineNumber: 22,
      columnNumber: 7
    } }, (i = l == null ? void 0 : l.data) == null ? void 0 : i.map((_) => {
      const v = e.dayjs(_.connectedAt), h = e.dayjs(_.expiresAt);
      return /* @__PURE__ */ t.createElement("div", { key: _.email, className: "flex gap-2 items-center", __self: void 0, __source: {
        fileName: r,
        lineNumber: 27,
        columnNumber: 13
      } }, /* @__PURE__ */ t.createElement("div", { className: "font-semibold", __self: void 0, __source: {
        fileName: r,
        lineNumber: 28,
        columnNumber: 15
      } }, _.email), /* @__PURE__ */ t.createElement("span", { className: "text-sm text-foreground-700", __self: void 0, __source: {
        fileName: r,
        lineNumber: 29,
        columnNumber: 15
      } }, "connected ", v.fromNow(), " • expires ", h.fromNow()));
    }), /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/linear/auth`, __self: void 0, __source: {
      fileName: r,
      lineNumber: 35,
      columnNumber: 9
    } }, (f = l == null ? void 0 : l.data) != null && f.length ? /* @__PURE__ */ t.createElement(n.Button, { secondary: !0, __self: void 0, __source: {
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
    var i;
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
    } }), (i = l == null ? void 0 : l.data) == null ? void 0 : i.views.map((f) => /* @__PURE__ */ t.createElement(m, { key: f.id, view: f, __self: void 0, __source: {
      fileName: r,
      lineNumber: 86,
      columnNumber: 50
    } }))));
  }, m = (l) => {
    const [i, f] = e.operations.useMutation("addViewToSync"), [_, v] = e.operations.useMutation("removeViewToSync"), h = l.view.color ? e.nearestTailwindColor(l.view.color) : "blue";
    return /* @__PURE__ */ t.createElement("div", { className: "flex gap-2 w-full items-center", __self: void 0, __source: {
      fileName: r,
      lineNumber: 100,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement("div", { className: `h-2 w-2 rounded-full bg-${h}-500`, __self: void 0, __source: {
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
    } }, "Connected") : l.view.synced ? /* @__PURE__ */ t.createElement(n.Button, { secondary: !0, sm: !0, onClick: () => _({
      viewId: l.view.id,
      account: l.view.account
    }), loading: v, __self: void 0, __source: {
      fileName: r,
      lineNumber: 108,
      columnNumber: 11
    } }, "Disconnect") : /* @__PURE__ */ t.createElement(n.Button, { secondary: !0, sm: !0, onClick: () => i({
      viewId: l.view.id,
      account: l.view.account
    }), loading: f, __self: void 0, __source: {
      fileName: r,
      lineNumber: 117,
      columnNumber: 11
    } }, "Connect"));
  }, s = () => {
    const [l, i] = t.useState(!0), [f, _] = t.useState(!1), [v, h] = t.useState([]), [R, K] = t.useState({
      viewId: "my-issues",
      account: "me"
    });
    e.hooks.useAsyncEffect(async () => {
      var x, w;
      i(!0);
      const N = await e.operations.query({
        operationName: "views"
      }).finally(() => i(!1));
      _(((x = N == null ? void 0 : N.data) == null ? void 0 : x.connected) ?? !1), h(((w = N == null ? void 0 : N.data) == null ? void 0 : w.views) ?? []);
    }, []);
    const [X, Y] = e.operations.useMutation("syncUserIssues", {
      minimumWait: 1e3
    }), [Q, ee] = e.operations.useMutation("syncView", {
      minimumWait: 1e3
    }), O = Y || ee, te = () => {
      R.viewId === "my-issues" ? X() : Q(R);
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
    } }, /* @__PURE__ */ t.createElement(n.Select, { defaultValue: "my-issues", onValueChange: (N) => K((x) => {
      const w = v.find((re) => re.id === N);
      return w ? {
        viewId: N,
        account: w.account
      } : x;
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
    } }), /* @__PURE__ */ t.createElement(Ee, { size: 14, color: "currentColor", __self: void 0, __source: {
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
    } }, "My Issues"), v.map((N) => /* @__PURE__ */ t.createElement(n.SelectItem, { value: N.id, __self: void 0, __source: {
      fileName: r,
      lineNumber: 189,
      columnNumber: 17
    } }, N.name)), /* @__PURE__ */ t.createElement(n.SelectSeparator, { __self: void 0, __source: {
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
    } }, "settings"), " ", "to connect views from Linear."))), /* @__PURE__ */ t.createElement(n.Button, { tertiary: !0, sm: !0, onClick: te, disabled: O, __self: void 0, __source: {
      fileName: r,
      lineNumber: 201,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(we, { size: 20, className: e.tw(O && "animate-spin"), __self: void 0, __source: {
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
    } })) : /* @__PURE__ */ t.createElement(t.Fragment, null, !f && /* @__PURE__ */ t.createElement("div", { className: "h-full flex items-center justify-center p-3", __self: void 0, __source: {
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
    }, emptyState: f ? /* @__PURE__ */ t.createElement("div", { className: "h-full flex items-center justify-center", __self: void 0, __source: {
      fileName: r,
      lineNumber: 229,
      columnNumber: 19
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col items-center gap-2", __self: void 0, __source: {
      fileName: r,
      lineNumber: 230,
      columnNumber: 21
    } }, /* @__PURE__ */ t.createElement(xe, { size: 32, className: "text-foreground-700", __self: void 0, __source: {
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
  };
  return {
    name: "Linear",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement(n.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var i, f, _;
          return ((_ = (f = (i = l.cause) == null ? void 0 : i[0]) == null ? void 0 : f.extensions) == null ? void 0 : _.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ t.createElement(t.Fragment, null) : /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: r,
            lineNumber: 260,
            columnNumber: 24
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: r,
          lineNumber: 255,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow p-4 max-w-3xl", __self: void 0, __source: {
          fileName: r,
          lineNumber: 265,
          columnNumber: 19
        } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700", __self: void 0, __source: {
          fileName: r,
          lineNumber: 266,
          columnNumber: 21
        } }, "Loading connected accounts..."), /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/linear/auth`, __self: void 0, __source: {
          fileName: r,
          lineNumber: 267,
          columnNumber: 21
        } }, /* @__PURE__ */ t.createElement(n.Button, { __self: void 0, __source: {
          fileName: r,
          lineNumber: 268,
          columnNumber: 23
        } }, "Connect Linear"))), __self: void 0, __source: {
          fileName: r,
          lineNumber: 263,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(u, { __self: void 0, __source: {
          fileName: r,
          lineNumber: 273,
          columnNumber: 17
        } })))
      },
      views: {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement(n.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
          fileName: r,
          lineNumber: 285,
          columnNumber: 24
        } }, l.message), __self: void 0, __source: {
          fileName: r,
          lineNumber: 283,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: "Loading views...", __self: void 0, __source: {
          fileName: r,
          lineNumber: 288,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(c, { __self: void 0, __source: {
          fileName: r,
          lineNumber: 289,
          columnNumber: 17
        } })))
      },
      syncAllViews: {
        type: "custom",
        render: () => {
          const [l, i] = t.useState(!1);
          return /* @__PURE__ */ t.createElement("div", { className: "flex gap-2 items-center", __self: void 0, __source: {
            fileName: r,
            lineNumber: 300,
            columnNumber: 13
          } }, /* @__PURE__ */ t.createElement(n.Button, { secondary: !0, onClick: async () => {
            i(!0), await e.operations.mutation({
              operationName: "syncAllViews"
            }), i(!1);
          }, loading: l, __self: void 0, __source: {
            fileName: r,
            lineNumber: 301,
            columnNumber: 15
          } }, "Refresh All Views"), /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
            fileName: r,
            lineNumber: 314,
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
        lineNumber: 320,
        columnNumber: 69
      } })
    }],
    renderList: async () => ({
      component: s
    }),
    renderItemCardDetails: async ({
      item: l
    }) => {
      const i = l.pluginDatas.find((v) => v.pluginSlug === e.pluginSlug);
      if (!i)
        return null;
      const f = i.min, _ = e.nearestTailwindColor(f.state.color);
      return [{
        component: () => /* @__PURE__ */ t.createElement(n.Badge, { className: `bg-${_}-200 text-${_}-700`, __self: void 0, __source: {
          fileName: r,
          lineNumber: 330,
          columnNumber: 13
        } }, f.state.name)
      }, {
        component: () => Le[f.priority]
      }];
    },
    renderItemCardActions: async ({
      item: l
    }) => {
      const i = l.pluginDatas.find((_) => _.pluginSlug === e.pluginSlug);
      if (!i)
        return null;
      const f = i.min;
      return [{
        component: () => /* @__PURE__ */ t.createElement("a", { href: f.url, target: "_blank", rel: "noreferrer", className: "bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100", __self: void 0, __source: {
          fileName: r,
          lineNumber: 345,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement(o, { size: 16, __self: void 0, __source: {
          fileName: r,
          lineNumber: 351,
          columnNumber: 15
        } }))
      }];
    }
  };
}), Le = {
  0: null,
  1: /* @__PURE__ */ React.createElement("div", { className: "bg-orange-200 text-orange-700 flex items-center gap-1 px-1 py-px rounded text-sm", __self: void 0, __source: {
    fileName: r,
    lineNumber: 365,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement(Se, { size: 14, __self: void 0, __source: {
    fileName: r,
    lineNumber: 366,
    columnNumber: 7
  } }), "Urgent"),
  2: /* @__PURE__ */ React.createElement("div", { className: "bg-gray-200 text-gray-700 flex items-center gap-1 px-1 py-px rounded text-sm", __self: void 0, __source: {
    fileName: r,
    lineNumber: 371,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement(Re, { size: 14, __self: void 0, __source: {
    fileName: r,
    lineNumber: 372,
    columnNumber: 7
  } }), "High"),
  3: /* @__PURE__ */ React.createElement("div", { className: "bg-gray-200 text-gray-700 flex items-center gap-1 px-1 py-px rounded text-sm", __self: void 0, __source: {
    fileName: r,
    lineNumber: 377,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement(ke, { size: 14, __self: void 0, __source: {
    fileName: r,
    lineNumber: 378,
    columnNumber: 7
  } }), "Medium"),
  4: /* @__PURE__ */ React.createElement("div", { className: "bg-gray-200 text-gray-700 flex items-center gap-1 px-1 py-px rounded text-sm", __self: void 0, __source: {
    fileName: r,
    lineNumber: 383,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement(Ce, { size: 14, __self: void 0, __source: {
    fileName: r,
    lineNumber: 384,
    columnNumber: 7
  } }), "Low")
};
export {
  Ie as default
};
