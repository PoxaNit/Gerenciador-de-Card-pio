import React from "react";
import CadastroPratos from "./componentes_Conteudo/CadastrarProdutos.js";
import ListaPratos from "./componentes_Conteudo/ListaPratos.js";
import styles from "./Conteudo.module.css";

 export default function Conteudo () {

   const [cadastro, setCadastro] = React.useState(false);
   const [lista, setLista]       = React.useState(false);


















  if (!cadastro && !lista) { return (

     <div className={styles.conteudo}>

         <header>

             <h1>Gerenciador de menu</h1>

             <button className={styles.relatorio}>Relatório do menu</button>

             <button className={styles.sobre}>Sobre esta aplicação</button>

         </header>

         <main>

             <button className={styles.menu} onClick={() => setLista(true)}>Ver menu</button>

             <button className={styles.cadastro} onClick={() => setCadastro(true)}>Cadastrar pratos</button>

         </main>

         <footer>

	 <p>
	     <small>

	         &copy;2025 Feito por <strong><em>César</em></strong>

	     </small>
	 </p>

         </footer>

     </div>

    )};































  if (cadastro) { return (<CadastroPratos setCadastro={setCadastro} />)};

  if (lista) { return (<ListaPratos setLista={setLista} />)};



}
