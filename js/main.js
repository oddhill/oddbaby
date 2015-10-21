/* Globals jQuery, Drupal */

// Require libs
import Modernizr from './vendor/modernizr/modernizr.js';
import utils from './lib/utils';
import throttle from './lib/throttle';

void function ($) {
  // Run when DOM is ready
  $(document).ready(function () {
    // If SVG is not supported replace it with png version
    utils.svgToPng()
  });

  // Run when DOM is changed
  Drupal.behaviors.ODDBABY = {
    attach: function (context, settings) {

    }
  };

  // Throttle window events

  // Run on window resize
  // throttle.add('resize', myFunction);

  // Run on window scroll
  // throttle.add('scroll', myFunction);
}(jQuery);
