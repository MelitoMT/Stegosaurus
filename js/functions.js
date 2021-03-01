/* Hace el cambio de frases para la pantalla de carga
Parámetros:
tiempo:Cada cuánto se cambia la palabra*/
function generarFrasesCarga(tiempo){
    var frasesCarga = ['Elige sabiamente tu personaje...','Enseñando magia al Cangumago...', 'Michibot escribiendo su primer "Hola Mundo...','Eligiendo preguntas...' ];
    /* Elige una frase de forma pseudoaleatoria para desplegar */
    setInterval(()=>{
        var i = Math.floor(Math.random() * Math.floor(frasesCarga.length + 1));
        $("#frases").html(frasesCarga[i]);
    },tiempo);
}


/* Revisa si el número de jugadores es el máximo para ocultar la opción de agregar nuevos
-numPlay:cantidad de jugadores hasta el momento */
function checkMaxPlayer(numPlay){
    if(numPlay==4){
        $("#newPlayer").css("display","none");
    }else{
      $("#newPlayer").css("display","block");
    }
};


/* Agrega Nuevos Jugadores
count: cuenta de jugadores al momento */
function nuevoJugador(obj,count){
    let divCont = $("#botonesJugadores");
    $("#newPlayer").click(()=>{
        count+=1;
        checkMaxPlayer(count);
        $("#btn-P"+count).show();
        var divPlayer = $('<div class="player" id="player'+count+'"></div>');
        var close = $('<div class="negButton"><span>x</span></div>');
        let index = generRandomIndex(obj);
        var imgPlayer = $('<div class="playerImg"><img src="'+obj[index].urlImgAvatar+'" alt="'+obj[index].personaje+'"></img></div>');
        $(".negButton").css("display","none");
        close.click(()=>{
          divCont.children().last().remove();
          $("#btn-P"+count).hide();
          $(".negButton").last().css("display","block");
          count-=1;
          checkMaxPlayer(count);
        });
        divPlayer.append(imgPlayer, ['<input type="text" class="playerTxt" maxlength="8" placeholder="Player '+count+'" value="">', close]);
        divCont.append(divPlayer);
    })
    return count;
}


/* AGREGAR DESCRI´CIÓN */
function getIndexByName(nombre, obj){
  var index;
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].personaje==nombre) {
      index = i;
    }
  }
  return index;
}


/* AGREGAR DESCRI´CIÓN */
function generRandomIndex(obj) {
  var index = Math.floor((Math.random() * obj.length));
  return index;
}


/* AGREGAR DESCRI´CIÓN */
function cambiarAvatar(obj){
  $.each($(".btn-elegir"),(index, elem)=>{
    elem.onclick= ()=>{
      actualizarImg(index+1, $("#avatarImgDescr").attr("alt"), obj);
    }
  });
}

/* AGREGAR DESCRI´CIÓN */
function actualizarImg(jugador, imagen, obj) {
  var imgPlayer = $("#player"+jugador).children(".playerImg").children("img");
  var index = getIndexByName(imagen, obj);
  imgPlayer.attr("src", obj[index].urlImgAvatar);
  imgPlayer.attr("alt", obj[index].personaje);
}

/* AGREGAR DESCRI´CIÓN */
function captarInfo(obj){
    $("#jugarFinal").click(()=>{
      let divCont = $("#botonesJugadores").children();
      var jugadores = [];
      for (var i = 1; i < 5; i++) {
        if (i<=divCont.length) {
          var nombre = $("#player"+i)[0].children[1].value;
          var personaje = $("#player"+i)[0].children[0].children[0].alt;
          if (nombre == "") {
            nombre = "Player" +i;
          }
          let jugador = {
            nPlayer: i,
            nickname: nombre,
            avatar: personaje
          }
          jugadores.push(jugador);
        }else{
          let jugador = {
            nPlayer: i,
            nickname: "Bot"+i,
            avatar: obj[generRandomIndex(obj)].personaje
          }
          jugadores.push(jugador);
        }
      }
      console.log(jugadores);
      var nicknamesStr= JSON.stringify(jugadores);
      document.cookie="jugadores"+"="+nicknamesStr;
    })
}

/* AGREGAR DESCRI´CIÓN */
function regresarInicio() {
  $(".inicio").click(()=>{
    $("#INDEX").show();
    $("#OTHER").empty();
  })
}

/* AGREGAR DESCRI´CIÓN */
function descPersonajes(obj){
  $.each(obj,(index, elem)=>{
    console.log(elem);
    let charImg = $('<div class="charImgs" id="char'+(index+1)+'">' );
    charImg.append('<img src="'+elem.urlImgAvatar+'" alt="'+elem.personaje+'">');
    charImg.click(()=>{
      $(".charImgs").removeClass("selected")
      charImg.addClass("selected")
      console.log("Cambiar imagen y descripcion");
      $("#avatarImgDescr").attr("src",elem.urlImg);
      $("#avatarImgDescr").attr("alt",elem.personaje);
    })
    $("#charOpts").append(charImg);
  });
}

/* AGREGAR DESCRI´CIÓN */
function crearNicknameDefault(){
  var defaultNicknames= ["TutsiPanda", "DarthPop", "T-rex","BlackHunter"]
  var i = Math.floor(Math.random() * Math.floor(defaultNicknames.length + 1));
  return defaultNicknames[i];
}


/* Cambia el contenido de el menú a partir de las opciones
Parámetros:
-target: elemento detonador
-ruta: página con el contenido que se busca*/
/*AÑADIR UN REGRESO*/
function cambiarPags(target, ruta){
    var numJugadores;
    target.click(()=>{
        fetch(ruta)
        .then((response)=>{
            return response.text();
        })
        .then((html)=>{
            $("#OTHER").html(html);
            if(target="jugarButton"){
                captarInfo(persElegibles);
                count = nuevoJugador(persElegibles,count);
                descPersonajes(persElegibles);
                cambiarAvatar(persElegibles);
                actualizarImg(1,"Cangumago",persElegibles);
                regresarInicio();
            }
            $("#INDEX").hide();
        })
        .catch(error => {
            console.error('Fallo al obtener el contenido', error);
        });
    });
    return numJugadores;
}




/* FUNCIONES DE JUEGO */

/* Función que busca una cookie */
function getCookie(cookie) {
  var target = cookie + "=";
  var cookieResult;
  var cookieList = document.cookie.split(';');/* Separamos las cookies existentes */
  for(var i = 0; i < cookieList.length; i++) {
      /* Si la cookie es la que buscamos, la regresa */
    if (cookieList[i].indexOf(target) == 0) {
      cookieResult = cookieList[i].substring(target.length, cookieList[i].length);
    }
  }
  return cookieResult;
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

/* FUNCIONES PARA PARTE GRÁFICA */


/* Crea las tarjetas con los nicknames, fotos y puntos */
function tarjetasJugadores(numJugadores,avatar,nickname,pts){
  for(var i = 0; i<numJugadores;i++){
      var puntoJ= i+1;
      $("#playerCards").append("<div class=\"player\"><div class=\"corona\"></div><div class=\"playerImg\"><img src=\""+avatar[i]+"\" alt=\"\"></img></div><p class=\"nickname\">"+nickname[i]+"</p><p class=\"points\" id=\"points"+puntoJ+"\">"+pts[i]+"</p></div>")
  }
}


/* Dibuja las fichas correspondientes a la posición de cad jugador
-i: coordenada y
-j: coordenada x */
function dibujarFicha(i,j,jFichas,tablero){
  var src="";
  /* Si la casilla indicada contiene j(1-4) obtiene la dirección de ficha de ese jugador */
  if(typeof tablero[j*10+i]!= 'number'){
      switch(tablero[j*10+i]){
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
              case "f3":
                  color = "flechaArriba";
                  break;    
              case "f1":
                color = "flechaDerecha";
                break;  
              case "f2":
                color = "flechaIzquierda";
                break;
              case "f4":
                color = "flechaAbajo";
                break;                     
              default:
                  color = "vacio"
          }
          /* Verifica si hay un jugador y en caso de haberlo coloca la imagen de la ficha */
          src = dibujarFicha(i,j,srcFichas,tablero);
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

/* FUNCIONES PARA EL MOVIMIENTO */

/* Actualiza la posición de un jugador
playerPlace: número de jugador(1-4)
index: coordenada a actualizar (x o y)
movDir: dirección a la que se busca actualizar la coordenada */
function actualizarPos(movDir, playerPlace, index){
  switch (movDir){
      case 1:
          playerPlace[index][0] += 1;
          break;
      case 2:
          playerPlace[index][0] -= 1;
          break;
      case 3:
          playerPlace[index][1] -= 1;
          break;
      case 4:
          playerPlace[index][1] += 1;
          break;
  }
  return playerPlace;
}


/*Revisa todas las casillas colindantes con la dada y revisa si es válido moverse a ellas
-pos: arreglo con x y de la posición actual
-casillasValidas: arreglo que indica que direcciones están permitidas[derecha, izquierda, arriba,abajo]
-gameBoardDirec: arreglo con las direcciones de todas las casillas*/
function verifCasillas(pos,tablero){
  var casillasValidas=[false,false,false,false];
  var casillaDoble = true;
  switch(tablero[pos[1]*10+pos[0]]){
    case 5:
      var casillasValidas=[false,true,false,true];
      break;
    case 6:
      var casillasValidas=[true,true,false,false];
      break;
    case 7: 
      var casillasValidas=[true,false,true,false]; 
      break;
    default: 
      casillaDoble = false; 
  }   
  if(!casillaDoble){
    if(pos[1]!=0){
      if(tablero[pos[1]*10+pos[0]]==3){
          if(tablero[(pos[1]-1)*10+pos[0]]!= 4){
              casillasValidas[2]=true;
          }
      }
    }
    if(pos[1]!=8){
        if(tablero[pos[1]*10+pos[0]]==4){
            if(tablero[(pos[1]+1)*10+pos[0]]!= 3){
                casillasValidas[3]=true;
            }
        }
    }
    if(pos[0]!=0){
        if(tablero[pos[1]*10+pos[0]]==2){
            if(tablero[pos[1]*10+pos[0]-1]!= 1){
                casillasValidas[1]=true;
            }
        }
    }
    if(pos[0]!=9){
        if(tablero[pos[1]*10+pos[0]]==1){
            if(tablero[pos[1]*10+pos[0]+1]!= 2){
                casillasValidas[0]=true;
            }
        }
    }
  } 
  return(casillasValidas)
}


/* Función que actualiza el estado del tablero
-playerPlace:arreglo con coordenadas de cada jugador
-gameBoardStatus:arreglo con el estado actual del juego
-countPlayers:numero de jugadores*/
function actualizarEstado(playerPlace,gameBoardStatus,countPlayers,gameBoardStart){
  /* Se inicializa el tablero para evitar que queden restos de estados anteriores */
  gameBoardStatus=gameBoardStart.slice();
  /* Guarda en la coordenada correspondiente a la posición de cada jugador el número de jugador */
  for(var cont = 0; cont <= countPlayers-1; cont ++){
      gameBoardStatus[playerPlace[cont][0]+(playerPlace[cont][1]*10)] = "j"+(cont+1);
  }
  return gameBoardStatus;
}


/* Brinda la opción de elección cuando hay dos caminos posibles
dir1: primera dirección válida
dir2: segunda dirección válida
jugador: jugador a mover
key: tecla presionada */
function elegirCamino(dir1,dir2,playerPlace, jugador,key){
  console.log(key.keyCode)
  console.log(dir1)
  console.log(dir2)
  if((dir1== 2||dir2== 2)&& key.keyCode == '97'){
      playerPlace = actualizarPos(2,playerPlace,jugador-1);
  }
  if(dir1== 1||dir2== 1&& key.keyCode == '100'){
      playerPlace = actualizarPos(1,playerPlace,jugador-1);
  }
  if(dir1== 3||dir2== 3&& key.keyCode == '115'){
      playerPlace = actualizarPos(3,playerPlace,jugador-1);
  }
  if(dir1== 4||dir2== 4&& key.keyCode == '119'){
      playerPlace = actualizarPos(4,playerPlace,jugador-1);
  }
  return playerPlace;
}


/* Mueve al jugador
-jugador: Jugador que se quiere mover (1-4)
-movDir: primera dirección
movDirOpt: segunda dirección si aplica
casillasValidNum: número de casillas válidas*/
function moverJugador(jugador,countPlayers,srcFichas,puntajes,num,tablero1,tablero2,tablero3){
  $("#jugadorTurno p").html("Turno del jugador: "+jugador);
  $("#jugadorDado p").html("Dado: "+ num);
  var j = 1;
  var movimientoInterval = setInterval(()=>{
      if(j <= num){
          var casillasValid=verifCasillas(playerPlace[jugador-1],tablero3);
          var casillasValidNum = 0;
          var movDir;
          var movDirOpt = 0;
          console.log(casillasValid)
          for(var i = 0; i < casillasValid.length;i++){
              if(casillasValid[i]==true){
                  if(casillasValidNum >= 1){
                    movDirOpt = i+1;
                  }
                  else{
                    movDir = i+1;
                  }
                  casillasValidNum += 1;
              }
          }
          if(casillasValidNum == 1){
              playerPlace = actualizarPos(movDir,playerPlace,jugador-1);
          }
          else{
            $("body").append('<div id="flechasCamino"></div>')
            clearInterval(movimientoInterval);
            console.log(playerPlace)
            document.addEventListener("keypress",(key)=>{
              $("#flechasCamino").css("display","none");
              num=num-j;
              playerPlace = elegirCamino(movDir,movDirOpt,playerPlace, jugador,key,srcFichas,puntajes,num,tablero1,tablero2,tablero3);
              tablero1=actualizarEstado(playerPlace,tablero1,countPlayers,tablero2)
              document.removeEventListener("keypress",(key)=>{
                $("#flechasCamino").css("display","none");
                num=num-j;
                playerPlace = elegirCamino(movDir,movDirOpt,playerPlace, jugador,key,srcFichas,puntajes,num,tablero1,tablero2,tablero3);
                tablero1=actualizarEstado(playerPlace,tablero1,countPlayers,tablero2)
                document.removeEventListener("keypress");
                moverJugador(jugador,countPlayers,srcFichas,puntajes,num,tablero1,tablero2,tablero3);
              });
              moverJugador(jugador,countPlayers,srcFichas,puntajes,num,tablero1,tablero2,tablero3);
            });  
            j = 7;
          }
          tablero1=actualizarEstado(playerPlace,tablero1,countPlayers,tablero2);
          generarTablero(tablero1,srcFichas)
      }
      else{
          clearInterval(movimientoInterval);
      }
      j++;
  },1000);
  puntajes[jugador-1] += 10;
  $("#points"+ jugador).html(puntajes[jugador-1]);
}

/* DADO */

/**/
function resetDado() {
  $("#Dado .Tirar .respRul").remove();//Quita el mennsaje de respuesta
  $("#Dado .Tirar button").show();//Muestra el boton de girar nuevamente
  $("#Dado").show();//Muestra el modal del dado
}

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