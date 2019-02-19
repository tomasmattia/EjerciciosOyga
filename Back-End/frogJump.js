// se resta el origen al destino y se divide por la distancia de los saltos, retorna un entero redondeado para arriba
function frogJump(x,y,d){
    return Math.ceil((y-x)/d);
}

console.log(frogJump(10,85,30));