<?php

 session_start();



 if (!isset($_SESSION["autenticado"])):

     http_response_code(401);

     header("Content-Type: application/json");

     echo json_encode(["sucesso" => false, "msg" => "Usuário(a) não logado(a)!", "status_code" => 401]);

     exit;

 endif;


 $caminho_banco = __DIR__ . '/../../' . trim(shell_exec('source ../../.env && echo $caminho_banco'));

 $db = new SQLite3($caminho_banco);

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
