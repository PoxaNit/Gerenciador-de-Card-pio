
 async function buscarPratos (
           tratamento = function () {}, //Parâmetro opcional para uma possível função que deva ser executada em cadeia
           executarTratamentoEmCasoDeFalha = false)
{

     const pratos = await fetch("/retornar_dados")
                              .then(resposta => resposta.json());

     if (pratos.sucesso) {

         console.log("Pratos buscados: " + pratos.msg);

         tratamento();

         return pratos;

     } else {

         console.log("Não foi possível retornar os pratos: " + pratos.msg);

         executarTratamentoEmCasoDeFalha && tratamento();

         return null;

     }
}

 export default buscarPratos;
