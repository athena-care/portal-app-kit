/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  o,
  require_react
} from "./chunk.2TMOQM3V.js";
import {
  WaOtpInput
} from "./chunk.TCD5KBZR.js";
import {
  __toESM
} from "./chunk.7F23ACLI.js";

// _bundle_/src/react/otp-input/index.ts
var React = __toESM(require_react(), 1);
var tagName = "wa-otp-input";
var reactWrapper = o({
  tagName,
  elementClass: WaOtpInput,
  react: React,
  events: {
    onWaComplete: "wa-complete",
    onWaClear: "wa-clear",
    onWaInvalid: "wa-invalid"
  },
  displayName: "WaOtpInput"
});
var otp_input_default = reactWrapper;

export {
  otp_input_default
};
