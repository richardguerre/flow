const ne = /* @__PURE__ */ function() {
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
ne.hash = "b71dfd7eaaba64f4182f87b2c5257a96";
const Ne = (e) => ({ plugin: e }), J = "post-to-slack", be = `Plan for today
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
function pe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var re = { exports: {} }, u = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var I = Symbol.for("react.element"), ge = Symbol.for("react.portal"), ve = Symbol.for("react.fragment"), he = Symbol.for("react.strict_mode"), ye = Symbol.for("react.profiler"), Ee = Symbol.for("react.provider"), Ce = Symbol.for("react.context"), ke = Symbol.for("react.forward_ref"), Se = Symbol.for("react.suspense"), xe = Symbol.for("react.memo"), we = Symbol.for("react.lazy"), X = Symbol.iterator;
function Me(e) {
  return e === null || typeof e != "object" ? null : (e = X && e[X] || e["@@iterator"], typeof e == "function" ? e : null);
}
var le = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ae = Object.assign, oe = {};
function x(e, t, n) {
  this.props = e, this.context = t, this.refs = oe, this.updater = n || le;
}
x.prototype.isReactComponent = {};
x.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
x.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ue() {
}
ue.prototype = x.prototype;
function B(e, t, n) {
  this.props = e, this.context = t, this.refs = oe, this.updater = n || le;
}
var U = B.prototype = new ue();
U.constructor = B;
ae(U, x.prototype);
U.isPureReactComponent = !0;
var Q = Array.isArray, ie = Object.prototype.hasOwnProperty, z = { current: null }, se = { key: !0, ref: !0, __self: !0, __source: !0 };
function ce(e, t, n) {
  var a, o = {}, c = null, f = null;
  if (t != null)
    for (a in t.ref !== void 0 && (f = t.ref), t.key !== void 0 && (c = "" + t.key), t)
      ie.call(t, a) && !se.hasOwnProperty(a) && (o[a] = t[a]);
  var m = arguments.length - 2;
  if (m === 1)
    o.children = n;
  else if (1 < m) {
    for (var i = Array(m), r = 0; r < m; r++)
      i[r] = arguments[r + 2];
    o.children = i;
  }
  if (e && e.defaultProps)
    for (a in m = e.defaultProps, m)
      o[a] === void 0 && (o[a] = m[a]);
  return { $$typeof: I, type: e, key: c, ref: f, props: o, _owner: z.current };
}
function Te(e, t) {
  return { $$typeof: I, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Y(e) {
  return typeof e == "object" && e !== null && e.$$typeof === I;
}
function Re(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var ee = /\/+/g;
function D(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Re("" + e.key) : t.toString(36);
}
function A(e, t, n, a, o) {
  var c = typeof e;
  (c === "undefined" || c === "boolean") && (e = null);
  var f = !1;
  if (e === null)
    f = !0;
  else
    switch (c) {
      case "string":
      case "number":
        f = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case I:
          case ge:
            f = !0;
        }
    }
  if (f)
    return f = e, o = o(f), e = a === "" ? "." + D(f, 0) : a, Q(o) ? (n = "", e != null && (n = e.replace(ee, "$&/") + "/"), A(o, t, n, "", function(r) {
      return r;
    })) : o != null && (Y(o) && (o = Te(o, n + (!o.key || f && f.key === o.key ? "" : ("" + o.key).replace(ee, "$&/") + "/") + e)), t.push(o)), 1;
  if (f = 0, a = a === "" ? "." : a + ":", Q(e))
    for (var m = 0; m < e.length; m++) {
      c = e[m];
      var i = a + D(c, m);
      f += A(c, t, n, i, o);
    }
  else if (i = Me(e), typeof i == "function")
    for (e = i.call(e), m = 0; !(c = e.next()).done; )
      c = c.value, i = a + D(c, m++), f += A(c, t, n, i, o);
  else if (c === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return f;
}
function H(e, t, n) {
  if (e == null)
    return e;
  var a = [], o = 0;
  return A(e, a, "", "", function(c) {
    return t.call(n, c, o++);
  }), a;
}
function Ie(e) {
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
var N = { current: null }, V = { transition: null }, Oe = { ReactCurrentDispatcher: N, ReactCurrentBatchConfig: V, ReactCurrentOwner: z };
function me() {
  throw Error("act(...) is not supported in production builds of React.");
}
u.Children = { map: H, forEach: function(e, t, n) {
  H(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return H(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return H(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Y(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
u.Component = x;
u.Fragment = ve;
u.Profiler = ye;
u.PureComponent = B;
u.StrictMode = he;
u.Suspense = Se;
u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oe;
u.act = me;
u.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var a = ae({}, e.props), o = e.key, c = e.ref, f = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (c = t.ref, f = z.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps)
      var m = e.type.defaultProps;
    for (i in t)
      ie.call(t, i) && !se.hasOwnProperty(i) && (a[i] = t[i] === void 0 && m !== void 0 ? m[i] : t[i]);
  }
  var i = arguments.length - 2;
  if (i === 1)
    a.children = n;
  else if (1 < i) {
    m = Array(i);
    for (var r = 0; r < i; r++)
      m[r] = arguments[r + 2];
    a.children = m;
  }
  return { $$typeof: I, type: e.type, key: o, ref: c, props: a, _owner: f };
};
u.createContext = function(e) {
  return e = { $$typeof: Ce, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Ee, _context: e }, e.Consumer = e;
};
u.createElement = ce;
u.createFactory = function(e) {
  var t = ce.bind(null, e);
  return t.type = e, t;
};
u.createRef = function() {
  return { current: null };
};
u.forwardRef = function(e) {
  return { $$typeof: ke, render: e };
};
u.isValidElement = Y;
u.lazy = function(e) {
  return { $$typeof: we, _payload: { _status: -1, _result: e }, _init: Ie };
};
u.memo = function(e, t) {
  return { $$typeof: xe, type: e, compare: t === void 0 ? null : t };
};
u.startTransition = function(e) {
  var t = V.transition;
  V.transition = {};
  try {
    e();
  } finally {
    V.transition = t;
  }
};
u.unstable_act = me;
u.useCallback = function(e, t) {
  return N.current.useCallback(e, t);
};
u.useContext = function(e) {
  return N.current.useContext(e);
};
u.useDebugValue = function() {
};
u.useDeferredValue = function(e) {
  return N.current.useDeferredValue(e);
};
u.useEffect = function(e, t) {
  return N.current.useEffect(e, t);
};
u.useId = function() {
  return N.current.useId();
};
u.useImperativeHandle = function(e, t, n) {
  return N.current.useImperativeHandle(e, t, n);
};
u.useInsertionEffect = function(e, t) {
  return N.current.useInsertionEffect(e, t);
};
u.useLayoutEffect = function(e, t) {
  return N.current.useLayoutEffect(e, t);
};
u.useMemo = function(e, t) {
  return N.current.useMemo(e, t);
};
u.useReducer = function(e, t, n) {
  return N.current.useReducer(e, t, n);
};
u.useRef = function(e) {
  return N.current.useRef(e);
};
u.useState = function(e) {
  return N.current.useState(e);
};
u.useSyncExternalStore = function(e, t, n) {
  return N.current.useSyncExternalStore(e, t, n);
};
u.useTransition = function() {
  return N.current.useTransition();
};
u.version = "18.3.1";
re.exports = u;
var Le = re.exports;
const k = /* @__PURE__ */ pe(Le);
var fe = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, te = k.createContext && k.createContext(fe), y = function() {
  return y = Object.assign || function(e) {
    for (var t, n = 1, a = arguments.length; n < a; n++) {
      t = arguments[n];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, y.apply(this, arguments);
}, $e = function(e, t) {
  var n = {};
  for (var a in e)
    Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
      t.indexOf(a[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[o]) && (n[a[o]] = e[a[o]]);
  return n;
};
function de(e) {
  return e && e.map(function(t, n) {
    return k.createElement(t.tag, y({
      key: n
    }, t.attr), de(t.child));
  });
}
function _e(e) {
  return function(t) {
    return k.createElement(Pe, y({
      attr: y({}, e.attr)
    }, t), de(e.child));
  };
}
function Pe(e) {
  var t = function(n) {
    var a = e.attr, o = e.size, c = e.title, f = $e(e, ["attr", "size", "title"]), m = o || n.size || "1em", i;
    return n.className && (i = n.className), e.className && (i = (i ? i + " " : "") + e.className), k.createElement("svg", y({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, a, f, {
      className: i,
      style: y(y({
        color: e.color || n.color
      }, n.style), e.style),
      height: m,
      width: m,
      xmlns: "http://www.w3.org/2000/svg"
    }), c && k.createElement("title", null, c), e.children);
  };
  return te !== void 0 ? k.createElement(te.Consumer, null, function(n) {
    return t(n);
  }) : t(fe);
}
function je(e) {
  return _e({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" } }] })(e);
}
function He(e) {
  return _e({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
}
var l = "/Users/richardguerre/Projects/flow/plugins/slack/src/web.tsx";
const Ae = Ne((e) => {
  const t = e.React, n = e.components;
  e.relay.graphql;
  const a = () => {
    var d, s;
    const r = e.operations.useLazyQuery({
      operationName: "workspaces"
    });
    return (d = r == null ? void 0 : r.data) != null && d.workspaces.length ? /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: l,
      lineNumber: 27,
      columnNumber: 7
    } }, (s = r == null ? void 0 : r.data) == null ? void 0 : s.workspaces.map((_) => /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2 rounded max-w-2xl bg-background-50 shadow px-4 py-4", __self: void 0, __source: {
      fileName: l,
      lineNumber: 29,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement("img", { src: _.teamIcon, className: "h-5 w-5 shrink-0", __self: void 0, __source: {
      fileName: l,
      lineNumber: 30,
      columnNumber: 13
    } }), /* @__PURE__ */ t.createElement("span", { className: "font-semibold", __self: void 0, __source: {
      fileName: l,
      lineNumber: 31,
      columnNumber: 13
    } }, _.teamName), /* @__PURE__ */ t.createElement("span", { className: "text-sm text-foreground-700", __self: void 0, __source: {
      fileName: l,
      lineNumber: 32,
      columnNumber: 13
    } }, "Connected ", e.dayjs(_.connectedAt).fromNow())))) : /* @__PURE__ */ t.createElement("div", { className: "flex", __self: void 0, __source: {
      fileName: l,
      lineNumber: 20,
      columnNumber: 9
    } }, "No workspaces connected. Please connect an account to use the Slack plugin.");
  }, o = e.tiptap.Node.create({
    name: "slack-status",
    inline: !0,
    group: "inline",
    atom: !0,
    addAttributes: () => ({
      taskId: {
        default: null,
        parseHTML: (r) => r.getAttribute("data-task-id") ?? null,
        renderHTML: (r) => r.taskId ? {
          "data-task-id": r.taskId
        } : {}
      }
    }),
    parseHTML: () => [{
      tag: "slack-status"
    }],
    renderHTML: (r) => ["slack-status", e.tiptap.mergeAttributes(r.HTMLAttributes)],
    addNodeView: () => e.tiptap.ReactNodeViewRenderer(c)
  }), c = (r) => /* @__PURE__ */ t.createElement(e.tiptap.NodeViewWrapper, { as: "span", __self: void 0, __source: {
    fileName: l,
    lineNumber: 60,
    columnNumber: 7
  } }, /* @__PURE__ */ t.createElement(n.Tooltip, { __self: void 0, __source: {
    fileName: l,
    lineNumber: 61,
    columnNumber: 9
  } }, /* @__PURE__ */ t.createElement(n.TooltipTrigger, { className: e.cn("p-0.5 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-0.5 h-5 w-5 inline-flex items-center justify-center", r.selected && "bg-background-300"), __self: void 0, __source: {
    fileName: l,
    lineNumber: 62,
    columnNumber: 11
  } }, /* @__PURE__ */ t.createElement(f, { __self: void 0, __source: {
    fileName: l,
    lineNumber: 68,
    columnNumber: 13
  } })), /* @__PURE__ */ t.createElement(n.TooltipContent, { className: "max-w-xs", __self: void 0, __source: {
    fileName: l,
    lineNumber: 70,
    columnNumber: 11
  } }, "This is a placeholder for where the Slack plugin will add and automatically update the status of the task (✅ when done, ❌ when canceled.)"))), f = () => /* @__PURE__ */ t.createElement("svg", { width: "16", height: "16", viewBox: "0 0 123 123", fill: "none", xmlns: "http://www.w3.org/2000/svg", __self: void 0, __source: {
    fileName: l,
    lineNumber: 80,
    columnNumber: 5
  } }, /* @__PURE__ */ t.createElement("path", { d: "M25.8 77.6C25.8 84.7 20 90.5 12.9 90.5C5.8 90.5 0 84.7 0 77.6C0 70.5 5.8 64.7 12.9 64.7H25.8V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
    fileName: l,
    lineNumber: 87,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M32.3 77.6C32.3 70.5 38.1001 64.7 45.2001 64.7C52.3001 64.7 58.1 70.5 58.1 77.6V109.9C58.1 117 52.3001 122.8 45.2001 122.8C38.1001 122.8 32.3 117 32.3 109.9V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
    fileName: l,
    lineNumber: 91,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M45.2001 25.8C38.1001 25.8 32.3 20 32.3 12.9C32.3 5.8 38.1001 0 45.2001 0C52.3001 0 58.1 5.8 58.1 12.9V25.8H45.2001Z", fill: "#36C5F0", __self: void 0, __source: {
    fileName: l,
    lineNumber: 95,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M45.2 32.3C52.3 32.3 58.1 38.1 58.1 45.2C58.1 52.3 52.3 58.1 45.2 58.1H12.9C5.8 58.1 0 52.3 0 45.2C0 38.1 5.8 32.3 12.9 32.3H45.2Z", fill: "#36C5F0", __self: void 0, __source: {
    fileName: l,
    lineNumber: 99,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M97 45.2C97 38.1 102.8 32.3 109.9 32.3C117 32.3 122.8 38.1 122.8 45.2C122.8 52.3 117 58.1 109.9 58.1H97V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
    fileName: l,
    lineNumber: 103,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M90.5 45.2C90.5 52.3 84.6999 58.1 77.5999 58.1C70.4999 58.1 64.7 52.3 64.7 45.2V12.9C64.7 5.8 70.4999 0 77.5999 0C84.6999 0 90.5 5.8 90.5 12.9V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
    fileName: l,
    lineNumber: 107,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M77.5999 97C84.6999 97 90.5 102.8 90.5 109.9C90.5 117 84.6999 122.8 77.5999 122.8C70.4999 122.8 64.7 117 64.7 109.9V97H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
    fileName: l,
    lineNumber: 111,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M77.5999 90.5C70.4999 90.5 64.7 84.7 64.7 77.6C64.7 70.5 70.4999 64.7 77.5999 64.7H109.9C117 64.7 122.8 70.5 122.8 77.6C122.8 84.7 117 90.5 109.9 90.5H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
    fileName: l,
    lineNumber: 115,
    columnNumber: 7
  } })), m = e.tiptap.Node.create({
    name: "slack-message",
    group: "block",
    atom: !0,
    selectable: !1,
    draggable: !1,
    addAttributes: () => ({
      teamId: {
        default: null,
        parseHTML: (r) => r.getAttribute("data-team-id") ?? null,
        renderHTML: (r) => r.teamId ? {
          "data-team-id": r.teamId
        } : {}
      },
      channelId: {
        default: null,
        parseHTML: (r) => r.getAttribute("data-channel-id") ?? null,
        renderHTML: (r) => r.channelId ? {
          "data-channel-id": r.channelId
        } : {}
      },
      ts: {
        default: null,
        parseHTML: (r) => r.getAttribute("data-ts") ?? null,
        renderHTML: (r) => r.ts ? {
          "data-ts": r.ts
        } : {}
      }
    }),
    parseHTML: () => [{
      tag: "slack-message"
    }],
    renderHTML: (r) => ["slack-message", e.tiptap.mergeAttributes(r.HTMLAttributes)]
  }), i = (r) => {
    const d = t.useMemo(() => new Map(r.channels.map((s) => [s.id, s])), [r.channels.length]);
    return /* @__PURE__ */ t.createElement(n.FormCombobox, { name: "channels", control: r.control, multiselect: !0, label: r.withLabel ? "Default channels" : void 0, __self: void 0, __source: {
      fileName: l,
      lineNumber: 160,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(n.ComboboxTrigger, { className: "flex items-center gap-2 self-start px-3 py-1.5 rounded-md bg-background-50 ring-primary-200 text-foreground-900 hover:ring-primary-300 disabled:bg-background-300/50 focus:ring-primary-500 focus:outline-none ring-2", __self: void 0, __source: {
      fileName: l,
      lineNumber: 166,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(n.ComboboxValue, { placeholder: "Select channels...", renderValues: (s) => r.channels.filter((_) => s.includes(_.id)).map((_) => `#${_.name}`).join(", "), __self: void 0, __source: {
      fileName: l,
      lineNumber: 167,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(He, { size: 14, className: "text-foreground-700", __self: void 0, __source: {
      fileName: l,
      lineNumber: 176,
      columnNumber: 11
    } })), /* @__PURE__ */ t.createElement(n.ComboboxContent, { align: "start", side: "bottom", commandProps: {
      filter: (s, _) => {
        var v;
        return (v = d.get(s)) != null && v.name.includes(_) ? 1 : 0;
      }
    }, __self: void 0, __source: {
      fileName: l,
      lineNumber: 178,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(n.ComboboxInput, { placeholder: "Search channels...", __self: void 0, __source: {
      fileName: l,
      lineNumber: 188,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(n.ComboboxEmpty, { __self: void 0, __source: {
      fileName: l,
      lineNumber: 189,
      columnNumber: 11
    } }, "No channel found."), /* @__PURE__ */ t.createElement(n.ComboboxGroup, { __self: void 0, __source: {
      fileName: l,
      lineNumber: 190,
      columnNumber: 11
    } }, r.channels.map((s) => /* @__PURE__ */ t.createElement(n.ComboboxItem, { key: s.id, value: s.id, className: "flex items-center justify-between gap-2", __self: void 0, __source: {
      fileName: l,
      lineNumber: 192,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
      fileName: l,
      lineNumber: 197,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement("img", { src: s.team.icon, className: "h-5 w-5 shrink-0", __self: void 0, __source: {
      fileName: l,
      lineNumber: 198,
      columnNumber: 19
    } }), /* @__PURE__ */ t.createElement("span", { className: "max-w-48 truncate", __self: void 0, __source: {
      fileName: l,
      lineNumber: 199,
      columnNumber: 19
    } }, "#", s.name)), /* @__PURE__ */ t.createElement(n.ComboboxSelected, { className: "ml-2 h-4 w-4 opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
      fileName: l,
      lineNumber: 201,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement(je, { size: 20, __self: void 0, __source: {
      fileName: l,
      lineNumber: 205,
      columnNumber: 19
    } })))))));
  };
  return {
    name: "Slack",
    noteEditorTipTapExtensions: [o, m],
    settings: {
      "connect-accounts": {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: l,
          lineNumber: 223,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/${e.pluginSlug}/auth`, __self: void 0, __source: {
          fileName: l,
          lineNumber: 224,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(n.Button, { __self: void 0, __source: {
          fileName: l,
          lineNumber: 225,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ t.createElement(n.ErrorBoundary, { fallbackRender: ({
          error: r
        }) => {
          var d, s, _;
          return ((_ = (s = (d = r.cause) == null ? void 0 : d[0]) == null ? void 0 : s.extensions) == null ? void 0 : _.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ t.createElement(t.Fragment, null) : /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: l,
            lineNumber: 232,
            columnNumber: 26
          } }, r.message);
        }, __self: void 0, __source: {
          fileName: l,
          lineNumber: 227,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: l,
          lineNumber: 235,
          columnNumber: 17
        } }, /* @__PURE__ */ t.createElement(a, { __self: void 0, __source: {
          fileName: l,
          lineNumber: 236,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      [J]: {
        name: "Post in Slack",
        description: "Post a message in Slack channels.",
        component: (r) => {
          var K;
          const d = r.templates[0], s = t.useRef(null), _ = e.dayjs(), [v, O] = t.useState(!1), [w, F] = t.useState(((K = r.stepConfig) == null ? void 0 : K.defaultChannels) ?? []), {
            control: L,
            handleSubmit: $,
            formState: M,
            setError: T,
            setValue: P
          } = e.reactHookForm.useForm({
            defaultValues: {
              message: (d == null ? void 0 : d.rendered) ?? "",
              channels: w.map((p) => p.id)
            }
          }), [j, b] = e.operations.useMutation("postMessage"), R = async (p) => {
            var Z, W, G;
            const E = w.filter((h) => p.channels.includes(h.id));
            if (!E.length) {
              T("root", {
                message: "Please select at least one channel."
              });
              return;
            }
            const C = await j({
              message: p.message,
              channels: E.map((h) => ({
                teamId: h.team.id,
                channelId: h.id
              }))
            });
            if (!((Z = C == null ? void 0 : C.data) != null && Z.ok)) {
              T("root", {
                message: "Couldn't post message to Slack channels."
              });
              return;
            }
            let q = ((W = s.current) == null ? void 0 : W.state.doc.content.size) ?? 0;
            const S = (G = s.current) == null ? void 0 : G.chain();
            for (const h of C.data.messages)
              S == null || S.insertContentAt(q, {
                type: "slack-message",
                attrs: {
                  teamId: h.teamId,
                  channelId: h.channelId,
                  ts: h.ts
                }
              }), q++;
            S == null || S.run(), O(!0);
          }, g = () => {
            v && (O(!1), r.onNext());
          };
          return e.hooks.useAsyncEffect(async () => {
            const p = await e.operations.query({
              operationName: "getChannels"
            });
            F((E) => {
              var C;
              return ((C = p == null ? void 0 : p.data) == null ? void 0 : C.channels) ?? E;
            });
          }, []), t.useEffect(() => {
            if (s.current) {
              const p = s.current.getHTML();
              P("message", p);
            }
          }, [s.current]), /* @__PURE__ */ t.createElement("div", { className: "bg-background-100 w-full", __self: void 0, __source: {
            fileName: l,
            lineNumber: 326,
            columnNumber: 13
          } }, /* @__PURE__ */ t.createElement("form", { onSubmit: $(R), className: "flex flex-col gap-4 mx-auto max-w-2xl pt-48 min-h-screen", __self: void 0, __source: {
            fileName: l,
            lineNumber: 327,
            columnNumber: 15
          } }, /* @__PURE__ */ t.createElement("div", { className: "font-semibold text-4xl", __self: void 0, __source: {
            fileName: l,
            lineNumber: 331,
            columnNumber: 17
          } }, "Post to Slack"), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "message", control: L, render: ({
            field: p
          }) => /* @__PURE__ */ t.createElement(n.NoteEditor, { editorRef: s, slug: `slack_post-to-slack-${_.format("YYYY-MM-DD")}`, title: `Post to Slack for ${_.format("MMMM D, YYYY")}`, initialValue: p.value, onChange: ({
            html: E
          }) => {
            console.log(E), p.onChange(E);
          }, onBlur: p.onBlur, saveNow: v, onSaveEnd: g, className: "min-h-[40vh]", __self: void 0, __source: {
            fileName: l,
            lineNumber: 336,
            columnNumber: 21
          } }), __self: void 0, __source: {
            fileName: l,
            lineNumber: 332,
            columnNumber: 17
          } }), M.errors.root && /* @__PURE__ */ t.createElement("div", { className: "text-negative-600 text-sm", __self: void 0, __source: {
            fileName: l,
            lineNumber: 353,
            columnNumber: 19
          } }, M.errors.root.message), /* @__PURE__ */ t.createElement("div", { className: "flex justify-between items-center", __self: void 0, __source: {
            fileName: l,
            lineNumber: 355,
            columnNumber: 17
          } }, /* @__PURE__ */ t.createElement(i, { control: L, channels: w, __self: void 0, __source: {
            fileName: l,
            lineNumber: 356,
            columnNumber: 19
          } }), /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
            fileName: l,
            lineNumber: 357,
            columnNumber: 19
          } }, /* @__PURE__ */ t.createElement(r.BackButton, { type: "button", __self: void 0, __source: {
            fileName: l,
            lineNumber: 358,
            columnNumber: 21
          } }), /* @__PURE__ */ t.createElement(r.NextButton, { type: "submit", loading: b, onClick: () => {
          }, __self: void 0, __source: {
            fileName: l,
            lineNumber: 359,
            columnNumber: 21
          } })))));
        },
        renderSettings: async (r) => ({
          component: () => {
            var $, M, T, P, j;
            const d = r.routineStep.templates[0], {
              control: s,
              handleSubmit: _
            } = e.reactHookForm.useForm({
              defaultValues: {
                template: {
                  content: (d == null ? void 0 : d.raw) ?? be,
                  data: (d == null ? void 0 : d.metadata) ?? {}
                },
                channels: ((T = (M = ($ = r.routineStep) == null ? void 0 : $.config) == null ? void 0 : M.defaultChannels) == null ? void 0 : T.map((b) => b.id)) ?? []
              }
            }), [v, O] = t.useState(((j = (P = r.routineStep) == null ? void 0 : P.config) == null ? void 0 : j.defaultChannels) ?? []), [w, F] = e.relay.useMutation(ne), L = async (b) => {
              const R = v.filter((g) => b.channels.includes(g.id));
              w({
                variables: {
                  routineStep: {
                    id: r.routineStep.id,
                    config: {
                      defaultChannels: R
                    }
                  },
                  template: {
                    slug: (d == null ? void 0 : d.slug) ?? `slack-${J}-${r.routineStep.id}`,
                    raw: b.template.content,
                    metadata: b.template.data ?? {}
                  }
                },
                onCompleted: () => {
                  var g;
                  return (g = r.onClose) == null ? void 0 : g.call(r);
                }
              });
            };
            return e.hooks.useAsyncEffect(async () => {
              const b = await e.operations.query({
                operationName: "getChannels"
              });
              O((R) => {
                var g;
                return ((g = b == null ? void 0 : b.data) == null ? void 0 : g.channels) ?? R;
              });
            }, []), /* @__PURE__ */ t.createElement("form", { onSubmit: _(L), className: "flex flex-col gap-4", __self: void 0, __source: {
              fileName: l,
              lineNumber: 441,
              columnNumber: 17
            } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-1", __self: void 0, __source: {
              fileName: l,
              lineNumber: 442,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-900 text-base font-medium", __self: void 0, __source: {
              fileName: l,
              lineNumber: 443,
              columnNumber: 21
            } }, "Template"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
              fileName: l,
              lineNumber: 444,
              columnNumber: 21
            } }, "Write the template message for the routine in HTML. You can preview it before saving.", /* @__PURE__ */ t.createElement("br", { __self: void 0, __source: {
              fileName: l,
              lineNumber: 447,
              columnNumber: 23
            } }), "Don't worry, you can edit the message each time you do the routine."), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "template", control: s, render: ({
              field: b
            }) => /* @__PURE__ */ t.createElement(n.TemplateEditor, { initialTemplate: b.value, onChange: b.onChange, __self: void 0, __source: {
              fileName: l,
              lineNumber: 454,
              columnNumber: 25
            } }), __self: void 0, __source: {
              fileName: l,
              lineNumber: 450,
              columnNumber: 21
            } })), /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-1", __self: void 0, __source: {
              fileName: l,
              lineNumber: 461,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-900 text-base font-medium", __self: void 0, __source: {
              fileName: l,
              lineNumber: 462,
              columnNumber: 21
            } }, "Default channels"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
              fileName: l,
              lineNumber: 465,
              columnNumber: 21
            } }, "Which channels should be selected by default when posting to Slack?"), /* @__PURE__ */ t.createElement(i, { control: s, channels: v, __self: void 0, __source: {
              fileName: l,
              lineNumber: 468,
              columnNumber: 21
            } })), /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2 self-end", __self: void 0, __source: {
              fileName: l,
              lineNumber: 470,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement(n.Button, { type: "button", secondary: !0, onClick: r.onCancel, __self: void 0, __source: {
              fileName: l,
              lineNumber: 471,
              columnNumber: 21
            } }, "Cancel"), /* @__PURE__ */ t.createElement(n.Button, { type: "submit", loading: F, __self: void 0, __source: {
              fileName: l,
              lineNumber: 474,
              columnNumber: 21
            } }, "Save")));
          }
        })
      }
    }
  };
});
export {
  Ae as default
};
