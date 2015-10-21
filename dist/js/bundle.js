(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Simple throttle lib, using requestAnimationFrame.
 * Based on examples from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */

"use strict";

(function ($) {
  var ticking = false;
  var callbacks = {};

  var throttle = function throttle() {
    return {
      add: add
    };
  };

  // Add a callback to be fired on a certain event.
  function add(event, callback) {
    if (!callback || !event) return;
    if (!callbacks.length) {
      $(window).on(event, function () {
        update(event);
      });
    }
    callbacks[event].push(callback);
  }

  // Runs rAF
  function update(event) {
    if (ticking) return;
    ticking = true;

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(function () {
        run(event);
      });
    } else {
      setTimeout(function () {
        run(event);
      }, 66);
    }
  }

  // Run our callbacks
  function run(event) {
    callbacks[event].forEach(function (cb) {
      cb();
    });

    ticking = false;
  }

  module.exports = throttle;
})(jQuery);

},{}],2:[function(require,module,exports){
'use strict';

exports.svgToPng = function () {
  // If SVG is not supported replace it with png version
  if (!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function () {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }
};

},{}],3:[function(require,module,exports){
/* Globals jQuery, Drupal */

// Require libs
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _vendorModernizrModernizrJs = require('./vendor/modernizr/modernizr.js');

var _vendorModernizrModernizrJs2 = _interopRequireDefault(_vendorModernizrModernizrJs);

var _libUtils = require('./lib/utils');

var _libUtils2 = _interopRequireDefault(_libUtils);

var _libThrottle = require('./lib/throttle');

var _libThrottle2 = _interopRequireDefault(_libThrottle);

void (function ($) {
  // Run when DOM is ready
  $(document).ready(function () {
    // If SVG is not supported replace it with png version
    _libUtils2['default'].svgToPng();
  });

  // Run when DOM is changed
  Drupal.behaviors.ODDBABY = {
    attach: function attach(context, settings) {}
  };

  // Throttle window events

  // Run on window resize
  // throttle.add('resize', myFunction);

  // Run on window scroll
  // throttle.add('scroll', myFunction);
})(jQuery);

},{"./lib/throttle":1,"./lib/utils":2,"./vendor/modernizr/modernizr.js":4}],4:[function(require,module,exports){
/*! modernizr 3.1.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-csstransforms-csstransforms3d-csstransitions-svg-domprefixes-prefixes-shiv-testallprops-testprop-teststyles !*/
"use strict";

!(function (e, t, n) {
  function r(e, t) {
    return typeof e === t;
  }function o() {
    var e, t, n, o, s, i, a;for (var l in S) if (S.hasOwnProperty(l)) {
      if ((e = [], t = S[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());for (o = r(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) i = e[s], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), y.push((o ? "" : "no-") + a.join("-"));
    }
  }function s(e) {
    var t = b.className,
        n = Modernizr._config.classPrefix || "";if ((w && (t = t.baseVal), Modernizr._config.enableJSClass)) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");t = t.replace(r, "$1" + n + "js$2");
    }Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), w ? b.className.baseVal = t : b.className = t);
  }function i() {
    return "function" != typeof t.createElement ? t.createElement(arguments[0]) : w ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
  }function a() {
    var e = t.body;return (e || (e = i(w ? "svg" : "body"), e.fake = !0), e);
  }function l(e, n, r, o) {
    var s,
        l,
        c,
        f,
        u = "modernizr",
        d = i("div"),
        p = a();if (parseInt(r, 10)) for (; r--;) c = i("div"), c.id = o ? o[r] : u + (r + 1), d.appendChild(c);return (s = i("style"), s.type = "text/css", s.id = "s" + u, (p.fake ? p : d).appendChild(s), p.appendChild(d), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(t.createTextNode(e)), d.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = b.style.overflow, b.style.overflow = "hidden", b.appendChild(p)), l = n(d, e), p.fake ? (p.parentNode.removeChild(p), b.style.overflow = f, b.offsetHeight) : d.parentNode.removeChild(d), !!l);
  }function c(e, t) {
    return !! ~("" + e).indexOf(t);
  }function f(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, t, n) {
      return t + n.toUpperCase();
    }).replace(/^-/, "");
  }function u(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }function d(e, t, n) {
    var o;for (var s in e) if (e[s] in t) return n === !1 ? e[s] : (o = t[e[s]], r(o, "function") ? u(o, n || t) : o);return !1;
  }function p(e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return "-" + t.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }function m(t, r) {
    var o = t.length;if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;) if (e.CSS.supports(p(t[o]), r)) return !0;return !1;
    }if ("CSSSupportsRule" in e) {
      for (var s = []; o--;) s.push("(" + p(t[o]) + ":" + r + ")");return (s = s.join(" or "), l("@supports (" + s + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == getComputedStyle(e, null).position;
      }));
    }return n;
  }function h(e, t, o, s) {
    function a() {
      u && (delete j.style, delete j.modElem);
    }if ((s = r(s, "undefined") ? !1 : s, !r(o, "undefined"))) {
      var l = m(e, o);if (!r(l, "undefined")) return l;
    }for (var u, d, p, h, g, v = ["modernizr", "tspan"]; !j.style;) u = !0, j.modElem = i(v.shift()), j.style = j.modElem.style;for (p = e.length, d = 0; p > d; d++) if ((h = e[d], g = j.style[h], c(h, "-") && (h = f(h)), j.style[h] !== n)) {
      if (s || r(o, "undefined")) return (a(), "pfx" == t ? h : !0);try {
        j.style[h] = o;
      } catch (y) {}if (j.style[h] != g) return (a(), "pfx" == t ? h : !0);
    }return (a(), !1);
  }function g(e, t, n, o, s) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + k.join(i + " ") + i).split(" ");return r(t, "string") || r(t, "undefined") ? h(a, t, o, s) : (a = (e + " " + _.join(i + " ") + i).split(" "), d(a, t, n));
  }function v(e, t, r) {
    return g(e, n, n, t, r);
  }var y = [],
      S = [],
      C = { _version: "3.1.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, t) {
      var n = this;setTimeout(function () {
        t(n[e]);
      }, 0);
    }, addTest: function addTest(e, t, n) {
      S.push({ name: e, fn: t, options: n });
    }, addAsyncTest: function addAsyncTest(e) {
      S.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = C, Modernizr = new Modernizr(), Modernizr.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);var E = C._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];C._prefixes = E;var b = t.documentElement,
      w = "svg" === b.nodeName.toLowerCase();w || !(function (e, t) {
    function n(e, t) {
      var n = e.createElement("p"),
          r = e.getElementsByTagName("head")[0] || e.documentElement;return (n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild));
    }function r() {
      var e = S.elements;return "string" == typeof e ? e.split(" ") : e;
    }function o(e, t) {
      var n = S.elements;"string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), S.elements = n + " " + e, c(t);
    }function s(e) {
      var t = y[e[g]];return (t || (t = {}, v++, e[g] = v, y[v] = t), t);
    }function i(e, n, r) {
      if ((n || (n = t), u)) return n.createElement(e);r || (r = s(n));var o;return (o = r.cache[e] ? r.cache[e].cloneNode() : h.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !o.canHaveChildren || m.test(e) || o.tagUrn ? o : r.frag.appendChild(o));
    }function a(e, n) {
      if ((e || (e = t), u)) return e.createDocumentFragment();n = n || s(e);for (var o = n.frag.cloneNode(), i = 0, a = r(), l = a.length; l > i; i++) o.createElement(a[i]);return o;
    }function l(e, t) {
      t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
        return S.shivMethods ? i(n, e, t) : t.createElem(n);
      }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function (e) {
        return (t.createElem(e), t.frag.createElement(e), 'c("' + e + '")');
      }) + ");return n}")(S, t.frag);
    }function c(e) {
      e || (e = t);var r = s(e);return (!S.shivCSS || f || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), u || l(e, r), e);
    }var f,
        u,
        d = "3.7.3",
        p = e.html5 || {},
        m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        g = "_html5shiv",
        v = 0,
        y = {};!(function () {
      try {
        var e = t.createElement("a");e.innerHTML = "<xyz></xyz>", f = "hidden" in e, u = 1 == e.childNodes.length || (function () {
          t.createElement("a");var e = t.createDocumentFragment();return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement;
        })();
      } catch (n) {
        f = !0, u = !0;
      }
    })();var S = { elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video", version: d, shivCSS: p.shivCSS !== !1, supportsUnknownElements: u, shivMethods: p.shivMethods !== !1, type: "default", shivDocument: c, createElement: i, createDocumentFragment: a, addElements: o };e.html5 = S, c(t), "object" == typeof module && module.exports && (module.exports = S);
  })("undefined" != typeof e ? e : this, t);var x = "Moz O ms Webkit",
      _ = C._config.usePrefixes ? x.toLowerCase().split(" ") : [];C._domPrefixes = _;var N = "CSS" in e && "supports" in e.CSS,
      T = ("supportsCSS" in e);Modernizr.addTest("supports", N || T);var k = C._config.usePrefixes ? x.split(" ") : [];C._cssomPrefixes = k;var P = C.testStyles = l,
      z = { elem: i("modernizr") };Modernizr._q.push(function () {
    delete z.elem;
  });var j = { style: z.elem.style };Modernizr._q.unshift(function () {
    delete j.style;
  });C.testProp = function (e, t, r) {
    return h([e], n, t, r);
  };C.testAllProps = g, C.testAllProps = v, Modernizr.addTest("csstransforms", function () {
    return -1 === navigator.userAgent.indexOf("Android 2.") && v("transform", "scale(1)", !0);
  }), Modernizr.addTest("csstransforms3d", function () {
    var e = !!v("perspective", "1px", !0),
        t = Modernizr._config.usePrefixes;if (e && (!t || "webkitPerspective" in b.style)) {
      var n;Modernizr.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}", P(n, function (t) {
        e = 9 === t.offsetLeft && 5 === t.offsetHeight;
      });
    }return e;
  }), Modernizr.addTest("csstransitions", v("transition", "all", !0)), o(), s(y), delete C.addTest, delete C.addAsyncTest;for (var F = 0; F < Modernizr._q.length; F++) Modernizr._q[F]();e.Modernizr = Modernizr;
})(window, document);

},{}]},{},[3]);
