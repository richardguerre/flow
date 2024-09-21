const Na = /* @__PURE__ */ function() {
  var t = [
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
  ], e = {
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
        e,
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
        e,
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
      argumentDefinitions: t,
      kind: "Fragment",
      metadata: null,
      name: "webUpdateRoutineStepMutation",
      selections: n,
      type: "Mutation",
      abstractKey: null
    },
    kind: "Request",
    operation: {
      argumentDefinitions: t,
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
Na.hash = "b71dfd7eaaba64f4182f87b2c5257a96";
const gd = (t) => ({ plugin: t });
function Ca(t, e, n) {
  for (let r = 0; ; r++) {
    if (r == t.childCount || r == e.childCount)
      return t.childCount == e.childCount ? null : n;
    let i = t.child(r), o = e.child(r);
    if (i == o) {
      n += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(o))
      return n;
    if (i.isText && i.text != o.text) {
      for (let l = 0; i.text[l] == o.text[l]; l++)
        n++;
      return n;
    }
    if (i.content.size || o.content.size) {
      let l = Ca(i.content, o.content, n + 1);
      if (l != null)
        return l;
    }
    n += i.nodeSize;
  }
}
function _a(t, e, n, r) {
  for (let i = t.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: n, b: r };
    let l = t.child(--i), s = e.child(--o), u = l.nodeSize;
    if (l == s) {
      n -= u, r -= u;
      continue;
    }
    if (!l.sameMarkup(s))
      return { a: n, b: r };
    if (l.isText && l.text != s.text) {
      let a = 0, c = Math.min(l.text.length, s.text.length);
      for (; a < c && l.text[l.text.length - a - 1] == s.text[s.text.length - a - 1]; )
        a++, n--, r--;
      return { a: n, b: r };
    }
    if (l.content.size || s.content.size) {
      let a = _a(l.content, s.content, n - 1, r - 1);
      if (a)
        return a;
    }
    n -= u, r -= u;
  }
}
class P {
  /**
  @internal
  */
  constructor(e, n) {
    if (this.content = e, this.size = n || 0, n == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, n, r, i = 0, o) {
    for (let l = 0, s = 0; s < n; l++) {
      let u = this.content[l], a = s + u.nodeSize;
      if (a > e && r(u, i + s, o || null, l) !== !1 && u.content.size) {
        let c = s + 1;
        u.nodesBetween(Math.max(0, e - c), Math.min(u.content.size, n - c), r, i + c);
      }
      s = a;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, n, r, i) {
    let o = "", l = !0;
    return this.nodesBetween(e, n, (s, u) => {
      let a = s.isText ? s.text.slice(Math.max(e, u) - u, n - u) : s.isLeaf ? i ? typeof i == "function" ? i(s) : i : s.type.spec.leafText ? s.type.spec.leafText(s) : "" : "";
      s.isBlock && (s.isLeaf && a || s.isTextblock) && r && (l ? l = !1 : o += r), o += a;
    }, 0), o;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let n = this.lastChild, r = e.firstChild, i = this.content.slice(), o = 0;
    for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), o = 1); o < e.content.length; o++)
      i.push(e.content[o]);
    return new P(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, n = this.size) {
    if (e == 0 && n == this.size)
      return this;
    let r = [], i = 0;
    if (n > e)
      for (let o = 0, l = 0; l < n; o++) {
        let s = this.content[o], u = l + s.nodeSize;
        u > e && ((l < e || u > n) && (s.isText ? s = s.cut(Math.max(0, e - l), Math.min(s.text.length, n - l)) : s = s.cut(Math.max(0, e - l - 1), Math.min(s.content.size, n - l - 1))), r.push(s), i += s.nodeSize), l = u;
      }
    return new P(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, n) {
    return e == n ? P.empty : e == 0 && n == this.content.length ? this : new P(this.content.slice(e, n));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, n) {
    let r = this.content[e];
    if (r == n)
      return this;
    let i = this.content.slice(), o = this.size + n.nodeSize - r.nodeSize;
    return i[e] = n, new P(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new P([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new P(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let n = 0; n < this.content.length; n++)
      if (!this.content[n].eq(e.content[n]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let n = this.content[e];
    if (!n)
      throw new RangeError("Index " + e + " out of range for " + this);
    return n;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let n = 0, r = 0; n < this.content.length; n++) {
      let i = this.content[n];
      e(i, r, n), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, n = 0) {
    return Ca(this, e, n);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, n = this.size, r = e.size) {
    return _a(this, e, n, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. (Not public.)
  */
  findIndex(e, n = -1) {
    if (e == 0)
      return $r(0, e);
    if (e == this.size)
      return $r(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let o = this.child(r), l = i + o.nodeSize;
      if (l >= e)
        return l == e || n > 0 ? $r(r + 1, l) : $r(r, i);
      i = l;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      return P.empty;
    if (!Array.isArray(n))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new P(n.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return P.empty;
    let n, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (n || (n = e.slice(0, i)), n[n.length - 1] = o.withText(n[n.length - 1].text + o.text)) : n && n.push(o);
    }
    return new P(n || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return P.empty;
    if (e instanceof P)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new P([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
P.empty = new P([], 0);
const yo = { index: 0, offset: 0 };
function $r(t, e) {
  return yo.index = t, yo.offset = e, yo;
}
function qo(t, e) {
  if (t === e)
    return !0;
  if (!(t && typeof t == "object") || !(e && typeof e == "object"))
    return !1;
  let n = Array.isArray(t);
  if (Array.isArray(e) != n)
    return !1;
  if (n) {
    if (t.length != e.length)
      return !1;
    for (let r = 0; r < t.length; r++)
      if (!qo(t[r], e[r]))
        return !1;
  } else {
    for (let r in t)
      if (!(r in e) || !qo(t[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in t))
        return !1;
  }
  return !0;
}
class Ce {
  /**
  @internal
  */
  constructor(e, n) {
    this.type = e, this.attrs = n;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let n, r = !1;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if (this.eq(o))
        return e;
      if (this.type.excludes(o.type))
        n || (n = e.slice(0, i));
      else {
        if (o.type.excludes(this.type))
          return e;
        !r && o.type.rank > this.type.rank && (n || (n = e.slice(0, i)), n.push(this), r = !0), n && n.push(o);
      }
    }
    return n || (n = e.slice()), r || n.push(this), n;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return e.slice(0, n).concat(e.slice(n + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && qo(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[n.type];
    if (!r)
      throw new RangeError(`There is no mark type ${n.type} in this schema`);
    return r.create(n.attrs);
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, n) {
    if (e == n)
      return !0;
    if (e.length != n.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(n[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return Ce.none;
    if (e instanceof Ce)
      return [e];
    let n = e.slice();
    return n.sort((r, i) => r.type.rank - i.type.rank), n;
  }
}
Ce.none = [];
class yd extends Error {
}
class z {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, n, r) {
    this.content = e, this.openStart = n, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, n) {
    let r = Ta(this.content, e + this.openStart, n);
    return r && new z(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new z(Ma(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      return z.empty;
    let r = n.openStart || 0, i = n.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new z(P.fromJSON(e, n.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, n = !0) {
    let r = 0, i = 0;
    for (let o = e.firstChild; o && !o.isLeaf && (n || !o.type.spec.isolating); o = o.firstChild)
      r++;
    for (let o = e.lastChild; o && !o.isLeaf && (n || !o.type.spec.isolating); o = o.lastChild)
      i++;
    return new z(e, r, i);
  }
}
z.empty = new z(P.empty, 0, 0);
function Ma(t, e, n) {
  let { index: r, offset: i } = t.findIndex(e), o = t.maybeChild(r), { index: l, offset: s } = t.findIndex(n);
  if (i == e || o.isText) {
    if (s != n && !t.child(l).isText)
      throw new RangeError("Removing non-flat range");
    return t.cut(0, e).append(t.cut(n));
  }
  if (r != l)
    throw new RangeError("Removing non-flat range");
  return t.replaceChild(r, o.copy(Ma(o.content, e - i - 1, n - i - 1)));
}
function Ta(t, e, n, r) {
  let { index: i, offset: o } = t.findIndex(e), l = t.maybeChild(i);
  if (o == e || l.isText)
    return t.cut(0, e).append(n).append(t.cut(e));
  let s = Ta(l.content, e - o - 1, n);
  return s && t.replaceChild(i, l.copy(s));
}
class bo {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
class wi {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, n) {
    this.schema = e, this.rules = n, this.tags = [], this.styles = [], n.forEach((r) => {
      r.tag ? this.tags.push(r) : r.style && this.styles.push(r);
    }), this.normalizeLists = !this.tags.some((r) => {
      if (!/^(ul|ol)\b/.test(r.tag) || !r.node)
        return !1;
      let i = e.nodes[r.node];
      return i.contentMatch.matchType(i);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, n = {}) {
    let r = new qs(this, n, !1);
    return r.addAll(e, n.from, n.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, n = {}) {
    let r = new qs(this, n, !0);
    return r.addAll(e, n.from, n.to), z.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, n, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (kd(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || n.matchesContext(o.context))) {
        if (o.getAttrs) {
          let l = o.getAttrs(e);
          if (l === !1)
            continue;
          o.attrs = l || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, n, r, i) {
    for (let o = i ? this.styles.indexOf(i) + 1 : 0; o < this.styles.length; o++) {
      let l = this.styles[o], s = l.style;
      if (!(s.indexOf(e) != 0 || l.context && !r.matchesContext(l.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      s.length > e.length && (s.charCodeAt(e.length) != 61 || s.slice(e.length + 1) != n))) {
        if (l.getAttrs) {
          let u = l.getAttrs(n);
          if (u === !1)
            continue;
          l.attrs = u || void 0;
        }
        return l;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let n = [];
    function r(i) {
      let o = i.priority == null ? 50 : i.priority, l = 0;
      for (; l < n.length; l++) {
        let s = n[l];
        if ((s.priority == null ? 50 : s.priority) < o)
          break;
      }
      n.splice(l, 0, i);
    }
    for (let i in e.marks) {
      let o = e.marks[i].spec.parseDOM;
      o && o.forEach((l) => {
        r(l = bs(l)), l.mark || l.ignore || l.clearMark || (l.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((l) => {
        r(l = bs(l)), l.node || l.ignore || l.mark || (l.node = i);
      });
    }
    return n;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new wi(e, wi.schemaRules(e)));
  }
}
const Pa = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, vd = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, za = { ol: !0, ul: !0 }, ki = 1, Si = 2, bn = 4;
function Zs(t, e, n) {
  return e != null ? (e ? ki : 0) | (e === "full" ? Si : 0) : t && t.whitespace == "pre" ? ki | Si : n & ~bn;
}
class jr {
  constructor(e, n, r, i, o, l, s) {
    this.type = e, this.attrs = n, this.marks = r, this.pendingMarks = i, this.solid = o, this.options = s, this.content = [], this.activeMarks = Ce.none, this.stashMarks = [], this.match = l || (s & bn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let n = this.type.contentMatch.fillBefore(P.from(e));
      if (n)
        this.match = this.type.contentMatch.matchFragment(n);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & ki)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let n = P.from(this.content);
    return !e && this.match && (n = n.append(this.match.fillBefore(P.empty, !0))), this.type ? this.type.create(this.attrs, n, this.marks) : n;
  }
  popFromStashMark(e) {
    for (let n = this.stashMarks.length - 1; n >= 0; n--)
      if (e.eq(this.stashMarks[n]))
        return this.stashMarks.splice(n, 1)[0];
  }
  applyPending(e) {
    for (let n = 0, r = this.pendingMarks; n < r.length; n++) {
      let i = r[n];
      (this.type ? this.type.allowsMarkType(i.type) : xd(i.type, e)) && !i.isInSet(this.activeMarks) && (this.activeMarks = i.addToSet(this.activeMarks), this.pendingMarks = i.removeFromSet(this.pendingMarks));
    }
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Pa.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class qs {
  constructor(e, n, r) {
    this.parser = e, this.options = n, this.isOpen = r, this.open = 0;
    let i = n.topNode, o, l = Zs(null, n.preserveWhitespace, 0) | (r ? bn : 0);
    i ? o = new jr(i.type, i.attrs, Ce.none, Ce.none, !0, n.topMatch || i.type.contentMatch, l) : r ? o = new jr(null, null, Ce.none, Ce.none, !0, null, l) : o = new jr(e.schema.topNodeType, null, Ce.none, Ce.none, !0, null, l), this.nodes = [o], this.find = n.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e) {
    e.nodeType == 3 ? this.addTextNode(e) : e.nodeType == 1 && this.addElement(e);
  }
  withStyleRules(e, n) {
    let r = e.getAttribute("style");
    if (!r)
      return n();
    let i = this.readStyles(Sd(r));
    if (!i)
      return;
    let [o, l] = i, s = this.top;
    for (let u = 0; u < l.length; u++)
      this.removePendingMark(l[u], s);
    for (let u = 0; u < o.length; u++)
      this.addPendingMark(o[u]);
    n();
    for (let u = 0; u < o.length; u++)
      this.removePendingMark(o[u], s);
    for (let u = 0; u < l.length; u++)
      this.addPendingMark(l[u]);
  }
  addTextNode(e) {
    let n = e.nodeValue, r = this.top;
    if (r.options & Si || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
      if (r.options & ki)
        r.options & Si ? n = n.replace(/\r\n?/g, `
`) : n = n.replace(/\r?\n|\r/g, " ");
      else if (n = n.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
        let i = r.content[r.content.length - 1], o = e.previousSibling;
        (!i || o && o.nodeName == "BR" || i.isText && /[ \t\r\n\u000c]$/.test(i.text)) && (n = n.slice(1));
      }
      n && this.insertNode(this.parser.schema.text(n)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, n) {
    let r = e.nodeName.toLowerCase(), i;
    za.hasOwnProperty(r) && this.parser.normalizeLists && wd(e);
    let o = this.options.ruleFromNode && this.options.ruleFromNode(e) || (i = this.parser.matchTag(e, this, n));
    if (o ? o.ignore : vd.hasOwnProperty(r))
      this.findInside(e), this.ignoreFallback(e);
    else if (!o || o.skip || o.closeParent) {
      o && o.closeParent ? this.open = Math.max(0, this.open - 1) : o && o.skip.nodeType && (e = o.skip);
      let l, s = this.top, u = this.needsBlock;
      if (Pa.hasOwnProperty(r))
        s.content.length && s.content[0].isInline && this.open && (this.open--, s = this.top), l = !0, s.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e);
        return;
      }
      o && o.skip ? this.addAll(e) : this.withStyleRules(e, () => this.addAll(e)), l && this.sync(s), this.needsBlock = u;
    } else
      this.withStyleRules(e, () => {
        this.addElementByRule(e, o, o.consuming === !1 ? i : void 0);
      });
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`));
  }
  // Called for ignored nodes
  ignoreFallback(e) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"));
  }
  // Run any style parser associated with the node's styles. Either
  // return an array of marks, or null to indicate some of the styles
  // had a rule with `ignore` set.
  readStyles(e) {
    let n = Ce.none, r = Ce.none;
    for (let i = 0; i < e.length; i += 2)
      for (let o = void 0; ; ) {
        let l = this.parser.matchStyle(e[i], e[i + 1], this, o);
        if (!l)
          break;
        if (l.ignore)
          return null;
        if (l.clearMark ? this.top.pendingMarks.concat(this.top.activeMarks).forEach((s) => {
          l.clearMark(s) && (r = s.addToSet(r));
        }) : n = this.parser.schema.marks[l.mark].create(l.attrs).addToSet(n), l.consuming === !1)
          o = l;
        else
          break;
      }
    return [n, r];
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, n, r) {
    let i, o, l;
    n.node ? (o = this.parser.schema.nodes[n.node], o.isLeaf ? this.insertNode(o.create(n.attrs)) || this.leafFallback(e) : i = this.enter(o, n.attrs || null, n.preserveWhitespace)) : (l = this.parser.schema.marks[n.mark].create(n.attrs), this.addPendingMark(l));
    let s = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (r)
      this.addElement(e, r);
    else if (n.getContent)
      this.findInside(e), n.getContent(e, this.parser.schema).forEach((u) => this.insertNode(u));
    else {
      let u = e;
      typeof n.contentElement == "string" ? u = e.querySelector(n.contentElement) : typeof n.contentElement == "function" ? u = n.contentElement(e) : n.contentElement && (u = n.contentElement), this.findAround(e, u, !0), this.addAll(u);
    }
    i && this.sync(s) && this.open--, l && this.removePendingMark(l, s);
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, n, r) {
    let i = n || 0;
    for (let o = n ? e.childNodes[n] : e.firstChild, l = r == null ? null : e.childNodes[r]; o != l; o = o.nextSibling, ++i)
      this.findAtPoint(e, i), this.addDOM(o);
    this.findAtPoint(e, i);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e) {
    let n, r;
    for (let i = this.open; i >= 0; i--) {
      let o = this.nodes[i], l = o.findWrapping(e);
      if (l && (!n || n.length > l.length) && (n = l, r = o, !l.length) || o.solid)
        break;
    }
    if (!n)
      return !1;
    this.sync(r);
    for (let i = 0; i < n.length; i++)
      this.enterInner(n[i], null, !1);
    return !0;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let n = this.textblockFromContext();
      n && this.enterInner(n);
    }
    if (this.findPlace(e)) {
      this.closeExtra();
      let n = this.top;
      n.applyPending(e.type), n.match && (n.match = n.match.matchType(e.type));
      let r = n.activeMarks;
      for (let i = 0; i < e.marks.length; i++)
        (!n.type || n.type.allowsMarkType(e.marks[i].type)) && (r = e.marks[i].addToSet(r));
      return n.content.push(e.mark(r)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, n, r) {
    let i = this.findPlace(e.create(n));
    return i && this.enterInner(e, n, !0, r), i;
  }
  // Open a node of the given type
  enterInner(e, n = null, r = !1, i) {
    this.closeExtra();
    let o = this.top;
    o.applyPending(e), o.match = o.match && o.match.matchType(e);
    let l = Zs(e, i, o.options);
    o.options & bn && o.content.length == 0 && (l |= bn), this.nodes.push(new jr(e, n, o.activeMarks, o.pendingMarks, r, null, l)), this.open++;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let n = this.nodes.length - 1;
    if (n > this.open) {
      for (; n > this.open; n--)
        this.nodes[n - 1].content.push(this.nodes[n].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(e) {
    for (let n = this.open; n >= 0; n--)
      if (this.nodes[n] == e)
        return this.open = n, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let n = this.open; n >= 0; n--) {
      let r = this.nodes[n].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      n && e++;
    }
    return e;
  }
  findAtPoint(e, n) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == n && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].pos == null && e.nodeType == 1 && e.contains(this.find[n].node) && (this.find[n].pos = this.currentPos);
  }
  findAround(e, n, r) {
    if (e != n && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && n.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].node == e && (this.find[n].pos = this.currentPos - (e.nodeValue.length - this.find[n].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let n = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), l = (s, u) => {
      for (; s >= 0; s--) {
        let a = n[s];
        if (a == "") {
          if (s == n.length - 1 || s == 0)
            continue;
          for (; u >= o; u--)
            if (l(s - 1, u))
              return !0;
          return !1;
        } else {
          let c = u > 0 || u == 0 && i ? this.nodes[u].type : r && u >= o ? r.node(u - o).type : null;
          if (!c || c.name != a && c.groups.indexOf(a) == -1)
            return !1;
          u--;
        }
      }
      return !0;
    };
    return l(n.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let n = e.depth; n >= 0; n--) {
        let r = e.node(n).contentMatchAt(e.indexAfter(n)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let n in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[n];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
  addPendingMark(e) {
    let n = Ed(e, this.top.pendingMarks);
    n && this.top.stashMarks.push(n), this.top.pendingMarks = e.addToSet(this.top.pendingMarks);
  }
  removePendingMark(e, n) {
    for (let r = this.open; r >= 0; r--) {
      let i = this.nodes[r];
      if (i.pendingMarks.lastIndexOf(e) > -1)
        i.pendingMarks = e.removeFromSet(i.pendingMarks);
      else {
        i.activeMarks = e.removeFromSet(i.activeMarks);
        let l = i.popFromStashMark(e);
        l && i.type && i.type.allowsMarkType(l.type) && (i.activeMarks = l.addToSet(i.activeMarks));
      }
      if (i == n)
        break;
    }
  }
}
function wd(t) {
  for (let e = t.firstChild, n = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && za.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : r == "li" ? n = e : r && (n = null);
  }
}
function kd(t, e) {
  return (t.matches || t.msMatchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector).call(t, e);
}
function Sd(t) {
  let e = /\s*([\w-]+)\s*:\s*([^;]+)/g, n, r = [];
  for (; n = e.exec(t); )
    r.push(n[1], n[2].trim());
  return r;
}
function bs(t) {
  let e = {};
  for (let n in t)
    e[n] = t[n];
  return e;
}
function xd(t, e) {
  let n = e.schema.nodes;
  for (let r in n) {
    let i = n[r];
    if (!i.allowsMarkType(t))
      continue;
    let o = [], l = (s) => {
      o.push(s);
      for (let u = 0; u < s.edgeCount; u++) {
        let { type: a, next: c } = s.edge(u);
        if (a == e || o.indexOf(c) < 0 && l(c))
          return !0;
      }
    };
    if (l(i.contentMatch))
      return !0;
  }
}
function Ed(t, e) {
  for (let n = 0; n < e.length; n++)
    if (t.eq(e[n]))
      return e[n];
}
const Ia = 65535, Oa = Math.pow(2, 16);
function Nd(t, e) {
  return t + e * Oa;
}
function eu(t) {
  return t & Ia;
}
function Cd(t) {
  return (t - (t & Ia)) / Oa;
}
const Ra = 1, Fa = 2, oi = 4, La = 8;
class tu {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.delInfo = n, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & La) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Ra | oi)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Fa | oi)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & oi) > 0;
  }
}
class Te {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, n = !1) {
    if (this.ranges = e, this.inverted = n, !e.length && Te.empty)
      return Te.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let n = 0, r = eu(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        n += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + n + Cd(e);
  }
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  map(e, n = 1) {
    return this._map(e, n, !0);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0, o = this.inverted ? 2 : 1, l = this.inverted ? 1 : 2;
    for (let s = 0; s < this.ranges.length; s += 3) {
      let u = this.ranges[s] - (this.inverted ? i : 0);
      if (u > e)
        break;
      let a = this.ranges[s + o], c = this.ranges[s + l], f = u + a;
      if (e <= f) {
        let p = a ? e == u ? -1 : e == f ? 1 : n : n, g = u + i + (p < 0 ? 0 : c);
        if (r)
          return g;
        let y = e == (n < 0 ? u : f) ? null : Nd(s / 3, e - u), v = e == u ? Fa : e == f ? Ra : oi;
        return (n < 0 ? e != u : e != f) && (v |= La), new tu(g, v, y);
      }
      i += c - a;
    }
    return r ? e + i : new tu(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, n) {
    let r = 0, i = eu(n), o = this.inverted ? 2 : 1, l = this.inverted ? 1 : 2;
    for (let s = 0; s < this.ranges.length; s += 3) {
      let u = this.ranges[s] - (this.inverted ? r : 0);
      if (u > e)
        break;
      let a = this.ranges[s + o], c = u + a;
      if (e <= c && s == i * 3)
        return !0;
      r += this.ranges[s + l] - a;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let n = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, o = 0; i < this.ranges.length; i += 3) {
      let l = this.ranges[i], s = l - (this.inverted ? o : 0), u = l + (this.inverted ? 0 : o), a = this.ranges[i + n], c = this.ranges[i + r];
      e(s, s + a, u, u + c), o += c - a;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Te(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Te.empty : new Te(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Te.empty = new Te([]);
const vo = /* @__PURE__ */ Object.create(null);
class he {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Te.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, n) {
    if (!n || !n.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = vo[n.stepType];
    if (!r)
      throw new RangeError(`No step type ${n.stepType} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, n) {
    if (e in vo)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return vo[e] = n, n.prototype.jsonID = e, n;
  }
}
class b {
  /**
  @internal
  */
  constructor(e, n) {
    this.doc = e, this.failed = n;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new b(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new b(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, n, r, i) {
    try {
      return b.ok(e.replace(n, r, i));
    } catch (o) {
      if (o instanceof yd)
        return b.fail(o.message);
      throw o;
    }
  }
}
function Yl(t, e, n) {
  let r = [];
  for (let i = 0; i < t.childCount; i++) {
    let o = t.child(i);
    o.content.size && (o = o.copy(Yl(o.content, e, o))), o.isInline && (o = e(o, n, i)), r.push(o);
  }
  return P.fromArray(r);
}
class Vt extends he {
  /**
  Create a mark step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new z(Yl(n.content, (l, s) => !l.isAtom || !s.type.allowsMarkType(this.mark.type) ? l : l.mark(this.mark.addToSet(l.marks)), i), n.openStart, n.openEnd);
    return b.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Ut(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Vt(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Vt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Vt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new Vt(n.from, n.to, e.markFromJSON(n.mark));
  }
}
he.jsonID("addMark", Vt);
class Ut extends he {
  /**
  Create a mark-removing step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = new z(Yl(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
    return b.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Vt(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Ut(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ut && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ut(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Ut(n.from, n.to, e.markFromJSON(n.mark));
  }
}
he.jsonID("removeMark", Ut);
class Wt extends he {
  /**
  Create a node mark step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return b.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.addToSet(n.marks));
    return b.fromReplace(e, this.pos, this.pos + 1, new z(P.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    if (n) {
      let r = this.mark.addToSet(n.marks);
      if (r.length == n.marks.length) {
        for (let i = 0; i < n.marks.length; i++)
          if (!n.marks[i].isInSet(r))
            return new Wt(this.pos, n.marks[i]);
        return new Wt(this.pos, this.mark);
      }
    }
    return new cr(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Wt(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Wt(n.pos, e.markFromJSON(n.mark));
  }
}
he.jsonID("addNodeMark", Wt);
class cr extends he {
  /**
  Create a mark-removing step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return b.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.removeFromSet(n.marks));
    return b.fromReplace(e, this.pos, this.pos + 1, new z(P.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    return !n || !this.mark.isInSet(n.marks) ? this : new Wt(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new cr(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new cr(n.pos, e.markFromJSON(n.mark));
  }
}
he.jsonID("removeNodeMark", cr);
class Me extends he {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, n, r, i = !1) {
    super(), this.from = e, this.to = n, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && el(e, this.from, this.to) ? b.fail("Structure replace would overwrite content") : b.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Te([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new Me(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deletedAcross && r.deletedAcross ? null : new Me(n.pos, Math.max(n.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof Me) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let n = this.slice.size + e.slice.size == 0 ? z.empty : new z(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Me(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? z.empty : new z(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new Me(e.from, this.to, n, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new Me(n.from, n.to, z.fromJSON(e, n.slice), !!n.structure);
  }
}
he.jsonID("replace", Me);
class Se extends he {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, n, r, i, o, l, s = !1) {
    super(), this.from = e, this.to = n, this.gapFrom = r, this.gapTo = i, this.slice = o, this.insert = l, this.structure = s;
  }
  apply(e) {
    if (this.structure && (el(e, this.from, this.gapFrom) || el(e, this.gapTo, this.to)))
      return b.fail("Structure gap-replace would overwrite content");
    let n = e.slice(this.gapFrom, this.gapTo);
    if (n.openStart || n.openEnd)
      return b.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, n.content);
    return r ? b.fromReplace(e, this.from, this.to, r) : b.fail("Content does not fit in gap");
  }
  getMap() {
    return new Te([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let n = this.gapTo - this.gapFrom;
    return new Se(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return n.deletedAcross && r.deletedAcross || i < n.pos || o > r.pos ? null : new Se(n.pos, r.pos, i, o, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new Se(n.from, n.to, n.gapFrom, n.gapTo, z.fromJSON(e, n.slice), n.insert, !!n.structure);
  }
}
he.jsonID("replaceAround", Se);
function el(t, e, n) {
  let r = t.resolve(e), i = n - e, o = r.depth;
  for (; i > 0 && o > 0 && r.indexAfter(o) == r.node(o).childCount; )
    o--, i--;
  if (i > 0) {
    let l = r.node(o).maybeChild(r.indexAfter(o));
    for (; i > 0; ) {
      if (!l || l.isLeaf)
        return !0;
      l = l.firstChild, i--;
    }
  }
  return !1;
}
function _d(t, e, n) {
  return (e == 0 || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n));
}
function Fn(t) {
  let n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let r = t.depth; ; --r) {
    let i = t.$from.node(r), o = t.$from.index(r), l = t.$to.indexAfter(r);
    if (r < t.depth && i.canReplace(o, l, n))
      return r;
    if (r == 0 || i.type.spec.isolating || !_d(i, o, l))
      break;
  }
  return null;
}
function Aa(t, e, n = null, r = t) {
  let i = Md(t, e), o = i && Td(r, e);
  return o ? i.map(nu).concat({ type: e, attrs: n }).concat(o.map(nu)) : null;
}
function nu(t) {
  return { type: t, attrs: null };
}
function Md(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let l = o.length ? o[0] : e;
  return n.canReplaceWith(r, i, l) ? o : null;
}
function Td(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.child(r), l = e.contentMatch.findWrapping(o.type);
  if (!l)
    return null;
  let u = (l.length ? l[l.length - 1] : e).contentMatch;
  for (let a = r; u && a < i; a++)
    u = u.matchType(n.child(a).type);
  return !u || !u.validEnd ? null : l;
}
function wn(t, e, n = 1, r) {
  let i = t.resolve(e), o = i.depth - n, l = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !l.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let a = i.depth - 1, c = n - 2; a > o; a--, c--) {
    let f = i.node(a), p = i.index(a);
    if (f.type.spec.isolating)
      return !1;
    let g = f.content.cutByIndex(p, f.childCount), y = r && r[c + 1];
    y && (g = g.replaceChild(0, y.type.create(y.attrs)));
    let v = r && r[c] || f;
    if (!f.canReplace(p + 1, f.childCount) || !v.type.validContent(g))
      return !1;
  }
  let s = i.indexAfter(o), u = r && r[0];
  return i.node(o).canReplaceWith(s, s, u ? u.type : i.node(o + 1).type);
}
function tn(t, e) {
  let n = t.resolve(e), r = n.index();
  return Da(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function Da(t, e) {
  return !!(t && e && !t.isLeaf && t.canAppend(e));
}
function Gi(t, e, n = -1) {
  let r = t.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, l, s = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, l = r.nodeAfter) : n > 0 ? (o = r.node(i + 1), s++, l = r.node(i).maybeChild(s)) : (o = r.node(i).maybeChild(s - 1), l = r.node(i + 1)), o && !o.isTextblock && Da(o, l) && r.node(i).canReplace(s, s + 1))
      return e;
    if (i == 0)
      break;
    e = n < 0 ? r.before(i) : r.after(i);
  }
}
function Gl(t, e, n = e, r = z.empty) {
  if (e == n && !r.size)
    return null;
  let i = t.resolve(e), o = t.resolve(n);
  return Pd(i, o, r) ? new Me(e, n, r) : new zd(i, o, r).fit();
}
function Pd(t, e, n) {
  return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content);
}
class zd {
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.unplaced = r, this.frontier = [], this.placed = P.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = P.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let a = this.findFittable();
      a ? this.placeNodes(a) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), n = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, l = r.depth, s = i.depth;
    for (; l && s && o.childCount == 1; )
      o = o.firstChild.content, l--, s--;
    let u = new z(o, l, s);
    return e > -1 ? new Se(r.pos, e, this.$to.pos, this.$to.end(), u, n) : u.size || r.pos != this.$to.pos ? new Me(r.pos, i.pos, u) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let n = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let o = n.firstChild;
      if (n.childCount > 1 && (i = 0), o.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      n = o.content;
    }
    for (let n = 1; n <= 2; n++)
      for (let r = n == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, o = null;
        r ? (o = wo(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let l = i.firstChild;
        for (let s = this.depth; s >= 0; s--) {
          let { type: u, match: a } = this.frontier[s], c, f = null;
          if (n == 1 && (l ? a.matchType(l.type) || (f = a.fillBefore(P.from(l), !1)) : o && u.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: s, parent: o, inject: f };
          if (n == 2 && l && (c = a.findWrapping(l.type)))
            return { sliceDepth: r, frontierDepth: s, parent: o, wrap: c };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = wo(e, n);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new z(e, n + 1, Math.max(r, i.size + n >= e.size - r ? n + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = wo(e, n);
    if (i.childCount <= 1 && n > 0) {
      let o = e.size - n <= n + i.size;
      this.unplaced = new z(Kn(e, n - 1, 1), n - 1, o ? n - 1 : r);
    } else
      this.unplaced = new z(Kn(e, n, 1), n, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: n, parent: r, inject: i, wrap: o }) {
    for (; this.depth > n; )
      this.closeFrontierNode();
    if (o)
      for (let v = 0; v < o.length; v++)
        this.openFrontierNode(o[v]);
    let l = this.unplaced, s = r ? r.content : l.content, u = l.openStart - e, a = 0, c = [], { match: f, type: p } = this.frontier[n];
    if (i) {
      for (let v = 0; v < i.childCount; v++)
        c.push(i.child(v));
      f = f.matchFragment(i);
    }
    let g = s.size + e - (l.content.size - l.openEnd);
    for (; a < s.childCount; ) {
      let v = s.child(a), E = f.matchType(v.type);
      if (!E)
        break;
      a++, (a > 1 || u == 0 || v.content.size) && (f = E, c.push(Ba(v.mark(p.allowedMarks(v.marks)), a == 1 ? u : 0, a == s.childCount ? g : -1)));
    }
    let y = a == s.childCount;
    y || (g = -1), this.placed = Yn(this.placed, n, P.from(c)), this.frontier[n].match = f, y && g < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let v = 0, E = s; v < g; v++) {
      let h = E.lastChild;
      this.frontier.push({ type: h.type, match: h.contentMatchAt(h.childCount) }), E = h.content;
    }
    this.unplaced = y ? e == 0 ? z.empty : new z(Kn(l.content, e - 1, 1), e - 1, g < 0 ? l.openEnd : e - 1) : new z(Kn(l.content, e, a), l.openStart, l.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], n;
    if (!e.type.isTextblock || !ko(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (n = this.findCloseLevel(this.$to)) && n.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e:
      for (let n = Math.min(this.depth, e.depth); n >= 0; n--) {
        let { match: r, type: i } = this.frontier[n], o = n < e.depth && e.end(n + 1) == e.pos + (e.depth - (n + 1)), l = ko(e, n, i, r, o);
        if (l) {
          for (let s = n - 1; s >= 0; s--) {
            let { match: u, type: a } = this.frontier[s], c = ko(e, s, a, u, !0);
            if (!c || c.childCount)
              continue e;
          }
          return { depth: n, fit: l, move: o ? e.doc.resolve(e.after(n + 1)) : e };
        }
      }
  }
  close(e) {
    let n = this.findCloseLevel(e);
    if (!n)
      return null;
    for (; this.depth > n.depth; )
      this.closeFrontierNode();
    n.fit.childCount && (this.placed = Yn(this.placed, n.depth, n.fit)), e = n.move;
    for (let r = n.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, n = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Yn(this.placed, this.depth, P.from(e.create(n, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let n = this.frontier.pop().match.fillBefore(P.empty, !0);
    n.childCount && (this.placed = Yn(this.placed, this.frontier.length, n));
  }
}
function Kn(t, e, n) {
  return e == 0 ? t.cutByIndex(n, t.childCount) : t.replaceChild(0, t.firstChild.copy(Kn(t.firstChild.content, e - 1, n)));
}
function Yn(t, e, n) {
  return e == 0 ? t.append(n) : t.replaceChild(t.childCount - 1, t.lastChild.copy(Yn(t.lastChild.content, e - 1, n)));
}
function wo(t, e) {
  for (let n = 0; n < e; n++)
    t = t.firstChild.content;
  return t;
}
function Ba(t, e, n) {
  if (e <= 0)
    return t;
  let r = t.content;
  return e > 1 && (r = r.replaceChild(0, Ba(r.firstChild, e - 1, r.childCount == 1 ? n - 1 : 0))), e > 0 && (r = t.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(t.type.contentMatch.matchFragment(r).fillBefore(P.empty, !0)))), t.copy(r);
}
function ko(t, e, n, r, i) {
  let o = t.node(e), l = i ? t.indexAfter(e) : t.index(e);
  if (l == o.childCount && !n.compatibleContent(o.type))
    return null;
  let s = r.fillBefore(o.content, !0, l);
  return s && !Id(n, o.content, l) ? s : null;
}
function Id(t, e, n) {
  for (let r = n; r < e.childCount; r++)
    if (!t.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
class er extends he {
  /**
  Construct an attribute step.
  */
  constructor(e, n, r) {
    super(), this.pos = e, this.attr = n, this.value = r;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return b.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in n.attrs)
      r[o] = n.attrs[o];
    r[this.attr] = this.value;
    let i = n.type.create(r, null, n.marks);
    return b.fromReplace(e, this.pos, this.pos + 1, new z(P.from(i), 0, n.isLeaf ? 0 : 1));
  }
  getMap() {
    return Te.empty;
  }
  invert(e) {
    return new er(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new er(n.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.pos != "number" || typeof n.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new er(n.pos, n.attr, n.value);
  }
}
he.jsonID("attr", er);
class xi extends he {
  /**
  Construct an attribute step.
  */
  constructor(e, n) {
    super(), this.attr = e, this.value = n;
  }
  apply(e) {
    let n = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      n[i] = e.attrs[i];
    n[this.attr] = this.value;
    let r = e.type.create(n, e.content, e.marks);
    return b.ok(r);
  }
  getMap() {
    return Te.empty;
  }
  invert(e) {
    return new xi(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new xi(n.attr, n.value);
  }
}
he.jsonID("docAttr", xi);
let fr = class extends Error {
};
fr = function t(e) {
  let n = Error.call(this, e);
  return n.__proto__ = t.prototype, n;
};
fr.prototype = Object.create(Error.prototype);
fr.prototype.constructor = fr;
fr.prototype.name = "TransformError";
const So = /* @__PURE__ */ Object.create(null);
class B {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, n, r) {
    this.$anchor = e, this.$head = n, this.ranges = r || [new Od(e.min(n), e.max(n))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let n = 0; n < e.length; n++)
      if (e[n].$from.pos != e[n].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, n = z.empty) {
    let r = n.content.lastChild, i = null;
    for (let s = 0; s < n.openEnd; s++)
      i = r, r = r.lastChild;
    let o = e.steps.length, l = this.ranges;
    for (let s = 0; s < l.length; s++) {
      let { $from: u, $to: a } = l[s], c = e.mapping.slice(o);
      e.replaceRange(c.map(u.pos), c.map(a.pos), s ? z.empty : n), s == 0 && ou(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, n) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: l, $to: s } = i[o], u = e.mapping.slice(r), a = u.map(l.pos), c = u.map(s.pos);
      o ? e.deleteRange(a, c) : (e.replaceRangeWith(a, c, n), ou(e, r, n.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, n, r = !1) {
    let i = e.parent.inlineContent ? new Q(e) : ln(e.node(0), e.parent, e.pos, e.index(), n, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let l = n < 0 ? ln(e.node(0), e.node(o), e.before(o + 1), e.index(o), n, r) : ln(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, n, r);
      if (l)
        return l;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, n = 1) {
    return this.findFrom(e, n) || this.findFrom(e, -n) || new be(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return ln(e, e, 0, 0, 1) || new be(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return ln(e, e, e.content.size, e.childCount, -1) || new be(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, n) {
    if (!n || !n.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = So[n.type];
    if (!r)
      throw new RangeError(`No selection type ${n.type} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, n) {
    if (e in So)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return So[e] = n, n.prototype.jsonID = e, n;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return Q.between(this.$anchor, this.$head).getBookmark();
  }
}
B.prototype.visible = !0;
class Od {
  /**
  Create a range.
  */
  constructor(e, n) {
    this.$from = e, this.$to = n;
  }
}
let ru = !1;
function iu(t) {
  !ru && !t.parent.inlineContent && (ru = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + t.parent.type.name + ")"));
}
class Q extends B {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, n = e) {
    iu(e), iu(n), super(e, n);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, n) {
    let r = e.resolve(n.map(this.head));
    if (!r.parent.inlineContent)
      return B.near(r);
    let i = e.resolve(n.map(this.anchor));
    return new Q(i.parent.inlineContent ? i : r, r);
  }
  replace(e, n = z.empty) {
    if (super.replace(e, n), n == z.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Q && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Xi(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number" || typeof n.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new Q(e.resolve(n.anchor), e.resolve(n.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, n, r = n) {
    let i = e.resolve(n);
    return new this(i, r == n ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, n, r) {
    let i = e.pos - n.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
      let o = B.findFrom(n, r, !0) || B.findFrom(n, -r, !0);
      if (o)
        n = o.$head;
      else
        return B.near(n, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = n : (e = (B.findFrom(e, -r, !0) || B.findFrom(e, r, !0)).$anchor, e.pos < n.pos != i < 0 && (e = n))), new Q(e, n);
  }
}
B.jsonID("text", Q);
class Xi {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new Xi(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Q.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class $ extends B {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let n = e.nodeAfter, r = e.node(0).resolve(e.pos + n.nodeSize);
    super(e, r), this.node = n;
  }
  map(e, n) {
    let { deleted: r, pos: i } = n.mapResult(this.anchor), o = e.resolve(i);
    return r ? B.near(o) : new $(o);
  }
  content() {
    return new z(P.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof $ && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Xl(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new $(e.resolve(n.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, n) {
    return new $(e.resolve(n));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
$.prototype.visible = !1;
B.jsonID("node", $);
class Xl {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: n, pos: r } = e.mapResult(this.anchor);
    return n ? new Xi(r, r) : new Xl(r);
  }
  resolve(e) {
    let n = e.resolve(this.anchor), r = n.nodeAfter;
    return r && $.isSelectable(r) ? new $(n) : B.near(n);
  }
}
class be extends B {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, n = z.empty) {
    if (n == z.empty) {
      e.delete(0, e.doc.content.size);
      let r = B.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, n);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new be(e);
  }
  map(e) {
    return new be(e);
  }
  eq(e) {
    return e instanceof be;
  }
  getBookmark() {
    return Rd;
  }
}
B.jsonID("all", be);
const Rd = {
  map() {
    return this;
  },
  resolve(t) {
    return new be(t);
  }
};
function ln(t, e, n, r, i, o = !1) {
  if (e.inlineContent)
    return Q.create(t, n);
  for (let l = r - (i > 0 ? 0 : 1); i > 0 ? l < e.childCount : l >= 0; l += i) {
    let s = e.child(l);
    if (s.isAtom) {
      if (!o && $.isSelectable(s))
        return $.create(t, n - (i < 0 ? s.nodeSize : 0));
    } else {
      let u = ln(t, s, n + i, i < 0 ? s.childCount : 0, i, o);
      if (u)
        return u;
    }
    n += s.nodeSize * i;
  }
  return null;
}
function ou(t, e, n) {
  let r = t.steps.length - 1;
  if (r < e)
    return;
  let i = t.steps[r];
  if (!(i instanceof Me || i instanceof Se))
    return;
  let o = t.mapping.maps[r], l;
  o.forEach((s, u, a, c) => {
    l == null && (l = c);
  }), t.setSelection(B.near(t.doc.resolve(l), n));
}
function lu(t, e) {
  return !e || !t ? t : t.bind(e);
}
class Vr {
  constructor(e, n, r) {
    this.name = e, this.init = lu(n.init, r), this.apply = lu(n.apply, r);
  }
}
new Vr("doc", {
  init(t) {
    return t.doc || t.schema.topNodeType.createAndFill();
  },
  apply(t) {
    return t.doc;
  }
}), new Vr("selection", {
  init(t, e) {
    return t.selection || B.atStart(e.doc);
  },
  apply(t) {
    return t.selection;
  }
}), new Vr("storedMarks", {
  init(t) {
    return t.storedMarks || null;
  },
  apply(t, e, n, r) {
    return r.selection.$cursor ? t.storedMarks : null;
  }
}), new Vr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(t, e) {
    return t.scrolledIntoView ? e + 1 : e;
  }
});
function $a(t, e, n) {
  for (let r in t) {
    let i = t[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = $a(i, e, {})), n[r] = i;
  }
  return n;
}
class zr {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && $a(e.props, this, this.props), this.key = e.key ? e.key.key : ja("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const xo = /* @__PURE__ */ Object.create(null);
function ja(t) {
  return t in xo ? t + "$" + ++xo[t] : (xo[t] = 0, t + "$");
}
class Ir {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = ja(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Fd = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function Va(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const Ld = (t, e, n) => {
  let r = Va(t, n);
  if (!r)
    return !1;
  let i = Zl(r);
  if (!i) {
    let l = r.blockRange(), s = l && Fn(l);
    return s == null ? !1 : (e && e(t.tr.lift(l, s).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Ja(t, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (_n(o, "end") || $.isSelectable(o)))
    for (let l = r.depth; ; l--) {
      let s = Gl(t.doc, r.before(l), r.after(l), z.empty);
      if (s && s.slice.size < s.to - s.from) {
        if (e) {
          let u = t.tr.step(s);
          u.setSelection(_n(o, "end") ? B.findFrom(u.doc.resolve(u.mapping.map(i.pos, -1)), -1) : $.create(u.doc, i.pos - o.nodeSize)), e(u.scrollIntoView());
        }
        return !0;
      }
      if (l == 1 || r.node(l - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Ad = (t, e, n) => {
  let r = Va(t, n);
  if (!r)
    return !1;
  let i = Zl(r);
  return i ? Ua(t, i, e) : !1;
}, Dd = (t, e, n) => {
  let r = Wa(t, n);
  if (!r)
    return !1;
  let i = ql(r);
  return i ? Ua(t, i, e) : !1;
};
function Ua(t, e, n) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let c = i.lastChild;
    if (!c)
      return !1;
    i = c;
  }
  let l = e.nodeAfter, s = l, u = e.pos + 1;
  for (; !s.isTextblock; u++) {
    if (s.type.spec.isolating)
      return !1;
    let c = s.firstChild;
    if (!c)
      return !1;
    s = c;
  }
  let a = Gl(t.doc, o, u, z.empty);
  if (!a || a.from != o || a instanceof Me && a.slice.size >= u - o)
    return !1;
  if (n) {
    let c = t.tr.step(a);
    c.setSelection(Q.create(c.doc, o)), n(c.scrollIntoView());
  }
  return !0;
}
function _n(t, e, n = !1) {
  for (let r = t; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (n && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Bd = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    o = Zl(r);
  }
  let l = o && o.nodeBefore;
  return !l || !$.isSelectable(l) ? !1 : (e && e(t.tr.setSelection($.create(t.doc, o.pos - l.nodeSize)).scrollIntoView()), !0);
};
function Zl(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      if (t.index(e) > 0)
        return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Wa(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const $d = (t, e, n) => {
  let r = Wa(t, n);
  if (!r)
    return !1;
  let i = ql(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Ja(t, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (_n(o, "start") || $.isSelectable(o))) {
    let l = Gl(t.doc, r.before(), r.after(), z.empty);
    if (l && l.slice.size < l.to - l.from) {
      if (e) {
        let s = t.tr.step(l);
        s.setSelection(_n(o, "start") ? B.findFrom(s.doc.resolve(s.mapping.map(i.pos)), 1) : $.create(s.doc, s.mapping.map(i.pos))), e(s.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, jd = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    o = ql(r);
  }
  let l = o && o.nodeAfter;
  return !l || !$.isSelectable(l) ? !1 : (e && e(t.tr.setSelection($.create(t.doc, o.pos)).scrollIntoView()), !0);
};
function ql(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      let n = t.node(e);
      if (t.index(e) + 1 < n.childCount)
        return t.doc.resolve(t.after(e + 1));
      if (n.type.spec.isolating)
        break;
    }
  return null;
}
const Vd = (t, e) => {
  let n = t.selection, r = n instanceof $, i;
  if (r) {
    if (n.node.isTextblock || !tn(t.doc, n.from))
      return !1;
    i = n.from;
  } else if (i = Gi(t.doc, n.from, -1), i == null)
    return !1;
  if (e) {
    let o = t.tr.join(i);
    r && o.setSelection($.create(o.doc, i - t.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Ud = (t, e) => {
  let n = t.selection, r;
  if (n instanceof $) {
    if (n.node.isTextblock || !tn(t.doc, n.to))
      return !1;
    r = n.to;
  } else if (r = Gi(t.doc, n.to, 1), r == null)
    return !1;
  return e && e(t.tr.join(r).scrollIntoView()), !0;
}, Wd = (t, e) => {
  let { $from: n, $to: r } = t.selection, i = n.blockRange(r), o = i && Fn(i);
  return o == null ? !1 : (e && e(t.tr.lift(i, o).scrollIntoView()), !0);
}, Hd = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (e && e(t.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ha(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    let { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
const Jd = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let i = n.node(-1), o = n.indexAfter(-1), l = Ha(i.contentMatchAt(o));
  if (!l || !i.canReplaceWith(o, o, l))
    return !1;
  if (e) {
    let s = n.after(), u = t.tr.replaceWith(s, s, l.createAndFill());
    u.setSelection(B.near(u.doc.resolve(s), 1)), e(u.scrollIntoView());
  }
  return !0;
}, Qd = (t, e) => {
  let n = t.selection, { $from: r, $to: i } = n;
  if (n instanceof be || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Ha(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let l = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, s = t.tr.insert(l, o.createAndFill());
    s.setSelection(Q.create(s.doc, l + 1)), e(s.scrollIntoView());
  }
  return !0;
}, Kd = (t, e) => {
  let { $cursor: n } = t.selection;
  if (!n || n.parent.content.size)
    return !1;
  if (n.depth > 1 && n.after() != n.end(-1)) {
    let o = n.before();
    if (wn(t.doc, o))
      return e && e(t.tr.split(o).scrollIntoView()), !0;
  }
  let r = n.blockRange(), i = r && Fn(r);
  return i == null ? !1 : (e && e(t.tr.lift(r, i).scrollIntoView()), !0);
}, Yd = (t, e) => {
  let { $from: n, to: r } = t.selection, i, o = n.sharedDepth(r);
  return o == 0 ? !1 : (i = n.before(o), e && e(t.tr.setSelection($.create(t.doc, i))), !0);
};
function Gd(t, e, n) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || tn(t.doc, e.pos)) ? !1 : (n && n(t.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function Ja(t, e, n, r) {
  let i = e.nodeBefore, o = e.nodeAfter, l, s, u = i.type.spec.isolating || o.type.spec.isolating;
  if (!u && Gd(t, e, n))
    return !0;
  let a = !u && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (l = (s = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && s.matchType(l[0] || o.type).validEnd) {
    if (n) {
      let g = e.pos + o.nodeSize, y = P.empty;
      for (let h = l.length - 1; h >= 0; h--)
        y = P.from(l[h].create(null, y));
      y = P.from(i.copy(y));
      let v = t.tr.step(new Se(e.pos - 1, g, e.pos, g, new z(y, 1, 0), l.length, !0)), E = g + 2 * l.length;
      tn(v.doc, E) && v.join(E), n(v.scrollIntoView());
    }
    return !0;
  }
  let c = o.type.spec.isolating || r > 0 && u ? null : B.findFrom(e, 1), f = c && c.$from.blockRange(c.$to), p = f && Fn(f);
  if (p != null && p >= e.depth)
    return n && n(t.tr.lift(f, p).scrollIntoView()), !0;
  if (a && _n(o, "start", !0) && _n(i, "end")) {
    let g = i, y = [];
    for (; y.push(g), !g.isTextblock; )
      g = g.lastChild;
    let v = o, E = 1;
    for (; !v.isTextblock; v = v.firstChild)
      E++;
    if (g.canReplace(g.childCount, g.childCount, v.content)) {
      if (n) {
        let h = P.empty;
        for (let m = y.length - 1; m >= 0; m--)
          h = P.from(y[m].copy(h));
        let d = t.tr.step(new Se(e.pos - y.length, e.pos + o.nodeSize, e.pos + E, e.pos + o.nodeSize - E, new z(h, y.length, 0), 0, !0));
        n(d.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Qa(t) {
  return function(e, n) {
    let r = e.selection, i = t < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (n && n(e.tr.setSelection(Q.create(e.doc, t < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Xd = Qa(-1), Zd = Qa(1);
function qd(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, l = i.blockRange(o), s = l && Aa(l, t, e);
    return s ? (r && r(n.tr.wrap(l, s).scrollIntoView()), !0) : !1;
  };
}
function su(t, e = null) {
  return function(n, r) {
    let i = !1;
    for (let o = 0; o < n.selection.ranges.length && !i; o++) {
      let { $from: { pos: l }, $to: { pos: s } } = n.selection.ranges[o];
      n.doc.nodesBetween(l, s, (u, a) => {
        if (i)
          return !1;
        if (!(!u.isTextblock || u.hasMarkup(t, e)))
          if (u.type == t)
            i = !0;
          else {
            let c = n.doc.resolve(a), f = c.index();
            i = c.parent.canReplaceWith(f, f + 1, t);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = n.tr;
      for (let l = 0; l < n.selection.ranges.length; l++) {
        let { $from: { pos: s }, $to: { pos: u } } = n.selection.ranges[l];
        o.setBlockType(s, u, t, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function bd(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, l = i.blockRange(o), s = !1, u = l;
    if (!l)
      return !1;
    if (l.depth >= 2 && i.node(l.depth - 1).type.compatibleContent(t) && l.startIndex == 0) {
      if (i.index(l.depth - 1) == 0)
        return !1;
      let c = n.doc.resolve(l.start - 2);
      u = new bo(c, c, l.depth), l.endIndex < l.parent.childCount && (l = new bo(i, n.doc.resolve(o.end(l.depth)), l.depth)), s = !0;
    }
    let a = Aa(u, t, e, l);
    return a ? (r && r(ep(n.tr, l, a, s, t).scrollIntoView()), !0) : !1;
  };
}
function ep(t, e, n, r, i) {
  let o = P.empty;
  for (let c = n.length - 1; c >= 0; c--)
    o = P.from(n[c].type.create(n[c].attrs, o));
  t.step(new Se(e.start - (r ? 2 : 0), e.end, e.start, e.end, new z(o, 0, 0), n.length, !0));
  let l = 0;
  for (let c = 0; c < n.length; c++)
    n[c].type == i && (l = c + 1);
  let s = n.length - l, u = e.start + n.length - (r ? 2 : 0), a = e.parent;
  for (let c = e.startIndex, f = e.endIndex, p = !0; c < f; c++, p = !1)
    !p && wn(t.doc, u, s) && (t.split(u, s), u += 2 * s), u += a.child(c).nodeSize;
  return t;
}
function tp(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (l) => l.childCount > 0 && l.firstChild.type == t);
    return o ? n ? r.node(o.depth - 1).type == t ? np(e, n, t, o) : rp(e, n, o) : !0 : !1;
  };
}
function np(t, e, n, r) {
  let i = t.tr, o = r.end, l = r.$to.end(r.depth);
  o < l && (i.step(new Se(o - 1, l, o, l, new z(P.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new bo(i.doc.resolve(r.$from.pos), i.doc.resolve(l), r.depth));
  const s = Fn(r);
  if (s == null)
    return !1;
  i.lift(r, s);
  let u = i.mapping.map(o, -1) - 1;
  return tn(i.doc, u) && i.join(u), e(i.scrollIntoView()), !0;
}
function rp(t, e, n) {
  let r = t.tr, i = n.parent;
  for (let g = n.end, y = n.endIndex - 1, v = n.startIndex; y > v; y--)
    g -= i.child(y).nodeSize, r.delete(g - 1, g + 1);
  let o = r.doc.resolve(n.start), l = o.nodeAfter;
  if (r.mapping.map(n.end) != n.start + o.nodeAfter.nodeSize)
    return !1;
  let s = n.startIndex == 0, u = n.endIndex == i.childCount, a = o.node(-1), c = o.index(-1);
  if (!a.canReplace(c + (s ? 0 : 1), c + 1, l.content.append(u ? P.empty : P.from(i))))
    return !1;
  let f = o.pos, p = f + l.nodeSize;
  return r.step(new Se(f - (s ? 1 : 0), p + (u ? 1 : 0), f + 1, p - 1, new z((s ? P.empty : P.from(i.copy(P.empty))).append(u ? P.empty : P.from(i.copy(P.empty))), s ? 0 : 1, u ? 0 : 1), s ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function ip(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (a) => a.childCount > 0 && a.firstChild.type == t);
    if (!o)
      return !1;
    let l = o.startIndex;
    if (l == 0)
      return !1;
    let s = o.parent, u = s.child(l - 1);
    if (u.type != t)
      return !1;
    if (n) {
      let a = u.lastChild && u.lastChild.type == s.type, c = P.from(a ? t.create() : null), f = new z(P.from(t.create(null, P.from(s.type.create(null, c)))), a ? 3 : 1, 0), p = o.start, g = o.end;
      n(e.tr.step(new Se(p - (a ? 3 : 1), g, p, g, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function Ka(t) {
  const { state: e, transaction: n } = t;
  let { selection: r } = n, { doc: i } = n, { storedMarks: o } = n;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return o;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = n.selection, i = n.doc, o = n.storedMarks, n;
    }
  };
}
class op {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: n, state: r } = this, { view: i } = n, { tr: o } = r, l = this.buildProps(o);
    return Object.fromEntries(Object.entries(e).map(([s, u]) => [s, (...c) => {
      const f = u(...c)(l);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(o), f;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, n = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: l } = i, s = [], u = !!e, a = e || o.tr, c = () => (!u && n && !a.getMeta("preventDispatch") && !this.hasCustomState && l.dispatch(a), s.every((p) => p === !0)), f = {
      ...Object.fromEntries(Object.entries(r).map(([p, g]) => [p, (...v) => {
        const E = this.buildProps(a, n), h = g(...v)(E);
        return s.push(h), f;
      }])),
      run: c
    };
    return f;
  }
  createCan(e) {
    const { rawCommands: n, state: r } = this, i = !1, o = e || r.tr, l = this.buildProps(o, i);
    return {
      ...Object.fromEntries(Object.entries(n).map(([u, a]) => [u, (...c) => a(...c)({ ...l, dispatch: void 0 })])),
      chain: () => this.createChain(o, i)
    };
  }
  buildProps(e, n = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: l } = i, s = {
      tr: e,
      editor: i,
      view: l,
      state: Ka({
        state: o,
        transaction: e
      }),
      dispatch: n ? () => {
      } : void 0,
      chain: () => this.createChain(e, n),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([u, a]) => [u, (...c) => a(...c)(s)]));
      }
    };
    return s;
  }
}
function Pe(t, e, n) {
  return t.config[e] === void 0 && t.parent ? Pe(t.parent, e, n) : typeof t.config[e] == "function" ? t.config[e].bind({
    ...n,
    parent: t.parent ? Pe(t.parent, e, n) : null
  }) : t.config[e];
}
function lp(t) {
  const e = t.filter((i) => i.type === "extension"), n = t.filter((i) => i.type === "node"), r = t.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: n,
    markExtensions: r
  };
}
function de(t, e) {
  if (typeof t == "string") {
    if (!e.nodes[t])
      throw Error(`There is no node type named '${t}'. Maybe you forgot to add the extension?`);
    return e.nodes[t];
  }
  return t;
}
function uu(...t) {
  return t.filter((e) => !!e).reduce((e, n) => {
    const r = { ...e };
    return Object.entries(n).forEach(([i, o]) => {
      if (!r[i]) {
        r[i] = o;
        return;
      }
      if (i === "class") {
        const s = o ? o.split(" ") : [], u = r[i] ? r[i].split(" ") : [], a = s.filter((c) => !u.includes(c));
        r[i] = [...u, ...a].join(" ");
      } else
        i === "style" ? r[i] = [r[i], o].join("; ") : r[i] = o;
    }), r;
  }, {});
}
function sp(t) {
  return typeof t == "function";
}
function Qe(t, e = void 0, ...n) {
  return sp(t) ? e ? t.bind(e)(...n) : t(...n) : t;
}
function up(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function ap(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function Eo(t) {
  return ap(t) !== "Object" ? !1 : t.constructor === Object && Object.getPrototypeOf(t) === Object.prototype;
}
function bl(t, e) {
  const n = { ...t };
  return Eo(t) && Eo(e) && Object.keys(e).forEach((r) => {
    Eo(e[r]) ? r in t ? n[r] = bl(t[r], e[r]) : Object.assign(n, { [r]: e[r] }) : Object.assign(n, { [r]: e[r] });
  }), n;
}
class st {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = Qe(Pe(this, "addOptions", {
      name: this.name
    }))), this.storage = Qe(Pe(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new st(e);
  }
  configure(e = {}) {
    const n = this.extend();
    return n.options = bl(this.options, e), n.storage = Qe(Pe(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
  extend(e = {}) {
    const n = new st({ ...this.config, ...e });
    return n.parent = this, this.child = n, n.name = e.name ? e.name : n.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = Qe(Pe(n, "addOptions", {
      name: n.name
    })), n.storage = Qe(Pe(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
}
function cp(t, e, n) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: l = {} } = n || {};
  let s = "", u = !0;
  return t.nodesBetween(r, i, (a, c, f, p) => {
    var g;
    const y = l == null ? void 0 : l[a.type.name];
    y ? (a.isBlock && !u && (s += o, u = !0), f && (s += y({
      node: a,
      pos: c,
      parent: f,
      index: p,
      range: e
    }))) : a.isText ? (s += (g = a == null ? void 0 : a.text) === null || g === void 0 ? void 0 : g.slice(Math.max(r, c) - c, i - c), u = !1) : a.isBlock && !u && (s += o, u = !0);
  }), s;
}
function fp(t) {
  return Object.fromEntries(Object.entries(t.nodes).filter(([, e]) => e.spec.toText).map(([e, n]) => [e, n.spec.toText]));
}
st.create({
  name: "clipboardTextSerializer",
  addProseMirrorPlugins() {
    return [
      new zr({
        key: new Ir("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: t } = this, { state: e, schema: n } = t, { doc: r, selection: i } = e, { ranges: o } = i, l = Math.min(...o.map((c) => c.$from.pos)), s = Math.max(...o.map((c) => c.$to.pos)), u = fp(n);
            return cp(r, { from: l, to: s }, {
              textSerializers: u
            });
          }
        }
      })
    ];
  }
});
const dp = () => ({ editor: t, view: e }) => (requestAnimationFrame(() => {
  var n;
  t.isDestroyed || (e.dom.blur(), (n = window == null ? void 0 : window.getSelection()) === null || n === void 0 || n.removeAllRanges());
}), !0), pp = (t = !1) => ({ commands: e }) => e.setContent("", t), hp = () => ({ state: t, tr: e, dispatch: n }) => {
  const { selection: r } = e, { ranges: i } = r;
  return n && i.forEach(({ $from: o, $to: l }) => {
    t.doc.nodesBetween(o.pos, l.pos, (s, u) => {
      if (s.type.isText)
        return;
      const { doc: a, mapping: c } = e, f = a.resolve(c.map(u)), p = a.resolve(c.map(u + s.nodeSize)), g = f.blockRange(p);
      if (!g)
        return;
      const y = Fn(g);
      if (s.type.isTextblock) {
        const { defaultType: v } = f.parent.contentMatchAt(f.index());
        e.setNodeMarkup(g.start, v);
      }
      (y || y === 0) && e.lift(g, y);
    });
  }), !0;
}, mp = (t) => (e) => t(e), gp = () => ({ state: t, dispatch: e }) => Qd(t, e), yp = (t, e) => ({ editor: n, tr: r }) => {
  const { state: i } = n, o = i.doc.slice(t.from, t.to);
  r.deleteRange(t.from, t.to);
  const l = r.mapping.map(e);
  return r.insert(l, o.content), r.setSelection(new Q(r.doc.resolve(l - 1))), !0;
}, vp = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, r = n.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = t.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1)
    if (i.node(o).type === r.type) {
      if (e) {
        const s = i.before(o), u = i.after(o);
        t.delete(s, u).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, wp = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const i = de(t, n.schema), o = e.selection.$anchor;
  for (let l = o.depth; l > 0; l -= 1)
    if (o.node(l).type === i) {
      if (r) {
        const u = o.before(l), a = o.after(l);
        e.delete(u, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, kp = (t) => ({ tr: e, dispatch: n }) => {
  const { from: r, to: i } = t;
  return n && e.delete(r, i), !0;
}, Sp = () => ({ state: t, dispatch: e }) => Fd(t, e), xp = () => ({ commands: t }) => t.keyboardShortcut("Enter"), Ep = () => ({ state: t, dispatch: e }) => Jd(t, e);
function Ei(t, e, n = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => n.strict ? e[i] === t[i] : up(e[i]) ? e[i].test(t[i]) : e[i] === t[i]) : !0;
}
function tl(t, e, n = {}) {
  return t.find((r) => r.type === e && Ei(r.attrs, n));
}
function Np(t, e, n = {}) {
  return !!tl(t, e, n);
}
function Ya(t, e, n = {}) {
  if (!t || !e)
    return;
  let r = t.parent.childAfter(t.parentOffset);
  if (t.parentOffset === r.offset && r.offset !== 0 && (r = t.parent.childBefore(t.parentOffset)), !r.node)
    return;
  const i = tl([...r.node.marks], e, n);
  if (!i)
    return;
  let o = r.index, l = t.start() + r.offset, s = o + 1, u = l + r.node.nodeSize;
  for (tl([...r.node.marks], e, n); o > 0 && i.isInSet(t.parent.child(o - 1).marks); )
    o -= 1, l -= t.parent.child(o).nodeSize;
  for (; s < t.parent.childCount && Np([...t.parent.child(s).marks], e, n); )
    u += t.parent.child(s).nodeSize, s += 1;
  return {
    from: l,
    to: u
  };
}
function Rt(t, e) {
  if (typeof t == "string") {
    if (!e.marks[t])
      throw Error(`There is no mark type named '${t}'. Maybe you forgot to add the extension?`);
    return e.marks[t];
  }
  return t;
}
const Cp = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const o = Rt(t, r.schema), { doc: l, selection: s } = n, { $from: u, from: a, to: c } = s;
  if (i) {
    const f = Ya(u, o, e);
    if (f && f.from <= a && f.to >= c) {
      const p = Q.create(l, f.from, f.to);
      n.setSelection(p);
    }
  }
  return !0;
}, _p = (t) => (e) => {
  const n = typeof t == "function" ? t(e) : t;
  for (let r = 0; r < n.length; r += 1)
    if (n[r](e))
      return !0;
  return !1;
};
function Ga(t) {
  return t instanceof Q;
}
function Ht(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function Mp(t, e = null) {
  if (!e)
    return null;
  const n = B.atStart(t), r = B.atEnd(t);
  if (e === "start" || e === !0)
    return n;
  if (e === "end")
    return r;
  const i = n.from, o = r.to;
  return e === "all" ? Q.create(t, Ht(0, i, o), Ht(t.content.size, i, o)) : Q.create(t, Ht(e, i, o), Ht(e, i, o));
}
function Zi() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const Tp = (t = null, e = {}) => ({ editor: n, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const l = () => {
    Zi() && r.dom.focus(), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), e != null && e.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && t === null || t === !1)
    return !0;
  if (o && t === null && !Ga(n.state.selection))
    return l(), !0;
  const s = Mp(i.doc, t) || n.state.selection, u = n.state.selection.eq(s);
  return o && (u || i.setSelection(s), u && i.storedMarks && i.setStoredMarks(i.storedMarks), l()), !0;
}, Pp = (t, e) => (n) => t.every((r, i) => e(r, { ...n, index: i })), zp = (t, e) => ({ tr: n, commands: r }) => r.insertContentAt({ from: n.selection.from, to: n.selection.to }, t, e), Xa = (t) => {
  const e = t.childNodes;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? t.removeChild(r) : r.nodeType === 1 && Xa(r);
  }
  return t;
};
function au(t) {
  const e = `<body>${t}</body>`, n = new window.DOMParser().parseFromString(e, "text/html").body;
  return Xa(n);
}
function Ni(t, e, n) {
  if (n = {
    slice: !0,
    parseOptions: {},
    ...n
  }, typeof t == "object" && t !== null)
    try {
      return Array.isArray(t) && t.length > 0 ? P.fromArray(t.map((r) => e.nodeFromJSON(r))) : e.nodeFromJSON(t);
    } catch (r) {
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", t, "Error:", r), Ni("", e, n);
    }
  if (typeof t == "string") {
    const r = wi.fromSchema(e);
    return n.slice ? r.parseSlice(au(t), n.parseOptions).content : r.parse(au(t), n.parseOptions);
  }
  return Ni("", e, n);
}
function Ip(t, e, n) {
  const r = t.steps.length - 1;
  if (r < e)
    return;
  const i = t.steps[r];
  if (!(i instanceof Me || i instanceof Se))
    return;
  const o = t.mapping.maps[r];
  let l = 0;
  o.forEach((s, u, a, c) => {
    l === 0 && (l = c);
  }), t.setSelection(B.near(t.doc.resolve(l), n));
}
const Op = (t) => t.toString().startsWith("<"), Rp = (t, e, n) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    n = {
      parseOptions: {},
      updateSelection: !0,
      ...n
    };
    const l = Ni(e, o.schema, {
      parseOptions: {
        preserveWhitespace: "full",
        ...n.parseOptions
      }
    });
    if (l.toString() === "<>")
      return !0;
    let { from: s, to: u } = typeof t == "number" ? { from: t, to: t } : { from: t.from, to: t.to }, a = !0, c = !0;
    if ((Op(l) ? l : [l]).forEach((p) => {
      p.check(), a = a ? p.isText && p.marks.length === 0 : !1, c = c ? p.isBlock : !1;
    }), s === u && c) {
      const { parent: p } = r.doc.resolve(s);
      p.isTextblock && !p.type.spec.code && !p.childCount && (s -= 1, u += 1);
    }
    a ? Array.isArray(e) ? r.insertText(e.map((p) => p.text || "").join(""), s, u) : typeof e == "object" && e && e.text ? r.insertText(e.text, s, u) : r.insertText(e, s, u) : r.replaceWith(s, u, l), n.updateSelection && Ip(r, r.steps.length - 1, -1);
  }
  return !0;
}, Fp = () => ({ state: t, dispatch: e }) => Vd(t, e), Lp = () => ({ state: t, dispatch: e }) => Ud(t, e), Ap = () => ({ state: t, dispatch: e }) => Ld(t, e), Dp = () => ({ state: t, dispatch: e }) => $d(t, e), Bp = () => ({ tr: t, state: e, dispatch: n }) => {
  try {
    const r = Gi(e.doc, e.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), n && n(t), !0);
  } catch {
    return !1;
  }
}, $p = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = Gi(t.doc, t.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, jp = () => ({ state: t, dispatch: e }) => Ad(t, e), Vp = () => ({ state: t, dispatch: e }) => Dd(t, e);
function Za() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Up(t) {
  const e = t.split(/-(?!$)/);
  let n = e[e.length - 1];
  n === "Space" && (n = " ");
  let r, i, o, l;
  for (let s = 0; s < e.length - 1; s += 1) {
    const u = e[s];
    if (/^(cmd|meta|m)$/i.test(u))
      l = !0;
    else if (/^a(lt)?$/i.test(u))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(u))
      i = !0;
    else if (/^s(hift)?$/i.test(u))
      o = !0;
    else if (/^mod$/i.test(u))
      Zi() || Za() ? l = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${u}`);
  }
  return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), l && (n = `Meta-${n}`), o && (n = `Shift-${n}`), n;
}
const Wp = (t) => ({ editor: e, view: n, tr: r, dispatch: i }) => {
  const o = Up(t).split(/-(?!$)/), l = o.find((a) => !["Alt", "Ctrl", "Meta", "Shift"].includes(a)), s = new KeyboardEvent("keydown", {
    key: l === "Space" ? " " : l,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), u = e.captureTransaction(() => {
    n.someProp("handleKeyDown", (a) => a(n, s));
  });
  return u == null || u.steps.forEach((a) => {
    const c = a.map(r.mapping);
    c && i && r.maybeStep(c);
  }), !0;
};
function es(t, e, n = {}) {
  const { from: r, to: i, empty: o } = t.selection, l = e ? de(e, t.schema) : null, s = [];
  t.doc.nodesBetween(r, i, (f, p) => {
    if (f.isText)
      return;
    const g = Math.max(r, p), y = Math.min(i, p + f.nodeSize);
    s.push({
      node: f,
      from: g,
      to: y
    });
  });
  const u = i - r, a = s.filter((f) => l ? l.name === f.node.type.name : !0).filter((f) => Ei(f.node.attrs, n, { strict: !1 }));
  return o ? !!a.length : a.reduce((f, p) => f + p.to - p.from, 0) >= u;
}
const Hp = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = de(t, n.schema);
  return es(n, i, e) ? Wd(n, r) : !1;
}, Jp = () => ({ state: t, dispatch: e }) => Kd(t, e), Qp = (t) => ({ state: e, dispatch: n }) => {
  const r = de(t, e.schema);
  return tp(r)(e, n);
}, Kp = () => ({ state: t, dispatch: e }) => Hd(t, e);
function qa(t, e) {
  return e.nodes[t] ? "node" : e.marks[t] ? "mark" : null;
}
function cu(t, e) {
  const n = typeof e == "string" ? [e] : e;
  return Object.keys(t).reduce((r, i) => (n.includes(i) || (r[i] = t[i]), r), {});
}
const Yp = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, l = null;
  const s = qa(typeof t == "string" ? t : t.name, r.schema);
  return s ? (s === "node" && (o = de(t, r.schema)), s === "mark" && (l = Rt(t, r.schema)), i && n.selection.ranges.forEach((u) => {
    r.doc.nodesBetween(u.$from.pos, u.$to.pos, (a, c) => {
      o && o === a.type && n.setNodeMarkup(c, void 0, cu(a.attrs, e)), l && a.marks.length && a.marks.forEach((f) => {
        l === f.type && n.addMark(c, c + a.nodeSize, l.create(cu(f.attrs, e)));
      });
    });
  }), !0) : !1;
}, Gp = () => ({ tr: t, dispatch: e }) => (e && t.scrollIntoView(), !0), Xp = () => ({ tr: t, commands: e }) => e.setTextSelection({
  from: 0,
  to: t.doc.content.size
}), Zp = () => ({ state: t, dispatch: e }) => Bd(t, e), qp = () => ({ state: t, dispatch: e }) => jd(t, e), bp = () => ({ state: t, dispatch: e }) => Yd(t, e), eh = () => ({ state: t, dispatch: e }) => Zd(t, e), th = () => ({ state: t, dispatch: e }) => Xd(t, e);
function nh(t, e, n = {}) {
  return Ni(t, e, { slice: !1, parseOptions: n });
}
const rh = (t, e = !1, n = {}) => ({ tr: r, editor: i, dispatch: o }) => {
  const { doc: l } = r, s = nh(t, i.schema, n);
  return o && r.replaceWith(0, l.content.size, s).setMeta("preventUpdate", !e), !0;
};
function ih(t, e) {
  const n = Rt(e, t.schema), { from: r, to: i, empty: o } = t.selection, l = [];
  o ? (t.storedMarks && l.push(...t.storedMarks), l.push(...t.selection.$head.marks())) : t.doc.nodesBetween(r, i, (u) => {
    l.push(...u.marks);
  });
  const s = l.find((u) => u.type.name === n.name);
  return s ? { ...s.attrs } : {};
}
function oh(t) {
  for (let e = 0; e < t.edgeCount; e += 1) {
    const { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
function lh(t, e) {
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n);
    if (e(r))
      return {
        pos: n > 0 ? t.before(n) : 0,
        start: t.start(n),
        depth: n,
        node: r
      };
  }
}
function ts(t) {
  return (e) => lh(e.$from, t);
}
function li(t, e, n) {
  return Object.fromEntries(Object.entries(n).filter(([r]) => {
    const i = t.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function sh(t, e, n = {}) {
  const { empty: r, ranges: i } = t.selection, o = e ? Rt(e, t.schema) : null;
  if (r)
    return !!(t.storedMarks || t.selection.$from.marks()).filter((f) => o ? o.name === f.type.name : !0).find((f) => Ei(f.attrs, n, { strict: !1 }));
  let l = 0;
  const s = [];
  if (i.forEach(({ $from: f, $to: p }) => {
    const g = f.pos, y = p.pos;
    t.doc.nodesBetween(g, y, (v, E) => {
      if (!v.isText && !v.marks.length)
        return;
      const h = Math.max(g, E), d = Math.min(y, E + v.nodeSize), m = d - h;
      l += m, s.push(...v.marks.map((w) => ({
        mark: w,
        from: h,
        to: d
      })));
    });
  }), l === 0)
    return !1;
  const u = s.filter((f) => o ? o.name === f.mark.type.name : !0).filter((f) => Ei(f.mark.attrs, n, { strict: !1 })).reduce((f, p) => f + p.to - p.from, 0), a = s.filter((f) => o ? f.mark.type !== o && f.mark.type.excludes(o) : !0).reduce((f, p) => f + p.to - p.from, 0);
  return (u > 0 ? u + a : u) >= l;
}
function fu(t, e) {
  const { nodeExtensions: n } = lp(e), r = n.find((l) => l.name === t);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = Qe(Pe(r, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function uh(t, e, n) {
  var r;
  const { selection: i } = e;
  let o = null;
  if (Ga(i) && (o = i.$cursor), o) {
    const s = (r = t.storedMarks) !== null && r !== void 0 ? r : o.marks();
    return !!n.isInSet(s) || !s.some((u) => u.type.excludes(n));
  }
  const { ranges: l } = i;
  return l.some(({ $from: s, $to: u }) => {
    let a = s.depth === 0 ? t.doc.inlineContent && t.doc.type.allowsMarkType(n) : !1;
    return t.doc.nodesBetween(s.pos, u.pos, (c, f, p) => {
      if (a)
        return !1;
      if (c.isInline) {
        const g = !p || p.type.allowsMarkType(n), y = !!n.isInSet(c.marks) || !c.marks.some((v) => v.type.excludes(n));
        a = g && y;
      }
      return !a;
    }), a;
  });
}
const ah = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: o } = n, { empty: l, ranges: s } = o, u = Rt(t, r.schema);
  if (i)
    if (l) {
      const a = ih(r, u);
      n.addStoredMark(u.create({
        ...a,
        ...e
      }));
    } else
      s.forEach((a) => {
        const c = a.$from.pos, f = a.$to.pos;
        r.doc.nodesBetween(c, f, (p, g) => {
          const y = Math.max(g, c), v = Math.min(g + p.nodeSize, f);
          p.marks.find((h) => h.type === u) ? p.marks.forEach((h) => {
            u === h.type && n.addMark(y, v, u.create({
              ...h.attrs,
              ...e
            }));
          }) : n.addMark(y, v, u.create(e));
        });
      });
  return uh(r, n, u);
}, ch = (t, e) => ({ tr: n }) => (n.setMeta(t, e), !0), fh = (t, e = {}) => ({ state: n, dispatch: r, chain: i }) => {
  const o = de(t, n.schema);
  return o.isTextblock ? i().command(({ commands: l }) => su(o, e)(n) ? !0 : l.clearNodes()).command(({ state: l }) => su(o, e)(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, dh = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, i = Ht(t, 0, r.content.size), o = $.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, ph = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, { from: i, to: o } = typeof t == "number" ? { from: t, to: t } : t, l = Q.atStart(r).from, s = Q.atEnd(r).to, u = Ht(i, l, s), a = Ht(o, l, s), c = Q.create(r, u, a);
    e.setSelection(c);
  }
  return !0;
}, hh = (t) => ({ state: e, dispatch: n }) => {
  const r = de(t, e.schema);
  return ip(r)(e, n);
};
function du(t, e) {
  const n = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
  if (n) {
    const r = n.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    t.tr.ensureMarks(r);
  }
}
const mh = ({ keepMarks: t = !0 } = {}) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  const { selection: o, doc: l } = e, { $from: s, $to: u } = o, a = i.extensionManager.attributes, c = li(a, s.node().type.name, s.node().attrs);
  if (o instanceof $ && o.node.isBlock)
    return !s.parentOffset || !wn(l, s.pos) ? !1 : (r && (t && du(n, i.extensionManager.splittableMarks), e.split(s.pos).scrollIntoView()), !0);
  if (!s.parent.isBlock)
    return !1;
  if (r) {
    const f = u.parentOffset === u.parent.content.size;
    o instanceof Q && e.deleteSelection();
    const p = s.depth === 0 ? void 0 : oh(s.node(-1).contentMatchAt(s.indexAfter(-1)));
    let g = f && p ? [
      {
        type: p,
        attrs: c
      }
    ] : void 0, y = wn(e.doc, e.mapping.map(s.pos), 1, g);
    if (!g && !y && wn(e.doc, e.mapping.map(s.pos), 1, p ? [{ type: p }] : void 0) && (y = !0, g = p ? [
      {
        type: p,
        attrs: c
      }
    ] : void 0), y && (e.split(e.mapping.map(s.pos), 1, g), p && !f && !s.parentOffset && s.parent.type !== p)) {
      const v = e.mapping.map(s.before()), E = e.doc.resolve(v);
      s.node(-1).canReplaceWith(E.index(), E.index() + 1, p) && e.setNodeMarkup(e.mapping.map(s.before()), p);
    }
    t && du(n, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return !0;
}, gh = (t) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  var o;
  const l = de(t, n.schema), { $from: s, $to: u } = n.selection, a = n.selection.node;
  if (a && a.isBlock || s.depth < 2 || !s.sameParent(u))
    return !1;
  const c = s.node(-1);
  if (c.type !== l)
    return !1;
  const f = i.extensionManager.attributes;
  if (s.parent.content.size === 0 && s.node(-1).childCount === s.indexAfter(-1)) {
    if (s.depth === 2 || s.node(-3).type !== l || s.index(-2) !== s.node(-2).childCount - 1)
      return !1;
    if (r) {
      let E = P.empty;
      const h = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
      for (let C = s.depth - h; C >= s.depth - 3; C -= 1)
        E = P.from(s.node(C).copy(E));
      const d = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3, m = li(f, s.node().type.name, s.node().attrs), w = ((o = l.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(m)) || void 0;
      E = E.append(P.from(l.createAndFill(null, w) || void 0));
      const S = s.before(s.depth - (h - 1));
      e.replace(S, s.after(-d), new z(E, 4 - h, 0));
      let N = -1;
      e.doc.nodesBetween(S, e.doc.content.size, (C, x) => {
        if (N > -1)
          return !1;
        C.isTextblock && C.content.size === 0 && (N = x + 1);
      }), N > -1 && e.setSelection(Q.near(e.doc.resolve(N))), e.scrollIntoView();
    }
    return !0;
  }
  const p = u.pos === s.end() ? c.contentMatchAt(0).defaultType : null, g = li(f, c.type.name, c.attrs), y = li(f, s.node().type.name, s.node().attrs);
  e.delete(s.pos, u.pos);
  const v = p ? [
    { type: l, attrs: g },
    { type: p, attrs: y }
  ] : [{ type: l, attrs: g }];
  if (!wn(e.doc, s.pos, 2))
    return !1;
  if (r) {
    const { selection: E, storedMarks: h } = n, { splittableMarks: d } = i.extensionManager, m = h || E.$to.parentOffset && E.$from.marks();
    if (e.split(s.pos, 2, v).scrollIntoView(), !m || !r)
      return !0;
    const w = m.filter((S) => d.includes(S.type.name));
    e.ensureMarks(w);
  }
  return !0;
}, No = (t, e) => {
  const n = ts((l) => l.type === e)(t.selection);
  if (!n)
    return !0;
  const r = t.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0)
    return !0;
  const i = t.doc.nodeAt(r);
  return n.node.type === (i == null ? void 0 : i.type) && tn(t.doc, n.pos) && t.join(n.pos), !0;
}, Co = (t, e) => {
  const n = ts((l) => l.type === e)(t.selection);
  if (!n)
    return !0;
  const r = t.doc.resolve(n.start).after(n.depth);
  if (r === void 0)
    return !0;
  const i = t.doc.nodeAt(r);
  return n.node.type === (i == null ? void 0 : i.type) && tn(t.doc, r) && t.join(r), !0;
}, yh = (t, e, n, r = {}) => ({ editor: i, tr: o, state: l, dispatch: s, chain: u, commands: a, can: c }) => {
  const { extensions: f, splittableMarks: p } = i.extensionManager, g = de(t, l.schema), y = de(e, l.schema), { selection: v, storedMarks: E } = l, { $from: h, $to: d } = v, m = h.blockRange(d), w = E || v.$to.parentOffset && v.$from.marks();
  if (!m)
    return !1;
  const S = ts((N) => fu(N.type.name, f))(v);
  if (m.depth >= 1 && S && m.depth - S.depth <= 1) {
    if (S.node.type === g)
      return a.liftListItem(y);
    if (fu(S.node.type.name, f) && g.validContent(S.node.content) && s)
      return u().command(() => (o.setNodeMarkup(S.pos, g), !0)).command(() => No(o, g)).command(() => Co(o, g)).run();
  }
  return !n || !w || !s ? u().command(() => c().wrapInList(g, r) ? !0 : a.clearNodes()).wrapInList(g, r).command(() => No(o, g)).command(() => Co(o, g)).run() : u().command(() => {
    const N = c().wrapInList(g, r), C = w.filter((x) => p.includes(x.type.name));
    return o.ensureMarks(C), N ? !0 : a.clearNodes();
  }).wrapInList(g, r).command(() => No(o, g)).command(() => Co(o, g)).run();
}, vh = (t, e = {}, n = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = n, l = Rt(t, r.schema);
  return sh(r, l, e) ? i.unsetMark(l, { extendEmptyMarkRange: o }) : i.setMark(l, e);
}, wh = (t, e, n = {}) => ({ state: r, commands: i }) => {
  const o = de(t, r.schema), l = de(e, r.schema);
  return es(r, o, n) ? i.setNode(l) : i.setNode(o, n);
}, kh = (t, e = {}) => ({ state: n, commands: r }) => {
  const i = de(t, n.schema);
  return es(n, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Sh = () => ({ state: t, dispatch: e }) => {
  const n = t.plugins;
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(t))) {
      if (e) {
        const l = t.tr, s = o.transform;
        for (let u = s.steps.length - 1; u >= 0; u -= 1)
          l.step(s.steps[u].invert(s.docs[u]));
        if (o.text) {
          const u = l.doc.resolve(o.from).marks();
          l.replaceWith(o.from, o.to, t.schema.text(o.text, u));
        } else
          l.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, xh = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, { empty: r, ranges: i } = n;
  return r || e && i.forEach((o) => {
    t.removeMark(o.$from.pos, o.$to.pos);
  }), !0;
}, Eh = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: l = !1 } = e, { selection: s } = n, u = Rt(t, r.schema), { $from: a, empty: c, ranges: f } = s;
  if (!i)
    return !0;
  if (c && l) {
    let { from: p, to: g } = s;
    const y = (o = a.marks().find((E) => E.type === u)) === null || o === void 0 ? void 0 : o.attrs, v = Ya(a, u, y);
    v && (p = v.from, g = v.to), n.removeMark(p, g, u);
  } else
    f.forEach((p) => {
      n.removeMark(p.$from.pos, p.$to.pos, u);
    });
  return n.removeStoredMark(u), !0;
}, Nh = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, l = null;
  const s = qa(typeof t == "string" ? t : t.name, r.schema);
  return s ? (s === "node" && (o = de(t, r.schema)), s === "mark" && (l = Rt(t, r.schema)), i && n.selection.ranges.forEach((u) => {
    const a = u.$from.pos, c = u.$to.pos;
    r.doc.nodesBetween(a, c, (f, p) => {
      o && o === f.type && n.setNodeMarkup(p, void 0, {
        ...f.attrs,
        ...e
      }), l && f.marks.length && f.marks.forEach((g) => {
        if (l === g.type) {
          const y = Math.max(p, a), v = Math.min(p + f.nodeSize, c);
          n.addMark(y, v, l.create({
            ...g.attrs,
            ...e
          }));
        }
      });
    });
  }), !0) : !1;
}, Ch = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = de(t, n.schema);
  return qd(i, e)(n, r);
}, _h = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = de(t, n.schema);
  return bd(i, e)(n, r);
};
var Mh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: dp,
  clearContent: pp,
  clearNodes: hp,
  command: mp,
  createParagraphNear: gp,
  cut: yp,
  deleteCurrentNode: vp,
  deleteNode: wp,
  deleteRange: kp,
  deleteSelection: Sp,
  enter: xp,
  exitCode: Ep,
  extendMarkRange: Cp,
  first: _p,
  focus: Tp,
  forEach: Pp,
  insertContent: zp,
  insertContentAt: Rp,
  joinUp: Fp,
  joinDown: Lp,
  joinBackward: Ap,
  joinForward: Dp,
  joinItemBackward: Bp,
  joinItemForward: $p,
  joinTextblockBackward: jp,
  joinTextblockForward: Vp,
  keyboardShortcut: Wp,
  lift: Hp,
  liftEmptyBlock: Jp,
  liftListItem: Qp,
  newlineInCode: Kp,
  resetAttributes: Yp,
  scrollIntoView: Gp,
  selectAll: Xp,
  selectNodeBackward: Zp,
  selectNodeForward: qp,
  selectParentNode: bp,
  selectTextblockEnd: eh,
  selectTextblockStart: th,
  setContent: rh,
  setMark: ah,
  setMeta: ch,
  setNode: fh,
  setNodeSelection: dh,
  setTextSelection: ph,
  sinkListItem: hh,
  splitBlock: mh,
  splitListItem: gh,
  toggleList: yh,
  toggleMark: vh,
  toggleNode: wh,
  toggleWrap: kh,
  undoInputRule: Sh,
  unsetAllMarks: xh,
  unsetMark: Eh,
  updateAttributes: Nh,
  wrapIn: Ch,
  wrapInList: _h
});
st.create({
  name: "commands",
  addCommands() {
    return {
      ...Mh
    };
  }
});
st.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new zr({
        key: new Ir("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
});
st.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: t } = this;
    return [
      new zr({
        key: new Ir("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (e, n) => {
              t.isFocused = !0;
              const r = t.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, n) => {
              t.isFocused = !1;
              const r = t.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
});
st.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const t = () => this.editor.commands.first(({ commands: l }) => [
      () => l.undoInputRule(),
      // maybe convert first text block node to default node
      () => l.command(({ tr: s }) => {
        const { selection: u, doc: a } = s, { empty: c, $anchor: f } = u, { pos: p, parent: g } = f, y = f.parent.isTextblock ? s.doc.resolve(p - 1) : f, v = y.parent.type.spec.isolating, E = f.pos - f.parentOffset, h = v && y.parent.childCount === 1 ? E === f.pos : B.atStart(a).from === p;
        return !c || !h || !g.type.isTextblock || g.textContent.length ? !1 : l.clearNodes();
      }),
      () => l.deleteSelection(),
      () => l.joinBackward(),
      () => l.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: l }) => [
      () => l.deleteSelection(),
      () => l.deleteCurrentNode(),
      () => l.joinForward(),
      () => l.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: l }) => [
        () => l.newlineInCode(),
        () => l.createParagraphNear(),
        () => l.liftEmptyBlock(),
        () => l.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: t,
      "Mod-Backspace": t,
      "Shift-Backspace": t,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, o = {
      ...r,
      "Ctrl-h": t,
      "Alt-Backspace": t,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Zi() || Za() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new zr({
        key: new Ir("clearDocument"),
        appendTransaction: (t, e, n) => {
          if (!(t.some((y) => y.docChanged) && !e.doc.eq(n.doc)))
            return;
          const { empty: i, from: o, to: l } = e.selection, s = B.atStart(e.doc).from, u = B.atEnd(e.doc).to;
          if (i || !(o === s && l === u) || !(n.doc.textBetween(0, n.doc.content.size, " ", " ").length === 0))
            return;
          const f = n.tr, p = Ka({
            state: n,
            transaction: f
          }), { commands: g } = new op({
            editor: this.editor,
            state: p
          });
          if (g.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
});
st.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new zr({
        key: new Ir("tabindex"),
        props: {
          attributes: this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class dr {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = Qe(Pe(this, "addOptions", {
      name: this.name
    }))), this.storage = Qe(Pe(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new dr(e);
  }
  configure(e = {}) {
    const n = this.extend();
    return n.options = bl(this.options, e), n.storage = Qe(Pe(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
  extend(e = {}) {
    const n = new dr({ ...this.config, ...e });
    return n.parent = this, this.child = n, n.name = e.name ? e.name : n.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = Qe(Pe(n, "addOptions", {
      name: n.name
    })), n.storage = Qe(Pe(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
}
function Th() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
class Ph {
  constructor(e, n, r) {
    this.isDragging = !1, this.component = e, this.editor = n.editor, this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...r
    }, this.extension = n.extension, this.node = n.node, this.decorations = n.decorations, this.getPos = n.getPos, this.mount();
  }
  mount() {
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  onDragStart(e) {
    var n, r, i, o, l, s, u;
    const { view: a } = this.editor, c = e.target, f = c.nodeType === 3 ? (n = c.parentElement) === null || n === void 0 ? void 0 : n.closest("[data-drag-handle]") : c.closest("[data-drag-handle]");
    if (!this.dom || !((r = this.contentDOM) === null || r === void 0) && r.contains(c) || !f)
      return;
    let p = 0, g = 0;
    if (this.dom !== f) {
      const E = this.dom.getBoundingClientRect(), h = f.getBoundingClientRect(), d = (i = e.offsetX) !== null && i !== void 0 ? i : (o = e.nativeEvent) === null || o === void 0 ? void 0 : o.offsetX, m = (l = e.offsetY) !== null && l !== void 0 ? l : (s = e.nativeEvent) === null || s === void 0 ? void 0 : s.offsetY;
      p = h.x - E.x + d, g = h.y - E.y + m;
    }
    (u = e.dataTransfer) === null || u === void 0 || u.setDragImage(this.dom, p, g);
    const y = $.create(a.state.doc, this.getPos()), v = a.state.tr.setSelection(y);
    a.dispatch(v);
  }
  stopEvent(e) {
    var n;
    if (!this.dom)
      return !1;
    if (typeof this.options.stopEvent == "function")
      return this.options.stopEvent({ event: e });
    const r = e.target;
    if (!(this.dom.contains(r) && !(!((n = this.contentDOM) === null || n === void 0) && n.contains(r))))
      return !1;
    const o = e.type.startsWith("drag"), l = e.type === "drop";
    if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(r.tagName) || r.isContentEditable) && !l && !o)
      return !0;
    const { isEditable: u } = this.editor, { isDragging: a } = this, c = !!this.node.type.spec.draggable, f = $.isSelectable(this.node), p = e.type === "copy", g = e.type === "paste", y = e.type === "cut", v = e.type === "mousedown";
    if (!c && f && o && e.preventDefault(), c && o && !a)
      return e.preventDefault(), !1;
    if (c && u && !a && v) {
      const E = r.closest("[data-drag-handle]");
      E && (this.dom === E || this.dom.contains(E)) && (this.isDragging = !0, document.addEventListener("dragend", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("drop", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("mouseup", () => {
        this.isDragging = !1;
      }, { once: !0 }));
    }
    return !(a || l || p || g || y || v && f);
  }
  ignoreMutation(e) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: e }) : this.node.isLeaf || this.node.isAtom ? !0 : e.type === "selection" || this.dom.contains(e.target) && e.type === "childList" && (Zi() || Th()) && this.editor.isFocused && [
      ...Array.from(e.addedNodes),
      ...Array.from(e.removedNodes)
    ].every((r) => r.isContentEditable) ? !1 : this.contentDOM === e.target && e.type === "attributes" ? !0 : !this.contentDOM.contains(e.target);
  }
  updateAttributes(e) {
    this.editor.commands.command(({ tr: n }) => {
      const r = this.getPos();
      return n.setNodeMarkup(r, void 0, {
        ...this.node.attrs,
        ...e
      }), !0;
    });
  }
  deleteNode() {
    const e = this.getPos(), n = e + this.node.nodeSize;
    this.editor.commands.deleteRange({ from: e, to: n });
  }
}
function ba(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ec = { exports: {} }, F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Or = Symbol.for("react.element"), zh = Symbol.for("react.portal"), Ih = Symbol.for("react.fragment"), Oh = Symbol.for("react.strict_mode"), Rh = Symbol.for("react.profiler"), Fh = Symbol.for("react.provider"), Lh = Symbol.for("react.context"), Ah = Symbol.for("react.forward_ref"), Dh = Symbol.for("react.suspense"), Bh = Symbol.for("react.memo"), $h = Symbol.for("react.lazy"), pu = Symbol.iterator;
function jh(t) {
  return t === null || typeof t != "object" ? null : (t = pu && t[pu] || t["@@iterator"], typeof t == "function" ? t : null);
}
var tc = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, nc = Object.assign, rc = {};
function Ln(t, e, n) {
  this.props = t, this.context = e, this.refs = rc, this.updater = n || tc;
}
Ln.prototype.isReactComponent = {};
Ln.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
Ln.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function ic() {
}
ic.prototype = Ln.prototype;
function ns(t, e, n) {
  this.props = t, this.context = e, this.refs = rc, this.updater = n || tc;
}
var rs = ns.prototype = new ic();
rs.constructor = ns;
nc(rs, Ln.prototype);
rs.isPureReactComponent = !0;
var hu = Array.isArray, oc = Object.prototype.hasOwnProperty, is = { current: null }, lc = { key: !0, ref: !0, __self: !0, __source: !0 };
function sc(t, e, n) {
  var r, i = {}, o = null, l = null;
  if (e != null)
    for (r in e.ref !== void 0 && (l = e.ref), e.key !== void 0 && (o = "" + e.key), e)
      oc.call(e, r) && !lc.hasOwnProperty(r) && (i[r] = e[r]);
  var s = arguments.length - 2;
  if (s === 1)
    i.children = n;
  else if (1 < s) {
    for (var u = Array(s), a = 0; a < s; a++)
      u[a] = arguments[a + 2];
    i.children = u;
  }
  if (t && t.defaultProps)
    for (r in s = t.defaultProps, s)
      i[r] === void 0 && (i[r] = s[r]);
  return { $$typeof: Or, type: t, key: o, ref: l, props: i, _owner: is.current };
}
function Vh(t, e) {
  return { $$typeof: Or, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function ls(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Or;
}
function Uh(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(n) {
    return e[n];
  });
}
var mu = /\/+/g;
function _o(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? Uh("" + t.key) : e.toString(36);
}
function si(t, e, n, r, i) {
  var o = typeof t;
  (o === "undefined" || o === "boolean") && (t = null);
  var l = !1;
  if (t === null)
    l = !0;
  else
    switch (o) {
      case "string":
      case "number":
        l = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case Or:
          case zh:
            l = !0;
        }
    }
  if (l)
    return l = t, i = i(l), t = r === "" ? "." + _o(l, 0) : r, hu(i) ? (n = "", t != null && (n = t.replace(mu, "$&/") + "/"), si(i, e, n, "", function(a) {
      return a;
    })) : i != null && (ls(i) && (i = Vh(i, n + (!i.key || l && l.key === i.key ? "" : ("" + i.key).replace(mu, "$&/") + "/") + t)), e.push(i)), 1;
  if (l = 0, r = r === "" ? "." : r + ":", hu(t))
    for (var s = 0; s < t.length; s++) {
      o = t[s];
      var u = r + _o(o, s);
      l += si(o, e, n, u, i);
    }
  else if (u = jh(t), typeof u == "function")
    for (t = u.call(t), s = 0; !(o = t.next()).done; )
      o = o.value, u = r + _o(o, s++), l += si(o, e, n, u, i);
  else if (o === "object")
    throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return l;
}
function Ur(t, e, n) {
  if (t == null)
    return t;
  var r = [], i = 0;
  return si(t, r, "", "", function(o) {
    return e.call(n, o, i++);
  }), r;
}
function Wh(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(n) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = n);
    }, function(n) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = n);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1)
    return t._result.default;
  throw t._result;
}
var ye = { current: null }, ui = { transition: null }, Hh = { ReactCurrentDispatcher: ye, ReactCurrentBatchConfig: ui, ReactCurrentOwner: is };
function uc() {
  throw Error("act(...) is not supported in production builds of React.");
}
F.Children = { map: Ur, forEach: function(t, e, n) {
  Ur(t, function() {
    e.apply(this, arguments);
  }, n);
}, count: function(t) {
  var e = 0;
  return Ur(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return Ur(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!ls(t))
    throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
F.Component = Ln;
F.Fragment = Ih;
F.Profiler = Rh;
F.PureComponent = ns;
F.StrictMode = Oh;
F.Suspense = Dh;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Hh;
F.act = uc;
F.cloneElement = function(t, e, n) {
  if (t == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var r = nc({}, t.props), i = t.key, o = t.ref, l = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (o = e.ref, l = is.current), e.key !== void 0 && (i = "" + e.key), t.type && t.type.defaultProps)
      var s = t.type.defaultProps;
    for (u in e)
      oc.call(e, u) && !lc.hasOwnProperty(u) && (r[u] = e[u] === void 0 && s !== void 0 ? s[u] : e[u]);
  }
  var u = arguments.length - 2;
  if (u === 1)
    r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var a = 0; a < u; a++)
      s[a] = arguments[a + 2];
    r.children = s;
  }
  return { $$typeof: Or, type: t.type, key: i, ref: o, props: r, _owner: l };
};
F.createContext = function(t) {
  return t = { $$typeof: Lh, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: Fh, _context: t }, t.Consumer = t;
};
F.createElement = sc;
F.createFactory = function(t) {
  var e = sc.bind(null, t);
  return e.type = t, e;
};
F.createRef = function() {
  return { current: null };
};
F.forwardRef = function(t) {
  return { $$typeof: Ah, render: t };
};
F.isValidElement = ls;
F.lazy = function(t) {
  return { $$typeof: $h, _payload: { _status: -1, _result: t }, _init: Wh };
};
F.memo = function(t, e) {
  return { $$typeof: Bh, type: t, compare: e === void 0 ? null : e };
};
F.startTransition = function(t) {
  var e = ui.transition;
  ui.transition = {};
  try {
    t();
  } finally {
    ui.transition = e;
  }
};
F.unstable_act = uc;
F.useCallback = function(t, e) {
  return ye.current.useCallback(t, e);
};
F.useContext = function(t) {
  return ye.current.useContext(t);
};
F.useDebugValue = function() {
};
F.useDeferredValue = function(t) {
  return ye.current.useDeferredValue(t);
};
F.useEffect = function(t, e) {
  return ye.current.useEffect(t, e);
};
F.useId = function() {
  return ye.current.useId();
};
F.useImperativeHandle = function(t, e, n) {
  return ye.current.useImperativeHandle(t, e, n);
};
F.useInsertionEffect = function(t, e) {
  return ye.current.useInsertionEffect(t, e);
};
F.useLayoutEffect = function(t, e) {
  return ye.current.useLayoutEffect(t, e);
};
F.useMemo = function(t, e) {
  return ye.current.useMemo(t, e);
};
F.useReducer = function(t, e, n) {
  return ye.current.useReducer(t, e, n);
};
F.useRef = function(t) {
  return ye.current.useRef(t);
};
F.useState = function(t) {
  return ye.current.useState(t);
};
F.useSyncExternalStore = function(t, e, n) {
  return ye.current.useSyncExternalStore(t, e, n);
};
F.useTransition = function() {
  return ye.current.useTransition();
};
F.version = "18.3.1";
ec.exports = F;
var An = ec.exports;
const U = /* @__PURE__ */ ba(An);
var ac = { exports: {} }, Re = {}, cc = { exports: {} }, fc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(t) {
  function e(M, O) {
    var R = M.length;
    M.push(O);
    e:
      for (; 0 < R; ) {
        var X = R - 1 >>> 1, re = M[X];
        if (0 < i(re, O))
          M[X] = O, M[R] = re, R = X;
        else
          break e;
      }
  }
  function n(M) {
    return M.length === 0 ? null : M[0];
  }
  function r(M) {
    if (M.length === 0)
      return null;
    var O = M[0], R = M.pop();
    if (R !== O) {
      M[0] = R;
      e:
        for (var X = 0, re = M.length, Dr = re >>> 1; X < Dr; ) {
          var Dt = 2 * (X + 1) - 1, go = M[Dt], Bt = Dt + 1, Br = M[Bt];
          if (0 > i(go, R))
            Bt < re && 0 > i(Br, go) ? (M[X] = Br, M[Bt] = R, X = Bt) : (M[X] = go, M[Dt] = R, X = Dt);
          else if (Bt < re && 0 > i(Br, R))
            M[X] = Br, M[Bt] = R, X = Bt;
          else
            break e;
        }
    }
    return O;
  }
  function i(M, O) {
    var R = M.sortIndex - O.sortIndex;
    return R !== 0 ? R : M.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    t.unstable_now = function() {
      return o.now();
    };
  } else {
    var l = Date, s = l.now();
    t.unstable_now = function() {
      return l.now() - s;
    };
  }
  var u = [], a = [], c = 1, f = null, p = 3, g = !1, y = !1, v = !1, E = typeof setTimeout == "function" ? setTimeout : null, h = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(M) {
    for (var O = n(a); O !== null; ) {
      if (O.callback === null)
        r(a);
      else if (O.startTime <= M)
        r(a), O.sortIndex = O.expirationTime, e(u, O);
      else
        break;
      O = n(a);
    }
  }
  function w(M) {
    if (v = !1, m(M), !y)
      if (n(u) !== null)
        y = !0, ho(S);
      else {
        var O = n(a);
        O !== null && mo(w, O.startTime - M);
      }
  }
  function S(M, O) {
    y = !1, v && (v = !1, h(x), x = -1), g = !0;
    var R = p;
    try {
      for (m(O), f = n(u); f !== null && (!(f.expirationTime > O) || M && !ne()); ) {
        var X = f.callback;
        if (typeof X == "function") {
          f.callback = null, p = f.priorityLevel;
          var re = X(f.expirationTime <= O);
          O = t.unstable_now(), typeof re == "function" ? f.callback = re : f === n(u) && r(u), m(O);
        } else
          r(u);
        f = n(u);
      }
      if (f !== null)
        var Dr = !0;
      else {
        var Dt = n(a);
        Dt !== null && mo(w, Dt.startTime - O), Dr = !1;
      }
      return Dr;
    } finally {
      f = null, p = R, g = !1;
    }
  }
  var N = !1, C = null, x = -1, D = 5, I = -1;
  function ne() {
    return !(t.unstable_now() - I < D);
  }
  function pt() {
    if (C !== null) {
      var M = t.unstable_now();
      I = M;
      var O = !0;
      try {
        O = C(!0, M);
      } finally {
        O ? ht() : (N = !1, C = null);
      }
    } else
      N = !1;
  }
  var ht;
  if (typeof d == "function")
    ht = function() {
      d(pt);
    };
  else if (typeof MessageChannel < "u") {
    var Ve = new MessageChannel(), md = Ve.port2;
    Ve.port1.onmessage = pt, ht = function() {
      md.postMessage(null);
    };
  } else
    ht = function() {
      E(pt, 0);
    };
  function ho(M) {
    C = M, N || (N = !0, ht());
  }
  function mo(M, O) {
    x = E(function() {
      M(t.unstable_now());
    }, O);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(M) {
    M.callback = null;
  }, t.unstable_continueExecution = function() {
    y || g || (y = !0, ho(S));
  }, t.unstable_forceFrameRate = function(M) {
    0 > M || 125 < M ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < M ? Math.floor(1e3 / M) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, t.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, t.unstable_next = function(M) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var O = 3;
        break;
      default:
        O = p;
    }
    var R = p;
    p = O;
    try {
      return M();
    } finally {
      p = R;
    }
  }, t.unstable_pauseExecution = function() {
  }, t.unstable_requestPaint = function() {
  }, t.unstable_runWithPriority = function(M, O) {
    switch (M) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        M = 3;
    }
    var R = p;
    p = M;
    try {
      return O();
    } finally {
      p = R;
    }
  }, t.unstable_scheduleCallback = function(M, O, R) {
    var X = t.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? X + R : X) : R = X, M) {
      case 1:
        var re = -1;
        break;
      case 2:
        re = 250;
        break;
      case 5:
        re = 1073741823;
        break;
      case 4:
        re = 1e4;
        break;
      default:
        re = 5e3;
    }
    return re = R + re, M = { id: c++, callback: O, priorityLevel: M, startTime: R, expirationTime: re, sortIndex: -1 }, R > X ? (M.sortIndex = R, e(a, M), n(u) === null && M === n(a) && (v ? (h(x), x = -1) : v = !0, mo(w, R - X))) : (M.sortIndex = re, e(u, M), y || g || (y = !0, ho(S))), M;
  }, t.unstable_shouldYield = ne, t.unstable_wrapCallback = function(M) {
    var O = p;
    return function() {
      var R = p;
      p = O;
      try {
        return M.apply(this, arguments);
      } finally {
        p = R;
      }
    };
  };
})(fc);
cc.exports = fc;
var Jh = cc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qh = An, Oe = Jh;
function k(t) {
  for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1; n < arguments.length; n++)
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var dc = /* @__PURE__ */ new Set(), pr = {};
function nn(t, e) {
  Mn(t, e), Mn(t + "Capture", e);
}
function Mn(t, e) {
  for (pr[t] = e, t = 0; t < e.length; t++)
    dc.add(e[t]);
}
var ut = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nl = Object.prototype.hasOwnProperty, Kh = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, gu = {}, yu = {};
function Yh(t) {
  return nl.call(yu, t) ? !0 : nl.call(gu, t) ? !1 : Kh.test(t) ? yu[t] = !0 : (gu[t] = !0, !1);
}
function Gh(t, e, n, r) {
  if (n !== null && n.type === 0)
    return !1;
  switch (typeof e) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (t = t.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-");
    default:
      return !1;
  }
}
function Xh(t, e, n, r) {
  if (e === null || typeof e > "u" || Gh(t, e, n, r))
    return !0;
  if (r)
    return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !e;
      case 4:
        return e === !1;
      case 5:
        return isNaN(e);
      case 6:
        return isNaN(e) || 1 > e;
    }
  return !1;
}
function ve(t, e, n, r, i, o, l) {
  this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = o, this.removeEmptyString = l;
}
var ue = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
  ue[t] = new ve(t, 0, !1, t, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
  var e = t[0];
  ue[e] = new ve(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
  ue[t] = new ve(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
  ue[t] = new ve(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
  ue[t] = new ve(t, 3, !1, t.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(t) {
  ue[t] = new ve(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function(t) {
  ue[t] = new ve(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(t) {
  ue[t] = new ve(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function(t) {
  ue[t] = new ve(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var ss = /[\-:]([a-z])/g;
function us(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
  var e = t.replace(
    ss,
    us
  );
  ue[e] = new ve(e, 1, !1, t, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
  var e = t.replace(ss, us);
  ue[e] = new ve(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
  var e = t.replace(ss, us);
  ue[e] = new ve(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(t) {
  ue[t] = new ve(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
ue.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(t) {
  ue[t] = new ve(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
function as(t, e, n, r) {
  var i = ue.hasOwnProperty(e) ? ue[e] : null;
  (i !== null ? i.type !== 0 : r || !(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (Xh(e, n, i, r) && (n = null), r || i === null ? Yh(e) && (n === null ? t.removeAttribute(e) : t.setAttribute(e, "" + n)) : i.mustUseProperty ? t[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (e = i.attributeName, r = i.attributeNamespace, n === null ? t.removeAttribute(e) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n))));
}
var dt = Qh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Wr = Symbol.for("react.element"), sn = Symbol.for("react.portal"), un = Symbol.for("react.fragment"), cs = Symbol.for("react.strict_mode"), rl = Symbol.for("react.profiler"), pc = Symbol.for("react.provider"), hc = Symbol.for("react.context"), fs = Symbol.for("react.forward_ref"), il = Symbol.for("react.suspense"), ol = Symbol.for("react.suspense_list"), ds = Symbol.for("react.memo"), gt = Symbol.for("react.lazy"), mc = Symbol.for("react.offscreen"), vu = Symbol.iterator;
function $n(t) {
  return t === null || typeof t != "object" ? null : (t = vu && t[vu] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Y = Object.assign, Mo;
function Gn(t) {
  if (Mo === void 0)
    try {
      throw Error();
    } catch (n) {
      var e = n.stack.trim().match(/\n( *(at )?)/);
      Mo = e && e[1] || "";
    }
  return `
` + Mo + t;
}
var To = !1;
function Po(t, e) {
  if (!t || To)
    return "";
  To = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (e)
      if (e = function() {
        throw Error();
      }, Object.defineProperty(e.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(e, []);
        } catch (a) {
          var r = a;
        }
        Reflect.construct(t, [], e);
      } else {
        try {
          e.call();
        } catch (a) {
          r = a;
        }
        t.call(e.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      t();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (var i = a.stack.split(`
`), o = r.stack.split(`
`), l = i.length - 1, s = o.length - 1; 1 <= l && 0 <= s && i[l] !== o[s]; )
        s--;
      for (; 1 <= l && 0 <= s; l--, s--)
        if (i[l] !== o[s]) {
          if (l !== 1 || s !== 1)
            do
              if (l--, s--, 0 > s || i[l] !== o[s]) {
                var u = `
` + i[l].replace(" at new ", " at ");
                return t.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", t.displayName)), u;
              }
            while (1 <= l && 0 <= s);
          break;
        }
    }
  } finally {
    To = !1, Error.prepareStackTrace = n;
  }
  return (t = t ? t.displayName || t.name : "") ? Gn(t) : "";
}
function Zh(t) {
  switch (t.tag) {
    case 5:
      return Gn(t.type);
    case 16:
      return Gn("Lazy");
    case 13:
      return Gn("Suspense");
    case 19:
      return Gn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return t = Po(t.type, !1), t;
    case 11:
      return t = Po(t.type.render, !1), t;
    case 1:
      return t = Po(t.type, !0), t;
    default:
      return "";
  }
}
function ll(t) {
  if (t == null)
    return null;
  if (typeof t == "function")
    return t.displayName || t.name || null;
  if (typeof t == "string")
    return t;
  switch (t) {
    case un:
      return "Fragment";
    case sn:
      return "Portal";
    case rl:
      return "Profiler";
    case cs:
      return "StrictMode";
    case il:
      return "Suspense";
    case ol:
      return "SuspenseList";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case hc:
        return (t.displayName || "Context") + ".Consumer";
      case pc:
        return (t._context.displayName || "Context") + ".Provider";
      case fs:
        var e = t.render;
        return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
      case ds:
        return e = t.displayName || null, e !== null ? e : ll(t.type) || "Memo";
      case gt:
        e = t._payload, t = t._init;
        try {
          return ll(t(e));
        } catch {
        }
    }
  return null;
}
function qh(t) {
  var e = t.type;
  switch (t.tag) {
    case 24:
      return "Cache";
    case 9:
      return (e.displayName || "Context") + ".Consumer";
    case 10:
      return (e._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return t = e.render, t = t.displayName || t.name || "", e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return e;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return ll(e);
    case 8:
      return e === cs ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
  }
  return null;
}
function It(t) {
  switch (typeof t) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function gc(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function bh(t) {
  var e = gc(t) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e), r = "" + t[e];
  if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var i = n.get, o = n.set;
    return Object.defineProperty(t, e, { configurable: !0, get: function() {
      return i.call(this);
    }, set: function(l) {
      r = "" + l, o.call(this, l);
    } }), Object.defineProperty(t, e, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(l) {
      r = "" + l;
    }, stopTracking: function() {
      t._valueTracker = null, delete t[e];
    } };
  }
}
function Hr(t) {
  t._valueTracker || (t._valueTracker = bh(t));
}
function yc(t) {
  if (!t)
    return !1;
  var e = t._valueTracker;
  if (!e)
    return !0;
  var n = e.getValue(), r = "";
  return t && (r = gc(t) ? t.checked ? "true" : "false" : t.value), t = r, t !== n ? (e.setValue(t), !0) : !1;
}
function Ci(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u")
    return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
function sl(t, e) {
  var n = e.checked;
  return Y({}, e, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? t._wrapperState.initialChecked });
}
function wu(t, e) {
  var n = e.defaultValue == null ? "" : e.defaultValue, r = e.checked != null ? e.checked : e.defaultChecked;
  n = It(e.value != null ? e.value : n), t._wrapperState = { initialChecked: r, initialValue: n, controlled: e.type === "checkbox" || e.type === "radio" ? e.checked != null : e.value != null };
}
function vc(t, e) {
  e = e.checked, e != null && as(t, "checked", e, !1);
}
function ul(t, e) {
  vc(t, e);
  var n = It(e.value), r = e.type;
  if (n != null)
    r === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + n) : t.value !== "" + n && (t.value = "" + n);
  else if (r === "submit" || r === "reset") {
    t.removeAttribute("value");
    return;
  }
  e.hasOwnProperty("value") ? al(t, e.type, n) : e.hasOwnProperty("defaultValue") && al(t, e.type, It(e.defaultValue)), e.checked == null && e.defaultChecked != null && (t.defaultChecked = !!e.defaultChecked);
}
function ku(t, e, n) {
  if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
    var r = e.type;
    if (!(r !== "submit" && r !== "reset" || e.value !== void 0 && e.value !== null))
      return;
    e = "" + t._wrapperState.initialValue, n || e === t.value || (t.value = e), t.defaultValue = e;
  }
  n = t.name, n !== "" && (t.name = ""), t.defaultChecked = !!t._wrapperState.initialChecked, n !== "" && (t.name = n);
}
function al(t, e, n) {
  (e !== "number" || Ci(t.ownerDocument) !== t) && (n == null ? t.defaultValue = "" + t._wrapperState.initialValue : t.defaultValue !== "" + n && (t.defaultValue = "" + n));
}
var Xn = Array.isArray;
function kn(t, e, n, r) {
  if (t = t.options, e) {
    e = {};
    for (var i = 0; i < n.length; i++)
      e["$" + n[i]] = !0;
    for (n = 0; n < t.length; n++)
      i = e.hasOwnProperty("$" + t[n].value), t[n].selected !== i && (t[n].selected = i), i && r && (t[n].defaultSelected = !0);
  } else {
    for (n = "" + It(n), e = null, i = 0; i < t.length; i++) {
      if (t[i].value === n) {
        t[i].selected = !0, r && (t[i].defaultSelected = !0);
        return;
      }
      e !== null || t[i].disabled || (e = t[i]);
    }
    e !== null && (e.selected = !0);
  }
}
function cl(t, e) {
  if (e.dangerouslySetInnerHTML != null)
    throw Error(k(91));
  return Y({}, e, { value: void 0, defaultValue: void 0, children: "" + t._wrapperState.initialValue });
}
function Su(t, e) {
  var n = e.value;
  if (n == null) {
    if (n = e.children, e = e.defaultValue, n != null) {
      if (e != null)
        throw Error(k(92));
      if (Xn(n)) {
        if (1 < n.length)
          throw Error(k(93));
        n = n[0];
      }
      e = n;
    }
    e == null && (e = ""), n = e;
  }
  t._wrapperState = { initialValue: It(n) };
}
function wc(t, e) {
  var n = It(e.value), r = It(e.defaultValue);
  n != null && (n = "" + n, n !== t.value && (t.value = n), e.defaultValue == null && t.defaultValue !== n && (t.defaultValue = n)), r != null && (t.defaultValue = "" + r);
}
function xu(t) {
  var e = t.textContent;
  e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
}
function kc(t) {
  switch (t) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function fl(t, e) {
  return t == null || t === "http://www.w3.org/1999/xhtml" ? kc(e) : t === "http://www.w3.org/2000/svg" && e === "foreignObject" ? "http://www.w3.org/1999/xhtml" : t;
}
var Jr, Sc = function(t) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(e, n, r, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return t(e, n, r, i);
    });
  } : t;
}(function(t, e) {
  if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t)
    t.innerHTML = e;
  else {
    for (Jr = Jr || document.createElement("div"), Jr.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>", e = Jr.firstChild; t.firstChild; )
      t.removeChild(t.firstChild);
    for (; e.firstChild; )
      t.appendChild(e.firstChild);
  }
});
function hr(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var tr = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, em = ["Webkit", "ms", "Moz", "O"];
Object.keys(tr).forEach(function(t) {
  em.forEach(function(e) {
    e = e + t.charAt(0).toUpperCase() + t.substring(1), tr[e] = tr[t];
  });
});
function xc(t, e, n) {
  return e == null || typeof e == "boolean" || e === "" ? "" : n || typeof e != "number" || e === 0 || tr.hasOwnProperty(t) && tr[t] ? ("" + e).trim() : e + "px";
}
function Ec(t, e) {
  t = t.style;
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = xc(n, e[n], r);
      n === "float" && (n = "cssFloat"), r ? t.setProperty(n, i) : t[n] = i;
    }
}
var tm = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function dl(t, e) {
  if (e) {
    if (tm[t] && (e.children != null || e.dangerouslySetInnerHTML != null))
      throw Error(k(137, t));
    if (e.dangerouslySetInnerHTML != null) {
      if (e.children != null)
        throw Error(k(60));
      if (typeof e.dangerouslySetInnerHTML != "object" || !("__html" in e.dangerouslySetInnerHTML))
        throw Error(k(61));
    }
    if (e.style != null && typeof e.style != "object")
      throw Error(k(62));
  }
}
function pl(t, e) {
  if (t.indexOf("-") === -1)
    return typeof e.is == "string";
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var hl = null;
function ps(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var ml = null, Sn = null, xn = null;
function Eu(t) {
  if (t = Lr(t)) {
    if (typeof ml != "function")
      throw Error(k(280));
    var e = t.stateNode;
    e && (e = no(e), ml(t.stateNode, t.type, e));
  }
}
function Nc(t) {
  Sn ? xn ? xn.push(t) : xn = [t] : Sn = t;
}
function Cc() {
  if (Sn) {
    var t = Sn, e = xn;
    if (xn = Sn = null, Eu(t), e)
      for (t = 0; t < e.length; t++)
        Eu(e[t]);
  }
}
function _c(t, e) {
  return t(e);
}
function Mc() {
}
var zo = !1;
function Tc(t, e, n) {
  if (zo)
    return t(e, n);
  zo = !0;
  try {
    return _c(t, e, n);
  } finally {
    zo = !1, (Sn !== null || xn !== null) && (Mc(), Cc());
  }
}
function mr(t, e) {
  var n = t.stateNode;
  if (n === null)
    return null;
  var r = no(n);
  if (r === null)
    return null;
  n = r[e];
  e:
    switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (t = t.type, r = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !r;
        break e;
      default:
        t = !1;
    }
  if (t)
    return null;
  if (n && typeof n != "function")
    throw Error(k(231, e, typeof n));
  return n;
}
var gl = !1;
if (ut)
  try {
    var jn = {};
    Object.defineProperty(jn, "passive", { get: function() {
      gl = !0;
    } }), window.addEventListener("test", jn, jn), window.removeEventListener("test", jn, jn);
  } catch {
    gl = !1;
  }
function nm(t, e, n, r, i, o, l, s, u) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    e.apply(n, a);
  } catch (c) {
    this.onError(c);
  }
}
var nr = !1, _i = null, Mi = !1, yl = null, rm = { onError: function(t) {
  nr = !0, _i = t;
} };
function im(t, e, n, r, i, o, l, s, u) {
  nr = !1, _i = null, nm.apply(rm, arguments);
}
function om(t, e, n, r, i, o, l, s, u) {
  if (im.apply(this, arguments), nr) {
    if (nr) {
      var a = _i;
      nr = !1, _i = null;
    } else
      throw Error(k(198));
    Mi || (Mi = !0, yl = a);
  }
}
function rn(t) {
  var e = t, n = t;
  if (t.alternate)
    for (; e.return; )
      e = e.return;
  else {
    t = e;
    do
      e = t, e.flags & 4098 && (n = e.return), t = e.return;
    while (t);
  }
  return e.tag === 3 ? n : null;
}
function Pc(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null)
      return e.dehydrated;
  }
  return null;
}
function Nu(t) {
  if (rn(t) !== t)
    throw Error(k(188));
}
function lm(t) {
  var e = t.alternate;
  if (!e) {
    if (e = rn(t), e === null)
      throw Error(k(188));
    return e !== t ? null : t;
  }
  for (var n = t, r = e; ; ) {
    var i = n.return;
    if (i === null)
      break;
    var o = i.alternate;
    if (o === null) {
      if (r = i.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n)
          return Nu(i), t;
        if (o === r)
          return Nu(i), e;
        o = o.sibling;
      }
      throw Error(k(188));
    }
    if (n.return !== r.return)
      n = i, r = o;
    else {
      for (var l = !1, s = i.child; s; ) {
        if (s === n) {
          l = !0, n = i, r = o;
          break;
        }
        if (s === r) {
          l = !0, r = i, n = o;
          break;
        }
        s = s.sibling;
      }
      if (!l) {
        for (s = o.child; s; ) {
          if (s === n) {
            l = !0, n = o, r = i;
            break;
          }
          if (s === r) {
            l = !0, r = o, n = i;
            break;
          }
          s = s.sibling;
        }
        if (!l)
          throw Error(k(189));
      }
    }
    if (n.alternate !== r)
      throw Error(k(190));
  }
  if (n.tag !== 3)
    throw Error(k(188));
  return n.stateNode.current === n ? t : e;
}
function zc(t) {
  return t = lm(t), t !== null ? Ic(t) : null;
}
function Ic(t) {
  if (t.tag === 5 || t.tag === 6)
    return t;
  for (t = t.child; t !== null; ) {
    var e = Ic(t);
    if (e !== null)
      return e;
    t = t.sibling;
  }
  return null;
}
var Oc = Oe.unstable_scheduleCallback, Cu = Oe.unstable_cancelCallback, sm = Oe.unstable_shouldYield, um = Oe.unstable_requestPaint, Z = Oe.unstable_now, am = Oe.unstable_getCurrentPriorityLevel, hs = Oe.unstable_ImmediatePriority, Rc = Oe.unstable_UserBlockingPriority, Ti = Oe.unstable_NormalPriority, cm = Oe.unstable_LowPriority, Fc = Oe.unstable_IdlePriority, qi = null, et = null;
function fm(t) {
  if (et && typeof et.onCommitFiberRoot == "function")
    try {
      et.onCommitFiberRoot(qi, t, void 0, (t.current.flags & 128) === 128);
    } catch {
    }
}
var Ke = Math.clz32 ? Math.clz32 : hm, dm = Math.log, pm = Math.LN2;
function hm(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (dm(t) / pm | 0) | 0;
}
var Qr = 64, Kr = 4194304;
function Zn(t) {
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return t & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return t;
  }
}
function Pi(t, e) {
  var n = t.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, i = t.suspendedLanes, o = t.pingedLanes, l = n & 268435455;
  if (l !== 0) {
    var s = l & ~i;
    s !== 0 ? r = Zn(s) : (o &= l, o !== 0 && (r = Zn(o)));
  } else
    l = n & ~i, l !== 0 ? r = Zn(l) : o !== 0 && (r = Zn(o));
  if (r === 0)
    return 0;
  if (e !== 0 && e !== r && !(e & i) && (i = r & -r, o = e & -e, i >= o || i === 16 && (o & 4194240) !== 0))
    return e;
  if (r & 4 && (r |= n & 16), e = t.entangledLanes, e !== 0)
    for (t = t.entanglements, e &= r; 0 < e; )
      n = 31 - Ke(e), i = 1 << n, r |= t[n], e &= ~i;
  return r;
}
function mm(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
      return e + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function gm(t, e) {
  for (var n = t.suspendedLanes, r = t.pingedLanes, i = t.expirationTimes, o = t.pendingLanes; 0 < o; ) {
    var l = 31 - Ke(o), s = 1 << l, u = i[l];
    u === -1 ? (!(s & n) || s & r) && (i[l] = mm(s, e)) : u <= e && (t.expiredLanes |= s), o &= ~s;
  }
}
function vl(t) {
  return t = t.pendingLanes & -1073741825, t !== 0 ? t : t & 1073741824 ? 1073741824 : 0;
}
function Lc() {
  var t = Qr;
  return Qr <<= 1, !(Qr & 4194240) && (Qr = 64), t;
}
function Io(t) {
  for (var e = [], n = 0; 31 > n; n++)
    e.push(t);
  return e;
}
function Rr(t, e, n) {
  t.pendingLanes |= e, e !== 536870912 && (t.suspendedLanes = 0, t.pingedLanes = 0), t = t.eventTimes, e = 31 - Ke(e), t[e] = n;
}
function ym(t, e) {
  var n = t.pendingLanes & ~e;
  t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.expiredLanes &= e, t.mutableReadLanes &= e, t.entangledLanes &= e, e = t.entanglements;
  var r = t.eventTimes;
  for (t = t.expirationTimes; 0 < n; ) {
    var i = 31 - Ke(n), o = 1 << i;
    e[i] = 0, r[i] = -1, t[i] = -1, n &= ~o;
  }
}
function ms(t, e) {
  var n = t.entangledLanes |= e;
  for (t = t.entanglements; n; ) {
    var r = 31 - Ke(n), i = 1 << r;
    i & e | t[r] & e && (t[r] |= e), n &= ~i;
  }
}
var A = 0;
function Ac(t) {
  return t &= -t, 1 < t ? 4 < t ? t & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Dc, gs, Bc, $c, jc, wl = !1, Yr = [], xt = null, Et = null, Nt = null, gr = /* @__PURE__ */ new Map(), yr = /* @__PURE__ */ new Map(), vt = [], vm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function _u(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      xt = null;
      break;
    case "dragenter":
    case "dragleave":
      Et = null;
      break;
    case "mouseover":
    case "mouseout":
      Nt = null;
      break;
    case "pointerover":
    case "pointerout":
      gr.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      yr.delete(e.pointerId);
  }
}
function Vn(t, e, n, r, i, o) {
  return t === null || t.nativeEvent !== o ? (t = { blockedOn: e, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, e !== null && (e = Lr(e), e !== null && gs(e)), t) : (t.eventSystemFlags |= r, e = t.targetContainers, i !== null && e.indexOf(i) === -1 && e.push(i), t);
}
function wm(t, e, n, r, i) {
  switch (e) {
    case "focusin":
      return xt = Vn(xt, t, e, n, r, i), !0;
    case "dragenter":
      return Et = Vn(Et, t, e, n, r, i), !0;
    case "mouseover":
      return Nt = Vn(Nt, t, e, n, r, i), !0;
    case "pointerover":
      var o = i.pointerId;
      return gr.set(o, Vn(gr.get(o) || null, t, e, n, r, i)), !0;
    case "gotpointercapture":
      return o = i.pointerId, yr.set(o, Vn(yr.get(o) || null, t, e, n, r, i)), !0;
  }
  return !1;
}
function Vc(t) {
  var e = Jt(t.target);
  if (e !== null) {
    var n = rn(e);
    if (n !== null) {
      if (e = n.tag, e === 13) {
        if (e = Pc(n), e !== null) {
          t.blockedOn = e, jc(t.priority, function() {
            Bc(n);
          });
          return;
        }
      } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function ai(t) {
  if (t.blockedOn !== null)
    return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var n = kl(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var r = new n.constructor(n.type, n);
      hl = r, n.target.dispatchEvent(r), hl = null;
    } else
      return e = Lr(n), e !== null && gs(e), t.blockedOn = n, !1;
    e.shift();
  }
  return !0;
}
function Mu(t, e, n) {
  ai(t) && n.delete(e);
}
function km() {
  wl = !1, xt !== null && ai(xt) && (xt = null), Et !== null && ai(Et) && (Et = null), Nt !== null && ai(Nt) && (Nt = null), gr.forEach(Mu), yr.forEach(Mu);
}
function Un(t, e) {
  t.blockedOn === e && (t.blockedOn = null, wl || (wl = !0, Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, km)));
}
function vr(t) {
  function e(i) {
    return Un(i, t);
  }
  if (0 < Yr.length) {
    Un(Yr[0], t);
    for (var n = 1; n < Yr.length; n++) {
      var r = Yr[n];
      r.blockedOn === t && (r.blockedOn = null);
    }
  }
  for (xt !== null && Un(xt, t), Et !== null && Un(Et, t), Nt !== null && Un(Nt, t), gr.forEach(e), yr.forEach(e), n = 0; n < vt.length; n++)
    r = vt[n], r.blockedOn === t && (r.blockedOn = null);
  for (; 0 < vt.length && (n = vt[0], n.blockedOn === null); )
    Vc(n), n.blockedOn === null && vt.shift();
}
var En = dt.ReactCurrentBatchConfig, zi = !0;
function Sm(t, e, n, r) {
  var i = A, o = En.transition;
  En.transition = null;
  try {
    A = 1, ys(t, e, n, r);
  } finally {
    A = i, En.transition = o;
  }
}
function xm(t, e, n, r) {
  var i = A, o = En.transition;
  En.transition = null;
  try {
    A = 4, ys(t, e, n, r);
  } finally {
    A = i, En.transition = o;
  }
}
function ys(t, e, n, r) {
  if (zi) {
    var i = kl(t, e, n, r);
    if (i === null)
      Vo(t, e, r, Ii, n), _u(t, r);
    else if (wm(i, t, e, n, r))
      r.stopPropagation();
    else if (_u(t, r), e & 4 && -1 < vm.indexOf(t)) {
      for (; i !== null; ) {
        var o = Lr(i);
        if (o !== null && Dc(o), o = kl(t, e, n, r), o === null && Vo(t, e, r, Ii, n), o === i)
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else
      Vo(t, e, r, null, n);
  }
}
var Ii = null;
function kl(t, e, n, r) {
  if (Ii = null, t = ps(r), t = Jt(t), t !== null)
    if (e = rn(t), e === null)
      t = null;
    else if (n = e.tag, n === 13) {
      if (t = Pc(e), t !== null)
        return t;
      t = null;
    } else if (n === 3) {
      if (e.stateNode.current.memoizedState.isDehydrated)
        return e.tag === 3 ? e.stateNode.containerInfo : null;
      t = null;
    } else
      e !== t && (t = null);
  return Ii = t, null;
}
function Uc(t) {
  switch (t) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (am()) {
        case hs:
          return 1;
        case Rc:
          return 4;
        case Ti:
        case cm:
          return 16;
        case Fc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kt = null, vs = null, ci = null;
function Wc() {
  if (ci)
    return ci;
  var t, e = vs, n = e.length, r, i = "value" in kt ? kt.value : kt.textContent, o = i.length;
  for (t = 0; t < n && e[t] === i[t]; t++)
    ;
  var l = n - t;
  for (r = 1; r <= l && e[n - r] === i[o - r]; r++)
    ;
  return ci = i.slice(t, 1 < r ? 1 - r : void 0);
}
function fi(t) {
  var e = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function Gr() {
  return !0;
}
function Tu() {
  return !1;
}
function Fe(t) {
  function e(n, r, i, o, l) {
    this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = l, this.currentTarget = null;
    for (var s in t)
      t.hasOwnProperty(s) && (n = t[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Gr : Tu, this.isPropagationStopped = Tu, this;
  }
  return Y(e.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Gr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Gr);
  }, persist: function() {
  }, isPersistent: Gr }), e;
}
var Dn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
  return t.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ws = Fe(Dn), Fr = Y({}, Dn, { view: 0, detail: 0 }), Em = Fe(Fr), Oo, Ro, Wn, bi = Y({}, Fr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ks, button: 0, buttons: 0, relatedTarget: function(t) {
  return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
}, movementX: function(t) {
  return "movementX" in t ? t.movementX : (t !== Wn && (Wn && t.type === "mousemove" ? (Oo = t.screenX - Wn.screenX, Ro = t.screenY - Wn.screenY) : Ro = Oo = 0, Wn = t), Oo);
}, movementY: function(t) {
  return "movementY" in t ? t.movementY : Ro;
} }), Pu = Fe(bi), Nm = Y({}, bi, { dataTransfer: 0 }), Cm = Fe(Nm), _m = Y({}, Fr, { relatedTarget: 0 }), Fo = Fe(_m), Mm = Y({}, Dn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Tm = Fe(Mm), Pm = Y({}, Dn, { clipboardData: function(t) {
  return "clipboardData" in t ? t.clipboardData : window.clipboardData;
} }), zm = Fe(Pm), Im = Y({}, Dn, { data: 0 }), zu = Fe(Im), Om = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Rm = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Fm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Lm(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = Fm[t]) ? !!e[t] : !1;
}
function ks() {
  return Lm;
}
var Am = Y({}, Fr, { key: function(t) {
  if (t.key) {
    var e = Om[t.key] || t.key;
    if (e !== "Unidentified")
      return e;
  }
  return t.type === "keypress" ? (t = fi(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Rm[t.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ks, charCode: function(t) {
  return t.type === "keypress" ? fi(t) : 0;
}, keyCode: function(t) {
  return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
}, which: function(t) {
  return t.type === "keypress" ? fi(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
} }), Dm = Fe(Am), Bm = Y({}, bi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Iu = Fe(Bm), $m = Y({}, Fr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ks }), jm = Fe($m), Vm = Y({}, Dn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Um = Fe(Vm), Wm = Y({}, bi, {
  deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  },
  deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Hm = Fe(Wm), Jm = [9, 13, 27, 32], Ss = ut && "CompositionEvent" in window, rr = null;
ut && "documentMode" in document && (rr = document.documentMode);
var Qm = ut && "TextEvent" in window && !rr, Hc = ut && (!Ss || rr && 8 < rr && 11 >= rr), Ou = " ", Ru = !1;
function Jc(t, e) {
  switch (t) {
    case "keyup":
      return Jm.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Qc(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var an = !1;
function Km(t, e) {
  switch (t) {
    case "compositionend":
      return Qc(e);
    case "keypress":
      return e.which !== 32 ? null : (Ru = !0, Ou);
    case "textInput":
      return t = e.data, t === Ou && Ru ? null : t;
    default:
      return null;
  }
}
function Ym(t, e) {
  if (an)
    return t === "compositionend" || !Ss && Jc(t, e) ? (t = Wc(), ci = vs = kt = null, an = !1, t) : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
        if (e.char && 1 < e.char.length)
          return e.char;
        if (e.which)
          return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return Hc && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var Gm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Fu(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!Gm[t.type] : e === "textarea";
}
function Kc(t, e, n, r) {
  Nc(r), e = Oi(e, "onChange"), 0 < e.length && (n = new ws("onChange", "change", null, n, r), t.push({ event: n, listeners: e }));
}
var ir = null, wr = null;
function Xm(t) {
  of(t, 0);
}
function eo(t) {
  var e = dn(t);
  if (yc(e))
    return t;
}
function Zm(t, e) {
  if (t === "change")
    return e;
}
var Yc = !1;
if (ut) {
  var Lo;
  if (ut) {
    var Ao = "oninput" in document;
    if (!Ao) {
      var Lu = document.createElement("div");
      Lu.setAttribute("oninput", "return;"), Ao = typeof Lu.oninput == "function";
    }
    Lo = Ao;
  } else
    Lo = !1;
  Yc = Lo && (!document.documentMode || 9 < document.documentMode);
}
function Au() {
  ir && (ir.detachEvent("onpropertychange", Gc), wr = ir = null);
}
function Gc(t) {
  if (t.propertyName === "value" && eo(wr)) {
    var e = [];
    Kc(e, wr, t, ps(t)), Tc(Xm, e);
  }
}
function qm(t, e, n) {
  t === "focusin" ? (Au(), ir = e, wr = n, ir.attachEvent("onpropertychange", Gc)) : t === "focusout" && Au();
}
function bm(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return eo(wr);
}
function e0(t, e) {
  if (t === "click")
    return eo(e);
}
function t0(t, e) {
  if (t === "input" || t === "change")
    return eo(e);
}
function n0(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Ge = typeof Object.is == "function" ? Object.is : n0;
function kr(t, e) {
  if (Ge(t, e))
    return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var n = Object.keys(t), r = Object.keys(e);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!nl.call(e, i) || !Ge(t[i], e[i]))
      return !1;
  }
  return !0;
}
function Du(t) {
  for (; t && t.firstChild; )
    t = t.firstChild;
  return t;
}
function Bu(t, e) {
  var n = Du(t);
  t = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = t + n.textContent.length, t <= e && r >= e)
        return { node: n, offset: e - t };
      t = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Du(n);
  }
}
function Xc(t, e) {
  return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Xc(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
}
function Zc() {
  for (var t = window, e = Ci(); e instanceof t.HTMLIFrameElement; ) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      t = e.contentWindow;
    else
      break;
    e = Ci(t.document);
  }
  return e;
}
function xs(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
function r0(t) {
  var e = Zc(), n = t.focusedElem, r = t.selectionRange;
  if (e !== n && n && n.ownerDocument && Xc(n.ownerDocument.documentElement, n)) {
    if (r !== null && xs(n)) {
      if (e = r.start, t = r.end, t === void 0 && (t = e), "selectionStart" in n)
        n.selectionStart = e, n.selectionEnd = Math.min(t, n.value.length);
      else if (t = (e = n.ownerDocument || document) && e.defaultView || window, t.getSelection) {
        t = t.getSelection();
        var i = n.textContent.length, o = Math.min(r.start, i);
        r = r.end === void 0 ? o : Math.min(r.end, i), !t.extend && o > r && (i = r, r = o, o = i), i = Bu(n, o);
        var l = Bu(
          n,
          r
        );
        i && l && (t.rangeCount !== 1 || t.anchorNode !== i.node || t.anchorOffset !== i.offset || t.focusNode !== l.node || t.focusOffset !== l.offset) && (e = e.createRange(), e.setStart(i.node, i.offset), t.removeAllRanges(), o > r ? (t.addRange(e), t.extend(l.node, l.offset)) : (e.setEnd(l.node, l.offset), t.addRange(e)));
      }
    }
    for (e = [], t = n; t = t.parentNode; )
      t.nodeType === 1 && e.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < e.length; n++)
      t = e[n], t.element.scrollLeft = t.left, t.element.scrollTop = t.top;
  }
}
var i0 = ut && "documentMode" in document && 11 >= document.documentMode, cn = null, Sl = null, or = null, xl = !1;
function $u(t, e, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  xl || cn == null || cn !== Ci(r) || (r = cn, "selectionStart" in r && xs(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), or && kr(or, r) || (or = r, r = Oi(Sl, "onSelect"), 0 < r.length && (e = new ws("onSelect", "select", null, e, n), t.push({ event: e, listeners: r }), e.target = cn)));
}
function Xr(t, e) {
  var n = {};
  return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
}
var fn = { animationend: Xr("Animation", "AnimationEnd"), animationiteration: Xr("Animation", "AnimationIteration"), animationstart: Xr("Animation", "AnimationStart"), transitionend: Xr("Transition", "TransitionEnd") }, Do = {}, qc = {};
ut && (qc = document.createElement("div").style, "AnimationEvent" in window || (delete fn.animationend.animation, delete fn.animationiteration.animation, delete fn.animationstart.animation), "TransitionEvent" in window || delete fn.transitionend.transition);
function to(t) {
  if (Do[t])
    return Do[t];
  if (!fn[t])
    return t;
  var e = fn[t], n;
  for (n in e)
    if (e.hasOwnProperty(n) && n in qc)
      return Do[t] = e[n];
  return t;
}
var bc = to("animationend"), ef = to("animationiteration"), tf = to("animationstart"), nf = to("transitionend"), rf = /* @__PURE__ */ new Map(), ju = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ft(t, e) {
  rf.set(t, e), nn(e, [t]);
}
for (var Bo = 0; Bo < ju.length; Bo++) {
  var $o = ju[Bo], o0 = $o.toLowerCase(), l0 = $o[0].toUpperCase() + $o.slice(1);
  Ft(o0, "on" + l0);
}
Ft(bc, "onAnimationEnd");
Ft(ef, "onAnimationIteration");
Ft(tf, "onAnimationStart");
Ft("dblclick", "onDoubleClick");
Ft("focusin", "onFocus");
Ft("focusout", "onBlur");
Ft(nf, "onTransitionEnd");
Mn("onMouseEnter", ["mouseout", "mouseover"]);
Mn("onMouseLeave", ["mouseout", "mouseover"]);
Mn("onPointerEnter", ["pointerout", "pointerover"]);
Mn("onPointerLeave", ["pointerout", "pointerover"]);
nn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
nn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
nn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
nn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
nn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
nn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var qn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), s0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(qn));
function Vu(t, e, n) {
  var r = t.type || "unknown-event";
  t.currentTarget = n, om(r, e, void 0, t), t.currentTarget = null;
}
function of(t, e) {
  e = (e & 4) !== 0;
  for (var n = 0; n < t.length; n++) {
    var r = t[n], i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (e)
        for (var l = r.length - 1; 0 <= l; l--) {
          var s = r[l], u = s.instance, a = s.currentTarget;
          if (s = s.listener, u !== o && i.isPropagationStopped())
            break e;
          Vu(i, s, a), o = u;
        }
      else
        for (l = 0; l < r.length; l++) {
          if (s = r[l], u = s.instance, a = s.currentTarget, s = s.listener, u !== o && i.isPropagationStopped())
            break e;
          Vu(i, s, a), o = u;
        }
    }
  }
  if (Mi)
    throw t = yl, Mi = !1, yl = null, t;
}
function V(t, e) {
  var n = e[Ml];
  n === void 0 && (n = e[Ml] = /* @__PURE__ */ new Set());
  var r = t + "__bubble";
  n.has(r) || (lf(e, t, 2, !1), n.add(r));
}
function jo(t, e, n) {
  var r = 0;
  e && (r |= 4), lf(n, t, r, e);
}
var Zr = "_reactListening" + Math.random().toString(36).slice(2);
function Sr(t) {
  if (!t[Zr]) {
    t[Zr] = !0, dc.forEach(function(n) {
      n !== "selectionchange" && (s0.has(n) || jo(n, !1, t), jo(n, !0, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[Zr] || (e[Zr] = !0, jo("selectionchange", !1, e));
  }
}
function lf(t, e, n, r) {
  switch (Uc(e)) {
    case 1:
      var i = Sm;
      break;
    case 4:
      i = xm;
      break;
    default:
      i = ys;
  }
  n = i.bind(null, e, n, t), i = void 0, !gl || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (i = !0), r ? i !== void 0 ? t.addEventListener(e, n, { capture: !0, passive: i }) : t.addEventListener(e, n, !0) : i !== void 0 ? t.addEventListener(e, n, { passive: i }) : t.addEventListener(e, n, !1);
}
function Vo(t, e, n, r, i) {
  var o = r;
  if (!(e & 1) && !(e & 2) && r !== null)
    e:
      for (; ; ) {
        if (r === null)
          return;
        var l = r.tag;
        if (l === 3 || l === 4) {
          var s = r.stateNode.containerInfo;
          if (s === i || s.nodeType === 8 && s.parentNode === i)
            break;
          if (l === 4)
            for (l = r.return; l !== null; ) {
              var u = l.tag;
              if ((u === 3 || u === 4) && (u = l.stateNode.containerInfo, u === i || u.nodeType === 8 && u.parentNode === i))
                return;
              l = l.return;
            }
          for (; s !== null; ) {
            if (l = Jt(s), l === null)
              return;
            if (u = l.tag, u === 5 || u === 6) {
              r = o = l;
              continue e;
            }
            s = s.parentNode;
          }
        }
        r = r.return;
      }
  Tc(function() {
    var a = o, c = ps(n), f = [];
    e: {
      var p = rf.get(t);
      if (p !== void 0) {
        var g = ws, y = t;
        switch (t) {
          case "keypress":
            if (fi(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            g = Dm;
            break;
          case "focusin":
            y = "focus", g = Fo;
            break;
          case "focusout":
            y = "blur", g = Fo;
            break;
          case "beforeblur":
          case "afterblur":
            g = Fo;
            break;
          case "click":
            if (n.button === 2)
              break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = Pu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Cm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = jm;
            break;
          case bc:
          case ef:
          case tf:
            g = Tm;
            break;
          case nf:
            g = Um;
            break;
          case "scroll":
            g = Em;
            break;
          case "wheel":
            g = Hm;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = zm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Iu;
        }
        var v = (e & 4) !== 0, E = !v && t === "scroll", h = v ? p !== null ? p + "Capture" : null : p;
        v = [];
        for (var d = a, m; d !== null; ) {
          m = d;
          var w = m.stateNode;
          if (m.tag === 5 && w !== null && (m = w, h !== null && (w = mr(d, h), w != null && v.push(xr(d, w, m)))), E)
            break;
          d = d.return;
        }
        0 < v.length && (p = new g(p, y, null, n, c), f.push({ event: p, listeners: v }));
      }
    }
    if (!(e & 7)) {
      e: {
        if (p = t === "mouseover" || t === "pointerover", g = t === "mouseout" || t === "pointerout", p && n !== hl && (y = n.relatedTarget || n.fromElement) && (Jt(y) || y[at]))
          break e;
        if ((g || p) && (p = c.window === c ? c : (p = c.ownerDocument) ? p.defaultView || p.parentWindow : window, g ? (y = n.relatedTarget || n.toElement, g = a, y = y ? Jt(y) : null, y !== null && (E = rn(y), y !== E || y.tag !== 5 && y.tag !== 6) && (y = null)) : (g = null, y = a), g !== y)) {
          if (v = Pu, w = "onMouseLeave", h = "onMouseEnter", d = "mouse", (t === "pointerout" || t === "pointerover") && (v = Iu, w = "onPointerLeave", h = "onPointerEnter", d = "pointer"), E = g == null ? p : dn(g), m = y == null ? p : dn(y), p = new v(w, d + "leave", g, n, c), p.target = E, p.relatedTarget = m, w = null, Jt(c) === a && (v = new v(h, d + "enter", y, n, c), v.target = m, v.relatedTarget = E, w = v), E = w, g && y)
            t: {
              for (v = g, h = y, d = 0, m = v; m; m = on(m))
                d++;
              for (m = 0, w = h; w; w = on(w))
                m++;
              for (; 0 < d - m; )
                v = on(v), d--;
              for (; 0 < m - d; )
                h = on(h), m--;
              for (; d--; ) {
                if (v === h || h !== null && v === h.alternate)
                  break t;
                v = on(v), h = on(h);
              }
              v = null;
            }
          else
            v = null;
          g !== null && Uu(f, p, g, v, !1), y !== null && E !== null && Uu(f, E, y, v, !0);
        }
      }
      e: {
        if (p = a ? dn(a) : window, g = p.nodeName && p.nodeName.toLowerCase(), g === "select" || g === "input" && p.type === "file")
          var S = Zm;
        else if (Fu(p))
          if (Yc)
            S = t0;
          else {
            S = bm;
            var N = qm;
          }
        else
          (g = p.nodeName) && g.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (S = e0);
        if (S && (S = S(t, a))) {
          Kc(f, S, n, c);
          break e;
        }
        N && N(t, p, a), t === "focusout" && (N = p._wrapperState) && N.controlled && p.type === "number" && al(p, "number", p.value);
      }
      switch (N = a ? dn(a) : window, t) {
        case "focusin":
          (Fu(N) || N.contentEditable === "true") && (cn = N, Sl = a, or = null);
          break;
        case "focusout":
          or = Sl = cn = null;
          break;
        case "mousedown":
          xl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          xl = !1, $u(f, n, c);
          break;
        case "selectionchange":
          if (i0)
            break;
        case "keydown":
        case "keyup":
          $u(f, n, c);
      }
      var C;
      if (Ss)
        e: {
          switch (t) {
            case "compositionstart":
              var x = "onCompositionStart";
              break e;
            case "compositionend":
              x = "onCompositionEnd";
              break e;
            case "compositionupdate":
              x = "onCompositionUpdate";
              break e;
          }
          x = void 0;
        }
      else
        an ? Jc(t, n) && (x = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
      x && (Hc && n.locale !== "ko" && (an || x !== "onCompositionStart" ? x === "onCompositionEnd" && an && (C = Wc()) : (kt = c, vs = "value" in kt ? kt.value : kt.textContent, an = !0)), N = Oi(a, x), 0 < N.length && (x = new zu(x, t, null, n, c), f.push({ event: x, listeners: N }), C ? x.data = C : (C = Qc(n), C !== null && (x.data = C)))), (C = Qm ? Km(t, n) : Ym(t, n)) && (a = Oi(a, "onBeforeInput"), 0 < a.length && (c = new zu("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: a }), c.data = C));
    }
    of(f, e);
  });
}
function xr(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function Oi(t, e) {
  for (var n = e + "Capture", r = []; t !== null; ) {
    var i = t, o = i.stateNode;
    i.tag === 5 && o !== null && (i = o, o = mr(t, n), o != null && r.unshift(xr(t, o, i)), o = mr(t, e), o != null && r.push(xr(t, o, i))), t = t.return;
  }
  return r;
}
function on(t) {
  if (t === null)
    return null;
  do
    t = t.return;
  while (t && t.tag !== 5);
  return t || null;
}
function Uu(t, e, n, r, i) {
  for (var o = e._reactName, l = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, a = s.stateNode;
    if (u !== null && u === r)
      break;
    s.tag === 5 && a !== null && (s = a, i ? (u = mr(n, o), u != null && l.unshift(xr(n, u, s))) : i || (u = mr(n, o), u != null && l.push(xr(n, u, s)))), n = n.return;
  }
  l.length !== 0 && t.push({ event: e, listeners: l });
}
var u0 = /\r\n?/g, a0 = /\u0000|\uFFFD/g;
function Wu(t) {
  return (typeof t == "string" ? t : "" + t).replace(u0, `
`).replace(a0, "");
}
function qr(t, e, n) {
  if (e = Wu(e), Wu(t) !== e && n)
    throw Error(k(425));
}
function Ri() {
}
var El = null, Nl = null;
function Cl(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var _l = typeof setTimeout == "function" ? setTimeout : void 0, c0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Hu = typeof Promise == "function" ? Promise : void 0, f0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Hu < "u" ? function(t) {
  return Hu.resolve(null).then(t).catch(d0);
} : _l;
function d0(t) {
  setTimeout(function() {
    throw t;
  });
}
function Uo(t, e) {
  var n = e, r = 0;
  do {
    var i = n.nextSibling;
    if (t.removeChild(n), i && i.nodeType === 8)
      if (n = i.data, n === "/$") {
        if (r === 0) {
          t.removeChild(i), vr(e);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = i;
  } while (n);
  vr(e);
}
function Ct(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3)
      break;
    if (e === 8) {
      if (e = t.data, e === "$" || e === "$!" || e === "$?")
        break;
      if (e === "/$")
        return null;
    }
  }
  return t;
}
function Ju(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (e === 0)
          return t;
        e--;
      } else
        n === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
var Bn = Math.random().toString(36).slice(2), qe = "__reactFiber$" + Bn, Er = "__reactProps$" + Bn, at = "__reactContainer$" + Bn, Ml = "__reactEvents$" + Bn, p0 = "__reactListeners$" + Bn, h0 = "__reactHandles$" + Bn;
function Jt(t) {
  var e = t[qe];
  if (e)
    return e;
  for (var n = t.parentNode; n; ) {
    if (e = n[at] || n[qe]) {
      if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
        for (t = Ju(t); t !== null; ) {
          if (n = t[qe])
            return n;
          t = Ju(t);
        }
      return e;
    }
    t = n, n = t.parentNode;
  }
  return null;
}
function Lr(t) {
  return t = t[qe] || t[at], !t || t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3 ? null : t;
}
function dn(t) {
  if (t.tag === 5 || t.tag === 6)
    return t.stateNode;
  throw Error(k(33));
}
function no(t) {
  return t[Er] || null;
}
var Tl = [], pn = -1;
function Lt(t) {
  return { current: t };
}
function W(t) {
  0 > pn || (t.current = Tl[pn], Tl[pn] = null, pn--);
}
function j(t, e) {
  pn++, Tl[pn] = t.current, t.current = e;
}
var Ot = {}, pe = Lt(Ot), xe = Lt(!1), Xt = Ot;
function Tn(t, e) {
  var n = t.type.contextTypes;
  if (!n)
    return Ot;
  var r = t.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === e)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {}, o;
  for (o in n)
    i[o] = e[o];
  return r && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = e, t.__reactInternalMemoizedMaskedChildContext = i), i;
}
function Ee(t) {
  return t = t.childContextTypes, t != null;
}
function Fi() {
  W(xe), W(pe);
}
function Qu(t, e, n) {
  if (pe.current !== Ot)
    throw Error(k(168));
  j(pe, e), j(xe, n);
}
function sf(t, e, n) {
  var r = t.stateNode;
  if (e = e.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var i in r)
    if (!(i in e))
      throw Error(k(108, qh(t) || "Unknown", i));
  return Y({}, n, r);
}
function Li(t) {
  return t = (t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext || Ot, Xt = pe.current, j(pe, t), j(xe, xe.current), !0;
}
function Ku(t, e, n) {
  var r = t.stateNode;
  if (!r)
    throw Error(k(169));
  n ? (t = sf(t, e, Xt), r.__reactInternalMemoizedMergedChildContext = t, W(xe), W(pe), j(pe, t)) : W(xe), j(xe, n);
}
var rt = null, ro = !1, Wo = !1;
function uf(t) {
  rt === null ? rt = [t] : rt.push(t);
}
function m0(t) {
  ro = !0, uf(t);
}
function At() {
  if (!Wo && rt !== null) {
    Wo = !0;
    var t = 0, e = A;
    try {
      var n = rt;
      for (A = 1; t < n.length; t++) {
        var r = n[t];
        do
          r = r(!0);
        while (r !== null);
      }
      rt = null, ro = !1;
    } catch (i) {
      throw rt !== null && (rt = rt.slice(t + 1)), Oc(hs, At), i;
    } finally {
      A = e, Wo = !1;
    }
  }
  return null;
}
var hn = [], mn = 0, Ai = null, Di = 0, Le = [], Ae = 0, Zt = null, it = 1, ot = "";
function $t(t, e) {
  hn[mn++] = Di, hn[mn++] = Ai, Ai = t, Di = e;
}
function af(t, e, n) {
  Le[Ae++] = it, Le[Ae++] = ot, Le[Ae++] = Zt, Zt = t;
  var r = it;
  t = ot;
  var i = 32 - Ke(r) - 1;
  r &= ~(1 << i), n += 1;
  var o = 32 - Ke(e) + i;
  if (30 < o) {
    var l = i - i % 5;
    o = (r & (1 << l) - 1).toString(32), r >>= l, i -= l, it = 1 << 32 - Ke(e) + i | n << i | r, ot = o + t;
  } else
    it = 1 << o | n << i | r, ot = t;
}
function Es(t) {
  t.return !== null && ($t(t, 1), af(t, 1, 0));
}
function Ns(t) {
  for (; t === Ai; )
    Ai = hn[--mn], hn[mn] = null, Di = hn[--mn], hn[mn] = null;
  for (; t === Zt; )
    Zt = Le[--Ae], Le[Ae] = null, ot = Le[--Ae], Le[Ae] = null, it = Le[--Ae], Le[Ae] = null;
}
var Ie = null, ze = null, H = !1, Je = null;
function cf(t, e) {
  var n = De(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = e, n.return = t, e = t.deletions, e === null ? (t.deletions = [n], t.flags |= 16) : e.push(n);
}
function Yu(t, e) {
  switch (t.tag) {
    case 5:
      var n = t.type;
      return e = e.nodeType !== 1 || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e, e !== null ? (t.stateNode = e, Ie = t, ze = Ct(e.firstChild), !0) : !1;
    case 6:
      return e = t.pendingProps === "" || e.nodeType !== 3 ? null : e, e !== null ? (t.stateNode = e, Ie = t, ze = null, !0) : !1;
    case 13:
      return e = e.nodeType !== 8 ? null : e, e !== null ? (n = Zt !== null ? { id: it, overflow: ot } : null, t.memoizedState = { dehydrated: e, treeContext: n, retryLane: 1073741824 }, n = De(18, null, null, 0), n.stateNode = e, n.return = t, t.child = n, Ie = t, ze = null, !0) : !1;
    default:
      return !1;
  }
}
function Pl(t) {
  return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
}
function zl(t) {
  if (H) {
    var e = ze;
    if (e) {
      var n = e;
      if (!Yu(t, e)) {
        if (Pl(t))
          throw Error(k(418));
        e = Ct(n.nextSibling);
        var r = Ie;
        e && Yu(t, e) ? cf(r, n) : (t.flags = t.flags & -4097 | 2, H = !1, Ie = t);
      }
    } else {
      if (Pl(t))
        throw Error(k(418));
      t.flags = t.flags & -4097 | 2, H = !1, Ie = t;
    }
  }
}
function Gu(t) {
  for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13; )
    t = t.return;
  Ie = t;
}
function br(t) {
  if (t !== Ie)
    return !1;
  if (!H)
    return Gu(t), H = !0, !1;
  var e;
  if ((e = t.tag !== 3) && !(e = t.tag !== 5) && (e = t.type, e = e !== "head" && e !== "body" && !Cl(t.type, t.memoizedProps)), e && (e = ze)) {
    if (Pl(t))
      throw ff(), Error(k(418));
    for (; e; )
      cf(t, e), e = Ct(e.nextSibling);
  }
  if (Gu(t), t.tag === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t)
      throw Error(k(317));
    e: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "/$") {
            if (e === 0) {
              ze = Ct(t.nextSibling);
              break e;
            }
            e--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || e++;
        }
        t = t.nextSibling;
      }
      ze = null;
    }
  } else
    ze = Ie ? Ct(t.stateNode.nextSibling) : null;
  return !0;
}
function ff() {
  for (var t = ze; t; )
    t = Ct(t.nextSibling);
}
function Pn() {
  ze = Ie = null, H = !1;
}
function Cs(t) {
  Je === null ? Je = [t] : Je.push(t);
}
var g0 = dt.ReactCurrentBatchConfig;
function Hn(t, e, n) {
  if (t = n.ref, t !== null && typeof t != "function" && typeof t != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1)
          throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r)
        throw Error(k(147, t));
      var i = r, o = "" + t;
      return e !== null && e.ref !== null && typeof e.ref == "function" && e.ref._stringRef === o ? e.ref : (e = function(l) {
        var s = i.refs;
        l === null ? delete s[o] : s[o] = l;
      }, e._stringRef = o, e);
    }
    if (typeof t != "string")
      throw Error(k(284));
    if (!n._owner)
      throw Error(k(290, t));
  }
  return t;
}
function ei(t, e) {
  throw t = Object.prototype.toString.call(e), Error(k(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
}
function Xu(t) {
  var e = t._init;
  return e(t._payload);
}
function df(t) {
  function e(h, d) {
    if (t) {
      var m = h.deletions;
      m === null ? (h.deletions = [d], h.flags |= 16) : m.push(d);
    }
  }
  function n(h, d) {
    if (!t)
      return null;
    for (; d !== null; )
      e(h, d), d = d.sibling;
    return null;
  }
  function r(h, d) {
    for (h = /* @__PURE__ */ new Map(); d !== null; )
      d.key !== null ? h.set(d.key, d) : h.set(d.index, d), d = d.sibling;
    return h;
  }
  function i(h, d) {
    return h = Pt(h, d), h.index = 0, h.sibling = null, h;
  }
  function o(h, d, m) {
    return h.index = m, t ? (m = h.alternate, m !== null ? (m = m.index, m < d ? (h.flags |= 2, d) : m) : (h.flags |= 2, d)) : (h.flags |= 1048576, d);
  }
  function l(h) {
    return t && h.alternate === null && (h.flags |= 2), h;
  }
  function s(h, d, m, w) {
    return d === null || d.tag !== 6 ? (d = Xo(m, h.mode, w), d.return = h, d) : (d = i(d, m), d.return = h, d);
  }
  function u(h, d, m, w) {
    var S = m.type;
    return S === un ? c(h, d, m.props.children, w, m.key) : d !== null && (d.elementType === S || typeof S == "object" && S !== null && S.$$typeof === gt && Xu(S) === d.type) ? (w = i(d, m.props), w.ref = Hn(h, d, m), w.return = h, w) : (w = vi(m.type, m.key, m.props, null, h.mode, w), w.ref = Hn(h, d, m), w.return = h, w);
  }
  function a(h, d, m, w) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== m.containerInfo || d.stateNode.implementation !== m.implementation ? (d = Zo(m, h.mode, w), d.return = h, d) : (d = i(d, m.children || []), d.return = h, d);
  }
  function c(h, d, m, w, S) {
    return d === null || d.tag !== 7 ? (d = Gt(m, h.mode, w, S), d.return = h, d) : (d = i(d, m), d.return = h, d);
  }
  function f(h, d, m) {
    if (typeof d == "string" && d !== "" || typeof d == "number")
      return d = Xo("" + d, h.mode, m), d.return = h, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Wr:
          return m = vi(d.type, d.key, d.props, null, h.mode, m), m.ref = Hn(h, null, d), m.return = h, m;
        case sn:
          return d = Zo(d, h.mode, m), d.return = h, d;
        case gt:
          var w = d._init;
          return f(h, w(d._payload), m);
      }
      if (Xn(d) || $n(d))
        return d = Gt(d, h.mode, m, null), d.return = h, d;
      ei(h, d);
    }
    return null;
  }
  function p(h, d, m, w) {
    var S = d !== null ? d.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number")
      return S !== null ? null : s(h, d, "" + m, w);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Wr:
          return m.key === S ? u(h, d, m, w) : null;
        case sn:
          return m.key === S ? a(h, d, m, w) : null;
        case gt:
          return S = m._init, p(
            h,
            d,
            S(m._payload),
            w
          );
      }
      if (Xn(m) || $n(m))
        return S !== null ? null : c(h, d, m, w, null);
      ei(h, m);
    }
    return null;
  }
  function g(h, d, m, w, S) {
    if (typeof w == "string" && w !== "" || typeof w == "number")
      return h = h.get(m) || null, s(d, h, "" + w, S);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Wr:
          return h = h.get(w.key === null ? m : w.key) || null, u(d, h, w, S);
        case sn:
          return h = h.get(w.key === null ? m : w.key) || null, a(d, h, w, S);
        case gt:
          var N = w._init;
          return g(h, d, m, N(w._payload), S);
      }
      if (Xn(w) || $n(w))
        return h = h.get(m) || null, c(d, h, w, S, null);
      ei(d, w);
    }
    return null;
  }
  function y(h, d, m, w) {
    for (var S = null, N = null, C = d, x = d = 0, D = null; C !== null && x < m.length; x++) {
      C.index > x ? (D = C, C = null) : D = C.sibling;
      var I = p(h, C, m[x], w);
      if (I === null) {
        C === null && (C = D);
        break;
      }
      t && C && I.alternate === null && e(h, C), d = o(I, d, x), N === null ? S = I : N.sibling = I, N = I, C = D;
    }
    if (x === m.length)
      return n(h, C), H && $t(h, x), S;
    if (C === null) {
      for (; x < m.length; x++)
        C = f(h, m[x], w), C !== null && (d = o(C, d, x), N === null ? S = C : N.sibling = C, N = C);
      return H && $t(h, x), S;
    }
    for (C = r(h, C); x < m.length; x++)
      D = g(C, h, x, m[x], w), D !== null && (t && D.alternate !== null && C.delete(D.key === null ? x : D.key), d = o(D, d, x), N === null ? S = D : N.sibling = D, N = D);
    return t && C.forEach(function(ne) {
      return e(h, ne);
    }), H && $t(h, x), S;
  }
  function v(h, d, m, w) {
    var S = $n(m);
    if (typeof S != "function")
      throw Error(k(150));
    if (m = S.call(m), m == null)
      throw Error(k(151));
    for (var N = S = null, C = d, x = d = 0, D = null, I = m.next(); C !== null && !I.done; x++, I = m.next()) {
      C.index > x ? (D = C, C = null) : D = C.sibling;
      var ne = p(h, C, I.value, w);
      if (ne === null) {
        C === null && (C = D);
        break;
      }
      t && C && ne.alternate === null && e(h, C), d = o(ne, d, x), N === null ? S = ne : N.sibling = ne, N = ne, C = D;
    }
    if (I.done)
      return n(
        h,
        C
      ), H && $t(h, x), S;
    if (C === null) {
      for (; !I.done; x++, I = m.next())
        I = f(h, I.value, w), I !== null && (d = o(I, d, x), N === null ? S = I : N.sibling = I, N = I);
      return H && $t(h, x), S;
    }
    for (C = r(h, C); !I.done; x++, I = m.next())
      I = g(C, h, x, I.value, w), I !== null && (t && I.alternate !== null && C.delete(I.key === null ? x : I.key), d = o(I, d, x), N === null ? S = I : N.sibling = I, N = I);
    return t && C.forEach(function(pt) {
      return e(h, pt);
    }), H && $t(h, x), S;
  }
  function E(h, d, m, w) {
    if (typeof m == "object" && m !== null && m.type === un && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Wr:
          e: {
            for (var S = m.key, N = d; N !== null; ) {
              if (N.key === S) {
                if (S = m.type, S === un) {
                  if (N.tag === 7) {
                    n(h, N.sibling), d = i(N, m.props.children), d.return = h, h = d;
                    break e;
                  }
                } else if (N.elementType === S || typeof S == "object" && S !== null && S.$$typeof === gt && Xu(S) === N.type) {
                  n(h, N.sibling), d = i(N, m.props), d.ref = Hn(h, N, m), d.return = h, h = d;
                  break e;
                }
                n(h, N);
                break;
              } else
                e(h, N);
              N = N.sibling;
            }
            m.type === un ? (d = Gt(m.props.children, h.mode, w, m.key), d.return = h, h = d) : (w = vi(m.type, m.key, m.props, null, h.mode, w), w.ref = Hn(h, d, m), w.return = h, h = w);
          }
          return l(h);
        case sn:
          e: {
            for (N = m.key; d !== null; ) {
              if (d.key === N)
                if (d.tag === 4 && d.stateNode.containerInfo === m.containerInfo && d.stateNode.implementation === m.implementation) {
                  n(h, d.sibling), d = i(d, m.children || []), d.return = h, h = d;
                  break e;
                } else {
                  n(h, d);
                  break;
                }
              else
                e(h, d);
              d = d.sibling;
            }
            d = Zo(m, h.mode, w), d.return = h, h = d;
          }
          return l(h);
        case gt:
          return N = m._init, E(h, d, N(m._payload), w);
      }
      if (Xn(m))
        return y(h, d, m, w);
      if ($n(m))
        return v(h, d, m, w);
      ei(h, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, d !== null && d.tag === 6 ? (n(h, d.sibling), d = i(d, m), d.return = h, h = d) : (n(h, d), d = Xo(m, h.mode, w), d.return = h, h = d), l(h)) : n(h, d);
  }
  return E;
}
var zn = df(!0), pf = df(!1), Bi = Lt(null), $i = null, gn = null, _s = null;
function Ms() {
  _s = gn = $i = null;
}
function Ts(t) {
  var e = Bi.current;
  W(Bi), t._currentValue = e;
}
function Il(t, e, n) {
  for (; t !== null; ) {
    var r = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, r !== null && (r.childLanes |= e)) : r !== null && (r.childLanes & e) !== e && (r.childLanes |= e), t === n)
      break;
    t = t.return;
  }
}
function Nn(t, e) {
  $i = t, _s = gn = null, t = t.dependencies, t !== null && t.firstContext !== null && (t.lanes & e && (ke = !0), t.firstContext = null);
}
function $e(t) {
  var e = t._currentValue;
  if (_s !== t)
    if (t = { context: t, memoizedValue: e, next: null }, gn === null) {
      if ($i === null)
        throw Error(k(308));
      gn = t, $i.dependencies = { lanes: 0, firstContext: t };
    } else
      gn = gn.next = t;
  return e;
}
var Qt = null;
function Ps(t) {
  Qt === null ? Qt = [t] : Qt.push(t);
}
function hf(t, e, n, r) {
  var i = e.interleaved;
  return i === null ? (n.next = n, Ps(e)) : (n.next = i.next, i.next = n), e.interleaved = n, ct(t, r);
}
function ct(t, e) {
  t.lanes |= e;
  var n = t.alternate;
  for (n !== null && (n.lanes |= e), n = t, t = t.return; t !== null; )
    t.childLanes |= e, n = t.alternate, n !== null && (n.childLanes |= e), n = t, t = t.return;
  return n.tag === 3 ? n.stateNode : null;
}
var yt = !1;
function zs(t) {
  t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function mf(t, e) {
  t = t.updateQueue, e.updateQueue === t && (e.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, effects: t.effects });
}
function lt(t, e) {
  return { eventTime: t, lane: e, tag: 0, payload: null, callback: null, next: null };
}
function _t(t, e, n) {
  var r = t.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, L & 2) {
    var i = r.pending;
    return i === null ? e.next = e : (e.next = i.next, i.next = e), r.pending = e, ct(t, n);
  }
  return i = r.interleaved, i === null ? (e.next = e, Ps(r)) : (e.next = i.next, i.next = e), r.interleaved = e, ct(t, n);
}
function di(t, e, n) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194240) !== 0)) {
    var r = e.lanes;
    r &= t.pendingLanes, n |= r, e.lanes = n, ms(t, n);
  }
}
function Zu(t, e) {
  var n = t.updateQueue, r = t.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var i = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var l = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? i = o = l : o = o.next = l, n = n.next;
      } while (n !== null);
      o === null ? i = o = e : o = o.next = e;
    } else
      i = o = e;
    n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, t.updateQueue = n;
    return;
  }
  t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
}
function ji(t, e, n, r) {
  var i = t.updateQueue;
  yt = !1;
  var o = i.firstBaseUpdate, l = i.lastBaseUpdate, s = i.shared.pending;
  if (s !== null) {
    i.shared.pending = null;
    var u = s, a = u.next;
    u.next = null, l === null ? o = a : l.next = a, l = u;
    var c = t.alternate;
    c !== null && (c = c.updateQueue, s = c.lastBaseUpdate, s !== l && (s === null ? c.firstBaseUpdate = a : s.next = a, c.lastBaseUpdate = u));
  }
  if (o !== null) {
    var f = i.baseState;
    l = 0, c = a = u = null, s = o;
    do {
      var p = s.lane, g = s.eventTime;
      if ((r & p) === p) {
        c !== null && (c = c.next = {
          eventTime: g,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var y = t, v = s;
          switch (p = e, g = n, v.tag) {
            case 1:
              if (y = v.payload, typeof y == "function") {
                f = y.call(g, f, p);
                break e;
              }
              f = y;
              break e;
            case 3:
              y.flags = y.flags & -65537 | 128;
            case 0:
              if (y = v.payload, p = typeof y == "function" ? y.call(g, f, p) : y, p == null)
                break e;
              f = Y({}, f, p);
              break e;
            case 2:
              yt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (t.flags |= 64, p = i.effects, p === null ? i.effects = [s] : p.push(s));
      } else
        g = { eventTime: g, lane: p, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, c === null ? (a = c = g, u = f) : c = c.next = g, l |= p;
      if (s = s.next, s === null) {
        if (s = i.shared.pending, s === null)
          break;
        p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
      }
    } while (!0);
    if (c === null && (u = f), i.baseState = u, i.firstBaseUpdate = a, i.lastBaseUpdate = c, e = i.shared.interleaved, e !== null) {
      i = e;
      do
        l |= i.lane, i = i.next;
      while (i !== e);
    } else
      o === null && (i.shared.lanes = 0);
    bt |= l, t.lanes = l, t.memoizedState = f;
  }
}
function qu(t, e, n) {
  if (t = e.effects, e.effects = null, t !== null)
    for (e = 0; e < t.length; e++) {
      var r = t[e], i = r.callback;
      if (i !== null) {
        if (r.callback = null, r = n, typeof i != "function")
          throw Error(k(191, i));
        i.call(r);
      }
    }
}
var Ar = {}, tt = Lt(Ar), Nr = Lt(Ar), Cr = Lt(Ar);
function Kt(t) {
  if (t === Ar)
    throw Error(k(174));
  return t;
}
function Is(t, e) {
  switch (j(Cr, e), j(Nr, t), j(tt, Ar), t = e.nodeType, t) {
    case 9:
    case 11:
      e = (e = e.documentElement) ? e.namespaceURI : fl(null, "");
      break;
    default:
      t = t === 8 ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = fl(e, t);
  }
  W(tt), j(tt, e);
}
function In() {
  W(tt), W(Nr), W(Cr);
}
function gf(t) {
  Kt(Cr.current);
  var e = Kt(tt.current), n = fl(e, t.type);
  e !== n && (j(Nr, t), j(tt, n));
}
function Os(t) {
  Nr.current === t && (W(tt), W(Nr));
}
var J = Lt(0);
function Vi(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!"))
        return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if (e.flags & 128)
        return e;
    } else if (e.child !== null) {
      e.child.return = e, e = e.child;
      continue;
    }
    if (e === t)
      break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t)
        return null;
      e = e.return;
    }
    e.sibling.return = e.return, e = e.sibling;
  }
  return null;
}
var Ho = [];
function Rs() {
  for (var t = 0; t < Ho.length; t++)
    Ho[t]._workInProgressVersionPrimary = null;
  Ho.length = 0;
}
var pi = dt.ReactCurrentDispatcher, Jo = dt.ReactCurrentBatchConfig, qt = 0, K = null, ee = null, ie = null, Ui = !1, lr = !1, _r = 0, y0 = 0;
function ae() {
  throw Error(k(321));
}
function Fs(t, e) {
  if (e === null)
    return !1;
  for (var n = 0; n < e.length && n < t.length; n++)
    if (!Ge(t[n], e[n]))
      return !1;
  return !0;
}
function Ls(t, e, n, r, i, o) {
  if (qt = o, K = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, pi.current = t === null || t.memoizedState === null ? S0 : x0, t = n(r, i), lr) {
    o = 0;
    do {
      if (lr = !1, _r = 0, 25 <= o)
        throw Error(k(301));
      o += 1, ie = ee = null, e.updateQueue = null, pi.current = E0, t = n(r, i);
    } while (lr);
  }
  if (pi.current = Wi, e = ee !== null && ee.next !== null, qt = 0, ie = ee = K = null, Ui = !1, e)
    throw Error(k(300));
  return t;
}
function As() {
  var t = _r !== 0;
  return _r = 0, t;
}
function Ze() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ie === null ? K.memoizedState = ie = t : ie = ie.next = t, ie;
}
function je() {
  if (ee === null) {
    var t = K.alternate;
    t = t !== null ? t.memoizedState : null;
  } else
    t = ee.next;
  var e = ie === null ? K.memoizedState : ie.next;
  if (e !== null)
    ie = e, ee = t;
  else {
    if (t === null)
      throw Error(k(310));
    ee = t, t = { memoizedState: ee.memoizedState, baseState: ee.baseState, baseQueue: ee.baseQueue, queue: ee.queue, next: null }, ie === null ? K.memoizedState = ie = t : ie = ie.next = t;
  }
  return ie;
}
function Mr(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Qo(t) {
  var e = je(), n = e.queue;
  if (n === null)
    throw Error(k(311));
  n.lastRenderedReducer = t;
  var r = ee, i = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var l = i.next;
      i.next = o.next, o.next = l;
    }
    r.baseQueue = i = o, n.pending = null;
  }
  if (i !== null) {
    o = i.next, r = r.baseState;
    var s = l = null, u = null, a = o;
    do {
      var c = a.lane;
      if ((qt & c) === c)
        u !== null && (u = u.next = { lane: 0, action: a.action, hasEagerState: a.hasEagerState, eagerState: a.eagerState, next: null }), r = a.hasEagerState ? a.eagerState : t(r, a.action);
      else {
        var f = {
          lane: c,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null
        };
        u === null ? (s = u = f, l = r) : u = u.next = f, K.lanes |= c, bt |= c;
      }
      a = a.next;
    } while (a !== null && a !== o);
    u === null ? l = r : u.next = s, Ge(r, e.memoizedState) || (ke = !0), e.memoizedState = r, e.baseState = l, e.baseQueue = u, n.lastRenderedState = r;
  }
  if (t = n.interleaved, t !== null) {
    i = t;
    do
      o = i.lane, K.lanes |= o, bt |= o, i = i.next;
    while (i !== t);
  } else
    i === null && (n.lanes = 0);
  return [e.memoizedState, n.dispatch];
}
function Ko(t) {
  var e = je(), n = e.queue;
  if (n === null)
    throw Error(k(311));
  n.lastRenderedReducer = t;
  var r = n.dispatch, i = n.pending, o = e.memoizedState;
  if (i !== null) {
    n.pending = null;
    var l = i = i.next;
    do
      o = t(o, l.action), l = l.next;
    while (l !== i);
    Ge(o, e.memoizedState) || (ke = !0), e.memoizedState = o, e.baseQueue === null && (e.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function yf() {
}
function vf(t, e) {
  var n = K, r = je(), i = e(), o = !Ge(r.memoizedState, i);
  if (o && (r.memoizedState = i, ke = !0), r = r.queue, Ds(Sf.bind(null, n, r, t), [t]), r.getSnapshot !== e || o || ie !== null && ie.memoizedState.tag & 1) {
    if (n.flags |= 2048, Tr(9, kf.bind(null, n, r, i, e), void 0, null), oe === null)
      throw Error(k(349));
    qt & 30 || wf(n, e, i);
  }
  return i;
}
function wf(t, e, n) {
  t.flags |= 16384, t = { getSnapshot: e, value: n }, e = K.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, K.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
}
function kf(t, e, n, r) {
  e.value = n, e.getSnapshot = r, xf(e) && Ef(t);
}
function Sf(t, e, n) {
  return n(function() {
    xf(e) && Ef(t);
  });
}
function xf(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Ge(t, n);
  } catch {
    return !0;
  }
}
function Ef(t) {
  var e = ct(t, 1);
  e !== null && Ye(e, t, 1, -1);
}
function bu(t) {
  var e = Ze();
  return typeof t == "function" && (t = t()), e.memoizedState = e.baseState = t, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Mr, lastRenderedState: t }, e.queue = t, t = t.dispatch = k0.bind(null, K, t), [e.memoizedState, t];
}
function Tr(t, e, n, r) {
  return t = { tag: t, create: e, destroy: n, deps: r, next: null }, e = K.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, K.updateQueue = e, e.lastEffect = t.next = t) : (n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (r = n.next, n.next = t, t.next = r, e.lastEffect = t)), t;
}
function Nf() {
  return je().memoizedState;
}
function hi(t, e, n, r) {
  var i = Ze();
  K.flags |= t, i.memoizedState = Tr(1 | e, n, void 0, r === void 0 ? null : r);
}
function io(t, e, n, r) {
  var i = je();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var l = ee.memoizedState;
    if (o = l.destroy, r !== null && Fs(r, l.deps)) {
      i.memoizedState = Tr(e, n, o, r);
      return;
    }
  }
  K.flags |= t, i.memoizedState = Tr(1 | e, n, o, r);
}
function ea(t, e) {
  return hi(8390656, 8, t, e);
}
function Ds(t, e) {
  return io(2048, 8, t, e);
}
function Cf(t, e) {
  return io(4, 2, t, e);
}
function _f(t, e) {
  return io(4, 4, t, e);
}
function Mf(t, e) {
  if (typeof e == "function")
    return t = t(), e(t), function() {
      e(null);
    };
  if (e != null)
    return t = t(), e.current = t, function() {
      e.current = null;
    };
}
function Tf(t, e, n) {
  return n = n != null ? n.concat([t]) : null, io(4, 4, Mf.bind(null, e, t), n);
}
function Bs() {
}
function Pf(t, e) {
  var n = je();
  e = e === void 0 ? null : e;
  var r = n.memoizedState;
  return r !== null && e !== null && Fs(e, r[1]) ? r[0] : (n.memoizedState = [t, e], t);
}
function zf(t, e) {
  var n = je();
  e = e === void 0 ? null : e;
  var r = n.memoizedState;
  return r !== null && e !== null && Fs(e, r[1]) ? r[0] : (t = t(), n.memoizedState = [t, e], t);
}
function If(t, e, n) {
  return qt & 21 ? (Ge(n, e) || (n = Lc(), K.lanes |= n, bt |= n, t.baseState = !0), e) : (t.baseState && (t.baseState = !1, ke = !0), t.memoizedState = n);
}
function v0(t, e) {
  var n = A;
  A = n !== 0 && 4 > n ? n : 4, t(!0);
  var r = Jo.transition;
  Jo.transition = {};
  try {
    t(!1), e();
  } finally {
    A = n, Jo.transition = r;
  }
}
function Of() {
  return je().memoizedState;
}
function w0(t, e, n) {
  var r = Tt(t);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Rf(t))
    Ff(e, n);
  else if (n = hf(t, e, n, r), n !== null) {
    var i = ge();
    Ye(n, t, r, i), Lf(n, e, r);
  }
}
function k0(t, e, n) {
  var r = Tt(t), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Rf(t))
    Ff(e, i);
  else {
    var o = t.alternate;
    if (t.lanes === 0 && (o === null || o.lanes === 0) && (o = e.lastRenderedReducer, o !== null))
      try {
        var l = e.lastRenderedState, s = o(l, n);
        if (i.hasEagerState = !0, i.eagerState = s, Ge(s, l)) {
          var u = e.interleaved;
          u === null ? (i.next = i, Ps(e)) : (i.next = u.next, u.next = i), e.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
    n = hf(t, e, i, r), n !== null && (i = ge(), Ye(n, t, r, i), Lf(n, e, r));
  }
}
function Rf(t) {
  var e = t.alternate;
  return t === K || e !== null && e === K;
}
function Ff(t, e) {
  lr = Ui = !0;
  var n = t.pending;
  n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
}
function Lf(t, e, n) {
  if (n & 4194240) {
    var r = e.lanes;
    r &= t.pendingLanes, n |= r, e.lanes = n, ms(t, n);
  }
}
var Wi = { readContext: $e, useCallback: ae, useContext: ae, useEffect: ae, useImperativeHandle: ae, useInsertionEffect: ae, useLayoutEffect: ae, useMemo: ae, useReducer: ae, useRef: ae, useState: ae, useDebugValue: ae, useDeferredValue: ae, useTransition: ae, useMutableSource: ae, useSyncExternalStore: ae, useId: ae, unstable_isNewReconciler: !1 }, S0 = { readContext: $e, useCallback: function(t, e) {
  return Ze().memoizedState = [t, e === void 0 ? null : e], t;
}, useContext: $e, useEffect: ea, useImperativeHandle: function(t, e, n) {
  return n = n != null ? n.concat([t]) : null, hi(
    4194308,
    4,
    Mf.bind(null, e, t),
    n
  );
}, useLayoutEffect: function(t, e) {
  return hi(4194308, 4, t, e);
}, useInsertionEffect: function(t, e) {
  return hi(4, 2, t, e);
}, useMemo: function(t, e) {
  var n = Ze();
  return e = e === void 0 ? null : e, t = t(), n.memoizedState = [t, e], t;
}, useReducer: function(t, e, n) {
  var r = Ze();
  return e = n !== void 0 ? n(e) : e, r.memoizedState = r.baseState = e, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: e }, r.queue = t, t = t.dispatch = w0.bind(null, K, t), [r.memoizedState, t];
}, useRef: function(t) {
  var e = Ze();
  return t = { current: t }, e.memoizedState = t;
}, useState: bu, useDebugValue: Bs, useDeferredValue: function(t) {
  return Ze().memoizedState = t;
}, useTransition: function() {
  var t = bu(!1), e = t[0];
  return t = v0.bind(null, t[1]), Ze().memoizedState = t, [e, t];
}, useMutableSource: function() {
}, useSyncExternalStore: function(t, e, n) {
  var r = K, i = Ze();
  if (H) {
    if (n === void 0)
      throw Error(k(407));
    n = n();
  } else {
    if (n = e(), oe === null)
      throw Error(k(349));
    qt & 30 || wf(r, e, n);
  }
  i.memoizedState = n;
  var o = { value: n, getSnapshot: e };
  return i.queue = o, ea(Sf.bind(
    null,
    r,
    o,
    t
  ), [t]), r.flags |= 2048, Tr(9, kf.bind(null, r, o, n, e), void 0, null), n;
}, useId: function() {
  var t = Ze(), e = oe.identifierPrefix;
  if (H) {
    var n = ot, r = it;
    n = (r & ~(1 << 32 - Ke(r) - 1)).toString(32) + n, e = ":" + e + "R" + n, n = _r++, 0 < n && (e += "H" + n.toString(32)), e += ":";
  } else
    n = y0++, e = ":" + e + "r" + n.toString(32) + ":";
  return t.memoizedState = e;
}, unstable_isNewReconciler: !1 }, x0 = {
  readContext: $e,
  useCallback: Pf,
  useContext: $e,
  useEffect: Ds,
  useImperativeHandle: Tf,
  useInsertionEffect: Cf,
  useLayoutEffect: _f,
  useMemo: zf,
  useReducer: Qo,
  useRef: Nf,
  useState: function() {
    return Qo(Mr);
  },
  useDebugValue: Bs,
  useDeferredValue: function(t) {
    var e = je();
    return If(e, ee.memoizedState, t);
  },
  useTransition: function() {
    var t = Qo(Mr)[0], e = je().memoizedState;
    return [t, e];
  },
  useMutableSource: yf,
  useSyncExternalStore: vf,
  useId: Of,
  unstable_isNewReconciler: !1
}, E0 = { readContext: $e, useCallback: Pf, useContext: $e, useEffect: Ds, useImperativeHandle: Tf, useInsertionEffect: Cf, useLayoutEffect: _f, useMemo: zf, useReducer: Ko, useRef: Nf, useState: function() {
  return Ko(Mr);
}, useDebugValue: Bs, useDeferredValue: function(t) {
  var e = je();
  return ee === null ? e.memoizedState = t : If(e, ee.memoizedState, t);
}, useTransition: function() {
  var t = Ko(Mr)[0], e = je().memoizedState;
  return [t, e];
}, useMutableSource: yf, useSyncExternalStore: vf, useId: Of, unstable_isNewReconciler: !1 };
function We(t, e) {
  if (t && t.defaultProps) {
    e = Y({}, e), t = t.defaultProps;
    for (var n in t)
      e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function Ol(t, e, n, r) {
  e = t.memoizedState, n = n(r, e), n = n == null ? e : Y({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
}
var oo = { isMounted: function(t) {
  return (t = t._reactInternals) ? rn(t) === t : !1;
}, enqueueSetState: function(t, e, n) {
  t = t._reactInternals;
  var r = ge(), i = Tt(t), o = lt(r, i);
  o.payload = e, n != null && (o.callback = n), e = _t(t, o, i), e !== null && (Ye(e, t, i, r), di(e, t, i));
}, enqueueReplaceState: function(t, e, n) {
  t = t._reactInternals;
  var r = ge(), i = Tt(t), o = lt(r, i);
  o.tag = 1, o.payload = e, n != null && (o.callback = n), e = _t(t, o, i), e !== null && (Ye(e, t, i, r), di(e, t, i));
}, enqueueForceUpdate: function(t, e) {
  t = t._reactInternals;
  var n = ge(), r = Tt(t), i = lt(n, r);
  i.tag = 2, e != null && (i.callback = e), e = _t(t, i, r), e !== null && (Ye(e, t, r, n), di(e, t, r));
} };
function ta(t, e, n, r, i, o, l) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(r, o, l) : e.prototype && e.prototype.isPureReactComponent ? !kr(n, r) || !kr(i, o) : !0;
}
function Af(t, e, n) {
  var r = !1, i = Ot, o = e.contextType;
  return typeof o == "object" && o !== null ? o = $e(o) : (i = Ee(e) ? Xt : pe.current, r = e.contextTypes, o = (r = r != null) ? Tn(t, i) : Ot), e = new e(n, o), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = oo, t.stateNode = e, e._reactInternals = t, r && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = i, t.__reactInternalMemoizedMaskedChildContext = o), e;
}
function na(t, e, n, r) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, r), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, r), e.state !== t && oo.enqueueReplaceState(e, e.state, null);
}
function Rl(t, e, n, r) {
  var i = t.stateNode;
  i.props = n, i.state = t.memoizedState, i.refs = {}, zs(t);
  var o = e.contextType;
  typeof o == "object" && o !== null ? i.context = $e(o) : (o = Ee(e) ? Xt : pe.current, i.context = Tn(t, o)), i.state = t.memoizedState, o = e.getDerivedStateFromProps, typeof o == "function" && (Ol(t, e, o, n), i.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (e = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), e !== i.state && oo.enqueueReplaceState(i, i.state, null), ji(t, n, i, r), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308);
}
function On(t, e) {
  try {
    var n = "", r = e;
    do
      n += Zh(r), r = r.return;
    while (r);
    var i = n;
  } catch (o) {
    i = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: t, source: e, stack: i, digest: null };
}
function Yo(t, e, n) {
  return { value: t, source: null, stack: n ?? null, digest: e ?? null };
}
function Fl(t, e) {
  try {
    console.error(e.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var N0 = typeof WeakMap == "function" ? WeakMap : Map;
function Df(t, e, n) {
  n = lt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = e.value;
  return n.callback = function() {
    Ji || (Ji = !0, Hl = r), Fl(t, e);
  }, n;
}
function Bf(t, e, n) {
  n = lt(-1, n), n.tag = 3;
  var r = t.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = e.value;
    n.payload = function() {
      return r(i);
    }, n.callback = function() {
      Fl(t, e);
    };
  }
  var o = t.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Fl(t, e), typeof r != "function" && (Mt === null ? Mt = /* @__PURE__ */ new Set([this]) : Mt.add(this));
    var l = e.stack;
    this.componentDidCatch(e.value, { componentStack: l !== null ? l : "" });
  }), n;
}
function ra(t, e, n) {
  var r = t.pingCache;
  if (r === null) {
    r = t.pingCache = new N0();
    var i = /* @__PURE__ */ new Set();
    r.set(e, i);
  } else
    i = r.get(e), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(e, i));
  i.has(n) || (i.add(n), t = B0.bind(null, t, e, n), e.then(t, t));
}
function ia(t) {
  do {
    var e;
    if ((e = t.tag === 13) && (e = t.memoizedState, e = e !== null ? e.dehydrated !== null : !0), e)
      return t;
    t = t.return;
  } while (t !== null);
  return null;
}
function oa(t, e, n, r, i) {
  return t.mode & 1 ? (t.flags |= 65536, t.lanes = i, t) : (t === e ? t.flags |= 65536 : (t.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (e = lt(-1, 1), e.tag = 2, _t(n, e, 1))), n.lanes |= 1), t);
}
var C0 = dt.ReactCurrentOwner, ke = !1;
function me(t, e, n, r) {
  e.child = t === null ? pf(e, null, n, r) : zn(e, t.child, n, r);
}
function la(t, e, n, r, i) {
  n = n.render;
  var o = e.ref;
  return Nn(e, i), r = Ls(t, e, n, r, o, i), n = As(), t !== null && !ke ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~i, ft(t, e, i)) : (H && n && Es(e), e.flags |= 1, me(t, e, r, i), e.child);
}
function sa(t, e, n, r, i) {
  if (t === null) {
    var o = n.type;
    return typeof o == "function" && !Qs(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (e.tag = 15, e.type = o, $f(t, e, o, r, i)) : (t = vi(n.type, null, r, e, e.mode, i), t.ref = e.ref, t.return = e, e.child = t);
  }
  if (o = t.child, !(t.lanes & i)) {
    var l = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : kr, n(l, r) && t.ref === e.ref)
      return ft(t, e, i);
  }
  return e.flags |= 1, t = Pt(o, r), t.ref = e.ref, t.return = e, e.child = t;
}
function $f(t, e, n, r, i) {
  if (t !== null) {
    var o = t.memoizedProps;
    if (kr(o, r) && t.ref === e.ref)
      if (ke = !1, e.pendingProps = r = o, (t.lanes & i) !== 0)
        t.flags & 131072 && (ke = !0);
      else
        return e.lanes = t.lanes, ft(t, e, i);
  }
  return Ll(t, e, n, r, i);
}
function jf(t, e, n) {
  var r = e.pendingProps, i = r.children, o = t !== null ? t.memoizedState : null;
  if (r.mode === "hidden")
    if (!(e.mode & 1))
      e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, j(vn, _e), _e |= n;
    else {
      if (!(n & 1073741824))
        return t = o !== null ? o.baseLanes | n : n, e.lanes = e.childLanes = 1073741824, e.memoizedState = { baseLanes: t, cachePool: null, transitions: null }, e.updateQueue = null, j(vn, _e), _e |= t, null;
      e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, j(vn, _e), _e |= r;
    }
  else
    o !== null ? (r = o.baseLanes | n, e.memoizedState = null) : r = n, j(vn, _e), _e |= r;
  return me(t, e, i, n), e.child;
}
function Vf(t, e) {
  var n = e.ref;
  (t === null && n !== null || t !== null && t.ref !== n) && (e.flags |= 512, e.flags |= 2097152);
}
function Ll(t, e, n, r, i) {
  var o = Ee(n) ? Xt : pe.current;
  return o = Tn(e, o), Nn(e, i), n = Ls(t, e, n, r, o, i), r = As(), t !== null && !ke ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~i, ft(t, e, i)) : (H && r && Es(e), e.flags |= 1, me(t, e, n, i), e.child);
}
function ua(t, e, n, r, i) {
  if (Ee(n)) {
    var o = !0;
    Li(e);
  } else
    o = !1;
  if (Nn(e, i), e.stateNode === null)
    mi(t, e), Af(e, n, r), Rl(e, n, r, i), r = !0;
  else if (t === null) {
    var l = e.stateNode, s = e.memoizedProps;
    l.props = s;
    var u = l.context, a = n.contextType;
    typeof a == "object" && a !== null ? a = $e(a) : (a = Ee(n) ? Xt : pe.current, a = Tn(e, a));
    var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof l.getSnapshotBeforeUpdate == "function";
    f || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== r || u !== a) && na(e, l, r, a), yt = !1;
    var p = e.memoizedState;
    l.state = p, ji(e, r, l, i), u = e.memoizedState, s !== r || p !== u || xe.current || yt ? (typeof c == "function" && (Ol(e, n, c, r), u = e.memoizedState), (s = yt || ta(e, n, s, r, p, u, a)) ? (f || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = r, e.memoizedState = u), l.props = r, l.state = u, l.context = a, r = s) : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), r = !1);
  } else {
    l = e.stateNode, mf(t, e), s = e.memoizedProps, a = e.type === e.elementType ? s : We(e.type, s), l.props = a, f = e.pendingProps, p = l.context, u = n.contextType, typeof u == "object" && u !== null ? u = $e(u) : (u = Ee(n) ? Xt : pe.current, u = Tn(e, u));
    var g = n.getDerivedStateFromProps;
    (c = typeof g == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== f || p !== u) && na(e, l, r, u), yt = !1, p = e.memoizedState, l.state = p, ji(e, r, l, i);
    var y = e.memoizedState;
    s !== f || p !== y || xe.current || yt ? (typeof g == "function" && (Ol(e, n, g, r), y = e.memoizedState), (a = yt || ta(e, n, a, r, p, y, u) || !1) ? (c || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, y, u), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(r, y, u)), typeof l.componentDidUpdate == "function" && (e.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || s === t.memoizedProps && p === t.memoizedState || (e.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && p === t.memoizedState || (e.flags |= 1024), e.memoizedProps = r, e.memoizedState = y), l.props = r, l.state = y, l.context = u, r = a) : (typeof l.componentDidUpdate != "function" || s === t.memoizedProps && p === t.memoizedState || (e.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && p === t.memoizedState || (e.flags |= 1024), r = !1);
  }
  return Al(t, e, n, r, o, i);
}
function Al(t, e, n, r, i, o) {
  Vf(t, e);
  var l = (e.flags & 128) !== 0;
  if (!r && !l)
    return i && Ku(e, n, !1), ft(t, e, o);
  r = e.stateNode, C0.current = e;
  var s = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return e.flags |= 1, t !== null && l ? (e.child = zn(e, t.child, null, o), e.child = zn(e, null, s, o)) : me(t, e, s, o), e.memoizedState = r.state, i && Ku(e, n, !0), e.child;
}
function Uf(t) {
  var e = t.stateNode;
  e.pendingContext ? Qu(t, e.pendingContext, e.pendingContext !== e.context) : e.context && Qu(t, e.context, !1), Is(t, e.containerInfo);
}
function aa(t, e, n, r, i) {
  return Pn(), Cs(i), e.flags |= 256, me(t, e, n, r), e.child;
}
var Dl = { dehydrated: null, treeContext: null, retryLane: 0 };
function Bl(t) {
  return { baseLanes: t, cachePool: null, transitions: null };
}
function Wf(t, e, n) {
  var r = e.pendingProps, i = J.current, o = !1, l = (e.flags & 128) !== 0, s;
  if ((s = l) || (s = t !== null && t.memoizedState === null ? !1 : (i & 2) !== 0), s ? (o = !0, e.flags &= -129) : (t === null || t.memoizedState !== null) && (i |= 1), j(J, i & 1), t === null)
    return zl(e), t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null) ? (e.mode & 1 ? t.data === "$!" ? e.lanes = 8 : e.lanes = 1073741824 : e.lanes = 1, null) : (l = r.children, t = r.fallback, o ? (r = e.mode, o = e.child, l = { mode: "hidden", children: l }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = l) : o = uo(l, r, 0, null), t = Gt(t, r, n, null), o.return = e, t.return = e, o.sibling = t, e.child = o, e.child.memoizedState = Bl(n), e.memoizedState = Dl, t) : $s(e, l));
  if (i = t.memoizedState, i !== null && (s = i.dehydrated, s !== null))
    return _0(t, e, l, r, s, i, n);
  if (o) {
    o = r.fallback, l = e.mode, i = t.child, s = i.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(l & 1) && e.child !== i ? (r = e.child, r.childLanes = 0, r.pendingProps = u, e.deletions = null) : (r = Pt(i, u), r.subtreeFlags = i.subtreeFlags & 14680064), s !== null ? o = Pt(s, o) : (o = Gt(o, l, n, null), o.flags |= 2), o.return = e, r.return = e, r.sibling = o, e.child = r, r = o, o = e.child, l = t.child.memoizedState, l = l === null ? Bl(n) : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }, o.memoizedState = l, o.childLanes = t.childLanes & ~n, e.memoizedState = Dl, r;
  }
  return o = t.child, t = o.sibling, r = Pt(o, { mode: "visible", children: r.children }), !(e.mode & 1) && (r.lanes = n), r.return = e, r.sibling = null, t !== null && (n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t)), e.child = r, e.memoizedState = null, r;
}
function $s(t, e) {
  return e = uo({ mode: "visible", children: e }, t.mode, 0, null), e.return = t, t.child = e;
}
function ti(t, e, n, r) {
  return r !== null && Cs(r), zn(e, t.child, null, n), t = $s(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
}
function _0(t, e, n, r, i, o, l) {
  if (n)
    return e.flags & 256 ? (e.flags &= -257, r = Yo(Error(k(422))), ti(t, e, l, r)) : e.memoizedState !== null ? (e.child = t.child, e.flags |= 128, null) : (o = r.fallback, i = e.mode, r = uo({ mode: "visible", children: r.children }, i, 0, null), o = Gt(o, i, l, null), o.flags |= 2, r.return = e, o.return = e, r.sibling = o, e.child = r, e.mode & 1 && zn(e, t.child, null, l), e.child.memoizedState = Bl(l), e.memoizedState = Dl, o);
  if (!(e.mode & 1))
    return ti(t, e, l, null);
  if (i.data === "$!") {
    if (r = i.nextSibling && i.nextSibling.dataset, r)
      var s = r.dgst;
    return r = s, o = Error(k(419)), r = Yo(o, r, void 0), ti(t, e, l, r);
  }
  if (s = (l & t.childLanes) !== 0, ke || s) {
    if (r = oe, r !== null) {
      switch (l & -l) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      i = i & (r.suspendedLanes | l) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, ct(t, i), Ye(r, t, i, -1));
    }
    return Js(), r = Yo(Error(k(421))), ti(t, e, l, r);
  }
  return i.data === "$?" ? (e.flags |= 128, e.child = t.child, e = $0.bind(null, t), i._reactRetry = e, null) : (t = o.treeContext, ze = Ct(i.nextSibling), Ie = e, H = !0, Je = null, t !== null && (Le[Ae++] = it, Le[Ae++] = ot, Le[Ae++] = Zt, it = t.id, ot = t.overflow, Zt = e), e = $s(e, r.children), e.flags |= 4096, e);
}
function ca(t, e, n) {
  t.lanes |= e;
  var r = t.alternate;
  r !== null && (r.lanes |= e), Il(t.return, e, n);
}
function Go(t, e, n, r, i) {
  var o = t.memoizedState;
  o === null ? t.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = e, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
}
function Hf(t, e, n) {
  var r = e.pendingProps, i = r.revealOrder, o = r.tail;
  if (me(t, e, r.children, n), r = J.current, r & 2)
    r = r & 1 | 2, e.flags |= 128;
  else {
    if (t !== null && t.flags & 128)
      e:
        for (t = e.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && ca(t, n, e);
          else if (t.tag === 19)
            ca(t, n, e);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e)
            break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
              break e;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
    r &= 1;
  }
  if (j(J, r), !(e.mode & 1))
    e.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = e.child, i = null; n !== null; )
          t = n.alternate, t !== null && Vi(t) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = e.child, e.child = null) : (i = n.sibling, n.sibling = null), Go(e, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = e.child, e.child = null; i !== null; ) {
          if (t = i.alternate, t !== null && Vi(t) === null) {
            e.child = i;
            break;
          }
          t = i.sibling, i.sibling = n, n = i, i = t;
        }
        Go(e, !0, n, null, o);
        break;
      case "together":
        Go(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
  return e.child;
}
function mi(t, e) {
  !(e.mode & 1) && t !== null && (t.alternate = null, e.alternate = null, e.flags |= 2);
}
function ft(t, e, n) {
  if (t !== null && (e.dependencies = t.dependencies), bt |= e.lanes, !(n & e.childLanes))
    return null;
  if (t !== null && e.child !== t.child)
    throw Error(k(153));
  if (e.child !== null) {
    for (t = e.child, n = Pt(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
      t = t.sibling, n = n.sibling = Pt(t, t.pendingProps), n.return = e;
    n.sibling = null;
  }
  return e.child;
}
function M0(t, e, n) {
  switch (e.tag) {
    case 3:
      Uf(e), Pn();
      break;
    case 5:
      gf(e);
      break;
    case 1:
      Ee(e.type) && Li(e);
      break;
    case 4:
      Is(e, e.stateNode.containerInfo);
      break;
    case 10:
      var r = e.type._context, i = e.memoizedProps.value;
      j(Bi, r._currentValue), r._currentValue = i;
      break;
    case 13:
      if (r = e.memoizedState, r !== null)
        return r.dehydrated !== null ? (j(J, J.current & 1), e.flags |= 128, null) : n & e.child.childLanes ? Wf(t, e, n) : (j(J, J.current & 1), t = ft(t, e, n), t !== null ? t.sibling : null);
      j(J, J.current & 1);
      break;
    case 19:
      if (r = (n & e.childLanes) !== 0, t.flags & 128) {
        if (r)
          return Hf(t, e, n);
        e.flags |= 128;
      }
      if (i = e.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), j(J, J.current), r)
        break;
      return null;
    case 22:
    case 23:
      return e.lanes = 0, jf(t, e, n);
  }
  return ft(t, e, n);
}
var Jf, $l, Qf, Kf;
Jf = function(t, e) {
  for (var n = e.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6)
      t.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === e)
      break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e)
        return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
$l = function() {
};
Qf = function(t, e, n, r) {
  var i = t.memoizedProps;
  if (i !== r) {
    t = e.stateNode, Kt(tt.current);
    var o = null;
    switch (n) {
      case "input":
        i = sl(t, i), r = sl(t, r), o = [];
        break;
      case "select":
        i = Y({}, i, { value: void 0 }), r = Y({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        i = cl(t, i), r = cl(t, r), o = [];
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (t.onclick = Ri);
    }
    dl(n, r);
    var l;
    n = null;
    for (a in i)
      if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && i[a] != null)
        if (a === "style") {
          var s = i[a];
          for (l in s)
            s.hasOwnProperty(l) && (n || (n = {}), n[l] = "");
        } else
          a !== "dangerouslySetInnerHTML" && a !== "children" && a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (pr.hasOwnProperty(a) ? o || (o = []) : (o = o || []).push(a, null));
    for (a in r) {
      var u = r[a];
      if (s = i != null ? i[a] : void 0, r.hasOwnProperty(a) && u !== s && (u != null || s != null))
        if (a === "style")
          if (s) {
            for (l in s)
              !s.hasOwnProperty(l) || u && u.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
            for (l in u)
              u.hasOwnProperty(l) && s[l] !== u[l] && (n || (n = {}), n[l] = u[l]);
          } else
            n || (o || (o = []), o.push(
              a,
              n
            )), n = u;
        else
          a === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(a, u)) : a === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(a, "" + u) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && (pr.hasOwnProperty(a) ? (u != null && a === "onScroll" && V("scroll", t), o || s === u || (o = [])) : (o = o || []).push(a, u));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (e.updateQueue = a) && (e.flags |= 4);
  }
};
Kf = function(t, e, n, r) {
  n !== r && (e.flags |= 4);
};
function Jn(t, e) {
  if (!H)
    switch (t.tailMode) {
      case "hidden":
        e = t.tail;
        for (var n = null; e !== null; )
          e.alternate !== null && (n = e), e = e.sibling;
        n === null ? t.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = t.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), n = n.sibling;
        r === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : r.sibling = null;
    }
}
function ce(t) {
  var e = t.alternate !== null && t.alternate.child === t.child, n = 0, r = 0;
  if (e)
    for (var i = t.child; i !== null; )
      n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = t, i = i.sibling;
  else
    for (i = t.child; i !== null; )
      n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = t, i = i.sibling;
  return t.subtreeFlags |= r, t.childLanes = n, e;
}
function T0(t, e, n) {
  var r = e.pendingProps;
  switch (Ns(e), e.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ce(e), null;
    case 1:
      return Ee(e.type) && Fi(), ce(e), null;
    case 3:
      return r = e.stateNode, In(), W(xe), W(pe), Rs(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (t === null || t.child === null) && (br(e) ? e.flags |= 4 : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, Je !== null && (Kl(Je), Je = null))), $l(t, e), ce(e), null;
    case 5:
      Os(e);
      var i = Kt(Cr.current);
      if (n = e.type, t !== null && e.stateNode != null)
        Qf(t, e, n, r, i), t.ref !== e.ref && (e.flags |= 512, e.flags |= 2097152);
      else {
        if (!r) {
          if (e.stateNode === null)
            throw Error(k(166));
          return ce(e), null;
        }
        if (t = Kt(tt.current), br(e)) {
          r = e.stateNode, n = e.type;
          var o = e.memoizedProps;
          switch (r[qe] = e, r[Er] = o, t = (e.mode & 1) !== 0, n) {
            case "dialog":
              V("cancel", r), V("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              V("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < qn.length; i++)
                V(qn[i], r);
              break;
            case "source":
              V("error", r);
              break;
            case "img":
            case "image":
            case "link":
              V(
                "error",
                r
              ), V("load", r);
              break;
            case "details":
              V("toggle", r);
              break;
            case "input":
              wu(r, o), V("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, V("invalid", r);
              break;
            case "textarea":
              Su(r, o), V("invalid", r);
          }
          dl(n, o), i = null;
          for (var l in o)
            if (o.hasOwnProperty(l)) {
              var s = o[l];
              l === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && qr(r.textContent, s, t), i = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && qr(
                r.textContent,
                s,
                t
              ), i = ["children", "" + s]) : pr.hasOwnProperty(l) && s != null && l === "onScroll" && V("scroll", r);
            }
          switch (n) {
            case "input":
              Hr(r), ku(r, o, !0);
              break;
            case "textarea":
              Hr(r), xu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ri);
          }
          r = i, e.updateQueue = r, r !== null && (e.flags |= 4);
        } else {
          l = i.nodeType === 9 ? i : i.ownerDocument, t === "http://www.w3.org/1999/xhtml" && (t = kc(n)), t === "http://www.w3.org/1999/xhtml" ? n === "script" ? (t = l.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild)) : typeof r.is == "string" ? t = l.createElement(n, { is: r.is }) : (t = l.createElement(n), n === "select" && (l = t, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : t = l.createElementNS(t, n), t[qe] = e, t[Er] = r, Jf(t, e, !1, !1), e.stateNode = t;
          e: {
            switch (l = pl(n, r), n) {
              case "dialog":
                V("cancel", t), V("close", t), i = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                V("load", t), i = r;
                break;
              case "video":
              case "audio":
                for (i = 0; i < qn.length; i++)
                  V(qn[i], t);
                i = r;
                break;
              case "source":
                V("error", t), i = r;
                break;
              case "img":
              case "image":
              case "link":
                V(
                  "error",
                  t
                ), V("load", t), i = r;
                break;
              case "details":
                V("toggle", t), i = r;
                break;
              case "input":
                wu(t, r), i = sl(t, r), V("invalid", t);
                break;
              case "option":
                i = r;
                break;
              case "select":
                t._wrapperState = { wasMultiple: !!r.multiple }, i = Y({}, r, { value: void 0 }), V("invalid", t);
                break;
              case "textarea":
                Su(t, r), i = cl(t, r), V("invalid", t);
                break;
              default:
                i = r;
            }
            dl(n, i), s = i;
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var u = s[o];
                o === "style" ? Ec(t, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Sc(t, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && hr(t, u) : typeof u == "number" && hr(t, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (pr.hasOwnProperty(o) ? u != null && o === "onScroll" && V("scroll", t) : u != null && as(t, o, u, l));
              }
            switch (n) {
              case "input":
                Hr(t), ku(t, r, !1);
                break;
              case "textarea":
                Hr(t), xu(t);
                break;
              case "option":
                r.value != null && t.setAttribute("value", "" + It(r.value));
                break;
              case "select":
                t.multiple = !!r.multiple, o = r.value, o != null ? kn(t, !!r.multiple, o, !1) : r.defaultValue != null && kn(
                  t,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof i.onClick == "function" && (t.onclick = Ri);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (e.flags |= 4);
        }
        e.ref !== null && (e.flags |= 512, e.flags |= 2097152);
      }
      return ce(e), null;
    case 6:
      if (t && e.stateNode != null)
        Kf(t, e, t.memoizedProps, r);
      else {
        if (typeof r != "string" && e.stateNode === null)
          throw Error(k(166));
        if (n = Kt(Cr.current), Kt(tt.current), br(e)) {
          if (r = e.stateNode, n = e.memoizedProps, r[qe] = e, (o = r.nodeValue !== n) && (t = Ie, t !== null))
            switch (t.tag) {
              case 3:
                qr(r.nodeValue, n, (t.mode & 1) !== 0);
                break;
              case 5:
                t.memoizedProps.suppressHydrationWarning !== !0 && qr(r.nodeValue, n, (t.mode & 1) !== 0);
            }
          o && (e.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[qe] = e, e.stateNode = r;
      }
      return ce(e), null;
    case 13:
      if (W(J), r = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (H && ze !== null && e.mode & 1 && !(e.flags & 128))
          ff(), Pn(), e.flags |= 98560, o = !1;
        else if (o = br(e), r !== null && r.dehydrated !== null) {
          if (t === null) {
            if (!o)
              throw Error(k(318));
            if (o = e.memoizedState, o = o !== null ? o.dehydrated : null, !o)
              throw Error(k(317));
            o[qe] = e;
          } else
            Pn(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          ce(e), o = !1;
        } else
          Je !== null && (Kl(Je), Je = null), o = !0;
        if (!o)
          return e.flags & 65536 ? e : null;
      }
      return e.flags & 128 ? (e.lanes = n, e) : (r = r !== null, r !== (t !== null && t.memoizedState !== null) && r && (e.child.flags |= 8192, e.mode & 1 && (t === null || J.current & 1 ? te === 0 && (te = 3) : Js())), e.updateQueue !== null && (e.flags |= 4), ce(e), null);
    case 4:
      return In(), $l(t, e), t === null && Sr(e.stateNode.containerInfo), ce(e), null;
    case 10:
      return Ts(e.type._context), ce(e), null;
    case 17:
      return Ee(e.type) && Fi(), ce(e), null;
    case 19:
      if (W(J), o = e.memoizedState, o === null)
        return ce(e), null;
      if (r = (e.flags & 128) !== 0, l = o.rendering, l === null)
        if (r)
          Jn(o, !1);
        else {
          if (te !== 0 || t !== null && t.flags & 128)
            for (t = e.child; t !== null; ) {
              if (l = Vi(t), l !== null) {
                for (e.flags |= 128, Jn(o, !1), r = l.updateQueue, r !== null && (e.updateQueue = r, e.flags |= 4), e.subtreeFlags = 0, r = n, n = e.child; n !== null; )
                  o = n, t = r, o.flags &= 14680066, l = o.alternate, l === null ? (o.childLanes = 0, o.lanes = t, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = l.childLanes, o.lanes = l.lanes, o.child = l.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = l.memoizedProps, o.memoizedState = l.memoizedState, o.updateQueue = l.updateQueue, o.type = l.type, t = l.dependencies, o.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), n = n.sibling;
                return j(J, J.current & 1 | 2), e.child;
              }
              t = t.sibling;
            }
          o.tail !== null && Z() > Rn && (e.flags |= 128, r = !0, Jn(o, !1), e.lanes = 4194304);
        }
      else {
        if (!r)
          if (t = Vi(l), t !== null) {
            if (e.flags |= 128, r = !0, n = t.updateQueue, n !== null && (e.updateQueue = n, e.flags |= 4), Jn(o, !0), o.tail === null && o.tailMode === "hidden" && !l.alternate && !H)
              return ce(e), null;
          } else
            2 * Z() - o.renderingStartTime > Rn && n !== 1073741824 && (e.flags |= 128, r = !0, Jn(o, !1), e.lanes = 4194304);
        o.isBackwards ? (l.sibling = e.child, e.child = l) : (n = o.last, n !== null ? n.sibling = l : e.child = l, o.last = l);
      }
      return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Z(), e.sibling = null, n = J.current, j(J, r ? n & 1 | 2 : n & 1), e) : (ce(e), null);
    case 22:
    case 23:
      return Hs(), r = e.memoizedState !== null, t !== null && t.memoizedState !== null !== r && (e.flags |= 8192), r && e.mode & 1 ? _e & 1073741824 && (ce(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : ce(e), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, e.tag));
}
function P0(t, e) {
  switch (Ns(e), e.tag) {
    case 1:
      return Ee(e.type) && Fi(), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return In(), W(xe), W(pe), Rs(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
    case 5:
      return Os(e), null;
    case 13:
      if (W(J), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null)
          throw Error(k(340));
        Pn();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 19:
      return W(J), null;
    case 4:
      return In(), null;
    case 10:
      return Ts(e.type._context), null;
    case 22:
    case 23:
      return Hs(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ni = !1, fe = !1, z0 = typeof WeakSet == "function" ? WeakSet : Set, _ = null;
function yn(t, e) {
  var n = t.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        G(t, e, r);
      }
    else
      n.current = null;
}
function jl(t, e, n) {
  try {
    n();
  } catch (r) {
    G(t, e, r);
  }
}
var fa = !1;
function I0(t, e) {
  if (El = zi, t = Zc(), xs(t)) {
    if ("selectionStart" in t)
      var n = { start: t.selectionStart, end: t.selectionEnd };
    else
      e: {
        n = (n = t.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var l = 0, s = -1, u = -1, a = 0, c = 0, f = t, p = null;
          t:
            for (; ; ) {
              for (var g; f !== n || i !== 0 && f.nodeType !== 3 || (s = l + i), f !== o || r !== 0 && f.nodeType !== 3 || (u = l + r), f.nodeType === 3 && (l += f.nodeValue.length), (g = f.firstChild) !== null; )
                p = f, f = g;
              for (; ; ) {
                if (f === t)
                  break t;
                if (p === n && ++a === i && (s = l), p === o && ++c === r && (u = l), (g = f.nextSibling) !== null)
                  break;
                f = p, p = f.parentNode;
              }
              f = g;
            }
          n = s === -1 || u === -1 ? null : { start: s, end: u };
        } else
          n = null;
      }
    n = n || { start: 0, end: 0 };
  } else
    n = null;
  for (Nl = { focusedElem: t, selectionRange: n }, zi = !1, _ = e; _ !== null; )
    if (e = _, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
      t.return = e, _ = t;
    else
      for (; _ !== null; ) {
        e = _;
        try {
          var y = e.alternate;
          if (e.flags & 1024)
            switch (e.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var v = y.memoizedProps, E = y.memoizedState, h = e.stateNode, d = h.getSnapshotBeforeUpdate(e.elementType === e.type ? v : We(e.type, v), E);
                  h.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var m = e.stateNode.containerInfo;
                m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(k(163));
            }
        } catch (w) {
          G(e, e.return, w);
        }
        if (t = e.sibling, t !== null) {
          t.return = e.return, _ = t;
          break;
        }
        _ = e.return;
      }
  return y = fa, fa = !1, y;
}
function sr(t, e, n) {
  var r = e.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var i = r = r.next;
    do {
      if ((i.tag & t) === t) {
        var o = i.destroy;
        i.destroy = void 0, o !== void 0 && jl(e, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function lo(t, e) {
  if (e = e.updateQueue, e = e !== null ? e.lastEffect : null, e !== null) {
    var n = e = e.next;
    do {
      if ((n.tag & t) === t) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== e);
  }
}
function Vl(t) {
  var e = t.ref;
  if (e !== null) {
    var n = t.stateNode;
    switch (t.tag) {
      case 5:
        t = n;
        break;
      default:
        t = n;
    }
    typeof e == "function" ? e(t) : e.current = t;
  }
}
function Yf(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, Yf(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && (delete e[qe], delete e[Er], delete e[Ml], delete e[p0], delete e[h0])), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
function Gf(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 4;
}
function da(t) {
  e:
    for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Gf(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.flags & 2 || t.child === null || t.tag === 4)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2))
        return t.stateNode;
    }
}
function Ul(t, e, n) {
  var r = t.tag;
  if (r === 5 || r === 6)
    t = t.stateNode, e ? n.nodeType === 8 ? n.parentNode.insertBefore(t, e) : n.insertBefore(t, e) : (n.nodeType === 8 ? (e = n.parentNode, e.insertBefore(t, n)) : (e = n, e.appendChild(t)), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Ri));
  else if (r !== 4 && (t = t.child, t !== null))
    for (Ul(t, e, n), t = t.sibling; t !== null; )
      Ul(t, e, n), t = t.sibling;
}
function Wl(t, e, n) {
  var r = t.tag;
  if (r === 5 || r === 6)
    t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
  else if (r !== 4 && (t = t.child, t !== null))
    for (Wl(t, e, n), t = t.sibling; t !== null; )
      Wl(t, e, n), t = t.sibling;
}
var le = null, He = !1;
function mt(t, e, n) {
  for (n = n.child; n !== null; )
    Xf(t, e, n), n = n.sibling;
}
function Xf(t, e, n) {
  if (et && typeof et.onCommitFiberUnmount == "function")
    try {
      et.onCommitFiberUnmount(qi, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      fe || yn(n, e);
    case 6:
      var r = le, i = He;
      le = null, mt(t, e, n), le = r, He = i, le !== null && (He ? (t = le, n = n.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n)) : le.removeChild(n.stateNode));
      break;
    case 18:
      le !== null && (He ? (t = le, n = n.stateNode, t.nodeType === 8 ? Uo(t.parentNode, n) : t.nodeType === 1 && Uo(t, n), vr(t)) : Uo(le, n.stateNode));
      break;
    case 4:
      r = le, i = He, le = n.stateNode.containerInfo, He = !0, mt(t, e, n), le = r, He = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!fe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        i = r = r.next;
        do {
          var o = i, l = o.destroy;
          o = o.tag, l !== void 0 && (o & 2 || o & 4) && jl(n, e, l), i = i.next;
        } while (i !== r);
      }
      mt(t, e, n);
      break;
    case 1:
      if (!fe && (yn(n, e), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (s) {
          G(n, e, s);
        }
      mt(t, e, n);
      break;
    case 21:
      mt(t, e, n);
      break;
    case 22:
      n.mode & 1 ? (fe = (r = fe) || n.memoizedState !== null, mt(t, e, n), fe = r) : mt(t, e, n);
      break;
    default:
      mt(t, e, n);
  }
}
function pa(t) {
  var e = t.updateQueue;
  if (e !== null) {
    t.updateQueue = null;
    var n = t.stateNode;
    n === null && (n = t.stateNode = new z0()), e.forEach(function(r) {
      var i = j0.bind(null, t, r);
      n.has(r) || (n.add(r), r.then(i, i));
    });
  }
}
function Ue(t, e) {
  var n = e.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = t, l = e, s = l;
        e:
          for (; s !== null; ) {
            switch (s.tag) {
              case 5:
                le = s.stateNode, He = !1;
                break e;
              case 3:
                le = s.stateNode.containerInfo, He = !0;
                break e;
              case 4:
                le = s.stateNode.containerInfo, He = !0;
                break e;
            }
            s = s.return;
          }
        if (le === null)
          throw Error(k(160));
        Xf(o, l, i), le = null, He = !1;
        var u = i.alternate;
        u !== null && (u.return = null), i.return = null;
      } catch (a) {
        G(i, e, a);
      }
    }
  if (e.subtreeFlags & 12854)
    for (e = e.child; e !== null; )
      Zf(e, t), e = e.sibling;
}
function Zf(t, e) {
  var n = t.alternate, r = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ue(e, t), Xe(t), r & 4) {
        try {
          sr(3, t, t.return), lo(3, t);
        } catch (v) {
          G(t, t.return, v);
        }
        try {
          sr(5, t, t.return);
        } catch (v) {
          G(t, t.return, v);
        }
      }
      break;
    case 1:
      Ue(e, t), Xe(t), r & 512 && n !== null && yn(n, n.return);
      break;
    case 5:
      if (Ue(e, t), Xe(t), r & 512 && n !== null && yn(n, n.return), t.flags & 32) {
        var i = t.stateNode;
        try {
          hr(i, "");
        } catch (v) {
          G(t, t.return, v);
        }
      }
      if (r & 4 && (i = t.stateNode, i != null)) {
        var o = t.memoizedProps, l = n !== null ? n.memoizedProps : o, s = t.type, u = t.updateQueue;
        if (t.updateQueue = null, u !== null)
          try {
            s === "input" && o.type === "radio" && o.name != null && vc(i, o), pl(s, l);
            var a = pl(s, o);
            for (l = 0; l < u.length; l += 2) {
              var c = u[l], f = u[l + 1];
              c === "style" ? Ec(i, f) : c === "dangerouslySetInnerHTML" ? Sc(i, f) : c === "children" ? hr(i, f) : as(i, c, f, a);
            }
            switch (s) {
              case "input":
                ul(i, o);
                break;
              case "textarea":
                wc(i, o);
                break;
              case "select":
                var p = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var g = o.value;
                g != null ? kn(i, !!o.multiple, g, !1) : p !== !!o.multiple && (o.defaultValue != null ? kn(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : kn(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Er] = o;
          } catch (v) {
            G(t, t.return, v);
          }
      }
      break;
    case 6:
      if (Ue(e, t), Xe(t), r & 4) {
        if (t.stateNode === null)
          throw Error(k(162));
        i = t.stateNode, o = t.memoizedProps;
        try {
          i.nodeValue = o;
        } catch (v) {
          G(t, t.return, v);
        }
      }
      break;
    case 3:
      if (Ue(e, t), Xe(t), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          vr(e.containerInfo);
        } catch (v) {
          G(t, t.return, v);
        }
      break;
    case 4:
      Ue(e, t), Xe(t);
      break;
    case 13:
      Ue(e, t), Xe(t), i = t.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (Us = Z())), r & 4 && pa(t);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, t.mode & 1 ? (fe = (a = fe) || c, Ue(e, t), fe = a) : Ue(e, t), Xe(t), r & 8192) {
        if (a = t.memoizedState !== null, (t.stateNode.isHidden = a) && !c && t.mode & 1)
          for (_ = t, c = t.child; c !== null; ) {
            for (f = _ = c; _ !== null; ) {
              switch (p = _, g = p.child, p.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  sr(4, p, p.return);
                  break;
                case 1:
                  yn(p, p.return);
                  var y = p.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    r = p, n = p.return;
                    try {
                      e = r, y.props = e.memoizedProps, y.state = e.memoizedState, y.componentWillUnmount();
                    } catch (v) {
                      G(r, n, v);
                    }
                  }
                  break;
                case 5:
                  yn(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    ma(f);
                    continue;
                  }
              }
              g !== null ? (g.return = p, _ = g) : ma(f);
            }
            c = c.sibling;
          }
        e:
          for (c = null, f = t; ; ) {
            if (f.tag === 5) {
              if (c === null) {
                c = f;
                try {
                  i = f.stateNode, a ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = f.stateNode, u = f.memoizedProps.style, l = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = xc("display", l));
                } catch (v) {
                  G(t, t.return, v);
                }
              }
            } else if (f.tag === 6) {
              if (c === null)
                try {
                  f.stateNode.nodeValue = a ? "" : f.memoizedProps;
                } catch (v) {
                  G(t, t.return, v);
                }
            } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === t) && f.child !== null) {
              f.child.return = f, f = f.child;
              continue;
            }
            if (f === t)
              break e;
            for (; f.sibling === null; ) {
              if (f.return === null || f.return === t)
                break e;
              c === f && (c = null), f = f.return;
            }
            c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
          }
      }
      break;
    case 19:
      Ue(e, t), Xe(t), r & 4 && pa(t);
      break;
    case 21:
      break;
    default:
      Ue(
        e,
        t
      ), Xe(t);
  }
}
function Xe(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      e: {
        for (var n = t.return; n !== null; ) {
          if (Gf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (hr(i, ""), r.flags &= -33);
          var o = da(t);
          Wl(t, o, i);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo, s = da(t);
          Ul(t, s, l);
          break;
        default:
          throw Error(k(161));
      }
    } catch (u) {
      G(t, t.return, u);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function O0(t, e, n) {
  _ = t, qf(t);
}
function qf(t, e, n) {
  for (var r = (t.mode & 1) !== 0; _ !== null; ) {
    var i = _, o = i.child;
    if (i.tag === 22 && r) {
      var l = i.memoizedState !== null || ni;
      if (!l) {
        var s = i.alternate, u = s !== null && s.memoizedState !== null || fe;
        s = ni;
        var a = fe;
        if (ni = l, (fe = u) && !a)
          for (_ = i; _ !== null; )
            l = _, u = l.child, l.tag === 22 && l.memoizedState !== null ? ga(i) : u !== null ? (u.return = l, _ = u) : ga(i);
        for (; o !== null; )
          _ = o, qf(o), o = o.sibling;
        _ = i, ni = s, fe = a;
      }
      ha(t);
    } else
      i.subtreeFlags & 8772 && o !== null ? (o.return = i, _ = o) : ha(t);
  }
}
function ha(t) {
  for (; _ !== null; ) {
    var e = _;
    if (e.flags & 8772) {
      var n = e.alternate;
      try {
        if (e.flags & 8772)
          switch (e.tag) {
            case 0:
            case 11:
            case 15:
              fe || lo(5, e);
              break;
            case 1:
              var r = e.stateNode;
              if (e.flags & 4 && !fe)
                if (n === null)
                  r.componentDidMount();
                else {
                  var i = e.elementType === e.type ? n.memoizedProps : We(e.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = e.updateQueue;
              o !== null && qu(e, o, r);
              break;
            case 3:
              var l = e.updateQueue;
              if (l !== null) {
                if (n = null, e.child !== null)
                  switch (e.child.tag) {
                    case 5:
                      n = e.child.stateNode;
                      break;
                    case 1:
                      n = e.child.stateNode;
                  }
                qu(e, l, n);
              }
              break;
            case 5:
              var s = e.stateNode;
              if (n === null && e.flags & 4) {
                n = s;
                var u = e.memoizedProps;
                switch (e.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (e.memoizedState === null) {
                var a = e.alternate;
                if (a !== null) {
                  var c = a.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && vr(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(k(163));
          }
        fe || e.flags & 512 && Vl(e);
      } catch (p) {
        G(e, e.return, p);
      }
    }
    if (e === t) {
      _ = null;
      break;
    }
    if (n = e.sibling, n !== null) {
      n.return = e.return, _ = n;
      break;
    }
    _ = e.return;
  }
}
function ma(t) {
  for (; _ !== null; ) {
    var e = _;
    if (e === t) {
      _ = null;
      break;
    }
    var n = e.sibling;
    if (n !== null) {
      n.return = e.return, _ = n;
      break;
    }
    _ = e.return;
  }
}
function ga(t) {
  for (; _ !== null; ) {
    var e = _;
    try {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          var n = e.return;
          try {
            lo(4, e);
          } catch (u) {
            G(e, n, u);
          }
          break;
        case 1:
          var r = e.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = e.return;
            try {
              r.componentDidMount();
            } catch (u) {
              G(e, i, u);
            }
          }
          var o = e.return;
          try {
            Vl(e);
          } catch (u) {
            G(e, o, u);
          }
          break;
        case 5:
          var l = e.return;
          try {
            Vl(e);
          } catch (u) {
            G(e, l, u);
          }
      }
    } catch (u) {
      G(e, e.return, u);
    }
    if (e === t) {
      _ = null;
      break;
    }
    var s = e.sibling;
    if (s !== null) {
      s.return = e.return, _ = s;
      break;
    }
    _ = e.return;
  }
}
var R0 = Math.ceil, Hi = dt.ReactCurrentDispatcher, js = dt.ReactCurrentOwner, Be = dt.ReactCurrentBatchConfig, L = 0, oe = null, q = null, se = 0, _e = 0, vn = Lt(0), te = 0, Pr = null, bt = 0, so = 0, Vs = 0, ur = null, we = null, Us = 0, Rn = 1 / 0, nt = null, Ji = !1, Hl = null, Mt = null, ri = !1, St = null, Qi = 0, ar = 0, Jl = null, gi = -1, yi = 0;
function ge() {
  return L & 6 ? Z() : gi !== -1 ? gi : gi = Z();
}
function Tt(t) {
  return t.mode & 1 ? L & 2 && se !== 0 ? se & -se : g0.transition !== null ? (yi === 0 && (yi = Lc()), yi) : (t = A, t !== 0 || (t = window.event, t = t === void 0 ? 16 : Uc(t.type)), t) : 1;
}
function Ye(t, e, n, r) {
  if (50 < ar)
    throw ar = 0, Jl = null, Error(k(185));
  Rr(t, n, r), (!(L & 2) || t !== oe) && (t === oe && (!(L & 2) && (so |= n), te === 4 && wt(t, se)), Ne(t, r), n === 1 && L === 0 && !(e.mode & 1) && (Rn = Z() + 500, ro && At()));
}
function Ne(t, e) {
  var n = t.callbackNode;
  gm(t, e);
  var r = Pi(t, t === oe ? se : 0);
  if (r === 0)
    n !== null && Cu(n), t.callbackNode = null, t.callbackPriority = 0;
  else if (e = r & -r, t.callbackPriority !== e) {
    if (n != null && Cu(n), e === 1)
      t.tag === 0 ? m0(ya.bind(null, t)) : uf(ya.bind(null, t)), f0(function() {
        !(L & 6) && At();
      }), n = null;
    else {
      switch (Ac(r)) {
        case 1:
          n = hs;
          break;
        case 4:
          n = Rc;
          break;
        case 16:
          n = Ti;
          break;
        case 536870912:
          n = Fc;
          break;
        default:
          n = Ti;
      }
      n = ld(n, bf.bind(null, t));
    }
    t.callbackPriority = e, t.callbackNode = n;
  }
}
function bf(t, e) {
  if (gi = -1, yi = 0, L & 6)
    throw Error(k(327));
  var n = t.callbackNode;
  if (Cn() && t.callbackNode !== n)
    return null;
  var r = Pi(t, t === oe ? se : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & t.expiredLanes || e)
    e = Ki(t, r);
  else {
    e = r;
    var i = L;
    L |= 2;
    var o = td();
    (oe !== t || se !== e) && (nt = null, Rn = Z() + 500, Yt(t, e));
    do
      try {
        A0();
        break;
      } catch (s) {
        ed(t, s);
      }
    while (!0);
    Ms(), Hi.current = o, L = i, q !== null ? e = 0 : (oe = null, se = 0, e = te);
  }
  if (e !== 0) {
    if (e === 2 && (i = vl(t), i !== 0 && (r = i, e = Ql(t, i))), e === 1)
      throw n = Pr, Yt(t, 0), wt(t, r), Ne(t, Z()), n;
    if (e === 6)
      wt(t, r);
    else {
      if (i = t.current.alternate, !(r & 30) && !F0(i) && (e = Ki(t, r), e === 2 && (o = vl(t), o !== 0 && (r = o, e = Ql(t, o))), e === 1))
        throw n = Pr, Yt(t, 0), wt(t, r), Ne(t, Z()), n;
      switch (t.finishedWork = i, t.finishedLanes = r, e) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          jt(t, we, nt);
          break;
        case 3:
          if (wt(t, r), (r & 130023424) === r && (e = Us + 500 - Z(), 10 < e)) {
            if (Pi(t, 0) !== 0)
              break;
            if (i = t.suspendedLanes, (i & r) !== r) {
              ge(), t.pingedLanes |= t.suspendedLanes & i;
              break;
            }
            t.timeoutHandle = _l(jt.bind(null, t, we, nt), e);
            break;
          }
          jt(t, we, nt);
          break;
        case 4:
          if (wt(t, r), (r & 4194240) === r)
            break;
          for (e = t.eventTimes, i = -1; 0 < r; ) {
            var l = 31 - Ke(r);
            o = 1 << l, l = e[l], l > i && (i = l), r &= ~o;
          }
          if (r = i, r = Z() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * R0(r / 1960)) - r, 10 < r) {
            t.timeoutHandle = _l(jt.bind(null, t, we, nt), r);
            break;
          }
          jt(t, we, nt);
          break;
        case 5:
          jt(t, we, nt);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return Ne(t, Z()), t.callbackNode === n ? bf.bind(null, t) : null;
}
function Ql(t, e) {
  var n = ur;
  return t.current.memoizedState.isDehydrated && (Yt(t, e).flags |= 256), t = Ki(t, e), t !== 2 && (e = we, we = n, e !== null && Kl(e)), t;
}
function Kl(t) {
  we === null ? we = t : we.push.apply(we, t);
}
function F0(t) {
  for (var e = t; ; ) {
    if (e.flags & 16384) {
      var n = e.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r], o = i.getSnapshot;
          i = i.value;
          try {
            if (!Ge(o(), i))
              return !1;
          } catch {
            return !1;
          }
        }
    }
    if (n = e.child, e.subtreeFlags & 16384 && n !== null)
      n.return = e, e = n;
    else {
      if (e === t)
        break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t)
          return !0;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
  }
  return !0;
}
function wt(t, e) {
  for (e &= ~Vs, e &= ~so, t.suspendedLanes |= e, t.pingedLanes &= ~e, t = t.expirationTimes; 0 < e; ) {
    var n = 31 - Ke(e), r = 1 << n;
    t[n] = -1, e &= ~r;
  }
}
function ya(t) {
  if (L & 6)
    throw Error(k(327));
  Cn();
  var e = Pi(t, 0);
  if (!(e & 1))
    return Ne(t, Z()), null;
  var n = Ki(t, e);
  if (t.tag !== 0 && n === 2) {
    var r = vl(t);
    r !== 0 && (e = r, n = Ql(t, r));
  }
  if (n === 1)
    throw n = Pr, Yt(t, 0), wt(t, e), Ne(t, Z()), n;
  if (n === 6)
    throw Error(k(345));
  return t.finishedWork = t.current.alternate, t.finishedLanes = e, jt(t, we, nt), Ne(t, Z()), null;
}
function Ws(t, e) {
  var n = L;
  L |= 1;
  try {
    return t(e);
  } finally {
    L = n, L === 0 && (Rn = Z() + 500, ro && At());
  }
}
function en(t) {
  St !== null && St.tag === 0 && !(L & 6) && Cn();
  var e = L;
  L |= 1;
  var n = Be.transition, r = A;
  try {
    if (Be.transition = null, A = 1, t)
      return t();
  } finally {
    A = r, Be.transition = n, L = e, !(L & 6) && At();
  }
}
function Hs() {
  _e = vn.current, W(vn);
}
function Yt(t, e) {
  t.finishedWork = null, t.finishedLanes = 0;
  var n = t.timeoutHandle;
  if (n !== -1 && (t.timeoutHandle = -1, c0(n)), q !== null)
    for (n = q.return; n !== null; ) {
      var r = n;
      switch (Ns(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Fi();
          break;
        case 3:
          In(), W(xe), W(pe), Rs();
          break;
        case 5:
          Os(r);
          break;
        case 4:
          In();
          break;
        case 13:
          W(J);
          break;
        case 19:
          W(J);
          break;
        case 10:
          Ts(r.type._context);
          break;
        case 22:
        case 23:
          Hs();
      }
      n = n.return;
    }
  if (oe = t, q = t = Pt(t.current, null), se = _e = e, te = 0, Pr = null, Vs = so = bt = 0, we = ur = null, Qt !== null) {
    for (e = 0; e < Qt.length; e++)
      if (n = Qt[e], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, o = n.pending;
        if (o !== null) {
          var l = o.next;
          o.next = i, r.next = l;
        }
        n.pending = r;
      }
    Qt = null;
  }
  return t;
}
function ed(t, e) {
  do {
    var n = q;
    try {
      if (Ms(), pi.current = Wi, Ui) {
        for (var r = K.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), r = r.next;
        }
        Ui = !1;
      }
      if (qt = 0, ie = ee = K = null, lr = !1, _r = 0, js.current = null, n === null || n.return === null) {
        te = 1, Pr = e, q = null;
        break;
      }
      e: {
        var o = t, l = n.return, s = n, u = e;
        if (e = se, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var a = u, c = s, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = c.alternate;
            p ? (c.updateQueue = p.updateQueue, c.memoizedState = p.memoizedState, c.lanes = p.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var g = ia(l);
          if (g !== null) {
            g.flags &= -257, oa(g, l, s, o, e), g.mode & 1 && ra(o, a, e), e = g, u = a;
            var y = e.updateQueue;
            if (y === null) {
              var v = /* @__PURE__ */ new Set();
              v.add(u), e.updateQueue = v;
            } else
              y.add(u);
            break e;
          } else {
            if (!(e & 1)) {
              ra(o, a, e), Js();
              break e;
            }
            u = Error(k(426));
          }
        } else if (H && s.mode & 1) {
          var E = ia(l);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256), oa(E, l, s, o, e), Cs(On(u, s));
            break e;
          }
        }
        o = u = On(u, s), te !== 4 && (te = 2), ur === null ? ur = [o] : ur.push(o), o = l;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, e &= -e, o.lanes |= e;
              var h = Df(o, u, e);
              Zu(o, h);
              break e;
            case 1:
              s = u;
              var d = o.type, m = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (Mt === null || !Mt.has(m)))) {
                o.flags |= 65536, e &= -e, o.lanes |= e;
                var w = Bf(o, s, e);
                Zu(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      rd(n);
    } catch (S) {
      e = S, q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function td() {
  var t = Hi.current;
  return Hi.current = Wi, t === null ? Wi : t;
}
function Js() {
  (te === 0 || te === 3 || te === 2) && (te = 4), oe === null || !(bt & 268435455) && !(so & 268435455) || wt(oe, se);
}
function Ki(t, e) {
  var n = L;
  L |= 2;
  var r = td();
  (oe !== t || se !== e) && (nt = null, Yt(t, e));
  do
    try {
      L0();
      break;
    } catch (i) {
      ed(t, i);
    }
  while (!0);
  if (Ms(), L = n, Hi.current = r, q !== null)
    throw Error(k(261));
  return oe = null, se = 0, te;
}
function L0() {
  for (; q !== null; )
    nd(q);
}
function A0() {
  for (; q !== null && !sm(); )
    nd(q);
}
function nd(t) {
  var e = od(t.alternate, t, _e);
  t.memoizedProps = t.pendingProps, e === null ? rd(t) : q = e, js.current = null;
}
function rd(t) {
  var e = t;
  do {
    var n = e.alternate;
    if (t = e.return, e.flags & 32768) {
      if (n = P0(n, e), n !== null) {
        n.flags &= 32767, q = n;
        return;
      }
      if (t !== null)
        t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null;
      else {
        te = 6, q = null;
        return;
      }
    } else if (n = T0(n, e, _e), n !== null) {
      q = n;
      return;
    }
    if (e = e.sibling, e !== null) {
      q = e;
      return;
    }
    q = e = t;
  } while (e !== null);
  te === 0 && (te = 5);
}
function jt(t, e, n) {
  var r = A, i = Be.transition;
  try {
    Be.transition = null, A = 1, D0(t, e, n, r);
  } finally {
    Be.transition = i, A = r;
  }
  return null;
}
function D0(t, e, n, r) {
  do
    Cn();
  while (St !== null);
  if (L & 6)
    throw Error(k(327));
  n = t.finishedWork;
  var i = t.finishedLanes;
  if (n === null)
    return null;
  if (t.finishedWork = null, t.finishedLanes = 0, n === t.current)
    throw Error(k(177));
  t.callbackNode = null, t.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (ym(t, o), t === oe && (q = oe = null, se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || ri || (ri = !0, ld(Ti, function() {
    return Cn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Be.transition, Be.transition = null;
    var l = A;
    A = 1;
    var s = L;
    L |= 4, js.current = null, I0(t, n), Zf(n, t), r0(Nl), zi = !!El, Nl = El = null, t.current = n, O0(n), um(), L = s, A = l, Be.transition = o;
  } else
    t.current = n;
  if (ri && (ri = !1, St = t, Qi = i), o = t.pendingLanes, o === 0 && (Mt = null), fm(n.stateNode), Ne(t, Z()), e !== null)
    for (r = t.onRecoverableError, n = 0; n < e.length; n++)
      i = e[n], r(i.value, { componentStack: i.stack, digest: i.digest });
  if (Ji)
    throw Ji = !1, t = Hl, Hl = null, t;
  return Qi & 1 && t.tag !== 0 && Cn(), o = t.pendingLanes, o & 1 ? t === Jl ? ar++ : (ar = 0, Jl = t) : ar = 0, At(), null;
}
function Cn() {
  if (St !== null) {
    var t = Ac(Qi), e = Be.transition, n = A;
    try {
      if (Be.transition = null, A = 16 > t ? 16 : t, St === null)
        var r = !1;
      else {
        if (t = St, St = null, Qi = 0, L & 6)
          throw Error(k(331));
        var i = L;
        for (L |= 4, _ = t.current; _ !== null; ) {
          var o = _, l = o.child;
          if (_.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var a = s[u];
                for (_ = a; _ !== null; ) {
                  var c = _;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      sr(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null)
                    f.return = c, _ = f;
                  else
                    for (; _ !== null; ) {
                      c = _;
                      var p = c.sibling, g = c.return;
                      if (Yf(c), c === a) {
                        _ = null;
                        break;
                      }
                      if (p !== null) {
                        p.return = g, _ = p;
                        break;
                      }
                      _ = g;
                    }
                }
              }
              var y = o.alternate;
              if (y !== null) {
                var v = y.child;
                if (v !== null) {
                  y.child = null;
                  do {
                    var E = v.sibling;
                    v.sibling = null, v = E;
                  } while (v !== null);
                }
              }
              _ = o;
            }
          }
          if (o.subtreeFlags & 2064 && l !== null)
            l.return = o, _ = l;
          else
            e:
              for (; _ !== null; ) {
                if (o = _, o.flags & 2048)
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      sr(9, o, o.return);
                  }
                var h = o.sibling;
                if (h !== null) {
                  h.return = o.return, _ = h;
                  break e;
                }
                _ = o.return;
              }
        }
        var d = t.current;
        for (_ = d; _ !== null; ) {
          l = _;
          var m = l.child;
          if (l.subtreeFlags & 2064 && m !== null)
            m.return = l, _ = m;
          else
            e:
              for (l = d; _ !== null; ) {
                if (s = _, s.flags & 2048)
                  try {
                    switch (s.tag) {
                      case 0:
                      case 11:
                      case 15:
                        lo(9, s);
                    }
                  } catch (S) {
                    G(s, s.return, S);
                  }
                if (s === l) {
                  _ = null;
                  break e;
                }
                var w = s.sibling;
                if (w !== null) {
                  w.return = s.return, _ = w;
                  break e;
                }
                _ = s.return;
              }
        }
        if (L = i, At(), et && typeof et.onPostCommitFiberRoot == "function")
          try {
            et.onPostCommitFiberRoot(qi, t);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      A = n, Be.transition = e;
    }
  }
  return !1;
}
function va(t, e, n) {
  e = On(n, e), e = Df(t, e, 1), t = _t(t, e, 1), e = ge(), t !== null && (Rr(t, 1, e), Ne(t, e));
}
function G(t, e, n) {
  if (t.tag === 3)
    va(t, t, n);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        va(e, t, n);
        break;
      } else if (e.tag === 1) {
        var r = e.stateNode;
        if (typeof e.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Mt === null || !Mt.has(r))) {
          t = On(n, t), t = Bf(e, t, 1), e = _t(e, t, 1), t = ge(), e !== null && (Rr(e, 1, t), Ne(e, t));
          break;
        }
      }
      e = e.return;
    }
}
function B0(t, e, n) {
  var r = t.pingCache;
  r !== null && r.delete(e), e = ge(), t.pingedLanes |= t.suspendedLanes & n, oe === t && (se & n) === n && (te === 4 || te === 3 && (se & 130023424) === se && 500 > Z() - Us ? Yt(t, 0) : Vs |= n), Ne(t, e);
}
function id(t, e) {
  e === 0 && (t.mode & 1 ? (e = Kr, Kr <<= 1, !(Kr & 130023424) && (Kr = 4194304)) : e = 1);
  var n = ge();
  t = ct(t, e), t !== null && (Rr(t, e, n), Ne(t, n));
}
function $0(t) {
  var e = t.memoizedState, n = 0;
  e !== null && (n = e.retryLane), id(t, n);
}
function j0(t, e) {
  var n = 0;
  switch (t.tag) {
    case 13:
      var r = t.stateNode, i = t.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = t.stateNode;
      break;
    default:
      throw Error(k(314));
  }
  r !== null && r.delete(e), id(t, n);
}
var od;
od = function(t, e, n) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps || xe.current)
      ke = !0;
    else {
      if (!(t.lanes & n) && !(e.flags & 128))
        return ke = !1, M0(t, e, n);
      ke = !!(t.flags & 131072);
    }
  else
    ke = !1, H && e.flags & 1048576 && af(e, Di, e.index);
  switch (e.lanes = 0, e.tag) {
    case 2:
      var r = e.type;
      mi(t, e), t = e.pendingProps;
      var i = Tn(e, pe.current);
      Nn(e, n), i = Ls(null, e, r, t, i, n);
      var o = As();
      return e.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (e.tag = 1, e.memoizedState = null, e.updateQueue = null, Ee(r) ? (o = !0, Li(e)) : o = !1, e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, zs(e), i.updater = oo, e.stateNode = i, i._reactInternals = e, Rl(e, r, t, n), e = Al(null, e, r, !0, o, n)) : (e.tag = 0, H && o && Es(e), me(null, e, i, n), e = e.child), e;
    case 16:
      r = e.elementType;
      e: {
        switch (mi(t, e), t = e.pendingProps, i = r._init, r = i(r._payload), e.type = r, i = e.tag = U0(r), t = We(r, t), i) {
          case 0:
            e = Ll(null, e, r, t, n);
            break e;
          case 1:
            e = ua(null, e, r, t, n);
            break e;
          case 11:
            e = la(null, e, r, t, n);
            break e;
          case 14:
            e = sa(null, e, r, We(r.type, t), n);
            break e;
        }
        throw Error(k(
          306,
          r,
          ""
        ));
      }
      return e;
    case 0:
      return r = e.type, i = e.pendingProps, i = e.elementType === r ? i : We(r, i), Ll(t, e, r, i, n);
    case 1:
      return r = e.type, i = e.pendingProps, i = e.elementType === r ? i : We(r, i), ua(t, e, r, i, n);
    case 3:
      e: {
        if (Uf(e), t === null)
          throw Error(k(387));
        r = e.pendingProps, o = e.memoizedState, i = o.element, mf(t, e), ji(e, r, null, n);
        var l = e.memoizedState;
        if (r = l.element, o.isDehydrated)
          if (o = { element: r, isDehydrated: !1, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }, e.updateQueue.baseState = o, e.memoizedState = o, e.flags & 256) {
            i = On(Error(k(423)), e), e = aa(t, e, r, n, i);
            break e;
          } else if (r !== i) {
            i = On(Error(k(424)), e), e = aa(t, e, r, n, i);
            break e;
          } else
            for (ze = Ct(e.stateNode.containerInfo.firstChild), Ie = e, H = !0, Je = null, n = pf(e, null, r, n), e.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Pn(), r === i) {
            e = ft(t, e, n);
            break e;
          }
          me(t, e, r, n);
        }
        e = e.child;
      }
      return e;
    case 5:
      return gf(e), t === null && zl(e), r = e.type, i = e.pendingProps, o = t !== null ? t.memoizedProps : null, l = i.children, Cl(r, i) ? l = null : o !== null && Cl(r, o) && (e.flags |= 32), Vf(t, e), me(t, e, l, n), e.child;
    case 6:
      return t === null && zl(e), null;
    case 13:
      return Wf(t, e, n);
    case 4:
      return Is(e, e.stateNode.containerInfo), r = e.pendingProps, t === null ? e.child = zn(e, null, r, n) : me(t, e, r, n), e.child;
    case 11:
      return r = e.type, i = e.pendingProps, i = e.elementType === r ? i : We(r, i), la(t, e, r, i, n);
    case 7:
      return me(t, e, e.pendingProps, n), e.child;
    case 8:
      return me(t, e, e.pendingProps.children, n), e.child;
    case 12:
      return me(t, e, e.pendingProps.children, n), e.child;
    case 10:
      e: {
        if (r = e.type._context, i = e.pendingProps, o = e.memoizedProps, l = i.value, j(Bi, r._currentValue), r._currentValue = l, o !== null)
          if (Ge(o.value, l)) {
            if (o.children === i.children && !xe.current) {
              e = ft(t, e, n);
              break e;
            }
          } else
            for (o = e.child, o !== null && (o.return = e); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                l = o.child;
                for (var u = s.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      u = lt(-1, n & -n), u.tag = 2;
                      var a = o.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var c = a.pending;
                        c === null ? u.next = u : (u.next = c.next, c.next = u), a.pending = u;
                      }
                    }
                    o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Il(
                      o.return,
                      n,
                      e
                    ), s.lanes |= n;
                    break;
                  }
                  u = u.next;
                }
              } else if (o.tag === 10)
                l = o.type === e.type ? null : o.child;
              else if (o.tag === 18) {
                if (l = o.return, l === null)
                  throw Error(k(341));
                l.lanes |= n, s = l.alternate, s !== null && (s.lanes |= n), Il(l, n, e), l = o.sibling;
              } else
                l = o.child;
              if (l !== null)
                l.return = o;
              else
                for (l = o; l !== null; ) {
                  if (l === e) {
                    l = null;
                    break;
                  }
                  if (o = l.sibling, o !== null) {
                    o.return = l.return, l = o;
                    break;
                  }
                  l = l.return;
                }
              o = l;
            }
        me(t, e, i.children, n), e = e.child;
      }
      return e;
    case 9:
      return i = e.type, r = e.pendingProps.children, Nn(e, n), i = $e(i), r = r(i), e.flags |= 1, me(t, e, r, n), e.child;
    case 14:
      return r = e.type, i = We(r, e.pendingProps), i = We(r.type, i), sa(t, e, r, i, n);
    case 15:
      return $f(t, e, e.type, e.pendingProps, n);
    case 17:
      return r = e.type, i = e.pendingProps, i = e.elementType === r ? i : We(r, i), mi(t, e), e.tag = 1, Ee(r) ? (t = !0, Li(e)) : t = !1, Nn(e, n), Af(e, r, i), Rl(e, r, i, n), Al(null, e, r, !0, t, n);
    case 19:
      return Hf(t, e, n);
    case 22:
      return jf(t, e, n);
  }
  throw Error(k(156, e.tag));
};
function ld(t, e) {
  return Oc(t, e);
}
function V0(t, e, n, r) {
  this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function De(t, e, n, r) {
  return new V0(t, e, n, r);
}
function Qs(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function U0(t) {
  if (typeof t == "function")
    return Qs(t) ? 1 : 0;
  if (t != null) {
    if (t = t.$$typeof, t === fs)
      return 11;
    if (t === ds)
      return 14;
  }
  return 2;
}
function Pt(t, e) {
  var n = t.alternate;
  return n === null ? (n = De(t.tag, e, t.key, t.mode), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 14680064, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n;
}
function vi(t, e, n, r, i, o) {
  var l = 2;
  if (r = t, typeof t == "function")
    Qs(t) && (l = 1);
  else if (typeof t == "string")
    l = 5;
  else
    e:
      switch (t) {
        case un:
          return Gt(n.children, i, o, e);
        case cs:
          l = 8, i |= 8;
          break;
        case rl:
          return t = De(12, n, e, i | 2), t.elementType = rl, t.lanes = o, t;
        case il:
          return t = De(13, n, e, i), t.elementType = il, t.lanes = o, t;
        case ol:
          return t = De(19, n, e, i), t.elementType = ol, t.lanes = o, t;
        case mc:
          return uo(n, i, o, e);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case pc:
                l = 10;
                break e;
              case hc:
                l = 9;
                break e;
              case fs:
                l = 11;
                break e;
              case ds:
                l = 14;
                break e;
              case gt:
                l = 16, r = null;
                break e;
            }
          throw Error(k(130, t == null ? t : typeof t, ""));
      }
  return e = De(l, n, e, i), e.elementType = t, e.type = r, e.lanes = o, e;
}
function Gt(t, e, n, r) {
  return t = De(7, t, r, e), t.lanes = n, t;
}
function uo(t, e, n, r) {
  return t = De(22, t, r, e), t.elementType = mc, t.lanes = n, t.stateNode = { isHidden: !1 }, t;
}
function Xo(t, e, n) {
  return t = De(6, t, null, e), t.lanes = n, t;
}
function Zo(t, e, n) {
  return e = De(4, t.children !== null ? t.children : [], t.key, e), e.lanes = n, e.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, e;
}
function W0(t, e, n, r, i) {
  this.tag = e, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Io(0), this.expirationTimes = Io(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Io(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
}
function Ks(t, e, n, r, i, o, l, s, u) {
  return t = new W0(t, e, n, s, u), e === 1 ? (e = 1, o === !0 && (e |= 8)) : e = 0, o = De(3, null, null, e), t.current = o, o.stateNode = t, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, zs(o), t;
}
function H0(t, e, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: sn, key: r == null ? null : "" + r, children: t, containerInfo: e, implementation: n };
}
function sd(t) {
  if (!t)
    return Ot;
  t = t._reactInternals;
  e: {
    if (rn(t) !== t || t.tag !== 1)
      throw Error(k(170));
    var e = t;
    do {
      switch (e.tag) {
        case 3:
          e = e.stateNode.context;
          break e;
        case 1:
          if (Ee(e.type)) {
            e = e.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      e = e.return;
    } while (e !== null);
    throw Error(k(171));
  }
  if (t.tag === 1) {
    var n = t.type;
    if (Ee(n))
      return sf(t, n, e);
  }
  return e;
}
function ud(t, e, n, r, i, o, l, s, u) {
  return t = Ks(n, r, !0, t, i, o, l, s, u), t.context = sd(null), n = t.current, r = ge(), i = Tt(n), o = lt(r, i), o.callback = e ?? null, _t(n, o, i), t.current.lanes = i, Rr(t, i, r), Ne(t, r), t;
}
function ao(t, e, n, r) {
  var i = e.current, o = ge(), l = Tt(i);
  return n = sd(n), e.context === null ? e.context = n : e.pendingContext = n, e = lt(o, l), e.payload = { element: t }, r = r === void 0 ? null : r, r !== null && (e.callback = r), t = _t(i, e, l), t !== null && (Ye(t, i, l, o), di(t, i, l)), l;
}
function Yi(t) {
  if (t = t.current, !t.child)
    return null;
  switch (t.child.tag) {
    case 5:
      return t.child.stateNode;
    default:
      return t.child.stateNode;
  }
}
function wa(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function Ys(t, e) {
  wa(t, e), (t = t.alternate) && wa(t, e);
}
function J0() {
  return null;
}
var ad = typeof reportError == "function" ? reportError : function(t) {
  console.error(t);
};
function Gs(t) {
  this._internalRoot = t;
}
co.prototype.render = Gs.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null)
    throw Error(k(409));
  ao(t, e, null, null);
};
co.prototype.unmount = Gs.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    en(function() {
      ao(null, t, null, null);
    }), e[at] = null;
  }
};
function co(t) {
  this._internalRoot = t;
}
co.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = $c();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < vt.length && e !== 0 && e < vt[n].priority; n++)
      ;
    vt.splice(n, 0, t), n === 0 && Vc(t);
  }
};
function Xs(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function fo(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 && (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "));
}
function ka() {
}
function Q0(t, e, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var a = Yi(l);
        o.call(a);
      };
    }
    var l = ud(e, r, t, 0, null, !1, !1, "", ka);
    return t._reactRootContainer = l, t[at] = l.current, Sr(t.nodeType === 8 ? t.parentNode : t), en(), l;
  }
  for (; i = t.lastChild; )
    t.removeChild(i);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var a = Yi(u);
      s.call(a);
    };
  }
  var u = Ks(t, 0, !1, null, null, !1, !1, "", ka);
  return t._reactRootContainer = u, t[at] = u.current, Sr(t.nodeType === 8 ? t.parentNode : t), en(function() {
    ao(e, u, n, r);
  }), u;
}
function po(t, e, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var l = o;
    if (typeof i == "function") {
      var s = i;
      i = function() {
        var u = Yi(l);
        s.call(u);
      };
    }
    ao(e, l, t, i);
  } else
    l = Q0(n, e, t, i, r);
  return Yi(l);
}
Dc = function(t) {
  switch (t.tag) {
    case 3:
      var e = t.stateNode;
      if (e.current.memoizedState.isDehydrated) {
        var n = Zn(e.pendingLanes);
        n !== 0 && (ms(e, n | 1), Ne(e, Z()), !(L & 6) && (Rn = Z() + 500, At()));
      }
      break;
    case 13:
      en(function() {
        var r = ct(t, 1);
        if (r !== null) {
          var i = ge();
          Ye(r, t, 1, i);
        }
      }), Ys(t, 1);
  }
};
gs = function(t) {
  if (t.tag === 13) {
    var e = ct(t, 134217728);
    if (e !== null) {
      var n = ge();
      Ye(e, t, 134217728, n);
    }
    Ys(t, 134217728);
  }
};
Bc = function(t) {
  if (t.tag === 13) {
    var e = Tt(t), n = ct(t, e);
    if (n !== null) {
      var r = ge();
      Ye(n, t, e, r);
    }
    Ys(t, e);
  }
};
$c = function() {
  return A;
};
jc = function(t, e) {
  var n = A;
  try {
    return A = t, e();
  } finally {
    A = n;
  }
};
ml = function(t, e, n) {
  switch (e) {
    case "input":
      if (ul(t, n), e = n.name, n.type === "radio" && e != null) {
        for (n = t; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + e) + '][type="radio"]'), e = 0; e < n.length; e++) {
          var r = n[e];
          if (r !== t && r.form === t.form) {
            var i = no(r);
            if (!i)
              throw Error(k(90));
            yc(r), ul(r, i);
          }
        }
      }
      break;
    case "textarea":
      wc(t, n);
      break;
    case "select":
      e = n.value, e != null && kn(t, !!n.multiple, e, !1);
  }
};
_c = Ws;
Mc = en;
var K0 = { usingClientEntryPoint: !1, Events: [Lr, dn, no, Nc, Cc, Ws] }, Qn = { findFiberByHostInstance: Jt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Y0 = { bundleType: Qn.bundleType, version: Qn.version, rendererPackageName: Qn.rendererPackageName, rendererConfig: Qn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: dt.ReactCurrentDispatcher, findHostInstanceByFiber: function(t) {
  return t = zc(t), t === null ? null : t.stateNode;
}, findFiberByHostInstance: Qn.findFiberByHostInstance || J0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ii = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ii.isDisabled && ii.supportsFiber)
    try {
      qi = ii.inject(Y0), et = ii;
    } catch {
    }
}
Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K0;
Re.createPortal = function(t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Xs(e))
    throw Error(k(200));
  return H0(t, e, null, n);
};
Re.createRoot = function(t, e) {
  if (!Xs(t))
    throw Error(k(299));
  var n = !1, r = "", i = ad;
  return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (r = e.identifierPrefix), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = Ks(t, 1, !1, null, null, n, !1, r, i), t[at] = e.current, Sr(t.nodeType === 8 ? t.parentNode : t), new Gs(e);
};
Re.findDOMNode = function(t) {
  if (t == null)
    return null;
  if (t.nodeType === 1)
    return t;
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function" ? Error(k(188)) : (t = Object.keys(t).join(","), Error(k(268, t)));
  return t = zc(e), t = t === null ? null : t.stateNode, t;
};
Re.flushSync = function(t) {
  return en(t);
};
Re.hydrate = function(t, e, n) {
  if (!fo(e))
    throw Error(k(200));
  return po(null, t, e, !0, n);
};
Re.hydrateRoot = function(t, e, n) {
  if (!Xs(t))
    throw Error(k(405));
  var r = n != null && n.hydratedSources || null, i = !1, o = "", l = ad;
  if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), e = ud(e, null, t, 1, n ?? null, i, !1, o, l), t[at] = e.current, Sr(t), r)
    for (t = 0; t < r.length; t++)
      n = r[t], i = n._getVersion, i = i(n._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, i] : e.mutableSourceEagerHydrationData.push(
        n,
        i
      );
  return new co(e);
};
Re.render = function(t, e, n) {
  if (!fo(e))
    throw Error(k(200));
  return po(null, t, e, !1, n);
};
Re.unmountComponentAtNode = function(t) {
  if (!fo(t))
    throw Error(k(40));
  return t._reactRootContainer ? (en(function() {
    po(null, null, t, !1, function() {
      t._reactRootContainer = null, t[at] = null;
    });
  }), !0) : !1;
};
Re.unstable_batchedUpdates = Ws;
Re.unstable_renderSubtreeIntoContainer = function(t, e, n, r) {
  if (!fo(n))
    throw Error(k(200));
  if (t == null || t._reactInternals === void 0)
    throw Error(k(38));
  return po(t, e, n, !1, r);
};
Re.version = "18.3.1-next-f1338f8080-20240426";
function cd() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cd);
    } catch (t) {
      console.error(t);
    }
}
cd(), ac.exports = Re;
var fd = ac.exports;
const G0 = /* @__PURE__ */ ba(fd), X0 = (...t) => (e) => {
  t.forEach((n) => {
    typeof n == "function" ? n(e) : n && (n.current = e);
  });
}, Z0 = ({ renderers: t }) => U.createElement(U.Fragment, null, Object.entries(t).map(([e, n]) => G0.createPortal(n.reactElement, n.element, e)));
class q0 extends U.Component {
  constructor(e) {
    super(e), this.editorContentRef = U.createRef(), this.initialized = !1, this.state = {
      renderers: {}
    };
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  init() {
    const { editor: e } = this.props;
    if (e && e.options.element) {
      if (e.contentComponent)
        return;
      const n = this.editorContentRef.current;
      n.append(...e.options.element.childNodes), e.setOptions({
        element: n
      }), e.contentComponent = this, e.createNodeViews(), this.initialized = !0;
    }
  }
  maybeFlushSync(e) {
    this.initialized ? fd.flushSync(e) : e();
  }
  setRenderer(e, n) {
    this.maybeFlushSync(() => {
      this.setState(({ renderers: r }) => ({
        renderers: {
          ...r,
          [e]: n
        }
      }));
    });
  }
  removeRenderer(e) {
    this.maybeFlushSync(() => {
      this.setState(({ renderers: n }) => {
        const r = { ...n };
        return delete r[e], { renderers: r };
      });
    });
  }
  componentWillUnmount() {
    const { editor: e } = this.props;
    if (!e || (this.initialized = !1, e.isDestroyed || e.view.setProps({
      nodeViews: {}
    }), e.contentComponent = null, !e.options.element.firstChild))
      return;
    const n = document.createElement("div");
    n.append(...e.options.element.childNodes), e.setOptions({
      element: n
    });
  }
  render() {
    const { editor: e, innerRef: n, ...r } = this.props;
    return U.createElement(
      U.Fragment,
      null,
      U.createElement("div", { ref: X0(n, this.editorContentRef), ...r }),
      U.createElement(Z0, { renderers: this.state.renderers })
    );
  }
}
const b0 = An.forwardRef((t, e) => {
  const n = U.useMemo(() => Math.floor(Math.random() * 4294967295).toString(), [t.editor]);
  return U.createElement(q0, {
    key: n,
    innerRef: e,
    ...t
  });
});
U.memo(b0);
const eg = An.createContext({
  editor: null
});
eg.Consumer;
const dd = An.createContext({
  onDragStart: void 0
}), tg = () => An.useContext(dd), ng = U.forwardRef((t, e) => {
  const { onDragStart: n } = tg(), r = t.as || "div";
  return U.createElement(r, { ...t, ref: e, "data-node-view-wrapper": "", onDragStart: n, style: {
    whiteSpace: "normal",
    ...t.style
  } });
});
function rg(t) {
  return !!(typeof t == "function" && t.prototype && t.prototype.isReactComponent);
}
function ig(t) {
  var e;
  return typeof t == "object" && ((e = t.$$typeof) === null || e === void 0 ? void 0 : e.toString()) === "Symbol(react.forward_ref)";
}
class og {
  constructor(e, { editor: n, props: r = {}, as: i = "div", className: o = "", attrs: l }) {
    this.ref = null, this.id = Math.floor(Math.random() * 4294967295).toString(), this.component = e, this.editor = n, this.props = r, this.element = document.createElement(i), this.element.classList.add("react-renderer"), o && this.element.classList.add(...o.split(" ")), l && Object.keys(l).forEach((s) => {
      this.element.setAttribute(s, l[s]);
    }), this.render();
  }
  render() {
    var e, n;
    const r = this.component, i = this.props;
    (rg(r) || ig(r)) && (i.ref = (o) => {
      this.ref = o;
    }), this.reactElement = U.createElement(r, { ...i }), (n = (e = this.editor) === null || e === void 0 ? void 0 : e.contentComponent) === null || n === void 0 || n.setRenderer(this.id, this);
  }
  updateProps(e = {}) {
    this.props = {
      ...this.props,
      ...e
    }, this.render();
  }
  destroy() {
    var e, n;
    (n = (e = this.editor) === null || e === void 0 ? void 0 : e.contentComponent) === null || n === void 0 || n.removeRenderer(this.id);
  }
}
class lg extends Ph {
  mount() {
    const e = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: !1,
      extension: this.extension,
      getPos: () => this.getPos(),
      updateAttributes: (o = {}) => this.updateAttributes(o),
      deleteNode: () => this.deleteNode()
    };
    if (!this.component.displayName) {
      const o = (l) => l.charAt(0).toUpperCase() + l.substring(1);
      this.component.displayName = o(this.extension.name);
    }
    const n = (o) => {
      const l = this.component, s = this.onDragStart.bind(this), u = (a) => {
        a && this.contentDOMElement && a.firstChild !== this.contentDOMElement && a.appendChild(this.contentDOMElement);
      };
      return U.createElement(
        U.Fragment,
        null,
        U.createElement(
          dd.Provider,
          { value: { onDragStart: s, nodeViewContentRef: u } },
          U.createElement(l, { ...o })
        )
      );
    };
    n.displayName = "ReactNodeView", this.node.isLeaf ? this.contentDOMElement = null : this.options.contentDOMElementTag ? this.contentDOMElement = document.createElement(this.options.contentDOMElementTag) : this.contentDOMElement = document.createElement(this.node.isInline ? "span" : "div"), this.contentDOMElement && (this.contentDOMElement.style.whiteSpace = "inherit");
    let r = this.node.isInline ? "span" : "div";
    this.options.as && (r = this.options.as);
    const { className: i = "" } = this.options;
    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this), this.editor.on("selectionUpdate", this.handleSelectionUpdate), this.renderer = new og(n, {
      editor: this.editor,
      props: e,
      as: r,
      className: `node-${this.node.type.name} ${i}`.trim(),
      attrs: this.options.attrs
    });
  }
  get dom() {
    var e;
    if (this.renderer.element.firstElementChild && !(!((e = this.renderer.element.firstElementChild) === null || e === void 0) && e.hasAttribute("data-node-view-wrapper")))
      throw Error("Please use the NodeViewWrapper component for your node view.");
    return this.renderer.element;
  }
  get contentDOM() {
    return this.node.isLeaf ? null : this.contentDOMElement;
  }
  handleSelectionUpdate() {
    const { from: e, to: n } = this.editor.state.selection;
    if (e <= this.getPos() && n >= this.getPos() + this.node.nodeSize) {
      if (this.renderer.props.selected)
        return;
      this.selectNode();
    } else {
      if (!this.renderer.props.selected)
        return;
      this.deselectNode();
    }
  }
  update(e, n) {
    const r = (i) => {
      this.renderer.updateProps(i);
    };
    if (e.type !== this.node.type)
      return !1;
    if (typeof this.options.update == "function") {
      const i = this.node, o = this.decorations;
      return this.node = e, this.decorations = n, this.options.update({
        oldNode: i,
        oldDecorations: o,
        newNode: e,
        newDecorations: n,
        updateProps: () => r({ node: e, decorations: n })
      });
    }
    return e === this.node && this.decorations === n || (this.node = e, this.decorations = n, r({ node: e, decorations: n })), !0;
  }
  selectNode() {
    this.renderer.updateProps({
      selected: !0
    }), this.renderer.element.classList.add("ProseMirror-selectednode");
  }
  deselectNode() {
    this.renderer.updateProps({
      selected: !1
    }), this.renderer.element.classList.remove("ProseMirror-selectednode");
  }
  destroy() {
    this.renderer.destroy(), this.editor.off("selectionUpdate", this.handleSelectionUpdate), this.contentDOMElement = null;
  }
}
function sg(t, e) {
  return (n) => n.editor.contentComponent ? new lg(t, n, e) : {};
}
const Sa = "post-your-plan", ug = `Plan for today

{{#tasks}}<ul>
<li><p>{{slack-status}} {{title}}</p></li>
</ul>{{/tasks}}
`;
var pd = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, xa = U.createContext && U.createContext(pd), zt = function() {
  return zt = Object.assign || function(t) {
    for (var e, n = 1, r = arguments.length; n < r; n++) {
      e = arguments[n];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, zt.apply(this, arguments);
}, ag = function(t, e) {
  var n = {};
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]]);
  return n;
};
function hd(t) {
  return t && t.map(function(e, n) {
    return U.createElement(e.tag, zt({
      key: n
    }, e.attr), hd(e.child));
  });
}
function cg(t) {
  return function(e) {
    return U.createElement(fg, zt({
      attr: zt({}, t.attr)
    }, e), hd(t.child));
  };
}
function fg(t) {
  var e = function(n) {
    var r = t.attr, i = t.size, o = t.title, l = ag(t, ["attr", "size", "title"]), s = i || n.size || "1em", u;
    return n.className && (u = n.className), t.className && (u = (u ? u + " " : "") + t.className), U.createElement("svg", zt({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, r, l, {
      className: u,
      style: zt(zt({
        color: t.color || n.color
      }, n.style), t.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), o && U.createElement("title", null, o), t.children);
  };
  return xa !== void 0 ? U.createElement(xa.Consumer, null, function(n) {
    return e(n);
  }) : e(pd);
}
function Ea(t) {
  return cg({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" } }] })(t);
}
var T = "/Users/richardguerre/Projects/flow/plugins/slack/src/web.tsx";
const pg = gd((t) => {
  const e = t.React, n = t.components;
  t.relay.graphql;
  const r = () => {
    var u, a;
    const s = t.operations.useLazyQuery({
      operationName: "workspaces"
    });
    return (u = s == null ? void 0 : s.data) != null && u.workspaces.length ? /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: T,
      lineNumber: 28,
      columnNumber: 7
    } }, (a = s == null ? void 0 : s.data) == null ? void 0 : a.workspaces.map((c) => /* @__PURE__ */ e.createElement("div", { className: "flex items-center gap-2 rounded max-w-2xl bg-background-50 shadow px-4 py-4", __self: void 0, __source: {
      fileName: T,
      lineNumber: 30,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement("img", { src: c.teamIcon, className: "h-5 w-5 shrink-0", __self: void 0, __source: {
      fileName: T,
      lineNumber: 31,
      columnNumber: 13
    } }), /* @__PURE__ */ e.createElement("span", { className: "font-semibold", __self: void 0, __source: {
      fileName: T,
      lineNumber: 32,
      columnNumber: 13
    } }, c.teamName), /* @__PURE__ */ e.createElement("span", { className: "text-sm text-foreground-700", __self: void 0, __source: {
      fileName: T,
      lineNumber: 33,
      columnNumber: 13
    } }, "Connected ", t.dayjs(c.connectedAt).fromNow())))) : /* @__PURE__ */ e.createElement("div", { className: "flex", __self: void 0, __source: {
      fileName: T,
      lineNumber: 21,
      columnNumber: 9
    } }, "No workspaces connected. Please connect an account to use the Slack plugin.");
  }, i = dr.create({
    name: "slack-status",
    inline: !0,
    group: "inline",
    atom: !0,
    parseHTML: () => [{
      tag: "slack-status"
    }],
    renderHTML: (s) => ["slack-status", uu(s.HTMLAttributes)],
    addNodeView: () => sg(o)
  }), o = (s) => /* @__PURE__ */ e.createElement(ng, { as: "span", __self: void 0, __source: {
    fileName: T,
    lineNumber: 54,
    columnNumber: 7
  } }, /* @__PURE__ */ e.createElement(n.Tooltip, { __self: void 0, __source: {
    fileName: T,
    lineNumber: 55,
    columnNumber: 9
  } }, /* @__PURE__ */ e.createElement(n.TooltipTrigger, { className: t.cn("p-0.5 mr-1 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-1 h-5 w-5 inline-flex items-center justify-center", s.selected && "bg-background-300"), __self: void 0, __source: {
    fileName: T,
    lineNumber: 56,
    columnNumber: 11
  } }, /* @__PURE__ */ e.createElement(dg, { __self: void 0, __source: {
    fileName: T,
    lineNumber: 62,
    columnNumber: 13
  } })), /* @__PURE__ */ e.createElement(n.TooltipContent, { className: "max-w-xs", __self: void 0, __source: {
    fileName: T,
    lineNumber: 64,
    columnNumber: 11
  } }, "This is a placeholder for where the Slack plugin will add and automatically update the status of the task (✅ when done, ❌ when canceled.)"))), l = dr.create({
    name: "slack-message",
    group: "block",
    atom: !0,
    selectable: !1,
    draggable: !1,
    parseHTML: () => [{
      tag: "slack-message"
    }],
    renderHTML: (s) => ["slack-message", uu(s.HTMLAttributes)]
  });
  return {
    name: "Slack",
    noteEditorTipTapExtensions: [i, l],
    settings: {
      "connect-accounts": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: T,
          lineNumber: 92,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("a", { href: `${t.serverOrigin}/api/plugin/${t.pluginSlug}/auth`, __self: void 0, __source: {
          fileName: T,
          lineNumber: 93,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(n.Button, { __self: void 0, __source: {
          fileName: T,
          lineNumber: 94,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ e.createElement(n.ErrorBoundary, { fallbackRender: ({
          error: s
        }) => {
          var u, a, c;
          return ((c = (a = (u = s.cause) == null ? void 0 : u[0]) == null ? void 0 : a.extensions) == null ? void 0 : c.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ e.createElement(e.Fragment, null) : /* @__PURE__ */ e.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: T,
            lineNumber: 101,
            columnNumber: 26
          } }, s.message);
        }, __self: void 0, __source: {
          fileName: T,
          lineNumber: 96,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(e.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: T,
          lineNumber: 104,
          columnNumber: 17
        } }, /* @__PURE__ */ e.createElement(r, { __self: void 0, __source: {
          fileName: T,
          lineNumber: 105,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      [Sa]: {
        name: "Post your plan",
        description: "Post your plan for the day in Slack channels.",
        component: (s) => {
          var C;
          const u = s.templates[0], a = e.useRef(null), c = t.dayjs(), [f, p] = e.useState(!1), [g, y] = e.useState(((C = s.stepConfig) == null ? void 0 : C.defaultChannels) ?? []), {
            control: v,
            handleSubmit: E,
            formState: h,
            setError: d
          } = t.reactHookForm.useForm({
            defaultValues: {
              message: u,
              channels: g.map((x) => x.id)
            }
          }), [m, w] = t.operations.useMutation("postMessage"), S = async (x) => {
            var pt, ht;
            const D = g.filter((Ve) => x.channels.includes(Ve.id));
            if (!D.length) {
              d("root", {
                message: "Please select at least one channel."
              });
              return;
            }
            const I = await m({
              message: x.message,
              channels: D.map((Ve) => ({
                teamId: Ve.team.id,
                channelId: Ve.id
              }))
            });
            if (!((pt = I == null ? void 0 : I.data) != null && pt.ok)) {
              d("root", {
                message: "Couldn't post message to Slack channels."
              });
              return;
            }
            const ne = (ht = a.current) == null ? void 0 : ht.chain();
            for (const Ve of I.data.messages)
              ne == null || ne.insertContentAt(-1, {
                type: "slack-message",
                attrs: {
                  teamId: Ve.teamId,
                  channelId: Ve.channelId,
                  ts: Ve.ts
                }
              });
            ne == null || ne.run(), p(!0);
          }, N = () => {
            f && (p(!1), s.onNext());
          };
          return t.hooks.useAsyncEffect(async () => {
            const x = await t.operations.query({
              operationName: "channels"
            });
            y((D) => {
              var I;
              return ((I = x == null ? void 0 : x.data) == null ? void 0 : I.channels) ?? D;
            });
          }, []), /* @__PURE__ */ e.createElement("form", { onSubmit: E(S), className: "flex flex-col gap-4", __self: void 0, __source: {
            fileName: T,
            lineNumber: 186,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement(t.reactHookForm.Controller, { name: "message", control: v, render: ({
            field: x
          }) => /* @__PURE__ */ e.createElement(n.NoteEditor, { editorRef: a, slug: `slack_post-plan-${c.format("YYYY-MM-DD")}`, title: `Plan for ${c.format("MMMM D")}`, initialValue: x.value, onChange: ({
            html: D
          }) => x.onChange(D), onBlur: x.onBlur, saveNow: f, onSaveEnd: N, __self: void 0, __source: {
            fileName: T,
            lineNumber: 191,
            columnNumber: 19
          } }), __self: void 0, __source: {
            fileName: T,
            lineNumber: 187,
            columnNumber: 15
          } }), h.errors.root && /* @__PURE__ */ e.createElement("div", { className: "text-negative-600 text-sm", __self: void 0, __source: {
            fileName: T,
            lineNumber: 204,
            columnNumber: 17
          } }, h.errors.root.message), /* @__PURE__ */ e.createElement("div", { className: "flex justify-between items-center", __self: void 0, __source: {
            fileName: T,
            lineNumber: 206,
            columnNumber: 15
          } }, /* @__PURE__ */ e.createElement(n.FormCombobox, { name: "channels", control: v, multiselect: !0, __self: void 0, __source: {
            fileName: T,
            lineNumber: 207,
            columnNumber: 17
          } }, /* @__PURE__ */ e.createElement(n.ComboboxTrigger, { __self: void 0, __source: {
            fileName: T,
            lineNumber: 208,
            columnNumber: 19
          } }, /* @__PURE__ */ e.createElement(n.ComboboxValue, { __self: void 0, __source: {
            fileName: T,
            lineNumber: 209,
            columnNumber: 21
          } })), /* @__PURE__ */ e.createElement(n.ComboboxContent, { __self: void 0, __source: {
            fileName: T,
            lineNumber: 211,
            columnNumber: 19
          } }, /* @__PURE__ */ e.createElement(n.ComboboxInput, { placeholder: "Search channels...", __self: void 0, __source: {
            fileName: T,
            lineNumber: 212,
            columnNumber: 21
          } }), /* @__PURE__ */ e.createElement(n.ComboboxEmpty, { __self: void 0, __source: {
            fileName: T,
            lineNumber: 213,
            columnNumber: 21
          } }, "No channel found."), /* @__PURE__ */ e.createElement(n.ComboboxGroup, { __self: void 0, __source: {
            fileName: T,
            lineNumber: 214,
            columnNumber: 21
          } }, g.map((x) => /* @__PURE__ */ e.createElement(n.ComboboxItem, { key: x.id, value: x.id, __self: void 0, __source: {
            fileName: T,
            lineNumber: 216,
            columnNumber: 25
          } }, /* @__PURE__ */ e.createElement(n.ComboboxSelected, { className: "mr-2 h-4 w-4 opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
            fileName: T,
            lineNumber: 217,
            columnNumber: 27
          } }, /* @__PURE__ */ e.createElement(Ea, { size: 20, __self: void 0, __source: {
            fileName: T,
            lineNumber: 221,
            columnNumber: 29
          } })), /* @__PURE__ */ e.createElement("img", { src: x.team.icon, className: "h-5 w-5 shrink-0 mr-2", __self: void 0, __source: {
            fileName: T,
            lineNumber: 223,
            columnNumber: 27
          } }), x.name))))), /* @__PURE__ */ e.createElement("div", { className: "flex items-center gap-2", __self: void 0, __source: {
            fileName: T,
            lineNumber: 230,
            columnNumber: 17
          } }, /* @__PURE__ */ e.createElement(s.BackButton, { type: "button", __self: void 0, __source: {
            fileName: T,
            lineNumber: 231,
            columnNumber: 19
          } }), /* @__PURE__ */ e.createElement(s.NextButton, { type: "submit", loading: w, onClick: () => {
          }, __self: void 0, __source: {
            fileName: T,
            lineNumber: 232,
            columnNumber: 19
          } }))));
        },
        renderSettings: async (s) => ({
          component: () => {
            var E, h;
            const u = s.routineStep.templates[0], {
              control: a,
              handleSubmit: c
            } = t.reactHookForm.useForm({
              defaultValues: {
                template: {
                  content: (u == null ? void 0 : u.raw) ?? ug,
                  data: (u == null ? void 0 : u.metadata) ?? {}
                }
              }
            }), [f, p] = e.useState(((h = (E = s.routineStep) == null ? void 0 : E.config) == null ? void 0 : h.defaultChannels) ?? []), [g, y] = t.relay.useMutation(Na), v = async (d) => {
              const m = f.filter((w) => d.defaultChannels.includes(w.id));
              g({
                variables: {
                  routineStep: {
                    id: s.routineStep.id,
                    config: {
                      defaultChannels: m
                    }
                  },
                  template: {
                    slug: (u == null ? void 0 : u.slug) ?? `slack-${Sa}-${s.routineStep.id}`,
                    raw: d.template.content,
                    metadata: d.template.data ?? {}
                  }
                }
              });
            };
            return t.hooks.useAsyncEffect(async () => {
              const d = await t.operations.query({
                operationName: "channels"
              });
              p((m) => {
                var w;
                return ((w = d == null ? void 0 : d.data) == null ? void 0 : w.channels) ?? m;
              });
            }, []), /* @__PURE__ */ e.createElement("form", { onSubmit: c(v), className: "flex flex-col gap-4", __self: void 0, __source: {
              fileName: T,
              lineNumber: 308,
              columnNumber: 17
            } }, /* @__PURE__ */ e.createElement(t.reactHookForm.Controller, { name: "template", control: a, render: ({
              field: d
            }) => /* @__PURE__ */ e.createElement(n.TemplateEditor, { initialTemplate: d.value, onChange: d.onChange, __self: void 0, __source: {
              fileName: T,
              lineNumber: 313,
              columnNumber: 23
            } }), __self: void 0, __source: {
              fileName: T,
              lineNumber: 309,
              columnNumber: 19
            } }), /* @__PURE__ */ e.createElement(n.FormCombobox, { name: "defaultChannels", control: a, multiselect: !0, __self: void 0, __source: {
              fileName: T,
              lineNumber: 319,
              columnNumber: 19
            } }, /* @__PURE__ */ e.createElement(n.ComboboxTrigger, { __self: void 0, __source: {
              fileName: T,
              lineNumber: 320,
              columnNumber: 21
            } }, /* @__PURE__ */ e.createElement(n.ComboboxValue, { __self: void 0, __source: {
              fileName: T,
              lineNumber: 321,
              columnNumber: 23
            } })), /* @__PURE__ */ e.createElement(n.ComboboxContent, { __self: void 0, __source: {
              fileName: T,
              lineNumber: 323,
              columnNumber: 21
            } }, /* @__PURE__ */ e.createElement(n.ComboboxInput, { placeholder: "Search channels...", __self: void 0, __source: {
              fileName: T,
              lineNumber: 324,
              columnNumber: 23
            } }), /* @__PURE__ */ e.createElement(n.ComboboxEmpty, { __self: void 0, __source: {
              fileName: T,
              lineNumber: 325,
              columnNumber: 23
            } }, "No channel found."), /* @__PURE__ */ e.createElement(n.ComboboxGroup, { __self: void 0, __source: {
              fileName: T,
              lineNumber: 326,
              columnNumber: 23
            } }, f.map((d) => /* @__PURE__ */ e.createElement(n.ComboboxItem, { key: d.id, value: d.id, __self: void 0, __source: {
              fileName: T,
              lineNumber: 328,
              columnNumber: 27
            } }, /* @__PURE__ */ e.createElement(n.ComboboxSelected, { className: "mr-2 h-4 w-4 opacity-0", selectedClassName: "opacity-100", __self: void 0, __source: {
              fileName: T,
              lineNumber: 329,
              columnNumber: 29
            } }, /* @__PURE__ */ e.createElement(Ea, { size: 20, __self: void 0, __source: {
              fileName: T,
              lineNumber: 333,
              columnNumber: 31
            } })), /* @__PURE__ */ e.createElement("img", { src: d.team.icon, className: "h-5 w-5 shrink-0 mr-2", __self: void 0, __source: {
              fileName: T,
              lineNumber: 335,
              columnNumber: 29
            } }), d.name))))), /* @__PURE__ */ e.createElement("div", { className: "flex items-center gap-2 self-end", __self: void 0, __source: {
              fileName: T,
              lineNumber: 342,
              columnNumber: 19
            } }, /* @__PURE__ */ e.createElement(n.Button, { type: "button", onClick: s.onCancel, __self: void 0, __source: {
              fileName: T,
              lineNumber: 343,
              columnNumber: 21
            } }, "Cancel"), /* @__PURE__ */ e.createElement(n.Button, { type: "submit", loading: y, __self: void 0, __source: {
              fileName: T,
              lineNumber: 346,
              columnNumber: 21
            } }, "Save")));
          }
        })
      }
    }
  };
}), dg = () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 123 123", fill: "none", xmlns: "http://www.w3.org/2000/svg", __self: void 0, __source: {
  fileName: T,
  lineNumber: 374,
  columnNumber: 3
} }, /* @__PURE__ */ React.createElement("path", { d: "M25.8 77.6C25.8 84.7 20 90.5 12.9 90.5C5.8 90.5 0 84.7 0 77.6C0 70.5 5.8 64.7 12.9 64.7H25.8V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
  fileName: T,
  lineNumber: 375,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M32.3 77.6C32.3 70.5 38.1001 64.7 45.2001 64.7C52.3001 64.7 58.1 70.5 58.1 77.6V109.9C58.1 117 52.3001 122.8 45.2001 122.8C38.1001 122.8 32.3 117 32.3 109.9V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
  fileName: T,
  lineNumber: 379,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M45.2001 25.8C38.1001 25.8 32.3 20 32.3 12.9C32.3 5.8 38.1001 0 45.2001 0C52.3001 0 58.1 5.8 58.1 12.9V25.8H45.2001Z", fill: "#36C5F0", __self: void 0, __source: {
  fileName: T,
  lineNumber: 383,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M45.2 32.3C52.3 32.3 58.1 38.1 58.1 45.2C58.1 52.3 52.3 58.1 45.2 58.1H12.9C5.8 58.1 0 52.3 0 45.2C0 38.1 5.8 32.3 12.9 32.3H45.2Z", fill: "#36C5F0", __self: void 0, __source: {
  fileName: T,
  lineNumber: 387,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M97 45.2C97 38.1 102.8 32.3 109.9 32.3C117 32.3 122.8 38.1 122.8 45.2C122.8 52.3 117 58.1 109.9 58.1H97V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
  fileName: T,
  lineNumber: 391,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M90.5 45.2C90.5 52.3 84.6999 58.1 77.5999 58.1C70.4999 58.1 64.7 52.3 64.7 45.2V12.9C64.7 5.8 70.4999 0 77.5999 0C84.6999 0 90.5 5.8 90.5 12.9V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
  fileName: T,
  lineNumber: 395,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M77.5999 97C84.6999 97 90.5 102.8 90.5 109.9C90.5 117 84.6999 122.8 77.5999 122.8C70.4999 122.8 64.7 117 64.7 109.9V97H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
  fileName: T,
  lineNumber: 399,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M77.5999 90.5C70.4999 90.5 64.7 84.7 64.7 77.6C64.7 70.5 70.4999 64.7 77.5999 64.7H109.9C117 64.7 122.8 70.5 122.8 77.6C122.8 84.7 117 90.5 109.9 90.5H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
  fileName: T,
  lineNumber: 403,
  columnNumber: 5
} }));
export {
  pg as default
};
