import React from "react";
import Contexto from "../../../Contexto.js";


  function FiltrarPratosPrincipais () {

      const { pratos, setPratosPrincipais, setLanches, setSobremesas } = React.useContext(Contexto);

      setLanches([]);
      setSobremesas([]);

      const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "pratos principais");

      setPratosPrincipais(pratosFiltrados);

  };

  export default FiltrarPratosPrincipais;
