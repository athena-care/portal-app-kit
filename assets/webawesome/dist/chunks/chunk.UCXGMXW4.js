/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  warnDeprecatedSize
} from "./chunk.7TN7YXGH.js";
import {
  callout_styles_default
} from "./chunk.AFEWHLDQ.js";
import {
  size_styles_default
} from "./chunk.YO5ITST6.js";
import {
  variants_styles_default
} from "./chunk.Z2SRJMFV.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement,
  n,
  t
} from "./chunk.2S7VPMOT.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.7F23ACLI.js";

// _bundle_/src/components/callout/callout.ts
var WaCallout = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.variant = "brand";
    this.size = "m";
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  render() {
    return x`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `;
  }
};
WaCallout.css = [callout_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  n({ reflect: true })
], WaCallout.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], WaCallout.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], WaCallout.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaCallout.prototype, "handleSizeChange", 1);
WaCallout = __decorateClass([
  t("wa-callout")
], WaCallout);

export {
  WaCallout
};
