<?php

// Previne que haja pratos repetidos no sistema
 function verificarSePratoExiste ($nome, $usuario)
 {

     $dataBase = new SQLite3("restaurante.db");

     $stmt = $dataBase->prepare("SELECT nome_prato FROM menu_pratos WHERE nome_prato = :nome AND usuario_email = :usuario");
     $stmt->bindValue(":nome", $nome);
     $stmt->bindValue(":usuario", $usuario);

     $resultado = $stmt->execute();

     if ($prato = $resultado->fetchArray(SQLITE3_ASSOC)):

         $dataBase->close();

         return 1;

     endif;

     $dataBase->close();

     return 0;
 }
