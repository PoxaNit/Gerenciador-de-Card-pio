<?php

 require_once "verificarSePratoExiste.php";

 session_start();

 if (!isset($_SESSION["autenticado"])):

     http_response_code(401);

     header("Content-Type: application/json");

     echo json_encode(["sucesso" => false, "msg" => "Usuário(a) não logado(a)!", "status" => 401]);

     exit;

 endif;

 $caminho_banco = __DIR__ . '/../../' . trim(shell_exec('source ../../.env && echo $caminho_banco'));

 $db = new SQLite3($caminho_banco);

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

        http_response_code(409);

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

    $caminho = __DIR__ . '/../../' . trim(shell_exec('source ../../.env && echo $caminho_imagens'));
    move_uploaded_file($nome_temporario_imagem, $caminho . "/" . $novoNome);

    $stmt = $db->prepare("INSERT INTO menu_pratos (nome_prato, descricao_prato, preco_prato, categoria_prato, ingredientes_prato, alergias_restricoes_prato, imagem_prato, usuario_email) VALUES (:nome_prato, :descricao_prato, :preco_prato, :categoria_prato, :ingredientes_prato, :alergias_restricoes_prato, :imagem_prato, :usuario_email)");

    $stmt->bindvalue(":nome_prato", $nome_prato);
    $stmt->bindvalue(":descricao_prato", $descricao_prato);
    $stmt->bindvalue(":preco_prato", $preco_prato);
    $stmt->bindvalue(":categoria_prato", $categoria_prato);
    $stmt->bindvalue(":ingredientes_prato", $ingredientes_prato);
    $stmt->bindvalue(":alergias_restricoes_prato", $alergias_restricoes_prato);
    $stmt->bindvalue(":imagem_prato", $novoNome);
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

 endif;
