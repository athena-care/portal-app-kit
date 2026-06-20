import Component from '../../components/date-input/date-input.js';
import { type EventName } from '@lit/react';
import type { WaAfterHideEvent, WaAfterShowEvent, WaClearEvent, WaHideEvent, WaInvalidEvent, WaShowEvent } from '../../events/events.js';
export type { WaAfterHideEvent, WaAfterShowEvent, WaClearEvent, WaHideEvent, WaInvalidEvent, WaShowEvent, } from '../../events/events.js';
/**
 * @summary Date inputs let users enter a date through a segmented field or select one visually from a popup
 *  calendar. They support locale-aware segment order, min and max constraints, and form validation.
 * @documentation https://webawesome.com/docs/components/date-input
 * @status experimental
 * @since 3.8
 *
 * @dependency wa-date-picker
 * @dependency wa-icon
 * @dependency wa-popup
 *
 * @slot label - The date input's label. Alternatively, use the `label` attribute.
 * @slot hint - Text that describes how to use the date input. Alternatively, use the `hint` attribute.
 * @slot start - An element placed at the start of the input.
 * @slot end - An element placed at the end of the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show on the date picker toggle button. Defaults to a calendar icon.
 * @slot footer - Content shown below the date picker inside the popup.
 * @slot previous-icon - Icon for the date picker's previous-page button. Forwarded to `<wa-date-picker>`.
 * @slot next-icon - Icon for the date picker's next-page button. Forwarded to `<wa-date-picker>`.
 * @slot day-YYYY-MM-DD - Custom content for a specific day in the popup date picker. Slot name is dynamic (e.g.,
 *  `day-2026-05-25`). Forwarded to `<wa-date-picker>`.
 *
 * @event change - Emitted on every committed value transition (each completed date edit, calendar selection, or
 *  clear), mirroring native `<input type="date">` rather than the commit-on-blur behavior of `<wa-input>`/`<wa-select>`.
 *  This matches the sibling `<wa-time-input>`. It does NOT fire while a value is still incomplete.
 * @event input - Emitted on every segment edit, step, calendar interaction, and clear, even while the value is
 *  incomplete.
 * @event focus - Emitted when the control receives focus.
 * @event blur - Emitted when the control loses focus.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-show - Emitted when the popup is about to open. Cancelable.
 * @event wa-after-show - Emitted after the popup opens and animations complete.
 * @event wa-hide - Emitted when the popup is about to close. Cancelable.
 * @event wa-after-hide - Emitted after the popup closes and animations complete.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input-wrapper - The container that wraps the start slot, segmented input, clear button, and expand button.
 * @csspart start - The container that wraps the `start` slot.
 * @csspart end - The container that wraps the `end` slot.
 * @csspart input - The segmented input group.
 * @csspart segment - Each editable segment (month/day/year spinbutton). Use `[part~="segment"]` to style all.
 * @csspart segment-literal - Inert literal text between segments (separators).
 * @csspart range-separator - The literal between the two groups in range mode.
 * @csspart clear-button - The clear button.
 * @csspart expand-button - The date picker toggle button.
 * @csspart expand-icon - The expand icon wrapper.
 * @csspart popup - The popup container.
 * @csspart date-picker - The popup's `<wa-date-picker>` element.
 *
 * @cssproperty [--show-duration=var(--wa-transition-fast)] - The duration of the show animation.
 * @cssproperty [--hide-duration=var(--wa-transition-fast)] - The duration of the hide animation.
 *
 * @cssstate blank - The date input has no committed value.
 * @cssstate open - The popup is open.
 * @cssstate range - The date input is in range mode.
 * @cssstate disabled - The date input is disabled.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaClear: EventName<WaClearEvent>;
    onWaShow: EventName<WaShowEvent>;
    onWaAfterShow: EventName<WaAfterShowEvent>;
    onWaHide: EventName<WaHideEvent>;
    onWaAfterHide: EventName<WaAfterHideEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
