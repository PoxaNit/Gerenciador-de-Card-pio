import React from "react";
import Conteudo from "./componentes_App/Conteudo.js";
import Autenticado from "./componentes_App/Autenticado.js"; //Contexto de autenticação
import testarTamanhoJanela from "./resources/testarTamanhoJanela.js";

function App() {

    const [autenticado, setAutenticado] = React.useState(false);
    const [session_id, setSession_id] = React.useState("");
    const [usuario_nome, setUsuario_nome] = React.useState("");

    async function verificarAutenticacao() {

        const autenticacao = await fetch("/autenticacao/session_id.php").then(r => r.json());

        if (!autenticacao.sucesso) {

            window.location = "http://0.0.0.0:8000/autenticacao/login.php";

        } else {

	    const id = autenticacao.id;

   	    const corpo = JSON.stringify({"id": id}); //Corpo da requisição.

	    const usuario_nome = await fetch("/autenticacao/retornar_nome_usuario.php", {
		   			      method: "POST",
					      body: corpo
					    });

	    const json = await usuario_nome.json();

            setAutenticado(autenticacao.sucesso);
  	    setSession_id(id);
	    setUsuario_nome(json.nome);

        };




    };

    React.useEffect(() => {

        (function () {

	     verificarAutenticacao();

             sessionStorage.clear();

        })();

    },[]);





    //Verificando se o tamanho da janela do navegador é desktoo

    const [modoDesktop, setModoDesktop] = React.useState(false);

    const [executar, setExecutar] = React.useState(true);

    React.useEffect(() => {

        if (executar) {

	    setExecutar(false);

	    testarTamanhoJanela("(min-width: 900px)") && setModoDesktop(true);

	}

    }, []);



    return autenticado && (
        <Autenticado.Provider value={{autenticado, session_id, usuario_nome}}>
            <div className="App">
   	        <Conteudo />
            </div>
        </Autenticado.Provider>
    );
}

export default App;
