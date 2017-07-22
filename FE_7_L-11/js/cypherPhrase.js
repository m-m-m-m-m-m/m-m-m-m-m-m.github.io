function cypherPhrase(obj, str) {
    return getTransformedArray(str, (el)=> {
        return obj[el] || el;
    }).join('');
}

var charactersMap = {a:"o", c:"d", t:"g"};
console.log(cypherPhrase( charactersMap,"kitty cat" )); // -> “kitty cat”