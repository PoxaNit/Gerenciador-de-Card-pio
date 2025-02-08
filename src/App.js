import React from "react";
import Conteudo from "./componentes_App/Conteudo.js";
import Autenticado from "./componentes_App/Autenticado.js"; //Contexto de autenticação

function App() {

    const [autenticado, setAutenticado] = React.useState(false);
    const [session_id, setSession_id] = React.useState("");

    async function verificarAutenticacao() {

        const autenticacao = await fetch("/autenticacao/session_id.php").then(resposta => resposta.json());

        if (!autenticacao.sucesso) {

            window.location = "http://0.0.0.0:8000/autenticacao/login.php";

        } else {

            setAutenticado(autenticacao.sucesso);
	    setSession_id(autenticacao.id);

        };

    };

    React.useEffect(() => {

        (function () {

	     verificarAutenticacao();

        })();

    },[]);


    return autenticado && (
        <Autenticado.Provider value={{autenticado, session_id}}>
            <div className="App">
   	        <Conteudo />
            </div>
        </Autenticado.Provider>
    );
}

export default App;
