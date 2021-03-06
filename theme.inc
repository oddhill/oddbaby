<?php
/**
 * @file
 * This file contains the theme function overrides and any custom theme
 * functions that are being used.
 *
 * These functions are the last function that are being executed and are
 * responsible for delivering the actual HTML. They work just like template
 * files, but they are functions rather than actual files.
 *
 * If you want to add an override, you should find the original theme function,
 * usually from the API site, but it can also be found in the corresponding
 * modules implementation of hook_theme().
 */

/**
 * Overrides theme_blockify_logo().
 */
function oddbaby_blockify_logo($variables) {
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
function oddbaby_menu_local_tasks($variables) {
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
 * Overrides theme_fieldset().
 */
function oddbaby_fieldset($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id'));
  _form_set_class($element, array('form-wrapper'));

  $output = '<fieldset' . drupal_attributes($element['#attributes']) . '>';
  if (!empty($element['#title'])) {
    // Always wrap fieldset legends in a SPAN for CSS positioning.
    $output .= '<legend><span class="fieldset-legend">' . $element['#title'] . '</span></legend>';
  }
  $output .= '<div class="fieldset-wrapper">';
  if (!empty($element['#description'])) {
    $output .= '<div class="fieldset-description">' . $element['#description'] . '</div>';
  }
  $output .= $element['#children'];
  if (isset($element['#value'])) {
    $output .= $element['#value'];
  }
  $output .= '</div>';
  $output .= "</fieldset>\n";
  return $output;
}

/**
 * Overrides theme_textarea().
 */
function oddbaby_textarea($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id', 'name', 'cols', 'rows'));
  _form_set_class($element, array('form-textarea'));

  $wrapper_attributes = array(
    'class' => array('form-textarea-wrapper'),
  );

  // Add resizable behavior.
  if (!empty($element['#resizable'])) {
    drupal_add_library('system', 'drupal.textarea');
    $wrapper_attributes['class'][] = 'resizable';
  }

  return '<textarea' . drupal_attributes($element['#attributes']) . '>' . check_plain($element['#value']) . '</textarea>';
}

/**
 * Overrides theme_container().
 */
function oddbaby_container($variables) {
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

  return '<div' . drupal_attributes($element['#attributes']) . '>' . $element['#children'] . '</div>';
}

/**
 * Overrides theme_boxes_box().
 */
function oddbaby_boxes_box($variables) {
  $block = $variables['block'];
  return $block['content'];
}
