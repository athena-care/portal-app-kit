/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/date-picker/internal/week-info.ts
var SUNDAY_FIRST = /* @__PURE__ */ new Set([
  "US",
  "CA",
  "MX",
  "BR",
  "JP",
  "PH",
  "IL",
  "AU",
  "NZ",
  "ZA",
  "CO",
  "VE",
  "PE",
  "EC",
  "GT",
  "HN",
  "NI",
  "SV",
  "CR",
  "PA",
  "DO",
  "PR",
  "JM",
  "TT",
  "BS",
  "BB",
  "BZ",
  "BO",
  "BM",
  "TW",
  "HK",
  "MO",
  "SG",
  "TH",
  "ET",
  "KE"
]);
var SATURDAY_FIRST = /* @__PURE__ */ new Set(["SA", "AE", "QA", "KW", "BH", "OM", "YE", "JO", "SY", "IQ", "EG", "SD", "DZ", "LY"]);
var FRI_SAT_WEEKEND = /* @__PURE__ */ new Set([
  "SA",
  "AE",
  "QA",
  "KW",
  "BH",
  "OM",
  "YE",
  "JO",
  "EG",
  "SD",
  "DZ",
  "LY",
  "SY",
  "IQ",
  "IL"
]);
function regionFromLocale(locale) {
  try {
    const parsed = new Intl.Locale(locale);
    const region = parsed.maximize().region;
    return region ?? null;
  } catch {
    return null;
  }
}
function fallbackWeekInfo(locale) {
  const region = regionFromLocale(locale);
  let firstDay = 1;
  if (region && SUNDAY_FIRST.has(region)) firstDay = 7;
  else if (region && SATURDAY_FIRST.has(region)) firstDay = 6;
  const weekend = region && FRI_SAT_WEEKEND.has(region) ? [5, 6] : [6, 7];
  return { firstDay, weekend };
}
function getWeekInfo(locale) {
  try {
    const parsed = new Intl.Locale(locale);
    const info = typeof parsed.getWeekInfo === "function" ? parsed.getWeekInfo() : parsed.weekInfo;
    if (info && typeof info.firstDay === "number" && Array.isArray(info.weekend)) {
      return { firstDay: info.firstDay, weekend: info.weekend };
    }
  } catch {
  }
  return fallbackWeekInfo(locale);
}
function intlFirstDayToJsDay(intlFirstDay) {
  return intlFirstDay === 7 ? 0 : intlFirstDay;
}
function intlWeekendToJsDays(intlWeekend) {
  return intlWeekend.map(intlFirstDayToJsDay);
}

export {
  getWeekInfo,
  intlFirstDayToJsDay,
  intlWeekendToJsDays
};
