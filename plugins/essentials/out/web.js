var y = { exports: {} }, h = {}, j = { exports: {} }, r = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var d = Symbol.for("react.element"), L = Symbol.for("react.portal"), U = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), V = Symbol.for("react.provider"), q = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), z = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), x = Symbol.iterator;
function W(e) {
  return e === null || typeof e != "object" ? null : (e = x && e[x] || e["@@iterator"], typeof e == "function" ? e : null);
}
var C = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, O = Object.assign, P = {};
function p(e, t, n) {
  this.props = e, this.context = t, this.refs = P, this.updater = n || C;
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
function g() {
}
g.prototype = p.prototype;
function E(e, t, n) {
  this.props = e, this.context = t, this.refs = P, this.updater = n || C;
}
var R = E.prototype = new g();
R.constructor = E;
O(R, p.prototype);
R.isPureReactComponent = !0;
var $ = Array.isArray, I = Object.prototype.hasOwnProperty, k = { current: null }, T = { key: !0, ref: !0, __self: !0, __source: !0 };
function D(e, t, n) {
  var o, u = {}, i = null, s = null;
  if (t != null)
    for (o in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t)
      I.call(t, o) && !T.hasOwnProperty(o) && (u[o] = t[o]);
  var f = arguments.length - 2;
  if (f === 1)
    u.children = n;
  else if (1 < f) {
    for (var c = Array(f), a = 0; a < f; a++)
      c[a] = arguments[a + 2];
    u.children = c;
  }
  if (e && e.defaultProps)
    for (o in f = e.defaultProps, f)
      u[o] === void 0 && (u[o] = f[o]);
  return { $$typeof: d, type: e, key: i, ref: s, props: u, _owner: k.current };
}
function Y(e, t) {
  return { $$typeof: d, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function w(e) {
  return typeof e == "object" && e !== null && e.$$typeof === d;
}
function J(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var b = /\/+/g;
function S(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? J("" + e.key) : t.toString(36);
}
function v(e, t, n, o, u) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null)
    s = !0;
  else
    switch (i) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case d:
          case L:
            s = !0;
        }
    }
  if (s)
    return s = e, u = u(s), e = o === "" ? "." + S(s, 0) : o, $(u) ? (n = "", e != null && (n = e.replace(b, "$&/") + "/"), v(u, t, n, "", function(a) {
      return a;
    })) : u != null && (w(u) && (u = Y(u, n + (!u.key || s && s.key === u.key ? "" : ("" + u.key).replace(b, "$&/") + "/") + e)), t.push(u)), 1;
  if (s = 0, o = o === "" ? "." : o + ":", $(e))
    for (var f = 0; f < e.length; f++) {
      i = e[f];
      var c = o + S(i, f);
      s += v(i, t, n, c, u);
    }
  else if (c = W(e), typeof c == "function")
    for (e = c.call(e), f = 0; !(i = e.next()).done; )
      i = i.value, c = o + S(i, f++), s += v(i, t, n, c, u);
  else if (i === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function _(e, t, n) {
  if (e == null)
    return e;
  var o = [], u = 0;
  return v(e, o, "", "", function(i) {
    return t.call(n, i, u++);
  }), o;
}
function G(e) {
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
var l = { current: null }, m = { transition: null }, K = { ReactCurrentDispatcher: l, ReactCurrentBatchConfig: m, ReactCurrentOwner: k };
r.Children = { map: _, forEach: function(e, t, n) {
  _(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return _(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return _(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!w(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
r.Component = p;
r.Fragment = U;
r.Profiler = N;
r.PureComponent = E;
r.StrictMode = A;
r.Suspense = M;
r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K;
r.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var o = O({}, e.props), u = e.key, i = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, s = k.current), t.key !== void 0 && (u = "" + t.key), e.type && e.type.defaultProps)
      var f = e.type.defaultProps;
    for (c in t)
      I.call(t, c) && !T.hasOwnProperty(c) && (o[c] = t[c] === void 0 && f !== void 0 ? f[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1)
    o.children = n;
  else if (1 < c) {
    f = Array(c);
    for (var a = 0; a < c; a++)
      f[a] = arguments[a + 2];
    o.children = f;
  }
  return { $$typeof: d, type: e.type, key: u, ref: i, props: o, _owner: s };
};
r.createContext = function(e) {
  return e = { $$typeof: q, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: V, _context: e }, e.Consumer = e;
};
r.createElement = D;
r.createFactory = function(e) {
  var t = D.bind(null, e);
  return t.type = e, t;
};
r.createRef = function() {
  return { current: null };
};
r.forwardRef = function(e) {
  return { $$typeof: B, render: e };
};
r.isValidElement = w;
r.lazy = function(e) {
  return { $$typeof: H, _payload: { _status: -1, _result: e }, _init: G };
};
r.memo = function(e, t) {
  return { $$typeof: z, type: e, compare: t === void 0 ? null : t };
};
r.startTransition = function(e) {
  var t = m.transition;
  m.transition = {};
  try {
    e();
  } finally {
    m.transition = t;
  }
};
r.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
r.useCallback = function(e, t) {
  return l.current.useCallback(e, t);
};
r.useContext = function(e) {
  return l.current.useContext(e);
};
r.useDebugValue = function() {
};
r.useDeferredValue = function(e) {
  return l.current.useDeferredValue(e);
};
r.useEffect = function(e, t) {
  return l.current.useEffect(e, t);
};
r.useId = function() {
  return l.current.useId();
};
r.useImperativeHandle = function(e, t, n) {
  return l.current.useImperativeHandle(e, t, n);
};
r.useInsertionEffect = function(e, t) {
  return l.current.useInsertionEffect(e, t);
};
r.useLayoutEffect = function(e, t) {
  return l.current.useLayoutEffect(e, t);
};
r.useMemo = function(e, t) {
  return l.current.useMemo(e, t);
};
r.useReducer = function(e, t, n) {
  return l.current.useReducer(e, t, n);
};
r.useRef = function(e) {
  return l.current.useRef(e);
};
r.useState = function(e) {
  return l.current.useState(e);
};
r.useSyncExternalStore = function(e, t, n) {
  return l.current.useSyncExternalStore(e, t, n);
};
r.useTransition = function() {
  return l.current.useTransition();
};
r.version = "18.2.0";
(function(e) {
  e.exports = r;
})(j);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Q = j.exports, X = Symbol.for("react.element"), Z = Symbol.for("react.fragment"), ee = Object.prototype.hasOwnProperty, te = Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, re = { key: !0, ref: !0, __self: !0, __source: !0 };
function F(e, t, n) {
  var o, u = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (o in t)
    ee.call(t, o) && !re.hasOwnProperty(o) && (u[o] = t[o]);
  if (e && e.defaultProps)
    for (o in t = e.defaultProps, t)
      u[o] === void 0 && (u[o] = t[o]);
  return { $$typeof: X, type: e, key: i, ref: s, props: u, _owner: te.current };
}
h.Fragment = Z;
h.jsx = F;
h.jsxs = F;
(function(e) {
  e.exports = h;
})(y);
const ne = (e) => e, oe = ne((e) => {
  const t = e.components;
  return {
    slug: "flow-essentials",
    routineSteps: {
      yesterday: {
        component: ({ onNext: n }) => /* @__PURE__ */ y.exports.jsxs("div", { children: [
          "Yesterday",
          /* @__PURE__ */ y.exports.jsx(t.Button, { onClick: n })
        ] })
      },
      "retro-on-yesterday": {
        component: () => /* @__PURE__ */ y.exports.jsx("div", { children: "Retro on yesterday" })
      },
      today: {
        component: () => /* @__PURE__ */ y.exports.jsx("div", { children: "Today" })
      }
    }
  };
});
export {
  oe as default
};
