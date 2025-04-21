<?php

 require_once "verificarSePratoExiste.php";

 session_start();

 $db = new SQLite3("restaurante.db");

 if ($_SERVER["REQUEST_METHOD"] === "POST"):

    header("Content-Type: application/json");

    $nome_prato = $_POST["nome_prato"];
    $descricao_prato = $_POST["descricao_prato"];
    $preco_prato = $_POST["preco_prato"];
    $categoria_prato = $_POST["categoria_prato"];
    $ingredientes_prato = $_POST["ingredientes_prato"];
    $alergias_restricoes_prato = $_POST["alergias/restricoes"];
    $usuario_email = $_SESSION["autenticado"];

    if (verificarSePratoExiste($nome_prato, $usuario_email)):

        echo json_encode(["msg" => "Prato já existente!",
			  "sucesso" => false]);
        $db->close();

        exit;

    endif;

    $imagem_prato = $_FILES["imagem_prato"];
    $nome_imagem = $imagem_prato["name"];
    $nome_temporario_imagem = $imagem_prato["tmp_name"];

    $extensao = pathinfo($nome_imagem, PATHINFO_EXTENSION);
    $novoNome = uniqid().".".$extensao;
    $caminho = "imagens/".$novoNome;
    move_uploaded_file($nome_temporario_imagem, $caminho);

    $stmt = $db->prepare("INSERT INTO menu_pratos (nome_prato, descricao_prato, preco_prato, categoria_prato, ingredientes_prato, alergias_restricoes_prato, imagem_prato, usuario_email) VALUES (:nome_prato, :descricao_prato, :preco_prato, :categoria_prato, :ingredientes_prato, :alergias_restricoes_prato, :imagem_prato, :usuario_email)");

    $stmt->bindvalue(":nome_prato", $nome_prato);
    $stmt->bindvalue(":descricao_prato", $descricao_prato);
    $stmt->bindvalue(":preco_prato", $preco_prato);
    $stmt->bindvalue(":categoria_prato", $categoria_prato);
    $stmt->bindvalue(":ingredientes_prato", $ingredientes_prato);
    $stmt->bindvalue(":alergias_restricoes_prato", $alergias_restricoes_prato);
    $stmt->bindvalue(":imagem_prato", $caminho);
    $stmt->bindValue(":usuario_email", $usuario_email);

    $stmt->execute();


// Buscando os pratos atualizados.

    $stmt = $db->prepare("SELECT * FROM menu_pratos WHERE usuario_email = :email");
    $stmt->bindValue(":email", $_SESSION["autenticado"]);
    $resultado = $stmt->execute();


// Retornando resposta.

    $dados = ["msg" => "Prato criado!", "sucesso" => true, "info" => []];


    while ($linha = $resultado->fetchArray(SQLITE3_ASSOC)):

        $dados["info"][] = $linha;

    endwhile;

    $db->close();

    echo json_encode($dados);

 else:

     header("Location: http://0.0.0.0:8000/autenticacao/login.php");
     exit;

 endif;
