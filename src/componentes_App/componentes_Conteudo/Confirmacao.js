import React from "react";
import styles from "./Confirmacao.module.css";

 function Confirmacao ({mensagem, func_negativo, func_positivo}) {

     return (<div id={styles.container}>

         <h2 id={styles.mensagem}>{mensagem}</h2>

         <section id={styles.btns}>

	     <button onClick={() => func_negativo()}>Não</button>
	     <button onClick={() => func_positivo()}>Sim</button>

         </section>

     </div>);

 };

 export default Confirmacao;
