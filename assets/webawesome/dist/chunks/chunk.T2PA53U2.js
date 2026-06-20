/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  isSameDay,
  parseIsoDate
} from "./chunk.4RAXYMTU.js";

// _bundle_/src/components/date-picker/internal/matchers.ts
function buildDisabledMatcher(options) {
  const { min, max, disabledDates, disabledDaysOfWeek, disablePast, disableFuture, today, isDateDisabled } = options;
  const minTime = min?.getTime() ?? -Infinity;
  const maxTime = max?.getTime() ?? Infinity;
  const todayTime = today.getTime();
  const dayOfWeekSet = new Set(disabledDaysOfWeek);
  const dateTimeSet = new Set(disabledDates.map((d) => d.getTime()));
  return function isDisabled(date) {
    const t = date.getTime();
    if (t < minTime || t > maxTime) return true;
    if (disablePast && t < todayTime) return true;
    if (disableFuture && t > todayTime) return true;
    if (dayOfWeekSet.size && dayOfWeekSet.has(date.getDay())) return true;
    if (dateTimeSet.size && dateTimeSet.has(t)) return true;
    if (isDateDisabled && isDateDisabled(date)) return true;
    return false;
  };
}
function parseDisabledDates(value) {
  if (value == null || value === "") return [];
  const list = Array.isArray(value) ? value : value.split(/\s+/);
  const out = [];
  for (const item of list) {
    if (item instanceof Date) {
      if (!isNaN(item.getTime())) out.push(new Date(item.getFullYear(), item.getMonth(), item.getDate()));
      continue;
    }
    const parsed = parseIsoDate(String(item).trim());
    if (parsed) out.push(parsed);
  }
  return out;
}
var WEEKDAY_NAMES = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};
function parseDaysOfWeek(value) {
  if (value == null || value === "") return [];
  const tokens = String(value).toLowerCase().split(/\s+/).filter(Boolean);
  const out = /* @__PURE__ */ new Set();
  for (const token of tokens) {
    if (token in WEEKDAY_NAMES) {
      out.add(WEEKDAY_NAMES[token]);
    }
  }
  return [...out];
}
function anyDisabledInRange(start, end, isDisabled) {
  if (start.getTime() > end.getTime()) return anyDisabledInRange(end, start, isDisabled);
  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  while (cursor.getTime() <= end.getTime()) {
    if (isDisabled(cursor)) return true;
    cursor.setDate(cursor.getDate() + 1);
  }
  return false;
}
function includesDay(arr, target) {
  return arr.some((d) => isSameDay(d, target));
}

export {
  buildDisabledMatcher,
  parseDisabledDates,
  parseDaysOfWeek,
  anyDisabledInRange,
  includesDay
};
