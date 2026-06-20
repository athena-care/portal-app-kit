export interface DisabledMatcherOptions {
    /** Earliest selectable date (inclusive). */
    min: Date | null;
    /** Latest selectable date (inclusive). */
    max: Date | null;
    /** Specific disabled dates. */
    disabledDates: Date[];
    /** Disabled weekday indexes (0=Sun..6=Sat). */
    disabledDaysOfWeek: number[];
    /** Disable all dates strictly before `today`. */
    disablePast: boolean;
    /** Disable all dates strictly after `today`. */
    disableFuture: boolean;
    /** Today, normalized to midnight. */
    today: Date;
    /** Author-supplied predicate. */
    isDateDisabled: ((date: Date) => boolean) | undefined;
}
/** Build a composed predicate that returns true when a date is disabled. */
export declare function buildDisabledMatcher(options: DisabledMatcherOptions): (date: Date) => boolean;
/** Parse a whitespace-separated string of ISO dates into a Date array. Ignores malformed entries. */
export declare function parseDisabledDates(value: string | string[] | Date[] | null | undefined): Date[];
/**
 * Parse the `disabled-days-of-week` value into a list of weekday indexes (0..6).
 *
 * Accepts a whitespace-separated list of three-letter weekday names: `sun`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat`.
 */
export declare function parseDaysOfWeek(value: string | null | undefined): number[];
/** Returns true if any date in `[start, end]` (inclusive) is disabled. */
export declare function anyDisabledInRange(start: Date, end: Date, isDisabled: (d: Date) => boolean): boolean;
/** True if `target` appears in the date array (compared by day). */
export declare function includesDay(arr: Date[], target: Date): boolean;
