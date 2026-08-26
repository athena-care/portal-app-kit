/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  spinner_styles_default
} from "./chunk.VIUW3HBU.js";
import {
  WebAwesomeElement,
  t
} from "./chunk.2S7VPMOT.js";
import {
  LocalizeController
} from "./chunk.UAD2UIQJ.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.7F23ACLI.js";

// _bundle_/src/components/spinner/spinner.ts
var WaSpinner = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
  }
  render() {
    return x`
      <svg
        part="base spinner"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `;
  }
};
WaSpinner.css = spinner_styles_default;
WaSpinner = __decorateClass([
  t("wa-spinner")
], WaSpinner);

export {
  WaSpinner
};
