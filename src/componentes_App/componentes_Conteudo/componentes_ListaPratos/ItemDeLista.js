import React from "react";
import Contexto from "../../Contexto.js";

 React.useMemo(function ItemDeLista ({nomeDoPrato, imagemDoPrato, descricaoImagem, indiceParaItem, prato}) {

     const { setComponenteExibir } = React.useContext(Contexto);

        return (

        <li key={indiceParaItem} onClick={() => {
          setComponenteExibir({renderizar: true, infos: prato});
}}>
         <strong>{nomeDoPrato}</strong>
        <br/>
         <img alt={descricaoImagem} src={imagemDoPrato} />
        <br/>
         <p>Clique para ver</p>

        </li>
  )


 });

  export default ItemdeLista;
