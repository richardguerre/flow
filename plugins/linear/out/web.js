function ne(e) {
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
var h = Symbol.for("react.element"), le = Symbol.for("react.portal"), ue = Symbol.for("react.fragment"), oe = Symbol.for("react.strict_mode"), ie = Symbol.for("react.profiler"), ce = Symbol.for("react.provider"), se = Symbol.for("react.context"), ae = Symbol.for("react.forward_ref"), me = Symbol.for("react.suspense"), fe = Symbol.for("react.memo"), _e = Symbol.for("react.lazy"), $ = Symbol.iterator;
function de(e) {
  return e === null || typeof e != "object" ? null : (e = $ && e[$] || e["@@iterator"], typeof e == "function" ? e : null);
}
var T = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, B = Object.assign, D = {};
function p(e, t, r) {
  this.props = e, this.context = t, this.refs = D, this.updater = r || T;
}
p.prototype.isReactComponent = {};
p.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
p.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function U() {
}
U.prototype = p.prototype;
function R(e, t, r) {
  this.props = e, this.context = t, this.refs = D, this.updater = r || T;
}
var I = R.prototype = new U();
I.constructor = R;
B(I, p.prototype);
I.isPureReactComponent = !0;
var z = Array.isArray, F = Object.prototype.hasOwnProperty, L = { current: null }, H = { key: !0, ref: !0, __self: !0, __source: !0 };
function q(e, t, r) {
  var u, o = {}, s = null, m = null;
  if (t != null)
    for (u in t.ref !== void 0 && (m = t.ref), t.key !== void 0 && (s = "" + t.key), t)
      F.call(t, u) && !H.hasOwnProperty(u) && (o[u] = t[u]);
  var a = arguments.length - 2;
  if (a === 1)
    o.children = r;
  else if (1 < a) {
    for (var l = Array(a), c = 0; c < a; c++)
      l[c] = arguments[c + 2];
    o.children = l;
  }
  if (e && e.defaultProps)
    for (u in a = e.defaultProps, a)
      o[u] === void 0 && (o[u] = a[u]);
  return { $$typeof: h, type: e, key: s, ref: m, props: o, _owner: L.current };
}
function Ne(e, t) {
  return { $$typeof: h, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function j(e) {
  return typeof e == "object" && e !== null && e.$$typeof === h;
}
function ve(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(r) {
    return t[r];
  });
}
var A = /\/+/g;
function k(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ve("" + e.key) : t.toString(36);
}
function x(e, t, r, u, o) {
  var s = typeof e;
  (s === "undefined" || s === "boolean") && (e = null);
  var m = !1;
  if (e === null)
    m = !0;
  else
    switch (s) {
      case "string":
      case "number":
        m = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case h:
          case le:
            m = !0;
        }
    }
  if (m)
    return m = e, o = o(m), e = u === "" ? "." + k(m, 0) : u, z(o) ? (r = "", e != null && (r = e.replace(A, "$&/") + "/"), x(o, t, r, "", function(c) {
      return c;
    })) : o != null && (j(o) && (o = Ne(o, r + (!o.key || m && m.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + e)), t.push(o)), 1;
  if (m = 0, u = u === "" ? "." : u + ":", z(e))
    for (var a = 0; a < e.length; a++) {
      s = e[a];
      var l = u + k(s, a);
      m += x(s, t, r, l, o);
    }
  else if (l = de(e), typeof l == "function")
    for (e = l.call(e), a = 0; !(s = e.next()).done; )
      s = s.value, l = u + k(s, a++), m += x(s, t, r, l, o);
  else if (s === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return m;
}
function E(e, t, r) {
  if (e == null)
    return e;
  var u = [], o = 0;
  return x(e, u, "", "", function(s) {
    return t.call(r, s, o++);
  }), u;
}
function be(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(r) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = r);
    }, function(r) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1)
    return e._result.default;
  throw e._result;
}
var _ = { current: null }, S = { transition: null }, ye = { ReactCurrentDispatcher: _, ReactCurrentBatchConfig: S, ReactCurrentOwner: L };
function W() {
  throw Error("act(...) is not supported in production builds of React.");
}
i.Children = { map: E, forEach: function(e, t, r) {
  E(e, function() {
    t.apply(this, arguments);
  }, r);
}, count: function(e) {
  var t = 0;
  return E(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return E(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!j(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
i.Component = p;
i.Fragment = ue;
i.Profiler = ie;
i.PureComponent = R;
i.StrictMode = oe;
i.Suspense = me;
i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ye;
i.act = W;
i.cloneElement = function(e, t, r) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var u = B({}, e.props), o = e.key, s = e.ref, m = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (s = t.ref, m = L.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps)
      var a = e.type.defaultProps;
    for (l in t)
      F.call(t, l) && !H.hasOwnProperty(l) && (u[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1)
    u.children = r;
  else if (1 < l) {
    a = Array(l);
    for (var c = 0; c < l; c++)
      a[c] = arguments[c + 2];
    u.children = a;
  }
  return { $$typeof: h, type: e.type, key: o, ref: s, props: u, _owner: m };
};
i.createContext = function(e) {
  return e = { $$typeof: se, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: ce, _context: e }, e.Consumer = e;
};
i.createElement = q;
i.createFactory = function(e) {
  var t = q.bind(null, e);
  return t.type = e, t;
};
i.createRef = function() {
  return { current: null };
};
i.forwardRef = function(e) {
  return { $$typeof: ae, render: e };
};
i.isValidElement = j;
i.lazy = function(e) {
  return { $$typeof: _e, _payload: { _status: -1, _result: e }, _init: be };
};
i.memo = function(e, t) {
  return { $$typeof: fe, type: e, compare: t === void 0 ? null : t };
};
i.startTransition = function(e) {
  var t = S.transition;
  S.transition = {};
  try {
    e();
  } finally {
    S.transition = t;
  }
};
i.unstable_act = W;
i.useCallback = function(e, t) {
  return _.current.useCallback(e, t);
};
i.useContext = function(e) {
  return _.current.useContext(e);
};
i.useDebugValue = function() {
};
i.useDeferredValue = function(e) {
  return _.current.useDeferredValue(e);
};
i.useEffect = function(e, t) {
  return _.current.useEffect(e, t);
};
i.useId = function() {
  return _.current.useId();
};
i.useImperativeHandle = function(e, t, r) {
  return _.current.useImperativeHandle(e, t, r);
};
i.useInsertionEffect = function(e, t) {
  return _.current.useInsertionEffect(e, t);
};
i.useLayoutEffect = function(e, t) {
  return _.current.useLayoutEffect(e, t);
};
i.useMemo = function(e, t) {
  return _.current.useMemo(e, t);
};
i.useReducer = function(e, t, r) {
  return _.current.useReducer(e, t, r);
};
i.useRef = function(e) {
  return _.current.useRef(e);
};
i.useState = function(e) {
  return _.current.useState(e);
};
i.useSyncExternalStore = function(e, t, r) {
  return _.current.useSyncExternalStore(e, t, r);
};
i.useTransition = function() {
  return _.current.useTransition();
};
i.version = "18.3.1";
P.exports = i;
var pe = P.exports;
const b = /* @__PURE__ */ ne(pe);
var Z = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, M = b.createContext && b.createContext(Z), v = function() {
  return v = Object.assign || function(e) {
    for (var t, r = 1, u = arguments.length; r < u; r++) {
      t = arguments[r];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, v.apply(this, arguments);
}, ge = function(e, t) {
  var r = {};
  for (var u in e)
    Object.prototype.hasOwnProperty.call(e, u) && t.indexOf(u) < 0 && (r[u] = e[u]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, u = Object.getOwnPropertySymbols(e); o < u.length; o++)
      t.indexOf(u[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, u[o]) && (r[u[o]] = e[u[o]]);
  return r;
};
function G(e) {
  return e && e.map(function(t, r) {
    return b.createElement(t.tag, v({
      key: r
    }, t.attr), G(t.child));
  });
}
function O(e) {
  return function(t) {
    return b.createElement(he, v({
      attr: v({}, e.attr)
    }, t), G(e.child));
  };
}
function he(e) {
  var t = function(r) {
    var u = e.attr, o = e.size, s = e.title, m = ge(e, ["attr", "size", "title"]), a = o || r.size || "1em", l;
    return r.className && (l = r.className), e.className && (l = (l ? l + " " : "") + e.className), b.createElement("svg", v({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, u, m, {
      className: l,
      style: v(v({
        color: e.color || r.color
      }, r.style), e.style),
      height: a,
      width: a,
      xmlns: "http://www.w3.org/2000/svg"
    }), s && b.createElement("title", null, s), e.children);
  };
  return M !== void 0 ? b.createElement(M.Consumer, null, function(r) {
    return t(r);
  }) : t(Z);
}
function we(e) {
  return O({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" } }, { tag: "path", attr: { d: "M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" } }] })(e);
}
function Ee(e) {
  return O({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
}
function xe(e) {
  return O({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M8.5 2a5.001 5.001 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5.001 5.001 0 0 1 8.5 2zm-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" } }] })(e);
}
const Se = (e) => ({ plugin: e });
var n = "/Users/richardguerre/Projects/flow/plugins/linear/src/web.tsx";
const Ce = Se((e) => {
  const t = e.React, r = e.components, u = () => {
    var c;
    const l = e.operations.useLazyQuery({
      operationName: "accounts"
    });
    return /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 15,
      columnNumber: 7
    } }, (c = l == null ? void 0 : l.data) == null ? void 0 : c.map((f) => {
      const d = e.dayjs(f.expiresAt);
      return /* @__PURE__ */ t.createElement("div", { key: f.email, className: "flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
        fileName: n,
        lineNumber: 19,
        columnNumber: 13
      } }, /* @__PURE__ */ t.createElement("div", { className: "font-semibold", __self: void 0, __source: {
        fileName: n,
        lineNumber: 23,
        columnNumber: 15
      } }, f.email), /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
        fileName: n,
        lineNumber: 24,
        columnNumber: 15
      } }, "Expires: ", d.fromNow()));
    }));
  }, o = (l) => /* @__PURE__ */ t.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", width: l.size ?? 20, height: l.size ?? 20, viewBox: "0 0 100 100", __self: void 0, __source: {
    fileName: n,
    lineNumber: 33,
    columnNumber: 5
  } }, /* @__PURE__ */ t.createElement("path", { fill: "currentColor", d: "M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887215.5599.28957165.7606L52.3503 99.7085c.2007.2007.4773.3075.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.77832 4.5932-.92588465 6.9624ZM4.21093 29.7054c-.16649.3738-.08169.8106.20765 1.1l64.77602 64.776c.2894.2894.7262.3742 1.1.2077 1.7861-.7956 3.5171-1.6927 5.1855-2.684.5521-.328.6373-1.0867.1832-1.5407L8.43566 24.3367c-.45409-.4541-1.21271-.3689-1.54074.1832-.99132 1.6684-1.88843 3.3994-2.68399 5.1855ZM12.6587 18.074c-.3701-.3701-.393-.9637-.0443-1.3541C21.7795 6.45931 35.1114 0 49.9519 0 77.5927 0 100 22.4073 100 50.0481c0 14.8405-6.4593 28.1724-16.7199 37.3375-.3903.3487-.984.3258-1.3542-.0443L12.6587 18.074Z", __self: void 0, __source: {
    fileName: n,
    lineNumber: 40,
    columnNumber: 7
  } })), s = () => {
    var c;
    const l = e.operations.useLazyQuery({
      operationName: "views"
    });
    return /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 53,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(m, { isUserIssues: !0, view: {
      id: "user-issues",
      name: "My Issues",
      account: "me",
      synced: !0,
      color: null,
      icon: null
    }, __self: void 0, __source: {
      fileName: n,
      lineNumber: 54,
      columnNumber: 9
    } }), (c = l == null ? void 0 : l.data) == null ? void 0 : c.views.map((f) => /* @__PURE__ */ t.createElement(m, { key: f.id, view: f, __self: void 0, __source: {
      fileName: n,
      lineNumber: 65,
      columnNumber: 48
    } })));
  }, m = (l) => {
    const [c, f] = e.operations.useMutation("addViewToSync"), [d, y] = e.operations.useMutation("removeViewToSync");
    return /* @__PURE__ */ t.createElement("div", { className: "flex gap-2 rounded w-full items-center bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 77,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement("div", { className: "h-2 w-2 rounded-full", style: {
      backgroundColor: l.view.color ?? "#3b82f6"
    }, __self: void 0, __source: {
      fileName: n,
      lineNumber: 78,
      columnNumber: 9
    } }), /* @__PURE__ */ t.createElement("div", { className: "font-semibold", __self: void 0, __source: {
      fileName: n,
      lineNumber: 82,
      columnNumber: 9
    } }, l.view.name), l.isUserIssues ? /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 84,
      columnNumber: 11
    } }, "Connected") : l.view.synced ? /* @__PURE__ */ t.createElement(r.Button, { sm: !0, onClick: () => d({
      viewId: l.view.id,
      account: l.view.account
    }), loading: y, __self: void 0, __source: {
      fileName: n,
      lineNumber: 86,
      columnNumber: 11
    } }, "Disconnect") : /* @__PURE__ */ t.createElement(r.Button, { sm: !0, onClick: () => c({
      viewId: l.view.id,
      account: l.view.account
    }), loading: f, __self: void 0, __source: {
      fileName: n,
      lineNumber: 94,
      columnNumber: 11
    } }, "Connect"));
  }, a = () => {
    const [l, c] = t.useState(!0), [f, d] = t.useState(!1), [y, J] = t.useState([]), [C, K] = t.useState({
      viewId: "my-issues",
      account: "me"
    });
    e.hooks.useAsyncEffect(async () => {
      var w, g;
      const N = await e.operations.query({
        operationName: "views"
      });
      d(((w = N == null ? void 0 : N.data) == null ? void 0 : w.connected) ?? !1), J(((g = N == null ? void 0 : N.data) == null ? void 0 : g.views) ?? []), c(!1);
    }, []);
    const [Q, X] = e.operations.useMutation("syncUserIssues", {
      minimumWait: 1e3
    }), [Y, ee] = e.operations.useMutation("syncView", {
      minimumWait: 1e3
    }), V = X || ee, te = () => {
      C.viewId === "my-issues" ? Q() : Y(C);
    };
    return /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2 bg-background-100 h-full", __self: void 0, __source: {
      fileName: n,
      lineNumber: 141,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement("div", { className: "px-3 flex", __self: void 0, __source: {
      fileName: n,
      lineNumber: 142,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement("span", { className: "text-xl font-semibold", __self: void 0, __source: {
      fileName: n,
      lineNumber: 143,
      columnNumber: 11
    } }, "Linear")), /* @__PURE__ */ t.createElement("div", { className: "px-3 flex justify-between gap-2 items-center", __self: void 0, __source: {
      fileName: n,
      lineNumber: 145,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(r.Select, { defaultValue: "my-issues", onValueChange: (N) => K((w) => {
      const g = y.find((re) => re.id === N);
      return g ? {
        viewId: N,
        account: g.account
      } : w;
    }), __self: void 0, __source: {
      fileName: n,
      lineNumber: 146,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(r.SelectUnstyledTrigger, { className: "flex items-center gap-2 text-foreground-700 text-base font-semibold hover:text-primary-500", __self: void 0, __source: {
      fileName: n,
      lineNumber: 156,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement(r.SelectValue, { __self: void 0, __source: {
      fileName: n,
      lineNumber: 157,
      columnNumber: 15
    } }), /* @__PURE__ */ t.createElement(Ee, { size: 14, color: "currentColor", __self: void 0, __source: {
      fileName: n,
      lineNumber: 158,
      columnNumber: 15
    } })), /* @__PURE__ */ t.createElement(r.SelectContent, { align: "start", __self: void 0, __source: {
      fileName: n,
      lineNumber: 160,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement(r.SelectItem, { value: "my-issues", __self: void 0, __source: {
      fileName: n,
      lineNumber: 161,
      columnNumber: 15
    } }, "My Issues"), y.map((N) => /* @__PURE__ */ t.createElement(r.SelectItem, { value: N.id, __self: void 0, __source: {
      fileName: n,
      lineNumber: 163,
      columnNumber: 17
    } }, N.name)), /* @__PURE__ */ t.createElement(r.SelectSeparator, { __self: void 0, __source: {
      fileName: n,
      lineNumber: 165,
      columnNumber: 15
    } }), /* @__PURE__ */ t.createElement("div", { className: "max-w-48 text-foreground-700 text-center", __self: void 0, __source: {
      fileName: n,
      lineNumber: 166,
      columnNumber: 15
    } }, "Go to", " ", /* @__PURE__ */ t.createElement("a", { href: "/settings/plugin/linear", className: "underline hover:no-underline", __self: void 0, __source: {
      fileName: n,
      lineNumber: 168,
      columnNumber: 17
    } }, "settings"), " ", "to connect views from Linear."))), /* @__PURE__ */ t.createElement(r.Button, { tertiary: !0, sm: !0, onClick: te, disabled: V, __self: void 0, __source: {
      fileName: n,
      lineNumber: 175,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(we, { size: 20, className: e.tw(V && "animate-spin"), __self: void 0, __source: {
      fileName: n,
      lineNumber: 176,
      columnNumber: 13
    } }))), l ? /* @__PURE__ */ t.createElement("div", { className: "h-full flex items-center justify-center", __self: void 0, __source: {
      fileName: n,
      lineNumber: 214,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(r.Loading, { __self: void 0, __source: {
      fileName: n,
      lineNumber: 215,
      columnNumber: 13
    } })) : /* @__PURE__ */ t.createElement(t.Fragment, null, !f && /* @__PURE__ */ t.createElement("div", { className: "h-full flex items-center justify-center p-3", __self: void 0, __source: {
      fileName: n,
      lineNumber: 182,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2 items-center", __self: void 0, __source: {
      fileName: n,
      lineNumber: 183,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement("div", { className: "text-center", __self: void 0, __source: {
      fileName: n,
      lineNumber: 184,
      columnNumber: 19
    } }, "Connect your Linear account to get started."), /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/linear/auth`, __self: void 0, __source: {
      fileName: n,
      lineNumber: 185,
      columnNumber: 19
    } }, /* @__PURE__ */ t.createElement(r.Button, { __self: void 0, __source: {
      fileName: n,
      lineNumber: 186,
      columnNumber: 21
    } }, "Connect Linear")))), /* @__PURE__ */ t.createElement(r.ItemsList, { where: {
      isRelevant: !0,
      pluginDatas: {
        some: {
          pluginSlug: e.pluginSlug,
          min: {
            path: ["views"],
            array_contains: [C.viewId]
          }
        }
      }
    }, emptyState: f ? /* @__PURE__ */ t.createElement("div", { className: "h-full flex items-center justify-center", __self: void 0, __source: {
      fileName: n,
      lineNumber: 203,
      columnNumber: 19
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col items-center gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 204,
      columnNumber: 21
    } }, /* @__PURE__ */ t.createElement(xe, { size: 32, className: "text-foreground-700", __self: void 0, __source: {
      fileName: n,
      lineNumber: 205,
      columnNumber: 23
    } }), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700", __self: void 0, __source: {
      fileName: n,
      lineNumber: 206,
      columnNumber: 23
    } }, "No issues found"))) : null, __self: void 0, __source: {
      fileName: n,
      lineNumber: 191,
      columnNumber: 13
    } })));
  };
  return {
    name: "Linear",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: n,
          lineNumber: 229,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/linear/auth`, __self: void 0, __source: {
          fileName: n,
          lineNumber: 230,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(r.Button, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 231,
          columnNumber: 17
        } }, "Connect Linear")), /* @__PURE__ */ t.createElement(r.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var c, f, d;
          return ((d = (f = (c = l.cause) == null ? void 0 : c[0]) == null ? void 0 : f.extensions) == null ? void 0 : d.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ t.createElement(t.Fragment, null) : /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: n,
            lineNumber: 238,
            columnNumber: 26
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: n,
          lineNumber: 233,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: n,
          lineNumber: 241,
          columnNumber: 17
        } }, /* @__PURE__ */ t.createElement(u, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 242,
          columnNumber: 19
        } }))))
      },
      views: {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement(r.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
          fileName: n,
          lineNumber: 255,
          columnNumber: 24
        } }, l.message), __self: void 0, __source: {
          fileName: n,
          lineNumber: 253,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: "Loading views...", __self: void 0, __source: {
          fileName: n,
          lineNumber: 258,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(s, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 259,
          columnNumber: 17
        } })))
      },
      syncAllViews: {
        type: "custom",
        render: () => {
          const [l, c] = t.useState(!1);
          return /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
            fileName: n,
            lineNumber: 270,
            columnNumber: 13
          } }, /* @__PURE__ */ t.createElement(r.Button, { onClick: async () => {
            c(!0), await e.operations.mutation({
              operationName: "syncAllViews"
            }), c(!1);
          }, loading: l, __self: void 0, __source: {
            fileName: n,
            lineNumber: 271,
            columnNumber: 15
          } }, "Refresh All Views"), /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
            fileName: n,
            lineNumber: 283,
            columnNumber: 15
          } }, "This will refresh all views and their issues. This may take a while."));
        }
      }
    },
    renderLists: async () => [{
      id: "linear",
      name: "Linear",
      icon: /* @__PURE__ */ t.createElement(o, { __self: void 0, __source: {
        fileName: n,
        lineNumber: 289,
        columnNumber: 69
      } })
    }],
    renderList: async () => ({
      component: a
    }),
    renderItemCardDetails: async ({
      item: l
    }) => {
      const c = l.pluginDatas.find((y) => y.pluginSlug === e.pluginSlug);
      if (!c)
        return null;
      const f = c.min, d = e.nearestTailwindColor(f.state.color);
      return [{
        component: () => /* @__PURE__ */ t.createElement(r.Badge, { className: `bg-${d}-200 text-${d}-600`, __self: void 0, __source: {
          fileName: n,
          lineNumber: 299,
          columnNumber: 13
        } }, f.state.name)
      }];
    },
    renderItemCardActions: async ({
      item: l
    }) => {
      const c = l.pluginDatas.find((d) => d.pluginSlug === e.pluginSlug);
      if (!c)
        return null;
      const f = c.min;
      return [{
        component: () => /* @__PURE__ */ t.createElement("a", { href: f.url, target: "_blank", rel: "noreferrer", __self: void 0, __source: {
          fileName: n,
          lineNumber: 313,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement(o, { size: 16, __self: void 0, __source: {
          fileName: n,
          lineNumber: 314,
          columnNumber: 15
        } }))
      }];
    }
  };
});
export {
  Ce as default
};
