import React from "react";
import buscarDoc from "../../resources/buscarDoc.js";
import styles from "./Documentacao.module.css";
import Autenticado from "../Autenticado.js";

 const Documentacao = ({exibirDoc}) => {

   const { urlBackend } = React.useContext(Autenticado);
   const [conteudo, setConteudo] = React.useState("<h1>CARREGANDO...</h1>");
   const executar = React.useRef(true);

   const busca = React.useCallback(async function () {

       if (executar.current)
           setConteudo(await buscarDoc(urlBackend));

   }, [urlBackend]);

   React.useEffect(() => {

       if (executar.current) {
           busca();
           executar.current = false;
       }

   }, [busca]);


   return (
    <div>

        <header id={styles.header}>
            <button onClick={() => { window.scrollTo(0, 0); exibirDoc(false); }}>Sair</button>
            <strong>Documentação</strong>
        </header>


        <main id={styles.main} dangerouslySetInnerHTML={{__html: conteudo}}>

        </main>

    </div>
  );

}

 export default Documentacao;
