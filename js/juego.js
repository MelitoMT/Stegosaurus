function getCookie(cookie) {
    var target = cookie + "=";
    var cookieResult;
    var cookieList = document.cookie.split(';');
    for(var i = 0; i < cookieList.length; i++) {
      if (cookieList[i].indexOf(target) == 0) {
        cookieResult = cookieList[i].substring(target.length, cookieList[i].length);
      }
    }
    return cookieResult;
  }
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
var gameBoardStart = [0,5,1,1,2,1,3,1,4,1,/* Primera Fila */
                0,0,3,0,0,0,1,0,0,2,/* Segunda Fila */
                0,0,1,0,0,0,4,3,3,1,/* Tercera Fila */
                3,4,3,0,0,0,1,0,0,2,/* Cuarta Fila */
                2,0,2,3,1,1,2,0,0,3,/* Quinta Fila */
                1,0,0,0,1,0,0,0,0,1,/* Sexta Fila */
                4,0,0,0,3,4,1,2,1,1,/* Séptima Fila */
                3,0,0,0,0,0,0,0,0,3,/* Octava Fila */
                1,1,2,4,2,3,1,1,2,1/* Novena Fila */];
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
/* Función que actualiza el estado del tablero
-playerPlace:arreglo con coordenadas de cada jugador
-gameBoardStatus:arreglo con el estado actual del juego
-countPlayers:numero de jugadores*/
function actualizarEstado(playerPlace,gameBoardStatus,countPlayers){
    /* Se inicializa el tablero para evitar que queden restos de estados anteriores */
    gameBoardStatus=gameBoardStart.slice();
    /* Guarda en la coordenada correspondiente a la posición de cada jugador el número de jugador */
    for(var cont = 0; cont <= countPlayers-1; cont ++){
        gameBoardStatus[playerPlace[cont][0]+(playerPlace[cont][1]*10)] = "j"+(cont+1);
    }
    return gameBoardStatus;
}
/* Guarda las direcciones de giro de todo el tablero
1: derecha
2: izquierda
3: arriba
4: abajo
combinaciones cuando hay dos direcciones*/
var gameBoardDirec = [0,1,1,1,1,1,1,1,1,4,/* Primera Fila */
                    0,0,3,0,0,0,3,0,0,4,/* Segunda Fila */
                    0,0,3,0,0,0,13,1,1,4,/* Tercera Fila */
                    1,1,3,0,0,0,3,0,0,4,/* Cuarta Fila */
                    3,0,3,2,12,1,3,0,0,4,/* Quinta Fila */
                    3,0,0,0,3,0,0,0,0,4,/* Sexta Fila */
                    3,0,0,0,3,2,2,2,2,24,/* Séptima Fila */
                    3,0,0,0,0,0,0,0,0,4,/* Octava Fila */
                    3,2,2,2,2,2,2,2,2,2/* Novena Fila */];

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
/**/
// $("#Dado .Tirar button").click(()=>{
//   giraDado();
// })
function resetDado() {
  $("#Dado .Tirar .respRul").remove();
  $("#Dado .Tirar button").show();
  $("#Dado").show();
}
$("#Dado .Tirar button").click(()=>{
  $("#Dado .Tirar button").hide();
  $('#Dado div.roulette').roulette("start");
})


/* Se ejecuta al inicio donde cada jugador tira un dado y el mayor inicia */
function ordenarJugadores(numJug) {
  $(".modal-background").show();
  aviso("Jugador "+numJug+" <br> te toca tirar", (callback)=>{
    resetDado();
  });
}
function aviso(txt, callback){
  var aviso = $("<div id='aviso'><p>"+txt+"</p></div>");
  aviso.click(()=>{
    aviso.remove();
    callback();
  })
  $("body").append(aviso);
}
function tiraDado(){
  resetDado();
  $("#Dado .Tirar button").click(()=>{
    console.log();
  })
}
function valortiro(val, jug){
  console.log("Eljugador"+jug+" saco "+val);
  var tiro = {};
  tirosInit.push({tiro:val, jugador:jug});
  console.log(tirosInit);
  if (numJugTiro<4) {
    numJugTiro++;
    ordenarJugadores(numJugTiro)
  }else{
    console.log(tirosInit.sort((a, b) => b.tiro - a.tiro ));
  }
}
var numJugTiro = 1;
var tirosInit =[];
aviso("Los 4 jugadores tiraran para elegir el orden", ordenarJugadores(numJugTiro))


/*Revisa todas las casillas colindantes con la dada y revisa si es válido moverse a ellas
-pos: arreglo con x y de la posición actual
-casillasValidas: arreglo que indica que direcciones están permitidas[derecha, izquierda, arriba,abajo]
-gameBoardDirec: arreglo con las direcciones de todas las casillas*/
function verifCasillas(pos){
    var casillasValidas=[false,false,false,false];

        console.log("Soy la posición"+pos)
        if(pos[1]!=0){
            if(gameBoardDirec[pos[1]*10+pos[0]]==3){
                if(gameBoardDirec[(pos[1]-1)*10+pos[0]]!= 4){
                    casillasValidas[2]=true;
                }
            }
        }
        if(pos[1]!=8){
            if(gameBoardDirec[pos[1]*10+pos[0]]==4){
                if(gameBoardDirec[(pos[1]+1)*10+pos[0]]!= 3){
                    casillasValidas[3]=true;
                }
            }
        }
        if(pos[0]!=0){
            if(gameBoardDirec[pos[1]*10+pos[0]]==2){
                if(gameBoardDirec[pos[1]*10+pos[0]-1]!= 1){
                    casillasValidas[1]=true;
                }
            }
        }
        if(pos[0]!=9){
            console.log(pos[0]);
            console.log(gameBoardDirec[pos[1]*10+pos[0]+1])
            if(gameBoardDirec[pos[1]*10+pos[0]]==1){
                if(gameBoardDirec[pos[1]*10+pos[0]+1]!= 2){
                    casillasValidas[0]=true;
                }
            }
        }

    return(casillasValidas)
}
/* Actualiza la posición de un jugador
playerPlace: número de jugador(1-4)
index: coordenada a actualizar (x o y)
movDir: dirección a la que se busca actualizar la coordenada */
function actualizarPos(movDir, playerPlace, index){
    switch (movDir){
        case 1:
            playerPlace[index][0] += 1;
            console.log("Sume 1 en x")
            break;
        case 2:
            playerPlace[index][0] -= 1;
            break;
        case 3:
            playerPlace[index][1] -= 1;
            break;
        case 4:
            playerPlace[index][1] += 1;
            console.log("Sume 1 en y")
            break;
    }
    return playerPlace;
}
/* Brinda la opción de elección cuando hay dos caminos posibles
dir1: primera dirección válida
dir2: segunda dirección válida
jugador: jugador a mover
key: tecla presionada */
function elegirCamino(dir1,dir2,playerPlace, jugador,key){
    if(dir1== 2||dir2== 2&& key.keyCode == '37'){
        playerPlace = actualizarPos(2,playerPlace,jugador-1);
    }
    if(dir1== 1||dir2== 1&& key.keyCode == '39'){
        playerPlace = actualizarPos(1,playerPlace,jugador-1);
    }
    if(dir1== 3||dir2== 3&& key.keyCode == '38'){
        playerPlace = actualizarPos(3,playerPlace,jugador-1);
    }
    if(dir1== 4||dir2== 4&& key.keyCode == '40'){
        playerPlace = actualizarPos(4,playerPlace,jugador-1);
    }
}
/* Genera el tablero a partir de un arreglo dado
-tablero:arreglo que contiene el tablero, los números diferentes de 0 son casillas
-color: color de la casilla correspondiente
Si tiene como valor "j(1-4)" imprime una ficha de jugador*/

function generarTablero(tablero,srcFichas){
    var boardHtml = "";
    /* Crea el tablero a partir de filas y columnas */
    for(var j = 0; j < 9; j++){
        var row = "<div class=\"boardRow\">";
        for(var i = 0; i < 10; i++){
            var color = "";
            /* Dependiendo del número de la casilla le asigna un color que más tarde significará la dificultad */
            switch(tablero[j*10+i]){
                case 1:
                    color= "azul";
                    break;
                case 2:
                    color= "verde";
                    break;
                case 3:
                    color= "rojo";
                    break;
                case 4:
                    color= "morado";
                    break;
                case 5:
                    color = "inicial";
                    break;
                default:
                    color = "vacio"
            }
            /* Verifica si hay un jugador y en caso de haberlo coloca la imagen de la ficha */
            src = dibujarFicha(i,j,srcFichas);
            if(src == ""){
                row  += "<div class=\"boardCol\"><div class=\""+color+"\"></div></div>";
            }
            else{
                row  += "<div class=\"boardCol\"><div class=\""+color+"\"><img src=\""+src+"\" class=\"fichaImg\"></div></div>";
            }
        }
        row += "</div>"
        boardHtml += row;
    }
    $("#board").html(boardHtml);
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
        }
        else{
            gameBoardStatus=actualizarEstado(playerPlace,gameBoardStatus,countPlayers);
            generarTablero(gameBoardStatus,srcFichas)
                var casillasValid=verifCasillas(playerPlace[jugador-1]);
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
                gameBoardStatus=actualizarEstado(playerPlace,gameBoardStatus,countPlayers);
                generarTablero(gameBoardStatus,srcFichas)
                console.log("El jugador"+jugador+"se movió"+j+"casillas");
                j += 1;
        }
    },1000);
    puntajes[jugador-1] += 10;
    $("#points"+ jugador).html(puntajes[jugador-1]);
/*     for(var j = 1; j <= num; j++){

    } */
}
/* Dibuja las fichas correspondientes a la posición de cad jugador
-i: coordenada y
-j: coordenada x */
function dibujarFicha(i,j,jFichas){
    var src="";
    /* Si la casilla indicada contiene j(1-4) obtiene la dirección de ficha de ese jugador */
    if(typeof gameBoardStatus[j*10+i]!= 'number'){
        switch(gameBoardStatus[j*10+i]){
            case "j1":
                src=jFichas[0];
                break;
            case "j2":
                src=jFichas[1];
                break;
            case "j3":
                src=jFichas[2];
                break;
            case "j4":
                src=jFichas[3];
                break;
        }
    }
    return src;
}

/* Regresa el mayor puntaje de un arreglo de puntajes
-puntaje: arreglo de puntajes de todos los jugadores */
function mayorPuntaje(puntaje){
    var mayor = 0;
    for(var i = 0; i<puntaje.length; i++){
        if(puntaje[i]> mayor){
            mayor=puntaje[i];
        }
    }
    return mayor
}
/* Crea las tarjetas con los nicknames, fotos y puntos */
function tarjetasJugadores(numJugadores,avatar,nickname,pts){
    for(var i = 0; i<numJugadores;i++){
        var puntoJ= i+1;
        $("#playerCards").append("<div class=\"player\"><div class=\"corona\"></div><div class=\"playerImg\"><img src=\""+avatar[i]+"\" alt=\"\"></img></div><p class=\"nickname\">"+nickname[i]+"</p><p class=\"points\" id=\"points"+puntoJ+"\">"+pts[i]+"</p></div>")
    }
}
/* Inicializa el juego
-numJugadores: número de jugadores en tablero
puntajes:arreglo con los puntajes de todos los jugadores
srcFichas:arreglo con ruta de ficha de cada jugador
primerLugar:jugador con mayor puntaje
*/
function jugar(numJugadores,avatares,nicknames,srcFichas){
    for(var f = 1; f <= numJugadores; f++){
        playerPlace.push([1,0]);
        puntajes.push(0);
    }
    tarjetasJugadores(numJugadores,avatares,nicknames,puntajes)
    gameBoardStatus = actualizarEstado(playerPlace,gameBoardStatus,numJugadores)
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
        window.location.href = "../index.html"
    })
    for(var j = 0;j<jugadores.length;j++){
        nicknames.push(jugadores[j].nickname);
        srcFichas.push("../statics/img/ficha"+jugadores[j].avatar+".png")
        avatares.push("../statics/img/"+jugadores[j].avatar+"Avatar.png")
    }
    jugar(jugadores.length,avatares,nicknames,srcFichas);
})
