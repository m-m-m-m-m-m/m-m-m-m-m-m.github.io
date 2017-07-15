function getMin(){
    let [i, len, res] = [1, arguments.length, arguments[0]];

    for( ; i<len; i++ ){
        (arguments[i] < res) && (res = arguments[i]);
    }

    return res;
}
