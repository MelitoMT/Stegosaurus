/* Pantalla de carga */
var title = $('#title');
var persElegibles = [
  {personaje:"Cangumago",
   urlImg:"./statics/img/cagumago.png",
   descripcion:"Un canguro mago nomas"
  },
  {personaje:"michibot",
   urlImg:"./statics/img/michibot2.png",
   descripcion:"Gato-robot UwU "
  },
  {personaje:"cagumago 2",
   urlImg:"./statics/img/cagumago.png",
   descripcion:"Un canguro mago nomas, la secuela"
  },
  {personaje:"michibot2",
   urlImg:"./statics/img/michibot2.png",
   descripcion:"Gato-robot UwU Recargado"
  },
];
/* Botones de menú principal */
var jugarButton = $("#jugar");
var instruccionesButton = $("#instrucciones");
var personajesButton = $("#personajes");
var creditosButton = $("#creditos");
/**/
generarFrasesCarga(400);
$(document).ready(()=>{
    setTimeout(()=>{
        console.log($(window));
        title.css("display","none");
        cambiarPags(jugarButton,'./templates/charOpts.html');
        $.each(persElegibles,(index, value)=>{
          console.log(persElegibles[index]);
        });
                
    }, 4000);
})
