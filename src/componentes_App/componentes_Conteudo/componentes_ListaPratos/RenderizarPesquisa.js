import React from "react";
import styles from "./RenderizarPesquisa.module.css";

export default function RenderizarPesquisa ({setModoPesquisarPratos, pratos, termoPesquisado, setTermoPesquisado}) {

  const [valor, setValor] = React.useState("");

 return (<>


    <div className={styles.header_pesquisa}>

	<label>Pesquisa por nome:</label>
	<input
	type="text"
	value={valor}
	onInput={e => {setTermoPesquisado(e.target.value); setValor(e.target.value)}}
	/>

	<button
	onClick={() => {setTermoPesquisado(""); setModoPesquisarPratos(false)}}>
	Fechar
	</button>

    </div>


 </>)
};
