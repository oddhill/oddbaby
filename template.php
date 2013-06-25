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
  // Specify the CSS files that we want to exclude.
  $exclude = array(
    'misc/ui/jquery.ui.core.css',
    'misc/ui/jquery.ui.theme.css',
    'misc/ui/jquery.ui.resizable.css',
    'misc/ui/jquery.ui.button.css',
    'misc/ui/jquery.ui.dialog.css',
    'modules/system/system.menus.css',
    'modules/system/system.messages.css',
    'modules/system/system.theme.css',
    'modules/node/node.css',
    'modules/user/user.css',
    'modules/field/theme/field.css',
    'profiles/odddrupal/modules/contrib/ctools/css/ctools.css',
    'profiles/odddrupal/modules/contrib/date/date_api/date.css',
    'profiles/odddrupal/modules/contrib/logintoboggan/logintoboggan.css',
    'profiles/odddrupal/modules/contrib/views/css/views.css',
    'profiles/odddrupal/modules/contrib/boxes/boxes.css',
  );

  // Iterate through each excluded CSS file, and remove it from the loaded
  // files.
  foreach ($exclude as $file) {
    unset($css[$file]);
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

  // Replace the loaded jQuery update version with a version of our choice.
  origin_jquery_update_replace(&$js, '1.7');
}

/**
 * Replace the configured jQuery update version.
 *
 * This will load the jQuery information based on the library and the
 * configuration for jQuery update. It will then replace that information with
 * information based on the version that's specified.
 *
 * @param array $js
 *   An array with JS information that's available from hook_js_alter().
 * @param string $version
 *   The version that we'd like to use instead, e.g. '1.7'.
 *
 * @see jquery_update_library_alter()
 * @see jquery_update_jquery_replace()
 */
function origin_jquery_update_replace(&$js, $version) {
  // Get the configuration for jQuery update.
  $path = drupal_get_path('module', 'jquery_update');
  $min = variable_get('jquery_update_compression_type', 'min') == 'none' ? '' : '.min';
  $cdn = variable_get('jquery_update_jquery_cdn', 'none');

  // Load the data for the current jQuery version.
  $current = array();
  jquery_update_jquery_replace(&$current, $cdn, $path, $min, variable_get('jquery_update_jquery_version', '1.5'));

  // Load the data for the jQuery version of our choice.
  $new = array();
  jquery_update_jquery_replace(&$new, $cdn, $path, $min, $version);

  // Replace the loaded jQuery JS with the information that's based on the
  // version that we just loaded.
  $js[$new['jquery']['js']['misc/jquery.js']['data']] = $js[$current['jquery']['js']['misc/jquery.js']['data']];
  $js[$new['jquery']['js']['misc/jquery.js']['data']]['data'] = $new['jquery']['js']['misc/jquery.js']['data'];
  $js[$new['jquery']['js']['misc/jquery.js']['data']]['version'] = $new['jquery']['js']['version'];
  unset($js[$current['jquery']['js']['misc/jquery.js']['data']]);

  foreach ($js as $key => &$info) {
    if ($info['data'] == $current['jquery']['js'][0]['data']) {
      $info['data'] = $new['jquery']['js'][0]['data'];
    }
  }
}

// Include the preprocess and theme files. These includes preprocess
// implementations and theme overrides.
include_once 'preprocess.inc';
include_once 'theme.inc';