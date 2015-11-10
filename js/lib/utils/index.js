import $ from 'jquery';
import Modernizr from 'modernizr';

export function replaceSVG() {
  // If SVG is not supported replace it with png version
  if (!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', () => {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }
}
