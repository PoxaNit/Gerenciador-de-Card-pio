#!/bin/bash

#Este programa roda o coletor de lixo feito em
#PHP periodicamente para limpar a pasta imagens/



 if [[ $# -gt 0 ]]; then

     clear

     echo "Este programa não aceita parâmetros!"

     sleep 5

     exit 1

 fi


 trap "pkill sleep" SIGINT


#Para isso funcionar, esse script deve ser executado
#por rodarApp.sh, na raíz do projeto.
 cd src/backend

 caminho_banco=$(grep -Po "^\s*caminho_banco=['\"]?\K[^'\"\s;]*")

 caminho_completo="$(pwd)/../../${caminho_banco}"

 while true; do


     imagens=$(ls imagens)

     for img in $imagens; do

         php "limparPastaImagens.php" \
             "${caminho_completo}"    \
             "imagens/${img}"

     done

   # Espera de 10 minutos
     sleep 600

 done
