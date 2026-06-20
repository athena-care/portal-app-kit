/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  en_default
} from "./chunk.I6OXATG6.js";
import {
  LocalizeController,
  registerTranslation
} from "./chunk.CZ2YL77F.js";

// _bundle_/src/utilities/localize.ts
var LocalizeController2 = class extends LocalizeController {
  lang() {
    if (this.host.didSSR && !this.host.hasUpdated) {
      return this.host.lang || "en";
    }
    return super.lang();
  }
};
registerTranslation(en_default);

export {
  LocalizeController2 as LocalizeController
};
