/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/focus-day.ts
var WaFocusDayEvent = class extends Event {
  constructor(detail) {
    super("wa-focus-day", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  WaFocusDayEvent
};
