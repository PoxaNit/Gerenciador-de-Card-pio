import React from "react";
import styles from "./RelatorioMenu.module.css";
import Autenticado from "../Autenticado.js";
import buscarPratos from "../../resources/buscarPratos.js";
import verificarPratosEmCache from "../../resources/verificarPratosEmCache.js";



 export default function RelatorioMenu ({ setRelatorio }) {

   React.useEffect(() => window.scrollTo(0, 0), []);


   const { session_id } = React.useContext(Autenticado);

   const [informacoes, setInformacoes] = React.useState([]); //guarda as informações dos pratos do menu


//                       Separação das categorias

     const [pratos_principais, setPratos_principais] = React.useState([]);
     const [sobremesas, setSobremesas] = React.useState([]);
     const [lanches, setLanches] = React.useState([]);

     //Caso só exista um elemento em alguma categoria, o nome dele deverá ser armazenado e exibido
         const [nomePratos_principais, setNomePratos_principais] = React.useState("");
         const [nomeLanches, setNomeLanches] = React.useState("");
         const [nomeSobremesas, setNomeSobremesas] = React.useState("");




//                Prato mais caro e mais barato

   const [precos, setPrecos] = React.useState([]);

   const [maisCaro, setMaisCaro] = React.useState(0);
   const [nomeDoMaisCaro, setNomeDoMaisCaro] = React.useState("");

   const [maisBarato, setMaisBarato] = React.useState(0);
   const [nomeDoMaisBarato, setNomeDoMaisBarato] = React.useState("");

   const [mediaDosPrecos, setMediaDosPrecos] = React.useState(0);


   React.useEffect(() => {

       if (!(informacoes.length === 0)) {

           const precos_temp = [];

           for (let i = 0; i < informacoes.length; i++) {

	       precos_temp.push(parseFloat(informacoes[i].preco_prato));

           };

           const media = precos_temp.reduce((a, b) => a + b, 0) / precos_temp.length;
           setPrecos(precos_temp);

           setMediaDosPrecos(media);

       }

   }, [informacoes]);




   const pegarPrecos = React.useCallback(function () {

       if (!(informacoes.length === 0)) {

           let maiorPreco = precos[0]; //variável temporária para dar suporte ao loop abaixo
	   let nome = informacoes[0].nome_prato;

           for (let i = 1; i < precos.length; i++) {

               if (precos[i] > maiorPreco) {

	           maiorPreco = precos[i];
		   nome = informacoes[i].nome_prato;

               }

           };

	   let formato = Intl.NumberFormat('pt-br', {
					    style: 'currency',
					    currency: 'BRL'
					  });

           setMaisCaro(formato.format(maiorPreco));
	   setNomeDoMaisCaro(nome);

           let menorPreco = precos[0];
	   nome = informacoes[0].nome_prato;

           for (let i = 1; i < precos.length; i++) {

    	       if (precos[i] < menorPreco) {

	           menorPreco = precos[i];
		   nome = informacoes[i].nome_prato;

               }
           }

           setMaisBarato(formato.format(menorPreco));
	   setNomeDoMaisBarato(nome);

   }


}, [precos, informacoes]);


 React.useEffect(() => pegarPrecos(), [pegarPrecos]);



   const separarCategorias = React.useCallback(function () {

       if (informacoes.length !== 0) {


           const pratosPrincipais_temp = [];
           const sobremesas_temp = [];
           const lanches_temp = [];

           const nomesPratosPrincipais = [];
           const nomes_lanches = [];
           const nomes_sobremesas = [];

           for (let i = 0; i < informacoes.length; i++) {

    	       const categoria = informacoes[i].categoria_prato;
	       const nome = informacoes[i].nome_prato;

               if (categoria === "pratos principais") {

    	           pratosPrincipais_temp.push(categoria);
	           nomesPratosPrincipais.push(nome);

               } else if (categoria === "sobremesas") {

    	           sobremesas_temp.push(categoria);
	           nomes_sobremesas.push(nome);

              } else if (categoria === "lanches") {

	           lanches_temp.push(categoria);
	           nomes_lanches.push(nome);
              };

           };





           if (nomesPratosPrincipais.length === 1) {

    	       setNomePratos_principais(nomesPratosPrincipais[0]);

           };

           if (nomes_lanches.length === 1) {

	       setNomeLanches(nomes_lanches[0]);

           };

           if (nomes_sobremesas.length === 1) {

	       setNomeSobremesas(nomes_sobremesas[0]);

           }




           setPratos_principais(pratosPrincipais_temp);
           setSobremesas(sobremesas_temp);
           setLanches(lanches_temp);

     };


 }, [informacoes]);



 React.useEffect(() => separarCategorias(), [separarCategorias]);





   const execute = React.useRef(true);

   React.useEffect(() => {


       if (execute.current) {


           async function executar () {


               const chave = 'pratos_' + session_id; //Para acessar o cache da sessão


	     			    //Se houver, já retorna em JSON
               const pratosEmCache = verificarPratosEmCache(chave);



               if (pratosEmCache) {

                   const dados = pratosEmCache;

                   setInformacoes(dados.info);

               } else {

                   const resposta = await buscarPratos();

                   const status = resposta?.sucesso;

                   const info = resposta?.info;


                   if (status && info) {

	               const valor = JSON.stringify(resposta);

                       sessionStorage.setItem(chave, valor); //Para acesso global dos dados na aplicação

	               setInformacoes(info);

                   }


               }


           } executar();

           execute.current = false;

       }

   });



    return (

      <div className={styles.conteudo}>

          <header>

	      <button onClick={() => setRelatorio(false)}>

		   <img src="/SetaBranca.png" alt="Voltar" />

	      </button>

	      <h1>Relatório do cardápio</h1>

          </header>

	  <main>

	      <section className={styles.sectionDifferent}>

	          <h2>Total de pratos:</h2>

		  <p><span className={styles.valores}>{informacoes.length}</span> {informacoes.length === 1 && <span>({informacoes[0].nome_prato})</span>}</p>

	      </section>


	      <section>

	          <h2>Total por categoria:</h2>



		  <p>
		      Pratos principais: <span className={styles.valores}>{pratos_principais.length}</span> {nomePratos_principais && <span>({nomePratos_principais})</span>}
		  </p>



		  <p>
		      Lanches: <span className={styles.valores}>{lanches.length}</span> {nomeLanches && <span>({nomeLanches})</span>}
		  </p>



		  <p>
		      Sobremesas: <span className={styles.valores}>{sobremesas.length}</span> {nomeSobremesas && <span>({nomeSobremesas})</span>}
		  </p>



	      </section>


	      <section>

	          <h2>Prato mais caro/barato:</h2>
		  <p>Mais caro: {<span className={styles.valores}>{maisCaro}</span>} {nomeDoMaisCaro && <span>({nomeDoMaisCaro})</span>}</p>
		  <p>Mais barato: {<span className={styles.valores}>{maisBarato}</span>} {nomeDoMaisBarato && <span>({nomeDoMaisBarato})</span>}</p>

	      </section>


	      <section className={styles.sectionDifferent}>

	 	  <h2>Média total dos preços:</h2>

		  <p><span className={styles.valores}>{Intl.NumberFormat("pt-br", {
					style: "currency",
					currency: "BRL"
 		                        }
		     ).format(mediaDosPrecos.toFixed(2))}</span>
		  </p>

	      </section>

	  </main>

      </div>
  )
 }
