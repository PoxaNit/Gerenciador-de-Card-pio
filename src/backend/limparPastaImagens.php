<?php

 //Este programa é um coletor de lixo que deleta
 //imagens não usadas que se acumulam na pasta imagens/

 function limparPastaImagens ($caminhoDoBanco, $caminhoImagem)
{

     $db = new SQLite3($caminhoDoBanco);

     $stmt = $db->prepare('SELECT imagem_prato FROM menu_pratos WHERE imagem_prato = :caminhoImagem');
     $stmt->bindValue(":caminhoImagem", basename($caminhoImagem));

     $resultado = $stmt->execute();

     if ($resultado->fetchArray(SQLITE3_ASSOC)):
      // Se a imagem estiver sendo usada (está no banco), não é lixo. Deixa como está.
         exit;

     else:
      // Se não estiver no banco, não está sendo usada e é lixo. Deleta
         shell_exec("rm $caminhoImagem");

     endif;

     $db->close();
}

 limparPastaImagens($argv[1], $argv[2]);

