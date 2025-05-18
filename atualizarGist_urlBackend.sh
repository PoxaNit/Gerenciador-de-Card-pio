#!/bin/bash

 # Este script serve para atualizar um gist no github que contém a
 # URL dinâmica do backend para meu frontend do projeto gerenciador
 # de cardápio, tornando possível a comunicação back-front do
 # meu projeto em tempo real.



 if [[ $# -gt 1 ]]; then

     echo "Este script só aceita uma opção. Uso: atualizarGist_urlBackend.sh [-OPÇÃO]"

     exit 1

 fi


 if [[ $1 = "--help" || $1 = "-h" ]]; then

     caminho=$(pwd)

     echo "

 Uso: ${caminho}/atualizarGist_urlBackend.sh [-OPÇÃO]

 Opções disponíveis:

 -r, --retornar-resposta   Retorna a saída gerada pela API do GitHub após a atualização do gist;

 -R, --retornar-url        Retorna a URL do backend pronta para uso em requisições;

 -h, --help                Exibe este pequeno manual.

"

     exit 0

 fi


 [[ $# -eq 0 ]] && echo -e "\033[1;36mAtualizando Gist da URL...\033[0m"



# Pegando a URL gerada pelo Ngrok
 url=$(curl -s http://localhost:4040/api/tunnels |
 jq -r ".tunnels[0].public_url")


# Preparando os dados para fazer a requisição
 source .env
 url_api="https://api.github.com/gists"


# Montando o conteúdo
 conteudo_json=$(jq -n --arg url "$url" '{"backend_url":$url}')

 json=$(jq -n --arg content "$conteudo_json" '{"files":{"config.json":{"content":$content}}}')


 # Pegando a URL do gist a ser atualizado
 url_gist=$(curl -s -H "Authorization: token ${updateGist_urlBackend}" "{$url_api}" | jq -r .[0].url)


 # Atualizando o gist com a URL do backend
 dados=$(
 curl -s -X PATCH \
 -H "Authorization: token ${updateGist_urlBackend}" \
 -H "Content-Type: application/json" \
 -d "${json}" \
 "${url_gist}"
)


 [[ $# -eq 0 ]] && echo -e "\033[1;32mAtualização feita!\033[0m"


 [[ $# -eq 0 ]] && exit 0


 if [[ $1 = "--retornar-resposta" || $1 = "-r" ]]; then

     echo "${dados}" | jq .

     exit 0

 elif [[ $1 = "--retornar-url" || $1 = "-R" ]]; then

   # Retornar a URL do backend

     urlBackend=$(echo "$dados" | jq -r .files.[].raw_url | xargs curl -s | jq -r .backend_url)

     sed -i -e "s#^urlBackend=.*#urlBackend=\"${urlBackend}\"#" .env

     echo "$urlBackend"

     exit 0

 else

     echo -e "\033[1;33mO Gist foi atualizado, mas o argumento $1 é inválido!\033[0m"

     exit 1

 fi
