#!/bin/bash


# <------------- Declarando cores ------------------>




 # <-USO--------------------------------------->

   # echo -e "Texto de cor ${cor}cor${neutro}"

   # echo -e "${azul_claro}Texto azul${neutro}"

 # <------------------------------------------->






 cinza_escuro="\033[0;30m"
 cinza_claro="\033[0;30m"

 vermelho_escuro="\033[0;31m"
 vermelho_claro="\033[1;31m"

 verde_escuro="\033[0;32m"
 verde_claro="\033[1;32m"

 amarelo_escuro="\033[0;33m"
 amarelo_claro="\033[1;33m"

 azul_escuro="\033[0;34m"
 azul_claro="\033[1;34m"

 roxo_escuro="\033[0;35m"
 roxo_claro="\033[1;35m"

 ciano_escuro="\033[0;36m"
 ciano_claro="\033[1;36m"

 branco_fraco="\033[0;37m"
 branco_forte="\033[1;37m"


 neutro="\033[0m"

# <------------- Declarando cores _ Fim ------------>










# <----- Declarando dependências ----------------------->


 dependencias_necessarias=("php"
                           "wget"
                           "unzip"
                           "ngrok"
                           "npm"
                           "nodejs"
                           "curl"
                          )

 declare -A dependencias_faltando

 dependencias_faltando[n]=0 # 'n' é o número de dependências faltando


# <----- Declarando dependências _ Fim -------------------->





 mkdir -p bin








 function func_iniciar {


     func_tratar_argumentos "$@"

     func_verificar_ambiente_cli

     func_verificar_dependencias

     func_prosseguir
 }















# <------------- Tratando argumentos ---------------------------->


 function func_tratar_argumentos {

     [[ $# -gt 0 ]] && echo "Este script não aceita argumentos!" &&
     return 1


     return 0

 }

# <------------- Tratando argumentos _ Fim ---------------------->



















# <--------- Verificações --------------------------------------->


 function func_verificar_dependencias {

     echo -e "${ciano_claro}Verificando dependências...${neutro}"

     for dep in "${dependencias_necessarias[@]}"; do

         comando="func_verificar_${dep}"

         eval "$comando"

     done

 }


 function func_verificar_wget {

     if ! command -v wget &> /dev/null; then

         dependencias_faltando[n]=$((dependencias_faltando[n] + 1))

         dependencias_faltando[wget]=wget

         echo -e "${vermelho_claro}wget está faltando!${neutro}"

     fi

 }

 function func_verificar_unzip {

     if ! command -v unzip &> /dev/null; then

         dependencias_faltando[n]=$((dependencias_faltando[n] + 1))

         dependencias_faltando[unzip]=unzip

         echo -e "${vermelho_claro}Unzip não foi encontrado!${neutro}"
     fi

 }

 function func_verificar_curl {

     if ! command -v curl &> /dev/null; then

         dependencias_faltando[n]=$((dependencias_faltando[n] + 1))

         dependencias_faltando[curl]=curl

         echo -e "${vermelho_claro}Curl não encontrado!${neutro}"

     fi

 }

 function func_verificar_ngrok {

     if ! command -v ngrok &> /dev/null; then

         dependencias_faltando[n]=$((dependencias_faltando[n] + 1))

         dependencias_faltando[ngrok]=ngrok

         echo "${vermelho_claro}Ngrok não foi encontrado!${neutro}"

     fi

 }


 function func_verificar_php {

     if ! command -v php &> /dev/null; then

         dependencias_faltando[n]=$((dependencias_faltando[n] + 1))

         dependencias_faltando[php]=php

         echo -e "${vermelho_claro}PHP não encontrado!${neutro}"

     fi

 }


 function func_verificar_nodejs {

     if ! command -v node &> /dev/null; then

         dependencias_faltando[n]=$((dependencias_faltando[n] + 1))

         dependencias_faltando[nodejs]=nodejs

         echo -e "${vermelho_claro}mNode.js não encontrado!${neutro}"

     fi

 }



 function func_verificar_npm {

     if ! command -v npm &> /dev/null; then

         dependencias_faltando[n]=$((dependencias_faltando[n] + 1))

         dependencias_faltando[npm]=npm

         echo -e "${vermelho_claro}NPM não encontrado!${neutro}"

     fi

 }


 function func_verificar_ambiente_cli {

     if [[ "${PREFIX}" = *"com.termux"* ]]; then

         ambiente_cli="termux"

         gerenciador_pacotes="pkg"

     else

         ambiente_cli="linux" # Esperado

         gerenciador_pacotes="apt"

     fi

 }


# <--------- Verificações _ Fim ----------------------------------->













# <------------- Prosseguir --------------------------------------->


 function func_prosseguir {

     if [[ "${dependencias_faltando[n]}" -eq 0 ]]; then

         echo -e "${verde_claro}Verificação concluída!${neutro}"

         exit 0

     else

         echo -e "Dependências faltando: ${ciano_escuro}${dependencias_faltando[n]}${neutro}"

         echo -e "${ciano_claro}Deseja instalá-las? (${amarelo_claro}s${ciano_claro} \
para ${amarelo_claro}sim${ciano_claro}, ${roxo_claro}qualquer outra tecla${ciano_claro} \
para ${roxo_claro}não${ciano_claro})${neutro}
"

         read -n 1 opcao


         if [[ "$opcao" = "s" ]] || [[ "$opcao" = "S" ]]; then

             func_instalar_dependencias

         else

             exit 1

         fi

     fi

 }



# <------------- Prosseguir _ Fim --------------------------------->









# <------------ Instalações --------------------------------------->


 function func_instalar_dependencias {

     for dep in "${dependencias_faltando[@]}"; do

         [[ "$dep" =~ ^[0-7]$ ]] && continue

         local comando="func_instalar_${dep}"

         eval "$comando"

     done


 }


 function func_instalar_wget {

     local comando="${gerenciador_pacotes} install -y wget"

     echo -e "${ciano_claro}Instalando wget...${neutro}"

     eval "$comando"

     echo -e "${verde_claro}Instalação concluída!${neutro}"

 }

 function func_instalar_unzip {

     local comando="${gerenciador_pacotes} install -y unzip"

     echo -e "${ciano_claro}Instalando unzip...${neutro}"

     eval "$comando"

     echo -e "${verde_claro}Instalação concluída!${neutro}"

 }

 function func_instalar_curl {

     local comando="${gerenciador_pacotes} install -y curl"

     echo -e "${ciano_claro}Instalando curl...${neutro}"

     eval "$comando"

     echo -e "${verde_claro}Instalação concluída!${neutro}"

 }

 function func_instalar_ngrok {

     arquitetura=$(uname -m)



     case "$arquitetura" in
       x86_64) url_ngrok="" ;;

     esac



     local comando="
     wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-stable-linux-arm.zip; \
     unzip ngrok-stable-linux-arm.zip; \
     mv ngrok ./bin; \
     rm ngrok-stable-linux-arm.zip
     "

     echo -e "${ciano_claro}Instalando Ngrok...${neutro}"

     eval "$comando"

     echo -e "${verde_claro}Instalação concluída!${neutro}"

 }

 function func_instalar_php {

     comando="${gerenciador_pacotes} install -y php"

     echo -e "${ciano_claro}Instalando php...${neutro}"

     eval "$comando"

     echo -e "${verde_claro}Instalação concluída!${neutro}"

 }

 function func_instalar_npm {

     comando="${gerenciador_pacotes} install -y npm"

     echo -e "${ciano_claro}Instalando npm...${neutro}"

     eval "$comando"

     echo -e "${verde_claro}Instalação concluída!${neutro}"

 }

 function func_instalar_nodejs {

     comando="${gerenciador_pacotes} install -y node"

     echo -e "${ciano_claro}Instalando node...${neutro}"

     eval "$comando"

     echo -e "${verde_claro}Instalação concluída!${neutro}"

 }

# <------------ Instalações _ Fim --------------------------------->



 func_iniciar "$@"
