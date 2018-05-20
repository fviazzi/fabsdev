<?php

  $lang = isset($_COOKIE["language"]) ? $_COOKIE["language"] : substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

  switch ($lang) {

      case "es":
          require_once 'lang/ES_es.php';
          break;

      default:
          require_once 'lang/EN_us.php';
          break;
  }
?>
