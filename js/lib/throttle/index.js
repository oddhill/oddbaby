/**
 * Simple throttle function, using requestAnimationFrame.
 */

const wait = (function () {
  if (window.requestAnimationFrame) return window.requestAnimationFrame;

  return function (cb) {
    window.setTimeout(cb, 100);
  };
})();

let running = false;

export default function throttle(cb) {
  return () => {
    if (running) return;
    running = true;

    wait(() => {
      cb.apply();
      running = false;
    });
  };
}
