<?php
/**  
 * Uncomment if you want to enable apple touch icons.
 * Create icons in sizes 57x57, 72x72 and 114x114
 */
/* <-- REMOVE THIS LINE -->
// iPhone.
$icons['iphone_icon'] = array(
  'href' => file_create_url(drupal_get_path('theme','ORIGIN') . '/apple-touch-icon-iphone.png'),
  'rel' => 'apple-touch-icon',
);
// iPad.
$icons['ipad_icon'] = array(
  'href' => file_create_url(drupal_get_path('theme','ORIGIN') . '/apple-touch-icon-ipad.png'),
  'rel' => 'apple-touch-icon',
  'sizes' => '72x72',
);
// iPhone 4.
$icons['iphone4_icon'] = array(
  'href' => file_create_url(drupal_get_path('theme','ORIGIN') . '/apple-touch-icon-iphone4.png'),
  'rel' => 'apple-touch-icon',
  'sizes' => '114x114',
);
// Add the icons to <head>.
foreach ($icons as $key => $icon) {
  $element = array(
    '#tag' => 'link',
    '#attributes' => array(
      'href' => $icon['href'], 
      'rel' => $icon['rel'],
      'sizes' => $icon['sizes'],
    ),
  );
  drupal_add_html_head($element, $key);
}
*/ //<-- REMOVE THIS LINE -->

/**
 * Implements hook_css_alter().
 * This keeps system and module css files from being
 * rendered by drupal.
 *
 * Omitted:
 * - color.css
 * - contextual.css
 * - dashboard.css
 * - field_ui.css
 * - image.css
 * - locale.css
 * - shortcut.css
 * - simpletest.css
 * - toolbar.css
 */
function origin_css_alter(&$css) {
  $exclude = array(
    'modules/system/system.menus.css' => FALSE,
    'modules/system/system.messages.css' => FALSE,
    'modules/system/system.theme.css' => FALSE,
  );
  $css = array_diff_key($css, $exclude);
}

/**
 * Implements template_preprocess_node().
 */
function origin_preprocess_node(&$variables) {
  // Add the view mode to the template suggestions.
  $suggestions = array();
  foreach ($variables['theme_hook_suggestions'] as $suggestion) {
    $suggestions[] = $suggestion;
    $suggestions[] = $suggestion . '__' . $variables['view_mode'];
  }
  $variables['theme_hook_suggestions'] = $suggestions;
}

/**
 * Implements template_preprocess_field(),
 */
function origin_preprocess_field(&$variables, $hook) {
  // Add the view mode to the template suggestions.
  $suggestions = array();
  foreach ($variables['theme_hook_suggestions'] as $suggestion) {
    $suggestions[] = $suggestion;
    $suggestions[] = $suggestion . '__' . $variables['view_mode'];
  }
  $variables['theme_hook_suggestions'] = $suggestions;
}

/**
 * Implements template_preprocess_block(),
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
 * Overrides theme_menu_local_tasks().
 */
function origin_menu_local_tasks($variables) {
  // Add Contextual links library, if it hasn't been added already.
  drupal_add_library('contextual', 'contextual-links');

  $output = '';
  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<div class="contextual-links-wrapper"><ul class="contextual-links">';
    $variables['primary']['#suffix'] = '</ul></div>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<ul class="tabs secondary clearfix">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }
  
  return $output;
}