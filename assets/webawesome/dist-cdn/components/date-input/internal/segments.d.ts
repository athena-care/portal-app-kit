/**
 * Pure, DOM-free model for the **segmented** date input of `<wa-date-input>`.
 *
 * A segmented field renders the date as discrete spinbutton segments — month, day, year — in the user's locale order,
 * separated by inert literal text (`/`, `.`, `年`/`月`/`日`, …). Each segment is edited independently: digits fill the
 * focused segment and auto-advance once no further digit is possible; Arrow Up/Down step the value with wraparound and
 * no carry into neighboring segments. This module owns the layout derivation, ISO ⇄ segment conversion, and the
 * per-segment keystroke/step rules. It never touches the DOM — the component wires it to elements.
 *
 * Free-text parsing (the paste path) lives separately in `paste-parse.ts`; this module is the keystroke path.
 *
 * All dates are local-time midnight, matching the calendar's `iso.ts`.
 */
export type SegmentField = 'year' | 'month' | 'day';
/** One editable segment in the layout. */
export interface SegmentToken {
    kind: 'segment';
    field: SegmentField;
}
/** Inert text rendered between/after segments (separator). Taken verbatim from the locale's formatted output. */
export interface LiteralToken {
    kind: 'literal';
    text: string;
}
export type LayoutToken = SegmentToken | LiteralToken;
/**
 * The ordered list of tokens for a locale. Literals are kept verbatim and in position — this is what makes
 * `2026年05月22日` (ja-JP, three distinct suffix literals) and `22.05.2026` (de-DE) both render correctly. A single
 * shared separator string cannot represent those.
 */
export interface SegmentLayout {
    tokens: LayoutToken[];
    /** Just the segment fields, in order — convenience for focus/advance logic. */
    order: SegmentField[];
}
/** A partially- or fully-entered date. `null` means the segment is empty. */
export interface DateSegments {
    year: number | null;
    month: number | null;
    day: number | null;
}
/** Clear the layout cache (intended for tests). */
export declare function clearSegmentLayoutCache(): void;
/**
 * Build (and cache) the segment layout for a locale by probing `Intl.DateTimeFormat.formatToParts()`. Literal parts are
 * preserved verbatim so locale-specific separators (including CJK `年月日` suffixes and trailing literals) render
 * correctly. The calendar is forced to Gregorian and digits to Latin — only the *order* and *separators* are taken from
 * the locale.
 *
 * Cache key is the full locale string (`en-GB` ≠ `en-US`).
 */
export declare function buildSegmentLayout(locale: string): SegmentLayout;
/** Convert an ISO `YYYY-MM-DD` string to segments. Returns all-empty segments for an empty/invalid string. */
export declare function isoToSegments(iso: string | null | undefined): DateSegments;
/** True when every segment is filled. (Does not imply the combination is a valid calendar date.) */
export declare function isComplete(segments: DateSegments): boolean;
/** True when no segment is filled. */
export declare function isEmpty(segments: DateSegments): boolean;
/**
 * Convert segments to an ISO `YYYY-MM-DD` string. Returns `''` when the group is incomplete OR the filled combination
 * is not a real calendar date (Feb 30, Apr 31, …). Validity is enforced via `parseIsoDate`'s rollover guard.
 */
export declare function segmentsToIso(segments: DateSegments): string;
export declare const YEAR_MIN = 1;
export declare const YEAR_MAX = 9999;
/** Inclusive numeric bounds for a segment. The day max is dynamic when month/year are known. */
export declare function segmentBounds(field: SegmentField, segments: DateSegments): {
    min: number;
    max: number;
};
/**
 * Re-clamp the day segment after a month or year change. If the day no longer fits the (new) month, clamp it down to
 * the month's last day. Never clamps up. Leaves the day untouched while month/year are still incomplete.
 *
 * Example: `{year:2026, month:1, day:31}` → set month to Feb → day becomes 28.
 */
export declare function clampDay(segments: DateSegments): DateSegments;
/**
 * Step a segment's value by `delta` (+1 / -1). Month and day **wrap** within their bounds with **no carry** into
 * neighboring segments (month 12 → 1, year unchanged). Year does not wrap — it clamps to `[YEAR_MIN, YEAR_MAX]`. An
 * empty segment seeds from a sensible starting value (today's field, or the bound nearest the step direction).
 *
 * Returns the new segments object (day re-clamped if month/year stepping shrank the month).
 */
export declare function step(segments: DateSegments, field: SegmentField, delta: number, today: Date): DateSegments;
/**
 * Result of typing a digit into a segment.
 * - `value` — the segment's new numeric value, or `null` if still effectively empty.
 * - `buffer` — the raw digit string still being accumulated (e.g. `'0'` for a month mid-entry). Empty once committed.
 * - `advance` — true when focus should move to the next segment (the segment can accept no further digit).
 */
export interface TypeDigitResult {
    value: number | null;
    buffer: string;
    advance: boolean;
}
/**
 * Apply a typed digit to a segment, given the digit buffer currently accumulated in that segment.
 *
 * Rules (matching native `<input type=date>` and React Aria's DateField):
 *
 * **Month (1–12):**
 *  - empty + `2..9` → that value, advance (no `2x` month exists).
 *  - empty + `0` or `1` → buffer it, wait.
 *  - buffer `0` + `d` → `0d` (01–09), advance. `0`+`0` → stays `0` buffered.
 *  - buffer `1` + `0|1|2` → `1d` (10–12), advance.
 *  - buffer `1` + `3..9` → **replace**: start fresh with `d` (so `1` then `3` → month 3, advance).
 *
 * **Day (1–31):**
 *  - empty + `4..9` → that value, advance.
 *  - empty + `0..3` → buffer it, wait.
 *  - buffer `0` + `d` → `0d`, advance (`00` stays buffered `0`).
 *  - buffer `1|2` + `d` → `1d`/`2d`, advance.
 *  - buffer `3` + `0|1` → `30`/`31`, advance.
 *  - buffer `3` + `2..9` → **replace**: start fresh with `d`.
 *
 * **Year (4 digits):** accumulate up to 4 digits left-to-right; advance after the 4th. A 5th digit replaces (starts a
 * fresh buffer). No two-digit-year pivot — keystroke entry into a labeled 4-digit segment is unambiguous.
 *
 * The overflow digit always **replaces**, never gets rejected — silently eating keystrokes feels broken.
 */
export declare function typeDigit(field: SegmentField, buffer: string, digit: string): TypeDigitResult;
/** Interpret a raw digit buffer as its numeric value (used when navigating away mid-entry). */
export declare function bufferToValue(buffer: string): number | null;
/**
 * Combine two segment groups into a canonical range value. Mirrors the calendar's `parseRange` semantics:
 *  - both groups valid → `from/to`, swapped so `from <= to`.
 *  - only the `from` group valid → anchor-only `YYYY-MM-DD`.
 *  - only the `to` group valid → anchor-only `YYYY-MM-DD` (the lone date).
 *  - neither valid → `''`.
 */
export declare function segmentsToRangeIso(from: DateSegments, to: DateSegments): string;
/** Split a canonical range value into `from`/`to` segment groups. */
export declare function rangeIsoToSegments(value: string | null | undefined): {
    from: DateSegments;
    to: DateSegments;
};
/** Format a single field's value for display, zero-padded. Empty → the supplied placeholder. */
export declare function formatSegmentText(field: SegmentField, value: number | null, buffer: string, placeholder: string): string;
