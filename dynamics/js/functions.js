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
            $("#jugarButton").click(()=>{
                contIndex('./statics/modoDeJuego.html');
            });
            $("#instructButton").click(()=>{
                contIndex('./statics/instrucciones.html');
            });
            $("#personajesButton").click(()=>{
                contIndex('./statics/personajes.html');
            })          
            $("#podiumButton").click(()=>{
                contIndex('./statics/podium.html');
            })          
            $("#creditButton").click(()=>{
                contIndex('./statics/credit.html');
            })
            if(ruta == './statics/modoDeJuego.html'){
                cartaHover("#opt1","#opt1 h2");
                cartaHover("#opt2","#opt2 h2");
                cartaHover("#opt3","#opt3 h2");
                cartaHover("#opt4","#opt4 h2");
            }          
        })
        .catch(error => {
            console.error('Fallo al obtener el contenido', error);
        });
};