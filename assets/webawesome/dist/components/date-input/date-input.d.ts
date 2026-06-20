import '$webawesome/components/popup/popup.js';
import type WaPopup from '$webawesome/components/popup/popup.js';
import { WebAwesomeFormAssociatedElement } from '$webawesome/internal/webawesome-form-associated-element.js';
import type { TemplateResult } from 'lit-html';
import '../date-picker/date-picker.js';
import type WaDatePicker from '../date-picker/date-picker.js';
export type WaDateInputMode = 'single' | 'range';
export type WaDateInputSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type WaDateInputFirstDayOfWeek = 'auto' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type WaDateInputPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
/** Day-cell content callback. Same signature as `<wa-date-picker>`'s `dayContent`. */
export type WaDateInputDayContent = (date: Date) => string | TemplateResult | null;
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
export default class WaDateInput extends WebAwesomeFormAssociatedElement {
    static css: import("lit").CSSResult[];
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    static get validators(): import("$webawesome/internal/webawesome-form-associated-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    /**
     * Native `input` events do not fire on `role=spinbutton` elements (they aren't real `<input>`s). The component
     * dispatches a composed host `input` event on every segment edit, every step, and on calendar selection, so a
     * single `input` is enough to mark the field as interacted with.
     */
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private readonly localize;
    readonly popupId: string;
    readonly keyboardHelpId: string;
    private pendingValue;
    /** When true, the next `show()` will move focus into the calendar (set by Alt+ArrowDown). */
    private moveFocusToCalendarOnShow;
    /** The last value that was emitted via a `change` event. Used to debounce duplicate transitions. */
    private lastEmittedValue;
    /**
     * Generic segmented-field plumbing. Owns the per-segment digit buffer, roving tabindex, navigation keys
     * (arrows / Home / End / Tab flush / Backspace / Delete), and separator advance. Date-specific rules (per-field
     * digit semantics, stepping wraparound + day clamping, layout derivation) are passed in below.
     */
    private readonly segmentsController;
    popup: WaPopup;
    valueInput: HTMLInputElement;
    inputGroup: HTMLElement;
    calendar: WaDatePicker;
    /** Slot names of the form `day-YYYY-MM-DD` that the user has populated. Used to forward per-day slots to calendar. */
    private forwardedDaySlots;
    /** Single-mode segments. Ignored in range mode. */
    private segments;
    /** Range-mode `from` segments. Ignored in single mode. */
    private fromSegments;
    /** Range-mode `to` segments. Ignored in single mode. */
    private toSegments;
    /**
     * Localized term lookup. Falls back to the English string if a locale hasn't translated the key yet.
     */
    private term;
    get validationTarget(): HTMLInputElement;
    /** The date input's name, submitted as a name/value pair with form data. */
    name: string;
    private _value;
    /**
     * The date input's value. ISO 8601 `YYYY-MM-DD` for single mode, `YYYY-MM-DD/YYYY-MM-DD` for range mode (with
     * `from <= to`). The setter also accepts a `Date` or a range object with `from` and `to` properties.
     */
    get value(): string;
    set value(val: string | Date | {
        from?: Date | null;
        to?: Date | null;
    } | null);
    /** The default value of the form control. Used for form reset. */
    defaultValue: string;
    /** Disables the date input. */
    disabled: boolean;
    /** Makes the date input required for form submission. */
    required: boolean;
    /** Makes the input non-editable. The popup still opens for browsing. */
    readonly: boolean;
    /** The date input's size. */
    size: WaDateInputSize | 'small' | 'medium' | 'large';
    handleSizeChange(): void;
    /** The date input's visual appearance. */
    appearance: 'filled' | 'outlined' | 'filled-outlined';
    /** Draws a pill-style date input with rounded edges. */
    pill: boolean;
    /** The date input's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The date input's hint. If you need to display HTML, use the `hint` slot instead. */
    hint: string;
    /** Forwarded to the hidden form input (e.g., `'bday'`, `'cc-exp'`) to enable browser autofill. */
    autocomplete: string;
    /** Shows a clear button when the date input has a value. */
    withClear: boolean;
    /** Only required for SSR. Set to `true` if you're slotting in a `label` element. */
    withLabel: boolean;
    /** Only required for SSR. Set to `true` if you're slotting in a `hint` element. */
    withHint: boolean;
    /** Selection mode. */
    mode: WaDateInputMode;
    /**
     * Earliest selectable date as `YYYY-MM-DD`. Out-of-range dates are disabled in the popup calendar and a
     * committed value before `min` fails constraint validation with `rangeUnderflow`.
     */
    min: string;
    /**
     * Latest selectable date as `YYYY-MM-DD`. Out-of-range dates are disabled in the popup calendar and a
     * committed value after `max` fails constraint validation with `rangeOverflow`.
     */
    max: string;
    /** Override "today" as `YYYY-MM-DD` (defaults to the runtime date). */
    today: string;
    /** The first day of the week in the popup calendar. */
    firstDayOfWeek: WaDateInputFirstDayOfWeek;
    /** Dates that cannot be selected. */
    disabledDates: string | string[] | Date[];
    /** Days of the week that cannot be selected. Accepts a space-separated list of three-letter weekday names. */
    disabledDaysOfWeek: string;
    /** Disable all dates strictly before today. */
    disablePast: boolean;
    /** Disable all dates strictly after today. */
    disableFuture: boolean;
    /** Minimum range length in days (range mode only). `0` disables. */
    minRange: number;
    /** Maximum range length in days (range mode only). `0` disables. */
    maxRange: number;
    /** JS-only callback for custom date disabling. Forwarded to the popup calendar. */
    isDateDisabled?: (date: Date) => boolean;
    /** JS-only callback for custom day-cell content. Forwarded to the popup calendar. */
    dayContent?: WaDateInputDayContent;
    /** Number of months rendered in the popup calendar. */
    months: 1 | 2;
    /** Whether prev/next pages by the visible range or one month at a time. */
    pageBy: 'months' | 'single';
    /** Show leading/trailing days from adjacent months in the popup calendar. */
    withOutsideDays: boolean;
    /** Show ISO 8601 week numbers in the popup calendar. */
    withWeekNumbers: boolean;
    /** Weekday header format in the popup calendar. */
    weekdayFormat: 'narrow' | 'short' | 'long';
    /** Whether the popup calendar is open. */
    open: boolean;
    /** Preferred popup placement. */
    placement: WaDateInputPlacement;
    /** Distance in pixels between the popup and the input. */
    distance: number;
    constructor();
    disconnectedCallback(): void;
    firstUpdated(): void;
    protected updated(changed: Map<string, unknown>): void;
    handleDisabledChange(): void;
    handleModeChange(): void;
    handleOpenChange(): Promise<void>;
    /** Sets focus on the first empty (else first) segment. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the date input. */
    blur(): void;
    /** Opens the popup calendar. */
    show(): Promise<void>;
    /** Closes the popup calendar. */
    hide(): Promise<void>;
    /** The selected date as a `Date` (single mode only). */
    get valueAsDate(): Date | null;
    /** The selected range as an object with `from` and `to` properties (range mode only). */
    get valueAsRange(): {
        from: Date | null;
        to: Date | null;
    };
    /**
     * Clears the current value and emits `wa-clear`, `input`, and `change`. Mirrors activating the clear button. No-op
     * when already empty or when disabled/readonly.
     */
    clear(): void;
    formResetCallback(): void;
    formStateRestoreCallback(state: string | File | FormData | null): void;
    private get resolvedLocale();
    private get isRtl();
    private getLayout;
    private normalizeIncomingValue;
    /** Recompute the segment state from the canonical `_value`. Discards any in-progress digit buffers. */
    private syncSegmentsFromCanonical;
    private updateHiddenInput;
    /**
     * Recompute the canonical value from the current segment state, fire `input` always, and `change` when the value
     * transitions to a new committed state. This intentionally mirrors native `<input type=date>` ("change on every
     * commit") and is kept consistent with the sibling `<wa-time-input>`, which uses the identical semantic. This
     * differs from `<wa-input>`/`<wa-select>`, which only emit `change` on blur/commit of a user gesture.
     */
    private recomputeValue;
    private getGroupSegments;
    private setGroupSegments;
    /** Read the controller's pending buffer for a segment. The controller owns buffer storage. */
    private getBuffer;
    private addOpenListeners;
    private removeOpenListeners;
    private handleDocumentFocusIn;
    private handleDocumentKeyDown;
    private handleDocumentMouseDown;
    /** Restore focus to the most-recently active segment (or first empty / first segment). */
    private focusActiveSegment;
    private handleSegmentFocus;
    private handleSegmentBlur;
    private handleInputWrapperPointerDown;
    private handleSegmentKeyDown;
    /**
     * Paste path. Preserves the forgiving free-text parser. Pasting "January 23, 2026" into any segment fills the whole
     * group at once. This is the one place we keep `paste-parse.ts` wired to the editing UI.
     */
    private handleSegmentPaste;
    private handleExpandButtonClick;
    /**
     * Shared clear routine for the clear button and the public `clear()` method. Resets the value, emits `wa-clear`,
     * `input`, and `change`, then restores focus to the field. No-op when there's nothing to clear.
     */
    private clearValue;
    private handleClearClick;
    private handleClearMouseDown;
    private handleCalendarChange;
    private handleCalendarInput;
    /** Detect light-DOM children with `slot="day-YYYY-MM-DD"` and forward those slot names to the inner calendar. */
    private handleDefaultSlotChange;
    private updateForwardedDaySlots;
    /** Visual placeholder rendered in an empty segment. Width-stable letters that match the committed format. */
    private placeholderFor;
    /** Localized readable name of the field, used for the spinbutton's aria-label and aria-valuetext fallback. */
    private fieldLabelFor;
    private segmentAriaLabel;
    private segmentAriaValueText;
    render(): TemplateResult<1>;
    private renderSegmentGroup;
    private renderRangeSegments;
    private renderLiteral;
    private renderSegment;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-date-input': WaDateInput;
    }
}
