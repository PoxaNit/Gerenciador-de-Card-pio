
async function atualizarEstePrato (
   urlBackend,
   formulario = null,
   novaImagemCarregada = false,
   imagem_prato_novo = null,
   setPratos = () => {},
   session_id,
   informacoes_antigas) {

    const corpoDaRequisicao = new FormData(formulario.current);
    corpoDaRequisicao.append("informacoes_antigas", JSON.stringify(informacoes_antigas));




    if (!novaImagemCarregada) {

        const resposta = await fetch(imagem_prato_novo);

        const dadosBinariosDaImagem = await resposta.arrayBuffer();

        const imagemPadrao = new File([dadosBinariosDaImagem], "imagem.jpg", {type: "image/jpeg"});

        corpoDaRequisicao.append("imagem_prato_novo", imagemPadrao);
     };

     const dados = await fetch(urlBackend + "/atualizarPrato.php?ngrok-skip-browser-warning=true", {
               method: "POST",
               body: corpoDaRequisicao
           }).then(r => r.json());

//Chave para os dados em cache
     const chave = 'pratos_' + session_id;

//Envolvendo um JSON em outro JSON porque o cache do sistema espera que os dados estejam em JSON,
//e na hora de usar tentará fazer conversão dos dados.
     const valor = JSON.stringify(dados);

//Deixando os pratos disponíveis globalmente na aplicação.
     await sessionStorage.clear();
     await sessionStorage.setItem(chave, valor);

     setPratos(dados);

 };

 export default atualizarEstePrato;
