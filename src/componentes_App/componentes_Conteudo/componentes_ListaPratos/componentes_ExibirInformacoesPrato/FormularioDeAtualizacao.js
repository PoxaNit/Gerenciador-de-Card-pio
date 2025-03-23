
//ESTE COMPONENTE EXIBIRÁ UM FORMULÁRIO ONDE O USUÁRIO PODERÁ DAR NOVAS INFORMAÇÕES AO PRATO EM QUESTÃO.

import React from "react";
import MensagemAlerta from "../../../MensagemAlerta.js";
import Contexto from "../../../Contexto.js";
import styles from "./FormularioDeAtualizacao.module.css";
import Autenticado from "../../../Autenticado.js";
import atualizarEstePrato from "./funcoes_FormularioDeAtualizacao/atualizarEstePrato.js";


 export default function FormularioDeAtualizacao ({
   informacoes_antigas,
   exibirFormulario, //booleano que controla quando este componente deve ser renderizado
   mover_tela, //Função para mover a tela devolta para a posição que estava quando o usuário clicou em uma opção na lista de pratos no componente ListaPratos.js
   coordenadas_alvo, //Armazena as coordenadas às quais a tela deve ser rolada
   exibirInfo_fechou, //Função que avisa para o componente ListaPratos.js quando o componente ExibirInformacoesPrato.js fechar, para ocorrer as operações necessárias relativas a isso.
   coordenadas_alvo_botao_voltar = {}, //coordenadas de tela do componente pai ( ExibirInformacoesPrato.js ) para a tela ser rolada quando o usuário apertar no botão de voltar
 }) {


   const coordenadasDeTelaDoComponentePai = coordenadas_alvo_botao_voltar;

   const formulario = React.useRef(); //Faz referência ao formulário de atualização deste componente.

   const { session_id } = React.useContext(Autenticado);


   const [novosDados_prato, despachar] = React.useReducer(reducer, { //local de armazenamento dos novos dados
     novo_nome_prato: "",
     novo_descricao_prato: "",
     novo_preco_prato: "",
     novo_categoria_prato: "",
     novo_ingredientes_prato: "",
     novo_alergias_restricoes_prato: "",
     novo_imagem_prato: "/" + informacoes_antigas.imagem_prato
});




  function reducer (novosDados_prato, acao) {

	switch (acao.tipo) {

       	  case "mudar nome":

	    return {...novosDados_prato, novo_nome_prato: acao.valor};

	  case "mudar descricao":

	    return {...novosDados_prato, novo_descricao_prato: acao.valor};

	  case "mudar preco":

	    return {...novosDados_prato, novo_preco_prato: acao.valor};

	  case "mudar categoria":

	    return {...novosDados_prato, novo_categoria_prato: acao.valor};

	  case "mudar ingredientes":

	    return {...novosDados_prato, novo_ingredientes_prato: acao.valor};

	  case "mudar alergias_restricoes":

	    return {...novosDados_prato, novo_alergias_restricoes_prato: acao.valor};

	  case "mudar imagem":

	    return {...novosDados_prato, novo_imagem_prato: acao.valor};

	  default:

	    return novosDados_prato;

   };

 };





 const [novosDadosPreenchidos, setNovosDadosPreenchidos] = React.useState(false); //verdadeiro se todos os novos dados tiverem conteúdo

 const { eParaAtualizarOsFiltrados, setAtualizar, setPratos, setComponenteExibir, setTermoPesquisado } = React.useContext(Contexto); //as funções para arualizar a lista de pratos


 const [dispararAlerta, setDispararAlerta] = React.useState({mensagem: "", tempo: 0, disparar: false}); //controla quando a mensagem de alerta deve ser exibida


  function funcaoParaUseCallback_novosDados () {


	if ( //verifica se todas as infornações novas estão preenchidas
 novosDados_prato.novo_nome_prato &&
 novosDados_prato.novo_descricao_prato &&
 novosDados_prato.novo_preco_prato &&
 novosDados_prato.novo_categoria_prato &&
 novosDados_prato.novo_ingredientes_prato &&
 novosDados_prato.novo_alergias_restricoes_prato &&
 novosDados_prato.novo_imagem_prato )   {

	  setNovosDadosPreenchidos(true);

 } else {

      setNovosDadosPreenchidos(false);

 };



 };



  const tratando_novos_dados = React.useCallback(funcaoParaUseCallback_novosDados, [novosDados_prato]);


  React.useEffect(() => {

	tratando_novos_dados();

 }, [tratando_novos_dados]);





  const [imagem_prato_novo, setImagem_prato_novo] = React.useState(novosDados_prato.novo_imagem_prato); //apenas armazena a imagem nova carregada pelo usuário para uma requisição futura
  const [novaImagemCarregada, setNovaImagemCarregada] = React.useState("");



  function tratarImagem(arquivo) {
     const leitor = new FileReader();

     leitor.onload = () => {

	const arquivoBase64 = leitor.result;
	despachar({tipo: "mudar imagem", valor: arquivoBase64});
	setImagem_prato_novo(arquivoBase64); //arquivo de imagem que será mandada separadamente em uma futura requisição
	setNovaImagemCarregada(leitor.result);
     };

     leitor.readAsDataURL(arquivo);
  };





 async function tratarSalvamento () {

   if (novosDadosPreenchidos) {

        await atualizarEstePrato(
              formulario,
              novaImagemCarregada,
              imagem_prato_novo,
              setPratos,
              session_id,
              informacoes_antigas
             );


	setTermoPesquisado("");
        mover_tela(coordenadas_alvo);
        setComponenteExibir({infos: null, renderizar: false});
	exibirInfo_fechou(true); //Avisa ao componente ListaPratos.js quando o pai deste componente ( ExibirInformacoes.js ) fechar, para que as operações relacionadas ocorram.
        if (eParaAtualizarOsFiltrados) {setAtualizar(true)}

  } else {

	setDispararAlerta({
	    mensagem: "Forneça todos os novos dados",
	    tempo: 2000,
	    disparar: true,
        });

  };


 };



 return (
 <>
 {dispararAlerta.disparar && <MensagemAlerta mensagem={dispararAlerta.mensagem} tempo={dispararAlerta.tempo} setDispararAlerta={setDispararAlerta} exibir={dispararAlerta.disparar} /> }

   <form ref={formulario} onSubmit={e => e.preventDefault()} className={styles.formulario}>


     <section id={styles.sectionHeader}>


 	<h1 id={styles.title}>Formulário de atualização</h1>


     </section>


     <section className={`${styles.sectionComInput} ${styles.sectionNome}`}>


       <label htmlfor="novoNome">Novo nome:</label>

       <br/>

       <input name="novo_nome_prato" onChange={e => despachar({tipo: "mudar nome", valor: e.target.value})} type="text" required id="novoNome" /*value={novosDados_prato.novo_nome_prato}*/ />


     </section>




     <section className={styles.sectionDescricao}>


       <label htmlfor="novaDescricao" className={styles.sectionComTextarea}>Nova descrição:</label>

       <br/>

       <textarea name="novo_descricao_prato" onInput={e => despachar({tipo: "mudar descricao", valor: e.target.value})} /*value={novosDados_prato.novo_descricao_prato}*/ required id="novaDescricao"></textarea>


     </section>




     <section className={`${styles.sectionComInput} ${styles.sectionPreco}`}>


       <label htmlfor="novoPreco">Novo preço (R$):</label>

       <br/>

       <input type="number" name="novo_preco_prato" onInput={e => despachar({tipo: "mudar preco", valor: Number(e.target.value)})} required id="novoPreco" /*value={novosDados_prato.novo_preco_prato}*/ />


     </section>




     <section className={styles.sectionCategoria}>


       <label htmlfor="novaCategoria">Nova categoria:</label>

       <select id="novaCategoria" name="novo_categoria_prato" required onChange={e => despachar({tipo: "mudar categoria", valor: e.target.value})}>


	 <option selected disabled>Escolher</option>

	 <option value="pratos principais">     Pratos principais    </option>

	 <option value="lanches">     Lanches              </option>

	 <option value="sobremesas">     Sobremesas           </option>


       </select>


     </section>



     <section className={styles.sectionComInput_file}>

       <label htmlfor="novaImagem">Nova imagem:</label>

       <br/>

       <input type="file" name="imagem_prato_novo" onChange={e => tratarImagem(e.target.files[0])}  />

       <br/>

       <img src={imagem_prato_novo} alt="Selecione uma imagem" />

     </section>



     <section className={styles.sectionIngredientes}>


       <label htmlfor="novosIngredientes" className={styles.sectionComTextarea}>Novos ingredientes:</label>

       <br/>

       <textarea required id="novosIngredientes" name="novo_ingredientes_prato" onInput={e => despachar({tipo: "mudar ingredientes", valor: e.target.value})} ></textarea>


     </section>




     <section className={styles.sectionRestricoes}>


       <label htmlfor="novasAlergias_restricoes" className={styles.sectionComTextarea}>Alergias/restrições (mudar):</label>

       <br/>

       <textarea required id="novasAlergias_restricoes" name="novo_alergias_restricoes_prato" onInput={e => despachar({tipo: "mudar alergias_restricoes", valor: e.target.value})}></textarea>


     </section>


     <section id={styles.sectionComBotoes}>

       <button onClick={() => {

		function rolarTela () {

			window.scrollTo(coordenadasDeTelaDoComponentePai.x, coordenadasDeTelaDoComponentePai.y);

  };  rolarTela();


		exibirFormulario(false)}}>Sair</button>

       <button onClick={() => tratarSalvamento()} disabled={!novosDadosPreenchidos}>Salvar</button>

     </section>

   </form>
 </>
 )

 }
