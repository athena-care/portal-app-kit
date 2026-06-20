/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/date-picker/date-picker.styles.ts
import { css } from "lit";
var date_picker_styles_default = css`
  :host {
    /* @internal Base size of a single cell */
    --cell-size: 2.5em;

    /* @internal Height of one day-grid row: the day button's min-height plus its cell padding. The weekday header row
       is pinned to the same height below. */
    --row-height: calc(var(--cell-size) + 2 * var(--wa-space-3xs));

    /* @internal Intrinsic height of the day grid: 1 weekday header row + 6 week rows. The months and years views are
       pinned to this so switching views never shifts the calendar's height. */
    --grid-height: calc(7 * var(--row-height));

    display: block;
    color: var(--wa-color-text-normal);
    font-family: var(--wa-font-family-body);
    line-height: var(--wa-line-height-normal);
    container-type: inline-size;
    container-name: date-picker;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.5;
  }

  [part~='base'] {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-s);
    padding: var(--wa-space-s);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    user-select: none;
    -webkit-user-select: none;
  }

  /* Header */
  [part~='header'] {
    display: flex;
    align-items: center;
    gap: var(--wa-space-2xs);
  }

  [part~='title'] {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25em;
    background: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    padding: var(--wa-space-2xs) var(--wa-space-s);
    color: inherit;
    font: inherit;
    font-weight: var(--wa-font-weight-semibold);
    cursor: pointer;
    text-align: center;
    min-height: var(--cell-size);
  }

  [part~='title']:hover {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  [part~='title']:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  [part~='nav'] {
    display: inline-flex;
    gap: var(--wa-space-2xs);
  }

  [part~='previous'],
  [part~='next'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    padding: 0;
    color: inherit;
    cursor: pointer;
    width: var(--cell-size);
    height: var(--cell-size);
    font-size: inherit;
  }

  [part~='previous']:hover:not(:disabled),
  [part~='next']:hover:not(:disabled) {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  [part~='previous']:focus-visible,
  [part~='next']:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  [part~='previous']:disabled,
  [part~='next']:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Months container */
  [part~='months'] {
    display: flex;
    gap: var(--wa-space-m);
    width: 100%;
  }

  /* When the calendar isn't wide enough to fit two months side-by-side, stack them vertically so each
     month still has room to render comfortably. */
  @container date-picker (max-width: 32em) {
    [part~='months'] {
      flex-direction: column;
    }
  }

  [part~='month'] {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-2xs);
    flex: 1 1 0;
    min-width: 0;
  }

  [part~='month-label'] {
    text-align: center;
    font-weight: var(--wa-font-weight-semibold);
    font-size: 0.875em;
    color: var(--wa-color-text-quiet);
  }

  /* Day grid. Pinned to --grid-height (the same height the months/years view uses) so the calendar never shifts when
     switching views. A table given an explicit height distributes it across its rows; the row heights below keep the
     distribution predictable. */
  [part~='grid'] {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    height: var(--grid-height);
  }

  [part~='grid'] th,
  [part~='grid'] td {
    padding: var(--wa-space-3xs) 0;
    text-align: center;
  }

  [part~='weekday'] {
    /* Pinned to the same row height as a day row so the grid is a predictable 7 × --row-height. */
    height: var(--row-height);
    box-sizing: border-box;
    font-size: 0.75em;
    font-weight: var(--wa-font-weight-normal);
    color: var(--wa-color-text-quiet);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  [part~='weeknumber'] {
    font-size: 0.75em;
    font-weight: var(--wa-font-weight-normal);
    color: var(--wa-color-text-quiet);
    padding-inline-end: var(--wa-space-2xs) !important;
    border-inline-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }

  /* Day-cell placeholder used by trailing rows so the grid is always 6 rows tall. Matches the day button's vertical
     footprint so the overall calendar height never shifts. */
  [part~='day-placeholder'] {
    display: block;
    min-height: var(--cell-size);
  }

  /* Day cell button */
  [part~='day'] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: var(--cell-size);
    background: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    color: inherit;
    font: inherit;
    font-size: inherit;
    cursor: pointer;
    padding: 0;
  }

  [part~='day']:hover:not([data-disabled]):not([data-out-of-reach]):not([data-selected]):not([data-range-start]):not(
      [data-range-end]
    ):not([data-range-inner]):not([data-range-preview]) {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  [part~='day'][data-out-of-reach] {
    cursor: not-allowed;
  }

  [part~='day']:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: calc(-1 * var(--wa-focus-ring-width, 2px));
  }

  [part~='day'][data-today] {
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-neutral-border-quiet);
  }

  [part~='day'][data-outside] {
    color: var(--wa-color-text-quiet);
    opacity: 0.6;
  }

  [part~='day'][data-disabled] {
    color: var(--wa-color-text-quiet);
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Selection styling */
  [part~='day'][data-selected],
  [part~='day'][data-range-start],
  [part~='day'][data-range-end] {
    background-color: var(--wa-color-brand-fill-loud);
    border: none;
    color: var(--wa-color-brand-on-loud);
  }

  [part~='day'][data-selected]:hover,
  [part~='day'][data-range-start]:hover,
  [part~='day'][data-range-end]:hover {
    background-color: var(--wa-color-brand-fill-loud);
  }

  /* Range middle + hover preview */
  [part~='day'][data-range-inner],
  [part~='day'][data-range-preview] {
    background-color: var(--wa-color-brand-fill-quiet);
    color: var(--wa-color-brand-on-quiet);
    border-radius: 0;
  }

  /* Interior range cells are square by default; the row-edge and endpoint rules below selectively restore radii. Each
     selector here is written with matching specificity so source order alone decides the winner — later rules (row
     edges, then endpoints) override earlier ones. */
  td[data-in-range] [part~='day'] {
    border-radius: 0;
  }

  td[data-in-range] [part~='day']:hover:not([data-selected]):not([data-disabled]) {
    background-color: var(--wa-color-brand-fill-normal);
  }

  /* Soften the range fill where it meets a row edge. When a range spans multiple weeks, the fill block ends abruptly at
     the first/last cell of a row, leaving sharp corners. Round the leading edge of a range cell that starts a row (or
     follows a non-range cell), and the trailing edge of one that ends a row (or precedes a non-range cell). The
     "th + td" selector covers the case where the week-numbers column shifts the first day cell off :first-child. */
  td[data-in-range]:first-child [part~='day'],
  th + td[data-in-range] [part~='day'],
  td:not([data-in-range]) + td[data-in-range] [part~='day'] {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-end-start-radius: var(--wa-form-control-border-radius);
  }

  td[data-in-range]:last-child [part~='day'],
  td[data-in-range]:has(+ td:not([data-in-range])) [part~='day'] {
    border-start-end-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Range endpoints: round the outward-facing side fully, square the side facing the range fill. These come last so
     they win over the row-edge rules above at the true endpoints. */
  td[data-range-start] [part~='day'] {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-end-start-radius: var(--wa-form-control-border-radius);
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  td[data-range-end] [part~='day'] {
    border-start-end-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* Single-day range (start === end, e.g. hovering the anchor itself): restore full radius. */
  td[data-range-start][data-range-end] [part~='day'] {
    border-radius: var(--wa-form-control-border-radius);
  }

  /* Year / month grid view. Pinned to the day grid's height (--grid-height) and given equal auto-rows so its 4 rows
     stretch to fill that space — switching views never shifts height. min-height keeps it flexible if the grid's content
     ever needs more room. */
  [part~='view-grid'] {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    gap: var(--wa-space-2xs);
    min-height: var(--grid-height);
  }

  /* The row and cell wrappers exist only to satisfy the ARIA grid structure (grid → row → gridcell);
     both stay transparent to layout so the view-item buttons remain direct CSS Grid items of view-grid. */
  [part~='view-row'],
  [part~='view-cell'] {
    display: contents;
  }

  [part~='view-item'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    color: inherit;
    font: inherit;
    cursor: pointer;
    padding: var(--wa-space-s);
    min-height: 3em;
  }

  [part~='view-item']:hover:not([data-disabled]):not([data-selected]) {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  [part~='view-item'][data-selected]:hover {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
  }

  [part~='view-item']:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* "Today" = the current month/year. Matches today's day in the day grid with a subtle, neutral border. */
  [part~='view-item'][data-today] {
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-neutral-border-quiet);
  }

  [part~='view-item'][data-selected] {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
  }

  [part~='view-item'][data-disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  [part~='footer']:not(:empty) {
    display: flex;
    align-items: center;
    gap: var(--wa-space-s);
    padding-top: var(--wa-space-s);
    border-top: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }

  /* Visually hidden status text used for announcements */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export {
  date_picker_styles_default
};
