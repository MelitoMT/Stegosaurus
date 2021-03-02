

/* Guarda posición del jugador
Al inicio 1,0 es la posición predeterminada*/
var playerPlace = [];
var srcFichas = [];
var nicknames = [];
var avatares = [];
var puntajes = [];
var jugadores = JSON.parse(getCookie("jugadores"));
/* Guarda el tablero al inicio
0: no hay casilla
1:inicio
2:verde
3:rojo
4:morado
*/
 var gameBoardStart = [0,1,4,2,2,3,3,2,4,3,// Primera Fila
                    0,0,3,0,0,0,0,0,0,2,// Segunda Fila
                    0,0,3,0,0,0,0,0,0,4,// Tercera Fila
                    3,4,3,0,0,0,0,0,0,2,// Cuarta Fila
                    2,0,0,0,0,0,0,0,0,3,// Quinta Fila
                    2,0,0,0,0,0,0,0,0,3,// Sexta Fila
                    4,0,0,0,0,0,0,0,0,2,// Séptima Fila
                    3,0,0,0,0,0,0,0,0,3,// Octava Fila
                    2,3,2,4,2,3,4,4,2,2]// Novena Fila ];
/* Crea una copia del tablero para guardar el estado */
var gameBoardStatus=gameBoardStart.slice();

/* Guarda las direcciones de giro de todo el tablero
1: derecha
2: izquierda
3: arriba
4: abajo
combinaciones cuando hay dos direcciones*/
 var gameBoardDirec = [0,1,1,1,1,1,1,1,1,4,// Primera Fila
                    0,0,3,0,0,0,0,0,0,4,// Segunda Fila
                    0,0,3,0,0,0,0,0,0,4,// Tercera Fila
                    1,1,3,0,0,0,0,0,0,4,// Cuarta Fila
                    3,0,0,0,0,0,0,0,0,4,// Quinta Fila
                    3,0,0,0,0,0,0,0,0,4,// Sexta Fila
                    3,0,0,0,0,0,0,0,0,4,// Séptima Fila
                    3,0,0,0,0,0,0,0,0,4,// Octava Fila 
                    3,2,2,2,2,2,2,2,2,2]//Novena Fila ]; 

/* Crea la ruleta de dado*/
  var rouletter = $('#Dado div.roulette');//Se selecciona el modal
  var option = /*Se configura la ruleta del dado*/{
    speed : 15,
    duration : 1,//duracion en segundos
    stopImageNumber : -1,//Numero elige aleatorio
    startCallback : function()/*Que hace al iniciar de girar*/  {
      ruletaSonido.play()
    },
    slowDownCallback : function()/*Que hace al bajar velocidad*/  {
    },
    stopCallback : function($stopElm)/*Que hace al acabar de girar*/ {
      /*Da un tiempo para que el jugador puede ver el resultado*/
      setTimeout(()=>{
        if (seleccionOrden)/*Ordenar tiro*/ {
          valortiro($stopElm[0].alt, numJugTiroInit)//Ejectuta el analizis del tiro
          $("#Dado").hide();//Oculta el modal del dado
        }else if (true) /*Avanze jugador*/{
          gameBoardStatus = actualizarEstado(playerPlace,gameBoardStatus,jugadores.length,gameBoardStart)
          generarTablero(gameBoardStatus,srcFichas);
          moverJugador(jugadorActual,4,srcFichas,puntajes, $stopElm[0].alt,gameBoardStatus,gameBoardStart,gameBoardDirec)
          $("#Dado").hide();//Oculta el modal del dado
          $(".modal-background").hide();//Oculta el fondo
        }
      }, 1500)
    }
  }
  rouletter.roulette(option);//Creo la ruleta
  var numJugTiroInit = 1;//Numero de jugador que se usa para elegir quien tira primera
  var tirosInit =[]; //Orden en el que los jugadores jugaran
  var seleccionOrden = true;//variable que indica que funcion seguir al tirar los dados
  var jugadorActual = 1;


/*Evento de click al buton del dado*/
$("#Dado .Tirar button").click(()=>{
  $("#Dado .Tirar button").hide();
  $('#Dado div.roulette').roulette("start");
})

/* Inicializa el juego*/
 setTimeout(()=>{
  aviso("Los 4 jugadores tirarán para elegir el orden", ()=>{
    ordenarJugadores(numJugTiroInit)
  })//Comienza a ejecutar el ordenamiento de jugadores
},1000)
/*

-numJugadores: número de jugadores en tablero
puntajes:arreglo con los puntajes de todos los jugadores
srcFichas:arreglo con ruta de ficha de cada jugador
*/
$(document).ready(()=>{
  $(".inicio").click(()=>{
    window.location = "../"
  })
    /* Permite crear las condiciones iniciales para jugar */
    for(var j = 0;j<jugadores.length;j++){
        nicknames.push(jugadores[j].nickname);
        srcFichas.push("../statics/img/ficha"+jugadores[j].avatar+".png")
        avatares.push("../statics/img/"+jugadores[j].avatar+"Avatar.png")
        playerPlace.push([1,0]);
        puntajes.push(0);
    }
    tarjetasJugadores(jugadores.length,avatares,nicknames,puntajes);
    gameBoardStatus=actualizarEstado(playerPlace,gameBoardStatus,jugadores.length,gameBoardStart);
    generarTablero(gameBoardStatus,srcFichas)

})
