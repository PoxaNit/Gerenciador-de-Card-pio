#!/bin/bash

#Este programa roda o coletor de lixo feito em
#PHP periodicamente para limpar a pasta imagens/



 [[ $# -ne 3 ]] && echo "Esperado: orquestraLimparPastaImagens <caminhoDoDiretorioLimpador> <caminhoDoDiretorioBanco> <caminhoDoDiretorioImagens>" && exit 1



 caminhoDoDiretorioLimpador=$1 # Diretório onde está o script php para fazer a limpeza do diretório
 caminhoDoDiretorioBanco=$2    # Diretório onde está o banco de dados que vai ser usado pelo limpador para verificar quais imagens estão sendo usadas e quais são lixo
 caminhoDoDiretorioImagens=$3  # Diretório onde vai ocorrer a limpeza



 while true; do

     imagens=$(ls "$caminhoDoDiretorioImagens")

     for img in $imagens; do

         php "${caminhoDoDiretorioLimpador}/limparPastaImagens.php" \
             "${caminhoDoDiretorioBanco}/restaurante.db"         \
             "${caminhoDoDiretorioImagens}/${img}"

     done

     sleep 20

 done
