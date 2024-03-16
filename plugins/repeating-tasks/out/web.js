const Bp = (e) => ({ plugin: e });
function Wf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
class Un extends Error {
}
class Zp extends Un {
  constructor(t) {
    super(`Invalid DateTime: ${t.toMessage()}`);
  }
}
class Yp extends Un {
  constructor(t) {
    super(`Invalid Interval: ${t.toMessage()}`);
  }
}
class Gp extends Un {
  constructor(t) {
    super(`Invalid Duration: ${t.toMessage()}`);
  }
}
class Qn extends Un {
}
class Uf extends Un {
  constructor(t) {
    super(`Invalid unit ${t}`);
  }
}
class ze extends Un {
}
class jt extends Un {
  constructor() {
    super("Zone is an abstract class");
  }
}
const O = "numeric", gt = "short", je = "long", Ro = {
  year: O,
  month: O,
  day: O
}, Hf = {
  year: O,
  month: gt,
  day: O
}, Qp = {
  year: O,
  month: gt,
  day: O,
  weekday: gt
}, jf = {
  year: O,
  month: je,
  day: O
}, Bf = {
  year: O,
  month: je,
  day: O,
  weekday: je
}, Zf = {
  hour: O,
  minute: O
}, Yf = {
  hour: O,
  minute: O,
  second: O
}, Gf = {
  hour: O,
  minute: O,
  second: O,
  timeZoneName: gt
}, Qf = {
  hour: O,
  minute: O,
  second: O,
  timeZoneName: je
}, qf = {
  hour: O,
  minute: O,
  hourCycle: "h23"
}, Kf = {
  hour: O,
  minute: O,
  second: O,
  hourCycle: "h23"
}, Jf = {
  hour: O,
  minute: O,
  second: O,
  hourCycle: "h23",
  timeZoneName: gt
}, Xf = {
  hour: O,
  minute: O,
  second: O,
  hourCycle: "h23",
  timeZoneName: je
}, ed = {
  year: O,
  month: O,
  day: O,
  hour: O,
  minute: O
}, td = {
  year: O,
  month: O,
  day: O,
  hour: O,
  minute: O,
  second: O
}, nd = {
  year: O,
  month: gt,
  day: O,
  hour: O,
  minute: O
}, rd = {
  year: O,
  month: gt,
  day: O,
  hour: O,
  minute: O,
  second: O
}, qp = {
  year: O,
  month: gt,
  day: O,
  weekday: gt,
  hour: O,
  minute: O
}, id = {
  year: O,
  month: je,
  day: O,
  hour: O,
  minute: O,
  timeZoneName: gt
}, od = {
  year: O,
  month: je,
  day: O,
  hour: O,
  minute: O,
  second: O,
  timeZoneName: gt
}, sd = {
  year: O,
  month: je,
  day: O,
  weekday: je,
  hour: O,
  minute: O,
  timeZoneName: je
}, ld = {
  year: O,
  month: je,
  day: O,
  weekday: je,
  hour: O,
  minute: O,
  second: O,
  timeZoneName: je
};
class _r {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new jt();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new jt();
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
    throw new jt();
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
  offsetName(t, n) {
    throw new jt();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(t, n) {
    throw new jt();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(t) {
    throw new jt();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(t) {
    throw new jt();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new jt();
  }
}
let bs = null;
class zi extends _r {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return bs === null && (bs = new zi()), bs;
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
  offsetName(t, {
    format: n,
    locale: r
  }) {
    return gd(t, n, r);
  }
  /** @override **/
  formatOffset(t, n) {
    return ri(this.offset(t), n);
  }
  /** @override **/
  offset(t) {
    return -new Date(t).getTimezoneOffset();
  }
  /** @override **/
  equals(t) {
    return t.type === "system";
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
let ko = {};
function Kp(e) {
  return ko[e] || (ko[e] = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  })), ko[e];
}
const Jp = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function Xp(e, t) {
  const n = e.format(t).replace(/\u200E/g, ""), r = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n), [, i, o, s, l, a, u, c] = r;
  return [s, i, o, l, a, u, c];
}
function ey(e, t) {
  const n = e.formatToParts(t), r = [];
  for (let i = 0; i < n.length; i++) {
    const {
      type: o,
      value: s
    } = n[i], l = Jp[o];
    o === "era" ? r[l] = s : R(l) || (r[l] = parseInt(s, 10));
  }
  return r;
}
let Gi = {};
class Tt extends _r {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(t) {
    return Gi[t] || (Gi[t] = new Tt(t)), Gi[t];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    Gi = {}, ko = {};
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
   * @return {boolean}
   */
  static isValidSpecifier(t) {
    return this.isValidZone(t);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(t) {
    if (!t)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: t
      }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(t) {
    super(), this.zoneName = t, this.valid = Tt.isValidZone(t);
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
  offsetName(t, {
    format: n,
    locale: r
  }) {
    return gd(t, n, r, this.name);
  }
  /** @override **/
  formatOffset(t, n) {
    return ri(this.offset(t), n);
  }
  /** @override **/
  offset(t) {
    const n = new Date(t);
    if (isNaN(n))
      return NaN;
    const r = Kp(this.name);
    let [i, o, s, l, a, u, c] = r.formatToParts ? ey(r, n) : Xp(r, n);
    l === "BC" && (i = -Math.abs(i) + 1);
    const p = ys({
      year: i,
      month: o,
      day: s,
      hour: a === 24 ? 0 : a,
      minute: u,
      second: c,
      millisecond: 0
    });
    let h = +n;
    const g = h % 1e3;
    return h -= g >= 0 ? g : 1e3 + g, (p - h) / (60 * 1e3);
  }
  /** @override **/
  equals(t) {
    return t.type === "iana" && t.name === this.name;
  }
  /** @override **/
  get isValid() {
    return this.valid;
  }
}
let Fu = {};
function ty(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let r = Fu[n];
  return r || (r = new Intl.ListFormat(e, t), Fu[n] = r), r;
}
let kl = {};
function xl(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let r = kl[n];
  return r || (r = new Intl.DateTimeFormat(e, t), kl[n] = r), r;
}
let El = {};
function ny(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let r = El[n];
  return r || (r = new Intl.NumberFormat(e, t), El[n] = r), r;
}
let Tl = {};
function ry(e, t = {}) {
  const {
    base: n,
    ...r
  } = t, i = JSON.stringify([e, r]);
  let o = Tl[i];
  return o || (o = new Intl.RelativeTimeFormat(e, t), Tl[i] = o), o;
}
let Kr = null;
function iy() {
  return Kr || (Kr = new Intl.DateTimeFormat().resolvedOptions().locale, Kr);
}
let Au = {};
function oy(e) {
  let t = Au[e];
  if (!t) {
    const n = new Intl.Locale(e);
    t = "getWeekInfo" in n ? n.getWeekInfo() : n.weekInfo, Au[e] = t;
  }
  return t;
}
function sy(e) {
  const t = e.indexOf("-x-");
  t !== -1 && (e = e.substring(0, t));
  const n = e.indexOf("-u-");
  if (n === -1)
    return [e];
  {
    let r, i;
    try {
      r = xl(e).resolvedOptions(), i = e;
    } catch {
      const a = e.substring(0, n);
      r = xl(a).resolvedOptions(), i = a;
    }
    const {
      numberingSystem: o,
      calendar: s
    } = r;
    return [i, o, s];
  }
}
function ly(e, t, n) {
  return (n || t) && (e.includes("-u-") || (e += "-u"), n && (e += `-ca-${n}`), t && (e += `-nu-${t}`)), e;
}
function ay(e) {
  const t = [];
  for (let n = 1; n <= 12; n++) {
    const r = A.utc(2009, n, 1);
    t.push(e(r));
  }
  return t;
}
function uy(e) {
  const t = [];
  for (let n = 1; n <= 7; n++) {
    const r = A.utc(2016, 11, 13 + n);
    t.push(e(r));
  }
  return t;
}
function Qi(e, t, n, r) {
  const i = e.listingMode();
  return i === "error" ? null : i === "en" ? n(t) : r(t);
}
function cy(e) {
  return e.numberingSystem && e.numberingSystem !== "latn" ? !1 : e.numberingSystem === "latn" || !e.locale || e.locale.startsWith("en") || new Intl.DateTimeFormat(e.intl).resolvedOptions().numberingSystem === "latn";
}
class fy {
  constructor(t, n, r) {
    this.padTo = r.padTo || 0, this.floor = r.floor || !1;
    const {
      padTo: i,
      floor: o,
      ...s
    } = r;
    if (!n || Object.keys(s).length > 0) {
      const l = {
        useGrouping: !1,
        ...r
      };
      r.padTo > 0 && (l.minimumIntegerDigits = r.padTo), this.inf = ny(t, l);
    }
  }
  format(t) {
    if (this.inf) {
      const n = this.floor ? Math.floor(t) : t;
      return this.inf.format(n);
    } else {
      const n = this.floor ? Math.floor(t) : Oa(t, 3);
      return me(n, this.padTo);
    }
  }
}
class dy {
  constructor(t, n, r) {
    this.opts = r, this.originalZone = void 0;
    let i;
    if (this.opts.timeZone)
      this.dt = t;
    else if (t.zone.type === "fixed") {
      const s = -1 * (t.offset / 60), l = s >= 0 ? `Etc/GMT+${s}` : `Etc/GMT${s}`;
      t.offset !== 0 && Tt.create(l).valid ? (i = l, this.dt = t) : (i = "UTC", this.dt = t.offset === 0 ? t : t.setZone("UTC").plus({
        minutes: t.offset
      }), this.originalZone = t.zone);
    } else
      t.zone.type === "system" ? this.dt = t : t.zone.type === "iana" ? (this.dt = t, i = t.zone.name) : (i = "UTC", this.dt = t.setZone("UTC").plus({
        minutes: t.offset
      }), this.originalZone = t.zone);
    const o = {
      ...this.opts
    };
    o.timeZone = o.timeZone || i, this.dtf = xl(n, o);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({
      value: t
    }) => t).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const t = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? t.map((n) => {
      if (n.type === "timeZoneName") {
        const r = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...n,
          value: r
        };
      } else
        return n;
    }) : t;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class hy {
  constructor(t, n, r) {
    this.opts = {
      style: "long",
      ...r
    }, !n && pd() && (this.rtf = ry(t, r));
  }
  format(t, n) {
    return this.rtf ? this.rtf.format(t, n) : Py(n, t, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(t, n) {
    return this.rtf ? this.rtf.formatToParts(t, n) : [];
  }
}
const my = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class Q {
  static fromOpts(t) {
    return Q.create(t.locale, t.numberingSystem, t.outputCalendar, t.weekSettings, t.defaultToEN);
  }
  static create(t, n, r, i, o = !1) {
    const s = t || ue.defaultLocale, l = s || (o ? "en-US" : iy()), a = n || ue.defaultNumberingSystem, u = r || ue.defaultOutputCalendar, c = Cl(i) || ue.defaultWeekSettings;
    return new Q(l, a, u, c, s);
  }
  static resetCache() {
    Kr = null, kl = {}, El = {}, Tl = {};
  }
  static fromObject({
    locale: t,
    numberingSystem: n,
    outputCalendar: r,
    weekSettings: i
  } = {}) {
    return Q.create(t, n, r, i);
  }
  constructor(t, n, r, i, o) {
    const [s, l, a] = sy(t);
    this.locale = s, this.numberingSystem = n || l || null, this.outputCalendar = r || a || null, this.weekSettings = i, this.intl = ly(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = {
      format: {},
      standalone: {}
    }, this.monthsCache = {
      format: {},
      standalone: {}
    }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = o, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = cy(this)), this.fastNumbersCached;
  }
  listingMode() {
    const t = this.isEnglish(), n = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return t && n ? "en" : "intl";
  }
  clone(t) {
    return !t || Object.getOwnPropertyNames(t).length === 0 ? this : Q.create(t.locale || this.specifiedLocale, t.numberingSystem || this.numberingSystem, t.outputCalendar || this.outputCalendar, Cl(t.weekSettings) || this.weekSettings, t.defaultToEN || !1);
  }
  redefaultToEN(t = {}) {
    return this.clone({
      ...t,
      defaultToEN: !0
    });
  }
  redefaultToSystem(t = {}) {
    return this.clone({
      ...t,
      defaultToEN: !1
    });
  }
  months(t, n = !1) {
    return Qi(this, t, Sd, () => {
      const r = n ? {
        month: t,
        day: "numeric"
      } : {
        month: t
      }, i = n ? "format" : "standalone";
      return this.monthsCache[i][t] || (this.monthsCache[i][t] = ay((o) => this.extract(o, r, "month"))), this.monthsCache[i][t];
    });
  }
  weekdays(t, n = !1) {
    return Qi(this, t, Ed, () => {
      const r = n ? {
        weekday: t,
        year: "numeric",
        month: "long",
        day: "numeric"
      } : {
        weekday: t
      }, i = n ? "format" : "standalone";
      return this.weekdaysCache[i][t] || (this.weekdaysCache[i][t] = uy((o) => this.extract(o, r, "weekday"))), this.weekdaysCache[i][t];
    });
  }
  meridiems() {
    return Qi(this, void 0, () => Td, () => {
      if (!this.meridiemCache) {
        const t = {
          hour: "numeric",
          hourCycle: "h12"
        };
        this.meridiemCache = [A.utc(2016, 11, 13, 9), A.utc(2016, 11, 13, 19)].map((n) => this.extract(n, t, "dayperiod"));
      }
      return this.meridiemCache;
    });
  }
  eras(t) {
    return Qi(this, t, Cd, () => {
      const n = {
        era: t
      };
      return this.eraCache[t] || (this.eraCache[t] = [A.utc(-40, 1, 1), A.utc(2017, 1, 1)].map((r) => this.extract(r, n, "era"))), this.eraCache[t];
    });
  }
  extract(t, n, r) {
    const i = this.dtFormatter(t, n), o = i.formatToParts(), s = o.find((l) => l.type.toLowerCase() === r);
    return s ? s.value : null;
  }
  numberFormatter(t = {}) {
    return new fy(this.intl, t.forceSimple || this.fastNumbers, t);
  }
  dtFormatter(t, n = {}) {
    return new dy(t, this.intl, n);
  }
  relFormatter(t = {}) {
    return new hy(this.intl, this.isEnglish(), t);
  }
  listFormatter(t = {}) {
    return ty(this.intl, t);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : yd() ? oy(this.locale) : my;
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
  equals(t) {
    return this.locale === t.locale && this.numberingSystem === t.numberingSystem && this.outputCalendar === t.outputCalendar;
  }
}
let Vs = null;
class _e extends _r {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return Vs === null && (Vs = new _e(0)), Vs;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(t) {
    return t === 0 ? _e.utcInstance : new _e(t);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(t) {
    if (t) {
      const n = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (n)
        return new _e(gs(n[1], n[2]));
    }
    return null;
  }
  constructor(t) {
    super(), this.fixed = t;
  }
  /** @override **/
  get type() {
    return "fixed";
  }
  /** @override **/
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${ri(this.fixed, "narrow")}`;
  }
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${ri(-this.fixed, "narrow")}`;
  }
  /** @override **/
  offsetName() {
    return this.name;
  }
  /** @override **/
  formatOffset(t, n) {
    return ri(this.fixed, n);
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
  equals(t) {
    return t.type === "fixed" && t.fixed === this.fixed;
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
class ad extends _r {
  constructor(t) {
    super(), this.zoneName = t;
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
function Kt(e, t) {
  if (R(e) || e === null)
    return t;
  if (e instanceof _r)
    return e;
  if (gy(e)) {
    const n = e.toLowerCase();
    return n === "default" ? t : n === "local" || n === "system" ? zi.instance : n === "utc" || n === "gmt" ? _e.utcInstance : _e.parseSpecifier(n) || Tt.create(e);
  } else
    return Pn(e) ? _e.instance(e) : typeof e == "object" && "offset" in e && typeof e.offset == "function" ? e : new ad(e);
}
let bu = () => Date.now(), Vu = "system", Wu = null, Uu = null, Hu = null, ju = 60, Bu, Zu = null;
class ue {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return bu;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(t) {
    bu = t;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(t) {
    Vu = t;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return Kt(Vu, zi.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return Wu;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(t) {
    Wu = t;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return Uu;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(t) {
    Uu = t;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return Hu;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(t) {
    Hu = t;
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
    return Zu;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(t) {
    Zu = Cl(t);
  }
  /**
   * Get the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return ju;
  }
  /**
   * Set the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // cut-off year is 0, so all 'yy' are interpreted as current century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 1949; '50' -> 2050
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(t) {
    ju = t % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Bu;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t) {
    Bu = t;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    Q.resetCache(), Tt.resetCache();
  }
}
class mt {
  constructor(t, n) {
    this.reason = t, this.explanation = n;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const ud = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], cd = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function et(e, t) {
  return new mt("unit out of range", `you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`);
}
function Ca(e, t, n) {
  const r = new Date(Date.UTC(e, t - 1, n));
  e < 100 && e >= 0 && r.setUTCFullYear(r.getUTCFullYear() - 1900);
  const i = r.getUTCDay();
  return i === 0 ? 7 : i;
}
function fd(e, t, n) {
  return n + (Ri(e) ? cd : ud)[t - 1];
}
function dd(e, t) {
  const n = Ri(e) ? cd : ud, r = n.findIndex((o) => o < t), i = t - n[r];
  return {
    month: r + 1,
    day: i
  };
}
function Na(e, t) {
  return (e - t + 7) % 7 + 1;
}
function Fo(e, t = 4, n = 1) {
  const {
    year: r,
    month: i,
    day: o
  } = e, s = fd(r, i, o), l = Na(Ca(r, i, o), n);
  let a = Math.floor((s - l + 14 - t) / 7), u;
  return a < 1 ? (u = r - 1, a = hi(u, t, n)) : a > hi(r, t, n) ? (u = r + 1, a = 1) : u = r, {
    weekYear: u,
    weekNumber: a,
    weekday: l,
    ...vs(e)
  };
}
function Yu(e, t = 4, n = 1) {
  const {
    weekYear: r,
    weekNumber: i,
    weekday: o
  } = e, s = Na(Ca(r, 1, t), n), l = ar(r);
  let a = i * 7 + o - s - 7 + t, u;
  a < 1 ? (u = r - 1, a += ar(u)) : a > l ? (u = r + 1, a -= ar(r)) : u = r;
  const {
    month: c,
    day: f
  } = dd(u, a);
  return {
    year: u,
    month: c,
    day: f,
    ...vs(e)
  };
}
function Ws(e) {
  const {
    year: t,
    month: n,
    day: r
  } = e, i = fd(t, n, r);
  return {
    year: t,
    ordinal: i,
    ...vs(e)
  };
}
function Gu(e) {
  const {
    year: t,
    ordinal: n
  } = e, {
    month: r,
    day: i
  } = dd(t, n);
  return {
    year: t,
    month: r,
    day: i,
    ...vs(e)
  };
}
function Qu(e, t) {
  if (!R(e.localWeekday) || !R(e.localWeekNumber) || !R(e.localWeekYear)) {
    if (!R(e.weekday) || !R(e.weekNumber) || !R(e.weekYear))
      throw new Qn("Cannot mix locale-based week fields with ISO-based week fields");
    return R(e.localWeekday) || (e.weekday = e.localWeekday), R(e.localWeekNumber) || (e.weekNumber = e.localWeekNumber), R(e.localWeekYear) || (e.weekYear = e.localWeekYear), delete e.localWeekday, delete e.localWeekNumber, delete e.localWeekYear, {
      minDaysInFirstWeek: t.getMinDaysInFirstWeek(),
      startOfWeek: t.getStartOfWeek()
    };
  } else
    return {
      minDaysInFirstWeek: 4,
      startOfWeek: 1
    };
}
function py(e, t = 4, n = 1) {
  const r = ps(e.weekYear), i = tt(e.weekNumber, 1, hi(e.weekYear, t, n)), o = tt(e.weekday, 1, 7);
  return r ? i ? o ? !1 : et("weekday", e.weekday) : et("week", e.weekNumber) : et("weekYear", e.weekYear);
}
function yy(e) {
  const t = ps(e.year), n = tt(e.ordinal, 1, ar(e.year));
  return t ? n ? !1 : et("ordinal", e.ordinal) : et("year", e.year);
}
function hd(e) {
  const t = ps(e.year), n = tt(e.month, 1, 12), r = tt(e.day, 1, Ao(e.year, e.month));
  return t ? n ? r ? !1 : et("day", e.day) : et("month", e.month) : et("year", e.year);
}
function md(e) {
  const {
    hour: t,
    minute: n,
    second: r,
    millisecond: i
  } = e, o = tt(t, 0, 23) || t === 24 && n === 0 && r === 0 && i === 0, s = tt(n, 0, 59), l = tt(r, 0, 59), a = tt(i, 0, 999);
  return o ? s ? l ? a ? !1 : et("millisecond", i) : et("second", r) : et("minute", n) : et("hour", t);
}
function R(e) {
  return typeof e > "u";
}
function Pn(e) {
  return typeof e == "number";
}
function ps(e) {
  return typeof e == "number" && e % 1 === 0;
}
function gy(e) {
  return typeof e == "string";
}
function vy(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function pd() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function yd() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function wy(e) {
  return Array.isArray(e) ? e : [e];
}
function qu(e, t, n) {
  if (e.length !== 0)
    return e.reduce((r, i) => {
      const o = [t(i), i];
      return r && n(r[0], o[0]) === r[0] ? r : o;
    }, null)[1];
}
function Sy(e, t) {
  return t.reduce((n, r) => (n[r] = e[r], n), {});
}
function gr(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Cl(e) {
  if (e == null)
    return null;
  if (typeof e != "object")
    throw new ze("Week settings must be an object");
  if (!tt(e.firstDay, 1, 7) || !tt(e.minimalDays, 1, 7) || !Array.isArray(e.weekend) || e.weekend.some((t) => !tt(t, 1, 7)))
    throw new ze("Invalid week settings");
  return {
    firstDay: e.firstDay,
    minimalDays: e.minimalDays,
    weekend: Array.from(e.weekend)
  };
}
function tt(e, t, n) {
  return ps(e) && e >= t && e <= n;
}
function ky(e, t) {
  return e - t * Math.floor(e / t);
}
function me(e, t = 2) {
  const n = e < 0;
  let r;
  return n ? r = "-" + ("" + -e).padStart(t, "0") : r = ("" + e).padStart(t, "0"), r;
}
function Gt(e) {
  if (!(R(e) || e === null || e === ""))
    return parseInt(e, 10);
}
function kn(e) {
  if (!(R(e) || e === null || e === ""))
    return parseFloat(e);
}
function _a(e) {
  if (!(R(e) || e === null || e === "")) {
    const t = parseFloat("0." + e) * 1e3;
    return Math.floor(t);
  }
}
function Oa(e, t, n = !1) {
  const r = 10 ** t;
  return (n ? Math.trunc : Math.round)(e * r) / r;
}
function Ri(e) {
  return e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0);
}
function ar(e) {
  return Ri(e) ? 366 : 365;
}
function Ao(e, t) {
  const n = ky(t - 1, 12) + 1, r = e + (t - n) / 12;
  return n === 2 ? Ri(r) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}
function ys(e) {
  let t = Date.UTC(e.year, e.month - 1, e.day, e.hour, e.minute, e.second, e.millisecond);
  return e.year < 100 && e.year >= 0 && (t = new Date(t), t.setUTCFullYear(e.year, e.month - 1, e.day)), +t;
}
function Ku(e, t, n) {
  return -Na(Ca(e, 1, t), n) + t - 1;
}
function hi(e, t = 4, n = 1) {
  const r = Ku(e, t, n), i = Ku(e + 1, t, n);
  return (ar(e) - r + i) / 7;
}
function Nl(e) {
  return e > 99 ? e : e > ue.twoDigitCutoffYear ? 1900 + e : 2e3 + e;
}
function gd(e, t, n, r = null) {
  const i = new Date(e), o = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  r && (o.timeZone = r);
  const s = {
    timeZoneName: t,
    ...o
  }, l = new Intl.DateTimeFormat(n, s).formatToParts(i).find((a) => a.type.toLowerCase() === "timezonename");
  return l ? l.value : null;
}
function gs(e, t) {
  let n = parseInt(e, 10);
  Number.isNaN(n) && (n = 0);
  const r = parseInt(t, 10) || 0, i = n < 0 || Object.is(n, -0) ? -r : r;
  return n * 60 + i;
}
function vd(e) {
  const t = Number(e);
  if (typeof e == "boolean" || e === "" || Number.isNaN(t))
    throw new ze(`Invalid unit value ${e}`);
  return t;
}
function bo(e, t) {
  const n = {};
  for (const r in e)
    if (gr(e, r)) {
      const i = e[r];
      if (i == null)
        continue;
      n[t(r)] = vd(i);
    }
  return n;
}
function ri(e, t) {
  const n = Math.trunc(Math.abs(e / 60)), r = Math.trunc(Math.abs(e % 60)), i = e >= 0 ? "+" : "-";
  switch (t) {
    case "short":
      return `${i}${me(n, 2)}:${me(r, 2)}`;
    case "narrow":
      return `${i}${n}${r > 0 ? `:${r}` : ""}`;
    case "techie":
      return `${i}${me(n, 2)}${me(r, 2)}`;
    default:
      throw new RangeError(`Value format ${t} is out of range for property format`);
  }
}
function vs(e) {
  return Sy(e, ["hour", "minute", "second", "millisecond"]);
}
const xy = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], wd = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ey = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function Sd(e) {
  switch (e) {
    case "narrow":
      return [...Ey];
    case "short":
      return [...wd];
    case "long":
      return [...xy];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const kd = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], xd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], Ty = ["M", "T", "W", "T", "F", "S", "S"];
function Ed(e) {
  switch (e) {
    case "narrow":
      return [...Ty];
    case "short":
      return [...xd];
    case "long":
      return [...kd];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const Td = ["AM", "PM"], Cy = ["Before Christ", "Anno Domini"], Ny = ["BC", "AD"], _y = ["B", "A"];
function Cd(e) {
  switch (e) {
    case "narrow":
      return [..._y];
    case "short":
      return [...Ny];
    case "long":
      return [...Cy];
    default:
      return null;
  }
}
function Oy(e) {
  return Td[e.hour < 12 ? 0 : 1];
}
function My(e, t) {
  return Ed(t)[e.weekday - 1];
}
function Dy(e, t) {
  return Sd(t)[e.month - 1];
}
function $y(e, t) {
  return Cd(t)[e.year < 0 ? 0 : 1];
}
function Py(e, t, n = "always", r = !1) {
  const i = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, o = ["hours", "minutes", "seconds"].indexOf(e) === -1;
  if (n === "auto" && o) {
    const f = e === "days";
    switch (t) {
      case 1:
        return f ? "tomorrow" : `next ${i[e][0]}`;
      case -1:
        return f ? "yesterday" : `last ${i[e][0]}`;
      case 0:
        return f ? "today" : `this ${i[e][0]}`;
    }
  }
  const s = Object.is(t, -0) || t < 0, l = Math.abs(t), a = l === 1, u = i[e], c = r ? a ? u[1] : u[2] || u[1] : a ? i[e][0] : e;
  return s ? `${l} ${c} ago` : `in ${l} ${c}`;
}
function Ju(e, t) {
  let n = "";
  for (const r of e)
    r.literal ? n += r.val : n += t(r.val);
  return n;
}
const Iy = {
  D: Ro,
  DD: Hf,
  DDD: jf,
  DDDD: Bf,
  t: Zf,
  tt: Yf,
  ttt: Gf,
  tttt: Qf,
  T: qf,
  TT: Kf,
  TTT: Jf,
  TTTT: Xf,
  f: ed,
  ff: nd,
  fff: id,
  ffff: sd,
  F: td,
  FF: rd,
  FFF: od,
  FFFF: ld
};
class Ne {
  static create(t, n = {}) {
    return new Ne(t, n);
  }
  static parseFormat(t) {
    let n = null, r = "", i = !1;
    const o = [];
    for (let s = 0; s < t.length; s++) {
      const l = t.charAt(s);
      l === "'" ? (r.length > 0 && o.push({
        literal: i || /^\s+$/.test(r),
        val: r
      }), n = null, r = "", i = !i) : i || l === n ? r += l : (r.length > 0 && o.push({
        literal: /^\s+$/.test(r),
        val: r
      }), r = l, n = l);
    }
    return r.length > 0 && o.push({
      literal: i || /^\s+$/.test(r),
      val: r
    }), o;
  }
  static macroTokenToFormatOpts(t) {
    return Iy[t];
  }
  constructor(t, n) {
    this.opts = n, this.loc = t, this.systemLoc = null;
  }
  formatWithSystemDefault(t, n) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(t, {
      ...this.opts,
      ...n
    }).format();
  }
  dtFormatter(t, n = {}) {
    return this.loc.dtFormatter(t, {
      ...this.opts,
      ...n
    });
  }
  formatDateTime(t, n) {
    return this.dtFormatter(t, n).format();
  }
  formatDateTimeParts(t, n) {
    return this.dtFormatter(t, n).formatToParts();
  }
  formatInterval(t, n) {
    return this.dtFormatter(t.start, n).dtf.formatRange(t.start.toJSDate(), t.end.toJSDate());
  }
  resolvedOptions(t, n) {
    return this.dtFormatter(t, n).resolvedOptions();
  }
  num(t, n = 0) {
    if (this.opts.forceSimple)
      return me(t, n);
    const r = {
      ...this.opts
    };
    return n > 0 && (r.padTo = n), this.loc.numberFormatter(r).format(t);
  }
  formatDateTimeFromString(t, n) {
    const r = this.loc.listingMode() === "en", i = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", o = (h, g) => this.loc.extract(t, h, g), s = (h) => t.isOffsetFixed && t.offset === 0 && h.allowZ ? "Z" : t.isValid ? t.zone.formatOffset(t.ts, h.format) : "", l = () => r ? Oy(t) : o({
      hour: "numeric",
      hourCycle: "h12"
    }, "dayperiod"), a = (h, g) => r ? Dy(t, h) : o(g ? {
      month: h
    } : {
      month: h,
      day: "numeric"
    }, "month"), u = (h, g) => r ? My(t, h) : o(g ? {
      weekday: h
    } : {
      weekday: h,
      month: "long",
      day: "numeric"
    }, "weekday"), c = (h) => {
      const g = Ne.macroTokenToFormatOpts(h);
      return g ? this.formatWithSystemDefault(t, g) : h;
    }, f = (h) => r ? $y(t, h) : o({
      era: h
    }, "era"), p = (h) => {
      switch (h) {
        case "S":
          return this.num(t.millisecond);
        case "u":
        case "SSS":
          return this.num(t.millisecond, 3);
        case "s":
          return this.num(t.second);
        case "ss":
          return this.num(t.second, 2);
        case "uu":
          return this.num(Math.floor(t.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(t.millisecond / 100));
        case "m":
          return this.num(t.minute);
        case "mm":
          return this.num(t.minute, 2);
        case "h":
          return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12);
        case "hh":
          return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12, 2);
        case "H":
          return this.num(t.hour);
        case "HH":
          return this.num(t.hour, 2);
        case "Z":
          return s({
            format: "narrow",
            allowZ: this.opts.allowZ
          });
        case "ZZ":
          return s({
            format: "short",
            allowZ: this.opts.allowZ
          });
        case "ZZZ":
          return s({
            format: "techie",
            allowZ: this.opts.allowZ
          });
        case "ZZZZ":
          return t.zone.offsetName(t.ts, {
            format: "short",
            locale: this.loc.locale
          });
        case "ZZZZZ":
          return t.zone.offsetName(t.ts, {
            format: "long",
            locale: this.loc.locale
          });
        case "z":
          return t.zoneName;
        case "a":
          return l();
        case "d":
          return i ? o({
            day: "numeric"
          }, "day") : this.num(t.day);
        case "dd":
          return i ? o({
            day: "2-digit"
          }, "day") : this.num(t.day, 2);
        case "c":
          return this.num(t.weekday);
        case "ccc":
          return u("short", !0);
        case "cccc":
          return u("long", !0);
        case "ccccc":
          return u("narrow", !0);
        case "E":
          return this.num(t.weekday);
        case "EEE":
          return u("short", !1);
        case "EEEE":
          return u("long", !1);
        case "EEEEE":
          return u("narrow", !1);
        case "L":
          return i ? o({
            month: "numeric",
            day: "numeric"
          }, "month") : this.num(t.month);
        case "LL":
          return i ? o({
            month: "2-digit",
            day: "numeric"
          }, "month") : this.num(t.month, 2);
        case "LLL":
          return a("short", !0);
        case "LLLL":
          return a("long", !0);
        case "LLLLL":
          return a("narrow", !0);
        case "M":
          return i ? o({
            month: "numeric"
          }, "month") : this.num(t.month);
        case "MM":
          return i ? o({
            month: "2-digit"
          }, "month") : this.num(t.month, 2);
        case "MMM":
          return a("short", !1);
        case "MMMM":
          return a("long", !1);
        case "MMMMM":
          return a("narrow", !1);
        case "y":
          return i ? o({
            year: "numeric"
          }, "year") : this.num(t.year);
        case "yy":
          return i ? o({
            year: "2-digit"
          }, "year") : this.num(t.year.toString().slice(-2), 2);
        case "yyyy":
          return i ? o({
            year: "numeric"
          }, "year") : this.num(t.year, 4);
        case "yyyyyy":
          return i ? o({
            year: "numeric"
          }, "year") : this.num(t.year, 6);
        case "G":
          return f("short");
        case "GG":
          return f("long");
        case "GGGGG":
          return f("narrow");
        case "kk":
          return this.num(t.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(t.weekYear, 4);
        case "W":
          return this.num(t.weekNumber);
        case "WW":
          return this.num(t.weekNumber, 2);
        case "n":
          return this.num(t.localWeekNumber);
        case "nn":
          return this.num(t.localWeekNumber, 2);
        case "ii":
          return this.num(t.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(t.localWeekYear, 4);
        case "o":
          return this.num(t.ordinal);
        case "ooo":
          return this.num(t.ordinal, 3);
        case "q":
          return this.num(t.quarter);
        case "qq":
          return this.num(t.quarter, 2);
        case "X":
          return this.num(Math.floor(t.ts / 1e3));
        case "x":
          return this.num(t.ts);
        default:
          return c(h);
      }
    };
    return Ju(Ne.parseFormat(n), p);
  }
  formatDurationFromString(t, n) {
    const r = (a) => {
      switch (a[0]) {
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
    }, i = (a) => (u) => {
      const c = r(u);
      return c ? this.num(a.get(c), u.length) : u;
    }, o = Ne.parseFormat(n), s = o.reduce((a, {
      literal: u,
      val: c
    }) => u ? a : a.concat(c), []), l = t.shiftTo(...s.map(r).filter((a) => a));
    return Ju(o, i(l));
  }
}
const Nd = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function Or(...e) {
  const t = e.reduce((n, r) => n + r.source, "");
  return RegExp(`^${t}$`);
}
function Mr(...e) {
  return (t) => e.reduce(([n, r, i], o) => {
    const [s, l, a] = o(t, i);
    return [{
      ...n,
      ...s
    }, l || r, a];
  }, [{}, null, 1]).slice(0, 2);
}
function Dr(e, ...t) {
  if (e == null)
    return [null, null];
  for (const [n, r] of t) {
    const i = n.exec(e);
    if (i)
      return r(i);
  }
  return [null, null];
}
function _d(...e) {
  return (t, n) => {
    const r = {};
    let i;
    for (i = 0; i < e.length; i++)
      r[e[i]] = Gt(t[n + i]);
    return [r, null, n + i];
  };
}
const Od = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, Ly = `(?:${Od.source}?(?:\\[(${Nd.source})\\])?)?`, Ma = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Md = RegExp(`${Ma.source}${Ly}`), Da = RegExp(`(?:T${Md.source})?`), zy = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Ry = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Fy = /(\d{4})-?(\d{3})/, Ay = _d("weekYear", "weekNumber", "weekDay"), by = _d("year", "ordinal"), Vy = /(\d{4})-(\d\d)-(\d\d)/, Dd = RegExp(`${Ma.source} ?(?:${Od.source}|(${Nd.source}))?`), Wy = RegExp(`(?: ${Dd.source})?`);
function ur(e, t, n) {
  const r = e[t];
  return R(r) ? n : Gt(r);
}
function Uy(e, t) {
  return [{
    year: ur(e, t),
    month: ur(e, t + 1, 1),
    day: ur(e, t + 2, 1)
  }, null, t + 3];
}
function $r(e, t) {
  return [{
    hours: ur(e, t, 0),
    minutes: ur(e, t + 1, 0),
    seconds: ur(e, t + 2, 0),
    milliseconds: _a(e[t + 3])
  }, null, t + 4];
}
function Fi(e, t) {
  const n = !e[t] && !e[t + 1], r = gs(e[t + 1], e[t + 2]), i = n ? null : _e.instance(r);
  return [{}, i, t + 3];
}
function Ai(e, t) {
  const n = e[t] ? Tt.create(e[t]) : null;
  return [{}, n, t + 1];
}
const Hy = RegExp(`^T?${Ma.source}$`), jy = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function By(e) {
  const [t, n, r, i, o, s, l, a, u] = e, c = t[0] === "-", f = a && a[0] === "-", p = (h, g = !1) => h !== void 0 && (g || h && c) ? -h : h;
  return [{
    years: p(kn(n)),
    months: p(kn(r)),
    weeks: p(kn(i)),
    days: p(kn(o)),
    hours: p(kn(s)),
    minutes: p(kn(l)),
    seconds: p(kn(a), a === "-0"),
    milliseconds: p(_a(u), f)
  }];
}
const Zy = {
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
function $a(e, t, n, r, i, o, s) {
  const l = {
    year: t.length === 2 ? Nl(Gt(t)) : Gt(t),
    month: wd.indexOf(n) + 1,
    day: Gt(r),
    hour: Gt(i),
    minute: Gt(o)
  };
  return s && (l.second = Gt(s)), e && (l.weekday = e.length > 3 ? kd.indexOf(e) + 1 : xd.indexOf(e) + 1), l;
}
const Yy = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Gy(e) {
  const [, t, n, r, i, o, s, l, a, u, c, f] = e, p = $a(t, i, r, n, o, s, l);
  let h;
  return a ? h = Zy[a] : u ? h = 0 : h = gs(c, f), [p, new _e(h)];
}
function Qy(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const qy = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, Ky = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Jy = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Xu(e) {
  const [, t, n, r, i, o, s, l] = e;
  return [$a(t, i, r, n, o, s, l), _e.utcInstance];
}
function Xy(e) {
  const [, t, n, r, i, o, s, l] = e;
  return [$a(t, l, n, r, i, o, s), _e.utcInstance];
}
const eg = Or(zy, Da), tg = Or(Ry, Da), ng = Or(Fy, Da), rg = Or(Md), $d = Mr(Uy, $r, Fi, Ai), ig = Mr(Ay, $r, Fi, Ai), og = Mr(by, $r, Fi, Ai), sg = Mr($r, Fi, Ai);
function lg(e) {
  return Dr(e, [eg, $d], [tg, ig], [ng, og], [rg, sg]);
}
function ag(e) {
  return Dr(Qy(e), [Yy, Gy]);
}
function ug(e) {
  return Dr(e, [qy, Xu], [Ky, Xu], [Jy, Xy]);
}
function cg(e) {
  return Dr(e, [jy, By]);
}
const fg = Mr($r);
function dg(e) {
  return Dr(e, [Hy, fg]);
}
const hg = Or(Vy, Wy), mg = Or(Dd), pg = Mr($r, Fi, Ai);
function yg(e) {
  return Dr(e, [hg, $d], [mg, pg]);
}
const ec = "Invalid Duration", Pd = {
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
}, gg = {
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
  ...Pd
}, Ke = 146097 / 400, Zn = 146097 / 4800, vg = {
  years: {
    quarters: 4,
    months: 12,
    weeks: Ke / 7,
    days: Ke,
    hours: Ke * 24,
    minutes: Ke * 24 * 60,
    seconds: Ke * 24 * 60 * 60,
    milliseconds: Ke * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: Ke / 28,
    days: Ke / 4,
    hours: Ke * 24 / 4,
    minutes: Ke * 24 * 60 / 4,
    seconds: Ke * 24 * 60 * 60 / 4,
    milliseconds: Ke * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: Zn / 7,
    days: Zn,
    hours: Zn * 24,
    minutes: Zn * 24 * 60,
    seconds: Zn * 24 * 60 * 60,
    milliseconds: Zn * 24 * 60 * 60 * 1e3
  },
  ...Pd
}, _n = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"], wg = _n.slice(0).reverse();
function Bt(e, t, n = !1) {
  const r = {
    values: n ? t.values : {
      ...e.values,
      ...t.values || {}
    },
    loc: e.loc.clone(t.loc),
    conversionAccuracy: t.conversionAccuracy || e.conversionAccuracy,
    matrix: t.matrix || e.matrix
  };
  return new U(r);
}
function Id(e, t) {
  var n;
  let r = (n = t.milliseconds) != null ? n : 0;
  for (const i of wg.slice(1))
    t[i] && (r += t[i] * e[i].milliseconds);
  return r;
}
function tc(e, t) {
  const n = Id(e, t) < 0 ? -1 : 1;
  _n.reduceRight((r, i) => {
    if (R(t[i]))
      return r;
    if (r) {
      const o = t[r] * n, s = e[i][r], l = Math.floor(o / s);
      t[i] += l * n, t[r] -= l * s * n;
    }
    return i;
  }, null), _n.reduce((r, i) => {
    if (R(t[i]))
      return r;
    if (r) {
      const o = t[r] % 1;
      t[r] -= o, t[i] += o * e[r][i];
    }
    return i;
  }, null);
}
function Sg(e) {
  const t = {};
  for (const [n, r] of Object.entries(e))
    r !== 0 && (t[n] = r);
  return t;
}
class U {
  /**
   * @private
   */
  constructor(t) {
    const n = t.conversionAccuracy === "longterm" || !1;
    let r = n ? vg : gg;
    t.matrix && (r = t.matrix), this.values = t.values, this.loc = t.loc || Q.create(), this.conversionAccuracy = n ? "longterm" : "casual", this.invalid = t.invalid || null, this.matrix = r, this.isLuxonDuration = !0;
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
  static fromMillis(t, n) {
    return U.fromObject({
      milliseconds: t
    }, n);
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
  static fromObject(t, n = {}) {
    if (t == null || typeof t != "object")
      throw new ze(`Duration.fromObject: argument expected to be an object, got ${t === null ? "null" : typeof t}`);
    return new U({
      values: bo(t, U.normalizeUnit),
      loc: Q.fromObject(n),
      conversionAccuracy: n.conversionAccuracy,
      matrix: n.matrix
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
  static fromDurationLike(t) {
    if (Pn(t))
      return U.fromMillis(t);
    if (U.isDuration(t))
      return t;
    if (typeof t == "object")
      return U.fromObject(t);
    throw new ze(`Unknown duration argument ${t} of type ${typeof t}`);
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
  static fromISO(t, n) {
    const [r] = cg(t);
    return r ? U.fromObject(r, n) : U.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
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
  static fromISOTime(t, n) {
    const [r] = dg(t);
    return r ? U.fromObject(r, n) : U.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(t, n = null) {
    if (!t)
      throw new ze("need to specify a reason the Duration is invalid");
    const r = t instanceof mt ? t : new mt(t, n);
    if (ue.throwOnInvalid)
      throw new Gp(r);
    return new U({
      invalid: r
    });
  }
  /**
   * @private
   */
  static normalizeUnit(t) {
    const n = {
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
    }[t && t.toLowerCase()];
    if (!n)
      throw new Uf(t);
    return n;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(t) {
    return t && t.isLuxonDuration || !1;
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
  toFormat(t, n = {}) {
    const r = {
      ...n,
      floor: n.round !== !1 && n.floor !== !1
    };
    return this.isValid ? Ne.create(this.loc, r).formatDurationFromString(this, t) : ec;
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
  toHuman(t = {}) {
    if (!this.isValid)
      return ec;
    const n = _n.map((r) => {
      const i = this.values[r];
      return R(i) ? null : this.loc.numberFormatter({
        style: "unit",
        unitDisplay: "long",
        ...t,
        unit: r.slice(0, -1)
      }).format(i);
    }).filter((r) => r);
    return this.loc.listFormatter({
      type: "conjunction",
      style: t.listStyle || "narrow",
      ...t
    }).format(n);
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
    let t = "P";
    return this.years !== 0 && (t += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (t += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (t += this.weeks + "W"), this.days !== 0 && (t += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (t += "T"), this.hours !== 0 && (t += this.hours + "H"), this.minutes !== 0 && (t += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (t += Oa(this.seconds + this.milliseconds / 1e3, 3) + "S"), t === "P" && (t += "T0S"), t;
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
  toISOTime(t = {}) {
    if (!this.isValid)
      return null;
    const n = this.toMillis();
    return n < 0 || n >= 864e5 ? null : (t = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...t,
      includeOffset: !1
    }, A.fromMillis(n, {
      zone: "UTC"
    }).toISOTime(t));
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
    return this.isValid ? Id(this.matrix, this.values) : NaN;
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
  plus(t) {
    if (!this.isValid)
      return this;
    const n = U.fromDurationLike(t), r = {};
    for (const i of _n)
      (gr(n.values, i) || gr(this.values, i)) && (r[i] = n.get(i) + this.get(i));
    return Bt(this, {
      values: r
    }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(t) {
    if (!this.isValid)
      return this;
    const n = U.fromDurationLike(t);
    return this.plus(n.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(t) {
    if (!this.isValid)
      return this;
    const n = {};
    for (const r of Object.keys(this.values))
      n[r] = vd(t(this.values[r], r));
    return Bt(this, {
      values: n
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
  get(t) {
    return this[U.normalizeUnit(t)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(t) {
    if (!this.isValid)
      return this;
    const n = {
      ...this.values,
      ...bo(t, U.normalizeUnit)
    };
    return Bt(this, {
      values: n
    });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({
    locale: t,
    numberingSystem: n,
    conversionAccuracy: r,
    matrix: i
  } = {}) {
    const s = {
      loc: this.loc.clone({
        locale: t,
        numberingSystem: n
      }),
      matrix: i,
      conversionAccuracy: r
    };
    return Bt(this, s);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(t) {
    return this.isValid ? this.shiftTo(t).get(t) : NaN;
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
    const t = this.toObject();
    return tc(this.matrix, t), Bt(this, {
      values: t
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
    const t = Sg(this.normalize().shiftToAll().toObject());
    return Bt(this, {
      values: t
    }, !0);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...t) {
    if (!this.isValid)
      return this;
    if (t.length === 0)
      return this;
    t = t.map((s) => U.normalizeUnit(s));
    const n = {}, r = {}, i = this.toObject();
    let o;
    for (const s of _n)
      if (t.indexOf(s) >= 0) {
        o = s;
        let l = 0;
        for (const u in r)
          l += this.matrix[u][s] * r[u], r[u] = 0;
        Pn(i[s]) && (l += i[s]);
        const a = Math.trunc(l);
        n[s] = a, r[s] = (l * 1e3 - a * 1e3) / 1e3;
      } else
        Pn(i[s]) && (r[s] = i[s]);
    for (const s in r)
      r[s] !== 0 && (n[o] += s === o ? r[s] : r[s] / this.matrix[o][s]);
    return tc(this.matrix, n), Bt(this, {
      values: n
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
    const t = {};
    for (const n of Object.keys(this.values))
      t[n] = this.values[n] === 0 ? 0 : -this.values[n];
    return Bt(this, {
      values: t
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
  equals(t) {
    if (!this.isValid || !t.isValid || !this.loc.equals(t.loc))
      return !1;
    function n(r, i) {
      return r === void 0 || r === 0 ? i === void 0 || i === 0 : r === i;
    }
    for (const r of _n)
      if (!n(this.values[r], t.values[r]))
        return !1;
    return !0;
  }
}
const Yn = "Invalid Interval";
function kg(e, t) {
  return !e || !e.isValid ? oe.invalid("missing or invalid start") : !t || !t.isValid ? oe.invalid("missing or invalid end") : t < e ? oe.invalid("end before start", `The end of an interval must be after its start, but you had start=${e.toISO()} and end=${t.toISO()}`) : null;
}
class oe {
  /**
   * @private
   */
  constructor(t) {
    this.s = t.start, this.e = t.end, this.invalid = t.invalid || null, this.isLuxonInterval = !0;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(t, n = null) {
    if (!t)
      throw new ze("need to specify a reason the Interval is invalid");
    const r = t instanceof mt ? t : new mt(t, n);
    if (ue.throwOnInvalid)
      throw new Yp(r);
    return new oe({
      invalid: r
    });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(t, n) {
    const r = Vr(t), i = Vr(n), o = kg(r, i);
    return o ?? new oe({
      start: r,
      end: i
    });
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(t, n) {
    const r = U.fromDurationLike(n), i = Vr(t);
    return oe.fromDateTimes(i, i.plus(r));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(t, n) {
    const r = U.fromDurationLike(n), i = Vr(t);
    return oe.fromDateTimes(i.minus(r), i);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(t, n) {
    const [r, i] = (t || "").split("/", 2);
    if (r && i) {
      let o, s;
      try {
        o = A.fromISO(r, n), s = o.isValid;
      } catch {
        s = !1;
      }
      let l, a;
      try {
        l = A.fromISO(i, n), a = l.isValid;
      } catch {
        a = !1;
      }
      if (s && a)
        return oe.fromDateTimes(o, l);
      if (s) {
        const u = U.fromISO(i, n);
        if (u.isValid)
          return oe.after(o, u);
      } else if (a) {
        const u = U.fromISO(r, n);
        if (u.isValid)
          return oe.before(l, u);
      }
    }
    return oe.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(t) {
    return t && t.isLuxonInterval || !1;
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
  length(t = "milliseconds") {
    return this.isValid ? this.toDuration(t).get(t) : NaN;
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
  count(t = "milliseconds", n) {
    if (!this.isValid)
      return NaN;
    const r = this.start.startOf(t, n);
    let i;
    return n != null && n.useLocaleWeeks ? i = this.end.reconfigure({
      locale: r.locale
    }) : i = this.end, i = i.startOf(t, n), Math.floor(i.diff(r, t).get(t)) + (i.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(t) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, t) : !1;
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
  isAfter(t) {
    return this.isValid ? this.s > t : !1;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(t) {
    return this.isValid ? this.e <= t : !1;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(t) {
    return this.isValid ? this.s <= t && this.e > t : !1;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({
    start: t,
    end: n
  } = {}) {
    return this.isValid ? oe.fromDateTimes(t || this.s, n || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...t) {
    if (!this.isValid)
      return [];
    const n = t.map(Vr).filter((s) => this.contains(s)).sort((s, l) => s.toMillis() - l.toMillis()), r = [];
    let {
      s: i
    } = this, o = 0;
    for (; i < this.e; ) {
      const s = n[o] || this.e, l = +s > +this.e ? this.e : s;
      r.push(oe.fromDateTimes(i, l)), i = l, o += 1;
    }
    return r;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(t) {
    const n = U.fromDurationLike(t);
    if (!this.isValid || !n.isValid || n.as("milliseconds") === 0)
      return [];
    let {
      s: r
    } = this, i = 1, o;
    const s = [];
    for (; r < this.e; ) {
      const l = this.start.plus(n.mapUnits((a) => a * i));
      o = +l > +this.e ? this.e : l, s.push(oe.fromDateTimes(r, o)), r = o, i += 1;
    }
    return s;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(t) {
    return this.isValid ? this.splitBy(this.length() / t).slice(0, t) : [];
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(t) {
    return this.e > t.s && this.s < t.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(t) {
    return this.isValid ? +this.e == +t.s : !1;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(t) {
    return this.isValid ? +t.e == +this.s : !1;
  }
  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(t) {
    return this.isValid ? this.s <= t.s && this.e >= t.e : !1;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(t) {
    return !this.isValid || !t.isValid ? !1 : this.s.equals(t.s) && this.e.equals(t.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(t) {
    if (!this.isValid)
      return this;
    const n = this.s > t.s ? this.s : t.s, r = this.e < t.e ? this.e : t.e;
    return n >= r ? null : oe.fromDateTimes(n, r);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(t) {
    if (!this.isValid)
      return this;
    const n = this.s < t.s ? this.s : t.s, r = this.e > t.e ? this.e : t.e;
    return oe.fromDateTimes(n, r);
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(t) {
    const [n, r] = t.sort((i, o) => i.s - o.s).reduce(([i, o], s) => o ? o.overlaps(s) || o.abutsStart(s) ? [i, o.union(s)] : [i.concat([o]), s] : [i, s], [[], null]);
    return r && n.push(r), n;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(t) {
    let n = null, r = 0;
    const i = [], o = t.map((a) => [{
      time: a.s,
      type: "s"
    }, {
      time: a.e,
      type: "e"
    }]), s = Array.prototype.concat(...o), l = s.sort((a, u) => a.time - u.time);
    for (const a of l)
      r += a.type === "s" ? 1 : -1, r === 1 ? n = a.time : (n && +n != +a.time && i.push(oe.fromDateTimes(n, a.time)), n = null);
    return oe.merge(i);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...t) {
    return oe.xor([this].concat(t)).map((n) => this.intersection(n)).filter((n) => n && !n.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : Yn;
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
  toLocaleString(t = Ro, n = {}) {
    return this.isValid ? Ne.create(this.s.loc.clone(n), t).formatInterval(this) : Yn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(t) {
    return this.isValid ? `${this.s.toISO(t)}/${this.e.toISO(t)}` : Yn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : Yn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(t) {
    return this.isValid ? `${this.s.toISOTime(t)}/${this.e.toISOTime(t)}` : Yn;
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
  toFormat(t, {
    separator: n = " – "
  } = {}) {
    return this.isValid ? `${this.s.toFormat(t)}${n}${this.e.toFormat(t)}` : Yn;
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
  toDuration(t, n) {
    return this.isValid ? this.e.diff(this.s, t, n) : U.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(t) {
    return oe.fromDateTimes(t(this.s), t(this.e));
  }
}
class Jr {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(t = ue.defaultZone) {
    const n = A.now().setZone(t).set({
      month: 12
    });
    return !t.isUniversal && n.offset !== n.set({
      month: 6
    }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(t) {
    return Tt.isValidZone(t);
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
  static normalizeZone(t) {
    return Kt(t, ue.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({
    locale: t = null,
    locObj: n = null
  } = {}) {
    return (n || Q.create(t)).getStartOfWeek();
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
    locale: t = null,
    locObj: n = null
  } = {}) {
    return (n || Q.create(t)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({
    locale: t = null,
    locObj: n = null
  } = {}) {
    return (n || Q.create(t)).getWeekendDays().slice();
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
  static months(t = "long", {
    locale: n = null,
    numberingSystem: r = null,
    locObj: i = null,
    outputCalendar: o = "gregory"
  } = {}) {
    return (i || Q.create(n, r, o)).months(t);
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
  static monthsFormat(t = "long", {
    locale: n = null,
    numberingSystem: r = null,
    locObj: i = null,
    outputCalendar: o = "gregory"
  } = {}) {
    return (i || Q.create(n, r, o)).months(t, !0);
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
  static weekdays(t = "long", {
    locale: n = null,
    numberingSystem: r = null,
    locObj: i = null
  } = {}) {
    return (i || Q.create(n, r, null)).weekdays(t);
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
  static weekdaysFormat(t = "long", {
    locale: n = null,
    numberingSystem: r = null,
    locObj: i = null
  } = {}) {
    return (i || Q.create(n, r, null)).weekdays(t, !0);
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
    locale: t = null
  } = {}) {
    return Q.create(t).meridiems();
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
  static eras(t = "short", {
    locale: n = null
  } = {}) {
    return Q.create(n, null, "gregory").eras(t);
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
      relative: pd(),
      localeWeek: yd()
    };
  }
}
function nc(e, t) {
  const n = (i) => i.toUTC(0, {
    keepLocalTime: !0
  }).startOf("day").valueOf(), r = n(t) - n(e);
  return Math.floor(U.fromMillis(r).as("days"));
}
function xg(e, t, n) {
  const r = [["years", (a, u) => u.year - a.year], ["quarters", (a, u) => u.quarter - a.quarter + (u.year - a.year) * 4], ["months", (a, u) => u.month - a.month + (u.year - a.year) * 12], ["weeks", (a, u) => {
    const c = nc(a, u);
    return (c - c % 7) / 7;
  }], ["days", nc]], i = {}, o = e;
  let s, l;
  for (const [a, u] of r)
    n.indexOf(a) >= 0 && (s = a, i[a] = u(e, t), l = o.plus(i), l > t ? (i[a]--, e = o.plus(i), e > t && (l = e, i[a]--, e = o.plus(i))) : e = l);
  return [e, i, l, s];
}
function Eg(e, t, n, r) {
  let [i, o, s, l] = xg(e, t, n);
  const a = t - i, u = n.filter((f) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(f) >= 0);
  u.length === 0 && (s < t && (s = i.plus({
    [l]: 1
  })), s !== i && (o[l] = (o[l] || 0) + a / (s - i)));
  const c = U.fromObject(o, r);
  return u.length > 0 ? U.fromMillis(a, r).shiftTo(...u).plus(c) : c;
}
const Pa = {
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
}, rc = {
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
}, Tg = Pa.hanidec.replace(/[\[|\]]/g, "").split("");
function Cg(e) {
  let t = parseInt(e, 10);
  if (isNaN(t)) {
    t = "";
    for (let n = 0; n < e.length; n++) {
      const r = e.charCodeAt(n);
      if (e[n].search(Pa.hanidec) !== -1)
        t += Tg.indexOf(e[n]);
      else
        for (const i in rc) {
          const [o, s] = rc[i];
          r >= o && r <= s && (t += r - o);
        }
    }
    return parseInt(t, 10);
  } else
    return t;
}
function lt({
  numberingSystem: e
}, t = "") {
  return new RegExp(`${Pa[e || "latn"]}${t}`);
}
const Ng = "missing Intl.DateTimeFormat.formatToParts support";
function Y(e, t = (n) => n) {
  return {
    regex: e,
    deser: ([n]) => t(Cg(n))
  };
}
const _g = String.fromCharCode(160), Ld = `[ ${_g}]`, zd = new RegExp(Ld, "g");
function Og(e) {
  return e.replace(/\./g, "\\.?").replace(zd, Ld);
}
function ic(e) {
  return e.replace(/\./g, "").replace(zd, " ").toLowerCase();
}
function at(e, t) {
  return e === null ? null : {
    regex: RegExp(e.map(Og).join("|")),
    deser: ([n]) => e.findIndex((r) => ic(n) === ic(r)) + t
  };
}
function oc(e, t) {
  return {
    regex: e,
    deser: ([, n, r]) => gs(n, r),
    groups: t
  };
}
function qi(e) {
  return {
    regex: e,
    deser: ([t]) => t
  };
}
function Mg(e) {
  return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function Dg(e, t) {
  const n = lt(t), r = lt(t, "{2}"), i = lt(t, "{3}"), o = lt(t, "{4}"), s = lt(t, "{6}"), l = lt(t, "{1,2}"), a = lt(t, "{1,3}"), u = lt(t, "{1,6}"), c = lt(t, "{1,9}"), f = lt(t, "{2,4}"), p = lt(t, "{4,6}"), h = (k) => ({
    regex: RegExp(Mg(k.val)),
    deser: ([m]) => m,
    literal: !0
  }), v = ((k) => {
    if (e.literal)
      return h(k);
    switch (k.val) {
      case "G":
        return at(t.eras("short"), 0);
      case "GG":
        return at(t.eras("long"), 0);
      case "y":
        return Y(u);
      case "yy":
        return Y(f, Nl);
      case "yyyy":
        return Y(o);
      case "yyyyy":
        return Y(p);
      case "yyyyyy":
        return Y(s);
      case "M":
        return Y(l);
      case "MM":
        return Y(r);
      case "MMM":
        return at(t.months("short", !0), 1);
      case "MMMM":
        return at(t.months("long", !0), 1);
      case "L":
        return Y(l);
      case "LL":
        return Y(r);
      case "LLL":
        return at(t.months("short", !1), 1);
      case "LLLL":
        return at(t.months("long", !1), 1);
      case "d":
        return Y(l);
      case "dd":
        return Y(r);
      case "o":
        return Y(a);
      case "ooo":
        return Y(i);
      case "HH":
        return Y(r);
      case "H":
        return Y(l);
      case "hh":
        return Y(r);
      case "h":
        return Y(l);
      case "mm":
        return Y(r);
      case "m":
        return Y(l);
      case "q":
        return Y(l);
      case "qq":
        return Y(r);
      case "s":
        return Y(l);
      case "ss":
        return Y(r);
      case "S":
        return Y(a);
      case "SSS":
        return Y(i);
      case "u":
        return qi(c);
      case "uu":
        return qi(l);
      case "uuu":
        return Y(n);
      case "a":
        return at(t.meridiems(), 0);
      case "kkkk":
        return Y(o);
      case "kk":
        return Y(f, Nl);
      case "W":
        return Y(l);
      case "WW":
        return Y(r);
      case "E":
      case "c":
        return Y(n);
      case "EEE":
        return at(t.weekdays("short", !1), 1);
      case "EEEE":
        return at(t.weekdays("long", !1), 1);
      case "ccc":
        return at(t.weekdays("short", !0), 1);
      case "cccc":
        return at(t.weekdays("long", !0), 1);
      case "Z":
      case "ZZ":
        return oc(new RegExp(`([+-]${l.source})(?::(${r.source}))?`), 2);
      case "ZZZ":
        return oc(new RegExp(`([+-]${l.source})(${r.source})?`), 2);
      case "z":
        return qi(/[a-z_+-/]{1,256}?/i);
      case " ":
        return qi(/[^\S\n\r]/);
      default:
        return h(k);
    }
  })(e) || {
    invalidReason: Ng
  };
  return v.token = e, v;
}
const $g = {
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
function Pg(e, t, n) {
  const {
    type: r,
    value: i
  } = e;
  if (r === "literal") {
    const a = /^\s+$/.test(i);
    return {
      literal: !a,
      val: a ? " " : i
    };
  }
  const o = t[r];
  let s = r;
  r === "hour" && (t.hour12 != null ? s = t.hour12 ? "hour12" : "hour24" : t.hourCycle != null ? t.hourCycle === "h11" || t.hourCycle === "h12" ? s = "hour12" : s = "hour24" : s = n.hour12 ? "hour12" : "hour24");
  let l = $g[s];
  if (typeof l == "object" && (l = l[o]), l)
    return {
      literal: !1,
      val: l
    };
}
function Ig(e) {
  return [`^${e.map((n) => n.regex).reduce((n, r) => `${n}(${r.source})`, "")}$`, e];
}
function Lg(e, t, n) {
  const r = e.match(t);
  if (r) {
    const i = {};
    let o = 1;
    for (const s in n)
      if (gr(n, s)) {
        const l = n[s], a = l.groups ? l.groups + 1 : 1;
        !l.literal && l.token && (i[l.token.val[0]] = l.deser(r.slice(o, o + a))), o += a;
      }
    return [r, i];
  } else
    return [r, {}];
}
function zg(e) {
  const t = (o) => {
    switch (o) {
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
  let n = null, r;
  return R(e.z) || (n = Tt.create(e.z)), R(e.Z) || (n || (n = new _e(e.Z)), r = e.Z), R(e.q) || (e.M = (e.q - 1) * 3 + 1), R(e.h) || (e.h < 12 && e.a === 1 ? e.h += 12 : e.h === 12 && e.a === 0 && (e.h = 0)), e.G === 0 && e.y && (e.y = -e.y), R(e.u) || (e.S = _a(e.u)), [Object.keys(e).reduce((o, s) => {
    const l = t(s);
    return l && (o[l] = e[s]), o;
  }, {}), n, r];
}
let Us = null;
function Rg() {
  return Us || (Us = A.fromMillis(1555555555555)), Us;
}
function Fg(e, t) {
  if (e.literal)
    return e;
  const n = Ne.macroTokenToFormatOpts(e.val), r = Ad(n, t);
  return r == null || r.includes(void 0) ? e : r;
}
function Rd(e, t) {
  return Array.prototype.concat(...e.map((n) => Fg(n, t)));
}
function Fd(e, t, n) {
  const r = Rd(Ne.parseFormat(n), e), i = r.map((s) => Dg(s, e)), o = i.find((s) => s.invalidReason);
  if (o)
    return {
      input: t,
      tokens: r,
      invalidReason: o.invalidReason
    };
  {
    const [s, l] = Ig(i), a = RegExp(s, "i"), [u, c] = Lg(t, a, l), [f, p, h] = c ? zg(c) : [null, null, void 0];
    if (gr(c, "a") && gr(c, "H"))
      throw new Qn("Can't include meridiem when specifying 24-hour format");
    return {
      input: t,
      tokens: r,
      regex: a,
      rawMatches: u,
      matches: c,
      result: f,
      zone: p,
      specificOffset: h
    };
  }
}
function Ag(e, t, n) {
  const {
    result: r,
    zone: i,
    specificOffset: o,
    invalidReason: s
  } = Fd(e, t, n);
  return [r, i, o, s];
}
function Ad(e, t) {
  if (!e)
    return null;
  const r = Ne.create(t, e).dtFormatter(Rg()), i = r.formatToParts(), o = r.resolvedOptions();
  return i.map((s) => Pg(s, e, o));
}
const Hs = "Invalid DateTime", sc = 864e13;
function Ki(e) {
  return new mt("unsupported zone", `the zone "${e.name}" is not supported`);
}
function js(e) {
  return e.weekData === null && (e.weekData = Fo(e.c)), e.weekData;
}
function Bs(e) {
  return e.localWeekData === null && (e.localWeekData = Fo(e.c, e.loc.getMinDaysInFirstWeek(), e.loc.getStartOfWeek())), e.localWeekData;
}
function xn(e, t) {
  const n = {
    ts: e.ts,
    zone: e.zone,
    c: e.c,
    o: e.o,
    loc: e.loc,
    invalid: e.invalid
  };
  return new A({
    ...n,
    ...t,
    old: n
  });
}
function bd(e, t, n) {
  let r = e - t * 60 * 1e3;
  const i = n.offset(r);
  if (t === i)
    return [r, t];
  r -= (i - t) * 60 * 1e3;
  const o = n.offset(r);
  return i === o ? [r, i] : [e - Math.min(i, o) * 60 * 1e3, Math.max(i, o)];
}
function Ji(e, t) {
  e += t * 60 * 1e3;
  const n = new Date(e);
  return {
    year: n.getUTCFullYear(),
    month: n.getUTCMonth() + 1,
    day: n.getUTCDate(),
    hour: n.getUTCHours(),
    minute: n.getUTCMinutes(),
    second: n.getUTCSeconds(),
    millisecond: n.getUTCMilliseconds()
  };
}
function xo(e, t, n) {
  return bd(ys(e), t, n);
}
function lc(e, t) {
  const n = e.o, r = e.c.year + Math.trunc(t.years), i = e.c.month + Math.trunc(t.months) + Math.trunc(t.quarters) * 3, o = {
    ...e.c,
    year: r,
    month: i,
    day: Math.min(e.c.day, Ao(r, i)) + Math.trunc(t.days) + Math.trunc(t.weeks) * 7
  }, s = U.fromObject({
    years: t.years - Math.trunc(t.years),
    quarters: t.quarters - Math.trunc(t.quarters),
    months: t.months - Math.trunc(t.months),
    weeks: t.weeks - Math.trunc(t.weeks),
    days: t.days - Math.trunc(t.days),
    hours: t.hours,
    minutes: t.minutes,
    seconds: t.seconds,
    milliseconds: t.milliseconds
  }).as("milliseconds"), l = ys(o);
  let [a, u] = bd(l, n, e.zone);
  return s !== 0 && (a += s, u = e.zone.offset(a)), {
    ts: a,
    o: u
  };
}
function br(e, t, n, r, i, o) {
  const {
    setZone: s,
    zone: l
  } = n;
  if (e && Object.keys(e).length !== 0 || t) {
    const a = t || l, u = A.fromObject(e, {
      ...n,
      zone: a,
      specificOffset: o
    });
    return s ? u : u.setZone(l);
  } else
    return A.invalid(new mt("unparsable", `the input "${i}" can't be parsed as ${r}`));
}
function Xi(e, t, n = !0) {
  return e.isValid ? Ne.create(Q.create("en-US"), {
    allowZ: n,
    forceSimple: !0
  }).formatDateTimeFromString(e, t) : null;
}
function Zs(e, t) {
  const n = e.c.year > 9999 || e.c.year < 0;
  let r = "";
  return n && e.c.year >= 0 && (r += "+"), r += me(e.c.year, n ? 6 : 4), t ? (r += "-", r += me(e.c.month), r += "-", r += me(e.c.day)) : (r += me(e.c.month), r += me(e.c.day)), r;
}
function ac(e, t, n, r, i, o) {
  let s = me(e.c.hour);
  return t ? (s += ":", s += me(e.c.minute), (e.c.millisecond !== 0 || e.c.second !== 0 || !n) && (s += ":")) : s += me(e.c.minute), (e.c.millisecond !== 0 || e.c.second !== 0 || !n) && (s += me(e.c.second), (e.c.millisecond !== 0 || !r) && (s += ".", s += me(e.c.millisecond, 3))), i && (e.isOffsetFixed && e.offset === 0 && !o ? s += "Z" : e.o < 0 ? (s += "-", s += me(Math.trunc(-e.o / 60)), s += ":", s += me(Math.trunc(-e.o % 60))) : (s += "+", s += me(Math.trunc(e.o / 60)), s += ":", s += me(Math.trunc(e.o % 60)))), o && (s += "[" + e.zone.ianaName + "]"), s;
}
const Vd = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, bg = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Vg = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Wd = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Wg = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], Ug = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Hg(e) {
  const t = {
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
  }[e.toLowerCase()];
  if (!t)
    throw new Uf(e);
  return t;
}
function uc(e) {
  switch (e.toLowerCase()) {
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
      return Hg(e);
  }
}
function cc(e, t) {
  const n = Kt(t.zone, ue.defaultZone), r = Q.fromObject(t), i = ue.now();
  let o, s;
  if (R(e.year))
    o = i;
  else {
    for (const u of Wd)
      R(e[u]) && (e[u] = Vd[u]);
    const l = hd(e) || md(e);
    if (l)
      return A.invalid(l);
    const a = n.offset(i);
    [o, s] = xo(e, a, n);
  }
  return new A({
    ts: o,
    zone: n,
    loc: r,
    o: s
  });
}
function fc(e, t, n) {
  const r = R(n.round) ? !0 : n.round, i = (s, l) => (s = Oa(s, r || n.calendary ? 0 : 2, !0), t.loc.clone(n).relFormatter(n).format(s, l)), o = (s) => n.calendary ? t.hasSame(e, s) ? 0 : t.startOf(s).diff(e.startOf(s), s).get(s) : t.diff(e, s).get(s);
  if (n.unit)
    return i(o(n.unit), n.unit);
  for (const s of n.units) {
    const l = o(s);
    if (Math.abs(l) >= 1)
      return i(l, s);
  }
  return i(e > t ? -0 : 0, n.units[n.units.length - 1]);
}
function dc(e) {
  let t = {}, n;
  return e.length > 0 && typeof e[e.length - 1] == "object" ? (t = e[e.length - 1], n = Array.from(e).slice(0, e.length - 1)) : n = Array.from(e), [t, n];
}
class A {
  /**
   * @access private
   */
  constructor(t) {
    const n = t.zone || ue.defaultZone;
    let r = t.invalid || (Number.isNaN(t.ts) ? new mt("invalid input") : null) || (n.isValid ? null : Ki(n));
    this.ts = R(t.ts) ? ue.now() : t.ts;
    let i = null, o = null;
    if (!r)
      if (t.old && t.old.ts === this.ts && t.old.zone.equals(n))
        [i, o] = [t.old.c, t.old.o];
      else {
        const l = n.offset(this.ts);
        i = Ji(this.ts, l), r = Number.isNaN(i.year) ? new mt("invalid input") : null, i = r ? null : i, o = r ? null : l;
      }
    this._zone = n, this.loc = t.loc || Q.create(), this.invalid = r, this.weekData = null, this.localWeekData = null, this.c = i, this.o = o, this.isLuxonDateTime = !0;
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
    return new A({});
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
    const [t, n] = dc(arguments), [r, i, o, s, l, a, u] = n;
    return cc({
      year: r,
      month: i,
      day: o,
      hour: s,
      minute: l,
      second: a,
      millisecond: u
    }, t);
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
    const [t, n] = dc(arguments), [r, i, o, s, l, a, u] = n;
    return t.zone = _e.utcInstance, cc({
      year: r,
      month: i,
      day: o,
      hour: s,
      minute: l,
      second: a,
      millisecond: u
    }, t);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(t, n = {}) {
    const r = vy(t) ? t.valueOf() : NaN;
    if (Number.isNaN(r))
      return A.invalid("invalid input");
    const i = Kt(n.zone, ue.defaultZone);
    return i.isValid ? new A({
      ts: r,
      zone: i,
      loc: Q.fromObject(n)
    }) : A.invalid(Ki(i));
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
  static fromMillis(t, n = {}) {
    if (Pn(t))
      return t < -sc || t > sc ? A.invalid("Timestamp out of range") : new A({
        ts: t,
        zone: Kt(n.zone, ue.defaultZone),
        loc: Q.fromObject(n)
      });
    throw new ze(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`);
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
  static fromSeconds(t, n = {}) {
    if (Pn(t))
      return new A({
        ts: t * 1e3,
        zone: Kt(n.zone, ue.defaultZone),
        loc: Q.fromObject(n)
      });
    throw new ze("fromSeconds requires a numerical input");
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
  static fromObject(t, n = {}) {
    t = t || {};
    const r = Kt(n.zone, ue.defaultZone);
    if (!r.isValid)
      return A.invalid(Ki(r));
    const i = Q.fromObject(n), o = bo(t, uc), {
      minDaysInFirstWeek: s,
      startOfWeek: l
    } = Qu(o, i), a = ue.now(), u = R(n.specificOffset) ? r.offset(a) : n.specificOffset, c = !R(o.ordinal), f = !R(o.year), p = !R(o.month) || !R(o.day), h = f || p, g = o.weekYear || o.weekNumber;
    if ((h || c) && g)
      throw new Qn("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    if (p && c)
      throw new Qn("Can't mix ordinal dates with month/day");
    const v = g || o.weekday && !h;
    let k, m, d = Ji(a, u);
    v ? (k = Wg, m = bg, d = Fo(d, s, l)) : c ? (k = Ug, m = Vg, d = Ws(d)) : (k = Wd, m = Vd);
    let y = !1;
    for (const $ of k) {
      const H = o[$];
      R(H) ? y ? o[$] = m[$] : o[$] = d[$] : y = !0;
    }
    const w = v ? py(o, s, l) : c ? yy(o) : hd(o), S = w || md(o);
    if (S)
      return A.invalid(S);
    const E = v ? Yu(o, s, l) : c ? Gu(o) : o, [N, T] = xo(E, u, r), L = new A({
      ts: N,
      zone: r,
      o: T,
      loc: i
    });
    return o.weekday && h && t.weekday !== L.weekday ? A.invalid("mismatched weekday", `you can't specify both a weekday of ${o.weekday} and a date of ${L.toISO()}`) : L;
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
  static fromISO(t, n = {}) {
    const [r, i] = lg(t);
    return br(r, i, n, "ISO 8601", t);
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
  static fromRFC2822(t, n = {}) {
    const [r, i] = ag(t);
    return br(r, i, n, "RFC 2822", t);
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
  static fromHTTP(t, n = {}) {
    const [r, i] = ug(t);
    return br(r, i, n, "HTTP", n);
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
  static fromFormat(t, n, r = {}) {
    if (R(t) || R(n))
      throw new ze("fromFormat requires an input string and a format");
    const {
      locale: i = null,
      numberingSystem: o = null
    } = r, s = Q.fromOpts({
      locale: i,
      numberingSystem: o,
      defaultToEN: !0
    }), [l, a, u, c] = Ag(s, t, n);
    return c ? A.invalid(c) : br(l, a, r, `format ${n}`, t, u);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(t, n, r = {}) {
    return A.fromFormat(t, n, r);
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
  static fromSQL(t, n = {}) {
    const [r, i] = yg(t);
    return br(r, i, n, "SQL", t);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(t, n = null) {
    if (!t)
      throw new ze("need to specify a reason the DateTime is invalid");
    const r = t instanceof mt ? t : new mt(t, n);
    if (ue.throwOnInvalid)
      throw new Zp(r);
    return new A({
      invalid: r
    });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(t) {
    return t && t.isLuxonDateTime || !1;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(t, n = {}) {
    const r = Ad(t, Q.fromObject(n));
    return r ? r.map((i) => i ? i.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(t, n = {}) {
    return Rd(Ne.parseFormat(t), Q.fromObject(n)).map((i) => i.val).join("");
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(t) {
    return this[t];
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
    return this.isValid ? js(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? js(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? js(this).weekday : NaN;
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
    return this.isValid ? Bs(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? Bs(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? Bs(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? Ws(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Jr.months("short", {
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
    return this.isValid ? Jr.months("long", {
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
    return this.isValid ? Jr.weekdays("short", {
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
    return this.isValid ? Jr.weekdays("long", {
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
    const t = 864e5, n = 6e4, r = ys(this.c), i = this.zone.offset(r - t), o = this.zone.offset(r + t), s = this.zone.offset(r - i * n), l = this.zone.offset(r - o * n);
    if (s === l)
      return [this];
    const a = r - s * n, u = r - l * n, c = Ji(a, s), f = Ji(u, l);
    return c.hour === f.hour && c.minute === f.minute && c.second === f.second && c.millisecond === f.millisecond ? [xn(this, {
      ts: a
    }), xn(this, {
      ts: u
    })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return Ri(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return Ao(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? ar(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? hi(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? hi(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(t = {}) {
    const {
      locale: n,
      numberingSystem: r,
      calendar: i
    } = Ne.create(this.loc.clone(t), t).resolvedOptions(this);
    return {
      locale: n,
      numberingSystem: r,
      outputCalendar: i
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
  toUTC(t = 0, n = {}) {
    return this.setZone(_e.instance(t), n);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(ue.defaultZone);
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
  setZone(t, {
    keepLocalTime: n = !1,
    keepCalendarTime: r = !1
  } = {}) {
    if (t = Kt(t, ue.defaultZone), t.equals(this.zone))
      return this;
    if (t.isValid) {
      let i = this.ts;
      if (n || r) {
        const o = t.offset(this.ts), s = this.toObject();
        [i] = xo(s, o, t);
      }
      return xn(this, {
        ts: i,
        zone: t
      });
    } else
      return A.invalid(Ki(t));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({
    locale: t,
    numberingSystem: n,
    outputCalendar: r
  } = {}) {
    const i = this.loc.clone({
      locale: t,
      numberingSystem: n,
      outputCalendar: r
    });
    return xn(this, {
      loc: i
    });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(t) {
    return this.reconfigure({
      locale: t
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
  set(t) {
    if (!this.isValid)
      return this;
    const n = bo(t, uc), {
      minDaysInFirstWeek: r,
      startOfWeek: i
    } = Qu(n, this.loc), o = !R(n.weekYear) || !R(n.weekNumber) || !R(n.weekday), s = !R(n.ordinal), l = !R(n.year), a = !R(n.month) || !R(n.day), u = l || a, c = n.weekYear || n.weekNumber;
    if ((u || s) && c)
      throw new Qn("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    if (a && s)
      throw new Qn("Can't mix ordinal dates with month/day");
    let f;
    o ? f = Yu({
      ...Fo(this.c, r, i),
      ...n
    }, r, i) : R(n.ordinal) ? (f = {
      ...this.toObject(),
      ...n
    }, R(n.day) && (f.day = Math.min(Ao(f.year, f.month), f.day))) : f = Gu({
      ...Ws(this.c),
      ...n
    });
    const [p, h] = xo(f, this.o, this.zone);
    return xn(this, {
      ts: p,
      o: h
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
  plus(t) {
    if (!this.isValid)
      return this;
    const n = U.fromDurationLike(t);
    return xn(this, lc(this, n));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(t) {
    if (!this.isValid)
      return this;
    const n = U.fromDurationLike(t).negate();
    return xn(this, lc(this, n));
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
  startOf(t, {
    useLocaleWeeks: n = !1
  } = {}) {
    if (!this.isValid)
      return this;
    const r = {}, i = U.normalizeUnit(t);
    switch (i) {
      case "years":
        r.month = 1;
      case "quarters":
      case "months":
        r.day = 1;
      case "weeks":
      case "days":
        r.hour = 0;
      case "hours":
        r.minute = 0;
      case "minutes":
        r.second = 0;
      case "seconds":
        r.millisecond = 0;
        break;
    }
    if (i === "weeks")
      if (n) {
        const o = this.loc.getStartOfWeek(), {
          weekday: s
        } = this;
        s < o && (r.weekNumber = this.weekNumber - 1), r.weekday = o;
      } else
        r.weekday = 1;
    if (i === "quarters") {
      const o = Math.ceil(this.month / 3);
      r.month = (o - 1) * 3 + 1;
    }
    return this.set(r);
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
  endOf(t, n) {
    return this.isValid ? this.plus({
      [t]: 1
    }).startOf(t, n).minus(1) : this;
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
  toFormat(t, n = {}) {
    return this.isValid ? Ne.create(this.loc.redefaultToEN(n)).formatDateTimeFromString(this, t) : Hs;
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
  toLocaleString(t = Ro, n = {}) {
    return this.isValid ? Ne.create(this.loc.clone(n), t).formatDateTime(this) : Hs;
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
  toLocaleParts(t = {}) {
    return this.isValid ? Ne.create(this.loc.clone(t), t).formatDateTimeParts(this) : [];
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
    format: t = "extended",
    suppressSeconds: n = !1,
    suppressMilliseconds: r = !1,
    includeOffset: i = !0,
    extendedZone: o = !1
  } = {}) {
    if (!this.isValid)
      return null;
    const s = t === "extended";
    let l = Zs(this, s);
    return l += "T", l += ac(this, s, n, r, i, o), l;
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
    format: t = "extended"
  } = {}) {
    return this.isValid ? Zs(this, t === "extended") : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Xi(this, "kkkk-'W'WW-c");
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
    suppressMilliseconds: t = !1,
    suppressSeconds: n = !1,
    includeOffset: r = !0,
    includePrefix: i = !1,
    extendedZone: o = !1,
    format: s = "extended"
  } = {}) {
    return this.isValid ? (i ? "T" : "") + ac(this, s === "extended", n, t, r, o) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return Xi(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
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
    return Xi(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    return this.isValid ? Zs(this, !0) : null;
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
    includeOffset: t = !0,
    includeZone: n = !1,
    includeOffsetSpace: r = !0
  } = {}) {
    let i = "HH:mm:ss.SSS";
    return (n || t) && (r && (i += " "), n ? i += "z" : t && (i += "ZZ")), Xi(this, i, !0);
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
  toSQL(t = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(t)}` : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : Hs;
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
  toObject(t = {}) {
    if (!this.isValid)
      return {};
    const n = {
      ...this.c
    };
    return t.includeConfig && (n.outputCalendar = this.outputCalendar, n.numberingSystem = this.loc.numberingSystem, n.locale = this.loc.locale), n;
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
  diff(t, n = "milliseconds", r = {}) {
    if (!this.isValid || !t.isValid)
      return U.invalid("created by diffing an invalid DateTime");
    const i = {
      locale: this.locale,
      numberingSystem: this.numberingSystem,
      ...r
    }, o = wy(n).map(U.normalizeUnit), s = t.valueOf() > this.valueOf(), l = s ? this : t, a = s ? t : this, u = Eg(l, a, o, i);
    return s ? u.negate() : u;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(t = "milliseconds", n = {}) {
    return this.diff(A.now(), t, n);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(t) {
    return this.isValid ? oe.fromDateTimes(this, t) : this;
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
  hasSame(t, n, r) {
    if (!this.isValid)
      return !1;
    const i = t.valueOf(), o = this.setZone(t.zone, {
      keepLocalTime: !0
    });
    return o.startOf(n, r) <= i && i <= o.endOf(n, r);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(t) {
    return this.isValid && t.isValid && this.valueOf() === t.valueOf() && this.zone.equals(t.zone) && this.loc.equals(t.loc);
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
  toRelative(t = {}) {
    if (!this.isValid)
      return null;
    const n = t.base || A.fromObject({}, {
      zone: this.zone
    }), r = t.padding ? this < n ? -t.padding : t.padding : 0;
    let i = ["years", "months", "days", "hours", "minutes", "seconds"], o = t.unit;
    return Array.isArray(t.unit) && (i = t.unit, o = void 0), fc(n, this.plus(r), {
      ...t,
      numeric: "always",
      units: i,
      unit: o
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
  toRelativeCalendar(t = {}) {
    return this.isValid ? fc(t.base || A.fromObject({}, {
      zone: this.zone
    }), this, {
      ...t,
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
  static min(...t) {
    if (!t.every(A.isDateTime))
      throw new ze("min requires all arguments be DateTimes");
    return qu(t, (n) => n.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...t) {
    if (!t.every(A.isDateTime))
      throw new ze("max requires all arguments be DateTimes");
    return qu(t, (n) => n.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(t, n, r = {}) {
    const {
      locale: i = null,
      numberingSystem: o = null
    } = r, s = Q.fromOpts({
      locale: i,
      numberingSystem: o,
      defaultToEN: !0
    });
    return Fd(s, t, n);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(t, n, r = {}) {
    return A.fromFormatExplain(t, n, r);
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return Ro;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return Hf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return Qp;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return jf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return Bf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return Zf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return Yf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return Gf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Qf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return qf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Kf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Jf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return Xf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return ed;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return td;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return nd;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return rd;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return qp;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return id;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return od;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return sd;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return ld;
  }
}
function Vr(e) {
  if (A.isDateTime(e))
    return e;
  if (e && e.valueOf && Pn(e.valueOf()))
    return A.fromJSDate(e);
  if (e && typeof e == "object")
    return A.fromObject(e);
  throw new ze(`Unknown datetime argument: ${e}, of type ${typeof e}`);
}
const jg = "3.4.4";
Ge.DateTime = A;
Ge.Duration = U;
Ge.FixedOffsetZone = _e;
Ge.IANAZone = Tt;
Ge.Info = Jr;
Ge.Interval = oe;
Ge.InvalidZone = ad;
Ge.Settings = ue;
Ge.SystemZone = zi;
Ge.VERSION = jg;
Ge.Zone = _r;
var En = Ge;
z.prototype.addYear = function() {
  this._date = this._date.plus({ years: 1 });
};
z.prototype.addMonth = function() {
  this._date = this._date.plus({ months: 1 }).startOf("month");
};
z.prototype.addDay = function() {
  this._date = this._date.plus({ days: 1 }).startOf("day");
};
z.prototype.addHour = function() {
  var e = this._date;
  this._date = this._date.plus({ hours: 1 }).startOf("hour"), this._date <= e && (this._date = this._date.plus({ hours: 1 }));
};
z.prototype.addMinute = function() {
  var e = this._date;
  this._date = this._date.plus({ minutes: 1 }).startOf("minute"), this._date < e && (this._date = this._date.plus({ hours: 1 }));
};
z.prototype.addSecond = function() {
  var e = this._date;
  this._date = this._date.plus({ seconds: 1 }).startOf("second"), this._date < e && (this._date = this._date.plus({ hours: 1 }));
};
z.prototype.subtractYear = function() {
  this._date = this._date.minus({ years: 1 });
};
z.prototype.subtractMonth = function() {
  this._date = this._date.minus({ months: 1 }).endOf("month").startOf("second");
};
z.prototype.subtractDay = function() {
  this._date = this._date.minus({ days: 1 }).endOf("day").startOf("second");
};
z.prototype.subtractHour = function() {
  var e = this._date;
  this._date = this._date.minus({ hours: 1 }).endOf("hour").startOf("second"), this._date >= e && (this._date = this._date.minus({ hours: 1 }));
};
z.prototype.subtractMinute = function() {
  var e = this._date;
  this._date = this._date.minus({ minutes: 1 }).endOf("minute").startOf("second"), this._date > e && (this._date = this._date.minus({ hours: 1 }));
};
z.prototype.subtractSecond = function() {
  var e = this._date;
  this._date = this._date.minus({ seconds: 1 }).startOf("second"), this._date > e && (this._date = this._date.minus({ hours: 1 }));
};
z.prototype.getDate = function() {
  return this._date.day;
};
z.prototype.getFullYear = function() {
  return this._date.year;
};
z.prototype.getDay = function() {
  var e = this._date.weekday;
  return e == 7 ? 0 : e;
};
z.prototype.getMonth = function() {
  return this._date.month - 1;
};
z.prototype.getHours = function() {
  return this._date.hour;
};
z.prototype.getMinutes = function() {
  return this._date.minute;
};
z.prototype.getSeconds = function() {
  return this._date.second;
};
z.prototype.getMilliseconds = function() {
  return this._date.millisecond;
};
z.prototype.getTime = function() {
  return this._date.valueOf();
};
z.prototype.getUTCDate = function() {
  return this._getUTC().day;
};
z.prototype.getUTCFullYear = function() {
  return this._getUTC().year;
};
z.prototype.getUTCDay = function() {
  var e = this._getUTC().weekday;
  return e == 7 ? 0 : e;
};
z.prototype.getUTCMonth = function() {
  return this._getUTC().month - 1;
};
z.prototype.getUTCHours = function() {
  return this._getUTC().hour;
};
z.prototype.getUTCMinutes = function() {
  return this._getUTC().minute;
};
z.prototype.getUTCSeconds = function() {
  return this._getUTC().second;
};
z.prototype.toISOString = function() {
  return this._date.toUTC().toISO();
};
z.prototype.toJSON = function() {
  return this._date.toJSON();
};
z.prototype.setDate = function(e) {
  this._date = this._date.set({ day: e });
};
z.prototype.setFullYear = function(e) {
  this._date = this._date.set({ year: e });
};
z.prototype.setDay = function(e) {
  this._date = this._date.set({ weekday: e });
};
z.prototype.setMonth = function(e) {
  this._date = this._date.set({ month: e + 1 });
};
z.prototype.setHours = function(e) {
  this._date = this._date.set({ hour: e });
};
z.prototype.setMinutes = function(e) {
  this._date = this._date.set({ minute: e });
};
z.prototype.setSeconds = function(e) {
  this._date = this._date.set({ second: e });
};
z.prototype.setMilliseconds = function(e) {
  this._date = this._date.set({ millisecond: e });
};
z.prototype._getUTC = function() {
  return this._date.toUTC();
};
z.prototype.toString = function() {
  return this.toDate().toString();
};
z.prototype.toDate = function() {
  return this._date.toJSDate();
};
z.prototype.isLastDayOfMonth = function() {
  var e = this._date.plus({ days: 1 }).startOf("day");
  return this._date.month !== e.month;
};
z.prototype.isLastWeekdayOfMonth = function() {
  var e = this._date.plus({ days: 7 }).startOf("day");
  return this._date.month !== e.month;
};
function z(e, t) {
  var n = { zone: t };
  if (e ? e instanceof z ? this._date = e._date : e instanceof Date ? this._date = En.DateTime.fromJSDate(e, n) : typeof e == "number" ? this._date = En.DateTime.fromMillis(e, n) : typeof e == "string" && (this._date = En.DateTime.fromISO(e, n), this._date.isValid || (this._date = En.DateTime.fromRFC2822(e, n)), this._date.isValid || (this._date = En.DateTime.fromSQL(e, n)), this._date.isValid || (this._date = En.DateTime.fromFormat(e, "EEE, d MMM yyyy HH:mm:ss", n))) : this._date = En.DateTime.local(), !this._date || !this._date.isValid)
    throw new Error("CronDate: unhandled timestamp: " + JSON.stringify(e));
  t && t !== this._date.zoneName && (this._date = this._date.setZone(t));
}
var Bg = z;
function Nn(e) {
  return {
    start: e,
    count: 1
  };
}
function hc(e, t) {
  e.end = t, e.step = t - e.start, e.count = 2;
}
function Ys(e, t, n) {
  t && (t.count === 2 ? (e.push(Nn(t.start)), e.push(Nn(t.end))) : e.push(t)), n && e.push(n);
}
function Zg(e) {
  for (var t = [], n = void 0, r = 0; r < e.length; r++) {
    var i = e[r];
    typeof i != "number" ? (Ys(t, n, Nn(i)), n = void 0) : n ? n.count === 1 ? hc(n, i) : n.step === i - n.end ? (n.count++, n.end = i) : n.count === 2 ? (t.push(Nn(n.start)), n = Nn(n.end), hc(n, i)) : (Ys(t, n), n = Nn(i)) : n = Nn(i);
  }
  return Ys(t, n), t;
}
var Yg = Zg, Gg = Yg;
function Qg(e, t, n) {
  var r = Gg(e);
  if (r.length === 1) {
    var i = r[0], o = i.step;
    if (o === 1 && i.start === t && i.end === n)
      return "*";
    if (o !== 1 && i.start === t && i.end === n - o + 1)
      return "*/" + o;
  }
  for (var s = [], l = 0, a = r.length; l < a; ++l) {
    var u = r[l];
    if (u.count === 1) {
      s.push(u.start);
      continue;
    }
    var o = u.step;
    if (u.step === 1) {
      s.push(u.start + "-" + u.end);
      continue;
    }
    var c = u.start == 0 ? u.count - 1 : u.count;
    u.step * c > u.end ? s = s.concat(
      Array.from({ length: u.end - u.start + 1 }).map(function(p, h) {
        var g = u.start + h;
        return (g - u.start) % u.step === 0 ? g : null;
      }).filter(function(p) {
        return p != null;
      })
    ) : u.end === n - u.step + 1 ? s.push(u.start + "/" + u.step) : s.push(u.start + "-" + u.end + "/" + u.step);
  }
  return s.join(",");
}
var qg = Qg, In = Bg, Kg = qg, mc = 1e4;
function M(e, t) {
  this._options = t, this._utc = t.utc || !1, this._tz = this._utc ? "UTC" : t.tz, this._currentDate = new In(t.currentDate, this._tz), this._startDate = t.startDate ? new In(t.startDate, this._tz) : null, this._endDate = t.endDate ? new In(t.endDate, this._tz) : null, this._isIterator = t.iterator || !1, this._hasIterated = !1, this._nthDayOfWeek = t.nthDayOfWeek || 0, this.fields = M._freezeFields(e);
}
M.map = ["second", "minute", "hour", "dayOfMonth", "month", "dayOfWeek"];
M.predefined = {
  "@yearly": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@hourly": "0 * * * *"
};
M.constraints = [
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
M.daysInMonth = [
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
M.aliases = {
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
M.parseDefaults = ["0", "*", "*", "*", "*", "*"];
M.standardValidCharacters = /^[,*\d/-]+$/;
M.dayOfWeekValidCharacters = /^[?,*\dL#/-]+$/;
M.dayOfMonthValidCharacters = /^[?,*\dL/-]+$/;
M.validCharacters = {
  second: M.standardValidCharacters,
  minute: M.standardValidCharacters,
  hour: M.standardValidCharacters,
  dayOfMonth: M.dayOfMonthValidCharacters,
  month: M.standardValidCharacters,
  dayOfWeek: M.dayOfWeekValidCharacters
};
M._isValidConstraintChar = function(t, n) {
  return typeof n != "string" ? !1 : t.chars.some(function(r) {
    return n.indexOf(r) > -1;
  });
};
M._parseField = function(t, n, r) {
  switch (t) {
    case "month":
    case "dayOfWeek":
      var i = M.aliases[t];
      n = n.replace(/[a-z]{3}/gi, function(a) {
        if (a = a.toLowerCase(), typeof i[a] < "u")
          return i[a];
        throw new Error('Validation error, cannot resolve alias "' + a + '"');
      });
      break;
  }
  if (!M.validCharacters[t].test(n))
    throw new Error("Invalid characters, got value: " + n);
  n.indexOf("*") !== -1 ? n = n.replace(/\*/g, r.min + "-" + r.max) : n.indexOf("?") !== -1 && (n = n.replace(/\?/g, r.min + "-" + r.max));
  function o(a) {
    var u = [];
    function c(g) {
      if (g instanceof Array)
        for (var v = 0, k = g.length; v < k; v++) {
          var m = g[v];
          if (M._isValidConstraintChar(r, m)) {
            u.push(m);
            continue;
          }
          if (typeof m != "number" || Number.isNaN(m) || m < r.min || m > r.max)
            throw new Error(
              "Constraint error, got value " + m + " expected range " + r.min + "-" + r.max
            );
          u.push(m);
        }
      else {
        if (M._isValidConstraintChar(r, g)) {
          u.push(g);
          return;
        }
        var d = +g;
        if (Number.isNaN(d) || d < r.min || d > r.max)
          throw new Error(
            "Constraint error, got value " + g + " expected range " + r.min + "-" + r.max
          );
        t === "dayOfWeek" && (d = d % 7), u.push(d);
      }
    }
    var f = a.split(",");
    if (!f.every(function(g) {
      return g.length > 0;
    }))
      throw new Error("Invalid list value format");
    if (f.length > 1)
      for (var p = 0, h = f.length; p < h; p++)
        c(s(f[p]));
    else
      c(s(a));
    return u.sort(M._sortCompareFn), u;
  }
  function s(a) {
    var u = 1, c = a.split("/");
    if (c.length > 2)
      throw new Error("Invalid repeat: " + a);
    return c.length > 1 ? (c[0] == +c[0] && (c = [c[0] + "-" + r.max, c[1]]), l(c[0], c[c.length - 1])) : l(a, u);
  }
  function l(a, u) {
    var c = [], f = a.split("-");
    if (f.length > 1) {
      if (f.length < 2)
        return +a;
      if (!f[0].length) {
        if (!f[1].length)
          throw new Error("Invalid range: " + a);
        return +a;
      }
      var p = +f[0], h = +f[1];
      if (Number.isNaN(p) || Number.isNaN(h) || p < r.min || h > r.max)
        throw new Error(
          "Constraint error, got range " + p + "-" + h + " expected range " + r.min + "-" + r.max
        );
      if (p > h)
        throw new Error("Invalid range: " + a);
      var g = +u;
      if (Number.isNaN(g) || g <= 0)
        throw new Error("Constraint error, cannot repeat at every " + g + " time.");
      t === "dayOfWeek" && h % 7 === 0 && c.push(0);
      for (var v = p, k = h; v <= k; v++) {
        var m = c.indexOf(v) !== -1;
        !m && g > 0 && g % u === 0 ? (g = 1, c.push(v)) : g++;
      }
      return c;
    }
    return Number.isNaN(+a) ? a : +a;
  }
  return o(n);
};
M._sortCompareFn = function(e, t) {
  var n = typeof e == "number", r = typeof t == "number";
  return n && r ? e - t : !n && r ? 1 : n && !r ? -1 : e.localeCompare(t);
};
M._handleMaxDaysInMonth = function(e) {
  if (e.month.length === 1) {
    var t = M.daysInMonth[e.month[0] - 1];
    if (e.dayOfMonth[0] > t)
      throw new Error("Invalid explicit day of month definition");
    return e.dayOfMonth.filter(function(n) {
      return n === "L" ? !0 : n <= t;
    }).sort(M._sortCompareFn);
  }
};
M._freezeFields = function(e) {
  for (var t = 0, n = M.map.length; t < n; ++t) {
    var r = M.map[t], i = e[r];
    e[r] = Object.freeze(i);
  }
  return Object.freeze(e);
};
M.prototype._applyTimezoneShift = function(e, t, n) {
  if (n === "Month" || n === "Day") {
    var r = e.getTime();
    e[t + n]();
    var i = e.getTime();
    r === i && (e.getMinutes() === 0 && e.getSeconds() === 0 ? e.addHour() : e.getMinutes() === 59 && e.getSeconds() === 59 && e.subtractHour());
  } else {
    var o = e.getHours();
    e[t + n]();
    var s = e.getHours(), l = s - o;
    l === 2 ? this.fields.hour.length !== 24 && (this._dstStart = s) : l === 0 && e.getMinutes() === 0 && e.getSeconds() === 0 && this.fields.hour.length !== 24 && (this._dstEnd = s);
  }
};
M.prototype._findSchedule = function(t) {
  function n(m, d) {
    for (var y = 0, w = d.length; y < w; y++)
      if (d[y] >= m)
        return d[y] === m;
    return d[0] === m;
  }
  function r(m, d) {
    if (d < 6) {
      if (m.getDate() < 8 && d === 1)
        return !0;
      var y = m.getDate() % 7 ? 1 : 0, w = m.getDate() - m.getDate() % 7, S = Math.floor(w / 7) + y;
      return S === d;
    }
    return !1;
  }
  function i(m) {
    return m.length > 0 && m.some(function(d) {
      return typeof d == "string" && d.indexOf("L") >= 0;
    });
  }
  t = t || !1;
  var o = t ? "subtract" : "add", s = new In(this._currentDate, this._tz), l = this._startDate, a = this._endDate, u = s.getTime(), c = 0;
  function f(m) {
    return m.some(function(d) {
      if (!i([d]))
        return !1;
      var y = Number.parseInt(d[0]) % 7;
      if (Number.isNaN(y))
        throw new Error("Invalid last weekday of the month expression: " + d);
      return s.getDay() === y && s.isLastWeekdayOfMonth();
    });
  }
  for (; c < mc; ) {
    if (c++, t) {
      if (l && s.getTime() - l.getTime() < 0)
        throw new Error("Out of the timespan range");
    } else if (a && a.getTime() - s.getTime() < 0)
      throw new Error("Out of the timespan range");
    var p = n(s.getDate(), this.fields.dayOfMonth);
    i(this.fields.dayOfMonth) && (p = p || s.isLastDayOfMonth());
    var h = n(s.getDay(), this.fields.dayOfWeek);
    i(this.fields.dayOfWeek) && (h = h || f(this.fields.dayOfWeek));
    var g = this.fields.dayOfMonth.length >= M.daysInMonth[s.getMonth()], v = this.fields.dayOfWeek.length === M.constraints[5].max - M.constraints[5].min + 1, k = s.getHours();
    if (!p && (!h || v)) {
      this._applyTimezoneShift(s, o, "Day");
      continue;
    }
    if (!g && v && !p) {
      this._applyTimezoneShift(s, o, "Day");
      continue;
    }
    if (g && !v && !h) {
      this._applyTimezoneShift(s, o, "Day");
      continue;
    }
    if (this._nthDayOfWeek > 0 && !r(s, this._nthDayOfWeek)) {
      this._applyTimezoneShift(s, o, "Day");
      continue;
    }
    if (!n(s.getMonth() + 1, this.fields.month)) {
      this._applyTimezoneShift(s, o, "Month");
      continue;
    }
    if (n(k, this.fields.hour)) {
      if (this._dstEnd === k && !t) {
        this._dstEnd = null, this._applyTimezoneShift(s, "add", "Hour");
        continue;
      }
    } else if (this._dstStart !== k) {
      this._dstStart = null, this._applyTimezoneShift(s, o, "Hour");
      continue;
    } else if (!n(k - 1, this.fields.hour)) {
      s[o + "Hour"]();
      continue;
    }
    if (!n(s.getMinutes(), this.fields.minute)) {
      this._applyTimezoneShift(s, o, "Minute");
      continue;
    }
    if (!n(s.getSeconds(), this.fields.second)) {
      this._applyTimezoneShift(s, o, "Second");
      continue;
    }
    if (u === s.getTime()) {
      o === "add" || s.getMilliseconds() === 0 ? this._applyTimezoneShift(s, o, "Second") : s.setMilliseconds(0);
      continue;
    }
    break;
  }
  if (c >= mc)
    throw new Error("Invalid expression, loop limit exceeded");
  return this._currentDate = new In(s, this._tz), this._hasIterated = !0, s;
};
M.prototype.next = function() {
  var t = this._findSchedule();
  return this._isIterator ? {
    value: t,
    done: !this.hasNext()
  } : t;
};
M.prototype.prev = function() {
  var t = this._findSchedule(!0);
  return this._isIterator ? {
    value: t,
    done: !this.hasPrev()
  } : t;
};
M.prototype.hasNext = function() {
  var e = this._currentDate, t = this._hasIterated;
  try {
    return this._findSchedule(), !0;
  } catch {
    return !1;
  } finally {
    this._currentDate = e, this._hasIterated = t;
  }
};
M.prototype.hasPrev = function() {
  var e = this._currentDate, t = this._hasIterated;
  try {
    return this._findSchedule(!0), !0;
  } catch {
    return !1;
  } finally {
    this._currentDate = e, this._hasIterated = t;
  }
};
M.prototype.iterate = function(t, n) {
  var r = [];
  if (t >= 0)
    for (var i = 0, o = t; i < o; i++)
      try {
        var s = this.next();
        r.push(s), n && n(s, i);
      } catch {
        break;
      }
  else
    for (var i = 0, o = t; i > o; i--)
      try {
        var s = this.prev();
        r.push(s), n && n(s, i);
      } catch {
        break;
      }
  return r;
};
M.prototype.reset = function(t) {
  this._currentDate = new In(t || this._options.currentDate);
};
M.prototype.stringify = function(t) {
  for (var n = [], r = t ? 0 : 1, i = M.map.length; r < i; ++r) {
    var o = M.map[r], s = this.fields[o], l = M.constraints[r];
    o === "dayOfMonth" && this.fields.month.length === 1 ? l = { min: 1, max: M.daysInMonth[this.fields.month[0] - 1] } : o === "dayOfWeek" && (l = { min: 0, max: 6 }, s = s[s.length - 1] === 7 ? s.slice(0, -1) : s), n.push(Kg(s, l.min, l.max));
  }
  return n.join(" ");
};
M.parse = function(t, n) {
  var r = this;
  typeof n == "function" && (n = {});
  function i(o, s) {
    s || (s = {}), typeof s.currentDate > "u" && (s.currentDate = new In(void 0, r._tz)), M.predefined[o] && (o = M.predefined[o]);
    var l = [], a = (o + "").trim().split(/\s+/);
    if (a.length > 6)
      throw new Error("Invalid cron expression");
    for (var u = M.map.length - a.length, c = 0, f = M.map.length; c < f; ++c) {
      var p = M.map[c], h = a[a.length > f ? c : c - u];
      if (c < u || !h)
        l.push(
          M._parseField(
            p,
            M.parseDefaults[c],
            M.constraints[c]
          )
        );
      else {
        var g = p === "dayOfWeek" ? d(h) : h;
        l.push(
          M._parseField(
            p,
            g,
            M.constraints[c]
          )
        );
      }
    }
    for (var v = {}, c = 0, f = M.map.length; c < f; c++) {
      var k = M.map[c];
      v[k] = l[c];
    }
    var m = M._handleMaxDaysInMonth(v);
    return v.dayOfMonth = m || v.dayOfMonth, new M(v, s);
    function d(y) {
      var w = y.split("#");
      if (w.length > 1) {
        var S = +w[w.length - 1];
        if (/,/.test(y))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `,` special characters are incompatible");
        if (/\//.test(y))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `/` special characters are incompatible");
        if (/-/.test(y))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `-` special characters are incompatible");
        if (w.length > 2 || Number.isNaN(S) || S < 1 || S > 5)
          throw new Error("Constraint error, invalid dayOfWeek occurrence number (#)");
        return s.nthDayOfWeek = S, w[0];
      }
      return y;
    }
  }
  return i(t, n);
};
M.fieldsToExpression = function(t, n) {
  function r(p, h, g) {
    if (!h)
      throw new Error("Validation error, Field " + p + " is missing");
    if (h.length === 0)
      throw new Error("Validation error, Field " + p + " contains no values");
    for (var v = 0, k = h.length; v < k; v++) {
      var m = h[v];
      if (!M._isValidConstraintChar(g, m) && (typeof m != "number" || Number.isNaN(m) || m < g.min || m > g.max))
        throw new Error(
          "Constraint error, got value " + m + " expected range " + g.min + "-" + g.max
        );
    }
  }
  for (var i = {}, o = 0, s = M.map.length; o < s; ++o) {
    var l = M.map[o], a = t[l];
    r(
      l,
      a,
      M.constraints[o]
    );
    for (var u = [], c = -1; ++c < a.length; )
      u[c] = a[c];
    if (a = u.sort(M._sortCompareFn).filter(function(p, h, g) {
      return !h || p !== g[h - 1];
    }), a.length !== u.length)
      throw new Error("Validation error, Field " + l + " contains duplicate values");
    i[l] = a;
  }
  var f = M._handleMaxDaysInMonth(i);
  return i.dayOfMonth = f || i.dayOfMonth, new M(i, n || {});
};
var Jg = M, Vo = Jg;
function vr() {
}
vr._parseEntry = function(t) {
  var n = t.split(" ");
  if (n.length === 6)
    return {
      interval: Vo.parse(t)
    };
  if (n.length > 6)
    return {
      interval: Vo.parse(
        n.slice(0, 6).join(" ")
      ),
      command: n.slice(6, n.length)
    };
  throw new Error("Invalid entry: " + t);
};
vr.parseExpression = function(t, n) {
  return Vo.parse(t, n);
};
vr.fieldsToExpression = function(t, n) {
  return Vo.fieldsToExpression(t, n);
};
vr.parseString = function(t) {
  for (var n = t.split(`
`), r = {
    variables: {},
    expressions: [],
    errors: {}
  }, i = 0, o = n.length; i < o; i++) {
    var s = n[i], l = null, a = s.trim();
    if (a.length > 0) {
      if (a.match(/^#/))
        continue;
      if (l = a.match(/^(.*)=(.*)$/))
        r.variables[l[1]] = l[2];
      else {
        var u = null;
        try {
          u = vr._parseEntry("0 " + a), r.expressions.push(u.interval);
        } catch (c) {
          r.errors[a] = c;
        }
      }
    }
  }
  return r;
};
var Xg = vr;
const e0 = /* @__PURE__ */ Wf(Xg);
var Ud = { exports: {} }, V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bi = Symbol.for("react.element"), t0 = Symbol.for("react.portal"), n0 = Symbol.for("react.fragment"), r0 = Symbol.for("react.strict_mode"), i0 = Symbol.for("react.profiler"), o0 = Symbol.for("react.provider"), s0 = Symbol.for("react.context"), l0 = Symbol.for("react.forward_ref"), a0 = Symbol.for("react.suspense"), u0 = Symbol.for("react.memo"), c0 = Symbol.for("react.lazy"), pc = Symbol.iterator;
function f0(e) {
  return e === null || typeof e != "object" ? null : (e = pc && e[pc] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Hd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, jd = Object.assign, Bd = {};
function Pr(e, t, n) {
  this.props = e, this.context = t, this.refs = Bd, this.updater = n || Hd;
}
Pr.prototype.isReactComponent = {};
Pr.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Pr.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Zd() {
}
Zd.prototype = Pr.prototype;
function Ia(e, t, n) {
  this.props = e, this.context = t, this.refs = Bd, this.updater = n || Hd;
}
var La = Ia.prototype = new Zd();
La.constructor = Ia;
jd(La, Pr.prototype);
La.isPureReactComponent = !0;
var yc = Array.isArray, Yd = Object.prototype.hasOwnProperty, za = { current: null }, Gd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Qd(e, t, n) {
  var r, i = {}, o = null, s = null;
  if (t != null)
    for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (o = "" + t.key), t)
      Yd.call(t, r) && !Gd.hasOwnProperty(r) && (i[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1)
    i.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++)
      a[u] = arguments[u + 2];
    i.children = a;
  }
  if (e && e.defaultProps)
    for (r in l = e.defaultProps, l)
      i[r] === void 0 && (i[r] = l[r]);
  return { $$typeof: bi, type: e, key: o, ref: s, props: i, _owner: za.current };
}
function d0(e, t) {
  return { $$typeof: bi, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ra(e) {
  return typeof e == "object" && e !== null && e.$$typeof === bi;
}
function h0(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var gc = /\/+/g;
function Gs(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? h0("" + e.key) : t.toString(36);
}
function Eo(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null)
    s = !0;
  else
    switch (o) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case bi:
          case t0:
            s = !0;
        }
    }
  if (s)
    return s = e, i = i(s), e = r === "" ? "." + Gs(s, 0) : r, yc(i) ? (n = "", e != null && (n = e.replace(gc, "$&/") + "/"), Eo(i, t, n, "", function(u) {
      return u;
    })) : i != null && (Ra(i) && (i = d0(i, n + (!i.key || s && s.key === i.key ? "" : ("" + i.key).replace(gc, "$&/") + "/") + e)), t.push(i)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", yc(e))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var a = r + Gs(o, l);
      s += Eo(o, t, n, a, i);
    }
  else if (a = f0(e), typeof a == "function")
    for (e = a.call(e), l = 0; !(o = e.next()).done; )
      o = o.value, a = r + Gs(o, l++), s += Eo(o, t, n, a, i);
  else if (o === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function eo(e, t, n) {
  if (e == null)
    return e;
  var r = [], i = 0;
  return Eo(e, r, "", "", function(o) {
    return t.call(n, o, i++);
  }), r;
}
function m0(e) {
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
var Pe = { current: null }, To = { transition: null }, p0 = { ReactCurrentDispatcher: Pe, ReactCurrentBatchConfig: To, ReactCurrentOwner: za };
V.Children = { map: eo, forEach: function(e, t, n) {
  eo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return eo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return eo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Ra(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
V.Component = Pr;
V.Fragment = n0;
V.Profiler = i0;
V.PureComponent = Ia;
V.StrictMode = r0;
V.Suspense = a0;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = p0;
V.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = jd({}, e.props), i = e.key, o = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, s = za.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps)
      var l = e.type.defaultProps;
    for (a in t)
      Yd.call(t, a) && !Gd.hasOwnProperty(a) && (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1)
    r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++)
      l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: bi, type: e.type, key: i, ref: o, props: r, _owner: s };
};
V.createContext = function(e) {
  return e = { $$typeof: s0, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: o0, _context: e }, e.Consumer = e;
};
V.createElement = Qd;
V.createFactory = function(e) {
  var t = Qd.bind(null, e);
  return t.type = e, t;
};
V.createRef = function() {
  return { current: null };
};
V.forwardRef = function(e) {
  return { $$typeof: l0, render: e };
};
V.isValidElement = Ra;
V.lazy = function(e) {
  return { $$typeof: c0, _payload: { _status: -1, _result: e }, _init: m0 };
};
V.memo = function(e, t) {
  return { $$typeof: u0, type: e, compare: t === void 0 ? null : t };
};
V.startTransition = function(e) {
  var t = To.transition;
  To.transition = {};
  try {
    e();
  } finally {
    To.transition = t;
  }
};
V.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
V.useCallback = function(e, t) {
  return Pe.current.useCallback(e, t);
};
V.useContext = function(e) {
  return Pe.current.useContext(e);
};
V.useDebugValue = function() {
};
V.useDeferredValue = function(e) {
  return Pe.current.useDeferredValue(e);
};
V.useEffect = function(e, t) {
  return Pe.current.useEffect(e, t);
};
V.useId = function() {
  return Pe.current.useId();
};
V.useImperativeHandle = function(e, t, n) {
  return Pe.current.useImperativeHandle(e, t, n);
};
V.useInsertionEffect = function(e, t) {
  return Pe.current.useInsertionEffect(e, t);
};
V.useLayoutEffect = function(e, t) {
  return Pe.current.useLayoutEffect(e, t);
};
V.useMemo = function(e, t) {
  return Pe.current.useMemo(e, t);
};
V.useReducer = function(e, t, n) {
  return Pe.current.useReducer(e, t, n);
};
V.useRef = function(e) {
  return Pe.current.useRef(e);
};
V.useState = function(e) {
  return Pe.current.useState(e);
};
V.useSyncExternalStore = function(e, t, n) {
  return Pe.current.useSyncExternalStore(e, t, n);
};
V.useTransition = function() {
  return Pe.current.useTransition();
};
V.version = "18.2.0";
Ud.exports = V;
var x = Ud.exports;
const Pt = /* @__PURE__ */ Wf(x);
var qd = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, vc = Pt.createContext && Pt.createContext(qd), nn = globalThis && globalThis.__assign || function() {
  return nn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, nn.apply(this, arguments);
}, y0 = globalThis && globalThis.__rest || function(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
};
function Kd(e) {
  return e && e.map(function(t, n) {
    return Pt.createElement(t.tag, nn({
      key: n
    }, t.attr), Kd(t.child));
  });
}
function Fa(e) {
  return function(t) {
    return Pt.createElement(g0, nn({
      attr: nn({}, e.attr)
    }, t), Kd(e.child));
  };
}
function g0(e) {
  var t = function(n) {
    var r = e.attr, i = e.size, o = e.title, s = y0(e, ["attr", "size", "title"]), l = i || n.size || "1em", a;
    return n.className && (a = n.className), e.className && (a = (a ? a + " " : "") + e.className), Pt.createElement("svg", nn({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, r, s, {
      className: a,
      style: nn(nn({
        color: e.color || n.color
      }, n.style), e.style),
      height: l,
      width: l,
      xmlns: "http://www.w3.org/2000/svg"
    }), o && Pt.createElement("title", null, o), e.children);
  };
  return vc !== void 0 ? Pt.createElement(vc.Consumer, null, function(n) {
    return t(n);
  }) : t(qd);
}
function v0(e) {
  return Fa({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" } }] })(e);
}
function w0(e) {
  return Fa({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" } }] })(e);
}
function S0(e) {
  return Fa({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" } }] })(e);
}
function $e() {
  return $e = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, $e.apply(this, arguments);
}
function Ot(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(i) {
    if (e == null || e(i), n === !1 || !i.defaultPrevented)
      return t == null ? void 0 : t(i);
  };
}
function k0(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function Jd(...e) {
  return (t) => e.forEach(
    (n) => k0(n, t)
  );
}
function Ir(...e) {
  return x.useCallback(Jd(...e), e);
}
function Xd(e, t = []) {
  let n = [];
  function r(o, s) {
    const l = /* @__PURE__ */ x.createContext(s), a = n.length;
    n = [
      ...n,
      s
    ];
    function u(f) {
      const { scope: p, children: h, ...g } = f, v = (p == null ? void 0 : p[e][a]) || l, k = x.useMemo(
        () => g,
        Object.values(g)
      );
      return /* @__PURE__ */ x.createElement(v.Provider, {
        value: k
      }, h);
    }
    function c(f, p) {
      const h = (p == null ? void 0 : p[e][a]) || l, g = x.useContext(h);
      if (g)
        return g;
      if (s !== void 0)
        return s;
      throw new Error(`\`${f}\` must be used within \`${o}\``);
    }
    return u.displayName = o + "Provider", [
      u,
      c
    ];
  }
  const i = () => {
    const o = n.map((s) => /* @__PURE__ */ x.createContext(s));
    return function(l) {
      const a = (l == null ? void 0 : l[e]) || o;
      return x.useMemo(
        () => ({
          [`__scope${e}`]: {
            ...l,
            [e]: a
          }
        }),
        [
          l,
          a
        ]
      );
    };
  };
  return i.scopeName = e, [
    r,
    x0(i, ...t)
  ];
}
function x0(...e) {
  const t = e[0];
  if (e.length === 1)
    return t;
  const n = () => {
    const r = e.map(
      (i) => ({
        useScope: i(),
        scopeName: i.scopeName
      })
    );
    return function(o) {
      const s = r.reduce((l, { useScope: a, scopeName: u }) => {
        const f = a(o)[`__scope${u}`];
        return {
          ...l,
          ...f
        };
      }, {});
      return x.useMemo(
        () => ({
          [`__scope${t.scopeName}`]: s
        }),
        [
          s
        ]
      );
    };
  };
  return n.scopeName = t.scopeName, n;
}
var eh = { exports: {} }, Qe = {}, th = { exports: {} }, nh = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(_, P) {
    var F = _.length;
    _.push(P);
    e:
      for (; 0 < F; ) {
        var B = F - 1 >>> 1, ee = _[B];
        if (0 < i(ee, P))
          _[B] = P, _[F] = ee, F = B;
        else
          break e;
      }
  }
  function n(_) {
    return _.length === 0 ? null : _[0];
  }
  function r(_) {
    if (_.length === 0)
      return null;
    var P = _[0], F = _.pop();
    if (F !== P) {
      _[0] = F;
      e:
        for (var B = 0, ee = _.length, fe = ee >>> 1; B < fe; ) {
          var Nt = 2 * (B + 1) - 1, Ht = _[Nt], Le = Nt + 1, Sn = _[Le];
          if (0 > i(Ht, F))
            Le < ee && 0 > i(Sn, Ht) ? (_[B] = Sn, _[Le] = F, B = Le) : (_[B] = Ht, _[Nt] = F, B = Nt);
          else if (Le < ee && 0 > i(Sn, F))
            _[B] = Sn, _[Le] = F, B = Le;
          else
            break e;
        }
    }
    return P;
  }
  function i(_, P) {
    var F = _.sortIndex - P.sortIndex;
    return F !== 0 ? F : _.id - P.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var s = Date, l = s.now();
    e.unstable_now = function() {
      return s.now() - l;
    };
  }
  var a = [], u = [], c = 1, f = null, p = 3, h = !1, g = !1, v = !1, k = typeof setTimeout == "function" ? setTimeout : null, m = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(_) {
    for (var P = n(u); P !== null; ) {
      if (P.callback === null)
        r(u);
      else if (P.startTime <= _)
        r(u), P.sortIndex = P.expirationTime, t(a, P);
      else
        break;
      P = n(u);
    }
  }
  function w(_) {
    if (v = !1, y(_), !g)
      if (n(a) !== null)
        g = !0, X(S);
      else {
        var P = n(u);
        P !== null && W(w, P.startTime - _);
      }
  }
  function S(_, P) {
    g = !1, v && (v = !1, m(T), T = -1), h = !0;
    var F = p;
    try {
      for (y(P), f = n(a); f !== null && (!(f.expirationTime > P) || _ && !H()); ) {
        var B = f.callback;
        if (typeof B == "function") {
          f.callback = null, p = f.priorityLevel;
          var ee = B(f.expirationTime <= P);
          P = e.unstable_now(), typeof ee == "function" ? f.callback = ee : f === n(a) && r(a), y(P);
        } else
          r(a);
        f = n(a);
      }
      if (f !== null)
        var fe = !0;
      else {
        var Nt = n(u);
        Nt !== null && W(w, Nt.startTime - P), fe = !1;
      }
      return fe;
    } finally {
      f = null, p = F, h = !1;
    }
  }
  var E = !1, N = null, T = -1, L = 5, $ = -1;
  function H() {
    return !(e.unstable_now() - $ < L);
  }
  function I() {
    if (N !== null) {
      var _ = e.unstable_now();
      $ = _;
      var P = !0;
      try {
        P = N(!0, _);
      } finally {
        P ? he() : (E = !1, N = null);
      }
    } else
      E = !1;
  }
  var he;
  if (typeof d == "function")
    he = function() {
      d(I);
    };
  else if (typeof MessageChannel < "u") {
    var Z = new MessageChannel(), J = Z.port2;
    Z.port1.onmessage = I, he = function() {
      J.postMessage(null);
    };
  } else
    he = function() {
      k(I, 0);
    };
  function X(_) {
    N = _, E || (E = !0, he());
  }
  function W(_, P) {
    T = k(function() {
      _(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(_) {
    _.callback = null;
  }, e.unstable_continueExecution = function() {
    g || h || (g = !0, X(S));
  }, e.unstable_forceFrameRate = function(_) {
    0 > _ || 125 < _ ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < _ ? Math.floor(1e3 / _) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(_) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = p;
    }
    var F = p;
    p = P;
    try {
      return _();
    } finally {
      p = F;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(_, P) {
    switch (_) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        _ = 3;
    }
    var F = p;
    p = _;
    try {
      return P();
    } finally {
      p = F;
    }
  }, e.unstable_scheduleCallback = function(_, P, F) {
    var B = e.unstable_now();
    switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? B + F : B) : F = B, _) {
      case 1:
        var ee = -1;
        break;
      case 2:
        ee = 250;
        break;
      case 5:
        ee = 1073741823;
        break;
      case 4:
        ee = 1e4;
        break;
      default:
        ee = 5e3;
    }
    return ee = F + ee, _ = { id: c++, callback: P, priorityLevel: _, startTime: F, expirationTime: ee, sortIndex: -1 }, F > B ? (_.sortIndex = F, t(u, _), n(a) === null && _ === n(u) && (v ? (m(T), T = -1) : v = !0, W(w, F - B))) : (_.sortIndex = ee, t(a, _), g || h || (g = !0, X(S))), _;
  }, e.unstable_shouldYield = H, e.unstable_wrapCallback = function(_) {
    var P = p;
    return function() {
      var F = p;
      p = P;
      try {
        return _.apply(this, arguments);
      } finally {
        p = F;
      }
    };
  };
})(nh);
th.exports = nh;
var E0 = th.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rh = x, Ye = E0;
function C(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ih = /* @__PURE__ */ new Set(), mi = {};
function Hn(e, t) {
  wr(e, t), wr(e + "Capture", t);
}
function wr(e, t) {
  for (mi[e] = t, e = 0; e < t.length; e++)
    ih.add(t[e]);
}
var Lt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), _l = Object.prototype.hasOwnProperty, T0 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, wc = {}, Sc = {};
function C0(e) {
  return _l.call(Sc, e) ? !0 : _l.call(wc, e) ? !1 : T0.test(e) ? Sc[e] = !0 : (wc[e] = !0, !1);
}
function N0(e, t, n, r) {
  if (n !== null && n.type === 0)
    return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function _0(e, t, n, r) {
  if (t === null || typeof t > "u" || N0(e, t, n, r))
    return !0;
  if (r)
    return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ie(e, t, n, r, i, o, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = s;
}
var xe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  xe[e] = new Ie(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  xe[t] = new Ie(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  xe[e] = new Ie(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  xe[e] = new Ie(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  xe[e] = new Ie(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  xe[e] = new Ie(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  xe[e] = new Ie(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  xe[e] = new Ie(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  xe[e] = new Ie(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Aa = /[\-:]([a-z])/g;
function ba(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Aa,
    ba
  );
  xe[t] = new Ie(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Aa, ba);
  xe[t] = new Ie(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Aa, ba);
  xe[t] = new Ie(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  xe[e] = new Ie(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
xe.xlinkHref = new Ie("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  xe[e] = new Ie(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Va(e, t, n, r) {
  var i = xe.hasOwnProperty(t) ? xe[t] : null;
  (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (_0(t, n, i, r) && (n = null), r || i === null ? C0(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Wt = rh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, to = Symbol.for("react.element"), qn = Symbol.for("react.portal"), Kn = Symbol.for("react.fragment"), Wa = Symbol.for("react.strict_mode"), Ol = Symbol.for("react.profiler"), oh = Symbol.for("react.provider"), sh = Symbol.for("react.context"), Ua = Symbol.for("react.forward_ref"), Ml = Symbol.for("react.suspense"), Dl = Symbol.for("react.suspense_list"), Ha = Symbol.for("react.memo"), Qt = Symbol.for("react.lazy"), lh = Symbol.for("react.offscreen"), kc = Symbol.iterator;
function Wr(e) {
  return e === null || typeof e != "object" ? null : (e = kc && e[kc] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ae = Object.assign, Qs;
function Xr(e) {
  if (Qs === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Qs = t && t[1] || "";
    }
  return `
` + Qs + e;
}
var qs = !1;
function Ks(e, t) {
  if (!e || qs)
    return "";
  qs = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (var i = u.stack.split(`
`), o = r.stack.split(`
`), s = i.length - 1, l = o.length - 1; 1 <= s && 0 <= l && i[s] !== o[l]; )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (i[s] !== o[l]) {
          if (s !== 1 || l !== 1)
            do
              if (s--, l--, 0 > l || i[s] !== o[l]) {
                var a = `
` + i[s].replace(" at new ", " at ");
                return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    qs = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Xr(e) : "";
}
function O0(e) {
  switch (e.tag) {
    case 5:
      return Xr(e.type);
    case 16:
      return Xr("Lazy");
    case 13:
      return Xr("Suspense");
    case 19:
      return Xr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ks(e.type, !1), e;
    case 11:
      return e = Ks(e.type.render, !1), e;
    case 1:
      return e = Ks(e.type, !0), e;
    default:
      return "";
  }
}
function $l(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case Kn:
      return "Fragment";
    case qn:
      return "Portal";
    case Ol:
      return "Profiler";
    case Wa:
      return "StrictMode";
    case Ml:
      return "Suspense";
    case Dl:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case sh:
        return (e.displayName || "Context") + ".Consumer";
      case oh:
        return (e._context.displayName || "Context") + ".Provider";
      case Ua:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Ha:
        return t = e.displayName || null, t !== null ? t : $l(e.type) || "Memo";
      case Qt:
        t = e._payload, e = e._init;
        try {
          return $l(e(t));
        } catch {
        }
    }
  return null;
}
function M0(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return $l(t);
    case 8:
      return t === Wa ? "StrictMode" : "Mode";
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
      if (typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
  }
  return null;
}
function dn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ah(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function D0(e) {
  var t = ah(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var i = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return i.call(this);
    }, set: function(s) {
      r = "" + s, o.call(this, s);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(s) {
      r = "" + s;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function no(e) {
  e._valueTracker || (e._valueTracker = D0(e));
}
function uh(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = ah(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Wo(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Pl(e, t) {
  var n = t.checked;
  return ae({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function xc(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = dn(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ch(e, t) {
  t = t.checked, t != null && Va(e, "checked", t, !1);
}
function Il(e, t) {
  ch(e, t);
  var n = dn(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ll(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ll(e, t.type, dn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ec(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Ll(e, t, n) {
  (t !== "number" || Wo(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var ei = Array.isArray;
function cr(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var i = 0; i < n.length; i++)
      t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + dn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        e[i].selected = !0, r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function zl(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(C(91));
  return ae({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Tc(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null)
        throw Error(C(92));
      if (ei(n)) {
        if (1 < n.length)
          throw Error(C(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: dn(n) };
}
function fh(e, t) {
  var n = dn(t.value), r = dn(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Cc(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function dh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Rl(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? dh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var ro, hh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, i);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
    e.innerHTML = t;
  else {
    for (ro = ro || document.createElement("div"), ro.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ro.firstChild; e.firstChild; )
      e.removeChild(e.firstChild);
    for (; t.firstChild; )
      e.appendChild(t.firstChild);
  }
});
function pi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ii = {
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
}, $0 = ["Webkit", "ms", "Moz", "O"];
Object.keys(ii).forEach(function(e) {
  $0.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), ii[t] = ii[e];
  });
});
function mh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || ii.hasOwnProperty(e) && ii[e] ? ("" + t).trim() : t + "px";
}
function ph(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = mh(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
}
var P0 = ae({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Fl(e, t) {
  if (t) {
    if (P0[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(C(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null)
        throw Error(C(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
        throw Error(C(61));
    }
    if (t.style != null && typeof t.style != "object")
      throw Error(C(62));
  }
}
function Al(e, t) {
  if (e.indexOf("-") === -1)
    return typeof t.is == "string";
  switch (e) {
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
var bl = null;
function ja(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Vl = null, fr = null, dr = null;
function Nc(e) {
  if (e = Ui(e)) {
    if (typeof Vl != "function")
      throw Error(C(280));
    var t = e.stateNode;
    t && (t = Es(t), Vl(e.stateNode, e.type, t));
  }
}
function yh(e) {
  fr ? dr ? dr.push(e) : dr = [e] : fr = e;
}
function gh() {
  if (fr) {
    var e = fr, t = dr;
    if (dr = fr = null, Nc(e), t)
      for (e = 0; e < t.length; e++)
        Nc(t[e]);
  }
}
function vh(e, t) {
  return e(t);
}
function wh() {
}
var Js = !1;
function Sh(e, t, n) {
  if (Js)
    return e(t, n);
  Js = !0;
  try {
    return vh(e, t, n);
  } finally {
    Js = !1, (fr !== null || dr !== null) && (wh(), gh());
  }
}
function yi(e, t) {
  var n = e.stateNode;
  if (n === null)
    return null;
  var r = Es(n);
  if (r === null)
    return null;
  n = r[t];
  e:
    switch (t) {
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
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
  if (e)
    return null;
  if (n && typeof n != "function")
    throw Error(C(231, t, typeof n));
  return n;
}
var Wl = !1;
if (Lt)
  try {
    var Ur = {};
    Object.defineProperty(Ur, "passive", { get: function() {
      Wl = !0;
    } }), window.addEventListener("test", Ur, Ur), window.removeEventListener("test", Ur, Ur);
  } catch {
    Wl = !1;
  }
function I0(e, t, n, r, i, o, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var oi = !1, Uo = null, Ho = !1, Ul = null, L0 = { onError: function(e) {
  oi = !0, Uo = e;
} };
function z0(e, t, n, r, i, o, s, l, a) {
  oi = !1, Uo = null, I0.apply(L0, arguments);
}
function R0(e, t, n, r, i, o, s, l, a) {
  if (z0.apply(this, arguments), oi) {
    if (oi) {
      var u = Uo;
      oi = !1, Uo = null;
    } else
      throw Error(C(198));
    Ho || (Ho = !0, Ul = u);
  }
}
function jn(e) {
  var t = e, n = e;
  if (e.alternate)
    for (; t.return; )
      t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function kh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function _c(e) {
  if (jn(e) !== e)
    throw Error(C(188));
}
function F0(e) {
  var t = e.alternate;
  if (!t) {
    if (t = jn(e), t === null)
      throw Error(C(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
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
          return _c(i), e;
        if (o === r)
          return _c(i), t;
        o = o.sibling;
      }
      throw Error(C(188));
    }
    if (n.return !== r.return)
      n = i, r = o;
    else {
      for (var s = !1, l = i.child; l; ) {
        if (l === n) {
          s = !0, n = i, r = o;
          break;
        }
        if (l === r) {
          s = !0, r = i, n = o;
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = o.child; l; ) {
          if (l === n) {
            s = !0, n = o, r = i;
            break;
          }
          if (l === r) {
            s = !0, r = o, n = i;
            break;
          }
          l = l.sibling;
        }
        if (!s)
          throw Error(C(189));
      }
    }
    if (n.alternate !== r)
      throw Error(C(190));
  }
  if (n.tag !== 3)
    throw Error(C(188));
  return n.stateNode.current === n ? e : t;
}
function xh(e) {
  return e = F0(e), e !== null ? Eh(e) : null;
}
function Eh(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = Eh(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var Th = Ye.unstable_scheduleCallback, Oc = Ye.unstable_cancelCallback, A0 = Ye.unstable_shouldYield, b0 = Ye.unstable_requestPaint, de = Ye.unstable_now, V0 = Ye.unstable_getCurrentPriorityLevel, Ba = Ye.unstable_ImmediatePriority, Ch = Ye.unstable_UserBlockingPriority, jo = Ye.unstable_NormalPriority, W0 = Ye.unstable_LowPriority, Nh = Ye.unstable_IdlePriority, ws = null, xt = null;
function U0(e) {
  if (xt && typeof xt.onCommitFiberRoot == "function")
    try {
      xt.onCommitFiberRoot(ws, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var pt = Math.clz32 ? Math.clz32 : B0, H0 = Math.log, j0 = Math.LN2;
function B0(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (H0(e) / j0 | 0) | 0;
}
var io = 64, oo = 4194304;
function ti(e) {
  switch (e & -e) {
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
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Bo(e, t) {
  var n = e.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, i = e.suspendedLanes, o = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var l = s & ~i;
    l !== 0 ? r = ti(l) : (o &= s, o !== 0 && (r = ti(o)));
  } else
    s = n & ~i, s !== 0 ? r = ti(s) : o !== 0 && (r = ti(o));
  if (r === 0)
    return 0;
  if (t !== 0 && t !== r && !(t & i) && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0))
    return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t; )
      n = 31 - pt(t), i = 1 << n, r |= e[n], t &= ~i;
  return r;
}
function Z0(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
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
      return t + 5e3;
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
function Y0(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var s = 31 - pt(o), l = 1 << s, a = i[s];
    a === -1 ? (!(l & n) || l & r) && (i[s] = Z0(l, t)) : a <= t && (e.expiredLanes |= l), o &= ~l;
  }
}
function Hl(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function _h() {
  var e = io;
  return io <<= 1, !(io & 4194240) && (io = 64), e;
}
function Xs(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function Vi(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - pt(t), e[t] = n;
}
function G0(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - pt(n), o = 1 << i;
    t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
  }
}
function Za(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - pt(n), i = 1 << r;
    i & t | e[r] & t && (e[r] |= t), n &= ~i;
  }
}
var G = 0;
function Oh(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Mh, Ya, Dh, $h, Ph, jl = !1, so = [], rn = null, on = null, sn = null, gi = /* @__PURE__ */ new Map(), vi = /* @__PURE__ */ new Map(), Jt = [], Q0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Mc(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      rn = null;
      break;
    case "dragenter":
    case "dragleave":
      on = null;
      break;
    case "mouseover":
    case "mouseout":
      sn = null;
      break;
    case "pointerover":
    case "pointerout":
      gi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      vi.delete(t.pointerId);
  }
}
function Hr(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = Ui(t), t !== null && Ya(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
}
function q0(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return rn = Hr(rn, e, t, n, r, i), !0;
    case "dragenter":
      return on = Hr(on, e, t, n, r, i), !0;
    case "mouseover":
      return sn = Hr(sn, e, t, n, r, i), !0;
    case "pointerover":
      var o = i.pointerId;
      return gi.set(o, Hr(gi.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return o = i.pointerId, vi.set(o, Hr(vi.get(o) || null, e, t, n, r, i)), !0;
  }
  return !1;
}
function Ih(e) {
  var t = On(e.target);
  if (t !== null) {
    var n = jn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = kh(n), t !== null) {
          e.blockedOn = t, Ph(e.priority, function() {
            Dh(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Co(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Bl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      bl = r, n.target.dispatchEvent(r), bl = null;
    } else
      return t = Ui(n), t !== null && Ya(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Dc(e, t, n) {
  Co(e) && n.delete(t);
}
function K0() {
  jl = !1, rn !== null && Co(rn) && (rn = null), on !== null && Co(on) && (on = null), sn !== null && Co(sn) && (sn = null), gi.forEach(Dc), vi.forEach(Dc);
}
function jr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, jl || (jl = !0, Ye.unstable_scheduleCallback(Ye.unstable_NormalPriority, K0)));
}
function wi(e) {
  function t(i) {
    return jr(i, e);
  }
  if (0 < so.length) {
    jr(so[0], e);
    for (var n = 1; n < so.length; n++) {
      var r = so[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (rn !== null && jr(rn, e), on !== null && jr(on, e), sn !== null && jr(sn, e), gi.forEach(t), vi.forEach(t), n = 0; n < Jt.length; n++)
    r = Jt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Jt.length && (n = Jt[0], n.blockedOn === null); )
    Ih(n), n.blockedOn === null && Jt.shift();
}
var hr = Wt.ReactCurrentBatchConfig, Zo = !0;
function J0(e, t, n, r) {
  var i = G, o = hr.transition;
  hr.transition = null;
  try {
    G = 1, Ga(e, t, n, r);
  } finally {
    G = i, hr.transition = o;
  }
}
function X0(e, t, n, r) {
  var i = G, o = hr.transition;
  hr.transition = null;
  try {
    G = 4, Ga(e, t, n, r);
  } finally {
    G = i, hr.transition = o;
  }
}
function Ga(e, t, n, r) {
  if (Zo) {
    var i = Bl(e, t, n, r);
    if (i === null)
      ul(e, t, r, Yo, n), Mc(e, r);
    else if (q0(i, e, t, n, r))
      r.stopPropagation();
    else if (Mc(e, r), t & 4 && -1 < Q0.indexOf(e)) {
      for (; i !== null; ) {
        var o = Ui(i);
        if (o !== null && Mh(o), o = Bl(e, t, n, r), o === null && ul(e, t, r, Yo, n), o === i)
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else
      ul(e, t, r, null, n);
  }
}
var Yo = null;
function Bl(e, t, n, r) {
  if (Yo = null, e = ja(r), e = On(e), e !== null)
    if (t = jn(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = kh(t), e !== null)
        return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else
      t !== e && (e = null);
  return Yo = e, null;
}
function Lh(e) {
  switch (e) {
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
      switch (V0()) {
        case Ba:
          return 1;
        case Ch:
          return 4;
        case jo:
        case W0:
          return 16;
        case Nh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var en = null, Qa = null, No = null;
function zh() {
  if (No)
    return No;
  var e, t = Qa, n = t.length, r, i = "value" in en ? en.value : en.textContent, o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++)
    ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++)
    ;
  return No = i.slice(e, 1 < r ? 1 - r : void 0);
}
function _o(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function lo() {
  return !0;
}
function $c() {
  return !1;
}
function qe(e) {
  function t(n, r, i, o, s) {
    this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = s, this.currentTarget = null;
    for (var l in e)
      e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(o) : o[l]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? lo : $c, this.isPropagationStopped = $c, this;
  }
  return ae(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = lo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = lo);
  }, persist: function() {
  }, isPersistent: lo }), t;
}
var Lr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, qa = qe(Lr), Wi = ae({}, Lr, { view: 0, detail: 0 }), ev = qe(Wi), el, tl, Br, Ss = ae({}, Wi, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ka, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Br && (Br && e.type === "mousemove" ? (el = e.screenX - Br.screenX, tl = e.screenY - Br.screenY) : tl = el = 0, Br = e), el);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : tl;
} }), Pc = qe(Ss), tv = ae({}, Ss, { dataTransfer: 0 }), nv = qe(tv), rv = ae({}, Wi, { relatedTarget: 0 }), nl = qe(rv), iv = ae({}, Lr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ov = qe(iv), sv = ae({}, Lr, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), lv = qe(sv), av = ae({}, Lr, { data: 0 }), Ic = qe(av), uv = {
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
}, cv = {
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
}, fv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function dv(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = fv[e]) ? !!t[e] : !1;
}
function Ka() {
  return dv;
}
var hv = ae({}, Wi, { key: function(e) {
  if (e.key) {
    var t = uv[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = _o(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? cv[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ka, charCode: function(e) {
  return e.type === "keypress" ? _o(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _o(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), mv = qe(hv), pv = ae({}, Ss, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Lc = qe(pv), yv = ae({}, Wi, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ka }), gv = qe(yv), vv = ae({}, Lr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), wv = qe(vv), Sv = ae({}, Ss, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), kv = qe(Sv), xv = [9, 13, 27, 32], Ja = Lt && "CompositionEvent" in window, si = null;
Lt && "documentMode" in document && (si = document.documentMode);
var Ev = Lt && "TextEvent" in window && !si, Rh = Lt && (!Ja || si && 8 < si && 11 >= si), zc = String.fromCharCode(32), Rc = !1;
function Fh(e, t) {
  switch (e) {
    case "keyup":
      return xv.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ah(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Jn = !1;
function Tv(e, t) {
  switch (e) {
    case "compositionend":
      return Ah(t);
    case "keypress":
      return t.which !== 32 ? null : (Rc = !0, zc);
    case "textInput":
      return e = t.data, e === zc && Rc ? null : e;
    default:
      return null;
  }
}
function Cv(e, t) {
  if (Jn)
    return e === "compositionend" || !Ja && Fh(e, t) ? (e = zh(), No = Qa = en = null, Jn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length)
          return t.char;
        if (t.which)
          return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Rh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Nv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Fc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Nv[e.type] : t === "textarea";
}
function bh(e, t, n, r) {
  yh(r), t = Go(t, "onChange"), 0 < t.length && (n = new qa("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var li = null, Si = null;
function _v(e) {
  qh(e, 0);
}
function ks(e) {
  var t = tr(e);
  if (uh(t))
    return e;
}
function Ov(e, t) {
  if (e === "change")
    return t;
}
var Vh = !1;
if (Lt) {
  var rl;
  if (Lt) {
    var il = "oninput" in document;
    if (!il) {
      var Ac = document.createElement("div");
      Ac.setAttribute("oninput", "return;"), il = typeof Ac.oninput == "function";
    }
    rl = il;
  } else
    rl = !1;
  Vh = rl && (!document.documentMode || 9 < document.documentMode);
}
function bc() {
  li && (li.detachEvent("onpropertychange", Wh), Si = li = null);
}
function Wh(e) {
  if (e.propertyName === "value" && ks(Si)) {
    var t = [];
    bh(t, Si, e, ja(e)), Sh(_v, t);
  }
}
function Mv(e, t, n) {
  e === "focusin" ? (bc(), li = t, Si = n, li.attachEvent("onpropertychange", Wh)) : e === "focusout" && bc();
}
function Dv(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return ks(Si);
}
function $v(e, t) {
  if (e === "click")
    return ks(t);
}
function Pv(e, t) {
  if (e === "input" || e === "change")
    return ks(t);
}
function Iv(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var vt = typeof Object.is == "function" ? Object.is : Iv;
function ki(e, t) {
  if (vt(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!_l.call(t, i) || !vt(e[i], t[i]))
      return !1;
  }
  return !0;
}
function Vc(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function Wc(e, t) {
  var n = Vc(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t)
        return { node: n, offset: t - e };
      e = r;
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
    n = Vc(n);
  }
}
function Uh(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Uh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Hh() {
  for (var e = window, t = Wo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      e = t.contentWindow;
    else
      break;
    t = Wo(e.document);
  }
  return t;
}
function Xa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Lv(e) {
  var t = Hh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Uh(n.ownerDocument.documentElement, n)) {
    if (r !== null && Xa(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var i = n.textContent.length, o = Math.min(r.start, i);
        r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = Wc(n, o);
        var s = Wc(
          n,
          r
        );
        i && s && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var zv = Lt && "documentMode" in document && 11 >= document.documentMode, Xn = null, Zl = null, ai = null, Yl = !1;
function Uc(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Yl || Xn == null || Xn !== Wo(r) || (r = Xn, "selectionStart" in r && Xa(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), ai && ki(ai, r) || (ai = r, r = Go(Zl, "onSelect"), 0 < r.length && (t = new qa("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Xn)));
}
function ao(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var er = { animationend: ao("Animation", "AnimationEnd"), animationiteration: ao("Animation", "AnimationIteration"), animationstart: ao("Animation", "AnimationStart"), transitionend: ao("Transition", "TransitionEnd") }, ol = {}, jh = {};
Lt && (jh = document.createElement("div").style, "AnimationEvent" in window || (delete er.animationend.animation, delete er.animationiteration.animation, delete er.animationstart.animation), "TransitionEvent" in window || delete er.transitionend.transition);
function xs(e) {
  if (ol[e])
    return ol[e];
  if (!er[e])
    return e;
  var t = er[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in jh)
      return ol[e] = t[n];
  return e;
}
var Bh = xs("animationend"), Zh = xs("animationiteration"), Yh = xs("animationstart"), Gh = xs("transitionend"), Qh = /* @__PURE__ */ new Map(), Hc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function gn(e, t) {
  Qh.set(e, t), Hn(t, [e]);
}
for (var sl = 0; sl < Hc.length; sl++) {
  var ll = Hc[sl], Rv = ll.toLowerCase(), Fv = ll[0].toUpperCase() + ll.slice(1);
  gn(Rv, "on" + Fv);
}
gn(Bh, "onAnimationEnd");
gn(Zh, "onAnimationIteration");
gn(Yh, "onAnimationStart");
gn("dblclick", "onDoubleClick");
gn("focusin", "onFocus");
gn("focusout", "onBlur");
gn(Gh, "onTransitionEnd");
wr("onMouseEnter", ["mouseout", "mouseover"]);
wr("onMouseLeave", ["mouseout", "mouseover"]);
wr("onPointerEnter", ["pointerout", "pointerover"]);
wr("onPointerLeave", ["pointerout", "pointerover"]);
Hn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Hn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Hn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Hn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Hn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Hn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var ni = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Av = new Set("cancel close invalid load scroll toggle".split(" ").concat(ni));
function jc(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, R0(r, t, void 0, e), e.currentTarget = null;
}
function qh(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s], a = l.instance, u = l.currentTarget;
          if (l = l.listener, a !== o && i.isPropagationStopped())
            break e;
          jc(i, l, u), o = a;
        }
      else
        for (s = 0; s < r.length; s++) {
          if (l = r[s], a = l.instance, u = l.currentTarget, l = l.listener, a !== o && i.isPropagationStopped())
            break e;
          jc(i, l, u), o = a;
        }
    }
  }
  if (Ho)
    throw e = Ul, Ho = !1, Ul = null, e;
}
function ne(e, t) {
  var n = t[Jl];
  n === void 0 && (n = t[Jl] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Kh(t, e, 2, !1), n.add(r));
}
function al(e, t, n) {
  var r = 0;
  t && (r |= 4), Kh(n, e, r, t);
}
var uo = "_reactListening" + Math.random().toString(36).slice(2);
function xi(e) {
  if (!e[uo]) {
    e[uo] = !0, ih.forEach(function(n) {
      n !== "selectionchange" && (Av.has(n) || al(n, !1, e), al(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[uo] || (t[uo] = !0, al("selectionchange", !1, t));
  }
}
function Kh(e, t, n, r) {
  switch (Lh(t)) {
    case 1:
      var i = J0;
      break;
    case 4:
      i = X0;
      break;
    default:
      i = Ga;
  }
  n = i.bind(null, t, n, e), i = void 0, !Wl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
}
function ul(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e:
      for (; ; ) {
        if (r === null)
          return;
        var s = r.tag;
        if (s === 3 || s === 4) {
          var l = r.stateNode.containerInfo;
          if (l === i || l.nodeType === 8 && l.parentNode === i)
            break;
          if (s === 4)
            for (s = r.return; s !== null; ) {
              var a = s.tag;
              if ((a === 3 || a === 4) && (a = s.stateNode.containerInfo, a === i || a.nodeType === 8 && a.parentNode === i))
                return;
              s = s.return;
            }
          for (; l !== null; ) {
            if (s = On(l), s === null)
              return;
            if (a = s.tag, a === 5 || a === 6) {
              r = o = s;
              continue e;
            }
            l = l.parentNode;
          }
        }
        r = r.return;
      }
  Sh(function() {
    var u = o, c = ja(n), f = [];
    e: {
      var p = Qh.get(e);
      if (p !== void 0) {
        var h = qa, g = e;
        switch (e) {
          case "keypress":
            if (_o(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            h = mv;
            break;
          case "focusin":
            g = "focus", h = nl;
            break;
          case "focusout":
            g = "blur", h = nl;
            break;
          case "beforeblur":
          case "afterblur":
            h = nl;
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
            h = Pc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = nv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = gv;
            break;
          case Bh:
          case Zh:
          case Yh:
            h = ov;
            break;
          case Gh:
            h = wv;
            break;
          case "scroll":
            h = ev;
            break;
          case "wheel":
            h = kv;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = lv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = Lc;
        }
        var v = (t & 4) !== 0, k = !v && e === "scroll", m = v ? p !== null ? p + "Capture" : null : p;
        v = [];
        for (var d = u, y; d !== null; ) {
          y = d;
          var w = y.stateNode;
          if (y.tag === 5 && w !== null && (y = w, m !== null && (w = yi(d, m), w != null && v.push(Ei(d, w, y)))), k)
            break;
          d = d.return;
        }
        0 < v.length && (p = new h(p, g, null, n, c), f.push({ event: p, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", p && n !== bl && (g = n.relatedTarget || n.fromElement) && (On(g) || g[zt]))
          break e;
        if ((h || p) && (p = c.window === c ? c : (p = c.ownerDocument) ? p.defaultView || p.parentWindow : window, h ? (g = n.relatedTarget || n.toElement, h = u, g = g ? On(g) : null, g !== null && (k = jn(g), g !== k || g.tag !== 5 && g.tag !== 6) && (g = null)) : (h = null, g = u), h !== g)) {
          if (v = Pc, w = "onMouseLeave", m = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (v = Lc, w = "onPointerLeave", m = "onPointerEnter", d = "pointer"), k = h == null ? p : tr(h), y = g == null ? p : tr(g), p = new v(w, d + "leave", h, n, c), p.target = k, p.relatedTarget = y, w = null, On(c) === u && (v = new v(m, d + "enter", g, n, c), v.target = y, v.relatedTarget = k, w = v), k = w, h && g)
            t: {
              for (v = h, m = g, d = 0, y = v; y; y = Gn(y))
                d++;
              for (y = 0, w = m; w; w = Gn(w))
                y++;
              for (; 0 < d - y; )
                v = Gn(v), d--;
              for (; 0 < y - d; )
                m = Gn(m), y--;
              for (; d--; ) {
                if (v === m || m !== null && v === m.alternate)
                  break t;
                v = Gn(v), m = Gn(m);
              }
              v = null;
            }
          else
            v = null;
          h !== null && Bc(f, p, h, v, !1), g !== null && k !== null && Bc(f, k, g, v, !0);
        }
      }
      e: {
        if (p = u ? tr(u) : window, h = p.nodeName && p.nodeName.toLowerCase(), h === "select" || h === "input" && p.type === "file")
          var S = Ov;
        else if (Fc(p))
          if (Vh)
            S = Pv;
          else {
            S = Dv;
            var E = Mv;
          }
        else
          (h = p.nodeName) && h.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (S = $v);
        if (S && (S = S(e, u))) {
          bh(f, S, n, c);
          break e;
        }
        E && E(e, p, u), e === "focusout" && (E = p._wrapperState) && E.controlled && p.type === "number" && Ll(p, "number", p.value);
      }
      switch (E = u ? tr(u) : window, e) {
        case "focusin":
          (Fc(E) || E.contentEditable === "true") && (Xn = E, Zl = u, ai = null);
          break;
        case "focusout":
          ai = Zl = Xn = null;
          break;
        case "mousedown":
          Yl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Yl = !1, Uc(f, n, c);
          break;
        case "selectionchange":
          if (zv)
            break;
        case "keydown":
        case "keyup":
          Uc(f, n, c);
      }
      var N;
      if (Ja)
        e: {
          switch (e) {
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
        Jn ? Fh(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T && (Rh && n.locale !== "ko" && (Jn || T !== "onCompositionStart" ? T === "onCompositionEnd" && Jn && (N = zh()) : (en = c, Qa = "value" in en ? en.value : en.textContent, Jn = !0)), E = Go(u, T), 0 < E.length && (T = new Ic(T, e, null, n, c), f.push({ event: T, listeners: E }), N ? T.data = N : (N = Ah(n), N !== null && (T.data = N)))), (N = Ev ? Tv(e, n) : Cv(e, n)) && (u = Go(u, "onBeforeInput"), 0 < u.length && (c = new Ic("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: u }), c.data = N));
    }
    qh(f, t);
  });
}
function Ei(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Go(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e, o = i.stateNode;
    i.tag === 5 && o !== null && (i = o, o = yi(e, n), o != null && r.unshift(Ei(e, o, i)), o = yi(e, t), o != null && r.push(Ei(e, o, i))), e = e.return;
  }
  return r;
}
function Gn(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Bc(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n, a = l.alternate, u = l.stateNode;
    if (a !== null && a === r)
      break;
    l.tag === 5 && u !== null && (l = u, i ? (a = yi(n, o), a != null && s.unshift(Ei(n, a, l))) : i || (a = yi(n, o), a != null && s.push(Ei(n, a, l)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var bv = /\r\n?/g, Vv = /\u0000|\uFFFD/g;
function Zc(e) {
  return (typeof e == "string" ? e : "" + e).replace(bv, `
`).replace(Vv, "");
}
function co(e, t, n) {
  if (t = Zc(t), Zc(e) !== t && n)
    throw Error(C(425));
}
function Qo() {
}
var Gl = null, Ql = null;
function ql(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Kl = typeof setTimeout == "function" ? setTimeout : void 0, Wv = typeof clearTimeout == "function" ? clearTimeout : void 0, Yc = typeof Promise == "function" ? Promise : void 0, Uv = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yc < "u" ? function(e) {
  return Yc.resolve(null).then(e).catch(Hv);
} : Kl;
function Hv(e) {
  setTimeout(function() {
    throw e;
  });
}
function cl(e, t) {
  var n = t, r = 0;
  do {
    var i = n.nextSibling;
    if (e.removeChild(n), i && i.nodeType === 8)
      if (n = i.data, n === "/$") {
        if (r === 0) {
          e.removeChild(i), wi(t);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = i;
  } while (n);
  wi(t);
}
function ln(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3)
      break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?")
        break;
      if (t === "/$")
        return null;
    }
  }
  return e;
}
function Gc(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0)
          return e;
        t--;
      } else
        n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var zr = Math.random().toString(36).slice(2), kt = "__reactFiber$" + zr, Ti = "__reactProps$" + zr, zt = "__reactContainer$" + zr, Jl = "__reactEvents$" + zr, jv = "__reactListeners$" + zr, Bv = "__reactHandles$" + zr;
function On(e) {
  var t = e[kt];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[zt] || n[kt]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = Gc(e); e !== null; ) {
          if (n = e[kt])
            return n;
          e = Gc(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Ui(e) {
  return e = e[kt] || e[zt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function tr(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(C(33));
}
function Es(e) {
  return e[Ti] || null;
}
var Xl = [], nr = -1;
function vn(e) {
  return { current: e };
}
function re(e) {
  0 > nr || (e.current = Xl[nr], Xl[nr] = null, nr--);
}
function K(e, t) {
  nr++, Xl[nr] = e.current, e.current = t;
}
var hn = {}, Oe = vn(hn), Ae = vn(!1), Rn = hn;
function Sr(e, t) {
  var n = e.type.contextTypes;
  if (!n)
    return hn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {}, o;
  for (o in n)
    i[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
}
function be(e) {
  return e = e.childContextTypes, e != null;
}
function qo() {
  re(Ae), re(Oe);
}
function Qc(e, t, n) {
  if (Oe.current !== hn)
    throw Error(C(168));
  K(Oe, t), K(Ae, n);
}
function Jh(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var i in r)
    if (!(i in t))
      throw Error(C(108, M0(e) || "Unknown", i));
  return ae({}, n, r);
}
function Ko(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || hn, Rn = Oe.current, K(Oe, e), K(Ae, Ae.current), !0;
}
function qc(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(C(169));
  n ? (e = Jh(e, t, Rn), r.__reactInternalMemoizedMergedChildContext = e, re(Ae), re(Oe), K(Oe, e)) : re(Ae), K(Ae, n);
}
var Mt = null, Ts = !1, fl = !1;
function Xh(e) {
  Mt === null ? Mt = [e] : Mt.push(e);
}
function Zv(e) {
  Ts = !0, Xh(e);
}
function wn() {
  if (!fl && Mt !== null) {
    fl = !0;
    var e = 0, t = G;
    try {
      var n = Mt;
      for (G = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Mt = null, Ts = !1;
    } catch (i) {
      throw Mt !== null && (Mt = Mt.slice(e + 1)), Th(Ba, wn), i;
    } finally {
      G = t, fl = !1;
    }
  }
  return null;
}
var rr = [], ir = 0, Jo = null, Xo = 0, Je = [], Xe = 0, Fn = null, Dt = 1, $t = "";
function Tn(e, t) {
  rr[ir++] = Xo, rr[ir++] = Jo, Jo = e, Xo = t;
}
function em(e, t, n) {
  Je[Xe++] = Dt, Je[Xe++] = $t, Je[Xe++] = Fn, Fn = e;
  var r = Dt;
  e = $t;
  var i = 32 - pt(r) - 1;
  r &= ~(1 << i), n += 1;
  var o = 32 - pt(t) + i;
  if (30 < o) {
    var s = i - i % 5;
    o = (r & (1 << s) - 1).toString(32), r >>= s, i -= s, Dt = 1 << 32 - pt(t) + i | n << i | r, $t = o + e;
  } else
    Dt = 1 << o | n << i | r, $t = e;
}
function eu(e) {
  e.return !== null && (Tn(e, 1), em(e, 1, 0));
}
function tu(e) {
  for (; e === Jo; )
    Jo = rr[--ir], rr[ir] = null, Xo = rr[--ir], rr[ir] = null;
  for (; e === Fn; )
    Fn = Je[--Xe], Je[Xe] = null, $t = Je[--Xe], Je[Xe] = null, Dt = Je[--Xe], Je[Xe] = null;
}
var Be = null, He = null, ie = !1, ht = null;
function tm(e, t) {
  var n = nt(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Kc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Be = e, He = ln(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Be = e, He = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Fn !== null ? { id: Dt, overflow: $t } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = nt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Be = e, He = null, !0) : !1;
    default:
      return !1;
  }
}
function ea(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ta(e) {
  if (ie) {
    var t = He;
    if (t) {
      var n = t;
      if (!Kc(e, t)) {
        if (ea(e))
          throw Error(C(418));
        t = ln(n.nextSibling);
        var r = Be;
        t && Kc(e, t) ? tm(r, n) : (e.flags = e.flags & -4097 | 2, ie = !1, Be = e);
      }
    } else {
      if (ea(e))
        throw Error(C(418));
      e.flags = e.flags & -4097 | 2, ie = !1, Be = e;
    }
  }
}
function Jc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Be = e;
}
function fo(e) {
  if (e !== Be)
    return !1;
  if (!ie)
    return Jc(e), ie = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ql(e.type, e.memoizedProps)), t && (t = He)) {
    if (ea(e))
      throw nm(), Error(C(418));
    for (; t; )
      tm(e, t), t = ln(t.nextSibling);
  }
  if (Jc(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
      throw Error(C(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              He = ln(e.nextSibling);
              break e;
            }
            t--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      He = null;
    }
  } else
    He = Be ? ln(e.stateNode.nextSibling) : null;
  return !0;
}
function nm() {
  for (var e = He; e; )
    e = ln(e.nextSibling);
}
function kr() {
  He = Be = null, ie = !1;
}
function nu(e) {
  ht === null ? ht = [e] : ht.push(e);
}
var Yv = Wt.ReactCurrentBatchConfig;
function ft(e, t) {
  if (e && e.defaultProps) {
    t = ae({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var es = vn(null), ts = null, or = null, ru = null;
function iu() {
  ru = or = ts = null;
}
function ou(e) {
  var t = es.current;
  re(es), e._currentValue = t;
}
function na(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function mr(e, t) {
  ts = e, ru = or = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Fe = !0), e.firstContext = null);
}
function it(e) {
  var t = e._currentValue;
  if (ru !== e)
    if (e = { context: e, memoizedValue: t, next: null }, or === null) {
      if (ts === null)
        throw Error(C(308));
      or = e, ts.dependencies = { lanes: 0, firstContext: e };
    } else
      or = or.next = e;
  return t;
}
var Mn = null;
function su(e) {
  Mn === null ? Mn = [e] : Mn.push(e);
}
function rm(e, t, n, r) {
  var i = t.interleaved;
  return i === null ? (n.next = n, su(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Rt(e, r);
}
function Rt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var qt = !1;
function lu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function im(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function It(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function an(e, t, n) {
  var r = e.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, j & 2) {
    var i = r.pending;
    return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Rt(e, n);
  }
  return i = r.interleaved, i === null ? (t.next = t, su(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Rt(e, n);
}
function Oo(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Za(e, n);
  }
}
function Xc(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var i = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? i = o = s : o = o.next = s, n = n.next;
      } while (n !== null);
      o === null ? i = o = t : o = o.next = t;
    } else
      i = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function ns(e, t, n, r) {
  var i = e.updateQueue;
  qt = !1;
  var o = i.firstBaseUpdate, s = i.lastBaseUpdate, l = i.shared.pending;
  if (l !== null) {
    i.shared.pending = null;
    var a = l, u = a.next;
    a.next = null, s === null ? o = u : s.next = u, s = a;
    var c = e.alternate;
    c !== null && (c = c.updateQueue, l = c.lastBaseUpdate, l !== s && (l === null ? c.firstBaseUpdate = u : l.next = u, c.lastBaseUpdate = a));
  }
  if (o !== null) {
    var f = i.baseState;
    s = 0, c = u = a = null, l = o;
    do {
      var p = l.lane, h = l.eventTime;
      if ((r & p) === p) {
        c !== null && (c = c.next = {
          eventTime: h,
          lane: 0,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null
        });
        e: {
          var g = e, v = l;
          switch (p = t, h = n, v.tag) {
            case 1:
              if (g = v.payload, typeof g == "function") {
                f = g.call(h, f, p);
                break e;
              }
              f = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = v.payload, p = typeof g == "function" ? g.call(h, f, p) : g, p == null)
                break e;
              f = ae({}, f, p);
              break e;
            case 2:
              qt = !0;
          }
        }
        l.callback !== null && l.lane !== 0 && (e.flags |= 64, p = i.effects, p === null ? i.effects = [l] : p.push(l));
      } else
        h = { eventTime: h, lane: p, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, c === null ? (u = c = h, a = f) : c = c.next = h, s |= p;
      if (l = l.next, l === null) {
        if (l = i.shared.pending, l === null)
          break;
        p = l, l = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
      }
    } while (1);
    if (c === null && (a = f), i.baseState = a, i.firstBaseUpdate = u, i.lastBaseUpdate = c, t = i.shared.interleaved, t !== null) {
      i = t;
      do
        s |= i.lane, i = i.next;
      while (i !== t);
    } else
      o === null && (i.shared.lanes = 0);
    bn |= s, e.lanes = s, e.memoizedState = f;
  }
}
function ef(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null)
    for (t = 0; t < e.length; t++) {
      var r = e[t], i = r.callback;
      if (i !== null) {
        if (r.callback = null, r = n, typeof i != "function")
          throw Error(C(191, i));
        i.call(r);
      }
    }
}
var om = new rh.Component().refs;
function ra(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : ae({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Cs = { isMounted: function(e) {
  return (e = e._reactInternals) ? jn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = De(), i = cn(e), o = It(r, i);
  o.payload = t, n != null && (o.callback = n), t = an(e, o, i), t !== null && (yt(t, e, i, r), Oo(t, e, i));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = De(), i = cn(e), o = It(r, i);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = an(e, o, i), t !== null && (yt(t, e, i, r), Oo(t, e, i));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = De(), r = cn(e), i = It(n, r);
  i.tag = 2, t != null && (i.callback = t), t = an(e, i, r), t !== null && (yt(t, e, r, n), Oo(t, e, r));
} };
function tf(e, t, n, r, i, o, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, s) : t.prototype && t.prototype.isPureReactComponent ? !ki(n, r) || !ki(i, o) : !0;
}
function sm(e, t, n) {
  var r = !1, i = hn, o = t.contextType;
  return typeof o == "object" && o !== null ? o = it(o) : (i = be(t) ? Rn : Oe.current, r = t.contextTypes, o = (r = r != null) ? Sr(e, i) : hn), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Cs, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function nf(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Cs.enqueueReplaceState(t, t.state, null);
}
function ia(e, t, n, r) {
  var i = e.stateNode;
  i.props = n, i.state = e.memoizedState, i.refs = om, lu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? i.context = it(o) : (o = be(t) ? Rn : Oe.current, i.context = Sr(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (ra(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Cs.enqueueReplaceState(i, i.state, null), ns(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Zr(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1)
          throw Error(C(309));
        var r = n.stateNode;
      }
      if (!r)
        throw Error(C(147, e));
      var i = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(s) {
        var l = i.refs;
        l === om && (l = i.refs = {}), s === null ? delete l[o] : l[o] = s;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string")
      throw Error(C(284));
    if (!n._owner)
      throw Error(C(290, e));
  }
  return e;
}
function ho(e, t) {
  throw e = Object.prototype.toString.call(t), Error(C(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function rf(e) {
  var t = e._init;
  return t(e._payload);
}
function lm(e) {
  function t(m, d) {
    if (e) {
      var y = m.deletions;
      y === null ? (m.deletions = [d], m.flags |= 16) : y.push(d);
    }
  }
  function n(m, d) {
    if (!e)
      return null;
    for (; d !== null; )
      t(m, d), d = d.sibling;
    return null;
  }
  function r(m, d) {
    for (m = /* @__PURE__ */ new Map(); d !== null; )
      d.key !== null ? m.set(d.key, d) : m.set(d.index, d), d = d.sibling;
    return m;
  }
  function i(m, d) {
    return m = fn(m, d), m.index = 0, m.sibling = null, m;
  }
  function o(m, d, y) {
    return m.index = y, e ? (y = m.alternate, y !== null ? (y = y.index, y < d ? (m.flags |= 2, d) : y) : (m.flags |= 2, d)) : (m.flags |= 1048576, d);
  }
  function s(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function l(m, d, y, w) {
    return d === null || d.tag !== 6 ? (d = vl(y, m.mode, w), d.return = m, d) : (d = i(d, y), d.return = m, d);
  }
  function a(m, d, y, w) {
    var S = y.type;
    return S === Kn ? c(m, d, y.props.children, w, y.key) : d !== null && (d.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Qt && rf(S) === d.type) ? (w = i(d, y.props), w.ref = Zr(m, d, y), w.return = m, w) : (w = Lo(y.type, y.key, y.props, null, m.mode, w), w.ref = Zr(m, d, y), w.return = m, w);
  }
  function u(m, d, y, w) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== y.containerInfo || d.stateNode.implementation !== y.implementation ? (d = wl(y, m.mode, w), d.return = m, d) : (d = i(d, y.children || []), d.return = m, d);
  }
  function c(m, d, y, w, S) {
    return d === null || d.tag !== 7 ? (d = zn(y, m.mode, w, S), d.return = m, d) : (d = i(d, y), d.return = m, d);
  }
  function f(m, d, y) {
    if (typeof d == "string" && d !== "" || typeof d == "number")
      return d = vl("" + d, m.mode, y), d.return = m, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case to:
          return y = Lo(d.type, d.key, d.props, null, m.mode, y), y.ref = Zr(m, null, d), y.return = m, y;
        case qn:
          return d = wl(d, m.mode, y), d.return = m, d;
        case Qt:
          var w = d._init;
          return f(m, w(d._payload), y);
      }
      if (ei(d) || Wr(d))
        return d = zn(d, m.mode, y, null), d.return = m, d;
      ho(m, d);
    }
    return null;
  }
  function p(m, d, y, w) {
    var S = d !== null ? d.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number")
      return S !== null ? null : l(m, d, "" + y, w);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case to:
          return y.key === S ? a(m, d, y, w) : null;
        case qn:
          return y.key === S ? u(m, d, y, w) : null;
        case Qt:
          return S = y._init, p(
            m,
            d,
            S(y._payload),
            w
          );
      }
      if (ei(y) || Wr(y))
        return S !== null ? null : c(m, d, y, w, null);
      ho(m, y);
    }
    return null;
  }
  function h(m, d, y, w, S) {
    if (typeof w == "string" && w !== "" || typeof w == "number")
      return m = m.get(y) || null, l(d, m, "" + w, S);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case to:
          return m = m.get(w.key === null ? y : w.key) || null, a(d, m, w, S);
        case qn:
          return m = m.get(w.key === null ? y : w.key) || null, u(d, m, w, S);
        case Qt:
          var E = w._init;
          return h(m, d, y, E(w._payload), S);
      }
      if (ei(w) || Wr(w))
        return m = m.get(y) || null, c(d, m, w, S, null);
      ho(d, w);
    }
    return null;
  }
  function g(m, d, y, w) {
    for (var S = null, E = null, N = d, T = d = 0, L = null; N !== null && T < y.length; T++) {
      N.index > T ? (L = N, N = null) : L = N.sibling;
      var $ = p(m, N, y[T], w);
      if ($ === null) {
        N === null && (N = L);
        break;
      }
      e && N && $.alternate === null && t(m, N), d = o($, d, T), E === null ? S = $ : E.sibling = $, E = $, N = L;
    }
    if (T === y.length)
      return n(m, N), ie && Tn(m, T), S;
    if (N === null) {
      for (; T < y.length; T++)
        N = f(m, y[T], w), N !== null && (d = o(N, d, T), E === null ? S = N : E.sibling = N, E = N);
      return ie && Tn(m, T), S;
    }
    for (N = r(m, N); T < y.length; T++)
      L = h(N, m, T, y[T], w), L !== null && (e && L.alternate !== null && N.delete(L.key === null ? T : L.key), d = o(L, d, T), E === null ? S = L : E.sibling = L, E = L);
    return e && N.forEach(function(H) {
      return t(m, H);
    }), ie && Tn(m, T), S;
  }
  function v(m, d, y, w) {
    var S = Wr(y);
    if (typeof S != "function")
      throw Error(C(150));
    if (y = S.call(y), y == null)
      throw Error(C(151));
    for (var E = S = null, N = d, T = d = 0, L = null, $ = y.next(); N !== null && !$.done; T++, $ = y.next()) {
      N.index > T ? (L = N, N = null) : L = N.sibling;
      var H = p(m, N, $.value, w);
      if (H === null) {
        N === null && (N = L);
        break;
      }
      e && N && H.alternate === null && t(m, N), d = o(H, d, T), E === null ? S = H : E.sibling = H, E = H, N = L;
    }
    if ($.done)
      return n(
        m,
        N
      ), ie && Tn(m, T), S;
    if (N === null) {
      for (; !$.done; T++, $ = y.next())
        $ = f(m, $.value, w), $ !== null && (d = o($, d, T), E === null ? S = $ : E.sibling = $, E = $);
      return ie && Tn(m, T), S;
    }
    for (N = r(m, N); !$.done; T++, $ = y.next())
      $ = h(N, m, T, $.value, w), $ !== null && (e && $.alternate !== null && N.delete($.key === null ? T : $.key), d = o($, d, T), E === null ? S = $ : E.sibling = $, E = $);
    return e && N.forEach(function(I) {
      return t(m, I);
    }), ie && Tn(m, T), S;
  }
  function k(m, d, y, w) {
    if (typeof y == "object" && y !== null && y.type === Kn && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case to:
          e: {
            for (var S = y.key, E = d; E !== null; ) {
              if (E.key === S) {
                if (S = y.type, S === Kn) {
                  if (E.tag === 7) {
                    n(m, E.sibling), d = i(E, y.props.children), d.return = m, m = d;
                    break e;
                  }
                } else if (E.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Qt && rf(S) === E.type) {
                  n(m, E.sibling), d = i(E, y.props), d.ref = Zr(m, E, y), d.return = m, m = d;
                  break e;
                }
                n(m, E);
                break;
              } else
                t(m, E);
              E = E.sibling;
            }
            y.type === Kn ? (d = zn(y.props.children, m.mode, w, y.key), d.return = m, m = d) : (w = Lo(y.type, y.key, y.props, null, m.mode, w), w.ref = Zr(m, d, y), w.return = m, m = w);
          }
          return s(m);
        case qn:
          e: {
            for (E = y.key; d !== null; ) {
              if (d.key === E)
                if (d.tag === 4 && d.stateNode.containerInfo === y.containerInfo && d.stateNode.implementation === y.implementation) {
                  n(m, d.sibling), d = i(d, y.children || []), d.return = m, m = d;
                  break e;
                } else {
                  n(m, d);
                  break;
                }
              else
                t(m, d);
              d = d.sibling;
            }
            d = wl(y, m.mode, w), d.return = m, m = d;
          }
          return s(m);
        case Qt:
          return E = y._init, k(m, d, E(y._payload), w);
      }
      if (ei(y))
        return g(m, d, y, w);
      if (Wr(y))
        return v(m, d, y, w);
      ho(m, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, d !== null && d.tag === 6 ? (n(m, d.sibling), d = i(d, y), d.return = m, m = d) : (n(m, d), d = vl(y, m.mode, w), d.return = m, m = d), s(m)) : n(m, d);
  }
  return k;
}
var xr = lm(!0), am = lm(!1), Hi = {}, Et = vn(Hi), Ci = vn(Hi), Ni = vn(Hi);
function Dn(e) {
  if (e === Hi)
    throw Error(C(174));
  return e;
}
function au(e, t) {
  switch (K(Ni, t), K(Ci, e), K(Et, Hi), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Rl(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Rl(t, e);
  }
  re(Et), K(Et, t);
}
function Er() {
  re(Et), re(Ci), re(Ni);
}
function um(e) {
  Dn(Ni.current);
  var t = Dn(Et.current), n = Rl(t, e.type);
  t !== n && (K(Ci, e), K(Et, n));
}
function uu(e) {
  Ci.current === e && (re(Et), re(Ci));
}
var se = vn(0);
function rs(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!"))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128)
        return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e)
      break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e)
        return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var dl = [];
function cu() {
  for (var e = 0; e < dl.length; e++)
    dl[e]._workInProgressVersionPrimary = null;
  dl.length = 0;
}
var Mo = Wt.ReactCurrentDispatcher, hl = Wt.ReactCurrentBatchConfig, An = 0, le = null, ye = null, ve = null, is = !1, ui = !1, _i = 0, Gv = 0;
function Ee() {
  throw Error(C(321));
}
function fu(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!vt(e[n], t[n]))
      return !1;
  return !0;
}
function du(e, t, n, r, i, o) {
  if (An = o, le = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Mo.current = e === null || e.memoizedState === null ? Jv : Xv, e = n(r, i), ui) {
    o = 0;
    do {
      if (ui = !1, _i = 0, 25 <= o)
        throw Error(C(301));
      o += 1, ve = ye = null, t.updateQueue = null, Mo.current = e1, e = n(r, i);
    } while (ui);
  }
  if (Mo.current = os, t = ye !== null && ye.next !== null, An = 0, ve = ye = le = null, is = !1, t)
    throw Error(C(300));
  return e;
}
function hu() {
  var e = _i !== 0;
  return _i = 0, e;
}
function St() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ve === null ? le.memoizedState = ve = e : ve = ve.next = e, ve;
}
function ot() {
  if (ye === null) {
    var e = le.alternate;
    e = e !== null ? e.memoizedState : null;
  } else
    e = ye.next;
  var t = ve === null ? le.memoizedState : ve.next;
  if (t !== null)
    ve = t, ye = e;
  else {
    if (e === null)
      throw Error(C(310));
    ye = e, e = { memoizedState: ye.memoizedState, baseState: ye.baseState, baseQueue: ye.baseQueue, queue: ye.queue, next: null }, ve === null ? le.memoizedState = ve = e : ve = ve.next = e;
  }
  return ve;
}
function Oi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ml(e) {
  var t = ot(), n = t.queue;
  if (n === null)
    throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = ye, i = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      i.next = o.next, o.next = s;
    }
    r.baseQueue = i = o, n.pending = null;
  }
  if (i !== null) {
    o = i.next, r = r.baseState;
    var l = s = null, a = null, u = o;
    do {
      var c = u.lane;
      if ((An & c) === c)
        a !== null && (a = a.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        a === null ? (l = a = f, s = r) : a = a.next = f, le.lanes |= c, bn |= c;
      }
      u = u.next;
    } while (u !== null && u !== o);
    a === null ? s = r : a.next = l, vt(r, t.memoizedState) || (Fe = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = a, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    i = e;
    do
      o = i.lane, le.lanes |= o, bn |= o, i = i.next;
    while (i !== e);
  } else
    i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function pl(e) {
  var t = ot(), n = t.queue;
  if (n === null)
    throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, i = n.pending, o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = i = i.next;
    do
      o = e(o, s.action), s = s.next;
    while (s !== i);
    vt(o, t.memoizedState) || (Fe = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function cm() {
}
function fm(e, t) {
  var n = le, r = ot(), i = t(), o = !vt(r.memoizedState, i);
  if (o && (r.memoizedState = i, Fe = !0), r = r.queue, mu(mm.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ve !== null && ve.memoizedState.tag & 1) {
    if (n.flags |= 2048, Mi(9, hm.bind(null, n, r, i, t), void 0, null), we === null)
      throw Error(C(349));
    An & 30 || dm(n, t, i);
  }
  return i;
}
function dm(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = le.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, le.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function hm(e, t, n, r) {
  t.value = n, t.getSnapshot = r, pm(t) && ym(e);
}
function mm(e, t, n) {
  return n(function() {
    pm(t) && ym(e);
  });
}
function pm(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !vt(e, n);
  } catch {
    return !0;
  }
}
function ym(e) {
  var t = Rt(e, 1);
  t !== null && yt(t, e, 1, -1);
}
function of(e) {
  var t = St();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Oi, lastRenderedState: e }, t.queue = e, e = e.dispatch = Kv.bind(null, le, e), [t.memoizedState, e];
}
function Mi(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = le.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, le.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function gm() {
  return ot().memoizedState;
}
function Do(e, t, n, r) {
  var i = St();
  le.flags |= e, i.memoizedState = Mi(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ns(e, t, n, r) {
  var i = ot();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ye !== null) {
    var s = ye.memoizedState;
    if (o = s.destroy, r !== null && fu(r, s.deps)) {
      i.memoizedState = Mi(t, n, o, r);
      return;
    }
  }
  le.flags |= e, i.memoizedState = Mi(1 | t, n, o, r);
}
function sf(e, t) {
  return Do(8390656, 8, e, t);
}
function mu(e, t) {
  return Ns(2048, 8, e, t);
}
function vm(e, t) {
  return Ns(4, 2, e, t);
}
function wm(e, t) {
  return Ns(4, 4, e, t);
}
function Sm(e, t) {
  if (typeof t == "function")
    return e = e(), t(e), function() {
      t(null);
    };
  if (t != null)
    return e = e(), t.current = e, function() {
      t.current = null;
    };
}
function km(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ns(4, 4, Sm.bind(null, t, e), n);
}
function pu() {
}
function xm(e, t) {
  var n = ot();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && fu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Em(e, t) {
  var n = ot();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && fu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Tm(e, t, n) {
  return An & 21 ? (vt(n, t) || (n = _h(), le.lanes |= n, bn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Fe = !0), e.memoizedState = n);
}
function Qv(e, t) {
  var n = G;
  G = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = hl.transition;
  hl.transition = {};
  try {
    e(!1), t();
  } finally {
    G = n, hl.transition = r;
  }
}
function Cm() {
  return ot().memoizedState;
}
function qv(e, t, n) {
  var r = cn(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Nm(e))
    _m(t, n);
  else if (n = rm(e, t, n, r), n !== null) {
    var i = De();
    yt(n, e, r, i), Om(n, t, r);
  }
}
function Kv(e, t, n) {
  var r = cn(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Nm(e))
    _m(t, i);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null))
      try {
        var s = t.lastRenderedState, l = o(s, n);
        if (i.hasEagerState = !0, i.eagerState = l, vt(l, s)) {
          var a = t.interleaved;
          a === null ? (i.next = i, su(t)) : (i.next = a.next, a.next = i), t.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
    n = rm(e, t, i, r), n !== null && (i = De(), yt(n, e, r, i), Om(n, t, r));
  }
}
function Nm(e) {
  var t = e.alternate;
  return e === le || t !== null && t === le;
}
function _m(e, t) {
  ui = is = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Om(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Za(e, n);
  }
}
var os = { readContext: it, useCallback: Ee, useContext: Ee, useEffect: Ee, useImperativeHandle: Ee, useInsertionEffect: Ee, useLayoutEffect: Ee, useMemo: Ee, useReducer: Ee, useRef: Ee, useState: Ee, useDebugValue: Ee, useDeferredValue: Ee, useTransition: Ee, useMutableSource: Ee, useSyncExternalStore: Ee, useId: Ee, unstable_isNewReconciler: !1 }, Jv = { readContext: it, useCallback: function(e, t) {
  return St().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: it, useEffect: sf, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Do(
    4194308,
    4,
    Sm.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Do(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Do(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = St();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = St();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = qv.bind(null, le, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = St();
  return e = { current: e }, t.memoizedState = e;
}, useState: of, useDebugValue: pu, useDeferredValue: function(e) {
  return St().memoizedState = e;
}, useTransition: function() {
  var e = of(!1), t = e[0];
  return e = Qv.bind(null, e[1]), St().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = le, i = St();
  if (ie) {
    if (n === void 0)
      throw Error(C(407));
    n = n();
  } else {
    if (n = t(), we === null)
      throw Error(C(349));
    An & 30 || dm(r, t, n);
  }
  i.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return i.queue = o, sf(mm.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Mi(9, hm.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = St(), t = we.identifierPrefix;
  if (ie) {
    var n = $t, r = Dt;
    n = (r & ~(1 << 32 - pt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = _i++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = Gv++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Xv = {
  readContext: it,
  useCallback: xm,
  useContext: it,
  useEffect: mu,
  useImperativeHandle: km,
  useInsertionEffect: vm,
  useLayoutEffect: wm,
  useMemo: Em,
  useReducer: ml,
  useRef: gm,
  useState: function() {
    return ml(Oi);
  },
  useDebugValue: pu,
  useDeferredValue: function(e) {
    var t = ot();
    return Tm(t, ye.memoizedState, e);
  },
  useTransition: function() {
    var e = ml(Oi)[0], t = ot().memoizedState;
    return [e, t];
  },
  useMutableSource: cm,
  useSyncExternalStore: fm,
  useId: Cm,
  unstable_isNewReconciler: !1
}, e1 = { readContext: it, useCallback: xm, useContext: it, useEffect: mu, useImperativeHandle: km, useInsertionEffect: vm, useLayoutEffect: wm, useMemo: Em, useReducer: pl, useRef: gm, useState: function() {
  return pl(Oi);
}, useDebugValue: pu, useDeferredValue: function(e) {
  var t = ot();
  return ye === null ? t.memoizedState = e : Tm(t, ye.memoizedState, e);
}, useTransition: function() {
  var e = pl(Oi)[0], t = ot().memoizedState;
  return [e, t];
}, useMutableSource: cm, useSyncExternalStore: fm, useId: Cm, unstable_isNewReconciler: !1 };
function Tr(e, t) {
  try {
    var n = "", r = t;
    do
      n += O0(r), r = r.return;
    while (r);
    var i = n;
  } catch (o) {
    i = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function yl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function oa(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var t1 = typeof WeakMap == "function" ? WeakMap : Map;
function Mm(e, t, n) {
  n = It(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ls || (ls = !0, pa = r), oa(e, t);
  }, n;
}
function Dm(e, t, n) {
  n = It(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    n.payload = function() {
      return r(i);
    }, n.callback = function() {
      oa(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    oa(e, t), typeof r != "function" && (un === null ? un = /* @__PURE__ */ new Set([this]) : un.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function lf(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new t1();
    var i = /* @__PURE__ */ new Set();
    r.set(t, i);
  } else
    i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
  i.has(n) || (i.add(n), e = p1.bind(null, e, t, n), t.then(e, e));
}
function af(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function uf(e, t, n, r, i) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = It(-1, 1), t.tag = 2, an(n, t, 1))), n.lanes |= 1), e);
}
var n1 = Wt.ReactCurrentOwner, Fe = !1;
function Me(e, t, n, r) {
  t.child = e === null ? am(t, null, n, r) : xr(t, e.child, n, r);
}
function cf(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return mr(t, i), r = du(e, t, n, r, o, i), n = hu(), e !== null && !Fe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Ft(e, t, i)) : (ie && n && eu(t), t.flags |= 1, Me(e, t, r, i), t.child);
}
function ff(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Eu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, $m(e, t, o, r, i)) : (e = Lo(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & i)) {
    var s = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : ki, n(s, r) && e.ref === t.ref)
      return Ft(e, t, i);
  }
  return t.flags |= 1, e = fn(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function $m(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (ki(o, r) && e.ref === t.ref)
      if (Fe = !1, t.pendingProps = r = o, (e.lanes & i) !== 0)
        e.flags & 131072 && (Fe = !0);
      else
        return t.lanes = e.lanes, Ft(e, t, i);
  }
  return sa(e, t, n, r, i);
}
function Pm(e, t, n) {
  var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, K(lr, We), We |= n;
    else {
      if (!(n & 1073741824))
        return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, K(lr, We), We |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, K(lr, We), We |= r;
    }
  else
    o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, K(lr, We), We |= r;
  return Me(e, t, i, n), t.child;
}
function Im(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function sa(e, t, n, r, i) {
  var o = be(n) ? Rn : Oe.current;
  return o = Sr(t, o), mr(t, i), n = du(e, t, n, r, o, i), r = hu(), e !== null && !Fe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Ft(e, t, i)) : (ie && r && eu(t), t.flags |= 1, Me(e, t, n, i), t.child);
}
function df(e, t, n, r, i) {
  if (be(n)) {
    var o = !0;
    Ko(t);
  } else
    o = !1;
  if (mr(t, i), t.stateNode === null)
    $o(e, t), sm(t, n, r), ia(t, n, r, i), r = !0;
  else if (e === null) {
    var s = t.stateNode, l = t.memoizedProps;
    s.props = l;
    var a = s.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = it(u) : (u = be(n) ? Rn : Oe.current, u = Sr(t, u));
    var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    f || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (l !== r || a !== u) && nf(t, s, r, u), qt = !1;
    var p = t.memoizedState;
    s.state = p, ns(t, r, s, i), a = t.memoizedState, l !== r || p !== a || Ae.current || qt ? (typeof c == "function" && (ra(t, n, c, r), a = t.memoizedState), (l = qt || tf(t, n, l, r, p, a, u)) ? (f || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), s.props = r, s.state = a, s.context = u, r = l) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, im(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : ft(t.type, l), s.props = u, f = t.pendingProps, p = s.context, a = n.contextType, typeof a == "object" && a !== null ? a = it(a) : (a = be(n) ? Rn : Oe.current, a = Sr(t, a));
    var h = n.getDerivedStateFromProps;
    (c = typeof h == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (l !== f || p !== a) && nf(t, s, r, a), qt = !1, p = t.memoizedState, s.state = p, ns(t, r, s, i);
    var g = t.memoizedState;
    l !== f || p !== g || Ae.current || qt ? (typeof h == "function" && (ra(t, n, h, r), g = t.memoizedState), (u = qt || tf(t, n, u, r, p, g, a) || !1) ? (c || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, g, a), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, g, a)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = g), s.props = r, s.state = g, s.context = a, r = u) : (typeof s.componentDidUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return la(e, t, n, r, o, i);
}
function la(e, t, n, r, i, o) {
  Im(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s)
    return i && qc(t, n, !1), Ft(e, t, o);
  r = t.stateNode, n1.current = t;
  var l = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = xr(t, e.child, null, o), t.child = xr(t, null, l, o)) : Me(e, t, l, o), t.memoizedState = r.state, i && qc(t, n, !0), t.child;
}
function Lm(e) {
  var t = e.stateNode;
  t.pendingContext ? Qc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Qc(e, t.context, !1), au(e, t.containerInfo);
}
function hf(e, t, n, r, i) {
  return kr(), nu(i), t.flags |= 256, Me(e, t, n, r), t.child;
}
var aa = { dehydrated: null, treeContext: null, retryLane: 0 };
function ua(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function zm(e, t, n) {
  var r = t.pendingProps, i = se.current, o = !1, s = (t.flags & 128) !== 0, l;
  if ((l = s) || (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), l ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), K(se, i & 1), e === null)
    return ta(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, s = { mode: "hidden", children: s }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = s) : o = Ms(s, r, 0, null), e = zn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = ua(n), t.memoizedState = aa, e) : yu(t, s));
  if (i = e.memoizedState, i !== null && (l = i.dehydrated, l !== null))
    return r1(e, t, s, r, l, i, n);
  if (o) {
    o = r.fallback, s = t.mode, i = e.child, l = i.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = fn(i, a), r.subtreeFlags = i.subtreeFlags & 14680064), l !== null ? o = fn(l, o) : (o = zn(o, s, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, s = e.child.memoizedState, s = s === null ? ua(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = aa, r;
  }
  return o = e.child, e = o.sibling, r = fn(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function yu(e, t) {
  return t = Ms({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function mo(e, t, n, r) {
  return r !== null && nu(r), xr(t, e.child, null, n), e = yu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function r1(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = yl(Error(C(422))), mo(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = Ms({ mode: "visible", children: r.children }, i, 0, null), o = zn(o, i, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && xr(t, e.child, null, s), t.child.memoizedState = ua(s), t.memoizedState = aa, o);
  if (!(t.mode & 1))
    return mo(e, t, s, null);
  if (i.data === "$!") {
    if (r = i.nextSibling && i.nextSibling.dataset, r)
      var l = r.dgst;
    return r = l, o = Error(C(419)), r = yl(o, r, void 0), mo(e, t, s, r);
  }
  if (l = (s & e.childLanes) !== 0, Fe || l) {
    if (r = we, r !== null) {
      switch (s & -s) {
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
      i = i & (r.suspendedLanes | s) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, Rt(e, i), yt(r, e, i, -1));
    }
    return xu(), r = yl(Error(C(421))), mo(e, t, s, r);
  }
  return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = y1.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, He = ln(i.nextSibling), Be = t, ie = !0, ht = null, e !== null && (Je[Xe++] = Dt, Je[Xe++] = $t, Je[Xe++] = Fn, Dt = e.id, $t = e.overflow, Fn = t), t = yu(t, r.children), t.flags |= 4096, t);
}
function mf(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), na(e.return, t, n);
}
function gl(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
}
function Rm(e, t, n) {
  var r = t.pendingProps, i = r.revealOrder, o = r.tail;
  if (Me(e, t, r.children, n), r = se.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && mf(e, n, t);
          else if (e.tag === 19)
            mf(e, n, t);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === t)
            break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t)
              break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
    r &= 1;
  }
  if (K(se, r), !(t.mode & 1))
    t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          e = n.alternate, e !== null && rs(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), gl(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && rs(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        gl(t, !0, n, null, o);
        break;
      case "together":
        gl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function $o(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ft(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), bn |= t.lanes, !(n & t.childLanes))
    return null;
  if (e !== null && t.child !== e.child)
    throw Error(C(153));
  if (t.child !== null) {
    for (e = t.child, n = fn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      e = e.sibling, n = n.sibling = fn(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function i1(e, t, n) {
  switch (t.tag) {
    case 3:
      Lm(t), kr();
      break;
    case 5:
      um(t);
      break;
    case 1:
      be(t.type) && Ko(t);
      break;
    case 4:
      au(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, i = t.memoizedProps.value;
      K(es, r._currentValue), r._currentValue = i;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (K(se, se.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? zm(e, t, n) : (K(se, se.current & 1), e = Ft(e, t, n), e !== null ? e.sibling : null);
      K(se, se.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r)
          return Rm(e, t, n);
        t.flags |= 128;
      }
      if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), K(se, se.current), r)
        break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Pm(e, t, n);
  }
  return Ft(e, t, n);
}
var Fm, ca, Am, bm;
Fm = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6)
      e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t)
      break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t)
        return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
ca = function() {
};
Am = function(e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    e = t.stateNode, Dn(Et.current);
    var o = null;
    switch (n) {
      case "input":
        i = Pl(e, i), r = Pl(e, r), o = [];
        break;
      case "select":
        i = ae({}, i, { value: void 0 }), r = ae({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        i = zl(e, i), r = zl(e, r), o = [];
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Qo);
    }
    Fl(n, r);
    var s;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var l = i[u];
          for (s in l)
            l.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
        } else
          u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (mi.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (l = i != null ? i[u] : void 0, r.hasOwnProperty(u) && a !== l && (a != null || l != null))
        if (u === "style")
          if (l) {
            for (s in l)
              !l.hasOwnProperty(s) || a && a.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
            for (s in a)
              a.hasOwnProperty(s) && l[s] !== a[s] && (n || (n = {}), n[s] = a[s]);
          } else
            n || (o || (o = []), o.push(
              u,
              n
            )), n = a;
        else
          u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, l = l ? l.__html : void 0, a != null && l !== a && (o = o || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (o = o || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (mi.hasOwnProperty(u) ? (a != null && u === "onScroll" && ne("scroll", e), o || l === a || (o = [])) : (o = o || []).push(u, a));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
bm = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Yr(e, t) {
  if (!ie)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
}
function Te(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
  else
    for (i = e.child; i !== null; )
      n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function o1(e, t, n) {
  var r = t.pendingProps;
  switch (tu(t), t.tag) {
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
      return Te(t), null;
    case 1:
      return be(t.type) && qo(), Te(t), null;
    case 3:
      return r = t.stateNode, Er(), re(Ae), re(Oe), cu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (fo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ht !== null && (va(ht), ht = null))), ca(e, t), Te(t), null;
    case 5:
      uu(t);
      var i = Dn(Ni.current);
      if (n = t.type, e !== null && t.stateNode != null)
        Am(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null)
            throw Error(C(166));
          return Te(t), null;
        }
        if (e = Dn(Et.current), fo(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[kt] = t, r[Ti] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              ne("cancel", r), ne("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              ne("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < ni.length; i++)
                ne(ni[i], r);
              break;
            case "source":
              ne("error", r);
              break;
            case "img":
            case "image":
            case "link":
              ne(
                "error",
                r
              ), ne("load", r);
              break;
            case "details":
              ne("toggle", r);
              break;
            case "input":
              xc(r, o), ne("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, ne("invalid", r);
              break;
            case "textarea":
              Tc(r, o), ne("invalid", r);
          }
          Fl(n, o), i = null;
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var l = o[s];
              s === "children" ? typeof l == "string" ? r.textContent !== l && (o.suppressHydrationWarning !== !0 && co(r.textContent, l, e), i = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (o.suppressHydrationWarning !== !0 && co(
                r.textContent,
                l,
                e
              ), i = ["children", "" + l]) : mi.hasOwnProperty(s) && l != null && s === "onScroll" && ne("scroll", r);
            }
          switch (n) {
            case "input":
              no(r), Ec(r, o, !0);
              break;
            case "textarea":
              no(r), Cc(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Qo);
          }
          r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = dh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[kt] = t, e[Ti] = r, Fm(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = Al(n, r), n) {
              case "dialog":
                ne("cancel", e), ne("close", e), i = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                ne("load", e), i = r;
                break;
              case "video":
              case "audio":
                for (i = 0; i < ni.length; i++)
                  ne(ni[i], e);
                i = r;
                break;
              case "source":
                ne("error", e), i = r;
                break;
              case "img":
              case "image":
              case "link":
                ne(
                  "error",
                  e
                ), ne("load", e), i = r;
                break;
              case "details":
                ne("toggle", e), i = r;
                break;
              case "input":
                xc(e, r), i = Pl(e, r), ne("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, i = ae({}, r, { value: void 0 }), ne("invalid", e);
                break;
              case "textarea":
                Tc(e, r), i = zl(e, r), ne("invalid", e);
                break;
              default:
                i = r;
            }
            Fl(n, i), l = i;
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var a = l[o];
                o === "style" ? ph(e, a) : o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && hh(e, a)) : o === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && pi(e, a) : typeof a == "number" && pi(e, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (mi.hasOwnProperty(o) ? a != null && o === "onScroll" && ne("scroll", e) : a != null && Va(e, o, a, s));
              }
            switch (n) {
              case "input":
                no(e), Ec(e, r, !1);
                break;
              case "textarea":
                no(e), Cc(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + dn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? cr(e, !!r.multiple, o, !1) : r.defaultValue != null && cr(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Qo);
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
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return Te(t), null;
    case 6:
      if (e && t.stateNode != null)
        bm(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(C(166));
        if (n = Dn(Ni.current), Dn(Et.current), fo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[kt] = t, (o = r.nodeValue !== n) && (e = Be, e !== null))
            switch (e.tag) {
              case 3:
                co(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && co(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[kt] = t, t.stateNode = r;
      }
      return Te(t), null;
    case 13:
      if (re(se), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (ie && He !== null && t.mode & 1 && !(t.flags & 128))
          nm(), kr(), t.flags |= 98560, o = !1;
        else if (o = fo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o)
              throw Error(C(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
              throw Error(C(317));
            o[kt] = t;
          } else
            kr(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Te(t), o = !1;
        } else
          ht !== null && (va(ht), ht = null), o = !0;
        if (!o)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || se.current & 1 ? ge === 0 && (ge = 3) : xu())), t.updateQueue !== null && (t.flags |= 4), Te(t), null);
    case 4:
      return Er(), ca(e, t), e === null && xi(t.stateNode.containerInfo), Te(t), null;
    case 10:
      return ou(t.type._context), Te(t), null;
    case 17:
      return be(t.type) && qo(), Te(t), null;
    case 19:
      if (re(se), o = t.memoizedState, o === null)
        return Te(t), null;
      if (r = (t.flags & 128) !== 0, s = o.rendering, s === null)
        if (r)
          Yr(o, !1);
        else {
          if (ge !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (s = rs(e), s !== null) {
                for (t.flags |= 128, Yr(o, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  o = n, e = r, o.flags &= 14680066, s = o.alternate, s === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, o.child = s.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return K(se, se.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null && de() > Cr && (t.flags |= 128, r = !0, Yr(o, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = rs(s), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Yr(o, !0), o.tail === null && o.tailMode === "hidden" && !s.alternate && !ie)
              return Te(t), null;
          } else
            2 * de() - o.renderingStartTime > Cr && n !== 1073741824 && (t.flags |= 128, r = !0, Yr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (s.sibling = t.child, t.child = s) : (n = o.last, n !== null ? n.sibling = s : t.child = s, o.last = s);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = de(), t.sibling = null, n = se.current, K(se, r ? n & 1 | 2 : n & 1), t) : (Te(t), null);
    case 22:
    case 23:
      return ku(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? We & 1073741824 && (Te(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Te(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(C(156, t.tag));
}
function s1(e, t) {
  switch (tu(t), t.tag) {
    case 1:
      return be(t.type) && qo(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Er(), re(Ae), re(Oe), cu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return uu(t), null;
    case 13:
      if (re(se), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(C(340));
        kr();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return re(se), null;
    case 4:
      return Er(), null;
    case 10:
      return ou(t.type._context), null;
    case 22:
    case 23:
      return ku(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var po = !1, Ce = !1, l1 = typeof WeakSet == "function" ? WeakSet : Set, D = null;
function sr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ce(e, t, r);
      }
    else
      n.current = null;
}
function fa(e, t, n) {
  try {
    n();
  } catch (r) {
    ce(e, t, r);
  }
}
var pf = !1;
function a1(e, t) {
  if (Gl = Zo, e = Hh(), Xa(e)) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
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
          var s = 0, l = -1, a = -1, u = 0, c = 0, f = e, p = null;
          t:
            for (; ; ) {
              for (var h; f !== n || i !== 0 && f.nodeType !== 3 || (l = s + i), f !== o || r !== 0 && f.nodeType !== 3 || (a = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (h = f.firstChild) !== null; )
                p = f, f = h;
              for (; ; ) {
                if (f === e)
                  break t;
                if (p === n && ++u === i && (l = s), p === o && ++c === r && (a = s), (h = f.nextSibling) !== null)
                  break;
                f = p, p = f.parentNode;
              }
              f = h;
            }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else
          n = null;
      }
    n = n || { start: 0, end: 0 };
  } else
    n = null;
  for (Ql = { focusedElem: e, selectionRange: n }, Zo = !1, D = t; D !== null; )
    if (t = D, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
      e.return = t, D = e;
    else
      for (; D !== null; ) {
        t = D;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var v = g.memoizedProps, k = g.memoizedState, m = t.stateNode, d = m.getSnapshotBeforeUpdate(t.elementType === t.type ? v : ft(t.type, v), k);
                  m.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var y = t.stateNode.containerInfo;
                y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(C(163));
            }
        } catch (w) {
          ce(t, t.return, w);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, D = e;
          break;
        }
        D = t.return;
      }
  return g = pf, pf = !1, g;
}
function ci(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var i = r = r.next;
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        i.destroy = void 0, o !== void 0 && fa(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function _s(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function da(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function Vm(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Vm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[kt], delete t[Ti], delete t[Jl], delete t[jv], delete t[Bv])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Wm(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function yf(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Wm(e.return))
          return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2))
        return e.stateNode;
    }
}
function ha(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Qo));
  else if (r !== 4 && (e = e.child, e !== null))
    for (ha(e, t, n), e = e.sibling; e !== null; )
      ha(e, t, n), e = e.sibling;
}
function ma(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (ma(e, t, n), e = e.sibling; e !== null; )
      ma(e, t, n), e = e.sibling;
}
var Se = null, dt = !1;
function Zt(e, t, n) {
  for (n = n.child; n !== null; )
    Um(e, t, n), n = n.sibling;
}
function Um(e, t, n) {
  if (xt && typeof xt.onCommitFiberUnmount == "function")
    try {
      xt.onCommitFiberUnmount(ws, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      Ce || sr(n, t);
    case 6:
      var r = Se, i = dt;
      Se = null, Zt(e, t, n), Se = r, dt = i, Se !== null && (dt ? (e = Se, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Se.removeChild(n.stateNode));
      break;
    case 18:
      Se !== null && (dt ? (e = Se, n = n.stateNode, e.nodeType === 8 ? cl(e.parentNode, n) : e.nodeType === 1 && cl(e, n), wi(e)) : cl(Se, n.stateNode));
      break;
    case 4:
      r = Se, i = dt, Se = n.stateNode.containerInfo, dt = !0, Zt(e, t, n), Se = r, dt = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ce && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        i = r = r.next;
        do {
          var o = i, s = o.destroy;
          o = o.tag, s !== void 0 && (o & 2 || o & 4) && fa(n, t, s), i = i.next;
        } while (i !== r);
      }
      Zt(e, t, n);
      break;
    case 1:
      if (!Ce && (sr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (l) {
          ce(n, t, l);
        }
      Zt(e, t, n);
      break;
    case 21:
      Zt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Ce = (r = Ce) || n.memoizedState !== null, Zt(e, t, n), Ce = r) : Zt(e, t, n);
      break;
    default:
      Zt(e, t, n);
  }
}
function gf(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new l1()), t.forEach(function(r) {
      var i = g1.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(i, i));
    });
  }
}
function ut(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e, s = t, l = s;
        e:
          for (; l !== null; ) {
            switch (l.tag) {
              case 5:
                Se = l.stateNode, dt = !1;
                break e;
              case 3:
                Se = l.stateNode.containerInfo, dt = !0;
                break e;
              case 4:
                Se = l.stateNode.containerInfo, dt = !0;
                break e;
            }
            l = l.return;
          }
        if (Se === null)
          throw Error(C(160));
        Um(o, s, i), Se = null, dt = !1;
        var a = i.alternate;
        a !== null && (a.return = null), i.return = null;
      } catch (u) {
        ce(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      Hm(t, e), t = t.sibling;
}
function Hm(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ut(t, e), wt(e), r & 4) {
        try {
          ci(3, e, e.return), _s(3, e);
        } catch (v) {
          ce(e, e.return, v);
        }
        try {
          ci(5, e, e.return);
        } catch (v) {
          ce(e, e.return, v);
        }
      }
      break;
    case 1:
      ut(t, e), wt(e), r & 512 && n !== null && sr(n, n.return);
      break;
    case 5:
      if (ut(t, e), wt(e), r & 512 && n !== null && sr(n, n.return), e.flags & 32) {
        var i = e.stateNode;
        try {
          pi(i, "");
        } catch (v) {
          ce(e, e.return, v);
        }
      }
      if (r & 4 && (i = e.stateNode, i != null)) {
        var o = e.memoizedProps, s = n !== null ? n.memoizedProps : o, l = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null)
          try {
            l === "input" && o.type === "radio" && o.name != null && ch(i, o), Al(l, s);
            var u = Al(l, o);
            for (s = 0; s < a.length; s += 2) {
              var c = a[s], f = a[s + 1];
              c === "style" ? ph(i, f) : c === "dangerouslySetInnerHTML" ? hh(i, f) : c === "children" ? pi(i, f) : Va(i, c, f, u);
            }
            switch (l) {
              case "input":
                Il(i, o);
                break;
              case "textarea":
                fh(i, o);
                break;
              case "select":
                var p = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var h = o.value;
                h != null ? cr(i, !!o.multiple, h, !1) : p !== !!o.multiple && (o.defaultValue != null ? cr(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : cr(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Ti] = o;
          } catch (v) {
            ce(e, e.return, v);
          }
      }
      break;
    case 6:
      if (ut(t, e), wt(e), r & 4) {
        if (e.stateNode === null)
          throw Error(C(162));
        i = e.stateNode, o = e.memoizedProps;
        try {
          i.nodeValue = o;
        } catch (v) {
          ce(e, e.return, v);
        }
      }
      break;
    case 3:
      if (ut(t, e), wt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          wi(t.containerInfo);
        } catch (v) {
          ce(e, e.return, v);
        }
      break;
    case 4:
      ut(t, e), wt(e);
      break;
    case 13:
      ut(t, e), wt(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (wu = de())), r & 4 && gf(e);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ce = (u = Ce) || c, ut(t, e), Ce = u) : ut(t, e), wt(e), r & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1)
          for (D = e, c = e.child; c !== null; ) {
            for (f = D = c; D !== null; ) {
              switch (p = D, h = p.child, p.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ci(4, p, p.return);
                  break;
                case 1:
                  sr(p, p.return);
                  var g = p.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    r = p, n = p.return;
                    try {
                      t = r, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                    } catch (v) {
                      ce(r, n, v);
                    }
                  }
                  break;
                case 5:
                  sr(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    wf(f);
                    continue;
                  }
              }
              h !== null ? (h.return = p, D = h) : wf(f);
            }
            c = c.sibling;
          }
        e:
          for (c = null, f = e; ; ) {
            if (f.tag === 5) {
              if (c === null) {
                c = f;
                try {
                  i = f.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (l = f.stateNode, a = f.memoizedProps.style, s = a != null && a.hasOwnProperty("display") ? a.display : null, l.style.display = mh("display", s));
                } catch (v) {
                  ce(e, e.return, v);
                }
              }
            } else if (f.tag === 6) {
              if (c === null)
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (v) {
                  ce(e, e.return, v);
                }
            } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
              f.child.return = f, f = f.child;
              continue;
            }
            if (f === e)
              break e;
            for (; f.sibling === null; ) {
              if (f.return === null || f.return === e)
                break e;
              c === f && (c = null), f = f.return;
            }
            c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
          }
      }
      break;
    case 19:
      ut(t, e), wt(e), r & 4 && gf(e);
      break;
    case 21:
      break;
    default:
      ut(
        t,
        e
      ), wt(e);
  }
}
function wt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Wm(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(C(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (pi(i, ""), r.flags &= -33);
          var o = yf(e);
          ma(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, l = yf(e);
          ha(e, l, s);
          break;
        default:
          throw Error(C(161));
      }
    } catch (a) {
      ce(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function u1(e, t, n) {
  D = e, jm(e);
}
function jm(e, t, n) {
  for (var r = (e.mode & 1) !== 0; D !== null; ) {
    var i = D, o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || po;
      if (!s) {
        var l = i.alternate, a = l !== null && l.memoizedState !== null || Ce;
        l = po;
        var u = Ce;
        if (po = s, (Ce = a) && !u)
          for (D = i; D !== null; )
            s = D, a = s.child, s.tag === 22 && s.memoizedState !== null ? Sf(i) : a !== null ? (a.return = s, D = a) : Sf(i);
        for (; o !== null; )
          D = o, jm(o), o = o.sibling;
        D = i, po = l, Ce = u;
      }
      vf(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? (o.return = i, D = o) : vf(e);
  }
}
function vf(e) {
  for (; D !== null; ) {
    var t = D;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ce || _s(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ce)
                if (n === null)
                  r.componentDidMount();
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : ft(t.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && ef(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (n = null, t.child !== null)
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                ef(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
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
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && wi(f);
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
              throw Error(C(163));
          }
        Ce || t.flags & 512 && da(t);
      } catch (p) {
        ce(t, t.return, p);
      }
    }
    if (t === e) {
      D = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, D = n;
      break;
    }
    D = t.return;
  }
}
function wf(e) {
  for (; D !== null; ) {
    var t = D;
    if (t === e) {
      D = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, D = n;
      break;
    }
    D = t.return;
  }
}
function Sf(e) {
  for (; D !== null; ) {
    var t = D;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            _s(4, t);
          } catch (a) {
            ce(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ce(t, i, a);
            }
          }
          var o = t.return;
          try {
            da(t);
          } catch (a) {
            ce(t, o, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            da(t);
          } catch (a) {
            ce(t, s, a);
          }
      }
    } catch (a) {
      ce(t, t.return, a);
    }
    if (t === e) {
      D = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      l.return = t.return, D = l;
      break;
    }
    D = t.return;
  }
}
var c1 = Math.ceil, ss = Wt.ReactCurrentDispatcher, gu = Wt.ReactCurrentOwner, rt = Wt.ReactCurrentBatchConfig, j = 0, we = null, pe = null, ke = 0, We = 0, lr = vn(0), ge = 0, Di = null, bn = 0, Os = 0, vu = 0, fi = null, Re = null, wu = 0, Cr = 1 / 0, _t = null, ls = !1, pa = null, un = null, yo = !1, tn = null, as = 0, di = 0, ya = null, Po = -1, Io = 0;
function De() {
  return j & 6 ? de() : Po !== -1 ? Po : Po = de();
}
function cn(e) {
  return e.mode & 1 ? j & 2 && ke !== 0 ? ke & -ke : Yv.transition !== null ? (Io === 0 && (Io = _h()), Io) : (e = G, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Lh(e.type)), e) : 1;
}
function yt(e, t, n, r) {
  if (50 < di)
    throw di = 0, ya = null, Error(C(185));
  Vi(e, n, r), (!(j & 2) || e !== we) && (e === we && (!(j & 2) && (Os |= n), ge === 4 && Xt(e, ke)), Ve(e, r), n === 1 && j === 0 && !(t.mode & 1) && (Cr = de() + 500, Ts && wn()));
}
function Ve(e, t) {
  var n = e.callbackNode;
  Y0(e, t);
  var r = Bo(e, e === we ? ke : 0);
  if (r === 0)
    n !== null && Oc(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Oc(n), t === 1)
      e.tag === 0 ? Zv(kf.bind(null, e)) : Xh(kf.bind(null, e)), Uv(function() {
        !(j & 6) && wn();
      }), n = null;
    else {
      switch (Oh(r)) {
        case 1:
          n = Ba;
          break;
        case 4:
          n = Ch;
          break;
        case 16:
          n = jo;
          break;
        case 536870912:
          n = Nh;
          break;
        default:
          n = jo;
      }
      n = Jm(n, Bm.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Bm(e, t) {
  if (Po = -1, Io = 0, j & 6)
    throw Error(C(327));
  var n = e.callbackNode;
  if (pr() && e.callbackNode !== n)
    return null;
  var r = Bo(e, e === we ? ke : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = us(e, r);
  else {
    t = r;
    var i = j;
    j |= 2;
    var o = Ym();
    (we !== e || ke !== t) && (_t = null, Cr = de() + 500, Ln(e, t));
    do
      try {
        h1();
        break;
      } catch (l) {
        Zm(e, l);
      }
    while (1);
    iu(), ss.current = o, j = i, pe !== null ? t = 0 : (we = null, ke = 0, t = ge);
  }
  if (t !== 0) {
    if (t === 2 && (i = Hl(e), i !== 0 && (r = i, t = ga(e, i))), t === 1)
      throw n = Di, Ln(e, 0), Xt(e, r), Ve(e, de()), n;
    if (t === 6)
      Xt(e, r);
    else {
      if (i = e.current.alternate, !(r & 30) && !f1(i) && (t = us(e, r), t === 2 && (o = Hl(e), o !== 0 && (r = o, t = ga(e, o))), t === 1))
        throw n = Di, Ln(e, 0), Xt(e, r), Ve(e, de()), n;
      switch (e.finishedWork = i, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(C(345));
        case 2:
          Cn(e, Re, _t);
          break;
        case 3:
          if (Xt(e, r), (r & 130023424) === r && (t = wu + 500 - de(), 10 < t)) {
            if (Bo(e, 0) !== 0)
              break;
            if (i = e.suspendedLanes, (i & r) !== r) {
              De(), e.pingedLanes |= e.suspendedLanes & i;
              break;
            }
            e.timeoutHandle = Kl(Cn.bind(null, e, Re, _t), t);
            break;
          }
          Cn(e, Re, _t);
          break;
        case 4:
          if (Xt(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - pt(r);
            o = 1 << s, s = t[s], s > i && (i = s), r &= ~o;
          }
          if (r = i, r = de() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * c1(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Kl(Cn.bind(null, e, Re, _t), r);
            break;
          }
          Cn(e, Re, _t);
          break;
        case 5:
          Cn(e, Re, _t);
          break;
        default:
          throw Error(C(329));
      }
    }
  }
  return Ve(e, de()), e.callbackNode === n ? Bm.bind(null, e) : null;
}
function ga(e, t) {
  var n = fi;
  return e.current.memoizedState.isDehydrated && (Ln(e, t).flags |= 256), e = us(e, t), e !== 2 && (t = Re, Re = n, t !== null && va(t)), e;
}
function va(e) {
  Re === null ? Re = e : Re.push.apply(Re, e);
}
function f1(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r], o = i.getSnapshot;
          i = i.value;
          try {
            if (!vt(o(), i))
              return !1;
          } catch {
            return !1;
          }
        }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null)
      n.return = t, t = n;
    else {
      if (t === e)
        break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Xt(e, t) {
  for (t &= ~vu, t &= ~Os, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - pt(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function kf(e) {
  if (j & 6)
    throw Error(C(327));
  pr();
  var t = Bo(e, 0);
  if (!(t & 1))
    return Ve(e, de()), null;
  var n = us(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Hl(e);
    r !== 0 && (t = r, n = ga(e, r));
  }
  if (n === 1)
    throw n = Di, Ln(e, 0), Xt(e, t), Ve(e, de()), n;
  if (n === 6)
    throw Error(C(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Cn(e, Re, _t), Ve(e, de()), null;
}
function Su(e, t) {
  var n = j;
  j |= 1;
  try {
    return e(t);
  } finally {
    j = n, j === 0 && (Cr = de() + 500, Ts && wn());
  }
}
function Vn(e) {
  tn !== null && tn.tag === 0 && !(j & 6) && pr();
  var t = j;
  j |= 1;
  var n = rt.transition, r = G;
  try {
    if (rt.transition = null, G = 1, e)
      return e();
  } finally {
    G = r, rt.transition = n, j = t, !(j & 6) && wn();
  }
}
function ku() {
  We = lr.current, re(lr);
}
function Ln(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Wv(n)), pe !== null)
    for (n = pe.return; n !== null; ) {
      var r = n;
      switch (tu(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && qo();
          break;
        case 3:
          Er(), re(Ae), re(Oe), cu();
          break;
        case 5:
          uu(r);
          break;
        case 4:
          Er();
          break;
        case 13:
          re(se);
          break;
        case 19:
          re(se);
          break;
        case 10:
          ou(r.type._context);
          break;
        case 22:
        case 23:
          ku();
      }
      n = n.return;
    }
  if (we = e, pe = e = fn(e.current, null), ke = We = t, ge = 0, Di = null, vu = Os = bn = 0, Re = fi = null, Mn !== null) {
    for (t = 0; t < Mn.length; t++)
      if (n = Mn[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, o = n.pending;
        if (o !== null) {
          var s = o.next;
          o.next = i, r.next = s;
        }
        n.pending = r;
      }
    Mn = null;
  }
  return e;
}
function Zm(e, t) {
  do {
    var n = pe;
    try {
      if (iu(), Mo.current = os, is) {
        for (var r = le.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), r = r.next;
        }
        is = !1;
      }
      if (An = 0, ve = ye = le = null, ui = !1, _i = 0, gu.current = null, n === null || n.return === null) {
        ge = 1, Di = t, pe = null;
        break;
      }
      e: {
        var o = e, s = n.return, l = n, a = t;
        if (t = ke, l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var u = a, c = l, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = c.alternate;
            p ? (c.updateQueue = p.updateQueue, c.memoizedState = p.memoizedState, c.lanes = p.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var h = af(s);
          if (h !== null) {
            h.flags &= -257, uf(h, s, l, o, t), h.mode & 1 && lf(o, u, t), t = h, a = u;
            var g = t.updateQueue;
            if (g === null) {
              var v = /* @__PURE__ */ new Set();
              v.add(a), t.updateQueue = v;
            } else
              g.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              lf(o, u, t), xu();
              break e;
            }
            a = Error(C(426));
          }
        } else if (ie && l.mode & 1) {
          var k = af(s);
          if (k !== null) {
            !(k.flags & 65536) && (k.flags |= 256), uf(k, s, l, o, t), nu(Tr(a, l));
            break e;
          }
        }
        o = a = Tr(a, l), ge !== 4 && (ge = 2), fi === null ? fi = [o] : fi.push(o), o = s;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var m = Mm(o, a, t);
              Xc(o, m);
              break e;
            case 1:
              l = a;
              var d = o.type, y = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (un === null || !un.has(y)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var w = Dm(o, l, t);
                Xc(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Qm(n);
    } catch (S) {
      t = S, pe === n && n !== null && (pe = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function Ym() {
  var e = ss.current;
  return ss.current = os, e === null ? os : e;
}
function xu() {
  (ge === 0 || ge === 3 || ge === 2) && (ge = 4), we === null || !(bn & 268435455) && !(Os & 268435455) || Xt(we, ke);
}
function us(e, t) {
  var n = j;
  j |= 2;
  var r = Ym();
  (we !== e || ke !== t) && (_t = null, Ln(e, t));
  do
    try {
      d1();
      break;
    } catch (i) {
      Zm(e, i);
    }
  while (1);
  if (iu(), j = n, ss.current = r, pe !== null)
    throw Error(C(261));
  return we = null, ke = 0, ge;
}
function d1() {
  for (; pe !== null; )
    Gm(pe);
}
function h1() {
  for (; pe !== null && !A0(); )
    Gm(pe);
}
function Gm(e) {
  var t = Km(e.alternate, e, We);
  e.memoizedProps = e.pendingProps, t === null ? Qm(e) : pe = t, gu.current = null;
}
function Qm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = s1(n, t), n !== null) {
        n.flags &= 32767, pe = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ge = 6, pe = null;
        return;
      }
    } else if (n = o1(n, t, We), n !== null) {
      pe = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      pe = t;
      return;
    }
    pe = t = e;
  } while (t !== null);
  ge === 0 && (ge = 5);
}
function Cn(e, t, n) {
  var r = G, i = rt.transition;
  try {
    rt.transition = null, G = 1, m1(e, t, n, r);
  } finally {
    rt.transition = i, G = r;
  }
  return null;
}
function m1(e, t, n, r) {
  do
    pr();
  while (tn !== null);
  if (j & 6)
    throw Error(C(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
    throw Error(C(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (G0(e, o), e === we && (pe = we = null, ke = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || yo || (yo = !0, Jm(jo, function() {
    return pr(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = rt.transition, rt.transition = null;
    var s = G;
    G = 1;
    var l = j;
    j |= 4, gu.current = null, a1(e, n), Hm(n, e), Lv(Ql), Zo = !!Gl, Ql = Gl = null, e.current = n, u1(n), b0(), j = l, G = s, rt.transition = o;
  } else
    e.current = n;
  if (yo && (yo = !1, tn = e, as = i), o = e.pendingLanes, o === 0 && (un = null), U0(n.stateNode), Ve(e, de()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
  if (ls)
    throw ls = !1, e = pa, pa = null, e;
  return as & 1 && e.tag !== 0 && pr(), o = e.pendingLanes, o & 1 ? e === ya ? di++ : (di = 0, ya = e) : di = 0, wn(), null;
}
function pr() {
  if (tn !== null) {
    var e = Oh(as), t = rt.transition, n = G;
    try {
      if (rt.transition = null, G = 16 > e ? 16 : e, tn === null)
        var r = !1;
      else {
        if (e = tn, tn = null, as = 0, j & 6)
          throw Error(C(331));
        var i = j;
        for (j |= 4, D = e.current; D !== null; ) {
          var o = D, s = o.child;
          if (D.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (D = u; D !== null; ) {
                  var c = D;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ci(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null)
                    f.return = c, D = f;
                  else
                    for (; D !== null; ) {
                      c = D;
                      var p = c.sibling, h = c.return;
                      if (Vm(c), c === u) {
                        D = null;
                        break;
                      }
                      if (p !== null) {
                        p.return = h, D = p;
                        break;
                      }
                      D = h;
                    }
                }
              }
              var g = o.alternate;
              if (g !== null) {
                var v = g.child;
                if (v !== null) {
                  g.child = null;
                  do {
                    var k = v.sibling;
                    v.sibling = null, v = k;
                  } while (v !== null);
                }
              }
              D = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null)
            s.return = o, D = s;
          else
            e:
              for (; D !== null; ) {
                if (o = D, o.flags & 2048)
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ci(9, o, o.return);
                  }
                var m = o.sibling;
                if (m !== null) {
                  m.return = o.return, D = m;
                  break e;
                }
                D = o.return;
              }
        }
        var d = e.current;
        for (D = d; D !== null; ) {
          s = D;
          var y = s.child;
          if (s.subtreeFlags & 2064 && y !== null)
            y.return = s, D = y;
          else
            e:
              for (s = d; D !== null; ) {
                if (l = D, l.flags & 2048)
                  try {
                    switch (l.tag) {
                      case 0:
                      case 11:
                      case 15:
                        _s(9, l);
                    }
                  } catch (S) {
                    ce(l, l.return, S);
                  }
                if (l === s) {
                  D = null;
                  break e;
                }
                var w = l.sibling;
                if (w !== null) {
                  w.return = l.return, D = w;
                  break e;
                }
                D = l.return;
              }
        }
        if (j = i, wn(), xt && typeof xt.onPostCommitFiberRoot == "function")
          try {
            xt.onPostCommitFiberRoot(ws, e);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      G = n, rt.transition = t;
    }
  }
  return !1;
}
function xf(e, t, n) {
  t = Tr(n, t), t = Mm(e, t, 1), e = an(e, t, 1), t = De(), e !== null && (Vi(e, 1, t), Ve(e, t));
}
function ce(e, t, n) {
  if (e.tag === 3)
    xf(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        xf(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (un === null || !un.has(r))) {
          e = Tr(n, e), e = Dm(t, e, 1), t = an(t, e, 1), e = De(), t !== null && (Vi(t, 1, e), Ve(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function p1(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = De(), e.pingedLanes |= e.suspendedLanes & n, we === e && (ke & n) === n && (ge === 4 || ge === 3 && (ke & 130023424) === ke && 500 > de() - wu ? Ln(e, 0) : vu |= n), Ve(e, t);
}
function qm(e, t) {
  t === 0 && (e.mode & 1 ? (t = oo, oo <<= 1, !(oo & 130023424) && (oo = 4194304)) : t = 1);
  var n = De();
  e = Rt(e, t), e !== null && (Vi(e, t, n), Ve(e, n));
}
function y1(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), qm(e, n);
}
function g1(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(C(314));
  }
  r !== null && r.delete(t), qm(e, n);
}
var Km;
Km = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ae.current)
      Fe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return Fe = !1, i1(e, t, n);
      Fe = !!(e.flags & 131072);
    }
  else
    Fe = !1, ie && t.flags & 1048576 && em(t, Xo, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      $o(e, t), e = t.pendingProps;
      var i = Sr(t, Oe.current);
      mr(t, n), i = du(null, t, r, e, i, n);
      var o = hu();
      return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, be(r) ? (o = !0, Ko(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, lu(t), i.updater = Cs, t.stateNode = i, i._reactInternals = t, ia(t, r, e, n), t = la(null, t, r, !0, o, n)) : (t.tag = 0, ie && o && eu(t), Me(null, t, i, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch ($o(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = w1(r), e = ft(r, e), i) {
          case 0:
            t = sa(null, t, r, e, n);
            break e;
          case 1:
            t = df(null, t, r, e, n);
            break e;
          case 11:
            t = cf(null, t, r, e, n);
            break e;
          case 14:
            t = ff(null, t, r, ft(r.type, e), n);
            break e;
        }
        throw Error(C(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ft(r, i), sa(e, t, r, i, n);
    case 1:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ft(r, i), df(e, t, r, i, n);
    case 3:
      e: {
        if (Lm(t), e === null)
          throw Error(C(387));
        r = t.pendingProps, o = t.memoizedState, i = o.element, im(e, t), ns(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, o.isDehydrated)
          if (o = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            i = Tr(Error(C(423)), t), t = hf(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = Tr(Error(C(424)), t), t = hf(e, t, r, n, i);
            break e;
          } else
            for (He = ln(t.stateNode.containerInfo.firstChild), Be = t, ie = !0, ht = null, n = am(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (kr(), r === i) {
            t = Ft(e, t, n);
            break e;
          }
          Me(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return um(t), e === null && ta(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, s = i.children, ql(r, i) ? s = null : o !== null && ql(r, o) && (t.flags |= 32), Im(e, t), Me(e, t, s, n), t.child;
    case 6:
      return e === null && ta(t), null;
    case 13:
      return zm(e, t, n);
    case 4:
      return au(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = xr(t, null, r, n) : Me(e, t, r, n), t.child;
    case 11:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ft(r, i), cf(e, t, r, i, n);
    case 7:
      return Me(e, t, t.pendingProps, n), t.child;
    case 8:
      return Me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, s = i.value, K(es, r._currentValue), r._currentValue = s, o !== null)
          if (vt(o.value, s)) {
            if (o.children === i.children && !Ae.current) {
              t = Ft(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var l = o.dependencies;
              if (l !== null) {
                s = o.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      a = It(-1, n & -n), a.tag = 2;
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null ? a.next = a : (a.next = c.next, c.next = a), u.pending = a;
                      }
                    }
                    o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), na(
                      o.return,
                      n,
                      t
                    ), l.lanes |= n;
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10)
                s = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (s = o.return, s === null)
                  throw Error(C(341));
                s.lanes |= n, l = s.alternate, l !== null && (l.lanes |= n), na(s, n, t), s = o.sibling;
              } else
                s = o.child;
              if (s !== null)
                s.return = o;
              else
                for (s = o; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (o = s.sibling, o !== null) {
                    o.return = s.return, s = o;
                    break;
                  }
                  s = s.return;
                }
              o = s;
            }
        Me(e, t, i.children, n), t = t.child;
      }
      return t;
    case 9:
      return i = t.type, r = t.pendingProps.children, mr(t, n), i = it(i), r = r(i), t.flags |= 1, Me(e, t, r, n), t.child;
    case 14:
      return r = t.type, i = ft(r, t.pendingProps), i = ft(r.type, i), ff(e, t, r, i, n);
    case 15:
      return $m(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ft(r, i), $o(e, t), t.tag = 1, be(r) ? (e = !0, Ko(t)) : e = !1, mr(t, n), sm(t, r, i), ia(t, r, i, n), la(null, t, r, !0, e, n);
    case 19:
      return Rm(e, t, n);
    case 22:
      return Pm(e, t, n);
  }
  throw Error(C(156, t.tag));
};
function Jm(e, t) {
  return Th(e, t);
}
function v1(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function nt(e, t, n, r) {
  return new v1(e, t, n, r);
}
function Eu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function w1(e) {
  if (typeof e == "function")
    return Eu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Ua)
      return 11;
    if (e === Ha)
      return 14;
  }
  return 2;
}
function fn(e, t) {
  var n = e.alternate;
  return n === null ? (n = nt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Lo(e, t, n, r, i, o) {
  var s = 2;
  if (r = e, typeof e == "function")
    Eu(e) && (s = 1);
  else if (typeof e == "string")
    s = 5;
  else
    e:
      switch (e) {
        case Kn:
          return zn(n.children, i, o, t);
        case Wa:
          s = 8, i |= 8;
          break;
        case Ol:
          return e = nt(12, n, t, i | 2), e.elementType = Ol, e.lanes = o, e;
        case Ml:
          return e = nt(13, n, t, i), e.elementType = Ml, e.lanes = o, e;
        case Dl:
          return e = nt(19, n, t, i), e.elementType = Dl, e.lanes = o, e;
        case lh:
          return Ms(n, i, o, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case oh:
                s = 10;
                break e;
              case sh:
                s = 9;
                break e;
              case Ua:
                s = 11;
                break e;
              case Ha:
                s = 14;
                break e;
              case Qt:
                s = 16, r = null;
                break e;
            }
          throw Error(C(130, e == null ? e : typeof e, ""));
      }
  return t = nt(s, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
}
function zn(e, t, n, r) {
  return e = nt(7, e, r, t), e.lanes = n, e;
}
function Ms(e, t, n, r) {
  return e = nt(22, e, r, t), e.elementType = lh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function vl(e, t, n) {
  return e = nt(6, e, null, t), e.lanes = n, e;
}
function wl(e, t, n) {
  return t = nt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function S1(e, t, n, r, i) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Xs(0), this.expirationTimes = Xs(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xs(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
}
function Tu(e, t, n, r, i, o, s, l, a) {
  return e = new S1(e, t, n, l, a), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = nt(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, lu(o), e;
}
function k1(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: qn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Xm(e) {
  if (!e)
    return hn;
  e = e._reactInternals;
  e: {
    if (jn(e) !== e || e.tag !== 1)
      throw Error(C(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (be(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(C(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (be(n))
      return Jh(e, n, t);
  }
  return t;
}
function ep(e, t, n, r, i, o, s, l, a) {
  return e = Tu(n, r, !0, e, i, o, s, l, a), e.context = Xm(null), n = e.current, r = De(), i = cn(n), o = It(r, i), o.callback = t ?? null, an(n, o, i), e.current.lanes = i, Vi(e, i, r), Ve(e, r), e;
}
function Ds(e, t, n, r) {
  var i = t.current, o = De(), s = cn(i);
  return n = Xm(n), t.context === null ? t.context = n : t.pendingContext = n, t = It(o, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = an(i, t, s), e !== null && (yt(e, i, s, o), Oo(e, i, s)), s;
}
function cs(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ef(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Cu(e, t) {
  Ef(e, t), (e = e.alternate) && Ef(e, t);
}
function x1() {
  return null;
}
var tp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Nu(e) {
  this._internalRoot = e;
}
$s.prototype.render = Nu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(C(409));
  Ds(e, t, null, null);
};
$s.prototype.unmount = Nu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Vn(function() {
      Ds(null, e, null, null);
    }), t[zt] = null;
  }
};
function $s(e) {
  this._internalRoot = e;
}
$s.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = $h();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Jt.length && t !== 0 && t < Jt[n].priority; n++)
      ;
    Jt.splice(n, 0, e), n === 0 && Ih(e);
  }
};
function _u(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Ps(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Tf() {
}
function E1(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var u = cs(s);
        o.call(u);
      };
    }
    var s = ep(t, r, e, 0, null, !1, !1, "", Tf);
    return e._reactRootContainer = s, e[zt] = s.current, xi(e.nodeType === 8 ? e.parentNode : e), Vn(), s;
  }
  for (; i = e.lastChild; )
    e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function() {
      var u = cs(a);
      l.call(u);
    };
  }
  var a = Tu(e, 0, !1, null, null, !1, !1, "", Tf);
  return e._reactRootContainer = a, e[zt] = a.current, xi(e.nodeType === 8 ? e.parentNode : e), Vn(function() {
    Ds(t, a, n, r);
  }), a;
}
function Is(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var l = i;
      i = function() {
        var a = cs(s);
        l.call(a);
      };
    }
    Ds(t, s, e, i);
  } else
    s = E1(n, t, e, i, r);
  return cs(s);
}
Mh = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ti(t.pendingLanes);
        n !== 0 && (Za(t, n | 1), Ve(t, de()), !(j & 6) && (Cr = de() + 500, wn()));
      }
      break;
    case 13:
      Vn(function() {
        var r = Rt(e, 1);
        if (r !== null) {
          var i = De();
          yt(r, e, 1, i);
        }
      }), Cu(e, 1);
  }
};
Ya = function(e) {
  if (e.tag === 13) {
    var t = Rt(e, 134217728);
    if (t !== null) {
      var n = De();
      yt(t, e, 134217728, n);
    }
    Cu(e, 134217728);
  }
};
Dh = function(e) {
  if (e.tag === 13) {
    var t = cn(e), n = Rt(e, t);
    if (n !== null) {
      var r = De();
      yt(n, e, t, r);
    }
    Cu(e, t);
  }
};
$h = function() {
  return G;
};
Ph = function(e, t) {
  var n = G;
  try {
    return G = e, t();
  } finally {
    G = n;
  }
};
Vl = function(e, t, n) {
  switch (t) {
    case "input":
      if (Il(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Es(r);
            if (!i)
              throw Error(C(90));
            uh(r), Il(r, i);
          }
        }
      }
      break;
    case "textarea":
      fh(e, n);
      break;
    case "select":
      t = n.value, t != null && cr(e, !!n.multiple, t, !1);
  }
};
vh = Su;
wh = Vn;
var T1 = { usingClientEntryPoint: !1, Events: [Ui, tr, Es, yh, gh, Su] }, Gr = { findFiberByHostInstance: On, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, C1 = { bundleType: Gr.bundleType, version: Gr.version, rendererPackageName: Gr.rendererPackageName, rendererConfig: Gr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Wt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = xh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Gr.findFiberByHostInstance || x1, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var go = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!go.isDisabled && go.supportsFiber)
    try {
      ws = go.inject(C1), xt = go;
    } catch {
    }
}
Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T1;
Qe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!_u(t))
    throw Error(C(200));
  return k1(e, t, null, n);
};
Qe.createRoot = function(e, t) {
  if (!_u(e))
    throw Error(C(299));
  var n = !1, r = "", i = tp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Tu(e, 1, !1, null, null, n, !1, r, i), e[zt] = t.current, xi(e.nodeType === 8 ? e.parentNode : e), new Nu(t);
};
Qe.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(C(188)) : (e = Object.keys(e).join(","), Error(C(268, e)));
  return e = xh(t), e = e === null ? null : e.stateNode, e;
};
Qe.flushSync = function(e) {
  return Vn(e);
};
Qe.hydrate = function(e, t, n) {
  if (!Ps(t))
    throw Error(C(200));
  return Is(null, e, t, !0, n);
};
Qe.hydrateRoot = function(e, t, n) {
  if (!_u(e))
    throw Error(C(405));
  var r = n != null && n.hydratedSources || null, i = !1, o = "", s = tp;
  if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = ep(t, null, e, 1, n ?? null, i, !1, o, s), e[zt] = t.current, xi(e), r)
    for (e = 0; e < r.length; e++)
      n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
        n,
        i
      );
  return new $s(t);
};
Qe.render = function(e, t, n) {
  if (!Ps(t))
    throw Error(C(200));
  return Is(null, e, t, !1, n);
};
Qe.unmountComponentAtNode = function(e) {
  if (!Ps(e))
    throw Error(C(40));
  return e._reactRootContainer ? (Vn(function() {
    Is(null, null, e, !1, function() {
      e._reactRootContainer = null, e[zt] = null;
    });
  }), !0) : !1;
};
Qe.unstable_batchedUpdates = Su;
Qe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Ps(n))
    throw Error(C(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(C(38));
  return Is(e, t, n, !1, r);
};
Qe.version = "18.2.0-next-9e3b772b8-20220608";
function np() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(np);
    } catch (e) {
      console.error(e);
    }
}
np(), eh.exports = Qe;
var Ou = eh.exports;
const rp = /* @__PURE__ */ x.forwardRef((e, t) => {
  const { children: n, ...r } = e, i = x.Children.toArray(n), o = i.find(N1);
  if (o) {
    const s = o.props.children, l = i.map((a) => a === o ? x.Children.count(s) > 1 ? x.Children.only(null) : /* @__PURE__ */ x.isValidElement(s) ? s.props.children : null : a);
    return /* @__PURE__ */ x.createElement(wa, $e({}, r, {
      ref: t
    }), /* @__PURE__ */ x.isValidElement(s) ? /* @__PURE__ */ x.cloneElement(s, void 0, l) : null);
  }
  return /* @__PURE__ */ x.createElement(wa, $e({}, r, {
    ref: t
  }), n);
});
rp.displayName = "Slot";
const wa = /* @__PURE__ */ x.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  return /* @__PURE__ */ x.isValidElement(n) ? /* @__PURE__ */ x.cloneElement(n, {
    ..._1(r, n.props),
    ref: t ? Jd(t, n.ref) : n.ref
  }) : x.Children.count(n) > 1 ? x.Children.only(null) : null;
});
wa.displayName = "SlotClone";
const ip = ({ children: e }) => /* @__PURE__ */ x.createElement(x.Fragment, null, e);
function N1(e) {
  return /* @__PURE__ */ x.isValidElement(e) && e.type === ip;
}
function _1(e, t) {
  const n = {
    ...t
  };
  for (const r in t) {
    const i = e[r], o = t[r];
    /^on[A-Z]/.test(r) ? i && o ? n[r] = (...l) => {
      o(...l), i(...l);
    } : i && (n[r] = i) : r === "style" ? n[r] = {
      ...i,
      ...o
    } : r === "className" && (n[r] = [
      i,
      o
    ].filter(Boolean).join(" "));
  }
  return {
    ...e,
    ...n
  };
}
const O1 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], ji = O1.reduce((e, t) => {
  const n = /* @__PURE__ */ x.forwardRef((r, i) => {
    const { asChild: o, ...s } = r, l = o ? rp : t;
    return x.useEffect(() => {
      window[Symbol.for("radix-ui")] = !0;
    }, []), /* @__PURE__ */ x.createElement(l, $e({}, s, {
      ref: i
    }));
  });
  return n.displayName = `Primitive.${t}`, {
    ...e,
    [t]: n
  };
}, {});
function M1(e, t) {
  e && Ou.flushSync(
    () => e.dispatchEvent(t)
  );
}
function Ls(e) {
  const t = x.useRef(e);
  return x.useEffect(() => {
    t.current = e;
  }), x.useMemo(
    () => (...n) => {
      var r;
      return (r = t.current) === null || r === void 0 ? void 0 : r.call(t, ...n);
    },
    []
  );
}
function D1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ls(e);
  x.useEffect(() => {
    const r = (i) => {
      i.key === "Escape" && n(i);
    };
    return t.addEventListener("keydown", r), () => t.removeEventListener("keydown", r);
  }, [
    n,
    t
  ]);
}
const Sa = "dismissableLayer.update", $1 = "dismissableLayer.pointerDownOutside", P1 = "dismissableLayer.focusOutside";
let Cf;
const I1 = /* @__PURE__ */ x.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), L1 = /* @__PURE__ */ x.forwardRef((e, t) => {
  var n;
  const { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: i, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: l, onDismiss: a, ...u } = e, c = x.useContext(I1), [f, p] = x.useState(null), h = (n = f == null ? void 0 : f.ownerDocument) !== null && n !== void 0 ? n : globalThis == null ? void 0 : globalThis.document, [, g] = x.useState({}), v = Ir(
    t,
    (T) => p(T)
  ), k = Array.from(c.layers), [m] = [
    ...c.layersWithOutsidePointerEventsDisabled
  ].slice(-1), d = k.indexOf(m), y = f ? k.indexOf(f) : -1, w = c.layersWithOutsidePointerEventsDisabled.size > 0, S = y >= d, E = z1((T) => {
    const L = T.target, $ = [
      ...c.branches
    ].some(
      (H) => H.contains(L)
    );
    !S || $ || (o == null || o(T), l == null || l(T), T.defaultPrevented || a == null || a());
  }, h), N = R1((T) => {
    const L = T.target;
    [
      ...c.branches
    ].some(
      (H) => H.contains(L)
    ) || (s == null || s(T), l == null || l(T), T.defaultPrevented || a == null || a());
  }, h);
  return D1((T) => {
    y === c.layers.size - 1 && (i == null || i(T), !T.defaultPrevented && a && (T.preventDefault(), a()));
  }, h), x.useEffect(() => {
    if (f)
      return r && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Cf = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(f)), c.layers.add(f), Nf(), () => {
        r && c.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = Cf);
      };
  }, [
    f,
    h,
    r,
    c
  ]), x.useEffect(() => () => {
    f && (c.layers.delete(f), c.layersWithOutsidePointerEventsDisabled.delete(f), Nf());
  }, [
    f,
    c
  ]), x.useEffect(() => {
    const T = () => g({});
    return document.addEventListener(Sa, T), () => document.removeEventListener(Sa, T);
  }, []), /* @__PURE__ */ x.createElement(ji.div, $e({}, u, {
    ref: v,
    style: {
      pointerEvents: w ? S ? "auto" : "none" : void 0,
      ...e.style
    },
    onFocusCapture: Ot(e.onFocusCapture, N.onFocusCapture),
    onBlurCapture: Ot(e.onBlurCapture, N.onBlurCapture),
    onPointerDownCapture: Ot(e.onPointerDownCapture, E.onPointerDownCapture)
  }));
});
function z1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ls(e), r = x.useRef(!1), i = x.useRef(() => {
  });
  return x.useEffect(() => {
    const o = (l) => {
      if (l.target && !r.current) {
        let u = function() {
          op($1, n, a, {
            discrete: !0
          });
        };
        const a = {
          originalEvent: l
        };
        l.pointerType === "touch" ? (t.removeEventListener("click", i.current), i.current = u, t.addEventListener("click", i.current, {
          once: !0
        })) : u();
      } else
        t.removeEventListener("click", i.current);
      r.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", o);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", o), t.removeEventListener("click", i.current);
    };
  }, [
    t,
    n
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function R1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ls(e), r = x.useRef(!1);
  return x.useEffect(() => {
    const i = (o) => {
      o.target && !r.current && op(P1, n, {
        originalEvent: o
      }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", i), () => t.removeEventListener("focusin", i);
  }, [
    t,
    n
  ]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Nf() {
  const e = new CustomEvent(Sa);
  document.dispatchEvent(e);
}
function op(e, t, n, { discrete: r }) {
  const i = n.originalEvent.target, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && i.addEventListener(e, t, {
    once: !0
  }), r ? M1(i, o) : i.dispatchEvent(o);
}
const $i = globalThis != null && globalThis.document ? x.useLayoutEffect : () => {
}, F1 = ["top", "right", "bottom", "left"], mn = Math.min, Ue = Math.max, fs = Math.round, vo = Math.floor, pn = (e) => ({
  x: e,
  y: e
}), A1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, b1 = {
  start: "end",
  end: "start"
};
function ka(e, t, n) {
  return Ue(e, mn(t, n));
}
function At(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function bt(e) {
  return e.split("-")[0];
}
function Rr(e) {
  return e.split("-")[1];
}
function Mu(e) {
  return e === "x" ? "y" : "x";
}
function Du(e) {
  return e === "y" ? "height" : "width";
}
function Fr(e) {
  return ["top", "bottom"].includes(bt(e)) ? "y" : "x";
}
function $u(e) {
  return Mu(Fr(e));
}
function V1(e, t, n) {
  n === void 0 && (n = !1);
  const r = Rr(e), i = $u(e), o = Du(i);
  let s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (s = ds(s)), [s, ds(s)];
}
function W1(e) {
  const t = ds(e);
  return [xa(e), t, xa(t)];
}
function xa(e) {
  return e.replace(/start|end/g, (t) => b1[t]);
}
function U1(e, t, n) {
  const r = ["left", "right"], i = ["right", "left"], o = ["top", "bottom"], s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? i : r : t ? r : i;
    case "left":
    case "right":
      return t ? o : s;
    default:
      return [];
  }
}
function H1(e, t, n, r) {
  const i = Rr(e);
  let o = U1(bt(e), n === "start", r);
  return i && (o = o.map((s) => s + "-" + i), t && (o = o.concat(o.map(xa)))), o;
}
function ds(e) {
  return e.replace(/left|right|bottom|top/g, (t) => A1[t]);
}
function j1(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function sp(e) {
  return typeof e != "number" ? j1(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function hs(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function _f(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const o = Fr(t), s = $u(t), l = Du(s), a = bt(t), u = o === "y", c = r.x + r.width / 2 - i.width / 2, f = r.y + r.height / 2 - i.height / 2, p = r[l] / 2 - i[l] / 2;
  let h;
  switch (a) {
    case "top":
      h = {
        x: c,
        y: r.y - i.height
      };
      break;
    case "bottom":
      h = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      h = {
        x: r.x - i.width,
        y: f
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (Rr(t)) {
    case "start":
      h[s] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      h[s] += p * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const B1 = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: o = [],
    platform: s
  } = n, l = o.filter(Boolean), a = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), {
    x: c,
    y: f
  } = _f(u, r, a), p = r, h = {}, g = 0;
  for (let v = 0; v < l.length; v++) {
    const {
      name: k,
      fn: m
    } = l[v], {
      x: d,
      y,
      data: w,
      reset: S
    } = await m({
      x: c,
      y: f,
      initialPlacement: r,
      placement: p,
      strategy: i,
      middlewareData: h,
      rects: u,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = d ?? c, f = y ?? f, h = {
      ...h,
      [k]: {
        ...h[k],
        ...w
      }
    }, S && g <= 50 && (g++, typeof S == "object" && (S.placement && (p = S.placement), S.rects && (u = S.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : S.rects), {
      x: c,
      y: f
    } = _f(u, p, a)), v = -1);
  }
  return {
    x: c,
    y: f,
    placement: p,
    strategy: i,
    middlewareData: h
  };
};
async function Pi(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: i,
    platform: o,
    rects: s,
    elements: l,
    strategy: a
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: h = 0
  } = At(t, e), g = sp(h), k = l[p ? f === "floating" ? "reference" : "floating" : f], m = hs(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(k))) == null || n ? k : k.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: a
  })), d = f === "floating" ? {
    ...s.floating,
    x: r,
    y: i
  } : s.reference, y = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l.floating)), w = await (o.isElement == null ? void 0 : o.isElement(y)) ? await (o.getScale == null ? void 0 : o.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = hs(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: d,
    offsetParent: y,
    strategy: a
  }) : d);
  return {
    top: (m.top - S.top + g.top) / w.y,
    bottom: (S.bottom - m.bottom + g.bottom) / w.y,
    left: (m.left - S.left + g.left) / w.x,
    right: (S.right - m.right + g.right) / w.x
  };
}
const Z1 = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: i,
      rects: o,
      platform: s,
      elements: l,
      middlewareData: a
    } = t, {
      element: u,
      padding: c = 0
    } = At(e, t) || {};
    if (u == null)
      return {};
    const f = sp(c), p = {
      x: n,
      y: r
    }, h = $u(i), g = Du(h), v = await s.getDimensions(u), k = h === "y", m = k ? "top" : "left", d = k ? "bottom" : "right", y = k ? "clientHeight" : "clientWidth", w = o.reference[g] + o.reference[h] - p[h] - o.floating[g], S = p[h] - o.reference[h], E = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
    let N = E ? E[y] : 0;
    (!N || !await (s.isElement == null ? void 0 : s.isElement(E))) && (N = l.floating[y] || o.floating[g]);
    const T = w / 2 - S / 2, L = N / 2 - v[g] / 2 - 1, $ = mn(f[m], L), H = mn(f[d], L), I = $, he = N - v[g] - H, Z = N / 2 - v[g] / 2 + T, J = ka(I, Z, he), X = !a.arrow && Rr(i) != null && Z !== J && o.reference[g] / 2 - (Z < I ? $ : H) - v[g] / 2 < 0, W = X ? Z < I ? Z - I : Z - he : 0;
    return {
      [h]: p[h] + W,
      data: {
        [h]: J,
        centerOffset: Z - J - W,
        ...X && {
          alignmentOffset: W
        }
      },
      reset: X
    };
  }
}), Y1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: i,
        middlewareData: o,
        rects: s,
        initialPlacement: l,
        platform: a,
        elements: u
      } = t, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: v = !0,
        ...k
      } = At(e, t);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const m = bt(i), d = bt(l) === l, y = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)), w = p || (d || !v ? [ds(l)] : W1(l));
      !p && g !== "none" && w.push(...H1(l, v, g, y));
      const S = [l, ...w], E = await Pi(t, k), N = [];
      let T = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (c && N.push(E[m]), f) {
        const I = V1(i, s, y);
        N.push(E[I[0]], E[I[1]]);
      }
      if (T = [...T, {
        placement: i,
        overflows: N
      }], !N.every((I) => I <= 0)) {
        var L, $;
        const I = (((L = o.flip) == null ? void 0 : L.index) || 0) + 1, he = S[I];
        if (he)
          return {
            data: {
              index: I,
              overflows: T
            },
            reset: {
              placement: he
            }
          };
        let Z = ($ = T.filter((J) => J.overflows[0] <= 0).sort((J, X) => J.overflows[1] - X.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!Z)
          switch (h) {
            case "bestFit": {
              var H;
              const J = (H = T.map((X) => [X.placement, X.overflows.filter((W) => W > 0).reduce((W, _) => W + _, 0)]).sort((X, W) => X[1] - W[1])[0]) == null ? void 0 : H[0];
              J && (Z = J);
              break;
            }
            case "initialPlacement":
              Z = l;
              break;
          }
        if (i !== Z)
          return {
            reset: {
              placement: Z
            }
          };
      }
      return {};
    }
  };
};
function Of(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Mf(e) {
  return F1.some((t) => e[t] >= 0);
}
const G1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...i
      } = At(e, t);
      switch (r) {
        case "referenceHidden": {
          const o = await Pi(t, {
            ...i,
            elementContext: "reference"
          }), s = Of(o, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Mf(s)
            }
          };
        }
        case "escaped": {
          const o = await Pi(t, {
            ...i,
            altBoundary: !0
          }), s = Of(o, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Mf(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Q1(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), s = bt(n), l = Rr(n), a = Fr(n) === "y", u = ["left", "top"].includes(s) ? -1 : 1, c = o && a ? -1 : 1, f = At(t, e);
  let {
    mainAxis: p,
    crossAxis: h,
    alignmentAxis: g
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...f
  };
  return l && typeof g == "number" && (h = l === "end" ? g * -1 : g), a ? {
    x: h * c,
    y: p * u
  } : {
    x: p * u,
    y: h * c
  };
}
const q1 = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: i,
        y: o,
        placement: s,
        middlewareData: l
      } = t, a = await Q1(t, e);
      return s === ((n = l.offset) == null ? void 0 : n.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
        x: i + a.x,
        y: o + a.y,
        data: {
          ...a,
          placement: s
        }
      };
    }
  };
}, K1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: i
      } = t, {
        mainAxis: o = !0,
        crossAxis: s = !1,
        limiter: l = {
          fn: (k) => {
            let {
              x: m,
              y: d
            } = k;
            return {
              x: m,
              y: d
            };
          }
        },
        ...a
      } = At(e, t), u = {
        x: n,
        y: r
      }, c = await Pi(t, a), f = Fr(bt(i)), p = Mu(f);
      let h = u[p], g = u[f];
      if (o) {
        const k = p === "y" ? "top" : "left", m = p === "y" ? "bottom" : "right", d = h + c[k], y = h - c[m];
        h = ka(d, h, y);
      }
      if (s) {
        const k = f === "y" ? "top" : "left", m = f === "y" ? "bottom" : "right", d = g + c[k], y = g - c[m];
        g = ka(d, g, y);
      }
      const v = l.fn({
        ...t,
        [p]: h,
        [f]: g
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - r
        }
      };
    }
  };
}, J1 = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: i,
        rects: o,
        middlewareData: s
      } = t, {
        offset: l = 0,
        mainAxis: a = !0,
        crossAxis: u = !0
      } = At(e, t), c = {
        x: n,
        y: r
      }, f = Fr(i), p = Mu(f);
      let h = c[p], g = c[f];
      const v = At(l, t), k = typeof v == "number" ? {
        mainAxis: v,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...v
      };
      if (a) {
        const y = p === "y" ? "height" : "width", w = o.reference[p] - o.floating[y] + k.mainAxis, S = o.reference[p] + o.reference[y] - k.mainAxis;
        h < w ? h = w : h > S && (h = S);
      }
      if (u) {
        var m, d;
        const y = p === "y" ? "width" : "height", w = ["top", "left"].includes(bt(i)), S = o.reference[f] - o.floating[y] + (w && ((m = s.offset) == null ? void 0 : m[f]) || 0) + (w ? 0 : k.crossAxis), E = o.reference[f] + o.reference[y] + (w ? 0 : ((d = s.offset) == null ? void 0 : d[f]) || 0) - (w ? k.crossAxis : 0);
        g < S ? g = S : g > E && (g = E);
      }
      return {
        [p]: h,
        [f]: g
      };
    }
  };
}, X1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: r,
        platform: i,
        elements: o
      } = t, {
        apply: s = () => {
        },
        ...l
      } = At(e, t), a = await Pi(t, l), u = bt(n), c = Rr(n), f = Fr(n) === "y", {
        width: p,
        height: h
      } = r.floating;
      let g, v;
      u === "top" || u === "bottom" ? (g = u, v = c === (await (i.isRTL == null ? void 0 : i.isRTL(o.floating)) ? "start" : "end") ? "left" : "right") : (v = u, g = c === "end" ? "top" : "bottom");
      const k = h - a[g], m = p - a[v], d = !t.middlewareData.shift;
      let y = k, w = m;
      if (f) {
        const E = p - a.left - a.right;
        w = c || d ? mn(m, E) : E;
      } else {
        const E = h - a.top - a.bottom;
        y = c || d ? mn(k, E) : E;
      }
      if (d && !c) {
        const E = Ue(a.left, 0), N = Ue(a.right, 0), T = Ue(a.top, 0), L = Ue(a.bottom, 0);
        f ? w = p - 2 * (E !== 0 || N !== 0 ? E + N : Ue(a.left, a.right)) : y = h - 2 * (T !== 0 || L !== 0 ? T + L : Ue(a.top, a.bottom));
      }
      await s({
        ...t,
        availableWidth: w,
        availableHeight: y
      });
      const S = await i.getDimensions(o.floating);
      return p !== S.width || h !== S.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function yn(e) {
  return lp(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ze(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ut(e) {
  var t;
  return (t = (lp(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function lp(e) {
  return e instanceof Node || e instanceof Ze(e).Node;
}
function Vt(e) {
  return e instanceof Element || e instanceof Ze(e).Element;
}
function Ct(e) {
  return e instanceof HTMLElement || e instanceof Ze(e).HTMLElement;
}
function Df(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ze(e).ShadowRoot;
}
function Bi(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = st(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function ew(e) {
  return ["table", "td", "th"].includes(yn(e));
}
function Pu(e) {
  const t = Iu(), n = st(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function tw(e) {
  let t = Nr(e);
  for (; Ct(t) && !zs(t); ) {
    if (Pu(t))
      return t;
    t = Nr(t);
  }
  return null;
}
function Iu() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function zs(e) {
  return ["html", "body", "#document"].includes(yn(e));
}
function st(e) {
  return Ze(e).getComputedStyle(e);
}
function Rs(e) {
  return Vt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function Nr(e) {
  if (yn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Df(e) && e.host || // Fallback.
    Ut(e)
  );
  return Df(t) ? t.host : t;
}
function ap(e) {
  const t = Nr(e);
  return zs(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ct(t) && Bi(t) ? t : ap(t);
}
function Ii(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = ap(e), o = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Ze(i);
  return o ? t.concat(s, s.visualViewport || [], Bi(i) ? i : [], s.frameElement && n ? Ii(s.frameElement) : []) : t.concat(i, Ii(i, [], n));
}
function up(e) {
  const t = st(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = Ct(e), o = i ? e.offsetWidth : n, s = i ? e.offsetHeight : r, l = fs(n) !== o || fs(r) !== s;
  return l && (n = o, r = s), {
    width: n,
    height: r,
    $: l
  };
}
function Lu(e) {
  return Vt(e) ? e : e.contextElement;
}
function yr(e) {
  const t = Lu(e);
  if (!Ct(t))
    return pn(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = up(t);
  let s = (o ? fs(n.width) : n.width) / r, l = (o ? fs(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: s,
    y: l
  };
}
const nw = /* @__PURE__ */ pn(0);
function cp(e) {
  const t = Ze(e);
  return !Iu() || !t.visualViewport ? nw : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function rw(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ze(e) ? !1 : t;
}
function Wn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), o = Lu(e);
  let s = pn(1);
  t && (r ? Vt(r) && (s = yr(r)) : s = yr(e));
  const l = rw(o, n, r) ? cp(o) : pn(0);
  let a = (i.left + l.x) / s.x, u = (i.top + l.y) / s.y, c = i.width / s.x, f = i.height / s.y;
  if (o) {
    const p = Ze(o), h = r && Vt(r) ? Ze(r) : r;
    let g = p, v = g.frameElement;
    for (; v && r && h !== g; ) {
      const k = yr(v), m = v.getBoundingClientRect(), d = st(v), y = m.left + (v.clientLeft + parseFloat(d.paddingLeft)) * k.x, w = m.top + (v.clientTop + parseFloat(d.paddingTop)) * k.y;
      a *= k.x, u *= k.y, c *= k.x, f *= k.y, a += y, u += w, g = Ze(v), v = g.frameElement;
    }
  }
  return hs({
    width: c,
    height: f,
    x: a,
    y: u
  });
}
const iw = [":popover-open", ":modal"];
function fp(e) {
  return iw.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function ow(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: i
  } = e;
  const o = i === "fixed", s = Ut(r), l = t ? fp(t.floating) : !1;
  if (r === s || l && o)
    return n;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = pn(1);
  const c = pn(0), f = Ct(r);
  if ((f || !f && !o) && ((yn(r) !== "body" || Bi(s)) && (a = Rs(r)), Ct(r))) {
    const p = Wn(r);
    u = yr(r), c.x = p.x + r.clientLeft, c.y = p.y + r.clientTop;
  }
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - a.scrollLeft * u.x + c.x,
    y: n.y * u.y - a.scrollTop * u.y + c.y
  };
}
function sw(e) {
  return Array.from(e.getClientRects());
}
function dp(e) {
  return Wn(Ut(e)).left + Rs(e).scrollLeft;
}
function lw(e) {
  const t = Ut(e), n = Rs(e), r = e.ownerDocument.body, i = Ue(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), o = Ue(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + dp(e);
  const l = -n.scrollTop;
  return st(r).direction === "rtl" && (s += Ue(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: s,
    y: l
  };
}
function aw(e, t) {
  const n = Ze(e), r = Ut(e), i = n.visualViewport;
  let o = r.clientWidth, s = r.clientHeight, l = 0, a = 0;
  if (i) {
    o = i.width, s = i.height;
    const u = Iu();
    (!u || u && t === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: l,
    y: a
  };
}
function uw(e, t) {
  const n = Wn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, o = Ct(e) ? yr(e) : pn(1), s = e.clientWidth * o.x, l = e.clientHeight * o.y, a = i * o.x, u = r * o.y;
  return {
    width: s,
    height: l,
    x: a,
    y: u
  };
}
function $f(e, t, n) {
  let r;
  if (t === "viewport")
    r = aw(e, n);
  else if (t === "document")
    r = lw(Ut(e));
  else if (Vt(t))
    r = uw(t, n);
  else {
    const i = cp(e);
    r = {
      ...t,
      x: t.x - i.x,
      y: t.y - i.y
    };
  }
  return hs(r);
}
function hp(e, t) {
  const n = Nr(e);
  return n === t || !Vt(n) || zs(n) ? !1 : st(n).position === "fixed" || hp(n, t);
}
function cw(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Ii(e, [], !1).filter((l) => Vt(l) && yn(l) !== "body"), i = null;
  const o = st(e).position === "fixed";
  let s = o ? Nr(e) : e;
  for (; Vt(s) && !zs(s); ) {
    const l = st(s), a = Pu(s);
    !a && l.position === "fixed" && (i = null), (o ? !a && !i : !a && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Bi(s) && !a && hp(e, s)) ? r = r.filter((c) => c !== s) : i = l, s = Nr(s);
  }
  return t.set(e, r), r;
}
function fw(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const s = [...n === "clippingAncestors" ? cw(t, this._c) : [].concat(n), r], l = s[0], a = s.reduce((u, c) => {
    const f = $f(t, c, i);
    return u.top = Ue(f.top, u.top), u.right = mn(f.right, u.right), u.bottom = mn(f.bottom, u.bottom), u.left = Ue(f.left, u.left), u;
  }, $f(t, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function dw(e) {
  const {
    width: t,
    height: n
  } = up(e);
  return {
    width: t,
    height: n
  };
}
function hw(e, t, n) {
  const r = Ct(t), i = Ut(t), o = n === "fixed", s = Wn(e, !0, o, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = pn(0);
  if (r || !r && !o)
    if ((yn(t) !== "body" || Bi(i)) && (l = Rs(t)), r) {
      const f = Wn(t, !0, o, t);
      a.x = f.x + t.clientLeft, a.y = f.y + t.clientTop;
    } else
      i && (a.x = dp(i));
  const u = s.left + l.scrollLeft - a.x, c = s.top + l.scrollTop - a.y;
  return {
    x: u,
    y: c,
    width: s.width,
    height: s.height
  };
}
function Pf(e, t) {
  return !Ct(e) || st(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function mp(e, t) {
  const n = Ze(e);
  if (!Ct(e) || fp(e))
    return n;
  let r = Pf(e, t);
  for (; r && ew(r) && st(r).position === "static"; )
    r = Pf(r, t);
  return r && (yn(r) === "html" || yn(r) === "body" && st(r).position === "static" && !Pu(r)) ? n : r || tw(e) || n;
}
const mw = async function(e) {
  const t = this.getOffsetParent || mp, n = this.getDimensions;
  return {
    reference: hw(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      ...await n(e.floating)
    }
  };
};
function pw(e) {
  return st(e).direction === "rtl";
}
const yw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ow,
  getDocumentElement: Ut,
  getClippingRect: fw,
  getOffsetParent: mp,
  getElementRects: mw,
  getClientRects: sw,
  getDimensions: dw,
  getScale: yr,
  isElement: Vt,
  isRTL: pw
};
function gw(e, t) {
  let n = null, r;
  const i = Ut(e);
  function o() {
    var l;
    clearTimeout(r), (l = n) == null || l.disconnect(), n = null;
  }
  function s(l, a) {
    l === void 0 && (l = !1), a === void 0 && (a = 1), o();
    const {
      left: u,
      top: c,
      width: f,
      height: p
    } = e.getBoundingClientRect();
    if (l || t(), !f || !p)
      return;
    const h = vo(c), g = vo(i.clientWidth - (u + f)), v = vo(i.clientHeight - (c + p)), k = vo(u), d = {
      rootMargin: -h + "px " + -g + "px " + -v + "px " + -k + "px",
      threshold: Ue(0, mn(1, a)) || 1
    };
    let y = !0;
    function w(S) {
      const E = S[0].intersectionRatio;
      if (E !== a) {
        if (!y)
          return s();
        E ? s(!1, E) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 100);
      }
      y = !1;
    }
    try {
      n = new IntersectionObserver(w, {
        ...d,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(w, d);
    }
    n.observe(e);
  }
  return s(!0), o;
}
function vw(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: o = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = r, u = Lu(e), c = i || o ? [...u ? Ii(u) : [], ...Ii(t)] : [];
  c.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), o && m.addEventListener("resize", n);
  });
  const f = u && l ? gw(u, n) : null;
  let p = -1, h = null;
  s && (h = new ResizeObserver((m) => {
    let [d] = m;
    d && d.target === u && h && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var y;
      (y = h) == null || y.observe(t);
    })), n();
  }), u && !a && h.observe(u), h.observe(t));
  let g, v = a ? Wn(e) : null;
  a && k();
  function k() {
    const m = Wn(e);
    v && (m.x !== v.x || m.y !== v.y || m.width !== v.width || m.height !== v.height) && n(), v = m, g = requestAnimationFrame(k);
  }
  return n(), () => {
    var m;
    c.forEach((d) => {
      i && d.removeEventListener("scroll", n), o && d.removeEventListener("resize", n);
    }), f == null || f(), (m = h) == null || m.disconnect(), h = null, a && cancelAnimationFrame(g);
  };
}
const ww = K1, Sw = Y1, kw = X1, xw = G1, If = Z1, Ew = J1, Tw = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: yw,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return B1(e, t, {
    ...i,
    platform: o
  });
}, Cw = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: i
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? If({
        element: r.current,
        padding: i
      }).fn(n) : {} : r ? If({
        element: r,
        padding: i
      }).fn(n) : {};
    }
  };
};
var zo = typeof document < "u" ? x.useLayoutEffect : x.useEffect;
function ms(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!ms(e[r], t[r]))
          return !1;
      return !0;
    }
    if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, i[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const o = i[r];
      if (!(o === "_owner" && e.$$typeof) && !ms(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function pp(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Lf(e, t) {
  const n = pp(e);
  return Math.round(t * n) / n;
}
function zf(e) {
  const t = x.useRef(e);
  return zo(() => {
    t.current = e;
  }), t;
}
function Nw(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: i,
    elements: {
      reference: o,
      floating: s
    } = {},
    transform: l = !0,
    whileElementsMounted: a,
    open: u
  } = e, [c, f] = x.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = x.useState(r);
  ms(p, r) || h(r);
  const [g, v] = x.useState(null), [k, m] = x.useState(null), d = x.useCallback((W) => {
    W !== E.current && (E.current = W, v(W));
  }, []), y = x.useCallback((W) => {
    W !== N.current && (N.current = W, m(W));
  }, []), w = o || g, S = s || k, E = x.useRef(null), N = x.useRef(null), T = x.useRef(c), L = a != null, $ = zf(a), H = zf(i), I = x.useCallback(() => {
    if (!E.current || !N.current)
      return;
    const W = {
      placement: t,
      strategy: n,
      middleware: p
    };
    H.current && (W.platform = H.current), Tw(E.current, N.current, W).then((_) => {
      const P = {
        ..._,
        isPositioned: !0
      };
      he.current && !ms(T.current, P) && (T.current = P, Ou.flushSync(() => {
        f(P);
      }));
    });
  }, [p, t, n, H]);
  zo(() => {
    u === !1 && T.current.isPositioned && (T.current.isPositioned = !1, f((W) => ({
      ...W,
      isPositioned: !1
    })));
  }, [u]);
  const he = x.useRef(!1);
  zo(() => (he.current = !0, () => {
    he.current = !1;
  }), []), zo(() => {
    if (w && (E.current = w), S && (N.current = S), w && S) {
      if ($.current)
        return $.current(w, S, I);
      I();
    }
  }, [w, S, I, $, L]);
  const Z = x.useMemo(() => ({
    reference: E,
    floating: N,
    setReference: d,
    setFloating: y
  }), [d, y]), J = x.useMemo(() => ({
    reference: w,
    floating: S
  }), [w, S]), X = x.useMemo(() => {
    const W = {
      position: n,
      left: 0,
      top: 0
    };
    if (!J.floating)
      return W;
    const _ = Lf(J.floating, c.x), P = Lf(J.floating, c.y);
    return l ? {
      ...W,
      transform: "translate(" + _ + "px, " + P + "px)",
      ...pp(J.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: _,
      top: P
    };
  }, [n, l, J.floating, c.x, c.y]);
  return x.useMemo(() => ({
    ...c,
    update: I,
    refs: Z,
    elements: J,
    floatingStyles: X
  }), [c, I, Z, J, X]);
}
function _w(e) {
  const [t, n] = x.useState(void 0);
  return $i(() => {
    if (e) {
      n({
        width: e.offsetWidth,
        height: e.offsetHeight
      });
      const r = new ResizeObserver((i) => {
        if (!Array.isArray(i) || !i.length)
          return;
        const o = i[0];
        let s, l;
        if ("borderBoxSize" in o) {
          const a = o.borderBoxSize, u = Array.isArray(a) ? a[0] : a;
          s = u.inlineSize, l = u.blockSize;
        } else
          s = e.offsetWidth, l = e.offsetHeight;
        n({
          width: s,
          height: l
        });
      });
      return r.observe(e, {
        box: "border-box"
      }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [
    e
  ]), t;
}
const yp = "Popper", [gp, vp] = Xd(yp), [$S, wp] = gp(yp), Ow = "PopperAnchor", Mw = /* @__PURE__ */ x.forwardRef((e, t) => {
  const { __scopePopper: n, virtualRef: r, ...i } = e, o = wp(Ow, n), s = x.useRef(null), l = Ir(t, s);
  return x.useEffect(() => {
    o.onAnchorChange((r == null ? void 0 : r.current) || s.current);
  }), r ? null : /* @__PURE__ */ x.createElement(ji.div, $e({}, i, {
    ref: l
  }));
}), Sp = "PopperContent", [Dw, PS] = gp(Sp), $w = /* @__PURE__ */ x.forwardRef((e, t) => {
  var n, r, i, o, s, l, a, u;
  const { __scopePopper: c, side: f = "bottom", sideOffset: p = 0, align: h = "center", alignOffset: g = 0, arrowPadding: v = 0, avoidCollisions: k = !0, collisionBoundary: m = [], collisionPadding: d = 0, sticky: y = "partial", hideWhenDetached: w = !1, updatePositionStrategy: S = "optimized", onPlaced: E, ...N } = e, T = wp(Sp, c), [L, $] = x.useState(null), H = Ir(
    t,
    (Ar) => $(Ar)
  ), [I, he] = x.useState(null), Z = _w(I), J = (n = Z == null ? void 0 : Z.width) !== null && n !== void 0 ? n : 0, X = (r = Z == null ? void 0 : Z.height) !== null && r !== void 0 ? r : 0, W = f + (h !== "center" ? "-" + h : ""), _ = typeof d == "number" ? d : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...d
  }, P = Array.isArray(m) ? m : [
    m
  ], F = P.length > 0, B = {
    padding: _,
    boundary: P.filter(Pw),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: F
  }, { refs: ee, floatingStyles: fe, placement: Nt, isPositioned: Ht, middlewareData: Le } = Nw({
    // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
    strategy: "fixed",
    placement: W,
    whileElementsMounted: (...Ar) => vw(...Ar, {
      animationFrame: S === "always"
    }),
    elements: {
      reference: T.anchor
    },
    middleware: [
      q1({
        mainAxis: p + X,
        alignmentAxis: g
      }),
      k && ww({
        mainAxis: !0,
        crossAxis: !1,
        limiter: y === "partial" ? Ew() : void 0,
        ...B
      }),
      k && Sw({
        ...B
      }),
      kw({
        ...B,
        apply: ({ elements: Ar, rects: Ru, availableWidth: Wp, availableHeight: Up }) => {
          const { width: Hp, height: jp } = Ru.reference, Yi = Ar.floating.style;
          Yi.setProperty("--radix-popper-available-width", `${Wp}px`), Yi.setProperty("--radix-popper-available-height", `${Up}px`), Yi.setProperty("--radix-popper-anchor-width", `${Hp}px`), Yi.setProperty("--radix-popper-anchor-height", `${jp}px`);
        }
      }),
      I && Cw({
        element: I,
        padding: v
      }),
      Iw({
        arrowWidth: J,
        arrowHeight: X
      }),
      w && xw({
        strategy: "referenceHidden",
        ...B
      })
    ]
  }), [Sn, zp] = kp(Nt), Zi = Ls(E);
  $i(() => {
    Ht && (Zi == null || Zi());
  }, [
    Ht,
    Zi
  ]);
  const Rp = (i = Le.arrow) === null || i === void 0 ? void 0 : i.x, Fp = (o = Le.arrow) === null || o === void 0 ? void 0 : o.y, Ap = ((s = Le.arrow) === null || s === void 0 ? void 0 : s.centerOffset) !== 0, [bp, Vp] = x.useState();
  return $i(() => {
    L && Vp(window.getComputedStyle(L).zIndex);
  }, [
    L
  ]), /* @__PURE__ */ x.createElement("div", {
    ref: ee.setFloating,
    "data-radix-popper-content-wrapper": "",
    style: {
      ...fe,
      transform: Ht ? fe.transform : "translate(0, -200%)",
      // keep off the page when measuring
      minWidth: "max-content",
      zIndex: bp,
      "--radix-popper-transform-origin": [
        (l = Le.transformOrigin) === null || l === void 0 ? void 0 : l.x,
        (a = Le.transformOrigin) === null || a === void 0 ? void 0 : a.y
      ].join(" ")
    },
    dir: e.dir
  }, /* @__PURE__ */ x.createElement(Dw, {
    scope: c,
    placedSide: Sn,
    onArrowChange: he,
    arrowX: Rp,
    arrowY: Fp,
    shouldHideArrow: Ap
  }, /* @__PURE__ */ x.createElement(ji.div, $e({
    "data-side": Sn,
    "data-align": zp
  }, N, {
    ref: H,
    style: {
      ...N.style,
      // if the PopperContent hasn't been placed yet (not all measurements done)
      // we prevent animations so that users's animation don't kick in too early referring wrong sides
      animation: Ht ? void 0 : "none",
      // hide the content if using the hide middleware and should be hidden
      opacity: (u = Le.hide) !== null && u !== void 0 && u.referenceHidden ? 0 : void 0
    }
  }))));
});
function Pw(e) {
  return e !== null;
}
const Iw = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var n, r, i, o, s;
    const { placement: l, rects: a, middlewareData: u } = t, f = ((n = u.arrow) === null || n === void 0 ? void 0 : n.centerOffset) !== 0, p = f ? 0 : e.arrowWidth, h = f ? 0 : e.arrowHeight, [g, v] = kp(l), k = {
      start: "0%",
      center: "50%",
      end: "100%"
    }[v], m = ((r = (i = u.arrow) === null || i === void 0 ? void 0 : i.x) !== null && r !== void 0 ? r : 0) + p / 2, d = ((o = (s = u.arrow) === null || s === void 0 ? void 0 : s.y) !== null && o !== void 0 ? o : 0) + h / 2;
    let y = "", w = "";
    return g === "bottom" ? (y = f ? k : `${m}px`, w = `${-h}px`) : g === "top" ? (y = f ? k : `${m}px`, w = `${a.floating.height + h}px`) : g === "right" ? (y = `${-h}px`, w = f ? k : `${d}px`) : g === "left" && (y = `${a.floating.width + h}px`, w = f ? k : `${d}px`), {
      data: {
        x: y,
        y: w
      }
    };
  }
});
function kp(e) {
  const [t, n = "center"] = e.split("-");
  return [
    t,
    n
  ];
}
const Lw = Mw, zw = $w;
function Rw(e, t) {
  return x.useReducer((n, r) => {
    const i = t[n][r];
    return i ?? n;
  }, e);
}
const xp = (e) => {
  const { present: t, children: n } = e, r = Fw(t), i = typeof n == "function" ? n({
    present: r.isPresent
  }) : x.Children.only(n), o = Ir(r.ref, i.ref);
  return typeof n == "function" || r.isPresent ? /* @__PURE__ */ x.cloneElement(i, {
    ref: o
  }) : null;
};
xp.displayName = "Presence";
function Fw(e) {
  const [t, n] = x.useState(), r = x.useRef({}), i = x.useRef(e), o = x.useRef("none"), s = e ? "mounted" : "unmounted", [l, a] = Rw(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return x.useEffect(() => {
    const u = wo(r.current);
    o.current = l === "mounted" ? u : "none";
  }, [
    l
  ]), $i(() => {
    const u = r.current, c = i.current;
    if (c !== e) {
      const p = o.current, h = wo(u);
      e ? a("MOUNT") : h === "none" || (u == null ? void 0 : u.display) === "none" ? a("UNMOUNT") : a(c && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
    }
  }, [
    e,
    a
  ]), $i(() => {
    if (t) {
      const u = (f) => {
        const h = wo(r.current).includes(f.animationName);
        f.target === t && h && Ou.flushSync(
          () => a("ANIMATION_END")
        );
      }, c = (f) => {
        f.target === t && (o.current = wo(r.current));
      };
      return t.addEventListener("animationstart", c), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        t.removeEventListener("animationstart", c), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
      };
    } else
      a("ANIMATION_END");
  }, [
    t,
    a
  ]), {
    isPresent: [
      "mounted",
      "unmountSuspended"
    ].includes(l),
    ref: x.useCallback((u) => {
      u && (r.current = getComputedStyle(u)), n(u);
    }, [])
  };
}
function wo(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
const Aw = /* @__PURE__ */ x.forwardRef((e, t) => /* @__PURE__ */ x.createElement(ji.span, $e({}, e, {
  ref: t,
  style: {
    // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    ...e.style
  }
}))), bw = Aw, [Fs, IS] = Xd("Tooltip", [
  vp
]), Ep = vp(), Vw = "TooltipProvider", Rf = "tooltip.open", [LS, Tp] = Fs(Vw), Cp = "Tooltip", [zS, As] = Fs(Cp), Ff = "TooltipTrigger", Ww = /* @__PURE__ */ x.forwardRef((e, t) => {
  const { __scopeTooltip: n, ...r } = e, i = As(Ff, n), o = Tp(Ff, n), s = Ep(n), l = x.useRef(null), a = Ir(t, l, i.onTriggerChange), u = x.useRef(!1), c = x.useRef(!1), f = x.useCallback(
    () => u.current = !1,
    []
  );
  return x.useEffect(() => () => document.removeEventListener("pointerup", f), [
    f
  ]), /* @__PURE__ */ x.createElement(Lw, $e({
    asChild: !0
  }, s), /* @__PURE__ */ x.createElement(ji.button, $e({
    // We purposefully avoid adding `type=button` here because tooltip triggers are also
    // commonly anchors and the anchor `type` attribute signifies MIME type.
    "aria-describedby": i.open ? i.contentId : void 0,
    "data-state": i.stateAttribute
  }, r, {
    ref: a,
    onPointerMove: Ot(e.onPointerMove, (p) => {
      p.pointerType !== "touch" && !c.current && !o.isPointerInTransitRef.current && (i.onTriggerEnter(), c.current = !0);
    }),
    onPointerLeave: Ot(e.onPointerLeave, () => {
      i.onTriggerLeave(), c.current = !1;
    }),
    onPointerDown: Ot(e.onPointerDown, () => {
      u.current = !0, document.addEventListener("pointerup", f, {
        once: !0
      });
    }),
    onFocus: Ot(e.onFocus, () => {
      u.current || i.onOpen();
    }),
    onBlur: Ot(e.onBlur, i.onClose),
    onClick: Ot(e.onClick, i.onClose)
  })));
}), Uw = "TooltipPortal", [RS, Hw] = Fs(Uw, {
  forceMount: void 0
}), Li = "TooltipContent", jw = /* @__PURE__ */ x.forwardRef((e, t) => {
  const n = Hw(Li, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...o } = e, s = As(Li, e.__scopeTooltip);
  return /* @__PURE__ */ x.createElement(xp, {
    present: r || s.open
  }, s.disableHoverableContent ? /* @__PURE__ */ x.createElement(Np, $e({
    side: i
  }, o, {
    ref: t
  })) : /* @__PURE__ */ x.createElement(Bw, $e({
    side: i
  }, o, {
    ref: t
  })));
}), Bw = /* @__PURE__ */ x.forwardRef((e, t) => {
  const n = As(Li, e.__scopeTooltip), r = Tp(Li, e.__scopeTooltip), i = x.useRef(null), o = Ir(t, i), [s, l] = x.useState(null), { trigger: a, onClose: u } = n, c = i.current, { onPointerInTransitChange: f } = r, p = x.useCallback(() => {
    l(null), f(!1);
  }, [
    f
  ]), h = x.useCallback((g, v) => {
    const k = g.currentTarget, m = {
      x: g.clientX,
      y: g.clientY
    }, d = Yw(m, k.getBoundingClientRect()), y = Gw(m, d), w = Qw(v.getBoundingClientRect()), S = Kw([
      ...y,
      ...w
    ]);
    l(S), f(!0);
  }, [
    f
  ]);
  return x.useEffect(() => () => p(), [
    p
  ]), x.useEffect(() => {
    if (a && c) {
      const g = (k) => h(k, c), v = (k) => h(k, a);
      return a.addEventListener("pointerleave", g), c.addEventListener("pointerleave", v), () => {
        a.removeEventListener("pointerleave", g), c.removeEventListener("pointerleave", v);
      };
    }
  }, [
    a,
    c,
    h,
    p
  ]), x.useEffect(() => {
    if (s) {
      const g = (v) => {
        const k = v.target, m = {
          x: v.clientX,
          y: v.clientY
        }, d = (a == null ? void 0 : a.contains(k)) || (c == null ? void 0 : c.contains(k)), y = !qw(m, s);
        d ? p() : y && (p(), u());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [
    a,
    c,
    s,
    u,
    p
  ]), /* @__PURE__ */ x.createElement(Np, $e({}, e, {
    ref: o
  }));
}), [Zw, FS] = Fs(Cp, {
  isInside: !1
}), Np = /* @__PURE__ */ x.forwardRef((e, t) => {
  const { __scopeTooltip: n, children: r, "aria-label": i, onEscapeKeyDown: o, onPointerDownOutside: s, ...l } = e, a = As(Li, n), u = Ep(n), { onClose: c } = a;
  return x.useEffect(() => (document.addEventListener(Rf, c), () => document.removeEventListener(Rf, c)), [
    c
  ]), x.useEffect(() => {
    if (a.trigger) {
      const f = (p) => {
        const h = p.target;
        h != null && h.contains(a.trigger) && c();
      };
      return window.addEventListener("scroll", f, {
        capture: !0
      }), () => window.removeEventListener("scroll", f, {
        capture: !0
      });
    }
  }, [
    a.trigger,
    c
  ]), /* @__PURE__ */ x.createElement(L1, {
    asChild: !0,
    disableOutsidePointerEvents: !1,
    onEscapeKeyDown: o,
    onPointerDownOutside: s,
    onFocusOutside: (f) => f.preventDefault(),
    onDismiss: c
  }, /* @__PURE__ */ x.createElement(zw, $e({
    "data-state": a.stateAttribute
  }, u, l, {
    ref: t,
    style: {
      ...l.style,
      "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
      "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
      "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
    }
  }), /* @__PURE__ */ x.createElement(ip, null, r), /* @__PURE__ */ x.createElement(Zw, {
    scope: n,
    isInside: !0
  }, /* @__PURE__ */ x.createElement(bw, {
    id: a.contentId,
    role: "tooltip"
  }, i || r))));
});
function Yw(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), o = Math.abs(t.left - e.x);
  switch (Math.min(n, r, i, o)) {
    case o:
      return "left";
    case i:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function Gw(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push({
        x: e.x - n,
        y: e.y + n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case "bottom":
      r.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y - n
      });
      break;
    case "left":
      r.push({
        x: e.x + n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case "right":
      r.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x - n,
        y: e.y + n
      });
      break;
  }
  return r;
}
function Qw(e) {
  const { top: t, right: n, bottom: r, left: i } = e;
  return [
    {
      x: i,
      y: t
    },
    {
      x: n,
      y: t
    },
    {
      x: n,
      y: r
    },
    {
      x: i,
      y: r
    }
  ];
}
function qw(e, t) {
  const { x: n, y: r } = e;
  let i = !1;
  for (let o = 0, s = t.length - 1; o < t.length; s = o++) {
    const l = t[o].x, a = t[o].y, u = t[s].x, c = t[s].y;
    a > r != c > r && n < (u - l) * (r - a) / (c - a) + l && (i = !i);
  }
  return i;
}
function Kw(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Jw(t);
}
function Jw(e) {
  if (e.length <= 1)
    return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    for (; t.length >= 2; ) {
      const o = t[t.length - 1], s = t[t.length - 2];
      if ((o.x - s.x) * (i.y - s.y) >= (o.y - s.y) * (i.x - s.x))
        t.pop();
      else
        break;
    }
    t.push(i);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const i = e[r];
    for (; n.length >= 2; ) {
      const o = n[n.length - 1], s = n[n.length - 2];
      if ((o.x - s.x) * (i.y - s.y) >= (o.y - s.y) * (i.x - s.x))
        n.pop();
      else
        break;
    }
    n.push(i);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
const Xw = Ww, eS = jw;
function _p(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = _p(e[t])) && (r && (r += " "), r += n);
    else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function tS() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = _p(e)) && (r && (r += " "), r += t);
  return r;
}
function nS() {
  for (var e = 0, t, n, r = ""; e < arguments.length; )
    (t = arguments[e++]) && (n = Op(t)) && (r && (r += " "), r += n);
  return r;
}
function Op(e) {
  if (typeof e == "string")
    return e;
  for (var t, n = "", r = 0; r < e.length; r++)
    e[r] && (t = Op(e[r])) && (n && (n += " "), n += t);
  return n;
}
var zu = "-";
function rS(e) {
  var t = oS(e), n = e.conflictingClassGroups, r = e.conflictingClassGroupModifiers, i = r === void 0 ? {} : r;
  function o(l) {
    var a = l.split(zu);
    return a[0] === "" && a.length !== 1 && a.shift(), Mp(a, t) || iS(l);
  }
  function s(l, a) {
    var u = n[l] || [];
    return a && i[l] ? [].concat(u, i[l]) : u;
  }
  return {
    getClassGroupId: o,
    getConflictingClassGroupIds: s
  };
}
function Mp(e, t) {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  var n = e[0], r = t.nextPart.get(n), i = r ? Mp(e.slice(1), r) : void 0;
  if (i)
    return i;
  if (t.validators.length !== 0) {
    var o = e.join(zu);
    return (s = t.validators.find(function(l) {
      var a = l.validator;
      return a(o);
    })) == null ? void 0 : s.classGroupId;
  }
}
var Af = /^\[(.+)\]$/;
function iS(e) {
  if (Af.test(e)) {
    var t = Af.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}
function oS(e) {
  var t = e.theme, n = e.prefix, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  }, i = lS(Object.entries(e.classGroups), n);
  return i.forEach(function(o) {
    var s = o[0], l = o[1];
    Ea(l, r, s, t);
  }), r;
}
function Ea(e, t, n, r) {
  e.forEach(function(i) {
    if (typeof i == "string") {
      var o = i === "" ? t : bf(t, i);
      o.classGroupId = n;
      return;
    }
    if (typeof i == "function") {
      if (sS(i)) {
        Ea(i(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: i,
        classGroupId: n
      });
      return;
    }
    Object.entries(i).forEach(function(s) {
      var l = s[0], a = s[1];
      Ea(a, bf(t, l), n, r);
    });
  });
}
function bf(e, t) {
  var n = e;
  return t.split(zu).forEach(function(r) {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}
function sS(e) {
  return e.isThemeGetter;
}
function lS(e, t) {
  return t ? e.map(function(n) {
    var r = n[0], i = n[1], o = i.map(function(s) {
      return typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(function(l) {
        var a = l[0], u = l[1];
        return [t + a, u];
      })) : s;
    });
    return [r, o];
  }) : e;
}
function aS(e) {
  if (e < 1)
    return {
      get: function() {
      },
      set: function() {
      }
    };
  var t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function i(o, s) {
    n.set(o, s), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  }
  return {
    get: function(s) {
      var l = n.get(s);
      if (l !== void 0)
        return l;
      if ((l = r.get(s)) !== void 0)
        return i(s, l), l;
    },
    set: function(s, l) {
      n.has(s) ? n.set(s, l) : i(s, l);
    }
  };
}
var Dp = "!";
function uS(e) {
  var t = e.separator || ":", n = t.length === 1, r = t[0], i = t.length;
  return function(s) {
    for (var l = [], a = 0, u = 0, c, f = 0; f < s.length; f++) {
      var p = s[f];
      if (a === 0) {
        if (p === r && (n || s.slice(f, f + i) === t)) {
          l.push(s.slice(u, f)), u = f + i;
          continue;
        }
        if (p === "/") {
          c = f;
          continue;
        }
      }
      p === "[" ? a++ : p === "]" && a--;
    }
    var h = l.length === 0 ? s : s.substring(u), g = h.startsWith(Dp), v = g ? h.substring(1) : h, k = c && c > u ? c - u : void 0;
    return {
      modifiers: l,
      hasImportantModifier: g,
      baseClassName: v,
      maybePostfixModifierPosition: k
    };
  };
}
function cS(e) {
  if (e.length <= 1)
    return e;
  var t = [], n = [];
  return e.forEach(function(r) {
    var i = r[0] === "[";
    i ? (t.push.apply(t, n.sort().concat([r])), n = []) : n.push(r);
  }), t.push.apply(t, n.sort()), t;
}
function fS(e) {
  return {
    cache: aS(e.cacheSize),
    splitModifiers: uS(e),
    ...rS(e)
  };
}
var dS = /\s+/;
function hS(e, t) {
  var n = t.splitModifiers, r = t.getClassGroupId, i = t.getConflictingClassGroupIds, o = /* @__PURE__ */ new Set();
  return e.trim().split(dS).map(function(s) {
    var l = n(s), a = l.modifiers, u = l.hasImportantModifier, c = l.baseClassName, f = l.maybePostfixModifierPosition, p = r(f ? c.substring(0, f) : c), h = !!f;
    if (!p) {
      if (!f)
        return {
          isTailwindClass: !1,
          originalClassName: s
        };
      if (p = r(c), !p)
        return {
          isTailwindClass: !1,
          originalClassName: s
        };
      h = !1;
    }
    var g = cS(a).join(":"), v = u ? g + Dp : g;
    return {
      isTailwindClass: !0,
      modifierId: v,
      classGroupId: p,
      originalClassName: s,
      hasPostfixModifier: h
    };
  }).reverse().filter(function(s) {
    if (!s.isTailwindClass)
      return !0;
    var l = s.modifierId, a = s.classGroupId, u = s.hasPostfixModifier, c = l + a;
    return o.has(c) ? !1 : (o.add(c), i(a, u).forEach(function(f) {
      return o.add(l + f);
    }), !0);
  }).reverse().map(function(s) {
    return s.originalClassName;
  }).join(" ");
}
function mS() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r, i, o, s = l;
  function l(u) {
    var c = t[0], f = t.slice(1), p = f.reduce(function(h, g) {
      return g(h);
    }, c());
    return r = fS(p), i = r.cache.get, o = r.cache.set, s = a, a(u);
  }
  function a(u) {
    var c = i(u);
    if (c)
      return c;
    var f = hS(u, r);
    return o(u, f), f;
  }
  return function() {
    return s(nS.apply(null, arguments));
  };
}
function te(e) {
  var t = function(r) {
    return r[e] || [];
  };
  return t.isThemeGetter = !0, t;
}
var $p = /^\[(?:([a-z-]+):)?(.+)\]$/i, pS = /^\d+\/\d+$/, yS = /* @__PURE__ */ new Set(["px", "full", "screen"]), gS = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, vS = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, wS = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function ct(e) {
  return $n(e) || yS.has(e) || pS.test(e) || Ta(e);
}
function Ta(e) {
  return Bn(e, "length", CS);
}
function SS(e) {
  return Bn(e, "size", Pp);
}
function kS(e) {
  return Bn(e, "position", Pp);
}
function xS(e) {
  return Bn(e, "url", NS);
}
function So(e) {
  return Bn(e, "number", $n);
}
function $n(e) {
  return !Number.isNaN(Number(e));
}
function ES(e) {
  return e.endsWith("%") && $n(e.slice(0, -1));
}
function Qr(e) {
  return Vf(e) || Bn(e, "number", Vf);
}
function b(e) {
  return $p.test(e);
}
function qr() {
  return !0;
}
function Yt(e) {
  return gS.test(e);
}
function TS(e) {
  return Bn(e, "", _S);
}
function Bn(e, t, n) {
  var r = $p.exec(e);
  return r ? r[1] ? r[1] === t : n(r[2]) : !1;
}
function CS(e) {
  return vS.test(e);
}
function Pp() {
  return !1;
}
function NS(e) {
  return e.startsWith("url(");
}
function Vf(e) {
  return Number.isInteger(Number(e));
}
function _S(e) {
  return wS.test(e);
}
function OS() {
  var e = te("colors"), t = te("spacing"), n = te("blur"), r = te("brightness"), i = te("borderColor"), o = te("borderRadius"), s = te("borderSpacing"), l = te("borderWidth"), a = te("contrast"), u = te("grayscale"), c = te("hueRotate"), f = te("invert"), p = te("gap"), h = te("gradientColorStops"), g = te("gradientColorStopPositions"), v = te("inset"), k = te("margin"), m = te("opacity"), d = te("padding"), y = te("saturate"), w = te("scale"), S = te("sepia"), E = te("skew"), N = te("space"), T = te("translate"), L = function() {
    return ["auto", "contain", "none"];
  }, $ = function() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  }, H = function() {
    return ["auto", b, t];
  }, I = function() {
    return [b, t];
  }, he = function() {
    return ["", ct];
  }, Z = function() {
    return ["auto", $n, b];
  }, J = function() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  }, X = function() {
    return ["solid", "dashed", "dotted", "double", "none"];
  }, W = function() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  }, _ = function() {
    return ["start", "end", "center", "between", "around", "evenly", "stretch"];
  }, P = function() {
    return ["", "0", b];
  }, F = function() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  }, B = function() {
    return [$n, So];
  }, ee = function() {
    return [$n, b];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [qr],
      spacing: [ct],
      blur: ["none", "", Yt, b],
      brightness: B(),
      borderColor: [e],
      borderRadius: ["none", "", "full", Yt, b],
      borderSpacing: I(),
      borderWidth: he(),
      contrast: B(),
      grayscale: P(),
      hueRotate: ee(),
      invert: P(),
      gap: I(),
      gradientColorStops: [e],
      gradientColorStopPositions: [ES, Ta],
      inset: H(),
      margin: H(),
      opacity: B(),
      padding: I(),
      saturate: B(),
      scale: B(),
      sepia: P(),
      skew: ee(),
      space: I(),
      translate: I()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", b]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Yt]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": F()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": F()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [].concat(J(), [b])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: $()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": $()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": $()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: L()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": L()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": L()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [v]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [v]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [v]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [v]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [v]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [v]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [v]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [v]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [v]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Qr]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: H()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", b]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: P()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: P()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Qr]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [qr]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Qr]
        }, b]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Z()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Z()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [qr]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Qr]
        }, b]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Z()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Z()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", b]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", b]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [p]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [p]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [p]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal"].concat(_())
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal"].concat(_(), ["baseline"])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [].concat(_(), ["baseline"])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [d]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [d]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [d]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [d]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [d]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [d]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [d]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [d]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [d]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [k]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [k]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [k]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [k]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [k]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [k]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [k]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [k]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [k]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [N]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [N]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", b, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", b, ct]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [Yt]
        }, Yt, b]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [b, t, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", b, ct]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [b, t, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Yt, Ta]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", So]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [qr]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", b]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", $n, So]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", b, ct]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", b]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", b]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [m]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [m]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [].concat(X(), ["wavy"])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ct]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", b, ct]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: I()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", b]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", b]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [m]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [].concat(J(), [kS])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", SS]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, xS]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [g]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [g]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [g]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [h]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [h]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [h]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [o]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [o]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [o]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [o]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [o]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [o]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [o]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [o]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [o]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [o]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [o]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [o]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [o]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [o]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [o]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [l]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [l]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [l]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [l]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [l]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [l]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [l]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [l]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [l]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [m]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [].concat(X(), ["hidden"])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [l]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [l]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [m]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: X()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [i]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [i]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [i]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [i]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [i]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [i]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [i]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [i]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [""].concat(X())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [b, ct]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ct]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: he()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [m]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ct]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", Yt, TS]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [qr]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [m]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": W()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": W()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [a]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", Yt, b]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [c]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [f]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [y]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [S]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [a]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [c]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [f]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [m]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [y]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [S]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [s]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [s]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", b]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: ee()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", b]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: ee()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", b]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [w]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [w]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [w]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Qr, b]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [T]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [T]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [E]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [E]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", b]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ["appearance-none"],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", b]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": I()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": I()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": I()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": I()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": I()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": I()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": I()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": I()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": I()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": I()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": I()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": I()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": I()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": I()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": I()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": I()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": I()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": I()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", b]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ct, So]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var MS = /* @__PURE__ */ mS(OS);
const Ip = (...e) => MS(tS(...e));
var Lp = "/Users/richardguerre/Projects/flow/packages/ui/Tooltip.tsx";
x.forwardRef((e, t) => /* @__PURE__ */ Pt.createElement(Xw, { ref: t, ...e, className: Ip("leading-none", e.className), __self: void 0, __source: {
  fileName: Lp,
  lineNumber: 10,
  columnNumber: 19
} }));
const Sl = x.forwardRef((e, t) => /* @__PURE__ */ Pt.createElement(eS, { ref: t, ...e, sideOffset: e.sideOffset ?? 4, className: Ip("bg-background-50 animate-fade-in animate-duration-100 text-foreground-900 ring-0.5 ring-primary-100 z-50 rounded p-1 text-sm shadow-md", e.className), "un-cloak": !0, __self: void 0, __source: {
  fileName: Lp,
  lineNumber: 15,
  columnNumber: 3
} })), DS = "numTasksPerBatch";
var q = "/Users/richardguerre/Projects/flow/plugins/repeating-tasks/src/web.tsx";
const AS = Bp((e) => {
  const t = e.React, n = e.components, r = () => Date.now().toString(), i = () => {
    const s = e.operations.useLazyQuery({
      operationName: "repeatingTasks"
    }), l = (s == null ? void 0 : s.data) ?? [], [a, u] = t.useState(!1), c = async (h) => {
      await e.toast.promise(e.operations.mutation({
        operationName: "setRepeatingTasks",
        input: {
          repeatingTasks: h,
          currentDate: (/* @__PURE__ */ new Date()).toISOString()
        }
      }), {
        loading: "Updating repeating tasks...",
        error: "Failed to update repeating tasks",
        success: "Repeating tasks updated"
      });
    }, f = async (h, g) => {
      if (g)
        console.log("adding new task"), await c([...l, {
          ...h,
          id: r()
        }]), u(!1);
      else {
        console.log("updating task");
        const v = l.map((k) => k.id !== h.id ? k : h);
        await c(v);
      }
    }, p = (h) => {
      console.log("deleting task"), c(l.filter((g) => g.id !== h));
    };
    return /* @__PURE__ */ t.createElement("div", { className: "flex gap-4 flex-wrap items-start", __self: void 0, __source: {
      fileName: q,
      lineNumber: 63,
      columnNumber: 7
    } }, l.map((h) => /* @__PURE__ */ t.createElement(o, { key: h.id, task: h, onChange: (g) => f(g), onDelete: () => p(h.id), __self: void 0, __source: {
      fileName: q,
      lineNumber: 65,
      columnNumber: 11
    } })), a ? /* @__PURE__ */ t.createElement(o, { onChange: (h) => f(h, !0), autoFocus: !0, __self: void 0, __source: {
      fileName: q,
      lineNumber: 73,
      columnNumber: 11
    } }) : /* @__PURE__ */ t.createElement(n.Tooltip, { __self: void 0, __source: {
      fileName: q,
      lineNumber: 75,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(n.TooltipTrigger, { __self: void 0, __source: {
      fileName: q,
      lineNumber: 76,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement("button", { onClick: () => u(!0), className: "flex items-center justify-center text-sm bg-background-200 text-foreground-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 w-64 min-h-18 gap-2 rounded-md p-3 shadow-md", __self: void 0, __source: {
      fileName: q,
      lineNumber: 77,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement(w0, { __self: void 0, __source: {
      fileName: q,
      lineNumber: 81,
      columnNumber: 17
    } }), "New repeating task")), /* @__PURE__ */ t.createElement(Sl, { side: "bottom", __self: void 0, __source: {
      fileName: q,
      lineNumber: 85,
      columnNumber: 13
    } }, "Create a new repeating task")));
  }, o = (s) => {
    var k, m, d, y;
    const [l, a] = t.useState(!1), u = t.useRef(), {
      register: c,
      control: f,
      handleSubmit: p,
      watch: h
    } = e.reactHookForm.useForm({
      defaultValues: {
        title: ((k = s.task) == null ? void 0 : k.title) ?? "",
        durationInMinutes: (m = s.task) == null ? void 0 : m.durationInMinutes,
        // cron for every day at midnight
        cron: ((d = s.task) == null ? void 0 : d.cron) ?? "0 0 * * *",
        enabled: ((y = s.task) == null ? void 0 : y.enabled) ?? !0
      }
    }), g = (w) => {
      l || (u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        var S;
        s.onChange({
          id: (S = s.task) == null ? void 0 : S.id,
          ...w
        });
      }, 1e3));
    }, v = (w) => {
      u.current && clearTimeout(u.current), w.cron && (u.current = setTimeout(() => {
        var S;
        e.toast.error(((S = w.cron) == null ? void 0 : S.message) ?? "Invalid cron expression");
      }, 1e3));
    };
    return t.useEffect(() => {
      const w = h(() => p(g, v)());
      return () => w.unsubscribe();
    }, [p, h, l]), /* @__PURE__ */ t.createElement("form", { className: "bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-md p-3 shadow-lg w-64", onSubmit: p(g, v), __self: void 0, __source: {
      fileName: q,
      lineNumber: 135,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "title", control: f, render: ({
      field: w
    }) => {
      var S;
      return /* @__PURE__ */ t.createElement(n.TaskTitleInput, { initialValue: (S = s.task) == null ? void 0 : S.title, onSave: w.onChange, onCancel: w.onBlur, autoFocus: s.autoFocus, __self: void 0, __source: {
        fileName: q,
        lineNumber: 143,
        columnNumber: 13
      } });
    }, rules: {
      required: !0
    }, __self: void 0, __source: {
      fileName: q,
      lineNumber: 139,
      columnNumber: 9
    } }), /* @__PURE__ */ t.createElement("div", { className: "flex gap-2", __self: void 0, __source: {
      fileName: q,
      lineNumber: 152,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement("input", { type: "text", className: "bg-transparent border-none text-foreground-700 focus:ring-0 active:ring-0 focus:outline-none w-full font-mono", ...c("cron", {
      required: !0,
      validate: {
        parse: (w) => Object.keys(e0.parseString(w).errors).length === 0 || "Invalid cron expression"
      }
    }), __self: void 0, __source: {
      fileName: q,
      lineNumber: 153,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "durationInMinutes", control: f, render: ({
      field: w
    }) => /* @__PURE__ */ t.createElement(n.TaskDurationButtonDropdown, { value: w.value, onChange: w.onChange, showByDefault: !0, __self: void 0, __source: {
      fileName: q,
      lineNumber: 169,
      columnNumber: 15
    } }), __self: void 0, __source: {
      fileName: q,
      lineNumber: 165,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { control: f, name: "enabled", render: ({
      field: w
    }) => /* @__PURE__ */ t.createElement(n.Tooltip, { __self: void 0, __source: {
      fileName: q,
      lineNumber: 180,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement(n.TooltipTrigger, { __self: void 0, __source: {
      fileName: q,
      lineNumber: 181,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement("button", { onClick: () => w.onChange(!w.value), className: e.tw("flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm", w.value ? "bg-primary-100 text-primary-600 hover:bg-primary-300 active:bg-primary-200" : "bg-background-200 text-foreground-700 hover:bg-background-200 active:bg-primary-200"), __self: void 0, __source: {
      fileName: q,
      lineNumber: 182,
      columnNumber: 19
    } }, /* @__PURE__ */ t.createElement(v0, { __self: void 0, __source: {
      fileName: q,
      lineNumber: 191,
      columnNumber: 21
    } }))), /* @__PURE__ */ t.createElement(Sl, { side: "bottom", __self: void 0, __source: {
      fileName: q,
      lineNumber: 194,
      columnNumber: 17
    } }, "Whether this repating task is enabled? If disabled all future tasks after today will be deleted.")), __self: void 0, __source: {
      fileName: q,
      lineNumber: 176,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(n.Tooltip, { __self: void 0, __source: {
      fileName: q,
      lineNumber: 201,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(n.TooltipTrigger, { __self: void 0, __source: {
      fileName: q,
      lineNumber: 202,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement("button", { onClick: () => {
      var w;
      a(!0), (w = s.onDelete) == null || w.call(s);
    }, className: "flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm bg-background-200 text-foreground-700 hover:bg-negative-100 hover:text-negative-600 active:bg-negative-200", __self: void 0, __source: {
      fileName: q,
      lineNumber: 203,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement(S0, { size: 16, __self: void 0, __source: {
      fileName: q,
      lineNumber: 210,
      columnNumber: 17
    } }))), /* @__PURE__ */ t.createElement(Sl, { side: "bottom", __self: void 0, __source: {
      fileName: q,
      lineNumber: 213,
      columnNumber: 13
    } }, "Delete"))));
  };
  return {
    name: "Repeating tasks",
    settings: {
      [DS]: {
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
        render: () => /* @__PURE__ */ t.createElement(i, { __self: void 0, __source: {
          fileName: q,
          lineNumber: 234,
          columnNumber: 23
        } })
      }
    }
  };
});
export {
  AS as default
};
