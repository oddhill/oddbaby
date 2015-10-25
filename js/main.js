/* global Drupal */

// Import libs
import $ from 'jquery';
import Modernizr from 'modernizr';
import utils from 'lib/utils';

// Import throttle lib
// import throttle from 'lib/throttle';

// Require responsive behavior
// import responsive from './responsive.js';

(void function () {
  // Run when DOM is ready
  $(() => {
    // If SVG is not supported replace it with png version
    utils.replaceSVG();
  });

  // Run when DOM is changed
  Drupal.behaviors.ODDBABY = {
    attach: (context, settings) => {

    }
  };

  // Throttle window events

  // Run on window resize
  // throttle.add('resize', myFunction);

  // Run on window scroll
  // throttle.add('scroll', myFunction);
})();
