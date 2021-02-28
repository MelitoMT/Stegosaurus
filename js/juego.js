
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
  var rouletter = $('#Dado div.roulette');//Se selecciona el modal
  var option = /*Se configura la ruleta del dado*/{
    speed : 15,
    duration : 1,//duracion en segundos
    stopImageNumber : -1,//Numero elige aleatorio
    startCallback : function()/*Que hace al iniciar de girar*/  {
    },
    slowDownCallback : function()/*Que hace al bajar velocidad*/  {
    },
    stopCallback : function($stopElm)/*Que hace al acabar de girar*/ {
      $("#Dado .Tirar").append("<p class='respRul'>¡¡ "+$stopElm[0].alt+" !!</p>");//Añade el mennsaje de respuesta
      /*Da un tiempo para que el jugador puede ver el resultado*/
      setTimeout(()=>{
        if (seleccionOrden)/*Ordenar tiro*/ {
          valortiro($stopElm[0].alt, numJugTiroInit)//Ejectuta el analizis del tiro
          $("#Dado").hide();//Oculta el modal del dado
        }else if (true) /*Avanze jugador*/{
          console.log("Jugador avanza "+$stopElm[0].alt);
          moverJugador(1,4,srcFichas,puntajes, $stopElm[0].alt)
          $("#Dado").hide();//Oculta el modal del dado
          $(".modal-background").hide();//Oculta el fondo
        }
      }, 1500)
    }
  }
  rouletter.roulette(option);//Creo la ruleta


function resetDado() {
  $("#Dado .Tirar .respRul").remove();//Quita el mennsaje de respuesta
  $("#Dado .Tirar button").show();//Muestra el boton de girar nuevamente
  $("#Dado").show();//Muestra el modal del dado
}
/*Evento de click al buton del dado*/
$("#Dado .Tirar button").click(()=>{
  $("#Dado .Tirar button").hide();
  $('#Dado div.roulette').roulette("start");
})


/* Se ejecuta al inicio donde cada jugador tira un dado y el mayor inicia */
function ordenarJugadores(numJug) {
  aviso("Jugador "+numJug+" <br> te toca tirar", ()=>{
    resetDado();//cuando se hace click al aviso muestra el modal
  });
}
function aviso(txt, callback){
  $(".modal-background").show();//se ponde el fondo modal
  var aviso = $("<div id='aviso'><p>"+txt+"</p></div>");//Se muestra a hacer un aviso
  aviso.click(()=>{
    aviso.remove();//Se elimina el aviso
    callback();//Se ejecuta el callback
  })
  $("body").append(aviso);//Se añade el aviso
}
function avisoLg(txt, callback) {
  $(".modal-background").show();//se ponde el fondo modal
  var aviso = $("<div id='avisoLg'><p>"+txt+"</p></div>");//Se muestra a hacer un aviso
  aviso.click(()=>{
    aviso.remove();//Se elimina el aviso
    callback();//Se ejecuta el callback
  })
  $("body").append(aviso);//Se añade el aviso
}
function valortiro(val, jug){
  var tiro = {};
  tirosInit.push({tiro:val, jugador:jug});
  if (numJugTiroInit<4) {
    numJugTiroInit++;
    var expresion = "Bot"+numJugTiroInit;
    if (jugadores[numJugTiroInit-1].nickname.match(/Bot\d/i)) {
      aviso("Generando tiros del resto de jugadores ...", ()=>{
        for (var i = numJugTiroInit-1; i < 4; i++) {
          tirosInit.push({tiro:(Math.floor(Math.random() * 5)+1), jugador:numJugTiroInit});//Da valores aleatorios al resto de jugadores
        }
        tirosInit = tirosInit.sort((a, b) => b.tiro - a.tiro )/*Se ordenan los resultados de mayor tiro a menor tiro, en caso de que dos sean iguales tirara primero el jugador con num de jugador menor*/;
        avisoLg("El orden de tiro es <br> 1° "+jugadores[(tirosInit[0].jugador)-1].nickname+"<br> 2° "+jugadores[(tirosInit[1].jugador)-1].nickname+"<br> 3° "+jugadores[(tirosInit[2].jugador)-1].nickname+"<br> 4° "+jugadores[(tirosInit[3].jugador)-1].nickname, ()=>{
          $(".modal-background").hide();
          setTimeout(()=>{
            seleccionOrden = false;
            console.log("Iniciar juego");
            jugando(jugadorActual);
          }, 1500)
        })
      })
    }else{
      ordenarJugadores(numJugTiroInit)
    }
  }else{
    tirosInit = tirosInit.sort((a, b) => b.tiro - a.tiro )/*Se ordenan los resultados de mayor tiro a menor tiro, en caso de que dos sean iguales tirara primero el jugador con num de jugador menor*/;
    avisoLg("El orden de tiro es <br> 1° "+jugadores[(tirosInit[0].jugador)-1].nickname+"<br> 2° "+jugadores[(tirosInit[1].jugador)-1].nickname+"<br> 3° "+jugadores[(tirosInit[2].jugador)-1].nickname+"<br> 4° "+jugadores[(tirosInit[3].jugador)-1].nickname, ()=>{
      $(".modal-background").hide();
      //Pequeño descanso antes de inciar
      setTimeout(()=>{
        seleccionOrden = false;
        console.log("Iniciar juego");
        jugando(jugadorActual);
      }, 1500)
    })
  }
}
var numJugTiroInit = 1;//Numero de jugador que se usa para elegir quien tira primera
var tirosInit =[]; //Orden en el que los jugadores jugaran
var seleccionOrden = true;//variable que indica que funcion seguir al tirar los dados
var jugadorActual = 1;
function jugando(numJugador) {
  var nomJug = jugadores[(tirosInit[(numJugador-1)].jugador)-1].nickname
  aviso(nomJug+" te toca tirar", ()=>{
    console.log("tirar dados");
    resetDado();
    if (nomJug.match(/Bot\d/i)) {
      $("#Dado .Tirar button").hide();
      $('#Dado div.roulette').roulette("start");
    }
  })
}

/* Mueve al jugador
-jugador: Jugador que se quiere mover (1-4)
-movDir: primera dirección
movDirOpt: segunda dirección si aplica
casillasValidNum: número de casillas válidas*/
function moverJugador(jugador,countPlayers,srcFichas,puntajes,num){
    var j = 1;
    $("#jugadorTurno p").html("Turno del jugador: "+jugador);
    $("#jugadorDado p").html("Dado: "+ num);
    /* Mueve al jugador una casilla el número de veces indicado */
    var moverJugadorInterval=setInterval(()=>{
        if(j>num){
          clearInterval(moverJugadorInterval)
          setTimeout(()=>{
            resetRulCat ()
          }, 500)
        }
        else{
            gameBoardStatus=actualizarEstado(playerPlace,gameBoardStatus,countPlayers,gameBoardStart);
            generarTablero(gameBoardStatus,srcFichas)
                var casillasValid=verifCasillas(playerPlace[jugador-1],gameBoardDirec);
                var casillasValidNum = 0;
                var movDir;
                var movDirOpt;
                /* Cuenta las casillas válidas y guarda sus direcciones */
                for(var i = 0; i <= 4;i++){
                    if(casillasValid[i]==true){
                        if(casillasValidNum > 1){
                            movDirOpt = i+1;
                        }
                        casillasValidNum += 1;
                        movDir = i+1;
                    }
                }
                if(casillasValidNum == 1){
                    playerPlace = actualizarPos(movDir,playerPlace,jugador-1);
                }
                else{
                    document.addEventListener("keypress",(key)=>{
                        elegirCamino(movDir,movDirOpt,playerPlace,jugador,key);
                    })
                }
                gameBoardStatus=actualizarEstado(playerPlace,gameBoardStatus,countPlayers,gameBoardStart);
                generarTablero(gameBoardStatus,srcFichas)
                console.log("El jugador"+jugador+"se movió"+j+"casillas");
                j += 1;
        }
    },1000);
}

/*Añadir al terminar pregunta
  puntajes[jugador-1] += 10;
  $("#points"+ jugador).html(puntajes[jugador-1]);
*/



/* Inicializa el juego*/
setTimeout(()=>{
  aviso("Los 4 jugadores tiraran para elegir el orden", ()=>{
    ordenarJugadores(numJugTiroInit)
  })//Comienza a ejecutar el ordenamiento de jugadores
},1000)/*

-numJugadores: número de jugadores en tablero
puntajes:arreglo con los puntajes de todos los jugadores
srcFichas:arreglo con ruta de ficha de cada jugador
primerLugar:jugador con mayor puntaje
*/
function jugar(numJugadores,avatares,nicknames,srcFichas){
    tarjetasJugadores(numJugadores,avatares,nicknames,puntajes)
    gameBoardStatus = actualizarEstado(playerPlace,gameBoardStatus,numJugadores,gameBoardStart)
    console.log(gameBoardStatus);
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
    /* Mientras los jugadores tengan menos de 100 puntos el ciclo de turnos se repite */
/*     while(primerLugar < 100){

 */
    // var num=girarDado();
    // var i = 1;
    // var tiempo = (num+1)*1000;
    // var movingInterval = setInterval(()=>{
    //     var num=girarDado();
    //     tiempo = (num+1)*1000;
    //     if (i> numJugadores){
    //         i = 1;
    //     }
    //     moverJugador(i,numJugadores,srcFichas,puntajes,num);
    //     i += 1;
    //     console.log("El jugador"+i+"se movió")
    //     primerLugar = mayorPuntaje(puntajes);
    //     if(primerLugar >= 100){
    //         clearInterval(movingInterval);
    //         setTimeout(()=>{
    //             alert("Ganó el jugador \"1\"")
    //         },3000);
    //     }
    // },tiempo);
 /*        for(var i = 1; i <= numJugadores; i++){
            console.log("El jugador"+i+"se movió")
        } */
//}
/* } */

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
    /* Llama a la función jugar */
    jugar(jugadores.length,avatares,nicknames,srcFichas);
})
