/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  o,
  require_react
} from "./chunk.2TMOQM3V.js";
import {
  WaTooltip
} from "./chunk.AI6K2U23.js";
import {
  __toESM
} from "./chunk.7F23ACLI.js";

// _bundle_/src/react/tooltip/index.ts
var React = __toESM(require_react(), 1);
var tagName = "wa-tooltip";
var reactWrapper = o({
  tagName,
  elementClass: WaTooltip,
  react: React,
  events: {
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide"
  },
  displayName: "WaTooltip"
});
var tooltip_default = reactWrapper;

export {
  tooltip_default
};
