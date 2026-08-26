/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  Z
} from "./chunk.BKE5EYM3.js";

// ../../node_modules/lit-html/directive-helpers.js
var { I: t } = Z;
var i = (o) => null === o || "object" != typeof o && "function" != typeof o;
var n = { HTML: 1, SVG: 2, MATHML: 3 };
var e = (o, t2) => void 0 === t2 ? void 0 !== o?._$litType$ : o?._$litType$ === t2;
var l = (o) => null != o?._$litType$?.h;
var d = (o) => o?._$litDirective$;
var f = (o) => void 0 === o.strings;
var s = () => document.createComment("");
var r = (o, i2, n2) => {
  const e2 = o._$AA.parentNode, l2 = void 0 === i2 ? o._$AB : i2._$AA;
  if (void 0 === n2) {
    const i3 = e2.insertBefore(s(), l2), c = e2.insertBefore(s(), l2);
    n2 = new t(i3, c, o, o.options);
  } else {
    const t2 = n2._$AB.nextSibling, i3 = n2._$AM, c = i3 !== o;
    if (c) {
      let t3;
      n2._$AQ?.(o), n2._$AM = o, void 0 !== n2._$AP && (t3 = o._$AU) !== i3._$AU && n2._$AP(t3);
    }
    if (t2 !== l2 || c) {
      let o2 = n2._$AA;
      for (; o2 !== t2; ) {
        const t3 = o2.nextSibling;
        e2.insertBefore(o2, l2), o2 = t3;
      }
    }
  }
  return n2;
};
var v = (o, t2, i2 = o) => (o._$AI(t2, i2), o);
var u = {};
var m = (o, t2 = u) => o._$AH = t2;
var p = (o) => o._$AH;
var M = (o) => {
  o._$AP?.(false, true);
  let t2 = o._$AA;
  const i2 = o._$AB.nextSibling;
  for (; t2 !== i2; ) {
    const o2 = t2.nextSibling;
    t2.remove(), t2 = o2;
  }
};

export {
  i,
  n,
  e,
  l,
  d,
  f,
  r,
  v,
  m,
  p,
  M
};
/*! Bundled license information:

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
