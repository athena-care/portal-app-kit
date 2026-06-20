(function () {
  'use strict';

  var _WINDOW = {};
  var _DOCUMENT = {};
  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {} // eslint-disable-line no-empty

  var _ref = _WINDOW.navigator || {},
    _ref$userAgent = _ref.userAgent,
    userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var _ht;
  var Q = {
      classic: {
        fa: "solid",
        fas: "solid",
        "fa-solid": "solid",
        far: "regular",
        "fa-regular": "regular",
        fal: "light",
        "fa-light": "light",
        fat: "thin",
        "fa-thin": "thin",
        fab: "brands",
        "fa-brands": "brands"
      },
      duotone: {
        fa: "solid",
        fad: "solid",
        "fa-solid": "solid",
        "fa-duotone": "solid",
        fadr: "regular",
        "fa-regular": "regular",
        fadl: "light",
        "fa-light": "light",
        fadt: "thin",
        "fa-thin": "thin"
      },
      sharp: {
        fa: "solid",
        fass: "solid",
        "fa-solid": "solid",
        fasr: "regular",
        "fa-regular": "regular",
        fasl: "light",
        "fa-light": "light",
        fast: "thin",
        "fa-thin": "thin"
      },
      "sharp-duotone": {
        fa: "solid",
        fasds: "solid",
        "fa-solid": "solid",
        fasdr: "regular",
        "fa-regular": "regular",
        fasdl: "light",
        "fa-light": "light",
        fasdt: "thin",
        "fa-thin": "thin"
      },
      slab: {
        "fa-regular": "regular",
        faslr: "regular"
      },
      "slab-press": {
        "fa-regular": "regular",
        faslpr: "regular"
      },
      thumbprint: {
        "fa-light": "light",
        fatl: "light"
      },
      whiteboard: {
        "fa-semibold": "semibold",
        fawsb: "semibold"
      },
      notdog: {
        "fa-solid": "solid",
        fans: "solid"
      },
      "notdog-duo": {
        "fa-solid": "solid",
        fands: "solid"
      },
      etch: {
        "fa-solid": "solid",
        faes: "solid"
      },
      graphite: {
        "fa-thin": "thin",
        fagt: "thin"
      },
      jelly: {
        "fa-regular": "regular",
        fajr: "regular"
      },
      "jelly-fill": {
        "fa-regular": "regular",
        fajfr: "regular"
      },
      "jelly-duo": {
        "fa-regular": "regular",
        fajdr: "regular"
      },
      chisel: {
        "fa-regular": "regular",
        facr: "regular"
      },
      utility: {
        "fa-semibold": "semibold",
        fausb: "semibold"
      },
      "utility-duo": {
        "fa-semibold": "semibold",
        faudsb: "semibold"
      },
      "utility-fill": {
        "fa-semibold": "semibold",
        faufsb: "semibold"
      }
    };
  var i = "classic",
    t = "duotone",
    d = "sharp",
    l = "sharp-duotone",
    f = "chisel",
    h = "etch",
    n = "graphite",
    g = "jelly",
    o = "jelly-duo",
    u = "jelly-fill",
    m = "notdog",
    e = "notdog-duo",
    y = "slab",
    p = "slab-press",
    s = "thumbprint",
    w = "utility",
    a = "utility-duo",
    x = "utility-fill",
    b = "whiteboard",
    c = "Classic",
    I = "Duotone",
    F = "Sharp",
    v = "Sharp Duotone",
    S = "Chisel",
    A = "Etch",
    P = "Graphite",
    j = "Jelly",
    B = "Jelly Duo",
    N = "Jelly Fill",
    k = "Notdog",
    D = "Notdog Duo",
    T = "Slab",
    C = "Slab Press",
    W = "Thumbprint",
    K = "Utility",
    R = "Utility Duo",
    L = "Utility Fill",
    U = "Whiteboard",
    ht = (_ht = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ht, i, c), t, I), d, F), l, v), f, S), h, A), n, P), g, j), o, B), u, N), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ht, m, k), e, D), y, T), p, C), s, W), w, K), a, R), x, L), b, U));
  var yt = {
      classic: {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
      },
      duotone: {
        900: "fad",
        400: "fadr",
        300: "fadl",
        100: "fadt"
      },
      sharp: {
        900: "fass",
        400: "fasr",
        300: "fasl",
        100: "fast"
      },
      "sharp-duotone": {
        900: "fasds",
        400: "fasdr",
        300: "fasdl",
        100: "fasdt"
      },
      slab: {
        400: "faslr"
      },
      "slab-press": {
        400: "faslpr"
      },
      whiteboard: {
        600: "fawsb"
      },
      thumbprint: {
        300: "fatl"
      },
      notdog: {
        900: "fans"
      },
      "notdog-duo": {
        900: "fands"
      },
      etch: {
        900: "faes"
      },
      graphite: {
        100: "fagt"
      },
      chisel: {
        400: "facr"
      },
      jelly: {
        400: "fajr"
      },
      "jelly-fill": {
        400: "fajfr"
      },
      "jelly-duo": {
        400: "fajdr"
      },
      utility: {
        600: "fausb"
      },
      "utility-duo": {
        600: "faudsb"
      },
      "utility-fill": {
        600: "faufsb"
      }
    };
  var Mt = {
      chisel: {
        regular: "facr"
      },
      classic: {
        brands: "fab",
        light: "fal",
        regular: "far",
        solid: "fas",
        thin: "fat"
      },
      duotone: {
        light: "fadl",
        regular: "fadr",
        solid: "fad",
        thin: "fadt"
      },
      etch: {
        solid: "faes"
      },
      graphite: {
        thin: "fagt"
      },
      jelly: {
        regular: "fajr"
      },
      "jelly-duo": {
        regular: "fajdr"
      },
      "jelly-fill": {
        regular: "fajfr"
      },
      notdog: {
        solid: "fans"
      },
      "notdog-duo": {
        solid: "fands"
      },
      sharp: {
        light: "fasl",
        regular: "fasr",
        solid: "fass",
        thin: "fast"
      },
      "sharp-duotone": {
        light: "fasdl",
        regular: "fasdr",
        solid: "fasds",
        thin: "fasdt"
      },
      slab: {
        regular: "faslr"
      },
      "slab-press": {
        regular: "faslpr"
      },
      thumbprint: {
        light: "fatl"
      },
      utility: {
        semibold: "fausb"
      },
      "utility-duo": {
        semibold: "faudsb"
      },
      "utility-fill": {
        semibold: "faufsb"
      },
      whiteboard: {
        semibold: "fawsb"
      }
    };
  var Qt = {
      kit: {
        fak: "kit",
        "fa-kit": "kit"
      },
      "kit-duotone": {
        fakd: "kit-duotone",
        "fa-kit-duotone": "kit-duotone"
      }
    },
    Xt = ["kit"];
  var J = "kit",
    r = "kit-duotone",
    E = "Kit",
    _ = "Kit Duotone",
    ll = _defineProperty(_defineProperty({}, J, E), r, _);
  var sl = {
    kit: {
      "fa-kit": "fak"
    },
    "kit-duotone": {
      "fa-kit-duotone": "fakd"
    }
  };
  var nl = {
      kit: {
        fak: "fa-kit"
      },
      "kit-duotone": {
        fakd: "fa-kit-duotone"
      }
    };
  var ml = {
      kit: {
        kit: "fak"
      },
      "kit-duotone": {
        "kit-duotone": "fakd"
      }
    };

  var _wt;
  var t$1 = {
      GROUP: "duotone-group",
      SWAP_OPACITY: "swap-opacity",
      PRIMARY: "primary",
      SECONDARY: "secondary"
    };
  var h$1 = "classic",
    o$1 = "duotone",
    n$1 = "sharp",
    s$1 = "sharp-duotone",
    u$1 = "chisel",
    g$1 = "etch",
    y$1 = "graphite",
    m$1 = "jelly",
    a$1 = "jelly-duo",
    p$1 = "jelly-fill",
    w$1 = "notdog",
    e$1 = "notdog-duo",
    b$1 = "slab",
    c$1 = "slab-press",
    r$1 = "thumbprint",
    x$1 = "utility",
    i$1 = "utility-duo",
    I$1 = "utility-fill",
    F$1 = "whiteboard",
    v$1 = "Classic",
    S$1 = "Duotone",
    A$1 = "Sharp",
    P$1 = "Sharp Duotone",
    j$1 = "Chisel",
    B$1 = "Etch",
    N$1 = "Graphite",
    k$1 = "Jelly",
    D$1 = "Jelly Duo",
    C$1 = "Jelly Fill",
    T$1 = "Notdog",
    L$1 = "Notdog Duo",
    W$1 = "Slab",
    R$1 = "Slab Press",
    K$1 = "Thumbprint",
    U$1 = "Utility",
    J$1 = "Utility Duo",
    E$1 = "Utility Fill",
    _$1 = "Whiteboard",
    wt$1 = (_wt = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_wt, h$1, v$1), o$1, S$1), n$1, A$1), s$1, P$1), u$1, j$1), g$1, B$1), y$1, N$1), m$1, k$1), a$1, D$1), p$1, C$1), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_wt, w$1, T$1), e$1, L$1), b$1, W$1), c$1, R$1), r$1, K$1), x$1, U$1), i$1, J$1), I$1, E$1), F$1, _$1));
  var G$1 = "kit",
    d$1 = "kit-duotone",
    M$1 = "Kit",
    O = "Kit Duotone",
    dl$1 = _defineProperty(_defineProperty({}, G$1, M$1), d$1, O);
  var Hl = {
      classic: {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat"
      },
      duotone: {
        "fa-regular": "fadr",
        "fa-light": "fadl",
        "fa-thin": "fadt"
      },
      sharp: {
        "fa-solid": "fass",
        "fa-regular": "fasr",
        "fa-light": "fasl",
        "fa-thin": "fast"
      },
      "sharp-duotone": {
        "fa-solid": "fasds",
        "fa-regular": "fasdr",
        "fa-light": "fasdl",
        "fa-thin": "fasdt"
      },
      slab: {
        "fa-regular": "faslr"
      },
      "slab-press": {
        "fa-regular": "faslpr"
      },
      whiteboard: {
        "fa-semibold": "fawsb"
      },
      thumbprint: {
        "fa-light": "fatl"
      },
      notdog: {
        "fa-solid": "fans"
      },
      "notdog-duo": {
        "fa-solid": "fands"
      },
      etch: {
        "fa-solid": "faes"
      },
      graphite: {
        "fa-thin": "fagt"
      },
      jelly: {
        "fa-regular": "fajr"
      },
      "jelly-fill": {
        "fa-regular": "fajfr"
      },
      "jelly-duo": {
        "fa-regular": "fajdr"
      },
      chisel: {
        "fa-regular": "facr"
      },
      utility: {
        "fa-semibold": "fausb"
      },
      "utility-duo": {
        "fa-semibold": "faudsb"
      },
      "utility-fill": {
        "fa-semibold": "faufsb"
      }
    },
    Y$1 = {
      classic: ["fas", "far", "fal", "fat", "fad"],
      duotone: ["fadr", "fadl", "fadt"],
      sharp: ["fass", "fasr", "fasl", "fast"],
      "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"],
      slab: ["faslr"],
      "slab-press": ["faslpr"],
      whiteboard: ["fawsb"],
      thumbprint: ["fatl"],
      notdog: ["fans"],
      "notdog-duo": ["fands"],
      etch: ["faes"],
      graphite: ["fagt"],
      jelly: ["fajr"],
      "jelly-fill": ["fajfr"],
      "jelly-duo": ["fajdr"],
      chisel: ["facr"],
      utility: ["fausb"],
      "utility-duo": ["faudsb"],
      "utility-fill": ["faufsb"]
    },
    Xl = {
      classic: {
        fab: "fa-brands",
        fad: "fa-duotone",
        fal: "fa-light",
        far: "fa-regular",
        fas: "fa-solid",
        fat: "fa-thin"
      },
      duotone: {
        fadr: "fa-regular",
        fadl: "fa-light",
        fadt: "fa-thin"
      },
      sharp: {
        fass: "fa-solid",
        fasr: "fa-regular",
        fasl: "fa-light",
        fast: "fa-thin"
      },
      "sharp-duotone": {
        fasds: "fa-solid",
        fasdr: "fa-regular",
        fasdl: "fa-light",
        fasdt: "fa-thin"
      },
      slab: {
        faslr: "fa-regular"
      },
      "slab-press": {
        faslpr: "fa-regular"
      },
      whiteboard: {
        fawsb: "fa-semibold"
      },
      thumbprint: {
        fatl: "fa-light"
      },
      notdog: {
        fans: "fa-solid"
      },
      "notdog-duo": {
        fands: "fa-solid"
      },
      etch: {
        faes: "fa-solid"
      },
      graphite: {
        fagt: "fa-thin"
      },
      jelly: {
        fajr: "fa-regular"
      },
      "jelly-fill": {
        fajfr: "fa-regular"
      },
      "jelly-duo": {
        fajdr: "fa-regular"
      },
      chisel: {
        facr: "fa-regular"
      },
      utility: {
        fausb: "fa-semibold"
      },
      "utility-duo": {
        faudsb: "fa-semibold"
      },
      "utility-fill": {
        faufsb: "fa-semibold"
      }
    },
    $ = ["solid", "regular", "light", "thin", "duotone", "brands", "semibold"],
    z$1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    q$1 = z$1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    H$1 = ["aw", "fw", "pull-left", "pull-right"],
    so = [].concat(_toConsumableArray(Object.keys(Y$1)), $, H$1, ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "inverse", "layers", "layers-bottom-left", "layers-bottom-right", "layers-counter", "layers-text", "layers-top-left", "layers-top-right", "li", "pull-end", "pull-start", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", "width-auto", "width-fixed", t$1.GROUP, t$1.SWAP_OPACITY, t$1.PRIMARY, t$1.SECONDARY]).concat(z$1.map(function (l) {
      return "".concat(l, "x");
    })).concat(q$1.map(function (l) {
      return "w-".concat(l);
    }));

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e$$1) {
      return false;
    }
  }();
  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[i];
      }
    });
  }
  var _PREFIX_TO_STYLE = _objectSpread2({}, Q);

  // We changed FACSSClassesToStyleId in the icons repo to be canonical and as such, "classic" family does not have any
  // duotone styles.  But we do still need duotone in _PREFIX_TO_STYLE below, so we are manually adding
  // {'fa-duotone': 'duotone'}
  _PREFIX_TO_STYLE[i] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    'fa-duotone': 'duotone'
  }), Q[i]), Qt['kit']), Qt['kit-duotone']);
  var PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
  var _STYLE_TO_PREFIX = _objectSpread2({}, Mt);

  // We changed FAStyleIdToShortPrefixId in the icons repo to be canonical and as such, "classic" family does not have any
  // duotone styles.  But we do still need duotone in _STYLE_TO_PREFIX below, so we are manually adding {duotone: 'fad'}
  _STYLE_TO_PREFIX[i] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    duotone: 'fad'
  }), _STYLE_TO_PREFIX[i]), ml['kit']), ml['kit-duotone']);
  var STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
  var _PREFIX_TO_LONG_STYLE = _objectSpread2({}, Xl);
  _PREFIX_TO_LONG_STYLE[i] = _objectSpread2(_objectSpread2({}, _PREFIX_TO_LONG_STYLE[i]), nl['kit']);
  var PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
  var _LONG_STYLE_TO_PREFIX = _objectSpread2({}, Hl);
  _LONG_STYLE_TO_PREFIX[i] = _objectSpread2(_objectSpread2({}, _LONG_STYLE_TO_PREFIX[i]), sl['kit']);
  var LONG_STYLE_TO_PREFIX = familyProxy(_LONG_STYLE_TO_PREFIX);
  var _FONT_WEIGHT_TO_PREFIX = _objectSpread2({}, yt);
  var FONT_WEIGHT_TO_PREFIX = familyProxy(_FONT_WEIGHT_TO_PREFIX);
  var RESERVED_CLASSES = [].concat(_toConsumableArray(Xt), _toConsumableArray(so));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w$2 = WINDOW || {};
  if (!w$2[NAMESPACE_IDENTIFIER]) w$2[NAMESPACE_IDENTIFIER] = {};
  if (!w$2[NAMESPACE_IDENTIFIER].styles) w$2[NAMESPACE_IDENTIFIER].styles = {};
  if (!w$2[NAMESPACE_IDENTIFIER].hooks) w$2[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w$2[NAMESPACE_IDENTIFIER].shims) w$2[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w$2[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;
      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }
      return acc;
    }, {});
  }
  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
      skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);
    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }

    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */
    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    
    "athenacare-mark": [470,512,[],"e000","M327.6 0c-19.4 0-37.3 4.8-53.7 14.4-13.3 7.6-24.4 17.4-33.1 29.2-1.6 2.1-3 4.3-4.4 6.4l-1.8 3.2s0 0 0 0l-2-3.4c-1.4-2.1-2.8-4.3-4.4-6.4-8.7-11.7-19.9-21.5-33.1-29.2-16.7-9.4-34.5-14.2-53.9-14.2L0 0c0 10 1.1 18 3.4 24.4 2.7 5.9 6.4 10.3 11.2 13.5 4.6 2.8 11 5 19 6l19 1.4c-6 9.1-11.2 18.8-15.1 29.5-3.4 11.4-5.2 22.8-5.2 34.5l-.5 0 0 148.8c0 34 4.3 62.8 13 86.2 8 21.7 19.6 40.5 34.7 56.5 13.3 13.3 29.9 26.5 49.8 39.1l58.1 34.5c3 2.1 6.2 4.3 9.2 6.4l0 0c10.5 7.6 21 16 31.1 25.4 1.4 1.4 3 2.7 4.4 4.1 .5 .4 1.4 1.1 2 1.4 0 0 0 0 0 0s-.2 0 0 0c.5-.4 1.4-1.1 2-1.4 1.4-1.4 3-2.8 4.4-4.1 10.1-9.4 20.6-17.8 31.1-25.4l0 0c3-2.3 6.2-4.4 9.2-6.4L339 440c19.9-12.8 36.4-25.8 49.8-39.1 15.1-16 26.7-34.8 34.7-56.5 8.7-23.5 13-52.3 13-86.2l0-148.8-.5 0c0-11.7-1.8-23.1-5.2-34.5-4.1-10.7-9.1-20.6-15.1-29.5l19-1.4c8.2-1.1 14.4-3.2 19-6 5-3.2 8.7-7.6 11.2-13.5 2.3-6.4 3.4-14.4 3.4-24.4L326.9 0zM293.2 40l6.6-3c7.8-2.7 15.6-4.3 23.5-5.2 3.9-.4 7.6-.4 11.2 0 6.4 .5 13.2 2 20.4 4.3l1.8 .9c8.2 3.2 16 8.2 23.5 14.8l2.7 2.7c6.9 6.9 12.6 15.1 16.9 24.4 4.1 10.5 6 20.4 6 30.4s-2 20.1-6 29.9c-3.4 7.3-7.3 14.4-11.7 21.3-6 8.9-12.8 17.6-20.4 26-19.9 22-44.3 42.3-72.9 60.8l-36.1 21.2c-5.7 3.7-11.4 8-16.9 12.8-4.4 4.1-6.8 6.2-6.9 6.4-1.6-1.8-3.9-3.9-6.6-6.4-5.5-5-11.4-9.2-17.4-12.6l-36.1-21.2c-28.6-18.5-52.8-38.8-72.9-60.8-7.5-8.4-14.4-17.1-20.4-26-4.4-6.9-8.4-14-11.7-21.3-4.1-9.8-6-19.7-6-29.9s2-19.9 6-30.4c4.3-9.2 10-17.4 16.9-24.4l2.7-2.7c2.8-3.2 7.1-6.2 12.4-9.2s9.6-5.2 12.6-6.2c7.3-2.3 14-3.7 20.4-4.3 3.7-.2 7.5-.2 11.2 0 7.8 .9 15.6 2.5 23.5 5.2l6.6 3c6 2.8 12.1 6.9 17.8 12.3l4.3 4.3c3.9 3 8.7 11 14.8 23.8 2.8 6.9 4.6 14.4 5.2 22.6l.4 6-.4 6c0 7.8-1.8 15.3-5.2 22.6l-2.7 6c-3.2 7.3-8 13.9-14.8 19.9l-5.7 5.2c12.4 18.5 27.4 40.2 44.8 65.1l0 0s5.2-7.5 15.3-22.2c11.6-16.7 21.3-30.9 29.3-42.8l-5.7-5.2c-6.8-6-11.6-12.8-14.8-19.9l-2.7-6c-3.6-7.3-5.2-14.8-5.2-22.6l-.4-6 .4-6c.5-8 2.3-15.6 5.2-22.6l5-10.7c4.8-7.1 8-11.6 9.8-13.3l4.3-4.3c5.9-5.2 11.7-9.2 17.8-12.3zM133.3 285.7c0-5.3 .9-10.7 2.7-15.6l18.3 12.4c14.2 9.1 26.1 15.8 35.9 19.9 12.8 5.3 23.6 13.2 32.5 23.5 3.7 4.3 7.8 10.1 11.9 17.6 3.6-6.2 8.2-12.4 13.9-18.7 10.1-10.8 21.3-19 34-24.4 9.2-3.9 20.6-10.3 34-18.8 6.6-4.3 12.3-8.2 17.1-11.6 1.8 5 2.7 10.1 2.7 15.6 0 12.3-4.4 22.8-13.2 31.5-2.5 2.5-5 4.6-7.5 6.2-4.1 2.8-8.7 5.9-13.7 8.9-10 6.2-17.2 10.3-21.7 12.3-10.1 4.3-20.6 10-31.8 17.2l-13.5 9.8c-3-2.7-7.3-5.9-12.4-9.4-10.5-7.1-21.3-13-32.4-17.2-5-2-12.6-6.2-22.6-12.4l-13.3-8.9c-2.5-1.8-5-3.7-7.5-6.2-8.7-8.7-13.2-19.2-13.2-31.5zm34 132.8L154 409.6c-2.5-1.8-5-3.7-7.5-6.2-8.7-8.7-13.2-19.2-13.2-31.5s.9-10.7 2.7-15.6l18.3 12.4c14.2 9.1 26.1 15.8 35.9 19.9 12.8 5.3 23.6 13.2 32.5 23.5 3.7 4.3 7.8 10.1 11.9 17.6 3.6-6.2 8.2-12.4 13.9-18.7 10.1-10.8 21.3-19 34-24.4 9.2-3.9 20.6-10.3 34-18.8 6.6-4.3 12.3-8.2 17.1-11.6 1.8 5 2.7 10.1 2.7 15.6 0 12.3-4.4 22.8-13.2 31.5-2.5 2.5-5 4.6-7.5 6.2-4.1 2.8-8.7 5.9-13.7 8.9-10 6.2-17.2 10.3-21.7 12.3-10.1 4.3-20.6 10-31.8 17.2l-13.5 9.8c-3-2.7-7.3-5.9-12.4-9.4-10.5-7.1-21.3-13-32.4-17.2-5-2-12.6-6.2-22.6-12.4zm203-290.7c0-9.4-2.7-17.8-8.2-25.1-.7-.9-1.4-1.8-2.3-2.7-8.5-9.6-20.8-14.9-33.6-14.6-11 .4-20.4 4.4-28.4 12.3-8.2 8.4-12.4 18.3-12.4 29.9 0 2.7 .2 5.3 .7 7.8l83.2 0c.4-2.5 .7-5.2 .7-7.8zm-187 0c0-9.4-2.7-17.8-8.2-25.1-.7-.9-1.4-1.8-2.3-2.7-8.5-9.6-20.8-14.9-33.6-14.6-11 .4-20.4 4.4-28.4 12.3-8.2 8.4-12.4 18.3-12.4 29.9s.2 5.3 .7 7.8l83.2 0c.4-2.5 .7-5.2 .7-7.8z"]

  };
  var prefixes = [null    ,'fak',
    ,'fa-kit'
];
  bunker(function () {
    for (var _i = 0, _prefixes = prefixes; _i < _prefixes.length; _i++) {
      var prefix = _prefixes[_i];
      if (!prefix) continue;
      defineIcons(prefix, icons);
    }
  });

}());
