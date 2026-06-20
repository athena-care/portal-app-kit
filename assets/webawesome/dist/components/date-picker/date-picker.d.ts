import '$webawesome/components/icon/icon.js';
import WebAwesomeElement from '$webawesome/internal/webawesome-element.js';
import { type PropertyValues, type TemplateResult } from 'lit';
export type WaDatePickerMode = 'single' | 'range';
export type WaDatePickerSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type WaDatePickerFirstDayOfWeek = 'auto' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type WaDatePickerPageBy = 'months' | 'single';
export type WaDatePickerWeekdayFormat = 'narrow' | 'short' | 'long';
export type WaDatePickerView = 'days' | 'months' | 'years';
export type WaDatePickerDayContent = (date: Date) => string | TemplateResult | null;
export interface WaDatePickerRange {
    from: Date | null;
    to: Date | null;
}
/**
 * @summary Date pickers display a month grid for selecting a single date or a date range inline. Use them when dates
 *  need to remain visible, such as in scheduling interfaces or embedded inside another form control.
 * @documentation https://webawesome.com/docs/components/date-picker
 * @status experimental
 * @since 3.8
 *
 * @dependency wa-icon
 *
 * @slot previous-icon - Icon shown inside the previous-page button. Defaults to a left chevron.
 * @slot next-icon - Icon shown inside the next-page button. Defaults to a right chevron.
 * @slot header - Replaces the entire header row including title and navigation buttons. Advanced use only.
 * @slot footer - Optional content rendered below the calendar grid. Empty by default.
 *
 * @event change - Emitted when the user commits a new value. Read the current value from `event.target.value`.
 * @event input - Emitted when the value changes during interaction. In range mode, this fires after the first click of
 *  a new range.
 * @event wa-focus-day - Emitted when the focused day changes via keyboard navigation, paging, or pointer hover.
 *  `event.detail` is `{ date: Date }`.
 * @event wa-view-change - Emitted when the date picker switches between day, month, and year views.
 *  `event.detail` is `{ view, date }`.
 *
 * @csspart base - The component's outer wrapper.
 * @csspart header - The header row containing the title and navigation buttons.
 * @csspart title - The clickable month/year title button that steps the view up (days → months → years).
 * @csspart nav - The container around the previous and next buttons.
 * @csspart previous - The previous-page button.
 * @csspart next - The next-page button.
 * @csspart months - The container that holds the rendered month(s).
 * @csspart month - A single rendered month.
 * @csspart month-label - The label rendered above each month when `months` is greater than 1.
 * @csspart weekdays - The row of weekday labels above each month grid.
 * @csspart weekday - A single weekday label cell.
 * @csspart weeknumbers - The week-number column header cell.
 * @csspart weeknumber - A single week-number cell.
 * @csspart grid - The day grid `<table>` for a month.
 * @csspart day - A day cell button. State-specific parts are added in addition to `day` so you can target them with
 *  `::part(day-...)`.
 * @csspart day-today - Added to the day cell that represents today.
 * @csspart day-outside - Added when the day belongs to an adjacent month (requires `with-outside-days`).
 * @csspart day-weekend - Added when the day falls on a weekend per the locale's week info.
 * @csspart day-disabled - Added when the day is disabled.
 * @csspart day-selected - Added when the day is selected (single mode or a range endpoint).
 * @csspart day-range-start - Added to the first endpoint of a range.
 * @csspart day-range-end - Added to the second endpoint of a range.
 * @csspart day-range-inner - Added to days that fall between the two endpoints of a committed range.
 * @csspart day-range-preview - Added to days inside the hover preview span during an in-progress range.
 * @csspart day-label - The label text inside a day button.
 * @csspart day-placeholder - An empty cell rendered in trailing rows when `with-outside-days` is off, so the grid is
 *  always 6 rows tall and the calendar's height doesn't shift between months.
 * @csspart view-grid - The grid used when the picker is in month-select or year-select view.
 * @csspart view-row - A row of three items inside the view grid. Transparent to layout (`display: contents`).
 * @csspart view-cell - The gridcell wrapper around a single view item. Transparent to layout (`display: contents`).
 * @csspart view-item - A single month or year button inside the view grid. State-specific parts are added as siblings.
 * @csspart view-item-today - Added to the month/year representing today.
 * @csspart view-item-selected - Added to the month/year that matches the current selection.
 * @csspart view-item-disabled - Added when every day in the month/year is disabled.
 * @csspart footer - The container wrapping the `footer` slot.
 *
 * @cssstate disabled - The date picker is disabled.
 * @cssstate readonly - The date picker is readonly.
 * @cssstate range - The date picker is in range mode.
 */
export default class WaDatePicker extends WebAwesomeElement {
    static css: import("lit").CSSResult[];
    private readonly localize;
    private base;
    /** The selection mode. */
    mode: WaDatePickerMode;
    /**
     * The selected date(s). For `mode="single"`, an ISO date string (`YYYY-MM-DD`) or empty. For `mode="range"`, two ISO
     * dates separated by `/` (`YYYY-MM-DD/YYYY-MM-DD`). The property setter also accepts `Date` objects and
     * `{ from, to }` objects for ranges.
     */
    get value(): string;
    set value(val: unknown);
    private _value;
    /** The earliest selectable date as `YYYY-MM-DD`. */
    min: string;
    /** The latest selectable date as `YYYY-MM-DD`. */
    max: string;
    /** Overrides the date considered "today". */
    today: string;
    /** The currently focused date as `YYYY-MM-DD`. Drives roving tabindex and the visible month. */
    focusedDate: string;
    /** The current view. */
    view: WaDatePickerView;
    /** Number of months rendered side-by-side. Either `1` or `2`. Set to `2` to see both ends of a range at once. */
    months: 1 | 2;
    /** Whether prev/next advances by the visible range (`months`) or one month at a time (`single`). */
    pageBy: WaDatePickerPageBy;
    /**
     * The first day of the week. The default `auto` uses the current locale's week info. To set a specific day, pass a
     * three-letter weekday name: `sun`, `mon`, `tue`, `wed`, `thu`, `fri`, or `sat`.
     */
    firstDayOfWeek: WaDatePickerFirstDayOfWeek;
    /** Shows leading and trailing days from adjacent months. */
    withOutsideDays: boolean;
    /** Shows an ISO week-number column. */
    withWeekNumbers: boolean;
    /** The weekday header format. */
    weekdayFormat: WaDatePickerWeekdayFormat;
    /** Disables the entire picker. */
    disabled: boolean;
    /** Displays the current value without allowing changes. Cells remain focusable. */
    readonly: boolean;
    /** A list of whitespace-separated ISO dates that should be disabled. The property accepts an array. */
    get disabledDates(): string | string[] | Date[];
    set disabledDates(val: string | string[] | Date[] | null | undefined);
    private _disabledDatesRaw;
    private _disabledDates;
    /**
     * Weekdays to disable. Accepts a space-separated list of three-letter weekday names: `sun`, `mon`, `tue`, `wed`,
     * `thu`, `fri`, `sat`
     */
    disabledDaysOfWeek: string;
    /** Disable all dates strictly before `today`. */
    disablePast: boolean;
    /** Disable all dates strictly after `today`. */
    disableFuture: boolean;
    /** Minimum range length in days (`mode="range"` only). `0` disables the check. */
    minRange: number;
    /** Maximum range length in days (`mode="range"` only). `0` disables the check. */
    maxRange: number;
    /** Visual size. */
    size: WaDatePickerSize | 'small' | 'medium' | 'large';
    handleSizeChange(): void;
    /** BCP-47 locale override. When empty, the inherited `lang` attribute is used. */
    locale: string;
    /**
     * Author-supplied predicate that returns `true` when a date should be disabled. Runs in addition to declarative
     * `min` / `max` / `disabled-*` rules. JavaScript-only — set via property, not attribute.
     */
    isDateDisabled?: (date: Date) => boolean;
    /**
     * Author-supplied function that returns custom content for a day cell. Receives a `Date` and returns a string of
     * HTML, a Lit `TemplateResult`, or `null` to use the default day number. Runs for every rendered day cell (including
     * outside days). A `day-YYYY-MM-DD` slot, when provided for the same date, wins over this function. Property only.
     */
    dayContent?: WaDatePickerDayContent;
    /** In-progress range anchor (set on the first click in range mode, cleared on commit or Escape). */
    private rangeAnchor;
    /**
     * The committed `value` captured when an in-progress range begins, so Escape can restore it instead of
     * destroying a previously-committed range. Only meaningful while `rangeAnchor` is set.
     */
    private rangeCommittedValue;
    /** Hovered date during range selection, used for the preview span. */
    private hoverDate;
    /**
     * Anchor for the visible month. Only changes via prev/next, the view stepper, `goToDate()`,
     * or keyboard navigation that crosses the visible-month boundary. Clicks do not move it.
     */
    private viewAnchor;
    /** Focused month index (0-11) inside the months sub-view. Null = use selection / today. */
    private focusedMonth;
    /** Focused year inside the years sub-view. Null = use selection / today. */
    private focusedYear;
    /** Text announced via the visually-hidden `aria-live` region (e.g. why a range was rejected). */
    private liveAnnouncement;
    connectedCallback(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    private updateCustomStates;
    handleModeChange(_old?: WaDatePickerMode, next?: WaDatePickerMode): void;
    /** Focuses the calendar at the currently focused day. */
    focus(options?: FocusOptions): void;
    /** Scrolls the view to show the given date and sets the focused day. */
    goToDate(date: string | Date): void;
    /** Equivalent to `goToDate(today)`. */
    goToToday(): void;
    /** Clears the current selection and emits `input` then `change`. */
    clear(): void;
    /** Read-only convenience getter: returns the selected date in `mode="single"`. */
    get valueAsDate(): Date | null;
    /** Read-only convenience getter: returns the selected range in `mode="range"`. */
    get valueAsRange(): WaDatePickerRange;
    private normalizeValue;
    private resolvedLocale;
    private resolvedToday;
    private resolvedFirstDay;
    private resolvedWeekendDays;
    private resolvedFocusedDate;
    /**
     * The first month currently rendered. Changes only via prev/next, the view stepper,
     * `goToDate()`, mode change, or keyboard navigation that crosses the visible-month boundary.
     * Clicking a day does not change this.
     */
    private resolvedViewAnchor;
    /** Returns true if `date` falls within any month currently rendered. */
    private isInVisibleRange;
    /**
     * The day that gets `tabindex="0"` for roving focus. If the user's `focusedDate` is inside
     * the visible range, that wins. Otherwise we fall back to the first day of the first visible
     * month so the grid always has a keyboard entry point.
     */
    private resolvedRovingFocus;
    /** The month index (0-11) that should hold roving focus inside the months sub-view. */
    private resolvedFocusedMonth;
    /** The year that should hold roving focus inside the years sub-view. */
    private resolvedFocusedYear;
    private buildDisabledChecker;
    private resolvedMonthCount;
    private pageStep;
    private handlePrevious;
    private handleNext;
    /** Compute the target anchor for paging in the given direction at the current view. */
    private getPageAnchor;
    /** True when the page in the given direction lies entirely outside [min, max]. */
    private isPageOutsideRange;
    /** Page the visible month(s) to a new anchor. Does not touch the focused day. */
    private setViewAnchor;
    private handleTitleClick;
    /**
     * Keyboard handler on the title button. Arrow keys teleport focus into the appropriate grid,
     * landing on the focused/selected item. Enter/Space is handled by the native button click.
     */
    private handleTitleKeydown;
    private setView;
    private handleDayClick;
    /**
     * Updates the `aria-live` region. A trailing toggle of a zero-width space guarantees the
     * text differs from the previous announcement, so a repeated rejection is re-announced.
     */
    private announce;
    /**
     * Announces the committed selection through the live region so screen reader users actually hear what's selected. In
     * range mode, the whole span at once. Fires on commit only (mirroring the `change` event), so the first click of a
     * range and hover previews don't spam the region. Range spans are formatted as "<start> – <end>" with a locale-aware
     * date formatter (e.g. "May 11, 2026 – May 18, 2026").
     */
    private announceSelection;
    private handleDayHover;
    /**
     * Clamp a hovered date so the previewed range stays inside [min, max] and respects
     * minRange/maxRange relative to the current anchor.
     */
    private clampHoverDate;
    /**
     * During an in-progress range, a day is "out of reach" when picking it as the second endpoint
     * would violate maxRange. (minRange doesn't restrict where the user can hover — it just extends
     * the preview to a valid length.) Used to suppress hover styling on unreachable cells.
     */
    private isOutOfReach;
    private handleEscape;
    private handleDayKeydown;
    render(): TemplateResult<1>;
    private renderHeader;
    private renderDaysView;
    private renderMonth;
    private renderWeek;
    private computeIsoWeek;
    private renderDay;
    /**
     * Builds the accessible name for a day cell. Beyond the bare day number, screen reader users need the full date so the
     * selection is actually readable — without it, focusing a day announces only "11", never "Saturday, May 16, 2026". In
     * the Shadow DOM with per-cell buttons we can't lean on the APG `<th abbr>` column-header technique to supply the
     * weekday "for free," so we spell out the full date here. Range membership is conveyed via `aria-selected` on the cell
     * (endpoints) plus the live-region announcement on commit, so we deliberately keep range-role text out of the name.
     */
    private dayAriaLabel;
    private renderDayFallback;
    private handleGridMouseLeave;
    /** Compute the per-cell selection / range state for styling and a11y. */
    private computeSelectionState;
    /** Selected month for highlighting in the months sub-view (derived from `_value`, falling back to focus). */
    private selectedMonthForView;
    /** Selected year for highlighting in the years sub-view. */
    private selectedYearForView;
    /** The "primary" selected date (for `aria-selected` in the views). Single mode: value. Range mode: from. */
    private selectedDateForHighlight;
    private renderMonthsView;
    /**
     * Wrap a flat list of `gridcell` items into `role="row"` groups of 3, satisfying the WAI-ARIA grid
     * structure (`grid` → `row` → `gridcell`). Each row uses `display: contents` so it stays transparent
     * to the `view-grid`'s CSS Grid layout.
     */
    private renderViewRows;
    private renderYearsView;
    private handleMonthKeydown;
    private handleYearKeydown;
    /** Re-focus a child element after the next render cycle. */
    private queueFocus;
    private isMonthFullyDisabled;
    private isYearFullyDisabled;
    private anyEnabledInRange;
    private handleMonthPick;
    private handleYearPick;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-date-picker': WaDatePicker;
    }
}
