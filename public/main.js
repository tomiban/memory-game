//Incializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado;
let segundoResultado;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let tiempoRegresivoId = null;
//Manejo del dom
const mostrarMov = document.getElementById("movimientos");
const mostrarAciertos = document.getElementById("aciertos");
const mostrarTiempo = document.getElementById("t-restante");

// Funcion que genera un arreglo de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5; //
});

console.log(numeros);

//Funcion temporizador
function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo ${timer}"`;
    if (timer === 0) {
      clearInterval(tiempoRegresivoId); //detiene el timer;
      bloquearTarjetas();
      mostrarTiempo.innerHTML = "Perdiste 💀⚰️"
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;
  }
}

//Funcion principal
function destapar(id) {
  if (temporizador === false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++; //contador

  if (tarjetasDestapadas === 1) {
    tarjeta1 = document.getElementById(id); // trae el elemento con el id seleccionado al clickear
    primerResultado = numeros[id]; // muestra el numero que contiene el indice pasado al arreglo y lo guarda en la variable
    tarjeta1.innerHTML = primerResultado;
    tarjeta1.disabled = true; //Deshabilitar primer boton par que no siga aumentando el contador
  } else if (tarjetasDestapadas === 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;
    tarjeta2.disabled = true;

    //Incrementar movimientos --> Cada vez que se destapan 2 tarjetas
    movimientos++;
    mostrarMov.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado === segundoResultado) {
      tarjetasDestapadas = 0;
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos === 8) {
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML += `<span>🤩</span>`;
        mostrarMov.innerHTML += `<span>😎</span>`;
        mostrarTiempo.innerHTML = `Tiempo final: ${60 - timer}" <span>👏</span> `;
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = " ";
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800);
    }
  }
}
