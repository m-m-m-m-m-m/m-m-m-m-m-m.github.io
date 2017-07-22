function forEach(arr, fn) {
    let [i, len] = [0, arr.length];

    for (; i < len; i++) {
        fn(arr[i], i, arr);
    }
}

forEach( [3, 5, 2], function(el){ console.log(el) } );