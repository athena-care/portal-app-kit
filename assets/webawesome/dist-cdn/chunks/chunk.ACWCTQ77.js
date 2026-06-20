/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  i
} from "./chunk.TLFIX76K.js";

// _bundle_/src/components/date-input/date-input.styles.ts
var date_input_styles_default = i`
  :host {
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
  }

  :host(:state(disabled)) {
    cursor: not-allowed;
  }

  /* Popup */
  .date-input-popup {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Popup body — transparent positioning wrapper. The date picker handles its own border,
     background, and padding. We give the date picker a sensible default width per mode;
     multi-month layouts widen proportionally because the date picker's internal grids each take
     a fraction of the host width. Authors can override via the date-picker part.

     Inherit font-size from the host so the content scales with the picker's size attribute via em. */
  .popup-body {
    display: inline-block;
    font-size: inherit;
  }

  /* Cap at the requested em width but never exceed the viewport — the popup is positioned in the
     viewport, so on narrow screens we let the date picker shrink and its own container query collapse
     the multi-month layout to a single column. */
  .popup-body wa-date-picker {
    width: min(20em, 100vw - 2 * var(--wa-space-s));
    font-size: inherit;
  }

  /* Shadow is applied only when the date picker is within the popup —  standalone date pickers don't
     assume elevation. */
  .popup-body wa-date-picker::part(base) {
    box-shadow: var(--wa-shadow-m);
  }

  /* Multi-month layouts (range mode or months=2) need extra space for side-by-side grids. */
  :host([mode='range']) .popup-body wa-date-picker,
  :host([months='2']) .popup-body wa-date-picker {
    width: min(40em, 100vw - 2 * var(--wa-space-s));
  }

  /* Input wrapper */
  .input-wrapper {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    gap: 0.25em;
    min-height: var(--wa-form-control-height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: text;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    padding: 0 var(--wa-form-control-padding-inline);
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host([pill]) .input-wrapper {
    border-radius: var(--wa-border-radius-pill);
  }

  :host(:focus-within) .input-wrapper {
    outline-color: var(--wa-color-focus);
  }

  :host(:state(disabled)) .input-wrapper {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Appearance variants */
  :host([appearance='filled']) .input-wrapper,
  :host([appearance='filled-outlined']) .input-wrapper {
    background-color: var(--wa-color-surface-lowered);
  }

  :host([appearance='filled']) .input-wrapper {
    border-color: transparent;
  }

  /* Segmented input — the role=group container holding all segments + literals. */
  .segments {
    flex: 1;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    color: inherit;
    font: inherit;
    font-variant-numeric: tabular-nums;
    /* Caret should look like a text field even though we don't render one. */
    caret-color: transparent;
  }

  /* Each editable segment is a focusable spinbutton rendered as inline text. tabular-nums on the segments container
     keeps all digits the same width; the segment itself uses no width-locking tricks. The placeholder text (mm, dd,
     yyyy) and committed digits are visually close enough that the natural width is stable.
  */
  .segment {
    display: inline-block;
    padding: 0 0.15em;
    margin: 0;
    background: transparent;
    border: none;
    outline: none;
    color: inherit;
    font: inherit;
    text-align: center;
    cursor: text;
    user-select: none;
    white-space: nowrap;
    border-radius: var(--wa-border-radius-s);
    transition:
      background-color var(--wa-transition-fast),
      color var(--wa-transition-fast);
  }

  .segment.empty {
    color: var(--wa-form-control-placeholder-color);
  }

  /* Focus style — applies to keyboard and pointer focus so a click always shows the selection. Soft brand fill reads
     as "selected" without competing with the popup's loud selected items. */
  .segment:focus {
    background-color: var(--wa-color-brand-fill-quiet);
    color: var(--wa-color-brand-on-quiet);
    outline: none;
  }

  .segment.empty:focus {
    color: var(--wa-color-brand-on-quiet);
  }

  /* Inert literal text between segments — separators like / or . or CJK suffixes. */
  .segment-literal {
    display: inline-block;
    color: var(--wa-color-text-quiet);
    white-space: pre;
    user-select: none;
  }

  /* Disabled / readonly styling for segments. */
  :host([disabled]) .segment,
  :host([readonly]) .segment {
    cursor: inherit;
  }

  /* Hidden form value input (for native form validity anchoring) */
  .value-input {
    position: absolute;
    inset-inline-start: var(--wa-form-control-padding-inline);
    inset-block-start: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    border: none;
    padding: 0;
    margin: 0;
  }

  /* Buttons. font: inherit lifts the UA default button font-size so children that size with em
     (e.g. the expand icon) resolve against the host size-driven font-size instead of ~13px. */
  .clear-button,
  .expand-button {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--wa-color-text-quiet);
    font: inherit;
    padding: 0.25em;
    border-radius: var(--wa-border-radius-s);
    transition: color var(--wa-transition-fast);
  }

  .clear-button:hover,
  .expand-button:hover {
    color: var(--wa-color-text-loud);
  }

  .expand-button:focus-visible {
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus);
    outline-offset: 2px;
  }

  /* Scale the calendar icon with the host's font-size (which is set by the size attribute) so it grows
     and shrinks with the rest of the form control. Applies to both the default and any user-slotted icon. */
  .expand-icon {
    display: inline-flex;
    color: var(--wa-color-text-quiet);
    font-size: 1.25em;
  }

  /* Animations */
  .date-input-popup::part(popup).show {
    animation: wa-date-input-show var(--show-duration) var(--wa-transition-easing);
  }

  .date-input-popup::part(popup).hide {
    animation: wa-date-input-hide var(--hide-duration) var(--wa-transition-easing);
  }

  @keyframes wa-date-input-show {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes wa-date-input-hide {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.97);
    }
  }

  /* Visually hidden helper for sr-only content */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Hidden children — used only to receive light-DOM slot changes (per-day named slots). */
  .hidden-children {
    display: none;
  }

  /* Start / end slots */
  [part~='start'],
  [part~='end'] {
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
  }

  [part~='start']::slotted(*) {
    margin-inline-end: 0.25em;
  }

  [part~='end']::slotted(*) {
    margin-inline-start: 0.25em;
  }
`;

export {
  date_input_styles_default
};
