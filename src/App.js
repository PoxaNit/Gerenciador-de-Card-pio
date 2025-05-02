//import React from "react";
//import Conteudo from "./componentes_App/Conteudo.js";
//import Autenticado from "./componentes_App/Autenticado.js"; //Contexto de autenticação

function App() {


  const resposta = fetch("http://gerenciadormenu.free.nf/autenticacao/login.php");
  const json = resposta.json();

  return <div>Conteúdo: {json}</div>


/*
    const [autenticado, setAutenticado] = React.useState(false);
    const [session_id, setSession_id] = React.useState("");
    const [usuario_nome, setUsuario_nome] = React.useState("");

    async function verificarAutenticacao() {

        const autenticacao = await fetch("http://gerenciadormenu.free.nf/autenticacao/session_id.php").then(r => r.json());


        if (!autenticacao.sucesso) {

            window.location = "http://gerenciadormenu.free.nf/autenticacao/login.php";

        } else {

	    const id = autenticacao.id;

   	    const corpo = JSON.stringify({"id": id}); //Corpo da requisição.

	    const usuario_nome = await fetch("http://gerenciadormenu.free.nf/autenticacao/retornar_nome_usuario.php", {
		   			      method: "POST",
					      body: corpo
					    });

	    const json = await usuario_nome.json();

            setAutenticado(autenticacao.sucesso);
  	    setSession_id(id);
	    setUsuario_nome(json.nome);

        };




    };

    const executar = React.useRef(true);

    React.useEffect(() => {

        if (executar.current) {

	     verificarAutenticacao();

             sessionStorage.clear();

             executar.current = false;

        }

    }, []);




    return autenticado && (
        <Autenticado.Provider value={{autenticado, session_id, usuario_nome}}>
            <div className="App">
   	        <Conteudo />
            </div>
        </Autenticado.Provider>
    );
*/}

export default App;
