const se = /* @__PURE__ */ function() {
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
  }, r = [
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
      selections: r,
      type: "Mutation",
      abstractKey: null
    },
    kind: "Request",
    operation: {
      argumentDefinitions: e,
      kind: "Operation",
      name: "webUpdateRoutineStepMutation",
      selections: r
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
se.hash = "b71dfd7eaaba64f4182f87b2c5257a96";
const ye = (e) => ({ plugin: e }), re = "post-to-slack", Ee = (e) => {
  const t = "";
  return `Plan for today
<ul>
  {{#tasks}}
    <li>{{slack-status}} {{title-without-tags}}${t}</li>
  {{else}}
    <li>No tasks</li> 
  {{/tasks}}
  {{! Do not remove the extra curly braces around the slack-future-tasks block.}}
  {{{{slack-future-tasks}}}}
    <li>{{slack-status}} {{title-without-tags}}${t}</li>
  {{{{/slack-future-tasks}}}}
</ul>`;
};
function ke(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ie = { exports: {} }, u = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var I = Symbol.for("react.element"), Ce = Symbol.for("react.portal"), Se = Symbol.for("react.fragment"), xe = Symbol.for("react.strict_mode"), we = Symbol.for("react.profiler"), Me = Symbol.for("react.provider"), Te = Symbol.for("react.context"), Re = Symbol.for("react.forward_ref"), Le = Symbol.for("react.suspense"), He = Symbol.for("react.memo"), Oe = Symbol.for("react.lazy"), le = Symbol.iterator;
function Ie(e) {
  return e === null || typeof e != "object" ? null : (e = le && e[le] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ce = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, me = Object.assign, fe = {};
function T(e, t, r) {
  this.props = e, this.context = t, this.refs = fe, this.updater = r || ce;
}
T.prototype.isReactComponent = {};
T.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
T.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function de() {
}
de.prototype = T.prototype;
function Y(e, t, r) {
  this.props = e, this.context = t, this.refs = fe, this.updater = r || ce;
}
var q = Y.prototype = new de();
q.constructor = Y;
me(q, T.prototype);
q.isPureReactComponent = !0;
var ae = Array.isArray, _e = Object.prototype.hasOwnProperty, W = { current: null }, Ne = { key: !0, ref: !0, __self: !0, __source: !0 };
function be(e, t, r) {
  var a, o = {}, m = null, d = null;
  if (t != null)
    for (a in t.ref !== void 0 && (d = t.ref), t.key !== void 0 && (m = "" + t.key), t)
      _e.call(t, a) && !Ne.hasOwnProperty(a) && (o[a] = t[a]);
  var f = arguments.length - 2;
  if (f === 1)
    o.children = r;
  else if (1 < f) {
    for (var i = Array(f), h = 0; h < f; h++)
      i[h] = arguments[h + 2];
    o.children = i;
  }
  if (e && e.defaultProps)
    for (a in f = e.defaultProps, f)
      o[a] === void 0 && (o[a] = f[a]);
  return { $$typeof: I, type: e, key: m, ref: d, props: o, _owner: W.current };
}
function $e(e, t) {
  return { $$typeof: I, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Z(e) {
  return typeof e == "object" && e !== null && e.$$typeof === I;
}
function je(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(r) {
    return t[r];
  });
}
var oe = /\/+/g;
function K(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? je("" + e.key) : t.toString(36);
}
function B(e, t, r, a, o) {
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
          case I:
          case Ce:
            d = !0;
        }
    }
  if (d)
    return d = e, o = o(d), e = a === "" ? "." + K(d, 0) : a, ae(o) ? (r = "", e != null && (r = e.replace(oe, "$&/") + "/"), B(o, t, r, "", function(h) {
      return h;
    })) : o != null && (Z(o) && (o = $e(o, r + (!o.key || d && d.key === o.key ? "" : ("" + o.key).replace(oe, "$&/") + "/") + e)), t.push(o)), 1;
  if (d = 0, a = a === "" ? "." : a + ":", ae(e))
    for (var f = 0; f < e.length; f++) {
      m = e[f];
      var i = a + K(m, f);
      d += B(m, t, r, i, o);
    }
  else if (i = Ie(e), typeof i == "function")
    for (e = i.call(e), f = 0; !(m = e.next()).done; )
      m = m.value, i = a + K(m, f++), d += B(m, t, r, i, o);
  else if (m === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return d;
}
function F(e, t, r) {
  if (e == null)
    return e;
  var a = [], o = 0;
  return B(e, a, "", "", function(m) {
    return t.call(r, m, o++);
  }), a;
}
function Ae(e) {
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
var g = { current: null }, U = { transition: null }, Pe = { ReactCurrentDispatcher: g, ReactCurrentBatchConfig: U, ReactCurrentOwner: W };
function pe() {
  throw Error("act(...) is not supported in production builds of React.");
}
u.Children = { map: F, forEach: function(e, t, r) {
  F(e, function() {
    t.apply(this, arguments);
  }, r);
}, count: function(e) {
  var t = 0;
  return F(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return F(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Z(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
u.Component = T;
u.Fragment = Se;
u.Profiler = we;
u.PureComponent = Y;
u.StrictMode = xe;
u.Suspense = Le;
u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Pe;
u.act = pe;
u.cloneElement = function(e, t, r) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var a = me({}, e.props), o = e.key, m = e.ref, d = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (m = t.ref, d = W.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps)
      var f = e.type.defaultProps;
    for (i in t)
      _e.call(t, i) && !Ne.hasOwnProperty(i) && (a[i] = t[i] === void 0 && f !== void 0 ? f[i] : t[i]);
  }
  var i = arguments.length - 2;
  if (i === 1)
    a.children = r;
  else if (1 < i) {
    f = Array(i);
    for (var h = 0; h < i; h++)
      f[h] = arguments[h + 2];
    a.children = f;
  }
  return { $$typeof: I, type: e.type, key: o, ref: m, props: a, _owner: d };
};
u.createContext = function(e) {
  return e = { $$typeof: Te, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Me, _context: e }, e.Consumer = e;
};
u.createElement = be;
u.createFactory = function(e) {
  var t = be.bind(null, e);
  return t.type = e, t;
};
u.createRef = function() {
  return { current: null };
};
u.forwardRef = function(e) {
  return { $$typeof: Re, render: e };
};
u.isValidElement = Z;
u.lazy = function(e) {
  return { $$typeof: Oe, _payload: { _status: -1, _result: e }, _init: Ae };
};
u.memo = function(e, t) {
  return { $$typeof: He, type: e, compare: t === void 0 ? null : t };
};
u.startTransition = function(e) {
  var t = U.transition;
  U.transition = {};
  try {
    e();
  } finally {
    U.transition = t;
  }
};
u.unstable_act = pe;
u.useCallback = function(e, t) {
  return g.current.useCallback(e, t);
};
u.useContext = function(e) {
  return g.current.useContext(e);
};
u.useDebugValue = function() {
};
u.useDeferredValue = function(e) {
  return g.current.useDeferredValue(e);
};
u.useEffect = function(e, t) {
  return g.current.useEffect(e, t);
};
u.useId = function() {
  return g.current.useId();
};
u.useImperativeHandle = function(e, t, r) {
  return g.current.useImperativeHandle(e, t, r);
};
u.useInsertionEffect = function(e, t) {
  return g.current.useInsertionEffect(e, t);
};
u.useLayoutEffect = function(e, t) {
  return g.current.useLayoutEffect(e, t);
};
u.useMemo = function(e, t) {
  return g.current.useMemo(e, t);
};
u.useReducer = function(e, t, r) {
  return g.current.useReducer(e, t, r);
};
u.useRef = function(e) {
  return g.current.useRef(e);
};
u.useState = function(e) {
  return g.current.useState(e);
};
u.useSyncExternalStore = function(e, t, r) {
  return g.current.useSyncExternalStore(e, t, r);
};
u.useTransition = function() {
  return g.current.useTransition();
};
u.version = "18.3.1";
ie.exports = u;
var Ve = ie.exports;
const x = /* @__PURE__ */ ke(Ve);
var ge = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, ue = x.createContext && x.createContext(ge), C = function() {
  return C = Object.assign || function(e) {
    for (var t, r = 1, a = arguments.length; r < a; r++) {
      t = arguments[r];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, C.apply(this, arguments);
}, De = function(e, t) {
  var r = {};
  for (var a in e)
    Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (r[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
      t.indexOf(a[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[o]) && (r[a[o]] = e[a[o]]);
  return r;
};
function he(e) {
  return e && e.map(function(t, r) {
    return x.createElement(t.tag, C({
      key: r
    }, t.attr), he(t.child));
  });
}
function ve(e) {
  return function(t) {
    return x.createElement(Fe, C({
      attr: C({}, e.attr)
    }, t), he(e.child));
  };
}
function Fe(e) {
  var t = function(r) {
    var a = e.attr, o = e.size, m = e.title, d = De(e, ["attr", "size", "title"]), f = o || r.size || "1em", i;
    return r.className && (i = r.className), e.className && (i = (i ? i + " " : "") + e.className), x.createElement("svg", C({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, a, d, {
      className: i,
      style: C(C({
        color: e.color || r.color
      }, r.style), e.style),
      height: f,
      width: f,
      xmlns: "http://www.w3.org/2000/svg"
    }), m && x.createElement("title", null, m), e.children);
  };
  return ue !== void 0 ? x.createElement(ue.Consumer, null, function(r) {
    return t(r);
  }) : t(ge);
}
function Be(e) {
  return ve({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" } }] })(e);
}
function Ue(e) {
  return ve({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
}
var n = "/Users/richardguerre/Projects/flow/plugins/slack/src/web.tsx";
const ze = ye((e) => {
  const t = e.React, r = e.components;
  e.relay.graphql;
  const a = () => {
    var c, s;
    const l = e.operations.useLazyQuery({
      operationName: "workspaces"
    });
    return (c = l == null ? void 0 : l.data) != null && c.workspaces.length ? /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 27,
      columnNumber: 7
    } }, (s = l == null ? void 0 : l.data) == null ? void 0 : s.workspaces.map((_) => /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2 rounded max-w-2xl bg-background-50 shadow px-4 py-4", __self: void 0, __source: {
      fileName: n,
      lineNumber: 29,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement("img", { src: _.teamIcon, className: "h-5 w-5 shrink-0", __self: void 0, __source: {
      fileName: n,
      lineNumber: 30,
      columnNumber: 13
    } }), /* @__PURE__ */ t.createElement("span", { className: "font-semibold", __self: void 0, __source: {
      fileName: n,
      lineNumber: 31,
      columnNumber: 13
    } }, _.teamName), /* @__PURE__ */ t.createElement("span", { className: "text-sm text-foreground-700", __self: void 0, __source: {
      fileName: n,
      lineNumber: 32,
      columnNumber: 13
    } }, "Connected ", e.dayjs(_.connectedAt).fromNow())))) : /* @__PURE__ */ t.createElement("div", { className: "flex", __self: void 0, __source: {
      fileName: n,
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
        parseHTML: (l) => l.getAttribute("data-task-id") ?? null,
        renderHTML: (l) => l.taskId ? {
          "data-task-id": l.taskId
        } : {}
      }
    }),
    parseHTML: () => [{
      tag: "slack-status"
    }],
    renderHTML: (l) => ["slack-status", e.tiptap.mergeAttributes(l.HTMLAttributes)],
    addNodeView: () => e.tiptap.ReactNodeViewRenderer(m)
  }), m = (l) => /* @__PURE__ */ t.createElement(e.tiptap.NodeViewWrapper, { as: "span", __self: void 0, __source: {
    fileName: n,
    lineNumber: 60,
    columnNumber: 7
  } }, /* @__PURE__ */ t.createElement(r.Tooltip, { __self: void 0, __source: {
    fileName: n,
    lineNumber: 61,
    columnNumber: 9
  } }, /* @__PURE__ */ t.createElement(r.TooltipTrigger, { className: e.cn("p-0.5 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-0.5 h-5 w-5 inline-flex items-center justify-center", l.selected && "bg-background-300"), __self: void 0, __source: {
    fileName: n,
    lineNumber: 62,
    columnNumber: 11
  } }, /* @__PURE__ */ t.createElement(i, { __self: void 0, __source: {
    fileName: n,
    lineNumber: 68,
    columnNumber: 13
  } })), /* @__PURE__ */ t.createElement(r.TooltipContent, { className: "max-w-xs", __self: void 0, __source: {
    fileName: n,
    lineNumber: 70,
    columnNumber: 11
  } }, "This is a placeholder for where the Slack plugin will add and automatically update the status of the task (✅ when done, ❌ when canceled.)"))), d = e.tiptap.Node.create({
    name: "slack-future-tasks",
    inline: !0,
    group: "inline",
    atom: !0,
    draggable: !0,
    selectable: !0,
    addAttributes: () => ({
      innerHTML: {
        default: null,
        parseHTML: (l) => l.innerHTML,
        rendered: !1
      },
      filter: {
        default: null,
        parseHTML: (l) => {
          const c = l.getAttribute("filter");
          return c ? JSON.parse(c) : null;
        },
        renderHTML: (l) => l.filter ? {
          filter: JSON.stringify(l.filter)
        } : {}
      }
    }),
    parseHTML: () => [{
      tag: "slack-future-tasks"
    }],
    renderHTML({
      HTMLAttributes: l,
      node: c
    }) {
      const s = document.createElement("slack-future-tasks");
      s.innerHTML = c.attrs.innerHTML;
      for (const _ in l)
        s.setAttribute(_, l[_]);
      return {
        dom: s
      };
    },
    addNodeView: () => e.tiptap.ReactNodeViewRenderer(f)
  }), f = (l) => /* @__PURE__ */ t.createElement(e.tiptap.NodeViewWrapper, { as: "span", __self: void 0, __source: {
    fileName: n,
    lineNumber: 122,
    columnNumber: 7
  } }, /* @__PURE__ */ t.createElement(r.Tooltip, { __self: void 0, __source: {
    fileName: n,
    lineNumber: 123,
    columnNumber: 9
  } }, /* @__PURE__ */ t.createElement(r.TooltipTrigger, { className: e.cn("p-0.5 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-0.5 h-5 inline-flex items-center gap-1", l.selected && "bg-background-300"), __self: void 0, __source: {
    fileName: n,
    lineNumber: 124,
    columnNumber: 11
  } }, /* @__PURE__ */ t.createElement(i, { __self: void 0, __source: {
    fileName: n,
    lineNumber: 130,
    columnNumber: 13
  } }), /* @__PURE__ */ t.createElement("span", { className: "text-foreground-700", __self: void 0, __source: {
    fileName: n,
    lineNumber: 131,
    columnNumber: 13
  } }, "New tasks will be added here.")), /* @__PURE__ */ t.createElement(r.TooltipContent, { className: "max-w-xs", __self: void 0, __source: {
    fileName: n,
    lineNumber: 133,
    columnNumber: 11
  } }, "New tasks that match the filters you set in the ", /* @__PURE__ */ t.createElement("b", { __self: void 0, __source: {
    fileName: n,
    lineNumber: 134,
    columnNumber: 61
  } }, "Post in Slack"), " routine step will be added here (defaults to today's tasks).", /* @__PURE__ */ t.createElement("br", { __self: void 0, __source: {
    fileName: n,
    lineNumber: 136,
    columnNumber: 13
  } }), /* @__PURE__ */ t.createElement("br", { __self: void 0, __source: {
    fileName: n,
    lineNumber: 137,
    columnNumber: 13
  } }), "New tasks will be rendered using this template:", /* @__PURE__ */ t.createElement("pre", { __self: void 0, __source: {
    fileName: n,
    lineNumber: 139,
    columnNumber: 13
  } }, /* @__PURE__ */ t.createElement("code", { className: "text-xs", __self: void 0, __source: {
    fileName: n,
    lineNumber: 140,
    columnNumber: 15
  } }, l.node.attrs.innerHTML))))), i = () => /* @__PURE__ */ t.createElement("svg", { width: "16", height: "16", viewBox: "0 0 123 123", fill: "none", xmlns: "http://www.w3.org/2000/svg", __self: void 0, __source: {
    fileName: n,
    lineNumber: 149,
    columnNumber: 5
  } }, /* @__PURE__ */ t.createElement("path", { d: "M25.8 77.6C25.8 84.7 20 90.5 12.9 90.5C5.8 90.5 0 84.7 0 77.6C0 70.5 5.8 64.7 12.9 64.7H25.8V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
    fileName: n,
    lineNumber: 156,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M32.3 77.6C32.3 70.5 38.1001 64.7 45.2001 64.7C52.3001 64.7 58.1 70.5 58.1 77.6V109.9C58.1 117 52.3001 122.8 45.2001 122.8C38.1001 122.8 32.3 117 32.3 109.9V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
    fileName: n,
    lineNumber: 160,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M45.2001 25.8C38.1001 25.8 32.3 20 32.3 12.9C32.3 5.8 38.1001 0 45.2001 0C52.3001 0 58.1 5.8 58.1 12.9V25.8H45.2001Z", fill: "#36C5F0", __self: void 0, __source: {
    fileName: n,
    lineNumber: 164,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M45.2 32.3C52.3 32.3 58.1 38.1 58.1 45.2C58.1 52.3 52.3 58.1 45.2 58.1H12.9C5.8 58.1 0 52.3 0 45.2C0 38.1 5.8 32.3 12.9 32.3H45.2Z", fill: "#36C5F0", __self: void 0, __source: {
    fileName: n,
    lineNumber: 168,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M97 45.2C97 38.1 102.8 32.3 109.9 32.3C117 32.3 122.8 38.1 122.8 45.2C122.8 52.3 117 58.1 109.9 58.1H97V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
    fileName: n,
    lineNumber: 172,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M90.5 45.2C90.5 52.3 84.6999 58.1 77.5999 58.1C70.4999 58.1 64.7 52.3 64.7 45.2V12.9C64.7 5.8 70.4999 0 77.5999 0C84.6999 0 90.5 5.8 90.5 12.9V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
    fileName: n,
    lineNumber: 176,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M77.5999 97C84.6999 97 90.5 102.8 90.5 109.9C90.5 117 84.6999 122.8 77.5999 122.8C70.4999 122.8 64.7 117 64.7 109.9V97H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
    fileName: n,
    lineNumber: 180,
    columnNumber: 7
  } }), /* @__PURE__ */ t.createElement("path", { d: "M77.5999 90.5C70.4999 90.5 64.7 84.7 64.7 77.6C64.7 70.5 70.4999 64.7 77.5999 64.7H109.9C117 64.7 122.8 70.5 122.8 77.6C122.8 84.7 117 90.5 109.9 90.5H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
    fileName: n,
    lineNumber: 184,
    columnNumber: 7
  } })), h = e.tiptap.Node.create({
    name: "slack-message",
    group: "block",
    atom: !0,
    selectable: !1,
    draggable: !1,
    addAttributes: () => ({
      teamId: {
        default: null,
        parseHTML: (l) => l.getAttribute("data-team-id") ?? null,
        renderHTML: (l) => l.teamId ? {
          "data-team-id": l.teamId
        } : {}
      },
      channelId: {
        default: null,
        parseHTML: (l) => l.getAttribute("data-channel-id") ?? null,
        renderHTML: (l) => l.channelId ? {
          "data-channel-id": l.channelId
        } : {}
      },
      ts: {
        default: null,
        parseHTML: (l) => l.getAttribute("data-ts") ?? null,
        renderHTML: (l) => l.ts ? {
          "data-ts": l.ts
        } : {}
      }
    }),
    parseHTML: () => [{
      tag: "slack-message"
    }],
    renderHTML: (l) => ["slack-message", e.tiptap.mergeAttributes(l.HTMLAttributes)]
  }), G = (l) => {
    const c = t.useMemo(() => new Map(l.channelsData.channels.map((s) => [s.id, s])), [l.channelsData.channels.length]);
    return /* @__PURE__ */ t.createElement(r.FormCombobox, { name: "channels", control: l.control, multiselect: !0, label: l.withLabel ? "Default channels" : void 0, __self: void 0, __source: {
      fileName: n,
      lineNumber: 231,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(r.ComboboxTrigger, { className: "flex items-center gap-2 self-start px-3 py-1.5 rounded-md bg-background-50 ring-primary-200 text-foreground-900 hover:ring-primary-300 disabled:bg-background-300/50 focus:ring-primary-500 focus:outline-none ring-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 237,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(r.ComboboxValue, { placeholder: "Select channels...", renderValues: (s) => s.map((_) => {
      var v;
      return `#${((v = c.get(_)) == null ? void 0 : v.name) ?? "unknown"}`;
    }).join(", "), __self: void 0, __source: {
      fileName: n,
      lineNumber: 238,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(Ue, { size: 14, className: "text-foreground-700", __self: void 0, __source: {
      fileName: n,
      lineNumber: 244,
      columnNumber: 11
    } })), /* @__PURE__ */ t.createElement(r.ComboboxContent, { align: "start", side: "bottom", className: "max-h-64 overflow-y-auto", commandProps: {
      filter: (s, _) => {
        var v;
        return (v = c.get(s)) != null && v.name.includes(_) ? 1 : 0;
      }
    }, __self: void 0, __source: {
      fileName: n,
      lineNumber: 246,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(r.ComboboxInput, { placeholder: "Search channels...", __self: void 0, __source: {
      fileName: n,
      lineNumber: 257,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(r.ComboboxEmpty, { __self: void 0, __source: {
      fileName: n,
      lineNumber: 258,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col items-center gap-1", __self: void 0, __source: {
      fileName: n,
      lineNumber: 259,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement("div", { __self: void 0, __source: {
      fileName: n,
      lineNumber: 260,
      columnNumber: 15
    } }, "Can't find the channel you're looking for?"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
      fileName: n,
      lineNumber: 261,
      columnNumber: 15
    } }, "Last refreshed ", e.dayjs(l.channelsData.lastCachedAt).fromNow()), /* @__PURE__ */ t.createElement(r.Button, { sm: !0, secondary: !0, onClick: l.onRefresh, loading: l.refreshing, __self: void 0, __source: {
      fileName: n,
      lineNumber: 264,
      columnNumber: 15
    } }, "Refresh"))), /* @__PURE__ */ t.createElement(r.ComboboxGroup, { __self: void 0, __source: {
      fileName: n,
      lineNumber: 269,
      columnNumber: 11
    } }, l.channelsData.channels.map((s) => /* @__PURE__ */ t.createElement(r.ComboboxItem, { key: s.id, value: s.id, className: "flex items-center justify-between gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 271,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 276,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement("img", { src: s.team.icon, className: "h-5 w-5 shrink-0 rounded", __self: void 0, __source: {
      fileName: n,
      lineNumber: 277,
      columnNumber: 19
    } }), /* @__PURE__ */ t.createElement("span", { className: "max-w-48 truncate", __self: void 0, __source: {
      fileName: n,
      lineNumber: 278,
      columnNumber: 19
    } }, "#", s.name)), /* @__PURE__ */ t.createElement(r.ComboboxSelected, { className: "ml-2 h-4 w-4 opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
      fileName: n,
      lineNumber: 280,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement(Be, { size: 20, __self: void 0, __source: {
      fileName: n,
      lineNumber: 284,
      columnNumber: 19
    } })))))));
  };
  return {
    name: "Slack",
    noteEditorTipTapExtensions: [o, h, d],
    settings: {
      "connect-accounts": {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: n,
          lineNumber: 302,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/${e.pluginSlug}/auth`, __self: void 0, __source: {
          fileName: n,
          lineNumber: 303,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(r.Button, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 304,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ t.createElement(r.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var c, s, _;
          return ((_ = (s = (c = l.cause) == null ? void 0 : c[0]) == null ? void 0 : s.extensions) == null ? void 0 : _.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ t.createElement(t.Fragment, null) : /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: n,
            lineNumber: 311,
            columnNumber: 26
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: n,
          lineNumber: 306,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: n,
          lineNumber: 314,
          columnNumber: 17
        } }, /* @__PURE__ */ t.createElement(a, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 315,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      [re]: {
        name: "Post in Slack",
        description: "Post a message in Slack channels.",
        component: (l) => {
          var J;
          const c = l.templates[0], s = t.useRef(null), _ = e.dayjs(), [v, R] = t.useState(!1), [L, $] = t.useState(!1), [H, z] = t.useState({
            channels: ((J = l.stepConfig) == null ? void 0 : J.defaultChannels) ?? [],
            lastCachedAt: e.dayjs().toISOString()
          }), {
            control: j,
            handleSubmit: A,
            formState: O,
            setError: k,
            setValue: P
          } = e.reactHookForm.useForm({
            defaultValues: {
              message: (c == null ? void 0 : c.rendered) ?? "",
              channels: H.channels.map((p) => p.id)
            }
          }), [V, D] = e.operations.useMutation("postMessage", {
            throwOnError: !0
          }), b = async (p) => {
            var Q, ee, te;
            const E = H.channels.filter((N) => p.channels.includes(N.id));
            if (!E.length) {
              k("root", {
                message: "Please select at least one channel."
              });
              return;
            }
            const w = await V({
              message: p.message,
              channels: E.map((N) => ({
                teamId: N.team.id,
                channelId: N.id
              }))
            }).catch((N) => {
              var ne;
              "extensions" in N && ((ne = N == null ? void 0 : N.extensions) != null && ne.userFriendlyMessage) ? k("root", {
                message: N.extensions.userFriendlyMessage
              }) : "message" in N ? k("root", {
                message: N.message
              }) : k("root", {
                message: "Couldn't post message to Slack channels. Please try again."
              });
            });
            if (!((Q = w == null ? void 0 : w.data) != null && Q.ok)) {
              k("root", {
                message: "Couldn't post message to Slack channels."
              });
              return;
            }
            let X = ((ee = s.current) == null ? void 0 : ee.state.doc.content.size) ?? 0;
            const M = (te = s.current) == null ? void 0 : te.chain();
            for (const N of w.data.messages)
              M == null || M.insertContentAt(X, {
                type: "slack-message",
                attrs: {
                  teamId: N.teamId,
                  channelId: N.channelId,
                  ts: N.ts
                }
              }), X++;
            M == null || M.run(), $(!0);
          }, S = () => {
            L && ($(!1), l.onNext());
          }, y = async (p) => {
            R(!!(p != null && p.forceRefresh));
            const E = await e.operations.query({
              operationName: "getChannels",
              input: p
            });
            z((w) => (E == null ? void 0 : E.data) ?? w), R(!1);
          };
          return e.hooks.useAsyncEffect(async () => {
            await y();
          }, []), t.useEffect(() => {
            if (s.current) {
              const p = s.current.getHTML();
              P("message", p);
            }
          }, [s.current]), /* @__PURE__ */ t.createElement("div", { className: "bg-background-100 w-full", __self: void 0, __source: {
            fileName: n,
            lineNumber: 424,
            columnNumber: 13
          } }, /* @__PURE__ */ t.createElement("form", { onSubmit: A(b), className: "flex flex-col gap-4 mx-auto max-w-2xl pt-48 min-h-screen", __self: void 0, __source: {
            fileName: n,
            lineNumber: 425,
            columnNumber: 15
          } }, /* @__PURE__ */ t.createElement("div", { className: "font-semibold text-4xl", __self: void 0, __source: {
            fileName: n,
            lineNumber: 429,
            columnNumber: 17
          } }, "Post to Slack"), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "message", control: j, render: ({
            field: p
          }) => /* @__PURE__ */ t.createElement(r.NoteEditor, { editorRef: s, slug: `slack_post-to-slack-${_.format("YYYY-MM-DD")}`, title: `Post to Slack for ${_.format("MMMM D, YYYY")}`, initialValue: p.value, onChange: ({
            html: E
          }) => {
            console.log(E), p.onChange(E);
          }, onBlur: p.onBlur, saveNow: L, onSaveEnd: S, className: "min-h-[40vh]", __self: void 0, __source: {
            fileName: n,
            lineNumber: 434,
            columnNumber: 21
          } }), __self: void 0, __source: {
            fileName: n,
            lineNumber: 430,
            columnNumber: 17
          } }), O.errors.root && /* @__PURE__ */ t.createElement("div", { className: "text-negative-600 text-sm", __self: void 0, __source: {
            fileName: n,
            lineNumber: 451,
            columnNumber: 19
          } }, O.errors.root.message), /* @__PURE__ */ t.createElement("div", { className: "flex justify-between items-center", __self: void 0, __source: {
            fileName: n,
            lineNumber: 453,
            columnNumber: 17
          } }, /* @__PURE__ */ t.createElement(G, { control: j, channelsData: H, onRefresh: () => y({
            forceRefresh: !0
          }), refreshing: v, __self: void 0, __source: {
            fileName: n,
            lineNumber: 454,
            columnNumber: 19
          } }), /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
            fileName: n,
            lineNumber: 460,
            columnNumber: 19
          } }, /* @__PURE__ */ t.createElement(l.BackButton, { type: "button", __self: void 0, __source: {
            fileName: n,
            lineNumber: 461,
            columnNumber: 21
          } }), /* @__PURE__ */ t.createElement(l.NextButton, { type: "submit", loading: D, onClick: () => {
          }, __self: void 0, __source: {
            fileName: n,
            lineNumber: 462,
            columnNumber: 21
          } })))));
        },
        renderSettings: async (l) => ({
          component: () => {
            var O, k, P, V, D;
            const c = l.routineStep.templates[0], {
              control: s,
              handleSubmit: _
            } = e.reactHookForm.useForm({
              defaultValues: {
                template: {
                  content: (c == null ? void 0 : c.raw) ?? Ee(),
                  data: (c == null ? void 0 : c.metadata) ?? {}
                },
                channels: ((P = (k = (O = l.routineStep) == null ? void 0 : O.config) == null ? void 0 : k.defaultChannels) == null ? void 0 : P.map((b) => b.id)) ?? []
              }
            }), [v, R] = t.useState(!1), [L, $] = t.useState({
              channels: ((D = (V = l.routineStep) == null ? void 0 : V.config) == null ? void 0 : D.defaultChannels) ?? [],
              lastCachedAt: e.dayjs().toISOString()
            }), [H, z] = e.relay.useMutation(se), j = async (b) => {
              const S = L.channels.filter((y) => b.channels.includes(y.id));
              H({
                variables: {
                  routineStep: {
                    id: l.routineStep.id,
                    config: {
                      defaultChannels: S
                    }
                  },
                  template: {
                    slug: (c == null ? void 0 : c.slug) ?? `slack-${re}-${l.routineStep.id}`,
                    raw: b.template.content,
                    metadata: b.template.data ?? {}
                  }
                },
                onCompleted: () => {
                  var y;
                  return (y = l.onClose) == null ? void 0 : y.call(l);
                }
              });
            }, A = async (b) => {
              R(!!(b != null && b.forceRefresh));
              const S = await e.operations.query({
                operationName: "getChannels",
                input: b
              });
              $((y) => (S == null ? void 0 : S.data) ?? y), R(!1);
            };
            return e.hooks.useAsyncEffect(async () => {
              await A();
            }, []), /* @__PURE__ */ t.createElement("form", { onSubmit: _(j), className: "flex flex-col gap-4", __self: void 0, __source: {
              fileName: n,
              lineNumber: 553,
              columnNumber: 17
            } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-1", __self: void 0, __source: {
              fileName: n,
              lineNumber: 554,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-900 text-base font-medium", __self: void 0, __source: {
              fileName: n,
              lineNumber: 555,
              columnNumber: 21
            } }, "Template"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
              fileName: n,
              lineNumber: 556,
              columnNumber: 21
            } }, "Write the template message for the routine in HTML. You can preview it before saving.", /* @__PURE__ */ t.createElement("br", { __self: void 0, __source: {
              fileName: n,
              lineNumber: 559,
              columnNumber: 23
            } }), "Don't worry, you can edit the message each time you do the routine."), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "template", control: s, render: ({
              field: b
            }) => /* @__PURE__ */ t.createElement(r.TemplateEditor, { initialTemplate: b.value, onChange: b.onChange, __self: void 0, __source: {
              fileName: n,
              lineNumber: 566,
              columnNumber: 25
            } }), __self: void 0, __source: {
              fileName: n,
              lineNumber: 562,
              columnNumber: 21
            } })), /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-1", __self: void 0, __source: {
              fileName: n,
              lineNumber: 573,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-900 text-base font-medium", __self: void 0, __source: {
              fileName: n,
              lineNumber: 574,
              columnNumber: 21
            } }, "Default channels"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
              fileName: n,
              lineNumber: 577,
              columnNumber: 21
            } }, "Which channels should be selected by default when posting to Slack?"), /* @__PURE__ */ t.createElement(G, { control: s, channelsData: L, onRefresh: () => A({
              forceRefresh: !0
            }), refreshing: v, __self: void 0, __source: {
              fileName: n,
              lineNumber: 580,
              columnNumber: 21
            } })), /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2 self-end", __self: void 0, __source: {
              fileName: n,
              lineNumber: 587,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement(r.Button, { type: "button", secondary: !0, onClick: l.onCancel, __self: void 0, __source: {
              fileName: n,
              lineNumber: 588,
              columnNumber: 21
            } }, "Cancel"), /* @__PURE__ */ t.createElement(r.Button, { type: "submit", loading: z, __self: void 0, __source: {
              fileName: n,
              lineNumber: 591,
              columnNumber: 21
            } }, "Save")));
          }
        })
      }
    }
  };
});
export {
  ze as default
};
