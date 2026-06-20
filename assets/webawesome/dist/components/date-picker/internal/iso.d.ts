/**
 * Helpers for working with ISO 8601 date-only strings (YYYY-MM-DD) and local-time Date objects. All dates produced by
 * these helpers are in the runtime's local time zone — no UTC math.
 */
/** Parse `YYYY-MM-DD` into a local-time `Date` at midnight. Returns null if invalid. */
export declare function parseIsoDate(value: string | null | undefined): Date | null;
/** Format a `Date` (in local time) as `YYYY-MM-DD`. */
export declare function formatIsoDate(date: Date | null | undefined): string;
/** Coerce a `string | Date | null` to a `Date | null`. Strings are parsed as ISO `YYYY-MM-DD`. */
export declare function coerceToDate(value: string | Date | null | undefined): Date | null;
export interface ParsedRange {
    from: Date | null;
    to: Date | null;
}
/**
 * Parse a range value string into `{ from, to }`. Accepted formats:
 * - `""` → `{ from: null, to: null }`
 * - `"YYYY-MM-DD"` → `{ from, to: null }` (anchor only)
 * - `"YYYY-MM-DD/YYYY-MM-DD"` → `{ from, to }`, normalized so `from <= to`
 */
export declare function parseRange(value: string | null | undefined): ParsedRange;
/** Format a `{ from, to }` range as a value string. */
export declare function formatRange(range: ParsedRange | null | undefined): string;
/** Returns true if `a` and `b` fall on the same local-time day. */
export declare function isSameDay(a: Date | null, b: Date | null): boolean;
/** Returns true if `a` and `b` fall in the same year+month. */
export declare function isSameMonth(a: Date, b: Date): boolean;
/** Returns a new Date offset by `days` days. */
export declare function addDays(date: Date, days: number): Date;
/** Returns a new Date offset by `months` months (clamps day to the destination month's last day). */
export declare function addMonths(date: Date, months: number): Date;
/** Returns a new Date offset by `years` years. */
export declare function addYears(date: Date, years: number): Date;
/** Total days in a given year/month (0-indexed month). */
export declare function daysInMonth(year: number, month: number): number;
/** The first day of the given month. */
export declare function startOfMonth(date: Date): Date;
/** The last day of the given month. */
export declare function endOfMonth(date: Date): Date;
/** Today, normalized to local midnight. */
export declare function today(): Date;
/** Clamp `date` to `[min, max]`. Either bound may be null. */
export declare function clampDate(date: Date, min: Date | null, max: Date | null): Date;
/** Inclusive day difference between two dates (a - b). */
export declare function diffDays(a: Date, b: Date): number;
/**
 * ISO 8601 week number for a date. The ISO week starts on Monday; week 1 is the week
 * containing the first Thursday of the year.
 */
export declare function isoWeekNumber(date: Date): number;
