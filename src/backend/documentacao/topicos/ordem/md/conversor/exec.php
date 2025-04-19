<?php

 // Passe o markdown como argumento CLI para esse programa

 if ($argc !== 2):

     echo "Uso: exec.php <arquivo_markdown>\n";

 endif;

 require_once 'Parsedown.php';

 $conversor = new Parsedown;

 $md = file_get_contents($argv[1]);

 $html = $conversor->text($md);

 echo $html . "\n";
