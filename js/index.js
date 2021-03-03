/* 
Nombre de proyecto:Master Question
Autor: Stegosaurs
 */


/* Pantalla de carga */
var title = $('#title');
var persElegibles = [
  {personaje:"Cangumago",
   urlImg:"./statics/img/cagumago.png",
   urlImgAvatar:"./statics/img/CangumagoAvatar.png",
   descripcion:"Un canguro mago nomas"
  },
  {personaje:"Michibot",
   urlImg:"./statics/img/michibot.png",
   urlImgAvatar:"./statics/img/MichibotAvatar.png",
   descripcion:"Gato-robot UwU "
  },
  {personaje:"Fireoat",
   urlImg:"./statics/img/Fireoat2.png",
   urlImgAvatar:"./statics/img/FireoatAvatar.png",
   descripcion:"Un canguro mago nomas, la secuela"
  },
  {personaje:"Ajolote",
   urlImg:"./statics/img/Ajolote.png",
   urlImgAvatar:"./statics/img/AjoloteAvatar.png",
   descripcion:"Gato-robot UwU Recargado"
  },
];
var count = 1;
/**/
generarFrasesCarga(400);
$(document).ready(()=>{
  /* Botones de menú principal */
    var jugarButton = $("#jugar");
    var instruccionesButton = $("#instrucciones");
    var personajesButton = $("#personajes");
    $("#titleButton").click(()=>{
      musicaFondo();
      popSound(".generalButtonIn");
      title.css("display","none");
      cambiarPags(jugarButton,'./templates/charOpts.html');
      cambiarPags(instruccionesButton,'./templates/instrucciones.html');
      cambiarPags(personajesButton,'./templates/personajes.html');
    });
})
