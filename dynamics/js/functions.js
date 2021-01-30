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
