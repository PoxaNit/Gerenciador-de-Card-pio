#!/bin/bash

 # Este script preenche o arquivo .env com as configurações iniciais
 # que o sistema precisa para funcionar.



 source .env



 echo "\
updateGist_urlBackend=$([[ -z "${updateGist_urlBackend}" ]] && echo "'Token GitHub com permissão Gist aqui!'" || echo "'${updateGist_urlBackend}'")
urlBackend=$([[ -z "${urlBackend}" ]] && echo "'Preenchida pelo sistema automaticamente.'" || echo "'${urlBackend}'")
porta=8080
caminho_logs_react=tmp/.logs_react_tmp.txt
caminho_logs_php=tmp/.logs_php_tmp.txt
rodarApp_pid=tmp/rodarApp_pid



#Esta variável armazena quantas vezes o usuário tentou executar ./rodarApp.sh e
#o script disse que não havia conexão. Este caso só acontecerá caso as tentativas
#de conexão com hosts falharem na verificação de conexão.
tentativas_sem_conexao=0
" > .env
