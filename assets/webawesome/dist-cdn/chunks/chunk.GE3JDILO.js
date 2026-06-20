/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  daysInMonth,
  parseIsoDate
} from "./chunk.4RAXYMTU.js";

// _bundle_/src/components/date-input/internal/segments.ts
var layoutCache = /* @__PURE__ */ new Map();
function clearSegmentLayoutCache() {
  layoutCache.clear();
}
function buildSegmentLayout(locale) {
  const key = locale || "en";
  const cached = layoutCache.get(key);
  if (cached) return cached;
  const formatter = new Intl.DateTimeFormat(key, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    calendar: "gregory",
    numberingSystem: "latn"
  });
  const parts = formatter.formatToParts(new Date(2026, 0, 23));
  const tokens = [];
  const order = [];
  for (const part of parts) {
    if (part.type === "year" || part.type === "month" || part.type === "day") {
      tokens.push({ kind: "segment", field: part.type });
      order.push(part.type);
    } else if (part.type === "literal") {
      tokens.push({ kind: "literal", text: part.value });
    }
  }
  if (order.length !== 3) {
    const fallback = {
      tokens: [
        { kind: "segment", field: "month" },
        { kind: "literal", text: "/" },
        { kind: "segment", field: "day" },
        { kind: "literal", text: "/" },
        { kind: "segment", field: "year" }
      ],
      order: ["month", "day", "year"]
    };
    layoutCache.set(key, fallback);
    return fallback;
  }
  const layout = { tokens, order };
  layoutCache.set(key, layout);
  return layout;
}
function isoToSegments(iso) {
  const date = parseIsoDate(iso ?? "");
  if (!date) return { year: null, month: null, day: null };
  return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}
function isComplete(segments) {
  return segments.year != null && segments.month != null && segments.day != null;
}
function isEmpty(segments) {
  return segments.year == null && segments.month == null && segments.day == null;
}
function segmentsToIso(segments) {
  if (!isComplete(segments)) return "";
  const { year, month, day } = segments;
  if (year < 1 || year > 9999) return "";
  if (month < 1 || month > 12) return "";
  if (day < 1 || day > 31) return "";
  const date = new Date(2e3, month - 1, day);
  date.setFullYear(year);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return "";
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
var YEAR_MIN = 1;
var YEAR_MAX = 9999;
function segmentBounds(field, segments) {
  if (field === "year") return { min: YEAR_MIN, max: YEAR_MAX };
  if (field === "month") return { min: 1, max: 12 };
  if (segments.month != null && segments.year != null) {
    return { min: 1, max: daysInMonth(segments.year, segments.month - 1) };
  }
  if (segments.month != null) {
    return { min: 1, max: daysInMonth(2024, segments.month - 1) };
  }
  return { min: 1, max: 31 };
}
function clampDay(segments) {
  if (segments.day == null || segments.month == null || segments.year == null) return segments;
  const max = daysInMonth(segments.year, segments.month - 1);
  if (segments.day > max) return { ...segments, day: max };
  return segments;
}
function step(segments, field, delta, today) {
  const current = segments[field];
  const { min, max } = segmentBounds(field, segments);
  let next;
  if (current == null) {
    const seed = field === "year" ? today.getFullYear() : field === "month" ? today.getMonth() + 1 : today.getDate();
    next = clampToBounds(seed, min, max);
  } else if (field === "year") {
    next = clampToBounds(current + delta, min, max);
  } else {
    const span = max - min + 1;
    next = ((current - min + delta) % span + span) % span + min;
  }
  const updated = { ...segments, [field]: next };
  return field === "year" || field === "month" ? clampDay(updated) : updated;
}
function clampToBounds(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function typeDigit(field, buffer, digit) {
  if (!/^[0-9]$/.test(digit)) return { value: bufferToValue(buffer), buffer, advance: false };
  if (field === "year") {
    const next = buffer.length >= 4 ? digit : buffer + digit;
    const value = next ? Number(next) : null;
    return { value, buffer: next, advance: next.length >= 4 };
  }
  if (field === "month") return typeNumericSegment(buffer, digit, 1, 12);
  return typeNumericSegment(buffer, digit, 1, 31);
}
function typeNumericSegment(buffer, digit, min, max) {
  const d = Number(digit);
  if (buffer === "") {
    if (d === 0) return { value: null, buffer: "0", advance: false };
    if (d * 10 > max) {
      return { value: clampToBounds(d, min, max), buffer: "", advance: true };
    }
    return { value: d, buffer: digit, advance: false };
  }
  const combined = Number(buffer + digit);
  if (combined >= min && combined <= max) {
    return { value: combined, buffer: "", advance: true };
  }
  if (buffer === "0" && d === 0) {
    return { value: null, buffer: "0", advance: false };
  }
  return typeNumericSegment("", digit, min, max);
}
function bufferToValue(buffer) {
  if (!buffer) return null;
  const n = Number(buffer);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function segmentsToRangeIso(from, to) {
  const fromIso = segmentsToIso(from);
  const toIso = segmentsToIso(to);
  if (fromIso && toIso) {
    const a = parseIsoDate(fromIso);
    const b = parseIsoDate(toIso);
    return a.getTime() <= b.getTime() ? `${fromIso}/${toIso}` : `${toIso}/${fromIso}`;
  }
  return fromIso || toIso || "";
}
function rangeIsoToSegments(value) {
  if (!value) return { from: isoToSegments(null), to: isoToSegments(null) };
  const [a, b] = value.split("/");
  return { from: isoToSegments(a), to: isoToSegments(b) };
}
function formatSegmentText(field, value, buffer, placeholder) {
  if (buffer) {
    return field === "year" ? buffer : buffer.padStart(2, "0");
  }
  if (value == null) return placeholder;
  return field === "year" ? String(value).padStart(4, "0") : String(value).padStart(2, "0");
}

export {
  clearSegmentLayoutCache,
  buildSegmentLayout,
  isoToSegments,
  isComplete,
  isEmpty,
  segmentsToIso,
  YEAR_MIN,
  YEAR_MAX,
  segmentBounds,
  clampDay,
  step,
  typeDigit,
  bufferToValue,
  segmentsToRangeIso,
  rangeIsoToSegments,
  formatSegmentText
};
