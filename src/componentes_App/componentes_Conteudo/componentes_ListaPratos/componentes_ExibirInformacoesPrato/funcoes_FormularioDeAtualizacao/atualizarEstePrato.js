
async function atualizarEstePrato (
   formulario = null,
   novaImagemCarregada = false,
   imagem_prato_novo = null,
   setPratos = () => {},
   session_id,
   informacoes_antigas) {
console.log(`SessionStorage antes: ${sessionStorage.getItem('pratos_' + session_id)}`)
    const corpoDaRequisicao = new FormData(formulario.current);
    corpoDaRequisicao.append("informacoes_antigas", JSON.stringify(informacoes_antigas));




    if (!novaImagemCarregada) {

        const resposta = await fetch(imagem_prato_novo);

        const dadosBinariosDaImagem = await resposta.arrayBuffer();

        const imagemPadrao = new File([dadosBinariosDaImagem], "imagem.jpg", {type: "image/jpeg"});

        corpoDaRequisicao.append("imagem_prato_novo", imagemPadrao);
     };

     const dados = await fetch("/atualizarPrato", {
               method: "POST",
               body: corpoDaRequisicao
           }).then(r => r.json());

console.log("Dados retornados em json: " + dados);

//Chave para os dados em cache
     const chave = 'pratos_' + session_id;

     const valor = JSON.stringify(dados);

//Deixando os pratos disponíveis globalmente na aplicação.
     await sessionStorage.clear();
     await sessionStorage.setItem(chave, valor);

     setPratos(dados);

console.log(`sessionStorage agora: ${sessionStorage.getItem('pratos_' + session_id)}`);
 };

 export default atualizarEstePrato;
