<?php

 session_start();

 if (!isset($_SESSION["autenticado"])):

     http_response_code(401);

     header("Content-Type: application/json");

     echo json_encode(["sucesso" => false, "msg" => "Usuário(a) não logado(a)!", "status" => 401]);

     exit;

 endif;


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

