import React from "react";

 const CasoNaoAutenticado = React.memo(() => {
/*
     const [mostrarBotao, setMostrarBotao] = React.useState(false);



     const executarUseEffect = React.useRef(true);









     React.useEffect(() => {

         if (executarUseEffect.current) {
console.log("UseEffect executado!");
             setTimeout(() => setMostrarBotao(true), 10000);

             executarUseEffect.current = false;

         }

     }, []);











     const recarregarPagina = React.useCallback(() => {
console.log("recarregarPagina executado!")
         window.location.reload();

     }, []);

*/
return <h1>Testando...</h1>


/*     return (

     <>

         {!mostrarBotao && <h1>Carregando...</h1>}

         {mostrarBotao && <button onClick={() => recarregarPagina()}>Recarregar página</button>}

     </>

     )
*/
 }, []);




 export default CasoNaoAutenticado;
