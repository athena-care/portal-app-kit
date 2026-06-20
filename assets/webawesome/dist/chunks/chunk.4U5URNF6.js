/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  parseIsoDate
} from "./chunk.4RAXYMTU.js";

// _bundle_/src/components/date-input/internal/paste-parse.ts
var SEPARATOR_CLASS = /[\s\/\.\-,;:،年月日]+/u;
var parseProfileCache = /* @__PURE__ */ new Map();
function fold(s) {
  return s.normalize("NFD").replace(/\p{M}+/gu, "").toLocaleLowerCase("en");
}
function buildDigitMap(locale) {
  const digitMap = /* @__PURE__ */ new Map();
  try {
    const nf = new Intl.NumberFormat(locale, { useGrouping: false });
    for (let d = 0; d < 10; d++) {
      const localized = nf.format(d);
      const glyph = [...localized][0];
      if (glyph && glyph !== String(d)) {
        digitMap.set(glyph, String(d));
      }
    }
  } catch {
  }
  return { digitMap };
}
function normalizeDigits(s, digitMap) {
  if (digitMap.size === 0) return s;
  let result = "";
  for (const ch of s) {
    result += digitMap.get(ch) ?? ch;
  }
  return result;
}
function normalizeWhitespace(s) {
  return s.replace(/[‎‏‪-‮⁦-⁩]/g, "").replace(/[     \t]/g, " ").replace(/\s+/g, " ").trim();
}
function buildParseProfile(locale, monthFormat) {
  const cacheKey = `${locale}|${monthFormat}`;
  const cached = parseProfileCache.get(cacheKey);
  if (cached) return cached;
  const probe = new Intl.DateTimeFormat(locale || "en", {
    year: "numeric",
    month: monthFormat,
    day: "2-digit",
    calendar: "gregory",
    numberingSystem: "latn"
  });
  const order = [];
  for (const part of probe.formatToParts(new Date(2026, 0, 23))) {
    if (part.type === "year" || part.type === "month" || part.type === "day") {
      order.push(part.type);
    }
  }
  const monthNames = /* @__PURE__ */ new Map();
  for (const style of ["long", "short"]) {
    const fmt = new Intl.DateTimeFormat(locale || "en", { month: style, calendar: "gregory" });
    for (let m = 0; m < 12; m++) {
      const part = fmt.formatToParts(new Date(2023, m, 15)).find((p) => p.type === "month");
      if (!part) continue;
      const folded = fold(part.value);
      if (folded && !monthNames.has(folded)) {
        monthNames.set(folded, m + 1);
      }
    }
  }
  for (const style of ["long", "short"]) {
    const fmt = new Intl.DateTimeFormat("en", { month: style, calendar: "gregory" });
    for (let m = 0; m < 12; m++) {
      const part = fmt.formatToParts(new Date(2023, m, 15)).find((p) => p.type === "month");
      if (!part) continue;
      const folded = fold(part.value);
      if (folded && !monthNames.has(folded)) {
        monthNames.set(folded, m + 1);
      }
    }
  }
  const profile = {
    order,
    monthNames,
    digitMap: buildDigitMap(locale).digitMap
  };
  parseProfileCache.set(cacheKey, profile);
  return profile;
}
function clearParseProfileCache() {
  parseProfileCache.clear();
}
function safeConstructDate(year, monthIdx, day) {
  if (year < 1 || year > 9999) return null;
  if (monthIdx < 0 || monthIdx > 11) return null;
  if (day < 1 || day > 31) return null;
  const date = new Date(year, monthIdx, day);
  if (date.getFullYear() !== year || date.getMonth() !== monthIdx || date.getDate() !== day) {
    return null;
  }
  return date;
}
function pivotTwoDigitYear(yy, referenceYear) {
  const century = Math.floor(referenceYear / 100) * 100;
  let candidate = century + yy;
  if (candidate - referenceYear > 49) candidate -= 100;
  else if (candidate - referenceYear < -50) candidate += 100;
  return candidate;
}
function parsePastedDate(input, options) {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const iso = parseIsoDate(trimmed);
  if (iso) return iso;
  const isoTimeMatch = /^(\d{4}-\d{2}-\d{2})T/.exec(trimmed);
  if (isoTimeMatch) {
    const dateOnly = parseIsoDate(isoTimeMatch[1]);
    if (dateOnly) return dateOnly;
  }
  const profile = buildParseProfile(options.locale || "en", options.monthFormat);
  const refYear = options.referenceYear ?? (/* @__PURE__ */ new Date()).getFullYear();
  const normalized = normalizeWhitespace(normalizeDigits(trimmed, profile.digitMap));
  const namedResult = tryNamedMonthParse(normalized, profile, refYear);
  if (namedResult) return namedResult;
  const tokens = normalized.split(SEPARATOR_CLASS).filter(Boolean);
  if (tokens.length !== 3) return null;
  if (!tokens.every((t) => /^\d+$/.test(t))) return null;
  return assembleByOrder(tokens, profile.order, refYear);
}
function tryNamedMonthParse(normalized, profile, refYear) {
  const tokens = normalized.split(SEPARATOR_CLASS).filter(Boolean);
  if (tokens.length !== 3) return null;
  let monthIdx = null;
  let monthPosition = -1;
  for (let i = 0; i < tokens.length; i++) {
    const folded = fold(tokens[i]);
    const month = profile.monthNames.get(folded);
    if (month != null) {
      monthIdx = month - 1;
      monthPosition = i;
      break;
    }
  }
  if (monthIdx == null) return null;
  const others = tokens.filter((_, i) => i !== monthPosition);
  if (!others.every((t) => /^\d+$/.test(t))) return null;
  let year;
  let day;
  const a = Number(others[0]);
  const b = Number(others[1]);
  if (others[0].length === 4 || a > 31) {
    year = a;
    day = b;
  } else if (others[1].length === 4 || b > 31) {
    year = b;
    day = a;
  } else {
    const orderWithoutMonth = profile.order.filter((o) => o !== "month");
    const remainingByPosition = tokens.map((t, i) => ({ t, i })).filter((x) => x.i !== monthPosition).map((x) => x.t);
    const yearFirst = orderWithoutMonth[0] === "year";
    year = Number(yearFirst ? remainingByPosition[0] : remainingByPosition[1]);
    day = Number(yearFirst ? remainingByPosition[1] : remainingByPosition[0]);
  }
  if (year < 100) year = pivotTwoDigitYear(year, refYear);
  return safeConstructDate(year, monthIdx, day);
}
function assembleByOrder(tokens, order, refYear) {
  const values = { year: 0, month: 0, day: 0 };
  for (let i = 0; i < 3; i++) {
    values[order[i]] = Number(tokens[i]);
  }
  let { year, month, day } = values;
  if (tokens[order.indexOf("year")].length <= 2) year = pivotTwoDigitYear(year, refYear);
  return safeConstructDate(year, month - 1, day);
}
function parsePastedRange(input, options) {
  if (!input || !input.trim()) return { from: null, to: null };
  const trimmed = input.trim();
  const canonicalMatch = /^(\d{4}-\d{2}-\d{2})\/(\d{4}-\d{2}-\d{2})$/.exec(trimmed);
  if (canonicalMatch) {
    const a = parseIsoDate(canonicalMatch[1]);
    const b = parseIsoDate(canonicalMatch[2]);
    if (a && b && a.getTime() > b.getTime()) {
      return { from: b, to: a };
    }
    return { from: a, to: b };
  }
  const separators = [/\s+to\s+/i, /\s*[–—]\s*/, /\s+-\s+/, /\s*\/\s*/, /\s*\.\.\s*/];
  for (const sep of separators) {
    const parts = trimmed.split(sep);
    if (parts.length === 2 && parts[0] && parts[1]) {
      const from = parsePastedDate(parts[0], options);
      const to = parsePastedDate(parts[1], options);
      if (from || to) {
        if (from && to && from.getTime() > to.getTime()) {
          return { from: to, to: from };
        }
        return { from, to };
      }
    }
  }
  const single = parsePastedDate(trimmed, options);
  return { from: single, to: null };
}

export {
  clearParseProfileCache,
  parsePastedDate,
  parsePastedRange
};
