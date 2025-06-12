<?php

 session_start();

 if (!isset($_SESSION["autenticado"])):

     http_response_code(401);

     header("Content-Type: application/json");

     echo json_encode(["sucesso" => false, "msg" => "Usuário(a) não logado(a)!"]);

     exit;

 endif;

 $email = $_SESSION["autenticado"];

 //ESTE ARQUIVO PHP ATUALIZA AS INFORMAÇÕES DO PRATO, TROCANDO AS INFORNAÇÕEA ANTIGAS PELAS NOVAS

 $caminho_banco = __DIR__ . '/../../' . trim(shell_exec('source ../../.env && echo $caminho_banco'));

 $db = new SQLite3($caminho_banco);

 header("Content-Type: application/json");

 if ($_SERVER["REQUEST_METHOD"] === "POST"):




 $informacoes_antigas = json_decode($_POST["informacoes_antigas"], true);





//PEGANDO AS INFORMAÇÕES DO PRATO -> INÍCIO



/*--------------------- Informações antigas -------------------------*/


 $nome_prato_antigo 		   = $informacoes_antigas["nome_prato"];
 $descricao_prato_antigo	   = $informacoes_antigas["descricao_prato"];
 $preco_prato_antigo               = $informacoes_antigas["preco_prato"];
 $categoria_prato_antigo           = $informacoes_antigas["categoria_prato"];
 $ingredientes_prato_antigo        = $informacoes_antigas["ingredientes_prato"];
 $alergias_restricoes_prato_antigo = $informacoes_antigas["alergias_restricoes_prato"];
 $imagem_prato_antigo		   = $informacoes_antigas["imagem_prato"];

/*---------------------- /////////////////// ------------------------*/









/*--------------------- Informações novas -------------------------*/



 $nome_prato_novo 		 = $_POST["novo_nome_prato"];
 $descricao_prato_novo		 = $_POST["novo_descricao_prato"];
 $preco_prato_novo               = $_POST["novo_preco_prato"];
 $categoria_prato_novo           = $_POST["novo_categoria_prato"];
 $ingredientes_prato_novo        = $_POST["novo_ingredientes_prato"];
 $alergias_restricoes_prato_novo = $_POST["novo_alergias_restricoes_prato"];
 $imagem_prato_novo 		 = $_FILES["imagem_prato_novo"];


/*---------------------- /////////////////// ------------------------*/



//PEGANDO AS INFORMAÇÕES DO PRATO -> FIM




//TRATANDO AS IMAGENS

//teste

 shell_exec("rm $imagem_prato_antigo"); //já contém o caminho

//nova imagem

 $extensao = pathinfo($imagem_prato_novo["name"], PATHINFO_EXTENSION);
 $novoNome = uniqid().".".$extensao;
 $caminho  = __DIR__ . '/../../' . trim(shell_exec('source ../../.env && echo $caminho_imagens')) . "/$novoNome";

 move_uploaded_file($imagem_prato_novo["tmp_name"], $novoNome);

//ÁREA DAS OPERAÇÕES COM BANCO DE DADOS -> INÍCIO


/*---------------------  Fazendo as atualizações --------------------*/





 $stmt = $db->prepare("UPDATE menu_pratos SET nome_prato = :novo_nome_prato, descricao_prato = :novo_descricao_prato, preco_prato = :novo_preco_prato, categoria_prato = :novo_categoria_prato, ingredientes_prato = :novo_ingredientes_prato, alergias_restricoes_prato = :novo_alergias_restricoes_prato, imagem_prato = :novo_imagem_prato WHERE nome_prato = :antigo_nome_prato AND descricao_prato = :antigo_descricao_prato AND preco_prato = :antigo_preco_prato AND categoria_prato = :antigo_categoria_prato AND ingredientes_prato = :antigo_ingredientes_prato AND alergias_restricoes_prato = :antigo_alergias_restricoes_prato AND imagem_prato = :antigo_imagem_prato");

 $stmt->bindValue(":novo_nome_prato", $nome_prato_novo);
 $stmt->bindValue(":novo_descricao_prato", $descricao_prato_novo);
 $stmt->bindValue(":novo_preco_prato", $preco_prato_novo);
 $stmt->bindValue(":novo_categoria_prato", $categoria_prato_novo);
 $stmt->bindValue(":novo_ingredientes_prato", $ingredientes_prato_novo);
 $stmt->bindValue(":novo_alergias_restricoes_prato", $alergias_restricoes_prato_novo);
 $stmt->bindValue(":novo_imagem_prato", $caminho);

 $stmt->bindValue(":antigo_nome_prato", $nome_prato_antigo);
 $stmt->bindValue(":antigo_descricao_prato", $descricao_prato_antigo);
 $stmt->bindValue(":antigo_preco_prato", $preco_prato_antigo);
 $stmt->bindValue(":antigo_categoria_prato", $categoria_prato_antigo);
 $stmt->bindValue(":antigo_ingredientes_prato", $ingredientes_prato_antigo);
 $stmt->bindValue(":antigo_alergias_restricoes_prato", $alergias_restricoes_prato_antigo);
 $stmt->bindValue(":antigo_imagem_prato", $imagem_prato_antigo);

 $stmt->execute();





/*---------------------- /////////////////// ------------------------*/


















/*-------------- Buscando os dados atualizados para retorno ---------*/





 $stmt2 = $db->prepare("SELECT * FROM menu_pratos WHERE usuario_email = :email");

 $stmt2->bindValue(":email", $email);

 $resultado = $stmt2->execute();




/*---------------------- /////////////////// ------------------------*/



//ÁREA DAS OPERAÇÕES COM BANCO DE DADOS -> FIM




//RETORNANDO OS DADOS ATUALIZADOS



     $dados_de_retorno = array("msg" => "Dados atualizados!", "sucesso" => true, "info" => array());


     while ($linha = $resultado->fetchArray(SQLITE3_ASSOC)):

         $dados_de_retorno["info"][] = $linha;

     endwhile;

     $db->close();

     echo json_encode($dados_de_retorno);

 endif;



