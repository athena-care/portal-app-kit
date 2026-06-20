/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/internal/segmented-field/segmented-field-controller.ts
var DEFAULT_SEPARATORS = ["/", ".", "-", ":", ",", " "];
var SegmentedFieldController = class {
  constructor(host, config) {
    /** Per-segment digit buffers keyed by `${group}:${field}`. */
    this.buffers = /* @__PURE__ */ new Map();
    /** Which segment currently owns the roving tabindex / was most recently focused. */
    this.active = null;
    //
    // Internal handlers
    //
    this.handleFocus = (event) => {
      const el = event.currentTarget;
      const group = el.dataset.group;
      const field = el.dataset.segment;
      this.active = { group, field };
      for (const segment of this.segmentElements()) {
        segment.tabIndex = segment === el ? 0 : -1;
      }
    };
    this.handleBlur = (event) => {
      const el = event.currentTarget;
      const group = el.dataset.group;
      const field = el.dataset.segment;
      if (this.getBuffer(group, field)) this.flushBuffer(group, field);
    };
    this.handleKeyDown = (event) => {
      const el = event.currentTarget ?? event.composedPath().find((t) => {
        return t instanceof HTMLElement && t.dataset.group && t.dataset.segment;
      }) ?? null;
      if (!el) return;
      const group = el.dataset.group;
      const field = el.dataset.segment;
      if (!group || !field) return;
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        if (this.isReadonlyOrDisabled()) return;
        if (this.getBuffer(group, field)) this.flushBuffer(group, field);
        const delta = event.key === "ArrowUp" ? 1 : -1;
        const result = this.config.rules.step(group, field, delta);
        if (result) this.config.onCommit?.(group, field, result.value);
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        if (this.getBuffer(group, field)) this.flushBuffer(group, field);
        const visualLeft = event.key === "ArrowLeft";
        const logicalPrev = this.config.isRtl() ? !visualLeft : visualLeft;
        this.moveFocus(el, logicalPrev ? -1 : 1);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        this.segmentElements()[0]?.focus({ preventScroll: true });
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        const segments = this.segmentElements();
        segments[segments.length - 1]?.focus({ preventScroll: true });
        return;
      }
      if (event.key === "Tab") {
        if (this.getBuffer(group, field)) this.flushBuffer(group, field);
        return;
      }
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        if (this.isReadonlyOrDisabled()) return;
        const buffer = this.getBuffer(group, field);
        if (buffer) {
          this.setBuffer(group, field, "");
          this.config.onCommit?.(group, field, null);
        } else {
          const hadValue = this.config.rules.clear(group, field);
          if (hadValue) {
            this.config.onCommit?.(group, field, null);
          } else if (event.key === "Backspace") {
            this.moveFocus(el, -1);
          }
        }
        return;
      }
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        if (this.isReadonlyOrDisabled()) return;
        const buffer = this.getBuffer(group, field);
        const result = this.config.rules.typeDigit(group, field, buffer, event.key);
        this.setBuffer(group, field, result.buffer);
        this.config.onCommit?.(group, field, result.value);
        if (result.advance) this.moveFocus(el, 1);
        return;
      }
      const seps = this.config.separatorKeys ?? DEFAULT_SEPARATORS;
      if (seps.includes(event.key)) {
        event.preventDefault();
        if (this.getBuffer(group, field)) this.flushBuffer(group, field);
        this.moveFocus(el, 1);
        return;
      }
    };
    this.host = host;
    this.config = config;
    host.addController(this);
  }
  //
  // ReactiveController lifecycle
  //
  hostConnected() {
  }
  hostDisconnected() {
    this.buffers.clear();
    this.active = null;
  }
  //
  // Public API
  //
  /** Get the buffer for a segment. Empty string when nothing is pending. */
  getBuffer(group, field) {
    return this.buffers.get(this.key(group, field)) ?? "";
  }
  /** Replace the buffer for a segment. Pass `''` to clear. */
  setBuffer(group, field, buffer) {
    const k = this.key(group, field);
    if (buffer) this.buffers.set(k, buffer);
    else this.buffers.delete(k);
  }
  /** Drop every pending buffer. Used by the host when the canonical value is replaced wholesale. */
  clearBuffers() {
    this.buffers.clear();
  }
  /** The active segment, or `null` if focus has never landed on one. */
  getActiveSegment() {
    return this.active;
  }
  /** Sets the active segment (does not move DOM focus). Used by hosts that programmatically restore focus. */
  setActiveSegment(group, field) {
    this.active = { group, field };
  }
  /** All segment elements in the host's shadow root, in DOM (logical) order. */
  segmentElements() {
    const root = this.host.shadowRoot;
    if (!root) return [];
    return Array.from(root.querySelectorAll("[data-segment][data-group]"));
  }
  /** The segment element for a given (group, field), or `null` if not in the DOM. */
  segmentElementFor(group, field) {
    const root = this.host.shadowRoot;
    if (!root) return null;
    return root.querySelector(`[data-group="${group}"][data-segment="${field}"]`);
  }
  /**
   * Returns the segment that should receive initial focus: the first empty segment (no value AND no buffer) per
   * `isEmpty`, otherwise the first segment in the layout. The host supplies the emptiness predicate since the
   * controller doesn't know the field's stored value.
   */
  findFocusableSegment(isEmpty) {
    const segments = this.segmentElements();
    if (segments.length === 0) return null;
    const firstEmpty = segments.find((el) => {
      const group = el.dataset.group;
      const field = el.dataset.segment;
      return isEmpty(group, field) && !this.getBuffer(group, field);
    });
    return firstEmpty ?? segments[0];
  }
  /** Restore focus to the most recently active segment (or the first segment if none has been active). */
  focusActiveSegment(options) {
    if (this.active) {
      const el = this.segmentElementFor(this.active.group, this.active.field);
      if (el) {
        el.focus({ preventScroll: true, ...options });
        return;
      }
    }
    this.segmentElements()[0]?.focus({ preventScroll: true, ...options });
  }
  /** Move focus to the neighbor segment in logical (DOM) order. */
  moveFocus(from, direction, options) {
    const segments = this.segmentElements();
    const idx = segments.indexOf(from);
    if (idx < 0) return;
    const next = segments[idx + direction];
    if (next) next.focus({ preventScroll: true, ...options });
  }
  /**
   * Commit a pending buffer to its committed value via `rules.commitBuffer`. Notifies the host via `onCommit`. Does
   * nothing if no buffer is pending.
   */
  flushBuffer(group, field) {
    const buffer = this.getBuffer(group, field);
    if (!buffer) return false;
    const value = this.config.rules.commitBuffer(group, field, buffer);
    this.setBuffer(group, field, "");
    this.config.onCommit?.(group, field, value);
    return true;
  }
  /**
   * Flush every pending buffer across all groups. Used when the host needs to read a final value (e.g., on form
   * submission outside of a focus change).
   */
  flushAllBuffers() {
    for (const [k, buffer] of this.buffers) {
      if (!buffer) continue;
      const [group, field] = k.split(":");
      const value = this.config.rules.commitBuffer(group, field, buffer);
      this.config.onCommit?.(group, field, value);
    }
    this.buffers.clear();
  }
  /**
   * Returns the event handlers a segment element should bind. Hosts wire these via `@keydown=${handlers.keydown}` etc.
   * The returned functions are stable references safe to pass to Lit's directive cache.
   *
   * Hosts that need host-level shortcuts (e.g. `Alt+ArrowDown` to open a popup) should call `handleKeyDown` themselves
   * after handling their own keys. The controller's `keydown` handler is safe to invoke when the host has not consumed
   * the event — it ignores keys it doesn't recognize.
   */
  eventHandlers() {
    return {
      keydown: this.handleKeyDown,
      focus: this.handleFocus,
      blur: this.handleBlur
    };
  }
  /**
   * Direct entry point for hosts that wrap the controller's keydown with their own pre-handler (e.g. for popup
   * shortcuts). Returns `true` if the controller consumed the event (called `preventDefault`), `false` otherwise.
   */
  handleKeyDownEvent(event) {
    const defaultPreventedBefore = event.defaultPrevented;
    this.handleKeyDown(event);
    return event.defaultPrevented && !defaultPreventedBefore;
  }
  //
  // Helpers
  //
  key(group, field) {
    return `${group}:${field}`;
  }
  isReadonlyOrDisabled() {
    return !!(this.config.isReadonly?.() || this.config.isDisabled?.());
  }
};

export {
  SegmentedFieldController
};
