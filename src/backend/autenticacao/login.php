<?php

 // Este arquivo redireciona o usuário para a área restrita do site caso ele já tenha se cadastrado com o formulário de cadastro, para deixar claro.

 session_start();

 $urlBackend = trim(shell_exec('source ../../../.env && echo ${urlBackend}'));

 if (isset($_POST["email"]) && isset($_POST["senha"])):

     $erros = [];


 //Validando o email

     if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)):

         $erros[] = "Email inválido!";

     endif;



 // Verificando se a senha existe para o email, e consequentemente se o email existe

     $caminho_banco = trim(shell_exec('pwd')) . '/../../../' . trim(shell_exec('source ../../../.env && echo $caminho_banco'));

     $db = new SQLite3($caminho_banco);

     $stmt = $db->prepare("SELECT usuario_senha FROM usuarios WHERE usuario_email = :email");

     $stmt->bindValue(":email", $_POST["email"]);

     $resultado = $stmt->execute();

     $senha = null; //Permanecerá null se a senha não passar na validação



     $linha = $resultado->fetchArray(SQLITE3_ASSOC); // Se existir no banco um e-mail igual ao passado pelo usuário...


     if ($linha && password_verify($_POST["senha"], $linha["usuario_senha"])):

         $senha = $_POST["senha"];

     endif;


     $db->close();


     if (empty($senha)): // Se a senha ou email estiverem incorretos, $senha estará vazio

	 $erros[] = "Email ou senha incorretos!";
	 session_destroy();

     elseif (!empty($senha)): //Para a senha não estar vazia, o email e a senha devem estar corretos

	 $_SESSION["autenticado"] = $_POST["email"];
	 header("Location: $urlBackend"); //Redireciona o usuário para meu aplicativo web react
	 exit;

     endif;

 endif;

?>

 <!DOCTYPE html>

 <html>
     <head>
         <title>Formulário de log-in</title>
	 <meta name="viewport" content="width=device-width, initial-scale=1">

	 <!-- Bootstrap -->
	 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

         <!-- CSS Sobrescrito -->
         <link rel="stylesheet" href="./css/login.css">

	 <!-- Ajustando a posição do formulário na página -->
	 <style>

	     .posicao-form {
	        position: absolute;
		top: 30%;
	     }

	 </style>
     </head>

     <body class="d-flex align-items-center justify-content-center vh-100">
         <form autocomplete="off" action="login.php" method="POST" class="p-3 text-left shadow posicao-form">

	     <header>

	         <h1>Entre na sua conta</h1>

	     </header>

	     <main>

		 <section>

		     <label for="email">E-mail:</label>
		     <input class="form-control mb-3" name="email" type="email" required>

		 </section>

		 <section>

		     <label for="senha">Senha:</label>
		     <input class="form-control mb-3" name="senha" type="password" required>

		 </section>

		 <section>

		     <input class="btn btn-primary" type="submit" value="Entrar">

		 </section>

		 <nav>
		     <a href=<?php echo $urlBackend . "/autenticacao/cadastro.php"?>>Não tem uma conta?</a>
		 </nav>

		 <?php if (!empty($erros)): ?>

		     <div>

			 <p class="text-danger"><?php echo $erros[0]; ?></p>

		     </div>

		 <?php endif; ?>

	     </main>

         </form>
     </body>
 </html>
