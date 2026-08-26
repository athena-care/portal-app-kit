/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/data-grid/column-reorder-controller.ts
var THRESHOLD = 4;
var EDGE = 48;
var REORDERING_CLASS = "column-reordering";
var SETTLE_MS = 160;
var ColumnReorderController = class {
  constructor(element, host) {
    // Pending (pre-threshold) state
    this.pending = false;
    this.startX = 0;
    this.startColumnId = "";
    /** The pointer that started the interaction; events from other pointers (a second touch) are ignored. */
    this.activePointerId = -1;
    /** True from drop until the settle animation commits — new pointerdowns are refused meanwhile. */
    this.settling = false;
    // Active-drag state
    this.dragging = false;
    this.orderedIds = [];
    this.fromIndex = -1;
    this.toIndex = -1;
    this.draggedWidth = 0;
    this.cellCenters = /* @__PURE__ */ new Map();
    // columnId -> center in content coordinates (snapshot)
    this.cellLefts = /* @__PURE__ */ new Map();
    // columnId -> left edge in content coordinates (snapshot)
    this.cellWidths = /* @__PURE__ */ new Map();
    // columnId -> width (snapshot)
    this.lastClientX = 0;
    this.lastClientY = 0;
    this.rafHandle = 0;
    this.autoScrollRaf = 0;
    this.ghost = null;
    this.onPointerMove = (event) => {
      if (event.pointerId !== this.activePointerId) return;
      this.lastClientX = event.clientX;
      this.lastClientY = event.clientY;
      if (this.pending) {
        if (Math.abs(event.clientX - this.startX) < THRESHOLD) return;
        this.startDrag();
      }
      if (!this.dragging) return;
      event.preventDefault();
      this.scheduleUpdate();
      this.updateAutoScroll();
    };
    this.onPointerUp = (event) => {
      if (event.pointerId !== this.activePointerId) return;
      window.removeEventListener("pointermove", this.onPointerMove);
      window.removeEventListener("pointerup", this.onPointerUp);
      window.removeEventListener("pointercancel", this.onPointerCancel);
      if (!this.dragging) {
        this.pending = false;
        this.activePointerId = -1;
        return;
      }
      this.commitAndCleanup();
    };
    /**
     * A canceled drag (browser converts a touch to a scroll/zoom mid-drag) reverts to the pre-drag order — matching
     * the resize path's cancel semantics — instead of committing wherever the preview happened to be.
     */
    this.onPointerCancel = (event) => {
      if (event.pointerId !== this.activePointerId) return;
      if (this.dragging) {
        this.clearVisuals();
        window.setTimeout(() => this.host.setSuppressNextHeaderClick(false), 0);
      }
      this.teardown();
    };
    /** The last previewed drop index an interim event was emitted for (dedupes the per-frame emit). */
    this.lastEmittedToIndex = -1;
    /** Current auto-scroll vector — instance state so the running loop tracks pointer movement inside the band. */
    this.autoScrollDir = 0;
    this.autoScrollSpeed = 0;
    element.addController(this);
    this.host = host;
  }
  hostDisconnected() {
    this.teardown();
  }
  /** Whether a drag is currently in progress (the host reads this to re-stamp transforms after a render). */
  get isDragging() {
    return this.dragging;
  }
  /** The id of the column being dragged, or `''` when idle. */
  get draggingColumnId() {
    return this.dragging ? this.startColumnId : "";
  }
  /** Pointerdown on a header cell — records the candidate but waits for the threshold before starting a drag. */
  onHeaderPointerDown(event, columnId) {
    if (event.target.closest(".resize-handle")) return;
    if (!this.host.columnMovable(columnId)) return;
    if (event.button !== 0) return;
    if (this.pending || this.dragging || this.settling) return;
    this.pending = true;
    this.activePointerId = event.pointerId;
    this.startX = event.clientX;
    this.startColumnId = columnId;
    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointercancel", this.onPointerCancel);
  }
  startDrag() {
    this.pending = false;
    this.dragging = true;
    this.host.setSuppressNextHeaderClick(true);
    this.orderedIds = this.host.orderedColumnIds();
    this.fromIndex = this.orderedIds.indexOf(this.startColumnId);
    this.toIndex = this.fromIndex;
    this.lastEmittedToIndex = this.fromIndex;
    const scroller = this.host.scrollerEl();
    const scrollerRect = scroller?.getBoundingClientRect();
    const scrollLeft = scroller?.scrollLeft ?? 0;
    this.cellCenters.clear();
    this.cellLefts.clear();
    this.cellWidths.clear();
    for (const id of this.orderedIds) {
      const el = this.host.headerCellEl(id);
      if (!el || !scrollerRect) continue;
      const rect = el.getBoundingClientRect();
      const left = rect.left - scrollerRect.left + scrollLeft;
      this.cellLefts.set(id, left);
      this.cellWidths.set(id, rect.width);
      this.cellCenters.set(id, left + rect.width / 2);
      if (id === this.startColumnId) this.draggedWidth = rect.width;
    }
    scroller?.classList.add(REORDERING_CLASS);
    this.host.toggleHostClass("is-dragging", true);
    this.createGhost();
    this.scheduleUpdate();
  }
  createGhost() {
    const ghost = document.createElement("div");
    ghost.setAttribute("part", "drag-ghost");
    ghost.classList.add("drag-ghost");
    ghost.popover = "manual";
    ghost.textContent = this.host.columnLabel(this.startColumnId);
    this.host.attachGhost(ghost);
    this.ghost = ghost;
    this.positionGhost();
    try {
      ghost.showPopover();
    } catch {
    }
  }
  /** Moves the ghost so it tracks the cursor (offset slightly down-right of the pointer). */
  positionGhost() {
    if (!this.ghost) return;
    this.ghost.style.transform = `translate(${this.lastClientX + 12}px, ${this.lastClientY + 8}px)`;
  }
  scheduleUpdate() {
    if (this.rafHandle) return;
    this.rafHandle = requestAnimationFrame(() => {
      this.rafHandle = 0;
      this.applyDrag();
    });
  }
  /** Computes the drop index from the cursor, stamps the shuffle transforms, positions the ghost, throttled to a frame. */
  applyDrag() {
    if (!this.dragging) return;
    const scroller = this.host.scrollerEl();
    if (!scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const pointerContentX = this.lastClientX - scrollerRect.left + scroller.scrollLeft;
    const rtl = this.host.isRtl();
    let toIndex = this.orderedIds.findIndex((id) => {
      const center = this.cellCenters.get(id);
      if (center == null) return false;
      return rtl ? pointerContentX > center : pointerContentX < center;
    });
    if (toIndex === -1) toIndex = this.orderedIds.length - 1;
    this.toIndex = toIndex;
    this.stampTransforms();
    this.positionGhost();
    if (toIndex !== this.lastEmittedToIndex) {
      this.lastEmittedToIndex = toIndex;
      const preview = arrayMove(this.orderedIds, this.fromIndex, toIndex);
      this.host.commitColumnOrder(this.startColumnId, preview, false);
    }
  }
  /**
   * Re-applies the current shuffle transforms — call from updated() too, since any re-render wipes inline styles.
   * Every column (the source included) slides to its previewed position so the gap opens cleanly and nothing overlaps:
   * the source slides into the drop slot; the columns it passes slide back to fill its vacated slot.
   */
  stampTransforms() {
    if (!this.dragging) return;
    const towardVisualEnd = this.host.isRtl() ? this.toIndex < this.fromIndex : this.toIndex > this.fromIndex;
    for (let p = 0; p < this.orderedIds.length; p++) {
      const id = this.orderedIds[p];
      let offset = 0;
      if (p === this.fromIndex) {
        offset = this.dropOffset();
      } else if (this.fromIndex < this.toIndex && p > this.fromIndex && p <= this.toIndex) {
        offset = towardVisualEnd ? -this.draggedWidth : this.draggedWidth;
      } else if (this.fromIndex > this.toIndex && p < this.fromIndex && p >= this.toIndex) {
        offset = towardVisualEnd ? -this.draggedWidth : this.draggedWidth;
      }
      this.applyTransform(id, offset);
    }
  }
  /** The content-space offset (translateX) the source must end at to fill the gap at the current `toIndex`. */
  dropOffset() {
    if (this.toIndex === this.fromIndex) return 0;
    const srcLeft = this.cellLefts.get(this.startColumnId) ?? 0;
    const targetId = this.orderedIds[this.toIndex];
    const targetLeft = this.cellLefts.get(targetId) ?? srcLeft;
    const targetWidth = this.cellWidths.get(targetId) ?? 0;
    const movingVisualRight = targetLeft > srcLeft;
    const gapLeft = movingVisualRight ? targetLeft + targetWidth - this.draggedWidth : targetLeft;
    return gapLeft - srcLeft;
  }
  applyTransform(columnId, px) {
    const value = px === 0 ? "" : `translateX(${px}px)`;
    const header = this.host.headerCellEl(columnId);
    if (header) header.style.transform = value;
    for (const cell of this.host.bodyCellEls(columnId)) {
      cell.style.transform = value;
    }
  }
  updateAutoScroll() {
    const scroller = this.host.scrollerEl();
    if (!scroller) return;
    const rect = scroller.getBoundingClientRect();
    const fromLeft = this.lastClientX - rect.left;
    const fromRight = rect.right - this.lastClientX;
    let dir = 0;
    let speed = 0;
    if (fromLeft < EDGE) {
      dir = -1;
      speed = ramp(EDGE - fromLeft);
    } else if (fromRight < EDGE) {
      dir = 1;
      speed = ramp(EDGE - fromRight);
    }
    this.autoScrollDir = dir;
    this.autoScrollSpeed = speed;
    if (dir === 0) {
      if (this.autoScrollRaf) {
        cancelAnimationFrame(this.autoScrollRaf);
        this.autoScrollRaf = 0;
      }
      return;
    }
    if (this.autoScrollRaf) return;
    const tick = () => {
      if (!this.dragging || this.autoScrollDir === 0) {
        this.autoScrollRaf = 0;
        return;
      }
      scroller.scrollLeft += this.autoScrollDir * this.autoScrollSpeed;
      this.applyDrag();
      this.autoScrollRaf = requestAnimationFrame(tick);
    };
    this.autoScrollRaf = requestAnimationFrame(tick);
  }
  commitAndCleanup() {
    this.dragging = false;
    this.settling = true;
    if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
    if (this.autoScrollRaf) cancelAnimationFrame(this.autoScrollRaf);
    this.rafHandle = 0;
    this.autoScrollRaf = 0;
    const next = arrayMove(this.orderedIds, this.fromIndex, this.toIndex);
    const changed = this.toIndex !== this.fromIndex;
    const movedColumn = this.startColumnId;
    const finish = () => {
      this.clearVisuals();
      if (changed) this.host.commitColumnOrder(movedColumn, next, true);
      this.teardown();
    };
    window.setTimeout(() => this.host.setSuppressNextHeaderClick(false), 0);
    const ghost = this.ghost;
    const targetXY = this.ghostDropTarget();
    if (!ghost || !targetXY) {
      finish();
      return;
    }
    let done = false;
    const settle = () => {
      if (done) return;
      done = true;
      ghost.removeEventListener("transitionend", onEnd);
      finish();
    };
    const onEnd = (e) => {
      if (e.propertyName === "opacity") settle();
    };
    ghost.addEventListener("transitionend", onEnd);
    window.setTimeout(settle, SETTLE_MS + 60);
    ghost.style.transition = `transform ${SETTLE_MS}ms ease, opacity ${SETTLE_MS}ms ease`;
    void ghost.offsetWidth;
    ghost.style.transform = `translate(${targetXY.x}px, ${targetXY.y}px)`;
    ghost.style.opacity = "0";
  }
  /** Screen-space position the ghost should fly to on drop: the top-left of the gap the source will occupy. */
  ghostDropTarget() {
    const scroller = this.host.scrollerEl();
    const header = this.host.headerCellEl(this.startColumnId);
    if (!scroller || !header) return null;
    const scrollerRect = scroller.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const gapLeft = (this.cellLefts.get(this.startColumnId) ?? 0) + this.dropOffset();
    const x = scrollerRect.left - scroller.scrollLeft + gapLeft;
    return { x, y: headerRect.top };
  }
  clearVisuals() {
    const scroller = this.host.scrollerEl();
    scroller?.classList.remove(REORDERING_CLASS);
    this.host.toggleHostClass("is-dragging", false);
    for (const id of this.orderedIds) {
      this.applyTransform(id, 0);
    }
    this.removeGhost();
  }
  removeGhost() {
    if (!this.ghost) return;
    try {
      this.ghost.hidePopover();
    } catch {
    }
    this.ghost.remove();
    this.ghost = null;
  }
  teardown() {
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointercancel", this.onPointerCancel);
    if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
    if (this.autoScrollRaf) cancelAnimationFrame(this.autoScrollRaf);
    this.rafHandle = 0;
    this.autoScrollRaf = 0;
    this.autoScrollDir = 0;
    this.autoScrollSpeed = 0;
    this.removeGhost();
    this.pending = false;
    this.dragging = false;
    this.settling = false;
    this.activePointerId = -1;
    this.orderedIds = [];
    this.cellCenters.clear();
    this.cellLefts.clear();
    this.cellWidths.clear();
  }
};
function arrayMove(arr, from, to) {
  const copy = arr.slice();
  if (from < 0 || from >= copy.length) return copy;
  const clampedTo = Math.max(0, Math.min(to, copy.length - 1));
  const [item] = copy.splice(from, 1);
  copy.splice(clampedTo, 0, item);
  return copy;
}
function ramp(distanceIntoBand) {
  const t = Math.min(1, Math.max(0, distanceIntoBand / EDGE));
  return 4 + t * 14;
}

export {
  ColumnReorderController,
  arrayMove
};
