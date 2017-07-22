function decypherPhrase(obj, str) {
    let revers_obj = {};

    for (let key in obj) {
        revers_obj[obj[key]] = key;
    }

    return cypherPhrase(revers_obj, str);
}

var charactersMap = {a: "o", c: "d", t: "g"};
console.log(decypherPhrase(charactersMap, "kiggy dog")); // -> “kitty cat”
