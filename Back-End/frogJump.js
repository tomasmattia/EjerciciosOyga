function frogJump(x,y,d){
    let jumps= y-x;
    return Math.ceil(jumps/d);
}

console.log(frogJump(10,110,30));