/**********************************************/
/****** INGRESAR NOMBRE DEL ARCHIVO .tsv ******/
/**********************************************/
var nombreArchivoCSV = "Preguntas_computacion";



// La variable es el texto del tsv
function tsvOBJ(tsv){

  var lines=tsv.split("\n"); //Los pera por salto de linea

  var result = []; //arreglo que se decolvera

  var headers=lines[0].split("\t"); //La primera linea la utiliza para guardar y asignar los titulos
  for (var i = 0; i < headers.length; i++) {
    headers[i] = headers[i].replace(/\r/g, '');//Elimina salto de linea no buscado
  }
  for(var i=1;i<lines.length;i++){ //Coniverte el restro de filas en objetos

	  var obj = {};
	  var currentline=lines[i].split("\t"); //Separa los distintos valores por tabulacion
    obj["id"] = i;//Se le añade un id a cada objeto para su mejor manejo
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];//Crea un objeto de cada linea
	  }

	  result.push(obj);//guarda el objeto en el arreglo

  }
  return result;//devuelve el arreglo
}

function obtenerCategorias(arr){
  var categorias = [];/*Arreglo que se devuelve*/
  for (var i = 0; i < arr.length; i++)/*Ejecuta todo con cada pregunta*/ {
    var agregar = true;
    for (var j = 0; j < categorias.length; j++){
      if (arr[i].Categoria == categorias[j])/*Checa si ya existe la categoria*/ {
        agregar =false;/*Si existe indica no agregarla*/
      }
    }
    if (agregar)/*Checa si se agrega o no la categoria*/ {
      categorias.push(arr[i].Categoria)//Se añade la categoria
    }
  }
  return categorias;//Devuleve todas las categorias
}
function obtenerDificultades(arr){
  var dificultades = [];/*Arreglo que se devuelve*/
  for (var i = 0; i < arr.length; i++) /*Ejecuta todo con cada pregunta*/ {
    var agregar = true;
    for (var j = 0; j < dificultades.length; j++){
      if (arr[i].Dificultad == dificultades[j])/*Checa si ya existe la dificultad*/ {
        agregar =false;/*Si existe indica no agregarla*/
      }
    }
    if (agregar)/*Checa si se agrega o no la dificultad*/ {
      dificultades.push(arr[i].Dificultad)//Se añade la dificultad
    }
  }
  return dificultades;//Devuleve todas las dificultad
}
function obtenerPregPorId(arr, id){
  for (var i = 0; i < arr.length; i++)/*Cehca en todas las preguntas*/ {
    if(arr[i].id == id)/*Checa que id sea el mismo al solicitado*/{
      var preg = arr[i];//guarda la pregunta concidiente
    }
  }
  return preg;//Devuleve el objeto
}
// obtenerCategorias(window.preguntas);
function generarPregunta(cat, dif) {
  // Regresa el valor de la funcion busquedaPreg
  return busquedaPreg (cat, dif, window.preguntas, (dificultad, arreglo, callback)=>{//Mando la funcion que ejectura  el hacer callback
    var pregDificultad = [];//arreglo donde se almacenaran las pregunta con categorias y dificultad validadas
    // Elige las preguntas validas por categoria
    for (var i = 0; i < arreglo.length; i++) {
      if (arreglo[i].Dificultad == dificultad) {
        pregDificultad.push(arreglo[i]);//Agrego las preguntas validas por categorias y dificultad validadas
      }
    }
    return callback(pregDificultad);//Regresa el objeto obtenido en el callback
  })
}
// Creo funcion para separar por categoria
function busquedaPreg (categoria, dificultad, arreglo, callback){
  var pregCategorias = [];//arreglo donde se almacenaran las pregunta con categorias validadas
  // Elige las preguntas validas por categoria
  for (var i = 0; i < arreglo.length; i++) {
    if (arreglo[i].Categoria == categoria) {
      pregCategorias.push(arreglo[i]);//Agrego las preguntas validas por categoria
    }
  }
  //devuelve el valor obtenido en el callback
  return callback(dificultad, pregCategorias, (arrFin)=>{//Manda la funcion a ejecutar que hara este callback
    var index = Math.floor((Math.random() * arrFin.length));//Elige aleatoriamente una de esas preguntas
    return arrFin[index];//Regresa el objeto elegido
  });
}
function mostrarPreg(idPreg) {
  //Añade el modal de pregunta
  var pregunta = obtenerPregPorId(window.preguntas, idPreg)//Obtiene la pregunta
  $(".modal-background").show();
  var modal = $("<div id='p-"+pregunta.id+"' class='modal'>");//Crea el modal
  modal.append($("<div class='tiempo'>"))
  modal.append($("<div class='modal-title'>"+pregunta.Pregunta+"</div>"))//Añade la pregunta
  modal.append($("<div class='modal-img'><img src='../statics/img/default-quest.png' alt='default'></div>"))//Añade imagen default al modal
  var modalCont = $("<div class='modal-cont'>");//Contenerdor de las respuestas
  var contIzq = $("<div class='contIzq'>");//Parte izquierda
  var contDer = $("<div class='contDer'>");//Parte derecha
  if (pregunta.Tipo=="multiple") /*Cehca si son 4 o dos preguntas*/{
    for (var i = 1; i < 5; i++) /*Añade las 4 preguntas*/{
      var preg = $("<div id=Resp_"+i+" class='resp multiple'><p>"+pregunta["r"+i]+"</p></div>");//Crea las preguntas
      if ((i == 1)||(i == 3)) {
        contIzq.append(preg)//Añade la pregunta a su contenedor destinado
      }
      if ((i == 2)||(i == 4)) {
        contDer.append(preg)//Añade la pregunta a su contenedor destinado
      }
    }
    modalCont.append(contIzq, contDer)//Añade los contenedores
  }else if (pregunta.Tipo=="booleana") /*Cehca si son dos preguntas*/{
    for (var i = 1; i < 3; i++) /*Añade las dos preguntas*/{
      var preg = $("<div id=Resp_"+i+" class='resp boolean'><p>"+pregunta["r"+i]+"</p></div>");//Crea las preguntas
      if (i == 1) {
        contIzq.append(preg)//Añade la pregunta a su contenedor destinado
      }
      if (i == 2) {
        contDer.append(preg)//Añade la pregunta a su contenedor destinado
      }
    }
    modalCont.append(contIzq, contDer)//Añade los contenedores
  }
  modal.append(modalCont)//añade al modal las preguntas
  $("body").append(modal)//añade el modal
  contar = true;//variable si indica seguir contando
  cuentaRegre(20, pregunta.id)//comienza la cuenta regresiva para contestar
  // Añade evento a las respuestas
  $.each($(".resp"),(index, elem)=>{
    elem.onclick= ()=>{
      contar = false;//Cancela el contar
      responder(pregunta.id, ((elem.id).substr(5,1)/*Manda solo el numero de la respuesta*/))//Manda la respuesta
    }
  });
  //Si es bot responde automaticamente 3 segundos despues
  var nomJug = jugadores[(tirosInit[(jugadorActual-1)].jugador)-1].nickname
  if (nomJug.match(/Bot\d/i)) {
    //Elimina eventode rr
    $.each($(".resp"),(index, elem)=>{
      elem.onclick= "";
    });
    if (pregunta.Tipo=="multiple") {
      var respRandom = Math.floor((Math.random() * 3)+1);
    }else if (pregunta.Tipo=="booleana") {
      var respRandom = Math.floor((Math.random() * 1)+1);
    }
    console.log("Tipo "+pregunta.Tipo);
    console.log("Respondi "+respRandom);
    setTimeout(()=>{
      contar = false;//Cancela el contar
      responder(pregunta.id, respRandom)/*Manda respuesta aleatoria*/
    }, 3000)
  }
}
function responder(idpreg, respuesta){
  var preg = obtenerPregPorId(window.preguntas, idpreg)//se guarda la pregunta
  var resCorr = preg.rCorrecta//se guarda la respuesta correcta de la pregunta
  resCorr = resCorr.match(/\d/gmi);//otiene el numero de la respuesta correcta
  if (resCorr == respuesta) /*Checa si ambos numero son iguales*/{
    puntuar(true, idpreg);
    $("#Resp_"+respuesta).css("color", "#00da30");//cambia el color de la respuesta correcta a verde
  }else{
    puntuar(false, idpreg);
    $("#Resp_"+respuesta).css("color", "#da0000");//cambia el color de la respuesta seleccionada a rojo
    $("#Resp_"+resCorr).css("color", "#00da30");//cambia el color de la respuesta correcta a verde
  }
  /*Da tiempo a poder leer el resultado*/
  setTimeout(()=>{
    ocultarPreg(idpreg)//Elimina el modal
  }, 1500)
}
function ocultarPreg(id) {
  $(".modal-background").hide();//Oculta el fondo del modal
  $("#p-"+id).remove();//Elimina el modal
}
var contar = true;//Valor default de contar
/*Cuenta regresiva para ejercer cierta precion a contestar*/
function cuentaRegre(seg/*segundo para responder*/, idpPreg/*id de la pregunta a responder*/){
  console.log(seg);
  $(".tiempo").empty();
  $(".tiempo").append(seg);
    if (seg>0/*tiempo restante mayor a 0*/ && contar/*checa si seguir contado*/) {
      //deja transcurrir un segundo
      setTimeout(()=> {
        cuentaRegre(seg-1, idpPreg)//vuelve a llamarse con un segundo menos
      }, 1000);
    }else if (contar)/*cuando se acaba el tiempo pero no resondio */{
      var preg = obtenerPregPorId(window.preguntas, idpPreg)//obtiene la pregunta
      var resCorr = preg.rCorrecta//obtiene la respcorrecta pregunta
      /*Elimina el evento de responder en las respuestas*/
      $.each($(".resp"),(index, elem)=>{
        elem.onclick= "";
      });
      resCorr = resCorr.match(/\d/gmi);//obtiene numero respuesat correcta
      for (var i = 1; i < 5; i++) {
        if (resCorr!=i) {
          $("#Resp_"+i).css("color", "#da0000");//todas las incorrectas se cambia el color a rojo
        }
      }
      $("#Resp_"+resCorr).css("color", "#00da30");//la correcta se pone verde
      //da tiempo a leer los reultados
      setTimeout(()=>{
        ocultarPreg(idpPreg)//Elimina el modal
        puntuar(false, idpPreg);
      }, 1500)
    }
}
function puntuar(correct, idPreg) {
  console.log("Puntuando");
  console.log(correct);
  var preg = obtenerPregPorId(window.preguntas, idPreg)
  if (correct) {
    if (preg.Dificultad == "Facil") {
      puntajes[jugadorActual-1] +=3;
    }else if (preg.Dificultad == "Media") {
      puntajes[jugadorActual-1] +=5;
    }else if (preg.Dificultad == "Dificil") {
      puntajes[jugadorActual-1] +=10;
      //Añadir valor
    }else{
      console.log("Ninguno?");
    }
    $("#points"+ jugadorActual).html(puntajes[jugadorActual-1]);
  }else{
    console.log("No puntuo");
  }
  jugadorActual++;
  if (jugadorActual>4) {
    jugadorActual=1;
  }
  var fin = false;
  maxPuntaje = mayorPuntaje(puntajes);
  if(maxPuntaje >= 2){
    console.log(maxPuntaje)
    fin = true;
  }
  /*Checa si aguien ya gano*/
  if (fin) {
    var ganador = puntajes.indexOf(maxPuntaje);
    console.log(ganador);
    var avatarGanador= "../statics/img/ficha"+jugadores[ganador].avatar+".png"
    setTimeout(()=>{
      $("body").append("<div id=\"podiumBck\"><div id=\"podiumCont\"><h3>¡FELICIDADES!</h3><div id=\"winnerContainer\"><div><img src=\"../statics/img/hojas.png\"></div><div id=\"ganadorNick\"></div><a id=\"menuButtonEnd\"href=\"../\">Volver a Menú</a></div></div></div>")
      $("#winnerContainer").css("background-image","url("+avatarGanador+")");
      $("#ganadorNick").html("<p>"+jugadores[ganador].nickname+"</p>")
    },2000)
  }else{
    setTimeout(()=>{
      $(".modal-background").show();//Oculta el fondo del modal
      jugando(jugadorActual)
    }, 2500)
  }
}
/*No aqui*/
/*Crea la ruleta y sus configuración*/
function RuletaCat(){
  genRulCat(()=>{
    var option /*Configuracion e la ruleta*/ = {
      speed : 15,
      duration : 3,
      stopImageNumber : -1,//Numero elige aleatorio
      stopCallback : function($stopElm)/*Que hace al acabar de girar*/ {
        console.log(playerPlace)
        switch(gameBoardStart[playerPlace[jugadorActual-1][1]*10+playerPlace[jugadorActual-1][0]]){
          case 2:
              difCasilla= "Facil";
              break;
          case 3:
              difCasilla= "Media";
              break;
          case 4:
              difCasilla= "Dificil";
              break;
          default:
              difCasilla = "";
              break;
        }
        $("#RuletaCateg .girar").append("<p class='respRul'>"+$stopElm[0].alt+"</p>");//Agrega respuesta al modal
        console.log(difCasilla)
        var pregunta = generarPregunta($stopElm[0].alt,difCasilla);//Genera una pregunta con los parametros dados
        /*Da un pequeño tiempo para leer la respuesta*/
        setTimeout(()=>{
          $("#RuletaCateg").hide();//Oculta el carrusel
          mostrarPreg(pregunta.id)//Muestra la pregunta
        }, 1500);
      }
    }
    $('#RuletaCateg div.roulette').roulette(option);//Creo la ruleta
    setTimeout(()=>{
      $("#RuletaCateg").hide();//Muestra el modal
    },100)
  })
}
function resetRulCat (){
  $(".modal-background").show();//Oculta el fondo del modal
  $("#RuletaCateg .girar .respRul").remove();//Quita respuestas previas
  $("#RuletaCateg .girar button").show();//muestra el boton de nuevo
  $("#RuletaCateg").show();//Muestra el modal
}
function genRulCat(callback){
  var categorias = obtenerCategorias(window.preguntas);//Obtengo las categorias
  $.each(categorias,(index, elem)=>{
    var img = $("<img src='../statics/img/"+elem+".png' alt='"+elem+"'>")
    $("#RuletaCateg .roulette_container .roulette").append(img);//Agrego cada imagen
  });
  var buttonGirar = $('<button type="button" name="girar">Girar</button>')//agrego el boton para girar
  //Añado evento al boton
  buttonGirar.click(()=>{
    $('#RuletaCateg div.roulette').roulette("start");//Gira la ruleta
    buttonGirar.hide()//Oculta el boton
  })
  $("#RuletaCateg .girar").append(buttonGirar)//Agrega el boton a la ruleta
  callback();//hago el callback Cuando se acabe de crear la ruleta
}

/*Solicita las preguntas*/
fetch("../questions/"+nombreArchivoCSV+".tsv")
.then((response)=>{
  return response.text();
})
.then((tsvText)=>{
   window.preguntas = tsvOBJ(tsvText); //Declaro esta variable globalmente

   RuletaCat()//Creo la ruleta de categorias
})
.catch(error => {
  console.error('Fallo el obtener las preguntas', error);
});
