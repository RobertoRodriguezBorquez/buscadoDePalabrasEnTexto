/* Capturar texto de bienvenida. */
const textEntrada = document.getElementById("textoEntrada");
//actalizamos texto
textEntrada.innerText =
  "Introduzca la palabra a buscar en el siguiente buscador";

/* Capturar buscador */
const buscador = document.getElementById("inputBuscador");

/* almacenar la id de la etiqueta que mostrara la palabra que se introdujo a buscar.*/
let resultado = document.getElementById("resultadoo");

/* Se declara la variable que almacenará el texto de la de la etiqueta con la id resultadoo */
let buscarPalabra = "";

/* capturar etiqueta que tiene el texto parrafo  */
const textoParrafo = document.getElementById("texto-parrafo");

/* evento  para guardar en resultado el input */
buscador.addEventListener("input", (event) => {
  resultado.innerText = event.target.value;
  buscarPalabra = resultado.innerText;

  console.log(`la letra o palabra a buscar es: ${buscarPalabra}`);

  // Llamar a la función dentro del evento para asegurarse de que buscarPalabra tenga el valor actualizado
  buscarPalabraEnTexto(textoParrafo, buscarPalabra);
});

const buscarPalabraEnTexto = (textoParrafo, buscarPalabra) => {
  console.log(textoParrafo.innerText, "-----imprimo el texto-----");

  // Crear la expresión regular global e insensible a mayúsculas
  const regex = new RegExp(`\\b${buscarPalabra}\\b`, "gi");

  if (textoParrafo.innerText.match(regex)) {
    console.log("Si,  se encuentra la palabra en el parrafo");
    console.log(textoParrafo.innerText.match(regex));

    textoParrafo.innerHTML = textoParrafo.innerText.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  } else {
    console.log("nose encuentra la palabra:", buscarPalabra);
  }
};
