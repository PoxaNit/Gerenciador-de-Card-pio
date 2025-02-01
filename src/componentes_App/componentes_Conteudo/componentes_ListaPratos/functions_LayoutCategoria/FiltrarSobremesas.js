import React from "react";
import Contexto from "../../../Contexto.js";


  function FiltrarSobremesas () {

      const { pratos, setPratosPrincipais, setLanches, setSobremesas } = React.useContext(Contexto); //Para fazer atualizações diretas no ListaPratos.js

      setPratosPrincipais([]);
      setLanches([]);

      const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "sobremesas");

      setSobremesas(pratosFiltrados);

  };

  export default FiltrarSobremesas;
