/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  o,
  require_react
} from "./chunk.2TMOQM3V.js";
import {
  WaDataGrid
} from "./chunk.4AGFF5TZ.js";
import {
  __toESM
} from "./chunk.7F23ACLI.js";

// _bundle_/src/react/data-grid/index.ts
var React = __toESM(require_react(), 1);
var tagName = "wa-data-grid";
var reactWrapper = o({
  tagName,
  elementClass: WaDataGrid,
  react: React,
  events: {
    onWaSortChange: "wa-sort-change",
    onWaRowSelect: "wa-row-select",
    onWaPageChange: "wa-page-change",
    onWaFilterChange: "wa-filter-change",
    onWaRowExpand: "wa-row-expand",
    onWaRowCollapse: "wa-row-collapse",
    onWaDataRequest: "wa-data-request",
    onWaDataError: "wa-data-error",
    onWaColumnMove: "wa-column-move",
    onWaColumnResize: "wa-column-resize",
    onWaColumnVisibilityChange: "wa-column-visibility-change",
    onWaColumnPin: "wa-column-pin",
    onWaCellClick: "wa-cell-click",
    onWaCellContextmenu: "wa-cell-contextmenu"
  },
  displayName: "WaDataGrid"
});
var data_grid_default = reactWrapper;

export {
  data_grid_default
};
