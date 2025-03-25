<?php

  session_start();

  $usuario_email = $_SESSION["autenticado"];

  $db = new SQLite3("restaurante.db");

  if ($_SERVER["REQUEST_METHOD"] === "POST"):

      $json = file_get_contents('php://input');
      $dados = json_decode($json, true);


   //Deletando o prato
      $imagem_prato = $dados["imagem_prato"];
      shell_exec("rm $imagem_prato");

      $nome_prato = $dados['nome_prato'];
      $descricao_prato = $dados['descricao_prato'];
      $preco_prato = $dados["preco_prato"];
      $categoria_prato = $dados["categoria_prato"];
      $ingredientes_prato = $dados["ingredientes_prato"];
      $alergias_restricoes_prato = $dados["alergias_restricoes_prato"];

      $stmt = $db->prepare('DELETE FROM menu_pratos WHERE nome_prato = :nome_prato AND descricao_prato = :descricao_prato AND preco_prato = :preco_prato AND categoria_prato = :categoria_prato AND ingredientes_prato = :ingredientes_prato AND alergias_restricoes_prato = :alergias_restricoes_prato AND usuario_email = :usuario_email');
      $stmt->bindValue(":nome_prato", $nome_prato);
      $stmt->bindValue(":descricao_prato", $descricao_prato);
      $stmt->bindValue(":preco_prato", $preco_prato);
      $stmt->bindValue(":categoria_prato", $categoria_prato);
      $stmt->bindValue(":ingredientes_prato", $ingredientes_prato);
      $stmt->bindValue(":alergias_restricoes_prato", $alergias_restricoes_prato);
      $stmt->bindValue(":usuario_email", $usuario_email);

      $stmt->execute();


   //Retornando a nova lista de pratos
      $stmt = $db->prepare('SELECT * FROM menu_pratos WHERE usuario_email = :usuario_email');
      $stmt->bindValue(":usuario_email", $usuario_email);

      $resultado = $stmt->execute();

      $resposta = array("sucesso" => true, "msg" => "Prato deletado!", "info" => array());



      while ($linha = $resultado->fetchArray(SQLITE3_ASSOC)):

          $resposta["info"][] = $linha;

      endwhile;

      $db->close();

      header("Content-Type: application/json");

      echo json_encode($resposta);

      exit;

  else:

      header("Location: http://0.0.0.0:8000/autenticacao/login.php");

      exit;

 endif;




