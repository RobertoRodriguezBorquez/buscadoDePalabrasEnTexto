/* Capturar id de las etiquetas html */
const textEntrada = document.getElementById("textoEntrada");
const buscador = document.getElementById("inputBuscador");
const tituloParrafo = document.getElementById("title");
const textoParrafo = document.getElementById("texto-parrafo");
const botonSgt = document.getElementById("btn-txt");

/* Se declaran variables que almacenaran datos */
let buscarPalabra = "";
const saveParrafo = [];
let indice = 0;

// Guardar el texto original del párrafo (sin modificaciones)
const textoOriginal = textoParrafo.innerText;


// Función para buscar texto
const buscarPalabraEnTexto = (textoParrafo, buscarPalabra) => {
  console.log(textoParrafo.innerText, "-----imprimo el texto-----");

  // Si hay una palabra a buscar
  if (buscarPalabra.trim() !== "") {
    // Crear la expresión regular global e insensible a mayúsculas
    const regex = new RegExp(`\\b${buscarPalabra}\\b`, "gi");

    // Si encontramos la palabra
    if (textoParrafo.innerText.match(regex)) {
      console.log("Sí, se encuentra la palabra en el párrafo");
      console.log(textoParrafo.innerText.match(regex));

      // Usamos innerHTML para pintas las palabras
      textoParrafo.innerHTML = textoParrafo.innerText.replace(
        regex,
        (match) => `<span style="background-color: yellow;">${match}</span>`
      );
    } else {
      console.log("No se encuentra la palabra:", buscarPalabra);
    }
  } else {
    // Si no hay palabra para buscar, eliminamos el resaltado pero mantenemos el contenido original
    textoParrafo.innerHTML = textoParrafo.innerHTML.replace(
      /<span style="background-color: yellow;">(.*?)<\/span>/g, // Eliminamos solo los spans
      "$1"
    );
  }
};


// Función para obtener datos de la API
const apiGet = async (textoParrafo) => {
  saveParrafo.length = 0; // Limpiar el array
  const acceso = await fetch("https://jsonplaceholder.typicode.com/posts/");
  try {
    if (acceso.status === 200) {
      const respuesta = await acceso.json(); // Respuesta en formato JSON
      console.log("Datos recibidos de la API:", respuesta);

      // Limpiar el índice y cargar nuevos datos
      indice = 0; // Reseteamos el índice al principio
      saveParrafo.push(...respuesta.map(post => ({
        id: post.id,
        titulo: post.title,
        contenido: post.body
      })));

      console.log("Datos cargados en saveParrafo:", saveParrafo); // Verifica el contenido del arreglo

      if (saveParrafo.length > 0) {
        const textoActual = saveParrafo[indice]; // Obtener el primer texto
        tituloParrafo.innerText = textoActual.titulo;
        textoParrafo.innerText = textoActual.contenido;
      } else {
        console.log("No se encontraron textos para mostrar");
      }
    } else if (acceso.status === 404) {
      console.log("No se encontraron resultados para la búsqueda.");
    } else {
      console.log("Error al acceder a la API.");
    }
  } catch (error) {
    console.error("Error al acceder a la API:", error);
  }
};

//Se llama a la API apenas cargar la pág.
window.onload = () => {
  apiGet(textoParrafo); // Llamada a la API para cargar el primer texto al iniciar
};

/* Evento para guardar en resultado el input */
buscador.addEventListener("input", (event) => {
  buscarPalabra = event.target.value;
  // Llamar a la función dentro del evento para asegurarse de que buscarPalabra tenga el valor actualizado
  buscarPalabraEnTexto(textoParrafo, buscarPalabra);
});

// Evento botón siguiente párrafo
botonSgt.addEventListener("click", () => {
  if (saveParrafo.length > 0) {
    // Incrementar índice con bucle circular
    indice = (indice + 1) % saveParrafo.length;

    console.log("Mostrando el índice:", indice); // Verifica el valor de índice

    // Mostrar el siguiente texto
    const textoActual = saveParrafo[indice];
    tituloParrafo.innerText = textoActual.titulo;
    textoParrafo.innerText = textoActual.contenido;
  } else {
    console.log("No hay textos cargados");
  }
});
