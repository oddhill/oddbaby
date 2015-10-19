/**
 * Simple throttle lib, using requestAnimationFrame.
 * Based on examples from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */

(function (global, $) {
  var ticking = false
  var callbacks = {}

  function throttle () {
    return {
      add: add
    }
  }

  // Add a callback to be fired on a certain event.
  function add (event, callback) {
    if (!callback || !event) return
    if (!callbacks.length) {
      $(window).on(event, function () {
        update(event)
      })
    }
    callbacks[event].push(callback)
  }

  // Runs rAF
  function update (event) {
    if (ticking || !window.requestAnimationFrame) return
    ticking = true
    window.requestAnimationFrame(function () {
      run(event)
    })
  }

  // Run our callbacks
  function run (event) {
    callbacks[event].forEach(function (cb) {
      cb()
    })

    ticking = false
  }

  global.throttle = throttle
}(this, jQuery))
