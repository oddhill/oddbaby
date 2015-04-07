<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page while offline.
 *
 * This file will be used when the site is in maintance mode, or when an error
 * occurs. It will then override any other template files, including the
 * html.tpl.php.
 *
 * All the available variables are mirrored in html.tpl.php and page.tpl.php.
 * Some may be blank but they are provided for consistency.
 *
 * @see template_preprocess()
 * @see template_preprocess_maintenance_page()
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
  <title><?php print $head_title; ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
 <link type="text/css" rel="stylesheet" href="http://fast.fonts.net/cssapi/7f1bf7ca-472f-4f19-bfbd-5f6d3701394b.css"/>
 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
 <style>
   html, body {
     font-size: 20px;
     height: 100%;
     width: 100%;
     margin: 0;
     font-family: "Proxima N W01 Reg", Arial, "Helvetica Neue", Helvetica, sans-serif;
   }

   .background {
     height: 100%;
     width: 100%;
     position: absolute;
     left: 0;
     top: 0;
     right: 0;
     bottom: 0;
   }

   .info {
     margin: 0 auto;
     width: 100%;
     text-align: center;
     background: #282828;
     z-index: 100;
     position: absolute;
     top: 50%;
     color: #FFF;
     transform: translateY(-50%);
     -webkit-transform: translateY(-50%);
     -moz-transform: translateY(-50%);
   }

   .inner {
     padding: 40px 10px;
   }

   p {
     margin: 30px 0 0 0;
   }

   @media screen and (max-width: 450px) {
     html, body {
       font-size: 18px;
     }

     .logotype {
       width: 80%;
       height: auto;
     }


     p {
       margin-top: 20px;
       margin-left: 10px;
       margin-right: 10px;
     }
   }
 </style>
</head>
<body class="<?php print $classes; ?>" style="background-color: #f2f2f2">

  <?php print $messages; ?>

  <div class="info">
    <div class="inner">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 50" enable-background="new 0 0 360 50" width="360" height="50">
        <g fill="#fff">
          <path d="M237.3 0h15.2v50h-15.2v-50zM55.2 0h24.9c16.3 0 22.2 12.3 22.2 24.9 0 15.4-8 25.1-25.2 25.1h-21.9v-50zm15.1 37.2h5.9c9.4 0 10.8-7.8 10.8-12.5 0-3.1-.9-11.9-11.9-11.9h-4.8v24.4zM108.3 0h24.9c16.3 0 22.2 12.3 22.2 24.9 0 15.4-8 25.1-25.2 25.1h-21.9v-50zm15.2 37.2h5.9c9.4 0 10.8-7.8 10.8-12.5 0-3.1-.9-11.9-11.9-11.9h-4.8v24.4zM185.7 0h15.2v17.4h14.2v-17.4h15.2v50h-15.2v-19.8h-14.2v19.8h-15.2v-50zM259.6 0h15.2v37.2h21.8v12.8h-36.9v-50zM302.1 0h15.2v37.2h21.7v12.8h-36.9v-50zM24.6 0c-13.6 0-24.6 11.2-24.6 25s11 25 24.6 25c13.6 0 24.6-11.2 24.6-25s-11-25-24.6-25zm0 36.2c-6.1 0-11-5-11-11.2 0-6.2 4.9-11.2 11-11.2s11 5 11 11.2c0 6.2-4.9 11.2-11 11.2zM352.3 34.3c-4.3 0-7.7 3.5-7.7 7.9 0 4.3 3.5 7.9 7.7 7.9 4.3 0 7.7-3.5 7.7-7.9s-3.5-7.9-7.7-7.9z"/>
        </g>
      </svg>
      <p><?php print $content; ?></p>
    </div>
  </div>
</body>
</html>
