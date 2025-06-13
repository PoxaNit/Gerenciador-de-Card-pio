
//ESTE COMPONENTE IRÁ EXIBIR UM MENU CONTENDO AS OPÇÕES DE ATUALIZAR E DELETAR PRATO NO COMPONENTE:    " ExibirInformacoesPrato.js "

import React from "react";
import styles from "./MenuOpcoes.module.css";


 export default function MenuOpcoes ({dispararFormularioAtualizacao = () => {}, deletarEstePrato = () => {}, fecharMenu = () => {}}) {


 return (

     <div className={styles.container}>

         <section id={styles.section1}>

	     <b>Opções</b>

	     <button onClick={() => fecharMenu(false)}>Fechar</button>

         </section>

         <section id={styles.section2}>

	     <button onClick={() => {

	         dispararFormularioAtualizacao(true);

		 fecharMenu(false); //manda o booleano para o componente pai decidir se este menu deve ser renderizado

             }}>Atualizar este prato

	     </button>

         </section>

         <section id={styles.section3}>

	     <button onClick={() => {

	         deletarEstePrato(true);

		 fecharMenu(false);
             }}>Deletar este prato

             </button>

         </section>

     </div>
 );
};
