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
function nuevoJugador(obj){
    var count = 1;
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
}
function getIndexByName(nombre, obj){
  var index;
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].personaje==nombre) {
      index = i;
    }
  }
  return index;
}
function generRandomIndex(obj) {
  var index = Math.floor((Math.random() * obj.length));
  return index;
}
function cambiarAvatar(obj){
  $.each($(".btn-elegir"),(index, elem)=>{
    elem.onclick= ()=>{
      actualizarImg(index+1, $("#avatarImgDescr").attr("alt"), obj);
    }
  });
}
function actualizarImg(jugador, imagen, obj) {
  var imgPlayer = $("#player"+jugador).children(".playerImg").children("img");
  var index = getIndexByName(imagen, obj);
  imgPlayer.attr("src", obj[index].urlImgAvatar);
  imgPlayer.attr("alt", obj[index].personaje);
}
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
    })
}
function regresarInicio() {
  $(".inicio").click(()=>{
    $("#INDEX").show();
    $("#OTHER").empty();
  })
}
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
                nuevoJugador(persElegibles);
                descPersonajes(persElegibles);
                cambiarAvatar(persElegibles);
                // $(".generalButtonOut").hover(()=>{
                //   $(".generalButtonOut").css("","")
                // });
                // $(".generalButtonIn").hover(()=>{
                //   $(".generalButtonOut").css("","")
                // });
                // $(".generalButtonIn span").hover(()=>{
                //   $(".generalButtonOut").css("","")
                // });

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
