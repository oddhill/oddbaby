(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Simple throttle lib, using requestAnimationFrame.
 * Based on examples from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */

"use strict";

(function (global, $) {
  var ticking = false;
  var callbacks = {};

  function throttle() {
    return {
      add: add
    };
  }

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
    if (ticking || !window.requestAnimationFrame) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      run(event);
    });
  }

  // Run our callbacks
  function run(event) {
    callbacks[event].forEach(function (cb) {
      cb();
    });

    ticking = false;
  }

  global.throttle = throttle;
})(undefined, jQuery);

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

},{"./lib/throttle":1,"./lib/utils":2}]},{},[3]);
