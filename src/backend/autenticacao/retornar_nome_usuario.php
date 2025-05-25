<?php

 //Este programa retorna o nome de usuário que corresponde ao seu email ( id ) de autenticação guardado no banco de dados.

 session_start();

 $urlBackend = trim(shell_exec('cd ../../../ && source .env && echo $urlBackend'));



 if (!isset($_SESSION["autenticado"])):

     header("Location: $urlBackend/autenticacao/login.php");

     exit;

 endif;



 header("Content-Type: application/json");

 $erros = [];

 if ($_SERVER["REQUEST_METHOD"] === "POST"):

     $dados = json_decode(file_get_contents("php://input"), true);

     $id = $dados["id"];

     if (filter_var($id, FILTER_VALIDATE_EMAIL)):


	 $db = new SQLite3("../restaurante.db");

	 $stmt = $db->prepare("SELECT usuario_nome FROM usuarios WHERE usuario_email = :id");

	 $stmt->bindValue(":id", $id);

         $resultado = $stmt->execute();

	 $linha = $resultado->fetchArray(SQLITE3_ASSOC);

	 $db->close();



	 if ($linha):

	     $saida = ["sucesso" => true, "nome" => $linha["usuario_nome"]];

	     echo json_encode($saida);

	     exit;

	 else:

	     $erros[] = "Nome não encontrado!";

	 endif;

     else:

	 $erros[] = "Id de usuário inválido!";

     endif;

 else:

     $erros[] = "Método de requisição inválida!";

 endif;












 //Tratando os erros

 if (!empty($erros)):

     echo json_encode(["sucesso" => false, "erro" => $erros[0]]);
     exit;

 endif;

?>



