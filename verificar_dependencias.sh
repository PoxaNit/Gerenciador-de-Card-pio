#!/bin/bash


# <------------- Declarando cores ------------------>




 # <-USO--------------------------------------->

   # echo -e "Texto de cor ${cor}cor${neutro}"

   # echo -e "${azul_claro}Texto azul${neutro}"

 # <------------------------------------------->






 cinza_escuro="\033[0;30m"
 cinza_claro="\033[1;30m"

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
     exit 1


     return 0

 }

# <------------- Tratando argumentos _ Fim ---------------------->



















# <--------- Verificações --------------------------------------->


 function func_verificar_dependencias {

     echo -e "${ciano_claro}Verificando dependências...${neutro}"

     for dep in "${dependencias_necessarias[@]}"; do

         func_verificar_dependencia "${dep}"

     done

     [[ "${dependencias_faltando[n]}" -eq 0 ]] && return 0 || return 1

 }


 function func_verificar_dependencia {

     dependencia=$1

     if ! command -v "$dependencia" &> /dev/null; then

         dependencias_faltando[n]=$((dependencias_faltando[n] + 1))
         dependencias_faltando["$dependencia"]="$dependencia"

         echo -e "${vermelho_claro}${dependencia} não encontrado!${neutro}"

         return 1

     else

         if [[ "${dependencias_faltando[n]}" -gt 0 ]] && [[ ! -z "${dependencias_faltando[$dependencia]}" ]]; then

             dependencias_faltando[n]=$((dependencias_faltando[n] - 1))

             dependencias_faltando["$dependencia"]=""

         fi

         return 0

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

     for chave in "${!dependencias_faltando[@]}"; do

         [[ "$chave" = "n" ]] && continue # Previne que não seja o campo 'n'

         func_instalar_dependencia "${dep}"

     done

     func_verificar_dependencias

     if [[ "${dependencias_faltando[n]}" -eq 0 ]]; then

         echo -e "${verde_claro}Todas as dependências foram instaladas!${neutro}"

         exit 0

     else

         echo -e "${amarelo_claro}Algumas dependências não puderam ser instaladas!${neutro}"

         exit 1

     fi

 }


 function func_instalar_dependencia {

     local dependencia="$1"
     local tentativas=0 # Guarda quantas vezes esta função foi executada
     local max_tentativas=2


     while [[ "$tentativas" -lt "$max_tentativas" ]]; do


         echo -e "${ciano_claro}Instalando $1...${neutro}"

         "${gerenciador_pacotes}" install -y "${dependencia}"



         if func_verificar_dependencia "${dependencia}"; then

             echo -e "${verde_claro}Instalação de ${ciano_claro}$1${verde_claro} concluída!${neutro}"

             return 0

         else

             tentativas=$((tentativas + 1))

         fi

     done

     echo -e "
${vermelho_claro}Algo deu errado: ${amarelo_claro}não foi possível instalar ${dependencia}! \
${ciano_claro}Você está conectado(a) à internet?${neutro}
"
     return 1

 }


# <------------ Instalações _ Fim --------------------------------->



 func_iniciar "$@"
