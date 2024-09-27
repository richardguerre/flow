const ae = /* @__PURE__ */ function() {
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
ae.hash = "b71dfd7eaaba64f4182f87b2c5257a96";
const ge = (e) => ({ plugin: e }), ee = "post-to-slack", ve = (e) => {
  const t = "";
  return `Plan for today
<ul>
  {{#tasks}}
    <li>{{slack-status}} {{title}}${t}</li>
  {{else}}
    <li>No tasks</li> 
  {{/tasks}}
  {{! Do not remove the extra curly braces around the slack-future-tasks block.}}
  {{{{slack-future-tasks}}}}
    <li>{{slack-status}} {{title}}${t}</li>
  {{{{/slack-future-tasks}}}}
</ul>`;
};
function he(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var oe = { exports: {} }, u = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var H = Symbol.for("react.element"), ye = Symbol.for("react.portal"), Ee = Symbol.for("react.fragment"), ke = Symbol.for("react.strict_mode"), Ce = Symbol.for("react.profiler"), Se = Symbol.for("react.provider"), xe = Symbol.for("react.context"), we = Symbol.for("react.forward_ref"), Me = Symbol.for("react.suspense"), Te = Symbol.for("react.memo"), Re = Symbol.for("react.lazy"), te = Symbol.iterator;
function Le(e) {
  return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ue = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, se = Object.assign, ie = {};
function M(e, t, r) {
  this.props = e, this.context = t, this.refs = ie, this.updater = r || ue;
}
M.prototype.isReactComponent = {};
M.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
M.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ce() {
}
ce.prototype = M.prototype;
function U(e, t, r) {
  this.props = e, this.context = t, this.refs = ie, this.updater = r || ue;
}
var z = U.prototype = new ce();
z.constructor = U;
se(z, M.prototype);
z.isPureReactComponent = !0;
var ne = Array.isArray, me = Object.prototype.hasOwnProperty, K = { current: null }, fe = { key: !0, ref: !0, __self: !0, __source: !0 };
function de(e, t, r) {
  var a, o = {}, m = null, d = null;
  if (t != null)
    for (a in t.ref !== void 0 && (d = t.ref), t.key !== void 0 && (m = "" + t.key), t)
      me.call(t, a) && !fe.hasOwnProperty(a) && (o[a] = t[a]);
  var f = arguments.length - 2;
  if (f === 1)
    o.children = r;
  else if (1 < f) {
    for (var i = Array(f), v = 0; v < f; v++)
      i[v] = arguments[v + 2];
    o.children = i;
  }
  if (e && e.defaultProps)
    for (a in f = e.defaultProps, f)
      o[a] === void 0 && (o[a] = f[a]);
  return { $$typeof: H, type: e, key: m, ref: d, props: o, _owner: K.current };
}
function He(e, t) {
  return { $$typeof: H, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Y(e) {
  return typeof e == "object" && e !== null && e.$$typeof === H;
}
function Oe(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(r) {
    return t[r];
  });
}
var re = /\/+/g;
function B(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Oe("" + e.key) : t.toString(36);
}
function F(e, t, r, a, o) {
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
          case H:
          case ye:
            d = !0;
        }
    }
  if (d)
    return d = e, o = o(d), e = a === "" ? "." + B(d, 0) : a, ne(o) ? (r = "", e != null && (r = e.replace(re, "$&/") + "/"), F(o, t, r, "", function(v) {
      return v;
    })) : o != null && (Y(o) && (o = He(o, r + (!o.key || d && d.key === o.key ? "" : ("" + o.key).replace(re, "$&/") + "/") + e)), t.push(o)), 1;
  if (d = 0, a = a === "" ? "." : a + ":", ne(e))
    for (var f = 0; f < e.length; f++) {
      m = e[f];
      var i = a + B(m, f);
      d += F(m, t, r, i, o);
    }
  else if (i = Le(e), typeof i == "function")
    for (e = i.call(e), f = 0; !(m = e.next()).done; )
      m = m.value, i = a + B(m, f++), d += F(m, t, r, i, o);
  else if (m === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return d;
}
function j(e, t, r) {
  if (e == null)
    return e;
  var a = [], o = 0;
  return F(e, a, "", "", function(m) {
    return t.call(r, m, o++);
  }), a;
}
function Ie(e) {
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
var b = { current: null }, A = { transition: null }, $e = { ReactCurrentDispatcher: b, ReactCurrentBatchConfig: A, ReactCurrentOwner: K };
function _e() {
  throw Error("act(...) is not supported in production builds of React.");
}
u.Children = { map: j, forEach: function(e, t, r) {
  j(e, function() {
    t.apply(this, arguments);
  }, r);
}, count: function(e) {
  var t = 0;
  return j(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return j(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Y(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
u.Component = M;
u.Fragment = Ee;
u.Profiler = Ce;
u.PureComponent = U;
u.StrictMode = ke;
u.Suspense = Me;
u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $e;
u.act = _e;
u.cloneElement = function(e, t, r) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var a = se({}, e.props), o = e.key, m = e.ref, d = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (m = t.ref, d = K.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps)
      var f = e.type.defaultProps;
    for (i in t)
      me.call(t, i) && !fe.hasOwnProperty(i) && (a[i] = t[i] === void 0 && f !== void 0 ? f[i] : t[i]);
  }
  var i = arguments.length - 2;
  if (i === 1)
    a.children = r;
  else if (1 < i) {
    f = Array(i);
    for (var v = 0; v < i; v++)
      f[v] = arguments[v + 2];
    a.children = f;
  }
  return { $$typeof: H, type: e.type, key: o, ref: m, props: a, _owner: d };
};
u.createContext = function(e) {
  return e = { $$typeof: xe, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Se, _context: e }, e.Consumer = e;
};
u.createElement = de;
u.createFactory = function(e) {
  var t = de.bind(null, e);
  return t.type = e, t;
};
u.createRef = function() {
  return { current: null };
};
u.forwardRef = function(e) {
  return { $$typeof: we, render: e };
};
u.isValidElement = Y;
u.lazy = function(e) {
  return { $$typeof: Re, _payload: { _status: -1, _result: e }, _init: Ie };
};
u.memo = function(e, t) {
  return { $$typeof: Te, type: e, compare: t === void 0 ? null : t };
};
u.startTransition = function(e) {
  var t = A.transition;
  A.transition = {};
  try {
    e();
  } finally {
    A.transition = t;
  }
};
u.unstable_act = _e;
u.useCallback = function(e, t) {
  return b.current.useCallback(e, t);
};
u.useContext = function(e) {
  return b.current.useContext(e);
};
u.useDebugValue = function() {
};
u.useDeferredValue = function(e) {
  return b.current.useDeferredValue(e);
};
u.useEffect = function(e, t) {
  return b.current.useEffect(e, t);
};
u.useId = function() {
  return b.current.useId();
};
u.useImperativeHandle = function(e, t, r) {
  return b.current.useImperativeHandle(e, t, r);
};
u.useInsertionEffect = function(e, t) {
  return b.current.useInsertionEffect(e, t);
};
u.useLayoutEffect = function(e, t) {
  return b.current.useLayoutEffect(e, t);
};
u.useMemo = function(e, t) {
  return b.current.useMemo(e, t);
};
u.useReducer = function(e, t, r) {
  return b.current.useReducer(e, t, r);
};
u.useRef = function(e) {
  return b.current.useRef(e);
};
u.useState = function(e) {
  return b.current.useState(e);
};
u.useSyncExternalStore = function(e, t, r) {
  return b.current.useSyncExternalStore(e, t, r);
};
u.useTransition = function() {
  return b.current.useTransition();
};
u.version = "18.3.1";
oe.exports = u;
var Pe = oe.exports;
const x = /* @__PURE__ */ he(Pe);
var Ne = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, le = x.createContext && x.createContext(Ne), k = function() {
  return k = Object.assign || function(e) {
    for (var t, r = 1, a = arguments.length; r < a; r++) {
      t = arguments[r];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, k.apply(this, arguments);
}, Ve = function(e, t) {
  var r = {};
  for (var a in e)
    Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (r[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
      t.indexOf(a[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[o]) && (r[a[o]] = e[a[o]]);
  return r;
};
function be(e) {
  return e && e.map(function(t, r) {
    return x.createElement(t.tag, k({
      key: r
    }, t.attr), be(t.child));
  });
}
function pe(e) {
  return function(t) {
    return x.createElement(je, k({
      attr: k({}, e.attr)
    }, t), be(e.child));
  };
}
function je(e) {
  var t = function(r) {
    var a = e.attr, o = e.size, m = e.title, d = Ve(e, ["attr", "size", "title"]), f = o || r.size || "1em", i;
    return r.className && (i = r.className), e.className && (i = (i ? i + " " : "") + e.className), x.createElement("svg", k({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, a, d, {
      className: i,
      style: k(k({
        color: e.color || r.color
      }, r.style), e.style),
      height: f,
      width: f,
      xmlns: "http://www.w3.org/2000/svg"
    }), m && x.createElement("title", null, m), e.children);
  };
  return le !== void 0 ? x.createElement(le.Consumer, null, function(r) {
    return t(r);
  }) : t(Ne);
}
function Fe(e) {
  return pe({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" } }] })(e);
}
function Ae(e) {
  return pe({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" } }] })(e);
}
var n = "/Users/richardguerre/Projects/flow/plugins/slack/src/web.tsx";
const De = ge((e) => {
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
  } })), v = e.tiptap.Node.create({
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
  }), q = (l) => {
    const c = t.useMemo(() => new Map(l.channels.map((s) => [s.id, s])), [l.channels.length]);
    return /* @__PURE__ */ t.createElement(r.FormCombobox, { name: "channels", control: l.control, multiselect: !0, label: l.withLabel ? "Default channels" : void 0, __self: void 0, __source: {
      fileName: n,
      lineNumber: 229,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(r.ComboboxTrigger, { className: "flex items-center gap-2 self-start px-3 py-1.5 rounded-md bg-background-50 ring-primary-200 text-foreground-900 hover:ring-primary-300 disabled:bg-background-300/50 focus:ring-primary-500 focus:outline-none ring-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 235,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(r.ComboboxValue, { placeholder: "Select channels...", renderValues: (s) => l.channels.filter((_) => s.includes(_.id)).map((_) => `#${_.name}`).join(", "), __self: void 0, __source: {
      fileName: n,
      lineNumber: 236,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(Ae, { size: 14, className: "text-foreground-700", __self: void 0, __source: {
      fileName: n,
      lineNumber: 245,
      columnNumber: 11
    } })), /* @__PURE__ */ t.createElement(r.ComboboxContent, { align: "start", side: "bottom", className: "max-h-96 overflow-y-auto", commandProps: {
      filter: (s, _) => {
        var y;
        return (y = c.get(s)) != null && y.name.includes(_) ? 1 : 0;
      }
    }, __self: void 0, __source: {
      fileName: n,
      lineNumber: 247,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement(r.ComboboxInput, { placeholder: "Search channels...", __self: void 0, __source: {
      fileName: n,
      lineNumber: 258,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(r.ComboboxEmpty, { __self: void 0, __source: {
      fileName: n,
      lineNumber: 259,
      columnNumber: 11
    } }, "No channel found."), /* @__PURE__ */ t.createElement(r.ComboboxGroup, { __self: void 0, __source: {
      fileName: n,
      lineNumber: 260,
      columnNumber: 11
    } }, l.channels.map((s) => /* @__PURE__ */ t.createElement(r.ComboboxItem, { key: s.id, value: s.id, className: "flex items-center justify-between gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 262,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
      fileName: n,
      lineNumber: 267,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement("img", { src: s.team.icon, className: "h-5 w-5 shrink-0 rounded", __self: void 0, __source: {
      fileName: n,
      lineNumber: 268,
      columnNumber: 19
    } }), /* @__PURE__ */ t.createElement("span", { className: "max-w-48 truncate", __self: void 0, __source: {
      fileName: n,
      lineNumber: 269,
      columnNumber: 19
    } }, "#", s.name)), /* @__PURE__ */ t.createElement(r.ComboboxSelected, { className: "ml-2 h-4 w-4 opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
      fileName: n,
      lineNumber: 271,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement(Fe, { size: 20, __self: void 0, __source: {
      fileName: n,
      lineNumber: 275,
      columnNumber: 19
    } })))))));
  };
  return {
    name: "Slack",
    noteEditorTipTapExtensions: [o, v, d],
    settings: {
      "connect-accounts": {
        type: "custom",
        render: () => /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: n,
          lineNumber: 293,
          columnNumber: 13
        } }, /* @__PURE__ */ t.createElement("a", { href: `${e.serverOrigin}/api/plugin/${e.pluginSlug}/auth`, __self: void 0, __source: {
          fileName: n,
          lineNumber: 294,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(r.Button, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 295,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ t.createElement(r.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var c, s, _;
          return ((_ = (s = (c = l.cause) == null ? void 0 : c[0]) == null ? void 0 : s.extensions) == null ? void 0 : _.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ t.createElement(t.Fragment, null) : /* @__PURE__ */ t.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: n,
            lineNumber: 302,
            columnNumber: 26
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: n,
          lineNumber: 297,
          columnNumber: 15
        } }, /* @__PURE__ */ t.createElement(t.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: n,
          lineNumber: 305,
          columnNumber: 17
        } }, /* @__PURE__ */ t.createElement(a, { __self: void 0, __source: {
          fileName: n,
          lineNumber: 306,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      [ee]: {
        name: "Post in Slack",
        description: "Post a message in Slack channels.",
        component: (l) => {
          var W;
          const c = l.templates[0], s = t.useRef(null), _ = e.dayjs(), [y, O] = t.useState(!1), [T, D] = t.useState(((W = l.stepConfig) == null ? void 0 : W.defaultChannels) ?? []), {
            control: I,
            handleSubmit: $,
            formState: R,
            setError: E,
            setValue: P
          } = e.reactHookForm.useForm({
            defaultValues: {
              message: (c == null ? void 0 : c.rendered) ?? "",
              channels: T.map((g) => g.id)
            }
          }), [V, p] = e.operations.useMutation("postMessage", {
            throwOnError: !0
          }), L = async (g) => {
            var G, J, X;
            const C = T.filter((N) => g.channels.includes(N.id));
            if (!C.length) {
              E("root", {
                message: "Please select at least one channel."
              });
              return;
            }
            const S = await V({
              message: g.message,
              channels: C.map((N) => ({
                teamId: N.team.id,
                channelId: N.id
              }))
            }).catch((N) => {
              var Q;
              "extensions" in N && ((Q = N == null ? void 0 : N.extensions) != null && Q.userFriendlyMessage) ? E("root", {
                message: N.extensions.userFriendlyMessage
              }) : "message" in N ? E("root", {
                message: N.message
              }) : E("root", {
                message: "Couldn't post message to Slack channels. Please try again."
              });
            });
            if (!((G = S == null ? void 0 : S.data) != null && G.ok)) {
              E("root", {
                message: "Couldn't post message to Slack channels."
              });
              return;
            }
            let Z = ((J = s.current) == null ? void 0 : J.state.doc.content.size) ?? 0;
            const w = (X = s.current) == null ? void 0 : X.chain();
            for (const N of S.data.messages)
              w == null || w.insertContentAt(Z, {
                type: "slack-message",
                attrs: {
                  teamId: N.teamId,
                  channelId: N.channelId,
                  ts: N.ts
                }
              }), Z++;
            w == null || w.run(), O(!0);
          }, h = () => {
            y && (O(!1), l.onNext());
          };
          return e.hooks.useAsyncEffect(async () => {
            const g = await e.operations.query({
              operationName: "getChannels"
            });
            D((C) => {
              var S;
              return ((S = g == null ? void 0 : g.data) == null ? void 0 : S.channels) ?? C;
            });
          }, []), t.useEffect(() => {
            if (s.current) {
              const g = s.current.getHTML();
              P("message", g);
            }
          }, [s.current]), /* @__PURE__ */ t.createElement("div", { className: "bg-background-100 w-full", __self: void 0, __source: {
            fileName: n,
            lineNumber: 406,
            columnNumber: 13
          } }, /* @__PURE__ */ t.createElement("form", { onSubmit: $(L), className: "flex flex-col gap-4 mx-auto max-w-2xl pt-48 min-h-screen", __self: void 0, __source: {
            fileName: n,
            lineNumber: 407,
            columnNumber: 15
          } }, /* @__PURE__ */ t.createElement("div", { className: "font-semibold text-4xl", __self: void 0, __source: {
            fileName: n,
            lineNumber: 411,
            columnNumber: 17
          } }, "Post to Slack"), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "message", control: I, render: ({
            field: g
          }) => /* @__PURE__ */ t.createElement(r.NoteEditor, { editorRef: s, slug: `slack_post-to-slack-${_.format("YYYY-MM-DD")}`, title: `Post to Slack for ${_.format("MMMM D, YYYY")}`, initialValue: g.value, onChange: ({
            html: C
          }) => {
            console.log(C), g.onChange(C);
          }, onBlur: g.onBlur, saveNow: y, onSaveEnd: h, className: "min-h-[40vh]", __self: void 0, __source: {
            fileName: n,
            lineNumber: 416,
            columnNumber: 21
          } }), __self: void 0, __source: {
            fileName: n,
            lineNumber: 412,
            columnNumber: 17
          } }), R.errors.root && /* @__PURE__ */ t.createElement("div", { className: "text-negative-600 text-sm", __self: void 0, __source: {
            fileName: n,
            lineNumber: 433,
            columnNumber: 19
          } }, R.errors.root.message), /* @__PURE__ */ t.createElement("div", { className: "flex justify-between items-center", __self: void 0, __source: {
            fileName: n,
            lineNumber: 435,
            columnNumber: 17
          } }, /* @__PURE__ */ t.createElement(q, { control: I, channels: T, __self: void 0, __source: {
            fileName: n,
            lineNumber: 436,
            columnNumber: 19
          } }), /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
            fileName: n,
            lineNumber: 437,
            columnNumber: 19
          } }, /* @__PURE__ */ t.createElement(l.BackButton, { type: "button", __self: void 0, __source: {
            fileName: n,
            lineNumber: 438,
            columnNumber: 21
          } }), /* @__PURE__ */ t.createElement(l.NextButton, { type: "submit", loading: p, onClick: () => {
          }, __self: void 0, __source: {
            fileName: n,
            lineNumber: 439,
            columnNumber: 21
          } })))));
        },
        renderSettings: async (l) => ({
          component: () => {
            var $, R, E, P, V;
            const c = l.routineStep.templates[0], {
              control: s,
              handleSubmit: _
            } = e.reactHookForm.useForm({
              defaultValues: {
                template: {
                  content: (c == null ? void 0 : c.raw) ?? ve(),
                  data: (c == null ? void 0 : c.metadata) ?? {}
                },
                channels: ((E = (R = ($ = l.routineStep) == null ? void 0 : $.config) == null ? void 0 : R.defaultChannels) == null ? void 0 : E.map((p) => p.id)) ?? []
              }
            }), [y, O] = t.useState(((V = (P = l.routineStep) == null ? void 0 : P.config) == null ? void 0 : V.defaultChannels) ?? []), [T, D] = e.relay.useMutation(ae), I = async (p) => {
              const L = y.filter((h) => p.channels.includes(h.id));
              T({
                variables: {
                  routineStep: {
                    id: l.routineStep.id,
                    config: {
                      defaultChannels: L
                    }
                  },
                  template: {
                    slug: (c == null ? void 0 : c.slug) ?? `slack-${ee}-${l.routineStep.id}`,
                    raw: p.template.content,
                    metadata: p.template.data ?? {}
                  }
                },
                onCompleted: () => {
                  var h;
                  return (h = l.onClose) == null ? void 0 : h.call(l);
                }
              });
            };
            return e.hooks.useAsyncEffect(async () => {
              const p = await e.operations.query({
                operationName: "getChannels"
              });
              O((L) => {
                var h;
                return ((h = p == null ? void 0 : p.data) == null ? void 0 : h.channels) ?? L;
              });
            }, []), /* @__PURE__ */ t.createElement("form", { onSubmit: _(I), className: "flex flex-col gap-4", __self: void 0, __source: {
              fileName: n,
              lineNumber: 521,
              columnNumber: 17
            } }, /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-1", __self: void 0, __source: {
              fileName: n,
              lineNumber: 522,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-900 text-base font-medium", __self: void 0, __source: {
              fileName: n,
              lineNumber: 523,
              columnNumber: 21
            } }, "Template"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
              fileName: n,
              lineNumber: 524,
              columnNumber: 21
            } }, "Write the template message for the routine in HTML. You can preview it before saving.", /* @__PURE__ */ t.createElement("br", { __self: void 0, __source: {
              fileName: n,
              lineNumber: 527,
              columnNumber: 23
            } }), "Don't worry, you can edit the message each time you do the routine."), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "template", control: s, render: ({
              field: p
            }) => /* @__PURE__ */ t.createElement(r.TemplateEditor, { initialTemplate: p.value, onChange: p.onChange, __self: void 0, __source: {
              fileName: n,
              lineNumber: 534,
              columnNumber: 25
            } }), __self: void 0, __source: {
              fileName: n,
              lineNumber: 530,
              columnNumber: 21
            } })), /* @__PURE__ */ t.createElement("div", { className: "flex flex-col gap-1", __self: void 0, __source: {
              fileName: n,
              lineNumber: 541,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement("div", { className: "text-foreground-900 text-base font-medium", __self: void 0, __source: {
              fileName: n,
              lineNumber: 542,
              columnNumber: 21
            } }, "Default channels"), /* @__PURE__ */ t.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
              fileName: n,
              lineNumber: 545,
              columnNumber: 21
            } }, "Which channels should be selected by default when posting to Slack?"), /* @__PURE__ */ t.createElement(q, { control: s, channels: y, __self: void 0, __source: {
              fileName: n,
              lineNumber: 548,
              columnNumber: 21
            } })), /* @__PURE__ */ t.createElement("div", { className: "flex items-center gap-2 self-end", __self: void 0, __source: {
              fileName: n,
              lineNumber: 550,
              columnNumber: 19
            } }, /* @__PURE__ */ t.createElement(r.Button, { type: "button", secondary: !0, onClick: l.onCancel, __self: void 0, __source: {
              fileName: n,
              lineNumber: 551,
              columnNumber: 21
            } }, "Cancel"), /* @__PURE__ */ t.createElement(r.Button, { type: "submit", loading: D, __self: void 0, __source: {
              fileName: n,
              lineNumber: 554,
              columnNumber: 21
            } }, "Save")));
          }
        })
      }
    }
  };
});
export {
  De as default
};
