function generarPersonajes(a){
    var jugadorBox = "<div class='player'></div>"
    var b;
    switch(a){
        case 'uno':
            b = 1;
            break;
        case 'dos':
            b = 2;
            break;
        case 'tres':
            b = 3;
            break;
        case 'cuatro':
            b = 4;
            break;            
    }
    console.log(a);
    console.log(b);
    fetch('../../statics/eleccionPersonajes.html')
    .then((response)=>{
        return response.text();
    })
    .then((text)=>{
        $("#eleccionPersonajes").html("");
        $("#eleccionPersonajes").html(text+text+text+text);
    })
}
