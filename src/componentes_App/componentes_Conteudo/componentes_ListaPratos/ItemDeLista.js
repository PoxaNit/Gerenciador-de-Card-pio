import React from "react";
import Contexto from "../../Contexto.js";
import styles from "./ItemDeLista.module.css";

 function ItemDeLista ({nomeDoPrato, imagemDoPrato, descricaoImagem, indiceParaItem, prato}) {


     const { setComponenteExibir } = React.useContext(Contexto);


     const [larguraDesktop, setLarguraDesktop] = React.useState(false);

     const [executarUseEffect, setExecutarUseEffect] = React.useState(true);






/*                 Tratando a Largura de Tela                 */

     /*Verifica se a tela é de desktop ou o usuário está em
     modo desktop*/
     const mql = window.matchMedia("(min-width: 900px)");

     React.useEffect(() => {

         /*Garante que o useEffect não faça infinitas
         renderizações*/
         if (executarUseEffect) {

             setExecutarUseEffect(false);

             /*Se o usuário estiver no desktop, atualiza
             o estado*/
             if (mql.matches) {

                 setLarguraDesktop(true);

             }

         }

     }, [mql.matches, executarUseEffect]);



     /*Função para fazer a mesma verificação a cada
     mudança na largura da tela (se o usuário redimensioná-la)
     */
     function larguraTelaEDesktop (evento) {

         if (evento.matches) {

             setLarguraDesktop(true);

         } else {

             setLarguraDesktop(false)

         }

     }


     mql.addEventListener("change", larguraTelaEDesktop);


/*       //////////////////////////////////////////////     */






        return (

        <li className={styles.item} key={indiceParaItem} onClick={() => {
          setComponenteExibir({renderizar: true, infos: prato});
}}>

         {/*Verificando o tamanho da tela para exibir o elemento correto*/}
         {!larguraDesktop ? <strong>{nomeDoPrato}</strong> : <h2>{nomeDoPrato}</h2>}
        <br/>
         <img alt={descricaoImagem} src={"/" + imagemDoPrato} />
        <br/>
         <p>Clique para ver</p>

        </li>
  )


 };

  export default ItemDeLista;
