#!/bin/bash

#Este programa roda o coletor de lixo feito em
#PHP periodicamente para limpar a pasta imagens/



# [[ $# -ne 1 ]] && echo "Deve se passar um argumento!" && exit 1



 while true; do

     cd ~/projetos/cadastro_produtos_restaurante/src/backend

     imagens=$(ls imagens)

     for img in $imagens; do

         php ./limparPastaImagens.php \
             ./restaurante.db         \
             ./imagens/"${img}"

     done

     cd ../../

     sleep 20

 done
