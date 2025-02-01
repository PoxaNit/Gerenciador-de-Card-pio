import React from "react";
import styles from "./ListaPratos.module.css";
import ExibirInformacoesPrato from "./componentes_ListaPratos/ExibirInformacoesPrato.js";
import Contexto from "../Contexto.js";
import MensagemAlerta from "../MensagemAlerta.js";
import RenderizarPesquisa from "./componentes_ListaPratos/RenderizarPesquisa.js";
import SubirAoTopo from "./SubirAoTopo.js";
import LayoutCategoria from "./componentes_ListaPratos/LayoutCategoria.js";


export default function ListaPratos ({setLista}) {

  const [controleUseCallback, setControleUseCallback] = React.useState(true); //controla quando o componente deve fazer requisição ao servidor para pegar os pratos para exibir na lista

  const [pratos, setPratos] = React.useState({info: []}); //objeto contendo os pratos do menu

  const [coordenadasTela, setCoordenadasTela] = React.useState({x: 0, y: 0}); //armazena as coordenadas de tela atuais

  const [dispararAlerta, setDispararAlerta] = React.useState({exibir: false, mensagem: "", tempo: 0}); //controla quando exibir a mensagem de alerta.

  const [mudarComponente, setMudarComponente] = React.useState(false); //serve para avisar ao useCallback quando o componente ExibirInformacoesPrato for fechado




  const [componenteExibir, setComponenteExibir] = React.useState({ //controla quando e quais informações exibir do prato clicado.
    renderizar: false,
    infos: null
 });































/*------------Funções relacionadas às coordenadas de tela------‐-----*/



   function armazenar_coordenadas_tela () {

	setCoordenadasTela({x: window.scrollX, y: window.scrollY});

 };


 React.useEffect(() => {

 window.scrollTo(0, 0);

 window.addEventListener("scroll", armazenar_coordenadas_tela);


  }, []);


/*----------------------/////////////////////------------------------*/




























/*---------------------- Primeiras operações ------------------------*/


 async function fetchData () {

    if (controleUseCallback) {
        setDispararAlerta({mensagem: "carregando...", tempo: 20000, exibir: true});

	const resposta = await fetch("/retornar_dados"); //retorna o array com todos os pratos e suas informações
	const json = await resposta.json();

	setPratos(json);
	setControleUseCallback(false);
        setDispararAlerta({mensagem: "", tempo: 0, exibir: false});
    }
};




  const buscarPratos = React.useCallback(fetchData, [controleUseCallback]);



  React.useEffect(() => {
	buscarPratos();

 }, [buscarPratos]);



/*----------------------/////////////////////------------------------*/

























/*------------Funções relacionadas às coordenadas de tela------‐-----*/


 const mudarCoordenadas = React.useCallback(() => {

     if (mudarComponente) {

	window.scrollTo(coordenadasTela.x, coordenadasTela.y);
	armazenar_coordenadas_tela();
        setMudarComponente(false);

   } else {

	return null

   };

 }, [mudarComponente, coordenadasTela.x, coordenadasTela.y]);

 React.useEffect(() => {

	mudarCoordenadas();

 }, [mudarCoordenadas]);

/*----------------------/////////////////////------------------------*/















/*                     Tratando o modo de pesquisa                     */




  const [modoPesquisarPratos, setModoPesquisarPratos] = React.useState(false);
  const [termoPesquisado, setTermoPesquisado] = React.useState(""); //Guarda o termo da pesquisa, caso o usuário esteja pesquisando por um prato.
  const [pratosFiltrados, setPratosFiltrados]  = React.useState([]);


  React.useEffect(() => {

      if(pratos.info === undefined) {

      } else {

          const filtrados = pratos.info.filter(prato => prato.nome_prato.toLowerCase().includes(termoPesquisado.toLowerCase()));
          setPratosFiltrados(filtrados);
      }

 }, [termoPesquisado, pratos]);

/*----------------------/////////////////////------------------------*/





















/*                Tratando a filtragem por categoria                 */


  const [filtragemCategoriaAtivo, setFiltragemCategoriaAtivo] = React.useState(false);

  const [pratosFiltrados_pratosPrincipais, setPratosFiltrados_pratosPrincipais] = React.useState([]);
  const [pratosFiltrados_lanches, setPratosFiltrados_lanches] = React.useState([]);
  const [pratosFiltrados_sobremesas, setPratosFiltrados_sobremesas] = React.useState([]);





/*----------------------/////////////////////------------------------*/





















  return (
<>
 {dispararAlerta.exibir && <MensagemAlerta setDispararAlerta={setDispararAlerta} exibir={dispararAlerta.exibir} mensagem={dispararAlerta.mensagem} tempo={dispararAlerta.tempo} />}
 <Contexto.Provider value={{setControleUseCallback, setComponenteExibir, setTermoPesquisado, setPratosFiltrados_pratosPrincipais, setPratosFiltrados_lanches, setPratosFiltrados_sobremesas}}>

 {componenteExibir.renderizar ? <ExibirInformacoesPrato func_tirar_evento_rolagem={armazenar_coordenadas_tela} func_coord_pai={armazenar_coordenadas_tela} infos_prato={componenteExibir.infos} controle={setComponenteExibir} coordenadas_tela_componente_pai={coordenadasTela} este_componente_fechou={setMudarComponente} setCoordenadasTela={setCoordenadasTela}/> : (

 <div className={styles.conteudo}>
 <header id={styles.hl}>

  <section className={styles.s1}>


    <button onClick={() => setLista(false)}>Sair</button>


    <button onTouchEnd={() => {


	if (!modoPesquisarPratos) {


		setModoPesquisarPratos(true);


	}


}} className={styles.btnImg} >
    <img src={"/ePZfIIUTjEcAAAAASUVORK5CYII_-removebg-preview.png"} alt="Ícone de lupa" />
</button>


  </section>

  <section className={styles.s2}>
    <h1>Pratos do menu</h1>
  </section>

  <section>
    <LayoutCategoria pratos={pratos.info} filtragemAtiva={filtragemCategoriaAtivo} setFiltragemAtiva={setFiltragemCategoriaAtivo} />
  </section>

 </header>
 <main>

 {(coordenadasTela.y >= 300) && <SubirAoTopo />}

 {modoPesquisarPratos && <RenderizarPesquisa setModoPesquisarPratos={setModoPesquisarPratos} pratos={pratos.info} setTermoPesquisado={setTermoPesquisado} setPratosFiltrados={setPratosFiltrados} termoPesquisado={termoPesquisado} />}


  {(pratos.sucesso) && ((!modoPesquisarPratos && !termoPesquisado) || (modoPesquisarPratos && !termoPesquisado)) && (<ul>

{pratos.info.map((prato, indice) => {

	return (

	<li key={indice} onClick={() => {
	  setComponenteExibir({renderizar: true, infos: prato});
}}>
	 <strong>{prato.nome_prato}</strong>
	<br/>
	 <img alt={prato.nome_prato} src={"/" + prato.imagem_prato} />
	<br/>
         <p>Clique para ver</p>

	</li>
  )


})

}

  </ul>)}














 {(pratos.sucesso && modoPesquisarPratos && termoPesquisado) && (<ul>

 {pratosFiltrados.map((prato, indice) => {


   return (

       <li key={indice} onClick={() => setComponenteExibir({renderizar: true, infos: prato})}>

	 <strong>{prato.nome_prato}</strong>
	<br/>
	 <img alt={prato.nome_prato} src={"/" + prato.imagem_prato} />
	<br/>
         <p>Clique para ver</p>

       </li>
    )

  })

 }</ul>)}







// Caso a filtragem por categoria esteja ativa, deve ser renderizada a lista com os pratos que correspondem.

 {filtragemCategoriaAtivo && (<ul>

 //aguardandk...


 </ul>)}










 {!pratos.sucesso && <h2 className={styles.h2}>Sem resultados</h2>}
 </main>
</div>

)}

</Contexto.Provider>

</>)}
