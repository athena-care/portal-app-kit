import Component from '../../components/date-picker/date-picker.js';
import { type EventName } from '@lit/react';
import type { WaFocusDayEvent, WaViewChangeEvent } from '../../events/events.js';
export type { WaFocusDayEvent, WaViewChangeEvent } from '../../events/events.js';
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
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaFocusDay: EventName<WaFocusDayEvent>;
    onWaViewChange: EventName<WaViewChangeEvent>;
}>;
export default reactWrapper;
