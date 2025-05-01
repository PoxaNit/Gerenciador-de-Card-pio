#!/bin/bash



 # Execute este script para inicializar este app.
 # Cancele-o (^C) para parar de executar o App.





















 # Prevenindo a tentativa de passar argumentos

   if [[ $# -gt 0 ]]; then

       clear

       echo -e "\033[1;31mEste programa não aceita argumentos!"

       exit 1

   fi


# Criando a pasta temporária para armazenar os IDs dos processos
   mkdir -p "${HOME}/tmp/rodarApp_pid"

# Previne contra o acúmulo de lixo na pasta das imagens
   ./src/backend/orquestraLimparPastaImagens.sh & echo $! > "${HOME}/tmp/rodarApp_pid/orquestraLimpeza.pid"



#previne erros se o usuário não estiver no local certo na raíz do projeto
 function ajustarLocalizacao {

     localAtual=$(pwd)

     localCorreto=$(pwd | grep -o ".*/cadastro_produtos_restaurante")

     [[ -z "$localCorreto" ]] && echo "Venha até a raíz do projeto para rodá-lo. Use cd ~/.../cadastro_produtos_restaurante e execute este script novamente!" && exit 1

     if [[ ! "${localAtual}" = "${localCorreto}" ]]; then

         echo "Você precisa ir para a raíz do projeto antes de rodá-lo. Navegue para ${localCorreto} e execute este script novamente!"

         exit 1

     fi
}




#Roda o projeto
 function ligarServidores {

   # Criando os arquivos temporários dos logs
     > "${localCorreto}/.logs_react_tmp.txt"
     > "${localCorreto}/.logs_php_tmp.txt"


   # Ligando o servidor de desenvolvimento do React
     npm start &> .logs_react_tmp.txt & echo $! > ${HOME}/tmp/rodarApp_pid/node.pid



   # Ligando o servidor de desenvolvimento do PHP
     caminhoBackend="./src/backend"

     cd "$caminhoBackend"

     php -S 0.0.0.0:8000 -t . >> "${localCorreto}/.logs_php_tmp.txt" 2>&1 & echo $! > ${HOME}/tmp/rodarApp_pid/php.pid

}



#Dá feedback ao usuário
 function ajustarInterface {

     clear

     echo -e "\033[1;33mAguarde...\033[0m"

     stty -echo

     sleep 22

     stty echo

     clear

     echo -e "\033[1;33mApp Rodando em localhost:3000!\033[0m"

     menu
}


 function pararProjeto {

     clear

     rm "${localCorreto}/.logs_react_tmp.txt"

     rm "${localCorreto}/.logs_php_tmp.txt"




   # Matando os processos dos criados nesse programa
     pkill -P $$

     for f in ${HOME}/tmp/rodarApp_pid/*.pid; do

         kill $(cat $f) &> /dev/null

     done

     kill $(ps | grep "/node" | grep -v grep | awk '{print $1}') &> /dev/null



     echo -e "\033[1;33mServidores desligados!\033[0m"

   # Apenas para prevenir bugs
     stty echo


     exit 0;

}


 function menu {

     echo -e "\033[1;36m
 O que gostaria de fazer?

 1) Ver os logs do React

 2) Ver os logs do PHP

 3) Sair (parar de rodar o app)
\033[0m
"

 while true; do

     stty -echo

     read -n 1 opcao

     if [[ "$opcao" = "1" ]]; then

         clear

       # Exibe os logs do react
         exibirLogs r || exit 1

     elif [[ "$opcao" = "2" ]]; then

         clear

       # Exibe os logs do php
         exibirLogs p || exit 1

     elif [[ "$opcao" = "3" ]]; then

         break

     else

         echo -e "\033[2K\033[A\033[2K"

     fi

 done

 pararProjeto

}

 function exibirLogs {

     clear

     echo -e "\033[1;33mDigite \"v\" para voltar ao menu\033[0m"

     echo -e "\033[1;32m"

     [[ $# -ne 1 ]] && echo "rodarApp.sh: func exibirLogs: deve-se passar um argumento para a função. Esperado: exibirLogs <r|p>" && return 1


     if [[ $1 = "r" ]]; then

         tail -f "${localCorreto}/.logs_react_tmp.txt" & echo $! > ${HOME}/tmp/rodarApp_pid/tail_logReact.pid

     elif [[ $1 = "p" ]]; then

         tail -f "${localCorreto}/.logs_php_tmp.txt" & echo $! > ${HOME}/tmp/rodarApp_pid/tail_logPhp.pid

     fi

     while true; do

         read -n 1 n

         [[ "$n" = "v" ]] || [[ "$n" = "V" ]] && break

     done

     echo -e "\033[0m"

     voltarAoMenu

}

 function voltarAoMenu {

     for f in ${HOME}/tmp/rodarApp_pid/tail*.pid; do

         kill $(cat $f) &> /dev/null

     done

     clear

     menu

}




# Para quando o usuário fizer ^C para parar o programa
  trap "pararProjeto" SIGINT












# Executando as funções

   ajustarLocalizacao
   ligarServidores
   ajustarInterface


