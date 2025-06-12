<?php

 session_start();

 session_destroy();

 setcookie("PHPSESSID", "", time() - 500, "/");

 $urlBackend = trim(shell_exec('grep -Po "^\s*urlBackend=[\'"]?\K[^\'";\s]*" ../../../.env'));

 header("Location: $urlBackend/autenticacao/login.php");

?>
