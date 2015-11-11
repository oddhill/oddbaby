import enquire from 'enquire.js';

export function init() {
  // See http://wicky.nillia.ms/enquire.js for docs.
  enquire.register('screen and (max-width:800px)', {
    match() {},
    unmatch() {}
  });
}
