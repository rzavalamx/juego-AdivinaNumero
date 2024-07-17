// DOM: Document Object Module, MOdelo de Objeto de Documento en JS.
// Complementar Informacion del DOM, con esta liga: https://www.freecodecamp.org/espanol/news/que-es-el-dom-el-significado-del-modelo-de-objeto-de-documento-en-javascript/

// titulo es este caso es un Objeto.
// document es un puente o la forma de conectar JavaScript con los elementos que tenemos en la pagina HTML
// querySelector es un metodo.

let numeroSecreto = 0;
let intentos = 0;
// Almacenar cada uno de los Numeros Sorteados en una lista para no repetir el Numero ya Jugado.
let listaNumerosSorteados = [];
//let numeroMaximo = 10; // Para evitar ciclar la Recursiviada.
let numeroMaximo = parseInt(prompt('Me indica la cantidad Máxima para adivinar un número, ejemplo entre 1 y 100'));

console.log(numeroSecreto);

// Optimizando Codigo.
function asignarTextoElemento(elemento, texto) {
    // elemtnoHTML, podemos referir a un elemento o selector tipo h1,h2,h3,p,etc.
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    // Capturar lo que el Usuario coloco.
    // let numeroDeUsuario = document.querySelector('input');
    // Podemos usar el valor del Objeto getElementById(valorUsuario) 

    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    console.log(intentos);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste Numero en ${intentos} ${(intentos===1) ? 'vez' : 'veces'}`);
        // Un vez finalizado el Juego, Habilitar Boton de Nuevo Juego.
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {

        // El Usuario No acerto.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'Numero Secreto es Menor');
        } else {
            asignarTextoElemento('p', 'Numero Secreto es Mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}


function limpiarCaja() {
    let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = "";
    // Optimizando codigo puede quedar asi en lugar de las 2 lineas de arriba.
    document.querySelector('#valorUsuario').value = "";
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;
    
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya sorteamos todos los Numeros.
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento("Ya se Sortearon todos los Numeros Posibles");
    } else {
        // Si el Numero Generado esta incluido en la lista.
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            // Llamamos a la misma funcion, para generar otro numero.
            // Recursividad (La funcion se llama a si misma).
            return generarNumeroSecreto(); 
        } else {
            // Si el numero Generado no esta incluido en la lista lo Agregamos para no volverlo a Jugar.
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }    
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del Numero Secreto');
    asignarTextoElemento('p', `Indica un Numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    // Limpiar la Caja
    limpiarCaja();
    // Indicar Mensaje del Intervalo de Numeros del Juego
    // Generar el Numero Aleatorio.
    // Inicializar el Numero de Intentos.
    condicionesIniciales();
    // DesHabilitar el Boton de Nuevo Juego.
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    


}

condicionesIniciales();









