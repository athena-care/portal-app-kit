/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/column-pin.ts
var WaColumnPinEvent = class extends Event {
  constructor(detail) {
    super("wa-column-pin", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  WaColumnPinEvent
};
