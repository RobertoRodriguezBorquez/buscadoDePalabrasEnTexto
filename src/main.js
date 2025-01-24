/* Capturar texto de bienvenida. */
const textEntrada = document.getElementById("textoEntrada");
textEntrada.innerText =
  "Bienvenido, porfavor introduzca la palabra a buscar en el siguiente en el siguiente texto";

/* Capturar buscador */
const buscador = document.getElementById("inputBuscador");

/* almacenar la id de la etiqueta que contiene el texto */
let resultado = document.getElementById("resultadoo");
/* Se declara la variable que almacenará el texto de la de la etiqueta con la id resultadoo */
let buscarPalabra="";


/* capturar etiqueta que tiene el texto  */
const textoParrafo = document.getElementById("texto-parrafo");

/* evento  para guardar en resultado el input */
buscador.addEventListener("input", (event) => {
  resultado.innerText = event.target.value;
   buscarPalabra=resultado.innerText

  console.log(`la letra o palabra a buscar es: ${buscarPalabra}`);

  // Llamar a la función dentro del evento para asegurarse de que buscarPalabra tenga el valor actualizado
  buscarPalabraEnTexto(textoParrafo, buscarPalabra);
});



const buscarPalabraEnTexto = (textoParrafo, buscarPalabra) => {
console.log(textoParrafo.innerText, "-----imprimo el texto-----");

if (textoParrafo.innerText.includes(buscarPalabra)) {
  console.log("Si,  se encuentra la palabra en el parrafo");

}else{
    console.log("nose encuentra la palabra:", buscarPalabra);
    
    
  }
  

};

