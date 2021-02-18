/* Guarda el tablero al inicio
0: no hay casilla
1: azul
2:verde
3:rojo
4:morado  
5:inicio*/
var gameBoard = [0,5,1,1,2,1,3,1,4,1,/* Primera Fila */
                0,0,3,0,0,0,1,0,0,2,/* Segunda Fila */
                0,0,1,0,0,0,4,3,3,1,/* Tercera Fila */
                3,4,3,0,0,0,1,0,0,2,/* Cuarta Fila */
                2,0,2,3,1,1,2,0,0,3,/* Quinta Fila */
                1,0,0,0,1,0,0,0,0,1,/* Sexta Fila */
                4,0,0,0,3,4,1,2,1,1,/* Séptima Fila */
                3,0,0,0,0,0,0,0,0,3,/* Octava Fila */
                1,1,2,4,2,3,1,1,2,1/* Novena Fila */];
/* Guarda posiciones de las casillas con opción a girar 
Ciclo cada 4:
1: x de la casilla
2: y de la casilla
3: primera dirección de giro
4: segunda dirección de giro */
var turnBox = [9,6,'s','d',4,4,'a','d',6,2,'w','d',];
/* Guarda posición del jugador 
Al inicio 1,0 es la posición predeterminada*/
var playerPlace = [];
/* Coloca las posiciones de acuerdo al número de jugadores */
for(var i = 1; i <= numJugadores; i++){
    playerPlace.append([1,0]);
    console.log(oli);
}
function girarDado(target){

}

function compararDado(){
    
}
function generarTablero(tablero){
    for(var j = 0; j < 9; j++){
        var row = "<div class=\"boardRow\">";
        for(var i = 0; i < 10; i++){
            var color;
            switch(tablero[i*(10**j)]){
                case 1:
                    color= "azul";
                    break;
                case 2:
                    color= "verde"; 
                    break;
                case 3:
                    color= "rojo";
                    break;
                case 4:
                    color= "morado";
                    break;
                case 5:
                    color = "inicio";
                    break; 
                default:
                    color = "vacio"       
            }
            row  += "<div class=\"boardCol\"><div class=\""+color+"\"></div></div>";
        }
        row += "</div>"
        $("#board").append(row);
    }
}
generarTablero(gameBoard);