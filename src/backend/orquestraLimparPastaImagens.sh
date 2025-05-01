#!/bin/bash

#Este programa roda o coletor de lixo feito em
#PHP periodicamente para limpar a pasta imagens/



 if [[ $# -gt 0 ]]; then

     clear

     echo "Este programa não aceita parâmetros!"

     sleep 5

     exit 1

 fi



 while true; do

   # Para isso funcionar, esse script deve ser executado
   # por rodarApp.sh, na raíz do projeto.
     cd src/backend

     imagens=$(ls imagens)

     for img in $imagens; do

         php "limparPastaImagens.php" \
             "restaurante.db"         \
             "imagens/${img}"

     done

     cd ../../

     sleep 20

 done
