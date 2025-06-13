import React from "react";
import styles from "./LayoutCategoria.module.css";
import Contexto from "../../Contexto.js";
import estilos_pai from '../ListaPratos.module.css';
import SincronizarPratos from "../../Contexto_sincronizacao_pratos.js";


  function LayoutCategoria ({
  pratos,
  filtragemAtiva,
  setFiltragemAtiva,
  botaoAtivo,
  setBotaoAtivo,
  atualizarListaFiltrada,
  setAtualizarListaFiltrada
  }) {

//    Define os pratos filtrados atuais
      const { setPratosCategorizados } = React.useContext(Contexto);

      const { /*eParaAtualizarOsFiltrados*/ setEParaAtualizarOsFiltrados } = React.useContext(SincronizarPratos);





      const Opcoes = React.memo(function () { //Exibe as opções de filtro



//        Área das funções de filtro

         function filtrarPratosPrincipais () {

             const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "pratos principais");

             setPratosCategorizados(pratosFiltrados);

	     setBotaoAtivo({pratos_principais: true});

             return null;

         };


         function filtrarLanches () {


             const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "lanches");

             setPratosCategorizados(pratosFiltrados);

	     setBotaoAtivo({lanches: true});

             return null;

         };



         function filtrarSobremesas () {

             const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "sobremesas");

             setPratosCategorizados(pratosFiltrados);

	     setBotaoAtivo({sobremesas: true});

             return null;

         };



  //       Fim


          React.useEffect(() => {

	      if (atualizarListaFiltrada && botaoAtivo?.pratos_principais) {

	          filtrarPratosPrincipais();

		  setAtualizarListaFiltrada(false);

	      };

	      if (atualizarListaFiltrada && botaoAtivo?.lanches) {

	          filtrarLanches();

		  setAtualizarListaFiltrada(false);

	      };

	      if (atualizarListaFiltrada && botaoAtivo?.sobremesas) {

	          filtrarSobremesas();

		  setAtualizarListaFiltrada(false);

	      };


	  }, []);




          return (

              <section className={styles.s2}>

		  <header>

	              <h3>Escolha a categoria:</h3>

		  </header>

		  <main>

    	              <button id={(botaoAtivo?.pratos_principais && styles.botao_ativado) || (styles.s2b1)} onClick={() => filtrarPratosPrincipais()}>Pratos principais</button>

	              <button id={(botaoAtivo?.lanches && styles.botao_ativado) || (styles.s2b2)} onClick={() => filtrarLanches()}>Lanches</button>

	              <button id={(botaoAtivo?.sobremesas && styles.botao_ativado) || (styles.s2b3)} onClick={() => filtrarSobremesas()}>Sobremesas</button>

		  </main>

              </section>

          );

      }, []);






//Limpa o array dos pratos filtrados e fecha as opções de filtro
     function limparFiltragem () {

	 setPratosCategorizados([]);

	 setBotaoAtivo({botao_todos: true});

         setFiltragemAtiva(false);

	 setEParaAtualizarOsFiltrados(false);

     };


     function ligarFiltragem () {

	 if (!pratos) {

	     return null;

	 };

         if (botaoAtivo?.botao_todos) {

             const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "pratos principais");

             setFiltragemAtiva(true);

             setPratosCategorizados(pratosFiltrados);

             setBotaoAtivo({pratos_principais: true});

	     setEParaAtualizarOsFiltrados(true);

         }

     };

      return (

          <div className={styles.conteudo}>

	      <section>

   	          <button id={(!filtragemAtiva && estilos_pai.botao_todos_ativo) || (styles.b1)} onClick={() => limparFiltragem()}>Todos</button>

	          <button id={styles.b2} onClick={() => ligarFiltragem()}>Por categoria</button>

	      </section>

	      {pratos && filtragemAtiva && <Opcoes />}

          </div>
      );





  };

 export default LayoutCategoria;
