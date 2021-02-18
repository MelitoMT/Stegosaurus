function cartaHover(opt,element){
    $(opt).mouseenter(()=>{
        $(element).css("top", "30%");
    }).mouseleave(()=>{
        $(element).css("top", "50%");
    });
    $(opt).click(()=>{
        $("#numJugadores").attr("value",$(opt).attr("value"));
        $("#modoDeJuegoForm").submit();
    })
}
// Utilizar esto para guardado de partida
function checkName(nom) {
  var listUsers = JSON.parse(localStorage.getItem("juagadore"));
  for (var i = 0; i < listUsers.length; i++) {
    var validName = true;
    if (listUsers[i].name == nom) {
      validName = false;
    }
  }
  return validName;
}
function guardarUsuario(nom, contr) {
  var listUsers = JSON.parse(localStorage.getItem("usuario"));
  var newUser = {
    name: nom,
    password: contr,
    record: "",
    victorias: "0",
    derrotas: "0",
  };
  if (users == null) {
    var Usuarios = [newUser];
  }else{
    users.push(newUser)
  }
  localStorage.setItem("usuario", JSON.stringify(users));
}

function contIndex(ruta){
    fetch(ruta)
        .then((response)=>{
            return response.text();
        })
        .then((text)=>{
            console.log(text);
            $("#cont").html("");
            $("#cont").html(text);
            if(ruta = "./statics/menu.html"){
                $("body").css("background","var(--gradienteGris)");
            }
        })
        .catch(error => {
            console.error('Fallo al obtener el contenido', error);
        });
};

function generarFrasesCarga(){
    var frasesCarga = ['Elige sabiamente tu personaje...','Enseñando magia al Cangumago...', 'Michibot escribiendo su primer "Hola Mundo...','Eligiendo preguntas...' ];
    setInterval(()=>{
        var i = Math.floor(Math.random() * Math.floor(frasesCarga.length + 1));
        $("#frases").html(frasesCarga[i]);
    },600);
}
