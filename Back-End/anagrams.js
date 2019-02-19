function anagrams(word, posible_anagrams){
    // string a minusculas, ordenado por unicode y sin espacios
    let normalizar = function(string) {
        return string.toLowerCase().split('').sort().join('').trim();
    }
    let str1 = normalizar(word);
    let resultado=[];
    // se normalizan todas las palabras del array y se comparan con la primera
    for(let i in posible_anagrams)
    {
        let str2 = normalizar(posible_anagrams[i]);
        if(str1 == str2)
        {
            resultado.push(posible_anagrams[i]);
        }
    }
    // retorna un array con los anagramas encontrados
    return resultado;
}

console.log(anagrams("horse",['heros', 'horse', 'shore', 'standard']));