exports.svgToPng = function () {
  // If SVG is not supported replace it with png version
  if(!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }
}
