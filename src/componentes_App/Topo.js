//Este arquivo gera um topo de página onde ficarão configurações e onde o usuário poderá fazer log-out
import React from "react";
import styles from "./Topo.module.css";
import Autenticado from "./Autenticado.js";


 function Topo () {

     const { usuario_nome } = React.useContext(Autenticado);

     const [mostrar, setMostrar] = React.useState(false);











     function logout() {

         window.location = "http://0.0.0.0:8000/autenticacao/logout.php";

     };











     function deletarConta () {

         

     };














     return (

         <header id={styles.conteudo} className={!mostrar ? styles.esconder_menu : styles.mostrar_menu}>

	     <section className={styles.section1}>

	         <p>Usuário(a): <strong>{usuario_nome}</strong></p>

  	         <button onClick={() => setMostrar(m => !m)}>Conta <img alt="Opções de conta" src="/configurar.png"/></button>

             </section>


	     <section className={styles.section2}>

	         <button onClick={() => logout()}>Sair da conta <img src="/logout_icon.png" alt="ícone de logout" /></button>

		 <button onClick={() => deletarConta()}>Deletar conta <img alt="Ícone de lixeira" src="/lixeira.png" id={styles.lixeira_img}/></button>

             </section>

         </header>
     );

 };

 export default Topo;
