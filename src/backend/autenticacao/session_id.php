<?php

 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
 header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");



 session_start();

 header("Content-Type: application/json");

 if ($_SERVER["REQUEST_METHOD"] === "GET"):

     if (isset($_SESSION["autenticado"])):

         echo json_encode(["id" => $_SESSION["autenticado"], "sucesso" => true]);

     else:

	 session_destroy();
         echo json_encode(["sucesso" => false, "id" => null]);

     endif;

 endif;

?>
