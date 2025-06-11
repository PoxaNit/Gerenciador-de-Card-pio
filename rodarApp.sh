#!/bin/bash



 # Execute este script para inicializar este app.
 # Cancele-o (^C) para parar de executar o App.





   # Prevenindo a tentativa de passar argumentos demais

     if [[ $# -gt 3 ]]; then

         clear

         echo -e "\033[1;41m Argumentos demais!"

         exit 1

     fi













 function exibir_ajuda {

     echo -e "

 Uso: ./rodarApp.sh [options]

 opções disponíveis:

   --logs-react, -r

       Executa o script no modo de exibir os logs do React para
       caso você queira modificar o código na sua máquina, permitindo
       você ver os feedbacks. É basicamente a habilitação das mensagens
       de desenvolvimento que aparecem quando você roda 'npm start' em um
       projeto react na fase dev.


   --sem-avisos, -s

       Desabilita alguns avisos que aparecem durante a execução do script.
       Use caso queira limpeza e legibilidade na interface.

   --pular-verificacao-internet, -p

       Pula o processo de verificação de conexão à internet. Esta opção é
       útil para caso o processo falhe. Use ela quando você tiver certeza
       que tem conexão à internet e o script insiste em dizer que não.
       Esta falha pode ocorrer quando os hosts para os quais o script
       tenta se conectar não estão disponíveis por algum motivo.


   --help, -h

       Exibe este texto de ajuda.

"

 }










   # Definindo o comportamento do script com base nas flags passadas pelo usuário

     argumentos=("$@")

     for arg in "${argumentos[@]}"; do

         if [[ "${arg}" = "--logs-react" ]] || [[ "${arg}" = "-r" ]]; then

             logs_react_ativo=1

         elif [[ "${arg}" = "--sem-avisos" ]] || [[ "${arg}" = "-s" ]]; then

             sem_avisos=1

         elif [[ "${arg}" = "--help" ]] || [[ "${arg}" = "-h" ]]; then

             exibir_ajuda

             exit 0

         elif [[ "${arg}" = "--pular-verificacao-internet" ]] || [[ "${arg}" = "-p" ]]; then

             pular_verificacao=1

         else

             echo -e "Argumento não reconhecido: ${arg}"

             exit 1

         fi

     done











 if grep -Pv "^\s*([a-zA-Z_][a-zA-Z0-9_]*=.*[\n;&<>/]?|#.*)?$" .env &> /dev/null; then

     echo -e "\033[0;31mErro:\033[0m a \033[0;33msintaxe\033[0m no \033[0;36m.env\033[0m deve conter \
apenas atribuições de variáveis como \033[0;36m'variavel=valor'\033[0m e \033[0;36mcomentários\033[0m! \
Verifique se o \033[0;36m.env\033[0m está escrito corretamente!"

     exit 1

 fi





















# <--------------------- Declarando as funções ------------------------------>




 function iniciar {

   # Executando as funções

     verificar_dependencias

     ajustarLocalizacao

     validar_env_local # Verifica se o arquivo .env existe na raiz do projeto

     pegar_env_vars

     validar_env_vars

     criarPasta_tmp

     criarPasta_PIDs

     verificarConexaoInternet

     declarar_ngrok

     iniciar_limpeza_imagens

     ligarServidores

     ajustarInterface

 }






 function verificar_dependencias {

     ./verificar_dependencias.sh ||
     exit 1

 }





 function verificarConexaoInternet {

     [[ ! -z "${pular_verificacao}" ]] && return 0

     echo -e "\033[1;36mVerificando conexão à internet...\033[0m"


     local hosts=("8.8.8.8" "google.com")


  # Se qualquer um desses hosts responder, o usuário está conectado
     for host in "${hosts[@]}"; do

         if { ping "${host}" & a=$!; sleep 1; kill $a; } &> /dev/null; then

             echo -e "\033[1;32mVerificação Concluída!\033[0m"

             return 0

         fi

     done



  # Validando a declaração da variável no .env
     if ! grep -P "^\s*tentativas_sem_conexao=[0-2]" .env &> /dev/null; then

         ./configurar_variaveis_ambiente.sh

         tentativas_sem_conexao=0

     elif [[ ! "$tentativas_sem_conexao" =~ ^[0-2]$ ]]; then

         tentativas_sem_conexao=0

     fi


  # Verificando quantas vezes o usuário tentou executar o sript conectado
  # mas o sript deu erro, para dar a mensagem.
     [[ "${tentativas_sem_conexao}" = 2 ]] &&
     sed -i -e "s|^tentativas_sem_conexao=.*|tentativas_sem_conexao=0|" .env ||
     sed -i -e "s|^tentativas_sem_conexao=.*|tentativas_sem_conexao=$((tentativas_sem_conexao + 1))|" .env


     [[ "${tentativas_sem_conexao}" = 2 ]] &&

     echo -e "
Está conectado(a) à internet mas o script dá erro? Tente:
\033[1;32m./rodarApp.sh [\033[1;35m--pular-verificacao-internet\033[1;32m | \033[1;35m-p\033[1;32m]\033[0m
" ||

     echo -e "\033[1;31mVerifique sua conexão à internet!\033[0m"

     exit 1



 }









#previne erros se o usuário não estiver no local certo na raiz do projeto
 function ajustarLocalizacao {

     localAtual=$(pwd)

     localCorreto=$(pwd | grep -o ".*/cadastro_produtos_restaurante")

     [[ -z "$localCorreto" ]] && echo "Venha até a raiz do projeto para rodá-lo. Use cd ~/.../cadastro_produtos_restaurante e execute este script novamente!" && exit 1

     if [[ ! "${localAtual}" = "${localCorreto}" ]]; then

         echo "Você precisa ir para a raiz do projeto antes de rodá-lo. Navegue para ${localCorreto} e execute este script novamente!"

         exit 1

     fi
}



 function declarar_ngrok {

     arquitetura=$(uname -m)

     case "$arquitetura" in

       x86_64)  comando_ngrok="${localCorreto}/bin/ngrokx86_64"         ; ;;
       aarch64) comando_ngrok="${localCorreto}/bin/ngrokARM64"          ; ;;
       armv7l)  comando_ngrok="${localCorreto}/bin/ngrokARM"            ; ;;

       *) echo -e "\033[1;33mArquitetura não suportada!\033[0m"; exit 1 ; ;;

     esac

 }


 function ngrok {

     eval "$comando_ngrok $1 $2"

 }



 function validar_env_local { # Valida se o arquivo .env está na raiz do projeto

     ls "${localCorreto}/.env" &> /dev/null || {

         echo -e "\033[0;31mErro\033[0m: arquivo \033[0;36m.env\033[0m não foi encontrado na raiz do projeto!"

         exit 1

     }

 }















 function pegar_env_vars {

     token_gist=$(grep -Po "^\s*token_gist=['\"]?\K[^'\";\s]*" .env)

     porta=$(grep -Po "^\s*porta=['\"]?\K[^'\";\s]*" .env)

     caminho_logs_react=$(grep -Po "^\s*caminho_logs_react=['\"]?\K[^'\";\s]*" .env)

     caminho_logs_php=$(grep -Po "^\s*caminho_logs_php=['\"]?\K[^'\";\s]*" .env)

     caminho_rodarApp_pid=$(grep -Po "^\s*caminho_rodarApp_pid=['\"]?\K[^'\";\s]*" .env)

     tentativas_sem_conexao=$(grep -Po "^\s*tentativas_sem_conexao=['\"]?\K[^'\";\s]" .env)

 }

















 function validar_env_vars { # Valida se o arquivo .env está como o esperado

     if [[ -z "${token_gist}" ]]; then

         echo -e "\033[1;31mErro\033[0m: A variável de ambiente \033[0;33m'token_gist' \033[0mestá vazia em \033[0;36m.env\033[0m!\
 Ela deve conter o token de autenticação do GitHub com permissão \033[1;32mGist\033[0m\
 para fazer as operações internas." >&2

         exit 5

     elif [[ -z "${porta}" ]]; then

         echo -e "\033[1;31mErro\033[0m: A variável de ambiente \033[0;33m'porta' \033[0mestá vazia em \033[0;36m.env\033[0m!\
 Ela deve conter a porta onde o app vai rodar na sua máquina. Exemplo:\
 \033[0;33m8080\033[0m." >&2

         exit 5

     fi



     [[ -z "${caminho_rodarApp_pid}" ]] &&
     caminho_rodarApp_pid=tmp/caminho_rodarApp_pid

     [[ -z "${caminho_logs_react}" ]] &&
     caminho_logs_react=tmp/.logs_react_tmp.txt

     [[ -z "${caminho_logs_php}" ]] &&
     caminho_logs_php=tmp/.logs_php_tmp.txt


     [[ ! "$porta" =~ ^[0-9]{4}$ ]] && {

         echo -e "\033[0;31mErro\033[0m: a variável \033[0;33mporta\033[0m \
em \033[0;36m.env\033[0m deve conter apenas \033[0;32mnúmeros\033[0m \
de \033[0;36m4\033[0m \033[0;33mdígitos\033[0m! Atualmente ela é: \
\033[0;33m${porta}\033[0m."

         exit 1

     }

     return 0

 }





















 function criarPasta_PIDs { # Cria a pasta onde os PIDs dos subprocessos vão ficar

   # Criando a pasta temporária para armazenar os IDs dos processos
     mkdir -p "${localCorreto}/$([[ -z ${caminho_rodarApp_pid} ]] && echo tmp/caminho_rodarApp_pid || echo ${caminho_rodarApp_pid})"

 }



 function criarPasta_tmp {

     mkdir -p tmp

 }













 function iniciar_limpeza_imagens {

   # Previne contra o acúmulo de lixo na pasta das imagens
     ./src/backend/orquestraLimparPastaImagens.sh & echo $! > "$([[ -z ${caminho_rodarApp_pid} ]] && echo caminho_rodarApp_pid || echo ${caminho_rodarApp_pid})/orquestraLimpeza.pid"

 }




































#Roda o projeto
 function ligarServidores {

   # Criando os arquivos temporários dos logs
     [[ $logs_react_ativo = 1 ]] &&
     > "${localCorreto}/${caminho_logs_react}"
     > "${localCorreto}/${caminho_logs_php}"


   # Ligando o servidor de desenvolvimento do React
     [[ $logs_react_ativo = 1 ]] &&
     npm start &> "${caminho_logs_react}" & echo $! > "${localCorreto}/${caminho_rodarApp_pid}/node.pid"



   # Ligando o servidor de desenvolvimento do PHP
     caminhoBackend="./src/backend"

     cd "$caminhoBackend"

     php -S 0.0.0.0:${porta} -t . >> "${localCorreto}/${caminho_logs_php}" 2>&1 & echo $! > "${localCorreto}/${caminho_rodarApp_pid}/php.pid"

     ngrok http $porta &> /dev/null & echo $! > "${localCorreto}/${caminho_rodarApp_pid}/ngrok.pid"

     cd ../../

     sleep 3

     echo -e "\033[1;32mAtualizando Gist e pegando a URL do Backend...\033[0m"

     urlBackend=$(./atualizarGist_urlBackend.sh -R || echo $?)
     [[ $urlBackend = 1 ]] &&
     echo -e "\033[1;31mErro:\033[0m Verifique se o \033[0;33mtoken_gist\033[0m no \033[0;36m.env\033[0m contém um \033[0;32mtoken válido\033[0m!" &&
     exit 4

}
























#Dá feedback ao usuário
 function ajustarInterface {

     clear

     [[ $logs_react_ativo = 1 ]] && [[ -z $sem_avisos ]] &&
     aviso_react

     clear

     menu
}






















 function pararProjeto {

     clear

     echo -e "\033[1;33mEliminando subprocessos...\033[1;32m"





     [[ $logs_react_ativo = 1 ]] &&
     rm "${localCorreto}/${caminho_logs_react}"

     rm "${localCorreto}/${caminho_logs_php}"







   # Matando o processo do Ngrok usado para tunelar o backend para a internet
     pkill -f "ngrok http ${porta}"

   # Matando o sleep iniciado no script 'orquestraLimparPastaImagens.sh' manualmente,
   # pois se não ele persiste
     kill -s 9 $(ps --ppid $$ | grep orquestra | awk '{print $1}' | xargs echo | xargs ps --ppid | grep sleep | awk '{print $1}')











   # Matando os processos iniciados a partir desse script em recursão
   # (os filhos dos filhos).
     eliminar_subprocessos $$ > /dev/null 2>&1












   # <---NOTA------------------------------------------------------------------------->
   #
   # A função 'eliminar_subprocessos' não serve para matar o 'ngrok' e o
   # 'sleep' finalizados acima porque aqueles processos são iniciados a partir de outro
   # processo, não sendo filhos diretos deste script, significando que eles não
   # podem ser encontradoa na árvore de recursão da função 'eliminar_subprocessos'.
   # O 'Ngrok', por exemplo, é iniciado a partir deste script, mas em seguida ele passa
   # o controle para um processo filho gerado por ele mesmo e morre. Então os processos
   # 'Ngrok' que você pode ver com 'ps' ou 'top' não são filhos diretos deste script.
   # Sobre o 'sleep' iniciado em 'orquestraLimparPastaImagens.sh', ele é rodado em segundo
   # plano em um subshell, e quando o script é finalizado, o 'sleep' acaba ficando
   # persistente.
   #
   # <-------------------------------------------------------------------------------->
}























 function menu {

     [[ ! -z conectado ]] &&
     echo -e "\033[1;33m App Rodando em ${urlBackend}\033[0m" ||
     echo -e "\033[1;31mSem Conexão\033[0m"






     echo -e "\033[1;36m

 O que gostaria de fazer?

 1) Ver os logs do React

 2) Ver os logs do PHP

 3) Sair (parar de rodar o app)

\033[0m

"



# NOTA

 # Algumas barras invertidas (\) na mensagem abaixo servem apenas para manter
 # a legibilidade ao mesmo tempo que preserva a formatação da saída no terminal

 [[ -z $sem_avisos ]] &&
     echo -e "
 Para uma visualização completa dos logs, dê uma olhada no arquivo
 \033[1;33m'${caminho_logs_php}'\033[0m\
 a partir da raiz do projeto para ver os logs do servidor, e
 no arquivo \033[1;33m'${caminho_logs_react}'\033[0m\
 para ver os logs do React, também a partir da
 raiz do projeto (este só aparecerá se você tiver executado este script com a flag
 \033[1;35m--logs-react\033[0m ou \033[1;35m-r\033[0m).
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

     echo -e "\033[1;30mDigite \"v\" para voltar ao menu\033[0m"

     echo -e "\033[1;32m"

     [[ $# -ne 1 ]] && echo "rodarApp.sh: func exibirLogs: deve-se passar um argumento para a função. Esperado: exibirLogs <r|p>" && return 1


     if [[ $1 = "r" ]]; then


         [[ $logs_react_ativo = 1 ]] && {

             tail -f "${localCorreto}/${caminho_logs_react}" & echo $! > "${localCorreto}${caminho_rodarApp_pid}/tail_logReact.pid"

         }







         [[ -z $logs_react_ativo ]] && echo -e "\033[1;36m

 Os logs do React estão desabilitados.\033[0m
\033[1;33m
 Para habilitá-los, execute este script novamente com a opção
\033[1;37m
 --logs-react \033[1;33mou \033[1;37m-r
\033[1;33m
 Assim: \033[1;32m./rodarApp.sh [\033[1;37m--logs-react \033[1;32m| \033[1;37m-r\033[1;32m]


\033[1;37m
 Isto serve para caso você queira modificar
 o código do react na sua máquina, para poder ver
 os feedbacks.
\033[0m
"











     elif [[ $1 = "p" ]]; then

         tail -f -n 20 "${localCorreto}/${caminho_logs_php}" & echo $! > "${localCorreto}/${caminho_rodarApp_pid}/tail_logPhp.pid"

     fi

     while true; do

         read -n 1 n

         [[ "$n" = "v" ]] || [[ "$n" = "V" ]] && break

     done

     echo -e "\033[0m"

     voltarAoMenu

}




















 function voltarAoMenu {

     for f in "${caminho_rodarApp_pid}"/tail*.pid; do

         kill $(cat $f) &> /dev/null

     done

     clear

     menu

}



















 function aviso_react {

     echo -e "
\033[1;33m
 AVISO:
\033[0m
  Ao executar este script com as flags que ativam os logs do \033[0;36mReact\033[0m, o \033[0;32mnpm start\033[0m
  é executado internamente.

  Devido a este app usar CRA (\033[0;36mCreate-React-App\033[0m) para o React, pode ser que o
  navegador irá abrir automaticamente o app (provavelmente na porta \033[0;33m3000\033[0m),
  mas maneira planejada de acessar o app na internet é usando a \033[0;33mURL \033[0mgerada pelo
  \033[0;36mNgrok\033[0m (será dita qual é). Então se você tiver confusões quanto a redirecionamentos
  ou a URL, o aviso foi dado.

"

 echo -e "\033[1;36m(Aperte qualquer tecla para continuar)\033[0m"

 read -n 1 t

}




















 function eliminar_subprocessos {

     local pid_pai=$1
     local filhos=$(ps --ppid $pid_pai | awk '{print $1}' | grep -e "^[0-9]\+$")

     for pid in $filhos; do

         eliminar_subprocessos $pid

     done

     kill -s 9 $pid_pai

 }




# <--------------------------------------------------------------------------------->




# Para quando o usuário fizer ^C para parar o programa
  trap "pararProjeto" SIGINT












 iniciar
