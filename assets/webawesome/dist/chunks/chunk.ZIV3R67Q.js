/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  MinMaxDateValidator
} from "./chunk.AHK46OHH.js";
import {
  parsePastedDate,
  parsePastedRange
} from "./chunk.4U5URNF6.js";
import {
  bufferToValue,
  buildSegmentLayout,
  clampDay,
  formatSegmentText,
  isEmpty,
  isoToSegments,
  rangeIsoToSegments,
  segmentBounds,
  segmentsToIso,
  segmentsToRangeIso,
  step,
  typeDigit
} from "./chunk.GE3JDILO.js";
import {
  SegmentedFieldController
} from "./chunk.CNL6XLC6.js";
import {
  date_input_styles_default
} from "./chunk.T6XNQKT3.js";
import {
  formatIsoDate,
  parseIsoDate,
  parseRange
} from "./chunk.4RAXYMTU.js";
import {
  WaShowEvent
} from "./chunk.OCXPLMDW.js";
import {
  WaHideEvent
} from "./chunk.ADZNIDEZ.js";
import {
  WaAfterHideEvent
} from "./chunk.IXFCHTNQ.js";
import {
  WaAfterShowEvent
} from "./chunk.HOKX4ZNE.js";
import {
  WaClearEvent
} from "./chunk.V6242M3W.js";
import {
  isTopDismissible,
  registerDismissible,
  unregisterDismissible
} from "./chunk.EXBMUNXF.js";
import {
  RequiredValidator
} from "./chunk.X73BGBMJ.js";
import {
  form_control_styles_default
} from "./chunk.KTP2IKLN.js";
import {
  WebAwesomeFormAssociatedElement
} from "./chunk.GB3TYL3J.js";
import {
  warnDeprecatedSize
} from "./chunk.DLSTVVIL.js";
import {
  HasSlotController
} from "./chunk.5FXMXJDZ.js";
import {
  size_styles_default
} from "./chunk.ITHNGWNG.js";
import {
  waitForEvent
} from "./chunk.572W6XBT.js";
import {
  animateWithClass
} from "./chunk.ZRLIH7NU.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  LocalizeController
} from "./chunk.I5ZKJLBU.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/date-input/date-input.ts
import { html, isServer, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
var uniqueId = 0;
var generateId = () => `wa-date-input-${++uniqueId}`;
var WaDateInput = class extends WebAwesomeFormAssociatedElement {
  //
  // Lifecycle
  //
  constructor() {
    super();
    /**
     * Native `input` events do not fire on `role=spinbutton` elements (they aren't real `<input>`s). The component
     * dispatches a composed host `input` event on every segment edit, every step, and on calendar selection, so a
     * single `input` is enough to mark the field as interacted with.
     */
    this.assumeInteractionOn = ["input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.pendingValue = null;
    /** When true, the next `show()` will move focus into the calendar (set by Alt+ArrowDown). */
    this.moveFocusToCalendarOnShow = false;
    /** The last value that was emitted via a `change` event. Used to debounce duplicate transitions. */
    this.lastEmittedValue = "";
    /**
     * Generic segmented-field plumbing. Owns the per-segment digit buffer, roving tabindex, navigation keys
     * (arrows / Home / End / Tab flush / Backspace / Delete), and separator advance. Date-specific rules (per-field
     * digit semantics, stepping wraparound + day clamping, layout derivation) are passed in below.
     */
    this.segmentsController = new SegmentedFieldController(this, {
      getLayout: () => this.getLayout(),
      isRtl: () => this.isRtl,
      isReadonly: () => this.readonly,
      isDisabled: () => this.disabled,
      rules: {
        typeDigit: (group, field, buffer, digit) => {
          const result = typeDigit(field, buffer, digit);
          const segments = this.getGroupSegments(group);
          let next = { ...segments, [field]: result.value };
          if (field === "year" || field === "month") next = clampDay(next);
          this.setGroupSegments(group, next);
          return result;
        },
        step: (group, field, delta) => {
          const todayDate = this.today ? parseIsoDate(this.today) ?? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date();
          const next = step(this.getGroupSegments(group), field, delta, todayDate);
          this.setGroupSegments(group, next);
          return { value: next[field] };
        },
        bounds: (group, field) => segmentBounds(field, this.getGroupSegments(group)),
        commitBuffer: (group, field, buffer) => {
          const value = bufferToValue(buffer);
          const segments = this.getGroupSegments(group);
          let next = { ...segments, [field]: value };
          if (field === "year" || field === "month") next = clampDay(next);
          this.setGroupSegments(group, next);
          return value;
        },
        clear: (group, field) => {
          const segments = this.getGroupSegments(group);
          if (segments[field] == null) return false;
          this.setGroupSegments(group, { ...segments, [field]: null });
          return true;
        }
      },
      onCommit: () => {
        this.recomputeValue();
        this.requestUpdate();
      }
    });
    this.forwardedDaySlots = [];
    this.segments = { year: null, month: null, day: null };
    this.fromSegments = { year: null, month: null, day: null };
    this.toSegments = { year: null, month: null, day: null };
    this.name = "";
    this._value = "";
    this.defaultValue = this.getAttribute("value") ?? "";
    this.disabled = false;
    this.required = false;
    this.readonly = false;
    this.size = "m";
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.hint = "";
    this.autocomplete = "";
    this.withClear = false;
    this.withLabel = false;
    this.withHint = false;
    this.mode = "single";
    this.min = "";
    this.max = "";
    this.today = "";
    this.firstDayOfWeek = "auto";
    this.disabledDates = "";
    this.disabledDaysOfWeek = "";
    this.disablePast = false;
    this.disableFuture = false;
    this.minRange = 0;
    this.maxRange = 0;
    this.months = 1;
    this.pageBy = "months";
    this.withOutsideDays = false;
    this.withWeekNumbers = false;
    this.weekdayFormat = "short";
    this.open = false;
    this.placement = "bottom-start";
    this.distance = 0;
    this.handleDocumentFocusIn = (event) => {
      const path = event.composedPath();
      if (!path.includes(this)) {
        this.hide();
      }
    };
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.stopPropagation();
        event.preventDefault();
        this.calendar?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, composed: true }));
        this.hide();
      }
    };
    this.handleDocumentMouseDown = (event) => {
      const path = event.composedPath();
      if (!path.includes(this)) {
        this.hide();
      }
    };
    //
    // Segment input handlers
    //
    // The generic controller (`segmentsController`) handles arrows, navigation, separators, Backspace/Delete, Home/End,
    // and Tab flush. The host wraps that with popup-specific shortcuts (`Alt+ArrowDown/Up`, `Enter`). The popup opens
    // on a pointer click into the field but NOT when focus arrives via Tab, since that would interfere with tab order.
    this.handleSegmentFocus = (event) => {
      this.segmentsController.eventHandlers().focus(event);
    };
    this.handleSegmentBlur = (event) => {
      this.segmentsController.eventHandlers().blur(event);
    };
    this.handleInputWrapperPointerDown = (event) => {
      if (this.disabled || this.readonly || this.open) return;
      for (const node of event.composedPath()) {
        if (node === this) break;
        if (!(node instanceof Element)) continue;
        const tag = node.tagName;
        if (tag === "BUTTON" || tag === "A" || node.getAttribute("role") === "button") return;
      }
      this.show();
    };
    this.handleSegmentKeyDown = (event) => {
      const el = event.currentTarget;
      const group = el.dataset.group;
      const field = el.dataset.segment;
      if (event.altKey && event.key === "ArrowDown") {
        event.preventDefault();
        this.moveFocusToCalendarOnShow = true;
        if (this.open) {
          this.calendar?.focus({ preventScroll: true });
        } else {
          this.show();
        }
        return;
      }
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        this.hide();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (this.getBuffer(group, field)) {
          this.segmentsController.flushBuffer(group, field);
          this.recomputeValue();
        }
        if (this.open) this.hide();
        return;
      }
      this.segmentsController.eventHandlers().keydown(event);
    };
    /**
     * Paste path. Preserves the forgiving free-text parser. Pasting "January 23, 2026" into any segment fills the whole
     * group at once. This is the one place we keep `paste-parse.ts` wired to the editing UI.
     */
    this.handleSegmentPaste = (event) => {
      const text = event.clipboardData?.getData("text");
      if (!text) return;
      event.preventDefault();
      if (this.readonly) return;
      const el = event.currentTarget;
      const group = el.dataset.group;
      if (this.mode === "range") {
        const range = parsePastedRange(text, { locale: this.resolvedLocale, monthFormat: "2-digit" });
        if (range.from) {
          this.fromSegments = isoToSegments(formatIsoDate(range.from));
        }
        if (range.to) {
          this.toSegments = isoToSegments(formatIsoDate(range.to));
        } else if (range.from && !range.to && group === "to") {
          this.toSegments = isoToSegments(formatIsoDate(range.from));
          this.fromSegments = isoToSegments(this._value.split("/")[0] ?? null);
        }
      } else {
        const date = parsePastedDate(text, { locale: this.resolvedLocale, monthFormat: "2-digit" });
        if (date) this.segments = isoToSegments(formatIsoDate(date));
      }
      this.segmentsController.clearBuffers();
      this.recomputeValue();
      this.requestUpdate();
    };
    //
    // Other handlers
    //
    this.handleExpandButtonClick = () => {
      if (this.open) {
        this.hide();
      } else {
        this.moveFocusToCalendarOnShow = true;
        this.show();
      }
    };
    this.handleClearClick = (event) => {
      event.stopPropagation();
      this.clearValue();
    };
    this.handleClearMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    this.handleCalendarChange = (event) => {
      event.stopPropagation();
      const calendarValue = this.calendar.value;
      this._value = calendarValue;
      this.valueHasChanged = true;
      this.segmentsController.clearBuffers();
      this.syncSegmentsFromCanonical();
      this.requestUpdate();
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      if (calendarValue !== this.lastEmittedValue) {
        this.lastEmittedValue = calendarValue;
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      }
      const selectionComplete = this.mode === "range" ? calendarValue.includes("/") : !!calendarValue;
      if (selectionComplete && this.open) {
        this.hide();
      }
    };
    this.handleCalendarInput = (event) => {
      event.stopPropagation();
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    };
    /** Detect light-DOM children with `slot="day-YYYY-MM-DD"` and forward those slot names to the inner calendar. */
    this.handleDefaultSlotChange = () => {
      if (this.didSSR && !this.hasUpdated) {
        this.updateComplete.then(() => this.handleDefaultSlotChange());
        return;
      }
      this.updateForwardedDaySlots();
    };
    const existingPopupId = this.shadowRoot?.querySelector?.("[part~='popup']")?.id;
    this.popupId = existingPopupId || generateId();
    this.keyboardHelpId = `${this.popupId}-help`;
  }
  static get validators() {
    const validators = isServer ? [] : [
      RequiredValidator({
        validationElement: Object.assign(document.createElement("input"), { required: true })
      }),
      MinMaxDateValidator()
    ];
    return [...super.validators, ...validators];
  }
  /**
   * Localized term lookup. Falls back to the English string if a locale hasn't translated the key yet.
   */
  term(key, fallback) {
    return this.localize.term(key) || fallback;
  }
  get validationTarget() {
    return this.valueInput;
  }
  /**
   * The date input's value. ISO 8601 `YYYY-MM-DD` for single mode, `YYYY-MM-DD/YYYY-MM-DD` for range mode (with
   * `from <= to`). The setter also accepts a `Date` or a range object with `from` and `to` properties.
   */
  get value() {
    if (this.valueHasChanged) return this._value;
    return this._value || this.defaultValue || "";
  }
  set value(val) {
    const normalized = this.normalizeIncomingValue(val);
    if (normalized === this._value) return;
    const oldValue = this._value;
    this._value = normalized;
    this.valueHasChanged = true;
    if (this.hasUpdated) {
      this.syncSegmentsFromCanonical();
    } else {
      this.pendingValue = this._value;
    }
    this.requestUpdate("value", oldValue);
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeOpenListeners();
  }
  firstUpdated() {
    if (this.pendingValue != null) {
      this._value = this.pendingValue;
      this.pendingValue = null;
    } else if (!this._value && this.defaultValue) {
      this._value = this.defaultValue;
    }
    this.syncSegmentsFromCanonical();
    this.updateForwardedDaySlots();
    this.updateValidity();
    this.lastEmittedValue = this._value;
  }
  updated(changed) {
    super.updated?.(changed);
    if (changed.has("mode") || changed.has("value")) {
      this.customStates.set("blank", !this.value);
      this.customStates.set("range", this.mode === "range");
    }
    if (changed.has("open")) {
      this.customStates.set("open", this.open);
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.open = false;
    }
  }
  handleModeChange() {
    if (this.hasUpdated) {
      this.syncSegmentsFromCanonical();
    }
  }
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      const showEvent = new WaShowEvent();
      this.dispatchEvent(showEvent);
      if (showEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      this.addOpenListeners();
      this.popup.active = true;
      await this.updateComplete;
      await animateWithClass(this.popup.popup, "show");
      if (this.moveFocusToCalendarOnShow) {
        this.moveFocusToCalendarOnShow = false;
        this.calendar?.focus({ preventScroll: true });
      }
      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      const hideEvent = new WaHideEvent();
      this.dispatchEvent(hideEvent);
      if (hideEvent.defaultPrevented) {
        this.open = true;
        return;
      }
      this.removeOpenListeners();
      await animateWithClass(this.popup.popup, "hide");
      this.popup.active = false;
      this.dispatchEvent(new WaAfterHideEvent());
      const active = this.shadowRoot?.activeElement;
      if (active && this.popup?.contains(active)) {
        this.focusActiveSegment();
      }
    }
  }
  //
  // Public API
  //
  /** Sets focus on the first empty (else first) segment. */
  focus(options) {
    const target = this.segmentsController.findFocusableSegment(
      (g, f) => this.getGroupSegments(g)[f] == null
    );
    target?.focus(options);
  }
  /** Removes focus from the date input. */
  blur() {
    const active = this.shadowRoot?.activeElement;
    active?.blur();
  }
  /** Opens the popup calendar. */
  async show() {
    if (this.open || this.disabled) return;
    this.open = true;
    await waitForEvent(this, "wa-after-show");
  }
  /** Closes the popup calendar. */
  async hide() {
    if (!this.open || this.disabled) return;
    this.open = false;
    await waitForEvent(this, "wa-after-hide");
  }
  /** The selected date as a `Date` (single mode only). */
  get valueAsDate() {
    if (this.mode !== "single") return null;
    return parseIsoDate(this.value);
  }
  /** The selected range as an object with `from` and `to` properties (range mode only). */
  get valueAsRange() {
    if (this.mode !== "range") return { from: null, to: null };
    return parseRange(this.value);
  }
  /**
   * Clears the current value and emits `wa-clear`, `input`, and `change`. Mirrors activating the clear button. No-op
   * when already empty or when disabled/readonly.
   */
  clear() {
    if (this.disabled || this.readonly) return;
    this.clearValue();
  }
  //
  // Form association
  //
  formResetCallback() {
    this._value = this.defaultValue;
    this.valueHasChanged = false;
    this.segmentsController.clearBuffers();
    this.syncSegmentsFromCanonical();
    super.formResetCallback();
    this.lastEmittedValue = this._value;
    this.requestUpdate();
  }
  formStateRestoreCallback(state2) {
    if (typeof state2 === "string") {
      this._value = state2;
      if (this.hasUpdated) {
        this.syncSegmentsFromCanonical();
      } else {
        this.pendingValue = state2;
      }
      this.requestUpdate();
    }
    this.updateValidity();
  }
  //
  // Internal helpers
  //
  get resolvedLocale() {
    return this.localize.lang() || "en";
  }
  get isRtl() {
    return this.localize.dir() === "rtl";
  }
  getLayout() {
    return buildSegmentLayout(this.resolvedLocale);
  }
  normalizeIncomingValue(val) {
    if (val == null) return "";
    if (typeof val === "string") return val;
    if (val instanceof Date) return formatIsoDate(val);
    if (typeof val === "object" && val !== null) {
      const obj = val;
      const fromStr = obj.from ? this.normalizeIncomingValue(obj.from) : "";
      const toStr = obj.to ? this.normalizeIncomingValue(obj.to) : "";
      if (fromStr && toStr) return `${fromStr}/${toStr}`;
      return fromStr || toStr || "";
    }
    return "";
  }
  /** Recompute the segment state from the canonical `_value`. Discards any in-progress digit buffers. */
  syncSegmentsFromCanonical() {
    this.segmentsController.clearBuffers();
    if (this.mode === "range") {
      const r = rangeIsoToSegments(this._value);
      this.fromSegments = r.from;
      this.toSegments = r.to;
      this.segments = { year: null, month: null, day: null };
    } else {
      this.segments = isoToSegments(this._value);
      this.fromSegments = { year: null, month: null, day: null };
      this.toSegments = { year: null, month: null, day: null };
    }
    this.updateHiddenInput();
  }
  updateHiddenInput() {
    if (this.valueInput) {
      this.valueInput.value = this._value;
    }
    this.setValue(this._value || null);
  }
  /**
   * Recompute the canonical value from the current segment state, fire `input` always, and `change` when the value
   * transitions to a new committed state. This intentionally mirrors native `<input type=date>` ("change on every
   * commit") and is kept consistent with the sibling `<wa-time-input>`, which uses the identical semantic. This
   * differs from `<wa-input>`/`<wa-select>`, which only emit `change` on blur/commit of a user gesture.
   */
  recomputeValue() {
    const oldValue = this._value;
    let newValue;
    if (this.mode === "range") {
      newValue = segmentsToRangeIso(this.fromSegments, this.toSegments);
    } else {
      newValue = segmentsToIso(this.segments);
    }
    if (newValue !== oldValue) {
      this._value = newValue;
      this.valueHasChanged = true;
      this.updateHiddenInput();
      this.updateValidity();
    }
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    if (newValue !== this.lastEmittedValue) {
      this.lastEmittedValue = newValue;
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    }
    if (this.mode === "single") {
      const date = parseIsoDate(newValue);
      if (date) this.calendar?.goToDate(date);
    }
  }
  getGroupSegments(group) {
    if (group === "from") return this.fromSegments;
    if (group === "to") return this.toSegments;
    return this.segments;
  }
  setGroupSegments(group, next) {
    if (group === "from") this.fromSegments = next;
    else if (group === "to") this.toSegments = next;
    else this.segments = next;
  }
  /** Read the controller's pending buffer for a segment. The controller owns buffer storage. */
  getBuffer(group, field) {
    return this.segmentsController.getBuffer(group, field);
  }
  //
  // Popup listeners
  //
  addOpenListeners() {
    document.addEventListener("focusin", this.handleDocumentFocusIn);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
    registerDismissible(this);
  }
  removeOpenListeners() {
    document.removeEventListener("focusin", this.handleDocumentFocusIn);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
    unregisterDismissible(this);
  }
  //
  // Segment focus / navigation
  //
  /** Restore focus to the most-recently active segment (or first empty / first segment). */
  focusActiveSegment() {
    const active = this.segmentsController.getActiveSegment();
    if (active) {
      const el = this.segmentsController.segmentElementFor(active.group, active.field);
      if (el) {
        el.focus({ preventScroll: true });
        return;
      }
    }
    this.segmentsController.findFocusableSegment((g, f) => this.getGroupSegments(g)[f] == null)?.focus({ preventScroll: true });
  }
  /**
   * Shared clear routine for the clear button and the public `clear()` method. Resets the value, emits `wa-clear`,
   * `input`, and `change`, then restores focus to the field. No-op when there's nothing to clear.
   */
  clearValue() {
    if (!this._value && isEmpty(this.segments) && isEmpty(this.fromSegments) && isEmpty(this.toSegments)) return;
    this._value = "";
    this.valueHasChanged = true;
    this.segmentsController.clearBuffers();
    this.syncSegmentsFromCanonical();
    this.updateValidity();
    this.dispatchEvent(new WaClearEvent());
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.lastEmittedValue = "";
    this.focus();
  }
  updateForwardedDaySlots() {
    const slotRegex = /^day-\d{4}-\d{2}-\d{2}$/;
    const found = /* @__PURE__ */ new Set();
    for (const child of Array.from(this.children)) {
      const slot = child.getAttribute("slot");
      if (slot && slotRegex.test(slot)) {
        found.add(slot);
      }
    }
    const list = Array.from(found).sort();
    if (list.join(",") !== this.forwardedDaySlots.join(",")) {
      this.forwardedDaySlots = list;
    }
  }
  //
  // Segment placeholders / a11y labels
  //
  /** Visual placeholder rendered in an empty segment. Width-stable letters that match the committed format. */
  placeholderFor(field) {
    if (field === "year") return "yyyy";
    if (field === "month") return "mm";
    return "dd";
  }
  /** Localized readable name of the field, used for the spinbutton's aria-label and aria-valuetext fallback. */
  fieldLabelFor(field) {
    const fallback = field === "year" ? "Year" : field === "month" ? "Month" : "Day";
    return this.term(field, fallback);
  }
  segmentAriaLabel(group, field) {
    const fieldLabel = this.fieldLabelFor(field);
    if (group === "from") return `${this.term("startDate", "Start date")} ${fieldLabel}`;
    if (group === "to") return `${this.term("endDate", "End date")} ${fieldLabel}`;
    return fieldLabel;
  }
  segmentAriaValueText(group, field) {
    const value = this.getGroupSegments(group)[field];
    const buffer = this.getBuffer(group, field);
    if (buffer) return buffer;
    if (value == null) return this.term("empty", "Empty");
    if (field === "month") {
      try {
        const formatter = new Intl.DateTimeFormat(this.resolvedLocale, { month: "long", calendar: "gregory" });
        return formatter.format(new Date(2026, value - 1, 1));
      } catch {
        return String(value);
      }
    }
    return String(value);
  }
  //
  // Render
  //
  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test("label") : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test("hint") : this.withHint;
    const hasLabel = !!this.label || !!hasLabelSlot;
    const hasHint = !!this.hint || !!hasHintSlot;
    const hasValue = !!this._value;
    const layout = this.getLayout();
    const groupAriaLabel = this.label || this.term("date", "Date");
    return html`
      <div
        part="form-control"
        class=${classMap({
      "form-control": true,
      "form-control-has-label": hasLabel
    })}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${classMap({ label: true, "has-label": hasLabel })}
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${() => this.focus()}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${classMap({
      "date-input-popup": true,
      open: this.open
    })}
            placement=${this.placement}
            distance=${this.distance}
            ?active=${this.open}
            flip
            shift
          >
            <div
              part="base input-wrapper"
              class="input-wrapper"
              slot="anchor"
              @pointerdown=${this.handleInputWrapperPointerDown}
            >
              <slot name="start" part="start" class="start"></slot>

              <div
                part="input"
                class="segments"
                role="group"
                aria-labelledby=${hasLabel ? "label" : nothing}
                aria-label=${hasLabel ? nothing : groupAriaLabel}
              >
                ${this.mode === "range" ? this.renderRangeSegments(layout) : this.renderSegmentGroup("single", layout)}
              </div>

              <span id=${this.keyboardHelpId} class="visually-hidden">
                ${this.term(
      "datePickerKeyboardHelp",
      "Use arrow keys to change values; press Alt+Down Arrow to open the calendar."
    )}
              </span>

              <input
                class="value-input"
                type="text"
                tabindex="-1"
                aria-hidden="true"
                .value=${this._value}
                value=${this._value}
                ?disabled=${this.disabled}
                ?required=${this.required}
                autocomplete=${ifDefined(this.autocomplete || void 0)}
              />

              ${this.withClear && hasValue ? html`<button
                    part="clear-button"
                    type="button"
                    class="clear-button"
                    aria-label=${this.localize.term("clearEntry")}
                    tabindex="-1"
                    @mousedown=${this.handleClearMouseDown}
                    @click=${this.handleClearClick}
                  >
                    <slot name="clear-icon">
                      <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                    </slot>
                  </button>` : nothing}

              <slot name="end" part="end" class="end"></slot>

              <button
                part="expand-button"
                type="button"
                class="expand-button"
                aria-label=${this.open ? this.term("closeCalendar", "Close calendar") : this.term("chooseDate", "Choose date")}
                aria-haspopup="dialog"
                aria-expanded=${this.open ? "true" : "false"}
                aria-controls=${this.popupId}
                ?disabled=${this.disabled}
                @click=${this.handleExpandButtonClick}
              >
                <slot name="expand-icon" part="expand-icon" class="expand-icon">
                  <wa-icon library="system" name="calendar"></wa-icon>
                </slot>
              </button>
            </div>

            <div
              id=${this.popupId}
              part="popup"
              class="popup-body"
              role="dialog"
              aria-modal="true"
              aria-label=${this.term("chooseDate", "Choose date")}
            >
              <wa-date-picker
                part="date-picker"
                exportparts="base:date-picker__base,header:date-picker__header,title:date-picker__title,nav:date-picker__nav,previous:date-picker__previous,next:date-picker__next,months:date-picker__months,month:date-picker__month,month-label:date-picker__month-label,weekdays:date-picker__weekdays,weekday:date-picker__weekday,weeknumbers:date-picker__weeknumbers,weeknumber:date-picker__weeknumber,grid:date-picker__grid,day:date-picker__day,day-today:date-picker__day-today,day-outside:date-picker__day-outside,day-weekend:date-picker__day-weekend,day-disabled:date-picker__day-disabled,day-selected:date-picker__day-selected,day-range-start:date-picker__day-range-start,day-range-end:date-picker__day-range-end,day-range-inner:date-picker__day-range-inner,day-range-preview:date-picker__day-range-preview,day-label:date-picker__day-label,day-placeholder:date-picker__day-placeholder,view-grid:date-picker__view-grid,view-row:date-picker__view-row,view-cell:date-picker__view-cell,view-item:date-picker__view-item,view-item-today:date-picker__view-item-today,view-item-selected:date-picker__view-item-selected,view-item-disabled:date-picker__view-item-disabled,footer:date-picker__footer"
                .mode=${this.mode}
                .value=${this._value}
                value=${this._value}
                min=${this.min}
                max=${this.max}
                today=${this.today}
                first-day-of-week=${this.firstDayOfWeek}
                .disabledDates=${this.disabledDates}
                disabled-days-of-week=${this.disabledDaysOfWeek}
                ?disable-past=${this.disablePast}
                ?disable-future=${this.disableFuture}
                min-range=${this.minRange}
                max-range=${this.maxRange}
                .isDateDisabled=${this.isDateDisabled}
                .dayContent=${this.dayContent}
                months=${this.months}
                page-by=${this.pageBy}
                ?with-outside-days=${this.withOutsideDays}
                ?with-week-numbers=${this.withWeekNumbers}
                weekday-format=${this.weekdayFormat}
                ?readonly=${this.readonly}
                @change=${this.handleCalendarChange}
                @input=${this.handleCalendarInput}
              >
                <slot name="footer" slot="footer"></slot>
                <slot name="previous-icon" slot="previous-icon">
                  <wa-icon library="system" name="chevron-left" variant="solid"></wa-icon>
                </slot>
                <slot name="next-icon" slot="next-icon">
                  <wa-icon library="system" name="chevron-right" variant="solid"></wa-icon>
                </slot>
                ${this.forwardedDaySlots.map((name) => html`<slot name=${name} slot=${name}></slot>`)}
              </wa-date-picker>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${classMap({ "has-slotted": hasHint })}
          aria-hidden=${hasHint ? "false" : "true"}
        >
          ${this.hint}
        </slot>

        <slot class="hidden-children" @slotchange=${this.handleDefaultSlotChange}></slot>
      </div>
    `;
  }
  renderSegmentGroup(group, layout) {
    let tabAssigned = false;
    const nodes = [];
    for (let i = 0; i < layout.tokens.length; i++) {
      const token = layout.tokens[i];
      if (token.kind === "literal") {
        nodes.push(this.renderLiteral(token.text));
      } else {
        const active = this.segmentsController.getActiveSegment();
        const isFirstActive = !tabAssigned && (active == null ? group === (this.mode === "range" ? "from" : "single") : active.group === group && active.field === token.field);
        if (isFirstActive) tabAssigned = true;
        nodes.push(this.renderSegment(group, token.field, isFirstActive));
      }
    }
    return nodes;
  }
  renderRangeSegments(layout) {
    return [
      ...this.renderSegmentGroup("from", layout),
      html`<span part="range-separator segment-literal" class="segment-literal range-separator" aria-hidden="true"
        >&nbsp;–&nbsp;</span
      >`,
      ...this.renderSegmentGroup("to", layout)
    ];
  }
  renderLiteral(text) {
    return html`<span part="segment-literal" class="segment-literal" aria-hidden="true">${text}</span>`;
  }
  renderSegment(group, field, isTabStop) {
    const segments = this.getGroupSegments(group);
    const buffer = this.getBuffer(group, field);
    const value = segments[field];
    const placeholder = this.placeholderFor(field);
    const display = formatSegmentText(field, value, buffer, placeholder);
    const isEmptySegment = value == null && !buffer;
    const bounds = segmentBounds(field, segments);
    const ariaValueText = this.segmentAriaValueText(group, field);
    return html`<span
      part="segment"
      class=${classMap({ segment: true, empty: isEmptySegment, [`segment-${field}`]: true })}
      data-group=${group}
      data-segment=${field}
      role="spinbutton"
      tabindex=${this.disabled ? -1 : isTabStop ? 0 : -1}
      aria-label=${this.segmentAriaLabel(group, field)}
      aria-valuemin=${bounds.min}
      aria-valuemax=${bounds.max}
      aria-valuenow=${ifDefined(value == null ? void 0 : value)}
      aria-valuetext=${ariaValueText}
      aria-readonly=${this.readonly ? "true" : "false"}
      aria-disabled=${this.disabled ? "true" : "false"}
      aria-describedby=${this.keyboardHelpId}
      inputmode="numeric"
      @keydown=${this.handleSegmentKeyDown}
      @focus=${this.handleSegmentFocus}
      @blur=${this.handleSegmentBlur}
      @paste=${this.handleSegmentPaste}
      >${display}</span
    >`;
  }
};
WaDateInput.css = [size_styles_default, form_control_styles_default, date_input_styles_default];
WaDateInput.shadowRootOptions = {
  ...WebAwesomeFormAssociatedElement.shadowRootOptions,
  delegatesFocus: true
};
__decorateClass([
  query(".date-input-popup")
], WaDateInput.prototype, "popup", 2);
__decorateClass([
  query(".value-input")
], WaDateInput.prototype, "valueInput", 2);
__decorateClass([
  query('[part~="input"]')
], WaDateInput.prototype, "inputGroup", 2);
__decorateClass([
  query("wa-date-picker")
], WaDateInput.prototype, "calendar", 2);
__decorateClass([
  state()
], WaDateInput.prototype, "forwardedDaySlots", 2);
__decorateClass([
  state()
], WaDateInput.prototype, "segments", 2);
__decorateClass([
  state()
], WaDateInput.prototype, "fromSegments", 2);
__decorateClass([
  state()
], WaDateInput.prototype, "toSegments", 2);
__decorateClass([
  property({ reflect: true })
], WaDateInput.prototype, "name", 2);
__decorateClass([
  state()
], WaDateInput.prototype, "value", 1);
__decorateClass([
  property({ attribute: "value", reflect: true })
], WaDateInput.prototype, "defaultValue", 2);
__decorateClass([
  property({ type: Boolean })
], WaDateInput.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaDateInput.prototype, "required", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaDateInput.prototype, "readonly", 2);
__decorateClass([
  property({ reflect: true })
], WaDateInput.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaDateInput.prototype, "handleSizeChange", 1);
__decorateClass([
  property({ reflect: true })
], WaDateInput.prototype, "appearance", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaDateInput.prototype, "pill", 2);
__decorateClass([
  property()
], WaDateInput.prototype, "label", 2);
__decorateClass([
  property({ attribute: "hint" })
], WaDateInput.prototype, "hint", 2);
__decorateClass([
  property()
], WaDateInput.prototype, "autocomplete", 2);
__decorateClass([
  property({ attribute: "with-clear", type: Boolean })
], WaDateInput.prototype, "withClear", 2);
__decorateClass([
  property({ attribute: "with-label", type: Boolean })
], WaDateInput.prototype, "withLabel", 2);
__decorateClass([
  property({ attribute: "with-hint", type: Boolean })
], WaDateInput.prototype, "withHint", 2);
__decorateClass([
  property({ reflect: true })
], WaDateInput.prototype, "mode", 2);
__decorateClass([
  property({ reflect: true })
], WaDateInput.prototype, "min", 2);
__decorateClass([
  property({ reflect: true })
], WaDateInput.prototype, "max", 2);
__decorateClass([
  property({ reflect: true })
], WaDateInput.prototype, "today", 2);
__decorateClass([
  property({ attribute: "first-day-of-week", reflect: true })
], WaDateInput.prototype, "firstDayOfWeek", 2);
__decorateClass([
  property({ attribute: "disabled-dates" })
], WaDateInput.prototype, "disabledDates", 2);
__decorateClass([
  property({ attribute: "disabled-days-of-week" })
], WaDateInput.prototype, "disabledDaysOfWeek", 2);
__decorateClass([
  property({ attribute: "disable-past", type: Boolean, reflect: true })
], WaDateInput.prototype, "disablePast", 2);
__decorateClass([
  property({ attribute: "disable-future", type: Boolean, reflect: true })
], WaDateInput.prototype, "disableFuture", 2);
__decorateClass([
  property({ attribute: "min-range", type: Number, reflect: true })
], WaDateInput.prototype, "minRange", 2);
__decorateClass([
  property({ attribute: "max-range", type: Number, reflect: true })
], WaDateInput.prototype, "maxRange", 2);
__decorateClass([
  property({ attribute: false })
], WaDateInput.prototype, "isDateDisabled", 2);
__decorateClass([
  property({ attribute: false })
], WaDateInput.prototype, "dayContent", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], WaDateInput.prototype, "months", 2);
__decorateClass([
  property({ attribute: "page-by", reflect: true })
], WaDateInput.prototype, "pageBy", 2);
__decorateClass([
  property({ attribute: "with-outside-days", type: Boolean, reflect: true })
], WaDateInput.prototype, "withOutsideDays", 2);
__decorateClass([
  property({ attribute: "with-week-numbers", type: Boolean, reflect: true })
], WaDateInput.prototype, "withWeekNumbers", 2);
__decorateClass([
  property({ attribute: "weekday-format", reflect: true })
], WaDateInput.prototype, "weekdayFormat", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaDateInput.prototype, "open", 2);
__decorateClass([
  property({ reflect: true })
], WaDateInput.prototype, "placement", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], WaDateInput.prototype, "distance", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaDateInput.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("mode")
], WaDateInput.prototype, "handleModeChange", 1);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaDateInput.prototype, "handleOpenChange", 1);
WaDateInput = __decorateClass([
  customElement("wa-date-input")
], WaDateInput);

export {
  WaDateInput
};
