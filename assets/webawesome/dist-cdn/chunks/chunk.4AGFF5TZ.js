/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaSortChangeEvent
} from "./chunk.455GWQR6.js";
import {
  WaRowCollapseEvent
} from "./chunk.IH4MZ3VJ.js";
import {
  WaRowExpandEvent
} from "./chunk.N7VNMWU5.js";
import {
  WaRowSelectEvent
} from "./chunk.HVMXE2RX.js";
import {
  WaFilterChangeEvent
} from "./chunk.JK4TQUZJ.js";
import {
  WaDataErrorEvent
} from "./chunk.ALF4VCKI.js";
import {
  WaDataRequestEvent
} from "./chunk.UHBMJLON.js";
import {
  WaCellClickEvent
} from "./chunk.4K7J7YQ2.js";
import {
  WaCellContextmenuEvent
} from "./chunk.I3RXBDXD.js";
import {
  WaColumnMoveEvent
} from "./chunk.6HEL2B57.js";
import {
  WaColumnPinEvent
} from "./chunk.JW4RCUPC.js";
import {
  WaColumnResizeEvent
} from "./chunk.MNFPEYIL.js";
import {
  WaColumnVisibilityChangeEvent
} from "./chunk.URVB4D5Y.js";
import {
  WaPageChangeEvent
} from "./chunk.YZ7B5BWF.js";
import {
  VirtualController
} from "./chunk.QWOPNYM3.js";
import {
  ColumnReorderController,
  arrayMove
} from "./chunk.PCPZO5YO.js";
import {
  data_grid_styles_default
} from "./chunk.GQEZCNOK.js";
import {
  GridNavigationController
} from "./chunk.OHTGMDO6.js";
import {
  TableController,
  constructAggregationFn
} from "./chunk.TFIWMP4R.js";
import {
  visually_hidden_styles_default
} from "./chunk.G2MFXTH4.js";
import {
  normalizeSize,
  warnDeprecatedSize
} from "./chunk.7TN7YXGH.js";
import {
  size_styles_default
} from "./chunk.YO5ITST6.js";
import {
  o as o2
} from "./chunk.BQNDCXAL.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement,
  e as e2,
  n,
  r as r2,
  t as t2
} from "./chunk.2S7VPMOT.js";
import {
  e,
  i,
  t
} from "./chunk.H23DVATU.js";
import {
  M,
  m,
  p,
  r,
  v
} from "./chunk.Y42TKHJ6.js";
import {
  LocalizeController
} from "./chunk.UAD2UIQJ.js";
import {
  o
} from "./chunk.E4Q7ZNYW.js";
import {
  E,
  T,
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.7F23ACLI.js";

// ../../node_modules/lit-html/directives/repeat.js
var u = (e3, s, t3) => {
  const r3 = /* @__PURE__ */ new Map();
  for (let l = s; l <= t3; l++) r3.set(e3[l], l);
  return r3;
};
var c = e(class extends i {
  constructor(e3) {
    if (super(e3), e3.type !== t.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e3, s, t3) {
    let r3;
    void 0 === t3 ? t3 = s : void 0 !== s && (r3 = s);
    const l = [], o3 = [];
    let i2 = 0;
    for (const s2 of e3) l[i2] = r3 ? r3(s2, i2) : i2, o3[i2] = t3(s2, i2), i2++;
    return { values: o3, keys: l };
  }
  render(e3, s, t3) {
    return this.dt(e3, s, t3).values;
  }
  update(s, [t3, r3, c2]) {
    const d = p(s), { values: p2, keys: a } = this.dt(t3, r3, c2);
    if (!Array.isArray(d)) return this.ut = a, p2;
    const h = this.ut ?? (this.ut = []), v2 = [];
    let m2, y, x2 = 0, j = d.length - 1, k = 0, w = p2.length - 1;
    for (; x2 <= j && k <= w; ) if (null === d[x2]) x2++;
    else if (null === d[j]) j--;
    else if (h[x2] === a[k]) v2[k] = v(d[x2], p2[k]), x2++, k++;
    else if (h[j] === a[w]) v2[w] = v(d[j], p2[w]), j--, w--;
    else if (h[x2] === a[w]) v2[w] = v(d[x2], p2[w]), r(s, v2[w + 1], d[x2]), x2++, w--;
    else if (h[j] === a[k]) v2[k] = v(d[j], p2[k]), r(s, d[x2], d[j]), j--, k++;
    else if (void 0 === m2 && (m2 = u(a, k, w), y = u(h, x2, j)), m2.has(h[x2])) if (m2.has(h[j])) {
      const e3 = y.get(a[k]), t4 = void 0 !== e3 ? d[e3] : null;
      if (null === t4) {
        const e4 = r(s, d[x2]);
        v(e4, p2[k]), v2[k] = e4;
      } else v2[k] = v(t4, p2[k]), r(s, d[x2], t4), d[e3] = null;
      k++;
    } else M(d[j]), j--;
    else M(d[x2]), x2++;
    for (; k <= w; ) {
      const e3 = r(s, v2[w + 1]);
      v(e3, p2[k]), v2[k++] = e3;
    }
    for (; x2 <= j; ) {
      const e3 = d[x2++];
      null !== e3 && M(e3);
    }
    return this.ut = a, m(s, v2), T;
  }
});

// _bundle_/src/components/data-grid/data-grid.ts
var SELECT_COL = "__select__";
var EXPAND_COL = "__expand__";
var EMPTY_GROUPING = [];
var WaDataGrid = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.tableController = new TableController(this);
    this.virtualizer = new VirtualController(this);
    this.nav = new GridNavigationController(this, this.navAdapter());
    this.reorder = new ColumnReorderController(this, this.reorderAdapter());
    this.measuredRowHeight = 0;
    /**
     * Memoized TanStack column defs, rebuilt only when `columns` (or a grid flag that feeds the defs) changes.
     * table-core memoizes its row models by the `columns` reference, so a fresh array every render would thrash.
     */
    this.columnDefsCache = null;
    this.columnDefsKey = "";
    /** The table synced for the CURRENT render pass, so the many `syncTable()` callers reuse one synced instance. */
    this.renderTable = null;
    /** Set true by the reorder controller when a drag started, so the next header click doesn't also sort. */
    this.suppressNextHeaderClick = false;
    this.data = [];
    this.columns = [];
    this.rowKey = null;
    this.selectableRows = null;
    this.selectable = "none";
    this.paginate = false;
    this.pageSize = 20;
    this.pageSizeOptions = [10, 20, 50, 100];
    this.page = 0;
    this.withoutSortRemoval = false;
    this.sortDescFirst = false;
    this.maxMultiSort = 0;
    this.withSearch = false;
    this.searchTerm = "";
    this.resizable = false;
    this.reorderable = false;
    this.pinnable = false;
    this.withColumnMenu = false;
    this.withColumnsMenu = false;
    this.striped = false;
    this.rowDetail = null;
    this.rowClass = null;
    this.childRows = null;
    this.filterFromLeafRows = false;
    this.groupBy = null;
    this.dataSource = null;
    this.server = false;
    this.filterDebounce = 250;
    this.searchFn = null;
    this.total = -1;
    this.loading = false;
    this.label = null;
    this.appearance = "outlined";
    this.size = "m";
    this.selectionState = {};
    /**
     * Row index of the last checkbox toggled without Shift; the anchor for Shift-click range selection. Not state — it
     * only seeds the next range and never affects rendering.
     */
    this.selectionAnchorIndex = null;
    this.sortingState = [];
    this.columnFiltersState = [];
    this.openFilterColumn = null;
    this.filterOptionQuery = "";
    this.columnVisibilityState = {};
    this.columnSizingState = {};
    this.headerMinWidths = {};
    this.columnPinningState = { left: [], right: [] };
    this.expandedState = {};
    this.columnOrderState = [];
    this.activeCell = null;
    this.liveAnnouncement = "";
    /** Tracks in-flight server requests so stale responses can be ignored (race-safe). */
    this.requestToken = 0;
    this.abortController = null;
    /** Set by resetPage() so the resulting page-watcher fetch keeps the search/filter caller's debounce intent. */
    this.pageResetPending = false;
    /** Set by setState() so the searchTerm watcher's resetPage() can't clobber a page restored in the same batch. */
    this.suppressPageReset = false;
    /**
     * Resolves a stable id for a row using `rowKey`. Without one, sub-rows fall back to table-core's `parent.index`
     * convention so ids stay unique across tree depths.
     */
    this.getRowId = (row, index, parent) => {
      if (this.rowKey && row[this.rowKey] != null) {
        return String(row[this.rowKey]);
      }
      return parent ? `${parent.id}.${index}` : String(index);
    };
    /**
     * The normalized grouping state. Tree data and grouping don't compose (tree rows win), and server mode owns its own
     * shaping — grouping a single loaded page client-side would produce misleading per-page groups. Memoized by value:
     * table-core's grouped row model is keyed on this array's REFERENCE, so a fresh array per render would re-group
     * (and re-sort, re-expand, re-paginate) the whole dataset on every render — including every scroll frame.
     */
    this.groupingCache = null;
    /**
     * A stable `getSubRows` accessor for table-core, cached by the `childRows` value so its identity doesn't churn
     * between syncs (a new function each sync would look like an option change on every render).
     */
    this.subRowsAccessorCache = null;
    /**
     * id → column lookup, rebuilt once per render pass. `columnById` runs for every cell of every rendered row, so a
     * linear scan over `columns` would be O(columns²·rows) per frame on wide grids.
     */
    this.columnMap = /* @__PURE__ */ new Map();
    /**
     * Stable identity counter for per-column functions (comparator, custom filterFn) so swapping one (a new function
     * reference) invalidates the columnDefs memo.
     */
    this.functionIds = /* @__PURE__ */ new WeakMap();
    this.nextFunctionId = 1;
    /**
     * Wraps the consumer's friendly `searchFn(value, term, row)` as a table-core global filter fn, cached by the
     * function's identity so table-core doesn't see a new option every render.
     */
    this.searchFnCache = null;
    /**
     * The initial column visibility computed from `hidden` column flags, merged with user toggles. Memoized by value —
     * table-core invalidates every row's visible-cells memo when this object's reference changes, so a fresh object per
     * render would recompute the whole visible window per frame.
     */
    this.visibilityCache = null;
    /**
     * The pagination slice, memoized by value — table-core's pagination row model re-slices whenever this object's
     * reference changes. When `paginate` is off it's a neutralizing slice (see `syncTable`).
     */
    this.paginationSliceCache = { pageIndex: 0, pageSize: Number.MAX_SAFE_INTEGER };
    /**
     * The grid's `'left'`/`'right'` pinning state translated to table-core v9's logical `start`/`end` slice, memoized by
     * the state object's reference — table-core's pinning memos key on this object's identity, so a fresh object per
     * render would recompute pinned offsets and header groups every frame.
     */
    this.pinningSliceCache = null;
    /** True only while `render()` is executing, so `syncTable()` can safely reuse one synced instance per pass. */
    this.inRenderPass = false;
    /**
     * The server renders from markup alone, so JS-only properties are at their class defaults in the server DOM.
     * Assigning `columns`/`data` before the first client update (typical right after `whenDefined`) would make the
     * hydration render diverge from that DOM and throw. Park those properties for the hydration render;
     * `restoreHydrationStash()` re-applies them right after, through the same watchers as any post-render assignment.
     */
    this.hydrationStash = null;
    /** Set by the columns/size watchers so `updated()` re-measures header floors once the new headers are laid out. */
    this.headerMinWidthsDirty = false;
    /**
     * Applies each column's declarative `pinned` side once per column id. Seeding is once-only so a user unpinning a
     * `pinned: 'left'` column isn't fought by the next render; `resetState()` clears the ledger to re-apply defaults.
     */
    this.seededPinIds = /* @__PURE__ */ new Set();
    /** The sticky header rowgroup's height, cached until a size change or viewport resize invalidates it. */
    this.measuredHeaderHeight = 0;
    /**
     * Per-row detail panel heights, measured from the DOM after each render (see `updated()`). Panels can have
     * different heights per row, and a panel doesn't exist in the DOM until the render AFTER its row expands — so
     * `estimateSize` reads this cache and the post-render measurement corrects any first-expansion guess.
     */
    this.detailHeights = /* @__PURE__ */ new Map();
    /**
     * Measures every rendered detail panel and, when any height changed since the last pass, re-runs the virtualizer's
     * size estimates so row positions match reality. Runs from `updated()` — the panels are committed to the DOM there.
     */
    /** Watches rendered detail panels: content that grows after commit (async images, lazy content) has no render
     *  to re-measure it, so size changes re-run the measurement. Subscriptions refresh per render (recycled DOM). */
    this.detailResizeObserver = null;
    /** The selection as it was when the current Shift+Arrow range began; the range replaces, not unions, on top of it. */
    this.rangeBaseSelection = null;
    /** Debounce timer + microtask flag for the fetch scheduler, plus the last-issued request key for deduping. */
    this.fetchDebounceTimer = null;
    this.fetchQueued = false;
    this.fetchForce = false;
    this.lastRequestKey = null;
    /** Tears down an in-flight resize drag's window listeners (drag interrupted or the grid disconnected). */
    this.cancelResizeDrag = null;
    /**
     * Lazily mirrors a truncated text cell's content into `title` on hover, so the ellipsis-hidden text is
     * recoverable without paying a per-render measurement sweep (titles only ever show on pointer hover anyway).
     */
    this.handleCellPointerOver = (event) => {
      const el = event.target.closest?.(".cell-content-text");
      if (!el) return;
      if (el.scrollWidth > el.clientWidth + 1) {
        const text = el.textContent?.trim() ?? "";
        if (text && el.title !== text) el.title = text;
      } else if (el.title) {
        el.removeAttribute("title");
      }
    };
    //
    // aria-live
    //
    /** Alternates an invisible suffix so repeating the same message still mutates the DOM — AT only re-announces on change. */
    this.announceTick = false;
    //
    // Rendering
    //
    /** The rows array from the previous pass. Its identity changes exactly when the index → row mapping does. */
    this.previousRows = null;
    /**
     * Keeps the roving-tabindex coordinate in sync with pointer interactions: clicking (and therefore focusing) any
     * cell makes it the active cell, per the APG grid pattern, so the next arrow key navigates from where the user
     * actually is. Focus moves from our own keyboard nav land on the already-active coordinate and no-op.
     */
    this.handleTableFocusIn = (event) => {
      const cell = event.target?.closest?.("[data-row-index][data-col-id]");
      if (!cell) return;
      const row = Number(cell.dataset.rowIndex);
      const col = cell.dataset.colId;
      if (!Number.isNaN(row) && !this.isActive(row, col)) {
        this.activeCell = { row, col };
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.isSelectable && !this.rowKey) {
      console.warn("<wa-data-grid> with `selectable` should set `row-key` for stable selection across sort and pages.");
    }
  }
  get isSelectable() {
    return this.selectable === "" || this.selectable === "single" || this.selectable === "multiple";
  }
  get selectionMode() {
    if (this.selectable === "single") return "single";
    if (this.selectable === "" || this.selectable === "multiple") return "multiple";
    return "none";
  }
  /** The canonical size passed to child form controls (never a deprecated alias). */
  get controlSize() {
    return normalizeSize(this.size);
  }
  /** Whether the grid renders hierarchical (tree) rows. */
  get hasTreeRows() {
    return this.childRows !== null;
  }
  get grouping() {
    if (this.groupBy == null || this.hasTreeRows || this.isManual) return EMPTY_GROUPING;
    const parts = Array.isArray(this.groupBy) ? this.groupBy : this.groupBy.split(/[\s,]+/).filter(Boolean);
    const key = parts.join(" ");
    if (this.groupingCache?.key !== key) this.groupingCache = { key, value: parts };
    return this.groupingCache.value;
  }
  /** Whether row grouping is active. */
  get isGrouped() {
    return this.grouping.length > 0;
  }
  /**
   * Whether rows form a hierarchy (tree data or grouping) — drives treegrid semantics, indentation, and the
   * parent→descendant selection cascade.
   */
  get hasHierarchy() {
    return this.hasTreeRows || this.isGrouped;
  }
  /** Whether an expand-toggle control column is rendered (detail panels, tree rows, or grouped rows). */
  get hasExpandColumn() {
    return this.rowDetail !== null || this.hasHierarchy;
  }
  subRowsAccessor() {
    const key = this.childRows;
    if (key == null) return void 0;
    if (this.subRowsAccessorCache?.key === key) return this.subRowsAccessorCache.fn;
    const resolve = typeof key === "function" ? key : (row) => getByPath(row, key);
    const fn = (row) => {
      const value = resolve(row);
      return Array.isArray(value) ? value : void 0;
    };
    this.subRowsAccessorCache = { key, fn };
    return fn;
  }
  /** Returns the column id used by table-core for a given column definition. */
  columnId(col, index) {
    return col.id ?? col.field ?? `col-${index}`;
  }
  rebuildColumnMap() {
    this.columnMap.clear();
    this.columns.forEach((col, index) => this.columnMap.set(this.columnId(col, index), col));
  }
  /** Looks up a column definition by the id table-core uses for it. */
  columnById(id) {
    const cached = this.columnMap.get(id);
    if (cached) return cached;
    return this.columns.find((col, index) => this.columnId(col, index) === id);
  }
  /** Whether a column can be resized, considering the grid-level and per-column settings. */
  columnResizable(col) {
    return col.resizable ?? this.resizable;
  }
  /** Whether a column can be reordered, considering the grid-level and per-column settings. */
  columnMovableFor(col) {
    return col.movable ?? this.reorderable;
  }
  /** Whether a column can be pinned, considering the grid-level and per-column settings. */
  columnPinnableFor(col) {
    return col.pinnable ?? this.pinnable;
  }
  //
  // Column pinning
  //
  /** Pins a column to the `'left'` or `'right'` edge, or unpins it with `false`. */
  pinColumn(columnId, side) {
    if (side !== false && this.columnSizingState[columnId] == null && this.columnById(columnId)?.width == null) {
      const width = this.headerCellEl(columnId)?.getBoundingClientRect().width;
      if (width && width > 0) {
        this.columnSizingState = { ...this.columnSizingState, [columnId]: Math.round(width) };
      }
    }
    const left = (this.columnPinningState.left ?? []).filter((id) => id !== columnId);
    const right = (this.columnPinningState.right ?? []).filter((id) => id !== columnId);
    if (side === "left") left.push(columnId);
    else if (side === "right") right.unshift(columnId);
    this.columnPinningState = { left, right };
  }
  /** Returns which edge a column is pinned to, or `false` if it isn't pinned. */
  getColumnPin(columnId) {
    if ((this.columnPinningState.left ?? []).includes(columnId)) return "left";
    if ((this.columnPinningState.right ?? []).includes(columnId)) return "right";
    return false;
  }
  /**
   * Translates `DataGridColumn[]` into TanStack column defs, memoized so table-core's row-model memos don't thrash on
   * a fresh array each render. The memo key is a STRUCTURAL signature of every field the builder reads, not the
   * `columns` reference — `columns` is `hasChanged: () => true` (in-place mutation is supported), so a reference-
   * identity memo would serve stale defs after such an edit.
   */
  buildColumnDefs() {
    const key = this.columnDefsSignature();
    if (this.columnDefsCache && this.columnDefsKey === key) {
      return this.columnDefsCache;
    }
    const defs = this.buildColumnDefsUncached();
    this.columnDefsCache = defs;
    this.columnDefsKey = key;
    return defs;
  }
  functionId(fn) {
    let id = this.functionIds.get(fn);
    if (id == null) {
      id = this.nextFunctionId++;
      this.functionIds.set(fn, id);
    }
    return id;
  }
  /** A structural signature of every component/column field that feeds `buildColumnDefsUncached`. */
  columnDefsSignature() {
    const cols = this.columns.map((c2, i2) => {
      const cmp = c2.comparator ? this.functionId(c2.comparator) : 0;
      const flt = c2.filterFn ? this.functionId(c2.filterFn) : 0;
      const val = c2.value ? this.functionId(c2.value) : 0;
      const agg = typeof c2.aggregation === "function" ? this.functionId(c2.aggregation) : c2.aggregation ?? "";
      return [
        this.columnId(c2, i2),
        c2.field ?? "",
        c2.label ?? "",
        c2.sortable ?? "",
        c2.sortFn ?? "",
        c2.sortDescFirst ?? "",
        c2.sortUndefined ?? "",
        c2.filterable ?? "",
        c2.filterType ?? "",
        c2.hideable ?? "",
        c2.resizable ?? "",
        c2.width ?? "",
        c2.minWidth ?? "",
        c2.maxWidth ?? "",
        cmp,
        flt,
        agg,
        val
      ];
    });
    return JSON.stringify([this.resizable, cols]);
  }
  buildColumnDefsUncached() {
    return this.columns.map((col, index) => {
      const id = this.columnId(col, index);
      const def = {
        id,
        header: col.label ?? "",
        enableSorting: col.sortable ?? Boolean(col.field || col.value),
        ...col.sortDescFirst != null ? { sortDescFirst: col.sortDescFirst } : {},
        ...col.sortUndefined != null ? { sortUndefined: col.sortUndefined } : {},
        enableColumnFilter: Boolean(col.filterable),
        enableHiding: col.hideable ?? true,
        enableResizing: this.columnResizable(col),
        ...col.value ? { accessorFn: (row) => col.value(row) } : col.field ? { accessorFn: (row) => getByPath(row, col.field) } : {},
        ...col.width ? { size: col.width } : {},
        ...col.minWidth ? { minSize: col.minWidth } : {},
        ...col.maxWidth ? { maxSize: col.maxWidth } : {},
        // table-core applies the asc/desc direction itself; the comparator returns ascending order only. A custom
        // comparator wins over a built-in sortFn name.
        ...col.comparator ? {
          sortFn: (rowA, rowB) => col.comparator(rowA.getValue(id), rowB.getValue(id), rowA.original, rowB.original)
        } : col.sortFn ? { sortFn: col.sortFn } : {},
        ...col.filterable ? { filterFn: this.resolveFilterFn(col) } : {},
        ...col.aggregation ? {
          aggregationFn: typeof col.aggregation === "function" ? (
            // Adapt the friendly (values, rows) signature to table-core's context-based definition. The
            // context's `rows` are the group's data rows (all leaves under the group), matching v8's
            // leafRows argument.
            constructAggregationFn({
              aggregate: ({ rows, getValue }) => col.aggregation(
                rows.map((r3) => getValue(r3)),
                rows.map((r3) => r3.original)
              )
            })
          ) : col.aggregation
        } : {}
      };
      return def;
    });
  }
  resolveSearchFn() {
    const key = this.searchFn;
    if (this.searchFnCache?.key === key) return this.searchFnCache.fn;
    const fn = (row, columnId, filterValue) => key(row.getValue(columnId), String(filterValue ?? ""), row.original);
    this.searchFnCache = { key, fn };
    return fn;
  }
  /** Maps a column's `filterType`/custom `filterFn` to a table-core filter function (name or predicate). */
  resolveFilterFn(col) {
    if (col.filterFn) {
      const fn = (row, columnId, filterValue) => col.filterFn(row.getValue(columnId), filterValue, row.original);
      return fn;
    }
    switch (col.filterType) {
      case "equals":
        return "equalsString";
      case "number-range":
        return "inNumberRange";
      case "date-range": {
        const fn = (row, columnId, filterValue) => {
          if (!Array.isArray(filterValue)) return true;
          const [from, to] = filterValue;
          const day = toDayNumber(row.getValue(columnId));
          if (day == null) return false;
          const fromDay = from ? toDayNumber(from) : null;
          const toDay = to ? toDayNumber(to) : null;
          if (fromDay != null && day < fromDay) return false;
          if (toDay != null && day > toDay) return false;
          return true;
        };
        return fn;
      }
      case "includes-any":
        return "arrIncludesSome";
      case "includes-all":
        return "arrIncludesAll";
      case "set": {
        const fn = (row, columnId, filterValue) => Array.isArray(filterValue) && filterValue.map(String).includes(String(row.getValue(columnId)));
        return fn;
      }
      case "text":
      default:
        return "includesString";
    }
  }
  get effectiveVisibility() {
    const key = this.columns.map((col, index) => `${this.columnId(col, index)}:${col.hidden ? 1 : 0}`).join("|");
    if (this.visibilityCache?.key === key && this.visibilityCache.state === this.columnVisibilityState) {
      return this.visibilityCache.value;
    }
    const base = {};
    this.columns.forEach((col, index) => {
      if (col.hidden) base[this.columnId(col, index)] = false;
    });
    const value = { ...base, ...this.columnVisibilityState };
    this.visibilityCache = { key, state: this.columnVisibilityState, value };
    return value;
  }
  get paginationSlice() {
    const pageIndex = this.paginate ? this.page : 0;
    const pageSize = this.paginate ? this.pageSize : Number.MAX_SAFE_INTEGER;
    if (this.paginationSliceCache.pageIndex !== pageIndex || this.paginationSliceCache.pageSize !== pageSize) {
      this.paginationSliceCache = { pageIndex, pageSize };
    }
    return this.paginationSliceCache;
  }
  get pinningSlice() {
    if (this.pinningSliceCache?.key !== this.columnPinningState) {
      this.pinningSliceCache = {
        key: this.columnPinningState,
        value: { start: [...this.columnPinningState.left ?? []], end: [...this.columnPinningState.right ?? []] }
      };
    }
    return this.pinningSliceCache.value;
  }
  /** Whether the grid is in manual (server) mode. */
  get isManual() {
    return this.server || this.dataSource !== null;
  }
  syncTable() {
    if (this.inRenderPass && this.renderTable) return this.renderTable;
    const manual = this.isManual;
    const table = this.tableController.getTable({
      data: this.data ?? [],
      columns: this.buildColumnDefs(),
      getRowId: this.getRowId,
      enableSorting: true,
      enableMultiSort: true,
      enableSortingRemoval: !this.withoutSortRemoval,
      sortDescFirst: this.sortDescFirst,
      ...this.maxMultiSort > 0 ? { maxMultiSortColCount: this.maxMultiSort } : {},
      // Lets consumers lock individual rows; row.getCanSelect() then drives the disabled checkbox and excludes the
      // row from select-all / range selection. Group rows are synthetic — never selected themselves (their checkbox
      // cascades to leaf rows with derived state).
      enableRowSelection: (row) => {
        if (row.getIsGrouped()) return false;
        return this.isSelectable && (this.selectableRows ? this.selectableRows(row.original) : true);
      },
      enableMultiRowSelection: this.selectionMode === "multiple",
      enableColumnResizing: true,
      columnResizeMode: "onChange",
      enableColumnPinning: true,
      enablePagination: this.paginate,
      enableGlobalFilter: true,
      // Deterministic per-column search gate. table-core's default samples row 0's value and silently excludes the
      // column when that happens to be null/non-primitive — search behavior must not depend on the first row's shape.
      getColumnCanGlobalFilter: (column) => {
        const col = this.columnById(column.id);
        return Boolean(col?.field || col?.value) && (col?.searchable ?? true);
      },
      ...this.searchFn ? { globalFilterFn: this.resolveSearchFn() } : {},
      // Tree data: sub-rows come from `childRows`; the expanded row model flattens expanded subtrees into the visible
      // rows. When paginating, `paginateExpandedRows: false` defers flattening to the pagination row model so an
      // expanded subtree rides on its parent's page instead of splitting across pages — but WITHOUT pagination it
      // must stay `true`, or table-core skips flattening and children never render.
      enableExpanding: this.hasHierarchy,
      ...this.hasTreeRows ? { getSubRows: this.subRowsAccessor() } : {},
      // Grouping buckets rows by the grouping state; grouped columns stay in place (no auto-reorder).
      enableGrouping: this.isGrouped,
      groupedColumnMode: false,
      // In server mode the pagination row model is never wired, so flattening must stay in the expanded row model —
      // only client-side pagination defers it.
      paginateExpandedRows: !this.paginate || manual,
      filterFromLeafRows: this.filterFromLeafRows,
      autoResetExpanded: false,
      // table-core's page reset would be clobbered by the controlled pagination slice; the component clamps `page`
      // itself when data shrinks (see handleDataChange).
      autoResetPageIndex: false,
      // In server mode, table-core trusts the pre-processed data and skips client-side transforms.
      manualSorting: manual,
      manualFiltering: manual,
      manualPagination: manual,
      ...manual && this.total >= 0 ? { rowCount: this.total } : {},
      // The component owns these slices as reactive properties; table-core owns the rest. The pagination slice is
      // neutralized (not just un-wired) when `paginate` is off: table-core caches its pagination row model forever,
      // so toggling `paginate` off would otherwise leave the grid sliced to a stale page size.
      controlledState: {
        sorting: this.sortingState,
        rowSelection: this.selectionState,
        pagination: this.paginationSlice,
        globalFilter: this.searchTerm,
        columnFilters: this.columnFiltersState,
        columnVisibility: this.effectiveVisibility,
        columnSizing: this.columnSizingState,
        columnOrder: this.columnOrderState,
        columnPinning: this.pinningSlice,
        expanded: this.expandedState,
        grouping: this.grouping
      }
    });
    if (this.inRenderPass) this.renderTable = table;
    return table;
  }
  firstUpdated() {
    if (!o) {
      if (!this.activeCell) {
        const cols = this.focusableColumnIds();
        if (cols.length > 0) this.activeCell = { row: -1, col: cols[0] };
      }
      this.virtualizer.setResizeSettledCallback(() => {
        this.measuredRowHeight = 0;
        this.measuredHeaderHeight = 0;
        this.virtualizer.clearMeasurements();
        this.requestUpdate();
      });
      this.requestUpdate();
      this.freezePinnedColumnWidths();
      this.refreshHeaderMinWidths();
      if (this.isManual) this.requestServerData({ force: true });
      this.restoreHydrationStash();
    }
  }
  /** Freezes the rendered width of any pinned column that has neither an explicit `width` nor a sizing entry. */
  freezePinnedColumnWidths() {
    const pinnedIds = [...this.columnPinningState.left ?? [], ...this.columnPinningState.right ?? []];
    let sizing = null;
    for (const id of pinnedIds) {
      if (this.columnSizingState[id] != null || this.columnById(id)?.width != null) continue;
      const width = this.headerCellEl(id)?.getBoundingClientRect().width;
      if (width && width > 0) {
        sizing ?? (sizing = { ...this.columnSizingState });
        sizing[id] = Math.round(width);
      }
    }
    if (sizing) this.columnSizingState = sizing;
  }
  /**
   * Measures each fixed-width (non-flex) column's header-label floor from the rendered headers and stores any that
   * differ, so `columnStyle` can widen a column whose explicit `width` is narrower than its own label. Flex columns
   * are skipped — they already grow to fit and clip only when space is genuinely tight. Runs after layout (headers
   * must exist) and re-runs when columns or size change. Only triggers a re-render when a value actually changed.
   */
  refreshHeaderMinWidths() {
    if (o || !this.shadowRoot) return;
    const next = {};
    let changed = false;
    this.columns.forEach((col, index) => {
      const id = this.columnId(col, index);
      if (col.flex != null) return;
      const floor = this.measureHeaderMinWidth(id);
      if (floor > 0) {
        next[id] = floor;
        if (this.headerMinWidths[id] !== floor) changed = true;
      }
    });
    if (!changed) {
      for (const id of Object.keys(this.headerMinWidths)) {
        if (next[id] == null) {
          changed = true;
          break;
        }
      }
    }
    if (changed) this.headerMinWidths = next;
  }
  /** Focuses the grid by focusing the active (roving-tabindex) cell. */
  focus(options) {
    if (o) return;
    if (!this.activeCell) {
      const cols = this.focusableColumnIds();
      if (cols.length > 0) this.activeCell = { row: -1, col: cols[0] };
    }
    const focusActive = () => {
      const active = this.activeCell;
      if (!active) {
        super.focus(options);
        return false;
      }
      const el = this.shadowRoot?.querySelector(
        `[data-row-index="${active.row}"][data-col-id="${cssId(active.col)}"]`
      );
      if (el) {
        el.focus(options);
        return true;
      }
      return false;
    };
    if (!focusActive()) {
      void this.updateComplete.then(() => focusActive());
    }
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (!o && this.didSSR && !this.hasUpdated) this.stashForHydration();
    if (!this.hasUpdated) this.seedDeclarativePins();
  }
  stashForHydration() {
    if (this.hydrationStash) return;
    const serverValues = {
      // JS-only (attribute: false) properties: the server always rendered their class defaults.
      data: [],
      columns: [],
      pageSizeOptions: [10, 20, 50, 100],
      // mirrors the property default
      selectableRows: null,
      rowDetail: null,
      rowClass: null,
      dataSource: null,
      searchFn: null,
      searchTerm: "",
      // Attribute-backed properties that accept richer values via JS: the server only ever saw the attribute.
      childRows: this.getAttribute("child-rows"),
      groupBy: this.getAttribute("group-by"),
      loading: this.hasAttribute("loading")
    };
    this.hydrationStash = /* @__PURE__ */ new Map();
    for (const [key, serverValue] of Object.entries(serverValues)) {
      this.hydrationStash.set(key, this[key]);
      this[key] = serverValue;
    }
  }
  restoreHydrationStash() {
    if (!this.hydrationStash) return;
    const stash = this.hydrationStash;
    this.hydrationStash = null;
    for (const [key, value] of stash) {
      this[key] = value;
    }
    if (!this.activeCell) {
      const cols = this.focusableColumnIds();
      if (cols.length > 0) this.activeCell = { row: -1, col: cols[0] };
    }
  }
  update(changedProperties) {
    try {
      super.update(changedProperties);
    } finally {
      this.inRenderPass = false;
      this.renderTable = null;
    }
  }
  updated() {
    this.suppressPageReset = false;
    if (this.reorder.isDragging) {
      this.reorder.stampTransforms();
    }
    this.measureRenderedDetailPanels();
    if (this.headerMinWidthsDirty && this.hasUpdated) {
      this.headerMinWidthsDirty = false;
      this.refreshHeaderMinWidths();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.abortController?.abort();
    this.abortController = null;
    if (this.fetchDebounceTimer !== null) {
      clearTimeout(this.fetchDebounceTimer);
      this.fetchDebounceTimer = null;
    }
    this.detailResizeObserver?.disconnect();
    this.detailResizeObserver = null;
    this.cancelResizeDrag?.();
  }
  handleDataSourceChange() {
    if (this.isManual) {
      this.requestServerData({ force: true });
    } else {
      this.abortController?.abort();
      this.abortController = null;
      this.requestToken++;
      this.lastRequestKey = null;
      this.loading = false;
    }
  }
  handlePageChange() {
    if (this.clampPage()) return;
    this.resetSelectionAnchor();
    this.nav.clampActiveRow();
    const debounce = this.pageResetPending;
    this.pageResetPending = false;
    this.requestServerData({ debounce });
  }
  /**
   * Clamps `page` into the valid range when the row count is known: client mode always is; server mode only once
   * `total` reports. Returns true when a correction was applied (assigning re-fires the page watcher).
   */
  clampPage() {
    if (this.paginate && (!this.isManual || this.total >= 0)) {
      const clamped = Math.max(0, Math.min(this.page, this.pageCount - 1));
      if (clamped !== this.page) {
        this.page = clamped;
        return true;
      }
    }
    return false;
  }
  handlePageSizeWatch() {
    if (this.clampPage()) return;
    this.resetSelectionAnchor();
    this.nav.clampActiveRow();
    this.requestServerData();
  }
  handleGroupByWatch() {
    this.clampPage();
    this.nav.clampActiveRow();
  }
  handleTotalChange() {
    if (this.isManual) this.clampPage();
  }
  handleSearchTermChange() {
    this.resetPage();
    this.resetSelectionAnchor();
    this.nav.clampActiveRow();
    this.requestServerData({ debounce: true });
  }
  /** Returns to the first page (search/filter changes invalidate the current page), emitting `wa-page-change`. */
  resetPage() {
    if (this.suppressPageReset) {
      this.suppressPageReset = false;
      return;
    }
    if (!this.paginate || this.page === 0) return;
    this.pageResetPending = true;
    this.page = 0;
    this.dispatchEvent(new WaPageChangeEvent({ page: this.page, pageSize: this.pageSize }));
  }
  handleDataChange() {
    if (this.paginate && !this.isManual && this.page > 0) {
      this.page = Math.min(this.page, this.pageCount - 1);
    }
    this.nav.clampActiveRow();
    this.warnOnDuplicateRowKeys();
  }
  /**
   * Colliding row ids silently break selection (selecting one row selects its twins) and keyed rendering, so warn
   * once per data assignment when `rowKey` values aren't unique among top-level rows.
   */
  warnOnDuplicateRowKeys() {
    if (o || !this.rowKey || !Array.isArray(this.data)) return;
    const seen = /* @__PURE__ */ new Set();
    for (const row of this.data) {
      const key = row?.[this.rowKey];
      if (key == null) continue;
      const id = String(key);
      if (seen.has(id)) {
        console.warn(`<wa-data-grid> duplicate row-key value "${id}" \u2014 row keys must uniquely identify each row.`);
        return;
      }
      seen.add(id);
    }
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
    this.headerMinWidthsDirty = true;
    if (!o) this.setAttribute("size", this.size);
    this.measuredRowHeight = 0;
    this.measuredHeaderHeight = 0;
    this.virtualizer.clearMeasurements();
  }
  handleColumnsChange() {
    const knownIds = new Set(this.columns.map((col, index) => this.columnId(col, index)));
    if (this.columnOrderState.length > 0) {
      const filtered = this.columnOrderState.filter((id) => knownIds.has(id));
      const missing = [...knownIds].filter((id) => !filtered.includes(id));
      this.columnOrderState = [...filtered, ...missing];
    }
    const sizing = {};
    for (const id of Object.keys(this.columnSizingState)) {
      if (knownIds.has(id)) sizing[id] = this.columnSizingState[id];
    }
    this.columnSizingState = sizing;
    const visibility = {};
    for (const id of Object.keys(this.columnVisibilityState)) {
      if (knownIds.has(id)) visibility[id] = this.columnVisibilityState[id];
    }
    this.columnVisibilityState = visibility;
    const left = (this.columnPinningState.left ?? []).filter((id) => knownIds.has(id));
    const right = (this.columnPinningState.right ?? []).filter((id) => knownIds.has(id));
    if (left.length !== (this.columnPinningState.left ?? []).length || right.length !== (this.columnPinningState.right ?? []).length) {
      this.columnPinningState = { left, right };
    }
    if (this.sortingState.some((s) => !knownIds.has(s.id))) {
      this.sortingState = this.sortingState.filter((s) => knownIds.has(s.id));
    }
    if (this.columnFiltersState.some((f) => !knownIds.has(f.id))) {
      this.columnFiltersState = this.columnFiltersState.filter((f) => knownIds.has(f.id));
    }
    for (const id of [...this.seededPinIds]) {
      if (!knownIds.has(id)) this.seededPinIds.delete(id);
    }
    this.seedDeclarativePins();
    this.reseatActiveColumn();
    this.headerMinWidthsDirty = true;
  }
  seedDeclarativePins() {
    this.columns.forEach((col, index) => {
      const id = this.columnId(col, index);
      if (!col.pinned || this.seededPinIds.has(id)) return;
      this.seededPinIds.add(id);
      if (!this.getColumnPin(id)) this.pinColumn(id, col.pinned);
    });
  }
  measureHeaderHeight() {
    if (this.measuredHeaderHeight > 0) return this.measuredHeaderHeight;
    if (o) return 0;
    const header = this.shadowRoot?.querySelector('[part~="header"]');
    if (header) this.measuredHeaderHeight = header.offsetHeight;
    return this.measuredHeaderHeight;
  }
  measureRowHeight() {
    if (this.measuredRowHeight > 0) return this.measuredRowHeight;
    if (o) return 40;
    let probe = this.shadowRoot?.querySelector('[part~="body"] .row-main');
    let throwawayProbe = null;
    if (!probe && this.shadowRoot) {
      throwawayProbe = document.createElement("div");
      throwawayProbe.style.cssText = "position: absolute; visibility: hidden; pointer-events: none; width: 0; height: var(--row-height)";
      this.shadowRoot.appendChild(throwawayProbe);
      probe = throwawayProbe;
    }
    if (probe) {
      const h = Math.round(probe.getBoundingClientRect().height);
      if (h > 0) this.measuredRowHeight = h;
    }
    throwawayProbe?.remove();
    return this.measuredRowHeight || 40;
  }
  /** The best-known height of a row's expanded detail panel: its last measured height, else a rough default. */
  estimateDetailHeight(rowId) {
    return this.detailHeights.get(rowId) ?? 80;
  }
  measureDetailHeights() {
    let changed = false;
    for (const panel of this.shadowRoot.querySelectorAll(".detail-content[data-row-id]")) {
      const rowId = panel.dataset.rowId;
      const height = Math.round(panel.getBoundingClientRect().height);
      if (height > 0 && Math.abs((this.detailHeights.get(rowId) ?? 0) - height) > 1) {
        this.detailHeights.set(rowId, height);
        changed = true;
      }
    }
    return changed;
  }
  measureRenderedDetailPanels() {
    if (o || this.rowDetail === null || !this.shadowRoot || this.virtualizer.isResizing) return;
    this.detailResizeObserver ?? (this.detailResizeObserver = new ResizeObserver(() => {
      if (this.virtualizer.isResizing) return;
      if (this.measureDetailHeights()) this.virtualizer.clearMeasurements();
    }));
    this.detailResizeObserver.disconnect();
    for (const panel of this.shadowRoot.querySelectorAll(".detail-content[data-row-id]")) {
      this.detailResizeObserver.observe(panel);
    }
    if (this.measureDetailHeights()) this.virtualizer.clearMeasurements();
  }
  //
  // Sorting
  //
  handleHeaderClick(columnId, multi) {
    if (this.suppressNextHeaderClick) {
      this.suppressNextHeaderClick = false;
      return;
    }
    this.handleSort(columnId, multi);
  }
  /** The first sort direction for a column: per-column `sortDescFirst` overrides the grid-level default. */
  firstSortDesc(columnId) {
    return this.columnById(columnId)?.sortDescFirst ?? this.sortDescFirst;
  }
  handleSort(columnId, multi) {
    const existing = this.sortingState.find((s) => s.id === columnId);
    const descFirst = this.firstSortDesc(columnId);
    let next;
    if (!existing) {
      const entry = { id: columnId, desc: descFirst };
      if (multi) {
        let base = this.sortingState;
        if (this.maxMultiSort > 0 && base.length >= this.maxMultiSort) {
          base = base.slice(base.length - (this.maxMultiSort - 1));
        }
        next = [...base, entry];
      } else {
        next = [entry];
      }
    } else if (existing.desc === descFirst) {
      const entry = { id: columnId, desc: !descFirst };
      next = multi ? this.sortingState.map((s) => s.id === columnId ? entry : s) : [entry];
    } else if (!this.withoutSortRemoval) {
      next = this.sortingState.filter((s) => s.id !== columnId);
    } else {
      const entry = { id: columnId, desc: descFirst };
      next = multi ? this.sortingState.map((s) => s.id === columnId ? entry : s) : [entry];
    }
    this.commitSort(next);
  }
  /** Sets a single column's sort to an explicit direction (used by the column menu, which isn't a cycle). */
  setColumnSort(columnId, desc) {
    this.commitSort([{ id: columnId, desc }]);
  }
  /** Clears the sort on a single column (column-menu "Clear sort"). */
  clearColumnSort(columnId) {
    this.commitSort(this.sortingState.filter((s) => s.id !== columnId));
  }
  /** Applies a new sort state, announces, emits, and refetches in server mode. */
  commitSort(next) {
    this.sortingState = next;
    this.resetSelectionAnchor();
    this.dispatchEvent(new WaSortChangeEvent({ sort: next.map((s) => ({ id: s.id, desc: s.desc })) }));
    this.requestServerData();
  }
  /** Get/set the sort state declaratively, e.g. `[{ id: 'name', desc: false }]`. */
  get sort() {
    return this.sortingState;
  }
  set sort(value) {
    this.sortingState = value ?? [];
    this.resetSelectionAnchor();
    this.requestServerData();
  }
  //
  // Column order
  //
  /** Get/set the column display order as an array of column ids. Empty array = natural order. */
  get columnOrder() {
    return this.columnOrderState;
  }
  set columnOrder(ids) {
    this.columnOrderState = ids ?? [];
  }
  /**
   * The visible data column ids in VISUAL display order: left-pinned, then center, then right-pinned (honoring column
   * order + visibility). table-core's `getVisibleLeafColumns()` orders by `columnOrder` only and does NOT apply
   * pinning, but `getHeaderGroups()`/`getVisibleCells()` render in pinned order — so we must mirror the pinned order
   * here too, or `aria-colindex` and keyboard nav would disagree with the rendered column positions.
   */
  orderedColumnIds() {
    return this.visibleColumnsInRenderOrder().map((c2) => c2.id);
  }
  /**
   * The visible leaf columns in RENDER order (left-pinned → center → right-pinned). Everything that lays out against
   * the header/body (footer row, CSV columns, colindex) must use this, not `getVisibleLeafColumns()`.
   */
  visibleColumnsInRenderOrder() {
    const table = this.syncTable();
    return [
      ...table.getStartVisibleLeafColumns(),
      ...table.getCenterVisibleLeafColumns(),
      ...table.getEndVisibleLeafColumns()
    ];
  }
  /**
   * Commits a new column order. With `finished: true` it sets the order state (one re-render) and emits the settled
   * event; with `finished: false` it emits only the interim event (no state change, so a live drag isn't re-rendered).
   */
  commitColumnOrder(movedColumn, next, finished) {
    const merged = this.mergeHiddenColumnsIntoOrder(next);
    if (finished) {
      this.columnOrderState = merged;
    }
    this.dispatchEvent(
      new WaColumnMoveEvent({
        column: movedColumn,
        toIndex: merged.indexOf(movedColumn),
        columnOrder: merged,
        finished
      })
    );
  }
  /**
   * Drag/keyboard reordering only sees the VISIBLE columns, but the committed order must cover every column —
   * otherwise table-core appends the missing (hidden) ids at the end and a hidden column reappears in the wrong
   * place. Each unlisted column stays anchored to the visible column that preceded it before the move.
   */
  mergeHiddenColumnsIntoOrder(nextVisible) {
    const allIds = this.columns.map((col, index) => this.columnId(col, index));
    const known = new Set(allIds);
    const prevFull = this.columnOrderState.length > 0 ? this.columnOrderState.filter((id) => known.has(id)) : [...allIds];
    for (const id of allIds) {
      if (!prevFull.includes(id)) prevFull.push(id);
    }
    const visible = new Set(nextVisible);
    if (prevFull.length === visible.size) return [...nextVisible];
    const anchored = /* @__PURE__ */ new Map();
    let lastVisible = null;
    for (const id of prevFull) {
      if (visible.has(id)) {
        lastVisible = id;
        continue;
      }
      const bucket = anchored.get(lastVisible) ?? [];
      bucket.push(id);
      anchored.set(lastVisible, bucket);
    }
    const merged = [...anchored.get(null) ?? []];
    for (const id of nextVisible) {
      merged.push(id, ...anchored.get(id) ?? []);
    }
    return merged;
  }
  /** Moves a column by `delta` positions (keyboard Shift+Arrow path), announces, keeps focus on the moved column. */
  moveColumnByStep(columnId, delta) {
    const order = this.orderedColumnIds();
    const from = order.indexOf(columnId);
    if (from === -1) return;
    const to = Math.max(0, Math.min(from + delta, order.length - 1));
    if (to === from) return;
    this.commitColumnOrder(columnId, arrayMove(order, from, to), true);
    const label = this.columnById(columnId)?.label ?? columnId;
    this.announce(this.localize.term("columnMovedToPosition", label, to + 1, order.length));
    void this.updateComplete.then(() => {
      this.headerCellEl(columnId)?.scrollIntoView({ inline: "nearest", block: "nearest" });
      this.nav.focusActiveCellEl();
    });
  }
  //
  // Selection
  //
  handleRowToggle(rowId, checked) {
    let next;
    if (this.selectionMode === "single") {
      next = checked ? { [rowId]: true } : {};
    } else {
      next = { ...this.selectionState };
      const apply = (id) => {
        if (checked) next[id] = true;
        else delete next[id];
      };
      apply(rowId);
      if (this.hasHierarchy) {
        for (const leaf of this.rowByIdAnyDepth(rowId)?.getLeafRows() ?? []) {
          if (!checked || leaf.getCanSelect()) apply(leaf.id);
        }
      }
    }
    this.setSelection(next);
  }
  /**
   * Looks up a row (any depth, pre-filter) by its id. Group rows only exist post-grouping, so fall back to the current
   * row model for them.
   */
  rowByIdAnyDepth(rowId) {
    const table = this.syncTable();
    return table.getCoreRowModel().rowsById[rowId] ?? table.getRowModel().rowsById[rowId];
  }
  /**
   * Toggles every selectable leaf row under a group row. The group's own (synthetic) id never enters the selection
   * state — its checkbox state is derived from its leaves.
   */
  handleGroupRowToggle(row, checked) {
    const next = { ...this.selectionState };
    for (const leaf of row.getLeafRows()) {
      if (leaf.getIsGrouped()) continue;
      if (checked && leaf.getCanSelect()) next[leaf.id] = true;
      else if (!checked) delete next[leaf.id];
    }
    this.setSelection(next);
  }
  /**
   * Handles a click on a row's selection checkbox, adding Shift-click range selection. Routed from `click` (not
   * `input`, which can't carry `shiftKey`). With Shift + a prior anchor, the anchor→clicked range takes the clicked
   * checkbox's state; otherwise a normal toggle that (re)sets the anchor. Shift is ignored in `single` mode.
   */
  handleRowCheckboxClick(rowIndex, rowId, checked, shiftKey) {
    if (shiftKey && this.selectionMode === "multiple" && this.selectionAnchorIndex !== null) {
      const rows = this.syncTable().getRowModel().rows;
      const lo = Math.min(this.selectionAnchorIndex, rowIndex);
      const hi = Math.max(this.selectionAnchorIndex, rowIndex);
      const next = { ...this.selectionState };
      for (let i2 = lo; i2 <= hi; i2++) {
        const row = rows[i2];
        if (!row || !row.getCanSelect()) continue;
        if (checked) next[row.id] = true;
        else delete next[row.id];
      }
      this.setSelection(next);
      return;
    }
    this.handleRowToggle(rowId, checked);
    this.selectionAnchorIndex = rowIndex;
  }
  /**
   * Invalidate the Shift-click anchor. The anchor is a row *position*, so it's meaningless once sorting, filtering,
   * searching, or paging reorders or replaces the visible rows.
   */
  resetSelectionAnchor() {
    this.selectionAnchorIndex = null;
    this.rangeBaseSelection = null;
    this.nav.resetRangeAnchor();
  }
  /**
   * Toggles selection for the rows on the CURRENT PAGE only, preserving selections on other pages. This matches
   * table-core's `getToggleAllPageRowsSelectedHandler` and the prevailing paginated-grid convention (MUI/AG/GitHub):
   * the header checkbox never silently selects thousands of off-page rows. Rows that can't be selected
   * (`enableRowSelection` predicate) are skipped. With pagination off, the "page" is the full filtered set.
   */
  handleSelectAll(checked) {
    const table = this.syncTable();
    const next = { ...this.selectionState };
    const apply = (id) => {
      if (checked) next[id] = true;
      else delete next[id];
    };
    for (const row of table.getRowModel().rows) {
      if (!row.getIsGrouped() && (!checked || row.getCanSelect())) apply(row.id);
      if (this.hasHierarchy) {
        for (const leaf of row.getLeafRows()) {
          if (!leaf.getIsGrouped() && (!checked || leaf.getCanSelect())) apply(leaf.id);
        }
      }
    }
    this.setSelection(next);
  }
  setSelection(next) {
    this.selectionState = next;
    this.announce(this.localize.term("numRowsSelected", this.selectedKeys.length));
    this.dispatchEvent(new WaRowSelectEvent({ selectedKeys: this.selectedKeys, selectedRows: this.selectedRows }));
  }
  /** The `rowKey` values of the currently selected rows. The source of truth for selection. */
  get selectedKeys() {
    return Object.keys(this.selectionState).filter((k) => this.selectionState[k]);
  }
  set selectedKeys(keys) {
    const next = {};
    (keys ?? []).forEach((k) => next[String(k)] = true);
    this.selectionState = this.dropLockedKeys(next);
  }
  /**
   * Removes any key that resolves to a currently-loaded row the `selectableRows` predicate rejects. Keys that don't
   * resolve to a loaded row are kept (e.g. server-mode selections on pages we can't see here).
   */
  dropLockedKeys(selection) {
    if (!this.selectableRows) return selection;
    const rowsById = this.syncTable().getCoreRowModel().rowsById;
    const filtered = {};
    for (const key of Object.keys(selection)) {
      if (!selection[key]) continue;
      const row = rowsById[key];
      if (row && !this.selectableRows(row.original)) continue;
      filtered[key] = true;
    }
    return filtered;
  }
  /**
   * The selected row objects resolvable from the currently loaded `data` (best-effort, any tree depth). Settable,
   * resolved by key.
   */
  get selectedRows() {
    const selected = new Set(this.selectedKeys.map(String));
    return this.syncTable().getCoreRowModel().flatRows.filter((row) => selected.has(row.id)).map((row) => row.original);
  }
  set selectedRows(rows) {
    const wanted = new Set(rows ?? []);
    this.selectedKeys = this.syncTable().getCoreRowModel().flatRows.filter((row) => wanted.has(row.original)).map((row) => row.id);
  }
  //
  // Row expansion
  //
  /** Whether a row (detail panel or tree subtree) is currently expanded. */
  isRowExpanded(rowId) {
    return this.expandedState === true ? true : Boolean(this.expandedState[rowId]);
  }
  /**
   * Materializes the expanded slice as a per-row record (the `true` = "all expanded" form becomes explicit keys), so a
   * single row can be collapsed out of an expand-all state.
   */
  expandedRecord() {
    if (this.expandedState !== true) return { ...this.expandedState };
    const table = this.syncTable();
    const model = this.isGrouped ? table.getGroupedRowModel() : table.getCoreRowModel();
    const record = {};
    for (const row of model.flatRows) {
      if (this.rowDetail !== null || row.getCanExpand()) record[row.id] = true;
    }
    return record;
  }
  /** Sets one row's expansion, emitting `wa-row-expand`/`wa-row-collapse` and re-measuring panel heights. */
  setRowExpansion(rowId, row, expanded) {
    if (this.isRowExpanded(rowId) === expanded) return;
    const record = this.expandedRecord();
    if (expanded) record[rowId] = true;
    else delete record[rowId];
    this.expandedState = record;
    this.dispatchEvent(expanded ? new WaRowExpandEvent({ row }) : new WaRowCollapseEvent({ row }));
    if (this.rowDetail !== null) this.virtualizer.clearMeasurements();
    this.resetSelectionAnchor();
    if (!expanded) this.nav.clampActiveRow();
  }
  toggleRowExpansion(rowId, row) {
    this.setRowExpansion(rowId, row, !this.isRowExpanded(rowId));
  }
  /**
   * The row keys of the currently expanded rows. Settable. Without a `row-key`, ids follow table-core's convention:
   * a top-level row's index (`'0'`), then dotted index paths for children (`'0.1'`).
   */
  get expandedKeys() {
    if (this.expandedState === true) return Object.keys(this.expandedRecord());
    return Object.keys(this.expandedState).filter((k) => this.expandedState[k]);
  }
  set expandedKeys(keys) {
    const next = {};
    (keys ?? []).forEach((k) => next[String(k)] = true);
    this.expandedState = next;
    if (this.rowDetail !== null) this.virtualizer.clearMeasurements();
    this.nav.clampActiveRow();
  }
  /** Expands the row with the given key (its `rowKey` value). */
  expandRow(key) {
    const record = this.expandedRecord();
    record[String(key)] = true;
    this.expandedState = record;
    if (this.rowDetail !== null) this.virtualizer.clearMeasurements();
  }
  /** Collapses the row with the given key (its `rowKey` value). */
  collapseRow(key) {
    const record = this.expandedRecord();
    delete record[String(key)];
    this.expandedState = record;
    if (this.rowDetail !== null) this.virtualizer.clearMeasurements();
  }
  /** Expands every row (all detail panels, or every branch of a tree). */
  expandAllRows() {
    this.expandedState = true;
    if (this.rowDetail !== null) this.virtualizer.clearMeasurements();
  }
  /** Collapses every row. */
  collapseAllRows() {
    this.expandedState = {};
    if (this.rowDetail !== null) this.virtualizer.clearMeasurements();
    this.nav.clampActiveRow();
  }
  //
  // Pagination
  //
  goToPage(page) {
    const clamped = Math.max(0, Math.min(page, this.pageCount - 1));
    if (clamped === this.page) return;
    this.page = clamped;
    this.resetSelectionAnchor();
    this.nav.clampActiveRow();
    this.dispatchEvent(new WaPageChangeEvent({ page: this.page, pageSize: this.pageSize }));
    this.requestServerData();
  }
  handlePageSizeChange(pageSize) {
    if (!pageSize || pageSize === this.pageSize) return;
    this.pageSize = pageSize;
    this.page = 0;
    this.resetSelectionAnchor();
    this.nav.clampActiveRow();
    this.dispatchEvent(new WaPageChangeEvent({ page: this.page, pageSize: this.pageSize }));
    this.requestServerData();
  }
  /** The number of pages in the current result set (always `1` when `paginate` is off). Read-only. */
  get pageCount() {
    if (!this.paginate) return 1;
    return Math.max(1, Math.ceil(this.filteredRowCount / this.pageSize));
  }
  /**
   * The number of rows in the current result set after filtering and search, across every page (top-level rows for
   * tree and grouped data; the server-reported `total` in server mode). Read-only.
   */
  get filteredCount() {
    return this.filteredRowCount;
  }
  /**
   * The data rows currently displayed, in display order — after sorting, filtering, expansion, and pagination.
   * Group header rows are excluded.
   */
  getVisibleRows() {
    return this.syncTable().getRowModel().rows.filter((row) => !row.getIsGrouped()).map((row) => row.original);
  }
  /**
   * Every data row in the current result set, in display order — after sorting, filtering, and search, across all
   * pages and tree depths (parents before their children). Group header rows are excluded. In server mode this is
   * the currently loaded page.
   */
  getProcessedRows() {
    return this.processedDataRows().map((row) => row.original);
  }
  /** The sorted + filtered data rows across every page and depth (the walk CSV export and clipboard copy share). */
  processedDataRows() {
    const table = this.syncTable();
    const rows = [];
    const walk = (source) => {
      for (const row of source) {
        if (!row.getIsGrouped()) rows.push(row);
        if (row.subRows?.length) walk(row.subRows);
      }
    };
    walk(this.isManual ? table.getRowModel().rows : table.getSortedRowModel().rows);
    return rows;
  }
  /**
   * The number of top-level rows after filtering (and grouping — each group counts as one row for paging), before
   * pagination. In server mode this is the server-reported total.
   */
  get filteredRowCount() {
    if (this.isManual) return this.total >= 0 ? this.total : this.data?.length ?? 0;
    const table = this.syncTable();
    if (this.isGrouped) return table.getGroupedRowModel().rows.length;
    return table.getFilteredRowModel().rows.length;
  }
  //
  // Filtering
  //
  handleSearchInput(value) {
    if (value === this.searchTerm) return;
    this.searchTerm = value;
    this.emitFilterChange();
    if (!this.isManual) {
      void this.updateComplete.then(() => {
        this.announce(this.localize.term("showingNofMRows", this.filteredRowCount, this.data?.length ?? 0));
      });
    }
  }
  handleColumnFilter(columnId, value) {
    const filters = this.columnFiltersState.filter((f) => f.id !== columnId);
    if (!isEmptyFilterValue(value)) filters.push({ id: columnId, value });
    this.columnFiltersState = filters;
    this.resetPage();
    this.resetSelectionAnchor();
    this.nav.clampActiveRow();
    this.emitFilterChange();
    this.requestServerData({ debounce: true });
  }
  /** Get/set the column filters declaratively, e.g. `[{ id: 'category', value: 'Lighting' }]`. */
  get filters() {
    return this.columnFiltersState.map((f) => ({ id: f.id, value: f.value }));
  }
  set filters(value) {
    this.columnFiltersState = (value ?? []).filter((f) => !isEmptyFilterValue(f.value)).map((f) => ({ ...f }));
    this.resetPage();
    this.resetSelectionAnchor();
    this.nav.clampActiveRow();
    this.requestServerData();
  }
  /**
   * Faceted data for a column — distinct cell values (with counts) and the numeric min/max, computed before this
   * column's own filter applies. Use it to build filter UIs. Client mode only; returns empty facets in server mode.
   */
  getColumnFacets(columnId) {
    if (this.isManual) return { uniqueValues: /* @__PURE__ */ new Map(), minMax: void 0 };
    const column = this.syncTable().getColumn(columnId);
    if (!column) return { uniqueValues: /* @__PURE__ */ new Map(), minMax: void 0 };
    return {
      uniqueValues: column.getFacetedUniqueValues(),
      minMax: column.getFacetedMinMaxValues()
    };
  }
  emitFilterChange() {
    this.dispatchEvent(
      new WaFilterChangeEvent({
        search: this.searchTerm,
        filters: this.columnFiltersState.map((f) => ({ id: f.id, value: f.value }))
      })
    );
  }
  //
  // Server (manual) mode
  //
  get currentRequest() {
    return {
      sort: this.sortingState.map((s) => ({ id: s.id, desc: s.desc })),
      filters: this.columnFiltersState.map((f) => ({ id: f.id, value: f.value })),
      search: this.searchTerm,
      page: this.page,
      pageSize: this.pageSize
    };
  }
  /**
   * Schedules a server-mode data request. Multiple synchronous callers (a UI handler plus the property watchers it
   * triggers) coalesce into one request per microtask, `debounce: true` waits `filterDebounce` ms for typing to
   * settle, and a request identical to the last one issued is skipped unless `force` is set.
   */
  requestServerData(options = {}) {
    if (!this.isManual || o) return;
    this.fetchForce || (this.fetchForce = options.force ?? false);
    if (this.fetchDebounceTimer !== null) {
      clearTimeout(this.fetchDebounceTimer);
      this.fetchDebounceTimer = null;
    }
    const delay = options.debounce ? Math.max(0, this.filterDebounce) : 0;
    if (delay > 0) {
      this.fetchDebounceTimer = setTimeout(() => {
        this.fetchDebounceTimer = null;
        this.flushServerRequest();
      }, delay);
      return;
    }
    if (this.fetchQueued) return;
    this.fetchQueued = true;
    queueMicrotask(() => {
      this.fetchQueued = false;
      this.flushServerRequest();
    });
  }
  /** Re-runs the current server request (server mode only), even if its parameters haven't changed. */
  reload() {
    this.requestServerData({ force: true });
  }
  /**
   * Fetches the current page from `dataSource` (or emits `wa-data-request` for event-style consumers). Aborts any
   * in-flight request and ignores stale responses so out-of-order arrivals can't clobber newer data.
   */
  async flushServerRequest() {
    if (!this.isManual || o || !this.isConnected) return;
    const force = this.fetchForce;
    this.fetchForce = false;
    const bare = this.currentRequest;
    const key = JSON.stringify(bare);
    if (!force && key === this.lastRequestKey) return;
    this.lastRequestKey = key;
    this.abortController?.abort();
    const controller = new AbortController();
    this.abortController = controller;
    const token = ++this.requestToken;
    const request = { ...bare, signal: controller.signal };
    this.dispatchEvent(new WaDataRequestEvent(request));
    if (!this.dataSource) return;
    this.loading = true;
    try {
      const response = await this.dataSource(request);
      if (token !== this.requestToken) return;
      this.data = response.rows ?? [];
      this.total = response.total ?? -1;
      if (this.searchTerm) this.announce(this.localize.term("showingNofMRows", this.data.length, this.total));
    } catch (error) {
      if (token === this.requestToken && !controller.signal.aborted) {
        this.dispatchEvent(new WaDataErrorEvent({ error, request: bare }));
        console.error("<wa-data-grid> dataSource request failed:", error);
      }
    } finally {
      if (token === this.requestToken) this.loading = false;
    }
  }
  //
  // Column visibility
  //
  /** Shows or hides a column by its id (the column's `id`, or `field` when no id is set). */
  toggleColumn(columnId, visible) {
    const current = this.effectiveVisibility[columnId] !== false;
    const next = visible ?? !current;
    this.columnVisibilityState = { ...this.columnVisibilityState, [columnId]: next };
    if (!next) this.reseatActiveColumn();
  }
  /**
   * If the active (roving-tabindex) cell sits on a column that no longer exists or is now hidden, move it to a
   * surviving column. Without this, hiding/removing the active column leaves NO cell with `tabindex="0"`, so the grid
   * becomes un-tabbable until the user clicks back in. (Mirrors the nav controller's row clamp, for columns.)
   */
  reseatActiveColumn() {
    const previous = this.activeCell;
    const priorIndex = previous ? this.focusableColumnIds().indexOf(previous.col) : -1;
    void this.updateComplete.then(() => {
      const active = this.activeCell;
      if (!active) return;
      const cols = this.focusableColumnIds();
      if (cols.length === 0 || cols.includes(active.col)) return;
      const target = priorIndex >= 0 ? cols[Math.min(priorIndex, cols.length - 1)] : cols[0];
      this.activeCell = { ...active, col: target };
    });
  }
  //
  // Column resizing
  //
  resizeColumnTo(columnId, width, finished) {
    const col = this.columnById(columnId);
    const min = col?.minWidth ?? 40;
    const max = col?.maxWidth ?? Infinity;
    const clamped = Math.max(min, Math.min(max, width));
    this.columnSizingState = { ...this.columnSizingState, [columnId]: clamped };
    this.dispatchEvent(new WaColumnResizeEvent({ column: columnId, width: clamped, finished }));
  }
  handleResizeStart(event, columnId) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    this.cancelResizeDrag?.();
    const startX = event.clientX;
    const pointerId = event.pointerId;
    const direction = this.localize.dir() === "rtl" ? -1 : 1;
    const headerCell = event.target.closest('[part~="header-cell"]');
    const startSize = headerCell?.getBoundingClientRect().width ?? this.columnById(columnId)?.width ?? 150;
    const preDragSizing = this.columnSizingState;
    const frozen = { ...preDragSizing };
    this.shadowRoot?.querySelectorAll('[part~="header-cell"][data-col-id]').forEach((cell) => {
      const id = cell.dataset.colId;
      if (frozen[id] == null) frozen[id] = cell.getBoundingClientRect().width;
    });
    frozen[columnId] = startSize;
    this.columnSizingState = frozen;
    const header = this.shadowRoot?.querySelector('[part~="header"]');
    if (header && this.scroller) header.style.minWidth = `${this.scroller.scrollWidth}px`;
    let moved = false;
    const onMove = (e3) => {
      if (e3.pointerId !== pointerId) return;
      if (!moved && Math.abs(e3.clientX - startX) < 4) return;
      moved = true;
      this.resizeColumnTo(columnId, startSize + (e3.clientX - startX) * direction, false);
    };
    const onUp = (e3) => {
      if (e3.pointerId !== pointerId) return;
      teardown();
      if (moved) this.resizeColumnTo(columnId, startSize + (e3.clientX - startX) * direction, true);
    };
    const onCancel = (e3) => {
      if (e3.pointerId !== pointerId) return;
      teardown();
    };
    const teardown = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      this.columnSizingState = preDragSizing;
      if (header) header.style.minWidth = "";
      this.cancelResizeDrag = null;
    };
    this.cancelResizeDrag = teardown;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
  }
  /**
   * Measures the minimum inline size a header cell needs to show its label without truncating, including the space
   * its trailing controls (sort indicator, priority badge, pin/menu actions) and cell padding claim. Returns 0 when
   * the header cell isn't rendered yet or measurement is unavailable. Body content is deliberately excluded — this is
   * the "never clip the label" floor, not a fit-to-content size.
   */
  measureHeaderMinWidth(columnId) {
    if (o) return 0;
    const headerCell = this.shadowRoot?.querySelector(
      `[part~="header-cell"][data-col-id="${cssId(columnId)}"]`
    );
    if (!headerCell) return 0;
    const ctx = getMeasureContext();
    if (ctx) {
      const style = getComputedStyle(headerCell);
      ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
    }
    const label = this.columnById(columnId)?.label ?? "";
    const measure = (text) => ctx ? ctx.measureText(text).width : text.length * 8;
    let width = measure(label);
    for (const child of Array.from(headerCell.children)) {
      if (child.classList.contains("header-label") || child.classList.contains("resize-handle")) continue;
      const childStyle = getComputedStyle(child);
      width += child.getBoundingClientRect().width + (parseFloat(childStyle.marginInlineStart) || 0) + (parseFloat(childStyle.marginInlineEnd) || 0);
    }
    const padStyle = getComputedStyle(headerCell);
    const padding = (parseFloat(padStyle.paddingInlineStart) || 0) + (parseFloat(padStyle.paddingInlineEnd) || 0);
    return Math.ceil(width + padding) + 2;
  }
  /** Resizes one column to fit its widest rendered cell content (the double-click-handle behavior). */
  autoSizeColumn(columnId) {
    if (o) return;
    const root = this.shadowRoot;
    if (!root) return;
    const cells = Array.from(root.querySelectorAll(`[part~="cell"][data-col-id="${cssId(columnId)}"]`));
    const ctx = getMeasureContext();
    const measure = (text) => {
      if (ctx) return ctx.measureText(text).width;
      return text.length * 8;
    };
    let bodyWidth = 0;
    if (ctx) {
      const fontByClass = /* @__PURE__ */ new Map();
      for (const cell of cells) {
        let variant = fontByClass.get(cell.className);
        if (!variant) {
          const style = getComputedStyle(cell);
          variant = {
            font: `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
            letterSpacing: style.letterSpacing === "normal" ? "0px" : style.letterSpacing
          };
          fontByClass.set(cell.className, variant);
        }
        ctx.font = variant.font;
        ctx.letterSpacing = variant.letterSpacing;
        bodyWidth = Math.max(bodyWidth, measure(cell.textContent?.trim() ?? ""));
      }
    } else {
      for (const cell of cells) {
        bodyWidth = Math.max(bodyWidth, measure(cell.textContent?.trim() ?? ""));
      }
    }
    if (bodyWidth > 0) {
      const cellStyle = getComputedStyle(cells[0]);
      bodyWidth += (parseFloat(cellStyle.paddingInlineStart) || 0) + (parseFloat(cellStyle.paddingInlineEnd) || 0) + 2;
    }
    const width = Math.max(this.measureHeaderMinWidth(columnId), Math.ceil(bodyWidth));
    if (width > 0) this.resizeColumnTo(columnId, width, true);
  }
  /** Resizes every resizable column to fit its content. */
  autoSizeColumns() {
    for (const col of this.columns) {
      const index = this.columns.indexOf(col);
      const id = this.columnId(col, index);
      if (this.columnResizable(col)) this.autoSizeColumn(id);
    }
  }
  /** Distributes column widths to fill the available horizontal space, honoring each column's min/max. */
  sizeColumnsToFit() {
    if (o || !this.scroller) return;
    const visible = this.syncTable().getVisibleLeafColumns();
    if (visible.length === 0) return;
    let controlWidth = 0;
    const controlCells = this.shadowRoot?.querySelectorAll('[part~="header"] .cell-control') ?? [];
    controlCells.forEach((c2) => controlWidth += c2.getBoundingClientRect().width);
    const available = this.scroller.clientWidth - controlWidth;
    if (available <= 0) return;
    const defs = visible.map((c2) => {
      const col = this.columnById(c2.id);
      return { id: c2.id, flex: col?.flex ?? 1, min: col?.minWidth ?? 40, max: col?.maxWidth ?? Infinity };
    });
    const totalFlex = defs.reduce((sum, d) => sum + d.flex, 0) || 1;
    const sizing = { ...this.columnSizingState };
    for (const d of defs) {
      const width = Math.max(d.min, Math.min(d.max, available * d.flex / totalFlex));
      sizing[d.id] = Math.floor(width);
    }
    this.columnSizingState = sizing;
    for (const d of defs) {
      this.dispatchEvent(new WaColumnResizeEvent({ column: d.id, width: sizing[d.id], finished: true }));
    }
  }
  /** Scrolls the row at the given display index into view (pairs with virtualization). */
  scrollToIndex(index, options) {
    this.virtualizer.scrollToIndex(index, options ?? { align: "auto" });
  }
  /**
   * Horizontally scrolls the given cell into the visible band between the sticky pinned sections. Keyboard
   * navigation focuses with `preventScroll` (the virtualizer owns vertical position), so without this the focus
   * ring can land on a cell scrolled out of horizontal view. Pinned cells are sticky and always visible.
   */
  revealColumn(el) {
    if (o || !this.scroller || el.hasAttribute("data-pinned")) return;
    const scrollerRect = this.scroller.getBoundingClientRect();
    let startBand = 0;
    let endBand = 0;
    this.shadowRoot?.querySelectorAll('[part~="header"] [data-pinned]').forEach((cell) => {
      if (cell.getAttribute("data-pinned") === "left") startBand += cell.offsetWidth;
      else endBand += cell.offsetWidth;
    });
    const rtl = this.localize.dir() === "rtl";
    const rect = el.getBoundingClientRect();
    const leftEdge = scrollerRect.left + (rtl ? endBand : startBand);
    const rightEdge = scrollerRect.right - (rtl ? startBand : endBand);
    if (rect.left < leftEdge) {
      this.scroller.scrollLeft -= leftEdge - rect.left;
    } else if (rect.right > rightEdge) {
      this.scroller.scrollLeft += rect.right - rightEdge;
    }
  }
  //
  // CSV export
  //
  /**
   * Returns the current rows as a CSV string, honoring the active sort, filters, search, and column visibility/order.
   * Each column's `formatter` runs for string output only (`TemplateResult`/`Node` cells fall back to the raw value).
   * Every page and tree depth is included; server mode exports only the loaded page. Set `escapeFormulas: true` when
   * the file may open in a spreadsheet and the data isn't trusted — cells starting with `=`, `+`, `-`, or `@` are
   * prefixed with an apostrophe so they can't execute as formulas (plain numbers are left alone).
   */
  getDataAsCsv(options) {
    const delimiter = options?.delimiter ?? ",";
    const includeHeaders = options?.includeHeaders !== false;
    const rows = this.processedDataRows();
    const cols = this.visibleColumnsInRenderOrder().filter(
      (c2) => !options?.columnIds || options.columnIds.includes(c2.id)
    );
    const escape = (value) => {
      let text = value;
      if (options?.escapeFormulas) text = escapeSpreadsheetFormula(text);
      if (text.includes(delimiter) || text.includes('"') || text.includes("\n") || text.includes("\r")) {
        return `"${text.replace(/"/g, '""')}"`;
      }
      return text;
    };
    const lines = [];
    if (includeHeaders) {
      lines.push(cols.map((c2) => escape(this.columnById(c2.id)?.label ?? c2.id)).join(delimiter));
    }
    for (const row of rows) {
      const cells = cols.map((c2) => escape(this.cellText(c2.id, row)));
      lines.push(cells.join(delimiter));
    }
    return lines.join("\r\n");
  }
  /** A cell's plain-text value: the `formatter`'s string output, else the raw value stringified. */
  cellText(columnId, row) {
    const value = row.getValue(columnId);
    const col = this.columnById(columnId);
    if (col?.formatter) {
      const out = col.formatter(value, row.original);
      if (typeof out === "string") return out;
    }
    return value == null ? "" : String(value);
  }
  /**
   * Exports the current rows as a CSV file (browser download). Respects the active sort, filters, search, and column
   * visibility/order, and runs each column's `formatter`. In server mode, only the currently loaded page is exported.
   */
  exportDataAsCsv(options) {
    if (o) return;
    const csv = this.getDataAsCsv(options);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = options?.fileName ?? "data.csv";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }
  //
  // Clipboard
  //
  /**
   * Copies the selected rows (or every processed row when nothing is selected) to the clipboard, honoring the active
   * sort, filters, and column visibility/order. The default tab-separated format pastes into spreadsheet cells;
   * `format: 'csv'` copies comma-separated text instead. Also wired to [[Ctrl]]+[[C]] when the grid has focus.
   * Returns the number of rows copied.
   */
  async copySelectedRows(options) {
    if (o) return 0;
    const delimiter = options?.format === "csv" ? "," : "	";
    const includeHeaders = options?.includeHeaders !== false;
    const selected = new Set(this.selectedKeys.map(String));
    const rows = this.processedDataRows().filter((row) => selected.size === 0 || selected.has(row.id));
    const cols = this.visibleColumnsInRenderOrder().filter(
      (c2) => !options?.columnIds || options.columnIds.includes(c2.id)
    );
    const escape = (value) => {
      let text = options?.escapeFormulas ? escapeSpreadsheetFormula(value) : value;
      if (delimiter === "," && /[",\n\r]/.test(text)) text = `"${text.replace(/"/g, '""')}"`;
      if (delimiter === "	") text = text.replace(/[\t\n\r]+/g, " ");
      return text;
    };
    const lines = [];
    if (includeHeaders) lines.push(cols.map((c2) => escape(this.columnById(c2.id)?.label ?? c2.id)).join(delimiter));
    for (const row of rows) {
      lines.push(cols.map((c2) => escape(this.cellText(c2.id, row))).join(delimiter));
    }
    await navigator.clipboard.writeText(lines.join("\n"));
    this.announce(this.localize.term("numRowsCopied", rows.length));
    return rows.length;
  }
  //
  // State persistence
  //
  /** Returns a serializable snapshot of column order, widths, visibility, sort, filters, search, selection, paging. */
  getState() {
    const knownIds = new Set(this.columns.map((col, index) => this.columnId(col, index)));
    return {
      version: 1,
      columnOrder: this.columnOrderState.filter((id) => knownIds.has(id)),
      columnWidths: { ...this.columnSizingState },
      columnVisibility: { ...this.effectiveVisibility },
      columnPinning: {
        left: (this.columnPinningState.left ?? []).filter((id) => knownIds.has(id)),
        right: (this.columnPinningState.right ?? []).filter((id) => knownIds.has(id))
      },
      sort: this.sortingState.map((s) => ({ id: s.id, desc: s.desc })),
      filters: this.columnFiltersState.map((f) => ({ id: f.id, value: f.value })),
      search: this.searchTerm,
      selectedKeys: this.selectedKeys,
      // The `true` (expand-all) sentinel materializes to explicit keys here so the snapshot stays serializable.
      expandedKeys: this.expandedKeys,
      page: this.page,
      pageSize: this.pageSize
    };
  }
  /** Restores a previously captured state. Unknown column ids are ignored; omitted keys are left unchanged. */
  setState(state) {
    if (!state || state.version !== 1) return;
    const knownIds = new Set(this.columns.map((col, index) => this.columnId(col, index)));
    if (state.columnOrder) this.columnOrderState = state.columnOrder.filter((id) => knownIds.has(id));
    if (state.columnWidths) this.columnSizingState = { ...state.columnWidths };
    if (state.columnVisibility) this.columnVisibilityState = { ...state.columnVisibility };
    if (state.columnPinning) {
      this.columnPinningState = {
        left: (state.columnPinning.left ?? []).filter((id) => knownIds.has(id)),
        right: (state.columnPinning.right ?? []).filter((id) => knownIds.has(id))
      };
    }
    if (state.sort) this.sortingState = state.sort.map((s) => ({ id: s.id, desc: s.desc }));
    if (state.filters) this.columnFiltersState = state.filters.map((f) => ({ id: f.id, value: f.value }));
    if (state.search != null) this.searchTerm = state.search;
    if (state.selectedKeys) this.selectedKeys = state.selectedKeys;
    if (state.expandedKeys) this.expandedKeys = state.expandedKeys;
    if (state.pageSize != null) this.pageSize = state.pageSize;
    if (state.page != null) this.page = state.page;
    if (state.page != null && state.search != null) this.suppressPageReset = true;
    this.requestServerData({ force: true });
  }
  /**
   * Resets all user-adjusted view state (order, widths, visibility, pinning, sort, filters, search, expansion) to the
   * column defaults. Selection and paging are left alone — clearing a user's selection is destructive.
   */
  resetState() {
    this.resetColumns();
    this.sortingState = [];
    this.columnFiltersState = [];
    this.searchTerm = "";
    this.expandedState = {};
    this.requestServerData({ force: true });
  }
  /**
   * Resets column order, widths, visibility, and pinning to the column definitions' defaults, leaving sort,
   * filters, search, selection, and paging untouched (the columns menu's "Reset columns" action).
   */
  resetColumns() {
    this.columnOrderState = [];
    this.columnSizingState = {};
    this.columnVisibilityState = {};
    this.columnPinningState = { left: [], right: [] };
    this.seededPinIds.clear();
    this.seedDeclarativePins();
    void this.updateComplete.then(() => this.freezePinnedColumnWidths());
  }
  announce(message) {
    this.announceTick = !this.announceTick;
    this.liveAnnouncement = message + (this.announceTick ? "\u200B" : "");
  }
  //
  // Navigation/reorder host helpers (consumed by the controllers)
  //
  /** The number of header-area rows — they occupy the leading `aria-rowindex` slots, so data rows start after them. */
  headerRowCount() {
    return 1;
  }
  /** The number of control (non-data) columns rendered before the data columns. */
  controlColumnCount() {
    return (this.hasExpandColumn ? 1 : 0) + (this.isSelectable ? 1 : 0);
  }
  /** The 1-based ARIA colindex for a column id (control cells included). */
  colIndexOf(colId) {
    return this.focusableColumnIds().indexOf(colId) + 1;
  }
  /** All focusable column ids in render order: control ids first, then visible data columns. */
  focusableColumnIds() {
    const ids = [];
    if (this.hasExpandColumn) ids.push(EXPAND_COL);
    if (this.isSelectable) ids.push(SELECT_COL);
    return [...ids, ...this.orderedColumnIds()];
  }
  headerCellEl(columnId) {
    return this.shadowRoot?.querySelector(`[part~="header-cell"][data-col-id="${cssId(columnId)}"]`) ?? null;
  }
  bodyCellEls(columnId) {
    const id = cssId(columnId);
    return Array.from(
      this.shadowRoot?.querySelectorAll(
        `[part~="cell"][data-col-id="${id}"], [part~="footer-cell"][data-col-id="${id}"], .filter-cell[data-col-id="${id}"]`
      ) ?? []
    );
  }
  /**
   * Whether a column can be reordered (used by the template + the reorder adapter). A pinned column is positioned by
   * its pin section, not free drag, so it isn't draggable while pinned.
   */
  columnMovable(columnId) {
    if (this.getColumnPin(columnId)) return false;
    const col = this.columnById(columnId);
    return col ? this.columnMovableFor(col) : false;
  }
  /** Builds the adapter the navigation controller talks to (avoids exposing private members on the element). */
  navAdapter() {
    const self = this;
    return {
      get shadowRoot() {
        return self.shadowRoot;
      },
      get updateComplete() {
        return self.updateComplete;
      },
      focusableColumnIds: () => self.focusableColumnIds(),
      rowCount: () => self.syncTable().getRowModel().rows.length,
      getActiveCell: () => self.activeCell,
      setActiveCell: (cell) => {
        self.activeCell = cell;
      },
      scrollerEl: () => self.scroller ?? null,
      rowHeight: () => self.measureRowHeight(),
      scrollRowIntoView: (index) => self.virtualizer.scrollToIndex(index, { align: "auto" }),
      isRtl: () => self.localize.dir() === "rtl",
      sortColumn: (columnId, multi) => self.handleSort(columnId, multi),
      toggleRowSelection: (rowIndex) => {
        const row = self.syncTable().getRowModel().rows[rowIndex];
        if (!row) return;
        if (row.getIsGrouped()) {
          self.handleGroupRowToggle(row, !row.getIsAllSubRowsSelected());
          return;
        }
        if (row.getCanSelect()) self.handleRowToggle(row.id, !self.selectionState[row.id]);
      },
      beginRangeSelection: () => {
        self.rangeBaseSelection = { ...self.selectionState };
      },
      extendSelectionTo: (anchor, rowIndex) => {
        const rows = self.syncTable().getRowModel().rows;
        const lo = Math.min(anchor, rowIndex);
        const hi = Math.max(anchor, rowIndex);
        const next = { ...self.rangeBaseSelection ?? self.selectionState };
        for (let i2 = lo; i2 <= hi; i2++) {
          const row = rows[i2];
          if (row && row.getCanSelect()) next[row.id] = true;
        }
        self.setSelection(next);
      },
      selectAllRows: () => self.handleSelectAll(true),
      selectionEnabled: () => self.isSelectable,
      multiSelectEnabled: () => self.selectionMode === "multiple",
      moveColumnByStep: (columnId, delta) => self.moveColumnByStep(columnId, delta),
      resizeColumnByStep: (columnId, delta) => {
        const current = self.headerCellEl(columnId)?.getBoundingClientRect().width ?? 150;
        self.resizeColumnTo(columnId, current + delta * 16, true);
      },
      columnMovable: (columnId) => self.columnMovable(columnId),
      columnResizable: (columnId) => {
        const col = self.columnById(columnId);
        return col ? self.columnResizable(col) : false;
      },
      toggleRowExpansion: (rowIndex, columnId) => {
        if (columnId !== EXPAND_COL) return false;
        const row = self.syncTable().getRowModel().rows[rowIndex];
        if (!row) return false;
        if (self.rowDetail === null && !row.getCanExpand()) return false;
        self.toggleRowExpansion(row.id, row.original);
        return true;
      },
      activateCell: (rowIndex, columnId) => {
        const row = self.syncTable().getRowModel().rows[rowIndex];
        if (!row || row.getIsGrouped() || columnId === SELECT_COL || columnId === EXPAND_COL) return;
        self.dispatchEvent(
          new WaCellClickEvent({
            column: columnId,
            value: (() => {
              const c2 = self.columnById(columnId);
              return c2?.field != null || c2?.value != null ? row.getValue(columnId) : void 0;
            })(),
            row: row.original,
            rowIndex
          })
        );
      },
      revealColumn: (el) => self.revealColumn(el),
      copySelection: () => {
        if (!self.isSelectable || self.selectedKeys.length === 0) return false;
        void self.copySelectedRows();
        return true;
      },
      openContextMenu: (rowIndex, columnId, originalEvent) => {
        const row = self.syncTable().getRowModel().rows[rowIndex];
        if (!row || row.getIsGrouped() || columnId === SELECT_COL || columnId === EXPAND_COL) return;
        self.dispatchEvent(
          new WaCellContextmenuEvent({
            column: columnId,
            value: (() => {
              const c2 = self.columnById(columnId);
              return c2?.field != null || c2?.value != null ? row.getValue(columnId) : void 0;
            })(),
            row: row.original,
            rowIndex,
            originalEvent
          })
        );
      },
      announce: (message) => self.announce(message)
    };
  }
  /** Builds the adapter the reorder controller talks to. */
  reorderAdapter() {
    const self = this;
    return {
      toggleHostClass: (name, force) => self.classList.toggle(name, force),
      orderedColumnIds: () => self.orderedColumnIds(),
      headerCellEl: (columnId) => self.headerCellEl(columnId),
      bodyCellEls: (columnId) => self.bodyCellEls(columnId),
      scrollerEl: () => self.scroller ?? null,
      columnLabel: (columnId) => self.columnById(columnId)?.label ?? columnId,
      columnMovable: (columnId) => self.columnMovable(columnId),
      isRtl: () => self.localize.dir() === "rtl",
      commitColumnOrder: (movedColumn, next, finished) => self.commitColumnOrder(movedColumn, next, finished),
      setSuppressNextHeaderClick: (value) => {
        self.suppressNextHeaderClick = value;
      },
      attachGhost: (ghost) => self.shadowRoot?.append(ghost)
    };
  }
  render() {
    this.inRenderPass = true;
    this.renderTable = null;
    this.rebuildColumnMap();
    const table = this.syncTable();
    const headerGroups = table.getHeaderGroups();
    const rows = table.getRowModel().rows;
    const hasSelection = this.isSelectable;
    const hasDetail = this.rowDetail !== null;
    const hasHierarchy = this.hasHierarchy;
    const isGrouped = this.isGrouped;
    const hasExpandCol = this.hasExpandColumn;
    const headerRows = this.headerRowCount();
    const controlCount = this.controlColumnCount();
    const leafCount = table.getVisibleLeafColumns().length;
    if (!o) {
      if (hasDetail && rows !== this.previousRows) this.virtualizer.clearMeasurements();
      this.previousRows = rows;
      this.virtualizer.configure(rows.length, {
        pinnedIndex: this.activeCell && this.activeCell.row >= 0 ? this.activeCell.row : null,
        getScrollElement: () => this.scroller,
        // The sticky header is in-flow before the rows, so the virtualizer's coordinate space must account for it —
        // without these, scrollToIndex (align 'end'/'auto') computes targets that leave the row under the header.
        scrollMargin: this.measureHeaderHeight(),
        scrollPaddingStart: this.measureHeaderHeight(),
        scrollPaddingEnd: this.hasFooterRow && rows.length > 0 ? this.measureRowHeight() : 0,
        estimateSize: (index) => {
          const base = this.measureRowHeight();
          const row = rows[index];
          return hasDetail && row && !row.getIsGrouped() && this.isRowExpanded(row.id) ? base + this.estimateDetailHeight(row.id) : base;
        }
      });
    }
    const virtualItems = o ? [] : this.virtualizer.getVirtualItems();
    const totalSize = o ? rows.length * this.measureRowHeight() : this.virtualizer.getTotalSize();
    const selectableRows = hasSelection ? rows.flatMap((r3) => r3.getIsGrouped() ? r3.getLeafRows().filter((leaf) => !leaf.getIsGrouped()) : [r3]).filter((r3) => r3.getCanSelect()) : [];
    const allSelected = selectableRows.length > 0 && selectableRows.every((r3) => this.selectionState[r3.id]);
    const someSelected = hasSelection && selectableRows.some((r3) => this.selectionState[r3.id]) && !allSelected;
    const hasToolbar = this.withSearch || this.withColumnsMenu;
    const multiSort = this.sortingState.length > 1;
    const pageOffset = !hasHierarchy && this.paginate ? this.page * this.pageSize : 0;
    const hasFooter = this.hasFooterRow;
    const footerRendered = hasFooter && rows.length > 0;
    const ariaRowCount = (hasHierarchy ? headerRows + rows.length : headerRows + this.filteredRowCount) + (footerRendered ? 1 : 0);
    return x`
      <div part="data-grid">
        ${hasToolbar ? this.renderToolbar() : E}
        <div
          part="table"
          role=${hasHierarchy ? "treegrid" : "grid"}
          aria-label=${this.label ?? E}
          aria-rowcount=${ariaRowCount}
          aria-colcount=${controlCount + leafCount}
          aria-multiselectable=${this.selectionMode === "multiple" ? "true" : E}
          @keydown=${this.nav.handleKeyDown}
          @focusin=${this.handleTableFocusIn}
          @pointerover=${this.handleCellPointerOver}
        >
          <div part="header" role="rowgroup">
            ${headerGroups.map(
      (group) => x`
                <div class="row" role="row" aria-rowindex="1">
                  ${hasExpandCol ? this.renderHeaderControlCell(EXPAND_COL) : E}
                  ${hasSelection ? x`
                        <div
                          class="cell cell-control"
                          role="columnheader"
                          data-row-index="-1"
                          data-col-id=${SELECT_COL}
                          aria-colindex=${this.colIndexOf(SELECT_COL)}
                          tabindex=${this.isActive(-1, SELECT_COL) ? "0" : "-1"}
                        >
                          ${this.selectionMode === "multiple" ? x`<wa-checkbox
                                exportparts="base:select-all-checkbox"
                                size=${this.controlSize}
                                tabindex=${this.isActive(-1, SELECT_COL) ? "0" : "-1"}
                                .checked=${allSelected}
                                .indeterminate=${someSelected}
                                @input=${(e3) => this.handleSelectAll(e3.target.checked)}
                              >
                                <span class="wa-visually-hidden"
                                  >${allSelected ? this.localize.term("deselectAllRows") : this.localize.term("selectAllRows")}</span
                                >
                              </wa-checkbox>` : x`<span class="wa-visually-hidden">${this.localize.term("selectRow")}</span>`}
                        </div>
                      ` : E}
                  ${group.headers.map((header) => {
        const col = this.columnById(header.column.id);
        const sortable = header.column.getCanSort();
        const sorted = this.sortingState.find((s) => s.id === header.column.id);
        const sortIndex = this.sortingState.findIndex((s) => s.id === header.column.id);
        return x`
                      <div
                        part="header-cell"
                        class="cell"
                        role="columnheader"
                        data-row-index="-1"
                        data-col-id=${header.column.id}
                        data-align=${col?.headerAlign ?? col?.align ?? E}
                        data-pinned=${this.getColumnPin(header.column.id) || E}
                        ?data-sortable=${sortable}
                        ?data-sorted=${Boolean(sorted)}
                        aria-colindex=${this.colIndexOf(header.column.id)}
                        aria-sort=${sorted ? sorted.desc ? "descending" : "ascending" : sortable ? "none" : E}
                        style=${o2(this.columnStyle(header.column.id, header.getSize()))}
                        tabindex=${this.isActive(-1, header.column.id) ? "0" : "-1"}
                        @click=${sortable ? (e3) => this.handleHeaderClick(header.column.id, e3.shiftKey) : E}
                        @pointerdown=${this.columnMovable(header.column.id) ? (e3) => this.reorder.onHeaderPointerDown(e3, header.column.id) : E}
                      >
                        <span class="header-label">${col?.label ?? ""}</span>
                        ${sortable ? x`<wa-icon
                              part="sort-indicator"
                              class="sort-indicator ${sorted ? "is-sorted" : ""}"
                              name=${sorted ? sorted.desc ? "arrow-down" : "arrow-up" : "up-down"}
                            ></wa-icon>` : E}
                        ${sorted && multiSort ? x`<span part="sort-number" class="sort-number" aria-hidden="true"
                              >${sortIndex + 1}</span
                            >` : E}
                        ${this.getColumnPin(header.column.id) || this.withColumnMenu || col?.filterable ? x`<span class="header-actions">
                              ${col?.filterable ? this.renderFilterButton(header.column.id, col) : E}
                              ${this.getColumnPin(header.column.id) ? x`<button
                                    part="pin-indicator"
                                    class="pin-indicator"
                                    type="button"
                                    tabindex=${this.isActive(-1, header.column.id) ? "0" : "-1"}
                                    aria-label=${this.localize.term("unpinColumn")}
                                    @click=${(e3) => {
          e3.stopPropagation();
          this.pinColumn(header.column.id, false);
          this.dispatchEvent(
            new WaColumnPinEvent({ column: header.column.id, side: false })
          );
        }}
                                  >
                                    <wa-icon name="thumbtack"></wa-icon>
                                  </button>` : E}
                              ${this.withColumnMenu ? this.renderColumnMenu(header.column.id) : E}
                            </span>` : E}
                        ${col && this.columnResizable(col) ? x`<span
                              part="resize-handle"
                              class="resize-handle"
                              role="separator"
                              aria-orientation="vertical"
                              aria-label=${this.localize.term("resizeColumn")}
                              @click=${(e3) => e3.stopPropagation()}
                              @pointerdown=${(e3) => this.handleResizeStart(e3, header.column.id)}
                              @dblclick=${() => this.autoSizeColumn(header.column.id)}
                            ></span>` : E}
                      </div>
                    `;
      })}
                </div>
              `
    )}
          </div>

          <div
            part="body"
            role="rowgroup"
            class=${rows.length === 0 && this.loading ? "is-empty" : ""}
            style=${o2(rows.length === 0 ? {} : { height: `${totalSize}px` })}
          >
            ${rows.length === 0 ? (
      // While a request is in flight the dataset is unknown, so claiming "no data" would be wrong — and the
      // translucent loading overlay would show the message bleeding through behind the spinner. Let the
      // overlay stand alone until the rows arrive.
      this.loading ? E : this.searchTerm !== "" || this.columnFiltersState.length > 0 ? (
        // An active search/filter matching nothing is "no results", not "no data". The user should clear
        // filters, not assume the dataset is empty.
        x`<div part="no-results" class="no-results">
                      <slot name="no-results">${this.localize.term("noResults")}</slot>
                    </div>`
      ) : x`<div part="empty"><slot name="empty">${this.localize.term("noData")}</slot></div>`
    ) : c(
      virtualItems,
      (item) => rows[item.index].id,
      (item) => {
        const row = rows[item.index];
        const isGroupRow = isGrouped && row.getIsGrouped();
        const hasSelectableDescendant = hasSelection && hasHierarchy && row.subRows.length > 0 && row.getLeafRows().some((leaf) => !leaf.getIsGrouped() && leaf.getCanSelect());
        const selected = isGroupRow ? hasSelectableDescendant && row.getIsAllSubRowsSelected() : Boolean(this.selectionState[row.id]);
        const canExpand = hasDetail || hasHierarchy && row.getCanExpand();
        const expanded = canExpand && this.isRowExpanded(row.id);
        const detailExpanded = hasDetail && !isGroupRow && expanded;
        const ariaRowIndex = headerRows + pageOffset + item.index + 1;
        const depthIndent = hasHierarchy && row.depth > 0 ? `calc(${row.depth} * var(--indent-size))` : null;
        return x`
                      <div
                        part="row${isGroupRow ? " group-row" : ""}"
                        class="row ${hasDetail ? "has-detail" : ""} ${!isGroupRow && this.rowClass?.(row.original) || ""}"
                        role="row"
                        aria-rowindex=${ariaRowIndex}
                        aria-level=${hasHierarchy ? row.depth + 1 : E}
                        aria-expanded=${hasHierarchy && row.getCanExpand() ? expanded ? "true" : "false" : E}
                        ?data-selected=${selected && !isGroupRow}
                        ?data-expanded=${expanded}
                        ?data-grouped=${isGroupRow}
                        aria-selected=${hasSelection && !isGroupRow ? selected : E}
                        data-index=${item.index}
                        data-depth=${hasHierarchy ? row.depth : E}
                        data-stripe=${item.index % 2 === 0 ? "even" : "odd"}
                        style=${o2({
          // Virtual item starts include the scrollMargin (header height); rows are positioned
          // inside a container that already sits below the header, so subtract it back out.
          transform: `translateY(${item.start - this.virtualizer.scrollMargin}px)`
        })}
                      >
                        <div class="row-main">
                          ${hasExpandCol ? x`<div
                                class="cell cell-control"
                                role="gridcell"
                                data-row-index=${item.index}
                                data-col-id=${EXPAND_COL}
                                aria-colindex=${this.colIndexOf(EXPAND_COL)}
                                aria-expanded=${canExpand && !(hasHierarchy && row.getCanExpand()) ? expanded ? "true" : "false" : E}
                                tabindex=${this.isActive(item.index, EXPAND_COL) ? "0" : "-1"}
                                style=${depthIndent ? o2({ marginInlineStart: depthIndent }) : E}
                              >
                                ${canExpand ? x`<button
                                      part="expand-button"
                                      class="expand-toggle"
                                      type="button"
                                      tabindex=${this.isActive(item.index, EXPAND_COL) ? "0" : "-1"}
                                      aria-label=${expanded ? this.localize.term("collapseRow") : this.localize.term("expandRow")}
                                      @click=${() => this.toggleRowExpansion(row.id, row.original)}
                                    >
                                      <wa-icon
                                        name=${expanded ? "chevron-down" : this.localize.dir() === "rtl" ? "chevron-left" : "chevron-right"}
                                      ></wa-icon>
                                    </button>` : E}
                              </div>` : E}
                          ${hasSelection ? x`<div
                                class="cell cell-control"
                                role="gridcell"
                                data-row-index=${item.index}
                                data-col-id=${SELECT_COL}
                                aria-colindex=${this.colIndexOf(SELECT_COL)}
                                tabindex=${this.isActive(item.index, SELECT_COL) ? "0" : "-1"}
                                style=${depthIndent && !hasExpandCol ? o2({ marginInlineStart: depthIndent }) : E}
                              >
                                <wa-checkbox
                                  size=${this.controlSize}
                                  tabindex=${this.isActive(item.index, SELECT_COL) ? "0" : "-1"}
                                  .checked=${selected}
                                  .indeterminate=${hasHierarchy && !selected && (row.getIsSomeSelected() || !isGroupRow && hasSelectableDescendant && row.getIsAllSubRowsSelected())}
                                  ?disabled=${isGroupRow ? !hasSelectableDescendant : this.selectableRows != null && !row.getCanSelect()}
                                  @click=${(e3) => {
          const checked = e3.target.checked;
          if (isGroupRow) this.handleGroupRowToggle(row, checked);
          else this.handleRowCheckboxClick(item.index, row.id, checked, e3.shiftKey);
        }}
                                >
                                  <span class="wa-visually-hidden"
                                    >${this.localize.term(isGroupRow ? "selectGroup" : "selectRow")}</span
                                  >
                                </wa-checkbox>
                              </div>` : E}
                          ${row.getVisibleCells().map((cell, cellIndex) => {
          const col = this.columnById(cell.column.id);
          const isGroupedCell = isGroupRow && cell.getIsGrouped();
          const isAggregatedCell = isGroupRow && !isGroupedCell && Boolean(col?.aggregation);
          const value = !isGroupRow || isGroupedCell || isAggregatedCell ? cell.getValue() : void 0;
          const cellClass = typeof col?.cellClass === "function" ? col.cellClass(value, row.original) : col?.cellClass ?? "";
          let content;
          if (isGroupRow) {
            if (isGroupedCell) {
              const memberCount = row.getLeafRows().filter((leaf) => !leaf.getIsGrouped()).length;
              content = x`<span part="group-value" class="group-value"
                                    >${this.renderCell(col, value, row.original)}</span
                                  >
                                  <span part="group-count" class="group-count">(${memberCount})</span>`;
            } else if (isAggregatedCell) {
              content = col?.aggregatedFormatter ? col.aggregatedFormatter(
                value,
                row.getLeafRows().filter((leaf) => !leaf.getIsGrouped()).map((leaf) => leaf.original)
              ) : this.renderCell(col, value, row.original);
            } else {
              content = "";
            }
          } else {
            content = this.renderCell(col, value, row.original);
          }
          const isText = typeof content === "string";
          const isFirstDataCell = cellIndex === 0;
          const hasLeadingControl = hasExpandCol || hasSelection;
          const cellIndent = depthIndent && isFirstDataCell ? hasLeadingControl ? { marginInlineEnd: `calc(-1 * ${depthIndent})` } : { marginInlineStart: depthIndent } : {};
          const contentIndent = depthIndent && isGroupRow && isGroupedCell ? { marginInlineStart: depthIndent } : {};
          return x`
                              <div
                                part="cell"
                                class="cell ${cellClass}"
                                role="gridcell"
                                data-row-index=${item.index}
                                data-col-id=${cell.column.id}
                                data-align=${col?.align ?? E}
                                data-pinned=${this.getColumnPin(cell.column.id) || E}
                                aria-colindex=${this.colIndexOf(cell.column.id)}
                                tabindex=${this.isActive(item.index, cell.column.id) ? "0" : "-1"}
                                style=${o2({
            ...this.columnStyle(cell.column.id, cell.column.getSize()),
            ...cellIndent
          })}
                                @click=${isGroupRow ? E : () => this.dispatchEvent(
            new WaCellClickEvent({
              column: cell.column.id,
              value,
              row: row.original,
              rowIndex: item.index
            })
          )}
                                @contextmenu=${isGroupRow ? E : (e3) => {
            const event = new WaCellContextmenuEvent({
              column: cell.column.id,
              value,
              row: row.original,
              rowIndex: item.index,
              originalEvent: e3
            });
            if (!this.dispatchEvent(event)) e3.preventDefault();
          }}
                              >
                                <div
                                  class="cell-content ${isText ? "cell-content-text" : ""} ${isGroupedCell ? "cell-content-group" : ""}"
                                  style=${o2(contentIndent)}
                                >
                                  ${content}
                                </div>
                              </div>
                            `;
        })}
                        </div>
                        ${detailExpanded ? x`<div part="row-detail" class="detail-content" data-row-id=${row.id} role="gridcell">
                              ${this.rowDetail(row.original)}
                            </div>` : E}
                      </div>
                    `;
      }
    )}
          </div>
          ${hasFooter && rows.length > 0 ? this.renderFooterRow(hasSelection, hasExpandCol, ariaRowCount) : E}
        </div>

        ${this.loading ? x`<div part="loading-overlay">
              <slot name="loading"><wa-spinner></wa-spinner></slot>
            </div>` : E}
        ${this.paginate && rows.length > 0 ? this.renderPager() : E}

        <div part="live-region" class="wa-visually-hidden-force" aria-live="polite" aria-atomic="true">
          ${this.liveAnnouncement}
        </div>
      </div>
    `;
  }
  /** Whether a given coordinate is the active (roving tabindex=0) cell. */
  isActive(row, col) {
    return this.activeCell?.row === row && this.activeCell?.col === col;
  }
  renderHeaderControlCell(colId) {
    return x`<div
      class="cell cell-control"
      role="columnheader"
      data-row-index="-1"
      data-col-id=${colId}
      aria-colindex=${this.colIndexOf(colId)}
      tabindex=${this.isActive(-1, colId) ? "0" : "-1"}
    >
      <span class="wa-visually-hidden">${this.localize.term("expandRow")}</span>
    </div>`;
  }
  columnStyle(columnId, size) {
    const resized = this.columnSizingState[columnId];
    const col = this.columnById(columnId);
    let explicit = resized ?? (size && size !== 150 ? col?.width ?? size : col?.width);
    if (resized == null && explicit != null) {
      const floor = this.headerMinWidths[columnId];
      if (floor != null && floor > explicit) explicit = floor;
    }
    let base;
    if (explicit != null) {
      base = { flex: `0 0 ${explicit}px`, width: `${explicit}px` };
    } else if (col?.flex != null) {
      base = {
        flex: `${col.flex} 1 0`,
        minWidth: `${col.minWidth ?? 0}px`,
        ...col.maxWidth != null ? { maxWidth: `${col.maxWidth}px` } : {}
      };
    } else {
      base = { flex: "1 1 0", minWidth: "0" };
    }
    return { ...base, ...this.pinnedStyle(columnId) };
  }
  /**
   * Sticky-position CSS for a pinned column. The inline-start/-end offset is the cumulative width of the pinned
   * columns before it (`getStart('start')` / `getAfter('end')`). `pinColumn` freezes the width into `columnSizing` so
   * rendered width, flex basis, and offsets agree — else an unsized flex column reports the default 150 and mis-offsets
   * the next pinned column. Pinned columns stay in their natural DOM slot and are merely sticky-shifted, so pinning
   * reads cleanest when the column already sits near that edge in column order.
   */
  pinnedStyle(columnId) {
    const side = this.getColumnPin(columnId);
    if (side === false) return {};
    const column = this.syncTable().getColumn(columnId);
    if (!column) return {};
    const offset = side === "left" ? column.getStart("start") : column.getAfter("end");
    return {
      position: "sticky",
      [side === "left" ? "insetInlineStart" : "insetInlineEnd"]: `${offset}px`,
      // Above the focus-visible cell outline (z-index 2 in the stylesheet) so scrolled-under cells can't paint
      // their focus ring over the sticky pinned band.
      zIndex: "3"
    };
  }
  renderCell(col, value, row) {
    if (col?.formatter) {
      return col.formatter(value, row);
    }
    return value == null ? "" : String(value);
  }
  /** Whether any currently-visible column defines a footer. */
  get hasFooterRow() {
    return this.columns.some(
      (col, index) => col.footer != null && this.effectiveVisibility[this.columnId(col, index)] !== false
    );
  }
  /**
   * The rows a footer function receives: the filtered + sorted set across every page (top-level rows for tree data).
   * Grouping inserts synthetic parents post-filter, so grouped grids hand over the underlying data rows instead. In
   * server mode that's whatever is currently loaded.
   */
  footerRows() {
    const table = this.syncTable();
    const rows = this.isManual ? table.getRowModel().rows : this.isGrouped ? table.getFilteredRowModel().rows : table.getSortedRowModel().rows;
    return rows.map((row) => row.original);
  }
  /**
   * The column footer row, pinned to the bottom of the scroll area. Cells mirror the header's layout (control columns,
   * sizing, alignment, pinning) so footers line up with their columns.
   */
  renderFooterRow(hasSelection, hasExpandCol, ariaRowIndex) {
    const rows = this.footerRows();
    return x`
      <div class="table-footer" role="rowgroup">
        <div part="footer-row" class="row" role="row" aria-rowindex=${ariaRowIndex}>
          ${hasExpandCol ? x`<div class="cell cell-control" role="gridcell" aria-colindex=${this.colIndexOf(EXPAND_COL)}></div>` : E}
          ${hasSelection ? x`<div class="cell cell-control" role="gridcell" aria-colindex=${this.colIndexOf(SELECT_COL)}></div>` : E}
          ${this.visibleColumnsInRenderOrder().map((column) => {
      const col = this.columnById(column.id);
      const footer = col?.footer;
      const content = typeof footer === "function" ? footer(rows) : footer ?? "";
      return x`
              <div
                part="footer-cell"
                class="cell"
                role="gridcell"
                data-col-id=${column.id}
                data-align=${col?.align ?? E}
                data-pinned=${this.getColumnPin(column.id) || E}
                aria-colindex=${this.colIndexOf(column.id)}
                style=${o2(this.columnStyle(column.id, column.getSize()))}
              >
                <div class="cell-content ${typeof content === "string" ? "cell-content-text" : ""}">${content}</div>
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderToolbar() {
    return x`
      <div part="toolbar">
        ${this.withSearch ? x`<wa-input
              part="search"
              class="toolbar-search wa-visually-hidden-label"
              type="search"
              size=${this.controlSize}
              label=${this.localize.term("search")}
              placeholder=${this.localize.term("search")}
              with-clear
              .value=${this.searchTerm}
              @input=${(e3) => this.handleSearchInput(e3.target.value)}
            >
              <wa-icon slot="start" name="magnifying-glass"></wa-icon>
            </wa-input>` : E}
        ${this.withColumnsMenu ? this.renderColumnsMenu() : E}
      </div>
    `;
  }
  renderColumnsMenu() {
    return x`
      <wa-dropdown
        part="columns-menu"
        class="columns-menu"
        @wa-select=${(e3) => {
      e3.stopPropagation();
      const item = e3.detail.item;
      if (item.dataset.action === "reset-columns") {
        this.resetColumns();
        return;
      }
      e3.preventDefault();
      const columnId = item.dataset.columnId;
      if (columnId) {
        this.toggleColumn(columnId, item.checked);
        this.dispatchEvent(new WaColumnVisibilityChangeEvent({ column: columnId, visible: item.checked }));
      }
    }}
      >
        <wa-button slot="trigger" size=${this.controlSize} appearance="plain" with-caret>
          <wa-icon slot="start" name="table-columns"></wa-icon>
          ${this.localize.term("columns")}
        </wa-button>
        ${this.columns.map((col, index) => {
      if ((col.hideable ?? true) === false) return E;
      if (!col.label?.trim()) return E;
      const id = this.columnId(col, index);
      const visible = this.effectiveVisibility[id] !== false;
      return x`<wa-dropdown-item type="checkbox" ?checked=${visible} data-column-id=${id}>
            ${col.label ?? id}
          </wa-dropdown-item>`;
    })}
        <wa-divider></wa-divider>
        <wa-dropdown-item data-action="reset-columns">${this.localize.term("resetColumns")}</wa-dropdown-item>
      </wa-dropdown>
    `;
  }
  /** The per-column header menu (kebab → dropdown). Items are gated by the column's capabilities. */
  renderColumnMenu(columnId) {
    const col = this.columnById(columnId);
    if (!col) return E;
    const canSort = this.syncTable().getColumn(columnId)?.getCanSort() ?? false;
    const canHide = col.hideable ?? true;
    const canPin = this.columnPinnableFor(col);
    const canResize = this.columnResizable(col);
    const pin = this.getColumnPin(columnId);
    const sorted = this.sortingState.find((s) => s.id === columnId);
    if (!canSort && !canHide && !canPin && !canResize) return E;
    const runAction = (action) => {
      switch (action) {
        case "pin-left":
          this.pinColumn(columnId, "left");
          this.dispatchEvent(new WaColumnPinEvent({ column: columnId, side: "left" }));
          break;
        case "pin-right":
          this.pinColumn(columnId, "right");
          this.dispatchEvent(new WaColumnPinEvent({ column: columnId, side: "right" }));
          break;
        case "unpin":
          this.pinColumn(columnId, false);
          this.dispatchEvent(new WaColumnPinEvent({ column: columnId, side: false }));
          break;
        case "sort-asc":
          this.setColumnSort(columnId, false);
          break;
        case "sort-desc":
          this.setColumnSort(columnId, true);
          break;
        case "clear-sort":
          this.clearColumnSort(columnId);
          break;
        case "hide":
          this.toggleColumn(columnId, false);
          this.dispatchEvent(new WaColumnVisibilityChangeEvent({ column: columnId, visible: false }));
          break;
        case "autosize":
          this.autoSizeColumn(columnId);
          break;
      }
    };
    return x`
      <wa-dropdown
        part="column-menu"
        class="column-menu"
        @wa-select=${(e3) => {
      e3.stopPropagation();
      const item = e3.detail.item;
      const action = item?.dataset.action;
      if (action) runAction(action);
    }}
        @click=${(e3) => e3.stopPropagation()}
        @pointerdown=${(e3) => e3.stopPropagation()}
      >
        <wa-button
          slot="trigger"
          class="column-menu-trigger"
          part="column-menu-button"
          size=${this.controlSize}
          appearance="plain"
          tabindex=${this.isActive(-1, columnId) ? "0" : "-1"}
        >
          <wa-icon name="ellipsis-vertical" label=${this.localize.term("columnMenu")}></wa-icon>
        </wa-button>
        ${canSort ? x`
              <wa-dropdown-item data-action="sort-asc" ?checked=${Boolean(sorted) && !sorted.desc}>
                ${this.localize.term("sortAscending")}
              </wa-dropdown-item>
              <wa-dropdown-item data-action="sort-desc" ?checked=${Boolean(sorted) && sorted.desc}>
                ${this.localize.term("sortDescending")}
              </wa-dropdown-item>
              ${sorted ? x`<wa-dropdown-item data-action="clear-sort">${this.localize.term("clearSort")}</wa-dropdown-item>` : E}
            ` : E}
        ${canPin ? x`
              ${canSort ? x`<wa-divider></wa-divider>` : E}
              <wa-dropdown-item data-action="pin-left" ?checked=${pin === "left"}>
                ${this.localize.term("pinLeft")}
              </wa-dropdown-item>
              <wa-dropdown-item data-action="pin-right" ?checked=${pin === "right"}>
                ${this.localize.term("pinRight")}
              </wa-dropdown-item>
              ${pin ? x`<wa-dropdown-item data-action="unpin">${this.localize.term("unpin")}</wa-dropdown-item>` : E}
            ` : E}
        ${canHide || canResize ? x`
              ${canSort || canPin ? x`<wa-divider></wa-divider>` : E}
              ${canResize ? x`<wa-dropdown-item data-action="autosize"
                    >${this.localize.term("autosizeColumn")}</wa-dropdown-item
                  >` : E}
              ${canHide ? x`<wa-dropdown-item data-action="hide">${this.localize.term("hideColumn")}</wa-dropdown-item>` : E}
            ` : E}
      </wa-dropdown>
    `;
  }
  /** Renders a filterable column's funnel button plus the anchored popover panel holding its filter controls. */
  renderFilterButton(columnId, col) {
    const isFiltered = this.columnFiltersState.some((f) => f.id === columnId);
    const open = this.openFilterColumn === columnId;
    return x`
      <button
        id="filter-trigger-${columnId}"
        part="filter-button"
        class="filter-trigger ${isFiltered ? "is-filtered" : ""}"
        type="button"
        tabindex=${this.isActive(-1, columnId) ? "0" : "-1"}
        aria-label=${this.localize.term("filterByColumn", col.label ?? columnId)}
        aria-haspopup="dialog"
        aria-expanded=${open ? "true" : "false"}
        @click=${(e3) => e3.stopPropagation()}
        @pointerdown=${(e3) => e3.stopPropagation()}
      >
        <wa-icon name="filter"></wa-icon>
      </button>
      <wa-popover
        for="filter-trigger-${columnId}"
        exportparts="dialog:filter-panel"
        class="filter-panel"
        placement="bottom-end"
        without-arrow
        distance="4"
        @wa-show=${(e3) => {
      e3.stopPropagation();
      this.filterOptionQuery = "";
      this.openFilterColumn = columnId;
    }}
        @wa-after-show=${(e3) => {
      e3.stopPropagation();
      this.focusFilterPanel(e3.target);
    }}
        @wa-hide=${(e3) => {
      e3.stopPropagation();
      if (this.openFilterColumn === columnId) this.openFilterColumn = null;
    }}
        @wa-after-hide=${(e3) => e3.stopPropagation()}
        @click=${(e3) => e3.stopPropagation()}
        @pointerdown=${(e3) => e3.stopPropagation()}
      >
        ${open ? this.renderFilterPanel(columnId, col) : E}
      </wa-popover>
    `;
  }
  /** Moves focus to the first control in a just-opened filter panel (panel contents render on open, after Lit updates). */
  async focusFilterPanel(popover) {
    await this.updateComplete;
    popover.querySelector("wa-input, wa-date-input, wa-checkbox, wa-button")?.focus({
      preventScroll: true
    });
  }
  /** Renders the contents of a column's filter panel appropriate to its `filterType`. */
  renderFilterPanel(columnId, col) {
    let type = col.filterType ?? "text";
    if (this.isManual && !col.filterOptions && (type === "set" || type === "includes-any" || type === "includes-all")) {
      type = "text";
    }
    const filterValue = this.columnFiltersState.find((f) => f.id === columnId)?.value;
    let controls;
    if (type === "set" || type === "includes-any" || type === "includes-all") {
      controls = this.renderFilterOptions(columnId, col, type, filterValue);
    } else if (type === "date-range") {
      const range = Array.isArray(filterValue) ? filterValue : [];
      const setRange = (index, raw) => {
        const live = this.columnFiltersState.find((f) => f.id === columnId)?.value;
        const current = Array.isArray(live) ? live : [];
        const next = [current[0], current[1]];
        next[index] = raw === "" ? void 0 : raw;
        this.handleColumnFilter(columnId, next);
      };
      controls = x`
        <wa-date-input
          size=${this.controlSize}
          with-clear
          label=${this.localize.term("filterFrom")}
          .value=${range[0] ?? ""}
          @change=${(e3) => setRange(0, e3.target.value)}
        ></wa-date-input>
        <wa-date-input
          size=${this.controlSize}
          with-clear
          label=${this.localize.term("filterTo")}
          .value=${range[1] ?? ""}
          @change=${(e3) => setRange(1, e3.target.value)}
        ></wa-date-input>
      `;
    } else if (type === "number-range") {
      const range = Array.isArray(filterValue) ? filterValue : [];
      const setRange = (index, raw) => {
        const live = this.columnFiltersState.find((f) => f.id === columnId)?.value;
        const current = Array.isArray(live) ? live : [];
        const next = [current[0], current[1]];
        next[index] = raw === "" ? void 0 : Number(raw);
        this.handleColumnFilter(columnId, next);
      };
      controls = x`
        <wa-input
          type="number"
          size=${this.controlSize}
          label=${this.localize.term("filterMin")}
          .value=${range[0] != null ? String(range[0]) : ""}
          @input=${(e3) => setRange(0, e3.target.value)}
        ></wa-input>
        <wa-input
          type="number"
          size=${this.controlSize}
          label=${this.localize.term("filterMax")}
          .value=${range[1] != null ? String(range[1]) : ""}
          @input=${(e3) => setRange(1, e3.target.value)}
        ></wa-input>
      `;
    } else {
      controls = x`
        <wa-input
          class="wa-visually-hidden-label"
          size=${this.controlSize}
          label=${this.localize.term("filterByColumn", col.label ?? columnId)}
          placeholder=${this.localize.term("search")}
          with-clear
          .value=${filterValue ?? ""}
          @input=${(e3) => this.handleColumnFilter(columnId, e3.target.value)}
        ></wa-input>
      `;
    }
    return x`
      <div class="filter-panel-content">
        ${controls}
        <div class="filter-panel-footer">
          <wa-button
            size=${this.controlSize}
            appearance="filled"
            ?disabled=${isEmptyFilterValue(filterValue)}
            @click=${(e3) => {
      this.handleColumnFilter(columnId, void 0);
      const popover = e3.target.closest("wa-popover");
      if (popover) this.focusFilterPanel(popover);
    }}
          >
            ${this.localize.term("clearFilter")}
          </wa-button>
        </div>
      </div>
    `;
  }
  /**
   * Renders the value picker for `set`/`includes-*` filters: a search box (when the list is long), then one checkbox
   * per distinct value with its row count. Checking values keeps the matching rows; unchecking all clears the filter.
   */
  renderFilterOptions(columnId, col, type, filterValue) {
    let options;
    if (col.filterOptions) {
      options = col.filterOptions.map((o3) => ({
        value: String(o3.value),
        label: o3.label ?? String(o3.value),
        count: o3.count
      }));
    } else {
      const counts = /* @__PURE__ */ new Map();
      if (type === "set") {
        for (const [value, count] of this.getColumnFacets(columnId).uniqueValues) {
          if (value == null || value === "") continue;
          const key = String(value);
          counts.set(key, (counts.get(key) ?? 0) + count);
        }
      } else {
        for (const row of this.syncTable().getCoreRowModel().flatRows) {
          const value = row.getValue(columnId);
          if (!Array.isArray(value)) continue;
          for (const entry of new Set(value.map((v2) => v2 == null ? "" : String(v2)))) {
            if (entry !== "") counts.set(entry, (counts.get(entry) ?? 0) + 1);
          }
        }
      }
      options = [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([value, count]) => ({ value, label: value, count }));
    }
    const selected = Array.isArray(filterValue) ? filterValue.map(String) : [];
    const query = this.filterOptionQuery.trim().toLowerCase();
    const visible = query ? options.filter((o3) => o3.label.toLowerCase().includes(query)) : options;
    const toggle = (value, checked) => {
      const live = this.columnFiltersState.find((f) => f.id === columnId)?.value;
      const current = Array.isArray(live) ? live.map(String) : [];
      const next = checked ? [...current.filter((v2) => v2 !== value), value] : current.filter((v2) => v2 !== value);
      this.handleColumnFilter(columnId, next);
    };
    return x`
      ${options.length > 10 ? x`<wa-input
            class="wa-visually-hidden-label"
            size=${this.controlSize}
            label=${this.localize.term("search")}
            placeholder=${this.localize.term("search")}
            with-clear
            .value=${this.filterOptionQuery}
            @input=${(e3) => this.filterOptionQuery = e3.target.value}
          ></wa-input>` : E}
      <div class="filter-options">
        ${visible.map(
      (option) => x`
            <wa-checkbox
              size=${this.controlSize}
              .checked=${selected.includes(option.value)}
              @input=${(e3) => toggle(option.value, e3.target.checked)}
            >
              <span class="filter-option-label">${option.label}</span>
              ${option.count != null ? x`<span class="filter-option-count">${this.localize.number(option.count)}</span>` : E}
            </wa-checkbox>
          `
    )}
        ${visible.length === 0 ? x`<div class="filter-options-empty">${this.localize.term("empty")}</div>` : E}
      </div>
    `;
  }
  renderPager() {
    const total = this.filteredRowCount;
    const start = total === 0 ? 0 : this.page * this.pageSize + 1;
    const end = Math.min(total, (this.page + 1) * this.pageSize);
    const sizeOptions = this.pageSizeOptions;
    return x`
      <div part="footer">
        <span class="pager-info">${this.localize.term("showingXtoYofZ", start, end, total)}</span>
        ${sizeOptions.length > 1 ? x`<wa-select
              part="page-size"
              class="page-size wa-visually-hidden-label"
              size=${this.controlSize}
              label=${this.localize.term("rowsPerPage")}
              .value=${String(this.pageSize)}
              @change=${(e3) => this.handlePageSizeChange(Number(e3.target.value))}
            >
              ${sizeOptions.map((n2) => x`<wa-option value=${n2}>${n2}</wa-option>`)}
            </wa-select>` : E}
        <wa-pagination
          part="pager"
          class="pager"
          exportparts="button:pager-button, previous-button, next-button, first-button, last-button, page, page-current, ellipsis"
          appearance="plain"
          with-edges
          sibling-count="1"
          .total=${total}
          .pageSize=${this.pageSize}
          .page=${this.page + 1}
          @wa-before-page-change=${(e3) => e3.stopPropagation()}
          @wa-page-change=${(e3) => {
      e3.stopPropagation();
      this.goToPage((e3.target.page ?? 1) - 1);
    }}
        ></wa-pagination>
      </div>
    `;
  }
};
WaDataGrid.css = [size_styles_default, visually_hidden_styles_default, data_grid_styles_default];
__decorateClass([
  e2('[part~="table"]')
], WaDataGrid.prototype, "scroller", 2);
__decorateClass([
  n({ attribute: false, hasChanged: () => true })
], WaDataGrid.prototype, "data", 2);
__decorateClass([
  n({ attribute: false, hasChanged: () => true })
], WaDataGrid.prototype, "columns", 2);
__decorateClass([
  n({ attribute: "row-key" })
], WaDataGrid.prototype, "rowKey", 2);
__decorateClass([
  n({ attribute: false })
], WaDataGrid.prototype, "selectableRows", 2);
__decorateClass([
  n({ reflect: true })
], WaDataGrid.prototype, "selectable", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaDataGrid.prototype, "paginate", 2);
__decorateClass([
  n({ attribute: "page-size", type: Number })
], WaDataGrid.prototype, "pageSize", 2);
__decorateClass([
  n({ attribute: false })
], WaDataGrid.prototype, "pageSizeOptions", 2);
__decorateClass([
  n({ type: Number, reflect: true })
], WaDataGrid.prototype, "page", 2);
__decorateClass([
  n({ attribute: "without-sort-removal", type: Boolean, reflect: true })
], WaDataGrid.prototype, "withoutSortRemoval", 2);
__decorateClass([
  n({ attribute: "sort-desc-first", type: Boolean })
], WaDataGrid.prototype, "sortDescFirst", 2);
__decorateClass([
  n({ attribute: "max-multi-sort", type: Number })
], WaDataGrid.prototype, "maxMultiSort", 2);
__decorateClass([
  n({ attribute: "with-search", type: Boolean, reflect: true })
], WaDataGrid.prototype, "withSearch", 2);
__decorateClass([
  n({ attribute: false })
], WaDataGrid.prototype, "searchTerm", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaDataGrid.prototype, "resizable", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaDataGrid.prototype, "reorderable", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaDataGrid.prototype, "pinnable", 2);
__decorateClass([
  n({ attribute: "with-column-menu", type: Boolean, reflect: true })
], WaDataGrid.prototype, "withColumnMenu", 2);
__decorateClass([
  n({ attribute: "with-columns-menu", type: Boolean, reflect: true })
], WaDataGrid.prototype, "withColumnsMenu", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaDataGrid.prototype, "striped", 2);
__decorateClass([
  n({ attribute: false })
], WaDataGrid.prototype, "rowDetail", 2);
__decorateClass([
  n({ attribute: false })
], WaDataGrid.prototype, "rowClass", 2);
__decorateClass([
  n({ attribute: "child-rows" })
], WaDataGrid.prototype, "childRows", 2);
__decorateClass([
  n({ attribute: "filter-from-leaf-rows", type: Boolean })
], WaDataGrid.prototype, "filterFromLeafRows", 2);
__decorateClass([
  n({ attribute: "group-by" })
], WaDataGrid.prototype, "groupBy", 2);
__decorateClass([
  n({ attribute: false })
], WaDataGrid.prototype, "dataSource", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaDataGrid.prototype, "server", 2);
__decorateClass([
  n({ attribute: "filter-debounce", type: Number })
], WaDataGrid.prototype, "filterDebounce", 2);
__decorateClass([
  n({ attribute: false })
], WaDataGrid.prototype, "searchFn", 2);
__decorateClass([
  n({ type: Number })
], WaDataGrid.prototype, "total", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaDataGrid.prototype, "loading", 2);
__decorateClass([
  n()
], WaDataGrid.prototype, "label", 2);
__decorateClass([
  n({ reflect: true })
], WaDataGrid.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], WaDataGrid.prototype, "size", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "selectionState", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "sortingState", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "columnFiltersState", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "openFilterColumn", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "filterOptionQuery", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "columnVisibilityState", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "columnSizingState", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "headerMinWidths", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "columnPinningState", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "expandedState", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "columnOrderState", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "activeCell", 2);
__decorateClass([
  r2()
], WaDataGrid.prototype, "liveAnnouncement", 2);
__decorateClass([
  watch(["dataSource", "server"], { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handleDataSourceChange", 1);
__decorateClass([
  watch("page", { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handlePageChange", 1);
__decorateClass([
  watch("pageSize", { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handlePageSizeWatch", 1);
__decorateClass([
  watch("groupBy", { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handleGroupByWatch", 1);
__decorateClass([
  watch("total", { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handleTotalChange", 1);
__decorateClass([
  watch("searchTerm", { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handleSearchTermChange", 1);
__decorateClass([
  watch("data", { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handleDataChange", 1);
__decorateClass([
  watch("size", { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handleSizeChange", 1);
__decorateClass([
  watch("columns", { waitUntilFirstUpdate: true })
], WaDataGrid.prototype, "handleColumnsChange", 1);
WaDataGrid = __decorateClass([
  t2("wa-data-grid")
], WaDataGrid);
WaDataGrid.disableWarning?.("change-in-update");
function isEmptyFilterValue(value) {
  if (value == null || value === "") return true;
  if (Array.isArray(value)) {
    return value.length === 0 || value.every((v2) => v2 == null || v2 === "");
  }
  return false;
}
function escapeSpreadsheetFormula(value) {
  if (!/^[=+\-@]/.test(value)) return value;
  if (/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(value)) return value;
  return `'${value}`;
}
function toDayNumber(value) {
  if (value == null || value === "") return null;
  if (typeof value === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|[T\s])/.exec(value);
    if (match) return Number(match[1]) * 1e4 + Number(match[2]) * 100 + Number(match[3]);
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.getFullYear() * 1e4 + (date.getMonth() + 1) * 100 + date.getDate();
}
function getByPath(row, path) {
  if (path in row) return row[path];
  return path.split(".").reduce((acc, key) => {
    if (acc != null && typeof acc === "object") return acc[key];
    return void 0;
  }, row);
}
function cssId(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
  return value.replace(/["\\]/g, "\\$&");
}
var measureCanvas = null;
function getMeasureContext() {
  if (typeof document === "undefined") return null;
  if (!measureCanvas) measureCanvas = document.createElement("canvas");
  return measureCanvas.getContext("2d");
}

export {
  WaDataGrid
};
/*! Bundled license information:

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
