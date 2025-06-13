
#Avisos

por algum motivo, no momento em que desenvolvo este 
projeto, imagens que têm cabeçalhos EXIF (que foram 
tiradas usando flash, por exemplo) são corrompidas ao 
chegar no servidor (eu uso o PHP -S, servidor embutido de 
desenvolvimento). Então se a imagem que você carregar 
tanto na criação quanto na atualização de pratos não 
estiver sendo retornada corretamente do servidor, 
provavelmente é isso.


Este aplicativo é mobile-first justamente porque no 
momento em que desenvolvo, é o único recurso que tenho 
disponível. Testar responsividade para telas maiores 
olhando apenas pelo celular não é fácil, então para uma 
melhor experiência com o app, teste-o no celular.


Você pode rodar o projeto executando o script rodarApp.sh
na raíz do projeto.




#Dependências

Este app foi desenvolvido no Termux e foi feito para 
rodar em ambientes Unix-like (Linux). Também assume que o 
Bash é o shell padrão do seu sistema, então para evitar 
confusões, ative o shell Bash.

O Ngrok é usado para fazer o tunelamento de rede e
disponibilizar o app na internet via url.

O Back-End é feito em PHP, então para rodar esse projeto 
na sua máquina, você deve ter o PHP instalado.

Deve-se ter também o React (biblioteca JavaScript) 
instalado para rodar o Front-End.

Para uma melhor experiência, esteja conectado à internet, 
pois algumas páginas estáticas usam Bootstrap via CDN 
para estilizações.















#Arquivo .env e variáveis de ambiente

O arquivo .env deve estar na raíz do projeto e seguir a sintaxe 
do bash, podendo ter apenas atribuições de variáveis e 
comentários (com #). Nunca deixe comandos no script, pois isso 
pode resultar em comportamentos inesperados ou perigosos.


##Variáveis que o sistema espera


###token_gist

Esta variável é a mais importante, pois ela deve armazenar
o token de autenticação do github com permissão 'gist' para
que as requisições internas funcionem. Caso já preenchida, ela
não será modificada pelo script 'configurar_variaveis_ambiente.sh'.

###urlBackend

Ela é preenchida e usada pelo sistema automaticamente, não
precisa mexer com ela. É nela onde o sistema guarda a url
do backend, pois como este app usa ngrok para disponibilizar
este projeto na internet, a url passa a ser dinâmica, muda
a todo momento.

###porta

Esta variável contém a porta da sua máquina onde o app vai
ser rodado e o ngrok vai tunelar, conectando essa porta
diretamente à internet. O valor padrão é 8080.

###caminho_logs_react

Esta variável o caminho do arquivo temporário onde os logs
do react (npm start) vão aparecer. Se não quiser editá-la ou
preenchê-la, o sistema cuidará disso sozinho com um caminho
padrão.

###caminho_logs_php

Esta variável o caminho do arquivo temporário onde os logs do 
php vão aparecer. Se não quiser editá-la ou preenchê-la, o 
sistema cuidará disso sozinho com um caminho padrão.

###rodarApp_pid

Esta variável guarda o caminho do diretório (temporário)
onde os PIDs dos subprocessos criados estarão guardados para
gerenciamento interno do próprio sistema. Se você não fornecer
um valor, o sistema usará um caminho padrão.

###caminho_banco

Esta variável guarda o caminho onde está o banco de dados
(não necessariamente, pois você precisa fornecer a localização exata
de onde o banco do sistema está, relativo à raiz do projeto) que
será usado pelo sistema.

###caminho_imagens

Esta variável guarda o caminho da pasta que guarda as
imagens dinâmicas dos usuário, usado pelo sistema.
Assim como 'caminho_banco', você precisa garantir que
esta variável realmente guarde o caminho correto da
pasta imagens.

###tentativas_sem_conexao

Esta variável guarda o número de vezes que você tentou rodar
o app sem estar conectado à internet, para que o sistema saiba
quando exibir uma mensagem de ajuda. Seu valor é de 0 a 2.



###Configurador das variáveis de ambiente

O script 'configurar_variaveis_ambiente' serve para
preencher o arquivo .env corretamente, com formas
flexíveis de fazer isso. Basta executar './configurar_variaveis_ambiente.sh'
na raiz do projeto. Por padrão ele pedirá que você
forneça o valor de cada variável, mas se quiser deixar
totalmente com ele, use a opção -f para forçar a configuração
padrão do sistema. Use a opção --help ou -h para obter
ajuda de como usá-lo e as opções que ele aceita.




##Considerações

Basicamente, você só precisa se preocupar com as variáveis
'token_gist' e 'porta', todas as outras são opcionais ou
não tem efeito com sua edição.















#Observação

Este projeto foi desenvolvido para fins de portfólio.
