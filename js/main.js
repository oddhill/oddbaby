/* Globals jQuery, Drupal */

// Require libs
import utils from './lib/utils';
import throttle from './lib/throttle';

// Import modernizr
import 'browsernizr/test/css/transforms';
import 'browsernizr/test/css/transforms3d';
import 'browsernizr/test/css/transitions';
import 'browsernizr/test/svg';
import 'browsernizr/lib/domPrefixes';
import 'browsernizr/lib/prefixes';
import 'browsernizr/lib/html5shiv';
import 'browsernizr/lib/testAllProps';
import 'browsernizr/lib/testProp';
import 'browsernizr/lib/testStyles';

import Modernizr from 'browsernizr';

// Require responsive behavior
// import responsive from './responsive.js';

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
