const Up = (e) => ({ plugin: e });
function Af(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ze = {};
Object.defineProperty(Ze, "__esModule", { value: !0 });
class Wn extends Error {
}
class Wp extends Wn {
  constructor(t) {
    super(`Invalid DateTime: ${t.toMessage()}`);
  }
}
class jp extends Wn {
  constructor(t) {
    super(`Invalid Interval: ${t.toMessage()}`);
  }
}
class Hp extends Wn {
  constructor(t) {
    super(`Invalid Duration: ${t.toMessage()}`);
  }
}
class Qr extends Wn {
}
class bf extends Wn {
  constructor(t) {
    super(`Invalid unit ${t}`);
  }
}
class qe extends Wn {
}
class jt extends Wn {
  constructor() {
    super("Zone is an abstract class");
  }
}
const O = "numeric", pt = "short", We = "long", zo = {
  year: O,
  month: O,
  day: O
}, Vf = {
  year: O,
  month: pt,
  day: O
}, Bp = {
  year: O,
  month: pt,
  day: O,
  weekday: pt
}, Uf = {
  year: O,
  month: We,
  day: O
}, Wf = {
  year: O,
  month: We,
  day: O,
  weekday: We
}, jf = {
  hour: O,
  minute: O
}, Hf = {
  hour: O,
  minute: O,
  second: O
}, Bf = {
  hour: O,
  minute: O,
  second: O,
  timeZoneName: pt
}, Zf = {
  hour: O,
  minute: O,
  second: O,
  timeZoneName: We
}, Gf = {
  hour: O,
  minute: O,
  hourCycle: "h23"
}, Yf = {
  hour: O,
  minute: O,
  second: O,
  hourCycle: "h23"
}, Qf = {
  hour: O,
  minute: O,
  second: O,
  hourCycle: "h23",
  timeZoneName: pt
}, qf = {
  hour: O,
  minute: O,
  second: O,
  hourCycle: "h23",
  timeZoneName: We
}, Kf = {
  year: O,
  month: O,
  day: O,
  hour: O,
  minute: O
}, Jf = {
  year: O,
  month: O,
  day: O,
  hour: O,
  minute: O,
  second: O
}, Xf = {
  year: O,
  month: pt,
  day: O,
  hour: O,
  minute: O
}, ed = {
  year: O,
  month: pt,
  day: O,
  hour: O,
  minute: O,
  second: O
}, Zp = {
  year: O,
  month: pt,
  day: O,
  weekday: pt,
  hour: O,
  minute: O
}, td = {
  year: O,
  month: We,
  day: O,
  hour: O,
  minute: O,
  timeZoneName: pt
}, nd = {
  year: O,
  month: We,
  day: O,
  hour: O,
  minute: O,
  second: O,
  timeZoneName: pt
}, rd = {
  year: O,
  month: We,
  day: O,
  weekday: We,
  hour: O,
  minute: O,
  timeZoneName: We
}, id = {
  year: O,
  month: We,
  day: O,
  weekday: We,
  hour: O,
  minute: O,
  second: O,
  timeZoneName: We
};
class Cr {
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
let Vs = null;
class Li extends Cr {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return Vs === null && (Vs = new Li()), Vs;
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
    return ld(t, n, r);
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
let xo = {};
function Gp(e) {
  return xo[e] || (xo[e] = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  })), xo[e];
}
const Yp = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function Qp(e, t) {
  const n = e.format(t).replace(/\u200E/g, ""), r = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n), [, i, o, s, l, a, u, c] = r;
  return [s, i, o, l, a, u, c];
}
function qp(e, t) {
  const n = e.formatToParts(t), r = [];
  for (let i = 0; i < n.length; i++) {
    const {
      type: o,
      value: s
    } = n[i], l = Yp[o];
    o === "era" ? r[l] = s : W(l) || (r[l] = parseInt(s, 10));
  }
  return r;
}
let Gi = {};
class kt extends Cr {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(t) {
    return Gi[t] || (Gi[t] = new kt(t)), Gi[t];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    Gi = {}, xo = {};
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
    super(), this.zoneName = t, this.valid = kt.isValidZone(t);
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
    return ld(t, n, r, this.name);
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
    const r = Gp(this.name);
    let [i, o, s, l, a, u, c] = r.formatToParts ? qp(r, n) : Qp(r, n);
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
    const y = h % 1e3;
    return h -= y >= 0 ? y : 1e3 + y, (p - h) / (60 * 1e3);
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
let Au = {};
function Kp(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let r = Au[n];
  return r || (r = new Intl.ListFormat(e, t), Au[n] = r), r;
}
let Sl = {};
function kl(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let r = Sl[n];
  return r || (r = new Intl.DateTimeFormat(e, t), Sl[n] = r), r;
}
let El = {};
function Jp(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let r = El[n];
  return r || (r = new Intl.NumberFormat(e, t), El[n] = r), r;
}
let Tl = {};
function Xp(e, t = {}) {
  const {
    base: n,
    ...r
  } = t, i = JSON.stringify([e, r]);
  let o = Tl[i];
  return o || (o = new Intl.RelativeTimeFormat(e, t), Tl[i] = o), o;
}
let qr = null;
function e0() {
  return qr || (qr = new Intl.DateTimeFormat().resolvedOptions().locale, qr);
}
function t0(e) {
  const t = e.indexOf("-x-");
  t !== -1 && (e = e.substring(0, t));
  const n = e.indexOf("-u-");
  if (n === -1)
    return [e];
  {
    let r, i;
    try {
      r = kl(e).resolvedOptions(), i = e;
    } catch {
      const a = e.substring(0, n);
      r = kl(a).resolvedOptions(), i = a;
    }
    const {
      numberingSystem: o,
      calendar: s
    } = r;
    return [i, o, s];
  }
}
function n0(e, t, n) {
  return (n || t) && (e.includes("-u-") || (e += "-u"), n && (e += `-ca-${n}`), t && (e += `-nu-${t}`)), e;
}
function r0(e) {
  const t = [];
  for (let n = 1; n <= 12; n++) {
    const r = F.utc(2009, n, 1);
    t.push(e(r));
  }
  return t;
}
function i0(e) {
  const t = [];
  for (let n = 1; n <= 7; n++) {
    const r = F.utc(2016, 11, 13 + n);
    t.push(e(r));
  }
  return t;
}
function Yi(e, t, n, r) {
  const i = e.listingMode();
  return i === "error" ? null : i === "en" ? n(t) : r(t);
}
function o0(e) {
  return e.numberingSystem && e.numberingSystem !== "latn" ? !1 : e.numberingSystem === "latn" || !e.locale || e.locale.startsWith("en") || new Intl.DateTimeFormat(e.intl).resolvedOptions().numberingSystem === "latn";
}
class s0 {
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
      r.padTo > 0 && (l.minimumIntegerDigits = r.padTo), this.inf = Jp(t, l);
    }
  }
  format(t) {
    if (this.inf) {
      const n = this.floor ? Math.floor(t) : t;
      return this.inf.format(n);
    } else {
      const n = this.floor ? Math.floor(t) : Ma(t, 3);
      return he(n, this.padTo);
    }
  }
}
class l0 {
  constructor(t, n, r) {
    this.opts = r, this.originalZone = void 0;
    let i;
    if (this.opts.timeZone)
      this.dt = t;
    else if (t.zone.type === "fixed") {
      const s = -1 * (t.offset / 60), l = s >= 0 ? `Etc/GMT+${s}` : `Etc/GMT${s}`;
      t.offset !== 0 && kt.create(l).valid ? (i = l, this.dt = t) : (i = "UTC", this.dt = t.offset === 0 ? t : t.setZone("UTC").plus({
        minutes: t.offset
      }), this.originalZone = t.zone);
    } else
      t.zone.type === "system" ? this.dt = t : t.zone.type === "iana" ? (this.dt = t, i = t.zone.name) : (i = "UTC", this.dt = t.setZone("UTC").plus({
        minutes: t.offset
      }), this.originalZone = t.zone);
    const o = {
      ...this.opts
    };
    o.timeZone = o.timeZone || i, this.dtf = kl(n, o);
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
class a0 {
  constructor(t, n, r) {
    this.opts = {
      style: "long",
      ...r
    }, !n && sd() && (this.rtf = Xp(t, r));
  }
  format(t, n) {
    return this.rtf ? this.rtf.format(t, n) : T0(n, t, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(t, n) {
    return this.rtf ? this.rtf.formatToParts(t, n) : [];
  }
}
class ee {
  static fromOpts(t) {
    return ee.create(t.locale, t.numberingSystem, t.outputCalendar, t.defaultToEN);
  }
  static create(t, n, r, i = !1) {
    const o = t || ce.defaultLocale, s = o || (i ? "en-US" : e0()), l = n || ce.defaultNumberingSystem, a = r || ce.defaultOutputCalendar;
    return new ee(s, l, a, o);
  }
  static resetCache() {
    qr = null, Sl = {}, El = {}, Tl = {};
  }
  static fromObject({
    locale: t,
    numberingSystem: n,
    outputCalendar: r
  } = {}) {
    return ee.create(t, n, r);
  }
  constructor(t, n, r, i) {
    const [o, s, l] = t0(t);
    this.locale = o, this.numberingSystem = n || s || null, this.outputCalendar = r || l || null, this.intl = n0(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = {
      format: {},
      standalone: {}
    }, this.monthsCache = {
      format: {},
      standalone: {}
    }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = i, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = o0(this)), this.fastNumbersCached;
  }
  listingMode() {
    const t = this.isEnglish(), n = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return t && n ? "en" : "intl";
  }
  clone(t) {
    return !t || Object.getOwnPropertyNames(t).length === 0 ? this : ee.create(t.locale || this.specifiedLocale, t.numberingSystem || this.numberingSystem, t.outputCalendar || this.outputCalendar, t.defaultToEN || !1);
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
    return Yi(this, t, cd, () => {
      const r = n ? {
        month: t,
        day: "numeric"
      } : {
        month: t
      }, i = n ? "format" : "standalone";
      return this.monthsCache[i][t] || (this.monthsCache[i][t] = r0((o) => this.extract(o, r, "month"))), this.monthsCache[i][t];
    });
  }
  weekdays(t, n = !1) {
    return Yi(this, t, hd, () => {
      const r = n ? {
        weekday: t,
        year: "numeric",
        month: "long",
        day: "numeric"
      } : {
        weekday: t
      }, i = n ? "format" : "standalone";
      return this.weekdaysCache[i][t] || (this.weekdaysCache[i][t] = i0((o) => this.extract(o, r, "weekday"))), this.weekdaysCache[i][t];
    });
  }
  meridiems() {
    return Yi(this, void 0, () => md, () => {
      if (!this.meridiemCache) {
        const t = {
          hour: "numeric",
          hourCycle: "h12"
        };
        this.meridiemCache = [F.utc(2016, 11, 13, 9), F.utc(2016, 11, 13, 19)].map((n) => this.extract(n, t, "dayperiod"));
      }
      return this.meridiemCache;
    });
  }
  eras(t) {
    return Yi(this, t, pd, () => {
      const n = {
        era: t
      };
      return this.eraCache[t] || (this.eraCache[t] = [F.utc(-40, 1, 1), F.utc(2017, 1, 1)].map((r) => this.extract(r, n, "era"))), this.eraCache[t];
    });
  }
  extract(t, n, r) {
    const i = this.dtFormatter(t, n), o = i.formatToParts(), s = o.find((l) => l.type.toLowerCase() === r);
    return s ? s.value : null;
  }
  numberFormatter(t = {}) {
    return new s0(this.intl, t.forceSimple || this.fastNumbers, t);
  }
  dtFormatter(t, n = {}) {
    return new l0(t, this.intl, n);
  }
  relFormatter(t = {}) {
    return new a0(this.intl, this.isEnglish(), t);
  }
  listFormatter(t = {}) {
    return Kp(this.intl, t);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  }
  equals(t) {
    return this.locale === t.locale && this.numberingSystem === t.numberingSystem && this.outputCalendar === t.outputCalendar;
  }
}
let Us = null;
class Ne extends Cr {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return Us === null && (Us = new Ne(0)), Us;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(t) {
    return t === 0 ? Ne.utcInstance : new Ne(t);
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
        return new Ne(vs(n[1], n[2]));
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
class od extends Cr {
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
function qt(e, t) {
  if (W(e) || e === null)
    return t;
  if (e instanceof Cr)
    return e;
  if (u0(e)) {
    const n = e.toLowerCase();
    return n === "default" ? t : n === "local" || n === "system" ? Li.instance : n === "utc" || n === "gmt" ? Ne.utcInstance : Ne.parseSpecifier(n) || kt.create(e);
  } else
    return Pn(e) ? Ne.instance(e) : typeof e == "object" && "offset" in e && typeof e.offset == "function" ? e : new od(e);
}
let bu = () => Date.now(), Vu = "system", Uu = null, Wu = null, ju = null, Hu = 60, Bu;
class ce {
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
    return qt(Vu, Li.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return Uu;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(t) {
    Uu = t;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return Wu;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(t) {
    Wu = t;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return ju;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(t) {
    ju = t;
  }
  /**
   * Get the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return Hu;
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
    Hu = t % 100;
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
    ee.resetCache(), kt.resetCache();
  }
}
function W(e) {
  return typeof e > "u";
}
function Pn(e) {
  return typeof e == "number";
}
function gs(e) {
  return typeof e == "number" && e % 1 === 0;
}
function u0(e) {
  return typeof e == "string";
}
function c0(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function sd() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function f0(e) {
  return Array.isArray(e) ? e : [e];
}
function Zu(e, t, n) {
  if (e.length !== 0)
    return e.reduce((r, i) => {
      const o = [t(i), i];
      return r && n(r[0], o[0]) === r[0] ? r : o;
    }, null)[1];
}
function d0(e, t) {
  return t.reduce((n, r) => (n[r] = e[r], n), {});
}
function pr(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ot(e, t, n) {
  return gs(e) && e >= t && e <= n;
}
function h0(e, t) {
  return e - t * Math.floor(e / t);
}
function he(e, t = 2) {
  const n = e < 0;
  let r;
  return n ? r = "-" + ("" + -e).padStart(t, "0") : r = ("" + e).padStart(t, "0"), r;
}
function Gt(e) {
  if (!(W(e) || e === null || e === ""))
    return parseInt(e, 10);
}
function Sn(e) {
  if (!(W(e) || e === null || e === ""))
    return parseFloat(e);
}
function Oa(e) {
  if (!(W(e) || e === null || e === "")) {
    const t = parseFloat("0." + e) * 1e3;
    return Math.floor(t);
  }
}
function Ma(e, t, n = !1) {
  const r = 10 ** t;
  return (n ? Math.trunc : Math.round)(e * r) / r;
}
function zi(e) {
  return e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0);
}
function ni(e) {
  return zi(e) ? 366 : 365;
}
function Ro(e, t) {
  const n = h0(t - 1, 12) + 1, r = e + (t - n) / 12;
  return n === 2 ? zi(r) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}
function ys(e) {
  let t = Date.UTC(e.year, e.month - 1, e.day, e.hour, e.minute, e.second, e.millisecond);
  return e.year < 100 && e.year >= 0 && (t = new Date(t), t.setUTCFullYear(e.year, e.month - 1, e.day)), +t;
}
function Fo(e) {
  const t = (e + Math.floor(e / 4) - Math.floor(e / 100) + Math.floor(e / 400)) % 7, n = e - 1, r = (n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400)) % 7;
  return t === 4 || r === 3 ? 53 : 52;
}
function Cl(e) {
  return e > 99 ? e : e > ce.twoDigitCutoffYear ? 1900 + e : 2e3 + e;
}
function ld(e, t, n, r = null) {
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
function vs(e, t) {
  let n = parseInt(e, 10);
  Number.isNaN(n) && (n = 0);
  const r = parseInt(t, 10) || 0, i = n < 0 || Object.is(n, -0) ? -r : r;
  return n * 60 + i;
}
function ad(e) {
  const t = Number(e);
  if (typeof e == "boolean" || e === "" || Number.isNaN(t))
    throw new qe(`Invalid unit value ${e}`);
  return t;
}
function Ao(e, t) {
  const n = {};
  for (const r in e)
    if (pr(e, r)) {
      const i = e[r];
      if (i == null)
        continue;
      n[t(r)] = ad(i);
    }
  return n;
}
function ri(e, t) {
  const n = Math.trunc(Math.abs(e / 60)), r = Math.trunc(Math.abs(e % 60)), i = e >= 0 ? "+" : "-";
  switch (t) {
    case "short":
      return `${i}${he(n, 2)}:${he(r, 2)}`;
    case "narrow":
      return `${i}${n}${r > 0 ? `:${r}` : ""}`;
    case "techie":
      return `${i}${he(n, 2)}${he(r, 2)}`;
    default:
      throw new RangeError(`Value format ${t} is out of range for property format`);
  }
}
function ws(e) {
  return d0(e, ["hour", "minute", "second", "millisecond"]);
}
const m0 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ud = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], p0 = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function cd(e) {
  switch (e) {
    case "narrow":
      return [...p0];
    case "short":
      return [...ud];
    case "long":
      return [...m0];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const fd = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], dd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], g0 = ["M", "T", "W", "T", "F", "S", "S"];
function hd(e) {
  switch (e) {
    case "narrow":
      return [...g0];
    case "short":
      return [...dd];
    case "long":
      return [...fd];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const md = ["AM", "PM"], y0 = ["Before Christ", "Anno Domini"], v0 = ["BC", "AD"], w0 = ["B", "A"];
function pd(e) {
  switch (e) {
    case "narrow":
      return [...w0];
    case "short":
      return [...v0];
    case "long":
      return [...y0];
    default:
      return null;
  }
}
function x0(e) {
  return md[e.hour < 12 ? 0 : 1];
}
function S0(e, t) {
  return hd(t)[e.weekday - 1];
}
function k0(e, t) {
  return cd(t)[e.month - 1];
}
function E0(e, t) {
  return pd(t)[e.year < 0 ? 0 : 1];
}
function T0(e, t, n = "always", r = !1) {
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
function Gu(e, t) {
  let n = "";
  for (const r of e)
    r.literal ? n += r.val : n += t(r.val);
  return n;
}
const C0 = {
  D: zo,
  DD: Vf,
  DDD: Uf,
  DDDD: Wf,
  t: jf,
  tt: Hf,
  ttt: Bf,
  tttt: Zf,
  T: Gf,
  TT: Yf,
  TTT: Qf,
  TTTT: qf,
  f: Kf,
  ff: Xf,
  fff: td,
  ffff: rd,
  F: Jf,
  FF: ed,
  FFF: nd,
  FFFF: id
};
class _e {
  static create(t, n = {}) {
    return new _e(t, n);
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
    return C0[t];
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
      return he(t, n);
    const r = {
      ...this.opts
    };
    return n > 0 && (r.padTo = n), this.loc.numberFormatter(r).format(t);
  }
  formatDateTimeFromString(t, n) {
    const r = this.loc.listingMode() === "en", i = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", o = (h, y) => this.loc.extract(t, h, y), s = (h) => t.isOffsetFixed && t.offset === 0 && h.allowZ ? "Z" : t.isValid ? t.zone.formatOffset(t.ts, h.format) : "", l = () => r ? x0(t) : o({
      hour: "numeric",
      hourCycle: "h12"
    }, "dayperiod"), a = (h, y) => r ? k0(t, h) : o(y ? {
      month: h
    } : {
      month: h,
      day: "numeric"
    }, "month"), u = (h, y) => r ? S0(t, h) : o(y ? {
      weekday: h
    } : {
      weekday: h,
      month: "long",
      day: "numeric"
    }, "weekday"), c = (h) => {
      const y = _e.macroTokenToFormatOpts(h);
      return y ? this.formatWithSystemDefault(t, y) : h;
    }, f = (h) => r ? E0(t, h) : o({
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
    return Gu(_e.parseFormat(n), p);
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
    }, o = _e.parseFormat(n), s = o.reduce((a, {
      literal: u,
      val: c
    }) => u ? a : a.concat(c), []), l = t.shiftTo(...s.map(r).filter((a) => a));
    return Gu(o, i(l));
  }
}
class dt {
  constructor(t, n) {
    this.reason = t, this.explanation = n;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const gd = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function _r(...e) {
  const t = e.reduce((n, r) => n + r.source, "");
  return RegExp(`^${t}$`);
}
function Nr(...e) {
  return (t) => e.reduce(([n, r, i], o) => {
    const [s, l, a] = o(t, i);
    return [{
      ...n,
      ...s
    }, l || r, a];
  }, [{}, null, 1]).slice(0, 2);
}
function Or(e, ...t) {
  if (e == null)
    return [null, null];
  for (const [n, r] of t) {
    const i = n.exec(e);
    if (i)
      return r(i);
  }
  return [null, null];
}
function yd(...e) {
  return (t, n) => {
    const r = {};
    let i;
    for (i = 0; i < e.length; i++)
      r[e[i]] = Gt(t[n + i]);
    return [r, null, n + i];
  };
}
const vd = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, _0 = `(?:${vd.source}?(?:\\[(${gd.source})\\])?)?`, Da = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, wd = RegExp(`${Da.source}${_0}`), $a = RegExp(`(?:T${wd.source})?`), N0 = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, O0 = /(\d{4})-?W(\d\d)(?:-?(\d))?/, M0 = /(\d{4})-?(\d{3})/, D0 = yd("weekYear", "weekNumber", "weekDay"), $0 = yd("year", "ordinal"), P0 = /(\d{4})-(\d\d)-(\d\d)/, xd = RegExp(`${Da.source} ?(?:${vd.source}|(${gd.source}))?`), I0 = RegExp(`(?: ${xd.source})?`);
function lr(e, t, n) {
  const r = e[t];
  return W(r) ? n : Gt(r);
}
function L0(e, t) {
  return [{
    year: lr(e, t),
    month: lr(e, t + 1, 1),
    day: lr(e, t + 2, 1)
  }, null, t + 3];
}
function Mr(e, t) {
  return [{
    hours: lr(e, t, 0),
    minutes: lr(e, t + 1, 0),
    seconds: lr(e, t + 2, 0),
    milliseconds: Oa(e[t + 3])
  }, null, t + 4];
}
function Ri(e, t) {
  const n = !e[t] && !e[t + 1], r = vs(e[t + 1], e[t + 2]), i = n ? null : Ne.instance(r);
  return [{}, i, t + 3];
}
function Fi(e, t) {
  const n = e[t] ? kt.create(e[t]) : null;
  return [{}, n, t + 1];
}
const z0 = RegExp(`^T?${Da.source}$`), R0 = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function F0(e) {
  const [t, n, r, i, o, s, l, a, u] = e, c = t[0] === "-", f = a && a[0] === "-", p = (h, y = !1) => h !== void 0 && (y || h && c) ? -h : h;
  return [{
    years: p(Sn(n)),
    months: p(Sn(r)),
    weeks: p(Sn(i)),
    days: p(Sn(o)),
    hours: p(Sn(s)),
    minutes: p(Sn(l)),
    seconds: p(Sn(a), a === "-0"),
    milliseconds: p(Oa(u), f)
  }];
}
const A0 = {
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
function Pa(e, t, n, r, i, o, s) {
  const l = {
    year: t.length === 2 ? Cl(Gt(t)) : Gt(t),
    month: ud.indexOf(n) + 1,
    day: Gt(r),
    hour: Gt(i),
    minute: Gt(o)
  };
  return s && (l.second = Gt(s)), e && (l.weekday = e.length > 3 ? fd.indexOf(e) + 1 : dd.indexOf(e) + 1), l;
}
const b0 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function V0(e) {
  const [, t, n, r, i, o, s, l, a, u, c, f] = e, p = Pa(t, i, r, n, o, s, l);
  let h;
  return a ? h = A0[a] : u ? h = 0 : h = vs(c, f), [p, new Ne(h)];
}
function U0(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const W0 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, j0 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, H0 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Yu(e) {
  const [, t, n, r, i, o, s, l] = e;
  return [Pa(t, i, r, n, o, s, l), Ne.utcInstance];
}
function B0(e) {
  const [, t, n, r, i, o, s, l] = e;
  return [Pa(t, l, n, r, i, o, s), Ne.utcInstance];
}
const Z0 = _r(N0, $a), G0 = _r(O0, $a), Y0 = _r(M0, $a), Q0 = _r(wd), Sd = Nr(L0, Mr, Ri, Fi), q0 = Nr(D0, Mr, Ri, Fi), K0 = Nr($0, Mr, Ri, Fi), J0 = Nr(Mr, Ri, Fi);
function X0(e) {
  return Or(e, [Z0, Sd], [G0, q0], [Y0, K0], [Q0, J0]);
}
function eg(e) {
  return Or(U0(e), [b0, V0]);
}
function tg(e) {
  return Or(e, [W0, Yu], [j0, Yu], [H0, B0]);
}
function ng(e) {
  return Or(e, [R0, F0]);
}
const rg = Nr(Mr);
function ig(e) {
  return Or(e, [z0, rg]);
}
const og = _r(P0, I0), sg = _r(xd), lg = Nr(Mr, Ri, Fi);
function ag(e) {
  return Or(e, [og, Sd], [sg, lg]);
}
const Qu = "Invalid Duration", kd = {
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
}, ug = {
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
  ...kd
}, Qe = 146097 / 400, Zn = 146097 / 4800, cg = {
  years: {
    quarters: 4,
    months: 12,
    weeks: Qe / 7,
    days: Qe,
    hours: Qe * 24,
    minutes: Qe * 24 * 60,
    seconds: Qe * 24 * 60 * 60,
    milliseconds: Qe * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: Qe / 28,
    days: Qe / 4,
    hours: Qe * 24 / 4,
    minutes: Qe * 24 * 60 / 4,
    seconds: Qe * 24 * 60 * 60 / 4,
    milliseconds: Qe * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: Zn / 7,
    days: Zn,
    hours: Zn * 24,
    minutes: Zn * 24 * 60,
    seconds: Zn * 24 * 60 * 60,
    milliseconds: Zn * 24 * 60 * 60 * 1e3
  },
  ...kd
}, Nn = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"], fg = Nn.slice(0).reverse();
function Ht(e, t, n = !1) {
  const r = {
    values: n ? t.values : {
      ...e.values,
      ...t.values || {}
    },
    loc: e.loc.clone(t.loc),
    conversionAccuracy: t.conversionAccuracy || e.conversionAccuracy,
    matrix: t.matrix || e.matrix
  };
  return new j(r);
}
function Ed(e, t) {
  var n;
  let r = (n = t.milliseconds) != null ? n : 0;
  for (const i of fg.slice(1))
    t[i] && (r += t[i] * e[i].milliseconds);
  return r;
}
function qu(e, t) {
  const n = Ed(e, t) < 0 ? -1 : 1;
  Nn.reduceRight((r, i) => {
    if (W(t[i]))
      return r;
    if (r) {
      const o = t[r] * n, s = e[i][r], l = Math.floor(o / s);
      t[i] += l * n, t[r] -= l * s * n;
    }
    return i;
  }, null), Nn.reduce((r, i) => {
    if (W(t[i]))
      return r;
    if (r) {
      const o = t[r] % 1;
      t[r] -= o, t[i] += o * e[r][i];
    }
    return i;
  }, null);
}
function dg(e) {
  const t = {};
  for (const [n, r] of Object.entries(e))
    r !== 0 && (t[n] = r);
  return t;
}
class j {
  /**
   * @private
   */
  constructor(t) {
    const n = t.conversionAccuracy === "longterm" || !1;
    let r = n ? cg : ug;
    t.matrix && (r = t.matrix), this.values = t.values, this.loc = t.loc || ee.create(), this.conversionAccuracy = n ? "longterm" : "casual", this.invalid = t.invalid || null, this.matrix = r, this.isLuxonDuration = !0;
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
    return j.fromObject({
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
      throw new qe(`Duration.fromObject: argument expected to be an object, got ${t === null ? "null" : typeof t}`);
    return new j({
      values: Ao(t, j.normalizeUnit),
      loc: ee.fromObject(n),
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
      return j.fromMillis(t);
    if (j.isDuration(t))
      return t;
    if (typeof t == "object")
      return j.fromObject(t);
    throw new qe(`Unknown duration argument ${t} of type ${typeof t}`);
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
    const [r] = ng(t);
    return r ? j.fromObject(r, n) : j.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
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
    const [r] = ig(t);
    return r ? j.fromObject(r, n) : j.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(t, n = null) {
    if (!t)
      throw new qe("need to specify a reason the Duration is invalid");
    const r = t instanceof dt ? t : new dt(t, n);
    if (ce.throwOnInvalid)
      throw new Hp(r);
    return new j({
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
      throw new bf(t);
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
    return this.isValid ? _e.create(this.loc, r).formatDurationFromString(this, t) : Qu;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior use the `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   * @param opts - On option object to override the formatting. Accepts the same keys as the options parameter of the native `Int.NumberFormat` constructor, as well as `listStyle`.
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
      return Qu;
    const n = Nn.map((r) => {
      const i = this.values[r];
      return W(i) ? null : this.loc.numberFormatter({
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
    return this.years !== 0 && (t += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (t += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (t += this.weeks + "W"), this.days !== 0 && (t += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (t += "T"), this.hours !== 0 && (t += this.hours + "H"), this.minutes !== 0 && (t += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (t += Ma(this.seconds + this.milliseconds / 1e3, 3) + "S"), t === "P" && (t += "T0S"), t;
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
    }, F.fromMillis(n, {
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
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? Ed(this.matrix, this.values) : NaN;
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
    const n = j.fromDurationLike(t), r = {};
    for (const i of Nn)
      (pr(n.values, i) || pr(this.values, i)) && (r[i] = n.get(i) + this.get(i));
    return Ht(this, {
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
    const n = j.fromDurationLike(t);
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
      n[r] = ad(t(this.values[r], r));
    return Ht(this, {
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
    return this[j.normalizeUnit(t)];
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
      ...Ao(t, j.normalizeUnit)
    };
    return Ht(this, {
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
    return Ht(this, s);
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
   *   the overall value would be negative, see second example)
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
    return qu(this.matrix, t), Ht(this, {
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
    const t = dg(this.normalize().shiftToAll().toObject());
    return Ht(this, {
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
    t = t.map((s) => j.normalizeUnit(s));
    const n = {}, r = {}, i = this.toObject();
    let o;
    for (const s of Nn)
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
    return qu(this.matrix, n), Ht(this, {
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
    return Ht(this, {
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
    for (const r of Nn)
      if (!n(this.values[r], t.values[r]))
        return !1;
    return !0;
  }
}
const Gn = "Invalid Interval";
function hg(e, t) {
  return !e || !e.isValid ? ie.invalid("missing or invalid start") : !t || !t.isValid ? ie.invalid("missing or invalid end") : t < e ? ie.invalid("end before start", `The end of an interval must be after its start, but you had start=${e.toISO()} and end=${t.toISO()}`) : null;
}
class ie {
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
      throw new qe("need to specify a reason the Interval is invalid");
    const r = t instanceof dt ? t : new dt(t, n);
    if (ce.throwOnInvalid)
      throw new jp(r);
    return new ie({
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
    const r = Ar(t), i = Ar(n), o = hg(r, i);
    return o ?? new ie({
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
    const r = j.fromDurationLike(n), i = Ar(t);
    return ie.fromDateTimes(i, i.plus(r));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(t, n) {
    const r = j.fromDurationLike(n), i = Ar(t);
    return ie.fromDateTimes(i.minus(r), i);
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
        o = F.fromISO(r, n), s = o.isValid;
      } catch {
        s = !1;
      }
      let l, a;
      try {
        l = F.fromISO(i, n), a = l.isValid;
      } catch {
        a = !1;
      }
      if (s && a)
        return ie.fromDateTimes(o, l);
      if (s) {
        const u = j.fromISO(i, n);
        if (u.isValid)
          return ie.after(o, u);
      } else if (a) {
        const u = j.fromISO(r, n);
        if (u.isValid)
          return ie.before(l, u);
      }
    }
    return ie.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
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
   * @return {number}
   */
  count(t = "milliseconds") {
    if (!this.isValid)
      return NaN;
    const n = this.start.startOf(t), r = this.end.startOf(t);
    return Math.floor(r.diff(n, t).get(t)) + (r.valueOf() !== this.end.valueOf());
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
    return this.isValid ? ie.fromDateTimes(t || this.s, n || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...t) {
    if (!this.isValid)
      return [];
    const n = t.map(Ar).filter((s) => this.contains(s)).sort(), r = [];
    let {
      s: i
    } = this, o = 0;
    for (; i < this.e; ) {
      const s = n[o] || this.e, l = +s > +this.e ? this.e : s;
      r.push(ie.fromDateTimes(i, l)), i = l, o += 1;
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
    const n = j.fromDurationLike(t);
    if (!this.isValid || !n.isValid || n.as("milliseconds") === 0)
      return [];
    let {
      s: r
    } = this, i = 1, o;
    const s = [];
    for (; r < this.e; ) {
      const l = this.start.plus(n.mapUnits((a) => a * i));
      o = +l > +this.e ? this.e : l, s.push(ie.fromDateTimes(r, o)), r = o, i += 1;
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
    return n >= r ? null : ie.fromDateTimes(n, r);
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
    return ie.fromDateTimes(n, r);
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
      r += a.type === "s" ? 1 : -1, r === 1 ? n = a.time : (n && +n != +a.time && i.push(ie.fromDateTimes(n, a.time)), n = null);
    return ie.merge(i);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...t) {
    return ie.xor([this].concat(t)).map((n) => this.intersection(n)).filter((n) => n && !n.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : Gn;
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
  toLocaleString(t = zo, n = {}) {
    return this.isValid ? _e.create(this.s.loc.clone(n), t).formatInterval(this) : Gn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(t) {
    return this.isValid ? `${this.s.toISO(t)}/${this.e.toISO(t)}` : Gn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : Gn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(t) {
    return this.isValid ? `${this.s.toISOTime(t)}/${this.e.toISOTime(t)}` : Gn;
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
    return this.isValid ? `${this.s.toFormat(t)}${n}${this.e.toFormat(t)}` : Gn;
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
    return this.isValid ? this.e.diff(this.s, t, n) : j.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(t) {
    return ie.fromDateTimes(t(this.s), t(this.e));
  }
}
class Kr {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(t = ce.defaultZone) {
    const n = F.now().setZone(t).set({
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
    return kt.isValidZone(t);
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
    return qt(t, ce.defaultZone);
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
    return (i || ee.create(n, r, o)).months(t);
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
    return (i || ee.create(n, r, o)).months(t, !0);
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
    return (i || ee.create(n, r, null)).weekdays(t);
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
    return (i || ee.create(n, r, null)).weekdays(t, !0);
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
    return ee.create(t).meridiems();
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
    return ee.create(n, null, "gregory").eras(t);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * @example Info.features() //=> { relative: false }
   * @return {Object}
   */
  static features() {
    return {
      relative: sd()
    };
  }
}
function Ku(e, t) {
  const n = (i) => i.toUTC(0, {
    keepLocalTime: !0
  }).startOf("day").valueOf(), r = n(t) - n(e);
  return Math.floor(j.fromMillis(r).as("days"));
}
function mg(e, t, n) {
  const r = [["years", (a, u) => u.year - a.year], ["quarters", (a, u) => u.quarter - a.quarter + (u.year - a.year) * 4], ["months", (a, u) => u.month - a.month + (u.year - a.year) * 12], ["weeks", (a, u) => {
    const c = Ku(a, u);
    return (c - c % 7) / 7;
  }], ["days", Ku]], i = {}, o = e;
  let s, l;
  for (const [a, u] of r)
    n.indexOf(a) >= 0 && (s = a, i[a] = u(e, t), l = o.plus(i), l > t ? (i[a]--, e = o.plus(i), e > t && (l = e, i[a]--, e = o.plus(i))) : e = l);
  return [e, i, l, s];
}
function pg(e, t, n, r) {
  let [i, o, s, l] = mg(e, t, n);
  const a = t - i, u = n.filter((f) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(f) >= 0);
  u.length === 0 && (s < t && (s = i.plus({
    [l]: 1
  })), s !== i && (o[l] = (o[l] || 0) + a / (s - i)));
  const c = j.fromObject(o, r);
  return u.length > 0 ? j.fromMillis(a, r).shiftTo(...u).plus(c) : c;
}
const Ia = {
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
}, Ju = {
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
}, gg = Ia.hanidec.replace(/[\[|\]]/g, "").split("");
function yg(e) {
  let t = parseInt(e, 10);
  if (isNaN(t)) {
    t = "";
    for (let n = 0; n < e.length; n++) {
      const r = e.charCodeAt(n);
      if (e[n].search(Ia.hanidec) !== -1)
        t += gg.indexOf(e[n]);
      else
        for (const i in Ju) {
          const [o, s] = Ju[i];
          r >= o && r <= s && (t += r - o);
        }
    }
    return parseInt(t, 10);
  } else
    return t;
}
function ot({
  numberingSystem: e
}, t = "") {
  return new RegExp(`${Ia[e || "latn"]}${t}`);
}
const vg = "missing Intl.DateTimeFormat.formatToParts support";
function G(e, t = (n) => n) {
  return {
    regex: e,
    deser: ([n]) => t(yg(n))
  };
}
const wg = String.fromCharCode(160), Td = `[ ${wg}]`, Cd = new RegExp(Td, "g");
function xg(e) {
  return e.replace(/\./g, "\\.?").replace(Cd, Td);
}
function Xu(e) {
  return e.replace(/\./g, "").replace(Cd, " ").toLowerCase();
}
function st(e, t) {
  return e === null ? null : {
    regex: RegExp(e.map(xg).join("|")),
    deser: ([n]) => e.findIndex((r) => Xu(n) === Xu(r)) + t
  };
}
function ec(e, t) {
  return {
    regex: e,
    deser: ([, n, r]) => vs(n, r),
    groups: t
  };
}
function Qi(e) {
  return {
    regex: e,
    deser: ([t]) => t
  };
}
function Sg(e) {
  return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function kg(e, t) {
  const n = ot(t), r = ot(t, "{2}"), i = ot(t, "{3}"), o = ot(t, "{4}"), s = ot(t, "{6}"), l = ot(t, "{1,2}"), a = ot(t, "{1,3}"), u = ot(t, "{1,6}"), c = ot(t, "{1,9}"), f = ot(t, "{2,4}"), p = ot(t, "{4,6}"), h = (S) => ({
    regex: RegExp(Sg(S.val)),
    deser: ([m]) => m,
    literal: !0
  }), v = ((S) => {
    if (e.literal)
      return h(S);
    switch (S.val) {
      case "G":
        return st(t.eras("short"), 0);
      case "GG":
        return st(t.eras("long"), 0);
      case "y":
        return G(u);
      case "yy":
        return G(f, Cl);
      case "yyyy":
        return G(o);
      case "yyyyy":
        return G(p);
      case "yyyyyy":
        return G(s);
      case "M":
        return G(l);
      case "MM":
        return G(r);
      case "MMM":
        return st(t.months("short", !0), 1);
      case "MMMM":
        return st(t.months("long", !0), 1);
      case "L":
        return G(l);
      case "LL":
        return G(r);
      case "LLL":
        return st(t.months("short", !1), 1);
      case "LLLL":
        return st(t.months("long", !1), 1);
      case "d":
        return G(l);
      case "dd":
        return G(r);
      case "o":
        return G(a);
      case "ooo":
        return G(i);
      case "HH":
        return G(r);
      case "H":
        return G(l);
      case "hh":
        return G(r);
      case "h":
        return G(l);
      case "mm":
        return G(r);
      case "m":
        return G(l);
      case "q":
        return G(l);
      case "qq":
        return G(r);
      case "s":
        return G(l);
      case "ss":
        return G(r);
      case "S":
        return G(a);
      case "SSS":
        return G(i);
      case "u":
        return Qi(c);
      case "uu":
        return Qi(l);
      case "uuu":
        return G(n);
      case "a":
        return st(t.meridiems(), 0);
      case "kkkk":
        return G(o);
      case "kk":
        return G(f, Cl);
      case "W":
        return G(l);
      case "WW":
        return G(r);
      case "E":
      case "c":
        return G(n);
      case "EEE":
        return st(t.weekdays("short", !1), 1);
      case "EEEE":
        return st(t.weekdays("long", !1), 1);
      case "ccc":
        return st(t.weekdays("short", !0), 1);
      case "cccc":
        return st(t.weekdays("long", !0), 1);
      case "Z":
      case "ZZ":
        return ec(new RegExp(`([+-]${l.source})(?::(${r.source}))?`), 2);
      case "ZZZ":
        return ec(new RegExp(`([+-]${l.source})(${r.source})?`), 2);
      case "z":
        return Qi(/[a-z_+-/]{1,256}?/i);
      case " ":
        return Qi(/[^\S\n\r]/);
      default:
        return h(S);
    }
  })(e) || {
    invalidReason: vg
  };
  return v.token = e, v;
}
const Eg = {
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
function Tg(e, t, n) {
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
  let l = Eg[s];
  if (typeof l == "object" && (l = l[o]), l)
    return {
      literal: !1,
      val: l
    };
}
function Cg(e) {
  return [`^${e.map((n) => n.regex).reduce((n, r) => `${n}(${r.source})`, "")}$`, e];
}
function _g(e, t, n) {
  const r = e.match(t);
  if (r) {
    const i = {};
    let o = 1;
    for (const s in n)
      if (pr(n, s)) {
        const l = n[s], a = l.groups ? l.groups + 1 : 1;
        !l.literal && l.token && (i[l.token.val[0]] = l.deser(r.slice(o, o + a))), o += a;
      }
    return [r, i];
  } else
    return [r, {}];
}
function Ng(e) {
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
  return W(e.z) || (n = kt.create(e.z)), W(e.Z) || (n || (n = new Ne(e.Z)), r = e.Z), W(e.q) || (e.M = (e.q - 1) * 3 + 1), W(e.h) || (e.h < 12 && e.a === 1 ? e.h += 12 : e.h === 12 && e.a === 0 && (e.h = 0)), e.G === 0 && e.y && (e.y = -e.y), W(e.u) || (e.S = Oa(e.u)), [Object.keys(e).reduce((o, s) => {
    const l = t(s);
    return l && (o[l] = e[s]), o;
  }, {}), n, r];
}
let Ws = null;
function Og() {
  return Ws || (Ws = F.fromMillis(1555555555555)), Ws;
}
function Mg(e, t) {
  if (e.literal)
    return e;
  const n = _e.macroTokenToFormatOpts(e.val), r = Od(n, t);
  return r == null || r.includes(void 0) ? e : r;
}
function _d(e, t) {
  return Array.prototype.concat(...e.map((n) => Mg(n, t)));
}
function Nd(e, t, n) {
  const r = _d(_e.parseFormat(n), e), i = r.map((s) => kg(s, e)), o = i.find((s) => s.invalidReason);
  if (o)
    return {
      input: t,
      tokens: r,
      invalidReason: o.invalidReason
    };
  {
    const [s, l] = Cg(i), a = RegExp(s, "i"), [u, c] = _g(t, a, l), [f, p, h] = c ? Ng(c) : [null, null, void 0];
    if (pr(c, "a") && pr(c, "H"))
      throw new Qr("Can't include meridiem when specifying 24-hour format");
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
function Dg(e, t, n) {
  const {
    result: r,
    zone: i,
    specificOffset: o,
    invalidReason: s
  } = Nd(e, t, n);
  return [r, i, o, s];
}
function Od(e, t) {
  if (!e)
    return null;
  const r = _e.create(t, e).dtFormatter(Og()), i = r.formatToParts(), o = r.resolvedOptions();
  return i.map((s) => Tg(s, e, o));
}
const Md = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Dd = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function Xe(e, t) {
  return new dt("unit out of range", `you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`);
}
function $d(e, t, n) {
  const r = new Date(Date.UTC(e, t - 1, n));
  e < 100 && e >= 0 && r.setUTCFullYear(r.getUTCFullYear() - 1900);
  const i = r.getUTCDay();
  return i === 0 ? 7 : i;
}
function Pd(e, t, n) {
  return n + (zi(e) ? Dd : Md)[t - 1];
}
function Id(e, t) {
  const n = zi(e) ? Dd : Md, r = n.findIndex((o) => o < t), i = t - n[r];
  return {
    month: r + 1,
    day: i
  };
}
function _l(e) {
  const {
    year: t,
    month: n,
    day: r
  } = e, i = Pd(t, n, r), o = $d(t, n, r);
  let s = Math.floor((i - o + 10) / 7), l;
  return s < 1 ? (l = t - 1, s = Fo(l)) : s > Fo(t) ? (l = t + 1, s = 1) : l = t, {
    weekYear: l,
    weekNumber: s,
    weekday: o,
    ...ws(e)
  };
}
function tc(e) {
  const {
    weekYear: t,
    weekNumber: n,
    weekday: r
  } = e, i = $d(t, 1, 4), o = ni(t);
  let s = n * 7 + r - i - 3, l;
  s < 1 ? (l = t - 1, s += ni(l)) : s > o ? (l = t + 1, s -= ni(t)) : l = t;
  const {
    month: a,
    day: u
  } = Id(l, s);
  return {
    year: l,
    month: a,
    day: u,
    ...ws(e)
  };
}
function js(e) {
  const {
    year: t,
    month: n,
    day: r
  } = e, i = Pd(t, n, r);
  return {
    year: t,
    ordinal: i,
    ...ws(e)
  };
}
function nc(e) {
  const {
    year: t,
    ordinal: n
  } = e, {
    month: r,
    day: i
  } = Id(t, n);
  return {
    year: t,
    month: r,
    day: i,
    ...ws(e)
  };
}
function $g(e) {
  const t = gs(e.weekYear), n = Ot(e.weekNumber, 1, Fo(e.weekYear)), r = Ot(e.weekday, 1, 7);
  return t ? n ? r ? !1 : Xe("weekday", e.weekday) : Xe("week", e.week) : Xe("weekYear", e.weekYear);
}
function Pg(e) {
  const t = gs(e.year), n = Ot(e.ordinal, 1, ni(e.year));
  return t ? n ? !1 : Xe("ordinal", e.ordinal) : Xe("year", e.year);
}
function Ld(e) {
  const t = gs(e.year), n = Ot(e.month, 1, 12), r = Ot(e.day, 1, Ro(e.year, e.month));
  return t ? n ? r ? !1 : Xe("day", e.day) : Xe("month", e.month) : Xe("year", e.year);
}
function zd(e) {
  const {
    hour: t,
    minute: n,
    second: r,
    millisecond: i
  } = e, o = Ot(t, 0, 23) || t === 24 && n === 0 && r === 0 && i === 0, s = Ot(n, 0, 59), l = Ot(r, 0, 59), a = Ot(i, 0, 999);
  return o ? s ? l ? a ? !1 : Xe("millisecond", i) : Xe("second", r) : Xe("minute", n) : Xe("hour", t);
}
const Hs = "Invalid DateTime", rc = 864e13;
function qi(e) {
  return new dt("unsupported zone", `the zone "${e.name}" is not supported`);
}
function Bs(e) {
  return e.weekData === null && (e.weekData = _l(e.c)), e.weekData;
}
function kn(e, t) {
  const n = {
    ts: e.ts,
    zone: e.zone,
    c: e.c,
    o: e.o,
    loc: e.loc,
    invalid: e.invalid
  };
  return new F({
    ...n,
    ...t,
    old: n
  });
}
function Rd(e, t, n) {
  let r = e - t * 60 * 1e3;
  const i = n.offset(r);
  if (t === i)
    return [r, t];
  r -= (i - t) * 60 * 1e3;
  const o = n.offset(r);
  return i === o ? [r, i] : [e - Math.min(i, o) * 60 * 1e3, Math.max(i, o)];
}
function Ki(e, t) {
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
function So(e, t, n) {
  return Rd(ys(e), t, n);
}
function ic(e, t) {
  const n = e.o, r = e.c.year + Math.trunc(t.years), i = e.c.month + Math.trunc(t.months) + Math.trunc(t.quarters) * 3, o = {
    ...e.c,
    year: r,
    month: i,
    day: Math.min(e.c.day, Ro(r, i)) + Math.trunc(t.days) + Math.trunc(t.weeks) * 7
  }, s = j.fromObject({
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
  let [a, u] = Rd(l, n, e.zone);
  return s !== 0 && (a += s, u = e.zone.offset(a)), {
    ts: a,
    o: u
  };
}
function Fr(e, t, n, r, i, o) {
  const {
    setZone: s,
    zone: l
  } = n;
  if (e && Object.keys(e).length !== 0 || t) {
    const a = t || l, u = F.fromObject(e, {
      ...n,
      zone: a,
      specificOffset: o
    });
    return s ? u : u.setZone(l);
  } else
    return F.invalid(new dt("unparsable", `the input "${i}" can't be parsed as ${r}`));
}
function Ji(e, t, n = !0) {
  return e.isValid ? _e.create(ee.create("en-US"), {
    allowZ: n,
    forceSimple: !0
  }).formatDateTimeFromString(e, t) : null;
}
function Zs(e, t) {
  const n = e.c.year > 9999 || e.c.year < 0;
  let r = "";
  return n && e.c.year >= 0 && (r += "+"), r += he(e.c.year, n ? 6 : 4), t ? (r += "-", r += he(e.c.month), r += "-", r += he(e.c.day)) : (r += he(e.c.month), r += he(e.c.day)), r;
}
function oc(e, t, n, r, i, o) {
  let s = he(e.c.hour);
  return t ? (s += ":", s += he(e.c.minute), (e.c.millisecond !== 0 || e.c.second !== 0 || !n) && (s += ":")) : s += he(e.c.minute), (e.c.millisecond !== 0 || e.c.second !== 0 || !n) && (s += he(e.c.second), (e.c.millisecond !== 0 || !r) && (s += ".", s += he(e.c.millisecond, 3))), i && (e.isOffsetFixed && e.offset === 0 && !o ? s += "Z" : e.o < 0 ? (s += "-", s += he(Math.trunc(-e.o / 60)), s += ":", s += he(Math.trunc(-e.o % 60))) : (s += "+", s += he(Math.trunc(e.o / 60)), s += ":", s += he(Math.trunc(e.o % 60)))), o && (s += "[" + e.zone.ianaName + "]"), s;
}
const Fd = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ig = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Lg = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ad = ["year", "month", "day", "hour", "minute", "second", "millisecond"], zg = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], Rg = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function sc(e) {
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
    throw new bf(e);
  return t;
}
function lc(e, t) {
  const n = qt(t.zone, ce.defaultZone), r = ee.fromObject(t), i = ce.now();
  let o, s;
  if (W(e.year))
    o = i;
  else {
    for (const u of Ad)
      W(e[u]) && (e[u] = Fd[u]);
    const l = Ld(e) || zd(e);
    if (l)
      return F.invalid(l);
    const a = n.offset(i);
    [o, s] = So(e, a, n);
  }
  return new F({
    ts: o,
    zone: n,
    loc: r,
    o: s
  });
}
function ac(e, t, n) {
  const r = W(n.round) ? !0 : n.round, i = (s, l) => (s = Ma(s, r || n.calendary ? 0 : 2, !0), t.loc.clone(n).relFormatter(n).format(s, l)), o = (s) => n.calendary ? t.hasSame(e, s) ? 0 : t.startOf(s).diff(e.startOf(s), s).get(s) : t.diff(e, s).get(s);
  if (n.unit)
    return i(o(n.unit), n.unit);
  for (const s of n.units) {
    const l = o(s);
    if (Math.abs(l) >= 1)
      return i(l, s);
  }
  return i(e > t ? -0 : 0, n.units[n.units.length - 1]);
}
function uc(e) {
  let t = {}, n;
  return e.length > 0 && typeof e[e.length - 1] == "object" ? (t = e[e.length - 1], n = Array.from(e).slice(0, e.length - 1)) : n = Array.from(e), [t, n];
}
class F {
  /**
   * @access private
   */
  constructor(t) {
    const n = t.zone || ce.defaultZone;
    let r = t.invalid || (Number.isNaN(t.ts) ? new dt("invalid input") : null) || (n.isValid ? null : qi(n));
    this.ts = W(t.ts) ? ce.now() : t.ts;
    let i = null, o = null;
    if (!r)
      if (t.old && t.old.ts === this.ts && t.old.zone.equals(n))
        [i, o] = [t.old.c, t.old.o];
      else {
        const l = n.offset(this.ts);
        i = Ki(this.ts, l), r = Number.isNaN(i.year) ? new dt("invalid input") : null, i = r ? null : i, o = r ? null : l;
      }
    this._zone = n, this.loc = t.loc || ee.create(), this.invalid = r, this.weekData = null, this.c = i, this.o = o, this.isLuxonDateTime = !0;
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
    return new F({});
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
    const [t, n] = uc(arguments), [r, i, o, s, l, a, u] = n;
    return lc({
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
    const [t, n] = uc(arguments), [r, i, o, s, l, a, u] = n;
    return t.zone = Ne.utcInstance, lc({
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
    const r = c0(t) ? t.valueOf() : NaN;
    if (Number.isNaN(r))
      return F.invalid("invalid input");
    const i = qt(n.zone, ce.defaultZone);
    return i.isValid ? new F({
      ts: r,
      zone: i,
      loc: ee.fromObject(n)
    }) : F.invalid(qi(i));
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
      return t < -rc || t > rc ? F.invalid("Timestamp out of range") : new F({
        ts: t,
        zone: qt(n.zone, ce.defaultZone),
        loc: ee.fromObject(n)
      });
    throw new qe(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`);
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
      return new F({
        ts: t * 1e3,
        zone: qt(n.zone, ce.defaultZone),
        loc: ee.fromObject(n)
      });
    throw new qe("fromSeconds requires a numerical input");
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
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @return {DateTime}
   */
  static fromObject(t, n = {}) {
    t = t || {};
    const r = qt(n.zone, ce.defaultZone);
    if (!r.isValid)
      return F.invalid(qi(r));
    const i = ce.now(), o = W(n.specificOffset) ? r.offset(i) : n.specificOffset, s = Ao(t, sc), l = !W(s.ordinal), a = !W(s.year), u = !W(s.month) || !W(s.day), c = a || u, f = s.weekYear || s.weekNumber, p = ee.fromObject(n);
    if ((c || l) && f)
      throw new Qr("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    if (u && l)
      throw new Qr("Can't mix ordinal dates with month/day");
    const h = f || s.weekday && !c;
    let y, v, S = Ki(i, o);
    h ? (y = zg, v = Ig, S = _l(S)) : l ? (y = Rg, v = Lg, S = js(S)) : (y = Ad, v = Fd);
    let m = !1;
    for (const E of y) {
      const L = s[E];
      W(L) ? m ? s[E] = v[E] : s[E] = S[E] : m = !0;
    }
    const d = h ? $g(s) : l ? Pg(s) : Ld(s), g = d || zd(s);
    if (g)
      return F.invalid(g);
    const w = h ? tc(s) : l ? nc(s) : s, [x, T] = So(w, o, r), _ = new F({
      ts: x,
      zone: r,
      o: T,
      loc: p
    });
    return s.weekday && c && t.weekday !== _.weekday ? F.invalid("mismatched weekday", `you can't specify both a weekday of ${s.weekday} and a date of ${_.toISO()}`) : _;
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
    const [r, i] = X0(t);
    return Fr(r, i, n, "ISO 8601", t);
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
    const [r, i] = eg(t);
    return Fr(r, i, n, "RFC 2822", t);
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
    const [r, i] = tg(t);
    return Fr(r, i, n, "HTTP", n);
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
    if (W(t) || W(n))
      throw new qe("fromFormat requires an input string and a format");
    const {
      locale: i = null,
      numberingSystem: o = null
    } = r, s = ee.fromOpts({
      locale: i,
      numberingSystem: o,
      defaultToEN: !0
    }), [l, a, u, c] = Dg(s, t, n);
    return c ? F.invalid(c) : Fr(l, a, r, `format ${n}`, t, u);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(t, n, r = {}) {
    return F.fromFormat(t, n, r);
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
    const [r, i] = ag(t);
    return Fr(r, i, n, "SQL", t);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(t, n = null) {
    if (!t)
      throw new qe("need to specify a reason the DateTime is invalid");
    const r = t instanceof dt ? t : new dt(t, n);
    if (ce.throwOnInvalid)
      throw new Wp(r);
    return new F({
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
    const r = Od(t, ee.fromObject(n));
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
    return _d(_e.parseFormat(t), ee.fromObject(n)).map((i) => i.val).join("");
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
    return this.isValid ? Bs(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? Bs(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? Bs(this).weekday : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? js(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Kr.months("short", {
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
    return this.isValid ? Kr.months("long", {
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
    return this.isValid ? Kr.weekdays("short", {
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
    return this.isValid ? Kr.weekdays("long", {
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
    const a = r - s * n, u = r - l * n, c = Ki(a, s), f = Ki(u, l);
    return c.hour === f.hour && c.minute === f.minute && c.second === f.second && c.millisecond === f.millisecond ? [kn(this, {
      ts: a
    }), kn(this, {
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
    return zi(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return Ro(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? ni(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? Fo(this.weekYear) : NaN;
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
    } = _e.create(this.loc.clone(t), t).resolvedOptions(this);
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
    return this.setZone(Ne.instance(t), n);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(ce.defaultZone);
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
    if (t = qt(t, ce.defaultZone), t.equals(this.zone))
      return this;
    if (t.isValid) {
      let i = this.ts;
      if (n || r) {
        const o = t.offset(this.ts), s = this.toObject();
        [i] = So(s, o, t);
      }
      return kn(this, {
        ts: i,
        zone: t
      });
    } else
      return F.invalid(qi(t));
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
    return kn(this, {
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
    const n = Ao(t, sc), r = !W(n.weekYear) || !W(n.weekNumber) || !W(n.weekday), i = !W(n.ordinal), o = !W(n.year), s = !W(n.month) || !W(n.day), l = o || s, a = n.weekYear || n.weekNumber;
    if ((l || i) && a)
      throw new Qr("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    if (s && i)
      throw new Qr("Can't mix ordinal dates with month/day");
    let u;
    r ? u = tc({
      ..._l(this.c),
      ...n
    }) : W(n.ordinal) ? (u = {
      ...this.toObject(),
      ...n
    }, W(n.day) && (u.day = Math.min(Ro(u.year, u.month), u.day))) : u = nc({
      ...js(this.c),
      ...n
    });
    const [c, f] = So(u, this.o, this.zone);
    return kn(this, {
      ts: c,
      o: f
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
    const n = j.fromDurationLike(t);
    return kn(this, ic(this, n));
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
    const n = j.fromDurationLike(t).negate();
    return kn(this, ic(this, n));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(t) {
    if (!this.isValid)
      return this;
    const n = {}, r = j.normalizeUnit(t);
    switch (r) {
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
    if (r === "weeks" && (n.weekday = 1), r === "quarters") {
      const i = Math.ceil(this.month / 3);
      n.month = (i - 1) * 3 + 1;
    }
    return this.set(n);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(t) {
    return this.isValid ? this.plus({
      [t]: 1
    }).startOf(t).minus(1) : this;
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
    return this.isValid ? _e.create(this.loc.redefaultToEN(n)).formatDateTimeFromString(this, t) : Hs;
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
  toLocaleString(t = zo, n = {}) {
    return this.isValid ? _e.create(this.loc.clone(n), t).formatDateTime(this) : Hs;
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
    return this.isValid ? _e.create(this.loc.clone(t), t).formatDateTimeParts(this) : [];
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
    return l += "T", l += oc(this, s, n, r, i, o), l;
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
    return Ji(this, "kkkk-'W'WW-c");
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
    return this.isValid ? (i ? "T" : "") + oc(this, s === "extended", n, t, r, o) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return Ji(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
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
    return Ji(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
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
    return (n || t) && (r && (i += " "), n ? i += "z" : t && (i += "ZZ")), Ji(this, i, !0);
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
      return j.invalid("created by diffing an invalid DateTime");
    const i = {
      locale: this.locale,
      numberingSystem: this.numberingSystem,
      ...r
    }, o = f0(n).map(j.normalizeUnit), s = t.valueOf() > this.valueOf(), l = s ? this : t, a = s ? t : this, u = pg(l, a, o, i);
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
    return this.diff(F.now(), t, n);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(t) {
    return this.isValid ? ie.fromDateTimes(this, t) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(t, n) {
    if (!this.isValid)
      return !1;
    const r = t.valueOf(), i = this.setZone(t.zone, {
      keepLocalTime: !0
    });
    return i.startOf(n) <= r && r <= i.endOf(n);
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
    const n = t.base || F.fromObject({}, {
      zone: this.zone
    }), r = t.padding ? this < n ? -t.padding : t.padding : 0;
    let i = ["years", "months", "days", "hours", "minutes", "seconds"], o = t.unit;
    return Array.isArray(t.unit) && (i = t.unit, o = void 0), ac(n, this.plus(r), {
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
    return this.isValid ? ac(t.base || F.fromObject({}, {
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
    if (!t.every(F.isDateTime))
      throw new qe("min requires all arguments be DateTimes");
    return Zu(t, (n) => n.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...t) {
    if (!t.every(F.isDateTime))
      throw new qe("max requires all arguments be DateTimes");
    return Zu(t, (n) => n.valueOf(), Math.max);
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
    } = r, s = ee.fromOpts({
      locale: i,
      numberingSystem: o,
      defaultToEN: !0
    });
    return Nd(s, t, n);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(t, n, r = {}) {
    return F.fromFormatExplain(t, n, r);
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return zo;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return Vf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return Bp;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return Uf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return Wf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return jf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return Hf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return Bf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Zf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Gf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Yf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Qf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return qf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Kf;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Jf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Xf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return ed;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return Zp;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return td;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return nd;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return rd;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return id;
  }
}
function Ar(e) {
  if (F.isDateTime(e))
    return e;
  if (e && e.valueOf && Pn(e.valueOf()))
    return F.fromJSDate(e);
  if (e && typeof e == "object")
    return F.fromObject(e);
  throw new qe(`Unknown datetime argument: ${e}, of type ${typeof e}`);
}
const Fg = "3.4.3";
Ze.DateTime = F;
Ze.Duration = j;
Ze.FixedOffsetZone = Ne;
Ze.IANAZone = kt;
Ze.Info = Kr;
Ze.Interval = ie;
Ze.InvalidZone = od;
Ze.Settings = ce;
Ze.SystemZone = Li;
Ze.VERSION = Fg;
Ze.Zone = Cr;
var En = Ze;
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
var Ag = z;
function _n(e) {
  return {
    start: e,
    count: 1
  };
}
function cc(e, t) {
  e.end = t, e.step = t - e.start, e.count = 2;
}
function Gs(e, t, n) {
  t && (t.count === 2 ? (e.push(_n(t.start)), e.push(_n(t.end))) : e.push(t)), n && e.push(n);
}
function bg(e) {
  for (var t = [], n = void 0, r = 0; r < e.length; r++) {
    var i = e[r];
    typeof i != "number" ? (Gs(t, n, _n(i)), n = void 0) : n ? n.count === 1 ? cc(n, i) : n.step === i - n.end ? (n.count++, n.end = i) : n.count === 2 ? (t.push(_n(n.start)), n = _n(n.end), cc(n, i)) : (Gs(t, n), n = _n(i)) : n = _n(i);
  }
  return Gs(t, n), t;
}
var Vg = bg, Ug = Vg;
function Wg(e, t, n) {
  var r = Ug(e);
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
        var y = u.start + h;
        return (y - u.start) % u.step === 0 ? y : null;
      }).filter(function(p) {
        return p != null;
      })
    ) : u.end === n - u.step + 1 ? s.push(u.start + "/" + u.step) : s.push(u.start + "-" + u.end + "/" + u.step);
  }
  return s.join(",");
}
var jg = Wg, In = Ag, Hg = jg, fc = 1e4;
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
    function c(y) {
      if (y instanceof Array)
        for (var v = 0, S = y.length; v < S; v++) {
          var m = y[v];
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
        if (M._isValidConstraintChar(r, y)) {
          u.push(y);
          return;
        }
        var d = +y;
        if (Number.isNaN(d) || d < r.min || d > r.max)
          throw new Error(
            "Constraint error, got value " + y + " expected range " + r.min + "-" + r.max
          );
        t === "dayOfWeek" && (d = d % 7), u.push(d);
      }
    }
    var f = a.split(",");
    if (!f.every(function(y) {
      return y.length > 0;
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
      var y = +u;
      if (Number.isNaN(y) || y <= 0)
        throw new Error("Constraint error, cannot repeat at every " + y + " time.");
      t === "dayOfWeek" && h % 7 === 0 && c.push(0);
      for (var v = p, S = h; v <= S; v++) {
        var m = c.indexOf(v) !== -1;
        !m && y > 0 && y % u === 0 ? (y = 1, c.push(v)) : y++;
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
    for (var g = 0, w = d.length; g < w; g++)
      if (d[g] >= m)
        return d[g] === m;
    return d[0] === m;
  }
  function r(m, d) {
    if (d < 6) {
      if (m.getDate() < 8 && d === 1)
        return !0;
      var g = m.getDate() % 7 ? 1 : 0, w = m.getDate() - m.getDate() % 7, x = Math.floor(w / 7) + g;
      return x === d;
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
      var g = Number.parseInt(d[0]) % 7;
      if (Number.isNaN(g))
        throw new Error("Invalid last weekday of the month expression: " + d);
      return s.getDay() === g && s.isLastWeekdayOfMonth();
    });
  }
  for (; c < fc; ) {
    if (c++, t) {
      if (l && s.getTime() - l.getTime() < 0)
        throw new Error("Out of the timespan range");
    } else if (a && a.getTime() - s.getTime() < 0)
      throw new Error("Out of the timespan range");
    var p = n(s.getDate(), this.fields.dayOfMonth);
    i(this.fields.dayOfMonth) && (p = p || s.isLastDayOfMonth());
    var h = n(s.getDay(), this.fields.dayOfWeek);
    i(this.fields.dayOfWeek) && (h = h || f(this.fields.dayOfWeek));
    var y = this.fields.dayOfMonth.length >= M.daysInMonth[s.getMonth()], v = this.fields.dayOfWeek.length === M.constraints[5].max - M.constraints[5].min + 1, S = s.getHours();
    if (!p && (!h || v)) {
      this._applyTimezoneShift(s, o, "Day");
      continue;
    }
    if (!y && v && !p) {
      this._applyTimezoneShift(s, o, "Day");
      continue;
    }
    if (y && !v && !h) {
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
    if (n(S, this.fields.hour)) {
      if (this._dstEnd === S && !t) {
        this._dstEnd = null, this._applyTimezoneShift(s, "add", "Hour");
        continue;
      }
    } else if (this._dstStart !== S) {
      this._dstStart = null, this._applyTimezoneShift(s, o, "Hour");
      continue;
    } else if (!n(S - 1, this.fields.hour)) {
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
  if (c >= fc)
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
    o === "dayOfMonth" && this.fields.month.length === 1 ? l = { min: 1, max: M.daysInMonth[this.fields.month[0] - 1] } : o === "dayOfWeek" && (l = { min: 0, max: 6 }, s = s[s.length - 1] === 7 ? s.slice(0, -1) : s), n.push(Hg(s, l.min, l.max));
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
        var y = p === "dayOfWeek" ? d(h) : h;
        l.push(
          M._parseField(
            p,
            y,
            M.constraints[c]
          )
        );
      }
    }
    for (var v = {}, c = 0, f = M.map.length; c < f; c++) {
      var S = M.map[c];
      v[S] = l[c];
    }
    var m = M._handleMaxDaysInMonth(v);
    return v.dayOfMonth = m || v.dayOfMonth, new M(v, s);
    function d(g) {
      var w = g.split("#");
      if (w.length > 1) {
        var x = +w[w.length - 1];
        if (/,/.test(g))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `,` special characters are incompatible");
        if (/\//.test(g))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `/` special characters are incompatible");
        if (/-/.test(g))
          throw new Error("Constraint error, invalid dayOfWeek `#` and `-` special characters are incompatible");
        if (w.length > 2 || Number.isNaN(x) || x < 1 || x > 5)
          throw new Error("Constraint error, invalid dayOfWeek occurrence number (#)");
        return s.nthDayOfWeek = x, w[0];
      }
      return g;
    }
  }
  return i(t, n);
};
M.fieldsToExpression = function(t, n) {
  function r(p, h, y) {
    if (!h)
      throw new Error("Validation error, Field " + p + " is missing");
    if (h.length === 0)
      throw new Error("Validation error, Field " + p + " contains no values");
    for (var v = 0, S = h.length; v < S; v++) {
      var m = h[v];
      if (!M._isValidConstraintChar(y, m) && (typeof m != "number" || Number.isNaN(m) || m < y.min || m > y.max))
        throw new Error(
          "Constraint error, got value " + m + " expected range " + y.min + "-" + y.max
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
    if (a = u.sort(M._sortCompareFn).filter(function(p, h, y) {
      return !h || p !== y[h - 1];
    }), a.length !== u.length)
      throw new Error("Validation error, Field " + l + " contains duplicate values");
    i[l] = a;
  }
  var f = M._handleMaxDaysInMonth(i);
  return i.dayOfMonth = f || i.dayOfMonth, new M(i, n || {});
};
var Bg = M, bo = Bg;
function gr() {
}
gr._parseEntry = function(t) {
  var n = t.split(" ");
  if (n.length === 6)
    return {
      interval: bo.parse(t)
    };
  if (n.length > 6)
    return {
      interval: bo.parse(
        n.slice(0, 6).join(" ")
      ),
      command: n.slice(6, n.length)
    };
  throw new Error("Invalid entry: " + t);
};
gr.parseExpression = function(t, n) {
  return bo.parse(t, n);
};
gr.fieldsToExpression = function(t, n) {
  return bo.fieldsToExpression(t, n);
};
gr.parseString = function(t) {
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
          u = gr._parseEntry("0 " + a), r.expressions.push(u.interval);
        } catch (c) {
          r.errors[a] = c;
        }
      }
    }
  }
  return r;
};
var Zg = gr;
const Gg = /* @__PURE__ */ Af(Zg);
var bd = { exports: {} }, U = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ai = Symbol.for("react.element"), Yg = Symbol.for("react.portal"), Qg = Symbol.for("react.fragment"), qg = Symbol.for("react.strict_mode"), Kg = Symbol.for("react.profiler"), Jg = Symbol.for("react.provider"), Xg = Symbol.for("react.context"), ey = Symbol.for("react.forward_ref"), ty = Symbol.for("react.suspense"), ny = Symbol.for("react.memo"), ry = Symbol.for("react.lazy"), dc = Symbol.iterator;
function iy(e) {
  return e === null || typeof e != "object" ? null : (e = dc && e[dc] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Vd = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Ud = Object.assign, Wd = {};
function Dr(e, t, n) {
  this.props = e, this.context = t, this.refs = Wd, this.updater = n || Vd;
}
Dr.prototype.isReactComponent = {};
Dr.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Dr.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function jd() {
}
jd.prototype = Dr.prototype;
function La(e, t, n) {
  this.props = e, this.context = t, this.refs = Wd, this.updater = n || Vd;
}
var za = La.prototype = new jd();
za.constructor = La;
Ud(za, Dr.prototype);
za.isPureReactComponent = !0;
var hc = Array.isArray, Hd = Object.prototype.hasOwnProperty, Ra = { current: null }, Bd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Zd(e, t, n) {
  var r, i = {}, o = null, s = null;
  if (t != null)
    for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (o = "" + t.key), t)
      Hd.call(t, r) && !Bd.hasOwnProperty(r) && (i[r] = t[r]);
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
  return { $$typeof: Ai, type: e, key: o, ref: s, props: i, _owner: Ra.current };
}
function oy(e, t) {
  return { $$typeof: Ai, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Fa(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ai;
}
function sy(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var mc = /\/+/g;
function Ys(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? sy("" + e.key) : t.toString(36);
}
function ko(e, t, n, r, i) {
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
          case Ai:
          case Yg:
            s = !0;
        }
    }
  if (s)
    return s = e, i = i(s), e = r === "" ? "." + Ys(s, 0) : r, hc(i) ? (n = "", e != null && (n = e.replace(mc, "$&/") + "/"), ko(i, t, n, "", function(u) {
      return u;
    })) : i != null && (Fa(i) && (i = oy(i, n + (!i.key || s && s.key === i.key ? "" : ("" + i.key).replace(mc, "$&/") + "/") + e)), t.push(i)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", hc(e))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var a = r + Ys(o, l);
      s += ko(o, t, n, a, i);
    }
  else if (a = iy(e), typeof a == "function")
    for (e = a.call(e), l = 0; !(o = e.next()).done; )
      o = o.value, a = r + Ys(o, l++), s += ko(o, t, n, a, i);
  else if (o === "object")
    throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function Xi(e, t, n) {
  if (e == null)
    return e;
  var r = [], i = 0;
  return ko(e, r, "", "", function(o) {
    return t.call(n, o, i++);
  }), r;
}
function ly(e) {
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
var $e = { current: null }, Eo = { transition: null }, ay = { ReactCurrentDispatcher: $e, ReactCurrentBatchConfig: Eo, ReactCurrentOwner: Ra };
U.Children = { map: Xi, forEach: function(e, t, n) {
  Xi(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Xi(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Xi(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Fa(e))
    throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
U.Component = Dr;
U.Fragment = Qg;
U.Profiler = Kg;
U.PureComponent = La;
U.StrictMode = qg;
U.Suspense = ty;
U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ay;
U.cloneElement = function(e, t, n) {
  if (e == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Ud({}, e.props), i = e.key, o = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, s = Ra.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps)
      var l = e.type.defaultProps;
    for (a in t)
      Hd.call(t, a) && !Bd.hasOwnProperty(a) && (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
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
  return { $$typeof: Ai, type: e.type, key: i, ref: o, props: r, _owner: s };
};
U.createContext = function(e) {
  return e = { $$typeof: Xg, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Jg, _context: e }, e.Consumer = e;
};
U.createElement = Zd;
U.createFactory = function(e) {
  var t = Zd.bind(null, e);
  return t.type = e, t;
};
U.createRef = function() {
  return { current: null };
};
U.forwardRef = function(e) {
  return { $$typeof: ey, render: e };
};
U.isValidElement = Fa;
U.lazy = function(e) {
  return { $$typeof: ry, _payload: { _status: -1, _result: e }, _init: ly };
};
U.memo = function(e, t) {
  return { $$typeof: ny, type: e, compare: t === void 0 ? null : t };
};
U.startTransition = function(e) {
  var t = Eo.transition;
  Eo.transition = {};
  try {
    e();
  } finally {
    Eo.transition = t;
  }
};
U.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
U.useCallback = function(e, t) {
  return $e.current.useCallback(e, t);
};
U.useContext = function(e) {
  return $e.current.useContext(e);
};
U.useDebugValue = function() {
};
U.useDeferredValue = function(e) {
  return $e.current.useDeferredValue(e);
};
U.useEffect = function(e, t) {
  return $e.current.useEffect(e, t);
};
U.useId = function() {
  return $e.current.useId();
};
U.useImperativeHandle = function(e, t, n) {
  return $e.current.useImperativeHandle(e, t, n);
};
U.useInsertionEffect = function(e, t) {
  return $e.current.useInsertionEffect(e, t);
};
U.useLayoutEffect = function(e, t) {
  return $e.current.useLayoutEffect(e, t);
};
U.useMemo = function(e, t) {
  return $e.current.useMemo(e, t);
};
U.useReducer = function(e, t, n) {
  return $e.current.useReducer(e, t, n);
};
U.useRef = function(e) {
  return $e.current.useRef(e);
};
U.useState = function(e) {
  return $e.current.useState(e);
};
U.useSyncExternalStore = function(e, t, n) {
  return $e.current.useSyncExternalStore(e, t, n);
};
U.useTransition = function() {
  return $e.current.useTransition();
};
U.version = "18.2.0";
bd.exports = U;
var k = bd.exports;
const $t = /* @__PURE__ */ Af(k);
var Gd = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, pc = $t.createContext && $t.createContext(Gd), tn = globalThis && globalThis.__assign || function() {
  return tn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, tn.apply(this, arguments);
}, uy = globalThis && globalThis.__rest || function(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
};
function Yd(e) {
  return e && e.map(function(t, n) {
    return $t.createElement(t.tag, tn({
      key: n
    }, t.attr), Yd(t.child));
  });
}
function Aa(e) {
  return function(t) {
    return $t.createElement(cy, tn({
      attr: tn({}, e.attr)
    }, t), Yd(e.child));
  };
}
function cy(e) {
  var t = function(n) {
    var r = e.attr, i = e.size, o = e.title, s = uy(e, ["attr", "size", "title"]), l = i || n.size || "1em", a;
    return n.className && (a = n.className), e.className && (a = (a ? a + " " : "") + e.className), $t.createElement("svg", tn({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, r, s, {
      className: a,
      style: tn(tn({
        color: e.color || n.color
      }, n.style), e.style),
      height: l,
      width: l,
      xmlns: "http://www.w3.org/2000/svg"
    }), o && $t.createElement("title", null, o), e.children);
  };
  return pc !== void 0 ? $t.createElement(pc.Consumer, null, function(n) {
    return t(n);
  }) : t(Gd);
}
function fy(e) {
  return Aa({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" } }] })(e);
}
function dy(e) {
  return Aa({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" } }] })(e);
}
function hy(e) {
  return Aa({ tag: "svg", attr: { fill: "currentColor", viewBox: "0 0 16 16" }, child: [{ tag: "path", attr: { d: "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" } }] })(e);
}
function fn() {
  return fn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, fn.apply(this, arguments);
}
function _t(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(i) {
    if (e == null || e(i), n === !1 || !i.defaultPrevented)
      return t == null ? void 0 : t(i);
  };
}
function my(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function Qd(...e) {
  return (t) => e.forEach(
    (n) => my(n, t)
  );
}
function $r(...e) {
  return k.useCallback(Qd(...e), e);
}
function qd(e, t = []) {
  let n = [];
  function r(o, s) {
    const l = /* @__PURE__ */ k.createContext(s), a = n.length;
    n = [
      ...n,
      s
    ];
    function u(f) {
      const { scope: p, children: h, ...y } = f, v = (p == null ? void 0 : p[e][a]) || l, S = k.useMemo(
        () => y,
        Object.values(y)
      );
      return /* @__PURE__ */ k.createElement(v.Provider, {
        value: S
      }, h);
    }
    function c(f, p) {
      const h = (p == null ? void 0 : p[e][a]) || l, y = k.useContext(h);
      if (y)
        return y;
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
    const o = n.map((s) => /* @__PURE__ */ k.createContext(s));
    return function(l) {
      const a = (l == null ? void 0 : l[e]) || o;
      return k.useMemo(
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
    py(i, ...t)
  ];
}
function py(...e) {
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
      return k.useMemo(
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
function Nl() {
  return Nl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Nl.apply(this, arguments);
}
function Ol() {
  return Ol = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ol.apply(this, arguments);
}
var Kd = { exports: {} }, Ge = {}, Jd = { exports: {} }, Xd = {};
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
  function t(N, I) {
    var R = N.length;
    N.push(I);
    e:
      for (; 0 < R; ) {
        var Z = R - 1 >>> 1, K = N[Z];
        if (0 < i(K, I))
          N[Z] = I, N[R] = K, R = Z;
        else
          break e;
      }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0)
      return null;
    var I = N[0], R = N.pop();
    if (R !== I) {
      N[0] = R;
      e:
        for (var Z = 0, K = N.length, ue = K >>> 1; Z < ue; ) {
          var Tt = 2 * (Z + 1) - 1, Wt = N[Tt], Ie = Tt + 1, xn = N[Ie];
          if (0 > i(Wt, R))
            Ie < K && 0 > i(xn, Wt) ? (N[Z] = xn, N[Ie] = R, Z = Ie) : (N[Z] = Wt, N[Tt] = R, Z = Tt);
          else if (Ie < K && 0 > i(xn, R))
            N[Z] = xn, N[Ie] = R, Z = Ie;
          else
            break e;
        }
    }
    return I;
  }
  function i(N, I) {
    var R = N.sortIndex - I.sortIndex;
    return R !== 0 ? R : N.id - I.id;
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
  var a = [], u = [], c = 1, f = null, p = 3, h = !1, y = !1, v = !1, S = typeof setTimeout == "function" ? setTimeout : null, m = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(N) {
    for (var I = n(u); I !== null; ) {
      if (I.callback === null)
        r(u);
      else if (I.startTime <= N)
        r(u), I.sortIndex = I.expirationTime, t(a, I);
      else
        break;
      I = n(u);
    }
  }
  function w(N) {
    if (v = !1, g(N), !y)
      if (n(a) !== null)
        y = !0, A(x);
      else {
        var I = n(u);
        I !== null && re(w, I.startTime - N);
      }
  }
  function x(N, I) {
    y = !1, v && (v = !1, m(E), E = -1), h = !0;
    var R = p;
    try {
      for (g(I), f = n(a); f !== null && (!(f.expirationTime > I) || N && !H()); ) {
        var Z = f.callback;
        if (typeof Z == "function") {
          f.callback = null, p = f.priorityLevel;
          var K = Z(f.expirationTime <= I);
          I = e.unstable_now(), typeof K == "function" ? f.callback = K : f === n(a) && r(a), g(I);
        } else
          r(a);
        f = n(a);
      }
      if (f !== null)
        var ue = !0;
      else {
        var Tt = n(u);
        Tt !== null && re(w, Tt.startTime - I), ue = !1;
      }
      return ue;
    } finally {
      f = null, p = R, h = !1;
    }
  }
  var T = !1, _ = null, E = -1, L = 5, $ = -1;
  function H() {
    return !(e.unstable_now() - $ < L);
  }
  function P() {
    if (_ !== null) {
      var N = e.unstable_now();
      $ = N;
      var I = !0;
      try {
        I = _(!0, N);
      } finally {
        I ? pe() : (T = !1, _ = null);
      }
    } else
      T = !1;
  }
  var pe;
  if (typeof d == "function")
    pe = function() {
      d(P);
    };
  else if (typeof MessageChannel < "u") {
    var b = new MessageChannel(), de = b.port2;
    b.port1.onmessage = P, pe = function() {
      de.postMessage(null);
    };
  } else
    pe = function() {
      S(P, 0);
    };
  function A(N) {
    _ = N, T || (T = !0, pe());
  }
  function re(N, I) {
    E = S(function() {
      N(e.unstable_now());
    }, I);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(N) {
    N.callback = null;
  }, e.unstable_continueExecution = function() {
    y || h || (y = !0, A(x));
  }, e.unstable_forceFrameRate = function(N) {
    0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < N ? Math.floor(1e3 / N) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(N) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var I = 3;
        break;
      default:
        I = p;
    }
    var R = p;
    p = I;
    try {
      return N();
    } finally {
      p = R;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(N, I) {
    switch (N) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        N = 3;
    }
    var R = p;
    p = N;
    try {
      return I();
    } finally {
      p = R;
    }
  }, e.unstable_scheduleCallback = function(N, I, R) {
    var Z = e.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? Z + R : Z) : R = Z, N) {
      case 1:
        var K = -1;
        break;
      case 2:
        K = 250;
        break;
      case 5:
        K = 1073741823;
        break;
      case 4:
        K = 1e4;
        break;
      default:
        K = 5e3;
    }
    return K = R + K, N = { id: c++, callback: I, priorityLevel: N, startTime: R, expirationTime: K, sortIndex: -1 }, R > Z ? (N.sortIndex = R, t(u, N), n(a) === null && N === n(u) && (v ? (m(E), E = -1) : v = !0, re(w, R - Z))) : (N.sortIndex = K, t(a, N), y || h || (y = !0, A(x))), N;
  }, e.unstable_shouldYield = H, e.unstable_wrapCallback = function(N) {
    var I = p;
    return function() {
      var R = p;
      p = I;
      try {
        return N.apply(this, arguments);
      } finally {
        p = R;
      }
    };
  };
})(Xd);
Jd.exports = Xd;
var gy = Jd.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eh = k, Be = gy;
function C(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var th = /* @__PURE__ */ new Set(), hi = {};
function jn(e, t) {
  yr(e, t), yr(e + "Capture", t);
}
function yr(e, t) {
  for (hi[e] = t, e = 0; e < t.length; e++)
    th.add(t[e]);
}
var It = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ml = Object.prototype.hasOwnProperty, yy = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, gc = {}, yc = {};
function vy(e) {
  return Ml.call(yc, e) ? !0 : Ml.call(gc, e) ? !1 : yy.test(e) ? yc[e] = !0 : (gc[e] = !0, !1);
}
function wy(e, t, n, r) {
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
function xy(e, t, n, r) {
  if (t === null || typeof t > "u" || wy(e, t, n, r))
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
function Pe(e, t, n, r, i, o, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = s;
}
var ke = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ke[e] = new Pe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ke[t] = new Pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ke[e] = new Pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ke[e] = new Pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ke[e] = new Pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ke[e] = new Pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ke[e] = new Pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ke[e] = new Pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ke[e] = new Pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ba = /[\-:]([a-z])/g;
function Va(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ba,
    Va
  );
  ke[t] = new Pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ba, Va);
  ke[t] = new Pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ba, Va);
  ke[t] = new Pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ke[e] = new Pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new Pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ke[e] = new Pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ua(e, t, n, r) {
  var i = ke.hasOwnProperty(t) ? ke[t] : null;
  (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (xy(t, n, i, r) && (n = null), r || i === null ? vy(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Vt = eh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, eo = Symbol.for("react.element"), Qn = Symbol.for("react.portal"), qn = Symbol.for("react.fragment"), Wa = Symbol.for("react.strict_mode"), Dl = Symbol.for("react.profiler"), nh = Symbol.for("react.provider"), rh = Symbol.for("react.context"), ja = Symbol.for("react.forward_ref"), $l = Symbol.for("react.suspense"), Pl = Symbol.for("react.suspense_list"), Ha = Symbol.for("react.memo"), Yt = Symbol.for("react.lazy"), ih = Symbol.for("react.offscreen"), vc = Symbol.iterator;
function br(e) {
  return e === null || typeof e != "object" ? null : (e = vc && e[vc] || e["@@iterator"], typeof e == "function" ? e : null);
}
var le = Object.assign, Qs;
function Jr(e) {
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
  return (e = e ? e.displayName || e.name : "") ? Jr(e) : "";
}
function Sy(e) {
  switch (e.tag) {
    case 5:
      return Jr(e.type);
    case 16:
      return Jr("Lazy");
    case 13:
      return Jr("Suspense");
    case 19:
      return Jr("SuspenseList");
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
function Il(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case qn:
      return "Fragment";
    case Qn:
      return "Portal";
    case Dl:
      return "Profiler";
    case Wa:
      return "StrictMode";
    case $l:
      return "Suspense";
    case Pl:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case rh:
        return (e.displayName || "Context") + ".Consumer";
      case nh:
        return (e._context.displayName || "Context") + ".Provider";
      case ja:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Ha:
        return t = e.displayName || null, t !== null ? t : Il(e.type) || "Memo";
      case Yt:
        t = e._payload, e = e._init;
        try {
          return Il(e(t));
        } catch {
        }
    }
  return null;
}
function ky(e) {
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
      return Il(t);
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
function oh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Ey(e) {
  var t = oh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function to(e) {
  e._valueTracker || (e._valueTracker = Ey(e));
}
function sh(e) {
  if (!e)
    return !1;
  var t = e._valueTracker;
  if (!t)
    return !0;
  var n = t.getValue(), r = "";
  return e && (r = oh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Vo(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ll(e, t) {
  var n = t.checked;
  return le({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function wc(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = dn(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function lh(e, t) {
  t = t.checked, t != null && Ua(e, "checked", t, !1);
}
function zl(e, t) {
  lh(e, t);
  var n = dn(t.value), r = t.type;
  if (n != null)
    r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Rl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Rl(e, t.type, dn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function xc(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
      return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Rl(e, t, n) {
  (t !== "number" || Vo(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Xr = Array.isArray;
function ar(e, t, n, r) {
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
function Fl(e, t) {
  if (t.dangerouslySetInnerHTML != null)
    throw Error(C(91));
  return le({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Sc(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null)
        throw Error(C(92));
      if (Xr(n)) {
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
function ah(e, t) {
  var n = dn(t.value), r = dn(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function kc(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function uh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Al(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? uh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var no, ch = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, i);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
    e.innerHTML = t;
  else {
    for (no = no || document.createElement("div"), no.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = no.firstChild; e.firstChild; )
      e.removeChild(e.firstChild);
    for (; t.firstChild; )
      e.appendChild(t.firstChild);
  }
});
function mi(e, t) {
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
}, Ty = ["Webkit", "ms", "Moz", "O"];
Object.keys(ii).forEach(function(e) {
  Ty.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), ii[t] = ii[e];
  });
});
function fh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || ii.hasOwnProperty(e) && ii[e] ? ("" + t).trim() : t + "px";
}
function dh(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = fh(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
}
var Cy = le({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function bl(e, t) {
  if (t) {
    if (Cy[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
function Vl(e, t) {
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
var Ul = null;
function Ba(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Wl = null, ur = null, cr = null;
function Ec(e) {
  if (e = Ui(e)) {
    if (typeof Wl != "function")
      throw Error(C(280));
    var t = e.stateNode;
    t && (t = Ts(t), Wl(e.stateNode, e.type, t));
  }
}
function hh(e) {
  ur ? cr ? cr.push(e) : cr = [e] : ur = e;
}
function mh() {
  if (ur) {
    var e = ur, t = cr;
    if (cr = ur = null, Ec(e), t)
      for (e = 0; e < t.length; e++)
        Ec(t[e]);
  }
}
function ph(e, t) {
  return e(t);
}
function gh() {
}
var Js = !1;
function yh(e, t, n) {
  if (Js)
    return e(t, n);
  Js = !0;
  try {
    return ph(e, t, n);
  } finally {
    Js = !1, (ur !== null || cr !== null) && (gh(), mh());
  }
}
function pi(e, t) {
  var n = e.stateNode;
  if (n === null)
    return null;
  var r = Ts(n);
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
var jl = !1;
if (It)
  try {
    var Vr = {};
    Object.defineProperty(Vr, "passive", { get: function() {
      jl = !0;
    } }), window.addEventListener("test", Vr, Vr), window.removeEventListener("test", Vr, Vr);
  } catch {
    jl = !1;
  }
function _y(e, t, n, r, i, o, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var oi = !1, Uo = null, Wo = !1, Hl = null, Ny = { onError: function(e) {
  oi = !0, Uo = e;
} };
function Oy(e, t, n, r, i, o, s, l, a) {
  oi = !1, Uo = null, _y.apply(Ny, arguments);
}
function My(e, t, n, r, i, o, s, l, a) {
  if (Oy.apply(this, arguments), oi) {
    if (oi) {
      var u = Uo;
      oi = !1, Uo = null;
    } else
      throw Error(C(198));
    Wo || (Wo = !0, Hl = u);
  }
}
function Hn(e) {
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
function vh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
      return t.dehydrated;
  }
  return null;
}
function Tc(e) {
  if (Hn(e) !== e)
    throw Error(C(188));
}
function Dy(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Hn(e), t === null)
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
          return Tc(i), e;
        if (o === r)
          return Tc(i), t;
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
function wh(e) {
  return e = Dy(e), e !== null ? xh(e) : null;
}
function xh(e) {
  if (e.tag === 5 || e.tag === 6)
    return e;
  for (e = e.child; e !== null; ) {
    var t = xh(e);
    if (t !== null)
      return t;
    e = e.sibling;
  }
  return null;
}
var Sh = Be.unstable_scheduleCallback, Cc = Be.unstable_cancelCallback, $y = Be.unstable_shouldYield, Py = Be.unstable_requestPaint, fe = Be.unstable_now, Iy = Be.unstable_getCurrentPriorityLevel, Za = Be.unstable_ImmediatePriority, kh = Be.unstable_UserBlockingPriority, jo = Be.unstable_NormalPriority, Ly = Be.unstable_LowPriority, Eh = Be.unstable_IdlePriority, xs = null, xt = null;
function zy(e) {
  if (xt && typeof xt.onCommitFiberRoot == "function")
    try {
      xt.onCommitFiberRoot(xs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
}
var ht = Math.clz32 ? Math.clz32 : Ay, Ry = Math.log, Fy = Math.LN2;
function Ay(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Ry(e) / Fy | 0) | 0;
}
var ro = 64, io = 4194304;
function ei(e) {
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
function Ho(e, t) {
  var n = e.pendingLanes;
  if (n === 0)
    return 0;
  var r = 0, i = e.suspendedLanes, o = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var l = s & ~i;
    l !== 0 ? r = ei(l) : (o &= s, o !== 0 && (r = ei(o)));
  } else
    s = n & ~i, s !== 0 ? r = ei(s) : o !== 0 && (r = ei(o));
  if (r === 0)
    return 0;
  if (t !== 0 && t !== r && !(t & i) && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0))
    return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t; )
      n = 31 - ht(t), i = 1 << n, r |= e[n], t &= ~i;
  return r;
}
function by(e, t) {
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
function Vy(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var s = 31 - ht(o), l = 1 << s, a = i[s];
    a === -1 ? (!(l & n) || l & r) && (i[s] = by(l, t)) : a <= t && (e.expiredLanes |= l), o &= ~l;
  }
}
function Bl(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Th() {
  var e = ro;
  return ro <<= 1, !(ro & 4194240) && (ro = 64), e;
}
function Xs(e) {
  for (var t = [], n = 0; 31 > n; n++)
    t.push(e);
  return t;
}
function bi(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ht(t), e[t] = n;
}
function Uy(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - ht(n), o = 1 << i;
    t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
  }
}
function Ga(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - ht(n), i = 1 << r;
    i & t | e[r] & t && (e[r] |= t), n &= ~i;
  }
}
var Y = 0;
function Ch(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var _h, Ya, Nh, Oh, Mh, Zl = !1, oo = [], nn = null, rn = null, on = null, gi = /* @__PURE__ */ new Map(), yi = /* @__PURE__ */ new Map(), Kt = [], Wy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function _c(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      nn = null;
      break;
    case "dragenter":
    case "dragleave":
      rn = null;
      break;
    case "mouseover":
    case "mouseout":
      on = null;
      break;
    case "pointerover":
    case "pointerout":
      gi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      yi.delete(t.pointerId);
  }
}
function Ur(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = Ui(t), t !== null && Ya(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
}
function jy(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return nn = Ur(nn, e, t, n, r, i), !0;
    case "dragenter":
      return rn = Ur(rn, e, t, n, r, i), !0;
    case "mouseover":
      return on = Ur(on, e, t, n, r, i), !0;
    case "pointerover":
      var o = i.pointerId;
      return gi.set(o, Ur(gi.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return o = i.pointerId, yi.set(o, Ur(yi.get(o) || null, e, t, n, r, i)), !0;
  }
  return !1;
}
function Dh(e) {
  var t = On(e.target);
  if (t !== null) {
    var n = Hn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = vh(n), t !== null) {
          e.blockedOn = t, Mh(e.priority, function() {
            Nh(n);
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
function To(e) {
  if (e.blockedOn !== null)
    return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Gl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Ul = r, n.target.dispatchEvent(r), Ul = null;
    } else
      return t = Ui(n), t !== null && Ya(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Nc(e, t, n) {
  To(e) && n.delete(t);
}
function Hy() {
  Zl = !1, nn !== null && To(nn) && (nn = null), rn !== null && To(rn) && (rn = null), on !== null && To(on) && (on = null), gi.forEach(Nc), yi.forEach(Nc);
}
function Wr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Zl || (Zl = !0, Be.unstable_scheduleCallback(Be.unstable_NormalPriority, Hy)));
}
function vi(e) {
  function t(i) {
    return Wr(i, e);
  }
  if (0 < oo.length) {
    Wr(oo[0], e);
    for (var n = 1; n < oo.length; n++) {
      var r = oo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (nn !== null && Wr(nn, e), rn !== null && Wr(rn, e), on !== null && Wr(on, e), gi.forEach(t), yi.forEach(t), n = 0; n < Kt.length; n++)
    r = Kt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Kt.length && (n = Kt[0], n.blockedOn === null); )
    Dh(n), n.blockedOn === null && Kt.shift();
}
var fr = Vt.ReactCurrentBatchConfig, Bo = !0;
function By(e, t, n, r) {
  var i = Y, o = fr.transition;
  fr.transition = null;
  try {
    Y = 1, Qa(e, t, n, r);
  } finally {
    Y = i, fr.transition = o;
  }
}
function Zy(e, t, n, r) {
  var i = Y, o = fr.transition;
  fr.transition = null;
  try {
    Y = 4, Qa(e, t, n, r);
  } finally {
    Y = i, fr.transition = o;
  }
}
function Qa(e, t, n, r) {
  if (Bo) {
    var i = Gl(e, t, n, r);
    if (i === null)
      ul(e, t, r, Zo, n), _c(e, r);
    else if (jy(i, e, t, n, r))
      r.stopPropagation();
    else if (_c(e, r), t & 4 && -1 < Wy.indexOf(e)) {
      for (; i !== null; ) {
        var o = Ui(i);
        if (o !== null && _h(o), o = Gl(e, t, n, r), o === null && ul(e, t, r, Zo, n), o === i)
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else
      ul(e, t, r, null, n);
  }
}
var Zo = null;
function Gl(e, t, n, r) {
  if (Zo = null, e = Ba(r), e = On(e), e !== null)
    if (t = Hn(e), t === null)
      e = null;
    else if (n = t.tag, n === 13) {
      if (e = vh(t), e !== null)
        return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else
      t !== e && (e = null);
  return Zo = e, null;
}
function $h(e) {
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
      switch (Iy()) {
        case Za:
          return 1;
        case kh:
          return 4;
        case jo:
        case Ly:
          return 16;
        case Eh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Xt = null, qa = null, Co = null;
function Ph() {
  if (Co)
    return Co;
  var e, t = qa, n = t.length, r, i = "value" in Xt ? Xt.value : Xt.textContent, o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++)
    ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++)
    ;
  return Co = i.slice(e, 1 < r ? 1 - r : void 0);
}
function _o(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function so() {
  return !0;
}
function Oc() {
  return !1;
}
function Ye(e) {
  function t(n, r, i, o, s) {
    this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = s, this.currentTarget = null;
    for (var l in e)
      e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(o) : o[l]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? so : Oc, this.isPropagationStopped = Oc, this;
  }
  return le(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = so);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = so);
  }, persist: function() {
  }, isPersistent: so }), t;
}
var Pr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ka = Ye(Pr), Vi = le({}, Pr, { view: 0, detail: 0 }), Gy = Ye(Vi), el, tl, jr, Ss = le({}, Vi, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ja, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== jr && (jr && e.type === "mousemove" ? (el = e.screenX - jr.screenX, tl = e.screenY - jr.screenY) : tl = el = 0, jr = e), el);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : tl;
} }), Mc = Ye(Ss), Yy = le({}, Ss, { dataTransfer: 0 }), Qy = Ye(Yy), qy = le({}, Vi, { relatedTarget: 0 }), nl = Ye(qy), Ky = le({}, Pr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Jy = Ye(Ky), Xy = le({}, Pr, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), ev = Ye(Xy), tv = le({}, Pr, { data: 0 }), Dc = Ye(tv), nv = {
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
}, rv = {
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
}, iv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function ov(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = iv[e]) ? !!t[e] : !1;
}
function Ja() {
  return ov;
}
var sv = le({}, Vi, { key: function(e) {
  if (e.key) {
    var t = nv[e.key] || e.key;
    if (t !== "Unidentified")
      return t;
  }
  return e.type === "keypress" ? (e = _o(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? rv[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ja, charCode: function(e) {
  return e.type === "keypress" ? _o(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _o(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), lv = Ye(sv), av = le({}, Ss, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), $c = Ye(av), uv = le({}, Vi, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ja }), cv = Ye(uv), fv = le({}, Pr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), dv = Ye(fv), hv = le({}, Ss, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), mv = Ye(hv), pv = [9, 13, 27, 32], Xa = It && "CompositionEvent" in window, si = null;
It && "documentMode" in document && (si = document.documentMode);
var gv = It && "TextEvent" in window && !si, Ih = It && (!Xa || si && 8 < si && 11 >= si), Pc = String.fromCharCode(32), Ic = !1;
function Lh(e, t) {
  switch (e) {
    case "keyup":
      return pv.indexOf(t.keyCode) !== -1;
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
function zh(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Kn = !1;
function yv(e, t) {
  switch (e) {
    case "compositionend":
      return zh(t);
    case "keypress":
      return t.which !== 32 ? null : (Ic = !0, Pc);
    case "textInput":
      return e = t.data, e === Pc && Ic ? null : e;
    default:
      return null;
  }
}
function vv(e, t) {
  if (Kn)
    return e === "compositionend" || !Xa && Lh(e, t) ? (e = Ph(), Co = qa = Xt = null, Kn = !1, e) : null;
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
      return Ih && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var wv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Lc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!wv[e.type] : t === "textarea";
}
function Rh(e, t, n, r) {
  hh(r), t = Go(t, "onChange"), 0 < t.length && (n = new Ka("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var li = null, wi = null;
function xv(e) {
  Gh(e, 0);
}
function ks(e) {
  var t = er(e);
  if (sh(t))
    return e;
}
function Sv(e, t) {
  if (e === "change")
    return t;
}
var Fh = !1;
if (It) {
  var rl;
  if (It) {
    var il = "oninput" in document;
    if (!il) {
      var zc = document.createElement("div");
      zc.setAttribute("oninput", "return;"), il = typeof zc.oninput == "function";
    }
    rl = il;
  } else
    rl = !1;
  Fh = rl && (!document.documentMode || 9 < document.documentMode);
}
function Rc() {
  li && (li.detachEvent("onpropertychange", Ah), wi = li = null);
}
function Ah(e) {
  if (e.propertyName === "value" && ks(wi)) {
    var t = [];
    Rh(t, wi, e, Ba(e)), yh(xv, t);
  }
}
function kv(e, t, n) {
  e === "focusin" ? (Rc(), li = t, wi = n, li.attachEvent("onpropertychange", Ah)) : e === "focusout" && Rc();
}
function Ev(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return ks(wi);
}
function Tv(e, t) {
  if (e === "click")
    return ks(t);
}
function Cv(e, t) {
  if (e === "input" || e === "change")
    return ks(t);
}
function _v(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var gt = typeof Object.is == "function" ? Object.is : _v;
function xi(e, t) {
  if (gt(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Ml.call(t, i) || !gt(e[i], t[i]))
      return !1;
  }
  return !0;
}
function Fc(e) {
  for (; e && e.firstChild; )
    e = e.firstChild;
  return e;
}
function Ac(e, t) {
  var n = Fc(e);
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
    n = Fc(n);
  }
}
function bh(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? bh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Vh() {
  for (var e = window, t = Vo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n)
      e = t.contentWindow;
    else
      break;
    t = Vo(e.document);
  }
  return t;
}
function eu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Nv(e) {
  var t = Vh(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && bh(n.ownerDocument.documentElement, n)) {
    if (r !== null && eu(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
        n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var i = n.textContent.length, o = Math.min(r.start, i);
        r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = Ac(n, o);
        var s = Ac(
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
var Ov = It && "documentMode" in document && 11 >= document.documentMode, Jn = null, Yl = null, ai = null, Ql = !1;
function bc(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ql || Jn == null || Jn !== Vo(r) || (r = Jn, "selectionStart" in r && eu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), ai && xi(ai, r) || (ai = r, r = Go(Yl, "onSelect"), 0 < r.length && (t = new Ka("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Jn)));
}
function lo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Xn = { animationend: lo("Animation", "AnimationEnd"), animationiteration: lo("Animation", "AnimationIteration"), animationstart: lo("Animation", "AnimationStart"), transitionend: lo("Transition", "TransitionEnd") }, ol = {}, Uh = {};
It && (Uh = document.createElement("div").style, "AnimationEvent" in window || (delete Xn.animationend.animation, delete Xn.animationiteration.animation, delete Xn.animationstart.animation), "TransitionEvent" in window || delete Xn.transitionend.transition);
function Es(e) {
  if (ol[e])
    return ol[e];
  if (!Xn[e])
    return e;
  var t = Xn[e], n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in Uh)
      return ol[e] = t[n];
  return e;
}
var Wh = Es("animationend"), jh = Es("animationiteration"), Hh = Es("animationstart"), Bh = Es("transitionend"), Zh = /* @__PURE__ */ new Map(), Vc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function yn(e, t) {
  Zh.set(e, t), jn(t, [e]);
}
for (var sl = 0; sl < Vc.length; sl++) {
  var ll = Vc[sl], Mv = ll.toLowerCase(), Dv = ll[0].toUpperCase() + ll.slice(1);
  yn(Mv, "on" + Dv);
}
yn(Wh, "onAnimationEnd");
yn(jh, "onAnimationIteration");
yn(Hh, "onAnimationStart");
yn("dblclick", "onDoubleClick");
yn("focusin", "onFocus");
yn("focusout", "onBlur");
yn(Bh, "onTransitionEnd");
yr("onMouseEnter", ["mouseout", "mouseover"]);
yr("onMouseLeave", ["mouseout", "mouseover"]);
yr("onPointerEnter", ["pointerout", "pointerover"]);
yr("onPointerLeave", ["pointerout", "pointerover"]);
jn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
jn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
jn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
jn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
jn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
jn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var ti = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), $v = new Set("cancel close invalid load scroll toggle".split(" ").concat(ti));
function Uc(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, My(r, t, void 0, e), e.currentTarget = null;
}
function Gh(e, t) {
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
          Uc(i, l, u), o = a;
        }
      else
        for (s = 0; s < r.length; s++) {
          if (l = r[s], a = l.instance, u = l.currentTarget, l = l.listener, a !== o && i.isPropagationStopped())
            break e;
          Uc(i, l, u), o = a;
        }
    }
  }
  if (Wo)
    throw e = Hl, Wo = !1, Hl = null, e;
}
function X(e, t) {
  var n = t[ea];
  n === void 0 && (n = t[ea] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Yh(t, e, 2, !1), n.add(r));
}
function al(e, t, n) {
  var r = 0;
  t && (r |= 4), Yh(n, e, r, t);
}
var ao = "_reactListening" + Math.random().toString(36).slice(2);
function Si(e) {
  if (!e[ao]) {
    e[ao] = !0, th.forEach(function(n) {
      n !== "selectionchange" && ($v.has(n) || al(n, !1, e), al(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ao] || (t[ao] = !0, al("selectionchange", !1, t));
  }
}
function Yh(e, t, n, r) {
  switch ($h(t)) {
    case 1:
      var i = By;
      break;
    case 4:
      i = Zy;
      break;
    default:
      i = Qa;
  }
  n = i.bind(null, t, n, e), i = void 0, !jl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
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
  yh(function() {
    var u = o, c = Ba(n), f = [];
    e: {
      var p = Zh.get(e);
      if (p !== void 0) {
        var h = Ka, y = e;
        switch (e) {
          case "keypress":
            if (_o(n) === 0)
              break e;
          case "keydown":
          case "keyup":
            h = lv;
            break;
          case "focusin":
            y = "focus", h = nl;
            break;
          case "focusout":
            y = "blur", h = nl;
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
            h = Mc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = Qy;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = cv;
            break;
          case Wh:
          case jh:
          case Hh:
            h = Jy;
            break;
          case Bh:
            h = dv;
            break;
          case "scroll":
            h = Gy;
            break;
          case "wheel":
            h = mv;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = ev;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = $c;
        }
        var v = (t & 4) !== 0, S = !v && e === "scroll", m = v ? p !== null ? p + "Capture" : null : p;
        v = [];
        for (var d = u, g; d !== null; ) {
          g = d;
          var w = g.stateNode;
          if (g.tag === 5 && w !== null && (g = w, m !== null && (w = pi(d, m), w != null && v.push(ki(d, w, g)))), S)
            break;
          d = d.return;
        }
        0 < v.length && (p = new h(p, y, null, n, c), f.push({ event: p, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", p && n !== Ul && (y = n.relatedTarget || n.fromElement) && (On(y) || y[Lt]))
          break e;
        if ((h || p) && (p = c.window === c ? c : (p = c.ownerDocument) ? p.defaultView || p.parentWindow : window, h ? (y = n.relatedTarget || n.toElement, h = u, y = y ? On(y) : null, y !== null && (S = Hn(y), y !== S || y.tag !== 5 && y.tag !== 6) && (y = null)) : (h = null, y = u), h !== y)) {
          if (v = Mc, w = "onMouseLeave", m = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (v = $c, w = "onPointerLeave", m = "onPointerEnter", d = "pointer"), S = h == null ? p : er(h), g = y == null ? p : er(y), p = new v(w, d + "leave", h, n, c), p.target = S, p.relatedTarget = g, w = null, On(c) === u && (v = new v(m, d + "enter", y, n, c), v.target = g, v.relatedTarget = S, w = v), S = w, h && y)
            t: {
              for (v = h, m = y, d = 0, g = v; g; g = Yn(g))
                d++;
              for (g = 0, w = m; w; w = Yn(w))
                g++;
              for (; 0 < d - g; )
                v = Yn(v), d--;
              for (; 0 < g - d; )
                m = Yn(m), g--;
              for (; d--; ) {
                if (v === m || m !== null && v === m.alternate)
                  break t;
                v = Yn(v), m = Yn(m);
              }
              v = null;
            }
          else
            v = null;
          h !== null && Wc(f, p, h, v, !1), y !== null && S !== null && Wc(f, S, y, v, !0);
        }
      }
      e: {
        if (p = u ? er(u) : window, h = p.nodeName && p.nodeName.toLowerCase(), h === "select" || h === "input" && p.type === "file")
          var x = Sv;
        else if (Lc(p))
          if (Fh)
            x = Cv;
          else {
            x = Ev;
            var T = kv;
          }
        else
          (h = p.nodeName) && h.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (x = Tv);
        if (x && (x = x(e, u))) {
          Rh(f, x, n, c);
          break e;
        }
        T && T(e, p, u), e === "focusout" && (T = p._wrapperState) && T.controlled && p.type === "number" && Rl(p, "number", p.value);
      }
      switch (T = u ? er(u) : window, e) {
        case "focusin":
          (Lc(T) || T.contentEditable === "true") && (Jn = T, Yl = u, ai = null);
          break;
        case "focusout":
          ai = Yl = Jn = null;
          break;
        case "mousedown":
          Ql = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ql = !1, bc(f, n, c);
          break;
        case "selectionchange":
          if (Ov)
            break;
        case "keydown":
        case "keyup":
          bc(f, n, c);
      }
      var _;
      if (Xa)
        e: {
          switch (e) {
            case "compositionstart":
              var E = "onCompositionStart";
              break e;
            case "compositionend":
              E = "onCompositionEnd";
              break e;
            case "compositionupdate":
              E = "onCompositionUpdate";
              break e;
          }
          E = void 0;
        }
      else
        Kn ? Lh(e, n) && (E = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (E = "onCompositionStart");
      E && (Ih && n.locale !== "ko" && (Kn || E !== "onCompositionStart" ? E === "onCompositionEnd" && Kn && (_ = Ph()) : (Xt = c, qa = "value" in Xt ? Xt.value : Xt.textContent, Kn = !0)), T = Go(u, E), 0 < T.length && (E = new Dc(E, e, null, n, c), f.push({ event: E, listeners: T }), _ ? E.data = _ : (_ = zh(n), _ !== null && (E.data = _)))), (_ = gv ? yv(e, n) : vv(e, n)) && (u = Go(u, "onBeforeInput"), 0 < u.length && (c = new Dc("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: u }), c.data = _));
    }
    Gh(f, t);
  });
}
function ki(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Go(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e, o = i.stateNode;
    i.tag === 5 && o !== null && (i = o, o = pi(e, n), o != null && r.unshift(ki(e, o, i)), o = pi(e, t), o != null && r.push(ki(e, o, i))), e = e.return;
  }
  return r;
}
function Yn(e) {
  if (e === null)
    return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Wc(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n, a = l.alternate, u = l.stateNode;
    if (a !== null && a === r)
      break;
    l.tag === 5 && u !== null && (l = u, i ? (a = pi(n, o), a != null && s.unshift(ki(n, a, l))) : i || (a = pi(n, o), a != null && s.push(ki(n, a, l)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Pv = /\r\n?/g, Iv = /\u0000|\uFFFD/g;
function jc(e) {
  return (typeof e == "string" ? e : "" + e).replace(Pv, `
`).replace(Iv, "");
}
function uo(e, t, n) {
  if (t = jc(t), jc(e) !== t && n)
    throw Error(C(425));
}
function Yo() {
}
var ql = null, Kl = null;
function Jl(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Xl = typeof setTimeout == "function" ? setTimeout : void 0, Lv = typeof clearTimeout == "function" ? clearTimeout : void 0, Hc = typeof Promise == "function" ? Promise : void 0, zv = typeof queueMicrotask == "function" ? queueMicrotask : typeof Hc < "u" ? function(e) {
  return Hc.resolve(null).then(e).catch(Rv);
} : Xl;
function Rv(e) {
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
          e.removeChild(i), vi(t);
          return;
        }
        r--;
      } else
        n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = i;
  } while (n);
  vi(t);
}
function sn(e) {
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
function Bc(e) {
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
var Ir = Math.random().toString(36).slice(2), wt = "__reactFiber$" + Ir, Ei = "__reactProps$" + Ir, Lt = "__reactContainer$" + Ir, ea = "__reactEvents$" + Ir, Fv = "__reactListeners$" + Ir, Av = "__reactHandles$" + Ir;
function On(e) {
  var t = e[wt];
  if (t)
    return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Lt] || n[wt]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = Bc(e); e !== null; ) {
          if (n = e[wt])
            return n;
          e = Bc(e);
        }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Ui(e) {
  return e = e[wt] || e[Lt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function er(e) {
  if (e.tag === 5 || e.tag === 6)
    return e.stateNode;
  throw Error(C(33));
}
function Ts(e) {
  return e[Ei] || null;
}
var ta = [], tr = -1;
function vn(e) {
  return { current: e };
}
function te(e) {
  0 > tr || (e.current = ta[tr], ta[tr] = null, tr--);
}
function q(e, t) {
  tr++, ta[tr] = e.current, e.current = t;
}
var hn = {}, Oe = vn(hn), Re = vn(!1), Rn = hn;
function vr(e, t) {
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
function Fe(e) {
  return e = e.childContextTypes, e != null;
}
function Qo() {
  te(Re), te(Oe);
}
function Zc(e, t, n) {
  if (Oe.current !== hn)
    throw Error(C(168));
  q(Oe, t), q(Re, n);
}
function Qh(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function")
    return n;
  r = r.getChildContext();
  for (var i in r)
    if (!(i in t))
      throw Error(C(108, ky(e) || "Unknown", i));
  return le({}, n, r);
}
function qo(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || hn, Rn = Oe.current, q(Oe, e), q(Re, Re.current), !0;
}
function Gc(e, t, n) {
  var r = e.stateNode;
  if (!r)
    throw Error(C(169));
  n ? (e = Qh(e, t, Rn), r.__reactInternalMemoizedMergedChildContext = e, te(Re), te(Oe), q(Oe, e)) : te(Re), q(Re, n);
}
var Nt = null, Cs = !1, fl = !1;
function qh(e) {
  Nt === null ? Nt = [e] : Nt.push(e);
}
function bv(e) {
  Cs = !0, qh(e);
}
function wn() {
  if (!fl && Nt !== null) {
    fl = !0;
    var e = 0, t = Y;
    try {
      var n = Nt;
      for (Y = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Nt = null, Cs = !1;
    } catch (i) {
      throw Nt !== null && (Nt = Nt.slice(e + 1)), Sh(Za, wn), i;
    } finally {
      Y = t, fl = !1;
    }
  }
  return null;
}
var nr = [], rr = 0, Ko = null, Jo = 0, Ke = [], Je = 0, Fn = null, Mt = 1, Dt = "";
function Tn(e, t) {
  nr[rr++] = Jo, nr[rr++] = Ko, Ko = e, Jo = t;
}
function Kh(e, t, n) {
  Ke[Je++] = Mt, Ke[Je++] = Dt, Ke[Je++] = Fn, Fn = e;
  var r = Mt;
  e = Dt;
  var i = 32 - ht(r) - 1;
  r &= ~(1 << i), n += 1;
  var o = 32 - ht(t) + i;
  if (30 < o) {
    var s = i - i % 5;
    o = (r & (1 << s) - 1).toString(32), r >>= s, i -= s, Mt = 1 << 32 - ht(t) + i | n << i | r, Dt = o + e;
  } else
    Mt = 1 << o | n << i | r, Dt = e;
}
function tu(e) {
  e.return !== null && (Tn(e, 1), Kh(e, 1, 0));
}
function nu(e) {
  for (; e === Ko; )
    Ko = nr[--rr], nr[rr] = null, Jo = nr[--rr], nr[rr] = null;
  for (; e === Fn; )
    Fn = Ke[--Je], Ke[Je] = null, Dt = Ke[--Je], Ke[Je] = null, Mt = Ke[--Je], Ke[Je] = null;
}
var je = null, Ue = null, ne = !1, ft = null;
function Jh(e, t) {
  var n = et(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Yc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, je = e, Ue = sn(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, je = e, Ue = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Fn !== null ? { id: Mt, overflow: Dt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = et(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, je = e, Ue = null, !0) : !1;
    default:
      return !1;
  }
}
function na(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ra(e) {
  if (ne) {
    var t = Ue;
    if (t) {
      var n = t;
      if (!Yc(e, t)) {
        if (na(e))
          throw Error(C(418));
        t = sn(n.nextSibling);
        var r = je;
        t && Yc(e, t) ? Jh(r, n) : (e.flags = e.flags & -4097 | 2, ne = !1, je = e);
      }
    } else {
      if (na(e))
        throw Error(C(418));
      e.flags = e.flags & -4097 | 2, ne = !1, je = e;
    }
  }
}
function Qc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  je = e;
}
function co(e) {
  if (e !== je)
    return !1;
  if (!ne)
    return Qc(e), ne = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Jl(e.type, e.memoizedProps)), t && (t = Ue)) {
    if (na(e))
      throw Xh(), Error(C(418));
    for (; t; )
      Jh(e, t), t = sn(t.nextSibling);
  }
  if (Qc(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
      throw Error(C(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ue = sn(e.nextSibling);
              break e;
            }
            t--;
          } else
            n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ue = null;
    }
  } else
    Ue = je ? sn(e.stateNode.nextSibling) : null;
  return !0;
}
function Xh() {
  for (var e = Ue; e; )
    e = sn(e.nextSibling);
}
function wr() {
  Ue = je = null, ne = !1;
}
function ru(e) {
  ft === null ? ft = [e] : ft.push(e);
}
var Vv = Vt.ReactCurrentBatchConfig;
function ut(e, t) {
  if (e && e.defaultProps) {
    t = le({}, t), e = e.defaultProps;
    for (var n in e)
      t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var Xo = vn(null), es = null, ir = null, iu = null;
function ou() {
  iu = ir = es = null;
}
function su(e) {
  var t = Xo.current;
  te(Xo), e._currentValue = t;
}
function ia(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
      break;
    e = e.return;
  }
}
function dr(e, t) {
  es = e, iu = ir = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ze = !0), e.firstContext = null);
}
function nt(e) {
  var t = e._currentValue;
  if (iu !== e)
    if (e = { context: e, memoizedValue: t, next: null }, ir === null) {
      if (es === null)
        throw Error(C(308));
      ir = e, es.dependencies = { lanes: 0, firstContext: e };
    } else
      ir = ir.next = e;
  return t;
}
var Mn = null;
function lu(e) {
  Mn === null ? Mn = [e] : Mn.push(e);
}
function em(e, t, n, r) {
  var i = t.interleaved;
  return i === null ? (n.next = n, lu(t)) : (n.next = i.next, i.next = n), t.interleaved = n, zt(e, r);
}
function zt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Qt = !1;
function au(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function tm(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Pt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ln(e, t, n) {
  var r = e.updateQueue;
  if (r === null)
    return null;
  if (r = r.shared, B & 2) {
    var i = r.pending;
    return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, zt(e, n);
  }
  return i = r.interleaved, i === null ? (t.next = t, lu(r)) : (t.next = i.next, i.next = t), r.interleaved = t, zt(e, n);
}
function No(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ga(e, n);
  }
}
function qc(e, t) {
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
function ts(e, t, n, r) {
  var i = e.updateQueue;
  Qt = !1;
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
          var y = e, v = l;
          switch (p = t, h = n, v.tag) {
            case 1:
              if (y = v.payload, typeof y == "function") {
                f = y.call(h, f, p);
                break e;
              }
              f = y;
              break e;
            case 3:
              y.flags = y.flags & -65537 | 128;
            case 0:
              if (y = v.payload, p = typeof y == "function" ? y.call(h, f, p) : y, p == null)
                break e;
              f = le({}, f, p);
              break e;
            case 2:
              Qt = !0;
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
function Kc(e, t, n) {
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
var nm = new eh.Component().refs;
function oa(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : le({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var _s = { isMounted: function(e) {
  return (e = e._reactInternals) ? Hn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = De(), i = un(e), o = Pt(r, i);
  o.payload = t, n != null && (o.callback = n), t = ln(e, o, i), t !== null && (mt(t, e, i, r), No(t, e, i));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = De(), i = un(e), o = Pt(r, i);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = ln(e, o, i), t !== null && (mt(t, e, i, r), No(t, e, i));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = De(), r = un(e), i = Pt(n, r);
  i.tag = 2, t != null && (i.callback = t), t = ln(e, i, r), t !== null && (mt(t, e, r, n), No(t, e, r));
} };
function Jc(e, t, n, r, i, o, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, s) : t.prototype && t.prototype.isPureReactComponent ? !xi(n, r) || !xi(i, o) : !0;
}
function rm(e, t, n) {
  var r = !1, i = hn, o = t.contextType;
  return typeof o == "object" && o !== null ? o = nt(o) : (i = Fe(t) ? Rn : Oe.current, r = t.contextTypes, o = (r = r != null) ? vr(e, i) : hn), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = _s, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Xc(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && _s.enqueueReplaceState(t, t.state, null);
}
function sa(e, t, n, r) {
  var i = e.stateNode;
  i.props = n, i.state = e.memoizedState, i.refs = nm, au(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? i.context = nt(o) : (o = Fe(t) ? Rn : Oe.current, i.context = vr(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (oa(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && _s.enqueueReplaceState(i, i.state, null), ts(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Hr(e, t, n) {
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
        l === nm && (l = i.refs = {}), s === null ? delete l[o] : l[o] = s;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string")
      throw Error(C(284));
    if (!n._owner)
      throw Error(C(290, e));
  }
  return e;
}
function fo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(C(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ef(e) {
  var t = e._init;
  return t(e._payload);
}
function im(e) {
  function t(m, d) {
    if (e) {
      var g = m.deletions;
      g === null ? (m.deletions = [d], m.flags |= 16) : g.push(d);
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
    return m = cn(m, d), m.index = 0, m.sibling = null, m;
  }
  function o(m, d, g) {
    return m.index = g, e ? (g = m.alternate, g !== null ? (g = g.index, g < d ? (m.flags |= 2, d) : g) : (m.flags |= 2, d)) : (m.flags |= 1048576, d);
  }
  function s(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function l(m, d, g, w) {
    return d === null || d.tag !== 6 ? (d = vl(g, m.mode, w), d.return = m, d) : (d = i(d, g), d.return = m, d);
  }
  function a(m, d, g, w) {
    var x = g.type;
    return x === qn ? c(m, d, g.props.children, w, g.key) : d !== null && (d.elementType === x || typeof x == "object" && x !== null && x.$$typeof === Yt && ef(x) === d.type) ? (w = i(d, g.props), w.ref = Hr(m, d, g), w.return = m, w) : (w = Io(g.type, g.key, g.props, null, m.mode, w), w.ref = Hr(m, d, g), w.return = m, w);
  }
  function u(m, d, g, w) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== g.containerInfo || d.stateNode.implementation !== g.implementation ? (d = wl(g, m.mode, w), d.return = m, d) : (d = i(d, g.children || []), d.return = m, d);
  }
  function c(m, d, g, w, x) {
    return d === null || d.tag !== 7 ? (d = zn(g, m.mode, w, x), d.return = m, d) : (d = i(d, g), d.return = m, d);
  }
  function f(m, d, g) {
    if (typeof d == "string" && d !== "" || typeof d == "number")
      return d = vl("" + d, m.mode, g), d.return = m, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case eo:
          return g = Io(d.type, d.key, d.props, null, m.mode, g), g.ref = Hr(m, null, d), g.return = m, g;
        case Qn:
          return d = wl(d, m.mode, g), d.return = m, d;
        case Yt:
          var w = d._init;
          return f(m, w(d._payload), g);
      }
      if (Xr(d) || br(d))
        return d = zn(d, m.mode, g, null), d.return = m, d;
      fo(m, d);
    }
    return null;
  }
  function p(m, d, g, w) {
    var x = d !== null ? d.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number")
      return x !== null ? null : l(m, d, "" + g, w);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case eo:
          return g.key === x ? a(m, d, g, w) : null;
        case Qn:
          return g.key === x ? u(m, d, g, w) : null;
        case Yt:
          return x = g._init, p(
            m,
            d,
            x(g._payload),
            w
          );
      }
      if (Xr(g) || br(g))
        return x !== null ? null : c(m, d, g, w, null);
      fo(m, g);
    }
    return null;
  }
  function h(m, d, g, w, x) {
    if (typeof w == "string" && w !== "" || typeof w == "number")
      return m = m.get(g) || null, l(d, m, "" + w, x);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case eo:
          return m = m.get(w.key === null ? g : w.key) || null, a(d, m, w, x);
        case Qn:
          return m = m.get(w.key === null ? g : w.key) || null, u(d, m, w, x);
        case Yt:
          var T = w._init;
          return h(m, d, g, T(w._payload), x);
      }
      if (Xr(w) || br(w))
        return m = m.get(g) || null, c(d, m, w, x, null);
      fo(d, w);
    }
    return null;
  }
  function y(m, d, g, w) {
    for (var x = null, T = null, _ = d, E = d = 0, L = null; _ !== null && E < g.length; E++) {
      _.index > E ? (L = _, _ = null) : L = _.sibling;
      var $ = p(m, _, g[E], w);
      if ($ === null) {
        _ === null && (_ = L);
        break;
      }
      e && _ && $.alternate === null && t(m, _), d = o($, d, E), T === null ? x = $ : T.sibling = $, T = $, _ = L;
    }
    if (E === g.length)
      return n(m, _), ne && Tn(m, E), x;
    if (_ === null) {
      for (; E < g.length; E++)
        _ = f(m, g[E], w), _ !== null && (d = o(_, d, E), T === null ? x = _ : T.sibling = _, T = _);
      return ne && Tn(m, E), x;
    }
    for (_ = r(m, _); E < g.length; E++)
      L = h(_, m, E, g[E], w), L !== null && (e && L.alternate !== null && _.delete(L.key === null ? E : L.key), d = o(L, d, E), T === null ? x = L : T.sibling = L, T = L);
    return e && _.forEach(function(H) {
      return t(m, H);
    }), ne && Tn(m, E), x;
  }
  function v(m, d, g, w) {
    var x = br(g);
    if (typeof x != "function")
      throw Error(C(150));
    if (g = x.call(g), g == null)
      throw Error(C(151));
    for (var T = x = null, _ = d, E = d = 0, L = null, $ = g.next(); _ !== null && !$.done; E++, $ = g.next()) {
      _.index > E ? (L = _, _ = null) : L = _.sibling;
      var H = p(m, _, $.value, w);
      if (H === null) {
        _ === null && (_ = L);
        break;
      }
      e && _ && H.alternate === null && t(m, _), d = o(H, d, E), T === null ? x = H : T.sibling = H, T = H, _ = L;
    }
    if ($.done)
      return n(
        m,
        _
      ), ne && Tn(m, E), x;
    if (_ === null) {
      for (; !$.done; E++, $ = g.next())
        $ = f(m, $.value, w), $ !== null && (d = o($, d, E), T === null ? x = $ : T.sibling = $, T = $);
      return ne && Tn(m, E), x;
    }
    for (_ = r(m, _); !$.done; E++, $ = g.next())
      $ = h(_, m, E, $.value, w), $ !== null && (e && $.alternate !== null && _.delete($.key === null ? E : $.key), d = o($, d, E), T === null ? x = $ : T.sibling = $, T = $);
    return e && _.forEach(function(P) {
      return t(m, P);
    }), ne && Tn(m, E), x;
  }
  function S(m, d, g, w) {
    if (typeof g == "object" && g !== null && g.type === qn && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case eo:
          e: {
            for (var x = g.key, T = d; T !== null; ) {
              if (T.key === x) {
                if (x = g.type, x === qn) {
                  if (T.tag === 7) {
                    n(m, T.sibling), d = i(T, g.props.children), d.return = m, m = d;
                    break e;
                  }
                } else if (T.elementType === x || typeof x == "object" && x !== null && x.$$typeof === Yt && ef(x) === T.type) {
                  n(m, T.sibling), d = i(T, g.props), d.ref = Hr(m, T, g), d.return = m, m = d;
                  break e;
                }
                n(m, T);
                break;
              } else
                t(m, T);
              T = T.sibling;
            }
            g.type === qn ? (d = zn(g.props.children, m.mode, w, g.key), d.return = m, m = d) : (w = Io(g.type, g.key, g.props, null, m.mode, w), w.ref = Hr(m, d, g), w.return = m, m = w);
          }
          return s(m);
        case Qn:
          e: {
            for (T = g.key; d !== null; ) {
              if (d.key === T)
                if (d.tag === 4 && d.stateNode.containerInfo === g.containerInfo && d.stateNode.implementation === g.implementation) {
                  n(m, d.sibling), d = i(d, g.children || []), d.return = m, m = d;
                  break e;
                } else {
                  n(m, d);
                  break;
                }
              else
                t(m, d);
              d = d.sibling;
            }
            d = wl(g, m.mode, w), d.return = m, m = d;
          }
          return s(m);
        case Yt:
          return T = g._init, S(m, d, T(g._payload), w);
      }
      if (Xr(g))
        return y(m, d, g, w);
      if (br(g))
        return v(m, d, g, w);
      fo(m, g);
    }
    return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, d !== null && d.tag === 6 ? (n(m, d.sibling), d = i(d, g), d.return = m, m = d) : (n(m, d), d = vl(g, m.mode, w), d.return = m, m = d), s(m)) : n(m, d);
  }
  return S;
}
var xr = im(!0), om = im(!1), Wi = {}, St = vn(Wi), Ti = vn(Wi), Ci = vn(Wi);
function Dn(e) {
  if (e === Wi)
    throw Error(C(174));
  return e;
}
function uu(e, t) {
  switch (q(Ci, t), q(Ti, e), q(St, Wi), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Al(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Al(t, e);
  }
  te(St), q(St, t);
}
function Sr() {
  te(St), te(Ti), te(Ci);
}
function sm(e) {
  Dn(Ci.current);
  var t = Dn(St.current), n = Al(t, e.type);
  t !== n && (q(Ti, e), q(St, n));
}
function cu(e) {
  Ti.current === e && (te(St), te(Ti));
}
var oe = vn(0);
function ns(e) {
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
function fu() {
  for (var e = 0; e < dl.length; e++)
    dl[e]._workInProgressVersionPrimary = null;
  dl.length = 0;
}
var Oo = Vt.ReactCurrentDispatcher, hl = Vt.ReactCurrentBatchConfig, An = 0, se = null, ge = null, ve = null, rs = !1, ui = !1, _i = 0, Uv = 0;
function Ee() {
  throw Error(C(321));
}
function du(e, t) {
  if (t === null)
    return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!gt(e[n], t[n]))
      return !1;
  return !0;
}
function hu(e, t, n, r, i, o) {
  if (An = o, se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Oo.current = e === null || e.memoizedState === null ? Bv : Zv, e = n(r, i), ui) {
    o = 0;
    do {
      if (ui = !1, _i = 0, 25 <= o)
        throw Error(C(301));
      o += 1, ve = ge = null, t.updateQueue = null, Oo.current = Gv, e = n(r, i);
    } while (ui);
  }
  if (Oo.current = is, t = ge !== null && ge.next !== null, An = 0, ve = ge = se = null, rs = !1, t)
    throw Error(C(300));
  return e;
}
function mu() {
  var e = _i !== 0;
  return _i = 0, e;
}
function vt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ve === null ? se.memoizedState = ve = e : ve = ve.next = e, ve;
}
function rt() {
  if (ge === null) {
    var e = se.alternate;
    e = e !== null ? e.memoizedState : null;
  } else
    e = ge.next;
  var t = ve === null ? se.memoizedState : ve.next;
  if (t !== null)
    ve = t, ge = e;
  else {
    if (e === null)
      throw Error(C(310));
    ge = e, e = { memoizedState: ge.memoizedState, baseState: ge.baseState, baseQueue: ge.baseQueue, queue: ge.queue, next: null }, ve === null ? se.memoizedState = ve = e : ve = ve.next = e;
  }
  return ve;
}
function Ni(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ml(e) {
  var t = rt(), n = t.queue;
  if (n === null)
    throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = ge, i = r.baseQueue, o = n.pending;
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
        a === null ? (l = a = f, s = r) : a = a.next = f, se.lanes |= c, bn |= c;
      }
      u = u.next;
    } while (u !== null && u !== o);
    a === null ? s = r : a.next = l, gt(r, t.memoizedState) || (ze = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = a, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    i = e;
    do
      o = i.lane, se.lanes |= o, bn |= o, i = i.next;
    while (i !== e);
  } else
    i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function pl(e) {
  var t = rt(), n = t.queue;
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
    gt(o, t.memoizedState) || (ze = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function lm() {
}
function am(e, t) {
  var n = se, r = rt(), i = t(), o = !gt(r.memoizedState, i);
  if (o && (r.memoizedState = i, ze = !0), r = r.queue, pu(fm.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ve !== null && ve.memoizedState.tag & 1) {
    if (n.flags |= 2048, Oi(9, cm.bind(null, n, r, i, t), void 0, null), we === null)
      throw Error(C(349));
    An & 30 || um(n, t, i);
  }
  return i;
}
function um(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = se.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, se.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function cm(e, t, n, r) {
  t.value = n, t.getSnapshot = r, dm(t) && hm(e);
}
function fm(e, t, n) {
  return n(function() {
    dm(t) && hm(e);
  });
}
function dm(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !gt(e, n);
  } catch {
    return !0;
  }
}
function hm(e) {
  var t = zt(e, 1);
  t !== null && mt(t, e, 1, -1);
}
function tf(e) {
  var t = vt();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ni, lastRenderedState: e }, t.queue = e, e = e.dispatch = Hv.bind(null, se, e), [t.memoizedState, e];
}
function Oi(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = se.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, se.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function mm() {
  return rt().memoizedState;
}
function Mo(e, t, n, r) {
  var i = vt();
  se.flags |= e, i.memoizedState = Oi(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ns(e, t, n, r) {
  var i = rt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ge !== null) {
    var s = ge.memoizedState;
    if (o = s.destroy, r !== null && du(r, s.deps)) {
      i.memoizedState = Oi(t, n, o, r);
      return;
    }
  }
  se.flags |= e, i.memoizedState = Oi(1 | t, n, o, r);
}
function nf(e, t) {
  return Mo(8390656, 8, e, t);
}
function pu(e, t) {
  return Ns(2048, 8, e, t);
}
function pm(e, t) {
  return Ns(4, 2, e, t);
}
function gm(e, t) {
  return Ns(4, 4, e, t);
}
function ym(e, t) {
  if (typeof t == "function")
    return e = e(), t(e), function() {
      t(null);
    };
  if (t != null)
    return e = e(), t.current = e, function() {
      t.current = null;
    };
}
function vm(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ns(4, 4, ym.bind(null, t, e), n);
}
function gu() {
}
function wm(e, t) {
  var n = rt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && du(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function xm(e, t) {
  var n = rt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && du(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Sm(e, t, n) {
  return An & 21 ? (gt(n, t) || (n = Th(), se.lanes |= n, bn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ze = !0), e.memoizedState = n);
}
function Wv(e, t) {
  var n = Y;
  Y = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = hl.transition;
  hl.transition = {};
  try {
    e(!1), t();
  } finally {
    Y = n, hl.transition = r;
  }
}
function km() {
  return rt().memoizedState;
}
function jv(e, t, n) {
  var r = un(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Em(e))
    Tm(t, n);
  else if (n = em(e, t, n, r), n !== null) {
    var i = De();
    mt(n, e, r, i), Cm(n, t, r);
  }
}
function Hv(e, t, n) {
  var r = un(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Em(e))
    Tm(t, i);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null))
      try {
        var s = t.lastRenderedState, l = o(s, n);
        if (i.hasEagerState = !0, i.eagerState = l, gt(l, s)) {
          var a = t.interleaved;
          a === null ? (i.next = i, lu(t)) : (i.next = a.next, a.next = i), t.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
    n = em(e, t, i, r), n !== null && (i = De(), mt(n, e, r, i), Cm(n, t, r));
  }
}
function Em(e) {
  var t = e.alternate;
  return e === se || t !== null && t === se;
}
function Tm(e, t) {
  ui = rs = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Cm(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ga(e, n);
  }
}
var is = { readContext: nt, useCallback: Ee, useContext: Ee, useEffect: Ee, useImperativeHandle: Ee, useInsertionEffect: Ee, useLayoutEffect: Ee, useMemo: Ee, useReducer: Ee, useRef: Ee, useState: Ee, useDebugValue: Ee, useDeferredValue: Ee, useTransition: Ee, useMutableSource: Ee, useSyncExternalStore: Ee, useId: Ee, unstable_isNewReconciler: !1 }, Bv = { readContext: nt, useCallback: function(e, t) {
  return vt().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: nt, useEffect: nf, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Mo(
    4194308,
    4,
    ym.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Mo(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Mo(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = vt();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = vt();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = jv.bind(null, se, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = vt();
  return e = { current: e }, t.memoizedState = e;
}, useState: tf, useDebugValue: gu, useDeferredValue: function(e) {
  return vt().memoizedState = e;
}, useTransition: function() {
  var e = tf(!1), t = e[0];
  return e = Wv.bind(null, e[1]), vt().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = se, i = vt();
  if (ne) {
    if (n === void 0)
      throw Error(C(407));
    n = n();
  } else {
    if (n = t(), we === null)
      throw Error(C(349));
    An & 30 || um(r, t, n);
  }
  i.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return i.queue = o, nf(fm.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Oi(9, cm.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = vt(), t = we.identifierPrefix;
  if (ne) {
    var n = Dt, r = Mt;
    n = (r & ~(1 << 32 - ht(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = _i++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else
    n = Uv++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Zv = {
  readContext: nt,
  useCallback: wm,
  useContext: nt,
  useEffect: pu,
  useImperativeHandle: vm,
  useInsertionEffect: pm,
  useLayoutEffect: gm,
  useMemo: xm,
  useReducer: ml,
  useRef: mm,
  useState: function() {
    return ml(Ni);
  },
  useDebugValue: gu,
  useDeferredValue: function(e) {
    var t = rt();
    return Sm(t, ge.memoizedState, e);
  },
  useTransition: function() {
    var e = ml(Ni)[0], t = rt().memoizedState;
    return [e, t];
  },
  useMutableSource: lm,
  useSyncExternalStore: am,
  useId: km,
  unstable_isNewReconciler: !1
}, Gv = { readContext: nt, useCallback: wm, useContext: nt, useEffect: pu, useImperativeHandle: vm, useInsertionEffect: pm, useLayoutEffect: gm, useMemo: xm, useReducer: pl, useRef: mm, useState: function() {
  return pl(Ni);
}, useDebugValue: gu, useDeferredValue: function(e) {
  var t = rt();
  return ge === null ? t.memoizedState = e : Sm(t, ge.memoizedState, e);
}, useTransition: function() {
  var e = pl(Ni)[0], t = rt().memoizedState;
  return [e, t];
}, useMutableSource: lm, useSyncExternalStore: am, useId: km, unstable_isNewReconciler: !1 };
function kr(e, t) {
  try {
    var n = "", r = t;
    do
      n += Sy(r), r = r.return;
    while (r);
    var i = n;
  } catch (o) {
    i = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function gl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function la(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Yv = typeof WeakMap == "function" ? WeakMap : Map;
function _m(e, t, n) {
  n = Pt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ss || (ss = !0, ya = r), la(e, t);
  }, n;
}
function Nm(e, t, n) {
  n = Pt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    n.payload = function() {
      return r(i);
    }, n.callback = function() {
      la(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    la(e, t), typeof r != "function" && (an === null ? an = /* @__PURE__ */ new Set([this]) : an.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function rf(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Yv();
    var i = /* @__PURE__ */ new Set();
    r.set(t, i);
  } else
    i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
  i.has(n) || (i.add(n), e = a1.bind(null, e, t, n), t.then(e, e));
}
function of(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function sf(e, t, n, r, i) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Pt(-1, 1), t.tag = 2, ln(n, t, 1))), n.lanes |= 1), e);
}
var Qv = Vt.ReactCurrentOwner, ze = !1;
function Me(e, t, n, r) {
  t.child = e === null ? om(t, null, n, r) : xr(t, e.child, n, r);
}
function lf(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return dr(t, i), r = hu(e, t, n, r, o, i), n = mu(), e !== null && !ze ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Rt(e, t, i)) : (ne && n && tu(t), t.flags |= 1, Me(e, t, r, i), t.child);
}
function af(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Tu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Om(e, t, o, r, i)) : (e = Io(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & i)) {
    var s = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : xi, n(s, r) && e.ref === t.ref)
      return Rt(e, t, i);
  }
  return t.flags |= 1, e = cn(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Om(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (xi(o, r) && e.ref === t.ref)
      if (ze = !1, t.pendingProps = r = o, (e.lanes & i) !== 0)
        e.flags & 131072 && (ze = !0);
      else
        return t.lanes = e.lanes, Rt(e, t, i);
  }
  return aa(e, t, n, r, i);
}
function Mm(e, t, n) {
  var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, q(sr, be), be |= n;
    else {
      if (!(n & 1073741824))
        return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, q(sr, be), be |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, q(sr, be), be |= r;
    }
  else
    o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, q(sr, be), be |= r;
  return Me(e, t, i, n), t.child;
}
function Dm(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function aa(e, t, n, r, i) {
  var o = Fe(n) ? Rn : Oe.current;
  return o = vr(t, o), dr(t, i), n = hu(e, t, n, r, o, i), r = mu(), e !== null && !ze ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Rt(e, t, i)) : (ne && r && tu(t), t.flags |= 1, Me(e, t, n, i), t.child);
}
function uf(e, t, n, r, i) {
  if (Fe(n)) {
    var o = !0;
    qo(t);
  } else
    o = !1;
  if (dr(t, i), t.stateNode === null)
    Do(e, t), rm(t, n, r), sa(t, n, r, i), r = !0;
  else if (e === null) {
    var s = t.stateNode, l = t.memoizedProps;
    s.props = l;
    var a = s.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = nt(u) : (u = Fe(n) ? Rn : Oe.current, u = vr(t, u));
    var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    f || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (l !== r || a !== u) && Xc(t, s, r, u), Qt = !1;
    var p = t.memoizedState;
    s.state = p, ts(t, r, s, i), a = t.memoizedState, l !== r || p !== a || Re.current || Qt ? (typeof c == "function" && (oa(t, n, c, r), a = t.memoizedState), (l = Qt || Jc(t, n, l, r, p, a, u)) ? (f || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), s.props = r, s.state = a, s.context = u, r = l) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, tm(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : ut(t.type, l), s.props = u, f = t.pendingProps, p = s.context, a = n.contextType, typeof a == "object" && a !== null ? a = nt(a) : (a = Fe(n) ? Rn : Oe.current, a = vr(t, a));
    var h = n.getDerivedStateFromProps;
    (c = typeof h == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (l !== f || p !== a) && Xc(t, s, r, a), Qt = !1, p = t.memoizedState, s.state = p, ts(t, r, s, i);
    var y = t.memoizedState;
    l !== f || p !== y || Re.current || Qt ? (typeof h == "function" && (oa(t, n, h, r), y = t.memoizedState), (u = Qt || Jc(t, n, u, r, p, y, a) || !1) ? (c || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, y, a), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, y, a)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = y), s.props = r, s.state = y, s.context = a, r = u) : (typeof s.componentDidUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return ua(e, t, n, r, o, i);
}
function ua(e, t, n, r, i, o) {
  Dm(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s)
    return i && Gc(t, n, !1), Rt(e, t, o);
  r = t.stateNode, Qv.current = t;
  var l = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = xr(t, e.child, null, o), t.child = xr(t, null, l, o)) : Me(e, t, l, o), t.memoizedState = r.state, i && Gc(t, n, !0), t.child;
}
function $m(e) {
  var t = e.stateNode;
  t.pendingContext ? Zc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zc(e, t.context, !1), uu(e, t.containerInfo);
}
function cf(e, t, n, r, i) {
  return wr(), ru(i), t.flags |= 256, Me(e, t, n, r), t.child;
}
var ca = { dehydrated: null, treeContext: null, retryLane: 0 };
function fa(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Pm(e, t, n) {
  var r = t.pendingProps, i = oe.current, o = !1, s = (t.flags & 128) !== 0, l;
  if ((l = s) || (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), l ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), q(oe, i & 1), e === null)
    return ra(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, s = { mode: "hidden", children: s }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = s) : o = Ds(s, r, 0, null), e = zn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = fa(n), t.memoizedState = ca, e) : yu(t, s));
  if (i = e.memoizedState, i !== null && (l = i.dehydrated, l !== null))
    return qv(e, t, s, r, l, i, n);
  if (o) {
    o = r.fallback, s = t.mode, i = e.child, l = i.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = cn(i, a), r.subtreeFlags = i.subtreeFlags & 14680064), l !== null ? o = cn(l, o) : (o = zn(o, s, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, s = e.child.memoizedState, s = s === null ? fa(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = ca, r;
  }
  return o = e.child, e = o.sibling, r = cn(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function yu(e, t) {
  return t = Ds({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function ho(e, t, n, r) {
  return r !== null && ru(r), xr(t, e.child, null, n), e = yu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function qv(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = gl(Error(C(422))), ho(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = Ds({ mode: "visible", children: r.children }, i, 0, null), o = zn(o, i, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && xr(t, e.child, null, s), t.child.memoizedState = fa(s), t.memoizedState = ca, o);
  if (!(t.mode & 1))
    return ho(e, t, s, null);
  if (i.data === "$!") {
    if (r = i.nextSibling && i.nextSibling.dataset, r)
      var l = r.dgst;
    return r = l, o = Error(C(419)), r = gl(o, r, void 0), ho(e, t, s, r);
  }
  if (l = (s & e.childLanes) !== 0, ze || l) {
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
      i = i & (r.suspendedLanes | s) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, zt(e, i), mt(r, e, i, -1));
    }
    return Eu(), r = gl(Error(C(421))), ho(e, t, s, r);
  }
  return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = u1.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, Ue = sn(i.nextSibling), je = t, ne = !0, ft = null, e !== null && (Ke[Je++] = Mt, Ke[Je++] = Dt, Ke[Je++] = Fn, Mt = e.id, Dt = e.overflow, Fn = t), t = yu(t, r.children), t.flags |= 4096, t);
}
function ff(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ia(e.return, t, n);
}
function yl(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
}
function Im(e, t, n) {
  var r = t.pendingProps, i = r.revealOrder, o = r.tail;
  if (Me(e, t, r.children, n), r = oe.current, r & 2)
    r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128)
      e:
        for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && ff(e, n, t);
          else if (e.tag === 19)
            ff(e, n, t);
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
  if (q(oe, r), !(t.mode & 1))
    t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          e = n.alternate, e !== null && ns(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), yl(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && ns(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        yl(t, !0, n, null, o);
        break;
      case "together":
        yl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Do(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Rt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), bn |= t.lanes, !(n & t.childLanes))
    return null;
  if (e !== null && t.child !== e.child)
    throw Error(C(153));
  if (t.child !== null) {
    for (e = t.child, n = cn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      e = e.sibling, n = n.sibling = cn(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Kv(e, t, n) {
  switch (t.tag) {
    case 3:
      $m(t), wr();
      break;
    case 5:
      sm(t);
      break;
    case 1:
      Fe(t.type) && qo(t);
      break;
    case 4:
      uu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, i = t.memoizedProps.value;
      q(Xo, r._currentValue), r._currentValue = i;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (q(oe, oe.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Pm(e, t, n) : (q(oe, oe.current & 1), e = Rt(e, t, n), e !== null ? e.sibling : null);
      q(oe, oe.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r)
          return Im(e, t, n);
        t.flags |= 128;
      }
      if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), q(oe, oe.current), r)
        break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Mm(e, t, n);
  }
  return Rt(e, t, n);
}
var Lm, da, zm, Rm;
Lm = function(e, t) {
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
da = function() {
};
zm = function(e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    e = t.stateNode, Dn(St.current);
    var o = null;
    switch (n) {
      case "input":
        i = Ll(e, i), r = Ll(e, r), o = [];
        break;
      case "select":
        i = le({}, i, { value: void 0 }), r = le({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        i = Fl(e, i), r = Fl(e, r), o = [];
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Yo);
    }
    bl(n, r);
    var s;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var l = i[u];
          for (s in l)
            l.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
        } else
          u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (hi.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
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
          u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, l = l ? l.__html : void 0, a != null && l !== a && (o = o || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (o = o || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (hi.hasOwnProperty(u) ? (a != null && u === "onScroll" && X("scroll", e), o || l === a || (o = [])) : (o = o || []).push(u, a));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Rm = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Br(e, t) {
  if (!ne)
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
function Jv(e, t, n) {
  var r = t.pendingProps;
  switch (nu(t), t.tag) {
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
      return Fe(t.type) && Qo(), Te(t), null;
    case 3:
      return r = t.stateNode, Sr(), te(Re), te(Oe), fu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (co(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ft !== null && (xa(ft), ft = null))), da(e, t), Te(t), null;
    case 5:
      cu(t);
      var i = Dn(Ci.current);
      if (n = t.type, e !== null && t.stateNode != null)
        zm(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null)
            throw Error(C(166));
          return Te(t), null;
        }
        if (e = Dn(St.current), co(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[wt] = t, r[Ei] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              X("cancel", r), X("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              X("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < ti.length; i++)
                X(ti[i], r);
              break;
            case "source":
              X("error", r);
              break;
            case "img":
            case "image":
            case "link":
              X(
                "error",
                r
              ), X("load", r);
              break;
            case "details":
              X("toggle", r);
              break;
            case "input":
              wc(r, o), X("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, X("invalid", r);
              break;
            case "textarea":
              Sc(r, o), X("invalid", r);
          }
          bl(n, o), i = null;
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var l = o[s];
              s === "children" ? typeof l == "string" ? r.textContent !== l && (o.suppressHydrationWarning !== !0 && uo(r.textContent, l, e), i = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (o.suppressHydrationWarning !== !0 && uo(
                r.textContent,
                l,
                e
              ), i = ["children", "" + l]) : hi.hasOwnProperty(s) && l != null && s === "onScroll" && X("scroll", r);
            }
          switch (n) {
            case "input":
              to(r), xc(r, o, !0);
              break;
            case "textarea":
              to(r), kc(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Yo);
          }
          r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = uh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[wt] = t, e[Ei] = r, Lm(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = Vl(n, r), n) {
              case "dialog":
                X("cancel", e), X("close", e), i = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                X("load", e), i = r;
                break;
              case "video":
              case "audio":
                for (i = 0; i < ti.length; i++)
                  X(ti[i], e);
                i = r;
                break;
              case "source":
                X("error", e), i = r;
                break;
              case "img":
              case "image":
              case "link":
                X(
                  "error",
                  e
                ), X("load", e), i = r;
                break;
              case "details":
                X("toggle", e), i = r;
                break;
              case "input":
                wc(e, r), i = Ll(e, r), X("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, i = le({}, r, { value: void 0 }), X("invalid", e);
                break;
              case "textarea":
                Sc(e, r), i = Fl(e, r), X("invalid", e);
                break;
              default:
                i = r;
            }
            bl(n, i), l = i;
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var a = l[o];
                o === "style" ? dh(e, a) : o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && ch(e, a)) : o === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && mi(e, a) : typeof a == "number" && mi(e, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (hi.hasOwnProperty(o) ? a != null && o === "onScroll" && X("scroll", e) : a != null && Ua(e, o, a, s));
              }
            switch (n) {
              case "input":
                to(e), xc(e, r, !1);
                break;
              case "textarea":
                to(e), kc(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + dn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? ar(e, !!r.multiple, o, !1) : r.defaultValue != null && ar(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Yo);
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
        Rm(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(C(166));
        if (n = Dn(Ci.current), Dn(St.current), co(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[wt] = t, (o = r.nodeValue !== n) && (e = je, e !== null))
            switch (e.tag) {
              case 3:
                uo(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && uo(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[wt] = t, t.stateNode = r;
      }
      return Te(t), null;
    case 13:
      if (te(oe), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (ne && Ue !== null && t.mode & 1 && !(t.flags & 128))
          Xh(), wr(), t.flags |= 98560, o = !1;
        else if (o = co(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o)
              throw Error(C(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
              throw Error(C(317));
            o[wt] = t;
          } else
            wr(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Te(t), o = !1;
        } else
          ft !== null && (xa(ft), ft = null), o = !0;
        if (!o)
          return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || oe.current & 1 ? ye === 0 && (ye = 3) : Eu())), t.updateQueue !== null && (t.flags |= 4), Te(t), null);
    case 4:
      return Sr(), da(e, t), e === null && Si(t.stateNode.containerInfo), Te(t), null;
    case 10:
      return su(t.type._context), Te(t), null;
    case 17:
      return Fe(t.type) && Qo(), Te(t), null;
    case 19:
      if (te(oe), o = t.memoizedState, o === null)
        return Te(t), null;
      if (r = (t.flags & 128) !== 0, s = o.rendering, s === null)
        if (r)
          Br(o, !1);
        else {
          if (ye !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null; ) {
              if (s = ns(e), s !== null) {
                for (t.flags |= 128, Br(o, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                  o = n, e = r, o.flags &= 14680066, s = o.alternate, s === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, o.child = s.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                return q(oe, oe.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null && fe() > Er && (t.flags |= 128, r = !0, Br(o, !1), t.lanes = 4194304);
        }
      else {
        if (!r)
          if (e = ns(s), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Br(o, !0), o.tail === null && o.tailMode === "hidden" && !s.alternate && !ne)
              return Te(t), null;
          } else
            2 * fe() - o.renderingStartTime > Er && n !== 1073741824 && (t.flags |= 128, r = !0, Br(o, !1), t.lanes = 4194304);
        o.isBackwards ? (s.sibling = t.child, t.child = s) : (n = o.last, n !== null ? n.sibling = s : t.child = s, o.last = s);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = fe(), t.sibling = null, n = oe.current, q(oe, r ? n & 1 | 2 : n & 1), t) : (Te(t), null);
    case 22:
    case 23:
      return ku(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? be & 1073741824 && (Te(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Te(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(C(156, t.tag));
}
function Xv(e, t) {
  switch (nu(t), t.tag) {
    case 1:
      return Fe(t.type) && Qo(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Sr(), te(Re), te(Oe), fu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return cu(t), null;
    case 13:
      if (te(oe), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(C(340));
        wr();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return te(oe), null;
    case 4:
      return Sr(), null;
    case 10:
      return su(t.type._context), null;
    case 22:
    case 23:
      return ku(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var mo = !1, Ce = !1, e1 = typeof WeakSet == "function" ? WeakSet : Set, D = null;
function or(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ae(e, t, r);
      }
    else
      n.current = null;
}
function ha(e, t, n) {
  try {
    n();
  } catch (r) {
    ae(e, t, r);
  }
}
var df = !1;
function t1(e, t) {
  if (ql = Bo, e = Vh(), eu(e)) {
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
  for (Kl = { focusedElem: e, selectionRange: n }, Bo = !1, D = t; D !== null; )
    if (t = D, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
      e.return = t, D = e;
    else
      for (; D !== null; ) {
        t = D;
        try {
          var y = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var v = y.memoizedProps, S = y.memoizedState, m = t.stateNode, d = m.getSnapshotBeforeUpdate(t.elementType === t.type ? v : ut(t.type, v), S);
                  m.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
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
          ae(t, t.return, w);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, D = e;
          break;
        }
        D = t.return;
      }
  return y = df, df = !1, y;
}
function ci(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var i = r = r.next;
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        i.destroy = void 0, o !== void 0 && ha(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Os(e, t) {
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
function ma(e) {
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
function Fm(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Fm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[wt], delete t[Ei], delete t[ea], delete t[Fv], delete t[Av])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Am(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function hf(e) {
  e:
    for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Am(e.return))
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
function pa(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Yo));
  else if (r !== 4 && (e = e.child, e !== null))
    for (pa(e, t, n), e = e.sibling; e !== null; )
      pa(e, t, n), e = e.sibling;
}
function ga(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (ga(e, t, n), e = e.sibling; e !== null; )
      ga(e, t, n), e = e.sibling;
}
var xe = null, ct = !1;
function Bt(e, t, n) {
  for (n = n.child; n !== null; )
    bm(e, t, n), n = n.sibling;
}
function bm(e, t, n) {
  if (xt && typeof xt.onCommitFiberUnmount == "function")
    try {
      xt.onCommitFiberUnmount(xs, n);
    } catch {
    }
  switch (n.tag) {
    case 5:
      Ce || or(n, t);
    case 6:
      var r = xe, i = ct;
      xe = null, Bt(e, t, n), xe = r, ct = i, xe !== null && (ct ? (e = xe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : xe.removeChild(n.stateNode));
      break;
    case 18:
      xe !== null && (ct ? (e = xe, n = n.stateNode, e.nodeType === 8 ? cl(e.parentNode, n) : e.nodeType === 1 && cl(e, n), vi(e)) : cl(xe, n.stateNode));
      break;
    case 4:
      r = xe, i = ct, xe = n.stateNode.containerInfo, ct = !0, Bt(e, t, n), xe = r, ct = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ce && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        i = r = r.next;
        do {
          var o = i, s = o.destroy;
          o = o.tag, s !== void 0 && (o & 2 || o & 4) && ha(n, t, s), i = i.next;
        } while (i !== r);
      }
      Bt(e, t, n);
      break;
    case 1:
      if (!Ce && (or(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
        try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (l) {
          ae(n, t, l);
        }
      Bt(e, t, n);
      break;
    case 21:
      Bt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Ce = (r = Ce) || n.memoizedState !== null, Bt(e, t, n), Ce = r) : Bt(e, t, n);
      break;
    default:
      Bt(e, t, n);
  }
}
function mf(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new e1()), t.forEach(function(r) {
      var i = c1.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(i, i));
    });
  }
}
function lt(e, t) {
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
                xe = l.stateNode, ct = !1;
                break e;
              case 3:
                xe = l.stateNode.containerInfo, ct = !0;
                break e;
              case 4:
                xe = l.stateNode.containerInfo, ct = !0;
                break e;
            }
            l = l.return;
          }
        if (xe === null)
          throw Error(C(160));
        bm(o, s, i), xe = null, ct = !1;
        var a = i.alternate;
        a !== null && (a.return = null), i.return = null;
      } catch (u) {
        ae(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; )
      Vm(t, e), t = t.sibling;
}
function Vm(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (lt(t, e), yt(e), r & 4) {
        try {
          ci(3, e, e.return), Os(3, e);
        } catch (v) {
          ae(e, e.return, v);
        }
        try {
          ci(5, e, e.return);
        } catch (v) {
          ae(e, e.return, v);
        }
      }
      break;
    case 1:
      lt(t, e), yt(e), r & 512 && n !== null && or(n, n.return);
      break;
    case 5:
      if (lt(t, e), yt(e), r & 512 && n !== null && or(n, n.return), e.flags & 32) {
        var i = e.stateNode;
        try {
          mi(i, "");
        } catch (v) {
          ae(e, e.return, v);
        }
      }
      if (r & 4 && (i = e.stateNode, i != null)) {
        var o = e.memoizedProps, s = n !== null ? n.memoizedProps : o, l = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null)
          try {
            l === "input" && o.type === "radio" && o.name != null && lh(i, o), Vl(l, s);
            var u = Vl(l, o);
            for (s = 0; s < a.length; s += 2) {
              var c = a[s], f = a[s + 1];
              c === "style" ? dh(i, f) : c === "dangerouslySetInnerHTML" ? ch(i, f) : c === "children" ? mi(i, f) : Ua(i, c, f, u);
            }
            switch (l) {
              case "input":
                zl(i, o);
                break;
              case "textarea":
                ah(i, o);
                break;
              case "select":
                var p = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var h = o.value;
                h != null ? ar(i, !!o.multiple, h, !1) : p !== !!o.multiple && (o.defaultValue != null ? ar(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : ar(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Ei] = o;
          } catch (v) {
            ae(e, e.return, v);
          }
      }
      break;
    case 6:
      if (lt(t, e), yt(e), r & 4) {
        if (e.stateNode === null)
          throw Error(C(162));
        i = e.stateNode, o = e.memoizedProps;
        try {
          i.nodeValue = o;
        } catch (v) {
          ae(e, e.return, v);
        }
      }
      break;
    case 3:
      if (lt(t, e), yt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        try {
          vi(t.containerInfo);
        } catch (v) {
          ae(e, e.return, v);
        }
      break;
    case 4:
      lt(t, e), yt(e);
      break;
    case 13:
      lt(t, e), yt(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (xu = fe())), r & 4 && mf(e);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ce = (u = Ce) || c, lt(t, e), Ce = u) : lt(t, e), yt(e), r & 8192) {
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
                  or(p, p.return);
                  var y = p.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    r = p, n = p.return;
                    try {
                      t = r, y.props = t.memoizedProps, y.state = t.memoizedState, y.componentWillUnmount();
                    } catch (v) {
                      ae(r, n, v);
                    }
                  }
                  break;
                case 5:
                  or(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    gf(f);
                    continue;
                  }
              }
              h !== null ? (h.return = p, D = h) : gf(f);
            }
            c = c.sibling;
          }
        e:
          for (c = null, f = e; ; ) {
            if (f.tag === 5) {
              if (c === null) {
                c = f;
                try {
                  i = f.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (l = f.stateNode, a = f.memoizedProps.style, s = a != null && a.hasOwnProperty("display") ? a.display : null, l.style.display = fh("display", s));
                } catch (v) {
                  ae(e, e.return, v);
                }
              }
            } else if (f.tag === 6) {
              if (c === null)
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (v) {
                  ae(e, e.return, v);
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
      lt(t, e), yt(e), r & 4 && mf(e);
      break;
    case 21:
      break;
    default:
      lt(
        t,
        e
      ), yt(e);
  }
}
function yt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Am(n)) {
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
          r.flags & 32 && (mi(i, ""), r.flags &= -33);
          var o = hf(e);
          ga(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, l = hf(e);
          pa(e, l, s);
          break;
        default:
          throw Error(C(161));
      }
    } catch (a) {
      ae(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function n1(e, t, n) {
  D = e, Um(e);
}
function Um(e, t, n) {
  for (var r = (e.mode & 1) !== 0; D !== null; ) {
    var i = D, o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || mo;
      if (!s) {
        var l = i.alternate, a = l !== null && l.memoizedState !== null || Ce;
        l = mo;
        var u = Ce;
        if (mo = s, (Ce = a) && !u)
          for (D = i; D !== null; )
            s = D, a = s.child, s.tag === 22 && s.memoizedState !== null ? yf(i) : a !== null ? (a.return = s, D = a) : yf(i);
        for (; o !== null; )
          D = o, Um(o), o = o.sibling;
        D = i, mo = l, Ce = u;
      }
      pf(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? (o.return = i, D = o) : pf(e);
  }
}
function pf(e) {
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
              Ce || Os(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ce)
                if (n === null)
                  r.componentDidMount();
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : ut(t.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && Kc(t, o, r);
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
                Kc(t, s, n);
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
                    f !== null && vi(f);
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
        Ce || t.flags & 512 && ma(t);
      } catch (p) {
        ae(t, t.return, p);
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
function gf(e) {
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
function yf(e) {
  for (; D !== null; ) {
    var t = D;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Os(4, t);
          } catch (a) {
            ae(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ae(t, i, a);
            }
          }
          var o = t.return;
          try {
            ma(t);
          } catch (a) {
            ae(t, o, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            ma(t);
          } catch (a) {
            ae(t, s, a);
          }
      }
    } catch (a) {
      ae(t, t.return, a);
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
var r1 = Math.ceil, os = Vt.ReactCurrentDispatcher, vu = Vt.ReactCurrentOwner, tt = Vt.ReactCurrentBatchConfig, B = 0, we = null, me = null, Se = 0, be = 0, sr = vn(0), ye = 0, Mi = null, bn = 0, Ms = 0, wu = 0, fi = null, Le = null, xu = 0, Er = 1 / 0, Ct = null, ss = !1, ya = null, an = null, po = !1, en = null, ls = 0, di = 0, va = null, $o = -1, Po = 0;
function De() {
  return B & 6 ? fe() : $o !== -1 ? $o : $o = fe();
}
function un(e) {
  return e.mode & 1 ? B & 2 && Se !== 0 ? Se & -Se : Vv.transition !== null ? (Po === 0 && (Po = Th()), Po) : (e = Y, e !== 0 || (e = window.event, e = e === void 0 ? 16 : $h(e.type)), e) : 1;
}
function mt(e, t, n, r) {
  if (50 < di)
    throw di = 0, va = null, Error(C(185));
  bi(e, n, r), (!(B & 2) || e !== we) && (e === we && (!(B & 2) && (Ms |= n), ye === 4 && Jt(e, Se)), Ae(e, r), n === 1 && B === 0 && !(t.mode & 1) && (Er = fe() + 500, Cs && wn()));
}
function Ae(e, t) {
  var n = e.callbackNode;
  Vy(e, t);
  var r = Ho(e, e === we ? Se : 0);
  if (r === 0)
    n !== null && Cc(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Cc(n), t === 1)
      e.tag === 0 ? bv(vf.bind(null, e)) : qh(vf.bind(null, e)), zv(function() {
        !(B & 6) && wn();
      }), n = null;
    else {
      switch (Ch(r)) {
        case 1:
          n = Za;
          break;
        case 4:
          n = kh;
          break;
        case 16:
          n = jo;
          break;
        case 536870912:
          n = Eh;
          break;
        default:
          n = jo;
      }
      n = Qm(n, Wm.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Wm(e, t) {
  if ($o = -1, Po = 0, B & 6)
    throw Error(C(327));
  var n = e.callbackNode;
  if (hr() && e.callbackNode !== n)
    return null;
  var r = Ho(e, e === we ? Se : 0);
  if (r === 0)
    return null;
  if (r & 30 || r & e.expiredLanes || t)
    t = as(e, r);
  else {
    t = r;
    var i = B;
    B |= 2;
    var o = Hm();
    (we !== e || Se !== t) && (Ct = null, Er = fe() + 500, Ln(e, t));
    do
      try {
        s1();
        break;
      } catch (l) {
        jm(e, l);
      }
    while (1);
    ou(), os.current = o, B = i, me !== null ? t = 0 : (we = null, Se = 0, t = ye);
  }
  if (t !== 0) {
    if (t === 2 && (i = Bl(e), i !== 0 && (r = i, t = wa(e, i))), t === 1)
      throw n = Mi, Ln(e, 0), Jt(e, r), Ae(e, fe()), n;
    if (t === 6)
      Jt(e, r);
    else {
      if (i = e.current.alternate, !(r & 30) && !i1(i) && (t = as(e, r), t === 2 && (o = Bl(e), o !== 0 && (r = o, t = wa(e, o))), t === 1))
        throw n = Mi, Ln(e, 0), Jt(e, r), Ae(e, fe()), n;
      switch (e.finishedWork = i, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(C(345));
        case 2:
          Cn(e, Le, Ct);
          break;
        case 3:
          if (Jt(e, r), (r & 130023424) === r && (t = xu + 500 - fe(), 10 < t)) {
            if (Ho(e, 0) !== 0)
              break;
            if (i = e.suspendedLanes, (i & r) !== r) {
              De(), e.pingedLanes |= e.suspendedLanes & i;
              break;
            }
            e.timeoutHandle = Xl(Cn.bind(null, e, Le, Ct), t);
            break;
          }
          Cn(e, Le, Ct);
          break;
        case 4:
          if (Jt(e, r), (r & 4194240) === r)
            break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - ht(r);
            o = 1 << s, s = t[s], s > i && (i = s), r &= ~o;
          }
          if (r = i, r = fe() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * r1(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Xl(Cn.bind(null, e, Le, Ct), r);
            break;
          }
          Cn(e, Le, Ct);
          break;
        case 5:
          Cn(e, Le, Ct);
          break;
        default:
          throw Error(C(329));
      }
    }
  }
  return Ae(e, fe()), e.callbackNode === n ? Wm.bind(null, e) : null;
}
function wa(e, t) {
  var n = fi;
  return e.current.memoizedState.isDehydrated && (Ln(e, t).flags |= 256), e = as(e, t), e !== 2 && (t = Le, Le = n, t !== null && xa(t)), e;
}
function xa(e) {
  Le === null ? Le = e : Le.push.apply(Le, e);
}
function i1(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r], o = i.getSnapshot;
          i = i.value;
          try {
            if (!gt(o(), i))
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
function Jt(e, t) {
  for (t &= ~wu, t &= ~Ms, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - ht(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function vf(e) {
  if (B & 6)
    throw Error(C(327));
  hr();
  var t = Ho(e, 0);
  if (!(t & 1))
    return Ae(e, fe()), null;
  var n = as(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Bl(e);
    r !== 0 && (t = r, n = wa(e, r));
  }
  if (n === 1)
    throw n = Mi, Ln(e, 0), Jt(e, t), Ae(e, fe()), n;
  if (n === 6)
    throw Error(C(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Cn(e, Le, Ct), Ae(e, fe()), null;
}
function Su(e, t) {
  var n = B;
  B |= 1;
  try {
    return e(t);
  } finally {
    B = n, B === 0 && (Er = fe() + 500, Cs && wn());
  }
}
function Vn(e) {
  en !== null && en.tag === 0 && !(B & 6) && hr();
  var t = B;
  B |= 1;
  var n = tt.transition, r = Y;
  try {
    if (tt.transition = null, Y = 1, e)
      return e();
  } finally {
    Y = r, tt.transition = n, B = t, !(B & 6) && wn();
  }
}
function ku() {
  be = sr.current, te(sr);
}
function Ln(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Lv(n)), me !== null)
    for (n = me.return; n !== null; ) {
      var r = n;
      switch (nu(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Qo();
          break;
        case 3:
          Sr(), te(Re), te(Oe), fu();
          break;
        case 5:
          cu(r);
          break;
        case 4:
          Sr();
          break;
        case 13:
          te(oe);
          break;
        case 19:
          te(oe);
          break;
        case 10:
          su(r.type._context);
          break;
        case 22:
        case 23:
          ku();
      }
      n = n.return;
    }
  if (we = e, me = e = cn(e.current, null), Se = be = t, ye = 0, Mi = null, wu = Ms = bn = 0, Le = fi = null, Mn !== null) {
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
function jm(e, t) {
  do {
    var n = me;
    try {
      if (ou(), Oo.current = is, rs) {
        for (var r = se.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), r = r.next;
        }
        rs = !1;
      }
      if (An = 0, ve = ge = se = null, ui = !1, _i = 0, vu.current = null, n === null || n.return === null) {
        ye = 1, Mi = t, me = null;
        break;
      }
      e: {
        var o = e, s = n.return, l = n, a = t;
        if (t = Se, l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var u = a, c = l, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = c.alternate;
            p ? (c.updateQueue = p.updateQueue, c.memoizedState = p.memoizedState, c.lanes = p.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var h = of(s);
          if (h !== null) {
            h.flags &= -257, sf(h, s, l, o, t), h.mode & 1 && rf(o, u, t), t = h, a = u;
            var y = t.updateQueue;
            if (y === null) {
              var v = /* @__PURE__ */ new Set();
              v.add(a), t.updateQueue = v;
            } else
              y.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              rf(o, u, t), Eu();
              break e;
            }
            a = Error(C(426));
          }
        } else if (ne && l.mode & 1) {
          var S = of(s);
          if (S !== null) {
            !(S.flags & 65536) && (S.flags |= 256), sf(S, s, l, o, t), ru(kr(a, l));
            break e;
          }
        }
        o = a = kr(a, l), ye !== 4 && (ye = 2), fi === null ? fi = [o] : fi.push(o), o = s;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var m = _m(o, a, t);
              qc(o, m);
              break e;
            case 1:
              l = a;
              var d = o.type, g = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (an === null || !an.has(g)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var w = Nm(o, l, t);
                qc(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Zm(n);
    } catch (x) {
      t = x, me === n && n !== null && (me = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function Hm() {
  var e = os.current;
  return os.current = is, e === null ? is : e;
}
function Eu() {
  (ye === 0 || ye === 3 || ye === 2) && (ye = 4), we === null || !(bn & 268435455) && !(Ms & 268435455) || Jt(we, Se);
}
function as(e, t) {
  var n = B;
  B |= 2;
  var r = Hm();
  (we !== e || Se !== t) && (Ct = null, Ln(e, t));
  do
    try {
      o1();
      break;
    } catch (i) {
      jm(e, i);
    }
  while (1);
  if (ou(), B = n, os.current = r, me !== null)
    throw Error(C(261));
  return we = null, Se = 0, ye;
}
function o1() {
  for (; me !== null; )
    Bm(me);
}
function s1() {
  for (; me !== null && !$y(); )
    Bm(me);
}
function Bm(e) {
  var t = Ym(e.alternate, e, be);
  e.memoizedProps = e.pendingProps, t === null ? Zm(e) : me = t, vu.current = null;
}
function Zm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Xv(n, t), n !== null) {
        n.flags &= 32767, me = n;
        return;
      }
      if (e !== null)
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ye = 6, me = null;
        return;
      }
    } else if (n = Jv(n, t, be), n !== null) {
      me = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      me = t;
      return;
    }
    me = t = e;
  } while (t !== null);
  ye === 0 && (ye = 5);
}
function Cn(e, t, n) {
  var r = Y, i = tt.transition;
  try {
    tt.transition = null, Y = 1, l1(e, t, n, r);
  } finally {
    tt.transition = i, Y = r;
  }
  return null;
}
function l1(e, t, n, r) {
  do
    hr();
  while (en !== null);
  if (B & 6)
    throw Error(C(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null)
    return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
    throw Error(C(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Uy(e, o), e === we && (me = we = null, Se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || po || (po = !0, Qm(jo, function() {
    return hr(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = tt.transition, tt.transition = null;
    var s = Y;
    Y = 1;
    var l = B;
    B |= 4, vu.current = null, t1(e, n), Vm(n, e), Nv(Kl), Bo = !!ql, Kl = ql = null, e.current = n, n1(n), Py(), B = l, Y = s, tt.transition = o;
  } else
    e.current = n;
  if (po && (po = !1, en = e, ls = i), o = e.pendingLanes, o === 0 && (an = null), zy(n.stateNode), Ae(e, fe()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
  if (ss)
    throw ss = !1, e = ya, ya = null, e;
  return ls & 1 && e.tag !== 0 && hr(), o = e.pendingLanes, o & 1 ? e === va ? di++ : (di = 0, va = e) : di = 0, wn(), null;
}
function hr() {
  if (en !== null) {
    var e = Ch(ls), t = tt.transition, n = Y;
    try {
      if (tt.transition = null, Y = 16 > e ? 16 : e, en === null)
        var r = !1;
      else {
        if (e = en, en = null, ls = 0, B & 6)
          throw Error(C(331));
        var i = B;
        for (B |= 4, D = e.current; D !== null; ) {
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
                      if (Fm(c), c === u) {
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
              var y = o.alternate;
              if (y !== null) {
                var v = y.child;
                if (v !== null) {
                  y.child = null;
                  do {
                    var S = v.sibling;
                    v.sibling = null, v = S;
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
          var g = s.child;
          if (s.subtreeFlags & 2064 && g !== null)
            g.return = s, D = g;
          else
            e:
              for (s = d; D !== null; ) {
                if (l = D, l.flags & 2048)
                  try {
                    switch (l.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Os(9, l);
                    }
                  } catch (x) {
                    ae(l, l.return, x);
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
        if (B = i, wn(), xt && typeof xt.onPostCommitFiberRoot == "function")
          try {
            xt.onPostCommitFiberRoot(xs, e);
          } catch {
          }
        r = !0;
      }
      return r;
    } finally {
      Y = n, tt.transition = t;
    }
  }
  return !1;
}
function wf(e, t, n) {
  t = kr(n, t), t = _m(e, t, 1), e = ln(e, t, 1), t = De(), e !== null && (bi(e, 1, t), Ae(e, t));
}
function ae(e, t, n) {
  if (e.tag === 3)
    wf(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        wf(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (an === null || !an.has(r))) {
          e = kr(n, e), e = Nm(t, e, 1), t = ln(t, e, 1), e = De(), t !== null && (bi(t, 1, e), Ae(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function a1(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = De(), e.pingedLanes |= e.suspendedLanes & n, we === e && (Se & n) === n && (ye === 4 || ye === 3 && (Se & 130023424) === Se && 500 > fe() - xu ? Ln(e, 0) : wu |= n), Ae(e, t);
}
function Gm(e, t) {
  t === 0 && (e.mode & 1 ? (t = io, io <<= 1, !(io & 130023424) && (io = 4194304)) : t = 1);
  var n = De();
  e = zt(e, t), e !== null && (bi(e, t, n), Ae(e, n));
}
function u1(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Gm(e, n);
}
function c1(e, t) {
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
  r !== null && r.delete(t), Gm(e, n);
}
var Ym;
Ym = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Re.current)
      ze = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return ze = !1, Kv(e, t, n);
      ze = !!(e.flags & 131072);
    }
  else
    ze = !1, ne && t.flags & 1048576 && Kh(t, Jo, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Do(e, t), e = t.pendingProps;
      var i = vr(t, Oe.current);
      dr(t, n), i = hu(null, t, r, e, i, n);
      var o = mu();
      return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Fe(r) ? (o = !0, qo(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, au(t), i.updater = _s, t.stateNode = i, i._reactInternals = t, sa(t, r, e, n), t = ua(null, t, r, !0, o, n)) : (t.tag = 0, ne && o && tu(t), Me(null, t, i, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Do(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = d1(r), e = ut(r, e), i) {
          case 0:
            t = aa(null, t, r, e, n);
            break e;
          case 1:
            t = uf(null, t, r, e, n);
            break e;
          case 11:
            t = lf(null, t, r, e, n);
            break e;
          case 14:
            t = af(null, t, r, ut(r.type, e), n);
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
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ut(r, i), aa(e, t, r, i, n);
    case 1:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ut(r, i), uf(e, t, r, i, n);
    case 3:
      e: {
        if ($m(t), e === null)
          throw Error(C(387));
        r = t.pendingProps, o = t.memoizedState, i = o.element, tm(e, t), ts(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, o.isDehydrated)
          if (o = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            i = kr(Error(C(423)), t), t = cf(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = kr(Error(C(424)), t), t = cf(e, t, r, n, i);
            break e;
          } else
            for (Ue = sn(t.stateNode.containerInfo.firstChild), je = t, ne = !0, ft = null, n = om(t, null, r, n), t.child = n; n; )
              n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (wr(), r === i) {
            t = Rt(e, t, n);
            break e;
          }
          Me(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return sm(t), e === null && ra(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, s = i.children, Jl(r, i) ? s = null : o !== null && Jl(r, o) && (t.flags |= 32), Dm(e, t), Me(e, t, s, n), t.child;
    case 6:
      return e === null && ra(t), null;
    case 13:
      return Pm(e, t, n);
    case 4:
      return uu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = xr(t, null, r, n) : Me(e, t, r, n), t.child;
    case 11:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ut(r, i), lf(e, t, r, i, n);
    case 7:
      return Me(e, t, t.pendingProps, n), t.child;
    case 8:
      return Me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, s = i.value, q(Xo, r._currentValue), r._currentValue = s, o !== null)
          if (gt(o.value, s)) {
            if (o.children === i.children && !Re.current) {
              t = Rt(e, t, n);
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
                      a = Pt(-1, n & -n), a.tag = 2;
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null ? a.next = a : (a.next = c.next, c.next = a), u.pending = a;
                      }
                    }
                    o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), ia(
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
                s.lanes |= n, l = s.alternate, l !== null && (l.lanes |= n), ia(s, n, t), s = o.sibling;
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
      return i = t.type, r = t.pendingProps.children, dr(t, n), i = nt(i), r = r(i), t.flags |= 1, Me(e, t, r, n), t.child;
    case 14:
      return r = t.type, i = ut(r, t.pendingProps), i = ut(r.type, i), af(e, t, r, i, n);
    case 15:
      return Om(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ut(r, i), Do(e, t), t.tag = 1, Fe(r) ? (e = !0, qo(t)) : e = !1, dr(t, n), rm(t, r, i), sa(t, r, i, n), ua(null, t, r, !0, e, n);
    case 19:
      return Im(e, t, n);
    case 22:
      return Mm(e, t, n);
  }
  throw Error(C(156, t.tag));
};
function Qm(e, t) {
  return Sh(e, t);
}
function f1(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function et(e, t, n, r) {
  return new f1(e, t, n, r);
}
function Tu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function d1(e) {
  if (typeof e == "function")
    return Tu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ja)
      return 11;
    if (e === Ha)
      return 14;
  }
  return 2;
}
function cn(e, t) {
  var n = e.alternate;
  return n === null ? (n = et(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Io(e, t, n, r, i, o) {
  var s = 2;
  if (r = e, typeof e == "function")
    Tu(e) && (s = 1);
  else if (typeof e == "string")
    s = 5;
  else
    e:
      switch (e) {
        case qn:
          return zn(n.children, i, o, t);
        case Wa:
          s = 8, i |= 8;
          break;
        case Dl:
          return e = et(12, n, t, i | 2), e.elementType = Dl, e.lanes = o, e;
        case $l:
          return e = et(13, n, t, i), e.elementType = $l, e.lanes = o, e;
        case Pl:
          return e = et(19, n, t, i), e.elementType = Pl, e.lanes = o, e;
        case ih:
          return Ds(n, i, o, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case nh:
                s = 10;
                break e;
              case rh:
                s = 9;
                break e;
              case ja:
                s = 11;
                break e;
              case Ha:
                s = 14;
                break e;
              case Yt:
                s = 16, r = null;
                break e;
            }
          throw Error(C(130, e == null ? e : typeof e, ""));
      }
  return t = et(s, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
}
function zn(e, t, n, r) {
  return e = et(7, e, r, t), e.lanes = n, e;
}
function Ds(e, t, n, r) {
  return e = et(22, e, r, t), e.elementType = ih, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function vl(e, t, n) {
  return e = et(6, e, null, t), e.lanes = n, e;
}
function wl(e, t, n) {
  return t = et(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function h1(e, t, n, r, i) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Xs(0), this.expirationTimes = Xs(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xs(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
}
function Cu(e, t, n, r, i, o, s, l, a) {
  return e = new h1(e, t, n, l, a), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = et(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, au(o), e;
}
function m1(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Qn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function qm(e) {
  if (!e)
    return hn;
  e = e._reactInternals;
  e: {
    if (Hn(e) !== e || e.tag !== 1)
      throw Error(C(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Fe(t.type)) {
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
    if (Fe(n))
      return Qh(e, n, t);
  }
  return t;
}
function Km(e, t, n, r, i, o, s, l, a) {
  return e = Cu(n, r, !0, e, i, o, s, l, a), e.context = qm(null), n = e.current, r = De(), i = un(n), o = Pt(r, i), o.callback = t ?? null, ln(n, o, i), e.current.lanes = i, bi(e, i, r), Ae(e, r), e;
}
function $s(e, t, n, r) {
  var i = t.current, o = De(), s = un(i);
  return n = qm(n), t.context === null ? t.context = n : t.pendingContext = n, t = Pt(o, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ln(i, t, s), e !== null && (mt(e, i, s, o), No(e, i, s)), s;
}
function us(e) {
  if (e = e.current, !e.child)
    return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function xf(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function _u(e, t) {
  xf(e, t), (e = e.alternate) && xf(e, t);
}
function p1() {
  return null;
}
var Jm = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Nu(e) {
  this._internalRoot = e;
}
Ps.prototype.render = Nu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null)
    throw Error(C(409));
  $s(e, t, null, null);
};
Ps.prototype.unmount = Nu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Vn(function() {
      $s(null, e, null, null);
    }), t[Lt] = null;
  }
};
function Ps(e) {
  this._internalRoot = e;
}
Ps.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Oh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Kt.length && t !== 0 && t < Kt[n].priority; n++)
      ;
    Kt.splice(n, 0, e), n === 0 && Dh(e);
  }
};
function Ou(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Is(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Sf() {
}
function g1(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var u = us(s);
        o.call(u);
      };
    }
    var s = Km(t, r, e, 0, null, !1, !1, "", Sf);
    return e._reactRootContainer = s, e[Lt] = s.current, Si(e.nodeType === 8 ? e.parentNode : e), Vn(), s;
  }
  for (; i = e.lastChild; )
    e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function() {
      var u = us(a);
      l.call(u);
    };
  }
  var a = Cu(e, 0, !1, null, null, !1, !1, "", Sf);
  return e._reactRootContainer = a, e[Lt] = a.current, Si(e.nodeType === 8 ? e.parentNode : e), Vn(function() {
    $s(t, a, n, r);
  }), a;
}
function Ls(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var l = i;
      i = function() {
        var a = us(s);
        l.call(a);
      };
    }
    $s(t, s, e, i);
  } else
    s = g1(n, t, e, i, r);
  return us(s);
}
_h = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ei(t.pendingLanes);
        n !== 0 && (Ga(t, n | 1), Ae(t, fe()), !(B & 6) && (Er = fe() + 500, wn()));
      }
      break;
    case 13:
      Vn(function() {
        var r = zt(e, 1);
        if (r !== null) {
          var i = De();
          mt(r, e, 1, i);
        }
      }), _u(e, 1);
  }
};
Ya = function(e) {
  if (e.tag === 13) {
    var t = zt(e, 134217728);
    if (t !== null) {
      var n = De();
      mt(t, e, 134217728, n);
    }
    _u(e, 134217728);
  }
};
Nh = function(e) {
  if (e.tag === 13) {
    var t = un(e), n = zt(e, t);
    if (n !== null) {
      var r = De();
      mt(n, e, t, r);
    }
    _u(e, t);
  }
};
Oh = function() {
  return Y;
};
Mh = function(e, t) {
  var n = Y;
  try {
    return Y = e, t();
  } finally {
    Y = n;
  }
};
Wl = function(e, t, n) {
  switch (t) {
    case "input":
      if (zl(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; )
          n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Ts(r);
            if (!i)
              throw Error(C(90));
            sh(r), zl(r, i);
          }
        }
      }
      break;
    case "textarea":
      ah(e, n);
      break;
    case "select":
      t = n.value, t != null && ar(e, !!n.multiple, t, !1);
  }
};
ph = Su;
gh = Vn;
var y1 = { usingClientEntryPoint: !1, Events: [Ui, er, Ts, hh, mh, Su] }, Zr = { findFiberByHostInstance: On, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, v1 = { bundleType: Zr.bundleType, version: Zr.version, rendererPackageName: Zr.rendererPackageName, rendererConfig: Zr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Vt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = wh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Zr.findFiberByHostInstance || p1, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var go = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!go.isDisabled && go.supportsFiber)
    try {
      xs = go.inject(v1), xt = go;
    } catch {
    }
}
Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = y1;
Ge.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ou(t))
    throw Error(C(200));
  return m1(e, t, null, n);
};
Ge.createRoot = function(e, t) {
  if (!Ou(e))
    throw Error(C(299));
  var n = !1, r = "", i = Jm;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Cu(e, 1, !1, null, null, n, !1, r, i), e[Lt] = t.current, Si(e.nodeType === 8 ? e.parentNode : e), new Nu(t);
};
Ge.findDOMNode = function(e) {
  if (e == null)
    return null;
  if (e.nodeType === 1)
    return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(C(188)) : (e = Object.keys(e).join(","), Error(C(268, e)));
  return e = wh(t), e = e === null ? null : e.stateNode, e;
};
Ge.flushSync = function(e) {
  return Vn(e);
};
Ge.hydrate = function(e, t, n) {
  if (!Is(t))
    throw Error(C(200));
  return Ls(null, e, t, !0, n);
};
Ge.hydrateRoot = function(e, t, n) {
  if (!Ou(e))
    throw Error(C(405));
  var r = n != null && n.hydratedSources || null, i = !1, o = "", s = Jm;
  if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Km(t, null, e, 1, n ?? null, i, !1, o, s), e[Lt] = t.current, Si(e), r)
    for (e = 0; e < r.length; e++)
      n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
        n,
        i
      );
  return new Ps(t);
};
Ge.render = function(e, t, n) {
  if (!Is(t))
    throw Error(C(200));
  return Ls(null, e, t, !1, n);
};
Ge.unmountComponentAtNode = function(e) {
  if (!Is(e))
    throw Error(C(40));
  return e._reactRootContainer ? (Vn(function() {
    Ls(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Lt] = null;
    });
  }), !0) : !1;
};
Ge.unstable_batchedUpdates = Su;
Ge.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Is(n))
    throw Error(C(200));
  if (e == null || e._reactInternals === void 0)
    throw Error(C(38));
  return Ls(e, t, n, !1, r);
};
Ge.version = "18.2.0-next-9e3b772b8-20220608";
function Xm() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Xm);
    } catch (e) {
      console.error(e);
    }
}
Xm(), Kd.exports = Ge;
var Mu = Kd.exports;
function cs() {
  return cs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, cs.apply(this, arguments);
}
const ep = /* @__PURE__ */ k.forwardRef((e, t) => {
  const { children: n, ...r } = e, i = k.Children.toArray(n), o = i.find(w1);
  if (o) {
    const s = o.props.children, l = i.map((a) => a === o ? k.Children.count(s) > 1 ? k.Children.only(null) : /* @__PURE__ */ k.isValidElement(s) ? s.props.children : null : a);
    return /* @__PURE__ */ k.createElement(Sa, cs({}, r, {
      ref: t
    }), /* @__PURE__ */ k.isValidElement(s) ? /* @__PURE__ */ k.cloneElement(s, void 0, l) : null);
  }
  return /* @__PURE__ */ k.createElement(Sa, cs({}, r, {
    ref: t
  }), n);
});
ep.displayName = "Slot";
const Sa = /* @__PURE__ */ k.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  return /* @__PURE__ */ k.isValidElement(n) ? /* @__PURE__ */ k.cloneElement(n, {
    ...x1(r, n.props),
    ref: t ? Qd(t, n.ref) : n.ref
  }) : k.Children.count(n) > 1 ? k.Children.only(null) : null;
});
Sa.displayName = "SlotClone";
const tp = ({ children: e }) => /* @__PURE__ */ k.createElement(k.Fragment, null, e);
function w1(e) {
  return /* @__PURE__ */ k.isValidElement(e) && e.type === tp;
}
function x1(e, t) {
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
const S1 = [
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
], ji = S1.reduce((e, t) => {
  const n = /* @__PURE__ */ k.forwardRef((r, i) => {
    const { asChild: o, ...s } = r, l = o ? ep : t;
    return k.useEffect(() => {
      window[Symbol.for("radix-ui")] = !0;
    }, []), /* @__PURE__ */ k.createElement(l, Ol({}, s, {
      ref: i
    }));
  });
  return n.displayName = `Primitive.${t}`, {
    ...e,
    [t]: n
  };
}, {});
function k1(e, t) {
  e && Mu.flushSync(
    () => e.dispatchEvent(t)
  );
}
function zs(e) {
  const t = k.useRef(e);
  return k.useEffect(() => {
    t.current = e;
  }), k.useMemo(
    () => (...n) => {
      var r;
      return (r = t.current) === null || r === void 0 ? void 0 : r.call(t, ...n);
    },
    []
  );
}
function E1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = zs(e);
  k.useEffect(() => {
    const r = (i) => {
      i.key === "Escape" && n(i);
    };
    return t.addEventListener("keydown", r), () => t.removeEventListener("keydown", r);
  }, [
    n,
    t
  ]);
}
const ka = "dismissableLayer.update", T1 = "dismissableLayer.pointerDownOutside", C1 = "dismissableLayer.focusOutside";
let kf;
const _1 = /* @__PURE__ */ k.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), N1 = /* @__PURE__ */ k.forwardRef((e, t) => {
  var n;
  const { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: i, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: l, onDismiss: a, ...u } = e, c = k.useContext(_1), [f, p] = k.useState(null), h = (n = f == null ? void 0 : f.ownerDocument) !== null && n !== void 0 ? n : globalThis == null ? void 0 : globalThis.document, [, y] = k.useState({}), v = $r(
    t,
    (E) => p(E)
  ), S = Array.from(c.layers), [m] = [
    ...c.layersWithOutsidePointerEventsDisabled
  ].slice(-1), d = S.indexOf(m), g = f ? S.indexOf(f) : -1, w = c.layersWithOutsidePointerEventsDisabled.size > 0, x = g >= d, T = O1((E) => {
    const L = E.target, $ = [
      ...c.branches
    ].some(
      (H) => H.contains(L)
    );
    !x || $ || (o == null || o(E), l == null || l(E), E.defaultPrevented || a == null || a());
  }, h), _ = M1((E) => {
    const L = E.target;
    [
      ...c.branches
    ].some(
      (H) => H.contains(L)
    ) || (s == null || s(E), l == null || l(E), E.defaultPrevented || a == null || a());
  }, h);
  return E1((E) => {
    g === c.layers.size - 1 && (i == null || i(E), !E.defaultPrevented && a && (E.preventDefault(), a()));
  }, h), k.useEffect(() => {
    if (f)
      return r && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (kf = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(f)), c.layers.add(f), Ef(), () => {
        r && c.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = kf);
      };
  }, [
    f,
    h,
    r,
    c
  ]), k.useEffect(() => () => {
    f && (c.layers.delete(f), c.layersWithOutsidePointerEventsDisabled.delete(f), Ef());
  }, [
    f,
    c
  ]), k.useEffect(() => {
    const E = () => y({});
    return document.addEventListener(ka, E), () => document.removeEventListener(ka, E);
  }, []), /* @__PURE__ */ k.createElement(ji.div, Nl({}, u, {
    ref: v,
    style: {
      pointerEvents: w ? x ? "auto" : "none" : void 0,
      ...e.style
    },
    onFocusCapture: _t(e.onFocusCapture, _.onFocusCapture),
    onBlurCapture: _t(e.onBlurCapture, _.onBlurCapture),
    onPointerDownCapture: _t(e.onPointerDownCapture, T.onPointerDownCapture)
  }));
});
function O1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = zs(e), r = k.useRef(!1), i = k.useRef(() => {
  });
  return k.useEffect(() => {
    const o = (l) => {
      if (l.target && !r.current) {
        let u = function() {
          np(T1, n, a, {
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
function M1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = zs(e), r = k.useRef(!1);
  return k.useEffect(() => {
    const i = (o) => {
      o.target && !r.current && np(C1, n, {
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
function Ef() {
  const e = new CustomEvent(ka);
  document.dispatchEvent(e);
}
function np(e, t, n, { discrete: r }) {
  const i = n.originalEvent.target, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && i.addEventListener(e, t, {
    once: !0
  }), r ? k1(i, o) : i.dispatchEvent(o);
}
const Di = globalThis != null && globalThis.document ? k.useLayoutEffect : () => {
};
function fs() {
  return fs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, fs.apply(this, arguments);
}
const D1 = ["top", "right", "bottom", "left"], mn = Math.min, Ve = Math.max, ds = Math.round, yo = Math.floor, pn = (e) => ({
  x: e,
  y: e
}), $1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, P1 = {
  start: "end",
  end: "start"
};
function Ea(e, t, n) {
  return Ve(e, mn(t, n));
}
function Ft(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function At(e) {
  return e.split("-")[0];
}
function Lr(e) {
  return e.split("-")[1];
}
function Du(e) {
  return e === "x" ? "y" : "x";
}
function $u(e) {
  return e === "y" ? "height" : "width";
}
function zr(e) {
  return ["top", "bottom"].includes(At(e)) ? "y" : "x";
}
function Pu(e) {
  return Du(zr(e));
}
function I1(e, t, n) {
  n === void 0 && (n = !1);
  const r = Lr(e), i = Pu(e), o = $u(i);
  let s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (s = hs(s)), [s, hs(s)];
}
function L1(e) {
  const t = hs(e);
  return [Ta(e), t, Ta(t)];
}
function Ta(e) {
  return e.replace(/start|end/g, (t) => P1[t]);
}
function z1(e, t, n) {
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
function R1(e, t, n, r) {
  const i = Lr(e);
  let o = z1(At(e), n === "start", r);
  return i && (o = o.map((s) => s + "-" + i), t && (o = o.concat(o.map(Ta)))), o;
}
function hs(e) {
  return e.replace(/left|right|bottom|top/g, (t) => $1[t]);
}
function F1(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function rp(e) {
  return typeof e != "number" ? F1(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function ms(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function Tf(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const o = zr(t), s = Pu(t), l = $u(s), a = At(t), u = o === "y", c = r.x + r.width / 2 - i.width / 2, f = r.y + r.height / 2 - i.height / 2, p = r[l] / 2 - i[l] / 2;
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
  switch (Lr(t)) {
    case "start":
      h[s] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      h[s] += p * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const A1 = async (e, t, n) => {
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
  } = Tf(u, r, a), p = r, h = {}, y = 0;
  for (let v = 0; v < l.length; v++) {
    const {
      name: S,
      fn: m
    } = l[v], {
      x: d,
      y: g,
      data: w,
      reset: x
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
    if (c = d ?? c, f = g ?? f, h = {
      ...h,
      [S]: {
        ...h[S],
        ...w
      }
    }, x && y <= 50) {
      y++, typeof x == "object" && (x.placement && (p = x.placement), x.rects && (u = x.rects === !0 ? await s.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : x.rects), {
        x: c,
        y: f
      } = Tf(u, p, a)), v = -1;
      continue;
    }
  }
  return {
    x: c,
    y: f,
    placement: p,
    strategy: i,
    middlewareData: h
  };
};
async function $i(e, t) {
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
  } = Ft(t, e), y = rp(h), S = l[p ? f === "floating" ? "reference" : "floating" : f], m = ms(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(S))) == null || n ? S : S.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: a
  })), d = f === "floating" ? {
    ...s.floating,
    x: r,
    y: i
  } : s.reference, g = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l.floating)), w = await (o.isElement == null ? void 0 : o.isElement(g)) ? await (o.getScale == null ? void 0 : o.getScale(g)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = ms(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: d,
    offsetParent: g,
    strategy: a
  }) : d);
  return {
    top: (m.top - x.top + y.top) / w.y,
    bottom: (x.bottom - m.bottom + y.bottom) / w.y,
    left: (m.left - x.left + y.left) / w.x,
    right: (x.right - m.right + y.right) / w.x
  };
}
const Cf = (e) => ({
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
    } = Ft(e, t) || {};
    if (u == null)
      return {};
    const f = rp(c), p = {
      x: n,
      y: r
    }, h = Pu(i), y = $u(h), v = await s.getDimensions(u), S = h === "y", m = S ? "top" : "left", d = S ? "bottom" : "right", g = S ? "clientHeight" : "clientWidth", w = o.reference[y] + o.reference[h] - p[h] - o.floating[y], x = p[h] - o.reference[h], T = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
    let _ = T ? T[g] : 0;
    (!_ || !await (s.isElement == null ? void 0 : s.isElement(T))) && (_ = l.floating[g] || o.floating[y]);
    const E = w / 2 - x / 2, L = _ / 2 - v[y] / 2 - 1, $ = mn(f[m], L), H = mn(f[d], L), P = $, pe = _ - v[y] - H, b = _ / 2 - v[y] / 2 + E, de = Ea(P, b, pe), A = !a.arrow && Lr(i) != null && b != de && o.reference[y] / 2 - (b < P ? $ : H) - v[y] / 2 < 0, re = A ? b < P ? b - P : b - pe : 0;
    return {
      [h]: p[h] + re,
      data: {
        [h]: de,
        centerOffset: b - de - re,
        ...A && {
          alignmentOffset: re
        }
      },
      reset: A
    };
  }
}), b1 = function(e) {
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
        fallbackAxisSideDirection: y = "none",
        flipAlignment: v = !0,
        ...S
      } = Ft(e, t);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const m = At(i), d = At(l) === l, g = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)), w = p || (d || !v ? [hs(l)] : L1(l));
      !p && y !== "none" && w.push(...R1(l, v, y, g));
      const x = [l, ...w], T = await $i(t, S), _ = [];
      let E = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (c && _.push(T[m]), f) {
        const P = I1(i, s, g);
        _.push(T[P[0]], T[P[1]]);
      }
      if (E = [...E, {
        placement: i,
        overflows: _
      }], !_.every((P) => P <= 0)) {
        var L, $;
        const P = (((L = o.flip) == null ? void 0 : L.index) || 0) + 1, pe = x[P];
        if (pe)
          return {
            data: {
              index: P,
              overflows: E
            },
            reset: {
              placement: pe
            }
          };
        let b = ($ = E.filter((de) => de.overflows[0] <= 0).sort((de, A) => de.overflows[1] - A.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!b)
          switch (h) {
            case "bestFit": {
              var H;
              const de = (H = E.map((A) => [A.placement, A.overflows.filter((re) => re > 0).reduce((re, N) => re + N, 0)]).sort((A, re) => A[1] - re[1])[0]) == null ? void 0 : H[0];
              de && (b = de);
              break;
            }
            case "initialPlacement":
              b = l;
              break;
          }
        if (i !== b)
          return {
            reset: {
              placement: b
            }
          };
      }
      return {};
    }
  };
};
function _f(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Nf(e) {
  return D1.some((t) => e[t] >= 0);
}
const V1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...i
      } = Ft(e, t);
      switch (r) {
        case "referenceHidden": {
          const o = await $i(t, {
            ...i,
            elementContext: "reference"
          }), s = _f(o, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Nf(s)
            }
          };
        }
        case "escaped": {
          const o = await $i(t, {
            ...i,
            altBoundary: !0
          }), s = _f(o, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Nf(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function U1(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), s = At(n), l = Lr(n), a = zr(n) === "y", u = ["left", "top"].includes(s) ? -1 : 1, c = o && a ? -1 : 1, f = Ft(t, e);
  let {
    mainAxis: p,
    crossAxis: h,
    alignmentAxis: y
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
  return l && typeof y == "number" && (h = l === "end" ? y * -1 : y), a ? {
    x: h * c,
    y: p * u
  } : {
    x: p * u,
    y: h * c
  };
}
const W1 = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r
      } = t, i = await U1(t, e);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, j1 = function(e) {
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
          fn: (S) => {
            let {
              x: m,
              y: d
            } = S;
            return {
              x: m,
              y: d
            };
          }
        },
        ...a
      } = Ft(e, t), u = {
        x: n,
        y: r
      }, c = await $i(t, a), f = zr(At(i)), p = Du(f);
      let h = u[p], y = u[f];
      if (o) {
        const S = p === "y" ? "top" : "left", m = p === "y" ? "bottom" : "right", d = h + c[S], g = h - c[m];
        h = Ea(d, h, g);
      }
      if (s) {
        const S = f === "y" ? "top" : "left", m = f === "y" ? "bottom" : "right", d = y + c[S], g = y - c[m];
        y = Ea(d, y, g);
      }
      const v = l.fn({
        ...t,
        [p]: h,
        [f]: y
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
}, H1 = function(e) {
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
      } = Ft(e, t), c = {
        x: n,
        y: r
      }, f = zr(i), p = Du(f);
      let h = c[p], y = c[f];
      const v = Ft(l, t), S = typeof v == "number" ? {
        mainAxis: v,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...v
      };
      if (a) {
        const g = p === "y" ? "height" : "width", w = o.reference[p] - o.floating[g] + S.mainAxis, x = o.reference[p] + o.reference[g] - S.mainAxis;
        h < w ? h = w : h > x && (h = x);
      }
      if (u) {
        var m, d;
        const g = p === "y" ? "width" : "height", w = ["top", "left"].includes(At(i)), x = o.reference[f] - o.floating[g] + (w && ((m = s.offset) == null ? void 0 : m[f]) || 0) + (w ? 0 : S.crossAxis), T = o.reference[f] + o.reference[g] + (w ? 0 : ((d = s.offset) == null ? void 0 : d[f]) || 0) - (w ? S.crossAxis : 0);
        y < x ? y = x : y > T && (y = T);
      }
      return {
        [p]: h,
        [f]: y
      };
    }
  };
}, B1 = function(e) {
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
      } = Ft(e, t), a = await $i(t, l), u = At(n), c = Lr(n), f = zr(n) === "y", {
        width: p,
        height: h
      } = r.floating;
      let y, v;
      u === "top" || u === "bottom" ? (y = u, v = c === (await (i.isRTL == null ? void 0 : i.isRTL(o.floating)) ? "start" : "end") ? "left" : "right") : (v = u, y = c === "end" ? "top" : "bottom");
      const S = h - a[y], m = p - a[v], d = !t.middlewareData.shift;
      let g = S, w = m;
      if (f) {
        const T = p - a.left - a.right;
        w = c || d ? mn(m, T) : T;
      } else {
        const T = h - a.top - a.bottom;
        g = c || d ? mn(S, T) : T;
      }
      if (d && !c) {
        const T = Ve(a.left, 0), _ = Ve(a.right, 0), E = Ve(a.top, 0), L = Ve(a.bottom, 0);
        f ? w = p - 2 * (T !== 0 || _ !== 0 ? T + _ : Ve(a.left, a.right)) : g = h - 2 * (E !== 0 || L !== 0 ? E + L : Ve(a.top, a.bottom));
      }
      await s({
        ...t,
        availableWidth: w,
        availableHeight: g
      });
      const x = await i.getDimensions(o.floating);
      return p !== x.width || h !== x.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function gn(e) {
  return ip(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function He(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ut(e) {
  var t;
  return (t = (ip(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ip(e) {
  return e instanceof Node || e instanceof He(e).Node;
}
function bt(e) {
  return e instanceof Element || e instanceof He(e).Element;
}
function Et(e) {
  return e instanceof HTMLElement || e instanceof He(e).HTMLElement;
}
function Of(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof He(e).ShadowRoot;
}
function Hi(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = it(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function Z1(e) {
  return ["table", "td", "th"].includes(gn(e));
}
function Iu(e) {
  const t = Lu(), n = it(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function G1(e) {
  let t = Tr(e);
  for (; Et(t) && !Rs(t); ) {
    if (Iu(t))
      return t;
    t = Tr(t);
  }
  return null;
}
function Lu() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Rs(e) {
  return ["html", "body", "#document"].includes(gn(e));
}
function it(e) {
  return He(e).getComputedStyle(e);
}
function Fs(e) {
  return bt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function Tr(e) {
  if (gn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Of(e) && e.host || // Fallback.
    Ut(e)
  );
  return Of(t) ? t.host : t;
}
function op(e) {
  const t = Tr(e);
  return Rs(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Et(t) && Hi(t) ? t : op(t);
}
function Pi(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = op(e), o = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = He(i);
  return o ? t.concat(s, s.visualViewport || [], Hi(i) ? i : [], s.frameElement && n ? Pi(s.frameElement) : []) : t.concat(i, Pi(i, [], n));
}
function sp(e) {
  const t = it(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = Et(e), o = i ? e.offsetWidth : n, s = i ? e.offsetHeight : r, l = ds(n) !== o || ds(r) !== s;
  return l && (n = o, r = s), {
    width: n,
    height: r,
    $: l
  };
}
function zu(e) {
  return bt(e) ? e : e.contextElement;
}
function mr(e) {
  const t = zu(e);
  if (!Et(t))
    return pn(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = sp(t);
  let s = (o ? ds(n.width) : n.width) / r, l = (o ? ds(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: s,
    y: l
  };
}
const Y1 = /* @__PURE__ */ pn(0);
function lp(e) {
  const t = He(e);
  return !Lu() || !t.visualViewport ? Y1 : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Q1(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== He(e) ? !1 : t;
}
function Un(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), o = zu(e);
  let s = pn(1);
  t && (r ? bt(r) && (s = mr(r)) : s = mr(e));
  const l = Q1(o, n, r) ? lp(o) : pn(0);
  let a = (i.left + l.x) / s.x, u = (i.top + l.y) / s.y, c = i.width / s.x, f = i.height / s.y;
  if (o) {
    const p = He(o), h = r && bt(r) ? He(r) : r;
    let y = p.frameElement;
    for (; y && r && h !== p; ) {
      const v = mr(y), S = y.getBoundingClientRect(), m = it(y), d = S.left + (y.clientLeft + parseFloat(m.paddingLeft)) * v.x, g = S.top + (y.clientTop + parseFloat(m.paddingTop)) * v.y;
      a *= v.x, u *= v.y, c *= v.x, f *= v.y, a += d, u += g, y = He(y).frameElement;
    }
  }
  return ms({
    width: c,
    height: f,
    x: a,
    y: u
  });
}
function q1(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const i = Et(n), o = Ut(n);
  if (n === o)
    return t;
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = pn(1);
  const a = pn(0);
  if ((i || !i && r !== "fixed") && ((gn(n) !== "body" || Hi(o)) && (s = Fs(n)), Et(n))) {
    const u = Un(n);
    l = mr(n), a.x = u.x + n.clientLeft, a.y = u.y + n.clientTop;
  }
  return {
    width: t.width * l.x,
    height: t.height * l.y,
    x: t.x * l.x - s.scrollLeft * l.x + a.x,
    y: t.y * l.y - s.scrollTop * l.y + a.y
  };
}
function K1(e) {
  return Array.from(e.getClientRects());
}
function ap(e) {
  return Un(Ut(e)).left + Fs(e).scrollLeft;
}
function J1(e) {
  const t = Ut(e), n = Fs(e), r = e.ownerDocument.body, i = Ve(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), o = Ve(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + ap(e);
  const l = -n.scrollTop;
  return it(r).direction === "rtl" && (s += Ve(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: s,
    y: l
  };
}
function X1(e, t) {
  const n = He(e), r = Ut(e), i = n.visualViewport;
  let o = r.clientWidth, s = r.clientHeight, l = 0, a = 0;
  if (i) {
    o = i.width, s = i.height;
    const u = Lu();
    (!u || u && t === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: l,
    y: a
  };
}
function ew(e, t) {
  const n = Un(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, o = Et(e) ? mr(e) : pn(1), s = e.clientWidth * o.x, l = e.clientHeight * o.y, a = i * o.x, u = r * o.y;
  return {
    width: s,
    height: l,
    x: a,
    y: u
  };
}
function Mf(e, t, n) {
  let r;
  if (t === "viewport")
    r = X1(e, n);
  else if (t === "document")
    r = J1(Ut(e));
  else if (bt(t))
    r = ew(t, n);
  else {
    const i = lp(e);
    r = {
      ...t,
      x: t.x - i.x,
      y: t.y - i.y
    };
  }
  return ms(r);
}
function up(e, t) {
  const n = Tr(e);
  return n === t || !bt(n) || Rs(n) ? !1 : it(n).position === "fixed" || up(n, t);
}
function tw(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Pi(e, [], !1).filter((l) => bt(l) && gn(l) !== "body"), i = null;
  const o = it(e).position === "fixed";
  let s = o ? Tr(e) : e;
  for (; bt(s) && !Rs(s); ) {
    const l = it(s), a = Iu(s);
    !a && l.position === "fixed" && (i = null), (o ? !a && !i : !a && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Hi(s) && !a && up(e, s)) ? r = r.filter((c) => c !== s) : i = l, s = Tr(s);
  }
  return t.set(e, r), r;
}
function nw(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const s = [...n === "clippingAncestors" ? tw(t, this._c) : [].concat(n), r], l = s[0], a = s.reduce((u, c) => {
    const f = Mf(t, c, i);
    return u.top = Ve(f.top, u.top), u.right = mn(f.right, u.right), u.bottom = mn(f.bottom, u.bottom), u.left = Ve(f.left, u.left), u;
  }, Mf(t, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function rw(e) {
  return sp(e);
}
function iw(e, t, n) {
  const r = Et(t), i = Ut(t), o = n === "fixed", s = Un(e, !0, o, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = pn(0);
  if (r || !r && !o)
    if ((gn(t) !== "body" || Hi(i)) && (l = Fs(t)), r) {
      const u = Un(t, !0, o, t);
      a.x = u.x + t.clientLeft, a.y = u.y + t.clientTop;
    } else
      i && (a.x = ap(i));
  return {
    x: s.left + l.scrollLeft - a.x,
    y: s.top + l.scrollTop - a.y,
    width: s.width,
    height: s.height
  };
}
function Df(e, t) {
  return !Et(e) || it(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function cp(e, t) {
  const n = He(e);
  if (!Et(e))
    return n;
  let r = Df(e, t);
  for (; r && Z1(r) && it(r).position === "static"; )
    r = Df(r, t);
  return r && (gn(r) === "html" || gn(r) === "body" && it(r).position === "static" && !Iu(r)) ? n : r || G1(e) || n;
}
const ow = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const i = this.getOffsetParent || cp, o = this.getDimensions;
  return {
    reference: iw(t, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await o(n)
    }
  };
};
function sw(e) {
  return it(e).direction === "rtl";
}
const lw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: q1,
  getDocumentElement: Ut,
  getClippingRect: nw,
  getOffsetParent: cp,
  getElementRects: ow,
  getClientRects: K1,
  getDimensions: rw,
  getScale: mr,
  isElement: bt,
  isRTL: sw
};
function aw(e, t) {
  let n = null, r;
  const i = Ut(e);
  function o() {
    clearTimeout(r), n && n.disconnect(), n = null;
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
    const h = yo(c), y = yo(i.clientWidth - (u + f)), v = yo(i.clientHeight - (c + p)), S = yo(u), d = {
      rootMargin: -h + "px " + -y + "px " + -v + "px " + -S + "px",
      threshold: Ve(0, mn(1, a)) || 1
    };
    let g = !0;
    function w(x) {
      const T = x[0].intersectionRatio;
      if (T !== a) {
        if (!g)
          return s();
        T ? s(!1, T) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 100);
      }
      g = !1;
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
function uw(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: o = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = r, u = zu(e), c = i || o ? [...u ? Pi(u) : [], ...Pi(t)] : [];
  c.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), o && m.addEventListener("resize", n);
  });
  const f = u && l ? aw(u, n) : null;
  let p = -1, h = null;
  s && (h = new ResizeObserver((m) => {
    let [d] = m;
    d && d.target === u && h && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      h && h.observe(t);
    })), n();
  }), u && !a && h.observe(u), h.observe(t));
  let y, v = a ? Un(e) : null;
  a && S();
  function S() {
    const m = Un(e);
    v && (m.x !== v.x || m.y !== v.y || m.width !== v.width || m.height !== v.height) && n(), v = m, y = requestAnimationFrame(S);
  }
  return n(), () => {
    c.forEach((m) => {
      i && m.removeEventListener("scroll", n), o && m.removeEventListener("resize", n);
    }), f && f(), h && h.disconnect(), h = null, a && cancelAnimationFrame(y);
  };
}
const cw = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: lw,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return A1(e, t, {
    ...i,
    platform: o
  });
}, fw = (e) => {
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
      return r && t(r) ? r.current != null ? Cf({
        element: r.current,
        padding: i
      }).fn(n) : {} : r ? Cf({
        element: r,
        padding: i
      }).fn(n) : {};
    }
  };
};
var Lo = typeof document < "u" ? k.useLayoutEffect : k.useEffect;
function ps(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!ps(e[r], t[r]))
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
      if (!(o === "_owner" && e.$$typeof) && !ps(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function fp(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function $f(e, t) {
  const n = fp(e);
  return Math.round(t * n) / n;
}
function Pf(e) {
  const t = k.useRef(e);
  return Lo(() => {
    t.current = e;
  }), t;
}
function dw(e) {
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
  } = e, [c, f] = k.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = k.useState(r);
  ps(p, r) || h(r);
  const [y, v] = k.useState(null), [S, m] = k.useState(null), d = k.useCallback((A) => {
    A != T.current && (T.current = A, v(A));
  }, [v]), g = k.useCallback((A) => {
    A !== _.current && (_.current = A, m(A));
  }, [m]), w = o || y, x = s || S, T = k.useRef(null), _ = k.useRef(null), E = k.useRef(c), L = Pf(a), $ = Pf(i), H = k.useCallback(() => {
    if (!T.current || !_.current)
      return;
    const A = {
      placement: t,
      strategy: n,
      middleware: p
    };
    $.current && (A.platform = $.current), cw(T.current, _.current, A).then((re) => {
      const N = {
        ...re,
        isPositioned: !0
      };
      P.current && !ps(E.current, N) && (E.current = N, Mu.flushSync(() => {
        f(N);
      }));
    });
  }, [p, t, n, $]);
  Lo(() => {
    u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((A) => ({
      ...A,
      isPositioned: !1
    })));
  }, [u]);
  const P = k.useRef(!1);
  Lo(() => (P.current = !0, () => {
    P.current = !1;
  }), []), Lo(() => {
    if (w && (T.current = w), x && (_.current = x), w && x) {
      if (L.current)
        return L.current(w, x, H);
      H();
    }
  }, [w, x, H, L]);
  const pe = k.useMemo(() => ({
    reference: T,
    floating: _,
    setReference: d,
    setFloating: g
  }), [d, g]), b = k.useMemo(() => ({
    reference: w,
    floating: x
  }), [w, x]), de = k.useMemo(() => {
    const A = {
      position: n,
      left: 0,
      top: 0
    };
    if (!b.floating)
      return A;
    const re = $f(b.floating, c.x), N = $f(b.floating, c.y);
    return l ? {
      ...A,
      transform: "translate(" + re + "px, " + N + "px)",
      ...fp(b.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: re,
      top: N
    };
  }, [n, l, b.floating, c.x, c.y]);
  return k.useMemo(() => ({
    ...c,
    update: H,
    refs: pe,
    elements: b,
    floatingStyles: de
  }), [c, H, pe, b, de]);
}
function hw(e) {
  const [t, n] = k.useState(void 0);
  return Di(() => {
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
const dp = "Popper", [hp, mp] = qd(dp), [yx, pp] = hp(dp), mw = "PopperAnchor", pw = /* @__PURE__ */ k.forwardRef((e, t) => {
  const { __scopePopper: n, virtualRef: r, ...i } = e, o = pp(mw, n), s = k.useRef(null), l = $r(t, s);
  return k.useEffect(() => {
    o.onAnchorChange((r == null ? void 0 : r.current) || s.current);
  }), r ? null : /* @__PURE__ */ k.createElement(ji.div, fs({}, i, {
    ref: l
  }));
}), gp = "PopperContent", [gw, vx] = hp(gp), yw = /* @__PURE__ */ k.forwardRef((e, t) => {
  var n, r, i, o, s, l, a, u;
  const { __scopePopper: c, side: f = "bottom", sideOffset: p = 0, align: h = "center", alignOffset: y = 0, arrowPadding: v = 0, avoidCollisions: S = !0, collisionBoundary: m = [], collisionPadding: d = 0, sticky: g = "partial", hideWhenDetached: w = !1, updatePositionStrategy: x = "optimized", onPlaced: T, ..._ } = e, E = pp(gp, c), [L, $] = k.useState(null), H = $r(
    t,
    (Rr) => $(Rr)
  ), [P, pe] = k.useState(null), b = hw(P), de = (n = b == null ? void 0 : b.width) !== null && n !== void 0 ? n : 0, A = (r = b == null ? void 0 : b.height) !== null && r !== void 0 ? r : 0, re = f + (h !== "center" ? "-" + h : ""), N = typeof d == "number" ? d : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...d
  }, I = Array.isArray(m) ? m : [
    m
  ], R = I.length > 0, Z = {
    padding: N,
    boundary: I.filter(vw),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: R
  }, { refs: K, floatingStyles: ue, placement: Tt, isPositioned: Wt, middlewareData: Ie } = dw({
    // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
    strategy: "fixed",
    placement: re,
    whileElementsMounted: (...Rr) => uw(...Rr, {
      animationFrame: x === "always"
    }),
    elements: {
      reference: E.anchor
    },
    middleware: [
      W1({
        mainAxis: p + A,
        alignmentAxis: y
      }),
      S && j1({
        mainAxis: !0,
        crossAxis: !1,
        limiter: g === "partial" ? H1() : void 0,
        ...Z
      }),
      S && b1({
        ...Z
      }),
      B1({
        ...Z,
        apply: ({ elements: Rr, rects: Fu, availableWidth: Fp, availableHeight: Ap }) => {
          const { width: bp, height: Vp } = Fu.reference, Zi = Rr.floating.style;
          Zi.setProperty("--radix-popper-available-width", `${Fp}px`), Zi.setProperty("--radix-popper-available-height", `${Ap}px`), Zi.setProperty("--radix-popper-anchor-width", `${bp}px`), Zi.setProperty("--radix-popper-anchor-height", `${Vp}px`);
        }
      }),
      P && fw({
        element: P,
        padding: v
      }),
      ww({
        arrowWidth: de,
        arrowHeight: A
      }),
      w && V1({
        strategy: "referenceHidden",
        ...Z
      })
    ]
  }), [xn, $p] = yp(Tt), Bi = zs(T);
  Di(() => {
    Wt && (Bi == null || Bi());
  }, [
    Wt,
    Bi
  ]);
  const Pp = (i = Ie.arrow) === null || i === void 0 ? void 0 : i.x, Ip = (o = Ie.arrow) === null || o === void 0 ? void 0 : o.y, Lp = ((s = Ie.arrow) === null || s === void 0 ? void 0 : s.centerOffset) !== 0, [zp, Rp] = k.useState();
  return Di(() => {
    L && Rp(window.getComputedStyle(L).zIndex);
  }, [
    L
  ]), /* @__PURE__ */ k.createElement("div", {
    ref: K.setFloating,
    "data-radix-popper-content-wrapper": "",
    style: {
      ...ue,
      transform: Wt ? ue.transform : "translate(0, -200%)",
      // keep off the page when measuring
      minWidth: "max-content",
      zIndex: zp,
      "--radix-popper-transform-origin": [
        (l = Ie.transformOrigin) === null || l === void 0 ? void 0 : l.x,
        (a = Ie.transformOrigin) === null || a === void 0 ? void 0 : a.y
      ].join(" ")
    },
    dir: e.dir
  }, /* @__PURE__ */ k.createElement(gw, {
    scope: c,
    placedSide: xn,
    onArrowChange: pe,
    arrowX: Pp,
    arrowY: Ip,
    shouldHideArrow: Lp
  }, /* @__PURE__ */ k.createElement(ji.div, fs({
    "data-side": xn,
    "data-align": $p
  }, _, {
    ref: H,
    style: {
      ..._.style,
      // if the PopperContent hasn't been placed yet (not all measurements done)
      // we prevent animations so that users's animation don't kick in too early referring wrong sides
      animation: Wt ? void 0 : "none",
      // hide the content if using the hide middleware and should be hidden
      opacity: (u = Ie.hide) !== null && u !== void 0 && u.referenceHidden ? 0 : void 0
    }
  }))));
});
function vw(e) {
  return e !== null;
}
const ww = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var n, r, i, o, s;
    const { placement: l, rects: a, middlewareData: u } = t, f = ((n = u.arrow) === null || n === void 0 ? void 0 : n.centerOffset) !== 0, p = f ? 0 : e.arrowWidth, h = f ? 0 : e.arrowHeight, [y, v] = yp(l), S = {
      start: "0%",
      center: "50%",
      end: "100%"
    }[v], m = ((r = (i = u.arrow) === null || i === void 0 ? void 0 : i.x) !== null && r !== void 0 ? r : 0) + p / 2, d = ((o = (s = u.arrow) === null || s === void 0 ? void 0 : s.y) !== null && o !== void 0 ? o : 0) + h / 2;
    let g = "", w = "";
    return y === "bottom" ? (g = f ? S : `${m}px`, w = `${-h}px`) : y === "top" ? (g = f ? S : `${m}px`, w = `${a.floating.height + h}px`) : y === "right" ? (g = `${-h}px`, w = f ? S : `${d}px`) : y === "left" && (g = `${a.floating.width + h}px`, w = f ? S : `${d}px`), {
      data: {
        x: g,
        y: w
      }
    };
  }
});
function yp(e) {
  const [t, n = "center"] = e.split("-");
  return [
    t,
    n
  ];
}
const xw = pw, Sw = yw;
function kw(e, t) {
  return k.useReducer((n, r) => {
    const i = t[n][r];
    return i ?? n;
  }, e);
}
const vp = (e) => {
  const { present: t, children: n } = e, r = Ew(t), i = typeof n == "function" ? n({
    present: r.isPresent
  }) : k.Children.only(n), o = $r(r.ref, i.ref);
  return typeof n == "function" || r.isPresent ? /* @__PURE__ */ k.cloneElement(i, {
    ref: o
  }) : null;
};
vp.displayName = "Presence";
function Ew(e) {
  const [t, n] = k.useState(), r = k.useRef({}), i = k.useRef(e), o = k.useRef("none"), s = e ? "mounted" : "unmounted", [l, a] = kw(s, {
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
  return k.useEffect(() => {
    const u = vo(r.current);
    o.current = l === "mounted" ? u : "none";
  }, [
    l
  ]), Di(() => {
    const u = r.current, c = i.current;
    if (c !== e) {
      const p = o.current, h = vo(u);
      e ? a("MOUNT") : h === "none" || (u == null ? void 0 : u.display) === "none" ? a("UNMOUNT") : a(c && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
    }
  }, [
    e,
    a
  ]), Di(() => {
    if (t) {
      const u = (f) => {
        const h = vo(r.current).includes(f.animationName);
        f.target === t && h && Mu.flushSync(
          () => a("ANIMATION_END")
        );
      }, c = (f) => {
        f.target === t && (o.current = vo(r.current));
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
    ref: k.useCallback((u) => {
      u && (r.current = getComputedStyle(u)), n(u);
    }, [])
  };
}
function vo(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Ca() {
  return Ca = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ca.apply(this, arguments);
}
const Tw = /* @__PURE__ */ k.forwardRef((e, t) => /* @__PURE__ */ k.createElement(ji.span, Ca({}, e, {
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
}))), Cw = Tw, [As, wx] = qd("Tooltip", [
  mp
]), wp = mp(), _w = "TooltipProvider", If = "tooltip.open", [xx, xp] = As(_w), Sp = "Tooltip", [Sx, bs] = As(Sp), Lf = "TooltipTrigger", Nw = /* @__PURE__ */ k.forwardRef((e, t) => {
  const { __scopeTooltip: n, ...r } = e, i = bs(Lf, n), o = xp(Lf, n), s = wp(n), l = k.useRef(null), a = $r(t, l, i.onTriggerChange), u = k.useRef(!1), c = k.useRef(!1), f = k.useCallback(
    () => u.current = !1,
    []
  );
  return k.useEffect(() => () => document.removeEventListener("pointerup", f), [
    f
  ]), /* @__PURE__ */ k.createElement(xw, fn({
    asChild: !0
  }, s), /* @__PURE__ */ k.createElement(ji.button, fn({
    // We purposefully avoid adding `type=button` here because tooltip triggers are also
    // commonly anchors and the anchor `type` attribute signifies MIME type.
    "aria-describedby": i.open ? i.contentId : void 0,
    "data-state": i.stateAttribute
  }, r, {
    ref: a,
    onPointerMove: _t(e.onPointerMove, (p) => {
      p.pointerType !== "touch" && !c.current && !o.isPointerInTransitRef.current && (i.onTriggerEnter(), c.current = !0);
    }),
    onPointerLeave: _t(e.onPointerLeave, () => {
      i.onTriggerLeave(), c.current = !1;
    }),
    onPointerDown: _t(e.onPointerDown, () => {
      u.current = !0, document.addEventListener("pointerup", f, {
        once: !0
      });
    }),
    onFocus: _t(e.onFocus, () => {
      u.current || i.onOpen();
    }),
    onBlur: _t(e.onBlur, i.onClose),
    onClick: _t(e.onClick, i.onClose)
  })));
}), Ow = "TooltipPortal", [kx, Mw] = As(Ow, {
  forceMount: void 0
}), Ii = "TooltipContent", Dw = /* @__PURE__ */ k.forwardRef((e, t) => {
  const n = Mw(Ii, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...o } = e, s = bs(Ii, e.__scopeTooltip);
  return /* @__PURE__ */ k.createElement(vp, {
    present: r || s.open
  }, s.disableHoverableContent ? /* @__PURE__ */ k.createElement(kp, fn({
    side: i
  }, o, {
    ref: t
  })) : /* @__PURE__ */ k.createElement($w, fn({
    side: i
  }, o, {
    ref: t
  })));
}), $w = /* @__PURE__ */ k.forwardRef((e, t) => {
  const n = bs(Ii, e.__scopeTooltip), r = xp(Ii, e.__scopeTooltip), i = k.useRef(null), o = $r(t, i), [s, l] = k.useState(null), { trigger: a, onClose: u } = n, c = i.current, { onPointerInTransitChange: f } = r, p = k.useCallback(() => {
    l(null), f(!1);
  }, [
    f
  ]), h = k.useCallback((y, v) => {
    const S = y.currentTarget, m = {
      x: y.clientX,
      y: y.clientY
    }, d = Iw(m, S.getBoundingClientRect()), g = Lw(m, d), w = zw(v.getBoundingClientRect()), x = Fw([
      ...g,
      ...w
    ]);
    l(x), f(!0);
  }, [
    f
  ]);
  return k.useEffect(() => () => p(), [
    p
  ]), k.useEffect(() => {
    if (a && c) {
      const y = (S) => h(S, c), v = (S) => h(S, a);
      return a.addEventListener("pointerleave", y), c.addEventListener("pointerleave", v), () => {
        a.removeEventListener("pointerleave", y), c.removeEventListener("pointerleave", v);
      };
    }
  }, [
    a,
    c,
    h,
    p
  ]), k.useEffect(() => {
    if (s) {
      const y = (v) => {
        const S = v.target, m = {
          x: v.clientX,
          y: v.clientY
        }, d = (a == null ? void 0 : a.contains(S)) || (c == null ? void 0 : c.contains(S)), g = !Rw(m, s);
        d ? p() : g && (p(), u());
      };
      return document.addEventListener("pointermove", y), () => document.removeEventListener("pointermove", y);
    }
  }, [
    a,
    c,
    s,
    u,
    p
  ]), /* @__PURE__ */ k.createElement(kp, fn({}, e, {
    ref: o
  }));
}), [Pw, Ex] = As(Sp, {
  isInside: !1
}), kp = /* @__PURE__ */ k.forwardRef((e, t) => {
  const { __scopeTooltip: n, children: r, "aria-label": i, onEscapeKeyDown: o, onPointerDownOutside: s, ...l } = e, a = bs(Ii, n), u = wp(n), { onClose: c } = a;
  return k.useEffect(() => (document.addEventListener(If, c), () => document.removeEventListener(If, c)), [
    c
  ]), k.useEffect(() => {
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
  ]), /* @__PURE__ */ k.createElement(N1, {
    asChild: !0,
    disableOutsidePointerEvents: !1,
    onEscapeKeyDown: o,
    onPointerDownOutside: s,
    onFocusOutside: (f) => f.preventDefault(),
    onDismiss: c
  }, /* @__PURE__ */ k.createElement(Sw, fn({
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
  }), /* @__PURE__ */ k.createElement(tp, null, r), /* @__PURE__ */ k.createElement(Pw, {
    scope: n,
    isInside: !0
  }, /* @__PURE__ */ k.createElement(Cw, {
    id: a.contentId,
    role: "tooltip"
  }, i || r))));
});
function Iw(e, t) {
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
function Lw(e, t, n = 5) {
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
function zw(e) {
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
function Rw(e, t) {
  const { x: n, y: r } = e;
  let i = !1;
  for (let o = 0, s = t.length - 1; o < t.length; s = o++) {
    const l = t[o].x, a = t[o].y, u = t[s].x, c = t[s].y;
    a > r != c > r && n < (u - l) * (r - a) / (c - a) + l && (i = !i);
  }
  return i;
}
function Fw(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Aw(t);
}
function Aw(e) {
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
const bw = Nw, Vw = Dw;
function Ep(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = Ep(e[t])) && (r && (r += " "), r += n);
    else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function Uw() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = Ep(e)) && (r && (r += " "), r += t);
  return r;
}
function Ww() {
  for (var e = 0, t, n, r = ""; e < arguments.length; )
    (t = arguments[e++]) && (n = Tp(t)) && (r && (r += " "), r += n);
  return r;
}
function Tp(e) {
  if (typeof e == "string")
    return e;
  for (var t, n = "", r = 0; r < e.length; r++)
    e[r] && (t = Tp(e[r])) && (n && (n += " "), n += t);
  return n;
}
var Ru = "-";
function jw(e) {
  var t = Bw(e), n = e.conflictingClassGroups, r = e.conflictingClassGroupModifiers, i = r === void 0 ? {} : r;
  function o(l) {
    var a = l.split(Ru);
    return a[0] === "" && a.length !== 1 && a.shift(), Cp(a, t) || Hw(l);
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
function Cp(e, t) {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  var n = e[0], r = t.nextPart.get(n), i = r ? Cp(e.slice(1), r) : void 0;
  if (i)
    return i;
  if (t.validators.length !== 0) {
    var o = e.join(Ru);
    return (s = t.validators.find(function(l) {
      var a = l.validator;
      return a(o);
    })) == null ? void 0 : s.classGroupId;
  }
}
var zf = /^\[(.+)\]$/;
function Hw(e) {
  if (zf.test(e)) {
    var t = zf.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}
function Bw(e) {
  var t = e.theme, n = e.prefix, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  }, i = Gw(Object.entries(e.classGroups), n);
  return i.forEach(function(o) {
    var s = o[0], l = o[1];
    _a(l, r, s, t);
  }), r;
}
function _a(e, t, n, r) {
  e.forEach(function(i) {
    if (typeof i == "string") {
      var o = i === "" ? t : Rf(t, i);
      o.classGroupId = n;
      return;
    }
    if (typeof i == "function") {
      if (Zw(i)) {
        _a(i(r), t, n, r);
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
      _a(a, Rf(t, l), n, r);
    });
  });
}
function Rf(e, t) {
  var n = e;
  return t.split(Ru).forEach(function(r) {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}
function Zw(e) {
  return e.isThemeGetter;
}
function Gw(e, t) {
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
function Yw(e) {
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
var _p = "!";
function Qw(e) {
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
    var h = l.length === 0 ? s : s.substring(u), y = h.startsWith(_p), v = y ? h.substring(1) : h, S = c && c > u ? c - u : void 0;
    return {
      modifiers: l,
      hasImportantModifier: y,
      baseClassName: v,
      maybePostfixModifierPosition: S
    };
  };
}
function qw(e) {
  if (e.length <= 1)
    return e;
  var t = [], n = [];
  return e.forEach(function(r) {
    var i = r[0] === "[";
    i ? (t.push.apply(t, n.sort().concat([r])), n = []) : n.push(r);
  }), t.push.apply(t, n.sort()), t;
}
function Kw(e) {
  return {
    cache: Yw(e.cacheSize),
    splitModifiers: Qw(e),
    ...jw(e)
  };
}
var Jw = /\s+/;
function Xw(e, t) {
  var n = t.splitModifiers, r = t.getClassGroupId, i = t.getConflictingClassGroupIds, o = /* @__PURE__ */ new Set();
  return e.trim().split(Jw).map(function(s) {
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
    var y = qw(a).join(":"), v = u ? y + _p : y;
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
function ex() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r, i, o, s = l;
  function l(u) {
    var c = t[0], f = t.slice(1), p = f.reduce(function(h, y) {
      return y(h);
    }, c());
    return r = Kw(p), i = r.cache.get, o = r.cache.set, s = a, a(u);
  }
  function a(u) {
    var c = i(u);
    if (c)
      return c;
    var f = Xw(u, r);
    return o(u, f), f;
  }
  return function() {
    return s(Ww.apply(null, arguments));
  };
}
function J(e) {
  var t = function(r) {
    return r[e] || [];
  };
  return t.isThemeGetter = !0, t;
}
var Np = /^\[(?:([a-z-]+):)?(.+)\]$/i, tx = /^\d+\/\d+$/, nx = /* @__PURE__ */ new Set(["px", "full", "screen"]), rx = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ix = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ox = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function at(e) {
  return $n(e) || nx.has(e) || tx.test(e) || Na(e);
}
function Na(e) {
  return Bn(e, "length", fx);
}
function sx(e) {
  return Bn(e, "size", Op);
}
function lx(e) {
  return Bn(e, "position", Op);
}
function ax(e) {
  return Bn(e, "url", dx);
}
function wo(e) {
  return Bn(e, "number", $n);
}
function $n(e) {
  return !Number.isNaN(Number(e));
}
function ux(e) {
  return e.endsWith("%") && $n(e.slice(0, -1));
}
function Gr(e) {
  return Ff(e) || Bn(e, "number", Ff);
}
function V(e) {
  return Np.test(e);
}
function Yr() {
  return !0;
}
function Zt(e) {
  return rx.test(e);
}
function cx(e) {
  return Bn(e, "", hx);
}
function Bn(e, t, n) {
  var r = Np.exec(e);
  return r ? r[1] ? r[1] === t : n(r[2]) : !1;
}
function fx(e) {
  return ix.test(e);
}
function Op() {
  return !1;
}
function dx(e) {
  return e.startsWith("url(");
}
function Ff(e) {
  return Number.isInteger(Number(e));
}
function hx(e) {
  return ox.test(e);
}
function mx() {
  var e = J("colors"), t = J("spacing"), n = J("blur"), r = J("brightness"), i = J("borderColor"), o = J("borderRadius"), s = J("borderSpacing"), l = J("borderWidth"), a = J("contrast"), u = J("grayscale"), c = J("hueRotate"), f = J("invert"), p = J("gap"), h = J("gradientColorStops"), y = J("gradientColorStopPositions"), v = J("inset"), S = J("margin"), m = J("opacity"), d = J("padding"), g = J("saturate"), w = J("scale"), x = J("sepia"), T = J("skew"), _ = J("space"), E = J("translate"), L = function() {
    return ["auto", "contain", "none"];
  }, $ = function() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  }, H = function() {
    return ["auto", V, t];
  }, P = function() {
    return [V, t];
  }, pe = function() {
    return ["", at];
  }, b = function() {
    return ["auto", $n, V];
  }, de = function() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  }, A = function() {
    return ["solid", "dashed", "dotted", "double", "none"];
  }, re = function() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  }, N = function() {
    return ["start", "end", "center", "between", "around", "evenly", "stretch"];
  }, I = function() {
    return ["", "0", V];
  }, R = function() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  }, Z = function() {
    return [$n, wo];
  }, K = function() {
    return [$n, V];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [Yr],
      spacing: [at],
      blur: ["none", "", Zt, V],
      brightness: Z(),
      borderColor: [e],
      borderRadius: ["none", "", "full", Zt, V],
      borderSpacing: P(),
      borderWidth: pe(),
      contrast: Z(),
      grayscale: I(),
      hueRotate: K(),
      invert: I(),
      gap: P(),
      gradientColorStops: [e],
      gradientColorStopPositions: [ux, Na],
      inset: H(),
      margin: H(),
      opacity: Z(),
      padding: P(),
      saturate: Z(),
      scale: Z(),
      sepia: I(),
      skew: K(),
      space: P(),
      translate: P()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", V]
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
        columns: [Zt]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": R()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": R()
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
        object: [].concat(de(), [V])
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
        z: ["auto", Gr]
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
        flex: ["1", "auto", "initial", "none", V]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: I()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: I()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Gr]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Yr]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Gr]
        }, V]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": b()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": b()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Yr]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Gr]
        }, V]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": b()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": b()
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
        "auto-cols": ["auto", "min", "max", "fr", V]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", V]
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
        justify: ["normal"].concat(N())
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
        content: ["normal"].concat(N(), ["baseline"])
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
        "place-content": [].concat(N(), ["baseline"])
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
        m: [S]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [S]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [S]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [S]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [S]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [S]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [S]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [S]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [S]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [_]
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
        "space-y": [_]
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
        w: ["auto", "min", "max", "fit", V, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", V, at]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [Zt]
        }, Zt, V]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [V, t, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", V, at]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [V, t, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Zt, Na]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", wo]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Yr]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", V]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", $n, wo]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", V, at]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", V]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", V]
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
        decoration: [].concat(A(), ["wavy"])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", at]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", V, at]
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
        indent: P()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", V]
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
        content: ["none", V]
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
        bg: [].concat(de(), [lx])
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
        bg: ["auto", "cover", "contain", sx]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, ax]
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
        from: [y]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [y]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [y]
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
        border: [].concat(A(), ["hidden"])
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
        divide: A()
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
        outline: [""].concat(A())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [V, at]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [at]
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
        ring: pe()
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
        "ring-offset": [at]
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
        shadow: ["", "inner", "none", Zt, cx]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Yr]
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
        "mix-blend": re()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": re()
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
        "drop-shadow": ["", "none", Zt, V]
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
        saturate: [g]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [x]
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
        "backdrop-saturate": [g]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [x]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", V]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: K()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", V]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: K()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", V]
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
        rotate: [Gr, V]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [E]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [E]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [T]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [T]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", V]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", V]
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
        "scroll-m": P()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": P()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": P()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": P()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": P()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": P()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": P()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": P()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": P()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": P()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": P()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": P()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": P()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": P()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": P()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": P()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": P()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": P()
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
        "will-change": ["auto", "scroll", "contents", "transform", V]
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
        stroke: [at, wo]
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
var px = /* @__PURE__ */ ex(mx);
const Mp = (...e) => px(Uw(...e));
var Dp = "/Users/richardguerre/Projects/flow/packages/ui/Tooltip.tsx";
k.forwardRef((e, t) => /* @__PURE__ */ $t.createElement(bw, { ref: t, ...e, className: Mp("leading-none", e.className), __self: void 0, __source: {
  fileName: Dp,
  lineNumber: 10,
  columnNumber: 19
} }));
const xl = k.forwardRef((e, t) => /* @__PURE__ */ $t.createElement(Vw, { ref: t, ...e, sideOffset: e.sideOffset ?? 4, className: Mp("bg-background-50 animate-fade-in animate-duration-100 text-foreground-900 ring-0.5 ring-primary-100 z-50 rounded p-1 text-sm shadow-md", e.className), "un-cloak": !0, __self: void 0, __source: {
  fileName: Dp,
  lineNumber: 15,
  columnNumber: 3
} })), gx = "numTasksPerBatch";
var Q = "/Users/richardguerre/Projects/flow/plugins/repeating-tasks/src/web.tsx";
const Tx = Up((e) => {
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
    }, f = async (h, y) => {
      if (y)
        console.log("adding new task"), await c([...l, {
          ...h,
          id: r()
        }]), u(!1);
      else {
        console.log("updating task");
        const v = l.map((S) => S.id !== h.id ? S : h);
        await c(v);
      }
    }, p = (h) => {
      console.log("deleting task"), c(l.filter((y) => y.id !== h));
    };
    return /* @__PURE__ */ t.createElement("div", { className: "flex gap-4 flex-wrap items-start", __self: void 0, __source: {
      fileName: Q,
      lineNumber: 63,
      columnNumber: 7
    } }, l.map((h) => /* @__PURE__ */ t.createElement(o, { key: h.id, task: h, onChange: (y) => f(y), onDelete: () => p(h.id), __self: void 0, __source: {
      fileName: Q,
      lineNumber: 65,
      columnNumber: 11
    } })), a ? /* @__PURE__ */ t.createElement(o, { onChange: (h) => f(h, !0), autoFocus: !0, __self: void 0, __source: {
      fileName: Q,
      lineNumber: 73,
      columnNumber: 11
    } }) : /* @__PURE__ */ t.createElement(n.Tooltip, { __self: void 0, __source: {
      fileName: Q,
      lineNumber: 75,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(n.TooltipTrigger, { __self: void 0, __source: {
      fileName: Q,
      lineNumber: 76,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement("button", { onClick: () => u(!0), className: "flex items-center justify-center text-sm bg-background-200 text-foreground-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 w-64 min-h-18 gap-2 rounded-md p-3 shadow-md", __self: void 0, __source: {
      fileName: Q,
      lineNumber: 77,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement(dy, { __self: void 0, __source: {
      fileName: Q,
      lineNumber: 81,
      columnNumber: 17
    } }), "New repeating task")), /* @__PURE__ */ t.createElement(xl, { side: "bottom", __self: void 0, __source: {
      fileName: Q,
      lineNumber: 85,
      columnNumber: 13
    } }, "Create a new repeating task")));
  }, o = (s) => {
    var S, m, d, g;
    const [l, a] = t.useState(!1), u = t.useRef(), {
      register: c,
      control: f,
      handleSubmit: p,
      watch: h
    } = e.reactHookForm.useForm({
      defaultValues: {
        title: ((S = s.task) == null ? void 0 : S.title) ?? "",
        durationInMinutes: (m = s.task) == null ? void 0 : m.durationInMinutes,
        // cron for every day at midnight
        cron: ((d = s.task) == null ? void 0 : d.cron) ?? "0 0 * * *",
        enabled: ((g = s.task) == null ? void 0 : g.enabled) ?? !0
      }
    }), y = (w) => {
      l || (u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        var x;
        s.onChange({
          id: (x = s.task) == null ? void 0 : x.id,
          ...w
        });
      }, 1e3));
    }, v = (w) => {
      u.current && clearTimeout(u.current), w.cron && (u.current = setTimeout(() => {
        var x;
        e.toast.error(((x = w.cron) == null ? void 0 : x.message) ?? "Invalid cron expression");
      }, 1e3));
    };
    return t.useEffect(() => {
      const w = h(() => p(y, v)());
      return () => w.unsubscribe();
    }, [p, h, l]), /* @__PURE__ */ t.createElement("form", { className: "bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-md p-3 shadow-lg w-64", onSubmit: p(y, v), __self: void 0, __source: {
      fileName: Q,
      lineNumber: 135,
      columnNumber: 7
    } }, /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "title", control: f, render: ({
      field: w
    }) => {
      var x;
      return /* @__PURE__ */ t.createElement(n.TaskTitleInput, { initialValue: (x = s.task) == null ? void 0 : x.title, onSave: w.onChange, onCancel: w.onBlur, autoFocus: s.autoFocus, __self: void 0, __source: {
        fileName: Q,
        lineNumber: 143,
        columnNumber: 13
      } });
    }, rules: {
      required: !0
    }, __self: void 0, __source: {
      fileName: Q,
      lineNumber: 139,
      columnNumber: 9
    } }), /* @__PURE__ */ t.createElement("div", { className: "flex gap-2", __self: void 0, __source: {
      fileName: Q,
      lineNumber: 152,
      columnNumber: 9
    } }, /* @__PURE__ */ t.createElement("input", { type: "text", className: "bg-transparent border-none text-foreground-700 focus:ring-0 active:ring-0 focus:outline-none w-full font-mono", ...c("cron", {
      required: !0,
      validate: {
        parse: (w) => Object.keys(Gg.parseString(w).errors).length === 0 || "Invalid cron expression"
      }
    }), __self: void 0, __source: {
      fileName: Q,
      lineNumber: 153,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { name: "durationInMinutes", control: f, render: ({
      field: w
    }) => /* @__PURE__ */ t.createElement(n.TaskDurationButtonDropdown, { value: w.value, onChange: w.onChange, showByDefault: !0, __self: void 0, __source: {
      fileName: Q,
      lineNumber: 169,
      columnNumber: 15
    } }), __self: void 0, __source: {
      fileName: Q,
      lineNumber: 165,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(e.reactHookForm.Controller, { control: f, name: "enabled", render: ({
      field: w
    }) => /* @__PURE__ */ t.createElement(n.Tooltip, { __self: void 0, __source: {
      fileName: Q,
      lineNumber: 180,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement(n.TooltipTrigger, { __self: void 0, __source: {
      fileName: Q,
      lineNumber: 181,
      columnNumber: 17
    } }, /* @__PURE__ */ t.createElement("button", { onClick: () => w.onChange(!w.value), className: e.tw("flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm", w.value ? "bg-primary-100 text-primary-600 hover:bg-primary-300 active:bg-primary-200" : "bg-background-200 text-foreground-700 hover:bg-background-200 active:bg-primary-200"), __self: void 0, __source: {
      fileName: Q,
      lineNumber: 182,
      columnNumber: 19
    } }, /* @__PURE__ */ t.createElement(fy, { __self: void 0, __source: {
      fileName: Q,
      lineNumber: 191,
      columnNumber: 21
    } }))), /* @__PURE__ */ t.createElement(xl, { side: "bottom", __self: void 0, __source: {
      fileName: Q,
      lineNumber: 194,
      columnNumber: 17
    } }, "Whether this repating task is enabled? If disabled all future tasks after today will be deleted.")), __self: void 0, __source: {
      fileName: Q,
      lineNumber: 176,
      columnNumber: 11
    } }), /* @__PURE__ */ t.createElement(n.Tooltip, { __self: void 0, __source: {
      fileName: Q,
      lineNumber: 201,
      columnNumber: 11
    } }, /* @__PURE__ */ t.createElement(n.TooltipTrigger, { __self: void 0, __source: {
      fileName: Q,
      lineNumber: 202,
      columnNumber: 13
    } }, /* @__PURE__ */ t.createElement("button", { onClick: () => {
      var w;
      a(!0), (w = s.onDelete) == null || w.call(s);
    }, className: "flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm bg-background-200 text-foreground-700 hover:bg-negative-100 hover:text-negative-600 active:bg-negative-200", __self: void 0, __source: {
      fileName: Q,
      lineNumber: 203,
      columnNumber: 15
    } }, /* @__PURE__ */ t.createElement(hy, { size: 16, __self: void 0, __source: {
      fileName: Q,
      lineNumber: 210,
      columnNumber: 17
    } }))), /* @__PURE__ */ t.createElement(xl, { side: "bottom", __self: void 0, __source: {
      fileName: Q,
      lineNumber: 213,
      columnNumber: 13
    } }, "Delete"))));
  };
  return {
    name: "Repeating tasks",
    settings: {
      [gx]: {
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
          fileName: Q,
          lineNumber: 234,
          columnNumber: 23
        } })
      }
    }
  };
});
export {
  Tx as default
};
