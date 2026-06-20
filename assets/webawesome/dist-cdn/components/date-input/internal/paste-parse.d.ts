/**
 * Forgiving free-text parser for pasting content into `<wa-date-input>`.
 *
 * Strategy:
 *
 *  1. ISO 8601 `YYYY-MM-DD` (always accepted regardless of locale — canonical wire format).
 *  2. ISO with time suffix `YYYY-MM-DDT…` → strip to date portion.
 *  3. Locale-formatted reverse map: probe the locale's `formatToParts` order and tokenize the pasted string on a
 *     permissive separator class, assigning tokens to year/month/day by the locale's logical order.
 *  4. Named-month tolerant: case+diacritic-insensitive match against localized month names (long + short) when the
 *     pasted text contains alphabetic month tokens.
 *
 * All produced `Date` objects are local-time midnight (matching the calendar's `iso.ts`). Calendar system is forced to
 * Gregorian for introspection; user pastes are assumed Gregorian regardless of any `-u-ca-…` locale extension.
 */
/** Display-format hint used only for ordering ambiguity when parsing — '2-digit' covers the common numeric cases. */
type MonthFormat = '2-digit' | 'numeric' | 'short' | 'long';
/** Clear the parse profile cache (intended for tests). */
export declare function clearParseProfileCache(): void;
export interface PasteParseOptions {
    locale: string;
    monthFormat: MonthFormat;
    referenceYear?: number;
}
/**
 * Attempt to parse a pasted string into a `Date`. Returns null if the string can't be confidently interpreted as a
 * date in the supplied locale. Always-accepted: ISO `YYYY-MM-DD`.
 */
export declare function parsePastedDate(input: string, options: PasteParseOptions): Date | null;
/**
 * Attempt to parse a pasted range string into `{ from, to }`. Tries common separators (` – `, ` — `, ` to `, ` - `,
 * `/`, `..`) and parses each side independently. Returns nulls for unrecognized sides.
 */
export declare function parsePastedRange(input: string, options: PasteParseOptions): {
    from: Date | null;
    to: Date | null;
};
export {};
