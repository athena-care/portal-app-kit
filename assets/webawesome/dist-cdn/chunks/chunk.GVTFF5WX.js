/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  o,
  require_react
} from "./chunk.2TMOQM3V.js";
import {
  WaToastItem
} from "./chunk.BEW3NBZY.js";
import {
  __toESM
} from "./chunk.7F23ACLI.js";

// _bundle_/src/react/toast-item/index.ts
var React = __toESM(require_react(), 1);
var tagName = "wa-toast-item";
var reactWrapper = o({
  tagName,
  elementClass: WaToastItem,
  react: React,
  events: {
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide"
  },
  displayName: "WaToastItem"
});
var toast_item_default = reactWrapper;

export {
  toast_item_default
};
