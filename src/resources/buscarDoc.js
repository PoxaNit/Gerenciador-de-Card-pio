
 async function buscarDoc (urlBackend) {

     const doc = sessionStorage.getItem("doc");

     if (!doc) {

         const dados = await fetch(urlBackend + "/documentacao/provedor/documentacao.php");

         const json = await dados.json();

         sessionStorage.setItem("doc", json.html);

         return json.html;

     } else {

         return doc;

     }

}

 export default buscarDoc;
