/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaRemoveEvent
} from "./chunk.M2YXIHNH.js";
import {
  tag_styles_default
} from "./chunk.UDNNEBIL.js";
import {
  warnDeprecatedSize
} from "./chunk.DLSTVVIL.js";
import {
  size_styles_default
} from "./chunk.JK7SWLEG.js";
import {
  variants_styles_default
} from "./chunk.H2A33OQ3.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement,
  n,
  t
} from "./chunk.UOQDI3PT.js";
import {
  LocalizeController
} from "./chunk.O2TYCFDI.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/tag/tag.ts
var WaTag = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.variant = "neutral";
    this.appearance = "filled-outlined";
    this.size = "m";
    this.pill = false;
    this.withRemove = false;
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  handleRemoveClick() {
    this.dispatchEvent(new WaRemoveEvent());
  }
  render() {
    return x`
      <slot part="content" class="content"></slot>

      ${this.withRemove ? x`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          ` : ""}
    `;
  }
};
WaTag.css = [tag_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  n({ reflect: true })
], WaTag.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], WaTag.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], WaTag.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaTag.prototype, "handleSizeChange", 1);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaTag.prototype, "pill", 2);
__decorateClass([
  n({ attribute: "with-remove", type: Boolean })
], WaTag.prototype, "withRemove", 2);
WaTag = __decorateClass([
  t("wa-tag")
], WaTag);

export {
  WaTag
};
