<?php

 session_start();

 session_destroy();

 setcookie("PHPSESSID", "", time() - 500, "/");

 header("Location: http://gerenciadormenu.free.nf/autenticacao/login.php");

?>
