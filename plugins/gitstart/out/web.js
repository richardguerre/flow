const S = (u) => ({ plugin: u }), k = "gitstart-session-token";
var l = "/Users/richardguerre/Projects/flow/plugins/gitstart/src/web.tsx";
const D = S((u) => {
  const t = u.components, e = u.React, f = /* @__PURE__ */ e.createElement("svg", { width: "24", height: "24", viewBox: "0 0 82 81", fill: "none", xmlns: "http://www.w3.org/2000/svg", __self: void 0, __source: {
    fileName: l,
    lineNumber: 19,
    columnNumber: 5
  } }, /* @__PURE__ */ e.createElement("ellipse", { cx: "41", cy: "40.5", rx: "41", ry: "40.5", fill: "#FCEED4", __self: void 0, __source: {
    fileName: l,
    lineNumber: 20,
    columnNumber: 7
  } }), /* @__PURE__ */ e.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M37.9809 58.0204C47.0248 58.0204 54.3563 50.6889 54.3563 41.645C54.3563 32.6011 47.0248 25.2696 37.9809 25.2696C28.9371 25.2696 21.6056 32.6011 21.6056 41.645C21.6056 50.6889 28.9371 58.0204 37.9809 58.0204ZM37.9809 61.6884C49.0506 61.6884 58.0244 52.7147 58.0244 41.645C58.0244 30.5753 49.0506 21.6016 37.9809 21.6016C26.9113 21.6016 17.9375 30.5753 17.9375 41.645C17.9375 52.7147 26.9113 61.6884 37.9809 61.6884Z", fill: "black", __self: void 0, __source: {
    fileName: l,
    lineNumber: 21,
    columnNumber: 7
  } }), /* @__PURE__ */ e.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M61.7881 28.5227C62.9758 28.5227 63.9386 27.5599 63.9386 26.3722C63.9386 25.1845 62.9758 24.2216 61.7881 24.2216C60.6003 24.2216 59.6375 25.1845 59.6375 26.3722C59.6375 27.5599 60.6003 28.5227 61.7881 28.5227ZM61.7881 31.1428C64.4228 31.1428 66.5587 29.0069 66.5587 26.3722C66.5587 23.7374 64.4228 21.6016 61.7881 21.6016C59.1533 21.6016 57.0175 23.7374 57.0175 26.3722C57.0175 29.0069 59.1533 31.1428 61.7881 31.1428Z", fill: "black", __self: void 0, __source: {
    fileName: l,
    lineNumber: 27,
    columnNumber: 7
  } })), g = /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", width: "16", height: "16", stroke: "currentColor", "stroke-width": "2", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", __self: void 0, __source: {
    fileName: l,
    lineNumber: 37,
    columnNumber: 5
  } }, /* @__PURE__ */ e.createElement("path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22", __self: void 0, __source: {
    fileName: l,
    lineNumber: 47,
    columnNumber: 7
  } })), p = (a) => /* @__PURE__ */ e.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: a.size ?? "16", height: a.size ?? "16", fill: "currentColor", className: a.className, viewBox: "0 0 16 16", __self: void 0, __source: {
    fileName: l,
    lineNumber: 52,
    columnNumber: 5
  } }, /* @__PURE__ */ e.createElement("path", { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z", __self: void 0, __source: {
    fileName: l,
    lineNumber: 60,
    columnNumber: 7
  } }));
  return {
    name: "GitStart",
    settings: {
      [k]: {
        type: "textfield",
        label: "Token",
        description: "You can find this in your localStorage when logged in to GitStart under the key `user_token`.",
        placeholder: "Paste your GitStart token here",
        isSecret: !0
        // once set, it cannot be seen again, but each time the setting is saved again it will be overwritten
      }
    },
    onCreateTask: async ({
      task: a
    }) => {
      var n;
      return (n = a == null ? void 0 : a.item) != null && n.pluginDatas.some((r) => r.pluginSlug === "gitstart") ? {
        dialogContent: ({
          NextButton: r,
          BackButton: m,
          ...i
        }) => {
          const {
            register: N,
            handleSubmit: v,
            formState: c,
            watch: x,
            control: E
          } = u.reactHookForm.useForm(), _ = x(), C = (s) => {
            i.onNext({
              taskOverrides: {
                title: s.title
              },
              actionData: {
                type: s.type,
                status: s.status
              }
            });
          }, y = u.dayjs().isSame(a.date.value, "day"), h = u.dayjs().isAfter(a.date.value, "day");
          return /* @__PURE__ */ e.createElement("form", { onSubmit: v(C), className: "mt-4 flex flex-col gap-4", __self: void 0, __source: {
            fileName: l,
            lineNumber: 103,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement("input", { defaultValue: a.title.value, className: "ring-none placeholder:text-foreground-700 text-foreground-900 bg-transparent text-lg focus:outline-none", ...N("title", {
            required: "The task's title is required."
          }), __self: void 0, __source: {
            fileName: l,
            lineNumber: 104,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
            fileName: l,
            lineNumber: 109,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(t.FormCombobox, { name: "type", defaultValue: "CODE", control: E, rules: {
            required: "The task's type is required."
          }, __self: void 0, __source: {
            fileName: l,
            lineNumber: 110,
            columnNumber: 17
          } }, /* @__PURE__ */ e.createElement(t.ComboboxTrigger, { role: "combobox", __self: void 0, __source: {
            fileName: l,
            lineNumber: 118,
            columnNumber: 19
          } }, /* @__PURE__ */ e.createElement(t.ComboboxValue, { renderValue: (s) => {
            const o = b[s];
            return /* @__PURE__ */ e.createElement(t.Badge, { className: o.className, __self: void 0, __source: {
              fileName: l,
              lineNumber: 123,
              columnNumber: 27
            } }, o.label);
          }, __self: void 0, __source: {
            fileName: l,
            lineNumber: 119,
            columnNumber: 21
          } })), /* @__PURE__ */ e.createElement(t.ComboboxContent, { className: "w-50 p-0", align: "start", __self: void 0, __source: {
            fileName: l,
            lineNumber: 128,
            columnNumber: 19
          } }, /* @__PURE__ */ e.createElement(t.ComboboxInput, { placeholder: "Search type...", __self: void 0, __source: {
            fileName: l,
            lineNumber: 129,
            columnNumber: 21
          } }), /* @__PURE__ */ e.createElement(t.ComboboxEmpty, { __self: void 0, __source: {
            fileName: l,
            lineNumber: 130,
            columnNumber: 21
          } }, "No type found."), /* @__PURE__ */ e.createElement(t.ComboboxGroup, { __self: void 0, __source: {
            fileName: l,
            lineNumber: 131,
            columnNumber: 21
          } }, Object.entries(b).map(([s, o]) => /* @__PURE__ */ e.createElement(t.ComboboxItem, { key: s, value: s, className: "flex items-center gap-2", __self: void 0, __source: {
            fileName: l,
            lineNumber: 133,
            columnNumber: 25
          } }, /* @__PURE__ */ e.createElement(t.ComboboxSelected, { className: "opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
            fileName: l,
            lineNumber: 138,
            columnNumber: 27
          } }, /* @__PURE__ */ e.createElement(p, { className: "text-foreground-900 h-6", __self: void 0, __source: {
            fileName: l,
            lineNumber: 142,
            columnNumber: 29
          } })), /* @__PURE__ */ e.createElement(t.Badge, { className: o.className, __self: void 0, __source: {
            fileName: l,
            lineNumber: 144,
            columnNumber: 27
          } }, o.label)))))), /* @__PURE__ */ e.createElement(
            t.FormCombobox,
            {
              name: "status",
              defaultValue: y || h ? "IN_PROGRESS" : "TO_DO",
              control: E,
              rules: {
                required: "The task's status is required."
              },
              __self: void 0,
              __source: {
                fileName: l,
                lineNumber: 150,
                columnNumber: 17
              }
            },
            /* @__PURE__ */ e.createElement(t.ComboboxTrigger, { __self: void 0, __source: {
              fileName: l,
              lineNumber: 158,
              columnNumber: 19
            } }, /* @__PURE__ */ e.createElement(t.ComboboxValue, { renderValue: (s) => {
              const o = d[s];
              return /* @__PURE__ */ e.createElement(t.Badge, { className: o.className, __self: void 0, __source: {
                fileName: l,
                lineNumber: 163,
                columnNumber: 27
              } }, o.label);
            }, __self: void 0, __source: {
              fileName: l,
              lineNumber: 159,
              columnNumber: 21
            } })),
            /* @__PURE__ */ e.createElement(t.ComboboxContent, { className: "w-50 p-0", align: "start", __self: void 0, __source: {
              fileName: l,
              lineNumber: 170,
              columnNumber: 19
            } }, /* @__PURE__ */ e.createElement(t.ComboboxInput, { placeholder: "Search status...", __self: void 0, __source: {
              fileName: l,
              lineNumber: 171,
              columnNumber: 21
            } }), /* @__PURE__ */ e.createElement(t.ComboboxEmpty, { __self: void 0, __source: {
              fileName: l,
              lineNumber: 172,
              columnNumber: 21
            } }, "No status found."), /* @__PURE__ */ e.createElement(t.ComboboxGroup, { __self: void 0, __source: {
              fileName: l,
              lineNumber: 173,
              columnNumber: 21
            } }, Object.entries(d).map(([s, o]) => /* @__PURE__ */ e.createElement(t.ComboboxItem, { key: s, value: s, className: "flex items-center gap-2", __self: void 0, __source: {
              fileName: l,
              lineNumber: 175,
              columnNumber: 25
            } }, /* @__PURE__ */ e.createElement(t.ComboboxSelected, { className: "opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
              fileName: l,
              lineNumber: 180,
              columnNumber: 27
            } }, /* @__PURE__ */ e.createElement(p, { className: "text-foreground-900 h-6", __self: void 0, __source: {
              fileName: l,
              lineNumber: 184,
              columnNumber: 29
            } })), /* @__PURE__ */ e.createElement(t.Badge, { className: o.className, __self: void 0, __source: {
              fileName: l,
              lineNumber: 186,
              columnNumber: 27
            } }, o.label)))))
          )), c.errors.title && /* @__PURE__ */ e.createElement("div", { className: "text-negative-600 text-sm", __self: void 0, __source: {
            fileName: l,
            lineNumber: 196,
            columnNumber: 17
          } }, c.errors.title.message), c.errors.type && /* @__PURE__ */ e.createElement("div", { className: "text-negative-600 text-sm", __self: void 0, __source: {
            fileName: l,
            lineNumber: 199,
            columnNumber: 17
          } }, c.errors.type.message), c.errors.status && /* @__PURE__ */ e.createElement("div", { className: "text-negative-600 text-sm", __self: void 0, __source: {
            fileName: l,
            lineNumber: 202,
            columnNumber: 17
          } }, c.errors.status.message), /* @__PURE__ */ e.createElement("div", { className: "flex gap-2 self-end", __self: void 0, __source: {
            fileName: l,
            lineNumber: 204,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(m, { type: "button", onClick: () => i.onBack({
            taskOverrides: {
              title: _.title
            },
            actionData: {
              type: _.type,
              status: _.status
            }
          }), __self: void 0, __source: {
            fileName: l,
            lineNumber: 205,
            columnNumber: 17
          } }), /* @__PURE__ */ e.createElement(r, { type: "submit", __self: void 0, __source: {
            fileName: l,
            lineNumber: 214,
            columnNumber: 17
          } })));
        }
      } : null;
    },
    renderTaskCardDetails: async ({
      task: a
    }) => {
      const n = a.pluginDatas.find((N) => N.pluginSlug === "gitstart");
      if (!n)
        return null;
      const r = n.min, m = b[r.type], i = d[r.status];
      return [{
        component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: m.className, __self: void 0, __source: {
          fileName: l,
          lineNumber: 231,
          columnNumber: 28
        } }, m.label)
      }, {
        component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: i.className, __self: void 0, __source: {
          fileName: l,
          lineNumber: 235,
          columnNumber: 13
        } }, i.label)
      }];
    },
    renderTaskCardActions: async ({
      task: a
    }) => {
      const n = a.pluginDatas.find((m) => m.pluginSlug === "gitstart");
      if (!n)
        return null;
      const r = n.min;
      return [{
        component: () => r.githubPrUrl ? /* @__PURE__ */ e.createElement("a", { href: r.githubPrUrl, target: "_blank", rel: "noreferrer", __self: void 0, __source: {
          fileName: l,
          lineNumber: 250,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(t.CardActionButton, { __self: void 0, __source: {
          fileName: l,
          lineNumber: 251,
          columnNumber: 17
        } }, g)) : null
      }, {
        component: () => /* @__PURE__ */ e.createElement("a", { href: r.ticketUrl, target: "_blank", rel: "noreferrer", __self: void 0, __source: {
          fileName: l,
          lineNumber: 257,
          columnNumber: 13
        } }, f)
      }];
    },
    renderItemCardDetails: async ({
      item: a
    }) => {
      const n = a.pluginDatas.find((m) => m.pluginSlug === "gitstart");
      if (!n)
        return null;
      const r = n.min;
      if (r.type === "pull_request") {
        const m = w[r.status];
        return [{
          component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: "bg-green-100 text-green-700", __self: void 0, __source: {
            fileName: l,
            lineNumber: 274,
            columnNumber: 30
          } }, "PR")
        }, {
          component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: m.className, __self: void 0, __source: {
            fileName: l,
            lineNumber: 278,
            columnNumber: 15
          } }, m.label)
        }];
      } else if (r.type === "ticket") {
        const m = I[r.status];
        return [{
          component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: "bg-gray-200 text-gray-600", __self: void 0, __source: {
            fileName: l,
            lineNumber: 287,
            columnNumber: 15
          } }, "Ticket")
        }, {
          component: () => /* @__PURE__ */ e.createElement(t.Badge, { className: m.className, __self: void 0, __source: {
            fileName: l,
            lineNumber: 292,
            columnNumber: 15
          } }, m.label)
        }];
      }
      return null;
    },
    renderItemCardActions: async ({
      item: a
    }) => {
      const n = a.pluginDatas.find((m) => m.pluginSlug === "gitstart");
      if (!n)
        return null;
      const r = n.min;
      return [{
        component: () => r.type === "pull_request" && r.url ? /* @__PURE__ */ e.createElement("a", { href: r.url, target: "_blank", rel: "noreferrer", __self: void 0, __source: {
          fileName: l,
          lineNumber: 309,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(t.CardActionButton, { __self: void 0, __source: {
          fileName: l,
          lineNumber: 310,
          columnNumber: 17
        } }, g)) : null
      }, {
        component: () => /* @__PURE__ */ e.createElement("a", { href: r.ticketUrl, target: "_blank", rel: "noreferrer", __self: void 0, __source: {
          fileName: l,
          lineNumber: 316,
          columnNumber: 13
        } }, f)
      }];
    }
  };
}), b = {
  SPEC: {
    label: "Spec",
    className: "bg-gray-200 text-gray-600"
  },
  CODE: {
    label: "Code",
    className: "bg-blue-100 text-blue-600"
  },
  REVIEW: {
    label: "Review",
    className: "bg-yellow-100 text-yellow-600"
  },
  QA: {
    label: "QA",
    className: "bg-purple-100 text-purple-600"
  },
  LEARNING: {
    label: "Learning",
    className: "bg-green-100 text-green-700"
  }
}, d = {
  TO_DO: {
    label: "To do",
    className: "bg-gray-200 text-gray-600"
  },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-blue-100 text-blue-600"
  },
  FINISHED: {
    label: "Finished",
    className: "bg-green-100 text-green-700"
  },
  CANCELED: {
    label: "Canceled",
    className: "bg-red-100 text-red-600"
  }
}, w = {
  PLANNED: {
    label: "Planned",
    className: "bg-gray-200 text-gray-600"
  },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-blue-100 text-blue-600"
  },
  INTERNAL_REVIEW: {
    label: "Internal review",
    className: "bg-yellow-100 text-yellow-600"
  },
  CLIENT_REVIEW: {
    label: "Client review",
    className: "bg-purple-100 text-purple-600"
  },
  CANCELED: {
    label: "Canceled",
    className: "bg-red-100 text-red-600"
  },
  APPROVED: {
    label: "Approved",
    className: "bg-green-100 text-green-700"
  },
  MERGED: {
    label: "Merged",
    className: "bg-green-100 text-green-700"
  }
}, I = {
  BACKLOG: {
    label: "Backlog",
    className: "bg-gray-200 text-gray-600"
  },
  AVAILABLE: {
    label: "Available",
    className: "bg-blue-100 text-blue-600"
  },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-yellow-100 text-yellow-600"
  },
  PAUSED: {
    label: "Paused",
    className: "bg-purple-100 text-purple-600"
  },
  FINISHED: {
    label: "Finished",
    className: "bg-green-100 text-green-700"
  },
  CANCELED: {
    label: "Canceled",
    className: "bg-red-100 text-red-600"
  }
};
export {
  D as default
};
