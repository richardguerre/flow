const Q = /* @__PURE__ */ function() {
  var e = [
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "routineStep"
    },
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "template"
    }
  ], t = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "id",
    storageKey: null
  }, n = [
    {
      alias: null,
      args: [
        {
          kind: "Variable",
          name: "input",
          variableName: "routineStep"
        }
      ],
      concreteType: "RoutineStep",
      kind: "LinkedField",
      name: "updateRoutineStep",
      plural: !1,
      selections: [
        t,
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "config",
          storageKey: null
        }
      ],
      storageKey: null
    },
    {
      alias: null,
      args: [
        {
          kind: "Variable",
          name: "input",
          variableName: "template"
        }
      ],
      concreteType: "Template",
      kind: "LinkedField",
      name: "createOrUpdateTemplate",
      plural: !1,
      selections: [
        t,
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "slug",
          storageKey: null
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "raw",
          storageKey: null
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "metadata",
          storageKey: null
        }
      ],
      storageKey: null
    }
  ];
  return {
    fragment: {
      argumentDefinitions: e,
      kind: "Fragment",
      metadata: null,
      name: "webUpdateRoutineStepMutation",
      selections: n,
      type: "Mutation",
      abstractKey: null
    },
    kind: "Request",
    operation: {
      argumentDefinitions: e,
      kind: "Operation",
      name: "webUpdateRoutineStepMutation",
      selections: n
    },
    params: {
      cacheID: "a2d154a522d4515fc09efb894cecd9e4",
      id: null,
      metadata: {},
      name: "webUpdateRoutineStepMutation",
      operationKind: "mutation",
      text: `mutation webUpdateRoutineStepMutation(
  $routineStep: MutationUpdateRoutineStepInput!
  $template: MutationCreateOrUpdateTemplateInput!
) {
  updateRoutineStep(input: $routineStep) {
    id
    config
  }
  createOrUpdateTemplate(input: $template) {
    id
    slug
    raw
    metadata
  }
}
`
    }
  };
}();
Q.hash = "b71dfd7eaaba64f4182f87b2c5257a96";
const fe = (e) => ({ plugin: e }), Y = "post-your-plan", de = `Plan for today
{{#tasks}}
  <ul>
    <li>
      <p>{{slack-status}} {{title}}</p>
    </li>
  </ul>
{{else}}
  <p>No tasks today</p>
{{/tasks}}
`;
function _e(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ee = { exports: {} }, u = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var R = Symbol.for("react.element"), Ne = Symbol.for("react.portal"), be = Symbol.for("react.fragment"), pe = Symbol.for("react.strict_mode"), ve = Symbol.for("react.profiler"), ge = Symbol.for("react.provider"), ye = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), Ee = Symbol.for("react.suspense"), Ce = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), Z = Symbol.iterator;
function ke(e) {
  return e === null || typeof e != "object" ? null : (e = Z && e[Z] || e["@@iterator"], typeof e == "function" ? e : null);
}
var te = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ne = Object.assign, re = {};
function k(e, t, n) {
  this.props = e, this.context = t, this.refs = re, this.updater = n || te;
}
k.prototype.isReactComponent = {};
k.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
k.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function le() {
}
le.prototype = k.prototype;
function H(e, t, n) {
  this.props = e, this.context = t, this.refs = re, this.updater = n || te;
}
var B = H.prototype = new le();
B.constructor = H;
ne(B, k.prototype);
B.isPureReactComponent = !0;
var W = Array.isArray, oe = Object.prototype.hasOwnProperty, U = { current: null }, ae = { key: !0, ref: !0, __self: !0, __source: !0 };
function ue(e, t, n) {
  var o, a = {}, m = null, d = null;
  if (t != null)
    for (o in t.ref !== void 0 && (d = t.ref), t.key !== void 0 && (m = "" + t.key), t)
      oe.call(t, o) && !ae.hasOwnProperty(o) && (a[o] = t[o]);
  var f = arguments.length - 2;
  if (f === 1)
    a.children = n;
  else if (1 < f) {
    for (var l = Array(f), i = 0; i < f; i++)
      l[i] = arguments[i + 2];
    a.children = l;
  }
  if (e && e.defaultProps)
    for (o in f = e.defaultProps, f)
      a[o] === void 0 && (a[o] = f[o]);
  return { $$typeof: R, type: e, key: m, ref: d, props: a, _owner: U.current };
}
function xe(e, t) {
  return { $$typeof: R, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function z(e) {
  return typeof e == "object" && e !== null && e.$$typeof === R;
}
function we(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var G = /\/+/g;
function D(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? we("" + e.key) : t.toString(36);
}
function V(e, t, n, o, a) {
  var m = typeof e;
  (m === "undefined" || m === "boolean") && (e = null);
  var d = !1;
  if (e === null)
    d = !0;
  else
    switch (m) {
      case "string":
      case "number":
        d = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case R:
          case Ne:
            d = !0;
        }
    }
  if (d)
    return d = e, a = a(d), e = o === "" ? "." + D(d, 0) : o, W(a) ? (n = "", e != null && (n = e.replace(G, "$&/") + "/"), V(a, t, n, "", function(i) {
      return i;
    })) : a != null && (z(a) && (a = xe(a, n + (!a.key || d && d.key === a.key ? "" : ("" + a.key).replace(G, "$&/") + "/") + e)), t.push(a)), 1;
  if (d = 0, o = o === "" ? "." : o + ":", W(e))
    for (var f = 0; f < e.length; f++) {
      m = e[f];
      var l = o + D(m, f);
      d += V(m, t, n, l, a);
    }
  else if (l = ke(e), typeof l == "function")
    for (e = l.call(e), f = 0; !(m = e.next()).done; )
      m = m.value, l = o + D(m, f++), d += V(m, t, n, l, a);
  else if (m === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return d;
}
function I(e, t, n) {
  if (e == null)
    return e;
  var o = [], a = 0;
  return V(e, o, "", "", function(m) {
    return t.call(n, m, a++);
  }), o;
}
function Me(e) {
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
var _ = { current: null }, F = { transition: null }, Re = { ReactCurrentDispatcher: _, ReactCurrentBatchConfig: F, ReactCurrentOwner: U };
function ie() {
  throw Error("act(...) is not supported in production builds of React.");
}
u.Children = { map: I, forEach: function(e, t, n) {
  I(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return I(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return I(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!z(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
u.Component = k;
u.Fragment = be;
u.Profiler = ve;
u.PureComponent = H;
u.StrictMode = pe;
u.Suspense = Ee;
u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Re;
u.act = ie;
u.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var o = ne({}, e.props), a = e.key, m = e.ref, d = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (m = t.ref, d = U.current), t.key !== void 0 && (a = "" + t.key), e.type && e.type.defaultProps)
      var f = e.type.defaultProps;
    for (l in t)
      oe.call(t, l) && !ae.hasOwnProperty(l) && (o[l] = t[l] === void 0 && f !== void 0 ? f[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1)
    o.children = n;
  else if (1 < l) {
    f = Array(l);
    for (var i = 0; i < l; i++)
      f[i] = arguments[i + 2];
    o.children = f;
  }
  return { $$typeof: R, type: e.type, key: a, ref: m, props: o, _owner: d };
};
u.createContext = function(e) {
  return e = { $$typeof: ye, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: ge, _context: e }, e.Consumer = e;
};
u.createElement = ue;
u.createFactory = function(e) {
  var t = ue.bind(null, e);
  return t.type = e, t;
};
u.createRef = function() {
  return { current: null };
};
u.forwardRef = function(e) {
  return { $$typeof: he, render: e };
};
u.isValidElement = z;
u.lazy = function(e) {
  return { $$typeof: Se, _payload: { _status: -1, _result: e }, _init: Me };
};
u.memo = function(e, t) {
  return { $$typeof: Ce, type: e, compare: t === void 0 ? null : t };
};
u.startTransition = function(e) {
  var t = F.transition;
  F.transition = {};
  try {
    e();
  } finally {
    F.transition = t;
  }
};
u.unstable_act = ie;
u.useCallback = function(e, t) {
  return _.current.useCallback(e, t);
};
u.useContext = function(e) {
  return _.current.useContext(e);
};
u.useDebugValue = function() {
};
u.useDeferredValue = function(e) {
  return _.current.useDeferredValue(e);
};
u.useEffect = function(e, t) {
  return _.current.useEffect(e, t);
};
u.useId = function() {
  return _.current.useId();
};
u.useImperativeHandle = function(e, t, n) {
  return _.current.useImperativeHandle(e, t, n);
};
u.useInsertionEffect = function(e, t) {
  return _.current.useInsertionEffect(e, t);
};
u.useLayoutEffect = function(e, t) {
  return _.current.useLayoutEffect(e, t);
};
u.useMemo = function(e, t) {
  return _.current.useMemo(e, t);
};
u.useReducer = function(e, t, n) {
  return _.current.useReducer(e, t, n);
};
u.useRef = function(e) {
  return _.current.useRef(e);
};
u.useState = function(e) {
  return _.current.useState(e);
};
u.useSyncExternalStore = function(e, t, n) {
  return _.current.useSyncExternalStore(e, t, n);
};
u.useTransition = function() {
  return _.current.useTransition();
};
u.version = "18.3.1";
ee.exports = u;
var Te = ee.exports;
const E = /* @__PURE__ */ _e(Te);
var se = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, J = E.createContext && E.createContext(se), y = function() {
  return y = Object.assign || function(e) {
    for (var t, n = 1, o = arguments.length; n < o; n++) {
      t = arguments[n];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, y.apply(this, arguments);
}, Oe = function(e, t) {
  var n = {};
  for (var o in e)
    Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, o = Object.getOwnPropertySymbols(e); a < o.length; a++)
      t.indexOf(o[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[a]) && (n[o[a]] = e[o[a]]);
  return n;
};
function ce(e) {
  return e && e.map(function(t, n) {
    return E.createElement(t.tag, y({
      key: n
    }, t.attr), ce(t.child));
  });
}
function me(e) {
  return function(t) {
    return E.createElement($e, y({
      attr: y({}, e.attr)
    }, t), ce(e.child));
  };
}
function $e(e) {
  var t = function(n) {
    var o = e.attr, a = e.size, m = e.title, d = Oe(e, ["attr", "size", "title"]), f = a || n.size || "1em", l;
    return n.className && (l = n.className), e.className && (l = (l ? l + " " : "") + e.className), E.createElement("svg", y({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, o, d, {
      className: l,
      style: y(y({
        color: e.color || n.color
      }, n.style), e.style),
      height: f,
      width: f,
      xmlns: "http://www.w3.org/2000/svg"
    }), m && E.createElement("title", null, m), e.children);
  };
  return J !== void 0 ? E.createElement(J.Consumer, null, function(n) {
    return t(n);
  }) : t(se);
}
function X(e) {
  return me({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" } }] })(e);
}
function je(e) {
  return me({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
}
var r = "/Users/richardguerre/Projects/flow/plugins/slack/src/web.tsx";
const Pe = fe((e) => {
  const t = e.React, n = e.components;
  e.relay.graphql;
  const o = () => {
    var i, b;
    const l = e.operations.useLazyQuery({
      operationName: "workspaces"
    });
    return (i = l == null ? void 0 : l.data) != null && i.workspaces.length ? /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: r,
      lineNumber: 26,
      columnNumber: 7
    } }, (b = l == null ? void 0 : l.data) == null ? void 0 : b.workspaces.map((p) => /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2 rounded max-w-2xl bg-background-50 shadow px-4 py-4", __self: void 0, __source: {
      fileName: r,
      lineNumber: 28,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement("img", { src: p.teamIcon, className: "h-5 w-5 shrink-0", __self: void 0, __source: {
      fileName: r,
      lineNumber: 29,
      columnNumber: 13
    } }), /* @__PURE__ */ t.createElement("span", { className: "font-semibold", __self: void 0, __source: {
      fileName: r,
      lineNumber: 30,
      columnNumber: 13
    } }, p.teamName), /* @__PURE__ */ t.createElement("span", { className: "text-sm text-foreground-700", __self: void 0, __source: {
      fileName: r,
      lineNumber: 31,
      columnNumber: 13
    } }, "Connected ", e.dayjs(p.connectedAt).fromNow())))) : /* @__PURE__ */ t.createElement("div", { className: "flex", __self: void 0, __source: {
      fileName: r,
      lineNumber: 19,
      columnNumber: 9
    } }, "No workspaces connected. Please connect an account to use the Slack plugin.");
  }, a = e.tiptap.Node.create({
    name: "slack-status",
    inline: !0,
    group: "inline",
    atom: !0,
    parseHTML: () => [{
      tag: "slack-status"
    }],
    renderHTML: (l) => ["slack-status", e.tiptap.mergeAttributes(l.HTMLAttributes)],
    addNodeView: () => e.tiptap.ReactNodeViewRenderer(m)
  }), m = (l) => /* @__PURE__ */ t.createElement(e.tiptap.NodeViewWrapper, { as: "span", __self: void 0, __source: {
    fileName: r,
    lineNumber: 52,
    columnNumber: 7
  } }, /* @__PURE__ */ t.createElement(n.Tooltip, { __self: void 0, __source: {
    fileName: r,
    lineNumber: 53,
    columnNumber: 9
  } }, /* @__PURE__ */ t.createElement(n.TooltipTrigger, { className: e.cn("p-0.5 mr-1 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-0.5 h-5 w-5 inline-flex items-center justify-center", l.selected && "bg-background-300"), __self: void 0, __source: {
    fileName: r,
    lineNumber: 54,
    columnNumber: 11
  } }, /* @__PURE__ */ t.createElement(d, { __self: void 0, __source: {
    fileName: r,
    lineNumber: 60,
    columnNumber: 13
  } })), /* @__PURE__ */ t.createElement(n.TooltipContent, { className: "max-w-xs", __self: void 0, __source: {
    fileName: r,
    lineNumber: 62,
    columnNumber: 11
  } }, "This is a placeholder for where the Slack plugin will add and automatically update the status of the task (✅ when done, ❌ when canceled.)"))), d = () => /* @__PURE__ */ t.createElement("svg", { width: "16", height: "16", viewBox: "0 0 123 123", fill: "none", xmlns: "http://www.w3.org/2000/svg", __self: void 0, __source: {
    fileName: r,
    lineNumber: 72,
    columnNumber: 5
  } }, /* @__PURE__ */ t.createElement("path", { d: "M25.8 77.6C25.8 84.7 20 90.5 12.9 90.5C5.8 90.5 0 84.7 0 77.6C0 70.5 5.8 64.7 12.9 64.7H25.8V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
    fileName: r,
    lineNumber: 79,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M32.3 77.6C32.3 70.5 38.1001 64.7 45.2001 64.7C52.3001 64.7 58.1 70.5 58.1 77.6V109.9C58.1 117 52.3001 122.8 45.2001 122.8C38.1001 122.8 32.3 117 32.3 109.9V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
    fileName: r,
    lineNumber: 83,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M45.2001 25.8C38.1001 25.8 32.3 20 32.3 12.9C32.3 5.8 38.1001 0 45.2001 0C52.3001 0 58.1 5.8 58.1 12.9V25.8H45.2001Z", fill: "#36C5F0", __self: void 0, __source: {
    fileName: r,
    lineNumber: 87,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M45.2 32.3C52.3 32.3 58.1 38.1 58.1 45.2C58.1 52.3 52.3 58.1 45.2 58.1H12.9C5.8 58.1 0 52.3 0 45.2C0 38.1 5.8 32.3 12.9 32.3H45.2Z", fill: "#36C5F0", __self: void 0, __source: {
    fileName: r,
    lineNumber: 91,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M97 45.2C97 38.1 102.8 32.3 109.9 32.3C117 32.3 122.8 38.1 122.8 45.2C122.8 52.3 117 58.1 109.9 58.1H97V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
    fileName: r,
    lineNumber: 95,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M90.5 45.2C90.5 52.3 84.6999 58.1 77.5999 58.1C70.4999 58.1 64.7 52.3 64.7 45.2V12.9C64.7 5.8 70.4999 0 77.5999 0C84.6999 0 90.5 5.8 90.5 12.9V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
    fileName: r,
    lineNumber: 99,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M77.5999 97C84.6999 97 90.5 102.8 90.5 109.9C90.5 117 84.6999 122.8 77.5999 122.8C70.4999 122.8 64.7 117 64.7 109.9V97H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
    fileName: r,
    lineNumber: 103,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M77.5999 90.5C70.4999 90.5 64.7 84.7 64.7 77.6C64.7 70.5 70.4999 64.7 77.5999 64.7H109.9C117 64.7 122.8 70.5 122.8 77.6C122.8 84.7 117 90.5 109.9 90.5H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
    fileName: r,
    lineNumber: 107,
    columnNumber: 7
  } })), f = e.tiptap.Node.create({
    name: "slack-message",
    group: "block",
    atom: !0,
    selectable: !1,
    draggable: !1,
    parseHTML: () => [{
      tag: "slack-message"
    }],
    renderHTML: (l) => ["slack-message", e.tiptap.mergeAttributes(l.HTMLAttributes)]
  });
  return {
    name: "Slack",
    noteEditorTipTapExtensions: [a, f],
    settings: {
      "connect-accounts": {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: r,
          lineNumber: 133,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/${e.pluginSlug}/auth`, __self: void 0, __source: {
          fileName: r,
          lineNumber: 134,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(n.Button, { __self: void 0, __source: {
          fileName: r,
          lineNumber: 135,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ t.createElement(n.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var i, b, p;
          return ((p = (b = (i = l.cause) == null ? void 0 : i[0]) == null ? void 0 : b.extensions) == null ? void 0 : p.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ t.createElement(t.Fragment, null) : /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: r,
            lineNumber: 142,
            columnNumber: 26
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: r,
          lineNumber: 137,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: r,
          lineNumber: 145,
          columnNumber: 17
        } }, /* @__PURE__ */ t.createElement(o, { __self: void 0, __source: {
          fileName: r,
          lineNumber: 146,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      [Y]: {
        name: "Post your plan to Slack",
        description: "Post your plan for the day in Slack channels.",
        component: (l) => {
          var N;
          const i = l.templates[0], b = t.useRef(null), p = e.dayjs(), [v, T] = t.useState(!1), [x, A] = t.useState(((N = l.stepConfig) == null ? void 0 : N.defaultChannels) ?? []), {
            control: O,
            handleSubmit: L,
            formState: w,
            setError: M
          } = e.reactHookForm.useForm({
            defaultValues: {
              message: i,
              channels: x.map((s) => s.id)
            }
          }), [$, j] = e.operations.useMutation("postMessage"), P = async (s) => {
            var q, K;
            const C = x.filter((g) => s.channels.includes(g.id));
            if (!C.length) {
              M("root", {
                message: "Please select at least one channel."
              });
              return;
            }
            const h = await $({
              message: s.message,
              channels: C.map((g) => ({
                teamId: g.team.id,
                channelId: g.id
              }))
            });
            if (!((q = h == null ? void 0 : h.data) != null && q.ok)) {
              M("root", {
                message: "Couldn't post message to Slack channels."
              });
              return;
            }
            const S = (K = b.current) == null ? void 0 : K.chain();
            for (const g of h.data.messages)
              S == null || S.insertContentAt(-1, {
                type: "slack-message",
                attrs: {
                  teamId: g.teamId,
                  channelId: g.channelId,
                  ts: g.ts
                }
              });
            S == null || S.run(), T(!0);
          }, c = () => {
            v && (T(!1), l.onNext());
          };
          return e.hooks.useAsyncEffect(async () => {
            const s = await e.operations.query({
              operationName: "channels"
            });
            A((C) => {
              var h;
              return ((h = s == null ? void 0 : s.data) == null ? void 0 : h.channels) ?? C;
            });
          }, []), /* @__PURE__ */ t.createElement("form", { onSubmit: L(P), className: "flex flex-col gap-4", __self: void 0, __source: {
            fileName: r,
            lineNumber: 227,
            columnNumber: 13
          } }, /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "message", control: O, render: ({
            field: s
          }) => /* @__PURE__ */ t.createElement(n.NoteEditor, { editorRef: b, slug: `slack_post-plan-${p.format("YYYY-MM-DD")}`, title: `Plan for ${p.format("MMMM D")}`, initialValue: s.value, onChange: ({
            html: C
          }) => s.onChange(C), onBlur: s.onBlur, saveNow: v, onSaveEnd: c, __self: void 0, __source: {
            fileName: r,
            lineNumber: 232,
            columnNumber: 19
          } }), __self: void 0, __source: {
            fileName: r,
            lineNumber: 228,
            columnNumber: 15
          } }), w.errors.root && /* @__PURE__ */ t.createElement("div", { className: "text-negative-600 text-sm", __self: void 0, __source: {
            fileName: r,
            lineNumber: 245,
            columnNumber: 17
          } }, w.errors.root.message), /* @__PURE__ */ t.createElement("div", { className: "flex justify-between items-center", __self: void 0, __source: {
            fileName: r,
            lineNumber: 247,
            columnNumber: 15
          } }, /* @__PURE__ */ t.createElement(n.FormCombobox, { name: "channels", control: O, multiselect: !0, __self: void 0, __source: {
            fileName: r,
            lineNumber: 248,
            columnNumber: 17
          } }, /* @__PURE__ */ t.createElement(n.ComboboxTrigger, { __self: void 0, __source: {
            fileName: r,
            lineNumber: 249,
            columnNumber: 19
          } }, /* @__PURE__ */ t.createElement(n.ComboboxValue, { __self: void 0, __source: {
            fileName: r,
            lineNumber: 250,
            columnNumber: 21
          } })), /* @__PURE__ */ t.createElement(n.ComboboxContent, { __self: void 0, __source: {
            fileName: r,
            lineNumber: 252,
            columnNumber: 19
          } }, /* @__PURE__ */ t.createElement(n.ComboboxInput, { placeholder: "Search channels...", __self: void 0, __source: {
            fileName: r,
            lineNumber: 253,
            columnNumber: 21
          } }), /* @__PURE__ */ t.createElement(n.ComboboxEmpty, { __self: void 0, __source: {
            fileName: r,
            lineNumber: 254,
            columnNumber: 21
          } }, "No channel found."), /* @__PURE__ */ t.createElement(n.ComboboxGroup, { __self: void 0, __source: {
            fileName: r,
            lineNumber: 255,
            columnNumber: 21
          } }, x.map((s) => /* @__PURE__ */ t.createElement(n.ComboboxItem, { key: s.id, value: s.id, __self: void 0, __source: {
            fileName: r,
            lineNumber: 257,
            columnNumber: 25
          } }, /* @__PURE__ */ t.createElement(n.ComboboxSelected, { className: "mr-2 h-4 w-4 opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
            fileName: r,
            lineNumber: 258,
            columnNumber: 27
          } }, /* @__PURE__ */ t.createElement(X, { size: 20, __self: void 0, __source: {
            fileName: r,
            lineNumber: 262,
            columnNumber: 29
          } })), /* @__PURE__ */ t.createElement("img", { src: s.team.icon, className: "h-5 w-5 shrink-0 mr-2", __self: void 0, __source: {
            fileName: r,
            lineNumber: 264,
            columnNumber: 27
          } }), s.name))))), /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
            fileName: r,
            lineNumber: 271,
            columnNumber: 17
          } }, /* @__PURE__ */ t.createElement(l.BackButton, { type: "button", __self: void 0, __source: {
            fileName: r,
            lineNumber: 272,
            columnNumber: 19
          } }), /* @__PURE__ */ t.createElement(l.NextButton, { type: "submit", loading: j, onClick: () => {
          }, __self: void 0, __source: {
            fileName: r,
            lineNumber: 273,
            columnNumber: 19
          } }))));
        },
        renderSettings: async (l) => ({
          component: () => {
            var w, M, $, j, P;
            const i = l.routineStep.templates[0], {
              control: b,
              handleSubmit: p
            } = e.reactHookForm.useForm({
              defaultValues: {
                template: {
                  content: (i == null ? void 0 : i.raw) ?? de,
                  data: (i == null ? void 0 : i.metadata) ?? {}
                },
                defaultChannels: (($ = (M = (w = l.routineStep) == null ? void 0 : w.config) == null ? void 0 : M.defaultChannels) == null ? void 0 : $.map((c) => c.id)) ?? []
              }
            }), [v, T] = t.useState(((P = (j = l.routineStep) == null ? void 0 : j.config) == null ? void 0 : P.defaultChannels) ?? []), [x, A] = e.relay.useMutation(Q), O = async (c) => {
              const N = v.filter((s) => c.defaultChannels.includes(s.id));
              x({
                variables: {
                  routineStep: {
                    id: l.routineStep.id,
                    config: {
                      defaultChannels: N
                    }
                  },
                  template: {
                    slug: (i == null ? void 0 : i.slug) ?? `slack-${Y}-${l.routineStep.id}`,
                    raw: c.template.content,
                    metadata: c.template.data ?? {}
                  }
                },
                onCompleted: () => {
                  var s;
                  return (s = l.onClose) == null ? void 0 : s.call(l);
                }
              });
            };
            e.hooks.useAsyncEffect(async () => {
              const c = await e.operations.query({
                operationName: "getChannels"
              });
              T((N) => {
                var s;
                return ((s = c == null ? void 0 : c.data) == null ? void 0 : s.channels) ?? N;
              });
            }, []);
            const L = t.useMemo(() => new Map(v.map((c) => [c.id, c])), [v.length]);
            return /* @__PURE__ */ t.createElement("form", { onSubmit: p(O), className: "flex flex-col gap-4", __self: void 0, __source: {
              fileName: r,
              lineNumber: 358,
              columnNumber: 17
            } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-1", __self: void 0, __source: {
              fileName: r,
              lineNumber: 359,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-900 text-base font-medium", __self: void 0, __source: {
              fileName: r,
              lineNumber: 360,
              columnNumber: 21
            } }, "Template"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
              fileName: r,
              lineNumber: 361,
              columnNumber: 21
            } }, "Write the template message for the routine in HTML. You can preview it before saving.", /* @__PURE__ */ t.createElement("br", { __self: void 0, __source: {
              fileName: r,
              lineNumber: 364,
              columnNumber: 23
            } }), "Don't worry, you can edit the message each time you do the routine."), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "template", control: b, render: ({
              field: c
            }) => /* @__PURE__ */ t.createElement(n.TemplateEditor, { initialTemplate: c.value, onChange: c.onChange, __self: void 0, __source: {
              fileName: r,
              lineNumber: 371,
              columnNumber: 25
            } }), __self: void 0, __source: {
              fileName: r,
              lineNumber: 367,
              columnNumber: 21
            } })), /* @__PURE__ */ t.createElement(n.FormCombobox, { name: "defaultChannels", control: b, multiselect: !0, label: "Default channels", __self: void 0, __source: {
              fileName: r,
              lineNumber: 378,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement(n.ComboboxTrigger, { className: "flex items-center gap-2 self-start px-3 py-2 rounded-md bg-background-50 ring-primary-200 text-foreground-900 hover:ring-primary-300 disabled:bg-background-300/50 focus:ring-primary-500 focus:outline-none ring-2", __self: void 0, __source: {
              fileName: r,
              lineNumber: 384,
              columnNumber: 21
            } }, /* @__PURE__ */ t.createElement(n.ComboboxValue, { placeholder: "Select channels...", renderValues: (c) => v.filter((N) => c.includes(N.id)).map((N) => `#${N.name}`).join(", "), __self: void 0, __source: {
              fileName: r,
              lineNumber: 385,
              columnNumber: 23
            } }), /* @__PURE__ */ t.createElement(je, { size: 14, className: "text-foreground-700", __self: void 0, __source: {
              fileName: r,
              lineNumber: 394,
              columnNumber: 23
            } })), /* @__PURE__ */ t.createElement(n.ComboboxContent, { align: "start", side: "bottom", commandProps: {
              filter: (c, N) => {
                var s;
                return (s = L.get(c)) != null && s.name.includes(N) ? 1 : 0;
              }
            }, __self: void 0, __source: {
              fileName: r,
              lineNumber: 396,
              columnNumber: 21
            } }, /* @__PURE__ */ t.createElement(n.ComboboxInput, { placeholder: "Search channels...", __self: void 0, __source: {
              fileName: r,
              lineNumber: 406,
              columnNumber: 23
            } }), /* @__PURE__ */ t.createElement(n.ComboboxEmpty, { __self: void 0, __source: {
              fileName: r,
              lineNumber: 407,
              columnNumber: 23
            } }, "No channel found."), /* @__PURE__ */ t.createElement(n.ComboboxGroup, { __self: void 0, __source: {
              fileName: r,
              lineNumber: 408,
              columnNumber: 23
            } }, v.map((c) => /* @__PURE__ */ t.createElement(n.ComboboxItem, { key: c.id, value: c.id, className: "flex items-center justify-between gap-2", __self: void 0, __source: {
              fileName: r,
              lineNumber: 410,
              columnNumber: 27
            } }, /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
              fileName: r,
              lineNumber: 415,
              columnNumber: 29
            } }, /* @__PURE__ */ t.createElement("img", { src: c.team.icon, className: "h-5 w-5 shrink-0", __self: void 0, __source: {
              fileName: r,
              lineNumber: 416,
              columnNumber: 31
            } }), /* @__PURE__ */ t.createElement("span", { className: "max-w-48 truncate", __self: void 0, __source: {
              fileName: r,
              lineNumber: 417,
              columnNumber: 31
            } }, "#", c.name)), /* @__PURE__ */ t.createElement(n.ComboboxSelected, { className: "ml-2 h-4 w-4 opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
              fileName: r,
              lineNumber: 419,
              columnNumber: 29
            } }, /* @__PURE__ */ t.createElement(X, { size: 20, __self: void 0, __source: {
              fileName: r,
              lineNumber: 423,
              columnNumber: 31
            } }))))))), /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2 self-end", __self: void 0, __source: {
              fileName: r,
              lineNumber: 430,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement(n.Button, { type: "button", secondary: !0, onClick: l.onCancel, __self: void 0, __source: {
              fileName: r,
              lineNumber: 431,
              columnNumber: 21
            } }, "Cancel"), /* @__PURE__ */ t.createElement(n.Button, { type: "submit", loading: A, __self: void 0, __source: {
              fileName: r,
              lineNumber: 434,
              columnNumber: 21
            } }, "Save")));
          }
        })
      }
    }
  };
});
export {
  Pe as default
};
