/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  o,
  require_react
} from "./chunk.2TMOQM3V.js";
import {
  WaCombobox
} from "./chunk.MN7TNCKZ.js";
import {
  __toESM
} from "./chunk.7F23ACLI.js";

// _bundle_/src/react/combobox/index.ts
var React = __toESM(require_react(), 1);
var tagName = "wa-combobox";
var reactWrapper = o({
  tagName,
  elementClass: WaCombobox,
  react: React,
  events: {
    onWaClear: "wa-clear",
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide",
    onWaCreate: "wa-create",
    onWaInvalid: "wa-invalid"
  },
  displayName: "WaCombobox"
});
var combobox_default = reactWrapper;

export {
  combobox_default
};
