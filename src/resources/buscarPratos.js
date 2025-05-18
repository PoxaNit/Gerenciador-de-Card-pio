
 async function buscarPratos (
	   urlBackend,
           tratamento = function () {}, //Parâmetro opcional para uma possível função que deva ser executada em cadeia
           executarTratamentoEmCasoDeFalha = false)
{

     const pratos = await fetch(urlBackend + "/retornar_dados.php")
                              .then(resposta => resposta.json());

     if (pratos.sucesso) {

         tratamento();

         return pratos;

     } else {

         executarTratamentoEmCasoDeFalha && tratamento();

         return null;

     }
}

 export default buscarPratos;
