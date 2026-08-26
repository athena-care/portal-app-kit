/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/sort-change.ts
var WaSortChangeEvent = class extends Event {
  constructor(detail) {
    super("wa-sort-change", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

export {
  WaSortChangeEvent
};
