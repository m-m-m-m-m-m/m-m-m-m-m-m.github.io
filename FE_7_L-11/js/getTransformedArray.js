function getTransformedArray(arr, fn) {
    let res_arr = [];

    forEach(arr, (el, i, arr)=> {
        let res = fn(el, i, arr);
        res !== undefined && res !== false && res_arr.push(res);
    });

    return res_arr;
}


function increment(num) {
    return num + 1
}
console.log(getTransformedArray([1, 7, 20], increment)); // -> [ 2, 8, 21 ]
