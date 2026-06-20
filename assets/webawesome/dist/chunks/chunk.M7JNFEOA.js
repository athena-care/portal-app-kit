/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaViewChangeEvent
} from "./chunk.5Q3C7XRF.js";
import {
  WaFocusDayEvent
} from "./chunk.2W5ICYYR.js";
import {
  buildDisabledMatcher,
  parseDaysOfWeek,
  parseDisabledDates
} from "./chunk.T2PA53U2.js";
import {
  addDays,
  addMonths,
  addYears,
  clampDate,
  coerceToDate,
  daysInMonth,
  formatIsoDate,
  formatRange,
  isSameDay,
  isSameMonth,
  parseIsoDate,
  parseRange,
  today
} from "./chunk.4RAXYMTU.js";
import {
  getWeekInfo,
  intlFirstDayToJsDay,
  intlWeekendToJsDays
} from "./chunk.QNBIIK3Q.js";
import {
  date_picker_styles_default
} from "./chunk.W3U4GULP.js";
import {
  warnDeprecatedSize
} from "./chunk.DLSTVVIL.js";
import {
  size_styles_default
} from "./chunk.ITHNGWNG.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement
} from "./chunk.SPMLOO35.js";
import {
  LocalizeController
} from "./chunk.I5ZKJLBU.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/date-picker/date-picker.ts
import { html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
var WaDatePicker = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.mode = "single";
    this._value = "";
    this.min = "";
    this.max = "";
    this.today = "";
    this.focusedDate = "";
    this.view = "days";
    this.months = 1;
    this.pageBy = "months";
    this.firstDayOfWeek = "auto";
    this.withOutsideDays = false;
    this.withWeekNumbers = false;
    this.weekdayFormat = "short";
    this.disabled = false;
    this.readonly = false;
    this._disabledDatesRaw = "";
    this._disabledDates = [];
    this.disabledDaysOfWeek = "";
    this.disablePast = false;
    this.disableFuture = false;
    this.minRange = 0;
    this.maxRange = 0;
    this.size = "m";
    this.locale = "";
    this.rangeAnchor = null;
    /**
     * The committed `value` captured when an in-progress range begins, so Escape can restore it instead of
     * destroying a previously-committed range. Only meaningful while `rangeAnchor` is set.
     */
    this.rangeCommittedValue = "";
    this.hoverDate = null;
    this.viewAnchor = null;
    this.focusedMonth = null;
    this.focusedYear = null;
    this.liveAnnouncement = "";
    this.handleGridMouseLeave = () => {
      if (this.mode === "range" && this.rangeAnchor) {
        this.hoverDate = null;
      }
    };
  }
  get value() {
    return this._value;
  }
  set value(val) {
    const next = this.normalizeValue(val);
    if (next === this._value) return;
    const old = this._value;
    this._value = next;
    this.requestUpdate("value", old);
  }
  get disabledDates() {
    return this._disabledDatesRaw;
  }
  set disabledDates(val) {
    this._disabledDatesRaw = val == null ? "" : val;
    this._disabledDates = parseDisabledDates(val);
    this.requestUpdate("disabledDates");
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  //
  // Lifecycle
  //
  connectedCallback() {
    super.connectedCallback();
    this.updateCustomStates();
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.requestUpdate();
      });
    }
  }
  willUpdate(changed) {
    super.willUpdate(changed);
    if (changed.has("disabled") || changed.has("readonly") || changed.has("mode")) {
      this.updateCustomStates();
    }
    if (!this.viewAnchor) {
      const seed = this.resolvedFocusedDate();
      this.viewAnchor = new Date(seed.getFullYear(), seed.getMonth(), 1);
    }
  }
  updateCustomStates() {
    this.customStates.set("disabled", this.disabled);
    this.customStates.set("readonly", this.readonly);
    this.customStates.set("range", this.mode === "range");
  }
  handleModeChange(_old, next) {
    this.rangeAnchor = null;
    this.hoverDate = null;
    this.rangeCommittedValue = "";
    this.liveAnnouncement = "";
    this.viewAnchor = null;
    if (next !== void 0) {
      const renorm = this.normalizeValue(this._value);
      if (renorm !== this._value) {
        this._value = renorm;
      }
    }
  }
  //
  // Public methods
  //
  /** Focuses the calendar at the currently focused day. */
  focus(options) {
    const target = this.base?.querySelector('[part~="day"][tabindex="0"]');
    if (target) {
      target.focus(options);
    } else {
      super.focus(options);
    }
  }
  /** Scrolls the view to show the given date and sets the focused day. */
  goToDate(date) {
    const parsed = coerceToDate(date);
    if (!parsed) return;
    this.focusedDate = formatIsoDate(parsed);
    this.setViewAnchor(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
  }
  /** Equivalent to `goToDate(today)`. */
  goToToday() {
    this.goToDate(this.resolvedToday());
  }
  /** Clears the current selection and emits `input` then `change`. */
  clear() {
    if (this.disabled || this.readonly) return;
    if (!this._value && !this.rangeAnchor) return;
    this._value = "";
    this.rangeAnchor = null;
    this.hoverDate = null;
    this.rangeCommittedValue = "";
    this.liveAnnouncement = "";
    this.requestUpdate();
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.announceSelection();
  }
  /** Read-only convenience getter: returns the selected date in `mode="single"`. */
  get valueAsDate() {
    if (this.mode !== "single") return null;
    return parseIsoDate(this._value);
  }
  /** Read-only convenience getter: returns the selected range in `mode="range"`. */
  get valueAsRange() {
    if (this.mode !== "range") return { from: null, to: null };
    return parseRange(this._value);
  }
  //
  // Value normalization
  //
  normalizeValue(val) {
    if (val == null || val === "") return "";
    if (this.mode === "single") {
      if (val instanceof Date) return formatIsoDate(val);
      if (typeof val === "string") {
        const parsed = parseRange(val).from;
        return parsed ? formatIsoDate(parsed) : "";
      }
      return "";
    }
    if (typeof val === "string") {
      const parsed = parseRange(val);
      return formatRange(parsed);
    }
    if (val instanceof Date) {
      return formatIsoDate(val);
    }
    if (typeof val === "object") {
      const obj = val;
      const from = coerceToDate(obj.from ?? null);
      const to = coerceToDate(obj.to ?? null);
      return formatRange({ from, to });
    }
    return "";
  }
  //
  // Resolved values (computed each render)
  //
  resolvedLocale() {
    if (this.didSSR && !this.hasUpdated) {
      return this.locale || this.lang || "en";
    }
    return this.locale || this.lang || (typeof document !== "undefined" ? document.documentElement.lang : "") || "en";
  }
  resolvedToday() {
    return parseIsoDate(this.today) ?? today();
  }
  resolvedFirstDay() {
    const named = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    const value = String(this.firstDayOfWeek ?? "").toLowerCase();
    if (value in named) return named[value];
    if (this.didSSR && !this.hasUpdated) {
      const firstDay = this.shadowRoot?.querySelector?.("[data-first-day]")?.getAttribute?.("data-first-day");
      if (firstDay != null) {
        return Number(firstDay);
      }
    }
    return intlFirstDayToJsDay(getWeekInfo(this.resolvedLocale()).firstDay);
  }
  resolvedWeekendDays() {
    if (this.didSSR && !this.hasUpdated) {
      const str = this.shadowRoot?.querySelector?.("[data-weekend-days]")?.getAttribute("data-weekend-days");
      if (str) {
        return str.split(/\s+/).map(Number);
      }
    }
    return intlWeekendToJsDays(getWeekInfo(this.resolvedLocale()).weekend);
  }
  resolvedFocusedDate() {
    const min = parseIsoDate(this.min);
    const max = parseIsoDate(this.max);
    const parsed = parseIsoDate(this.focusedDate);
    if (parsed) return clampDate(parsed, min, max);
    if (this.mode === "single") {
      const v = parseIsoDate(this._value);
      if (v) return clampDate(v, min, max);
    } else {
      const range = parseRange(this._value);
      if (range.from) return clampDate(range.from, min, max);
    }
    return clampDate(this.resolvedToday(), min, max);
  }
  /**
   * The first month currently rendered. Changes only via prev/next, the view stepper,
   * `goToDate()`, mode change, or keyboard navigation that crosses the visible-month boundary.
   * Clicking a day does not change this.
   */
  resolvedViewAnchor() {
    const min = parseIsoDate(this.min);
    const max = parseIsoDate(this.max);
    if (this.viewAnchor) return clampDate(this.viewAnchor, min, max);
    return this.resolvedFocusedDate();
  }
  /** Returns true if `date` falls within any month currently rendered. */
  isInVisibleRange(date) {
    const anchor = this.resolvedViewAnchor();
    const monthCount = this.resolvedMonthCount();
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const lastMonth = new Date(anchor.getFullYear(), anchor.getMonth() + monthCount, 0);
    return date.getTime() >= first.getTime() && date.getTime() <= lastMonth.getTime();
  }
  /**
   * The day that gets `tabindex="0"` for roving focus. If the user's `focusedDate` is inside
   * the visible range, that wins. Otherwise we fall back to the first day of the first visible
   * month so the grid always has a keyboard entry point.
   */
  resolvedRovingFocus() {
    const focused = this.resolvedFocusedDate();
    if (this.isInVisibleRange(focused)) return focused;
    const anchor = this.resolvedViewAnchor();
    return new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  }
  /** The month index (0-11) that should hold roving focus inside the months sub-view. */
  resolvedFocusedMonth() {
    if (this.focusedMonth !== null) return this.focusedMonth;
    return this.resolvedFocusedDate().getMonth();
  }
  /** The year that should hold roving focus inside the years sub-view. */
  resolvedFocusedYear() {
    if (this.focusedYear !== null) return this.focusedYear;
    return this.resolvedFocusedDate().getFullYear();
  }
  buildDisabledChecker() {
    return buildDisabledMatcher({
      min: parseIsoDate(this.min),
      max: parseIsoDate(this.max),
      disabledDates: this._disabledDates,
      disabledDaysOfWeek: parseDaysOfWeek(this.disabledDaysOfWeek),
      disablePast: this.disablePast,
      disableFuture: this.disableFuture,
      today: this.resolvedToday(),
      isDateDisabled: this.isDateDisabled
    });
  }
  resolvedMonthCount(months = this.months) {
    return Number(months) === 2 ? 2 : 1;
  }
  //
  // Navigation handlers
  //
  pageStep() {
    return this.pageBy === "months" ? this.resolvedMonthCount() : 1;
  }
  handlePrevious() {
    if (this.disabled) return;
    const anchor = this.resolvedViewAnchor();
    const min = parseIsoDate(this.min);
    const max = parseIsoDate(this.max);
    if (min && this.isPageOutsideRange("previous", anchor, min, max)) return;
    this.setViewAnchor(this.getPageAnchor("previous", anchor));
  }
  handleNext() {
    if (this.disabled) return;
    const anchor = this.resolvedViewAnchor();
    const min = parseIsoDate(this.min);
    const max = parseIsoDate(this.max);
    if (max && this.isPageOutsideRange("next", anchor, min, max)) return;
    this.setViewAnchor(this.getPageAnchor("next", anchor));
  }
  /** Compute the target anchor for paging in the given direction at the current view. */
  getPageAnchor(direction, anchor) {
    const sign = direction === "previous" ? -1 : 1;
    if (this.view === "days") return addMonths(anchor, sign * this.pageStep());
    if (this.view === "months") return addYears(anchor, sign * 1);
    return addYears(anchor, sign * 12);
  }
  /** True when the page in the given direction lies entirely outside [min, max]. */
  isPageOutsideRange(direction, anchor, min, max) {
    if (direction === "previous" && !min) return false;
    if (direction === "next" && !max) return false;
    if (this.view === "days") {
      const step = this.pageStep();
      if (direction === "previous") {
        const lastPrevDay = addDays(new Date(anchor.getFullYear(), anchor.getMonth(), 1), -1);
        return !!min && lastPrevDay.getTime() < min.getTime();
      }
      const firstNextDay = new Date(anchor.getFullYear(), anchor.getMonth() + step, 1);
      return !!max && firstNextDay.getTime() > max.getTime();
    }
    if (this.view === "months") {
      const year = anchor.getFullYear();
      if (direction === "previous") {
        const lastDayPrevYear = new Date(year - 1, 11, 31);
        return !!min && lastDayPrevYear.getTime() < min.getTime();
      }
      const firstDayNextYear = new Date(year + 1, 0, 1);
      return !!max && firstDayNextYear.getTime() > max.getTime();
    }
    const startYear = Math.floor(anchor.getFullYear() / 12) * 12;
    if (direction === "previous") {
      const lastDayPrevBlock = new Date(startYear - 1, 11, 31);
      return !!min && lastDayPrevBlock.getTime() < min.getTime();
    }
    const firstDayNextBlock = new Date(startYear + 12, 0, 1);
    return !!max && firstDayNextBlock.getTime() > max.getTime();
  }
  /** Page the visible month(s) to a new anchor. Does not touch the focused day. */
  setViewAnchor(date) {
    const min = parseIsoDate(this.min);
    const max = parseIsoDate(this.max);
    this.viewAnchor = clampDate(date, min, max);
  }
  handleTitleClick() {
    if (this.disabled) return;
    if (this.view === "days") {
      this.setView("months");
      this.queueFocus('[part~="view-item"][tabindex="0"]');
    } else if (this.view === "months") {
      this.setView("years");
      this.queueFocus('[part~="view-item"][tabindex="0"]');
    } else {
      this.setView("days");
      this.queueFocus('[part~="day"][tabindex="0"]');
    }
  }
  /**
   * Keyboard handler on the title button. Arrow keys teleport focus into the appropriate grid,
   * landing on the focused/selected item. Enter/Space is handled by the native button click.
   */
  handleTitleKeydown(event) {
    if (this.disabled) return;
    const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!arrowKeys.includes(event.key)) return;
    event.preventDefault();
    if (this.view === "days") {
      this.queueFocus('[part~="day"][tabindex="0"]');
    } else if (this.view === "months") {
      this.queueFocus('[part~="view-item"][tabindex="0"]');
    } else {
      this.queueFocus('[part~="view-item"][tabindex="0"]');
    }
  }
  setView(view) {
    if (this.view === view) return;
    const previous = this.view;
    this.view = view;
    if (view === "months") {
      if (previous === "days") {
        this.focusedMonth = this.resolvedFocusedDate().getMonth();
      }
    } else if (view === "years") {
      this.focusedYear = this.resolvedViewAnchor().getFullYear();
    } else {
      this.focusedMonth = null;
      this.focusedYear = null;
    }
    this.dispatchEvent(new WaViewChangeEvent({ view, date: this.resolvedFocusedDate() }));
  }
  //
  // Selection handlers
  //
  handleDayClick(date, isDisabled) {
    if (this.disabled || this.readonly || isDisabled) return;
    if (this.mode === "single" && !this.isInVisibleRange(date)) {
      const min = parseIsoDate(this.min);
      const max = parseIsoDate(this.max);
      this.viewAnchor = clampDate(new Date(date.getFullYear(), date.getMonth(), 1), min, max);
    }
    if (this.mode === "single") {
      const next2 = formatIsoDate(date);
      if (next2 !== this._value) {
        this._value = next2;
        this.focusedDate = next2;
        this.requestUpdate();
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        this.announceSelection();
      }
      return;
    }
    if (!this.rangeAnchor) {
      this.rangeCommittedValue = this._value;
      this.rangeAnchor = date;
      this.hoverDate = date;
      this.liveAnnouncement = "";
      this._value = formatIsoDate(date);
      this.focusedDate = this._value;
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      return;
    }
    const a = this.rangeAnchor;
    const b = date;
    const from = a.getTime() <= b.getTime() ? a : b;
    const to = a.getTime() <= b.getTime() ? b : a;
    const lengthDays = Math.round((to.getTime() - from.getTime()) / 864e5) + 1;
    if (this.maxRange > 0 && lengthDays > this.maxRange) {
      this.rangeAnchor = null;
      this.hoverDate = null;
      const restored = this.rangeCommittedValue;
      this.rangeCommittedValue = "";
      this.liveAnnouncement = "";
      if (restored !== this._value) {
        this._value = restored;
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      }
      return;
    }
    if (this.minRange > 0 && lengthDays < this.minRange) {
      this.announce(this.localize.term("rangeTooShort", this.minRange));
      return;
    }
    const next = formatRange({ from, to });
    this.rangeAnchor = null;
    this.hoverDate = null;
    this.rangeCommittedValue = "";
    this.liveAnnouncement = "";
    this._value = next;
    this.focusedDate = formatIsoDate(to);
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.announceSelection();
  }
  /**
   * Updates the `aria-live` region. A trailing toggle of a zero-width space guarantees the
   * text differs from the previous announcement, so a repeated rejection is re-announced.
   */
  announce(message) {
    const refresh = "\u200B";
    this.liveAnnouncement = this.liveAnnouncement.endsWith(refresh) ? message : message + refresh;
  }
  /**
   * Announces the committed selection through the live region so screen reader users actually hear what's selected. In
   * range mode, the whole span at once. Fires on commit only (mirroring the `change` event), so the first click of a
   * range and hover previews don't spam the region. Range spans are formatted as "<start> – <end>" with a locale-aware
   * date formatter (e.g. "May 11, 2026 – May 18, 2026").
   */
  announceSelection() {
    const locale = this.resolvedLocale();
    if (this.mode === "range") {
      const { from, to } = parseRange(this._value);
      if (!from && !to) {
        this.announce(this.localize.term("selectionCleared"));
        return;
      }
      const fmt = new Intl.DateTimeFormat(locale, { month: "long", day: "numeric", year: "numeric" });
      const range = from && to ? `${fmt.format(from)} \u2013 ${fmt.format(to)}` : fmt.format(from ?? to);
      this.announce(this.localize.term("selectedRangeLabel", range));
      return;
    }
    const value = parseIsoDate(this._value);
    if (!value) {
      this.announce(this.localize.term("selectionCleared"));
      return;
    }
    const dateText = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(value);
    this.announce(this.localize.term("selectedDateLabel", dateText));
  }
  handleDayHover(date) {
    if (this.mode !== "range") return;
    if (!this.rangeAnchor) return;
    const clamped = this.clampHoverDate(date);
    if (this.hoverDate && isSameDay(this.hoverDate, clamped)) return;
    this.hoverDate = clamped;
    this.dispatchEvent(new WaFocusDayEvent({ date: clamped }));
  }
  /**
   * Clamp a hovered date so the previewed range stays inside [min, max] and respects
   * minRange/maxRange relative to the current anchor.
   */
  clampHoverDate(date) {
    let next = clampDate(date, parseIsoDate(this.min), parseIsoDate(this.max));
    if (!this.rangeAnchor) return next;
    const anchor = this.rangeAnchor;
    const direction = next.getTime() >= anchor.getTime() ? 1 : -1;
    if (this.maxRange > 0) {
      const maxOffset = (this.maxRange - 1) * direction;
      const maxEdge = addDays(anchor, maxOffset);
      if (direction > 0 && next.getTime() > maxEdge.getTime()) next = maxEdge;
      if (direction < 0 && next.getTime() < maxEdge.getTime()) next = maxEdge;
    }
    if (this.minRange > 0) {
      const minOffset = (this.minRange - 1) * direction;
      const minEdge = addDays(anchor, minOffset);
      if (direction > 0 && next.getTime() < minEdge.getTime()) next = minEdge;
      if (direction < 0 && next.getTime() > minEdge.getTime()) next = minEdge;
    }
    return clampDate(next, parseIsoDate(this.min), parseIsoDate(this.max));
  }
  /**
   * During an in-progress range, a day is "out of reach" when picking it as the second endpoint
   * would violate maxRange. (minRange doesn't restrict where the user can hover — it just extends
   * the preview to a valid length.) Used to suppress hover styling on unreachable cells.
   */
  isOutOfReach(date) {
    if (this.mode !== "range" || !this.rangeAnchor || this.maxRange <= 0) return false;
    const span = Math.abs(Math.round((date.getTime() - this.rangeAnchor.getTime()) / 864e5)) + 1;
    return span > this.maxRange;
  }
  handleEscape() {
    if (this.mode === "range" && this.rangeAnchor) {
      this.rangeAnchor = null;
      this.hoverDate = null;
      const restored = this.rangeCommittedValue;
      this.rangeCommittedValue = "";
      if (restored !== this._value) {
        this._value = restored;
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      }
    }
  }
  //
  // Keyboard navigation
  //
  handleDayKeydown(event, current, isDisabled) {
    if (this.disabled) return;
    const keys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "PageUp",
      "PageDown",
      "Enter",
      " ",
      "Escape"
    ];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Escape") {
      this.handleEscape();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      this.handleDayClick(current, isDisabled);
      return;
    }
    const isRtl = this.localize.dir() === "rtl";
    let next = current;
    switch (event.key) {
      case "ArrowLeft":
        next = addDays(current, isRtl ? 1 : -1);
        break;
      case "ArrowRight":
        next = addDays(current, isRtl ? -1 : 1);
        break;
      case "ArrowUp":
        next = addDays(current, -7);
        break;
      case "ArrowDown":
        next = addDays(current, 7);
        break;
      case "Home": {
        const firstDay = this.resolvedFirstDay();
        const offset = (current.getDay() - firstDay + 7) % 7;
        next = addDays(current, -offset);
        break;
      }
      case "End": {
        const firstDay = this.resolvedFirstDay();
        const offset = 6 - (current.getDay() - firstDay + 7) % 7;
        next = addDays(current, offset);
        break;
      }
      case "PageUp":
        next = event.shiftKey ? addYears(current, -1) : addMonths(current, -1);
        break;
      case "PageDown":
        next = event.shiftKey ? addYears(current, 1) : addMonths(current, 1);
        break;
    }
    const min = parseIsoDate(this.min);
    const max = parseIsoDate(this.max);
    next = clampDate(next, min, max);
    this.focusedDate = formatIsoDate(next);
    if (!this.isInVisibleRange(next)) {
      this.viewAnchor = new Date(next.getFullYear(), next.getMonth(), 1);
    }
    this.dispatchEvent(new WaFocusDayEvent({ date: next }));
    this.updateComplete.then(() => {
      const btn = this.base.querySelector(`[data-date="${formatIsoDate(next)}"]`);
      btn?.focus();
    });
    if (this.mode === "range" && this.rangeAnchor) {
      this.hoverDate = next;
    }
  }
  //
  // Rendering
  //
  render() {
    const anchor = this.resolvedViewAnchor();
    const isDisabled = this.buildDisabledChecker();
    const locale = this.resolvedLocale();
    return html`
      <div part="base" @mouseleave=${this.handleGridMouseLeave}>
        <slot name="header"> ${this.renderHeader(anchor, isDisabled)} </slot>

        ${this.view === "days" ? this.renderDaysView(anchor, isDisabled, locale) : this.view === "months" ? this.renderMonthsView(anchor, isDisabled, locale) : this.renderYearsView(anchor, isDisabled)}

        <slot name="footer" part="footer"></slot>

        <span class="visually-hidden" aria-live="polite">${this.liveAnnouncement}</span>
      </div>
    `;
  }
  renderHeader(focused, _isDisabled) {
    const locale = this.resolvedLocale();
    const min = parseIsoDate(this.min);
    const max = parseIsoDate(this.max);
    let titleText = "";
    let titleLabel = "";
    if (this.view === "days") {
      const multiMonth = this.resolvedMonthCount() > 1;
      titleText = new Intl.DateTimeFormat(locale, {
        month: multiMonth ? void 0 : "long",
        year: "numeric"
      }).format(focused);
      titleLabel = this.localize.term("chooseMonth");
    } else if (this.view === "months") {
      titleText = new Intl.DateTimeFormat(locale, { year: "numeric" }).format(focused);
      titleLabel = this.localize.term("chooseYear");
    } else {
      const startYear = Math.floor(focused.getFullYear() / 12) * 12;
      titleText = `${startYear} \u2013 ${startYear + 11}`;
      titleLabel = this.localize.term("chooseDecade");
    }
    const previousDisabled = !!min && this.isPageOutsideRange("previous", focused, min, max);
    const nextDisabled = !!max && this.isPageOutsideRange("next", focused, min, max);
    const previousLabel = this.view === "days" ? this.localize.term("previousMonth") || "Previous month" : this.view === "months" ? this.localize.term("previousYear") || "Previous year" : this.localize.term("previousDecade") || "Previous decade";
    const nextLabel = this.view === "days" ? this.localize.term("nextMonth") || "Next month" : this.view === "months" ? this.localize.term("nextYear") || "Next year" : this.localize.term("nextDecade") || "Next decade";
    return html`
      <div part="header">
        <button
          type="button"
          part="previous"
          aria-label=${previousLabel}
          ?disabled=${previousDisabled || this.disabled}
          @click=${this.handlePrevious}
        >
          <slot name="previous-icon">
            <wa-icon name="chevron-left" library="system" variant="solid"></wa-icon>
          </slot>
        </button>

        <button
          type="button"
          part="title"
          aria-live="polite"
          aria-label=${titleLabel}
          ?disabled=${this.disabled}
          @click=${this.handleTitleClick}
          @keydown=${this.handleTitleKeydown}
        >
          ${titleText}
        </button>

        <button
          type="button"
          part="next"
          aria-label=${nextLabel}
          ?disabled=${nextDisabled || this.disabled}
          @click=${this.handleNext}
        >
          <slot name="next-icon">
            <wa-icon name="chevron-right" library="system" variant="solid"></wa-icon>
          </slot>
        </button>
      </div>
    `;
  }
  renderDaysView(focused, isDisabled, locale) {
    let monthCount = this.resolvedMonthCount();
    if (this.didSSR && !this.hasUpdated) {
      const count = this.shadowRoot?.querySelector?.("[part~='months']")?.getAttribute("data-month-count");
      if (count) {
        monthCount = this.resolvedMonthCount(Number(count));
      }
    }
    return html`
      <div part="months" data-month-count="${monthCount}">
        ${Array.from(
      { length: monthCount },
      (_, i) => this.renderMonth(addMonths(focused, i), isDisabled, locale, monthCount > 1)
    )}
      </div>
    `;
  }
  renderMonth(visibleMonth, isDisabled, locale, showLabel) {
    const firstDay = this.resolvedFirstDay();
    const weekend = new Set(this.resolvedWeekendDays());
    const monthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const leadingOffset = (monthStart.getDay() - firstDay + 7) % 7;
    const gridStart = addDays(monthStart, -leadingOffset);
    const totalCells = 42;
    const weeks = [];
    for (let w = 0; w < totalCells / 7; w++) {
      const row = [];
      for (let d = 0; d < 7; d++) {
        row.push(addDays(gridStart, w * 7 + d));
      }
      weeks.push(row);
    }
    const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: this.weekdayFormat });
    const weekdayCells = [];
    for (let i = 0; i < 7; i++) {
      const sample = addDays(gridStart, i);
      weekdayCells.push({
        label: weekdayFmt.format(sample),
        long: new Intl.DateTimeFormat(locale, { weekday: "long" }).format(sample)
      });
    }
    const monthLabelFmt = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
    const monthLabel = this.readonly ? `${monthLabelFmt.format(visibleMonth)}, ${this.localize.term("readonly")}` : monthLabelFmt.format(visibleMonth);
    return html`
      <div part="month" data-first-day="${firstDay}" data-weekend-days="${[...weekend.values()].join(" ")}">
        ${showLabel ? html`<div part="month-label">${monthLabelFmt.format(visibleMonth)}</div>` : nothing}
        <table part="grid" role="grid" aria-label=${monthLabel} aria-readonly=${this.readonly ? "true" : "false"}>
          <thead>
            <tr part="weekdays">
              ${this.withWeekNumbers ? html`<th part="weeknumbers" scope="col" aria-label="Week"></th>` : nothing}
              ${weekdayCells.map((w) => html`<th part="weekday" scope="col" aria-label=${w.long}>${w.label}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${weeks.map((row) => this.renderWeek(row, visibleMonth, isDisabled, weekend, locale))}
          </tbody>
        </table>
      </div>
    `;
  }
  renderWeek(row, visibleMonth, isDisabled, weekend, locale) {
    const weekNumber = this.withWeekNumbers ? this.computeIsoWeek(row) : null;
    return html`
      <tr role="row">
        ${weekNumber !== null ? html`<th part="weeknumber" scope="row">${weekNumber}</th>` : nothing}
        ${row.map((date) => this.renderDay(date, visibleMonth, isDisabled, weekend, locale))}
      </tr>
    `;
  }
  computeIsoWeek(row) {
    const thursday = row.find((d) => d.getDay() === 4) ?? row[3];
    const target = new Date(thursday.getFullYear(), thursday.getMonth(), thursday.getDate());
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const firstDayNum = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstDayNum + 3);
    const dayNum = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNum + 3);
    return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 864e5));
  }
  renderDay(date, visibleMonth, isDisabled, weekend, locale) {
    void locale;
    const outside = !isSameMonth(date, visibleMonth);
    const renderedOutside = outside && !this.withOutsideDays;
    const iso = formatIsoDate(date);
    const todayDate = this.resolvedToday();
    const isToday = isSameDay(date, todayDate);
    const disabled = isDisabled(date);
    const roving = this.resolvedRovingFocus();
    const isFocused = isSameDay(date, roving) && !outside;
    const selection = this.computeSelectionState(date);
    const outOfReach = this.isOutOfReach(date);
    const slotName = `day-${iso}`;
    const tdAttrs = {
      "data-in-range": selection.inner || selection.preview || selection.start || selection.end ? "" : void 0,
      "data-range-start": selection.start ? "" : void 0,
      "data-range-end": selection.end ? "" : void 0
    };
    if (renderedOutside) {
      return html`<td role="gridcell" aria-hidden="true"><span part="day-placeholder"></span></td>`;
    }
    const dayParts = ["day"];
    if (isToday) dayParts.push("day-today");
    if (outside) dayParts.push("day-outside");
    if (weekend.has(date.getDay())) dayParts.push("day-weekend");
    if (disabled) dayParts.push("day-disabled");
    if (selection.selected) dayParts.push("day-selected");
    if (selection.start) dayParts.push("day-range-start");
    if (selection.end) dayParts.push("day-range-end");
    if (selection.inner) dayParts.push("day-range-inner");
    if (selection.preview) dayParts.push("day-range-preview");
    return html`
      <td
        role="gridcell"
        aria-selected=${selection.selected ? "true" : "false"}
        data-in-range=${ifDefined(tdAttrs["data-in-range"])}
        data-range-start=${ifDefined(tdAttrs["data-range-start"])}
        data-range-end=${ifDefined(tdAttrs["data-range-end"])}
      >
        <button
          type="button"
          part=${dayParts.join(" ")}
          data-date=${iso}
          data-day-of-week=${["sun", "mon", "tue", "wed", "thu", "fri", "sat"][date.getDay()]}
          ?data-today=${isToday}
          ?data-outside=${outside}
          ?data-weekend=${weekend.has(date.getDay())}
          ?data-disabled=${disabled}
          ?data-selected=${selection.selected}
          ?data-range-start=${selection.start}
          ?data-range-end=${selection.end}
          ?data-range-inner=${selection.inner}
          ?data-range-preview=${selection.preview}
          ?data-out-of-reach=${outOfReach}
          aria-label=${this.dayAriaLabel(date, selection, isToday)}
          aria-disabled=${disabled ? "true" : "false"}
          aria-current=${ifDefined(isToday ? "date" : void 0)}
          tabindex=${isFocused ? 0 : -1}
          @click=${() => this.handleDayClick(date, disabled)}
          @mouseenter=${() => this.handleDayHover(date)}
          @keydown=${(e) => this.handleDayKeydown(e, date, disabled)}
        >
          <span part="day-label">
            <slot name=${slotName}>${this.renderDayFallback(date)}</slot>
          </span>
        </button>
      </td>
    `;
  }
  /**
   * Builds the accessible name for a day cell. Beyond the bare day number, screen reader users need the full date so the
   * selection is actually readable — without it, focusing a day announces only "11", never "Saturday, May 16, 2026". In
   * the Shadow DOM with per-cell buttons we can't lean on the APG `<th abbr>` column-header technique to supply the
   * weekday "for free," so we spell out the full date here. Range membership is conveyed via `aria-selected` on the cell
   * (endpoints) plus the live-region announcement on commit, so we deliberately keep range-role text out of the name.
   */
  dayAriaLabel(date, selection, isToday) {
    const locale = this.resolvedLocale();
    const parts = [
      new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(date)
    ];
    if (isToday) parts.push(this.localize.term("today"));
    if (this.mode === "single" && selection.selected) parts.push(this.localize.term("selected"));
    return parts.join(", ");
  }
  renderDayFallback(date) {
    if (this.dayContent) {
      const result = this.dayContent(date);
      if (result != null) {
        return typeof result === "string" ? unsafeHTML(result) : result;
      }
    }
    return date.getDate();
  }
  /** Compute the per-cell selection / range state for styling and a11y. */
  computeSelectionState(date) {
    if (this.mode === "single") {
      const v = parseIsoDate(this._value);
      return {
        selected: !!v && isSameDay(v, date),
        start: false,
        end: false,
        inner: false,
        preview: false
      };
    }
    if (this.rangeAnchor) {
      const hover = this.hoverDate ?? this.rangeAnchor;
      const a = this.rangeAnchor;
      const previewFrom = a.getTime() <= hover.getTime() ? a : hover;
      const previewTo = a.getTime() <= hover.getTime() ? hover : a;
      const start2 = isSameDay(previewFrom, date);
      const end2 = isSameDay(previewTo, date);
      const preview = date.getTime() > previewFrom.getTime() && date.getTime() < previewTo.getTime();
      return { selected: start2 || end2, start: start2, end: end2, inner: false, preview };
    }
    const { from, to } = parseRange(this._value);
    const start = !!from && isSameDay(from, date);
    const end = !!to && isSameDay(to, date);
    const inner = !!from && !!to && date.getTime() > from.getTime() && date.getTime() < to.getTime();
    return { selected: start || end, start, end, inner, preview: false };
  }
  //
  // Months / Years view
  //
  /** Selected month for highlighting in the months sub-view (derived from `_value`, falling back to focus). */
  selectedMonthForView(year) {
    const selectedDate = this.selectedDateForHighlight();
    if (!selectedDate) return null;
    return selectedDate.getFullYear() === year ? selectedDate.getMonth() : null;
  }
  /** Selected year for highlighting in the years sub-view. */
  selectedYearForView() {
    const selectedDate = this.selectedDateForHighlight();
    return selectedDate ? selectedDate.getFullYear() : null;
  }
  /** The "primary" selected date (for `aria-selected` in the views). Single mode: value. Range mode: from. */
  selectedDateForHighlight() {
    if (this.mode === "single") return parseIsoDate(this._value);
    const range = parseRange(this._value);
    return range.from;
  }
  renderMonthsView(viewAnchor, isDisabled, locale) {
    const year = viewAnchor.getFullYear();
    const monthFmt = new Intl.DateTimeFormat(locale, { month: "short" });
    const longFmt = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
    const yearLabel = new Intl.DateTimeFormat(locale, { year: "numeric" }).format(viewAnchor);
    const focusedMonth = this.resolvedFocusedMonth();
    const selectedMonth = this.selectedMonthForView(year);
    const todayDate = this.resolvedToday();
    const todayMonth = todayDate.getFullYear() === year ? todayDate.getMonth() : -1;
    const renderMonth = (i) => {
      const sample = new Date(year, i, 1);
      const monthDisabled = this.isMonthFullyDisabled(year, i, isDisabled);
      const isSelected = selectedMonth === i;
      const isFocused = focusedMonth === i;
      const isToday = todayMonth === i;
      const itemParts = ["view-item"];
      if (isToday) itemParts.push("view-item-today");
      if (isSelected) itemParts.push("view-item-selected");
      if (monthDisabled) itemParts.push("view-item-disabled");
      return html`
        <div role="gridcell" part="view-cell" aria-selected=${isSelected ? "true" : "false"}>
          <button
            type="button"
            part=${itemParts.join(" ")}
            data-month=${i}
            ?data-disabled=${monthDisabled}
            ?data-selected=${isSelected}
            ?data-today=${isToday}
            aria-disabled=${monthDisabled ? "true" : "false"}
            aria-current=${ifDefined(isToday ? "date" : void 0)}
            aria-label=${longFmt.format(sample)}
            tabindex=${isFocused ? 0 : -1}
            @click=${() => this.handleMonthPick(year, i, monthDisabled)}
            @keydown=${(e) => this.handleMonthKeydown(e, year, i, monthDisabled)}
          >
            ${monthFmt.format(sample)}
          </button>
        </div>
      `;
    };
    return html`
      <div part="view-grid" role="grid" aria-label="${this.localize.term("chooseMonth")}, ${yearLabel}">
        ${this.renderViewRows(12, renderMonth)}
      </div>
    `;
  }
  /**
   * Wrap a flat list of `gridcell` items into `role="row"` groups of 3, satisfying the WAI-ARIA grid
   * structure (`grid` → `row` → `gridcell`). Each row uses `display: contents` so it stays transparent
   * to the `view-grid`'s CSS Grid layout.
   */
  renderViewRows(count, renderItem) {
    const columns = 3;
    const rows = [];
    for (let start = 0; start < count; start += columns) {
      const cells = Array.from({ length: Math.min(columns, count - start) }, (_, c) => renderItem(start + c));
      rows.push(html`<div part="view-row" role="row">${cells}</div>`);
    }
    return rows;
  }
  renderYearsView(viewAnchor, isDisabled) {
    const startYear = Math.floor(viewAnchor.getFullYear() / 12) * 12;
    const endYear = startYear + 11;
    const focusedYear = this.resolvedFocusedYear();
    const selectedYear = this.selectedYearForView();
    const todayYear = this.resolvedToday().getFullYear();
    const renderYear = (i) => {
      const year = startYear + i;
      const yearDisabled = this.isYearFullyDisabled(year, isDisabled);
      const isSelected = selectedYear === year;
      const isFocused = focusedYear === year;
      const isToday = todayYear === year;
      const itemParts = ["view-item"];
      if (isToday) itemParts.push("view-item-today");
      if (isSelected) itemParts.push("view-item-selected");
      if (yearDisabled) itemParts.push("view-item-disabled");
      return html`
        <div role="gridcell" part="view-cell" aria-selected=${isSelected ? "true" : "false"}>
          <button
            type="button"
            part=${itemParts.join(" ")}
            data-year=${year}
            ?data-disabled=${yearDisabled}
            ?data-selected=${isSelected}
            ?data-today=${isToday}
            aria-disabled=${yearDisabled ? "true" : "false"}
            aria-current=${ifDefined(isToday ? "date" : void 0)}
            aria-label=${String(year)}
            tabindex=${isFocused ? 0 : -1}
            @click=${() => this.handleYearPick(year, yearDisabled)}
            @keydown=${(e) => this.handleYearKeydown(e, year, yearDisabled)}
          >
            ${year}
          </button>
        </div>
      `;
    };
    return html`
      <div
        part="view-grid"
        role="grid"
        aria-label="${this.localize.term("chooseYear")}, ${startYear}–${endYear}"
      >
        ${this.renderViewRows(12, renderYear)}
      </div>
    `;
  }
  //
  // Months view keyboard
  //
  handleMonthKeydown(event, year, month, disabled) {
    if (this.disabled) return;
    const keys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "PageUp",
      "PageDown",
      "Enter",
      " ",
      "Escape"
    ];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Escape") {
      this.setView("days");
      this.queueFocus('[part~="day"][tabindex="0"]');
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      this.handleMonthPick(year, month, disabled);
      return;
    }
    const isRtl = this.localize.dir() === "rtl";
    let nextYear = year;
    let nextMonth = month;
    switch (event.key) {
      case "ArrowLeft":
        nextMonth = month + (isRtl ? 1 : -1);
        if (nextMonth < 0) nextMonth = 0;
        if (nextMonth > 11) nextMonth = 11;
        break;
      case "ArrowRight":
        nextMonth = month + (isRtl ? -1 : 1);
        if (nextMonth < 0) nextMonth = 0;
        if (nextMonth > 11) nextMonth = 11;
        break;
      case "ArrowUp":
        nextMonth = Math.max(0, month - 3);
        break;
      case "ArrowDown":
        nextMonth = Math.min(11, month + 3);
        break;
      case "Home": {
        const rowStart = Math.floor(month / 3) * 3;
        nextMonth = event.ctrlKey || event.metaKey ? 0 : rowStart;
        break;
      }
      case "End": {
        const rowEnd = Math.floor(month / 3) * 3 + 2;
        nextMonth = event.ctrlKey || event.metaKey ? 11 : rowEnd;
        break;
      }
      case "PageUp":
        nextYear = year - 1;
        break;
      case "PageDown":
        nextYear = year + 1;
        break;
    }
    if (nextYear !== year) {
      this.setViewAnchor(new Date(nextYear, month, 1));
    }
    this.focusedMonth = nextMonth;
    this.queueFocus(`[part~="view-item"][data-month="${nextMonth}"]`);
  }
  //
  // Years view keyboard
  //
  handleYearKeydown(event, year, disabled) {
    if (this.disabled) return;
    const keys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "PageUp",
      "PageDown",
      "Enter",
      " ",
      "Escape"
    ];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Escape") {
      this.setView("months");
      this.queueFocus('[part~="view-item"][tabindex="0"]');
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      this.handleYearPick(year, disabled);
      return;
    }
    const isRtl = this.localize.dir() === "rtl";
    const startYear = Math.floor(year / 12) * 12;
    const positionInPage = year - startYear;
    let nextYear = year;
    switch (event.key) {
      case "ArrowLeft":
        nextYear = year + (isRtl ? 1 : -1);
        break;
      case "ArrowRight":
        nextYear = year + (isRtl ? -1 : 1);
        break;
      case "ArrowUp":
        nextYear = year - 3;
        break;
      case "ArrowDown":
        nextYear = year + 3;
        break;
      case "Home": {
        const rowStart = startYear + Math.floor(positionInPage / 3) * 3;
        nextYear = event.ctrlKey || event.metaKey ? startYear : rowStart;
        break;
      }
      case "End": {
        const rowEnd = startYear + Math.floor(positionInPage / 3) * 3 + 2;
        nextYear = event.ctrlKey || event.metaKey ? startYear + 11 : rowEnd;
        break;
      }
      case "PageUp":
        nextYear = year - 12;
        break;
      case "PageDown":
        nextYear = year + 12;
        break;
    }
    const nextStart = Math.floor(nextYear / 12) * 12;
    if (nextStart !== startYear) {
      const anchor = this.resolvedViewAnchor();
      this.setViewAnchor(new Date(nextYear, anchor.getMonth(), 1));
    }
    this.focusedYear = nextYear;
    this.queueFocus(`[part~="view-item"][data-year="${nextYear}"]`);
  }
  /** Re-focus a child element after the next render cycle. */
  queueFocus(selector) {
    this.updateComplete.then(() => {
      const el = this.base.querySelector(selector);
      el?.focus();
    });
  }
  isMonthFullyDisabled(year, month, isDisabled) {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    return !this.anyEnabledInRange(start, end, isDisabled);
  }
  isYearFullyDisabled(year, isDisabled) {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    return !this.anyEnabledInRange(start, end, isDisabled);
  }
  anyEnabledInRange(start, end, isDisabled) {
    const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    while (cursor.getTime() <= end.getTime()) {
      if (!isDisabled(cursor)) return true;
      cursor.setDate(cursor.getDate() + 1);
    }
    return false;
  }
  handleMonthPick(year, month, disabled) {
    if (disabled || this.disabled) return;
    this.setViewAnchor(new Date(year, month, 1));
    const previousDay = this.resolvedFocusedDate().getDate();
    const clampedDay = Math.min(previousDay, daysInMonth(year, month));
    this.focusedDate = formatIsoDate(new Date(year, month, clampedDay));
    this.setView("days");
    this.queueFocus('[part~="day"][tabindex="0"]');
  }
  handleYearPick(year, disabled) {
    if (disabled || this.disabled) return;
    const previous = this.resolvedFocusedDate();
    const month = previous.getMonth();
    this.setViewAnchor(new Date(year, month, 1));
    const clampedDay = Math.min(previous.getDate(), daysInMonth(year, month));
    this.focusedDate = formatIsoDate(new Date(year, month, clampedDay));
    this.setView("months");
    this.queueFocus('[part~="view-item"][tabindex="0"]');
  }
};
WaDatePicker.css = [date_picker_styles_default, size_styles_default];
__decorateClass([
  query('[part~="base"]')
], WaDatePicker.prototype, "base", 2);
__decorateClass([
  property({ reflect: true })
], WaDatePicker.prototype, "mode", 2);
__decorateClass([
  property({ reflect: true })
], WaDatePicker.prototype, "value", 1);
__decorateClass([
  property({ reflect: true })
], WaDatePicker.prototype, "min", 2);
__decorateClass([
  property({ reflect: true })
], WaDatePicker.prototype, "max", 2);
__decorateClass([
  property({ reflect: true })
], WaDatePicker.prototype, "today", 2);
__decorateClass([
  property({ attribute: "focused-date", reflect: true })
], WaDatePicker.prototype, "focusedDate", 2);
__decorateClass([
  property({ reflect: true })
], WaDatePicker.prototype, "view", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], WaDatePicker.prototype, "months", 2);
__decorateClass([
  property({ attribute: "page-by", reflect: true })
], WaDatePicker.prototype, "pageBy", 2);
__decorateClass([
  property({ attribute: "first-day-of-week", reflect: true })
], WaDatePicker.prototype, "firstDayOfWeek", 2);
__decorateClass([
  property({ attribute: "with-outside-days", type: Boolean, reflect: true })
], WaDatePicker.prototype, "withOutsideDays", 2);
__decorateClass([
  property({ attribute: "with-week-numbers", type: Boolean, reflect: true })
], WaDatePicker.prototype, "withWeekNumbers", 2);
__decorateClass([
  property({ attribute: "weekday-format", reflect: true })
], WaDatePicker.prototype, "weekdayFormat", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaDatePicker.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaDatePicker.prototype, "readonly", 2);
__decorateClass([
  property({ attribute: "disabled-dates" })
], WaDatePicker.prototype, "disabledDates", 1);
__decorateClass([
  property({ attribute: "disabled-days-of-week" })
], WaDatePicker.prototype, "disabledDaysOfWeek", 2);
__decorateClass([
  property({ attribute: "disable-past", type: Boolean, reflect: true })
], WaDatePicker.prototype, "disablePast", 2);
__decorateClass([
  property({ attribute: "disable-future", type: Boolean, reflect: true })
], WaDatePicker.prototype, "disableFuture", 2);
__decorateClass([
  property({ attribute: "min-range", type: Number, reflect: true })
], WaDatePicker.prototype, "minRange", 2);
__decorateClass([
  property({ attribute: "max-range", type: Number, reflect: true })
], WaDatePicker.prototype, "maxRange", 2);
__decorateClass([
  property({ reflect: true })
], WaDatePicker.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaDatePicker.prototype, "handleSizeChange", 1);
__decorateClass([
  property({ reflect: true })
], WaDatePicker.prototype, "locale", 2);
__decorateClass([
  property({ attribute: false })
], WaDatePicker.prototype, "isDateDisabled", 2);
__decorateClass([
  property({ attribute: false })
], WaDatePicker.prototype, "dayContent", 2);
__decorateClass([
  state()
], WaDatePicker.prototype, "rangeAnchor", 2);
__decorateClass([
  state()
], WaDatePicker.prototype, "hoverDate", 2);
__decorateClass([
  state()
], WaDatePicker.prototype, "viewAnchor", 2);
__decorateClass([
  state()
], WaDatePicker.prototype, "focusedMonth", 2);
__decorateClass([
  state()
], WaDatePicker.prototype, "focusedYear", 2);
__decorateClass([
  state()
], WaDatePicker.prototype, "liveAnnouncement", 2);
__decorateClass([
  watch("mode")
], WaDatePicker.prototype, "handleModeChange", 1);
WaDatePicker = __decorateClass([
  customElement("wa-date-picker")
], WaDatePicker);

export {
  WaDatePicker
};
