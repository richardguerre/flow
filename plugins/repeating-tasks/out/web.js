const xn = (t) => ({ plugin: t });
function pr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var R = {};
Object.defineProperty(R, "__esModule", { value: !0 });
class le extends Error {
}
class Cn extends le {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class In extends le {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class Fn extends le {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class me extends le {
}
class gr extends le {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class A extends le {
}
class B extends le {
  constructor() {
    super("Zone is an abstract class");
  }
}
const h = "numeric", G = "short", Z = "long", Ge = {
  year: h,
  month: h,
  day: h
}, _r = {
  year: h,
  month: G,
  day: h
}, Vn = {
  year: h,
  month: G,
  day: h,
  weekday: G
}, vr = {
  year: h,
  month: Z,
  day: h
}, wr = {
  year: h,
  month: Z,
  day: h,
  weekday: Z
}, Nr = {
  hour: h,
  minute: h
}, br = {
  hour: h,
  minute: h,
  second: h
}, kr = {
  hour: h,
  minute: h,
  second: h,
  timeZoneName: G
}, Tr = {
  hour: h,
  minute: h,
  second: h,
  timeZoneName: Z
}, Sr = {
  hour: h,
  minute: h,
  hourCycle: "h23"
}, Or = {
  hour: h,
  minute: h,
  second: h,
  hourCycle: "h23"
}, Er = {
  hour: h,
  minute: h,
  second: h,
  hourCycle: "h23",
  timeZoneName: G
}, Dr = {
  hour: h,
  minute: h,
  second: h,
  hourCycle: "h23",
  timeZoneName: Z
}, Mr = {
  year: h,
  month: h,
  day: h,
  hour: h,
  minute: h
}, xr = {
  year: h,
  month: h,
  day: h,
  hour: h,
  minute: h,
  second: h
}, Cr = {
  year: h,
  month: G,
  day: h,
  hour: h,
  minute: h
}, Ir = {
  year: h,
  month: G,
  day: h,
  hour: h,
  minute: h,
  second: h
}, Wn = {
  year: h,
  month: G,
  day: h,
  weekday: G,
  hour: h,
  minute: h
}, Fr = {
  year: h,
  month: Z,
  day: h,
  hour: h,
  minute: h,
  timeZoneName: G
}, Vr = {
  year: h,
  month: Z,
  day: h,
  hour: h,
  minute: h,
  second: h,
  timeZoneName: G
}, Wr = {
  year: h,
  month: Z,
  day: h,
  weekday: Z,
  hour: h,
  minute: h,
  timeZoneName: Z
}, $r = {
  year: h,
  month: Z,
  day: h,
  weekday: Z,
  hour: h,
  minute: h,
  second: h,
  timeZoneName: Z
};
class _e {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new B();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new B();
  }
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new B();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, r) {
    throw new B();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, r) {
    throw new B();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new B();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new B();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new B();
  }
}
let it = null;
class Ie extends _e {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return it === null && (it = new Ie()), it;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(e, {
    format: r,
    locale: n
  }) {
    return Yr(e, r, n);
  }
  /** @override **/
  formatOffset(e, r) {
    return xe(this.offset(e), r);
  }
  /** @override **/
  offset(e) {
    return -new Date(e).getTimezoneOffset();
  }
  /** @override **/
  equals(e) {
    return e.type === "system";
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
let qe = {};
function $n(t) {
  return qe[t] || (qe[t] = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: t,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  })), qe[t];
}
const Ln = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function zn(t, e) {
  const r = t.format(e).replace(/\u200E/g, ""), n = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(r), [, s, a, i, o, u, l, f] = n;
  return [i, s, a, o, u, l, f];
}
function An(t, e) {
  const r = t.formatToParts(e), n = [];
  for (let s = 0; s < r.length; s++) {
    const {
      type: a,
      value: i
    } = r[s], o = Ln[a];
    a === "era" ? n[o] = i : k(o) || (n[o] = parseInt(i, 10));
  }
  return n;
}
let Le = {};
class J extends _e {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    return Le[e] || (Le[e] = new J(e)), Le[e];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    Le = {}, qe = {};
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
   * @return {boolean}
   */
  static isValidSpecifier(e) {
    return this.isValidZone(e);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(e) {
    if (!e)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: e
      }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(e) {
    super(), this.zoneName = e, this.valid = J.isValidZone(e);
  }
  /** @override **/
  get type() {
    return "iana";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(e, {
    format: r,
    locale: n
  }) {
    return Yr(e, r, n, this.name);
  }
  /** @override **/
  formatOffset(e, r) {
    return xe(this.offset(e), r);
  }
  /** @override **/
  offset(e) {
    const r = new Date(e);
    if (isNaN(r))
      return NaN;
    const n = $n(this.name);
    let [s, a, i, o, u, l, f] = n.formatToParts ? An(n, r) : zn(n, r);
    o === "BC" && (s = -Math.abs(s) + 1);
    const _ = et({
      year: s,
      month: a,
      day: i,
      hour: u === 24 ? 0 : u,
      minute: l,
      second: f,
      millisecond: 0
    });
    let c = +r;
    const d = c % 1e3;
    return c -= d >= 0 ? d : 1e3 + d, (_ - c) / (60 * 1e3);
  }
  /** @override **/
  equals(e) {
    return e.type === "iana" && e.name === this.name;
  }
  /** @override **/
  get isValid() {
    return this.valid;
  }
}
let Ft = {};
function Zn(t, e = {}) {
  const r = JSON.stringify([t, e]);
  let n = Ft[r];
  return n || (n = new Intl.ListFormat(t, e), Ft[r] = n), n;
}
let yt = {};
function pt(t, e = {}) {
  const r = JSON.stringify([t, e]);
  let n = yt[r];
  return n || (n = new Intl.DateTimeFormat(t, e), yt[r] = n), n;
}
let gt = {};
function Rn(t, e = {}) {
  const r = JSON.stringify([t, e]);
  let n = gt[r];
  return n || (n = new Intl.NumberFormat(t, e), gt[r] = n), n;
}
let _t = {};
function Un(t, e = {}) {
  const {
    base: r,
    ...n
  } = e, s = JSON.stringify([t, n]);
  let a = _t[s];
  return a || (a = new Intl.RelativeTimeFormat(t, e), _t[s] = a), a;
}
let De = null;
function Hn() {
  return De || (De = new Intl.DateTimeFormat().resolvedOptions().locale, De);
}
let Vt = {};
function qn(t) {
  let e = Vt[t];
  if (!e) {
    const r = new Intl.Locale(t);
    e = "getWeekInfo" in r ? r.getWeekInfo() : r.weekInfo, Vt[t] = e;
  }
  return e;
}
function Pn(t) {
  const e = t.indexOf("-x-");
  e !== -1 && (t = t.substring(0, e));
  const r = t.indexOf("-u-");
  if (r === -1)
    return [t];
  {
    let n, s;
    try {
      n = pt(t).resolvedOptions(), s = t;
    } catch {
      const u = t.substring(0, r);
      n = pt(u).resolvedOptions(), s = u;
    }
    const {
      numberingSystem: a,
      calendar: i
    } = n;
    return [s, a, i];
  }
}
function Yn(t, e, r) {
  return (r || e) && (t.includes("-u-") || (t += "-u"), r && (t += `-ca-${r}`), e && (t += `-nu-${e}`)), t;
}
function jn(t) {
  const e = [];
  for (let r = 1; r <= 12; r++) {
    const n = T.utc(2009, r, 1);
    e.push(t(n));
  }
  return e;
}
function Gn(t) {
  const e = [];
  for (let r = 1; r <= 7; r++) {
    const n = T.utc(2016, 11, 13 + r);
    e.push(t(n));
  }
  return e;
}
function ze(t, e, r, n) {
  const s = t.listingMode();
  return s === "error" ? null : s === "en" ? r(e) : n(e);
}
function Jn(t) {
  return t.numberingSystem && t.numberingSystem !== "latn" ? !1 : t.numberingSystem === "latn" || !t.locale || t.locale.startsWith("en") || new Intl.DateTimeFormat(t.intl).resolvedOptions().numberingSystem === "latn";
}
class Bn {
  constructor(e, r, n) {
    this.padTo = n.padTo || 0, this.floor = n.floor || !1;
    const {
      padTo: s,
      floor: a,
      ...i
    } = n;
    if (!r || Object.keys(i).length > 0) {
      const o = {
        useGrouping: !1,
        ...n
      };
      n.padTo > 0 && (o.minimumIntegerDigits = n.padTo), this.inf = Rn(e, o);
    }
  }
  format(e) {
    if (this.inf) {
      const r = this.floor ? Math.floor(e) : e;
      return this.inf.format(r);
    } else {
      const r = this.floor ? Math.floor(e) : Tt(e, 3);
      return V(r, this.padTo);
    }
  }
}
class Qn {
  constructor(e, r, n) {
    this.opts = n, this.originalZone = void 0;
    let s;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const i = -1 * (e.offset / 60), o = i >= 0 ? `Etc/GMT+${i}` : `Etc/GMT${i}`;
      e.offset !== 0 && J.create(o).valid ? (s = o, this.dt = e) : (s = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({
        minutes: e.offset
      }), this.originalZone = e.zone);
    } else
      e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, s = e.zone.name) : (s = "UTC", this.dt = e.setZone("UTC").plus({
        minutes: e.offset
      }), this.originalZone = e.zone);
    const a = {
      ...this.opts
    };
    a.timeZone = a.timeZone || s, this.dtf = pt(r, a);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({
      value: e
    }) => e).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const e = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? e.map((r) => {
      if (r.type === "timeZoneName") {
        const n = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...r,
          value: n
        };
      } else
        return r;
    }) : e;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class Kn {
  constructor(e, r, n) {
    this.opts = {
      style: "long",
      ...n
    }, !r && qr() && (this.rtf = Un(e, n));
  }
  format(e, r) {
    return this.rtf ? this.rtf.format(e, r) : gs(r, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, r) {
    return this.rtf ? this.rtf.formatToParts(e, r) : [];
  }
}
const Xn = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class M {
  static fromOpts(e) {
    return M.create(e.locale, e.numberingSystem, e.outputCalendar, e.weekSettings, e.defaultToEN);
  }
  static create(e, r, n, s, a = !1) {
    const i = e || F.defaultLocale, o = i || (a ? "en-US" : Hn()), u = r || F.defaultNumberingSystem, l = n || F.defaultOutputCalendar, f = vt(s) || F.defaultWeekSettings;
    return new M(o, u, l, f, i);
  }
  static resetCache() {
    De = null, yt = {}, gt = {}, _t = {};
  }
  static fromObject({
    locale: e,
    numberingSystem: r,
    outputCalendar: n,
    weekSettings: s
  } = {}) {
    return M.create(e, r, n, s);
  }
  constructor(e, r, n, s, a) {
    const [i, o, u] = Pn(e);
    this.locale = i, this.numberingSystem = r || o || null, this.outputCalendar = n || u || null, this.weekSettings = s, this.intl = Yn(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = {
      format: {},
      standalone: {}
    }, this.monthsCache = {
      format: {},
      standalone: {}
    }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = a, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = Jn(this)), this.fastNumbersCached;
  }
  listingMode() {
    const e = this.isEnglish(), r = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && r ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0 ? this : M.create(e.locale || this.specifiedLocale, e.numberingSystem || this.numberingSystem, e.outputCalendar || this.outputCalendar, vt(e.weekSettings) || this.weekSettings, e.defaultToEN || !1);
  }
  redefaultToEN(e = {}) {
    return this.clone({
      ...e,
      defaultToEN: !0
    });
  }
  redefaultToSystem(e = {}) {
    return this.clone({
      ...e,
      defaultToEN: !1
    });
  }
  months(e, r = !1) {
    return ze(this, e, Jr, () => {
      const n = r ? {
        month: e,
        day: "numeric"
      } : {
        month: e
      }, s = r ? "format" : "standalone";
      return this.monthsCache[s][e] || (this.monthsCache[s][e] = jn((a) => this.extract(a, n, "month"))), this.monthsCache[s][e];
    });
  }
  weekdays(e, r = !1) {
    return ze(this, e, Kr, () => {
      const n = r ? {
        weekday: e,
        year: "numeric",
        month: "long",
        day: "numeric"
      } : {
        weekday: e
      }, s = r ? "format" : "standalone";
      return this.weekdaysCache[s][e] || (this.weekdaysCache[s][e] = Gn((a) => this.extract(a, n, "weekday"))), this.weekdaysCache[s][e];
    });
  }
  meridiems() {
    return ze(this, void 0, () => Xr, () => {
      if (!this.meridiemCache) {
        const e = {
          hour: "numeric",
          hourCycle: "h12"
        };
        this.meridiemCache = [T.utc(2016, 11, 13, 9), T.utc(2016, 11, 13, 19)].map((r) => this.extract(r, e, "dayperiod"));
      }
      return this.meridiemCache;
    });
  }
  eras(e) {
    return ze(this, e, en, () => {
      const r = {
        era: e
      };
      return this.eraCache[e] || (this.eraCache[e] = [T.utc(-40, 1, 1), T.utc(2017, 1, 1)].map((n) => this.extract(n, r, "era"))), this.eraCache[e];
    });
  }
  extract(e, r, n) {
    const s = this.dtFormatter(e, r), a = s.formatToParts(), i = a.find((o) => o.type.toLowerCase() === n);
    return i ? i.value : null;
  }
  numberFormatter(e = {}) {
    return new Bn(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, r = {}) {
    return new Qn(e, this.intl, r);
  }
  relFormatter(e = {}) {
    return new Kn(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return Zn(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : Pr() ? qn(this.locale) : Xn;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(e) {
    return this.locale === e.locale && this.numberingSystem === e.numberingSystem && this.outputCalendar === e.outputCalendar;
  }
}
let at = null;
class $ extends _e {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return at === null && (at = new $(0)), at;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? $.utcInstance : new $(e);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(e) {
    if (e) {
      const r = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r)
        return new $(tt(r[1], r[2]));
    }
    return null;
  }
  constructor(e) {
    super(), this.fixed = e;
  }
  /** @override **/
  get type() {
    return "fixed";
  }
  /** @override **/
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${xe(this.fixed, "narrow")}`;
  }
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${xe(-this.fixed, "narrow")}`;
  }
  /** @override **/
  offsetName() {
    return this.name;
  }
  /** @override **/
  formatOffset(e, r) {
    return xe(this.fixed, r);
  }
  /** @override **/
  get isUniversal() {
    return !0;
  }
  /** @override **/
  offset() {
    return this.fixed;
  }
  /** @override **/
  equals(e) {
    return e.type === "fixed" && e.fixed === this.fixed;
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
class Lr extends _e {
  constructor(e) {
    super(), this.zoneName = e;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return !1;
  }
  /** @override **/
  get isValid() {
    return !1;
  }
}
function X(t, e) {
  if (k(t) || t === null)
    return e;
  if (t instanceof _e)
    return t;
  if (rs(t)) {
    const r = t.toLowerCase();
    return r === "default" ? e : r === "local" || r === "system" ? Ie.instance : r === "utc" || r === "gmt" ? $.utcInstance : $.parseSpecifier(r) || J.create(t);
  } else
    return ae(t) ? $.instance(t) : typeof t == "object" && "offset" in t && typeof t.offset == "function" ? t : new Lr(t);
}
let Wt = () => Date.now(), $t = "system", Lt = null, zt = null, At = null, Zt = 60, Rt, Ut = null;
class F {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return Wt;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    Wt = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    $t = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return X($t, Ie.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return Lt;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(e) {
    Lt = e;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return zt;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    zt = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return At;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    At = e;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return Ut;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    Ut = vt(e);
  }
  /**
   * Get the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return Zt;
  }
  /**
   * Set the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // cut-off year is 0, so all 'yy' are interpreted as current century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 1949; '50' -> 2050
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(e) {
    Zt = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Rt;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    Rt = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    M.resetCache(), J.resetCache();
  }
}
class j {
  constructor(e, r) {
    this.reason = e, this.explanation = r;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const zr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ar = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function H(t, e) {
  return new j("unit out of range", `you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`);
}
function Nt(t, e, r) {
  const n = new Date(Date.UTC(t, e - 1, r));
  t < 100 && t >= 0 && n.setUTCFullYear(n.getUTCFullYear() - 1900);
  const s = n.getUTCDay();
  return s === 0 ? 7 : s;
}
function Zr(t, e, r) {
  return r + (Fe(t) ? Ar : zr)[e - 1];
}
function Rr(t, e) {
  const r = Fe(t) ? Ar : zr, n = r.findIndex((a) => a < e), s = e - r[n];
  return {
    month: n + 1,
    day: s
  };
}
function bt(t, e) {
  return (t - e + 7) % 7 + 1;
}
function Je(t, e = 4, r = 1) {
  const {
    year: n,
    month: s,
    day: a
  } = t, i = Zr(n, s, a), o = bt(Nt(n, s, a), r);
  let u = Math.floor((i - o + 14 - e) / 7), l;
  return u < 1 ? (l = n - 1, u = Ce(l, e, r)) : u > Ce(n, e, r) ? (l = n + 1, u = 1) : l = n, {
    weekYear: l,
    weekNumber: u,
    weekday: o,
    ...rt(t)
  };
}
function Ht(t, e = 4, r = 1) {
  const {
    weekYear: n,
    weekNumber: s,
    weekday: a
  } = t, i = bt(Nt(n, 1, e), r), o = he(n);
  let u = s * 7 + a - i - 7 + e, l;
  u < 1 ? (l = n - 1, u += he(l)) : u > o ? (l = n + 1, u -= he(n)) : l = n;
  const {
    month: f,
    day: p
  } = Rr(l, u);
  return {
    year: l,
    month: f,
    day: p,
    ...rt(t)
  };
}
function ot(t) {
  const {
    year: e,
    month: r,
    day: n
  } = t, s = Zr(e, r, n);
  return {
    year: e,
    ordinal: s,
    ...rt(t)
  };
}
function qt(t) {
  const {
    year: e,
    ordinal: r
  } = t, {
    month: n,
    day: s
  } = Rr(e, r);
  return {
    year: e,
    month: n,
    day: s,
    ...rt(t)
  };
}
function Pt(t, e) {
  if (!k(t.localWeekday) || !k(t.localWeekNumber) || !k(t.localWeekYear)) {
    if (!k(t.weekday) || !k(t.weekNumber) || !k(t.weekYear))
      throw new me("Cannot mix locale-based week fields with ISO-based week fields");
    return k(t.localWeekday) || (t.weekday = t.localWeekday), k(t.localWeekNumber) || (t.weekNumber = t.localWeekNumber), k(t.localWeekYear) || (t.weekYear = t.localWeekYear), delete t.localWeekday, delete t.localWeekNumber, delete t.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return {
      minDaysInFirstWeek: 4,
      startOfWeek: 1
    };
}
function es(t, e = 4, r = 1) {
  const n = Xe(t.weekYear), s = q(t.weekNumber, 1, Ce(t.weekYear, e, r)), a = q(t.weekday, 1, 7);
  return n ? s ? a ? !1 : H("weekday", t.weekday) : H("week", t.weekNumber) : H("weekYear", t.weekYear);
}
function ts(t) {
  const e = Xe(t.year), r = q(t.ordinal, 1, he(t.year));
  return e ? r ? !1 : H("ordinal", t.ordinal) : H("year", t.year);
}
function Ur(t) {
  const e = Xe(t.year), r = q(t.month, 1, 12), n = q(t.day, 1, Be(t.year, t.month));
  return e ? r ? n ? !1 : H("day", t.day) : H("month", t.month) : H("year", t.year);
}
function Hr(t) {
  const {
    hour: e,
    minute: r,
    second: n,
    millisecond: s
  } = t, a = q(e, 0, 23) || e === 24 && r === 0 && n === 0 && s === 0, i = q(r, 0, 59), o = q(n, 0, 59), u = q(s, 0, 999);
  return a ? i ? o ? u ? !1 : H("millisecond", s) : H("second", n) : H("minute", r) : H("hour", e);
}
function k(t) {
  return typeof t > "u";
}
function ae(t) {
  return typeof t == "number";
}
function Xe(t) {
  return typeof t == "number" && t % 1 === 0;
}
function rs(t) {
  return typeof t == "string";
}
function ns(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function qr() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function Pr() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function ss(t) {
  return Array.isArray(t) ? t : [t];
}
function Yt(t, e, r) {
  if (t.length !== 0)
    return t.reduce((n, s) => {
      const a = [e(s), s];
      return n && r(n[0], a[0]) === n[0] ? n : a;
    }, null)[1];
}
function is(t, e) {
  return e.reduce((r, n) => (r[n] = t[n], r), {});
}
function pe(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function vt(t) {
  if (t == null)
    return null;
  if (typeof t != "object")
    throw new A("Week settings must be an object");
  if (!q(t.firstDay, 1, 7) || !q(t.minimalDays, 1, 7) || !Array.isArray(t.weekend) || t.weekend.some((e) => !q(e, 1, 7)))
    throw new A("Invalid week settings");
  return {
    firstDay: t.firstDay,
    minimalDays: t.minimalDays,
    weekend: Array.from(t.weekend)
  };
}
function q(t, e, r) {
  return Xe(t) && t >= e && t <= r;
}
function as(t, e) {
  return t - e * Math.floor(t / e);
}
function V(t, e = 2) {
  const r = t < 0;
  let n;
  return r ? n = "-" + ("" + -t).padStart(e, "0") : n = ("" + t).padStart(e, "0"), n;
}
function K(t) {
  if (!(k(t) || t === null || t === ""))
    return parseInt(t, 10);
}
function te(t) {
  if (!(k(t) || t === null || t === ""))
    return parseFloat(t);
}
function kt(t) {
  if (!(k(t) || t === null || t === "")) {
    const e = parseFloat("0." + t) * 1e3;
    return Math.floor(e);
  }
}
function Tt(t, e, r = !1) {
  const n = 10 ** e;
  return (r ? Math.trunc : Math.round)(t * n) / n;
}
function Fe(t) {
  return t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0);
}
function he(t) {
  return Fe(t) ? 366 : 365;
}
function Be(t, e) {
  const r = as(e - 1, 12) + 1, n = t + (e - r) / 12;
  return r === 2 ? Fe(n) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][r - 1];
}
function et(t) {
  let e = Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, t.second, t.millisecond);
  return t.year < 100 && t.year >= 0 && (e = new Date(e), e.setUTCFullYear(t.year, t.month - 1, t.day)), +e;
}
function jt(t, e, r) {
  return -bt(Nt(t, 1, e), r) + e - 1;
}
function Ce(t, e = 4, r = 1) {
  const n = jt(t, e, r), s = jt(t + 1, e, r);
  return (he(t) - n + s) / 7;
}
function wt(t) {
  return t > 99 ? t : t > F.twoDigitCutoffYear ? 1900 + t : 2e3 + t;
}
function Yr(t, e, r, n = null) {
  const s = new Date(t), a = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  n && (a.timeZone = n);
  const i = {
    timeZoneName: e,
    ...a
  }, o = new Intl.DateTimeFormat(r, i).formatToParts(s).find((u) => u.type.toLowerCase() === "timezonename");
  return o ? o.value : null;
}
function tt(t, e) {
  let r = parseInt(t, 10);
  Number.isNaN(r) && (r = 0);
  const n = parseInt(e, 10) || 0, s = r < 0 || Object.is(r, -0) ? -n : n;
  return r * 60 + s;
}
function jr(t) {
  const e = Number(t);
  if (typeof t == "boolean" || t === "" || Number.isNaN(e))
    throw new A(`Invalid unit value ${t}`);
  return e;
}
function Qe(t, e) {
  const r = {};
  for (const n in t)
    if (pe(t, n)) {
      const s = t[n];
      if (s == null)
        continue;
      r[e(n)] = jr(s);
    }
  return r;
}
function xe(t, e) {
  const r = Math.trunc(Math.abs(t / 60)), n = Math.trunc(Math.abs(t % 60)), s = t >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${s}${V(r, 2)}:${V(n, 2)}`;
    case "narrow":
      return `${s}${r}${n > 0 ? `:${n}` : ""}`;
    case "techie":
      return `${s}${V(r, 2)}${V(n, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
function rt(t) {
  return is(t, ["hour", "minute", "second", "millisecond"]);
}
const os = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Gr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], us = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function Jr(t) {
  switch (t) {
    case "narrow":
      return [...us];
    case "short":
      return [...Gr];
    case "long":
      return [...os];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const Br = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], Qr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], ls = ["M", "T", "W", "T", "F", "S", "S"];
function Kr(t) {
  switch (t) {
    case "narrow":
      return [...ls];
    case "short":
      return [...Qr];
    case "long":
      return [...Br];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const Xr = ["AM", "PM"], cs = ["Before Christ", "Anno Domini"], fs = ["BC", "AD"], ds = ["B", "A"];
function en(t) {
  switch (t) {
    case "narrow":
      return [...ds];
    case "short":
      return [...fs];
    case "long":
      return [...cs];
    default:
      return null;
  }
}
function ms(t) {
  return Xr[t.hour < 12 ? 0 : 1];
}
function hs(t, e) {
  return Kr(e)[t.weekday - 1];
}
function ys(t, e) {
  return Jr(e)[t.month - 1];
}
function ps(t, e) {
  return en(e)[t.year < 0 ? 0 : 1];
}
function gs(t, e, r = "always", n = !1) {
  const s = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, a = ["hours", "minutes", "seconds"].indexOf(t) === -1;
  if (r === "auto" && a) {
    const p = t === "days";
    switch (e) {
      case 1:
        return p ? "tomorrow" : `next ${s[t][0]}`;
      case -1:
        return p ? "yesterday" : `last ${s[t][0]}`;
      case 0:
        return p ? "today" : `this ${s[t][0]}`;
    }
  }
  const i = Object.is(e, -0) || e < 0, o = Math.abs(e), u = o === 1, l = s[t], f = n ? u ? l[1] : l[2] || l[1] : u ? s[t][0] : t;
  return i ? `${o} ${f} ago` : `in ${o} ${f}`;
}
function Gt(t, e) {
  let r = "";
  for (const n of t)
    n.literal ? r += n.val : r += e(n.val);
  return r;
}
const _s = {
  D: Ge,
  DD: _r,
  DDD: vr,
  DDDD: wr,
  t: Nr,
  tt: br,
  ttt: kr,
  tttt: Tr,
  T: Sr,
  TT: Or,
  TTT: Er,
  TTTT: Dr,
  f: Mr,
  ff: Cr,
  fff: Fr,
  ffff: Wr,
  F: xr,
  FF: Ir,
  FFF: Vr,
  FFFF: $r
};
class W {
  static create(e, r = {}) {
    return new W(e, r);
  }
  static parseFormat(e) {
    let r = null, n = "", s = !1;
    const a = [];
    for (let i = 0; i < e.length; i++) {
      const o = e.charAt(i);
      o === "'" ? (n.length > 0 && a.push({
        literal: s || /^\s+$/.test(n),
        val: n
      }), r = null, n = "", s = !s) : s || o === r ? n += o : (n.length > 0 && a.push({
        literal: /^\s+$/.test(n),
        val: n
      }), n = o, r = o);
    }
    return n.length > 0 && a.push({
      literal: s || /^\s+$/.test(n),
      val: n
    }), a;
  }
  static macroTokenToFormatOpts(e) {
    return _s[e];
  }
  constructor(e, r) {
    this.opts = r, this.loc = e, this.systemLoc = null;
  }
  formatWithSystemDefault(e, r) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(e, {
      ...this.opts,
      ...r
    }).format();
  }
  dtFormatter(e, r = {}) {
    return this.loc.dtFormatter(e, {
      ...this.opts,
      ...r
    });
  }
  formatDateTime(e, r) {
    return this.dtFormatter(e, r).format();
  }
  formatDateTimeParts(e, r) {
    return this.dtFormatter(e, r).formatToParts();
  }
  formatInterval(e, r) {
    return this.dtFormatter(e.start, r).dtf.formatRange(e.start.toJSDate(), e.end.toJSDate());
  }
  resolvedOptions(e, r) {
    return this.dtFormatter(e, r).resolvedOptions();
  }
  num(e, r = 0) {
    if (this.opts.forceSimple)
      return V(e, r);
    const n = {
      ...this.opts
    };
    return r > 0 && (n.padTo = r), this.loc.numberFormatter(n).format(e);
  }
  formatDateTimeFromString(e, r) {
    const n = this.loc.listingMode() === "en", s = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", a = (c, d) => this.loc.extract(e, c, d), i = (c) => e.isOffsetFixed && e.offset === 0 && c.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, c.format) : "", o = () => n ? ms(e) : a({
      hour: "numeric",
      hourCycle: "h12"
    }, "dayperiod"), u = (c, d) => n ? ys(e, c) : a(d ? {
      month: c
    } : {
      month: c,
      day: "numeric"
    }, "month"), l = (c, d) => n ? hs(e, c) : a(d ? {
      weekday: c
    } : {
      weekday: c,
      month: "long",
      day: "numeric"
    }, "weekday"), f = (c) => {
      const d = W.macroTokenToFormatOpts(c);
      return d ? this.formatWithSystemDefault(e, d) : c;
    }, p = (c) => n ? ps(e, c) : a({
      era: c
    }, "era"), _ = (c) => {
      switch (c) {
        case "S":
          return this.num(e.millisecond);
        case "u":
        case "SSS":
          return this.num(e.millisecond, 3);
        case "s":
          return this.num(e.second);
        case "ss":
          return this.num(e.second, 2);
        case "uu":
          return this.num(Math.floor(e.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(e.millisecond / 100));
        case "m":
          return this.num(e.minute);
        case "mm":
          return this.num(e.minute, 2);
        case "h":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12);
        case "hh":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12, 2);
        case "H":
          return this.num(e.hour);
        case "HH":
          return this.num(e.hour, 2);
        case "Z":
          return i({
            format: "narrow",
            allowZ: this.opts.allowZ
          });
        case "ZZ":
          return i({
            format: "short",
            allowZ: this.opts.allowZ
          });
        case "ZZZ":
          return i({
            format: "techie",
            allowZ: this.opts.allowZ
          });
        case "ZZZZ":
          return e.zone.offsetName(e.ts, {
            format: "short",
            locale: this.loc.locale
          });
        case "ZZZZZ":
          return e.zone.offsetName(e.ts, {
            format: "long",
            locale: this.loc.locale
          });
        case "z":
          return e.zoneName;
        case "a":
          return o();
        case "d":
          return s ? a({
            day: "numeric"
          }, "day") : this.num(e.day);
        case "dd":
          return s ? a({
            day: "2-digit"
          }, "day") : this.num(e.day, 2);
        case "c":
          return this.num(e.weekday);
        case "ccc":
          return l("short", !0);
        case "cccc":
          return l("long", !0);
        case "ccccc":
          return l("narrow", !0);
        case "E":
          return this.num(e.weekday);
        case "EEE":
          return l("short", !1);
        case "EEEE":
          return l("long", !1);
        case "EEEEE":
          return l("narrow", !1);
        case "L":
          return s ? a({
            month: "numeric",
            day: "numeric"
          }, "month") : this.num(e.month);
        case "LL":
          return s ? a({
            month: "2-digit",
            day: "numeric"
          }, "month") : this.num(e.month, 2);
        case "LLL":
          return u("short", !0);
        case "LLLL":
          return u("long", !0);
        case "LLLLL":
          return u("narrow", !0);
        case "M":
          return s ? a({
            month: "numeric"
          }, "month") : this.num(e.month);
        case "MM":
          return s ? a({
            month: "2-digit"
          }, "month") : this.num(e.month, 2);
        case "MMM":
          return u("short", !1);
        case "MMMM":
          return u("long", !1);
        case "MMMMM":
          return u("narrow", !1);
        case "y":
          return s ? a({
            year: "numeric"
          }, "year") : this.num(e.year);
        case "yy":
          return s ? a({
            year: "2-digit"
          }, "year") : this.num(e.year.toString().slice(-2), 2);
        case "yyyy":
          return s ? a({
            year: "numeric"
          }, "year") : this.num(e.year, 4);
        case "yyyyyy":
          return s ? a({
            year: "numeric"
          }, "year") : this.num(e.year, 6);
        case "G":
          return p("short");
        case "GG":
          return p("long");
        case "GGGGG":
          return p("narrow");
        case "kk":
          return this.num(e.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(e.weekYear, 4);
        case "W":
          return this.num(e.weekNumber);
        case "WW":
          return this.num(e.weekNumber, 2);
        case "n":
          return this.num(e.localWeekNumber);
        case "nn":
          return this.num(e.localWeekNumber, 2);
        case "ii":
          return this.num(e.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(e.localWeekYear, 4);
        case "o":
          return this.num(e.ordinal);
        case "ooo":
          return this.num(e.ordinal, 3);
        case "q":
          return this.num(e.quarter);
        case "qq":
          return this.num(e.quarter, 2);
        case "X":
          return this.num(Math.floor(e.ts / 1e3));
        case "x":
          return this.num(e.ts);
        default:
          return f(c);
      }
    };
    return Gt(W.parseFormat(r), _);
  }
  formatDurationFromString(e, r) {
    const n = (u) => {
      switch (u[0]) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
          return "hour";
        case "d":
          return "day";
        case "w":
          return "week";
        case "M":
          return "month";
        case "y":
          return "year";
        default:
          return null;
      }
    }, s = (u) => (l) => {
      const f = n(l);
      return f ? this.num(u.get(f), l.length) : l;
    }, a = W.parseFormat(r), i = a.reduce((u, {
      literal: l,
      val: f
    }) => l ? u : u.concat(f), []), o = e.shiftTo(...i.map(n).filter((u) => u));
    return Gt(a, s(o));
  }
}
const tn = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function ve(...t) {
  const e = t.reduce((r, n) => r + n.source, "");
  return RegExp(`^${e}$`);
}
function we(...t) {
  return (e) => t.reduce(([r, n, s], a) => {
    const [i, o, u] = a(e, s);
    return [{
      ...r,
      ...i
    }, o || n, u];
  }, [{}, null, 1]).slice(0, 2);
}
function Ne(t, ...e) {
  if (t == null)
    return [null, null];
  for (const [r, n] of e) {
    const s = r.exec(t);
    if (s)
      return n(s);
  }
  return [null, null];
}
function rn(...t) {
  return (e, r) => {
    const n = {};
    let s;
    for (s = 0; s < t.length; s++)
      n[t[s]] = K(e[r + s]);
    return [n, null, r + s];
  };
}
const nn = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, vs = `(?:${nn.source}?(?:\\[(${tn.source})\\])?)?`, St = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, sn = RegExp(`${St.source}${vs}`), Ot = RegExp(`(?:T${sn.source})?`), ws = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Ns = /(\d{4})-?W(\d\d)(?:-?(\d))?/, bs = /(\d{4})-?(\d{3})/, ks = rn("weekYear", "weekNumber", "weekDay"), Ts = rn("year", "ordinal"), Ss = /(\d{4})-(\d\d)-(\d\d)/, an = RegExp(`${St.source} ?(?:${nn.source}|(${tn.source}))?`), Os = RegExp(`(?: ${an.source})?`);
function ye(t, e, r) {
  const n = t[e];
  return k(n) ? r : K(n);
}
function Es(t, e) {
  return [{
    year: ye(t, e),
    month: ye(t, e + 1, 1),
    day: ye(t, e + 2, 1)
  }, null, e + 3];
}
function be(t, e) {
  return [{
    hours: ye(t, e, 0),
    minutes: ye(t, e + 1, 0),
    seconds: ye(t, e + 2, 0),
    milliseconds: kt(t[e + 3])
  }, null, e + 4];
}
function Ve(t, e) {
  const r = !t[e] && !t[e + 1], n = tt(t[e + 1], t[e + 2]), s = r ? null : $.instance(n);
  return [{}, s, e + 3];
}
function We(t, e) {
  const r = t[e] ? J.create(t[e]) : null;
  return [{}, r, e + 1];
}
const Ds = RegExp(`^T?${St.source}$`), Ms = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function xs(t) {
  const [e, r, n, s, a, i, o, u, l] = t, f = e[0] === "-", p = u && u[0] === "-", _ = (c, d = !1) => c !== void 0 && (d || c && f) ? -c : c;
  return [{
    years: _(te(r)),
    months: _(te(n)),
    weeks: _(te(s)),
    days: _(te(a)),
    hours: _(te(i)),
    minutes: _(te(o)),
    seconds: _(te(u), u === "-0"),
    milliseconds: _(kt(l), p)
  }];
}
const Cs = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function Et(t, e, r, n, s, a, i) {
  const o = {
    year: e.length === 2 ? wt(K(e)) : K(e),
    month: Gr.indexOf(r) + 1,
    day: K(n),
    hour: K(s),
    minute: K(a)
  };
  return i && (o.second = K(i)), t && (o.weekday = t.length > 3 ? Br.indexOf(t) + 1 : Qr.indexOf(t) + 1), o;
}
const Is = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Fs(t) {
  const [, e, r, n, s, a, i, o, u, l, f, p] = t, _ = Et(e, s, n, r, a, i, o);
  let c;
  return u ? c = Cs[u] : l ? c = 0 : c = tt(f, p), [_, new $(c)];
}
function Vs(t) {
  return t.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const Ws = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, $s = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Ls = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Jt(t) {
  const [, e, r, n, s, a, i, o] = t;
  return [Et(e, s, n, r, a, i, o), $.utcInstance];
}
function zs(t) {
  const [, e, r, n, s, a, i, o] = t;
  return [Et(e, o, r, n, s, a, i), $.utcInstance];
}
const As = ve(ws, Ot), Zs = ve(Ns, Ot), Rs = ve(bs, Ot), Us = ve(sn), on = we(Es, be, Ve, We), Hs = we(ks, be, Ve, We), qs = we(Ts, be, Ve, We), Ps = we(be, Ve, We);
function Ys(t) {
  return Ne(t, [As, on], [Zs, Hs], [Rs, qs], [Us, Ps]);
}
function js(t) {
  return Ne(Vs(t), [Is, Fs]);
}
function Gs(t) {
  return Ne(t, [Ws, Jt], [$s, Jt], [Ls, zs]);
}
function Js(t) {
  return Ne(t, [Ms, xs]);
}
const Bs = we(be);
function Qs(t) {
  return Ne(t, [Ds, Bs]);
}
const Ks = ve(Ss, Os), Xs = ve(an), ei = we(be, Ve, We);
function ti(t) {
  return Ne(t, [Ks, on], [Xs, ei]);
}
const Bt = "Invalid Duration", un = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: {
    minutes: 60,
    seconds: 60 * 60,
    milliseconds: 60 * 60 * 1e3
  },
  minutes: {
    seconds: 60,
    milliseconds: 60 * 1e3
  },
  seconds: {
    milliseconds: 1e3
  }
}, ri = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  },
  ...un
}, U = 146097 / 400, fe = 146097 / 4800, ni = {
  years: {
    quarters: 4,
    months: 12,
    weeks: U / 7,
    days: U,
    hours: U * 24,
    minutes: U * 24 * 60,
    seconds: U * 24 * 60 * 60,
    milliseconds: U * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: U / 28,
    days: U / 4,
    hours: U * 24 / 4,
    minutes: U * 24 * 60 / 4,
    seconds: U * 24 * 60 * 60 / 4,
    milliseconds: U * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: fe / 7,
    days: fe,
    hours: fe * 24,
    minutes: fe * 24 * 60,
    seconds: fe * 24 * 60 * 60,
    milliseconds: fe * 24 * 60 * 60 * 1e3
  },
  ...un
}, ie = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"], si = ie.slice(0).reverse();
function Q(t, e, r = !1) {
  const n = {
    values: r ? e.values : {
      ...t.values,
      ...e.values || {}
    },
    loc: t.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || t.conversionAccuracy,
    matrix: e.matrix || t.matrix
  };
  return new O(n);
}
function ln(t, e) {
  var r;
  let n = (r = e.milliseconds) != null ? r : 0;
  for (const s of si.slice(1))
    e[s] && (n += e[s] * t[s].milliseconds);
  return n;
}
function Qt(t, e) {
  const r = ln(t, e) < 0 ? -1 : 1;
  ie.reduceRight((n, s) => {
    if (k(e[s]))
      return n;
    if (n) {
      const a = e[n] * r, i = t[s][n], o = Math.floor(a / i);
      e[s] += o * r, e[n] -= o * i * r;
    }
    return s;
  }, null), ie.reduce((n, s) => {
    if (k(e[s]))
      return n;
    if (n) {
      const a = e[n] % 1;
      e[n] -= a, e[s] += a * t[n][s];
    }
    return s;
  }, null);
}
function ii(t) {
  const e = {};
  for (const [r, n] of Object.entries(t))
    n !== 0 && (e[r] = n);
  return e;
}
class O {
  /**
   * @private
   */
  constructor(e) {
    const r = e.conversionAccuracy === "longterm" || !1;
    let n = r ? ni : ri;
    e.matrix && (n = e.matrix), this.values = e.values, this.loc = e.loc || M.create(), this.conversionAccuracy = r ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = n, this.isLuxonDuration = !0;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(e, r) {
    return O.fromObject({
      milliseconds: e
    }, r);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(e, r = {}) {
    if (e == null || typeof e != "object")
      throw new A(`Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`);
    return new O({
      values: Qe(e, O.normalizeUnit),
      loc: M.fromObject(r),
      conversionAccuracy: r.conversionAccuracy,
      matrix: r.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(e) {
    if (ae(e))
      return O.fromMillis(e);
    if (O.isDuration(e))
      return e;
    if (typeof e == "object")
      return O.fromObject(e);
    throw new A(`Unknown duration argument ${e} of type ${typeof e}`);
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(e, r) {
    const [n] = Js(e);
    return n ? O.fromObject(n, r) : O.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(e, r) {
    const [n] = Qs(e);
    return n ? O.fromObject(n, r) : O.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(e, r = null) {
    if (!e)
      throw new A("need to specify a reason the Duration is invalid");
    const n = e instanceof j ? e : new j(e, r);
    if (F.throwOnInvalid)
      throw new Fn(n);
    return new O({
      invalid: n
    });
  }
  /**
   * @private
   */
  static normalizeUnit(e) {
    const r = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[e && e.toLowerCase()];
    if (!r)
      throw new gr(e);
    return r;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(e) {
    return e && e.isLuxonDuration || !1;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(e, r = {}) {
    const n = {
      ...r,
      floor: r.round !== !1 && r.floor !== !1
    };
    return this.isValid ? W.create(this.loc, n).formatDurationFromString(this, e) : Bt;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  toHuman(e = {}) {
    if (!this.isValid)
      return Bt;
    const r = ie.map((n) => {
      const s = this.values[n];
      return k(s) ? null : this.loc.numberFormatter({
        style: "unit",
        unitDisplay: "long",
        ...e,
        unit: n.slice(0, -1)
      }).format(s);
    }).filter((n) => n);
    return this.loc.listFormatter({
      type: "conjunction",
      style: e.listStyle || "narrow",
      ...e
    }).format(r);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    return this.isValid ? {
      ...this.values
    } : {};
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid)
      return null;
    let e = "P";
    return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += Tt(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(e = {}) {
    if (!this.isValid)
      return null;
    const r = this.toMillis();
    return r < 0 || r >= 864e5 ? null : (e = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...e,
      includeOffset: !1
    }, T.fromMillis(r, {
      zone: "UTC"
    }).toISOTime(e));
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? ln(this.matrix, this.values) : NaN;
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(e) {
    if (!this.isValid)
      return this;
    const r = O.fromDurationLike(e), n = {};
    for (const s of ie)
      (pe(r.values, s) || pe(this.values, s)) && (n[s] = r.get(s) + this.get(s));
    return Q(this, {
      values: n
    }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(e) {
    if (!this.isValid)
      return this;
    const r = O.fromDurationLike(e);
    return this.plus(r.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(e) {
    if (!this.isValid)
      return this;
    const r = {};
    for (const n of Object.keys(this.values))
      r[n] = jr(e(this.values[n], n));
    return Q(this, {
      values: r
    }, !0);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(e) {
    return this[O.normalizeUnit(e)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(e) {
    if (!this.isValid)
      return this;
    const r = {
      ...this.values,
      ...Qe(e, O.normalizeUnit)
    };
    return Q(this, {
      values: r
    });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({
    locale: e,
    numberingSystem: r,
    conversionAccuracy: n,
    matrix: s
  } = {}) {
    const i = {
      loc: this.loc.clone({
        locale: e,
        numberingSystem: r
      }),
      matrix: s,
      conversionAccuracy: n
    };
    return Q(this, i);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(e) {
    return this.isValid ? this.shiftTo(e).get(e) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid)
      return this;
    const e = this.toObject();
    return Qt(this.matrix, e), Q(this, {
      values: e
    }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid)
      return this;
    const e = ii(this.normalize().shiftToAll().toObject());
    return Q(this, {
      values: e
    }, !0);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...e) {
    if (!this.isValid)
      return this;
    if (e.length === 0)
      return this;
    e = e.map((i) => O.normalizeUnit(i));
    const r = {}, n = {}, s = this.toObject();
    let a;
    for (const i of ie)
      if (e.indexOf(i) >= 0) {
        a = i;
        let o = 0;
        for (const l in n)
          o += this.matrix[l][i] * n[l], n[l] = 0;
        ae(s[i]) && (o += s[i]);
        const u = Math.trunc(o);
        r[i] = u, n[i] = (o * 1e3 - u * 1e3) / 1e3;
      } else
        ae(s[i]) && (n[i] = s[i]);
    for (const i in n)
      n[i] !== 0 && (r[a] += i === a ? n[i] : n[i] / this.matrix[a][i]);
    return Qt(this.matrix, r), Q(this, {
      values: r
    }, !0);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    return this.isValid ? this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds") : this;
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid)
      return this;
    const e = {};
    for (const r of Object.keys(this.values))
      e[r] = this.values[r] === 0 ? 0 : -this.values[r];
    return Q(this, {
      values: e
    }, !0);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(e) {
    if (!this.isValid || !e.isValid || !this.loc.equals(e.loc))
      return !1;
    function r(n, s) {
      return n === void 0 || n === 0 ? s === void 0 || s === 0 : n === s;
    }
    for (const n of ie)
      if (!r(this.values[n], e.values[n]))
        return !1;
    return !0;
  }
}
const de = "Invalid Interval";
function ai(t, e) {
  return !t || !t.isValid ? I.invalid("missing or invalid start") : !e || !e.isValid ? I.invalid("missing or invalid end") : e < t ? I.invalid("end before start", `The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`) : null;
}
class I {
  /**
   * @private
   */
  constructor(e) {
    this.s = e.start, this.e = e.end, this.invalid = e.invalid || null, this.isLuxonInterval = !0;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(e, r = null) {
    if (!e)
      throw new A("need to specify a reason the Interval is invalid");
    const n = e instanceof j ? e : new j(e, r);
    if (F.throwOnInvalid)
      throw new In(n);
    return new I({
      invalid: n
    });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, r) {
    const n = Ee(e), s = Ee(r), a = ai(n, s);
    return a ?? new I({
      start: n,
      end: s
    });
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(e, r) {
    const n = O.fromDurationLike(r), s = Ee(e);
    return I.fromDateTimes(s, s.plus(n));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, r) {
    const n = O.fromDurationLike(r), s = Ee(e);
    return I.fromDateTimes(s.minus(n), s);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(e, r) {
    const [n, s] = (e || "").split("/", 2);
    if (n && s) {
      let a, i;
      try {
        a = T.fromISO(n, r), i = a.isValid;
      } catch {
        i = !1;
      }
      let o, u;
      try {
        o = T.fromISO(s, r), u = o.isValid;
      } catch {
        u = !1;
      }
      if (i && u)
        return I.fromDateTimes(a, o);
      if (i) {
        const l = O.fromISO(s, r);
        if (l.isValid)
          return I.after(a, l);
      } else if (u) {
        const l = O.fromISO(n, r);
        if (l.isValid)
          return I.before(o, l);
      }
    }
    return I.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(e) {
    return e && e.isLuxonInterval || !1;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(e = "milliseconds") {
    return this.isValid ? this.toDuration(e).get(e) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(e = "milliseconds", r) {
    if (!this.isValid)
      return NaN;
    const n = this.start.startOf(e, r);
    let s;
    return r != null && r.useLocaleWeeks ? s = this.end.reconfigure({
      locale: n.locale
    }) : s = this.end, s = s.startOf(e, r), Math.floor(s.diff(n, e).get(e)) + (s.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(e) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e) : !1;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(e) {
    return this.isValid ? this.s > e : !1;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(e) {
    return this.isValid ? this.e <= e : !1;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(e) {
    return this.isValid ? this.s <= e && this.e > e : !1;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({
    start: e,
    end: r
  } = {}) {
    return this.isValid ? I.fromDateTimes(e || this.s, r || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...e) {
    if (!this.isValid)
      return [];
    const r = e.map(Ee).filter((i) => this.contains(i)).sort((i, o) => i.toMillis() - o.toMillis()), n = [];
    let {
      s
    } = this, a = 0;
    for (; s < this.e; ) {
      const i = r[a] || this.e, o = +i > +this.e ? this.e : i;
      n.push(I.fromDateTimes(s, o)), s = o, a += 1;
    }
    return n;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(e) {
    const r = O.fromDurationLike(e);
    if (!this.isValid || !r.isValid || r.as("milliseconds") === 0)
      return [];
    let {
      s: n
    } = this, s = 1, a;
    const i = [];
    for (; n < this.e; ) {
      const o = this.start.plus(r.mapUnits((u) => u * s));
      a = +o > +this.e ? this.e : o, i.push(I.fromDateTimes(n, a)), n = a, s += 1;
    }
    return i;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(e) {
    return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(e) {
    return this.e > e.s && this.s < e.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(e) {
    return this.isValid ? +this.e == +e.s : !1;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(e) {
    return this.isValid ? +e.e == +this.s : !1;
  }
  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(e) {
    return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(e) {
    return !this.isValid || !e.isValid ? !1 : this.s.equals(e.s) && this.e.equals(e.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(e) {
    if (!this.isValid)
      return this;
    const r = this.s > e.s ? this.s : e.s, n = this.e < e.e ? this.e : e.e;
    return r >= n ? null : I.fromDateTimes(r, n);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(e) {
    if (!this.isValid)
      return this;
    const r = this.s < e.s ? this.s : e.s, n = this.e > e.e ? this.e : e.e;
    return I.fromDateTimes(r, n);
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(e) {
    const [r, n] = e.sort((s, a) => s.s - a.s).reduce(([s, a], i) => a ? a.overlaps(i) || a.abutsStart(i) ? [s, a.union(i)] : [s.concat([a]), i] : [s, i], [[], null]);
    return n && r.push(n), r;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(e) {
    let r = null, n = 0;
    const s = [], a = e.map((u) => [{
      time: u.s,
      type: "s"
    }, {
      time: u.e,
      type: "e"
    }]), i = Array.prototype.concat(...a), o = i.sort((u, l) => u.time - l.time);
    for (const u of o)
      n += u.type === "s" ? 1 : -1, n === 1 ? r = u.time : (r && +r != +u.time && s.push(I.fromDateTimes(r, u.time)), r = null);
    return I.merge(s);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...e) {
    return I.xor([this].concat(e)).map((r) => this.intersection(r)).filter((r) => r && !r.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : de;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(e = Ge, r = {}) {
    return this.isValid ? W.create(this.s.loc.clone(r), e).formatInterval(this) : de;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : de;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : de;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : de;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(e, {
    separator: r = " – "
  } = {}) {
    return this.isValid ? `${this.s.toFormat(e)}${r}${this.e.toFormat(e)}` : de;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(e, r) {
    return this.isValid ? this.e.diff(this.s, e, r) : O.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(e) {
    return I.fromDateTimes(e(this.s), e(this.e));
  }
}
class Me {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = F.defaultZone) {
    const r = T.now().setZone(e).set({
      month: 12
    });
    return !e.isUniversal && r.offset !== r.set({
      month: 6
    }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return J.isValidZone(e);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(e) {
    return X(e, F.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({
    locale: e = null,
    locObj: r = null
  } = {}) {
    return (r || M.create(e)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({
    locale: e = null,
    locObj: r = null
  } = {}) {
    return (r || M.create(e)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({
    locale: e = null,
    locObj: r = null
  } = {}) {
    return (r || M.create(e)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(e = "long", {
    locale: r = null,
    numberingSystem: n = null,
    locObj: s = null,
    outputCalendar: a = "gregory"
  } = {}) {
    return (s || M.create(r, n, a)).months(e);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(e = "long", {
    locale: r = null,
    numberingSystem: n = null,
    locObj: s = null,
    outputCalendar: a = "gregory"
  } = {}) {
    return (s || M.create(r, n, a)).months(e, !0);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(e = "long", {
    locale: r = null,
    numberingSystem: n = null,
    locObj: s = null
  } = {}) {
    return (s || M.create(r, n, null)).weekdays(e);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(e = "long", {
    locale: r = null,
    numberingSystem: n = null,
    locObj: s = null
  } = {}) {
    return (s || M.create(r, n, null)).weekdays(e, !0);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({
    locale: e = null
  } = {}) {
    return M.create(e).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(e = "short", {
    locale: r = null
  } = {}) {
    return M.create(r, null, "gregory").eras(e);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return {
      relative: qr(),
      localeWeek: Pr()
    };
  }
}
function Kt(t, e) {
  const r = (s) => s.toUTC(0, {
    keepLocalTime: !0
  }).startOf("day").valueOf(), n = r(e) - r(t);
  return Math.floor(O.fromMillis(n).as("days"));
}
function oi(t, e, r) {
  const n = [["years", (u, l) => l.year - u.year], ["quarters", (u, l) => l.quarter - u.quarter + (l.year - u.year) * 4], ["months", (u, l) => l.month - u.month + (l.year - u.year) * 12], ["weeks", (u, l) => {
    const f = Kt(u, l);
    return (f - f % 7) / 7;
  }], ["days", Kt]], s = {}, a = t;
  let i, o;
  for (const [u, l] of n)
    r.indexOf(u) >= 0 && (i = u, s[u] = l(t, e), o = a.plus(s), o > e ? (s[u]--, t = a.plus(s), t > e && (o = t, s[u]--, t = a.plus(s))) : t = o);
  return [t, s, o, i];
}
function ui(t, e, r, n) {
  let [s, a, i, o] = oi(t, e, r);
  const u = e - s, l = r.filter((p) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(p) >= 0);
  l.length === 0 && (i < e && (i = s.plus({
    [o]: 1
  })), i !== s && (a[o] = (a[o] || 0) + u / (i - s)));
  const f = O.fromObject(a, n);
  return l.length > 0 ? O.fromMillis(u, n).shiftTo(...l).plus(f) : f;
}
const Dt = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
}, Xt = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}, li = Dt.hanidec.replace(/[\[|\]]/g, "").split("");
function ci(t) {
  let e = parseInt(t, 10);
  if (isNaN(e)) {
    e = "";
    for (let r = 0; r < t.length; r++) {
      const n = t.charCodeAt(r);
      if (t[r].search(Dt.hanidec) !== -1)
        e += li.indexOf(t[r]);
      else
        for (const s in Xt) {
          const [a, i] = Xt[s];
          n >= a && n <= i && (e += n - a);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
function P({
  numberingSystem: t
}, e = "") {
  return new RegExp(`${Dt[t || "latn"]}${e}`);
}
const fi = "missing Intl.DateTimeFormat.formatToParts support";
function E(t, e = (r) => r) {
  return {
    regex: t,
    deser: ([r]) => e(ci(r))
  };
}
const di = " ", cn = `[ ${di}]`, fn = new RegExp(cn, "g");
function mi(t) {
  return t.replace(/\./g, "\\.?").replace(fn, cn);
}
function er(t) {
  return t.replace(/\./g, "").replace(fn, " ").toLowerCase();
}
function Y(t, e) {
  return t === null ? null : {
    regex: RegExp(t.map(mi).join("|")),
    deser: ([r]) => t.findIndex((n) => er(r) === er(n)) + e
  };
}
function tr(t, e) {
  return {
    regex: t,
    deser: ([, r, n]) => tt(r, n),
    groups: e
  };
}
function Ae(t) {
  return {
    regex: t,
    deser: ([e]) => e
  };
}
function hi(t) {
  return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function yi(t, e) {
  const r = P(e), n = P(e, "{2}"), s = P(e, "{3}"), a = P(e, "{4}"), i = P(e, "{6}"), o = P(e, "{1,2}"), u = P(e, "{1,3}"), l = P(e, "{1,6}"), f = P(e, "{1,9}"), p = P(e, "{2,4}"), _ = P(e, "{4,6}"), c = (w) => ({
    regex: RegExp(hi(w.val)),
    deser: ([v]) => v,
    literal: !0
  }), g = ((w) => {
    if (t.literal)
      return c(w);
    switch (w.val) {
      case "G":
        return Y(e.eras("short"), 0);
      case "GG":
        return Y(e.eras("long"), 0);
      case "y":
        return E(l);
      case "yy":
        return E(p, wt);
      case "yyyy":
        return E(a);
      case "yyyyy":
        return E(_);
      case "yyyyyy":
        return E(i);
      case "M":
        return E(o);
      case "MM":
        return E(n);
      case "MMM":
        return Y(e.months("short", !0), 1);
      case "MMMM":
        return Y(e.months("long", !0), 1);
      case "L":
        return E(o);
      case "LL":
        return E(n);
      case "LLL":
        return Y(e.months("short", !1), 1);
      case "LLLL":
        return Y(e.months("long", !1), 1);
      case "d":
        return E(o);
      case "dd":
        return E(n);
      case "o":
        return E(u);
      case "ooo":
        return E(s);
      case "HH":
        return E(n);
      case "H":
        return E(o);
      case "hh":
        return E(n);
      case "h":
        return E(o);
      case "mm":
        return E(n);
      case "m":
        return E(o);
      case "q":
        return E(o);
      case "qq":
        return E(n);
      case "s":
        return E(o);
      case "ss":
        return E(n);
      case "S":
        return E(u);
      case "SSS":
        return E(s);
      case "u":
        return Ae(f);
      case "uu":
        return Ae(o);
      case "uuu":
        return E(r);
      case "a":
        return Y(e.meridiems(), 0);
      case "kkkk":
        return E(a);
      case "kk":
        return E(p, wt);
      case "W":
        return E(o);
      case "WW":
        return E(n);
      case "E":
      case "c":
        return E(r);
      case "EEE":
        return Y(e.weekdays("short", !1), 1);
      case "EEEE":
        return Y(e.weekdays("long", !1), 1);
      case "ccc":
        return Y(e.weekdays("short", !0), 1);
      case "cccc":
        return Y(e.weekdays("long", !0), 1);
      case "Z":
      case "ZZ":
        return tr(new RegExp(`([+-]${o.source})(?::(${n.source}))?`), 2);
      case "ZZZ":
        return tr(new RegExp(`([+-]${o.source})(${n.source})?`), 2);
      case "z":
        return Ae(/[a-z_+-/]{1,256}?/i);
      case " ":
        return Ae(/[^\S\n\r]/);
      default:
        return c(w);
    }
  })(t) || {
    invalidReason: fi
  };
  return g.token = t, g;
}
const pi = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function gi(t, e, r) {
  const {
    type: n,
    value: s
  } = t;
  if (n === "literal") {
    const u = /^\s+$/.test(s);
    return {
      literal: !u,
      val: u ? " " : s
    };
  }
  const a = e[n];
  let i = n;
  n === "hour" && (e.hour12 != null ? i = e.hour12 ? "hour12" : "hour24" : e.hourCycle != null ? e.hourCycle === "h11" || e.hourCycle === "h12" ? i = "hour12" : i = "hour24" : i = r.hour12 ? "hour12" : "hour24");
  let o = pi[i];
  if (typeof o == "object" && (o = o[a]), o)
    return {
      literal: !1,
      val: o
    };
}
function _i(t) {
  return [`^${t.map((r) => r.regex).reduce((r, n) => `${r}(${n.source})`, "")}$`, t];
}
function vi(t, e, r) {
  const n = t.match(e);
  if (n) {
    const s = {};
    let a = 1;
    for (const i in r)
      if (pe(r, i)) {
        const o = r[i], u = o.groups ? o.groups + 1 : 1;
        !o.literal && o.token && (s[o.token.val[0]] = o.deser(n.slice(a, a + u))), a += u;
      }
    return [n, s];
  } else
    return [n, {}];
}
function wi(t) {
  const e = (a) => {
    switch (a) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let r = null, n;
  return k(t.z) || (r = J.create(t.z)), k(t.Z) || (r || (r = new $(t.Z)), n = t.Z), k(t.q) || (t.M = (t.q - 1) * 3 + 1), k(t.h) || (t.h < 12 && t.a === 1 ? t.h += 12 : t.h === 12 && t.a === 0 && (t.h = 0)), t.G === 0 && t.y && (t.y = -t.y), k(t.u) || (t.S = kt(t.u)), [Object.keys(t).reduce((a, i) => {
    const o = e(i);
    return o && (a[o] = t[i]), a;
  }, {}), r, n];
}
let ut = null;
function Ni() {
  return ut || (ut = T.fromMillis(1555555555555)), ut;
}
function bi(t, e) {
  if (t.literal)
    return t;
  const r = W.macroTokenToFormatOpts(t.val), n = hn(r, e);
  return n == null || n.includes(void 0) ? t : n;
}
function dn(t, e) {
  return Array.prototype.concat(...t.map((r) => bi(r, e)));
}
function mn(t, e, r) {
  const n = dn(W.parseFormat(r), t), s = n.map((i) => yi(i, t)), a = s.find((i) => i.invalidReason);
  if (a)
    return {
      input: e,
      tokens: n,
      invalidReason: a.invalidReason
    };
  {
    const [i, o] = _i(s), u = RegExp(i, "i"), [l, f] = vi(e, u, o), [p, _, c] = f ? wi(f) : [null, null, void 0];
    if (pe(f, "a") && pe(f, "H"))
      throw new me("Can't include meridiem when specifying 24-hour format");
    return {
      input: e,
      tokens: n,
      regex: u,
      rawMatches: l,
      matches: f,
      result: p,
      zone: _,
      specificOffset: c
    };
  }
}
function ki(t, e, r) {
  const {
    result: n,
    zone: s,
    specificOffset: a,
    invalidReason: i
  } = mn(t, e, r);
  return [n, s, a, i];
}
function hn(t, e) {
  if (!t)
    return null;
  const n = W.create(e, t).dtFormatter(Ni()), s = n.formatToParts(), a = n.resolvedOptions();
  return s.map((i) => gi(i, t, a));
}
const lt = "Invalid DateTime", rr = 864e13;
function Ze(t) {
  return new j("unsupported zone", `the zone "${t.name}" is not supported`);
}
function ct(t) {
  return t.weekData === null && (t.weekData = Je(t.c)), t.weekData;
}
function ft(t) {
  return t.localWeekData === null && (t.localWeekData = Je(t.c, t.loc.getMinDaysInFirstWeek(), t.loc.getStartOfWeek())), t.localWeekData;
}
function re(t, e) {
  const r = {
    ts: t.ts,
    zone: t.zone,
    c: t.c,
    o: t.o,
    loc: t.loc,
    invalid: t.invalid
  };
  return new T({
    ...r,
    ...e,
    old: r
  });
}
function yn(t, e, r) {
  let n = t - e * 60 * 1e3;
  const s = r.offset(n);
  if (e === s)
    return [n, e];
  n -= (s - e) * 60 * 1e3;
  const a = r.offset(n);
  return s === a ? [n, s] : [t - Math.min(s, a) * 60 * 1e3, Math.max(s, a)];
}
function Re(t, e) {
  t += e * 60 * 1e3;
  const r = new Date(t);
  return {
    year: r.getUTCFullYear(),
    month: r.getUTCMonth() + 1,
    day: r.getUTCDate(),
    hour: r.getUTCHours(),
    minute: r.getUTCMinutes(),
    second: r.getUTCSeconds(),
    millisecond: r.getUTCMilliseconds()
  };
}
function Pe(t, e, r) {
  return yn(et(t), e, r);
}
function nr(t, e) {
  const r = t.o, n = t.c.year + Math.trunc(e.years), s = t.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, a = {
    ...t.c,
    year: n,
    month: s,
    day: Math.min(t.c.day, Be(n, s)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
  }, i = O.fromObject({
    years: e.years - Math.trunc(e.years),
    quarters: e.quarters - Math.trunc(e.quarters),
    months: e.months - Math.trunc(e.months),
    weeks: e.weeks - Math.trunc(e.weeks),
    days: e.days - Math.trunc(e.days),
    hours: e.hours,
    minutes: e.minutes,
    seconds: e.seconds,
    milliseconds: e.milliseconds
  }).as("milliseconds"), o = et(a);
  let [u, l] = yn(o, r, t.zone);
  return i !== 0 && (u += i, l = t.zone.offset(u)), {
    ts: u,
    o: l
  };
}
function Oe(t, e, r, n, s, a) {
  const {
    setZone: i,
    zone: o
  } = r;
  if (t && Object.keys(t).length !== 0 || e) {
    const u = e || o, l = T.fromObject(t, {
      ...r,
      zone: u,
      specificOffset: a
    });
    return i ? l : l.setZone(o);
  } else
    return T.invalid(new j("unparsable", `the input "${s}" can't be parsed as ${n}`));
}
function Ue(t, e, r = !0) {
  return t.isValid ? W.create(M.create("en-US"), {
    allowZ: r,
    forceSimple: !0
  }).formatDateTimeFromString(t, e) : null;
}
function dt(t, e) {
  const r = t.c.year > 9999 || t.c.year < 0;
  let n = "";
  return r && t.c.year >= 0 && (n += "+"), n += V(t.c.year, r ? 6 : 4), e ? (n += "-", n += V(t.c.month), n += "-", n += V(t.c.day)) : (n += V(t.c.month), n += V(t.c.day)), n;
}
function sr(t, e, r, n, s, a) {
  let i = V(t.c.hour);
  return e ? (i += ":", i += V(t.c.minute), (t.c.millisecond !== 0 || t.c.second !== 0 || !r) && (i += ":")) : i += V(t.c.minute), (t.c.millisecond !== 0 || t.c.second !== 0 || !r) && (i += V(t.c.second), (t.c.millisecond !== 0 || !n) && (i += ".", i += V(t.c.millisecond, 3))), s && (t.isOffsetFixed && t.offset === 0 && !a ? i += "Z" : t.o < 0 ? (i += "-", i += V(Math.trunc(-t.o / 60)), i += ":", i += V(Math.trunc(-t.o % 60))) : (i += "+", i += V(Math.trunc(t.o / 60)), i += ":", i += V(Math.trunc(t.o % 60)))), a && (i += "[" + t.zone.ianaName + "]"), i;
}
const pn = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ti = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Si = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, gn = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Oi = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], Ei = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Di(t) {
  const e = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[t.toLowerCase()];
  if (!e)
    throw new gr(t);
  return e;
}
function ir(t) {
  switch (t.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return Di(t);
  }
}
function ar(t, e) {
  const r = X(e.zone, F.defaultZone), n = M.fromObject(e), s = F.now();
  let a, i;
  if (k(t.year))
    a = s;
  else {
    for (const l of gn)
      k(t[l]) && (t[l] = pn[l]);
    const o = Ur(t) || Hr(t);
    if (o)
      return T.invalid(o);
    const u = r.offset(s);
    [a, i] = Pe(t, u, r);
  }
  return new T({
    ts: a,
    zone: r,
    loc: n,
    o: i
  });
}
function or(t, e, r) {
  const n = k(r.round) ? !0 : r.round, s = (i, o) => (i = Tt(i, n || r.calendary ? 0 : 2, !0), e.loc.clone(r).relFormatter(r).format(i, o)), a = (i) => r.calendary ? e.hasSame(t, i) ? 0 : e.startOf(i).diff(t.startOf(i), i).get(i) : e.diff(t, i).get(i);
  if (r.unit)
    return s(a(r.unit), r.unit);
  for (const i of r.units) {
    const o = a(i);
    if (Math.abs(o) >= 1)
      return s(o, i);
  }
  return s(t > e ? -0 : 0, r.units[r.units.length - 1]);
}
function ur(t) {
  let e = {}, r;
  return t.length > 0 && typeof t[t.length - 1] == "object" ? (e = t[t.length - 1], r = Array.from(t).slice(0, t.length - 1)) : r = Array.from(t), [e, r];
}
class T {
  /**
   * @access private
   */
  constructor(e) {
    const r = e.zone || F.defaultZone;
    let n = e.invalid || (Number.isNaN(e.ts) ? new j("invalid input") : null) || (r.isValid ? null : Ze(r));
    this.ts = k(e.ts) ? F.now() : e.ts;
    let s = null, a = null;
    if (!n)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(r))
        [s, a] = [e.old.c, e.old.o];
      else {
        const o = r.offset(this.ts);
        s = Re(this.ts, o), n = Number.isNaN(s.year) ? new j("invalid input") : null, s = n ? null : s, a = n ? null : o;
      }
    this._zone = r, this.loc = e.loc || M.create(), this.invalid = n, this.weekData = null, this.localWeekData = null, this.c = s, this.o = a, this.isLuxonDateTime = !0;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new T({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [e, r] = ur(arguments), [n, s, a, i, o, u, l] = r;
    return ar({
      year: n,
      month: s,
      day: a,
      hour: i,
      minute: o,
      second: u,
      millisecond: l
    }, e);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [e, r] = ur(arguments), [n, s, a, i, o, u, l] = r;
    return e.zone = $.utcInstance, ar({
      year: n,
      month: s,
      day: a,
      hour: i,
      minute: o,
      second: u,
      millisecond: l
    }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, r = {}) {
    const n = ns(e) ? e.valueOf() : NaN;
    if (Number.isNaN(n))
      return T.invalid("invalid input");
    const s = X(r.zone, F.defaultZone);
    return s.isValid ? new T({
      ts: n,
      zone: s,
      loc: M.fromObject(r)
    }) : T.invalid(Ze(s));
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(e, r = {}) {
    if (ae(e))
      return e < -rr || e > rr ? T.invalid("Timestamp out of range") : new T({
        ts: e,
        zone: X(r.zone, F.defaultZone),
        loc: M.fromObject(r)
      });
    throw new A(`fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`);
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(e, r = {}) {
    if (ae(e))
      return new T({
        ts: e * 1e3,
        zone: X(r.zone, F.defaultZone),
        loc: M.fromObject(r)
      });
    throw new A("fromSeconds requires a numerical input");
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(e, r = {}) {
    e = e || {};
    const n = X(r.zone, F.defaultZone);
    if (!n.isValid)
      return T.invalid(Ze(n));
    const s = M.fromObject(r), a = Qe(e, ir), {
      minDaysInFirstWeek: i,
      startOfWeek: o
    } = Pt(a, s), u = F.now(), l = k(r.specificOffset) ? n.offset(u) : r.specificOffset, f = !k(a.ordinal), p = !k(a.year), _ = !k(a.month) || !k(a.day), c = p || _, d = a.weekYear || a.weekNumber;
    if ((c || f) && d)
      throw new me("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    if (_ && f)
      throw new me("Can't mix ordinal dates with month/day");
    const g = d || a.weekday && !c;
    let w, v, N = Re(u, l);
    g ? (w = Oi, v = Ti, N = Je(N, i, o)) : f ? (w = Ei, v = Si, N = ot(N)) : (w = gn, v = pn);
    let D = !1;
    for (const Se of w) {
      const Mn = a[Se];
      k(Mn) ? D ? a[Se] = v[Se] : a[Se] = N[Se] : D = !0;
    }
    const x = g ? es(a, i, o) : f ? ts(a) : Ur(a), L = x || Hr(a);
    if (L)
      return T.invalid(L);
    const ce = g ? Ht(a, i, o) : f ? qt(a) : a, [C, Te] = Pe(ce, l, n), st = new T({
      ts: C,
      zone: n,
      o: Te,
      loc: s
    });
    return a.weekday && c && e.weekday !== st.weekday ? T.invalid("mismatched weekday", `you can't specify both a weekday of ${a.weekday} and a date of ${st.toISO()}`) : st;
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(e, r = {}) {
    const [n, s] = Ys(e);
    return Oe(n, s, r, "ISO 8601", e);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(e, r = {}) {
    const [n, s] = js(e);
    return Oe(n, s, r, "RFC 2822", e);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(e, r = {}) {
    const [n, s] = Gs(e);
    return Oe(n, s, r, "HTTP", r);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(e, r, n = {}) {
    if (k(e) || k(r))
      throw new A("fromFormat requires an input string and a format");
    const {
      locale: s = null,
      numberingSystem: a = null
    } = n, i = M.fromOpts({
      locale: s,
      numberingSystem: a,
      defaultToEN: !0
    }), [o, u, l, f] = ki(i, e, r);
    return f ? T.invalid(f) : Oe(o, u, n, `format ${r}`, e, l);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(e, r, n = {}) {
    return T.fromFormat(e, r, n);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(e, r = {}) {
    const [n, s] = ti(e);
    return Oe(n, s, r, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, r = null) {
    if (!e)
      throw new A("need to specify a reason the DateTime is invalid");
    const n = e instanceof j ? e : new j(e, r);
    if (F.throwOnInvalid)
      throw new Cn(n);
    return new T({
      invalid: n
    });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(e) {
    return e && e.isLuxonDateTime || !1;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(e, r = {}) {
    const n = hn(e, M.fromObject(r));
    return n ? n.map((s) => s ? s.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(e, r = {}) {
    return dn(W.parseFormat(e), M.fromObject(r)).map((s) => s.val).join("");
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(e) {
    return this[e];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? ct(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? ct(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? ct(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? ft(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? ft(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? ft(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? ot(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Me.months("short", {
      locObj: this.loc
    })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Me.months("long", {
      locObj: this.loc
    })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Me.weekdays("short", {
      locObj: this.loc
    })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Me.weekdays("long", {
      locObj: this.loc
    })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "short",
      locale: this.locale
    }) : null;
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "long",
      locale: this.locale
    }) : null;
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    return this.isOffsetFixed ? !1 : this.offset > this.set({
      month: 1,
      day: 1
    }).offset || this.offset > this.set({
      month: 5
    }).offset;
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed)
      return [this];
    const e = 864e5, r = 6e4, n = et(this.c), s = this.zone.offset(n - e), a = this.zone.offset(n + e), i = this.zone.offset(n - s * r), o = this.zone.offset(n - a * r);
    if (i === o)
      return [this];
    const u = n - i * r, l = n - o * r, f = Re(u, i), p = Re(l, o);
    return f.hour === p.hour && f.minute === p.minute && f.second === p.second && f.millisecond === p.millisecond ? [re(this, {
      ts: u
    }), re(this, {
      ts: l
    })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return Fe(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return Be(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? he(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? Ce(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? Ce(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(e = {}) {
    const {
      locale: r,
      numberingSystem: n,
      calendar: s
    } = W.create(this.loc.clone(e), e).resolvedOptions(this);
    return {
      locale: r,
      numberingSystem: n,
      outputCalendar: s
    };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(e = 0, r = {}) {
    return this.setZone($.instance(e), r);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(F.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(e, {
    keepLocalTime: r = !1,
    keepCalendarTime: n = !1
  } = {}) {
    if (e = X(e, F.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let s = this.ts;
      if (r || n) {
        const a = e.offset(this.ts), i = this.toObject();
        [s] = Pe(i, a, e);
      }
      return re(this, {
        ts: s,
        zone: e
      });
    } else
      return T.invalid(Ze(e));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({
    locale: e,
    numberingSystem: r,
    outputCalendar: n
  } = {}) {
    const s = this.loc.clone({
      locale: e,
      numberingSystem: r,
      outputCalendar: n
    });
    return re(this, {
      loc: s
    });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(e) {
    return this.reconfigure({
      locale: e
    });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(e) {
    if (!this.isValid)
      return this;
    const r = Qe(e, ir), {
      minDaysInFirstWeek: n,
      startOfWeek: s
    } = Pt(r, this.loc), a = !k(r.weekYear) || !k(r.weekNumber) || !k(r.weekday), i = !k(r.ordinal), o = !k(r.year), u = !k(r.month) || !k(r.day), l = o || u, f = r.weekYear || r.weekNumber;
    if ((l || i) && f)
      throw new me("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    if (u && i)
      throw new me("Can't mix ordinal dates with month/day");
    let p;
    a ? p = Ht({
      ...Je(this.c, n, s),
      ...r
    }, n, s) : k(r.ordinal) ? (p = {
      ...this.toObject(),
      ...r
    }, k(r.day) && (p.day = Math.min(Be(p.year, p.month), p.day))) : p = qt({
      ...ot(this.c),
      ...r
    });
    const [_, c] = Pe(p, this.o, this.zone);
    return re(this, {
      ts: _,
      o: c
    });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(e) {
    if (!this.isValid)
      return this;
    const r = O.fromDurationLike(e);
    return re(this, nr(this, r));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(e) {
    if (!this.isValid)
      return this;
    const r = O.fromDurationLike(e).negate();
    return re(this, nr(this, r));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(e, {
    useLocaleWeeks: r = !1
  } = {}) {
    if (!this.isValid)
      return this;
    const n = {}, s = O.normalizeUnit(e);
    switch (s) {
      case "years":
        n.month = 1;
      case "quarters":
      case "months":
        n.day = 1;
      case "weeks":
      case "days":
        n.hour = 0;
      case "hours":
        n.minute = 0;
      case "minutes":
        n.second = 0;
      case "seconds":
        n.millisecond = 0;
        break;
    }
    if (s === "weeks")
      if (r) {
        const a = this.loc.getStartOfWeek(), {
          weekday: i
        } = this;
        i < a && (n.weekNumber = this.weekNumber - 1), n.weekday = a;
      } else
        n.weekday = 1;
    if (s === "quarters") {
      const a = Math.ceil(this.month / 3);
      n.month = (a - 1) * 3 + 1;
    }
    return this.set(n);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(e, r) {
    return this.isValid ? this.plus({
      [e]: 1
    }).startOf(e, r).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(e, r = {}) {
    return this.isValid ? W.create(this.loc.redefaultToEN(r)).formatDateTimeFromString(this, e) : lt;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(e = Ge, r = {}) {
    return this.isValid ? W.create(this.loc.clone(r), e).formatDateTime(this) : lt;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(e = {}) {
    return this.isValid ? W.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  toISO({
    format: e = "extended",
    suppressSeconds: r = !1,
    suppressMilliseconds: n = !1,
    includeOffset: s = !0,
    extendedZone: a = !1
  } = {}) {
    if (!this.isValid)
      return null;
    const i = e === "extended";
    let o = dt(this, i);
    return o += "T", o += sr(this, i, r, n, s, a), o;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  toISODate({
    format: e = "extended"
  } = {}) {
    return this.isValid ? dt(this, e === "extended") : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Ue(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds: e = !1,
    suppressSeconds: r = !1,
    includeOffset: n = !0,
    includePrefix: s = !1,
    extendedZone: a = !1,
    format: i = "extended"
  } = {}) {
    return this.isValid ? (s ? "T" : "") + sr(this, i === "extended", r, e, n, a) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return Ue(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return Ue(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    return this.isValid ? dt(this, !0) : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({
    includeOffset: e = !0,
    includeZone: r = !1,
    includeOffsetSpace: n = !0
  } = {}) {
    let s = "HH:mm:ss.SSS";
    return (r || e) && (n && (s += " "), r ? s += "z" : e && (s += "ZZ")), Ue(this, s, !0);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(e = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : lt;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(e = {}) {
    if (!this.isValid)
      return {};
    const r = {
      ...this.c
    };
    return e.includeConfig && (r.outputCalendar = this.outputCalendar, r.numberingSystem = this.loc.numberingSystem, r.locale = this.loc.locale), r;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(e, r = "milliseconds", n = {}) {
    if (!this.isValid || !e.isValid)
      return O.invalid("created by diffing an invalid DateTime");
    const s = {
      locale: this.locale,
      numberingSystem: this.numberingSystem,
      ...n
    }, a = ss(r).map(O.normalizeUnit), i = e.valueOf() > this.valueOf(), o = i ? this : e, u = i ? e : this, l = ui(o, u, a, s);
    return i ? l.negate() : l;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(e = "milliseconds", r = {}) {
    return this.diff(T.now(), e, r);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(e) {
    return this.isValid ? I.fromDateTimes(this, e) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(e, r, n) {
    if (!this.isValid)
      return !1;
    const s = e.valueOf(), a = this.setZone(e.zone, {
      keepLocalTime: !0
    });
    return a.startOf(r, n) <= s && s <= a.endOf(r, n);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(e) {
    return this.isValid && e.isValid && this.valueOf() === e.valueOf() && this.zone.equals(e.zone) && this.loc.equals(e.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(e = {}) {
    if (!this.isValid)
      return null;
    const r = e.base || T.fromObject({}, {
      zone: this.zone
    }), n = e.padding ? this < r ? -e.padding : e.padding : 0;
    let s = ["years", "months", "days", "hours", "minutes", "seconds"], a = e.unit;
    return Array.isArray(e.unit) && (s = e.unit, a = void 0), or(r, this.plus(n), {
      ...e,
      numeric: "always",
      units: s,
      unit: a
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(e = {}) {
    return this.isValid ? or(e.base || T.fromObject({}, {
      zone: this.zone
    }), this, {
      ...e,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: !0
    }) : null;
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...e) {
    if (!e.every(T.isDateTime))
      throw new A("min requires all arguments be DateTimes");
    return Yt(e, (r) => r.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(T.isDateTime))
      throw new A("max requires all arguments be DateTimes");
    return Yt(e, (r) => r.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(e, r, n = {}) {
    const {
      locale: s = null,
      numberingSystem: a = null
    } = n, i = M.fromOpts({
      locale: s,
      numberingSystem: a,
      defaultToEN: !0
    });
    return mn(i, e, r);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(e, r, n = {}) {
    return T.fromFormatExplain(e, r, n);
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return Ge;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return _r;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return Vn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return vr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return wr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return Nr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return br;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return kr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Tr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Sr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Or;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Er;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return Dr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Mr;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return xr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Cr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Ir;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return Wn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Fr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return Vr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return Wr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return $r;
  }
}
function Ee(t) {
  if (T.isDateTime(t))
    return t;
  if (t && t.valueOf && ae(t.valueOf()))
    return T.fromJSDate(t);
  if (t && typeof t == "object")
    return T.fromObject(t);
  throw new A(`Unknown datetime argument: ${t}, of type ${typeof t}`);
}
const Mi = "3.4.4";
R.DateTime = T;
R.Duration = O;
R.FixedOffsetZone = $;
R.IANAZone = J;
R.Info = Me;
R.Interval = I;
R.InvalidZone = Lr;
R.Settings = F;
R.SystemZone = Ie;
R.VERSION = Mi;
R.Zone = _e;
var ne = R;
b.prototype.addYear = function() {
  this._date = this._date.plus({ years: 1 });
};
b.prototype.addMonth = function() {
  this._date = this._date.plus({ months: 1 }).startOf("month");
};
b.prototype.addDay = function() {
  this._date = this._date.plus({ days: 1 }).startOf("day");
};
b.prototype.addHour = function() {
  var t = this._date;
  this._date = this._date.plus({ hours: 1 }).startOf("hour"), this._date <= t && (this._date = this._date.plus({ hours: 1 }));
};
b.prototype.addMinute = function() {
  var t = this._date;
  this._date = this._date.plus({ minutes: 1 }).startOf("minute"), this._date < t && (this._date = this._date.plus({ hours: 1 }));
};
b.prototype.addSecond = function() {
  var t = this._date;
  this._date = this._date.plus({ seconds: 1 }).startOf("second"), this._date < t && (this._date = this._date.plus({ hours: 1 }));
};
b.prototype.subtractYear = function() {
  this._date = this._date.minus({ years: 1 });
};
b.prototype.subtractMonth = function() {
  this._date = this._date.minus({ months: 1 }).endOf("month").startOf("second");
};
b.prototype.subtractDay = function() {
  this._date = this._date.minus({ days: 1 }).endOf("day").startOf("second");
};
b.prototype.subtractHour = function() {
  var t = this._date;
  this._date = this._date.minus({ hours: 1 }).endOf("hour").startOf("second"), this._date >= t && (this._date = this._date.minus({ hours: 1 }));
};
b.prototype.subtractMinute = function() {
  var t = this._date;
  this._date = this._date.minus({ minutes: 1 }).endOf("minute").startOf("second"), this._date > t && (this._date = this._date.minus({ hours: 1 }));
};
b.prototype.subtractSecond = function() {
  var t = this._date;
  this._date = this._date.minus({ seconds: 1 }).startOf("second"), this._date > t && (this._date = this._date.minus({ hours: 1 }));
};
b.prototype.getDate = function() {
  return this._date.day;
};
b.prototype.getFullYear = function() {
  return this._date.year;
};
b.prototype.getDay = function() {
  var t = this._date.weekday;
  return t == 7 ? 0 : t;
};
b.prototype.getMonth = function() {
  return this._date.month - 1;
};
b.prototype.getHours = function() {
  return this._date.hour;
};
b.prototype.getMinutes = function() {
  return this._date.minute;
};
b.prototype.getSeconds = function() {
  return this._date.second;
};
b.prototype.getMilliseconds = function() {
  return this._date.millisecond;
};
b.prototype.getTime = function() {
  return this._date.valueOf();
};
b.prototype.getUTCDate = function() {
  return this._getUTC().day;
};
b.prototype.getUTCFullYear = function() {
  return this._getUTC().year;
};
b.prototype.getUTCDay = function() {
  var t = this._getUTC().weekday;
  return t == 7 ? 0 : t;
};
b.prototype.getUTCMonth = function() {
  return this._getUTC().month - 1;
};
b.prototype.getUTCHours = function() {
  return this._getUTC().hour;
};
b.prototype.getUTCMinutes = function() {
  return this._getUTC().minute;
};
b.prototype.getUTCSeconds = function() {
  return this._getUTC().second;
};
b.prototype.toISOString = function() {
  return this._date.toUTC().toISO();
};
b.prototype.toJSON = function() {
  return this._date.toJSON();
};
b.prototype.setDate = function(t) {
  this._date = this._date.set({ day: t });
};
b.prototype.setFullYear = function(t) {
  this._date = this._date.set({ year: t });
};
b.prototype.setDay = function(t) {
  this._date = this._date.set({ weekday: t });
};
b.prototype.setMonth = function(t) {
  this._date = this._date.set({ month: t + 1 });
};
b.prototype.setHours = function(t) {
  this._date = this._date.set({ hour: t });
};
b.prototype.setMinutes = function(t) {
  this._date = this._date.set({ minute: t });
};
b.prototype.setSeconds = function(t) {
  this._date = this._date.set({ second: t });
};
b.prototype.setMilliseconds = function(t) {
  this._date = this._date.set({ millisecond: t });
};
b.prototype._getUTC = function() {
  return this._date.toUTC();
};
b.prototype.toString = function() {
  return this.toDate().toString();
};
b.prototype.toDate = function() {
  return this._date.toJSDate();
};
b.prototype.isLastDayOfMonth = function() {
  var t = this._date.plus({ days: 1 }).startOf("day");
  return this._date.month !== t.month;
};
b.prototype.isLastWeekdayOfMonth = function() {
  var t = this._date.plus({ days: 7 }).startOf("day");
  return this._date.month !== t.month;
};
function b(t, e) {
  var r = { zone: e };
  if (t ? t instanceof b ? this._date = t._date : t instanceof Date ? this._date = ne.DateTime.fromJSDate(t, r) : typeof t == "number" ? this._date = ne.DateTime.fromMillis(t, r) : typeof t == "string" && (this._date = ne.DateTime.fromISO(t, r), this._date.isValid || (this._date = ne.DateTime.fromRFC2822(t, r)), this._date.isValid || (this._date = ne.DateTime.fromSQL(t, r)), this._date.isValid || (this._date = ne.DateTime.fromFormat(t, "EEE, d MMM yyyy HH:mm:ss", r))) : this._date = ne.DateTime.local(), !this._date || !this._date.isValid)
    throw new Error("CronDate: unhandled timestamp: " + JSON.stringify(t));
  e && e !== this._date.zoneName && (this._date = this._date.setZone(e));
}
var xi = b;
function se(t) {
  return {
    start: t,
    count: 1
  };
}
function lr(t, e) {
  t.end = e, t.step = e - t.start, t.count = 2;
}
function mt(t, e, r) {
  e && (e.count === 2 ? (t.push(se(e.start)), t.push(se(e.end))) : t.push(e)), r && t.push(r);
}
function Ci(t) {
  for (var e = [], r = void 0, n = 0; n < t.length; n++) {
    var s = t[n];
    typeof s != "number" ? (mt(e, r, se(s)), r = void 0) : r ? r.count === 1 ? lr(r, s) : r.step === s - r.end ? (r.count++, r.end = s) : r.count === 2 ? (e.push(se(r.start)), r = se(r.end), lr(r, s)) : (mt(e, r), r = se(s)) : r = se(s);
  }
  return mt(e, r), e;
}
var Ii = Ci, Fi = Ii;
function Vi(t, e, r) {
  var n = Fi(t);
  if (n.length === 1) {
    var s = n[0], a = s.step;
    if (a === 1 && s.start === e && s.end === r)
      return "*";
    if (a !== 1 && s.start === e && s.end === r - a + 1)
      return "*/" + a;
  }
  for (var i = [], o = 0, u = n.length; o < u; ++o) {
    var l = n[o];
    if (l.count === 1) {
      i.push(l.start);
      continue;
    }
    var a = l.step;
    if (l.step === 1) {
      i.push(l.start + "-" + l.end);
      continue;
    }
    var f = l.start == 0 ? l.count - 1 : l.count;
    l.step * f > l.end ? i = i.concat(
      Array.from({ length: l.end - l.start + 1 }).map(function(_, c) {
        var d = l.start + c;
        return (d - l.start) % l.step === 0 ? d : null;
      }).filter(function(_) {
        return _ != null;
      })
    ) : l.end === r - l.step + 1 ? i.push(l.start + "/" + l.step) : i.push(l.start + "-" + l.end + "/" + l.step);
  }
  return i.join(",");
}
var Wi = Vi, oe = xi, $i = Wi, cr = 1e4;
function y(t, e) {
  this._options = e, this._utc = e.utc || !1, this._tz = this._utc ? "UTC" : e.tz, this._currentDate = new oe(e.currentDate, this._tz), this._startDate = e.startDate ? new oe(e.startDate, this._tz) : null, this._endDate = e.endDate ? new oe(e.endDate, this._tz) : null, this._isIterator = e.iterator || !1, this._hasIterated = !1, this._nthDayOfWeek = e.nthDayOfWeek || 0, this.fields = y._freezeFields(t);
}
y.map = ["second", "minute", "hour", "dayOfMonth", "month", "dayOfWeek"];
y.predefined = {
  "@yearly": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@hourly": "0 * * * *"
};
y.constraints = [
  { min: 0, max: 59, chars: [] },
  // Second
  { min: 0, max: 59, chars: [] },
  // Minute
  { min: 0, max: 23, chars: [] },
  // Hour
  { min: 1, max: 31, chars: ["L"] },
  // Day of month
  { min: 1, max: 12, chars: [] },
  // Month
  { min: 0, max: 7, chars: ["L"] }
  // Day of week
];
y.daysInMonth = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
y.aliases = {
  month: {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12
  },
  dayOfWeek: {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
  }
};
y.parseDefaults = ["0", "*", "*", "*", "*", "*"];
y.standardValidCharacters = /^[,*\d/-]+$/;
y.dayOfWeekValidCharacters = /^[?,*\dL#/-]+$/;
y.dayOfMonthValidCharacters = /^[?,*\dL/-]+$/;
y.validCharacters = {
  second: y.standardValidCharacters,
  minute: y.standardValidCharacters,
  hour: y.standardValidCharacters,
  dayOfMonth: y.dayOfMonthValidCharacters,
  month: y.standardValidCharacters,
  dayOfWeek: y.dayOfWeekValidCharacters
};
y._isValidConstraintChar = function(e, r) {
  return typeof r != "string" ? !1 : e.chars.some(function(n) {
    return r.indexOf(n) > -1;
  });
};
y._parseField = function(e, r, n) {
  switch (e) {
    case "month":
    case "dayOfWeek":
      var s = y.aliases[e];
      r = r.replace(/[a-z]{3}/gi, function(u) {
        if (u = u.toLowerCase(), typeof s[u] < "u")
          return s[u];
        throw new Error('Validation error, cannot resolve alias "' + u + '"');
      });
      break;
  }
  if (!y.validCharacters[e].test(r))
    throw new Error("Invalid characters, got value: " + r);
  r.indexOf("*") !== -1 ? r = r.replace(/\*/g, n.min + "-" + n.max) : r.indexOf("?") !== -1 && (r = r.replace(/\?/g, n.min + "-" + n.max));
  function a(u) {
    var l = [];
    function f(d) {
      if (d instanceof Array)
        for (var g = 0, w = d.length; g < w; g++) {
          var v = d[g];
          if (y._isValidConstraintChar(n, v)) {
            l.push(v);
            continue;
          }
          if (typeof v != "number" || Number.isNaN(v) || v < n.min || v > n.max)
            throw new Error(
              "Constraint error, got value " + v + " expected range " + n.min + "-" + n.max
            );
          l.push(v);
        }
      else {
        if (y._isValidConstraintChar(n, d)) {
          l.push(d);
          return;
        }
        var N = +d;
        if (Number.isNaN(N) || N < n.min || N > n.max)
          throw new Error(
            "Constraint error, got value " + d + " expected range " + n.min + "-" + n.max
          );
        e === "dayOfWeek" && (N = N % 7), l.push(N);
      }
    }
    var p = u.split(",");
    if (!p.every(function(d) {
      return d.length > 0;
    }))
      throw new Error("Invalid list value format");
    if (p.length > 1)
      for (var _ = 0, c = p.length; _ < c; _++)
        f(i(p[_]));
    else
      f(i(u));
    return l.sort(y._sortCompareFn), l;
  }
  function i(u) {
    var l = 1, f = u.split("/");
    if (f.length > 2)
      throw new Error("Invalid repeat: " + u);
    return f.length > 1 ? (f[0] == +f[0] && (f = [f[0] + "-" + n.max, f[1]]), o(f[0], f[f.length - 1])) : o(u, l);
  }
  function o(u, l) {
    var f = [], p = u.split("-");
    if (p.length > 1) {
      if (p.length < 2)
        return +u;
      if (!p[0].length) {
        if (!p[1].length)
          throw new Error("Invalid range: " + u);
        return +u;
      }
      var _ = +p[0], c = +p[1];
      if (Number.isNaN(_) || Number.isNaN(c) || _ < n.min || c > n.max)
        throw new Error(
          "Constraint error, got range " + _ + "-" + c + " expected range " + n.min + "-" + n.max
        );
      if (_ > c)
        throw new Error("Invalid range: " + u);
      var d = +l;
      if (Number.isNaN(d) || d <= 0)
        throw new Error("Constraint error, cannot repeat at every " + d + " time.");
      e === "dayOfWeek" && c % 7 === 0 && f.push(0);
      for (var g = _, w = c; g <= w; g++) {
        var v = f.indexOf(g) !== -1;
        !v && d > 0 && d % l === 0 ? (d = 1, f.push(g)) : d++;
      }
      return f;
    }
    return Number.isNaN(+u) ? u : +u;
  }
  return a(r);
};
y._sortCompareFn = function(t, e) {
  var r = typeof t == "number", n = typeof e == "number";
  return r && n ? t - e : !r && n ? 1 : r && !n ? -1 : t.localeCompare(e);
};
y._handleMaxDaysInMonth = function(t) {
  if (t.month.length === 1) {
    var e = y.daysInMonth[t.month[0] - 1];
    if (t.dayOfMonth[0] > e)
      throw new Error("Invalid explicit day of month definition");
    return t.dayOfMonth.filter(function(r) {
      return r === "L" ? !0 : r <= e;
    }).sort(y._sortCompareFn);
  }
};
y._freezeFields = function(t) {
  for (var e = 0, r = y.map.length; e < r; ++e) {
    var n = y.map[e], s = t[n];
    t[n] = Object.freeze(s);
  }
  return Object.freeze(t);
};
y.prototype._applyTimezoneShift = function(t, e, r) {
  if (r === "Month" || r === "Day") {
    var n = t.getTime();
    t[e + r]();
    var s = t.getTime();
    n === s && (t.getMinutes() === 0 && t.getSeconds() === 0 ? t.addHour() : t.getMinutes() === 59 && t.getSeconds() === 59 && t.subtractHour());
  } else {
    var a = t.getHours();
    t[e + r]();
    var i = t.getHours(), o = i - a;
    o === 2 ? this.fields.hour.length !== 24 && (this._dstStart = i) : o === 0 && t.getMinutes() === 0 && t.getSeconds() === 0 && this.fields.hour.length !== 24 && (this._dstEnd = i);
  }
};
y.prototype._findSchedule = function(e) {
  function r(v, N) {
    for (var D = 0, x = N.length; D < x; D++)
      if (N[D] >= v)
        return N[D] === v;
    return N[0] === v;
  }
  function n(v, N) {
    if (N < 6) {
      if (v.getDate() < 8 && N === 1)
        return !0;
      var D = v.getDate() % 7 ? 1 : 0, x = v.getDate() - v.getDate() % 7, L = Math.floor(x / 7) + D;
      return L === N;
    }
    return !1;
  }
  function s(v) {
    return v.length > 0 && v.some(function(N) {
      return typeof N == "string" && N.indexOf("L") >= 0;
    });
  }
  e = e || !1;
  var a = e ? "subtract" : "add", i = new oe(this._currentDate, this._tz), o = this._startDate, u = this._endDate, l = i.getTime(), f = 0;
  function p(v) {
    return v.some(function(N) {
      if (!s([N]))
        return !1;
      var D = Number.parseInt(N[0]) % 7;
      if (Number.isNaN(D))
        throw new Error("Invalid last weekday of the month expression: " + N);
      return i.getDay() === D && i.isLastWeekdayOfMonth();
    });
  }
  for (; f < cr; ) {
    if (f++, e) {
      if (o && i.getTime() - o.getTime() < 0)
        throw new Error("Out of the timespan range");
    } else if (u && u.getTime() - i.getTime() < 0)
      throw new Error("Out of the timespan range");
    var _ = r(i.getDate(), this.fields.dayOfMonth);
    s(this.fields.dayOfMonth) && (_ = _ || i.isLastDayOfMonth());
    var c = r(i.getDay(), this.fields.dayOfWeek);
    s(this.fields.dayOfWeek) && (c = c || p(this.fields.dayOfWeek));
    var d = this.fields.dayOfMonth.length >= y.daysInMonth[i.getMonth()], g = this.fields.dayOfWeek.length === y.constraints[5].max - y.constraints[5].min + 1, w = i.getHours();
    if (!_ && (!c || g)) {
      this._applyTimezoneShift(i, a, "Day");
      continue;
    }
    if (!d && g && !_) {
      this._applyTimezoneShift(i, a, "Day");
      continue;
    }
    if (d && !g && !c) {
      this._applyTimezoneShift(i, a, "Day");
      continue;
    }
    if (this._nthDayOfWeek > 0 && !n(i, this._nthDayOfWeek)) {
      this._applyTimezoneShift(i, a, "Day");
      continue;
    }
    if (!r(i.getMonth() + 1, this.fields.month)) {
      this._applyTimezoneShift(i, a, "Month");
      continue;
    }
    if (r(w, this.fields.hour)) {
      if (this._dstEnd === w && !e) {
        this._dstEnd = null, this._applyTimezoneShift(i, "add", "Hour");
        continue;
      }
    } else if (this._dstStart !== w) {
      this._dstStart = null, this._applyTimezoneShift(i, a, "Hour");
      continue;
    } else if (!r(w - 1, this.fields.hour)) {
      i[a + "Hour"]();
      continue;
    }
    if (!r(i.getMinutes(), this.fields.minute)) {
      this._applyTimezoneShift(i, a, "Minute");
      continue;
    }
    if (!r(i.getSeconds(), this.fields.second)) {
      this._applyTimezoneShift(i, a, "Second");
      continue;
    }
    if (l === i.getTime()) {
      a === "add" || i.getMilliseconds() === 0 ? this._applyTimezoneShift(i, a, "Second") : i.setMilliseconds(0);
      continue;
    }
    break;
  }
  if (f >= cr)
    throw new Error("Invalid expression, loop limit exceeded");
  return this._currentDate = new oe(i, this._tz), this._hasIterated = !0, i;
};
y.prototype.next = function() {
  var e = this._findSchedule();
  return this._isIterator ? {
    value: e,
    done: !this.hasNext()
  } : e;
};
y.prototype.prev = function() {
  var e = this._findSchedule(!0);
  return this._isIterator ? {
    value: e,
    done: !this.hasPrev()
  } : e;
};
y.prototype.hasNext = function() {
  var t = this._currentDate, e = this._hasIterated;
  try {
    return this._findSchedule(), !0;
  } catch {
    return !1;
  } finally {
    this._currentDate = t, this._hasIterated = e;
  }
};
y.prototype.hasPrev = function() {
  var t = this._currentDate, e = this._hasIterated;
  try {
    return this._findSchedule(!0), !0;
  } catch {
    return !1;
  } finally {
    this._currentDate = t, this._hasIterated = e;
  }
};
y.prototype.iterate = function(e, r) {
  var n = [];
  if (e >= 0)
    for (var s = 0, a = e; s < a; s++)
      try {
        var i = this.next();
        n.push(i), r && r(i, s);
      } catch {
        break;
      }
  else
    for (var s = 0, a = e; s > a; s--)
      try {
        var i = this.prev();
        n.push(i), r && r(i, s);
      } catch {
        break;
      }
  return n;
};
y.prototype.reset = function(e) {
  this._currentDate = new oe(e || this._options.currentDate);
};
y.prototype.stringify = function(e) {
  for (var r = [], n = e ? 0 : 1, s = y.map.length; n < s; ++n) {
    var a = y.map[n], i = this.fields[a], o = y.constraints[n];
    a === "dayOfMonth" && this.fields.month.length === 1 ? o = { min: 1, max: y.daysInMonth[this.fields.month[0] - 1] } : a === "dayOfWeek" && (o = { min: 0, max: 6 }, i = i[i.length - 1] === 7 ? i.slice(0, -1) : i), r.push($i(i, o.min, o.max));
  }
  return r.join(" ");
};
y.parse = function(e, r) {
  var n = this;
  typeof r == "function" && (r = {});
  function s(a, i) {
    i || (i = {}), typeof i.currentDate > "u" && (i.currentDate = new oe(void 0, n._tz)), y.predefined[a] && (a = y.predefined[a]);
    var o = [], u = (a + "").trim().split(/\s+/);
    if (u.length > 6)
      throw new Error("Invalid cron expression");
    for (var l = y.map.length - u.length, f = 0, p = y.map.length; f < p; ++f) {
      var _ = y.map[f], c = u[u.length > p ? f : f - l];
      if (f < l || !c)
        o.push(
          y._parseField(
            _,
            y.parseDefaults[f],
            y.constraints[f]
          )
        );
      else {
        var d = _ === "dayOfWeek" ? N(c) : c;
        o.push(
          y._parseField(
            _,
            d,
            y.constraints[f]
          )
        );
      }
    }
    for (var g = {}, f = 0, p = y.map.length; f < p; f++) {
      var w = y.map[f];
      g[w] = o[f];
    }
    var v = y._handleMaxDaysInMonth(g);
    return g.dayOfMonth = v || g.dayOfMonth, new y(g, i);
    function N(D) {
      var x = D.split("#");
      if (x.length > 1) {
        var L = +x[x.length - 1];
        if (/,/.test(D))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `,` special characters are incompatible");
        if (/\//.test(D))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `/` special characters are incompatible");
        if (/-/.test(D))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `-` special characters are incompatible");
        if (x.length > 2 || Number.isNaN(L) || L < 1 || L > 5)
          throw new Error("Constraint error, invalid dayOfWeek occurrence number (#)");
        return i.nthDayOfWeek = L, x[0];
      }
      return D;
    }
  }
  return s(e, r);
};
y.fieldsToExpression = function(e, r) {
  function n(_, c, d) {
    if (!c)
      throw new Error("Validation error, Field " + _ + " is missing");
    if (c.length === 0)
      throw new Error("Validation error, Field " + _ + " contains no values");
    for (var g = 0, w = c.length; g < w; g++) {
      var v = c[g];
      if (!y._isValidConstraintChar(d, v) && (typeof v != "number" || Number.isNaN(v) || v < d.min || v > d.max))
        throw new Error(
          "Constraint error, got value " + v + " expected range " + d.min + "-" + d.max
        );
    }
  }
  for (var s = {}, a = 0, i = y.map.length; a < i; ++a) {
    var o = y.map[a], u = e[o];
    n(
      o,
      u,
      y.constraints[a]
    );
    for (var l = [], f = -1; ++f < u.length; )
      l[f] = u[f];
    if (u = l.sort(y._sortCompareFn).filter(function(_, c, d) {
      return !c || _ !== d[c - 1];
    }), u.length !== l.length)
      throw new Error("Validation error, Field " + o + " contains duplicate values");
    s[o] = u;
  }
  var p = y._handleMaxDaysInMonth(s);
  return s.dayOfMonth = p || s.dayOfMonth, new y(s, r || {});
};
var Li = y, Ke = Li;
function ge() {
}
ge._parseEntry = function(e) {
  var r = e.split(" ");
  if (r.length === 6)
    return {
      interval: Ke.parse(e)
    };
  if (r.length > 6)
    return {
      interval: Ke.parse(
        r.slice(0, 6).join(" ")
      ),
      command: r.slice(6, r.length)
    };
  throw new Error("Invalid entry: " + e);
};
ge.parseExpression = function(e, r) {
  return Ke.parse(e, r);
};
ge.fieldsToExpression = function(e, r) {
  return Ke.fieldsToExpression(e, r);
};
ge.parseString = function(e) {
  for (var r = e.split(`
`), n = {
    variables: {},
    expressions: [],
    errors: {}
  }, s = 0, a = r.length; s < a; s++) {
    var i = r[s], o = null, u = i.trim();
    if (u.length > 0) {
      if (u.match(/^#/))
        continue;
      if (o = u.match(/^(.*)=(.*)$/))
        n.variables[o[1]] = o[2];
      else {
        var l = null;
        try {
          l = ge._parseEntry("0 " + u), n.expressions.push(l.interval);
        } catch (f) {
          n.errors[u] = f;
        }
      }
    }
  }
  return n;
};
var zi = ge;
const fr = /* @__PURE__ */ pr(zi);
var _n = { exports: {} }, S = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $e = Symbol.for("react.element"), Ai = Symbol.for("react.portal"), Zi = Symbol.for("react.fragment"), Ri = Symbol.for("react.strict_mode"), Ui = Symbol.for("react.profiler"), Hi = Symbol.for("react.provider"), qi = Symbol.for("react.context"), Pi = Symbol.for("react.forward_ref"), Yi = Symbol.for("react.suspense"), ji = Symbol.for("react.memo"), Gi = Symbol.for("react.lazy"), dr = Symbol.iterator;
function Ji(t) {
  return t === null || typeof t != "object" ? null : (t = dr && t[dr] || t["@@iterator"], typeof t == "function" ? t : null);
}
var vn = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, wn = Object.assign, Nn = {};
function ke(t, e, r) {
  this.props = t, this.context = e, this.refs = Nn, this.updater = r || vn;
}
ke.prototype.isReactComponent = {};
ke.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
ke.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function bn() {
}
bn.prototype = ke.prototype;
function Mt(t, e, r) {
  this.props = t, this.context = e, this.refs = Nn, this.updater = r || vn;
}
var xt = Mt.prototype = new bn();
xt.constructor = Mt;
wn(xt, ke.prototype);
xt.isPureReactComponent = !0;
var mr = Array.isArray, kn = Object.prototype.hasOwnProperty, Ct = { current: null }, Tn = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sn(t, e, r) {
  var n, s = {}, a = null, i = null;
  if (e != null)
    for (n in e.ref !== void 0 && (i = e.ref), e.key !== void 0 && (a = "" + e.key), e)
      kn.call(e, n) && !Tn.hasOwnProperty(n) && (s[n] = e[n]);
  var o = arguments.length - 2;
  if (o === 1)
    s.children = r;
  else if (1 < o) {
    for (var u = Array(o), l = 0; l < o; l++)
      u[l] = arguments[l + 2];
    s.children = u;
  }
  if (t && t.defaultProps)
    for (n in o = t.defaultProps, o)
      s[n] === void 0 && (s[n] = o[n]);
  return { $$typeof: $e, type: t, key: a, ref: i, props: s, _owner: Ct.current };
}
function Bi(t, e) {
  return { $$typeof: $e, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function It(t) {
  return typeof t == "object" && t !== null && t.$$typeof === $e;
}
function Qi(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(r) {
    return e[r];
  });
}
var hr = /\/+/g;
function ht(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? Qi("" + t.key) : e.toString(36);
}
function Ye(t, e, r, n, s) {
  var a = typeof t;
  (a === "undefined" || a === "boolean") && (t = null);
  var i = !1;
  if (t === null)
    i = !0;
  else
    switch (a) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case $e:
          case Ai:
            i = !0;
        }
    }
  if (i)
    return i = t, s = s(i), t = n === "" ? "." + ht(i, 0) : n, mr(s) ? (r = "", t != null && (r = t.replace(hr, "$&/") + "/"), Ye(s, e, r, "", function(l) {
      return l;
    })) : s != null && (It(s) && (s = Bi(s, r + (!s.key || i && i.key === s.key ? "" : ("" + s.key).replace(hr, "$&/") + "/") + t)), e.push(s)), 1;
  if (i = 0, n = n === "" ? "." : n + ":", mr(t))
    for (var o = 0; o < t.length; o++) {
      a = t[o];
      var u = n + ht(a, o);
      i += Ye(a, e, r, u, s);
    }
  else if (u = Ji(t), typeof u == "function")
    for (t = u.call(t), o = 0; !(a = t.next()).done; )
      a = a.value, u = n + ht(a, o++), i += Ye(a, e, r, u, s);
  else if (a === "object")
    throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function He(t, e, r) {
  if (t == null)
    return t;
  var n = [], s = 0;
  return Ye(t, n, "", "", function(a) {
    return e.call(r, a, s++);
  }), n;
}
function Ki(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(r) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = r);
    }, function(r) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = r);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1)
    return t._result.default;
  throw t._result;
}
var z = { current: null }, je = { transition: null }, Xi = { ReactCurrentDispatcher: z, ReactCurrentBatchConfig: je, ReactCurrentOwner: Ct };
function On() {
  throw Error("act(...) is not supported in production builds of React.");
}
S.Children = { map: He, forEach: function(t, e, r) {
  He(t, function() {
    e.apply(this, arguments);
  }, r);
}, count: function(t) {
  var e = 0;
  return He(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return He(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!It(t))
    throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
S.Component = ke;
S.Fragment = Zi;
S.Profiler = Ui;
S.PureComponent = Mt;
S.StrictMode = Ri;
S.Suspense = Yi;
S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xi;
S.act = On;
S.cloneElement = function(t, e, r) {
  if (t == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var n = wn({}, t.props), s = t.key, a = t.ref, i = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (a = e.ref, i = Ct.current), e.key !== void 0 && (s = "" + e.key), t.type && t.type.defaultProps)
      var o = t.type.defaultProps;
    for (u in e)
      kn.call(e, u) && !Tn.hasOwnProperty(u) && (n[u] = e[u] === void 0 && o !== void 0 ? o[u] : e[u]);
  }
  var u = arguments.length - 2;
  if (u === 1)
    n.children = r;
  else if (1 < u) {
    o = Array(u);
    for (var l = 0; l < u; l++)
      o[l] = arguments[l + 2];
    n.children = o;
  }
  return { $$typeof: $e, type: t.type, key: s, ref: a, props: n, _owner: i };
};
S.createContext = function(t) {
  return t = { $$typeof: qi, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: Hi, _context: t }, t.Consumer = t;
};
S.createElement = Sn;
S.createFactory = function(t) {
  var e = Sn.bind(null, t);
  return e.type = t, e;
};
S.createRef = function() {
  return { current: null };
};
S.forwardRef = function(t) {
  return { $$typeof: Pi, render: t };
};
S.isValidElement = It;
S.lazy = function(t) {
  return { $$typeof: Gi, _payload: { _status: -1, _result: t }, _init: Ki };
};
S.memo = function(t, e) {
  return { $$typeof: ji, type: t, compare: e === void 0 ? null : e };
};
S.startTransition = function(t) {
  var e = je.transition;
  je.transition = {};
  try {
    t();
  } finally {
    je.transition = e;
  }
};
S.unstable_act = On;
S.useCallback = function(t, e) {
  return z.current.useCallback(t, e);
};
S.useContext = function(t) {
  return z.current.useContext(t);
};
S.useDebugValue = function() {
};
S.useDeferredValue = function(t) {
  return z.current.useDeferredValue(t);
};
S.useEffect = function(t, e) {
  return z.current.useEffect(t, e);
};
S.useId = function() {
  return z.current.useId();
};
S.useImperativeHandle = function(t, e, r) {
  return z.current.useImperativeHandle(t, e, r);
};
S.useInsertionEffect = function(t, e) {
  return z.current.useInsertionEffect(t, e);
};
S.useLayoutEffect = function(t, e) {
  return z.current.useLayoutEffect(t, e);
};
S.useMemo = function(t, e) {
  return z.current.useMemo(t, e);
};
S.useReducer = function(t, e, r) {
  return z.current.useReducer(t, e, r);
};
S.useRef = function(t) {
  return z.current.useRef(t);
};
S.useState = function(t) {
  return z.current.useState(t);
};
S.useSyncExternalStore = function(t, e, r) {
  return z.current.useSyncExternalStore(t, e, r);
};
S.useTransition = function() {
  return z.current.useTransition();
};
S.version = "18.3.1";
_n.exports = S;
var ea = _n.exports;
const ue = /* @__PURE__ */ pr(ea);
var En = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, yr = ue.createContext && ue.createContext(En), ee = function() {
  return ee = Object.assign || function(t) {
    for (var e, r = 1, n = arguments.length; r < n; r++) {
      e = arguments[r];
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
  }, ee.apply(this, arguments);
}, ta = function(t, e) {
  var r = {};
  for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, n = Object.getOwnPropertySymbols(t); s < n.length; s++)
      e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[s]) && (r[n[s]] = t[n[s]]);
  return r;
};
function Dn(t) {
  return t && t.map(function(e, r) {
    return ue.createElement(e.tag, ee({
      key: r
    }, e.attr), Dn(e.child));
  });
}
function nt(t) {
  return function(e) {
    return ue.createElement(ra, ee({
      attr: ee({}, t.attr)
    }, e), Dn(t.child));
  };
}
function ra(t) {
  var e = function(r) {
    var n = t.attr, s = t.size, a = t.title, i = ta(t, ["attr", "size", "title"]), o = s || r.size || "1em", u;
    return r.className && (u = r.className), t.className && (u = (u ? u + " " : "") + t.className), ue.createElement("svg", ee({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, n, i, {
      className: u,
      style: ee(ee({
        color: t.color || r.color
      }, r.style), t.style),
      height: o,
      width: o,
      xmlns: "http://www.w3.org/2000/svg"
    }), a && ue.createElement("title", null, a), t.children);
  };
  return yr !== void 0 ? ue.createElement(yr.Consumer, null, function(r) {
    return e(r);
  }) : e(En);
}
function na(t) {
  return nt({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" } }] })(t);
}
function sa(t) {
  return nt({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" } }] })(t);
}
function ia(t) {
  return nt({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" } }] })(t);
}
function aa(t) {
  return nt({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" } }] })(t);
}
const oa = "numTasksPerBatch";
var m = "/Users/richardguerre/Projects/flow/plugins/repeating-tasks/src/web.tsx";
const la = xn((t) => {
  const e = t.React, r = t.components, n = () => {
    const c = t.operations.useLazyQuery({
      operationName: "repeatingTasks"
    }), d = (c == null ? void 0 : c.data) ?? [];
    return /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-4 items-start", __self: void 0, __source: {
      fileName: m,
      lineNumber: 18,
      columnNumber: 7
    } }, /* @__PURE__ */ e.createElement("div", { className: "flex gap-4 flex-wrap items-start", __self: void 0, __source: {
      fileName: m,
      lineNumber: 19,
      columnNumber: 9
    } }, d.map((g) => /* @__PURE__ */ e.createElement(s, { key: g.id, template: g, __self: void 0, __source: {
      fileName: m,
      lineNumber: 21,
      columnNumber: 13
    } }))), /* @__PURE__ */ e.createElement(o, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 24,
      columnNumber: 9
    } }));
  }, s = (c) => {
    const [d, g] = t.operations.useMutation("removeRepeatingTask"), [w, v] = t.operations.useMutation("editRepeatingTask"), N = () => d({
      id: c.template.id
    }), D = () => w({
      id: c.template.id,
      enabled: !0
    }), x = () => w({
      id: c.template.id,
      enabled: !1
    });
    return /* @__PURE__ */ e.createElement("div", { className: "bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-md p-3 shadow-lg w-64", __self: void 0, __source: {
      fileName: m,
      lineNumber: 40,
      columnNumber: 7
    } }, /* @__PURE__ */ e.createElement(r.TaskTitleInput, { initialValue: c.template.title, readOnly: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 41,
      columnNumber: 9
    } }), /* @__PURE__ */ e.createElement("div", { className: "text-foreground-700 text-sm", __self: void 0, __source: {
      fileName: m,
      lineNumber: 42,
      columnNumber: 9
    } }, _(c.template.cron)), /* @__PURE__ */ e.createElement("div", { className: "flex gap-2", __self: void 0, __source: {
      fileName: m,
      lineNumber: 45,
      columnNumber: 9
    } }, /* @__PURE__ */ e.createElement(u, { template: c.template, __self: void 0, __source: {
      fileName: m,
      lineNumber: 46,
      columnNumber: 11
    } }), c.template.enabled ? /* @__PURE__ */ e.createElement(r.Tooltip, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 48,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement(r.TooltipTrigger, { asChild: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 49,
      columnNumber: 15
    } }, /* @__PURE__ */ e.createElement("button", { onClick: x, disabled: v, className: "bg-background-200/50 text-foreground-700 hover:bg-background-300/70 active:bg-background-300/100 flex h-6 w-6 items-center justify-center rounded-full text-sm", __self: void 0, __source: {
      fileName: m,
      lineNumber: 50,
      columnNumber: 17
    } }, /* @__PURE__ */ e.createElement(na, { size: 14, __self: void 0, __source: {
      fileName: m,
      lineNumber: 55,
      columnNumber: 19
    } }))), /* @__PURE__ */ e.createElement(r.TooltipContent, { side: "bottom", __self: void 0, __source: {
      fileName: m,
      lineNumber: 58,
      columnNumber: 15
    } }, "Disable")) : /* @__PURE__ */ e.createElement(r.Tooltip, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 61,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement(r.TooltipTrigger, { asChild: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 62,
      columnNumber: 15
    } }, /* @__PURE__ */ e.createElement("button", { onClick: D, disabled: v, className: "bg-background-200/50 text-foreground-700 hover:bg-background-300/70 active:bg-background-300/100 flex h-6 w-6 items-center justify-center rounded-full text-sm", __self: void 0, __source: {
      fileName: m,
      lineNumber: 63,
      columnNumber: 17
    } }, /* @__PURE__ */ e.createElement(ia, { size: 14, __self: void 0, __source: {
      fileName: m,
      lineNumber: 68,
      columnNumber: 19
    } }))), /* @__PURE__ */ e.createElement(r.TooltipContent, { side: "bottom", __self: void 0, __source: {
      fileName: m,
      lineNumber: 71,
      columnNumber: 15
    } }, "Enable")), /* @__PURE__ */ e.createElement(r.Tooltip, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 74,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.TooltipTrigger, { asChild: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 75,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement("button", { onClick: N, disabled: g, className: "flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm bg-background-200 text-foreground-700 hover:bg-negative-100 hover:text-negative-600 active:bg-negative-200", __self: void 0, __source: {
      fileName: m,
      lineNumber: 76,
      columnNumber: 15
    } }, /* @__PURE__ */ e.createElement(aa, { size: 16, __self: void 0, __source: {
      fileName: m,
      lineNumber: 81,
      columnNumber: 17
    } }))), /* @__PURE__ */ e.createElement(r.TooltipContent, { side: "bottom", __self: void 0, __source: {
      fileName: m,
      lineNumber: 84,
      columnNumber: 13
    } }, "Delete"))));
  }, a = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  }, i = [{
    value: "day",
    label: "Day"
  }, {
    value: "week",
    label: "Week"
  }, {
    value: "month",
    label: "Month"
  }], o = () => {
    const [c, d] = e.useState(!1), [g, w] = t.operations.useMutation("addRepeatingTask"), v = async (N) => {
      let D = N.cron;
      N.useCron || (D = p(N.simplified)), D || (D = "0 0 * * *");
      const x = N.durationInMinutes ? parseInt(N.durationInMinutes) : void 0;
      await g({
        title: N.title,
        cron: D,
        simplified: N.useCron ? void 0 : N.simplified,
        durationInMinutes: x,
        enabled: !0
      }), d(!1);
    };
    return /* @__PURE__ */ e.createElement(r.Dialog, { open: c, onOpenChange: d, __self: void 0, __source: {
      fileName: m,
      lineNumber: 138,
      columnNumber: 7
    } }, /* @__PURE__ */ e.createElement(r.DialogTrigger, { asChild: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 139,
      columnNumber: 9
    } }, /* @__PURE__ */ e.createElement(r.Button, { secondary: !0, loading: w, __self: void 0, __source: {
      fileName: m,
      lineNumber: 140,
      columnNumber: 11
    } }, "Add repeating task")), /* @__PURE__ */ e.createElement(r.DialogContent, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 144,
      columnNumber: 9
    } }, /* @__PURE__ */ e.createElement(r.DialogHeader, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 145,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.DialogTitle, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 146,
      columnNumber: 13
    } }, "Add a repeating task"), /* @__PURE__ */ e.createElement(r.DialogDescription, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 147,
      columnNumber: 13
    } }, 'Add a repeating task to your Flow. For example, "Check notifications" is a good task to start your day with.')), /* @__PURE__ */ e.createElement(l, { onSubmit: v, defaultValues: {
      title: "",
      durationInMinutes: void 0,
      useCron: !1,
      simplified: {
        everyNum: 1,
        everyUnit: "week",
        onDay: [1],
        onDaysOfMonth: [1, 15]
      }
    }, saving: w, __self: void 0, __source: {
      fileName: m,
      lineNumber: 152,
      columnNumber: 11
    } })));
  }, u = (c) => {
    var D;
    const [d, g] = e.useState(!1), [w, v] = t.operations.useMutation("editRepeatingTask"), N = async (x) => {
      const L = x.durationInMinutes ? parseInt(x.durationInMinutes) : void 0, ce = x.useCron ? x.cron : p(x.simplified);
      await w({
        id: c.template.id,
        ...x,
        durationInMinutes: L,
        cron: ce
      }), g(!1);
    };
    return /* @__PURE__ */ e.createElement(r.Dialog, { open: d, onOpenChange: g, __self: void 0, __source: {
      fileName: m,
      lineNumber: 192,
      columnNumber: 7
    } }, /* @__PURE__ */ e.createElement(r.Tooltip, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 193,
      columnNumber: 9
    } }, /* @__PURE__ */ e.createElement(r.TooltipTrigger, { asChild: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 194,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.DialogTrigger, { asChild: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 195,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement("button", { disabled: v, className: "bg-background-200/50 text-foreground-700 hover:bg-background-300/70 active:bg-background-300/100 flex h-6 w-6 items-center justify-center rounded-full text-sm", __self: void 0, __source: {
      fileName: m,
      lineNumber: 196,
      columnNumber: 15
    } }, /* @__PURE__ */ e.createElement(sa, { size: 14, __self: void 0, __source: {
      fileName: m,
      lineNumber: 200,
      columnNumber: 17
    } })))), /* @__PURE__ */ e.createElement(r.TooltipContent, { side: "bottom", __self: void 0, __source: {
      fileName: m,
      lineNumber: 204,
      columnNumber: 11
    } }, "Edit")), /* @__PURE__ */ e.createElement(r.DialogContent, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 206,
      columnNumber: 9
    } }, /* @__PURE__ */ e.createElement(r.DialogHeader, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 207,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.DialogTitle, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 208,
      columnNumber: 13
    } }, "Edit a repeating task"), /* @__PURE__ */ e.createElement(r.DialogDescription, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 209,
      columnNumber: 13
    } }, "Edit the repeating task. Updates will be applied to all future tasks that have not been completed yet.")), /* @__PURE__ */ e.createElement(l, { onSubmit: N, defaultValues: {
      title: c.template.title,
      durationInMinutes: (D = c.template.durationInMinutes) == null ? void 0 : D.toString(),
      useCron: !c.template.simplified,
      cron: c.template.cron,
      simplified: c.template.simplified
    }, saving: v, __self: void 0, __source: {
      fileName: m,
      lineNumber: 214,
      columnNumber: 11
    } })));
  }, l = (c) => {
    var ce;
    const {
      register: d,
      control: g,
      handleSubmit: w,
      watch: v,
      setValue: N,
      formState: D
    } = t.reactHookForm.useForm({
      defaultValues: c.defaultValues
    }), [x, L] = v(["useCron", "simplified.everyUnit"]);
    return /* @__PURE__ */ e.createElement("form", { onSubmit: w(c.onSubmit), className: "flex flex-col gap-4", __self: void 0, __source: {
      fileName: m,
      lineNumber: 243,
      columnNumber: 7
    } }, /* @__PURE__ */ e.createElement("div", { className: "ring-primary-200 text-foreground-900 hover:ring-primary-300 focus:ring-primary-500 w-full rounded-md px-3 py-2 text-sm outline-none ring-2 transition-colors duration-300 ease-in-out", __self: void 0, __source: {
      fileName: m,
      lineNumber: 244,
      columnNumber: 9
    } }, /* @__PURE__ */ e.createElement(t.reactHookForm.Controller, { name: "title", control: g, rules: {
      required: !0
    }, render: ({
      field: C
    }) => /* @__PURE__ */ e.createElement(r.TaskTitleInput, { initialValue: C.value, onSave: C.onChange, onCancel: C.onBlur, autoFocus: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 250,
      columnNumber: 15
    } }), __self: void 0, __source: {
      fileName: m,
      lineNumber: 245,
      columnNumber: 11
    } })), x ? /* @__PURE__ */ e.createElement("div", { className: "flex flex-col items-start gap-3", __self: void 0, __source: {
      fileName: m,
      lineNumber: 260,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.FormInput, { label: "Cron expression", description: "Cron expression for when the tasks should be created. For example, '0 0 * * *' means every day at midnight.", type: "text", ...d("cron", {
      required: !0,
      validate: {
        parse: (C) => Object.keys(fr.parseString(C ?? "").errors).length === 0 || "Invalid cron expression"
      }
    }), __self: void 0, __source: {
      fileName: m,
      lineNumber: 261,
      columnNumber: 13
    } }), /* @__PURE__ */ e.createElement(r.Button, { secondary: !0, sm: !0, type: "button", onClick: () => N("useCron", !1), __self: void 0, __source: {
      fileName: m,
      lineNumber: 274,
      columnNumber: 13
    } }, "Show simplified")) : /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-3 items-start", __self: void 0, __source: {
      fileName: m,
      lineNumber: 279,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2", __self: void 0, __source: {
      fileName: m,
      lineNumber: 280,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement("div", { className: "flex gap-2 items-center font-medium text-foreground-900 text-base", __self: void 0, __source: {
      fileName: m,
      lineNumber: 281,
      columnNumber: 15
    } }, "Repeats every", L !== "week" && /* @__PURE__ */ e.createElement(r.FormInput, { type: "number", className: "w-16", ...d("simplified.everyNum", {
      required: !0
    }), __self: void 0, __source: {
      fileName: m,
      lineNumber: 284,
      columnNumber: 19
    } }), /* @__PURE__ */ e.createElement(r.FormSelect, { name: "simplified.everyUnit", control: g, __self: void 0, __source: {
      fileName: m,
      lineNumber: 290,
      columnNumber: 17
    } }, /* @__PURE__ */ e.createElement(r.SelectTrigger, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 291,
      columnNumber: 19
    } }, /* @__PURE__ */ e.createElement(r.SelectValue, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 292,
      columnNumber: 21
    } })), /* @__PURE__ */ e.createElement(r.SelectContent, { align: "end", __self: void 0, __source: {
      fileName: m,
      lineNumber: 294,
      columnNumber: 19
    } }, i.map((C) => /* @__PURE__ */ e.createElement(r.SelectItem, { value: C.value, __self: void 0, __source: {
      fileName: m,
      lineNumber: 296,
      columnNumber: 23
    } }, C.label))))), L === "week" && /* @__PURE__ */ e.createElement("div", { className: "flex gap-2 font-medium text-foreground-900 text-base", __self: void 0, __source: {
      fileName: m,
      lineNumber: 302,
      columnNumber: 17
    } }, "Repeats on", /* @__PURE__ */ e.createElement(t.reactHookForm.Controller, { control: g, name: "simplified.onDay", render: ({
      field: C
    }) => /* @__PURE__ */ e.createElement(f, { days: C.value ?? [], onChange: C.onChange, __self: void 0, __source: {
      fileName: m,
      lineNumber: 308,
      columnNumber: 23
    } }), __self: void 0, __source: {
      fileName: m,
      lineNumber: 304,
      columnNumber: 19
    } })), L === "month" && /* @__PURE__ */ e.createElement("div", { className: "flex flex-col gap-2 text-foreground-700", __self: void 0, __source: {
      fileName: m,
      lineNumber: 314,
      columnNumber: 17
    } }, /* @__PURE__ */ e.createElement(r.FormInput, { label: "Repeats on", description: "Comma-separated list of days of the month (1-31)", className: "max-w-48", error: (ce = D.errors.simplified) == null ? void 0 : ce.onDaysOfMonth, ...d("simplified.onDaysOfMonth", {
      required: !0,
      setValueAs: (C) => Array.isArray(C) ? C : C.split(",").map(Number),
      validate: {
        parse: (C) => (C == null ? void 0 : C.every((Te) => !Number.isNaN(Te) && Te >= 1 && Te <= 31)) || "This should be a comma-separated list of days of the month (1-31)"
      }
    }), __self: void 0, __source: {
      fileName: m,
      lineNumber: 315,
      columnNumber: 19
    } }))), /* @__PURE__ */ e.createElement(r.Button, { secondary: !0, sm: !0, type: "button", onClick: () => N("useCron", !0), __self: void 0, __source: {
      fileName: m,
      lineNumber: 334,
      columnNumber: 13
    } }, "Show advanced")), /* @__PURE__ */ e.createElement(r.FormSelect, { name: "durationInMinutes", label: "Duration", description: "How long will each task take to complete?", control: g, __self: void 0, __source: {
      fileName: m,
      lineNumber: 339,
      columnNumber: 9
    } }, /* @__PURE__ */ e.createElement(r.SelectTrigger, { className: "max-w-48", __self: void 0, __source: {
      fileName: m,
      lineNumber: 345,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.SelectValue, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 346,
      columnNumber: 13
    } })), /* @__PURE__ */ e.createElement(r.SelectContent, { className: "max-h-40 overflow-y-scroll", __self: void 0, __source: {
      fileName: m,
      lineNumber: 348,
      columnNumber: 11
    } }, ua.map((C) => /* @__PURE__ */ e.createElement(r.SelectItem, { value: C.value.toString(), __self: void 0, __source: {
      fileName: m,
      lineNumber: 350,
      columnNumber: 15
    } }, C.label)))), /* @__PURE__ */ e.createElement(r.Button, { className: "self-end", loading: c.saving, __self: void 0, __source: {
      fileName: m,
      lineNumber: 354,
      columnNumber: 9
    } }, "Save"));
  }, f = (c) => {
    const d = (g) => {
      c.days.includes(g) ? c.onChange(c.days.filter((v) => v !== g)) : c.onChange([...c.days, g]);
    };
    return /* @__PURE__ */ e.createElement("div", { className: "flex gap-1", __self: void 0, __source: {
      fileName: m,
      lineNumber: 372,
      columnNumber: 7
    } }, Object.values(a).map((g, w) => /* @__PURE__ */ e.createElement(r.Tooltip, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 374,
      columnNumber: 11
    } }, /* @__PURE__ */ e.createElement(r.TooltipTrigger, { asChild: !0, __self: void 0, __source: {
      fileName: m,
      lineNumber: 375,
      columnNumber: 13
    } }, /* @__PURE__ */ e.createElement("button", { type: "button", onClick: () => d(w), className: t.tw("flex h-7 w-7 appearance-none items-center justify-center rounded-full text-xs", c.days.includes(w) ? "bg-primary-100 text-primary-600" : "bg-gray-200 text-gray-600"), __self: void 0, __source: {
      fileName: m,
      lineNumber: 376,
      columnNumber: 15
    } }, g[0])), /* @__PURE__ */ e.createElement(r.TooltipContent, { __self: void 0, __source: {
      fileName: m,
      lineNumber: 389,
      columnNumber: 13
    } }, g))));
  }, p = ({
    everyNum: c,
    everyUnit: d,
    onDay: g,
    onDaysOfMonth: w
  }) => d === "day" ? `0 0 */${c} * *` : d === "week" ? `0 0 * * ${(g ?? [1]).join(",")}` : d === "month" ? `0 0 ${(w == null ? void 0 : w.join(",")) ?? "1"} */${c} *` : "0 0 * * *", _ = (c) => {
    const d = fr.parseExpression(c).fields;
    let g = "Every ";
    if (d.dayOfWeek.length === 7 ? g += "day" : d.dayOfWeek.length === 5 && !d.dayOfWeek.some((w) => w === 0 || w === 6) ? g += "weekday" : d.dayOfWeek.length !== 7 && (g += `${d.dayOfWeek.map((w) => a[w]).join(", ")}`), d.dayOfMonth.length !== 31) {
      const w = d.month.length !== 12 ? "the " + d.month.join(", ") + "months" : "every month";
      g += `${d.dayOfMonth.join(", ")} of ${w}`;
    }
    return g;
  };
  return {
    name: "Repeating tasks",
    settings: {
      [oa]: {
        type: "textfield",
        label: "Tasks in advance",
        description: "How many tasks should be created in advance when enabling a repeating task?",
        required: !0,
        inputType: "number",
        defaultValue: 10,
        registerOptions: {
          valueAsNumber: !0
        }
      },
      "repeating-tasks": {
        type: "custom",
        render: () => /* @__PURE__ */ e.createElement(n, { __self: void 0, __source: {
          fileName: m,
          lineNumber: 452,
          columnNumber: 23
        } })
      }
    }
  };
}), ua = [{
  label: "None",
  value: 0
}, {
  label: "5 minutes",
  value: 5
}, {
  label: "10 minutes",
  value: 10
}, {
  label: "15 minutes",
  value: 15
}, {
  label: "20 minutes",
  value: 20
}, {
  label: "30 minutes",
  value: 30
}, {
  label: "40 minutes",
  value: 40
}, {
  label: "45 minutes",
  value: 45
}, {
  label: "1 hour",
  value: 60
}, {
  label: "1.5 hours",
  value: 90
}, {
  label: "2 hours",
  value: 120
}, {
  label: "2.5 hours",
  value: 150
}, {
  label: "3 hours",
  value: 180
}];
export {
  la as default
};
