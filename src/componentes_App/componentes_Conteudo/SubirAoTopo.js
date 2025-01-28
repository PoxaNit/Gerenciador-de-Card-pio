import React from "react";
import styles from "./SubirAoTopo.module.css";



 export default function SubirAoTopo () {

     function subir () {

         window.scrollTo({top: 0, behavior: "smooth"});

     };

     return (

         <div className={styles.conteudo}>

	     <button onClick={subir}>Subir</button>

         </div>

     )
 };
