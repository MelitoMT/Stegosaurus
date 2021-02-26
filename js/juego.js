/* Guarda el tablero al inicio
0: no hay casilla
1: azul
2:verde
3:rojo
4:morado  
5:inicio*/
var gameBoardStart = [0,5,1,1,2,1,3,1,4,1,/* Primera Fila */
                0,0,3,0,0,0,1,0,0,2,/* Segunda Fila */
                0,0,1,0,0,0,4,3,3,1,/* Tercera Fila */
                3,4,3,0,0,0,1,0,0,2,/* Cuarta Fila */
                2,0,2,3,1,1,2,0,0,3,/* Quinta Fila */
                1,0,0,0,1,0,0,0,0,1,/* Sexta Fila */
                4,0,0,0,3,4,1,2,1,1,/* Séptima Fila */
                3,0,0,0,0,0,0,0,0,3,/* Octava Fila */
                1,1,2,4,2,3,1,1,2,1/* Novena Fila */];
/* Crea una copia del tablero para guardar el estado */
var gameBoardStatus=gameBoardStart.slice();                
/* Guarda las direcciones de giro de todo el tablero
1: derecha
2: izquierda
3: arriba
4: abajo
combinaciones cuando hay dos direcciones*/
var gameBoardDirec = [0,1,1,1,1,1,1,1,1,4,/* Primera Fila */
                    0,0,3,0,0,0,3,0,0,4,/* Segunda Fila */
                    0,0,3,0,0,0,13,1,1,4,/* Tercera Fila */
                    1,1,3,0,0,0,3,0,0,4,/* Cuarta Fila */
                    3,0,3,2,12,1,3,0,0,4,/* Quinta Fila */
                    3,0,0,0,3,0,0,0,0,4,/* Sexta Fila */
                    3,0,0,0,3,2,2,2,2,24,/* Séptima Fila */
                    3,0,0,0,0,0,0,0,0,4,/* Octava Fila */
                    3,2,2,2,2,2,2,2,2,2/* Novena Fila */];    
/* Guarda posición del jugador 
Al inicio 1,0 es la posición predeterminada*/
var playerPlace = [];
/* Coloca las posiciones de acuerdo al número de jugadores */
for(var i = 1; i <= 4; i++){
    playerPlace.push([1,0]);
}
var srcFichas = ["alo","alo","alo","alo"];
/* Genera un número pseudoaleatorio entre 1 y 6 */
function girarDado(){
    var i = Math.floor(Math.random() * Math.floor(5)+1);
    /* Falta agregar la animación */
    console.log(i);
    return i;
}
/*Revisa todas las casillas colindantes con la dada y revisa si es válido moverse a ellas
-pos: arreglo con x y de la posición actual 
-casillasValidas: arreglo que indica que direcciones están permitidas[derecha, izquierda, arriba,abajo]
-gameBoardDirec: arreglo con las direcciones de todas las casillas*/
function verifCasillas(pos){
    var casillasValidas=[false,false,false,false];
    if(pos==[9,6]){
        casillasValidas=[false,true,false,true];
    }
    else if(pos==[4,4]){
        casillasValidas=[true,true,false,false];
    }
    else if(pos==[6,2]){
        casillasValidas=[true,false,true,false];
    }
    else{
        console.log("Soy la posición"+pos)
        if(pos[1]!=0){
            if(gameBoardDirec[pos[1]*10+pos[0]]==3){
                if(gameBoardDirec[(pos[1]-1)*10+pos[0]]!= 4){
                    casillasValidas[2]=true;
                } 
            }
        }
        if(pos[1]!=8){
            if(gameBoardDirec[pos[1]*10+pos[0]]==4){
                if(gameBoardDirec[(pos[1]+1)*10+pos[0]]!= 3){
                    casillasValidas[3]=true;
                } 
            } 
        }
        if(pos[0]!=0){
            if(gameBoardDirec[pos[1]*10+pos[0]]==2){
                if(gameBoardDirec[pos[1]*10+pos[0]-1]!= 1){
                    casillasValidas[1]=true;
                } 
            }
        } 
        if(pos[0]!=9){
            console.log(pos[0]);
            console.log(gameBoardDirec[pos[1]*10+pos[0]+1])
            if(gameBoardDirec[pos[1]*10+pos[0]]==1){
                if(gameBoardDirec[pos[1]*10+pos[0]+1]!= 2){
                    casillasValidas[0]=true;
                } 
            }
        }       
    }
    return(casillasValidas) 
}
/* Actualiza la posición de un jugador
playerPlace: número de jugador(1-4)
index: coordenada a actualizar (x o y)
movDir: dirección a la que se busca actualizar la coordenada */
function actualizarPos(movDir, playerPlace, index){
    switch (movDir){
        case 1:
            playerPlace[index][0] += 1;
            console.log("Sume 1 en x")
            break;
        case 2:
            playerPlace[index][0] -= 1;
            break;    
        case 3:
            playerPlace[index][1] -= 1;
            break;
        case 4:
            playerPlace[index][1] += 1;
            console.log("Sume 1 en y")
            break;        
    }
    return playerPlace;
}
/* Brinda la opción de elección cuando hay dos caminos posibles
dir1: primera dirección válida
dir2: segunda dirección válida
jugador: jugador a mover
key: tecla presionada */
function elegirCamino(dir1,dir2,playerPlace, jugador,key){
    if(dir1== 2||dir2== 2&& key.keyCode == '37'){ 
        playerPlace = actualizarPos(2,playerPlace,jugador-1);
    }
    if(dir1== 1||dir2== 1&& key.keyCode == '39'){ 
        playerPlace = actualizarPos(1,playerPlace,jugador-1);
    }
    if(dir1== 3||dir2== 3&& key.keyCode == '38'){ 
        playerPlace = actualizarPos(3,playerPlace,jugador-1);
    }
    if(dir1== 4||dir2== 4&& key.keyCode == '40'){ 
        playerPlace = actualizarPos(4,playerPlace,jugador-1);
    }
}
/* Mueve al jugador
-jugador: Jugador que se quiere mover (1-4) 
-movDir: primera dirección
movDirOpt: segunda dirección si aplica
casillasValidNum: número de casillas válidas*/
function moverJugador(jugador){
    var num=girarDado();
    for(var j = 1; j <= num; j++){
        var casillasValid=verifCasillas(playerPlace[jugador-1]);
        console.log(casillasValid)
        var casillasValidNum = 0;
        var movDir;
        var movDirOpt;
        for(var i = 0; i <= 4;i++){
            if(casillasValid[i]==true){
                if(casillasValidNum > 1){
                    movDirOpt = i+1;
                }
                casillasValidNum += 1;
                movDir = i+1;
            }
        }    
        if(casillasValidNum == 1){
            playerPlace = actualizarPos(movDir,playerPlace,jugador-1);
        }
        else{
            document.addEventListener('keypress', elegirCamino(movDir,movDirOpt,playerPlace,jugador));
        }
        gameBoardStatus[playerPlace[jugador-1][0]*10+playerPlace[jugador-1][1]]="j"+jugador;
    }
    console.log(playerPlace[jugador-1]);
}
/* Dibuja las fichas correspondientes a la posición de cad jugador
-i: coordenada y
-j: coordenada x */
function dibujarFicha(i,j,jFichas){
    if(typeof gameBoardStatus[i*10+j]!= 'number'){
        var src="";
        switch(gameBoardStatus[i*10+j]){
            case "j1":
                src=jFichas[0];
                break;
            case "j2":
                src=jFichas[1];
                break;
            case "j3":
                src=jFichas[2];
                break;
            case "j4":
                src=jFichas[3];
                break;            
        }
    }
    return src;
}
/* Genera el tablero a partir de un arreglo dado
-tablero:arreglo que contiene el tablero, los números diferentes de 0 son casillas
-color: color de la casilla correspondiente */

function generarTablero(tablero){
    for(var j = 0; j < 9; j++){
        var row = "<div class=\"boardRow\">";
        for(var i = 0; i < 10; i++){
            var color;
            switch(tablero[j*10+i]){
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
                    color = "inicial";
                    break;               
                default:
                    color = "vacio"       
            }
            src = dibujarFicha(i,j,srcFichas);
            if(src == ""){
                row  += "<div class=\"boardCol\"><div class=\""+color+"\"></div></div>";
            }
            else{
                row  += "<div class=\"boardCol\"><div class=\""+color+"\"><img src=\""+src+"\" class\"fichaImg\"></div></div>";  
            }
        }
        row += "</div>"
        $("#board").append(row);
    }
}
generarTablero(gameBoardStart);
