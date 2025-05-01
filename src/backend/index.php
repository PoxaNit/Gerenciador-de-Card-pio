<?php


 if ($_SERVER["REQUEST_URI"] === "http://gerenciadormenu.free.nf/retornar_dados"):
	require_once "retornar_dados.php";
 exit;

   elseif ($_SERVER["REQUEST_URI"] === "http://gerenciadormenu.free.nf/criar_prato"):
	include "criar_prato.php";
 exit;

   elseif ($_SERVER["REQUEST_URI"] === "http://gerenciadormenu.free.nf/deletarPrato"):
	include "deletarPrato.php";
 exit;

   elseif ($_SERVER["REQUEST_URI"] === "http://gerenciadormenu.free.nf/atualizarPrato"):
	include "atualizarPrato.php";
 exit;

 else:

     header("Content-Type: application/json");

     echo json_encode(["msg" => "Zona Proibida!", "sucesso" => false]);

 endif;



