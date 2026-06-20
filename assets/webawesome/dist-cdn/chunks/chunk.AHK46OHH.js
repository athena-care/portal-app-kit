/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/date-input/internal/min-max-date-validator.ts
var ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
function nativeMessage(value, min, max) {
  const probe = document.createElement("input");
  probe.type = "date";
  if (min) probe.min = min;
  if (max) probe.max = max;
  probe.value = value;
  probe.checkValidity();
  return probe.validationMessage;
}
var MinMaxDateValidator = () => {
  return {
    observedAttributes: ["min", "max"],
    checkValidity(element) {
      const validity = {
        message: "",
        isValid: true,
        invalidKeys: []
      };
      const { min, max } = element;
      const value = element.value;
      if (!value || !min && !max) {
        return validity;
      }
      const parts = element.mode === "range" ? value.split("/") : [value];
      for (const part of parts) {
        if (!ISO_DATE.test(part)) continue;
        if (min && part < min) {
          validity.isValid = false;
          validity.invalidKeys.push("rangeUnderflow");
          validity.message = nativeMessage(part, min, max);
          return validity;
        }
        if (max && part > max) {
          validity.isValid = false;
          validity.invalidKeys.push("rangeOverflow");
          validity.message = nativeMessage(part, min, max);
          return validity;
        }
      }
      return validity;
    }
  };
};

export {
  MinMaxDateValidator
};
