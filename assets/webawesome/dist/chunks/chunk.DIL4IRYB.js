/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaChart
} from "./chunk.FUJFT23S.js";
import {
  n,
  t
} from "./chunk.2S7VPMOT.js";
import {
  __decorateClass
} from "./chunk.7F23ACLI.js";

// _bundle_/src/components/bar-chart/bar-chart.ts
var WaBarChart = class extends WaChart {
  constructor() {
    super(...arguments);
    this.type = "bar";
    this.orientation = "vertical";
  }
  applyDefaultConfig(json) {
    const config = super.applyDefaultConfig(json);
    if (this.orientation === "horizontal") {
      if (config.options) {
        config.options.indexAxis = "y";
      }
    }
    return config;
  }
};
__decorateClass([
  n()
], WaBarChart.prototype, "type", 2);
__decorateClass([
  n()
], WaBarChart.prototype, "orientation", 2);
WaBarChart = __decorateClass([
  t("wa-bar-chart")
], WaBarChart);

export {
  WaBarChart
};
