import React from "react";
import styles from "./RelatorioMenu.module.css";


 export default function RelatorioMenu ({ setRelatorio }) {

   React.useEffect(() => window.scrollTo(0, 0), []);



   const [informacoes, setInformacoes] = React.useState([]); //guarda as informações dos pratos do menu


//                       Separação das categorias

     const [pratos_principais, setPratos_principais] = React.useState([]);
     const [sobremesas, setSobremesas] = React.useState([]);
     const [lanches, setLanches] = React.useState([]);







//                Prato mais caro e mais barato

   const [precos, setPrecos] = React.useState([]);
   const [maisCaro, setMaisCaro] = React.useState(0);
   const [maisBarato, setMaisBarato] = React.useState(0);
   const [mediaDosPrecos, setMediaDosPrecos] = React.useState(0);


   React.useEffect(() => {

       const precos_temp = [];

       for (let i = 0; i < informacoes.length; i++) {

           precos_temp.push(parseFloat(informacoes[i].preco_prato));

       };

       const media = precos_temp.reduce((n1, n2) => n1 + n2, 0) / precos_temp.length;

       setPrecos(precos_temp);

       setMediaDosPrecos(media);

   },[informacoes]);




   const pegarPrecos = React.useCallback(function () {

       let maiorPreco = precos[0]; //variável temporária para dar suporte ao loop abaixo

       for (let i = 1; i < precos.length; i++) {

           if (precos[i] > maiorPreco) {
    	       maiorPreco = precos[i];
           }
       };

       setMaisCaro(maiorPreco);


       let menorPreco = precos[0];

       for (let i = 1; i < precos.length; i++) {

	   if (precos[i] < menorPreco) {
	       menorPreco = precos[i];
           }
       }

       setMaisBarato(menorPreco);

}, [precos]);


 React.useEffect(() => pegarPrecos(), [pegarPrecos]);



   const separarCategorias = React.useCallback(function () {

       const pratosPrincipais_temp = [];
       const sobremesas_temp = [];
       const lanches_temp = [];

       for (let i = 0; i < informacoes.length; i++) {

	   const categoria = informacoes[i].categoria_prato;

           if (categoria === "pratos principais") {

	       pratosPrincipais_temp.push(categoria);

           } else if (categoria === "sobremesas") {

	       sobremesas_temp.push(categoria);

          } else if (categoria === "lanches") {

	       lanches_temp.push(categoria);

          };

       };

       setPratos_principais(pratosPrincipais_temp);
       setSobremesas(sobremesas_temp);
       setLanches(lanches_temp);

 }, [informacoes]);

 React.useEffect(() => separarCategorias(), [separarCategorias]);





   const buscarInformacoes = React.useMemo(async function () {

       const resposta = await fetch("/retornar_dados").then(r => r.json());

       const status = resposta.sucesso;

       const info = resposta.info;

       if (status && info) {

	   setInformacoes(info);

       } else {return null;};

   return null;
 }, []);

    return (
      <div>

          <header>
	      <button onClick={() => setRelatorio(false)}>Voltar</button>
	      <h1>Relatório do cardápio</h1>

          </header>

	  <main>

	      <section>

	          <h2>Total de pratos:</h2>

		  <p>{informacoes.length}</p>

	      </section>


	      <section>

	          <h2>Total por categoria:</h2>

		  <label>Pratos principais:</label>
		  <p>{pratos_principais.length}</p>

		  <label>Sobremesas:</label>
		  <p>{sobremesas.length}</p>

		  <label>Lanches:</label>
		  <p>{lanches.length}</p>

	      </section>


	      <section>

	          <h2>Prato mais caro/barato:</h2>
		  <p>Mais caro: {maisCaro}</p>
		  <p>Mais barato: {maisBarato}</p>

	      </section>


	      <section>

	 	  <h2>Média total dos preços:</h2>

		  <p>{mediaDosPrecos.toFixed(2)}</p>

	      </section>

	  </main>

      </div>
  )
 }
