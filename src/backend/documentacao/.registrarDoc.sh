#!/bin/bash

#Quando executado, pegará os tópicos da documentação e
#juntará tudo e sobrescreverá no arquivo "oQueJaEstaFeito.txt"
#na pasta "armazenamento_tmp"


#Pegando o caminho do diretório dos tópicos
#ordenados
 topicos=$(find . | grep 'ordem$' | awk '{print $1}')


#Pegando o caminho do diretório de armazenamento
 armazenamento=$(find . | grep 'armazenamento_tmp' | grep 'oQueJaEstaFeito.txt$'| awk '{print $1}')

#Pegando os tópicos em ordem
 arquivos=$(ls ${topicos}/*.txt)


#Juntando os arquivos

 > ${armazenamento}

 for arquivo in $arquivos; do

     cat $arquivo >> ${armazenamento}

     for n in {1..3}; do

         echo \ >> ${armazenamento}

     done

 done

 echo 'Os tópicos da documentação foram juntados!'
