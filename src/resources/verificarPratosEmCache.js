
 function verificarPratosEmCache
	     (
              chave = "",
              tratamento = () => {}, //Caso alguma função de callback deva ser executada em cadeia (parâmetro não obrigatório)
	      executarTratamentoEmCasoNegativo = false
	     )

{

     const pratos = sessionStorage.getItem(chave);

     if (pratos) {

         const json = JSON.parse(pratos);

         tratamento();

         return json;

     } else {

         executarTratamentoEmCasoNegativo && tratamento();

         return false;

     }

}

 export default verificarPratosEmCache;
