/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/before-page-change.ts
var WaBeforePageChangeEvent = class extends Event {
  constructor(detail) {
    super("wa-before-page-change", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

export {
  WaBeforePageChangeEvent
};
