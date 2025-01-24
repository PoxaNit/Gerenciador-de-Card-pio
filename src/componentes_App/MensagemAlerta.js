import React from "react";
import styles from "./MensagemAlerta.module.css";


/*----- Serve para retornar alertas para outros componentes ---*/

 export default function MensagemAlerta ({
mensagem = "", //mensagem a ser exibida no alerta
tempo = 0, //tempo ( em milissegundos ) que o alerta vai estar ativo
setDispararAlerta = () => {}, //função para passar informações falsey para o estado feito em componente pai para dizer que este alerta desativou
exibir //booleano indicando quando o alerta está ativo
}) {




/*--------------------- Tratando o alerta ---------------------*/



const tratarAlerta = React.useCallback(() => {

        if (exibir) {
          setTimeout(() => {
		setDispararAlerta({disparar: false, msg: "", tempo: 0});
    }, parseInt(tempo));
  };

 }, [exibir, setDispararAlerta, tempo]);



   React.useEffect(() => {
        tratarAlerta();

 }, [tratarAlerta]);



/*---------------//////////////////////////---------------------*/






 if (exibir) {

     return (

 <div id={styles.div}>

   <h2>{mensagem}</h2>

 </div>

  );

} else {
	return null;
};


 };



/*---------------//////////////////////////---------------------*/
