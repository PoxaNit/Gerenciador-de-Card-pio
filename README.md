
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

O Back-End é feito em PHP, então para rodar esse projeto 
na sua máquina, você deve ter o PHP instalado.

Deve-se ter também o React (biblioteca JavaScript) 
instalado para rodar o Front-End.

Para uma melhor experiência, esteja conectado à internet, 
pois algumas páginas estáticas usam Bootstrap via CDN 
para estilizações.






#Observação

Este projeto foi desenvolvido para fins de portfólio.
