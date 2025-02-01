import React from "react";
import Contexto from "../../../Contexto.js";


  function FiltrarLanches () {

      const { pratos, setPratosPrincipais, setLanches, setSobremesas } = React.useContext(Contexto);

      setPratosPrincipais([]);
      setSobremesas([]);

      const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "lanches");

      setLanches(pratosFiltrados);

  };

  export default FiltrarLanches;
