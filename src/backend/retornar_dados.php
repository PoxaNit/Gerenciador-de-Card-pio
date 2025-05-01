<?php

 session_start();

 if (!isset($_SESSION["autenticado"])):

     header("Location: http://gerenciadormenu.free.nf/autenticacao/login.php");

     exit;

 endif;

 $db = new SQLite3("restaurante.db");

 $stmt = $db->prepare("SELECT * FROM menu_pratos WHERE usuario_email = :email");

 $stmt->bindValue(":email", $_SESSION["autenticado"]);

 $result = $stmt->execute();


 $dados = array("msg" => "Dados carregados!", "sucesso" => true, "info" => array());


 while ($linha = $result->fetchArray(SQLITE3_ASSOC)):

     $dados["info"][] = $linha;

 endwhile;

 $db->close();

 header("Content-Type: application/json");

 if (empty($dados["info"])):

     echo json_encode(["msg" => "Dados não encontrados", "sucesso" => false, "info" => []]);

     exit;

 else:

     echo json_encode($dados);

 endif;
