import React from "react";
import Contexto from "../../../Contexto.js";


  function FiltrarPratosPrincipais () {

      const { pratos, setPratosCategorizados } = React.useContext(Contexto);

      const pratosFiltrados = pratos.filter(prato => prato.categoria_prato === "pratos principais");

      setPratosCategorizados(pratosFiltrados);

      return null;

  };

  export default FiltrarPratosPrincipais;
