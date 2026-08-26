/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/row-collapse.ts
var WaRowCollapseEvent = class extends Event {
  constructor(detail) {
    super("wa-row-collapse", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  WaRowCollapseEvent
};
