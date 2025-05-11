<?php

 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
 header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");


 if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"):

     http_response_code(200);

     exit;

 endif;



 if ($_SERVER["REQUEST_URI"] === "/autenticacao/session_id"):

     echo json_encode(["uri" => $_SERVER["REQUEST_URI"]]);

     exit;

 endif;

/*
 if ($_SERVER["REQUEST_URI"] === "/retornar_dados"):
	require_once "retornar_dados.php";
 exit;

   elseif ($_SERVER["REQUEST_URI"] === "/criar_prato"):
	include "criar_prato.php";
 exit;

   elseif ($_SERVER["REQUEST_URI"] === "/deletarPrato"):
	include "deletarPrato.php";
 exit;

   elseif ($_SERVER["REQUEST_URI"] === "/atualizarPrato"):
	include "atualizarPrato.php";
 exit;

 else:

     header("Content-Type: application/json");

     echo json_encode(["msg" => "Zona Proibida!", "sucesso" => false]);

 endif;

*/

 echo json_encode(["msg" => "Testando..."]);
