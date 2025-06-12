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


// Verifica se é uma imagem estática ou uma imagem dinâmica do usuário
 $tipo = $_GET["tipo"] ?? "";


 if ($tipo === "nao-estatico"):

     $caminho_pasta_imagens = __DIR__ . '/../../' . trim(shell_exec('source ../../.env && echo $caminho_imagens'));

     $nomeImagem = $_GET["img"];

     $caminho_imagem = $caminho_pasta_imagens . '/' . $_GET["img"];
     header("Content-Type: image/jpg");

 else:

     $caminho_imagem = __DIR__ . "/statics/" . $_GET["img"];
     header("Content-Type: image/png");

 endif;




 if (!file_exists($caminho_imagem)) {

     http_response_code(404);

     echo "Arquivo '$_GET[img]' não encontrado!";

     exit;

 };

// Previne que o navegador faça muitas requisições atrás da imagem
 header("Cache-Control: public, max-age=31536000, immutable");

 readfile($caminho_imagem);

