//Este contexto serve para sincronizar os pratos da requisição ( em ListaPratos.js ) com os pratos filtrados por categoria, para que quando a lista dos requeridos for atualizada, a lista dos filtrados seja atualizada em tempo real.
import React from "react";



 const SincronizarPratos = React.createContext();


 export default SincronizarPratos;
