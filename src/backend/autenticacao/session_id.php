<?php

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
