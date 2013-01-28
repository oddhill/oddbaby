<?php
/**
 * @file
 * TODO: Comment this file.
 */

/**
 * Implements template_preprocess_node().
 */
function origin_preprocess_node(&$variables) {

}


/**
 * Implements template_preprocess_block().
 */
function origin_preprocess_block(&$variables) {
  // Alter the title for some blocks.
  // Manually configured here, because Features doesn't export block configurations.
  switch ($variables['block']->bid) {
    case 'system-main-menu':
      $variables['block']->subject = '';
      break;
  }
}

/**
 * Implements template_preprocess_blockify_logo().
 */
function origin_preprocess_blockify_logo(&$variables) {
  // Change the url of the logo to the graphics folder.
  $variables['logo_path'] = file_create_url(drupal_get_path('theme', 'origin') . '/graphics/logo.png');
}