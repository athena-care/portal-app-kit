/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/cell-context-menu.ts
var WaCellContextmenuEvent = class extends Event {
  constructor(detail) {
    super("wa-cell-contextmenu", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

export {
  WaCellContextmenuEvent
};
