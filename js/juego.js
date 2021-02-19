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
    playerPlace.push([8,0]);
}
/*  */
function girarDado(){
    var i = Math.floor(Math.random() * Math.floor(5)+1);
    /* Falta agregar la animación */
    console.log(i);
    return i;
}
/*Revisa a donde es válido moverse
-pos: arreglo con x y de la posición actual */
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
            if(gameBoardDirec[(pos[1]-1)*10+pos[0]]==3){
                casillasValidas[2]=true;
            }
        }
        if(pos[1]!=8){
            if(gameBoardDirec[(pos[1]+1)*10+pos[0]]==4){
                casillasValidas[3]=true;
            }  
        }
        if(pos[0]!=0){
            if(gameBoardDirec[pos[1]*10+pos[0]-1]==2||gameBoardDirec[(pos[1]-1)*10+pos[0]+1]==3){
                casillasValidas[1]=true;
            }  
        } 
        if(pos[0]!=9){
            console.log(pos[0]);
            console.log(gameBoardDirec[pos[1]*10+pos[0]+1])
            if(gameBoardDirec[pos[1]*10+pos[0]+1]==1||gameBoardDirec[(pos[1]+1)*10+pos[0]+1]==4){
                casillasValidas[0]=true;
            }  
        }       
    }
    return(casillasValidas) 
}
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
            break;        
    }
    return playerPlace;
}
function keys(dir) {
    if (dir.keyCode === 39) {
      direction = 1; /* derecha */
    }
    else if (dir.keyCode === 38) {
      direction = -lado; /* arriba */
    }
    else if (dir.keyCode === 37) {
      direction = -1; /* izq */
    }
    else if (dir.keyCode === 40) {
      direction = +lado; /* abajo */
    }
  }
function elegirCamino(dir1,dir2){
    
}
/* Mueve al jugador
-jugador: Jugador que se quiere mover (1-4) */
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
                casillasValidNum += 1;
                movDir = i+1;
                if(casillasValidNum > 1){
                    movDirOpt = i+1;
                }
            }
        }    
            if(casillasValidNum == 1){
                playerPlace = actualizarPos(movDir,playerPlace,jugador-1);
            }
            else{
                console.log("olii");
                /* elegirCamino(movDir,movDirOpt); */
            }
    }
    console.log(playerPlace[jugador-1]);
}
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
generarTablero(gameBoardStart);
