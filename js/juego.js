
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
1: azul
2:verde
3:rojo
4:morado
5:inicio*/
/* var gameBoardStart = [0,5,1,1,2,1,3,1,4,1,// Primera Fila 
                0,0,3,0,0,0,1,0,0,2,// Segunda Fila 
                0,0,1,0,0,0,4,3,3,1,// Tercera Fila 
                3,4,3,0,0,0,1,0,0,2,// Cuarta Fila 
                2,0,2,3,1,1,2,0,0,3,// Quinta Fila 
                1,0,0,0,1,0,0,0,0,1,// Sexta Fila 
                4,0,0,0,3,4,1,2,1,1,// Séptima Fila 
                3,0,0,0,0,0,0,0,0,3,// Octava Fila 
                1,1,2,4,2,3,1,1,2,1// Novena Fila]; */
 /*
 ARREGLO PROVISIONAL, POR PROBLEMA DE DOS CASILLAS
 */
var gameBoardStart = [0,5,1,1,2,1,3,1,4,1,/* Primera Fila */
    0,0,3,0,0,0,0,0,0,2,/* Segunda Fila */
    0,0,1,0,0,0,0,0,0,1,/* Tercera Fila */
    3,4,3,0,0,0,0,0,0,2,/* Cuarta Fila */
    2,0,0,0,0,0,0,0,0,3,/* Quinta Fila */
    1,0,0,0,0,0,0,0,0,1,/* Sexta Fila */
    4,0,0,0,0,0,0,0,0,1,/* Séptima Fila */
    3,0,0,0,0,0,0,0,0,3,/* Octava Fila */
    1,1,2,4,2,3,1,1,2,1/* Novena Fila */];
/* Crea una copia del tablero para guardar el estado */
var gameBoardStatus=gameBoardStart.slice();

/* Guarda las direcciones de giro de todo el tablero
1: derecha
2: izquierda
3: arriba
4: abajo
combinaciones cuando hay dos direcciones*/
/* var gameBoardDirec = [0,1,1,1,1,1,1,1,1,4,// Primera Fila 
                    0,0,3,0,0,0,3,0,0,4,// Segunda Fila 
                    0,0,3,0,0,0,13,1,1,4,// Tercera Fila 
                    1,1,3,0,0,0,3,0,0,4,// Cuarta Fila 
                    3,0,3,2,12,1,3,0,0,4,// Quinta Fila 
                    3,0,0,0,3,0,0,0,0,4,// Sexta Fila 
                    3,0,0,0,3,2,2,2,2,24,// Séptima Fila 
                    3,0,0,0,0,0,0,0,0,4,// Octava Fila 
                    3,2,2,2,2,2,2,2,2,2// Novena Fila]; */

/* ARREGLOOOO PROVISIONAAAAAAAL */
var gameBoardDirec = [0,1,1,1,1,1,1,1,1,4,/* Primera Fila */
    0,0,3,0,0,0,0,0,0,4,/* Segunda Fila */
    0,0,3,0,0,0,0,0,0,4,/* Tercera Fila */
    1,1,3,0,0,0,0,0,0,4,/* Cuarta Fila */
    3,0,0,0,0,0,0,0,0,4,/* Quinta Fila */
    3,0,0,0,0,0,0,0,0,4,/* Sexta Fila */
    3,0,0,0,0,0,0,0,0,4,/* Séptima Fila */
    3,0,0,0,0,0,0,0,0,4,/* Octava Fila */
    3,2,2,2,2,2,2,2,2,2/* Novena Fila */];

/* Crea la ruleta de dado*/
  var rouletter = $('#Dado div.roulette');
  var option = {
    speed : 15,
    duration : 1,//duracion en segundos
    stopImageNumber : -1,//Numero elige aleatorio
    startCallback : function() {
      console.log("Inico");
    },
    slowDownCallback : function() {
      console.log("bajando");
    },
    stopCallback : function($stopElm)/*Que hace al acabar de girar*/ {
      console.log("Fin");
      $("#Dado .Tirar").append("<p class='respRul'>¡¡ "+$stopElm[0].alt+" !!</p>");
      setTimeout(()=>{
        console.log("timeout");
        valortiro($stopElm[0].alt, numJugTiro)
        $("#Dado").hide();
      }, 1500)
    }
  }
  rouletter.roulette(option);//Creo la ruleta

$("#Dado .Tirar button").click(()=>{
  $("#Dado .Tirar button").hide();
  $('#Dado div.roulette').roulette("start");
})



var numJugTiro = 1;
var tirosInit =[];
ordenarJugadores(numJugTiro)


/* Mueve al jugador
-jugador: Jugador que se quiere mover (1-4)
-movDir: primera dirección
movDirOpt: segunda dirección si aplica
casillasValidNum: número de casillas válidas*/
function moverJugador(jugador,countPlayers,srcFichas,puntajes,num,tablero1,tablero2,tablero3){
    var j = 1;
    $("#jugadorTurno p").html("Turno del jugador: "+jugador);
    $("#jugadorDado p").html("Dado: "+ num);
    /* Mueve al jugador una casilla el número de veces indicado */
/*     var moverJugadorInterval=setInterval(()=>{
        if(j>num){
            clearInterval(moverJugadorInterval)
        }
        else{ */
                var casillasValid=verifCasillas(playerPlace[jugador-1],tablero3);
                var casillasValidNum = 0;
                var movDir;
                var movDirOpt;
                /* Cuenta las casillas válidas y guarda sus direcciones */
                for(var i = 0; i <= 4;i++){
                    if(casillasValid[i]==true){
                        /* if(casillasValidNum > 1){
                            movDirOpt = i+1;
                        } */
                        casillasValidNum += 1;
                        movDir = i+1;
                    }
                }
                if(casillasValidNum == 1){
                    playerPlace = actualizarPos(movDir,playerPlace,jugador-1);
                }
/*                 else{
                    document.addEventListener("keypress",(key)=>{
                        elegirCamino(movDir,movDirOpt,playerPlace,jugador,key);
                    })
                } */
                tablero1=actualizarEstado(playerPlace,tablero1,countPlayers,tablero2);
                generarTablero(tablero1,srcFichas)
                console.log("El jugador"+jugador+"se movió"+j+"casillas");
/*                 j += 1;
        }
    },1000); */
    puntajes[jugador-1] += 10;
    $("#points"+ jugador).html(puntajes[jugador-1]);
}





/* Inicializa el juego
-numJugadores: número de jugadores en tablero
puntajes:arreglo con los puntajes de todos los jugadores
srcFichas:arreglo con ruta de ficha de cada jugador
primerLugar:jugador con mayor puntaje
*/
function jugar(numJugadores,avatares,nicknames,srcFichas){
    tarjetasJugadores(numJugadores,avatares,nicknames,puntajes)
    gameBoardStatus = actualizarEstado(playerPlace,gameBoardStatus,numJugadores,gameBoardStart)
    generarTablero(gameBoardStatus,srcFichas);
    primerLugar = mayorPuntaje(puntajes);
    /* Mientras los jugadores tengan menos de 100 puntos el ciclo de turnos se repite */    
/*     var num=girarDado();    
    var i = 1;
    var tiempo = (num+1)*1000;
    var movingInterval = setInterval(()=>{
        var num=girarDado();
        tiempo = (num+1)*1000;
        if (i> numJugadores){
            i = 1;
        }
        moverJugador(i,numJugadores,srcFichas,puntajes,num);
        i += 1;
        console.log("El jugador"+i+"se movió")
        primerLugar = mayorPuntaje(puntajes);
        if(primerLugar >= 100){
            clearInterval(movingInterval);
            setTimeout(()=>{
                alert("Ganó el jugador \"1\"")
            },3000);
        }
    },tiempo); */
}  

$(document).ready(()=>{
    /* Permite crear las condiciones iniciales para jugar */
    for(var j = 0;j<jugadores.length;j++){
        nicknames.push(jugadores[j].nickname);
        srcFichas.push("../statics/img/ficha"+jugadores[j].avatar+".png")
        avatares.push("../statics/img/"+jugadores[j].avatar+"Avatar.png")
        playerPlace.push([1,0]);
        puntajes.push(0);
    }
    /* Llama a la función jugar */
    jugar(jugadores.length,avatares,nicknames,srcFichas);
})
