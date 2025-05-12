import React from "react";
import Conteudo from "./componentes_App/Conteudo.js";
import Autenticado from "./componentes_App/Autenticado.js"; //Contexto de autenticação
import buscarUrlDoBackend from "./resources/buscarUrlDoBackend.js";

function App() {

    const [urlBackend, setUrlBackend] = React.useState("");
    const [autenticado, setAutenticado] = React.useState(false);
    const [session_id, setSession_id] = React.useState("");
    const [usuario_nome, setUsuario_nome] = React.useState("");




    React.useEffect(() => {

   // Guardando a URL no estado 'urlBackend'
        if (!urlBackend) buscarUrlDoBackend(url => setUrlBackend(url));

    }, [urlBackend]);






    const verificarAutenticacao = React.useCallback(async () => {

        const autenticacao = await fetch(urlBackend + "/autenticacao/session_id.php",
        {
         headers:{
           "ngrok-skip-browser-warning":"true"
         }
        }).then(r => r.json());


        if (!autenticacao.sucesso) {

            window.location = urlBackend + "/autenticacao/login.php";

        } else {

	    const id = autenticacao.id;

   	    const corpo = JSON.stringify({"id": id}); //Corpo da próxima requisição.

	    const usuario_nome = await fetch(urlBackend + "/autenticacao/retornar_nome_usuario.php", {
		   			      method: "POST",
					      body: corpo,
         				      headers:{"ngrok-skip-browser-warning":"true"}
					    });

	    const json = await usuario_nome.json();

            setAutenticado(autenticacao.sucesso);
  	    setSession_id(id);
	    setUsuario_nome(json.nome);

        };




    }, [urlBackend]);



    const executar = React.useRef(true);



    React.useEffect(() => {

        if (urlBackend && executar.current) {

	     verificarAutenticacao();

             sessionStorage.clear();

             executar.current = false;

        }

    }, [urlBackend, verificarAutenticacao]);




    return autenticado && (
        <Autenticado.Provider value={{autenticado, session_id, usuario_nome, urlBackend}}>
            <div className="App">
   	        <Conteudo />
            </div>
        </Autenticado.Provider>
    );
}

export default App;
