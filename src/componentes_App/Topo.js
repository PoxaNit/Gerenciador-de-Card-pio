//Este arquivo gera um topo de página onde ficarão configurações e onde o usuário poderá fazer log-out
import React from "react";
import styles from "./Topo.module.css";

 function Topo () {

     function logout() {

         window.location = "http://0.0.0.0:8000/autenticacao/logout.php";

     };



     return (

         <div id={styles.conteudo}>

	     <button onClick={() => logout()}>Sair da conta <img src="/logout_icon.png" /></button>

         </div>
     );

 };

 export default Topo;
