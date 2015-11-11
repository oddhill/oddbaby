import $ from 'jquery';
import Modernizr from 'modernizr';

const utils = {};

utils.replaceSVG = function () {
  // If SVG is not supported replace it with png version
  if (!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', () => {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }
};

export default utils;
