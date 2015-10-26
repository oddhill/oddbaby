// Import libs
import $ from 'jquery';
import * as utils from 'lib/utils';

(void () => {
  // Run when DOM is ready
  $(() => {
    // If SVG is not supported replace it with png version
    utils.replaceSVG();
  });

  // Run when DOM is changed
  Drupal.behaviors.ODDBABY = {
    attach: () => {

    }
  };
})();
