/**
 * Simple throttle lib, using requestAnimationFrame.
 * Based on examples from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */

import $ from 'jquery';

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
function add(event, callback) {
  if (!callback || !event) return;
  if (!callbacks.length) {
    $(window).on(event, function () {
      update(event);
    });
  }
  callbacks[event].push(callback);
}

const throttle = function () {
  return {
    add
  };
};

export default throttle;
