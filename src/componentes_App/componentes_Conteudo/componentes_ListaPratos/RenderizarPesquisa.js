import React from "react";
import styles from "./RenderizarPesquisa.module.css";

export default function RenderizarPesquisa ({setModoPesquisarPratos, pratos, termoPesquisado, setTermoPesquisado}) {

 return (<>


    <div className={styles.header_pesquisa}>

	<label>Pesquisa por nome:</label>
	<input
	type="text"
	value={termoPesquisado}
	onInput={e => {setTermoPesquisado(e.target.value)}}
	/>

	<button
	onClick={() => {setTermoPesquisado(""); setModoPesquisarPratos(false)}}>
	Fechar
	</button>

    </div>


 </>)
};
