/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/data-grid/grid-navigation-controller.ts
var NAV_KEYS = /* @__PURE__ */ new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "Enter",
  " ",
  "a",
  "A"
]);
var TEXTUAL_TAGS = /* @__PURE__ */ new Set([
  "input",
  "textarea",
  "select",
  "wa-input",
  "wa-select",
  "wa-option",
  "wa-date-input",
  "wa-dropdown",
  "wa-dropdown-item",
  "wa-popover"
]);
var TOGGLE_TAGS = /* @__PURE__ */ new Set(["button", "wa-button", "wa-checkbox"]);
function isToggleInput(el) {
  return el.localName === "input" && /^(checkbox|radio)$/.test(el.type);
}
var GridNavigationController = class {
  constructor(element, host) {
    /** The row index a Shift+Arrow range selection started from. */
    this.selectionAnchor = null;
    this.focusAttempts = 0;
    /** The single keydown switch, bound to the scroller in the template. */
    this.handleKeyDown = (event) => {
      const isCtrlA = (event.key === "a" || event.key === "A") && (event.ctrlKey || event.metaKey);
      const isCtrlC = (event.key === "c" || event.key === "C") && (event.ctrlKey || event.metaKey);
      const isContextMenuKey = event.key === "ContextMenu" || event.key === "F10" && event.shiftKey;
      if (!NAV_KEYS.has(event.key) && !isCtrlA && !isCtrlC && !isContextMenuKey) return;
      if (/^[ac]$/i.test(event.key) && !isCtrlA && !isCtrlC) return;
      const path = event.composedPath().filter((t) => t instanceof Element);
      if (path.some((t) => TEXTUAL_TAGS.has(t.localName) && !isToggleInput(t))) return;
      if (path.some((t) => TOGGLE_TAGS.has(t.localName) || isToggleInput(t)) && (event.key === "Enter" || event.key === " ")) {
        return;
      }
      if (isCtrlC) {
        if (this.host.copySelection()) event.preventDefault();
        return;
      }
      const cols = this.host.focusableColumnIds();
      if (cols.length === 0) return;
      const rowCount = this.host.rowCount();
      let active = this.host.getActiveCell();
      if (!active) {
        active = { row: -1, col: cols[0] };
      }
      const isRtl = this.host.isRtl();
      const ci = Math.max(0, cols.indexOf(active.col));
      const onHeader = active.row === -1;
      if (isContextMenuKey) {
        if (!onHeader) {
          event.preventDefault();
          this.host.openContextMenu(active.row, active.col, event);
        }
        return;
      }
      if (onHeader && event.shiftKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        if (this.host.columnMovable(active.col)) {
          const physical = event.key === "ArrowRight" ? 1 : -1;
          const delta = isRtl ? -physical : physical;
          event.preventDefault();
          this.host.moveColumnByStep(active.col, delta);
        }
        return;
      }
      if (onHeader && event.altKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        if (this.host.columnResizable(active.col)) {
          const delta = event.key === "ArrowRight" ? 1 : -1;
          event.preventDefault();
          this.host.resizeColumnByStep(active.col, delta);
        }
        return;
      }
      let next = { ...active };
      switch (event.key) {
        case "ArrowRight": {
          const delta = isRtl ? -1 : 1;
          next.col = cols[clamp(ci + delta, 0, cols.length - 1)];
          break;
        }
        case "ArrowLeft": {
          const delta = isRtl ? 1 : -1;
          next.col = cols[clamp(ci + delta, 0, cols.length - 1)];
          break;
        }
        case "ArrowDown": {
          if (onHeader) next.row = rowCount > 0 ? 0 : -1;
          else next.row = clamp(active.row + 1, 0, rowCount - 1);
          if (event.shiftKey && !onHeader && this.host.multiSelectEnabled()) {
            this.handleRangeExtend(active.row, next.row);
          }
          break;
        }
        case "ArrowUp": {
          if (onHeader) {
            next.row = -1;
          } else if (active.row === 0) {
            next.row = -1;
          } else {
            next.row = clamp(active.row - 1, 0, rowCount - 1);
          }
          if (event.shiftKey && !onHeader && next.row !== -1 && this.host.multiSelectEnabled()) {
            this.handleRangeExtend(active.row, next.row);
          }
          break;
        }
        case "Home": {
          if (event.ctrlKey || event.metaKey) {
            next.row = onHeader ? -1 : rowCount > 0 ? 0 : -1;
            next.col = cols[0];
          } else {
            next.col = cols[0];
          }
          break;
        }
        case "End": {
          if (event.ctrlKey || event.metaKey) {
            next.row = rowCount > 0 ? rowCount - 1 : -1;
            next.col = cols[cols.length - 1];
          } else {
            next.col = cols[cols.length - 1];
          }
          break;
        }
        case "PageDown": {
          const page = this.pageStep();
          next.row = onHeader ? clamp(page - 1, 0, rowCount - 1) : clamp(active.row + page, 0, rowCount - 1);
          break;
        }
        case "PageUp": {
          const page = this.pageStep();
          next.row = onHeader ? -1 : clamp(active.row - page, 0, rowCount - 1);
          break;
        }
        case "Enter": {
          if (onHeader) {
            event.preventDefault();
            this.host.sortColumn(active.col, event.shiftKey);
          } else if (this.host.toggleRowExpansion(active.row, active.col)) {
            event.preventDefault();
          } else {
            event.preventDefault();
            this.host.activateCell(active.row, active.col);
          }
          return;
        }
        case " ": {
          if (!onHeader && this.host.selectionEnabled()) {
            event.preventDefault();
            this.host.toggleRowSelection(active.row);
          }
          return;
        }
        default: {
          if (isCtrlA) {
            if (this.host.multiSelectEnabled()) {
              event.preventDefault();
              this.host.selectAllRows();
            }
            return;
          }
          return;
        }
      }
      event.preventDefault();
      if (!event.shiftKey) this.selectionAnchor = null;
      this.moveActiveCell(next);
    };
    element.addController(this);
    this.host = host;
  }
  hostConnected() {
  }
  handleRangeExtend(from, to) {
    if (this.selectionAnchor === null) {
      this.selectionAnchor = from;
      this.host.beginRangeSelection();
    }
    this.host.extendSelectionTo(this.selectionAnchor, to);
  }
  /** Rows to jump per Page Up/Down: roughly one viewport, minus one for context. */
  pageStep() {
    const scroller = this.host.scrollerEl();
    const rowHeight = this.host.rowHeight() || 40;
    const viewport = scroller?.clientHeight ?? rowHeight * 10;
    return Math.max(1, Math.floor(viewport / rowHeight) - 1);
  }
  /** Moves the active cell to a new coordinate, scrolling it into view and deferring focus past the next render. */
  moveActiveCell(next) {
    this.host.setActiveCell(next);
    if (next.row >= 0) this.host.scrollRowIntoView(next.row);
    this.focusAttempts = 0;
    void this.host.updateComplete.then(() => requestAnimationFrame(() => this.focusActiveCellEl()));
  }
  /** Focuses the element matching the active-cell coordinate; retries once if virtualization hasn't produced it. */
  focusActiveCellEl() {
    const active = this.host.getActiveCell();
    if (!active) return;
    const root = this.host.shadowRoot;
    if (!root) return;
    const selector = `[data-row-index="${active.row}"][data-col-id="${cssEscape(active.col)}"]`;
    const el = root.querySelector(selector);
    if (el) {
      el.focus({ preventScroll: true });
      this.host.revealColumn(el);
      return;
    }
    if (this.focusAttempts < 2) {
      this.focusAttempts += 1;
      requestAnimationFrame(() => this.focusActiveCellEl());
    }
  }
  /** Clears the Shift+Arrow range anchor (positional — meaningless once the visible row order changes). */
  resetRangeAnchor() {
    this.selectionAnchor = null;
  }
  /** Clamps the active row into the current range after the row set changes (sort/filter/page). */
  clampActiveRow() {
    const active = this.host.getActiveCell();
    if (!active || active.row < 0) return;
    const rowCount = this.host.rowCount();
    if (active.row > rowCount - 1) {
      this.host.setActiveCell({ ...active, row: Math.max(-1, rowCount - 1) });
    }
  }
};
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function cssEscape(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
  return value.replace(/["\\]/g, "\\$&");
}

export {
  GridNavigationController
};
