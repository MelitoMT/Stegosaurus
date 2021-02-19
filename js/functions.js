/* Hace el cambio de frases para la pantalla de carga
Parámetros:
tiempo:Cada cuánto se cambia la palabra*/
function generarFrasesCarga(tiempo){
    var frasesCarga = ['Elige sabiamente tu personaje...','Enseñando magia al Cangumago...', 'Michibot escribiendo su primer "Hola Mundo...','Eligiendo preguntas...' ];
    setInterval(()=>{
        var i = Math.floor(Math.random() * Math.floor(frasesCarga.length + 1));
        $("#frases").html(frasesCarga[i]);
    },tiempo);
}
function checkMaxPlayer(numPlay){
    if(numPlay==4){
        $("#newPlayer").css("display","none");
    }else{
      $("#newPlayer").css("display","block");
    }
};
/* Agrega Nuevos Jugadores
count: cuenta de jugadores al momento */
function nuevoJugador(){
    var count = 1;
    let divCont = $("#botonesJugadores");
    $("#newPlayer").click(()=>{
        count+=1;
        checkMaxPlayer(count);
        var divPlayer = $('<div class="player" id="player'+count+'"></div>');
        var close = $('<div class="negButton"><span>x</span></div>');
        $(".negButton").css("display","none");
        close.click(()=>{
          divCont.children().last().remove();
          $(".negButton").last().css("display","block");
          count-=1;
          checkMaxPlayer(count);
        })
        divPlayer.append('<div class="playerImg" ></div>', ['<input type="text" class="playerTxt" maxlength="8" placeholder="Player '+count+'" value="">', close]);
        divCont.append(divPlayer);
    })
}
function captarInfo(){
    $("#jugarFinal").click(()=>{
      let divCont = $("#botonesJugadores").children();
      var jugadores = [];
      for (var i = 1; i < 5; i++) {
        if (i<=divCont.length) {
          var nombre = $("#player"+i)[0].children[1].value;
          if (nombre == "") {
            nombre = "Player" +i;
          }
          let jugador = {
            nPlayer: i,
            nickname: nombre,
            avatar: "vacio"
          }
          jugadores.push(jugador);
        }else{
          let jugador = {
            nPlayer: i,
            nickname: "Bot"+i,
            avatar: "vacio"
          }
          jugadores.push(jugador);
        }
      }
      console.log("Funciono");
      console.log(jugadores);
    })
}
/* Cambia la imagen a mostrar a partir del menú de personaje */
function rotarPersonaje(){
    cambiarTexto(descripciones[0]);
    $("#char1").click(()=>{
        $("#charImg").html('<img src="'+persElegibles[0].urlImg+'" alt=""></img>')
        cambiarTexto(descripciones[0]);
    });
    $("#char2").click(()=>{
        $("#charImg").html('<img src="./statics/img/michibot2.png" alt=""></img>')
        cambiarTexto(descripciones[1]);
    });
    $("#char3").click(()=>{
        $("#charImg").html('<img src="./statics/img/cagumago.png" alt=""></img>')
        cambiarTexto(descripciones[2]);
    });
    $("#char4").click(()=>{
        $("#charImg").html('<img src="./statics/img/michibot2.png" alt=""></img>')
        cambiarTexto(descripciones[3]);
    });
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
            $("body").html(html);
            if(target="jugarButton"){
                captarInfo();
                nuevoJugador();
                // rotarPersonaje();
                // $("#jugarFinal").click(()=>{
                //     window.location.href = "./juego.html"
                // })
            }
        })
        .catch(error => {
            console.error('Fallo al obtener el contenido', error);
        });
        $("#menu").css("display", "none");
    });
    return numJugadores;
}