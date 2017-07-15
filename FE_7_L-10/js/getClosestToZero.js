function getClosestToZero(){
    let [i, len, res] = [1, arguments.length, arguments[0]];

    for( ; i<len; i++ ){
        ( Math.abs(arguments[i]) < Math.abs(res)) && (res = arguments[i]);
    }

    return res;
}
