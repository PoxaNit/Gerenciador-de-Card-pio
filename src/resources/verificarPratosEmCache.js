
 function verificarPratosEmCache
	     (
              chave = "",
              tratamento = () => {}, //Caso alguma função de callback deva ser executada em cadeia (parâmetro não obrigatório)
	      executarTratamentoEmCasoNegativo = false
	     )

{

     const pratos = sessionStorage.getItem(chave);

     if (pratos) {

         console.log(`Há pratos no cache: ${pratos}`);

         const json = JSON.parse(pratos);

         tratamento();

         return json;

     } else {

         console.log('Não há pratos em cache!');

         executarTratamentoEmCasoNegativo && tratamento();

         return false;

     }

}

 export default verificarPratosEmCache;
