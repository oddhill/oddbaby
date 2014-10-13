<?php
/**
 * @file
 * Default theme implementation that displays a node using the DS 1 column
 * layout.
 *
 * If you'd like to create a different template file for nodes, you should
 * create a new DS layout, and place it in the templates/ds folder, just like
 * this implementation.
 *
 * Have a look at the example_layout folder in the DS folder for guidance.
 *
 * In order to print contextual links for this entity, there are two things
 * are required:
 * - Add the contextual-links-region class to the wrapper where the links
 *   should appear.
 * - Render the $contextual_links variable within this wrapper.
 *
 * @see oddbaby_preprocess()
 */
?>
<div class="<?php print $classes; ?> <?php print $ds_content_classes; ?> contextual-links-region">
  <?php print render($contextual_links); ?>
  <?php print $ds_content; ?>
</div>
