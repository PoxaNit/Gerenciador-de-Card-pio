<?php


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



