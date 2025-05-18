<?php

 if ($_SERVER['REQUEST_METHOD'] === "POST"):

     $cadastrou = null;
     $usuarioJaCadastrado = null;
     $erros = [];

     if (isset($_POST['nome']) && isset($_POST['email']) && isset($_POST['senha'])):

         if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)):

	     $erros[] = "E-mail inválido!";

	 endif;

         $db = new SQLite3('../restaurante.db');

	 $stmt = $db->prepare("SELECT usuario_email FROM usuarios WHERE usuario_email = :email");
         $stmt->bindValue(":email", $_POST["email"]);
	 $resultado = $stmt->execute();

	 $email = null; //Armazena temporariamente se o email já existe no banco.

	 while ($linha = $resultado->fetchArray(SQLITE3_ASSOC)):

	     if ($linha["usuario_email"] === $_POST["email"]):

	         $email = $linha;
		 break;

	     endif;

	 endwhile;

	 $db->close();

	 if (!empty($email)):

	     $usuarioJaCadastrado = true;
	     $erros[] = "Usuário já existente!";

	 else:

	     $db->open('../restaurante.db');

	     $stmt = $db->prepare('INSERT INTO usuarios (usuario_email, usuario_nome, usuario_senha) VALUES (:email, :nome, :senha)');

	     $stmt->bindValue(":email", $_POST["email"]);
	     $stmt->bindValue(":nome", $_POST["nome"]);
	     $stmt->bindValue(":senha", password_hash($_POST["senha"], PASSWORD_DEFAULT));

	     $stmt->execute();

	     $cadastrou = true;

	 endif;

     else:

	 $erros[] = "Dados incompletos!";

     endif;

 endif;

 $urlBackend = trim(shell_exec('source ../../../.env && echo ${urlBackend}'));

?>


<!DOCTYPE html>

 <html lang="pt-br">
     <head>

	 <meta name="viewport" content="width=device-width, initial-scale=1.0">

         <title>Cadastro de usuário</title>

         <meta charset="UTF-8">

	 <!-- Bootstrap -->
	 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

         <!-- CSS Sobrescrito -->
         <link rel="stylesheet" href="./css/cadastro.css">

     </head>

     <body class="bg-light d-flex align-items-center justify-content-center min-vh-100">

	 <?php if (!isset($cadastrou)): ?>

         <form autocomplete="off" method="POST" class="needs-validation p-4 shadow w-75" novalidate>

             <header>

                 <h1 class="h1">Cadastre-se</h1>

             </header>

             <main>

                 <section id="section_nome">

		     <label class="form-label" for="input required_nome">Nome:</label>
		     <input class="form-control mb-2" required name="nome" type="text" id="input required_nome">

                 </section>



		 <section id="section_email">

		     <label class="form-label" for="input required_email">Email:</label>
		     <input class="form-control mb-2" required name="email" type="email" id="input required_email">

		 </section>



		 <section id="section_senha">

		     <label class="form-label" for="input required_senha">Senha:</label>
		     <input class="form-control mb-2"required name="senha" type="password" id="input required_senha">

		 </section>



		 <section id="section_enviar">

		     <button class="btn btn-primary" type="submit">Enviar</button>

		 </section>

             </main>

	     <footer>

	         <nav>
	             <a href= <?php echo $urlBackend . "/autenticacao/login.php" ?>>Já tem uma conta?</a>
	         </nav>
  	             <?php if (!empty($erros)): ?>

	                 <div>

		             <p class="text-danger"><?php echo $erros[0];?></p>

	                 </div>
	             <?php endif; ?>


	     </footer>
         </form>




	 <?php else: ?> <!-- Se o usuário já se cadastrou -->

             <div class="text-center">

	         <h1>Usuário(a) foi cadastrado(a) com sucesso!</h1>

  	         <?php

		     echo "<a href=$urlBackend/autenticacao/login.php>Entrar</a>";

	         ?>

             </div>

	 <?php endif; ?>

     </body>
 </html>
