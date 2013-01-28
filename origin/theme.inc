<?php
/**
 * @file
 * TODO: Comment this file.
 */

/**
 * Overrides theme_blockify_logo().
 */
function origin_blockify_logo($variables) {
  $site_name = filter_xss_admin(variable_get('site_name', 'Drupal'));
  $page_title = drupal_get_title();

  // Strip the base_path from the beginning of the logo path.
  $path = preg_replace('|^' . base_path() . '|', '', $variables['logo_path']);

  $image = array(
    '#theme' => 'image',
    '#path' => $path,
    '#alt' => t('!site_name logo', array(
      '!site_name' => $site_name,
    )),
    '#title' => $site_name,
  );

  // Don't create a link to the front page if this is the front page. Add the
  // site name as the H1 element if there is no title for the current page.
  if (drupal_is_front_page()) {
    return ($page_title == '' ? '<h1>' . $site_name . '</h1>' : '') . render($image);
  }
  else {
    return ($page_title == '' ? '<h1>' . $site_name . '</h1>' : '') . l(render($image), '<front>', array(
      'html' => TRUE,
      'attributes' => array(
        'id' => 'logo',
        'rel' => 'home',
        'title' => t('Return to the !site_name home page', array(
          '!site_name' => $site_name,
        )),
      ),
    ));
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

/**
 * Overrides theme_container().
 */
function origin_container($variables) {
  $element = $variables['element'];

  // Special handling for form elements.
  if (isset($element['#array_parents'])) {
    // Assign an html ID.
    if (!isset($element['#attributes']['id'])) {
      $element['#attributes']['id'] = $element['#id'];
    }
    // Add the 'form-wrapper' class.
    $element['#attributes']['class'][] = 'form-wrapper';
  }

  return $element['#children'];
}