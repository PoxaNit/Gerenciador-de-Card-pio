#!/bin/bash

 # Este script preenche o arquivo .env com as configurações
 # que o sistema precisa para funcionar.








# <--ÍNDICE--------------------------------------------------------->



  # As funções têm o prefixo "func" para diferenciar das variáveis.

  # Funções que verificam a existência de variáveis no .env têm o
  # prefixo "func_verificar".

  # Funções que validam variáveis têm o prefixo "func_validar".

  # Funções que fornecem valores para variáveis usadas neste
  # script têm o prefixo "func_fornecer"

  # Funções de aviso têm o prefixo "func_aviso"









  # <-----NOTA-------------------------------------------------->
  #								\
  # Use o atalho do seu editor para pesquisar o padrão de cada  \
  # bloco deste script (no GNU nano, use ctrl+f, por exemplo).  \
  #								\
  # <----------------------------------------------------------->


    # Para as funções de configuração, pesquise por "- con".

    # Para as funções de fornecimento, pesquise por "- for".

    # Para as funções que pegam os valores das variáveis no .env,
    # pesquise por "- peg"

    # Para as funções que verificam se variáveis existem no .env,
    # pesquise por "- ver"

    # Para as funções que validam as variáveis do .env, pesquise
    # por "- val"

    # Para as funções de avisos, pesquise por "- avi"


# <--ÍNDICE _ FIM--------------------------------------------------->
























 function func_iniciar {

     func_tratar_argumentos "$@"

     func_configurar

 }




 function func_exibir_ajuda {

     echo "
Uso: ./configurar_variaveis_ambiente.sh [OPÇÕES]

A função deste script é atualizar o arquivo .env na \
raíz do projeto com as variáveis de ambiente que o sistema \
espera para funcionar. Este script faz a atualização \
de várias maneiras:

forçando tudo para o valor padrão;

atualizando somente as variáveis que não têm valor/não \
foram declaradas;

pedindo interativamente que você forneça \
o valor de cada variável. Esta última abordagem é o comportamento \
padrão, e por padrão só pedirá valores para as variáveis 'token_gist' \
e 'porta', que são as mais importantes.

Para comportamento mais flexível, segue a lista de opções que este script aceita:



  -f, --forcar-configuracao-padrao

      Força o script a atualizar as variáveis do .env com o valor \
padrão que o sistema já usa.



  -F, --configuracao-filtrada

      Executa o este script na configuração filtrada, onde somente as variáveis \
que não têm valor ou não foram definidas no .env são modificadas, \
recebendo seus valores padrão.



  -i, --ignorar-avisos

      Ignora avisos que o script dá quando executado no comportamento \
de configuração filtrada caso haja valores não suportados pelo sistema \
em algumas variáveis. Isto trocará automaticamente os valores não \
suportados pelos valores padrão. Esta opção só funcionará ao ser usada em \
conjunto com -F ou --configuracao-filtrada.


  -t, --tudo-interativo

      Faz o script pedir valor para todas as variáveis no comportamento interativo \
      (por padrão o script só pede as variáveis 'token_gist' e 'porta').


  -h, --help

      Exibe este manual.

"

 }




 function func_tratar_argumentos {




     [[ $# -gt 2 ]] && {

         echo -e "\033[0;33mconfigurar_variaveis_ambiente.sh\033[0m: \033[1;31margumentos demais!\033[0m" >&2

         exit 1

     }






     args=("$@")

     for arg in "${args[@]}"; do

         if [[ "$arg" = "--help" ]] || [[ "$arg" = "-h" ]]; then

             func_exibir_ajuda

             exit 0

         elif [[ "$arg" = "--forcar-configuracao-padrao" ]] || [[ "$arg" = "-f" ]]; then

             configuracao_padrao_forcada=1

         elif [[ "$arg" = "--ignorar-avisos" ]] || [[ "$arg" = "-i" ]]; then

             ignorar_avisos=1

         elif [[ "$arg" = "--configuracao-filtrada" ]] || [[ "$arg" = "-F" ]]; then

             configuracao_filtrada=1

         elif [[ "$arg" = "--tudo-interativo" ]] || [[ "$arg" = "-t" ]]; then

             tudo_interativo=1

         else

             echo -e "\033[0;36mconfigurar_variaveis_ambiente.sh\033[0m: \033[1;31merro\033[0m: argumento inválido: \033[0;33m${arg}\033[0m" >&2

         fi

     done

 }
















# <------------------------ Configurações ----------------------------------->


 function func_configurar {

     if [[ "$configuracao_padrao_forcada" = 1 ]]; then

         func_pegar_vars

         func_configuracao_padrao_forcada

     elif [[ "$configuracao_filtrada" = 1 ]]; then

         func_verificar_variaveis_existem

         func_pegar_vars

         func_validar_vars

         func_configuracao_filtrada

     else

         func_configuracao_interativa

     fi

 }













 function func_configuracao_filtrada { # Configura somente as variáveis que o usuário não configurou ainda

 env_tmp=".env_tmp"

 echo "\
token_gist=$([[ -z "${token_gist}" ]] && echo "'Token GitHub com permissão Gist aqui!'" || echo "'${token_gist}'")
urlBackend=$([[ -z "${urlBackend}" ]] && echo "'Preenchida pelo sistema automaticamente.'" || echo "'${urlBackend}'")
porta=$([[ -z "$porta" ]] && echo 8080 || echo "$porta")
caminho_logs_react=$([[ -z "$caminho_logs_react" ]] && echo "tmp/.logs_react_tmp.txt" || echo "$caminho_logs_react")
caminho_logs_php=$([[ -z "$caminho_logs_php" ]] && echo "tmp/.logs_php_tmp.txt" || echo "$caminho_logs_php")
caminho_rodarApp_pid=$([[ -z "$caminho_rodarApp_pid" ]] && echo "tmp/caminho_rodarApp_pid" || echo "$caminho_rodarApp_pid")



#Esta variável armazena quantas vezes o usuário tentou executar ./rodarApp.sh e
#o script disse que não havia conexão. Este caso só acontecerá caso as tentativas
#de conexão com hosts falharem na verificação de conexão.
tentativas_sem_conexao=$([[ -z "$tentativas_sem_conexao" ]] && echo 0 || echo "$tentativas_sem_conexao")
" > ${env_tmp}
 mv ${env_tmp} .env

 }


















 function func_configuracao_padrao_forcada { # Configura o .env com valores padrões independente de já estar configurado

 env_tmp=".env_tmp"

 echo "\
token_gist=$([[ -z "${token_gist}" ]] && echo "'Token GitHub com permissão Gist aqui!'" || echo "'${token_gist}'")
urlBackend=$([[ -z "${urlBackend}" ]] && echo "'Preenchida pelo sistema automaticamente.'" || echo "'${urlBackend}'")
porta=8080
caminho_logs_react=tmp/.logs_react_tmp.txt
caminho_logs_php=tmp/.logs_php_tmp.txt
caminho_rodarApp_pid=tmp/caminho_rodarApp_pid


#Esta variável armazena quantas vezes o usuário tentou executar ./rodarApp.sh e
#o script disse que não havia conexão. Este caso só acontecerá caso as tentativas
#de conexão com hosts falharem na verificação de conexão.
tentativas_sem_conexao=0
" > ${env_tmp}

 mv ${env_tmp} .env

 }



 function func_configuracao_interativa {

     if [[ -z "$tudo_interativo" ]]; then

         func_fornecer_porta

         func_fornecer_token_gist

         func_configuracao_filtrada

     else

         func_fornecer_porta

         func_fornecer_token_gist

         func_fornecer_caminho_logs_php

         func_fornecer_caminho_logs_react

         func_fornecer_caminho_rodarApp_pid

         func_configuracao_filtrada

     fi

 }




# <------------------------- Configurações _ Fim ----------------------------->






























# <----------------------- Pegando variáveis ------------------------------>

 function func_pegar_vars {

     token_gist=$(grep -Po "^\s*token_gist=['\"]?\K[^'\";\s]*" .env)
     urlBackend=$(grep -Po "^\s*urlBackend=['\"]?\K[^'\"\s;]*" .env)
     porta=$(grep -Po "^\s*porta=['\"]?\K[^'\";\s]*" .env)
     caminho_logs_react=$(grep -Po "\s*caminho_logs_react=['\"]?\K[^'\"\s;]*" .env)
     caminho_logs_php=$(grep -Po "\s*caminho_logs_php=['\"]?\K[^'\";\s]*" .env)
     caminho_rodarApp_pid=$(grep -Po "\s*caminho_rodarApp_pid=['\"]?\K[^'\"\s;]*" .env)
     tentativas_sem_conexao=$(grep -Po "^\s*tentativas_sem_conexao=['\"]?\K[^'\";\s]*" .env)

 }



# <----------------------- Pegando variáveis _ Fim ------------------------------>


































 # <---------------------- Verificando se variável existe --------------------->



 function func_verificar_variaveis_existem { # Verifica se elas já estã definidas no .env

     func_verificar_var_existe_porta

     func_verificar_var_existe_tentativas_sem_conexao

 }




 function func_verificar_var_existe_porta {

     if grep -Po "^\s*porta=['\"]?\K[^'\"\s;]*" .env &> /dev/null; then

         var_existe_porta=1

     fi

 }



 function func_verificar_var_existe_tentativas_sem_conexao {

     if grep -Po "^\s*tentativas_sem_conexao=['\"]?\K[^'\";\s]*" .env &> /dev/null; then

         var_existe_tentativas_sem_conexao=1

     fi

 }





 # <---------------------- Verificando se variável existe _ Fim --------------->

























 # <---------------------------- Validações de variáveis ------------------------->


 function func_validar_var_porta {


     [[ -z "$var_existe_porta" ]] && return 1 # Se a variável não for encontrada no .env, é ilógico ela ser validada. Ela deve ser escrita lá.


     if [[ ! "$porta" =~ ^[1-9][0-9]{3}$ ]]; then

         if [[ -z "$ignorar_avisos" ]]; then

             clear

             func_aviso_var_porta

             echo -e "\033[1;36mDeseja fornecer um número? Padrão: \033[1;33m8080\033[0m"

             echo -e "(Aperte \033[0;33ms\033[0m para sim ou \033[0;33mqualquer outra coisa\033[0m para não)"

             read -n 1 r




             if [[ "$r" = "s" ]] || [[ "$r" = "S" ]]; then

                 func_fornecer_porta

             else

                 porta=8080

             fi



         else

             porta=8080

         fi



     fi


 }



 function func_validar_var_tentativas_sem_conexao {

     [[ -z "$var_existe_tentativas_sem_conexao" ]] && return 1


     [[ ! "$tentativas_sem_conexao" =~ ^[0-2]$ ]] &&
     tentativas_sem_conexao=0

 }




 function func_validar_vars {

     func_validar_var_porta

     func_validar_var_tentativas_sem_conexao

 }





 # <----------------------- Validações de variáveis _ Fim ------------------------>























 # <----------------------- Fornecimentos ------------------------------------>




  function func_fornecer_porta {

      clear

      a=$1

      echo -e "Forneça um \033[0;32mnúmero\033[0m com \033[0;36m4\033[0m \033[0;33mdígitos\033[0m, sendo o primeiro \033[0;33mnão-zero\033[0m:"

      [[ ! -z $a ]] && echo -e "\033[0;33mValor de entrada \033[1;31minválido\033[0m!"

      read -n 4 n

      [[ ! "$n" =~ ^[1-9][0-9]{3}$ ]] && func_fornecer_porta "erro" ||
      porta="$n"

  }


 function func_fornecer_token_gist {

     clear

     echo -e "Forneça o token com permissão \033[0;32mgist\033[0m:"

     read token

     token_gist="$token"

 }

 function func_fornecer_caminho_logs_php {

     clear

     echo -e "Forneça um caminho para os logs do \033[0;36mphp\033[0m:"

     read caminho

     caminho_logs_php="$caminho"

 }


 function func_fornecer_caminho_logs_react {

     clear

     echo -e "Forneça um caminho para os logs do \033[0;36mreact\033[0m:"

     read caminho

     caminho_logs_react="$caminho"

 }


 function func_fornecer_caminho_rodarApp_pid {

     clear

     echo -e "Forneça um caminho para onde os \033[0;33mPIDs\033[0m dos \033[1;31msubprocessos\033[0m deverão ir:"

     read caminho

     caminho_rodarApp_pid="$caminho"

 }

 # <----------------------- Fornecimentos _ Fim --------------------------------->











 # <----------------------- Avisos de variáveis -------------------------------->



 function func_aviso_var_porta {

     echo -e "\033[1;31mAviso\033[0m: a variável \033[0;33mporta\033[0m em \
\033[0;36m.env\033[0m não está no formato esperado (\033[0;36m4\033[0m \033[0;33mdígitos\033[0m, sendo o primeiro \033[0;36mnão-zero\033[0m). \
"


 }









 # <----------------------- Avisos de variáveis _ Fim -------------------------->




func_iniciar "$@"
