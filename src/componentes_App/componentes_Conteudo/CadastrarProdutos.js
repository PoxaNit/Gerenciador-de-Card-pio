import React from "react";
import estilos from "./CadastrarProdutos.module.css";
import MensagemAlerta from "../MensagemAlerta.js";

export default function CadastroPratos ({setCadastro, informacoes_prato, setHaPratos}) {




/*------------------------------- Estados -------------------------------------------*/

 const form = React.useRef(); //irá fazer referência ao formulário

// const [desativarBotao, setDesativarBotao] = React.useState({status: false}); //controla quando o botão de salvar deve ficar desabilitado, para evitar conflito com a mensagem de alerta

 const [informacoesCompletas, setInformacoesCompletas] = React.useState(null); //diz se os dados do prato estão preenchidos

 const [dispararAlerta, setDispararAlerta] = React.useState({disparar: false, msg: "", tempo: 0});

 const [estados, despachar] = React.useReducer(reducer,{ //informações do prato a serem mandadas para o banco de dados
 nome: "",
 descricao: "",
 preco: "",
 categoria: "",
 imagem: "",
 ingredientes: "",
 alergias_restricoes: ""
});

  function reducer (estados, acao) { //alert(estados.preco);
      switch (acao.tipo) {
	case "mudar nome":
	  return {...estados, nome: acao.valor};
	case "mudar foto":
	  return {...estados, imagem: acao.valor};
	case "mudar descricao":
	  return {...estados, descricao: acao.valor};
	case "mudar preco":
	  return {...estados, preco: acao.valor};
	case "mudar categoria":
	  return {...estados, categoria: acao.valor};
	case "mudar ingredientes":
	  return {...estados, ingredientes: acao.valor};
	case "mudar alergias/restricoes":
	  return {...estados, alergias_restricoes: acao.valor};
	default:
	  return {...estados};
    };
   };



/*------------------------------////////////////////----------------------------------*/








/*---------------- Verificando se as informações do prato estão preenchidas ----------*/



   React.useEffect(() => {

	    if (estados.nome && estados.preco && estados.descricao && estados.imagem && estados.categoria && estados.alergias_restricoes && estados.ingredientes) {
			setInformacoesCompletas(true);
  } else {
			setInformacoesCompletas(false);

};

}, [estados]);



/*------------------------------////////////////////----------------------------------*/






/*---------------- Permitindo com que o usuário visualize a imagem carregada ---------*/





 function lerArquivo (e) { //função para exibir a foto do prato que o usuário escolheu na página temporariamente

   const leitor = new FileReader();

   leitor.onload = () => {

     despachar({tipo: "mudar foto", valor: leitor.result});

   };
   leitor.readAsDataURL(e);
 };




/*------------------------------////////////////////----------------------------------*/














/*------------------------ Mandando os dados para o back-end -------------------------*/

  let executarTimeout = false; //Evita de o alerta ainda estar sendo exibido depois de fechar o componente e abrir denovo
  let deveFechar = false; //Evita o componente de fechar após exportar os dados, fechar o componente e abrir denovo ( sem isso, o componente buga ).

  function fecharCadastro (fechouPeloBotaoSair = false) {

      if (!fechouPeloBotaoSair && executarTimeout && deveFechar) {

          executarTimeout = false;
          setCadastro(false);

      } else if (fechouPeloBotaoSair) {

	    setCadastro(false);

        };


  }

  async function exportar () { //função para armazenar os dados no banco de dados

	try {
		if(!informacoesCompletas) {

		if (isNaN(estados.preco) || estados.preco === 0) { //o retorno de string para number pode variar de NaN a 0 dependendo do ambiente e configuração de onde se usa o js

		const erro = JSON.stringify({
					    disparar: true,
					    tempo: 3000,
					    msg: "Forneça um número válido para o preço!"
					});
		throw new Error(erro);

	} else {


	   throw new Error(JSON.stringify({
				disparar: true,
				tempo: 2300,
				msg: "Preencha todos os campos!"
				}));

	};

            } else {




		   const dados = new FormData(form.current);

		   const resposta = await fetch("/criar_prato", {
		     method: "POST",
		     body: dados
		  });

		   const resposta_json = await resposta.json();
		   setDispararAlerta({disparar: true, tempo: 2300, msg: resposta_json.msg});

		   executarTimeout = true;

		   deveFechar = true;

		   setTimeout(() => {
alert(executarTimeout && deveFechar)
			if (deveFechar) {

			    fecharCadastro();

			}
		   }, 2300);


            };


    } catch (exceção) {
	const mensagem = exceção.message.replace("Error :", ""); //Para não dar json inválido
	const erro = JSON.parse(mensagem);
	setDispararAlerta(erro);
    };

};




/*------------------------------////////////////////----------------------------------*/










return (
<>
 {dispararAlerta.disparar ? <MensagemAlerta mensagem={dispararAlerta.msg} tempo={dispararAlerta.tempo} exibir={dispararAlerta.disparar} setDispararAlerta={setDispararAlerta} /> : null}
 <form ref={form} onSubmit={e => e.preventDefault()} className={estilos.form}>

   <legend>Cadastro de pratos</legend>

   <section>
     <label htmlfor="nome_prato">Nome do prato:</label>
     <input onInput={e => despachar({tipo: "mudar nome", valor: e.target.value})} type="text" name="nome_prato" id="nome_prato" required />
   </section>

   <section className={estilos.st}>
     <label htmlfor="descricao_produto">Descrição do produto:</label>
   <br/>
     <textarea cols="25" rows="6" id="descricao_prato" onInput={e => despachar({tipo: "mudar descricao", valor: e.target.value})} name="descricao_prato" required></textarea>
   </section>

   <section>
     <label htmlfor="preco_prato">Preço do prato (R$):</label>
     <input step="0.01" type="number" id="preco_prato" name="preco_prato" required onInput={e => {

       	despachar({tipo: "mudar preco", valor: Number(e.target.value.toString())});
}}/>
   </section>

   <section>
     <label htmlfor="categoria_prato">Categoria:</label>
     <select name="categoria_prato" id="categoria_prato" onInput={e => despachar({tipo: "mudar categoria", valor: e.target.value})} required>
       <option selected disabled>Escolher</option>
       <option value="pratos principais">Pratos principais</option>
       <option value="lanches">Lanches</option>
       <option value="sobremesas">Sobremesas</option>
     </select>
   </section>

   <section>
     <label htmlfor="imagem_prato">Carregar imagem:</label>
     <input type="file" onInput={e => lerArquivo(e.target.files[0])} id="imagem_prato" name="imagem_prato" />
   <br/>
     {estados.imagem && <img alt="foto do prato" src={estados.imagem} />}
   </section>

   <section className={estilos.st}>
     <label htmlfor="ingredientes_prato">Ingredientes:</label>
   <br/>
     <textarea onInput={e => despachar({tipo: "mudar ingredientes", valor: e.target.value})} cols="25" rows="6" required id="ingredientes_prato" name="ingredientes_prato"></textarea>
   </section>

   <section className={estilos.st}>
     <label htmlfor="alergias/restricoes">Alergias/restrições:</label>
   <br/>
     <textarea cols="25" rows="6" required id="alergias/restricoes" onInput={e => despachar({tipo: "mudar alergias/restricoes", valor: e.target.value})} name="alergias/restricoes"></textarea>
   </section>

   <section className={estilos.sb}>
     <button onClick={() => fecharCadastro(true)}>Sair</button>
     <button disabled={dispararAlerta.disparar} onClick={() => {exportar()}} type="submit">Salvar</button>
   </section>

 </form>
</>
)

}
