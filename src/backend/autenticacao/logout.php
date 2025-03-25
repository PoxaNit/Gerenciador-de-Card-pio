<?php

 session_start();

 session_destroy();

 setcookie("PHPSESSID", "", time() - 500, "/");

 header("Location: http://0.0.0.0:8000/autenticacao/login.php");

?>
