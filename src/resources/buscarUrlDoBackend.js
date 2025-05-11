

 /*
*   A URL do endpoint do backend que este sistema se comunica está
*   guardado em um gist, e para pegar essa url, é necessário,
*   obviamente, fazer requisição a este gist. O gist retornará um JSON
*   com suas informações ( informações dele, para ser claro ), dentre
*   elas a "raw url" ( url crua), que é a url direta do arquivo
*   ( config.json ) onde está guardado outro json que agora contém
*   a url do backend ( cuja chave é backend_url ).
 */







 async function buscarUrlDoBackend (callback = () => {}) {


   // Fazendo requisição à API do GitHub Gists e
   // pegando a URL do arquivo que guarda a url do backend
     const resp = await fetch("https://api.github.com/gists/ee5a403e4797b562ee2aa1f16de48a89"); 
     const json = await resp.json();



     const url  = json.files["config.json"].raw_url;






  //  Pegando a url do backend do arquivo config.json do gist
     const URL_BACKEND = await fetch(url).then(r => r.json());





  // Na prática, ao chamar esta função ( buscarUrlDoBackend ), deve-se
  // passar uma função de callback para manipular o uso da URL ( como
  // por exemplo, guardá-la em um estado ), ou fazer algo mais
  // complexo seja necessário

     await
     callback(URL_BACKEND.backend_url); // A função de callback que é
					// usada para manipular e
					// guardar a url em um estado.






 /*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*  Devido a eu não ter encontrado um host de hospedagem de backend
*  que cumpre com todos os meus requisitos, eu tive que usar outros
*  métodos, como fazer um tunelamento de rede que conecta meu backend
*  diretamente à internet, permitindo que ele possa ser acessado do
*  mundo todo, e para manter o front ciente dessa URL (ela é dinâmica,
*  muda a todo momento), eu fiz uso do GitHub Gists para guardar a URL
*  atualizada em um arquivo JSON, e esta função deve justamente fazer
*  requisição a essa API para buscar a URL do backend guardada lá.
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

}


  export default buscarUrlDoBackend;
