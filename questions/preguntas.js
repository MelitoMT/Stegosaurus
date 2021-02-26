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
  var categorias = [];
  for (var i = 0; i < arr.length; i++) {
    var agregar = true;
    for (var j = 0; j < categorias.length; j++) {
      if (arr[i].Categoria == categorias[j]) {
        agregar =false;
      }
    }
    if (agregar) {
      categorias.push(arr[i].Categoria)
    }
  }
  return categorias;
}
function obtenerDificultades(arr){
  var dificultades = [];
  for (var i = 0; i < arr.length; i++) {
    var agregar = true;
    for (var j = 0; j < dificultades.length; j++) {
      if (arr[i].Dificultad == dificultades[j]) {
        agregar =false;
      }
    }
    if (agregar) {
      dificultades.push(arr[i].Dificultad)
    }
  }
  return dificultades;
}
function obtenerPregPorId(arr, id){
  var dificultades = [];
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].id == id){
      var preg = arr[i];
    }
  }
  return preg;
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
function mostrarPreg() {
  //Añade el modal de pregunta
  var pregunta = generarPregunta("Hardware", "Facil")
  $(".modal-background").show();
  var modal = $("<div id='p-"+pregunta.id+"' class='modal'>");
  modal.append($("<div class='modal-title'>"+pregunta.Pregunta+"</div>"))
  modal.append($("<div class='modal-img'><img src='./statics/img/default-quest.png' alt='default'></div>"))
  var modalCont = $("<div class='modal-cont'>");
  console.log(pregunta);
  var contIzq = $("<div class='contIzq'>");
  var contDer = $("<div class='contDer'>");
  if (pregunta.Tipo=="multiple") {
    for (var i = 1; i < 5; i++) {
      var preg = $("<div id=Resp_"+i+" class='resp multiple'><p>"+pregunta["r"+i]+"</p></div>");
      if ((i == 1)||(i == 3)) {
        contIzq.append(preg)
      }
      if ((i == 2)||(i == 4)) {
        contDer.append(preg)
      }
    }
    modalCont.append(contIzq, contDer)
  }else if (pregunta.Tipo=="booleana") {
    for (var i = 1; i < 3; i++) {
      var preg = $("<div id=Resp_"+i+" class='resp boolean'><p>"+pregunta["r"+i]+"</p></div>");
      preg.click(()=>{
        console.log(pregunta["r"+i]);
      })
      if (i == 1) {
        contIzq.append(preg)
      }
      if (i == 2) {
        contDer.append(preg)
      }
    }
    modalCont.append(contIzq, contDer)
  }
  modal.append(modalCont)
  $("body").append(modal)
  // Añade evento a las respuestas
  $.each($(".resp"),(index, elem)=>{
    elem.onclick= ()=>{
      responder(pregunta.id, "r"+((elem.id).substr(5,1)))
    }
  });
}
function responder(idpreg, respuesta){
  var preg = obtenerPregPorId(window.preguntas, idpreg)
  var resCorr = preg.rCorrecta
  console.log(resCorr +"=="+ respuesta);
  if (resCorr == respuesta) {
    console.log("Es la correcta");
  }else{
    console.log("No lo es :c");
  }
  ocultarPreg(idpreg)
}
function ocultarPreg(id) {
  $(".modal-background").hide();
  $("#p-"+id).remove();
}

var nombreArchivoCSV = "Preguntas_computacion";

fetch("./questions/"+nombreArchivoCSV+".tsv")
.then((response)=>{
  return response.text();
})
.then((tsvText)=>{
   window.preguntas = tsvOBJ(tsvText); //Declaro esta variable globalmente
})
.catch(error => {
  console.error('Fallo el obtener las preguntas', error);
});
