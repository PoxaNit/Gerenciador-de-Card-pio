import React from "react";
import styles from "./LayoutCategoria.module.css";
import FiltrarPratosPrincipais from "./functions_LayoutCategoria/FiltrarPratosPrincipais";
import FiltrarLanches from "./functions_LayoutCategoria/FiltrarLanches";
import FiltrarSobremesas from "./functions_LayoutCategoria/FiltrarSobremesas";


  function LayoutCategoria ({pratos, filtragemAtiva, setFiltragemAtiva}) {


      const Opcoes = React.useMemo(function () {


         function filtrarPratosPrincipais () {

	     <FiltrarPratosPrincipais />

	     return null;

         };


         function filtrarLanches () {

	     <FiltrarLanches />

	     return null;

         };



         function filtrarSobremesas () {

	     <FiltrarSobremesas />

	     return null;

         };











          return (

              <section className={styles.s2}>

		  <header>

	              <h3>Escolha a categoria:</h3>

		  </header>

		  <main>

    	              <button onClick={() => filtrarPratosPrincipais()} id={styles.s2b1}>Pratos principais</button>
	              <button onClick={() => filtrarLanches()} id={styles.s2b2}>Lanches</button>
	              <button onClick={() => filtrarSobremesas} id={styles.s2b3}>Sobremesas</button>

		  </main>

              </section>
          );
      }, []);












      return (

          <div className={styles.conteudo}>

	      <section>

   	          <button id={styles.b1} onClick={() => setFiltragemAtiva(false)}>Todos</button>
	          <button id={styles.b2} onClick={() => setFiltragemAtiva(true)}>Por categoria</button>

	      </section>

	      {filtragemAtiva && <Opcoes />}

          </div>
      );







  };

 export default React.memo(LayoutCategoria);
