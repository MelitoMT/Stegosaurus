
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
    speed : 30,
    duration : 1,//duracion en segundos
    stopImageNumber : -1,//Numero elige aleatorio
    stopCallback : function($stopElm)/*Que hace al acabar de girar*/ {
      $("#Dado .Tirar").append("<p class='respRul'>¡¡ "+$stopElm[0].alt+" !!</p>");
      valortiro($stopElm[0].alt)
      moverJugador(1,numJugadores,srcFichas,puntajes,$stopElm[0].alt);
      setTimeout(()=>{
        $("#Dado .Tirar").css("display","none");
      },3000);-
    }
  }
  rouletter.roulette(option);//Creo la ruleta
/**/
// $("#Dado .Tirar button").click(()=>{
//   giraDado();
// })
function resetDado() {
  $("#Dado .Tirar .respRul").remove();
  $("#Dado .Tirar button").show();
  $("#Dado").show();
}
/* Genera un número pseudoaleatorio entre 1 y 6 */
function giraDado(){
    $('#Dado div.roulette').roulette("start");
    $("#Dado .Tirar button").hide();
}
/* Se ejecuta al inicio donde cada jugador tira un dado y el mayor inicia */
function ordenarJugadores(numJug) {
  $(".modal-background").show();
  aviso("Jugador "+numJug+" <br> te toca tirar", (callback)=>{
    resetDado();
    $("#Dado .Tirar button").click(()=>{
      var result = callback()
    })
  });
}
function aviso(txt, callback){
  var aviso = $("<div id='aviso'><p>"+txt+"</p></div>");
  aviso.click(()=>{
    aviso.remove();
    callback(()=>{
      giraDado();
    })
  })
  $("body").append(aviso);
}
function tiraDado(){
  resetDado();
  $("#Dado .Tirar button").click(()=>{
    console.log();
  })
}
function valortiro(val){
  console.log("Eljugador");
}
ordenarJugadores(1)


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
