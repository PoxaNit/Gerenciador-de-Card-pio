<?php

 session_start();



 if (!isset($_SESSION["autenticado"])):

     http_response_code(401);

     header("Content-Type: application/json");

     echo json_encode(["sucesso" => false, "msg" => "Usuário(a) não logado(a)!", "status" => 401]);

     exit;

 endif;



 $erros = array();

 if ($_SERVER["REQUEST_METHOD"] === "POST"):


     $dados = json_decode(file_get_contents("php://input"), true);


     if (isset($dados["email"])):

         $email = $dados["email"];



         $db = new SQLite3("../restaurante.db");


//Deletando as imagens do diretório de imagens
         $stmt = $db->prepare('SELECT imagem_prato FROM menu_pratos WHERE usuario_email = :email');
         $stmt->bindValue(':email', $email);
         $result = $stmt->execute();

         while ($linha = $result->fetchArray(SQLITE3_ASSOC)):

	     shell_exec("rm " . __DIR__ . "/../$linha[imagem_prato]");

         endwhile;


// Deletando os pratos do usuário
         $stmt = $db->prepare("DELETE FROM menu_pratos WHERE usuario_email = :email");
         $stmt->bindValue(":email", $email);
         $stmt->execute();



//Deletando a conta em si
         $stmt = $db->prepare("DELETE FROM usuarios WHERE usuario_email = :email");
	 $stmt->bindValue(":email", $email);
         $stmt->execute();


         header("Content-Type: application/json");

         echo json_encode(["sucesso" => true, "msg" => "Conta deletada!"]);

         exit;

     else:

         $erros[] = "Usuário não autenticado!";

     endif;

 else:

     $erros[] = "Método de requisição não permitido!";

 endif;


 if (!empty($erros)):

     header("Content-Type: application/json");

     echo json_encode(["sucesso" => false, "msg" => $erros[0]]);

 endif;
