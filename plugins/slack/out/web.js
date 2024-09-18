const ka = /* @__PURE__ */ function() {
  var t = [
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "input"
    }
  ], e = [
    {
      alias: null,
      args: [
        {
          kind: "Variable",
          name: "input",
          variableName: "input"
        }
      ],
      concreteType: "Template",
      kind: "LinkedField",
      name: "createOrUpdateTemplate",
      plural: !1,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "id",
          storageKey: null
        },
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
      name: "webUpsertTemplateMutation",
      selections: e,
      type: "Mutation",
      abstractKey: null
    },
    kind: "Request",
    operation: {
      argumentDefinitions: t,
      kind: "Operation",
      name: "webUpsertTemplateMutation",
      selections: e
    },
    params: {
      cacheID: "e1629b913da49fdec388711845374153",
      id: null,
      metadata: {},
      name: "webUpsertTemplateMutation",
      operationKind: "mutation",
      text: `mutation webUpsertTemplateMutation(
  $input: MutationCreateOrUpdateTemplateInput!
) {
  createOrUpdateTemplate(input: $input) {
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
ka.hash = "7cd78055da8edcdc6e1ad4645d78bcf4";
const cd = (t) => ({ plugin: t });
function Sa(t, e, n) {
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
      let l = Sa(i.content, o.content, n + 1);
      if (l != null)
        return l;
    }
    n += i.nodeSize;
  }
}
function xa(t, e, n, r) {
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
      let a = xa(l.content, s.content, n - 1, r - 1);
      if (a)
        return a;
    }
    n -= u, r -= u;
  }
}
class _ {
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
    return new _(i, this.size + e.size);
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
    return new _(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, n) {
    return e == n ? _.empty : e == 0 && n == this.content.length ? this : new _(this.content.slice(e, n));
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
    return i[e] = n, new _(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new _([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new _(this.content.concat(e), this.size + e.nodeSize);
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
    return Sa(this, e, n);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, n = this.size, r = e.size) {
    return xa(this, e, n, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. (Not public.)
  */
  findIndex(e, n = -1) {
    if (e == 0)
      return Ar(0, e);
    if (e == this.size)
      return Ar(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let o = this.child(r), l = i + o.nodeSize;
      if (l >= e)
        return l == e || n > 0 ? Ar(r + 1, l) : Ar(r, i);
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
      return _.empty;
    if (!Array.isArray(n))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new _(n.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return _.empty;
    let n, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (n || (n = e.slice(0, i)), n[n.length - 1] = o.withText(n[n.length - 1].text + o.text)) : n && n.push(o);
    }
    return new _(n || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return _.empty;
    if (e instanceof _)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new _([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
_.empty = new _([], 0);
const mo = { index: 0, offset: 0 };
function Ar(t, e) {
  return mo.index = t, mo.offset = e, mo;
}
function Go(t, e) {
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
      if (!Go(t[r], e[r]))
        return !1;
  } else {
    for (let r in t)
      if (!(r in e) || !Go(t[r], e[r]))
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
    return this == e || this.type == e.type && Go(this.attrs, e.attrs);
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
class fd extends Error {
}
class P {
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
    let r = Ca(this.content, e + this.openStart, n);
    return r && new P(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new P(Ea(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
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
      return P.empty;
    let r = n.openStart || 0, i = n.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new P(_.fromJSON(e, n.content), r, i);
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
    return new P(e, r, i);
  }
}
P.empty = new P(_.empty, 0, 0);
function Ea(t, e, n) {
  let { index: r, offset: i } = t.findIndex(e), o = t.maybeChild(r), { index: l, offset: s } = t.findIndex(n);
  if (i == e || o.isText) {
    if (s != n && !t.child(l).isText)
      throw new RangeError("Removing non-flat range");
    return t.cut(0, e).append(t.cut(n));
  }
  if (r != l)
    throw new RangeError("Removing non-flat range");
  return t.replaceChild(r, o.copy(Ea(o.content, e - i - 1, n - i - 1)));
}
function Ca(t, e, n, r) {
  let { index: i, offset: o } = t.findIndex(e), l = t.maybeChild(i);
  if (o == e || l.isText)
    return t.cut(0, e).append(n).append(t.cut(e));
  let s = Ca(l.content, e - o - 1, n);
  return s && t.replaceChild(i, l.copy(s));
}
class Zo {
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
class gi {
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
    let r = new Zs(this, n, !1);
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
    let r = new Zs(this, n, !0);
    return r.addAll(e, n.from, n.to), P.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, n, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (hd(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || n.matchesContext(o.context))) {
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
        r(l = qs(l)), l.mark || l.ignore || l.clearMark || (l.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((l) => {
        r(l = qs(l)), l.node || l.ignore || l.mark || (l.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new gi(e, gi.schemaRules(e)));
  }
}
const Na = {
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
}, dd = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Ma = { ol: !0, ul: !0 }, yi = 1, vi = 2, Zn = 4;
function Gs(t, e, n) {
  return e != null ? (e ? yi : 0) | (e === "full" ? vi : 0) : t && t.whitespace == "pre" ? yi | vi : n & ~Zn;
}
class Dr {
  constructor(e, n, r, i, o, l, s) {
    this.type = e, this.attrs = n, this.marks = r, this.pendingMarks = i, this.solid = o, this.options = s, this.content = [], this.activeMarks = Ce.none, this.stashMarks = [], this.match = l || (s & Zn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let n = this.type.contentMatch.fillBefore(_.from(e));
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
    if (!(this.options & yi)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let n = _.from(this.content);
    return !e && this.match && (n = n.append(this.match.fillBefore(_.empty, !0))), this.type ? this.type.create(this.attrs, n, this.marks) : n;
  }
  popFromStashMark(e) {
    for (let n = this.stashMarks.length - 1; n >= 0; n--)
      if (e.eq(this.stashMarks[n]))
        return this.stashMarks.splice(n, 1)[0];
  }
  applyPending(e) {
    for (let n = 0, r = this.pendingMarks; n < r.length; n++) {
      let i = r[n];
      (this.type ? this.type.allowsMarkType(i.type) : gd(i.type, e)) && !i.isInSet(this.activeMarks) && (this.activeMarks = i.addToSet(this.activeMarks), this.pendingMarks = i.removeFromSet(this.pendingMarks));
    }
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Na.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Zs {
  constructor(e, n, r) {
    this.parser = e, this.options = n, this.isOpen = r, this.open = 0;
    let i = n.topNode, o, l = Gs(null, n.preserveWhitespace, 0) | (r ? Zn : 0);
    i ? o = new Dr(i.type, i.attrs, Ce.none, Ce.none, !0, n.topMatch || i.type.contentMatch, l) : r ? o = new Dr(null, null, Ce.none, Ce.none, !0, null, l) : o = new Dr(e.schema.topNodeType, null, Ce.none, Ce.none, !0, null, l), this.nodes = [o], this.find = n.findPositions, this.needsBlock = !1;
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
    let i = this.readStyles(md(r));
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
    if (r.options & vi || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
      if (r.options & yi)
        r.options & vi ? n = n.replace(/\r\n?/g, `
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
    Ma.hasOwnProperty(r) && this.parser.normalizeLists && pd(e);
    let o = this.options.ruleFromNode && this.options.ruleFromNode(e) || (i = this.parser.matchTag(e, this, n));
    if (o ? o.ignore : dd.hasOwnProperty(r))
      this.findInside(e), this.ignoreFallback(e);
    else if (!o || o.skip || o.closeParent) {
      o && o.closeParent ? this.open = Math.max(0, this.open - 1) : o && o.skip.nodeType && (e = o.skip);
      let l, s = this.top, u = this.needsBlock;
      if (Na.hasOwnProperty(r))
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
    let l = Gs(e, i, o.options);
    o.options & Zn && o.content.length == 0 && (l |= Zn), this.nodes.push(new Dr(e, n, o.activeMarks, o.pendingMarks, r, null, l)), this.open++;
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
    let n = yd(e, this.top.pendingMarks);
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
function pd(t) {
  for (let e = t.firstChild, n = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Ma.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : r == "li" ? n = e : r && (n = null);
  }
}
function hd(t, e) {
  return (t.matches || t.msMatchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector).call(t, e);
}
function md(t) {
  let e = /\s*([\w-]+)\s*:\s*([^;]+)/g, n, r = [];
  for (; n = e.exec(t); )
    r.push(n[1], n[2].trim());
  return r;
}
function qs(t) {
  let e = {};
  for (let n in t)
    e[n] = t[n];
  return e;
}
function gd(t, e) {
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
function yd(t, e) {
  for (let n = 0; n < e.length; n++)
    if (t.eq(e[n]))
      return e[n];
}
const Ta = 65535, _a = Math.pow(2, 16);
function vd(t, e) {
  return t + e * _a;
}
function bs(t) {
  return t & Ta;
}
function wd(t) {
  return (t - (t & Ta)) / _a;
}
const Pa = 1, za = 2, ni = 4, Ia = 8;
class eu {
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
    return (this.delInfo & Ia) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Pa | ni)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (za | ni)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & ni) > 0;
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
    let n = 0, r = bs(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        n += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + n + wd(e);
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
        let d = a ? e == u ? -1 : e == f ? 1 : n : n, g = u + i + (d < 0 ? 0 : c);
        if (r)
          return g;
        let y = e == (n < 0 ? u : f) ? null : vd(s / 3, e - u), v = e == u ? za : e == f ? Pa : ni;
        return (n < 0 ? e != u : e != f) && (v |= Ia), new eu(g, v, y);
      }
      i += c - a;
    }
    return r ? e + i : new eu(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, n) {
    let r = 0, i = bs(n), o = this.inverted ? 2 : 1, l = this.inverted ? 1 : 2;
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
const go = /* @__PURE__ */ Object.create(null);
class pe {
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
    let r = go[n.stepType];
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
    if (e in go)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return go[e] = n, n.prototype.jsonID = e, n;
  }
}
class q {
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
    return new q(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new q(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, n, r, i) {
    try {
      return q.ok(e.replace(n, r, i));
    } catch (o) {
      if (o instanceof fd)
        return q.fail(o.message);
      throw o;
    }
  }
}
function Ql(t, e, n) {
  let r = [];
  for (let i = 0; i < t.childCount; i++) {
    let o = t.child(i);
    o.content.size && (o = o.copy(Ql(o.content, e, o))), o.isInline && (o = e(o, n, i)), r.push(o);
  }
  return _.fromArray(r);
}
class Dt extends pe {
  /**
  Create a mark step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new P(Ql(n.content, (l, s) => !l.isAtom || !s.type.allowsMarkType(this.mark.type) ? l : l.mark(this.mark.addToSet(l.marks)), i), n.openStart, n.openEnd);
    return q.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Bt(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Dt(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Dt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Dt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Dt(n.from, n.to, e.markFromJSON(n.mark));
  }
}
pe.jsonID("addMark", Dt);
class Bt extends pe {
  /**
  Create a mark-removing step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = new P(Ql(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
    return q.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Dt(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Bt(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Bt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Bt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Bt(n.from, n.to, e.markFromJSON(n.mark));
  }
}
pe.jsonID("removeMark", Bt);
class $t extends pe {
  /**
  Create a node mark step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return q.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.addToSet(n.marks));
    return q.fromReplace(e, this.pos, this.pos + 1, new P(_.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    if (n) {
      let r = this.mark.addToSet(n.marks);
      if (r.length == n.marks.length) {
        for (let i = 0; i < n.marks.length; i++)
          if (!n.marks[i].isInSet(r))
            return new $t(this.pos, n.marks[i]);
        return new $t(this.pos, this.mark);
      }
    }
    return new ur(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new $t(n.pos, this.mark);
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
    return new $t(n.pos, e.markFromJSON(n.mark));
  }
}
pe.jsonID("addNodeMark", $t);
class ur extends pe {
  /**
  Create a mark-removing step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return q.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.removeFromSet(n.marks));
    return q.fromReplace(e, this.pos, this.pos + 1, new P(_.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    return !n || !this.mark.isInSet(n.marks) ? this : new $t(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new ur(n.pos, this.mark);
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
    return new ur(n.pos, e.markFromJSON(n.mark));
  }
}
pe.jsonID("removeNodeMark", ur);
class Me extends pe {
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
    return this.structure && qo(e, this.from, this.to) ? q.fail("Structure replace would overwrite content") : q.fromReplace(e, this.from, this.to, this.slice);
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
      let n = this.slice.size + e.slice.size == 0 ? P.empty : new P(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Me(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? P.empty : new P(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
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
    return new Me(n.from, n.to, P.fromJSON(e, n.slice), !!n.structure);
  }
}
pe.jsonID("replace", Me);
class ke extends pe {
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
    if (this.structure && (qo(e, this.from, this.gapFrom) || qo(e, this.gapTo, this.to)))
      return q.fail("Structure gap-replace would overwrite content");
    let n = e.slice(this.gapFrom, this.gapTo);
    if (n.openStart || n.openEnd)
      return q.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, n.content);
    return r ? q.fromReplace(e, this.from, this.to, r) : q.fail("Content does not fit in gap");
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
    return new ke(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return n.deletedAcross && r.deletedAcross || i < n.pos || o > r.pos ? null : new ke(n.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new ke(n.from, n.to, n.gapFrom, n.gapTo, P.fromJSON(e, n.slice), n.insert, !!n.structure);
  }
}
pe.jsonID("replaceAround", ke);
function qo(t, e, n) {
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
function kd(t, e, n) {
  return (e == 0 || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n));
}
function zn(t) {
  let n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let r = t.depth; ; --r) {
    let i = t.$from.node(r), o = t.$from.index(r), l = t.$to.indexAfter(r);
    if (r < t.depth && i.canReplace(o, l, n))
      return r;
    if (r == 0 || i.type.spec.isolating || !kd(i, o, l))
      break;
  }
  return null;
}
function Oa(t, e, n = null, r = t) {
  let i = Sd(t, e), o = i && xd(r, e);
  return o ? i.map(tu).concat({ type: e, attrs: n }).concat(o.map(tu)) : null;
}
function tu(t) {
  return { type: t, attrs: null };
}
function Sd(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let l = o.length ? o[0] : e;
  return n.canReplaceWith(r, i, l) ? o : null;
}
function xd(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.child(r), l = e.contentMatch.findWrapping(o.type);
  if (!l)
    return null;
  let u = (l.length ? l[l.length - 1] : e).contentMatch;
  for (let a = r; u && a < i; a++)
    u = u.matchType(n.child(a).type);
  return !u || !u.validEnd ? null : l;
}
function mn(t, e, n = 1, r) {
  let i = t.resolve(e), o = i.depth - n, l = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !l.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let a = i.depth - 1, c = n - 2; a > o; a--, c--) {
    let f = i.node(a), d = i.index(a);
    if (f.type.spec.isolating)
      return !1;
    let g = f.content.cutByIndex(d, f.childCount), y = r && r[c + 1];
    y && (g = g.replaceChild(0, y.type.create(y.attrs)));
    let v = r && r[c] || f;
    if (!f.canReplace(d + 1, f.childCount) || !v.type.validContent(g))
      return !1;
  }
  let s = i.indexAfter(o), u = r && r[0];
  return i.node(o).canReplaceWith(s, s, u ? u.type : i.node(o + 1).type);
}
function Zt(t, e) {
  let n = t.resolve(e), r = n.index();
  return Ra(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function Ra(t, e) {
  return !!(t && e && !t.isLeaf && t.canAppend(e));
}
function Ki(t, e, n = -1) {
  let r = t.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, l, s = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, l = r.nodeAfter) : n > 0 ? (o = r.node(i + 1), s++, l = r.node(i).maybeChild(s)) : (o = r.node(i).maybeChild(s - 1), l = r.node(i + 1)), o && !o.isTextblock && Ra(o, l) && r.node(i).canReplace(s, s + 1))
      return e;
    if (i == 0)
      break;
    e = n < 0 ? r.before(i) : r.after(i);
  }
}
function Kl(t, e, n = e, r = P.empty) {
  if (e == n && !r.size)
    return null;
  let i = t.resolve(e), o = t.resolve(n);
  return Ed(i, o, r) ? new Me(e, n, r) : new Cd(i, o, r).fit();
}
function Ed(t, e, n) {
  return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content);
}
class Cd {
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.unplaced = r, this.frontier = [], this.placed = _.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = _.from(e.node(i).copy(this.placed));
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
    let u = new P(o, l, s);
    return e > -1 ? new ke(r.pos, e, this.$to.pos, this.$to.end(), u, n) : u.size || r.pos != this.$to.pos ? new Me(r.pos, i.pos, u) : null;
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
        r ? (o = yo(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let l = i.firstChild;
        for (let s = this.depth; s >= 0; s--) {
          let { type: u, match: a } = this.frontier[s], c, f = null;
          if (n == 1 && (l ? a.matchType(l.type) || (f = a.fillBefore(_.from(l), !1)) : o && u.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: s, parent: o, inject: f };
          if (n == 2 && l && (c = a.findWrapping(l.type)))
            return { sliceDepth: r, frontierDepth: s, parent: o, wrap: c };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = yo(e, n);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new P(e, n + 1, Math.max(r, i.size + n >= e.size - r ? n + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = yo(e, n);
    if (i.childCount <= 1 && n > 0) {
      let o = e.size - n <= n + i.size;
      this.unplaced = new P(Jn(e, n - 1, 1), n - 1, o ? n - 1 : r);
    } else
      this.unplaced = new P(Jn(e, n, 1), n, r);
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
    let l = this.unplaced, s = r ? r.content : l.content, u = l.openStart - e, a = 0, c = [], { match: f, type: d } = this.frontier[n];
    if (i) {
      for (let v = 0; v < i.childCount; v++)
        c.push(i.child(v));
      f = f.matchFragment(i);
    }
    let g = s.size + e - (l.content.size - l.openEnd);
    for (; a < s.childCount; ) {
      let v = s.child(a), x = f.matchType(v.type);
      if (!x)
        break;
      a++, (a > 1 || u == 0 || v.content.size) && (f = x, c.push(Fa(v.mark(d.allowedMarks(v.marks)), a == 1 ? u : 0, a == s.childCount ? g : -1)));
    }
    let y = a == s.childCount;
    y || (g = -1), this.placed = Qn(this.placed, n, _.from(c)), this.frontier[n].match = f, y && g < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let v = 0, x = s; v < g; v++) {
      let h = x.lastChild;
      this.frontier.push({ type: h.type, match: h.contentMatchAt(h.childCount) }), x = h.content;
    }
    this.unplaced = y ? e == 0 ? P.empty : new P(Jn(l.content, e - 1, 1), e - 1, g < 0 ? l.openEnd : e - 1) : new P(Jn(l.content, e, a), l.openStart, l.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], n;
    if (!e.type.isTextblock || !vo(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (n = this.findCloseLevel(this.$to)) && n.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e:
      for (let n = Math.min(this.depth, e.depth); n >= 0; n--) {
        let { match: r, type: i } = this.frontier[n], o = n < e.depth && e.end(n + 1) == e.pos + (e.depth - (n + 1)), l = vo(e, n, i, r, o);
        if (l) {
          for (let s = n - 1; s >= 0; s--) {
            let { match: u, type: a } = this.frontier[s], c = vo(e, s, a, u, !0);
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
    n.fit.childCount && (this.placed = Qn(this.placed, n.depth, n.fit)), e = n.move;
    for (let r = n.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, n = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Qn(this.placed, this.depth, _.from(e.create(n, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let n = this.frontier.pop().match.fillBefore(_.empty, !0);
    n.childCount && (this.placed = Qn(this.placed, this.frontier.length, n));
  }
}
function Jn(t, e, n) {
  return e == 0 ? t.cutByIndex(n, t.childCount) : t.replaceChild(0, t.firstChild.copy(Jn(t.firstChild.content, e - 1, n)));
}
function Qn(t, e, n) {
  return e == 0 ? t.append(n) : t.replaceChild(t.childCount - 1, t.lastChild.copy(Qn(t.lastChild.content, e - 1, n)));
}
function yo(t, e) {
  for (let n = 0; n < e; n++)
    t = t.firstChild.content;
  return t;
}
function Fa(t, e, n) {
  if (e <= 0)
    return t;
  let r = t.content;
  return e > 1 && (r = r.replaceChild(0, Fa(r.firstChild, e - 1, r.childCount == 1 ? n - 1 : 0))), e > 0 && (r = t.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(t.type.contentMatch.matchFragment(r).fillBefore(_.empty, !0)))), t.copy(r);
}
function vo(t, e, n, r, i) {
  let o = t.node(e), l = i ? t.indexAfter(e) : t.index(e);
  if (l == o.childCount && !n.compatibleContent(o.type))
    return null;
  let s = r.fillBefore(o.content, !0, l);
  return s && !Nd(n, o.content, l) ? s : null;
}
function Nd(t, e, n) {
  for (let r = n; r < e.childCount; r++)
    if (!t.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
class qn extends pe {
  /**
  Construct an attribute step.
  */
  constructor(e, n, r) {
    super(), this.pos = e, this.attr = n, this.value = r;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return q.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in n.attrs)
      r[o] = n.attrs[o];
    r[this.attr] = this.value;
    let i = n.type.create(r, null, n.marks);
    return q.fromReplace(e, this.pos, this.pos + 1, new P(_.from(i), 0, n.isLeaf ? 0 : 1));
  }
  getMap() {
    return Te.empty;
  }
  invert(e) {
    return new qn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new qn(n.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.pos != "number" || typeof n.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new qn(n.pos, n.attr, n.value);
  }
}
pe.jsonID("attr", qn);
class wi extends pe {
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
    return q.ok(r);
  }
  getMap() {
    return Te.empty;
  }
  invert(e) {
    return new wi(this.attr, e.attrs[this.attr]);
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
    return new wi(n.attr, n.value);
  }
}
pe.jsonID("docAttr", wi);
let ar = class extends Error {
};
ar = function t(e) {
  let n = Error.call(this, e);
  return n.__proto__ = t.prototype, n;
};
ar.prototype = Object.create(Error.prototype);
ar.prototype.constructor = ar;
ar.prototype.name = "TransformError";
const wo = /* @__PURE__ */ Object.create(null);
class D {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, n, r) {
    this.$anchor = e, this.$head = n, this.ranges = r || [new Md(e.min(n), e.max(n))];
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
  replace(e, n = P.empty) {
    let r = n.content.lastChild, i = null;
    for (let s = 0; s < n.openEnd; s++)
      i = r, r = r.lastChild;
    let o = e.steps.length, l = this.ranges;
    for (let s = 0; s < l.length; s++) {
      let { $from: u, $to: a } = l[s], c = e.mapping.slice(o);
      e.replaceRange(c.map(u.pos), c.map(a.pos), s ? P.empty : n), s == 0 && iu(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, c) : (e.replaceRangeWith(a, c, n), iu(e, r, n.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new H(e) : tn(e.node(0), e.parent, e.pos, e.index(), n, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let l = n < 0 ? tn(e.node(0), e.node(o), e.before(o + 1), e.index(o), n, r) : tn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, n, r);
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
    return this.findFrom(e, n) || this.findFrom(e, -n) || new qe(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return tn(e, e, 0, 0, 1) || new qe(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return tn(e, e, e.content.size, e.childCount, -1) || new qe(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, n) {
    if (!n || !n.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = wo[n.type];
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
    if (e in wo)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return wo[e] = n, n.prototype.jsonID = e, n;
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
    return H.between(this.$anchor, this.$head).getBookmark();
  }
}
D.prototype.visible = !0;
class Md {
  /**
  Create a range.
  */
  constructor(e, n) {
    this.$from = e, this.$to = n;
  }
}
let nu = !1;
function ru(t) {
  !nu && !t.parent.inlineContent && (nu = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + t.parent.type.name + ")"));
}
class H extends D {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, n = e) {
    ru(e), ru(n), super(e, n);
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
      return D.near(r);
    let i = e.resolve(n.map(this.anchor));
    return new H(i.parent.inlineContent ? i : r, r);
  }
  replace(e, n = P.empty) {
    if (super.replace(e, n), n == P.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof H && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Yi(this.anchor, this.head);
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
    return new H(e.resolve(n.anchor), e.resolve(n.head));
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
      let o = D.findFrom(n, r, !0) || D.findFrom(n, -r, !0);
      if (o)
        n = o.$head;
      else
        return D.near(n, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = n : (e = (D.findFrom(e, -r, !0) || D.findFrom(e, r, !0)).$anchor, e.pos < n.pos != i < 0 && (e = n))), new H(e, n);
  }
}
D.jsonID("text", H);
class Yi {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new Yi(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return H.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class B extends D {
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
    return r ? D.near(o) : new B(o);
  }
  content() {
    return new P(_.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof B && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Yl(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new B(e.resolve(n.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, n) {
    return new B(e.resolve(n));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
B.prototype.visible = !1;
D.jsonID("node", B);
class Yl {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: n, pos: r } = e.mapResult(this.anchor);
    return n ? new Yi(r, r) : new Yl(r);
  }
  resolve(e) {
    let n = e.resolve(this.anchor), r = n.nodeAfter;
    return r && B.isSelectable(r) ? new B(n) : D.near(n);
  }
}
class qe extends D {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, n = P.empty) {
    if (n == P.empty) {
      e.delete(0, e.doc.content.size);
      let r = D.atStart(e.doc);
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
    return new qe(e);
  }
  map(e) {
    return new qe(e);
  }
  eq(e) {
    return e instanceof qe;
  }
  getBookmark() {
    return Td;
  }
}
D.jsonID("all", qe);
const Td = {
  map() {
    return this;
  },
  resolve(t) {
    return new qe(t);
  }
};
function tn(t, e, n, r, i, o = !1) {
  if (e.inlineContent)
    return H.create(t, n);
  for (let l = r - (i > 0 ? 0 : 1); i > 0 ? l < e.childCount : l >= 0; l += i) {
    let s = e.child(l);
    if (s.isAtom) {
      if (!o && B.isSelectable(s))
        return B.create(t, n - (i < 0 ? s.nodeSize : 0));
    } else {
      let u = tn(t, s, n + i, i < 0 ? s.childCount : 0, i, o);
      if (u)
        return u;
    }
    n += s.nodeSize * i;
  }
  return null;
}
function iu(t, e, n) {
  let r = t.steps.length - 1;
  if (r < e)
    return;
  let i = t.steps[r];
  if (!(i instanceof Me || i instanceof ke))
    return;
  let o = t.mapping.maps[r], l;
  o.forEach((s, u, a, c) => {
    l == null && (l = c);
  }), t.setSelection(D.near(t.doc.resolve(l), n));
}
function ou(t, e) {
  return !e || !t ? t : t.bind(e);
}
class Br {
  constructor(e, n, r) {
    this.name = e, this.init = ou(n.init, r), this.apply = ou(n.apply, r);
  }
}
new Br("doc", {
  init(t) {
    return t.doc || t.schema.topNodeType.createAndFill();
  },
  apply(t) {
    return t.doc;
  }
}), new Br("selection", {
  init(t, e) {
    return t.selection || D.atStart(e.doc);
  },
  apply(t) {
    return t.selection;
  }
}), new Br("storedMarks", {
  init(t) {
    return t.storedMarks || null;
  },
  apply(t, e, n, r) {
    return r.selection.$cursor ? t.storedMarks : null;
  }
}), new Br("scrollToSelection", {
  init() {
    return 0;
  },
  apply(t, e) {
    return t.scrolledIntoView ? e + 1 : e;
  }
});
function La(t, e, n) {
  for (let r in t) {
    let i = t[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = La(i, e, {})), n[r] = i;
  }
  return n;
}
class Tr {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && La(e.props, this, this.props), this.key = e.key ? e.key.key : Aa("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const ko = /* @__PURE__ */ Object.create(null);
function Aa(t) {
  return t in ko ? t + "$" + ++ko[t] : (ko[t] = 0, t + "$");
}
class _r {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = Aa(e);
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
const _d = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function Da(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const Pd = (t, e, n) => {
  let r = Da(t, n);
  if (!r)
    return !1;
  let i = Xl(r);
  if (!i) {
    let l = r.blockRange(), s = l && zn(l);
    return s == null ? !1 : (e && e(t.tr.lift(l, s).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Va(t, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (xn(o, "end") || B.isSelectable(o)))
    for (let l = r.depth; ; l--) {
      let s = Kl(t.doc, r.before(l), r.after(l), P.empty);
      if (s && s.slice.size < s.to - s.from) {
        if (e) {
          let u = t.tr.step(s);
          u.setSelection(xn(o, "end") ? D.findFrom(u.doc.resolve(u.mapping.map(i.pos, -1)), -1) : B.create(u.doc, i.pos - o.nodeSize)), e(u.scrollIntoView());
        }
        return !0;
      }
      if (l == 1 || r.node(l - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, zd = (t, e, n) => {
  let r = Da(t, n);
  if (!r)
    return !1;
  let i = Xl(r);
  return i ? Ba(t, i, e) : !1;
}, Id = (t, e, n) => {
  let r = $a(t, n);
  if (!r)
    return !1;
  let i = Gl(r);
  return i ? Ba(t, i, e) : !1;
};
function Ba(t, e, n) {
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
  let a = Kl(t.doc, o, u, P.empty);
  if (!a || a.from != o || a instanceof Me && a.slice.size >= u - o)
    return !1;
  if (n) {
    let c = t.tr.step(a);
    c.setSelection(H.create(c.doc, o)), n(c.scrollIntoView());
  }
  return !0;
}
function xn(t, e, n = !1) {
  for (let r = t; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (n && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Od = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    o = Xl(r);
  }
  let l = o && o.nodeBefore;
  return !l || !B.isSelectable(l) ? !1 : (e && e(t.tr.setSelection(B.create(t.doc, o.pos - l.nodeSize)).scrollIntoView()), !0);
};
function Xl(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      if (t.index(e) > 0)
        return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function $a(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const Rd = (t, e, n) => {
  let r = $a(t, n);
  if (!r)
    return !1;
  let i = Gl(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Va(t, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (xn(o, "start") || B.isSelectable(o))) {
    let l = Kl(t.doc, r.before(), r.after(), P.empty);
    if (l && l.slice.size < l.to - l.from) {
      if (e) {
        let s = t.tr.step(l);
        s.setSelection(xn(o, "start") ? D.findFrom(s.doc.resolve(s.mapping.map(i.pos)), 1) : B.create(s.doc, s.mapping.map(i.pos))), e(s.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Fd = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Gl(r);
  }
  let l = o && o.nodeAfter;
  return !l || !B.isSelectable(l) ? !1 : (e && e(t.tr.setSelection(B.create(t.doc, o.pos)).scrollIntoView()), !0);
};
function Gl(t) {
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
const Ld = (t, e) => {
  let n = t.selection, r = n instanceof B, i;
  if (r) {
    if (n.node.isTextblock || !Zt(t.doc, n.from))
      return !1;
    i = n.from;
  } else if (i = Ki(t.doc, n.from, -1), i == null)
    return !1;
  if (e) {
    let o = t.tr.join(i);
    r && o.setSelection(B.create(o.doc, i - t.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Ad = (t, e) => {
  let n = t.selection, r;
  if (n instanceof B) {
    if (n.node.isTextblock || !Zt(t.doc, n.to))
      return !1;
    r = n.to;
  } else if (r = Ki(t.doc, n.to, 1), r == null)
    return !1;
  return e && e(t.tr.join(r).scrollIntoView()), !0;
}, Dd = (t, e) => {
  let { $from: n, $to: r } = t.selection, i = n.blockRange(r), o = i && zn(i);
  return o == null ? !1 : (e && e(t.tr.lift(i, o).scrollIntoView()), !0);
}, Bd = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (e && e(t.tr.insertText(`
`).scrollIntoView()), !0);
};
function ja(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    let { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
const $d = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let i = n.node(-1), o = n.indexAfter(-1), l = ja(i.contentMatchAt(o));
  if (!l || !i.canReplaceWith(o, o, l))
    return !1;
  if (e) {
    let s = n.after(), u = t.tr.replaceWith(s, s, l.createAndFill());
    u.setSelection(D.near(u.doc.resolve(s), 1)), e(u.scrollIntoView());
  }
  return !0;
}, jd = (t, e) => {
  let n = t.selection, { $from: r, $to: i } = n;
  if (n instanceof qe || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = ja(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let l = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, s = t.tr.insert(l, o.createAndFill());
    s.setSelection(H.create(s.doc, l + 1)), e(s.scrollIntoView());
  }
  return !0;
}, Vd = (t, e) => {
  let { $cursor: n } = t.selection;
  if (!n || n.parent.content.size)
    return !1;
  if (n.depth > 1 && n.after() != n.end(-1)) {
    let o = n.before();
    if (mn(t.doc, o))
      return e && e(t.tr.split(o).scrollIntoView()), !0;
  }
  let r = n.blockRange(), i = r && zn(r);
  return i == null ? !1 : (e && e(t.tr.lift(r, i).scrollIntoView()), !0);
}, Ud = (t, e) => {
  let { $from: n, to: r } = t.selection, i, o = n.sharedDepth(r);
  return o == 0 ? !1 : (i = n.before(o), e && e(t.tr.setSelection(B.create(t.doc, i))), !0);
};
function Wd(t, e, n) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Zt(t.doc, e.pos)) ? !1 : (n && n(t.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function Va(t, e, n, r) {
  let i = e.nodeBefore, o = e.nodeAfter, l, s, u = i.type.spec.isolating || o.type.spec.isolating;
  if (!u && Wd(t, e, n))
    return !0;
  let a = !u && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (l = (s = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && s.matchType(l[0] || o.type).validEnd) {
    if (n) {
      let g = e.pos + o.nodeSize, y = _.empty;
      for (let h = l.length - 1; h >= 0; h--)
        y = _.from(l[h].create(null, y));
      y = _.from(i.copy(y));
      let v = t.tr.step(new ke(e.pos - 1, g, e.pos, g, new P(y, 1, 0), l.length, !0)), x = g + 2 * l.length;
      Zt(v.doc, x) && v.join(x), n(v.scrollIntoView());
    }
    return !0;
  }
  let c = o.type.spec.isolating || r > 0 && u ? null : D.findFrom(e, 1), f = c && c.$from.blockRange(c.$to), d = f && zn(f);
  if (d != null && d >= e.depth)
    return n && n(t.tr.lift(f, d).scrollIntoView()), !0;
  if (a && xn(o, "start", !0) && xn(i, "end")) {
    let g = i, y = [];
    for (; y.push(g), !g.isTextblock; )
      g = g.lastChild;
    let v = o, x = 1;
    for (; !v.isTextblock; v = v.firstChild)
      x++;
    if (g.canReplace(g.childCount, g.childCount, v.content)) {
      if (n) {
        let h = _.empty;
        for (let m = y.length - 1; m >= 0; m--)
          h = _.from(y[m].copy(h));
        let p = t.tr.step(new ke(e.pos - y.length, e.pos + o.nodeSize, e.pos + x, e.pos + o.nodeSize - x, new P(h, y.length, 0), 0, !0));
        n(p.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Ua(t) {
  return function(e, n) {
    let r = e.selection, i = t < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (n && n(e.tr.setSelection(H.create(e.doc, t < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Hd = Ua(-1), Jd = Ua(1);
function Qd(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, l = i.blockRange(o), s = l && Oa(l, t, e);
    return s ? (r && r(n.tr.wrap(l, s).scrollIntoView()), !0) : !1;
  };
}
function lu(t, e = null) {
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
function Kd(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, l = i.blockRange(o), s = !1, u = l;
    if (!l)
      return !1;
    if (l.depth >= 2 && i.node(l.depth - 1).type.compatibleContent(t) && l.startIndex == 0) {
      if (i.index(l.depth - 1) == 0)
        return !1;
      let c = n.doc.resolve(l.start - 2);
      u = new Zo(c, c, l.depth), l.endIndex < l.parent.childCount && (l = new Zo(i, n.doc.resolve(o.end(l.depth)), l.depth)), s = !0;
    }
    let a = Oa(u, t, e, l);
    return a ? (r && r(Yd(n.tr, l, a, s, t).scrollIntoView()), !0) : !1;
  };
}
function Yd(t, e, n, r, i) {
  let o = _.empty;
  for (let c = n.length - 1; c >= 0; c--)
    o = _.from(n[c].type.create(n[c].attrs, o));
  t.step(new ke(e.start - (r ? 2 : 0), e.end, e.start, e.end, new P(o, 0, 0), n.length, !0));
  let l = 0;
  for (let c = 0; c < n.length; c++)
    n[c].type == i && (l = c + 1);
  let s = n.length - l, u = e.start + n.length - (r ? 2 : 0), a = e.parent;
  for (let c = e.startIndex, f = e.endIndex, d = !0; c < f; c++, d = !1)
    !d && mn(t.doc, u, s) && (t.split(u, s), u += 2 * s), u += a.child(c).nodeSize;
  return t;
}
function Xd(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (l) => l.childCount > 0 && l.firstChild.type == t);
    return o ? n ? r.node(o.depth - 1).type == t ? Gd(e, n, t, o) : Zd(e, n, o) : !0 : !1;
  };
}
function Gd(t, e, n, r) {
  let i = t.tr, o = r.end, l = r.$to.end(r.depth);
  o < l && (i.step(new ke(o - 1, l, o, l, new P(_.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Zo(i.doc.resolve(r.$from.pos), i.doc.resolve(l), r.depth));
  const s = zn(r);
  if (s == null)
    return !1;
  i.lift(r, s);
  let u = i.mapping.map(o, -1) - 1;
  return Zt(i.doc, u) && i.join(u), e(i.scrollIntoView()), !0;
}
function Zd(t, e, n) {
  let r = t.tr, i = n.parent;
  for (let g = n.end, y = n.endIndex - 1, v = n.startIndex; y > v; y--)
    g -= i.child(y).nodeSize, r.delete(g - 1, g + 1);
  let o = r.doc.resolve(n.start), l = o.nodeAfter;
  if (r.mapping.map(n.end) != n.start + o.nodeAfter.nodeSize)
    return !1;
  let s = n.startIndex == 0, u = n.endIndex == i.childCount, a = o.node(-1), c = o.index(-1);
  if (!a.canReplace(c + (s ? 0 : 1), c + 1, l.content.append(u ? _.empty : _.from(i))))
    return !1;
  let f = o.pos, d = f + l.nodeSize;
  return r.step(new ke(f - (s ? 1 : 0), d + (u ? 1 : 0), f + 1, d - 1, new P((s ? _.empty : _.from(i.copy(_.empty))).append(u ? _.empty : _.from(i.copy(_.empty))), s ? 0 : 1, u ? 0 : 1), s ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function qd(t) {
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
      let a = u.lastChild && u.lastChild.type == s.type, c = _.from(a ? t.create() : null), f = new P(_.from(t.create(null, _.from(s.type.create(null, c)))), a ? 3 : 1, 0), d = o.start, g = o.end;
      n(e.tr.step(new ke(d - (a ? 3 : 1), g, d, g, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function Wa(t) {
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
class bd {
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
    const { rawCommands: r, editor: i, state: o } = this, { view: l } = i, s = [], u = !!e, a = e || o.tr, c = () => (!u && n && !a.getMeta("preventDispatch") && !this.hasCustomState && l.dispatch(a), s.every((d) => d === !0)), f = {
      ...Object.fromEntries(Object.entries(r).map(([d, g]) => [d, (...v) => {
        const x = this.buildProps(a, n), h = g(...v)(x);
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
      state: Wa({
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
function _e(t, e, n) {
  return t.config[e] === void 0 && t.parent ? _e(t.parent, e, n) : typeof t.config[e] == "function" ? t.config[e].bind({
    ...n,
    parent: t.parent ? _e(t.parent, e, n) : null
  }) : t.config[e];
}
function ep(t) {
  const e = t.filter((i) => i.type === "extension"), n = t.filter((i) => i.type === "node"), r = t.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: n,
    markExtensions: r
  };
}
function fe(t, e) {
  if (typeof t == "string") {
    if (!e.nodes[t])
      throw Error(`There is no node type named '${t}'. Maybe you forgot to add the extension?`);
    return e.nodes[t];
  }
  return t;
}
function tp(...t) {
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
function np(t) {
  return typeof t == "function";
}
function Je(t, e = void 0, ...n) {
  return np(t) ? e ? t.bind(e)(...n) : t(...n) : t;
}
function rp(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function ip(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function So(t) {
  return ip(t) !== "Object" ? !1 : t.constructor === Object && Object.getPrototypeOf(t) === Object.prototype;
}
function Zl(t, e) {
  const n = { ...t };
  return So(t) && So(e) && Object.keys(e).forEach((r) => {
    So(e[r]) ? r in t ? n[r] = Zl(t[r], e[r]) : Object.assign(n, { [r]: e[r] }) : Object.assign(n, { [r]: e[r] });
  }), n;
}
class lt {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = Je(_e(this, "addOptions", {
      name: this.name
    }))), this.storage = Je(_e(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new lt(e);
  }
  configure(e = {}) {
    const n = this.extend();
    return n.options = Zl(this.options, e), n.storage = Je(_e(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
  extend(e = {}) {
    const n = new lt({ ...this.config, ...e });
    return n.parent = this, this.child = n, n.name = e.name ? e.name : n.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = Je(_e(n, "addOptions", {
      name: n.name
    })), n.storage = Je(_e(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
}
function op(t, e, n) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: l = {} } = n || {};
  let s = "", u = !0;
  return t.nodesBetween(r, i, (a, c, f, d) => {
    var g;
    const y = l == null ? void 0 : l[a.type.name];
    y ? (a.isBlock && !u && (s += o, u = !0), f && (s += y({
      node: a,
      pos: c,
      parent: f,
      index: d,
      range: e
    }))) : a.isText ? (s += (g = a == null ? void 0 : a.text) === null || g === void 0 ? void 0 : g.slice(Math.max(r, c) - c, i - c), u = !1) : a.isBlock && !u && (s += o, u = !0);
  }), s;
}
function lp(t) {
  return Object.fromEntries(Object.entries(t.nodes).filter(([, e]) => e.spec.toText).map(([e, n]) => [e, n.spec.toText]));
}
lt.create({
  name: "clipboardTextSerializer",
  addProseMirrorPlugins() {
    return [
      new Tr({
        key: new _r("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: t } = this, { state: e, schema: n } = t, { doc: r, selection: i } = e, { ranges: o } = i, l = Math.min(...o.map((c) => c.$from.pos)), s = Math.max(...o.map((c) => c.$to.pos)), u = lp(n);
            return op(r, { from: l, to: s }, {
              textSerializers: u
            });
          }
        }
      })
    ];
  }
});
const sp = () => ({ editor: t, view: e }) => (requestAnimationFrame(() => {
  var n;
  t.isDestroyed || (e.dom.blur(), (n = window == null ? void 0 : window.getSelection()) === null || n === void 0 || n.removeAllRanges());
}), !0), up = (t = !1) => ({ commands: e }) => e.setContent("", t), ap = () => ({ state: t, tr: e, dispatch: n }) => {
  const { selection: r } = e, { ranges: i } = r;
  return n && i.forEach(({ $from: o, $to: l }) => {
    t.doc.nodesBetween(o.pos, l.pos, (s, u) => {
      if (s.type.isText)
        return;
      const { doc: a, mapping: c } = e, f = a.resolve(c.map(u)), d = a.resolve(c.map(u + s.nodeSize)), g = f.blockRange(d);
      if (!g)
        return;
      const y = zn(g);
      if (s.type.isTextblock) {
        const { defaultType: v } = f.parent.contentMatchAt(f.index());
        e.setNodeMarkup(g.start, v);
      }
      (y || y === 0) && e.lift(g, y);
    });
  }), !0;
}, cp = (t) => (e) => t(e), fp = () => ({ state: t, dispatch: e }) => jd(t, e), dp = (t, e) => ({ editor: n, tr: r }) => {
  const { state: i } = n, o = i.doc.slice(t.from, t.to);
  r.deleteRange(t.from, t.to);
  const l = r.mapping.map(e);
  return r.insert(l, o.content), r.setSelection(new H(r.doc.resolve(l - 1))), !0;
}, pp = () => ({ tr: t, dispatch: e }) => {
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
}, hp = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const i = fe(t, n.schema), o = e.selection.$anchor;
  for (let l = o.depth; l > 0; l -= 1)
    if (o.node(l).type === i) {
      if (r) {
        const u = o.before(l), a = o.after(l);
        e.delete(u, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, mp = (t) => ({ tr: e, dispatch: n }) => {
  const { from: r, to: i } = t;
  return n && e.delete(r, i), !0;
}, gp = () => ({ state: t, dispatch: e }) => _d(t, e), yp = () => ({ commands: t }) => t.keyboardShortcut("Enter"), vp = () => ({ state: t, dispatch: e }) => $d(t, e);
function ki(t, e, n = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => n.strict ? e[i] === t[i] : rp(e[i]) ? e[i].test(t[i]) : e[i] === t[i]) : !0;
}
function bo(t, e, n = {}) {
  return t.find((r) => r.type === e && ki(r.attrs, n));
}
function wp(t, e, n = {}) {
  return !!bo(t, e, n);
}
function Ha(t, e, n = {}) {
  if (!t || !e)
    return;
  let r = t.parent.childAfter(t.parentOffset);
  if (t.parentOffset === r.offset && r.offset !== 0 && (r = t.parent.childBefore(t.parentOffset)), !r.node)
    return;
  const i = bo([...r.node.marks], e, n);
  if (!i)
    return;
  let o = r.index, l = t.start() + r.offset, s = o + 1, u = l + r.node.nodeSize;
  for (bo([...r.node.marks], e, n); o > 0 && i.isInSet(t.parent.child(o - 1).marks); )
    o -= 1, l -= t.parent.child(o).nodeSize;
  for (; s < t.parent.childCount && wp([...t.parent.child(s).marks], e, n); )
    u += t.parent.child(s).nodeSize, s += 1;
  return {
    from: l,
    to: u
  };
}
function Pt(t, e) {
  if (typeof t == "string") {
    if (!e.marks[t])
      throw Error(`There is no mark type named '${t}'. Maybe you forgot to add the extension?`);
    return e.marks[t];
  }
  return t;
}
const kp = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const o = Pt(t, r.schema), { doc: l, selection: s } = n, { $from: u, from: a, to: c } = s;
  if (i) {
    const f = Ha(u, o, e);
    if (f && f.from <= a && f.to >= c) {
      const d = H.create(l, f.from, f.to);
      n.setSelection(d);
    }
  }
  return !0;
}, Sp = (t) => (e) => {
  const n = typeof t == "function" ? t(e) : t;
  for (let r = 0; r < n.length; r += 1)
    if (n[r](e))
      return !0;
  return !1;
};
function Ja(t) {
  return t instanceof H;
}
function jt(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function xp(t, e = null) {
  if (!e)
    return null;
  const n = D.atStart(t), r = D.atEnd(t);
  if (e === "start" || e === !0)
    return n;
  if (e === "end")
    return r;
  const i = n.from, o = r.to;
  return e === "all" ? H.create(t, jt(0, i, o), jt(t.content.size, i, o)) : H.create(t, jt(e, i, o), jt(e, i, o));
}
function Xi() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const Ep = (t = null, e = {}) => ({ editor: n, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const l = () => {
    Xi() && r.dom.focus(), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), e != null && e.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && t === null || t === !1)
    return !0;
  if (o && t === null && !Ja(n.state.selection))
    return l(), !0;
  const s = xp(i.doc, t) || n.state.selection, u = n.state.selection.eq(s);
  return o && (u || i.setSelection(s), u && i.storedMarks && i.setStoredMarks(i.storedMarks), l()), !0;
}, Cp = (t, e) => (n) => t.every((r, i) => e(r, { ...n, index: i })), Np = (t, e) => ({ tr: n, commands: r }) => r.insertContentAt({ from: n.selection.from, to: n.selection.to }, t, e), Qa = (t) => {
  const e = t.childNodes;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? t.removeChild(r) : r.nodeType === 1 && Qa(r);
  }
  return t;
};
function su(t) {
  const e = `<body>${t}</body>`, n = new window.DOMParser().parseFromString(e, "text/html").body;
  return Qa(n);
}
function Si(t, e, n) {
  if (n = {
    slice: !0,
    parseOptions: {},
    ...n
  }, typeof t == "object" && t !== null)
    try {
      return Array.isArray(t) && t.length > 0 ? _.fromArray(t.map((r) => e.nodeFromJSON(r))) : e.nodeFromJSON(t);
    } catch (r) {
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", t, "Error:", r), Si("", e, n);
    }
  if (typeof t == "string") {
    const r = gi.fromSchema(e);
    return n.slice ? r.parseSlice(su(t), n.parseOptions).content : r.parse(su(t), n.parseOptions);
  }
  return Si("", e, n);
}
function Mp(t, e, n) {
  const r = t.steps.length - 1;
  if (r < e)
    return;
  const i = t.steps[r];
  if (!(i instanceof Me || i instanceof ke))
    return;
  const o = t.mapping.maps[r];
  let l = 0;
  o.forEach((s, u, a, c) => {
    l === 0 && (l = c);
  }), t.setSelection(D.near(t.doc.resolve(l), n));
}
const Tp = (t) => t.toString().startsWith("<"), _p = (t, e, n) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    n = {
      parseOptions: {},
      updateSelection: !0,
      ...n
    };
    const l = Si(e, o.schema, {
      parseOptions: {
        preserveWhitespace: "full",
        ...n.parseOptions
      }
    });
    if (l.toString() === "<>")
      return !0;
    let { from: s, to: u } = typeof t == "number" ? { from: t, to: t } : { from: t.from, to: t.to }, a = !0, c = !0;
    if ((Tp(l) ? l : [l]).forEach((d) => {
      d.check(), a = a ? d.isText && d.marks.length === 0 : !1, c = c ? d.isBlock : !1;
    }), s === u && c) {
      const { parent: d } = r.doc.resolve(s);
      d.isTextblock && !d.type.spec.code && !d.childCount && (s -= 1, u += 1);
    }
    a ? Array.isArray(e) ? r.insertText(e.map((d) => d.text || "").join(""), s, u) : typeof e == "object" && e && e.text ? r.insertText(e.text, s, u) : r.insertText(e, s, u) : r.replaceWith(s, u, l), n.updateSelection && Mp(r, r.steps.length - 1, -1);
  }
  return !0;
}, Pp = () => ({ state: t, dispatch: e }) => Ld(t, e), zp = () => ({ state: t, dispatch: e }) => Ad(t, e), Ip = () => ({ state: t, dispatch: e }) => Pd(t, e), Op = () => ({ state: t, dispatch: e }) => Rd(t, e), Rp = () => ({ tr: t, state: e, dispatch: n }) => {
  try {
    const r = Ki(e.doc, e.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), n && n(t), !0);
  } catch {
    return !1;
  }
}, Fp = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = Ki(t.doc, t.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, Lp = () => ({ state: t, dispatch: e }) => zd(t, e), Ap = () => ({ state: t, dispatch: e }) => Id(t, e);
function Ka() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Dp(t) {
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
      Xi() || Ka() ? l = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${u}`);
  }
  return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), l && (n = `Meta-${n}`), o && (n = `Shift-${n}`), n;
}
const Bp = (t) => ({ editor: e, view: n, tr: r, dispatch: i }) => {
  const o = Dp(t).split(/-(?!$)/), l = o.find((a) => !["Alt", "Ctrl", "Meta", "Shift"].includes(a)), s = new KeyboardEvent("keydown", {
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
function ql(t, e, n = {}) {
  const { from: r, to: i, empty: o } = t.selection, l = e ? fe(e, t.schema) : null, s = [];
  t.doc.nodesBetween(r, i, (f, d) => {
    if (f.isText)
      return;
    const g = Math.max(r, d), y = Math.min(i, d + f.nodeSize);
    s.push({
      node: f,
      from: g,
      to: y
    });
  });
  const u = i - r, a = s.filter((f) => l ? l.name === f.node.type.name : !0).filter((f) => ki(f.node.attrs, n, { strict: !1 }));
  return o ? !!a.length : a.reduce((f, d) => f + d.to - d.from, 0) >= u;
}
const $p = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = fe(t, n.schema);
  return ql(n, i, e) ? Dd(n, r) : !1;
}, jp = () => ({ state: t, dispatch: e }) => Vd(t, e), Vp = (t) => ({ state: e, dispatch: n }) => {
  const r = fe(t, e.schema);
  return Xd(r)(e, n);
}, Up = () => ({ state: t, dispatch: e }) => Bd(t, e);
function Ya(t, e) {
  return e.nodes[t] ? "node" : e.marks[t] ? "mark" : null;
}
function uu(t, e) {
  const n = typeof e == "string" ? [e] : e;
  return Object.keys(t).reduce((r, i) => (n.includes(i) || (r[i] = t[i]), r), {});
}
const Wp = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, l = null;
  const s = Ya(typeof t == "string" ? t : t.name, r.schema);
  return s ? (s === "node" && (o = fe(t, r.schema)), s === "mark" && (l = Pt(t, r.schema)), i && n.selection.ranges.forEach((u) => {
    r.doc.nodesBetween(u.$from.pos, u.$to.pos, (a, c) => {
      o && o === a.type && n.setNodeMarkup(c, void 0, uu(a.attrs, e)), l && a.marks.length && a.marks.forEach((f) => {
        l === f.type && n.addMark(c, c + a.nodeSize, l.create(uu(f.attrs, e)));
      });
    });
  }), !0) : !1;
}, Hp = () => ({ tr: t, dispatch: e }) => (e && t.scrollIntoView(), !0), Jp = () => ({ tr: t, commands: e }) => e.setTextSelection({
  from: 0,
  to: t.doc.content.size
}), Qp = () => ({ state: t, dispatch: e }) => Od(t, e), Kp = () => ({ state: t, dispatch: e }) => Fd(t, e), Yp = () => ({ state: t, dispatch: e }) => Ud(t, e), Xp = () => ({ state: t, dispatch: e }) => Jd(t, e), Gp = () => ({ state: t, dispatch: e }) => Hd(t, e);
function Zp(t, e, n = {}) {
  return Si(t, e, { slice: !1, parseOptions: n });
}
const qp = (t, e = !1, n = {}) => ({ tr: r, editor: i, dispatch: o }) => {
  const { doc: l } = r, s = Zp(t, i.schema, n);
  return o && r.replaceWith(0, l.content.size, s).setMeta("preventUpdate", !e), !0;
};
function bp(t, e) {
  const n = Pt(e, t.schema), { from: r, to: i, empty: o } = t.selection, l = [];
  o ? (t.storedMarks && l.push(...t.storedMarks), l.push(...t.selection.$head.marks())) : t.doc.nodesBetween(r, i, (u) => {
    l.push(...u.marks);
  });
  const s = l.find((u) => u.type.name === n.name);
  return s ? { ...s.attrs } : {};
}
function eh(t) {
  for (let e = 0; e < t.edgeCount; e += 1) {
    const { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
function th(t, e) {
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
function bl(t) {
  return (e) => th(e.$from, t);
}
function ri(t, e, n) {
  return Object.fromEntries(Object.entries(n).filter(([r]) => {
    const i = t.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function nh(t, e, n = {}) {
  const { empty: r, ranges: i } = t.selection, o = e ? Pt(e, t.schema) : null;
  if (r)
    return !!(t.storedMarks || t.selection.$from.marks()).filter((f) => o ? o.name === f.type.name : !0).find((f) => ki(f.attrs, n, { strict: !1 }));
  let l = 0;
  const s = [];
  if (i.forEach(({ $from: f, $to: d }) => {
    const g = f.pos, y = d.pos;
    t.doc.nodesBetween(g, y, (v, x) => {
      if (!v.isText && !v.marks.length)
        return;
      const h = Math.max(g, x), p = Math.min(y, x + v.nodeSize), m = p - h;
      l += m, s.push(...v.marks.map((w) => ({
        mark: w,
        from: h,
        to: p
      })));
    });
  }), l === 0)
    return !1;
  const u = s.filter((f) => o ? o.name === f.mark.type.name : !0).filter((f) => ki(f.mark.attrs, n, { strict: !1 })).reduce((f, d) => f + d.to - d.from, 0), a = s.filter((f) => o ? f.mark.type !== o && f.mark.type.excludes(o) : !0).reduce((f, d) => f + d.to - d.from, 0);
  return (u > 0 ? u + a : u) >= l;
}
function au(t, e) {
  const { nodeExtensions: n } = ep(e), r = n.find((l) => l.name === t);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = Je(_e(r, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function rh(t, e, n) {
  var r;
  const { selection: i } = e;
  let o = null;
  if (Ja(i) && (o = i.$cursor), o) {
    const s = (r = t.storedMarks) !== null && r !== void 0 ? r : o.marks();
    return !!n.isInSet(s) || !s.some((u) => u.type.excludes(n));
  }
  const { ranges: l } = i;
  return l.some(({ $from: s, $to: u }) => {
    let a = s.depth === 0 ? t.doc.inlineContent && t.doc.type.allowsMarkType(n) : !1;
    return t.doc.nodesBetween(s.pos, u.pos, (c, f, d) => {
      if (a)
        return !1;
      if (c.isInline) {
        const g = !d || d.type.allowsMarkType(n), y = !!n.isInSet(c.marks) || !c.marks.some((v) => v.type.excludes(n));
        a = g && y;
      }
      return !a;
    }), a;
  });
}
const ih = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: o } = n, { empty: l, ranges: s } = o, u = Pt(t, r.schema);
  if (i)
    if (l) {
      const a = bp(r, u);
      n.addStoredMark(u.create({
        ...a,
        ...e
      }));
    } else
      s.forEach((a) => {
        const c = a.$from.pos, f = a.$to.pos;
        r.doc.nodesBetween(c, f, (d, g) => {
          const y = Math.max(g, c), v = Math.min(g + d.nodeSize, f);
          d.marks.find((h) => h.type === u) ? d.marks.forEach((h) => {
            u === h.type && n.addMark(y, v, u.create({
              ...h.attrs,
              ...e
            }));
          }) : n.addMark(y, v, u.create(e));
        });
      });
  return rh(r, n, u);
}, oh = (t, e) => ({ tr: n }) => (n.setMeta(t, e), !0), lh = (t, e = {}) => ({ state: n, dispatch: r, chain: i }) => {
  const o = fe(t, n.schema);
  return o.isTextblock ? i().command(({ commands: l }) => lu(o, e)(n) ? !0 : l.clearNodes()).command(({ state: l }) => lu(o, e)(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, sh = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, i = jt(t, 0, r.content.size), o = B.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, uh = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, { from: i, to: o } = typeof t == "number" ? { from: t, to: t } : t, l = H.atStart(r).from, s = H.atEnd(r).to, u = jt(i, l, s), a = jt(o, l, s), c = H.create(r, u, a);
    e.setSelection(c);
  }
  return !0;
}, ah = (t) => ({ state: e, dispatch: n }) => {
  const r = fe(t, e.schema);
  return qd(r)(e, n);
};
function cu(t, e) {
  const n = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
  if (n) {
    const r = n.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    t.tr.ensureMarks(r);
  }
}
const ch = ({ keepMarks: t = !0 } = {}) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  const { selection: o, doc: l } = e, { $from: s, $to: u } = o, a = i.extensionManager.attributes, c = ri(a, s.node().type.name, s.node().attrs);
  if (o instanceof B && o.node.isBlock)
    return !s.parentOffset || !mn(l, s.pos) ? !1 : (r && (t && cu(n, i.extensionManager.splittableMarks), e.split(s.pos).scrollIntoView()), !0);
  if (!s.parent.isBlock)
    return !1;
  if (r) {
    const f = u.parentOffset === u.parent.content.size;
    o instanceof H && e.deleteSelection();
    const d = s.depth === 0 ? void 0 : eh(s.node(-1).contentMatchAt(s.indexAfter(-1)));
    let g = f && d ? [
      {
        type: d,
        attrs: c
      }
    ] : void 0, y = mn(e.doc, e.mapping.map(s.pos), 1, g);
    if (!g && !y && mn(e.doc, e.mapping.map(s.pos), 1, d ? [{ type: d }] : void 0) && (y = !0, g = d ? [
      {
        type: d,
        attrs: c
      }
    ] : void 0), y && (e.split(e.mapping.map(s.pos), 1, g), d && !f && !s.parentOffset && s.parent.type !== d)) {
      const v = e.mapping.map(s.before()), x = e.doc.resolve(v);
      s.node(-1).canReplaceWith(x.index(), x.index() + 1, d) && e.setNodeMarkup(e.mapping.map(s.before()), d);
    }
    t && cu(n, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return !0;
}, fh = (t) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  var o;
  const l = fe(t, n.schema), { $from: s, $to: u } = n.selection, a = n.selection.node;
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
      let x = _.empty;
      const h = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
      for (let C = s.depth - h; C >= s.depth - 3; C -= 1)
        x = _.from(s.node(C).copy(x));
      const p = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3, m = ri(f, s.node().type.name, s.node().attrs), w = ((o = l.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(m)) || void 0;
      x = x.append(_.from(l.createAndFill(null, w) || void 0));
      const S = s.before(s.depth - (h - 1));
      e.replace(S, s.after(-p), new P(x, 4 - h, 0));
      let E = -1;
      e.doc.nodesBetween(S, e.doc.content.size, (C, T) => {
        if (E > -1)
          return !1;
        C.isTextblock && C.content.size === 0 && (E = T + 1);
      }), E > -1 && e.setSelection(H.near(e.doc.resolve(E))), e.scrollIntoView();
    }
    return !0;
  }
  const d = u.pos === s.end() ? c.contentMatchAt(0).defaultType : null, g = ri(f, c.type.name, c.attrs), y = ri(f, s.node().type.name, s.node().attrs);
  e.delete(s.pos, u.pos);
  const v = d ? [
    { type: l, attrs: g },
    { type: d, attrs: y }
  ] : [{ type: l, attrs: g }];
  if (!mn(e.doc, s.pos, 2))
    return !1;
  if (r) {
    const { selection: x, storedMarks: h } = n, { splittableMarks: p } = i.extensionManager, m = h || x.$to.parentOffset && x.$from.marks();
    if (e.split(s.pos, 2, v).scrollIntoView(), !m || !r)
      return !0;
    const w = m.filter((S) => p.includes(S.type.name));
    e.ensureMarks(w);
  }
  return !0;
}, xo = (t, e) => {
  const n = bl((l) => l.type === e)(t.selection);
  if (!n)
    return !0;
  const r = t.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0)
    return !0;
  const i = t.doc.nodeAt(r);
  return n.node.type === (i == null ? void 0 : i.type) && Zt(t.doc, n.pos) && t.join(n.pos), !0;
}, Eo = (t, e) => {
  const n = bl((l) => l.type === e)(t.selection);
  if (!n)
    return !0;
  const r = t.doc.resolve(n.start).after(n.depth);
  if (r === void 0)
    return !0;
  const i = t.doc.nodeAt(r);
  return n.node.type === (i == null ? void 0 : i.type) && Zt(t.doc, r) && t.join(r), !0;
}, dh = (t, e, n, r = {}) => ({ editor: i, tr: o, state: l, dispatch: s, chain: u, commands: a, can: c }) => {
  const { extensions: f, splittableMarks: d } = i.extensionManager, g = fe(t, l.schema), y = fe(e, l.schema), { selection: v, storedMarks: x } = l, { $from: h, $to: p } = v, m = h.blockRange(p), w = x || v.$to.parentOffset && v.$from.marks();
  if (!m)
    return !1;
  const S = bl((E) => au(E.type.name, f))(v);
  if (m.depth >= 1 && S && m.depth - S.depth <= 1) {
    if (S.node.type === g)
      return a.liftListItem(y);
    if (au(S.node.type.name, f) && g.validContent(S.node.content) && s)
      return u().command(() => (o.setNodeMarkup(S.pos, g), !0)).command(() => xo(o, g)).command(() => Eo(o, g)).run();
  }
  return !n || !w || !s ? u().command(() => c().wrapInList(g, r) ? !0 : a.clearNodes()).wrapInList(g, r).command(() => xo(o, g)).command(() => Eo(o, g)).run() : u().command(() => {
    const E = c().wrapInList(g, r), C = w.filter((T) => d.includes(T.type.name));
    return o.ensureMarks(C), E ? !0 : a.clearNodes();
  }).wrapInList(g, r).command(() => xo(o, g)).command(() => Eo(o, g)).run();
}, ph = (t, e = {}, n = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = n, l = Pt(t, r.schema);
  return nh(r, l, e) ? i.unsetMark(l, { extendEmptyMarkRange: o }) : i.setMark(l, e);
}, hh = (t, e, n = {}) => ({ state: r, commands: i }) => {
  const o = fe(t, r.schema), l = fe(e, r.schema);
  return ql(r, o, n) ? i.setNode(l) : i.setNode(o, n);
}, mh = (t, e = {}) => ({ state: n, commands: r }) => {
  const i = fe(t, n.schema);
  return ql(n, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, gh = () => ({ state: t, dispatch: e }) => {
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
}, yh = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, { empty: r, ranges: i } = n;
  return r || e && i.forEach((o) => {
    t.removeMark(o.$from.pos, o.$to.pos);
  }), !0;
}, vh = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: l = !1 } = e, { selection: s } = n, u = Pt(t, r.schema), { $from: a, empty: c, ranges: f } = s;
  if (!i)
    return !0;
  if (c && l) {
    let { from: d, to: g } = s;
    const y = (o = a.marks().find((x) => x.type === u)) === null || o === void 0 ? void 0 : o.attrs, v = Ha(a, u, y);
    v && (d = v.from, g = v.to), n.removeMark(d, g, u);
  } else
    f.forEach((d) => {
      n.removeMark(d.$from.pos, d.$to.pos, u);
    });
  return n.removeStoredMark(u), !0;
}, wh = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, l = null;
  const s = Ya(typeof t == "string" ? t : t.name, r.schema);
  return s ? (s === "node" && (o = fe(t, r.schema)), s === "mark" && (l = Pt(t, r.schema)), i && n.selection.ranges.forEach((u) => {
    const a = u.$from.pos, c = u.$to.pos;
    r.doc.nodesBetween(a, c, (f, d) => {
      o && o === f.type && n.setNodeMarkup(d, void 0, {
        ...f.attrs,
        ...e
      }), l && f.marks.length && f.marks.forEach((g) => {
        if (l === g.type) {
          const y = Math.max(d, a), v = Math.min(d + f.nodeSize, c);
          n.addMark(y, v, l.create({
            ...g.attrs,
            ...e
          }));
        }
      });
    });
  }), !0) : !1;
}, kh = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = fe(t, n.schema);
  return Qd(i, e)(n, r);
}, Sh = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = fe(t, n.schema);
  return Kd(i, e)(n, r);
};
var xh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: sp,
  clearContent: up,
  clearNodes: ap,
  command: cp,
  createParagraphNear: fp,
  cut: dp,
  deleteCurrentNode: pp,
  deleteNode: hp,
  deleteRange: mp,
  deleteSelection: gp,
  enter: yp,
  exitCode: vp,
  extendMarkRange: kp,
  first: Sp,
  focus: Ep,
  forEach: Cp,
  insertContent: Np,
  insertContentAt: _p,
  joinUp: Pp,
  joinDown: zp,
  joinBackward: Ip,
  joinForward: Op,
  joinItemBackward: Rp,
  joinItemForward: Fp,
  joinTextblockBackward: Lp,
  joinTextblockForward: Ap,
  keyboardShortcut: Bp,
  lift: $p,
  liftEmptyBlock: jp,
  liftListItem: Vp,
  newlineInCode: Up,
  resetAttributes: Wp,
  scrollIntoView: Hp,
  selectAll: Jp,
  selectNodeBackward: Qp,
  selectNodeForward: Kp,
  selectParentNode: Yp,
  selectTextblockEnd: Xp,
  selectTextblockStart: Gp,
  setContent: qp,
  setMark: ih,
  setMeta: oh,
  setNode: lh,
  setNodeSelection: sh,
  setTextSelection: uh,
  sinkListItem: ah,
  splitBlock: ch,
  splitListItem: fh,
  toggleList: dh,
  toggleMark: ph,
  toggleNode: hh,
  toggleWrap: mh,
  undoInputRule: gh,
  unsetAllMarks: yh,
  unsetMark: vh,
  updateAttributes: wh,
  wrapIn: kh,
  wrapInList: Sh
});
lt.create({
  name: "commands",
  addCommands() {
    return {
      ...xh
    };
  }
});
lt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new Tr({
        key: new _r("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
});
lt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: t } = this;
    return [
      new Tr({
        key: new _r("focusEvents"),
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
lt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const t = () => this.editor.commands.first(({ commands: l }) => [
      () => l.undoInputRule(),
      // maybe convert first text block node to default node
      () => l.command(({ tr: s }) => {
        const { selection: u, doc: a } = s, { empty: c, $anchor: f } = u, { pos: d, parent: g } = f, y = f.parent.isTextblock ? s.doc.resolve(d - 1) : f, v = y.parent.type.spec.isolating, x = f.pos - f.parentOffset, h = v && y.parent.childCount === 1 ? x === f.pos : D.atStart(a).from === d;
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
    return Xi() || Ka() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new Tr({
        key: new _r("clearDocument"),
        appendTransaction: (t, e, n) => {
          if (!(t.some((y) => y.docChanged) && !e.doc.eq(n.doc)))
            return;
          const { empty: i, from: o, to: l } = e.selection, s = D.atStart(e.doc).from, u = D.atEnd(e.doc).to;
          if (i || !(o === s && l === u) || !(n.doc.textBetween(0, n.doc.content.size, " ", " ").length === 0))
            return;
          const f = n.tr, d = Wa({
            state: n,
            transaction: f
          }), { commands: g } = new bd({
            editor: this.editor,
            state: d
          });
          if (g.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
});
lt.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new Tr({
        key: new _r("tabindex"),
        props: {
          attributes: this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class xi {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = Je(_e(this, "addOptions", {
      name: this.name
    }))), this.storage = Je(_e(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new xi(e);
  }
  configure(e = {}) {
    const n = this.extend();
    return n.options = Zl(this.options, e), n.storage = Je(_e(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
  extend(e = {}) {
    const n = new xi({ ...this.config, ...e });
    return n.parent = this, this.child = n, n.name = e.name ? e.name : n.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = Je(_e(n, "addOptions", {
      name: n.name
    })), n.storage = Je(_e(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
}
function Eh() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
class Ch {
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
    let d = 0, g = 0;
    if (this.dom !== f) {
      const x = this.dom.getBoundingClientRect(), h = f.getBoundingClientRect(), p = (i = e.offsetX) !== null && i !== void 0 ? i : (o = e.nativeEvent) === null || o === void 0 ? void 0 : o.offsetX, m = (l = e.offsetY) !== null && l !== void 0 ? l : (s = e.nativeEvent) === null || s === void 0 ? void 0 : s.offsetY;
      d = h.x - x.x + p, g = h.y - x.y + m;
    }
    (u = e.dataTransfer) === null || u === void 0 || u.setDragImage(this.dom, d, g);
    const y = B.create(a.state.doc, this.getPos()), v = a.state.tr.setSelection(y);
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
    const { isEditable: u } = this.editor, { isDragging: a } = this, c = !!this.node.type.spec.draggable, f = B.isSelectable(this.node), d = e.type === "copy", g = e.type === "paste", y = e.type === "cut", v = e.type === "mousedown";
    if (!c && f && o && e.preventDefault(), c && o && !a)
      return e.preventDefault(), !1;
    if (c && u && !a && v) {
      const x = r.closest("[data-drag-handle]");
      x && (this.dom === x || this.dom.contains(x)) && (this.isDragging = !0, document.addEventListener("dragend", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("drop", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("mouseup", () => {
        this.isDragging = !1;
      }, { once: !0 }));
    }
    return !(a || l || d || g || y || v && f);
  }
  ignoreMutation(e) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: e }) : this.node.isLeaf || this.node.isAtom ? !0 : e.type === "selection" || this.dom.contains(e.target) && e.type === "childList" && (Xi() || Eh()) && this.editor.isFocused && [
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
function Xa(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ga = { exports: {} }, R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pr = Symbol.for("react.element"), Nh = Symbol.for("react.portal"), Mh = Symbol.for("react.fragment"), Th = Symbol.for("react.strict_mode"), _h = Symbol.for("react.profiler"), Ph = Symbol.for("react.provider"), zh = Symbol.for("react.context"), Ih = Symbol.for("react.forward_ref"), Oh = Symbol.for("react.suspense"), Rh = Symbol.for("react.memo"), Fh = Symbol.for("react.lazy"), fu = Symbol.iterator;
function Lh(t) {
  return t === null || typeof t != "object" ? null : (t = fu && t[fu] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Za = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, qa = Object.assign, ba = {};
function In(t, e, n) {
  this.props = t, this.context = e, this.refs = ba, this.updater = n || Za;
}
In.prototype.isReactComponent = {};
In.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
In.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function ec() {
}
ec.prototype = In.prototype;
function es(t, e, n) {
  this.props = t, this.context = e, this.refs = ba, this.updater = n || Za;
}
var ts = es.prototype = new ec();
ts.constructor = es;
qa(ts, In.prototype);
ts.isPureReactComponent = !0;
var du = Array.isArray, tc = Object.prototype.hasOwnProperty, ns = { current: null }, nc = { key: !0, ref: !0, __self: !0, __source: !0 };
function rc(t, e, n) {
  var r, i = {}, o = null, l = null;
  if (e != null)
    for (r in e.ref !== void 0 && (l = e.ref), e.key !== void 0 && (o = "" + e.key), e)
      tc.call(e, r) && !nc.hasOwnProperty(r) && (i[r] = e[r]);
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
  return { $$typeof: Pr, type: t, key: o, ref: l, props: i, _owner: ns.current };
}
function Ah(t, e) {
  return { $$typeof: Pr, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function rs(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Pr;
}
function Dh(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(n) {
    return e[n];
  });
}
var pu = /\/+/g;
function Co(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? Dh("" + t.key) : e.toString(36);
}
function ii(t, e, n, r, i) {
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
          case Pr:
          case Nh:
            l = !0;
        }
    }
  if (l)
    return l = t, i = i(l), t = r === "" ? "." + Co(l, 0) : r, du(i) ? (n = "", t != null && (n = t.replace(pu, "$&/") + "/"), ii(i, e, n, "", function(a) {
      return a;
    })) : i != null && (rs(i) && (i = Ah(i, n + (!i.key || l && l.key === i.key ? "" : ("" + i.key).replace(pu, "$&/") + "/") + t)), e.push(i)), 1;
  if (l = 0, r = r === "" ? "." : r + ":", du(t))
    for (var s = 0; s < t.length; s++) {
      o = t[s];
      var u = r + Co(o, s);
      l += ii(o, e, n, u, i);
    }
  else if (u = Lh(t), typeof u == "function")
    for (t = u.call(t), s = 0; !(o = t.next()).done; )
      o = o.value, u = r + Co(o, s++), l += ii(o, e, n, u, i);
  else if (o === "object")
    throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return l;
}
function $r(t, e, n) {
  if (t == null)
    return t;
  var r = [], i = 0;
  return ii(t, r, "", "", function(o) {
    return e.call(n, o, i++);
  }), r;
}
function Bh(t) {
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
var ge = { current: null }, oi = { transition: null }, $h = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: oi, ReactCurrentOwner: ns };
function ic() {
  throw Error("act(...) is not supported in production builds of React.");
}
R.Children = { map: $r, forEach: function(t, e, n) {
  $r(t, function() {
    e.apply(this, arguments);
  }, n);
}, count: function(t) {
  var e = 0;
  return $r(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return $r(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!rs(t))
    throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
R.Component = In;
R.Fragment = Mh;
R.Profiler = _h;
R.PureComponent = es;
R.StrictMode = Th;
R.Suspense = Oh;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $h;
R.act = ic;
R.cloneElement = function(t, e, n) {
  if (t == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var r = qa({}, t.props), i = t.key, o = t.ref, l = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (o = e.ref, l = ns.current), e.key !== void 0 && (i = "" + e.key), t.type && t.type.defaultProps)
      var s = t.type.defaultProps;
    for (u in e)
      tc.call(e, u) && !nc.hasOwnProperty(u) && (r[u] = e[u] === void 0 && s !== void 0 ? s[u] : e[u]);
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
  return { $$typeof: Pr, type: t.type, key: i, ref: o, props: r, _owner: l };
};
R.createContext = function(t) {
  return t = { $$typeof: zh, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: Ph, _context: t }, t.Consumer = t;
};
R.createElement = rc;
R.createFactory = function(t) {
  var e = rc.bind(null, t);
  return e.type = t, e;
};
R.createRef = function() {
  return { current: null };
};
R.forwardRef = function(t) {
  return { $$typeof: Ih, render: t };
};
R.isValidElement = rs;
R.lazy = function(t) {
  return { $$typeof: Fh, _payload: { _status: -1, _result: t }, _init: Bh };
};
R.memo = function(t, e) {
  return { $$typeof: Rh, type: t, compare: e === void 0 ? null : e };
};
R.startTransition = function(t) {
  var e = oi.transition;
  oi.transition = {};
  try {
    t();
  } finally {
    oi.transition = e;
  }
};
R.unstable_act = ic;
R.useCallback = function(t, e) {
  return ge.current.useCallback(t, e);
};
R.useContext = function(t) {
  return ge.current.useContext(t);
};
R.useDebugValue = function() {
};
R.useDeferredValue = function(t) {
  return ge.current.useDeferredValue(t);
};
R.useEffect = function(t, e) {
  return ge.current.useEffect(t, e);
};
R.useId = function() {
  return ge.current.useId();
};
R.useImperativeHandle = function(t, e, n) {
  return ge.current.useImperativeHandle(t, e, n);
};
R.useInsertionEffect = function(t, e) {
  return ge.current.useInsertionEffect(t, e);
};
R.useLayoutEffect = function(t, e) {
  return ge.current.useLayoutEffect(t, e);
};
R.useMemo = function(t, e) {
  return ge.current.useMemo(t, e);
};
R.useReducer = function(t, e, n) {
  return ge.current.useReducer(t, e, n);
};
R.useRef = function(t) {
  return ge.current.useRef(t);
};
R.useState = function(t) {
  return ge.current.useState(t);
};
R.useSyncExternalStore = function(t, e, n) {
  return ge.current.useSyncExternalStore(t, e, n);
};
R.useTransition = function() {
  return ge.current.useTransition();
};
R.version = "18.3.1";
Ga.exports = R;
var On = Ga.exports;
const re = /* @__PURE__ */ Xa(On);
var oc = { exports: {} }, Oe = {}, lc = { exports: {} }, sc = {};
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
  function e(M, z) {
    var I = M.length;
    M.push(z);
    e:
      for (; 0 < I; ) {
        var X = I - 1 >>> 1, te = M[X];
        if (0 < i(te, z))
          M[X] = z, M[I] = te, I = X;
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
    var z = M[0], I = M.pop();
    if (I !== z) {
      M[0] = I;
      e:
        for (var X = 0, te = M.length, Fr = te >>> 1; X < Fr; ) {
          var Rt = 2 * (X + 1) - 1, ho = M[Rt], Ft = Rt + 1, Lr = M[Ft];
          if (0 > i(ho, I))
            Ft < te && 0 > i(Lr, ho) ? (M[X] = Lr, M[Ft] = I, X = Ft) : (M[X] = ho, M[Rt] = I, X = Rt);
          else if (Ft < te && 0 > i(Lr, I))
            M[X] = Lr, M[Ft] = I, X = Ft;
          else
            break e;
        }
    }
    return z;
  }
  function i(M, z) {
    var I = M.sortIndex - z.sortIndex;
    return I !== 0 ? I : M.id - z.id;
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
  var u = [], a = [], c = 1, f = null, d = 3, g = !1, y = !1, v = !1, x = typeof setTimeout == "function" ? setTimeout : null, h = typeof clearTimeout == "function" ? clearTimeout : null, p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(M) {
    for (var z = n(a); z !== null; ) {
      if (z.callback === null)
        r(a);
      else if (z.startTime <= M)
        r(a), z.sortIndex = z.expirationTime, e(u, z);
      else
        break;
      z = n(a);
    }
  }
  function w(M) {
    if (v = !1, m(M), !y)
      if (n(u) !== null)
        y = !0, fo(S);
      else {
        var z = n(a);
        z !== null && po(w, z.startTime - M);
      }
  }
  function S(M, z) {
    y = !1, v && (v = !1, h(T), T = -1), g = !0;
    var I = d;
    try {
      for (m(z), f = n(u); f !== null && (!(f.expirationTime > z) || M && !je()); ) {
        var X = f.callback;
        if (typeof X == "function") {
          f.callback = null, d = f.priorityLevel;
          var te = X(f.expirationTime <= z);
          z = t.unstable_now(), typeof te == "function" ? f.callback = te : f === n(u) && r(u), m(z);
        } else
          r(u);
        f = n(u);
      }
      if (f !== null)
        var Fr = !0;
      else {
        var Rt = n(a);
        Rt !== null && po(w, Rt.startTime - z), Fr = !1;
      }
      return Fr;
    } finally {
      f = null, d = I, g = !1;
    }
  }
  var E = !1, C = null, T = -1, Y = 5, F = -1;
  function je() {
    return !(t.unstable_now() - F < Y);
  }
  function Ln() {
    if (C !== null) {
      var M = t.unstable_now();
      F = M;
      var z = !0;
      try {
        z = C(!0, M);
      } finally {
        z ? An() : (E = !1, C = null);
      }
    } else
      E = !1;
  }
  var An;
  if (typeof p == "function")
    An = function() {
      p(Ln);
    };
  else if (typeof MessageChannel < "u") {
    var Xs = new MessageChannel(), ad = Xs.port2;
    Xs.port1.onmessage = Ln, An = function() {
      ad.postMessage(null);
    };
  } else
    An = function() {
      x(Ln, 0);
    };
  function fo(M) {
    C = M, E || (E = !0, An());
  }
  function po(M, z) {
    T = x(function() {
      M(t.unstable_now());
    }, z);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(M) {
    M.callback = null;
  }, t.unstable_continueExecution = function() {
    y || g || (y = !0, fo(S));
  }, t.unstable_forceFrameRate = function(M) {
    0 > M || 125 < M ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Y = 0 < M ? Math.floor(1e3 / M) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, t.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, t.unstable_next = function(M) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var z = 3;
        break;
      default:
        z = d;
    }
    var I = d;
    d = z;
    try {
      return M();
    } finally {
      d = I;
    }
  }, t.unstable_pauseExecution = function() {
  }, t.unstable_requestPaint = function() {
  }, t.unstable_runWithPriority = function(M, z) {
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
    var I = d;
    d = M;
    try {
      return z();
    } finally {
      d = I;
    }
  }, t.unstable_scheduleCallback = function(M, z, I) {
    var X = t.unstable_now();
    switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? X + I : X) : I = X, M) {
      case 1:
        var te = -1;
        break;
      case 2:
        te = 250;
        break;
      case 5:
        te = 1073741823;
        break;
      case 4:
        te = 1e4;
        break;
      default:
        te = 5e3;
    }
    return te = I + te, M = { id: c++, callback: z, priorityLevel: M, startTime: I, expirationTime: te, sortIndex: -1 }, I > X ? (M.sortIndex = I, e(a, M), n(u) === null && M === n(a) && (v ? (h(T), T = -1) : v = !0, po(w, I - X))) : (M.sortIndex = te, e(u, M), y || g || (y = !0, fo(S))), M;
  }, t.unstable_shouldYield = je, t.unstable_wrapCallback = function(M) {
    var z = d;
    return function() {
      var I = d;
      d = z;
      try {
        return M.apply(this, arguments);
      } finally {
        d = I;
      }
    };
  };
})(sc);
lc.exports = sc;
var jh = lc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vh = On, Ie = jh;
function k(t) {
  for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1; n < arguments.length; n++)
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var uc = /* @__PURE__ */ new Set(), cr = {};
function qt(t, e) {
  En(t, e), En(t + "Capture", e);
}
function En(t, e) {
  for (cr[t] = e, t = 0; t < e.length; t++)
    uc.add(e[t]);
}
var st = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), el = Object.prototype.hasOwnProperty, Uh = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, hu = {}, mu = {};
function Wh(t) {
  return el.call(mu, t) ? !0 : el.call(hu, t) ? !1 : Uh.test(t) ? mu[t] = !0 : (hu[t] = !0, !1);
}
function Hh(t, e, n, r) {
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
function Jh(t, e, n, r) {
  if (e === null || typeof e > "u" || Hh(t, e, n, r))
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
function ye(t, e, n, r, i, o, l) {
  this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = o, this.removeEmptyString = l;
}
var se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
  se[t] = new ye(t, 0, !1, t, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
  var e = t[0];
  se[e] = new ye(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
  se[t] = new ye(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
  se[t] = new ye(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
  se[t] = new ye(t, 3, !1, t.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(t) {
  se[t] = new ye(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function(t) {
  se[t] = new ye(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(t) {
  se[t] = new ye(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function(t) {
  se[t] = new ye(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var is = /[\-:]([a-z])/g;
function ls(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
  var e = t.replace(
    is,
    ls
  );
  se[e] = new ye(e, 1, !1, t, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
  var e = t.replace(is, ls);
  se[e] = new ye(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
  var e = t.replace(is, ls);
  se[e] = new ye(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(t) {
  se[t] = new ye(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
se.xlinkHref = new ye("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(t) {
  se[t] = new ye(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
function ss(t, e, n, r) {
  var i = se.hasOwnProperty(e) ? se[e] : null;
  (i !== null ? i.type !== 0 : r || !(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (Jh(e, n, i, r) && (n = null), r || i === null ? Wh(e) && (n === null ? t.removeAttribute(e) : t.setAttribute(e, "" + n)) : i.mustUseProperty ? t[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (e = i.attributeName, r = i.attributeNamespace, n === null ? t.removeAttribute(e) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n))));
}
var ft = Vh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, jr = Symbol.for("react.element"), nn = Symbol.for("react.portal"), rn = Symbol.for("react.fragment"), us = Symbol.for("react.strict_mode"), tl = Symbol.for("react.profiler"), ac = Symbol.for("react.provider"), cc = Symbol.for("react.context"), as = Symbol.for("react.forward_ref"), nl = Symbol.for("react.suspense"), rl = Symbol.for("react.suspense_list"), cs = Symbol.for("react.memo"), pt = Symbol.for("react.lazy"), fc = Symbol.for("react.offscreen"), gu = Symbol.iterator;
function Dn(t) {
  return t === null || typeof t != "object" ? null : (t = gu && t[gu] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Q = Object.assign, No;
function Kn(t) {
  if (No === void 0)
    try {
      throw Error();
    } catch (n) {
      var e = n.stack.trim().match(/\n( *(at )?)/);
      No = e && e[1] || "";
    }
  return `
` + No + t;
}
var Mo = !1;
function To(t, e) {
  if (!t || Mo)
    return "";
  Mo = !0;
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
    Mo = !1, Error.prepareStackTrace = n;
  }
  return (t = t ? t.displayName || t.name : "") ? Kn(t) : "";
}
function Qh(t) {
  switch (t.tag) {
    case 5:
      return Kn(t.type);
    case 16:
      return Kn("Lazy");
    case 13:
      return Kn("Suspense");
    case 19:
      return Kn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return t = To(t.type, !1), t;
    case 11:
      return t = To(t.type.render, !1), t;
    case 1:
      return t = To(t.type, !0), t;
    default:
      return "";
  }
}
function il(t) {
  if (t == null)
    return null;
  if (typeof t == "function")
    return t.displayName || t.name || null;
  if (typeof t == "string")
    return t;
  switch (t) {
    case rn:
      return "Fragment";
    case nn:
      return "Portal";
    case tl:
      return "Profiler";
    case us:
      return "StrictMode";
    case nl:
      return "Suspense";
    case rl:
      return "SuspenseList";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case cc:
        return (t.displayName || "Context") + ".Consumer";
      case ac:
        return (t._context.displayName || "Context") + ".Provider";
      case as:
        var e = t.render;
        return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
      case cs:
        return e = t.displayName || null, e !== null ? e : il(t.type) || "Memo";
      case pt:
        e = t._payload, t = t._init;
        try {
          return il(t(e));
        } catch {
        }
    }
  return null;
}
function Kh(t) {
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
      return il(e);
    case 8:
      return e === us ? "StrictMode" : "Mode";
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
function Tt(t) {
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
function dc(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function Yh(t) {
  var e = dc(t) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e), r = "" + t[e];
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
function Vr(t) {
  t._valueTracker || (t._valueTracker = Yh(t));
}
function pc(t) {
  if (!t)
    return !1;
  var e = t._valueTracker;
  if (!e)
    return !0;
  var n = e.getValue(), r = "";
  return t && (r = dc(t) ? t.checked ? "true" : "false" : t.value), t = r, t !== n ? (e.setValue(t), !0) : !1;
}
function Ei(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u")
    return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
function ol(t, e) {
  var n = e.checked;
  return Q({}, e, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? t._wrapperState.initialChecked });
}
function yu(t, e) {
  var n = e.defaultValue == null ? "" : e.defaultValue, r = e.checked != null ? e.checked : e.defaultChecked;
  n = Tt(e.value != null ? e.value : n), t._wrapperState = { initialChecked: r, initialValue: n, controlled: e.type === "checkbox" || e.type === "radio" ? e.checked != null : e.value != null };
}
function hc(t, e) {
  e = e.checked, e != null && ss(t, "checked", e, !1);
}
function ll(t, e) {
  hc(t, e);
  var n = Tt(e.value), r = e.type;
  if (n != null)
    r === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + n) : t.value !== "" + n && (t.value = "" + n);
  else if (r === "submit" || r === "reset") {
    t.removeAttribute("value");
    return;
  }
  e.hasOwnProperty("value") ? sl(t, e.type, n) : e.hasOwnProperty("defaultValue") && sl(t, e.type, Tt(e.defaultValue)), e.checked == null && e.defaultChecked != null && (t.defaultChecked = !!e.defaultChecked);
}
function vu(t, e, n) {
  if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
    var r = e.type;
    if (!(r !== "submit" && r !== "reset" || e.value !== void 0 && e.value !== null))
      return;
    e = "" + t._wrapperState.initialValue, n || e === t.value || (t.value = e), t.defaultValue = e;
  }
  n = t.name, n !== "" && (t.name = ""), t.defaultChecked = !!t._wrapperState.initialChecked, n !== "" && (t.name = n);
}
function sl(t, e, n) {
  (e !== "number" || Ei(t.ownerDocument) !== t) && (n == null ? t.defaultValue = "" + t._wrapperState.initialValue : t.defaultValue !== "" + n && (t.defaultValue = "" + n));
}
var Yn = Array.isArray;
function gn(t, e, n, r) {
  if (t = t.options, e) {
    e = {};
    for (var i = 0; i < n.length; i++)
      e["$" + n[i]] = !0;
    for (n = 0; n < t.length; n++)
      i = e.hasOwnProperty("$" + t[n].value), t[n].selected !== i && (t[n].selected = i), i && r && (t[n].defaultSelected = !0);
  } else {
    for (n = "" + Tt(n), e = null, i = 0; i < t.length; i++) {
      if (t[i].value === n) {
        t[i].selected = !0, r && (t[i].defaultSelected = !0);
        return;
      }
      e !== null || t[i].disabled || (e = t[i]);
    }
    e !== null && (e.selected = !0);
  }
}
function ul(t, e) {
  if (e.dangerouslySetInnerHTML != null)
    throw Error(k(91));
  return Q({}, e, { value: void 0, defaultValue: void 0, children: "" + t._wrapperState.initialValue });
}
function wu(t, e) {
  var n = e.value;
  if (n == null) {
    if (n = e.children, e = e.defaultValue, n != null) {
      if (e != null)
        throw Error(k(92));
      if (Yn(n)) {
        if (1 < n.length)
          throw Error(k(93));
        n = n[0];
      }
      e = n;
    }
    e == null && (e = ""), n = e;
  }
  t._wrapperState = { initialValue: Tt(n) };
}
function mc(t, e) {
  var n = Tt(e.value), r = Tt(e.defaultValue);
  n != null && (n = "" + n, n !== t.value && (t.value = n), e.defaultValue == null && t.defaultValue !== n && (t.defaultValue = n)), r != null && (t.defaultValue = "" + r);
}
function ku(t) {
  var e = t.textContent;
  e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
}
function gc(t) {
  switch (t) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function al(t, e) {
  return t == null || t === "http://www.w3.org/1999/xhtml" ? gc(e) : t === "http://www.w3.org/2000/svg" && e === "foreignObject" ? "http://www.w3.org/1999/xhtml" : t;
}
var Ur, yc = function(t) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(e, n, r, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return t(e, n, r, i);
    });
  } : t;
}(function(t, e) {
  if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t)
    t.innerHTML = e;
  else {
    for (Ur = Ur || document.createElement("div"), Ur.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>", e = Ur.firstChild; t.firstChild; )
      t.removeChild(t.firstChild);
    for (; e.firstChild; )
      t.appendChild(e.firstChild);
  }
});
function fr(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var bn = {
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
}, Xh = ["Webkit", "ms", "Moz", "O"];
Object.keys(bn).forEach(function(t) {
  Xh.forEach(function(e) {
    e = e + t.charAt(0).toUpperCase() + t.substring(1), bn[e] = bn[t];
  });
});
function vc(t, e, n) {
  return e == null || typeof e == "boolean" || e === "" ? "" : n || typeof e != "number" || e === 0 || bn.hasOwnProperty(t) && bn[t] ? ("" + e).trim() : e + "px";
}
function wc(t, e) {
  t = t.style;
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = vc(n, e[n], r);
      n === "float" && (n = "cssFloat"), r ? t.setProperty(n, i) : t[n] = i;
    }
}
var Gh = Q({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function cl(t, e) {
  if (e) {
    if (Gh[t] && (e.children != null || e.dangerouslySetInnerHTML != null))
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
function fl(t, e) {
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
var dl = null;
function fs(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var pl = null, yn = null, vn = null;
function Su(t) {
  if (t = Or(t)) {
    if (typeof pl != "function")
      throw Error(k(280));
    var e = t.stateNode;
    e && (e = eo(e), pl(t.stateNode, t.type, e));
  }
}
function kc(t) {
  yn ? vn ? vn.push(t) : vn = [t] : yn = t;
}
function Sc() {
  if (yn) {
    var t = yn, e = vn;
    if (vn = yn = null, Su(t), e)
      for (t = 0; t < e.length; t++)
        Su(e[t]);
  }
}
function xc(t, e) {
  return t(e);
}
function Ec() {
}
var _o = !1;
function Cc(t, e, n) {
  if (_o)
    return t(e, n);
  _o = !0;
  try {
    return xc(t, e, n);
  } finally {
    _o = !1, (yn !== null || vn !== null) && (Ec(), Sc());
  }
}
function dr(t, e) {
  var n = t.stateNode;
  if (n === null)
    return null;
  var r = eo(n);
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
var hl = !1;
if (st)
  try {
    var Bn = {};
    Object.defineProperty(Bn, "passive", { get: function() {
      hl = !0;
    } }), window.addEventListener("test", Bn, Bn), window.removeEventListener("test", Bn, Bn);
  } catch {
    hl = !1;
  }
function Zh(t, e, n, r, i, o, l, s, u) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    e.apply(n, a);
  } catch (c) {
    this.onError(c);
  }
}
var er = !1, Ci = null, Ni = !1, ml = null, qh = { onError: function(t) {
  er = !0, Ci = t;
} };
function bh(t, e, n, r, i, o, l, s, u) {
  er = !1, Ci = null, Zh.apply(qh, arguments);
}
function em(t, e, n, r, i, o, l, s, u) {
  if (bh.apply(this, arguments), er) {
    if (er) {
      var a = Ci;
      er = !1, Ci = null;
    } else
      throw Error(k(198));
    Ni || (Ni = !0, ml = a);
  }
}
function bt(t) {
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
function Nc(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null)
      return e.dehydrated;
  }
  return null;
}
function xu(t) {
  if (bt(t) !== t)
    throw Error(k(188));
}
function tm(t) {
  var e = t.alternate;
  if (!e) {
    if (e = bt(t), e === null)
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
          return xu(i), t;
        if (o === r)
          return xu(i), e;
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
function Mc(t) {
  return t = tm(t), t !== null ? Tc(t) : null;
}
function Tc(t) {
  if (t.tag === 5 || t.tag === 6)
    return t;
  for (t = t.child; t !== null; ) {
    var e = Tc(t);
    if (e !== null)
      return e;
    t = t.sibling;
  }
  return null;
}
var _c = Ie.unstable_scheduleCallback, Eu = Ie.unstable_cancelCallback, nm = Ie.unstable_shouldYield, rm = Ie.unstable_requestPaint, G = Ie.unstable_now, im = Ie.unstable_getCurrentPriorityLevel, ds = Ie.unstable_ImmediatePriority, Pc = Ie.unstable_UserBlockingPriority, Mi = Ie.unstable_NormalPriority, om = Ie.unstable_LowPriority, zc = Ie.unstable_IdlePriority, Gi = null, be = null;
function lm(t) {
  if (be && typeof be.onCommitFiberRoot == "function")
    try {
      be.onCommitFiberRoot(Gi, t, void 0, (t.current.flags & 128) === 128);
    } catch {
    }
}
var Qe = Math.clz32 ? Math.clz32 : am, sm = Math.log, um = Math.LN2;
function am(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (sm(t) / um | 0) | 0;
}
var Wr = 64, Hr = 4194304;
function Xn(t) {
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
function Ti(t, e) {
  var n = t.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, i = t.suspendedLanes, o = t.pingedLanes, l = n & 268435455;
  if (l !== 0) {
    var s = l & ~i;
    s !== 0 ? r = Xn(s) : (o &= l, o !== 0 && (r = Xn(o)));
  } else
    l = n & ~i, l !== 0 ? r = Xn(l) : o !== 0 && (r = Xn(o));
  if (r === 0)
    return 0;
  if (e !== 0 && e !== r && !(e & i) && (i = r & -r, o = e & -e, i >= o || i === 16 && (o & 4194240) !== 0))
    return e;
  if (r & 4 && (r |= n & 16), e = t.entangledLanes, e !== 0)
    for (t = t.entanglements, e &= r; 0 < e; )
      n = 31 - Qe(e), i = 1 << n, r |= t[n], e &= ~i;
  return r;
}
function cm(t, e) {
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
function fm(t, e) {
  for (var n = t.suspendedLanes, r = t.pingedLanes, i = t.expirationTimes, o = t.pendingLanes; 0 < o; ) {
    var l = 31 - Qe(o), s = 1 << l, u = i[l];
    u === -1 ? (!(s & n) || s & r) && (i[l] = cm(s, e)) : u <= e && (t.expiredLanes |= s), o &= ~s;
  }
}
function gl(t) {
  return t = t.pendingLanes & -1073741825, t !== 0 ? t : t & 1073741824 ? 1073741824 : 0;
}
function Ic() {
  var t = Wr;
  return Wr <<= 1, !(Wr & 4194240) && (Wr = 64), t;
}
function Po(t) {
  for (var e = [], n = 0; 31 > n; n++)
    e.push(t);
  return e;
}
function zr(t, e, n) {
  t.pendingLanes |= e, e !== 536870912 && (t.suspendedLanes = 0, t.pingedLanes = 0), t = t.eventTimes, e = 31 - Qe(e), t[e] = n;
}
function dm(t, e) {
  var n = t.pendingLanes & ~e;
  t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.expiredLanes &= e, t.mutableReadLanes &= e, t.entangledLanes &= e, e = t.entanglements;
  var r = t.eventTimes;
  for (t = t.expirationTimes; 0 < n; ) {
    var i = 31 - Qe(n), o = 1 << i;
    e[i] = 0, r[i] = -1, t[i] = -1, n &= ~o;
  }
}
function ps(t, e) {
  var n = t.entangledLanes |= e;
  for (t = t.entanglements; n; ) {
    var r = 31 - Qe(n), i = 1 << r;
    i & e | t[r] & e && (t[r] |= e), n &= ~i;
  }
}
var A = 0;
function Oc(t) {
  return t &= -t, 1 < t ? 4 < t ? t & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Rc, hs, Fc, Lc, Ac, yl = !1, Jr = [], wt = null, kt = null, St = null, pr = /* @__PURE__ */ new Map(), hr = /* @__PURE__ */ new Map(), mt = [], pm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Cu(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      wt = null;
      break;
    case "dragenter":
    case "dragleave":
      kt = null;
      break;
    case "mouseover":
    case "mouseout":
      St = null;
      break;
    case "pointerover":
    case "pointerout":
      pr.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      hr.delete(e.pointerId);
  }
}
function $n(t, e, n, r, i, o) {
  return t === null || t.nativeEvent !== o ? (t = { blockedOn: e, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, e !== null && (e = Or(e), e !== null && hs(e)), t) : (t.eventSystemFlags |= r, e = t.targetContainers, i !== null && e.indexOf(i) === -1 && e.push(i), t);
}
function hm(t, e, n, r, i) {
  switch (e) {
    case "focusin":
      return wt = $n(wt, t, e, n, r, i), !0;
    case "dragenter":
      return kt = $n(kt, t, e, n, r, i), !0;
    case "mouseover":
      return St = $n(St, t, e, n, r, i), !0;
    case "pointerover":
      var o = i.pointerId;
      return pr.set(o, $n(pr.get(o) || null, t, e, n, r, i)), !0;
    case "gotpointercapture":
      return o = i.pointerId, hr.set(o, $n(hr.get(o) || null, t, e, n, r, i)), !0;
  }
  return !1;
}
function Dc(t) {
  var e = Vt(t.target);
  if (e !== null) {
    var n = bt(e);
    if (n !== null) {
      if (e = n.tag, e === 13) {
        if (e = Nc(n), e !== null) {
          t.blockedOn = e, Ac(t.priority, function() {
            Fc(n);
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
function li(t) {
  if (t.blockedOn !== null)
    return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var n = vl(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var r = new n.constructor(n.type, n);
      dl = r, n.target.dispatchEvent(r), dl = null;
    } else
      return e = Or(n), e !== null && hs(e), t.blockedOn = n, !1;
    e.shift();
  }
  return !0;
}
function Nu(t, e, n) {
  li(t) && n.delete(e);
}
function mm() {
  yl = !1, wt !== null && li(wt) && (wt = null), kt !== null && li(kt) && (kt = null), St !== null && li(St) && (St = null), pr.forEach(Nu), hr.forEach(Nu);
}
function jn(t, e) {
  t.blockedOn === e && (t.blockedOn = null, yl || (yl = !0, Ie.unstable_scheduleCallback(Ie.unstable_NormalPriority, mm)));
}
function mr(t) {
  function e(i) {
    return jn(i, t);
  }
  if (0 < Jr.length) {
    jn(Jr[0], t);
    for (var n = 1; n < Jr.length; n++) {
      var r = Jr[n];
      r.blockedOn === t && (r.blockedOn = null);
    }
  }
  for (wt !== null && jn(wt, t), kt !== null && jn(kt, t), St !== null && jn(St, t), pr.forEach(e), hr.forEach(e), n = 0; n < mt.length; n++)
    r = mt[n], r.blockedOn === t && (r.blockedOn = null);
  for (; 0 < mt.length && (n = mt[0], n.blockedOn === null); )
    Dc(n), n.blockedOn === null && mt.shift();
}
var wn = ft.ReactCurrentBatchConfig, _i = !0;
function gm(t, e, n, r) {
  var i = A, o = wn.transition;
  wn.transition = null;
  try {
    A = 1, ms(t, e, n, r);
  } finally {
    A = i, wn.transition = o;
  }
}
function ym(t, e, n, r) {
  var i = A, o = wn.transition;
  wn.transition = null;
  try {
    A = 4, ms(t, e, n, r);
  } finally {
    A = i, wn.transition = o;
  }
}
function ms(t, e, n, r) {
  if (_i) {
    var i = vl(t, e, n, r);
    if (i === null)
      $o(t, e, r, Pi, n), Cu(t, r);
    else if (hm(i, t, e, n, r))
      r.stopPropagation();
    else if (Cu(t, r), e & 4 && -1 < pm.indexOf(t)) {
      for (; i !== null; ) {
        var o = Or(i);
        if (o !== null && Rc(o), o = vl(t, e, n, r), o === null && $o(t, e, r, Pi, n), o === i)
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else
      $o(t, e, r, null, n);
  }
}
var Pi = null;
function vl(t, e, n, r) {
  if (Pi = null, t = fs(r), t = Vt(t), t !== null)
    if (e = bt(t), e === null)
      t = null;
    else if (n = e.tag, n === 13) {
      if (t = Nc(e), t !== null)
        return t;
      t = null;
    } else if (n === 3) {
      if (e.stateNode.current.memoizedState.isDehydrated)
        return e.tag === 3 ? e.stateNode.containerInfo : null;
      t = null;
    } else
      e !== t && (t = null);
  return Pi = t, null;
}
function Bc(t) {
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
      switch (im()) {
        case ds:
          return 1;
        case Pc:
          return 4;
        case Mi:
        case om:
          return 16;
        case zc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var yt = null, gs = null, si = null;
function $c() {
  if (si)
    return si;
  var t, e = gs, n = e.length, r, i = "value" in yt ? yt.value : yt.textContent, o = i.length;
  for (t = 0; t < n && e[t] === i[t]; t++)
    ;
  var l = n - t;
  for (r = 1; r <= l && e[n - r] === i[o - r]; r++)
    ;
  return si = i.slice(t, 1 < r ? 1 - r : void 0);
}
function ui(t) {
  var e = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function Qr() {
  return !0;
}
function Mu() {
  return !1;
}
function Re(t) {
  function e(n, r, i, o, l) {
    this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = l, this.currentTarget = null;
    for (var s in t)
      t.hasOwnProperty(s) && (n = t[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Qr : Mu, this.isPropagationStopped = Mu, this;
  }
  return Q(e.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Qr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Qr);
  }, persist: function() {
  }, isPersistent: Qr }), e;
}
var Rn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
  return t.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ys = Re(Rn), Ir = Q({}, Rn, { view: 0, detail: 0 }), vm = Re(Ir), zo, Io, Vn, Zi = Q({}, Ir, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: vs, button: 0, buttons: 0, relatedTarget: function(t) {
  return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
}, movementX: function(t) {
  return "movementX" in t ? t.movementX : (t !== Vn && (Vn && t.type === "mousemove" ? (zo = t.screenX - Vn.screenX, Io = t.screenY - Vn.screenY) : Io = zo = 0, Vn = t), zo);
}, movementY: function(t) {
  return "movementY" in t ? t.movementY : Io;
} }), Tu = Re(Zi), wm = Q({}, Zi, { dataTransfer: 0 }), km = Re(wm), Sm = Q({}, Ir, { relatedTarget: 0 }), Oo = Re(Sm), xm = Q({}, Rn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Em = Re(xm), Cm = Q({}, Rn, { clipboardData: function(t) {
  return "clipboardData" in t ? t.clipboardData : window.clipboardData;
} }), Nm = Re(Cm), Mm = Q({}, Rn, { data: 0 }), _u = Re(Mm), Tm = {
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
}, _m = {
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
}, Pm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function zm(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = Pm[t]) ? !!e[t] : !1;
}
function vs() {
  return zm;
}
var Im = Q({}, Ir, { key: function(t) {
  if (t.key) {
    var e = Tm[t.key] || t.key;
    if (e !== "Unidentified")
      return e;
  }
  return t.type === "keypress" ? (t = ui(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? _m[t.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: vs, charCode: function(t) {
  return t.type === "keypress" ? ui(t) : 0;
}, keyCode: function(t) {
  return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
}, which: function(t) {
  return t.type === "keypress" ? ui(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
} }), Om = Re(Im), Rm = Q({}, Zi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Pu = Re(Rm), Fm = Q({}, Ir, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: vs }), Lm = Re(Fm), Am = Q({}, Rn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Dm = Re(Am), Bm = Q({}, Zi, {
  deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  },
  deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), $m = Re(Bm), jm = [9, 13, 27, 32], ws = st && "CompositionEvent" in window, tr = null;
st && "documentMode" in document && (tr = document.documentMode);
var Vm = st && "TextEvent" in window && !tr, jc = st && (!ws || tr && 8 < tr && 11 >= tr), zu = " ", Iu = !1;
function Vc(t, e) {
  switch (t) {
    case "keyup":
      return jm.indexOf(e.keyCode) !== -1;
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
function Uc(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var on = !1;
function Um(t, e) {
  switch (t) {
    case "compositionend":
      return Uc(e);
    case "keypress":
      return e.which !== 32 ? null : (Iu = !0, zu);
    case "textInput":
      return t = e.data, t === zu && Iu ? null : t;
    default:
      return null;
  }
}
function Wm(t, e) {
  if (on)
    return t === "compositionend" || !ws && Vc(t, e) ? (t = $c(), si = gs = yt = null, on = !1, t) : null;
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
      return jc && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var Hm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Ou(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!Hm[t.type] : e === "textarea";
}
function Wc(t, e, n, r) {
  kc(r), e = zi(e, "onChange"), 0 < e.length && (n = new ys("onChange", "change", null, n, r), t.push({ event: n, listeners: e }));
}
var nr = null, gr = null;
function Jm(t) {
  ef(t, 0);
}
function qi(t) {
  var e = un(t);
  if (pc(e))
    return t;
}
function Qm(t, e) {
  if (t === "change")
    return e;
}
var Hc = !1;
if (st) {
  var Ro;
  if (st) {
    var Fo = "oninput" in document;
    if (!Fo) {
      var Ru = document.createElement("div");
      Ru.setAttribute("oninput", "return;"), Fo = typeof Ru.oninput == "function";
    }
    Ro = Fo;
  } else
    Ro = !1;
  Hc = Ro && (!document.documentMode || 9 < document.documentMode);
}
function Fu() {
  nr && (nr.detachEvent("onpropertychange", Jc), gr = nr = null);
}
function Jc(t) {
  if (t.propertyName === "value" && qi(gr)) {
    var e = [];
    Wc(e, gr, t, fs(t)), Cc(Jm, e);
  }
}
function Km(t, e, n) {
  t === "focusin" ? (Fu(), nr = e, gr = n, nr.attachEvent("onpropertychange", Jc)) : t === "focusout" && Fu();
}
function Ym(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return qi(gr);
}
function Xm(t, e) {
  if (t === "click")
    return qi(e);
}
function Gm(t, e) {
  if (t === "input" || t === "change")
    return qi(e);
}
function Zm(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Ye = typeof Object.is == "function" ? Object.is : Zm;
function yr(t, e) {
  if (Ye(t, e))
    return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var n = Object.keys(t), r = Object.keys(e);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!el.call(e, i) || !Ye(t[i], e[i]))
      return !1;
  }
  return !0;
}
function Lu(t) {
  for (; t && t.firstChild; )
    t = t.firstChild;
  return t;
}
function Au(t, e) {
  var n = Lu(t);
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
    n = Lu(n);
  }
}
function Qc(t, e) {
  return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Qc(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
}
function Kc() {
  for (var t = window, e = Ei(); e instanceof t.HTMLIFrameElement; ) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      t = e.contentWindow;
    else
      break;
    e = Ei(t.document);
  }
  return e;
}
function ks(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
function qm(t) {
  var e = Kc(), n = t.focusedElem, r = t.selectionRange;
  if (e !== n && n && n.ownerDocument && Qc(n.ownerDocument.documentElement, n)) {
    if (r !== null && ks(n)) {
      if (e = r.start, t = r.end, t === void 0 && (t = e), "selectionStart" in n)
        n.selectionStart = e, n.selectionEnd = Math.min(t, n.value.length);
      else if (t = (e = n.ownerDocument || document) && e.defaultView || window, t.getSelection) {
        t = t.getSelection();
        var i = n.textContent.length, o = Math.min(r.start, i);
        r = r.end === void 0 ? o : Math.min(r.end, i), !t.extend && o > r && (i = r, r = o, o = i), i = Au(n, o);
        var l = Au(
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
var bm = st && "documentMode" in document && 11 >= document.documentMode, ln = null, wl = null, rr = null, kl = !1;
function Du(t, e, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  kl || ln == null || ln !== Ei(r) || (r = ln, "selectionStart" in r && ks(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), rr && yr(rr, r) || (rr = r, r = zi(wl, "onSelect"), 0 < r.length && (e = new ys("onSelect", "select", null, e, n), t.push({ event: e, listeners: r }), e.target = ln)));
}
function Kr(t, e) {
  var n = {};
  return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
}
var sn = { animationend: Kr("Animation", "AnimationEnd"), animationiteration: Kr("Animation", "AnimationIteration"), animationstart: Kr("Animation", "AnimationStart"), transitionend: Kr("Transition", "TransitionEnd") }, Lo = {}, Yc = {};
st && (Yc = document.createElement("div").style, "AnimationEvent" in window || (delete sn.animationend.animation, delete sn.animationiteration.animation, delete sn.animationstart.animation), "TransitionEvent" in window || delete sn.transitionend.transition);
function bi(t) {
  if (Lo[t])
    return Lo[t];
  if (!sn[t])
    return t;
  var e = sn[t], n;
  for (n in e)
    if (e.hasOwnProperty(n) && n in Yc)
      return Lo[t] = e[n];
  return t;
}
var Xc = bi("animationend"), Gc = bi("animationiteration"), Zc = bi("animationstart"), qc = bi("transitionend"), bc = /* @__PURE__ */ new Map(), Bu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function zt(t, e) {
  bc.set(t, e), qt(e, [t]);
}
for (var Ao = 0; Ao < Bu.length; Ao++) {
  var Do = Bu[Ao], e0 = Do.toLowerCase(), t0 = Do[0].toUpperCase() + Do.slice(1);
  zt(e0, "on" + t0);
}
zt(Xc, "onAnimationEnd");
zt(Gc, "onAnimationIteration");
zt(Zc, "onAnimationStart");
zt("dblclick", "onDoubleClick");
zt("focusin", "onFocus");
zt("focusout", "onBlur");
zt(qc, "onTransitionEnd");
En("onMouseEnter", ["mouseout", "mouseover"]);
En("onMouseLeave", ["mouseout", "mouseover"]);
En("onPointerEnter", ["pointerout", "pointerover"]);
En("onPointerLeave", ["pointerout", "pointerover"]);
qt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
qt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
qt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
qt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
qt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
qt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Gn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), n0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Gn));
function $u(t, e, n) {
  var r = t.type || "unknown-event";
  t.currentTarget = n, em(r, e, void 0, t), t.currentTarget = null;
}
function ef(t, e) {
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
          $u(i, s, a), o = u;
        }
      else
        for (l = 0; l < r.length; l++) {
          if (s = r[l], u = s.instance, a = s.currentTarget, s = s.listener, u !== o && i.isPropagationStopped())
            break e;
          $u(i, s, a), o = u;
        }
    }
  }
  if (Ni)
    throw t = ml, Ni = !1, ml = null, t;
}
function j(t, e) {
  var n = e[Nl];
  n === void 0 && (n = e[Nl] = /* @__PURE__ */ new Set());
  var r = t + "__bubble";
  n.has(r) || (tf(e, t, 2, !1), n.add(r));
}
function Bo(t, e, n) {
  var r = 0;
  e && (r |= 4), tf(n, t, r, e);
}
var Yr = "_reactListening" + Math.random().toString(36).slice(2);
function vr(t) {
  if (!t[Yr]) {
    t[Yr] = !0, uc.forEach(function(n) {
      n !== "selectionchange" && (n0.has(n) || Bo(n, !1, t), Bo(n, !0, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[Yr] || (e[Yr] = !0, Bo("selectionchange", !1, e));
  }
}
function tf(t, e, n, r) {
  switch (Bc(e)) {
    case 1:
      var i = gm;
      break;
    case 4:
      i = ym;
      break;
    default:
      i = ms;
  }
  n = i.bind(null, e, n, t), i = void 0, !hl || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (i = !0), r ? i !== void 0 ? t.addEventListener(e, n, { capture: !0, passive: i }) : t.addEventListener(e, n, !0) : i !== void 0 ? t.addEventListener(e, n, { passive: i }) : t.addEventListener(e, n, !1);
}
function $o(t, e, n, r, i) {
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
            if (l = Vt(s), l === null)
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
  Cc(function() {
    var a = o, c = fs(n), f = [];
    e: {
      var d = bc.get(t);
      if (d !== void 0) {
        var g = ys, y = t;
        switch (t) {
          case "keypress":
            if (ui(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            g = Om;
            break;
          case "focusin":
            y = "focus", g = Oo;
            break;
          case "focusout":
            y = "blur", g = Oo;
            break;
          case "beforeblur":
          case "afterblur":
            g = Oo;
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
            g = Tu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = km;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Lm;
            break;
          case Xc:
          case Gc:
          case Zc:
            g = Em;
            break;
          case qc:
            g = Dm;
            break;
          case "scroll":
            g = vm;
            break;
          case "wheel":
            g = $m;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Nm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Pu;
        }
        var v = (e & 4) !== 0, x = !v && t === "scroll", h = v ? d !== null ? d + "Capture" : null : d;
        v = [];
        for (var p = a, m; p !== null; ) {
          m = p;
          var w = m.stateNode;
          if (m.tag === 5 && w !== null && (m = w, h !== null && (w = dr(p, h), w != null && v.push(wr(p, w, m)))), x)
            break;
          p = p.return;
        }
        0 < v.length && (d = new g(d, y, null, n, c), f.push({ event: d, listeners: v }));
      }
    }
    if (!(e & 7)) {
      e: {
        if (d = t === "mouseover" || t === "pointerover", g = t === "mouseout" || t === "pointerout", d && n !== dl && (y = n.relatedTarget || n.fromElement) && (Vt(y) || y[ut]))
          break e;
        if ((g || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, g ? (y = n.relatedTarget || n.toElement, g = a, y = y ? Vt(y) : null, y !== null && (x = bt(y), y !== x || y.tag !== 5 && y.tag !== 6) && (y = null)) : (g = null, y = a), g !== y)) {
          if (v = Tu, w = "onMouseLeave", h = "onMouseEnter", p = "mouse", (t === "pointerout" || t === "pointerover") && (v = Pu, w = "onPointerLeave", h = "onPointerEnter", p = "pointer"), x = g == null ? d : un(g), m = y == null ? d : un(y), d = new v(w, p + "leave", g, n, c), d.target = x, d.relatedTarget = m, w = null, Vt(c) === a && (v = new v(h, p + "enter", y, n, c), v.target = m, v.relatedTarget = x, w = v), x = w, g && y)
            t: {
              for (v = g, h = y, p = 0, m = v; m; m = en(m))
                p++;
              for (m = 0, w = h; w; w = en(w))
                m++;
              for (; 0 < p - m; )
                v = en(v), p--;
              for (; 0 < m - p; )
                h = en(h), m--;
              for (; p--; ) {
                if (v === h || h !== null && v === h.alternate)
                  break t;
                v = en(v), h = en(h);
              }
              v = null;
            }
          else
            v = null;
          g !== null && ju(f, d, g, v, !1), y !== null && x !== null && ju(f, x, y, v, !0);
        }
      }
      e: {
        if (d = a ? un(a) : window, g = d.nodeName && d.nodeName.toLowerCase(), g === "select" || g === "input" && d.type === "file")
          var S = Qm;
        else if (Ou(d))
          if (Hc)
            S = Gm;
          else {
            S = Ym;
            var E = Km;
          }
        else
          (g = d.nodeName) && g.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (S = Xm);
        if (S && (S = S(t, a))) {
          Wc(f, S, n, c);
          break e;
        }
        E && E(t, d, a), t === "focusout" && (E = d._wrapperState) && E.controlled && d.type === "number" && sl(d, "number", d.value);
      }
      switch (E = a ? un(a) : window, t) {
        case "focusin":
          (Ou(E) || E.contentEditable === "true") && (ln = E, wl = a, rr = null);
          break;
        case "focusout":
          rr = wl = ln = null;
          break;
        case "mousedown":
          kl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          kl = !1, Du(f, n, c);
          break;
        case "selectionchange":
          if (bm)
            break;
        case "keydown":
        case "keyup":
          Du(f, n, c);
      }
      var C;
      if (ws)
        e: {
          switch (t) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        on ? Vc(t, n) && (T = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T && (jc && n.locale !== "ko" && (on || T !== "onCompositionStart" ? T === "onCompositionEnd" && on && (C = $c()) : (yt = c, gs = "value" in yt ? yt.value : yt.textContent, on = !0)), E = zi(a, T), 0 < E.length && (T = new _u(T, t, null, n, c), f.push({ event: T, listeners: E }), C ? T.data = C : (C = Uc(n), C !== null && (T.data = C)))), (C = Vm ? Um(t, n) : Wm(t, n)) && (a = zi(a, "onBeforeInput"), 0 < a.length && (c = new _u("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: a }), c.data = C));
    }
    ef(f, e);
  });
}
function wr(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function zi(t, e) {
  for (var n = e + "Capture", r = []; t !== null; ) {
    var i = t, o = i.stateNode;
    i.tag === 5 && o !== null && (i = o, o = dr(t, n), o != null && r.unshift(wr(t, o, i)), o = dr(t, e), o != null && r.push(wr(t, o, i))), t = t.return;
  }
  return r;
}
function en(t) {
  if (t === null)
    return null;
  do
    t = t.return;
  while (t && t.tag !== 5);
  return t || null;
}
function ju(t, e, n, r, i) {
  for (var o = e._reactName, l = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, a = s.stateNode;
    if (u !== null && u === r)
      break;
    s.tag === 5 && a !== null && (s = a, i ? (u = dr(n, o), u != null && l.unshift(wr(n, u, s))) : i || (u = dr(n, o), u != null && l.push(wr(n, u, s)))), n = n.return;
  }
  l.length !== 0 && t.push({ event: e, listeners: l });
}
var r0 = /\r\n?/g, i0 = /\u0000|\uFFFD/g;
function Vu(t) {
  return (typeof t == "string" ? t : "" + t).replace(r0, `
`).replace(i0, "");
}
function Xr(t, e, n) {
  if (e = Vu(e), Vu(t) !== e && n)
    throw Error(k(425));
}
function Ii() {
}
var Sl = null, xl = null;
function El(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var Cl = typeof setTimeout == "function" ? setTimeout : void 0, o0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Uu = typeof Promise == "function" ? Promise : void 0, l0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Uu < "u" ? function(t) {
  return Uu.resolve(null).then(t).catch(s0);
} : Cl;
function s0(t) {
  setTimeout(function() {
    throw t;
  });
}
function jo(t, e) {
  var n = e, r = 0;
  do {
    var i = n.nextSibling;
    if (t.removeChild(n), i && i.nodeType === 8)
      if (n = i.data, n === "/$") {
        if (r === 0) {
          t.removeChild(i), mr(e);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = i;
  } while (n);
  mr(e);
}
function xt(t) {
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
function Wu(t) {
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
var Fn = Math.random().toString(36).slice(2), Ze = "__reactFiber$" + Fn, kr = "__reactProps$" + Fn, ut = "__reactContainer$" + Fn, Nl = "__reactEvents$" + Fn, u0 = "__reactListeners$" + Fn, a0 = "__reactHandles$" + Fn;
function Vt(t) {
  var e = t[Ze];
  if (e)
    return e;
  for (var n = t.parentNode; n; ) {
    if (e = n[ut] || n[Ze]) {
      if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
        for (t = Wu(t); t !== null; ) {
          if (n = t[Ze])
            return n;
          t = Wu(t);
        }
      return e;
    }
    t = n, n = t.parentNode;
  }
  return null;
}
function Or(t) {
  return t = t[Ze] || t[ut], !t || t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3 ? null : t;
}
function un(t) {
  if (t.tag === 5 || t.tag === 6)
    return t.stateNode;
  throw Error(k(33));
}
function eo(t) {
  return t[kr] || null;
}
var Ml = [], an = -1;
function It(t) {
  return { current: t };
}
function V(t) {
  0 > an || (t.current = Ml[an], Ml[an] = null, an--);
}
function $(t, e) {
  an++, Ml[an] = t.current, t.current = e;
}
var _t = {}, de = It(_t), Se = It(!1), Qt = _t;
function Cn(t, e) {
  var n = t.type.contextTypes;
  if (!n)
    return _t;
  var r = t.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === e)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {}, o;
  for (o in n)
    i[o] = e[o];
  return r && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = e, t.__reactInternalMemoizedMaskedChildContext = i), i;
}
function xe(t) {
  return t = t.childContextTypes, t != null;
}
function Oi() {
  V(Se), V(de);
}
function Hu(t, e, n) {
  if (de.current !== _t)
    throw Error(k(168));
  $(de, e), $(Se, n);
}
function nf(t, e, n) {
  var r = t.stateNode;
  if (e = e.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var i in r)
    if (!(i in e))
      throw Error(k(108, Kh(t) || "Unknown", i));
  return Q({}, n, r);
}
function Ri(t) {
  return t = (t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext || _t, Qt = de.current, $(de, t), $(Se, Se.current), !0;
}
function Ju(t, e, n) {
  var r = t.stateNode;
  if (!r)
    throw Error(k(169));
  n ? (t = nf(t, e, Qt), r.__reactInternalMemoizedMergedChildContext = t, V(Se), V(de), $(de, t)) : V(Se), $(Se, n);
}
var nt = null, to = !1, Vo = !1;
function rf(t) {
  nt === null ? nt = [t] : nt.push(t);
}
function c0(t) {
  to = !0, rf(t);
}
function Ot() {
  if (!Vo && nt !== null) {
    Vo = !0;
    var t = 0, e = A;
    try {
      var n = nt;
      for (A = 1; t < n.length; t++) {
        var r = n[t];
        do
          r = r(!0);
        while (r !== null);
      }
      nt = null, to = !1;
    } catch (i) {
      throw nt !== null && (nt = nt.slice(t + 1)), _c(ds, Ot), i;
    } finally {
      A = e, Vo = !1;
    }
  }
  return null;
}
var cn = [], fn = 0, Fi = null, Li = 0, Fe = [], Le = 0, Kt = null, rt = 1, it = "";
function Lt(t, e) {
  cn[fn++] = Li, cn[fn++] = Fi, Fi = t, Li = e;
}
function of(t, e, n) {
  Fe[Le++] = rt, Fe[Le++] = it, Fe[Le++] = Kt, Kt = t;
  var r = rt;
  t = it;
  var i = 32 - Qe(r) - 1;
  r &= ~(1 << i), n += 1;
  var o = 32 - Qe(e) + i;
  if (30 < o) {
    var l = i - i % 5;
    o = (r & (1 << l) - 1).toString(32), r >>= l, i -= l, rt = 1 << 32 - Qe(e) + i | n << i | r, it = o + t;
  } else
    rt = 1 << o | n << i | r, it = t;
}
function Ss(t) {
  t.return !== null && (Lt(t, 1), of(t, 1, 0));
}
function xs(t) {
  for (; t === Fi; )
    Fi = cn[--fn], cn[fn] = null, Li = cn[--fn], cn[fn] = null;
  for (; t === Kt; )
    Kt = Fe[--Le], Fe[Le] = null, it = Fe[--Le], Fe[Le] = null, rt = Fe[--Le], Fe[Le] = null;
}
var ze = null, Pe = null, U = !1, He = null;
function lf(t, e) {
  var n = Ae(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = e, n.return = t, e = t.deletions, e === null ? (t.deletions = [n], t.flags |= 16) : e.push(n);
}
function Qu(t, e) {
  switch (t.tag) {
    case 5:
      var n = t.type;
      return e = e.nodeType !== 1 || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e, e !== null ? (t.stateNode = e, ze = t, Pe = xt(e.firstChild), !0) : !1;
    case 6:
      return e = t.pendingProps === "" || e.nodeType !== 3 ? null : e, e !== null ? (t.stateNode = e, ze = t, Pe = null, !0) : !1;
    case 13:
      return e = e.nodeType !== 8 ? null : e, e !== null ? (n = Kt !== null ? { id: rt, overflow: it } : null, t.memoizedState = { dehydrated: e, treeContext: n, retryLane: 1073741824 }, n = Ae(18, null, null, 0), n.stateNode = e, n.return = t, t.child = n, ze = t, Pe = null, !0) : !1;
    default:
      return !1;
  }
}
function Tl(t) {
  return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
}
function _l(t) {
  if (U) {
    var e = Pe;
    if (e) {
      var n = e;
      if (!Qu(t, e)) {
        if (Tl(t))
          throw Error(k(418));
        e = xt(n.nextSibling);
        var r = ze;
        e && Qu(t, e) ? lf(r, n) : (t.flags = t.flags & -4097 | 2, U = !1, ze = t);
      }
    } else {
      if (Tl(t))
        throw Error(k(418));
      t.flags = t.flags & -4097 | 2, U = !1, ze = t;
    }
  }
}
function Ku(t) {
  for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13; )
    t = t.return;
  ze = t;
}
function Gr(t) {
  if (t !== ze)
    return !1;
  if (!U)
    return Ku(t), U = !0, !1;
  var e;
  if ((e = t.tag !== 3) && !(e = t.tag !== 5) && (e = t.type, e = e !== "head" && e !== "body" && !El(t.type, t.memoizedProps)), e && (e = Pe)) {
    if (Tl(t))
      throw sf(), Error(k(418));
    for (; e; )
      lf(t, e), e = xt(e.nextSibling);
  }
  if (Ku(t), t.tag === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t)
      throw Error(k(317));
    e: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "/$") {
            if (e === 0) {
              Pe = xt(t.nextSibling);
              break e;
            }
            e--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || e++;
        }
        t = t.nextSibling;
      }
      Pe = null;
    }
  } else
    Pe = ze ? xt(t.stateNode.nextSibling) : null;
  return !0;
}
function sf() {
  for (var t = Pe; t; )
    t = xt(t.nextSibling);
}
function Nn() {
  Pe = ze = null, U = !1;
}
function Es(t) {
  He === null ? He = [t] : He.push(t);
}
var f0 = ft.ReactCurrentBatchConfig;
function Un(t, e, n) {
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
function Zr(t, e) {
  throw t = Object.prototype.toString.call(e), Error(k(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
}
function Yu(t) {
  var e = t._init;
  return e(t._payload);
}
function uf(t) {
  function e(h, p) {
    if (t) {
      var m = h.deletions;
      m === null ? (h.deletions = [p], h.flags |= 16) : m.push(p);
    }
  }
  function n(h, p) {
    if (!t)
      return null;
    for (; p !== null; )
      e(h, p), p = p.sibling;
    return null;
  }
  function r(h, p) {
    for (h = /* @__PURE__ */ new Map(); p !== null; )
      p.key !== null ? h.set(p.key, p) : h.set(p.index, p), p = p.sibling;
    return h;
  }
  function i(h, p) {
    return h = Mt(h, p), h.index = 0, h.sibling = null, h;
  }
  function o(h, p, m) {
    return h.index = m, t ? (m = h.alternate, m !== null ? (m = m.index, m < p ? (h.flags |= 2, p) : m) : (h.flags |= 2, p)) : (h.flags |= 1048576, p);
  }
  function l(h) {
    return t && h.alternate === null && (h.flags |= 2), h;
  }
  function s(h, p, m, w) {
    return p === null || p.tag !== 6 ? (p = Yo(m, h.mode, w), p.return = h, p) : (p = i(p, m), p.return = h, p);
  }
  function u(h, p, m, w) {
    var S = m.type;
    return S === rn ? c(h, p, m.props.children, w, m.key) : p !== null && (p.elementType === S || typeof S == "object" && S !== null && S.$$typeof === pt && Yu(S) === p.type) ? (w = i(p, m.props), w.ref = Un(h, p, m), w.return = h, w) : (w = mi(m.type, m.key, m.props, null, h.mode, w), w.ref = Un(h, p, m), w.return = h, w);
  }
  function a(h, p, m, w) {
    return p === null || p.tag !== 4 || p.stateNode.containerInfo !== m.containerInfo || p.stateNode.implementation !== m.implementation ? (p = Xo(m, h.mode, w), p.return = h, p) : (p = i(p, m.children || []), p.return = h, p);
  }
  function c(h, p, m, w, S) {
    return p === null || p.tag !== 7 ? (p = Jt(m, h.mode, w, S), p.return = h, p) : (p = i(p, m), p.return = h, p);
  }
  function f(h, p, m) {
    if (typeof p == "string" && p !== "" || typeof p == "number")
      return p = Yo("" + p, h.mode, m), p.return = h, p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case jr:
          return m = mi(p.type, p.key, p.props, null, h.mode, m), m.ref = Un(h, null, p), m.return = h, m;
        case nn:
          return p = Xo(p, h.mode, m), p.return = h, p;
        case pt:
          var w = p._init;
          return f(h, w(p._payload), m);
      }
      if (Yn(p) || Dn(p))
        return p = Jt(p, h.mode, m, null), p.return = h, p;
      Zr(h, p);
    }
    return null;
  }
  function d(h, p, m, w) {
    var S = p !== null ? p.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number")
      return S !== null ? null : s(h, p, "" + m, w);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case jr:
          return m.key === S ? u(h, p, m, w) : null;
        case nn:
          return m.key === S ? a(h, p, m, w) : null;
        case pt:
          return S = m._init, d(
            h,
            p,
            S(m._payload),
            w
          );
      }
      if (Yn(m) || Dn(m))
        return S !== null ? null : c(h, p, m, w, null);
      Zr(h, m);
    }
    return null;
  }
  function g(h, p, m, w, S) {
    if (typeof w == "string" && w !== "" || typeof w == "number")
      return h = h.get(m) || null, s(p, h, "" + w, S);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case jr:
          return h = h.get(w.key === null ? m : w.key) || null, u(p, h, w, S);
        case nn:
          return h = h.get(w.key === null ? m : w.key) || null, a(p, h, w, S);
        case pt:
          var E = w._init;
          return g(h, p, m, E(w._payload), S);
      }
      if (Yn(w) || Dn(w))
        return h = h.get(m) || null, c(p, h, w, S, null);
      Zr(p, w);
    }
    return null;
  }
  function y(h, p, m, w) {
    for (var S = null, E = null, C = p, T = p = 0, Y = null; C !== null && T < m.length; T++) {
      C.index > T ? (Y = C, C = null) : Y = C.sibling;
      var F = d(h, C, m[T], w);
      if (F === null) {
        C === null && (C = Y);
        break;
      }
      t && C && F.alternate === null && e(h, C), p = o(F, p, T), E === null ? S = F : E.sibling = F, E = F, C = Y;
    }
    if (T === m.length)
      return n(h, C), U && Lt(h, T), S;
    if (C === null) {
      for (; T < m.length; T++)
        C = f(h, m[T], w), C !== null && (p = o(C, p, T), E === null ? S = C : E.sibling = C, E = C);
      return U && Lt(h, T), S;
    }
    for (C = r(h, C); T < m.length; T++)
      Y = g(C, h, T, m[T], w), Y !== null && (t && Y.alternate !== null && C.delete(Y.key === null ? T : Y.key), p = o(Y, p, T), E === null ? S = Y : E.sibling = Y, E = Y);
    return t && C.forEach(function(je) {
      return e(h, je);
    }), U && Lt(h, T), S;
  }
  function v(h, p, m, w) {
    var S = Dn(m);
    if (typeof S != "function")
      throw Error(k(150));
    if (m = S.call(m), m == null)
      throw Error(k(151));
    for (var E = S = null, C = p, T = p = 0, Y = null, F = m.next(); C !== null && !F.done; T++, F = m.next()) {
      C.index > T ? (Y = C, C = null) : Y = C.sibling;
      var je = d(h, C, F.value, w);
      if (je === null) {
        C === null && (C = Y);
        break;
      }
      t && C && je.alternate === null && e(h, C), p = o(je, p, T), E === null ? S = je : E.sibling = je, E = je, C = Y;
    }
    if (F.done)
      return n(
        h,
        C
      ), U && Lt(h, T), S;
    if (C === null) {
      for (; !F.done; T++, F = m.next())
        F = f(h, F.value, w), F !== null && (p = o(F, p, T), E === null ? S = F : E.sibling = F, E = F);
      return U && Lt(h, T), S;
    }
    for (C = r(h, C); !F.done; T++, F = m.next())
      F = g(C, h, T, F.value, w), F !== null && (t && F.alternate !== null && C.delete(F.key === null ? T : F.key), p = o(F, p, T), E === null ? S = F : E.sibling = F, E = F);
    return t && C.forEach(function(Ln) {
      return e(h, Ln);
    }), U && Lt(h, T), S;
  }
  function x(h, p, m, w) {
    if (typeof m == "object" && m !== null && m.type === rn && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case jr:
          e: {
            for (var S = m.key, E = p; E !== null; ) {
              if (E.key === S) {
                if (S = m.type, S === rn) {
                  if (E.tag === 7) {
                    n(h, E.sibling), p = i(E, m.props.children), p.return = h, h = p;
                    break e;
                  }
                } else if (E.elementType === S || typeof S == "object" && S !== null && S.$$typeof === pt && Yu(S) === E.type) {
                  n(h, E.sibling), p = i(E, m.props), p.ref = Un(h, E, m), p.return = h, h = p;
                  break e;
                }
                n(h, E);
                break;
              } else
                e(h, E);
              E = E.sibling;
            }
            m.type === rn ? (p = Jt(m.props.children, h.mode, w, m.key), p.return = h, h = p) : (w = mi(m.type, m.key, m.props, null, h.mode, w), w.ref = Un(h, p, m), w.return = h, h = w);
          }
          return l(h);
        case nn:
          e: {
            for (E = m.key; p !== null; ) {
              if (p.key === E)
                if (p.tag === 4 && p.stateNode.containerInfo === m.containerInfo && p.stateNode.implementation === m.implementation) {
                  n(h, p.sibling), p = i(p, m.children || []), p.return = h, h = p;
                  break e;
                } else {
                  n(h, p);
                  break;
                }
              else
                e(h, p);
              p = p.sibling;
            }
            p = Xo(m, h.mode, w), p.return = h, h = p;
          }
          return l(h);
        case pt:
          return E = m._init, x(h, p, E(m._payload), w);
      }
      if (Yn(m))
        return y(h, p, m, w);
      if (Dn(m))
        return v(h, p, m, w);
      Zr(h, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, p !== null && p.tag === 6 ? (n(h, p.sibling), p = i(p, m), p.return = h, h = p) : (n(h, p), p = Yo(m, h.mode, w), p.return = h, h = p), l(h)) : n(h, p);
  }
  return x;
}
var Mn = uf(!0), af = uf(!1), Ai = It(null), Di = null, dn = null, Cs = null;
function Ns() {
  Cs = dn = Di = null;
}
function Ms(t) {
  var e = Ai.current;
  V(Ai), t._currentValue = e;
}
function Pl(t, e, n) {
  for (; t !== null; ) {
    var r = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, r !== null && (r.childLanes |= e)) : r !== null && (r.childLanes & e) !== e && (r.childLanes |= e), t === n)
      break;
    t = t.return;
  }
}
function kn(t, e) {
  Di = t, Cs = dn = null, t = t.dependencies, t !== null && t.firstContext !== null && (t.lanes & e && (we = !0), t.firstContext = null);
}
function Be(t) {
  var e = t._currentValue;
  if (Cs !== t)
    if (t = { context: t, memoizedValue: e, next: null }, dn === null) {
      if (Di === null)
        throw Error(k(308));
      dn = t, Di.dependencies = { lanes: 0, firstContext: t };
    } else
      dn = dn.next = t;
  return e;
}
var Ut = null;
function Ts(t) {
  Ut === null ? Ut = [t] : Ut.push(t);
}
function cf(t, e, n, r) {
  var i = e.interleaved;
  return i === null ? (n.next = n, Ts(e)) : (n.next = i.next, i.next = n), e.interleaved = n, at(t, r);
}
function at(t, e) {
  t.lanes |= e;
  var n = t.alternate;
  for (n !== null && (n.lanes |= e), n = t, t = t.return; t !== null; )
    t.childLanes |= e, n = t.alternate, n !== null && (n.childLanes |= e), n = t, t = t.return;
  return n.tag === 3 ? n.stateNode : null;
}
var ht = !1;
function _s(t) {
  t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function ff(t, e) {
  t = t.updateQueue, e.updateQueue === t && (e.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, effects: t.effects });
}
function ot(t, e) {
  return { eventTime: t, lane: e, tag: 0, payload: null, callback: null, next: null };
}
function Et(t, e, n) {
  var r = t.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, L & 2) {
    var i = r.pending;
    return i === null ? e.next = e : (e.next = i.next, i.next = e), r.pending = e, at(t, n);
  }
  return i = r.interleaved, i === null ? (e.next = e, Ts(r)) : (e.next = i.next, i.next = e), r.interleaved = e, at(t, n);
}
function ai(t, e, n) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194240) !== 0)) {
    var r = e.lanes;
    r &= t.pendingLanes, n |= r, e.lanes = n, ps(t, n);
  }
}
function Xu(t, e) {
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
function Bi(t, e, n, r) {
  var i = t.updateQueue;
  ht = !1;
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
      var d = s.lane, g = s.eventTime;
      if ((r & d) === d) {
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
          switch (d = e, g = n, v.tag) {
            case 1:
              if (y = v.payload, typeof y == "function") {
                f = y.call(g, f, d);
                break e;
              }
              f = y;
              break e;
            case 3:
              y.flags = y.flags & -65537 | 128;
            case 0:
              if (y = v.payload, d = typeof y == "function" ? y.call(g, f, d) : y, d == null)
                break e;
              f = Q({}, f, d);
              break e;
            case 2:
              ht = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (t.flags |= 64, d = i.effects, d === null ? i.effects = [s] : d.push(s));
      } else
        g = { eventTime: g, lane: d, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, c === null ? (a = c = g, u = f) : c = c.next = g, l |= d;
      if (s = s.next, s === null) {
        if (s = i.shared.pending, s === null)
          break;
        d = s, s = d.next, d.next = null, i.lastBaseUpdate = d, i.shared.pending = null;
      }
    } while (!0);
    if (c === null && (u = f), i.baseState = u, i.firstBaseUpdate = a, i.lastBaseUpdate = c, e = i.shared.interleaved, e !== null) {
      i = e;
      do
        l |= i.lane, i = i.next;
      while (i !== e);
    } else
      o === null && (i.shared.lanes = 0);
    Xt |= l, t.lanes = l, t.memoizedState = f;
  }
}
function Gu(t, e, n) {
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
var Rr = {}, et = It(Rr), Sr = It(Rr), xr = It(Rr);
function Wt(t) {
  if (t === Rr)
    throw Error(k(174));
  return t;
}
function Ps(t, e) {
  switch ($(xr, e), $(Sr, t), $(et, Rr), t = e.nodeType, t) {
    case 9:
    case 11:
      e = (e = e.documentElement) ? e.namespaceURI : al(null, "");
      break;
    default:
      t = t === 8 ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = al(e, t);
  }
  V(et), $(et, e);
}
function Tn() {
  V(et), V(Sr), V(xr);
}
function df(t) {
  Wt(xr.current);
  var e = Wt(et.current), n = al(e, t.type);
  e !== n && ($(Sr, t), $(et, n));
}
function zs(t) {
  Sr.current === t && (V(et), V(Sr));
}
var W = It(0);
function $i(t) {
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
var Uo = [];
function Is() {
  for (var t = 0; t < Uo.length; t++)
    Uo[t]._workInProgressVersionPrimary = null;
  Uo.length = 0;
}
var ci = ft.ReactCurrentDispatcher, Wo = ft.ReactCurrentBatchConfig, Yt = 0, J = null, b = null, ne = null, ji = !1, ir = !1, Er = 0, d0 = 0;
function ue() {
  throw Error(k(321));
}
function Os(t, e) {
  if (e === null)
    return !1;
  for (var n = 0; n < e.length && n < t.length; n++)
    if (!Ye(t[n], e[n]))
      return !1;
  return !0;
}
function Rs(t, e, n, r, i, o) {
  if (Yt = o, J = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, ci.current = t === null || t.memoizedState === null ? g0 : y0, t = n(r, i), ir) {
    o = 0;
    do {
      if (ir = !1, Er = 0, 25 <= o)
        throw Error(k(301));
      o += 1, ne = b = null, e.updateQueue = null, ci.current = v0, t = n(r, i);
    } while (ir);
  }
  if (ci.current = Vi, e = b !== null && b.next !== null, Yt = 0, ne = b = J = null, ji = !1, e)
    throw Error(k(300));
  return t;
}
function Fs() {
  var t = Er !== 0;
  return Er = 0, t;
}
function Ge() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ne === null ? J.memoizedState = ne = t : ne = ne.next = t, ne;
}
function $e() {
  if (b === null) {
    var t = J.alternate;
    t = t !== null ? t.memoizedState : null;
  } else
    t = b.next;
  var e = ne === null ? J.memoizedState : ne.next;
  if (e !== null)
    ne = e, b = t;
  else {
    if (t === null)
      throw Error(k(310));
    b = t, t = { memoizedState: b.memoizedState, baseState: b.baseState, baseQueue: b.baseQueue, queue: b.queue, next: null }, ne === null ? J.memoizedState = ne = t : ne = ne.next = t;
  }
  return ne;
}
function Cr(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Ho(t) {
  var e = $e(), n = e.queue;
  if (n === null)
    throw Error(k(311));
  n.lastRenderedReducer = t;
  var r = b, i = r.baseQueue, o = n.pending;
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
      if ((Yt & c) === c)
        u !== null && (u = u.next = { lane: 0, action: a.action, hasEagerState: a.hasEagerState, eagerState: a.eagerState, next: null }), r = a.hasEagerState ? a.eagerState : t(r, a.action);
      else {
        var f = {
          lane: c,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null
        };
        u === null ? (s = u = f, l = r) : u = u.next = f, J.lanes |= c, Xt |= c;
      }
      a = a.next;
    } while (a !== null && a !== o);
    u === null ? l = r : u.next = s, Ye(r, e.memoizedState) || (we = !0), e.memoizedState = r, e.baseState = l, e.baseQueue = u, n.lastRenderedState = r;
  }
  if (t = n.interleaved, t !== null) {
    i = t;
    do
      o = i.lane, J.lanes |= o, Xt |= o, i = i.next;
    while (i !== t);
  } else
    i === null && (n.lanes = 0);
  return [e.memoizedState, n.dispatch];
}
function Jo(t) {
  var e = $e(), n = e.queue;
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
    Ye(o, e.memoizedState) || (we = !0), e.memoizedState = o, e.baseQueue === null && (e.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function pf() {
}
function hf(t, e) {
  var n = J, r = $e(), i = e(), o = !Ye(r.memoizedState, i);
  if (o && (r.memoizedState = i, we = !0), r = r.queue, Ls(yf.bind(null, n, r, t), [t]), r.getSnapshot !== e || o || ne !== null && ne.memoizedState.tag & 1) {
    if (n.flags |= 2048, Nr(9, gf.bind(null, n, r, i, e), void 0, null), ie === null)
      throw Error(k(349));
    Yt & 30 || mf(n, e, i);
  }
  return i;
}
function mf(t, e, n) {
  t.flags |= 16384, t = { getSnapshot: e, value: n }, e = J.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, J.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
}
function gf(t, e, n, r) {
  e.value = n, e.getSnapshot = r, vf(e) && wf(t);
}
function yf(t, e, n) {
  return n(function() {
    vf(e) && wf(t);
  });
}
function vf(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Ye(t, n);
  } catch {
    return !0;
  }
}
function wf(t) {
  var e = at(t, 1);
  e !== null && Ke(e, t, 1, -1);
}
function Zu(t) {
  var e = Ge();
  return typeof t == "function" && (t = t()), e.memoizedState = e.baseState = t, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Cr, lastRenderedState: t }, e.queue = t, t = t.dispatch = m0.bind(null, J, t), [e.memoizedState, t];
}
function Nr(t, e, n, r) {
  return t = { tag: t, create: e, destroy: n, deps: r, next: null }, e = J.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, J.updateQueue = e, e.lastEffect = t.next = t) : (n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (r = n.next, n.next = t, t.next = r, e.lastEffect = t)), t;
}
function kf() {
  return $e().memoizedState;
}
function fi(t, e, n, r) {
  var i = Ge();
  J.flags |= t, i.memoizedState = Nr(1 | e, n, void 0, r === void 0 ? null : r);
}
function no(t, e, n, r) {
  var i = $e();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (b !== null) {
    var l = b.memoizedState;
    if (o = l.destroy, r !== null && Os(r, l.deps)) {
      i.memoizedState = Nr(e, n, o, r);
      return;
    }
  }
  J.flags |= t, i.memoizedState = Nr(1 | e, n, o, r);
}
function qu(t, e) {
  return fi(8390656, 8, t, e);
}
function Ls(t, e) {
  return no(2048, 8, t, e);
}
function Sf(t, e) {
  return no(4, 2, t, e);
}
function xf(t, e) {
  return no(4, 4, t, e);
}
function Ef(t, e) {
  if (typeof e == "function")
    return t = t(), e(t), function() {
      e(null);
    };
  if (e != null)
    return t = t(), e.current = t, function() {
      e.current = null;
    };
}
function Cf(t, e, n) {
  return n = n != null ? n.concat([t]) : null, no(4, 4, Ef.bind(null, e, t), n);
}
function As() {
}
function Nf(t, e) {
  var n = $e();
  e = e === void 0 ? null : e;
  var r = n.memoizedState;
  return r !== null && e !== null && Os(e, r[1]) ? r[0] : (n.memoizedState = [t, e], t);
}
function Mf(t, e) {
  var n = $e();
  e = e === void 0 ? null : e;
  var r = n.memoizedState;
  return r !== null && e !== null && Os(e, r[1]) ? r[0] : (t = t(), n.memoizedState = [t, e], t);
}
function Tf(t, e, n) {
  return Yt & 21 ? (Ye(n, e) || (n = Ic(), J.lanes |= n, Xt |= n, t.baseState = !0), e) : (t.baseState && (t.baseState = !1, we = !0), t.memoizedState = n);
}
function p0(t, e) {
  var n = A;
  A = n !== 0 && 4 > n ? n : 4, t(!0);
  var r = Wo.transition;
  Wo.transition = {};
  try {
    t(!1), e();
  } finally {
    A = n, Wo.transition = r;
  }
}
function _f() {
  return $e().memoizedState;
}
function h0(t, e, n) {
  var r = Nt(t);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Pf(t))
    zf(e, n);
  else if (n = cf(t, e, n, r), n !== null) {
    var i = me();
    Ke(n, t, r, i), If(n, e, r);
  }
}
function m0(t, e, n) {
  var r = Nt(t), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Pf(t))
    zf(e, i);
  else {
    var o = t.alternate;
    if (t.lanes === 0 && (o === null || o.lanes === 0) && (o = e.lastRenderedReducer, o !== null))
      try {
        var l = e.lastRenderedState, s = o(l, n);
        if (i.hasEagerState = !0, i.eagerState = s, Ye(s, l)) {
          var u = e.interleaved;
          u === null ? (i.next = i, Ts(e)) : (i.next = u.next, u.next = i), e.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
    n = cf(t, e, i, r), n !== null && (i = me(), Ke(n, t, r, i), If(n, e, r));
  }
}
function Pf(t) {
  var e = t.alternate;
  return t === J || e !== null && e === J;
}
function zf(t, e) {
  ir = ji = !0;
  var n = t.pending;
  n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
}
function If(t, e, n) {
  if (n & 4194240) {
    var r = e.lanes;
    r &= t.pendingLanes, n |= r, e.lanes = n, ps(t, n);
  }
}
var Vi = { readContext: Be, useCallback: ue, useContext: ue, useEffect: ue, useImperativeHandle: ue, useInsertionEffect: ue, useLayoutEffect: ue, useMemo: ue, useReducer: ue, useRef: ue, useState: ue, useDebugValue: ue, useDeferredValue: ue, useTransition: ue, useMutableSource: ue, useSyncExternalStore: ue, useId: ue, unstable_isNewReconciler: !1 }, g0 = { readContext: Be, useCallback: function(t, e) {
  return Ge().memoizedState = [t, e === void 0 ? null : e], t;
}, useContext: Be, useEffect: qu, useImperativeHandle: function(t, e, n) {
  return n = n != null ? n.concat([t]) : null, fi(
    4194308,
    4,
    Ef.bind(null, e, t),
    n
  );
}, useLayoutEffect: function(t, e) {
  return fi(4194308, 4, t, e);
}, useInsertionEffect: function(t, e) {
  return fi(4, 2, t, e);
}, useMemo: function(t, e) {
  var n = Ge();
  return e = e === void 0 ? null : e, t = t(), n.memoizedState = [t, e], t;
}, useReducer: function(t, e, n) {
  var r = Ge();
  return e = n !== void 0 ? n(e) : e, r.memoizedState = r.baseState = e, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: e }, r.queue = t, t = t.dispatch = h0.bind(null, J, t), [r.memoizedState, t];
}, useRef: function(t) {
  var e = Ge();
  return t = { current: t }, e.memoizedState = t;
}, useState: Zu, useDebugValue: As, useDeferredValue: function(t) {
  return Ge().memoizedState = t;
}, useTransition: function() {
  var t = Zu(!1), e = t[0];
  return t = p0.bind(null, t[1]), Ge().memoizedState = t, [e, t];
}, useMutableSource: function() {
}, useSyncExternalStore: function(t, e, n) {
  var r = J, i = Ge();
  if (U) {
    if (n === void 0)
      throw Error(k(407));
    n = n();
  } else {
    if (n = e(), ie === null)
      throw Error(k(349));
    Yt & 30 || mf(r, e, n);
  }
  i.memoizedState = n;
  var o = { value: n, getSnapshot: e };
  return i.queue = o, qu(yf.bind(
    null,
    r,
    o,
    t
  ), [t]), r.flags |= 2048, Nr(9, gf.bind(null, r, o, n, e), void 0, null), n;
}, useId: function() {
  var t = Ge(), e = ie.identifierPrefix;
  if (U) {
    var n = it, r = rt;
    n = (r & ~(1 << 32 - Qe(r) - 1)).toString(32) + n, e = ":" + e + "R" + n, n = Er++, 0 < n && (e += "H" + n.toString(32)), e += ":";
  } else
    n = d0++, e = ":" + e + "r" + n.toString(32) + ":";
  return t.memoizedState = e;
}, unstable_isNewReconciler: !1 }, y0 = {
  readContext: Be,
  useCallback: Nf,
  useContext: Be,
  useEffect: Ls,
  useImperativeHandle: Cf,
  useInsertionEffect: Sf,
  useLayoutEffect: xf,
  useMemo: Mf,
  useReducer: Ho,
  useRef: kf,
  useState: function() {
    return Ho(Cr);
  },
  useDebugValue: As,
  useDeferredValue: function(t) {
    var e = $e();
    return Tf(e, b.memoizedState, t);
  },
  useTransition: function() {
    var t = Ho(Cr)[0], e = $e().memoizedState;
    return [t, e];
  },
  useMutableSource: pf,
  useSyncExternalStore: hf,
  useId: _f,
  unstable_isNewReconciler: !1
}, v0 = { readContext: Be, useCallback: Nf, useContext: Be, useEffect: Ls, useImperativeHandle: Cf, useInsertionEffect: Sf, useLayoutEffect: xf, useMemo: Mf, useReducer: Jo, useRef: kf, useState: function() {
  return Jo(Cr);
}, useDebugValue: As, useDeferredValue: function(t) {
  var e = $e();
  return b === null ? e.memoizedState = t : Tf(e, b.memoizedState, t);
}, useTransition: function() {
  var t = Jo(Cr)[0], e = $e().memoizedState;
  return [t, e];
}, useMutableSource: pf, useSyncExternalStore: hf, useId: _f, unstable_isNewReconciler: !1 };
function Ue(t, e) {
  if (t && t.defaultProps) {
    e = Q({}, e), t = t.defaultProps;
    for (var n in t)
      e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function zl(t, e, n, r) {
  e = t.memoizedState, n = n(r, e), n = n == null ? e : Q({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
}
var ro = { isMounted: function(t) {
  return (t = t._reactInternals) ? bt(t) === t : !1;
}, enqueueSetState: function(t, e, n) {
  t = t._reactInternals;
  var r = me(), i = Nt(t), o = ot(r, i);
  o.payload = e, n != null && (o.callback = n), e = Et(t, o, i), e !== null && (Ke(e, t, i, r), ai(e, t, i));
}, enqueueReplaceState: function(t, e, n) {
  t = t._reactInternals;
  var r = me(), i = Nt(t), o = ot(r, i);
  o.tag = 1, o.payload = e, n != null && (o.callback = n), e = Et(t, o, i), e !== null && (Ke(e, t, i, r), ai(e, t, i));
}, enqueueForceUpdate: function(t, e) {
  t = t._reactInternals;
  var n = me(), r = Nt(t), i = ot(n, r);
  i.tag = 2, e != null && (i.callback = e), e = Et(t, i, r), e !== null && (Ke(e, t, r, n), ai(e, t, r));
} };
function bu(t, e, n, r, i, o, l) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(r, o, l) : e.prototype && e.prototype.isPureReactComponent ? !yr(n, r) || !yr(i, o) : !0;
}
function Of(t, e, n) {
  var r = !1, i = _t, o = e.contextType;
  return typeof o == "object" && o !== null ? o = Be(o) : (i = xe(e) ? Qt : de.current, r = e.contextTypes, o = (r = r != null) ? Cn(t, i) : _t), e = new e(n, o), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = ro, t.stateNode = e, e._reactInternals = t, r && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = i, t.__reactInternalMemoizedMaskedChildContext = o), e;
}
function ea(t, e, n, r) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, r), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, r), e.state !== t && ro.enqueueReplaceState(e, e.state, null);
}
function Il(t, e, n, r) {
  var i = t.stateNode;
  i.props = n, i.state = t.memoizedState, i.refs = {}, _s(t);
  var o = e.contextType;
  typeof o == "object" && o !== null ? i.context = Be(o) : (o = xe(e) ? Qt : de.current, i.context = Cn(t, o)), i.state = t.memoizedState, o = e.getDerivedStateFromProps, typeof o == "function" && (zl(t, e, o, n), i.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (e = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), e !== i.state && ro.enqueueReplaceState(i, i.state, null), Bi(t, n, i, r), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308);
}
function _n(t, e) {
  try {
    var n = "", r = e;
    do
      n += Qh(r), r = r.return;
    while (r);
    var i = n;
  } catch (o) {
    i = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: t, source: e, stack: i, digest: null };
}
function Qo(t, e, n) {
  return { value: t, source: null, stack: n ?? null, digest: e ?? null };
}
function Ol(t, e) {
  try {
    console.error(e.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var w0 = typeof WeakMap == "function" ? WeakMap : Map;
function Rf(t, e, n) {
  n = ot(-1, n), n.tag = 3, n.payload = { element: null };
  var r = e.value;
  return n.callback = function() {
    Wi || (Wi = !0, Ul = r), Ol(t, e);
  }, n;
}
function Ff(t, e, n) {
  n = ot(-1, n), n.tag = 3;
  var r = t.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = e.value;
    n.payload = function() {
      return r(i);
    }, n.callback = function() {
      Ol(t, e);
    };
  }
  var o = t.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Ol(t, e), typeof r != "function" && (Ct === null ? Ct = /* @__PURE__ */ new Set([this]) : Ct.add(this));
    var l = e.stack;
    this.componentDidCatch(e.value, { componentStack: l !== null ? l : "" });
  }), n;
}
function ta(t, e, n) {
  var r = t.pingCache;
  if (r === null) {
    r = t.pingCache = new w0();
    var i = /* @__PURE__ */ new Set();
    r.set(e, i);
  } else
    i = r.get(e), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(e, i));
  i.has(n) || (i.add(n), t = R0.bind(null, t, e, n), e.then(t, t));
}
function na(t) {
  do {
    var e;
    if ((e = t.tag === 13) && (e = t.memoizedState, e = e !== null ? e.dehydrated !== null : !0), e)
      return t;
    t = t.return;
  } while (t !== null);
  return null;
}
function ra(t, e, n, r, i) {
  return t.mode & 1 ? (t.flags |= 65536, t.lanes = i, t) : (t === e ? t.flags |= 65536 : (t.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (e = ot(-1, 1), e.tag = 2, Et(n, e, 1))), n.lanes |= 1), t);
}
var k0 = ft.ReactCurrentOwner, we = !1;
function he(t, e, n, r) {
  e.child = t === null ? af(e, null, n, r) : Mn(e, t.child, n, r);
}
function ia(t, e, n, r, i) {
  n = n.render;
  var o = e.ref;
  return kn(e, i), r = Rs(t, e, n, r, o, i), n = Fs(), t !== null && !we ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~i, ct(t, e, i)) : (U && n && Ss(e), e.flags |= 1, he(t, e, r, i), e.child);
}
function oa(t, e, n, r, i) {
  if (t === null) {
    var o = n.type;
    return typeof o == "function" && !Hs(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (e.tag = 15, e.type = o, Lf(t, e, o, r, i)) : (t = mi(n.type, null, r, e, e.mode, i), t.ref = e.ref, t.return = e, e.child = t);
  }
  if (o = t.child, !(t.lanes & i)) {
    var l = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : yr, n(l, r) && t.ref === e.ref)
      return ct(t, e, i);
  }
  return e.flags |= 1, t = Mt(o, r), t.ref = e.ref, t.return = e, e.child = t;
}
function Lf(t, e, n, r, i) {
  if (t !== null) {
    var o = t.memoizedProps;
    if (yr(o, r) && t.ref === e.ref)
      if (we = !1, e.pendingProps = r = o, (t.lanes & i) !== 0)
        t.flags & 131072 && (we = !0);
      else
        return e.lanes = t.lanes, ct(t, e, i);
  }
  return Rl(t, e, n, r, i);
}
function Af(t, e, n) {
  var r = e.pendingProps, i = r.children, o = t !== null ? t.memoizedState : null;
  if (r.mode === "hidden")
    if (!(e.mode & 1))
      e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $(hn, Ne), Ne |= n;
    else {
      if (!(n & 1073741824))
        return t = o !== null ? o.baseLanes | n : n, e.lanes = e.childLanes = 1073741824, e.memoizedState = { baseLanes: t, cachePool: null, transitions: null }, e.updateQueue = null, $(hn, Ne), Ne |= t, null;
      e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, $(hn, Ne), Ne |= r;
    }
  else
    o !== null ? (r = o.baseLanes | n, e.memoizedState = null) : r = n, $(hn, Ne), Ne |= r;
  return he(t, e, i, n), e.child;
}
function Df(t, e) {
  var n = e.ref;
  (t === null && n !== null || t !== null && t.ref !== n) && (e.flags |= 512, e.flags |= 2097152);
}
function Rl(t, e, n, r, i) {
  var o = xe(n) ? Qt : de.current;
  return o = Cn(e, o), kn(e, i), n = Rs(t, e, n, r, o, i), r = Fs(), t !== null && !we ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~i, ct(t, e, i)) : (U && r && Ss(e), e.flags |= 1, he(t, e, n, i), e.child);
}
function la(t, e, n, r, i) {
  if (xe(n)) {
    var o = !0;
    Ri(e);
  } else
    o = !1;
  if (kn(e, i), e.stateNode === null)
    di(t, e), Of(e, n, r), Il(e, n, r, i), r = !0;
  else if (t === null) {
    var l = e.stateNode, s = e.memoizedProps;
    l.props = s;
    var u = l.context, a = n.contextType;
    typeof a == "object" && a !== null ? a = Be(a) : (a = xe(n) ? Qt : de.current, a = Cn(e, a));
    var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof l.getSnapshotBeforeUpdate == "function";
    f || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== r || u !== a) && ea(e, l, r, a), ht = !1;
    var d = e.memoizedState;
    l.state = d, Bi(e, r, l, i), u = e.memoizedState, s !== r || d !== u || Se.current || ht ? (typeof c == "function" && (zl(e, n, c, r), u = e.memoizedState), (s = ht || bu(e, n, s, r, d, u, a)) ? (f || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = r, e.memoizedState = u), l.props = r, l.state = u, l.context = a, r = s) : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), r = !1);
  } else {
    l = e.stateNode, ff(t, e), s = e.memoizedProps, a = e.type === e.elementType ? s : Ue(e.type, s), l.props = a, f = e.pendingProps, d = l.context, u = n.contextType, typeof u == "object" && u !== null ? u = Be(u) : (u = xe(n) ? Qt : de.current, u = Cn(e, u));
    var g = n.getDerivedStateFromProps;
    (c = typeof g == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== f || d !== u) && ea(e, l, r, u), ht = !1, d = e.memoizedState, l.state = d, Bi(e, r, l, i);
    var y = e.memoizedState;
    s !== f || d !== y || Se.current || ht ? (typeof g == "function" && (zl(e, n, g, r), y = e.memoizedState), (a = ht || bu(e, n, a, r, d, y, u) || !1) ? (c || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, y, u), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(r, y, u)), typeof l.componentDidUpdate == "function" && (e.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || s === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), e.memoizedProps = r, e.memoizedState = y), l.props = r, l.state = y, l.context = u, r = a) : (typeof l.componentDidUpdate != "function" || s === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), r = !1);
  }
  return Fl(t, e, n, r, o, i);
}
function Fl(t, e, n, r, i, o) {
  Df(t, e);
  var l = (e.flags & 128) !== 0;
  if (!r && !l)
    return i && Ju(e, n, !1), ct(t, e, o);
  r = e.stateNode, k0.current = e;
  var s = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return e.flags |= 1, t !== null && l ? (e.child = Mn(e, t.child, null, o), e.child = Mn(e, null, s, o)) : he(t, e, s, o), e.memoizedState = r.state, i && Ju(e, n, !0), e.child;
}
function Bf(t) {
  var e = t.stateNode;
  e.pendingContext ? Hu(t, e.pendingContext, e.pendingContext !== e.context) : e.context && Hu(t, e.context, !1), Ps(t, e.containerInfo);
}
function sa(t, e, n, r, i) {
  return Nn(), Es(i), e.flags |= 256, he(t, e, n, r), e.child;
}
var Ll = { dehydrated: null, treeContext: null, retryLane: 0 };
function Al(t) {
  return { baseLanes: t, cachePool: null, transitions: null };
}
function $f(t, e, n) {
  var r = e.pendingProps, i = W.current, o = !1, l = (e.flags & 128) !== 0, s;
  if ((s = l) || (s = t !== null && t.memoizedState === null ? !1 : (i & 2) !== 0), s ? (o = !0, e.flags &= -129) : (t === null || t.memoizedState !== null) && (i |= 1), $(W, i & 1), t === null)
    return _l(e), t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null) ? (e.mode & 1 ? t.data === "$!" ? e.lanes = 8 : e.lanes = 1073741824 : e.lanes = 1, null) : (l = r.children, t = r.fallback, o ? (r = e.mode, o = e.child, l = { mode: "hidden", children: l }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = l) : o = lo(l, r, 0, null), t = Jt(t, r, n, null), o.return = e, t.return = e, o.sibling = t, e.child = o, e.child.memoizedState = Al(n), e.memoizedState = Ll, t) : Ds(e, l));
  if (i = t.memoizedState, i !== null && (s = i.dehydrated, s !== null))
    return S0(t, e, l, r, s, i, n);
  if (o) {
    o = r.fallback, l = e.mode, i = t.child, s = i.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(l & 1) && e.child !== i ? (r = e.child, r.childLanes = 0, r.pendingProps = u, e.deletions = null) : (r = Mt(i, u), r.subtreeFlags = i.subtreeFlags & 14680064), s !== null ? o = Mt(s, o) : (o = Jt(o, l, n, null), o.flags |= 2), o.return = e, r.return = e, r.sibling = o, e.child = r, r = o, o = e.child, l = t.child.memoizedState, l = l === null ? Al(n) : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }, o.memoizedState = l, o.childLanes = t.childLanes & ~n, e.memoizedState = Ll, r;
  }
  return o = t.child, t = o.sibling, r = Mt(o, { mode: "visible", children: r.children }), !(e.mode & 1) && (r.lanes = n), r.return = e, r.sibling = null, t !== null && (n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t)), e.child = r, e.memoizedState = null, r;
}
function Ds(t, e) {
  return e = lo({ mode: "visible", children: e }, t.mode, 0, null), e.return = t, t.child = e;
}
function qr(t, e, n, r) {
  return r !== null && Es(r), Mn(e, t.child, null, n), t = Ds(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
}
function S0(t, e, n, r, i, o, l) {
  if (n)
    return e.flags & 256 ? (e.flags &= -257, r = Qo(Error(k(422))), qr(t, e, l, r)) : e.memoizedState !== null ? (e.child = t.child, e.flags |= 128, null) : (o = r.fallback, i = e.mode, r = lo({ mode: "visible", children: r.children }, i, 0, null), o = Jt(o, i, l, null), o.flags |= 2, r.return = e, o.return = e, r.sibling = o, e.child = r, e.mode & 1 && Mn(e, t.child, null, l), e.child.memoizedState = Al(l), e.memoizedState = Ll, o);
  if (!(e.mode & 1))
    return qr(t, e, l, null);
  if (i.data === "$!") {
    if (r = i.nextSibling && i.nextSibling.dataset, r)
      var s = r.dgst;
    return r = s, o = Error(k(419)), r = Qo(o, r, void 0), qr(t, e, l, r);
  }
  if (s = (l & t.childLanes) !== 0, we || s) {
    if (r = ie, r !== null) {
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
      i = i & (r.suspendedLanes | l) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, at(t, i), Ke(r, t, i, -1));
    }
    return Ws(), r = Qo(Error(k(421))), qr(t, e, l, r);
  }
  return i.data === "$?" ? (e.flags |= 128, e.child = t.child, e = F0.bind(null, t), i._reactRetry = e, null) : (t = o.treeContext, Pe = xt(i.nextSibling), ze = e, U = !0, He = null, t !== null && (Fe[Le++] = rt, Fe[Le++] = it, Fe[Le++] = Kt, rt = t.id, it = t.overflow, Kt = e), e = Ds(e, r.children), e.flags |= 4096, e);
}
function ua(t, e, n) {
  t.lanes |= e;
  var r = t.alternate;
  r !== null && (r.lanes |= e), Pl(t.return, e, n);
}
function Ko(t, e, n, r, i) {
  var o = t.memoizedState;
  o === null ? t.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = e, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
}
function jf(t, e, n) {
  var r = e.pendingProps, i = r.revealOrder, o = r.tail;
  if (he(t, e, r.children, n), r = W.current, r & 2)
    r = r & 1 | 2, e.flags |= 128;
  else {
    if (t !== null && t.flags & 128)
      e:
        for (t = e.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && ua(t, n, e);
          else if (t.tag === 19)
            ua(t, n, e);
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
  if ($(W, r), !(e.mode & 1))
    e.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = e.child, i = null; n !== null; )
          t = n.alternate, t !== null && $i(t) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = e.child, e.child = null) : (i = n.sibling, n.sibling = null), Ko(e, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = e.child, e.child = null; i !== null; ) {
          if (t = i.alternate, t !== null && $i(t) === null) {
            e.child = i;
            break;
          }
          t = i.sibling, i.sibling = n, n = i, i = t;
        }
        Ko(e, !0, n, null, o);
        break;
      case "together":
        Ko(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
  return e.child;
}
function di(t, e) {
  !(e.mode & 1) && t !== null && (t.alternate = null, e.alternate = null, e.flags |= 2);
}
function ct(t, e, n) {
  if (t !== null && (e.dependencies = t.dependencies), Xt |= e.lanes, !(n & e.childLanes))
    return null;
  if (t !== null && e.child !== t.child)
    throw Error(k(153));
  if (e.child !== null) {
    for (t = e.child, n = Mt(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
      t = t.sibling, n = n.sibling = Mt(t, t.pendingProps), n.return = e;
    n.sibling = null;
  }
  return e.child;
}
function x0(t, e, n) {
  switch (e.tag) {
    case 3:
      Bf(e), Nn();
      break;
    case 5:
      df(e);
      break;
    case 1:
      xe(e.type) && Ri(e);
      break;
    case 4:
      Ps(e, e.stateNode.containerInfo);
      break;
    case 10:
      var r = e.type._context, i = e.memoizedProps.value;
      $(Ai, r._currentValue), r._currentValue = i;
      break;
    case 13:
      if (r = e.memoizedState, r !== null)
        return r.dehydrated !== null ? ($(W, W.current & 1), e.flags |= 128, null) : n & e.child.childLanes ? $f(t, e, n) : ($(W, W.current & 1), t = ct(t, e, n), t !== null ? t.sibling : null);
      $(W, W.current & 1);
      break;
    case 19:
      if (r = (n & e.childLanes) !== 0, t.flags & 128) {
        if (r)
          return jf(t, e, n);
        e.flags |= 128;
      }
      if (i = e.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), $(W, W.current), r)
        break;
      return null;
    case 22:
    case 23:
      return e.lanes = 0, Af(t, e, n);
  }
  return ct(t, e, n);
}
var Vf, Dl, Uf, Wf;
Vf = function(t, e) {
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
Dl = function() {
};
Uf = function(t, e, n, r) {
  var i = t.memoizedProps;
  if (i !== r) {
    t = e.stateNode, Wt(et.current);
    var o = null;
    switch (n) {
      case "input":
        i = ol(t, i), r = ol(t, r), o = [];
        break;
      case "select":
        i = Q({}, i, { value: void 0 }), r = Q({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        i = ul(t, i), r = ul(t, r), o = [];
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (t.onclick = Ii);
    }
    cl(n, r);
    var l;
    n = null;
    for (a in i)
      if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && i[a] != null)
        if (a === "style") {
          var s = i[a];
          for (l in s)
            s.hasOwnProperty(l) && (n || (n = {}), n[l] = "");
        } else
          a !== "dangerouslySetInnerHTML" && a !== "children" && a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (cr.hasOwnProperty(a) ? o || (o = []) : (o = o || []).push(a, null));
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
          a === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(a, u)) : a === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(a, "" + u) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && (cr.hasOwnProperty(a) ? (u != null && a === "onScroll" && j("scroll", t), o || s === u || (o = [])) : (o = o || []).push(a, u));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (e.updateQueue = a) && (e.flags |= 4);
  }
};
Wf = function(t, e, n, r) {
  n !== r && (e.flags |= 4);
};
function Wn(t, e) {
  if (!U)
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
function ae(t) {
  var e = t.alternate !== null && t.alternate.child === t.child, n = 0, r = 0;
  if (e)
    for (var i = t.child; i !== null; )
      n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = t, i = i.sibling;
  else
    for (i = t.child; i !== null; )
      n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = t, i = i.sibling;
  return t.subtreeFlags |= r, t.childLanes = n, e;
}
function E0(t, e, n) {
  var r = e.pendingProps;
  switch (xs(e), e.tag) {
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
      return ae(e), null;
    case 1:
      return xe(e.type) && Oi(), ae(e), null;
    case 3:
      return r = e.stateNode, Tn(), V(Se), V(de), Is(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (t === null || t.child === null) && (Gr(e) ? e.flags |= 4 : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, He !== null && (Jl(He), He = null))), Dl(t, e), ae(e), null;
    case 5:
      zs(e);
      var i = Wt(xr.current);
      if (n = e.type, t !== null && e.stateNode != null)
        Uf(t, e, n, r, i), t.ref !== e.ref && (e.flags |= 512, e.flags |= 2097152);
      else {
        if (!r) {
          if (e.stateNode === null)
            throw Error(k(166));
          return ae(e), null;
        }
        if (t = Wt(et.current), Gr(e)) {
          r = e.stateNode, n = e.type;
          var o = e.memoizedProps;
          switch (r[Ze] = e, r[kr] = o, t = (e.mode & 1) !== 0, n) {
            case "dialog":
              j("cancel", r), j("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              j("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Gn.length; i++)
                j(Gn[i], r);
              break;
            case "source":
              j("error", r);
              break;
            case "img":
            case "image":
            case "link":
              j(
                "error",
                r
              ), j("load", r);
              break;
            case "details":
              j("toggle", r);
              break;
            case "input":
              yu(r, o), j("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, j("invalid", r);
              break;
            case "textarea":
              wu(r, o), j("invalid", r);
          }
          cl(n, o), i = null;
          for (var l in o)
            if (o.hasOwnProperty(l)) {
              var s = o[l];
              l === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && Xr(r.textContent, s, t), i = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && Xr(
                r.textContent,
                s,
                t
              ), i = ["children", "" + s]) : cr.hasOwnProperty(l) && s != null && l === "onScroll" && j("scroll", r);
            }
          switch (n) {
            case "input":
              Vr(r), vu(r, o, !0);
              break;
            case "textarea":
              Vr(r), ku(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ii);
          }
          r = i, e.updateQueue = r, r !== null && (e.flags |= 4);
        } else {
          l = i.nodeType === 9 ? i : i.ownerDocument, t === "http://www.w3.org/1999/xhtml" && (t = gc(n)), t === "http://www.w3.org/1999/xhtml" ? n === "script" ? (t = l.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild)) : typeof r.is == "string" ? t = l.createElement(n, { is: r.is }) : (t = l.createElement(n), n === "select" && (l = t, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : t = l.createElementNS(t, n), t[Ze] = e, t[kr] = r, Vf(t, e, !1, !1), e.stateNode = t;
          e: {
            switch (l = fl(n, r), n) {
              case "dialog":
                j("cancel", t), j("close", t), i = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                j("load", t), i = r;
                break;
              case "video":
              case "audio":
                for (i = 0; i < Gn.length; i++)
                  j(Gn[i], t);
                i = r;
                break;
              case "source":
                j("error", t), i = r;
                break;
              case "img":
              case "image":
              case "link":
                j(
                  "error",
                  t
                ), j("load", t), i = r;
                break;
              case "details":
                j("toggle", t), i = r;
                break;
              case "input":
                yu(t, r), i = ol(t, r), j("invalid", t);
                break;
              case "option":
                i = r;
                break;
              case "select":
                t._wrapperState = { wasMultiple: !!r.multiple }, i = Q({}, r, { value: void 0 }), j("invalid", t);
                break;
              case "textarea":
                wu(t, r), i = ul(t, r), j("invalid", t);
                break;
              default:
                i = r;
            }
            cl(n, i), s = i;
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var u = s[o];
                o === "style" ? wc(t, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && yc(t, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && fr(t, u) : typeof u == "number" && fr(t, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (cr.hasOwnProperty(o) ? u != null && o === "onScroll" && j("scroll", t) : u != null && ss(t, o, u, l));
              }
            switch (n) {
              case "input":
                Vr(t), vu(t, r, !1);
                break;
              case "textarea":
                Vr(t), ku(t);
                break;
              case "option":
                r.value != null && t.setAttribute("value", "" + Tt(r.value));
                break;
              case "select":
                t.multiple = !!r.multiple, o = r.value, o != null ? gn(t, !!r.multiple, o, !1) : r.defaultValue != null && gn(
                  t,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof i.onClick == "function" && (t.onclick = Ii);
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
      return ae(e), null;
    case 6:
      if (t && e.stateNode != null)
        Wf(t, e, t.memoizedProps, r);
      else {
        if (typeof r != "string" && e.stateNode === null)
          throw Error(k(166));
        if (n = Wt(xr.current), Wt(et.current), Gr(e)) {
          if (r = e.stateNode, n = e.memoizedProps, r[Ze] = e, (o = r.nodeValue !== n) && (t = ze, t !== null))
            switch (t.tag) {
              case 3:
                Xr(r.nodeValue, n, (t.mode & 1) !== 0);
                break;
              case 5:
                t.memoizedProps.suppressHydrationWarning !== !0 && Xr(r.nodeValue, n, (t.mode & 1) !== 0);
            }
          o && (e.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ze] = e, e.stateNode = r;
      }
      return ae(e), null;
    case 13:
      if (V(W), r = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (U && Pe !== null && e.mode & 1 && !(e.flags & 128))
          sf(), Nn(), e.flags |= 98560, o = !1;
        else if (o = Gr(e), r !== null && r.dehydrated !== null) {
          if (t === null) {
            if (!o)
              throw Error(k(318));
            if (o = e.memoizedState, o = o !== null ? o.dehydrated : null, !o)
              throw Error(k(317));
            o[Ze] = e;
          } else
            Nn(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          ae(e), o = !1;
        } else
          He !== null && (Jl(He), He = null), o = !0;
        if (!o)
          return e.flags & 65536 ? e : null;
      }
      return e.flags & 128 ? (e.lanes = n, e) : (r = r !== null, r !== (t !== null && t.memoizedState !== null) && r && (e.child.flags |= 8192, e.mode & 1 && (t === null || W.current & 1 ? ee === 0 && (ee = 3) : Ws())), e.updateQueue !== null && (e.flags |= 4), ae(e), null);
    case 4:
      return Tn(), Dl(t, e), t === null && vr(e.stateNode.containerInfo), ae(e), null;
    case 10:
      return Ms(e.type._context), ae(e), null;
    case 17:
      return xe(e.type) && Oi(), ae(e), null;
    case 19:
      if (V(W), o = e.memoizedState, o === null)
        return ae(e), null;
      if (r = (e.flags & 128) !== 0, l = o.rendering, l === null)
        if (r)
          Wn(o, !1);
        else {
          if (ee !== 0 || t !== null && t.flags & 128)
            for (t = e.child; t !== null; ) {
              if (l = $i(t), l !== null) {
                for (e.flags |= 128, Wn(o, !1), r = l.updateQueue, r !== null && (e.updateQueue = r, e.flags |= 4), e.subtreeFlags = 0, r = n, n = e.child; n !== null; )
                  o = n, t = r, o.flags &= 14680066, l = o.alternate, l === null ? (o.childLanes = 0, o.lanes = t, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = l.childLanes, o.lanes = l.lanes, o.child = l.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = l.memoizedProps, o.memoizedState = l.memoizedState, o.updateQueue = l.updateQueue, o.type = l.type, t = l.dependencies, o.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), n = n.sibling;
                return $(W, W.current & 1 | 2), e.child;
              }
              t = t.sibling;
            }
          o.tail !== null && G() > Pn && (e.flags |= 128, r = !0, Wn(o, !1), e.lanes = 4194304);
        }
      else {
        if (!r)
          if (t = $i(l), t !== null) {
            if (e.flags |= 128, r = !0, n = t.updateQueue, n !== null && (e.updateQueue = n, e.flags |= 4), Wn(o, !0), o.tail === null && o.tailMode === "hidden" && !l.alternate && !U)
              return ae(e), null;
          } else
            2 * G() - o.renderingStartTime > Pn && n !== 1073741824 && (e.flags |= 128, r = !0, Wn(o, !1), e.lanes = 4194304);
        o.isBackwards ? (l.sibling = e.child, e.child = l) : (n = o.last, n !== null ? n.sibling = l : e.child = l, o.last = l);
      }
      return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = G(), e.sibling = null, n = W.current, $(W, r ? n & 1 | 2 : n & 1), e) : (ae(e), null);
    case 22:
    case 23:
      return Us(), r = e.memoizedState !== null, t !== null && t.memoizedState !== null !== r && (e.flags |= 8192), r && e.mode & 1 ? Ne & 1073741824 && (ae(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : ae(e), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, e.tag));
}
function C0(t, e) {
  switch (xs(e), e.tag) {
    case 1:
      return xe(e.type) && Oi(), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return Tn(), V(Se), V(de), Is(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
    case 5:
      return zs(e), null;
    case 13:
      if (V(W), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null)
          throw Error(k(340));
        Nn();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 19:
      return V(W), null;
    case 4:
      return Tn(), null;
    case 10:
      return Ms(e.type._context), null;
    case 22:
    case 23:
      return Us(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var br = !1, ce = !1, N0 = typeof WeakSet == "function" ? WeakSet : Set, N = null;
function pn(t, e) {
  var n = t.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        K(t, e, r);
      }
    else
      n.current = null;
}
function Bl(t, e, n) {
  try {
    n();
  } catch (r) {
    K(t, e, r);
  }
}
var aa = !1;
function M0(t, e) {
  if (Sl = _i, t = Kc(), ks(t)) {
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
          var l = 0, s = -1, u = -1, a = 0, c = 0, f = t, d = null;
          t:
            for (; ; ) {
              for (var g; f !== n || i !== 0 && f.nodeType !== 3 || (s = l + i), f !== o || r !== 0 && f.nodeType !== 3 || (u = l + r), f.nodeType === 3 && (l += f.nodeValue.length), (g = f.firstChild) !== null; )
                d = f, f = g;
              for (; ; ) {
                if (f === t)
                  break t;
                if (d === n && ++a === i && (s = l), d === o && ++c === r && (u = l), (g = f.nextSibling) !== null)
                  break;
                f = d, d = f.parentNode;
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
  for (xl = { focusedElem: t, selectionRange: n }, _i = !1, N = e; N !== null; )
    if (e = N, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
      t.return = e, N = t;
    else
      for (; N !== null; ) {
        e = N;
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
                  var v = y.memoizedProps, x = y.memoizedState, h = e.stateNode, p = h.getSnapshotBeforeUpdate(e.elementType === e.type ? v : Ue(e.type, v), x);
                  h.__reactInternalSnapshotBeforeUpdate = p;
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
          K(e, e.return, w);
        }
        if (t = e.sibling, t !== null) {
          t.return = e.return, N = t;
          break;
        }
        N = e.return;
      }
  return y = aa, aa = !1, y;
}
function or(t, e, n) {
  var r = e.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var i = r = r.next;
    do {
      if ((i.tag & t) === t) {
        var o = i.destroy;
        i.destroy = void 0, o !== void 0 && Bl(e, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function io(t, e) {
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
function $l(t) {
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
function Hf(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, Hf(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && (delete e[Ze], delete e[kr], delete e[Nl], delete e[u0], delete e[a0])), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
function Jf(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 4;
}
function ca(t) {
  e:
    for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Jf(t.return))
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
function jl(t, e, n) {
  var r = t.tag;
  if (r === 5 || r === 6)
    t = t.stateNode, e ? n.nodeType === 8 ? n.parentNode.insertBefore(t, e) : n.insertBefore(t, e) : (n.nodeType === 8 ? (e = n.parentNode, e.insertBefore(t, n)) : (e = n, e.appendChild(t)), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Ii));
  else if (r !== 4 && (t = t.child, t !== null))
    for (jl(t, e, n), t = t.sibling; t !== null; )
      jl(t, e, n), t = t.sibling;
}
function Vl(t, e, n) {
  var r = t.tag;
  if (r === 5 || r === 6)
    t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
  else if (r !== 4 && (t = t.child, t !== null))
    for (Vl(t, e, n), t = t.sibling; t !== null; )
      Vl(t, e, n), t = t.sibling;
}
var oe = null, We = !1;
function dt(t, e, n) {
  for (n = n.child; n !== null; )
    Qf(t, e, n), n = n.sibling;
}
function Qf(t, e, n) {
  if (be && typeof be.onCommitFiberUnmount == "function")
    try {
      be.onCommitFiberUnmount(Gi, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      ce || pn(n, e);
    case 6:
      var r = oe, i = We;
      oe = null, dt(t, e, n), oe = r, We = i, oe !== null && (We ? (t = oe, n = n.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (We ? (t = oe, n = n.stateNode, t.nodeType === 8 ? jo(t.parentNode, n) : t.nodeType === 1 && jo(t, n), mr(t)) : jo(oe, n.stateNode));
      break;
    case 4:
      r = oe, i = We, oe = n.stateNode.containerInfo, We = !0, dt(t, e, n), oe = r, We = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ce && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        i = r = r.next;
        do {
          var o = i, l = o.destroy;
          o = o.tag, l !== void 0 && (o & 2 || o & 4) && Bl(n, e, l), i = i.next;
        } while (i !== r);
      }
      dt(t, e, n);
      break;
    case 1:
      if (!ce && (pn(n, e), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (s) {
          K(n, e, s);
        }
      dt(t, e, n);
      break;
    case 21:
      dt(t, e, n);
      break;
    case 22:
      n.mode & 1 ? (ce = (r = ce) || n.memoizedState !== null, dt(t, e, n), ce = r) : dt(t, e, n);
      break;
    default:
      dt(t, e, n);
  }
}
function fa(t) {
  var e = t.updateQueue;
  if (e !== null) {
    t.updateQueue = null;
    var n = t.stateNode;
    n === null && (n = t.stateNode = new N0()), e.forEach(function(r) {
      var i = L0.bind(null, t, r);
      n.has(r) || (n.add(r), r.then(i, i));
    });
  }
}
function Ve(t, e) {
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
                oe = s.stateNode, We = !1;
                break e;
              case 3:
                oe = s.stateNode.containerInfo, We = !0;
                break e;
              case 4:
                oe = s.stateNode.containerInfo, We = !0;
                break e;
            }
            s = s.return;
          }
        if (oe === null)
          throw Error(k(160));
        Qf(o, l, i), oe = null, We = !1;
        var u = i.alternate;
        u !== null && (u.return = null), i.return = null;
      } catch (a) {
        K(i, e, a);
      }
    }
  if (e.subtreeFlags & 12854)
    for (e = e.child; e !== null; )
      Kf(e, t), e = e.sibling;
}
function Kf(t, e) {
  var n = t.alternate, r = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ve(e, t), Xe(t), r & 4) {
        try {
          or(3, t, t.return), io(3, t);
        } catch (v) {
          K(t, t.return, v);
        }
        try {
          or(5, t, t.return);
        } catch (v) {
          K(t, t.return, v);
        }
      }
      break;
    case 1:
      Ve(e, t), Xe(t), r & 512 && n !== null && pn(n, n.return);
      break;
    case 5:
      if (Ve(e, t), Xe(t), r & 512 && n !== null && pn(n, n.return), t.flags & 32) {
        var i = t.stateNode;
        try {
          fr(i, "");
        } catch (v) {
          K(t, t.return, v);
        }
      }
      if (r & 4 && (i = t.stateNode, i != null)) {
        var o = t.memoizedProps, l = n !== null ? n.memoizedProps : o, s = t.type, u = t.updateQueue;
        if (t.updateQueue = null, u !== null)
          try {
            s === "input" && o.type === "radio" && o.name != null && hc(i, o), fl(s, l);
            var a = fl(s, o);
            for (l = 0; l < u.length; l += 2) {
              var c = u[l], f = u[l + 1];
              c === "style" ? wc(i, f) : c === "dangerouslySetInnerHTML" ? yc(i, f) : c === "children" ? fr(i, f) : ss(i, c, f, a);
            }
            switch (s) {
              case "input":
                ll(i, o);
                break;
              case "textarea":
                mc(i, o);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var g = o.value;
                g != null ? gn(i, !!o.multiple, g, !1) : d !== !!o.multiple && (o.defaultValue != null ? gn(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : gn(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[kr] = o;
          } catch (v) {
            K(t, t.return, v);
          }
      }
      break;
    case 6:
      if (Ve(e, t), Xe(t), r & 4) {
        if (t.stateNode === null)
          throw Error(k(162));
        i = t.stateNode, o = t.memoizedProps;
        try {
          i.nodeValue = o;
        } catch (v) {
          K(t, t.return, v);
        }
      }
      break;
    case 3:
      if (Ve(e, t), Xe(t), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          mr(e.containerInfo);
        } catch (v) {
          K(t, t.return, v);
        }
      break;
    case 4:
      Ve(e, t), Xe(t);
      break;
    case 13:
      Ve(e, t), Xe(t), i = t.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (js = G())), r & 4 && fa(t);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, t.mode & 1 ? (ce = (a = ce) || c, Ve(e, t), ce = a) : Ve(e, t), Xe(t), r & 8192) {
        if (a = t.memoizedState !== null, (t.stateNode.isHidden = a) && !c && t.mode & 1)
          for (N = t, c = t.child; c !== null; ) {
            for (f = N = c; N !== null; ) {
              switch (d = N, g = d.child, d.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  or(4, d, d.return);
                  break;
                case 1:
                  pn(d, d.return);
                  var y = d.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    r = d, n = d.return;
                    try {
                      e = r, y.props = e.memoizedProps, y.state = e.memoizedState, y.componentWillUnmount();
                    } catch (v) {
                      K(r, n, v);
                    }
                  }
                  break;
                case 5:
                  pn(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    pa(f);
                    continue;
                  }
              }
              g !== null ? (g.return = d, N = g) : pa(f);
            }
            c = c.sibling;
          }
        e:
          for (c = null, f = t; ; ) {
            if (f.tag === 5) {
              if (c === null) {
                c = f;
                try {
                  i = f.stateNode, a ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = f.stateNode, u = f.memoizedProps.style, l = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = vc("display", l));
                } catch (v) {
                  K(t, t.return, v);
                }
              }
            } else if (f.tag === 6) {
              if (c === null)
                try {
                  f.stateNode.nodeValue = a ? "" : f.memoizedProps;
                } catch (v) {
                  K(t, t.return, v);
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
      Ve(e, t), Xe(t), r & 4 && fa(t);
      break;
    case 21:
      break;
    default:
      Ve(
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
          if (Jf(n)) {
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
          r.flags & 32 && (fr(i, ""), r.flags &= -33);
          var o = ca(t);
          Vl(t, o, i);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo, s = ca(t);
          jl(t, s, l);
          break;
        default:
          throw Error(k(161));
      }
    } catch (u) {
      K(t, t.return, u);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function T0(t, e, n) {
  N = t, Yf(t);
}
function Yf(t, e, n) {
  for (var r = (t.mode & 1) !== 0; N !== null; ) {
    var i = N, o = i.child;
    if (i.tag === 22 && r) {
      var l = i.memoizedState !== null || br;
      if (!l) {
        var s = i.alternate, u = s !== null && s.memoizedState !== null || ce;
        s = br;
        var a = ce;
        if (br = l, (ce = u) && !a)
          for (N = i; N !== null; )
            l = N, u = l.child, l.tag === 22 && l.memoizedState !== null ? ha(i) : u !== null ? (u.return = l, N = u) : ha(i);
        for (; o !== null; )
          N = o, Yf(o), o = o.sibling;
        N = i, br = s, ce = a;
      }
      da(t);
    } else
      i.subtreeFlags & 8772 && o !== null ? (o.return = i, N = o) : da(t);
  }
}
function da(t) {
  for (; N !== null; ) {
    var e = N;
    if (e.flags & 8772) {
      var n = e.alternate;
      try {
        if (e.flags & 8772)
          switch (e.tag) {
            case 0:
            case 11:
            case 15:
              ce || io(5, e);
              break;
            case 1:
              var r = e.stateNode;
              if (e.flags & 4 && !ce)
                if (n === null)
                  r.componentDidMount();
                else {
                  var i = e.elementType === e.type ? n.memoizedProps : Ue(e.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = e.updateQueue;
              o !== null && Gu(e, o, r);
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
                Gu(e, l, n);
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
                    f !== null && mr(f);
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
        ce || e.flags & 512 && $l(e);
      } catch (d) {
        K(e, e.return, d);
      }
    }
    if (e === t) {
      N = null;
      break;
    }
    if (n = e.sibling, n !== null) {
      n.return = e.return, N = n;
      break;
    }
    N = e.return;
  }
}
function pa(t) {
  for (; N !== null; ) {
    var e = N;
    if (e === t) {
      N = null;
      break;
    }
    var n = e.sibling;
    if (n !== null) {
      n.return = e.return, N = n;
      break;
    }
    N = e.return;
  }
}
function ha(t) {
  for (; N !== null; ) {
    var e = N;
    try {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          var n = e.return;
          try {
            io(4, e);
          } catch (u) {
            K(e, n, u);
          }
          break;
        case 1:
          var r = e.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = e.return;
            try {
              r.componentDidMount();
            } catch (u) {
              K(e, i, u);
            }
          }
          var o = e.return;
          try {
            $l(e);
          } catch (u) {
            K(e, o, u);
          }
          break;
        case 5:
          var l = e.return;
          try {
            $l(e);
          } catch (u) {
            K(e, l, u);
          }
      }
    } catch (u) {
      K(e, e.return, u);
    }
    if (e === t) {
      N = null;
      break;
    }
    var s = e.sibling;
    if (s !== null) {
      s.return = e.return, N = s;
      break;
    }
    N = e.return;
  }
}
var _0 = Math.ceil, Ui = ft.ReactCurrentDispatcher, Bs = ft.ReactCurrentOwner, De = ft.ReactCurrentBatchConfig, L = 0, ie = null, Z = null, le = 0, Ne = 0, hn = It(0), ee = 0, Mr = null, Xt = 0, oo = 0, $s = 0, lr = null, ve = null, js = 0, Pn = 1 / 0, tt = null, Wi = !1, Ul = null, Ct = null, ei = !1, vt = null, Hi = 0, sr = 0, Wl = null, pi = -1, hi = 0;
function me() {
  return L & 6 ? G() : pi !== -1 ? pi : pi = G();
}
function Nt(t) {
  return t.mode & 1 ? L & 2 && le !== 0 ? le & -le : f0.transition !== null ? (hi === 0 && (hi = Ic()), hi) : (t = A, t !== 0 || (t = window.event, t = t === void 0 ? 16 : Bc(t.type)), t) : 1;
}
function Ke(t, e, n, r) {
  if (50 < sr)
    throw sr = 0, Wl = null, Error(k(185));
  zr(t, n, r), (!(L & 2) || t !== ie) && (t === ie && (!(L & 2) && (oo |= n), ee === 4 && gt(t, le)), Ee(t, r), n === 1 && L === 0 && !(e.mode & 1) && (Pn = G() + 500, to && Ot()));
}
function Ee(t, e) {
  var n = t.callbackNode;
  fm(t, e);
  var r = Ti(t, t === ie ? le : 0);
  if (r === 0)
    n !== null && Eu(n), t.callbackNode = null, t.callbackPriority = 0;
  else if (e = r & -r, t.callbackPriority !== e) {
    if (n != null && Eu(n), e === 1)
      t.tag === 0 ? c0(ma.bind(null, t)) : rf(ma.bind(null, t)), l0(function() {
        !(L & 6) && Ot();
      }), n = null;
    else {
      switch (Oc(r)) {
        case 1:
          n = ds;
          break;
        case 4:
          n = Pc;
          break;
        case 16:
          n = Mi;
          break;
        case 536870912:
          n = zc;
          break;
        default:
          n = Mi;
      }
      n = nd(n, Xf.bind(null, t));
    }
    t.callbackPriority = e, t.callbackNode = n;
  }
}
function Xf(t, e) {
  if (pi = -1, hi = 0, L & 6)
    throw Error(k(327));
  var n = t.callbackNode;
  if (Sn() && t.callbackNode !== n)
    return null;
  var r = Ti(t, t === ie ? le : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & t.expiredLanes || e)
    e = Ji(t, r);
  else {
    e = r;
    var i = L;
    L |= 2;
    var o = Zf();
    (ie !== t || le !== e) && (tt = null, Pn = G() + 500, Ht(t, e));
    do
      try {
        I0();
        break;
      } catch (s) {
        Gf(t, s);
      }
    while (!0);
    Ns(), Ui.current = o, L = i, Z !== null ? e = 0 : (ie = null, le = 0, e = ee);
  }
  if (e !== 0) {
    if (e === 2 && (i = gl(t), i !== 0 && (r = i, e = Hl(t, i))), e === 1)
      throw n = Mr, Ht(t, 0), gt(t, r), Ee(t, G()), n;
    if (e === 6)
      gt(t, r);
    else {
      if (i = t.current.alternate, !(r & 30) && !P0(i) && (e = Ji(t, r), e === 2 && (o = gl(t), o !== 0 && (r = o, e = Hl(t, o))), e === 1))
        throw n = Mr, Ht(t, 0), gt(t, r), Ee(t, G()), n;
      switch (t.finishedWork = i, t.finishedLanes = r, e) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          At(t, ve, tt);
          break;
        case 3:
          if (gt(t, r), (r & 130023424) === r && (e = js + 500 - G(), 10 < e)) {
            if (Ti(t, 0) !== 0)
              break;
            if (i = t.suspendedLanes, (i & r) !== r) {
              me(), t.pingedLanes |= t.suspendedLanes & i;
              break;
            }
            t.timeoutHandle = Cl(At.bind(null, t, ve, tt), e);
            break;
          }
          At(t, ve, tt);
          break;
        case 4:
          if (gt(t, r), (r & 4194240) === r)
            break;
          for (e = t.eventTimes, i = -1; 0 < r; ) {
            var l = 31 - Qe(r);
            o = 1 << l, l = e[l], l > i && (i = l), r &= ~o;
          }
          if (r = i, r = G() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * _0(r / 1960)) - r, 10 < r) {
            t.timeoutHandle = Cl(At.bind(null, t, ve, tt), r);
            break;
          }
          At(t, ve, tt);
          break;
        case 5:
          At(t, ve, tt);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return Ee(t, G()), t.callbackNode === n ? Xf.bind(null, t) : null;
}
function Hl(t, e) {
  var n = lr;
  return t.current.memoizedState.isDehydrated && (Ht(t, e).flags |= 256), t = Ji(t, e), t !== 2 && (e = ve, ve = n, e !== null && Jl(e)), t;
}
function Jl(t) {
  ve === null ? ve = t : ve.push.apply(ve, t);
}
function P0(t) {
  for (var e = t; ; ) {
    if (e.flags & 16384) {
      var n = e.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r], o = i.getSnapshot;
          i = i.value;
          try {
            if (!Ye(o(), i))
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
function gt(t, e) {
  for (e &= ~$s, e &= ~oo, t.suspendedLanes |= e, t.pingedLanes &= ~e, t = t.expirationTimes; 0 < e; ) {
    var n = 31 - Qe(e), r = 1 << n;
    t[n] = -1, e &= ~r;
  }
}
function ma(t) {
  if (L & 6)
    throw Error(k(327));
  Sn();
  var e = Ti(t, 0);
  if (!(e & 1))
    return Ee(t, G()), null;
  var n = Ji(t, e);
  if (t.tag !== 0 && n === 2) {
    var r = gl(t);
    r !== 0 && (e = r, n = Hl(t, r));
  }
  if (n === 1)
    throw n = Mr, Ht(t, 0), gt(t, e), Ee(t, G()), n;
  if (n === 6)
    throw Error(k(345));
  return t.finishedWork = t.current.alternate, t.finishedLanes = e, At(t, ve, tt), Ee(t, G()), null;
}
function Vs(t, e) {
  var n = L;
  L |= 1;
  try {
    return t(e);
  } finally {
    L = n, L === 0 && (Pn = G() + 500, to && Ot());
  }
}
function Gt(t) {
  vt !== null && vt.tag === 0 && !(L & 6) && Sn();
  var e = L;
  L |= 1;
  var n = De.transition, r = A;
  try {
    if (De.transition = null, A = 1, t)
      return t();
  } finally {
    A = r, De.transition = n, L = e, !(L & 6) && Ot();
  }
}
function Us() {
  Ne = hn.current, V(hn);
}
function Ht(t, e) {
  t.finishedWork = null, t.finishedLanes = 0;
  var n = t.timeoutHandle;
  if (n !== -1 && (t.timeoutHandle = -1, o0(n)), Z !== null)
    for (n = Z.return; n !== null; ) {
      var r = n;
      switch (xs(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Oi();
          break;
        case 3:
          Tn(), V(Se), V(de), Is();
          break;
        case 5:
          zs(r);
          break;
        case 4:
          Tn();
          break;
        case 13:
          V(W);
          break;
        case 19:
          V(W);
          break;
        case 10:
          Ms(r.type._context);
          break;
        case 22:
        case 23:
          Us();
      }
      n = n.return;
    }
  if (ie = t, Z = t = Mt(t.current, null), le = Ne = e, ee = 0, Mr = null, $s = oo = Xt = 0, ve = lr = null, Ut !== null) {
    for (e = 0; e < Ut.length; e++)
      if (n = Ut[e], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, o = n.pending;
        if (o !== null) {
          var l = o.next;
          o.next = i, r.next = l;
        }
        n.pending = r;
      }
    Ut = null;
  }
  return t;
}
function Gf(t, e) {
  do {
    var n = Z;
    try {
      if (Ns(), ci.current = Vi, ji) {
        for (var r = J.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), r = r.next;
        }
        ji = !1;
      }
      if (Yt = 0, ne = b = J = null, ir = !1, Er = 0, Bs.current = null, n === null || n.return === null) {
        ee = 1, Mr = e, Z = null;
        break;
      }
      e: {
        var o = t, l = n.return, s = n, u = e;
        if (e = le, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var a = u, c = s, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var g = na(l);
          if (g !== null) {
            g.flags &= -257, ra(g, l, s, o, e), g.mode & 1 && ta(o, a, e), e = g, u = a;
            var y = e.updateQueue;
            if (y === null) {
              var v = /* @__PURE__ */ new Set();
              v.add(u), e.updateQueue = v;
            } else
              y.add(u);
            break e;
          } else {
            if (!(e & 1)) {
              ta(o, a, e), Ws();
              break e;
            }
            u = Error(k(426));
          }
        } else if (U && s.mode & 1) {
          var x = na(l);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256), ra(x, l, s, o, e), Es(_n(u, s));
            break e;
          }
        }
        o = u = _n(u, s), ee !== 4 && (ee = 2), lr === null ? lr = [o] : lr.push(o), o = l;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, e &= -e, o.lanes |= e;
              var h = Rf(o, u, e);
              Xu(o, h);
              break e;
            case 1:
              s = u;
              var p = o.type, m = o.stateNode;
              if (!(o.flags & 128) && (typeof p.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (Ct === null || !Ct.has(m)))) {
                o.flags |= 65536, e &= -e, o.lanes |= e;
                var w = Ff(o, s, e);
                Xu(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      bf(n);
    } catch (S) {
      e = S, Z === n && n !== null && (Z = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Zf() {
  var t = Ui.current;
  return Ui.current = Vi, t === null ? Vi : t;
}
function Ws() {
  (ee === 0 || ee === 3 || ee === 2) && (ee = 4), ie === null || !(Xt & 268435455) && !(oo & 268435455) || gt(ie, le);
}
function Ji(t, e) {
  var n = L;
  L |= 2;
  var r = Zf();
  (ie !== t || le !== e) && (tt = null, Ht(t, e));
  do
    try {
      z0();
      break;
    } catch (i) {
      Gf(t, i);
    }
  while (!0);
  if (Ns(), L = n, Ui.current = r, Z !== null)
    throw Error(k(261));
  return ie = null, le = 0, ee;
}
function z0() {
  for (; Z !== null; )
    qf(Z);
}
function I0() {
  for (; Z !== null && !nm(); )
    qf(Z);
}
function qf(t) {
  var e = td(t.alternate, t, Ne);
  t.memoizedProps = t.pendingProps, e === null ? bf(t) : Z = e, Bs.current = null;
}
function bf(t) {
  var e = t;
  do {
    var n = e.alternate;
    if (t = e.return, e.flags & 32768) {
      if (n = C0(n, e), n !== null) {
        n.flags &= 32767, Z = n;
        return;
      }
      if (t !== null)
        t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null;
      else {
        ee = 6, Z = null;
        return;
      }
    } else if (n = E0(n, e, Ne), n !== null) {
      Z = n;
      return;
    }
    if (e = e.sibling, e !== null) {
      Z = e;
      return;
    }
    Z = e = t;
  } while (e !== null);
  ee === 0 && (ee = 5);
}
function At(t, e, n) {
  var r = A, i = De.transition;
  try {
    De.transition = null, A = 1, O0(t, e, n, r);
  } finally {
    De.transition = i, A = r;
  }
  return null;
}
function O0(t, e, n, r) {
  do
    Sn();
  while (vt !== null);
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
  if (dm(t, o), t === ie && (Z = ie = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || ei || (ei = !0, nd(Mi, function() {
    return Sn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = De.transition, De.transition = null;
    var l = A;
    A = 1;
    var s = L;
    L |= 4, Bs.current = null, M0(t, n), Kf(n, t), qm(xl), _i = !!Sl, xl = Sl = null, t.current = n, T0(n), rm(), L = s, A = l, De.transition = o;
  } else
    t.current = n;
  if (ei && (ei = !1, vt = t, Hi = i), o = t.pendingLanes, o === 0 && (Ct = null), lm(n.stateNode), Ee(t, G()), e !== null)
    for (r = t.onRecoverableError, n = 0; n < e.length; n++)
      i = e[n], r(i.value, { componentStack: i.stack, digest: i.digest });
  if (Wi)
    throw Wi = !1, t = Ul, Ul = null, t;
  return Hi & 1 && t.tag !== 0 && Sn(), o = t.pendingLanes, o & 1 ? t === Wl ? sr++ : (sr = 0, Wl = t) : sr = 0, Ot(), null;
}
function Sn() {
  if (vt !== null) {
    var t = Oc(Hi), e = De.transition, n = A;
    try {
      if (De.transition = null, A = 16 > t ? 16 : t, vt === null)
        var r = !1;
      else {
        if (t = vt, vt = null, Hi = 0, L & 6)
          throw Error(k(331));
        var i = L;
        for (L |= 4, N = t.current; N !== null; ) {
          var o = N, l = o.child;
          if (N.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var a = s[u];
                for (N = a; N !== null; ) {
                  var c = N;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      or(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null)
                    f.return = c, N = f;
                  else
                    for (; N !== null; ) {
                      c = N;
                      var d = c.sibling, g = c.return;
                      if (Hf(c), c === a) {
                        N = null;
                        break;
                      }
                      if (d !== null) {
                        d.return = g, N = d;
                        break;
                      }
                      N = g;
                    }
                }
              }
              var y = o.alternate;
              if (y !== null) {
                var v = y.child;
                if (v !== null) {
                  y.child = null;
                  do {
                    var x = v.sibling;
                    v.sibling = null, v = x;
                  } while (v !== null);
                }
              }
              N = o;
            }
          }
          if (o.subtreeFlags & 2064 && l !== null)
            l.return = o, N = l;
          else
            e:
              for (; N !== null; ) {
                if (o = N, o.flags & 2048)
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      or(9, o, o.return);
                  }
                var h = o.sibling;
                if (h !== null) {
                  h.return = o.return, N = h;
                  break e;
                }
                N = o.return;
              }
        }
        var p = t.current;
        for (N = p; N !== null; ) {
          l = N;
          var m = l.child;
          if (l.subtreeFlags & 2064 && m !== null)
            m.return = l, N = m;
          else
            e:
              for (l = p; N !== null; ) {
                if (s = N, s.flags & 2048)
                  try {
                    switch (s.tag) {
                      case 0:
                      case 11:
                      case 15:
                        io(9, s);
                    }
                  } catch (S) {
                    K(s, s.return, S);
                  }
                if (s === l) {
                  N = null;
                  break e;
                }
                var w = s.sibling;
                if (w !== null) {
                  w.return = s.return, N = w;
                  break e;
                }
                N = s.return;
              }
        }
        if (L = i, Ot(), be && typeof be.onPostCommitFiberRoot == "function")
          try {
            be.onPostCommitFiberRoot(Gi, t);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      A = n, De.transition = e;
    }
  }
  return !1;
}
function ga(t, e, n) {
  e = _n(n, e), e = Rf(t, e, 1), t = Et(t, e, 1), e = me(), t !== null && (zr(t, 1, e), Ee(t, e));
}
function K(t, e, n) {
  if (t.tag === 3)
    ga(t, t, n);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        ga(e, t, n);
        break;
      } else if (e.tag === 1) {
        var r = e.stateNode;
        if (typeof e.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ct === null || !Ct.has(r))) {
          t = _n(n, t), t = Ff(e, t, 1), e = Et(e, t, 1), t = me(), e !== null && (zr(e, 1, t), Ee(e, t));
          break;
        }
      }
      e = e.return;
    }
}
function R0(t, e, n) {
  var r = t.pingCache;
  r !== null && r.delete(e), e = me(), t.pingedLanes |= t.suspendedLanes & n, ie === t && (le & n) === n && (ee === 4 || ee === 3 && (le & 130023424) === le && 500 > G() - js ? Ht(t, 0) : $s |= n), Ee(t, e);
}
function ed(t, e) {
  e === 0 && (t.mode & 1 ? (e = Hr, Hr <<= 1, !(Hr & 130023424) && (Hr = 4194304)) : e = 1);
  var n = me();
  t = at(t, e), t !== null && (zr(t, e, n), Ee(t, n));
}
function F0(t) {
  var e = t.memoizedState, n = 0;
  e !== null && (n = e.retryLane), ed(t, n);
}
function L0(t, e) {
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
  r !== null && r.delete(e), ed(t, n);
}
var td;
td = function(t, e, n) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps || Se.current)
      we = !0;
    else {
      if (!(t.lanes & n) && !(e.flags & 128))
        return we = !1, x0(t, e, n);
      we = !!(t.flags & 131072);
    }
  else
    we = !1, U && e.flags & 1048576 && of(e, Li, e.index);
  switch (e.lanes = 0, e.tag) {
    case 2:
      var r = e.type;
      di(t, e), t = e.pendingProps;
      var i = Cn(e, de.current);
      kn(e, n), i = Rs(null, e, r, t, i, n);
      var o = Fs();
      return e.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (e.tag = 1, e.memoizedState = null, e.updateQueue = null, xe(r) ? (o = !0, Ri(e)) : o = !1, e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, _s(e), i.updater = ro, e.stateNode = i, i._reactInternals = e, Il(e, r, t, n), e = Fl(null, e, r, !0, o, n)) : (e.tag = 0, U && o && Ss(e), he(null, e, i, n), e = e.child), e;
    case 16:
      r = e.elementType;
      e: {
        switch (di(t, e), t = e.pendingProps, i = r._init, r = i(r._payload), e.type = r, i = e.tag = D0(r), t = Ue(r, t), i) {
          case 0:
            e = Rl(null, e, r, t, n);
            break e;
          case 1:
            e = la(null, e, r, t, n);
            break e;
          case 11:
            e = ia(null, e, r, t, n);
            break e;
          case 14:
            e = oa(null, e, r, Ue(r.type, t), n);
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
      return r = e.type, i = e.pendingProps, i = e.elementType === r ? i : Ue(r, i), Rl(t, e, r, i, n);
    case 1:
      return r = e.type, i = e.pendingProps, i = e.elementType === r ? i : Ue(r, i), la(t, e, r, i, n);
    case 3:
      e: {
        if (Bf(e), t === null)
          throw Error(k(387));
        r = e.pendingProps, o = e.memoizedState, i = o.element, ff(t, e), Bi(e, r, null, n);
        var l = e.memoizedState;
        if (r = l.element, o.isDehydrated)
          if (o = { element: r, isDehydrated: !1, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }, e.updateQueue.baseState = o, e.memoizedState = o, e.flags & 256) {
            i = _n(Error(k(423)), e), e = sa(t, e, r, n, i);
            break e;
          } else if (r !== i) {
            i = _n(Error(k(424)), e), e = sa(t, e, r, n, i);
            break e;
          } else
            for (Pe = xt(e.stateNode.containerInfo.firstChild), ze = e, U = !0, He = null, n = af(e, null, r, n), e.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Nn(), r === i) {
            e = ct(t, e, n);
            break e;
          }
          he(t, e, r, n);
        }
        e = e.child;
      }
      return e;
    case 5:
      return df(e), t === null && _l(e), r = e.type, i = e.pendingProps, o = t !== null ? t.memoizedProps : null, l = i.children, El(r, i) ? l = null : o !== null && El(r, o) && (e.flags |= 32), Df(t, e), he(t, e, l, n), e.child;
    case 6:
      return t === null && _l(e), null;
    case 13:
      return $f(t, e, n);
    case 4:
      return Ps(e, e.stateNode.containerInfo), r = e.pendingProps, t === null ? e.child = Mn(e, null, r, n) : he(t, e, r, n), e.child;
    case 11:
      return r = e.type, i = e.pendingProps, i = e.elementType === r ? i : Ue(r, i), ia(t, e, r, i, n);
    case 7:
      return he(t, e, e.pendingProps, n), e.child;
    case 8:
      return he(t, e, e.pendingProps.children, n), e.child;
    case 12:
      return he(t, e, e.pendingProps.children, n), e.child;
    case 10:
      e: {
        if (r = e.type._context, i = e.pendingProps, o = e.memoizedProps, l = i.value, $(Ai, r._currentValue), r._currentValue = l, o !== null)
          if (Ye(o.value, l)) {
            if (o.children === i.children && !Se.current) {
              e = ct(t, e, n);
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
                      u = ot(-1, n & -n), u.tag = 2;
                      var a = o.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var c = a.pending;
                        c === null ? u.next = u : (u.next = c.next, c.next = u), a.pending = u;
                      }
                    }
                    o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Pl(
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
                l.lanes |= n, s = l.alternate, s !== null && (s.lanes |= n), Pl(l, n, e), l = o.sibling;
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
        he(t, e, i.children, n), e = e.child;
      }
      return e;
    case 9:
      return i = e.type, r = e.pendingProps.children, kn(e, n), i = Be(i), r = r(i), e.flags |= 1, he(t, e, r, n), e.child;
    case 14:
      return r = e.type, i = Ue(r, e.pendingProps), i = Ue(r.type, i), oa(t, e, r, i, n);
    case 15:
      return Lf(t, e, e.type, e.pendingProps, n);
    case 17:
      return r = e.type, i = e.pendingProps, i = e.elementType === r ? i : Ue(r, i), di(t, e), e.tag = 1, xe(r) ? (t = !0, Ri(e)) : t = !1, kn(e, n), Of(e, r, i), Il(e, r, i, n), Fl(null, e, r, !0, t, n);
    case 19:
      return jf(t, e, n);
    case 22:
      return Af(t, e, n);
  }
  throw Error(k(156, e.tag));
};
function nd(t, e) {
  return _c(t, e);
}
function A0(t, e, n, r) {
  this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ae(t, e, n, r) {
  return new A0(t, e, n, r);
}
function Hs(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function D0(t) {
  if (typeof t == "function")
    return Hs(t) ? 1 : 0;
  if (t != null) {
    if (t = t.$$typeof, t === as)
      return 11;
    if (t === cs)
      return 14;
  }
  return 2;
}
function Mt(t, e) {
  var n = t.alternate;
  return n === null ? (n = Ae(t.tag, e, t.key, t.mode), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 14680064, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n;
}
function mi(t, e, n, r, i, o) {
  var l = 2;
  if (r = t, typeof t == "function")
    Hs(t) && (l = 1);
  else if (typeof t == "string")
    l = 5;
  else
    e:
      switch (t) {
        case rn:
          return Jt(n.children, i, o, e);
        case us:
          l = 8, i |= 8;
          break;
        case tl:
          return t = Ae(12, n, e, i | 2), t.elementType = tl, t.lanes = o, t;
        case nl:
          return t = Ae(13, n, e, i), t.elementType = nl, t.lanes = o, t;
        case rl:
          return t = Ae(19, n, e, i), t.elementType = rl, t.lanes = o, t;
        case fc:
          return lo(n, i, o, e);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case ac:
                l = 10;
                break e;
              case cc:
                l = 9;
                break e;
              case as:
                l = 11;
                break e;
              case cs:
                l = 14;
                break e;
              case pt:
                l = 16, r = null;
                break e;
            }
          throw Error(k(130, t == null ? t : typeof t, ""));
      }
  return e = Ae(l, n, e, i), e.elementType = t, e.type = r, e.lanes = o, e;
}
function Jt(t, e, n, r) {
  return t = Ae(7, t, r, e), t.lanes = n, t;
}
function lo(t, e, n, r) {
  return t = Ae(22, t, r, e), t.elementType = fc, t.lanes = n, t.stateNode = { isHidden: !1 }, t;
}
function Yo(t, e, n) {
  return t = Ae(6, t, null, e), t.lanes = n, t;
}
function Xo(t, e, n) {
  return e = Ae(4, t.children !== null ? t.children : [], t.key, e), e.lanes = n, e.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, e;
}
function B0(t, e, n, r, i) {
  this.tag = e, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Po(0), this.expirationTimes = Po(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Po(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
}
function Js(t, e, n, r, i, o, l, s, u) {
  return t = new B0(t, e, n, s, u), e === 1 ? (e = 1, o === !0 && (e |= 8)) : e = 0, o = Ae(3, null, null, e), t.current = o, o.stateNode = t, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, _s(o), t;
}
function $0(t, e, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: nn, key: r == null ? null : "" + r, children: t, containerInfo: e, implementation: n };
}
function rd(t) {
  if (!t)
    return _t;
  t = t._reactInternals;
  e: {
    if (bt(t) !== t || t.tag !== 1)
      throw Error(k(170));
    var e = t;
    do {
      switch (e.tag) {
        case 3:
          e = e.stateNode.context;
          break e;
        case 1:
          if (xe(e.type)) {
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
    if (xe(n))
      return nf(t, n, e);
  }
  return e;
}
function id(t, e, n, r, i, o, l, s, u) {
  return t = Js(n, r, !0, t, i, o, l, s, u), t.context = rd(null), n = t.current, r = me(), i = Nt(n), o = ot(r, i), o.callback = e ?? null, Et(n, o, i), t.current.lanes = i, zr(t, i, r), Ee(t, r), t;
}
function so(t, e, n, r) {
  var i = e.current, o = me(), l = Nt(i);
  return n = rd(n), e.context === null ? e.context = n : e.pendingContext = n, e = ot(o, l), e.payload = { element: t }, r = r === void 0 ? null : r, r !== null && (e.callback = r), t = Et(i, e, l), t !== null && (Ke(t, i, l, o), ai(t, i, l)), l;
}
function Qi(t) {
  if (t = t.current, !t.child)
    return null;
  switch (t.child.tag) {
    case 5:
      return t.child.stateNode;
    default:
      return t.child.stateNode;
  }
}
function ya(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function Qs(t, e) {
  ya(t, e), (t = t.alternate) && ya(t, e);
}
function j0() {
  return null;
}
var od = typeof reportError == "function" ? reportError : function(t) {
  console.error(t);
};
function Ks(t) {
  this._internalRoot = t;
}
uo.prototype.render = Ks.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null)
    throw Error(k(409));
  so(t, e, null, null);
};
uo.prototype.unmount = Ks.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    Gt(function() {
      so(null, t, null, null);
    }), e[ut] = null;
  }
};
function uo(t) {
  this._internalRoot = t;
}
uo.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = Lc();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < mt.length && e !== 0 && e < mt[n].priority; n++)
      ;
    mt.splice(n, 0, t), n === 0 && Dc(t);
  }
};
function Ys(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function ao(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 && (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "));
}
function va() {
}
function V0(t, e, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var a = Qi(l);
        o.call(a);
      };
    }
    var l = id(e, r, t, 0, null, !1, !1, "", va);
    return t._reactRootContainer = l, t[ut] = l.current, vr(t.nodeType === 8 ? t.parentNode : t), Gt(), l;
  }
  for (; i = t.lastChild; )
    t.removeChild(i);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var a = Qi(u);
      s.call(a);
    };
  }
  var u = Js(t, 0, !1, null, null, !1, !1, "", va);
  return t._reactRootContainer = u, t[ut] = u.current, vr(t.nodeType === 8 ? t.parentNode : t), Gt(function() {
    so(e, u, n, r);
  }), u;
}
function co(t, e, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var l = o;
    if (typeof i == "function") {
      var s = i;
      i = function() {
        var u = Qi(l);
        s.call(u);
      };
    }
    so(e, l, t, i);
  } else
    l = V0(n, e, t, i, r);
  return Qi(l);
}
Rc = function(t) {
  switch (t.tag) {
    case 3:
      var e = t.stateNode;
      if (e.current.memoizedState.isDehydrated) {
        var n = Xn(e.pendingLanes);
        n !== 0 && (ps(e, n | 1), Ee(e, G()), !(L & 6) && (Pn = G() + 500, Ot()));
      }
      break;
    case 13:
      Gt(function() {
        var r = at(t, 1);
        if (r !== null) {
          var i = me();
          Ke(r, t, 1, i);
        }
      }), Qs(t, 1);
  }
};
hs = function(t) {
  if (t.tag === 13) {
    var e = at(t, 134217728);
    if (e !== null) {
      var n = me();
      Ke(e, t, 134217728, n);
    }
    Qs(t, 134217728);
  }
};
Fc = function(t) {
  if (t.tag === 13) {
    var e = Nt(t), n = at(t, e);
    if (n !== null) {
      var r = me();
      Ke(n, t, e, r);
    }
    Qs(t, e);
  }
};
Lc = function() {
  return A;
};
Ac = function(t, e) {
  var n = A;
  try {
    return A = t, e();
  } finally {
    A = n;
  }
};
pl = function(t, e, n) {
  switch (e) {
    case "input":
      if (ll(t, n), e = n.name, n.type === "radio" && e != null) {
        for (n = t; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + e) + '][type="radio"]'), e = 0; e < n.length; e++) {
          var r = n[e];
          if (r !== t && r.form === t.form) {
            var i = eo(r);
            if (!i)
              throw Error(k(90));
            pc(r), ll(r, i);
          }
        }
      }
      break;
    case "textarea":
      mc(t, n);
      break;
    case "select":
      e = n.value, e != null && gn(t, !!n.multiple, e, !1);
  }
};
xc = Vs;
Ec = Gt;
var U0 = { usingClientEntryPoint: !1, Events: [Or, un, eo, kc, Sc, Vs] }, Hn = { findFiberByHostInstance: Vt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, W0 = { bundleType: Hn.bundleType, version: Hn.version, rendererPackageName: Hn.rendererPackageName, rendererConfig: Hn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ft.ReactCurrentDispatcher, findHostInstanceByFiber: function(t) {
  return t = Mc(t), t === null ? null : t.stateNode;
}, findFiberByHostInstance: Hn.findFiberByHostInstance || j0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ti = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ti.isDisabled && ti.supportsFiber)
    try {
      Gi = ti.inject(W0), be = ti;
    } catch {
    }
}
Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = U0;
Oe.createPortal = function(t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ys(e))
    throw Error(k(200));
  return $0(t, e, null, n);
};
Oe.createRoot = function(t, e) {
  if (!Ys(t))
    throw Error(k(299));
  var n = !1, r = "", i = od;
  return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (r = e.identifierPrefix), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = Js(t, 1, !1, null, null, n, !1, r, i), t[ut] = e.current, vr(t.nodeType === 8 ? t.parentNode : t), new Ks(e);
};
Oe.findDOMNode = function(t) {
  if (t == null)
    return null;
  if (t.nodeType === 1)
    return t;
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function" ? Error(k(188)) : (t = Object.keys(t).join(","), Error(k(268, t)));
  return t = Mc(e), t = t === null ? null : t.stateNode, t;
};
Oe.flushSync = function(t) {
  return Gt(t);
};
Oe.hydrate = function(t, e, n) {
  if (!ao(e))
    throw Error(k(200));
  return co(null, t, e, !0, n);
};
Oe.hydrateRoot = function(t, e, n) {
  if (!Ys(t))
    throw Error(k(405));
  var r = n != null && n.hydratedSources || null, i = !1, o = "", l = od;
  if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), e = id(e, null, t, 1, n ?? null, i, !1, o, l), t[ut] = e.current, vr(t), r)
    for (t = 0; t < r.length; t++)
      n = r[t], i = n._getVersion, i = i(n._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, i] : e.mutableSourceEagerHydrationData.push(
        n,
        i
      );
  return new uo(e);
};
Oe.render = function(t, e, n) {
  if (!ao(e))
    throw Error(k(200));
  return co(null, t, e, !1, n);
};
Oe.unmountComponentAtNode = function(t) {
  if (!ao(t))
    throw Error(k(40));
  return t._reactRootContainer ? (Gt(function() {
    co(null, null, t, !1, function() {
      t._reactRootContainer = null, t[ut] = null;
    });
  }), !0) : !1;
};
Oe.unstable_batchedUpdates = Vs;
Oe.unstable_renderSubtreeIntoContainer = function(t, e, n, r) {
  if (!ao(n))
    throw Error(k(200));
  if (t == null || t._reactInternals === void 0)
    throw Error(k(38));
  return co(t, e, n, !1, r);
};
Oe.version = "18.3.1-next-f1338f8080-20240426";
function ld() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ld);
    } catch (t) {
      console.error(t);
    }
}
ld(), oc.exports = Oe;
var sd = oc.exports;
const H0 = /* @__PURE__ */ Xa(sd), J0 = (...t) => (e) => {
  t.forEach((n) => {
    typeof n == "function" ? n(e) : n && (n.current = e);
  });
}, Q0 = ({ renderers: t }) => re.createElement(re.Fragment, null, Object.entries(t).map(([e, n]) => H0.createPortal(n.reactElement, n.element, e)));
class K0 extends re.Component {
  constructor(e) {
    super(e), this.editorContentRef = re.createRef(), this.initialized = !1, this.state = {
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
    this.initialized ? sd.flushSync(e) : e();
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
    return re.createElement(
      re.Fragment,
      null,
      re.createElement("div", { ref: J0(n, this.editorContentRef), ...r }),
      re.createElement(Q0, { renderers: this.state.renderers })
    );
  }
}
const Y0 = On.forwardRef((t, e) => {
  const n = re.useMemo(() => Math.floor(Math.random() * 4294967295).toString(), [t.editor]);
  return re.createElement(K0, {
    key: n,
    innerRef: e,
    ...t
  });
});
re.memo(Y0);
const X0 = On.createContext({
  editor: null
});
X0.Consumer;
const ud = On.createContext({
  onDragStart: void 0
}), G0 = () => On.useContext(ud), Z0 = re.forwardRef((t, e) => {
  const { onDragStart: n } = G0(), r = t.as || "div";
  return re.createElement(r, { ...t, ref: e, "data-node-view-wrapper": "", onDragStart: n, style: {
    whiteSpace: "normal",
    ...t.style
  } });
});
function q0(t) {
  return !!(typeof t == "function" && t.prototype && t.prototype.isReactComponent);
}
function b0(t) {
  var e;
  return typeof t == "object" && ((e = t.$$typeof) === null || e === void 0 ? void 0 : e.toString()) === "Symbol(react.forward_ref)";
}
class eg {
  constructor(e, { editor: n, props: r = {}, as: i = "div", className: o = "", attrs: l }) {
    this.ref = null, this.id = Math.floor(Math.random() * 4294967295).toString(), this.component = e, this.editor = n, this.props = r, this.element = document.createElement(i), this.element.classList.add("react-renderer"), o && this.element.classList.add(...o.split(" ")), l && Object.keys(l).forEach((s) => {
      this.element.setAttribute(s, l[s]);
    }), this.render();
  }
  render() {
    var e, n;
    const r = this.component, i = this.props;
    (q0(r) || b0(r)) && (i.ref = (o) => {
      this.ref = o;
    }), this.reactElement = re.createElement(r, { ...i }), (n = (e = this.editor) === null || e === void 0 ? void 0 : e.contentComponent) === null || n === void 0 || n.setRenderer(this.id, this);
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
class tg extends Ch {
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
      return re.createElement(
        re.Fragment,
        null,
        re.createElement(
          ud.Provider,
          { value: { onDragStart: s, nodeViewContentRef: u } },
          re.createElement(l, { ...o })
        )
      );
    };
    n.displayName = "ReactNodeView", this.node.isLeaf ? this.contentDOMElement = null : this.options.contentDOMElementTag ? this.contentDOMElement = document.createElement(this.options.contentDOMElementTag) : this.contentDOMElement = document.createElement(this.node.isInline ? "span" : "div"), this.contentDOMElement && (this.contentDOMElement.style.whiteSpace = "inherit");
    let r = this.node.isInline ? "span" : "div";
    this.options.as && (r = this.options.as);
    const { className: i = "" } = this.options;
    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this), this.editor.on("selectionUpdate", this.handleSelectionUpdate), this.renderer = new eg(n, {
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
function ng(t, e) {
  return (n) => n.editor.contentComponent ? new tg(t, n, e) : {};
}
const wa = "post-your-plan", rg = `Plan for today

{{#tasks}}<ul>
<li><p>{{slack-status}} {{title}}</p></li>
</ul>{{/tasks}}
`;
var O = "/Users/richardguerre/Projects/flow/plugins/slack/src/web.tsx";
const og = cd((t) => {
  const e = t.React, n = t.components;
  t.relay.graphql;
  const r = () => {
    var s, u;
    const l = t.operations.useLazyQuery({
      operationName: "workspaces"
    });
    return (s = l == null ? void 0 : l.data) != null && s.workspaces.length ? /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: O,
      lineNumber: 27,
      columnNumber: 7
    } }, (u = l == null ? void 0 : l.data) == null ? void 0 : u.workspaces.map((a) => /* @__PURE__ */ e.createElement("div", { className: "flex items-center gap-2 rounded max-w-2xl bg-background-50 shadow px-4 py-2", __self: void 0, __source: {
      fileName: O,
      lineNumber: 29,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement("img", { src: a.teamAvatar, __self: void 0, __source: {
      fileName: O,
      lineNumber: 30,
      columnNumber: 13
    } }), /* @__PURE__ */ e.createElement("img", { src: a.teamIcon, __self: void 0, __source: {
      fileName: O,
      lineNumber: 31,
      columnNumber: 13
    } }), /* @__PURE__ */ e.createElement("span", { __self: void 0, __source: {
      fileName: O,
      lineNumber: 32,
      columnNumber: 13
    } }, a.teamName)))) : /* @__PURE__ */ e.createElement("div", { className: "flex", __self: void 0, __source: {
      fileName: O,
      lineNumber: 20,
      columnNumber: 9
    } }, "No workspaces connected. Please connect an account to use the Slack plugin.");
  }, i = xi.create({
    name: "slack-status",
    inline: !0,
    group: "inline",
    atom: !0,
    parseHTML: () => [{
      tag: "slack-status"
    }],
    renderHTML: (l) => ["slack-status", tp(l.HTMLAttributes)],
    addNodeView: () => ng(o)
  }), o = (l) => /* @__PURE__ */ e.createElement(Z0, { as: "span", __self: void 0, __source: {
    fileName: O,
    lineNumber: 51,
    columnNumber: 7
  } }, /* @__PURE__ */ e.createElement(n.Tooltip, { __self: void 0, __source: {
    fileName: O,
    lineNumber: 52,
    columnNumber: 9
  } }, /* @__PURE__ */ e.createElement(n.TooltipTrigger, { className: t.cn("p-0.5 mr-1 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-1 h-5 w-5 inline-flex items-center justify-center", l.selected && "bg-background-300"), __self: void 0, __source: {
    fileName: O,
    lineNumber: 53,
    columnNumber: 11
  } }, /* @__PURE__ */ e.createElement(ig, { __self: void 0, __source: {
    fileName: O,
    lineNumber: 59,
    columnNumber: 13
  } })), /* @__PURE__ */ e.createElement(n.TooltipContent, { className: "max-w-xs", __self: void 0, __source: {
    fileName: O,
    lineNumber: 61,
    columnNumber: 11
  } }, "This is a placeholder for where the Slack plugin will add and automatically update the status of the task (✅ when done, ❌ when canceled.)")));
  return {
    name: "Slack",
    noteEditorTipTapExtensions: [i],
    settings: {
      "connect-accounts": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
          fileName: O,
          lineNumber: 78,
          columnNumber: 13
        } }, /* @__PURE__ */ e.createElement("a", { href: `${t.serverOrigin}/api/plugin/${t.pluginSlug}/auth`, __self: void 0, __source: {
          fileName: O,
          lineNumber: 79,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(n.Button, { __self: void 0, __source: {
          fileName: O,
          lineNumber: 80,
          columnNumber: 17
        } }, "Connect an account")), /* @__PURE__ */ e.createElement(n.ErrorBoundary, { fallbackRender: ({
          error: l
        }) => {
          var s, u, a;
          return ((a = (u = (s = l.cause) == null ? void 0 : s[0]) == null ? void 0 : u.extensions) == null ? void 0 : a.code) === "NOT_AUTHENTICATED" ? /* @__PURE__ */ e.createElement(e.Fragment, null) : /* @__PURE__ */ e.createElement("p", { className: "text-sm text-negative-600", __self: void 0, __source: {
            fileName: O,
            lineNumber: 87,
            columnNumber: 26
          } }, l.message);
        }, __self: void 0, __source: {
          fileName: O,
          lineNumber: 82,
          columnNumber: 15
        } }, /* @__PURE__ */ e.createElement(e.Suspense, { fallback: "Loading connected accounts...", __self: void 0, __source: {
          fileName: O,
          lineNumber: 90,
          columnNumber: 17
        } }, /* @__PURE__ */ e.createElement(r, { __self: void 0, __source: {
          fileName: O,
          lineNumber: 91,
          columnNumber: 19
        } }))))
      }
    },
    routineSteps: {
      [wa]: {
        name: "Post your plan",
        description: "Post your plan for the day in Slack channels.",
        component: (l) => {
          const [s] = l.templates, u = e.useRef(null), [a, c] = e.useState(s.rendered ?? ""), f = t.dayjs();
          return /* @__PURE__ */ e.createElement("div", { __self: void 0, __source: {
            fileName: O,
            lineNumber: 110,
            columnNumber: 13
          } }, /* @__PURE__ */ e.createElement(n.NoteEditor, { editorRef: u, slug: `slack_post-plan-${f.format("YYYY-MM-DD")}`, title: `Plan for ${f.format("MMMM D")}`, initialValue: a, onChange: ({
            html: d
          }) => c(d), __self: void 0, __source: {
            fileName: O,
            lineNumber: 111,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(l.BackButton, { __self: void 0, __source: {
            fileName: O,
            lineNumber: 118,
            columnNumber: 15
          } }), /* @__PURE__ */ e.createElement(l.NextButton, { __self: void 0, __source: {
            fileName: O,
            lineNumber: 119,
            columnNumber: 15
          } }));
        },
        renderSettings: async (l) => ({
          component: () => {
            const s = l.routineStep.templates[0], {
              control: u,
              handleSubmit: a
            } = t.reactHookForm.useForm({
              defaultValues: {
                template: {
                  content: (s == null ? void 0 : s.raw) ?? rg,
                  data: (s == null ? void 0 : s.metadata) ?? {}
                }
              }
            }), [c, f] = t.relay.useMutation(ka), d = async (g) => {
              c({
                variables: {
                  input: {
                    slug: (s == null ? void 0 : s.slug) ?? `slack-${wa}-${l.routineStep.id}`,
                    raw: g.template.content,
                    metadata: g.template.data ?? {}
                  }
                }
              });
            };
            return /* @__PURE__ */ e.createElement("form", { onSubmit: a(d), className: "flex flex-col gap-4", __self: void 0, __source: {
              fileName: O,
              lineNumber: 163,
              columnNumber: 17
            } }, /* @__PURE__ */ e.createElement(t.reactHookForm.Controller, { name: "template", control: u, render: ({
              field: g
            }) => /* @__PURE__ */ e.createElement(n.TemplateEditor, { initialTemplate: g.value, onChange: g.onChange, __self: void 0, __source: {
              fileName: O,
              lineNumber: 168,
              columnNumber: 23
            } }), __self: void 0, __source: {
              fileName: O,
              lineNumber: 164,
              columnNumber: 19
            } }), /* @__PURE__ */ e.createElement("div", { className: "flex items-center gap-2 self-end", __self: void 0, __source: {
              fileName: O,
              lineNumber: 174,
              columnNumber: 19
            } }, /* @__PURE__ */ e.createElement(n.Button, { type: "button", onClick: l.onCancel, __self: void 0, __source: {
              fileName: O,
              lineNumber: 175,
              columnNumber: 21
            } }, "Cancel"), /* @__PURE__ */ e.createElement(n.Button, { type: "submit", loading: f, __self: void 0, __source: {
              fileName: O,
              lineNumber: 178,
              columnNumber: 21
            } }, "Save")));
          }
        })
      }
    }
  };
}), ig = () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 123 123", fill: "none", xmlns: "http://www.w3.org/2000/svg", __self: void 0, __source: {
  fileName: O,
  lineNumber: 200,
  columnNumber: 3
} }, /* @__PURE__ */ React.createElement("path", { d: "M25.8 77.6C25.8 84.7 20 90.5 12.9 90.5C5.8 90.5 0 84.7 0 77.6C0 70.5 5.8 64.7 12.9 64.7H25.8V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
  fileName: O,
  lineNumber: 201,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M32.3 77.6C32.3 70.5 38.1001 64.7 45.2001 64.7C52.3001 64.7 58.1 70.5 58.1 77.6V109.9C58.1 117 52.3001 122.8 45.2001 122.8C38.1001 122.8 32.3 117 32.3 109.9V77.6Z", fill: "#E01E5A", __self: void 0, __source: {
  fileName: O,
  lineNumber: 205,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M45.2001 25.8C38.1001 25.8 32.3 20 32.3 12.9C32.3 5.8 38.1001 0 45.2001 0C52.3001 0 58.1 5.8 58.1 12.9V25.8H45.2001Z", fill: "#36C5F0", __self: void 0, __source: {
  fileName: O,
  lineNumber: 209,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M45.2 32.3C52.3 32.3 58.1 38.1 58.1 45.2C58.1 52.3 52.3 58.1 45.2 58.1H12.9C5.8 58.1 0 52.3 0 45.2C0 38.1 5.8 32.3 12.9 32.3H45.2Z", fill: "#36C5F0", __self: void 0, __source: {
  fileName: O,
  lineNumber: 213,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M97 45.2C97 38.1 102.8 32.3 109.9 32.3C117 32.3 122.8 38.1 122.8 45.2C122.8 52.3 117 58.1 109.9 58.1H97V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
  fileName: O,
  lineNumber: 217,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M90.5 45.2C90.5 52.3 84.6999 58.1 77.5999 58.1C70.4999 58.1 64.7 52.3 64.7 45.2V12.9C64.7 5.8 70.4999 0 77.5999 0C84.6999 0 90.5 5.8 90.5 12.9V45.2Z", fill: "#2EB67D", __self: void 0, __source: {
  fileName: O,
  lineNumber: 221,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M77.5999 97C84.6999 97 90.5 102.8 90.5 109.9C90.5 117 84.6999 122.8 77.5999 122.8C70.4999 122.8 64.7 117 64.7 109.9V97H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
  fileName: O,
  lineNumber: 225,
  columnNumber: 5
} }), /* @__PURE__ */ React.createElement("path", { d: "M77.5999 90.5C70.4999 90.5 64.7 84.7 64.7 77.6C64.7 70.5 70.4999 64.7 77.5999 64.7H109.9C117 64.7 122.8 70.5 122.8 77.6C122.8 84.7 117 90.5 109.9 90.5H77.5999Z", fill: "#ECB22E", __self: void 0, __source: {
  fileName: O,
  lineNumber: 229,
  columnNumber: 5
} }));
export {
  og as default
};
