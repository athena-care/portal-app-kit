/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  o,
  require_react
} from "./chunk.2TMOQM3V.js";
import {
  WaPopover
} from "./chunk.67FFVSH7.js";
import {
  __toESM
} from "./chunk.7F23ACLI.js";

// _bundle_/src/react/popover/index.ts
var React = __toESM(require_react(), 1);
var tagName = "wa-popover";
var reactWrapper = o({
  tagName,
  elementClass: WaPopover,
  react: React,
  events: {
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide"
  },
  displayName: "WaPopover"
});
var popover_default = reactWrapper;

export {
  popover_default
};
