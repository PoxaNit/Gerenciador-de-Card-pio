<?php

 session_start();

 session_destroy();

 setcookie("PHPSESSID", "", time() - 500, "/");

 $urlBackend = trim(shell_exec('source ../../../.env && echo $urlBackend'));

 header("Location: $urlBackend/autenticacao/login.php");

?>
