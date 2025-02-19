//Este arquivo gera um topo de página onde ficarão configurações e onde o usuário poderá fazer log-out
import React from "react";
import styles from "./Topo.module.css";
import Autenticado from "./Autenticado.js";

 function Topo () {

     const { usuario_nome } = React.useContext(Autenticado);

     function logout() {

         window.location = "http://0.0.0.0:8000/autenticacao/logout.php";

     };



     return (

         <div id={styles.conteudo}>

	     <p>Usuário(a): <strong>{usuario_nome}</strong></p>
	     <button onClick={() => logout()}>Sair da conta <img src="/logout_icon.png" alt="ícone de logout" /></button>

         </div>
     );

 };

 export default Topo;
