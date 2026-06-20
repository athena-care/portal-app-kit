/**
 * Resolve the locale's first day of the week and weekend days.
 *
 * Modern Chromium/Safari ship `Intl.Locale.prototype.getWeekInfo()` (Stage 4). Firefox does not yet (as of mid-2026).
 * For unsupported environments, we fall back to a small region table covering the common cases. Locales not in the
 * table default to ISO 8601 (Monday, weekend = Sat+Sun).
 */
export interface WeekInfo {
    /** First day of the week (1=Monday … 7=Sunday, per Intl spec). */
    firstDay: number;
    /** Weekend day numbers (1=Monday … 7=Sunday). */
    weekend: number[];
}
export declare function getWeekInfo(locale: string): WeekInfo;
/**
 * Convert a CLDR/Intl `firstDay` (1=Mon..7=Sun) to a JS Date.getDay() index (0=Sun..6=Sat)
 */
export declare function intlFirstDayToJsDay(intlFirstDay: number): number;
/**
 * Convert an Intl weekend list (each 1=Mon..7=Sun) into JS Date.getDay() indexes (0=Sun..6=Sat)
 */
export declare function intlWeekendToJsDays(intlWeekend: number[]): number[];
