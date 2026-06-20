/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/date-picker/internal/iso.ts
var ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
function parseIsoDate(value) {
  if (!value) return null;
  const match = ISO_DATE.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}
function formatIsoDate(date) {
  if (!date || isNaN(date.getTime())) return "";
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function coerceToDate(value) {
  if (value == null) return null;
  if (value instanceof Date) {
    if (isNaN(value.getTime())) return null;
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
  return parseIsoDate(value);
}
function parseRange(value) {
  if (!value) return { from: null, to: null };
  const parts = value.split("/");
  if (parts.length === 1) {
    return { from: parseIsoDate(parts[0]), to: null };
  }
  const a = parseIsoDate(parts[0]);
  const b = parseIsoDate(parts[1]);
  if (!a || !b) return { from: a, to: b };
  return a.getTime() <= b.getTime() ? { from: a, to: b } : { from: b, to: a };
}
function formatRange(range) {
  if (!range) return "";
  const { from, to } = range;
  if (!from && !to) return "";
  if (from && !to) return formatIsoDate(from);
  if (!from && to) return formatIsoDate(to);
  return `${formatIsoDate(from)}/${formatIsoDate(to)}`;
}
function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function addDays(date, days) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  return result;
}
function addMonths(date, months) {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = daysInMonth(target.getFullYear(), target.getMonth());
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
}
function addYears(date, years) {
  return addMonths(date, years * 12);
}
function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function today() {
  const now = /* @__PURE__ */ new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
function clampDate(date, min, max) {
  if (min && date.getTime() < min.getTime()) return min;
  if (max && date.getTime() > max.getTime()) return max;
  return date;
}
function diffDays(a, b) {
  const ms = a.getTime() - b.getTime();
  return Math.round(ms / 864e5);
}
function isoWeekNumber(date) {
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayNum = (target.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNum + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNum = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNum + 3);
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 864e5));
}

export {
  parseIsoDate,
  formatIsoDate,
  coerceToDate,
  parseRange,
  formatRange,
  isSameDay,
  isSameMonth,
  addDays,
  addMonths,
  addYears,
  daysInMonth,
  startOfMonth,
  endOfMonth,
  today,
  clampDate,
  diffDays,
  isoWeekNumber
};
