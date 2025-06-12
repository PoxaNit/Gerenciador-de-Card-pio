#!/bin/bash

#Este programa roda o coletor de lixo feito em
#PHP periodicamente para limpar a pasta imagens/



 if [[ $# -gt 0 ]]; then

     clear

     echo "Este programa não aceita parâmetros!"

     exit 1

 fi



#Para isso funcionar, este script deve ser executado
#por rodarApp.sh, na raíz do projeto.
 cd src/backend

 caminho_banco=$(grep -Po "^\s*caminho_banco=['\"]?\K[^'\"\s;]*" ../../.env)

 caminho_completo="$(pwd)/../../${caminho_banco}"

 caminho_pasta_imagens=$(pwd)/../../$(grep -Po "^\s*caminho_imagens=['\"]?\K[^'\"\s;]*" ../../.env)

 while true; do


     imagens=$(ls imagens)



     for img in $imagens; do

         caminho_imagem="$caminho_pasta_imagens/${img}"

         php "limparPastaImagens.php" \
             "${caminho_completo}"    \
             "${caminho_imagem}"

     done

   # Espera de 10 minutos
     sleep 600

 done
