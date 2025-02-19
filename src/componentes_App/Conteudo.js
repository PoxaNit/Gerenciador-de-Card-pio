import React from "react";
import CadastroPratos from "./componentes_Conteudo/CadastrarProdutos.js";
import ListaPratos from "./componentes_Conteudo/ListaPratos.js";
import styles from "./Conteudo.module.css";
import RelatorioMenu from "./componentes_Conteudo/RelatorioMenu.js";
import Topo from "./Topo.js";
import SincronizarPratos from "./Contexto_sincronizacao_pratos.js";

 export default function Conteudo () {

   const [cadastro, setCadastro] = React.useState(false);
   const [lista, setLista]       = React.useState(false);
   const [relatorio, setRelatorio] = React.useState(false);

   const [eParaAtualizarOsFiltrados, setEParaAtualizarOsFiltrados] = React.useState(false);

  if (!cadastro && !lista && !relatorio) { return (<>

     <Topo />

     <div className={styles.conteudo}>

         <header>

             <h1>Gerenciador de menu</h1>

             <button onClick={() => setRelatorio(true)}
	     className={styles.relatorio}>Relatório do menu</button>

             <button className={styles.sobre}>Sobre esta aplicação</button>

         </header>

         <main>

             <button className={styles.menu} onClick={() => setLista(true)}>Ver menu</button>

             <button className={styles.cadastro} onClick={() => setCadastro(true)}>Cadastrar pratos</button>

         </main>

         <footer>

	 <p>
	     <small>

	         &copy;{new Date().getFullYear()} Feito por <strong><em>César</em></strong>

	     </small>
	 </p>

         </footer>

     </div>

     </>

    )};































  if (cadastro) { return (<CadastroPratos setCadastro={setCadastro} />)};

  if (lista) {

      return (
          <SincronizarPratos.Provider value={{eParaAtualizarOsFiltrados, setEParaAtualizarOsFiltrados}}>

              <ListaPratos setLista={setLista} />

          </SincronizarPratos.Provider>
      )};

  if (relatorio) { return (<RelatorioMenu setRelatorio={setRelatorio}/>)};

}
