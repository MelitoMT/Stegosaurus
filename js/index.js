/* Pantalla de carga */
var title = $('#title');
var persElegibles = [
  {personaje:"Cangumago",
   urlImg:"./statics/img/cagumago.png",
   urlImgAvatar:"./statics/img/CangumagoAvatar.png",
   descripcion:"Un canguro mago nomas"
  },
  {personaje:"michibot",
   urlImg:"./statics/img/michibot2.png",
   urlImgAvatar:"./statics/img/MichibotAvatar.png",
   descripcion:"Gato-robot UwU "
  },
  {personaje:"Fireoat",
   urlImg:"./statics/img/Fireoat.png",
   urlImgAvatar:"./statics/img/FireoatAvatar.png",
   descripcion:"Un canguro mago nomas, la secuela"
  },
  {personaje:"Ajolodín",
   urlImg:"./statics/img/Ajolote.png",
   urlImgAvatar:"./statics/img/AjoloteAvatar.png",
   descripcion:"Gato-robot UwU Recargado"
  },
];
/**/
generarFrasesCarga(400);
$(document).ready(()=>{
  /* Botones de menú principal */
    var jugarButton = $("#jugar");
    var instruccionesButton = $("#instrucciones");
    var personajesButton = $("#personajes");
    var creditosButton = $("#creditos");
    setTimeout(()=>{
        console.log($(window));
        title.css("display","none");
        cambiarPags(jugarButton,'./templates/charOpts.html');
        cambiarPags(instruccionesButton,'./templates/charOpts.html');
        cambiarPags(creditosButton,'./templates/charOpts.html');
        cambiarPags(personajesButton,'./templates/charOpts.html');
    }, 4000);
})
