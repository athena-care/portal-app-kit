/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  i
} from "./chunk.E4Q7ZNYW.js";

// _bundle_/src/components/data-grid/data-grid.styles.ts
var data_grid_styles_default = i`
  :host {
    --accent-color: var(--wa-color-brand-fill-loud);
    --background-color: var(--wa-color-surface-default);
    --text-color: var(--wa-color-text-normal);
    --border-color: var(--wa-color-surface-border);
    --border-width: var(--wa-border-width-s);
    --border-radius: var(--wa-border-radius-m);
    --max-height: 30rem;
    --row-height: 3.5rem;
    --header-row-height: var(--row-height);
    --cell-padding: var(--wa-space-m);
    /* Opaque so scrolled rows don't bleed through the sticky header/footer. */
    --header-background: var(--wa-color-surface-lowered);
    --header-text-color: var(--wa-color-text-normal);
    /* Matches the header so hovered rows read as part of the same surface system. */
    --row-hover-background: var(--wa-color-surface-lowered);
    --stripe-background: var(--wa-color-neutral-fill-quiet);
    --selected-background: var(--wa-color-brand-fill-quiet);
    --selected-border-color: var(--wa-color-brand-border-quiet);
    --focus-ring: var(--wa-focus-ring);
    --transition-duration: var(--wa-transition-normal);
    /* em so the per-level tree indent tracks the grid's font scale (and therefore its size attribute). */
    --indent-size: 1.25em;

    /* The accent drives the form controls the grid renders (checkboxes, inputs) through the shared control token. */
    --wa-form-control-activated-color: var(--accent-color);

    display: block;
    color: var(--text-color);
    font-family: var(--wa-font-family-body);
    font-size: var(--wa-font-size-m);
  }

  /* Size drives row height + cell padding (font scale comes from shared size.styles). */
  :host([size='xs']) {
    --row-height: 2.25rem;
    --cell-padding: var(--wa-space-xs);
  }
  :host([size='s']),
  :host([size='small']) {
    --row-height: 2.5rem;
    --cell-padding: var(--wa-space-s);
  }
  :host([size='m']),
  :host([size='medium']) {
    --row-height: 3.5rem;
    --cell-padding: var(--wa-space-m);
  }
  :host([size='l']),
  :host([size='large']) {
    --row-height: 4rem;
    --cell-padding: var(--wa-space-m);
  }
  :host([size='xl']) {
    --row-height: 4.5rem;
    --cell-padding: var(--wa-space-l);
  }

  [part~='data-grid'] {
    position: relative;
    display: flex;
    flex-direction: column;
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    background-color: var(--background-color);
  }

  :host([appearance='plain']) [part~='data-grid'] {
    border: none;
    border-radius: 0;
    background-color: transparent;
  }

  /* Owns vertical scrolling for virtualization; default max-height gives the virtualizer a measurable viewport
     (override --max-height, or none for natural height). display:grid drops table semantics — ARIA roles set in
     the template. */
  [part~='table'] {
    display: grid;
    width: 100%;
    max-height: var(--max-height);
    overflow: auto;
  }

  [part~='header'] {
    display: grid;
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    background-color: var(--header-background);
    color: var(--header-text-color);
  }

  [part~='body'] {
    display: grid;
    position: relative;
  }

  /* An initial load has no rows and no empty message, which would collapse the body and leave the loading overlay
     covering nothing but the header. The is-empty class is set by the template rather than using :empty, which
     whitespace text nodes in the markup would defeat. */
  [part~='body'].is-empty {
    min-height: 8rem;
  }

  .row {
    display: flex;
    position: absolute;
    inset-inline: 0;
    width: 100%;
    height: var(--row-height);
    box-sizing: border-box;
    border-block-end: var(--border-width) solid var(--border-color);
  }

  [part~='header'] .row {
    position: relative;
    height: var(--header-row-height);
  }

  /* Data rows wrap cells in row-main so an optional detail panel can stack beneath (header/filter rows place cells
     directly). Cells stretch to the full row height — each centers its own content — so the pinned-edge divider
     spans the row and a sticky pinned cell's opaque background fully masks the columns sliding beneath it. */
  .row-main {
    display: flex;
    align-items: stretch;
    width: 100%;
    height: var(--row-height);
  }

  .row.has-detail {
    flex-direction: column;
    height: auto;
    align-items: stretch;
  }

  [part~='row-detail'] {
    padding: var(--wa-space-m);
    background-color: var(--wa-color-neutral-fill-quiet);
    border-block-start: var(--border-width) var(--wa-border-style) var(--border-color);
  }

  .cell {
    display: flex;
    flex: 1 1 0;
    align-items: center;
    min-width: 0;
    box-sizing: border-box;
    padding-inline: var(--cell-padding);
    overflow: hidden;
  }

  /* min-width:0 lets it shrink below content width so a text child can truncate. */
  .cell-content {
    flex: 1 1 0;
    min-width: 0;
  }

  /* Single-line ellipsis for plain-string cells. Lives here, not on the flex .cell where text-overflow would
     no-op. */
  .cell-content-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cell[data-align='center'] {
    justify-content: center;
    text-align: center;
  }

  .cell[data-align='end'] {
    justify-content: flex-end;
    text-align: end;
  }

  /* Header cells */
  [part~='header-cell'] {
    position: relative;
    font-weight: var(--wa-font-weight-semibold);
    color: var(--header-text-color);
    user-select: none;
  }

  [part~='header-cell'][data-sortable] {
    cursor: pointer;
  }

  .sort-indicator {
    display: inline-flex;
    margin-inline-start: var(--wa-space-xs);
    font-size: var(--wa-font-size-smaller);
    opacity: 0;
    transition: opacity var(--wa-transition-fast);
  }

  /* Faint on hover; full-strength when sorted. */
  @media (hover: hover) {
    [part~='header-cell'][data-sortable]:hover .sort-indicator {
      opacity: 0.4;
    }
  }

  .sort-indicator.is-sorted {
    opacity: 1;
  }

  /* Numbered priority badge for multi-column sort. */
  .sort-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25em;
    height: 1.25em;
    margin-inline-start: var(--wa-space-2xs);
    padding-inline: 0.25em;
    border-radius: var(--wa-border-radius-pill);
    background-color: var(--wa-color-neutral-fill-quiet);
    color: var(--wa-color-text-quiet);
    font-size: 0.7em;
    font-weight: var(--wa-font-weight-semibold);
  }

  .header-label {
    flex: 1 1 auto; /* grow so the trailing actions group is pushed to the inline-end edge */
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* Shown in a pinned column's header; click to unpin. Spacing comes from the actions group gap. */
  .pin-indicator {
    flex: 0 0 auto;
    font-size: var(--wa-font-size-smaller);
    color: var(--wa-color-text-quiet);
  }

  .pin-indicator wa-icon {
    transform: rotate(45deg);
  }

  @media (hover: hover) {
    .pin-indicator:hover {
      color: var(--accent-color);
    }
  }

  .pin-indicator:focus-visible {
    color: var(--accent-color);
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  /* Trailing header controls (pin indicator + kebab menu), pushed to the inline-end edge. The start padding matches
     the sort indicator's own start margin so label → sort → filter spacing reads evenly in end-aligned columns. */
  .header-actions {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: var(--wa-space-2xs);
    margin-inline-start: auto; /* push to the end, after label + sort indicators */
    padding-inline-start: var(--wa-space-xs);
  }

  .column-menu {
    flex: 0 0 auto;
    /* The menu renders inside the header cell, so its items would inherit the header's semibold — like the filter
       panel, menu content is body text. */
    font-weight: var(--wa-font-weight-normal);
  }

  /* Visible overflow so the resize handle and in-header control focus rings aren't clipped; text ellipsis is
     handled by header-label's own overflow:hidden. */
  [part~='header-cell'] {
    overflow: visible;
  }

  .resize-handle {
    position: absolute;
    inset-block: 0;
    inset-inline-end: -0.25rem;
    width: 0.5rem;
    cursor: col-resize;
    touch-action: none;
    user-select: none;
    z-index: 1;
  }

  /* Visible divider is one line-height tall and centered; the full-height .resize-handle is the larger grab target. */
  .resize-handle::after {
    content: '';
    position: absolute;
    inset-block-start: 50%;
    inset-inline: 0;
    margin-inline: auto;
    width: var(--border-width);
    height: 1lh;
    transform: translateY(-50%);
    background-color: var(--border-color);
  }

  /* The last column's handle straddles no boundary — pull it fully inside the cell (its overhang would otherwise
     add phantom scrollable space past the last column) and pin its divider to the column's true edge. */
  [part~='header-cell']:last-child .resize-handle {
    inset-inline-end: 0;
  }

  [part~='header-cell']:last-child .resize-handle::after {
    margin-inline-end: 0;
  }

  /* Column reordering: columns glide to previewed positions during a drag to open a gap; a top-layer ghost tracks
     the cursor. */
  [part~='table'].column-reordering .cell {
    transition: transform var(--transition-duration) var(--wa-transition-easing, ease);
  }

  :host(.is-dragging),
  :host(.is-dragging) * {
    user-select: none;
    cursor: grabbing;
  }

  /* The reorder drag ghost: lives in the shadow root (so ::part(drag-ghost) works and theme tokens resolve from
     the grid) but paints in the top layer via the Popover API. These override the UA [popover] defaults; the
     cursor-tracking transform is stamped inline per frame. */
  .drag-ghost {
    position: fixed;
    inset: auto;
    top: 0;
    left: 0;
    margin: 0;
    width: max-content;
    height: auto;
    overflow: visible;
    padding: var(--wa-space-2xs) var(--wa-space-xs);
    border: 1px solid var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background: var(--wa-color-surface-raised);
    color: var(--wa-color-text-normal);
    box-shadow: var(--wa-shadow-m);
    font-size: var(--wa-font-size-s);
    white-space: nowrap;
    pointer-events: none;
    /* No transform transition while dragging — the ghost must track the cursor 1:1. The drop animation enables it
       inline. */
    transition: opacity 150ms ease;
    will-change: transform;
  }

  /* Per-column header filter: a compact funnel button + popover panel. */
  .filter-trigger {
    position: relative; /* anchors the active-filter dot */
    flex: 0 0 auto;
    font-size: var(--wa-font-size-smaller);
    color: var(--wa-color-text-quiet);
  }

  /* The compact icon-button shared by the header funnel, pin indicator, and row expand toggle: a native button
     (real focus + accessible name — wa-icon's label watcher owns role/aria-label/aria-hidden on its own host, so
     the name must live on a wrapper) around a decorative icon, without wa-button's form-control height.
     The glyphs are only ~12px, so pad the hit area out to ~24px and pull the padding back with negative margins —
     the header's layout (and the measured header floor, which sums layout boxes) is unchanged. Adjacent targets'
     hit boxes meet in the middle of the actions gap without covering each other's glyphs. */
  .filter-trigger,
  .pin-indicator,
  .expand-toggle {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 0;
    font: inherit;
    cursor: pointer;
    padding: var(--wa-space-xs) var(--wa-space-2xs);
    margin: calc(-1 * var(--wa-space-xs)) calc(-1 * var(--wa-space-2xs));
    border-radius: var(--wa-border-radius-s);
  }

  /* Row expand/collapse toggle — the same compact icon-button pattern as the header funnel and pin. */
  .expand-toggle {
    flex: 0 0 auto;
    font-size: inherit;
    color: var(--wa-color-text-quiet);
  }

  .expand-toggle:focus-visible {
    color: var(--accent-color);
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  @media (hover: hover) {
    .filter-trigger:hover {
      color: var(--accent-color);
    }
  }

  .filter-trigger:focus-visible {
    color: var(--accent-color);
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  .filter-trigger.is-filtered {
    color: var(--accent-color);
  }

  /* A dot badge marks an active filter, so the state doesn't rely on the icon's color alone. The insets subtract
     the hit-area padding so the dot hugs the glyph's corner, not the padded box's. */
  .filter-trigger.is-filtered::after {
    content: '';
    position: absolute;
    inset-block-start: calc(var(--wa-space-xs) - 0.2em);
    inset-inline-end: calc(var(--wa-space-2xs) - 0.25em);
    width: 0.35rem;
    height: 0.35rem;
    border-radius: var(--wa-border-radius-pill);
    background-color: var(--accent-color);
    pointer-events: none;
  }

  /* The popover's default space-l padding is oversized for a compact control panel. */
  .filter-panel::part(body) {
    padding: var(--wa-space-m);
  }

  /* Fixed panel width: filter controls size to the panel, never to the column that anchors them. */
  .filter-panel-content {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-s);
    width: 15rem;
    max-width: 85vw;
    font-weight: var(--wa-font-weight-normal);
    white-space: normal;
  }

  .filter-options {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-2xs);
    max-height: 14rem;
    overflow: auto;
  }

  /* Spread each option's label and count across the row. */
  .filter-options wa-checkbox {
    width: 100%;
  }

  .filter-options wa-checkbox::part(label) {
    display: flex;
    flex: 1 1 auto;
    gap: var(--wa-space-s);
    min-width: 0;
  }

  .filter-option-label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .filter-option-count {
    flex: 0 0 auto;
    color: var(--wa-color-text-quiet);
    font-variant-numeric: tabular-nums;
  }

  .filter-options-empty {
    color: var(--wa-color-text-quiet);
    padding-block: var(--wa-space-2xs);
  }

  .filter-panel-footer {
    display: flex;
    justify-content: flex-end;
  }

  /* Pinned cells (position:sticky set inline) need an opaque background so the scrolling center band doesn't show
     through. */
  [part~='cell'][data-pinned],
  [part~='header-cell'][data-pinned] {
    background-color: var(--background-color);
  }

  [part~='header-cell'][data-pinned] {
    background-color: var(--header-background);
  }

  /* Divider on the inner edge of each pinned section. Box-shadow offsets are physical while the pinned sections
     stick to logical edges (pinnedStyle uses inset-inline), so RTL swaps the offsets. */
  [data-pinned='left'] {
    box-shadow: inset calc(-1 * var(--border-width)) 0 0 0 var(--border-color);
  }

  [data-pinned='right'] {
    box-shadow: inset var(--border-width) 0 0 0 var(--border-color);
  }

  [data-pinned='left']:dir(rtl) {
    box-shadow: inset var(--border-width) 0 0 0 var(--border-color);
  }

  [data-pinned='right']:dir(rtl) {
    box-shadow: inset calc(-1 * var(--border-width)) 0 0 0 var(--border-color);
  }

  /* Pinned body cells re-assert the row's state background (a sticky cell paints its own bg over the row's). Order
     matters: selected > hover > stripe. */
  [part~='row'][data-stripe='odd'] [part~='cell'][data-pinned] {
    background-color: var(--stripe-background, var(--background-color));
  }

  @media (hover: hover) {
    [part~='row']:hover [part~='cell'][data-pinned] {
      background-color: var(--row-hover-background);
    }
  }

  [part~='row'][data-selected] [part~='cell'][data-pinned] {
    background-color: var(--selected-background);
  }

  /* Striping off: odd pinned cells fall back to the plain body bg. The :not([data-selected]) guard stops this
     higher-specificity rule from overriding the selected re-assertion above; the hover re-assertion is hover-gated
     (a bare :not(:hover) would blank tapped rows on touch, where :hover sticks). */
  :host(:not([striped])) [part~='row'][data-stripe='odd']:not([data-selected]) [part~='cell'][data-pinned] {
    background-color: var(--background-color);
  }

  @media (hover: hover) {
    :host(:not([striped])) [part~='row'][data-stripe='odd']:not([data-selected]):hover [part~='cell'][data-pinned] {
      background-color: var(--row-hover-background);
    }
  }

  /* Column footer rowgroup: sticky to the bottom so totals stay visible while the body scrolls. Mirrors the header. */
  .table-footer {
    display: grid;
    position: sticky;
    inset-block-end: 0;
    z-index: 1;
    background-color: var(--header-background);
    border-block-start: var(--border-width) solid var(--border-color);
    /* Overlap the last body row's bottom border so the boundary stays one border-width thick. */
    margin-block-start: calc(-1 * var(--border-width));
  }

  .table-footer .row {
    position: relative;
    height: var(--row-height);
    border-block-end: none;
    font-weight: var(--wa-font-weight-semibold);
  }

  /* Sticky footer cells paint over the scrolling band, so re-assert the footer bg. */
  [part~='footer-cell'][data-pinned] {
    background-color: var(--header-background);
  }

  /* Group rows: flex so a long value truncates while the member count stays visible. */
  .cell-content-group {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .group-value {
    font-weight: var(--wa-font-weight-semibold);
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .group-count {
    flex: none;
    margin-inline-start: var(--wa-space-2xs);
    color: var(--wa-color-text-quiet);
  }

  /* Body rows */
  @media (hover: hover) {
    [part~='row']:hover {
      background-color: var(--row-hover-background);
    }
  }

  /* Stripe keys off the row's real data index (set in the template), not DOM position, since virtualization
     recycles a rolling window. The :not([data-selected]) guard keeps the stripe (whose :host() selector carries
     higher specificity) from painting over the selected state; the :not(:hover) guard exists only for the hover
     background, so it's hover-gated — on touch devices :hover sticks to the last-tapped row, which would
     otherwise blank its stripe. */
  :host([striped]) [part~='row'][data-stripe='odd']:not([data-selected]) {
    background-color: var(--stripe-background);
  }

  @media (hover: hover) {
    :host([striped]) [part~='row'][data-stripe='odd']:not([data-selected]):hover {
      background-color: var(--row-hover-background);
    }
  }

  [part~='row'][data-selected] {
    background-color: var(--selected-background);
    /* Soft primary divider so a run of selected rows reads as a contiguous block, not gray grid lines. */
    border-block-end-color: var(--selected-border-color);
  }

  /* A selected row's TOP edge is drawn by the previous row's bottom border — recolor it too so the selected band
     is framed on both edges. Virtualized rows render in index order, so the DOM sibling is the row above. */
  [part~='row']:has(+ [part~='row'][data-selected]) {
    border-block-end-color: var(--selected-border-color);
  }

  /* Selection + expand cells hug their control: a cell-padding inset at the start, a content-width control, and
     the NEXT cell's own start padding provides the separation — the same rhythm as data cells, in every variation
     (expand only, select only, both, or neither). The min-width keeps empty control cells (leaf rows without a
     toggle, header/footer placeholders) exactly as wide as ones holding a 1.25em icon so columns align across
     rows. */
  .cell-control {
    flex: 0 0 auto;
    width: auto;
    min-width: calc(var(--cell-padding) + 1.25em);
    justify-content: flex-start;
    padding-inline: var(--cell-padding) 0;
    /* The cell box hugs its checkbox/toggle exactly, so the inherited overflow:hidden would clip the control's
       focus ring; there's no text to truncate here, so let it show. */
    overflow: visible;
    /* Shift-clicking checkboxes to range-select must not also select text across rows. */
    user-select: none;
  }

  /* Consecutive control cells (expand toggle + checkbox) sit close together, reading as one leading control unit. */
  .cell-control + .cell-control {
    min-width: calc(var(--wa-space-xs) + 1.25em);
    padding-inline-start: var(--wa-space-xs);
  }

  /* The row-select checkbox's label is visually hidden, which leaves the control's built-in label margin dangling
     at its inline end — trim it so the cell's width is the control alone. */
  .cell-control wa-checkbox::part(control) {
    margin-inline-end: 0;
  }

  /* Roving cell focus ring (active cell carries tabindex=0). */
  .cell:focus-visible,
  [part~='header-cell']:focus-visible {
    outline: var(--focus-ring);
    outline-offset: calc(-1 * var(--wa-focus-ring-width, 0.1875rem));
    z-index: 2;
  }

  /* Footer / pager. Top border marks the scroll-area boundary — needed even when rows fill the viewport, since a
     mid-scroll last row is clipped and has no divider to lean on. */
  [part~='footer'] {
    display: flex;
    /* Lifted so the border paints over the scroll area's rows (and the sticky column footer, also z-index 1 but
       earlier in the tree) in the overlap strip below. */
    position: relative;
    z-index: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wa-space-2xs) var(--wa-space-m);
    border-block-start: var(--border-width) solid var(--border-color);
    /* Overlap the last body row's bottom border so the boundary stays one border-width thick. */
    margin-block-start: calc(-1 * var(--border-width));
    /* Same uniform inset as the toolbar so both bars share the table's rhythm. */
    padding: var(--cell-padding);
    background-color: var(--header-background);
    container-type: inline-size;
  }

  /* Narrow footers drop the pager's first/last edge buttons so the page numbers stay reachable. */
  @container (max-width: 30rem) {
    [part~='pager']::part(first-button),
    [part~='pager']::part(last-button) {
      display: none;
    }
  }

  /* The wa-pagination element sits at the footer's inline-end edge (info + page-size stay at the start) and follows
     the grid's font scale. wa-pagination is display:contents by default, so force it to a flex item for the auto
     margin to act on (the .columns-menu trick). When the footer wraps it onto its own row, it stays end-aligned. */
  [part~='pager'] {
    display: flex;
    margin-inline-start: auto;
    font-size: inherit;
  }

  /* wa-pagination wraps its buttons internally by default; in the footer it must stay one line and wrap as a
     UNIT (the footer's flex-wrap above), never splitting its buttons across rows. */
  [part~='pager']::part(pagination),
  [part~='pager']::part(pages) {
    flex-wrap: nowrap;
  }

  .page-size {
    flex: 0 0 auto;
    width: 6rem;
  }

  .pager-info {
    flex: 0 0 auto;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-s);
    white-space: nowrap;
  }

  /* Empty + loading states ("no results" is the filtered-empty variant of the empty state) */
  [part~='empty'],
  [part~='no-results'] {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wa-space-2xl) var(--wa-space-m);
    color: var(--wa-color-text-quiet);
  }

  [part~='loading-overlay'] {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: color-mix(in srgb, var(--background-color) 60%, transparent);
    z-index: 3;
  }

  /* Toolbar (search + columns menu region). Uniform padding keyed to the cell padding so the controls' insets match
     the table's horizontal rhythm on every axis and scale with the grid's size. */
  [part~='toolbar'] {
    display: flex;
    align-items: center;
    gap: var(--wa-space-s);
    width: 100%;
    padding: var(--cell-padding);
    border-block-end: var(--border-width) solid var(--border-color);
  }

  /* Columns menu sits at the toolbar's inline-end edge (auto margin pushes it there with or without a search box).
     wa-dropdown is display:contents by default, so force it to a flex item for the auto margin to act on. */
  .columns-menu {
    display: flex;
    margin-inline-start: auto;
  }

  .toolbar-search {
    flex: 0 1 20rem;
    max-width: 20rem;
  }

  /* Screen-reader-only text uses the shared wa-visually-hidden utilities (imported in the component's static css):
     .wa-visually-hidden for slotted labels and the live region, .wa-visually-hidden-label to hide an embedded form
     control's label part while keeping its accessible name. */
`;

export {
  data_grid_styles_default
};
