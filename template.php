<?php
/**
 * @file
 * Main PHP file for this theme.
 *
 * This will contain any hooks and custom functions that are being used for this
 * theme. It's also responsible for loading the preprocess.inc and theme.inc
 * files.
 */

/**
 * Implements hook_html_head_alter().
 */
function origin_html_head_alter(&$head_elements) {
  // Add a tag that disables the compatibility mode in IE.
  $head_elements['disable_compatibility_mode'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'http-equiv' => 'X-UA-Compatible',
      'content' => 'IE=Edge',
    ),
  );
}

/**
 * Implements hook_css_alter().
 */
function origin_css_alter(&$css) {
  // Specify the CSS files that we want to include.
  $include = array(
    'modules/system/system.base.css',
    'profiles/odddrupal/modules/custom/fanta/fanta.css',
    'profiles/odddrupal/modules/contrib/date/date_popup/themes/datepicker.1.7.css',
    'profiles/odddrupal/modules/contrib/extlink/extlink.css',
    'modules/contextual/contextual.css',
    'profiles/odddrupal/modules/contrib/admin_menu/admin_menu.css',
    'profiles/odddrupal/modules/contrib/admin_menu/admin_menu.uid1.css',
    'profiles/odddrupal/modules/contrib/admin_menu/admin_menu_toolbar/admin_menu_toolbar.css',
    'modules/shortcut/shortcut.css',
  );

  // Get the path to this theme. We'd like to keep every CSS file that's been
  // added to the theme.
  $origin_path = drupal_get_path('theme', 'origin');

  // Iterate through the loaded CSS file, and remove the ones that hasn't been
  // specified in the array above, or isn't located in the path for this theme.
  foreach ($css as $key => $data) {
    if (!in_array($key, $include) && strpos($key, $origin_path) !== 0) {
      unset($css[$key]);
    }
  }
}

/**
 * Implements hook_css_alter().
 */
function origin_js_alter(&$js) {
  // Specify the javascript files that we want to exclude.
  $exclude = array(
    'profiles/odddrupal/modules/contrib/views/js/jquery.ui.dialog.patch.js',
    'profiles/odddrupal/modules/contrib/boxes/boxes.js',
    'profiles/odddrupal/modules/contrib/context/plugins/context_reaction_block.js',
  );

  // Iterate through each excluded javascript file, and remove it from the
  // loaded files.
  foreach ($exclude as $file) {
    unset($js[$file]);
  }

  // Replace the jQuery version that's provided bu jQuery update with a version
  // of our choise.
  $js['https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'] = $js['https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js'];
  $js['https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js']['data'] = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
  $js['https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js']['version'] = '1.7.2';
  unset($js['https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js']);
}

// Include the preprocess and theme files. These includes preprocess
// implementations and theme overrides.
include_once 'preprocess.inc';
include_once 'theme.inc';