
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

/* Descripción de cada personaje */
var descripciones = ["Desaparece 2 opciones bla bla", "Es un robot bla bla", "es una bla bla en llamas", "lorem ipsum"];
/* Pantalla de carga */
var title = $('#title');
/* Agrega Nuevos Jugadores
count: cuenta de jugadores al momento */
function nuevoJugador(){
    var count = 1;
    $("#newPlayer").click(()=>{
        count+=1
        if(count==4){
            $("#newPlayer").css("display","none");
        }
        $("#botonesJugadores").append('<div class="player" id="player'+count+'"><div class="playerImg" ></div><div class="playerTxt"> Michibot</div> <div class="negButton"><span>x</span></div></div>');
        console.log("ola");
        $(".negButton")[count-2].click(()=>{
            console.log("oli");
            $("#player"+count).css("display","none");
            count-=1;
        })
    })
    return count;

}
/* Cambia la descripción de cada personaje 
-text:Descripción*/
function cambiarTexto(text){
/*     $("#charInfo").click(()=>{
        
        $("#charInfo").append('<div class="infoSquare">',text,'</div>');
    }) */
}
/* Cambia la imagen a mostrar a partir del menú de personaje */
function rotarPersonaje(){
    cambiarTexto(descripciones[0]);
    $("#char1").click(()=>{
        $("#charImg").html('<img src="../statics/img/cagumago.png" alt=""></img>')
        cambiarTexto(descripciones[0]);
    });
    $("#char2").click(()=>{
        $("#charImg").html('<img src="../statics/img/michibot2.png" alt=""></img>')
        cambiarTexto(descripciones[1]);
    });
    $("#char3").click(()=>{
        $("#charImg").html('<img src="../statics/img/cagumago.png" alt=""></img>')
        cambiarTexto(descripciones[2]);
    });
    $("#char4").click(()=>{
        $("#charImg").html('<img src="../statics/img/michibot2.png" alt=""></img>')
        cambiarTexto(descripciones[3]);
    });
}
/* Cambia el contenido de el menú a partir de las opciones 
Parámetros:
-target: elemento detonador
-ruta: página con el contenido que se busca*/
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
                console.log("olap");
                numJugadores = nuevoJugador();
                rotarPersonaje();
                $("#jugarFinal").click(()=>{
                    window.location.href = "./juego.html"
                })
            }    
        })
        .catch(error => {
            console.error('Fallo al obtener el contenido', error);
        });
        $("#menu").css("display", "none");
    });
    return numJugadores;
}

/* Botones de menú principal */
var jugarButton = $("#jugar");
var instruccionesButton = $("#instrucciones");
var personajesButton = $("#personajes");
var creditosButton = $("#creditos");
numJugadores = cambiarPags(jugarButton,'./charOpts.html');
cambiarPags(instruccionesButton,'./charOpts.html');
cambiarPags(personajesButton,'./charOpts.html');
cambiarPags(creditosButton,'./charOpts.html');
generarFrasesCarga(400);
$(document).ready(()=>{
    setTimeout(()=>{
        console.log($(window));
        title.css("display","none");        
    }, 4000);
})