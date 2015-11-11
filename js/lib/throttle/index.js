/**
 * Simple throttle lib, using requestAnimationFrame.
 * Based on examples from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */

import $ from 'jquery';

const throttle = {};
const callbacks = {};
let ticking = false;

// Run our callbacks
function run(event) {
  callbacks[event].forEach(function (cb) {
    cb();
  });

  ticking = false;
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

// Add a callback to be fired on a certain event.
throttle.add = function (event, callback) {
  if (!callback || !event) return;
  if (callbacks[event] === undefined) {
    callbacks[event] = [];
    $(window).on(event, function () {
      update(event);
    });
  }

  callbacks[event].push(callback);
}

export default throttle;
