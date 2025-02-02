import React from "react";
import styles from "./LayoutCategoria.module.css";
import Contexto from "../../Contexto.js";

  function LayoutCategoria ({pratos, filtragemAtiva, setFiltragemAtiva}) {






      const { setPratosCategorizados } = React.useContext(Contexto);










      const Opcoes = React.memo(function () {




//        Área das funções de filtro

         function filtrarPratosPrincipais () {

             const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "pratos principais");

             setPratosCategorizados(pratosFiltrados);

             return null;

         };


         function filtrarLanches () {


             const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "lanches");

             setPratosCategorizados(pratosFiltrados);

             return null;

         };



         function filtrarSobremesas () {

             const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "sobremesas");

             setPratosCategorizados(pratosFiltrados);

             return null;

         };



  //       Fim









          return (

              <section className={styles.s2}>

		  <header>

	              <h3>Escolha a categoria:</h3>

		  </header>

		  <main>

    	              <button onClick={() => filtrarPratosPrincipais()} id={styles.s2b1}>Pratos principais</button>
	              <button onClick={() => filtrarLanches()} id={styles.s2b2}>Lanches</button>
	              <button onClick={() => filtrarSobremesas()} id={styles.s2b3}>Sobremesas</button>

		  </main>

              </section>
          );
      }, []);






//Limpa o array dos pratos filtrados e fecha as opções de filtro
     function limparFiltragem () {

	 setPratosCategorizados([]);
         setFiltragemAtiva(false);

     };




      return (

          <div className={styles.conteudo}>

	      <section>

   	          <button id={styles.b1} onClick={() => limparFiltragem()}>Todos</button>
	          <button id={styles.b2} onClick={() => setFiltragemAtiva(true)}>Por categoria</button>

	      </section>

	      {filtragemAtiva && <Opcoes />}

          </div>
      );







  };

 export default LayoutCategoria;
