//Este componente renderiza uma interface onde serão apresentadas as informações do prato em questão

import React from "react";
import styles from "./ExibirInformacoesPrato.module.css";
import MenuOpcoes from "./componentes_ExibirInformacoesPrato/MenuOpcoes.js";
import MensagemConfirmar from "../../MensagemConfirmar.js";
import FormularioDeAtualizacao from "./componentes_ExibirInformacoesPrato/FormularioDeAtualizacao.js";
import Contexto from "../../Contexto.js";
import Autenticado from "../../Autenticado.js";


 export default function Exibir_informacoes_prato ({
   infos_prato, //objeto com as informações do prato em questão
   controle, //controla quando este componente deve ser renderizado ou des-renderizado
   coordenadas_tela_componente_pai, //ao des-renderizar este componente, a tela do usuário deve voltar para as coordenadas que estava antes ( as coordenadas estão armazenadas neste parâmetro de função ), evitando bugs de rolagem de tela
   setCoordenadasTela, //função para mudar as coordenadas da tela do usuário para onde estava antes deste componente ser renderizado
   este_componente_fechou //serve para avisar ao componente pai ( ListaPratos.js ) quando este componente fechar, para executar tarefas relacionadas a isso
}) {




  const { eParaAtualizarOsFiltrados, setAtualizar, setPratos } = React.useContext(Contexto); //quando usada, esta função de estado serve para re-fazer a requisição dos pratos no componente pai e exibir a lista atualizada
  const { session_id, urlBackend } = React.useContext(Autenticado);

  const [componente, setComponente] = React.useState(); //armazena as cordenadas de tela passadas pelo componente pai (ListaPratos.js).
  const [precoPrato, setPrecoPrato] = React.useState(); //armazena o preço formatado do prato para exibir
  const [controle_useCallback, setControle_useCallback] = React.useState(true); //controla a execução das operações iniciais
  const [confirmar_deletar, setConfirmar_deletar] = React.useState(false); //controla quando o o alerta de confirmação deve aparecer, para confirmar se o usuário vai mesmo deletar este prato do menu
  const [exibirMenuOpcoes, setExibirMenuOpcoes] = React.useState(false); //controla quando o menu com as opções de deletar e atualizar este prato deve ser exibido
  const [dispararFormularioAtualizacao, setDispararFormularioAtualizacao] = React.useState(false); //controla quando o formulário usado para alterar as informações deste prato deve ser renderizado










/*                     Área das operações com rolagem de tela                   */




  const [coordenadas_tela_este_componente, setCoordenadas_tela_este_componente] = React.useState({x: 0, y: 0}); //armazena as coordenadas de tela deste componente no momento em que o componente do formulário de atualização for renderizado, para evitar bugs de tela.


  const guardarCoordenadas = React.useCallback(function () {

      setCoordenadas_tela_este_componente({x: window.scrollX, y: window.scrollY});

  }, []);



  React.useEffect(function () {

      guardarCoordenadas();

  }, [guardarCoordenadas]);








/*------------------------------------------------------------------------------*/










/*------- Funções relacionadas à mensagem de confirmação ------*/





   function fecharMensagem_deletarConfirmacao_cancelar () { //função que irá fechar o alerta de confirmação sem deletar este prato

	setConfirmar_deletar(false);

	setExibirMenuOpcoes(true);

  b};




   function fecharMensagem_deletarConfirmacao_ok () { //fecha o alerta de confirnação dando ok para deletar este prato

	async function deletar_este_prato () {

	    try {

	        const dados = await JSON.stringify(infos_prato);

	        const deletou = await fetch(urlBackend + "/deletarPrato.php", {
		    			   method: "POST",
					   body: dados
					   }).then(resposta => resposta.json());

		if (deletou.sucesso) {

                    const chave = "pratos_" + session_id;

	            const valor = JSON.stringify(deletou);

		    setCoordenadasTela(componente);

		    este_componente_fechou(true);

		    controle({renderizar: false, infos: null})

		    sessionStorage.removeItem(chave);

		    sessionStorage.setItem(chave, valor);

		    setPratos(deletou);

		    if (eParaAtualizarOsFiltrados) setAtualizar(true);

	        } else {

		    throw new Error("Prato não foi deletado!");

	        };

	    } catch (exceção) {

		alert(exceção);

	    };

        };

        deletar_este_prato();

   };




/*------------------///////////////////////--------------------*/










/*------------- Operações iniciais deste componente -----------*/

  const primeirasOperacoes = React.useCallback(() => {

      if (controle_useCallback) {

        setComponente(coordenadas_tela_componente_pai);

        window.scrollTo(0, 0);

          if (infos_prato.preco_prato.toString().includes(".")) {

	      const preco_formatado = parseFloat(infos_prato.preco_prato).toFixed(2).toString().replace(".", ","); //formata o preço deste prato para uma melhor exibição

	      setPrecoPrato(preco_formatado);

              setControle_useCallback(false);

          } else {

	      setPrecoPrato(infos_prato.preco_prato);

              setControle_useCallback(false);

          };

      };

  }, [infos_prato.preco_prato, controle_useCallback, coordenadas_tela_componente_pai]);




  React.useEffect(() => {

      primeirasOperacoes();

  }, [primeirasOperacoes]);



/*------------------///////////////////////--------------------*/







 if (!dispararFormularioAtualizacao) {

     return (

         <div id={styles.corpo}>

             {exibirMenuOpcoes === true  && <MenuOpcoes deletarEstePrato={setConfirmar_deletar} fecharMenu={setExibirMenuOpcoes} dispararFormularioAtualizacao={setDispararFormularioAtualizacao} />}

             {confirmar_deletar && <MensagemConfirmar _mensagem={"Deseja tirar este prato do menu?"} _fechar_mensagem_func={fecharMensagem_deletarConfirmacao_cancelar} _confirmar_ok_func={fecharMensagem_deletarConfirmacao_ok} />}

             <header className={styles.header97}>

                 <section className={styles.section1}>

                     <button className={styles.botaoVoltar} onClick={() => {

	                 setCoordenadasTela(componente);

	                 este_componente_fechou(true);

	                 controle({renderizar: false, infos: null})

                     }}>Voltar</button>


                     <button className={styles.botaoDeOpcoes} onTouchEnd={() => {

                         if (confirmar_deletar === true) return 0;

                         if (exibirMenuOpcoes === false) setExibirMenuOpcoes(true);

                     }}>

	                 <img src={urlBackend + "/imagens.php?img=images.png"} alt="foto de menu" />

                     </button>

                 </section>

                 <section className={styles.section2}>

                     <h1 id={styles.h1}>{infos_prato.nome_prato}</h1>

                     <img src={urlBackend + "/imagens.php?img=" + infos_prato.imagem_prato + "&&tipo=nao-estatico"} alt="Imagem do prato não carregada!" />

                 </section>

             </header>

             <main className={styles.main97}>

                 <section id={styles.sh}>

                     <h2 id={styles.h2}>Informações deste prato</h2>

                 </section>

                 <section id={styles.sectionPreco}>

                     <p>Preço: <span>R${precoPrato}</span></p>

                 </section>

                 <section id={styles.sectionDescricao}>

                     <p>Descrição: <span>{infos_prato.descricao_prato}</span></p>

                 </section>

                 <section id={styles.sectionCategoria}>

                     <p>Categoria: <span>{infos_prato.categoria_prato}</span></p>

                 </section>

                 <section id={styles.sectionIngredientes}>

                     <p>Ingredientes: <span>{infos_prato.ingredientes_prato}</span></p>

                 </section>

                 <section id={styles.sectionRestricoes}>

                     <p>Alergias/Restrições: <span>{infos_prato.alergias_restricoes_prato}</span></p>

                 </section>

             </main>

         </div>
     );

 } else {

     return <FormularioDeAtualizacao coordenadas_alvo_botao_voltar={coordenadas_tela_este_componente} coordenadas_alvo={componente} exibirInfo_fechou={este_componente_fechou} mover_tela={setCoordenadasTela} informacoes_antigas={infos_prato} exibirFormulario={setDispararFormularioAtualizacao} />

 }

}
