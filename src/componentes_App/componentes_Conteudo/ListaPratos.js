import React from "react";
import styles from "./ListaPratos.module.css";
import ExibirInformacoesPrato from "./componentes_ListaPratos/ExibirInformacoesPrato.js";
import Contexto from "../Contexto.js";
import MensagemAlerta from "../MensagemAlerta.js";
import RenderizarPesquisa from "./componentes_ListaPratos/RenderizarPesquisa.js";
import SubirAoTopo from "./SubirAoTopo.js";
import LayoutCategoria from "./componentes_ListaPratos/LayoutCategoria.js";
import ItemDeLista from "./componentes_ListaPratos/ItemDeLista.js";


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















/*                     Tratando o modo de pesquisa                   */




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


//   Aramzena os pratos que passaram no filtro por categoria
  const [pratosCategorizados, setPratosCategorizados] = React.useState([]);

//   Armazena qual opção de filtro está ativa se a filtragem estiver ligada. Armazenar isso serve para quando o usuário mudar de componente, para quando ele voltar, ainda saber qual opção de filtro ele escolheu.
  const [opcaoDeFiltroAtiva, setOpcaoDeFiltroAtiva] = React.useState({botao_todos: true});

//   Armazena os pratos filtrados por categoria que incluem o termo pesquisado no nome
  const [filtradosPesquisados, setFiltradosPesquisados] = React.useState([]);


  React.useEffect(() => {

          const filtrados = pratosCategorizados.filter(prato => prato.nome_prato.toUpperCase().includes(termoPesquisado.toUpperCase()));
          setFiltradosPesquisados(filtrados);

  },[pratosCategorizados, termoPesquisado]);


/*----------------------/////////////////////------------------------*/











  return (
<>
 {dispararAlerta.exibir && <MensagemAlerta setDispararAlerta={setDispararAlerta} exibir={dispararAlerta.exibir} mensagem={dispararAlerta.mensagem} tempo={dispararAlerta.tempo} />}
 <Contexto.Provider value={{setControleUseCallback, setComponenteExibir, setTermoPesquisado, setFiltragemCategoriaAtivo, setPratosCategorizados}}>

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
    <LayoutCategoria pratos={pratos.info} filtragemAtiva={filtragemCategoriaAtivo} setFiltragemAtiva={setFiltragemCategoriaAtivo} botaoAtivo={opcaoDeFiltroAtiva} setBotaoAtivo={setOpcaoDeFiltroAtiva} />
  </section>

 </header>
 <main>

     {(coordenadasTela.y >= 300) && <SubirAoTopo />}

     {modoPesquisarPratos && <RenderizarPesquisa setModoPesquisarPratos={setModoPesquisarPratos} pratos={pratos.info} setTermoPesquisado={setTermoPesquisado} setPratosFiltrados={setPratosFiltrados} termoPesquisado={termoPesquisado} />}


         { /* Renderização padrão caso não haja filtragem nem busca por parte do usuário. Isto exibe normalmente os pratos do menu. */ }

         {((pratos.sucesso && !filtragemCategoriaAtivo) && ((!modoPesquisarPratos && !termoPesquisado) || (modoPesquisarPratos && !termoPesquisado))) && (<ul>

             {pratos.info.map((prato, indice) => {

                 return <ItemDeLista nomeDoPrato={prato.nome_prato} imagemDoPrato={prato.imagem_prato} descricaoImagem="Imagem do prato" indiceParaItem={indice} prato={prato} />

             })}

         </ul>)}










     { /* Caso o usuário tenha feito uma busca por nome, mas sem filtrar categorias. */ }

     {(pratos.sucesso && !filtragemCategoriaAtivo && modoPesquisarPratos && termoPesquisado) && (<ul>

         {pratosFiltrados.map((prato, indice) => {

             return <ItemDeLista nomeDoPrato={prato.nome_prato} imagemDoPrato={prato.imagem_prato} descricaoImagem={"Imagem do prato"} indiceParaItem={indice} prato={prato} />

         })

     }</ul>)}






     { /* Caso o usuário busque pratos filtrando as categorias e por nome, e a busca tenha tido sucesso. */ }

     {(pratos.sucesso && filtradosPesquisados.length !== 0 && filtragemCategoriaAtivo && modoPesquisarPratos && termoPesquisado) && (<ul>

         {filtradosPesquisados.map((prato, indice) => {

             return <ItemDeLista nomeDoPrato={prato.nome_prato} imagemDoPrato={prato.imagem_prato} descricaoImagem={"Imagem do prato"} indiceParaItem={indice} prato={prato} />

         })}

     </ul>)}






     { /* Caso a filtragem por categoria esteja ativa, deve ser renderizada a lista com os pratos que correspondem.*/ }

     {((modoPesquisarPratos && !termoPesquisado) || (!modoPesquisarPratos && !termoPesquisado)) && (pratos.sucesso && filtragemCategoriaAtivo && pratosCategorizados.length !== 0) && (<ul>

         {pratosCategorizados.map((prato, indice) => {

             return <ItemDeLista nomeDoPrato={prato.nome_prato} imagemDoPrato={prato.imagem_prato} descricaoImagem={"Imagem do prato"} indiceParaItem={indice} prato={prato} />

         })}

     </ul>)}










     {(!pratos.sucesso || (modoPesquisarPratos && termoPesquisado && pratosFiltrados.length === 0) || (filtragemCategoriaAtivo && pratosCategorizados.length === 0) || (filtragemCategoriaAtivo && termoPesquisado && filtradosPesquisados.length === 0)) && <h2 className={styles.h2}>Sem resultados</h2>}
 </main>
</div>

)}

</Contexto.Provider>

</>)}
