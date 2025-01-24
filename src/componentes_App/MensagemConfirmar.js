import React from "react";
import styles from "./MensagemConfirmar.module.css";

 export default function MensagemConfirmar ({
    _mensagem = "",
    _fechar_mensagem_func, //esta função tem o objetivo de fechar esta mensagem, mas pode executar tarefas adicionais!
    _confirmar_ok_func //e esta aqui tem o objetivo de confirmar, e também pode ser uaada para executar tarefas adicionais
 }) {



   return (
       <div id={styles.section_maior}>

	 <div id={styles.conteudo}>

		<section>

		    <h2>{_mensagem}</h2>

		</section>

		<section id={styles.section2}>

		    <button onClick={() => _fechar_mensagem_func()}>Não</button>
		    <button onClick={() => _confirmar_ok_func()}>Ok</button>

		</section>

	 </div>

	</div>

  );

 };
