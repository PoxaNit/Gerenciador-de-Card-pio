//Este arquivo gera um topo de página onde ficarão configurações e onde o usuário poderá fazer log-out
import React from "react";
import styles from "./Topo.module.css";
import Autenticado from "./Autenticado.js";
import Confirmacao from "./componentes_Conteudo/Confirmacao";


 function Topo () {

     const { usuario_nome, session_id } = React.useContext(Autenticado);

     const [mostrar, setMostrar] = React.useState(false);
     const [exibirConfirmacao, setExibirConfirmacao] = React.useState({
         exibir: false,
         func_negativo: function () {}, //Função a ser executada caso o usuário confirme negativo
         func_positivo: function () {}, //Em caso positivo
         mensagem: ""
     });










     function logout() {

         window.location = "http://0.0.0.0:8000/autenticacao/logout.php";

     };











     async function deletarConta () {

         const dados = JSON.stringify({email: session_id});

         const resposta = await fetch("/autenticacao/deletar_conta.php", {method: "POST", body: dados});

         const json = await resposta.json();

         if (json.sucesso) {

             logout();

         } else { alert(JSON.stringify(json))}

     };





    function fecharConfirmacao () {

        setExibirConfirmacao({
            exibir: false,
            func_negativo: function () {},
            func_positivo: function () {},
            mensagem: ""
        });

    };






    function confirmar_logout () {

        setExibirConfirmacao({
            exibir: true,
            func_negativo: fecharConfirmacao,
            func_positivo: logout,
            mensagem: "Deseja fazer log-out?"});

    };





    function confirmar_deletarConta () {

        setExibirConfirmacao({
            exibir: true,
            func_negativo: fecharConfirmacao,
            func_positivo: deletarConta,
            mensagem: "Deseja deletar esta conta permanentemente?"
        });

    };








     return (<>

         {exibirConfirmacao.exibir && <Confirmacao func_negativo={exibirConfirmacao.func_negativo} func_positivo={exibirConfirmacao.func_positivo} mensagem={exibirConfirmacao.mensagem} />}
         <header id={styles.conteudo} className={!mostrar ? styles.esconder_menu : styles.mostrar_menu}>

	     <section className={styles.section1}>

	         <p>Usuário(a): <strong>{usuario_nome}</strong></p>

  	         <button onClick={() => setMostrar(m => !m)}>Conta <img id={styles.contaImg} alt="Opções de conta" src="/configurar.png"/></button>

             </section>


	     <section className={styles.section2}>

	         <button onClick={() => confirmar_logout()}>Sair da conta <img src="/logout_icon.png" alt="ícone de logout" /></button>

		 <button onClick={() => confirmar_deletarConta()}>Deletar conta <img alt="Ícone de lixeira" src="/lixeira.png" id={styles.lixeira_img}/></button>

             </section>

         </header>
         </>
     );

 };

 export default Topo;
