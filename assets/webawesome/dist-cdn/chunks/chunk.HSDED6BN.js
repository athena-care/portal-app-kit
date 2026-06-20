/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  carousel_item_styles_default
} from "./chunk.FXQFRK2Y.js";
import {
  WebAwesomeElement,
  t
} from "./chunk.UOQDI3PT.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/carousel-item/carousel-item.ts
var WaCarouselItem = class extends WebAwesomeElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
  }
  render() {
    return x` <slot></slot> `;
  }
};
WaCarouselItem.css = carousel_item_styles_default;
WaCarouselItem = __decorateClass([
  t("wa-carousel-item")
], WaCarouselItem);

export {
  WaCarouselItem
};
