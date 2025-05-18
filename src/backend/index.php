<?php

// Se o navegador pedir o arquivo js
 if (preg_match("/\/static\/js\/main\.[a-f0-9]+\.js$/", $_SERVER["REQUEST_URI"])):

     $arquivoJs = glob(__DIR__ . "/../../build/static/js/main.*.js");

     if ($arquivoJs && count($arquivoJs) > 0):

         header("Content-Type: application/javascript");

         readfile($arquivoJs[0]);

         exit;

     else:

         http_response_code(404);

         echo "Arquivo JavaScript não encontrado!";

         exit;

     endif;
// Se pedir o css
 elseif (preg_match("/\/static\/css\/main\.[a-f0-9]+\.css$/", $_SERVER["REQUEST_URI"])):

     $arquivoCss = glob(__DIR__ . "/../../build/static/css/main.*.css");

     if ($arquivoCss && count($arquivoCss) > 0):

         header("Content-Type: text/css");

         readfile($arquivoCss[0]);

         exit;

     else:

         http_response_code(404);

         echo "Arquivo CSS não encontrado!";

         exit;

     endif;

 else:
// Serve o html por padrão
     readfile(__DIR__ . "/../../build/index.html");

 endif;
