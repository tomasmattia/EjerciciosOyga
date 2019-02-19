function anagrams(word, posible_anagrams){
    let normalizar = function(string) {
        return string.toLowerCase().split('').sort().join('').trim();
    }
    let str1 = normalizar(word);
    let resultado=[];
    for(let i in posible_anagrams)
    {
        let str2 = normalizar(posible_anagrams[i]);
        if(str1 == str2)
        {
            resultado.push(posible_anagrams[i]);
        }
    }
    return resultado;
}

console.log(anagrams("horse",['heros', 'horse', 'shore', 'standard']));