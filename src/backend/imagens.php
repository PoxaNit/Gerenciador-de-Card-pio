<?php

// Se não especificar a imagem, não retorna nada
 if (!isset($_GET["img"])) exit;

 $caminho = __DIR__ . "/statics/" . $_GET["img"];

 if (!file_exists($caminho)) {

     http_response_code(404);

     echo "Arquivo '$caminho' não encontrado!";

     exit;

 };

// Previne que o navegador faça muitas requisições atrás da imagem
 header("Cache-Control: public, max-age=31536000, immutable");
 header("Content-Type: image/png");

 readfile($caminho);

