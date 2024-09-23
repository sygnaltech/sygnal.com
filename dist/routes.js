"use strict";
(() => {
  // node_modules/@sygnal/sse/dist/script.js
  var ScriptElement = class extends HTMLScriptElement {
    constructor(src, config) {
      super();
      this.src = src;
      if (config) {
        if (config.type) {
          this.type = config.type;
        }
        if (config.id) {
          this.id = config.id;
        }
        if (config.async !== void 0) {
          this.async = config.async;
        }
        if (config.defer !== void 0) {
          this.defer = config.defer;
        }
        if (config.customAttributes) {
          for (const [key, value] of Object.entries(config.customAttributes)) {
            this.setAttribute(key, value);
          }
        }
      }
    }
    appendTo(target = "body") {
      const parent = target === "head" ? document.head : document.body;
      parent.appendChild(this);
    }
    prependTo(target = "body") {
      const parent = target === "head" ? document.head : document.body;
      parent.prepend(this);
    }
  };
  customElements.define("custom-script", ScriptElement, { extends: "script" });

  // node_modules/@sygnal/sse/dist/page.js
  var __awaiter = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e5) {
          reject(e5);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e5) {
          reject(e5);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var Page = class {
    static loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
    static loadEngineCSS(cssFileName) {
      let libPath = window.SSE.baseUrl;
      const cssURL = `${libPath}/css/${cssFileName}`;
      this.loadCSS(cssURL);
    }
    static loadStyle(css) {
      const style = document.createElement("style");
      style.innerText = css;
      document.head.appendChild(style);
    }
    static replaceScriptSource(element, newSrc) {
      element.src = newSrc;
    }
    static replaceCSSLink(element, newHref) {
      element.href = newHref;
    }
    static prependToTitle(text) {
      document.title = `${text}${document.title}`;
    }
    static getCurrentScriptUrl() {
      if (document.currentScript) {
        const currentScript = document.currentScript;
        return currentScript.src;
      }
      console.error("document.currentScript is not supported in this browser.");
      return null;
    }
    static getCurrentScriptBaseUrl() {
      const currentScript = document.currentScript;
      if (currentScript) {
        const scriptURL = new URL(currentScript.src);
        const origin = scriptURL.origin;
        const path = scriptURL.pathname.substring(0, scriptURL.pathname.lastIndexOf("/"));
        const baseURL = `${origin}${path}`;
        return baseURL;
      } else {
        console.error("Unable to determine the currently executing script.");
      }
      return void 0;
    }
    static findAncestorWithAttribute(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement;
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static getAncestorAttributeValue(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement.getAttribute(attributeName);
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static hasAncestorWithAttribute(element, attributeName) {
      return this.findAncestorWithAttribute(element, attributeName) !== null;
    }
    static convertToPixels(value, contextElement = document.documentElement) {
      const match = value.match(/^(-?\d+\.?\d*)(rem|em|px|vh|vw|%)$/);
      if (!match)
        throw new Error("Invalid value format");
      const [, amountStr, unit] = match;
      const amount = parseFloat(amountStr);
      switch (unit) {
        case "px":
          return amount;
        case "rem":
          return amount * parseFloat(getComputedStyle(document.documentElement).fontSize);
        case "em":
          return amount * parseFloat(getComputedStyle(contextElement).fontSize);
        case "vh":
          return amount * window.innerHeight / 100;
        case "vw":
          return amount * window.innerWidth / 100;
        case "%":
          return amount * contextElement.clientWidth / 100;
        default:
          throw new Error("Unsupported unit");
      }
    }
    static getResponseHeader(headerName, url = void 0) {
      return __awaiter(this, void 0, void 0, function* () {
        const headers = yield this.getResponseHeaders(url);
        if (!headers)
          return void 0;
        if (!headers.has(headerName))
          return void 0;
        return headers.get(headerName) || void 0;
      });
    }
    static getResponseHeaders(url = void 0) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!url) {
            url = window.location.href;
          }
          const response = yield fetch(url, {
            method: "HEAD"
          });
          return response.headers;
        } catch (error) {
          console.error("Error checking reverse proxy header:", error);
        }
        return void 0;
      });
    }
  };
  Page.Head = class {
    static loadScript(src, config) {
      const script = new ScriptElement(src, config);
      script.appendTo("head");
    }
  };
  Page.Body = class {
    static loadScript(src, config) {
      const script = new ScriptElement(src, config);
      script.appendTo("body");
    }
  };

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i2 = 0; i2 < cookies.length; i2++) {
        var parts = cookies[i2].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e5) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // node_modules/@sygnal/sse/dist/routeDispatcher.js
  var RouteDispatcher = class {
    constructor(SiteClass) {
      this._SiteClass = SiteClass;
    }
    matchRoute(path) {
      for (const route in this.routes) {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          if (path.startsWith(baseRoute)) {
            return this.routes[route];
          }
        } else if (route === path) {
          return this.routes[route];
        }
      }
      return null;
    }
    setupRoute() {
      const site = new this._SiteClass();
      site.setup();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.setup();
      } else {
      }
    }
    execRoute() {
      const site = new this._SiteClass();
      site.exec();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.exec();
      } else {
      }
    }
  };

  // node_modules/posthog-js/dist/module.js
  function e(e5, t2) {
    var n2 = Object.keys(e5);
    if (Object.getOwnPropertySymbols) {
      var i2 = Object.getOwnPropertySymbols(e5);
      t2 && (i2 = i2.filter(function(t3) {
        return Object.getOwnPropertyDescriptor(e5, t3).enumerable;
      })), n2.push.apply(n2, i2);
    }
    return n2;
  }
  function t(t2) {
    for (var n2 = 1; n2 < arguments.length; n2++) {
      var i2 = null != arguments[n2] ? arguments[n2] : {};
      n2 % 2 ? e(Object(i2), true).forEach(function(e5) {
        o(t2, e5, i2[e5]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(i2)) : e(Object(i2)).forEach(function(e5) {
        Object.defineProperty(t2, e5, Object.getOwnPropertyDescriptor(i2, e5));
      });
    }
    return t2;
  }
  function n(e5) {
    return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e6) {
      return typeof e6;
    } : function(e6) {
      return e6 && "function" == typeof Symbol && e6.constructor === Symbol && e6 !== Symbol.prototype ? "symbol" : typeof e6;
    }, n(e5);
  }
  function i(e5, t2) {
    if (!(e5 instanceof t2))
      throw new TypeError("Cannot call a class as a function");
  }
  function r(e5, t2) {
    for (var n2 = 0; n2 < t2.length; n2++) {
      var i2 = t2[n2];
      i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e5, i2.key, i2);
    }
  }
  function s(e5, t2, n2) {
    return t2 && r(e5.prototype, t2), n2 && r(e5, n2), Object.defineProperty(e5, "prototype", { writable: false }), e5;
  }
  function o(e5, t2, n2) {
    return t2 in e5 ? Object.defineProperty(e5, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e5[t2] = n2, e5;
  }
  function a(e5, t2) {
    if (null == e5)
      return {};
    var n2, i2, r2 = function(e6, t3) {
      if (null == e6)
        return {};
      var n3, i3, r3 = {}, s3 = Object.keys(e6);
      for (i3 = 0; i3 < s3.length; i3++)
        n3 = s3[i3], t3.indexOf(n3) >= 0 || (r3[n3] = e6[n3]);
      return r3;
    }(e5, t2);
    if (Object.getOwnPropertySymbols) {
      var s2 = Object.getOwnPropertySymbols(e5);
      for (i2 = 0; i2 < s2.length; i2++)
        n2 = s2[i2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e5, n2) && (r2[n2] = e5[n2]);
    }
    return r2;
  }
  function u(e5, t2) {
    return function(e6) {
      if (Array.isArray(e6))
        return e6;
    }(e5) || function(e6, t3) {
      var n2 = null == e6 ? null : "undefined" != typeof Symbol && e6[Symbol.iterator] || e6["@@iterator"];
      if (null == n2)
        return;
      var i2, r2, s2 = [], o2 = true, a2 = false;
      try {
        for (n2 = n2.call(e6); !(o2 = (i2 = n2.next()).done) && (s2.push(i2.value), !t3 || s2.length !== t3); o2 = true)
          ;
      } catch (e7) {
        a2 = true, r2 = e7;
      } finally {
        try {
          o2 || null == n2.return || n2.return();
        } finally {
          if (a2)
            throw r2;
        }
      }
      return s2;
    }(e5, t2) || c(e5, t2) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function l(e5) {
    return function(e6) {
      if (Array.isArray(e6))
        return d(e6);
    }(e5) || function(e6) {
      if ("undefined" != typeof Symbol && null != e6[Symbol.iterator] || null != e6["@@iterator"])
        return Array.from(e6);
    }(e5) || c(e5) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function c(e5, t2) {
    if (e5) {
      if ("string" == typeof e5)
        return d(e5, t2);
      var n2 = Object.prototype.toString.call(e5).slice(8, -1);
      return "Object" === n2 && e5.constructor && (n2 = e5.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(e5) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? d(e5, t2) : void 0;
    }
  }
  function d(e5, t2) {
    (null == t2 || t2 > e5.length) && (t2 = e5.length);
    for (var n2 = 0, i2 = new Array(t2); n2 < t2; n2++)
      i2[n2] = e5[n2];
    return i2;
  }
  function h(e5, t2) {
    var n2 = "undefined" != typeof Symbol && e5[Symbol.iterator] || e5["@@iterator"];
    if (!n2) {
      if (Array.isArray(e5) || (n2 = c(e5)) || t2 && e5 && "number" == typeof e5.length) {
        n2 && (e5 = n2);
        var i2 = 0, r2 = function() {
        };
        return { s: r2, n: function() {
          return i2 >= e5.length ? { done: true } : { done: false, value: e5[i2++] };
        }, e: function(e6) {
          throw e6;
        }, f: r2 };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var s2, o2 = true, a2 = false;
    return { s: function() {
      n2 = n2.call(e5);
    }, n: function() {
      var e6 = n2.next();
      return o2 = e6.done, e6;
    }, e: function(e6) {
      a2 = true, s2 = e6;
    }, f: function() {
      try {
        o2 || null == n2.return || n2.return();
      } finally {
        if (a2)
          throw s2;
      }
    } };
  }
  var f = { DEBUG: false, LIB_VERSION: "1.161.3" };
  var v = Array.isArray;
  var p = Object.prototype;
  var g = p.hasOwnProperty;
  var _ = p.toString;
  var m = v || function(e5) {
    return "[object Array]" === _.call(e5);
  };
  var y = function(e5) {
    return "function" == typeof e5;
  };
  var b = function(e5) {
    return e5 === Object(e5) && !m(e5);
  };
  var k = function(e5) {
    if (b(e5)) {
      for (var t2 in e5)
        if (g.call(e5, t2))
          return false;
      return true;
    }
    return false;
  };
  var w = function(e5) {
    return void 0 === e5;
  };
  var S = function(e5) {
    return "[object String]" == _.call(e5);
  };
  var E = function(e5) {
    return S(e5) && 0 === e5.trim().length;
  };
  var I = function(e5) {
    return null === e5;
  };
  var R = function(e5) {
    return w(e5) || I(e5);
  };
  var F = function(e5) {
    return "[object Number]" == _.call(e5);
  };
  var x = function(e5) {
    return "[object Boolean]" === _.call(e5);
  };
  var P = function(e5) {
    return e5 instanceof FormData;
  };
  var C = "undefined" != typeof window ? window : void 0;
  var T = "undefined" != typeof globalThis ? globalThis : C;
  var $ = Array.prototype;
  var O = $.forEach;
  var M = $.indexOf;
  var A = null == T ? void 0 : T.navigator;
  var L = null == T ? void 0 : T.document;
  var D = null == T ? void 0 : T.location;
  var N = null == T ? void 0 : T.fetch;
  var q = null != T && T.XMLHttpRequest && "withCredentials" in new T.XMLHttpRequest() ? T.XMLHttpRequest : void 0;
  var B = null == T ? void 0 : T.AbortController;
  var H = null == A ? void 0 : A.userAgent;
  var U = null != C ? C : {};
  var j = "[PostHog.js]";
  var V = { _log: function(e5) {
    if (C && (f.DEBUG || U.POSTHOG_DEBUG) && !w(C.console) && C.console) {
      for (var t2 = ("__rrweb_original__" in C.console[e5]) ? C.console[e5].__rrweb_original__ : C.console[e5], n2 = arguments.length, i2 = new Array(n2 > 1 ? n2 - 1 : 0), r2 = 1; r2 < n2; r2++)
        i2[r2 - 1] = arguments[r2];
      t2.apply(void 0, [j].concat(i2));
    }
  }, info: function() {
    for (var e5 = arguments.length, t2 = new Array(e5), n2 = 0; n2 < e5; n2++)
      t2[n2] = arguments[n2];
    V._log.apply(V, ["log"].concat(t2));
  }, warn: function() {
    for (var e5 = arguments.length, t2 = new Array(e5), n2 = 0; n2 < e5; n2++)
      t2[n2] = arguments[n2];
    V._log.apply(V, ["warn"].concat(t2));
  }, error: function() {
    for (var e5 = arguments.length, t2 = new Array(e5), n2 = 0; n2 < e5; n2++)
      t2[n2] = arguments[n2];
    V._log.apply(V, ["error"].concat(t2));
  }, critical: function() {
    for (var e5, t2 = arguments.length, n2 = new Array(t2), i2 = 0; i2 < t2; i2++)
      n2[i2] = arguments[i2];
    (e5 = console).error.apply(e5, [j].concat(n2));
  }, uninitializedWarning: function(e5) {
    V.error("You must initialize PostHog before calling ".concat(e5));
  } };
  var G = {};
  var W = function(e5) {
    return e5.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
  function z(e5, t2, n2) {
    if (m(e5)) {
      if (O && e5.forEach === O)
        e5.forEach(t2, n2);
      else if ("length" in e5 && e5.length === +e5.length) {
        for (var i2 = 0, r2 = e5.length; i2 < r2; i2++)
          if (i2 in e5 && t2.call(n2, e5[i2], i2) === G)
            return;
      }
    }
  }
  function Q(e5, t2, n2) {
    if (!R(e5)) {
      if (m(e5))
        return z(e5, t2, n2);
      if (P(e5)) {
        var i2, r2 = h(e5.entries());
        try {
          for (r2.s(); !(i2 = r2.n()).done; ) {
            var s2 = i2.value;
            if (t2.call(n2, s2[1], s2[0]) === G)
              return;
          }
        } catch (e6) {
          r2.e(e6);
        } finally {
          r2.f();
        }
      } else
        for (var o2 in e5)
          if (g.call(e5, o2) && t2.call(n2, e5[o2], o2) === G)
            return;
    }
  }
  var J = function(e5) {
    for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), i2 = 1; i2 < t2; i2++)
      n2[i2 - 1] = arguments[i2];
    return z(n2, function(t3) {
      for (var n3 in t3)
        void 0 !== t3[n3] && (e5[n3] = t3[n3]);
    }), e5;
  };
  function Y(e5, t2) {
    return -1 !== e5.indexOf(t2);
  }
  function X(e5) {
    for (var t2 = Object.keys(e5), n2 = t2.length, i2 = new Array(n2); n2--; )
      i2[n2] = [t2[n2], e5[t2[n2]]];
    return i2;
  }
  var K = function() {
    return Date.now = Date.now || function() {
      return +new Date();
    }, Date.now();
  };
  var Z = function(e5) {
    try {
      return e5();
    } catch (e6) {
      return;
    }
  };
  var ee = function(e5) {
    return function() {
      try {
        for (var t2 = arguments.length, n2 = new Array(t2), i2 = 0; i2 < t2; i2++)
          n2[i2] = arguments[i2];
        return e5.apply(this, n2);
      } catch (e6) {
        V.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), V.critical(e6);
      }
    };
  };
  var te = function(e5) {
    var t2 = {};
    return Q(e5, function(e6, n2) {
      S(e6) && e6.length > 0 && (t2[n2] = e6);
    }), t2;
  };
  var ne = function(e5) {
    return e5.replace(/^\$/, "");
  };
  function ie(e5, t2) {
    return n2 = e5, i2 = function(e6) {
      return S(e6) && !I(t2) ? e6.slice(0, t2) : e6;
    }, r2 = /* @__PURE__ */ new Set(), function e6(t3, n3) {
      return t3 !== Object(t3) ? i2 ? i2(t3, n3) : t3 : r2.has(t3) ? void 0 : (r2.add(t3), m(t3) ? (s2 = [], z(t3, function(t4) {
        s2.push(e6(t4));
      })) : (s2 = {}, Q(t3, function(t4, n4) {
        r2.has(t4) || (s2[n4] = e6(t4, n4));
      })), s2);
      var s2;
    }(n2);
    var n2, i2, r2;
  }
  var re;
  var se = function(e5) {
    var t2, n2, i2, r2, s2 = "";
    for (t2 = n2 = 0, i2 = (e5 = (e5 + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, r2 = 0; r2 < i2; r2++) {
      var o2 = e5.charCodeAt(r2), a2 = null;
      o2 < 128 ? n2++ : a2 = o2 > 127 && o2 < 2048 ? String.fromCharCode(o2 >> 6 | 192, 63 & o2 | 128) : String.fromCharCode(o2 >> 12 | 224, o2 >> 6 & 63 | 128, 63 & o2 | 128), I(a2) || (n2 > t2 && (s2 += e5.substring(t2, n2)), s2 += a2, t2 = n2 = r2 + 1);
    }
    return n2 > t2 && (s2 += e5.substring(t2, e5.length)), s2;
  };
  var oe = function() {
    function e5(t2) {
      return t2 && (t2.preventDefault = e5.preventDefault, t2.stopPropagation = e5.stopPropagation), t2;
    }
    return e5.preventDefault = function() {
      this.returnValue = false;
    }, e5.stopPropagation = function() {
      this.cancelBubble = true;
    }, function(t2, n2, i2, r2, s2) {
      if (t2)
        if (t2.addEventListener && !r2)
          t2.addEventListener(n2, i2, !!s2);
        else {
          var o2 = "on" + n2, a2 = t2[o2];
          t2[o2] = function(t3, n3, i3) {
            return function(r3) {
              if (r3 = r3 || e5(null == C ? void 0 : C.event)) {
                var s3, o3 = true;
                y(i3) && (s3 = i3(r3));
                var a3 = n3.call(t3, r3);
                return false !== s3 && false !== a3 || (o3 = false), o3;
              }
            };
          }(t2, i2, a2);
        }
      else
        V.error("No valid element provided to register_event");
    };
  }();
  function ae(e5, t2) {
    for (var n2 = 0; n2 < e5.length; n2++)
      if (t2(e5[n2]))
        return e5[n2];
  }
  !function(e5) {
    e5.GZipJS = "gzip-js", e5.Base64 = "base64";
  }(re || (re = {}));
  var le = "$people_distinct_id";
  var ce = "__alias";
  var de = "__timers";
  var he = "$autocapture_disabled_server_side";
  var fe = "$heatmaps_enabled_server_side";
  var ve = "$exception_capture_enabled_server_side";
  var pe = "$exception_capture_endpoint_suffix";
  var ge = "$web_vitals_enabled_server_side";
  var _e = "$web_vitals_allowed_metrics";
  var me = "$session_recording_enabled_server_side";
  var ye = "$console_log_recording_enabled_server_side";
  var be = "$session_recording_network_payload_capture";
  var ke = "$session_recording_canvas_recording";
  var we = "$replay_sample_rate";
  var Se = "$replay_minimum_duration";
  var Ee = "$sesid";
  var Ie = "$session_is_sampled";
  var Re = "$enabled_feature_flags";
  var Fe = "$early_access_features";
  var xe = "$stored_person_properties";
  var Pe = "$stored_group_properties";
  var Ce = "$surveys";
  var Te = "$surveys_activated";
  var $e = "$flag_call_reported";
  var Oe = "$user_state";
  var Me = "$client_session_props";
  var Ae = "$capture_rate_limit";
  var Le = "$initial_campaign_params";
  var De = "$initial_referrer_info";
  var Ne = "$initial_person_info";
  var qe = "$epp";
  var Be = "__POSTHOG_TOOLBAR__";
  var He = [le, ce, "__cmpns", de, me, fe, Ee, Re, Oe, Fe, Pe, xe, Ce, $e, Me, Ae, Le, De, qe];
  var Ue = "$active_feature_flags";
  var je = "$override_feature_flags";
  var Ve = "$feature_flag_payloads";
  var Ge = function(e5) {
    var t2, n2 = {}, i2 = h(X(e5 || {}));
    try {
      for (i2.s(); !(t2 = i2.n()).done; ) {
        var r2 = u(t2.value, 2), s2 = r2[0], o2 = r2[1];
        o2 && (n2[s2] = o2);
      }
    } catch (e6) {
      i2.e(e6);
    } finally {
      i2.f();
    }
    return n2;
  };
  var We = function() {
    function e5(t2) {
      i(this, e5), this.instance = t2, this._override_warning = false, this.featureFlagEventHandlers = [], this.reloadFeatureFlagsQueued = false, this.reloadFeatureFlagsInAction = false;
    }
    return s(e5, [{ key: "getFlags", value: function() {
      return Object.keys(this.getFlagVariants());
    } }, { key: "getFlagVariants", value: function() {
      var e6 = this.instance.get_property(Re), t2 = this.instance.get_property(je);
      if (!t2)
        return e6 || {};
      for (var n2 = J({}, e6), i2 = Object.keys(t2), r2 = 0; r2 < i2.length; r2++)
        n2[i2[r2]] = t2[i2[r2]];
      return this._override_warning || (V.warn(" Overriding feature flags!", { enabledFlags: e6, overriddenFlags: t2, finalFlags: n2 }), this._override_warning = true), n2;
    } }, { key: "getFlagPayloads", value: function() {
      return this.instance.get_property(Ve) || {};
    } }, { key: "reloadFeatureFlags", value: function() {
      this.reloadFeatureFlagsQueued || (this.reloadFeatureFlagsQueued = true, this._startReloadTimer());
    } }, { key: "setAnonymousDistinctId", value: function(e6) {
      this.$anon_distinct_id = e6;
    } }, { key: "setReloadingPaused", value: function(e6) {
      this.reloadFeatureFlagsInAction = e6;
    } }, { key: "resetRequestQueue", value: function() {
      this.reloadFeatureFlagsQueued = false;
    } }, { key: "_startReloadTimer", value: function() {
      var e6 = this;
      this.reloadFeatureFlagsQueued && !this.reloadFeatureFlagsInAction && setTimeout(function() {
        !e6.reloadFeatureFlagsInAction && e6.reloadFeatureFlagsQueued && (e6.reloadFeatureFlagsQueued = false, e6._reloadFeatureFlagsRequest());
      }, 5);
    } }, { key: "_reloadFeatureFlagsRequest", value: function() {
      var e6 = this;
      if (!this.instance.config.advanced_disable_feature_flags) {
        this.setReloadingPaused(true);
        var t2 = this.instance.config.token, n2 = this.instance.get_property(xe), i2 = this.instance.get_property(Pe), r2 = { token: t2, distinct_id: this.instance.get_distinct_id(), groups: this.instance.getGroups(), $anon_distinct_id: this.$anon_distinct_id, person_properties: n2, group_properties: i2, disable_flags: this.instance.config.advanced_disable_feature_flags || void 0 };
        this.instance._send_request({ method: "POST", url: this.instance.requestRouter.endpointFor("api", "/decide/?v=3"), data: r2, compression: this.instance.config.disable_compression ? void 0 : re.Base64, timeout: this.instance.config.feature_flag_request_timeout_ms, callback: function(t3) {
          var n3;
          e6.setReloadingPaused(false);
          var i3 = true;
          200 === t3.statusCode && (e6.$anon_distinct_id = void 0, i3 = false), e6.receivedFeatureFlags(null !== (n3 = t3.json) && void 0 !== n3 ? n3 : {}, i3), e6._startReloadTimer();
        } });
      }
    } }, { key: "getFeatureFlag", value: function(e6) {
      var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      if (this.instance.decideEndpointWasHit || this.getFlags() && this.getFlags().length > 0) {
        var n2, i2 = this.getFlagVariants()[e6], r2 = "".concat(i2), s2 = this.instance.get_property($e) || {};
        if (t2.send_event || !("send_event" in t2)) {
          if (!(e6 in s2) || !s2[e6].includes(r2))
            m(s2[e6]) ? s2[e6].push(r2) : s2[e6] = [r2], null === (n2 = this.instance.persistence) || void 0 === n2 || n2.register(o({}, $e, s2)), this.instance.capture("$feature_flag_called", { $feature_flag: e6, $feature_flag_response: i2 });
        }
        return i2;
      }
      V.warn('getFeatureFlag for key "' + e6 + `" failed. Feature flags didn't load in time.`);
    } }, { key: "getFeatureFlagPayload", value: function(e6) {
      return this.getFlagPayloads()[e6];
    } }, { key: "isFeatureEnabled", value: function(e6) {
      var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      if (this.instance.decideEndpointWasHit || this.getFlags() && this.getFlags().length > 0)
        return !!this.getFeatureFlag(e6, t2);
      V.warn('isFeatureEnabled for key "' + e6 + `" failed. Feature flags didn't load in time.`);
    } }, { key: "addFeatureFlagsHandler", value: function(e6) {
      this.featureFlagEventHandlers.push(e6);
    } }, { key: "removeFeatureFlagsHandler", value: function(e6) {
      this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter(function(t2) {
        return t2 !== e6;
      });
    } }, { key: "receivedFeatureFlags", value: function(e6, n2) {
      if (this.instance.persistence) {
        this.instance.decideEndpointWasHit = true;
        var i2 = this.getFlagVariants(), r2 = this.getFlagPayloads();
        !function(e7, n3) {
          var i3, r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, s2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, a2 = e7.featureFlags, u2 = e7.featureFlagPayloads;
          if (a2)
            if (m(a2)) {
              var l2, c2 = {};
              if (a2)
                for (var d2 = 0; d2 < a2.length; d2++)
                  c2[a2[d2]] = true;
              n3 && n3.register((o(l2 = {}, Ue, a2), o(l2, Re, c2), l2));
            } else {
              var h2 = a2, f2 = u2;
              e7.errorsWhileComputingFlags && (h2 = t(t({}, r3), h2), f2 = t(t({}, s2), f2)), n3 && n3.register((o(i3 = {}, Ue, Object.keys(Ge(h2))), o(i3, Re, h2 || {}), o(i3, Ve, f2 || {}), i3));
            }
        }(e6, this.instance.persistence, i2, r2), this._fireFeatureFlagsCallbacks(n2);
      }
    } }, { key: "override", value: function(e6) {
      var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      if (!this.instance.__loaded || !this.instance.persistence)
        return V.uninitializedWarning("posthog.feature_flags.override");
      if (this._override_warning = t2, false === e6)
        this.instance.persistence.unregister(je);
      else if (m(e6)) {
        for (var n2 = {}, i2 = 0; i2 < e6.length; i2++)
          n2[e6[i2]] = true;
        this.instance.persistence.register(o({}, je, n2));
      } else
        this.instance.persistence.register(o({}, je, e6));
    } }, { key: "onFeatureFlags", value: function(e6) {
      var t2 = this;
      if (this.addFeatureFlagsHandler(e6), this.instance.decideEndpointWasHit) {
        var n2 = this._prepareFeatureFlagsForCallbacks(), i2 = n2.flags, r2 = n2.flagVariants;
        e6(i2, r2);
      }
      return function() {
        return t2.removeFeatureFlagsHandler(e6);
      };
    } }, { key: "updateEarlyAccessFeatureEnrollment", value: function(e6, n2) {
      var i2, r2, s2 = o({}, "$feature_enrollment/".concat(e6), n2);
      this.instance.capture("$feature_enrollment_update", { $feature_flag: e6, $feature_enrollment: n2, $set: s2 }), this.setPersonPropertiesForFlags(s2, false);
      var a2 = t(t({}, this.getFlagVariants()), {}, o({}, e6, n2));
      null === (i2 = this.instance.persistence) || void 0 === i2 || i2.register((o(r2 = {}, Ue, Object.keys(Ge(a2))), o(r2, Re, a2), r2)), this._fireFeatureFlagsCallbacks();
    } }, { key: "getEarlyAccessFeatures", value: function(e6) {
      var t2 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i2 = this.instance.get_property(Fe);
      if (i2 && !n2)
        return e6(i2);
      this.instance._send_request({ transport: "XHR", url: this.instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=".concat(this.instance.config.token)), method: "GET", callback: function(n3) {
        var i3;
        if (n3.json) {
          var r2 = n3.json.earlyAccessFeatures;
          return null === (i3 = t2.instance.persistence) || void 0 === i3 || i3.register(o({}, Fe, r2)), e6(r2);
        }
      } });
    } }, { key: "_prepareFeatureFlagsForCallbacks", value: function() {
      var e6 = this.getFlags(), t2 = this.getFlagVariants();
      return { flags: e6.filter(function(e7) {
        return t2[e7];
      }), flagVariants: Object.keys(t2).filter(function(e7) {
        return t2[e7];
      }).reduce(function(e7, n2) {
        return e7[n2] = t2[n2], e7;
      }, {}) };
    } }, { key: "_fireFeatureFlagsCallbacks", value: function(e6) {
      var t2 = this._prepareFeatureFlagsForCallbacks(), n2 = t2.flags, i2 = t2.flagVariants;
      this.featureFlagEventHandlers.forEach(function(t3) {
        return t3(n2, i2, { errorsLoading: e6 });
      });
    } }, { key: "setPersonPropertiesForFlags", value: function(e6) {
      var n2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i2 = this.instance.get_property(xe) || {};
      this.instance.register(o({}, xe, t(t({}, i2), e6))), n2 && this.instance.reloadFeatureFlags();
    } }, { key: "resetPersonPropertiesForFlags", value: function() {
      this.instance.unregister(xe);
    } }, { key: "setGroupPropertiesForFlags", value: function(e6) {
      var n2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i2 = this.instance.get_property(Pe) || {};
      0 !== Object.keys(i2).length && Object.keys(i2).forEach(function(n3) {
        i2[n3] = t(t({}, i2[n3]), e6[n3]), delete e6[n3];
      }), this.instance.register(o({}, Pe, t(t({}, i2), e6))), n2 && this.instance.reloadFeatureFlags();
    } }, { key: "resetGroupPropertiesForFlags", value: function(e6) {
      if (e6) {
        var n2 = this.instance.get_property(Pe) || {};
        this.instance.register(o({}, Pe, t(t({}, n2), {}, o({}, e6, {}))));
      } else
        this.instance.unregister(Pe);
    } }]), e5;
  }();
  Math.trunc || (Math.trunc = function(e5) {
    return e5 < 0 ? Math.ceil(e5) : Math.floor(e5);
  }), Number.isInteger || (Number.isInteger = function(e5) {
    return F(e5) && isFinite(e5) && Math.floor(e5) === e5;
  });
  var ze = "0123456789abcdef";
  var Qe = function() {
    function e5(t2) {
      if (i(this, e5), this.bytes = t2, 16 !== t2.length)
        throw new TypeError("not 128-bit length");
    }
    return s(e5, [{ key: "toString", value: function() {
      for (var e6 = "", t2 = 0; t2 < this.bytes.length; t2++)
        e6 = e6 + ze.charAt(this.bytes[t2] >>> 4) + ze.charAt(15 & this.bytes[t2]), 3 !== t2 && 5 !== t2 && 7 !== t2 && 9 !== t2 || (e6 += "-");
      if (36 !== e6.length)
        throw new Error("Invalid UUIDv7 was generated");
      return e6;
    } }, { key: "clone", value: function() {
      return new e5(this.bytes.slice(0));
    } }, { key: "equals", value: function(e6) {
      return 0 === this.compareTo(e6);
    } }, { key: "compareTo", value: function(e6) {
      for (var t2 = 0; t2 < 16; t2++) {
        var n2 = this.bytes[t2] - e6.bytes[t2];
        if (0 !== n2)
          return Math.sign(n2);
      }
      return 0;
    } }], [{ key: "fromFieldsV7", value: function(t2, n2, i2, r2) {
      if (!Number.isInteger(t2) || !Number.isInteger(n2) || !Number.isInteger(i2) || !Number.isInteger(r2) || t2 < 0 || n2 < 0 || i2 < 0 || r2 < 0 || t2 > 281474976710655 || n2 > 4095 || i2 > 1073741823 || r2 > 4294967295)
        throw new RangeError("invalid field value");
      var s2 = new Uint8Array(16);
      return s2[0] = t2 / Math.pow(2, 40), s2[1] = t2 / Math.pow(2, 32), s2[2] = t2 / Math.pow(2, 24), s2[3] = t2 / Math.pow(2, 16), s2[4] = t2 / Math.pow(2, 8), s2[5] = t2, s2[6] = 112 | n2 >>> 8, s2[7] = n2, s2[8] = 128 | i2 >>> 24, s2[9] = i2 >>> 16, s2[10] = i2 >>> 8, s2[11] = i2, s2[12] = r2 >>> 24, s2[13] = r2 >>> 16, s2[14] = r2 >>> 8, s2[15] = r2, new e5(s2);
    } }]), e5;
  }();
  var Je = function() {
    function e5() {
      i(this, e5), o(this, "timestamp", 0), o(this, "counter", 0), o(this, "random", new Ke());
    }
    return s(e5, [{ key: "generate", value: function() {
      var e6 = this.generateOrAbort();
      if (w(e6)) {
        this.timestamp = 0;
        var t2 = this.generateOrAbort();
        if (w(t2))
          throw new Error("Could not generate UUID after timestamp reset");
        return t2;
      }
      return e6;
    } }, { key: "generateOrAbort", value: function() {
      var e6 = Date.now();
      if (e6 > this.timestamp)
        this.timestamp = e6, this.resetCounter();
      else {
        if (!(e6 + 1e4 > this.timestamp))
          return;
        this.counter++, this.counter > 4398046511103 && (this.timestamp++, this.resetCounter());
      }
      return Qe.fromFieldsV7(this.timestamp, Math.trunc(this.counter / Math.pow(2, 30)), this.counter & Math.pow(2, 30) - 1, this.random.nextUint32());
    } }, { key: "resetCounter", value: function() {
      this.counter = 1024 * this.random.nextUint32() + (1023 & this.random.nextUint32());
    } }]), e5;
  }();
  var Ye = function(e5) {
    if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG)
      throw new Error("no cryptographically strong RNG available");
    for (var t2 = 0; t2 < e5.length; t2++)
      e5[t2] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
    return e5;
  };
  C && !w(C.crypto) && crypto.getRandomValues && (Ye = function(e5) {
    return crypto.getRandomValues(e5);
  });
  var Xe;
  var Ke = function() {
    function e5() {
      i(this, e5), o(this, "buffer", new Uint32Array(8)), o(this, "cursor", 1 / 0);
    }
    return s(e5, [{ key: "nextUint32", value: function() {
      return this.cursor >= this.buffer.length && (Ye(this.buffer), this.cursor = 0), this.buffer[this.cursor++];
    } }]), e5;
  }();
  var Ze = function() {
    return et().toString();
  };
  var et = function() {
    return (Xe || (Xe = new Je())).generate();
  };
  var tt = "Thu, 01 Jan 1970 00:00:00 GMT";
  var nt = "";
  var it = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
  function rt(e5, t2) {
    if (t2) {
      var n2 = function(e6) {
        var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : L;
        if (nt)
          return nt;
        if (!t3)
          return "";
        if (["localhost", "127.0.0.1"].includes(e6))
          return "";
        for (var n3 = e6.split("."), i3 = Math.min(n3.length, 8), r2 = "dmn_chk_" + Ze(), s2 = new RegExp("(^|;)\\s*" + r2 + "=1"); !nt && i3--; ) {
          var o2 = n3.slice(i3).join("."), a2 = r2 + "=1;domain=." + o2;
          t3.cookie = a2, s2.test(t3.cookie) && (t3.cookie = a2 + ";expires=" + tt, nt = o2);
        }
        return nt;
      }(e5);
      if (!n2) {
        var i2 = function(e6) {
          var t3 = e6.match(it);
          return t3 ? t3[0] : "";
        }(e5);
        i2 !== n2 && V.info("Warning: cookie subdomain discovery mismatch", i2, n2), n2 = i2;
      }
      return n2 ? "; domain=." + n2 : "";
    }
    return "";
  }
  var st;
  var ot = { is_supported: function() {
    return !!L;
  }, error: function(e5) {
    V.error("cookieStore error: " + e5);
  }, get: function(e5) {
    if (L) {
      try {
        for (var t2 = e5 + "=", n2 = L.cookie.split(";").filter(function(e6) {
          return e6.length;
        }), i2 = 0; i2 < n2.length; i2++) {
          for (var r2 = n2[i2]; " " == r2.charAt(0); )
            r2 = r2.substring(1, r2.length);
          if (0 === r2.indexOf(t2))
            return decodeURIComponent(r2.substring(t2.length, r2.length));
        }
      } catch (e6) {
      }
      return null;
    }
  }, parse: function(e5) {
    var t2;
    try {
      t2 = JSON.parse(ot.get(e5)) || {};
    } catch (e6) {
    }
    return t2;
  }, set: function(e5, t2, n2, i2, r2) {
    if (L)
      try {
        var s2 = "", o2 = "", a2 = rt(L.location.hostname, i2);
        if (n2) {
          var u2 = new Date();
          u2.setTime(u2.getTime() + 24 * n2 * 60 * 60 * 1e3), s2 = "; expires=" + u2.toUTCString();
        }
        r2 && (o2 = "; secure");
        var l2 = e5 + "=" + encodeURIComponent(JSON.stringify(t2)) + s2 + "; SameSite=Lax; path=/" + a2 + o2;
        return l2.length > 3686.4 && V.warn("cookieStore warning: large cookie, len=" + l2.length), L.cookie = l2, l2;
      } catch (e6) {
        return;
      }
  }, remove: function(e5, t2) {
    try {
      ot.set(e5, "", -1, t2);
    } catch (e6) {
      return;
    }
  } };
  var at = null;
  var ut = { is_supported: function() {
    if (!I(at))
      return at;
    var e5 = true;
    if (w(C))
      e5 = false;
    else
      try {
        var t2 = "__mplssupport__";
        ut.set(t2, "xyz"), '"xyz"' !== ut.get(t2) && (e5 = false), ut.remove(t2);
      } catch (t3) {
        e5 = false;
      }
    return e5 || V.error("localStorage unsupported; falling back to cookie store"), at = e5, e5;
  }, error: function(e5) {
    V.error("localStorage error: " + e5);
  }, get: function(e5) {
    try {
      return null == C ? void 0 : C.localStorage.getItem(e5);
    } catch (e6) {
      ut.error(e6);
    }
    return null;
  }, parse: function(e5) {
    try {
      return JSON.parse(ut.get(e5)) || {};
    } catch (e6) {
    }
    return null;
  }, set: function(e5, t2) {
    try {
      null == C || C.localStorage.setItem(e5, JSON.stringify(t2));
    } catch (e6) {
      ut.error(e6);
    }
  }, remove: function(e5) {
    try {
      null == C || C.localStorage.removeItem(e5);
    } catch (e6) {
      ut.error(e6);
    }
  } };
  var lt = ["distinct_id", Ee, Ie, qe];
  var ct = t(t({}, ut), {}, { parse: function(e5) {
    try {
      var t2 = {};
      try {
        t2 = ot.parse(e5) || {};
      } catch (e6) {
      }
      var n2 = J(t2, JSON.parse(ut.get(e5) || "{}"));
      return ut.set(e5, n2), n2;
    } catch (e6) {
    }
    return null;
  }, set: function(e5, t2, n2, i2, r2, s2) {
    try {
      ut.set(e5, t2, void 0, void 0, s2);
      var o2 = {};
      lt.forEach(function(e6) {
        t2[e6] && (o2[e6] = t2[e6]);
      }), Object.keys(o2).length && ot.set(e5, o2, n2, i2, r2, s2);
    } catch (e6) {
      ut.error(e6);
    }
  }, remove: function(e5, t2) {
    try {
      null == C || C.localStorage.removeItem(e5), ot.remove(e5, t2);
    } catch (e6) {
      ut.error(e6);
    }
  } });
  var dt = {};
  var ht = { is_supported: function() {
    return true;
  }, error: function(e5) {
    V.error("memoryStorage error: " + e5);
  }, get: function(e5) {
    return dt[e5] || null;
  }, parse: function(e5) {
    return dt[e5] || null;
  }, set: function(e5, t2) {
    dt[e5] = t2;
  }, remove: function(e5) {
    delete dt[e5];
  } };
  var ft = null;
  var vt = { is_supported: function() {
    if (!I(ft))
      return ft;
    if (ft = true, w(C))
      ft = false;
    else
      try {
        var e5 = "__support__";
        vt.set(e5, "xyz"), '"xyz"' !== vt.get(e5) && (ft = false), vt.remove(e5);
      } catch (e6) {
        ft = false;
      }
    return ft;
  }, error: function(e5) {
    V.error("sessionStorage error: ", e5);
  }, get: function(e5) {
    try {
      return null == C ? void 0 : C.sessionStorage.getItem(e5);
    } catch (e6) {
      vt.error(e6);
    }
    return null;
  }, parse: function(e5) {
    try {
      return JSON.parse(vt.get(e5)) || null;
    } catch (e6) {
    }
    return null;
  }, set: function(e5, t2) {
    try {
      null == C || C.sessionStorage.setItem(e5, JSON.stringify(t2));
    } catch (e6) {
      vt.error(e6);
    }
  }, remove: function(e5) {
    try {
      null == C || C.sessionStorage.removeItem(e5);
    } catch (e6) {
      vt.error(e6);
    }
  } };
  var pt = ["localhost", "127.0.0.1"];
  var gt = function(e5) {
    var t2 = null == L ? void 0 : L.createElement("a");
    return w(t2) ? null : (t2.href = e5, t2);
  };
  var _t = function(e5, t2) {
    return !!function(e6) {
      try {
        new RegExp(e6);
      } catch (e7) {
        return false;
      }
      return true;
    }(t2) && new RegExp(t2).test(e5);
  };
  var mt = function(e5) {
    var t2, n2, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "&", r2 = [];
    return Q(e5, function(e6, i3) {
      w(e6) || w(i3) || "undefined" === i3 || (t2 = encodeURIComponent(function(e7) {
        return e7 instanceof File;
      }(e6) ? e6.name : e6.toString()), n2 = encodeURIComponent(i3), r2[r2.length] = n2 + "=" + t2);
    }), r2.join(i2);
  };
  var yt = function(e5, t2) {
    for (var n2, i2 = ((e5.split("#")[0] || "").split("?")[1] || "").split("&"), r2 = 0; r2 < i2.length; r2++) {
      var s2 = i2[r2].split("=");
      if (s2[0] === t2) {
        n2 = s2;
        break;
      }
    }
    if (!m(n2) || n2.length < 2)
      return "";
    var o2 = n2[1];
    try {
      o2 = decodeURIComponent(o2);
    } catch (e6) {
      V.error("Skipping decoding for malformed query param: " + o2);
    }
    return o2.replace(/\+/g, " ");
  };
  var bt = function(e5, t2) {
    var n2 = e5.match(new RegExp(t2 + "=([^&]*)"));
    return n2 ? n2[1] : null;
  };
  var kt = "Mobile";
  var wt = "iOS";
  var St = "Android";
  var Et = "Tablet";
  var It = St + " " + Et;
  var Rt = "iPad";
  var Ft = "Apple";
  var xt = Ft + " Watch";
  var Pt = "Safari";
  var Ct = "BlackBerry";
  var Tt = "Samsung";
  var $t = Tt + "Browser";
  var Ot = Tt + " Internet";
  var Mt = "Chrome";
  var At = Mt + " OS";
  var Lt = Mt + " " + wt;
  var Dt = "Internet Explorer";
  var Nt = Dt + " " + kt;
  var qt = "Opera";
  var Bt = qt + " Mini";
  var Ht = "Edge";
  var Ut = "Microsoft " + Ht;
  var jt = "Firefox";
  var Vt = jt + " " + wt;
  var Gt = "Nintendo";
  var Wt = "PlayStation";
  var zt = "Xbox";
  var Qt = St + " " + kt;
  var Jt = kt + " " + Pt;
  var Yt = "Windows";
  var Xt = Yt + " Phone";
  var Kt = "Nokia";
  var Zt = "Ouya";
  var en = "Generic";
  var tn = en + " " + kt.toLowerCase();
  var nn = en + " " + Et.toLowerCase();
  var rn = "Konqueror";
  var sn = "(\\d+(\\.\\d+)?)";
  var on = new RegExp("Version/" + sn);
  var an = new RegExp(zt, "i");
  var un = new RegExp(Wt + " \\w+", "i");
  var ln = new RegExp(Gt + " \\w+", "i");
  var cn = new RegExp(Ct + "|PlayBook|BB10", "i");
  var dn = { "NT3.51": "NT 3.11", "NT4.0": "NT 4.0", "5.0": "2000", 5.1: "XP", 5.2: "XP", "6.0": "Vista", 6.1: "7", 6.2: "8", 6.3: "8.1", 6.4: "10", "10.0": "10" };
  var hn = function(e5, t2) {
    return t2 && Y(t2, Ft) || function(e6) {
      return Y(e6, Pt) && !Y(e6, Mt) && !Y(e6, St);
    }(e5);
  };
  var fn = function(e5, t2) {
    return t2 = t2 || "", Y(e5, " OPR/") && Y(e5, "Mini") ? Bt : Y(e5, " OPR/") ? qt : cn.test(e5) ? Ct : Y(e5, "IE" + kt) || Y(e5, "WPDesktop") ? Nt : Y(e5, $t) ? Ot : Y(e5, Ht) || Y(e5, "Edg/") ? Ut : Y(e5, "FBIOS") ? "Facebook " + kt : Y(e5, "UCWEB") || Y(e5, "UCBrowser") ? "UC Browser" : Y(e5, "CriOS") ? Lt : Y(e5, "CrMo") ? Mt : Y(e5, St) && Y(e5, Pt) ? Qt : Y(e5, Mt) ? Mt : Y(e5, "FxiOS") ? Vt : Y(e5.toLowerCase(), rn.toLowerCase()) ? rn : hn(e5, t2) ? Y(e5, kt) ? Jt : Pt : Y(e5, jt) ? jt : Y(e5, "MSIE") || Y(e5, "Trident/") ? Dt : Y(e5, "Gecko") ? jt : "";
  };
  var vn = (o(st = {}, Nt, [new RegExp("rv:" + sn)]), o(st, Ut, [new RegExp(Ht + "?\\/" + sn)]), o(st, Mt, [new RegExp("(" + Mt + "|CrMo)\\/" + sn)]), o(st, Lt, [new RegExp("CriOS\\/" + sn)]), o(st, "UC Browser", [new RegExp("(UCBrowser|UCWEB)\\/" + sn)]), o(st, Pt, [on]), o(st, Jt, [on]), o(st, qt, [new RegExp("(Opera|OPR)\\/" + sn)]), o(st, jt, [new RegExp(jt + "\\/" + sn)]), o(st, Vt, [new RegExp("FxiOS\\/" + sn)]), o(st, rn, [new RegExp("Konqueror[:/]?" + sn, "i")]), o(st, Ct, [new RegExp(Ct + " " + sn), on]), o(st, Qt, [new RegExp("android\\s" + sn, "i")]), o(st, Ot, [new RegExp($t + "\\/" + sn)]), o(st, Dt, [new RegExp("(rv:|MSIE )" + sn)]), o(st, "Mozilla", [new RegExp("rv:" + sn)]), st);
  var pn = [[new RegExp(zt + "; " + zt + " (.*?)[);]", "i"), function(e5) {
    return [zt, e5 && e5[1] || ""];
  }], [new RegExp(Gt, "i"), [Gt, ""]], [new RegExp(Wt, "i"), [Wt, ""]], [cn, [Ct, ""]], [new RegExp(Yt, "i"), function(e5, t2) {
    if (/Phone/.test(t2) || /WPDesktop/.test(t2))
      return [Xt, ""];
    if (new RegExp(kt).test(t2) && !/IEMobile\b/.test(t2))
      return [Yt + " " + kt, ""];
    var n2 = /Windows NT ([0-9.]+)/i.exec(t2);
    if (n2 && n2[1]) {
      var i2 = n2[1], r2 = dn[i2] || "";
      return /arm/i.test(t2) && (r2 = "RT"), [Yt, r2];
    }
    return [Yt, ""];
  }], [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, function(e5) {
    if (e5 && e5[3]) {
      var t2 = [e5[3], e5[4], e5[5] || "0"];
      return [wt, t2.join(".")];
    }
    return [wt, ""];
  }], [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, function(e5) {
    var t2 = "";
    return e5 && e5.length >= 3 && (t2 = w(e5[2]) ? e5[3] : e5[2]), ["watchOS", t2];
  }], [new RegExp("(" + St + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + St + ")", "i"), function(e5) {
    if (e5 && e5[2]) {
      var t2 = [e5[2], e5[3], e5[4] || "0"];
      return [St, t2.join(".")];
    }
    return [St, ""];
  }], [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, function(e5) {
    var t2 = ["Mac OS X", ""];
    if (e5 && e5[1]) {
      var n2 = [e5[1], e5[2], e5[3] || "0"];
      t2[1] = n2.join(".");
    }
    return t2;
  }], [/Mac/i, ["Mac OS X", ""]], [/CrOS/, [At, ""]], [/Linux|debian/i, ["Linux", ""]]];
  var gn = function(e5) {
    return ln.test(e5) ? Gt : un.test(e5) ? Wt : an.test(e5) ? zt : new RegExp(Zt, "i").test(e5) ? Zt : new RegExp("(" + Xt + "|WPDesktop)", "i").test(e5) ? Xt : /iPad/.test(e5) ? Rt : /iPod/.test(e5) ? "iPod Touch" : /iPhone/.test(e5) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(e5) ? xt : cn.test(e5) ? Ct : /(kobo)\s(ereader|touch)/i.test(e5) ? "Kobo" : new RegExp(Kt, "i").test(e5) ? Kt : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(e5) || /(kf[a-z]+)( bui|\)).+silk\//i.test(e5) ? "Kindle Fire" : /(Android|ZTE)/i.test(e5) ? !new RegExp(kt).test(e5) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(e5) ? /pixel[\daxl ]{1,6}/i.test(e5) && !/pixel c/i.test(e5) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(e5) || /lmy47v/i.test(e5) && !/QTAQZ3/i.test(e5) ? St : It : St : new RegExp("(pda|" + kt + ")", "i").test(e5) ? tn : new RegExp(Et, "i").test(e5) && !new RegExp(Et + " pc", "i").test(e5) ? nn : "";
  };
  var _n = "https?://(.*)";
  var mn = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gad_source", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "mc_cid", "igshid", "ttclid", "rdt_cid"];
  var yn = { campaignParams: function(e5) {
    return L ? this._campaignParamsFromUrl(L.URL, e5) : {};
  }, _campaignParamsFromUrl: function(e5, t2) {
    var n2 = mn.concat(t2 || []), i2 = {};
    return Q(n2, function(t3) {
      var n3 = yt(e5, t3);
      n3 && (i2[t3] = n3);
    }), i2;
  }, _searchEngine: function(e5) {
    return e5 ? 0 === e5.search(_n + "google.([^/?]*)") ? "google" : 0 === e5.search(_n + "bing.com") ? "bing" : 0 === e5.search(_n + "yahoo.com") ? "yahoo" : 0 === e5.search(_n + "duckduckgo.com") ? "duckduckgo" : null : null;
  }, _searchInfoFromReferrer: function(e5) {
    var t2 = yn._searchEngine(e5), n2 = "yahoo" != t2 ? "q" : "p", i2 = {};
    if (!I(t2)) {
      i2.$search_engine = t2;
      var r2 = L ? yt(L.referrer, n2) : "";
      r2.length && (i2.ph_keyword = r2);
    }
    return i2;
  }, searchInfo: function() {
    var e5 = null == L ? void 0 : L.referrer;
    return e5 ? this._searchInfoFromReferrer(e5) : {};
  }, browser: fn, browserVersion: function(e5, t2) {
    var n2 = fn(e5, t2), i2 = vn[n2];
    if (w(i2))
      return null;
    for (var r2 = 0; r2 < i2.length; r2++) {
      var s2 = i2[r2], o2 = e5.match(s2);
      if (o2)
        return parseFloat(o2[o2.length - 2]);
    }
    return null;
  }, browserLanguage: function() {
    return navigator.language || navigator.userLanguage;
  }, os: function(e5) {
    for (var t2 = 0; t2 < pn.length; t2++) {
      var n2 = u(pn[t2], 2), i2 = n2[0], r2 = n2[1], s2 = i2.exec(e5), o2 = s2 && (y(r2) ? r2(s2, e5) : r2);
      if (o2)
        return o2;
    }
    return ["", ""];
  }, device: gn, deviceType: function(e5) {
    var t2 = gn(e5);
    return t2 === Rt || t2 === It || "Kobo" === t2 || "Kindle Fire" === t2 || t2 === nn ? Et : t2 === Gt || t2 === zt || t2 === Wt || t2 === Zt ? "Console" : t2 === xt ? "Wearable" : t2 ? kt : "Desktop";
  }, referrer: function() {
    return (null == L ? void 0 : L.referrer) || "$direct";
  }, referringDomain: function() {
    var e5;
    return null != L && L.referrer && (null === (e5 = gt(L.referrer)) || void 0 === e5 ? void 0 : e5.host) || "$direct";
  }, referrerInfo: function() {
    return { $referrer: this.referrer(), $referring_domain: this.referringDomain() };
  }, initialPersonInfo: function() {
    return { r: this.referrer(), u: null == D ? void 0 : D.href };
  }, initialPersonPropsFromInfo: function(e5) {
    var t2, n2 = e5.r, i2 = e5.u, r2 = { $initial_referrer: n2, $initial_referring_domain: null == n2 ? void 0 : "$direct" == n2 ? "$direct" : null === (t2 = gt(n2)) || void 0 === t2 ? void 0 : t2.host };
    if (i2) {
      r2.$initial_current_url = i2;
      var s2 = gt(i2);
      r2.$initial_host = null == s2 ? void 0 : s2.host, r2.$initial_pathname = null == s2 ? void 0 : s2.pathname, Q(this._campaignParamsFromUrl(i2), function(e6, t3) {
        r2["$initial_" + ne(t3)] = e6;
      });
    }
    n2 && Q(this._searchInfoFromReferrer(n2), function(e6, t3) {
      r2["$initial_" + ne(t3)] = e6;
    });
    return r2;
  }, properties: function() {
    if (!H)
      return {};
    var e5 = u(yn.os(H), 2), t2 = e5[0], n2 = e5[1];
    return J(te({ $os: t2, $os_version: n2, $browser: yn.browser(H, navigator.vendor), $device: yn.device(H), $device_type: yn.deviceType(H) }), { $current_url: null == D ? void 0 : D.href, $host: null == D ? void 0 : D.host, $pathname: null == D ? void 0 : D.pathname, $raw_user_agent: H.length > 1e3 ? H.substring(0, 997) + "..." : H, $browser_version: yn.browserVersion(H, navigator.vendor), $browser_language: yn.browserLanguage(), $screen_height: null == C ? void 0 : C.screen.height, $screen_width: null == C ? void 0 : C.screen.width, $viewport_height: null == C ? void 0 : C.innerHeight, $viewport_width: null == C ? void 0 : C.innerWidth, $lib: "web", $lib_version: f.LIB_VERSION, $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10), $time: K() / 1e3 });
  }, people_properties: function() {
    if (!H)
      return {};
    var e5 = u(yn.os(H), 2), t2 = e5[0], n2 = e5[1];
    return J(te({ $os: t2, $os_version: n2, $browser: yn.browser(H, navigator.vendor) }), { $browser_version: yn.browserVersion(H, navigator.vendor) });
  } };
  var bn = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
  var kn = function() {
    function e5(n2) {
      i(this, e5), this.config = n2, this.props = {}, this.campaign_params_saved = false, this.name = function(e6) {
        var t2 = "";
        return e6.token && (t2 = e6.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), e6.persistence_name ? "ph_" + e6.persistence_name : "ph_" + t2 + "_posthog";
      }(n2), this.storage = this.buildStorage(n2), this.load(), n2.debug && V.info("Persistence loaded", n2.persistence, t({}, this.props)), this.update_config(n2, n2), this.save();
    }
    return s(e5, [{ key: "buildStorage", value: function(e6) {
      -1 === bn.indexOf(e6.persistence.toLowerCase()) && (V.critical("Unknown persistence type " + e6.persistence + "; falling back to localStorage+cookie"), e6.persistence = "localStorage+cookie");
      var t2 = e6.persistence.toLowerCase();
      return "localstorage" === t2 && ut.is_supported() ? ut : "localstorage+cookie" === t2 && ct.is_supported() ? ct : "sessionstorage" === t2 && vt.is_supported() ? vt : "memory" === t2 ? ht : "cookie" === t2 ? ot : ct.is_supported() ? ct : ot;
    } }, { key: "properties", value: function() {
      var e6 = {};
      return Q(this.props, function(t2, n2) {
        if (n2 === Re && b(t2))
          for (var i2 = Object.keys(t2), r2 = 0; r2 < i2.length; r2++)
            e6["$feature/".concat(i2[r2])] = t2[i2[r2]];
        else
          o2 = n2, a2 = false, (I(s2 = He) ? a2 : M && s2.indexOf === M ? -1 != s2.indexOf(o2) : (Q(s2, function(e7) {
            if (a2 || (a2 = e7 === o2))
              return G;
          }), a2)) || (e6[n2] = t2);
        var s2, o2, a2;
      }), e6;
    } }, { key: "load", value: function() {
      if (!this.disabled) {
        var e6 = this.storage.parse(this.name);
        e6 && (this.props = J({}, e6));
      }
    } }, { key: "save", value: function() {
      this.disabled || this.storage.set(this.name, this.props, this.expire_days, this.cross_subdomain, this.secure, this.config.debug);
    } }, { key: "remove", value: function() {
      this.storage.remove(this.name, false), this.storage.remove(this.name, true);
    } }, { key: "clear", value: function() {
      this.remove(), this.props = {};
    } }, { key: "register_once", value: function(e6, t2, n2) {
      var i2 = this;
      if (b(e6)) {
        w(t2) && (t2 = "None"), this.expire_days = w(n2) ? this.default_expiry : n2;
        var r2 = false;
        if (Q(e6, function(e7, n3) {
          i2.props.hasOwnProperty(n3) && i2.props[n3] !== t2 || (i2.props[n3] = e7, r2 = true);
        }), r2)
          return this.save(), true;
      }
      return false;
    } }, { key: "register", value: function(e6, t2) {
      var n2 = this;
      if (b(e6)) {
        this.expire_days = w(t2) ? this.default_expiry : t2;
        var i2 = false;
        if (Q(e6, function(t3, r2) {
          e6.hasOwnProperty(r2) && n2.props[r2] !== t3 && (n2.props[r2] = t3, i2 = true);
        }), i2)
          return this.save(), true;
      }
      return false;
    } }, { key: "unregister", value: function(e6) {
      e6 in this.props && (delete this.props[e6], this.save());
    } }, { key: "update_campaign_params", value: function() {
      this.campaign_params_saved || (this.register(yn.campaignParams(this.config.custom_campaign_params)), this.campaign_params_saved = true);
    } }, { key: "update_search_keyword", value: function() {
      this.register(yn.searchInfo());
    } }, { key: "update_referrer_info", value: function() {
      this.register_once(yn.referrerInfo(), void 0);
    } }, { key: "set_initial_person_info", value: function() {
      this.props[Le] || this.props[De] || this.register_once(o({}, Ne, yn.initialPersonInfo()), void 0);
    } }, { key: "get_referrer_info", value: function() {
      return te({ $referrer: this.props.$referrer, $referring_domain: this.props.$referring_domain });
    } }, { key: "get_initial_props", value: function() {
      var e6 = this, t2 = {};
      Q([De, Le], function(n3) {
        var i3 = e6.props[n3];
        i3 && Q(i3, function(e7, n4) {
          t2["$initial_" + ne(n4)] = e7;
        });
      });
      var n2 = this.props[Ne];
      if (n2) {
        var i2 = yn.initialPersonPropsFromInfo(n2);
        J(t2, i2);
      }
      return t2;
    } }, { key: "safe_merge", value: function(e6) {
      return Q(this.props, function(t2, n2) {
        n2 in e6 || (e6[n2] = t2);
      }), e6;
    } }, { key: "update_config", value: function(e6, t2) {
      if (this.default_expiry = this.expire_days = e6.cookie_expiration, this.set_disabled(e6.disable_persistence), this.set_cross_subdomain(e6.cross_subdomain_cookie), this.set_secure(e6.secure_cookie), e6.persistence !== t2.persistence) {
        var n2 = this.buildStorage(e6), i2 = this.props;
        this.clear(), this.storage = n2, this.props = i2, this.save();
      }
    } }, { key: "set_disabled", value: function(e6) {
      this.disabled = e6, this.disabled ? this.remove() : this.save();
    } }, { key: "set_cross_subdomain", value: function(e6) {
      e6 !== this.cross_subdomain && (this.cross_subdomain = e6, this.remove(), this.save());
    } }, { key: "get_cross_subdomain", value: function() {
      return !!this.cross_subdomain;
    } }, { key: "set_secure", value: function(e6) {
      e6 !== this.secure && (this.secure = e6, this.remove(), this.save());
    } }, { key: "set_event_timer", value: function(e6, t2) {
      var n2 = this.props[de] || {};
      n2[e6] = t2, this.props[de] = n2, this.save();
    } }, { key: "remove_event_timer", value: function(e6) {
      var t2 = (this.props[de] || {})[e6];
      return w(t2) || (delete this.props[de][e6], this.save()), t2;
    } }, { key: "get_property", value: function(e6) {
      return this.props[e6];
    } }, { key: "set_property", value: function(e6, t2) {
      this.props[e6] = t2, this.save();
    } }]), e5;
  }();
  function wn(e5) {
    return JSON.stringify(e5, (t2 = [], function(e6, n2) {
      if (b(n2)) {
        for (; t2.length > 0 && t2.at(-1) !== this; )
          t2.pop();
        return t2.includes(n2) ? "[Circular]" : (t2.push(n2), n2);
      }
      return n2;
    })).length;
    var t2;
  }
  var Sn = 2;
  var En = 4;
  function In(e5) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 66060288e-1;
    if (e5.size >= t2 && e5.data.length > 1) {
      var n2 = Math.floor(e5.data.length / 2), i2 = e5.data.slice(0, n2), r2 = e5.data.slice(n2);
      return [In({ size: wn(i2), data: i2, sessionId: e5.sessionId, windowId: e5.windowId }), In({ size: wn(r2), data: r2, sessionId: e5.sessionId, windowId: e5.windowId })].flatMap(function(e6) {
        return e6;
      });
    }
    return [e5];
  }
  var Rn = function(e5) {
    return e5[e5.DomContentLoaded = 0] = "DomContentLoaded", e5[e5.Load = 1] = "Load", e5[e5.FullSnapshot = 2] = "FullSnapshot", e5[e5.IncrementalSnapshot = 3] = "IncrementalSnapshot", e5[e5.Meta = 4] = "Meta", e5[e5.Custom = 5] = "Custom", e5[e5.Plugin = 6] = "Plugin", e5;
  }(Rn || {});
  var Fn = function(e5) {
    return e5[e5.Mutation = 0] = "Mutation", e5[e5.MouseMove = 1] = "MouseMove", e5[e5.MouseInteraction = 2] = "MouseInteraction", e5[e5.Scroll = 3] = "Scroll", e5[e5.ViewportResize = 4] = "ViewportResize", e5[e5.Input = 5] = "Input", e5[e5.TouchMove = 6] = "TouchMove", e5[e5.MediaInteraction = 7] = "MediaInteraction", e5[e5.StyleSheetRule = 8] = "StyleSheetRule", e5[e5.CanvasMutation = 9] = "CanvasMutation", e5[e5.Font = 10] = "Font", e5[e5.Log = 11] = "Log", e5[e5.Drag = 12] = "Drag", e5[e5.StyleDeclaration = 13] = "StyleDeclaration", e5[e5.Selection = 14] = "Selection", e5[e5.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e5[e5.CustomElement = 16] = "CustomElement", e5;
  }(Fn || {});
  function xn(e5) {
    return e5 ? W(e5).split(/\s+/) : [];
  }
  function Pn(e5) {
    var t2 = null == C ? void 0 : C.location.href;
    return !!(t2 && e5 && e5.some(function(e6) {
      return t2.match(e6);
    }));
  }
  function Cn(e5) {
    var t2 = "";
    switch (n(e5.className)) {
      case "string":
        t2 = e5.className;
        break;
      case "object":
        t2 = (e5.className && "baseVal" in e5.className ? e5.className.baseVal : null) || e5.getAttribute("class") || "";
        break;
      default:
        t2 = "";
    }
    return xn(t2);
  }
  function Tn(e5) {
    return R(e5) ? null : W(e5).split(/(\s+)/).filter(function(e6) {
      return Qn(e6);
    }).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
  }
  function $n(e5) {
    var t2 = "";
    return Bn(e5) && !Hn(e5) && e5.childNodes && e5.childNodes.length && Q(e5.childNodes, function(e6) {
      var n2;
      An(e6) && e6.textContent && (t2 += null !== (n2 = Tn(e6.textContent)) && void 0 !== n2 ? n2 : "");
    }), W(t2);
  }
  function On(e5) {
    return !!e5 && 1 === e5.nodeType;
  }
  function Mn(e5, t2) {
    return !!e5 && !!e5.tagName && e5.tagName.toLowerCase() === t2.toLowerCase();
  }
  function An(e5) {
    return !!e5 && 3 === e5.nodeType;
  }
  function Ln(e5) {
    return !!e5 && 11 === e5.nodeType;
  }
  var Dn = ["a", "button", "form", "input", "select", "textarea", "label"];
  function Nn(e5) {
    var t2 = e5.parentNode;
    return !(!t2 || !On(t2)) && t2;
  }
  function qn(e5, t2) {
    var i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, r2 = arguments.length > 3 ? arguments[3] : void 0, s2 = arguments.length > 4 ? arguments[4] : void 0;
    if (!C || !e5 || Mn(e5, "html") || !On(e5))
      return false;
    if (null != i2 && i2.url_allowlist && !Pn(i2.url_allowlist))
      return false;
    if (null != i2 && i2.url_ignorelist && Pn(i2.url_ignorelist))
      return false;
    if (null != i2 && i2.dom_event_allowlist) {
      var o2 = i2.dom_event_allowlist;
      if (o2 && !o2.some(function(e6) {
        return t2.type === e6;
      }))
        return false;
    }
    for (var a2 = false, u2 = [e5], l2 = true, c2 = e5; c2.parentNode && !Mn(c2, "body"); )
      if (Ln(c2.parentNode))
        u2.push(c2.parentNode.host), c2 = c2.parentNode.host;
      else {
        if (!(l2 = Nn(c2)))
          break;
        if (r2 || Dn.indexOf(l2.tagName.toLowerCase()) > -1)
          a2 = true;
        else {
          var d2 = C.getComputedStyle(l2);
          d2 && "pointer" === d2.getPropertyValue("cursor") && (a2 = true);
        }
        u2.push(l2), c2 = l2;
      }
    if (!function(e6, t3) {
      var i3 = null == t3 ? void 0 : t3.element_allowlist;
      if (w(i3))
        return true;
      var r3, s3 = h(e6);
      try {
        var o3 = function() {
          var e7 = r3.value;
          if (i3.some(function(t4) {
            return e7.tagName.toLowerCase() === t4;
          }))
            return { v: true };
        };
        for (s3.s(); !(r3 = s3.n()).done; ) {
          var a3 = o3();
          if ("object" === n(a3))
            return a3.v;
        }
      } catch (e7) {
        s3.e(e7);
      } finally {
        s3.f();
      }
      return false;
    }(u2, i2))
      return false;
    if (!function(e6, t3) {
      var i3 = null == t3 ? void 0 : t3.css_selector_allowlist;
      if (w(i3))
        return true;
      var r3, s3 = h(e6);
      try {
        var o3 = function() {
          var e7 = r3.value;
          if (i3.some(function(t4) {
            return e7.matches(t4);
          }))
            return { v: true };
        };
        for (s3.s(); !(r3 = s3.n()).done; ) {
          var a3 = o3();
          if ("object" === n(a3))
            return a3.v;
        }
      } catch (e7) {
        s3.e(e7);
      } finally {
        s3.f();
      }
      return false;
    }(u2, i2))
      return false;
    var f2 = C.getComputedStyle(e5);
    if (f2 && "pointer" === f2.getPropertyValue("cursor") && "click" === t2.type)
      return true;
    var v2 = e5.tagName.toLowerCase();
    switch (v2) {
      case "html":
        return false;
      case "form":
        return (s2 || ["submit"]).indexOf(t2.type) >= 0;
      case "input":
      case "select":
      case "textarea":
        return (s2 || ["change", "click"]).indexOf(t2.type) >= 0;
      default:
        return a2 ? (s2 || ["click"]).indexOf(t2.type) >= 0 : (s2 || ["click"]).indexOf(t2.type) >= 0 && (Dn.indexOf(v2) > -1 || "true" === e5.getAttribute("contenteditable"));
    }
  }
  function Bn(e5) {
    for (var t2 = e5; t2.parentNode && !Mn(t2, "body"); t2 = t2.parentNode) {
      var n2 = Cn(t2);
      if (Y(n2, "ph-sensitive") || Y(n2, "ph-no-capture"))
        return false;
    }
    if (Y(Cn(e5), "ph-include"))
      return true;
    var i2 = e5.type || "";
    if (S(i2))
      switch (i2.toLowerCase()) {
        case "hidden":
        case "password":
          return false;
      }
    var r2 = e5.name || e5.id || "";
    if (S(r2)) {
      if (/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(r2.replace(/[^a-zA-Z0-9]/g, "")))
        return false;
    }
    return true;
  }
  function Hn(e5) {
    return !!(Mn(e5, "input") && !["button", "checkbox", "submit", "reset"].includes(e5.type) || Mn(e5, "select") || Mn(e5, "textarea") || "true" === e5.getAttribute("contenteditable"));
  }
  var Un = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})";
  var jn = new RegExp("^(?:".concat(Un, ")$"));
  var Vn = new RegExp(Un);
  var Gn = "\\d{3}-?\\d{2}-?\\d{4}";
  var Wn = new RegExp("^(".concat(Gn, ")$"));
  var zn = new RegExp("(".concat(Gn, ")"));
  function Qn(e5) {
    var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    if (R(e5))
      return false;
    if (S(e5)) {
      if (e5 = W(e5), (t2 ? jn : Vn).test((e5 || "").replace(/[- ]/g, "")))
        return false;
      if ((t2 ? Wn : zn).test(e5))
        return false;
    }
    return true;
  }
  function Jn(e5) {
    var t2 = $n(e5);
    return Qn(t2 = "".concat(t2, " ").concat(Yn(e5)).trim()) ? t2 : "";
  }
  function Yn(e5) {
    var t2 = "";
    return e5 && e5.childNodes && e5.childNodes.length && Q(e5.childNodes, function(e6) {
      var n2;
      if (e6 && "span" === (null === (n2 = e6.tagName) || void 0 === n2 ? void 0 : n2.toLowerCase()))
        try {
          var i2 = $n(e6);
          t2 = "".concat(t2, " ").concat(i2).trim(), e6.childNodes && e6.childNodes.length && (t2 = "".concat(t2, " ").concat(Yn(e6)).trim());
        } catch (e7) {
          V.error(e7);
        }
    }), t2;
  }
  function Xn(e5) {
    return function(e6) {
      var n2 = e6.map(function(e7) {
        var n3, i2, r2 = "";
        if (e7.tag_name && (r2 += e7.tag_name), e7.attr_class) {
          e7.attr_class.sort();
          var s2, o2 = h(e7.attr_class);
          try {
            for (o2.s(); !(s2 = o2.n()).done; ) {
              var a2 = s2.value;
              r2 += ".".concat(a2.replace(/"/g, ""));
            }
          } catch (e8) {
            o2.e(e8);
          } finally {
            o2.f();
          }
        }
        var l2 = t(t(t(t({}, e7.text ? { text: e7.text } : {}), {}, { "nth-child": null !== (n3 = e7.nth_child) && void 0 !== n3 ? n3 : 0, "nth-of-type": null !== (i2 = e7.nth_of_type) && void 0 !== i2 ? i2 : 0 }, e7.href ? { href: e7.href } : {}), e7.attr_id ? { attr_id: e7.attr_id } : {}), e7.attributes), c2 = {};
        return X(l2).sort(function(e8, t2) {
          var n4 = u(e8, 1)[0], i3 = u(t2, 1)[0];
          return n4.localeCompare(i3);
        }).forEach(function(e8) {
          var t2 = u(e8, 2), n4 = t2[0], i3 = t2[1];
          return c2[Kn(n4.toString())] = Kn(i3.toString());
        }), r2 += ":", r2 += X(l2).map(function(e8) {
          var t2 = u(e8, 2), n4 = t2[0], i3 = t2[1];
          return "".concat(n4, '="').concat(i3, '"');
        }).join("");
      });
      return n2.join(";");
    }(function(e6) {
      return e6.map(function(e7) {
        var t2, n2, i2 = { text: null === (t2 = e7.$el_text) || void 0 === t2 ? void 0 : t2.slice(0, 400), tag_name: e7.tag_name, href: null === (n2 = e7.attr__href) || void 0 === n2 ? void 0 : n2.slice(0, 2048), attr_class: Zn(e7), attr_id: e7.attr__id, nth_child: e7.nth_child, nth_of_type: e7.nth_of_type, attributes: {} };
        return X(e7).filter(function(e8) {
          return 0 === u(e8, 1)[0].indexOf("attr__");
        }).forEach(function(e8) {
          var t3 = u(e8, 2), n3 = t3[0], r2 = t3[1];
          return i2.attributes[n3] = r2;
        }), i2;
      });
    }(e5));
  }
  function Kn(e5) {
    return e5.replace(/"|\\"/g, '\\"');
  }
  function Zn(e5) {
    var t2 = e5.attr__class;
    return t2 ? m(t2) ? t2 : xn(t2) : void 0;
  }
  var ei = "[SessionRecording]";
  var ti = "redacted";
  var ni = { initiatorTypes: ["audio", "beacon", "body", "css", "early-hint", "embed", "fetch", "frame", "iframe", "icon", "image", "img", "input", "link", "navigation", "object", "ping", "script", "track", "video", "xmlhttprequest"], maskRequestFn: function(e5) {
    return e5;
  }, recordHeaders: false, recordBody: false, recordInitialRequests: false, recordPerformance: false, performanceEntryTypeToObserve: ["first-input", "navigation", "paint", "resource"], payloadSizeLimitBytes: 1e6, payloadHostDenyList: [".lr-ingest.io", ".ingest.sentry.io"] };
  var ii = ["authorization", "x-forwarded-for", "authorization", "cookie", "set-cookie", "x-api-key", "x-real-ip", "remote-addr", "forwarded", "proxy-authorization", "x-csrf-token", "x-csrftoken", "x-xsrf-token"];
  var ri = ["password", "secret", "passwd", "api_key", "apikey", "auth", "credentials", "mysql_pwd", "privatekey", "private_key", "token"];
  var si = ["/s/", "/e/", "/i/"];
  function oi(e5, t2, n2, i2) {
    if (R(e5))
      return e5;
    var r2 = (null == t2 ? void 0 : t2["content-length"]) || function(e6) {
      return new Blob([e6]).size;
    }(e5);
    return S(r2) && (r2 = parseInt(r2)), r2 > n2 ? ei + " ".concat(i2, " body too large to record (").concat(r2, " bytes)") : e5;
  }
  function ai(e5, t2) {
    if (R(e5))
      return e5;
    var n2 = e5;
    return Qn(n2, false) || (n2 = ei + " " + t2 + " body " + ti), Q(ri, function(e6) {
      var i2, r2;
      null !== (i2 = n2) && void 0 !== i2 && i2.length && -1 !== (null === (r2 = n2) || void 0 === r2 ? void 0 : r2.indexOf(e6)) && (n2 = ei + " " + t2 + " body " + ti + " as might contain: " + e6);
    }), n2;
  }
  var ui;
  var li = function(e5, n2) {
    var i2, r2, s2, o2 = { payloadSizeLimitBytes: ni.payloadSizeLimitBytes, performanceEntryTypeToObserve: l(ni.performanceEntryTypeToObserve), payloadHostDenyList: [].concat(l(n2.payloadHostDenyList || []), l(ni.payloadHostDenyList)) }, a2 = false !== e5.session_recording.recordHeaders && n2.recordHeaders, u2 = false !== e5.session_recording.recordBody && n2.recordBody, c2 = false !== e5.capture_performance && n2.recordPerformance, d2 = (i2 = o2, s2 = Math.min(1e6, null !== (r2 = i2.payloadSizeLimitBytes) && void 0 !== r2 ? r2 : 1e6), function(e6) {
      return null != e6 && e6.requestBody && (e6.requestBody = oi(e6.requestBody, e6.requestHeaders, s2, "Request")), null != e6 && e6.responseBody && (e6.responseBody = oi(e6.responseBody, e6.responseHeaders, s2, "Response")), e6;
    }), h2 = function(e6) {
      return d2(function(e7) {
        var t3 = gt(e7.name);
        if (!(t3 && t3.pathname && si.some(function(e8) {
          return 0 === t3.pathname.indexOf(e8);
        })))
          return e7;
      }((n3 = (t2 = e6).requestHeaders, R(n3) || Q(Object.keys(null != n3 ? n3 : {}), function(e7) {
        ii.includes(e7.toLowerCase()) && (n3[e7] = ti);
      }), t2)));
      var t2, n3;
    }, f2 = y(e5.session_recording.maskNetworkRequestFn);
    return f2 && y(e5.session_recording.maskCapturedNetworkRequestFn) && V.warn("Both `maskNetworkRequestFn` and `maskCapturedNetworkRequestFn` are defined. `maskNetworkRequestFn` will be ignored."), f2 && (e5.session_recording.maskCapturedNetworkRequestFn = function(n3) {
      var i3 = e5.session_recording.maskNetworkRequestFn({ url: n3.name });
      return t(t({}, n3), {}, { name: null == i3 ? void 0 : i3.url });
    }), o2.maskRequestFn = y(e5.session_recording.maskCapturedNetworkRequestFn) ? function(t2) {
      var n3, i3, r3, s3 = h2(t2);
      return s3 && null !== (n3 = null === (i3 = (r3 = e5.session_recording).maskCapturedNetworkRequestFn) || void 0 === i3 ? void 0 : i3.call(r3, s3)) && void 0 !== n3 ? n3 : void 0;
    } : function(e6) {
      return function(e7) {
        if (!w(e7))
          return e7.requestBody = ai(e7.requestBody, "Request"), e7.responseBody = ai(e7.responseBody, "Response"), e7;
      }(h2(e6));
    }, t(t(t({}, ni), o2), {}, { recordHeaders: a2, recordBody: u2, recordPerformance: c2, recordInitialRequests: c2 });
  };
  var ci = s(function e2(t2) {
    var n2, r2, s2 = this, a2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    i(this, e2), o(this, "bucketSize", 100), o(this, "refillRate", 10), o(this, "mutationBuckets", {}), o(this, "loggedTracker", {}), o(this, "refillBuckets", function() {
      Object.keys(s2.mutationBuckets).forEach(function(e5) {
        s2.mutationBuckets[e5] = s2.mutationBuckets[e5] + s2.refillRate, s2.mutationBuckets[e5] >= s2.bucketSize && delete s2.mutationBuckets[e5];
      });
    }), o(this, "getNodeOrRelevantParent", function(e5) {
      var t3 = s2.rrweb.mirror.getNode(e5);
      if ("svg" !== (null == t3 ? void 0 : t3.nodeName) && t3 instanceof Element) {
        var n3 = t3.closest("svg");
        if (n3)
          return [s2.rrweb.mirror.getId(n3), n3];
      }
      return [e5, t3];
    }), o(this, "numberOfChanges", function(e5) {
      var t3, n3, i2, r3, s3, o2, a3, u2;
      return (null !== (t3 = null === (n3 = e5.removes) || void 0 === n3 ? void 0 : n3.length) && void 0 !== t3 ? t3 : 0) + (null !== (i2 = null === (r3 = e5.attributes) || void 0 === r3 ? void 0 : r3.length) && void 0 !== i2 ? i2 : 0) + (null !== (s3 = null === (o2 = e5.texts) || void 0 === o2 ? void 0 : o2.length) && void 0 !== s3 ? s3 : 0) + (null !== (a3 = null === (u2 = e5.adds) || void 0 === u2 ? void 0 : u2.length) && void 0 !== a3 ? a3 : 0);
    }), o(this, "throttleMutations", function(e5) {
      if (3 !== e5.type || 0 !== e5.data.source)
        return e5;
      var t3 = e5.data, n3 = s2.numberOfChanges(t3);
      t3.attributes && (t3.attributes = t3.attributes.filter(function(e6) {
        var t4, n4, i3, r3 = u(s2.getNodeOrRelevantParent(e6.id), 2), o2 = r3[0], a3 = r3[1];
        if (0 === s2.mutationBuckets[o2])
          return false;
        (s2.mutationBuckets[o2] = null !== (t4 = s2.mutationBuckets[o2]) && void 0 !== t4 ? t4 : s2.bucketSize, s2.mutationBuckets[o2] = Math.max(s2.mutationBuckets[o2] - 1, 0), 0 === s2.mutationBuckets[o2]) && (s2.loggedTracker[o2] || (s2.loggedTracker[o2] = true, null === (n4 = (i3 = s2.options).onBlockedNode) || void 0 === n4 || n4.call(i3, o2, a3)));
        return e6;
      }));
      var i2 = s2.numberOfChanges(t3);
      return 0 !== i2 || n3 === i2 ? e5 : void 0;
    }), this.rrweb = t2, this.options = a2, this.refillRate = null !== (n2 = this.options.refillRate) && void 0 !== n2 ? n2 : this.refillRate, this.bucketSize = null !== (r2 = this.options.bucketSize) && void 0 !== r2 ? r2 : this.bucketSize, setInterval(function() {
      s2.refillBuckets();
    }, 1e3);
  });
  var di = 3e5;
  var hi = [Fn.MouseMove, Fn.MouseInteraction, Fn.Scroll, Fn.ViewportResize, Fn.Input, Fn.TouchMove, Fn.MediaInteraction, Fn.Drag];
  var fi = function(e5) {
    return { rrwebMethod: e5, enqueuedAt: Date.now(), attempt: 1 };
  };
  var vi = "[SessionRecording]";
  var pi = function() {
    function e5(t2) {
      var n2 = this;
      if (i(this, e5), o(this, "queuedRRWebEvents", []), o(this, "isIdle", false), o(this, "_linkedFlagSeen", false), o(this, "_lastActivityTimestamp", Date.now()), o(this, "_linkedFlag", null), o(this, "_removePageViewCaptureHook", void 0), o(this, "_forceAllowLocalhostNetworkCapture", false), o(this, "_onBeforeUnload", function() {
        n2._flushBuffer();
      }), o(this, "_onOffline", function() {
        n2._tryAddCustomEvent("browser offline", {});
      }), o(this, "_onOnline", function() {
        n2._tryAddCustomEvent("browser online", {});
      }), o(this, "_onVisibilityChange", function() {
        if (null != L && L.visibilityState) {
          var e6 = "window " + L.visibilityState;
          n2._tryAddCustomEvent(e6, {});
        }
      }), o(this, "_samplingSessionListener", null), this.instance = t2, this._captureStarted = false, this._endpoint = "/s/", this.stopRrweb = void 0, this.receivedDecide = false, !this.instance.sessionManager)
        throw V.error(vi + " started without valid sessionManager"), new Error(vi + " started without valid sessionManager. This is a bug.");
      var r2 = this.sessionManager.checkAndGetSessionAndWindowId(), s2 = r2.sessionId, a2 = r2.windowId;
      this.sessionId = s2, this.windowId = a2, this.buffer = this.clearBuffer(), this._setupSampling();
    }
    return s(e5, [{ key: "rrwebRecord", get: function() {
      var e6;
      return null == U || null === (e6 = U.rrweb) || void 0 === e6 ? void 0 : e6.record;
    } }, { key: "started", get: function() {
      return this._captureStarted;
    } }, { key: "sessionManager", get: function() {
      if (!this.instance.sessionManager)
        throw new Error(vi + " must be started with a valid sessionManager.");
      return this.instance.sessionManager;
    } }, { key: "fullSnapshotIntervalMillis", get: function() {
      var e6;
      return (null === (e6 = this.instance.config.session_recording) || void 0 === e6 ? void 0 : e6.full_snapshot_interval_millis) || di;
    } }, { key: "isSampled", get: function() {
      var e6 = this.instance.get_property(Ie);
      return x(e6) ? e6 : null;
    } }, { key: "sessionDuration", get: function() {
      var e6, t2, n2 = null === (e6 = this.buffer) || void 0 === e6 ? void 0 : e6.data[(null === (t2 = this.buffer) || void 0 === t2 ? void 0 : t2.data.length) - 1], i2 = this.sessionManager.checkAndGetSessionAndWindowId(true).sessionStartTimestamp;
      return n2 ? n2.timestamp - i2 : null;
    } }, { key: "isRecordingEnabled", get: function() {
      var e6 = !!this.instance.get_property(me), t2 = !this.instance.config.disable_session_recording;
      return C && e6 && t2;
    } }, { key: "isConsoleLogCaptureEnabled", get: function() {
      var e6 = !!this.instance.get_property(ye), t2 = this.instance.config.enable_recording_console_log;
      return null != t2 ? t2 : e6;
    } }, { key: "canvasRecording", get: function() {
      var e6 = this.instance.get_property(ke);
      return e6 && e6.fps && e6.quality ? { enabled: e6.enabled, fps: e6.fps, quality: e6.quality } : void 0;
    } }, { key: "networkPayloadCapture", get: function() {
      var e6, t2, n2 = this.instance.get_property(be), i2 = { recordHeaders: null === (e6 = this.instance.config.session_recording) || void 0 === e6 ? void 0 : e6.recordHeaders, recordBody: null === (t2 = this.instance.config.session_recording) || void 0 === t2 ? void 0 : t2.recordBody }, r2 = (null == i2 ? void 0 : i2.recordHeaders) || (null == n2 ? void 0 : n2.recordHeaders), s2 = (null == i2 ? void 0 : i2.recordBody) || (null == n2 ? void 0 : n2.recordBody), o2 = b(this.instance.config.capture_performance) ? this.instance.config.capture_performance.network_timing : this.instance.config.capture_performance, a2 = !!(x(o2) ? o2 : null == n2 ? void 0 : n2.capturePerformance);
      return r2 || s2 || a2 ? { recordHeaders: r2, recordBody: s2, recordPerformance: a2 } : void 0;
    } }, { key: "sampleRate", get: function() {
      var e6 = this.instance.get_property(we);
      return F(e6) ? e6 : null;
    } }, { key: "minimumDuration", get: function() {
      var e6 = this.instance.get_property(Se);
      return F(e6) ? e6 : null;
    } }, { key: "status", get: function() {
      return this.receivedDecide ? this.isRecordingEnabled ? R(this._linkedFlag) || this._linkedFlagSeen ? x(this.isSampled) ? this.isSampled ? "sampled" : "disabled" : "active" : "buffering" : "disabled" : "buffering";
    } }, { key: "startIfEnabledOrStop", value: function() {
      var e6 = this;
      this.isRecordingEnabled ? (this._startCapture(), null == C || C.addEventListener("beforeunload", this._onBeforeUnload), null == C || C.addEventListener("offline", this._onOffline), null == C || C.addEventListener("online", this._onOnline), null == C || C.addEventListener("visibilitychange", this._onVisibilityChange), R(this._removePageViewCaptureHook) && (this._removePageViewCaptureHook = this.instance._addCaptureHook(function(t2) {
        try {
          if ("$pageview" === t2) {
            var n2 = C ? e6._maskUrl(C.location.href) : "";
            if (!n2)
              return;
            e6._tryAddCustomEvent("$pageview", { href: n2 });
          }
        } catch (e7) {
          V.error("Could not add $pageview to rrweb session", e7);
        }
      })), V.info(vi + " started")) : this.stopRecording();
    } }, { key: "stopRecording", value: function() {
      var e6;
      this._captureStarted && this.stopRrweb && (this.stopRrweb(), this.stopRrweb = void 0, this._captureStarted = false, null == C || C.removeEventListener("beforeunload", this._onBeforeUnload), null == C || C.removeEventListener("offline", this._onOffline), null == C || C.removeEventListener("online", this._onOnline), null == C || C.removeEventListener("visibilitychange", this._onVisibilityChange), this.clearBuffer(), clearInterval(this._fullSnapshotTimer), null === (e6 = this._removePageViewCaptureHook) || void 0 === e6 || e6.call(this), this._removePageViewCaptureHook = void 0, V.info(vi + " stopped"));
    } }, { key: "makeSamplingDecision", value: function(e6) {
      var t2, n2 = this.sessionId !== e6, i2 = this.sampleRate;
      if (F(i2)) {
        var r2, s2 = this.isSampled, a2 = n2 || !x(s2);
        if (a2)
          r2 = Math.random() < i2;
        else
          r2 = s2;
        !r2 && a2 && V.warn(vi + " Sample rate (".concat(i2, ") has determined that this sessionId (").concat(e6, ") will not be sent to the server.")), this._tryAddCustomEvent("samplingDecisionMade", { sampleRate: i2 }), null === (t2 = this.instance.persistence) || void 0 === t2 || t2.register(o({}, Ie, r2));
      } else {
        var u2;
        null === (u2 = this.instance.persistence) || void 0 === u2 || u2.register(o({}, Ie, null));
      }
    } }, { key: "afterDecideResponse", value: function(e6) {
      var t2, n2, i2, r2 = this;
      (this._persistDecideResponse(e6), this._linkedFlag = (null === (t2 = e6.sessionRecording) || void 0 === t2 ? void 0 : t2.linkedFlag) || null, null !== (n2 = e6.sessionRecording) && void 0 !== n2 && n2.endpoint) && (this._endpoint = null === (i2 = e6.sessionRecording) || void 0 === i2 ? void 0 : i2.endpoint);
      if (this._setupSampling(), !R(this._linkedFlag) && !this._linkedFlagSeen) {
        var s2 = S(this._linkedFlag) ? this._linkedFlag : this._linkedFlag.flag, o2 = S(this._linkedFlag) ? null : this._linkedFlag.variant;
        this.instance.onFeatureFlags(function(e7, t3) {
          var n3 = b(t3) && s2 in t3, i3 = o2 ? t3[s2] === o2 : n3;
          if (i3) {
            var a2 = { linkedFlag: s2, linkedVariant: o2 }, u2 = "linked flag matched";
            V.info(vi + " " + u2, a2), r2._tryAddCustomEvent(u2, a2);
          }
          r2._linkedFlagSeen = i3;
        });
      }
      this.receivedDecide = true, this.startIfEnabledOrStop();
    } }, { key: "_setupSampling", value: function() {
      var e6 = this;
      F(this.sampleRate) && I(this._samplingSessionListener) && (this._samplingSessionListener = this.sessionManager.onSessionId(function(t2) {
        e6.makeSamplingDecision(t2);
      }));
    } }, { key: "_persistDecideResponse", value: function(e6) {
      if (this.instance.persistence) {
        var n2 = this.instance.persistence, i2 = function() {
          var i3, r2, s2, a2, u2, l2, c2, d2, h2 = null === (i3 = e6.sessionRecording) || void 0 === i3 ? void 0 : i3.sampleRate, f2 = R(h2) ? null : parseFloat(h2), v2 = null === (r2 = e6.sessionRecording) || void 0 === r2 ? void 0 : r2.minimumDurationMilliseconds;
          n2.register((o(d2 = {}, me, !!e6.sessionRecording), o(d2, ye, null === (s2 = e6.sessionRecording) || void 0 === s2 ? void 0 : s2.consoleLogRecordingEnabled), o(d2, be, t({ capturePerformance: e6.capturePerformance }, null === (a2 = e6.sessionRecording) || void 0 === a2 ? void 0 : a2.networkPayloadCapture)), o(d2, ke, { enabled: null === (u2 = e6.sessionRecording) || void 0 === u2 ? void 0 : u2.recordCanvas, fps: null === (l2 = e6.sessionRecording) || void 0 === l2 ? void 0 : l2.canvasFps, quality: null === (c2 = e6.sessionRecording) || void 0 === c2 ? void 0 : c2.canvasQuality }), o(d2, we, f2), o(d2, Se, w(v2) ? null : v2), d2));
        };
        i2(), this.sessionManager.onSessionId(i2);
      }
    } }, { key: "log", value: function(e6) {
      var t2, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "log";
      null === (t2 = this.instance.sessionRecording) || void 0 === t2 || t2.onRRwebEmit({ type: 6, data: { plugin: "rrweb/console@1", payload: { level: n2, trace: [], payload: [JSON.stringify(e6)] } }, timestamp: K() });
    } }, { key: "_startCapture", value: function() {
      var e6 = this;
      w(Object.assign) || this._captureStarted || this.instance.config.disable_session_recording || this.instance.consent.isOptedOut() || (this._captureStarted = true, this.sessionManager.checkAndGetSessionAndWindowId(), this.rrwebRecord ? this._onScriptLoaded() : this.instance.requestRouter.loadScript("/static/recorder.js?v=".concat(f.LIB_VERSION), function(t2) {
        if (t2)
          return V.error(vi + " could not load recorder.js", t2);
        e6._onScriptLoaded();
      }));
    } }, { key: "isInteractiveEvent", value: function(e6) {
      var t2;
      return 3 === e6.type && -1 !== hi.indexOf(null === (t2 = e6.data) || void 0 === t2 ? void 0 : t2.source);
    } }, { key: "_updateWindowAndSessionIds", value: function(e6) {
      var t2 = this.isInteractiveEvent(e6);
      t2 || this.isIdle || e6.timestamp - this._lastActivityTimestamp > 3e5 && (this.isIdle = true, clearInterval(this._fullSnapshotTimer), this._flushBuffer());
      var n2 = false;
      if (t2 && (this._lastActivityTimestamp = e6.timestamp, this.isIdle && (this.isIdle = false, this._tryAddCustomEvent("sessionNoLongerIdle", { reason: "user activity", type: e6.type }), n2 = true)), !this.isIdle) {
        var i2 = this.sessionManager.checkAndGetSessionAndWindowId(!t2, e6.timestamp), r2 = i2.windowId, s2 = i2.sessionId, o2 = this.sessionId !== s2, a2 = this.windowId !== r2;
        this.windowId = r2, this.sessionId = s2, (n2 || -1 === [Sn, En].indexOf(e6.type) && (a2 || o2 || w(this._fullSnapshotTimer))) && this._tryTakeFullSnapshot();
      }
    } }, { key: "_tryRRWebMethod", value: function(e6) {
      try {
        return e6.rrwebMethod(), true;
      } catch (t2) {
        return this.queuedRRWebEvents.length < 10 ? this.queuedRRWebEvents.push({ enqueuedAt: e6.enqueuedAt || Date.now(), attempt: e6.attempt++, rrwebMethod: e6.rrwebMethod }) : V.warn(vi + " could not emit queued rrweb event.", t2, e6), false;
      }
    } }, { key: "_tryAddCustomEvent", value: function(e6, t2) {
      var n2 = this;
      return this._tryRRWebMethod(fi(function() {
        return n2.rrwebRecord.addCustomEvent(e6, t2);
      }));
    } }, { key: "_tryTakeFullSnapshot", value: function() {
      var e6 = this;
      return this._tryRRWebMethod(fi(function() {
        return e6.rrwebRecord.takeFullSnapshot();
      }));
    } }, { key: "_onScriptLoaded", value: function() {
      for (var e6, n2 = this, i2 = { blockClass: "ph-no-capture", blockSelector: void 0, ignoreClass: "ph-ignore-input", maskTextClass: "ph-mask", maskTextSelector: void 0, maskTextFn: void 0, maskAllInputs: true, maskInputOptions: { password: true }, maskInputFn: void 0, slimDOMOptions: {}, collectFonts: false, inlineStylesheet: true, recordCrossOriginIframes: false }, r2 = this.instance.config.session_recording, s2 = 0, o2 = Object.entries(r2 || {}); s2 < o2.length; s2++) {
        var a2 = u(o2[s2], 2), l2 = a2[0], c2 = a2[1];
        l2 in i2 && ("maskInputOptions" === l2 ? i2.maskInputOptions = t({ password: true }, c2) : i2[l2] = c2);
      }
      if (this.canvasRecording && this.canvasRecording.enabled && (i2.recordCanvas = true, i2.sampling = { canvas: this.canvasRecording.fps }, i2.dataURLOptions = { type: "image/webp", quality: this.canvasRecording.quality }), this.rrwebRecord) {
        this.mutationRateLimiter = null !== (e6 = this.mutationRateLimiter) && void 0 !== e6 ? e6 : new ci(this.rrwebRecord, { onBlockedNode: function(e7, t2) {
          var i3 = "Too many mutations on node '".concat(e7, "'. Rate limiting. This could be due to SVG animations or something similar");
          V.info(i3, { node: t2 }), n2.log(vi + " " + i3, "warn");
        } });
        var d2 = this._gatherRRWebPlugins();
        this.stopRrweb = this.rrwebRecord(t({ emit: function(e7) {
          n2.onRRwebEmit(e7);
        }, plugins: d2 }, i2)), this._lastActivityTimestamp = Date.now(), this.isIdle = false, this._tryAddCustomEvent("$session_options", { sessionRecordingOptions: i2, activePlugins: d2.map(function(e7) {
          return null == e7 ? void 0 : e7.name;
        }) }), this._tryAddCustomEvent("$posthog_config", { config: this.instance.config });
      } else
        V.error(vi + "onScriptLoaded was called but rrwebRecord is not available. This indicates something has gone wrong.");
    } }, { key: "_scheduleFullSnapshot", value: function() {
      var e6 = this;
      if (this._fullSnapshotTimer && clearInterval(this._fullSnapshotTimer), !this.isIdle) {
        var t2 = this.fullSnapshotIntervalMillis;
        t2 && (this._fullSnapshotTimer = setInterval(function() {
          e6._tryTakeFullSnapshot();
        }, t2));
      }
    } }, { key: "_gatherRRWebPlugins", value: function() {
      var e6 = [];
      (U.rrwebConsoleRecord && this.isConsoleLogCaptureEnabled && e6.push(U.rrwebConsoleRecord.getRecordConsolePlugin()), this.networkPayloadCapture && y(U.getRecordNetworkPlugin)) && (!pt.includes(location.hostname) || this._forceAllowLocalhostNetworkCapture ? e6.push(U.getRecordNetworkPlugin(li(this.instance.config, this.networkPayloadCapture))) : V.info(vi + " NetworkCapture not started because we are on localhost."));
      return e6;
    } }, { key: "onRRwebEmit", value: function(e6) {
      if (this._processQueuedEvents(), e6 && b(e6)) {
        if (e6.type === Rn.Meta) {
          var t2 = this._maskUrl(e6.data.href);
          if (this._lastHref = t2, !t2)
            return;
          e6.data.href = t2;
        } else
          this._pageViewFallBack();
        e6.type === Rn.FullSnapshot && this._scheduleFullSnapshot();
        var n2 = this.mutationRateLimiter ? this.mutationRateLimiter.throttleMutations(e6) : e6;
        if (n2) {
          var i2 = function(e7) {
            var t3 = e7;
            if (t3 && b(t3) && 6 === t3.type && b(t3.data) && "rrweb/console@1" === t3.data.plugin) {
              t3.data.payload.payload.length > 10 && (t3.data.payload.payload = t3.data.payload.payload.slice(0, 10), t3.data.payload.payload.push("...[truncated]"));
              for (var n3 = [], i3 = 0; i3 < t3.data.payload.payload.length; i3++)
                t3.data.payload.payload[i3] && t3.data.payload.payload[i3].length > 2e3 ? n3.push(t3.data.payload.payload[i3].slice(0, 2e3) + "...[truncated]") : n3.push(t3.data.payload.payload[i3]);
              return t3.data.payload.payload = n3, e7;
            }
            return e7;
          }(n2), r2 = wn(i2);
          if (this._updateWindowAndSessionIds(i2), !this.isIdle || i2.type === Rn.Custom) {
            var s2 = { $snapshot_bytes: r2, $snapshot_data: i2, $session_id: this.sessionId, $window_id: this.windowId };
            "disabled" !== this.status ? this._captureSnapshotBuffered(s2) : this.clearBuffer();
          }
        }
      }
    } }, { key: "_pageViewFallBack", value: function() {
      if (!this.instance.config.capture_pageview && C) {
        var e6 = this._maskUrl(C.location.href);
        this._lastHref !== e6 && (this._tryAddCustomEvent("$url_changed", { href: e6 }), this._lastHref = e6);
      }
    } }, { key: "_processQueuedEvents", value: function() {
      var e6 = this;
      if (this.queuedRRWebEvents.length) {
        var t2 = l(this.queuedRRWebEvents);
        this.queuedRRWebEvents = [], t2.forEach(function(t3) {
          Date.now() - t3.enqueuedAt <= 2e3 && e6._tryRRWebMethod(t3);
        });
      }
    } }, { key: "_maskUrl", value: function(e6) {
      var t2 = this.instance.config.session_recording;
      if (t2.maskNetworkRequestFn) {
        var n2, i2 = { url: e6 };
        return null === (n2 = i2 = t2.maskNetworkRequestFn(i2)) || void 0 === n2 ? void 0 : n2.url;
      }
      return e6;
    } }, { key: "clearBuffer", value: function() {
      return this.buffer = { size: 0, data: [], sessionId: this.sessionId, windowId: this.windowId }, this.buffer;
    } }, { key: "_flushBuffer", value: function() {
      var e6 = this;
      this.flushBufferTimer && (clearTimeout(this.flushBufferTimer), this.flushBufferTimer = void 0);
      var t2 = this.minimumDuration, n2 = this.sessionDuration, i2 = F(n2) && n2 >= 0, r2 = F(t2) && i2 && n2 < t2;
      if ("buffering" === this.status || r2)
        return this.flushBufferTimer = setTimeout(function() {
          e6._flushBuffer();
        }, 2e3), this.buffer;
      this.buffer.data.length > 0 && In(this.buffer).forEach(function(t3) {
        e6._captureSnapshot({ $snapshot_bytes: t3.size, $snapshot_data: t3.data, $session_id: t3.sessionId, $window_id: t3.windowId });
      });
      return this.clearBuffer();
    } }, { key: "_captureSnapshotBuffered", value: function(e6) {
      var t2, n2 = this, i2 = 2 + ((null === (t2 = this.buffer) || void 0 === t2 ? void 0 : t2.data.length) || 0);
      !this.isIdle && (this.buffer.size + e6.$snapshot_bytes + i2 > 943718.4 || this.buffer.sessionId !== this.sessionId) && (this.buffer = this._flushBuffer()), this.buffer.size += e6.$snapshot_bytes, this.buffer.data.push(e6.$snapshot_data), this.flushBufferTimer || this.isIdle || (this.flushBufferTimer = setTimeout(function() {
        n2._flushBuffer();
      }, 2e3));
    } }, { key: "_captureSnapshot", value: function(e6) {
      this.instance.capture("$snapshot", e6, { _url: this.instance.requestRouter.endpointFor("api", this._endpoint), _noTruncate: true, _batchKey: "recordings", skip_client_rate_limiting: true });
    } }, { key: "overrideLinkedFlag", value: function() {
      this._linkedFlagSeen = true;
    } }]), e5;
  }();
  var gi = function() {
    function e5(t2) {
      i(this, e5), this.instance = t2, this.instance.decideEndpointWasHit = this.instance._hasBootstrappedFeatureFlags();
    }
    return s(e5, [{ key: "call", value: function() {
      var e6 = this, t2 = { token: this.instance.config.token, distinct_id: this.instance.get_distinct_id(), groups: this.instance.getGroups(), person_properties: this.instance.get_property(xe), group_properties: this.instance.get_property(Pe), disable_flags: this.instance.config.advanced_disable_feature_flags || this.instance.config.advanced_disable_feature_flags_on_first_load || void 0 };
      this.instance._send_request({ method: "POST", url: this.instance.requestRouter.endpointFor("api", "/decide/?v=3"), data: t2, compression: this.instance.config.disable_compression ? void 0 : re.Base64, timeout: this.instance.config.feature_flag_request_timeout_ms, callback: function(t3) {
        return e6.parseDecideResponse(t3.json);
      } });
    } }, { key: "parseDecideResponse", value: function(e6) {
      var t2 = this;
      this.instance.featureFlags.setReloadingPaused(false), this.instance.featureFlags._startReloadTimer();
      var n2 = !e6;
      if (this.instance.config.advanced_disable_feature_flags_on_first_load || this.instance.config.advanced_disable_feature_flags || this.instance.featureFlags.receivedFeatureFlags(null != e6 ? e6 : {}, n2), n2)
        V.error("Failed to fetch feature flags from PostHog.");
      else {
        if (!L || !L.body)
          return V.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(function() {
            t2.parseDecideResponse(e6);
          }, 500);
        if (this.instance._afterDecideResponse(e6), e6.siteApps)
          if (this.instance.config.opt_in_site_apps) {
            var i2, r2 = h(e6.siteApps);
            try {
              var s2 = function() {
                var e7 = i2.value, n3 = e7.id, r3 = e7.url, s3 = t2.instance.requestRouter.endpointFor("api", r3);
                U["__$$ph_site_app_".concat(n3)] = t2.instance, t2.instance.requestRouter.loadScript(s3, function(e8) {
                  if (e8)
                    return V.error("Error while initializing PostHog app with config id ".concat(n3), e8);
                });
              };
              for (r2.s(); !(i2 = r2.n()).done; )
                s2();
            } catch (e7) {
              r2.e(e7);
            } finally {
              r2.f();
            }
          } else
            e6.siteApps.length > 0 && V.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
      }
    } }]), e5;
  }();
  var _i = null != C && C.location ? bt(C.location.hash, "__posthog") || bt(location.hash, "state") : null;
  var mi = "_postHogToolbarParams";
  !function(e5) {
    e5[e5.UNINITIALIZED = 0] = "UNINITIALIZED", e5[e5.LOADING = 1] = "LOADING", e5[e5.LOADED = 2] = "LOADED";
  }(ui || (ui = {}));
  var yi = function() {
    function e5(t2) {
      i(this, e5), this.instance = t2;
    }
    return s(e5, [{ key: "setToolbarState", value: function(e6) {
      U.ph_toolbar_state = e6;
    } }, { key: "getToolbarState", value: function() {
      var e6;
      return null !== (e6 = U.ph_toolbar_state) && void 0 !== e6 ? e6 : ui.UNINITIALIZED;
    } }, { key: "maybeLoadToolbar", value: function() {
      var e6, t2, n2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
      if (!C || !L)
        return false;
      n2 = null !== (e6 = n2) && void 0 !== e6 ? e6 : C.location, r2 = null !== (t2 = r2) && void 0 !== t2 ? t2 : C.history;
      try {
        if (!i2) {
          try {
            C.localStorage.setItem("test", "test"), C.localStorage.removeItem("test");
          } catch (e7) {
            return false;
          }
          i2 = null == C ? void 0 : C.localStorage;
        }
        var s2, o2 = _i || bt(n2.hash, "__posthog") || bt(n2.hash, "state"), a2 = o2 ? Z(function() {
          return JSON.parse(atob(decodeURIComponent(o2)));
        }) || Z(function() {
          return JSON.parse(decodeURIComponent(o2));
        }) : null;
        return a2 && "ph_authorize" === a2.action ? ((s2 = a2).source = "url", s2 && Object.keys(s2).length > 0 && (a2.desiredHash ? n2.hash = a2.desiredHash : r2 ? r2.replaceState(r2.state, "", n2.pathname + n2.search) : n2.hash = "")) : ((s2 = JSON.parse(i2.getItem(mi) || "{}")).source = "localstorage", delete s2.userIntent), !(!s2.token || this.instance.config.token !== s2.token) && (this.loadToolbar(s2), true);
      } catch (e7) {
        return false;
      }
    } }, { key: "_callLoadToolbar", value: function(e6) {
      (U.ph_load_toolbar || U.ph_load_editor)(e6, this.instance);
    } }, { key: "loadToolbar", value: function(e6) {
      var n2 = this, i2 = !(null == L || !L.getElementById(Be));
      if (!C || i2)
        return false;
      var r2 = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, s2 = t(t({ token: this.instance.config.token }, e6), {}, { apiURL: this.instance.requestRouter.endpointFor("ui") }, r2 ? { instrument: false } : {});
      if (C.localStorage.setItem(mi, JSON.stringify(t(t({}, s2), {}, { source: void 0 }))), this.getToolbarState() === ui.LOADED)
        this._callLoadToolbar(s2);
      else if (this.getToolbarState() === ui.UNINITIALIZED) {
        this.setToolbarState(ui.LOADING);
        var o2 = 3e5, a2 = Math.floor(Date.now() / o2) * o2;
        this.instance.requestRouter.loadScript("/static/toolbar.js?t=".concat(a2), function(e7) {
          if (e7)
            return V.error("Failed to load toolbar", e7), void n2.setToolbarState(ui.UNINITIALIZED);
          n2.setToolbarState(ui.LOADED), n2._callLoadToolbar(s2);
        }), oe(C, "turbolinks:load", function() {
          n2.setToolbarState(ui.UNINITIALIZED), n2.loadToolbar(s2);
        });
      }
      return true;
    } }, { key: "_loadEditor", value: function(e6) {
      return this.loadToolbar(e6);
    } }, { key: "maybeLoadEditor", value: function() {
      var e6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
      return this.maybeLoadToolbar(e6, t2, n2);
    } }]), e5;
  }();
  var bi = function() {
    function e5(t2) {
      i(this, e5), o(this, "isPaused", true), o(this, "queue", []), o(this, "flushTimeoutMs", 3e3), this.sendRequest = t2;
    }
    return s(e5, [{ key: "enqueue", value: function(e6) {
      this.queue.push(e6), this.flushTimeout || this.setFlushTimeout();
    } }, { key: "unload", value: function() {
      var e6 = this;
      this.clearFlushTimeout();
      var n2 = this.queue.length > 0 ? this.formatQueue() : {}, i2 = Object.values(n2);
      [].concat(l(i2.filter(function(e7) {
        return 0 === e7.url.indexOf("/e");
      })), l(i2.filter(function(e7) {
        return 0 !== e7.url.indexOf("/e");
      }))).map(function(n3) {
        e6.sendRequest(t(t({}, n3), {}, { transport: "sendBeacon" }));
      });
    } }, { key: "enable", value: function() {
      this.isPaused = false, this.setFlushTimeout();
    } }, { key: "setFlushTimeout", value: function() {
      var e6 = this;
      this.isPaused || (this.flushTimeout = setTimeout(function() {
        if (e6.clearFlushTimeout(), e6.queue.length > 0) {
          var t2 = e6.formatQueue(), n2 = function(n3) {
            var i3 = t2[n3], r2 = new Date().getTime();
            i3.data && m(i3.data) && Q(i3.data, function(e7) {
              e7.offset = Math.abs(e7.timestamp - r2), delete e7.timestamp;
            }), e6.sendRequest(i3);
          };
          for (var i2 in t2)
            n2(i2);
        }
      }, this.flushTimeoutMs));
    } }, { key: "clearFlushTimeout", value: function() {
      clearTimeout(this.flushTimeout), this.flushTimeout = void 0;
    } }, { key: "formatQueue", value: function() {
      var e6 = {};
      return Q(this.queue, function(n2) {
        var i2, r2 = n2, s2 = (r2 ? r2.batchKey : null) || r2.url;
        w(e6[s2]) && (e6[s2] = t(t({}, r2), {}, { data: [] })), null === (i2 = e6[s2].data) || void 0 === i2 || i2.push(r2.data);
      }), this.queue = [], e6;
    } }]), e5;
  }();
  var ki = Uint8Array;
  var wi = Uint16Array;
  var Si = Uint32Array;
  var Ei = new ki([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
  var Ii = new ki([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
  var Ri = new ki([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var Fi = function(e5, t2) {
    for (var n2 = new wi(31), i2 = 0; i2 < 31; ++i2)
      n2[i2] = t2 += 1 << e5[i2 - 1];
    var r2 = new Si(n2[30]);
    for (i2 = 1; i2 < 30; ++i2)
      for (var s2 = n2[i2]; s2 < n2[i2 + 1]; ++s2)
        r2[s2] = s2 - n2[i2] << 5 | i2;
    return [n2, r2];
  };
  var xi = Fi(Ei, 2);
  var Pi = xi[0];
  var Ci = xi[1];
  Pi[28] = 258, Ci[258] = 28;
  for (Ti = Fi(Ii, 0)[1], $i = new wi(32768), Oi = 0; Oi < 32768; ++Oi) {
    Mi = (43690 & Oi) >>> 1 | (21845 & Oi) << 1;
    Mi = (61680 & (Mi = (52428 & Mi) >>> 2 | (13107 & Mi) << 2)) >>> 4 | (3855 & Mi) << 4, $i[Oi] = ((65280 & Mi) >>> 8 | (255 & Mi) << 8) >>> 1;
  }
  var Mi;
  var Ti;
  var $i;
  var Oi;
  var Ai = function(e5, t2, n2) {
    for (var i2 = e5.length, r2 = 0, s2 = new wi(t2); r2 < i2; ++r2)
      ++s2[e5[r2] - 1];
    var o2, a2 = new wi(t2);
    for (r2 = 0; r2 < t2; ++r2)
      a2[r2] = a2[r2 - 1] + s2[r2 - 1] << 1;
    if (n2) {
      o2 = new wi(1 << t2);
      var u2 = 15 - t2;
      for (r2 = 0; r2 < i2; ++r2)
        if (e5[r2])
          for (var l2 = r2 << 4 | e5[r2], c2 = t2 - e5[r2], d2 = a2[e5[r2] - 1]++ << c2, h2 = d2 | (1 << c2) - 1; d2 <= h2; ++d2)
            o2[$i[d2] >>> u2] = l2;
    } else
      for (o2 = new wi(i2), r2 = 0; r2 < i2; ++r2)
        o2[r2] = $i[a2[e5[r2] - 1]++] >>> 15 - e5[r2];
    return o2;
  };
  var Li = new ki(288);
  for (Oi = 0; Oi < 144; ++Oi)
    Li[Oi] = 8;
  for (Oi = 144; Oi < 256; ++Oi)
    Li[Oi] = 9;
  for (Oi = 256; Oi < 280; ++Oi)
    Li[Oi] = 7;
  for (Oi = 280; Oi < 288; ++Oi)
    Li[Oi] = 8;
  var Di = new ki(32);
  for (Oi = 0; Oi < 32; ++Oi)
    Di[Oi] = 5;
  var Ni = Ai(Li, 9, 0);
  var qi = Ai(Di, 5, 0);
  var Bi = function(e5) {
    return (e5 / 8 >> 0) + (7 & e5 && 1);
  };
  var Hi = function(e5, t2, n2) {
    (null == t2 || t2 < 0) && (t2 = 0), (null == n2 || n2 > e5.length) && (n2 = e5.length);
    var i2 = new (e5 instanceof wi ? wi : e5 instanceof Si ? Si : ki)(n2 - t2);
    return i2.set(e5.subarray(t2, n2)), i2;
  };
  var Ui = function(e5, t2, n2) {
    n2 <<= 7 & t2;
    var i2 = t2 / 8 >> 0;
    e5[i2] |= n2, e5[i2 + 1] |= n2 >>> 8;
  };
  var ji = function(e5, t2, n2) {
    n2 <<= 7 & t2;
    var i2 = t2 / 8 >> 0;
    e5[i2] |= n2, e5[i2 + 1] |= n2 >>> 8, e5[i2 + 2] |= n2 >>> 16;
  };
  var Vi = function(e5, t2) {
    for (var n2 = [], i2 = 0; i2 < e5.length; ++i2)
      e5[i2] && n2.push({ s: i2, f: e5[i2] });
    var r2 = n2.length, s2 = n2.slice();
    if (!r2)
      return [new ki(0), 0];
    if (1 == r2) {
      var o2 = new ki(n2[0].s + 1);
      return o2[n2[0].s] = 1, [o2, 1];
    }
    n2.sort(function(e6, t3) {
      return e6.f - t3.f;
    }), n2.push({ s: -1, f: 25001 });
    var a2 = n2[0], u2 = n2[1], l2 = 0, c2 = 1, d2 = 2;
    for (n2[0] = { s: -1, f: a2.f + u2.f, l: a2, r: u2 }; c2 != r2 - 1; )
      a2 = n2[n2[l2].f < n2[d2].f ? l2++ : d2++], u2 = n2[l2 != c2 && n2[l2].f < n2[d2].f ? l2++ : d2++], n2[c2++] = { s: -1, f: a2.f + u2.f, l: a2, r: u2 };
    var h2 = s2[0].s;
    for (i2 = 1; i2 < r2; ++i2)
      s2[i2].s > h2 && (h2 = s2[i2].s);
    var f2 = new wi(h2 + 1), v2 = Gi(n2[c2 - 1], f2, 0);
    if (v2 > t2) {
      i2 = 0;
      var p2 = 0, g2 = v2 - t2, _2 = 1 << g2;
      for (s2.sort(function(e6, t3) {
        return f2[t3.s] - f2[e6.s] || e6.f - t3.f;
      }); i2 < r2; ++i2) {
        var m2 = s2[i2].s;
        if (!(f2[m2] > t2))
          break;
        p2 += _2 - (1 << v2 - f2[m2]), f2[m2] = t2;
      }
      for (p2 >>>= g2; p2 > 0; ) {
        var y2 = s2[i2].s;
        f2[y2] < t2 ? p2 -= 1 << t2 - f2[y2]++ - 1 : ++i2;
      }
      for (; i2 >= 0 && p2; --i2) {
        var b2 = s2[i2].s;
        f2[b2] == t2 && (--f2[b2], ++p2);
      }
      v2 = t2;
    }
    return [new ki(f2), v2];
  };
  var Gi = function e3(t2, n2, i2) {
    return -1 == t2.s ? Math.max(e3(t2.l, n2, i2 + 1), e3(t2.r, n2, i2 + 1)) : n2[t2.s] = i2;
  };
  var Wi = function(e5) {
    for (var t2 = e5.length; t2 && !e5[--t2]; )
      ;
    for (var n2 = new wi(++t2), i2 = 0, r2 = e5[0], s2 = 1, o2 = function(e6) {
      n2[i2++] = e6;
    }, a2 = 1; a2 <= t2; ++a2)
      if (e5[a2] == r2 && a2 != t2)
        ++s2;
      else {
        if (!r2 && s2 > 2) {
          for (; s2 > 138; s2 -= 138)
            o2(32754);
          s2 > 2 && (o2(s2 > 10 ? s2 - 11 << 5 | 28690 : s2 - 3 << 5 | 12305), s2 = 0);
        } else if (s2 > 3) {
          for (o2(r2), --s2; s2 > 6; s2 -= 6)
            o2(8304);
          s2 > 2 && (o2(s2 - 3 << 5 | 8208), s2 = 0);
        }
        for (; s2--; )
          o2(r2);
        s2 = 1, r2 = e5[a2];
      }
    return [n2.subarray(0, i2), t2];
  };
  var zi = function(e5, t2) {
    for (var n2 = 0, i2 = 0; i2 < t2.length; ++i2)
      n2 += e5[i2] * t2[i2];
    return n2;
  };
  var Qi = function(e5, t2, n2) {
    var i2 = n2.length, r2 = Bi(t2 + 2);
    e5[r2] = 255 & i2, e5[r2 + 1] = i2 >>> 8, e5[r2 + 2] = 255 ^ e5[r2], e5[r2 + 3] = 255 ^ e5[r2 + 1];
    for (var s2 = 0; s2 < i2; ++s2)
      e5[r2 + s2 + 4] = n2[s2];
    return 8 * (r2 + 4 + i2);
  };
  var Ji = function(e5, t2, n2, i2, r2, s2, o2, a2, u2, l2, c2) {
    Ui(t2, c2++, n2), ++r2[256];
    for (var d2 = Vi(r2, 15), h2 = d2[0], f2 = d2[1], v2 = Vi(s2, 15), p2 = v2[0], g2 = v2[1], _2 = Wi(h2), m2 = _2[0], y2 = _2[1], b2 = Wi(p2), k2 = b2[0], w2 = b2[1], S2 = new wi(19), E2 = 0; E2 < m2.length; ++E2)
      S2[31 & m2[E2]]++;
    for (E2 = 0; E2 < k2.length; ++E2)
      S2[31 & k2[E2]]++;
    for (var I2 = Vi(S2, 7), R2 = I2[0], F2 = I2[1], x2 = 19; x2 > 4 && !R2[Ri[x2 - 1]]; --x2)
      ;
    var P2, C2, T2, $2, O2 = l2 + 5 << 3, M2 = zi(r2, Li) + zi(s2, Di) + o2, A2 = zi(r2, h2) + zi(s2, p2) + o2 + 14 + 3 * x2 + zi(S2, R2) + (2 * S2[16] + 3 * S2[17] + 7 * S2[18]);
    if (O2 <= M2 && O2 <= A2)
      return Qi(t2, c2, e5.subarray(u2, u2 + l2));
    if (Ui(t2, c2, 1 + (A2 < M2)), c2 += 2, A2 < M2) {
      P2 = Ai(h2, f2, 0), C2 = h2, T2 = Ai(p2, g2, 0), $2 = p2;
      var L2 = Ai(R2, F2, 0);
      Ui(t2, c2, y2 - 257), Ui(t2, c2 + 5, w2 - 1), Ui(t2, c2 + 10, x2 - 4), c2 += 14;
      for (E2 = 0; E2 < x2; ++E2)
        Ui(t2, c2 + 3 * E2, R2[Ri[E2]]);
      c2 += 3 * x2;
      for (var D2 = [m2, k2], N2 = 0; N2 < 2; ++N2) {
        var q2 = D2[N2];
        for (E2 = 0; E2 < q2.length; ++E2) {
          var B2 = 31 & q2[E2];
          Ui(t2, c2, L2[B2]), c2 += R2[B2], B2 > 15 && (Ui(t2, c2, q2[E2] >>> 5 & 127), c2 += q2[E2] >>> 12);
        }
      }
    } else
      P2 = Ni, C2 = Li, T2 = qi, $2 = Di;
    for (E2 = 0; E2 < a2; ++E2)
      if (i2[E2] > 255) {
        B2 = i2[E2] >>> 18 & 31;
        ji(t2, c2, P2[B2 + 257]), c2 += C2[B2 + 257], B2 > 7 && (Ui(t2, c2, i2[E2] >>> 23 & 31), c2 += Ei[B2]);
        var H2 = 31 & i2[E2];
        ji(t2, c2, T2[H2]), c2 += $2[H2], H2 > 3 && (ji(t2, c2, i2[E2] >>> 5 & 8191), c2 += Ii[H2]);
      } else
        ji(t2, c2, P2[i2[E2]]), c2 += C2[i2[E2]];
    return ji(t2, c2, P2[256]), c2 + C2[256];
  };
  var Yi = new Si([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  var Xi = new ki(0);
  var Ki = function() {
    for (var e5 = new Si(256), t2 = 0; t2 < 256; ++t2) {
      for (var n2 = t2, i2 = 9; --i2; )
        n2 = (1 & n2 && 3988292384) ^ n2 >>> 1;
      e5[t2] = n2;
    }
    return e5;
  }();
  var Zi = function(e5, t2, n2, i2, r2) {
    return function(e6, t3, n3, i3, r3, s2) {
      var o2 = e6.length, a2 = new ki(i3 + o2 + 5 * (1 + Math.floor(o2 / 7e3)) + r3), u2 = a2.subarray(i3, a2.length - r3), l2 = 0;
      if (!t3 || o2 < 8)
        for (var c2 = 0; c2 <= o2; c2 += 65535) {
          var d2 = c2 + 65535;
          d2 < o2 ? l2 = Qi(u2, l2, e6.subarray(c2, d2)) : (u2[c2] = s2, l2 = Qi(u2, l2, e6.subarray(c2, o2)));
        }
      else {
        for (var h2 = Yi[t3 - 1], f2 = h2 >>> 13, v2 = 8191 & h2, p2 = (1 << n3) - 1, g2 = new wi(32768), _2 = new wi(p2 + 1), m2 = Math.ceil(n3 / 3), y2 = 2 * m2, b2 = function(t4) {
          return (e6[t4] ^ e6[t4 + 1] << m2 ^ e6[t4 + 2] << y2) & p2;
        }, k2 = new Si(25e3), w2 = new wi(288), S2 = new wi(32), E2 = 0, I2 = 0, R2 = (c2 = 0, 0), F2 = 0, x2 = 0; c2 < o2; ++c2) {
          var P2 = b2(c2), C2 = 32767 & c2, T2 = _2[P2];
          if (g2[C2] = T2, _2[P2] = C2, F2 <= c2) {
            var $2 = o2 - c2;
            if ((E2 > 7e3 || R2 > 24576) && $2 > 423) {
              l2 = Ji(e6, u2, 0, k2, w2, S2, I2, R2, x2, c2 - x2, l2), R2 = E2 = I2 = 0, x2 = c2;
              for (var O2 = 0; O2 < 286; ++O2)
                w2[O2] = 0;
              for (O2 = 0; O2 < 30; ++O2)
                S2[O2] = 0;
            }
            var M2 = 2, A2 = 0, L2 = v2, D2 = C2 - T2 & 32767;
            if ($2 > 2 && P2 == b2(c2 - D2))
              for (var N2 = Math.min(f2, $2) - 1, q2 = Math.min(32767, c2), B2 = Math.min(258, $2); D2 <= q2 && --L2 && C2 != T2; ) {
                if (e6[c2 + M2] == e6[c2 + M2 - D2]) {
                  for (var H2 = 0; H2 < B2 && e6[c2 + H2] == e6[c2 + H2 - D2]; ++H2)
                    ;
                  if (H2 > M2) {
                    if (M2 = H2, A2 = D2, H2 > N2)
                      break;
                    var U2 = Math.min(D2, H2 - 2), j2 = 0;
                    for (O2 = 0; O2 < U2; ++O2) {
                      var V2 = c2 - D2 + O2 + 32768 & 32767, G2 = V2 - g2[V2] + 32768 & 32767;
                      G2 > j2 && (j2 = G2, T2 = V2);
                    }
                  }
                }
                D2 += (C2 = T2) - (T2 = g2[C2]) + 32768 & 32767;
              }
            if (A2) {
              k2[R2++] = 268435456 | Ci[M2] << 18 | Ti[A2];
              var W2 = 31 & Ci[M2], z2 = 31 & Ti[A2];
              I2 += Ei[W2] + Ii[z2], ++w2[257 + W2], ++S2[z2], F2 = c2 + M2, ++E2;
            } else
              k2[R2++] = e6[c2], ++w2[e6[c2]];
          }
        }
        l2 = Ji(e6, u2, s2, k2, w2, S2, I2, R2, x2, c2 - x2, l2), s2 || (l2 = Qi(u2, l2, Xi));
      }
      return Hi(a2, 0, i3 + Bi(l2) + r3);
    }(e5, null == t2.level ? 6 : t2.level, null == t2.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e5.length)))) : 12 + t2.mem, n2, i2, !r2);
  };
  var er = function(e5, t2, n2) {
    for (; n2; ++t2)
      e5[t2] = n2, n2 >>>= 8;
  };
  function tr(e5, t2) {
    void 0 === t2 && (t2 = {});
    var n2 = function() {
      var e6 = 4294967295;
      return { p: function(t3) {
        for (var n3 = e6, i3 = 0; i3 < t3.length; ++i3)
          n3 = Ki[255 & n3 ^ t3[i3]] ^ n3 >>> 8;
        e6 = n3;
      }, d: function() {
        return 4294967295 ^ e6;
      } };
    }(), i2 = e5.length;
    n2.p(e5);
    var r2, s2 = Zi(e5, t2, 10 + ((r2 = t2).filename && r2.filename.length + 1 || 0), 8), o2 = s2.length;
    return function(e6, t3) {
      var n3 = t3.filename;
      if (e6[0] = 31, e6[1] = 139, e6[2] = 8, e6[8] = t3.level < 2 ? 4 : 9 == t3.level ? 2 : 0, e6[9] = 3, 0 != t3.mtime && er(e6, 4, Math.floor(new Date(t3.mtime || Date.now()) / 1e3)), n3) {
        e6[3] = 8;
        for (var i3 = 0; i3 <= n3.length; ++i3)
          e6[i3 + 10] = n3.charCodeAt(i3);
      }
    }(s2, t2), er(s2, o2 - 8, n2.d()), er(s2, o2 - 4, i2), s2;
  }
  var nr = !!q || !!N;
  var ir = "text/plain";
  var rr = function(e5, n2) {
    var i2 = u(e5.split("?"), 2), r2 = i2[0], s2 = i2[1], o2 = t({}, n2);
    null == s2 || s2.split("&").forEach(function(e6) {
      var t2 = u(e6.split("="), 1)[0];
      delete o2[t2];
    });
    var a2 = mt(o2);
    return a2 = a2 ? (s2 ? s2 + "&" : "") + a2 : s2, "".concat(r2, "?").concat(a2);
  };
  var sr = function(e5) {
    return "data=" + encodeURIComponent("string" == typeof e5 ? e5 : JSON.stringify(e5));
  };
  var or = function(e5) {
    var t2 = e5.data, n2 = e5.compression;
    if (t2) {
      if (n2 === re.GZipJS) {
        var i2 = tr(function(e6, t3) {
          var n3 = e6.length;
          if (!t3 && "undefined" != typeof TextEncoder)
            return new TextEncoder().encode(e6);
          for (var i3 = new ki(e6.length + (e6.length >>> 1)), r3 = 0, s2 = function(e7) {
            i3[r3++] = e7;
          }, o2 = 0; o2 < n3; ++o2) {
            if (r3 + 5 > i3.length) {
              var a2 = new ki(r3 + 8 + (n3 - o2 << 1));
              a2.set(i3), i3 = a2;
            }
            var u2 = e6.charCodeAt(o2);
            u2 < 128 || t3 ? s2(u2) : u2 < 2048 ? (s2(192 | u2 >>> 6), s2(128 | 63 & u2)) : u2 > 55295 && u2 < 57344 ? (s2(240 | (u2 = 65536 + (1047552 & u2) | 1023 & e6.charCodeAt(++o2)) >>> 18), s2(128 | u2 >>> 12 & 63), s2(128 | u2 >>> 6 & 63), s2(128 | 63 & u2)) : (s2(224 | u2 >>> 12), s2(128 | u2 >>> 6 & 63), s2(128 | 63 & u2));
          }
          return Hi(i3, 0, r3);
        }(JSON.stringify(t2)), { mtime: 0 });
        return { contentType: ir, body: new Blob([i2], { type: ir }) };
      }
      if (n2 === re.Base64) {
        var r2 = function(e6) {
          var t3, n3, i3, r3, s2, o2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a2 = 0, u2 = 0, l2 = "", c2 = [];
          if (!e6)
            return e6;
          e6 = se(e6);
          do {
            t3 = (s2 = e6.charCodeAt(a2++) << 16 | e6.charCodeAt(a2++) << 8 | e6.charCodeAt(a2++)) >> 18 & 63, n3 = s2 >> 12 & 63, i3 = s2 >> 6 & 63, r3 = 63 & s2, c2[u2++] = o2.charAt(t3) + o2.charAt(n3) + o2.charAt(i3) + o2.charAt(r3);
          } while (a2 < e6.length);
          switch (l2 = c2.join(""), e6.length % 3) {
            case 1:
              l2 = l2.slice(0, -2) + "==";
              break;
            case 2:
              l2 = l2.slice(0, -1) + "=";
          }
          return l2;
        }(JSON.stringify(t2));
        return { contentType: "application/x-www-form-urlencoded", body: sr(r2) };
      }
      return { contentType: "application/json", body: JSON.stringify(t2) };
    }
  };
  var ar = [];
  q && ar.push({ transport: "XHR", method: function(e5) {
    var t2, n2 = new q();
    n2.open(e5.method || "GET", e5.url, true);
    var i2 = null !== (t2 = or(e5)) && void 0 !== t2 ? t2 : {}, r2 = i2.contentType, s2 = i2.body;
    Q(e5.headers, function(e6, t3) {
      n2.setRequestHeader(t3, e6);
    }), r2 && n2.setRequestHeader("Content-Type", r2), e5.timeout && (n2.timeout = e5.timeout), n2.withCredentials = true, n2.onreadystatechange = function() {
      if (4 === n2.readyState) {
        var t3, i3 = { statusCode: n2.status, text: n2.responseText };
        if (200 === n2.status)
          try {
            i3.json = JSON.parse(n2.responseText);
          } catch (e6) {
          }
        null === (t3 = e5.callback) || void 0 === t3 || t3.call(e5, i3);
      }
    }, n2.send(s2);
  } }), N && ar.push({ transport: "fetch", method: function(e5) {
    var t2, n2, i2 = null !== (t2 = or(e5)) && void 0 !== t2 ? t2 : {}, r2 = i2.contentType, s2 = i2.body, o2 = new Headers();
    Q(e5.headers, function(e6, t3) {
      o2.append(t3, e6);
    }), r2 && o2.append("Content-Type", r2);
    var a2 = e5.url, u2 = null;
    if (B) {
      var l2 = new B();
      u2 = { signal: l2.signal, timeout: setTimeout(function() {
        return l2.abort();
      }, e5.timeout) };
    }
    N(a2, { method: (null == e5 ? void 0 : e5.method) || "GET", headers: o2, keepalive: "POST" === e5.method, body: s2, signal: null === (n2 = u2) || void 0 === n2 ? void 0 : n2.signal }).then(function(t3) {
      return t3.text().then(function(n3) {
        var i3, r3 = { statusCode: t3.status, text: n3 };
        if (200 === t3.status)
          try {
            r3.json = JSON.parse(n3);
          } catch (e6) {
            V.error(e6);
          }
        null === (i3 = e5.callback) || void 0 === i3 || i3.call(e5, r3);
      });
    }).catch(function(t3) {
      var n3;
      V.error(t3), null === (n3 = e5.callback) || void 0 === n3 || n3.call(e5, { statusCode: 0, text: t3 });
    }).finally(function() {
      return u2 ? clearTimeout(u2.timeout) : null;
    });
  } }), null != A && A.sendBeacon && ar.push({ transport: "sendBeacon", method: function(e5) {
    var t2 = rr(e5.url, { beacon: "1" });
    try {
      var n2, i2 = null !== (n2 = or(e5)) && void 0 !== n2 ? n2 : {}, r2 = i2.contentType, s2 = i2.body, o2 = "string" == typeof s2 ? new Blob([s2], { type: r2 }) : s2;
      A.sendBeacon(t2, o2);
    } catch (e6) {
    }
  } });
  var ur = ["retriesPerformedSoFar"];
  var lr;
  var cr = function() {
    function e5(t2) {
      var n2 = this;
      i(this, e5), o(this, "isPolling", false), o(this, "pollIntervalMs", 3e3), o(this, "queue", []), this.instance = t2, this.queue = [], this.areWeOnline = true, !w(C) && "onLine" in C.navigator && (this.areWeOnline = C.navigator.onLine, C.addEventListener("online", function() {
        n2.areWeOnline = true, n2.flush();
      }), C.addEventListener("offline", function() {
        n2.areWeOnline = false;
      }));
    }
    return s(e5, [{ key: "retriableRequest", value: function(e6) {
      var n2 = this, i2 = e6.retriesPerformedSoFar, r2 = a(e6, ur);
      F(i2) && i2 > 0 && (r2.url = rr(r2.url, { retry_count: i2 })), this.instance._send_request(t(t({}, r2), {}, { callback: function(e7) {
        var s2;
        200 !== e7.statusCode && (e7.statusCode < 400 || e7.statusCode >= 500) && (null != i2 ? i2 : 0) < 10 ? n2.enqueue(t({ retriesPerformedSoFar: i2 }, r2)) : null === (s2 = r2.callback) || void 0 === s2 || s2.call(r2, e7);
      } }));
    } }, { key: "enqueue", value: function(e6) {
      var t2 = e6.retriesPerformedSoFar || 0;
      e6.retriesPerformedSoFar = t2 + 1;
      var n2 = function(e7) {
        var t3 = 3e3 * Math.pow(2, e7), n3 = t3 / 2, i3 = Math.min(18e5, t3), r3 = (Math.random() - 0.5) * (i3 - n3);
        return Math.ceil(i3 + r3);
      }(t2), i2 = Date.now() + n2;
      this.queue.push({ retryAt: i2, requestOptions: e6 });
      var r2 = "Enqueued failed request for retry in ".concat(n2);
      navigator.onLine || (r2 += " (Browser is offline)"), V.warn(r2), this.isPolling || (this.isPolling = true, this.poll());
    } }, { key: "poll", value: function() {
      var e6 = this;
      this.poller && clearTimeout(this.poller), this.poller = setTimeout(function() {
        e6.areWeOnline && e6.queue.length > 0 && e6.flush(), e6.poll();
      }, this.pollIntervalMs);
    } }, { key: "flush", value: function() {
      var e6 = Date.now(), t2 = [], n2 = this.queue.filter(function(n3) {
        return n3.retryAt < e6 || (t2.push(n3), false);
      });
      if (this.queue = t2, n2.length > 0) {
        var i2, r2 = h(n2);
        try {
          for (r2.s(); !(i2 = r2.n()).done; ) {
            var s2 = i2.value.requestOptions;
            this.retriableRequest(s2);
          }
        } catch (e7) {
          r2.e(e7);
        } finally {
          r2.f();
        }
      }
    } }, { key: "unload", value: function() {
      this.poller && (clearTimeout(this.poller), this.poller = void 0);
      var e6, n2 = h(this.queue);
      try {
        for (n2.s(); !(e6 = n2.n()).done; ) {
          var i2 = e6.value.requestOptions;
          try {
            this.instance._send_request(t(t({}, i2), {}, { transport: "sendBeacon" }));
          } catch (e7) {
            V.error(e7);
          }
        }
      } catch (e7) {
        n2.e(e7);
      } finally {
        n2.f();
      }
      this.queue = [];
    } }]), e5;
  }();
  var dr = 1800;
  var hr = function() {
    function e5(t2, n2, r2, s2) {
      var a2;
      i(this, e5), o(this, "_sessionIdChangedHandlers", []), this.config = t2, this.persistence = n2, this._windowId = void 0, this._sessionId = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this._sessionIdGenerator = r2 || Ze, this._windowIdGenerator = s2 || Ze;
      var u2 = t2.persistence_name || t2.token, l2 = t2.session_idle_timeout_seconds || dr;
      if (F(l2) ? l2 > dr ? V.warn("session_idle_timeout_seconds cannot be  greater than 30 minutes. Using 30 minutes instead.") : l2 < 60 && V.warn("session_idle_timeout_seconds cannot be less than 60 seconds. Using 60 seconds instead.") : (V.warn("session_idle_timeout_seconds must be a number. Defaulting to 30 minutes."), l2 = dr), this._sessionTimeoutMs = 1e3 * Math.min(Math.max(l2, 60), dr), this._window_id_storage_key = "ph_" + u2 + "_window_id", this._primary_window_exists_storage_key = "ph_" + u2 + "_primary_window_exists", this._canUseSessionStorage()) {
        var c2 = vt.parse(this._window_id_storage_key), d2 = vt.parse(this._primary_window_exists_storage_key);
        c2 && !d2 ? this._windowId = c2 : vt.remove(this._window_id_storage_key), vt.set(this._primary_window_exists_storage_key, true);
      }
      if (null !== (a2 = this.config.bootstrap) && void 0 !== a2 && a2.sessionID)
        try {
          var h2 = function(e6) {
            var t3 = e6.replace(/-/g, "");
            if (32 !== t3.length)
              throw new Error("Not a valid UUID");
            if ("7" !== t3[12])
              throw new Error("Not a UUIDv7");
            return parseInt(t3.substring(0, 12), 16);
          }(this.config.bootstrap.sessionID);
          this._setSessionId(this.config.bootstrap.sessionID, new Date().getTime(), h2);
        } catch (e6) {
          V.error("Invalid sessionID in bootstrap", e6);
        }
      this._listenToReloadWindow();
    }
    return s(e5, [{ key: "onSessionId", value: function(e6) {
      var t2 = this;
      return w(this._sessionIdChangedHandlers) && (this._sessionIdChangedHandlers = []), this._sessionIdChangedHandlers.push(e6), this._sessionId && e6(this._sessionId, this._windowId), function() {
        t2._sessionIdChangedHandlers = t2._sessionIdChangedHandlers.filter(function(t3) {
          return t3 !== e6;
        });
      };
    } }, { key: "_canUseSessionStorage", value: function() {
      return "memory" !== this.config.persistence && !this.persistence.disabled && vt.is_supported();
    } }, { key: "_setWindowId", value: function(e6) {
      e6 !== this._windowId && (this._windowId = e6, this._canUseSessionStorage() && vt.set(this._window_id_storage_key, e6));
    } }, { key: "_getWindowId", value: function() {
      return this._windowId ? this._windowId : this._canUseSessionStorage() ? vt.parse(this._window_id_storage_key) : null;
    } }, { key: "_setSessionId", value: function(e6, t2, n2) {
      e6 === this._sessionId && t2 === this._sessionActivityTimestamp && n2 === this._sessionStartTimestamp || (this._sessionStartTimestamp = n2, this._sessionActivityTimestamp = t2, this._sessionId = e6, this.persistence.register(o({}, Ee, [t2, e6, n2])));
    } }, { key: "_getSessionId", value: function() {
      if (this._sessionId && this._sessionActivityTimestamp && this._sessionStartTimestamp)
        return [this._sessionActivityTimestamp, this._sessionId, this._sessionStartTimestamp];
      var e6 = this.persistence.props[Ee];
      return m(e6) && 2 === e6.length && e6.push(e6[0]), e6 || [0, null, 0];
    } }, { key: "resetSessionId", value: function() {
      this._setSessionId(null, null, null);
    } }, { key: "_listenToReloadWindow", value: function() {
      var e6 = this;
      null == C || C.addEventListener("beforeunload", function() {
        e6._canUseSessionStorage() && vt.remove(e6._primary_window_exists_storage_key);
      });
    } }, { key: "checkAndGetSessionAndWindowId", value: function() {
      var e6 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t2 = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null) || new Date().getTime(), n2 = u(this._getSessionId(), 3), i2 = n2[0], r2 = n2[1], s2 = n2[2], o2 = this._getWindowId(), a2 = s2 && s2 > 0 && Math.abs(t2 - s2) > 864e5, l2 = false, c2 = !r2, d2 = !e6 && Math.abs(t2 - i2) > this._sessionTimeoutMs;
      c2 || d2 || a2 ? (r2 = this._sessionIdGenerator(), o2 = this._windowIdGenerator(), V.info("[SessionId] new session ID generated", { sessionId: r2, windowId: o2, changeReason: { noSessionId: c2, activityTimeout: d2, sessionPastMaximumLength: a2 } }), s2 = t2, l2 = true) : o2 || (o2 = this._windowIdGenerator(), l2 = true);
      var h2 = 0 === i2 || !e6 || a2 ? t2 : i2, f2 = 0 === s2 ? new Date().getTime() : s2;
      return this._setWindowId(o2), this._setSessionId(r2, h2, f2), l2 && this._sessionIdChangedHandlers.forEach(function(e7) {
        return e7(r2, o2);
      }), { sessionId: r2, windowId: o2, sessionStartTimestamp: f2 };
    } }]), e5;
  }();
  !function(e5) {
    e5.US = "us", e5.EU = "eu", e5.CUSTOM = "custom";
  }(lr || (lr = {}));
  var fr = "i.posthog.com";
  var vr = function() {
    function e5(t2) {
      i(this, e5), o(this, "_regionCache", {}), this.instance = t2;
    }
    return s(e5, [{ key: "apiHost", get: function() {
      var e6 = this.instance.config.api_host.trim().replace(/\/$/, "");
      return "https://app.posthog.com" === e6 ? "https://us.i.posthog.com" : e6;
    } }, { key: "uiHost", get: function() {
      var e6, t2 = null === (e6 = this.instance.config.ui_host) || void 0 === e6 ? void 0 : e6.replace(/\/$/, "");
      return t2 || (t2 = this.apiHost.replace(".".concat(fr), ".posthog.com")), "https://app.posthog.com" === t2 ? "https://us.posthog.com" : t2;
    } }, { key: "region", get: function() {
      return this._regionCache[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = lr.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = lr.EU : this._regionCache[this.apiHost] = lr.CUSTOM), this._regionCache[this.apiHost];
    } }, { key: "endpointFor", value: function(e6) {
      var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
      if (t2 && (t2 = "/" === t2[0] ? t2 : "/".concat(t2)), "ui" === e6)
        return this.uiHost + t2;
      if (this.region === lr.CUSTOM)
        return this.apiHost + t2;
      var n2 = fr + t2;
      switch (e6) {
        case "assets":
          return "https://".concat(this.region, "-assets.").concat(n2);
        case "api":
          return "https://".concat(this.region, ".").concat(n2);
      }
    } }, { key: "loadScript", value: function(e6, t2) {
      if (this.instance.config.disable_external_dependency_loading)
        return V.warn("".concat(e6, " was requested but loading of external scripts is disabled.")), t2("Loading of external scripts is disabled");
      var n2 = "/" === e6[0] ? this.endpointFor("assets", e6) : e6, i2 = function() {
        if (!L)
          return t2("document not found");
        var e7 = L.createElement("script");
        e7.type = "text/javascript", e7.src = n2, e7.onload = function(e8) {
          return t2(void 0, e8);
        }, e7.onerror = function(e8) {
          return t2(e8);
        };
        var i3, r2 = L.querySelectorAll("body > script");
        r2.length > 0 ? null === (i3 = r2[0].parentNode) || void 0 === i3 || i3.insertBefore(e7, r2[0]) : L.body.appendChild(e7);
      };
      null != L && L.body ? i2() : null == L || L.addEventListener("DOMContentLoaded", i2);
    } }]), e5;
  }();
  var pr = "posthog-js";
  function gr(e5) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = t2.organization, i2 = t2.projectId, r2 = t2.prefix, s2 = t2.severityAllowList, o2 = void 0 === s2 ? ["error"] : s2;
    return function(t3) {
      var s3, a2, u2, l2, c2;
      if (!("*" === o2 || o2.includes(t3.level)) || !e5.__loaded)
        return t3;
      t3.tags || (t3.tags = {});
      var d2 = e5.requestRouter.endpointFor("ui", "/project/".concat(e5.config.token, "/person/").concat(e5.get_distinct_id()));
      t3.tags["PostHog Person URL"] = d2, e5.sessionRecordingStarted() && (t3.tags["PostHog Recording URL"] = e5.get_session_replay_url({ withTimestamp: true }));
      var h2 = (null === (s3 = t3.exception) || void 0 === s3 ? void 0 : s3.values) || [], f2 = { $exception_message: (null === (a2 = h2[0]) || void 0 === a2 ? void 0 : a2.value) || t3.message, $exception_type: null === (u2 = h2[0]) || void 0 === u2 ? void 0 : u2.type, $exception_personURL: d2, $exception_level: t3.level, $sentry_event_id: t3.event_id, $sentry_exception: t3.exception, $sentry_exception_message: (null === (l2 = h2[0]) || void 0 === l2 ? void 0 : l2.value) || t3.message, $sentry_exception_type: null === (c2 = h2[0]) || void 0 === c2 ? void 0 : c2.type, $sentry_tags: t3.tags, $level: t3.level };
      return n2 && i2 && (f2.$sentry_url = (r2 || "https://sentry.io/organizations/") + n2 + "/issues/?project=" + i2 + "&query=" + t3.event_id), e5.exceptions.sendExceptionEvent(f2), t3;
    };
  }
  var _r = s(function e4(t2, n2, r2, s2, o2) {
    i(this, e4), this.name = pr, this.setupOnce = function(e5) {
      e5(gr(t2, { organization: n2, projectId: r2, prefix: s2, severityAllowList: o2 }));
    };
  });
  function mr(e5, t2) {
    var n2 = e5.config.segment;
    if (!n2)
      return t2();
    !function(e6, t3) {
      var n3 = e6.config.segment;
      if (!n3)
        return t3();
      var i2 = function(n4) {
        var i3 = function() {
          return n4.anonymousId() || Ze();
        };
        e6.config.get_device_id = i3, n4.id() && (e6.register({ distinct_id: n4.id(), $device_id: i3() }), e6.persistence.set_property(Oe, "identified")), t3();
      }, r2 = n3.user();
      "then" in r2 && y(r2.then) ? r2.then(function(e7) {
        return i2(e7);
      }) : i2(r2);
    }(e5, function() {
      n2.register(function(e6) {
        Promise && Promise.resolve || V.warn("This browser does not have Promise support, and can not use the segment integration");
        var t3 = function(t4, n3) {
          var i2;
          if (!n3)
            return t4;
          t4.event.userId || t4.event.anonymousId === e6.get_distinct_id() || (V.info("Segment integration does not have a userId set, resetting PostHog"), e6.reset()), t4.event.userId && t4.event.userId !== e6.get_distinct_id() && (V.info("Segment integration has a userId set, identifying with PostHog"), e6.identify(t4.event.userId));
          var r2 = e6._calculate_event_properties(n3, null !== (i2 = t4.event.properties) && void 0 !== i2 ? i2 : {}, new Date());
          return t4.event.properties = Object.assign({}, r2, t4.event.properties), t4;
        };
        return { name: "PostHog JS", type: "enrichment", version: "1.0.0", isLoaded: function() {
          return true;
        }, load: function() {
          return Promise.resolve();
        }, track: function(e7) {
          return t3(e7, e7.event.event);
        }, page: function(e7) {
          return t3(e7, "$pageview");
        }, identify: function(e7) {
          return t3(e7, "$identify");
        }, screen: function(e7) {
          return t3(e7, "$screen");
        } };
      }(e5)).then(function() {
        t2();
      });
    });
  }
  var yr;
  var br;
  var kr;
  var wr = function() {
    function e5(t2) {
      i(this, e5), this._instance = t2;
    }
    return s(e5, [{ key: "doPageView", value: function(e6) {
      var t2, n2 = this._previousPageViewProperties(e6);
      return this._currentPath = null !== (t2 = null == C ? void 0 : C.location.pathname) && void 0 !== t2 ? t2 : "", this._instance.scrollManager.resetContext(), this._prevPageviewTimestamp = e6, n2;
    } }, { key: "doPageLeave", value: function(e6) {
      return this._previousPageViewProperties(e6);
    } }, { key: "_previousPageViewProperties", value: function(e6) {
      var t2 = this._currentPath, n2 = this._prevPageviewTimestamp, i2 = this._instance.scrollManager.getContext();
      if (!n2)
        return {};
      var r2 = {};
      if (i2) {
        var s2 = i2.maxScrollHeight, o2 = i2.lastScrollY, a2 = i2.maxScrollY, u2 = i2.maxContentHeight, l2 = i2.lastContentY, c2 = i2.maxContentY;
        if (!(w(s2) || w(o2) || w(a2) || w(u2) || w(l2) || w(c2)))
          s2 = Math.ceil(s2), o2 = Math.ceil(o2), a2 = Math.ceil(a2), u2 = Math.ceil(u2), l2 = Math.ceil(l2), c2 = Math.ceil(c2), r2 = { $prev_pageview_last_scroll: o2, $prev_pageview_last_scroll_percentage: s2 <= 1 ? 1 : Sr(o2 / s2, 0, 1), $prev_pageview_max_scroll: a2, $prev_pageview_max_scroll_percentage: s2 <= 1 ? 1 : Sr(a2 / s2, 0, 1), $prev_pageview_last_content: l2, $prev_pageview_last_content_percentage: u2 <= 1 ? 1 : Sr(l2 / u2, 0, 1), $prev_pageview_max_content: c2, $prev_pageview_max_content_percentage: u2 <= 1 ? 1 : Sr(c2 / u2, 0, 1) };
      }
      return t2 && (r2.$prev_pageview_pathname = t2), n2 && (r2.$prev_pageview_duration = (e6.getTime() - n2.getTime()) / 1e3), r2;
    } }]), e5;
  }();
  function Sr(e5, t2, n2) {
    return Math.max(t2, Math.min(e5, n2));
  }
  !function(e5) {
    e5.Popover = "popover", e5.API = "api", e5.Widget = "widget";
  }(yr || (yr = {})), function(e5) {
    e5.Open = "open", e5.MultipleChoice = "multiple_choice", e5.SingleChoice = "single_choice", e5.Rating = "rating", e5.Link = "link";
  }(br || (br = {})), function(e5) {
    e5.NextQuestion = "next_question", e5.End = "end", e5.ResponseBased = "response_based", e5.SpecificQuestion = "specific_question";
  }(kr || (kr = {}));
  var Er = function() {
    function e5() {
      i(this, e5), o(this, "events", {}), this.events = {};
    }
    return s(e5, [{ key: "on", value: function(e6, t2) {
      var n2 = this;
      return this.events[e6] || (this.events[e6] = []), this.events[e6].push(t2), function() {
        n2.events[e6] = n2.events[e6].filter(function(e7) {
          return e7 !== t2;
        });
      };
    } }, { key: "emit", value: function(e6, t2) {
      var n2, i2 = h(this.events[e6] || []);
      try {
        for (i2.s(); !(n2 = i2.n()).done; ) {
          (0, n2.value)(t2);
        }
      } catch (e7) {
        i2.e(e7);
      } finally {
        i2.f();
      }
      var r2, s2 = h(this.events["*"] || []);
      try {
        for (s2.s(); !(r2 = s2.n()).done; ) {
          (0, r2.value)(e6, t2);
        }
      } catch (e7) {
        s2.e(e7);
      } finally {
        s2.f();
      }
    } }]), e5;
  }();
  var Ir = function() {
    function e5(t2) {
      var n2 = this;
      i(this, e5), o(this, "_debugEventEmitter", new Er()), o(this, "checkStep", function(e6, t3) {
        return n2.checkStepEvent(e6, t3) && n2.checkStepUrl(e6, t3) && n2.checkStepElement(e6, t3);
      }), o(this, "checkStepEvent", function(e6, t3) {
        return null == t3 || !t3.event || (null == e6 ? void 0 : e6.event) === (null == t3 ? void 0 : t3.event);
      }), this.instance = t2, this.actionEvents = /* @__PURE__ */ new Set(), this.actionRegistry = /* @__PURE__ */ new Set();
    }
    return s(e5, [{ key: "init", value: function() {
      var e6, t2 = this;
      if (!w(null === (e6 = this.instance) || void 0 === e6 ? void 0 : e6._addCaptureHook)) {
        var n2;
        null === (n2 = this.instance) || void 0 === n2 || n2._addCaptureHook(function(e7, n3) {
          t2.on(e7, n3);
        });
      }
    } }, { key: "register", value: function(e6) {
      var t2, n2, i2 = this;
      if (!w(null === (t2 = this.instance) || void 0 === t2 ? void 0 : t2._addCaptureHook) && (e6.forEach(function(e7) {
        var t3, n3;
        null === (t3 = i2.actionRegistry) || void 0 === t3 || t3.add(e7), null === (n3 = e7.steps) || void 0 === n3 || n3.forEach(function(e8) {
          var t4;
          null === (t4 = i2.actionEvents) || void 0 === t4 || t4.add((null == e8 ? void 0 : e8.event) || "");
        });
      }), null !== (n2 = this.instance) && void 0 !== n2 && n2.autocapture)) {
        var r2, s2 = /* @__PURE__ */ new Set();
        e6.forEach(function(e7) {
          var t3;
          null === (t3 = e7.steps) || void 0 === t3 || t3.forEach(function(e8) {
            null != e8 && e8.selector && s2.add(null == e8 ? void 0 : e8.selector);
          });
        }), null === (r2 = this.instance) || void 0 === r2 || r2.autocapture.setElementSelectors(s2);
      }
    } }, { key: "on", value: function(e6, t2) {
      var n2, i2 = this;
      null != t2 && 0 != e6.length && (this.actionEvents.has(e6) || this.actionEvents.has(null == t2 ? void 0 : t2.event)) && this.actionRegistry && (null === (n2 = this.actionRegistry) || void 0 === n2 ? void 0 : n2.size) > 0 && this.actionRegistry.forEach(function(e7) {
        i2.checkAction(t2, e7) && i2._debugEventEmitter.emit("actionCaptured", e7.name);
      });
    } }, { key: "_addActionHook", value: function(e6) {
      this.onAction("actionCaptured", function(t2) {
        return e6(t2);
      });
    } }, { key: "checkAction", value: function(e6, t2) {
      if (null == (null == t2 ? void 0 : t2.steps))
        return false;
      var n2, i2 = h(t2.steps);
      try {
        for (i2.s(); !(n2 = i2.n()).done; ) {
          var r2 = n2.value;
          if (this.checkStep(e6, r2))
            return true;
        }
      } catch (e7) {
        i2.e(e7);
      } finally {
        i2.f();
      }
      return false;
    } }, { key: "onAction", value: function(e6, t2) {
      return this._debugEventEmitter.on(e6, t2);
    } }, { key: "checkStepUrl", value: function(t2, n2) {
      if (null != n2 && n2.url) {
        var i2, r2 = null == t2 || null === (i2 = t2.properties) || void 0 === i2 ? void 0 : i2.$current_url;
        if (!r2 || "string" != typeof r2)
          return false;
        if (!e5.matchString(r2, null == n2 ? void 0 : n2.url, (null == n2 ? void 0 : n2.url_matching) || "contains"))
          return false;
      }
      return true;
    } }, { key: "checkStepElement", value: function(t2, n2) {
      if ((null != n2 && n2.href || null != n2 && n2.tag_name || null != n2 && n2.text) && !this.getElementsList(t2).some(function(t3) {
        return !(null != n2 && n2.href && !e5.matchString(t3.href || "", null == n2 ? void 0 : n2.href, (null == n2 ? void 0 : n2.href_matching) || "exact")) && ((null == n2 || !n2.tag_name || t3.tag_name === (null == n2 ? void 0 : n2.tag_name)) && !(null != n2 && n2.text && !e5.matchString(t3.text || "", null == n2 ? void 0 : n2.text, (null == n2 ? void 0 : n2.text_matching) || "exact") && !e5.matchString(t3.$el_text || "", null == n2 ? void 0 : n2.text, (null == n2 ? void 0 : n2.text_matching) || "exact")));
      }))
        return false;
      if (null != n2 && n2.selector) {
        var i2, r2 = null == t2 || null === (i2 = t2.properties) || void 0 === i2 ? void 0 : i2.$element_selectors;
        if (!r2)
          return false;
        if (!r2.includes(null == n2 ? void 0 : n2.selector))
          return false;
      }
      return true;
    } }, { key: "getElementsList", value: function(e6) {
      return null == (null == e6 ? void 0 : e6.properties.$elements) ? [] : null == e6 ? void 0 : e6.properties.$elements;
    } }], [{ key: "matchString", value: function(t2, n2, i2) {
      switch (i2) {
        case "regex":
          return !!C && _t(t2, n2);
        case "exact":
          return n2 === t2;
        case "contains":
          var r2 = e5.escapeStringRegexp(n2).replace(/_/g, ".").replace(/%/g, ".*");
          return _t(t2, r2);
        default:
          return false;
      }
    } }, { key: "escapeStringRegexp", value: function(e6) {
      return e6.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    } }]), e5;
  }();
  var Rr = function() {
    function e5(t2) {
      i(this, e5), this.instance = t2, this.eventToSurveys = /* @__PURE__ */ new Map(), this.actionToSurveys = /* @__PURE__ */ new Map();
    }
    return s(e5, [{ key: "register", value: function(e6) {
      var t2;
      w(null === (t2 = this.instance) || void 0 === t2 ? void 0 : t2._addCaptureHook) || (this.setupEventBasedSurveys(e6), this.setupActionBasedSurveys(e6));
    } }, { key: "setupActionBasedSurveys", value: function(e6) {
      var t2 = this, n2 = e6.filter(function(e7) {
        var t3, n3, i2, r2;
        return (null === (t3 = e7.conditions) || void 0 === t3 ? void 0 : t3.actions) && (null === (n3 = e7.conditions) || void 0 === n3 || null === (i2 = n3.actions) || void 0 === i2 || null === (r2 = i2.values) || void 0 === r2 ? void 0 : r2.length) > 0;
      });
      if (0 !== n2.length) {
        if (null == this.actionMatcher) {
          this.actionMatcher = new Ir(this.instance), this.actionMatcher.init();
          this.actionMatcher._addActionHook(function(e7) {
            t2.onAction(e7);
          });
        }
        n2.forEach(function(e7) {
          var n3, i2, r2, s2, o2, a2, u2, l2, c2, d2;
          e7.conditions && null !== (n3 = e7.conditions) && void 0 !== n3 && n3.actions && null !== (i2 = e7.conditions) && void 0 !== i2 && null !== (r2 = i2.actions) && void 0 !== r2 && r2.values && (null === (s2 = e7.conditions) || void 0 === s2 || null === (o2 = s2.actions) || void 0 === o2 || null === (a2 = o2.values) || void 0 === a2 ? void 0 : a2.length) > 0 && (null === (u2 = t2.actionMatcher) || void 0 === u2 || u2.register(e7.conditions.actions.values), null === (l2 = e7.conditions) || void 0 === l2 || null === (c2 = l2.actions) || void 0 === c2 || null === (d2 = c2.values) || void 0 === d2 || d2.forEach(function(n4) {
            if (n4 && n4.name) {
              var i3 = t2.actionToSurveys.get(n4.name);
              i3 && i3.push(e7.id), t2.actionToSurveys.set(n4.name, i3 || [e7.id]);
            }
          }));
        });
      }
    } }, { key: "setupEventBasedSurveys", value: function(e6) {
      var t2, n2 = this;
      if (0 !== e6.filter(function(e7) {
        var t3, n3, i2, r2;
        return (null === (t3 = e7.conditions) || void 0 === t3 ? void 0 : t3.events) && (null === (n3 = e7.conditions) || void 0 === n3 || null === (i2 = n3.events) || void 0 === i2 || null === (r2 = i2.values) || void 0 === r2 ? void 0 : r2.length) > 0;
      }).length) {
        null === (t2 = this.instance) || void 0 === t2 || t2._addCaptureHook(function(e7, t3) {
          n2.onEvent(e7, t3);
        }), e6.forEach(function(e7) {
          var t3, i2, r2;
          null === (t3 = e7.conditions) || void 0 === t3 || null === (i2 = t3.events) || void 0 === i2 || null === (r2 = i2.values) || void 0 === r2 || r2.forEach(function(t4) {
            if (t4 && t4.name) {
              var i3 = n2.eventToSurveys.get(t4.name);
              i3 && i3.push(e7.id), n2.eventToSurveys.set(t4.name, i3 || [e7.id]);
            }
          });
        });
      }
    } }, { key: "onEvent", value: function(t2, n2) {
      var i2, r2, s2 = (null === (i2 = this.instance) || void 0 === i2 || null === (r2 = i2.persistence) || void 0 === r2 ? void 0 : r2.props[Te]) || [];
      if (e5.SURVEY_SHOWN_EVENT_NAME == t2 && n2 && s2.length > 0) {
        var o2, a2 = null == n2 || null === (o2 = n2.properties) || void 0 === o2 ? void 0 : o2.$survey_id;
        if (a2) {
          var u2 = s2.indexOf(a2);
          u2 >= 0 && (s2.splice(u2, 1), this._updateActivatedSurveys(s2));
        }
      } else
        this.eventToSurveys.has(t2) && this._updateActivatedSurveys(s2.concat(this.eventToSurveys.get(t2) || []));
    } }, { key: "onAction", value: function(e6) {
      var t2, n2, i2 = (null === (t2 = this.instance) || void 0 === t2 || null === (n2 = t2.persistence) || void 0 === n2 ? void 0 : n2.props[Te]) || [];
      this.actionToSurveys.has(e6) && this._updateActivatedSurveys(i2.concat(this.actionToSurveys.get(e6) || []));
    } }, { key: "_updateActivatedSurveys", value: function(e6) {
      var t2, n2;
      null === (t2 = this.instance) || void 0 === t2 || null === (n2 = t2.persistence) || void 0 === n2 || n2.register(o({}, Te, l(new Set(e6))));
    } }, { key: "getSurveys", value: function() {
      var e6, t2, n2 = null === (e6 = this.instance) || void 0 === e6 || null === (t2 = e6.persistence) || void 0 === t2 ? void 0 : t2.props[Te];
      return n2 || [];
    } }, { key: "getEventToSurveys", value: function() {
      return this.eventToSurveys;
    } }, { key: "_getActionMatcher", value: function() {
      return this.actionMatcher;
    } }]), e5;
  }();
  o(Rr, "SURVEY_SHOWN_EVENT_NAME", "survey shown");
  var Fr = "[Surveys]";
  var xr = { icontains: function(e5) {
    return !!C && C.location.href.toLowerCase().indexOf(e5.toLowerCase()) > -1;
  }, not_icontains: function(e5) {
    return !!C && -1 === C.location.href.toLowerCase().indexOf(e5.toLowerCase());
  }, regex: function(e5) {
    return !!C && _t(C.location.href, e5);
  }, not_regex: function(e5) {
    return !!C && !_t(C.location.href, e5);
  }, exact: function(e5) {
    return (null == C ? void 0 : C.location.href) === e5;
  }, is_not: function(e5) {
    return (null == C ? void 0 : C.location.href) !== e5;
  } };
  var Pr = function() {
    function e5(t2) {
      i(this, e5), this.instance = t2, this._surveyEventReceiver = null;
    }
    return s(e5, [{ key: "afterDecideResponse", value: function(e6) {
      this._decideServerResponse = !!e6.surveys, this.loadIfEnabled();
    } }, { key: "loadIfEnabled", value: function() {
      var e6 = this, t2 = null == U ? void 0 : U.extendPostHogWithSurveys;
      this.instance.config.disable_surveys || !this._decideServerResponse || t2 || (null == this._surveyEventReceiver && (this._surveyEventReceiver = new Rr(this.instance)), this.instance.requestRouter.loadScript("/static/surveys.js", function(t3) {
        if (t3)
          return V.error(Fr, "Could not load surveys script", t3);
        e6._surveyManager = U.extendPostHogWithSurveys(e6.instance);
      }));
    } }, { key: "getSurveys", value: function(e6) {
      var t2 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      if (this.instance.config.disable_surveys)
        return e6([]);
      null == this._surveyEventReceiver && (this._surveyEventReceiver = new Rr(this.instance));
      var i2 = this.instance.get_property(Ce);
      if (i2 && !n2)
        return e6(i2);
      this.instance._send_request({ url: this.instance.requestRouter.endpointFor("api", "/api/surveys/?token=".concat(this.instance.config.token)), method: "GET", transport: "XHR", callback: function(n3) {
        var i3;
        if (200 !== n3.statusCode || !n3.json)
          return e6([]);
        var r2, s2 = n3.json.surveys || [], a2 = s2.filter(function(e7) {
          var t3, n4, i4, r3, s3, o2, a3, u2, l2, c2, d2, h2;
          return (null === (t3 = e7.conditions) || void 0 === t3 ? void 0 : t3.events) && (null === (n4 = e7.conditions) || void 0 === n4 || null === (i4 = n4.events) || void 0 === i4 ? void 0 : i4.values) && (null === (r3 = e7.conditions) || void 0 === r3 || null === (s3 = r3.events) || void 0 === s3 || null === (o2 = s3.values) || void 0 === o2 ? void 0 : o2.length) > 0 || (null === (a3 = e7.conditions) || void 0 === a3 ? void 0 : a3.actions) && (null === (u2 = e7.conditions) || void 0 === u2 || null === (l2 = u2.actions) || void 0 === l2 ? void 0 : l2.values) && (null === (c2 = e7.conditions) || void 0 === c2 || null === (d2 = c2.actions) || void 0 === d2 || null === (h2 = d2.values) || void 0 === h2 ? void 0 : h2.length) > 0;
        });
        a2.length > 0 && (null === (r2 = t2._surveyEventReceiver) || void 0 === r2 || r2.register(a2));
        return null === (i3 = t2.instance.persistence) || void 0 === i3 || i3.register(o({}, Ce, s2)), e6(s2);
      } });
    } }, { key: "getActiveMatchingSurveys", value: function(e6) {
      var t2 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      this.getSurveys(function(n3) {
        var i2, r2 = n3.filter(function(e7) {
          return !(!e7.start_date || e7.end_date);
        }).filter(function(e7) {
          var t3, n4, i3, r3;
          if (!e7.conditions)
            return true;
          var s3 = null === (t3 = e7.conditions) || void 0 === t3 || !t3.url || xr[null !== (n4 = null === (i3 = e7.conditions) || void 0 === i3 ? void 0 : i3.urlMatchType) && void 0 !== n4 ? n4 : "icontains"](e7.conditions.url), o3 = null === (r3 = e7.conditions) || void 0 === r3 || !r3.selector || (null == L ? void 0 : L.querySelector(e7.conditions.selector));
          return s3 && o3;
        }), s2 = null === (i2 = t2._surveyEventReceiver) || void 0 === i2 ? void 0 : i2.getSurveys(), o2 = r2.filter(function(e7) {
          var n4, i3, r3, o3, a2, u2, l2, c2, d2, h2;
          if (!e7.linked_flag_key && !e7.targeting_flag_key && !e7.internal_targeting_flag_key)
            return true;
          var f2 = !e7.linked_flag_key || t2.instance.featureFlags.isFeatureEnabled(e7.linked_flag_key), v2 = !e7.targeting_flag_key || t2.instance.featureFlags.isFeatureEnabled(e7.targeting_flag_key), p2 = (null === (n4 = e7.conditions) || void 0 === n4 ? void 0 : n4.events) && (null === (i3 = e7.conditions) || void 0 === i3 || null === (r3 = i3.events) || void 0 === r3 ? void 0 : r3.values) && (null === (o3 = e7.conditions) || void 0 === o3 || null === (a2 = o3.events) || void 0 === a2 ? void 0 : a2.values.length) > 0, g2 = (null === (u2 = e7.conditions) || void 0 === u2 ? void 0 : u2.actions) && (null === (l2 = e7.conditions) || void 0 === l2 || null === (c2 = l2.actions) || void 0 === c2 ? void 0 : c2.values) && (null === (d2 = e7.conditions) || void 0 === d2 || null === (h2 = d2.actions) || void 0 === h2 ? void 0 : h2.values.length) > 0, _2 = !p2 && !g2 || (null == s2 ? void 0 : s2.includes(e7.id)), m2 = t2._canActivateRepeatedly(e7), y2 = !(e7.internal_targeting_flag_key && !m2) || t2.instance.featureFlags.isFeatureEnabled(e7.internal_targeting_flag_key);
          return f2 && v2 && y2 && _2;
        });
        return e6(o2);
      }, n2);
    } }, { key: "getNextSurveyStep", value: function(e6, t2, n2) {
      var i2, r2 = e6.questions[t2], s2 = t2 + 1;
      if (null === (i2 = r2.branching) || void 0 === i2 || !i2.type)
        return t2 === e6.questions.length - 1 ? kr.End : s2;
      if (r2.branching.type === kr.End)
        return kr.End;
      if (r2.branching.type === kr.SpecificQuestion) {
        if (Number.isInteger(r2.branching.index))
          return r2.branching.index;
      } else if (r2.branching.type === kr.ResponseBased) {
        if (r2.type === br.SingleChoice) {
          var o2, a2, u2 = r2.choices.indexOf("".concat(n2));
          if (null !== (o2 = r2.branching) && void 0 !== o2 && null !== (a2 = o2.responseValues) && void 0 !== a2 && a2.hasOwnProperty(u2)) {
            var l2 = r2.branching.responseValues[u2];
            return Number.isInteger(l2) ? l2 : l2 === kr.End ? kr.End : s2;
          }
        } else if (r2.type === br.Rating) {
          var c2, d2;
          if ("number" != typeof n2 || !Number.isInteger(n2))
            throw new Error("The response type must be an integer");
          var h2 = function(e7, t3) {
            if (3 === t3) {
              if (e7 < 1 || e7 > 3)
                throw new Error("The response must be in range 1-3");
              return 1 === e7 ? "negative" : 2 === e7 ? "neutral" : "positive";
            }
            if (5 === t3) {
              if (e7 < 1 || e7 > 5)
                throw new Error("The response must be in range 1-5");
              return e7 <= 2 ? "negative" : 3 === e7 ? "neutral" : "positive";
            }
            if (10 === t3) {
              if (e7 < 0 || e7 > 10)
                throw new Error("The response must be in range 0-10");
              return e7 <= 6 ? "detractors" : e7 <= 8 ? "passives" : "promoters";
            }
            throw new Error("The scale must be one of: 3, 5, 10");
          }(n2, r2.scale);
          if (null !== (c2 = r2.branching) && void 0 !== c2 && null !== (d2 = c2.responseValues) && void 0 !== d2 && d2.hasOwnProperty(h2)) {
            var f2 = r2.branching.responseValues[h2];
            return Number.isInteger(f2) ? f2 : f2 === kr.End ? kr.End : s2;
          }
        }
        return s2;
      }
      return V.warn(Fr, "Falling back to next question index due to unexpected branching type"), s2;
    } }, { key: "_canActivateRepeatedly", value: function(e6) {
      var t2;
      return R(null === (t2 = U.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.canActivateRepeatedly) ? (V.warn(Fr, "canActivateRepeatedly is not defined, must init before calling"), false) : U.__PosthogExtensions__.canActivateRepeatedly(e6);
    } }, { key: "canRenderSurvey", value: function(e6) {
      var t2 = this;
      R(this._surveyManager) ? V.warn(Fr, "canActivateRepeatedly is not defined, must init before calling") : this.getSurveys(function(n2) {
        var i2 = n2.filter(function(t3) {
          return t3.id === e6;
        })[0];
        t2._surveyManager.canRenderSurvey(i2);
      });
    } }, { key: "renderSurvey", value: function(e6, t2) {
      var n2 = this;
      R(this._surveyManager) ? V.warn(Fr, "canActivateRepeatedly is not defined, must init before calling") : this.getSurveys(function(i2) {
        var r2 = i2.filter(function(t3) {
          return t3.id === e6;
        })[0];
        n2._surveyManager.renderSurvey(r2, null == L ? void 0 : L.querySelector(t2));
      });
    } }]), e5;
  }();
  var Cr = function() {
    function e5(t2) {
      var n2, r2, s2 = this;
      i(this, e5), o(this, "serverLimits", {}), o(this, "lastEventRateLimited", false), o(this, "checkForLimiting", function(e6) {
        var t3 = e6.text;
        if (t3 && t3.length)
          try {
            (JSON.parse(t3).quota_limited || []).forEach(function(e7) {
              V.info("[RateLimiter] ".concat(e7 || "events", " is quota limited.")), s2.serverLimits[e7] = new Date().getTime() + 6e4;
            });
          } catch (e7) {
            return void V.warn('[RateLimiter] could not rate limit - continuing. Error: "'.concat(null == e7 ? void 0 : e7.message, '"'), { text: t3 });
          }
      }), this.instance = t2, this.captureEventsPerSecond = (null === (n2 = t2.config.rate_limiting) || void 0 === n2 ? void 0 : n2.events_per_second) || 10, this.captureEventsBurstLimit = Math.max((null === (r2 = t2.config.rate_limiting) || void 0 === r2 ? void 0 : r2.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond), this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
    }
    return s(e5, [{ key: "clientRateLimitContext", value: function() {
      var e6, t2, n2, i2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r2 = new Date().getTime(), s2 = null !== (e6 = null === (t2 = this.instance.persistence) || void 0 === t2 ? void 0 : t2.get_property(Ae)) && void 0 !== e6 ? e6 : { tokens: this.captureEventsBurstLimit, last: r2 };
      s2.tokens += (r2 - s2.last) / 1e3 * this.captureEventsPerSecond, s2.last = r2, s2.tokens > this.captureEventsBurstLimit && (s2.tokens = this.captureEventsBurstLimit);
      var o2 = s2.tokens < 1;
      return o2 || i2 || (s2.tokens = Math.max(0, s2.tokens - 1)), !o2 || this.lastEventRateLimited || i2 || this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to ".concat(this.captureEventsPerSecond, " events per second and ").concat(this.captureEventsBurstLimit, " events burst limit.") }, { skip_client_rate_limiting: true }), this.lastEventRateLimited = o2, null === (n2 = this.instance.persistence) || void 0 === n2 || n2.set_property(Ae, s2), { isRateLimited: o2, remainingTokens: s2.tokens };
    } }, { key: "isServerRateLimited", value: function(e6) {
      var t2 = this.serverLimits[e6 || "events"] || false;
      return false !== t2 && new Date().getTime() < t2;
    } }]), e5;
  }();
  var Tr = function() {
    return t({ initialPathName: (null == D ? void 0 : D.pathname) || "", referringDomain: yn.referringDomain() }, yn.campaignParams());
  };
  var $r = function() {
    function e5(t2, n2, r2) {
      var s2 = this;
      i(this, e5), o(this, "_onSessionIdCallback", function(e6) {
        var t3 = s2._getStoredProps();
        if (!t3 || t3.sessionId !== e6) {
          var n3 = { sessionId: e6, props: s2._sessionSourceParamGenerator() };
          s2._persistence.register(o({}, Me, n3));
        }
      }), this._sessionIdManager = t2, this._persistence = n2, this._sessionSourceParamGenerator = r2 || Tr, this._sessionIdManager.onSessionId(this._onSessionIdCallback);
    }
    return s(e5, [{ key: "_getStoredProps", value: function() {
      return this._persistence.props[Me];
    } }, { key: "getSessionProps", value: function() {
      var e6, t2 = null === (e6 = this._getStoredProps()) || void 0 === e6 ? void 0 : e6.props;
      return t2 ? { $client_session_initial_referring_host: t2.referringDomain, $client_session_initial_pathname: t2.initialPathName, $client_session_initial_utm_source: t2.utm_source, $client_session_initial_utm_campaign: t2.utm_campaign, $client_session_initial_utm_medium: t2.utm_medium, $client_session_initial_utm_content: t2.utm_content, $client_session_initial_utm_term: t2.utm_term } : {};
    } }]), e5;
  }();
  var Or = ["ahrefsbot", "ahrefssiteaudit", "applebot", "baiduspider", "bingbot", "bingpreview", "bot.htm", "bot.php", "crawler", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "gptbot", "http://yandex.com/bots", "hubspot", "ia_archiver", "linkedinbot", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "semrushbot", "sitebulb", "slurp", "turnitin", "twitterbot", "vercelbot", "yahoo! slurp", "yandexbot", "headlesschrome", "cypress", "Google-HotelAdsVerifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleweblight", "mediapartners-google", "storebot-google", "Bytespider;"];
  var Mr = function(e5, t2) {
    if (!e5)
      return false;
    var n2 = e5.toLowerCase();
    return Or.concat(t2 || []).some(function(e6) {
      var t3 = e6.toLowerCase();
      return -1 !== n2.indexOf(t3);
    });
  };
  var Ar = function() {
    function e5() {
      i(this, e5), this.clicks = [];
    }
    return s(e5, [{ key: "isRageClick", value: function(e6, t2, n2) {
      var i2 = this.clicks[this.clicks.length - 1];
      if (i2 && Math.abs(e6 - i2.x) + Math.abs(t2 - i2.y) < 30 && n2 - i2.timestamp < 1e3) {
        if (this.clicks.push({ x: e6, y: t2, timestamp: n2 }), 3 === this.clicks.length)
          return true;
      } else
        this.clicks = [{ x: e6, y: t2, timestamp: n2 }];
      return false;
    } }]), e5;
  }();
  function Lr(e5) {
    var t2;
    return e5.id === Be || !(null === (t2 = e5.closest) || void 0 === t2 || !t2.call(e5, "#" + Be));
  }
  var Dr = function() {
    function e5(t2) {
      var n2, r2 = this;
      i(this, e5), o(this, "rageclicks", new Ar()), o(this, "_enabledServerSide", false), o(this, "_initialized", false), o(this, "_flushInterval", null), this.instance = t2, this._enabledServerSide = !(null === (n2 = this.instance.persistence) || void 0 === n2 || !n2.props[fe]), null == C || C.addEventListener("beforeunload", function() {
        r2.flush();
      });
    }
    return s(e5, [{ key: "flushIntervalMilliseconds", get: function() {
      var e6 = 5e3;
      return b(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (e6 = this.instance.config.capture_heatmaps.flush_interval_milliseconds), e6;
    } }, { key: "isEnabled", get: function() {
      return w(this.instance.config.capture_heatmaps) ? w(this.instance.config.enable_heatmaps) ? this._enabledServerSide : this.instance.config.enable_heatmaps : false !== this.instance.config.capture_heatmaps;
    } }, { key: "startIfEnabled", value: function() {
      if (this.isEnabled) {
        if (this._initialized)
          return;
        V.info("[heatmaps] starting..."), this._setupListeners(), this._flushInterval = setInterval(this.flush.bind(this), this.flushIntervalMilliseconds);
      } else {
        var e6;
        clearInterval(null !== (e6 = this._flushInterval) && void 0 !== e6 ? e6 : void 0), this.getAndClearBuffer();
      }
    } }, { key: "afterDecideResponse", value: function(e6) {
      var t2 = !!e6.heatmaps;
      this.instance.persistence && this.instance.persistence.register(o({}, fe, t2)), this._enabledServerSide = t2, this.startIfEnabled();
    } }, { key: "getAndClearBuffer", value: function() {
      var e6 = this.buffer;
      return this.buffer = void 0, e6;
    } }, { key: "_setupListeners", value: function() {
      var e6 = this;
      C && L && (oe(L, "click", function(t2) {
        return e6._onClick(t2 || (null == C ? void 0 : C.event));
      }, false, true), oe(L, "mousemove", function(t2) {
        return e6._onMouseMove(t2 || (null == C ? void 0 : C.event));
      }, false, true), this._initialized = true);
    } }, { key: "_getProperties", value: function(e6, t2) {
      var n2 = this.instance.scrollManager.scrollY(), i2 = this.instance.scrollManager.scrollX(), r2 = this.instance.scrollManager.scrollElement(), s2 = function(e7, t3, n3) {
        for (var i3 = e7; i3 && !Mn(i3, "body"); ) {
          if (i3 === n3)
            return false;
          if (Y(t3, null == C ? void 0 : C.getComputedStyle(i3).position))
            return true;
          i3 = Nn(i3);
        }
        return false;
      }(e6.target, ["fixed", "sticky"], r2);
      return { x: e6.clientX + (s2 ? 0 : i2), y: e6.clientY + (s2 ? 0 : n2), target_fixed: s2, type: t2 };
    } }, { key: "_onClick", value: function(e6) {
      var n2;
      if (!Lr(e6.target)) {
        var i2 = this._getProperties(e6, "click");
        null !== (n2 = this.rageclicks) && void 0 !== n2 && n2.isRageClick(e6.clientX, e6.clientY, new Date().getTime()) && this._capture(t(t({}, i2), {}, { type: "rageclick" })), this._capture(i2);
      }
    } }, { key: "_onMouseMove", value: function(e6) {
      var t2 = this;
      Lr(e6.target) || (clearTimeout(this._mouseMoveTimeout), this._mouseMoveTimeout = setTimeout(function() {
        t2._capture(t2._getProperties(e6, "mousemove"));
      }, 500));
    } }, { key: "_capture", value: function(e6) {
      if (C) {
        var t2 = C.location.href;
        this.buffer = this.buffer || {}, this.buffer[t2] || (this.buffer[t2] = []), this.buffer[t2].push(e6);
      }
    } }, { key: "flush", value: function() {
      this.buffer && !k(this.buffer) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
    } }]), e5;
  }();
  var Nr = function() {
    function e5(t2) {
      var n2 = this;
      i(this, e5), o(this, "_updateScrollData", function() {
        var e6, t3, i2, r2;
        n2.context || (n2.context = {});
        var s2 = n2.scrollElement(), o2 = n2.scrollY(), a2 = s2 ? Math.max(0, s2.scrollHeight - s2.clientHeight) : 0, u2 = o2 + ((null == s2 ? void 0 : s2.clientHeight) || 0), l2 = (null == s2 ? void 0 : s2.scrollHeight) || 0;
        n2.context.lastScrollY = Math.ceil(o2), n2.context.maxScrollY = Math.max(o2, null !== (e6 = n2.context.maxScrollY) && void 0 !== e6 ? e6 : 0), n2.context.maxScrollHeight = Math.max(a2, null !== (t3 = n2.context.maxScrollHeight) && void 0 !== t3 ? t3 : 0), n2.context.lastContentY = u2, n2.context.maxContentY = Math.max(u2, null !== (i2 = n2.context.maxContentY) && void 0 !== i2 ? i2 : 0), n2.context.maxContentHeight = Math.max(l2, null !== (r2 = n2.context.maxContentHeight) && void 0 !== r2 ? r2 : 0);
      }), this.instance = t2;
    }
    return s(e5, [{ key: "getContext", value: function() {
      return this.context;
    } }, { key: "resetContext", value: function() {
      var e6 = this.context;
      return setTimeout(this._updateScrollData, 0), e6;
    } }, { key: "startMeasuringScrollPosition", value: function() {
      null == C || C.addEventListener("scroll", this._updateScrollData, true), null == C || C.addEventListener("scrollend", this._updateScrollData, true), null == C || C.addEventListener("resize", this._updateScrollData);
    } }, { key: "scrollElement", value: function() {
      if (!this.instance.config.scroll_root_selector)
        return null == C ? void 0 : C.document.documentElement;
      var e6, t2 = h(m(this.instance.config.scroll_root_selector) ? this.instance.config.scroll_root_selector : [this.instance.config.scroll_root_selector]);
      try {
        for (t2.s(); !(e6 = t2.n()).done; ) {
          var n2 = e6.value, i2 = null == C ? void 0 : C.document.querySelector(n2);
          if (i2)
            return i2;
        }
      } catch (e7) {
        t2.e(e7);
      } finally {
        t2.f();
      }
    } }, { key: "scrollY", value: function() {
      if (this.instance.config.scroll_root_selector) {
        var e6 = this.scrollElement();
        return e6 && e6.scrollTop || 0;
      }
      return C && (C.scrollY || C.pageYOffset || C.document.documentElement.scrollTop) || 0;
    } }, { key: "scrollX", value: function() {
      if (this.instance.config.scroll_root_selector) {
        var e6 = this.scrollElement();
        return e6 && e6.scrollLeft || 0;
      }
      return C && (C.scrollX || C.pageXOffset || C.document.documentElement.scrollLeft) || 0;
    } }]), e5;
  }();
  var qr = "$copy_autocapture";
  function Br(e5, t2) {
    return t2.length > e5 ? t2.slice(0, e5) + "..." : t2;
  }
  var Hr;
  var Ur = function() {
    function e5(t2) {
      i(this, e5), o(this, "_initialized", false), o(this, "_isDisabledServerSide", null), o(this, "rageclicks", new Ar()), o(this, "_elementsChainAsString", false), this.instance = t2, this._elementSelectors = null;
    }
    return s(e5, [{ key: "config", get: function() {
      var e6, t2, n2 = b(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
      return n2.url_allowlist = null === (e6 = n2.url_allowlist) || void 0 === e6 ? void 0 : e6.map(function(e7) {
        return new RegExp(e7);
      }), n2.url_ignorelist = null === (t2 = n2.url_ignorelist) || void 0 === t2 ? void 0 : t2.map(function(e7) {
        return new RegExp(e7);
      }), n2;
    } }, { key: "_addDomEventHandlers", value: function() {
      var e6 = this;
      if (this.isBrowserSupported()) {
        if (C && L) {
          var t2 = function(t3) {
            t3 = t3 || (null == C ? void 0 : C.event);
            try {
              e6._captureEvent(t3);
            } catch (e7) {
              V.error("Failed to capture event", e7);
            }
          }, n2 = function(t3) {
            t3 = t3 || (null == C ? void 0 : C.event), e6._captureEvent(t3, qr);
          };
          oe(L, "submit", t2, false, true), oe(L, "change", t2, false, true), oe(L, "click", t2, false, true), this.config.capture_copied_text && (oe(L, "copy", n2, false, true), oe(L, "cut", n2, false, true));
        }
      } else
        V.info("Disabling Automatic Event Collection because this browser is not supported");
    } }, { key: "startIfEnabled", value: function() {
      this.isEnabled && !this._initialized && (this._addDomEventHandlers(), this._initialized = true);
    } }, { key: "afterDecideResponse", value: function(e6) {
      e6.elementsChainAsString && (this._elementsChainAsString = e6.elementsChainAsString), this.instance.persistence && this.instance.persistence.register(o({}, he, !!e6.autocapture_opt_out)), this._isDisabledServerSide = !!e6.autocapture_opt_out, this.startIfEnabled();
    } }, { key: "setElementSelectors", value: function(e6) {
      this._elementSelectors = e6;
    } }, { key: "getElementSelectors", value: function(e6) {
      var t2, n2 = [];
      return null === (t2 = this._elementSelectors) || void 0 === t2 || t2.forEach(function(t3) {
        var i2 = null == L ? void 0 : L.querySelectorAll(t3);
        null == i2 || i2.forEach(function(i3) {
          e6 === i3 && n2.push(t3);
        });
      }), n2;
    } }, { key: "isEnabled", get: function() {
      var e6, t2, n2 = null === (e6 = this.instance.persistence) || void 0 === e6 ? void 0 : e6.props[he], i2 = this._isDisabledServerSide;
      if (I(i2) && !x(n2) && !this.instance.config.advanced_disable_decide)
        return false;
      var r2 = null !== (t2 = this._isDisabledServerSide) && void 0 !== t2 ? t2 : !!n2;
      return !!this.instance.config.autocapture && !r2;
    } }, { key: "_previousElementSibling", value: function(e6) {
      if (e6.previousElementSibling)
        return e6.previousElementSibling;
      var t2 = e6;
      do {
        t2 = t2.previousSibling;
      } while (t2 && !On(t2));
      return t2;
    } }, { key: "_getAugmentPropertiesFromElement", value: function(e6) {
      if (!Bn(e6))
        return {};
      var t2 = {};
      return Q(e6.attributes, function(e7) {
        if (e7.name && 0 === e7.name.indexOf("data-ph-capture-attribute")) {
          var n2 = e7.name.replace("data-ph-capture-attribute-", ""), i2 = e7.value;
          n2 && i2 && Qn(i2) && (t2[n2] = i2);
        }
      }), t2;
    } }, { key: "_getPropertiesFromElement", value: function(e6, t2, n2) {
      var i2, r2 = e6.tagName.toLowerCase(), s2 = { tag_name: r2 };
      Dn.indexOf(r2) > -1 && !n2 && ("a" === r2.toLowerCase() || "button" === r2.toLowerCase() ? s2.$el_text = Br(1024, Jn(e6)) : s2.$el_text = Br(1024, $n(e6)));
      var o2 = Cn(e6);
      o2.length > 0 && (s2.classes = o2.filter(function(e7) {
        return "" !== e7;
      }));
      var a2 = null === (i2 = this.config) || void 0 === i2 ? void 0 : i2.element_attribute_ignorelist;
      Q(e6.attributes, function(n3) {
        var i3;
        if ((!Hn(e6) || -1 !== ["name", "id", "class", "aria-label"].indexOf(n3.name)) && ((null == a2 || !a2.includes(n3.name)) && !t2 && Qn(n3.value) && (i3 = n3.name, !S(i3) || "_ngcontent" !== i3.substring(0, 10) && "_nghost" !== i3.substring(0, 7)))) {
          var r3 = n3.value;
          "class" === n3.name && (r3 = xn(r3).join(" ")), s2["attr__" + n3.name] = Br(1024, r3);
        }
      });
      for (var u2 = 1, l2 = 1, c2 = e6; c2 = this._previousElementSibling(c2); )
        u2++, c2.tagName === e6.tagName && l2++;
      return s2.nth_child = u2, s2.nth_of_type = l2, s2;
    } }, { key: "_getDefaultProperties", value: function(e6) {
      return { $event_type: e6, $ce_version: 1 };
    } }, { key: "_getEventTarget", value: function(e6) {
      return w(e6.target) ? e6.srcElement || null : null !== (t2 = e6.target) && void 0 !== t2 && t2.shadowRoot ? e6.composedPath()[0] || null : e6.target || null;
      var t2;
    } }, { key: "_captureEvent", value: function(e6) {
      var t2 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "$autocapture";
      if (this.isEnabled) {
        var i2, r2 = this._getEventTarget(e6);
        if (An(r2) && (r2 = r2.parentNode || null), "$autocapture" === n2 && "click" === e6.type && e6 instanceof MouseEvent)
          this.instance.config.rageclick && null !== (i2 = this.rageclicks) && void 0 !== i2 && i2.isRageClick(e6.clientX, e6.clientY, new Date().getTime()) && this._captureEvent(e6, "$rageclick");
        var s2 = n2 === qr;
        if (r2 && qn(r2, e6, this.config, s2, s2 ? ["copy", "cut"] : void 0)) {
          for (var o2, a2, u2 = [r2], l2 = r2; l2.parentNode && !Mn(l2, "body"); )
            Ln(l2.parentNode) ? (u2.push(l2.parentNode.host), l2 = l2.parentNode.host) : (u2.push(l2.parentNode), l2 = l2.parentNode);
          var c2, d2, h2 = [], f2 = {}, v2 = false;
          if (Q(u2, function(e7) {
            var n3 = Bn(e7);
            "a" === e7.tagName.toLowerCase() && (c2 = e7.getAttribute("href"), c2 = n3 && Qn(c2) && c2), Y(Cn(e7), "ph-no-capture") && (v2 = true), h2.push(t2._getPropertiesFromElement(e7, t2.instance.config.mask_all_element_attributes, t2.instance.config.mask_all_text));
            var i3 = t2._getAugmentPropertiesFromElement(e7);
            J(f2, i3);
          }), this.instance.config.mask_all_text || ("a" === r2.tagName.toLowerCase() || "button" === r2.tagName.toLowerCase() ? h2[0].$el_text = Jn(r2) : h2[0].$el_text = $n(r2)), c2) {
            var p2, g2;
            h2[0].attr__href = c2;
            var _2 = null === (p2 = gt(c2)) || void 0 === p2 ? void 0 : p2.host, m2 = null == C || null === (g2 = C.location) || void 0 === g2 ? void 0 : g2.host;
            _2 && m2 && _2 !== m2 && (d2 = c2);
          }
          if (v2)
            return false;
          var y2 = J(this._getDefaultProperties(e6.type), this._elementsChainAsString ? { $elements_chain: Xn(h2) } : { $elements: h2 }, null !== (o2 = h2[0]) && void 0 !== o2 && o2.$el_text ? { $el_text: null === (a2 = h2[0]) || void 0 === a2 ? void 0 : a2.$el_text } : {}, d2 && "click" === e6.type ? { $external_click_url: d2 } : {}, f2), b2 = this.getElementSelectors(r2);
          if (b2 && b2.length > 0 && (y2.$element_selectors = b2), n2 === qr) {
            var k2, w2 = Tn(null == C || null === (k2 = C.getSelection()) || void 0 === k2 ? void 0 : k2.toString()), S2 = e6.type || "clipboard";
            if (!w2)
              return false;
            y2.$selected_content = w2, y2.$copy_type = S2;
          }
          return this.instance.capture(n2, y2), true;
        }
      }
    } }, { key: "isBrowserSupported", value: function() {
      return y(null == L ? void 0 : L.querySelectorAll);
    } }]), e5;
  }();
  var jr = function() {
    function e5(t2) {
      var n2 = this;
      i(this, e5), o(this, "_restoreXHRPatch", void 0), o(this, "_restoreFetchPatch", void 0), o(this, "_startCapturing", function() {
        w(n2._restoreXHRPatch) && U.postHogTracingHeadersPatchFns._patchXHR(n2.instance.sessionManager), w(n2._restoreFetchPatch) && U.postHogTracingHeadersPatchFns._patchFetch(n2.instance.sessionManager);
      }), this.instance = t2;
    }
    return s(e5, [{ key: "_loadScript", value: function(e6) {
      U.postHogTracingHeadersPatchFns && e6(), this.instance.requestRouter.loadScript("/static/tracing-headers.js?v=".concat(f.LIB_VERSION), function(t2) {
        if (t2)
          return V.error("[TRACING-HEADERS] failed to load script", t2);
        e6();
      });
    } }, { key: "startIfEnabledOrStop", value: function() {
      var e6, t2;
      this.instance.config.__add_tracing_headers ? this._loadScript(this._startCapturing) : (null === (e6 = this._restoreXHRPatch) || void 0 === e6 || e6.call(this), null === (t2 = this._restoreFetchPatch) || void 0 === t2 || t2.call(this), this._restoreXHRPatch = void 0, this._restoreFetchPatch = void 0);
    } }]), e5;
  }();
  !function(e5) {
    e5[e5.PENDING = -1] = "PENDING", e5[e5.DENIED = 0] = "DENIED", e5[e5.GRANTED = 1] = "GRANTED";
  }(Hr || (Hr = {}));
  var Vr = function() {
    function e5(t2) {
      i(this, e5), this.instance = t2;
    }
    return s(e5, [{ key: "config", get: function() {
      return this.instance.config;
    } }, { key: "consent", get: function() {
      return this.getDnt() ? Hr.DENIED : this.storedConsent;
    } }, { key: "isOptedOut", value: function() {
      return this.consent === Hr.DENIED || this.consent === Hr.PENDING && this.config.opt_out_capturing_by_default;
    } }, { key: "isOptedIn", value: function() {
      return !this.isOptedOut();
    } }, { key: "optInOut", value: function(e6) {
      this.storage.set(this.storageKey, e6 ? 1 : 0, this.config.cookie_expiration, this.config.cross_subdomain_cookie, this.config.secure_cookie);
    } }, { key: "reset", value: function() {
      this.storage.remove(this.storageKey, this.config.cross_subdomain_cookie);
    } }, { key: "storageKey", get: function() {
      var e6 = this.instance.config, t2 = e6.token;
      return (e6.opt_out_capturing_cookie_prefix || "__ph_opt_in_out_") + t2;
    } }, { key: "storedConsent", get: function() {
      var e6 = this.storage.get(this.storageKey);
      return "1" === e6 ? Hr.GRANTED : "0" === e6 ? Hr.DENIED : Hr.PENDING;
    } }, { key: "storage", get: function() {
      if (!this._storage) {
        var e6 = this.config.opt_out_capturing_persistence_type;
        this._storage = "localStorage" === e6 ? ut : ot;
        var t2 = "localStorage" === e6 ? ot : ut;
        t2.get(this.storageKey) && (this._storage.get(this.storageKey) || this.optInOut("1" === t2.get(this.storageKey)), t2.remove(this.storageKey, this.config.cross_subdomain_cookie));
      }
      return this._storage;
    } }, { key: "getDnt", value: function() {
      return !!this.config.respect_dnt && !!ae([null == A ? void 0 : A.doNotTrack, null == A ? void 0 : A.msDoNotTrack, U.doNotTrack], function(e6) {
        return Y([true, 1, "1", "yes"], e6);
      });
    } }]), e5;
  }();
  var Gr = "[Exception Autocapture]";
  var Wr = function() {
    function e5(t2) {
      var n2, r2 = this;
      i(this, e5), o(this, "originalOnUnhandledRejectionHandler", void 0), o(this, "startCapturing", function() {
        if (C && r2.isEnabled && !r2.hasHandlers && !r2.isCapturing) {
          var e6 = C.posthogErrorWrappingFunctions.wrapOnError, t3 = C.posthogErrorWrappingFunctions.wrapUnhandledRejection;
          if (e6 && t3)
            try {
              r2.unwrapOnError = e6(r2.captureException.bind(r2)), r2.unwrapUnhandledRejection = t3(r2.captureException.bind(r2));
            } catch (e7) {
              V.error(Gr + " failed to start", e7), r2.stopCapturing();
            }
          else
            V.error(Gr + " failed to load error wrapping functions - cannot start");
        }
      }), this.instance = t2, this.remoteEnabled = !(null === (n2 = this.instance.persistence) || void 0 === n2 || !n2.props[ve]), this.startIfEnabled();
    }
    return s(e5, [{ key: "isEnabled", get: function() {
      var e6;
      return null !== (e6 = this.remoteEnabled) && void 0 !== e6 && e6;
    } }, { key: "isCapturing", get: function() {
      var e6;
      return !(null == C || null === (e6 = C.onerror) || void 0 === e6 || !e6.__POSTHOG_INSTRUMENTED__);
    } }, { key: "hasHandlers", get: function() {
      return this.originalOnUnhandledRejectionHandler || this.unwrapOnError;
    } }, { key: "startIfEnabled", value: function() {
      this.isEnabled && !this.isCapturing && (V.info(Gr + " enabled, starting..."), this.loadScript(this.startCapturing));
    } }, { key: "loadScript", value: function(e6) {
      this.hasHandlers && e6(), this.instance.requestRouter.loadScript("/static/exception-autocapture.js?v=".concat(f.LIB_VERSION), function(t2) {
        if (t2)
          return V.error(Gr + " failed to load script", t2);
        e6();
      });
    } }, { key: "stopCapturing", value: function() {
      var e6, t2;
      null === (e6 = this.unwrapOnError) || void 0 === e6 || e6.call(this), null === (t2 = this.unwrapUnhandledRejection) || void 0 === t2 || t2.call(this);
    } }, { key: "afterDecideResponse", value: function(e6) {
      var t2 = e6.autocaptureExceptions;
      this.remoteEnabled = !!t2 || false, this.instance.persistence && this.instance.persistence.register(o({}, ve, this.remoteEnabled)), this.startIfEnabled();
    } }, { key: "captureException", value: function(e6) {
      var t2 = this.instance.requestRouter.endpointFor("ui");
      e6.$exception_personURL = "".concat(t2, "/project/").concat(this.instance.config.token, "/person/").concat(this.instance.get_distinct_id()), this.instance.exceptions.sendExceptionEvent(e6);
    } }]), e5;
  }();
  var zr = 9e5;
  var Qr = "[Web Vitals]";
  var Jr = function() {
    function e5(n2) {
      var r2, s2 = this;
      i(this, e5), o(this, "_enabledServerSide", false), o(this, "_initialized", false), o(this, "buffer", { url: void 0, metrics: [], firstMetricTimestamp: void 0 }), o(this, "_flushToCapture", function() {
        clearTimeout(s2._delayedFlushTimer), 0 !== s2.buffer.metrics.length && (s2.instance.capture("$web_vitals", s2.buffer.metrics.reduce(function(e6, n3) {
          var i2;
          return t(t({}, e6), {}, (o(i2 = {}, "$web_vitals_".concat(n3.name, "_event"), t({}, n3)), o(i2, "$web_vitals_".concat(n3.name, "_value"), n3.value), i2));
        }, {})), s2.buffer = { url: void 0, metrics: [], firstMetricTimestamp: void 0 });
      }), o(this, "_addToBuffer", function(e6) {
        var n3, i2 = null === (n3 = s2.instance.sessionManager) || void 0 === n3 ? void 0 : n3.checkAndGetSessionAndWindowId(true);
        if (w(i2))
          V.error(Qr + "Could not read session ID. Dropping metrics!");
        else {
          s2.buffer = s2.buffer || { url: void 0, metrics: [], firstMetricTimestamp: void 0 };
          var r3 = s2._currentURL();
          if (!w(r3))
            if (R(null == e6 ? void 0 : e6.name) || R(null == e6 ? void 0 : e6.value))
              V.error(Qr + "Invalid metric received", e6);
            else if (s2._maxAllowedValue && e6.value >= s2._maxAllowedValue)
              V.error(Qr + "Ignoring metric with value >= " + s2._maxAllowedValue, e6);
            else
              s2.buffer.url !== r3 && (s2._flushToCapture(), s2._delayedFlushTimer = setTimeout(s2._flushToCapture, 8e3)), w(s2.buffer.url) && (s2.buffer.url = r3), s2.buffer.firstMetricTimestamp = w(s2.buffer.firstMetricTimestamp) ? Date.now() : s2.buffer.firstMetricTimestamp, s2.buffer.metrics.push(t(t({}, e6), {}, { $current_url: r3, $session_id: i2.sessionId, $window_id: i2.windowId, timestamp: Date.now() })), s2.buffer.metrics.length === s2.allowedMetrics.length && s2._flushToCapture();
        }
      }), o(this, "_startCapturing", function() {
        var e6, t2, n3, i2, r3 = U.__PosthogExtensions__;
        if (!w(r3)) {
          var o2 = r3.postHogWebVitalsCallbacks;
          e6 = o2.onLCP, t2 = o2.onCLS, n3 = o2.onFCP, i2 = o2.onINP;
        }
        e6 && t2 && n3 && i2 ? (s2.allowedMetrics.indexOf("LCP") > -1 && e6(s2._addToBuffer.bind(s2)), s2.allowedMetrics.indexOf("CLS") > -1 && t2(s2._addToBuffer.bind(s2)), s2.allowedMetrics.indexOf("FCP") > -1 && n3(s2._addToBuffer.bind(s2)), s2.allowedMetrics.indexOf("INP") > -1 && i2(s2._addToBuffer.bind(s2)), s2._initialized = true) : V.error(Qr + "web vitals callbacks not loaded - not starting");
      }), this.instance = n2, this._enabledServerSide = !(null === (r2 = this.instance.persistence) || void 0 === r2 || !r2.props[ge]), this.startIfEnabled();
    }
    return s(e5, [{ key: "allowedMetrics", get: function() {
      var e6, t2, n2 = b(this.instance.config.capture_performance) ? null === (e6 = this.instance.config.capture_performance) || void 0 === e6 ? void 0 : e6.web_vitals_allowed_metrics : void 0;
      return w(n2) ? (null === (t2 = this.instance.persistence) || void 0 === t2 ? void 0 : t2.props[_e]) || ["CLS", "FCP", "INP", "LCP"] : n2;
    } }, { key: "_maxAllowedValue", get: function() {
      var e6 = b(this.instance.config.capture_performance) && F(this.instance.config.capture_performance.__web_vitals_max_value) ? this.instance.config.capture_performance.__web_vitals_max_value : zr;
      return 0 < e6 && e6 <= 6e4 ? zr : e6;
    } }, { key: "isEnabled", get: function() {
      var e6 = b(this.instance.config.capture_performance) ? this.instance.config.capture_performance.web_vitals : void 0;
      return x(e6) ? e6 : this._enabledServerSide;
    } }, { key: "startIfEnabled", value: function() {
      this.isEnabled && !this._initialized && (V.info(Qr + " enabled, starting..."), this.loadScript(this._startCapturing));
    } }, { key: "afterDecideResponse", value: function(e6) {
      var t2 = b(e6.capturePerformance) && !!e6.capturePerformance.web_vitals, n2 = b(e6.capturePerformance) ? e6.capturePerformance.web_vitals_allowed_metrics : void 0;
      this.instance.persistence && (this.instance.persistence.register(o({}, ge, t2)), this.instance.persistence.register(o({}, _e, n2))), this._enabledServerSide = t2, this.startIfEnabled();
    } }, { key: "loadScript", value: function(e6) {
      var t2;
      null !== (t2 = U.__PosthogExtensions__) && void 0 !== t2 && t2.postHogWebVitalsCallbacks && e6(), this.instance.requestRouter.loadScript("/static/web-vitals.js?v=".concat(f.LIB_VERSION), function(t3) {
        t3 ? V.error(Qr + " failed to load script", t3) : e6();
      });
    } }, { key: "_currentURL", value: function() {
      var e6 = C ? C.location.href : void 0;
      return e6 || V.error(Qr + "Could not determine current URL"), e6;
    } }]), e5;
  }();
  var Yr = "/e/";
  var Xr = function() {
    function e5(t2) {
      var n2;
      i(this, e5), this.instance = t2, this._endpointSuffix = (null === (n2 = this.instance.persistence) || void 0 === n2 ? void 0 : n2.props[pe]) || Yr;
    }
    return s(e5, [{ key: "endpoint", get: function() {
      return this.instance.requestRouter.endpointFor("api", this._endpointSuffix);
    } }, { key: "afterDecideResponse", value: function(e6) {
      var t2 = e6.autocaptureExceptions;
      this._endpointSuffix = b(t2) && t2.endpoint || Yr, this.instance.persistence && this.instance.persistence.register(o({}, pe, this._endpointSuffix));
    } }, { key: "sendExceptionEvent", value: function(e6) {
      this.instance.capture("$exception", e6, { _noTruncate: true, _batchKey: "exceptionEvent", _url: this.endpoint });
    } }]), e5;
  }();
  var Kr = {};
  var Zr = function() {
  };
  var es = "posthog";
  var ts = !nr && -1 === (null == H ? void 0 : H.indexOf("MSIE")) && -1 === (null == H ? void 0 : H.indexOf("Mozilla"));
  var ns = function() {
    var e5, t2, n2;
    return { api_host: "https://us.i.posthog.com", ui_host: null, token: "", autocapture: true, rageclick: true, cross_subdomain_cookie: (t2 = null == L ? void 0 : L.location, n2 = null == t2 ? void 0 : t2.hostname, !!S(n2) && "herokuapp.com" !== n2.split(".").slice(-2).join(".")), persistence: "localStorage+cookie", persistence_name: "", loaded: Zr, store_google: true, custom_campaign_params: [], custom_blocked_useragents: [], save_referrer: true, capture_pageview: true, capture_pageleave: "if_capture_pageview", debug: D && S(null == D ? void 0 : D.search) && -1 !== D.search.indexOf("__posthog_debug=true") || false, verbose: false, cookie_expiration: 365, upgrade: false, disable_session_recording: false, disable_persistence: false, disable_surveys: false, enable_recording_console_log: void 0, secure_cookie: "https:" === (null == C || null === (e5 = C.location) || void 0 === e5 ? void 0 : e5.protocol), ip: true, opt_out_capturing_by_default: false, opt_out_persistence_by_default: false, opt_out_useragent_filter: false, opt_out_capturing_persistence_type: "localStorage", opt_out_capturing_cookie_prefix: null, opt_in_site_apps: false, property_denylist: [], respect_dnt: false, sanitize_properties: null, request_headers: {}, inapp_protocol: "//", inapp_link_new_window: false, request_batching: true, properties_string_max_length: 65535, session_recording: {}, mask_all_element_attributes: false, mask_all_text: false, advanced_disable_decide: false, advanced_disable_feature_flags: false, advanced_disable_feature_flags_on_first_load: false, advanced_disable_toolbar_metrics: false, feature_flag_request_timeout_ms: 3e3, on_request_error: function(e6) {
      var t3 = "Bad HTTP status: " + e6.statusCode + " " + e6.text;
      V.error(t3);
    }, get_device_id: function(e6) {
      return e6;
    }, _onCapture: Zr, capture_performance: void 0, name: "posthog", bootstrap: {}, disable_compression: false, session_idle_timeout_seconds: 1800, person_profiles: "always", __add_tracing_headers: false };
  };
  var is = function(e5) {
    var t2 = {};
    w(e5.process_person) || (t2.person_profiles = e5.process_person), w(e5.xhr_headers) || (t2.request_headers = e5.xhr_headers), w(e5.cookie_name) || (t2.persistence_name = e5.cookie_name), w(e5.disable_cookie) || (t2.disable_persistence = e5.disable_cookie);
    var n2 = J({}, t2, e5);
    return m(e5.property_blacklist) && (w(e5.property_denylist) ? n2.property_denylist = e5.property_blacklist : m(e5.property_denylist) ? n2.property_denylist = [].concat(l(e5.property_blacklist), l(e5.property_denylist)) : V.error("Invalid value for property_denylist config: " + e5.property_denylist)), n2;
  };
  var rs = function() {
    function e5() {
      i(this, e5), o(this, "__forceAllowLocalhost", false);
    }
    return s(e5, [{ key: "_forceAllowLocalhost", get: function() {
      return this.__forceAllowLocalhost;
    }, set: function(e6) {
      V.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e6;
    } }]), e5;
  }();
  var ss = function() {
    function e5() {
      var t2 = this;
      i(this, e5), o(this, "webPerformance", new rs()), o(this, "version", f.LIB_VERSION), o(this, "_internalEventEmitter", new Er()), this.config = ns(), this.decideEndpointWasHit = false, this.SentryIntegration = _r, this.sentryIntegration = function(e6) {
        return function(e7, t3) {
          var n2 = gr(e7, t3);
          return { name: pr, processEvent: function(e8) {
            return n2(e8);
          } };
        }(t2, e6);
      }, this.__request_queue = [], this.__loaded = false, this.analyticsDefaultEndpoint = "/e/", this._initialPageviewCaptured = false, this.featureFlags = new We(this), this.toolbar = new yi(this), this.scrollManager = new Nr(this), this.pageViewManager = new wr(this), this.surveys = new Pr(this), this.exceptions = new Xr(this), this.rateLimiter = new Cr(this), this.requestRouter = new vr(this), this.consent = new Vr(this), this.people = { set: function(e6, n2, i2) {
        var r2 = S(e6) ? o({}, e6, n2) : e6;
        t2.setPersonProperties(r2), null == i2 || i2({});
      }, set_once: function(e6, n2, i2) {
        var r2 = S(e6) ? o({}, e6, n2) : e6;
        t2.setPersonProperties(void 0, r2), null == i2 || i2({});
      } }, this.on("eventCaptured", function(e6) {
        return V.info("send", e6);
      });
    }
    return s(e5, [{ key: "init", value: function(t2, n2, i2) {
      if (i2 && i2 !== es) {
        var r2, s2 = null !== (r2 = Kr[i2]) && void 0 !== r2 ? r2 : new e5();
        return s2._init(t2, n2, i2), Kr[i2] = s2, Kr[es][i2] = s2, s2;
      }
      return this._init(t2, n2, i2);
    } }, { key: "_init", value: function(e6) {
      var n2, i2, r2 = this, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o2 = arguments.length > 2 ? arguments[2] : void 0;
      if (w(e6) || E(e6))
        return V.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
      if (this.__loaded)
        return V.warn("You have already initialized PostHog! Re-initializing is a no-op"), this;
      this.__loaded = true, this.config = {}, this._triggered_notifs = [], this.set_config(J({}, ns(), is(s2), { name: o2, token: e6 })), this.config.on_xhr_error && V.error("[posthog] on_xhr_error is deprecated. Use on_request_error instead"), this.compression = s2.disable_compression ? void 0 : re.GZipJS, this.persistence = new kn(this.config), this.sessionPersistence = "sessionStorage" === this.config.persistence ? this.persistence : new kn(t(t({}, this.config), {}, { persistence: "sessionStorage" }));
      var a2 = t({}, this.persistence.props), u2 = t({}, this.sessionPersistence.props);
      if (this._requestQueue = new bi(function(e7) {
        return r2._send_retriable_request(e7);
      }), this._retryQueue = new cr(this), this.__request_queue = [], this.sessionManager = new hr(this.config, this.persistence), this.sessionPropsManager = new $r(this.sessionManager, this.persistence), new jr(this).startIfEnabledOrStop(), this.sessionRecording = new pi(this), this.sessionRecording.startIfEnabledOrStop(), this.config.disable_scroll_properties || this.scrollManager.startMeasuringScrollPosition(), this.autocapture = new Ur(this), this.autocapture.startIfEnabled(), this.surveys.loadIfEnabled(), this.heatmaps = new Dr(this), this.heatmaps.startIfEnabled(), this.webVitalsAutocapture = new Jr(this), this.exceptionObserver = new Wr(this), this.exceptionObserver.startIfEnabled(), f.DEBUG = f.DEBUG || this.config.debug, f.DEBUG && V.info("Starting in debug mode", { this: this, config: s2, thisC: t({}, this.config), p: a2, s: u2 }), this._sync_opt_out_with_persistence(), void 0 !== (null === (n2 = s2.bootstrap) || void 0 === n2 ? void 0 : n2.distinctID)) {
        var l2, c2, d2 = this.config.get_device_id(Ze()), h2 = null !== (l2 = s2.bootstrap) && void 0 !== l2 && l2.isIdentifiedID ? d2 : s2.bootstrap.distinctID;
        this.persistence.set_property(Oe, null !== (c2 = s2.bootstrap) && void 0 !== c2 && c2.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: s2.bootstrap.distinctID, $device_id: h2 });
      }
      if (this._hasBootstrappedFeatureFlags()) {
        var v2, p2, g2 = Object.keys((null === (v2 = s2.bootstrap) || void 0 === v2 ? void 0 : v2.featureFlags) || {}).filter(function(e7) {
          var t2, n3;
          return !(null === (t2 = s2.bootstrap) || void 0 === t2 || null === (n3 = t2.featureFlags) || void 0 === n3 || !n3[e7]);
        }).reduce(function(e7, t2) {
          var n3, i3;
          return e7[t2] = (null === (n3 = s2.bootstrap) || void 0 === n3 || null === (i3 = n3.featureFlags) || void 0 === i3 ? void 0 : i3[t2]) || false, e7;
        }, {}), _2 = Object.keys((null === (p2 = s2.bootstrap) || void 0 === p2 ? void 0 : p2.featureFlagPayloads) || {}).filter(function(e7) {
          return g2[e7];
        }).reduce(function(e7, t2) {
          var n3, i3, r3, o3;
          null !== (n3 = s2.bootstrap) && void 0 !== n3 && null !== (i3 = n3.featureFlagPayloads) && void 0 !== i3 && i3[t2] && (e7[t2] = null === (r3 = s2.bootstrap) || void 0 === r3 || null === (o3 = r3.featureFlagPayloads) || void 0 === o3 ? void 0 : o3[t2]);
          return e7;
        }, {});
        this.featureFlags.receivedFeatureFlags({ featureFlags: g2, featureFlagPayloads: _2 });
      }
      if (!this.get_distinct_id()) {
        var m2 = this.config.get_device_id(Ze());
        this.register_once({ distinct_id: m2, $device_id: m2 }, ""), this.persistence.set_property(Oe, "anonymous");
      }
      return null == C || null === (i2 = C.addEventListener) || void 0 === i2 || i2.call(C, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this)), this.toolbar.maybeLoadToolbar(), s2.segment ? mr(this, function() {
        return r2._loaded();
      }) : this._loaded(), y(this.config._onCapture) && this.on("eventCaptured", function(e7) {
        return r2.config._onCapture(e7.event, e7);
      }), this;
    } }, { key: "_afterDecideResponse", value: function(e6) {
      var t2, n2, i2, r2, s2, o2, a2, u2;
      this.compression = void 0, e6.supportedCompression && !this.config.disable_compression && (this.compression = Y(e6.supportedCompression, re.GZipJS) ? re.GZipJS : Y(e6.supportedCompression, re.Base64) ? re.Base64 : void 0), null !== (t2 = e6.analytics) && void 0 !== t2 && t2.endpoint && (this.analyticsDefaultEndpoint = e6.analytics.endpoint), null === (n2 = this.sessionRecording) || void 0 === n2 || n2.afterDecideResponse(e6), null === (i2 = this.autocapture) || void 0 === i2 || i2.afterDecideResponse(e6), null === (r2 = this.heatmaps) || void 0 === r2 || r2.afterDecideResponse(e6), null === (s2 = this.surveys) || void 0 === s2 || s2.afterDecideResponse(e6), null === (o2 = this.webVitalsAutocapture) || void 0 === o2 || o2.afterDecideResponse(e6), null === (a2 = this.exceptions) || void 0 === a2 || a2.afterDecideResponse(e6), null === (u2 = this.exceptionObserver) || void 0 === u2 || u2.afterDecideResponse(e6);
    } }, { key: "_loaded", value: function() {
      var e6 = this, t2 = this.config.advanced_disable_decide;
      t2 || this.featureFlags.setReloadingPaused(true);
      try {
        this.config.loaded(this);
      } catch (e7) {
        V.critical("`loaded` function failed", e7);
      }
      this._start_queue_if_opted_in(), this.config.capture_pageview && setTimeout(function() {
        e6.consent.isOptedIn() && e6._captureInitialPageview();
      }, 1), t2 || (new gi(this).call(), this.featureFlags.resetRequestQueue());
    } }, { key: "_start_queue_if_opted_in", value: function() {
      var e6;
      this.has_opted_out_capturing() || this.config.request_batching && (null === (e6 = this._requestQueue) || void 0 === e6 || e6.enable());
    } }, { key: "_dom_loaded", value: function() {
      var e6 = this;
      this.has_opted_out_capturing() || z(this.__request_queue, function(t2) {
        return e6._send_retriable_request(t2);
      }), this.__request_queue = [], this._start_queue_if_opted_in();
    } }, { key: "_handle_unload", value: function() {
      var e6, t2;
      this.config.request_batching ? (this._shouldCapturePageleave() && this.capture("$pageleave"), null === (e6 = this._requestQueue) || void 0 === e6 || e6.unload(), null === (t2 = this._retryQueue) || void 0 === t2 || t2.unload()) : this._shouldCapturePageleave() && this.capture("$pageleave", null, { transport: "sendBeacon" });
    } }, { key: "_send_request", value: function(e6) {
      var n2 = this;
      this.__loaded && (ts ? this.__request_queue.push(e6) : this.rateLimiter.isServerRateLimited(e6.batchKey) || (e6.transport = e6.transport || this.config.api_transport, e6.url = rr(e6.url, { ip: this.config.ip ? 1 : 0 }), e6.headers = t({}, this.config.request_headers), e6.compression = "best-available" === e6.compression ? this.compression : e6.compression, function(e7) {
        var n3, i2, r2, s2 = t({}, e7);
        s2.timeout = s2.timeout || 6e4, s2.url = rr(s2.url, { _: new Date().getTime().toString(), ver: f.LIB_VERSION, compression: s2.compression });
        var o2 = null !== (n3 = s2.transport) && void 0 !== n3 ? n3 : "XHR", a2 = null !== (i2 = null === (r2 = ae(ar, function(e8) {
          return e8.transport === o2;
        })) || void 0 === r2 ? void 0 : r2.method) && void 0 !== i2 ? i2 : ar[0].method;
        if (!a2)
          throw new Error("No available transport method");
        a2(s2);
      }(t(t({}, e6), {}, { callback: function(t2) {
        var i2, r2, s2;
        (n2.rateLimiter.checkForLimiting(t2), t2.statusCode >= 400) && (null === (r2 = (s2 = n2.config).on_request_error) || void 0 === r2 || r2.call(s2, t2));
        null === (i2 = e6.callback) || void 0 === i2 || i2.call(e6, t2);
      } }))));
    } }, { key: "_send_retriable_request", value: function(e6) {
      this._retryQueue ? this._retryQueue.retriableRequest(e6) : this._send_request(e6);
    } }, { key: "_execute_array", value: function(e6) {
      var t2, n2 = this, i2 = [], r2 = [], s2 = [];
      z(e6, function(e7) {
        e7 && (t2 = e7[0], m(t2) ? s2.push(e7) : y(e7) ? e7.call(n2) : m(e7) && "alias" === t2 ? i2.push(e7) : m(e7) && -1 !== t2.indexOf("capture") && y(n2[t2]) ? s2.push(e7) : r2.push(e7));
      });
      var o2 = function(e7, t3) {
        z(e7, function(e8) {
          if (m(e8[0])) {
            var n3 = t3;
            Q(e8, function(e9) {
              n3 = n3[e9[0]].apply(n3, e9.slice(1));
            });
          } else
            this[e8[0]].apply(this, e8.slice(1));
        }, t3);
      };
      o2(i2, this), o2(r2, this), o2(s2, this);
    } }, { key: "_hasBootstrappedFeatureFlags", value: function() {
      var e6, t2;
      return (null === (e6 = this.config.bootstrap) || void 0 === e6 ? void 0 : e6.featureFlags) && Object.keys(null === (t2 = this.config.bootstrap) || void 0 === t2 ? void 0 : t2.featureFlags).length > 0 || false;
    } }, { key: "push", value: function(e6) {
      this._execute_array([e6]);
    } }, { key: "capture", value: function(e6, n2, i2) {
      var r2;
      if (this.__loaded && this.persistence && this.sessionPersistence && this._requestQueue) {
        if (!this.consent.isOptedOut())
          if (!w(e6) && S(e6)) {
            if (this.config.opt_out_useragent_filter || !this._is_bot()) {
              var s2 = null != i2 && i2.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
              if (null == s2 || !s2.isRateLimited) {
                this.sessionPersistence.update_search_keyword(), this.config.store_google && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.store_google || this.config.save_referrer) && this.persistence.set_initial_person_info();
                var o2 = new Date(), a2 = (null == i2 ? void 0 : i2.timestamp) || o2, u2 = { uuid: Ze(), event: e6, properties: this._calculate_event_properties(e6, n2 || {}, a2) };
                s2 && (u2.properties.$lib_rate_limit_remaining_tokens = s2.remainingTokens), (null == i2 ? void 0 : i2.$set) && (u2.$set = null == i2 ? void 0 : i2.$set);
                var l2 = this._calculate_set_once_properties(null == i2 ? void 0 : i2.$set_once);
                l2 && (u2.$set_once = l2), (u2 = ie(u2, null != i2 && i2._noTruncate ? null : this.config.properties_string_max_length)).timestamp = a2, w(null == i2 ? void 0 : i2.timestamp) || (u2.properties.$event_time_override_provided = true, u2.properties.$event_time_override_system_time = o2);
                var c2 = t(t({}, u2.properties.$set), u2.$set);
                k(c2) || this.setPersonPropertiesForFlags(c2), this._internalEventEmitter.emit("eventCaptured", u2);
                var d2 = { method: "POST", url: null !== (r2 = null == i2 ? void 0 : i2._url) && void 0 !== r2 ? r2 : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), data: u2, compression: "best-available", batchKey: null == i2 ? void 0 : i2._batchKey };
                return !this.config.request_batching || i2 && (null == i2 || !i2._batchKey) || null != i2 && i2.send_instantly ? this._send_retriable_request(d2) : this._requestQueue.enqueue(d2), u2;
              }
              V.critical("This capture call is ignored due to client rate limiting.");
            }
          } else
            V.error("No event name provided to posthog.capture");
      } else
        V.uninitializedWarning("posthog.capture");
    } }, { key: "_addCaptureHook", value: function(e6) {
      return this.on("eventCaptured", function(t2) {
        return e6(t2.event, t2);
      });
    } }, { key: "_calculate_event_properties", value: function(e6, n2, i2) {
      if (i2 = i2 || new Date(), !this.persistence || !this.sessionPersistence)
        return n2;
      var r2 = this.persistence.remove_event_timer(e6), s2 = t({}, n2);
      if (s2.token = this.config.token, "$snapshot" === e6) {
        var o2 = t(t({}, this.persistence.properties()), this.sessionPersistence.properties());
        return s2.distinct_id = o2.distinct_id, (!S(s2.distinct_id) && !F(s2.distinct_id) || E(s2.distinct_id)) && V.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), s2;
      }
      var a2 = yn.properties();
      if (this.sessionManager) {
        var u2 = this.sessionManager.checkAndGetSessionAndWindowId(), l2 = u2.sessionId, c2 = u2.windowId;
        s2.$session_id = l2, s2.$window_id = c2;
      }
      if (this.requestRouter.region === lr.CUSTOM && (s2.$lib_custom_api_host = this.config.api_host), this.sessionPropsManager && this.config.__preview_send_client_session_params && ("$pageview" === e6 || "$pageleave" === e6 || "$autocapture" === e6)) {
        var d2 = this.sessionPropsManager.getSessionProps();
        s2 = J(s2, d2);
      }
      if (!this.config.disable_scroll_properties) {
        var h2 = {};
        "$pageview" === e6 ? h2 = this.pageViewManager.doPageView(i2) : "$pageleave" === e6 && (h2 = this.pageViewManager.doPageLeave(i2)), s2 = J(s2, h2);
      }
      if ("$pageview" === e6 && L && (s2.title = L.title), !w(r2)) {
        var f2 = i2.getTime() - r2;
        s2.$duration = parseFloat((f2 / 1e3).toFixed(3));
      }
      H && this.config.opt_out_useragent_filter && (s2.$browser_type = this._is_bot() ? "bot" : "browser"), (s2 = J({}, a2, this.persistence.properties(), this.sessionPersistence.properties(), s2)).$is_identified = this._isIdentified(), m(this.config.property_denylist) ? Q(this.config.property_denylist, function(e7) {
        delete s2[e7];
      }) : V.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
      var v2 = this.config.sanitize_properties;
      return v2 && (s2 = v2(s2, e6)), s2.$process_person_profile = this._hasPersonProcessing(), s2;
    } }, { key: "_calculate_set_once_properties", value: function(e6) {
      if (!this.persistence || !this._hasPersonProcessing())
        return e6;
      var t2 = J({}, this.persistence.get_initial_props(), e6 || {});
      return k(t2) ? void 0 : t2;
    } }, { key: "register", value: function(e6, t2) {
      var n2;
      null === (n2 = this.persistence) || void 0 === n2 || n2.register(e6, t2);
    } }, { key: "register_once", value: function(e6, t2, n2) {
      var i2;
      null === (i2 = this.persistence) || void 0 === i2 || i2.register_once(e6, t2, n2);
    } }, { key: "register_for_session", value: function(e6) {
      var t2;
      null === (t2 = this.sessionPersistence) || void 0 === t2 || t2.register(e6);
    } }, { key: "unregister", value: function(e6) {
      var t2;
      null === (t2 = this.persistence) || void 0 === t2 || t2.unregister(e6);
    } }, { key: "unregister_for_session", value: function(e6) {
      var t2;
      null === (t2 = this.sessionPersistence) || void 0 === t2 || t2.unregister(e6);
    } }, { key: "_register_single", value: function(e6, t2) {
      this.register(o({}, e6, t2));
    } }, { key: "getFeatureFlag", value: function(e6, t2) {
      return this.featureFlags.getFeatureFlag(e6, t2);
    } }, { key: "getFeatureFlagPayload", value: function(e6) {
      var t2 = this.featureFlags.getFeatureFlagPayload(e6);
      try {
        return JSON.parse(t2);
      } catch (e7) {
        return t2;
      }
    } }, { key: "isFeatureEnabled", value: function(e6, t2) {
      return this.featureFlags.isFeatureEnabled(e6, t2);
    } }, { key: "reloadFeatureFlags", value: function() {
      this.featureFlags.reloadFeatureFlags();
    } }, { key: "updateEarlyAccessFeatureEnrollment", value: function(e6, t2) {
      this.featureFlags.updateEarlyAccessFeatureEnrollment(e6, t2);
    } }, { key: "getEarlyAccessFeatures", value: function(e6) {
      var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      return this.featureFlags.getEarlyAccessFeatures(e6, t2);
    } }, { key: "on", value: function(e6, t2) {
      return this._internalEventEmitter.on(e6, t2);
    } }, { key: "onFeatureFlags", value: function(e6) {
      return this.featureFlags.onFeatureFlags(e6);
    } }, { key: "onSessionId", value: function(e6) {
      var t2, n2;
      return null !== (t2 = null === (n2 = this.sessionManager) || void 0 === n2 ? void 0 : n2.onSessionId(e6)) && void 0 !== t2 ? t2 : function() {
      };
    } }, { key: "getSurveys", value: function(e6) {
      var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      this.surveys.getSurveys(e6, t2);
    } }, { key: "getActiveMatchingSurveys", value: function(e6) {
      var t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      this.surveys.getActiveMatchingSurveys(e6, t2);
    } }, { key: "renderSurvey", value: function(e6, t2) {
      this.surveys.renderSurvey(e6, t2);
    } }, { key: "canRenderSurvey", value: function(e6) {
      this.surveys.canRenderSurvey(e6);
    } }, { key: "getNextSurveyStep", value: function(e6, t2, n2) {
      return this.surveys.getNextSurveyStep(e6, t2, n2);
    } }, { key: "identify", value: function(e6, t2, n2) {
      if (!this.__loaded || !this.persistence)
        return V.uninitializedWarning("posthog.identify");
      if (F(e6) && (e6 = e6.toString(), V.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), e6) {
        if (["distinct_id", "distinctid"].includes(e6.toLowerCase()))
          V.critical('The string "'.concat(e6, '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.'));
        else if (this._requirePersonProcessing("posthog.identify")) {
          var i2 = this.get_distinct_id();
          if (this.register({ $user_id: e6 }), !this.get_property("$device_id")) {
            var r2 = i2;
            this.register_once({ $had_persisted_distinct_id: true, $device_id: r2 }, "");
          }
          e6 !== i2 && e6 !== this.get_property(ce) && (this.unregister(ce), this.register({ distinct_id: e6 }));
          var s2 = "anonymous" === (this.persistence.get_property(Oe) || "anonymous");
          e6 !== i2 && s2 ? (this.persistence.set_property(Oe, "identified"), this.setPersonPropertiesForFlags(t2 || {}, false), this.capture("$identify", { distinct_id: e6, $anon_distinct_id: i2 }, { $set: t2 || {}, $set_once: n2 || {} }), this.featureFlags.setAnonymousDistinctId(i2)) : (t2 || n2) && this.setPersonProperties(t2, n2), e6 !== i2 && (this.reloadFeatureFlags(), this.unregister($e));
        }
      } else
        V.error("Unique user id has not been set in posthog.identify");
    } }, { key: "setPersonProperties", value: function(e6, t2) {
      (e6 || t2) && this._requirePersonProcessing("posthog.setPersonProperties") && (this.setPersonPropertiesForFlags(e6 || {}), this.capture("$set", { $set: e6 || {}, $set_once: t2 || {} }));
    } }, { key: "group", value: function(e6, n2, i2) {
      if (e6 && n2) {
        if (this._requirePersonProcessing("posthog.group")) {
          var r2 = this.getGroups();
          r2[e6] !== n2 && this.resetGroupPropertiesForFlags(e6), this.register({ $groups: t(t({}, r2), {}, o({}, e6, n2)) }), i2 && (this.capture("$groupidentify", { $group_type: e6, $group_key: n2, $group_set: i2 }), this.setGroupPropertiesForFlags(o({}, e6, i2))), r2[e6] === n2 || i2 || this.reloadFeatureFlags();
        }
      } else
        V.error("posthog.group requires a group type and group key");
    } }, { key: "resetGroups", value: function() {
      this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
    } }, { key: "setPersonPropertiesForFlags", value: function(e6) {
      var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      this._requirePersonProcessing("posthog.setPersonPropertiesForFlags") && this.featureFlags.setPersonPropertiesForFlags(e6, t2);
    } }, { key: "resetPersonPropertiesForFlags", value: function() {
      this.featureFlags.resetPersonPropertiesForFlags();
    } }, { key: "setGroupPropertiesForFlags", value: function(e6) {
      var t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      this._requirePersonProcessing("posthog.setGroupPropertiesForFlags") && this.featureFlags.setGroupPropertiesForFlags(e6, t2);
    } }, { key: "resetGroupPropertiesForFlags", value: function(e6) {
      this.featureFlags.resetGroupPropertiesForFlags(e6);
    } }, { key: "reset", value: function(e6) {
      var t2, n2, i2, r2;
      if (V.info("reset"), !this.__loaded)
        return V.uninitializedWarning("posthog.reset");
      var s2 = this.get_property("$device_id");
      this.consent.reset(), null === (t2 = this.persistence) || void 0 === t2 || t2.clear(), null === (n2 = this.sessionPersistence) || void 0 === n2 || n2.clear(), null === (i2 = this.persistence) || void 0 === i2 || i2.set_property(Oe, "anonymous"), null === (r2 = this.sessionManager) || void 0 === r2 || r2.resetSessionId();
      var o2 = this.config.get_device_id(Ze());
      this.register_once({ distinct_id: o2, $device_id: e6 ? o2 : s2 }, "");
    } }, { key: "get_distinct_id", value: function() {
      return this.get_property("distinct_id");
    } }, { key: "getGroups", value: function() {
      return this.get_property("$groups") || {};
    } }, { key: "get_session_id", value: function() {
      var e6, t2;
      return null !== (e6 = null === (t2 = this.sessionManager) || void 0 === t2 ? void 0 : t2.checkAndGetSessionAndWindowId(true).sessionId) && void 0 !== e6 ? e6 : "";
    } }, { key: "get_session_replay_url", value: function(e6) {
      if (!this.sessionManager)
        return "";
      var t2 = this.sessionManager.checkAndGetSessionAndWindowId(true), n2 = t2.sessionId, i2 = t2.sessionStartTimestamp, r2 = this.requestRouter.endpointFor("ui", "/project/".concat(this.config.token, "/replay/").concat(n2));
      if (null != e6 && e6.withTimestamp && i2) {
        var s2, o2 = null !== (s2 = e6.timestampLookBack) && void 0 !== s2 ? s2 : 10;
        if (!i2)
          return r2;
        var a2 = Math.max(Math.floor((new Date().getTime() - i2) / 1e3) - o2, 0);
        r2 += "?t=".concat(a2);
      }
      return r2;
    } }, { key: "alias", value: function(e6, t2) {
      return e6 === this.get_property(le) ? (V.critical("Attempting to create alias for existing People user - aborting."), -2) : this._requirePersonProcessing("posthog.alias") ? (w(t2) && (t2 = this.get_distinct_id()), e6 !== t2 ? (this._register_single(ce, e6), this.capture("$create_alias", { alias: e6, distinct_id: t2 })) : (V.warn("alias matches current distinct_id - skipping api call."), this.identify(e6), -1)) : void 0;
    } }, { key: "set_config", value: function(e6) {
      var n2, i2, r2, s2, o2 = t({}, this.config);
      b(e6) && (J(this.config, is(e6)), null === (n2 = this.persistence) || void 0 === n2 || n2.update_config(this.config, o2), this.sessionPersistence = "sessionStorage" === this.config.persistence ? this.persistence : new kn(t(t({}, this.config), {}, { persistence: "sessionStorage" })), ut.is_supported() && "true" === ut.get("ph_debug") && (this.config.debug = true), this.config.debug && (f.DEBUG = true, V.info("set_config", { config: e6, oldConfig: o2, newConfig: t({}, this.config) })), null === (i2 = this.sessionRecording) || void 0 === i2 || i2.startIfEnabledOrStop(), null === (r2 = this.autocapture) || void 0 === r2 || r2.startIfEnabled(), null === (s2 = this.heatmaps) || void 0 === s2 || s2.startIfEnabled(), this.surveys.loadIfEnabled(), this._sync_opt_out_with_persistence());
    } }, { key: "startSessionRecording", value: function(e6) {
      var t2, n2 = x(e6) && e6;
      if (n2 || null != e6 && e6.sampling) {
        var i2, r2, s2 = null === (i2 = this.sessionManager) || void 0 === i2 ? void 0 : i2.checkAndGetSessionAndWindowId();
        null === (r2 = this.persistence) || void 0 === r2 || r2.register(o({}, Ie, true)), V.info("Session recording started with sampling override for session: ", null == s2 ? void 0 : s2.sessionId);
      }
      (n2 || null != e6 && e6.linked_flag) && (null === (t2 = this.sessionRecording) || void 0 === t2 || t2.overrideLinkedFlag(), V.info("Session recording started with linked_flags override"));
      this.set_config({ disable_session_recording: false });
    } }, { key: "stopSessionRecording", value: function() {
      this.set_config({ disable_session_recording: true });
    } }, { key: "sessionRecordingStarted", value: function() {
      var e6;
      return !(null === (e6 = this.sessionRecording) || void 0 === e6 || !e6.started);
    } }, { key: "captureException", value: function(e6, n2) {
      var i2 = y(U.parseErrorAsProperties) ? U.parseErrorAsProperties([e6.message, void 0, void 0, void 0, e6]) : t({ $exception_type: e6.name, $exception_message: e6.message, $exception_level: "error" }, n2);
      this.exceptions.sendExceptionEvent(i2);
    } }, { key: "loadToolbar", value: function(e6) {
      return this.toolbar.loadToolbar(e6);
    } }, { key: "get_property", value: function(e6) {
      var t2;
      return null === (t2 = this.persistence) || void 0 === t2 ? void 0 : t2.props[e6];
    } }, { key: "getSessionProperty", value: function(e6) {
      var t2;
      return null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.props[e6];
    } }, { key: "toString", value: function() {
      var e6, t2 = null !== (e6 = this.config.name) && void 0 !== e6 ? e6 : es;
      return t2 !== es && (t2 = es + "." + t2), t2;
    } }, { key: "_isIdentified", value: function() {
      var e6, t2;
      return "identified" === (null === (e6 = this.persistence) || void 0 === e6 ? void 0 : e6.get_property(Oe)) || "identified" === (null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.get_property(Oe));
    } }, { key: "_hasPersonProcessing", value: function() {
      var e6, t2, n2, i2;
      return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && k(this.getGroups()) && (null === (e6 = this.persistence) || void 0 === e6 || null === (t2 = e6.props) || void 0 === t2 || !t2[ce]) && (null === (n2 = this.persistence) || void 0 === n2 || null === (i2 = n2.props) || void 0 === i2 || !i2[qe]));
    } }, { key: "_shouldCapturePageleave", value: function() {
      return true === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && this.config.capture_pageview;
    } }, { key: "createPersonProfile", value: function() {
      this._hasPersonProcessing() || this._requirePersonProcessing("posthog.createPersonProfile") && this.setPersonProperties({}, {});
    } }, { key: "_requirePersonProcessing", value: function(e6) {
      return "never" === this.config.person_profiles ? (V.error(e6 + ' was called, but process_person is set to "never". This call will be ignored.'), false) : (this._register_single(qe, true), true);
    } }, { key: "_sync_opt_out_with_persistence", value: function() {
      var e6, t2, n2, i2, r2 = this.consent.isOptedOut(), s2 = this.config.opt_out_persistence_by_default, o2 = this.config.disable_persistence || r2 && !!s2;
      (null === (e6 = this.persistence) || void 0 === e6 ? void 0 : e6.disabled) !== o2 && (null === (n2 = this.persistence) || void 0 === n2 || n2.set_disabled(o2));
      (null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.disabled) !== o2 && (null === (i2 = this.sessionPersistence) || void 0 === i2 || i2.set_disabled(o2));
    } }, { key: "opt_in_capturing", value: function(e6) {
      var t2;
      (this.consent.optInOut(true), this._sync_opt_out_with_persistence(), w(null == e6 ? void 0 : e6.captureEventName) || null != e6 && e6.captureEventName) && this.capture(null !== (t2 = null == e6 ? void 0 : e6.captureEventName) && void 0 !== t2 ? t2 : "$opt_in", null == e6 ? void 0 : e6.captureProperties, { send_instantly: true });
      this.config.capture_pageview && this._captureInitialPageview();
    } }, { key: "opt_out_capturing", value: function() {
      this.consent.optInOut(false), this._sync_opt_out_with_persistence();
    } }, { key: "has_opted_in_capturing", value: function() {
      return this.consent.isOptedIn();
    } }, { key: "has_opted_out_capturing", value: function() {
      return this.consent.isOptedOut();
    } }, { key: "clear_opt_in_out_capturing", value: function() {
      this.consent.reset(), this._sync_opt_out_with_persistence();
    } }, { key: "_is_bot", value: function() {
      return A ? function(e6, t2) {
        if (!e6)
          return false;
        var n2 = e6.userAgent;
        if (n2 && Mr(n2, t2))
          return true;
        try {
          var i2 = null == e6 ? void 0 : e6.userAgentData;
          if (null != i2 && i2.brands && i2.brands.some(function(e7) {
            return Mr(null == e7 ? void 0 : e7.brand, t2);
          }))
            return true;
        } catch (e7) {
        }
        return !!e6.webdriver;
      }(A, this.config.custom_blocked_useragents) : void 0;
    } }, { key: "_captureInitialPageview", value: function() {
      L && !this._initialPageviewCaptured && (this._initialPageviewCaptured = true, this.capture("$pageview", { title: L.title }, { send_instantly: true }));
    } }, { key: "debug", value: function(e6) {
      false === e6 ? (null == C || C.console.log("You've disabled debug mode."), localStorage && localStorage.removeItem("ph_debug"), this.set_config({ debug: false })) : (null == C || C.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), localStorage && localStorage.setItem("ph_debug", "true"), this.set_config({ debug: true }));
    } }]), e5;
  }();
  !function(e5, t2) {
    for (var n2 = 0; n2 < t2.length; n2++)
      e5.prototype[t2[n2]] = ee(e5.prototype[t2[n2]]);
  }(ss, ["identify"]);
  var os;
  var as = (os = Kr[es] = new ss(), function() {
    function e5() {
      e5.done || (e5.done = true, ts = false, Q(Kr, function(e6) {
        e6._dom_loaded();
      }));
    }
    null != L && L.addEventListener && ("complete" === L.readyState ? e5() : L.addEventListener("DOMContentLoaded", e5, false)), C && oe(C, "load", e5, true);
  }(), os);

  // src/features/hotkeys.ts
  var Hotkeys = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      window["sa5"].push([
        "hotkeys",
        (hotkeyHandler) => {
          hotkeyHandler.register("f1", () => {
            window.location.href = `/about`;
          });
          hotkeyHandler.register("f2", () => {
            window.location.href = `/u/home`;
          });
          hotkeyHandler.register("ctrl+p", () => {
            window.location.href = `/search`;
          });
          hotkeyHandler.register("ctrl+alt+shift+m", () => {
            console.log("test");
            const docsUrl = `https://www.mindomo.com/mindmap/15e2b12a299a4a929225effc1292a1dd`;
            if (docsUrl)
              window.open(docsUrl, "_blank");
          });
          hotkeyHandler.register("ctrl+alt+m", () => {
            var _a;
            let docsUrl = ((_a = document.querySelector("meta[name='page:notes:mindmap']")) == null ? void 0 : _a.getAttribute("content")) || null;
            console.log("ctrl+alt+m");
            if (docsUrl) {
              window.open(docsUrl, "_blank");
            }
          });
          hotkeyHandler.register("ctrl+alt+f", () => {
            var _a;
            console.log("ctrl+alt+f");
            var docsUrl = (_a = document.querySelector("meta[name='page:notes:folder']")) == null ? void 0 : _a.getAttribute("content");
            console.log(`docsUrl = ${docsUrl}`);
            if (docsUrl)
              window.open(docsUrl, "_blank");
          });
          hotkeyHandler.register("ctrl+alt+n", () => {
            var _a;
            console.log("ctrl+alt+n");
            var docsUrl = (_a = document.querySelector("meta[name='page:notes:mindmap']")) == null ? void 0 : _a.getAttribute("content");
            console.log(`docsUrl = ${docsUrl}`);
            if (docsUrl)
              window.open(docsUrl, "_blank");
          });
          hotkeyHandler.register("ctrl+f, shift+ctrl+f", () => {
            const dropdownToggle = document.querySelector("#menu-search .w-dropdown-toggle");
            dropdownToggle.dispatchEvent(new Event("mousedown"));
            dropdownToggle.dispatchEvent(new Event("mouseup"));
            const search = document.querySelector("#search-input");
            search.focus();
            search.click();
          });
        }
      ]);
    }
  };

  // src/site.ts
  var Site = class {
    constructor() {
      this.featureHotkeys = new Hotkeys();
    }
    setup() {
      Page.loadEngineCSS("site.css");
      as.init(
        "phc_se1bfwKVlMOkf6sVnUKlHaxEoyCuE4nUt07fyHM6yWN",
        {
          api_host: "https://us.i.posthog.com",
          person_profiles: "identified_only"
        }
      );
      this.featureHotkeys.setup();
    }
    exec() {
      this.featureHotkeys.exec();
      as.onFeatureFlags(function() {
        if (as.isFeatureEnabled("alerts")) {
          const alertElements = document.querySelectorAll('[sse-component="alerts"]');
          alertElements.forEach((element) => {
            element.style.display = "block";
            console.log("color:", as.getFeatureFlag("alerts-color"));
            if (as.getFeatureFlag("alerts-color") === "red") {
              element.querySelectorAll(".alert-banner_link").forEach((e5) => {
                e5.style.backgroundColor = "var(--sygnal-red-2)";
              });
            } else {
            }
          });
        }
      });
    }
  };

  // src/page/services.ts
  var ServicesPage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      const form = document.getElementById("email-form");
      console.log("form found");
      if (form) {
        form.addEventListener("submit", (event) => {
          const emailInput = form.querySelector('[data-name="Email"]');
          console.log("submission occurred", emailInput);
          if (emailInput) {
            const email = emailInput.value;
            console.log("Logging email:", email);
            as.identify(email);
          }
        });
      }
    }
  };

  // src/routes.ts
  var routeDispatcher = () => {
    var routeDispatcher2 = new RouteDispatcher(Site);
    routeDispatcher2.routes = {
      "/services/*": ServicesPage
    };
    return routeDispatcher2;
  };
})();
/*! js-cookie v3.0.5 | MIT */
//# sourceMappingURL=routes.js.map
